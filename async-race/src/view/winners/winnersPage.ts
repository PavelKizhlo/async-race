import { Winner, Car } from '../../interfaces/interfaces';
import SingleWinnerView from './singleWinnerView';

class WinnersPage {
    private singleWinnerView: SingleWinnerView;

    constructor() {
        this.singleWinnerView = new SingleWinnerView();
    }

    renderWinnersTitle(winnersNumber: number) {
        const title = document.getElementById('winners-title') as HTMLHeadingElement;
        title.innerHTML = `Winners: ${winnersNumber}`;
    }

    render(page: number, winnersPageData: Array<{ winner: Winner; winnersCar: Car }>) {
        const winnersPage = document.getElementById('winners-page') as HTMLDivElement;

        winnersPage.innerHTML = `
          <h3 class="page-title">Page #${page}</h3>
          <table class="winners-table table">
            <thead class="table__head">
              <tr>
                <th>Number</th>
                <th>Car</th>
                <th>Name</th>
                <th>Wins</th>
                <th>Best time</th>
              </tr>
            </thead>
          <tbody class="table__body" id="table-body"></tbody>
        `;

        winnersPageData.forEach((winnerData, index) => this.singleWinnerView.render(winnerData, index));
    }
}

export default WinnersPage;
