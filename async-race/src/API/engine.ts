import { EngineAPI, RaceParams, SuccessRace } from '../interfaces/interfaces';

class Engine implements EngineAPI {
    private baseURL: string;

    private engine: string;

    constructor() {
        this.baseURL = 'http://127.0.0.1:3000';
        this.engine = `${this.baseURL}/engine`;
    }

    async startEngine(id: number) {
        const response = await fetch(`${this.engine}?id=${id}&status=started`, { method: 'PATCH' });
        return (await response.json()) as RaceParams;
    }

    async stopEngine(id: number) {
        const response = await fetch(`${this.engine}?id=${id}&status=stopped`, { method: 'PATCH' });
        return (await response.json()) as RaceParams;
    }

    async drive(id: number) {
        const response = await fetch(`${this.engine}?id=${id}&status=drive`, { method: 'PATCH' });
        return (await response.json()) as SuccessRace;
    }
}

export default Engine;
