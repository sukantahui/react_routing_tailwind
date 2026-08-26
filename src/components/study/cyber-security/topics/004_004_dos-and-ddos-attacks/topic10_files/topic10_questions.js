const questions = [
  {
    question: "What is a 'Cloud-based DDoS Scrubbing Center', and how does it separate malicious attack traffic from legitimate user traffic?",
    shortAnswer: "A specialized global multi-terabit data center network that ingests all inbound traffic destined for a protected network, filters out volumetric and application-layer DDoS attacks using hardware FPGA silicon and Web Application Firewalls (WAF), and forwards only verified clean traffic to the origin server via GRE/IPsec tunnels.",
    explanation: "When an enterprise is attacked with an 800 Gbps flood, its local 10 Gbps internet link would instantly saturate. A cloud scrubbing provider (Cloudflare, Akamai, Imperva) announces the enterprise's IP via BGP Anycast across 300 global data centers. The 800 Gbps attack is ingested at the cloud edge, scrubbed in hardware, and the remaining 2 Gbps of legitimate traffic is returned to the origin in Kolkata via private GRE/IPsec tunnels with zero downtime.",
    hint: "A municipal water purification plant that takes in muddy river water, filters out all dirt and toxins, and sends only crystal-clear drinking water to homes.",
    level: "basic",
    codeExample: `// Cloud DDoS Scrubbing Ingestion & Return Flow:
// Inbound Traffic  : 800 Gbps Dirty Flood ➔ Ingested by 300 Global Anycast PoPs
// Hardware Silicon : FPGA / ASIC Drops UDP Reflection, SYN Floods & Malicious Payloads (798 Gbps Dropped!)
// Clean Return     : 2 Gbps Clean Traffic ➔ Forwarded to Kolkata Origin via GRE/IPsec Tunnel`
  },
  {
    question: "What is the Difference between 'Always-On' and 'On-Demand' Cloud DDoS Scrubbing Architectures?",
    shortAnswer: "Always-On continuously routes all traffic through the cloud scrubbing center 24/7, providing 0-second automatic mitigation at the cost of a small added latency; On-Demand routes traffic normally and only diverts traffic via BGP announcement when an attack exceeds a threshold, taking 2-15 minutes to engage.",
    explanation: "Always-On is mandatory for mission-critical banking and healthcare systems where even a 1-minute outage is unacceptable. On-Demand is more cost-effective for general corporate networks: traffic flows directly under normal conditions, but when netflow sensors detect a 50 Gbps flood, an automated BGP update shifts traffic to the cloud scrubber within 3 to 10 minutes.",
    hint: "Wearing a bulletproof vest 24/7 (Always-On) vs running to the closet to put on a bulletproof vest when you hear gunshots (On-Demand).",
    level: "moderate",
    codeExample: `// Architecture Comparison:
// Always-On  : Mitigation Latency = 0 Seconds | Routing = BGP Anycast 24/7 | SLA = 100% Uptime
// On-Demand  : Mitigation Latency = 2-15 Minutes (BGP Propagation Time) | Routing = NetFlow Triggered BGP Divert`
  },
  {
    question: "How do 'Generic Routing Encapsulation' (GRE) and 'IPsec' Tunnels Return Clean Traffic from Scrubbers to Customer Origins?",
    shortAnswer: "The scrubbing center encapsulates clean, filtered IP packets inside a GRE/IPsec wrapper (`IP-in-IP`) and transmits them across the public internet to the customer's border router, which decapsulates the packets and forwards them to internal application servers.",
    explanation: "Because the customer's public IP addresses are announced by the cloud scrubbing provider, the customer's on-premise data center router cannot receive packets directly via standard BGP. The scrubber wraps clean packets inside a GRE tunnel header (`Protocol 47`): `[Scrubber IP -> Customer Router IP][Original Client IP -> Target Server IP][Data Payload]`. The customer router strips the GRE header, delivering clean packets to backend servers.",
    hint: "Placing a clean verified letter inside a second registered postal envelope addressed directly to the recipient's private office.",
    level: "expert",
    codeExample: `// Cisco Router GRE Tunnel Configuration for Cloud DDoS Scrubbing Return:
interface Tunnel100
 description "GRE Clean Traffic Return from Cloud Scrubbing Center"
 ip address 192.168.254.2 255.255.255.252
 tunnel source 103.25.10.1           ! Customer Edge Public IP
 tunnel destination 198.41.128.1     ! Cloud Scrubbing Center PoP IP
 tunnel mode gre ip
 mtu 1476                            ! 24-byte GRE overhead adjustment
 ip tcp adjust-mss 1436`
  },
  {
    question: "What is a 'Web Application Firewall' (WAF), and how does it differ from a Network Layer Firewall?",
    shortAnswer: "A Network Firewall inspects Layer 3/4 headers (IPs, ports, TCP flags) to block network floods; a WAF performs deep packet inspection on Layer 7 HTTP/HTTPS payloads, terminating TLS to inspect URLs, headers, cookies, POST bodies, JSON, and SQL queries to block application exploits.",
    explanation: "A standard network firewall sees an HTTPS connection on port 443 as legitimate traffic. A WAF decrypts the SSL/TLS session, analyzes the HTTP request against rulesets (OWASP Top 10), checks for SQL injection (`' OR 1=1--`), Cross-Site Scripting (XSS), and Slowloris patterns, blocking malicious requests with HTTP 403 before they reach the web server.",
    hint: "A guard checking the outside of a delivery truck (Network Firewall) vs a customs inspector opening every box inside the truck to check the contents (WAF).",
    level: "basic",
    codeExample: `// Network Firewall vs WAF Inspection Depth:
// Network Firewall (L3/L4) : Matches: TCP Port 443, Src IP 182.70.1.5 ➔ ALLOW!
// Web Application Firewall (L7): Decrypts TLS ➔ Finds: /api/login?user=admin'-- ➔ BLOCKS HTTP 403 (SQL Injection)!`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 66F, what constitutes the criminal penalty for launching DDoS attacks that attempt to overwhelm Cloud Scrubbing Centers protecting Critical Infrastructure?",
    shortAnswer: "Launching multi-terabit DDoS attacks targeting national infrastructure protected by cloud scrubbing centers to threaten national security is CYBER TERRORISM, punishable with IMPRISONMENT FOR LIFE.",
    explanation: "Section 66F of the IT Act defines Cyber Terrorism. If an adversary launches a 1.2 Tbps volumetric flood attempting to saturate cloud scrubbing centers protecting the state power grid in Barrackpore or national banking switches in Kolkata, the offense carries mandatory Life Imprisonment.",
    hint: "Section 66F prescribes Life Imprisonment for Cyber Terrorism attacks on critical infrastructure.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66F - Cyber Terrorism):
// Offense: Paralyzing state electrical grid telemetry routers with 1.2 Tbps DDoS floods
// Penalty: IMPRISONMENT FOR LIFE`
  },
  {
    question: "What is 'TLS JA3 and JA4 Fingerprinting' in Advanced Cloud WAF Bot Detection?",
    shortAnswer: "A technique that generates an MD5/hash signature of the client's SSL/TLS Client Hello packet parameters (cipher suites, extensions, supported elliptic curves, and signature algorithms), identifying automated attack bots regardless of spoofed User-Agent headers.",
    explanation: "Automated DDoS tools (e.g. Python `requests`, Go HTTP, Mirai) use hardcoded cryptographic libraries that produce distinct TLS Client Hello handshakes. Even if an attacker spoofs `User-Agent: Mozilla/5.0 (Windows NT 10.0; Chrome/130)`, its JA3 hash (e.g. `e7d705a3286e...`) matches Python `requests`. Cloud WAFs evaluate the JA3/JA4 signature in microsecond lookups, blocking malicious bot floods instantly.",
    hint: "Identifying an impostor wearing a police uniform by noticing their shoes and belt buckle do not match real police gear.",
    level: "expert",
    codeExample: `// JA3 Fingerprint Hash Construction:
// Parameters: SSLVersion, Ciphers, Extensions, EllipticCurves, EllipticCurvePointFormats
// Example JA3 String : 771,4865-4866-4867-49195,0-23-65281-10-11-35-16,29-23-24,0
// JA3 MD5 Hash       : b32309a26951912be7dba376398abc12 ➔ MATCHES KNOWN MIRAI / PYTHON BOT ➔ DROP HTTP 403!`
  },
  {
    question: "What is 'Positive Security Model' vs 'Negative Security Model' in Cloud WAF Architecture?",
    shortAnswer: "A Negative Security Model permits all traffic by default and blocks requests matching known attack signatures (like an antivirus); a Positive Security Model blocks all traffic by default and only permits strictly defined valid schemas, URLs, data types, and character sets.",
    explanation: "Negative security (e.g. OWASP Core Rule Set) is easy to deploy but vulnerable to zero-day bypasses. Positive security (e.g. strict OpenAPI/JSON schema validation) defines: `/api/pay` accepts ONLY `amount` (integer 1-100000) and `upi_id` (regex `^[a-zA-Z0-9]+@[a-zA-Z]+$`). Any request containing unexpected parameters, oversized payloads, or special characters is rejected instantly, providing zero-day immunity.",
    hint: "A guest list where anyone can enter unless they are on the banned list (Negative) vs a VIP party where NO ONE enters unless their name is explicitly on the invitation list (Positive).",
    level: "moderate",
    codeExample: `// Positive Security Model OpenAPI WAF Schema Validation:
paths:
  /api/v1/upi/pay:
    post:
      requestBody:
        content:
          application/json:
            schema:
              type: object
              required: [amount, upi_id]
              properties:
                amount: { type: integer, minimum: 1, maximum: 100000 }
                upi_id: { type: string, pattern: "^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$" }
              additionalProperties: false # REJECTS ANY UNRECOGNIZED FIELDS!`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the enterprise obligations for maintaining service availability via Cloud Scrubbing and WAFs?",
    shortAnswer: "Organizations must implement reasonable technical availability safeguards; persistent failure to deploy cloud scrubbing and WAF availability controls leading to extended personal data access outages triggers statutory fines up to ₹250 Crores.",
    explanation: "Section 8(5) mandates that data fiduciaries must implement reasonable technical and organizational safeguards. If an enterprise in West Bengal fails to maintain cloud scrubbing or WAF availability controls, resulting in prolonged service collapse for citizens, the DPBI can impose penalties up to ₹250 Crores under Section 33.",
    hint: "Maintaining continuous service availability is a mandatory technical safeguard under the DPDP Act.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for negligent cloud scrubbing and WAF controls`
  },
  {
    question: "What is 'WAF Virtual Patching' (e.g. Log4Shell CVE-2021-44228 Mitigation), and how does it protect vulnerable backend servers in minutes?",
    shortAnswer: "Deploying a centralized Layer 7 WAF inspection rule that detects and blocks exploitation payloads targeting a newly disclosed zero-day vulnerability at the cloud edge, shielding thousands of backend servers before application code can be patched.",
    explanation: "When Log4Shell was disclosed in December 2021, patching thousands of Java application servers took weeks. Cloud WAF providers (Cloudflare, AWS WAF) deployed a virtual patch rule within 2 hours: `Match: Request contains '${jndi:ldap://' or '${jndi:dns://' -> Block HTTP 403`. All exploit payloads were dropped at the cloud edge, giving backend engineering teams time to upgrade Java libraries safely.",
    hint: "Placing a physical filter over the main air vent of a building during a gas leak while engineers work to repair the broken pipe inside.",
    level: "expert",
    codeExample: `// AWS WAF Virtual Patching Rule for Log4Shell (CVE-2021-44228):
{
  "Name": "Log4Shell_Virtual_Patch",
  "Priority": 1,
  "Statement": {
    "ByteMatchStatement": {
      "SearchString": "\${jndi:",
      "FieldToMatch": { "AllQueryArguments": {} },
      "TextTransformations": [{ "Priority": 0, "Type": "URL_DECODE" }, { "Priority": 1, "Type": "LOWERCASE" }],
      "PositionalConstraint": "CONTAINS"
    }
  },
  "Action": { "Block": {} }
}`
  },
  {
    question: "Under CERT-In Mandatory Directions 2022, what is the mandatory incident reporting timeline for DDoS attacks mitigated by Cloud Scrubbing Centers?",
    shortAnswer: "All organizations in India must report DDoS attacks affecting public services, banking portals, or corporate applications to CERT-In within 6 HOURS of detection.",
    explanation: "Under Section 70B of the IT Act and CERT-In Direction No. 20(3)/2022-CERT-In, service providers, intermediaries, data centers, and corporate bodies must mandatorily report specified cyber security incidents (including major DDoS attacks mitigated by cloud scrubbing centers) to CERT-In within 6 hours of noticing them.",
    hint: "CERT-In requires mandatory incident reporting within a strict 6-hour window.",
    level: "basic",
    codeExample: `// Statutory SLA (CERT-In Mandatory Incident Reporting):
// Directive: Mandatory reporting of DDoS service outages within 6 HOURS
// Mandate: Section 70B Information Technology Act 2000`
  },
  {
    question: "How do 'Hardware FPGA and ASIC Packet Engines' in Cloud Scrubbing Centers process 100+ Million Packets Per Second?",
    shortAnswer: "By implementing Layer 3/4 packet parsing, cryptographic SYN cookie calculation, and access control list (ACL) evaluation directly in physical silicon microchips (FPGA/ASIC), inspecting and filtering packets in under 5 nanoseconds without CPU overhead.",
    explanation: "Software-based CPU packet inspection (Linux kernel) is limited by memory bus bottlenecks (~5-10 Mpps per server). Cloud scrubbing centers deploy custom FPGA silicon (e.g. Xilinx / Intel Stratix). The FPGA hardware pipeline inspects incoming Ethernet frames, checks IP headers, computes RFC 4987 HMAC SYN cookies in hardware, and drops volumetric flood packets in 4.2 nanoseconds at full 100 Gbps wire speed.",
    hint: "A dedicated physical sorter machine that sorts 100,000 letters per second in hardware rather than a human reading each envelope.",
    level: "expert",
    codeExample: `// FPGA Hardware Scrubbing Pipeline:
// Ingress 100 Gbps Ethernet Frame ➔ ASIC Pipeline (4.2ns) ➔ Matches UDP Amplification Pattern ➔ DROP!
// Ingress TCP SYN Packet ➔ Hardware RFC 4987 HMAC Engine (3.8ns) ➔ SYN-ACK Cookie Transmitted!`
  },
  {
    question: "Under the Indian IT Act Section 43(f), what constitutes civil liability for launching DDoS attacks against corporate web applications protected by WAFs?",
    shortAnswer: "Denying or causing the denial of access to any person authorized to access any computer system or network carries compensation by way of damages up to ₹1 Crore.",
    explanation: "Section 43(f) explicitly penalizes denial of access: 'If any person without permission of the owner... denies or causes the denial of access... he shall be liable to pay damages by way of compensation not exceeding one crore rupees.'",
    hint: "Section 43(f) provides civil compensation up to ₹1 Crore for denying authorized access.",
    level: "basic",
    codeExample: `// Statutory Liability (IT Act Section 43(f)):
// Violation: Launching an 800 Gbps DDoS flood that takes down a Kolkata hospital's appointment booking server
// Compensation: Up to ₹1,00,00,00,000 (Rupees One Crore) per affected entity`
  },
  {
    question: "What is 'Behavioral Machine Learning Bot Management' in Modern Cloud WAFs?",
    shortAnswer: "A machine learning engine that evaluates client mouse trajectory curvature, scroll velocity, keystroke cadence, touch screen dynamics, and canvas fingerprinting to score request human probability in real time.",
    explanation: "Residential proxy botnets easily rotate IP addresses to bypass basic rate limiters. Behavioral WAFs embed invisible client-side telemetry scripts. Real human browsing generates smooth curved mouse movements, natural scroll acceleration, and typing jitter. Automated headless browser bots exhibit linear mouse paths, instantaneous clicks, and zero scroll entropy, allowing the WAF to block bot requests with 99.9% accuracy.",
    hint: "A security guard who can spot a shoplifter by how they walk and look around, even if they are wearing ordinary clothes.",
    level: "expert",
    codeExample: `// Behavioral Bot Telemetry Feature Vector:
// 1. Mouse Path Curvature Entropy : 0.00 (Strict Linear Path ➔ AUTOMATED BOT!)
// 2. Click-to-Form Submission Time: 12ms (Non-human reaction speed!)
// 3. Canvas Rendering Hash       : Matches Headless Chromium Library ➔ BLOCK HTTP 403!`
  },
  {
    question: "What is 'WAF False Positive Tuning' and 'Anomaly Scoring Mode' (OWASP Core Rule Set)?",
    shortAnswer: "Instead of immediately blocking on a single rule match, Anomaly Scoring adds weighted penalty points for each suspicious pattern; the request is blocked ONLY if the cumulative anomaly score exceeds a threshold (e.g. Score >= 5), minimizing false positive disruptions.",
    explanation: "In traditional WAFs, a legitimate user submitting a valid address containing a semicolon (`;`) might trigger an instant SQL injection block (false positive). In OWASP CRS Anomaly Scoring Mode, minor rule matches add 2-3 points. A single semicolon adds 2 points (request passes). A real attack containing `' UNION SELECT; DROP TABLE` triggers 4 rules, accumulating 18 points, exceeding the threshold of 5, triggering an instant HTTP 403 block.",
    hint: "A driving test where minor errors give you penalty points, but you only fail the test if your total penalty points exceed the limit.",
    level: "moderate",
    codeExample: `// OWASP ModSecurity Anomaly Scoring Evaluation:
# Rule 1: Semicolon in Query Parameter (Score +2)
# Rule 2: SQL Keyword 'UNION' (Score +5)
# Rule 3: SQL Keyword 'SELECT' (Score +5)
# Total Anomaly Score = 12 (Threshold = 5) ➔ BLOCKED WITH HTTP 403!`
  },
  {
    question: "Under the Indian IT Act Section 66, what constitutes the criminal penalty for using automated exploit tools against Cloud WAFs?",
    shortAnswer: "Dishonestly or fraudulently disrupting or diminishing the utility of computer systems carries imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Section 66 criminalizes fraudulent computer disruption: 'If any person, dishonestly or fraudulently, does any act referred to in section 43... he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees, or with both.'",
    hint: "Section 66 provides up to 3 years imprisonment and ₹5 Lakh fine for fraudulent computer disruption.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66):
// Offense: Executing automated SQL injection and DDoS flood scripts against corporate WAFs in Kolkata
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,00,000`
  },
  {
    question: "What is 'HTTP Request Smuggling' (CL.TE / TE.CL) and how do Cloud WAFs prevent it?",
    shortAnswer: "An attack exploiting discrepancies between how a front-end cloud proxy and back-end server parse `Content-Length` (CL) and `Transfer-Encoding` (TE) headers, allowing attackers to bypass WAF security filters and inject unauthorized requests into other users' sessions.",
    explanation: "If the cloud WAF prioritizes `Content-Length: 13` and the backend server prioritizes `Transfer-Encoding: chunked`, the backend server parses the smuggled trailing bytes as the start of a completely new HTTP request. Cloud WAFs prevent this by strictly normalizing HTTP request headers, rejecting ambiguous requests containing both CL and TE headers, and enforcing HTTP/2 or HTTP/3 on front-end connections.",
    hint: "Hiding a secret letter inside a package that the mail scanner ignores because of confusing packaging labels.",
    level: "expert",
    codeExample: `// HTTP Request Smuggling CL.TE Attack Payload:
POST / HTTP/1.1
Host: kolkata-fintech.in
Content-Length: 13
Transfer-Encoding: chunked

0

GET /admin HTTP/1.1  <-- Smuggled Request executed on backend bypassing WAF!`
  },
  {
    question: "Synthesize an enterprise-scale Cloud Scrubbing & Web Application Firewall (WAF) Architecture.",
    shortAnswer: "A multi-layered defense-in-depth framework combining Always-On Multi-Terabit BGP Anycast Cloud Scrubbing (300+ PoPs), Hardware FPGA L3/L4 Filtering, Dual-Provider GRE/IPsec Return Tunnels, Cloud WAF with Positive Security Model, Behavioral JA4 Bot Management, and Virtual Patching.",
    explanation: "To achieve complete immunity against multi-terabit volumetric and advanced Layer 7 bypass DDoS attacks: 1. Edge Tier: 300 Anycast PoPs ingesting 10+ Tbps volumetric traffic. 2. Silicon Tier: FPGA/ASIC hardware scrubbing dropping UDP reflection and computing SYN cookies in under 5ns. 3. Application Tier: Cloud WAF with OWASP CRS anomaly scoring, OpenAPI schema validation, and JA4 bot fingerprinting. 4. Transport Tier: Dual redundant GRE return tunnels with TCP MSS clamping (1436B). 5. Origin Tier: Cloaked origin servers whitelisting only scrubber IPs.",
    hint: "Combine Anycast scrubbing, FPGA hardware filters, dual GRE tunnels, Positive Security WAFs, and JA4 bot management.",
    level: "expert",
    codeExample: `// Master Cloud Scrubbing & WAF Blueprint:
// 1. Ingress Layer : 10 Tbps BGP Anycast Global Dilution across 300 PoPs
// 2. Hardware Layer: FPGA Silicon Layer 3/4 Packet Scrubbing (RFC 4987 SYN Cookies)
// 3. WAF Layer     : AWS WAF / Cloudflare with JA4 Bot Management & OpenAPI Schema Validation
// 4. Tunnel Layer  : Redundant GRE IP-in-IP Tunnels (MTU 1476, TCP MSS 1436)
// 5. Origin Layer  : Origin IP Cloaking (iptables whitelisting Scrubber IPs exclusively)`
  },
  {
    question: "What is 'TCP MSS Clamping' (Maximum Segment Size) in GRE Scrubbing Tunnels?",
    shortAnswer: "Adjusting the TCP Maximum Segment Size option in SYN packets to 1436 bytes (subtracting 24 bytes for the GRE header and 40 bytes for IP/TCP headers) to prevent IP fragmentation and performance degradation across scrubbed tunnel traffic.",
    explanation: "Standard Ethernet MTU is 1500 bytes. When a cloud scrubber wraps an IP packet inside a GRE tunnel header, it adds 24 bytes of overhead ($1500 + 24 = 1524$ bytes). Without MSS clamping, packets exceed the 1500-byte WAN MTU, causing fragmentation or packet drops. Setting `ip tcp adjust-mss 1436` forces endpoints to send 1436-byte segments, ensuring encapsulated packets fit perfectly within 1500 bytes.",
    hint: "Packing slightly smaller boxes so they fit into a larger shipping crate without needing to be cut in half.",
    level: "expert",
    codeExample: `! Cisco Router TCP MSS Clamping Configuration:
interface Tunnel100
 ip tcp adjust-mss 1436    ! Prevents GRE IP packet fragmentation across WAN links!`
  },
  {
    question: "Under the Indian Penal Code Section 427, what constitutes 'Mischief' via Cloud WAF Evasion?",
    shortAnswer: "Intentionally causing damage or service disruption to computer systems that diminishes their value or utility, punishable with imprisonment up to 2 years and fines.",
    explanation: "Section 425/427 IPC defines Mischief. When an attacker bypasses cloud WAF filters and crashes corporate database servers in West Bengal, the act diminishes electronic property utility, punishable with up to 2 years imprisonment under Section 427.",
    hint: "IPC Section 427 covers Mischief and Property Damage with up to 2 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Penalty (Indian Penal Code Section 427):
// Offense: Bypassing cloud WAF rules to execute Layer 7 DDoS attacks against banking portals (Mischief)
// Penalty: Imprisonment for a term up to 2 Years, or with Fine, or with both`
  },
  {
    question: "What is 'HTTP/2 and HTTP/3 Protocol Sanitization' in Cloud WAFs?",
    shortAnswer: "Validating that incoming HTTP/2 frames (HEADERS, DATA, SETTINGS, RST_STREAM) and HTTP/3 QUIC datagrams strictly adhere to RFC specifications, discarding malformed stream multiplexing and Rapid Reset exploit frames in hardware.",
    explanation: "In attacks like HTTP/2 Rapid Reset (CVE-2023-44487), attackers abuse stream cancellation frames. Cloud WAF protocol sanitizers enforce strict stream concurrency limits (`max_concurrent_streams = 128`), rate-limit `RST_STREAM` frame frequencies, and discard malformed HPACK header compression payloads before they reach backend application parsers.",
    hint: "Checking all incoming shipping containers to ensure the doors, locks, and manifests strictly follow international shipping standards.",
    level: "expert",
    codeExample: `// Cloud WAF HTTP/2 Sanitizer Policy:
http2_max_concurrent_streams 128; # Caps concurrent streams
http2_max_field_size 16k;        # Rejects oversized header fields
http2_max_header_size 32k;`
  },
  {
    question: "What is 'BGP Community-Based Traffic Diversion' for On-Demand Scrubbing?",
    shortAnswer: "Signaling upstream Tier-1 ISPs to redirect an organization's BGP prefix to a cloud scrubbing center by advertising a specific BGP Community string (e.g. `set community 64512:999`), diverting traffic in under 60 seconds.",
    explanation: "Under normal conditions, an enterprise in Kolkata announces its BGP prefix directly to Tata and Airtel. When a DDoS attack begins, the enterprise's border router tags its BGP route advertisement with the cloud provider's diversion community tag. Upstream ISP routers read the tag and instantly route all international traffic to the cloud scrubbing provider's nearest Anycast PoP, activating mitigation.",
    hint: "Pushing a panic button in a bank that automatically reroutes all incoming road traffic to a secure military checkpoint.",
    level: "expert",
    codeExample: `// BGP On-Demand Diversion Route Map:
route-map DIVERT-TO-SCRUBBER permit 10
 set community 64512:999 # Instructs Tier-1 ISPs to divert traffic to Cloud Scrubbing Network!`
  },
  {
    question: "Under the Indian IT Act Section 70, what constitutes the penalty for DDoS Attacks targeting 'Protected Systems' shielded by Cloud Scrubbing Centers?",
    shortAnswer: "Securing unauthorized access or attempting to deny access to designated Protected Systems carries imprisonment up to 10 YEARS and severe fines.",
    explanation: "Section 70 of the IT Act governs Critical Information Infrastructure (e.g. power grids in Barrackpore, financial settlement switches in Salt Lake). Launching an attack that attempts to overwhelm cloud scrubbing centers protecting a designated protected system carries up to 10 years imprisonment under Section 70.",
    hint: "Section 70 carries up to 10 years imprisonment for DoS attacks on Protected Systems.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 70):
// Offense: Flooding cloud scrubbing centers protecting SCADA power transmission telemetry routers
// Penalty: Imprisonment for a term up to 10 YEARS, and shall also be liable to Fine`
  },
  {
    question: "What is 'Origin Cloaking and Scrubber IP Whitelisting' in Cloud WAF Defense?",
    shortAnswer: "Configuring the origin server's host firewall (iptables / AWS Security Groups) to drop 100% of incoming connections EXCEPT those originating from the verified IP ranges of the cloud scrubbing provider, preventing direct-to-origin bypass floods.",
    explanation: "If an attacker discovers the origin server's real IP address (`103.25.10.50`), they will flood it directly on port 443, bypassing the cloud WAF completely. By configuring the origin firewall to whitelist ONLY Cloudflare's IP ranges (`173.245.48.0/20`, etc.) and drop everything else, direct-to-origin floods are dropped at the packet filter, ensuring all traffic must pass through the WAF.",
    hint: "Locking all doors to a building and allowing entry only through one secure metal detector manned by security guards.",
    level: "moderate",
    codeExample: `// AWS Security Group Origin Cloaking Policy:
resource "aws_security_group_rule" "allow_cloudflare_https_only" {
  type        = "ingress"
  from_port   = 443
  to_port     = 443
  protocol    = "tcp"
  cidr_blocks = ["173.245.48.0/20", "103.21.244.0/22"] # Official Cloudflare IP Prefixes ONLY!
  security_group_id = aws_security_group.kolkata_origin_sg.id
}`
  },
  {
    question: "What is 'WAF Custom Threat Intelligence Feed Ingestion' (STIX/TAXII)?",
    shortAnswer: "Automatically ingesting real-time threat intelligence feeds from CERT-In, Shadowserver, and commercial ISACs into the WAF via STIX/TAXII protocols, dynamically blocking malicious botnet C2 IP addresses and bulletproof proxies within seconds.",
    explanation: "Modern cloud WAFs can use browser-verification challenges when traffic exceeds expected thresholds. Legitimate browsers can complete the verification, while automated clients may fail and receive an HTTP error response or be rate-limited.",
    hint: "An automated police radio that instantly updates every patrol officer's digital wanted list whenever a new suspect is identified.",
    level: "expert",
    codeExample: `// Python STIX/TAXII Threat Feed Ingester for Cloud WAF:
from taxii2client.v21 import Server
server = Server("https://threat-intel.cert-in.org.in/taxii2/")
collection = server.default_api_root.collections[0]
for obj in collection.get_objects():
    if obj.type == "indicator" and "ipv4-addr" in obj.pattern:
        update_waf_ip_set(obj.pattern) # Dynamically blocks malicious botnet IPs globally!`
  },
  {
    question: "Under the Indian Penal Code Section 420, what constitutes Cheating and Dishonestly Inducing Delivery of Property via Cloud WAF Extortion?",
    shortAnswer: "Threatening to launch or maintain a multi-vector DDoS attack that will overwhelm cloud WAFs unless leadership pays an extortion ransom, punishable with imprisonment up to 7 years and fines.",
    explanation: "Section 420 IPC penalizes cheating and fraudulent extortion. Cybercriminals who flood a company's web portal and demand payment in cryptocurrency to halt the attack are prosecuted under Section 420 alongside IT Act Section 66.",
    hint: "IPC Section 420 covers Cheating and Fraudulent Extortion for DoS ransom demands.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 420):
// Offense: Demanding ₹50 Lakhs in cryptocurrency under threat of overwhelming cloud WAF protections
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "What is 'Rate-Based WAF Rules with CAPTCHA Interstitial Challenges' (Turnstile / reCAPTCHA v3)?",
    shortAnswer: "When an individual IP address exceeds a moderate request threshold (e.g. > 20 req/min), the WAF serves a seamless cryptographic CAPTCHA challenge; human users solve it in 200ms with zero friction, while automated flood scripts fail and are blocked.",
    explanation: "Modern cloud WAFs can use browser-verification challenges when traffic exceeds expected thresholds. Legitimate browsers can complete the verification, while automated clients may fail and receive an HTTP error response or be rate-limited.",
    hint: "Asking a visitor at the gate to press a quick buzzer before entering instead of permanently banning them.",
    level: "moderate",
    codeExample: `// Cloudflare WAF Rate-Based Challenge Rule:
// Expression: (http.request.uri.path contains "/api/search" and count(http.request.id) > 20)
// Action    : Managed Challenge (Turnstile JS Proof-of-Work) ➔ Human users pass, bot scripts blocked!`
  },
  {
    question: "What is 'WAF GraphQL / REST API Schema Validation' in Modern Web Security?",
    shortAnswer: "Parsing incoming GraphQL queries and REST API requests against a strict schema definition, rejecting queries with excessive depth (nesting > 5 levels), cyclic references, or unauthorized field introspection used in API DoS attacks.",
    explanation: "Attackers exploit GraphQL endpoints by submitting deeply nested queries: `query { author { books { author { books { author ... } } } } }`. When executed, this single request forces the backend SQL database to perform thousands of recursive queries, locking CPU cores at 100%. Cloud WAFs parse the GraphQL AST (Abstract Syntax Tree) at the edge, enforcing a strict query depth limit ($\le 5$) and blocking malicious nested queries instantly.",
    hint: "A librarian rejecting a book search request that asks for 'the book written by the author of the book written by the author of the book...' 50 times.",
    level: "expert",
    codeExample: `// GraphQL Query Depth Defense (Cloud WAF):
query MaliciousDeepQuery { # Query Depth = 15 ➔ EXCEEDS WAF MAX DEPTH (5) ➔ BLOCKED WITH HTTP 400!
  user {
    friends {
      friends {
        friends {
          friends { name }
        }
      }
    }
  }
}`
  },
  {
    question: "What is 'Zero-RTT TLS Session Resumption' (TLS 1.3 0-RTT) Security Risks in Cloud WAFs?",
    shortAnswer: "TLS 1.3 0-RTT allows clients to send HTTP request data in the first handshake flight without server verification; attackers exploit 0-RTT to launch replay attacks against non-idempotent endpoints (e.g. `/api/transfer-funds`), requiring WAFs to disable 0-RTT on POST routes.",
    explanation: "While 0-RTT accelerates page load times, early data can be captured by an eavesdropper and replayed multiple times. If an attacker replays a valid 0-RTT `POST /api/pay` request, the server might process the payment twice. Cloud WAFs enforce RFC 8470 (`Early-Data` header restrictions), allowing 0-RTT only on safe, idempotent GET requests and disabling 0-RTT on all transactional POST/PUT routes.",
    hint: "Allowing a customer to skip the ticket line only when asking for a free brochure, but requiring full ID verification at the ticket counter before transferring money.",
    level: "expert",
    codeExample: `// Nginx TLS 1.3 0-RTT Anti-Replay Configuration:
ssl_early_data on;
# Require WAF validation on non-idempotent methods:
if ($request_method = POST) {
    set $early_data_disallowed 1;
}
if ($ssl_early_data) {
    # If early data is replayed on a POST route ➔ REJECT HTTP 425 (Too Early)!
    return 425;
}`
  },
  {
    question: "Synthesize the mathematical formulation of Cloud Scrubbing Throughput (T_clean), Volumetric Ingress Load (V_total), Layer 3/4 Hardware Drop Rate (DR_L3L4), Layer 7 WAF Drop Rate (DR_L7), and Total Added Scrubbing Latency (ΔL_scrub).",
    shortAnswer: "Clean traffic throughput is T_clean = V_total * (1 - DR_L3L4) * (1 - DR_L7); total added latency is ΔL_scrub = RTT_Anycast + T_FPGA_inspect + T_WAF_eval + RTT_GRE_tunnel; with Anycast routing and hardware FPGA pipelines, ΔL_scrub is bounded under 8.5 milliseconds.",
    explanation: "Let V_total represent the total incoming dirty flood volume (e.g. 1,000 Gbps). If the Layer 3/4 FPGA hardware filters drop 99.5% of volumetric UDP/SYN packets (DR_L3L4 = 0.995), the remaining traffic entering Layer 7 inspection is 1,000 * (1 - 0.995) = 5.0 Gbps. If the Cloud WAF filters 60% of malicious HTTP/bot requests (DR_L7 = 0.60), the clean traffic delivered to the origin is: T_clean = 5.0 * (1 - 0.60) = 2.0 Gbps. Total added scrubbing latency is ΔL = RTT_Anycast (2.5ms) + T_FPGA (0.005ms) + T_WAF (1.8ms) + RTT_GRE (3.5ms) = 7.805 milliseconds, providing seamless high-speed user browsing.",
    hint: "Mathematical proof formula showing how hardware FPGA filters and WAF engines reduce a 1,000 Gbps dirty flood to 2.0 Gbps of clean traffic with under 8.5ms of total added latency.",
    level: "expert",
    codeExample: `// Cloud Scrubbing Throughput & Latency Mathematical Proof:
// Ingress Dirty Flood Volume (V_total) = 1,000 Gbps | FPGA Drop Rate = 99.5% | WAF Drop Rate = 60.0%
// Clean Output Throughput: T_clean = 1,000 * (1 - 0.995) * (1 - 0.60) = 2.0 Gbps (99.8% Flood Filtered!)
// Total Scrubbing Latency: Delta_L = 2.5ms (Anycast) + 0.005ms (FPGA) + 1.8ms (WAF) + 3.5ms (GRE) = 7.805ms!`
  }
];

export default questions;
