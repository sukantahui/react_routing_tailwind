// Dot vs Bracket Notation
const user = {
    name: 'John',
    'favorite color': 'blue'
};

// Dot notation (works for valid identifiers)
console.log('Dot name:', user.name);

// Bracket notation (always works)
console.log('Bracket name:', user['name']);
console.log('Bracket favorite color:', user['favorite color']);

// Dynamic key
const prop = 'name';
console.log('Dynamic key:', user[prop]);
