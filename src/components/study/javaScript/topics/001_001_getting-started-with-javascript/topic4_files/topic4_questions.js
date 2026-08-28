const questions = [
  {
    question: "What are the four primary ways to execute JavaScript?",
    shortAnswer: "1. DevTools Console, 2. Inline <script>, 3. External .js file, 4. ES Modules (<script type='module'>).",
    explanation: "DevTools is used for testing; inline scripts embed code in HTML; external scripts provide caching and maintainability; ES Modules offer scoped imports/exports.",
    hint: "Console, inline tags, external files, and ES module scripts.",
    level: "basic",
    codeExample: "<script src='app.js'></script>\n<script type='module' src='main.js'></script>"
  },
  {
    question: "Why are external JavaScript files preferred over inline scripts?",
    shortAnswer: "They allow browser caching, clean separation of concerns, and reuse across multiple pages.",
    explanation: "External scripts can be minified, bundled, and cached by browsers and CDNs, reducing bandwidth and boosting page load speeds across multiple page visits.",
    hint: "Browser caching, cleaner HTML, and cross-page reusability.",
    level: "basic",
    codeExample: "<script src='bundle.js' defer></script>"
  },
  {
    question: "How does <script type='module'> differ from a standard <script> tag?",
    shortAnswer: "Modules have their own lexical scope, use strict mode by default, support import/export, and defer automatically.",
    explanation: "Unlike classic scripts that leak variables to window, top-level variables in an ES module are private to that module. They are also deferred by default.",
    hint: "Scoped variables, strict mode by default, and automatic defer.",
    level: "intermediate",
    codeExample: "<script type='module'>\n  import { init } from './app.js';\n  init();\n</script>"
  },
  {
    question: "What does the browser DevTools Console REPL stand for?",
    shortAnswer: "Read-Eval-Print-Loop: Reads input, evaluates code, prints output, loops for next command.",
    explanation: "The Console REPL executes single or multi-line JavaScript statements within the active page's execution context, allowing instant testing.",
    hint: "Read -> Eval -> Print -> Loop.",
    level: "basic",
    codeExample: "// Type in DevTools console: 10 + 20 -> Outputs 30"
  },
  {
    question: "What is the 'nomodule' attribute used for on script tags?",
    shortAnswer: "It serves as a fallback script for legacy browsers that do not support modern ES modules.",
    explanation: "Modern browsers ignore scripts with nomodule and execute type='module'. Older browsers ignore type='module' and execute the nomodule fallback.",
    hint: "Fallback mechanism for legacy browsers without ES module support.",
    level: "intermediate",
    codeExample: "<script type='module' src='modern.js'></script>\n<script nomodule src='legacy-fallback.js'></script>"
  },
  {
    question: "What is dynamic import() and when should you use it?",
    shortAnswer: "An asynchronous function that loads JavaScript modules on demand at runtime returning a Promise.",
    explanation: "Dynamic imports allow code-splitting, lazy-loading heavy components or charts only when a user clicks a button or navigates to a specific route.",
    hint: "Lazy-loading modules at runtime via Promise-based import().",
    level: "advanced",
    codeExample: "const module = await import('./heavyChart.js');\nmodule.renderChart();"
  },
  {
    question: "What is the global scope pollution problem with classic scripts?",
    shortAnswer: "Variables declared with 'var' or function declarations attach directly to window, causing naming collisions.",
    explanation: "If two independent third-party scripts declare var config = {}, the second script overwrites the first. ES Modules and closures solve this problem.",
    hint: "Global window property collisions caused by var and top-level functions.",
    level: "intermediate",
    codeExample: "// Classic script:\nvar username = 'Swadeep';\nconsole.log(window.username); // 'Swadeep' (Pollutes global window!)"
  },
  {
    question: "What is the purpose of the 'crossorigin' attribute on script tags?",
    shortAnswer: "Configures CORS credentials when loading external scripts from third-party CDNs.",
    explanation: "Adding crossorigin='anonymous' allows error logging in window.onerror with complete stack traces instead of generic 'Script error'.",
    hint: "Enables detailed error traces for third-party CDN scripts.",
    level: "advanced",
    codeExample: "<script src='https://cdn.example.com/lib.js' crossorigin='anonymous'></script>"
  },
  {
    question: "What is Subresource Integrity (SRI) in script tags?",
    shortAnswer: "A security feature that verifies the cryptographic hash of a CDN script before executing it.",
    explanation: "SRI uses the integrity attribute (e.g. integrity='sha384-...') to ensure that if a CDN is compromised, modified malicious code is blocked from running.",
    hint: "Cryptographic hash verification for external CDN scripts.",
    level: "advanced",
    codeExample: "<script src='lib.js' integrity='sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC' crossorigin='anonymous'></script>"
  },
  {
    question: "How does the browser evaluate multi-line code in DevTools Console?",
    shortAnswer: "Press Shift + Enter to create a new line without executing; press Enter on the final line to execute.",
    explanation: "Shift + Enter inserts a physical newline character, allowing developers to write complete multi-line functions, loops, and object literals.",
    hint: "Shift + Enter for newlines; Enter to execute.",
    level: "basic",
    codeExample: "// Shift + Enter creates clean multi-line code blocks in DevTools Console"
  },
  {
    question: "What is the difference between synchronous script execution and asynchronous script execution?",
    shortAnswer: "Synchronous halts HTML parsing until script completes; asynchronous downloads in background without pausing parsing.",
    explanation: "Synchronous scripts block the UI thread during download and execution. Asynchronous scripts (defer/async) permit continuous rendering.",
    hint: "Sync blocks HTML parser; async downloads in parallel.",
    level: "basic",
    codeExample: "<script src='app.js'></script> <!-- Sync -->\n<script src='app.js' defer></script> <!-- Async download -->"
  },
  {
    question: "How can JavaScript inject another script dynamically at runtime?",
    shortAnswer: "By creating a <script> DOM element, setting its src, and appending it to document.head.",
    explanation: "Dynamic script injection is used by analytics tools, ad networks, and polyfills to load resources conditionally on the fly.",
    hint: "document.createElement('script') -> appendChild(head).",
    level: "intermediate",
    codeExample: "const s = document.createElement('script');\ns.src = 'widget.js';\ndocument.head.appendChild(s);"
  },
  {
    question: "What is the $_ variable in Chrome DevTools Console?",
    shortAnswer: "A magic variable that returns the evaluated result of the previous console expression.",
    explanation: "If you run 25 * 4 (output 100), running $_ + 50 in the next console line yields 150 without re-typing.",
    hint: "$_ evaluates to the last returned console result.",
    level: "intermediate",
    codeExample: "> 25 * 4\n< 100\n> $_ + 50\n< 150"
  },
  {
    question: "What is the $0 variable in Chrome DevTools Console?",
    shortAnswer: "A magic variable referencing the currently selected DOM node in the Elements panel.",
    explanation: "Clicking an element in the Elements tab and typing $0.style.color = 'red' in the Console mutates that specific element immediately.",
    hint: "$0 points to the currently inspected DOM element.",
    level: "basic",
    codeExample: "> $0.textContent = 'Updated via $0';"
  },
  {
    question: "What is the 'clear()' command in DevTools Console?",
    shortAnswer: "A utility function that clears all accumulated logs and outputs from the console panel.",
    explanation: "Typing clear() or pressing Ctrl + L (Windows) / Cmd + K (Mac) clears the console screen.",
    hint: "clear() or Ctrl + L clears the console.",
    level: "basic",
    codeExample: "> clear(); // Clears all console messages"
  },
  {
    question: "What happens if an external script tag has a syntax error?",
    shortAnswer: "The engine fails to compile that specific script, throws a SyntaxError, and continues parsing the rest of HTML.",
    explanation: "Syntax errors prevent that single script file from executing. Other independent scripts loaded separately will still attempt execution.",
    hint: "Compilation fails for that file; SyntaxError is logged.",
    level: "intermediate",
    codeExample: "// SyntaxError in file1.js does not prevent file2.js from executing"
  },
  {
    question: "How do you detect if a script is running inside a Web Worker or main thread?",
    shortAnswer: "Check if typeof window === 'undefined' and typeof importScripts === 'function'.",
    explanation: "Web Workers do not have access to the window object or DOM, but they do have self and WorkerGlobalScope.",
    hint: "Web Workers lack window and document objects.",
    level: "advanced",
    codeExample: "const isWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;"
  },
  {
    question: "What is the purpose of document.currentScript?",
    shortAnswer: "Returns the <script> element whose script is currently being processed by the browser.",
    explanation: "Useful for scripts that need to inspect their own data attributes (e.g. data-api-key) or identify their host CDN URL dynamically.",
    hint: "References the currently executing <script> tag.",
    level: "advanced",
    codeExample: "const apiKey = document.currentScript.getAttribute('data-api-key');"
  },
  {
    question: "What is the difference between IIFE and ES Modules for code privacy?",
    shortAnswer: "IIFE uses function closures to hide variables; ES Modules have native file-level lexical scope isolation.",
    explanation: "Before ES6, IIFE was the only way to avoid global scope pollution. ES Modules provide cleaner, standardized file-level encapsulation natively.",
    hint: "IIFE = function closure scope; ES Module = native file scope.",
    level: "intermediate",
    codeExample: "(function() { var secret = 1; })(); // IIFE\n// vs ES Module: const secret = 1; (Private to file)"
  },
  {
    question: "What is Content Security Policy (CSP) and how does it restrict script execution?",
    shortAnswer: "An HTTP header that restricts which script sources, CDNs, and inline scripts are permitted to run in the browser.",
    explanation: "CSP mitigates XSS by blocking unauthorized inline <script> tags and disallowing eval() unless explicit nonces or hashes are provided.",
    hint: "HTTP header defining whitelisted script execution domains.",
    level: "expert",
    codeExample: "// Header: Content-Security-Policy: script-src 'self' https://trusted-cdn.com"
  },
  {
    question: "What is code minification and how does it impact script loading performance?",
    shortAnswer: "Removing whitespace, comments, and shortening variable names to reduce file download size over the network.",
    explanation: "Minified files (e.g. app.min.js) are up to 70% smaller, resulting in faster download times and reduced mobile cellular data consumption.",
    hint: "Shrinks file size by stripping whitespace and mangling identifiers.",
    level: "basic",
    codeExample: "// function add(a,b){return a+b} (Minified)"
  },
  {
    question: "What is Gzip / Brotli compression for JavaScript assets?",
    shortAnswer: "HTTP server-level byte compression algorithms that shrink script transfers by up to 80%.",
    explanation: "The web server compresses .js files into Brotli (.br) or Gzip (.gz), and the browser decompresses them automatically upon receipt.",
    hint: "Server-to-client HTTP byte compression.",
    level: "intermediate",
    codeExample: "// Content-Encoding: br (Brotli compression)"
  },
  {
    question: "How do modern build tools like Vite bundle JavaScript scripts for production?",
    shortAnswer: "They tree-shake unused code, transpile modern syntax, bundle modules, and inject content-hashed filenames.",
    explanation: "Vite outputs production assets with content hashes (e.g. app-8f3a1.js) to enable immutable long-term browser cache headers.",
    hint: "Tree-shaking + bundling + content-hashed cache busting.",
    level: "advanced",
    codeExample: "<!-- Built asset: <script src='/assets/app-9a7b2.js'></script> -->"
  },
  {
    question: "What happens when you pass a function to window.onerror?",
    shortAnswer: "It registers a global exception handler that catches uncaught runtime errors across the entire webpage.",
    explanation: "window.onerror receives the error message, source URL, line number, column number, and error object, allowing automated error tracking.",
    hint: "Global error logging hook in browser.",
    level: "advanced",
    codeExample: "window.onerror = (msg, url, line) => console.log('Global Error:', msg, line);"
  },
  {
    question: "What is the unhandledrejection event in browser JavaScript?",
    shortAnswer: "An event fired when a JavaScript Promise is rejected without an attached .catch() handler.",
    explanation: "Listening for unhandledrejection prevents silent async failures and allows developers to log unhandled Promise errors to monitoring servers.",
    hint: "Catches unhandled Promise rejections globally.",
    level: "advanced",
    codeExample: "window.addEventListener('unhandledrejection', (e) => console.error('Unhandled Promise:', e.reason));"
  }
];

export default questions;
