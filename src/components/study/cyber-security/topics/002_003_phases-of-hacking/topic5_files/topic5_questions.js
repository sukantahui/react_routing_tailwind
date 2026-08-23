const questions = [
  {
    question: "What is the primary objective of 'Phase 3: Gaining Access' in the ethical hacking and penetration testing methodology?",
    shortAnswer: "To actively exploit identified vulnerabilities in software, network protocols, or human behavior to deploy shellcode and establish an initial interactive foothold on the target system.",
    explanation: "While Phase 1 (Reconnaissance) and Phase 2 (Scanning) are non-destructive information gathering, Phase 3 (Gaining Access / Exploitation) actively weaponizes that intelligence. The tester executes exploit code to achieve remote command execution, bypass authentication, or obtain an interactive shell session.",
    hint: "Think about turning the key in the unlocked lock to step inside the room.",
    level: "basic",
    codeExample: `// Phase 3 Exploitation Objective:
// Vulnerability Identified -> Exploit Triggered -> Shellcode Executed -> Interactive Foothold Established!`
  },
  {
    question: "What are the core technical differences between a 'Vulnerability', an 'Exploit', and a 'Payload'?",
    shortAnswer: "A Vulnerability is the underlying flaw; an Exploit is the code that triggers the flaw; a Payload is the shellcode or command executed once the exploit succeeds.",
    explanation: "Understanding the distinction is vital: 1. Vulnerability: A buffer overflow flaw in an SMB daemon (e.g. MS17-010); 2. Exploit: The Python or Metasploit script sending malformed packets to overflow the buffer; 3. Payload: The Meterpreter reverse shell that connects back to the tester's laptop.",
    hint: "The Vulnerability is the hole; the Exploit is the drill; the Payload is the spy listening device placed inside.",
    level: "basic",
    codeExample: `// Attack Anatomy Matrix:
const attackTriad = {
  vulnerability: "MS17-010 (EternalBlue SMBv1 Buffer Overflow)",
  exploit: "exploit/windows/smb/ms17_010_eternalblue",
  payload: "windows/x64/meterpreter/reverse_tcp"
};`
  },
  {
    question: "Why do penetration testers and threat actors overwhelmingly prefer 'Reverse TCP Shells' over 'Bind TCP Shells'?",
    shortAnswer: "Reverse TCP shells connect outward from the victim to the attacker on common ports (443/80), easily bypassing NAT routers and stateful inbound firewall rules.",
    explanation: "In a Bind Shell, the victim opens a listening port (e.g. 4444); perimeter firewalls almost always block unsolicited inbound connections. In a Reverse Shell, the victim initiates an outbound connection to the attacker's public IP on standard allowed ports (HTTPS 443 or DNS 53), which default outbound firewall rules permit.",
    hint: "Outbound calls from inside the office are allowed, whereas unsolicited inbound calls to internal desks are blocked by security.",
    level: "moderate",
    codeExample: `// Reverse Shell (Outward Egress):
// Victim (192.168.1.50) --- Outbound Port 443 ---> Attacker Listener (203.0.113.10:443) [Bypasses Inbound Firewalls!]

// Bind Shell (Inward Ingress):
// Attacker ---> Inbound Port 4444 ---> Victim (192.168.1.50) [BLOCKED by Firewall!]`
  },
  {
    question: "What is 'HTML Smuggling' and how does it deliver weaponized payloads directly into browser memory?",
    shortAnswer: "Using client-side JavaScript (HTML5 Blob and File API) to assemble malicious payload files locally inside the victim's browser RAM, evading perimeter email and network content filters.",
    explanation: "Traditional network firewalls and secure email gateways inspect attachments traversing the wire. In HTML Smuggling, the email contains a simple HTML file with obfuscated JavaScript. When the user opens the HTML, JavaScript constructs a binary Blob in browser memory and triggers an automatic browser download (`window.URL.createObjectURL`), delivering the payload without it ever traveling across the wire as a recognizable `.exe` or `.iso` file.",
    hint: "Assembling the puzzle pieces inside the recipient's bedroom rather than shipping a completed suspicious box.",
    level: "expert",
    codeExample: `// Simplified HTML Smuggling JavaScript:
const rawBytes = atob("TVqQAAMAAAAEAAAA//8AALgAAAAAAAAAQAA..."); // Base64 payload
const byteNumbers = new Uint8Array(rawBytes.length);
for (let i = 0; i < rawBytes.length; i++) byteNumbers[i] = rawBytes.charCodeAt(i);
const blob = new Blob([byteNumbers], {type: "application/octet-stream"});
const link = document.createElement("a");
link.href = window.URL.createObjectURL(blob);
link.download = "Invoice.iso";
link.click(); // Auto-downloads from browser RAM!`
  },
  {
    question: "What is 'EternalBlue' (MS17-010 / CVE-2017-0143) and why is it one of the most destructive Remote Service Exploits in history?",
    shortAnswer: "A critical buffer overflow vulnerability in Microsoft's Server Message Block v1 (SMBv1) driver (`srv.sys`) that allows unauthenticated attackers to execute arbitrary code with highest SYSTEM kernel privileges over port 445.",
    explanation: "Developed by the NSA and leaked by the Shadow Brokers in 2017, EternalBlue weaponized mathematical flaws in SMBv1 transaction handling. Attackers sent crafted packets to port 445 on unpatched Windows machines, executing shellcode in kernel space without needing any user credentials. It powered the global WannaCry and NotPetya ransomware outbreaks.",
    hint: "The famous SMBv1 kernel buffer overflow used by WannaCry to spread automatically without passwords.",
    level: "expert",
    codeExample: `// EternalBlue Exploitation Profile:
// Protocol: SMBv1 (Port 445)
// Target Driver: srv.sys (Windows Kernel)
// Attained Privilege: NT AUTHORITY\\SYSTEM (Highest OS Level)`
  },
  {
    question: "How do 'Address Space Layout Randomization' (ASLR) and 'Data Execution Prevention' (DEP / NX) defend against memory corruption exploits?",
    shortAnswer: "DEP prevents code execution from stack/heap memory pages; ASLR randomizes the memory addresses of program code, stack, and libraries upon boot, breaking hardcoded buffer overflow jumps.",
    explanation: "DEP (Data Execution Prevention / Write XOR Execute) marks data buffers (like user input strings on the stack) as non-executable; if CPU instruction pointer EIP/RIP tries to execute shellcode on the stack, the OS crashes the program. ASLR randomizes memory offsets on every boot, preventing attackers from predicting the exact memory addresses needed for Return-Oriented Programming (ROP) chains.",
    hint: "DEP makes user data non-executable; ASLR randomizes memory addresses so attackers cannot find where code lives.",
    level: "expert",
    codeExample: `// Memory Defense Duo:
// DEP/NX : Memory Page = [Readable + Writable] OR [Readable + Executable] (NEVER BOTH!)
// ASLR   : Base Address of ntdll.dll changes randomly on every reboot (e.g. 0x7fff01a4 vs 0x7fff89c2)`
  },
  {
    question: "What is the difference between 'Staged' and 'Stageless' Metasploit payloads?",
    shortAnswer: "Staged payloads use a tiny initial stub (Stager) that connects back to download the heavy payload (Stage 2) into RAM; Stageless payloads contain the entire payload in one monolithic binary.",
    explanation: "When buffer space is limited in a memory exploit (e.g. only 300 bytes allowed), a tester uses a Staged payload (`windows/meterpreter/reverse_tcp`): the 250-byte stager connects back to Metasploit and streams the 1 MB Meterpreter DLL directly into RAM. In contrast, Stageless payloads (`windows/meterpreter_reverse_tcp`) embed everything upfront, useful when network connections back to the handler are unreliable or monitored by strict firewalls.",
    hint: "Staged downloads the rest of the spy tools in small pieces; Stageless carries the entire toolbag at once.",
    level: "moderate",
    codeExample: `// Metasploit Payload Syntax Distinction:
// Staged   : windows/x64/meterpreter/reverse_tcp  (Slash after meterpreter = Staged)
// Stageless: windows/x64/meterpreter_reverse_tcp (Underscore = Single monolithic binary)`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 66, what constitutes the criminal offense of hacking during Phase 3?",
    shortAnswer: "Dishonestly or fraudulently accessing, altering, damaging, or destroying computer data or systems without authorization carries imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Executing exploit payloads against computer systems without explicit, signed, written authorization (Rules of Engagement) is a non-bailable criminal offense under Section 66 and Section 43 of the IT Act. Ethical hackers must always operate strictly within signed contractual scopes.",
    hint: "Section 66 punishes unauthorized exploitation with up to 3 years in prison and ₹5 Lakh fines.",
    level: "basic",
    codeExample: `// Statutory Liability (IT Act Section 66):
// Offense: Executing unauthorized Phase 3 exploits against target infrastructure
// Sanction: Imprisonment for a term up to 3 Years + Fine up to ₹5,00,000`
  },
  {
    question: "What is 'Non-Destructive Proof-of-Concept' (PoC) testing in ethical penetration testing?",
    shortAnswer: "Demonstrating that a vulnerability exists and is exploitable using harmless commands (e.g. `whoami`, `id`, `SELECT @@version`) without modifying data or disrupting live production services.",
    explanation: "Professional penetration testers never execute destructive actions like dropping database tables or overwriting system files. When an SQLi or RCE vulnerability is discovered, the tester executes safe commands like `whoami` or `hostname` to prove code execution to the client while preserving system availability and data integrity.",
    hint: "Proving the door is unlocked by taking a photo of the doorway rather than breaking the furniture inside.",
    level: "basic",
    codeExample: `// Ethical Non-Destructive PoC:
// Bad / Destructive  : DROP TABLE customers; rm -rf /
// Good / Professional: SELECT @@version; whoami; hostname`
  },
  {
    question: "Synthesize the golden rules of Phase 3 (Gaining Access) for computer science and cybersecurity scholars in West Bengal.",
    shortAnswer: "Always obtain a signed Rules of Engagement contract; execute non-destructive proof-of-concepts; favor outbound Reverse TCP shells; understand memory protections (ASLR/DEP); and adhere to Section 66 of the IT Act.",
    explanation: "Phase 3 transforms theoretical vulnerability knowledge into verified security risk analysis. By demonstrating how exploits bypass firewalls and how memory protections mitigate attacks, ethical penetration testers help organizations harden infrastructure, deploy Web Application Firewalls, and achieve true cyber resilience.",
    hint: "Signed authorization + Safe proof-of-concept + Reverse shells + Understanding ASLR/DEP + Legal compliance.",
    level: "moderate",
    codeExample: `// The Ethical Exploitation Creed:
// 1. Signed Authorization (RoE) FIRST
// 2. Non-Destructive Proofs ONLY (whoami)
// 3. Document Precise Remediation (ASLR, WAF, Patching)`
  }
];

export default questions;
