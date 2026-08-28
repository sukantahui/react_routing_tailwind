// Object.keys, Object.values, Object.entries
const car = {
    brand: 'Toyota',
    model: 'Camry',
    year: 2020
};

const keys = Object.keys(car);
console.log('Keys:', keys);

const values = Object.values(car);
console.log('Values:', values);

const entries = Object.entries(car);
console.log('Entries:', entries);

// Iterating with forEach
entries.forEach(([key, value]) => {
    console.log(`${key} -> ${value}`);
});
