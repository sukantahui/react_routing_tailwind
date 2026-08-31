// topic26_questions.js
// 30 Moderate to Expert Questions on Transmission Media in Computer Networking and Cyber Security

const questions = [
  {
    question: "What is Transmission Media in computer networking?",
    shortAnswer: "Transmission Media is the physical pathway (guided / wired) or atmospheric electromagnetic channel (unguided / wireless) that transports data signals between transmitting and receiving devices across OSI Layer 1.",
    explanation: "Transmission media form the physical foundation of all network communications, governing maximum bandwidth, latency, signal attenuation, and susceptibility to electromagnetic interference.",
    hint: "The physical wire or wireless channel carrying signals from sender to receiver.",
    level: "moderate",
    codeExample: "Media = { Guided: ['Twisted-Pair', 'Coaxial', 'Optical-Fiber'], Unguided: ['Radio-Waves', 'Microwaves', 'Infrared'] };"
  },
  {
    question: "What are the two broad classifications of transmission media?",
    shortAnswer: "1. Guided (Bounded / Wired) Media (signals are physically confined within a solid medium like copper or glass) and 2. Unguided (Unbounded / Wireless) Media (electromagnetic waves propagate freely through air, water, or vacuum).",
    explanation: "Guided media provide secure, high-bandwidth channels; unguided media deliver mobile flexibility across open environments.",
    hint: "Guided (wires/cables) and Unguided (wireless radio waves).",
    level: "basic",
    codeExample: "Classification = { Guided: 'Physical conductor/glass core', Unguided: 'Open air/free space RF' };"
  },
  {
    question: "Why are copper wire pairs tightly twisted around each other in UTP/STP cables?",
    shortAnswer: "Twisting pairs together cancels out electromagnetic interference (EMI) from external sources and eliminates Near-End Crosstalk (NEXT) between adjacent wire pairs via differential signaling.",
    explanation: "Because both wires experience identical external noise, the receiving differential amplifier subtracts the noise voltage, leaving only the clean original signal.",
    hint: "Twisting cancels external noise and crosstalk between adjacent wire pairs.",
    level: "expert",
    codeExample: "DifferentialSignaling: ReceivedSignal = (Signal + Noise) - (-Signal + Noise) = 2 * Signal;"
  },
  {
    question: "What is the maximum certified transmission distance for Category 6 (Cat6) Ethernet copper cables?",
    shortAnswer: "100 meters total per channel (90 meters of solid in-wall permanent link + 10 meters of flexible stranded patch cords combined).",
    explanation: "Beyond 100 meters, signal attenuation and high-frequency insertion loss cause packet corruption and dropped frames without an intermediate repeater or switch.",
    hint: "Strict 100-meter total channel limit for standard copper ethernet.",
    level: "moderate",
    codeExample: "MaxChannelDistance = 90m_SolidPermanentCable + 10m_PatchCords = 100m;"
  },
  {
    question: "How does Single-Mode Optical Fiber (SMF) differ from Multi-Mode Optical Fiber (MMF)?",
    shortAnswer: "Single-Mode Fiber has a tiny core (~9 µm) using laser light for long distances (40–80+ km) with zero modal dispersion; Multi-Mode Fiber has a larger core (50 µm / OM4) using LED/VCSEL light for short campus links (300–500m).",
    explanation: "Single-mode fiber permits only one light ray path, eliminating modal dispersion and supporting 100Gbps+ metropolitan WAN links across Kolkata and Barrackpore.",
    hint: "Single-mode: tiny 9µm core, laser, long distance; Multi-mode: 50µm core, LED, short campus runs.",
    level: "expert",
    codeExample: "SMF = { Core: '9um', LightSource: 'Laser (1310/1550nm)', MaxDist: '40-80km' }; MMF = { Core: '50um', LightSource: 'VCSEL (850nm)', MaxDist: '550m' };"
  },
  {
    question: "What optical physics principle enables light to travel through optical fiber cables without escaping?",
    shortAnswer: "Total Internal Reflection (TIR), which occurs when light travelling in a higher refractive index core hits the boundary of a lower refractive index cladding at an angle greater than the Critical Angle.",
    explanation: "Because the glass core has a refractive index $n_1$ higher than the cladding $n_2$, light pulses reflect completely back into the core, guiding data with minimal optical loss.",
    hint: "Total Internal Reflection (TIR) when light hits the cladding boundary above the critical angle.",
    level: "expert",
    codeExample: "ConditionForTIR = (CoreRefractiveIndex_n1 > CladdingRefractiveIndex_n2) && (IncidentAngle > CriticalAngle);"
  },
  {
    question: "What is the function of the outer braided copper mesh shield in Coaxial Cables (RG-6 / RG-59)?",
    shortAnswer: "The braided metallic shield acts as a continuous ground barrier that prevents electromagnetic interference (EMI), radio frequency interference (RFI), and external noise from penetrating the central copper signal core.",
    explanation: "Coaxial cabling was standard in early Ethernet (10Base2/10Base5) and remains the standard for broadband DOCSIS cable internet and CCTV video feeds.",
    hint: "Acts as a metallic shield blocking electrical noise from corrupting the center conductor.",
    level: "moderate",
    codeExample: "CoaxAnatomy = [CenterCopperCore, DielectricInsulator, BraidedMetallicShield, OuterJacket];"
  },
  {
    question: "What are the common color codes defined by TIA/EIA-568B for terminating RJ-45 Ethernet connectors?",
    shortAnswer: "Pin 1: White-Orange, Pin 2: Orange, Pin 3: White-Green, Pin 4: Blue, Pin 5: White-Blue, Pin 6: Green, Pin 7: White-Brown, Pin 8: Brown.",
    explanation: "TIA/EIA-568B is the universal standard wiring sequence used across India and global enterprise networks for terminating Cat6 copper cables.",
    hint: "White-Orange, Orange, White-Green, Blue, White-Blue, Green, White-Brown, Brown.",
    level: "moderate",
    codeExample: "TIA568B = ['W-Orange', 'Orange', 'W-Green', 'Blue', 'W-Blue', 'Green', 'W-Brown', 'Brown'];"
  },
  {
    question: "What is Signal Attenuation and how is it measured in transmission media?",
    shortAnswer: "Signal Attenuation is the loss of electrical voltage, optical power, or radio wave strength as a signal propagates over distance, measured logarithmically in Decibels (dB).",
    explanation: "As cables grow longer, natural resistance, dielectric absorption, and scattering weaken the signal, requiring repeaters or amplifiers to restore waveform integrity.",
    hint: "Loss of signal strength over distance measured in Decibels (dB).",
    level: "moderate",
    codeExample: "Attenuation_dB = 10 * Math.log10(Power_Transmitted / Power_Received);"
  },
  {
    question: "Why is Optical Fiber completely immune to Electromagnetic Interference (EMI) and lightning surges?",
    shortAnswer: "Because optical fiber transmits non-conductive light photons through dielectric glass rather than conducting electrical electrons through metal, eliminating electromagnetic coupling and electrical ground loops.",
    explanation: "Optical fiber can run directly alongside high-voltage factory machinery or outdoor telephone poles in Barrackpore without picking up motor noise or lightning damage.",
    hint: "Transmits light pulses through glass, not electrical currents through metal.",
    level: "moderate",
    codeExample: "FiberEMISusceptibility = 0; // Immune to lightning, radio noise, and power lines"
  },
  {
    question: "Suppose Debangshu in Barrackpore needs to connect two factory buildings separated by 600 meters. Which transmission media should he deploy and why?",
    shortAnswer: "Single-Mode or Multi-Mode OM4 Optical Fiber; copper Cat6 cannot exceed 100 meters without active repeaters, and outdoor copper is vulnerable to lightning strikes and industrial EMI.",
    explanation: "Running outdoor armored fiber in conduit provides 10Gbps bandwidth across the 600m gap with complete galvanic isolation between building electrical grounds.",
    hint: "600m exceeds the 100m copper limit; fiber optics is the only reliable choice.",
    level: "moderate",
    codeExample: "BuildingInterconnect = { Media: 'Armored 10G OM4 Multi-Mode Fiber', Distance: '600m', Cost: '₹45,000' };"
  },
  {
    question: "What is the typical cost per 305-meter (1000 ft) box of certified Category 6 UTP cable in Indian Rupees (₹)?",
    shortAnswer: "A certified 305-meter roll of pure copper Cat6 UTP cable (e.g., D-Link, Schneider, CommScope) costs approximately ₹9,000 to ₹14,000 in West Bengal markets.",
    explanation: "Budgeting for structured cabling accounts for 100% solid bare copper conductors (avoiding cheap copper-clad aluminum / CCA which fails PoE certification) in ₹.",
    hint: "Certified 305m pure copper Cat6 roll costs ₹9,000 – ₹14,000.",
    level: "moderate",
    codeExample: "Cat6Roll_305m = ₹11,500; // Pure Solid Copper 23AWG"
  },
  {
    question: "What is Near-End Crosstalk (NEXT) in twisted-pair copper cabling?",
    shortAnswer: "NEXT is unwanted electromagnetic signal coupling from an active transmitting pair leaking into an adjacent receiving pair at the same (near) end of the cable where signal amplitude is strongest.",
    explanation: "Cable certifiers measure NEXT in dB; tighter twist ratios and internal plastic spline separators in Cat6 reduce NEXT to support higher frequencies (250MHz).",
    hint: "Interference leaking from a transmit wire into an adjacent receive wire at the connector.",
    level: "expert",
    codeExample: "NEXT_dB = 10 * Math.log10(Power_Transmitted / Power_Coupled_To_Adjacent_Pair);"
  },
  {
    question: "What are the common optical fiber connector types used in enterprise networks?",
    shortAnswer: "1. LC (Lucent Connector - small snap-in for SFP+ transceivers), 2. SC (Subscriber Connector - push-pull square), 3. ST (Straight Tip - twist-lock bayonet), and 4. MPO/MTP (Multi-fiber push-on for 40G/100G 12-fiber trunks).",
    explanation: "LC connectors are the universal standard in modern server racks and switches due to their compact form factor allowing double the port density of SC connectors.",
    hint: "LC (small snap-in), SC (square push-pull), ST (round bayonet), MPO (multi-fiber).",
    level: "moderate",
    codeExample: "FiberConnectors = ['LC (Small SFP+)', 'SC (Square)', 'ST (Bayonet)', 'MPO (12-Fiber Trunk)'];"
  },
  {
    question: "What is the physical frequency band used by modern Wi-Fi 6E and Wi-Fi 7 wireless networks?",
    shortAnswer: "The 6 GHz unlicensed radio frequency band (5.925 GHz to 7.125 GHz), providing up to 1,200 MHz of clean spectrum and fourteen 80MHz or seven 160MHz wide channels without legacy interference.",
    explanation: "Opening the 6GHz spectrum eliminates legacy Wi-Fi contention, enabling ultra-low latency and multi-gigabit wireless throughput across campus networks in Jadavpur.",
    hint: "6 GHz band (in addition to legacy 2.4 GHz and 5 GHz).",
    level: "expert",
    codeExample: "WiFiBands = ['2.4GHz (Long Range)', '5GHz (High Speed)', '6GHz (Ultra-Wide Clean Spectrum)'];"
  },
  {
    question: "What is Dispersion in optical fiber cables and what are its two primary types?",
    shortAnswer: "Dispersion is the spreading of light pulses as they travel along the fiber, causing overlapping pulses (Inter-Symbol Interference - ISI). The two primary types are Modal Dispersion (multi-path in MMF) and Chromatic Dispersion (wavelength speed variation).",
    explanation: "Single-mode fiber eliminates modal dispersion completely because light travels in only a single axial path, enabling multi-terabit long-haul transmission.",
    hint: "Pulse spreading over distance: Modal dispersion (MMF) and Chromatic dispersion (wavelength differences).",
    level: "expert",
    codeExample: "DispersionTypes = { Modal: 'Different light ray bounce angles in MMF', Chromatic: 'Different light colors travel at different speeds' };"
  },
  {
    question: "How can attackers physically wiretap copper Ethernet cables vs Optical Fiber cables?",
    shortAnswer: "Copper can be tapped non-invasively using inductive pickup clamps that detect electromagnetic radiation leakage without cutting the wire; Optical Fiber requires physical macro-bending to leak light onto photosensors or splicing, which introduces measurable optical power drop (dB).",
    explanation: "Optical Fiber Intrusion Detection Systems (OFIDS) detect minute optical power fluctuations in real time, making unauthorized physical fiber taps instantly detectable.",
    hint: "Copper leaks electrical radiation easily; Fiber requires macro-bending that triggers optical alarms.",
    level: "expert",
    codeExample: "if (opticalPowerMonitor.detectsDrop(threshold_dB = 0.5)) ofids.triggerPhysicalTamperAlert();"
  },
  {
    question: "What is the difference between UTP (Unshielded Twisted Pair) and STP / S-FTP (Shielded Twisted Pair)?",
    shortAnswer: "UTP has no metallic foil shielding around pairs; STP / S-FTP incorporates individual aluminum foil wraps around each pair plus an outer braided metallic mesh to protect against severe industrial electromagnetic noise.",
    explanation: "STP cabling is deployed in heavy industrial machinery plants across Barrackpore and Ichapur to prevent motor VFD noise from corrupting Ethernet packets.",
    hint: "STP adds foil and braided metal shielding around wire pairs for extreme noise protection.",
    level: "moderate",
    codeExample: "UTP = [TwistedPairs, OuterJacket]; SFTP = [TwistedPairs, IndividualFoilShield, BraidedOuterShield, Jacket];"
  },
  {
    question: "What is Microwave Transmission and what is its primary operational constraint?",
    shortAnswer: "Microwave is high-frequency line-of-sight wireless transmission (1 GHz to 300 GHz) between directional parabolic dish antennas; its primary constraint is requiring an unobstructed direct Line of Sight (LOS) and vulnerability to rain fade.",
    explanation: "Telecom towers across Kolkata use microwave dishes to bridge cellular backhaul traffic where trenching optical fiber across highways is cost-prohibitive.",
    hint: "Requires strict unobstructed Line-of-Sight between tower dish antennas.",
    level: "moderate",
    codeExample: "MicrowaveLink = { RequiresLineOfSight: true, MaxTowerDistance: '50km', Vulnerability: 'Heavy Monsoon Rain Fade' };"
  },
  {
    question: "What is Infrared (IR) wireless transmission and why is it used for high-security short-range communication?",
    shortAnswer: "Infrared uses light waves (300 GHz to 400 THz) that cannot penetrate solid walls, preventing unauthorized eavesdropping outside the physical room and providing natural physical layer cybersecurity.",
    explanation: "Because IR signals are strictly confined inside meeting rooms, conference data cannot leak across building windows or into adjacent offices.",
    hint: "Light waves that cannot penetrate walls, keeping signals locked inside the room.",
    level: "moderate",
    codeExample: "IR_Security: if (signalHitsSolidWall) signal.reflectsOrAbsorbs() && doesNotLeakOutside();"
  },
  {
    question: "What is an OTDR (Optical Time-Domain Reflectometer) used for in fiber optic maintenance?",
    shortAnswer: "An OTDR is a precision test instrument that injects high-speed laser pulses into an optical fiber and analyzes backscattered light to map fiber length, splice loss, connector reflectance, and pinpoint exact break locations in meters.",
    explanation: "If a metro fiber cable is severed during road construction near Barrackpore, the OTDR pinpoints the break at '3,412.5 meters from central office' in seconds.",
    hint: "Special tool that shoots laser pulses to pinpoint the exact meter where a fiber cable is cut.",
    level: "expert",
    codeExample: "otdr.traceFiber(fiberPort) => { TotalLength: '12,450m', SpliceLoss: '0.04dB', BreakAt: '3,412.5m' };"
  },
  {
    question: "What is Power over Ethernet (PoE) and which copper cable categories are certified for 90W PoE++ (IEEE 802.3bt)?",
    shortAnswer: "PoE delivers DC electrical power alongside data over twisted-pair copper; Category 6 and Category 6a cables with pure 23AWG solid copper conductors are certified for 90W PoE++.",
    explanation: "High-power PoE++ generates internal heat within cable bundles; pure copper 23AWG Cat6a dissipates heat safely without exceeding thermal attenuation limits.",
    hint: "Pure solid copper Cat6/Cat6a 23AWG cables handle 90W PoE++ safely.",
    level: "expert",
    codeExample: "PoE_Standards = { '802.3af': '15.4W', '802.3at (PoE+)': '30W', '802.3bt (PoE++)': '90W' };"
  },
  {
    question: "Why should Copper-Clad Aluminum (CCA) cables NEVER be installed for enterprise structured cabling?",
    shortAnswer: "CCA uses aluminum conductors coated with a thin copper layer; aluminum has higher electrical resistance (causing dangerous overheating under PoE), brittle fatigue leading to conductor breakage, and fails TIA/EIA link certification.",
    explanation: "Deploying cheap CCA cables in Kolkata risks building fire hazards under high PoE loads and causes chronic packet loss from oxidized conductor terminations.",
    hint: "Cheap aluminum cores overheat under PoE, snap easily, and cause severe packet drops.",
    level: "expert",
    codeExample: "CCA_Risks = ['High DC Resistance', 'Fire Hazard under PoE', 'Brittle Conductor Snapping', 'Fails TIA-568'];"
  },
  {
    question: "What is Terrestrial Satellite Transmission (LEO vs GEO) in modern WAN networking?",
    shortAnswer: "GEO satellites orbit at 35,786 km with high latency (~600ms RTT); Low Earth Orbit (LEO) constellations (e.g., Starlink, OneWeb) orbit at 500–1,200 km, delivering high-speed 100Mbps+ broadband with low latency (25–40ms) to remote areas.",
    explanation: "LEO satellite broadband connects remote research outposts and disaster management stations across West Bengal where fiber infrastructure is unavailable.",
    hint: "GEO is high orbit with 600ms latency; LEO is low orbit with 30ms latency.",
    level: "moderate",
    codeExample: "SatelliteLatency = { GEO: '600ms RTT', LEO_Starlink: '30ms RTT' };"
  },
  {
    question: "What is Plenum-Rated (CMP) vs Riser-Rated (CMR) cable jacketing in building safety codes?",
    shortAnswer: "Plenum (CMP) cables have low-smoke, fire-retardant Teflon jackets designed for air handling ducts (plenums) that do not emit toxic fumes when burned; Riser (CMR) cables are fire-resistant for vertical shafts between floors.",
    explanation: "National Building Codes require plenum-rated cabling in drop ceiling spaces to prevent fire from spreading toxic hydrogen cyanide fumes through HVAC air ducts.",
    hint: "Plenum (CMP) for ceiling air ducts (low toxic smoke); Riser (CMR) for vertical floor shafts.",
    level: "expert",
    codeExample: "CableJacketRatings = { CMP: 'Plenum Fire-Retardant (Ceiling Ducts)', CMR: 'Riser Vertical Shafts', CM: 'General Office Run' };"
  },
  {
    question: "What is Shannon’s Theorem for Maximum Channel Capacity in transmission media?",
    shortAnswer: "Shannon's formula ($C = B \\log_2(1 + S/N)$) defines the theoretical maximum error-free data rate (Capacity $C$ in bps) of a transmission channel based on its Bandwidth ($B$ in Hz) and Signal-to-Noise Ratio ($S/N$).",
    explanation: "Shannon capacity demonstrates that increasing signal power or frequency bandwidth directly increases maximum achievable data rate across copper, fiber, or wireless channels.",
    hint: "C = B * log2(1 + SNR) calculates the maximum possible data rate of any physical channel.",
    level: "expert",
    codeExample: "function shannonCapacity(bandwidthHz, snrRatio) { return bandwidthHz * Math.log2(1 + snrRatio); }"
  },
  {
    question: "What is an SFP+ Direct Attach Copper (DAC) Twinax Cable and when is it preferred over fiber?",
    shortAnswer: "A high-speed twinaxial copper cable with integrated SFP+ transceivers on both ends (1–5 meters) used for short-range Top-of-Rack server-to-switch interconnects in data centers.",
    explanation: "DAC twinax cables cost only ₹1,500 – ₹3,000 (saving 70% compared to optical transceivers + fiber patch cords) and consume under 0.1W of power with near-zero latency.",
    hint: "Short copper cable with built-in SFP+ plugs for connecting servers to top-of-rack switches.",
    level: "expert",
    codeExample: "DAC_Twinax = { Length: '2m', Bandwidth: '10Gbps/25Gbps', Power: '<0.1W', Cost: '₹2,200' };"
  },
  {
    question: "How does Bandwidth differ fundamentally from Latency in transmission media?",
    shortAnswer: "Bandwidth is the maximum data carrying capacity or volume of the medium (measured in bps/Gbps); Latency is the time delay taken for a single bit of data to travel from transmitter to receiver (measured in milliseconds).",
    explanation: "Think of bandwidth as the width of a water pipe, while latency is the speed at which the water flows from one end of the pipe to the other.",
    hint: "Bandwidth is pipeline width (Gbps); Latency is travel time delay (ms).",
    level: "basic",
    codeExample: "Bandwidth = '10Gbps (Volume capacity)'; Latency = '1.2ms (Propagation delay)';"
  },
  {
    question: "What is Alien Crosstalk (ANEXT) in 10-Gigabit copper networks (Cat6a)?",
    shortAnswer: "ANEXT is electromagnetic noise coupled from adjacent cables bundled together in the same raceway or conduit rather than between pairs inside the same cable jacket.",
    explanation: "Cat6a features thicker outer diameters and foil shielding to maintain physical separation between bundled cables, suppressing Alien Crosstalk to guarantee 10Gbps at 100 meters.",
    hint: "Interference leaking between different cables bundled tightly together in a tray.",
    level: "expert",
    codeExample: "ANEXT_Defense = 'Cat6a thicker spline & foil shielding prevents noise between bundled cables';"
  },
  {
    question: "What is the ultimate golden rule for selecting and deploying Transmission Media in enterprise networking?",
    shortAnswer: "'Deploy 100% solid copper Cat6/Cat6a for horizontal desktop runs up to 100m; run Single-Mode OS2 or Multi-Mode OM4 Optical Fiber for inter-building and backbone backhauls; enforce plenum ratings for fire safety; and budget all cabling infrastructure in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all foundational principles of physical layer transmission engineering, high-bandwidth scaling, building safety compliance, and cost budgeting.",
    hint: "Solid Cat6 for desks + Fiber for backbones + Plenum for fire safety + Budgets in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: DeploySolidCat6() → InstallFiberBackbone() → EnforcePlenumSafety() → BudgetInRupees(₹);"
  }
];

export default questions;
