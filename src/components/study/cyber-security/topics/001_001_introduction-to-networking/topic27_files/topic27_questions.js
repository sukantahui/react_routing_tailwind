// topic27_questions.js
// 30 Moderate to Expert Questions on Network Addresses in Computer Networking and Cyber Security

const questions = [
  {
    question: "What is a Network Address in computer networking?",
    shortAnswer: "A Network Address is a unique numerical or logical identifier assigned to a device or entire subnetwork interface that enables routing, locating, and delivering data packets across local LANs and global WANs.",
    explanation: "Network addresses allow routers and switches to direct traffic hierarchically to specific subnets and individual destination host interfaces.",
    hint: "Logical address identifying a specific network or device interface.",
    level: "moderate",
    codeExample: "NetworkAddress = '192.168.10.0/24'; // Identifies the entire subnet"
  },
  {
    question: "What are the four primary layers of network addressing across the OSI/TCP-IP model?",
    shortAnswer: "1. Layer 2 Physical: MAC Address (48-bit hex), 2. Layer 3 Logical: IP Address (IPv4 32-bit / IPv6 128-bit), 3. Layer 4 Transport: Port Numbers (16-bit), 4. Layer 7 Application: Domain Names / URLs.",
    explanation: "Each layer uses its unique addressing scheme to route data from global domain names down to the physical silicon network interface card.",
    hint: "MAC (L2) → IP (L3) → Port (L4) → Domain Name (L7).",
    level: "moderate",
    codeExample: "AddressStack = { L7_URL: 'https://college.edu', L4_Port: 443, L3_IP: '103.25.10.4', L2_MAC: '00:1A:2B:3C:4D:5E' };"
  },
  {
    question: "In an IPv4 address, what is the role of the Subnet Mask?",
    shortAnswer: "The Subnet Mask is a 32-bit binary number of continuous 1s followed by 0s that separates the IPv4 address into its Network ID portion (1s) and its Host ID portion (0s).",
    explanation: "Routers perform a bitwise logical AND operation between an IP address and its subnet mask to extract the target Network Address for routing decisions.",
    hint: "1s identify the network; 0s identify individual host devices.",
    level: "moderate",
    codeExample: "NetworkID = IPAddress & SubnetMask; // Bitwise AND operation"
  },
  {
    question: "What is the formula to calculate the number of Usable Host IP addresses in a subnet with 'H' host bits?",
    shortAnswer: "Usable Hosts = 2^H - 2 (subtracting 2 for the Network Address where host bits are all 0s, and the Broadcast Address where host bits are all 1s).",
    explanation: "For example, in a `/24` subnet with $H = 8$ host bits: $2^8 - 2 = 256 - 2 = 254$ usable host IP addresses.",
    hint: "2 to the power of host bits minus 2 (subtract network and broadcast).",
    level: "moderate",
    codeExample: "function calculateUsableHosts(hostBits) { return Math.pow(2, hostBits) - 2; }"
  },
  {
    question: "What are the three RFC 1918 Private IPv4 address ranges reserved for internal enterprise LANs?",
    shortAnswer: "1. Class A: 10.0.0.0 to 10.255.255.255 (10.0.0.0/8), 2. Class B: 172.16.0.0 to 172.31.255.255 (172.16.0.0/12), 3. Class C: 192.168.0.0 to 192.168.255.255 (192.168.0.0/16).",
    explanation: "RFC 1918 addresses are non-routable on the public Internet, allowing millions of organizations in Kolkata and Barrackpore to reuse the same private address space safely behind NAT routers.",
    hint: "10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16.",
    level: "moderate",
    codeExample: "PrivateRanges = ['10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16'];"
  },
  {
    question: "What is the Purpose of the Loopback Address (127.0.0.1 / ::1)?",
    shortAnswer: "The Loopback address directs network traffic back into the local machine's own TCP/IP network stack without placing any electrical signals on the physical wire, used for testing local server daemons and inter-process communication.",
    explanation: "Developers in Jadavpur use `127.0.0.1:3000` or `localhost` to test web applications before deploying them to production servers.",
    hint: "Directs traffic back to your own computer for local testing.",
    level: "basic",
    codeExample: "client.fetch('http://127.0.0.1:8080/api/health') => respondsFromLocalhost();"
  },
  {
    question: "What is the Broadcast Address of the subnet 192.168.1.0/24?",
    shortAnswer: "192.168.1.255 (where all 8 host bits are set to binary 1s).",
    explanation: "A packet sent to `192.168.1.255` is forwarded by the local switch to every host on the `192.168.1.0/24` subnet simultaneously.",
    hint: "Last address in the subnet where all host bits are 1s: .255.",
    level: "basic",
    codeExample: "BroadcastIP = '192.168.1.255'; // Host bits = 11111111"
  },
  {
    question: "What is CIDR (Classless Inter-Domain Routing) prefix notation?",
    shortAnswer: "CIDR notation represents the subnet mask by appending a slash followed by the count of consecutive binary 1s in the network prefix (e.g., `/24` represents `255.255.255.0`).",
    explanation: "CIDR replaced rigid legacy Class A, B, and C networks in 1993, allowing flexible variable-length subnet masking (VLSM) and route aggregation.",
    hint: "Slash notation like /24 indicating how many bits are network bits.",
    level: "moderate",
    codeExample: "CIDR_24 = '255.255.255.0'; CIDR_16 = '255.255.0.0'; CIDR_28 = '255.255.255.240';"
  },
  {
    question: "What is the function of the Address Resolution Protocol (ARP)?",
    shortAnswer: "ARP translates a known Layer 3 logical IP address (e.g., 192.168.1.100) into its corresponding Layer 2 physical MAC address (e.g., 00:1A:2B:3C:4D:5E) so an Ethernet frame can be delivered on the local LAN.",
    explanation: "A node broadcasts an 'ARP Request' (Who has 192.168.1.100?), and the target node unicasts an 'ARP Reply' with its hardware MAC address.",
    hint: "Resolves IP address to physical MAC address on the local network.",
    level: "moderate",
    codeExample: "arpTable.resolve('192.168.1.100') => '00:1A:2B:3C:4D:5E';"
  },
  {
    question: "What is an Automatic Private IP Addressing (APIPA / Link-Local) address?",
    shortAnswer: "An address in the range 169.254.0.1 to 169.254.255.254 (169.254.0.0/16) automatically self-assigned by a client operating system when a DHCP server fails to respond.",
    explanation: "If Mamata's laptop displays an IP address starting with `169.254.x.x`, it immediately indicates a DHCP server failure or local network cable disconnection.",
    hint: "169.254.x.x self-assigned when DHCP fails.",
    level: "moderate",
    codeExample: "if (dhcpServer.isUnreachable()) client.assignAPIPA('169.254.45.102');"
  },
  {
    question: "Suppose Debangshu in Barrackpore is allocated the subnet 192.168.50.0/28. What is the Subnet Mask, Total Usable Hosts, and Broadcast Address?",
    shortAnswer: "Subnet Mask: 255.255.255.240; Usable Hosts: 14 (from 192.168.50.1 to 192.168.50.14); Broadcast Address: 192.168.50.15.",
    explanation: "A `/28` prefix leaves $32 - 28 = 4$ host bits. $2^4 - 2 = 14$ usable hosts; block size is 16 ($2^4$), so the range spans .0 to .15.",
    hint: "/28 has 4 host bits: 16 total IPs, 14 usable hosts, .15 broadcast.",
    level: "expert",
    codeExample: "Subnet28 = { Mask: '255.255.255.240', UsableRange: '192.168.50.1 - 192.168.50.14', Broadcast: '192.168.50.15' };"
  },
  {
    question: "What is Public vs Private IP Addressing and why is Network Address Translation (NAT) essential?",
    shortAnswer: "Public IPs are globally unique and routable on the public Internet; Private IPs (RFC 1918) are used internally on enterprise LANs. NAT translates multiple private IPs to one public IP to conserve IPv4 space.",
    explanation: "Because IPv4 addresses are exhausted, organizations in Kolkata lease one public IP for ₹1,500/month and connect hundreds of private workstations via NAT.",
    hint: "Public IPs are global on the internet; Private IPs are local; NAT connects them.",
    level: "moderate",
    codeExample: "NAT.translate(PrivateIP = '192.168.1.50:54123', PublicIP = '103.45.20.1:41002');"
  },
  {
    question: "What is ARP Cache Poisoning (ARP Spoofing) and how does it compromise local network security?",
    shortAnswer: "An attacker sends forged gratuitous ARP replies to trick workstations into mapping the default gateway's IP address to the attacker's MAC address, intercepting and modifying all outbound traffic in a Man-in-the-Middle (MitM) attack.",
    explanation: "Dynamic ARP Inspection (DAI) on managed switches prevents ARP poisoning by validating ARP packets against the DHCP snooping binding database.",
    hint: "Falsifying ARP replies to divert traffic through an attacker's computer.",
    level: "expert",
    codeExample: "attacker.sendFakeARP(victimIP = '192.168.1.10', gatewayIP = '192.168.1.1', attackerMAC);"
  },
  {
    question: "What is an IPv6 address and how does its format differ from IPv4?",
    shortAnswer: "An IPv6 address is a 128-bit hexadecimal address divided into eight 16-bit groups separated by colons (e.g., `2001:0db8:85a3:0000:0000:8a2e:0370:7334`), providing $2^{128}$ (~3.4 x 10^38) unique addresses.",
    explanation: "IPv6 eliminates the need for NAT, provides built-in IPsec support, simplifies packet headers, and eliminates broadcast addresses in favor of multicast.",
    hint: "128-bit hex address divided into 8 groups of 4 digits separated by colons.",
    level: "moderate",
    codeExample: "IPv6Address = '2001:db8:85a3::8a2e:370:7334'; // Zero-compression notation"
  },
  {
    question: "What is the Default Gateway Address configured on a client computer?",
    shortAnswer: "The IP address of the local router interface on the client's subnet that forwards packets destined for remote subnets or the Internet beyond the local broadcast domain.",
    explanation: "If a destination IP does not match the local subnet mask, the client automatically encapsulates the packet in a frame addressed to the Default Gateway's MAC address.",
    hint: "The router's local IP address that lets your computer reach outside networks.",
    level: "basic",
    codeExample: "if (!isLocalSubnet(destIP)) client.forwardToGateway('192.168.1.1');"
  },
  {
    question: "What is IP Address Spoofing in Distributed Denial-of-Service (DDoS) amplification attacks?",
    shortAnswer: "An attacker crafts UDP packets with a forged source IP address set to the victim's IP, causing public reflection servers (e.g., DNS, NTP) to send massive amplified responses to the victim.",
    explanation: "Because UDP is connectionless and does not perform handshakes, attackers spoof source IP headers to flood target servers with gigabits of reflected traffic.",
    hint: "Faking the sender's IP address so replies flood a helpless victim.",
    level: "expert",
    codeExample: "attacker.sendUDP(targetDNS, spoofedSourceIP = VictimIP) => DNS responds to Victim;"
  },
  {
    question: "What is a Multicast Address and what is its standard IPv4 address range?",
    shortAnswer: "A Multicast Address delivers a single data stream simultaneously to a specific subscribed group of receiving devices; its IPv4 range is Class D: 224.0.0.0 to 239.255.255.255 (224.0.0.0/4).",
    explanation: "Multicast is utilized for live video streaming, financial stock ticker feeds, and routing protocol updates (e.g., OSPF uses `224.0.0.5` and `224.0.0.6`).",
    hint: "Class D (224.0.0.0/4) for sending one data stream to a subscribed group.",
    level: "moderate",
    codeExample: "OSPF_Multicast = '224.0.0.5'; // All OSPF routers multicast address"
  },
  {
    question: "What is Variable Length Subnet Masking (VLSM) and why is it used?",
    shortAnswer: "VLSM is the practice of dividing a network into subnets of different sizes with custom prefix lengths (/24, /28, /30) to match the exact host requirements of each department without wasting IP addresses.",
    explanation: "Point-to-point router links receive `/30` subnets (2 usable IPs), while student computer labs receive `/24` subnets (254 usable IPs).",
    hint: "Creating subnets of different sizes to avoid wasting IP addresses.",
    level: "expert",
    codeExample: "VLSM_Plan = { StudentLab: '10.0.1.0/24 (254 hosts)', WAN_Link: '10.0.99.0/30 (2 hosts)' };"
  },
  {
    question: "What is the lease price of a Static Public IPv4 address block (/29 - 8 IPs) in West Bengal from telecom ISPs?",
    shortAnswer: "Approximately ₹1,500 to ₹3,500 per month (or ₹18,000 – ₹42,000 annually) from enterprise ISPs like Tata Tele, Airtel Business, or Jio Enterprise in Indian Rupees (₹).",
    explanation: "Due to global IPv4 depletion, telecom providers charge recurring monthly rental fees for static public IP allocations in ₹.",
    hint: "Static public /29 IP block costs ₹1,500 – ₹3,500 / month from enterprise ISPs.",
    level: "moderate",
    codeExample: "StaticPublicIP_Block29_Cost = ₹2,500 / Month; // 5 Usable Public IPs"
  },
  {
    question: "What is an Anycast Network Address?",
    shortAnswer: "An addressing method where the SAME IP address is assigned to multiple geographically distributed servers; routing protocols (BGP) route client requests to the topologically nearest server.",
    explanation: "Global DNS root servers (e.g., 8.8.8.8) and CDNs (Cloudflare) use Anycast so users in Kolkata are routed to the local Kolkata data center rather than servers overseas.",
    hint: "Same IP address assigned to multiple servers; traffic routes to the closest one.",
    level: "expert",
    codeExample: "BGP.routeAnycast('8.8.8.8') => routesToNearestCityNode('Kolkata_POP');"
  },
  {
    question: "What is a Supernet (Route Aggregation / CIDR Summarization)?",
    shortAnswer: "The combination of multiple smaller contiguous subnets into a single larger routing entry with a shorter prefix (e.g., combining four /24 subnets into one /22 supernet) to reduce router routing table size.",
    explanation: "Supernetting shrinks global BGP routing tables from millions of entries down to thousands of aggregated route prefixes.",
    hint: "Combining multiple small subnets into one larger summary route.",
    level: "expert",
    codeExample: "Aggregate([192.168.0.0/24, 192.168.1.0/24, 192.168.2.0/24, 192.168.3.0/24]) => '192.168.0.0/22';"
  },
  {
    question: "What does the IPv4 address 0.0.0.0/0 represent in routing tables?",
    shortAnswer: "The Default Route (Gateway of Last Resort), which matches any destination IP address that does not have a more specific route entry in the routing table.",
    explanation: "When Mahima browses a website in the US, the local office router matches `0.0.0.0/0` and forwards the packet out to the ISP WAN gateway.",
    hint: "Default Route matching all unknown destination IP addresses.",
    level: "basic",
    codeExample: "ip route add 0.0.0.0/0 via 103.45.20.1 // Default Gateway Route"
  },
  {
    question: "What is Dynamic Host Configuration Protocol (DHCP) DORA process for network address leasing?",
    shortAnswer: "1. Discover (Client broadcasts DHCPDISCOVER), 2. Offer (Server offers DHCPOFFER), 3. Request (Client requests DHCPREQUEST), 4. Acknowledge (Server confirms DHCPACK with IP lease details).",
    explanation: "The 4-step DORA handshake safely negotiates IP configuration, default gateway, subnet mask, and DNS servers in under 50 milliseconds.",
    hint: "Discover → Offer → Request → Acknowledge (DORA).",
    level: "moderate",
    codeExample: "DORA_Handshake: DHCPDISCOVER → DHCPOFFER → DHCPREQUEST → DHCPACK;"
  },
  {
    question: "What is Port Address Translation (PAT / NAT Overload)?",
    shortAnswer: "The most common form of NAT where thousands of internal private IP addresses share a single public IP address by tracking connections through unique source port numbers (e.g., 103.25.10.4:51234).",
    explanation: "PAT allows an entire university campus of 5,000 students in Kolkata to browse the Internet simultaneously using just one public IP address.",
    hint: "Allows thousands of computers to share one public IP by assigning unique port numbers.",
    level: "moderate",
    codeExample: "PAT_Table = { '192.168.1.15:52134': '103.25.10.4:40001', '192.168.1.16:52134': '103.25.10.4:40002' };"
  },
  {
    question: "What is Subnet Scanning and Port Sweeping in Cyber Security Reconnaissance (e.g., Nmap)?",
    shortAnswer: "The process where an attacker or security auditor sends ICMP ping sweeps or TCP SYN packets across an entire IP address range (e.g., `nmap -sn 192.168.1.0/24`) to discover all live active hosts and open service ports.",
    explanation: "Intrusion Detection Systems (IDS) detect rapid sequential subnet scanning and automatically block scanning IP addresses at the firewall.",
    hint: "Scanning an entire IP subnet with tools like Nmap to find active machines and open ports.",
    level: "expert",
    codeExample: "nmap -sS -p 80,443,22 192.168.1.0/24 // Scans entire subnet for web and SSH ports"
  },
  {
    question: "Why can the first IP (Network ID) and last IP (Broadcast) of a subnet never be assigned to a host device?",
    shortAnswer: "The Network ID identifies the entire subnetwork as a routing target, while the Broadcast Address is reserved to signal all hosts simultaneously; assigning either to a host breaks routing and causes broadcast storms.",
    explanation: "Operating systems reject configuring .0 or .255 on a `/24` interface with an 'Invalid IP configuration' error.",
    hint: "First address names the network; last address broadcasts to everyone.",
    level: "moderate",
    codeExample: "if (ip === networkID || ip === broadcastIP) throw Error('Cannot assign to host');"
  },
  {
    question: "What is IPv6 Dual-Stack Architecture?",
    shortAnswer: "A transition mechanism where network devices and routers run both IPv4 and IPv6 protocol stacks simultaneously on the same physical interfaces, enabling communication with both legacy IPv4 and modern IPv6 services.",
    explanation: "Dual-stack ensures smooth gradual migration to IPv6 across enterprise networks in Kolkata without breaking compatibility with legacy IPv4 systems.",
    hint: "Running IPv4 and IPv6 side-by-side on the same computer and network.",
    level: "expert",
    codeExample: "interface eth0: IPv4 = '192.168.1.50/24', IPv6 = '2001:db8:acad:1::50/64';"
  },
  {
    question: "What is a Bastion Host / Jump Server in network address architecture?",
    shortAnswer: "A hardened server situated on a perimeter DMZ subnet with a public IP that serves as the single secure administrative entry point for SSH/RDP access into private internal database subnets.",
    explanation: "Administrators must first authenticate to the Bastion host via MFA before they can jump into backend servers located on non-routable private subnets.",
    hint: "Single secure gateway server used to log into private backend database servers.",
    level: "expert",
    codeExample: "ssh -J debangshu@bastion.barrackpore.ind:22 admin@10.0.2.15"
  },
  {
    question: "What is an Autonomous System Number (ASN) in global Internet routing?",
    shortAnswer: "A globally unique 16-bit or 32-bit number assigned by IANA/APNIC to a large network or ISP (e.g., BSNL, Airtel, ERNET) that controls an independent IP routing policy using Border Gateway Protocol (BGP).",
    explanation: "ASNs allow global routers to exchange routing tables across independent telecommunications backbones worldwide.",
    hint: "Globally unique number identifying an ISP's network on the global BGP routing table.",
    level: "expert",
    codeExample: "BGP_Route = { ASN: 45609, NetworkPrefix: '103.25.10.0/24', ISP: 'ERNET India' };"
  },
  {
    question: "What is the ultimate golden rule for designing and managing enterprise Network Addresses?",
    shortAnswer: "'Segment departmental traffic with VLSM and private subnets (RFC 1918); secure perimeter gateways with NAT and stateful firewalls; guard against ARP poisoning with DAI; reserve public IP blocks with cost budgeting in Indian Rupees (₹); and enforce strict address documentation!'",
    explanation: "This complete rule captures all foundational principles of IP address architecture, subnetwork segmentation, cybersecurity defense, and financial budgeting.",
    hint: "Private subnets + VLSM + NAT firewalls + DAI protection + Budgets in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: SegmentWithVLSM() → DeployNATAndFirewall() → GuardWithDAI() → BudgetInRupees(₹);"
  }
];

export default questions;
