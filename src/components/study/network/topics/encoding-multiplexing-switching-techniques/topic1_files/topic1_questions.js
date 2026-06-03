// topic1_files/topic1_questions.js
const questions = [
  {
    question: "What is multiplexing in computer networks?",
    shortAnswer: "Multiplexing is a technique that combines multiple signals into one shared transmission medium.",
    explanation: "Multiplexing allows several data streams to share a single physical channel (like a cable or radio frequency) by dividing the channel's resources (time, frequency, or wavelength) among the users. This greatly increases efficiency and reduces cost.",
    hint: "Think of a highway with many cars (data) using the same road (channel) at the same time or in turns.",
    level: "basic",
    codeExample: "// No code, but think: a multiplexer (MUX) combines inputs; a demultiplexer (DEMUX) separates them."
  },
  {
    question: "What is the main difference between FDM and TDM?",
    shortAnswer: "FDM separates signals by frequency, TDM separates by time slots.",
    explanation: "In FDM, each user gets a permanent frequency band and transmits continuously. In TDM, each user gets a recurring time slot and uses the full channel bandwidth during that slot. FDM is analog-friendly; TDM is digital-friendly.",
    hint: "FDM = different lanes on a highway. TDM = same lane but cars take turns.",
    level: "basic",
    codeExample: "FDM: radio stations at 91.1, 93.5 MHz. TDM: T1 line with 24 time slots."
  },
  {
    question: "What is WDM and how does it relate to FDM?",
    shortAnswer: "WDM is frequency division multiplexing applied to light in optical fibers.",
    explanation: "WDM uses different wavelengths (colors) of laser light to carry separate signals through a single fiber. It is essentially FDM in the optical domain. Dense WDM (DWDM) packs many wavelengths (e.g., 80) with very narrow spacing (50 GHz).",
    hint: "Think of a rainbow: each color carries a different conversation.",
    level: "intermediate",
    codeExample: "A 100G DWDM system might use 80 wavelengths × 100 Gbps = 8 Tbps per fiber."
  },
  {
    question: "What are guard bands in FDM? Why are they needed?",
    shortAnswer: "Guard bands are unused frequency gaps between channels to prevent interference.",
    explanation: "Real filters cannot perfectly isolate adjacent frequencies. Guard bands provide a safety margin to avoid crosstalk. They reduce usable spectrum but are necessary for analog systems.",
    hint: "Like the empty space between parked cars so you don't ding the door.",
    level: "intermediate",
    codeExample: "FM radio: channels spaced 200 kHz apart but each signal only uses ±75 kHz → 50 kHz guard band."
  },
  {
    question: "What is statistical TDM (STDM) and how does it differ from synchronous TDM?",
    shortAnswer: "STDM allocates time slots dynamically based on traffic, unlike fixed slots in synchronous TDM.",
    explanation: "Synchronous TDM wastes slots when a user has no data. STDM (or asynchronous TDM) uses a buffer and assigns slots only to active users, using addressing to identify each user. It improves efficiency but adds complexity and variable delay.",
    hint: "STDM is like a taxi that picks up only passengers waiting, not empty seats.",
    level: "advanced",
    codeExample: "Ethernet's statistical multiplexing: packets from multiple computers share the same wire without fixed slots."
  },
  {
    question: "Name three real-world applications of FDM.",
    shortAnswer: "FM/AM radio broadcasting, cable television, and DSL (DMT modulation).",
    explanation: "Each radio station transmits at a different frequency. Cable TV uses frequency bands for each channel. DSL (Discrete MultiTone) splits the phone line into hundreds of sub-channels (tones) for data.",
    hint: "Think about turning the dial on an old radio.",
    level: "intermediate",
    codeExample: "ADSL uses frequencies: voice 0-4 kHz, upstream 25-138 kHz, downstream 138-1104 kHz."
  },
  {
    question: "What is the advantage of TDM over FDM for digital signals?",
    shortAnswer: "TDM avoids crosstalk, needs no guard bands, and handles bursty traffic better.",
    explanation: "Because TDM uses the full bandwidth for each time slot, there is no frequency separation issue. Digital signals can be easily buffered and scheduled. TDM also scales well with time-division switching (e.g., telephone exchanges).",
    hint: "TDM is like a meeting where only one person speaks at a time; no one interrupts.",
    level: "intermediate",
    codeExample: "T1 line: 24 channels × 64 kbps = 1.544 Mbps, with perfect isolation."
  },
  {
    question: "Explain the concept of 'time slot' and 'frame' in TDM.",
    shortAnswer: "A time slot is a fixed-duration interval assigned to a user; a frame is one cycle containing one slot for each user.",
    explanation: "In synchronous TDM, the frame repeats every N time slots. Each user gets a dedicated slot in every frame. The duration of a slot is the time needed to transmit a unit of data (e.g., one byte).",
    hint: "Frame = a round of turns in a game; each slot = a player's turn.",
    level: "basic",
    codeExample: "In a T1 frame (193 bits): 24 slots × 8 bits + 1 framing bit."
  },
  {
    question: "What is DWDM and why is it important for long-haul networks?",
    shortAnswer: "Dense Wavelength Division Multiplexing packs many closely spaced wavelengths, enabling terabits per second over a single fiber.",
    explanation: "DWDM uses precise lasers and filters to combine up to 160 wavelengths (each carrying 10-400 Gbps). It amplifies all wavelengths together using EDFA (Erbium-Doped Fiber Amplifier). This is the backbone of the internet.",
    hint: "Imagine a highway with 160 stacked lanes, each lane a different color light.",
    level: "advanced",
    codeExample: "A common DWDM grid: 50 GHz spacing (about 0.4 nm) around 1550 nm."
  },
  {
    question: "What is the main limitation of synchronous TDM?",
    shortAnswer: "It wastes bandwidth when some users have no data to send.",
    explanation: "In synchronous TDM, each user gets a fixed slot even if idle. This is inefficient for bursty traffic (like computer data). Statistical TDM solves this by dynamically allocating slots only to active users.",
    hint: "Like a classroom where every student gets the same speaking time even if they have nothing to say.",
    level: "intermediate",
    codeExample: "If 4 users share a line but only 2 are active, synchronous TDM still gives slots to the idle 2 → 50% waste."
  },
  {
    question: "How does a multiplexer differ from a multiple access protocol?",
    shortAnswer: "Multiplexing is a static or scheduled sharing from a single source; multiple access is dynamic sharing among independent transmitters.",
    explanation: "Multiplexing assumes a central multiplexer that combines signals (e.g., at a telephone exchange). Multiple access (like CSMA/CD, TDMA) involves many devices contending for the channel without a central coordinator.",
    hint: "Multiplexing = organized by a traffic cop. Multiple access = everyone tries to merge.",
    level: "advanced",
    codeExample: "TDM is multiplexing; Wi-Fi's CSMA/CA is multiple access."
  },
  {
    question: "What is crosstalk in FDM? How can it be reduced?",
    shortAnswer: "Crosstalk is signal leakage from one channel to another, reduced by guard bands and better filters.",
    explanation: "Nonlinearities in amplifiers or imperfect filters cause one frequency's energy to appear in another's band. Increasing guard bands, using sharp filters, and reducing transmit power helps. In digital systems, error correction can mitigate residual crosstalk.",
    hint: "Like hearing a neighbor's conversation through a wall — thicker walls (guard bands) help.",
    level: "intermediate",
    codeExample: "In cable TV, poor shielding causes adjacent channel interference (ACI)."
  },
  {
    question: "What is the difference between TDM and TDMA?",
    shortAnswer: "TDM is point-to-point multiplexing; TDMA is a multiple access scheme for shared medium (e.g., satellite, cellular).",
    explanation: "TDM is used between a multiplexer and demultiplexer (fixed assignment). TDMA allows many stations to share a channel by assigning time slots to each station, often with a reservation or contention mechanism.",
    hint: "TDM = one talker schedules turns. TDMA = many talkers agree on a schedule.",
    level: "advanced",
    codeExample: "GSM cellular uses TDMA: 8 time slots per carrier, each assigned to a different phone."
  },
  {
    question: "What is the purpose of a framing bit in TDM?",
    shortAnswer: "The framing bit allows the receiver to identify the start of each frame and synchronize.",
    explanation: "Without a unique marker, the receiver wouldn't know which slot belongs to which user. A special bit pattern (or a dedicated framing bit) is inserted at the beginning of each frame to establish alignment.",
    hint: "Like the first clapperboard in a movie shoot to sync audio and video.",
    level: "intermediate",
    codeExample: "T1 frame: 193 bits, first bit is the framing bit (alternates 1,0 pattern)."
  },
  {
    question: "Explain how WDM and TDM can be combined in a modern optical network.",
    shortAnswer: "Each wavelength (WDM) carries a high-speed TDM signal, e.g., 100 Gbps using time slots within the wavelength.",
    explanation: "In a DWDM system, each wavelength might transmit an OTN (Optical Transport Network) frame which itself contains TDM channels. This creates a hierarchical multiplexing: many TDM streams per wavelength, many wavelengths per fiber.",
    hint: "Like a bookshelf (WDM) where each book (wavelength) has chapters (TDM slots).",
    level: "expert",
    codeExample: "100G DWDM: 80 wavelengths × 100 Gbps (each 100G is 10 lanes of 10G TDM inside)."
  },
  {
    question: "What is the difference between circuit switching and TDM?",
    shortAnswer: "TDM is a multiplexing technique; circuit switching uses TDM (or FDM) to allocate resources for a connection.",
    explanation: "Circuit switching establishes a dedicated path; it often uses TDM or FDM to allocate capacity to that circuit. TDM alone is just the method of sharing, not the call setup and teardown.",
    hint: "TDM = the tool; circuit switching = the process of reserving the tool for a call.",
    level: "advanced",
    codeExample: "PSTN uses TDM circuits: each phone call gets a 64 kbps slot."
  },
  {
    question: "What are the main differences between synchronous and asynchronous TDM?",
    shortAnswer: "Synchronous TDM has fixed slots; asynchronous (statistical) TDM allocates slots dynamically with addressing.",
    explanation: "Synchronous TDM is simpler but wastes bandwidth. Asynchronous TDM uses a buffer and variable-length frames, requiring address headers. It is more efficient for bursty traffic but introduces variable delay and overhead.",
    hint: "Synchronous = bus with fixed stops every 5 min; asynchronous = bus only stops if someone is waiting.",
    level: "intermediate",
    codeExample: "Ethernet switch uses statistical multiplexing; SONET uses synchronous TDM."
  },
  {
    question: "How does OFDM relate to FDM and TDM?",
    shortAnswer: "OFDM is a special form of FDM with overlapping orthogonal subcarriers, often combined with TDM in time-frequency grids.",
    explanation: "Orthogonal Frequency Division Multiplexing divides the spectrum into many narrow subcarriers that are mathematically orthogonal, so guard bands are minimal. It also uses time slots (symbols), creating a 2D time-frequency resource grid (used in 4G/5G).",
    hint: "OFDM = many tiny FDM channels, each carrying a slow data rate, transmitted simultaneously.",
    level: "advanced",
    codeExample: "4G LTE: 15 kHz subcarrier spacing, 12 subcarriers = 180 kHz resource block, time slots of 0.5 ms."
  },
  {
    question: "What is the primary cost driver in WDM systems?",
    shortAnswer: "The lasers, especially tunable ones, and the optical filters/mux/demux components.",
    explanation: "Each wavelength requires a laser with precise frequency stability. Dense WDM requires temperature-controlled, narrow-linewidth lasers. Arrayed waveguide gratings (AWGs) for multiplexing are also expensive. Amplifiers (EDFAs) and dispersion compensation modules add cost.",
    hint: "Like having many different colored flashlights that must not drift in color.",
    level: "expert",
    codeExample: "A 40-channel DWDM system might cost $50k+ for optics, excluding fibers."
  },
  {
    question: "What is 'guard time' in TDM and why is it needed?",
    shortAnswer: "Guard time is a small gap between time slots to prevent overlap due to timing errors or propagation delay.",
    explanation: "In practical systems, clocks are not perfectly synchronized, and signals take time to travel. A guard time (or guard interval) ensures that a slot from one user does not spill into the next slot. This is especially important in satellite TDM where distances cause large delays.",
    hint: "Like the pause between speeches in a debate so the next speaker doesn't interrupt.",
    level: "intermediate",
    codeExample: "In satellite TDMA, guard times of several microseconds account for 250 ms round-trip delay."
  },
  {
    question: "Explain how a telephone exchange uses TDM switching.",
    shortAnswer: "The exchange reads each incoming time slot and moves the data to an outgoing slot using a time-slot interchanger (TSI).",
    explanation: "In a digital exchange, each incoming TDM frame is written into a memory at a certain address, then read out in a different order to switch slots between input and output lines. This is the core of time-division switching.",
    hint: "Like rearranging the order of cards in a deck to connect different callers.",
    level: "expert",
    codeExample: "A 1024x1024 TSI can switch 1024 simultaneous calls."
  },
  {
    question: "What is the Shannon capacity limit and how does it relate to FDM?",
    shortAnswer: "Shannon's theorem gives the maximum data rate for a given bandwidth and SNR; FDM divides bandwidth among users, reducing each user's rate but enabling sharing.",
    explanation: "For a channel with bandwidth B and signal-to-noise ratio SNR, capacity C = B log2(1+SNR). When you split B into sub-bands (FDM), each sub-band has lower capacity. However, if users are far apart, FDM can allocate bands with different SNR.",
    hint: "Splitting a pipe into smaller pipes reduces flow per pipe but allows multiple users.",
    level: "expert",
    codeExample: "If total B=10 MHz, SNR=100, C=10M*log2(101)≈66.6 Mbps. Split into 10 FDM channels each 1 MHz: each gets 1M*log2(101)≈6.66 Mbps, sum = 66.6 Mbps (same total)."
  },
  {
    question: "What is the difference between FDM and CDM (Code Division Multiplexing)?",
    shortAnswer: "FDM separates by frequency, CDM separates by orthogonal codes (spread spectrum).",
    explanation: "CDM (or CDMA) allows all users to transmit on the same frequency at the same time, distinguished by unique codes. It is not a traditional multiplexing technique but a multiple access method. FDM is simpler but less flexible in fading environments.",
    hint: "FDM = different languages in different rooms; CDM = everyone speaks same room but with different encryption keys.",
    level: "advanced",
    codeExample: "3G cellular used CDMA; Wi-Fi uses OFDM (which is FDM-based)."
  },
  {
    question: "What is wavelength routing in optical networks?",
    shortAnswer: "Wavelength routing uses optical switches to direct a specific wavelength from an input fiber to an output fiber without O/E/O conversion.",
    explanation: "In an optical cross-connect (OXC), wavelength-selective switches (WSS) can route individual wavelengths to different output ports. This is the basis of reconfigurable optical add-drop multiplexers (ROADMs).",
    hint: "Like a mail sorting center where each color envelope goes to a different destination.",
    level: "expert",
    codeExample: "A ROADM can drop λ1 at node A, pass λ2 through, and add λ3 from a local client."
  },
  {
    question: "What is the difference between coarse WDM (CWDM) and dense WDM (DWDM)?",
    shortAnswer: "CWDM uses wider channel spacing (20 nm) and fewer channels (≤18), DWDM uses narrow spacing (0.4-0.8 nm) and many channels (40-160).",
    explanation: "CWDM is cheaper because lasers don't need precise temperature control, but it has shorter reach (≈80 km) and lower capacity. DWDM requires cooled lasers and amplifies all channels together with EDFA, enabling thousands of kilometers.",
    hint: "CWDM = garden hose; DWDM = fire hose with many jets.",
    level: "intermediate",
    codeExample: "CWDM: 8 channels from 1470 nm to 1610 nm, spacing 20 nm. DWDM: 80 channels in C-band (1530-1565 nm), spacing 0.4 nm."
  },
  {
    question: "What is the role of an EDFA in WDM systems?",
    shortAnswer: "Erbium-Doped Fiber Amplifier amplifies all WDM channels simultaneously without converting to electricity.",
    explanation: "A length of fiber doped with erbium ions is pumped with a laser (980 or 1480 nm), causing stimulated emission that amplifies signals in the 1530-1565 nm range (C-band). This allows amplification of hundreds of wavelengths at once, enabling transoceanic cables.",
    hint: "Like a loudspeaker for light: all colors get louder together.",
    level: "advanced",
    codeExample: "A typical EDFA provides 20-30 dB gain with noise figure ~5 dB."
  },
  {
    question: "What is the concept of 'virtual concatenation' in TDM?",
    shortAnswer: "Virtual concatenation groups multiple TDM channels together to form a larger logical pipe.",
    explanation: "In SONET/SDH, virtual concatenation (VCAT) allows bonding of several STS-1 (51.84 Mbps) or VC-3/4 containers to create a bigger payload (e.g., 10 × STS-1 = 518.4 Mbps). This provides flexible bandwidth without changing the physical infrastructure.",
    hint: "Like using multiple lanes of a highway as a single wider lane by grouping cars.",
    level: "expert",
    codeExample: "VCAT can combine 7 VC-4s (≈150 Mbps each) to carry 1 Gbps Ethernet over SDH."
  },
  {
    question: "Explain the concept of 'wavelength contention' in optical networks.",
    shortAnswer: "Wavelength contention occurs when two different connections need to use the same wavelength on the same fiber link.",
    explanation: "In a wavelength-routed network, if two lightpaths require the same wavelength on a common fiber segment, they conflict. The solution is wavelength assignment (using different wavelengths) or wavelength conversion (changing λ at intermediate nodes).",
    hint: "Two cars wanting the same parking spot at the same time.",
    level: "expert",
    codeExample: "RWA (Routing and Wavelength Assignment) algorithms try to minimize contention using graph coloring."
  },
  {
    question: "What is the difference between TDM and packet switching?",
    shortAnswer: "TDM provides fixed, periodic slots; packet switching uses variable-length packets that are multiplexed statistically.",
    explanation: "TDM is circuit-like: each user gets a guaranteed slot. Packet switching (like IP) buffers packets and sends them asynchronously, requiring addressing and store-and-forward. Packet switching is more efficient for bursty data but introduces variable delay.",
    hint: "TDM = train with fixed schedule; packet switching = taxis that go when passengers arrive.",
    level: "intermediate",
    codeExample: "SONET is TDM; Ethernet is packet switching (with statistical multiplexing)."
  },
  {
    question: "What is 'frequency selective fading' and how does FDM mitigate it?",
    shortAnswer: "Frequency selective fading affects some frequencies more than others; FDM allows robust channels to be used, or adaptive modulation per subcarrier.",
    explanation: "In wireless channels, multipath causes some frequencies to cancel out. OFDM (a form of FDM) divides the signal into many narrow subcarriers; if some subcarriers are faded, they can be turned off or use lower modulation, while others continue. This provides robustness.",
    hint: "If some lanes of a highway are damaged, you switch to the good lanes.",
    level: "expert",
    codeExample: "In 4G LTE, each resource block (12 subcarriers) can have different modulation (QPSK to 256QAM) based on channel quality."
  }
];

export default questions;