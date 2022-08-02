import { Winner, Car } from '../../interfaces/interfaces';
import svg from '../carImage';

class SingleWinnerView {
    render(winnerData: { winner: Winner; winnersCar: Car }, index: number) {
        const tableBody = document.getElementById('table-body') as HTMLTableColElement;
        const tableRow = document.createElement('tr');
        tableRow.classList.add('table-row');

        tableRow.innerHTML = `
          <td class="table__cell">${index}</td>
          <td class="table__cell">${svg}</td>
          <td class="table__cell">${winnerData.winnersCar.name}</td>
          <td class="table__cell">${winnerData.winner.wins}</td>
          <td class="table__cell">${winnerData.winner.time} sec</td>
        `;

        const carImage = tableRow.querySelector('svg path') as SVGPathElement;
        carImage.setAttribute('fill', winnerData.winnersCar.color);

        tableBody.append(tableRow);
    }
}

export default SingleWinnerView;
