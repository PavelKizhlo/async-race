import Engine from '../API/engine';
import { RaceParams } from '../interfaces/interfaces';

class RaceController {
    private engine: Engine;

    private frameIDs: { [index: string]: number };

    constructor() {
        this.engine = new Engine();
        this.frameIDs = {};
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
                    await this.stopCar(elementID);
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
            cancelAnimationFrame(this.frameIDs[`frame${id}`]);
            console.log(`${carName} has been stopped suddenly. It's engine was broken down.`);
        }
    }

    animateRace(id: number, params: RaceParams) {
        const car = document.getElementById(`car-${id}`) as HTMLSpanElement;
        const raceTime = Math.round(params.distance / params.velocity);
        const finishDistance = 170;
        const trackDistance = window.innerWidth - finishDistance;

        let startTime: number;

        const animation = (time: number, distance: number, duration: number) => {
            const runtime = time - startTime;
            let progress = runtime / duration;
            progress = Math.min(progress, 1);
            car.style.left = `${(distance * progress).toFixed(2)}px`;

            if (progress < 1 && duration !== Infinity) {
                this.frameIDs[`frame${id}`] = requestAnimationFrame((timestamp) => {
                    animation(timestamp, distance, duration);
                });
            }
        };

        requestAnimationFrame((timestamp) => {
            startTime = timestamp;
            animation(timestamp, trackDistance, raceTime);
        });
    }

    async stopCar(elementID: string) {
        const id = parseInt((elementID.match(/[0-9]+$/) as RegExpMatchArray)[0], 10);
        const startButton = document.getElementById(`start-${id}`) as HTMLButtonElement;
        const stopParams = await this.engine.stopEngine(id);

        startButton.disabled = false;
        cancelAnimationFrame(this.frameIDs[`frame${id}`]);
        this.animateRace(id, stopParams);
    }
}

export default RaceController;
