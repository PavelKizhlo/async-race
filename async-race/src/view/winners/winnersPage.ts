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
                <th class="table__header">Number</th>
                <th class="table__header">Car</th>
                <th class="table__header">Name</th>
                <th class="table__header table__header_wins" id="wins">Wins
                  <svg class="arrow" id="arrow-wins" fill="none" viewBox="0 0 64 64"><path d="M32 62 62 2H2l30 60Z" fill="#fff"/></svg>
                </th>
                <th class="table__header table__header_time" id="best-time">Best time
                  <svg class="arrow" id="arrow-time" fill="none" viewBox="0 0 64 64"><path d="M32 62 62 2H2l30 60Z" fill="#fff"/></svg>
                </th>
              </tr>
            </thead>
          <tbody class="table__body" id="table-body"></tbody>
        `;

        winnersPageData.forEach((winnerData, index) => this.singleWinnerView.render(winnerData, index));
    }
}

export default WinnersPage;
