import { View } from '../interfaces/interfaces';

class CommonView implements View {
    render() {
        const container = document.getElementById('app') as HTMLBodyElement;

        container.innerHTML = `
          <div class="nav">
            <button class="nav__button button" id="to-garage">to garage</button>
            <button class="nav__button button" id="to-winners">to winners</button>
          </div>
          <div id="view"></div> 
      `;
    }
}

export default CommonView;
