import { View } from '../../interfaces/interfaces';

class WinnersView implements View {
    render() {
        const view = document.getElementById('view') as HTMLDivElement;
        view.innerHTML = `
          <h2 class="winners-title" id="winners-title"></h2>
          <div class="winners-page" id="winners-page"></div>
          <div class="winners-pagination">
            <button class="pagination__button button" id="pagination-prev">prev</button>
            <button class="pagination__button button" id="pagination-next">next</button>
          </div>
        `;
    }
}

export default WinnersView;
