import { WinnersAPI, Winner } from '../interfaces/interfaces';
import constants from '../app/appData/constants';

class Winners implements WinnersAPI {
    private baseURL: string;

    private winners: string;

    constructor() {
        this.baseURL = 'http://127.0.0.1:3000';
        this.winners = `${this.baseURL}/winners`;
    }

    async getWinnersData(page: number, sort: 'id' | 'wins' | 'time', order: 'ASC' | 'DESC') {
        const response = await fetch(
            `${this.winners}?_page=${page}&_limit=${constants.winnersPerPage}&_sort=${sort}&_order=${order}`
        );

        return {
            winners: (await response.json()) as Array<Winner>,
            total: +(response.headers.get('X-Total-Count') as string),
        };
    }

    async getWinner(id: number) {
        const response = await fetch(`${this.winners}/${id}`);
        return (await response.json()) as Winner;
    }

    async createWinner(params: Winner) {
        const response = await fetch(this.winners, {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Content-type': 'application/json',
            },
        });
        return (await response.json()) as Winner;
    }

    async deleteWinner(id: number) {
        await fetch(`${this.winners}/${id}`, { method: 'DELETE' });
    }

    async updateWinner(id: number, params: Omit<Winner, 'id'>) {
        await fetch(`${this.winners}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(params),
            headers: {
                'Content-type': 'application/json',
            },
        });
    }
}

export default Winners;
