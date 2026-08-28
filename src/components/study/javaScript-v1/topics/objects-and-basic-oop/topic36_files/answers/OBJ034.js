// Mixins: Copying Methods from Multiple Sources
const flyer = {
    fly() {
        return `${this.name} is flying.`;
    }
};

const swimmer = {
    swim() {
        return `${this.name} is swimming.`;
    }
};

function mixin(target, ...sources) {
    Object.assign(target, ...sources);
}

const duck = { name: 'Donald' };
mixin(duck, flyer, swimmer);

console.log(duck.fly());  // Donald is flying.
console.log(duck.swim()); // Donald is swimming.
