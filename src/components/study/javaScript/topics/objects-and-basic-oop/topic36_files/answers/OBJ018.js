// Getters and Setters
const person = {
    firstName: 'John',
    lastName: 'Doe',
    _age: 30,

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },

    set fullName(value) {
        const [first, last] = value.split(' ');
        this.firstName = first;
        this.lastName = last;
    },

    get age() {
        return this._age;
    },

    set age(value) {
        if (value < 0) {
            console.log('Age cannot be negative');
        } else {
            this._age = value;
        }
    }
};

console.log('Full name:', person.fullName);
person.fullName = 'Jane Smith';
console.log('After setter:', person.fullName);

person.age = 35;
console.log('Age:', person.age);
person.age = -5; // triggers validation
