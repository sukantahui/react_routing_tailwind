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

    if "Create Array" in title:
        logic = (
            "Arrays in JavaScript are zero‑indexed lists. You can create them using `[]` or `new Array()`. "
            "The `length` property gives the number of elements. Access elements by index, e.g., `arr[0]`."
        )
        code_exp = (
            "This script creates an array of numbers, logs its length, accesses individual elements, "
            "and modifies an element by index."
        )

    elif "Push and Pop" in title:
        logic = (
            "`push()` adds one or more elements to the end of an array and returns the new length. "
            "`pop()` removes the last element and returns it. Both modify the original array."
        )
        code_exp = (
            "The code demonstrates `push()` and `pop()` by adding a new element to the end and removing the last one, "
            "printing the array after each operation."
        )

    elif "Shift and Unshift" in title:
        logic = (
            "`unshift()` adds elements to the beginning of an array, shifting existing elements to higher indices. "
            "`shift()` removes the first element and returns it, shifting the rest down."
        )
        code_exp = (
            "The script uses `unshift()` to prepend a new element, then `shift()` to remove the first element, "
            "showing the array before and after."
        )

    elif "Splice Practice" in title:
        logic = (
            "`splice()` is a versatile mutating method. It can remove, replace, or insert elements. "
            "Syntax: `array.splice(start, deleteCount, ...items)`."
        )
        code_exp = (
            "This example demonstrates removing two elements starting at index 1, replacing an element, "
            "and inserting new elements without deletion."
        )

    elif "Slice and Concat" in title:
        logic = (
            "`slice()` returns a shallow copy of a portion of an array without modifying the original. "
            "`concat()` merges two or more arrays into a new array."
        )
        code_exp = (
            "The code creates a subarray using `slice()` and combines two arrays with `concat()`, "
            "proving that the original arrays remain unchanged."
        )

    elif "Searching with indexOf and includes" in title:
        logic = (
            "`indexOf()` returns the first index of a given element, or -1 if not found. "
            "`includes()` returns a boolean indicating whether the element exists in the array."
        )
        code_exp = (
            "This script searches for a number in an array, logs its index if found, and checks for presence with `includes()`."
        )

    elif "Find and FindIndex" in title:
        logic = (
            "`find()` returns the first element that satisfies a testing function, or `undefined`. "
            "`findIndex()` returns the index of that element, or -1 if none satisfies."
        )
        code_exp = (
            "The code finds the first even number in an array using `find()` and its index using `findIndex()`."
        )

    elif "For Loop Iteration" in title:
        logic = (
            "A classic `for` loop allows iteration using an index variable, often from 0 to `array.length - 1`. "
            "It gives full control over the iteration process."
        )
        code_exp = (
            "The script calculates the sum of array elements using a `for` loop and prints the result."
        )

    elif "For...of Loop" in title:
        logic = (
            "`for...of` iterates over iterable values (like arrays) directly, giving each element value "
            "without needing an index. It's cleaner for simple iterations."
        )
        code_exp = (
            "This example uses `for...of` to print each element of an array to the console."
        )

    elif "forEach Method" in title:
        logic = (
            "`forEach()` executes a provided function once for each array element. It's a higher‑order method "
            "that abstracts the loop and is commonly used for side effects."
        )
        code_exp = (
            "The script uses `forEach()` to log each element and its index, demonstrating the method's callback."
        )

    elif "Map Method" in title:
        logic = (
            "`map()` creates a new array by applying a function to every element of the original array. "
            "It does not mutate the original array."
        )
        code_exp = (
            "This code doubles each number in an array using `map()` and stores the result in a new array."
        )

    elif "Filter Method" in title:
        logic = (
            "`filter()` creates a new array with all elements that pass a test implemented by a function. "
            "It's useful for extracting subsets."
        )
        code_exp = (
            "The script filters out all odd numbers, keeping only even numbers, and prints the filtered array."
        )

    elif "Reduce Method" in title:
        logic = (
            "`reduce()` executes a reducer function on each element, resulting in a single output value. "
            "It can be used for summing, counting, grouping, etc."
        )
        code_exp = (
            "This example sums all numbers in an array using `reduce()` and logs the total."
        )

    elif "Combined Map and Filter" in title:
        logic = (
            "Chaining higher‑order methods is common. Here we filter an array to keep only even numbers, "
            "then map each even to its square."
        )
        code_exp = (
            "The code first filters evens, then maps them to squares, resulting in an array of squares of even numbers."
        )

    elif "Array of Objects Manipulation" in title:
        logic = (
            "When arrays contain objects, you often need to extract or transform properties. "
            "`map()` and `filter()` work with objects as well."
        )
        code_exp = (
            "Given an array of user objects, the script extracts names of users older than 18 using `filter()` and `map()`."
        )

    elif "Remove Duplicates" in title:
        logic = (
            "One way to remove duplicates is to use `filter()` with `indexOf()` to keep only the first occurrence of each element."
        )
        code_exp = (
            "The code removes duplicate numbers from an array, returning a new array with unique values."
        )

    elif "Flatten Nested Arrays" in title:
        logic = (
            "Flattening a nested array means converting it to a single‑level array. This can be done with `reduce()` "
            "or the newer `flat()` method. Here we implement it manually."
        )
        code_exp = (
            "The script uses `reduce()` and `concat()` to flatten an array of arrays into one array."
        )

    elif "Group By Property" in title:
        logic = (
            "Grouping objects by a property can be done with `reduce()`. The accumulator is an object where keys are "
            "the property values, and values are arrays of matching objects."
        )
        code_exp = (
            "Given an array of people, the code groups them by age using `reduce()`."
        )

    elif "Chaining Methods" in title:
        logic = (
            "You can chain array methods like `filter()`, `map()`, and `reduce()` to perform complex transformations "
            "in a concise, readable way."
        )
        code_exp = (
            "The example filters numbers greater than 10, maps them to their squares, and sums the squares in one chain."
        )

    elif "Custom Sort" in title:
        logic = (
            "`sort()` sorts an array in place. For objects, you provide a compare function. It mutates the original array."
        )
        code_exp = (
            "The code sorts an array of objects (people) by age in ascending order using a custom comparator."
        )

    else:
        logic = f"General array manipulation project covering {title}."
        code_exp = f"The JavaScript code implements {title} as described in the example."

    return logic, code_exp


# ============================================
# JavaScript project data (20 projects)
# ============================================
js_projects = {
    "projectCategory": "JavaScript Array Methods – 20 Practical Projects",
    "subject": "Web Development (JavaScript)",
    "board": "General",
    "class": "Beginner / Intermediate",
    "tools": ["Browser Console", "VS Code", "Any modern browser"],
    "institute": {
        "author": "Sukanta Hui",
        "name": "Coder & AccoTax",
        "location": "Barrackpore & Naihati"
    },
    "projects": [
        {
            "projectId": "ARR001",
            "title": "Create Array and Access Elements",
            "difficulty": "Beginner",
            "description": "Create an array of numbers. Log its length, access the first and last elements, and change an element by index.",
            "exampleText": "Array: [10, 20, 30, 40, 50]",
            "exampleOutput": "Length: 5, First: 10, Last: 50, After change: [10, 25, 30, 40, 50]",
            "answerFile": "./answers/ARR001.js",
            "learningOutcome": "Understanding array creation, length property, and indexing."
        },
        {
            "projectId": "ARR002",
            "title": "Push and Pop Demo",
            "difficulty": "Beginner",
            "description": "Create an array of fruits. Use push to add a fruit, then pop to remove the last fruit. Log the array after each step.",
            "exampleText": "Initial: ['apple', 'banana']",
            "exampleOutput": "After push: ['apple', 'banana', 'orange']; After pop: ['apple', 'banana']",
            "answerFile": "./answers/ARR002.js",
            "learningOutcome": "Using mutating methods push and pop."
        },
        {
            "projectId": "ARR003",
            "title": "Shift and Unshift Demo",
            "difficulty": "Beginner",
            "description": "Start with an array of numbers. Use unshift to add a number at the beginning, then shift to remove the first element. Log the array.",
            "exampleText": "Initial: [2, 3, 4]",
            "exampleOutput": "After unshift(1): [1,2,3,4]; After shift: [2,3,4]",
            "answerFile": "./answers/ARR003.js",
            "learningOutcome": "Using shift and unshift to manipulate array start."
        },
        {
            "projectId": "ARR004",
            "title": "Splice Practice",
            "difficulty": "Intermediate",
            "description": "Given an array of months, use splice to remove two months starting from index 1, replace an element at index 3, and insert two new months at index 2 without deleting.",
            "exampleText": "['Jan','Feb','Mar','Apr','May']",
            "exampleOutput": "After operations: ['Jan','Mar','New1','New2','Apr']",
            "answerFile": "./answers/ARR004.js",
            "learningOutcome": "Mastering splice for removal, replacement, and insertion."
        },
        {
            "projectId": "ARR005",
            "title": "Slice and Concat",
            "difficulty": "Beginner",
            "description": "Use slice to extract a portion of an array, and concat to merge two arrays. Ensure original arrays remain unchanged.",
            "exampleText": "arr1 = [1,2,3,4,5]; arr2 = [6,7,8]",
            "exampleOutput": "slice(1,4): [2,3,4]; concat: [1,2,3,4,5,6,7,8]",
            "answerFile": "./answers/ARR005.js",
            "learningOutcome": "Using non‑mutating methods slice and concat."
        },
        {
            "projectId": "ARR006",
            "title": "Searching with indexOf and includes",
            "difficulty": "Beginner",
            "description": "Given an array of numbers, find the index of a specific number using indexOf, and check if a number exists using includes.",
            "exampleText": "[5, 10, 15, 20]",
            "exampleOutput": "indexOf(15): 2; includes(10): true; includes(25): false",
            "answerFile": "./answers/ARR006.js",
            "learningOutcome": "Using indexOf and includes for searching."
        },
        {
            "projectId": "ARR007",
            "title": "Find and FindIndex",
            "difficulty": "Intermediate",
            "description": "From an array of numbers, use find to get the first even number, and findIndex to get its index.",
            "exampleText": "[3, 7, 2, 9, 4]",
            "exampleOutput": "First even: 2, index: 2",
            "answerFile": "./answers/ARR007.js",
            "learningOutcome": "Using find and findIndex with callbacks."
        },
        {
            "projectId": "ARR008",
            "title": "For Loop Iteration",
            "difficulty": "Beginner",
            "description": "Calculate the sum of all numbers in an array using a classic for loop.",
            "exampleText": "[1, 2, 3, 4, 5]",
            "exampleOutput": "Sum = 15",
            "answerFile": "./answers/ARR008.js",
            "learningOutcome": "Basic iteration with for loop."
        },
        {
            "projectId": "ARR009",
            "title": "For...of Loop",
            "difficulty": "Beginner",
            "description": "Iterate over an array using for...of and log each element to the console.",
            "exampleText": "['red', 'green', 'blue']",
            "exampleOutput": "red\ngreen\nblue",
            "answerFile": "./answers/ARR009.js",
            "learningOutcome": "Using for...of for simpler iteration."
        },
        {
            "projectId": "ARR010",
            "title": "forEach Method",
            "difficulty": "Beginner",
            "description": "Use forEach to log each element along with its index.",
            "exampleText": "['apple', 'banana', 'cherry']",
            "exampleOutput": "0: apple\n1: banana\n2: cherry",
            "answerFile": "./answers/ARR010.js",
            "learningOutcome": "Using forEach with index parameter."
        },
        {
            "projectId": "ARR011",
            "title": "Map Method",
            "difficulty": "Beginner",
            "description": "Use map to create a new array where each number is doubled.",
            "exampleText": "[1, 2, 3, 4]",
            "exampleOutput": "[2, 4, 6, 8]",
            "answerFile": "./answers/ARR011.js",
            "learningOutcome": "Transforming arrays with map."
        },
        {
            "projectId": "ARR012",
            "title": "Filter Method",
            "difficulty": "Beginner",
            "description": "Use filter to extract all even numbers from an array.",
            "exampleText": "[1, 2, 3, 4, 5, 6]",
            "exampleOutput": "[2, 4, 6]",
            "answerFile": "./answers/ARR012.js",
            "learningOutcome": "Filtering arrays with filter."
        },
        {
            "projectId": "ARR013",
            "title": "Reduce Method",
            "difficulty": "Intermediate",
            "description": "Use reduce to calculate the sum of all numbers in an array.",
            "exampleText": "[10, 20, 30, 40]",
            "exampleOutput": "Sum = 100",
            "answerFile": "./answers/ARR013.js",
            "learningOutcome": "Aggregating arrays with reduce."
        },
        {
            "projectId": "ARR014",
            "title": "Combined Map and Filter",
            "difficulty": "Intermediate",
            "description": "From an array of numbers, first filter out odd numbers, then map the even numbers to their squares.",
            "exampleText": "[1, 2, 3, 4, 5, 6]",
            "exampleOutput": "[4, 16, 36]",
            "answerFile": "./answers/ARR014.js",
            "learningOutcome": "Chaining array methods."
        },
        {
            "projectId": "ARR015",
            "title": "Array of Objects Manipulation",
            "difficulty": "Intermediate",
            "description": "Given an array of user objects (name, age), extract the names of users older than 18 using filter and map.",
            "exampleText": "[{name:'Alice',age:25},{name:'Bob',age:17},{name:'Charlie',age:20}]",
            "exampleOutput": "['Alice', 'Charlie']",
            "answerFile": "./answers/ARR015.js",
            "learningOutcome": "Working with arrays of objects."
        },
        {
            "projectId": "ARR016",
            "title": "Remove Duplicates",
            "difficulty": "Intermediate",
            "description": "Write a function that removes duplicate elements from an array (preserving order) using filter and indexOf.",
            "exampleText": "[1, 2, 2, 3, 4, 4, 5]",
            "exampleOutput": "[1, 2, 3, 4, 5]",
            "answerFile": "./answers/ARR016.js",
            "learningOutcome": "Removing duplicates with filter."
        },
        {
            "projectId": "ARR017",
            "title": "Flatten Nested Arrays",
            "difficulty": "Expert",
            "description": "Write a function that flattens an array of arrays into a single array using reduce and concat.",
            "exampleText": "[[1,2],[3,4],[5,6]]",
            "exampleOutput": "[1,2,3,4,5,6]",
            "answerFile": "./answers/ARR017.js",
            "learningOutcome": "Flattening with reduce."
        },
        {
            "projectId": "ARR018",
            "title": "Group By Property",
            "difficulty": "Expert",
            "description": "Given an array of people objects, group them by their age using reduce. The result should be an object where keys are ages and values are arrays of names.",
            "exampleText": "[{name:'Alice',age:25},{name:'Bob',age:17},{name:'Charlie',age:25}]",
            "exampleOutput": "{25: ['Alice','Charlie'], 17: ['Bob']}",
            "answerFile": "./answers/ARR018.js",
            "learningOutcome": "Using reduce for grouping."
        },
        {
            "projectId": "ARR019",
            "title": "Chaining Methods",
            "difficulty": "Intermediate",
            "description": "Chain filter, map, and reduce to: filter numbers > 10, map them to their squares, then sum the squares.",
            "exampleText": "[5, 12, 8, 15, 3]",
            "exampleOutput": "Sum of squares of numbers > 10 = 144 + 225 = 369",
            "answerFile": "./answers/ARR019.js",
            "learningOutcome": "Chaining higher‑order methods."
        },
        {
            "projectId": "ARR020",
            "title": "Custom Sort",
            "difficulty": "Intermediate",
            "description": "Sort an array of objects (people) by age in ascending order using sort with a custom comparator.",
            "exampleText": "[{name:'Alice',age:25},{name:'Bob',age:17},{name:'Charlie',age:20}]",
            "exampleOutput": "[{name:'Bob',age:17},{name:'Charlie',age:20},{name:'Alice',age:25}]",
            "answerFile": "./answers/ARR020.js",
            "learningOutcome": "Using sort with compare function."
        }
    ]
}


# ============================================
# JavaScript code for each project (ARR001.js .. ARR020.js)
# ============================================
js_files_content = {
    "ARR001.js": r"""// Create Array and Access Elements
const arr = [10, 20, 30, 40, 50];
console.log('Original array:', arr);
console.log('Length:', arr.length);
console.log('First element:', arr[0]);
console.log('Last element:', arr[arr.length - 1]);

// Modify an element
arr[1] = 25;
console.log('After change:', arr);
""",

    "ARR002.js": r"""// Push and Pop Demo
let fruits = ['apple', 'banana'];
console.log('Initial:', fruits);

// Push
fruits.push('orange');
console.log('After push:', fruits);

// Pop
const removed = fruits.pop();
console.log('After pop:', fruits);
console.log('Removed element:', removed);
""",

    "ARR003.js": r"""// Shift and Unshift Demo
let numbers = [2, 3, 4];
console.log('Initial:', numbers);

// Unshift
numbers.unshift(1);
console.log('After unshift(1):', numbers);

// Shift
const shifted = numbers.shift();
console.log('After shift:', numbers);
console.log('Shifted element:', shifted);
""",

    "ARR004.js": r"""// Splice Practice
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
console.log('Original:', months);

// Remove two months starting at index 1
const removed = months.splice(1, 2);
console.log('After removal:', months);
console.log('Removed:', removed);

// Replace element at index 3 (original array is now ['Jan','Apr','May'] after removal)
months.splice(3, 1, 'Jun');
console.log('After replacement:', months);

// Insert two months at index 2 without deleting
months.splice(2, 0, 'New1', 'New2');
console.log('After insertion:', months);
""",

    "ARR005.js": r"""// Slice and Concat
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [6, 7, 8];

// Slice (extract indices 1 to 4, exclusive of end)
const slice = arr1.slice(1, 4);
console.log('Slice arr1[1..4):', slice);

// Concat
const combined = arr1.concat(arr2);
console.log('Concatenated:', combined);

// Original arrays unchanged
console.log('Original arr1:', arr1);
console.log('Original arr2:', arr2);
""",

    "ARR006.js": r"""// Searching with indexOf and includes
const numbers = [5, 10, 15, 20];

const index = numbers.indexOf(15);
console.log('indexOf(15):', index); // 2

console.log('includes(10):', numbers.includes(10)); // true
console.log('includes(25):', numbers.includes(25)); // false
""",

    "ARR007.js": r"""// Find and FindIndex
const numbers = [3, 7, 2, 9, 4];

// Find first even number
const firstEven = numbers.find(num => num % 2 === 0);
console.log('First even:', firstEven); // 2

// Find its index
const evenIndex = numbers.findIndex(num => num % 2 === 0);
console.log('Index of first even:', evenIndex); // 2
""",

    "ARR008.js": r"""// For Loop Iteration
const nums = [1, 2, 3, 4, 5];
let sum = 0;
for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
}
console.log('Sum =', sum);
""",

    "ARR009.js": r"""// For...of Loop
const colors = ['red', 'green', 'blue'];
for (const color of colors) {
    console.log(color);
}
""",

    "ARR010.js": r"""// forEach Method
const fruits = ['apple', 'banana', 'cherry'];
fruits.forEach((fruit, index) => {
    console.log(`${index}: ${fruit}`);
});
""",

    "ARR011.js": r"""// Map Method
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(num => num * 2);
console.log('Doubled:', doubled);
""",

    "ARR012.js": r"""// Filter Method
const numbers = [1, 2, 3, 4, 5, 6];
const evens = numbers.filter(num => num % 2 === 0);
console.log('Evens:', evens);
""",

    "ARR013.js": r"""// Reduce Method
const numbers = [10, 20, 30, 40];
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log('Sum =', sum);
""",

    "ARR014.js": r"""// Combined Map and Filter
const numbers = [1, 2, 3, 4, 5, 6];
const evenSquares = numbers
    .filter(num => num % 2 === 0)
    .map(num => num * num);
console.log('Even squares:', evenSquares); // [4, 16, 36]
""",

    "ARR015.js": r"""// Array of Objects Manipulation
const users = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 17 },
    { name: 'Charlie', age: 20 }
];

const adults = users
    .filter(user => user.age > 18)
    .map(user => user.name);
console.log('Adults:', adults); // ['Alice', 'Charlie']
""",

    "ARR016.js": r"""// Remove Duplicates
function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
}

const numbers = [1, 2, 2, 3, 4, 4, 5];
const unique = removeDuplicates(numbers);
console.log('Unique:', unique); // [1, 2, 3, 4, 5]
""",

    "ARR017.js": r"""// Flatten Nested Arrays
function flatten(arr) {
    return arr.reduce((acc, curr) => acc.concat(curr), []);
}

const nested = [[1, 2], [3, 4], [5, 6]];
const flat = flatten(nested);
console.log('Flattened:', flat); // [1, 2, 3, 4, 5, 6]
""",

    "ARR018.js": r"""// Group By Property
const people = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 17 },
    { name: 'Charlie', age: 25 }
];

const grouped = people.reduce((acc, person) => {
    const age = person.age;
    if (!acc[age]) acc[age] = [];
    acc[age].push(person.name);
    return acc;
}, {});

console.log('Grouped by age:', grouped);
// { 25: ['Alice', 'Charlie'], 17: ['Bob'] }
""",

    "ARR019.js": r"""// Chaining Methods
const numbers = [5, 12, 8, 15, 3];

const result = numbers
    .filter(num => num > 10)
    .map(num => num * num)
    .reduce((sum, square) => sum + square, 0);

console.log('Sum of squares of numbers > 10:', result); // 144 + 225 = 369
""",

    "ARR020.js": r"""// Custom Sort
const people = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 17 },
    { name: 'Charlie', age: 20 }
];

people.sort((a, b) => a.age - b.age);
console.log('Sorted by age:', people);
// [{ name:'Bob', age:17 }, { name:'Charlie', age:20 }, { name:'Alice', age:25 }]
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
json_path = os.path.join(current_dir, "js-array-projects.json")
with open(json_path, "w", encoding="utf-8") as f:
    json.dump(js_projects, f, indent=2, ensure_ascii=False)

# Write each JavaScript file
for filename, content in js_files_content.items():
    file_path = os.path.join(answers_dir, filename)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

print(f"✅ Successfully created 'answers' folder with {len(js_files_content)} JS files and 'js-array-projects.json' (with explanations)")