import { View } from '../../interfaces/interfaces';
import html from './garageViewHTML';
import state from '../../app/appData/state';

class GarageView implements View {
    render() {
        const view = document.getElementById('view') as HTMLDivElement;
        view.innerHTML = html;

        const buttonPrev = document.getElementById('pagination-prev') as HTMLButtonElement;
        const buttonNext = document.getElementById('pagination-next') as HTMLButtonElement;

        if (state.garagePage <= 1) buttonPrev.disabled = true;
        if (state.garagePage >= state.pagesInGarage) buttonNext.disabled = true;
    }
}

export default GarageView;
