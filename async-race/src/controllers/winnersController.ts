import WinnersPage from '../view/winners/winnersPage';
import Winners from '../API/winners';
import Garage from '../API/garage';
import state from '../app/appData/state';
import constants from '../app/appData/constants';
import { Winner, Car } from '../interfaces/interfaces';

class WinnersController {
    private winnersPage: WinnersPage;

    private winners: Winners;

    private garage: Garage;

    constructor() {
        this.winnersPage = new WinnersPage();
        this.winners = new Winners();
        this.garage = new Garage();
    }

    async start() {
        const view = document.getElementById('winners-view') as HTMLDivElement;
        await this.loadPage();

        view.addEventListener('click', async (evt) => {
            const elementID = (evt.target as HTMLElement).id;

            switch (true) {
                case elementID === 'best-time':
                    await this.sortByTime();
                    break;
                case elementID === 'wins':
                    await this.sortByWins();
                    break;
                case elementID.includes('pagination'):
                    await this.paginate(elementID);
                    break;
                default:
                    break;
            }
        });
    }

    async loadPage() {
        const winnersData = await this.winners.getWinnersData(state.winnersPage, state.sort, state.order);
        const winersWithCars: Array<{ winner: Winner; winnersCar: Car }> = [];

        state.winnersAtTable = winnersData.total;
        state.pagesInWinners = Math.ceil(state.winnersAtTable / constants.winnersPerPage);

        await Promise.all(
            winnersData.winners.map(async (winnerData) => {
                const winnersCar = await this.garage.getCar(winnerData.id);
                winersWithCars.push({
                    winnersCar,
                    winner: winnerData,
                });
            })
        );

        this.winnersPage.renderWinnersTitle(winnersData.total);
        this.winnersPage.render(state.winnersPage, winersWithCars);

        const arrowTime = document.getElementById('arrow-time') as HTMLElement;
        const arrowWins = document.getElementById('arrow-wins') as HTMLElement;
        if (state.sort === 'time') arrowTime.classList.add('arrow_active');
        if (state.order === 'ASC') arrowTime.classList.add('arrow_rotate');
        if (state.sort === 'wins') arrowWins.classList.add('arrow_active');
        if (state.order === 'ASC') arrowWins.classList.add('arrow_rotate');

        const buttonNext = document.getElementById('pagination-next') as HTMLButtonElement;
        if (state.winnersPage < state.pagesInWinners) {
            buttonNext.disabled = false;
        }
    }

    async paginate(buttonID: string) {
        const buttonPrev = document.getElementById('pagination-prev') as HTMLButtonElement;
        const buttonNext = document.getElementById('pagination-next') as HTMLButtonElement;

        switch (buttonID) {
            case 'pagination-prev':
                if (state.winnersPage >= 2) {
                    state.winnersPage -= 1;
                    buttonNext.disabled = false;
                    await this.loadPage();
                }
                if (state.winnersPage <= 1) {
                    buttonPrev.disabled = true;
                }
                break;
            case 'pagination-next':
                if (state.winnersPage < state.pagesInWinners) {
                    state.winnersPage += 1;
                    buttonPrev.disabled = false;
                    await this.loadPage();
                }

                if (state.winnersPage >= state.pagesInWinners) {
                    buttonNext.disabled = true;
                }
                break;
            default:
                break;
        }
    }

    async sortByTime() {
        state.sort = 'time';
        state.order = state.order === 'ASC' ? 'DESC' : 'ASC';
        await this.loadPage();
    }

    async sortByWins() {
        state.sort = 'wins';
        state.order = state.order === 'ASC' ? 'DESC' : 'ASC';
        await this.loadPage();
    }
}

export default WinnersController;
