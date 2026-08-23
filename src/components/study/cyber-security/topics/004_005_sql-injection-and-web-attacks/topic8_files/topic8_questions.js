const questions = [
  {
    question: "What is 'Cross-Site Request Forgery' (CSRF), and why is 'Ambient Authority' the Root Cause of CSRF Vulnerabilities?",
    shortAnswer: "CSRF is an attack that tricks an authenticated victim's browser into executing state-changing HTTP requests on a trusted application; it succeeds because web browsers automatically attach stored session cookies with every cross-site request (ambient authority) without verifying user intent.",
    explanation: "When a user logs into `bank.in`, the browser stores a session cookie. If the user then visits a malicious page `evil.com`, that page can trigger `<form action=\"https://bank.in/transfer\" method=\"POST\"><input name=\"to\" value=\"hacker\">...`. The browser automatically includes the `bank.in` session cookie, and the bank processes the unauthorized transfer because it cannot distinguish between user-intended actions and cross-site requests.",
    hint: "Tricking your logged-in browser into sending money or changing your password without you knowing.",
    level: "basic",
    codeExample: `// Malicious Cross-Site Request (CSRF Attack):
// Hosted on https://attacker.in/evil.html:
<body onload="document.forms[0].submit()">
  <form action="https://kolkata-bank.in/api/transfer" method="POST">
    <input type="hidden" name="recipient" value="Hacker_Account_9841" />
    <input type="hidden" name="amount" value="500000" />
  </form>
</body>`
  },
  {
    question: "What is 'Broken Access Control' (OWASP Top 10 #1), and how does Insecure Direct Object Reference (IDOR) Occur?",
    shortAnswer: "Broken Access Control occurs when an application fails to enforce user permission boundaries; Insecure Direct Object Reference (IDOR) happens when an endpoint uses direct database keys (`/api/invoices/105`) without validating whether the authenticated user owns that specific record.",
    explanation: "If user Mamata (User ID 10) accesses `/api/statement?account_id=10` and then changes the URL to `/api/statement?account_id=11`, and the backend executes `SELECT * FROM accounts WHERE id = 11` without verifying `WHERE id = 11 AND user_id = req.user.id`, Mamata can view other citizens' confidential banking records.",
    hint: "Changing a number in the website link to see someone else's private invoice or medical report.",
    level: "basic",
    codeExample: `// Vulnerable IDOR Endpoint:
app.get('/api/invoice/:id', async (req, res) => {
    // VULNERABILITY: No ownership check! Any logged-in user can view any invoice!
    const invoice = await db.query('SELECT * FROM invoices WHERE id = $1', [req.params.id]);
    res.json(invoice);
});`
  },
  {
    question: "How do the Three `SameSite` Cookie Attribute Values (`Strict`, `Lax`, `None`) Protect against CSRF?",
    shortAnswer: "`SameSite=Strict` completely blocks the cookie from being sent on any cross-site request (even following external links); `SameSite=Lax` permits the cookie only on top-level GET navigations (clicking a link), blocking all cross-site POST requests; `SameSite=None` sends cookies everywhere but mandates the `Secure` flag.",
    explanation: "Under `SameSite=Strict`, if a user clicks a link from WhatsApp to `bank.in`, the browser does not send the session cookie, requiring re-authentication. Under `SameSite=Lax` (modern browser default), clicking a link sends the cookie, but a background POST request from `evil.com` is stripped of the cookie, neutralizing POST-based CSRF.",
    hint: "Strict blocks cookies on all outside links, Lax blocks cookies on outside forms, and None sends cookies everywhere.",
    level: "moderate",
    codeExample: `// Modern Secure Cookie Configuration:
Set-Cookie: session_token=9f8e7d6c5b4a; Secure; HttpOnly; SameSite=Strict; Path=/;`
  },
  {
    question: "What is the 'Synchronizer Token Pattern' (Anti-CSRF Token), and how does it Validate User Intent?",
    shortAnswer: "A defense where the server generates a cryptographically random, unguessable token tied to the user's current session; the token is embedded in HTML forms and validated on every state-changing request (POST, PUT, DELETE), rejecting requests that lack the token.",
    explanation: "When rendering a form, the server inserts `<input type=\"hidden\" name=\"_csrf\" value=\"9841af8e...\">`. Because `attacker.com` cannot read the victim's DOM due to Same-Origin Policy, the attacker cannot include the matching CSRF token in cross-site requests. The server rejects submissions where `submittedToken !== sessionToken`.",
    hint: "Putting a secret one-time code in every form that hacker websites cannot read or copy.",
    level: "moderate",
    codeExample: `// Synchronizer Token Validation Middleware:
function verifyCsrfToken(req, res, next) {
    const clientToken = req.body._csrf || req.headers['x-csrf-token'];
    if (!clientToken || clientToken !== req.session.csrfSecret) {
        return res.status(403).json({ error: "Invalid CSRF token: Request rejected!" });
    }
    next();
}`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 66C, what constitutes the criminal penalty for executing CSRF attacks to hijack accounts?",
    shortAnswer: "Fraudulently or dishonestly making use of the electronic signature, password, or any other unique identification feature of any other person carries imprisonment up to 3 years and fines up to ₹1 Lakh.",
    explanation: "Section 66C of the IT Act explicitly criminalizes identity theft: 'Whoever, fraudulently or dishonestly make use of the electronic signature, password or any other unique identification feature of any other person, shall be punished with imprisonment of either description for a term which may extend to three years and shall also be liable to fine which may extend to one lakh rupees.'",
    hint: "Section 66C prescribes up to 3 years imprisonment for using CSRF to hijack identity credentials.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66C - Identity Theft):
// Offense: Executing CSRF to reset corporate email addresses and hijack finance accounts in Kolkata
// Penalty: Imprisonment up to 3 Years + Fine up to ₹1,00,00,000`
  },
  {
    question: "What is the 'Double-Submit Cookie Pattern' for Stateless Anti-CSRF Defense in Single Page Applications (SPAs)?",
    shortAnswer: "The server sends a cryptographically signed, random CSRF token in a cookie; when making state-changing requests, client JavaScript reads the cookie and sends the exact same value in a custom HTTP header (`X-XSRF-TOKEN`); the server verifies that the cookie value matches the header value.",
    explanation: "In modern REST APIs without server-side session state: The client sends `Cookie: XSRF-TOKEN=abc123xyz` and `Header: X-XSRF-TOKEN: abc123xyz`. A cross-site attacker on `evil.com` cannot read the cookie due to SOP, so they cannot set the matching custom header. The server compares `req.cookies['XSRF-TOKEN'] === req.headers['x-xsrf-token']`.",
    hint: "Sending the secret token in two places (cookie and request header); they must match exactly.",
    level: "expert",
    codeExample: `// Double-Submit Cookie Verification:
app.post('/api/pay', (req, res) => {
    const cookieToken = req.cookies['XSRF-TOKEN'];
    const headerToken = req.headers['x-xsrf-token'];
    if (!cookieToken || cookieToken !== headerToken) {
        return res.status(403).json({ error: "CSRF token mismatch!" });
    }
    // Process transaction...
});`
  },
  {
    question: "What is 'Horizontal vs Vertical Privilege Escalation' in Broken Access Control?",
    shortAnswer: "Horizontal Escalation occurs when a user accesses resources belonging to another user of the SAME role (e.g. Mamata viewing Debangshu's bank balance); Vertical Escalation occurs when a low-privilege user accesses higher-privileged administrative functions (e.g. employee deleting admin accounts).",
    explanation: "Horizontal: Mamata (User A) accesses `/api/user/102/profile` instead of `/api/user/101/profile`. Vertical: Mamata (Regular User) accesses `/admin/system/reboot` or submits `role=SUPER_ADMIN` in a profile update because the server failed to verify role permissions.",
    hint: "Horizontal is viewing another student's account; Vertical is making yourself the principal of the school.",
    level: "moderate",
    codeExample: `// Horizontal Escalation: User A accesses User B's records: /api/orders?user_id=9841
// Vertical Escalation  : Regular User accesses Admin route: /api/admin/deleteDatabase`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the enterprise liabilities if Broken Access Control (IDOR) leaks 500,000 citizen health records?",
    shortAnswer: "Failing to implement reasonable technical safeguards (such as tenant ownership validation and role enforcement) resulting in personal data exfiltration triggers statutory penalties up to ₹250 Crores by the Data Protection Board of India.",
    explanation: "Section 8(5) mandates reasonable technical security safeguards. If a healthcare portal in West Bengal allows unauthenticated or unauthorized users to enumerate patient diagnostic files via IDOR, Section 33 prescribes fines up to ₹250 Crores.",
    hint: "Failing to prevent IDOR data leaks triggers fines up to ₹250 Crores under the DPDP Act.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for negligent access control failures`
  },
  {
    question: "What is 'Mass Assignment' (Over-Posting) Vulnerability and how does it Cause Vertical Privilege Escalation?",
    shortAnswer: "When an application automatically binds all client-provided JSON fields directly into database models (`User.update(req.body)`), allowing an attacker to inject privileged properties like `isAdmin: true` or `role: 'SUPER_ADMIN'`.",
    explanation: "If a user updates their profile by sending `{\"name\": \"Mamata\", \"isAdmin\": true}`, and the backend runs `User.findByIdAndUpdate(userId, req.body)`, the `isAdmin` boolean is written directly to the database, elevating the user to Super Administrator without permission checks. Mitigation requires explicit property whitelisting (DTOs).",
    hint: "Sending extra hidden data in your profile form (like isAdmin=true) that the server saves without checking.",
    level: "moderate",
    codeExample: `// Vulnerable Mass Assignment:
app.put('/api/profile', async (req, res) => {
    // VULNERABLE: Binds entire req.body including 'role' or 'balance'!
    await User.findByIdAndUpdate(req.user.id, req.body);
});

// Secure Whitelisted DTO:
app.put('/api/profile', async (req, res) => {
    const { name, bio, phoneNumber } = req.body; // ONLY safe fields!
    await User.findByIdAndUpdate(req.user.id, { name, bio, phoneNumber });
});`
  },
  {
    question: "Under CERT-In Mandatory Directions 2022, what is the mandatory incident reporting timeline for Broken Access Control data exfiltrations?",
    shortAnswer: "All organizations in India must report security breaches and unauthorized database access resulting from Broken Access Control to CERT-In within 6 HOURS of detection.",
    explanation: "Under Section 70B of the IT Act and CERT-In Direction No. 20(3)/2022-CERT-In, service providers, intermediaries, data centers, and corporate bodies must mandatorily report specified cyber security incidents (including unauthorized access to user databases and IDOR data leaks) to CERT-In within 6 hours of noticing them.",
    hint: "CERT-In requires mandatory incident reporting within a strict 6-hour window.",
    level: "basic",
    codeExample: `// Statutory SLA (CERT-In Mandatory Incident Reporting):
// Directive: Mandatory reporting of unauthorized access control leaks within 6 HOURS
// Mandate: Section 70B Information Technology Act 2000`
  },
  {
    question: "What is 'JSON Web Token (JWT) None Algorithm Attack' in Broken Access Control?",
    shortAnswer: "When a vulnerable backend accepts JWTs with `{\"alg\": \"none\"}` in the header without verifying the cryptographic signature, allowing an attacker to modify the payload (e.g. `{\"role\": \"admin\"}`) and strip the signature to bypass authentication.",
    explanation: "A JWT consists of Header.Payload.Signature. If a vulnerable library accepts `alg: none`, an attacker decodes the token, changes `{\"user\": \"Mamata\", \"role\": \"user\"}` to `{\"user\": \"Mamata\", \"role\": \"admin\"}`, and sends `eyJhbGciOiJub25lIn0.eyJyb2xlIjoiYWRtaW4ifQ.`. The backend accepts the unsigned token, granting full admin privileges.",
    hint: "Changing the token setting to 'no signature' so the server accepts fake admin badges.",
    level: "expert",
    codeExample: `// JWT None Algorithm Exploit Header:
// Header : {"alg": "none", "typ": "JWT"} ➔ eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0
// Payload: {"userId": 105, "role": "SUPER_ADMIN"} ➔ eyJ1c2VySWQiOjEwNSwicm9sZSI6IlNVUEVSX0FETUlOIn0
// Token  : eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJ1c2VySWQiOjEwNSwicm9sZSI6IlNVUEVSX0FETUlOIn0.`
  },
  {
    question: "Under the Indian IT Act Section 43(a), what constitutes civil liability for unauthorized access via IDOR?",
    shortAnswer: "Accessing or securing access to a computer system or downloading/copying data without permission carries compensation by way of damages up to ₹1 Crore.",
    explanation: "Section 43(a) explicitly penalizes unauthorized computer access and data extraction: 'If any person without permission of the owner... accesses or secures access to such computer... he shall be liable to pay damages by way of compensation not exceeding one crore rupees.'",
    hint: "Section 43(a) provides civil compensation up to ₹1 Crore for unauthorized computer access via IDOR.",
    level: "basic",
    codeExample: `// Statutory Liability (IT Act Section 43(a)):
// Violation: Exploiting IDOR to download 40,000 corporate tax invoices from a Kolkata portal
// Compensation: Up to ₹1,00,00,00,000 (Rupees One Crore) per affected entity`
  },
  {
    question: "How do 'Indirect Reference Maps' (Cryptographic UUIDs / Hashids) Mitigate IDOR Enumeration?",
    shortAnswer: "By replacing sequential database integers (`/invoices/1`, `/invoices/2`) with high-entropy cryptographic UUIDv4 strings (`/invoices/9f8e7d6c-5b4a-4321-8765-abcdef123456`), preventing attackers from guessing or crawling adjacent records.",
    explanation: "Sequential IDs allow attackers to run automated scripts iterating from `id=1` to `id=100000`. Using random 128-bit UUIDv4 identifiers makes enumeration mathematically impossible ($2^{122}$ search space). However, developers must still enforce server-side ownership checks, as UUIDs alone do not prevent direct URL sharing.",
    hint: "Using long random letters and numbers instead of 1, 2, 3 so hackers cannot guess the next file number.",
    level: "moderate",
    codeExample: `// Enumerable vs Non-Enumerable Object References:
// Enumerable ID (VULNERABLE)    : https://bank.in/api/statement/105 ➔ Attacker tests /106, /107...
// UUIDv4 Reference (PROTECTED)  : https://bank.in/api/statement/9f8e7d6c-5b4a-4321-8765-abcdef123456`
  },
  {
    question: "How does 'CORS Misconfiguration' (`Access-Control-Allow-Origin: *` with `Credentials: true`) Enable Cross-Origin Data Theft?",
    shortAnswer: "Allowing untrusted origins to make credentialed AJAX requests and read private JSON responses across domains, completely bypassing the browser's Same-Origin Policy.",
    explanation: "If `bank.in` responds with `Access-Control-Allow-Origin: https://evil.com` and `Access-Control-Allow-Credentials: true`, a script running on `evil.com` can execute `fetch('https://bank.in/api/balance', {credentials: 'include'})` and read the user's private financial data, transmitting it to the attacker.",
    hint: "Telling browsers that any outside website is allowed to read your private bank account data.",
    level: "expert",
    codeExample: `// Vulnerable CORS Response Header:
Access-Control-Allow-Origin: https://attacker.in
Access-Control-Allow-Credentials: true
// Result: Attacker website can read private user JSON responses over AJAX!`
  },
  {
    question: "Under the Indian IT Act Section 66, what constitutes the criminal penalty for exploiting Broken Access Control to manipulate records?",
    shortAnswer: "Dishonestly or fraudulently hacking or diminishing the utility of computer systems carries imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Section 66 criminalizes fraudulent computer disruption: 'If any person, dishonestly or fraudulently, does any act referred to in section 43... he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees, or with both.'",
    hint: "Section 66 provides up to 3 years imprisonment and ₹5 Lakh fine for fraudulent computer hacking.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66):
// Offense: Exploiting IDOR to alter electricity billing records across municipal portals in West Bengal
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,00,000`
  },
  {
    question: "What is 'Missing Function Level Access Control' (MFLAC) and how do Attackers Discover Hidden Admin APIs?",
    shortAnswer: "When an application hides administrative buttons in the UI (`display: none`) but fails to verify administrative roles on the backend API endpoint (`/api/admin/deleteUser`), allowing low-privileged users to invoke administrative functions directly.",
    explanation: "A frontend may hide the 'Delete Tenant' button for regular users. However, if the backend route `/api/admin/tenants/delete` only checks if the user is logged in (and not if `user.role === 'ADMIN'`), an attacker inspects JavaScript source maps, finds the API route, and executes the delete action.",
    hint: "Hiding an admin button on the screen but forgetting to lock the admin door on the server.",
    level: "moderate",
    codeExample: `// Vulnerable Route (Missing Function Level Check):
app.post('/api/admin/resetSystem', (req, res) => {
    // VULNERABLE: Only verifies authentication, NOT authorization!
    if (!req.isAuthenticated()) return res.sendStatus(401);
    // Any regular user can reset the system!
    resetEntireDatabase();
});`
  },
  {
    question: "Synthesize an enterprise-scale Multi-Tier Defense Architecture against CSRF and Broken Access Control.",
    shortAnswer: "A defense-in-depth framework combining `SameSite=Strict` Cookies, Double-Submit HMAC Anti-CSRF Tokens, Granular RBAC/ABAC Middleware with Tenant Ownership Checks, Non-Enumerable UUIDv4 References, and Strict CORS Whitelisting.",
    explanation: "To achieve complete immunity: 1. Cookie Tier: Mandatory `SameSite=Strict; Secure; HttpOnly` cookies. 2. Request Tier: Cryptographic Anti-CSRF tokens for all state-changing endpoints. 3. Access Control Tier: Middleware verifying ownership on every resource: `WHERE id = :id AND tenant_id = :tenant_id`. 4. Identifier Tier: UUIDv4 non-enumerable references. 5. CORS: Strict explicit origin whitelisting with zero credentialed wildcards.",
    hint: "Combine SameSite=Strict cookies, Anti-CSRF tokens, tenant ownership middleware, and UUIDv4 IDs.",
    level: "expert",
    codeExample: `// Master CSRF & Access Control Defense Blueprint:
// 1. Cookie Policy   : Set-Cookie: session=xyz; Secure; HttpOnly; SameSite=Strict
// 2. Anti-CSRF Token : Validate Double-Submit HMAC token on all POST/PUT/DELETE
// 3. Ownership Check : SELECT * FROM records WHERE id = $1 AND organization_id = $2
// 4. Strong UUIDs    : /api/invoices/9f8e7d6c-5b4a-4321-8765-abcdef123456`
  },
  {
    question: "What is 'CSRF via Flash / Dynamic Content (Crossdomain.xml)'?",
    shortAnswer: "A legacy cross-domain vulnerability where a misconfigured `crossdomain.xml` or `clientaccesspolicy.xml` file allowed Flash/Silverlight objects from untrusted domains to make credentialed requests and read private data across origins.",
    explanation: "If a server hosted `crossdomain.xml` with `<allow-access-from domain=\"*\" />`, an attacker could host a Flash SWF file that initiated authenticated cross-origin requests, bypassing browser Same-Origin restrictions. Modern browsers have deprecated Flash, but similar risks exist in misconfigured CORS headers.",
    hint: "Old plugin files that accidentally gave full permission to outside websites to make bank requests.",
    level: "expert",
    codeExample: `// Vulnerable Legacy crossdomain.xml:
<?xml version="1.0"?>
<cross-domain-policy>
  <allow-access-from domain="*" /> <!-- VULNERABLE: Allows all domains to read private data! -->
</cross-domain-policy>`
  },
  {
    question: "Under the Indian Penal Code Section 427, what constitutes 'Mischief' via Broken Access Control Deletions?",
    shortAnswer: "Intentionally accessing and deleting proprietary digital databases belonging to other tenants or users via IDOR, causing wrongful loss, punishable with imprisonment up to 2 years and fines.",
    explanation: "Section 425/427 IPC defines Mischief. When an attacker exploits IDOR to delete medical records or business invoices belonging to another company in West Bengal, the act constitutes digital mischief under Section 427.",
    hint: "IPC Section 427 covers Mischief and Digital Record Deletion with up to 2 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Penalty (Indian Penal Code Section 427):
// Offense: Exploiting IDOR to delete 5,000 patient records from an oncology database in Ichapur (Mischief)
// Penalty: Imprisonment for a term up to 2 Years, or with Fine, or with both`
  },
  {
    question: "What is 'Tenant Isolation Failure in Multi-Tenant SaaS' (Cross-Tenant Data Leakage)?",
    shortAnswer: "When a cloud multi-tenant application queries shared database tables without filtering by `tenant_id` (e.g. `SELECT * FROM orders WHERE id = 105`), allowing Company A to view or modify confidential invoices belonging to Company B.",
    explanation: "In multi-tenant SaaS architectures, all customer records share the same PostgreSQL table. If a developer omits `AND tenant_id = req.user.tenantId` in any query, any authenticated user from Company A can view financial payrolls from Company B. Hardening requires Row-Level Security (RLS) in PostgreSQL.",
    hint: "When a multi-company software forgets to filter data by company name, mixing up customer secrets.",
    level: "expert",
    codeExample: `// PostgreSQL Row-Level Security (RLS) Tenant Isolation:
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation_policy ON transactions
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant_id')::uuid);`
  },
  {
    question: "What is 'Login CSRF' and how do Attackers use it to Monitor User Activity?",
    shortAnswer: "An attack where the adversary tricks the victim's browser into logging into the ATTACKER'S account on a shopping or banking portal; when the victim subsequently enters credit card info or searches for sensitive items, the data is saved directly in the attacker's account history.",
    explanation: "The attacker generates a CSRF form that submits the attacker's credentials to `/login`. The victim visits `evil.com`, and their browser is silently logged into `attacker_user`. The victim, believing they are on their own account, links their payment card or uploads personal tax documents, which the attacker accesses later.",
    hint: "Tricking your browser into logging into the hacker's account so everything you type is saved for the hacker to see.",
    level: "moderate",
    codeExample: `// Login CSRF Form:
<form action="https://shop.in/login" method="POST">
  <input type="hidden" name="user" value="hacker_account" />
  <input type="hidden" name="pass" value="HackerPass2026!" />
</form>`
  },
  {
    question: "Under the Indian IT Act Section 70, what constitutes the penalty for executing Broken Access Control against 'Protected Systems'?",
    shortAnswer: "Securing unauthorized access or attempting to secure access to designated Protected Systems (critical infrastructure) carries imprisonment up to 10 YEARS and severe fines.",
    explanation: "Section 70 of the IT Act governs Critical Information Infrastructure (e.g. power grids in Barrackpore, financial settlement switches in Salt Lake). Launching an IDOR or privilege escalation attack against a designated protected system carries up to 10 years imprisonment under Section 70.",
    hint: "Section 70 carries up to 10 years imprisonment for unauthorized access to Protected Systems.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 70):
// Offense: Exploiting IDOR to access SCADA power grid switching controls in Barrackpore
// Penalty: Imprisonment for a term up to 10 YEARS, and shall also be liable to Fine`
  },
  {
    question: "What is 'API BOLA' (Broken Object Level Authorization - OWASP API Top 10 #1)?",
    shortAnswer: "The API-specific term for IDOR, where REST/GraphQL APIs expose object identifiers in URL endpoints (`/v1/users/{userId}/financials`) without verifying that the requesting token owns the referenced object.",
    explanation: "BOLA is the single most common vulnerability in mobile and cloud APIs. Mobile apps frequently call `/api/v1/orders/8410` by extracting the order ID from local storage. If the backend fails to verify that `order.customerId === token.userId`, any user can view all orders across the entire platform.",
    hint: "The number one mobile API bug where changing a number in an API link shows someone else's order.",
    level: "moderate",
    codeExample: `// Vulnerable BOLA Route:
// GET /api/v1/patients/9841/records
// Backend returns records without verifying if caller is Patient 9841 or assigned doctor!`
  },
  {
    question: "Under the Indian IT Act Section 66D, what constitutes Cheating by Personation via Broken Access Control?",
    shortAnswer: "Cheating by personating any person using any computer resource or electronic communication device carries imprisonment up to 3 years and fines up to ₹1 Lakh.",
    explanation: "Section 66D of the IT Act explicitly penalizes personation: 'Whoever, by means for any communication device or computer resource cheats by personating, shall be punished with imprisonment of either description for a term which may extend to three years and shall also be liable to fine which may extend to one lakh rupees.'",
    hint: "Section 66D covers Cheating by Personation with up to 3 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66D):
// Offense: Using IDOR to impersonate senior bank managers and authorize unauthorized loans in Kolkata
// Penalty: Imprisonment up to 3 Years + Fine up to ₹1,00,000`
  },
  {
    question: "What is 'Attribute-Based Access Control' (ABAC) vs 'Role-Based Access Control' (RBAC)?",
    shortAnswer: "RBAC grants permissions based on static user roles (e.g. `Admin`, `User`); ABAC evaluates dynamic attributes of the user, resource, action, and environment (e.g. 'Can edit record IF user.dept == record.dept AND time < 6PM AND location == Kolkata').",
    explanation: "RBAC is simple but often leads to IDOR because a `Doctor` role can access *all* patients. ABAC provides granular security: A user with `Role: Doctor` can only access patient records IF `patient.assignedDoctorId === user.id` AND `accessContext.department === 'Oncology'`, completely eliminating IDOR.",
    hint: "RBAC checks your job title, while ABAC checks your job title, your department, your assigned patients, and the time of day.",
    level: "expert",
    codeExample: `// ABAC Policy Engine Logic:
function canAccessPatientRecord(user, record, context) {
    return user.role === 'DOCTOR' && 
           record.assignedDoctorId === user.id && 
           context.ipSubnet === '10.0.4.0/24';
}`
  },
  {
    question: "Under the Indian Penal Code Section 420, what constitutes Cheating via CSRF Financial Fraud?",
    shortAnswer: "Dishonestly inducing delivery of property or executing unauthorized funds transfers using CSRF scripts to siphon funds into fraudulent bank accounts, punishable with imprisonment up to 7 years and fines.",
    explanation: "Section 420 IPC penalizes cheating and fraudulent property transfer. If an attacker uses CSRF to force a victim's logged-in banking session to transfer ₹15 Lakhs to an unauthorized account in West Bengal, they are prosecuted under Section 420 alongside the IT Act.",
    hint: "IPC Section 420 covers Cheating and Fraudulent Funds Siphoning with up to 7 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 420):
// Offense: Executing CSRF to transfer ₹15 Lakhs from a corporate escrow account to an offshore mule account
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "What is 'Client-Side Path Traversal in Access Control'?",
    shortAnswer: "When an application uses untrusted URL parameters to dynamically construct API fetch URLs (`fetch('/api/user/' + param)`), allowing an attacker to supply `../../admin/delete` to access restricted administrative APIs.",
    explanation: "If a frontend route calls `fetch('/api/documents/' + encodeURIComponent(docId))`, and the backend does not sanitize path traversal, an attacker inputs `../admin/secrets.json`. The server resolves the relative path, bypassing intended endpoint routing and exposing administrative files.",
    hint: "Using dot-dot-slash (../) in API links to jump out of regular user folders into admin folders.",
    level: "moderate",
    codeExample: `// Client-Side Path Traversal Flow:
// User Input: ../../api/admin/system_keys
// Executed Route: /api/documents/../../api/admin/system_keys ➔ Resolves to /api/admin/system_keys!`
  },
  {
    question: "What is 'Automated IDOR & Access Control Fuzzing with Autorize & Burp Suite'?",
    shortAnswer: "Security testing extensions (such as Burp Autorize) that automatically repeat every HTTP request made by a high-privileged user using a low-privileged user's cookie, flagging any endpoint that returns HTTP 200 OK as a Broken Access Control vulnerability.",
    explanation: "When a security auditor browses an application as `Admin`, Autorize copies the request, replaces the session cookie with `User_B`'s cookie, and sends it to the server. If the server responds with the same data and HTTP 200 instead of HTTP 403 Forbidden, Autorize alerts the tester that the route has Broken Access Control.",
    hint: "An automated test tool that tries running admin commands with a regular student password to check if the door is unlocked.",
    level: "moderate",
    codeExample: `// Burp Autorize Automated Testing Workflow:
// 1. Admin navigates to: GET /api/v1/tenants/9841/financials (HTTP 200)
// 2. Autorize replays with: Cookie: session=low_priv_user (HTTP 200 - VULNERABILITY FLAGGED!)`
  },
  {
    question: "Synthesize the mathematical formulation of Access Control Function (Access(u, r, o)), Role Hierarchy (Role(u)), Resource Ownership (Owner(o)), and CSRF Exploitability Probability (P_csrf).",
    shortAnswer: "Access is granted if and only if Access(u, r, o) = [ Role(u) >= ReqRole(r) ] AND [ Owner(o) == u OR IsAdmin(u) ]; CSRF exploitability probability is P_csrf = (1 - SameSite_strict) * (1 - Token_valid); when SameSite=Strict and Valid Anti-CSRF Tokens are enforced, P_csrf = 0.00%, mathematically proving complete authorization and ambient authority immunity.",
    explanation: "Let the universe of users be U, operations be R, and objects be O. An access control function Access: U × R × O -> {0, 1} evaluates: Access(u, r, o) = [ Role(u) >= ReqRole(r) ] × [ Owner(o) = u OR IsAdmin(u) ]. When ownership is omitted, Access evaluates strictly to 1 for all o in O, causing IDOR. For CSRF, let SameSite_strict in {0, 1} and Token_valid in {0, 1}. The CSRF exploitability probability is: P_csrf = (1 - SameSite_strict) × (1 - Token_valid). When both controls are enforced ({1, 1}), P_csrf = (1 - 1) × (1 - 1) = 0.00%, providing mathematical proof of complete CSRF immunity.",
    hint: "Mathematical proof formula showing that enforcing Tenant Ownership checks and SameSite=Strict tokens reduces Broken Access Control and CSRF exploitability to absolute zero (0.00%).",
    level: "expert",
    codeExample: `// Access Control & CSRF Mathematical Proof:
// Unhardened System : SameSite = 0, Token = 0 ➔ P_csrf = (1 - 0) * (1 - 0) = 100.0% (VULNERABLE!)
// Ownership Check   : Owner(o) != u ➔ Access(u, r, o) = 0 (IDOR NEUTRALIZED!)
// Dual CSRF Defense : SameSite=1, Token=1 ➔ P_csrf = (1 - 1) * (1 - 1) = 0.00% (100% IMMUNE!)`
  }
];

export default questions;
