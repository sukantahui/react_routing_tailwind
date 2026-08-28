const questions = [
  {
    question: "What are the roles of HTML, CSS, and JavaScript in web applications?",
    shortAnswer: "HTML provides structure, CSS handles styling and layout, and JavaScript provides dynamic behavior and logic.",
    explanation: "HTML builds the semantic document tree (DOM), CSS dictates presentation and responsiveness, and JavaScript manages state, user events, and asynchronous data updates.",
    hint: "Structure (HTML) + Style (CSS) + Behavior (JavaScript).",
    level: "basic",
    codeExample: "// HTML: <h1 id='title'>Hello</h1>\n// CSS: #title { color: #f59e0b; }\n// JS: document.getElementById('title').textContent = 'Welcome';"
  },
  {
    question: "What is the Critical Rendering Path (CRP)?",
    shortAnswer: "The sequence of steps the browser takes to parse HTML/CSS and paint pixels on screen.",
    explanation: "CRP consists of DOM construction -> CSSOM construction -> Render Tree creation -> Layout calculation -> Paint -> GPU Composite.",
    hint: "DOM + CSSOM -> Render Tree -> Layout -> Paint.",
    level: "intermediate",
    codeExample: "// Optimizing the CRP ensures First Contentful Paint (FCP) occurs under 1 second"
  },
  {
    question: "What is the difference between <script>, <script defer>, and <script async>?",
    shortAnswer: "Normal scripts block HTML parsing; defer executes after parsing in order; async executes the moment downloaded without order.",
    explanation: "Default scripts block parsing immediately. Defer downloads in parallel and executes after DOM parsing completes. Async downloads in parallel and executes immediately upon download.",
    hint: "Defer = in-order after DOM parse; Async = instant execution without order.",
    level: "intermediate",
    codeExample: "<!-- Preferred modern script tag -->\n<script src='app.js' defer></script>"
  },
  {
    question: "Why does placing scripts at the bottom of <body> or using 'defer' prevent errors?",
    shortAnswer: "It ensures the DOM elements already exist before the JavaScript code tries to access them.",
    explanation: "If a script runs in <head> without defer, document.getElementById() returns null, causing TypeError when attaching event listeners.",
    hint: "DOM elements must exist before JS querySelectors find them.",
    level: "basic",
    codeExample: "// Head without defer:\ndocument.getElementById('btn').onclick = ...; // TypeError: null has no properties"
  },
  {
    question: "What is Layout Thrashing (Forced Synchronous Layout)?",
    shortAnswer: "When JavaScript alternates reading and writing layout properties, forcing continuous costly browser reflows.",
    explanation: "Reading element.offsetHeight right after setting element.style.width forces the browser to synchronously recalculate layout on the spot, causing UI stutter.",
    hint: "Alternating DOM reads and DOM writes in a tight loop.",
    level: "advanced",
    codeExample: "// Bad: for (let el of items) { el.style.width = el.offsetWidth + 10 + 'px'; }"
  },
  {
    question: "How does DocumentFragment optimize DOM insertion performance?",
    shortAnswer: "It allows batching multiple DOM nodes off-screen and appending them in a single reflow operation.",
    explanation: "Appending 100 elements directly to the document triggers up to 100 reflows. Appending them to a DocumentFragment and inserting the fragment triggers only 1 reflow.",
    hint: "Off-screen DOM container that evaporates upon insertion.",
    level: "intermediate",
    codeExample: "const frag = document.createDocumentFragment();\nfrag.appendChild(el1);\nfrag.appendChild(el2);\nparent.appendChild(frag);"
  },
  {
    question: "What is the Render Tree in browser engine architecture?",
    shortAnswer: "The combination of DOM and CSSOM containing only visible elements that require layout and paint.",
    explanation: "Elements with display: none and <head> tags are excluded from the Render Tree because they do not occupy visual space or pixels.",
    hint: "Visible DOM nodes + matching CSSOM style rules.",
    level: "advanced",
    codeExample: "// display: none removes nodes from the Render Tree; visibility: hidden remains in Render Tree"
  },
  {
    question: "What is the difference between Reflow and Repaint?",
    shortAnswer: "Reflow recalculates geometry/layout; Repaint redraws colors/pixels without changing element dimensions.",
    explanation: "Changing width, margin, or font-size triggers Reflow + Repaint. Changing background-color or color triggers only Repaint (which is significantly cheaper).",
    hint: "Reflow = geometry change; Repaint = visual color/border change.",
    level: "intermediate",
    codeExample: "el.style.color = 'blue'; // Repaint only\nel.style.width = '200px'; // Reflow + Repaint"
  },
  {
    question: "How do CSS Custom Properties (Variables) interact with JavaScript?",
    shortAnswer: "JS can dynamically read and mutate CSS variables at runtime using getPropertyValue and setProperty.",
    explanation: "Mutating root CSS variables allows instantaneous, zero-reflow theme switching across entire web applications with pure CSS cascade reactivity.",
    hint: "document.documentElement.style.setProperty('--color', val).",
    level: "intermediate",
    codeExample: "document.documentElement.style.setProperty('--primary', '#38bdf8');"
  },
  {
    question: "What is the DOMContentLoaded event versus the window.onload event?",
    shortAnswer: "DOMContentLoaded fires when HTML/DOM is parsed; load fires after all images, styles, and subresources finish loading.",
    explanation: "DOMContentLoaded is ideal for initializing UI scripts quickly. Window load waits for all heavy external assets (images, stylesheets, iframes) to complete.",
    hint: "DOMContentLoaded = DOM ready; load = All images & assets ready.",
    level: "basic",
    codeExample: "document.addEventListener('DOMContentLoaded', () => console.log('DOM is ready!'));"
  },
  {
    question: "What is CSS Specificity and how does element.style override stylesheet rules?",
    shortAnswer: "Inline styles set by JS have a specificity score of (1,0,0,0), overriding IDs, classes, and tag selectors.",
    explanation: "To override an inline style from external CSS, the !important directive is required. Best practice is to toggle CSS class names rather than setting inline styles.",
    hint: "Inline JS style > ID selector > Class selector > Tag selector.",
    level: "intermediate",
    codeExample: "el.classList.add('active'); // Better than el.style.color = 'red'"
  },
  {
    question: "How do modern UI libraries (React/Vue) prevent manual DOM manipulation?",
    shortAnswer: "By maintaining state-driven declarative component trees that automatically reconcile and patch the DOM.",
    explanation: "Instead of manually writing getElementById and appendChild, developers update component state, and the framework updates the corresponding DOM nodes automatically.",
    hint: "UI = f(State). Frameworks handle DOM reconciliation.",
    level: "basic",
    codeExample: "const [count, setCount] = useState(0);\n// React reconciles DOM when count changes"
  },
  {
    question: "What is the transform and opacity CSS optimization for 60fps animations?",
    shortAnswer: "They trigger neither Reflow nor Repaint; the browser composites them directly on the GPU.",
    explanation: "Animating top/left triggers expensive Reflow on CPU main thread. Animating transform: translate() runs on GPU compositor thread, guaranteeing 60fps.",
    hint: "Animate transform and opacity for GPU hardware acceleration.",
    level: "advanced",
    codeExample: "/* 60fps hardware accelerated */\n.card { transform: translateY(-10px); transition: transform 0.3s; }"
  },
  {
    question: "What is the CSSOM (CSS Object Model)?",
    shortAnswer: "The browser's internal tree representation of CSS rules and computed selector styles.",
    explanation: "Like the DOM for HTML, the CSSOM maps all stylesheets, media queries, and rules to calculate the exact computed style for each element.",
    hint: "The tree structure of CSS rules used to style DOM elements.",
    level: "advanced",
    codeExample: "const computed = window.getComputedStyle(element);\nconsole.log(computed.backgroundColor);"
  },
  {
    question: "What is Event-Driven Architecture in the browser?",
    shortAnswer: "JavaScript registers listeners that react to user inputs, timers, or network responses asynchronously.",
    explanation: "The browser waits idle until an event (click, keydown, scroll, fetch response) is pushed to the event loop, triggering registered callback functions.",
    hint: "Publish/Subscribe event model between user and DOM.",
    level: "basic",
    codeExample: "window.addEventListener('resize', () => console.log('Viewport resized'));"
  },
  {
    question: "What is the difference between element.innerHTML and element.textContent?",
    shortAnswer: "innerHTML parses strings as HTML tags (security risk); textContent sets raw text safely without HTML parsing.",
    explanation: "textContent is faster, causes no HTML tokenization, and is immune to Cross-Site Scripting (XSS) attacks.",
    hint: "textContent = safe raw text; innerHTML = parsed HTML markup.",
    level: "basic",
    codeExample: "el.textContent = '<b>Not Bold</b>'; // Displays raw tag text safely"
  },
  {
    question: "What is the difference between visibility: hidden and display: none?",
    shortAnswer: "visibility: hidden retains physical layout space; display: none removes the element from the Render Tree completely.",
    explanation: "display: none triggers a reflow and paint when toggled. visibility: hidden triggers only a repaint because layout geometry remains identical.",
    hint: "display: none = no layout space; visibility: hidden = invisible but keeps space.",
    level: "basic",
    codeExample: "// display: none removes from Render Tree; visibility: hidden preserves box dimensions"
  },
  {
    question: "What are CSS Houdini Paint Worklets?",
    shortAnswer: "JavaScript code that hooks directly into the browser's native rendering engine to draw custom CSS backgrounds.",
    explanation: "Houdini APIs allow developers to extend CSS with custom procedural graphics and layouts executed directly on the render pipeline.",
    hint: "Custom procedural graphics running in the browser paint pipeline.",
    level: "expert",
    codeExample: "CSS.paintWorklet.addModule('my-paint-worklet.js');"
  },
  {
    question: "What is requestAnimationFrame and why is it preferred over setInterval for animations?",
    shortAnswer: "It synchronizes animation callbacks with the browser's native display refresh rate (typically 60Hz/120Hz).",
    explanation: "requestAnimationFrame automatically pauses when browser tabs are inactive, eliminating CPU waste and screen tearing associated with setInterval.",
    hint: "Synchronized with monitor V-Sync and display refresh cycle.",
    level: "advanced",
    codeExample: "function animate() {\n  updatePosition();\n  requestAnimationFrame(animate);\n}\nrequestAnimationFrame(animate);"
  },
  {
    question: "How does the 'async' attribute handle script dependency order?",
    shortAnswer: "It does not guarantee order; whichever script finishes downloading first executes first.",
    explanation: "If scriptB.js depends on scriptA.js and both are loaded with async, scriptB may execute before scriptA if it finishes downloading earlier, causing reference errors.",
    hint: "Async scripts execute out of order based on network download speed.",
    level: "intermediate",
    codeExample: "<!-- If script2 depends on script1, DO NOT use async! Use defer instead. -->"
  },
  {
    question: "What is the BEM (Block Element Modifier) CSS naming methodology in JS components?",
    shortAnswer: "A structured naming convention that creates modular, collision-free CSS class names (e.g. .card__title--active).",
    explanation: "BEM clarifies component relationships and prevents specificity wars when toggling modifier classes with JavaScript.",
    hint: "Block__Element--Modifier naming pattern.",
    level: "basic",
    codeExample: "card.classList.toggle('card__header--highlighted');"
  },
  {
    question: "What is CSS Modules / Scoped CSS in modern build tools?",
    shortAnswer: "Build-time tooling that generates unique hashed class names to guarantee zero CSS style leakage across components.",
    explanation: "Instead of global class names, Vite/Webpack hash classes (e.g. .title_a8f3b), allowing components to use simple class names without collisions.",
    hint: "Scoped component styles with build-time class name hashing.",
    level: "intermediate",
    codeExample: "import styles from './Card.module.css';\ncard.className = styles.header;"
  },
  {
    question: "What is a 'Pure CSS' vs 'JS-Driven' Animation tradeoff?",
    shortAnswer: "CSS animations are declarative and GPU-optimized; JS animations allow dynamic physics, spring math, and runtime interaction.",
    explanation: "Simple transitions should be handled by CSS for maximum frame rate; complex gesture-driven drag or canvas physics require JavaScript.",
    hint: "CSS = declarative GPU transitions; JS = complex stateful physics animations.",
    level: "intermediate",
    codeExample: "/* CSS handles simple hover transitions effortlessly */"
  },
  {
    question: "What is progressive enhancement versus graceful degradation?",
    shortAnswer: "Progressive enhancement starts with basic HTML/CSS and adds JS features; graceful degradation builds for modern JS with fallbacks.",
    explanation: "Progressive enhancement ensures all users have access to core content even if JavaScript fails or is disabled in the browser.",
    hint: "Build solid HTML/CSS base -> Enhance with JS superpowers.",
    level: "basic",
    codeExample: "// Functional HTML form works without JS; enhanced with AJAX when JS is active"
  },
  {
    question: "What is the Role of Accessibility (A11y) when JavaScript modifies the DOM?",
    shortAnswer: "JS must manage focus, keyboard navigation, and ARIA live regions so screen readers recognize dynamic updates.",
    explanation: "When injecting dynamic modals or error toasts, JavaScript must set aria-live, manage tabindex, and trap keyboard focus for assistive technologies.",
    hint: "Dynamic DOM updates must update ARIA attributes and focus state.",
    level: "advanced",
    codeExample: "el.setAttribute('aria-expanded', 'true');\nel.focus();"
  }
];

export default questions;
