// topic9_questions.js
// 30 Moderate to Expert Questions on Cyber Terrorism, CNI Targeting, Mass Panic, IT Act Section 66F, and Anti-Terrorism Governance

const questions = [
  {
    question: "What is Cyber Terrorism and how does it fundamentally differ from Cyber Crime and Cyber Warfare?",
    shortAnswer: "Cyber terrorism is the premeditated, ideologically, politically, or religiously motivated use of cyber attacks against computers, networks, and critical national infrastructure to generate mass fear, physical casualties, or societal chaos to coerce governments; Cyber Crime is driven by financial profit, while Cyber Warfare is conducted by sovereign state militaries.",
    explanation: "Cyber terrorists aim for psychological terror, mass civilian panic, and disruption of life-critical utilities.",
    hint: "Attacks motivated by ideology or politics to create mass panic and terror among civilians.",
    level: "basic",
    codeExample: "ThreatMotivations = { CyberCrime: 'Financial Profit (₹)', CyberWarfare: 'State Geopolitical Objectives', CyberTerrorism: 'Ideological Fear & Mass Panic' };"
  },
  {
    question: "What is Section 66F of the Indian Information Technology Act 2000 regarding Cyber Terrorism?",
    shortAnswer: "Section 66F prescribes Life Imprisonment for anyone who, with intent to threaten the unity, integrity, security, or sovereignty of India or strike terror in the people, denies access to authorized persons, accesses protected computer systems, or introduces computer contaminants causing death or destruction.",
    explanation: "Mandatory non-bailable life imprisonment makes Section 66F the most stringent penal sanction in Indian cyber law.",
    hint: "Indian law punishing cyber terrorism with mandatory Life Imprisonment.",
    level: "basic",
    codeExample: "IT_Act_Sec66F: Offence = 'Cyber Terrorism'; Sanction = 'Life Imprisonment (Non-Bailable)';"
  },
  {
    question: "How do cyber terrorists target Municipal Water Treatment Systems (e.g. Oldsmar incident)?",
    shortAnswer: "Adversaries breach water utility SCADA controllers (often via exposed remote desktop ports) to alter chemical dosing parameters—such as increasing sodium hydroxide (lye) or chlorine from safe levels (100 PPM) to lethal caustic concentrations (11,100 PPM)—to poison city drinking water.",
    explanation: "Defended using physical chemical sensor overrides and automated mechanical shutoff valves in Barrackpore.",
    hint: "Hacking water plants to raise chlorine or lye levels to poison municipal drinking water.",
    level: "expert",
    codeExample: "WaterSafety: if (sodiumHydroxidePPM > 105) physicalMechanicalDumpValve.trigger() [Safety interlock prevents poisoning];"
  },
  {
    question: "What is the cost in Indian Rupees (₹) for a Municipal Water SCADA Multi-Parameter Safety Interlock System?",
    shortAnswer: "Approximately ₹6,50,000 to ₹15,00,000 (including redundant physical chemical sensors, air-gapped PLC logic controllers, and automated dump valves).",
    explanation: "Prevents remote cyber terrorists from altering chemical concentrations in municipal reservoirs in West Bengal in ₹.",
    hint: "Municipal water safety interlock system costs ₹6,50,000 – ₹15,00,000 in Indian Rupees.",
    level: "moderate",
    codeExample: "WaterInterlockBudget = ₹8,50,000; // Multi-Sensor Optical Chemical Telemetry + Hardware Mechanical Interlock"
  },
  {
    question: "What is Mass Panic Generation via Emergency Broadcast System (EBS) Hijacking?",
    shortAnswer: "Adversaries compromise municipal emergency alert sirens or television broadcast encoders to transmit fabricated emergency warnings (e.g. 'Incoming Ballistic Missile Strike' or 'Toxic Radiation Leak In Progress'), triggering fatal stampedes and widespread civilian hysteria.",
    explanation: "Defended by enforcing PKI digital signatures (FIPS 140-2) on all civil defense siren activation radio packets in Kolkata.",
    hint: "Hacking city sirens or TV alert channels to broadcast fake missile or chemical leak warnings.",
    level: "moderate",
    codeExample: "EBS_Defense: SirenController.verifySignature(StateCivilDefense_PublicKey) => if (valid) broadcastAlert();"
  },
  {
    question: "What is the role of the National Critical Information Infrastructure Protection Centre (NCIIPC) in anti-cyber terrorism?",
    shortAnswer: "Created under Section 70A of the IT Act 2000, NCIIPC is the national nodal agency dedicated to safeguarding India's Critical Information Infrastructure across 5 strategic sectors (Power & Energy, Banking & Financial, Telecom, Transport, and Strategic/Nuclear Enterprises).",
    explanation: "Mandates security controls, red-team penetration audits, and threat advisories to prevent cyber terrorist disruption in Ichapur.",
    hint: "India's central agency safeguarding power, nuclear, transport, and banking networks from terror attacks.",
    level: "basic",
    codeExample: "NCIIPC_Sectors = ['Power & Energy', 'Banking & FinTech', 'Telecom', 'Transport & Aviation', 'Strategic & Nuclear'];"
  },
  {
    question: "How do cyber terrorists exploit Air Traffic Control (ATC) and ADS-B vulnerabilities?",
    shortAnswer: "By transmitting spoofed Automatic Dependent Surveillance-Broadcast (ADS-B) radio packets to fabricate 'ghost aircraft' on air traffic radar screens or jamming primary radar frequencies, attempting to induce runway collisions or mid-air flight route deviations.",
    explanation: "Modern aviation enforces Traffic Collision Avoidance System (TCAS) and multi-lateration primary radar correlation in Kolkata.",
    hint: "Transmitting fake radar signals to create ghost airplanes on air traffic controllers' screens.",
    level: "expert",
    codeExample: "ATC_Defense: CrossVerify(ADSB_Packet, PrimaryRadarSkinEcho, MultiLaterationTimestamp) → DropsGhostAircraft"
  },
  {
    question: "What is Terrorist Darknet Financing & Cryptocurrency Tumbling (Monero/Tornado Cash)?",
    shortAnswer: "Extremist organizations solicit donations via privacy-preserving cryptocurrencies (e.g. Monero XMR) or route Bitcoin through automated smart contract mixers (tumblers) to break blockchain transaction links, funding weapons procurement and cyber operations anonymously.",
    explanation: "Law enforcement agencies in Jadavpur deploy AI chain-analytics and KYC cluster tracing to unmask darknet funding nodes.",
    hint: "Using privacy cryptocurrencies and coin mixers to secretly fund terrorist operations.",
    level: "moderate",
    codeExample: "CryptoTracing: ClusterGraphAnalysis(TumbledInputs) → TraceMuleWallets() → IdentifiesCashOutExchange"
  },
  {
    question: "How do cyber terrorists target Nuclear Power Plant Cooling and Safety Systems?",
    shortAnswer: "By targeting distributed control systems (DCS) governing reactor cooling water pumps and emergency core cooling systems (ECCS), attempting to induce coolant loss and reactor core meltdowns.",
    explanation: "Indian nuclear installations enforce physical air-gaps, dedicated private fiber backbones, and analog gravity-drop control rods.",
    hint: "Targeting nuclear cooling pumps; defended by gravity-drop control rods that need no electricity.",
    level: "expert",
    codeExample: "NuclearSafety: GravityDropControlRods() → Failsafe trips automatically upon loss of power (Zero Code Dependency)"
  },
  {
    question: "What is Cyber Radicalization & Online Recruitment across encrypted messaging platforms?",
    shortAnswer: "The strategic use of encrypted social media channels (Telegram, darknet forums, gaming chat servers) using targeted propaganda videos, AI-generated extremist deepfakes, and psychological grooming to recruit lone-wolf operatives for physical or digital terror attacks.",
    explanation: "National intelligence units monitor public darknet recruitment gateways across West Bengal.",
    hint: "Using encrypted chat apps and propaganda videos to brainwash and recruit lone-wolf attackers.",
    level: "basic",
    codeExample: "RadicalizationVector: DarkWebPortal → EncryptedTelegramGroup → PsychologicalGrooming → LoneWolfAttack"
  },
  {
    question: "What is a 'Dirty Bomb' Hoax and Cognitive Cyber Panic warfare?",
    shortAnswer: "Simultaneously hacking municipal air quality monitoring dashboards to display fabricated radiological contamination levels while broadcasting social media bot storms, causing massive city-wide evacuation stampedes without detonating physical explosives.",
    explanation: "Combats cognitive panic by deploying cryptographically signed sensor telemetry and official verified SMS broadcasts in Kolkata.",
    hint: "Hacking radiation sensor dashboards to show fake nuclear leaks, causing city-wide evacuation stampedes.",
    level: "moderate",
    codeExample: "SensorAuthentication: RadiationSensor.signHMAC(SecretKey) → Dashboard verifies authenticity before display."
  },
  {
    question: "How does the Unlawful Activities (Prevention) Act (UAPA) in India intersect with Cyber Terrorism?",
    shortAnswer: "UAPA designates cyber terrorist organizations as banned entities, empowers the National Investigation Agency (NIA) to seize digital server assets and cryptocurrency wallets, and permits prolonged pre-trial detention for digital terror conspiracies.",
    explanation: "Enables joint prosecution under both Section 66F of the IT Act and Section 15 of UAPA across West Bengal.",
    hint: "Indian anti-terror law used alongside IT Act Sec 66F to seize terrorist servers and crypto assets.",
    level: "moderate",
    codeExample: "LegalIntersection: ChargeSheet([IT_Act_Sec66F_CyberTerrorism, UAPA_Sec15_TerroristAct]);"
  },
  {
    question: "How do cyber terrorists target Hospital Intensive Care Unit (ICU) networks?",
    shortAnswer: "By injecting malware into central medical telemetry servers, altering patient vital-sign threshold alarms (e.g. silencing cardiac arrest alarms) or modifying smart infusion pump drug dosages, directly causing patient fatalities.",
    explanation: "Defended via isolated biomedical subnets and physical audible buzzer alarms hardwired to bedside monitors in Ichapur.",
    hint: "Hacking hospital monitors to turn off cardiac alarms or change drug dosages on infusion pumps.",
    level: "expert",
    codeExample: "ICUSafety: BedsideMonitor.hardwiredAudibleBuzzer() [Independent of centralized ethernet network]"
  },
  {
    question: "What is Metropolitan Traffic Gridlock & Smart Traffic Light Cyber Sabotage?",
    shortAnswer: "Hacking municipal centralized traffic management systems (SCATS/SCOOT) to force all intersection traffic lights to solid green in all directions simultaneously, causing multi-vehicle collisions, urban paralysis, and blocking emergency ambulances.",
    explanation: "Enforces hardware conflict-monitor interlocks in traffic controller cabinets in Barrackpore that physically drop intersections to flashing yellow upon detecting dual greens.",
    hint: "Hacking traffic lights to turn all green at once; stopped by mechanical interlocks that force flashing yellow.",
    level: "moderate",
    codeExample: "TrafficInterlock: if (NorthGreen == true && EastGreen == true) HardwareConflictRelay.tripToFlashingYellow();"
  },
  {
    question: "What is Cyber Swarming & Distributed Denial of Infrastructure (DDoI)?",
    shortAnswer: "Coordinated cyber attacks synchronizing multi-terabit volumetric botnet floods against cellular 5G base stations, emergency 112 dispatch servers, and hospital communications during an active physical terrorist bombing to blind first responders.",
    explanation: "Prevents emergency services from coordinating ambulance triage in Kolkata.",
    hint: "Coordinated cyber attacks taking down cell towers and ambulance lines during a physical bomb attack.",
    level: "expert",
    codeExample: "DDoI_Scenario: PhysicalExplosion + Concurrent_5G_Tower_DDoS_Flood → ParalyzesFirstResponders"
  },
  {
    question: "What is Lone-Wolf Cyber Terrorism and why is it difficult to detect?",
    shortAnswer: "A self-radicalized individual operating independently without direct organizational command hierarchies, using open-source exploit frameworks and darknet zero-days to launch destructive attacks against local government or municipal targets.",
    explanation: "Leaves no organizational communication footprint, requiring behavioral anomaly detection on public infrastructure in Jadavpur.",
    hint: "A single radicalized person working alone from their bedroom using downloaded hacking tools.",
    level: "basic",
    codeExample: "LoneWolfProfile: SelfRadicalized → NoOrganizationalHierarchy → LaunchesDisruptiveSCADAAttack"
  },
  {
    question: "How do cyber terrorists target Chemical and Petroleum Refinery Storage Facilities?",
    shortAnswer: "By overriding safety instrumented systems (SIS) (e.g. TRITON/TRISIS malware targeting Schneider Electric Triconex controllers) to disable emergency flare systems and high-pressure relief valves, attempting to trigger catastrophic vapor cloud explosions.",
    explanation: "Defended by enforcing physical mechanical rupture discs and strict SIS network isolation in Barrackpore.",
    hint: "Disabling refinery pressure relief valves using malware to cause chemical plant explosions.",
    level: "expert",
    codeExample: "TRITON_Malware_Target: OverwriteTriconexSafetyLogic() → SuppressEmergencyFlare() → VaporCloudExplosion"
  },
  {
    question: "What is Dark Web Threat Intelligence & Extremist Forum Scraping?",
    shortAnswer: "Automated, anonymized web-scraping agents that ingest chatter, manifesto releases, Bitcoin donation addresses, and target lists from hidden Tor .onion portals, providing early tactical warning of imminent cyber terror operations.",
    explanation: "Alerts state security agencies in Kolkata before terror campaigns are launched.",
    hint: "Monitoring dark web hacker forums to spot planned terrorist attacks before they happen.",
    level: "moderate",
    codeExample: "DarknetScraper: IngestTorForumPosts() → MatchKeywords(['PowerGrid', 'Substation', 'TargetList']) → AlertIntelligence();"
  },
  {
    question: "What is a 'Cyber Sleeper Cell' in digital terrorism networks?",
    shortAnswer: "A dormant network of compromised servers, IoT devices, or malicious insiders placed inside critical government or infrastructure networks years in advance, remaining completely inactive until receiving an encrypted trigger signal during a major geopolitical crisis.",
    explanation: "Requires continuous proactive threat hunting and baseline anomaly analytics in Ichapur.",
    hint: "Dormant malware implants waiting quietly inside government networks for years until triggered.",
    level: "moderate",
    codeExample: "SleeperCell: ImplantedIn2022 → ZeroOutboundBeacons → WokenIn2026ViaSteganographicDNSQuery"
  },
  {
    question: "What is Maritime Port Automation & Container Terminal Sabotage?",
    shortAnswer: "Cyber attacks targeting Automated Stacking Cranes (ASCs) and Terminal Operating Systems (TOS), manipulating cargo container weight telemetry to destabilize cargo container ships or paralyzing fuel and grain import logistics.",
    explanation: "Guarantees that shipping operations across coastal Bengal ports operate with tamper-proof sensor telemetry.",
    hint: "Hacking automated shipping cranes to stop container ships from loading grain and fuel.",
    level: "moderate",
    codeExample: "PortSabotage: AlterContainerWeightTelemetry() → OverloadsPortCrane → ParalyzesContainerBerth"
  },
  {
    question: "What is Cyber-Physical Convergence in critical municipal infrastructure defense?",
    shortAnswer: "The architectural integration of digital cybersecurity telemetry (firewall logs, IDS alerts) with physical security telemetry (CCTV cameras, door access sensors, mechanical pressure gauges, water chemical sensors) into a unified Security Operations Center (SOC).",
    explanation: "Enables municipal operators in Kolkata to detect if a digital PLC alarm corresponds to a physical intruder opening a reservoir valve.",
    hint: "Combining computer firewall logs with real-world security cameras and water pressure gauges.",
    level: "expert",
    codeExample: "CyberPhysicalSOC = SIEM_Logs(Digital) + Physical_CCTV(Visual) + Mechanical_Pressure_Gauges(Analog);"
  },
  {
    question: "How do cyber terrorists utilize Steganography in digital communication?",
    shortAnswer: "The art of concealing secret operational orders, target blueprints, or crypto private keys inside innocuous carrier files (e.g. embedding encrypted text inside innocent JPEG image pixel bytes or audio files) posted on public forums, evading keyword censorship.",
    explanation: "Discovered using statistical chi-square steganalysis tools in Jadavpur forensic laboratories.",
    hint: "Hiding secret terrorist messages inside ordinary digital photos posted on social media.",
    level: "moderate",
    codeExample: "Steganography: SecretMessage --LSB_Insertion--> InnocentDogPhoto.jpg → PostedOnPublicInstagram"
  },
  {
    question: "What is Civil Defense Cyber Preparedness and City-Wide Cyber Drills?",
    shortAnswer: "Regular, multi-agency simulated cyber terror attack exercises involving municipal water boards, power utilities, hospitals, police cyber cells, and telecom providers to test emergency response, backup failovers, and inter-agency coordination under crisis conditions.",
    explanation: "Conducted annually across Kolkata to ensure rapid recovery during simulated grid collapses.",
    hint: "Practice emergency drills where cities test how police, hospitals, and power plants handle a cyber attack.",
    level: "basic",
    codeExample: "CyberDrill_Scenario: 'Simultaneous Power Blackout + Water Telemetry Hijack' → MeasuresRestoreTime"
  },
  {
    question: "What is Aviation Fly-by-Wire Flight Control Cyber Sabotage?",
    shortAnswer: "Adversaries attempt to exploit in-flight entertainment (IFE) passenger systems or maintenance wireless uplinks to pivot into avionics Flight Control Computers (FCC), attempting to override cockpit flight surface controls.",
    explanation: "Civil aviation architectures enforce physical optical data diodes and ARINC 429 bus isolation between passenger IFE and avionics.",
    hint: "Trying to hack an airplane's flight controls through the passenger TV screens; blocked by hardware air-gaps.",
    level: "expert",
    codeExample: "AvionicsIsolation: Passenger_IFE_LAN <--Physical_Optical_Diode-- Avionics_ARINC429_Flight_Bus (Zero Inbound Path)"
  },
  {
    question: "What is Railway Signaling & Positive Train Control (PTC) Cyber Sabotage?",
    shortAnswer: "Adversaries inject unauthorized radio commands into trackside interlocking controllers or wireless cab signaling systems, falsely reporting clear tracks (green signals) on occupied rail lines to induce train collisions.",
    explanation: "Indian Railways enforces Euroradio cryptographic authentication and fail-safe mechanical track relays across West Bengal.",
    hint: "Hacking railway signals to show green on occupied tracks; stopped by fail-safe track relays.",
    level: "expert",
    codeExample: "RailwaySafety: SignalCommand.verifyHMAC(CryptoKey) → TracksideRelay validates track circuit occupancy before green."
  },
  {
    question: "What is Counter-Terrorist Cyber Operations (Offensive Disruption)?",
    shortAnswer: "Authorized intelligence operations that actively penetrate, infiltrate, and dismantle terrorist cyber infrastructure (seizing C2 servers, draining crypto wallets, taking down recruitment websites, and feeding deceptive intelligence to terror leaders).",
    explanation: "Conducted by sovereign national intelligence and defense agencies in India.",
    hint: "Government intelligence agencies hacking into terrorist servers to shut down their websites and seize funds.",
    level: "moderate",
    codeExample: "CounterOperation: Infiltrate_Darknet_Server() → Seize_Admin_DB() → Dismantle_Recruitment_Ring"
  },
  {
    question: "What is the Psychological Terror Dimension of Cyber Attacks on Healthcare?",
    shortAnswer: "Beyond physical equipment damage, shutting down cancer chemotherapy schedulers or neonatal ICU incubators creates profound societal dread, eroding citizen faith in the state’s ability to protect the most vulnerable populations.",
    explanation: "Hospitals in Ichapur deploy air-gapped emergency admission registers to maintain public calm during cyber crises.",
    hint: "Attacking hospital cancer and newborn baby wards to cause public despair and panic.",
    level: "basic",
    codeExample: "HospitalResilience = { EmergencyPaperAdmissions: true, AirGappedICUGenerators: true, 100% ManualFallbacks: true };"
  },
  {
    question: "What is Ransomware Weaponization by Terrorist Groups (Extortion-for-Terror)?",
    shortAnswer: "Extremist groups deploy off-the-shelf ransomware against regional municipal utilities not only to extort cryptocurrency for weapons, but to cause intentional extended municipal downtime and demoralize the civilian population.",
    explanation: "Treated under Section 66F of the IT Act (Cyber Terrorism) rather than standard commercial extortion in Barrackpore.",
    hint: "Terrorists using ransomware to lock municipal utilities to raise money and paralyze city services.",
    level: "moderate",
    codeExample: "TerrorRansomware: LocksCityWaterUtility → Demands₹50Lakh → ChargedUnder(IT_Act_Sec66F_LifeImprisonment)"
  },
  {
    question: "What is the Role of Public-Private Partnerships (PPP) in Countering Cyber Terrorism?",
    shortAnswer: "Collaborative threat intelligence sharing between private cloud providers, critical infrastructure operators, academic research universities (Jadavpur), and national intelligence agencies (NCIIPC/CERT-In) to detect and neutralize emerging terror vectors.",
    explanation: "Ensures comprehensive visibility across private telecom networks and state power grids.",
    hint: "Teamwork between private tech companies, universities, and government agencies to stop cyber terrorism.",
    level: "basic",
    codeExample: "PPP_Framework: Private_Telecoms + State_Power_Grids + CERT_In + Universities = Unified National Defense"
  },
  {
    question: "What is the ultimate golden rule for understanding, detecting, and mitigating Cyber Terrorism?",
    shortAnswer: "'Cyber Terrorism weaponizes digital vulnerabilities to generate mass physical fear and societal chaos; protect critical infrastructure with physical analog interlocks and optical diodes; enforce mandatory Life Imprisonment under Section 66F of the IT Act; and budget anti-terror resilience in Indian Rupees (₹)!'",
    explanation: "This complete rule captures ideological motivations, life-critical infrastructure defense, statutory non-bailable prosecution, and municipal budgeting.",
    hint: "Ideological terror + Physical analog interlocks + Section 66F Life Imprisonment + Budgets in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: ProtectCriticalInfrastructure() → DeployPhysicalAnalogInterlocks() → EnforceSec66F_LifeImprisonment() → BudgetInRupees(₹);"
  }
];

export default questions;
