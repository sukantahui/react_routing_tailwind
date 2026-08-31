// topic4_questions.js
// 30 Moderate to Expert Questions on Threats to Integrity and Data Tampering

const questions = [
  {
    question: "What is an Integrity Threat in cybersecurity?",
    shortAnswer: "Any malicious or accidental event that alters, forges, corrupts, replaces, or deletes data, software code, or hardware configurations without proper authorization.",
    explanation: "Integrity threats undermine trust in critical systems by inserting deceptive or destructive modifications.",
    hint: "Events that alter or corrupt data and code without authorization.",
    level: "basic",
    codeExample: "IsTampered = (ActualDataPayload !== OriginalAuthenticPayload);"
  },
  {
    question: "How does Man-in-the-Middle (MitM) packet tampering violate data integrity?",
    shortAnswer: "An active adversary intercepts unencrypted or weakly authenticated network traffic, altering payload values (such as changing bank account IFSC codes or amounts) before relaying the modified packets to the destination.",
    explanation: "Mitigated by Authenticated Encryption with Associated Data (AEAD) in TLS 1.3.",
    hint: "Interception and altering of data packets in transit between sender and receiver.",
    level: "basic",
    codeExample: "Packet.DestinationAccount = 'ATTACKER_KOLKATA_ACC_9812'; // Altered on the wire"
  },
  {
    question: "What is a Replay Attack and how do Nonces and Timestamps prevent it?",
    shortAnswer: "An attacker captures a valid, authenticated data packet (e.g. fund transfer authorization) and resends it repeatedly without modifying its contents; Nonces (cryptographic numbers used once) and short-lived timestamps ensure the server rejects duplicate transmissions.",
    explanation: "Replay attacks compromise transaction sequence integrity even without decrypting payloads.",
    hint: "Re-transmitting valid captured requests; blocked by one-time nonces and timestamps.",
    level: "moderate",
    codeExample: "if (ProcessedNonces.has(req.nonce) || (Date.now() - req.timestamp > 30000)) throw 'ReplayAttack';"
  },
  {
    question: "How does SQL Injection (SQLi) compromise database record integrity?",
    shortAnswer: "Unsanitized user inputs are concatenated directly into SQL queries, allowing adversaries to execute arbitrary commands like 'UPDATE accounts SET balance = 10000000' or 'DROP TABLE patients'.",
    explanation: "Prevented by Parameterized Queries (Prepared Statements) which enforce strict separation between code and data.",
    hint: "Manipulating database query structure to modify or delete backend records.",
    level: "basic",
    codeExample: "// Vulnerable: 'UPDATE users SET bal = 0 WHERE id = ' + req.body.id\n// Fixed: db.query('UPDATE users SET bal = 0 WHERE id = $1', [userId])"
  },
  {
    question: "What is Subresource Integrity (SRI) and how does it prevent CDN supply chain tampering?",
    shortAnswer: "A web security standard where <script> tags include a cryptographic hash (e.g. integrity='sha384-...') of the hosted JavaScript file; modern browsers calculate the hash upon downloading from a third-party CDN and refuse to execute the script if it was tampered with.",
    explanation: "Protects against compromised CDNs injecting credit-card skimmers (Magecart attacks).",
    hint: "Browser check that validates the hash of external scripts before running them.",
    level: "moderate",
    codeExample: "<script src='https://cdn.kolkata.in/app.js' integrity='sha384-q8i/X...' crossorigin='anonymous'></script>"
  },
  {
    question: "What was the mechanism behind the SolarWinds and xz-utils software supply chain backdoor attacks?",
    shortAnswer: "Adversaries compromised upstream build pipelines and source repositories, injecting subtle malicious code into legitimate, signed binaries or libraries before distribution, bypassing downstream perimeter defenses.",
    explanation: "Demonstrates that digital signatures are only as trustworthy as the upstream build pipeline integrity.",
    hint: "Injecting malicious code directly into upstream source code or automated build pipelines.",
    level: "expert",
    codeExample: "// xz-utils: Concealed M4 macros injected malicious code into liblzma during tarball release generation"
  },
  {
    question: "What is Insecure Direct Object References (IDOR) and Parameter Tampering?",
    shortAnswer: "When an application exposes a direct reference to an internal database key (e.g. /api/invoice/4021) without verifying user authorization, allowing an attacker to change the ID to /api/invoice/4022 and alter another user's invoice.",
    explanation: "Violates data integrity by allowing unauthorized record mutations.",
    hint: "Changing URL or form parameters to manipulate objects belonging to other users.",
    level: "moderate",
    codeExample: "app.post('/api/updateProfile', (req, res) => {\n  // Insecure: trusting req.body.userId instead of req.session.userId\n});"
  },
  {
    question: "How does Ransomware violate both Data Integrity and System Availability?",
    shortAnswer: "Ransomware systematically overwrites original files with ciphertext using asymmetric/symmetric hybrid encryption (AES-256 + RSA-4096), corrupting original data structure and rendering it unusable without the attacker's private decryption key.",
    explanation: "WORM (Write Once Read Many) immutable backups defend against catastrophic ransomware tampering.",
    hint: "Encrypting and replacing legitimate files with corrupted ciphertext to extort money.",
    level: "basic",
    codeExample: "File.OverwriteWith(AES_Encrypt(File.Bytes, AttackerPublicKey));"
  },
  {
    question: "What is Stored Cross-Site Scripting (Stored XSS) and how does it compromise client-side data integrity?",
    shortAnswer: "Malicious JavaScript is permanently stored in a web database (e.g. in forum comments or user bios); when other users load the page, the script executes in their browser, altering the DOM, defacing content, or forging transactions.",
    explanation: "Prevented by contextual HTML entity encoding and strict Content Security Policies (CSP).",
    hint: "Permanent malicious script stored in database that executes in visitors' browsers.",
    level: "moderate",
    codeExample: "// Payload: <script>document.getElementById('balance').innerText='₹0.00';</script>"
  },
  {
    question: "What is DNS Cache Poisoning and how does it manipulate internet routing integrity?",
    shortAnswer: "An attacker injects forged IP addresses into a DNS resolver's cache, redirecting legitimate users visiting 'bank.kolkata.in' to a malicious phishing clone with identical branding.",
    explanation: "DNSSEC solves this by attaching cryptographically verifiable RRSIG records to all DNS responses.",
    hint: "Poisoning DNS server caches to redirect legitimate traffic to fake adversary servers.",
    level: "moderate",
    codeExample: "DNS_Cache_Entry = { 'bank.kolkata.in': '192.168.1.50' /* Rogue IP */ };"
  },
  {
    question: "What is BGP Route Hijacking and how does it violate global routing integrity?",
    shortAnswer: "A rogue Autonomous System (AS) broadcasts fraudulent BGP announcements claiming ownership of IP ranges belonging to other organizations, rerouting traffic globally through malicious transit paths.",
    explanation: "RPKI (Resource Public Key Infrastructure) cryptographically signs Route Origin Authorizations (ROAs) to prevent bogus route advertisements.",
    hint: "Broadcasting fake internet route paths to steal or intercept global internet traffic.",
    level: "expert",
    codeExample: "BGP_Announcement: Prefix 103.25.12.0/24 via AS65534 (Unauthorized Rogue AS)"
  },
  {
    question: "What is Buffer Overflow and Return-Oriented Programming (ROP) in memory integrity exploitation?",
    shortAnswer: "Adversaries overwrite stack memory buffers to corrupt the saved instruction pointer ($EIP/$RIP), stitching together short existing machine code sequences ('gadgets' ending in RET) to execute arbitrary commands without injecting new executable code.",
    explanation: "Bypasses Data Execution Prevention (DEP/NX) and Address Space Layout Randomization (ASLR).",
    hint: "Overwriting function return pointers in memory using existing instruction snippets.",
    level: "expert",
    codeExample: "ROP_Chain = [ Gadget_Pop_RDI_Ret, 0x1337, Gadget_Call_System_Ret ];"
  },
  {
    question: "What is a UEFI/Firmware Rootkit (e.g. MoonBounce, CosmicStrand) and why is it so hazardous to system integrity?",
    shortAnswer: "Malware flashed directly onto motherboard SPI flash memory; it executes before the OS kernel boots, survives hard drive formatting and OS reinstallation, and hooks kernel APIs from beneath the operating system.",
    explanation: "Defended by Intel Boot Guard, AMD Hardware Root of Trust, and cryptographic firmware signing.",
    hint: "Malware living in motherboard flash chips that survives hard drive wipes.",
    level: "expert",
    codeExample: "SPI_Flash_Hook → Hijack UEFI DXE Phase → Patch Windows Kernel in Memory"
  },
  {
    question: "What is Mass Assignment Vulnerability in API frameworks and how does it tamper with record state?",
    shortAnswer: "When an API framework automatically binds all incoming HTTP request fields to database model attributes, allowing an attacker to inject `{\"role\": \"admin\", \"is_verified\": true}` during a standard profile update.",
    explanation: "Prevented by DTOs (Data Transfer Objects) and explicit field allowlists.",
    hint: "APIs automatically saving all submitted fields, allowing users to make themselves admins.",
    level: "moderate",
    codeExample: "// Insecure: User.update(req.body)\n// Secure: User.update({ name: req.body.name, email: req.body.email })"
  },
  {
    question: "How does Cross-Site Request Forgery (CSRF) manipulate transaction integrity?",
    shortAnswer: "An attacker tricks an authenticated user's browser into sending an unauthorized HTTP POST request (e.g. fund transfer) to a vulnerable web application where the user has an active session cookie.",
    explanation: "Prevented by Anti-CSRF Synchronizer Tokens, SameSite=Strict cookie attributes, and re-authentication.",
    hint: "Tricking an authenticated victim's browser into executing unauthorized background actions.",
    level: "basic",
    codeExample: "<img src='https://bank.kolkata.in/api/transfer?to=Attacker&amount=50000' width='0' height='0' />"
  },
  {
    question: "What is Cryptographic Key Degradation and Hash Collision Forgery?",
    shortAnswer: "Using obsolete algorithms like MD5 or SHA-1 where adversaries can generate two different documents producing the same hash, allowing them to swap legitimate agreements with fraudulent terms after signing.",
    explanation: "Standards mandate SHA-256 or SHA-512 for all digital signatures and certificates.",
    hint: "Crafting a malicious document with the exact same hash as a legitimate document.",
    level: "moderate",
    codeExample: "Verify(FraudulentContract, OriginalMD5Hash) === TRUE // Broken algorithm flaw"
  },
  {
    question: "What is Integer Overflow / Underflow and how does it compromise application calculation integrity?",
    shortAnswer: "When an arithmetic operation exceeds the maximum/minimum storage capacity of a fixed-width integer (e.g. 255 + 1 = 0 in an 8-bit unsigned int), causing financial account balance calculations or memory allocations to wrap around disastrously.",
    explanation: "Mitigated by checked arithmetic libraries and modern language safety checks (e.g. Rust).",
    hint: "Numbers exceeding max limits and resetting to zero or negative in calculations.",
    level: "moderate",
    codeExample: "uint8_t balance = 255;\nbalance += 1; // balance becomes 0 due to overflow!"
  },
  {
    question: "What is Webhook Signature Verification and why is it vital for payment gateway integrity?",
    shortAnswer: "Payment processors (e.g. Razorpay, Stripe) send transaction status updates via webhooks; merchants must verify the HMAC signature attached in the header using a webhook secret to prevent attackers from sending fake 'PAYMENT_SUCCESS' payloads.",
    explanation: "Failing to verify webhook signatures allows malicious actors to obtain goods without paying.",
    hint: "Checking cryptographic signatures on payment webhook notifications to prevent fake receipts.",
    level: "moderate",
    codeExample: "const expectedSig = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');\nif (headerSig !== expectedSig) throw 'InvalidWebhookSignature';"
  },
  {
    question: "What is Cold Boot Attack and how does it bypass memory integrity safeguards?",
    shortAnswer: "An attacker physically freezes DRAM chips with liquid nitrogen or compressed air and extracts them to read residual memory data (including encryption keys) before the electrical charge fully dissipates.",
    explanation: "Defended by full memory encryption (e.g. AMD SME / Intel TME) and disabling sleep mode.",
    hint: "Physically freezing RAM chips to extract cryptographic keys from memory remnants.",
    level: "expert",
    codeExample: "MemoryRemanence = FreezeRAM() → ReadDRAMDump() → ExtractBitLockerKeys();"
  },
  {
    question: "What is Race Condition / Dirty Cow (CVE-2016-5195) in Linux kernel memory integrity?",
    shortAnswer: "A race condition in the Linux memory management subsystem's Copy-on-Write (COW) mechanism that allowed unprivileged local users to write to read-only memory mappings, overwriting root-owned binaries.",
    explanation: "Kernel patches fixed the race window in get_user_pages.",
    hint: "Kernel race condition allowing normal users to overwrite read-only root files.",
    level: "expert",
    codeExample: "pthread_create(&th1, NULL, madviseThread, NULL);\npthread_create(&th2, NULL, writeThread, NULL); // Overwrites read-only pages"
  },
  {
    question: "What is Section 66 of the Indian Information Technology Act 2000 regarding computer data tampering?",
    shortAnswer: "Section 66 (read with Section 43) prescribes imprisonment up to 3 years and fines up to ₹5,00,000 for dishonestly or fraudulently tampering with, damaging, deleting, or altering computer data or systems.",
    explanation: "Provides statutory criminal penalties for integrity violations and hacking in India.",
    hint: "Indian IT Act law prescribing 3 years jail and ₹5,00,000 fine for altering computer data.",
    level: "moderate",
    codeExample: "IT_Act_2000 = { Section: '66', MaxImprisonment: '3 Years', MaxFine: '₹5,00,000' };"
  },
  {
    question: "What is Tamper-Evident Immutable Logging (WORM Storage) and how does it protect audit trails?",
    shortAnswer: "Write Once Read Many (WORM) storage uses hardware and cloud policies (e.g. AWS S3 Object Lock in Compliance Mode) to ensure log files cannot be deleted, modified, or truncated by anyone, including root administrators, for a retention period.",
    explanation: "Prevents attackers from deleting log files after compromising a system to conceal their tracks.",
    hint: "Storage systems where logs can only be appended and never modified or deleted.",
    level: "moderate",
    codeExample: "aws s3api put-object-lock-configuration --bucket audit-logs --object-lock-configuration '{ \"ObjectLockEnabled\": \"Enabled\" }'"
  },
  {
    question: "What is Software Bill of Materials (SBOM) and how does it track supply chain dependencies?",
    shortAnswer: "A formal machine-readable inventory (in SPDX or CycloneDX format) detailing all open-source libraries, modules, transitive dependencies, and version hashes bundled in a software application.",
    explanation: "Allows security teams to instantly detect if a compromised or backdoored library is present in production.",
    hint: "A detailed parts list of all software packages and dependencies used in an app.",
    level: "moderate",
    codeExample: "cyclonedx-npm --output-file sbom.json // Generates cryptographic inventory"
  },
  {
    question: "What is Shadow Copy / Volume Snapshot Deletion in ransomware attacks and how is it mitigated?",
    shortAnswer: "Ransomware executes `vssadmin delete shadows /all /quiet` to wipe Windows Volume Shadow Copies before encrypting data, preventing victims from restoring previous file versions without paying.",
    explanation: "Mitigated by locking down administrator privileges and keeping offline, air-gapped, or immutable cloud backups.",
    hint: "Ransomware deleting Windows restore points; stopped by immutable offline backups.",
    level: "basic",
    codeExample: "vssadmin delete shadows /all /quiet // Standard ransomware pre-encryption command"
  },
  {
    question: "How does Content Security Policy (CSP) protect webpage DOM integrity from script injection?",
    shortAnswer: "An HTTP response header defining approved domains from which scripts, styles, and fonts can load, while disabling dangerous inline execution (`unsafe-inline`) and `eval()`, preventing injected scripts from running.",
    explanation: "Restricts attackers from modifying webpage content even if an XSS vulnerability exists.",
    hint: "HTTP header telling browsers which domains are permitted to load scripts and assets.",
    level: "moderate",
    codeExample: "Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted.kolkata.in;"
  },
  {
    question: "What is In-Transit Payload Modification in API Gateways and how do Digital Signatures verify payloads?",
    shortAnswer: "Adversaries or rogue proxies modify JSON body parameters during transit; sending an asymmetric digital signature of the JSON payload in a custom HTTP header (e.g. `X-Signature: <RSA-Sig>`) allows the gateway to reject tampered bodies.",
    explanation: "Used extensively in banking Open API architectures across Indian FinTechs.",
    hint: "Attaching a cryptographic signature to API JSON payloads to detect proxy tampering.",
    level: "moderate",
    codeExample: "const isSignatureValid = crypto.verify('SHA256', Buffer.from(jsonBody), publicKey, signatureHeader);"
  },
  {
    question: "What is a Double-Spending Attack in Blockchain ledgers and how does Consensus uphold integrity?",
    shortAnswer: "Attempting to spend the same cryptocurrency coin twice by sending conflicting transactions to different nodes; consensus mechanisms (Proof of Work / Proof of Stake) ensure that only one valid chain branch is finalized by the global network.",
    explanation: "Preserves the absolute ledger integrity of distributed digital assets.",
    hint: "Spending the same digital token twice; prevented by blockchain consensus rules.",
    level: "moderate",
    codeExample: "DoubleSpendCheck = (UTXO_Spent_In_Previous_Block) ? RejectTransaction() : Accept();"
  },
  {
    question: "What is the typical commercial budget in Indian Rupees (₹) to deploy an Enterprise SIEM, WORM Immutable Storage & CI/CD Supply Chain Scanner in West Bengal?",
    shortAnswer: "Approximately ₹6,50,000 to ₹18,00,000 for enterprise Wazuh/Elastic SIEM, AWS S3 Object Lock WORM repositories, SonarQube / Snyk supply chain vulnerability scanners, and HSM code-signing licenses.",
    explanation: "Protects enterprise software firms and medical providers across Kolkata and Salt Lake Sector V.",
    hint: "Comprehensive enterprise integrity tooling costs ₹6,50,000 – ₹18,00,000 in Indian Rupees.",
    level: "moderate",
    codeExample: "Enterprise_Integrity_Budget = ₹12,00,000; // SIEM + WORM + SBOM scanners"
  },
  {
    question: "How does Git maintain repository commit history integrity using Cryptographic Hash Chains?",
    shortAnswer: "Every Git commit object contains the SHA-1/SHA-256 hash of its tree and its parent commit's hash. Modifying any past commit code changes its hash, which invalidates all subsequent child commit hashes up to the branch HEAD.",
    explanation: "Guarantees that past commit history cannot be secretly altered without breaking branch integrity.",
    hint: "Each Git commit references the cryptographic hash of its parent commit.",
    level: "basic",
    codeExample: "commit 8f9b4... \ntree e2a1... \nparent 4c89... // Cryptographic parent chain"
  },
  {
    question: "What is the ultimate golden rule for defending against Threats to Data and System Integrity?",
    shortAnswer: "'Never trust unauthenticated inputs or pipelines: enforce AEAD in TLS 1.3, sign APIs and webhooks with HMACs, protect CDNs with Subresource Integrity (SRI), secure databases with prepared statements, lock audit trails with WORM storage, and budget enterprise integrity defenses in Indian Rupees (₹)!'",
    explanation: "This complete rule synthesizes input validation, cryptographic signatures, supply chain checks, immutable logs, and realistic budgeting.",
    hint: "Enforce AEAD, sign webhooks, use SRI and prepared statements, lock WORM logs, budget in ₹.",
    level: "moderate",
    codeExample: "GoldenIntegrityDefense: ValidateInput() → EnforceSRI() → SignPayloads() → WORM_Lock() → BudgetInRupees(₹);"
  }
];

export default questions;
