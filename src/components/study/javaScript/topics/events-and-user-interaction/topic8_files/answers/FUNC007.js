// Function Hoisting
hoisted(); // Works

function hoisted() {
    console.log('Hoisted!');
}

// notHoisted(); // TypeError: notHoisted is not a function
var notHoisted = function() {
    console.log('Not hoisted');
};
notHoisted(); // Works now
