import WinnersPage from '../view/winners/winnersPage';
import Winners from '../API/winners';
import Garage from '../API/garage';
import state from '../app/appData/state';
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
        const winnersData = await this.winners.getWinnersData(state.winnersPage, state.sort, state.order);
        const winersWithCars: Array<{ winner: Winner; winnersCar: Car }> = [];

        await Promise.allSettled(
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
    }
}

export default WinnersController;
