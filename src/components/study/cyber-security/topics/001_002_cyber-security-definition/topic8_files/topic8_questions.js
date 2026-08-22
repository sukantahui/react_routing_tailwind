// topic8_questions.js
// 30 Moderate to Expert Questions on Cyber Warfare, 5th Domain, Stuxnet, SCADA Sabotage, Tallinn Manual, and Sovereign Defense

const questions = [
  {
    question: "What is Cyber Warfare and why is Cyberspace recognized as the 5th Domain of Warfare?",
    shortAnswer: "Cyber warfare refers to state-sponsored, politically motivated cyber operations conducted to disrupt, damage, or destroy an adversary nation's critical national infrastructure, military command-and-control (C2), or economic systems; recognized alongside Land, Sea, Air, and Space as a distinct military warfare domain where battles are fought at the speed of light.",
    explanation: "Allows nation-states to project power, disable radar networks, and sabotage energy grids without physically crossing sovereign borders.",
    hint: "State-sponsored military attacks on another country's power grids, military radars, and critical infrastructure.",
    level: "basic",
    codeExample: "WarfareDomains = ['Land', 'Sea', 'Air', 'Space', 'Cyberspace (5th Domain of Warfare)'];"
  },
  {
    question: "What was Stuxnet (2010) and why is it considered the first true military-grade cyber weapon in history?",
    shortAnswer: "Stuxnet was a state-sponsored worm specifically engineered to sabotage Iranian Natanz uranium enrichment centrifuges; it utilized 4 distinct zero-day exploits, breached an air-gap via USB, and covertly altered Siemens S7-300 PLC motor rotational speeds while transmitting normal telemetry to human operators, physically destroying 1,000 centrifuges.",
    explanation: "Proved conclusively that software code can cause severe, physical kinetic destruction to industrial machinery.",
    hint: "First military cyber weapon that physically destroyed nuclear centrifuges by manipulating PLC motor speeds.",
    level: "expert",
    codeExample: "Stuxnet_Action: if (PLC == 'Siemens S7-315') overrideFrequency(1410Hz -> 2Hz -> 1064Hz) -> Centrifuge_Destruction;"
  },
  {
    question: "What is the Tallinn Manual and how does it apply International Law to Cyber Warfare?",
    shortAnswer: "The Tallinn Manual is an authoritative, non-binding academic study by international legal scholars analyzing how existing international law (UN Charter, Law of Armed Conflict - LOAC, Geneva Conventions, Jus ad Bellum, and Jus in Bello) applies to cyber operations and state-on-state cyber conflicts.",
    explanation: "Establishes that a cyber attack resulting in catastrophic physical destruction or civilian death constitutes an armed attack justifying military self-defense.",
    hint: "International legal guide defining when a cyber attack counts as an act of war under the Geneva Conventions.",
    level: "expert",
    codeExample: "Tallinn_Rule: if (cyberAttackCausesPhysicalDestructionOrDeath) qualifiesAsArmedAttack(Article51_UN_Charter);"
  },
  {
    question: "What is the cost in Indian Rupees (₹) for a Military-Grade Hardware Optical Data Diode for Critical Infrastructure?",
    shortAnswer: "Approximately ₹8,50,000 to ₹22,00,000 per unit (e.g. Owl Cyber Defense, Advenica) providing physical, unidirectional hardware isolation (using an LED transmitter and photodiode receiver) that allows data to leave SCADA networks while making inbound cyber attacks physically impossible.",
    explanation: "Protects high-voltage power substations and nuclear reactors in West Bengal from remote cyberspace hacking in ₹.",
    hint: "Hardware optical data diode costs ₹8,50,000 – ₹22,00,000 in Indian Rupees.",
    level: "moderate",
    codeExample: "OpticalDataDiode_Cost = ₹12,50,000; // Physical Unidirectional Hardware-Enforced Air-Gap Protection in Kolkata"
  },
  {
    question: "How did the 2015 and 2016 Ukraine Power Grid cyber attacks (BlackEnergy & Industroyer) unfold?",
    shortAnswer: "State-sponsored APT actors breached utility VPNs using stolen credentials, compromised SCADA human-machine interfaces (HMIs), remotely opened 30 substation circuit breakers to cut power to 230,000 civilians, overwrote substation UPS firmware to delay recovery, and flooded call centers with DDoS calls.",
    explanation: "Demonstrated modern cyber warfare tactics targeting civilian power grids during freezing winter conditions.",
    hint: "Russian hackers remotely opened power substation breakers, cutting electricity to 230,000 people in winter.",
    level: "expert",
    codeExample: "Industroyer_Protocol = ['IEC 60870-5-104', 'IEC 61850', 'OPC DA', 'KillDisk Wiper'];"
  },
  {
    question: "What is Hybrid Warfare and Grey Zone Conflict in modern geopolitics?",
    shortAnswer: "A military strategy blending conventional military force, irregular guerrilla tactics, economic coercion, cyber sabotage, and cognitive disinformation campaigns in the 'Grey Zone'—operating just below the legal threshold of formal war to achieve strategic geopolitical objectives.",
    explanation: "Allows nation-states to destabilize rival elections and public confidence without triggering military retaliation.",
    hint: "Combining cyber attacks, fake news, economic sanctions, and covert operations below the threshold of open war.",
    level: "moderate",
    codeExample: "HybridWarfare = CyberSabotage + AI_Disinformation + EconomicCoercion + KineticPressure;"
  },
  {
    question: "What is Cyber Pre-Positioning (Volt Typhoon tactics) in critical national infrastructure?",
    shortAnswer: "State-sponsored actors compromise routers, firewalls, and SCADA controllers within foreign power, water, and port utilities years in advance, establishing dormant backdoor access to execute synchronized physical destruction if a future geopolitical war breaks out.",
    explanation: "Discovered by intelligence agencies inside Western and Asian critical infrastructure networks.",
    hint: "Planting secret dormant malware in another country's power grids years in advance, waiting for wartime.",
    level: "expert",
    codeExample: "PrePositioning: MaintainDormantAccess(Grid_SCADA) -> ZeroActivity -> AwaitActivationSignalInWartime"
  },
  {
    question: "What is NotPetya (2017) and why is it categorized as a destructive Cyber Warfare Wiper?",
    shortAnswer: "NotPetya was masqueraded as ransomware but was actually an irreversible military wiper designed by state actors; it spread globally in minutes via EternalBlue and PsExec through trojanized Ukrainian accounting updates (M.E.Doc), destroying over $10 Billion in shipping, logistics (Maersk), and healthcare data.",
    explanation: "Encrypted disks with an unrecoverable XOR key, making decryption mathematically impossible even if ransom was paid.",
    hint: "A destructive Russian military wiper disguised as ransomware that caused $10 Billion in global damage.",
    level: "moderate",
    codeExample: "NotPetya_Wiper: OverwriteMasterBootRecord(MBR) -> EncryptMFTWithFakeKey() -> ForceReboot() -> TotalDiskDestruction"
  },
  {
    question: "What is the Defence Cyber Agency (DCyA) of India and what is its strategic mandate?",
    shortAnswer: "A specialized tri-service military agency of the Indian Armed Forces (Army, Navy, Air Force) responsible for conducting cyber warfare operations, defending military networks, securing national defense infrastructure, and developing offensive/defensive cyber doctrines.",
    explanation: "Coordinates with CERT-In and NCIIPC to protect India against state-sponsored cyber warfare incursions.",
    hint: "India's joint military command agency for cyber warfare defense across Army, Navy, and Air Force.",
    level: "basic",
    codeExample: "DCyA_Structure = { Branches: ['Indian Army', 'Indian Navy', 'Indian Air Force'], Headquarters: 'New Delhi' };"
  },
  {
    question: "What is a 'Zero-Day Stockpile' in nation-state military cyber arsenals?",
    shortAnswer: "The strategic accumulation of undisclosed, unpatched software vulnerabilities (e.g. zero-click mobile exploits, SCADA protocol bugs) kept secret by military intelligence agencies (like NSA or GRU) for deployment during high-value espionage or wartime operations.",
    explanation: "Creates severe global risk because if the stockpile leaks (as with EternalBlue), criminal gangs use the weapons against civilian hospitals.",
    hint: "Secret collection of unpatched software bugs stockpiled by military spies for wartime attacks.",
    level: "expert",
    codeExample: "StockpileRisk: MilitaryWeapon(EternalBlue) -> LeakedByShadowBrokers -> WeaponizedByWannaCryRansomware"
  },
  {
    question: "What is Jus ad Bellum and Jus in Bello in the context of Cyber Warfare law?",
    shortAnswer: "Jus ad Bellum governs the conditions under which states may legally resort to war or cyber force (e.g. self-defense under Article 51 of the UN Charter); Jus in Bello (International Humanitarian Law) regulates the conduct of warfare, mandating distinction (targeting only military objectives) and proportionality (minimizing civilian harm).",
    explanation: "A cyber attack intentionally taking down civilian hospital power grids is a war crime under Jus in Bello.",
    hint: "Jus ad Bellum is the right to go to war; Jus in Bello is the rule that you cannot attack civilian hospitals.",
    level: "expert",
    codeExample: "IHL_Principles = { Distinction: 'Target military radar only', Proportionality: 'Zero civilian blackout casualties' };"
  },
  {
    question: "How do Optical Data Diodes physically guarantee SCADA network defense against cyber warfare?",
    shortAnswer: "An optical data diode uses a physical single-strand fiber optic cable with a transmitting laser on the SCADA side and a receiving photodiode on the corporate network side; because light can physically travel in only ONE direction, it is mathematically and physically impossible for inbound hacker packets to reach the SCADA network.",
    explanation: "Provides 100% hardware-enforced isolation for thermal power turbines in Barrackpore.",
    hint: "Uses a one-way light beam so data can leave the power plant, but no hacker packets can physically enter.",
    level: "basic",
    codeExample: "DataDiodePhysicalLaw: LaserTransmitter(SCADA_LAN) --LightPulses--> PhotoReceiver(Corporate_LAN) [Zero Return Path]"
  },
  {
    question: "What is an Air-Gap Bridge attack and how was Stuxnet delivered across air-gapped networks?",
    shortAnswer: "Air-gap bridging overcomes physical isolation using physical USB thumb drives infected with LNK exploit malware (e.g. CVE-2010-2568), acoustic sound-wave covert channels, electromagnetic radio emissions (AirHopper), or supply chain firmware tampering.",
    explanation: "Stuxnet infected contractor laptops in Iran, which were then plugged into isolated uranium centrifuge networks.",
    hint: "Using infected employee USB drives or hidden radio signals to jump across air-gapped computers.",
    level: "expert",
    codeExample: "AirGapJump: InfectedUSB -> ExploitsWindowsLNK_ZeroDay -> ExecutesMalwareOnIsolatedCentrifugeWorkstation"
  },
  {
    question: "What is Cyber Collateral Damage and how did WannaCry and NotPetya demonstrate it?",
    shortAnswer: "Unintended harm inflicted on civilian entities, global shipping, and hospitals located thousands of miles outside the intended geopolitical conflict zone due to automated, self-propagating worm exploits traversing public internet connections.",
    explanation: "WannaCry disabled the UK National Health Service (NHS), forcing doctors to cancel thousands of heart and cancer surgeries.",
    hint: "Cyber weapons spreading out of control and shutting down civilian hospitals in neutral countries.",
    level: "moderate",
    codeExample: "CollateralDamage: Target('Ukrainian Utility') -> SelfReplicatingSMBWorm -> Disrupts(UK_Hospitals, US_Ports)"
  },
  {
    question: "What is Electronic Warfare (EW) vs Cyber Warfare and how do they converge in modern military operations?",
    shortAnswer: "Electronic Warfare manipulates the electromagnetic spectrum (radio jamming, radar spoofing, EMPs); Cyber Warfare manipulates the software, data, and protocols inside digital computers; they converge when RF radio signals inject malicious cyber packets directly into military tactical datalinks.",
    explanation: "Allows military aircraft to remotely hack enemy air defense missile batteries from 50 kilometers away.",
    hint: "Electronic warfare jams radio waves; Cyber warfare hacks software code; Cyber-EW hacks computers via radio.",
    level: "expert",
    codeExample: "CyberEW_Convergence: AirbornePod transmits crafted RF waveform -> Injects buffer overflow into radar firmware."
  },
  {
    question: "What is Satellite Uplink Hijacking and Cyber Anti-Satellite (ASAT) warfare?",
    shortAnswer: "Adversaries transmit high-power spoofed radio signals to satellite ground stations, intercepting military telemetry, jamming GPS coordinates for precision-guided missiles, or commanding low-earth-orbit satellites into destructive orbital decays.",
    explanation: "During the 2022 Viasat KA-SAT cyber attack (AcidRain wiper), tens of thousands of satellite terminals across Europe were permanently bricked in minutes.",
    hint: "Hacking satellite ground stations to jam GPS and military communications during wartime.",
    level: "expert",
    codeExample: "AcidRain_Wiper: Overwrites SPI flash memory of satellite modem -> Modem physically bricked permanently."
  },
  {
    question: "What is the role of National Cyber Command (e.g. USCYBERCOM, DCyA) in Active Defense?",
    shortAnswer: "Active Defense involves proactive military operations in foreign cyberspace (Defend Forward / Hunt Forward) to identify, disrupt, and neutralize adversary hacking groups before their cyber attacks reach sovereign domestic networks.",
    explanation: "Cyber operators deploy to allied networks to uncover adversary zero-day tools before they are launched against India.",
    hint: "Proactively hacking into enemy military server infrastructure to shut down their attacks before they launch.",
    level: "moderate",
    codeExample: "ActiveDefense: LocateAdversaryC2Server() -> DisruptBotnetInfrastructure() -> NeutralizeImminentAttack"
  },
  {
    question: "What is Industrial Control Systems (ICS) / SCADA PLC Firmware Tampering?",
    shortAnswer: "Adversaries overwrite the embedded microcode of Programmable Logic Controllers (PLCs) governing water valves, high-voltage transformers, or turbine cooling systems, causing physical over-pressurization, explosions, or equipment burnout.",
    explanation: "Defended using cryptographic firmware signature checks and physical hardware interlocks in Ichapur.",
    hint: "Rewriting factory PLC software to over-pressurize pipes or blow up electrical transformers.",
    level: "expert",
    codeExample: "PLCTampering: if (overpressureSafetyValveTriggered) suppressSafetyAlarm() -> Pipeline_Explosion"
  },
  {
    question: "What is Cognitive Disinformation Warfare in military hybrid campaigns?",
    shortAnswer: "The coordinated deployment of AI deepfakes, bot armies, and hacked government social media accounts during military invasions to broadcast fake surrender messages or fabricate civilian atrocities, paralyzing enemy military command and civilian morale.",
    explanation: "Deepfake videos of national leaders surrendering were broadcast during the opening days of the Ukraine conflict.",
    hint: "Broadcasting AI deepfakes of government leaders surrendering to confuse soldiers and citizens in wartime.",
    level: "basic",
    codeExample: "CognitiveCampaign: BroadcastDeepfakePresidentSurrender() -> HackStateTVFeed -> ErodeMilitaryMorale"
  },
  {
    question: "What is the Principle of Proportionality in Cyber Warfare Rules of Engagement?",
    shortAnswer: "A mandatory rule under International Humanitarian Law stating that the expected civilian collateral damage resulting from a cyber military attack must not be excessive in relation to the concrete and direct military advantage anticipated.",
    explanation: "Disabling an entire city's civilian power grid to stop a single military radar installation is a violation of proportionality.",
    hint: "Military rule stating cyber attacks cannot cause massive civilian harm just to disable a small enemy target.",
    level: "expert",
    codeExample: "ProportionalityTest: if (CivilianCasualtyRisk > MilitaryAdvantage) abortCyberOperation();"
  },
  {
    question: "What is a 'Cyber Act of War' under international customary law?",
    shortAnswer: "A cyber operation whose scale and effects are comparable to a conventional kinetic armed attack—specifically causing physical destruction, critical infrastructure failure, significant economic devastation, or loss of human life.",
    explanation: "Permits the victim nation to respond with full sovereign military self-defense (including kinetic airstrikes) under Article 51 of the UN Charter.",
    hint: "A cyber attack causing explosions, deaths, or grid collapse that legally allows the victim country to shoot back.",
    level: "basic",
    codeExample: "ActOfWarThreshold = { Criteria: 'Physical Destruction OR Loss of Life', Response: 'Article 51 Military Self-Defense' };"
  },
  {
    question: "What is Supply Chain Interdiction in military cyber weapon development?",
    shortAnswer: "Intelligence agencies intercept commercial computer servers or routers during factory-to-consumer shipping transit, secretly solder backdoor microchips onto motherboards, reseal the factory packaging, and deliver the tampered hardware to foreign military targets.",
    explanation: "Revealed in historic intelligence disclosures where hardware routers were secretly backdoored during transit.",
    hint: "Military spies intercepting new computer shipments in transit to solder secret spy chips onto motherboards.",
    level: "expert",
    codeExample: "Interdiction: InterceptRouterInTransit -> SolderHardwareBeacon -> ResealPackaging -> ShipToTarget"
  },
  {
    question: "What is the Difference between Cyber Espionage and Cyber Warfare?",
    shortAnswer: "Cyber Espionage is the stealthy extraction and theft of confidential intelligence or trade secrets with zero intentional destruction (passive); Cyber Warfare involves active, destructive, or disruptive operations that destroy data, disable infrastructure, or kill machinery.",
    explanation: "Espionage steals military submarine blueprints; Cyber warfare disables the submarine's torpedo guidance systems in battle.",
    hint: "Espionage is stealing secrets quietly; Cyber warfare is destroying machines and cutting power grids.",
    level: "basic",
    codeExample: "Espionage_vs_Warfare = { Espionage: 'Steal confidential files (Passive)', Warfare: 'Destroy turbines & black out cities (Destructive)' };"
  },
  {
    question: "How do Nation-States utilize Proxy Hacker Groups and Plausible Deniability in Cyber Warfare?",
    shortAnswer: "Governments contract, shelter, and fund independent criminal ransomware syndicates or patriotic hacker collectives to attack enemy nations; if discovered, the state denies official involvement, avoiding formal military retaliation.",
    explanation: "State intelligence agencies in Eastern Europe shelter ransomware cartels in exchange for sovereign cyber warfare missions.",
    hint: "Hiring criminal gangs to attack enemy countries so the government can pretend 'it wasn't our army'.",
    level: "moderate",
    codeExample: "ProxyWarfare: StateIntelligence --CryptocurrencyGrant--> CriminalRansomwareGang --Attacks--> Enemy_Power_Grid"
  },
  {
    question: "What is Cross-Domain Deterrence in modern national security strategy?",
    shortAnswer: "A defense policy where a nation deters cyber attacks against its critical infrastructure by threatening retaliation across ANY domain—including economic sanctions, diplomatic expulsions, offensive cyber counter-attacks, or kinetic precision missile strikes.",
    explanation: "Communicates clearly to adversaries that crippling India's power grid via cyber warfare will be met with full military force.",
    hint: "Deterring cyber attacks by warning that hacking our power grid might result in missile strikes or economic sanctions.",
    level: "moderate",
    codeExample: "CrossDomainDeterrence: if (adversaryCripplesPowerGridViaCyber) respondWith([OffensiveCyber, EconomicSanctions, KineticStrikes]);"
  },
  {
    question: "What is High-Altitude Electromagnetic Pulse (HEMP) and its catastrophic impact on Cyberspace?",
    shortAnswer: "Detonating a nuclear device in the upper atmosphere (30-400 km altitude) generating a massive electromagnetic pulse (E1, E2, E3 waves) that instantly over-voltages and fries all unshielded microchips, power transformers, and internet routers across an entire subcontinent.",
    explanation: "Critical military command centers in Jadavpur are housed inside Faraday cages to survive HEMP events.",
    hint: "High-altitude nuclear explosion creating a giant magnetic pulse that fries all computer chips in a country.",
    level: "expert",
    codeExample: "HEMP_Protection: MilitaryCommandCenter enclosed in 'Faraday Cage Copper Shielding' + Waveguide Filters."
  },
  {
    question: "What is BGP Anycast and Satellite Fallback for sovereign military communication resilience?",
    shortAnswer: "Military command networks utilize multi-homed BGP Anycast routing paired with jam-resistant military satellite constellations (e.g. GSAT-7A); if adversary cyber warfare units sever terrestrial fiber cables, traffic autonomously fails over to space satellite uplinks in &lt; 200ms.",
    explanation: "Guarantees Indian Armed Forces maintain uninterrupted communications during hybrid conflict in West Bengal.",
    hint: "Automatic switching to military space satellites if hackers cut terrestrial internet cables during war.",
    level: "moderate",
    codeExample: "MilitaryResilience: TerrestrialFiberCut -> BGP_Failover_To_GSAT7_Space_Uplink(Latency < 180ms) -> CommandPreserved"
  },
  {
    question: "What is Threat Attribution in Cyber Warfare and why does it require multi-source intelligence (SIGINT + HUMINT + GEOINT)?",
    shortAnswer: "Technical code artifacts (IoCs) can be faked with false flags; nation-states combine digital network signals intelligence (SIGINT), human spy reports (HUMINT), and satellite imagery (GEOINT) to achieve high-confidence legal attribution before launching military counter-attacks.",
    explanation: "Ensures national defense forces do not launch kinetic strikes against the wrong country due to an adversary false flag in Kolkata.",
    hint: "Combining computer logs with human spy reports and satellite photos to be 100% sure who attacked.",
    level: "expert",
    codeExample: "AllSourceAttribution = SIGINT(NetworkTelemetry) + HUMINT(SpiesInsideAPT) + GEOINT(BuildingSatPhotos);"
  },
  {
    question: "What is Critical Infrastructure Air-Gapping & SCADA Hardware Interlock Defense?",
    shortAnswer: "Physical mechanical switches and analog governors (e.g. pressure relief valves, physical clutch disconnects) that physically prevent machines from exceeding safety thresholds even if malicious PLC software commands 1000% speed increases.",
    explanation: "Guarantees that even if an advanced Stuxnet-style malware takes over the turbine software, physical mechanical springs prevent destruction.",
    hint: "Mechanical valves and physical brakes that stop a machine from blowing up even if the computer is hacked.",
    level: "moderate",
    codeExample: "MechanicalInterlock: if (TurbineSpeed > 1200_RPM) PhysicalMechanicalSpringTripsBreaker() [Pure physics, no code!]"
  },
  {
    question: "What is the ultimate golden rule for understanding, evaluating, and defending against Cyber Warfare?",
    shortAnswer: "'Recognize Cyberspace as the 5th Domain of Warfare governed by the Tallinn Manual; isolate critical SCADA power grids with optical data diodes and mechanical interlocks; enforce cross-domain deterrence; and budget sovereign defense architectures in Indian Rupees (₹)!'",
    explanation: "This complete rule captures military domain doctrine, international legal constraints, physical hardware isolation, deterrence strategy, and sovereign budgeting.",
    hint: "5th Domain + Tallinn Manual + Optical Data Diodes + Mechanical Interlocks + Sovereign Budgets in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: Master5thWarfareDomain() -> EnforceTallinnManual() -> DeployOpticalDataDiodes() -> BudgetInRupees(₹);"
  }
];

export default questions;
