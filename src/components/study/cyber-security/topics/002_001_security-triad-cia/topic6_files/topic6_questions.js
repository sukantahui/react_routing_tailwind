// Topic 6: Threats to Availability and Outages
// 30 High-Quality Moderate to Expert Questions & Answers with detailed explanations

const questions = [
  {
    question: "Which of the following best defines an Availability threat in cybersecurity?",
    options: [
      "Any event, malicious action, or system failure that prevents authorized users from accessing critical data, applications, or infrastructure when needed",
      "Unauthorized interception and eavesdropping on encrypted network packets across WAN links",
      "Unauthorized tampering and modification of database transaction records in memory",
      "Illegitimate privilege escalation from standard guest accounts to domain administrator privileges"
    ],
    correctAnswer: "Any event, malicious action, or system failure that prevents authorized users from accessing critical data, applications, or infrastructure when needed",
    explanation: "Threats to availability target the accessibility and reliability of services. This includes malicious DDoS attacks, ransomware encrypting files, hardware crashes, BGP route leaks, power outages, and natural disasters."
  },
  {
    question: "How does a SYN Flood attack exhaust server resources at Layer 4 of the OSI model?",
    options: [
      "It sends an overwhelming number of TCP SYN packets with spoofed source IPs, filling the server's TCP backlog queue while waiting for SYN-ACK responses that never complete",
      "It repeatedly requests large 4K video files over HTTP to saturate available network bandwidth",
      "It injects malformed SQL queries into login fields to lock database server tables",
      "It forces the CPU to calculate infinite cryptographic hashes, causing thermal throttling"
    ],
    correctAnswer: "It sends an overwhelming number of TCP SYN packets with spoofed source IPs, filling the server's TCP backlog queue while waiting for SYN-ACK responses that never complete",
    explanation: "In a SYN flood, the attacker sends SYN packets without completing the 3-way handshake (leaving half-open connections). This rapidly exhausts the server's connection backlog queue, rejecting legitimate incoming TCP connections."
  },
  {
    question: "What defense mechanism allows a server to resist TCP SYN floods without allocating memory for half-open connection state tables?",
    options: [
      "SYN Cookies",
      "Reverse ARP",
      "BGP Hijacking",
      "Split Horizon DNS"
    ],
    correctAnswer: "SYN Cookies",
    explanation: "SYN Cookies encode the connection parameters into the Initial Sequence Number (ISN) in the SYN-ACK response rather than allocating server memory in the backlog table. State is only allocated after the legitimate client returns the ACK."
  },
  {
    question: "In a Slowloris Layer 7 DDoS attack, how does an attacker bring down a web server with minimal bandwidth?",
    options: [
      "By opening multiple HTTP connections and sending incomplete HTTP headers at agonizingly slow intervals, exhausting the web server's maximum concurrent connection pool",
      "By flooding the web server with 500,000 UDP packets per second containing oversized payloads",
      "By corrupting the server's DNS zone files to misdirect inbound traffic to loopback addresses",
      "By sending corrupted SSL certificates that cause TLS handshake decryption timeouts"
    ],
    correctAnswer: "By opening multiple HTTP connections and sending incomplete HTTP headers at agonizingly slow intervals, exhausting the web server's maximum concurrent connection pool",
    explanation: "Slowloris exploits thread/connection pool limitations in web servers (like Apache) by sending partial HTTP headers periodically (e.g. 'X-Header: value\\r\\n') without sending the concluding blank line, keeping worker threads hostage."
  },
  {
    question: "What is a DNS Amplification attack, and what OSI layer and protocol does it exploit?",
    options: [
      "A Layer 7 application flood that overwrites root zone records with recursive query loops",
      "A volumetric Layer 4/7 attack exploiting open recursive DNS resolvers via UDP to return responses up to 50-70x larger than the spoofed source query",
      "A TCP-based attack where attackers poison authoritative nameserver records with rogue IP addresses",
      "A physical hardware attack that overloads DNS appliance battery power supplies"
    ],
    correctAnswer: "A volumetric Layer 4/7 attack exploiting open recursive DNS resolvers via UDP to return responses up to 50-70x larger than the spoofed source query",
    explanation: "DNS amplification uses open recursive DNS resolvers. The attacker sends small DNS queries (e.g. 'ANY example.com') with the victim's spoofed IP over UDP. The resolvers send massive DNS response packets (up to 70x larger) to the victim."
  },
  {
    question: "During a volumetric DDoS surge of 450 Gbps targeting a Kolkata e-commerce platform, which architecture is most effective for scrubbing malicious traffic?",
    options: [
      "Anycast-routed Cloud DDoS Scrubbing Centers distributed globally across edge Points of Presence (PoPs)",
      "A single on-premise hardware firewall installed behind a local 1 Gbps fiber optic line",
      "Switching all web application databases from PostgreSQL to SQLite",
      "Increasing the Apache keepalive timeout from 5 seconds to 120 seconds"
    ],
    correctAnswer: "Anycast-routed Cloud DDoS Scrubbing Centers distributed globally across edge Points of Presence (PoPs)",
    explanation: "Volumetric DDoS attacks exceeding the organization's local ISP bandwidth (e.g. 450 Gbps) must be absorbed at the edge by global Anycast cloud scrubbing networks (e.g., Cloudflare, Akamai, AWS Shield) before reaching the origin server."
  },
  {
    question: "How does ransomware such as LockBit or BlackCat directly threaten system Availability?",
    options: [
      "By encrypting mission-critical production databases, file systems, and backups, rendering them inaccessible until decrypted",
      "By secretly copying customer passwords without altering any file contents or access controls",
      "By sending fraudulent phishing emails from executive inboxes without disrupting servers",
      "By modifying HTML meta tags on the public corporate marketing homepage"
    ],
    correctAnswer: "By encrypting mission-critical production databases, file systems, and backups, rendering them inaccessible until decrypted",
    explanation: "Ransomware directly destroys availability by encrypting operational databases, virtual machines, and configuration files using strong asymmetric/symmetric keys (e.g., RSA-4096 and AES-256), bringing business operations to a complete halt."
  },
  {
    question: "What distinguishes 'Wiper' malware (such as HermeticWiper or NotPetya) from standard commercial ransomware?",
    options: [
      "Wiper malware irreversibly destroys Master Boot Records (MBR) and raw disk partitions with no possibility of decryption recovery, regardless of ransom payments",
      "Wiper malware only steals cryptocurrency private keys from desktop browser extensions",
      "Wiper malware temporarily slows down network switch ports for 30 minutes before cleaning itself",
      "Wiper malware installs fake antivirus alerts but does not delete or encrypt any files"
    ],
    correctAnswer: "Wiper malware irreversibly destroys Master Boot Records (MBR) and raw disk partitions with no possibility of decryption recovery, regardless of ransom payments",
    explanation: "Wipers are destructive cyber warfare weapons designed to permanently eradicate availability. They overwrite MBRs, partition tables, and file sectors with garbage bytes without keeping decryption keys."
  },
  {
    question: "What is a BGP Route Leak / Hijack, and how does it cause severe availability outages?",
    options: [
      "When an Autonomous System (AS) incorrectly announces IP prefix routes, causing global internet traffic destined for a victim to be misdirected or blackholed into a dead end",
      "When an internal ethernet switch broadcasts ARP requests on all VLAN ports simultaneously",
      "When an attacker intercepts Bluetooth beacons in a public cafeteria to block smartphone Wi-Fi",
      "When an SSL certificate expires and causes browsers to show an interstitial warning page"
    ],
    correctAnswer: "When an Autonomous System (AS) incorrectly announces IP prefix routes, causing global internet traffic destined for a victim to be misdirected or blackholed into a dead end",
    explanation: "Border Gateway Protocol (BGP) governs internet routing. A route leak or hijack occurs when an ISP mistakenly or maliciously advertises more specific IP prefixes, rerouting global traffic away from legitimate servers into blackholes."
  },
  {
    question: "Which internet routing standard prevents BGP route hijacking by using cryptographic digital signatures to validate route origin authorizations?",
    options: [
      "RPKI (Resource Public Key Infrastructure)",
      "DNSSEC (Domain Name System Security Extensions)",
      "SNMPv3 (Simple Network Management Protocol)",
      "DHCP Snooping"
    ],
    correctAnswer: "RPKI (Resource Public Key Infrastructure)",
    explanation: "RPKI allows network operators to create Route Origin Authorizations (ROAs) cryptographically binding an Autonomous System Number (ASN) to its legitimate IP address prefixes, preventing invalid route announcements."
  },
  {
    question: "Debangshu in Barrackpore is auditing physical risks to a factory SCADA system. Which environmental threat causes rapid hardware thermal shutdowns?",
    options: [
      "HVAC (Heating, Ventilation, and Air Conditioning) cooling compressor failure in the server enclosure",
      "Installing category 6 unshielded twisted pair ethernet cabling instead of fiber optics",
      "Setting up NTP time synchronization with a local Stratum-2 time server",
      "Enabling SNMP monitoring on industrial edge routers"
    ],
    correctAnswer: "HVAC (Heating, Ventilation, and Air Conditioning) cooling compressor failure in the server enclosure",
    explanation: "High-density server racks generate extreme heat. An HVAC cooling failure causes server temperatures to exceed safe thresholds within minutes, triggering automated thermal emergency shutdowns to prevent silicon damage."
  },
  {
    question: "What is a 'Single Point of Failure' (SPOF) in high-availability network architecture?",
    options: [
      "Any individual hardware, software, or human component whose failure will cause the entire system to stop functioning",
      "A dedicated firewall that inspects all ingress traffic before forwarding to web servers",
      "A centralized syslog server that aggregates event logs from twenty switches",
      "A multi-region database cluster with synchronous replication"
    ],
    correctAnswer: "Any individual hardware, software, or human component whose failure will cause the entire system to stop functioning",
    explanation: "A Single Point of Failure (SPOF) is a critical bottleneck—such as a single power feed, lone internet service provider (ISP) cable, un-clustered load balancer, or sole database master—whose failure causes a total outage."
  },
  {
    question: "Under the 3-2-1-1-0 backup rule for ransomware resilience and availability, what does the second '1' and the '0' represent?",
    options: [
      "1 Immutable or air-gapped copy, and 0 errors verified through automated restore testing",
      "1 copy in the same room, and 0 administrative passwords required",
      "1 cloud bucket on AWS, and 0 encryption algorithms applied",
      "1 backup tape mailed to an offshore office, and 0 retention days"
    ],
    correctAnswer: "1 Immutable or air-gapped copy, and 0 errors verified through automated restore testing",
    explanation: "The 3-2-1-1-0 rule mandates 3 copies of data, on 2 different media, with 1 copy offsite, 1 copy immutable/air-gapped (write-once-read-many), and 0 errors on automated restoration drills."
  },
  {
    question: "Mahima in Ichapur experiences a Slow POST (R-U-Dead-Yet / RUDY) attack. How does this attack exhaust web server availability?",
    options: [
      "It submits an HTTP POST with a huge Content-Length header and transmits message body data byte-by-byte at 10-second intervals",
      "It sends 10,000 UDP packets containing corrupted fragmentation offset headers",
      "It sends malformed ICMP echo requests to saturate the switch backplane",
      "It deletes the web server's .htaccess configuration file via FTP"
    ],
    correctAnswer: "It submits an HTTP POST with a huge Content-Length header and transmits message body data byte-by-byte at 10-second intervals",
    explanation: "RUDY (R-U-Dead-Yet) targets HTTP POST forms. By declaring a large Content-Length (e.g., 2 MB) and sending form data one byte every 10 seconds, it holds server execution threads open indefinitely."
  },
  {
    question: "What is an NTP Amplification attack, and what specific command was historically abused?",
    options: [
      "The 'monlist' command, which returned the addresses of the last 600 hosts that contacted the NTP server",
      "The 'time_sync_all' command, which rebooted all synchronized clocks",
      "The 'reset_epoch' command, which set system time to January 1, 1970",
      "The 'dump_keys' command, which leaked cryptographic public keys"
    ],
    correctAnswer: "The 'monlist' command, which returned the addresses of the last 600 hosts that contacted the NTP server",
    explanation: "NTP amplification abused the 'monlist' command on unpatched NTP servers. A small spoofed UDP request triggered a response packet up to 206 times larger containing the last 600 interacting IP addresses."
  },
  {
    question: "Which CERT-In directive mandates strict reporting timelines for major cyber security incidents causing widespread service outages in India?",
    options: [
      "Mandatory reporting of critical cybersecurity incidents to CERT-In within 6 hours of discovery",
      "Annual voluntary summary submission during quarterly tax audits",
      "Reporting outages only if financial damage exceeds ₹5,00,00,000 within 30 days",
      "Publishing a public newspaper advertisement within 48 hours"
    ],
    correctAnswer: "Mandatory reporting of critical cybersecurity incidents to CERT-In within 6 hours of discovery",
    explanation: "The CERT-In Cybersecurity Directions of April 2022 mandate that all Indian enterprises, service providers, intermediaries, and government bodies report critical cyber incidents (including major outages and ransomware) within 6 hours."
  },
  {
    question: "How does a 'Ping of Death' attack crash legacy operating systems?",
    options: [
      "By sending an oversized IP packet (> 65,535 bytes) fragmented across multiple packets that overflows memory buffers when reassembled by the victim OS",
      "By sending 1,000,000 ICMP echo requests per second to trigger CPU overheating",
      "By pinging the broadcast address to cause an infinite network feedback loop",
      "By modifying the TTL (Time to Live) value to zero"
    ],
    correctAnswer: "By sending an oversized IP packet (> 65,535 bytes) fragmented across multiple packets that overflows memory buffers when reassembled by the victim OS",
    explanation: "The Ping of Death created fragmented packets exceeding the maximum IP payload limit of 65,535 bytes. When reassembled, it caused buffer overflows and kernel crashes in unpatched operating systems."
  },
  {
    question: "What is a 'Smurf Attack', and how does it utilize ICMP and network broadcast addresses?",
    options: [
      "The attacker sends ICMP Echo requests with the victim's spoofed source IP to a network's broadcast address, causing every host on the subnet to flood the victim with replies",
      "The attacker injects fake MAC addresses into the switch CAM table to cause packet unicast flooding",
      "The attacker sends small UDP packets containing corrupted DNS TXT records",
      "The attacker modifies the DHCP server scope to allocate duplicate IP addresses"
    ],
    correctAnswer: "The attacker sends ICMP Echo requests with the victim's spoofed source IP to a network's broadcast address, causing every host on the subnet to flood the victim with replies",
    explanation: "In a Smurf attack, the adversary broadcasts ICMP requests to an amplifier network with the victim's spoofed IP. All nodes reply with ICMP Echo Replies to the victim, saturating its ingress bandwidth."
  },
  {
    question: "How does an HTTP Flood (Layer 7) differ from a volumetric UDP flood (Layer 4)?",
    options: [
      "HTTP floods require complete 3-way TCP handshakes and consume deep web application server CPU/database resources, while UDP floods simply clog raw network pipes",
      "HTTP floods can only be launched from physical desktop computers, whereas UDP floods use smart TVs",
      "HTTP floods always breach confidentiality, while UDP floods breach integrity",
      "HTTP floods use spoofed IP addresses that cannot receive responses"
    ],
    correctAnswer: "HTTP floods require complete 3-way TCP handshakes and consume deep web application server CPU/database resources, while UDP floods simply clog raw network pipes",
    explanation: "Layer 7 HTTP floods establish full TCP connections and request intensive dynamic web pages or search queries, exhausting database connections and CPU threads with relatively low bandwidth compared to Layer 4 UDP floods."
  },
  {
    question: "Mamata in Kolkata is securing a banking portal against botnet DDoS floods. Which challenge-response mechanism validates whether incoming HTTP requests originate from humans?",
    options: [
      "Cloud-managed Managed Challenge / CAPTCHA (e.g. Turnstile, reCAPTCHA v3)",
      "Setting static IP routing on core Cisco switches",
      "Enabling Telnet on port 23 for administrative remote access",
      "Increasing disk swap partition space to 64 GB"
    ],
    correctAnswer: "Cloud-managed Managed Challenge / CAPTCHA (e.g. Turnstile, reCAPTCHA v3)",
    explanation: "Managed challenges (JavaScript execution tests, browser biometric analysis, and CAPTCHAs) filter automated botnet requests before they reach backend application servers, safeguarding service availability."
  },
  {
    question: "What is 'Cascading Failure' in distributed microservice architectures, and how does it compromise availability?",
    options: [
      "When a single downstream service failure causes caller services to hang on timeouts, exhausting thread pools and triggering a chain reaction that crashes all upstream systems",
      "When water physically leaks from upper floor bathrooms into the basement server room",
      "When a developer commits broken syntax to a git staging branch",
      "When an SSL certificate auto-renews 30 days before expiration"
    ],
    correctAnswer: "When a single downstream service failure causes caller services to hang on timeouts, exhausting thread pools and triggering a chain reaction that crashes all upstream systems",
    explanation: "Cascading failures occur when one overloaded microservice fails, causing upstream services to queue requests and exhaust thread pools, collapsing the entire distributed architecture in a domino effect."
  },
  {
    question: "Which software resilience pattern immediately fails fast and stops making outbound requests to a struggling dependency to prevent cascading failure?",
    options: [
      "Circuit Breaker Pattern",
      "Factory Method Pattern",
      "Singleton Pattern",
      "Observer Pattern"
    ],
    correctAnswer: "Circuit Breaker Pattern",
    explanation: "The Circuit Breaker pattern wraps protected function calls. If failure rates cross a threshold, the breaker 'trips open', returning fallback responses instantly without making network calls, allowing the failing service time to recover."
  },
  {
    question: "Abhronila in Jadavpur is evaluating telecom risks. What physical availability disaster occurred when an excavator trenched through the road near the campus?",
    options: [
      "Backhoe Fade (Physical fiber optic line severance causing total regional data isolation)",
      "Overnight lightning strike inducing electromagnetic pulses in copper patch cords",
      "Ransomware infection transmitted through mechanical excavator hydraulics",
      "BGP route leak caused by vibration on roadside manhole covers"
    ],
    correctAnswer: "Backhoe Fade (Physical fiber optic line severance causing total regional data isolation)",
    explanation: "'Backhoe fade' is a common industry term for physical fiber optic cable severance caused by municipal construction or road digging. Organizations protect against this by routing dual-homed diverse fiber lines via separate geographic paths."
  },
  {
    question: "What legal consequence is defined under Section 66F of the Indian Information Technology Act (2000) for acts of Cyber Terrorism that disrupt critical infrastructure?",
    options: [
      "Imprisonment for life",
      "A simple administrative fine of ₹5,000",
      "Community service at a local municipal library for 30 days",
      "6 months suspended sentence with computer confiscation"
    ],
    correctAnswer: "Imprisonment for life",
    explanation: "Under Section 66F of the Indian IT Act 2000, anyone who attacks or denies access to critical national information infrastructure to threaten national sovereignty or security faces life imprisonment."
  },
  {
    question: "How does a Memcached Reflection DDoS attack achieve amplification factors exceeding 50,000x?",
    options: [
      "Attackers send tiny UDP requests to exposed Memcached instances on port 11211 containing pre-loaded large key payloads with spoofed victim source IPs",
      "Attackers execute remote code execution scripts that overwrite server RAM caches",
      "Attackers exploit SSH tunnels to replicate database tables across 10,000 servers",
      "Attackers flood CPU caches using speculative branch prediction exploits"
    ],
    correctAnswer: "Attackers send tiny UDP requests to exposed Memcached instances on port 11211 containing pre-loaded large key payloads with spoofed victim source IPs",
    explanation: "Memcached on UDP port 11211 allowed attackers to store multi-megabyte payloads and retrieve them using a tiny 15-byte UDP packet, generating record-shattering amplification ratios up to 51,200x."
  },
  {
    question: "What is Rate Limiting, and how does it defend public REST APIs against availability exhaustion?",
    options: [
      "It restricts the number of incoming API requests allowed from a specific client IP or API key within a designated time window (e.g. 100 requests/minute)",
      "It caps the physical broadband bandwidth of the data center to 10 Mbps at all times",
      "It delays all HTTP responses by 5 seconds to reduce server load",
      "It forces users to change their API keys every 15 minutes"
    ],
    correctAnswer: "It restricts the number of incoming API requests allowed from a specific client IP or API key within a designated time window (e.g. 100 requests/minute)",
    explanation: "Rate limiting uses algorithms like Token Bucket or Leaky Bucket to throttle excessive requests from individual clients, preventing rogue scripts and DDoS bots from starving CPU/memory resources for legitimate users."
  },
  {
    question: "In Cloudflare or AWS WAF, what does an 'Under Attack Mode' toggle do during an ongoing massive Layer 7 DDoS attack?",
    options: [
      "It presents an automated JavaScript computational challenge and browser verification to every visiting client before allowing access to origin web servers",
      "It permanently terminates the cloud account and deletes all virtual machine snapshots",
      "It switches all TLS traffic to unencrypted plaintext HTTP to reduce CPU decryption load",
      "It forwards all incoming web requests directly to the local police department"
    ],
    correctAnswer: "It presents an automated JavaScript computational challenge and browser verification to every visiting client before allowing access to origin web servers",
    explanation: "'Under Attack Mode' injects a 5-second interstitial challenge page requiring client browsers to solve a cryptographic JavaScript puzzle, filtering out automated attack bots before requests hit the origin."
  },
  {
    question: "Why are dual-homed Internet Service Provider (ISP) connections with BGP multihoming essential for enterprise availability?",
    options: [
      "If one physical ISP suffers a submarine cable cut or routing failure, traffic automatically fails over to the alternate carrier with minimal interruption",
      "They allow employees to download files twice as fast using torrent peer-to-peer software",
      "They eliminate the need for firewalls, antivirus software, and access controls",
      "They ensure that all internal office passwords are automatically synchronized"
    ],
    correctAnswer: "If one physical ISP suffers a submarine cable cut or routing failure, traffic automatically fails over to the alternate carrier with minimal interruption",
    explanation: "BGP multihoming connects an organization to two or more independent telecommunications carriers, providing carrier-level redundancy so a single ISP blackout does not knock the enterprise offline."
  },
  {
    question: "What is 'Chaos Engineering' (e.g., Netflix Chaos Monkey), and how does it improve system availability?",
    options: [
      "The disciplined practice of intentionally injecting controlled failures (e.g. randomly killing production servers) to uncover and fix resilience flaws before real outages occur",
      "Deploying untested code directly into production at midnight to evaluate developer reaction time",
      "Allowing unauthorized hackers into the corporate network to test internal employee vigilance",
      "Randomly deleting half of all database records every month to save cloud storage costs"
    ],
    correctAnswer: "The disciplined practice of intentionally injecting controlled failures (e.g. randomly killing production servers) to uncover and fix resilience flaws before real outages occur",
    explanation: "Chaos Engineering intentionally tests system resilience by terminating instances, injecting network latency, and breaking dependencies in production, verifying that automated self-healing and failover function properly."
  },
  {
    question: "What is an Uninterruptible Power Supply (UPS) combined with an Automatic Transfer Switch (ATS) designed to achieve in a data center?",
    options: [
      "Bridge instantaneous power loss with battery backup and automatically transition server load to an on-site diesel backup generator within seconds",
      "Prevent malware from spreading across internal category-6 ethernet cables",
      "Speed up database indexing algorithms during peak business hours",
      "Encrypt all hard drive sectors with AES-256 in real time"
    ],
    correctAnswer: "Bridge instantaneous power loss with battery backup and automatically transition server load to an on-site diesel backup generator within seconds",
    explanation: "When utility grid power fails, the UPS battery bank instantly powers equipment without a millisecond of drop-off, while the ATS starts the diesel generator and transfers the electrical load seamlessly."
  }
];

export default questions;
