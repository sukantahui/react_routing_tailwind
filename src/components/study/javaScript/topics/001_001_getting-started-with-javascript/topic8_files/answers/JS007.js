/**
 * JS007: Script Placement: Synchronous Parser Blocking vs Bottom Placement
 * Module: 001_001_getting-started-with-javascript (Topic 4)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

// Simulated DOM tree representation
const mockDOM = {
  elements: {},
  register(tag, id, content) {
    this.elements[id] = { tag, id, content };
  },
  getElementById(id) {
    return this.elements[id] || null;
  }
};

console.log("=== Scenario 1: Inline Synchronous Script in <head> ===");
// HTML parser is at line 4 (<head>); #app element at line 25 has NOT been parsed yet
let targetElementHead = mockDOM.getElementById("app");
console.log("Querying document.getElementById('app') in <head>:", targetElementHead); // null
console.log("Attempting targetElementHead.textContent = 'Welcome' → Throws: TypeError: Cannot set properties of null!\n");

console.log("=== Scenario 2: Script Placed Before </body> Tag ===");
// HTML parser parses <div id="app">...</div> before encountering <script> at bottom of <body>
mockDOM.register("div", "app", "Welcome to Coder & AccoTax");
let targetElementBottom = mockDOM.getElementById("app");
console.log("Querying document.getElementById('app') before </body>:", targetElementBottom);
console.log("Successfully updated DOM content to:", targetElementBottom.content);
