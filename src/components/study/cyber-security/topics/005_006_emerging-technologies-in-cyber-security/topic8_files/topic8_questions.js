const questions = [
  {
    id: 1,
    question: "What is Quantum Key Distribution (QKD) and how does its security guarantee fundamentally differ from Post-Quantum Cryptography (PQC)?",
    shortAnswer: "QKD uses the fundamental laws of quantum physics (Heisenberg Uncertainty Principle and No-Cloning Theorem) to distribute symmetric cryptographic keys with unconditional information-theoretic security. PQC relies on the unproven computational complexity of classical mathematical problems (e.g., Lattice LWE).",
    explanation: "QKD security is guaranteed by the laws of physics, making it immune to any future mathematical or computational breakthroughs.",
    hint: "QKD security is based on physical laws (quantum mechanics); PQC security is based on mathematical hardness.",
    level: "Basic",
    codeExample: `// Security Foundation:
// PQC : Hard Math (Lattices) -> Could theoretically be broken by future algorithms
// QKD : Quantum Physics -> Eavesdropping physically perturbs photons and reveals attacker ✔`
  },
  {
    id: 2,
    question: "Explain the four photon polarization states and two non-orthogonal bases used in the BB84 protocol.",
    shortAnswer: "1. Rectilinear Basis ($+$): Horizontal $|0^\\circ\\rangle = 0$, Vertical $|90^\\circ\\rangle = 1$; 2. Diagonal Basis ($\\times$): $+45^\\circ = 0$, $-45^\\circ (135^\\circ) = 1$. The two bases are conjugate (non-orthogonal); measuring a photon prepared in the $+$ basis with a $\\times$ detector collapses the state, yielding a 50/50 random outcome.",
    explanation: "Using non-orthogonal bases ensures an eavesdropper cannot measure photons without introducing detectable state disturbance.",
    hint: "Rectilinear (+) with 0/90 degrees and Diagonal (x) with 45/135 degrees.",
    level: "Basic",
    codeExample: `// BB84 Polarization States:
// Basis '+': |0> = Horizontal (0), |1> = Vertical (1)
// Basis 'x': |+> = Diagonal +45° (0), |-> = Diagonal 135° (1)`
  },
  {
    id: 3,
    question: "What happens during the Sifting Phase of the BB84 protocol?",
    shortAnswer: "Alice and Bob communicate over a public classical authenticated channel to announce the sequence of measurement bases they used for each photon (e.g., `['+', 'x', '+', ...']`). They compare bases and keep only the bit positions where their bases matched, discarding roughly 50% of the transmitted bits to produce the Sifted Key.",
    explanation: "They announce ONLY the basis types, never the actual measured bit values.",
    hint: "Comparing chosen bases over a public channel and keeping only bits where their bases matched.",
    level: "Basic",
    codeExample: `// Sifting Phase:
// Alice Basis : [ +,  x,  x,  + ] | Bits: [ 1, 0, 1, 0 ]
// Bob Basis   : [ +,  +,  x,  x ] | Bits: [ 1, ?, 1, ? ]
// Match Check : [YES, NO, YES, NO]
// Sifted Key  : Alice = [1, 1], Bob = [1, 1] (50% Kept ✔)`
  },
  {
    id: 4,
    question: "What is the Quantum Bit Error Rate (QBER) and why does an Intercept-Resend attack by Eve produce a theoretical QBER of 25%?",
    shortAnswer: "QBER is the fraction of mismatched bits in the sifted key. Under an Intercept-Resend attack, Eve guesses the wrong basis 50% of the time. When Bob measures with Alice's original basis, quantum collapse gives him the wrong bit 50% of the time on those wrong-basis photons ($0.5 \\times 0.5 = 0.25 = 25\\%$).",
    explanation: "A 25% error spike immediately exposes the presence of an eavesdropper.",
    hint: "Eve guesses wrong basis 50% of time, causing 50% bit errors on those photons: 0.5 * 0.5 = 25% error.",
    level: "Moderate",
    codeExample: `// QBER Calculation:
// Eve intercepts all photons:
// P(Eve wrong basis) = 50%
// P(Bob error | Eve wrong basis) = 50%
// Total Induced QBER = 50% * 50% = 25.0% 🚨`
  },
  {
    id: 5,
    question: "What is the maximum theoretical QBER security threshold (Shor-Preskill Bound) above which a BB84 exchange must be aborted?",
    shortAnswer: "The Shor-Preskill security bound establishes that if $\\text{QBER} \\le 11.0\\%$, Alice and Bob can apply error correction and privacy amplification to extract a perfectly secret key. If $\\text{QBER} > 11.0\\%$, the mutual information between Eve and the key exceeds the mutual information between Alice and Bob, requiring the exchange to be aborted.",
    explanation: "11% is the universal mathematical threshold for security in single-photon BB84.",
    hint: "11.0% is the maximum tolerable error rate threshold before QKD exchange must be aborted.",
    level: "Moderate",
    codeExample: `// Security Threshold:
// QBER <= 11.0% ➔ Error Correction + Privacy Amplification ➔ SECURE KEY ✔
// QBER > 11.0%  ➔ ABORT EXCHANGE (Eve detected or optical line compromised) 🚨`
  },
  {
    id: 6,
    question: "Explain the two post-processing phases: Cascade Error Correction and Privacy Amplification.",
    shortAnswer: "1. Cascade / LDPC Error Correction: Reconciles minor optical fiber transmission errors through parity-block interactive exchanges over the classical channel. 2. Privacy Amplification: Applies a 2-Universal Hash Function (e.g., Toeplitz Matrix multiplication) to compress the reconciled key, reducing its length to eliminate any partial information Eve might have gained.",
    explanation: "Privacy amplification compresses the key to zero out Eve's Shannon mutual information.",
    hint: "Error correction fixes minor noise; Privacy amplification uses hashing to eliminate Eve's partial knowledge.",
    level: "Expert",
    codeExample: `// Post-Processing Pipeline:
// Sifted Key (1000 bits, 2% noise) ➔ [Cascade Error Correction] ➔ Reconciled Identical Keys
// ➔ [Toeplitz Matrix Hash] ➔ Final Unconditional Secret Key (512 bits) ✔`
  },
  {
    id: 7,
    question: "What is the Photon Number Splitting (PNS) Attack on practical QKD systems using weak coherent laser pulses?",
    shortAnswer: "Practical QKD lasers emit faint laser pulses following a Poisson distribution where ~1-2% of pulses contain 2 or more identical photons. In a PNS attack, Eve splits off 1 photon, stores it in quantum memory, and forwards the remaining photon to Bob undisturbed. During the sifting phase, Eve measures her stored photon with the announced basis, obtaining 100% of the key with ZERO induced QBER!",
    explanation: "PNS attacks break naive faint-pulse QKD without triggering error alarms.",
    hint: "Eve splits multi-photon pulses, keeping one photon in memory to measure later with zero induced error.",
    level: "Expert",
    codeExample: `// PNS Attack:
// Laser pulse contains 2 photons -> Eve steals 1 photon, sends 1 to Bob -> Zero QBER induced! 🚨`
  },
  {
    id: 8,
    question: "How does the Decoy State Protocol (Hwang 2003) defeat the Photon Number Splitting (PNS) attack?",
    shortAnswer: "Alice intentionally and randomly varies the laser intensity between Signal pulses (mean photon number $\\mu \\approx 0.5$) and Decoy pulses (weaker $\\nu \\approx 0.1$ or vacuum states). Because Eve cannot distinguish a signal pulse from a decoy pulse in flight, any attempt to selectively split multi-photon pulses alters the statistical transmittance ratio between signal and decoy states, immediately exposing Eve.",
    explanation: "Decoy states enable practical, provably secure QKD over 100+ km using standard telecom laser diodes.",
    hint: "Interspersing pulses of varying photon intensities; Eve's selective splitting distorts decoy statistics.",
    level: "Expert",
    codeExample: `// Decoy State Verification:
// If Eve performs PNS: Transmittance(Decoy) / Transmittance(Signal) deviates from theoretical Poisson ratio ➔ ATTACK DETECTED!`
  },
  {
    id: 9,
    question: "What is the physical distance limit of fiber-optic QKD and why can traditional optical amplifiers (EDFAs) NOT be used?",
    shortAnswer: "Single-photon attenuation in standard optical fiber ($0.2\\text{ dB/km}$ at 1550nm) limits point-to-point QKD to roughly 100–150 km. Classical optical amplifiers (Erbium-Doped Fiber Amplifiers - EDFAs) CANNOT be used because amplification requires stimulated emission, which violates the No-Cloning Theorem and destroys quantum entanglement.",
    explanation: "Amplifying quantum states introduces noise that destroys quantum phase information.",
    hint: "Fiber attenuation limits distance to ~150km; optical amplifiers destroy quantum states (No-Cloning Theorem).",
    level: "Moderate",
    codeExample: `// Optical Attenuation:
// At 100 km : 99% of photons absorbed
// At 200 km : 99.99% absorbed -> Signal drowned in detector dark count noise.`
  },
  {
    id: 10,
    question: "What is a Trusted Node / Trusted Relay in long-distance terrestrial QKD networks?",
    shortAnswer: "A physically secured bunker/repeater station that sits at the midpoint between Alice and Bob. Alice establishes a QKD key $K_1$ with the trusted node; the node establishes a QKD key $K_2$ with Bob. The node securely XORs the keys ($K_1 \\oplus K_2$) to route the secret key across long distances.",
    explanation: "The major vulnerability is that the trusted node has plaintext access to the key, requiring physical security guards and biometric isolation.",
    hint: "Secured physical relay stations that bridge 100km links; nodes have access to plaintext keys.",
    level: "Moderate",
    codeExample: `// Trusted Node Relay:
// Alice <---(QKD K1)---> [Trusted Bunker] <---(QKD K2)---> Bob
// Bunker transmits K1 ^ K2 -> Bob computes K2 ^ (K1 ^ K2) = K1 ✔`
  },
  {
    id: 11,
    question: "What is a Quantum Repeater and how does it use Quantum Entanglement Swapping to overcome distance limits without trusted nodes?",
    shortAnswer: "Quantum Repeaters distribute entangled photon pairs across short segments, store them in Quantum Memories, and perform Bell State Measurements (Entanglement Swapping) at intermediate nodes to teleport entanglement across thousands of kilometers without ever measuring or converting photons into classical bits.",
    explanation: "Quantum repeaters enable true end-to-end quantum networks without requiring trusted physical intermediate nodes.",
    hint: "Uses quantum memories and entanglement swapping to extend quantum links without reading keys.",
    level: "Expert",
    codeExample: `// Entanglement Swapping:
// Pair 1: (A, B1) | Pair 2: (B2, C)
// Node B performs Bell Measurement on (B1, B2) ➔ Photons A and C become entangled across 1,000 km!`
  },
  {
    id: 12,
    question: "What is Satellite-based QKD and how does it bypass atmospheric and fiber optical attenuation?",
    shortAnswer: "Free-space satellite QKD sends polarized single photons from Low Earth Orbit (LEO) satellites down to terrestrial ground stations through the vacuum of space (where optical attenuation is near zero, with absorption occurring only in the bottom 10 km of the atmosphere), enabling global intercontinental key distribution across 7,000+ km.",
    explanation: "China's Micius satellite (2016) demonstrated intercontinental QKD between Beijing and Vienna.",
    hint: "Sends photons through the vacuum of space where attenuation is near zero, enabling 7000km+ QKD.",
    level: "Basic",
    codeExample: `// Satellite QKD:
// LEO Satellite (500 km orbit) ➔ Optical Laser Beam ➔ Kolkata Ground Station Telescope (Key Rate: 2.5 kbps)`
  },
  {
    id: 13,
    question: "Why does the public classical channel in QKD REQUIRE Authentication?",
    shortAnswer: "If the classical sifting channel is unauthenticated, an active Man-in-the-Middle (Mallory) can intercept all classical messages, establishing a separate QKD key with Alice ($K_A$) and a separate key with Bob ($K_B$), masquerading as Bob to Alice and Alice to Bob without being detected.",
    explanation: "QKD requires pre-shared symmetric keys or post-quantum digital signatures (Wegman-Carter authentication) on the classical channel.",
    hint: "Without authentication, a Man-in-the-Middle can impersonate Bob to Alice and Alice to Bob.",
    level: "Basic",
    codeExample: `// Wegman-Carter Authentication:
// Sifting messages are signed using pre-shared symmetric authentication tag: Tag = Hash_K(Message)`
  },
  {
    id: 14,
    question: "What is the E91 Protocol (Ekert 1991) and how does it differ from BB84?",
    shortAnswer: "While BB84 uses single polarized photons prepared by Alice (prepare-and-measure), E91 uses pairs of maximally entangled photons (EPR pairs) emitted from a central source to Alice and Bob. Security is verified by testing Bell's Inequality ($S \\le 2\\sqrt{2}$ vs classical $S \\le 2$); any eavesdropping destroys quantum non-locality.",
    explanation: "E91 provides Device-Independent security because security is proven by Bell inequality violation without trusting the photon source.",
    hint: "Uses entangled photon pairs and tests Bell's Inequality; any eavesdropping destroys quantum entanglement.",
    level: "Expert",
    codeExample: `// Bell's Inequality Test (CHSH):
// S = |E(a, b) - E(a, b') + E(a', b) + E(a', b')|
// Quantum Maximum: S = 2 * sqrt(2) ≈ 2.828 (Proves NO Eavesdropper exists ✔)`
  },
  {
    id: 15,
    question: "What is Device-Independent QKD (DI-QKD)?",
    shortAnswer: "A quantum key distribution architecture where the security of the generated key is mathematically guaranteed by the violation of Bell's Inequality, REGARDLESS of whether the optical hardware, laser sources, or single-photon detectors were manufactured by a malicious, untrusted vendor.",
    explanation: "DI-QKD eliminates all physical hardware side-channel attacks (detector blinding, Trojan horse probes).",
    hint: "Security proven purely by Bell test violation without having to trust the physical hardware devices.",
    level: "Expert",
    codeExample: `// DI-QKD Security:
// Bell Violation S = 2.81 ➔ Mathematically proves key is secret even if detectors are backdoored!`
  },
  {
    id: 16,
    question: "What is the Detector Blinding Attack on practical avalanche photodiode (APD) QKD receivers?",
    shortAnswer: "An active physical side-channel attack where Eve shines a continuous bright classical laser into Bob's Single-Photon Avalanche Diodes (SPADs), blinding them and forcing them out of Geiger mode into linear photodiode mode. Eve can now control Bob's exact measurement outputs by pulsing laser intensities above a classical threshold.",
    explanation: "Mitigated by Measurement-Device-Independent QKD (MDI-QKD) and random detector efficiency monitoring.",
    hint: "Shining bright lasers to blind single-photon detectors, controlling Bob's measurements classically.",
    level: "Expert",
    codeExample: `// Blinding Attack:
// Continuous Wave Laser (1mW) ➔ Blinds APD ➔ Eve sends pulsed trigger ➔ Forces Bob to record Eve's chosen bit.`
  },
  {
    id: 17,
    question: "What is Measurement-Device-Independent QKD (MDI-QKD)?",
    shortAnswer: "Alice and Bob both send single photons to an untrusted third party (Charlie) located in the middle, who performs a Bell State Measurement on the interfering photons and announces the result. Even if Charlie is malicious or attempts detector blinding, he learns zero information about the key.",
    explanation: "MDI-QKD completely removes all detector-side physical vulnerabilities from QKD implementations.",
    hint: "Alice and Bob send photons to an untrusted central detector; immune to all detector attacks.",
    level: "Expert",
    codeExample: `// MDI-QKD Architecture:
// [Alice (Laser)] ➔ Photons ➔ [Untrusted Charlie (Detector)] ◄- Photons ◄- [Bob (Laser)]
// (Charlie learns 0 bits of key)`
  },
  {
    id: 18,
    question: "What is Continuous-Variable QKD (CV-QKD) vs Discrete-Variable QKD (DV-QKD)?",
    shortAnswer: "DV-QKD (BB84) encodes key bits onto discrete quantum properties (photon polarization or time-bins) using costly single-photon detectors. CV-QKD encodes key bits onto the continuous quadratures ($X$ and $P$) of coherent optical electromagnetic fields, measured using standard telecom homodyne/heterodyne receivers.",
    explanation: "CV-QKD co-exists with standard telecom wavelength-division multiplexing (WDM) infrastructure more easily.",
    hint: "DV-QKD uses single-photon polarization; CV-QKD uses continuous wave quadratures with homodyne detectors.",
    level: "Moderate",
    codeExample: `// QKD Variants:
// DV-QKD : Single-photon APD detectors (Requires dark fiber, high cost)
// CV-QKD : Standard coherent telecommunication transceivers (Runs on existing fiber infrastructure)`
  },
  {
    id: 19,
    question: "How does QKD enable Information-Theoretic Security when paired with the One-Time Pad (Vernam Cipher)?",
    shortAnswer: "The One-Time Pad (OTP) requires a truly random symmetric key that is equal in length to the plaintext, used only once, and kept completely secret. QKD continuously generates fresh, truly random symmetric key bits at high speeds. Encrypting data via $C = P \\oplus K_{\\text{QKD}}$ is mathematically unbreakable even with infinite computing power.",
    explanation: "Claude Shannon proved in 1949 that OTP is the ONLY cipher with unconditional information-theoretic secrecy.",
    hint: "QKD provides endless fresh random keys to feed the One-Time Pad, achieving unbreakable secrecy.",
    level: "Basic",
    codeExample: `// Unbreakable OTP + QKD:
// Ciphertext = Plaintext ^ QKD_Generated_Key (Perfect Secrecy: H(M | C) = H(M))`
  },
  {
    id: 20,
    question: "What is the Trojan-Horse Optical Attack on QKD laser transmitters?",
    shortAnswer: "An active attack where Eve sends bright optical probe pulses into Alice's transmitter station and analyzes the back-reflected light from Alice's internal phase/polarization modulators to read Alice's basis and bit choices before the photon ever leaves the station.",
    explanation: "Mitigated by inserting optical isolators, bandpass filters, and fiber attenuators at Alice's output port.",
    hint: "Sending probe pulses into Alice's transmitter to measure internal modulator reflections.",
    level: "Expert",
    codeExample: `// Trojan Probe:
// Eve Probe Light ➔ Enters Alice's Modulator ➔ Measures back-reflection phase ➔ Infers Alice's basis!`
  },
  {
    id: 21,
    question: "What is Dark Count Rate in single-photon avalanche detectors and how does it contribute to baseline QBER?",
    shortAnswer: "Dark counts are false electronic detection pulses triggered by thermal fluctuations in the detector crystal when no actual photon arrived. Dark counts create random 0/1 bits, establishing a baseline intrinsic optical error rate ($1\\% - 3\\%$ QBER) even in the complete absence of an eavesdropper.",
    explanation: "Detectors are cooled to $-50^\\circ\\text{C}$ with Peltier coolers to suppress thermal dark counts.",
    hint: "False detector clicks caused by thermal noise that create a baseline 1-3% error rate in clean fiber.",
    level: "Moderate",
    codeExample: `// Baseline Noise:
// QBER_Total = QBER_Optical_Misalignment (~1%) + QBER_Dark_Counts (~1%) = ~2.0% (Normal operation ✔)`
  },
  {
    id: 22,
    question: "What is Time-Bin Encoding in fiber-optic QKD and why is it preferred over polarization encoding in buried fiber?",
    shortAnswer: "Buried optical fibers experience mechanical vibrations, bending, and thermal fluctuations that cause polarization mode dispersion (birefringence), rotating photon polarization randomly. Time-bin encoding encodes bits as Early vs Late time arrival slots or relative phase shifts ($|\\text{early}\\rangle + e^{i\\phi}|\\text{late}\\rangle$) in an interferometer, which is stable over thousands of kilometers.",
    explanation: "Time-bin encoding eliminates polarization drift in commercial telecom dark fibers.",
    hint: "Encodes bits into early/late arrival time slots, which resist fiber bending and polarization drift.",
    level: "Expert",
    codeExample: `// Time-Bin States:
// Bit 0 = |Early> | Bit 1 = |Late> | Phase States = (|Early> + |Late>) / sqrt(2)`
  },
  {
    id: 23,
    question: "What is Key Generation Rate (Secret Key Rate - SKR) and what parameters determine it?",
    shortAnswer: "The number of final secure cryptographic key bits produced per second: $\\text{SKR} = R_{\\text{pulse}} \\cdot \\eta_{\\text{channel}} \\cdot \\eta_{\\text{det}} \\cdot [1 - H_2(\\text{QBER}) - \\text{leak}_{\\text{EC}}]$. It depends on laser repetition rate, fiber attenuation, detector quantum efficiency, and error correction leakage.",
    explanation: "Typical modern commercial QKD links generate between 1 kbps and 100 kbps of secure key material over 50 km.",
    hint: "Rate of final key bits generated per second; depends on laser speed, fiber losses, and error rates.",
    level: "Moderate",
    codeExample: `// SKR Calculation:
// Laser Repetition: 1 GHz ➔ Raw: 10 Mbps ➔ Sifted: 5 Mbps ➔ Post-processed: 25 kbps final secret key rate.`
  },
  {
    id: 24,
    question: "Why can QKD NOT be used for direct digital signatures or data storage?",
    shortAnswer: "QKD is strictly a Symmetric Key Distribution protocol between two active, communicating online endpoints across a physical quantum optical channel. It cannot encrypt data directly, sign documents, or protect stored data at rest; it serves exclusively to generate shared symmetric keys to feed symmetric ciphers (AES/OTP).",
    explanation: "Post-Quantum Cryptography (PQC) is required for digital signatures, PKI certificates, and asynchronous messaging.",
    hint: "QKD only generates shared symmetric keys between active endpoints; it cannot sign documents or encrypt data at rest.",
    level: "Basic",
    codeExample: `// QKD Scope:
// QKD generates AES key ➔ AES-256 encrypts data ➔ Transmitted over classical network.`
  },
  {
    id: 25,
    question: "What is the B92 Protocol (Bennett 1992) and how is it a simplified 2-state version of BB84?",
    shortAnswer: "B92 uses only TWO non-orthogonal polarization states (e.g., $|0^\\circ\\rangle$ and $|+45^\\circ\\rangle$) instead of four. Alice sends 0 as $|0^\\circ\\rangle$ and 1 as $|+45^\\circ\\rangle$. Bob measures using orthogonal projection filters; conclusive clicks reveal Alice's bits.",
    explanation: "B92 simplifies hardware by eliminating two optical bases, but is more sensitive to channel noise and PNS attacks.",
    hint: "Simplified QKD protocol using only 2 non-orthogonal states instead of 4.",
    level: "Moderate",
    codeExample: `// B92 States:
// Bit 0 = |0°> (Horizontal) | Bit 1 = |+45°> (Diagonal)`
  },
  {
    id: 26,
    question: "How does QKD integrate with Classical Software-Defined Networking (SDN) and ETSI QKD API Standards?",
    shortAnswer: "The European Telecommunications Standards Institute (ETSI GS QKD 004 / 014) defines RESTful APIs allowing classical firewalls, routers, and IPsec VPN gateways (like Cisco/Fortinet) to request fresh symmetric keys from a centralized QKD Key Management System (KMS) on-demand.",
    explanation: "ETSI standards enable standard enterprise firewalls to consume QKD keys seamlessly over classical networks.",
    hint: "ETSI REST APIs allow enterprise routers and VPNs to request fresh QKD keys dynamically.",
    level: "Moderate",
    codeExample: `// ETSI QKD API Call:
// GET /api/v1/keys/target_node_kolkata/enc_keys -> Returns 256-bit quantum-distributed symmetric key.`
  },
  {
    id: 27,
    question: "What is the Quantum Random Number Generator (QRNG) in QKD systems?",
    shortAnswer: "Hardware devices that extract true randomness from non-deterministic quantum processes (e.g., photon arrival times, phase noise of laser diodes, vacuum fluctuations) rather than pseudo-random mathematical algorithms, providing true entropy for Alice and Bob's basis selections.",
    explanation: "True quantum entropy is essential to ensure Eve cannot predict Alice's chosen bases.",
    hint: "Hardware device generating true physical randomness from quantum photon fluctuations.",
    level: "Basic",
    codeExample: `// QRNG Generation:
// Laser Phase Jitter ➔ ADC Sampling ➔ True Unpredictable Quantum Entropy Stream.`
  },
  {
    id: 28,
    question: "What is the difference between Discrete Variable (DV) Single-Photon Detectors (SNSPDs vs SPADs)?",
    shortAnswer: "SPADs (Single-Photon Avalanche Diodes) operate at room or Peltier temperatures with ~20-30% quantum efficiency and higher dark counts. SNSPDs (Superconducting Nanowire Single-Photon Detectors) operate at cryogenic temperatures (0.8–2 Kelvin), achieving > 98% quantum efficiency and ultra-low dark counts (< 1 Hz), enabling QKD records exceeding 400 km.",
    explanation: "SNSPDs are the state-of-the-art detector technology for high-performance quantum optical links.",
    hint: "SPADs are semiconductor diodes; SNSPDs are cryogenic superconducting nanowires with 98%+ efficiency.",
    level: "Expert",
    codeExample: `// Detector Comparison:
// SPAD  : 25% Efficiency | 500 Hz Dark Counts | Peltier Cooled (-50°C)
// SNSPD : 98% Efficiency | 0.5 Hz Dark Counts | Cryogenic Cooled (1.5 K)`
  },
  {
    id: 29,
    question: "In the Barrackpore-to-Kolkata municipal optical QKD link deployment (28 km dark fiber), an optical splicer tap was attempted by an attacker. How did the BB84 protocol detect the physical fiber tap and maintain secrecy?",
    shortAnswer: "The attacker's physical tap intercepted photons and performed basis measurements (Intercept-Resend), which disturbed the delicate quantum superposition states and triggered an immediate spike in the Quantum Bit Error Rate (QBER) from 1.8% to 26.4%. Because 26.4% exceeded the 11.0% Shor-Preskill threshold, the automated QKD system aborted the key exchange and raised a physical tampering alarm.",
    explanation: "The physical intrusion was detected by quantum state collapse before any usable cryptographic key bits were compromised.",
    hint: "Intercepting photons caused QBER to spike from 1.8% to 26.4%, instantly exceeding the 11% threshold and aborting.",
    level: "Expert",
    codeExample: `// Forensic Incident Log:
// Baseline QBER: 1.8% ✔
// 14:22:04 IST: Physical fiber tap attached ➔ QBER spikes to 26.4% 🚨
// 14:22:05 IST: Auto-Abort triggered: Zero key bits leaked; Security Ops notified of optical breach!`
  },
  {
    id: 30,
    question: "Write out the comprehensive technical comparison between Quantum Key Distribution (QKD) and Post-Quantum Cryptography (PQC).",
    shortAnswer: "1. Security Basis: QKD is information-theoretically secure via Laws of Physics; PQC is computationally secure via hard math (Lattices). 2. Hardware: QKD requires dedicated optical fibers, single-photon lasers, and detectors; PQC runs as software on existing classical CPUs/smartphones. 3. Scope: QKD only distributes symmetric keys point-to-point; PQC supports digital signatures, PKI certificates, and asymmetric key encapsulation. 4. Distance: QKD is limited to ~150km without trusted nodes; PQC has unlimited global reach. 5. Optimal Architecture: Co-deployment where PQC authenticates QKD classical channels and QKD feeds One-Time Pads for crown-jewel links.",
    explanation: "QKD and PQC are complementary technologies that together form the ultimate quantum-resilient defense-in-depth architecture.",
    hint: "QKD is physics-based (needs optical fiber, 150km range, key exchange only); PQC is math-based (software-only, global reach, signatures & encryption).",
    level: "Expert",
    codeExample: `// QKD vs PQC Matrix:
// Metric        | QKD (BB84)                  | PQC (CRYSTALS-Kyber/Dilithium)
// Security      | Unconditional (Physics)      | Computational (Lattice Math)
// Deployment    | Dedicated Optical Hardware   | Pure Software on existing internet
// Distance      | ~150 km (Fiber Attenuation)  | Unlimited (Global internet)`
  }
];

export default questions;
