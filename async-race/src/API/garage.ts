import { GarageAPI, Car } from '../interfaces/interfaces';

class Garage implements GarageAPI {
    private baseURL: string;

    private garage: string;

    constructor() {
        this.baseURL = 'http://127.0.0.1:3000';
        this.garage = `${this.baseURL}/garage`;
    }

    async getCarsData(page: number, limit: number) {
        const response = await fetch(`${this.garage}?_page=${page}&_limit=${limit}`);

        return {
            cars: (await response.json()) as Array<Car>,
            total: +(response.headers.get('X-Total-Count') as string),
        };
    }

    async getCar(id: number) {
        const response = await fetch(`${this.garage}/${id}`);
        return response.json();
    }

    async createCar(params: Omit<Car, 'id'>) {
        const response = await fetch(this.garage, {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Content-type': 'application/json',
            },
        });
        return (await response.json()) as Car;
    }

    async deleteCar(id: number) {
        await fetch(`${this.garage}/${id}`, { method: 'DELETE' });
    }

    async updateCar(id: number, params: Omit<Car, 'id'>) {
        await fetch(`${this.garage}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(params),
            headers: {
                'Content-type': 'application/json',
            },
        });
    }
}

export default Garage;
