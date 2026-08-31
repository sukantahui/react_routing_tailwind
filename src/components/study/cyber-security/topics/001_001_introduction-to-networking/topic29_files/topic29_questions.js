// topic29_questions.js
// 30 Moderate to Expert Questions on IP (Internet Protocol) Addresses in Computer Networking and Cyber Security

const questions = [
  {
    question: "What is an IP (Internet Protocol) Address in computer networking?",
    shortAnswer: "An IP Address is a unique 32-bit (IPv4) or 128-bit (IPv6) logical numerical identifier assigned to every device on a network operating at OSI Layer 3 (Network Layer) that enables global routing, host identification, and end-to-end packet delivery.",
    explanation: "Unlike hardware MAC addresses which deliver frames locally on a switch, IP addresses are hierarchical and allow routers to direct packets across multiple intermediate hops and independent networks worldwide.",
    hint: "Logical Layer 3 address used by routers to deliver packets across the Internet.",
    level: "moderate",
    codeExample: "IPv4 = '192.168.1.1'; IPv6 = '2001:0db8:85a3::8a2e:0370:7334';"
  },
  {
    question: "How is a 32-bit IPv4 address structured and represented for human readability?",
    shortAnswer: "It consists of 32 binary bits divided into four 8-bit octets (bytes), represented in dotted-decimal notation where each octet ranges in decimal from 0 to 255 (e.g., 172.16.254.1).",
    explanation: "Four octets of 8 bits each ($4 \\times 8 = 32$ bits) allow a total address space of $2^{32} \\approx 4,294,967,296$ unique IPv4 addresses.",
    hint: "Four octets separated by dots (e.g. 192.168.1.1), each ranging from 0 to 255.",
    level: "basic",
    codeExample: "DottedDecimal: '192.168.1.1' → Binary: '11000000.10101000.00000001.00000001';"
  },
  {
    question: "What were the original Classful IPv4 network classes (A, B, C, D, E) and their default subnet masks?",
    shortAnswer: "Class A (1.0.0.0–126.0.0.0, /8, 255.0.0.0), Class B (128.0.0.0–191.255.0.0, /16, 255.255.0.0), Class C (192.0.0.0–223.255.255.0, /24, 255.255.255.0), Class D (224.0.0.0–239.255.255.255, Multicast), Class E (240.0.0.0–255.255.255.255, Experimental).",
    explanation: "Leading binary bits defined the class: Class A started with binary `0`, Class B with `10`, Class C with `110`, Class D with `1110`, and Class E with `1111`.",
    hint: "Class A (/8), Class B (/16), Class C (/24), Class D (Multicast), Class E (Experimental).",
    level: "moderate",
    codeExample: "Classful = { ClassA: '1-126 (/8)', ClassB: '128-191 (/16)', ClassC: '192-223 (/24)', ClassD: '224-239', ClassE: '240-255' };"
  },
  {
    question: "Why was Classless Inter-Domain Routing (CIDR) introduced to replace Classful addressing?",
    shortAnswer: "Classful addressing caused massive IPv4 address wastage (e.g., allocating an entire Class B with 65,534 IPs to a company needing only 500 IPs); CIDR enables flexible variable-length subnet masks (/19, /25, /28) and route aggregation.",
    explanation: "Introduced in 1993 (RFC 1519), CIDR slowed down IPv4 exhaustion and shrank global routing tables by combining contiguous routes into supernets.",
    hint: "CIDR eliminated fixed /8, /16, /24 classes to stop address waste.",
    level: "expert",
    codeExample: "CIDR_Notation = '192.168.1.0/26'; // Exactly 64 IP addresses allocated instead of a full /24"
  },
  {
    question: "How does an IPv6 address differ in bit length and total capacity from an IPv4 address?",
    shortAnswer: "IPv6 uses 128 bits (represented as 8 groups of 4 hexadecimal digits) providing $2^{128} \\approx 3.4 \\times 10^{38}$ unique addresses, compared to IPv4's 32 bits providing $2^{32} \\approx 4.3 \\times 10^9$ addresses.",
    explanation: "IPv6 provides enough addresses for every grain of sand on Earth, eliminating the need for NAT and restoring end-to-end connectivity.",
    hint: "IPv6 has 128 bits (~3.4 x 10^38 addresses) vs IPv4's 32 bits (~4.3 billion).",
    level: "basic",
    codeExample: "IPv4_Bits = 32; // ~4.3 Billion\nIPv6_Bits = 128; // ~340 Undecillion"
  },
  {
    question: "What are the rules for abbreviating and compressing IPv6 addresses?",
    shortAnswer: "1. Leading zeros in any 16-bit hex group can be omitted (e.g. `0db8` → `db8`), and 2. A single contiguous sequence of all-zero groups can be replaced with a double-colon `::` (allowed only ONCE per address).",
    explanation: "For example, `2001:0db8:0000:0000:0000:0000:1428:57ab` compresses cleanly to `2001:db8::1428:57ab`.",
    hint: "Drop leading zeros in groups, and replace one run of zero groups with ::",
    level: "moderate",
    codeExample: "compressIPv6('2001:0db8:0000:0000:0000:0000:0000:0001') => '2001:db8::1';"
  },
  {
    question: "What are the three RFC 1918 Private IPv4 address blocks reserved for internal organizational use?",
    shortAnswer: "1. 10.0.0.0/8 (10.0.0.0 to 10.255.255.255 - 16.7M IPs), 2. 172.16.0.0/12 (172.16.0.0 to 172.31.255.255 - 1.04M IPs), 3. 192.168.0.0/16 (192.168.0.0 to 192.168.255.255 - 65.5K IPs).",
    explanation: "These addresses are non-routable on the public Internet, allowing infinite local re-use across organizations in Kolkata and Barrackpore behind NAT routers.",
    hint: "10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16.",
    level: "moderate",
    codeExample: "RFC1918_Ranges = ['10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16'];"
  },
  {
    question: "What is an IPv6 Global Unicast Address (GUA) and what prefix does it use?",
    shortAnswer: "A globally routable public IPv6 address (equivalent to a public IPv4 address) allocated from the prefix block 2000::/3 (2000:: to 3fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff).",
    explanation: "GUAs are globally unique and routable across the global IPv6 Internet without requiring Network Address Translation (NAT).",
    hint: "Starts with 2000::/3 for public routable internet addresses.",
    level: "expert",
    codeExample: "GUA_Prefix = '2000::/3'; // Covers 2001:db8::/32 documentation and public pools"
  },
  {
    question: "What is an IPv6 Link-Local Address and what is its reserved prefix?",
    shortAnswer: "An auto-configured, non-routable address mandatory on every IPv6 interface used for communication on the local physical link (e.g., neighbor discovery, router advertisement), using the prefix fe80::/10.",
    explanation: "Routers never forward link-local packets beyond the local physical cable segment; link-local addresses allow devices to communicate without any DHCP server.",
    hint: "Starts with fe80::/10 for communication on the local link only.",
    level: "expert",
    codeExample: "LinkLocal_Prefix = 'fe80::/10'; // e.g. fe80::1a2b:3c4d:5e6f:7081"
  },
  {
    question: "What is Network Address Translation (NAT) and why is Port Address Translation (PAT) the standard form?",
    shortAnswer: "NAT translates private IP addresses into public IP addresses. PAT (NAT Overload) allows thousands of internal private IP devices to share a single public IP address by assigning unique source port numbers to each session.",
    explanation: "PAT modifies the Layer 3 IP header and Layer 4 Port header, tracking connections in a state table so incoming responses return to the correct local PC.",
    hint: "PAT allows an entire office of computers to share one public IP address.",
    level: "moderate",
    codeExample: "PAT_Mapping: '192.168.1.15:52134' → Router rewrites → '103.25.10.4:41002';"
  },
  {
    question: "What is IP Address Spoofing in Cyber Security attacks?",
    shortAnswer: "The creation of Internet Protocol packets with a false/forged source IP address to impersonate a trusted computer, bypass IP-based Access Control Lists (ACLs), or launch reflected DDoS attacks.",
    explanation: "In SYN flood and NTP reflection attacks, attackers spoof the victim's IP as the sender, causing massive reply traffic to bombard the victim.",
    hint: "Faking the sender's IP address to hide identity or flood a victim.",
    level: "expert",
    codeExample: "attacker.craftPacket({ spoofedSourceIP: 'Victim_IP', destIP: 'NTP_Server', command: 'monlist' });"
  },
  {
    question: "What is Stateless Address Autoconfiguration (SLAAC) in IPv6?",
    shortAnswer: "A protocol where an IPv6 host listens for Router Advertisement (RA) messages from the local router (prefix /64), generates its own 64-bit Interface ID (via EUI-64 or random privacy hash), and configures its own global IPv6 address without needing a DHCPv6 server.",
    explanation: "SLAAC simplifies network onboarding: the router provides the network prefix, and the client auto-generates its host portion.",
    hint: "IPv6 feature allowing a device to configure its own IP address from router announcements.",
    level: "expert",
    codeExample: "SLAAC: RouterPrefix(2001:db8:acad:1::/64) + ClientInterfaceID(::a1b2:c3d4) = 2001:db8:acad:1:a1b2:c3d4;"
  },
  {
    question: "What is the cost in Indian Rupees (₹) to lease a Static Public IPv4 address block (/29 - 8 IP addresses) from enterprise ISPs in West Bengal?",
    shortAnswer: "Approximately ₹1,500 to ₹3,500 per month (₹18,000 – ₹42,000 annually) from Tier-1 enterprise telecom providers (Tata Tele, Airtel Business, Reliance Jio Enterprise).",
    explanation: "A /29 subnet yields 5 usable static public IPs (1 network, 1 broadcast, 1 ISP gateway, 5 usable for enterprise firewalls and web servers) in ₹.",
    hint: "Static /29 public IP block costs ₹1,500 – ₹3,500 / month from enterprise ISPs.",
    level: "moderate",
    codeExample: "StaticPublicIP_Block29_Cost = ₹2,500 / Month; // 5 Usable Public IPs for Web/VPN"
  },
  {
    question: "What is the Loopback Address in IPv4 and IPv6?",
    shortAnswer: "IPv4: 127.0.0.1 (any address in 127.0.0.0/8); IPv6: ::1 (0000:0000:0000:0000:0000:0000:0000:0001).",
    explanation: "Loopback directs traffic back into the local computer's network stack without generating electrical signals on the physical wire, used to test local web services and databases.",
    hint: "127.0.0.1 in IPv4 and ::1 in IPv6.",
    level: "basic",
    codeExample: "LoopbackIPv4 = '127.0.0.1'; LoopbackIPv6 = '::1';"
  },
  {
    question: "What is an IPv6 Unique Local Address (ULA) and what is its prefix?",
    shortAnswer: "An IPv6 private address allocated from the prefix block fc00::/7 (commonly fd00::/8 with a 40-bit random global ID) used for internal enterprise routing, non-routable on the public Internet.",
    explanation: "ULA is the IPv6 equivalent of RFC 1918 private IPv4 addresses, ensuring private internal connectivity without public Internet exposure.",
    hint: "Private IPv6 address starting with fd00::/8 for internal enterprise LANs.",
    level: "expert",
    codeExample: "ULA_Prefix = 'fd00::/8'; // e.g. fd12:3456:789a:1::1"
  },
  {
    question: "What is Reverse DNS (rDNS / PTR Record) and how is it used in Cyber Security?",
    shortAnswer: "Reverse DNS resolves an IP address back to its registered domain name (Pointer / PTR record in in-addr.arpa / ip6.arpa); mail servers and firewalls check PTR records to verify sender authenticity and reject spam.",
    explanation: "If an incoming email claims to be from `bank.com` but its IP `103.25.10.4` resolves to an unauthenticated residential broadband hostname, spam filters reject the message.",
    hint: "Resolves an IP address back to its domain name to verify legitimate email servers.",
    level: "expert",
    codeExample: "dig -x 103.25.10.4 +short => 'mail.enterprise.wb.gov.in';"
  },
  {
    question: "What is Anycast IP Addressing in modern Content Delivery Networks (CDNs)?",
    shortAnswer: "A routing practice where multiple server clusters across different global cities are configured with the exact SAME public IP address; Internet BGP routing directs user requests to the topologically closest data center.",
    explanation: "When Mamata in Kolkata accesses Google DNS `8.8.8.8` or Cloudflare `1.1.1.1`, Anycast routes her traffic to the local Kolkata ISP peering exchange in under 5 milliseconds.",
    hint: "Assigns the same IP to servers worldwide; traffic routes to the nearest city.",
    level: "expert",
    codeExample: "AnycastRouting: '1.1.1.1' routes user to nearest POP (Kolkata Data Center @ 4ms latency);"
  },
  {
    question: "What is the function of the Time-To-Live (TTL) field in an IPv4 packet header (Hop Limit in IPv6)?",
    shortAnswer: "An 8-bit integer decremented by 1 at every router hop; when TTL reaches 0, the router drops the packet and sends an ICMP Time Exceeded message, preventing packets from looping infinitely in routing loops.",
    explanation: "Traceroute utilities leverage incrementing TTL values (1, 2, 3...) to discover every intermediate router IP address between source and destination.",
    hint: "Decrements by 1 at every router hop; when it hits 0, the packet is discarded to stop infinite loops.",
    level: "moderate",
    codeExample: "router.forward(packet) => { packet.TTL -= 1; if (packet.TTL === 0) router.dropAndSendICMP(); };"
  },
  {
    question: "What is a Dual-Stack IPv4/IPv6 Network Configuration?",
    shortAnswer: "A network architecture where network interfaces, switches, and routers run both IPv4 and IPv6 protocol stacks simultaneously on the same hardware, allowing seamless communication with both legacy IPv4 and modern IPv6 services.",
    explanation: "Dual-stack is the primary enterprise transition strategy used across West Bengal universities and ISP backbones.",
    hint: "Running IPv4 and IPv6 side-by-side on the same network interface.",
    level: "moderate",
    codeExample: "interface GigabitEthernet0/1:\n  ip address 192.168.10.1 255.255.255.0\n  ipv6 address 2001:db8:acad:10::1/64"
  },
  {
    question: "What is Geo-IP Blocking and how is it used in Next-Generation Firewalls?",
    shortAnswer: "A firewall security rule that checks incoming packet source IP addresses against a global geolocation database (MaxMind / IP2Location) and blocks connections originating from specific high-risk foreign countries.",
    explanation: "Enterprises in Barrackpore block incoming connections from countries where they have no business operations, mitigating automated port scanning and brute-force botnets.",
    hint: "Blocks traffic from specific geographic countries based on IP address databases.",
    level: "moderate",
    codeExample: "firewall.applyRule('Block incoming traffic if sourceIP.Country in [HighRiskCountries]');"
  },
  {
    question: "What is the difference between Static IP Addressing and Dynamic IP Addressing?",
    shortAnswer: "A Static IP is manually configured and never changes (essential for servers, firewalls, and printers); a Dynamic IP is temporarily leased from a DHCP server and can change periodically (ideal for laptops and phones).",
    explanation: "Servers require static IPs so client applications and DNS records have a permanent target address.",
    hint: "Static IP never changes (servers); Dynamic IP is leased by DHCP (laptops/phones).",
    level: "basic",
    codeExample: "StaticIP = { Config: 'Manual', Expiry: 'Permanent' }; DynamicIP = { Config: 'DHCP', Expiry: '24 Hours' };"
  },
  {
    question: "What is an IPsec Tunnel and how does it secure IP traffic across the Internet?",
    shortAnswer: "A suite of cryptographic protocols (ESP, AH, IKEv2) that authenticates and encrypts entire IP packets at Layer 3 using AES-256, creating a secure Virtual Private Network (VPN) tunnel between remote branch offices across the public Internet.",
    explanation: "Debangshu in Barrackpore connects to the Kolkata data center over an IPsec tunnel; packets traversing public ISP cables remain unreadable encrypted ciphertext.",
    hint: "Layer 3 encryption protocol creating secure VPN tunnels across the Internet.",
    level: "expert",
    codeExample: "ipsecTunnel.encryptPacket(OriginalIPPacket, AES_256_GCM) => EncapsulatedESP_Packet;"
  },
  {
    question: "What is the broadcast address in IPv6?",
    shortAnswer: "There is NO broadcast address in IPv6! Broadcast has been completely eliminated and replaced by targeted Multicast (e.g. `ff02::1` for all nodes on link, `ff02::2` for all routers on link).",
    explanation: "Eliminating broadcast prevents CPU interruption storms on mobile devices connected to large Wi-Fi subnets, dramatically improving battery life and network efficiency.",
    hint: "IPv6 has no broadcast address; it uses Multicast instead.",
    level: "expert",
    codeExample: "IPv6_Broadcast = null; // Replaced by All-Nodes Multicast: ff02::1"
  },
  {
    question: "What is an IP Subnet Broadcast Storm and how does a Router stop it?",
    shortAnswer: "A condition where excessive Layer 2 broadcast frames overwhelm switch bandwidth and saturate host CPUs; Routers stop broadcast storms because routers do NOT forward Layer 2/3 broadcast packets between interfaces.",
    explanation: "Routers define the physical boundary of a broadcast domain, containing broadcast traffic strictly within the local subnet.",
    hint: "Routers do not forward broadcast packets, stopping storms from spreading.",
    level: "moderate",
    codeExample: "router.onReceiveBroadcast() => router.dropPacket(); // Does not forward across subnets"
  },
  {
    question: "What is the function of the Subnet Mask 255.255.255.255 (/32) in routing tables?",
    shortAnswer: "A `/32` Host Route represents a single, exact individual device IP address rather than a range of addresses, used for loopback router IDs and VPN endpoint bindings.",
    explanation: "Routers prioritize `/32` routes over all other routes because routing decisions always follow the 'Longest Prefix Match' rule.",
    hint: "/32 matches a single exact host IP address.",
    level: "expert",
    codeExample: "ip route add 10.0.1.50/32 via 192.168.1.1 // Directs traffic specifically for host 10.0.1.50"
  },
  {
    question: "What is the command in Windows and Linux to view and release/renew IP address leases?",
    shortAnswer: "Windows: `ipconfig /all`, `ipconfig /release`, `ipconfig /renew`; Linux: `ip addr show`, `sudo dhclient -r`, `sudo dhclient`.",
    explanation: "These commands interact with local DHCP client services to refresh IP address bindings and gateway routes.",
    hint: "Windows: ipconfig /renew; Linux: dhclient.",
    level: "basic",
    codeExample: "# Windows\nipconfig /renew\n# Linux\nsudo dhclient -v eth0"
  },
  {
    question: "What is an Autonomous System (AS) and BGP IP Route Hijacking in Cyber Security?",
    shortAnswer: "An attack where a rogue Autonomous System (ASN) announces unauthorized BGP route prefixes to the global Internet routing table, redirecting international IP traffic through the attacker's network for interception (mitigated by RPKI cryptographic validation).",
    explanation: "Resource Public Key Infrastructure (RPKI) uses cryptographic Route Origin Authorizations (ROAs) to ensure only legitimate ISPs can announce specific IP blocks.",
    hint: "Rogue network announces fake BGP routes to divert global internet traffic through its servers.",
    level: "expert",
    codeExample: "RPKI.validateBGPRoute(AnnouncedPrefix, OriginASN) => if (!valid) dropBGPAnnouncement();"
  },
  {
    question: "What is the difference between Ingress and Egress Filtering for IP addresses?",
    shortAnswer: "Ingress Filtering drops incoming packets with spoofed source IP addresses arriving from outside the network; Egress Filtering drops outgoing packets whose source IP does not belong to the internal network range.",
    explanation: "Egress filtering prevents infected machines on a campus in Jadavpur from participating in spoofed DDoS attacks against external victims.",
    hint: "Ingress filters incoming spoofed IPs; Egress filters outgoing spoofed IPs.",
    level: "expert",
    codeExample: "firewall.egressFilter: if (packet.sourceIP !== InternalSubnet) dropPacket();"
  },
  {
    question: "What is the 'Longest Prefix Match' algorithm in IP packet routing?",
    shortAnswer: "When multiple routing table entries match a destination IP address, the router selects the route with the longest (most specific) subnet mask prefix (e.g. choosing `/28` over `/24` or `/16`).",
    explanation: "Longest prefix match ensures packets are forwarded along the most specific path available in the routing table.",
    hint: "Router chooses the route with the most specific (longest) subnet prefix.",
    level: "expert",
    codeExample: "Routes = ['10.0.0.0/16', '10.0.1.0/24', '10.0.1.0/28']; Destination = '10.0.1.5' → Selects /28;"
  },
  {
    question: "What is the ultimate golden rule for designing, managing, and securing IP Addresses in an enterprise network?",
    shortAnswer: "'Implement hierarchical subnetting with CIDR and VLSM; isolate internal assets using RFC 1918 private subnets behind PAT firewalls; deploy Dual-Stack IPv4/IPv6 with RPKI validation; enforce anti-spoofing egress/ingress filtering; and budget static public IP leases in Indian Rupees (₹)!'",
    explanation: "This complete rule synthesizes modern IP address engineering, scalability, global routing security, and financial infrastructure planning.",
    hint: "Hierarchical VLSM + RFC 1918 private subnets + PAT firewalls + Dual-Stack IPv6 + Budgets in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: HierarchicalVLSM() → PrivateSubnetsAndPAT() → DualStackIPv6() → BudgetInRupees(₹);"
  }
];

export default questions;
