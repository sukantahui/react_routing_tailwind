// topic40_questions.js
// 30 Moderate to Expert Questions on Networking in Education, Campus LANs, NKN, Eduroam, and Academic Cyber Security

const questions = [
  {
    question: "What is the National Knowledge Network (NKN) in India and how does it empower academic institutions?",
    shortAnswer: "NKN is a high-speed, multi-gigabit optical fiber network backbone established by the Government of India that interconnects universities, IITs, NITs, and research laboratories at 1 Gbps to 10 Gbps speeds with low latency.",
    explanation: "NKN enables collaborative supercomputing, remote interactive lectures, and unified access to national research libraries across universities in West Bengal.",
    hint: "High-speed national fiber backbone connecting Indian universities and research institutions.",
    level: "basic",
    codeExample: "NKN_Uplink = { Bandwidth: '10 Gbps Direct Fiber', LatencyToNationalDC: '< 8 ms', Purpose: 'Research & Education' };"
  },
  {
    question: "What is Eduroam (Educational Roaming) and how does it authenticate visiting researchers globally?",
    shortAnswer: "Eduroam is a global Wi-Fi roaming service using 802.1X RADIUS federation; when a visiting researcher connects to Eduroam at a host university, their authentication request is securely proxied back to their home university RADIUS server using EAP-TTLS or PEAP.",
    explanation: "Allows students and professors from Jadavpur University to connect securely to Wi-Fi at Cambridge or MIT without obtaining local guest passwords.",
    hint: "Global university Wi-Fi roaming that authenticates users back to their home campus RADIUS server.",
    level: "expert",
    codeExample: "Eduroam_Auth: VisitingUser → Host_AP → Host_RADIUS → National_Proxy_RADIUS → Home_University_RADIUS → Access_Granted"
  },
  {
    question: "How is an Online Computer-Based Test (CBT) examination network secured against cheating?",
    shortAnswer: "By isolating testing terminals into an air-gapped or firewall-locked examination VLAN, running Safe Exam Browser (SEB) clients, disabling local USB ports and Wi-Fi, and whitelisting only the local exam server IP address.",
    explanation: "Prevents examinees from accessing search engines, remote desktop proxies, or external messaging applications during entrance exams in Kolkata.",
    hint: "Uses locked-down exam VLANs, Safe Exam Browser clients, and blocks all external Internet access.",
    level: "moderate",
    codeExample: "ExamFirewallRule: Allow Exam_Terminals (VLAN 40) → Local_Exam_Server (10.10.40.5:8080); Deny All Internet;"
  },
  {
    question: "What Multi-SSID architecture is standard on modern university campus Wi-Fi networks?",
    shortAnswer: "1. Faculty/Admin SSID (802.1X WPA3 Enterprise, direct intranet access); 2. Student SSID (Captive portal / 802.1X, throttled bandwidth); 3. Eduroam SSID (Global research roaming); 4. Guest SSID (OTP-verified, isolated to Internet only).",
    explanation: "Multi-SSID mapping assigns each user role to an isolated 802.1Q VLAN with distinct firewall and content filtering policies.",
    hint: "Separate SSIDs for Faculty, Students, Eduroam, and Guests mapped to isolated VLANs.",
    level: "moderate",
    codeExample: "SSID_Mapping = { 'Campus-Faculty': 'VLAN 10 (Admin)', 'Campus-Student': 'VLAN 20', 'Eduroam': 'VLAN 30', 'Campus-Guest': 'VLAN 90' };"
  },
  {
    question: "How do Learning Management Systems (LMS, e.g. Moodle / Canvas) scale during online quiz submissions?",
    shortAnswer: "Using Containerized Microservices on Kubernetes with an Application Load Balancer, Redis session caching, and read-replica MySQL database clusters to absorb tens of thousands of concurrent student quiz submissions.",
    explanation: "Prevents university portal crashes when 5,000 students submit end-semester assignments at 11:59 PM.",
    hint: "Scales using Kubernetes container pods, Redis caching, and database read-replicas.",
    level: "expert",
    codeExample: "k8s_HPA: minReplicas: 4, maxReplicas: 40, targetCPUUtilizationPercentage: 70 // Auto-scales LMS pods"
  },
  {
    question: "What is High-Density Wi-Fi 6 (802.11ax) design in university lecture halls and auditoriums?",
    shortAnswer: "Deploying multiple low-power Wi-Fi 6 Access Points equipped with directional beamforming antennas, Orthogonal Frequency-Division Multiple Access (OFDMA), and Target Wake Time (TWT) to handle 250–500 simultaneous laptops in a single auditorium.",
    explanation: "OFDMA divides channels into resource units, allowing multiple students to transmit simultaneously without radio contention.",
    hint: "Uses Wi-Fi 6 OFDMA and directional antennas to support 250+ students in one lecture hall.",
    level: "expert",
    codeExample: "AP_Config: 5GHz ChannelWidth = 20MHz; MinimumRate = 12Mbps; MaxClientsPerRadio = 120;"
  },
  {
    question: "What is the cost in Indian Rupees (₹) for an Enterprise Campus Wi-Fi 6 Controller and 30 Access Points?",
    shortAnswer: "Approximately ₹2,80,000 to ₹7,50,000 (e.g. Cisco Catalyst 9800-L, Aruba 7000 Series, or Ruijie Cloud Managed) including hardware controller and lifetime campus AP licenses.",
    explanation: "Enterprise controllers manage seamless fast-roaming (802.11r), RF power calibration, and rogue AP detection across campus in ₹ budgets.",
    hint: "Campus Wi-Fi controller + 30 APs cost ₹2,80,000 – ₹7,50,000 in Indian Rupees.",
    level: "moderate",
    codeExample: "Campus_WiFi_Setup_Cost = ₹4,20,000; // Hardware Controller + 30 Dual-Radio Wi-Fi 6 APs"
  },
  {
    question: "What is Layer-7 Application Content Filtering and Bandwidth Throttling in academic networks?",
    shortAnswer: "A Next-Gen Firewall policy that inspects application signatures to block illegal BitTorrent downloads, piracy portals, and crypto mining scripts while reserving guaranteed bandwidth (QoS) for academic research and video lectures.",
    explanation: "Prevents a few students downloading movies from starving the campus library research bandwidth in Barrackpore.",
    hint: "Blocks movie torrents and gaming while reserving bandwidth for study and research.",
    level: "basic",
    codeExample: "NGFW_Policy: Block Category 'P2P_Torrenting'; Throttle Category 'SocialMedia' to 500 Kbps per user;"
  },
  {
    question: "What is a Smart Digital Classroom Network and how does IGMP Snooping optimize lecture video multicast?",
    shortAnswer: "Smart classrooms stream 4K instructor video and whiteboard telemetry across campus; IGMP Snooping ensures multicast video streams are forwarded strictly to active smart screens rather than flooding all switch ports.",
    explanation: "Prevents unmanaged video floods from freezing campus VoIP phones and administrative computers.",
    hint: "IGMP snooping delivers live lecture video only to screens that requested it, stopping network flooding.",
    level: "moderate",
    codeExample: "ip igmp snooping\nip igmp snooping vlan 50 // Enables multicast snooping on Classroom Video VLAN"
  },
  {
    question: "How do universities survive Massive Traffic Surges during Board Exam Result Publishing?",
    shortAnswer: "By deploying Cloud CDN Edge Caching (e.g. Cloudflare / Akamai) and Virtual Waiting Rooms (Queue-It) in front of result databases, caching static student scorecards at the edge and serving millions of requests without hitting origin servers.",
    explanation: "Allows Bengal higher secondary examination portals in Kolkata to handle 2 million visits in 10 minutes without downtime.",
    hint: "Uses Cloud CDN caching and virtual waiting rooms to absorb millions of student result queries.",
    level: "expert",
    codeExample: "CDN_Rule: Cache Result_HTML for 300 seconds at Cloud Edge; Origin DB load reduced by 99.2%;"
  },
  {
    question: "What is a High-Performance Computing (HPC) Research Cluster Network in academic institutes?",
    shortAnswer: "A supercomputing network linking hundreds of compute nodes using ultra-low latency InfiniBand (100G/200G HDR) or RoCE (RDMA over Converged Ethernet) with sub-microsecond latency, executing physics simulations and AI training models.",
    explanation: "Allows researchers in Jadavpur to run complex molecular dynamics calculations across parallel GPU nodes.",
    hint: "Ultra-fast InfiniBand or RoCE network connecting supercomputer nodes with sub-microsecond latency.",
    level: "expert",
    codeExample: "HPC_Fabric = { Technology: 'InfiniBand HDR 200 Gbps', Latency: '0.6 μs', Protocol: 'MPI / RDMA' };"
  },
  {
    question: "What is 802.1X RADIUS Captive Portal vs 802.1X PEAP for student campus authentication?",
    shortAnswer: "Captive Portals intercept web browsers and require web login/OTP (easier setup but vulnerable to session hijacking); 802.1X PEAP/TTLS encrypts credentials at the Data Link layer with WPA3 Enterprise, preventing Wi-Fi packet sniffing.",
    explanation: "Universities in Kolkata deploy 802.1X PEAP for all enrolled students to guarantee encrypted wireless communication.",
    hint: "802.1X PEAP provides hardware-encrypted Wi-Fi; Captive Portal is a basic web login screen.",
    level: "moderate",
    codeExample: "radius-server host 10.0.1.25 auth-port 1812 acct-port 1813 key CampusSecret2026"
  },
  {
    question: "What is Wireless Intrusion Prevention System (WIPS) in campus security?",
    shortAnswer: "A security monitoring system that uses dedicated sensor access points to continuously scan the RF spectrum, detecting and automatically containing rogue APs, evil twin hotspots, and unauthorized mobile Wi-Fi tethers.",
    explanation: "Prevents students from plugging unauthorized Wi-Fi routers into dormitory wall jacks in Ichapur.",
    hint: "Scans radio airwaves to detect and shut down rogue Wi-Fi routers and unauthorized hotspots.",
    level: "expert",
    codeExample: "wips.onRogueAPDetected(RogueBSSID) => sendDeauthContainmentFrames(RogueBSSID);"
  },
  {
    question: "What is a Campus Core-Distribution-Access 10G/40G Fiber Backbone?",
    shortAnswer: "A 3-tier hierarchical network where single-mode optical fiber cables link departmental distribution switches in each academic building back to a redundant 40G/100G core switch in the Central Data Center.",
    explanation: "Provides high-throughput inter-departmental file sharing and resilient connectivity to NKN internet uplinks.",
    hint: "Fiber optic network connecting departmental buildings back to the central campus computer center.",
    level: "basic",
    codeExample: "CampusBackbone: Academic_Building_A --10G_Fiber--> Central_Data_Center_Core_Switch"
  },
  {
    question: "What is an Academic Sandbox / Honeynet in university cybersecurity labs?",
    shortAnswer: "An isolated, quarantined network environment where cybersecurity students and researchers can safely execute live malware, analyze botnet traffic, and perform penetration testing without risking the production university network.",
    explanation: "Allows security students in Barrackpore to dissect real ransomware samples in complete isolation.",
    hint: "Quarantined lab network for students to safely test live malware and hacking tools.",
    level: "moderate",
    codeExample: "SandboxFirewall: Block Sandbox_Subnet (192.168.99.0/24) <-> Production_University_LAN (10.0.0.0/8);"
  },
  {
    question: "What is Sharded MySQL / PostgreSQL Database Clustering for Student Information Systems (SIS)?",
    shortAnswer: "Partitioning student records across multiple database server nodes based on Student Enrollment ID or department, allowing high-concurrency course registrations without database locking bottlenecks.",
    explanation: "Allows 10,000 students to register for elective courses simultaneously on opening day.",
    hint: "Splits student records across multiple database servers to handle heavy course registration rushes.",
    level: "expert",
    codeExample: "ShardKey = StudentID % NumberOfDatabaseNodes; // Distributes write queries evenly"
  },
  {
    question: "What is Power over Ethernet (PoE+) allocation for Campus Smart Classrooms?",
    shortAnswer: "Supplying 30W DC power over Cat6 cables to ceiling-mounted Wi-Fi APs, motorized PTZ tracking cameras, and overhead IP microphones, eliminating high-voltage electrical wiring above classroom ceilings.",
    explanation: "Saves ₹85,000 in electrical contractor costs per academic building during smart classroom retrofits.",
    hint: "Powers classroom cameras, microphones, and Wi-Fi APs over Ethernet network cables.",
    level: "basic",
    codeExample: "switchport poe max 30000 // Allocates 30 Watts PoE+ to Classroom PTZ Camera Port"
  },
  {
    question: "What is Role-Based Bandwidth Quota Management for student hostels?",
    shortAnswer: "A policy engine that allocates individual daily or monthly data download quotas (e.g. 5 GB/day high-speed), automatically throttling users to 1 Mbps once their quota is exhausted until the midnight reset.",
    explanation: "Ensures fair bandwidth sharing across 2,000 hostel residents in campus dormitories in Kolkata.",
    hint: "Gives students a daily data limit (e.g. 5GB/day) to prevent network congestion in hostels.",
    level: "basic",
    codeExample: "quota_engine: if (studentUsageToday > 5GB) throttleSpeed(1Mbps); else speed(50Mbps);"
  },
  {
    question: "What is an Academic Institutional Repository (e.g. DSpace / EPrints) and how is it networked?",
    shortAnswer: "A digital archive hosting peer-reviewed faculty research papers, PhD theses, and datasets, accessible globally via OAI-PMH (Open Archives Initiative Protocol for Metadata Harvesting) over HTTPS.",
    explanation: "Allows global researchers to index and cite scholarly output from universities in West Bengal.",
    hint: "Digital repository hosting research theses and academic papers accessible globally.",
    level: "basic",
    codeExample: "DSpace_Endpoint: https://repository.univ.edu/oai/request?verb=Identify"
  },
  {
    question: "What is Remote Desktop / VDI (Virtual Desktop Infrastructure) for Engineering Computer Labs?",
    shortAnswer: "Hosting engineering simulation software (AutoCAD, MATLAB, SolidWorks) on central GPU server clusters in the campus data center, streaming virtual desktop pixels to lightweight thin-clients in student computer labs.",
    explanation: "Students in Ichapur can run heavy CAD simulations on inexpensive ₹12,000 thin-client terminals.",
    hint: "Runs heavy software like MATLAB on central servers and streams screens to cheap student computers.",
    level: "moderate",
    codeExample: "VDI_Protocol: Blast_Extreme / PCoIP streaming virtual GPU desktops to lab thin-clients."
  },
  {
    question: "What is a Student Dormitory Rogue DHCP Server problem and how does DHCP Snooping solve it?",
    shortAnswer: "When a student accidentally plugs their home Wi-Fi router into a hostel LAN wall jack using the LAN port instead of WAN, the rogue router begins broadcasting fake gateway IPs; DHCP Snooping drops these unauthorized offers at the switch port.",
    explanation: "Stops rogue routers from hijacking entire dormitory internet connections.",
    hint: "Blocks student home Wi-Fi routers from handing out bad IP addresses on hostel LANs.",
    level: "moderate",
    codeExample: "interface GigabitEthernet0/1-48\n  ip dhcp snooping limit rate 10 // Mitigates rogue DHCP offers"
  },
  {
    question: "What is an Academic Web Application Firewall (WAF) protecting against in university admission portals?",
    shortAnswer: "Inspects HTTP/HTTPS traffic targeting student admission forms to block SQL Injections, Cross-Site Scripting (XSS), automated scalper seat-booking bots, and unauthorized application fee tampering.",
    explanation: "Protects online entrance exam registration databases from malicious tampering in Kolkata.",
    hint: "Blocks hacker attacks like SQL injection and bots from tampering with admission applications.",
    level: "moderate",
    codeExample: "waf.rule: if (request.containsSQLKeywords() || request.isBotRateExceeded()) dropAndBlockIP();"
  },
  {
    question: "What is WebRTC and how does it power Low-Latency Distance Learning Seminars?",
    shortAnswer: "A browser-native framework supporting real-time peer-to-peer audio, video, and data communication over UDP (using SRTP encryption) with sub-200ms latency without requiring browser plugins.",
    explanation: "Enables interactive remote guest lectures between IIT Kharagpur and universities in Kolkata.",
    hint: "Browser technology providing sub-200ms real-time interactive video for online lectures.",
    level: "moderate",
    codeExample: "const peerConnection = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });"
  },
  {
    question: "How do Digital Library RFID Gates communicate with the Integrated Library System (ILS)?",
    shortAnswer: "Using SIP2 (Standard Interchange Protocol v2) or NCIP over TCP/IP, checking RFID book tags against the Koha/Alma library database to verify whether a book was properly checked out before opening gate turnstiles.",
    explanation: "Automates book issue tracking and prevents unauthorized library book removal in Jadavpur.",
    hint: "Connects library security gates to the book checkout database over TCP/IP using SIP2.",
    level: "basic",
    codeExample: "SIP2_Message: 09 /* Item Status Request */ | AB0012345 /* Book RFID Barcode */ → ILS Server"
  },
  {
    question: "What is Network Access Control (NAC) Posture Assessment for faculty laptops on campus?",
    shortAnswer: "A security check performed before admitting a faculty laptop onto the internal administrative network, verifying that the OS has the latest security patches, an active antivirus agent, and full-disk encryption enabled.",
    explanation: "Quarantines non-compliant laptops to an isolated remediation VLAN until required patches are installed.",
    hint: "Verifies faculty laptops have antivirus and updates before allowing them onto the internal network.",
    level: "expert",
    codeExample: "nac.assessPosture(device) => if (device.antivirusActive && device.osPatched) allowVLAN(Faculty);"
  },
  {
    question: "What is an Out-of-Band Management Network for University Data Center Servers?",
    shortAnswer: "A dedicated physical Gigabit Ethernet network connecting IPMI/iDRAC/iLO server management ports and console terminal servers, allowing system administrators to reboot crashed servers remotely even if the OS kernel hangs.",
    explanation: "Allows campus IT staff in Barrackpore to recover crashed LMS servers remotely on weekends.",
    hint: "Dedicated network allowing admins to reboot and repair crashed servers remotely.",
    level: "expert",
    codeExample: "IPMI_Access: https://192.168.100.15:443 (Dedicated Server Management Hardware Port)"
  },
  {
    question: "Why is First-Hop Redundancy (HSRP / VRRP) vital for Campus Central Core Switches?",
    shortAnswer: "It ensures that if the primary core switch hardware or power supply fails, the secondary backup core switch takes over routing for all academic buildings within 2 seconds without dropping active lecture video streams or exams.",
    explanation: "Prevents a single core switch failure from plunging the entire university campus offline.",
    hint: "Ensures backup core switch takes over in 2 seconds if the main campus switch fails.",
    level: "moderate",
    codeExample: "interface Vlan10\n  vrrp 10 ip 10.0.10.1\n  vrrp 10 priority 110 // Active Campus Default Gateway"
  },
  {
    question: "What is IPv6 Dual-Stack Deployment on University Campuses?",
    shortAnswer: "Running both IPv4 and IPv6 protocols simultaneously on all campus routers, switches, and servers, ensuring students and researchers can access international academic networks that operate on IPv6-only infrastructure.",
    explanation: "Universities across West Bengal assign native `/64` IPv6 prefixes to all campus Wi-Fi APs.",
    hint: "Running both IPv4 and IPv6 together so campus users can reach modern IPv6 research networks.",
    level: "moderate",
    codeExample: "interface GigabitEthernet0/1\n  ip address 10.0.1.1 255.255.255.0\n  ipv6 address 2001:db8:acad:1::1/64"
  },
  {
    question: "What is an Incident Response Plan for Ransomware Outbreaks in Academic Networks?",
    shortAnswer: "An emergency procedure that isolates infected subnets, revokes compromised Active Directory credentials, restores immutable offsite database backups, and preserves network forensic PCAP logs for investigation.",
    explanation: "Ensures university admissions and research databases can be fully recovered without paying extortion ransoms.",
    hint: "Emergency plan to isolate infected networks and restore clean backups during ransomware attacks.",
    level: "basic",
    codeExample: "IncidentProtocol: IsolateInfectedVLAN() → RevokeKerberosTickets() → RestoreImmutableBackup();"
  },
  {
    question: "What is the ultimate golden rule for designing, operating, and budgeting Educational Campus Networks?",
    shortAnswer: "'Deploy resilient 3-tier Core-Distribution-Access hierarchy with NKN multi-gigabit uplinks; implement 802.1X WPA3 Enterprise and Eduroam global roaming; isolate CBT exams in locked VLANs with Safe Exam Browser; enforce Layer-7 content filtering; and budget campus Wi-Fi 6 controllers in Indian Rupees (₹)!'",
    explanation: "This complete rule synthesizes national research backbones, high-density wireless design, exam security, bandwidth fairness, and financial budgeting.",
    hint: "NKN uplinks + Eduroam 802.1X + CBT locked VLANs + Layer-7 content filtering + Budgets in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: ConnectNKN() → DeployEduroamWPA3() → SecureCBTExams() → FilterLayer7Traffic() → BudgetInRupees(₹);"
  }
];

export default questions;
