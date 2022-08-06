import { View } from '../../interfaces/interfaces';
import state from '../../app/appData/state';

class WinnersView implements View {
    render() {
        const view = document.getElementById('view') as HTMLDivElement;
        view.innerHTML = `
          <div id="winners-view">
            <h2 class="winners-title" id="winners-title"></h2>
            <div class="winners-page" id="winners-page"></div>
            <div class="winners-pagination">
              <button class="pagination__button button" id="pagination-prev">prev</button>
              <button class="pagination__button button" id="pagination-next">next</button>
            </div>
          </div>
        `;

        const buttonPrev = document.getElementById('pagination-prev') as HTMLButtonElement;
        const buttonNext = document.getElementById('pagination-next') as HTMLButtonElement;

        if (state.winnersPage <= 1) buttonPrev.disabled = true;
        if (state.winnersPage >= state.pagesInWinners) buttonNext.disabled = true;
    }
}

export default WinnersView;
