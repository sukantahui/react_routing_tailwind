export default [
  {
    "id": 1,
    "question": "Which of the following protocols operates at the Transport Layer and provides 100% reliable in-order byte stream delivery with acknowledgements?",
    "options": [
      "IP",
      "TCP",
      "UDP",
      "HTTP"
    ],
    "correctAnswer": 1,
    "explanation": "TCP provides connection-oriented, reliable, sequenced byte-stream delivery with retransmissions and flow control.",
    "hint": "Transmission Control Protocol."
  },
  {
    "id": 2,
    "question": "What is the standard port assignment for unencrypted HTTP and encrypted HTTPS respectively?",
    "options": [
      "Port 21 and Port 22",
      "Port 25 and Port 110",
      "Port 80 and Port 443",
      "Port 53 and Port 69"
    ],
    "correctAnswer": 2,
    "explanation": "HTTP operates over TCP Port 80; HTTPS operates over TCP Port 443.",
    "hint": "Port 80 and Port 443."
  },
  {
    "id": 3,
    "question": "Which email protocol is used to PUSH outgoing mail from an email client to a mail server?",
    "options": [
      "POP3",
      "IMAP",
      "SMTP",
      "HTTP"
    ],
    "correctAnswer": 2,
    "explanation": "SMTP (Simple Mail Transfer Protocol) is strictly a push protocol for sending outgoing mail.",
    "hint": "Simple Mail Transfer Protocol."
  },
  {
    "id": 4,
    "question": "Why is IMAP superior to POP3 for users who access email across multiple synchronized devices?",
    "options": [
      "Because IMAP stores messages centrally on the server and synchronizes folder states across all devices in real time.",
      "Because IMAP deletes emails immediately to free up hard drive space.",
      "Because IMAP requires no internet connection.",
      "Because IMAP sends emails faster than light."
    ],
    "correctAnswer": 0,
    "explanation": "IMAP maintains a central server repository, synchronizing read/unread status and folders across smartphones and PCs.",
    "hint": "Central server storage and multi-device synchronization."
  },
  {
    "id": 5,
    "question": "Which protocol is used for remote command-line login that encrypts all passwords and transmitted session data over TCP Port 22?",
    "options": [
      "Telnet",
      "SSH (Secure Shell)",
      "FTP",
      "SNMP"
    ],
    "correctAnswer": 1,
    "explanation": "SSH encrypts all terminal traffic on Port 22, replacing cleartext Telnet (Port 23).",
    "hint": "Secure Shell on Port 22."
  },
  {
    "id": 6,
    "question": "What technology enables voice telephone calls to be digitized, packetized, and transmitted over IP networks?",
    "options": [
      "VoIP (Voice over Internet Protocol)",
      "PSTN",
      "BNC",
      "RS-232"
    ],
    "correctAnswer": 0,
    "explanation": "VoIP digitizes voice audio and routes it as packets over IP networks, slashing long-distance calling costs.",
    "hint": "Voice over Internet Protocol."
  },
  {
    "id": 7,
    "question": "Which of the following is an accurate distinction between HTML and XML?",
    "options": [
      "HTML uses predefined tags to display data; XML uses custom user-defined tags to describe and transport data.",
      "HTML is for databases; XML is for monitors.",
      "HTML is case-sensitive; XML is case-insensitive.",
      "There is no difference."
    ],
    "correctAnswer": 0,
    "explanation": "HTML focuses on how data looks using predefined tags; XML describes what data is using custom tags.",
    "hint": "Predefined display tags vs custom data transport tags."
  },
  {
    "id": 8,
    "question": "What service translates human-friendly domain names like `www.cbse.gov.in` into machine-routable numerical IP addresses?",
    "options": [
      "DHCP",
      "DNS (Domain Name System)",
      "ARP",
      "FTP"
    ],
    "correctAnswer": 1,
    "explanation": "DNS resolves hostnames to numerical IP addresses.",
    "hint": "Domain Name System."
  },
  {
    "id": 9,
    "question": "What is the size of an IPv4 address compared to an IPv6 address?",
    "options": [
      "IPv4 is 32 bits (4 bytes); IPv6 is 128 bits (16 bytes).",
      "IPv4 is 16 bits; IPv6 is 32 bits.",
      "IPv4 is 48 bits; IPv6 is 64 bits.",
      "IPv4 is 64 bits; IPv6 is 256 bits."
    ],
    "correctAnswer": 0,
    "explanation": "IPv4 uses 32 bits; IPv6 was created to solve address exhaustion using 128 bits.",
    "hint": "32 bits vs 128 bits."
  },
  {
    "id": 10,
    "question": "How does a Computer Worm differ from a Computer Virus?",
    "options": [
      "A Worm is a standalone self-replicating program that spreads autonomously over networks; a Virus requires a host program and user execution.",
      "A Worm is hardware; a Virus is software.",
      "A Worm is harmless; a Virus is destructive.",
      "There is no difference."
    ],
    "correctAnswer": 0,
    "explanation": "Viruses require host files and user execution; worms spread autonomously across networks.",
    "hint": "Autonomous standalone replication vs host file requirement."
  },
  {
    "id": 11,
    "question": "What malware disguises itself as legitimate or harmless software to trick users into installing it?",
    "options": [
      "Trojan Horse",
      "Macro Virus",
      "Network Sniffer",
      "Keylogger"
    ],
    "correctAnswer": 0,
    "explanation": "Trojan horses masquerade as desirable software while carrying hidden malicious payloads; they do not self-replicate.",
    "hint": "Deceptive masquerader named after Greek myth."
  },
  {
    "id": 12,
    "question": "What cyber attack involves sending fraudulent emails masquerading as banks or official entities to steal passwords and financial credentials?",
    "options": [
      "Phishing",
      "DDoS",
      "Typosquatting",
      "Smurfing"
    ],
    "correctAnswer": 0,
    "explanation": "Phishing uses deceptive emails and clone websites to trick victims into revealing sensitive information.",
    "hint": "Deceptive social engineering email attack."
  },
  {
    "id": 13,
    "question": "What attack utilizes thousands of compromised zombie devices (a botnet) to overwhelm a server with bogus traffic and take it offline?",
    "options": [
      "Distributed Denial of Service (DDoS)",
      "Single DoS",
      "Man-in-the-Middle",
      "Eavesdropping"
    ],
    "correctAnswer": 0,
    "explanation": "DDoS uses distributed botnets to flood target servers with volumetric traffic.",
    "hint": "Distributed Denial of Service."
  },
  {
    "id": 14,
    "question": "What network security component monitors and filters incoming and outgoing traffic based on predefined security rules?",
    "options": [
      "Firewall",
      "Repeater",
      "Hub",
      "Unmanaged Switch"
    ],
    "correctAnswer": 0,
    "explanation": "A Firewall enforces access control policies to shield trusted networks from unauthorized external access.",
    "hint": "Perimeter security filter."
  },
  {
    "id": 15,
    "question": "What is an Ethical Hacker (White Hat)?",
    "options": [
      "A computer security expert who audits systems with legal authorization to identify and fix security vulnerabilities.",
      "A criminal who steals bank account passwords.",
      "A person who sells stolen software.",
      "A virus developer."
    ],
    "correctAnswer": 0,
    "explanation": "Ethical hackers use their skills lawfully with owner consent to harden security defenses.",
    "hint": "Authorized security expert working constructively."
  },
  {
    "id": 16,
    "question": "What does the `HttpOnly` cookie flag accomplish?",
    "options": [
      "It blocks client-side JavaScript from accessing the cookie, protecting session tokens from Cross-Site Scripting (XSS) theft.",
      "It deletes the cookie every 5 minutes.",
      "It displays a warning banner.",
      "It translates cookies into HTML."
    ],
    "correctAnswer": 0,
    "explanation": "`HttpOnly` instructs browsers not to expose cookies to `document.cookie` in JavaScript.",
    "hint": "Prevents JavaScript access to cookies."
  },
  {
    "id": 17,
    "question": "Which of the following represents a valid private IPv4 address range according to RFC 1918?",
    "options": [
      "192.168.0.0 to 192.168.255.255",
      "203.0.113.0 to 203.0.113.255",
      "8.8.8.0 to 8.8.8.255",
      "1.1.1.0 to 1.1.1.255"
    ],
    "correctAnswer": 0,
    "explanation": "`192.168.0.0/16` is private Class C address space.",
    "hint": "192.168.x.x range."
  },
  {
    "id": 18,
    "question": "What is the primary vulnerability of unencrypted Telnet over TCP Port 23?",
    "options": [
      "It transmits all administrative credentials and commands in plain, readable ASCII text, easily intercepted by network sniffers.",
      "It only runs on Linux servers.",
      "It requires expensive gold-plated cables.",
      "It cannot transmit numbers."
    ],
    "correctAnswer": 0,
    "explanation": "Telnet sends usernames and passwords in cleartext without encryption.",
    "hint": "Transmits credentials in cleartext."
  },
  {
    "id": 19,
    "question": "In standard FTP architecture, which port is used for the Control Connection and which port for the Data Connection in Active Mode?",
    "options": [
      "Port 21 for Control; Port 20 for Data",
      "Port 80 for Control; Port 443 for Data",
      "Port 25 for Control; Port 110 for Data",
      "Port 22 for Control; Port 23 for Data"
    ],
    "correctAnswer": 0,
    "explanation": "FTP uses Port 21 for commands and Port 20 for data streaming.",
    "hint": "Port 21 and Port 20."
  },
  {
    "id": 20,
    "question": "What malware locks and encrypts a user's files and demands an extortion payment in cryptocurrency for the decryption key?",
    "options": [
      "Ransomware",
      "Adware",
      "Spyware",
      "Logic Bomb"
    ],
    "correctAnswer": 0,
    "explanation": "Ransomware encrypts victim data and demands a ransom.",
    "hint": "Extortion via file encryption."
  },
  {
    "id": 21,
    "question": "What protocol operates over UDP to transport real-time voice and video payloads in VoIP?",
    "options": [
      "RTP (Real-time Transport Protocol)",
      "TCP",
      "HTTP",
      "SMTP"
    ],
    "correctAnswer": 0,
    "explanation": "RTP carries real-time multimedia streams over UDP.",
    "hint": "Real-time Transport Protocol."
  },
  {
    "id": 22,
    "question": "What type of attack involves altering the source IP address in packet headers to conceal identity or impersonate another system?",
    "options": [
      "IP Spoofing",
      "Shoulder Surfing",
      "Dumpster Diving",
      "Tailgating"
    ],
    "correctAnswer": 0,
    "explanation": "IP Spoofing forges the source address in IP packet headers.",
    "hint": "Forging the source IP address."
  },
  {
    "id": 23,
    "question": "What type of web hosting provisions isolated virtual servers with dedicated CPU/RAM partitioned from a single physical machine?",
    "options": [
      "VPS (Virtual Private Server)",
      "Shared Hosting",
      "Dial-up Hosting",
      "Colocation"
    ],
    "correctAnswer": 0,
    "explanation": "VPS uses virtualization hypervisors to grant dedicated virtual slices of a server.",
    "hint": "Virtual Private Server."
  },
  {
    "id": 24,
    "question": "What is 'Drive-by Download'?",
    "options": [
      "The unintentional installation of malware onto a user's computer simply by visiting a compromised web page, without clicking any download link.",
      "Downloading software while driving a vehicle.",
      "Ordering a physical CD-ROM online.",
      "Downloading files onto an external flash drive."
    ],
    "correctAnswer": 0,
    "explanation": "Drive-by downloads exploit browser bugs to install malware silently when loading a web page.",
    "hint": "Silent installation upon visiting a compromised page."
  },
  {
    "id": 25,
    "question": "In a CBSE Class 12 board examination case study, an educational institution wants to publish an online examination fee payment portal. Which protocol and which security mechanism MUST be deployed to protect student banking data?",
    "options": [
      "HTTPS (Port 443) using SSL/TLS encryption and a Hardware/Software Firewall at the gateway.",
      "Plain HTTP (Port 80) and unmanaged hubs.",
      "Telnet (Port 23) and dial-up modems.",
      "POP3 (Port 110) without passwords."
    ],
    "correctAnswer": 0,
    "explanation": "HTTPS encrypts sensitive web transactions over Port 443, while a gateway firewall protects the server infrastructure from unauthorized external intrusion.",
    "hint": "HTTPS for encrypted web traffic + Firewall for perimeter defense."
  }
];
