import Engine from '../API/engine';
import Garage from '../API/garage';
import Winners from '../API/winners';
import { RaceParams, SuccessRace } from '../interfaces/interfaces';
import state from '../app/appData/state';

class RaceController {
    private engine: Engine;

    private garage: Garage;

    private winners: Winners;

    private frameIDs: { [index: string]: number };

    constructor() {
        this.engine = new Engine();
        this.garage = new Garage();
        this.winners = new Winners();
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
                    await this.startRace();
                    break;
                case elementID === 'reset-button':
                    await this.resetRace();
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

    async startRace() {
        const raceButton = document.getElementById('race-button') as HTMLButtonElement;
        const raceWinner = document.getElementById('race-winner') as HTMLDivElement;
        const carsData = await this.garage.getCarsData(state.garagePage);
        const carsIDs = carsData.cars.reduce((acc: Array<number>, currentCar) => {
            acc.push(currentCar.id);
            return acc;
        }, []);

        raceButton.disabled = true;

        const carsRaceParams = await Promise.all(
            carsIDs.map(async (id) => {
                const raceParams = await this.engine.startEngine(id);
                return { raceParams, id };
            })
        );

        carsRaceParams.forEach((params) => {
            const startButton = document.getElementById(`start-${params.id}`) as HTMLButtonElement;
            startButton.disabled = true;
            this.animateRace(params.id, params.raceParams);
        });

        const raceResults = (await Promise.any(
            carsIDs.map(async (id) => {
                const carName = (document.getElementById(`car-name-${id}`) as HTMLSpanElement).innerHTML;
                try {
                    const raceResult = await this.engine.drive(id);
                    return { raceResult, id };
                } catch (err) {
                    cancelAnimationFrame(this.frameIDs[`frame${id}`]);
                    console.log(`${carName} has been stopped suddenly. It's engine was broken down.`);
                    return Promise.reject();
                }
            })
        )) as Awaited<Promise<{ raceResult: SuccessRace; id: number }>>;

        const winnerCar = (document.getElementById(`car-name-${raceResults.id}`) as HTMLSpanElement).innerHTML;
        const winnerParams = carsRaceParams.find((params) => params.id === raceResults.id) as {
            raceParams: RaceParams;
            id: number;
        };
        const winnerTime = +(winnerParams.raceParams.distance / winnerParams.raceParams.velocity / 1000).toFixed(2);

        raceWinner.classList.add('race-winner_active');
        raceWinner.innerHTML = `${winnerCar} went first [${winnerTime}s]`;
        await this.addWin(raceResults.id, winnerTime);
    }

    async resetRace() {
        const raceButton = document.getElementById('race-button') as HTMLButtonElement;
        const raceWinner = document.getElementById('race-winner') as HTMLDivElement;
        const carsData = await this.garage.getCarsData(state.garagePage);
        const carsIDs = carsData.cars.reduce((acc: Array<number>, currentCar) => {
            acc.push(currentCar.id);
            return acc;
        }, []);

        raceButton.disabled = false;
        raceWinner.classList.remove('race-winner_active');

        const carsStopParams = await Promise.all(
            carsIDs.map(async (id) => {
                const stopParams = await this.engine.stopEngine(id);
                return stopParams;
            })
        );

        carsIDs.forEach((id, index) => {
            const startButton = document.getElementById(`start-${id}`) as HTMLButtonElement;
            startButton.disabled = false;
            cancelAnimationFrame(this.frameIDs[`frame${id}`]);
            this.animateRace(id, carsStopParams[index]);
        });
    }

    async addWin(id: number, time: number) {
        const winnerData = await this.winners.getWinner(id);
        if ('id' in winnerData) {
            const newWins = winnerData.wins + 1;
            const newTime = time < winnerData.time ? time : winnerData.time;
            await this.winners.updateWinner(id, { time: newTime, wins: newWins });
        } else {
            await this.winners.createWinner({ id, time, wins: 1 });
        }
    }
}

export default RaceController;
