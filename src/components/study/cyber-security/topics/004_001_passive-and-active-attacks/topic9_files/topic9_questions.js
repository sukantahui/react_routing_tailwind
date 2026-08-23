const questions = [
  {
    question: "Why is defensive strategy against Passive Cyber Attacks heavily weighted toward Proactive Prevention rather than Real-Time Detection?",
    shortAnswer: "Because passive attacks (sniffing, wiretapping) generate zero log events, zero packet re-transmissions, and zero system state changes, making real-time detection on standard IT infrastructure practically impossible.",
    explanation: "Traditional security operations rely on 'Detect -> Contain -> Remediate'. With passive surveillance, standard firewalls and SIEM engines remain 100% blind because the adversary only reads passing signals without transmitting. Security architects must embrace the Prevention Paradox: assume every wire and wireless frequency is already tapped, enforcing end-to-end cryptography so intercepted ciphertext is mathematically unreadable.",
    hint: "Assume the tap is already on the wire: encrypt everything so the eavesdropper gets only useless noise.",
    level: "basic",
    codeExample: `// Passive Defense Philosophy:
// Detection-Centric (Fails): Wait for IDS alert ➔ 0 Alerts Generated ➔ Breach continues for months
// Prevention-Centric (Mandatory): Assume 100% Intercepted ➔ Enforce TLS 1.3 AEAD + MACsec + CBR Padding`
  },
  {
    question: "How does Continuous Optical Time-Domain Reflectometry (C-OTDR) detect physical fiber taps in real time during live data transmission?",
    shortAnswer: "C-OTDR continuously injects an out-of-band supervisory wavelength (1625 nm) alongside live data channels, measuring localized Rayleigh backscatter variations as small as 0.05 dB.",
    explanation: "Standard optical transceivers ignore small power drops (-0.2 dB) as normal temperature variance. C-OTDR operates at an out-of-band wavelength (1625 nm) that does not interfere with 1310/1550 nm data traffic. It continuously maps the optical attenuation profile across every meter of fiber. If an adversary installs a macrobend clamp or optical coupler, the localized Rayleigh backscatter spike alerts the SOC and pinpoints the physical tap location within ±0.5 meters.",
    hint: "A dedicated optical radar constantly scanning every meter of the glass pipe while real traffic flows.",
    level: "expert",
    codeExample: `// C-OTDR Optical Telemetry Event:
// Supervisory Wavelength: 1625 nm
// Attenuation Baseline  : -0.21 dB/km
// Telemetry Anomaly     : Localized drop of -0.07 dB detected at Marker 14,208.5 meters -> Physical Tap Alert!`
  },
  {
    question: "What is IEEE 802.1AE MACsec, and how does it prevent Layer 2 passive sniffing across internal switch links?",
    shortAnswer: "MACsec provides hardware-based line-rate point-to-point encryption (AES-128/256-GCM) at the Data Link Layer, encrypting all Ethernet payload and header bytes.",
    explanation: "Standard internal switch trunks carry unencrypted Ethernet frames, allowing rogue taps or compromised switch ports to sniff inter-VLAN traffic. MACsec operates directly in switch hardware ASICs at 100 Gbps line speed. Every Ethernet frame (including IP headers) is encrypted with AES-256-GCM. An eavesdropper tapping the inter-switch cable sees only unintelligible encrypted SecTAG frames.",
    hint: "Hardware encryption chips on every network cable connecting switches inside the building.",
    level: "moderate",
    codeExample: `// Cisco Catalyst MACsec Trunk Configuration:
mka policy ENTERPRISE-MACSEC
 key-server priority 1
 macsec-cipher-suite gcm-aes-256
!
interface TenGigabitEthernet1/0/1
 macsec
 mka pre-shared-key key-chain MACSEC-KEY-RING`
  },
  {
    question: "How does Constant-Bitrate (CBR) Traffic Padding eliminate Traffic Analysis and flow profiling vulnerabilities?",
    shortAnswer: "It injects pseudo-random dummy encrypted packets whenever real traffic is idle, maintaining a perfectly flat transmission rate so adversaries cannot observe burst patterns.",
    explanation: "Even over encrypted tunnels, observing transmission bursts leaks operational activity (e.g. power grid switching commands or financial wire transfer timing). Constant-Bitrate (CBR) padding enforces a continuous transmission rate (e.g. flat 50 Mbps). When genuine data is absent, the cryptographic engine transmits encrypted dummy bytes, completely flattening the traffic waveform.",
    hint: "Keeping the water pipe completely full of liquid 24/7 so no one can tell when water is flowing.",
    level: "expert",
    codeExample: `// Constant-Bitrate Dummy Packet Injection Loop:
def transmit_cbr(packet_queue, target_bitrate=50000000):
    while True:
        if not packet_queue.empty():
            send(encrypt_aead(packet_queue.pop()))
        else:
            send(encrypt_aead(generate_dummy_noise(1420))) # Padding packet
        time.sleep(1 / (target_bitrate / (1420 * 8)))`
  },
  {
    question: "How do Canary Honeytokens lure passive network eavesdroppers into revealing their presence?",
    shortAnswer: "By deliberately planting unique fake credentials into unencrypted decoy traffic streams; when an eavesdropper uses the credential on a login portal, an immediate SOC alert is triggered.",
    explanation: "Because a passive sniffer cannot be detected while silently capturing packets, security teams insert decoy credentials (e.g. `DB_PASS=canary_user_kolkata` or a unique AWS API key) into simulated internal JSON broadcast feeds. If that credential is ever used to authenticate on any internal or external service, the canary backend captures the sniffer's IP and workstation hostname.",
    hint: "Leaving marked currency notes in a drawer: you catch the thief the moment they try to spend the marked cash.",
    level: "expert",
    codeExample: `// Canary Credential Lure in Internal Feed:
const decoyPayload = {
  db_server: "staging-db.kolkatabank.in",
  auth_token: "CANARY_TOKEN_99812_ALERT_SOC" // Monitored by SIEM honeypot backend
};`
  },
  {
    question: "What is Encrypted Client Hello (ECH / RFC 9460), and how does it close the last metadata leak in TLS 1.3?",
    shortAnswer: "ECH encrypts the entire initial TLS handshake (including the Server Name Indication - SNI header) using the server's public key published in DNS, hiding the visited domain from ISPs.",
    explanation: "In standard TLS 1.3, the Server Name Indication (SNI) header is transmitted in cleartext during the ClientHello, allowing ISPs and passive sniffers to see which domain is being accessed. ECH encrypts the `InnerClientHello` inside an `OuterClientHello` using a public key retrieved via DNS-over-HTTPS (DoH). Intermediate sniffers see only the generic outer host name (e.g. `cloudflare.com`), completely hiding the specific target website.",
    hint: "Putting the letter inside a second opaque envelope so the mail carrier cannot even see the recipient's name.",
    level: "expert",
    codeExample: `// ECH DNS RRset (HTTPS Record Type):
kolkatabank.in. IN HTTPS 1 . (
    alpn="h2,h3"
    ech="AEn+DQBFBwAgAC..." # Public key used by client to encrypt ClientHello
)`
  },
  {
    question: "How does Post-Quantum Cryptography (PQC / FIPS 203 ML-KEM) defeat 'Harvest Now, Decrypt Later' passive surveillance?",
    shortAnswer: "It replaces classical Diffie-Hellman/RSA key exchange with module-lattice cryptography that quantum computers running Shor's Algorithm cannot solve.",
    explanation: "Adversaries passively archive encrypted communications today, intending to decrypt them years later using quantum computers. NIST Post-Quantum standards (ML-KEM / CRYSTALS-Kyber) use the Learning With Errors (LWE) problem over high-dimensional lattices. Even with a large-scale quantum computer, archived post-quantum ciphertexts cannot be factored or broken.",
    hint: "Using a lock based on multi-dimensional lattice math that quantum computers cannot pick.",
    level: "expert",
    codeExample: `// Post-Quantum Hybrid TLS 1.3 Key Exchange:
// Key Agreement: X25519 + ML-KEM-768 (CRYSTALS-Kyber)
// Result: Immune to both classical supercomputers and future quantum cryptanalysis`
  },
  {
    question: "What is Remote Promiscuous Mode Detection via Fake Unicast MAC Testing?",
    shortAnswer: "Sending an ARP or ICMP packet with the victim's correct IP address but a bogus destination MAC address; only a NIC running in promiscuous mode accepts the frame and replies.",
    explanation: "Under standard operation, a NIC's hardware ASIC filter discards any frame whose destination MAC does not match the host MAC. If an attacker has placed the NIC into promiscuous mode to run Wireshark, the hardware filter is disabled. The frame reaches the kernel, the OS IP stack sees its own IP, and emits an ICMP/ARP response back, exposing that the host is silently sniffing.",
    hint: "Sending a letter with a fake street address but the real recipient name: only someone reading all neighborhood mail opens it.",
    level: "expert",
    codeExample: `# Remote Promiscuous Detection via Nmap:
nmap --script sniffer-detect 192.168.1.0/24
# Output: 192.168.1.45: Promiscuous mode detected! (Likely running tcpdump)`
  },
  {
    question: "Under the Indian DPDP Act 2023 Section 8(5) and Section 33, what are the statutory liabilities for failing to prevent passive data leakage?",
    shortAnswer: "Section 8(5) mandates reasonable security safeguards (end-to-end encryption) to prevent personal data leaks; failure triggers statutory penalties up to ₹250 Crores under Section 33.",
    explanation: "The Digital Personal Data Protection Act 2023 does not accept the defense that a passive wiretap was 'invisible or hard to detect'. Data Fiduciaries handling citizen personal data (health, biometric, financial) are legally obligated to implement state-of-the-art encryption (TLS 1.3/AES-256) at rest and in transit. Transmitting citizen data in cleartext constitutes systemic statutory negligence.",
    hint: "Failing to lock customer data with strong encryption is illegal under national privacy law.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Technical Standard: Mandatory 100% Cryptographic Coverage (TLS 1.3 / MACsec) across all citizen data paths`
  },
  {
    question: "How does TEMPEST (NATO SDIP-27) shielding prevent passive electromagnetic radiation eavesdropping?",
    shortAnswer: "It encloses electronic equipment in Faraday cages, adds ferrite choke beads to cables, and enforces physical separation distances to attenuate unintentional RF emanations.",
    explanation: "Electronic components (monitors, CPU memory buses, keyboards) unintentionally emit high-frequency electromagnetic radiation that can be reconstructed by nearby SDR receivers. TEMPEST standards enforce physical RF shielding: solid metal enclosures, copper mesh windows, isolated power filters, and fiber-optic data isolators, reducing electromagnetic leakage to undetectable levels.",
    hint: "Building a soundproof and radio-proof room around high-security computers.",
    level: "expert",
    codeExample: `// TEMPEST Zone 0 Shielding Specification:
// Standard: NATO SDIP-27 Level A
// Metallic Mesh Faraday Attenuation: >90 dB across 10 MHz to 10 GHz`
  },
  {
    question: "What is Private VLAN (PVLAN) Isolation, and how does it prevent inter-host passive sniffing on the same subnet?",
    shortAnswer: "PVLAN divides a broadcast domain into Isolated and Promiscuous ports, preventing hosts on the same switch from communicating directly or sniffing each other's traffic.",
    explanation: "In a standard VLAN, all devices share a broadcast domain, allowing promiscuous sniffing. In a Private VLAN: 'Isolated ports' can communicate only with the default gateway (Promiscuous port), but are completely isolated from all other endpoints on the same switch, rendering peer-to-peer promiscuous sniffing physically impossible.",
    hint: "Apartment doors that only open to the main lobby, preventing neighbors from looking into each other's windows.",
    level: "moderate",
    codeExample: `// Cisco Private VLAN Switch Configuration:
switch(config-vlan)# vlan 100
switch(config-vlan)# private-vlan community
switch(config-vlan)# vlan 101
switch(config-vlan)# private-vlan isolated`
  },
  {
    question: "How does TLS 1.3 Record Padding (RFC 8446 Section 5.4) defeat Website Fingerprinting traffic analysis?",
    shortAnswer: "It appends arbitrary zero-byte padding inside the encrypted envelope before AEAD encryption, standardizing all API response lengths to uniform blocks.",
    explanation: "In TLS 1.2, ciphertext size closely tracked plaintext size, allowing passive sniffers to identify visited webpages by analyzing asset download lengths. TLS 1.3 includes native record padding where arbitrary zero bytes can be added inside the ciphertext envelope, making all server responses appear identical in length (e.g. all padded to 1024 or 2048 bytes).",
    hint: "Adding stuffing inside the encrypted envelope so all messages look identically thick.",
    level: "expert",
    codeExample: `// TLS 1.3 Padded Record Structure:
// Plaintext: [Data: "OK"] [RecordType: 23] [Padding: 0x00 0x00 ... 0x00]
// Ciphertext: Exactly 2048 Bytes (Length reveals zero information about inner payload)`
  },
  {
    question: "What is Time-Domain Reflectometry (TDR), and how does it detect physical copper cable taps?",
    shortAnswer: "TDR transmits fast electrical voltage pulses down copper twisted pairs and analyzes reflected waveforms caused by impedance mismatches ($Z_0$).",
    explanation: "A uniform Cat6A copper cable has a characteristic impedance of $Z_0 = 100\\ \\Omega$. When an adversary attaches an inductive clamp or vampire tap, the added capacitance and inductance create an impedance discontinuity. The TDR pulse reflects back with reflection coefficient $\\Gamma = (Z_L - Z_0) / (Z_L + Z_0)$, revealing the exact location of the physical tap.",
    hint: "Sending an electrical sound wave down a wire and listening for the echo caused by a dent or tap in the wire.",
    level: "expert",
    codeExample: `// TDR Reflection Coefficient Formula:
// Gamma = (Z_Load - Z_0) / (Z_Load + Z_0)
// If Z_Load drops to 85 Ohms due to tap capacitance -> Gamma = -0.081 (Negative Reflection Peak)`
  },
  {
    question: "How does DNS-over-HTTPS (DoH) prevent ISP passive browsing profiling?",
    shortAnswer: "It encrypts DNS queries inside TLS 1.3 sessions over port 443, preventing ISPs and intermediate network sniffers from logging visited domain names.",
    explanation: "Standard DNS (UDP 53) is unencrypted cleartext, allowing local ISPs to log every domain requested by subscribers. DNS-over-HTTPS (RFC 8484) wraps all DNS queries inside encrypted HTTPS connections to trusted resolvers (Cloudflare, Quad9), authenticated with X.509 certificates, making domain lookups indistinguishable from standard HTTPS web traffic.",
    hint: "Putting your phonebook lookup query inside an encrypted lockbox.",
    level: "moderate",
    codeExample: `// Linux DoH Client Query:
curl -H "accept: application/dns-json" "https://cloudflare-dns.com/dns-query?name=kolkatabank.in&type=A"`
  },
  {
    question: "Under Section 43(a) of the Indian IT Act 2000, what is the civil penalty for unauthorized passive data extraction?",
    shortAnswer: "Liable to pay compensation by way of damages up to ₹1 Crore for accessing, downloading, or extracting data from any computer system without permission.",
    explanation: "Section 43(a) explicitly covers unauthorized data extraction: 'If any person without permission of the owner... accesses or secures access to such computer... or downloads, copies or extracts any data... he shall be liable to pay damages by way of compensation not exceeding one crore rupees.'",
    hint: "Section 43(a) provides civil compensation up to ₹1 Crore for unauthorized packet capture and data extraction.",
    level: "basic",
    codeExample: `// Civil Liability (IT Act Section 43(a)):
// Violation: Unauthorized packet sniffing and data extraction
// Compensation: Up to ₹1,00,00,000 (Rupees One Crore)`
  },
  {
    question: "How does Hardware Security Module (HSM) key isolation protect private keys against physical memory dump sniffing?",
    shortAnswer: "HSMs perform cryptographic operations inside a tamper-resistant hardware chip, zeroing out memory upon physical probing and never exposing raw private keys to host RAM.",
    explanation: "If an adversary achieves memory-level passive access (via DMA probing or cold boot attacks on server RAM), software private keys can be extracted from memory dumps. An HSM (FIPS 140-3 Level 4 certified) keeps private keys permanently inside its secure silicon enclosure, signing data internally without loading keys into server RAM.",
    hint: "A physical tamper-proof safe that does the math inside itself and never lets the combination out.",
    level: "expert",
    codeExample: `// PKCS#11 HSM Cryptographic Call:
// Private key never leaves the hardware chip!
C_SignInit(hSession, &mechanism, hPrivateKey);
C_Sign(hSession, dataToSign, dataLen, signature, &sigLen);`
  },
  {
    question: "What is Tamper-Evident Fiber Optical Sealing, and how does it support ISO 27001 physical security controls?",
    shortAnswer: "Serialized holographic seals and microswitch intrusion sensors installed on optical distribution frames that provide visual and digital proof of physical conduit tampering.",
    explanation: "Under ISO 27001 Annex A.7 (Physical and Environmental Security), all optical splice trays and distribution frames must be secured with serialized tamper-evident holographic seals. If an unauthorized technician opens a fiber junction box to attach a macrobending tap, the seal leaves a permanent 'VOID' residue and breaks an internal microswitch circuit that dispatches an immediate SIEM physical alert.",
    hint: "Tamper tape that permanently reads 'VOID' if peeled off an optical splice box.",
    level: "basic",
    codeExample: `// Physical Security Control (ISO 27001 Control A.7.4):
// 1. Serialized Holographic Security Seals on all optical distribution frames (ODF)
// 2. Microswitch chassis intrusion detection connected to 24/7 SIEM physical alert bus`
  },
  {
    question: "How does Tor's 514-Byte Fixed Cell Padding defend against packet size traffic analysis?",
    shortAnswer: "Tor fragments and pads all relayed data into uniform 514-byte cells, ensuring that individual packet sizes reveal zero information about the underlying payload.",
    explanation: "If application data is 100 bytes or 4,000 bytes, Tor splits and pads it into discrete 514-byte cells. An external observer watching a Tor relay node sees only identical 514-byte frames traversing the wire, completely neutralizing packet-length fingerprinting.",
    hint: "Standardized shipping containers: every box on the truck is exactly the same size, no matter what is inside.",
    level: "moderate",
    codeExample: `// Tor Cell Structure (Fixed 514 Bytes):
// [Circuit ID: 4 Bytes] [Command: 1 Byte] [Payload: 509 Bytes]
// Short messages are zero-padded to reach exactly 514 bytes.`
  },
  {
    question: "What is ARP Request Latency Flooding, and how does it detect promiscuous sniffers?",
    shortAnswer: "Flooding non-matching broadcast ARP frames increases CPU load on hosts running sniffers because they must filter frames in kernel software, creating measurable response delays.",
    explanation: "When thousands of bogus broadcast ARP frames are sent across a subnet, normal hosts discard them immediately in hardware (NIC ASIC). A host in promiscuous mode must pass all frames to the kernel/libpcap, increasing CPU load. By comparing ping or ARP response time deltas between normal states and flooded states, specialized tools identify sniffing machines.",
    hint: "Flooding the room with junk mail: the person reading everything gets slowed down, while others throw it away instantly.",
    level: "expert",
    codeExample: `// Promiscuous Detection via Microsecond RTT:
// Target in Normal Mode      : Ping RTT = 0.42 ms during broadcast flood
// Target in Promiscuous Mode : Ping RTT = 4.85 ms (Kernel bogged down filtering libpcap buffers)`
  },
  {
    question: "Synthesize an integrated Defense-in-Depth Architecture that provides 100% immunity against Passive Cyber Attacks across all enterprise tiers.",
    shortAnswer: "A unified framework combining C-OTDR (Physical), IEEE 802.1AE MACsec (Data Link), IPsec ESP with CBR Padding (Network), and TLS 1.3 with ECH, DoH, and ML-KEM PQC (Application).",
    explanation: "To achieve complete immunity against passive surveillance: 1. Physical Layer: Armored conduits, tamper-evident ODF seals, and continuous C-OTDR supervisory monitoring (1625 nm). 2. Data Link Layer: IEEE 802.1AE MACsec (AES-256-GCM) and Private VLANs. 3. Network Layer: IPsec Tunnel Mode with Constant-Bitrate (CBR) traffic padding. 4. Application Layer: TLS 1.3 AEAD with native record padding, Encrypted Client Hello (ECH), DNS over HTTPS (DoH), and Post-Quantum Cryptography (ML-KEM). 5. Deception: Canary Honeytokens.",
    hint: "Guard the glass with optical radar, armor the switch cables with MACsec, pad the traffic to flatlines, and lock the application with post-quantum cryptography.",
    level: "expert",
    codeExample: `// Master Enterprise Anti-Passive Blueprint:
// 1. Physical Layer : Armored Conduits + C-OTDR (1625nm live pulse reflectometry)
// 2. Data Link Layer: IEEE 802.1AE MACsec (AES-256-GCM) + IEEE 802.1X PNAC + PVLANs
// 3. Network Layer  : IPsec Tunnel Mode (ESP) + Constant-Bitrate 50 Mbps Dummy Padding
// 4. App Layer      : TLS 1.3 AEAD + Encrypted Client Hello (ECH) + DNS-over-HTTPS (DoH)
// 5. Quantum Defense: Hybrid Post-Quantum ML-KEM-768 Key Encapsulation (FIPS 203)`
  },
  {
    question: "What is Acoustic Emanation Profiling, and how do physical side-channel sniffers capture power grid transformer loads?",
    shortAnswer: "High-power electrical transformers emit subtle 50 Hz / 100 Hz hum vibrations whose harmonic acoustic frequencies vary with electrical load; remote microphones record these sounds to deduce power consumption.",
    explanation: "Magnetostriction in transformer iron cores causes physical expansion and contraction at twice the AC grid frequency (100 Hz in India's 50 Hz grid). As power load surges during industrial shifts in Barrackpore, acoustic harmonics shift measurably. A passive acoustic sensor positioned hundreds of meters away records this hum to monitor power grid utilization without accessing SCADA networks.",
    hint: "Listening to the electrical transformer's hum to guess how much power a factory is drawing.",
    level: "expert",
    codeExample: `// Transformer Magnetostriction Acoustics:
// Core Fundamental: 100 Hz (2x 50 Hz Grid Frequency)
// Harmonic Shifts : Load surges increase 300 Hz and 500 Hz acoustic harmonic power by +6.2 dB`
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
    question: "Under the Indian IT Act Section 66, what is the criminal penalty for unauthorized passive network interception?",
    shortAnswer: "Imprisonment of either description for a term which may extend to three years, or with fine which may extend to ₹5 Lakhs, or with both.",
    explanation: "Section 66 covers criminal penalties for unauthorized interception, data copying, or hacking: 'If any person, dishonestly or fraudulently, does any act referred to in section 43, he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees, or with both.'",
    hint: "Section 66 carries up to 3 years imprisonment and ₹5 Lakh fine for unauthorized hacking and interception.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66):
// Offense: Unauthorized network sniffing and packet capture
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,000`
  },
  {
    question: "Synthesize the mathematical relationship between Link Capacity, Traffic Padding Overhead, and Shannon Channel Capacity in Anti-Traffic Analysis engineering.",
    shortAnswer: "Traffic padding increases bandwidth overhead to C_pad = max(R_burst), reducing effective channel utilization to eta = R_avg / max(R_burst) while reducing entropy leakage to zero.",
    explanation: "To achieve zero metadata leakage (H(Traffic | Observation) = 0), a network must transmit at a constant maximum burst capacity $C = \\max(R(t))$. If peak burst rate is 100 Mbps but average real data rate is only 5 Mbps, the traffic padding efficiency is $\\eta = 5 / 100 = 5\\%$, incurring a 95% bandwidth tax. Engineers balance this trade-off using adaptive padding windows and multi-queue priority token bucket shapers.",
    hint: "Zero information leakage requires paying for maximum bandwidth 100% of the time.",
    level: "expert",
    codeExample: `// Anti-Traffic Analysis Bandwidth Efficiency Equation:
// Efficiency = (Real Data Volume) / (Total Transmitted Volume with Constant Padding)
// Trade-off  : Maximum Privacy (0% Leakage) = 95% Bandwidth Overhead Tax`
  }
];

export default questions;
