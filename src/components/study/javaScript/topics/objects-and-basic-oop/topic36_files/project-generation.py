import os
import json

# ============================================
# Helper function to generate explanations
# ============================================
def generate_explanations(project, code):
    """
    Returns a tuple (logicExplanation, codeExplanation) for the given project.
    Uses the project title and the code to produce descriptive text.
    """
    title = project["title"]

    # Custom explanations based on project title
    if "Object Literals Basics" in title:
        logic = (
            "Object literals are the simplest way to create objects. They consist of key-value pairs, "
            "where keys are strings (or Symbols) and values can be any data type, including functions (methods)."
        )
        code_exp = (
            "This code creates an object `person` with properties (name, age) and a method `greet`. "
            "It demonstrates accessing properties with dot and bracket notation, and calling the method."
        )
    elif "Dot vs Bracket Notation" in title:
        logic = (
            "Dot notation is cleaner but only works with valid identifier names. Bracket notation allows any string, "
            "including those with spaces or dynamic keys (using variables)."
        )
        code_exp = (
            "The script shows accessing the same property using both notations, and demonstrates bracket notation "
            "with a variable key."
        )
    elif "Adding, Updating, Deleting Properties" in title:
        logic = (
            "Objects are mutable. You can add new properties by assignment, update existing ones, and delete properties "
            "with the `delete` operator. The `in` operator checks for a property in the object or its prototype chain, "
            "while `hasOwnProperty` checks only the object's own properties."
        )
        code_exp = (
            "The script starts with an empty object, then adds properties, updates one, deletes another, and shows "
            "how to check for existence using `in` and `hasOwnProperty`."
        )
    elif "Nested Objects and Arrays" in title:
        logic = (
            "Objects can contain other objects or arrays as property values. Accessing deeply nested values requires chaining "
            "dot or bracket notation. Safe navigation can be done with optional chaining (covered later)."
        )
        code_exp = (
            "The code defines a `user` object with a nested `address` object and an array of `hobbies`. It demonstrates "
            "accessing properties at multiple levels, modifying nested values, and iterating over the array."
        )
    elif "Accessing Deeply Nested Values" in title:
        logic = (
            "Accessing deeply nested values can be done by chaining dot or bracket notation. However, if any intermediate "
            "property is missing, an error occurs. Optional chaining (`?.`) provides a safer way."
        )
        code_exp = (
            "This script shows both the traditional way and the safe way using optional chaining to access a deeply nested "
            "property that may not exist."
        )
    elif "The this Keyword Inside Objects" in title:
        logic = (
            "Inside object methods, `this` refers to the object that called the method. Arrow functions do not have their own `this`; "
            "they inherit from the enclosing scope. Understanding this distinction is crucial for object behavior."
        )
        code_exp = (
            "The script defines an object with a regular method and an arrow function method. It logs the output of each, "
            "showing how `this` behaves differently. It also shows a standalone function to demonstrate global `this`."
        )
    elif "Arrow vs Normal Functions this" in title:
        logic = (
            "Arrow functions capture the `this` value of the surrounding context at the time they are created, "
            "while normal functions have their own `this` determined by how they are called."
        )
        code_exp = (
            "The code creates a `counter` object with a `normalMethod` and an `arrowMethod`. When called, the normal method "
            "can access the object's `count` property, but the arrow method cannot because it inherits `this` from the outer scope."
        )
    elif "Iterating Objects: for...in" in title:
        logic = (
            "`for...in` iterates over enumerable properties (including inherited). To iterate only own properties, combine with `hasOwnProperty`."
        )
        code_exp = (
            "The script shows `for...in` with and without `hasOwnProperty` to filter inherited properties."
        )
    elif "Object.keys, values, entries" in title:
        logic = (
            "`Object.keys()`, `Object.values()`, and `Object.entries()` return arrays of keys, values, or key-value pairs, "
            "which can be used with array methods like `forEach` or `map`."
        )
        code_exp = (
            "The code demonstrates extracting keys, values, and entries from an object and iterating over them."
        )
    elif "Looping Arrays of Objects with map, filter, reduce" in title:
        logic = (
            "When working with arrays of objects, `map()`, `filter()`, and `reduce()` are powerful. `map` transforms each object into something else, "
            "`filter` selects a subset, and `reduce` aggregates values."
        )
        code_exp = (
            "The script creates an array of user objects. It filters users older than 18, maps to their names, and reduces to sum ages. "
            "All operations are shown in sequence."
        )
    elif "Objects as Reference Types" in title:
        logic = (
            "Objects are reference types; variables store a reference to the object, not the object itself. "
            "Assigning an object to another variable copies the reference."
        )
        code_exp = (
            "The code shows reference behaviour by modifying an object through a second variable, and demonstrates that "
            "strict equality (`===`) compares references, not content."
        )
    elif "Shallow Copy" in title:
        logic = (
            "A shallow copy duplicates top-level properties, but nested objects are still shared. "
            "Shallow copies can be created with the spread operator (`...`) or `Object.assign()`."
        )
        code_exp = (
            "The script creates a shallow copy using spread and `Object.assign`, and shows that modifying a nested property "
            "in the copy affects the original."
        )
    elif "Deep Copy" in title:
        logic = (
            "A deep copy creates a fully independent copy, including all nested objects. Two common methods: "
            "`JSON.parse(JSON.stringify(obj))` (works for JSON-serializable data) and `structuredClone()` (modern, handles more types)."
        )
        code_exp = (
            "The code creates a deep copy using both methods, then modifies nested properties in the copies to show they don't affect the original."
        )
    elif "Shorthand Properties" in title:
        logic = (
            "Object literal shorthand allows you to write `{ name, age }` when variable names match property names. "
            "Computed property names let you use expressions inside brackets, e.g., `{ [key]: value }`."
        )
        code_exp = (
            "The code uses shorthand to create an object from variables, and demonstrates a computed property name with a dynamic key."
        )
    elif "Object Destructuring" in title:
        logic = (
            "Destructuring extracts properties from an object into variables. Nested destructuring digs into nested objects. "
            "Default values can be provided for missing properties."
        )
        code_exp = (
            "The script destructures a user object, including nested address properties, and shows default values for optional fields."
        )
    elif "Spread and Rest for Objects" in title:
        logic = (
            "The spread operator (`...`) can copy properties from one object into another. The rest operator collects remaining "
            "properties into a new object when destructuring."
        )
        code_exp = (
            "The code merges two objects using spread, and uses rest to extract a subset of properties."
        )
    elif "Getters and Setters" in title:
        logic = (
            "Getters and setters allow you to define computed properties or add validation when reading/writing a property. "
            "They are defined using `get` and `set` keywords."
        )
        code_exp = (
            "The script defines a `person` object with a getter for full name (combining first and last) and a setter for age with validation."
        )
    elif "Optional Chaining and Nullish Coalescing" in title:
        logic = (
            "Optional chaining (`?.`) safely accesses nested properties without throwing an error if a reference is null or undefined. "
            "Nullish coalescing (`??`) provides a default value only when the left side is `null` or `undefined`."
        )
        code_exp = (
            "The code demonstrates safe access to a deeply nested property that may not exist, using `?.`, and uses `??` to supply a fallback."
        )
    elif "Object Immutability" in title:
        logic = (
            "`Object.freeze()` makes an object immutable: no properties can be added, changed, or removed. "
            "`Object.seal()` prevents adding or removing properties but allows modifying existing ones. "
            "`Object.preventExtensions()` only prevents adding new properties."
        )
        code_exp = (
            "The script applies each method to an object and shows what operations are allowed (or silently ignored)."
        )
    elif "Constructor Functions" in title:
        logic = (
            "Constructor functions are a classic way to create multiple similar objects. They are called with `new`, "
            "which creates a new object, sets its prototype, and binds `this` to the new object."
        )
        code_exp = (
            "The code defines a `Person` constructor with `name` and `age`. It creates two instances and shows their properties."
        )
    elif "Prototype and Prototype Chain" in title:
        logic = (
            "Every JavaScript object has a prototype (an internal link to another object). When you access a property, "
            "the engine walks up the prototype chain until it finds it or reaches `null`. This enables inheritance."
        )
        code_exp = (
            "The code creates a parent object with a method, then creates a child using `Object.create(parent)`. "
            "It demonstrates property lookup through the prototype chain and checks the prototype with `isPrototypeOf`."
        )
    elif "Adding Methods Using Prototypes" in title:
        logic = (
            "Methods can be added to a constructor's prototype to be shared across instances, saving memory."
        )
        code_exp = (
            "The script extends a `Person` constructor by adding a `greet` method to the prototype, then creates instances that can use it."
        )
    elif "ES6 Class Syntax" in title:
        logic = (
            "ES6 classes provide a cleaner syntax for constructors and inheritance. A class has a `constructor` method, "
            "instance methods (defined without `function`), and static methods (called on the class itself)."
        )
        code_exp = (
            "The script defines a `Rectangle` class with `constructor`, `area` instance method, and a static `describe` method. "
            "It creates an instance and calls both types of methods."
        )
    elif "Class Inheritance" in title:
        logic = (
            "Classes can inherit from another class using `extends`. The `super()` call in the child constructor runs the parent constructor. "
            "Methods can be overridden by defining them again in the child class."
        )
        code_exp = (
            "The script defines a `Rectangle` class and a `Square` class that extends it. It uses `super` to call the parent constructor, "
            "overrides the `area` method, and adds a new method."
        )
    elif "super Keyword" in title:
        logic = (
            "`super` is used in child classes to call the parent constructor or parent methods. It is required in the child constructor "
            "before using `this`."
        )
        code_exp = (
            "The code shows a `Vehicle` class and a `Car` class that extends it. The `Car` constructor calls `super` with brand and model, "
            "and the `start` method uses `super.start()` to call the parent method."
        )
    elif "JSON.parse and JSON.stringify" in title:
        logic = (
            "`JSON.stringify()` converts an object to a JSON string, and `JSON.parse()` converts back. "
            "This is used for data exchange and storage."
        )
        code_exp = (
            "The code stringifies an object, logs the JSON, then parses it back into a new object, showing they are equal but not the same reference."
        )
    elif "LocalStorage with Objects" in title:
        logic = (
            "`localStorage` stores key-value pairs in the browser persistently; objects must be stringified before storing and parsed after retrieval."
        )
        code_exp = (
            "The code saves an object to localStorage after stringifying it, then retrieves and parses it, proving it persists across page reloads."
        )
    elif "Merging Objects" in title:
        logic = (
            "Objects can be merged using spread (`{ ...obj1, ...obj2 }`) or `Object.assign()`. "
            "When merging, later properties overwrite earlier ones."
        )
        code_exp = (
            "The script merges two objects with overlapping keys and shows the result."
        )
    elif "Checking Object Equality" in title:
        logic = (
            "Comparing objects with `===` checks reference equality. To compare content (shallow), you can stringify or implement a deep comparison function."
        )
        code_exp = (
            "The code shows reference equality vs. content equality using JSON stringification, and notes that this works only for JSON-serializable data."
        )
    else:
        logic = f"General object manipulation project covering {title}."
        code_exp = f"The JavaScript code implements {title} as described in the example."

    return logic, code_exp


# ============================================
# JavaScript project data (40 projects)
# ============================================
js_projects = {
    "projectCategory": "JavaScript Objects – 40 Practical Projects",
    "subject": "Web Development (JavaScript)",
    "board": "General",
    "class": "Beginner / Intermediate / Advanced",
    "tools": ["Browser Console", "VS Code", "Any modern browser"],
    "institute": {
        "author": "Sukanta Hui",
        "name": "Coder & AccoTax",
        "location": "Barrackpore & Naihati"
    },
    "projects": [
        {
            "projectId": "OBJ001",
            "title": "Object Literals Basics",
            "difficulty": "Beginner",
            "description": "Create an object literal with properties and a method. Access properties using dot and bracket notation.",
            "exampleText": "const person = { name: 'Alice', age: 30, greet() { return `Hi, I'm ${this.name}`; } };",
            "exampleOutput": "Name: Alice; Age: 30; Greeting: Hi, I'm Alice; Also using bracket: Alice",
            "answerFile": "./answers/OBJ001.js",
            "learningOutcome": "Understanding object literals, property access, and methods."
        },
        {
            "projectId": "OBJ002",
            "title": "Dot vs Bracket Notation",
            "difficulty": "Beginner",
            "description": "Demonstrate accessing properties using dot notation and bracket notation, including dynamic keys.",
            "exampleText": "const user = { name: 'John', 'favorite color': 'blue' };",
            "exampleOutput": "Dot: John; Bracket (static): John; Bracket (dynamic with variable): John; Bracket for property with space: blue",
            "answerFile": "./answers/OBJ002.js",
            "learningOutcome": "Differences between dot and bracket notation."
        },
        {
            "projectId": "OBJ003",
            "title": "Adding, Updating, Deleting Properties",
            "difficulty": "Beginner",
            "description": "Add new properties, update existing ones, delete a property, and check for property existence using `in` and `hasOwnProperty()`.",
            "exampleText": "let obj = {};",
            "exampleOutput": "After adding: { name: 'John' }; After update: { name: 'Jane' }; After delete: {}; hasOwnProperty check: false",
            "answerFile": "./answers/OBJ003.js",
            "learningOutcome": "Mutating objects, property existence checks."
        },
        {
            "projectId": "OBJ004",
            "title": "Nested Objects and Arrays",
            "difficulty": "Intermediate",
            "description": "Create an object with nested objects and arrays. Access deeply nested values and modify them.",
            "exampleText": "const company = { name: 'TechCorp', address: { city: 'SF', zip: '94105' }, employees: [{ name: 'Alice' }, { name: 'Bob' }] };",
            "exampleOutput": "City: SF; First employee: Alice; Modify nested value: zip changed to '94107'.",
            "answerFile": "./answers/OBJ004.js",
            "learningOutcome": "Working with nested structures."
        },
        {
            "projectId": "OBJ005",
            "title": "Accessing Deeply Nested Values",
            "difficulty": "Intermediate",
            "description": "Access deeply nested values using traditional chaining and optional chaining to avoid errors.",
            "exampleText": "const data = { user: { profile: { name: 'Alice' } } };",
            "exampleOutput": "Traditional: Alice; Optional chaining: Alice (if exists), otherwise undefined.",
            "answerFile": "./answers/OBJ005.js",
            "learningOutcome": "Safe navigation with optional chaining."
        },
        {
            "projectId": "OBJ006",
            "title": "The this Keyword Inside Objects",
            "difficulty": "Intermediate",
            "description": "Demonstrate how `this` works inside object methods, and compare regular functions vs arrow functions regarding `this` binding.",
            "exampleText": "const obj = { name: 'Test', regular() { console.log(this.name); }, arrow: () => { console.log(this.name); } };",
            "exampleOutput": "regular: 'Test'; arrow: undefined (or global object).",
            "answerFile": "./answers/OBJ006.js",
            "learningOutcome": "Understanding `this` in different contexts."
        },
        {
            "projectId": "OBJ007",
            "title": "Arrow vs Normal Functions: this",
            "difficulty": "Intermediate",
            "description": "Show how arrow functions capture the surrounding `this` while normal functions have their own.",
            "exampleText": "const counter = { count: 0, normal: function() { this.count++; }, arrow: () => { this.count++; } };",
            "exampleOutput": "normal works; arrow fails because `this` is not the counter.",
            "answerFile": "./answers/OBJ007.js",
            "learningOutcome": "Key difference in `this` binding."
        },
        {
            "projectId": "OBJ008",
            "title": "Iterating Objects: for...in",
            "difficulty": "Beginner",
            "description": "Use `for...in` to iterate over object properties, and filter own properties with `hasOwnProperty`.",
            "exampleText": "const obj = { a: 1, b: 2 };",
            "exampleOutput": "a:1, b:2 (only own properties).",
            "answerFile": "./answers/OBJ008.js",
            "learningOutcome": "Iterating over enumerable properties."
        },
        {
            "projectId": "OBJ009",
            "title": "Object.keys, Object.values, Object.entries",
            "difficulty": "Beginner",
            "description": "Extract keys, values, and key-value pairs from an object using the static methods.",
            "exampleText": "const car = { brand: 'Toyota', model: 'Camry', year: 2020 };",
            "exampleOutput": "Keys: ['brand','model','year']; Values: ['Toyota','Camry',2020]; Entries: [['brand','Toyota'], ...]",
            "answerFile": "./answers/OBJ009.js",
            "learningOutcome": "Using Object static methods to convert objects to arrays."
        },
        {
            "projectId": "OBJ010",
            "title": "Looping Arrays of Objects with map, filter, reduce",
            "difficulty": "Intermediate",
            "description": "Apply higher-order functions on an array of objects: filter adults, map to names, reduce to sum ages.",
            "exampleText": "[{name:'Alice',age:25},{name:'Bob',age:17},{name:'Charlie',age:20}]",
            "exampleOutput": "Adult names: ['Alice','Charlie']; Sum of ages: 62",
            "answerFile": "./answers/OBJ010.js",
            "learningOutcome": "Combining array methods on object arrays."
        },
        {
            "projectId": "OBJ011",
            "title": "Objects as Reference Types",
            "difficulty": "Beginner",
            "description": "Show that objects are reference types: assign one object to another, modify, and both change.",
            "exampleText": "let obj1 = { a: 1 }; let obj2 = obj1; obj2.a = 2;",
            "exampleOutput": "obj1.a = 2, obj2.a = 2; obj1 === obj2 is true",
            "answerFile": "./answers/OBJ011.js",
            "learningOutcome": "Understanding reference vs value."
        },
        {
            "projectId": "OBJ012",
            "title": "Shallow Copy: Spread and Object.assign",
            "difficulty": "Intermediate",
            "description": "Create a shallow copy using spread and Object.assign. Show that nested objects are shared.",
            "exampleText": "const original = { a: 1, b: { c: 2 } };",
            "exampleOutput": "Copy's nested change affects original.",
            "answerFile": "./answers/OBJ012.js",
            "learningOutcome": "Shallow copying and its limitations."
        },
        {
            "projectId": "OBJ013",
            "title": "Deep Copy: JSON and structuredClone",
            "difficulty": "Intermediate",
            "description": "Create a deep copy using JSON methods and structuredClone. Show that changes don't affect the original.",
            "exampleText": "const original = { a: 1, b: { c: 2 } };",
            "exampleOutput": "Copy's nested change does NOT affect original.",
            "answerFile": "./answers/OBJ013.js",
            "learningOutcome": "Deep copying methods."
        },
        {
            "projectId": "OBJ014",
            "title": "Shorthand Properties and Computed Names",
            "difficulty": "Beginner",
            "description": "Use shorthand property syntax and computed property names when creating objects.",
            "exampleText": "const name = 'Alice', age = 30; const key = 'city';",
            "exampleOutput": "Object { name: 'Alice', age: 30, city: 'New York' }",
            "answerFile": "./answers/OBJ014.js",
            "learningOutcome": "Modern object literal enhancements."
        },
        {
            "projectId": "OBJ015",
            "title": "Object Destructuring",
            "difficulty": "Intermediate",
            "description": "Extract properties using destructuring, including nested objects and default values.",
            "exampleText": "const user = { name: 'Alice', address: { city: 'NYC' }, age: undefined };",
            "exampleOutput": "name: Alice, city: NYC, age: 25 (default)",
            "answerFile": "./answers/OBJ015.js",
            "learningOutcome": "Destructuring patterns."
        },
        {
            "projectId": "OBJ016",
            "title": "Spread and Rest Operator for Objects",
            "difficulty": "Intermediate",
            "description": "Use spread to merge objects, and rest to collect remaining properties during destructuring.",
            "exampleText": "const obj1 = { a: 1, b: 2 }; const obj2 = { c: 3 };",
            "exampleOutput": "Merged: { a:1, b:2, c:3 }; Rest: { a:1 } from { a:1, b:2, c:3 }",
            "answerFile": "./answers/OBJ016.js",
            "learningOutcome": "Using ... for object manipulation."
        },
        {
            "projectId": "OBJ017",
            "title": "Default Values in Destructuring",
            "difficulty": "Intermediate",
            "description": "Provide default values when destructuring to handle missing properties.",
            "exampleText": "const { name = 'Anonymous', age = 18 } = {};",
            "exampleOutput": "name: Anonymous, age: 18",
            "answerFile": "./answers/OBJ017.js",
            "learningOutcome": "Handling defaults in destructuring."
        },
        {
            "projectId": "OBJ018",
            "title": "Getters and Setters",
            "difficulty": "Intermediate",
            "description": "Define a getter and setter for an object property to add logic.",
            "exampleText": "person = { firstName: 'John', lastName: 'Doe', get fullName() { ... }, set age(value) { ... } };",
            "exampleOutput": "fullName: 'John Doe'; set age(30) triggers validation.",
            "answerFile": "./answers/OBJ018.js",
            "learningOutcome": "Encapsulation with getters/setters."
        },
        {
            "projectId": "OBJ019",
            "title": "Optional Chaining and Nullish Coalescing",
            "difficulty": "Intermediate",
            "description": "Use `?.` to safely access nested properties and `??` to provide fallback values.",
            "exampleText": "const user = { profile: { name: 'Alice' } };",
            "exampleOutput": "user.profile?.address?.city ?? 'Unknown' -> 'Unknown'",
            "answerFile": "./answers/OBJ019.js",
            "learningOutcome": "Safe property access and default values."
        },
        {
            "projectId": "OBJ020",
            "title": "Object.freeze, Object.seal, Object.preventExtensions",
            "difficulty": "Advanced",
            "description": "Demonstrate the effects of freezing, sealing, and preventing extensions on an object.",
            "exampleText": "const obj = { a: 1 };",
            "exampleOutput": "Frozen: cannot modify; Sealed: can modify but not add/delete; PreventExtensions: cannot add.",
            "answerFile": "./answers/OBJ020.js",
            "learningOutcome": "Object immutability levels."
        },
        {
            "projectId": "OBJ021",
            "title": "Constructor Functions",
            "difficulty": "Intermediate",
            "description": "Create a constructor function to generate multiple objects.",
            "exampleText": "function Person(name, age) { this.name = name; this.age = age; }",
            "exampleOutput": "alice = new Person('Alice', 30); alice.name = 'Alice'",
            "answerFile": "./answers/OBJ021.js",
            "learningOutcome": "Constructor pattern."
        },
        {
            "projectId": "OBJ022",
            "title": "Prototype and Prototype Chain",
            "difficulty": "Intermediate",
            "description": "Show how prototype chain works by creating an object that inherits from another using `Object.create()`.",
            "exampleText": "const parent = { greet() { return 'Hello'; } }; const child = Object.create(parent);",
            "exampleOutput": "child.greet() -> 'Hello'; child.__proto__ === parent",
            "answerFile": "./answers/OBJ022.js",
            "learningOutcome": "Understanding prototypes and inheritance."
        },
        {
            "projectId": "OBJ023",
            "title": "Adding Methods Using Prototypes",
            "difficulty": "Intermediate",
            "description": "Add a method to a constructor's prototype so all instances share it.",
            "exampleText": "function Person(name) { this.name = name; } Person.prototype.sayHi = function() { return `Hi ${this.name}`; };",
            "exampleOutput": "new Person('Alice').sayHi() -> 'Hi Alice'",
            "answerFile": "./answers/OBJ023.js",
            "learningOutcome": "Prototype method sharing."
        },
        {
            "projectId": "OBJ024",
            "title": "ES6 Class Syntax",
            "difficulty": "Intermediate",
            "description": "Define a class with a constructor, instance method, and static method.",
            "exampleText": "class Circle { constructor(radius) { this.radius = radius; } area() { ... } static describe() { ... } }",
            "exampleOutput": "c = new Circle(5); c.area(); Circle.describe();",
            "answerFile": "./answers/OBJ024.js",
            "learningOutcome": "Modern class syntax."
        },
        {
            "projectId": "OBJ025",
            "title": "Class Inheritance using extends",
            "difficulty": "Advanced",
            "description": "Create a subclass that extends a parent class using `extends`.",
            "exampleText": "class Square extends Rectangle { constructor(side) { super(side, side); } }",
            "exampleOutput": "Square inherits methods from Rectangle.",
            "answerFile": "./answers/OBJ025.js",
            "learningOutcome": "Inheritance with classes."
        },
        {
            "projectId": "OBJ026",
            "title": "super Keyword and Method Overriding",
            "difficulty": "Advanced",
            "description": "Use `super()` in the child constructor and override a parent method.",
            "exampleText": "class Square extends Rectangle { constructor(side) { super(side, side); } area() { return super.area(); } }",
            "exampleOutput": "Square overrides area but calls parent.",
            "answerFile": "./answers/OBJ026.js",
            "learningOutcome": "super usage and method overriding."
        },
        {
            "projectId": "OBJ027",
            "title": "JSON.parse and JSON.stringify",
            "difficulty": "Beginner",
            "description": "Convert an object to a JSON string and back.",
            "exampleText": "const obj = { name: 'Alice', age: 30 };",
            "exampleOutput": "JSON string: '{\"name\":\"Alice\",\"age\":30}'; parsed object equal to original.",
            "answerFile": "./answers/OBJ027.js",
            "learningOutcome": "Serialization/deserialization."
        },
        {
            "projectId": "OBJ028",
            "title": "Storing Objects in LocalStorage",
            "difficulty": "Intermediate",
            "description": "Save an object to localStorage and retrieve it after page reload.",
            "exampleText": "const user = { name: 'Alice', age: 30 };",
            "exampleOutput": "After refresh, retrieved object matches original.",
            "answerFile": "./answers/OBJ028.js",
            "learningOutcome": "Persistence with localStorage."
        },
        {
            "projectId": "OBJ029",
            "title": "Merging Objects",
            "difficulty": "Beginner",
            "description": "Merge two objects using spread operator or Object.assign.",
            "exampleText": "obj1 = { a: 1, b: 2 }; obj2 = { b: 3, c: 4 };",
            "exampleOutput": "Merged: { a:1, b:3, c:4 }",
            "answerFile": "./answers/OBJ029.js",
            "learningOutcome": "Object merging."
        },
        {
            "projectId": "OBJ030",
            "title": "Checking Object Equality",
            "difficulty": "Intermediate",
            "description": "Compare objects by reference and by content (shallow) using JSON.stringify.",
            "exampleText": "objA = { a: 1, b: 2 }; objB = { a: 1, b: 2 };",
            "exampleOutput": "Reference false, content true.",
            "answerFile": "./answers/OBJ030.js",
            "learningOutcome": "Equality checks."
        },
        {
            "projectId": "OBJ031",
            "title": "Combining Object Methods: Filter, Map, Reduce on Objects",
            "difficulty": "Advanced",
            "description": "Use Object.entries and array methods to transform an object (e.g., filter out properties with falsy values, map values).",
            "exampleText": "const obj = { a: 1, b: null, c: 3, d: 0 };",
            "exampleOutput": "Filtered: { a:1, c:3 }",
            "answerFile": "./answers/OBJ031.js",
            "learningOutcome": "Transforming objects with array methods."
        },
        {
            "projectId": "OBJ032",
            "title": "Property Descriptors: Enumerable, Writable, Configurable",
            "difficulty": "Advanced",
            "description": "Explore property descriptors using `Object.getOwnPropertyDescriptor` and `Object.defineProperty`.",
            "exampleText": "Object.defineProperty(obj, 'hidden', { enumerable: false, value: 42 });",
            "exampleOutput": "for...in does not show 'hidden', but obj.hidden exists.",
            "answerFile": "./answers/OBJ032.js",
            "learningOutcome": "Fine-grained property control."
        },
        {
            "projectId": "OBJ033",
            "title": "Object.create and Custom Prototypes",
            "difficulty": "Intermediate",
            "description": "Use Object.create to set a custom prototype for an object.",
            "exampleText": "const proto = { greet() { return 'Hi'; } }; const obj = Object.create(proto);",
            "exampleOutput": "obj.greet() -> 'Hi'",
            "answerFile": "./answers/OBJ033.js",
            "learningOutcome": "Manual prototype setting."
        },
        {
            "projectId": "OBJ034",
            "title": "Mixins: Copying Methods from Multiple Sources",
            "difficulty": "Advanced",
            "description": "Implement a mixin pattern by copying methods from multiple objects into a target using Object.assign.",
            "exampleText": "const flyer = { fly() { return 'Flying'; } }; const swimmer = { swim() { return 'Swimming'; } }; const duck = {};",
            "exampleOutput": "duck can fly and swim.",
            "answerFile": "./answers/OBJ034.js",
            "learningOutcome": "Composition with mixins."
        },
        {
            "projectId": "OBJ035",
            "title": "Object.keys with Sorting and Grouping",
            "difficulty": "Advanced",
            "description": "Extract keys, sort them, and group values by some condition.",
            "exampleText": "const scores = { Alice: 85, Bob: 92, Charlie: 78 };",
            "exampleOutput": "Sorted keys: ['Alice','Bob','Charlie']; Pass (>80): { Alice:85, Bob:92 }",
            "answerFile": "./answers/OBJ035.js",
            "learningOutcome": "Advanced object processing."
        },
        {
            "projectId": "OBJ036",
            "title": "The delete Operator and Property Removal",
            "difficulty": "Beginner",
            "description": "Use `delete` to remove a property and understand its effects.",
            "exampleText": "const obj = { a: 1, b: 2 }; delete obj.a;",
            "exampleOutput": "obj -> { b: 2 }",
            "answerFile": "./answers/OBJ036.js",
            "learningOutcome": "Removing properties."
        },
        {
            "projectId": "OBJ037",
            "title": "Checking if Object is Empty",
            "difficulty": "Beginner",
            "description": "Write a function to check if an object has no own enumerable properties.",
            "exampleText": "isEmpty({}) => true; isEmpty({ a: 1 }) => false",
            "exampleOutput": "true, false",
            "answerFile": "./answers/OBJ037.js",
            "learningOutcome": "Object emptiness check."
        },
        {
            "projectId": "OBJ038",
            "title": "Nested Destructuring with Defaults",
            "difficulty": "Intermediate",
            "description": "Combine nested destructuring and default values for complex objects.",
            "exampleText": "const data = { user: { name: 'Alice' } }; const { user: { name, age = 18 } } = data;",
            "exampleOutput": "name: Alice, age: 18",
            "answerFile": "./answers/OBJ038.js",
            "learningOutcome": "Complex destructuring patterns."
        },
        {
            "projectId": "OBJ039",
            "title": "Object.fromEntries: Converting Arrays to Objects",
            "difficulty": "Intermediate",
            "description": "Use `Object.fromEntries` to convert an array of key-value pairs back to an object.",
            "exampleText": "const entries = [['a',1], ['b',2]]; const obj = Object.fromEntries(entries);",
            "exampleOutput": "{ a:1, b:2 }",
            "answerFile": "./answers/OBJ039.js",
            "learningOutcome": "Reversing Object.entries."
        },
        {
            "projectId": "OBJ040",
            "title": "Comprehensive Object Practice",
            "difficulty": "Advanced",
            "description": "Combine multiple object concepts: create a library of books (array of objects), add/remove books, search by title, save to localStorage, etc.",
            "exampleText": "Library app with add, remove, search.",
            "exampleOutput": "A working library manager.",
            "answerFile": "./answers/OBJ040.js",
            "learningOutcome": "Integrating many object concepts."
        }
    ]
}


# ============================================
# JavaScript code for each project (OBJ001.js .. OBJ040.js)
# ============================================
js_files_content = {
    "OBJ001.js": r"""// Object Literals Basics
const person = {
    name: 'Alice',
    age: 30,
    greet() {
        return `Hi, I'm ${this.name}`;
    }
};

console.log('Dot notation:', person.name, person.age);
console.log('Bracket notation:', person['name'], person['age']);
console.log('Greeting:', person.greet());

// Using bracket with variable
const key = 'name';
console.log('Dynamic key:', person[key]);
""",

    "OBJ002.js": r"""// Dot vs Bracket Notation
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
""",

    "OBJ003.js": r"""// Adding, Updating, Deleting Properties
let obj = {};

// Add properties
obj.name = 'John';
obj.age = 25;
console.log('After adding:', obj);

// Update property
obj.name = 'Jane';
console.log('After update:', obj);

// Delete property
delete obj.age;
console.log('After delete:', obj);

// Check existence
console.log('"name" in obj:', 'name' in obj);
console.log('obj.hasOwnProperty("age"):', obj.hasOwnProperty('age'));
""",

    "OBJ004.js": r"""// Nested Objects and Arrays
const company = {
    name: 'TechCorp',
    address: {
        city: 'San Francisco',
        zip: '94105'
    },
    employees: [
        { name: 'Alice', role: 'Developer' },
        { name: 'Bob', role: 'Designer' }
    ]
};

console.log('Company:', company.name);
console.log('City:', company.address.city);
console.log('First employee:', company.employees[0].name);

// Modify nested property
company.address.zip = '94107';
console.log('Updated zip:', company.address.zip);

// Loop through employees
company.employees.forEach(emp => {
    console.log(`${emp.name} - ${emp.role}`);
});
""",

    "OBJ005.js": r"""// Accessing Deeply Nested Values
const data = {
    user: {
        profile: {
            name: 'Alice'
        }
    }
};

// Traditional way (throws error if missing)
try {
    console.log('Traditional:', data.user.profile.name);
} catch (e) {
    console.log('Traditional error:', e.message);
}

// Using optional chaining (safe)
console.log('Optional chaining:', data.user?.profile?.name);
console.log('Optional chaining missing:', data.user?.address?.city); // undefined
""",

    "OBJ006.js": r"""// The this Keyword Inside Objects
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
""",

    "OBJ007.js": r"""// Arrow vs Normal Functions: this
const counter = {
    count: 0,
    normalMethod() {
        this.count++;
        console.log('normalMethod count:', this.count);
    },
    arrowMethod: () => {
        // Arrow functions don't have their own this; they inherit from outer scope.
        // Here, outer scope is global (or module). So this.count is undefined.
        console.log('arrowMethod this:', this);
        // this.count would be undefined, so can't increment.
    }
};

counter.normalMethod(); // count becomes 1
counter.arrowMethod();   // logs global object (or undefined in strict mode)
""",

    "OBJ008.js": r"""// Iterating Objects: for...in
const obj = { a: 1, b: 2 };
// Add inherited property
Object.prototype.inherited = 'inherited';

console.log('All enumerable properties (including inherited):');
for (let key in obj) {
    console.log(`${key}: ${obj[key]}`);
}

console.log('\nOnly own properties:');
for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
        console.log(`${key}: ${obj[key]}`);
    }
}

// Clean up
delete Object.prototype.inherited;
""",

    "OBJ009.js": r"""// Object.keys, Object.values, Object.entries
const car = {
    brand: 'Toyota',
    model: 'Camry',
    year: 2020
};

const keys = Object.keys(car);
console.log('Keys:', keys);

const values = Object.values(car);
console.log('Values:', values);

const entries = Object.entries(car);
console.log('Entries:', entries);

// Iterating with forEach
entries.forEach(([key, value]) => {
    console.log(`${key} -> ${value}`);
});
""",

    "OBJ010.js": r"""// Looping Arrays of Objects with map, filter, reduce
const users = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 17 },
    { name: 'Charlie', age: 20 }
];

// Filter adults
const adults = users.filter(user => user.age > 18);
console.log('Adults:', adults);

// Map to names
const adultNames = adults.map(user => user.name);
console.log('Adult names:', adultNames);

// Reduce to sum ages
const totalAge = users.reduce((sum, user) => sum + user.age, 0);
console.log('Total age:', totalAge);
""",

    "OBJ011.js": r"""// Objects as Reference Types
let obj1 = { a: 1, b: 2 };
let obj2 = obj1; // obj2 references the same object

console.log('obj1:', obj1);
console.log('obj2:', obj2);

obj2.a = 99;
console.log('After modifying obj2.a = 99:');
console.log('obj1:', obj1);
console.log('obj2:', obj2);

// Equality comparison
let obj3 = { a: 1, b: 2 };
console.log('obj1 === obj2:', obj1 === obj2); // true
console.log('obj1 === obj3:', obj1 === obj3); // false
""",

    "OBJ012.js": r"""// Shallow Copy: Spread and Object.assign
const original = {
    a: 1,
    b: { c: 2, d: 3 }
};

// Spread operator
const copySpread = { ...original };
console.log('Spread copy:', copySpread);

// Object.assign
const copyAssign = Object.assign({}, original);
console.log('Object.assign copy:', copyAssign);

// Modify nested property in copy
copySpread.b.c = 999;
console.log('\nAfter copySpread.b.c = 999:');
console.log('original.b.c:', original.b.c); // 999 (changed!)
console.log('copySpread.b.c:', copySpread.b.c);
""",

    "OBJ013.js": r"""// Deep Copy: JSON and structuredClone
const original = {
    a: 1,
    b: { c: 2, d: 3 }
};

// JSON method
const deepCopyJSON = JSON.parse(JSON.stringify(original));
console.log('Deep copy (JSON):', deepCopyJSON);

// structuredClone (modern)
const deepCopyClone = structuredClone(original);
console.log('Deep copy (structuredClone):', deepCopyClone);

// Modify nested property in copies
deepCopyJSON.b.c = 999;
deepCopyClone.b.c = 888;

console.log('\nAfter modifications:');
console.log('original.b.c:', original.b.c); // 2 (unchanged)
console.log('JSON copy b.c:', deepCopyJSON.b.c);
console.log('structuredClone copy b.c:', deepCopyClone.b.c);
""",

    "OBJ014.js": r"""// Shorthand Properties and Computed Names
const name = 'Alice';
const age = 30;
const key = 'city';
const city = 'New York';

// Shorthand
const person = { name, age };
console.log('Shorthand:', person);

// Computed property name
const obj = { [key]: city };
console.log('Computed:', obj);

// Combined
const combined = { name, age, [key]: city };
console.log('Combined:', combined);
""",

    "OBJ015.js": r"""// Object Destructuring
const user = {
    name: 'Alice',
    address: {
        city: 'NYC',
        zip: '10001'
    },
    age: undefined
};

// Basic destructuring with default
const { name, age = 25 } = user;
console.log('Name:', name);
console.log('Age (with default):', age);

// Nested destructuring
const { address: { city, zip } } = user;
console.log('City:', city);
console.log('Zip:', zip);

// Default for missing nested property
const { address: { country = 'USA' } } = user;
console.log('Country (default):', country);
""",

    "OBJ016.js": r"""// Spread and Rest Operator for Objects
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };

// Spread to merge
const merged = { ...obj1, ...obj2 };
console.log('Merged:', merged);

// Rest in destructuring
const { a, ...rest } = merged;
console.log('a:', a);
console.log('rest:', rest);
""",

    "OBJ017.js": r"""// Default Values in Destructuring
const user = { name: 'Alice' };

const { name, age = 25, city = 'Unknown' } = user;
console.log('Name:', name);
console.log('Age:', age);
console.log('City:', city);

// Also works with nested destructuring
const data = { user: { name: 'Bob' } };
const { user: { name: userName, age: userAge = 30 } } = data;
console.log('User name:', userName);
console.log('User age (default):', userAge);
""",

    "OBJ018.js": r"""// Getters and Setters
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
""",

    "OBJ019.js": r"""// Optional Chaining and Nullish Coalescing
const user = {
    profile: {
        name: 'Alice'
        // address is missing
    }
};

// Without optional chaining would throw error
// const city = user.profile.address.city; // Error!

// With optional chaining
const city = user.profile?.address?.city ?? 'Unknown';
console.log('City:', city); // 'Unknown'

// With existing property
const name = user.profile?.name ?? 'Anonymous';
console.log('Name:', name); // 'Alice'

// Nullish coalescing only for null/undefined
const score = 0 ?? 100;
console.log('Score:', score); // 0 (not replaced)
""",

    "OBJ020.js": r"""// Object.freeze, Object.seal, Object.preventExtensions
const frozen = { a: 1 };
Object.freeze(frozen);
frozen.a = 2;        // ignored in non-strict, error in strict
frozen.b = 3;        // ignored
console.log('Frozen:', frozen); // { a: 1 }

const sealed = { a: 1 };
Object.seal(sealed);
sealed.a = 2;        // works
sealed.b = 3;        // ignored
delete sealed.a;     // ignored
console.log('Sealed:', sealed); // { a: 2 }

const noExtend = { a: 1 };
Object.preventExtensions(noExtend);
noExtend.a = 2;      // works
noExtend.b = 3;      // ignored
console.log('PreventExtensions:', noExtend); // { a: 2 }
""",

    "OBJ021.js": r"""// Constructor Functions
function Person(name, age) {
    this.name = name;
    this.age = age;
}

const alice = new Person('Alice', 30);
const bob = new Person('Bob', 25);

console.log(alice);
console.log(bob);
console.log('alice instanceof Person:', alice instanceof Person);
""",

    "OBJ022.js": r"""// Prototype and Prototype Chain
const parent = {
    greet() {
        return 'Hello from parent';
    },
    type: 'parent'
};

const child = Object.create(parent);
child.type = 'child';
child.sayHi = function() {
    return 'Hi from child';
};

console.log(child.greet()); // inherited from parent
console.log(child.type);    // own property
console.log(child.sayHi()); // own method

// Prototype chain
console.log('child.__proto__ === parent:', child.__proto__ === parent);
console.log('parent.isPrototypeOf(child):', parent.isPrototypeOf(child));
""",

    "OBJ023.js": r"""// Adding Methods Using Prototypes
function Person(name) {
    this.name = name;
}

// Add method to prototype
Person.prototype.greet = function() {
    return `Hello, I'm ${this.name}`;
};

const alice = new Person('Alice');
const bob = new Person('Bob');

console.log(alice.greet()); // Hello, I'm Alice
console.log(bob.greet());   // Hello, I'm Bob

// Method is shared
console.log(alice.greet === bob.greet); // true
""",

    "OBJ024.js": r"""// ES6 Class Syntax
class Circle {
    constructor(radius) {
        this.radius = radius;
    }

    // Instance method
    area() {
        return Math.PI * this.radius ** 2;
    }

    // Static method
    static describe() {
        return 'A circle is a shape with all points equidistant from center.';
    }
}

const c = new Circle(5);
console.log('Radius:', c.radius);
console.log('Area:', c.area());
console.log('Static:', Circle.describe());

// Instance method not available on class
// Circle.area(); // TypeError
""",

    "OBJ025.js": r"""// Class Inheritance using extends
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    area() {
        return this.width * this.height;
    }
}

class Square extends Rectangle {
    constructor(side) {
        super(side, side);
    }
}

const sq = new Square(4);
console.log('Square area:', sq.area()); // 16
console.log('sq instanceof Square:', sq instanceof Square);
console.log('sq instanceof Rectangle:', sq instanceof Rectangle);
""",

    "OBJ026.js": r"""// super Keyword and Method Overriding
class Vehicle {
    constructor(brand) {
        this.brand = brand;
    }

    start() {
        return `${this.brand} vehicle started.`;
    }
}

class Car extends Vehicle {
    constructor(brand, model) {
        super(brand); // call parent constructor
        this.model = model;
    }

    start() {
        // Override method but also call parent
        return super.start() + ` It's a ${this.model}.`;
    }
}

const myCar = new Car('Toyota', 'Camry');
console.log(myCar.start()); // Toyota vehicle started. It's a Camry.
""",

    "OBJ027.js": r"""// JSON.parse and JSON.stringify
const obj = {
    name: 'Alice',
    age: 30,
    hobbies: ['reading', 'gaming'],
    address: { city: 'NYC', zip: '10001' }
};

const jsonString = JSON.stringify(obj);
console.log('JSON string:', jsonString);

const parsedObj = JSON.parse(jsonString);
console.log('Parsed object:', parsedObj);

// Compare content (they are equal but not same reference)
console.log('Content equal?', JSON.stringify(obj) === JSON.stringify(parsedObj));
console.log('Same reference?', obj === parsedObj);
""",

    "OBJ028.js": r"""// Storing Objects in LocalStorage
const user = {
    name: 'Alice',
    age: 30,
    preferences: { theme: 'dark', language: 'en' }
};

// Store
localStorage.setItem('user', JSON.stringify(user));

// Retrieve (after page reload, you can still get it)
const stored = localStorage.getItem('user');
if (stored) {
    const retrievedUser = JSON.parse(stored);
    console.log('Retrieved user:', retrievedUser);
    console.log('Same object?', retrievedUser === user); // false
} else {
    console.log('No user in localStorage');
}

// For demo, clear after showing
// localStorage.removeItem('user');
""",

    "OBJ029.js": r"""// Merging Objects
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };

// Using spread
const mergedSpread = { ...obj1, ...obj2 };
console.log('Merged with spread:', mergedSpread); // { a:1, b:3, c:4 }

// Using Object.assign
const mergedAssign = Object.assign({}, obj1, obj2);
console.log('Merged with assign:', mergedAssign);
""",

    "OBJ030.js": r"""// Checking Object Equality
const objA = { a: 1, b: 2 };
const objB = { a: 1, b: 2 };
const objC = objA;

console.log('objA === objB (reference):', objA === objB); // false
console.log('objA === objC (reference):', objA === objC); // true

// Content equality (shallow, using JSON)
function isEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

console.log('Content equality (objA, objB):', isEqual(objA, objB)); // true
console.log('Content equality (objA, objC):', isEqual(objA, objC)); // true
""",

    "OBJ031.js": r"""// Combining Object Methods: Filter, Map, Reduce on Objects
const obj = { a: 1, b: null, c: 3, d: 0, e: 5 };

// Filter out falsy values (excluding 0? Let's remove only null/undefined)
const filtered = Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined)
);
console.log('Filtered (remove null/undefined):', filtered);

// Map: double all numeric values
const doubled = Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, typeof value === 'number' ? value * 2 : value])
);
console.log('Doubled numbers:', doubled);

// Reduce: sum all numeric values
const sum = Object.values(obj).reduce((acc, val) => acc + (typeof val === 'number' ? val : 0), 0);
console.log('Sum of numbers:', sum);
""",

    "OBJ032.js": r"""// Property Descriptors: Enumerable, Writable, Configurable
const obj = { visible: 'I am visible' };

// Define a property with custom descriptor
Object.defineProperty(obj, 'hidden', {
    value: 42,
    enumerable: false,  // won't appear in for...in or Object.keys
    writable: false,    // cannot change
    configurable: false // cannot delete or redefine
});

console.log('obj.hidden:', obj.hidden); // 42

// Check descriptor
const desc = Object.getOwnPropertyDescriptor(obj, 'hidden');
console.log('Descriptor:', desc);

// for...in only shows enumerable properties
for (const key in obj) {
    console.log(`for...in: ${key}`);
}
// Output: "visible"

// Object.keys also only enumerable
console.log('Object.keys:', Object.keys(obj)); // ['visible']

// Trying to modify a non-writable property
obj.hidden = 100; // ignored (in non-strict) or throws in strict
console.log('obj.hidden after assignment:', obj.hidden); // 42
""",

    "OBJ033.js": r"""// Object.create and Custom Prototypes
const animal = {
    speak() {
        console.log(`${this.name} makes a sound.`);
    }
};

const dog = Object.create(animal);
dog.name = 'Rex';
dog.bark = function() {
    console.log('Woof!');
};

dog.speak(); // Rex makes a sound.
dog.bark();  // Woof!

console.log('dog.__proto__ === animal:', dog.__proto__ === animal);
console.log('animal.isPrototypeOf(dog):', animal.isPrototypeOf(dog));
""",

    "OBJ034.js": r"""// Mixins: Copying Methods from Multiple Sources
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
""",

    "OBJ035.js": r"""// Object.keys with Sorting and Grouping
const scores = {
    Alice: 85,
    Bob: 92,
    Charlie: 78,
    Diana: 88
};

// Sort keys alphabetically
const sortedKeys = Object.keys(scores).sort();
console.log('Sorted keys:', sortedKeys);

// Group scores: pass (>80) vs fail
const grouped = Object.entries(scores).reduce((acc, [name, score]) => {
    if (score > 80) acc.pass.push(name);
    else acc.fail.push(name);
    return acc;
}, { pass: [], fail: [] });

console.log('Pass (score > 80):', grouped.pass);
console.log('Fail (score <= 80):', grouped.fail);
""",

    "OBJ036.js": r"""// The delete Operator and Property Removal
const obj = { a: 1, b: 2, c: 3 };

console.log('Before delete:', obj);

delete obj.b;
console.log('After delete obj.b:', obj);

// delete returns true if property existed and was removed
console.log('delete obj.c:', delete obj.c); // true
console.log('delete obj.d (non-existent):', delete obj.d); // true (no error)

// Deleting a non-configurable property fails in strict mode
const frozen = Object.freeze({ x: 1 });
// delete frozen.x; // would fail (ignored in non-strict)
console.log('After delete on frozen object:', frozen);
""",

    "OBJ037.js": r"""// Checking if Object is Empty
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

console.log('isEmpty({}):', isEmpty({})); // true
console.log('isEmpty({ a: 1 }):', isEmpty({ a: 1 })); // false
console.log('isEmpty({ length: 0 }):', isEmpty({ length: 0 })); // false (has property)
""",

    "OBJ038.js": r"""// Nested Destructuring with Defaults
const data = {
    user: {
        name: 'Alice'
        // age is missing
    }
};

const {
    user: {
        name,
        age = 30,
        address: { city = 'Unknown' } = {} // default empty object to avoid error
    }
} = data;

console.log('Name:', name);
console.log('Age (default):', age);
console.log('City (default):', city);
""",

    "OBJ039.js": r"""// Object.fromEntries: Converting Arrays to Objects
const entries = [
    ['a', 1],
    ['b', 2],
    ['c', 3]
];

const obj = Object.fromEntries(entries);
console.log('Object.fromEntries result:', obj);

// Useful for reversing Object.entries
const original = { x: 10, y: 20 };
const back = Object.fromEntries(Object.entries(original));
console.log('Back to object:', back);
console.log('Same reference?', original === back); // false (new object)
""",

    "OBJ040.js": r"""// Comprehensive Object Practice: Library Manager
// HTML: <div id="library"></div>
// A simple library manager

let library = [];

function addBook(title, author, year) {
    library.push({ id: Date.now(), title, author, year });
    saveToLocalStorage();
    renderLibrary();
}

function removeBook(id) {
    library = library.filter(book => book.id !== id);
    saveToLocalStorage();
    renderLibrary();
}

function searchBooks(term) {
    return library.filter(book =>
        book.title.toLowerCase().includes(term.toLowerCase()) ||
        book.author.toLowerCase().includes(term.toLowerCase())
    );
}

function saveToLocalStorage() {
    localStorage.setItem('library', JSON.stringify(library));
}

function loadFromLocalStorage() {
    const stored = localStorage.getItem('library');
    if (stored) {
        library = JSON.parse(stored);
    }
    renderLibrary();
}

function renderLibrary(filteredBooks = null) {
    const container = document.getElementById('library');
    if (!container) return;

    const booksToShow = filteredBooks || library;
    container.innerHTML = booksToShow.map(book => `
        <div class="book">
            <strong>${book.title}</strong> by ${book.author} (${book.year})
            <button onclick="removeBook(${book.id})">Delete</button>
        </div>
    `).join('') || '<p>No books in library.</p>';
}

// For console testing
console.log('Library manager loaded. Use addBook(title, author, year), removeBook(id), searchBooks(term)');

// Uncomment to test in console:
// addBook('1984', 'George Orwell', 1949);
// addBook('Brave New World', 'Aldous Huxley', 1932);
// console.log(searchBooks('world'));

// If you want to attach to HTML buttons, you'd need to expose functions globally.
window.addBook = addBook;
window.removeBook = removeBook;
window.searchBooks = searchBooks;

loadFromLocalStorage();
"""
}


# ============================================
# Add explanation fields to each project
# ============================================
for proj in js_projects["projects"]:
    pid = proj["projectId"]
    code = js_files_content.get(pid + ".js", "")
    logic, code_exp = generate_explanations(proj, code)
    proj["logicExplanation"] = logic
    proj["codeExplanation"] = code_exp


# ============================================
# Create directories and write files
# ============================================
current_dir = os.path.dirname(os.path.abspath(__file__))

answers_dir = os.path.join(current_dir, "answers")
os.makedirs(answers_dir, exist_ok=True)

# Write JSON file
json_path = os.path.join(current_dir, "js-object-projects.json")
with open(json_path, "w", encoding="utf-8") as f:
    json.dump(js_projects, f, indent=2, ensure_ascii=False)

# Write each JavaScript file
for filename, content in js_files_content.items():
    file_path = os.path.join(answers_dir, filename)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

print(f"✅ Successfully created 'answers' folder with {len(js_files_content)} JS files and 'js-object-projects.json' (with explanations)")