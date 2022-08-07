import { Car } from '../../interfaces/interfaces';
import svg from '../carImage';

class CarView {
    render(carData: Car) {
        const carsContainer = document.getElementById('cars-container') as HTMLDivElement;
        const carItem = document.createElement('div');
        carItem.classList.add('cars-item');

        carItem.innerHTML = `
          <div class="car-options">
            <button class="select-button button" id="select-button-${carData.id}">select</button>
            <button class="remove-button button" id="remove-button-${carData.id}">remove</button>
            <span class="car-name" id="car-name-${carData.id}">${carData.name}</span>
          </div>
          <div class="track">
            <button class="engine-button button" id="start-${carData.id}">a</button>
            <button class="engine-button button" id="stop-${carData.id}" disabled>b</button>
            <span class="car" id="car-${carData.id}">${svg}</span>
          </div>
        `;

        const carImage = carItem.querySelector('svg path') as SVGPathElement;
        carImage.setAttribute('fill', carData.color);

        carsContainer.append(carItem);
    }
}

export default CarView;
