export type Car = {
    name: string;
    color: string;
    id: number;
};

export type Winner = {
    id: number;
    wins: number;
    time: number;
};

export type RaceParams = {
    velocity: number;
    distance: number;
};

export type SuccessRace = {
    success: true;
};

export interface GarageAPI {
    getCarsData: (
        page: number
    ) => Promise<{
        cars: Array<Car>;
        total: number;
    }>;
    getCar: (id: number) => Promise<Car>;
    createCar: (params: Omit<Car, 'id'>) => Promise<Car>;
    deleteCar: (id: number) => Promise<void>;
    updateCar: (id: number, params: Omit<Car, 'id'>) => Promise<void>;
}

export interface EngineAPI {
    startEngine: (id: number) => Promise<RaceParams>;
    stopEngine: (id: number) => Promise<RaceParams>;
    drive: (id: number) => Promise<SuccessRace>;
}

export interface WinnersAPI {
    getWinnersData: (
        page: number,
        sort: 'id' | 'wins' | 'time',
        order: 'ASC' | 'DESC'
    ) => Promise<{
        winners: Array<Winner>;
        total: number;
    }>;
    getWinner: (id: number) => Promise<Winner>;
    createWinner: (winnerParams: Omit<Winner, 'id'>) => Promise<Winner>;
    deleteWinner: (id: number) => Promise<void>;
    updateWinner: (id: number, winnerParams: Omit<Winner, 'id'>) => Promise<void>;
}

export type StateObj = {
    view: 'garage' | 'winners';
    garagePage: number;
    createCarInput: string;
    createColorInput: string;
    updateCarInput: string;
    updateColorInput: string;
    winnersPage: number;
};

export interface View {
    render: () => void;
}
