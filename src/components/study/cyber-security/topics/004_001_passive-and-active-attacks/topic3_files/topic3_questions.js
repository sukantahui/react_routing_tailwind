const questions = [
  {
    question: "Why is the detection of Passive Cyber Attacks fundamentally asymmetric compared to Active Attacks?",
    shortAnswer: "Passive attacks involve zero data modification, zero packet transmission, and zero system state changes, producing zero log events on standard routers, firewalls, and operating systems.",
    explanation: "Active attacks generate loud digital anomalies: failed login spikes, crash dumps, checksum errors, or high CPU utilization that trigger SIEM and IDS alerts. Passive attacks (such as fiber tapping or promiscuous sniffing) only read passing electrons or photons without transmitting anything back into the channel, leaving intermediate devices completely unaware of the surveillance.",
    hint: "You can easily hear someone breaking a window (active), but you cannot hear someone quietly reading a letter (passive).",
    level: "basic",
    codeExample: `// Digital Footprint Comparison:
// Active Attack  ➔ TCP RST Injection: Generates 504 Gateway Timeout + Firewall Alert Log
// Passive Attack ➔ Promiscuous Sniffing: Generates 0 logs, 0 packet drops, 0 latency change`
  },
  {
    question: "What is the 'Prevention Paradox' associated with Passive Cyber Attacks?",
    shortAnswer: "Because passive attacks cannot be reliably detected in real time on standard networks, defensive security must focus 100% on proactive prevention (end-to-end encryption and traffic padding).",
    explanation: "In traditional incident response, teams rely on 'Detect -> Contain -> Remediate'. With passive attacks, detection fails because the attacker leaves no forensic evidence. Security architects must therefore assume that every wire and radio frequency is hostile and continuously monitored, enforcing robust cryptography (AES-256-GCM, TLS 1.3, MACsec) so intercepted ciphertext is mathematically worthless.",
    hint: "Assume the tap is already on the wire: make the data completely unreadable before sending it.",
    level: "moderate",
    codeExample: `// The Defense Philosophy:
// Detection-Centric (Fails for Passive) : Wait for alarm ➔ Investigate ➔ Block
// Prevention-Centric (Mandatory for Passive): Assume 100% intercepted ➔ Encrypt with TLS 1.3 + AEAD`
  },
  {
    question: "How do Canary Tokens (Honeytokens) enable the detection of passive eavesdroppers?",
    shortAnswer: "By deliberately placing unique, fake credentials or decoy URLs into unencrypted data streams; when an eavesdropper attempts to use the token, an immediate alert is triggered.",
    explanation: "Because an eavesdropper cannot be detected while silently copying data, security teams insert unique fake credentials (e.g. `DB_PASS=canary_user_99812_kolkata` or a unique AWS canary API key) into simulated internal traffic. If that key is ever used on a login portal, the canary backend alerts the SOC immediately, proving that passive sniffing occurred on that network segment.",
    hint: "Leaving marked banknotes on the table: you only catch the thief when they try to spend the marked cash.",
    level: "expert",
    codeExample: `// Canary Token Architecture:
// 1. Plant Decoy: DB_ADMIN_URL="https://canarytokens.com/feedback/tags/auth_8912"
// 2. Sniffer captures URL from plaintext LAN
// 3. Sniffer clicks URL in browser ➔ Canary Server alerts SOC with Sniffer's Source IP!`
  },
  {
    question: "How does the ARP Request Latency Test remotely detect a NIC running in Promiscuous Mode?",
    shortAnswer: "A host running a sniffer in promiscuous mode experiences slight CPU processing overhead when filtering non-matching broadcast frames, creating a measurable millisecond response delay.",
    explanation: "When thousands of bogus broadcast ARP frames are sent across a subnet, normal hosts discard them immediately in hardware (NIC ASIC). A host in promiscuous mode must pass all frames to the kernel/libpcap, increasing CPU load. By comparing ping or ARP response time deltas between normal states and flooded states, specialized tools identify sniffing machines.",
    hint: "Flooding the room with junk mail: the person reading everything gets slowed down, while others throw it away instantly.",
    level: "expert",
    codeExample: `// Promiscuous Detection via Microsecond RTT:
// Target in Normal Mode      : Ping RTT = 0.42 ms during broadcast flood
// Target in Promiscuous Mode : Ping RTT = 4.85 ms (Kernel bogged down filtering libpcap buffers)`
  },
  {
    question: "What is Fake Unicast MAC Addressing, and how does it catch passive sniffers?",
    shortAnswer: "Sending an ARP or ICMP packet with the victim's correct IP address but a bogus destination MAC address (e.g. FF:FF:FF:FF:FF:FE); only promiscuous NICs accept and process it.",
    explanation: "Under standard operating conditions, a NIC checks the Ethernet frame header: if destination MAC != Host MAC (and not broadcast FF:FF:FF:FF:FF:FF), the hardware ASIC drops it instantly. A promiscuous NIC accepts the frame, passes it to the OS kernel, and the OS IP stack sees its own IP address and replies, exposing that its hardware filter was turned off.",
    hint: "Sending a letter with a fake street address but the real recipient name: only someone reading all neighborhood mail opens it.",
    level: "expert",
    codeExample: `// Fake Unicast Promiscuous Test Packet:
// Ethernet Header: Dst MAC = 00:00:00:00:00:01 (Bogus, not Broadcast)
// IP Header      : Dst IP  = 192.168.1.50 (Victim IP)
// Standard Host  : Dropped in NIC hardware (No reply)
// Promiscuous NIC: Accepted by libpcap ➔ OS IP stack replies with ICMP Echo Reply!`
  },
  {
    question: "Why do standard Optical Power Meters (OPM) fail to detect micro-optical fiber taps?",
    shortAnswer: "Because microbending taps extract only 0.1 to 0.25 dB of optical power, which falls within the normal baseline variance of temperature changes and dirty patch panel connectors.",
    explanation: "Standard single-mode fiber links operate with a power budget margin of ±1.5 dB to accommodate laser aging and connector contamination. When an adversary installs a precision macrobending coupler that extracts only 2% of photons (-0.22 dB attenuation), the total optical power remains well above the receiver's sensitivity threshold, generating no hardware alarms.",
    hint: "Stealing a single drop of water from a fire hose: the water pressure gauge shows no noticeable change.",
    level: "moderate",
    codeExample: `// Optical Power Budget Calculation:
// Transmitter Power: 0.0 dBm
// Cable Attenuation : -3.5 dB (15 km @ 0.22 dB/km)
// Connector Loss    : -0.8 dB (4 patch panels)
// Macrobend Tap Loss: -0.22 dB
// Received Power    : -4.52 dBm (Receiver threshold is -18.0 dBm -> Link stays 100% UP!)`
  },
  {
    question: "How does Continuous High-Resolution Optical Time-Domain Reflectometry (C-OTDR) overcome standard OPM limitations?",
    shortAnswer: "C-OTDR continuously injects high-frequency light pulses during live data transmission, detecting localized Rayleigh backscatter variations as small as 0.05 dB at specific geographic distances.",
    explanation: "Unlike a basic power meter that measures only total end-to-end power, an advanced C-OTDR uses an out-of-band supervisory wavelength (e.g. 1625 nm) multiplexed alongside 1310/1550 nm data channels. It generates real-time trace curves mapping attenuation along every meter of fiber, immediately flagging the exact physical location of a 0.05 dB macrobend anomaly.",
    hint: "Using a dedicated radar frequency that monitors every meter of the glass pipe while real data flows simultaneously.",
    level: "expert",
    codeExample: `// C-OTDR Continuous Monitoring Pipeline:
// Data Channels : 1310 nm & 1550 nm (Live 100 Gbps Traffic)
// OTDR Wavelength: 1625 nm (Supervisory Test Pulse)
// Telemetry Event: Localized Drop of -0.08 dB detected at Marker 14,208 meters -> Alert Dispatched!`
  },
  {
    question: "What is Time-Domain Reflectometry (TDR), and how is it used to detect physical copper cable taps?",
    shortAnswer: "TDR transmits fast electrical voltage pulses down copper twisted pairs and analyzes reflected waveforms caused by impedance mismatches (Z_0).",
    explanation: "A uniform Cat6A copper cable has a characteristic impedance of Z_0 = 100 Ohms. When an adversary attaches an inductive clamp or vampire tap, the added capacitance and inductance create an impedance discontinuity. The TDR pulse reflects back with reflection coefficient Gamma = (Z_L - Z_0) / (Z_L + Z_0), revealing the exact location of the physical tap.",
    hint: "Sending an electrical sound wave down a wire and listening for the echo caused by a dent or tap in the wire.",
    level: "expert",
    codeExample: `// TDR Reflection Coefficient Formula:
// Gamma = (Z_Load - Z_0) / (Z_Load + Z_0)
// If Z_Load drops to 85 Ohms due to tap capacitance -> Gamma = -0.081 (Negative Reflection Peak)`
  },
  {
    question: "How does the 'Harvest Now, Decrypt Later' (HNDL) quantum threat exploit the invisibility of passive eavesdropping?",
    shortAnswer: "Adversaries passively record and archive massive volumes of encrypted diplomatic and financial traffic today, intending to decrypt it years later when quantum computers break RSA/ECC.",
    explanation: "Because passive wiretaps leave zero forensic traces, an adversary can quietly record petabytes of encrypted communications traversing trans-oceanic cables or bank backbones. Even though the data is currently unreadable, once large-scale quantum computers running Shor's Algorithm emerge, the adversary can break the recorded public-key handshakes and read historical state secrets.",
    hint: "Recording encrypted radio broadcasts today to decode them in 10 years with future supercomputers.",
    level: "expert",
    codeExample: `// Harvest Now, Decrypt Later Attack Timeline:
// 2026: Passively record 10 Petabytes of RSA-2048 / ECDHE traffic (Undetected)
// 2035: Quantum Computer runs Shor's Algorithm: Factorizes N = p * q in minutes -> Decrypts 2026 archives!`
  },
  {
    question: "How does Post-Quantum Cryptography (PQC) and Ephemeral Diffie-Hellman mitigate 'Harvest Now, Decrypt Later' attacks?",
    shortAnswer: "Ephemeral keys ensure forward secrecy, while PQC algorithms (e.g. ML-KEM / CRYSTALS-Kyber) rely on lattice-based math that quantum computers cannot solve.",
    explanation: "Under NIST post-quantum standards (FIPS 203 ML-KEM), key encapsulation uses hard mathematical problems on high-dimensional module lattices. Even if an adversary passively records and archives the entire post-quantum encrypted session, future quantum computers cannot factorize or invert the lattice keys, permanently protecting historical data confidentiality.",
    hint: "Using quantum-proof mathematical locks so future quantum computers cannot open today's recorded safes.",
    level: "expert",
    codeExample: `// Post-Quantum TLS 1.3 Hybrid Key Exchange:
// Key Agreement: X25519 + ML-KEM-768 (CRYSTALS-Kyber)
// Result: Immune to both classical supercomputers and future quantum cryptanalysis`
  },
  {
    question: "What is an Air-Gapped Network, and why can it still be vulnerable to passive acoustic and electromagnetic side-channels?",
    shortAnswer: "An air-gapped network is physically disconnected from the internet, but passive sensors can still capture CPU acoustic vibrations, fan acoustic modulation, or TEMPEST RF radiation.",
    explanation: "Air-gapping isolates a system from physical cables and Wi-Fi. However, malware pre-installed via USB can modulate CPU cooling fan speeds or GPU memory bus frequencies to emit acoustic audio tones or RF signals. A passive microphone or SDR receiver in the same room can record these acoustic/RF emanations to exfiltrate secret keys.",
    hint: "Disconnecting the network cable doesn't stop sound waves or radio noise from radiating into the room.",
    level: "expert",
    codeExample: `// Acoustic Air-Gap Exfiltration (Fansmitter):
// CPU Fan speed modulated: 1,000 RPM (Bit '0') vs 1,600 RPM (Bit '1')
// External smartphone microphone records acoustic frequency -> 15 bits/minute exfiltrated`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023, what liability arises if an organization fails to implement safeguards against passive eavesdropping?",
    shortAnswer: "Section 8(5) mandates reasonable security safeguards to prevent data breaches; failure to encrypt data in transit triggers statutory penalties up to ₹250 Crores under Section 33.",
    explanation: "The DPDP Act 2023 does not excuse an organization because a passive wiretap was 'hard to detect'. Data Fiduciaries handling sensitive personal data (biometrics, health, financial records) are legally obligated to implement state-of-the-art encryption (TLS 1.3/AES-256) at rest and in transit. Transmitting citizen data in cleartext constitutes systemic negligence.",
    hint: "Failing to lock the door is illegal under data privacy laws, even if the burglar was invisible.",
    level: "moderate",
    codeExample: `// DPDP Statutory Safeguard Mandate:
// Legal Standard: Section 8(5) DPDP Act 2023 ("Reasonable Security Safeguards")
// Violation     : Transmitting unencrypted patient records over clinical LAN
// Penalty Scale : Up to ₹250 CRORES imposed by Data Protection Board of India (DPBI)`
  },
  {
    question: "What is an Inductive RF Sniffer, and how is it used to detect rogue physical taps on networking racks?",
    shortAnswer: "A handheld near-field probe that scans cable conduits and patch panels for localized electromagnetic radiation spikes caused by stripped cable shields or added tap hardware.",
    explanation: "Well-shielded Cat6A/Cat7 cables emit virtually zero electromagnetic radiation. When a rogue tap is installed, cable sheaths are stripped or physical couplers are added, creating an unshielded discontinuity that radiates RF noise. A handheld near-field electromagnetic probe moved along the cable tray detects localized micro-volt spikes, pinpointing the tap.",
    hint: "A metal detector for radio radiation: sweeps cable trays to find unshielded wiretap leaks.",
    level: "moderate",
    codeExample: `// RF Field Probe Frequency Sweep:
// Baseline Conduit Reading: < -90 dBm RF Leakage
// Reading at Tapped Junction: -48 dBm Spike at 125 MHz (1000BASE-T Clock Frequency) -> Tap Located!`
  },
  {
    question: "How does IEEE 802.1X Port-Based Network Access Control (PNAC) prevent unauthorized passive sniffing devices from connecting to a switch?",
    shortAnswer: "It keeps switch physical ports in an unauthorized state, dropping all traffic until the connected device successfully authenticates via EAP-TLS using digital certificates.",
    explanation: "If an adversary plugs an unauthorized rogue laptop into an open Ethernet wall jack in a corporate office in Kolkata, the 802.1X authenticator switch blocks all traffic (except EAPoL). Until the laptop presents a valid corporate X.509 client certificate validated by a RADIUS/TACACS+ server, the port remains disabled, preventing any packet sniffing.",
    hint: "A digital security guard at every wall jack that refuses to turn on the port without a security badge.",
    level: "moderate",
    codeExample: `// Cisco Switch 802.1X Configuration:
switch(config)# aaa authentication dot1x default group radius
switch(config-if)# authentication port-control auto
switch(config-if)# dot1x pae authenticator`
  },
  {
    question: "What is Private VLAN (PVLAN) Isolation, and how does it block inter-host promiscuous sniffing on the same subnet?",
    shortAnswer: "PVLAN divides a broadcast domain into Isolated and Promiscuous ports, preventing hosts in the same VLAN from communicating directly or sniffing each other's traffic.",
    explanation: "In a standard VLAN, all devices share a broadcast domain, allowing ARP spoofing and broadcast sniffing. In a Private VLAN: 'Isolated ports' can communicate only with the default gateway (Promiscuous port), but are completely isolated from all other endpoints on the same switch, rendering peer-to-peer promiscuous sniffing physically impossible.",
    hint: "Apartment building where all doors open into the hallway, but there are no doors between neighbors' apartments.",
    level: "expert",
    codeExample: `// Private VLAN Switch Configuration:
switch(config-vlan)# vlan 100
switch(config-vlan)# private-vlan community
switch(config-vlan)# vlan 101
switch(config-vlan)# private-vlan isolated`
  },
  {
    question: "How does Hardware Security Module (HSM) key isolation protect encryption keys against memory dump sniffing?",
    shortAnswer: "HSMs store private keys inside tamper-resistant cryptographic hardware, performing encryption and decryption inside the secure chip without exposing keys to server RAM.",
    explanation: "If an adversary achieves memory-level passive access (e.g. via DMA or cold boot attacks on server RAM), standard software keys can be extracted from memory dumps. An HSM (FIPS 140-3 Level 4 certified) processes cryptographic operations internally and zeroes out memory upon detecting physical probing, ensuring private keys are never exposed in plaintext.",
    hint: "A physical tamper-proof safe that does the math inside itself and never lets the combination out.",
    level: "expert",
    codeExample: `// PKCS#11 HSM Cryptographic Call:
// Key handle stays inside HSM hardware; raw private key bytes are never loaded into host RAM!
C_SignInit(hSession, &mechanism, hPrivateKey);
C_Sign(hSession, dataToSign, dataLen, signature, &sigLen);`
  },
  {
    question: "What is the role of Tamper-Evident Fiber Optical Seals on patch panel conduits?",
    shortAnswer: "They provide physical visual evidence (color changes, holographic fracture patterns) if a patch panel or fiber splice tray is opened or manipulated.",
    explanation: "Because optical taps can be tiny and silent, physical security standards (ISO 27001 Annex A.7) require serialized, tamper-evident security labels across all optical distribution frames (ODF). If an unauthorized person opens a junction box to attach a macrobend tap, the label leaves a permanent 'VOID' residue and breaks optical alignment microswitches that trigger alarm sirens.",
    hint: "Tamper-evident security tape that permanently reads 'VOID' if peeled off an optical box.",
    level: "basic",
    codeExample: `// Physical Security Control (ISO 27001 Control A.7.4):
// 1. Serialized Holographic Security Seals on all optical splice trays
// 2. Microswitch chassis intrusion detection connected to 24/7 SIEM physical alert bus`
  },
  {
    question: "Why does the combination of Mutual TLS (mTLS) and Encrypted Client Hello (ECH) represent the gold standard in passive attack defense?",
    shortAnswer: "mTLS authenticates both endpoints with X.509 certificates to prevent masquerade, while ECH encrypts the initial domain name and TLS handshake parameters, eliminating all metadata leaks.",
    explanation: "Standard TLS 1.3 encrypts application data but leaves the domain name (SNI) exposed in the initial ClientHello. ECH (RFC 9460) wraps the entire handshake in an encrypted outer envelope using the server's public key published in DNS. Combined with mTLS, passive eavesdroppers can see neither the website domain, the API endpoints, nor the identity of the communicating parties.",
    hint: "Two-way passport checks inside a completely opaque, soundproof envelope.",
    level: "expert",
    codeExample: `// mTLS + ECH Security Architecture:
// 1. DNS: Fetches ECHConfig public key via DNS-over-HTTPS (DoH)
// 2. Handshake: ClientHello is 100% encrypted (SNI hidden)
// 3. Mutual Auth: Server verifies Client X.509 Certificate; Client verifies Server Certificate`
  },
  {
    question: "What are the primary metrics used to evaluate the effectiveness of an enterprise anti-passive attack strategy?",
    shortAnswer: "1. Encryption Coverage Rate (100% of L2/L3/L7 links encrypted); 2. OTDR Monitoring Baseline Sensitivity (≤0.05 dB); 3. Cleartext Protocol Count (0 legacy ports active).",
    explanation: "Because passive attack detection cannot rely on breach alerts, security audits evaluate proactive hygiene metrics: ensuring 100% of inter-switch links use MACsec, 100% of web traffic uses TLS 1.3, zero cleartext protocols (Telnet/FTP) exist on the network, and physical fiber links undergo continuous OTDR pulse reflectometry with 0.05 dB resolution.",
    hint: "Measuring how well your armor covers your body before you step onto the battlefield.",
    level: "moderate",
    codeExample: `// Anti-Passive Security Scorecard:
// 1. TLS 1.3 / MACsec Coverage : 100% [PASS]
// 2. Cleartext Protocols Active: 0 [PASS]
// 3. OTDR Real-Time Baseline    : Active (0.05 dB sensitivity) [PASS]
// 4. DNS-over-HTTPS / ECH       : Enforced [PASS]`
  },
  {
    question: "Synthesize a comprehensive proactive defense framework that renders passive cyber attacks mathematically impossible across an enterprise.",
    shortAnswer: "A Defense-in-Depth model incorporating Layer 2 MACsec line encryption, TLS 1.3 AEAD with ECH, Constant-Bitrate (CBR) traffic padding, continuous OTDR monitoring, and 802.1X port isolation.",
    explanation: "To guarantee complete resilience against passive surveillance: 1. Physical Layer: Armored conduits, tamper-evident ODF seals, and continuous C-OTDR supervisory monitoring. 2. Data Link Layer: IEEE 802.1AE MACsec line-rate encryption and Private VLANs. 3. Transport & Application: TLS 1.3 AEAD with native record padding, Encrypted Client Hello (ECH), and DNS over HTTPS. 4. Metadata: Constant-rate dummy traffic padding to eliminate volume and timing burst leakage.",
    hint: "Encrypt every layer from physical fiber to application payload, pad every packet to uniform size, and monitor optical line attenuation continuously.",
    level: "expert",
    codeExample: `// Master Enterprise Defense Blueprint (Anti-Passive Surveillance):
// Layer 1: Armored Conduits + C-OTDR (1625nm supervisory pulse reflectometry)
// Layer 2: IEEE 802.1AE MACsec (AES-256-GCM) + IEEE 802.1X PNAC + Private VLANs
// Layer 3: IPsec Tunnel Mode (ESP) + Constant-Bitrate 50 Mbps Dummy Padding
// Layer 7: TLS 1.3 AEAD + Encrypted Client Hello (ECH) + DNS over HTTPS (DoH)`
  },
  {
    question: "What is Acoustic Emanation Profiling, and how do physical side-channel sniffers capture power grid transformer loads?",
    shortAnswer: "High-power electrical transformers emit subtle 50 Hz / 100 Hz hum vibrations whose harmonic acoustic frequencies vary with electrical load; remote parabolic microphones record these sounds to deduce power grid consumption.",
    explanation: "Magnetostriction in transformer iron cores causes physical expansion and contraction at twice the AC grid frequency (100 Hz in India's 50 Hz grid). As power load surges during industrial shifts in Barrackpore, acoustic harmonics shift measurably. A passive acoustic sensor positioned hundreds of meters away records this hum to monitor power grid utilization without accessing SCADA networks.",
    hint: "Listening to the electrical transformer's hum to guess how much power a factory is drawing.",
    level: "expert",
    codeExample: `// Transformer Magnetostriction Acoustics:
// Core Fundamental: 100 Hz (2x 50 Hz Grid Frequency)
// Harmonic Shifts : Load surges increase 300 Hz and 500 Hz acoustic harmonic power by +6.2 dB`
  },
  {
    question: "How does the 'Evil Maid' physical attack exploit unencrypted BIOS and boot partitions to insert passive sniffing hardware?",
    shortAnswer: "An attacker with physical access to an unattended machine flashes malicious firmware or attaches a hardware PCI keylogger to silently capture passwords upon boot.",
    explanation: "An Evil Maid attack occurs when a computer is left unattended in a hotel room or office. The attacker boots a custom USB drive, modifying the unencrypted bootloader (`/boot`) or injecting a kernel-level hardware sniffer. When the user later types their full disk encryption passphrase, the compromised bootloader stores or transmits the password silently.",
    hint: "Tampering with a locked suitcase while the owner is asleep in a hotel room.",
    level: "expert",
    codeExample: `// Evil Maid Countermeasures:
// 1. UEFI Secure Boot with custom PK/KEK keys
// 2. Hardware TPM 2.0 PCR (Platform Configuration Register) measurement verification
// 3. Physical chassis intrusion switches that wipe TPM keys upon opening`
  },
  {
    question: "What is Memory Bus Snooping, and how does AMD SEV / Intel SGX defeat memory-level passive sniffing?",
    shortAnswer: "Attaching interposers to motherboard RAM buses captures cleartext memory bytes; hardware memory encryption (AES-128/256) encrypts all data leaving the CPU memory controller.",
    explanation: "If an adversary attaches hardware probing pins to the DDR5 RAM traces on a motherboard, all cleartext database records and encryption keys passing between CPU cache and RAM can be passively captured. Technologies like AMD Secure Encrypted Virtualization (SEV) and Intel Total Memory Encryption (TME) encrypt all memory lines with AES keys generated inside the CPU, rendering RAM bus snooping useless.",
    hint: "Encrypting the data before it leaves the processor chip to travel across motherboard circuit traces.",
    level: "expert",
    codeExample: `// Linux Kernel Full Memory Encryption Verification:
# dmesg | grep -i "memory encryption"
# Output: [ 0.000000] AMD-SEV: Memory encryption active (AES-128-XTS hardware engine enabled)`
  },
  {
    question: "Why are Passive Attacks often called 'Reconnaissance Enablers' in Advanced Persistent Threat (APT) lifecycles?",
    shortAnswer: "Because passive eavesdropping allows APT actors to silently map internal network topologies, identify active IP ranges, and record admin credentials before launching targeted active attacks.",
    explanation: "In the Cyber Kill Chain and MITRE ATT&CK framework, passive surveillance forms the initial Reconnaissance and Footprinting phases. By quietly observing traffic flows over weeks or months, the adversary discovers which servers host financial databases, identifies shift schedules of administrators, and intercepts unencrypted API keys, ensuring their subsequent active attack succeeds on the first attempt.",
    hint: "Studying the bank's blueprints and security guard schedules for months before attempting a robbery.",
    level: "moderate",
    codeExample: `// APT Attack Progression:
// Phase 1 (Passive) : 60 days of silent packet sniffing ➔ Maps Kolkata FinTech payment topology
// Phase 2 (Active)  : Masquerade attack using captured admin credentials ➔ Dispatches ₹12 Crore wire transfer`
  },
  {
    question: "How does Hardware Electromagnetic Compatibility (EMC) Testing prevent passive TEMPEST eavesdropping?",
    shortAnswer: "EMC standards (e.g. CISPR / FCC Class B) limit unintentional RF emissions from electronic circuitry to ultra-low micro-volt thresholds.",
    explanation: "During EMC testing in an anechoic chamber, electronic circuit boards are measured across 30 MHz to 6 GHz. Designers add ferrite choke beads, multi-layer ground planes, and differential trace routing to cancel out high-frequency electromagnetic emanations, ensuring radiation levels are too weak to be detected outside physical room walls.",
    hint: "Designing circuit boards so they don't accidentally act like miniature radio broadcasting towers.",
    level: "moderate",
    codeExample: `// EMC Shielding Design Rules:
// 1. Solid Ground Planes: Ground plane directly underneath high-speed differential pairs
// 2. Ferrite Chokes: Attenuates common-mode RF noise on HDMI and USB 3.0 cables`
  },
  {
    question: "What is Passive OS Fingerprinting (p0f) via IP Time-to-Live (TTL) and DF flags?",
    shortAnswer: "Inspecting initial packet TTL and Don't Fragment (DF) flags; Linux defaults to TTL=64 with DF=1, Windows defaults to TTL=128 with DF=1, and Cisco IOS defaults to TTL=255.",
    explanation: "Because different operating systems initialize IP header fields with unique standard values, a passive sniffer simply counts the hops: if a packet arrives with TTL=58, the original TTL was 64 (6 router hops away), confirming the host is a Linux/Unix system. Windows hosts arrive with TTL ~120 (initial 128), allowing complete OS mapping with zero active port scanning.",
    hint: "Looking at the starting counter on a packet to figure out which factory built the operating system.",
    level: "basic",
    codeExample: `// Default IP Header TTL Signatures:
// Linux / Android / macOS : Initial TTL = 64
// Windows 10 / 11 / Server: Initial TTL = 128
// Cisco IOS / Network Routers: Initial TTL = 255`
  },
  {
    question: "How do Encrypted SNI (ECH) and Encrypted DNS (DoH) together eliminate ISP passive browsing surveillance?",
    shortAnswer: "DoH encrypts domain queries over port 443, while ECH encrypts the server hostname during TLS handshakes, preventing ISPs from seeing which websites users access.",
    explanation: "Historically, local ISPs passively logged user browsing by reading plaintext DNS lookups (port 53) and cleartext Server Name Indication (SNI) headers in TLS handshakes. Combining DNS-over-HTTPS (DoH) with Encrypted Client Hello (ECH) ensures both the DNS lookup and the TLS handshake are encrypted, leaving the ISP with only destination IP addresses and uniform packet sizes.",
    hint: "Locking both the phonebook query and the address on the envelope so the mail carrier learns nothing.",
    level: "expert",
    codeExample: `// Complete Anti-ISP Surveillance Pipeline:
// 1. Lookup Domain : DoH over TLS 1.3 (Port 443) -> Fetches ECH public key
// 2. Connect to Site: TLS 1.3 + ECH -> Hostname "portal.kolkata.in" is 100% encrypted inside ClientHello`
  },
  {
    question: "What is BPF Kernel JIT (Just-In-Time) Hardening in Linux, and how does it prevent kernel memory exploitation during sniffing?",
    shortAnswer: "It compiles BPF bytecode into machine code with randomized memory layout (eBPF JIT hardening) to prevent attackers from using sniffing filters as spray targets.",
    explanation: "When running high-speed packet capture filters, the Linux kernel uses the eBPF JIT compiler. To prevent malicious programs from loading crafted BPF bytecodes to execute kernel privilege escalation, the kernel enables JIT hardening (`net.core.bpf_jit_harden=2`), blinding constants and preventing speculative execution side-channels.",
    hint: "Scrambling the filter compiler in the operating system so hackers cannot hijack the network card driver.",
    level: "expert",
    codeExample: `// Linux Kernel BPF JIT Hardening Configuration:
sysctl -w net.core.bpf_jit_enable=1
sysctl -w net.core.bpf_jit_harden=2 # Blinds all immediate constants in BPF bytecode`
  },
  {
    question: "Under the Indian IT Act Section 43(a) and 66, what constitutes the legal threshold of unauthorized passive data extraction?",
    shortAnswer: "Accessing or downloading/copying data from a computer system without the permission of the owner or person-in-charge constitutes an offense punishable by damages and imprisonment.",
    explanation: "Even if an individual only silently records network packets and never uses the captured information to modify databases or commit financial fraud, the mere act of capturing and saving unauthorized cleartext packet payloads violates Section 43(a) (civil damages up to ₹1 Crore) and Section 66 (criminal hacking up to 3 years imprisonment).",
    hint: "Simply copying someone else's data packets is illegal, even if you never use or sell the information.",
    level: "moderate",
    codeExample: `// Legal Definition (Section 43(a) IT Act 2000):
// "If any person without permission of the owner... accesses or secures access to such computer...
// or downloads, copies or extracts any data, computer database or information... he shall be liable to pay damages."`
  },
  {
    question: "Synthesize the trade-offs between Optical Time-Domain Reflectometry (OTDR), Hardware MACsec, and Software TLS 1.3 in an enterprise anti-eavesdropping strategy.",
    shortAnswer: "OTDR detects physical taps on glass fiber; MACsec encrypts all Layer 2 frames at line rate; TLS 1.3 provides end-to-end payload security across untrusted public clouds.",
    explanation: "An enterprise cannot rely on a single layer: 1. OTDR locates physical conduit intrusion along dark fiber miles but does not encrypt data. 2. MACsec encrypts 100% of data link traffic at 100 Gbps wire speed across switches but only works point-to-point over private links. 3. TLS 1.3 protects application payloads across public internet routes. A complete defense deploys all three in harmony.",
    hint: "OTDR guards the physical glass, MACsec guards the local switch cables, and TLS 1.3 guards the internet journey.",
    level: "expert",
    codeExample: `// Integrated 3-Tier Anti-Eavesdropping Layering:
// Tier 1 (Physical) : Supervisory OTDR Pulse Monitoring (0.05 dB tap detection)
// Tier 2 (Data Link): IEEE 802.1AE MACsec AES-256-GCM (Point-to-Point Switch Line Encryption)
// Tier 3 (App Layer): TLS 1.3 AEAD + Encrypted Client Hello (End-to-End Payload Protection)`
  }
];

export default questions;
