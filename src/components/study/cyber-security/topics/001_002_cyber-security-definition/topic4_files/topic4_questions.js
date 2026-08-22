// topic4_questions.js
// 30 Moderate to Expert Questions on Cyber Space, 3 Structural Layers, Governance, Asymmetric Warfare, and Attribution

const questions = [
  {
    question: "What is Cyberspace and what distinguishes it from the physical domains of land, sea, air, and space?",
    shortAnswer: "Cyberspace is a global, human-created domain within the information environment consisting of interconnected telecommunications networks, computer systems, and embedded processors; unlike physical natural domains, cyberspace is entirely artificial, non-physical, borderless, and continuously malleable by software.",
    explanation: "Cyberspace operates at the speed of light where physical geography and national land borders do not naturally restrict digital packet flows.",
    hint: "A human-made digital world consisting of interconnected computers, cables, and networks worldwide.",
    level: "basic",
    codeExample: "Cyberspace_Domain = { Nature: 'Man-Made / Software-Defined', Speed: 'Speed of Light', Borders: 'Transnational' };"
  },
  {
    question: "What are the Three Structural Layers of Cyberspace?",
    shortAnswer: "1. Physical Layer (hardware, submarine cables, satellite links, routers, data centers); 2. Logical Layer (protocols, IP routing, DNS, software code, operating systems); 3. Cyber-Persona / Cognitive Layer (digital user accounts, human decision-making, and social identity).",
    explanation: "A cyber attack can target physical hardware (destroying a generator), logical code (exploiting a buffer overflow), or the human persona (phishing).",
    hint: "1. Physical (cables/hardware), 2. Logical (code/protocols), 3. Cyber-Persona (user accounts/humans).",
    level: "expert",
    codeExample: "Cyberspace_Layers = ['1. Physical Hardware Layer', '2. Logical Protocol/Software Layer', '3. Cyber-Persona/Cognitive Layer'];"
  },
  {
    question: "What is the 'Physical Layer' of Cyberspace and why is it vulnerable to kinetic sabotage?",
    shortAnswer: "Comprises undersea fiber-optic cables (carrying 99% of transoceanic data), satellite ground stations, server farms, and electrical power supplies; physical cutting of undersea cables in the Bay of Bengal can sever national Internet connectivity.",
    explanation: "Physical infrastructure is geographically anchored in sovereign territories and international waters, making it susceptible to naval sabotage or natural earthquakes.",
    hint: "Real-world cables under the ocean, data centers, and cell towers that carry internet traffic.",
    level: "basic",
    codeExample: "PhysicalLayer = ['Undersea Submarine Cables', 'LEO Satellites', 'Data Center Fiber Backbones', 'Core Routers'];"
  },
  {
    question: "What is the 'Logical Layer' of Cyberspace and how do protocols govern it?",
    shortAnswer: "The software and protocol abstractions (BGP routing, TCP/IP, DNS names, TLS encryption) that translate physical electrical/optical pulses into meaningful data packets routed globally across sovereign boundaries.",
    explanation: "Adversaries exploit logical vulnerabilities (e.g. BGP route hijacking, DNS spoofing) to redirect traffic without touching physical cables in Kolkata.",
    hint: "The software, IP addresses, and DNS protocols that tell data packets where to travel.",
    level: "moderate",
    codeExample: "LogicalLayer = { Protocols: ['TCP/IP', 'BGP4', 'DNS', 'HTTP/3'], Software: ['Linux Kernels', 'Hypervisors', 'Databases'] };"
  },
  {
    question: "What is the 'Cyber-Persona & Cognitive Layer' of Cyberspace?",
    shortAnswer: "The layer representing digital identities (email addresses, social media accounts, biometric hashes) and the human cognitive minds interacting with them, serving as the primary target for phishing, social engineering, and cognitive warfare.",
    explanation: "Targets the psychological human layer to manipulate decisions and extract administrative passwords in Barrackpore.",
    hint: "The human accounts and minds that interact with computers, targeted by fake news and phishing.",
    level: "moderate",
    codeExample: "CognitiveLayer = { Persona: 'UserAccounts / Identities', Vectors: ['Phishing', 'Deepfakes', 'Disinformation'] };"
  },
  {
    question: "What is the cost in Indian Rupees (₹) for an Enterprise External Attack Surface Management (EASM) Platform?",
    shortAnswer: "Approximately ₹3,50,000 to ₹8,20,000 per year (including continuous internet-wide asset discovery, exposed credential monitoring, and dark web threat intelligence).",
    explanation: "EASM continuously maps an organization's public cyberspace footprint and unpatched shadow servers in ₹.",
    hint: "Enterprise EASM platform costs ₹3,50,000 – ₹8,20,000 per year in Indian Rupees.",
    level: "moderate",
    codeExample: "Annual_EASM_Budget = ₹5,50,000; // Continuous Internet-Wide Attack Surface Scanning & Dark Web Feeds"
  },
  {
    question: "What is Asymmetry of Warfare in Cyberspace and why does it favor the attacker?",
    shortAnswer: "A lone hacker or small criminal cell with an inexpensive laptop can inflict multi-crore damages on a multinational corporation or national utility, while defenders must secure millions of lines of code and thousands of ports 100% of the time.",
    explanation: "'Defenders must be right 100% of the time; attackers only need to be right once.'",
    hint: "A single cheap laptop can attack a billion-dollar company; defenders must guard every door.",
    level: "basic",
    codeExample: "AsymmetryEquation: DefenderCost(₹50,00,000 for Firewalls/EDR) vs AttackerCost(₹50,000 for Laptop/Tools)"
  },
  {
    question: "What is the Attribution Problem in Cyberspace and why is it notoriously difficult?",
    shortAnswer: "The challenge of conclusively identifying the true physical individual, group, or nation-state responsible for a cyber attack, made difficult by proxy VPNs, Tor onion routing, spoofed IP addresses, and deliberate 'false flag' tool insertions.",
    explanation: "Attackers route malicious traffic through compromised servers in five different countries to conceal their physical location in Jadavpur.",
    hint: "Difficult to prove who actually launched a hack because hackers hide behind proxies and fake clues.",
    level: "expert",
    codeExample: "Attribution_Challenges = ['Tor Onion Routing', 'Bulletproof VPN Proxies', 'False-Flag Russian/Chinese Strings'];"
  },
  {
    question: "How does the Information Technology Act 2000 in India govern Cyberspace activities?",
    shortAnswer: "Provides the primary legal framework in India for electronic commerce, digital signatures, and cybercrime punishment (e.g. Section 43 for unauthorized access, Section 66 for computer hacking, Section 66C for identity theft, Section 69A for blocking malicious domains).",
    explanation: "Grants legal recognition to electronic records and establishes statutory jurisdiction for investigating cyber offences across West Bengal.",
    hint: "Indian law that defines cyber crimes, hacking punishments, and legal validity of digital signatures.",
    level: "basic",
    codeExample: "IT_Act_2000: { Section66: 'Hacking & System Sabotage', Section66C: 'Identity Theft', Section69A: 'Domain Takedowns' };"
  },
  {
    question: "What is Border Gateway Protocol (BGP) Route Hijacking in the Logical Layer of Cyberspace?",
    shortAnswer: "The illegitimate advertisement of IP address prefixes by a rogue Autonomous System (AS), causing global internet routers to redirect internet traffic meant for banks or governments through the attacker's surveillance network.",
    explanation: "Defended using Resource Public Key Infrastructure (RPKI) and Route Origin Authorizations (ROAs) in Kolkata.",
    hint: "A rogue network falsely claims it owns your IP address, stealing your internet traffic.",
    level: "expert",
    codeExample: "BGP_Hijack: Rogue_AS.advertise('198.51.100.0/24') -> GlobalTrafficRedirected -> InterceptedByAttacker"
  },
  {
    question: "What is Domain Name System (DNS) Cache Poisoning and how does DNSSEC secure cyberspace?",
    shortAnswer: "An attack where forged DNS responses inject malicious IP mappings into recursive resolvers, sending users visiting 'bank.com' to a phishing site; DNSSEC cryptographically signs DNS records using public-key cryptography to prevent forged lookups.",
    explanation: "Protects millions of banking customers across West Bengal from being invisibly diverted to credential harvesting sites.",
    hint: "Tricking DNS into sending you to a fake bank website; DNSSEC stops this with digital signatures.",
    level: "moderate",
    codeExample: "DNSSEC: Resolver verifies RRSIG (Resource Record Signature) with Zone KSK/ZSK before returning IP."
  },
  {
    question: "What is Plausible Deniability in nation-state cyberspace operations?",
    shortAnswer: "A nation-state covertly sponsors or contracts independent cybercriminal mercenary gangs to conduct destructive cyber attacks, allowing government officials to formally deny involvement due to lack of conclusive forensic evidence.",
    explanation: "Allows nation-states to conduct aggressive geopolitical espionage while evading international economic sanctions.",
    hint: "Governments hiring criminal hackers so they can claim 'we didn't do it' if caught.",
    level: "expert",
    codeExample: "PlausibleDeniability = { StateActor: 'Funds Gang', MercenaryGang: 'Executes Attack', OfficialStance: 'Deny Involvement' };"
  },
  {
    question: "What is the Dark Web and how does it exist within Cyberspace?",
    shortAnswer: "A subset of the Deep Web operating on encrypted overlay networks (e.g. Tor .onion, I2P) requiring specialized routing software; used legitimately for whistleblower privacy, but extensively by cybercriminals to trade stolen databases, zero-day exploits, and ransomware tools.",
    explanation: "Threat intelligence teams in Kolkata monitor dark web forums to detect leaked corporate credentials before public disclosure.",
    hint: "Encrypted hidden websites accessible only through Tor, where hackers trade stolen passwords and tools.",
    level: "basic",
    codeExample: "DarkWeb_Monitoring: ScrapeTorForums() -> DetectLeakedCompanyCredentials() -> ForcePasswordReset();"
  },
  {
    question: "What is Cyber Sovereignty and how do nations enforce digital boundaries?",
    shortAnswer: "The doctrine that a sovereign state has the right to govern, regulate, and control all digital networks, data flows, and cyberspace infrastructure operating within its physical borders (e.g. through data localization laws and national firewalls).",
    explanation: "India enforces cyber sovereignty via the DPDPA 2023 and CERT-In mandates requiring critical personal and financial data to reside on domestic servers.",
    hint: "A country's right to control and regulate the internet, servers, and data within its own borders.",
    level: "moderate",
    codeExample: "CyberSovereignty = ['Data Localization Mandate', 'Domestic CERT-In Compliance', 'National Firewall Filtering'];"
  },
  {
    question: "How do Submarine Undersea Cables form the physical backbone of global Cyberspace?",
    shortAnswer: "Over 500 undersea fiber-optic cable systems spanning over 1.4 million kilometers carry 99% of all intercontinental internet traffic, transferring terabits of data per second using dense wavelength division multiplexing (DWDM).",
    explanation: "Undersea cable landing stations in Mumbai and Chennai connect India to the global cyberspace grid.",
    hint: "Over 1.4 million km of undersea glass cables carrying 99% of all international internet data.",
    level: "basic",
    codeExample: "SubmarineCable = { Media: 'Armored Fiber Optic', Capacity: '250+ Terabits/sec', LandingStations: ['Mumbai', 'Chennai'] };"
  },
  {
    question: "What is a Cyber Range and why is it used for cyberspace warfare simulation?",
    shortAnswer: "A fully isolated, hyper-realistic simulated virtual network environment mimicking enterprise IT, SCADA power grids, and military communication networks, used to conduct live red-team vs blue-team cyber warfare combat training.",
    explanation: "University labs in Jadavpur train cybersecurity engineers on real-world malware defense in controlled cyber ranges.",
    hint: "A safe virtual simulator where ethical hackers practice real-world cyber warfare battles.",
    level: "moderate",
    codeExample: "Annual_CyberRange_Cost = ₹4,20,000; // Simulated Red/Blue Team Defense Exercises"
  },
  {
    question: "What is the role of CERT-In (Indian Computer Emergency Response Team) in Indian Cyberspace?",
    shortAnswer: "The national nodal agency under the Ministry of Electronics and Information Technology (MeitY) responsible for responding to cybersecurity incidents, issuing threat advisories, and mandating 6-hour incident reporting for critical infrastructure.",
    explanation: "Coordinates national cyber defense responses during widespread malware outbreaks across Barrackpore and India.",
    hint: "India's national agency that tracks cyber attacks, issues security alerts, and handles emergencies.",
    level: "basic",
    codeExample: "CERT_In_Directive = 'Mandatory reporting of cyber security incidents to CERT-In within 6 hours of discovery.';"
  },
  {
    question: "How does the Speed of Propagation in Cyberspace alter conventional military reaction times?",
    shortAnswer: "Physical missiles take minutes to hours to reach targets; cyber exploits propagate across global optical fiber in milliseconds, disabling electrical grids or missile defenses before human command chains can react without AI defense automation.",
    explanation: "Necessitates autonomous AI-native threat response engines in modern cyber defense operations.",
    hint: "Cyber attacks hit in milliseconds at light speed, requiring automated AI defenses to react instantly.",
    level: "expert",
    codeExample: "PropagationTime: Missile = '15 to 30 Minutes' vs CyberWeapon = '120 Milliseconds (Speed of Light)';"
  },
  {
    question: "What is an Autonomous System (AS) and BGP Routing in Cyberspace?",
    shortAnswer: "An Autonomous System is a collection of connected IP routing prefixes under the control of a single administrative entity (e.g. ISP, university, cloud provider) presenting a unified routing policy using the Border Gateway Protocol (BGP).",
    explanation: "Jadavpur University operates its own AS number to route academic traffic directly across national research backbones.",
    hint: "A large network operated by an ISP or university with its own unique internet routing number.",
    level: "moderate",
    codeExample: "AutonomousSystem = { ASN: 'AS13335', Entity: 'Cloudflare', Protocol: 'BGP4', Prefixes: ['1.1.1.0/24'] };"
  },
  {
    question: "What is Cognitive Warfare and Disinformation in the Cyber-Persona layer?",
    shortAnswer: "The weaponization of social media bots, generative AI deepfakes, and targeted psychological operations to manipulate public perception, sow social discord, and undermine democratic faith without hacking computer code.",
    explanation: "Targets the human brain (wetware) as the ultimate operating system to compromise in modern hybrid conflicts.",
    hint: "Using fake news and AI deepfakes to manipulate human opinions and elections online.",
    level: "expert",
    codeExample: "CognitiveWarfare: Deploy_AI_Botnet() -> AmplifyPolarizingNarratives() -> ManipulateElectoralBehavior();"
  },
  {
    question: "What is Low Earth Orbit (LEO) Satellite Megaconstellation routing in modern Cyberspace?",
    shortAnswer: "Constellations of thousands of satellites (e.g. Starlink, OneWeb) orbiting at 550 km that route internet packets across space using inter-satellite optical laser links, providing ultra-low latency broadband to remote regions.",
    explanation: "Provides resilient cyberspace connectivity to remote medical stations in the Sundarbans of West Bengal.",
    hint: "Thousands of satellites in space connected by lasers, beaming fast internet to remote areas.",
    level: "moderate",
    codeExample: "LEO_Routing: GroundStation -> KaBand_Uplink -> Satellite_Mesh(100G_Laser_ISL) -> Remote_Destination"
  },
  {
    question: "What is Shodan and Censys in Cyberspace Reconnaissance?",
    shortAnswer: "Search engines that continuously scan all 4.3 billion IPv4 addresses and active IPv6 ranges, indexing open ports, web server banners, ICS/SCADA controllers, and unpatched webcams connected to public cyberspace.",
    explanation: "Used by security researchers in Kolkata to discover accidentally exposed industrial routers before attackers exploit them.",
    hint: "Search engines that scan and list every internet-connected device, webcam, and server in the world.",
    level: "basic",
    codeExample: "Shodan_Query: 'org:\"Hospital Corp\" port:445 os:\"Windows Server 2008\"' -> Reveals unpatched SMB ports"
  },
  {
    question: "What is Air-Gapped Network Segmentation and why is it detached from public Cyberspace?",
    shortAnswer: "The complete physical detachment of high-security computing networks (e.g. nuclear control systems, military classified databases) from the public Internet and all external wireless networks.",
    explanation: "Eliminates remote cyberspace entry vectors, forcing attackers to rely on physical supply chain insertion in Barrackpore.",
    hint: "Completely unplugging high-security computers from the internet to stop remote hackers.",
    level: "basic",
    codeExample: "AirGap_State: PublicInternetCableConnected = false; WirelessInterfaces = 'Disabled_In_BIOS';"
  },
  {
    question: "How do Internet Exchange Points (IXPs) optimize Cyberspace traffic in regional hubs?",
    shortAnswer: "Physical network access points (e.g. NIXI in Kolkata) where local ISPs, content delivery networks (CDNs), and enterprise networks directly peer and exchange traffic locally without routing packets through costly international transit links.",
    explanation: "Reduces latency from 80ms down to &lt; 5ms for student e-learning traffic between Barrackpore and Kolkata.",
    hint: "Local physical hubs where internet providers connect directly to keep local traffic fast and cheap.",
    level: "basic",
    codeExample: "IXP_Peering: LocalISP_A <--(100G Direct Peering at NIXI Kolkata)--> LocalISP_B (Latency < 3ms)"
  },
  {
    question: "What is False Flag Operation in Cyberspace espionage?",
    shortAnswer: "A stealth cyber attack where the adversary deliberately implants deceptive artifacts (e.g. Russian code snippets, Chinese timezone stamps, Arabic comments) into their malware to mislead forensic investigators and blame another country.",
    explanation: "Complicates diplomatic responses and forensic attribution during geopolitical cyber crises.",
    hint: "Hackers leaving fake foreign clues in their viruses to frame another country for the attack.",
    level: "expert",
    codeExample: "FalseFlag: Implant_Language_String('Cyrillic_Strings') in malware compiled by foreign adversary."
  },
  {
    question: "How does IPv6 expand the addressable Cyberspace compared to IPv4?",
    shortAnswer: "IPv4 provides 4.3 billion addresses (32-bit), which are fully exhausted; IPv6 provides 3.4 × 10³⁸ unique addresses (128-bit), allowing every IoT device, connected car, and smart sensor on earth to have a unique globally routable cyberspace address.",
    explanation: "Enables massive scalability for smart city sensor grids deployed across West Bengal.",
    hint: "IPv6 provides practically unlimited IP addresses (340 undecillion) so every smart device gets one.",
    level: "basic",
    codeExample: "AddressSpace: IPv4 = 2^32 (4.3 Billion) vs IPv6 = 2^128 (340,282,366,920,938,463,463,374,607,431,768,211,456)"
  },
  {
    question: "What is the role of the National Critical Information Infrastructure Protection Centre (NCIIPC) in India?",
    shortAnswer: "The designated national agency created under Section 70A of the IT Act 2000 to protect India's Critical Information Infrastructure (CII) across power, banking, telecom, transport, and strategic defense sectors from catastrophic cyber disruption.",
    explanation: "Conducts regular security audits and threat assessments of thermal power stations and radar installations in West Bengal.",
    hint: "India's agency dedicated to protecting critical power grids, banking systems, and defense networks.",
    level: "moderate",
    codeExample: "NCIIPC_Mandate: Protect(PowerGrids, CoreBanking, AirTrafficRadar, TelecomBackbones);"
  },
  {
    question: "What is BGP Route Leak and how does it differ from a deliberate BGP Hijack?",
    shortAnswer: "A BGP Leak is an accidental misconfiguration where an ISP inadvertently propagates routing announcements across boundaries, creating unintended transit paths and traffic blackholes; a BGP Hijack is an intentional, malicious takeover of IP prefixes.",
    explanation: "An accidental BGP leak by a small ISP in 2019 knocked out major European cloud services for 2 hours.",
    hint: "BGP Leak is an accidental router misconfiguration; BGP Hijack is a deliberate, malicious attack.",
    level: "expert",
    codeExample: "BGP_Leak: Accidental_Import_Rule -> Advertised_To_Global_Peers -> 2-Hour Global Service Outage"
  },
  {
    question: "What is Cross-Border Jurisdictional Conflict in Cyberspace law enforcement?",
    shortAnswer: "Occurs when a cyber criminal in Country A hacks a database hosted in Country B using servers in Country C, creating conflicting legal standards, lack of extradition treaties, and slow mutual legal assistance treaty (MLAT) processes.",
    explanation: "Allows cyber criminal syndicates to operate with impunity from jurisdictions that refuse international cooperation.",
    hint: "When hackers, servers, and victims are in different countries, making police prosecution very difficult.",
    level: "moderate",
    codeExample: "JurisdictionConflict = { Victim: 'India', C2_Server: 'Netherlands', HackerLocation: 'Non-Extradition Country' };"
  },
  {
    question: "What is the ultimate golden rule for understanding, navigating, and defending Cyberspace?",
    shortAnswer: "'Cyberspace is a multi-layered, software-defined global fabric comprising Physical, Logical, and Persona layers; defend the physical cables, secure the logical protocols, educate human personas, and budget cyberspace security in Indian Rupees (₹)!'",
    explanation: "This complete rule captures full three-layer architecture, transnational realities, cognitive defense, and financial procurement budgeting.",
    hint: "Defend Physical cables + Secure Logical protocols + Train Persona humans + Budget in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: SecurePhysicalLayer() -> HardenedLogicalLayer() -> EducateCognitivePersona() -> BudgetInRupees(₹);"
  }
];

export default questions;
