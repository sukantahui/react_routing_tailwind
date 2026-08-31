const questions = [
  {
    question: "What is 'Critical Information Infrastructure' (CII), and how does Section 70 of the Indian IT Act 2000 protect it from DDoS Attacks?",
    shortAnswer: "CII refers to computer systems whose disruption would have a debilitating impact on national security, economy, public health, or safety; Section 70 allows the government to declare them 'Protected Systems', punishing DDoS disruptions with up to 10 YEARS IMPRISONMENT.",
    explanation: "Under Section 70 of the IT Act, critical installations (power grid SCADA in Barrackpore, UPI payment switches in Kolkata, nuclear telemetry, railway signaling) are designated as Protected Systems. Anyone who launches a DDoS attack attempting to deny access to authorized personnel faces non-bailable prosecution with mandatory imprisonment up to 10 years and heavy fines.",
    hint: "Section 70 of the IT Act prescribes up to 10 years imprisonment for attacks on Protected Systems.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 70 - Protected Systems):
// Protected Infrastructure: 220kV State Electrical Transmission Grid SCADA in Barrackpore
// Offense: Flooding boundary routers with 400 Gbps volumetric DDoS traffic
// Penalty: IMPRISONMENT FOR A TERM UP TO 10 YEARS + Substantial Fine`
  },
  {
    question: "What is 'Economic Denial of Sustainability' (EDoS) in Cloud Computing Environments?",
    shortAnswer: "An attack that targets auto-scaling cloud infrastructure (AWS EC2 / Lambda / Azure) with continuous moderate-rate Layer 7 traffic, forcing the cloud provider to spin up thousands of instances, bankrupting the victim with catastrophic cloud hosting bills.",
    explanation: "Unlike traditional DoS that aims to take a service offline, EDoS aims to keep the service online while maximizing cloud operational costs. When an attacker sends 50,000 continuous requests/sec to an un-cached serverless endpoint, AWS auto-scales from 5 instances to 500 instances. The victim's monthly cloud bill explodes from ₹50,000 to ₹45,00,000, forcing the business to shut down due to financial insolvency.",
    hint: "Running the hot water tap in someone's house 24/7 so their monthly gas and water bill reaches ₹10 Lakhs.",
    level: "basic",
    codeExample: `// EDoS Auto-Scaling Financial Explosion:
// Ingress Request Rate : 50,000 req/s (Moderate Layer 7 Traffic)
// Cloud Auto-Scaler    : Scales from 5 EC2 instances ➔ 500 EC2 instances
// Result               : Service stays online, but monthly AWS bill explodes to ₹45,00,000!`
  },
  {
    question: "What is 'Multi-Tenant Collateral Damage' (The Noisy Neighbor Problem) in Shared Cloud Hosting?",
    shortAnswer: "When an extreme multi-terabit DDoS attack targeting Tenant A overwhelms shared physical network switches, hypervisor CPU cores, or NAT gateways in a cloud availability zone, causing un-targeted innocent Tenants B and C to suffer service outages.",
    explanation: "Cloud providers host multiple customer virtual machines on the same physical hardware chassis. When an attacker hits Tenant A with an 800 Gbps flood, the physical Top-of-Rack (ToR) switch and shared internet uplink become 100% saturated. As a result, innocent medical and financial applications sharing that data center rack experience packet drops and connection failures.",
    hint: "A noisy rock concert in Apartment 4B making it impossible for everyone on the entire floor to sleep.",
    level: "moderate",
    codeExample: `// Multi-Tenant Cloud Architecture Collateral Impact:
// Target: Tenant A (Crypto Exchange) ➔ Receives 800 Gbps UDP Flood
// Shared Resource: Physical Top-of-Rack (ToR) 100G Switch & NAT Gateway
// Collateral Victims: Tenant B (Kolkata Hospital) & Tenant C (Barrackpore School) suffer 95% packet drops!`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 66F, what constitutes the criminal penalty for DDoS attacks targeting Power Grids or Financial Clearing Systems?",
    shortAnswer: "Launching DDoS attacks that deny access to critical infrastructure to threaten national security or terrorize citizens is CYBER TERRORISM, punishable with IMPRISONMENT FOR LIFE.",
    explanation: "Section 66F of the IT Act defines Cyber Terrorism. If an adversary launches a DDoS flood that paralyzes the 220kV power transmission grid in Barrackpore or national banking settlement switches in Salt Lake to destabilize the state economy or public order, the statutory penalty is mandatory Life Imprisonment.",
    hint: "Section 66F prescribes Life Imprisonment for Cyber Terrorism attacks on critical infrastructure.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66F - Cyber Terrorism):
// Offense: Paralyzing state electrical grid telemetry routers with 800 Gbps DDoS floods
// Penalty: IMPRISONMENT FOR LIFE`
  },
  {
    question: "What is the Role of NCIIPC (National Critical Information Infrastructure Protection Centre) under Section 70A of the IT Act?",
    shortAnswer: "NCIIPC is the national nodal agency responsible for identifying, auditing, establishing mandatory security guidelines, and coordinating emergency incident responses for Critical Information Infrastructure across India.",
    explanation: "Created under Section 70A of the IT Act, NCIIPC oversees 6 critical sectors: Power & Energy, Banking & Financial (BFSI), Telecom & Internet, Transport, Strategic & Public Enterprises, and Government. NCIIPC conducts regular vulnerability assessments, mandates 24/7 security monitoring, and establishes mandatory DDoS resilience frameworks for critical infrastructure.",
    hint: "NCIIPC is the national agency designated to safeguard India's critical cyber infrastructure under Section 70A.",
    level: "basic",
    codeExample: `// NCIIPC Statutory Mandate:
// Legal Section   : Section 70A Information Technology Act 2000
// Designated Body : National Critical Information Infrastructure Protection Centre (NCIIPC)
// Function        : 24/7 monitoring, auditing, and threat advisory issuance for Indian critical infrastructure`
  },
  {
    question: "How do DDoS Attacks against Industrial SCADA / ICS Systems Cause 'Physical / Kinetic Damage' to Power Grids?",
    shortAnswer: "By flooding SCADA boundary routers, DDoS attacks delay time-critical telemetry (Modbus/DNP3) and IEC 61850 GOOSE trip signals; without real-time telemetry, grid operators cannot detect electrical overloads, causing high-voltage transformer explosions and cascading blackouts.",
    explanation: "Industrial electrical grids operate on sub-second telemetry feedback loops. High-voltage protection relays send IEC 61850 GOOSE trip signals in under 4 milliseconds to isolate short circuits. If a DDoS attack floods the substation communication router with 10 Gbps of traffic, trip signals are delayed by seconds. A physical short circuit remains un-cleared, melting high-voltage transformer coils (worth ₹10 Crores) and triggering cascading blackout waves across the regional power grid.",
    hint: "Blinding the pilot of a speeding aircraft so they cannot see the mountain ahead until it is too late.",
    level: "expert",
    codeExample: `// SCADA Telemetry Timing Constraints:
// IEC 61850 GOOSE Trip Signal SLA : < 4.0 Milliseconds (Mandatory to prevent transformer explosion)
// Ingress DDoS Packet Flood Delay   : 4,500 Milliseconds (10 Gbps router saturation)
// Physical Impact                   : Protection Relay fails to trip ➔ Substation Transformer Melts!`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the enterprise liabilities when DDoS causes extended citizen health or financial data access outages?",
    shortAnswer: "Failing to implement reasonable technical availability controls resulting in persistent citizen data access paralysis triggers statutory penalties up to ₹250 Crores by the Data Protection Board of India.",
    explanation: "Section 8(5) mandates that data fiduciaries must implement reasonable technical and organizational safeguards. If a healthcare provider or banking portal in West Bengal fails to maintain DDoS scrubbing, resulting in prolonged service collapse for citizens, the DPBI can impose penalties up to ₹250 Crores under Section 33.",
    hint: "Maintaining continuous service availability is a mandatory technical safeguard under the DPDP Act.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for negligent infrastructure availability controls`
  },
  {
    question: "What is 'Cascading Failure' in Interdependent Critical Infrastructure Networks?",
    shortAnswer: "A failure propagation dynamic where an initial DDoS disruption in one sector (e.g. Telecom) causes secondary outages in dependent sectors (e.g. Banking RTGS failure), leading to tertiary collapses in supply chains and emergency services.",
    explanation: "Modern critical infrastructure is deeply interdependent. A 1 Tbps DDoS attack on a major telecom ISP in Kolkata disrupts internet connectivity. Consequently, banks cannot process UPI transactions or ATM withdrawals (BFSI collapse). Hospitals cannot verify online patient insurance (Healthcare collapse). Logistics trucks cannot obtain digital toll passes (Transport collapse). A single network attack paralyzes the entire regional economy.",
    hint: "A row of falling dominoes where pushing one small tile knocks down a massive chain of buildings.",
    level: "expert",
    codeExample: `// Cascading Interdependency Failure Chain:
// Tier 1: 1 Tbps DDoS Flood on Telecom Tier-1 Internet Exchange Point (IXP)
// Tier 2: Real-Time Gross Settlement (RTGS) & UPI payment networks fail across 45 banks
// Tier 3: Gas station fuel payment terminals and hospital emergency admissions lock up!`
  },
  {
    question: "How do 'Cloud Billing Circuit Breakers' and 'Budget Alarms' Mitigate Economic Denial of Sustainability (EDoS)?",
    shortAnswer: "By setting strict hard caps on maximum allowable auto-scaling instance counts and configuring AWS/Azure billing alarms that automatically throttle non-critical API endpoints when hourly compute spend exceeds a threshold.",
    explanation: "To prevent EDoS bankruptcies, cloud architects implement two safeguards: 1. Auto-Scaling Max Limit: Setting `MaxSize = 20` on EC2 auto-scaling groups so the cluster never scales to 500 instances regardless of load. 2. CloudWatch Billing Alarms: Triggering an AWS Lambda function when daily compute costs exceed ₹50,000 to engage Cloudflare Under Attack Mode and rate-limit ingress API traffic.",
    hint: "Setting a spending cap on your credit card so it automatically stops working if charges exceed ₹50,000 in a day.",
    level: "moderate",
    codeExample: `// Terraform Auto-Scaling Group Hard Cap (Prevents EDoS):
resource "aws_autoscaling_group" "kolkata_app_asg" {
  max_size         = 20       # STRICT HARD CAP: Never exceeds 20 instances during EDoS attacks!
  min_size         = 3
  desired_capacity = 5
  health_check_type= "ELB"
}`
  },
  {
    question: "Under CERT-In Mandatory Directions 2022, what is the mandatory incident reporting timeline for DDoS attacks affecting Critical Infrastructure or Data Centers?",
    shortAnswer: "All organizations operating critical infrastructure, data centers, or public services must report DDoS outages to CERT-In within 6 HOURS of detection.",
    explanation: "Under Section 70B of the IT Act and CERT-In Direction No. 20(3)/2022-CERT-In, service providers, intermediaries, data centers, and corporate bodies must mandatorily report specified cyber security incidents (including DDoS attacks on critical infrastructure) to CERT-In within 6 hours of noticing them.",
    hint: "CERT-In requires mandatory incident reporting within a strict 6-hour window.",
    level: "basic",
    codeExample: `// Statutory SLA (CERT-In Mandatory Incident Reporting):
// Directive: Mandatory reporting of critical infrastructure DDoS outages within 6 HOURS
// Mandate: Section 70B Information Technology Act 2000`
  },
  {
    question: "What is 'DNS Single Point of Failure' (SPOF) in Cloud Infrastructure (e.g. The 2016 Dyn DNS Attack)?",
    shortAnswer: "Relying on a single authoritative DNS provider to resolve domain names for thousands of independent cloud services; when the DNS provider is hit with a massive DDoS flood, all dependent cloud websites go dark simultaneously worldwide.",
    explanation: "On October 21, 2016, the Mirai botnet flooded Dyn DNS with 1.2 Tbps of traffic. Because hundreds of major cloud platforms (Twitter, Netflix, Spotify, GitHub, Amazon) used Dyn exclusively for DNS resolution, millions of users could not resolve domain names. Even though Amazon's and Netflix's origin data centers were 100% operational, the entire internet appeared offline.",
    hint: "Shutting down the central phone book directory so no one in the city can look up any business phone number.",
    level: "expert",
    codeExample: `// Dual-Provider Redundant Authoritative DNS Architecture (Prevents DNS SPOF):
// Provider 1 (Primary)   : Route 53 (ns-1.awsdns.com)
// Provider 2 (Secondary) : Cloudflare (ns-1.cloudflare.com)
// If Provider 1 is hit with 1 Tbps flood ➔ Recursive resolvers seamlessly query Provider 2!`
  },
  {
    question: "Under the Indian IT Act Section 43(f), what constitutes civil liability for launching DDoS attacks against corporate cloud services?",
    shortAnswer: "Denying or causing the denial of access to any person authorized to access any computer system or network carries compensation by way of damages up to ₹1 Crore.",
    explanation: "Section 43(f) explicitly penalizes denial of access: 'If any person without permission of the owner... denies or causes the denial of access... he shall be liable to pay damages by way of compensation not exceeding one crore rupees.'",
    hint: "Section 43(f) provides civil compensation up to ₹1 Crore for denying authorized access.",
    level: "basic",
    codeExample: `// Statutory Liability (IT Act Section 43(f)):
// Violation: Launching an 800 Gbps DDoS flood that takes down a Kolkata hospital's appointment booking server
// Compensation: Up to ₹1,00,00,00,000 (Rupees One Crore) per affected entity`
  },
  {
    question: "How do 'Isolated Availability Zones' and 'VPC Peering Silos' Prevent Multi-Tenant Cloud Contamination?",
    shortAnswer: "By dedicating separate physical compute clusters, isolated Top-of-Rack network switches, and dedicated AWS Direct Connect / Azure ExpressRoute circuits to critical tenants, preventing cross-tenant packet queue saturation.",
    explanation: "To protect mission-critical banking and SCADA workloads from noisy neighbors, enterprise cloud architects deploy Dedicated Hosts and dedicated Direct Connect 10 Gbps fiber links. The network traffic and hypervisor RAM of critical applications are physically isolated from public multi-tenant pools, ensuring a 1 Tbps flood on a neighboring tenant has zero impact on core banking operations.",
    hint: "Building a private express highway lane with dedicated physical walls so traffic jams in the regular lanes never slow you down.",
    level: "expert",
    codeExample: `// AWS Dedicated Host Configuration (Prevents Noisy Neighbor Contamination):
resource "aws_ec2_host" "kolkata_dedicated_core" {
  instance_type     = "c5.4xlarge"
  availability_zone = "ap-south-1a"
  auto_placement    = "on"
  host_recovery     = "on"
}`
  },
  {
    question: "What is 'Healthcare Telemetry Denial' in Medical IoT (IoMT) DDoS Attacks?",
    shortAnswer: "Flooding the wireless access points and central telemetry servers of hospital intensive care units (ICUs), disrupting real-time heartbeat, oxygen, and dialysis monitoring alerts, creating direct life-safety risks.",
    explanation: "Modern hospital ICUs rely on connected IoT patient monitors that stream ECG and pulse oximeter data over Wi-Fi/Ethernet to central nursing stations. An attacker launching an internal or external DDoS flood against hospital access points causes telemetry packet drops. If a cardiac arrest occurs, the central monitoring station fails to receive the alarm, resulting in patient fatality.",
    hint: "Cutting the emergency bell wire connecting patient hospital beds to the nurses' desk.",
    level: "expert",
    codeExample: `// Healthcare Medical IoT (IoMT) Life-Safety Threat:
// Target: Central ICU Telemetry Server (Port 8443 TLS Heartbeat Stream)
// Flood: 50,000 RPS Layer 7 HTTP POST Flood ➔ Causes 100% Telemetry Packet Drop
// Clinical Consequence: Critical Arrhythmia Alarm fails to reach ICU Nursing Station!`
  },
  {
    question: "Under the Indian IT Act Section 66, what constitutes the criminal penalty for disrupting government examination or citizen service portals via DDoS?",
    shortAnswer: "Dishonestly or fraudulently disrupting or diminishing the utility of computer systems carries imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Section 66 criminalizes fraudulent computer disruption: 'If any person, dishonestly or fraudulently, does any act referred to in section 43... he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees, or with both.'",
    hint: "Section 66 provides up to 3 years imprisonment and ₹5 Lakh fine for fraudulent computer disruption.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66):
// Offense: Flooding state university admission examination servers in Kolkata
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,000`
  },
  {
    question: "What is 'BGP Anycast Routing Dilution' for National Critical Infrastructure Protection?",
    shortAnswer: "Announcing the IP prefixes of national banking and energy infrastructure simultaneously from 300+ global Points of Presence (PoPs), fragmenting a 1 Tbps DDoS attack into negligible 3 Gbps increments across global scrubbing centers.",
    explanation: "When India's national financial switch (UPI/RTGS) announces its IP via BGP Anycast across global Tier-1 cloud scrubbers, international attack traffic is absorbed at the closest geographic data center. Botnets in North America hit Ashburn; European botnets hit London; Asian botnets hit Singapore. Only verified, clean transactional traffic is forwarded over encrypted private fiber to the primary data center in Mumbai/Kolkata.",
    hint: "Spreading a flood of water across 300 separate regional drainage basins around the globe.",
    level: "expert",
    codeExample: `// BGP Anycast Global Dilution Architecture:
// Total Attack Volume  : 1,200 Gbps (1.2 Tbps)
// Global Anycast Nodes : 300 Global Cloud Scrubbing PoPs
// Local Load per Node  : 1,200 / 300 = 4.0 Gbps (Easily filtered in hardware FPGA silicon!)`
  },
  {
    question: "Synthesize an enterprise-scale Critical Infrastructure & Cloud Resilience Architecture against Multi-Vector DDoS Attacks.",
    shortAnswer: "A defense-in-depth system combining Dual-Provider Redundant Anycast DNS, Always-On Multi-Terabit Cloud Scrubbing, Dedicated Isolated Cloud Compute Hosts, Auto-Scaling Hard Caps with EDoS Billing Alarms, and Sub-second SCADA Telemetry Prioritization.",
    explanation: "To achieve complete immunity against critical infrastructure and cloud-scale DDoS attacks: 1. DNS Layer: Dual-provider redundant Anycast DNS (Route 53 + Cloudflare) preventing DNS single points of failure. 2. Cloud Tier: Dedicated compute instances with auto-scaling caps (max 20 instances) and billing circuit breakers (defeating EDoS). 3. Network Tier: Multi-terabit Anycast cloud scrubbing absorbing 10+ Tbps volumetric floods. 4. Industrial OT Tier: Strict QoS packet priority on industrial boundary routers ensuring IEC 61850 GOOSE and Modbus telemetry packets are never dropped. 5. Governance: Mandatory 6-hour CERT-In incident reporting SLA.",
    hint: "Combine redundant Anycast DNS, EDoS auto-scaling hard caps, dedicated cloud hosts, and SCADA QoS prioritization.",
    level: "expert",
    codeExample: `// Master Critical Infrastructure Defense Blueprint:
// 1. DNS Layer   : Dual-Provider Anycast DNS (Route 53 + Cloudflare)
// 2. Cloud Layer : Strict Auto-Scaling Cap (max_size = 20) + Billing Alarm Webhooks
// 3. Scrubbing   : Always-On 10 Tbps Global Anycast DDoS Scrubbing
// 4. OT SCADA    : Cisco QoS 'priority' queue dedicated to IEC 61850 & Modbus TCP traffic`
  },
  {
    question: "What is 'Railway Passenger Reservation System' (PRS) DDoS Vulnerability & Economic Impact in India?",
    shortAnswer: "Flooding the IRCTC reservation gateway during peak Tatkal booking hours (10:00 AM - 11:00 AM) with millions of automated Layer 7 requests, causing booking transaction failures, citizen distress, and massive ticket booking revenue losses.",
    explanation: "The Indian Railways PRS processes millions of ticket bookings daily. During the critical Tatkal window, demand surges 100x. If an adversary launches a 200,000 RPS HTTP flood targeting `/tatkal/book`, backend transaction queues deadlock, preventing thousands of citizens from booking emergency travel and inflicting millions of Rupees in lost revenue on the railway network.",
    hint: "Creating a massive digital stampede at the railway ticket counter during the most critical booking hour of the day.",
    level: "moderate",
    codeExample: `// Critical Transport Infrastructure Impact (IRCTC / PRS):
// Target: /api/v1/tatkal/reserve-ticket (Peak 10:00 AM Window)
// Attack: 200,000 RPS Distributed Residential Proxy HTTP Flood
// Consequence: Payment Gateway Timeout ➔ 150,000 Citizens locked out of train bookings!`
  },
  {
    question: "Under the Indian Penal Code Section 427, what constitutes 'Mischief' via Critical Infrastructure DDoS Disruption?",
    shortAnswer: "Intentionally causing damage or service disruption to public utility systems that diminishes their value or utility, punishable with imprisonment up to 2 years and fines.",
    explanation: "Section 425/427 IPC defines Mischief. When an attacker launches a DDoS flood that disrupts public transportation portals, municipal water billing, or electrical grid monitoring in West Bengal, the act diminishes electronic public utility value, punishable with up to 2 years imprisonment under Section 427.",
    hint: "IPC Section 427 covers Mischief and Property Damage with up to 2 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Penalty (Indian Penal Code Section 427):
// Offense: Intentionally disrupting municipal emergency dispatch portals via DDoS (Mischief)
// Penalty: Imprisonment for a term up to 2 Years, or with Fine, or with both`
  },
  {
    question: "What is 'Out-of-Band' (OOB) Telemetry Channels in Critical Substation Protection?",
    shortAnswer: "Maintaining a physically isolated, dedicated fiber-optic or satellite communication channel for industrial SCADA telemetry that is completely disconnected from public corporate internet routers, ensuring zero exposure to public DDoS floods.",
    explanation: "To achieve complete immunity against internet-based DDoS attacks, critical electrical power grids in Barrackpore use Out-of-Band (OOB) optical fiber links (Dark Fiber / OPGW) running directly along high-voltage transmission towers. Because the SCADA telemetry network does not touch public internet IP ranges, public DDoS botnets cannot route a single packet to industrial protection relays.",
    hint: "A private underground telephone cable connecting the fire department directly to the mayor's office that no one else can call.",
    level: "expert",
    codeExample: `// Industrial SCADA Out-of-Band (OOB) Isolation:
// Optical Ground Wire (OPGW) Dark Fiber running along 220kV High-Voltage Towers
// Routing Protocol: Private BGP over MPLS (Zero public IPv4/IPv6 exposure!)
// Immunity: 100% immune to public WAN DDoS attacks!`
  },
  {
    question: "What is 'Aadhaar UIDAI Authentication Gateway' DDoS Resilience Architecture in India?",
    shortAnswer: "A multi-datacenter distributed authentication mesh using redundant Anycast routing, cryptographic HSM load balancing, and strict per-entity API rate limits to process over 80 Million daily biometric/OTP authentications with 99.999% availability.",
    explanation: "The Aadhaar authentication ecosystem (UIDAI) underpins banking KYC, food grain distribution (PDS), and passport verification across India. To withstand multi-vector DDoS attacks, UIDAI operates geo-redundant data centers (Manesar, Bengaluru) fronted by multi-terabit Anycast scrubbers and hardware HSM verification clusters, ensuring uninterrupted identity verification for 1.4 Billion citizens.",
    hint: "A multi-layered cryptographic mesh designed to ensure 1.4 Billion citizens can verify their identity 24/7 without interruption.",
    level: "expert",
    codeExample: `// UIDAI Critical Authentication Resilience Metric:
// Daily Transactions : > 80 Million Biometric & OTP Requests
// Availability SLA   : 99.999% (Five Nines)
// Ingress Protection : Multi-Terabit Anycast Cloud Scrubbing across Geo-Redundant Data Centers`
  },
  {
    question: "Under the Indian IT Act Section 70, what constitutes the legal procedure for declaring a system as a 'Protected System'?",
    shortAnswer: "The appropriate Government issues an official notification in the Official Gazette designating specific computer systems affecting national security, economy, or public health as Protected Systems.",
    explanation: "Under Section 70(1) of the IT Act, the Central or State Government publishes a gazette notification designating specific critical databases, SCADA networks, and financial switches as Protected Systems, authorizing NCIIPC oversight and triggering 10-year prison penalties for unauthorized access or DoS attacks.",
    hint: "Official Gazette notification by the Government under Section 70(1).",
    level: "moderate",
    codeExample: `// Gazette Notification Standard (IT Act Section 70(1)):
// "The Central Government hereby declares the Core Banking Solution (CBS) and UPI Switching Infrastructure 
// as a PROTECTED SYSTEM for the purposes of the Information Technology Act 2000."`
  },
  {
    question: "What is 'Smart Grid Head-End System' (HES) DDoS Vulnerability in Modern Power Distribution?",
    shortAnswer: "Flooding the central Head-End System that collects hourly electricity consumption data from millions of smart electric meters, delaying automated billing, dynamic load balancing, and anti-theft detection.",
    explanation: "Power distribution companies (DISCOMs) in West Bengal are deploying smart electricity meters communicating over 4G/NB-IoT to a central Head-End System (HES). A DDoS attack flooding the HES with 100,000 RPS disrupts meter telemetry, preventing the power utility from executing real-time grid load balancing, leading to localized voltage instability during peak summer demand.",
    hint: "Overwhelming the central electrical meter reader computer so it cannot tell how much power the city is consuming.",
    level: "moderate",
    codeExample: `// Smart Grid HES Telemetry Ingress:
// 2,000,000 Smart Meters in West Bengal transmitting hourly JSON consumption metrics
// Ingress DDoS Attack: 100,000 RPS HTTP POST flood against /hes/meter-reading
// Impact: DISCOM loses real-time grid load balancing visibility ➔ Substation overload risk!`
  },
  {
    question: "What is 'Quality of Service' (QoS) Differentiated Services Code Point (DSCP) Tagging for Industrial SCADA Telemetry?",
    shortAnswer: "Tagging critical industrial control packets with high-priority DSCP values (e.g. `EF` - Expedited Forwarding / DSCP 46) so that edge routers process SCADA control signals first and drop lower-priority attack packets during link congestion.",
    explanation: "When an internet link experiences heavy DDoS congestion, network routers drop packets in their output queues. By configuring QoS DSCP tagging, industrial SCADA packets (`IEC 60870-5-104`, `Modbus TCP`) are marked with Expedited Forwarding (`EF`). The router allocates a dedicated low-latency priority queue for these packets, ensuring 100% of SCADA control signals pass through unharmed even when the link is 99% saturated by attack traffic.",
    hint: "Giving an emergency ambulance with sirens flashing priority over all regular cars in a massive traffic jam.",
    level: "expert",
    codeExample: `// Cisco IOS QoS SCADA Priority Queue Configuration:
class-map match-any SCADA_CRITICAL_TRAFFIC
 match ip dscp ef
 match access-group name SCADA_PORTS_ACL

policy-map CRITICAL_INFRASTRUCTURE_QOS
 class SCADA_CRITICAL_TRAFFIC
  priority level 1
  police rate percent 20 # Guaranteed 20% dedicated bandwidth!
 class class-default
  fair-queue             # Drops attack flood packets during congestion!`
  },
  {
    question: "Under the Indian Penal Code Section 420, what constitutes Cheating and Dishonestly Inducing Delivery of Property via Critical Infrastructure DDoS Extortion?",
    shortAnswer: "Threatening to launch or maintain a DDoS flood against power grids, hospitals, or banking portals unless leadership pays an extortion ransom, punishable with imprisonment up to 7 years and fines.",
    explanation: "Section 420 IPC penalizes cheating and fraudulent extortion. Cybercriminals who flood critical public infrastructure and demand payment in cryptocurrency to halt the attack are prosecuted under Section 420 alongside IT Act Section 66 and 66F.",
    hint: "IPC Section 420 covers Cheating and Fraudulent Extortion for DoS ransom demands.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 420):
// Offense: Demanding ₹1 Crore in cryptocurrency under threat of continuing a DDoS flood against a regional hospital
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "What is 'Cross-Region Failover Latency' in Cloud Disaster Recovery during Regional DDoS Attacks?",
    shortAnswer: "The time required (typically 30-180 seconds) to detect regional cloud failure and re-route global DNS traffic to a secondary cloud region (e.g. from AWS Mumbai `ap-south-1` to AWS Hyderabad `ap-south-2`), maintaining business continuity.",
    explanation: "If a massive 1.5 Tbps DDoS flood completely saturates the internet exchange uplinks of an entire cloud availability zone in Mumbai, Route 53 health checks detect the failure within 30 seconds. Traffic is automatically shifted to the secondary hot-standby region in Hyderabad, restoring full transactional availability for banking and healthcare applications.",
    hint: "Automatically switching on the emergency backup generator in another building when the main power station fails.",
    level: "expert",
    codeExample: `// AWS Route 53 DNS Failover Routing Policy:
resource "aws_route53_record" "primary_mumbai_vip" {
  zone_id = aws_route53_zone.kolkata_fintech.zone_id
  name    = "api.fintech.in"
  type    = "A"
  failover_routing_policy {
    type = "PRIMARY"
  }
  set_identifier = "mumbai-primary"
  health_check_id= aws_route53_health_check.mumbai_health.id
}`
  },
  {
    question: "What is 'Serverless Function Concurrency Exhaustion' (Lambda EDoS) in Cloud-Native Architectures?",
    shortAnswer: "Exhausting the cloud account's regional concurrent execution limit (e.g. default 1,000 concurrent Lambda executions) by flooding un-authenticated API endpoints, causing legitimate backend business functions to fail with HTTP 429 Too Many Requests.",
    explanation: "AWS Lambda enforces a default limit of 1,000 concurrent function executions per region. An attacker sends 2,000 rapid HTTP requests to `/api/health`. All 1,000 Lambda execution slots are occupied by the health check function. When a customer attempts to process a credit card payment on `/api/checkout`, Lambda returns `429 Too Many Requests (Rate Exceeded)`, breaking customer checkout.",
    hint: "Using all 1,000 phone lines in an office to play music so no customer calls can come through.",
    level: "expert",
    codeExample: `// AWS Lambda Reserved Concurrency Hardening (Prevents Concurrency Starvation):
resource "aws_lambda_function" "critical_payment_processor" {
  function_name = "ProcessPayment"
  reserved_concurrent_executions = 500 # GUARANTEES 500 dedicated execution slots for payments!
}`
  },
  {
    question: "What is 'Submarine Cable Landing Station' (CLS) DDoS & Telecom Backbone Saturation in India?",
    shortAnswer: "Flooding the international gateway IP transit routers located at submarine cable landing stations (e.g. Tata/Airtel landing stations in Mumbai and Chennai), choking international internet bandwidth for the entire subcontinent.",
    explanation: "Over 95% of India's international internet traffic flows through submarine fiber cables landing in Mumbai, Chennai, and Kochi. If a state-sponsored adversary targets the BGP border routers of these landing stations with multi-terabit floods, international connectivity to global cloud regions, search engines, and trade networks is severely degraded, impacting national economic output.",
    hint: "Blocking the main harbor channel where all cargo ships enter the country.",
    level: "expert",
    codeExample: `// India Submarine Cable Landing Station (CLS) Strategic Hubs:
// Key Locations: Mumbai (SMC, VSNL), Chennai (SMW4, i2i), Kochi (SEA-ME-WE 3)
// Protection   : National Tier-1 Terabit BGP Scrubbing & Diversion via NIXI (National Internet Exchange of India)`
  },
  {
    question: "Synthesize the mathematical formulation of Cascading Interdependency Failure Probability (P_cascade), System Failure Rates (p_i), Cloud EDoS Cost Accumulation (Cost_EDoS), and Infrastructure Resiliency Index (R_infra).",
    shortAnswer: "Cascading failure is P_cascade = 1 - ∏ (1 - p_i); EDoS cost accumulation is Cost_EDoS = C_base + ∫ λ_attack(t) * Cost_instance dt; infrastructure resilience index is R_infra = 1 - P_cascade; enforcing dedicated OOB channels and auto-scaling hard caps ensures R_infra = 1.0.",
    explanation: "Let K represent the number of interdependent critical infrastructure sectors (e.g. Telecom, Power, BFSI, Healthcare). If the independent failure probabilities under a multi-vector DDoS attack are p1 = 0.40 (Telecom), p2 = 0.35 (Power), p3 = 0.50 (BFSI), the probability of at least one sector collapsing is P_cascade = 1 - (1 - 0.40)(1 - 0.35)(1 - 0.50) = 1 - (0.60 * 0.65 * 0.50) = 1 - 0.195 = 80.5%. In cloud environments, EDoS cost accumulation is Cost_EDoS = C_base + ∫ λ_attack(t) * Cost_instance dt. Implementing Out-of-Band (OOB) SCADA dark fiber and strict auto-scaling hard caps (MaxSize = 20) forces p_i → 0, driving Infrastructure Resiliency to R_infra = 1 - 0 = 100.0%.",
    hint: "Mathematical proof formula showing that interdependent critical sectors experience cascading failure unless isolated via dedicated Out-of-Band networks and strict auto-scaling caps.",
    level: "expert",
    codeExample: `// Critical Infrastructure Cascading Failure Proof:
// Interdependent Sectors: Telecom (p1=0.40), Power Grid (p2=0.35), Banking BFSI (p3=0.50)
// Cascading Collapse Probability: P_cascade = 1 - (0.60 * 0.65 * 0.50) = 80.5%!
// With Out-of-Band Dark Fiber & Anycast Dilution ➔ p1, p2, p3 = 0.00 ➔ P_cascade = 0.0% (100% RESILIENT!)`
  }
];

export default questions;
