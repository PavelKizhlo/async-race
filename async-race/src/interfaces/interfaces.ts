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

export type CarParams = {
    name: string;
    color: string;
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
        page: number,
        limit: number
    ) => Promise<{
        cars: Array<Car>;
        total: number;
    }>;
    getCar: (id: number) => Promise<Car>;
    createCar: (params: CarParams) => Promise<Car>;
    deleteCar: (id: number) => Promise<void>;
    updateCar: (id: number, params: CarParams) => Promise<void>;
}

export interface EngineAPI {
    startEngine: () => Promise<RaceParams>;
    stopEngine: () => Promise<RaceParams>;
    drive: () => Promise<SuccessRace>;
}

export interface WinnersAPI {
    getWinners: () => Promise<Array<Winner>>;
    getWinner: () => Promise<Winner>;
    createWinner: (winnerParams: Winner) => Promise<void>;
    deleteWinner: () => Promise<void>;
    updateWinner: (winnerParams: Omit<Winner, 'id'>) => Promise<void>;
}
