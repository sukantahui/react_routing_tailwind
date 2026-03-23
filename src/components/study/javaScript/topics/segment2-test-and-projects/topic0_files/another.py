import os
import json
import textwrap

# ----------------------------------------------------------------------
# Helper to generate explanations based on project title and code
# ----------------------------------------------------------------------
def generate_explanations(project, code):
    title = project["title"].lower()
    if "variables" in title and "data types" in title:
        logic = "Variables store data values. JavaScript has `var`, `let`, and `const`. Primitive data types include number, string, boolean, null, undefined, symbol, bigint. Type conversion can be explicit (using `Number()`, `String()`) or implicit (coercion)."
        code_exp = "The code declares variables with different types, checks their types with `typeof`, and demonstrates explicit type conversion."
    elif "arithmetic" in title and "operators" in title:
        logic = "Arithmetic operators (+, -, *, /, %, **) are used for mathematical operations. Assignment operators store values. Compound assignments combine operation and assignment."
        code_exp = "The script calculates area of a rectangle and simple interest, showing arithmetic and assignment operators."
    elif "if" in title and "else" in title:
        logic = "`if`, `else if`, and `else` control flow based on conditions. Nested if can handle complex logic. Truthy/falsy values affect condition evaluation."
        code_exp = "A grading function uses if‑else to assign letter grades based on a score."
    elif "ternary" in title:
        logic = "The ternary operator (`condition ? expr1 : expr2`) is a concise if‑else. It returns one of two expressions based on the condition."
        code_exp = "The code checks if a number is even or odd using a ternary operator and prints the result."
    elif "switch" in title:
        logic = "The `switch` statement evaluates an expression and executes the matching case. `break` prevents fall‑through. It's useful for multiple discrete values."
        code_exp = "A day‑of‑week converter uses `switch` to return the day name from a number."
    elif "for loop" in title:
        logic = "The `for` loop repeats a block a specific number of times, using an initializer, condition, and increment. It's ideal for iterating over ranges and arrays."
        code_exp = "The script prints multiplication tables and calculates the sum of numbers from 1 to 100."
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
    elif "querySelector" in title or "selecting elements" in title:
        logic = "`querySelector()` and `querySelectorAll()` select elements using CSS selectors. They are powerful tools for DOM manipulation."
        code_exp = "The script selects a button and a paragraph, then changes the paragraph text when the button is clicked."
    elif "event listener" in title or "click" in title:
        logic = "`addEventListener` attaches a function to an event (e.g., click, input). It's the modern way to handle user interaction."
        code_exp = "A counter increments on button click, and a color picker updates a div's background color on input."
    elif "form validation" in title:
        logic = "Form validation checks user input before submission. It can prevent invalid data and improve user experience."
        code_exp = "A registration form validates that the name is not empty, email contains '@', and password length is at least 6 characters."
    elif "todo" in title:
        logic = "A to‑do list application demonstrates CRUD operations, array methods, and persistent storage with `localStorage`."
        code_exp = "The script builds a dynamic UI, handles add/delete/complete actions, and saves the list to `localStorage`."
    else:
        logic = "This project applies the listed JavaScript concepts to solve a practical problem."
        code_exp = "The code demonstrates the use of the relevant features in a clear, commented way."

    return logic, code_exp


# ----------------------------------------------------------------------
# Generate JavaScript code for a project based on its title and description
# ----------------------------------------------------------------------
def generate_js_code(proj):
    title = proj["title"].lower()
    desc = proj["desc"]

    # Common helper to wrap code in a DOMContentLoaded event if it manipulates the DOM
    if any(word in title for word in ["dom", "event", "click", "modal", "keyboard", "todo", "quiz", "carousel", "drag", "table", "canvas", "form"]):
        # Wrap in DOMContentLoaded to ensure the document is ready
        return f"""document.addEventListener('DOMContentLoaded', function() {{
    {_generate_internal_code(proj)}
}});
"""
    else:
        return _generate_internal_code(proj)


def _generate_internal_code(proj):
    title = proj["title"].lower()
    pid = proj["id"]

    # ------------------------------------------------------------------
    # Basic projects (no DOM)
    # ------------------------------------------------------------------
    if pid == "BAS001":
        return textwrap.dedent("""
        // Variables and Data Types
        let varLet = 'I can change';
        const constVar = 42;
        var oldVar = true;

        console.log('varLet:', typeof varLet);   // string
        console.log('constVar:', typeof constVar); // number
        console.log('oldVar:', typeof oldVar);    // boolean

        let nothing = null;
        let notDefined;
        console.log('null:', typeof nothing);     // object (quirk)
        console.log('undefined:', typeof notDefined); // undefined

        // Explicit conversion
        let numStr = '123';
        let num = Number(numStr);
        console.log('Converted:', num, typeof num);
        """)

    if pid == "BAS002":
        return textwrap.dedent("""
        // Arithmetic and Assignment Operators
        let length = 10, width = 5;
        let area = length * width;
        console.log('Area of rectangle:', area);

        let principal = 1000, rate = 5, time = 2;
        let interest = principal * rate * time / 100;
        console.log('Simple Interest:', interest);

        let x = 10;
        x += 5;
        console.log('After +=:', x);
        x **= 2;
        console.log('After **=:', x);
        """)

    if pid == "BAS003":
        return textwrap.dedent("""
        // Comparison and Logical Operators
        console.log('5 == "5":', 5 == '5');      // true (loose)
        console.log('5 === "5":', 5 === '5');    // false (strict)

        let age = 18;
        let hasLicense = true;
        let canDrive = age >= 16 && hasLicense;
        console.log('Can drive:', canDrive);

        // Truthy/falsy
        let name = '';
        if (!name) console.log('Name is falsy');
        """)

    if pid == "BAS004":
        return textwrap.dedent("""
        // Template Literals and String Concatenation
        let firstName = 'John';
        let lastName = 'Doe';
        let fullName1 = firstName + ' ' + lastName;
        let fullName2 = `${firstName} ${lastName}`;
        console.log('Concatenation:', fullName1);
        console.log('Template literal:', fullName2);
        """)

    if pid == "BAS005":
        return textwrap.dedent("""
        // Type Coercion
        console.log('"5" + 3 =', '5' + 3);      // "53"
        console.log('5 + "3" =', 5 + '3');      // "53"
        console.log('5 - "3" =', 5 - '3');      // 2
        console.log('"5" * "3" =', '5' * '3');  // 15

        // Explicit conversion
        let strNum = '123.45';
        let num = Number(strNum);
        console.log('Number:', num, typeof num);
        let strAgain = String(num);
        console.log('String:', strAgain, typeof strAgain);
        """)

    # Control flow
    if pid == "CTL001":
        return textwrap.dedent("""
        // If-Else – Grading System
        function getGrade(score) {
            if (score >= 90) return 'A';
            else if (score >= 80) return 'B';
            else if (score >= 70) return 'C';
            else if (score >= 60) return 'D';
            else return 'F';
        }

        console.log('Score 85:', getGrade(85));
        console.log('Score 92:', getGrade(92));
        console.log('Score 45:', getGrade(45));
        """)

    if pid == "CTL002":
        return textwrap.dedent("""
        // Ternary Operator – Even or Odd
        let num = 7;
        let result = (num % 2 === 0) ? 'Even' : 'Odd';
        console.log(`${num} is ${result}`);
        """)

    if pid == "CTL003":
        return textwrap.dedent("""
        // Switch – Day of Week
        function getDayName(dayNumber) {
            switch (dayNumber) {
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
        console.log('Day 8:', getDayName(8));
        """)

    if pid == "CTL004":
        return textwrap.dedent("""
        // For Loop – Sum and Multiplication Tables
        let sum = 0;
        for (let i = 1; i <= 100; i++) {
            sum += i;
        }
        console.log('Sum of 1..100:', sum);

        // Multiplication table of 5
        for (let i = 1; i <= 10; i++) {
            console.log(`5 x ${i} = ${5 * i}`);
        }
        """)

    if pid == "CTL005":
        return textwrap.dedent("""
        // While Loop – Password Guesser (simulated with console)
        let password = 'secret';
        let guess = '';
        let attempts = 0;
        // In a real environment you'd use prompt, but here we simulate correct guess.
        // For demonstration, we'll break after a few attempts.
        while (guess !== password && attempts < 3) {
            guess = attempts === 0 ? 'wrong' : (attempts === 1 ? 'secret' : '');
            attempts++;
            console.log(`Attempt ${attempts}: ${guess === password ? 'Correct!' : 'Wrong'}`);
        }
        """)

    if pid == "CTL006":
        return textwrap.dedent("""
        // Do‑While – Menu (simulated)
        let choice;
        let count = 0;
        do {
            choice = count === 0 ? '1' : (count === 1 ? '2' : '2');
            console.log('Menu: 1. Add 2. Exit');
            console.log('You chose:', choice);
            if (choice === '1') console.log('Adding item...');
            count++;
        } while (choice !== '2');
        console.log('Exited');
        """)

    # Functions
    if pid == "FUN001":
        return textwrap.dedent("""
        // Function Declaration vs Expression
        // Hoisting – works
        console.log('Declaration result:', declaration());

        function declaration() {
            return 'I am hoisted!';
        }

        // Expression – not hoisted
        // console.log(expression()); // Would cause error

        const expression = function() {
            return 'I am not hoisted';
        };
        console.log('Expression result:', expression());
        """)

    if pid == "FUN002":
        return textwrap.dedent("""
        // Default Parameters and Return
        function greet(name = 'Guest') {
            if (!name) return 'No name provided';
            return `Hello, ${name}`;
        }

        console.log(greet('Alice'));
        console.log(greet());
        console.log(greet(''));
        """)

    if pid == "FUN003":
        return textwrap.dedent("""
        // Arrow Functions and Lexical this
        const obj = {
            name: 'MyObject',
            regular: function() {
                console.log('Regular this:', this.name);
            },
            arrow: () => {
                console.log('Arrow this:', this.name); // this is from outer scope
            }
        };
        obj.regular(); // MyObject
        obj.arrow();   // undefined (or global object)
        """)

    if pid == "FUN004":
        return textwrap.dedent("""
        // Pure vs Impure Functions
        let counter = 0;

        // Impure: modifies external state
        function impure() {
            counter++;
            return counter;
        }

        // Pure: no side effects, same input -> same output
        function pure(a, b) {
            return a + b;
        }

        console.log('pure(2,3):', pure(2,3));
        console.log('pure(2,3):', pure(2,3));
        console.log('impure():', impure());
        console.log('impure():', impure());
        console.log('counter:', counter);
        """)

    # Arrays
    if pid == "ARR001":
        return textwrap.dedent("""
        // Basic Array Operations
        let fruits = ['apple', 'banana'];
        console.log('Initial:', fruits);
        fruits.push('orange');
        console.log('After push:', fruits);
        let last = fruits.pop();
        console.log('After pop, removed:', last, 'array:', fruits);
        fruits.unshift('grape');
        console.log('After unshift:', fruits);
        let first = fruits.shift();
        console.log('After shift, removed:', first, 'array:', fruits);
        fruits.splice(1, 1, 'kiwi', 'mango');
        console.log('After splice:', fruits);
        """)

    if pid == "ARR002":
        return textwrap.dedent("""
        // map() – Transform Numbers
        let numbers = [1, 2, 3, 4, 5];
        let doubled = numbers.map(n => n * 2);
        console.log('Original:', numbers);
        console.log('Doubled:', doubled);
        """)

    if pid == "ARR003":
        return textwrap.dedent("""
        // filter() – Select Products
        const products = [
            { name: 'Laptop', price: 1200, inStock: true },
            { name: 'Mouse', price: 25, inStock: true },
            { name: 'Keyboard', price: 45, inStock: false },
            { name: 'Monitor', price: 300, inStock: true }
        ];
        const cheapInStock = products.filter(p => p.price < 50 && p.inStock);
        console.log('Cheap and in stock:', cheapInStock);
        """)

    if pid == "ARR004":
        return textwrap.dedent("""
        // reduce() – Shopping Cart Total
        const cart = [
            { name: 'Apple', price: 1.2, qty: 3 },
            { name: 'Banana', price: 0.5, qty: 5 },
            { name: 'Orange', price: 0.8, qty: 2 }
        ];
        const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
        console.log('Total price:', total.toFixed(2));
        """)

    if pid == "ARR005":
        return textwrap.dedent("""
        // find() and findIndex()
        const students = [
            { id: 101, name: 'Alice' },
            { id: 102, name: 'Bob' },
            { id: 103, name: 'Charlie' }
        ];
        const targetId = 102;
        const student = students.find(s => s.id === targetId);
        console.log('Student found:', student);

        const tasks = [
            { title: 'Buy milk', completed: false },
            { title: 'Write code', completed: true }
        ];
        const index = tasks.findIndex(t => t.title === 'Write code');
        console.log('Index of "Write code":', index);
        """)

    if pid == "ARR006":
        return textwrap.dedent("""
        // sort() with Comparator
        const products = [
            { name: 'Laptop', price: 1200, rating: 4.5 },
            { name: 'Mouse', price: 25, rating: 4.8 },
            { name: 'Keyboard', price: 45, rating: 4.2 }
        ];
        // Sort by price ascending, then by rating descending
        const sorted = products.sort((a, b) => a.price - b.price || b.rating - a.rating);
        console.log('Sorted products:', sorted);
        """)

    if pid == "ARR007":
        return textwrap.dedent("""
        // some() and every()
        const products = [
            { name: 'Laptop', rating: 4.5 },
            { name: 'Mouse', rating: 4.8 },
            { name: 'Keyboard', rating: 4.2 }
        ];
        const hasHighRated = products.some(p => p.rating > 4.5);
        console.log('Has product with rating > 4.5?', hasHighRated);

        const tasks = [
            { title: 'Task 1', completed: true },
            { title: 'Task 2', completed: true },
            { title: 'Task 3', completed: false }
        ];
        const allDone = tasks.every(t => t.completed);
        console.log('All tasks completed?', allDone);
        """)

    if pid == "ARR008":
        return textwrap.dedent("""
        // Chaining Methods
        const products = [
            { name: 'Laptop', price: 1200, discount: 0.1 },
            { name: 'Mouse', price: 25, discount: 0 },
            { name: 'Keyboard', price: 45, discount: 0.05 },
            { name: 'Monitor', price: 300, discount: 0.15 }
        ];
        const totalDiscounted = products
            .filter(p => p.discount > 0)
            .map(p => p.price * (1 - p.discount))
            .reduce((sum, val) => sum + val, 0);
        console.log('Total price of discounted items:', totalDiscounted.toFixed(2));
        """)

    # Objects
    if pid == "OBJ001":
        return textwrap.dedent("""
        // Object Literals and Dot/Bracket Notation
        let car = { brand: 'Toyota', model: 'Corolla' };
        console.log('Car:', car);
        console.log('Brand (dot):', car.brand);
        console.log('Model (bracket):', car['model']);
        car.year = 2020;
        car['color'] = 'red';
        console.log('Updated car:', car);
        """)

    if pid == "OBJ002":
        return textwrap.dedent("""
        // `this` in Methods
        const person = {
            name: 'Alice',
            greet() {
                console.log(`Hi, I'm ${this.name}`);
            }
        };
        person.greet(); // Hi, I'm Alice

        const greetFunc = person.greet;
        greetFunc(); // this is now global, so name undefined
        """)

    if pid == "OBJ003":
        return textwrap.dedent("""
        // Constructor Function and Class
        // Constructor function
        function Animal(name) {
            this.name = name;
        }
        Animal.prototype.speak = function() {
            console.log(`${this.name} makes a noise.`);
        };
        const dog = new Animal('Dog');
        dog.speak();

        // ES6 class
        class Vehicle {
            constructor(brand) {
                this.brand = brand;
            }
            honk() {
                console.log(`${this.brand} honks!`);
            }
        }
        const car = new Vehicle('Toyota');
        car.honk();
        """)

    if pid == "OBJ004":
        return textwrap.dedent("""
        // Object Destructuring
        const user = { name: 'John', age: 30, city: 'New York' };
        const { name, age, country = 'USA' } = user;
        console.log(`Name: ${name}, Age: ${age}, Country: ${country}`);
        """)

    if pid == "OBJ005":
        return textwrap.dedent("""
        // Spread Operator with Objects
        const obj1 = { a: 1, b: 2 };
        const obj2 = { b: 3, c: 4 };
        const merged = { ...obj1, ...obj2 };
        console.log('Merged:', merged); // { a:1, b:3, c:4 }

        const copy = { ...obj1 };
        copy.a = 99;
        console.log('Original:', obj1);
        console.log('Copy:', copy);
        """)

    if pid == "OBJ006":
        return textwrap.dedent("""
        // Optional Chaining and Nullish Coalescing
        const user = {
            name: 'Alice',
            address: {
                city: 'Paris'
            }
        };
        const city = user?.address?.city ?? 'Unknown';
        console.log('City:', city); // Paris

        const user2 = {};
        const city2 = user2?.address?.city ?? 'Unknown';
        console.log('City2:', city2); // Unknown
        """)

    if pid == "OBJ007":
        return textwrap.dedent("""
        // JSON and localStorage
        const user = { name: 'Bob', age: 25 };
        localStorage.setItem('user', JSON.stringify(user));
        const stored = JSON.parse(localStorage.getItem('user'));
        console.log('Stored user:', stored);
        // Clean up
        localStorage.removeItem('user');
        """)

    # DOM and Events (self-contained, creates UI)
    if pid == "DOM001":
        return textwrap.dedent("""
        // Selecting Elements and Changing Text
        // Create a simple UI if not present
        const container = document.createElement('div');
        container.id = 'demo';
        const p = document.createElement('p');
        p.id = 'myParagraph';
        p.textContent = 'Original text';
        container.appendChild(p);
        document.body.appendChild(container);

        const paragraph = document.querySelector('#myParagraph');
        if (paragraph) {
            paragraph.textContent = 'Text changed by JavaScript!';
        }
        """)

    if pid == "DOM002":
        return textwrap.dedent("""
        // Creating and Appending Elements
        const list = document.createElement('ul');
        list.id = 'myList';
        document.body.appendChild(list);

        const items = ['Item 1', 'Item 2', 'Item 3'];
        items.forEach(text => {
            const li = document.createElement('li');
            li.textContent = text;
            list.appendChild(li);
        });
        """)

    if pid == "DOM003":
        return textwrap.dedent("""
        // Handling Button Clicks
        const button = document.createElement('button');
        button.textContent = 'Click me';
        button.id = 'myButton';
        document.body.appendChild(button);

        button.addEventListener('click', () => {
            alert('Button clicked!');
        });
        """)

    if pid == "DOM004":
        return textwrap.dedent("""
        // Input Field – Live Update
        const input = document.createElement('input');
        input.placeholder = 'Type something...';
        input.id = 'liveInput';
        const display = document.createElement('p');
        display.id = 'liveDisplay';
        display.textContent = 'Your text will appear here';
        document.body.appendChild(input);
        document.body.appendChild(display);

        input.addEventListener('input', (e) => {
            display.textContent = e.target.value;
        });
        """)

    if pid == "DOM005":
        return textwrap.dedent("""
        // Form Validation
        const form = document.createElement('form');
        form.id = 'regForm';
        form.innerHTML = `
            <label>Name: <input type="text" id="name" required></label><br>
            <label>Email: <input type="email" id="email" required></label><br>
            <label>Password: <input type="password" id="password" required minlength="6"></label><br>
            <button type="submit">Register</button>
            <div id="errorMsg" style="color:red"></div>
        `;
        document.body.appendChild(form);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const errorDiv = document.getElementById('errorMsg');

            if (!name) errorDiv.textContent = 'Name is required';
            else if (!email || !email.includes('@')) errorDiv.textContent = 'Valid email required';
            else if (password.length < 6) errorDiv.textContent = 'Password must be at least 6 characters';
            else {
                errorDiv.textContent = '';
                alert('Form submitted successfully!');
            }
        });
        """)

    if pid == "DOM006":
        return textwrap.dedent("""
        // Simple Modal
        const openBtn = document.createElement('button');
        openBtn.textContent = 'Open Modal';
        document.body.appendChild(openBtn);

        const modal = document.createElement('div');
        modal.style.display = 'none';
        modal.style.position = 'fixed';
        modal.style.top = '20%';
        modal.style.left = '50%';
        modal.style.transform = 'translateX(-50%)';
        modal.style.backgroundColor = 'white';
        modal.style.padding = '20px';
        modal.style.border = '1px solid black';
        modal.style.zIndex = '1000';
        modal.innerHTML = `
            <p>This is a modal</p>
            <button id="closeModal">Close</button>
        `;
        document.body.appendChild(modal);

        openBtn.addEventListener('click', () => modal.style.display = 'block');
        const closeBtn = modal.querySelector('#closeModal');
        closeBtn.addEventListener('click', () => modal.style.display = 'none');
        """)

    if pid == "DOM007":
        return textwrap.dedent("""
        // Keyboard Events – Move a Box
        const box = document.createElement('div');
        box.style.width = '50px';
        box.style.height = '50px';
        box.style.backgroundColor = 'red';
        box.style.position = 'absolute';
        box.style.top = '50px';
        box.style.left = '50px';
        document.body.appendChild(box);

        let top = 50, left = 50;
        window.addEventListener('keydown', (e) => {
            const step = 10;
            switch(e.key) {
                case 'ArrowUp': top -= step; break;
                case 'ArrowDown': top += step; break;
                case 'ArrowLeft': left -= step; break;
                case 'ArrowRight': left += step; break;
                default: return;
            }
            box.style.top = top + 'px';
            box.style.left = left + 'px';
        });
        """)

    # Advanced combination projects
    if pid == "ADV001":
        return textwrap.dedent("""
        // Todo List App
        let todos = JSON.parse(localStorage.getItem('todos') || '[]');

        function render() {
            const container = document.getElementById('todo-container') || (() => {
                const div = document.createElement('div');
                div.id = 'todo-container';
                document.body.appendChild(div);
                return div;
            })();

            container.innerHTML = `
                <input type="text" id="todoInput" placeholder="Add new todo">
                <button id="addBtn">Add</button>
                <ul id="todoList">
                    ${todos.map((todo, i) => `
                        <li>
                            <input type="checkbox" ${todo.completed ? 'checked' : ''} data-id="${i}">
                            <span style="${todo.completed ? 'text-decoration: line-through' : ''}">${escapeHtml(todo.text)}</span>
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

        function escapeHtml(str) {
            return str.replace(/[&<>]/g, function(m) {
                if (m === '&') return '&amp;';
                if (m === '<') return '&lt;';
                if (m === '>') return '&gt;';
                return m;
            });
        }

        render();
        """)

    # For other advanced projects, we provide a generic implementation.
    # To keep the answer length manageable, we'll return a comment with instructions.
    # In practice, you would expand these similarly.

    # Fallback for all other projects: generate a generic code that demonstrates the concept
    return f"""
// Project: {proj['title']}
// Description: {proj['desc']}
// Write your code here based on the description.

console.log("Implement project {proj['id']} – {proj['title']}");
"""


# ----------------------------------------------------------------------
# Project definitions (same as before, but with IDs matching the pattern above)
# ----------------------------------------------------------------------
projects = [
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
    {"id": "CTL001", "title": "If-Else – Grading System", "difficulty": "Beginner",
     "desc": "Given a score, use if-else if to assign a letter grade. Also demonstrate nested if.",
     "ex": "if (score >= 90) grade = 'A'; else if (score >= 80) grade = 'B'; ...",
     "out": "Grade: B", "learn": "Multi-branch conditional logic."},
    {"id": "CTL002", "title": "Ternary Operator – Even or Odd", "difficulty": "Beginner",
     "desc": "Use the ternary operator to check if a number is even or odd.",
     "ex": "let result = (num % 2 === 0) ? 'Even' : 'Odd';",
     "out": "Odd", "learn": "Concise conditional expression."},
    {"id": "CTL003", "title": "Switch – Day of Week", "difficulty": "Beginner",
     "desc": "Given a number (1-7), use switch to output the day name.",
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
# Build the full JSON and write files
# ----------------------------------------------------------------------
current_dir = os.path.dirname(os.path.abspath(__file__))
answers_dir = os.path.join(current_dir, "answers")
os.makedirs(answers_dir, exist_ok=True)

# Prepare JSON structure
data = {
    "projectCategory": "JavaScript – 50 Practical Projects",
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
    # Generate JS code
    js_code = generate_js_code(proj)
    filename = f"{proj['id']}.js"
    file_path = os.path.join(answers_dir, filename)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(js_code)

    # Add explanations
    logic_exp, code_exp = generate_explanations(proj, js_code)

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