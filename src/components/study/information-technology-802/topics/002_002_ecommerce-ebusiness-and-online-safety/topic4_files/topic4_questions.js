const questions = [
  {
    "id": "q1",
    "question": "Q1: What is a major cause of server crashes and peak-hour downtime during mega e-commerce promotional events?",
    "options": [
      "Sudden massive traffic spikes overwhelming server CPU, RAM, and database connection pools",
      "Too many products being added to the database catalog",
      "Using high-resolution monitor screens on client devices",
      "Customers downloading invoices"
    ],
    "answer": "Sudden massive traffic spikes overwhelming server CPU, RAM, and database connection pools",
    "explanation": "Flash sales generate thousands of concurrent requests per second, exhausting server resources and causing HTTP 503 Service Unavailable errors.",
    "explanationBn": "ফ্ল্যাশ সেলের সময় অতিরিক্ত ট্রাফিকের চাপে সার্ভারের সিপিইউ ও র‍্যাম ওভারলোড হয়ে সার্ভার ক্র্যাশ করে।",
    "topic": "Major E-Business Risks: Privacy, Server Downtime & Hackers",
    "difficulty": "Easy",
    "hint": "Sudden massive traffic spikes..."
  },
  {
    "id": "q2",
    "question": "Q2: How does a violation of customer privacy occur in an e-business context?",
    "options": [
      "Selling, leaking, or tracking user personal data (addresses, phone numbers, browsing history) without explicit informed consent",
      "Sending timely order delivery SMS updates",
      "Encrypting customer passwords using secure SHA-256 hashes",
      "Displaying product prices in Indian Rupees (₹)"
    ],
    "answer": "Selling, leaking, or tracking user personal data (addresses, phone numbers, browsing history) without explicit informed consent",
    "explanation": "Privacy violations involve unauthorized collection, profiling, third-party data selling, or inadequate database access controls.",
    "explanationBn": "গ্রাহকের সম্মতি ছাড়া তার ব্যক্তিগত তথ্য, ফোন নম্বর বা ব্রাউজিং ইতিহাস বিক্রি বা ফাঁস করা গোপনীয়তা লঙ্ঘন।",
    "topic": "Major E-Business Risks: Privacy, Server Downtime & Hackers",
    "difficulty": "Easy",
    "hint": "Selling, leaking, or tracking user personal data..."
  },
  {
    "id": "q3",
    "question": "Q3: Which cyber attack involves flooding a web server with illegitimate, junk traffic to render it completely inaccessible to legitimate customers?",
    "options": [
      "Distributed Denial of Service (DDoS) attack",
      "Cross-Site Form Styling",
      "Database Backup Defragmentation",
      "HTML Document Validation"
    ],
    "answer": "Distributed Denial of Service (DDoS) attack",
    "explanation": "DDoS attacks use botnets of compromised computers to flood target servers with overwhelming HTTP requests, taking them offline.",
    "explanationBn": "DDoS আক্রমণের মাধ্যমে বটনেট দিয়ে ভুয়া রিকোয়েস্ট পাঠিয়ে ওয়েবসাইটকে অচল করে দেওয়া হয়।",
    "topic": "Major E-Business Risks: Privacy, Server Downtime & Hackers",
    "difficulty": "Medium",
    "hint": "Distributed Denial of Service..."
  },
  {
    "id": "q4",
    "question": "Q4: What is 'SQL Injection' (SQLi), and why is it a grave risk to e-commerce enterprises?",
    "options": [
      "Malicious SQL commands injected through web forms to manipulate, read, or erase backend database tables containing customer credentials",
      "Injecting liquid ink into an SQL server chassis",
      "Writing clean SQL code in MySQL Workbench",
      "Creating an SQL primary key index"
    ],
    "answer": "Malicious SQL commands injected through web forms to manipulate, read, or erase backend database tables containing customer credentials",
    "explanation": "SQLi exploits unvalidated user input fields to execute unauthorized database queries, bypassing authentication and exfiltrating credit card tables.",
    "explanationBn": "SQL Injection হলো ইনপুট ফিল্ডের মাধ্যমে ক্ষতিকর এসকিউএল কোড পাঠিয়ে ডেটাবেজের তথ্য চুরি বা নষ্ট করা।",
    "topic": "Major E-Business Risks: Privacy, Server Downtime & Hackers",
    "difficulty": "Hard",
    "hint": "Malicious SQL commands injected..."
  },
  {
    "id": "q5",
    "question": "Q5: Which architectural solution automatically distributes incoming client web requests across multiple server instances to prevent downtime during traffic spikes?",
    "options": [
      "Load Balancer (e.g., Nginx, AWS Elastic Load Balancer)",
      "Single-core 8086 processor",
      "Standard USB cable hub",
      "Paper file directory"
    ],
    "answer": "Load Balancer (e.g., Nginx, AWS Elastic Load Balancer)",
    "explanation": "Load balancers distribute network traffic evenly across a farm of backend application servers to maintain high availability.",
    "explanationBn": "লোড ব্যালেন্সার আগত ট্রাফিককে একাধিক সার্ভারের মধ্যে ভাগ করে দিয়ে ওভারলোড ঠেকায়।",
    "topic": "Major E-Business Risks: Privacy, Server Downtime & Hackers",
    "difficulty": "Medium",
    "hint": "Load Balancer (e.g., Nginx..."
  },
  {
    "id": "q6",
    "question": "Q6: Which technology caches static images, videos, and scripts on edge servers worldwide to reduce origin server load during traffic surges?",
    "options": [
      "CDN (Content Delivery Network - e.g., Cloudflare, Akamai)",
      "Local floppy disk drive",
      "VGA video cable",
      "Desktop audio card"
    ],
    "answer": "CDN (Content Delivery Network - e.g., Cloudflare, Akamai)",
    "explanation": "CDNs serve content from geographic edge nodes closest to the user, drastically lowering latency and origin server bandwidth strain.",
    "explanationBn": "CDN (Content Delivery Network) ক্যাশ করা ফাইল ব্যবহারকারীর নিকটবর্তী সার্ভার থেকে সরবরাহ করে মূল সার্ভারের চাপ কমায়।",
    "topic": "Major E-Business Risks: Privacy, Server Downtime & Hackers",
    "difficulty": "Medium",
    "hint": "CDN (Content Delivery Network..."
  },
  {
    "id": "q7",
    "question": "Q7: What type of malware encrypts an enterprise's customer and inventory databases and demands extortion money for the decryption key?",
    "options": [
      "Ransomware",
      "Adware",
      "Screen Saver",
      "Calculator Utility"
    ],
    "answer": "Ransomware",
    "explanation": "Ransomware holds company data hostage by encrypting file systems, paralyzing business operations until ransoms are negotiated.",
    "explanationBn": "র‍্যানসমওয়্যার হলো এমন ম্যালওয়্যার যা ডেটাবেজ এনক্রিপ্ট করে তা খোলার জন্য মুক্তিপণ দাবি করে।",
    "topic": "Major E-Business Risks: Privacy, Server Downtime & Hackers",
    "difficulty": "Easy",
    "hint": "Ransomware..."
  },
  {
    "id": "q8",
    "question": "Q8: Under India's Digital Personal Data Protection (DPDP) Act 2023, what is the duty of an e-commerce enterprise regarding customer personal data?",
    "options": [
      "Obtain clear consent, process data only for specified legitimate purposes, and implement robust security safeguards against data breaches",
      "Sell customer phone numbers to telemarketing agencies for profit",
      "Store passwords in plain, unencrypted text files",
      "Share user addresses publicly on social media"
    ],
    "answer": "Obtain clear consent, process data only for specified legitimate purposes, and implement robust security safeguards against data breaches",
    "explanation": "The DPDP Act 2023 enforces stringent privacy obligations, consent mandates, and heavy financial penalties on data fiduciaries for breaches.",
    "explanationBn": "DPDP আইন ২০২৩ অনুযায়ী গ্রাহকের সুস্পষ্ট সম্মতি নিয়ে নির্দিষ্ট কাজের জন্য ডেটা সংরক্ষণ ও সুরক্ষা দেওয়া বাধ্যতামূলক।",
    "topic": "Major E-Business Risks: Privacy, Server Downtime & Hackers",
    "difficulty": "Hard",
    "hint": "Obtain clear consent, process data..."
  },
  {
    "id": "q9",
    "question": "Q9: What is 'Cross-Site Scripting' (XSS) in web application vulnerability taxonomy?",
    "options": [
      "An attack where malicious JavaScript code is injected into benign web pages viewed by other users to steal session cookies",
      "Writing CSS styling across two different browsers",
      "Translating a website into multiple languages",
      "Using two different fonts on a webpage"
    ],
    "answer": "An attack where malicious JavaScript code is injected into benign web pages viewed by other users to steal session cookies",
    "explanation": "XSS allows attackers to execute unauthorized client-side scripts inside victim browsers, hijacking active user sessions.",
    "explanationBn": "XSS আক্রমণে ক্ষতিকর স্ক্রিপ্ট পেজে যুক্ত করে অন্য ব্যবহারকারীদের সেশন কুকি ও তথ্য চুরি করা হয়।",
    "topic": "Major E-Business Risks: Privacy, Server Downtime & Hackers",
    "difficulty": "Hard",
    "hint": "An attack where malicious JavaScript..."
  },
  {
    "id": "q10",
    "question": "Q10: Which HTTP error status code commonly indicates that an e-commerce server is overloaded or undergoing peak downtime?",
    "options": [
      "HTTP 503 Service Unavailable / 504 Gateway Timeout",
      "HTTP 200 OK",
      "HTTP 201 Created",
      "HTTP 301 Moved Permanently"
    ],
    "answer": "HTTP 503 Service Unavailable / 504 Gateway Timeout",
    "explanation": "503 indicates that the server cannot handle the request due to temporary resource overload or maintenance.",
    "explanationBn": "HTTP 503 এবং 504 এর অর্থ সার্ভার সাময়িকভাবে অতিরিক্ত চাপের কারণে সেবা দিতে অক্ষম।",
    "topic": "Major E-Business Risks: Privacy, Server Downtime & Hackers",
    "difficulty": "Medium",
    "hint": "HTTP 503 Service Unavailable..."
  },
  {
    "id": "q11",
    "question": "Q11: What is 'Auto-Scaling' in modern cloud-hosted e-commerce architecture (e.g., AWS / Azure / Google Cloud)?",
    "options": [
      "Dynamically adding or removing virtual server instances automatically based on real-time traffic volume and CPU load",
      "Automatically magnifying images on a computer screen",
      "Weighing delivery boxes on an automated balance scale",
      "Scaling the physical dimensions of the computer monitor"
    ],
    "answer": "Dynamically adding or removing virtual server instances automatically based on real-time traffic volume and CPU load",
    "explanation": "Auto-scaling dynamically provisions additional server containers during surges and spins them down when traffic subsides.",
    "explanationBn": "অটো-স্কেলিং ট্রাফিকের ওপর ভিত্তি করে স্বয়ংক্রিয়ভাবে সার্ভারের সংখ্যা বাড়িয়ে ক্র্যাশ হওয়া আটকায়।",
    "topic": "Major E-Business Risks: Privacy, Server Downtime & Hackers",
    "difficulty": "Medium",
    "hint": "Dynamically adding or removing virtual..."
  },
  {
    "id": "q12",
    "question": "Q12: Which security tool inspects incoming HTTP web traffic and blocks malicious SQL injection and XSS payloads before reaching application servers?",
    "options": [
      "WAF (Web Application Firewall)",
      "Standard HDMI cable",
      "Operating System Sound Mixer",
      "Optical CD-ROM Drive"
    ],
    "answer": "WAF (Web Application Firewall)",
    "explanation": "A WAF filters, monitors, and blocks HTTP traffic to and from a web application, shielding it from application-layer cyber attacks.",
    "explanationBn": "WAF (Web Application Firewall) ক্ষতিকর ট্রাফিক ও সাইবার আক্রমণ শনাক্ত করে সার্ভারে পৌঁছানোর আগেই ব্লক করে।",
    "topic": "Major E-Business Risks: Privacy, Server Downtime & Hackers",
    "difficulty": "Medium",
    "hint": "WAF (Web Application Firewall)..."
  },
  {
    "id": "q13",
    "question": "Q13: Why is storing customer passwords in plain text considered an unforgivable security breach?",
    "options": [
      "If the database is penetrated, hackers immediately obtain plaintext credentials to compromise all user accounts",
      "Plain text uses too much disk storage space",
      "Plain text files cannot be opened on mobile phones",
      "Plain text makes the website load slower"
    ],
    "answer": "If the database is penetrated, hackers immediately obtain plaintext credentials to compromise all user accounts",
    "explanation": "Passwords must always be salted and hashed using cryptographic algorithms (e.g. bcrypt, Argon2) so cleartext credentials are never exposed.",
    "explanationBn": "প্লেইন টেক্সটে পাসওয়ার্ড রাখলে ডেটাবেজ হ্যাক হওয়ার সাথে সাথে হ্যাকাররা সবার অ্যাকাউন্ট দখল করতে পারে।",
    "topic": "Major E-Business Risks: Privacy, Server Downtime & Hackers",
    "difficulty": "Easy",
    "hint": "If the database is penetrated..."
  },
  {
    "id": "q14",
    "question": "Q14: What is a 'Man-in-the-Middle' (MitM) attack in digital commerce?",
    "options": [
      "An attacker secretly intercepts and potentially alters communication between the customer's browser and the merchant server",
      "A delivery boy standing between two houses",
      "A referee in a football match",
      "An accountant working between two departments"
    ],
    "answer": "An attacker secretly intercepts and potentially alters communication between the customer's browser and the merchant server",
    "explanation": "MitM occurs when communication channels lack end-to-end HTTPS/TLS encryption, allowing eavesdroppers to harvest credentials.",
    "explanationBn": "MitM আক্রমণে হ্যাকার ক্রেতা ও সার্ভারের মধ্যকার যোগাযোগে আড়ি পেতে গোপনীয় তথ্য হাতিয়ে নেয়।",
    "topic": "Major E-Business Risks: Privacy, Server Downtime & Hackers",
    "difficulty": "Medium",
    "hint": "An attacker secretly intercepts..."
  },
  {
    "id": "q15",
    "question": "Q15: What is 'Data Minimization' in privacy engineering?",
    "options": [
      "Collecting only the absolute minimum necessary customer personal data required to fulfill the specific transaction",
      "Compressing all images into tiny thumbnails",
      "Using very small fonts on web forms",
      "Deleting product descriptions from the store"
    ],
    "answer": "Collecting only the absolute minimum necessary customer personal data required to fulfill the specific transaction",
    "explanation": "Data minimization reduces enterprise risk by ensuring excess, non-essential personal identifiers are never requested or stored.",
    "explanationBn": "ডেটা মিনিমাইজেশন নীতি অনুযায়ী কেবল লেনদেনের জন্য যতটুকু তথ্য দরকার ঠিক ততটুকুই সংগ্রহ করা হয়।",
    "topic": "Major E-Business Risks: Privacy, Server Downtime & Hackers",
    "difficulty": "Medium",
    "hint": "Collecting only the absolute minimum..."
  },
  {
    "id": "q16",
    "question": "Q16: Which protocol prevents unauthorized tampering of data in transit across public internet networks?",
    "options": [
      "TLS (Transport Layer Security) / HTTPS",
      "Telnet on port 23",
      "Unencrypted HTTP on port 80",
      "Plain FTP on port 21"
    ],
    "answer": "TLS (Transport Layer Security) / HTTPS",
    "explanation": "TLS ensures end-to-end data integrity and confidentiality through cryptographic encryption.",
    "explanationBn": "TLS/HTTPS এনক্রিপশনের মাধ্যমে ইন্টারনেটে প্রেরিত তথ্যের পরিবর্তন বা চুরি রোধ করা হয়।",
    "topic": "Major E-Business Risks: Privacy, Server Downtime & Hackers",
    "difficulty": "Easy",
    "hint": "TLS (Transport Layer Security)..."
  },
  {
    "id": "q17",
    "question": "Q17: What is the primary financial risk of unmanaged peak server downtime during festive sales for an e-business?",
    "options": [
      "Direct revenue loss of millions of rupees per hour as frustrated buyers switch to competitor websites",
      "Increased printer cartridge costs",
      "High electricity bills for home users",
      "Lower internet subscription rates"
    ],
    "answer": "Direct revenue loss of millions of rupees per hour as frustrated buyers switch to competitor websites",
    "explanation": "During high-intent shopping hours, every minute of server downtime directly converts into lost orders and permanent customer churn.",
    "explanationBn": "ডাউনটাইমের প্রতি মিনিটে লাখ লাখ টাকার ক্ষতি হয় কারণ ক্রেতারা অন্য প্রতিযোগী ওয়েবসাইটে চলে যান।",
    "topic": "Major E-Business Risks: Privacy, Server Downtime & Hackers",
    "difficulty": "Easy",
    "hint": "Direct revenue loss of millions..."
  },
  {
    "id": "q18",
    "question": "Q18: Which regulatory compliance standard mandates strict security controls for e-commerce websites storing or transmitting credit card information?",
    "options": [
      "PCI-DSS (Payment Card Industry Data Security Standard)",
      "WHO Health Protocol",
      "ISO 9001 Manufacturing Seal",
      "Automobile Emission Norm Stage VI"
    ],
    "answer": "PCI-DSS (Payment Card Industry Data Security Standard)",
    "explanation": "PCI-DSS is a global information security standard designed to prevent credit card fraud through strict encryption and network controls.",
    "explanationBn": "PCI-DSS হলো ক্রেডিট ও ডেবিট কার্ডের তথ্য নিরাপদ রাখার আন্তর্জাতিক নিরাপত্তা মানদণ্ড।",
    "topic": "Major E-Business Risks: Privacy, Server Downtime & Hackers",
    "difficulty": "Hard",
    "hint": "PCI-DSS (Payment Card Industry..."
  },
  {
    "id": "q19",
    "question": "Q19: What is 'Penetration Testing' (Ethical Hacking) in e-business security maintenance?",
    "options": [
      "Authorized simulated cyber attacks performed on company systems to identify and patch security vulnerabilities before real hackers exploit them",
      "Testing the physical strength of shipping boxes with a hammer",
      "Drilling holes in server room walls",
      "Sending junk spam emails to competitors"
    ],
    "answer": "Authorized simulated cyber attacks performed on company systems to identify and patch security vulnerabilities before real hackers exploit them",
    "explanation": "Pen testing proactively reveals zero-day exploits, SQL injection flaws, and misconfigured firewall rules.",
    "explanationBn": "পেনিট্রেশন টেস্টিং হলো সাইবার দুর্বলতা খুঁজে বের করে হ্যাকারদের আক্রমণ প্রতিহত করার আগাম পরীক্ষা।",
    "topic": "Major E-Business Risks: Privacy, Server Downtime & Hackers",
    "difficulty": "Medium",
    "hint": "Authorized simulated cyber attacks..."
  },
  {
    "id": "q20",
    "question": "Q20: What is a 'Zero-Day Vulnerability'?",
    "options": [
      "A software security flaw unknown to the vendor, leaving 0 days to patch before potential exploitation",
      "A sale that lasts for 0 days",
      "A computer that boots in 0 seconds",
      "A webpage with 0 images"
    ],
    "answer": "A software security flaw unknown to the vendor, leaving 0 days to patch before potential exploitation",
    "explanation": "Zero-day vulnerabilities represent critical undisclosed flaws that hackers can exploit before developers issue patches.",
    "explanationBn": "জিরো-ডে হলো সফটওয়্যারের এমন অজানা ত্রুটি যা ডেভেলপার জানার আগেই হ্যাকাররা কাজে লাগাতে পারে।",
    "topic": "Major E-Business Risks: Privacy, Server Downtime & Hackers",
    "difficulty": "Hard",
    "hint": "A software security flaw unknown..."
  },
  {
    "id": "q21",
    "question": "Q21: How do 'Third-Party Tracking Cookies' pose a risk to customer privacy on commercial portals?",
    "options": [
      "They track user browsing behavior across different unrelated websites to build intrusive advertising profiles without consent",
      "They physically bake cookies in the office kitchen",
      "They delete files from the computer hard drive",
      "They improve screen resolution"
    ],
    "answer": "They track user browsing behavior across different unrelated websites to build intrusive advertising profiles without consent",
    "explanation": "Third-party trackers harvest cross-site behavioral telemetry, raising substantial privacy concerns.",
    "explanationBn": "থার্ড-পার্টি ট্র্যাকিং কুকি ব্যবহারকারীর অজান্তে বিভিন্ন সাইটের ব্রাউজিং তথ্য সংগ্রহ করে বিজ্ঞাপন বানায়।",
    "topic": "Major E-Business Risks: Privacy, Server Downtime & Hackers",
    "difficulty": "Medium",
    "hint": "They track user browsing behavior..."
  },
  {
    "id": "q22",
    "question": "Q22: Which measure helps protect company employees from falling victim to Spear Phishing attacks that could compromise corporate servers?",
    "options": [
      "Continuous cybersecurity awareness training, simulated phishing drills, and mandatory hardware 2FA tokens",
      "Banning employees from reading any emails",
      "Using only mechanical typewriters in the office",
      "Removing all passwords from the server"
    ],
    "answer": "Continuous cybersecurity awareness training, simulated phishing drills, and mandatory hardware 2FA tokens",
    "explanation": "Educating staff on detecting spoofed email senders and fake login portals eliminates the primary entry vector for enterprise breaches.",
    "explanationBn": "কর্মীদের সাইবার সচেতনতা বৃদ্ধি ও ফিশিং শনাক্তকরণ প্রশিক্ষণ প্রতিষ্ঠানের নিরাপত্তা বজায় রাখে।",
    "topic": "Major E-Business Risks: Privacy, Server Downtime & Hackers",
    "difficulty": "Medium",
    "hint": "Continuous cybersecurity awareness..."
  },
  {
    "id": "q23",
    "question": "Q23: What is 'Database Connection Pooling' and how does it safeguard servers against traffic spikes?",
    "options": [
      "Reuses an existing cache of open database connections rather than creating new connections per request, preventing database exhaustion",
      "Pours water into the server database to cool it down",
      "Combines all customer tables into one giant text file",
      "Deletes all database queries permanently"
    ],
    "answer": "Reuses an existing cache of open database connections rather than creating new connections per request, preventing database exhaustion",
    "explanation": "Connection pools limit database socket overhead, preventing MySQL/Oracle servers from crashing during simultaneous checkout surges.",
    "explanationBn": "কানেকশন পুলিং ডেটাবেজ কানেকশন পুনরায় ব্যবহার করে সার্ভারের মেমরি ও রিসোর্স সাশ্রয় করে।",
    "topic": "Major E-Business Risks: Privacy, Server Downtime & Hackers",
    "difficulty": "Hard",
    "hint": "Reuses an existing cache of open database..."
  },
  {
    "id": "q24",
    "question": "Q24: In CBSE examinations, what are the three major e-business operational risks frequently tested in theory questions?",
    "options": [
      "(1) Violation of Customer Privacy, (2) Server Downtime during Peak-Hour Traffic Spikes, (3) Hackers Penetrating Company Security",
      "(1) Low product prices, (2) Fast delivery, (3) Free gift wrapping",
      "(1) 24x7 shop opening, (2) Mobile apps, (3) Wide variety",
      "(1) High star ratings, (2) Video reviews, (3) Easy returns"
    ],
    "answer": "(1) Violation of Customer Privacy, (2) Server Downtime during Peak-Hour Traffic Spikes, (3) Hackers Penetrating Company Security",
    "explanation": "These three categories represent the core risk vectors outlined specifically in the CBSE IT (802) syllabus.",
    "explanationBn": "সিবিএসই সিলেবাস অনুযায়ী প্রধান ৩টি ঝুঁকি হলো: তথ্যের গোপনীয়তা লঙ্ঘন, সার্ভার ডাউনটাইম এবং হ্যাকার আক্রমণ।",
    "topic": "Major E-Business Risks: Privacy, Server Downtime & Hackers",
    "difficulty": "Easy",
    "hint": "(1) Violation of Customer Privacy, (2) Server Downtime..."
  },
  {
    "id": "q25",
    "question": "Q25: What is the most effective comprehensive strategy to safeguard an e-business against these major risks?",
    "options": [
      "Defense-in-Depth: Cloud auto-scaling + Load balancers + WAF + End-to-end HTTPS/TLS + Strict privacy compliance (DPDP Act)",
      "Unplugging all servers from the internet permanently",
      "Disabling customer logins and running without a database",
      "Using only paper postal orders"
    ],
    "answer": "Defense-in-Depth: Cloud auto-scaling + Load balancers + WAF + End-to-end HTTPS/TLS + Strict privacy compliance (DPDP Act)",
    "explanation": "Layered defense-in-depth across hardware, software, network, and human policy layers ensures enterprise resilience and trust.",
    "explanationBn": "বহুস্তরীয় নিরাপত্তা (Defense-in-Depth) ব্যবস্থা ই-বিজনেসকে সমস্ত সাইবার ঝুঁকি থেকে রক্ষা করে।",
    "topic": "Major E-Business Risks: Privacy, Server Downtime & Hackers",
    "difficulty": "Medium",
    "hint": "Defense-in-Depth: Cloud auto-scaling..."
  }
];

export default questions;
