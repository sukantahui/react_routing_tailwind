export default [
  {
    "id": 1,
    "question": "What is a 'Firewall' in network security?",
    "options": [
      "A network security device or software application that monitors and filters incoming and outgoing network traffic based on an organization's predetermined security rules.",
      "A physical brick wall built to protect server rooms from fire accidents.",
      "An air-conditioning unit for server racks.",
      "A software program that makes computers reboot faster."
    ],
    "correctAnswer": 0,
    "explanation": "A firewall establishes a barrier between a trusted internal network and an untrusted external network (such as the Internet), filtering packets based on rules.",
    "hint": "Monitors and filters traffic based on security rules."
  },
  {
    "id": 2,
    "question": "What is the primary difference between a Hardware Firewall and a Software Firewall?",
    "options": [
      "A Hardware firewall is a dedicated physical appliance that protects an entire network at the perimeter; a Software firewall is installed on individual host operating systems to protect single machines.",
      "A Hardware firewall only works without internet; a Software firewall needs internet.",
      "A Hardware firewall is free; a Software firewall costs money.",
      "There is no difference."
    ],
    "correctAnswer": 0,
    "explanation": "Hardware firewalls (e.g. Cisco, Fortinet, Palo Alto) sit at the gateway protecting all subnets; software firewalls (e.g. Windows Defender Firewall) filter traffic on individual endpoints.",
    "hint": "Dedicated perimeter hardware appliance vs endpoint host software."
  },
  {
    "id": 3,
    "question": "What does a 'Packet Filtering Firewall' inspect to decide whether to allow or drop an incoming packet?",
    "options": [
      "Source and destination IP addresses, source and destination port numbers, and protocol type (TCP/UDP/ICMP).",
      "The color of the computer casing.",
      "The user's home address.",
      "The time left on the computer clock."
    ],
    "correctAnswer": 0,
    "explanation": "Packet filtering firewalls examine Layer 3 and Layer 4 header fields against an Access Control List (ACL) of rules.",
    "hint": "Inspects IP addresses, port numbers, and protocols."
  },
  {
    "id": 4,
    "question": "What is a 'Cookie' (HTTP Cookie) in web browsing?",
    "options": [
      "A small piece of text data created by a web server and stored on the user's computer by the web browser to remember session state, preferences, and login status.",
      "A chocolate baked snack eaten by network engineers.",
      "A computer virus that steals passwords.",
      "A hardware component on the network card."
    ],
    "correctAnswer": 0,
    "explanation": "HTTP cookies provide statefulness across stateless HTTP connections, enabling shopping carts, persistent logins, and user preference tracking.",
    "hint": "Small text file stored on user's computer to maintain session state."
  },
  {
    "id": 5,
    "question": "What is the difference between a Session Cookie and a Persistent Cookie?",
    "options": [
      "A Session cookie expires and is deleted when the user closes their browser; a Persistent cookie remains stored on the hard drive until its specified expiration date.",
      "A Session cookie is encrypted; a Persistent cookie is not.",
      "A Session cookie is for mobile phones; a Persistent cookie is for laptops.",
      "There is no difference."
    ],
    "correctAnswer": 0,
    "explanation": "Session cookies reside in temporary memory during the active browsing session; persistent cookies persist across browser restarts until an expiration timestamp.",
    "hint": "Deleted upon closing browser vs stored until expiration date."
  },
  {
    "id": 6,
    "question": "What privacy concern is commonly associated with Third-Party Cookies?",
    "options": [
      "They are set by advertising and tracking networks across multiple websites to monitor a user's cross-site browsing behavior and build profiling dossiers for targeted advertising.",
      "They physically damage the computer's CPU.",
      "They format the hard drive.",
      "They cause the monitor to flicker."
    ],
    "correctAnswer": 0,
    "explanation": "Third-party tracking cookies follow users across diverse domains without explicit awareness, raising significant online privacy and data protection concerns.",
    "hint": "Cross-site tracking for behavioral advertising and user profiling."
  },
  {
    "id": 7,
    "question": "In computer ethics and cyber security, what fundamentally distinguishes an 'Ethical Hacker' (White Hat) from a 'Cracker' (Black Hat)?",
    "options": [
      "An Ethical Hacker has authorized permission to test and strengthen defenses without malicious intent; a Cracker breaks into systems illegally with malicious intent to steal data or cause damage.",
      "An Ethical Hacker uses Windows; a Cracker uses Linux.",
      "An Ethical Hacker is certified by Google; a Cracker is certified by Microsoft.",
      "An Ethical Hacker only works during the daytime."
    ],
    "correctAnswer": 0,
    "explanation": "Authorization, legality, and intent form the core distinction: White hats legally defend and audit systems; Crackers (black hats) exploit systems illegally for criminal gain.",
    "hint": "Authorization and legal/defensive intent vs illegal/malicious intent."
  },
  {
    "id": 8,
    "question": "What is a 'Grey Hat Hacker'?",
    "options": [
      "An individual who may violate laws or ethical standards without prior authorization, but without malicious intent (e.g. finding a vulnerability and reporting it to the company for a bug bounty).",
      "A hacker who wears a grey jacket.",
      "A hacker who works exclusively on black-and-white screens.",
      "An AI chatbot."
    ],
    "correctAnswer": 0,
    "explanation": "Grey hats operate in a legal gray area: breaching systems without permission, but reporting flaws to vendors rather than exploiting them maliciously.",
    "hint": "Breaches systems without authorization but lacks malicious intent."
  },
  {
    "id": 9,
    "question": "What security flag can be added to an HTTP Cookie to prevent client-side JavaScript (e.g., via Cross-Site Scripting / XSS) from accessing or stealing the cookie?",
    "options": [
      "HttpOnly",
      "Secure",
      "SameSite",
      "NoScript"
    ],
    "correctAnswer": 0,
    "explanation": "The `HttpOnly` flag prevents client-side scripts (like `document.cookie`) from accessing session tokens, mitigating cookie-stealing XSS attacks.",
    "hint": "HttpOnly flag blocks JavaScript access."
  },
  {
    "id": 10,
    "question": "What security flag ensures that an HTTP Cookie is ONLY transmitted across encrypted HTTPS connections, never over plain HTTP?",
    "options": [
      "Secure",
      "HttpOnly",
      "SameSite=Strict",
      "Domain"
    ],
    "correctAnswer": 0,
    "explanation": "The `Secure` attribute instructs the browser that the cookie should only be sent over encrypted (HTTPS) requests.",
    "hint": "Secure flag mandates HTTPS transmission."
  },
  {
    "id": 11,
    "question": "What is 'Stateful Packet Inspection' (SPI) in modern firewalls?",
    "options": [
      "A firewall technology that monitors the state of active network connections and determines which network packets to allow based on established connection context.",
      "A firewall that records the user's home state.",
      "A firewall that scans paper printouts.",
      "A firewall that operates without electricity."
    ],
    "correctAnswer": 0,
    "explanation": "Stateful firewalls track the state of sessions (e.g. TCP handshakes), automatically allowing return response traffic for authorized outbound requests.",
    "hint": "Tracks connection state and context of active sessions."
  },
  {
    "id": 12,
    "question": "What is a 'DMZ' (Demilitarized Zone) in network security architecture?",
    "options": [
      "A physical or logical subnetwork that exposes an organization's external-facing services (like public web or mail servers) to an untrusted network while isolating the internal LAN.",
      "A military training ground for soldiers.",
      "A folder where deleted files are stored.",
      "A high-speed gaming server."
    ],
    "correctAnswer": 0,
    "explanation": "A DMZ buffers the private corporate LAN: if a public web server in the DMZ is compromised, the internal LAN remains shielded behind an inner firewall.",
    "hint": "Isolated perimeter subnet hosting public-facing servers."
  },
  {
    "id": 13,
    "question": "Which of the following is considered an essential best practice for robust password security?",
    "options": [
      "Using a minimum of 12-16 characters combining uppercase, lowercase, numbers, and symbols, and never reusing passwords across accounts.",
      "Using your first name followed by 123.",
      "Writing passwords on a sticky note attached to the monitor.",
      "Using the same password for all websites."
    ],
    "correctAnswer": 0,
    "explanation": "Long, complex, unique passphrases combined with password managers minimize the risk of dictionary and credential-stuffing attacks.",
    "hint": "Long, complex, unique passphrases."
  },
  {
    "id": 14,
    "question": "What is 'Multi-Factor Authentication' (MFA / 2FA)?",
    "options": [
      "A security mechanism that requires a user to provide two or more distinct verification factors to gain access (e.g., password + SMS/TOTP authenticator app code).",
      "Logging in two times in a row.",
      "Typing your password twice as fast.",
      "Using two computer screens."
    ],
    "correctAnswer": 0,
    "explanation": "MFA requires credentials from at least two categories: Something you know (password), Something you have (phone/token), or Something you are (biometrics).",
    "hint": "Requires two or more distinct verification factors."
  },
  {
    "id": 15,
    "question": "What is an 'Intrusion Detection System' (IDS)?",
    "options": [
      "A device or software application that monitors a network or systems for malicious activity or policy violations and produces alert reports.",
      "A burglar alarm on the office door.",
      "A program that deletes slow computers.",
      "A tool to test internet download speeds."
    ],
    "correctAnswer": 0,
    "explanation": "An IDS passively analyzes network traffic patterns against signature databases, alerting administrators when intrusions or anomalies are detected.",
    "hint": "Monitors traffic and generates alerts upon detecting malicious activity."
  },
  {
    "id": 16,
    "question": "What is the key functional difference between an IDS and an IPS (Intrusion Prevention System)?",
    "options": [
      "An IDS passively monitors and alerts administrators; an IPS actively sits in-line and drops or blocks malicious traffic automatically in real time.",
      "An IDS is hardware; an IPS is software.",
      "An IDS works on Windows; an IPS only works on Linux.",
      "There is no difference."
    ],
    "correctAnswer": 0,
    "explanation": "IDS detects and alerts (passive); IPS detects and immediately blocks/drops the offending packets (active in-line prevention).",
    "hint": "Passive detection vs active automated blocking."
  },
  {
    "id": 17,
    "question": "Why should default administrator passwords on newly purchased Wi-Fi routers be changed immediately upon installation?",
    "options": [
      "Because factory default credentials (e.g. `admin/admin` or `admin/password`) are publicly known and routinely targeted by automated botnet scanners.",
      "Because the router will not turn on otherwise.",
      "Because internet speeds will be permanently throttled by 50%.",
      "Because the warranty expires if not changed."
    ],
    "correctAnswer": 0,
    "explanation": "Botnets constantly scan public IP ranges attempting known manufacturer default credentials to hijack routers into zombie networks.",
    "hint": "Default credentials are well-known to cybercriminals."
  },
  {
    "id": 18,
    "question": "What is a 'Vulnerability Scanner' used by ethical hackers?",
    "options": [
      "An automated tool (like Nessus or OpenVAS) that scans systems and networks to discover known software bugs, missing patches, and misconfigurations.",
      "A metal detector.",
      "An antivirus deletion script.",
      "A password cracking malware."
    ],
    "correctAnswer": 0,
    "explanation": "Vulnerability scanners inventory target systems and correlate running software versions against known CVE databases to produce security remediation reports.",
    "hint": "Automated tool discovering known vulnerabilities and missing patches."
  },
  {
    "id": 19,
    "question": "Can cookies themselves be infected with executable viruses?",
    "options": [
      "No, cookies are plain-text data files; they cannot execute code or infect files, though they can be stolen by attackers to hijack active user sessions.",
      "Yes, cookies are the most dangerous viruses in the world.",
      "Only if they are chocolate flavored.",
      "Yes, cookies execute binary code directly on the CPU."
    ],
    "correctAnswer": 0,
    "explanation": "Cookies are passive text strings that cannot execute code; their primary security risk lies in session theft and behavioral tracking, not virus infection.",
    "hint": "Cookies are passive text data; they cannot execute code."
  },
  {
    "id": 20,
    "question": "What is 'Penetration Testing' (Pen Testing)?",
    "options": [
      "An authorized simulated cyberattack against a computer system or network, performed to evaluate security posture and identify exploitable weaknesses.",
      "Testing ballpoint pens on paper.",
      "Measuring the thickness of an Ethernet cable.",
      "Testing the speed of a hard drive."
    ],
    "correctAnswer": 0,
    "explanation": "Penetration testing simulates real-world adversary tactics under controlled authorization to find vulnerabilities before malicious attackers do.",
    "hint": "Authorized simulated cyberattack to evaluate security."
  },
  {
    "id": 21,
    "question": "What legal authorization is mandatory before performing security testing or port scanning on an external company's network?",
    "options": [
      "Explicit written consent and contractual authorization (Rules of Engagement) from the network owner.",
      "A verbal okay from an intern.",
      "No permission is needed if you are a student.",
      "A comment posted on Twitter."
    ],
    "correctAnswer": 0,
    "explanation": "Without explicit written authorization from system owners, probing or testing networks is illegal under cyber law (e.g. Indian IT Act 2000 Section 43/66).",
    "hint": "Explicit written authorization and rules of engagement."
  },
  {
    "id": 22,
    "question": "In standard firewall rule syntax, what does the 'Default Deny' (or Implicit Deny) rule mean?",
    "options": [
      "Any network traffic that is not explicitly permitted by a specific rule is automatically blocked and discarded.",
      "All traffic is allowed by default.",
      "The firewall is disabled.",
      "The computer will not boot."
    ],
    "correctAnswer": 0,
    "explanation": "Default Deny is a foundational security principle: block everything by default and grant access only to specifically permitted traffic.",
    "hint": "Block all traffic not explicitly permitted."
  },
  {
    "id": 23,
    "question": "In a CBSE 1-mark question: 'What is the purpose of a Firewall?' What is the best answer?",
    "options": [
      "A firewall monitors and filters incoming and outgoing network traffic based on predetermined security rules, protecting a trusted internal network from unauthorized access.",
      "A firewall speeds up computer boot times.",
      "A firewall formats corrupt USB drives.",
      "A firewall translates English web pages into Hindi."
    ],
    "correctAnswer": 0,
    "explanation": "Classic CBSE 1-mark definition highlighting traffic monitoring, filtering, rule enforcement, and perimeter protection.",
    "hint": "Monitors and filters network traffic based on security rules."
  },
  {
    "id": 24,
    "question": "In a CBSE 2-mark question: 'Distinguish between a Hacker and a Cracker.' What is the exact distinction?",
    "options": [
      "A Hacker (Ethical Hacker) explores and audits systems with legal authorization to improve security; a Cracker breaks into systems illegally with malicious intent to steal data or cause harm.",
      "A Hacker works for Apple; a Cracker works for Microsoft.",
      "A Hacker uses Wi-Fi; a Cracker uses cables.",
      "There is no difference."
    ],
    "correctAnswer": 0,
    "explanation": "Key marking points: Legal authorization, ethical stance, and constructive intent (Hacker) vs illegal access, criminal motivation, and destructive intent (Cracker).",
    "hint": "Authorized/constructive defense vs unauthorized/malicious criminal intent."
  },
  {
    "id": 25,
    "question": "In a CBSE Class 12 board examination case study, a school wants to prevent students in the computer laboratory from accessing unauthorized gaming websites and shield internal school databases from external Internet hackers. Which device/software must you recommend installing at the school's internet gateway?",
    "options": [
      "A Network Firewall (Hardware/Software)",
      "An unmanaged Hub",
      "An analog modem",
      "A USB flash drive"
    ],
    "correctAnswer": 0,
    "explanation": "A Firewall placed at the network gateway enforces access control policies, blocking unauthorized external intrusions and filtering outbound student traffic.",
    "hint": "Network Firewall."
  }
];
