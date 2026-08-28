const questions = [
  {
    question: "Why should developers use a local HTTP server like Live Server instead of opening files directly via file:/// protocol?",
    shortAnswer: "Live Server provides a valid HTTP origin required for Fetch API, ES Modules, Service Workers, and WebSocket live reload.",
    explanation: "Opening files via file:/// assigns a null origin, triggering browser CORS security blocks whenever scripts attempt to fetch data or import ES modules.",
    hint: "file:// blocks CORS and ES module imports; http:// allows full Web API access.",
    level: "basic",
    codeExample: "// file:///path/index.html -> Fetch fails with CORS error\n// http://127.0.0.1:5500/index.html -> Fetch succeeds!"
  },
  {
    question: "What is Visual Studio Code (VS Code) and why is it preferred for JavaScript development?",
    shortAnswer: "VS Code is a lightweight, extensible open-source editor with native JavaScript/TypeScript IntelliSense and debugging.",
    explanation: "Created by Microsoft, VS Code integrates an interactive terminal, Git version control, rich extensions (ESLint, Prettier, Live Server), and V8 debugging.",
    hint: "Microsoft open-source IDE with built-in JS IntelliSense and extension ecosystem.",
    level: "basic",
    codeExample: "// VS Code features automatic parameter hints and code completions"
  },
  {
    question: "How does the Live Server extension work under the hood?",
    shortAnswer: "It starts a local Node.js HTTP server and injects a WebSocket script into served HTML for automatic page reloads.",
    explanation: "When you save a file in VS Code, Live Server detects the change on disk and broadcasts a reload signal over the WebSocket connection to the browser.",
    hint: "Local HTTP server + WebSocket reload signal on file save.",
    level: "intermediate",
    codeExample: "<!-- Live Server injects this WebSocket reload snippet automatically -->"
  },
  {
    question: "What is the difference between Prettier and ESLint?",
    shortAnswer: "Prettier handles code formatting (style, indentation); ESLint analyzes code quality and catches bugs/anti-patterns.",
    explanation: "Prettier reformats code on save (semicolons, single vs double quotes). ESLint enforces syntax rules (no unused variables, no-var, strict equality).",
    hint: "Prettier = formatting aesthetics; ESLint = code correctness & bug prevention.",
    level: "basic",
    codeExample: "// ESLint warning: 'let x = 10' (never reassigned, use const instead)"
  },
  {
    question: "How do you open DevTools in modern web browsers?",
    shortAnswer: "Press F12, or press Ctrl + Shift + I (Windows/Linux) or Cmd + Option + I (macOS).",
    explanation: "Right-clicking anywhere on a webpage and selecting 'Inspect' also opens DevTools directly focused on that specific DOM element.",
    hint: "F12 or Ctrl + Shift + I.",
    level: "basic",
    codeExample: "// Opens Elements, Console, Sources, Network, and Memory tabs"
  },
  {
    question: "What is the function of the DevTools Console tab?",
    shortAnswer: "It serves as an interactive REPL to evaluate JavaScript expressions and view console output and runtime errors.",
    explanation: "Developers use the Console tab to execute ad-hoc code, inspect live object memory references, test functions, and diagnose script exceptions.",
    hint: "Read-Eval-Print-Loop (REPL) sandbox inside the browser.",
    level: "basic",
    codeExample: "console.log('Testing from DevTools Console');"
  },
  {
    question: "What is the function of the DevTools Network tab?",
    shortAnswer: "It monitors all incoming and outgoing network requests (HTML, CSS, JS, images, API calls) and their latency.",
    explanation: "The Network tab displays HTTP status codes (200, 404, 500), payload headers, response bodies, file sizes, and waterfall load timings.",
    hint: "Inspects HTTP requests, response headers, status codes, and latency waterfalls.",
    level: "intermediate",
    codeExample: "// Inspect fetch('/api/users') status code and JSON payload"
  },
  {
    question: "What is the function of the DevTools Sources tab?",
    shortAnswer: "It allows developers to view source files, set breakpoints, step through execution, and inspect scope variables.",
    explanation: "In the Sources tab, you can click on line numbers to pause execution at breakpoints, inspect Call Stack frames, and watch variable values change live.",
    hint: "Source code viewer, breakpoint manager, and step-through debugger.",
    level: "intermediate",
    codeExample: "// Setting a breakpoint pauses execution before the line runs"
  },
  {
    question: "What is a Hard Refresh (Ctrl + Shift + R) and why is it useful?",
    shortAnswer: "It forces the browser to bypass its local cache and re-download fresh HTML, CSS, and JS files from the server.",
    explanation: "During development, browsers often cache old script files. A hard refresh guarantees you are executing the exact latest code saved on disk.",
    hint: "Bypasses browser cache to fetch fresh script files.",
    level: "basic",
    codeExample: "// Shortcut: Ctrl + Shift + R (Windows) or Cmd + Shift + R (Mac)"
  },
  {
    question: "What are DevTools Local Overrides?",
    shortAnswer: "A feature allowing developers to edit JS/CSS files inside DevTools and persist the changes across page refreshes.",
    explanation: "DevTools saves your modified files into a selected local folder on your hard drive, allowing live debugging and prototyping without switching back to VS Code.",
    hint: "Persists browser DevTools edits to a local disk folder.",
    level: "advanced",
    codeExample: "// Sources tab -> Overrides -> Select folder for local persistence"
  },
  {
    question: "What is the purpose of the .vscode/settings.json file in a team repository?",
    shortAnswer: "It enforces identical editor configurations (tab spacing, format on save, linters) for all developers on the project.",
    explanation: "Committing workspace settings prevents git diff noise caused by different team members using conflicting tab sizes or formatting rules.",
    hint: "Repository-level VS Code editor configuration.",
    level: "intermediate",
    codeExample: "{\n  "editor.tabSize": 2,\n  "editor.formatOnSave": true\n}"
  },
  {
    question: "What is Node.js and why is it needed in a frontend developer environment?",
    shortAnswer: "Node.js runs modern development toolchains: package managers (npm/pnpm), bundlers (Vite), and linters (ESLint).",
    explanation: "Even for purely client-side web development, Node.js powers development servers, transpilers (Babel/SWC), CSS preprocessors (Tailwind), and build pipelines.",
    hint: "Runtime engine powering npm, Vite, bundlers, and dev servers.",
    level: "intermediate",
    codeExample: "// $ npm install -D vite tailwindcss eslint"
  },
  {
    question: "What is npm (Node Package Manager)?",
    shortAnswer: "The default package manager and online registry for sharing and installing reusable JavaScript libraries.",
    explanation: "npm manages dependencies specified in package.json, allowing developers to install libraries (React, Lodash, Tailwind) with a single CLI command.",
    hint: "Dependency manager and package ecosystem for JavaScript.",
    level: "basic",
    codeExample: "// $ npm install lodash-es"
  },
  {
    question: "What is Emmet in VS Code?",
    shortAnswer: "A built-in productivity tool that expands shorthand CSS-like abbreviations into full HTML/CSS structures.",
    explanation: "Typing '!' and pressing Tab creates an HTML5 document skeleton. Typing 'ul>li*3' generates an unordered list with three list items instantly.",
    hint: "Shorthand syntax expansion for rapid HTML and CSS authoring.",
    level: "basic",
    codeExample: "// 'ul>li.item*3' expands to <ul> with 3 <li class='item'> tags"
  },
  {
    question: "What is the integrated terminal in VS Code?",
    shortAnswer: "A built-in command-line interface inside the editor running PowerShell, Bash, or Zsh.",
    explanation: "Opened via Ctrl + ~ (backtick), it lets developers run Git commands, npm scripts, and dev servers without switching between windows.",
    hint: "Ctrl + tilde (backtick) opens the terminal directly inside VS Code.",
    level: "basic",
    codeExample: "// Shortcut: Ctrl + tilde (backtick)"
  },
  {
    question: "How do you inspect mobile responsive layouts using Chrome DevTools?",
    shortAnswer: "Click the 'Toggle Device Toolbar' icon (Ctrl + Shift + M) to simulate mobile viewports and touch gestures.",
    explanation: "Device Mode allows testing viewport dimensions (iPhone, iPad, Pixel), throttling network speeds (3G/4G), and simulating CPU throttling.",
    hint: "Ctrl + Shift + M activates mobile device emulation.",
    level: "basic",
    codeExample: "// Simulates mobile screens, touch events, and slow 3G cellular networks"
  },
  {
    question: "What is the difference between 127.0.0.1 and localhost?",
    shortAnswer: "127.0.0.1 is the IPv4 loopback IP address; localhost is the domain name mapped to that loopback IP.",
    explanation: "Both point to your local machine, but localhost requires a DNS hosts file lookup, whereas 127.0.0.1 connects directly via IP.",
    hint: "127.0.0.1 = direct loopback IP; localhost = hostname alias.",
    level: "intermediate",
    codeExample: "// http://localhost:5500 and http://127.0.0.1:5500 connect to same local server"
  },
  {
    question: "What is the DevTools Lighthouse tab used for?",
    shortAnswer: "An automated audit tool that benchmarks Performance, Accessibility (A11y), Best Practices, and SEO.",
    explanation: "Lighthouse generates detailed scores (0-100) and actionable recommendations to optimize Core Web Vitals, page speed, and semantic markup.",
    hint: "Automated audit tool for Performance, SEO, and Accessibility.",
    level: "intermediate",
    codeExample: "// Generates a performance report card with Core Web Vitals metrics"
  },
  {
    question: "How does the 'Disable Cache' checkbox in the DevTools Network tab help during development?",
    shortAnswer: "It prevents the browser from loading cached assets as long as DevTools remains open.",
    explanation: "Checking this box guarantees every script and stylesheet is fetched fresh from the server on every reload while debugging.",
    hint: "Forces fresh asset downloads while DevTools is open.",
    level: "basic",
    codeExample: "// Network tab -> Check 'Disable Cache'"
  },
  {
    question: "What is Git integration in VS Code?",
    shortAnswer: "Built-in visual Source Control interface for staging, committing, branching, and pushing code to GitHub.",
    explanation: "VS Code highlights added, modified, and deleted lines in the gutter and provides side-by-side diff views for resolving merge conflicts.",
    hint: "Source Control panel on the left sidebar.",
    level: "basic",
    codeExample: "// Visual Git commit, branch, and diff viewer"
  },
  {
    question: "What is an .editorconfig file?",
    shortAnswer: "A cross-IDE configuration file defining coding styles (indent size, charset, end-of-line) across different text editors.",
    explanation: "Helps maintain consistent styling between developers using VS Code, Sublime Text, WebStorm, or Vim on the same project.",
    hint: "Cross-editor standard configuration file.",
    level: "intermediate",
    codeExample: "[*]\nindent_style = space\nindent_size = 2\nend_of_line = lf"
  },
  {
    question: "What is the DevTools Application / Storage tab used for?",
    shortAnswer: "Inspecting and modifying client-side storage: LocalStorage, SessionStorage, IndexedDB, Cookies, and Cache Storage.",
    explanation: "Developers can view stored JSON keys, clear cookies, test storage quotas, and inspect Service Worker registration statuses.",
    hint: "Manages LocalStorage, Cookies, IndexedDB, and Service Workers.",
    level: "intermediate",
    codeExample: "// Clear site data or inspect active JWT tokens in LocalStorage"
  },
  {
    question: "What is the purpose of JavaScript Source Maps (.map files)?",
    shortAnswer: "Maps minified/transpiled production code back to original human-readable source files for debugging in DevTools.",
    explanation: "When code is bundled with Vite or Babel, Source Maps allow DevTools to show exact line numbers and variables in your original TypeScript/ES6 files.",
    hint: "Translates minified bundle lines back to original source code in DevTools.",
    level: "advanced",
    codeExample: "//# sourceMappingURL=bundle.js.map"
  },
  {
    question: "How do you debug asynchronous code with async/await in VS Code debugger?",
    shortAnswer: "Set a breakpoint inside the async function and use 'Step Over' (F10) to trace promise resolution linearly.",
    explanation: "The VS Code debugger pauses before the await expression and resumes at the next line once the promise fulfills, making async debugging intuitive.",
    hint: "Set breakpoint -> F10 Step Over through await expressions.",
    level: "advanced",
    codeExample: "async function load() {\n  const res = await fetch(url); // Breakpoint pauses here\n  const data = await res.json();\n}"
  },
  {
    question: "What are Keyboard Shortcuts in VS Code that 10x developer productivity?",
    shortAnswer: "Ctrl+P (Quick Open file), Ctrl+Shift+F (Global Search), Alt+Up/Down (Move line), Ctrl+D (Multi-select word).",
    explanation: "Mastering editor navigation shortcuts eliminates repetitive mouse movements and accelerates code editing and refactoring.",
    hint: "Ctrl+P (open file), Ctrl+D (multi-cursor), Alt+Arrows (move line).",
    level: "basic",
    codeExample: "// Multi-cursor editing with Ctrl+D saves hours of refactoring time"
  }
];

export default questions;
