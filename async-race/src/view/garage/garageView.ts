import { View } from '../../interfaces/interfaces';
import html from './garageViewHTML';

class GarageView implements View {
    render() {
        const view = document.getElementById('view') as HTMLDivElement;
        view.innerHTML = html;
    }
}

export default GarageView;
