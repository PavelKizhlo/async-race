import Engine from '../API/engine';
import { RaceParams } from '../interfaces/interfaces';

class RaceController {
    private engine: Engine;

    constructor() {
        this.engine = new Engine();
    }

    start() {
        const view = document.getElementById('garage-view') as HTMLDivElement;

        view.addEventListener('click', async (evt) => {
            const elementID = (evt.target as HTMLElement).id;

            switch (true) {
                case elementID.includes('start'):
                    await this.startSingleRace(elementID);
                    break;
                case elementID.includes('stop'):
                    break;
                case elementID === 'race-button':
                    break;
                case elementID === 'reset-button':
                    break;
                default:
                    break;
            }
        });
    }

    async startSingleRace(elementID: string) {
        const startButton = document.getElementById(elementID) as HTMLButtonElement;
        const id = parseInt((elementID.match(/[0-9]+$/) as RegExpMatchArray)[0], 10);
        const carName = (document.getElementById(`car-name-${id}`) as HTMLSpanElement).innerHTML;
        const raceParams = await this.engine.startEngine(id);

        startButton.disabled = true;
        this.animateRace(id, raceParams);
        try {
            await this.engine.drive(id);
        } catch (err) {
            console.log(`${carName} has been stopped suddenly. It's engine was broken down.`);
        }
    }

    animateRace(id: number, params: RaceParams) {
        const car = document.getElementById(`car-${id}`) as HTMLSpanElement;
        const raceTime = Math.round(params.distance / params.velocity);
        const finishDistance = 170;
        const trackDistance = window.innerWidth - finishDistance;

        let frameID;
        let startTime: number;

        const animation = (time: number, distance: number, duration: number) => {
            const runtime = time - startTime;
            let progress = runtime / duration;
            progress = Math.min(progress, 1);
            car.style.left = `${(distance * progress).toFixed(2)}px`;

            if (progress < 1) {
                frameID = requestAnimationFrame((timestamp) => {
                    animation(timestamp, distance, duration);
                });
            }
        };

        requestAnimationFrame((timestamp) => {
            startTime = timestamp;
            animation(timestamp, trackDistance, raceTime);
        });
    }
}

export default RaceController;
