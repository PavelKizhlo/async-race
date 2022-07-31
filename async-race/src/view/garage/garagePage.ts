import { Car } from '../../interfaces/interfaces';

class GaragePage {
    renderCarsTitle(carsNumber: number) {
        const title = document.getElementById('cars-title') as HTMLHeadingElement;
        title.innerHTML = `Cars in garage: ${carsNumber}`;
    }

    render(page: number, carsPageData: Array<Car>) {
        const carsPage = document.getElementById('cars-page') as HTMLDivElement;

        carsPage.innerHTML = `
          <h3 class="page-title">Page #${page}</h3>
          <div id="cars-container"></div>
        `;
    }
}

export default GaragePage;
