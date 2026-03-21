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
    if "DOM Tree Explorer" in title:
        logic = (
            "The DOM (Document Object Model) represents the structure of an HTML document as a tree of nodes. "
            "Each element, attribute, and text becomes a node. Understanding this tree is key to dynamic web pages."
        )
        code_exp = (
            "This script logs the DOM tree structure. It recursively walks through the document, printing the tag name "
            "or text content of each node, showing the hierarchy."
        )
    elif "Select Elements Practice" in title:
        logic = (
            "To manipulate the DOM, you first need to select elements. `getElementById` selects by id, "
            "`querySelector` uses CSS selectors and returns the first match, while `querySelectorAll` returns a list."
        )
        code_exp = (
            "The code demonstrates how to select elements using various methods, then logs the selected elements "
            "to the console. It also shows how to get a collection and loop through it."
        )
    elif "Dynamic Content Changer" in title:
        logic = (
            "Once an element is selected, you can change its content and style. Use `textContent` or `innerHTML` for text, "
            "and `style` property for CSS. This allows real-time updates without reloading the page."
        )
        code_exp = (
            "This script picks elements and modifies their text, HTML, and CSS. It includes examples of changing colors, "
            "adding new content, and toggling visibility."
        )
    elif "Interactive To-Do List" in title:
        logic = (
            "Dynamic creation and removal of elements is essential for interactive UIs. You can use `createElement`, "
            "`appendChild`, `removeChild`, and newer methods like `append` and `remove`."
        )
        code_exp = (
            "A simple to-do list is implemented. The user can add tasks (creating elements), mark them complete, and delete them "
            "(removing elements). This demonstrates event handling and dynamic DOM updates."
        )
    elif "Attribute & Class Manipulator" in title:
        logic = (
            "Attributes, classes, and data attributes let you store extra information and apply styling. Use `getAttribute`, "
            "`setAttribute`, `classList` methods, and `dataset` to manipulate them."
        )
        code_exp = (
            "The script shows how to get and set attributes, add/remove/toggle CSS classes, and read/write custom data attributes. "
            "Buttons and inputs demonstrate each operation."
        )
    elif "Event Handling Demo" in title:
        logic = (
            "Events allow JavaScript to react to user actions. Common events include click, mouseover, keydown, etc. "
            "Event listeners can be attached to elements to trigger functions."
        )
        code_exp = (
            "This code demonstrates attaching event listeners to various elements. It shows click, mouseenter/mouseleave, "
            "and keypress events, logging messages and updating the UI accordingly."
        )
    elif "Form Input Tracker" in title:
        logic = (
            "Real‑time form tracking uses input events to capture user keystrokes and display them elsewhere. "
            "This is useful for previews or live validation."
        )
        code_exp = (
            "The script listens to the `input` event on a text field and displays the current value in another element, "
            "updating on every keystroke."
        )
    elif "Simple Image Slider" in title:
        logic = (
            "An image slider cycles through a set of images using next/previous buttons. It can also support automatic "
            "sliding. This uses array indexing and updating the `src` attribute of an image element."
        )
        code_exp = (
            "The code maintains an array of image URLs. On button clicks, it increments/decrements an index and updates "
            "the main image's `src`. It also updates the caption."
        )
    elif "Modal Dialog" in title:
        logic = (
            "A modal is a dialog box that appears on top of the page, disabling background interaction. It is typically "
            "hidden until triggered, and can be closed by a button or clicking outside."
        )
        code_exp = (
            "The script shows/hides a modal overlay by toggling CSS classes. It includes an open button, a close button, "
            "and an optional click outside the modal content to close."
        )
    elif "Accordion Component" in title:
        logic = (
            "An accordion consists of collapsible sections. Clicking a header expands or collapses its associated content. "
            "This improves space usage and user experience."
        )
        code_exp = (
            "The code selects all accordion headers. On header click, it toggles the visibility of the corresponding content "
            "and optionally closes other open sections for a typical accordion behaviour."
        )
    elif "Responsive Hamburger Menu" in title:
        logic = (
            "A hamburger menu is a common pattern for mobile navigation. Clicking the icon toggles the visibility of a "
            "navigation menu, often using CSS transforms or max-height transitions."
        )
        code_exp = (
            "The script adds a click listener to the hamburger icon. It toggles a class on the navigation menu that "
            "controls its display or height, making it responsive."
        )
    elif "Sortable List" in title:
        logic = (
            "Sortable lists allow users to reorder items by dragging and dropping. This can be implemented using the "
            "HTML5 Drag and Drop API or with mouse events."
        )
        code_exp = (
            "This code uses the HTML5 Drag and Drop API. Each list item has `draggable=true`. Events like `dragstart`, "
            "`dragover`, and `drop` are handled to rearrange items in the list."
        )
    elif "Local Storage Notes App" in title:
        logic = (
            "Local storage allows saving data in the browser persistently. A notes app can store notes as strings, "
            "retrieve them on page load, and update when notes are added or removed."
        )
        code_exp = (
            "The script loads notes from localStorage on page load. Users can add, edit, and delete notes; each change "
            "saves the updated array back to localStorage. The notes are dynamically rendered as list items."
        )
    elif "Infinite Scroll" in title:
        logic = (
            "Infinite scroll loads more content as the user scrolls near the bottom. It detects scroll position and fetches "
            "additional items (here simulated with fake data)."
        )
        code_exp = (
            "The code listens to the window's scroll event. When scroll position is near the bottom, it calls a function "
            "to append new items to the container, simulating an API call."
        )
    elif "Dynamic Table Generator" in title:
        logic = (
            "Dynamic table generation creates HTML tables from JavaScript data. It is useful for displaying structured "
            "data like CSV, JSON, or database results."
        )
        code_exp = (
            "This script builds a table element from an array of objects. It creates the `<table>`, `<thead>`, and `<tbody>`, "
            "populates rows and cells, and appends it to the DOM."
        )
    elif "Form Validation" in title:
        logic = (
            "Form validation checks user input before submission. It can validate required fields, email format, password "
            "strength, and provide immediate feedback."
        )
        code_exp = (
            "The code adds event listeners to form fields and the submit button. It validates each field (e.g., email regex, "
            "password length) and displays error messages, preventing submission if invalid."
        )
    elif "Tabbed Interface" in title:
        logic = (
            "Tabs allow switching between different content panels without reloading the page. Each tab button hides its "
            "corresponding content and shows the selected one."
        )
        code_exp = (
            "The script attaches click handlers to tab buttons. It removes an 'active' class from all content panels and "
            "adds it to the one associated with the clicked tab."
        )
    elif "Search Filter" in title:
        logic = (
            "A search filter dynamically shows/hides list items based on user input. It can be used for search boxes, "
            "filtering product lists, etc."
        )
        code_exp = (
            "The code listens to the input event on a search box. For each list item, it compares the item's text with "
            "the search term (case‑insensitive) and toggles the `display` style."
        )
    elif "Countdown Timer" in title:
        logic = (
            "A countdown timer uses `setInterval` to decrement time and update the display. It should stop when reaching zero "
            "and optionally trigger a callback."
        )
        code_exp = (
            "The script gets the target time (or seconds from input) and starts an interval that updates the display every second. "
            "When time runs out, it clears the interval and shows a message."
        )
    elif "Custom Tooltip" in title:
        logic = (
            "Tooltips provide additional information on hover. A custom tooltip can be created by showing/hiding a div "
            "near the cursor or target element using mouse events."
        )
        code_exp = (
            "The code selects elements with a `data-tooltip` attribute. On mouseenter, it creates or shows a tooltip element "
            "with the attribute's text, positions it, and on mouseleave hides/destroys it."
        )
    else:
        logic = f"General DOM manipulation project covering {title}."
        code_exp = f"The JavaScript code implements {title} as described in the example."

    return logic, code_exp


# ============================================
# JavaScript project data (20 projects)
# ============================================
js_projects = {
    "projectCategory": "JavaScript DOM Manipulation – 20 Practical Projects",
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
            "projectId": "JS001",
            "title": "DOM Tree Explorer",
            "difficulty": "Beginner",
            "description": "Write a function that logs the entire DOM tree structure starting from the document root, showing each element's tag name and text content.",
            "exampleText": "Open any webpage and run the script in the console.",
            "exampleOutput": "A nested tree of nodes printed to the console.",
            "answerFile": "./answers/JS001.js",
            "learningOutcome": "Understand the DOM hierarchy, recursion, node traversal."
        },
        {
            "projectId": "JS002",
            "title": "Select Elements Practice",
            "difficulty": "Beginner",
            "description": "Create an HTML page with various elements (id, class, attributes). Write JavaScript to select and log these elements using getElementById, querySelector, and querySelectorAll.",
            "exampleText": "HTML: <div id='main'>Hello</div> <p class='info'>Text</p>",
            "exampleOutput": "Console shows selected elements.",
            "answerFile": "./answers/JS002.js",
            "learningOutcome": "Using different selection methods, understanding NodeList vs HTMLCollection."
        },
        {
            "projectId": "JS003",
            "title": "Dynamic Content Changer",
            "difficulty": "Beginner",
            "description": "Write a script that changes the text, HTML, and styles of selected elements when a button is clicked.",
            "exampleText": "Button click triggers changes.",
            "exampleOutput": "The content and style of elements update dynamically.",
            "answerFile": "./answers/JS003.js",
            "learningOutcome": "Manipulating innerHTML, textContent, and CSS properties via JavaScript."
        },
        {
            "projectId": "JS004",
            "title": "Interactive To-Do List",
            "difficulty": "Intermediate",
            "description": "Build a to-do list where users can add new tasks, mark them as completed, and delete them. Use DOM creation and removal methods.",
            "exampleText": "Input field + Add button; each task has complete and delete buttons.",
            "exampleOutput": "Tasks appear and can be managed interactively.",
            "answerFile": "./answers/JS004.js",
            "learningOutcome": "Creating elements dynamically, event delegation, removing elements."
        },
        {
            "projectId": "JS005",
            "title": "Attribute & Class Manipulator",
            "difficulty": "Intermediate",
            "description": "Create a set of buttons that demonstrate how to get/set attributes, toggle classes, and read/write data attributes on an element.",
            "exampleText": "A div with attributes and classes; buttons to modify them.",
            "exampleOutput": "The div's appearance and attributes change on button clicks.",
            "answerFile": "./answers/JS005.js",
            "learningOutcome": "Using getAttribute, setAttribute, classList, dataset."
        },
        {
            "projectId": "JS006",
            "title": "Event Handling Demo",
            "difficulty": "Beginner",
            "description": "Create a page with several elements (button, div, input) and attach event handlers for click, mouseover, and keypress events. Show messages in a console or on screen.",
            "exampleText": "Click the button, hover over a div, type in input.",
            "exampleOutput": "Console logs or on-screen messages appear indicating which event fired.",
            "answerFile": "./answers/JS006.js",
            "learningOutcome": "Adding event listeners, event object, handling different event types."
        },
        {
            "projectId": "JS007",
            "title": "Form Input Tracker",
            "difficulty": "Beginner",
            "description": "Create a form with an input field and a paragraph. As the user types, display the current input value in the paragraph (live preview).",
            "exampleText": "Type something in the input field.",
            "exampleOutput": "The paragraph updates in real time with the same text.",
            "answerFile": "./answers/JS007.js",
            "learningOutcome": "Using the input event, updating DOM on every keystroke."
        },
        {
            "projectId": "JS008",
            "title": "Simple Image Slider",
            "difficulty": "Intermediate",
            "description": "Build an image slider with previous/next buttons. Display an image, its caption, and allow navigation through a set of images.",
            "exampleText": "Click 'Next' or 'Previous' to cycle through images.",
            "exampleOutput": "The main image and caption change accordingly.",
            "answerFile": "./answers/JS008.js",
            "learningOutcome": "Array indexing, updating image src and text, event handling."
        },
        {
            "projectId": "JS009",
            "title": "Modal Dialog",
            "difficulty": "Intermediate",
            "description": "Create a modal dialog that appears when a button is clicked, and can be closed via a close button or clicking outside the modal.",
            "exampleText": "Click 'Open Modal', then close it.",
            "exampleOutput": "A centered modal appears/disappears.",
            "answerFile": "./answers/JS009.js",
            "learningOutcome": "CSS display toggling, event propagation, overlay handling."
        },
        {
            "projectId": "JS010",
            "title": "Accordion Component",
            "difficulty": "Intermediate",
            "description": "Build an accordion with at least three sections. Each section has a header; clicking a header expands its content and collapses others.",
            "exampleText": "Click on section headers.",
            "exampleOutput": "Only one content panel is visible at a time.",
            "answerFile": "./answers/JS010.js",
            "learningOutcome": "Element selection, sibling traversal, toggling classes."
        },
        {
            "projectId": "JS011",
            "title": "Responsive Hamburger Menu",
            "difficulty": "Intermediate",
            "description": "Create a responsive navigation bar that collapses into a hamburger icon on small screens. Clicking the icon toggles the menu visibility.",
            "exampleText": "Resize browser window and click the hamburger icon.",
            "exampleOutput": "Menu expands/collapses when icon is clicked.",
            "answerFile": "./answers/JS011.js",
            "learningOutcome": "CSS media queries, class toggling, responsive design."
        },
        {
            "projectId": "JS012",
            "title": "Sortable List",
            "difficulty": "Expert",
            "description": "Implement a drag-and-drop reorderable list. Allow users to rearrange list items by dragging and dropping them.",
            "exampleText": "Drag items in the list.",
            "exampleOutput": "Items can be moved to different positions.",
            "answerFile": "./answers/JS012.js",
            "learningOutcome": "HTML5 Drag and Drop API, event handling, DOM manipulation."
        },
        {
            "projectId": "JS013",
            "title": "Local Storage Notes App",
            "difficulty": "Intermediate",
            "description": "Build a simple notes app where users can add, edit, and delete notes. All notes should be saved to localStorage so they persist after page reload.",
            "exampleText": "Add a note, refresh the page.",
            "exampleOutput": "The note still appears after refresh.",
            "answerFile": "./answers/JS013.js",
            "learningOutcome": "localStorage, JSON parsing/stringifying, CRUD operations."
        },
        {
            "projectId": "JS014",
            "title": "Infinite Scroll",
            "difficulty": "Expert",
            "description": "Create a page that loads more items (e.g., cards) as the user scrolls near the bottom. Use fake data or fetch from a simulated API.",
            "exampleText": "Scroll to the bottom of the page.",
            "exampleOutput": "New items are appended dynamically.",
            "answerFile": "./answers/JS014.js",
            "learningOutcome": "Scroll event, debouncing, dynamic content loading."
        },
        {
            "projectId": "JS015",
            "title": "Dynamic Table Generator",
            "difficulty": "Intermediate",
            "description": "Given an array of objects (e.g., students with name, age, grade), generate an HTML table dynamically and display it on the page.",
            "exampleText": "Use the provided data (or input).",
            "exampleOutput": "A table with headers and rows appears.",
            "answerFile": "./answers/JS015.js",
            "learningOutcome": "Creating tables dynamically, innerHTML vs createElement."
        },
        {
            "projectId": "JS016",
            "title": "Form Validation",
            "difficulty": "Intermediate",
            "description": "Create a registration form with fields: name, email, password, confirm password. Validate on submit and show error messages. Prevent submission if invalid.",
            "exampleText": "Fill and submit the form.",
            "exampleOutput": "Error messages appear for invalid fields; if valid, an alert or success message is shown.",
            "answerFile": "./answers/JS016.js",
            "learningOutcome": "Form validation, regex, event.preventDefault, error display."
        },
        {
            "projectId": "JS017",
            "title": "Tabbed Interface",
            "difficulty": "Intermediate",
            "description": "Create a tab component with at least three tabs. Clicking a tab shows its content and hides the others.",
            "exampleText": "Click different tab buttons.",
            "exampleOutput": "Only the content of the selected tab is visible.",
            "answerFile": "./answers/JS017.js",
            "learningOutcome": "CSS class switching, managing multiple content panels."
        },
        {
            "projectId": "JS018",
            "title": "Search Filter",
            "difficulty": "Beginner",
            "description": "Create a search box that filters a list of items as the user types. Only items containing the search term should remain visible.",
            "exampleText": "Type a word in the search box.",
            "exampleOutput": "The list updates in real time, showing only matching items.",
            "answerFile": "./answers/JS018.js",
            "learningOutcome": "Input event, filtering arrays, toggling display."
        },
        {
            "projectId": "JS019",
            "title": "Countdown Timer",
            "difficulty": "Intermediate",
            "description": "Create a countdown timer where the user can set minutes/seconds, start, pause, and reset. Display the remaining time and play an alert when finished.",
            "exampleText": "Set 1 minute, start the timer.",
            "exampleOutput": "Timer counts down to zero, then alerts.",
            "answerFile": "./answers/JS019.js",
            "learningOutcome": "setInterval/clearInterval, state management, user input handling."
        },
        {
            "projectId": "JS020",
            "title": "Custom Tooltip",
            "difficulty": "Intermediate",
            "description": "Create a custom tooltip that appears when hovering over elements with a data-tooltip attribute. The tooltip should follow the mouse or be positioned near the element.",
            "exampleText": "Hover over any element with a data-tooltip attribute.",
            "exampleOutput": "A tooltip appears with the attribute's text.",
            "answerFile": "./answers/JS020.js",
            "learningOutcome": "Mouse events, dynamic element creation and removal, positioning."
        }
    ]
}


# ============================================
# JavaScript code for each project (JS001.js .. JS020.js)
# ============================================
js_files_content = {
    "JS001.js": r"""// DOM Tree Explorer
function printDOMTree(node, indent = '') {
    if (node.nodeType === Node.ELEMENT_NODE) {
        console.log(indent + node.tagName.toLowerCase());
        for (let i = 0; i < node.children.length; i++) {
            printDOMTree(node.children[i], indent + '  ');
        }
    } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
        console.log(indent + '"' + node.textContent.trim() + '"');
    }
}

// Start from document body (or document.documentElement for full HTML)
console.log('DOM Tree:');
printDOMTree(document.body);
""",

    "JS002.js": r"""// Select Elements Practice
// Assume the HTML contains:
// <div id="main">Hello</div>
// <p class="info">First info</p>
// <p class="info">Second info</p>
// <div data-custom="example">Data attribute</div>

// getElementById
const mainDiv = document.getElementById('main');
console.log('getElementById:', mainDiv);

// querySelector (first match)
const firstInfo = document.querySelector('.info');
console.log('querySelector (.info):', firstInfo);

// querySelectorAll (NodeList)
const allInfos = document.querySelectorAll('.info');
console.log('querySelectorAll (.info) count:', allInfos.length);
allInfos.forEach((p, idx) => console.log(`  Info ${idx+1}:`, p));

// querySelector by attribute
const dataDiv = document.querySelector('[data-custom]');
console.log('querySelector ([data-custom]):', dataDiv);
""",

    "JS003.js": r"""// Dynamic Content Changer
// HTML: <div id="target">Original text</div>
// <button id="changeBtn">Change Me</button>

const target = document.getElementById('target');
const button = document.getElementById('changeBtn');

button.addEventListener('click', () => {
    // Change text
    target.textContent = 'Text has been changed!';
    
    // Change HTML (add an emoji)
    target.innerHTML = '<strong>New!</strong> ✨';
    
    // Change style
    target.style.backgroundColor = 'lightblue';
    target.style.padding = '10px';
    target.style.borderRadius = '5px';
    
    // Toggle a class for fun
    target.classList.toggle('highlight');
});
""",

    "JS004.js": r"""// Interactive To-Do List
// HTML: <input id="taskInput" type="text" placeholder="New task">
// <button id="addBtn">Add</button>
// <ul id="taskList"></ul>

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

function addTask() {
    const text = taskInput.value.trim();
    if (text === '') return;

    // Create new list item
    const li = document.createElement('li');
    li.textContent = text;

    // Complete button
    const completeBtn = document.createElement('button');
    completeBtn.textContent = '✔';
    completeBtn.style.marginLeft = '10px';
    completeBtn.addEventListener('click', () => {
        li.classList.toggle('completed');
    });

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✖';
    deleteBtn.style.marginLeft = '5px';
    deleteBtn.addEventListener('click', () => {
        li.remove();
    });

    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    taskInput.value = '';
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});
""",

    "JS005.js": r"""// Attribute & Class Manipulator
// HTML: <div id="demo" class="box" data-info="initial">Demo Div</div>
// Buttons: Set Attribute, Get Attribute, Add Class, Remove Class, Toggle Class, Read Data

const demo = document.getElementById('demo');

// Get attribute
function showAttr() {
    const attr = demo.getAttribute('data-info');
    alert('data-info = ' + attr);
}

// Set attribute
function setAttr() {
    const newVal = prompt('Enter new value for data-info:');
    if (newVal) demo.setAttribute('data-info', newVal);
}

// Add class
function addClass() {
    demo.classList.add('highlight');
}

// Remove class
function removeClass() {
    demo.classList.remove('highlight');
}

// Toggle class
function toggleClass() {
    demo.classList.toggle('highlight');
}

// Read data attribute using dataset
function readData() {
    const info = demo.dataset.info;
    alert('Dataset info = ' + info);
}

// Attach to buttons (assuming they exist in HTML)
document.getElementById('getAttrBtn')?.addEventListener('click', showAttr);
document.getElementById('setAttrBtn')?.addEventListener('click', setAttr);
document.getElementById('addClassBtn')?.addEventListener('click', addClass);
document.getElementById('removeClassBtn')?.addEventListener('click', removeClass);
document.getElementById('toggleClassBtn')?.addEventListener('click', toggleClass);
document.getElementById('readDataBtn')?.addEventListener('click', readData);
""",

    "JS006.js": r"""// Event Handling Demo
// HTML: <button id="clickBtn">Click me</button>
// <div id="hoverDiv" style="width:200px; height:100px; background:gray;">Hover over me</div>
// <input id="keyInput" placeholder="Type something">

const clickBtn = document.getElementById('clickBtn');
const hoverDiv = document.getElementById('hoverDiv');
const keyInput = document.getElementById('keyInput');

clickBtn.addEventListener('click', () => {
    console.log('Button clicked!');
    alert('Button clicked!');
});

hoverDiv.addEventListener('mouseenter', () => {
    console.log('Mouse entered the div');
    hoverDiv.style.backgroundColor = 'lightblue';
});
hoverDiv.addEventListener('mouseleave', () => {
    console.log('Mouse left the div');
    hoverDiv.style.backgroundColor = 'gray';
});

keyInput.addEventListener('keypress', (e) => {
    console.log(`Key pressed: ${e.key}`);
    // Optional: display on page
});
""",

    "JS007.js": r"""// Form Input Tracker
// HTML: <input id="trackInput" type="text" placeholder="Type something">
// <p id="displayText">Your text will appear here</p>

const trackInput = document.getElementById('trackInput');
const displayText = document.getElementById('displayText');

trackInput.addEventListener('input', () => {
    displayText.textContent = trackInput.value || 'Your text will appear here';
});
""",

    "JS008.js": r"""// Simple Image Slider
// HTML: <div class="slider">
//   <img id="sliderImage" src="image1.jpg" alt="Image">
//   <p id="caption">Caption 1</p>
//   <button id="prevBtn">Prev</button>
//   <button id="nextBtn">Next</button>
// </div>

const images = [
    { src: 'image1.jpg', caption: 'Beautiful Sunset' },
    { src: 'image2.jpg', caption: 'Mountain View' },
    { src: 'image3.jpg', caption: 'Ocean Waves' }
];

let currentIndex = 0;
const imgElement = document.getElementById('sliderImage');
const captionElement = document.getElementById('caption');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function updateSlider() {
    imgElement.src = images[currentIndex].src;
    captionElement.textContent = images[currentIndex].caption;
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlider();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlider();
});

updateSlider(); // initial
""",

    "JS009.js": r"""// Modal Dialog
// HTML: <button id="openModalBtn">Open Modal</button>
// <div id="modal" class="modal">
//   <div class="modal-content">
//     <span class="close">&times;</span>
//     <p>Modal content goes here!</p>
//   </div>
// </div>

const modal = document.getElementById('modal');
const openBtn = document.getElementById('openModalBtn');
const closeSpan = document.querySelector('.close');

openBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeSpan.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
""",

    "JS010.js": r"""// Accordion Component
// HTML: <div class="accordion">
//   <div class="accordion-item">
//     <div class="accordion-header">Section 1</div>
//     <div class="accordion-content">Content 1...</div>
//   </div>
//   ... more items
// </div>

const headers = document.querySelectorAll('.accordion-header');
headers.forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const isActive = content.classList.contains('active');
        
        // Optional: close all other items
        document.querySelectorAll('.accordion-content').forEach(c => {
            if (c !== content) c.classList.remove('active');
        });
        
        // Toggle current
        content.classList.toggle('active');
    });
});
""",

    "JS011.js": r"""// Responsive Hamburger Menu
// HTML: <nav class="navbar">
//   <div class="hamburger">&#9776;</div>
//   <ul class="nav-links">
//     <li><a href="#">Home</a></li>
//     <li><a href="#">About</a></li>
//     <li><a href="#">Contact</a></li>
//   </ul>
// </nav>
// CSS: .nav-links { display: flex; } @media (max-width:768px){ .nav-links { display: none; } .nav-links.active { display: flex; } }

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
""",

    "JS012.js": r"""// Sortable List (Drag and Drop)
// HTML: <ul id="sortableList">
//   <li draggable="true">Item 1</li>
//   <li draggable="true">Item 2</li>
//   <li draggable="true">Item 3</li>
// </ul>

const list = document.getElementById('sortableList');
let dragSrcElement = null;

function handleDragStart(e) {
    dragSrcElement = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleDrop(e) {
    e.preventDefault();
    if (dragSrcElement !== this) {
        dragSrcElement.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
    }
    return false;
}

const items = list.querySelectorAll('li');
items.forEach(item => {
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragover', handleDragOver);
    item.addEventListener('drop', handleDrop);
});
""",

    "JS013.js": r"""// Local Storage Notes App
// HTML: <div class="notes-app">
//   <input id="noteInput" type="text" placeholder="Add a note">
//   <button id="addNoteBtn">Add</button>
//   <ul id="notesList"></ul>
// </div>

const noteInput = document.getElementById('noteInput');
const addBtn = document.getElementById('addNoteBtn');
const notesList = document.getElementById('notesList');

let notes = [];

function loadNotes() {
    const stored = localStorage.getItem('notes');
    if (stored) {
        notes = JSON.parse(stored);
        renderNotes();
    }
}

function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function renderNotes() {
    notesList.innerHTML = '';
    notes.forEach((note, index) => {
        const li = document.createElement('li');
        li.textContent = note;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            notes.splice(index, 1);
            saveNotes();
            renderNotes();
        });
        li.appendChild(deleteBtn);
        notesList.appendChild(li);
    });
}

addBtn.addEventListener('click', () => {
    const text = noteInput.value.trim();
    if (text) {
        notes.push(text);
        saveNotes();
        renderNotes();
        noteInput.value = '';
    }
});

loadNotes();
""",

    "JS014.js": r"""// Infinite Scroll
// HTML: <div id="contentContainer"></div>

const container = document.getElementById('contentContainer');
let page = 1;
let loading = false;

function loadMore() {
    if (loading) return;
    loading = true;
    // Simulate async fetch
    setTimeout(() => {
        for (let i = 0; i < 10; i++) {
            const item = document.createElement('div');
            item.textContent = `Item ${page * 10 + i}`;
            container.appendChild(item);
        }
        page++;
        loading = false;
    }, 500);
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        loadMore();
    }
});

loadMore(); // initial
""",

    "JS015.js": r"""// Dynamic Table Generator
// HTML: <div id="tableContainer"></div>

const data = [
    { name: 'Alice', age: 25, grade: 'A' },
    { name: 'Bob', age: 22, grade: 'B' },
    { name: 'Charlie', age: 28, grade: 'C' }
];

function generateTable(data) {
    const table = document.createElement('table');
    table.border = '1';
    // header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    Object.keys(data[0]).forEach(key => {
        const th = document.createElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
    // body
    const tbody = document.createElement('tbody');
    data.forEach(row => {
        const tr = document.createElement('tr');
        Object.values(row).forEach(val => {
            const td = document.createElement('td');
            td.textContent = val;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    return table;
}

const container = document.getElementById('tableContainer');
container.appendChild(generateTable(data));
""",

    "JS016.js": r"""// Form Validation
// HTML: <form id="regForm">
//   <input id="name" placeholder="Name" required>
//   <input id="email" placeholder="Email" type="email">
//   <input id="password" placeholder="Password" type="password">
//   <input id="confirm" placeholder="Confirm Password" type="password">
//   <button type="submit">Register</button>
// </form>
// <div id="errorMessages"></div>

const form = document.getElementById('regForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm');
const errorDiv = document.getElementById('errorMessages');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const errors = [];
    
    if (nameInput.value.trim() === '') errors.push('Name is required');
    
    const email = emailInput.value.trim();
    if (email === '') errors.push('Email is required');
    else if (!/^\S+@\S+\.\S+$/.test(email)) errors.push('Invalid email format');
    
    const pwd = passwordInput.value;
    if (pwd.length < 6) errors.push('Password must be at least 6 characters');
    if (pwd !== confirmInput.value) errors.push('Passwords do not match');
    
    if (errors.length > 0) {
        errorDiv.innerHTML = errors.map(e => `<p style="color:red">${e}</p>`).join('');
    } else {
        errorDiv.innerHTML = '<p style="color:green">Form submitted successfully!</p>';
        // form.submit(); // uncomment to actually submit
    }
});
""",

    "JS017.js": r"""// Tabbed Interface
// HTML: <div class="tabs">
//   <button class="tab-btn active" data-tab="tab1">Tab 1</button>
//   <button class="tab-btn" data-tab="tab2">Tab 2</button>
//   <button class="tab-btn" data-tab="tab3">Tab 3</button>
// </div>
// <div class="tab-content active" id="tab1">Content 1</div>
// <div class="tab-content" id="tab2">Content 2</div>
// <div class="tab-content" id="tab3">Content 3</div>

const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        // remove active from all buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        // add active to current
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});
""",

    "JS018.js": r"""// Search Filter
// HTML: <input id="searchInput" type="text" placeholder="Search...">
// <ul id="itemList">
//   <li>Apple</li><li>Banana</li><li>Orange</li><li>Grapes</li>
// </ul>

const searchInput = document.getElementById('searchInput');
const items = document.querySelectorAll('#itemList li');

searchInput.addEventListener('input', () => {
    const term = searchInput.value.toLowerCase();
    items.forEach(item => {
        if (item.textContent.toLowerCase().includes(term)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
});
""",

    "JS019.js": r"""// Countdown Timer
// HTML: <input id="minutes" type="number" placeholder="Minutes">
// <input id="seconds" type="number" placeholder="Seconds">
// <button id="startBtn">Start</button>
// <button id="pauseBtn">Pause</button>
// <button id="resetBtn">Reset</button>
// <div id="timerDisplay">00:00</div>

let timerInterval = null;
let remainingSeconds = 0;
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const timerDisplay = document.getElementById('timerDisplay');

function updateDisplay() {
    const mins = Math.floor(remainingSeconds / 60);
    const secs = remainingSeconds % 60;
    timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    if (remainingSeconds <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        alert('Time is up!');
    }
}

function startTimer() {
    if (timerInterval) return;
    if (remainingSeconds <= 0) {
        const mins = parseInt(minutesInput.value) || 0;
        const secs = parseInt(secondsInput.value) || 0;
        remainingSeconds = mins * 60 + secs;
        if (remainingSeconds <= 0) return;
        updateDisplay();
    }
    timerInterval = setInterval(() => {
        if (remainingSeconds > 0) {
            remainingSeconds--;
            updateDisplay();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }, 1000);
}

function pauseTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    remainingSeconds = 0;
    updateDisplay();
    minutesInput.value = '';
    secondsInput.value = '';
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
""",

    "JS020.js": r"""// Custom Tooltip
// HTML: <div data-tooltip="This is a tooltip">Hover over me</div>
// <button data-tooltip="Click here for help">Help</button>

let tooltip = null;

function showTooltip(event) {
    const target = event.target;
    const text = target.getAttribute('data-tooltip');
    if (!text) return;
    
    if (tooltip) tooltip.remove();
    tooltip = document.createElement('div');
    tooltip.textContent = text;
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = 'black';
    tooltip.style.color = 'white';
    tooltip.style.padding = '5px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.fontSize = '12px';
    tooltip.style.zIndex = '1000';
    document.body.appendChild(tooltip);
    
    const rect = target.getBoundingClientRect();
    tooltip.style.left = rect.left + window.scrollX + 'px';
    tooltip.style.top = rect.top + window.scrollY - tooltip.offsetHeight - 5 + 'px';
}

function hideTooltip() {
    if (tooltip) {
        tooltip.remove();
        tooltip = null;
    }
}

const tooltipElements = document.querySelectorAll('[data-tooltip]');
tooltipElements.forEach(el => {
    el.addEventListener('mouseenter', showTooltip);
    el.addEventListener('mouseleave', hideTooltip);
});
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
json_path = os.path.join(current_dir, "js-dom-projects.json")
with open(json_path, "w", encoding="utf-8") as f:
    json.dump(js_projects, f, indent=2, ensure_ascii=False)

# Write each JavaScript file
for filename, content in js_files_content.items():
    file_path = os.path.join(answers_dir, filename)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

print(f"✅ Successfully created 'answers' folder with {len(js_files_content)} JS files and 'js-dom-projects.json' (with explanations)")