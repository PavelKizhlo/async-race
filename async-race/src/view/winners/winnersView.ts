import { View } from '../../interfaces/interfaces';

class WinnersView implements View {
    render() {
        const view = document.getElementById('view') as HTMLDivElement;
        view.innerHTML = `
          <div class="cars-page" id="cars-page"></div>
          <div class="winers-pagination">
            <button class="pagination__button button" id="pagination-prev">prev</button>
            <button class="pagination__button button" id="pagination-next">next</button>
          </div>
        `;
    }
}

export default WinnersView;
