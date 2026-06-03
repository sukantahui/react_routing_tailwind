// topic3_files/topic3_questions.js
const questions = [
  {
    question: "Which encoding technique is used by 10Base-T Ethernet?",
    shortAnswer: "Manchester encoding.",
    explanation: "10Base-T Ethernet uses Manchester encoding where a low-to-high transition represents 1 and high-to-low represents 0. This provides clock recovery and no DC component.",
    hint: "Think of the classic Ethernet waveform with a transition in every bit period.",
    level: "basic",
    codeExample: "// Manchester encoding: bit 1 = low→high, bit 0 = high→low"
  },
  {
    question: "How does DSL allow voice and data on the same telephone line?",
    shortAnswer: "Using Frequency Division Multiplexing (FDM) — voice in 0-4 kHz, data in higher frequencies.",
    explanation: "A DSL splitter separates frequencies: voice (0-4 kHz), upstream (25-138 kHz), downstream (138-1104 kHz). This allows simultaneous use without interference.",
    hint: "Different lanes on the same highway — voice in the slow lane, data in the fast lanes.",
    level: "intermediate",
    codeExample: "ADSL: upstream 25-138 kHz, downstream 138-1104 kHz (DMT modulation)."
  },
  {
    question: "What is the data rate of a T1 line and how many voice channels does it carry?",
    shortAnswer: "1.544 Mbps, carrying 24 voice channels at 64 kbps each.",
    explanation: "T1 uses TDM with 24 time slots, each 8 bits, repeated 8000 times/sec: 24 × 8 × 8000 = 1.536 Mbps plus 8 kbps framing = 1.544 Mbps.",
    hint: "24 friends taking turns speaking for 1/8000 second each.",
    level: "basic",
    codeExample: "T1 frame: [F][Ch1][Ch2]...[Ch24] × 8000 frames/sec = 1.544 Mbps"
  },
  {
    question: "What does DWDM stand for and what is its typical capacity?",
    shortAnswer: "Dense Wavelength Division Multiplexing; typical capacity: 80-160 wavelengths × 100-400 Gbps = 8-64 Tbps per fiber.",
    explanation: "DWDM packs many closely spaced optical wavelengths (e.g., 50 GHz spacing) into the C-band (1530-1565 nm). Each wavelength carries a high-speed signal (e.g., 100G).",
    hint: "Like a rainbow with 80+ colors, each color carrying its own conversation.",
    level: "intermediate",
    codeExample: "80λ × 100 Gbps = 8 Tbps per fiber pair (enough for millions of HD streams)."
  },
  {
    question: "What switching technique does the traditional telephone network (PSTN) use?",
    shortAnswer: "Circuit switching.",
    explanation: "PSTN establishes a dedicated 64 kbps circuit for each call. The circuit is reserved for the duration of the conversation, then released.",
    hint: "Like a private line that only you and the other person can use until you hang up.",
    level: "basic",
    codeExample: "Call phases: Setup → Data transfer (talk) → Teardown"
  },
  {
    question: "What switching technique does the internet use at the network layer?",
    shortAnswer: "Packet switching (datagram / connectionless).",
    explanation: "IP uses datagram packet switching: each packet is routed independently based on destination address. No circuit setup; packets may take different paths.",
    hint: "Each letter (packet) has a full address and finds its own way.",
    level: "basic",
    codeExample: "IP packet has src/dst addresses; routers forward based on routing table."
  },
  {
    question: "What is the difference between 10Base-T Manchester and 100Base-TX encoding?",
    shortAnswer: "10Base-T uses Manchester; 100Base-TX uses MLT-3 (Multi-Level Transmit) encoding.",
    explanation: "Manchester requires 20 MHz bandwidth for 10 Mbps (inefficient). MLT-3 uses three voltage levels and reduces bandwidth to ~31.25 MHz for 100 Mbps.",
    hint: "Faster Ethernet needs more efficient encoding to fit on the same cable.",
    level: "advanced",
    codeExample: "MLT-3 cycles through +1, 0, -1, 0 voltage levels, transitions only on 1 bits."
  },
  {
    question: "What is a DSL splitter and why is it needed?",
    shortAnswer: "A passive filter that separates voice (0-4 kHz) from DSL data frequencies to prevent interference.",
    explanation: "Without a splitter, voice calls would hear data noise, and data would be corrupted by voice. The splitter is installed at the customer premises and at the central office.",
    hint: "Like a traffic cop directing low frequencies to the phone and high frequencies to the modem.",
    level: "intermediate",
    codeExample: "Splitter: low-pass filter (voice) and high-pass filter (data)."
  },
  {
    question: "What is the framing bit in a T1 frame used for?",
    shortAnswer: "Synchronization — to identify the start of each frame and maintain alignment.",
    explanation: "The framing bit (1 bit per frame) alternates in a known pattern (e.g., 101010...). The receiver locks onto this pattern to know where each time slot begins.",
    hint: "Like the tick of a metronome keeping the beat for the 24 channels.",
    level: "intermediate",
    codeExample: "T1 superframe: 12 frames, framing bits form pattern 100011011100."
  },
  {
    question: "What is an EDFA and why is it critical for DWDM?",
    shortAnswer: "Erbium-Doped Fiber Amplifier — amplifies all DWDM wavelengths simultaneously without O/E/O conversion.",
    explanation: "EDFA uses erbium-doped fiber pumped by a laser to amplify signals in the C-band (1530-1565 nm). It can boost 80+ wavelengths at once, enabling transoceanic cables.",
    hint: "A loudspeaker for light — makes all colors louder together.",
    level: "advanced",
    codeExample: "EDFA gain: 20-30 dB, noise figure ~5 dB, output power up to +23 dBm."
  },
  {
    question: "How does the internet provide reliability if packet switching can drop packets?",
    shortAnswer: "Upper-layer protocols like TCP provide reliability via acknowledgments and retransmissions.",
    explanation: "IP packet switching is best-effort (may drop, reorder, duplicate). TCP runs on top of IP and adds sequence numbers, ACKs, timeouts, and retransmission to ensure reliable byte-stream delivery.",
    hint: "The post office (IP) may lose letters, but the registered mail service (TCP) tracks and resends.",
    level: "intermediate",
    codeExample: "TCP: send packet, wait for ACK, if timeout → retransmit."
  },
  {
    question: "What is the role of a ROADM in DWDM networks?",
    shortAnswer: "Reconfigurable Optical Add-Drop Multiplexer — allows individual wavelengths to be added or dropped at a node without O/E/O conversion.",
    explanation: "ROADMs use wavelength-selective switches (WSS) to direct any wavelength to any output port. This enables flexible optical networking and dynamic reconfiguration.",
    hint: "Like a sorting machine that can separate and redirect specific colors of light.",
    level: "expert",
    codeExample: "Colorless, directionless, contentionless ROADMs are used in modern backbone networks."
  },
  {
    question: "Why does 10Base-T Ethernet use Manchester encoding instead of NRZ?",
    shortAnswer: "To provide clock recovery and eliminate DC component.",
    explanation: "NRZ has long runs of same voltage, making clock recovery difficult. Manchester has a transition in every bit period, so the receiver can always recover the clock. No DC component allows transformer coupling.",
    hint: "Manchester gives a heartbeat in every bit; NRZ can flatline for many bits.",
    level: "intermediate",
    codeExample: "10Base-T: each bit has a transition → receiver stays synchronized."
  },
  {
    question: "What is the difference between ADSL and VDSL?",
    shortAnswer: "ADSL (Asymmetric DSL) has higher downstream than upstream; VDSL (Very-high-bitrate DSL) offers higher speeds but over shorter distances.",
    explanation: "ADSL: up to 24 Mbps down, 3.5 Mbps up, range ~5 km. VDSL: up to 100-200 Mbps, range ~1 km. VDSL2 uses more spectrum (up to 30 MHz) for higher speeds.",
    hint: "VDSL is like a sports car — faster but can't go as far without refueling.",
    level: "advanced",
    codeExample: "VDSL2 profile 30a: 30 MHz bandwidth, 100-200 Mbps aggregate."
  },
  {
    question: "What is a 'time-slot interchanger' (TSI) in a telephone exchange?",
    shortAnswer: "A TSI moves data from an incoming time slot to an outgoing time slot using memory, enabling TDM switching.",
    explanation: "The TSI writes incoming time slots into a memory buffer at one address, then reads them out in a different order to switch calls. This is the core of digital circuit switching.",
    hint: "Like rearranging the order of cards in a deck to change connections.",
    level: "expert",
    codeExample: "A 1024x1024 TSI can switch 1024 simultaneous 64 kbps calls."
  },
  {
    question: "What is the typical wavelength range for DWDM in the C-band?",
    shortAnswer: "1530 nm to 1565 nm (approximately).",
    explanation: "The C-band (conventional band) is where EDFAs provide the best gain. DWDM channels are spaced at 100 GHz (≈0.8 nm) or 50 GHz (≈0.4 nm) within this range.",
    hint: "Think of the C-band as the sweet spot for fiber amplifiers.",
    level: "intermediate",
    codeExample: "ITU-T DWDM grid: channel 20 = 1550.12 nm, channel 21 = 1550.92 nm (100 GHz spacing)."
  },
  {
    question: "What is the purpose of the 'guard time' in TDM?",
    shortAnswer: "To prevent overlap between time slots due to clock drift or propagation delay.",
    explanation: "In TDM, guard times are small gaps between slots that account for timing inaccuracies and signal propagation. In satellite TDMA, guard times are larger due to long distances.",
    hint: "Like the pause between speeches so the next speaker doesn't start too early.",
    level: "intermediate",
    codeExample: "In satellite TDMA, guard times of several microseconds account for 250 ms round-trip delay."
  },
  {
    question: "How does a DSL modem achieve high speeds using DMT?",
    shortAnswer: "Discrete Multi-Tone divides the frequency band into hundreds of subcarriers, each modulated with QAM, and adapts bit loading per subcarrier based on SNR.",
    explanation: "DMT (a form of FDM) uses up to 256 subcarriers (4.3125 kHz each). The modem measures noise on each subcarrier and assigns more bits to good subcarriers, fewer to noisy ones.",
    hint: "Like a smart driver that uses fast lanes when clear and slow lanes when congested.",
    level: "advanced",
    codeExample: "ADSL: 256 subcarriers, each carrying 2-15 bits via QAM."
  },
  {
    question: "What is a 'pseudowire' in the context of circuit emulation?",
    shortAnswer: "A pseudowire emulates a point-to-point circuit (like T1/E1) over a packet-switched network (IP/MPLS).",
    explanation: "Pseudowires encapsulate TDM traffic into packets, send them across a packet network, and reconstruct the original TDM stream at the far end, preserving timing.",
    hint: "Tunneling an old-school circuit through a modern packet network.",
    level: "expert",
    codeExample: "SAToP (Structure-Agnostic TDM over Packet) for T1/E1 pseudowires."
  },
  {
    question: "Why does the internet use packet switching instead of circuit switching?",
    shortAnswer: "Packet switching is more efficient for bursty data traffic, scalable, and robust to failures.",
    explanation: "Data traffic is bursty (idle periods). Circuit switching would waste bandwidth. Packet switching allows statistical multiplexing, sharing links among many users. It also reroutes around failures automatically.",
    hint: "Packet switching = many cars sharing a highway; circuit switching = each car gets its own private lane (wasteful).",
    level: "intermediate",
    codeExample: "Web browsing: packets only sent when you click a link; idle times use no bandwidth."
  },
  {
    question: "What is the difference between E1 and T1 framing?",
    shortAnswer: "T1: 24 time slots + 1 framing bit (1.544 Mbps). E1: 32 time slots (30 voice + 2 signaling/framing) at 2.048 Mbps.",
    explanation: "T1 is North American standard; E1 is European/ITU standard. E1 has 8 bits per slot × 32 slots × 8000 = 2.048 Mbps. Slots 0 and 16 are used for framing and signaling.",
    hint: "E1 has more slots (32 vs 24) and higher bitrate.",
    level: "intermediate",
    codeExample: "E1 frame: [Slot0 framing][Slot1][Slot2]...[Slot16 signaling]...[Slot31]"
  },
  {
    question: "What is 'wavelength conversion' in optical networks and why is it useful?",
    shortAnswer: "Wavelength conversion changes a signal from one wavelength to another, resolving wavelength contention and improving network efficiency.",
    explanation: "Without conversion, a lightpath must use the same wavelength end-to-end (wavelength continuity constraint). Conversion allows different wavelengths on different links, increasing capacity.",
    hint: "Like changing the color of a car to fit into different lanes.",
    level: "expert",
    codeExample: "OEO (optical-electrical-optical) conversion or all-optical wavelength converters using SOAs."
  },
  {
    question: "What is the maximum distance for VDSL2 compared to ADSL2+?",
    shortAnswer: "ADSL2+: ~5 km; VDSL2: ~1-1.5 km for high speeds (100 Mbps).",
    explanation: "Higher frequencies used by VDSL2 attenuate more rapidly over distance. At shorter distances, VDSL2 achieves much higher speeds. For long loops, ADSL is still used.",
    hint: "VDSL is faster but needs to be closer to the telephone exchange.",
    level: "advanced",
    codeExample: "VDSL2 at 300 m: 200 Mbps; at 1 km: 100 Mbps; at 2 km: 30 Mbps."
  },
  {
    question: "What is the purpose of the 'line coding' in T1/E1 (e.g., B8ZS, HDB3)?",
    shortAnswer: "To ensure sufficient transitions for clock recovery and to avoid DC bias.",
    explanation: "T1/E1 use AMI (Alternate Mark Inversion) which has no DC but fails with long zeros. B8ZS (T1) and HDB3 (E1) replace long zero strings with special patterns containing pulses to maintain clock sync.",
    hint: "Like inserting artificial heartbeats when the line goes quiet.",
    level: "expert",
    codeExample: "B8ZS replaces 8 consecutive zeros with '000VB0VB' pattern."
  },
  {
    question: "What is 'optical cross-connect' (OXC) used for?",
    shortAnswer: "An OXC switches optical signals from input fibers to output fibers at the wavelength level.",
    explanation: "OXCs are used in DWDM backbone nodes to route wavelengths without O/E/O conversion. They can be based on MEMS mirrors, liquid crystal, or wavelength-selective switches.",
    hint: "A giant patch panel for light beams.",
    level: "expert",
    codeExample: "A 1000x1000 OXC can switch 1000 incoming fibers each with 80 wavelengths."
  },
  {
    question: "Why is jitter a problem for circuit-switched voice but less so for packet-switched data?",
    shortAnswer: "Voice requires continuous playout; data can buffer and tolerate variable delay.",
    explanation: "Circuit switching provides constant delay (low jitter). Packet switching introduces queuing delay variation (jitter). Voice needs jitter buffers, but if jitter exceeds buffer, calls break up. Data (like file download) tolerates jitter via TCP retransmissions.",
    hint: "Voice is a real-time stream; data is like a bucket you can fill unevenly.",
    level: "advanced",
    codeExample: "VoIP uses jitter buffers of 50-100 ms to smooth packet delay variation."
  },
  {
    question: "What is 'forward error correction' (FEC) in DWDM systems?",
    shortAnswer: "FEC adds redundant bits to the transmitted signal to detect and correct errors without retransmission.",
    explanation: "At high bitrates (100G+), optical SNR is limited. FEC (e.g., Reed-Solomon, LDPC) allows the receiver to correct bit errors, extending reach and relaxing laser specs.",
    hint: "Like a self-correcting puzzle — if a few pieces are wrong, you can figure out the correct ones.",
    level: "expert",
    codeExample: "100G DWDM uses SD-FEC (Soft Decision FEC) with 20-25% overhead, coding gain ~11 dB."
  },
  {
    question: "How does MPLS relate to circuit switching and packet switching?",
    shortAnswer: "MPLS is a hybrid: it uses virtual circuits (LSPs) but statistical multiplexing of packets like packet switching.",
    explanation: "MPLS (Multi-Protocol Label Switching) establishes Label Switched Paths (LSPs) similar to virtual circuits. However, packets from multiple LSPs share links statistically, like packet switching. It provides fast forwarding and traffic engineering.",
    hint: "MPLS = the best of both worlds: circuit-like paths with packet-like efficiency.",
    level: "advanced",
    codeExample: "MPLS label is 20 bits; routers forward based on label, not full IP lookup."
  },
  {
    question: "What is the typical reach of a DWDM system without regeneration?",
    shortAnswer: "1000-3000 km, depending on bitrate, fiber type, and number of channels.",
    explanation: "Modern DWDM with EDFA amplification and FEC can span 1500-2000 km for 100G signals. Longer distances require OEO regeneration or Raman amplification.",
    hint: "From New York to Denver or London to Moscow without electronic regeneration.",
    level: "expert",
    codeExample: "100G DWDM with EDFA every 80-100 km can reach 2000 km using advanced modulation (QPSK) and coherent detection."
  },
  {
    question: "What is the difference between 'store-and-forward' and 'cut-through' switching in Ethernet switches?",
    shortAnswer: "Store-and-forward receives entire frame before forwarding; cut-through forwards as soon as destination MAC is read.",
    explanation: "Store-and-forward allows error checking (CRC) but adds latency. Cut-through has lower latency but may forward corrupt frames. Some switches support adaptive cut-through.",
    hint: "Store-and-forward = read the whole letter; cut-through = glance at the address and pass it on.",
    level: "intermediate",
    codeExample: "Cut-through latency: ~1 μs for 64-byte frame; store-and-forward: ~5.12 μs (at 1 Gbps)."
  }
];

export default questions;