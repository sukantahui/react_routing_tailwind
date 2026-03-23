import os
import json
import textwrap

# ----------------------------------------------------------------------
# Full list of JavaScript topics (for reference and project generation)
# ----------------------------------------------------------------------
TOPICS = [
    "Function declarations vs function expressions",
    "Parameters, arguments and default parameters",
    "Return values and early returns",
    "Function scope basics: local vs global variables",
    "Arrow functions and concise syntax",
    "Pure functions vs side effects (intro idea)",
    "Creating arrays, indexing and length",
    "Mutating methods: push, pop, shift, unshift, splice",
    "Non-mutating methods: slice, concat",
    "Searching: indexOf, includes, find, findIndex",
    "Iterating arrays with for, for-of and forEach",
    "Intro to higher-order methods: map, filter, reduce (light overview)",
    "Projects Basic",
    "Project Advance",
    "Object literals: keys, values, methods",
    "Accessing properties: dot vs bracket notation",
    "Nested objects and arrays of objects",
    "The this keyword (beginner-level understanding)",
    "Constructor functions and the new keyword (overview)",
    "ES6 class syntax, constructor, methods and basic inheritance (conceptual)",
    "Object literals: keys, values, methods",
    "Accessing properties: dot vs bracket notation",
    "Adding, updating and deleting object properties",
    "Checking properties: in operator and hasOwnProperty()",
    "Nested objects and arrays of objects",
    "Accessing deeply nested values",
    "The this keyword inside objects (beginner-friendly)",
    "Arrow functions vs normal functions: this difference",
    "Iterating objects: for...in loop",
    "Object.keys(), Object.values(), Object.entries()",
    "Looping arrays of objects using map, filter, reduce",
    "Objects as reference types",
    "Shallow copy: spread operator and Object.assign()",
    "Deep copy: structuredClone() and JSON technique",
    "Shorthand properties and computed property names",
    "Object destructuring and nested destructuring",
    "Spread and rest operator for objects",
    "Default values in destructuring",
    "Getters and setters",
    "Optional chaining (?.) and nullish coalescing (??)",
    "Object.freeze(), Object.seal() and preventExtensions()",
    "Constructor functions and the new keyword (overview)",
    "Prototype and prototype chain (conceptual understanding)",
    "Adding methods using prototypes",
    "ES6 class syntax: constructor, instance methods, static methods",
    "Class inheritance using extends",
    "super() keyword and method overriding",
    "JSON.parse() and JSON.stringify()",
    "Storing and retrieving objects in LocalStorage",
    "Merging objects and checking object equality",
    "Working with arrays of objects (students, products, tasks)",
    "map() with objects – transforming shapes and selecting fields",
    "filter() with multiple conditions and nested object filtering",
    "reduce() for totals, grouping, counting and analytics",
    "find() and findIndex() – locating complex objects",
    "sort() with custom comparator functions (marks, price, name)",
    "some() and every() with object validation",
    "Chaining array methods (map → filter → reduce)",
    "Deep array transformations inside nested objects",
    "Real-world datasets (students, courses, products, tasks)",
    "What is the DOM? Nodes, elements and the tree structure",
    "Selecting elements: getElementById, querySelector, querySelectorAll",
    "Changing text, HTML and styles dynamically",
    "Creating, appending and removing elements",
    "Working with attributes, classes and data-* attributes",
    "Event types: click, input, change, submit, keyup, keydown, mouse events",
    "addEventListener and removing event listeners",
    "Event object basics and target property",
    "Event bubbling and capturing (intro, conceptual)",
    "Form handling and simple validation with JavaScript",
    "Building components: modal popup, tabs, accordion",
    "Keyboard Events — keydown, keyup & keypress"
]

# ----------------------------------------------------------------------
# Helper to generate explanations based on project title and code
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
    elif "dom" in title or "event" in title or "modal" in title or "form" in title:
        logic = "The Document Object Model (DOM) represents the page structure. JavaScript can select elements, modify them, and respond to user events."
        code_exp = "The code demonstrates selecting elements, adding event listeners, and updating the page dynamically."
    else:
        logic = "This project applies the listed JavaScript concepts to solve a practical problem."
        code_exp = "The code demonstrates the use of the relevant features in a clear, commented way."

    return logic, code_exp


# ----------------------------------------------------------------------
# Base projects (original 50)
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
     "out": "Reordered list", "learn": "Drag and drop with arrays."}
]


# ----------------------------------------------------------------------
# Generate additional projects from topics (to reach 200 total)
# ----------------------------------------------------------------------
def create_topic_project(index, topic):
    """Create a project definition from a topic string."""
    title = topic.strip()
    # Remove any trailing colon or punctuation
    if title.endswith(':'):
        title = title[:-1]
    # Capitalize first letter of each word
    title = title.title()
    # Generate ID as "TOPxxx"
    pid = f"TOP{index+1:03d}"
    # Determine difficulty based on keywords
    difficulty = "Beginner"
    if any(kw in title.lower() for kw in ["advanced", "complex", "deep", "prototype", "inheritance", "chaining"]):
        difficulty = "Advanced"
    elif any(kw in title.lower() for kw in ["intermediate", "higher-order", "closure", "event bubbling"]):
        difficulty = "Intermediate"
    # Description: reuse the topic as a sentence
    desc = f"This project demonstrates {title.lower()} in JavaScript."
    # Example: short code snippet (will be refined in get_js_code)
    ex = f"// Code for {title}"
    out = "See console or UI"
    learn = f"Understanding {title.lower()}."

    return {
        "id": pid,
        "title": title,
        "difficulty": difficulty,
        "desc": desc,
        "ex": ex,
        "out": out,
        "learn": learn
    }

# We have 50 base projects. We need 150 more to reach 200.
additional_projects = [create_topic_project(i, topic) for i, topic in enumerate(TOPICS[:150])]
# If TOPICS has more than 150, we take first 150; else we duplicate some to reach 150.
if len(additional_projects) < 150:
    # Duplicate last few to reach 150
    needed = 150 - len(additional_projects)
    for i in range(needed):
        additional_projects.append(create_topic_project(len(additional_projects), f"Advanced: {TOPICS[i % len(TOPICS)]}"))

# Combine all projects
projects = base_projects + additional_projects
print(f"Total projects generated: {len(projects)}")  # Should be 200

# ----------------------------------------------------------------------
# Code templates for different project categories
# ----------------------------------------------------------------------
def template_basic_js(proj):
    """Default template: simple console demo"""
    return f"""
console.log("=== {proj['title']} ===");
// {proj['desc']}
// Add your implementation here
"""

def template_variables_data_types(proj):
    return """
let name = 'Alice';
let age = 25;
let isStudent = true;
let nothing = null;
let notDefined;
console.log(typeof name, typeof age, typeof isStudent, typeof nothing, typeof notDefined);
// Type conversion
let numStr = '123';
let num = Number(numStr);
console.log(num, typeof num);
console.log(String(123), Boolean(0));
"""

def template_arithmetic_operators(proj):
    return """
let a = 10, b = 3;
console.log('a + b =', a + b);
console.log('a - b =', a - b);
console.log('a * b =', a * b);
console.log('a / b =', a / b);
console.log('a % b =', a % b);
console.log('a ** b =', a ** b);
// Compound assignment
a += 5;
console.log('a after +=5:', a);
// Area of rectangle
let length = 8, width = 5;
let area = length * width;
console.log('Area:', area);
"""

def template_if_else(proj):
    return """
function getGrade(score) {
    if (score >= 90) return 'A';
    else if (score >= 80) return 'B';
    else if (score >= 70) return 'C';
    else if (score >= 60) return 'D';
    else return 'F';
}
console.log('Grade for 85:', getGrade(85));
console.log('Grade for 92:', getGrade(92));
console.log('Grade for 67:', getGrade(67));
"""

def template_ternary(proj):
    return """
let num = 7;
let parity = (num % 2 === 0) ? 'Even' : 'Odd';
console.log(`${num} is ${parity}`);
"""

def template_switch(proj):
    return """
function getDayName(dayNum) {
    switch(dayNum) {
        case 1: return 'Monday';
        case 2: return 'Tuesday';
        case 3: return 'Wednesday';
        case 4: return 'Thursday';
        case 5: return 'Friday';
        case 6: return 'Saturday';
        case 7: return 'Sunday';
        default: return 'Invalid day';
    }
}
console.log('Day 3:', getDayName(3));
console.log('Day 7:', getDayName(7));
"""

def template_for_loop(proj):
    return """
// Sum 1..100
let sum = 0;
for (let i = 1; i <= 100; i++) {
    sum += i;
}
console.log('Sum 1-100:', sum);
// Multiplication table for 5
console.log('5 times table:');
for (let i = 1; i <= 10; i++) {
    console.log(`5 x ${i} = ${5 * i}`);
}
"""

def template_while_loop(proj):
    return """
// Simulated password guesser (using confirm to avoid prompt spam)
let password = 'secret';
let guess = '';
while (guess !== password) {
    guess = prompt('Enter password:');
    if (guess === null) break;
}
if (guess === password) alert('Access granted!');
"""

def template_do_while(proj):
    return """
// Menu simulation using confirm
let choice;
do {
    choice = confirm('Click OK to continue, Cancel to exit.');
} while (choice);
console.log('Exited.');
"""

def template_function_declaration(proj):
    return """
// Function declaration (hoisted)
console.log(factorial(5)); // works even before definition
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n-1);
}
// Function expression (not hoisted)
const square = function(x) { return x * x; };
console.log(square(4));
"""

def template_arrow_function(proj):
    return """
const add = (a, b) => a + b;
const square = x => x * x;
const greet = name => `Hello, ${name}!`;
console.log(add(3, 4));
console.log(square(5));
console.log(greet('Alice'));
// Lexical this example
const obj = {
    name: 'Object',
    regular: function() { console.log(this.name); },
    arrow: () => console.log(this.name)
};
obj.regular(); // 'Object'
obj.arrow();   // undefined (window/global)
"""

def template_pure_vs_impure(proj):
    return """
// Pure function
function add(a, b) {
    return a + b;
}
// Impure function (modifies external state)
let counter = 0;
function increment() {
    counter++;
}
console.log('Pure: add(2,3) =', add(2,3));
increment();
console.log('Impure: counter =', counter);
"""

def template_array_basic(proj):
    return """
let fruits = ['apple', 'banana', 'orange'];
console.log('Original:', fruits);
fruits.push('grape');
console.log('After push:', fruits);
fruits.pop();
console.log('After pop:', fruits);
fruits.unshift('mango');
console.log('After unshift:', fruits);
fruits.shift();
console.log('After shift:', fruits);
fruits.splice(1, 1, 'kiwi');
console.log('After splice:', fruits);
"""

def template_array_map(proj):
    return """
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log('Original:', numbers);
console.log('Doubled:', doubled);
"""

def template_array_filter(proj):
    return """
const products = [
    { name: 'Laptop', price: 800, inStock: true },
    { name: 'Mouse', price: 25, inStock: true },
    { name: 'Keyboard', price: 45, inStock: false },
    { name: 'Monitor', price: 300, inStock: true }
];
const cheapInStock = products.filter(p => p.price < 50 && p.inStock);
console.log('Cheap in-stock products:', cheapInStock);
"""

def template_array_reduce(proj):
    return """
const cart = [
    { name: 'Apple', price: 0.5, qty: 4 },
    { name: 'Banana', price: 0.3, qty: 6 },
    { name: 'Orange', price: 0.8, qty: 3 }
];
const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
console.log('Total cost:', total);
"""

def template_array_find(proj):
    return """
const students = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
];
const student = students.find(s => s.id === 2);
console.log('Found:', student);
const index = students.findIndex(s => s.name === 'Charlie');
console.log('Index of Charlie:', index);
"""

def template_array_sort(proj):
    return """
const products = [
    { name: 'Laptop', price: 800, rating: 4.5 },
    { name: 'Mouse', price: 25, rating: 4.8 },
    { name: 'Keyboard', price: 45, rating: 4.2 }
];
// Sort by price ascending
products.sort((a, b) => a.price - b.price);
console.log('Sorted by price:', products);
// Sort by rating descending
products.sort((a, b) => b.rating - a.rating);
console.log('Sorted by rating:', products);
"""

def template_array_some_every(proj):
    return """
const tasks = [
    { title: 'Task 1', completed: true },
    { title: 'Task 2', completed: false },
    { title: 'Task 3', completed: true }
];
const allDone = tasks.every(t => t.completed);
const anyDone = tasks.some(t => t.completed);
console.log('All completed?', allDone);
console.log('Any completed?', anyDone);
"""

def template_array_chaining(proj):
    return """
const products = [
    { name: 'Laptop', price: 800, discount: 0.1 },
    { name: 'Mouse', price: 25, discount: 0 },
    { name: 'Keyboard', price: 45, discount: 0.05 }
];
const total = products
    .filter(p => p.discount > 0)
    .map(p => p.price * (1 - p.discount))
    .reduce((sum, val) => sum + val, 0);
console.log('Total discounted price:', total);
"""

def template_object_literal(proj):
    return """
const person = {
    name: 'Alice',
    age: 25,
    greet() {
        console.log(`Hi, I'm ${this.name}`);
    }
};
console.log(person.name);
person.greet();
// Dot vs bracket
console.log(person['age']);
person['city'] = 'New York';
console.log(person);
"""

def template_this_keyword(proj):
    return """
const obj = {
    name: 'Object',
    regularMethod() {
        console.log('regularMethod this:', this.name);
    },
    arrowMethod: () => {
        console.log('arrowMethod this:', this.name);
    }
};
obj.regularMethod(); // 'Object'
obj.arrowMethod();   // undefined (or window)
"""

def template_constructor_class(proj):
    return """
// Constructor function
function Animal(name) {
    this.name = name;
}
Animal.prototype.speak = function() {
    console.log(`${this.name} makes a noise.`);
};
// ES6 class
class Dog extends Animal {
    speak() {
        console.log(`${this.name} barks.`);
    }
}
const animal = new Animal('Generic');
animal.speak();
const dog = new Dog('Rex');
dog.speak();
"""

def template_destructuring(proj):
    return """
// Array destructuring
const coordinates = [10, 20];
const [x, y] = coordinates;
console.log(`x=${x}, y=${y}`);
// Object destructuring
const user = { name: 'Alice', age: 25 };
const { name, age } = user;
console.log(`name=${name}, age=${age}`);
// With defaults
const { city = 'Unknown' } = user;
console.log(`city=${city}`);
"""

def template_spread_rest(proj):
    return """
// Spread with arrays
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = [...arr1, ...arr2];
console.log(combined);
// Spread with objects
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3 };
const merged = { ...obj1, ...obj2 };
console.log(merged);
// Rest parameters
function sum(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3, 4));
"""

def template_optional_chaining(proj):
    return """
const user = {
    name: 'Alice',
    address: {
        city: 'New York'
    }
};
console.log(user?.address?.city); // 'New York'
console.log(user?.contact?.phone); // undefined
// Nullish coalescing
const phone = user?.contact?.phone ?? 'No phone';
console.log(phone);
"""

def template_json_localstorage(proj):
    return """
const user = { name: 'Alice', age: 25 };
// Store
localStorage.setItem('user', JSON.stringify(user));
// Retrieve
const stored = JSON.parse(localStorage.getItem('user'));
console.log(stored);
// Clear
localStorage.removeItem('user');
"""

def template_dom_select(proj):
    return """
// This script expects an element with id="app" in the HTML
const app = document.getElementById('app');
if (app) {
    app.innerHTML = '<p>Text changed by JavaScript!</p>';
} else {
    console.log('Element #app not found');
}
"""

def template_dom_create_append(proj):
    return """
const app = document.getElementById('app');
if (app) {
    const ul = document.createElement('ul');
    const li = document.createElement('li');
    li.textContent = 'New list item';
    ul.appendChild(li);
    app.appendChild(ul);
}
"""

def template_event_click(proj):
    return """
const app = document.getElementById('app');
app.innerHTML = '<button id="myBtn">Click me</button>';
const btn = document.getElementById('myBtn');
btn.addEventListener('click', () => {
    alert('Button clicked!');
});
"""

def template_input_live(proj):
    return """
const app = document.getElementById('app');
app.innerHTML = `
    <input type="text" id="liveInput" placeholder="Type something...">
    <p id="display"></p>
`;
const input = document.getElementById('liveInput');
const display = document.getElementById('display');
input.addEventListener('input', (e) => {
    display.textContent = e.target.value;
});
"""

def template_form_validation(proj):
    return """
const app = document.getElementById('app');
app.innerHTML = `
    <form id="myForm">
        <div>
            <label>Name:</label>
            <input type="text" id="name" required>
            <span class="error" id="nameError"></span>
        </div>
        <div>
            <label>Email:</label>
            <input type="email" id="email" required>
            <span class="error" id="emailError"></span>
        </div>
        <div>
            <label>Password:</label>
            <input type="password" id="password" required>
            <span class="error" id="passwordError"></span>
        </div>
        <button type="submit">Submit</button>
    </form>
    <style>.error { color: red; font-size: 0.8em; }</style>
`;
const form = document.getElementById('myForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    nameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    if (!name.value.trim()) {
        nameError.textContent = 'Name is required';
        valid = false;
    }
    if (!email.value.trim() || !email.value.includes('@')) {
        emailError.textContent = 'Valid email is required';
        valid = false;
    }
    if (password.value.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters';
        valid = false;
    }
    if (valid) {
        alert('Form submitted!');
        form.reset();
    }
});
"""

def template_modal(proj):
    return """
const app = document.getElementById('app');
app.innerHTML = `
    <button id="openModal">Open Modal</button>
    <div id="modal" style="display:none; position:fixed; top:20%; left:20%; background:white; padding:20px; border:1px solid #ccc; z-index:1000;">
        <p>This is a modal!</p>
        <button id="closeModal">Close</button>
    </div>
    <div id="overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:999;"></div>
`;
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');
const openBtn = document.getElementById('openModal');
const closeBtn = document.getElementById('closeModal');
function openModal() {
    modal.style.display = 'block';
    overlay.style.display = 'block';
}
function closeModal() {
    modal.style.display = 'none';
    overlay.style.display = 'none';
}
openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
"""

def template_keyboard_move(proj):
    return """
const app = document.getElementById('app');
app.innerHTML = `
    <div id="box" style="width:50px; height:50px; background:blue; position:absolute; top:100px; left:100px;"></div>
    <p>Use arrow keys to move the box</p>
`;
const box = document.getElementById('box');
let topPos = 100, leftPos = 100;
window.addEventListener('keydown', (e) => {
    const step = 10;
    switch(e.key) {
        case 'ArrowUp': topPos -= step; break;
        case 'ArrowDown': topPos += step; break;
        case 'ArrowLeft': leftPos -= step; break;
        case 'ArrowRight': leftPos += step; break;
        default: return;
    }
    box.style.top = topPos + 'px';
    box.style.left = leftPos + 'px';
});
"""

def template_todo(proj):
    return """
// Todo List with localStorage
let todos = JSON.parse(localStorage.getItem('todos') || '[]');
const app = document.getElementById('app');
function render() {
    app.innerHTML = `
        <input type="text" id="todoInput" placeholder="Add new todo">
        <button id="addBtn">Add</button>
        <ul id="todoList">
            ${todos.map((todo, i) => `
                <li>
                    <input type="checkbox" ${todo.completed ? 'checked' : ''} data-id="${i}">
                    <span style="${todo.completed ? 'text-decoration: line-through' : ''}">${todo.text}</span>
                    <button data-id="${i}" class="delete">Delete</button>
                </li>
            `).join('')}
        </ul>
    `;
    document.getElementById('addBtn').addEventListener('click', () => {
        const input = document.getElementById('todoInput');
        if (input.value.trim()) {
            todos.push({ text: input.value.trim(), completed: false });
            localStorage.setItem('todos', JSON.stringify(todos));
            render();
            input.value = '';
        }
    });
    document.querySelectorAll('#todoList input[type="checkbox"]').forEach(cb => {
        cb.addEventListener('change', (e) => {
            const idx = e.target.getAttribute('data-id');
            todos[idx].completed = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));
            render();
        });
    });
    document.querySelectorAll('#todoList .delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = e.target.getAttribute('data-id');
            todos.splice(idx, 1);
            localStorage.setItem('todos', JSON.stringify(todos));
            render();
        });
    });
}
render();
"""

def template_stopwatch(proj):
    return """
const app = document.getElementById('app');
app.innerHTML = `
    <div id="stopwatch">0:00:00</div>
    <button id="start">Start</button>
    <button id="stop">Stop</button>
    <button id="reset">Reset</button>
`;
let seconds = 0, minutes = 0, hours = 0;
let timer;
const display = document.getElementById('stopwatch');
function updateDisplay() {
    display.textContent = `${hours}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
}
function startTimer() {
    timer = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
        }
        updateDisplay();
    }, 1000);
}
document.getElementById('start').addEventListener('click', () => {
    if (!timer) startTimer();
});
document.getElementById('stop').addEventListener('click', () => {
    clearInterval(timer);
    timer = null;
});
document.getElementById('reset').addEventListener('click', () => {
    clearInterval(timer);
    timer = null;
    seconds = minutes = hours = 0;
    updateDisplay();
});
updateDisplay();
"""

def template_shopping_cart(proj):
    return """
// Simple shopping cart
let cart = [];
const app = document.getElementById('app');
const products = [
    { id: 1, name: 'Laptop', price: 800 },
    { id: 2, name: 'Mouse', price: 25 },
    { id: 3, name: 'Keyboard', price: 45 }
];
function render() {
    app.innerHTML = `
        <h2>Products</h2>
        <ul>
            ${products.map(p => `
                <li>${p.name} - $${p.price} 
                    <button data-id="${p.id}" class="addToCart">Add to Cart</button>
                </li>
            `).join('')}
        </ul>
        <h2>Cart</h2>
        <ul id="cartList">
            ${cart.map((item, i) => `
                <li>${item.name} - $${item.price} 
                    <button data-id="${i}" class="removeFromCart">Remove</button>
                </li>
            `).join('')}
        </ul>
        <p>Total: $${cart.reduce((sum, item) => sum + item.price, 0)}</p>
    `;
    document.querySelectorAll('.addToCart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            const product = products.find(p => p.id === id);
            cart.push(product);
            render();
        });
    });
    document.querySelectorAll('.removeFromCart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = parseInt(e.target.dataset.id);
            cart.splice(idx, 1);
            render();
        });
    });
}
render();
"""

def template_grade_analyzer(proj):
    return """
// Student Grade Analyzer
const app = document.getElementById('app');
let students = [
    { name: 'Alice', grade: 85 },
    { name: 'Bob', grade: 92 },
    { name: 'Charlie', grade: 78 },
    { name: 'Diana', grade: 88 }
];
function render() {
    const avg = students.reduce((sum, s) => sum + s.grade, 0) / students.length;
    const highest = students.reduce((max, s) => s.grade > max.grade ? s : max, students[0]);
    const lowest = students.reduce((min, s) => s.grade < min.grade ? s : min, students[0]);
    const distribution = {
        A: students.filter(s => s.grade >= 90).length,
        B: students.filter(s => s.grade >= 80 && s.grade < 90).length,
        C: students.filter(s => s.grade >= 70 && s.grade < 80).length,
        D: students.filter(s => s.grade >= 60 && s.grade < 70).length,
        F: students.filter(s => s.grade < 60).length
    };
    app.innerHTML = `
        <h2>Student Grades</h2>
        <ul>
            ${students.map(s => `<li>${s.name}: ${s.grade}</li>`).join('')}
        </ul>
        <p>Average: ${avg.toFixed(2)}</p>
        <p>Highest: ${highest.name} (${highest.grade})</p>
        <p>Lowest: ${lowest.name} (${lowest.grade})</p>
        <p>Distribution: A:${distribution.A}, B:${distribution.B}, C:${distribution.C}, D:${distribution.D}, F:${distribution.F}</p>
    `;
}
render();
"""

# Mapping from patterns to template functions
TEMPLATES = {
    "variables and data types": template_variables_data_types,
    "arithmetic": template_arithmetic_operators,
    "if-else": template_if_else,
    "ternary": template_ternary,
    "switch": template_switch,
    "for loop": template_for_loop,
    "while loop": template_while_loop,
    "do-while": template_do_while,
    "function declaration": template_function_declaration,
    "arrow function": template_arrow_function,
    "pure vs impure": template_pure_vs_impure,
    "basic array": template_array_basic,
    "map": template_array_map,
    "filter": template_array_filter,
    "reduce": template_array_reduce,
    "find": template_array_find,
    "sort": template_array_sort,
    "some": template_array_some_every,
    "every": template_array_some_every,
    "chaining": template_array_chaining,
    "object literal": template_object_literal,
    "this keyword": template_this_keyword,
    "constructor": template_constructor_class,
    "class": template_constructor_class,
    "destructuring": template_destructuring,
    "spread": template_spread_rest,
    "rest": template_spread_rest,
    "optional chaining": template_optional_chaining,
    "nullish coalescing": template_optional_chaining,
    "json": template_json_localstorage,
    "localstorage": template_json_localstorage,
    "selecting elements": template_dom_select,
    "creating and appending": template_dom_create_append,
    "button click": template_event_click,
    "input field": template_input_live,
    "form validation": template_form_validation,
    "modal": template_modal,
    "keyboard": template_keyboard_move,
    "todo": template_todo,
    "stopwatch": template_stopwatch,
    "shopping cart": template_shopping_cart,
    "grade analyzer": template_grade_analyzer,
}

def get_template_for_project(proj):
    """Select a template based on project title."""
    title_lower = proj['title'].lower()
    for pattern, template_func in TEMPLATES.items():
        if pattern in title_lower:
            return template_func
    return template_basic_js

# ----------------------------------------------------------------------
# Generate code for each project
# ----------------------------------------------------------------------
def get_js_code(proj):
    """Return the JavaScript code for the project."""
    pid = proj["id"]
    title = proj["title"].lower()

    # Specific overrides for base projects
    if pid == "BAS001":
        return template_variables_data_types(proj)
    elif pid == "BAS002":
        return template_arithmetic_operators(proj)
    elif pid == "BAS003":
        return """
let a = 5, b = '5';
console.log('==', a == b);
console.log('===', a === b);
console.log('&&', true && false);
console.log('||', true || false);
console.log('!', !true);
console.log('Truthy values:', Boolean('hello'), Boolean(1), Boolean([]));
console.log('Falsy values:', Boolean(''), Boolean(0), Boolean(null));
"""
    elif pid == "BAS004":
        return """
let name = 'John';
let age = 30;
console.log('Hello, ' + name + '. You are ' + age + ' years old.');
console.log(`Hello, ${name}. You are ${age} years old.`);
"""
    elif pid == "BAS005":
        return """
console.log('5' + 3);
console.log(Number('5') + 3);
console.log(String(123));
console.log(Boolean(0));
"""
    elif pid == "CTL001":
        return template_if_else(proj)
    elif pid == "CTL002":
        return template_ternary(proj)
    elif pid == "CTL003":
        return template_switch(proj)
    elif pid == "CTL004":
        return template_for_loop(proj)
    elif pid == "CTL005":
        return template_while_loop(proj)
    elif pid == "CTL006":
        return template_do_while(proj)
    elif pid == "FUN001":
        return template_function_declaration(proj)
    elif pid == "FUN002":
        return """
function greet(name = 'Guest') {
    if (!name) return;
    return `Hello ${name}`;
}
console.log(greet('Alice'));
console.log(greet());
"""
    elif pid == "FUN003":
        return template_arrow_function(proj)
    elif pid == "FUN004":
        return template_pure_vs_impure(proj)
    elif pid.startswith("ARR"):
        if pid == "ARR001":
            return template_array_basic(proj)
        elif pid == "ARR002":
            return template_array_map(proj)
        elif pid == "ARR003":
            return template_array_filter(proj)
        elif pid == "ARR004":
            return template_array_reduce(proj)
        elif pid == "ARR005":
            return template_array_find(proj)
        elif pid == "ARR006":
            return template_array_sort(proj)
        elif pid == "ARR007":
            return template_array_some_every(proj)
        elif pid == "ARR008":
            return template_array_chaining(proj)
    elif pid.startswith("OBJ"):
        if pid == "OBJ001":
            return template_object_literal(proj)
        elif pid == "OBJ002":
            return template_this_keyword(proj)
        elif pid == "OBJ003":
            return template_constructor_class(proj)
        elif pid == "OBJ004":
            return template_destructuring(proj)
        elif pid == "OBJ005":
            return template_spread_rest(proj)
        elif pid == "OBJ006":
            return template_optional_chaining(proj)
        elif pid == "OBJ007":
            return template_json_localstorage(proj)
    elif pid.startswith("DOM"):
        if pid == "DOM001":
            return template_dom_select(proj)
        elif pid == "DOM002":
            return template_dom_create_append(proj)
        elif pid == "DOM003":
            return template_event_click(proj)
        elif pid == "DOM004":
            return template_input_live(proj)
        elif pid == "DOM005":
            return template_form_validation(proj)
        elif pid == "DOM006":
            return template_modal(proj)
        elif pid == "DOM007":
            return template_keyboard_move(proj)
    elif pid.startswith("ADV"):
        if pid == "ADV001":
            return template_todo(proj)
        elif pid == "ADV002":
            return template_shopping_cart(proj)
        elif pid == "ADV003":
            return template_grade_analyzer(proj)
        elif pid == "ADV004":
            return """
// Simulated API fetch
async function fetchUsers() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { id: 1, name: 'Alice' },
                { id: 2, name: 'Bob' }
            ]);
        }, 1000);
    });
}
const app = document.getElementById('app');
app.innerHTML = '<p>Loading users...</p>';
fetchUsers().then(users => {
    app.innerHTML = '<ul>' + users.map(u => `<li>${u.name}</li>`).join('') + '</ul>';
});
"""
        elif pid == "ADV005":
            return template_stopwatch(proj)
        elif pid == "ADV006":
            return """
// Simple quiz
const questions = [
    { text: 'What is 2+2?', options: ['3', '4', '5'], answer: 1 },
    { text: 'What is the capital of France?', options: ['Berlin', 'Madrid', 'Paris'], answer: 2 }
];
let current = 0, score = 0;
const app = document.getElementById('app');
function showQuestion() {
    const q = questions[current];
    app.innerHTML = `
        <h2>${q.text}</h2>
        ${q.options.map((opt, i) => `<button data-opt="${i}">${opt}</button>`).join('')}
        <p>Score: ${score}</p>
    `;
    document.querySelectorAll('[data-opt]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const selected = parseInt(e.target.dataset.opt);
            if (selected === q.answer) score++;
            current++;
            if (current < questions.length) showQuestion();
            else app.innerHTML = `<h2>Quiz finished! Score: ${score}/${questions.length}</h2>`;
        });
    });
}
showQuestion();
"""
        elif pid == "ADV007":
            return """
// Simple image carousel
const images = [
    'https://via.placeholder.com/300x200?text=Image+1',
    'https://via.placeholder.com/300x200?text=Image+2',
    'https://via.placeholder.com/300x200?text=Image+3'
];
let idx = 0;
const app = document.getElementById('app');
app.innerHTML = `
    <img id="carouselImg" src="${images[0]}" style="width:300px; height:200px;">
    <br>
    <button id="prev">Prev</button>
    <button id="next">Next</button>
`;
const img = document.getElementById('carouselImg');
document.getElementById('prev').addEventListener('click', () => {
    idx = (idx - 1 + images.length) % images.length;
    img.src = images[idx];
});
document.getElementById('next').addEventListener('click', () => {
    idx = (idx + 1) % images.length;
    img.src = images[idx];
});
"""
        elif pid == "ADV008":
            return """
// Simple drag and drop
const app = document.getElementById('app');
app.innerHTML = '<div id="dragMe" style="width:100px; height:100px; background:red; position:absolute; top:100px; left:100px; cursor:move;"></div>';
const dragMe = document.getElementById('dragMe');
let isDragging = false, startX, startY, initialLeft, initialTop;
dragMe.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    initialLeft = dragMe.offsetLeft;
    initialTop = dragMe.offsetTop;
    dragMe.style.cursor = 'grabbing';
});
document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    dragMe.style.left = initialLeft + dx + 'px';
    dragMe.style.top = initialTop + dy + 'px';
});
document.addEventListener('mouseup', () => {
    isDragging = false;
    dragMe.style.cursor = 'move';
});
"""
        elif pid == "ADV009":
            return """
// Filterable table
const data = [
    { name: 'Alice', age: 25, city: 'New York' },
    { name: 'Bob', age: 30, city: 'London' },
    { name: 'Charlie', age: 28, city: 'Paris' }
];
const app = document.getElementById('app');
function renderTable(filter = '') {
    const filtered = data.filter(row => row.name.toLowerCase().includes(filter.toLowerCase()) || row.city.toLowerCase().includes(filter.toLowerCase()));
    app.innerHTML = `
        <input type="text" id="filterInput" placeholder="Filter by name or city">
        <table border="1">
            <tr><th>Name</th><th>Age</th><th>City</th></tr>
            ${filtered.map(row => `<tr><td>${row.name}</td><td>${row.age}</td><td>${row.city}</td></tr>`).join('')}
        </table>
    `;
    document.getElementById('filterInput').addEventListener('input', (e) => renderTable(e.target.value));
}
renderTable();
"""
        elif pid == "ADV010":
            return """
// Simple bar chart on canvas
const data = [50, 80, 30, 90, 40];
const app = document.getElementById('app');
app.innerHTML = '<canvas id="myCanvas" width="400" height="200"></canvas>';
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'blue';
const barWidth = 40;
const startX = 30;
const startY = canvas.height - 30;
const maxVal = Math.max(...data);
for (let i = 0; i < data.length; i++) {
    const height = (data[i] / maxVal) * (canvas.height - 50);
    ctx.fillRect(startX + i * (barWidth + 10), startY - height, barWidth, height);
    ctx.fillStyle = 'black';
    ctx.fillText(data[i], startX + i * (barWidth + 10) + 10, startY - height - 5);
    ctx.fillStyle = 'blue';
}
"""
        elif pid == "ADV011":
            return """
// Form with live validation and localStorage
const app = document.getElementById('app');
app.innerHTML = `
    <form id="myForm">
        <div><label>Name:</label><input type="text" id="name"><span class="error" id="nameError"></span></div>
        <div><label>Email:</label><input type="email" id="email"><span class="error" id="emailError"></span></div>
        <div><label>Password:</label><input type="password" id="password"><span class="error" id="passwordError"></span></div>
        <button type="submit">Save</button>
    </form>
    <div id="storedData"></div>
    <style>.error { color: red; font-size: 0.8em; }</style>
`;
function showStored() {
    const stored = localStorage.getItem('formData');
    if (stored) {
        const data = JSON.parse(stored);
        document.getElementById('storedData').innerHTML = `<h3>Stored Data</h3><p>Name: ${data.name}<br>Email: ${data.email}</p>`;
    }
}
showStored();
const form = document.getElementById('myForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const nameErr = document.getElementById('nameError');
    const emailErr = document.getElementById('emailError');
    const passErr = document.getElementById('passwordError');
    nameErr.textContent = '';
    emailErr.textContent = '';
    passErr.textContent = '';
    if (!name.value.trim()) {
        nameErr.textContent = 'Name required';
        valid = false;
    }
    if (!email.value.trim() || !email.value.includes('@')) {
        emailErr.textContent = 'Valid email required';
        valid = false;
    }
    if (password.value.length < 6) {
        passErr.textContent = 'Password must be at least 6 characters';
        valid = false;
    }
    if (valid) {
        localStorage.setItem('formData', JSON.stringify({ name: name.value, email: email.value }));
        showStored();
        form.reset();
    }
});
"""
        elif pid == "ADV012":
            return """
// Sortable list with drag and drop (simple)
const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
const app = document.getElementById('app');
function render() {
    app.innerHTML = `<ul id="sortableList">${items.map((item, i) => `<li draggable="true" data-idx="${i}">${item}</li>`).join('')}</ul>`;
    const list = document.getElementById('sortableList');
    let dragSrc = null;
    list.addEventListener('dragstart', (e) => {
        dragSrc = e.target;
        e.dataTransfer.effectAllowed = 'move';
    });
    list.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    });
    list.addEventListener('drop', (e) => {
        e.preventDefault();
        if (dragSrc !== e.target) {
            const fromIdx = parseInt(dragSrc.dataset.idx);
            const toIdx = parseInt(e.target.dataset.idx);
            const moved = items.splice(fromIdx, 1)[0];
            items.splice(toIdx, 0, moved);
            render();
        }
    });
}
render();
"""
    # For all other projects (including TOPxxx), use template based on title
    template_func = get_template_for_project(proj)
    return template_func(proj)

def generate_code(proj):
    """Returns (filename, code_content) based on project type."""
    pid = proj["id"]
    title = proj["title"]
    # Simple logic to decide if it's an HTML project (contains DOM, event, etc.)
    is_html = any(keyword in title.lower() for keyword in ["dom", "event", "click", "input", "modal", "keyboard", "todo", "quiz", "carousel", "drag", "table", "canvas", "form", "stopwatch", "slider", "filterable", "chart", "validation", "modal", "accordion", "tabs", "shopping", "grade", "fetch", "quiz", "carousel", "drag", "table", "canvas", "form"])
    if is_html:
        # Generate an HTML file
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
        .error {{ color: red; font-size: 0.9em; }}
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
        // Write your code here
        {get_js_code(proj)}
    </script>
</body>
</html>
"""
        return f"{pid}.html", html
    else:
        # Pure JavaScript file
        js = f"""// Project: {title}
// Description: {proj['desc']}

{get_js_code(proj)}
"""
        return f"{pid}.js", js


# ----------------------------------------------------------------------
# Build the full JSON and write files
# ----------------------------------------------------------------------
current_dir = os.path.dirname(os.path.abspath(__file__))
answers_dir = os.path.join(current_dir, "answers")
os.makedirs(answers_dir, exist_ok=True)

# Prepare JSON structure
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

# Generate each project's JSON and files
for proj in projects:
    # Generate code file
    filename, code_content = generate_code(proj)
    file_path = os.path.join(answers_dir, filename)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(code_content)

    # Add explanations (logic and code explanation)
    logic_exp, code_exp = generate_explanations(proj, code_content)

    # Build JSON entry
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

# Write JSON
json_path = os.path.join(current_dir, "js-projects.json")
with open(json_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"✅ Generated {len(projects)} projects in '{answers_dir}' and metadata in '{json_path}'")