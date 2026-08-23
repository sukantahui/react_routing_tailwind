const questions = [
  {
    question: "What is a DDoS Reflection and Amplification Attack, and what are the two fundamental technical prerequisites that enable it?",
    shortAnswer: "An attack where an adversary sends small requests with a spoofed victim Source IP to misconfigured third-party servers, which return massive response packets to the victim; enabled by: 1. A stateless connectionless protocol (UDP) allowing IP spoofing, and 2. A command where the response size is significantly larger than the request.",
    explanation: "In a reflection amplification attack, the attacker does not send packets directly to the victim. Instead, the attacker sends a 50-byte request to thousands of open DNS or NTP servers with `Source IP: Victim IP`. The servers process the request and reply with 4,000-byte responses directed at the victim. The attacker multiplies their attack bandwidth by 50x to 500x, while hiding their own identity behind legitimate reflection servers.",
    hint: "Whispering a one-word question into 1,000 megaphones pointed at someone's house so the megaphones blast 1,000 paragraphs of sound at them.",
    level: "basic",
    codeExample: `// Amplification Ratio Formula:
// Amplification Factor (AF) = Size of Server Response (Bytes) / Size of Attacker Request (Bytes)
// Example (DNS ANY): 4,000 Bytes / 60 Bytes = 66.6x Bandwidth Multiplier!`
  },
  {
    question: "How does a 'DNS Amplification Attack' work, and how does the EDNS0 extension maximize response size?",
    shortAnswer: "The attacker sends a DNS query for `ANY` records with the `EDNS0` (Extension Mechanisms for DNS) buffer size set to 4096 bytes using a spoofed victim IP; the open resolver returns a 3,000-4,000 byte DNS response, achieving a 50x-70x amplification factor.",
    explanation: "Standard DNS responses over UDP were historically capped at 512 bytes. RFC 6891 introduced EDNS0, allowing UDP buffers up to 4096 bytes. Attackers query domains with heavy DNSSEC keys (`RRSIG`, `DNSKEY`) using `dig ANY isc.org`. A 45-byte query produces a 3,500-byte response (77x amplification), completely saturating the victim's downlink.",
    hint: "Asking a library for 'EVERY SINGLE RECORD ABOUT THIS TOPIC' in one envelope with someone else's return address.",
    level: "basic",
    codeExample: `// Scapy DNS Amplification Query:
from scapy.all import *
target_ip = "103.25.10.50" # Victim IP
dns_resolver = "8.8.8.8"
# 45-byte query produces 3,500-byte DNSSEC ANY response:
packet = IP(src=target_ip, dst=dns_resolver)/UDP(sport=random.randint(1024,65535), dport=53)/DNS(rd=1, qd=DNSQR(qname="isc.org", qtype="ANY"))
send(packet, loop=1, verbose=False)`
  },
  {
    question: "What was the NTP 'monlist' Command (Mode 7), and why did it provide an unprecedented 556x Amplification Factor?",
    shortAnswer: "The NTP `monlist` diagnostic command returned a list of the last 600 IP addresses that interacted with the NTP server, splitting the response across up to 100 consecutive UDP packets totaling ~48,000 bytes for a single 234-byte request.",
    explanation: "Network Time Protocol (NTP) included an administrative diagnostic command called `monlist`. When queried with a 234-byte request, the NTP server returned data on the last 600 clients it synced with, packed into up to 100 UDP packets totaling 48,000 bytes (556x amplification). A single 10 Mbps broadband connection could generate over 5.5 Gbps of attack traffic directed at the victim in Kolkata.",
    hint: "Asking a hotel receptionist 'Give me the names and addresses of the last 600 guests who stayed here' on a single postcard.",
    level: "moderate",
    codeExample: `// NTP monlist Amplification Factor:
// Attacker Request : 234 Bytes (NTP Mode 7 monlist query)
// Server Response  : 100 UDP Packets * 480 Bytes = 48,000 Bytes
// Amplification    : 48,000 / 234 = 556x Multiplier!
// Fix              : Upgrade to ntpd >= 4.2.7p26 (disables monlist by default)`
  },
  {
    question: "What was the 'Memcached UDP Amplification Attack' (2018), and how did it achieve an Astronomical 51,000x Amplification Factor?",
    shortAnswer: "Memcached servers left exposed on the public internet on UDP port 11211 allowed unauthenticated clients to store large values and retrieve them with a tiny `get <key>` request, returning megabytes of data for a 15-byte query (51,000x multiplier), generating historic 1.35 Tbps floods.",
    explanation: "Memcached was designed as an internal caching system without authentication. System administrators inadvertently exposed port 11211 to the public internet with UDP enabled. Attackers loaded a 1MB payload into a key and sent a 15-byte `get a` UDP request with a spoofed victim IP. The server returned the full 1MB payload (51,200x amplification), unleashing the historic 1.35 Tbps DDoS flood against GitHub in February 2018.",
    hint: "Dropping a ₹1 coin into a vending machine that accidentally dispenses ₹50,000 worth of soda cans into someone's driveway.",
    level: "expert",
    codeExample: `// Memcached Amplification Math:
// Attacker Query   : "get a\\r\\n" (15 Bytes over UDP Port 11211)
// Server Response  : 750,000 Bytes (750 KB of cached data across hundreds of fragments)
// Amplification AF : 750,000 / 15 = 50,000x Multiplier!
// Historic Impact  : 1.35 Tbps Attack against GitHub (Feb 2018)`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 66F, what constitutes the criminal penalty for using Amplification DDoS attacks against Critical Public Infrastructure?",
    shortAnswer: "Launching multi-hundred gigabit amplification floods that paralyze critical national infrastructure (power grid SCADA, atomic energy, banking switches) to threaten national security is CYBER TERRORISM, punishable with IMPRISONMENT FOR LIFE.",
    explanation: "Section 66F of the IT Act defines Cyber Terrorism. If an adversary uses an 800 Gbps DNS or NTP amplification flood to take down the 220kV power transmission control center in Barrackpore or financial settlement switches in Salt Lake, the offense carries mandatory Life Imprisonment.",
    hint: "Section 66F prescribes Life Imprisonment for Amplification Cyber Terrorism.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66F - Cyber Terrorism):
// Offense: Paralyzing state electrical grid telemetry routers with 800 Gbps DNS amplification floods
// Penalty: IMPRISONMENT FOR LIFE`
  },
  {
    question: "What is 'Connectionless LDAP' (CLDAP - UDP Port 389) Amplification, and why did it become a Preferred Vector for Threat Actors?",
    shortAnswer: "Querying Microsoft Active Directory domain controllers exposing CLDAP on UDP port 389 with an unauthenticated `searchRequest`; the domain controller returns up to 4,000 bytes of Active Directory metadata for a 60-byte query (56x-70x amplification).",
    explanation: "Microsoft Active Directory uses CLDAP over UDP for quick domain controller location. When exposed to the public internet, unauthenticated attackers send root DSE search queries. The domain controller returns full domain configuration and naming context metadata, generating 3,000-4,000 byte responses. Because Active Directory servers have high-bandwidth gigabit enterprise connections, they make powerful reflection amplifiers.",
    hint: "Asking a company's public directory for their entire corporate organizational chart using someone else's mailing address.",
    level: "expert",
    codeExample: `// CLDAP Amplification Vector:
// Target Protocol : CLDAP (Connectionless Lightweight Directory Access Protocol)
// Target Port     : UDP Port 389
// Amplification AF: 56x to 70x Multiplier
// Response Data   : Active Directory Forest, Domain Controller FQDN, GUID & NetBIOS metadata`
  },
  {
    question: "What is 'Simple Service Discovery Protocol' (SSDP - UDP Port 1900) Amplification?",
    shortAnswer: "Flooding home routers and smart TVs running Universal Plug and Play (UPnP) with `M-SEARCH *` discovery requests; vulnerable devices reply with XML device description payloads (30x amplification factor).",
    explanation: "SSDP is part of UPnP, designed for local network device discovery. Millions of home routers inadvertently expose UDP port 1900 to the public WAN. Attackers send `M-SEARCH * HTTP/1.1\\r\\nST: upnp:rootdevice\\r\\n` with a spoofed victim IP. The home router replies with extensive XML device specifications and service endpoint URLs, producing ~30x amplification.",
    hint: "Shouting 'WHO HAS A PRINTER?' into a megaphone so 100,000 home printers mail their full instruction manuals to one address.",
    level: "moderate",
    codeExample: `// SSDP M-SEARCH Discovery Request:
M-SEARCH * HTTP/1.1\\r\\n
HOST: 239.255.255.250:1900\\r\\n
MAN: "ssdp:discover"\\r\\n
MX: 2\\r\\n
ST: ssdp:all\\r\\n
\\r\\n
# Amplification AF: ~30x Multiplier from millions of consumer IoT routers!`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the enterprise obligations for maintaining service availability during Amplification DDoS attacks?",
    shortAnswer: "Organizations must implement reasonable technical availability safeguards; persistent failure to deploy upstream scrubbing against reflection floods leading to citizen data access outages triggers statutory fines up to ₹250 Crores.",
    explanation: "Section 8(5) mandates that data fiduciaries must implement reasonable technical and organizational safeguards. If a hospital network or banking portal in West Bengal fails to maintain BGP Flowspec or Anycast scrubbing, resulting in persistent service paralysis for citizens, the DPBI can impose penalties up to ₹250 Crores under Section 33.",
    hint: "Maintaining continuous service availability is a mandatory technical safeguard under the DPDP Act.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for negligent amplification resilience controls`
  },
  {
    question: "How does 'Response Rate Limiting' (RRL) in BIND / PowerDNS defeat DNS Amplification Attacks at the Server Level?",
    shortAnswer: "RRL tracks identical DNS responses sent to the same client subnet; when responses exceed a threshold (e.g. 5 identical responses/sec), the DNS resolver truncates (TC bit) or slips (drops) subsequent responses.",
    explanation: "Response Rate Limiting (RRL) is implemented inside authoritative DNS servers. If an attacker uses the DNS server as a reflector against `103.25.10.50`, the DNS server notices it is sending 500 identical `ANY` responses per second to that IP. RRL caps the response rate to 5 per second, sending truncated (TC=1) packets for the rest. This forces legitimate clients to retry over TCP while completely neutralizing UDP reflection floods.",
    hint: "A telephone operator refusing to answer the same question more than 5 times per minute for the same caller.",
    level: "expert",
    codeExample: `// BIND 9 named.conf Response Rate Limiting (RRL) Configuration:
options {
    rate-limit {
        responses-per-second 5;    # Max 5 responses/sec to same client IP
        window 5;
        slip 2;                    # Return truncated packet for every 2nd dropped query
    };
};`
  },
  {
    question: "What is 'SNMP Amplification' (Simple Network Management Protocol - UDP Port 161)?",
    shortAnswer: "Sending SNMP `GetBulkRequest` or `GetNextRequest` with the default community string `public` to internet-exposed network devices, returning massive SNMP routing tables and interface statistics (up to 650x amplification).",
    explanation: "SNMP is used for router monitoring. Many legacy routers expose UDP port 161 with default read-only credentials (`public`). An attacker sends a 60-byte `GetBulkRequest` with `non-repeaters=0, max-repetitions=100`. The router walks its entire MIB tree and returns routing tables, ARP caches, and interface statistics across dozens of large UDP packets totaling ~40,000 bytes (650x amplification).",
    hint: "Asking a building security guard for a full copy of the building blueprints and master key list using the default guest password.",
    level: "expert",
    codeExample: `// SNMP GetBulkRequest Amplification:
// Ingress Query : 60-byte SNMPv2c GetBulkRequest (Community: "public")
// Response Data : Entire Router MIB-II Tree (Routing table, ARP cache, interface stats)
// Amplification : Up to 650x Multiplier!`
  },
  {
    question: "Under CERT-In Mandatory Directions 2022, what is the mandatory incident reporting timeline for DDoS Amplification attacks affecting Indian organizations?",
    shortAnswer: "All organizations in India must report DDoS amplification attacks affecting network operations, data centers, or internet backbones to CERT-In within 6 HOURS of detection.",
    explanation: "Under Section 70B of the IT Act and CERT-In Direction No. 20(3)/2022-CERT-In, service providers, intermediaries, data centers, and corporate bodies must mandatorily report specified cyber security incidents (including DDoS reflection amplification attacks) to CERT-In within 6 hours of noticing them.",
    hint: "CERT-In requires mandatory incident reporting within a strict 6-hour window.",
    level: "basic",
    codeExample: `// Statutory SLA (CERT-In Mandatory Incident Reporting):
// Directive: Mandatory reporting of reflection DDoS outages within 6 HOURS
// Mandate: Section 70B Information Technology Act 2000`
  },
  {
    question: "What is 'Open DNS Resolver Sinkholing and Remediation' (The Open Resolver Project)?",
    shortAnswer: "Scanning the internet to identify recursive DNS resolvers that accept queries from any public IP, notifying ISPs to reconfigure them to accept recursive queries only from internal subnets.",
    explanation: "Authoritative name servers should only answer for their own domains. Recursive resolvers should only answer queries from their own authorized local clients (`allow-recursion { 192.168.1.0/24; };`). When a recursive resolver answers queries from the entire world, it is an 'Open Resolver' that can be abused for DNS amplification. Closing open recursion eliminates the amplifier from the global threat pool.",
    hint: "Locking the library doors to outside strangers so only enrolled students can borrow books.",
    level: "moderate",
    codeExample: `// BIND 9 Secure Recursive Configuration (Disables Open Resolver):
options {
    recursion yes;
    allow-recursion { 127.0.0.1; 103.25.10.0/24; }; # ONLY local subnets allowed!
    allow-query { any; }; # Authoritative queries permitted
};`
  },
  {
    question: "Under the Indian IT Act Section 43(f), what constitutes civil liability for launching DDoS reflection amplification attacks?",
    shortAnswer: "Denying or causing the denial of access to any person authorized to access any computer system or network carries compensation by way of damages up to ₹1 Crore.",
    explanation: "Section 43(f) explicitly penalizes reflection denial of service: 'If any person without permission of the owner... denies or causes the denial of access... he shall be liable to pay damages by way of compensation not exceeding one crore rupees.'",
    hint: "Section 43(f) provides civil compensation up to ₹1 Crore for denying authorized access.",
    level: "basic",
    codeExample: `// Statutory Liability (IT Act Section 43(f)):
// Violation: Launching an 800 Gbps DNS amplification flood that takes down a Kolkata hospital's appointment portal
// Compensation: Up to ₹1,00,00,00,000 (Rupees One Crore) per affected entity`
  },
  {
    question: "What is 'BGP Flowspec' (RFC 5575) Filtering for Multi-Protocol Amplification Floods?",
    shortAnswer: "Injecting granular ACL rules into upstream Tier-1 ISP core routers to drop UDP packets originating from ports 53, 123, 11211, and 389 with payload lengths > 1200 bytes targeting the victim IP.",
    explanation: "When an enterprise in Kolkata receives an 800 Gbps multi-protocol reflection flood, local 10 Gbps firewalls are useless because the fiber pipe is 100% congested at the ISP level. The enterprise injects BGP Flowspec rules into Airtel or Tata core routers: `Match: Dest IP 103.25.10.50, Protocol UDP, Src Ports [53, 123, 389, 11211], Length > 1200 ➔ Action: Rate-Limit 0`. Malicious reflection traffic is scrubbed at the ISP core, leaving clean traffic unaffected.",
    hint: "Filtering muddy water at the municipal treatment plant before it enters your street's pipes.",
    level: "expert",
    codeExample: `// BGP Flowspec Multi-Protocol Amplification Scrubbing Policy:
flow-route {
    match {
        destination 103.25.10.50/32;
        protocol udp;
        source-port [ 53 123 389 11211 1900 ]; # DNS, NTP, CLDAP, Memcached, SSDP
        packet-length 1200-1500;                # Oversized Amplified Responses
    }
    then {
        rate-limit 0; # Discard 100% of attack traffic at Tier-1 ISP Core!
    }
}`
  },
  {
    question: "What is 'WS-Discovery' (Web Services Dynamic Discovery - UDP Port 3702) Amplification?",
    shortAnswer: "Querying internet-connected ONVIF security cameras and IoT devices exposing WS-Discovery on UDP port 3702 with SOAP XML probe messages, returning 3,000-byte XML schemas (75x-100x amplification).",
    explanation: "WS-Discovery is used by IP security cameras to discover network video recorders. Millions of cameras expose UDP port 3702 to the public internet. Attackers send a small SOAP `Probe` request. The camera returns its entire ONVIF device profile, video encoding parameters, and SOAP XML schemas, producing massive 75x to 100x amplification floods.",
    hint: "Asking a security camera 'What is your serial number?' and receiving a 50-page XML manual in return.",
    level: "expert",
    codeExample: `// WS-Discovery SOAP XML Probe Request:
<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope">
 <s:Header><wsa:Action>http://schemas.xmlsoap.org/ws/2005/04/discovery/Probe</wsa:Action></s:Header>
 <s:Body><d:Probe/></s:Body>
</s:Envelope>
# Amplification AF: 75x to 100x Multiplier from internet-connected ONVIF cameras!`
  },
  {
    question: "Under the Indian IT Act Section 66, what constitutes the criminal penalty for operating reflection amplification flood infrastructure?",
    shortAnswer: "Dishonestly or fraudulently disrupting or diminishing the utility of computer systems carries imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Section 66 criminalizes fraudulent computer disruption: 'If any person, dishonestly or fraudulently, does any act referred to in section 43... he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees, or with both.'",
    hint: "Section 66 provides up to 3 years imprisonment and ₹5 Lakh fine for fraudulent computer disruption.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66):
// Offense: Flooding online university examination portals with 600 Gbps DNS amplification traffic
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,000`
  },
  {
    question: "What is 'IP Spoofing Ingress Verification' (RFC 2827 / BCP 38), and why does its Global Absence allow Amplification Floods to Exist?",
    shortAnswer: "BCP 38 mandates that ISPs must drop outbound packets whose Source IP does not belong to their allocated customer subnet; if all ISPs enforced BCP 38, IP spoofing would be impossible, permanently eliminating all reflection DDoS attacks globally.",
    explanation: "In every amplification attack, the attacker must forge the victim's IP in the source field. If an ISP in Kolkata implements BCP 38 (Unicast RPF), when a home broadband customer sends a packet with `Source IP: 103.25.10.50` (victim), the router sees the IP is not in the customer's subnet and drops it immediately. Reflection attacks only succeed because ~20% of global ISPs still fail to enforce BCP 38.",
    hint: "A post office checking your ID to ensure the return address on your package is your real home before mailing it.",
    level: "expert",
    codeExample: `// BCP 38 Ingress Filtering Router Configuration (Cisco IOS):
interface GigabitEthernet0/1
 ip verify unicast source reachable-via rx
// Result: Drops spoofed IP packets where source IP is not routable via that interface!`
  },
  {
    question: "Synthesize an enterprise-scale DDoS Amplification Defense Architecture.",
    shortAnswer: "A multi-layered system combining Cloud Anycast Scrubbing Centers (absorbing 10+ Tbps reflection floods), BGP Flowspec (RFC 5575) ISP core filtering, DNS Response Rate Limiting (RRL), Disabling Open DNS/NTP Recursion, and Local Ingress Firewalls.",
    explanation: "To achieve complete immunity against multi-terabit reflection amplification attacks: 1. Cloud Tier: Global Anycast Scrubbing centers (Cloudflare, Akamai) absorbing 10+ Tbps volumetric reflection traffic across 300 global PoPs. 2. Upstream Tier: BGP Flowspec rules pushed to Tier-1 ISPs dropping oversized UDP reflection signatures (ports 53, 123, 389, 11211). 3. Resolver Hardening: Authoritative DNS servers configured with Response Rate Limiting (RRL) and internal-only recursion. 4. Host OS Tier: Disabling legacy NTP `monlist` and binding Memcached to `localhost` (`127.0.0.1`) with UDP disabled (`-U 0`).",
    hint: "Combine cloud Anycast scrubbing, BGP Flowspec upstream rules, DNS RRL, and disabling open UDP services.",
    level: "expert",
    codeExample: `// Master Amplification DDoS Defense Blueprint:
// 1. Cloud Tier     : BGP Anycast Global Scrubbing Network (10+ Tbps Capacity)
// 2. Upstream Tier  : BGP Flowspec (RFC 5575) dropping UDP reflection ports at ISP Core
// 3. DNS Layer      : BIND 9 Response Rate Limiting (responses-per-second 5; slip 2;)
// 4. NTP Layer      : ntpd configuration with 'disable monitor' and 'restrict default nomodify notrap nopeer noquery'
// 5. Memcached Layer: memcached -l 127.0.0.1 -U 0 (UDP disabled!)`
  },
  {
    question: "What is 'CHARGEN' (Character Generator Protocol - UDP Port 19) Amplification?",
    shortAnswer: "A legacy diagnostic protocol designed in 1983 (RFC 864) that responds to any UDP datagram by sending an endless stream of 72-character repeating ASCII strings (358x amplification factor).",
    explanation: "CHARGEN was designed for network testing. When it receives a 1-byte UDP packet on port 19, it returns an infinite stream of ASCII characters: ` !\"#$%&'()*+,-./0123456789:;<=>?@ABC...`. An attacker sending a 20-byte packet triggers thousands of bytes of character data (358x amplification). Modern systems disable CHARGEN completely.",
    hint: "Pressing a button on a broken typewriter that causes it to type 10,000 pages of alphabet letters without stopping.",
    level: "basic",
    codeExample: `// CHARGEN Amplification Flow:
// Ingress Query : 20-byte UDP packet to Port 19
// Server Reply  : Endless stream of 72-byte ASCII lines (358x Amplification!)
// Fix           : Disable chargen in /etc/inetd.conf or disable port 19 in firewalls.`
  },
  {
    question: "Under the Indian Penal Code Section 427, what constitutes 'Mischief' via DDoS Amplification Floods?",
    shortAnswer: "Intentionally causing damage or service disruption to computer systems that diminishes their value or utility, punishable with imprisonment up to 2 years and fines.",
    explanation: "Section 425/427 IPC defines Mischief. When an attacker floods a corporate network in West Bengal with 600 Gbps of DNS amplification traffic that saturates fiber uplinks and takes online examination servers offline, the act diminishes electronic property utility, punishable with up to 2 years imprisonment under Section 427.",
    hint: "IPC Section 427 covers Mischief and Property Damage with up to 2 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Penalty (Indian Penal Code Section 427):
// Offense: Intentionally saturating hospital internet links with DNS reflection floods
// Penalty: Imprisonment for a term up to 2 Years, or with Fine, or with both`
  },
  {
    question: "What is 'Qname Minimization' (RFC 7816) in Modern DNS Privacy & Amplification Reduction?",
    shortAnswer: "A DNS resolution technique where recursive resolvers query authoritative servers with only the minimal domain label required for that delegation step (e.g. asking `.in` servers for `fintech.in` rather than the full FQDN `mamata.subdomain.fintech.in`), reducing response sizes.",
    explanation: "Qname minimization prevents information leakage and reduces DNS response payload sizes. By asking authoritative name servers only for the parent domain labels rather than the full query string, the size of referral and NXDOMAIN responses is minimized, reducing the potential amplification factor available to attackers.",
    hint: "Only asking the mail carrier for the city name first rather than handing them the full 10-line address on the envelope.",
    level: "expert",
    codeExample: `// Unbound DNS Qname Minimization Configuration:
server:
    qname-minimisation: yes # RFC 7816 Enabled!
    # Reduces DNS response packet sizes and improves privacy!`
  },
  {
    question: "What is the Difference between 'Authoritative DNS Servers' and 'Open Recursive DNS Resolvers' in Amplification Attacks?",
    shortAnswer: "Authoritative servers only hold records for specific registered domains; Open Recursive Resolvers accept queries from anyone on the internet and resolve any arbitrary external domain, making them high-leverage amplification weapons.",
    explanation: "An authoritative server for `kolkata-fintech.in` only responds with records for that specific domain. An open recursive resolver (e.g. misconfigured ISP cache) will accept a query for `ANY isc.org` or `ANY cloudflare.com` from anyone, resolve the multi-kilobyte DNSSEC response, and reflect it back to the victim. Attackers scan the internet to harvest lists of 5,000,000 open recursive resolvers.",
    hint: "A company receptionist who only knows people inside the company vs a public phone operator who will look up any phone number in the world for anyone.",
    level: "moderate",
    codeExample: `// Open Resolver Scan Detection:
// Query from attacker: dig ANY isc.org @182.70.10.45
// If 182.70.10.45 returns full 3.5KB response for an external domain ➔ OPEN RESOLVER!`
  },
  {
    question: "Under the Indian IT Act Section 70, what constitutes the penalty for Amplification DDoS Floods targeting 'Protected Systems' (Critical National Infrastructure)?",
    shortAnswer: "Securing unauthorized access or attempting to deny access to designated Protected Systems carries imprisonment up to 10 YEARS and severe fines.",
    explanation: "Section 70 of the IT Act governs Critical Information Infrastructure (e.g. power grids in Barrackpore, financial settlement switches in Salt Lake). Launching an amplification flood that denies access to a designated protected system carries up to 10 years imprisonment under Section 70.",
    hint: "Section 70 carries up to 10 years imprisonment for DoS attacks on Protected Systems.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 70):
// Offense: Flooding SCADA power transmission border routers with 800 Gbps NTP reflection floods
// Penalty: Imprisonment for a term up to 10 YEARS, and shall also be liable to Fine`
  },
  {
    question: "What is 'NTP Monlist Disabling' in ntpd Configuration (`disable monitor`)?",
    shortAnswer: "Adding `disable monitor` and `restrict default nomodify notrap nopeer noquery` to `/etc/ntp.conf` to completely disable the vulnerable Mode 7 monlist diagnostic query command.",
    explanation: "To prevent an NTP server from being used as a reflection amplifier, administrators add two directives: `disable monitor` tells ntpd to stop tracking client IP addresses. `restrict default nomodify notrap nopeer noquery` blocks unauthenticated remote query requests, completely neutralizing the 556x monlist amplification vector.",
    hint: "Turning off the hotel's public guest register display so outsiders cannot view visitor logs.",
    level: "moderate",
    codeExample: `# Secure /etc/ntp.conf Hardening:
disable monitor
restrict default nomodify notrap nopeer noquery
restrict 127.0.0.1
# Restart: systemctl restart ntp`
  },
  {
    question: "How do 'Anycast Scrubbing Centers' Ingest and Neutralize Multi-Terabit Amplification Floods?",
    shortAnswer: "By announcing the protected IP via BGP Anycast from 300+ global PoPs; reflection traffic from thousands of global amplifiers is routed to the nearest regional scrubbing center and dropped in hardware FPGA filters.",
    explanation: "In an 800 Gbps DNS amplification attack, reflection traffic originates from 50,000 resolvers in 100 countries. With Anycast, European resolver traffic hits Frankfurt/London, Asian resolver traffic hits Singapore/Tokyo, and US traffic hits Ashburn. The 800 Gbps flood is diluted into small 2.5 Gbps chunks across 300 PoPs, where hardware FPGA filters drop non-whitelisted UDP responses instantly.",
    hint: "Diverting a giant flood into 300 separate irrigation channels around the world instead of letting the entire river crash into one city.",
    level: "expert",
    codeExample: `// Anycast Global Amplification Dilution:
// Total Reflected Attack Volume = 800 Gbps
// Number of Anycast PoPs        = 300 Data Centers
// Average Ingress per PoP       = 800 / 300 = 2.66 Gbps (Easily filtered in hardware!)`
  },
  {
    question: "Under the Indian Penal Code Section 420, what constitutes Cheating and Dishonestly Inducing Delivery of Property via Amplification DDoS Extortion?",
    shortAnswer: "Threatening to launch or maintain a multi-hundred gigabit amplification flood unless company leadership pays an extortion ransom, punishable with imprisonment up to 7 years and fines.",
    explanation: "Section 420 IPC penalizes cheating and fraudulent extortion. Cybercriminals who flood a corporate network with 500 Gbps of DNS reflection traffic and demand payment in cryptocurrency to halt the attack are prosecuted under Section 420 alongside IT Act Section 66.",
    hint: "IPC Section 420 covers Cheating and Fraudulent Extortion for DoS ransom demands.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 420):
// Offense: Demanding ₹50 Lakhs in cryptocurrency under threat of continuing a 600 Gbps DNS reflection flood
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "What is 'Memcached Localhost Binding & UDP Disabling' in Linux Security Hardening?",
    shortAnswer: "Configuring `/etc/memcached.conf` with `-l 127.0.0.1` (binding only to localhost) and `-U 0` (completely disabling UDP support), preventing public WAN exposure and 51,000x amplification abuse.",
    explanation: "Memcached only needs to communicate with local web applications on the same server. In `/etc/memcached.conf`, administrators set: `-l 127.0.0.1` (listens only on local loopback) and `-U 0` (turns off the UDP listener completely, enforcing TCP only). This eliminates any possibility of the server acting as an amplification reflector.",
    hint: "Locking the back door and only allowing people inside the house to access the pantry.",
    level: "basic",
    codeExample: `# Secure /etc/memcached.conf Configuration:
-l 127.0.0.1 # Bind ONLY to localhost!
-U 0         # Completely DISABLE UDP listener!`
  },
  {
    question: "What is 'DNS ANY Query Deprecation' (RFC 8482), and how does it neutralize DNS Amplification?",
    shortAnswer: "RFC 8482 allows authoritative DNS servers to respond to `ANY` queries with a single synthetic `HINFO` record (e.g. 'RFC8482') or a single A record, reducing response size from 4,000 bytes to under 100 bytes, destroying the amplification factor.",
    explanation: "Under RFC 8482 ('Providing Minimal Answers to DNS Queries for Type ANY'), authoritative servers (including Cloudflare and Google) stopped returning all resource records for `ANY` queries. When an attacker sends a `dig ANY cloudflare.com` query, the server returns a tiny 60-byte synthetic `HINFO` record. The response is almost identical in size to the query (AF ≈ 1.0), completely destroying the amplification factor.",
    hint: "When someone asks for 'EVERYTHING ON THE MENU', giving them a 1-page business card that says 'Check our website' instead of a 500-page book.",
    level: "expert",
    codeExample: `// RFC 8482 Minimal ANY Response:
;; QUESTION SECTION:
;cloudflare.com. IN ANY

;; ANSWER SECTION:
cloudflare.com. 3789 IN HINFO "RFC8482" "" # Response size is only 64 Bytes! (0x Amplification!)`
  },
  {
    question: "Synthesize the mathematical relationship between Attacker Ingress Request Bandwidth (B_req), Protocol Amplification Factor (AF), Cloud Anycast Scrubbing Capacity (C_scrub), and Ingress Link Saturation Probability (P_sat).",
    shortAnswer: "Reflected flood bandwidth is B_reflected = B_req * AF; saturation probability is modeled as P_sat = 1 - e^(- max(0, B_reflected - C_scrub) / σ_jitter); deploying multi-terabit Anycast cloud scrubbing networks (C_scrub > B_reflected) drives link saturation probability to zero.",
    explanation: "Let B_req represent the attacker's outbound request bandwidth (e.g. 10 Gbps generated by a botnet), AF represent the protocol amplification factor (e.g. 70x for DNS ANY or 556x for NTP monlist), and C_scrub represent cloud scrubbing capacity (e.g. 10 Tbps Anycast). Total reflected flood bandwidth is B_reflected = B_req * AF = 10 * 70 = 700 Gbps. Without scrubbing (enterprise 10 Gbps link), saturation is P_sat = 1 - e^(-(700 - 10)/20) = 100.0%. With Anycast scrubbing (C_scrub = 10,000 Gbps), B_reflected < C_scrub, keeping P_sat = 0.0%.",
    hint: "Mathematical formula proving that multiplying attacker bandwidth by the protocol amplification factor generates multi-gigabit reflected floods that require multi-terabit Anycast cloud scrubbing.",
    level: "expert",
    codeExample: `// Reflection Amplification Mathematical Proof:
// Attacker Request Bandwidth (B_req) = 10 Gbps | Protocol = NTP monlist (AF = 556x)
// Reflected Attack Bandwidth: B_reflected = 10 * 556 = 5,560 Gbps (5.56 Tbps!)
// Without Scrubbing (10 Gbps Pipe) ➔ Overload Ratio = 556x ➔ P_sat = 100.0% (COLLAPSE!)
// With Cloud Anycast (10 Tbps Scrubber) ➔ Surplus Capacity = +4.44 Tbps ➔ P_sat = 0.00% (IMMUNE!)`
  }
];

export default questions;
