const questions = [
  {
    question: "What is the primary role of JavaScript in the frontend web triad?",
    shortAnswer: "JavaScript provides behavior, dynamic interactivity, and logic, while HTML gives structure and CSS gives presentation.",
    explanation: "HTML creates the semantic DOM hierarchy, CSS styles visual layouts, and JavaScript handles user events, state mutations, asynchronous API requests, and dynamic DOM updates.",
    hint: "Structure (HTML) + Style (CSS) + Behavior (JS).",
    level: "basic",
    codeExample: "// HTML: <button id='btn'>Click</button>\ndocument.getElementById('btn').onclick = () => alert('Clicked!');"
  },
  {
    question: "What is a Single Page Application (SPA)?",
    shortAnswer: "A web application that loads a single HTML page and dynamically updates content without full-page reloads.",
    explanation: "SPAs intercept link clicks, use client-side routing (History API) to change the view, and fetch lightweight JSON data via AJAX/Fetch, resulting in desktop-like fluidity.",
    hint: "Single initial HTML load + client-side routing and DOM updates.",
    level: "basic",
    codeExample: "window.history.pushState({}, '', '/dashboard');\n// Render dashboard component dynamically"
  },
  {
    question: "How did AJAX transform web user experience in the early 2000s?",
    shortAnswer: "It allowed browsers to exchange data with servers in the background without reloading the webpage.",
    explanation: "Introduced via XMLHttpRequest (and now modern Fetch API), AJAX enabled instant search suggestions, real-time feeds, and interactive maps without white-screen page refreshes.",
    hint: "Asynchronous JavaScript and XML = background data loading.",
    level: "basic",
    codeExample: "fetch('/api/data').then(res => res.json()).then(data => console.log(data));"
  },
  {
    question: "What is the difference between client-side rendering (CSR) and server-side rendering (SSR)?",
    shortAnswer: "CSR generates HTML in the browser using JS; SSR renders HTML on the server and delivers ready content to the browser.",
    explanation: "CSR sends an empty HTML shell and large JS bundle, rendering UI on client device. SSR generates full HTML on the server for faster First Contentful Paint (FCP) and optimal SEO.",
    hint: "CSR = browser builds DOM; SSR = server sends pre-built HTML.",
    level: "intermediate",
    codeExample: "// Next.js SSR executes server-side, returning fully rendered HTML markup"
  },
  {
    question: "What is DOM Hydration in modern full-stack frameworks?",
    shortAnswer: "Hydration is the process of attaching JavaScript event listeners and reactive state to pre-rendered server HTML.",
    explanation: "When server-rendered HTML arrives, it is static. Hydration runs client-side JS to bind event handlers, initialize virtual DOM trees, and activate interactive state.",
    hint: "Making static server HTML interactive with client JS.",
    level: "intermediate",
    codeExample: "// React: hydrateRoot(document.getElementById('root'), <App />);"
  },
  {
    question: "What is Progressive Web App (PWA) architecture?",
    shortAnswer: "PWAs use Service Workers, Web App Manifests, and caching to provide offline-capable, app-like web experiences.",
    explanation: "PWAs can be installed on home screens, work without internet connectivity via Cache Storage API, and receive background push notifications.",
    hint: "Web app + Service Worker caching + Installable manifest.",
    level: "intermediate",
    codeExample: "navigator.serviceWorker.register('/sw.js').then(() => console.log('PWA active'));"
  },
  {
    question: "Why should sensitive credentials never be placed in client-side JavaScript?",
    shortAnswer: "Because client JS executes on user machines and can be inspected, extracted, or tampered with in DevTools.",
    explanation: "All code, variables, and network calls delivered to browsers are fully readable in DevTools Sources and Network tabs. Private keys must remain secure on backend servers.",
    hint: "Client code is public; private secrets must stay on the server.",
    level: "basic",
    codeExample: "// ❌ NEVER DO THIS:\nconst STRIPE_SECRET_KEY = 'sk_live_12345'; // Exposed to all users!"
  },
  {
    question: "How does JavaScript manage state in complex enterprise web applications?",
    shortAnswer: "Through centralized stores (Redux, Zustand, Signals) enforcing unidirectional data flow and reactive re-renders.",
    explanation: "Unidirectional data flow ensures UI is a pure projection of state. Actions dispatch state updates, and subscribed components re-render predictably.",
    hint: "Action → State Mutation → Reactive UI Re-render.",
    level: "advanced",
    codeExample: "const store = { state: { count: 0 }, set(fn) { this.state = fn(this.state); } };"
  },
  {
    question: "What is Cross-Site Scripting (XSS) and how does modern JS mitigate it?",
    shortAnswer: "XSS is code injection where attackers execute malicious scripts in victims' browsers; mitigated by sanitizing inputs and using textContent.",
    explanation: "Directly setting element.innerHTML with untrusted user input can execute attacker scripts. Using textContent, DOMPurify, and Content Security Policy (CSP) prevents XSS.",
    hint: "Use textContent instead of innerHTML for untrusted strings.",
    level: "advanced",
    codeExample: "const el = document.createElement('div');\nel.textContent = userInput; // 100% safe against XSS injection"
  },
  {
    question: "What is WebAssembly (WASM) and how does it collaborate with JavaScript?",
    shortAnswer: "WASM is a binary instruction format allowing C++/Rust code to run in browsers alongside JavaScript at near-native speed.",
    explanation: "JavaScript orchestrates the DOM and UI, while WASM handles compute-heavy workloads like 3D gaming, video transcoding, physics simulations, and client-side AI.",
    hint: "JS manages UI/DOM; WASM accelerates heavy math/computation.",
    level: "expert",
    codeExample: "WebAssembly.instantiateStreaming(fetch('module.wasm')).then(obj => obj.instance.exports.fastMath());"
  },
  {
    question: "What is the purpose of the Shadow DOM in Web Components?",
    shortAnswer: "Shadow DOM provides encapsulated DOM trees and scoped CSS styles isolated from the main document.",
    explanation: "It prevents global CSS rules and querySelectors from leaking into or altering custom component internals, creating reusable, bulletproof widgets.",
    hint: "Scoped styles + isolated DOM tree inside custom elements.",
    level: "advanced",
    codeExample: "const shadow = customElement.attachShadow({ mode: 'closed' });\nshadow.innerHTML = '<style>p{color:red}</style><p>Scoped</p>';"
  },
  {
    question: "What is WebSockets and how does it differ from traditional HTTP in JS?",
    shortAnswer: "WebSockets provide persistent, full-duplex, bidirectional communication channels over a single TCP connection.",
    explanation: "HTTP requires client request-response cycles. WebSockets allow servers to push real-time updates (chat, stock tickers, collaborative whiteboards) instantly to clients.",
    hint: "HTTP = request/response; WebSocket = continuous two-way stream.",
    level: "intermediate",
    codeExample: "const socket = new WebSocket('wss://api.coder.com/stream');\nsocket.onmessage = (e) => console.log('Live data:', e.data);"
  },
  {
    question: "What is the 'Same-Origin Policy' (SOP) in browser JavaScript?",
    shortAnswer: "A core security mechanism that restricts scripts on one origin from accessing data on another origin.",
    explanation: "Origin is defined as protocol + domain + port. SOP prevents a malicious site on evil.com from reading banking cookies or fetching private data from mybank.com.",
    hint: "Same Protocol + Same Host + Same Port.",
    level: "intermediate",
    codeExample: "// Fetching cross-origin requires CORS headers from the remote server"
  },
  {
    question: "What is CORS (Cross-Origin Resource Sharing)?",
    shortAnswer: "An HTTP-header-based mechanism allowing servers to specify which external origins can access their resources.",
    explanation: "When a browser makes a cross-origin fetch, the server responds with Access-Control-Allow-Origin headers. If permitted, browser JS receives the response.",
    hint: "Access-Control-Allow-Origin header configures cross-origin access.",
    level: "intermediate",
    codeExample: "// Server header: Access-Control-Allow-Origin: *"
  },
  {
    question: "What is the Critical Rendering Path (CRP) in web browsers?",
    shortAnswer: "The sequence of steps browsers take to convert HTML, CSS, and JS into visible screen pixels.",
    explanation: "CRP involves parsing HTML to DOM, CSS to CSSOM, combining into Render Tree, calculating Layout coordinates (Reflow), and Painting pixels.",
    hint: "DOM + CSSOM → Render Tree → Layout → Paint → Composite.",
    level: "advanced",
    codeExample: "// Minimizing DOM mutations reduces reflows and improves 60fps frame rate"
  },
  {
    question: "How do Web Workers prevent CPU-intensive JavaScript from freezing UI animations?",
    shortAnswer: "Web Workers run scripts on background OS threads completely separate from the main browser UI thread.",
    explanation: "Because the main thread handles user clicks and 60fps paints, running heavy loops on a Web Worker ensures the user interface remains silky smooth.",
    hint: "Main thread = UI/DOM; Worker thread = Heavy background computation.",
    level: "advanced",
    codeExample: "const worker = new Worker('heavy-calc.js');\nworker.postMessage({ data: [1, 2, 3] });\nworker.onmessage = (e) => console.log('Result:', e.data);"
  },
  {
    question: "What is Tree-Shaking in modern JavaScript bundlers (Vite/Rollup)?",
    shortAnswer: "Dead code elimination that removes unused exports from the final production bundle.",
    explanation: "By relying on static ES Module syntax (import/export), bundlers analyze the dependency graph and discard unreferenced functions, shrinking bundle size.",
    hint: "Eliminates unused code during production build.",
    level: "advanced",
    codeExample: "import { usedFunction } from './utils'; // unusedFunction in utils.js is tree-shaken away"
  },
  {
    question: "What is the Virtual DOM and why do libraries like React use it?",
    shortAnswer: "An in-memory lightweight representation of the real DOM used to batch and minimize costly browser reflows.",
    explanation: "Mutating the real DOM triggers layout recalculations. Virtual DOM diffing (Reconciliation) computes minimal patch sets and applies updates in batches.",
    hint: "Lightweight in-memory DOM tree → Diffing → Batched real DOM patch.",
    level: "intermediate",
    codeExample: "const vNode = { type: 'h1', props: { className: 'title' }, children: 'Hello' };"
  },
  {
    question: "What is Client-Side Routing and how does HTML5 History API enable it?",
    shortAnswer: "Navigating between views by updating URL via history.pushState() without triggering full server page reloads.",
    explanation: "history.pushState() and window.onpopstate allow JavaScript to change the browser URL and history stack, rendering corresponding UI components instantaneously.",
    hint: "history.pushState() changes URL; JS renders matching route view.",
    level: "intermediate",
    codeExample: "window.history.pushState({ page: 2 }, 'Page 2', '/page2');"
  },
  {
    question: "What is Micro-Frontend architecture in enterprise JavaScript?",
    shortAnswer: "An architectural style where independently deliverable frontend apps are composed into a unified host shell.",
    explanation: "Similar to backend microservices, large frontend codebases are split across domain teams (e.g. Cart, Checkout, Profile), using Module Federation to load dynamically.",
    hint: "Independent frontend apps loaded into one unified web platform.",
    level: "expert",
    codeExample: "// Webpack / Vite Module Federation enables dynamic remote module imports"
  },
  {
    question: "What are Server-Sent Events (SSE) and when are they preferred over WebSockets?",
    shortAnswer: "A unidirectional persistent HTTP connection where servers push real-time text events to clients with auto-reconnect.",
    explanation: "SSE is simpler than WebSockets for one-way streams (stock feeds, AI LLM token streaming, notifications) because it uses standard HTTP with native EventSource API.",
    hint: "SSE = Server-to-Client stream over standard HTTP.",
    level: "advanced",
    codeExample: "const sse = new EventSource('/stream');\nsse.onmessage = (e) => console.log('Token:', e.data);"
  },
  {
    question: "What is the role of JavaScript in Mobile App development via React Native?",
    shortAnswer: "JS drives application logic and state, communicating across a bridge/JSI to invoke native iOS and Android UI widgets.",
    explanation: "Instead of running in a webview, React Native uses the JavaScript engine (Hermes) to control native platform views (UIView on iOS, android.view.View on Android).",
    hint: "JS logic controls 100% native platform mobile UI components.",
    level: "intermediate",
    codeExample: "// React Native JSX renders real native platform UI widgets"
  },
  {
    question: "What is Desktop Application development with JavaScript (Electron / Tauri)?",
    shortAnswer: "Packaging web technologies (HTML, CSS, JS) with desktop runtime bindings to create cross-platform desktop software.",
    explanation: "Electron bundles Chromium and Node.js (used by VS Code, Slack, Discord). Tauri pairs webview frontends with lightweight Rust backends for minimal memory footprint.",
    hint: "Web technologies + Native OS windowing wrapper = Desktop App.",
    level: "intermediate",
    codeExample: "// VS Code is built entirely with TypeScript, JavaScript, and Electron!"
  },
  {
    question: "What is Cross-Site Request Forgery (CSRF) and how is it prevented in modern web apps?",
    shortAnswer: "An attack that tricks authenticated users into submitting unwanted commands; mitigated by SameSite cookies and CSRF tokens.",
    explanation: "Using SameSite=Lax/Strict cookie attributes prevents browsers from automatically attaching session cookies to cross-origin requests, blocking CSRF attempts.",
    hint: "SameSite cookies + Anti-CSRF tokens in custom headers.",
    level: "advanced",
    codeExample: "// Set-Cookie: session=123; SameSite=Strict; Secure; HttpOnly"
  },
  {
    question: "How does JavaScript enable real-time collaborative applications like Google Docs or Figma?",
    shortAnswer: "Using WebSockets/WebRTC combined with CRDTs (Conflict-Free Replicated Data Types) or Operational Transformation (OT).",
    explanation: "Clients broadcast keystroke operations via WebSockets; OT algorithms or CRDT data structures resolve concurrent multi-user edits deterministically without conflicts.",
    hint: "WebSockets + CRDT / Operational Transformation algorithms.",
    level: "expert",
    codeExample: "// Collaborative state syncs automatically across remote clients"
  }
];

export default questions;
