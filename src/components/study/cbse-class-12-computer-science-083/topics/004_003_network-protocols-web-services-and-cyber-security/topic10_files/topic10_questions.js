export default [
  {
    "id": 1,
    "question": "What is 'Phishing' in the context of network security?",
    "options": [
      "A social engineering attack where fraudulent emails or fake websites masquerading as trustworthy organizations deceive users into revealing sensitive credentials, passwords, or credit card numbers.",
      "Catching fish using electronic fishing rods.",
      "Upgrading internet fiber cables.",
      "Cleaning dust from computer motherboards."
    ],
    "correctAnswer": 0,
    "explanation": "Phishing uses deceptive spoofed communications (e.g. fake bank emails or clone login portals) to trick victims into surrendering confidential personal data.",
    "hint": "Social engineering to steal credentials via fake communications."
  },
  {
    "id": 2,
    "question": "What is a 'Denial of Service' (DoS) attack?",
    "options": [
      "A malicious attempt to render a computer, web server, or network resource unavailable to its legitimate users by overwhelming it with a flood of illegitimate traffic or requests.",
      "An employee refusing to work overtime.",
      "A computer monitor displaying no picture because it is unplugged.",
      "A printer running out of paper."
    ],
    "correctAnswer": 0,
    "explanation": "DoS attacks deplete server memory, CPU, or network bandwidth, causing servers to crash or become unresponsive to legitimate client requests.",
    "hint": "Overwhelming resources to deny service to legitimate users."
  },
  {
    "id": 3,
    "question": "How does a 'Distributed Denial of Service' (DDoS) attack differ from a traditional DoS attack?",
    "options": [
      "A DoS attack originates from a single attacking machine; a DDoS attack utilizes a globally distributed network of thousands of compromised zombie devices (a botnet) attacking simultaneously.",
      "A DoS attack is illegal; a DDoS attack is completely legal.",
      "A DoS attack uses cables; a DDoS attack is wireless.",
      "There is no difference."
    ],
    "correctAnswer": 0,
    "explanation": "DDoS coordinates vast distributed botnets, generating massive aggregate traffic volumes that overwhelm enterprise defenses and make IP blocking difficult.",
    "hint": "Distributed attack from thousands of compromised botnet nodes."
  },
  {
    "id": 4,
    "question": "What is 'IP Address Spoofing'?",
    "options": [
      "The creation of IP packets with a forged source IP address to conceal the sender's identity, impersonate another system, or redirect response traffic.",
      "Changing the physical color of the network cable.",
      "Buying a second router.",
      "Formatting the hard drive."
    ],
    "correctAnswer": 0,
    "explanation": "IP spoofing manipulates the packet header source IP field to trick target firewalls into accepting unauthorized packets or redirecting responses in reflection attacks.",
    "hint": "Forging the source IP address in packet headers."
  },
  {
    "id": 5,
    "question": "What is 'Spear Phishing'?",
    "options": [
      "A highly targeted, customized phishing attack aimed at a specific individual, organization, or executive, using gathered personal intelligence to maximize credibility.",
      "Phishing conducted from an airplane.",
      "An attack that only uses SMS text messages.",
      "Sending blank emails to 1 million people."
    ],
    "correctAnswer": 0,
    "explanation": "Spear phishing tailors the message to a specific target using personal details (name, job title, colleagues), making the deception far more convincing.",
    "hint": "Targeted, customized phishing attack on specific individuals."
  },
  {
    "id": 6,
    "question": "What is 'Smishing'?",
    "options": [
      "Phishing conducted via SMS text messaging on mobile phones.",
      "Smoking near a computer.",
      "A physical smash attack on hard drives.",
      "A software bug in audio drivers."
    ],
    "correctAnswer": 0,
    "explanation": "Smishing (SMS + Phishing) uses fraudulent text messages (e.g. 'Your bank account is blocked, click here to verify') to lure victims to malicious links.",
    "hint": "SMS-based phishing."
  },
  {
    "id": 7,
    "question": "What is 'Vishing'?",
    "options": [
      "Voice Phishing: phone calls using social engineering or voice spoofing to trick victims into disclosing financial information.",
      "Virtual visual displays.",
      "Recording high-definition video.",
      "Connecting a webcam to a computer."
    ],
    "correctAnswer": 0,
    "explanation": "Vishing (Voice + Phishing) uses phone calls and voice manipulation (often spoofing caller ID) to impersonate bank representatives or tax authorities.",
    "hint": "Voice phone call phishing."
  },
  {
    "id": 8,
    "question": "What is a 'SYN Flood' attack in network security?",
    "options": [
      "A DoS attack that repeatedly sends TCP SYN requests without completing the 3-way handshake, exhausting the server's connection state tables.",
      "Flooding the computer room with water.",
      "Transmitting synchronous clock signals.",
      "Sending 1,000 text documents to a printer."
    ],
    "correctAnswer": 0,
    "explanation": "A SYN flood exploits the TCP 3-way handshake: the attacker sends SYN packets from spoofed IPs and never sends the final ACK, holding half-open sockets open until memory is exhausted.",
    "hint": "Exploits TCP 3-way handshake with half-open connections."
  },
  {
    "id": 9,
    "question": "What is 'Email Spoofing'?",
    "options": [
      "Forging the email header (`From:` address) so the message appears to originate from a legitimate, trusted entity (e.g. `support@yourbank.com`).",
      "Sending an email with an attachment.",
      "Writing emails in capital letters.",
      "Deleting spam emails automatically."
    ],
    "correctAnswer": 0,
    "explanation": "Because basic SMTP does not inherently authenticate sender addresses, attackers can forge envelope and header 'From:' fields.",
    "hint": "Forging the sender address in email headers."
  },
  {
    "id": 10,
    "question": "What is 'DNS Spoofing' (or DNS Cache Poisoning)?",
    "options": [
      "Corrupting the cache of a DNS resolver to return a fraudulent IP address, silently redirecting users attempting to visit a legitimate website to an attacker's clone site.",
      "Changing the DNS server's power plug.",
      "Buying expired domain names.",
      "Typing a domain name with a spelling mistake."
    ],
    "correctAnswer": 0,
    "explanation": "DNS poisoning inserts false address records into resolvers, transparently rerouting legitimate domain traffic to phishing servers.",
    "hint": "Poisoning DNS records to redirect users to malicious IP addresses."
  },
  {
    "id": 11,
    "question": "What is 'MAC Spoofing'?",
    "options": [
      "Changing the factory-assigned Media Access Control address of a network interface card in software to bypass MAC-filtering access controls on a LAN.",
      "Buying an Apple Macintosh computer.",
      "Formatting the computer's RAM.",
      "Disconnecting an RJ45 connector."
    ],
    "correctAnswer": 0,
    "explanation": "MAC spoofing modifies the reported hardware MAC address in the OS driver to impersonate authorized devices on restricted networks.",
    "hint": "Faking the hardware MAC address in software."
  },
  {
    "id": 12,
    "question": "Which of the following is a primary defensive strategy against volumetric DDoS attacks?",
    "options": [
      "Deploying Cloud DDoS Mitigation providers (like Cloudflare or Akamai), Anycast routing, rate limiting, and Traffic Scrubbing centers.",
      "Unplugging the monitor.",
      "Replacing all passwords with the word 'password'.",
      "Turning off antivirus software."
    ],
    "correctAnswer": 0,
    "explanation": "Volumetric DDoS attacks require massive cloud traffic scrubbing networks with Anycast architecture to absorb and filter out malicious traffic spikes.",
    "hint": "Cloud DDoS mitigation and traffic scrubbing."
  },
  {
    "id": 13,
    "question": "What email authentication standards have been developed to detect and prevent Email Spoofing?",
    "options": [
      "SPF (Sender Policy Framework), DKIM (DomainKeys Identified Mail), and DMARC",
      "VGA, HDMI, and DisplayPort",
      "HTTP, FTP, and Telnet",
      "ASCII, Unicode, and UTF-8"
    ],
    "correctAnswer": 0,
    "explanation": "SPF, DKIM cryptographic signatures, and DMARC policies verify sender authenticity, preventing unauthorized actors from spoofing domain email.",
    "hint": "SPF, DKIM, and DMARC."
  },
  {
    "id": 14,
    "question": "What is 'Whaling' in cyber security terminology?",
    "options": [
      "A spear-phishing attack specifically targeted at high-profile senior executives (such as CEOs, CFOs, or government officials).",
      "Hunting ocean mammals online.",
      "An attack that only targets cloud servers.",
      "Buying large monitors."
    ],
    "correctAnswer": 0,
    "explanation": "Whaling targets 'big fish'—top corporate executives and politicians—seeking high-value wire transfers or corporate secrets.",
    "hint": "Phishing targeted at top corporate executives."
  },
  {
    "id": 15,
    "question": "What is an 'Amplification Attack' in DDoS?",
    "options": [
      "An attack that sends small requests with spoofed victim source IPs to public servers (like NTP or DNS), generating massive response traffic directed at the victim.",
      "Turning up speaker volume to maximum.",
      "Using two computer screens simultaneously.",
      "Overclocking the computer processor."
    ],
    "correctAnswer": 0,
    "explanation": "Amplification attacks exploit protocols with large response-to-request size ratios (e.g., DNS, NTP) to flood victim targets with massive reflected traffic.",
    "hint": "Generating disproportionately large responses to flood a victim."
  },
  {
    "id": 16,
    "question": "What is 'Pharming'?",
    "options": [
      "A cyber attack where malicious code redirects users from legitimate websites to fraudulent mirror sites automatically by tampering with DNS servers or local host files, without requiring users to click links.",
      "Growing agricultural crops using computers.",
      "Playing a farming game online.",
      "Building a data center in a village."
    ],
    "correctAnswer": 0,
    "explanation": "Unlike phishing, which relies on clicking deceptive links, pharming silently poisons DNS resolution or host files so even typing the correct URL leads to an imposter site.",
    "hint": "Redirecting traffic to fake sites via DNS/hosts tampering."
  },
  {
    "id": 17,
    "question": "How can end-users effectively detect a typical phishing email?",
    "options": [
      "Look for mismatched sender domain addresses, artificial urgency/threats ('Account Suspended in 24 Hours!'), generic greetings ('Dear Customer'), and deceptive hyperlinks.",
      "Check if the email has black text on white background.",
      "Check if the email was received on a weekday.",
      "Count the number of vowels in the text."
    ],
    "correctAnswer": 0,
    "explanation": "Phishing emails rely on psychological urgency, generic salutations, spelling oddities, and deceptive hyperlink URLs that differ from the displayed text.",
    "hint": "Sender domain mismatch, artificial urgency, and suspicious links."
  },
  {
    "id": 18,
    "question": "What is a 'Ping of Death' attack?",
    "options": [
      "An older DoS attack that sends oversized or malformed ICMP echo packets exceeding the maximum IP packet size (65,535 bytes), causing vulnerable systems to crash.",
      "A game of ping pong on a computer.",
      "Dropping a computer from a high table.",
      "A physical cable disconnect."
    ],
    "correctAnswer": 0,
    "explanation": "Malformed, oversized fragmented IP packets caused buffer overflows in unpatched legacy IP stacks, crashing the receiving machine.",
    "hint": "Oversized ICMP packet causing system crash."
  },
  {
    "id": 19,
    "question": "What is a 'Botmaster' (or Bot Herder)?",
    "options": [
      "The cybercriminal who remotely issues commands to an interconnected network of infected botnet computers via Command and Control (C2) servers.",
      "A teacher who teaches robotics.",
      "A robot chess champion.",
      "A master database administrator."
    ],
    "correctAnswer": 0,
    "explanation": "The botmaster controls the botnet infrastructure, directing zombie machines to coordinate DDoS assaults or spam campaigns.",
    "hint": "Controls the botnet zombie network."
  },
  {
    "id": 20,
    "question": "What is the primary motivation behind most commercial DDoS extortion attacks against e-commerce websites?",
    "options": [
      "Demanding ransom payments by threatening to bring down the website during peak sales periods (such as Black Friday or Diwali sales).",
      "Testing if the router has adequate electricity.",
      "Helping the e-commerce website load faster.",
      "Translating the website to Japanese."
    ],
    "correctAnswer": 0,
    "explanation": "DDoS extortionists threaten online retailers with catastrophic revenue loss from site downtime during peak shopping seasons unless ransoms are paid.",
    "hint": "Financial extortion by threatening downtime."
  },
  {
    "id": 21,
    "question": "What is 'Caller ID Spoofing' used in vishing attacks?",
    "options": [
      "Manipulating the telephone network data to display a false phone number or organization name (e.g. 'State Bank of India') on the recipient's phone display.",
      "Disconnecting the landline phone.",
      "Changing the phone ringer sound.",
      "Buying a used phone."
    ],
    "correctAnswer": 0,
    "explanation": "VoIP technology allows attackers to alter caller ID metadata, tricking victims into believing an official entity is calling.",
    "hint": "Faking the displayed phone number."
  },
  {
    "id": 22,
    "question": "What is 'Typosquatting' (URL Hijacking) in phishing campaigns?",
    "options": [
      "Registering domain names that are common misspellings of popular websites (e.g. `goolge.com` or `cbee.nic.in`) to capture accidental mistyped traffic.",
      "Typing very quickly on a keyboard.",
      "Writing code with syntax errors.",
      "Using a keyboard with broken keys."
    ],
    "correctAnswer": 0,
    "explanation": "Typosquatting preys on typing mistakes, hosting clones of popular sites on misspelled domains to intercept credentials.",
    "hint": "Registering misspelled domain names."
  },
  {
    "id": 23,
    "question": "In a CBSE 1-mark question: 'Define Phishing.' What is the ideal concise answer?",
    "options": [
      "Phishing is a fraudulent attempt to steal sensitive personal information like usernames, passwords, and banking details by masquerading as a trustworthy entity in electronic communications.",
      "Phishing is a method of deleting unwanted emails.",
      "Phishing is a software that improves internet speed.",
      "Phishing is an official CBSE registration portal."
    ],
    "correctAnswer": 0,
    "explanation": "Standard textbook definition highlighting fraudulent masquerading and theft of confidential user data.",
    "hint": "Fraudulent attempt to steal sensitive credentials by masquerading as a trusted entity."
  },
  {
    "id": 24,
    "question": "In a CBSE 2-mark question: 'Differentiate between a DoS attack and a DDoS attack.' What are the key points?",
    "options": [
      "(1) A DoS attack uses a single system/IP to flood a target; a DDoS attack coordinates thousands of distributed compromised machines (botnet). (2) DDoS generates far larger traffic volumes and is much harder to mitigate by IP blocking.",
      "DoS is for email; DDoS is for websites.",
      "DoS is hardware; DDoS is software.",
      "There is no difference."
    ],
    "correctAnswer": 0,
    "explanation": "Key marking points: Single source vs Distributed botnet sources; Difficulty of defense and scale of traffic.",
    "hint": "Single attacker source vs distributed botnet."
  },
  {
    "id": 25,
    "question": "In a CBSE Class 12 board examination case study, an online examination portal server suddenly crashed because it received 500,000 fake login requests per second sent from infected computers across 40 countries. What type of cyber attack occurred?",
    "options": [
      "Distributed Denial of Service (DDoS) attack",
      "Standard Bluetooth pairing error",
      "Power failure at the client school",
      "Harmless search engine web crawling"
    ],
    "correctAnswer": 0,
    "explanation": "A massive, multi-country traffic assault overwhelming a server is a classic Distributed Denial of Service (DDoS) attack launched via a botnet.",
    "hint": "Distributed Denial of Service (DDoS) attack."
  }
];
