// topic38_questions.js
// 30 Moderate to Expert Questions on Real-Life Networking Examples, Architectures, and Cyber Security

const questions = [
  {
    question: "What are the major components in a real-world FTTH (Fiber to the Home) residential network?",
    shortAnswer: "An Optical Line Terminal (OLT) at the ISP Central Office, passive optical splitters (PON), an Optical Network Unit (ONU/ONT) at the home, and a Dual-Band Wi-Fi 6 gigabit router managing local LAN and IoT devices.",
    explanation: "FTTH delivers 100 Mbps to 1 Gbps symmetric broadband over single-mode optical fiber directly to residences.",
    hint: "OLT at ISP central office, optical splitters, ONT modem at home, and Wi-Fi router.",
    level: "basic",
    codeExample: "FTTH_Topology = ['ISP Central Office OLT', 'Passive Optical Splitter 1:64', 'Home ONT', 'Wi-Fi 6 Router'];"
  },
  {
    question: "What sequence of network protocols executes when a user types 'https://wb.gov.in' into a web browser?",
    shortAnswer: "1. DHCP (Local IP/Gateway/DNS setup); 2. ARP (Resolves Gateway MAC); 3. DNS (Resolves domain to IP); 4. TCP 3-Way Handshake (Port 443); 5. TLS 1.3 Handshake (ECDHE Key Exchange); 6. HTTP/2 or HTTP/3 GET request and page rendering.",
    explanation: "This complete multi-layer sequence spans Physical, Data Link, Network, Transport, and Application layers within 100–300 milliseconds.",
    hint: "DHCP → ARP → DNS → TCP Handshake → TLS 1.3 Key Exchange → HTTP GET.",
    level: "moderate",
    codeExample: "PacketTrace = ['DHCP_Ack', 'ARP_Request', 'DNS_Query', 'TCP_SYN_ACK', 'TLS_ClientHello', 'HTTP2_GET'];"
  },
  {
    question: "How does a Content Delivery Network (CDN, e.g. Cloudflare / Akamai) stream live video without buffering in real life?",
    shortAnswer: "CDNs deploy thousands of edge cache servers at local ISP Internet Exchange Points (IXPs); BGP Anycast automatically routes user requests to the geographically nearest edge server, serving video segments locally with sub-10ms latency.",
    explanation: "Instead of millions of users in Kolkata hitting a single origin server in Mumbai, requests are served from local edge caches in Kolkata.",
    hint: "Uses BGP Anycast and local edge caching at regional Internet Exchange Points.",
    level: "expert",
    codeExample: "CDN_Routing: User_In_Kolkata → BGP_Anycast → Nearest_Kolkata_IXP_Cache → Serves Video in 4ms"
  },
  {
    question: "What is a 3-Tier Enterprise Campus Network Architecture (Core, Distribution, Access)?",
    shortAnswer: "Access Layer connects end-user PCs, APs, and IP phones; Distribution Layer aggregates access switches, performs inter-VLAN routing, and enforces ACL security policies; Core Layer provides high-speed, non-blocking packet switching across campus buildings.",
    explanation: "Hierarchical modular design ensures fault isolation, deterministic latency, and seamless scalability.",
    hint: "Access (connects users), Distribution (routing & policies), Core (high-speed backbone).",
    level: "moderate",
    codeExample: "Hierarchy = { Access: '24-Port PoE+ Switches', Distribution: 'L3 Layer Switches', Core: '100G Fiber Core' };"
  },
  {
    question: "How do Retail Point-of-Sale (POS) and ATM networks securely transmit card transactions?",
    shortAnswer: "Over cellular 4G/5G or broadband links encrypted with dedicated Site-to-Site IPsec VPN tunnels, isolating payment card data into a strict PCI-DSS compliant VLAN, with hardware encryption performed by HSM modules.",
    explanation: "Even if an attacker taps the physical ATM network cable, transaction payloads are encrypted with AES-256 ciphertexts.",
    hint: "Encrypted IPsec VPN tunnels with PCI-DSS isolated VLANs and Hardware Security Modules.",
    level: "basic",
    codeExample: "ATM_Network: POS_Terminal → IPsec_Cellular_Router → Encrypted_Tunnel → Banking_Core_HSM"
  },
  {
    question: "What is High Availability (HA) First Hop Redundancy (HSRP / VRRP) in corporate networks?",
    shortAnswer: "A protocol pair where two physical routers share a single Virtual Gateway IP address; if the primary active router hardware fails, the standby router takes over packet forwarding within 1 to 3 seconds with zero disruption to users.",
    explanation: "Prevents a single point of failure at the default gateway router in corporate offices in Barrackpore.",
    hint: "Two routers share one virtual IP; the backup takes over instantly if the main router fails.",
    level: "expert",
    codeExample: "interface GigabitEthernet0/0\n  vrrp 10 ip 10.0.1.1\n  vrrp 10 priority 110 // Active Master Gateway"
  },
  {
    question: "What is the cost in Indian Rupees (₹) for an Enterprise Campus Core Switch & Managed Distribution Stack?",
    shortAnswer: "Approximately ₹1,10,000 to ₹4,50,000 (e.g. Cisco Catalyst 9300, Aruba CX 6300, or Juniper EX4300) depending on 10G/25G SFP+ uplink density and redundant modular power supplies.",
    explanation: "Enterprise core switches provide line-rate 480 Gbps backplane switching, dynamic routing, and redundant hot-swappable fans in ₹ budgets.",
    hint: "Enterprise campus core switch stack costs ₹1,10,000 – ₹4,50,000 in Indian Rupees.",
    level: "moderate",
    codeExample: "CampusCore_Switch_Cost = ₹2,40,000; // Dual Redundant Power, 24x 10G SFP+ Core Switch"
  },
  {
    question: "How do Municipal Smart Traffic Surveillance Networks transmit hundreds of 4K CCTV camera streams?",
    shortAnswer: "Using an outdoor industrial optical fiber ring with Resilient Ethernet Protocol (REP) or G.8032 ERPS ring topology, delivering continuous PoE+ power to IP cameras and multicast streaming video to the central Police Command Center.",
    explanation: "ERPS rings heal optical fiber cable breaks within 50 milliseconds, ensuring zero loss of live surveillance footage.",
    hint: "Industrial outdoor fiber rings using ERPS ring redundancy to heal cable cuts in 50ms.",
    level: "expert",
    codeExample: "CCTV_Ring = { Topology: 'G.8032 ERPS Fiber Ring', RecoveryTime: '< 50 ms', Stream: '4K H.265 Multicast' };"
  },
  {
    question: "What is Dual-ISP BGP Multi-Homing in real-world corporate connectivity?",
    shortAnswer: "An enterprise connects to two independent Internet Service Providers (e.g. Airtel and Tata Teleservices) using Border Gateway Protocol (BGP) with its own Autonomous System Number (ASN) and public IP prefix, providing automated failover if one ISP fiber line is cut.",
    explanation: "Ensures 99.999% uptime for online banking and examination portals in Kolkata.",
    hint: "Connecting to two separate ISPs using BGP so Internet remains online if one ISP goes down.",
    level: "expert",
    codeExample: "router bgp 65000\n  neighbor Airtel_ISP remote-as 9498\n  neighbor Tata_ISP remote-as 4755 // Multi-homing"
  },
  {
    question: "What is Power over Ethernet (PoE / PoE+ / PoE++ - IEEE 802.3bt) in enterprise deployments?",
    shortAnswer: "A technology that transmits electrical DC power (up to 30W on PoE+ and 90W on PoE++) alongside gigabit Ethernet data over standard Cat6 copper twisted-pair cables, powering IP phones, Wi-Fi 6 APs, and PTZ security cameras without separate power outlets.",
    explanation: "PoE switches eliminate costly electrical wiring runs for hundreds of ceiling-mounted access points in campus buildings.",
    hint: "Sends electricity over Ethernet cables to power IP cameras, phones, and Wi-Fi access points.",
    level: "basic",
    codeExample: "PoE_Standards = { '802.3af (PoE)': '15.4W', '802.3at (PoE+)': '30W', '802.3bt (PoE++)': '90W' };"
  },
  {
    question: "What is a Layer-7 Application Load Balancer (ALB) in real-world web scale architectures?",
    shortAnswer: "A reverse proxy load balancer (NGINX, HAProxy, AWS ALB) that inspects HTTP request headers, cookies, and URL paths to intelligently distribute incoming web traffic across hundreds of backend microservice container pods.",
    explanation: "ALBs route `/api/login` requests to authentication pods and `/api/checkout` requests to payment clusters.",
    hint: "Distributes web traffic across backend servers based on URL paths, cookies, and HTTP headers.",
    level: "moderate",
    codeExample: "upstream backend_api { server 10.0.5.1:8080; server 10.0.5.2:8080; }\nproxy_pass http://backend_api;"
  },
  {
    question: "What is NetFlow / IPFIX and how do real-world network operations centers (NOC) use it?",
    shortAnswer: "A network telemetry protocol built into routers and switches that exports metadata about active traffic conversations (Source/Dest IP, Ports, Bytes, Duration) to a collector, allowing NOC engineers to visualize bandwidth consumption and detect DDoS spikes.",
    explanation: "Engineers in Kolkata use NetFlow analyzers to identify which department is saturating the 1 Gbps Internet leased line.",
    hint: "Exports traffic conversation statistics (IPs, ports, bandwidth) to monitor network usage.",
    level: "moderate",
    codeExample: "ip flow-export destination 10.0.0.50 2055\nip flow-export version 9"
  },
  {
    question: "What is the cost in Indian Rupees (₹) for a Municipal Outdoor 4K IP CCTV Surveillance Ring (10-Node Setup)?",
    shortAnswer: "Approximately ₹2,50,000 to ₹12,00,000 (including ruggedized outdoor industrial PoE switches, 4K ANPR cameras, fiber transceivers, and central NVR storage arrays).",
    explanation: "Municipal deployments require weatherproof IP67 enclosures, surge protectors, and outdoor armored single-mode fiber in ₹ budgets.",
    hint: "10-Node municipal surveillance setup costs ₹2,50,000 – ₹12,00,000 in Indian Rupees.",
    level: "moderate",
    codeExample: "Municipal_CCTV_Cost = ₹4,80,000; // 10 Outdoor Industrial PoE Switches + 20 4K ANPR Cameras"
  },
  {
    question: "How do Microservices communicate inside a Kubernetes Container Cluster across a Virtual Overlay Network?",
    shortAnswer: "Using Container Network Interface (CNI) plugins (Calico, Cilium with eBPF, Flannel) that create an encapsulated VXLAN or direct-routed virtual overlay network, assigning a unique private IP address to every individual container Pod.",
    explanation: "eBPF-powered Cilium filters microservice packets directly inside the Linux kernel at multi-gigabit line rate.",
    hint: "CNI plugins like Calico or Cilium create virtual overlay networks giving every Pod its own IP.",
    level: "expert",
    codeExample: "k8s_CNI: Pod_A (10.244.1.5) --VXLAN--> Host_NIC --Physical_Wire--> Host_B --VXLAN--> Pod_B (10.244.2.8)"
  },
  {
    question: "What is an Internet Exchange Point (IXP, e.g. NIXI in Kolkata) and why is it vital for local Internet speed?",
    shortAnswer: "A physical data center facility where regional ISPs, content networks (Google, Netflix, Akamai), and CDNs interconnect and exchange routing traffic directly (peering) without paying expensive international transit fees.",
    explanation: "National Internet Exchange of India (NIXI) in Kolkata allows local ISP traffic between Barrackpore and Kolkata to stay within Bengal, cutting latency to under 3 ms.",
    hint: "Local facility where ISPs and CDNs connect directly to exchange traffic fast and cheaply.",
    level: "moderate",
    codeExample: "Peering: ISP_A (Barrackpore) <-> NIXI Kolkata IXP <-> ISP_B (Kolkata) [Latency: 2.4 ms]"
  },
  {
    question: "How does a Captive Portal work in Public Wi-Fi Networks (e.g. Railway Stations / Airports)?",
    shortAnswer: "When an unauthenticated user connects to the Wi-Fi, the gateway router intercepts all HTTP/DNS requests and redirects the browser (HTTP 302) to a splash web page requiring OTP mobile verification or terms acceptance before opening Internet access.",
    explanation: "Once authenticated, the gateway binds the user's MAC address to an approved session table for a limited duration (e.g. 60 minutes).",
    hint: "Intercepts web browsing to force users to log in with an OTP before granting Internet access.",
    level: "basic",
    codeExample: "if (!session.isAuthenticated(clientMAC)) http.redirect('https://portal.railwire.in/login');"
  },
  {
    question: "What is Dynamic DNS (DDNS) and how is it used in residential camera access?",
    shortAnswer: "A service that automatically updates a public domain name (e.g. `myhome.ddns.net`) whenever a residential ISP dynamically changes the home router's public WAN IP address.",
    explanation: "Allows home owners in Ichapur to view security cameras remotely without paying for an expensive static public IP.",
    hint: "Automatically points a domain name to your home router even when your ISP changes your public IP.",
    level: "basic",
    codeExample: "ddnsClient.onIPChange(newIP) => updateDNSRecord('myhome.ddns.net', newIP);"
  },
  {
    question: "What is SD-WAN (Software-Defined Wide Area Network) in real-world retail branch networking?",
    shortAnswer: "An enterprise technology that uses centralized software intelligence to dynamically route branch office traffic across multiple hybrid connections (Broadband, 4G/5G, MPLS) based on real-time packet loss, jitter, and application priority.",
    explanation: "If an MPLS circuit slows down, SD-WAN automatically steers real-time VoIP audio over high-speed fiber broadband within milliseconds.",
    hint: "Intelligently steers office traffic across multiple Internet connections based on live speed and quality.",
    level: "expert",
    codeExample: "sdwan_policy: if (MPLS.latency > 100ms) steerTraffic(VoIP_Class, Broadband_Fiber);"
  },
  {
    question: "How do Real-Life Data Center Leaf-Spine Fabrics prevent bottlenecks compared to traditional trees?",
    shortAnswer: "Every Leaf switch (Top-of-Rack) connects to EVERY Spine switch; all East-West server-to-server traffic is exactly 2 hops away, with Equal-Cost Multi-Path (ECMP) routing load-balancing traffic across all available Spine links simultaneously.",
    explanation: "Eliminates Spanning Tree Protocol port blocking and provides massive, non-blocking bisectional bandwidth.",
    hint: "Every Leaf switch connects to every Spine switch, giving consistent 2-hop speed for all servers.",
    level: "expert",
    codeExample: "LeafSpine: Server1 → Leaf1 → Spine2 → Leaf4 → Server8 (Constant 2-Hop Latency: 1.2 μs)"
  },
  {
    question: "What is Network Time Protocol (NTP) and why is precise clock synchronization critical for cyber security logs?",
    shortAnswer: "NTP synchronizes computer clocks across a network to within milliseconds of Coordinated Universal Time (UTC); precise timestamps are mandatory for correlating forensic security logs across firewalls, servers, and SIEM platforms during an incident investigation.",
    explanation: "Without synchronized clocks, an investigator cannot determine whether a firewall alert occurred before or after a database breach.",
    hint: "Synchronizes system clocks across all devices so log timestamps match perfectly during forensic investigations.",
    level: "moderate",
    codeExample: "ntp server time.google.com iburst // Synchronizes router clock to atomic time standard"
  },
  {
    question: "What is an Out-of-Band (OOB) Management Network in mission-critical data centers?",
    shortAnswer: "A completely separate physical network (dedicated switches, console terminal servers, IPMI/iDRAC ports) used exclusively by network administrators to access, configure, and recover network equipment even if the main production network crashes.",
    explanation: "If a misconfigured firewall drops all production traffic in Barrackpore, OOB console access allows engineers to log in and roll back the configuration.",
    hint: "Dedicated backup network allowing engineers to recover hardware when the main network is down.",
    level: "expert",
    codeExample: "OOB_Network: Dedicated_1G_Switch → Serial_Console_Port / iDRAC (Isolated from Production Data)"
  },
  {
    question: "How does Dynamic ARP Inspection (DAI) prevent Man-in-the-Middle attacks in corporate campus LANs?",
    shortAnswer: "DAI intercepts all ARP requests and responses on untrusted switch access ports and validates the IP-to-MAC binding against the DHCP Snooping database; invalid spoofed ARP replies are immediately dropped.",
    explanation: "Stops malicious laptops in Jadavpur from poisoning the default gateway's MAC address.",
    hint: "Validates ARP packets against DHCP records to block ARP poisoning attacks.",
    level: "moderate",
    codeExample: "ip arp inspection vlan 10,20\ninterface GigabitEthernet0/1\n  ip arp inspection trust"
  },
  {
    question: "What is Link Aggregation (LACP / 802.3ad Port Channel) in enterprise switch wiring?",
    shortAnswer: "A technology that bundles multiple physical Ethernet cables (e.g. 4x 1Gbps ports) into a single logical trunk link (4 Gbps aggregate throughput), providing load balancing and seamless instant failover if one physical cable is disconnected.",
    explanation: "LACP connects distribution switches to core switches with high throughput and built-in cable redundancy.",
    hint: "Combines multiple network cables into one high-speed link with automatic failover.",
    level: "moderate",
    codeExample: "interface range GigabitEthernet0/1-4\n  channel-group 1 mode active // Bundles 4 ports into Port-Channel1"
  },
  {
    question: "What is Virtual Extensible LAN (VXLAN) in modern enterprise cloud data centers?",
    shortAnswer: "An encapsulation protocol that overlays Layer 2 Ethernet frames inside Layer 4 UDP packets (Port 4789), allowing millions of isolated virtual subnets (VNIs) to stretch across Layer 3 physical IP fabrics seamlessly.",
    explanation: "Expands legacy 4094 VLAN limits to over 16 million 24-bit VXLAN Network Identifiers (VNIs).",
    hint: "Encapsulates Layer 2 frames in UDP packets to support 16 million virtual networks across cloud servers.",
    level: "expert",
    codeExample: "VXLAN_Header = { UDP_Port: 4789, VNI: 10540, Encapsulated_Frame: 'Inner Ethernet Frame' };"
  },
  {
    question: "What is Multi-Factor Authentication (MFA) on Enterprise Remote Access VPNs?",
    shortAnswer: "A security requirement where remote employees must provide two or more distinct verification factors (e.g. Password + Mobile Authenticator TOTP Push or Hardware FIDO2 Key) before the VPN gateway grants an encrypted tunnel into the corporate network.",
    explanation: "Prevents attackers from logging into corporate intranets even if they steal an employee's password via phishing.",
    hint: "Requires a password plus a phone authenticator code before connecting to corporate VPN.",
    level: "basic",
    codeExample: "VPN_Auth: UserPassword + Authenticator_TOTP_Code → MFA_Server (Radius) → Access_Granted"
  },
  {
    question: "What is a Network Loop and what visual symptom appears on unmanaged switch indicator LEDs?",
    shortAnswer: "A loop occurs when a cable accidentally connects two ports on the same switch; all port LEDs begin blinking frantically and simultaneously (solid green/amber flicker) as broadcast frames multiply exponentially in a broadcast storm.",
    explanation: "Unmanaged switches lack Spanning Tree Protocol, causing the entire office network to freeze until the looping cable is physically unplugged.",
    hint: "All switch LEDs flash frantically together during a broadcast storm caused by a looped cable.",
    level: "basic",
    codeExample: "Symptom = 'All Switch Port LEDs Blinking Simultaneously at 100% CPU Load (Broadcast Storm)';"
  },
  {
    question: "What is DNS Anycast and how does it safeguard public root servers and 1.1.1.1 / 8.8.8.8 from outages?",
    shortAnswer: "A routing practice where multiple physical servers distributed across hundreds of global cities announce the exact same IP address via BGP; client queries are automatically routed to the closest healthy node, absorbing DDoS attacks locally.",
    explanation: "If a DNS node in Europe fails, global BGP automatically redirects traffic to the next closest healthy node without downtime.",
    hint: "Multiple global servers share the same IP address; BGP sends queries to the nearest one.",
    level: "expert",
    codeExample: "Anycast_IP: '8.8.8.8' announced from 200+ global data centers simultaneously via BGP."
  },
  {
    question: "What is Single Point of Failure (SPOF) analysis in network engineering?",
    shortAnswer: "The process of identifying any single hardware component, power supply, optical cable, or ISP link whose individual failure would cause the entire network or critical business application to shut down.",
    explanation: "Network engineers in Barrackpore eliminate SPOFs by deploying dual core switches, redundant power supplies, and dual ISP uplinks.",
    hint: "Finding single parts whose failure would knock out the whole network, and adding backups.",
    level: "basic",
    codeExample: "SPOF_Audit = { Single_ISP: 'Vulnerable', Dual_ISP_BGP: 'Redundant & Fault Tolerant' };"
  },
  {
    question: "What is a Next-Generation Firewall (NGFW) vs a Traditional Stateful Firewall in real-world enterprise deployments?",
    shortAnswer: "Traditional firewalls filter traffic based only on Layer 3/4 IP addresses and port numbers; NGFWs perform deep packet inspection up to Layer 7, decrypting SSL/TLS, identifying specific applications (e.g. blocking Facebook Games while allowing Facebook Chat), and running integrated IPS/antivirus.",
    explanation: "NGFWs in Kolkata detect and block advanced ransomware communications disguised inside standard HTTPS Port 443 traffic.",
    hint: "NGFW inspects Layer 7 applications and decrypts SSL traffic, going beyond basic IP/port filtering.",
    level: "moderate",
    codeExample: "NGFW_Policy: Allow User → Service 'Office365'; Block Service 'BitTorrent' on ALL Ports;"
  },
  {
    question: "What is the ultimate golden rule for designing, operating, and budgeting Real-Life Computer Networks?",
    shortAnswer: "'Architect hierarchical modularity (Core-Distribution-Access); eliminate Single Points of Failure with first-hop redundancy (VRRP) and BGP multi-homing; enforce Layer-2 security (DHCP Snooping & DAI) with Layer-7 NGFW threat inspection; monitor continuous telemetry with NetFlow/NTP; and budget enterprise hardware in Indian Rupees (₹)!'",
    explanation: "This complete rule captures modular hierarchy, high availability, edge security, operational observability, and financial procurement budgeting.",
    hint: "Hierarchical modularity + Zero SPOF + VRRP/BGP + DHCP Snooping/DAI + NetFlow + Budgets in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: BuildHierarchicalTopology() → EliminateSPOF() → DeployVRRP_and_BGP() → SecureLayer2and7() → BudgetInRupees(₹);"
  }
];

export default questions;
