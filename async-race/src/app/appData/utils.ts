function getRandomName() {
    const brands = [
        'Opel',
        'VW',
        'BMW',
        'Audi',
        'Citroen',
        'Peugeot',
        'Toyota',
        'Renault',
        'Nissan',
        'Mazda',
        'Seat',
        'Mercedes',
        'Mini',
    ];
    const models = [
        'Astra',
        'C5',
        'C4 Cactus',
        'S500',
        'Golf',
        'Tiguan',
        'Leon',
        'Ibiza',
        '750L',
        'A5',
        'Patrol',
        '207',
        'RX-8',
        'Cooper',
        'RAV4',
        '507',
        'AMG GT',
        'Supra',
        'A3',
        'Sandero',
        '320',
        '6',
        'GT-R',
        'Sirocco',
    ];

    const randomBrand: string = brands[Math.floor(Math.random() * 13)];
    const randomModel = models[Math.floor(Math.random() * 23)];
    return `${randomBrand} ${randomModel}`;
}

function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function getRandomCars() {
    const randomCars = [];

    for (let i = 0; i < 100; i += 1) {
        randomCars.push({ name: getRandomName(), color: getRandomColor() });
    }

    return randomCars;
}

export default getRandomCars;
