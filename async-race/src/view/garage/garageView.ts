import { View } from '../../interfaces/interfaces';
import html from './garageViewHTML';

class GarageView implements View {
    render() {
        const page = document.getElementById('page') as HTMLDivElement;
        page.innerHTML = html;
    }
}

export default GarageView;
