// Function Binding in Event Handlers
class Button {
    constructor(label) {
        this.label = label;
    }

    handleClick() {
        console.log(`Button ${this.label} clicked`);
    }
}

const btn = new Button('Submit');
// Simulate a click handler that loses context
setTimeout(btn.handleClick, 1000); // Button undefined clicked
// Bind fixes it
setTimeout(btn.handleClick.bind(btn), 1000); // Button Submit clicked
