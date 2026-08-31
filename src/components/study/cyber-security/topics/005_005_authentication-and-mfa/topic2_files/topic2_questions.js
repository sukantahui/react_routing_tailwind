const questions = [
  {
    id: 1,
    question: "What is Shannon Password Entropy and what mathematical formula is used to calculate it?",
    shortAnswer: "Shannon Password Entropy measures the theoretical unpredictability and information density of a password in bits: H = L * log2(N), where L is the character length and N is the character pool size.",
    explanation: "Entropy quantifies the number of guesses an attacker must execute in the worst-case exhaustive search. A pool with lowercase, uppercase, digits, and symbols has N = 95, yielding ~6.57 bits per character.",
    hint: "Think about password length L multiplied by the log base 2 of available characters N.",
    level: "Basic",
    codeExample: `// Shannon Entropy Calculation:
// L = 12 characters, Pool = Alphanumeric (62 chars)
// H = 12 * log2(62) = 12 * 5.954 = 71.45 bits of entropy`
  },
  {
    id: 2,
    question: "Why is a long passphrase like 'correct horse battery staple' far more secure than a complex short password like 'P@$$w0rd!'?",
    shortAnswer: "Entropy scales linearly with length L but only logarithmically with pool size N. A 28-character lowercase passphrase offers ~131.6 bits of entropy, whereas a 9-character full-ASCII password offers only ~59.1 bits and is cracked in seconds on modern GPUs.",
    explanation: "Human memory struggles with arbitrary character substitutions, leading users to pick predictable patterns ('@' for 'a', '!' at end). Long passphrases provide exponential resistance against brute-force attacks.",
    hint: "Length contributes far more to the search space than character complexity substitutions.",
    level: "Basic",
    codeExample: `// Short Complex: 'P@$$w0rd!' (9 chars, N=95) → 2^59.1 combinations (~500B guesses, cracked in 10 sec on RTX 4090)
// Long Passphrase: 'bengal tiger barrackpore river' (30 chars, N=26) → 2^141 combinations (Billions of years to crack)`
  },
  {
    id: 3,
    question: "Why are cryptographic hash algorithms like MD5, SHA-1, and SHA-256 completely unsuitable for storing user passwords?",
    shortAnswer: "MD5, SHA-1, and SHA-256 are general-purpose cryptographic hashes engineered for maximum computation speed. Modern GPU rigs (RTX 4090) can compute over 50 billion SHA-256 hashes per second, enabling lightning-fast offline brute-force cracking.",
    explanation: "Password hashing strictly requires deliberately slow, computationally intensive Key Derivation Functions (KDFs) that enforce high CPU and memory costs.",
    hint: "General-purpose hashes are too fast; password storage requires deliberately slow, memory-hard algorithms.",
    level: "Basic",
    codeExample: `// Fast Hashes (UNSAFE for Passwords):
// SHA-256: 50,000,000,000 hashes/sec on RTX 4090 → 8-char password cracked in < 1 minute!
// Slow KDF (SAFE):
// Argon2id / Bcrypt: ~20,000 hashes/sec → 8-char password takes years to brute-force offline.`
  },
  {
    id: 4,
    question: "What is the purpose of a Cryptographic Salt in password storage, and what attacks does it defeat?",
    shortAnswer: "A salt is a cryptographically random, unique value (minimum 16 bytes) generated per user and concatenated with the plaintext password before hashing. It completely defeats Rainbow Table attacks and prevents identical passwords from producing identical hashes.",
    explanation: "Even if Susmita and Debangshu choose the exact same password ('Secret123'), their unique salts ensure their stored hashes in the database are completely distinct, forcing attackers to crack each password individually.",
    hint: "A unique random string appended before hashing to defeat precomputed lookup tables.",
    level: "Basic",
    codeExample: `// Salting Workflow:
const salt = crypto.randomBytes(16).toString('hex'); // 'a7f39b2e81c0d456'
const storedHash = bcrypt.hashSync("UserPassword", salt);
// Hash format includes salt: $2b$12$a7f39b2e81c0d456...`
  },
  {
    id: 5,
    question: "What is a Password Pepper and how does it differ from a Cryptographic Salt?",
    shortAnswer: "A pepper is a secret cryptographic key combined with passwords before hashing, but unlike a salt (which is stored publicly alongside the hash in the database), the pepper is stored separately in an external Key Management System (KMS) or Hardware Security Module (HSM).",
    explanation: "If an SQL injection breach dumps the user database, the attacker cannot crack hashes without also breaching the isolated HSM or environment variable holding the pepper.",
    hint: "Salt is public and per-user; pepper is secret, global, and stored outside the database.",
    level: "Moderate",
    codeExample: `// Salt vs Pepper:
// Database: [user_id: 101, salt: '9f8a...', hash: 'bcrypt_output...'] (Salt is stored here)
// KMS/HSM  : PEPPER_SECRET = 'k9#vL@8$xQ2!mP90' (Never stored in database)`
  },
  {
    id: 6,
    question: "How does Password Spraying differ from a traditional Brute-Force attack?",
    shortAnswer: "Brute-force tests thousands of password guesses against a single target account (quickly triggering account lockout thresholds). Password spraying tests 1 or 2 common passwords (e.g., 'Welcome2026!') across thousands of different user accounts to remain undetected.",
    explanation: "Password spraying circumvents threshold-based account lockouts (e.g., lock after 5 failed attempts) by spreading single failed attempts across an entire organization.",
    hint: "Brute force targets one user with many passwords; spraying targets many users with one password.",
    level: "Moderate",
    codeExample: `// Traditional Brute Force: Target 'susmita@bank.in' with 10,000 passwords → Account LOCKED after 5 attempts ❌
// Password Spraying: Target 5,000 employees with 1 password 'Spring2026!' → 0 lockouts triggered, 12 accounts breached ✔`
  },
  {
    id: 7,
    question: "What is Credential Stuffing and why is it so devastatingly effective against modern web applications?",
    shortAnswer: "Credential Stuffing is the automated injection of massive breach dumps of stolen username/password pairs (from third-party breaches) into target website login portals using botnets.",
    explanation: "Because over 60% of users reuse identical passwords across personal, banking, and corporate accounts, an unrelated breach at a gaming forum allows attackers to compromise corporate email accounts.",
    hint: "Exploits user password reuse across different unrelated websites using automated bots.",
    level: "Moderate",
    codeExample: `// Credential Stuffing Vector:
// 1. Attacker downloads 10,000,000 leaked emails/passwords from dark web.
// 2. Headless browser botnet tests pairs on banking portal at 100 req/sec.
// 3. 2% success rate yields 200,000 compromised financial accounts.`
  },
  {
    id: 8,
    question: "Why did NIST SP 800-63B eliminate the traditional requirement for mandatory periodic 90-day password resets?",
    shortAnswer: "Empirical behavioral research proved that frequent forced password resets cause users to select predictable incrementing transformations (e.g., 'Kolkata@2025' → 'Kolkata@2026') rather than creating secure passwords, actively reducing overall security.",
    explanation: "NIST now recommends changing passwords only when evidence exists that a compromise has occurred, while actively checking passwords against known breach lists.",
    hint: "Forced rotations lead to predictable substitutions and cognitive fatigue.",
    level: "Moderate",
    codeExample: `// Predictable Human Rotation Pattern:
// Q1: Winter2025! → Q2: Spring2025! → Q3: Summer2025! → Q4: Autumn2025!
// Attackers easily predict the current password with single-guess mutations.`
  },
  {
    id: 9,
    question: "Explain the internal mechanics of the Bcrypt Key Derivation Function and its cost factor.",
    shortAnswer: "Bcrypt is based on the Eksblowfish (Expensive Key Schedule Blowfish) block cipher. It utilizes an exponential cost parameter (work factor 2^cost); each increment of 1 doubles the calculation time and computational hardness.",
    explanation: "A cost factor of 12 executes 2^12 = 4,096 rounds of Blowfish key setup, requiring ~250ms on modern CPUs. This delay is imperceptible for a single user login but paralyses automated GPU cracking arrays.",
    hint: "Based on Blowfish cipher; cost factor doubles computation time with each integer increase.",
    level: "Moderate",
    codeExample: `// Bcrypt Hash Anatomy:
// $2b$12$e8Y7GvF4zR1nK9L3oP5tXu...
// [2b]    : Algorithm identifier (Bcrypt)
// [12]    : Cost factor (2^12 = 4,096 iterations)
// [16B]   : Salt embedded in string
// [24B]   : Computed ciphertext hash`
  },
  {
    id: 10,
    question: "What makes Argon2id superior to Bcrypt and PBKDF2 for password hashing in modern systems?",
    shortAnswer: "Argon2id combines Argon2d (data-dependent memory access for maximum GPU/ASIC resistance) and Argon2i (data-independent memory access for side-channel cache-timing attack resistance), winning the Password Hashing Competition (PHC).",
    explanation: "Argon2id forces cracking hardware to allocate configurable megabytes of physical RAM per hash instance, making mass-parallelized GPU and custom ASIC cracking hardware economically infeasible.",
    hint: "Memory-hard algorithm defeating ASICs, GPUs, and cache-timing side channels simultaneously.",
    level: "Expert",
    codeExample: `// Argon2id Parameters:
// time_cost (t)   : 3 iterations
// memory_cost (m) : 65,536 KB (64 MB RAM per hash)
// parallelism (p) : 4 CPU threads
// Attacker with 1,000,000 threads needs 64 Terabytes of ultra-fast VRAM to crack in parallel.`
  },
  {
    id: 11,
    question: "What is a Rainbow Table attack and how does cryptographic salting neutralize it completely?",
    shortAnswer: "A Rainbow Table is a precomputed lookup table mapping plaintext passwords to hashes using reduction functions to invert cryptographic hashes without brute-forcing. Unique salts alter every hash output, requiring an attacker to precompute an entire new multi-terabyte table for every individual user.",
    explanation: "Because storage of millions of individual rainbow tables is mathematically impossible, salting renders precomputed rainbow tables 100% obsolete.",
    hint: "Precomputed hash chains defeated because every user's salt requires a completely distinct table.",
    level: "Moderate",
    codeExample: `// Unsalted MD5: md5("password") = 5f4dcc3b5aa765d61d8327deb882cf99 → Instantly looked up in 1 millisecond.
// Salted: md5("password" + "9k2L#m") = 8e1b... → Must be recalculated from scratch.`
  },
  {
    id: 12,
    question: "How does the Linux /etc/shadow file structure password hashes and identify the hashing algorithm used?",
    shortAnswer: "Each entry follows the format '$id$salt$hash', where '$id' specifies the cryptographic algorithm: $1$ = MD5, $2a$/$2b$ = Bcrypt, $5$ = SHA-256, $6$ = SHA-512, and $y$ = Yescrypt.",
    explanation: "The shadow file is readable only by the root user, preventing unprivileged local users from extracting salted hashes for offline dictionary cracking.",
    hint: "$1=MD5, $5=SHA-256, $6=SHA-512, $y=Yescrypt in /etc/shadow.",
    level: "Moderate",
    codeExample: `// Linux Shadow File Entry:
// susmita:$6$q8Z1mP4v$3aJ9K2L8bO7...:19500:0:90:7:::
// [susmita] : Username
// [$6$]     : SHA-512 KDF identifier
// [q8Z1mP4v]: Cryptographic Salt
// [3aJ9...] : Salted SHA-512 Hash`
  },
  {
    id: 13,
    question: "Explain the vulnerability of Windows NTLM hashes stored in the SAM database or Active Directory NTDS.dit.",
    shortAnswer: "NTLM hashes are computed as MD4(UTF-16LE(password)) with ZERO salt and ZERO iterations. Identical passwords produce identical hashes across all domain accounts, and raw NTLM hashes can be directly replayed in Pass-the-Hash (PtH) network attacks.",
    explanation: "Because NTLM is unsalted, attackers dumping domain controller NTDS.dit files can crack billions of domain passwords per second using GPU arrays or use the hash directly without ever decrypting it.",
    hint: "Unsalted MD4 hash vulnerable to GPU cracking and Pass-the-Hash replay.",
    level: "Expert",
    codeExample: `// NTLM Vulnerability:
// Password: 'Password123'
// NTLM: 58a4781343f762909c4d8a240b51fec5 (Identical across all 10,000 users with this password!)
// Pass-the-Hash: Attacker sends raw hash over SMB port 445 → Full domain admin access granted.`
  },
  {
    id: 14,
    question: "What is a Side-Channel Timing Attack during password verification and how is it mitigated in code?",
    shortAnswer: "A timing attack measures nanosecond differences in string comparison execution time when standard equality ('==') returns false on the first mismatched character. It is mitigated by using constant-time string comparison functions.",
    explanation: "In standard comparison, 'pass' vs 'word' fails at character 0 (fast), while 'pass' vs 'passw' fails at character 4 (slower). Attackers analyze network timing variations to guess passwords byte-by-byte.",
    hint: "Standard comparison aborts early on mismatch; constant-time comparison always checks every byte.",
    level: "Expert",
    codeExample: `// Vulnerable early-exit comparison:
function vulnerableCompare(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false; // LEAKS TIMING INFORMATION ❌
  }
  return true;
}

// Secure constant-time comparison:
const crypto = require('crypto');
crypto.timingSafeEqual(Buffer.from(hashA), Buffer.from(hashB)); // SAFE ✔`
  },
  {
    id: 15,
    question: "What is the Diceware passphrase generation methodology and how much entropy does each word contribute?",
    shortAnswer: "Diceware uses physical 6-sided dice rolled 5 times per word to generate a 5-digit index (from 11111 to 66666) that selects a word from a 7,776-word dictionary. Each word provides log2(7776) = 12.92 bits of true cryptographic entropy.",
    explanation: "A 6-word Diceware passphrase (e.g., 'crane velvet anchor biscuit spider lamp') delivers 6 * 12.92 = 77.5 bits of high-quality entropy that is easy for humans to memorize while being uncrackable by supercomputers.",
    hint: "5 dice rolls select from 7,776 words, yielding ~12.92 bits per word.",
    level: "Moderate",
    codeExample: `// Diceware Rolls:
// Roll: [3, 1, 4, 2, 5] → Index 31425 → Word: "monsoon"
// 6 Words = 6 * 12.92 = 77.5 bits of true entropy.`
  },
  {
    id: 16,
    question: "What are Honeywords and how do they function as active deception in password security?",
    shortAnswer: "Honeywords are decoy false password hashes inserted alongside the user's real password hash in the database. If an attacker breaches the database and attempts to log in with a honeyword, the system immediately triggers a silent high-priority security alarm.",
    explanation: "Honeywords turn stolen credential databases into a minefield, allowing SOC teams to detect breaches in real time when adversaries test extracted credentials.",
    hint: "Fake password hashes stored in the database that alert security teams when used.",
    level: "Expert",
    codeExample: `// Honeywords Implementation:
// User 'debangshu' has 5 stored hashes:
// [Hash_1, Hash_2, Hash_3 (REAL), Hash_4, Hash_5]
// If attacker cracks Hash_1 and attempts login → SOC triggers silent lockdown & forensics.`
  },
  {
    id: 17,
    question: "Why can strict Account Lockout policies (e.g., locking accounts after 3 failed attempts) be weaponized into Denial of Service (DoS) attacks?",
    shortAnswer: "An unauthenticated adversary can write a script to submit 3 bogus passwords for every known corporate email address, automatically locking out the entire organization's workforce from their workstations and email.",
    explanation: "To prevent lockout DoS, modern systems use Progressive Delays (Exponential Backoff), IP rate limiting, and CAPTCHAs rather than permanent account lockouts.",
    hint: "Attackers intentionally trigger failed logins across all users to lock out the entire staff.",
    level: "Moderate",
    codeExample: `// Lockout DoS Script:
// Attacker iterates through public employee directory (1,000 accounts):
for user in company_users:
    submit_bad_password(user, "wrong_pass_123") x 3 # Entire company locked out on Monday 9 AM! ❌`
  },
  {
    id: 18,
    question: "Explain the concept of Exponential Backoff / Progressive Delay in login rate limiting.",
    shortAnswer: "Exponential backoff doubles the enforced wait time between successive failed login attempts from a specific IP or username (e.g., 1s → 2s → 4s → 8s → 16s → 32s).",
    explanation: "This allows legitimate human users who mistype a password to retry within seconds while slowing automated brute-force scripts down to a crawl without locking the user out.",
    hint: "Delay increases exponentially after each failure: t = base * 2^(failed_attempts).",
    level: "Basic",
    codeExample: `// Progressive Delay Calculation:
// Attempt 1: 0 sec delay
// Attempt 2: 1 sec delay
// Attempt 3: 2 sec delay
// Attempt 5: 8 sec delay
// Attempt 10: 512 sec (~8.5 minutes delay per guess)`
  },
  {
    id: 19,
    question: "How do Zero-Knowledge Password Proofs (such as SRP - Secure Remote Password protocol) protect credentials during authentication over insecure channels?",
    shortAnswer: "SRP allows a client to prove to a server that they possess the correct password without ever sending the plaintext password or password hash over the network, preventing credential interception even if TLS is decrypted.",
    explanation: "Using modular arithmetic and discrete logarithms, client and server derive a shared ephemeral session key based on password verifiers stored on the server.",
    hint: "Proves knowledge of the password mathematically without ever transmitting the password.",
    level: "Expert",
    codeExample: `// SRP Protocol (RFC 2945):
// 1. Client generates ephemeral key 'a' and sends A = g^a mod N
// 2. Server sends salt 's' and B = (k*v + g^b) mod N
// 3. Both compute shared secret key 'K' locally
// 4. Server confirms client knows password without receiving plaintext!`
  },
  {
    id: 20,
    question: "What is the security risk of using SMS password reset links or security questions (KBA - Knowledge-Based Authentication)?",
    shortAnswer: "Security questions ('Mother's maiden name', 'First pet') rely on static, publicly discoverable information easily harvested from social media (Facebook, LinkedIn). SMS reset links are vulnerable to SIM swapping and SS7 cell tower routing attacks.",
    explanation: "NIST SP 800-63B explicitly deprecates Knowledge-Based Authentication as an insecure single-factor recovery mechanism.",
    hint: "Answers to security questions are easily researched on social media; SMS is intercepted via SIM swaps.",
    level: "Basic",
    codeExample: `// Insecure KBA:
// Question: "What city were you born in?" → Attacker checks target's Facebook profile → "Barrackpore" → Bypassed in 5 seconds! ❌`
  },
  {
    id: 21,
    question: "What is Offline Password Cracking and why is it vastly more dangerous than Online Password Cracking?",
    shortAnswer: "Online cracking attacks a live server login form, subject to network latency, rate limits, CAPTCHAs, and firewalls. Offline cracking attacks a stolen password database dump locally on dedicated GPU clusters with zero network bottlenecks and zero lockout restrictions.",
    explanation: "In an offline attack, the adversary controls the execution environment and can test billions of candidate hashes per second using Hashcat or John the Ripper.",
    hint: "Online is throttled by web servers; offline runs locally on multi-GPU hardware at billions of guesses per second.",
    level: "Basic",
    codeExample: `// Online vs Offline:
// Online  : 5 guesses/sec (Server rate limit enforced) → 100,000 guesses takes 5.5 hours.
// Offline : 50,000,000,000 guesses/sec (Hashcat on 8x RTX 4090) → 100,000,000,000 guesses in 2 seconds.`
  },
  {
    id: 22,
    question: "How does a Hybrid Wordlist Attack operate in tools like Hashcat or John the Ripper?",
    shortAnswer: "A Hybrid attack takes dictionary words from lists like rockyou.txt and systematically applies transformation rules (e.g., leet-speak substitutions, appending years, prepending symbols, capitalizing first letters).",
    explanation: "Because humans follow predictable habits (e.g., 'password' → 'P@ssw0rd2026!'), transformation rules allow attackers to crack complex-looking passwords in fractions of a second.",
    hint: "Combines base dictionary words with automated mutation rules (e.g., appending '2026!').",
    level: "Moderate",
    codeExample: `// Hashcat Rule Syntax:
// Base word: "kolkata"
// Rule: c $2 $0 $2 $6 $!
// Output candidate: "Kolkata2026!"`
  },
  {
    id: 23,
    question: "What are the primary attack vectors for Hardware Keyloggers and how are they detected?",
    shortAnswer: "Hardware keyloggers are physical USB/PS/2 inline adapters or malicious keyboard firmware implants placed between the keyboard cable and workstation USB port. They record raw keystrokes directly to onboard flash memory, bypassing all OS antivirus software.",
    explanation: "Detection requires physical workstation port inspection, port-blocking physical locks, USB device whitelisting (802.1X / endpoint control), and visual cable audits.",
    hint: "Physical dongles connected between keyboard and PC; undetected by software antivirus.",
    level: "Moderate",
    codeExample: `// Hardware Keylogger Vector:
// Keyboard Cable → [MALICIOUS HARDWARE KEYLOGGER DONGLE] → PC Motherboard USB Port
// Intercepts all BIOS, BitLocker, and OS login keystrokes in raw hardware memory.`
  },
  {
    id: 24,
    question: "How does PBKDF2 (Password-Based Key Derivation Function 2) slow down brute-force attacks and what is the current recommended iteration count?",
    shortAnswer: "PBKDF2 applies a pseudorandom function (like HMAC-SHA256) repeatedly in an iterated loop. OWASP currently recommends a minimum of 600,000 iterations for PBKDF2-HMAC-SHA256.",
    explanation: "By executing 600,000 sequential cryptographic hashing operations per guess, calculating a single password candidate takes several milliseconds, severely crippling GPU cracking throughput.",
    hint: "Iterates HMAC hashing hundreds of thousands of times to amplify computational difficulty.",
    level: "Moderate",
    codeExample: `// PBKDF2 in Node.js Crypto:
const crypto = require('crypto');
const salt = crypto.randomBytes(16);
const derivedKey = crypto.pbkdf2Sync('UserPass123!', salt, 600000, 32, 'sha256');`
  },
  {
    id: 25,
    question: "What is the Zero-Knowledge Architecture implemented by modern password managers like Bitwarden and 1Password?",
    shortAnswer: "The user's Master Password is used locally on client devices to derive an encryption key (via Argon2id/PBKDF2) that encrypts the vault with AES-256-GCM before syncing. The cloud servers store and transmit only fully encrypted blobs, never having access to the master key or vault plaintext.",
    explanation: "Even if the password manager's cloud database is seized or compromised by nation-state actors, the encrypted vaults remain completely unreadable without the user's master key.",
    hint: "Client encrypts data before sending to the server; the server has zero knowledge of the master key.",
    level: "Moderate",
    codeExample: `// Zero-Knowledge Vault Encryption:
// Client Side: MasterPass + Salt → Argon2id → AES-256 Key → Encrypts Vault → Sends Ciphertext Blob to Cloud.
// Cloud Server: Stores only ciphertext { "vault_data": "7f8a9e...encrypted..." }`
  },
  {
    id: 26,
    question: "What is Pass-the-Hash (PtH) and why does salting inside the application layer fail to protect against it if the operating system stores unsalted hashes?",
    shortAnswer: "Pass-the-Hash is an attack where an adversary steals raw NTLM/Kerberos hashes directly from LSASS process memory on Windows and authenticates to other network hosts over SMB/RPC without ever cracking the hash into plaintext.",
    explanation: "Because Windows NTLM authentication uses the hash itself as the authentication credential, possessing the hash is equivalent to possessing the plaintext password.",
    hint: "Attacker uses the raw extracted hash directly to authenticate across the network without decrypting it.",
    level: "Expert",
    codeExample: `// Pass-the-Hash Attack:
// 1. Attacker runs Mimikatz on compromised host: extracts NTLM hash of Admin.
// 2. Attacker executes: psexec.py -hashes :58a4781343f76290... Administrator@10.14.0.10
// 3. Target server accepts the hash and spawns elevated SYSTEM shell!`
  },
  {
    id: 27,
    question: "Explain the HaveIBeenPwned k-Anonymity model for checking compromised passwords securely.",
    shortAnswer: "The client computes the SHA-1 hash of the password, takes only the first 5 characters (the prefix), and sends them to the API. The server returns all compromised hashes starting with that 5-character prefix (~500 hashes), and the client searches the list locally.",
    explanation: "Because only a 5-character prefix is transmitted over the wire, the HaveIBeenPwned server never learns the user's actual password hash or plaintext password.",
    hint: "Sends only first 5 hex characters of hash; client searches returned matches locally.",
    level: "Expert",
    codeExample: `// k-Anonymity Password Checking:
// SHA-1("password") = 5BAA61E4C9B93F3F0682250B6CF8331B7EE68FD8
// Client sends: GET /range/5BAA6
// Server returns: 500 hash suffixes. Client matches "1E4C9B93F..." locally to detect breach!`
  },
  {
    id: 28,
    question: "How does Scrypt achieve ASIC resistance compared to PBKDF2 and Bcrypt?",
    shortAnswer: "Scrypt is a memory-hard key derivation function that generates a large pseudo-random vector array in RAM (configurable megabytes/gigabytes) and performs unpredictable lookups across memory addresses.",
    explanation: "Custom ASIC hardware chips have massive computational power but limited on-die RAM. Requiring gigabytes of fast RAM per hashing thread makes mass-parallelized ASIC cracking prohibitively expensive to build.",
    hint: "Forces large random memory lookups, crippling memory-poor custom ASIC cracking chips.",
    level: "Expert",
    codeExample: `// Scrypt Parameters:
// N = CPU/Memory cost (e.g., 2^15 = 32,768)
// r = Block size (e.g., 8 → 1024 bytes)
// p = Parallelization factor (e.g., 1)
// RAM Required = 128 * N * r * p = 32 Megabytes per hash instance.`
  },
  {
    id: 29,
    question: "What is an Insecure Direct Object Reference (IDOR) flaw in password reset endpoints and how is it exploited?",
    shortAnswer: "An IDOR flaw occurs when a password reset confirmation request identifies the target account via a predictable parameter (such as user_id=105 or email=susmita@bank.in) without validating a cryptographically secure, unguessable reset token.",
    explanation: "An attacker intercepts the password reset request and modifies the user_id parameter to target the administrator account, resetting the admin's password to an attacker-controlled string.",
    hint: "Allows changing any user's password by modifying an unvalidated user ID in the reset request.",
    level: "Moderate",
    codeExample: `// Vulnerable Reset Request:
// POST /api/reset-password
// { "user_id": 105, "new_password": "HackedPassword123!" } ❌ IDOR: Attacker changes 105 to 1 (Admin)

// Secure Reset Request:
// POST /api/reset-password
// { "token": "a9f3b7c2...cryptographically_random_256bit_token...", "new_password": "..." } ✔`
  },
  {
    id: 30,
    question: "In a forensic audit of a municipal treasury in Barrackpore, 80% of staff used 8-character passwords meeting complex composition rules (Upper, Lower, Number, Symbol). Why were they all cracked within 4 hours during a penetration test?",
    shortAnswer: "Mandating strict composition rules without length requirements causes humans to follow standard predictable templates: Capital first letter, lowercase word, single digit, ending symbol (e.g., 'Bengal@1' or 'Summer2026!').",
    explanation: "Attackers use mask attacks targeted at the ?u?l?l?l?l?l?d?s character structure, reducing the search space from 95^8 = 6.6 * 10^15 down to 26 * 26^5 * 10 * 33 = 2.7 * 10^9 combinations, which cracks in seconds on a basic penetration testing laptop.",
    hint: "Composition rules force predictable human masking templates (e.g., Upper + 5 Lower + Digit + Symbol).",
    level: "Expert",
    codeExample: `// Mask Attack against 8-char composition rule:
// Full ASCII 8-char search space: 95^8 = 6,634,204,312,890,625
// Predictable human mask (?u?l?l?l?l?l?d?s): 26 * 11,881,376 * 10 * 33 = 101,942,206,080
// 65,000x smaller search space! Cracks in under 2 seconds on RTX 4090.`
  }
];

export default questions;
