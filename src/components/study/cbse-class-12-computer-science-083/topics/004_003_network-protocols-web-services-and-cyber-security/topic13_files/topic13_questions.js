export default [
  {
    "id": 1,
    "question": "A company's online retail server becomes completely unreachable during a festive sale due to a coordinated flood of traffic from 100,000 compromised IoT devices across the globe. What specific attack has occurred?",
    "options": [
      "Distributed Denial of Service (DDoS) attack",
      "Macro Virus infection",
      "Smishing scam",
      "DNS reverse lookup error"
    ],
    "correctAnswer": 0,
    "explanation": "A massive, multi-device coordinated assault designed to exhaust server bandwidth and compute capacity is a classic botnet-driven DDoS attack.",
    "hint": "Distributed Denial of Service."
  },
  {
    "id": 2,
    "question": "An employee receives an urgent email appearing to come from the company's IT support department asking them to click a link and confirm their login password. What type of attack is this?",
    "options": [
      "Spear Phishing",
      "Ping of Death",
      "Active Hub failure",
      "Bus topology reflection"
    ],
    "correctAnswer": 0,
    "explanation": "A targeted fraudulent communication masquerading as an internal trusted entity to steal employee credentials is Spear Phishing.",
    "hint": "Targeted phishing attack."
  },
  {
    "id": 3,
    "question": "Which protocol should a system administrator use to securely log into and manage a remote Linux server over the public Internet?",
    "options": [
      "SSH (Secure Shell) on Port 22",
      "Telnet on Port 23",
      "FTP on Port 21",
      "HTTP on Port 80"
    ],
    "correctAnswer": 0,
    "explanation": "SSH operates on Port 22 and provides end-to-end encryption for remote command-line administration, replacing cleartext Telnet.",
    "hint": "SSH on Port 22."
  },
  {
    "id": 4,
    "question": "What is the primary role of SMTP in email architecture?",
    "options": [
      "To push outgoing emails from a client to the mail server and relay emails between mail servers.",
      "To download emails and delete them from the server.",
      "To synchronize email folders across multiple devices.",
      "To convert text files into MP3 audio."
    ],
    "correctAnswer": 0,
    "explanation": "SMTP (Simple Mail Transfer Protocol) is strictly a push protocol for dispatching and relaying outgoing electronic mail.",
    "hint": "Pushing outgoing email."
  },
  {
    "id": 5,
    "question": "Why should an e-commerce website use HTTPS rather than HTTP?",
    "options": [
      "HTTPS encrypts customer credit card and password data using SSL/TLS, preventing packet sniffing and tampering over the network.",
      "HTTPS makes product pictures look 3D.",
      "HTTPS eliminates the need for web hosting.",
      "HTTPS prevents computers from overheating."
    ],
    "correctAnswer": 0,
    "explanation": "HTTPS secures sensitive communications through encryption, data integrity, and server authentication.",
    "hint": "Encrypts sensitive customer data."
  },
  {
    "id": 6,
    "question": "Which of the following malware types does NOT self-replicate and instead relies on deceiving users by pretending to be a useful program?",
    "options": [
      "Trojan Horse",
      "Computer Worm",
      "Boot Sector Virus",
      "Macro Virus"
    ],
    "correctAnswer": 0,
    "explanation": "Trojan horses masquerade as legitimate software and do not replicate; viruses and worms self-replicate.",
    "hint": "Deceptive disguise without self-replication."
  },
  {
    "id": 7,
    "question": "What service translates domain names like `www.cbse.gov.in` into numerical IP addresses?",
    "options": [
      "DNS (Domain Name System)",
      "DHCP",
      "FTP",
      "SNMP"
    ],
    "correctAnswer": 0,
    "explanation": "DNS translates human-readable hostnames to routable numerical IP addresses.",
    "hint": "Domain Name System."
  },
  {
    "id": 8,
    "question": "What technology allows an organization to place public-facing servers (like web and email) on an isolated network buffer while keeping the internal private LAN protected?",
    "options": [
      "DMZ (Demilitarized Zone)",
      "PAN",
      "RJ-45 Jack",
      "Bluetooth Tethering"
    ],
    "correctAnswer": 0,
    "explanation": "A DMZ isolates public servers from the internal LAN, buffering corporate systems from outside breaches.",
    "hint": "Demilitarized Zone perimeter buffer."
  },
  {
    "id": 9,
    "question": "How many bits are used in an IPv4 address and an IPv6 address respectively?",
    "options": [
      "32 bits for IPv4, and 128 bits for IPv6",
      "16 bits for IPv4, and 32 bits for IPv6",
      "48 bits for IPv4, and 64 bits for IPv6",
      "64 bits for IPv4, and 256 bits for IPv6"
    ],
    "correctAnswer": 0,
    "explanation": "IPv4 is 32 bits (4 octets); IPv6 is 128 bits (8 quartets).",
    "hint": "32 bits vs 128 bits."
  },
  {
    "id": 10,
    "question": "Which protocol is specifically designed for transmitting digitized voice conversations over data networks at low latency?",
    "options": [
      "VoIP (Voice over Internet Protocol)",
      "SMTP",
      "Telnet",
      "POP3"
    ],
    "correctAnswer": 0,
    "explanation": "VoIP packetizes voice audio and routes it over IP networks, bypassing traditional telephone tolls.",
    "hint": "Voice over Internet Protocol."
  },
  {
    "id": 11,
    "question": "What is a 'Computer Worm'?",
    "options": [
      "A standalone malicious program that replicates automatically across networks without requiring a host program or human execution.",
      "A parasitic program that must attach to a host `.exe` file.",
      "A physical insect that crawls into cooling fans.",
      "A harmless cookie file."
    ],
    "correctAnswer": 0,
    "explanation": "Worms are self-propagating and autonomous, exploiting network vulnerabilities to spread without host files.",
    "hint": "Autonomous, standalone self-replication."
  },
  {
    "id": 12,
    "question": "What type of attack involves modifying packet headers to display a false sender IP address?",
    "options": [
      "IP Spoofing",
      "Shoulder Surfing",
      "Keylogging",
      "Spamming"
    ],
    "correctAnswer": 0,
    "explanation": "IP Spoofing forges the packet's source IP address to conceal identity or bypass filters.",
    "hint": "Forging the source IP address."
  },
  {
    "id": 13,
    "question": "What does a Firewall do when enforcing a 'Default Deny' security policy?",
    "options": [
      "It automatically blocks and discards all network packets unless they match an explicit permit rule.",
      "It permits all traffic by default.",
      "It turns off the internet router.",
      "It formats the server hard disk."
    ],
    "correctAnswer": 0,
    "explanation": "Default Deny blocks all traffic by default, permitting only explicitly authorized ports and addresses.",
    "hint": "Blocks everything not explicitly allowed."
  },
  {
    "id": 14,
    "question": "What is the key difference between a Hacker (White Hat) and a Cracker (Black Hat)?",
    "options": [
      "A Hacker acts with authorization to defend and strengthen systems; a Cracker breaks into systems illegally with malicious intent.",
      "A Hacker works for Google; a Cracker works for Microsoft.",
      "A Hacker uses Wi-Fi; a Cracker uses cables.",
      "There is no difference."
    ],
    "correctAnswer": 0,
    "explanation": "The core difference lies in legal authorization and constructive versus malicious criminal intent.",
    "hint": "Authorized defense vs unauthorized malicious intrusion."
  },
  {
    "id": 15,
    "question": "Which cookie attribute prevents client-side scripts like JavaScript from reading the cookie, shielding session tokens from XSS theft?",
    "options": [
      "HttpOnly",
      "Secure",
      "SameSite",
      "Path"
    ],
    "correctAnswer": 0,
    "explanation": "`HttpOnly` blocks JavaScript `document.cookie` access.",
    "hint": "HttpOnly flag."
  },
  {
    "id": 16,
    "question": "In the URL `http://www.example.org:8080/index.html`, what does `8080` designate?",
    "options": [
      "Port Number",
      "Protocol Scheme",
      "Query Parameter",
      "Top-Level Domain"
    ],
    "correctAnswer": 0,
    "explanation": "The number following the colon after the domain specifies the network Port Number.",
    "hint": "Port Number."
  },
  {
    "id": 17,
    "question": "What is 'Ransomware'?",
    "options": [
      "Malware that encrypts user files and demands an extortion payment for the decryption key.",
      "Software that speeds up web browsing.",
      "An antivirus scanning program.",
      "A program that donates money to charity."
    ],
    "correctAnswer": 0,
    "explanation": "Ransomware locks victim data using strong encryption and demands payment for access.",
    "hint": "Encrypts files and demands extortion ransom."
  },
  {
    "id": 18,
    "question": "Which protocol uses TWO separate TCP ports: Port 21 for commands/control and Port 20 for data transfer?",
    "options": [
      "FTP (File Transfer Protocol)",
      "HTTP",
      "SMTP",
      "Telnet"
    ],
    "correctAnswer": 0,
    "explanation": "FTP uses dual connections: Port 21 (Control) and Port 20 (Data).",
    "hint": "FTP uses dual connections."
  },
  {
    "id": 19,
    "question": "What is 'Pharming'?",
    "options": [
      "An attack that redirects users to fake websites by tampering with DNS servers or host files, without requiring users to click suspicious links.",
      "Growing vegetables using computers.",
      "A mobile game about agriculture.",
      "An attack on printer drivers."
    ],
    "correctAnswer": 0,
    "explanation": "Pharming poisons DNS or host configurations to redirect users even when typing the correct URL.",
    "hint": "Redirects traffic via DNS/hosts tampering."
  },
  {
    "id": 20,
    "question": "What is an 'Audio Codec' in VoIP?",
    "options": [
      "A software algorithm or hardware chip that converts and compresses analog voice into digital bitstreams.",
      "A microphone cable.",
      "A brand of headphones.",
      "A telephone bill."
    ],
    "correctAnswer": 0,
    "explanation": "Codecs (Coder-Decoder) sample, digitize, and compress voice waveforms for packet transmission.",
    "hint": "Coder-Decoder."
  },
  {
    "id": 21,
    "question": "Which of the following is an XML requirement for a document to be considered 'Well-Formed'?",
    "options": [
      "It must have a single root element and properly closed, matching tags.",
      "It must contain no numbers.",
      "It must be written in cursive font.",
      "It must be smaller than 1 kilobyte."
    ],
    "correctAnswer": 0,
    "explanation": "Well-formed XML requires a single root element, strictly matched closing tags, and proper nesting.",
    "hint": "Single root element and properly closed tags."
  },
  {
    "id": 22,
    "question": "What is a 'Keylogger'?",
    "options": [
      "Spyware that records every single keystroke typed on the keyboard to capture passwords and confidential messages.",
      "A device that manufactures physical door keys.",
      "A keyboard cleaning tool.",
      "A driver that makes typing faster."
    ],
    "correctAnswer": 0,
    "explanation": "Keyloggers secretly record all typed keyboard entries, exposing login credentials.",
    "hint": "Records every keystroke."
  },
  {
    "id": 23,
    "question": "What protocol handles connection establishment via a 3-Way Handshake (SYN, SYN-ACK, ACK)?",
    "options": [
      "TCP",
      "UDP",
      "IP",
      "ICMP"
    ],
    "correctAnswer": 0,
    "explanation": "TCP uses the 3-Way Handshake to synchronize sequence numbers and establish virtual sessions.",
    "hint": "Transmission Control Protocol."
  },
  {
    "id": 24,
    "question": "Which protocol is used by an email client to synchronize folders and read messages stored centrally on a mail server across multiple devices?",
    "options": [
      "IMAP",
      "POP3",
      "SMTP",
      "FTP"
    ],
    "correctAnswer": 0,
    "explanation": "IMAP maintains email centrally on the server and provides real-time multi-device synchronization.",
    "hint": "IMAP synchronizes across devices."
  },
  {
    "id": 25,
    "question": "In a CBSE 4-mark case study question, which defensive hardware component should be installed at an enterprise network boundary to prevent unauthorized internet intrusion and filter suspicious packets?",
    "options": [
      "Firewall",
      "Passive Hub",
      "Analog Modem",
      "Coaxial Terminator"
    ],
    "correctAnswer": 0,
    "explanation": "A Firewall placed at the internet boundary monitors, inspects, and filters incoming and outgoing traffic based on security policies.",
    "hint": "Firewall."
  }
];
