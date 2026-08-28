// The this Keyword Inside Objects
const obj = {
    name: 'Test',
    regularFunc() {
        console.log('regularFunc this:', this.name);
    },
    arrowFunc: () => {
        console.log('arrowFunc this:', this.name);
    }
};

obj.regularFunc(); // 'Test'
obj.arrowFunc();   // undefined (or global object)

// Standalone function
function standalone() {
    console.log('standalone this (non-strict):', this);
}
standalone();
