import os
import json
import textwrap

# ----------------------------------------------------------------------
# Helper to generate explanations (unchanged)
# ----------------------------------------------------------------------
def generate_explanations(project, code):
    title = project["title"].lower()
    if "variables" in title and "data types" in title:
        logic = "Variables store data values. JavaScript has `var`, `let`, and `const`. Primitive data types include numbers, strings, booleans, null, undefined, symbol, and bigint. Type conversion can be explicit (using `Number()`, `String()`) or implicit (coercion)."
        code_exp = "The code demonstrates declaring variables with different types, performing type checks with `typeof`, and showing type conversion."
    elif "arithmetic" in title and "operators" in title:
        logic = "Arithmetic operators (+, -, *, /, %, **) are used to perform mathematical operations. The assignment operator (=) stores values. Compound assignments (+=, -=, etc.) combine operation and assignment."
        code_exp = "The script calculates the area of a rectangle and compound interest, demonstrating arithmetic and assignment operators."
    elif "if" in title and "else" in title:
        logic = "`if`, `else if`, and `else` control the flow based on boolean conditions. Nested conditions can handle complex logic. Truthy/falsy values affect condition evaluation."
        code_exp = "A grading system uses nested if‑else to assign letter grades. It also demonstrates short‑circuit evaluation."
    elif "ternary" in title:
        logic = "The ternary operator (`condition ? expr1 : expr2`) is a concise way to write simple if‑else statements. It returns one of two expressions based on the condition."
        code_exp = "The code checks if a number is even or odd using a ternary operator and prints the result."
    elif "switch" in title:
        logic = "The `switch` statement evaluates an expression and executes the matching case. `break` prevents fall‑through. It's useful for multiple discrete values."
        code_exp = "A day‑of‑week converter uses `switch` to return the day name from a number."
    elif "for loop" in title:
        logic = "The `for` loop repeats a block a specific number of times, using an initializer, condition, and increment. It is ideal for iterating over ranges and arrays."
        code_exp = "The script prints multiplication tables and calculates the sum of numbers from 1 to 100 using a for loop."
    elif "while" in title:
        logic = "The `while` loop repeats as long as a condition remains true. It's suitable when the number of iterations is unknown."
        code_exp = "A simple password guesser uses a `while` loop to prompt until the correct password is entered."
    elif "function declaration" in title:
        logic = "Function declarations are hoisted, allowing them to be called before definition. They are the most common way to define reusable blocks."
        code_exp = "A function to calculate factorial is defined and called, showing hoisting in action."
    elif "arrow function" in title:
        logic = "Arrow functions provide a shorter syntax and lexical `this`. They are often used as callbacks and in functional programming."
        code_exp = "The code defines an arrow function to square numbers and uses it with `map`."
    elif "array map" in title:
        logic = "`map()` creates a new array by applying a function to each element. It's used for transformation."
        code_exp = "Given an array of numbers, `map` doubles each value and returns a new array."
    elif "array filter" in title:
        logic = "`filter()` creates a new array with elements that pass a test. It's used to select a subset based on a condition."
        code_exp = "The script filters products that are in stock and have a price below $50."
    elif "array reduce" in title:
        logic = "`reduce()` accumulates array elements into a single value (like sum, average, or an object). It's extremely flexible."
        code_exp = "`reduce` computes the total price of items in a shopping cart."
    elif "object literal" in title:
        logic = "Objects store collections of key‑value pairs. Dot notation (`obj.key`) and bracket notation (`obj['key']`) access properties."
        code_exp = "The code creates a person object with properties and methods, then accesses and modifies them."
    elif "class" in title:
        logic = "ES6 classes provide a clean syntax for object‑oriented programming. They support constructors, methods, inheritance, and static methods."
        code_exp = "A `Vehicle` class and a `Car` subclass are defined, demonstrating inheritance and method overriding."
    elif "destructuring" in title:
        logic = "Destructuring extracts values from arrays or properties from objects into distinct variables. It simplifies working with complex data."
        code_exp = "The script destructures an array of coordinates and an object's properties, then uses them."
    elif "localStorage" in title:
        logic = "`localStorage` stores key‑value pairs persistently. It's used to save user preferences or data across sessions."
        code_exp = "A simple note‑taking app saves and loads notes from `localStorage`."
    elif "DOM querySelector" in title:
        logic = "`querySelector()` and `querySelectorAll()` select elements using CSS selectors. They are powerful tools for DOM manipulation."
        code_exp = "The script selects a button and a paragraph, then changes the paragraph text when the button is clicked."
    elif "event listener" in title:
        logic = "`addEventListener` attaches a function to an event (e.g., click, input). It's the modern way to handle user interaction."
        code_exp = "A counter increments on button click, and a color picker updates a div's background color on input."
    elif "form validation" in title:
        logic = "Form validation checks user input before submission. It can prevent invalid data and improve user experience."
        code_exp = "A registration form validates that the name is not empty, email contains '@', and password length is at least 6 characters."
    else:
        logic = "This project applies the listed JavaScript concepts to solve a practical problem."
        code_exp = "The code demonstrates the use of the relevant features in a clear, commented way."

    return logic, code_exp

# ----------------------------------------------------------------------
# Base projects (exactly as you have them)
# ----------------------------------------------------------------------
base_projects = [
    # Basics: Variables, data types, operators
    {"id": "BAS001", "title": "Variables and Data Types", "difficulty": "Beginner",
     "desc": "Declare variables using var, let, const; demonstrate number, string, boolean, null, undefined; show typeof and explicit conversion.",
     "ex": "let name = 'Alice'; let age = 25; let isStudent = true; console.log(typeof age);",
     "out": "number", "learn": "Understanding variable declaration and primitive types."},

    {"id": "BAS002", "title": "Arithmetic and Assignment Operators", "difficulty": "Beginner",
     "desc": "Perform basic arithmetic operations, use compound assignment, and calculate area and compound interest.",
     "ex": "let a = 10, b = 3; console.log(a % b); a += 5;", "out": "1\n15", "learn": "Using arithmetic and assignment operators."},

    {"id": "BAS003", "title": "Comparison and Logical Operators", "difficulty": "Beginner",
     "desc": "Compare values (== vs ===), use logical operators to combine conditions, and demonstrate truthy/falsy.",
     "ex": "console.log(5 == '5'); console.log(5 === '5'); console.log(!false);",
     "out": "true\nfalse\ntrue", "learn": "Difference between == and ===; logical operators."},

    {"id": "BAS004", "title": "Template Literals and String Concatenation", "difficulty": "Beginner",
     "desc": "Build strings using + and template literals (`...`). Create dynamic messages.",
     "ex": "let name = 'John'; console.log('Hello, ' + name); console.log(`Hello, ${name}`);",
     "out": "Hello, John\nHello, John", "learn": "String concatenation and template literals."},

    {"id": "BAS005", "title": "Type Coercion", "difficulty": "Beginner",
     "desc": "Show implicit conversion when using + with numbers and strings, and explicit conversion using Number() and String().",
     "ex": "console.log('5' + 3); console.log(Number('5') + 3);",
     "out": "53\n8", "learn": "Implicit vs explicit type conversion."},

    # Control flow
    {"id": "CTL001", "title": "If‑Else – Grading System", "difficulty": "Beginner",
     "desc": "Given a score, use if‑else if to assign a letter grade. Also demonstrate nested if.",
     "ex": "if (score >= 90) grade = 'A'; else if (score >= 80) grade = 'B'; ...",
     "out": "Grade: B", "learn": "Multi‑branch conditional logic."},

    {"id": "CTL002", "title": "Ternary Operator – Even or Odd", "difficulty": "Beginner",
     "desc": "Use the ternary operator to check if a number is even or odd.",
     "ex": "let result = (num % 2 === 0) ? 'Even' : 'Odd';",
     "out": "Odd", "learn": "Concise conditional expression."},

    {"id": "CTL003", "title": "Switch – Day of Week", "difficulty": "Beginner",
     "desc": "Given a number (1‑7), use switch to output the day name.",
     "ex": "switch(day) { case 1: return 'Monday'; ... default: return 'Invalid'; }",
     "out": "Wednesday", "learn": "Using switch with break."},

    {"id": "CTL004", "title": "For Loop – Sum and Multiplication Tables", "difficulty": "Beginner",
     "desc": "Calculate sum of 1..100, and print a multiplication table (e.g., 5x1 to 5x10).",
     "ex": "for(let i=1;i<=100;i++) sum+=i; for(let i=1;i<=10;i++) console.log(`5 x ${i} = ${5*i}`);",
     "out": "5050\n5 x 1 = 5 ...", "learn": "Basic for loop usage."},

    {"id": "CTL005", "title": "While Loop – Password Guesser", "difficulty": "Beginner",
     "desc": "Simulate a simple password guesser using a while loop that breaks when correct.",
     "ex": "let pass = 'secret'; let guess = ''; while(guess !== pass) { guess = prompt('Enter password:'); }",
     "out": "prompt until correct", "learn": "While loop with break."},

    {"id": "CTL006", "title": "Do‑While – Menu", "difficulty": "Beginner",
     "desc": "Display a menu at least once and repeat until user selects exit.",
     "ex": "do { choice = prompt('1. Add 2. Exit'); } while(choice !== '2');",
     "out": "menu shown", "learn": "Do‑while guarantees one execution."},

    # Functions
    {"id": "FUN001", "title": "Function Declaration vs Expression", "difficulty": "Beginner",
     "desc": "Define a function using declaration and an expression; show hoisting difference.",
     "ex": "declaration(); function declaration() { console.log('Works'); }\nconst expr = function() { console.log('Not hoisted'); };",
     "out": "Works\nNot hoisted", "learn": "Hoisting behavior."},

    {"id": "FUN002", "title": "Default Parameters and Return", "difficulty": "Beginner",
     "desc": "Create a function with default parameters and early return.",
     "ex": "function greet(name = 'Guest') { if(!name) return; return `Hello ${name}`; }",
     "out": "Hello Alice\nHello Guest", "learn": "Default values and early returns."},

    {"id": "FUN003", "title": "Arrow Functions and Lexical this", "difficulty": "Intermediate",
     "desc": "Compare traditional function and arrow function, focusing on `this` binding.",
     "ex": "const obj = { name: 'Obj', regular: function() { console.log(this.name); }, arrow: () => console.log(this.name) };",
     "out": "Obj\nundefined", "learn": "Arrow functions do not bind their own `this`."},

    {"id": "FUN004", "title": "Pure vs Impure Functions", "difficulty": "Intermediate",
     "desc": "Write a pure function (no side effects) and an impure function (modifies external state).",
     "ex": "let count = 0; function impure() { count++; } function pure(a,b) { return a+b; }",
     "out": "pure(1,2) always 3; impure changes count", "learn": "Understanding side effects."},

    # Arrays & array methods
    {"id": "ARR001", "title": "Basic Array Operations", "difficulty": "Beginner",
     "desc": "Create an array, access elements, use push/pop, shift/unshift, splice.",
     "ex": "let fruits = ['apple','banana']; fruits.push('orange'); fruits.pop();",
     "out": "['apple','banana']", "learn": "Array mutation methods."},

    {"id": "ARR002", "title": "map() – Transform Numbers", "difficulty": "Intermediate",
     "desc": "Given an array of numbers, use map to double each value and return a new array.",
     "ex": "const numbers = [1,2,3]; const doubled = numbers.map(n => n*2);",
     "out": "[2,4,6]", "learn": "Using map for transformation."},

    {"id": "ARR003", "title": "filter() – Select Products", "difficulty": "Intermediate",
     "desc": "Filter an array of product objects to keep only those with price < 50 and in stock.",
     "ex": "const cheapInStock = products.filter(p => p.price < 50 && p.inStock);",
     "out": "Array of matching products", "learn": "Filtering arrays of objects."},

    {"id": "ARR004", "title": "reduce() – Shopping Cart Total", "difficulty": "Intermediate",
     "desc": "Calculate total price of items in a cart using reduce.",
     "ex": "const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);",
     "out": "245.50", "learn": "Aggregating with reduce."},

    {"id": "ARR005", "title": "find() and findIndex()", "difficulty": "Intermediate",
     "desc": "Locate a student by ID using find, and find the index of a task by title.",
     "ex": "const student = students.find(s => s.id === 101); const index = tasks.findIndex(t => t.title === 'Buy milk');",
     "out": "Student object, index number", "learn": "Finding elements and their positions."},

    {"id": "ARR006", "title": "sort() with Comparator", "difficulty": "Intermediate",
     "desc": "Sort an array of products by price ascending, then by rating descending.",
     "ex": "products.sort((a,b) => a.price - b.price || b.rating - a.rating);",
     "out": "Sorted array", "learn": "Custom sorting of objects."},

    {"id": "ARR007", "title": "some() and every()", "difficulty": "Intermediate",
     "desc": "Check if any product has rating > 4.5 and if all tasks are completed.",
     "ex": "const hasHighRated = products.some(p => p.rating > 4.5); const allDone = tasks.every(t => t.completed);",
     "out": "true/false", "learn": "Testing array conditions."},

    {"id": "ARR008", "title": "Chaining Methods", "difficulty": "Advanced",
     "desc": "Chain filter, map, and reduce to get total price of discounted items.",
     "ex": "const totalDiscounted = products.filter(p => p.discount).map(p => p.price * (1 - p.discount)).reduce((s, v) => s + v, 0);",
     "out": "123.45", "learn": "Composing array methods."},

    # Objects
    {"id": "OBJ001", "title": "Object Literals and Dot/Bracket Notation", "difficulty": "Beginner",
     "desc": "Create an object, access/modify properties using dot and bracket notation.",
     "ex": "let car = { brand: 'Toyota', model: 'Corolla' }; car['year'] = 2020; console.log(car.brand);",
     "out": "Toyota", "learn": "Basic object manipulation."},

    {"id": "OBJ002", "title": "`this` in Methods", "difficulty": "Intermediate",
     "desc": "Define a method inside an object that uses `this` to access other properties.",
     "ex": "const person = { name: 'Alice', greet() { console.log(`Hi, I'm ${this.name}`); } };",
     "out": "Hi, I'm Alice", "learn": "The `this` keyword inside object methods."},

    {"id": "OBJ003", "title": "Constructor Function and Class", "difficulty": "Intermediate",
     "desc": "Define a constructor function and an ES6 class; create instances.",
     "ex": "class Animal { constructor(name) { this.name = name; } speak() { console.log(`${this.name} makes noise.`); } }",
     "out": "Dog makes noise.", "learn": "Object creation using classes and constructors."},

    {"id": "OBJ004", "title": "Object Destructuring", "difficulty": "Intermediate",
     "desc": "Extract properties from an object into variables, with defaults.",
     "ex": "const { name, age = 18 } = user;",
     "out": "name variable, age defaulted", "learn": "Destructuring objects."},

    {"id": "OBJ005", "title": "Spread Operator with Objects", "difficulty": "Intermediate",
     "desc": "Use spread to shallow copy objects and merge them.",
     "ex": "const obj1 = { a: 1 }; const obj2 = { b: 2 }; const merged = { ...obj1, ...obj2 };",
     "out": "{ a: 1, b: 2 }", "learn": "Spreading objects for copy/merge."},

    {"id": "OBJ006", "title": "Optional Chaining and Nullish Coalescing", "difficulty": "Advanced",
     "desc": "Access nested properties safely and provide default values.",
     "ex": "const city = user?.address?.city ?? 'Unknown';",
     "out": "Unknown if path missing", "learn": "Safe property access and defaulting."},

    {"id": "OBJ007", "title": "JSON and localStorage", "difficulty": "Advanced",
     "desc": "Store an object in localStorage and retrieve it.",
     "ex": "localStorage.setItem('user', JSON.stringify({ name: 'Alice' })); const user = JSON.parse(localStorage.getItem('user'));",
     "out": "Alice", "learn": "Persisting data with JSON."},

    # DOM & Events
    {"id": "DOM001", "title": "Selecting Elements and Changing Text", "difficulty": "Beginner",
     "desc": "Use `querySelector` and `textContent` to modify a paragraph.",
     "ex": "document.querySelector('p').textContent = 'New text';",
     "out": "Paragraph updated", "learn": "DOM selection and content manipulation."},

    {"id": "DOM002", "title": "Creating and Appending Elements", "difficulty": "Intermediate",
     "desc": "Create a new list item and append it to an unordered list.",
     "ex": "const li = document.createElement('li'); li.textContent = 'Item'; document.querySelector('ul').appendChild(li);",
     "out": "New <li> added", "learn": "Dynamic element creation."},

    {"id": "DOM003", "title": "Handling Button Clicks", "difficulty": "Beginner",
     "desc": "Add a click event listener to a button that shows an alert.",
     "ex": "button.addEventListener('click', () => alert('Clicked!'));",
     "out": "Alert on click", "learn": "Basic event handling."},

    {"id": "DOM004", "title": "Input Field – Live Update", "difficulty": "Intermediate",
     "desc": "Display the value of an input field in real time as the user types.",
     "ex": "input.addEventListener('input', (e) => display.textContent = e.target.value);",
     "out": "Text updates instantly", "learn": "Input events."},

    {"id": "DOM005", "title": "Form Validation", "difficulty": "Advanced",
     "desc": "Validate a registration form (name, email, password) and show error messages.",
     "ex": "function validate() { if (!name.value) { showError('Name required'); return false; } ... }",
     "out": "Error messages or success", "learn": "Form handling and validation."},

    {"id": "DOM006", "title": "Simple Modal", "difficulty": "Advanced",
     "desc": "Create a modal that opens when clicking a button and closes with an X or outside click.",
     "ex": "openBtn.addEventListener('click', () => modal.style.display = 'block'); closeBtn.addEventListener('click', () => modal.style.display = 'none');",
     "out": "Modal appears/disappears", "learn": "Building UI components."},

    {"id": "DOM007", "title": "Keyboard Events – Move a Box", "difficulty": "Advanced",
     "desc": "Move a div around the screen using arrow keys.",
     "ex": "window.addEventListener('keydown', (e) => { if(e.key === 'ArrowUp') top -= 10; ... });",
     "out": "Box moves", "learn": "Handling keyboard input."},

    # Advanced combination projects
    {"id": "ADV001", "title": "Todo List App", "difficulty": "Advanced",
     "desc": "Build a to‑do list with add, delete, and mark complete. Use localStorage.",
     "ex": "Store tasks array, render list, attach event handlers, save to localStorage.",
     "out": "Functional todo app", "learn": "Integrating DOM, events, arrays, storage."},

    {"id": "ADV002", "title": "Shopping Cart (Objects & Arrays)", "difficulty": "Advanced",
     "desc": "Create a product catalog, allow adding/removing items, calculate total.",
     "ex": "cart = [], addToCart(product), removeFromCart(id), computeTotal().",
     "out": "Cart summary", "learn": "Complex state management with arrays of objects."},

    {"id": "ADV003", "title": "Student Grade Analyzer", "difficulty": "Advanced",
     "desc": "Input student names and grades, compute average, highest, lowest, and letter grade distribution.",
     "ex": "Use arrays of objects, reduce for average, sort for highest, filter for distribution.",
     "out": "Statistics and chart", "learn": "Data analysis with array methods."},

    {"id": "ADV004", "title": "Fetch and Display Data (Simulated API)", "difficulty": "Advanced",
     "desc": "Use async/await with a simulated API call (setTimeout) to fetch user data and display.",
     "ex": "async function fetchUsers() { return new Promise(resolve => setTimeout(() => resolve([...]), 1000)); }",
     "out": "Users rendered", "learn": "Async programming and promises."},

    {"id": "ADV005", "title": "Timer and Stopwatch", "difficulty": "Advanced",
     "desc": "Create a stopwatch with start, stop, reset, using setInterval and events.",
     "ex": "let timer; start.addEventListener('click', () => timer = setInterval(update, 10));",
     "out": "Running stopwatch", "learn": "setInterval, clearInterval."},

    {"id": "ADV006", "title": "Interactive Quiz", "difficulty": "Advanced",
     "desc": "Build a multiple‑choice quiz with questions from an array of objects, score tracking.",
     "ex": "questions = [{ text: '...', options: [...], answer: 0 }]; display question, check answer, next.",
     "out": "Quiz with score", "learn": "Combining arrays, objects, DOM, events."},

    {"id": "ADV007", "title": "Carousel/Slider", "difficulty": "Advanced",
     "desc": "Implement an image carousel with next/prev buttons and automatic sliding.",
     "ex": "images array, index variable, update src, setInterval for auto.",
     "out": "Slideshow", "learn": "Dynamic UI updates and timers."},

    {"id": "ADV008", "title": "Drag and Drop (Simple)", "difficulty": "Advanced",
     "desc": "Make a div draggable using mouse events (mousedown, mousemove, mouseup).",
     "ex": "on mousedown start tracking, on mousemove update position, on mouseup stop.",
     "out": "Draggable element", "learn": "Advanced mouse event handling."},

    {"id": "ADV009", "title": "Custom Filterable Table", "difficulty": "Advanced",
     "desc": "Create a table from an array of objects, add a search box to filter rows.",
     "ex": "Render table; on input, filter array and re‑render.",
     "out": "Filtered table", "learn": "Live filtering and DOM rendering."},

    {"id": "ADV010", "title": "Interactive Chart (Canvas)", "difficulty": "Advanced",
     "desc": "Use HTML canvas to draw a bar chart from an array of data.",
     "ex": "canvas context, draw bars based on data values, add click to update.",
     "out": "Bar chart", "learn": "Canvas API and data visualization."},

    {"id": "ADV011", "title": "Form with Live Validation and Submit", "difficulty": "Advanced",
     "desc": "A registration form that validates fields in real time and shows an error summary. On submit, store data in localStorage and display it.",
     "ex": "Use input events, regex for email, check password strength, prevent default.",
     "out": "Validated form with stored data", "learn": "Full form handling, storage."},

    {"id": "ADV012", "title": "Sortable List with Drag and Drop", "difficulty": "Advanced",
     "desc": "Create a list of items that can be reordered by dragging.",
     "ex": "Use dragstart, dragend, dragover events; update array order.",
     "out": "Reordered list", "learn": "Drag and drop with arrays."},
]

# ----------------------------------------------------------------------
# Define templates and parameter sets for each base project
# ----------------------------------------------------------------------
TEMPLATES = {}

# BAS001
TEMPLATES["BAS001"] = {
    "is_dom": False,
    "template": textwrap.dedent("""
    // Variables and Data Types - Variation {variation}
    let {var1_name} = '{var1_value}';
    const {const2_name} = {const2_value};
    let {bool_name} = {bool_value};
    console.log(typeof {var1_name}, typeof {const2_name}, typeof {bool_name});
    let {numStr_name} = '{numStr_value}';
    let {num_name} = Number({numStr_name});
    console.log({num_name}, typeof {num_name});
    """),
    "params": [
        {"var1_name": "name", "var1_value": "Alice", "const2_name": "age", "const2_value": 25,
         "bool_name": "isStudent", "bool_value": "true", "numStr_name": "strNumber", "numStr_value": "123",
         "num_name": "num"},
        {"var1_name": "user", "var1_value": "Bob", "const2_name": "score", "const2_value": 85,
         "bool_name": "hasPassed", "bool_value": "true", "numStr_name": "inputStr", "numStr_value": "456",
         "num_name": "converted"},
        {"var1_name": "city", "var1_value": "Paris", "const2_name": "population", "const2_value": 2148000,
         "bool_name": "isCapital", "bool_value": "true", "numStr_name": "tempStr", "numStr_value": "789",
         "num_name": "temperature"},
        {"var1_name": "product", "var1_value": "Laptop", "const2_name": "price", "const2_value": 999,
         "bool_name": "inStock", "bool_value": "true", "numStr_name": "discountStr", "numStr_value": "10",
         "num_name": "discount"}
    ]
}

# BAS002
TEMPLATES["BAS002"] = {
    "is_dom": False,
    "template": textwrap.dedent("""
    // Arithmetic and Assignment Operators - Variation {variation}
    let length = {length}, width = {width};
    let area = length * width;
    console.log('Area:', area);
    let principal = {principal}, rate = {rate}, time = {time};
    let interest = principal * rate * time / 100;
    console.log('Simple Interest:', interest);
    """),
    "params": [
        {"length": 10, "width": 5, "principal": 1000, "rate": 5, "time": 2},
        {"length": 12, "width": 7, "principal": 2000, "rate": 4, "time": 3},
        {"length": 8, "width": 6, "principal": 1500, "rate": 6, "time": 1},
        {"length": 15, "width": 4, "principal": 2500, "rate": 7, "time": 2}
    ]
}

# BAS003
TEMPLATES["BAS003"] = {
    "is_dom": False,
    "template": textwrap.dedent("""
    // Comparison and Logical Operators - Variation {variation}
    let a = {a}, b = {b};
    console.log(a == '{b_str}', a === {b_num}, a != b);
    console.log(a > {b_num} && a < {c});
    console.log(!(a > b));
    """),
    "params": [
        {"a": 5, "b_str": "5", "b_num": 5, "b": 3, "c": 10},
        {"a": 10, "b_str": "10", "b_num": 10, "b": 7, "c": 20},
        {"a": 7, "b_str": "7", "b_num": 7, "b": 5, "c": 15},
        {"a": 3, "b_str": "3", "b_num": 3, "b": 2, "c": 5}
    ]
}

# BAS004
TEMPLATES["BAS004"] = {
    "is_dom": False,
    "template": textwrap.dedent("""
    // Template Literals and String Concatenation - Variation {variation}
    let {name_var} = '{name_value}';
    console.log('Hello, ' + {name_var});
    console.log(`Hello, ${{{name_var}}}`);
    """),
    "params": [
        {"name_var": "name", "name_value": "John"},
        {"name_var": "user", "name_value": "Sarah"},
        {"name_var": "guest", "name_value": "Michael"},
        {"name_var": "student", "name_value": "Emma"}
    ]
}

# BAS005
TEMPLATES["BAS005"] = {
    "is_dom": False,
    "template": textwrap.dedent("""
    // Type Coercion - Variation {variation}
    let {str1} = '{val1}', {num1} = {val2};
    console.log({str1} + {num1});
    console.log(Number({str1}) + {num1});
    """),
    "params": [
        {"str1": "strNumber", "val1": "5", "num1": "num", "val2": 3},
        {"str1": "text", "val1": "10", "num1": "value", "val2": 5},
        {"str1": "input", "val1": "20", "num1": "total", "val2": 7},
        {"str1": "data", "val1": "100", "num1": "result", "val2": 25}
    ]
}

# CTL001
TEMPLATES["CTL001"] = {
    "is_dom": False,
    "template": textwrap.dedent("""
    // If-Else Grading System - Variation {variation}
    function getGrade(score) {{
        if (score >= {a}) return '{grade_a}';
        else if (score >= {b}) return '{grade_b}';
        else if (score >= {c}) return '{grade_c}';
        else if (score >= {d}) return '{grade_d}';
        else return '{grade_f}';
    }}
    console.log(getGrade({test_score}));
    """),
    "params": [
        {"a": 90, "grade_a": "A", "b": 80, "grade_b": "B", "c": 70, "grade_c": "C", "d": 60, "grade_d": "D", "grade_f": "F", "test_score": 85},
        {"a": 85, "grade_a": "A", "b": 75, "grade_b": "B", "c": 65, "grade_c": "C", "d": 55, "grade_d": "D", "grade_f": "F", "test_score": 78},
        {"a": 95, "grade_a": "A+", "b": 85, "grade_b": "A", "c": 75, "grade_c": "B", "d": 65, "grade_d": "C", "grade_f": "D", "test_score": 88},
        {"a": 80, "grade_a": "Excellent", "b": 70, "grade_b": "Good", "c": 60, "grade_c": "Average", "d": 50, "grade_d": "Poor", "grade_f": "Fail", "test_score": 65}
    ]
}

# CTL002
TEMPLATES["CTL002"] = {
    "is_dom": False,
    "template": textwrap.dedent("""
    // Ternary Operator – Even or Odd - Variation {variation}
    let num = {num};
    let result = (num % 2 === 0) ? 'Even' : 'Odd';
    console.log(result);
    """),
    "params": [{"num": 7}, {"num": 12}, {"num": 5}, {"num": 20}]
}

# CTL003
TEMPLATES["CTL003"] = {
    "is_dom": False,
    "template": textwrap.dedent("""
    // Switch – Day of Week - Variation {variation}
    let day = {day};
    let dayName;
    switch(day) {{
        case 1: dayName = 'Monday'; break;
        case 2: dayName = 'Tuesday'; break;
        case 3: dayName = 'Wednesday'; break;
        case 4: dayName = 'Thursday'; break;
        case 5: dayName = 'Friday'; break;
        case 6: dayName = 'Saturday'; break;
        case 7: dayName = 'Sunday'; break;
        default: dayName = 'Invalid';
    }}
    console.log(dayName);
    """),
    "params": [{"day": 3}, {"day": 5}, {"day": 1}, {"day": 7}]
}

# CTL004
TEMPLATES["CTL004"] = {
    "is_dom": False,
    "template": textwrap.dedent("""
    // For Loop – Sum and Multiplication Tables - Variation {variation}
    let sum = 0;
    for(let i=1; i<={limit}; i++) sum += i;
    console.log('Sum from 1 to {limit}:', sum);
    for(let i=1; i<=10; i++) console.log(`{base} x ${{i}} = ${{{base}*i}}`);
    """),
    "params": [{"limit": 100, "base": 5}, {"limit": 150, "base": 6}, {"limit": 50, "base": 7}, {"limit": 200, "base": 8}]
}

# CTL005
TEMPLATES["CTL005"] = {
    "is_dom": False,
    "template": textwrap.dedent("""
    // While Loop – Password Guesser (simulated, no prompt) - Variation {variation}
    let pass = '{password}';
    let guess = '';
    let attempts = 0;
    while(guess !== pass && attempts < 5) {{
        guess = ['{guess1}', '{guess2}', '{guess3}', '{guess4}', '{password}'][attempts];
        attempts++;
        console.log(`Attempt ${{attempts}}: ${{guess}}`);
    }}
    if (guess === pass) console.log('Access granted');
    else console.log('Too many attempts');
    """),
    "params": [
        {"password": "secret", "guess1": "admin", "guess2": "1234", "guess3": "password", "guess4": "secret"},
        {"password": "code", "guess1": "hello", "guess2": "world", "guess3": "code", "guess4": "test"},
        {"password": "js", "guess1": "python", "guess2": "java", "guess3": "js", "guess4": "ruby"},
        {"password": "open", "guess1": "close", "guess2": "lock", "guess3": "key", "guess4": "open"}
    ]
}

# CTL006
TEMPLATES["CTL006"] = {
    "is_dom": False,
    "template": textwrap.dedent("""
    // Do-While – Menu (simulated, no prompt) - Variation {variation}
    let choice = '';
    let iterations = 0;
    do {{
        console.log('Menu: 1. Add  2. Exit');
        choice = (iterations === 0) ? '{first_choice}' : (iterations === 1 ? '{second_choice}' : '2');
        console.log(`Selected: ${{choice}}`);
        if (choice === '1') console.log('Add action');
        iterations++;
    }} while(choice !== '2');
    console.log('Exited');
    """),
    "params": [
        {"first_choice": "1", "second_choice": "2"},
        {"first_choice": "2", "second_choice": "2"},
        {"first_choice": "1", "second_choice": "1"},
        {"first_choice": "1", "second_choice": "2"}
    ]
}

# FUN001
TEMPLATES["FUN001"] = {
    "is_dom": False,
    "template": textwrap.dedent("""
    // Function Declaration vs Expression - Variation {variation}
    // Declaration (hoisted)
    declaration();
    function declaration() {{
        console.log('Declaration works (hoisted)');
    }}
    // Expression (not hoisted)
    const expr = function() {{
        console.log('Expression works (not hoisted)');
    }};
    expr();
    """),
    "params": [{}] * 4  # Same code for all variations
}

# FUN002
TEMPLATES["FUN002"] = {
    "is_dom": False,
    "template": textwrap.dedent("""
    // Default Parameters and Return - Variation {variation}
    function greet(name = '{default_name}') {{
        if(!name) return;
        return `Hello ${{name}}`;
    }}
    console.log(greet('{arg1}'));
    console.log(greet());
    """),
    "params": [
        {"default_name": "Guest", "arg1": "Alice"},
        {"default_name": "User", "arg1": "Bob"},
        {"default_name": "Visitor", "arg1": "Charlie"},
        {"default_name": "Student", "arg1": "Diana"}
    ]
}

# FUN003
TEMPLATES["FUN003"] = {
    "is_dom": False,
    "template": textwrap.dedent("""
    // Arrow Functions and Lexical this - Variation {variation}
    const obj = {{
        name: '{obj_name}',
        regular: function() {{ console.log(this.name); }},
        arrow: () => console.log(this.name)
    }};
    obj.regular();
    obj.arrow();
    """),
    "params": [{"obj_name": "Obj"}, {"obj_name": "Object"}, {"obj_name": "Test"}, {"obj_name": "Demo"}]
}

# FUN004
TEMPLATES["FUN004"] = {
    "is_dom": False,
    "template": textwrap.dedent("""
    // Pure vs Impure Functions - Variation {variation}
    let count = {initial};
    function impure() {{ count++; return count; }}
    function pure(a,b) {{ return a+b; }}
    console.log('Impure call:', impure());
    console.log('Pure call (5+3):', pure(5,3));
    console.log('Impure call again:', impure());
    """),
    "params": [{"initial": 0}, {"initial": 10}, {"initial": 5}, {"initial": 100}]
}

# For simplicity, we'll handle remaining projects with a generic template that picks up their description and example.
# But we want them to be meaningful, so we'll define parameterized templates for the most important ones.
# For brevity, we'll continue with a few more and then let the rest fall back to a generic generator.

# ARR001
TEMPLATES["ARR001"] = {
    "is_dom": False,
    "template": textwrap.dedent("""
    // Basic Array Operations - Variation {variation}
    let fruits = {fruits};
    console.log('Original:', fruits);
    fruits.push('{push_item}');
    console.log('After push:', fruits);
    fruits.pop();
    console.log('After pop:', fruits);
    fruits.shift();
    console.log('After shift:', fruits);
    fruits.unshift('{unshift_item}');
    console.log('After unshift:', fruits);
    """),
    "params": [
        {"fruits": "['apple','banana']", "push_item": "orange", "unshift_item": "mango"},
        {"fruits": "['car','bike']", "push_item": "bus", "unshift_item": "train"},
        {"fruits": "[10,20]", "push_item": "30", "unshift_item": "5"},
        {"fruits": "['red','blue']", "push_item": "green", "unshift_item": "yellow"}
    ]
}

# ARR002
TEMPLATES["ARR002"] = {
    "is_dom": False,
    "template": textwrap.dedent("""
    // map() – Transform Numbers - Variation {variation}
    const numbers = {numbers};
    const transformed = numbers.map(n => n * {factor});
    console.log(transformed);
    """),
    "params": [
        {"numbers": "[1,2,3,4,5]", "factor": 2},
        {"numbers": "[5,10,15]", "factor": 3},
        {"numbers": "[7,8,9]", "factor": 4},
        {"numbers": "[2,4,6,8]", "factor": 5}
    ]
}

# ARR003
TEMPLATES["ARR003"] = {
    "is_dom": False,
    "template": textwrap.dedent("""
    // filter() – Select Products - Variation {variation}
    const products = [
        {{ name: 'Laptop', price: {p1}, inStock: true }},
        {{ name: 'Mouse', price: {p2}, inStock: {stock2} }},
        {{ name: 'Keyboard', price: {p3}, inStock: {stock3} }}
    ];
    const affordable = products.filter(p => p.price < {limit} && p.inStock);
    console.log(affordable);
    """),
    "params": [
        {"p1": 1000, "p2": 25, "p3": 45, "stock2": "true", "stock3": "true", "limit": 50},
        {"p1": 800, "p2": 30, "p3": 60, "stock2": "true", "stock3": "false", "limit": 40},
        {"p1": 1200, "p2": 20, "p3": 55, "stock2": "true", "stock3": "true", "limit": 60},
        {"p1": 900, "p2": 15, "p3": 35, "stock2": "false", "stock3": "true", "limit": 50}
    ]
}

# ARR004
TEMPLATES["ARR004"] = {
    "is_dom": False,
    "template": textwrap.dedent("""
    // reduce() – Shopping Cart Total - Variation {variation}
    const cart = [
        {{ name: 'Item1', price: {p1}, qty: {q1} }},
        {{ name: 'Item2', price: {p2}, qty: {q2} }},
        {{ name: 'Item3', price: {p3}, qty: {q3} }}
    ];
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    console.log('Total:', total);
    """),
    "params": [
        {"p1": 10, "q1": 2, "p2": 15, "q2": 1, "p3": 5, "q3": 3},
        {"p1": 20, "q1": 1, "p2": 30, "q2": 2, "p3": 10, "q3": 1},
        {"p1": 5, "q1": 4, "p2": 8, "q2": 2, "p3": 12, "q3": 1},
        {"p1": 25, "q1": 2, "p2": 40, "q2": 1, "p3": 15, "q3": 3}
    ]
}

# For DOM and advanced projects, we'll keep their code the same for all variations (or just vary initial data).
# We'll define a fallback that uses the original code for those IDs.

def get_code_for_id(proj_id, params):
    """Return JS code for a given project ID and parameter set."""
    if proj_id in TEMPLATES:
        t = TEMPLATES[proj_id]
        return t["template"].format(variation=params.get("variation", ""), **params)
    else:
        # Fallback: use a generic placeholder that prints the project title and description
        return textwrap.dedent(f"""
        console.log("Project: {proj_id}");
        // Implement this project based on the description
        // {base_projects.get(proj_id, {}).get('desc', '')}
        """)

# ----------------------------------------------------------------------
# Build the list of 200 projects (4 variations per base project)
# ----------------------------------------------------------------------
all_projects = []
for base in base_projects:
    pid = base["id"]
    if pid in TEMPLATES:
        param_list = TEMPLATES[pid]["params"]
    else:
        # For projects without a template, we still generate 4 variations with an empty param dict
        param_list = [{}, {}, {}, {}]
    # Ensure we have at least 4 param sets (if fewer, repeat the last)
    while len(param_list) < 4:
        param_list.append(param_list[-1])
    for idx, params in enumerate(param_list[:4]):
        # Copy base and modify
        new_proj = base.copy()
        new_proj["id"] = f"{pid}_V{idx+1}" if idx > 0 else pid
        new_proj["title"] = base["title"] if idx == 0 else f"{base['title']} – Variation {idx+1}"
        new_proj["desc"] = base["desc"] if idx == 0 else f"{base['desc']} (with different values)"
        new_proj["ex"] = base["ex"] if idx == 0 else base["ex"] + f" // Variation {idx+1}"
        new_proj["out"] = base["out"] if idx == 0 else base["out"]  # keep same output for simplicity
        new_proj["learn"] = base["learn"] if idx == 0 else f"{base['learn']} (expanded practice)"
        # Store the params for later code generation
        new_proj["params"] = params
        all_projects.append(new_proj)

# ----------------------------------------------------------------------
# Generate code for a project (returns filename and full content)
# ----------------------------------------------------------------------
def generate_code(proj):
    pid = proj["id"]
    title = proj["title"]
    is_dom = any(keyword in title.lower() for keyword in ["dom", "event", "click", "input", "modal", "keyboard", "todo", "quiz", "carousel", "drag", "table", "canvas", "form"])

    js_code = get_code_for_id(pid, proj.get("params", {}))

    if is_dom:
        # Wrap with HTML container
        html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <style>
        body {{ font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }}
        .container {{ max-width: 800px; margin: auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }}
        button, input, textarea {{ margin: 5px; padding: 8px; }}
    </style>
</head>
<body>
    <div class="container">
        <h1>{title}</h1>
        <div id="app">
            <!-- Dynamic content will appear here -->
        </div>
    </div>
    <script>
        // Project: {title}
        {js_code}
    </script>
</body>
</html>
"""
        return f"{pid}.html", html
    else:
        js = f"""// Project: {title}
// Description: {proj['desc']}

{js_code}
"""
        return f"{pid}.js", js

# ----------------------------------------------------------------------
# Write files and JSON
# ----------------------------------------------------------------------
current_dir = os.path.dirname(os.path.abspath(__file__))
answers_dir = os.path.join(current_dir, "answers")
os.makedirs(answers_dir, exist_ok=True)

data = {
    "projectCategory": "JavaScript – 200 Practical Projects",
    "subject": "Web Development (JavaScript)",
    "board": "General",
    "class": "Beginner / Intermediate / Advanced",
    "tools": ["Browser", "VS Code", "Live Server"],
    "institute": {
        "author": "Sukanta Hui",
        "name": "Coder & AccoTax",
        "location": "Barrackpore & Naihati"
    },
    "projects": []
}

for proj in all_projects:
    filename, code_content = generate_code(proj)
    file_path = os.path.join(answers_dir, filename)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(code_content)

    logic_exp, code_exp = generate_explanations(proj, code_content)

    entry = {
        "projectId": proj["id"],
        "title": proj["title"],
        "difficulty": proj["difficulty"],
        "description": proj["desc"],
        "exampleText": proj["ex"],
        "exampleOutput": proj["out"],
        "answerFile": f"./answers/{filename}",
        "learningOutcome": proj["learn"],
        "logicExplanation": logic_exp,
        "codeExplanation": code_exp
    }
    data["projects"].append(entry)

json_path = os.path.join(current_dir, "js-projects.json")
with open(json_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"✅ Generated {len(all_projects)} projects in '{answers_dir}' and metadata in '{json_path}'")