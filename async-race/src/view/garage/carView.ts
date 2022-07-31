import { Car } from '../../interfaces/interfaces';
import svg from './carImage';

class CarView {
    render(carData: Car) {
        const carsContainer = document.getElementById('cars-container') as HTMLDivElement;
        const carItem = document.createElement('div');

        carItem.innerHTML = `
          <button class="select-button button" id="select-button">select</button>
          <button class="remove-button button" id="remove-button">remove</button>
          <span class="car-name" id="car-name">${carData.name}</span>
          <div class="track">
            <button class="engine-button button" id="start-engine">a</button>
            <button class="engine-button button" id="stop-engine">a</button>
            <span class="car" id="car">${svg}</span>
          </div>
        `;

        const carImage = carItem.querySelector('svg path') as SVGPathElement;
        carImage.setAttribute('fill', carData.color);

        carsContainer.append(carItem);
    }
}

export default CarView;
