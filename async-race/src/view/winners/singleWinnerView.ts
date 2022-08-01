import { Winner, Car } from '../../interfaces/interfaces';
import svg from '../carImage';

class SingleWinnerView {
    render(winnerData: { winner: Winner; winnersCar: Car }, index: number) {
        const tableBody = document.getElementById('table-body') as HTMLTableColElement;
        const tableRow = document.createElement('tr');
        tableRow.classList.add('table-row');

        tableRow.innerHTML = `
          <td>${index}</td>
          <td>${svg}</td>
          <td>${winnerData.winnersCar.name}</td>
          <td>${winnerData.winner.wins}</td>
          <td>${winnerData.winner.time}</td>
        `;

        const carImage = tableRow.querySelector('svg path') as SVGPathElement;
        carImage.setAttribute('fill', winnerData.winnersCar.color);

        tableBody.append(tableRow);
    }
}

export default SingleWinnerView;
