// JSON.parse and JSON.stringify
const obj = {
    name: 'Alice',
    age: 30,
    hobbies: ['reading', 'gaming'],
    address: { city: 'NYC', zip: '10001' }
};

const jsonString = JSON.stringify(obj);
console.log('JSON string:', jsonString);

const parsedObj = JSON.parse(jsonString);
console.log('Parsed object:', parsedObj);

// Compare content (they are equal but not same reference)
console.log('Content equal?', JSON.stringify(obj) === JSON.stringify(parsedObj));
console.log('Same reference?', obj === parsedObj);
