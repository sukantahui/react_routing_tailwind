export const samplePaperSets = [
  {
    "setId": 1,
    "title": "Set 1: Application Protocols (HTTP/HTTPS, FTP, SMTP, POP3/IMAP)",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which protocol is used by web browsers to securely transmit encrypted web pages over SSL/TLS?\n(a) HTTP\n(b) HTTPS\n(c) FTP\n(d) Telnet",
            "solution": "(b) HTTPS (Hypertext Transfer Protocol Secure, default port 443).",
            "markingScheme": "1 Mark for (b) HTTPS."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What is the primary difference between POP3 and IMAP for email retrieval?",
            "solution": "POP3 downloads emails from the mail server to the local device and deletes them from the server by default. IMAP syncs emails across multiple devices, keeping emails stored on the server.",
            "markingScheme": "1 Mark for POP3 downloads/deletes vs IMAP syncs on server."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "Which protocol is used for sending/pushing outgoing emails between mail servers?\n(a) POP3\n(b) IMAP\n(c) SMTP\n(d) SNMP",
            "solution": "(c) SMTP (Simple Mail Transfer Protocol).",
            "markingScheme": "1 Mark for (c) SMTP."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "What does VoIP stand for in internet telecommunications?",
            "solution": "Voice over Internet Protocol (transmitting voice calls as data packets over IP networks).",
            "markingScheme": "1 Mark for Voice over Internet Protocol."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Differentiate between HTTP and FTP.",
            "solution": "HTTP is designed for transferring hypertext web documents (HTML, CSS, JS, images) for web browsing. FTP (File Transfer Protocol) is designed specifically for uploading, downloading, and managing bulk computer files between a client and server.",
            "markingScheme": "1 Mark for HTTP web page transfer, 1 Mark for FTP bulk file upload/download."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Why is SSH (Secure Shell) preferred over Telnet for remote administration?",
            "solution": "Telnet transmits all login credentials and commands in plain, unencrypted text, vulnerable to packet sniffing. SSH encrypts all communications (passwords and terminal sessions) using strong cryptography.",
            "markingScheme": "1 Mark for Telnet transmits plain text, 1 Mark for SSH encrypts all session traffic."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Explain the roles of TCP and IP in the TCP/IP protocol suite.",
            "solution": "1. TCP (Transmission Control Protocol): Operates at Transport Layer; responsible for breaking data into numbered packets at source, ensuring reliable error-checked delivery, acknowledging packets, retransmitting lost packets, and reassembling packets in correct order at destination.\n2. IP (Internet Protocol): Operates at Network Layer; responsible for addressing packets with source and destination IP addresses and routing them independently across routers from source to destination.",
            "markingScheme": "1.5 Marks for TCP (reliability, sequencing, packetization), 1.5 Marks for IP (addressing, routing)."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Identify the appropriate protocol for each scenario:\n1. A student making an audio-video call on Skype/WhatsApp\n2. A web developer transferring 50 image assets to a web hosting server\n3. An e-commerce customer entering credit card details on a payment checkout page",
            "solution": "1. Audio-video call: VoIP (Voice over Internet Protocol) / RTP (Real-time Transport Protocol)\n2. Uploading assets to web server: FTP (File Transfer Protocol) / SFTP\n3. Credit card payment checkout: HTTPS (Hypertext Transfer Protocol Secure)",
            "markingScheme": "1 Mark per scenario with correct protocol."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A doctor is setting up a telemedicine portal for remote patient consultations.\n(a) Which application layer protocol should be used for streaming live audio/video consultations over the Internet? Explain how it works.\n(b) Which protocol should be used for transmitting patient diagnostic reports and electronic prescriptions securely? Justify.\n(c) If the doctor accesses the server remotely to perform software updates from home, which command-line protocol must be configured?",
            "solution": "(a) Live Audio/Video: VoIP (Voice over Internet Protocol). It converts continuous analog audio/video signals into digital packets, compresses them using codecs, and transmits them in real-time over IP networks.\n(b) Secure Reports/Prescriptions: HTTPS (Hypertext Transfer Protocol Secure). It encrypts patient records using TLS/SSL encryption, preventing unauthorized interception, tampering, or eavesdropping (vital for medical confidentiality).\n(c) Remote Server Administration: SSH (Secure Shell). It provides an encrypted, authenticated remote terminal session for server maintenance.",
            "markingScheme": "2 Marks for (a) VoIP with explanation, 2 Marks for (b) HTTPS with confidentiality justification, 2 Marks for (c) SSH."
          }
        ]
      }
    ]
  },
  {
    "setId": 2,
    "title": "Set 2: Web Services, DNS Resolution & Web Architecture",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What does DNS stand for in computer networks?\n(a) Digital Network Server\n(b) Domain Name System\n(c) Direct Network Service\n(d) Data Name Storage",
            "solution": "(b) Domain Name System.",
            "markingScheme": "1 Mark for (b) Domain Name System."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "Identify the protocol, domain name, and path in the URL:\nhttps://www.cbse.gov.in/cbsenew/index.html",
            "solution": "- Protocol: https\n- Domain Name: www.cbse.gov.in\n- Path: /cbsenew/index.html",
            "markingScheme": "1 Mark (0.5 for protocol and domain, 0.5 for path)."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "Which language is used to structure content on the World Wide Web?\n(a) HTML\n(b) C++\n(c) SQL\n(d) Python",
            "solution": "(a) HTML (Hypertext Markup Language).",
            "markingScheme": "1 Mark for (a) HTML."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether XML is used for displaying data or for storing/transporting data.",
            "solution": "XML is designed for storing and transporting structured data (focuses on what data is, not how it looks).",
            "markingScheme": "1 Mark for storing and transporting structured data."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Explain the role of DNS in web browsing.",
            "solution": "DNS serves as the 'phonebook of the Internet'. It translates human-friendly domain names (e.g. www.google.com) into machine-readable IP addresses (e.g. 142.250.190.46) so browsers can locate and load internet resources.",
            "markingScheme": "1 Mark for translating domain names to IP addresses, 1 Mark for allowing browsers to connect."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Differentiate between HTML and XML.",
            "solution": "HTML: Uses predefined tags, designed for displaying data and formatting web pages. XML: Uses user-defined extensible tags, designed for storing and transporting structured data independent of software or hardware.",
            "markingScheme": "1 Mark for HTML (predefined tags, display), 1 Mark for XML (custom tags, data storage/transport)."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Explain the step-by-step process of what happens when a user types 'www.cbse.nic.in' into a web browser address bar.",
            "solution": "1. The browser checks local cache for the IP address; if not found, it queries a DNS recursive resolver.\n2. DNS resolves 'www.cbse.nic.in' to the web server's IP address.\n3. The browser establishes a TCP 3-way handshake with the server at that IP on port 80/443.\n4. The browser sends an HTTP/HTTPS GET request.\n5. The CBSE web server processes the request and returns the HTML/CSS/JS response, which the browser renders on screen.",
            "markingScheme": "1 Mark for DNS resolution, 1 Mark for TCP connection, 1 Mark for HTTP request/response & rendering."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "What is Web Hosting and what are the three essential components provided by a web hosting service?",
            "solution": "Web Hosting is an online service that enables organizations and individuals to publish a website on the Internet.\nThree essential components:\n1. Server Storage Space: Disk space on high-availability web servers to store HTML files, databases, and media.\n2. Bandwidth & Uptime: High-speed internet connectivity ensuring the site is accessible 24/7 without crashing under traffic.\n3. Web Server Software & Domain Management: Software (Apache, Nginx, IIS) and DNS record routing (A, CNAME records).",
            "markingScheme": "1 Mark for definition of web hosting, 2 Marks for components (storage, bandwidth/uptime, server software)."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A startup company is launching an online bookstore website.\n(a) Explain why the company must register a Domain Name and purchase Web Hosting.\n(b) Differentiate between Static Web Pages and Dynamic Web Pages for this bookstore.\n(c) Suggest two security certificates/technologies the bookstore must implement to ensure user debit/credit card safety.",
            "solution": "(a) Domain Name & Web Hosting:\n    - Domain Name provides a branded, memorable human web address (e.g., www.mybookstore.in) instead of raw IP numbers.\n    - Web Hosting provides server hardware, 24/7 power, and continuous internet connectivity to serve web pages to global visitors.\n(b) Static vs Dynamic:\n    - Static Pages: Content remains identical for all visitors (e.g. 'About Us', 'Contact Details', 'Terms & Conditions').\n    - Dynamic Pages: Content changes dynamically based on database queries and user interaction (e.g. personalized book recommendations, shopping cart contents, search results).\n(c) Security Technologies:\n    1. SSL/TLS Certificate (enabling HTTPS encryption for all data in transit).\n    2. PCI-DSS compliant secure payment gateway with tokenization.",
            "markingScheme": "2 Marks for (a) domain vs hosting, 2 Marks for (b) static vs dynamic pages, 2 Marks for (c) SSL/TLS & PCI-DSS payment gateway."
          }
        ]
      }
    ]
  },
  {
    "setId": 3,
    "title": "Set 3: Cyber Security Threats (Viruses, Worms, Trojans, Ransomware)",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which malicious software encrypts user files and demands payment to restore access?\n(a) Spyware\n(b) Ransomware\n(c) Adware\n(d) Keylogger",
            "solution": "(b) Ransomware.",
            "markingScheme": "1 Mark for (b) Ransomware."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What is the key difference in replication between a Computer Virus and a Computer Worm?",
            "solution": "A Virus requires human action and a host file to spread. A Worm is self-replicating and spreads autonomously across networks without needing a host program.",
            "markingScheme": "1 Mark for Virus requires host file vs Worm is self-replicating."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What type of malware disguises itself as legitimate or harmless software to trick users into installing it?\n(a) Trojan Horse\n(b) Worm\n(c) Cookie\n(d) Botnet",
            "solution": "(a) Trojan Horse.",
            "markingScheme": "1 Mark for (a) Trojan Horse."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "What is Spyware?",
            "solution": "Malware that secretly monitors and gathers user activities, keystrokes, and confidential data without their knowledge.",
            "markingScheme": "1 Mark for secret monitoring and data harvesting."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Explain what a Denial of Service (DoS) attack is and how a Distributed Denial of Service (DDoS) attack differs.",
            "solution": "DoS attack: Floods a target server with bogus traffic from a single computer to exhaust server resources, rendering it unavailable to genuine users. DDoS attack: Uses thousands of compromised infected computers (a botnet) spread across the globe to launch a coordinated flood attack simultaneously.",
            "markingScheme": "1 Mark for DoS definition, 1 Mark for DDoS using botnets/distributed sources."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "What is a Keylogger and how does it compromise passwords?",
            "solution": "A Keylogger is a surveillance spyware program that records every keystroke typed on the computer keyboard. It logs login IDs, credit card numbers, and passwords and sends the log to an attacker.",
            "markingScheme": "1 Mark for keystroke logging, 1 Mark for harvesting passwords/confidential entries."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Differentiate between Phishing, Pharming, and Spoofing.",
            "solution": "1. Phishing: Fraudulent emails or messages pretending to be from trusted entities (banks, PayPal) with deceptive links to trick users into revealing credentials.\n2. Pharming: Hijacking DNS server records or hosts files to automatically redirect legitimate web traffic to a bogus website even when the user types the correct URL.\n3. Spoofing: Falsifying data (IP address, MAC address, email header) to masquerade as an authorized trusted computer or sender.",
            "markingScheme": "1 Mark per threat type differentiation."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "State three proactive measures an organization can implement to protect its servers from Ransomware attacks.",
            "solution": "1. Implement automated, immutable, air-gapped backups stored offsite.\n2. Keep operating systems and software patched and updated against known vulnerabilities.\n3. Deploy Endpoint Detection and Response (EDR) anti-malware software with behavioral ransomware blocking.",
            "markingScheme": "1 Mark per proactive measure."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "An employee at an engineering firm receives an email titled 'Urgent Payroll Update from HR' containing a link 'www.hrcorporate-login.com'. Upon clicking, a page identical to the company's employee portal appears asking for username and corporate password.\n(a) Identify the cyber attack being attempted against the employee.\n(b) List two visual or technical clues in the email and URL that indicate fraud.\n(c) If the employee had entered their credentials, what immediate actions should the IT department take?\n(d) Suggest two enterprise-level security policies to prevent such attacks from succeeding.",
            "solution": "(a) Attack: Phishing attack (specifically Spear-Phishing credential harvesting).\n(b) Clues:\n    1. The URL domain 'www.hrcorporate-login.com' is a lookalike domain, not the authentic corporate domain.\n    2. Artificial sense of urgency ('Urgent Payroll Update') designed to bypass critical thinking.\n(c) Immediate Actions:\n    1. Immediately force a password reset and revoke active login tokens/sessions for that employee account.\n    2. Check corporate server logs for unauthorized access originating from external IP addresses.\n(d) Enterprise Policies:\n    1. Enforce Multi-Factor Authentication (MFA / 2FA) so stolen passwords alone are useless.\n    2. Deploy advanced email filtering with DMARC/DKIM/SPF verification and conduct regular employee phishing awareness drills.",
            "markingScheme": "1.5 Marks for (a) Phishing, 1.5 Marks for (b) two clues, 1.5 Marks for (c) immediate actions, 1.5 Marks for (d) MFA and email filtering."
          }
        ]
      }
    ]
  },
  {
    "setId": 4,
    "title": "Set 4: Cyber Safety, Firewalls, Cookies & Browser Security",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What is a Firewall in computer network security?\n(a) An antivirus scan engine\n(b) A network security barrier that monitors and filters incoming and outgoing traffic based on predetermined rules\n(c) A fire extinguishing tool for computer servers\n(d) A cooling fan",
            "solution": "(b) A network security barrier that monitors and filters incoming and outgoing traffic based on predetermined rules.",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What is an HTTP Cookie?",
            "solution": "A small text file stored on the user's computer by a web browser at the request of a web server to store session data, preferences, or shopping cart contents.",
            "markingScheme": "1 Mark for small text file storing session/preference data."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "True or False: An HTTP cookie can contain executable code that directly infects the computer with a virus.",
            "solution": "False. Cookies are plain text data files, not executable programs; they cannot execute code by themselves.",
            "markingScheme": "1 Mark for False."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "What is the main privacy risk associated with Third-Party Tracking Cookies?",
            "solution": "They track user browsing history across multiple unrelated websites, creating detailed behavioral profiles for advertising without explicit consent.",
            "markingScheme": "1 Mark for tracking across multiple sites / behavioral profiling."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Differentiate between a Hardware Firewall and a Software Firewall.",
            "solution": "Hardware Firewall: A standalone dedicated physical appliance placed between the internal network and external gateway (e.g. Cisco ASA), filtering traffic for the entire network. Software Firewall: An application installed on an individual operating system (e.g. Windows Defender Firewall), protecting only that single host machine.",
            "markingScheme": "1 Mark for Hardware (dedicated appliance for entire network), 1 Mark for Software (installed on OS for single host)."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Differentiate between Session Cookies and Persistent Cookies.",
            "solution": "Session Cookies: Temporary cookies stored in memory that are automatically deleted when the user closes the web browser. Persistent Cookies: Stored on the user's hard drive with an expiration date, remaining active across multiple browser sessions.",
            "markingScheme": "1 Mark for Session (deleted on browser close), 1 Mark for Persistent (retained until expiration date)."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Explain Packet Filtering and Stateful Inspection in network firewalls.",
            "solution": "1. Packet Filtering: Inspects individual incoming/outgoing packets at Network/Transport layers, checking source IP, destination IP, port numbers, and protocol against access control lists (ACLs) without context.\n2. Stateful Inspection: Tracks the full state and context of active TCP/UDP connections. It verifies whether an incoming packet belongs to an established, authorized session initiated from inside the network, offering superior protection against spoofing.",
            "markingScheme": "1.5 Marks for Packet Filtering (header checks without context), 1.5 Marks for Stateful Inspection (connection state tracking)."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "State three best practices for secure web browsing to maintain personal digital privacy.",
            "solution": "1. Use HTTPS connections exclusively, verifying the padlock icon in the browser address bar.\n2. Regularly clear browser cache, cookies, and browsing history, or use private/incognito mode on shared computers.\n3. Use strong, unique passwords combined with a reputable password manager and enable Multi-Factor Authentication (MFA).",
            "markingScheme": "1 Mark per valid security best practice."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A chartered accounting firm handles confidential financial records of multinational clients.\n(a) Why must the firm install a dedicated hardware firewall at its internet perimeter?\n(b) The partners want to access client files while traveling abroad. Which technology enables secure encrypted remote access to the office server over public hotel Wi-Fi?\n(c) Suggest two password policies that the firm's system administrator should enforce for all employee accounts.",
            "solution": "(a) Hardware Firewall Need: Blocks malicious inbound intrusion attempts, port scans, and unauthorized external traffic before it ever reaches office computers, shielding client financial databases from hackers.\n(b) Secure Remote Access: Virtual Private Network (VPN). A VPN creates an encrypted tunnel between the partner's laptop and the office network, ensuring that traffic transmitted over insecure public hotel Wi-Fi cannot be intercepted by eavesdroppers.\n(c) Password Policies:\n    1. Minimum length of 12-16 characters containing uppercase, lowercase, numbers, and special symbols.\n    2. Mandatory Multi-Factor Authentication (MFA) and account lockouts after 3 consecutive failed login attempts.",
            "markingScheme": "2 Marks for (a) Hardware firewall perimeter protection, 2 Marks for (b) VPN with encryption over public Wi-Fi, 2 Marks for (c) two strong password/MFA policies."
          }
        ]
      }
    ]
  },
  {
    "setId": 5,
    "title": "Set 5: Indian IT Act, Cyber Law, Ethics & Intellectual Property",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "In which year was the Information Technology Act passed by the Parliament of India?\n(a) 1995\n(b) 2000\n(c) 2008\n(d) 2015",
            "solution": "(b) 2000 (IT Act 2000, amended in 2008).",
            "markingScheme": "1 Mark for (b) 2000."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What is Plagiarism in academic and software contexts?",
            "solution": "The unethical act of presenting someone else's work, code, ideas, or words as one's own without proper acknowledgment or attribution.",
            "markingScheme": "1 Mark for using someone else's work as one's own without attribution."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "Which of the following is Open Source software under the GNU GPL license?\n(a) Microsoft Windows\n(b) Linux OS\n(c) Adobe Photoshop\n(d) Oracle Database",
            "solution": "(b) Linux OS.",
            "markingScheme": "1 Mark for (b) Linux OS."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether software piracy is a punishable criminal offense under the Indian Copyright Act and IT Act.",
            "solution": "Yes. Software piracy is punishable with imprisonment and substantial monetary fines.",
            "markingScheme": "1 Mark for Yes."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Differentiate between Proprietary Software and Free and Open Source Software (FOSS).",
            "solution": "Proprietary Software: Source code is private, closed, and owned by a company; users purchase a license to use it without modification rights (e.g. MS Windows). FOSS: Source code is publicly available; users have full freedom to inspect, modify, enhance, and redistribute it (e.g. Python, Linux).",
            "markingScheme": "1 Mark for Proprietary (closed code, restrictive license), 1 Mark for FOSS (open source code, freedom to modify)."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "What is a Digital Signature and what two properties does it provide?",
            "solution": "A Digital Signature is a mathematical cryptographic mechanism that validates the authenticity and integrity of a digital message or document.\nTwo properties:\n1. Non-repudiation (the sender cannot deny having sent it).\n2. Integrity (verifies the document was not altered in transit).",
            "markingScheme": "1 Mark for definition, 1 Mark for Non-repudiation and Integrity."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Explain the three main types of Intellectual Property Rights (IPR) in computing: Patents, Copyrights, and Trademarks.",
            "solution": "1. Patent: Protects novel technical inventions, algorithms, and technical processes (e.g., a new data compression technique).\n2. Copyright: Protects the original expression of software source code, written documentation, and multimedia content from unauthorized copying.\n3. Trademark: Protects brand names, logos, symbols, and company slogans (e.g. Python logo, Apple logo) preventing market confusion.",
            "markingScheme": "1 Mark per IPR category with correct scope and example."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Explain Section 66C and Section 66D of the Indian Information Technology (IT) Act 2000.",
            "solution": "1. Section 66C (Identity Theft): Penalizes dishonestly making use of the electronic signature, password, or unique identification feature of any other person (punishable by up to 3 years imprisonment and fine).\n2. Section 66D (Cheating by Personation using Computer Resource): Penalizes cheating by personating any individual or organization using computer networks or communication devices (punishable by up to 3 years imprisonment and fine).",
            "markingScheme": "1.5 Marks for Section 66C (Identity theft), 1.5 Marks for Section 66D (Cheating by personation)."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A student copies an entire Python machine learning project from GitHub, removes the original author's name, pastes their own name on the report, and submits it as their final Class 12 board examination project.\n(a) Identify the ethical violation committed by the student.\n(b) If the original code was licensed under GNU GPL v3, explain whether the student had the legal right to inspect and use the code, and what specific conditions were violated.\n(c) Differentiate between Freeware and Shareware software licenses.\n(d) Mention two consequences of cyberbullying under Indian cyber law.",
            "solution": "(a) Ethical Violation: Plagiarism and copyright infringement.\n(b) GNU GPL v3 Analysis: Under GPL v3, anyone is legally permitted to study, use, and modify the code, BUT they must retain original copyright notices, provide full attribution to the original author, and distribute any derivative work under the same open-source GPL license. The student violated all of these requirements by removing attribution and claiming sole authorship.\n(c) Freeware vs Shareware:\n    - Freeware: Software available completely free of charge for unlimited time, but source code is NOT provided (e.g. Adobe Acrobat Reader).\n    - Shareware: Software distributed freely on a trial basis for a limited evaluation period (e.g. 30 days) after which payment is required (e.g. WinRAR).\n(d) Consequences of Cyberbullying: Punishable under IT Act Section 66E / 67 and Indian Penal Code (IPC Sections 354D, 507, 509) leading to criminal record, police inquiry, and imprisonment up to 3 years.",
            "markingScheme": "1.5 Marks for (a) Plagiarism, 1.5 Marks for (b) GPL attribution requirement, 1.5 Marks for (c) Freeware vs Shareware, 1.5 Marks for (d) Cyberbullying legal penalties."
          }
        ]
      }
    ]
  },
  {
    "setId": 6,
    "title": "Set 6: Transport Protocols (TCP vs UDP) & Port Numbers",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which transport protocol is connectionless and does NOT guarantee delivery?\n(a) TCP\n(b) UDP\n(c) FTP\n(d) SMTP",
            "solution": "(b) UDP (User Datagram Protocol).",
            "markingScheme": "1 Mark for (b) UDP."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What is the standard port number for HTTP web traffic?\n(a) 21\n(b) 25\n(c) 80\n(d) 443",
            "solution": "(c) Port 80 (HTTPS uses 443).",
            "markingScheme": "1 Mark for (c) 80."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "Why is UDP preferred over TCP for live online gaming and video streaming?",
            "solution": "UDP has low overhead and no retransmission delays; packets arrive with minimum latency, which is essential for real-time video/gaming even if a few packets drop.",
            "markingScheme": "1 Mark for low overhead / no retransmission delays / real-time speed."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State the port number conventionally assigned to secure SSH remote login.",
            "solution": "Port 22.",
            "markingScheme": "1 Mark for Port 22."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Compare TCP and UDP on reliability and transmission overhead.",
            "solution": "Reliability: TCP is connection-oriented and 100% reliable (guarantees packet arrival via acknowledgments and retransmission). UDP is connectionless and unreliable (best-effort delivery without acknowledgments).\nOverhead: TCP has high header overhead (20-60 bytes) and handshake delays. UDP has very low header overhead (8 bytes) with zero connection setup delay.",
            "markingScheme": "1 Mark for reliability comparison, 1 Mark for overhead comparison."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "What is a Port Number in network communication and why is an IP address alone insufficient to deliver data?",
            "solution": "An IP address identifies a specific physical computer on the network, but multiple applications (browser, email, Spotify) run simultaneously on that computer. A Port Number (16-bit integer) identifies the specific running application/process to which data belongs.",
            "markingScheme": "1 Mark for IP identifies host, 1 Mark for port identifies specific application/process."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Match standard network protocols with their default port numbers:\nProtocols: 1. FTP, 2. SMTP, 3. HTTPS\nPorts: (A) 25, (B) 443, (C) 20/21",
            "solution": "1. FTP matches (C) 20/21\n2. SMTP matches (A) 25\n3. HTTPS matches (B) 443",
            "markingScheme": "1 Mark per correct match."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Explain the TCP Three-Way Handshake mechanism (SYN, SYN-ACK, ACK).",
            "solution": "1. Step 1 (SYN): Client sends a SYN (Synchronize) packet with an initial sequence number to the server requesting a connection.\n2. Step 2 (SYN-ACK): Server responds with a SYN-ACK packet, acknowledging the client's sequence number and sending its own sequence number.\n3. Step 3 (ACK): Client replies with an ACK (Acknowledge) packet. The reliable full-duplex TCP connection is now established.",
            "markingScheme": "1 Mark per step (SYN, SYN-ACK, ACK)."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A streaming service platform offers two products:\n1. Live Sports Broadcast (millions of concurrent viewers streaming live matches)\n2. On-demand Video Movie Downloads (subscribers downloading 4K films to watch offline)\n(a) Which transport layer protocol (TCP or UDP) should power the Live Sports Broadcast? Justify.\n(b) Which transport protocol must be used for On-demand Video Movie Downloads? Justify.\n(c) Explain what visual artifact occurs if a packet is lost in UDP streaming vs what happens in TCP streaming.",
            "solution": "(a) Live Sports Broadcast: UDP (User Datagram Protocol). Justification: Low latency is crucial; dropped video frames are unnoticeable in live video, whereas TCP retransmissions would cause buffering freezes and ruin the live experience.\n(b) On-demand Movie Downloads: TCP (Transmission Control Protocol). Justification: Complete file integrity is mandatory; every byte must be 100% verified and received without corruption, even if transmission pauses temporarily to retransmit dropped packets.\n(c) Lost Packet Behavior:\n    - In UDP: A slight momentary pixelation / video glitch occurs for a split second, and playback continues seamlessly without pause.\n    - In TCP: Video playback freezes / buffers while TCP halts and requests retransmission of the missing packet before resuming.",
            "markingScheme": "2 Marks for (a) UDP with live justification, 2 Marks for (b) TCP with file integrity justification, 2 Marks for (c) visual glitch vs buffering freeze."
          }
        ]
      }
    ]
  },
  {
    "setId": 7,
    "title": "Set 7: Cryptography, Digital Certificates & Public Key Infrastructure",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "In asymmetric public-key cryptography, which key is used to decrypt a message encrypted with a user's Public Key?\n(a) The same Public Key\n(b) The user's Private Key\n(c) A shared secret key\n(d) A root key",
            "solution": "(b) The user's Private Key.",
            "markingScheme": "1 Mark for (b) The user's Private Key."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What trusted authority issues and signs Digital Certificates for websites?\n(a) CA (Certificate Authority)\n(b) ISP\n(c) IEEE\n(d) TRAI",
            "solution": "(a) CA (Certificate Authority, e.g. DigiCert, Let's Encrypt).",
            "markingScheme": "1 Mark for (a) CA."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What does the browser padlock icon signify when visiting a website?",
            "solution": "The connection to the website is encrypted using a valid SSL/TLS certificate issued by a trusted Certificate Authority.",
            "markingScheme": "1 Mark for encrypted connection via valid SSL/TLS certificate."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether a Digital Signature provides Non-Repudiation.",
            "solution": "Yes. The sender cannot dispute the authenticity of their signature.",
            "markingScheme": "1 Mark for Yes."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Differentiate between Symmetric and Asymmetric Encryption.",
            "solution": "Symmetric Encryption: Uses a single secret key for both encryption and decryption (fast, but key exchange is difficult, e.g. AES). Asymmetric Encryption: Uses a mathematically linked key pair (Public Key for encryption, Private Key for decryption; slower, but eliminates key exchange risk, e.g. RSA).",
            "markingScheme": "1 Mark for Symmetric (single key), 1 Mark for Asymmetric (public-private key pair)."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "What happens if a user visits a website whose SSL certificate has expired?",
            "solution": "The web browser blocks access and displays a severe security warning: 'Your connection is not private / Security Risk Ahead', alerting that communication could be intercepted.",
            "markingScheme": "1 Mark for browser warning / block, 1 Mark for potential interception alert."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Explain how a Digital Signature is created and verified using hashing and asymmetric keys.",
            "solution": "1. Creation (Sender):\n   - The document is processed with a cryptographic hash function (e.g. SHA-256) to produce a fixed-length digest.\n   - The digest is encrypted using the sender's Private Key to generate the Digital Signature.\n2. Verification (Receiver):\n   - The receiver decrypts the signature using the sender's Public Key to recover the original digest.\n   - The receiver hashes the received document independently and compares the two digests. If identical, integrity and sender identity are proven.",
            "markingScheme": "1.5 Marks for creation (hash + private key encryption), 1.5 Marks for verification (public key decrypt + hash comparison)."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "What information is contained inside an X.509 Digital Certificate?",
            "solution": "1. Subject / Domain Name of the website/owner\n2. The owner's Public Key\n3. Issuer Name (trusted Certificate Authority)\n4. Validity Period (valid from / expiration date)\n5. Digital Signature of the Certificate Authority verifying the contents",
            "markingScheme": "0.5 Marks per valid certificate field (up to 3 Marks)."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "An online banking portal is being deployed for 5 million customers.\n(a) Explain why HTTP is strictly forbidden for online banking and HTTPS is mandatory.\n(b) Explain the role of End-to-End Encryption (E2EE) in mobile banking apps.\n(c) What is a Man-in-the-Middle (MitM) attack and how does an authentic SSL certificate from a recognized CA prevent it?",
            "solution": "(a) Why HTTP is forbidden: HTTP transmits all credentials, account numbers, and passwords in plain text. Any attacker on public Wi-Fi or compromised routers can intercept the packets. HTTPS encrypts all communication with TLS, rendering intercepted data indecipherable.\n(b) End-to-End Encryption (E2EE): Ensures that financial transaction data is encrypted directly on the customer's smartphone and can only be decrypted inside the bank's secure data center, preventing telecom operators or intermediate proxies from reading the data.\n(c) MitM Attack & SSL Prevention: In a MitM attack, an adversary positions themselves between user and server, intercepting and altering traffic. A valid SSL certificate from a trusted CA prevents this because the browser verifies the digital signature of the certificate against trusted root authorities. If an attacker injects a fake certificate, the browser immediately terminates the session with an untrusted certificate warning.",
            "markingScheme": "2 Marks for (a) plain text vs TLS encryption, 2 Marks for (b) E2EE explanation, 2 Marks for (c) MitM prevention via CA verification."
          }
        ]
      }
    ]
  },
  {
    "setId": 8,
    "title": "Set 8: Social Engineering, Cyber Bullying & Online Identity Protection",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What is Social Engineering in computer security?\n(a) Writing social media apps\n(b) Manipulating individuals into divulging confidential information or performing actions that compromise security\n(c) Creating computer networks for charities\n(d) Repairing laptops",
            "solution": "(b) Manipulating individuals into divulging confidential information or performing actions that compromise security.",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What is Cyber Stalking?\n(a) Searching for hardware online\n(b) Repeatedly following, harassing, or intimidating someone using the Internet and electronic communication channels\n(c) Reading Wikipedia\n(d) Blocking spam",
            "solution": "(b) Repeatedly following, harassing, or intimidating someone using the Internet and electronic communication channels.",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What is a Digital Footprint?",
            "solution": "The trail of data and electronic breadcrumbs left behind whenever an individual uses the Internet (browsing history, social posts, app activity).",
            "markingScheme": "1 Mark for trail of electronic data left by online activity."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether Active Digital Footprints differ from Passive Digital Footprints.",
            "solution": "Yes. Active footprints are created deliberately (posting photos, blogs), while passive footprints are collected unintentionally (IP logs, cookies, browsing trackers).",
            "markingScheme": "1 Mark for deliberate vs unintentional collection difference."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "State two ways students can manage and clean their digital footprint.",
            "solution": "1. Regularly audit and delete old, unused online accounts and adjust privacy settings on social media to private.\n2. Avoid posting sensitive personal details (home address, phone number, location check-ins) publicly.",
            "markingScheme": "1 Mark per valid way to clean digital footprint."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "What is E-Waste (Electronic Waste) and why should it be disposed of responsibly?",
            "solution": "E-Waste refers to discarded electronic equipment (old computers, phones, batteries). It contains toxic heavy metals (lead, mercury, cadmium) that contaminate groundwater and soil if disposed in regular landfills.",
            "markingScheme": "1 Mark for definition of discarded electronics, 1 Mark for toxic heavy metals contamination."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Differentiate between Cyber Bullying, Cyber Trolling, and Cyber Stalking.",
            "solution": "1. Cyber Bullying: Sending mean, derogatory, or threatening messages online aimed at tormenting, humiliating, or intimidating someone (common among teenagers).\n2. Cyber Trolling: Deliberately posting provocative, offensive, or inflammatory comments in public forums to upset people and disrupt discussion.\n3. Cyber Stalking: Persistent, obsessive surveillance, tracking, and unsolicited messaging that instills genuine fear for personal safety.",
            "markingScheme": "1 Mark per term differentiation."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "What is Netiquette? State four essential rules of good Netiquette.",
            "solution": "Netiquette is the code of respectful, polite, and ethical behavior expected on the Internet.\nFour rules:\n1. Respect others' privacy and personal information.\n2. Do not use abusive, hateful, or derogatory language.\n3. Avoid writing in ALL CAPS (considered shouting online).\n4. Verify factual accuracy before sharing news to prevent spreading fake information.",
            "markingScheme": "1 Mark for definition, 2 Marks for four clear rules (0.5 Marks each)."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A high school student creates a fake social media account using a classmate's photograph, posts offensive morphed pictures, and sends abusive messages to school teachers.\n(a) Identify the specific cyber crimes committed under Indian cyber law.\n(b) Which sections of the Indian IT Act 2000 / 2008 apply to this offense?\n(c) What steps should the victim and school take immediately upon discovering this offense?",
            "solution": "(a) Cyber Crimes Committed: Identity theft, impersonation, defamation, morphing/publishing obscene material, and cyberbullying.\n(b) Applicable Sections under IT Act:\n    - Section 66C: Identity theft and misuse of electronic identity.\n    - Section 66D: Cheating by personation using a computer resource.\n    - Section 67 / 67A: Publishing or transmitting obscene material in electronic form.\n(c) Immediate Steps:\n    1. Take screenshots and archive the URL and timestamp as digital evidence without alerting the perpetrator.\n    2. Report and flag the fake profile on the social media platform for immediate suspension.\n    3. Lodge an official complaint on the National Cyber Crime Reporting Portal (www.cybercrime.gov.in) or at the local Cyber Crime Police Station.",
            "markingScheme": "2 Marks for (a) crimes identified, 2 Marks for (b) Sections 66C, 66D, 67, 2 Marks for (c) evidence preservation & cyber cell reporting."
          }
        ]
      }
    ]
  },
  {
    "setId": 9,
    "title": "Set 9: Open Source Software, Licensing & Cyber Forensics",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What does FOSS stand for in software engineering?\n(a) Fast Operating System Software\n(b) Free and Open Source Software\n(c) Full Online System Service\n(d) File Optimization Storage Standard",
            "solution": "(b) Free and Open Source Software.",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "Which license requires any modified version of the software to also be distributed under the exact same open source license?\n(a) GNU General Public License (GPL - Copyleft)\n(b) Commercial EULA\n(c) Proprietary OEM\n(d) Trial License",
            "solution": "(a) GNU General Public License (GPL - Copyleft).",
            "markingScheme": "1 Mark for (a) GNU GPL."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What is Cyber Forensics?",
            "solution": "The practice of gathering, analyzing, and preserving digital evidence from computers and networks suitable for presentation in a court of law.",
            "markingScheme": "1 Mark for preserving digital evidence for legal presentation."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether software code in the Public Domain has any copyright restrictions.",
            "solution": "No. Public Domain software has no copyright owner and can be freely used, modified, or closed by anyone.",
            "markingScheme": "1 Mark for No (zero copyright restrictions)."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Explain the philosophy of Free Software as defined by Richard Stallman (the 4 freedoms).",
            "solution": "1. Freedom 0: Run the program for any purpose.\n2. Freedom 1: Study how the program works and modify it.\n3. Freedom 2: Redistribute copies to help your neighbor.\n4. Freedom 3: Distribute copies of your modified versions to others.",
            "markingScheme": "1 Mark for mention of Stallman's 4 freedoms, 1 Mark for summarizing run, study, redistribute, modify."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "What is an End User License Agreement (EULA)?",
            "solution": "A legal contract between a software manufacturer and the end user establishing the conditions, restrictions, and permitted uses under which the software may be operated.",
            "markingScheme": "1 Mark for legal contract between manufacturer and user, 1 Mark for conditions/permitted uses."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Compare GPL (Copyleft) license with MIT/Apache (Permissive) open source licenses.",
            "solution": "1. GPL (Copyleft): Highly protective. Any modified derivative software MUST also be released under the same GPL open source license; it cannot be incorporated into proprietary closed-source commercial software.\n2. MIT / Apache (Permissive): Highly permissive with minimal restrictions. Anyone can modify, bundle, and sell the software as proprietary closed-source software without being forced to open-source their changes.",
            "markingScheme": "1.5 Marks for GPL copyleft reciprocity, 1.5 Marks for MIT/Apache permissive commercial embedding."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Explain the Chain of Custody in digital evidence collection.",
            "solution": "Chain of Custody is a chronological documentation trail recording the seizure, custody, control, transfer, analysis, and disposition of digital evidence.\nIt proves that the evidence was not tampered with, altered, or substituted from the crime scene to the courtroom.",
            "markingScheme": "1.5 Marks for chronological tracking of digital evidence, 1.5 Marks for proving lack of tampering in court."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A government department is transitioning its 10,000 office computers from Microsoft Office to LibreOffice and from Windows to Linux.\n(a) Explain two major economic and security benefits of migrating to open source software for a government agency.\n(b) Mention one operational challenge the department might encounter during the transition.\n(c) What is the difference between Freeware and Open Source Software (OSS)? Give an example of each.",
            "solution": "(a) Economic & Security Benefits:\n    1. Massive cost savings: Zero licensing fees for 10,000 machines, eliminating recurring subscription costs.\n    2. Enhanced security & transparency: Open source code can be independently audited by national cyber defense experts for backdoors, reducing vulnerability to foreign espionage.\n(b) Operational Challenge: User resistance to new interfaces, staff retraining requirements, and potential macro compatibility issues with legacy Excel spreadsheets.\n(c) Freeware vs OSS:\n    - Freeware: Distributed free of cost, but source code is closed and proprietary (e.g., Skype, Adobe Reader).\n    - Open Source Software (OSS): Source code is open and accessible to all for study and modification (e.g., Python, Linux, LibreOffice).",
            "markingScheme": "2 Marks for (a) cost & security auditing benefits, 2 Marks for (b) retraining & compatibility challenge, 2 Marks for (c) Freeware vs OSS with examples."
          }
        ]
      }
    ]
  },
  {
    "setId": 10,
    "title": "Set 10: Complete Protocols & Cyber Security Board Examination Mastery",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which of the following is NOT a web browser?\n(a) Google Chrome\n(b) Mozilla Firefox\n(c) Apache\n(d) Apple Safari",
            "solution": "(c) Apache (Apache is a web server software, not a browser).",
            "markingScheme": "1 Mark for (c) Apache."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What is the primary function of SMTP?\n(a) Receiving incoming emails from mailbox\n(b) Sending / transmitting outgoing emails\n(c) File transfer\n(d) Web browsing",
            "solution": "(b) Sending / transmitting outgoing emails.",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "Which cyber threat involves tricking a victim into clicking on malicious web links by sending fake emails that appear to originate from legitimate banks?\n(a) Trojan\n(b) Phishing\n(c) Ransomware\n(d) Adware",
            "solution": "(b) Phishing.",
            "markingScheme": "1 Mark for (b) Phishing."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State the default port number used by HTTPS.",
            "solution": "Port 443.",
            "markingScheme": "1 Mark for Port 443."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "State two differences between a Computer Virus and a Trojan Horse.",
            "solution": "1. A virus attaches itself to clean files and replicates to infect other files. A Trojan does not replicate itself.\n2. A virus spreads openly by executing infected host files. A Trojan disguises itself as a useful, legitimate application (e.g. game, utility) to trick the user into installing it.",
            "markingScheme": "1 Mark for replication difference, 1 Mark for deception/disguise difference."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "What is the purpose of an SSL/TLS Certificate on a commercial website?",
            "solution": "It authenticates the identity of the website and encrypts all sensitive data (passwords, credit cards) exchanged between the browser and the web server.",
            "markingScheme": "1 Mark for authenticating identity, 1 Mark for encrypting sensitive data."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Differentiate between SMTP, POP3, and IMAP in email communication.",
            "solution": "1. SMTP: Push protocol used by email clients to send outgoing messages to mail servers and between servers.\n2. POP3: Pull protocol that downloads messages from server to local device and deletes them from server.\n3. IMAP: Advanced pull protocol that keeps messages stored on server, synchronizing folders across multiple devices simultaneously.",
            "markingScheme": "1 Mark per protocol differentiation."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "State three major offenses penalized under the Information Technology (IT) Act 2000 in India.",
            "solution": "1. Tampering with computer source documents (Section 65)\n2. Hacking / computer-related offenses (Section 66)\n3. Identity theft and cheating by personation (Sections 66C and 66D)\n4. Publishing or transmitting obscene material (Section 67)",
            "markingScheme": "1 Mark per valid offense under IT Act (any 3)."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A high-profile online examination portal is conducting a national entrance exam for 1 million students simultaneously.\n(a) Which application and transport protocols should manage the exam submission form? Justify.\n(b) What security measure should be deployed to prevent competitors or hackers from launching a DDoS attack to bring down the portal during exam hours?\n(c) Suggest two authentication safeguards to prevent identity fraud and impersonation during exam login.",
            "solution": "(a) Recommended Protocols: HTTPS over TCP (Port 443).\n    Justification: HTTPS guarantees that answers and student responses are encrypted against eavesdropping in transit. TCP guarantees 100% reliable, lossless delivery of submitted answers through acknowledgments and retransmissions.\n(b) DDoS Protection Measure: Cloud-based Web Application Firewall (WAF) and Anti-DDoS mitigation services (e.g. Cloudflare, AWS Shield) that filter anomalous traffic surges and distribute requests across global reverse proxy networks.\n(c) Authentication Safeguards:\n    1. Two-Factor Authentication (OTP sent to registered mobile/email) or Biometric Face Recognition with live webcam verification.\n    2. IP and MAC binding preventing simultaneous logins from different locations.",
            "markingScheme": "2 Marks for (a) HTTPS over TCP with justifications, 2 Marks for (b) Anti-DDoS WAF and reverse proxies, 2 Marks for (c) Two-Factor authentication and IP/biometric binding."
          }
        ]
      }
    ]
  }
];
