// topic0_files/topic0_questions.js
const questions = [
  {
    question: "What is the main disadvantage of NRZ encoding?",
    shortAnswer: "Lack of built-in clocking; long runs of same bit cause synchronisation loss.",
    explanation: "NRZ does not guarantee a transition per bit. If many identical bits are sent, the receiver cannot recover the clock, leading to bit slip.",
    hint: "Think about a signal that stays high for a long time – how does the receiver know where one bit ends?",
    level: "moderate",
    codeExample: "// NRZ: 0000 → flat low; receiver cannot count bits"
  },
  {
    question: "How does Manchester encoding guarantee clock recovery?",
    shortAnswer: "It forces a transition in the middle of every bit.",
    explanation: "Each bit period has a voltage change (low→high or high→low) exactly at the center. The receiver uses these transitions to synchronise.",
    hint: "Observe the SVG – the red dot always moves mid-bit.",
    level: "basic",
    codeExample: "// Manchester: bit 1 = high→low, bit 0 = low→high (IEEE 802.3)"
  },
  {
    question: "Compare bandwidth requirements of NRZ and Manchester.",
    shortAnswer: "Manchester requires twice the bandwidth of NRZ for the same bit rate.",
    explanation: "Because Manchester introduces a transition every bit, the signal changes frequency at twice the bit rate, thus occupying double the spectrum.",
    hint: "How many signal changes per second does NRZ have (worst case)? Manchester always has one per bit.",
    level: "moderate",
    codeExample: "Bit rate = 10 Mbps → NRZ bandwidth ~10 MHz, Manchester ~20 MHz."
  },
  {
    question: "What is 'baseline wander' and which encoding avoids it?",
    shortAnswer: "Baseline wander is the drifting of the reference voltage due to long runs of same value. Manchester avoids it.",
    explanation: "In AC-coupled links, a long DC component (many 1s) shifts the baseline. Manchester's constant transitions keep the average voltage zero.",
    hint: "Think about a capacitor in series – it blocks DC. NRZ with many 1s becomes a DC signal.",
    level: "expert",
    codeExample: "// Ethernet uses Manchester to keep the line DC-balanced."
  },
  {
    question: "Explain Differential Manchester encoding with an example: bits 1010, starting level high.",
    shortAnswer: "Bit1 (1) = transition at start → level becomes low; Bit0 (0) = no transition at start → stays low; Bit1 (1) = transition → becomes high; Bit0 (0) = no transition → stays high.",
    explanation: "Always a transition mid-bit for clock. The bit value is determined by whether there is a transition at the beginning of the bit period.",
    hint: "Draw the waveform: start high, first bit (1) → transition at start → low. Then mid-bit always transition to high? Wait carefully.",
    level: "expert",
    codeExample: "diffManchester(bit=1, prev_level=high) -> start transition to low, then mid transition to high (clock)."
  },
  {
    question: "Why is NRZ still used in high-speed serial links (e.g., PCIe, USB 3.0)?",
    shortAnswer: "Because they use scrambling and bit stuffing to ensure transitions, not the encoding itself.",
    explanation: "NRZ has low bandwidth overhead. To solve the sync problem, they scramble the data (making it random) or insert 'stuff' bits to force transitions.",
    hint: "Think about what PCIe uses: 8b/10b encoding is different, but some use NRZ + scrambling.",
    level: "expert",
    codeExample: "USB 2.0 uses NRZI (a variant) with bit stuffing after six 1s."
  },
  {
    question: "What does 'DC balance' mean and why is it important?",
    shortAnswer: "The average voltage of the signal is zero, avoiding transformer/AC coupling saturation.",
    explanation: "If a signal has more 1s (high) than 0s (low), the average voltage shifts. Transformers block DC, so a DC-imbalanced signal causes droop.",
    hint: "Manchester has equal number of high and low periods over two bits.",
    level: "moderate",
    codeExample: "Manchester: bit 1 = high→low (net zero), bit 0 = low→high (net zero)."
  },
  {
    question: "In Manchester, how do you represent a '0' according to IEEE 802.3?",
    shortAnswer: "Low-to-high transition in the middle of the bit.",
    explanation: "IEEE 802.3 (Ethernet) defines: 0 = low→high, 1 = high→low. Other standards may invert this.",
    hint: "Check the SVG – for bit 0 the red dot goes from bottom to top.",
    level: "basic",
    codeExample: "// 0: ___--- ; 1: ---___ (assuming low=0V, high=5V)"
  },
  {
    question: "What is the main advantage of Differential Manchester over standard Manchester?",
    shortAnswer: "It is polarity-independent; the receiver only looks for transitions, not absolute voltages.",
    explanation: "If the two wires are swapped accidentally, Differential Manchester still works because a transition at start means 0 regardless of direction.",
    hint: "Think about Token Ring – it uses Differential Manchester for noise immunity.",
    level: "moderate",
    codeExample: "// Polarity swap: high becomes low, but transition presence remains."
  },
  {
    question: "Draw the NRZ waveform for bits: 1 0 0 1 1 (voltage: high=+5V, low=0V).",
    shortAnswer: "+5V for bit1, 0V for bit2, 0V for bit3, +5V for bit4, +5V for bit5.",
    explanation: "No transitions within bits, only at bit boundaries when the value changes.",
    hint: "The signal stays constant during each bit period.",
    level: "basic",
    codeExample: "Visual: ____----____----____ (but not exactly – draw voltage levels)"
  },
  {
    question: "A Manchester-encoded signal has a transition every 250 ns. What is the bit rate?",
    shortAnswer: "2 Mbps.",
    explanation: "Manchester has a transition every half-bit (mid-bit). The time between mid-bit transitions = bit period / 2. Given transition every 250 ns → bit period = 500 ns → bit rate = 1/500e-9 = 2 Mbps.",
    hint: "How many transitions per bit in Manchester? Two (start edge + mid edge) but only mid is guaranteed.",
    level: "expert",
    codeExample: "Bit rate = 1 / (2 * transition_interval)"
  },
  {
    question: "What is the purpose of bit stuffing in NRZ-based protocols?",
    shortAnswer: "To force a transition after a long run of identical bits, enabling clock recovery.",
    explanation: "After e.g., six consecutive 1s, the transmitter inserts a 0. The receiver knows to remove it. This guarantees a transition at most every 6 bits.",
    hint: "USB and CAN bus use this.",
    level: "moderate",
    codeExample: "111111 → 1111101 (stuff 0 after 5th 1?) Actually standard: after 5 ones, insert 0."
  },
  {
    question: "Explain why Manchester encoding is not used for very high speeds (e.g., 10 GbE).",
    shortAnswer: "Because it doubles the required bandwidth, making the physical medium too expensive.",
    explanation: "At 10 Gbps, Manchester would require 20 Gbaud signalling, which is harder and more power-hungry. Instead, 10 GbE uses NRZ with scrambling (64b/66b encoding).",
    hint: "Think about the cost of high-frequency components.",
    level: "expert",
    codeExample: "10GBASE-R uses 64b/66b + NRZ, not Manchester."
  },
  {
    question: "What does 'transition density' mean and why is it important?",
    shortAnswer: "The number of signal transitions per unit time; important for clock recovery and EMI.",
    explanation: "Higher transition density makes clock recovery easier but increases electromagnetic interference. Low density risks loss of synchronisation.",
    hint: "Manchester has maximum density (always one per bit).",
    level: "moderate",
    codeExample: "NRZ can have zero transitions for many bits (bad)."
  },
  {
    question: "In Differential Manchester, if the previous level was low and the current bit is 0, what is the level at the start of the bit?",
    shortAnswer: "Remains low (no transition).",
    explanation: "Bit 0 means no transition at the start. So the level stays the same as the previous bit's end (which was low after the mid-bit transition).",
    hint: "The mid-bit always transitions to the opposite level for clock.",
    level: "expert",
    codeExample: "prev_end=low, bit=0 → start=low, mid=high, end=high."
  },
  {
    question: "What is 'clock recovery' and which encoding schemes provide it inherently?",
    shortAnswer: "Recovering the sender's timing from the data stream. Manchester and Differential Manchester do inherently.",
    explanation: "By guaranteeing a transition within each bit, the receiver can lock a PLL onto that frequency. NRZ does not guarantee any transitions.",
    hint: "Look for schemes that always have a transition per bit.",
    level: "moderate",
    codeExample: "Ethernet uses Manchester for clock recovery over twisted pair."
  },
  {
    question: "Compare Manchester and Differential Manchester in terms of decoding complexity.",
    shortAnswer: "Manchester is simpler (compare voltage to threshold). Differential requires tracking previous level.",
    explanation: "Differential Manchester decoder must remember the last signal level to detect the presence/absence of a transition at the bit start. Manchester only needs to sample the middle of the bit.",
    hint: "Which one needs state memory?",
    level: "moderate",
    codeExample: "// DiffManchester: if (current_start == previous_end) then bit=1 else bit=0"
  },
  {
    question: "A long cable run shows severe attenuation. Which encoding would you choose and why?",
    shortAnswer: "Differential Manchester because it is polarity-independent and relies on transitions, which survive attenuation better than absolute levels.",
    explanation: "In differential signalling, the receiver compares the two wires. Attenuation may reduce amplitude but the difference (and transitions) remain detectable. Manchester’s absolute levels might be lost.",
    hint: "Think about differential pairs in CAN bus or RS-485.",
    level: "expert",
    codeExample: "CAN bus uses differential Manchester-like signalling (but actually NRZ with bit stuffing)."
  },
  {
    question: "What is the difference between NRZ-L and NRZ-I?",
    shortAnswer: "NRZ-L (level): 1 = high, 0 = low. NRZ-I (invert): 1 = transition, 0 = no change.",
    explanation: "NRZ-I is a differential version of NRZ. It provides some clocking because 1s cause transitions, but long runs of 0s remain problematic.",
    hint: "USB uses NRZI.",
    level: "moderate",
    codeExample: "NRZ-I: bit 1 toggles the level, bit 0 keeps same level."
  },
  {
    question: "Why does 10BASE-T Ethernet use Manchester while 100BASE-TX uses MLT-3 (a form of NRZ)?",
    shortAnswer: "Because 100 Mbps requires more efficient use of bandwidth; Manchester would need 200 MHz signalling, too high for Cat5.",
    explanation: "MLT-3 cycles through three voltage levels, reducing the maximum frequency while still providing transitions. It uses scrambling to ensure sufficient transitions.",
    hint: "Think about how many transitions per bit in MLT-3.",
    level: "expert",
    codeExample: "100BASE-TX uses 4B5B encoding + MLT-3."
  },
  {
    question: "What is 'jitter' and which encoding is more resilient to it?",
    shortAnswer: "Jitter is timing variation. Differential Manchester is more resilient because it detects transitions relative to previous edge, not absolute timing.",
    explanation: "Because the decision is based on whether a transition happened at the start (within a window), small timing errors are less critical than in Manchester where the exact midpoint voltage must be sampled.",
    hint: "Absolute vs. relative timing.",
    level: "expert",
    codeExample: "In high-noise environments, differential encodings are preferred."
  },
  {
    question: "If you send all 0s using Manchester, what does the waveform look like?",
    shortAnswer: "A repeating low→high transition at every bit (square wave at half the bit rate).",
    explanation: "Each 0 = low→high. After the high at the end of the bit, the next bit starts low (because the first half of the bit is always the opposite of the second half). So you get a perfect square wave.",
    hint: "Draw it: low, then high, then low, then high...",
    level: "moderate",
    codeExample: "Period = 2 × bit period (frequency = bit rate / 2)."
  },
  {
    question: "Explain how a PLL (Phase-Locked Loop) uses Manchester transitions to recover clock.",
    shortAnswer: "The PLL multiplies the transition frequency (which equals the bit rate) to generate a clock at the same rate.",
    explanation: "Manchester transitions occur at the bit rate (one per bit). The PLL locks onto this frequency and can then output a clock aligned to the bit centers.",
    hint: "PLLs need edges to compare phase.",
    level: "expert",
    codeExample: "No code, but think: edge every bit period."
  },
  {
    question: "What is a common beginner mistake when drawing Manchester waveforms?",
    shortAnswer: "Forgetting the mid-bit transition or making the transition at the bit boundary only.",
    explanation: "Manchester always has a transition in the middle. Many beginners draw NRZ-like signals and then add a mid transition incorrectly.",
    hint: "Check the SVG: each bit has two segments of equal length.",
    level: "basic",
    codeExample: "Wrong: bit 1 = high for whole bit. Right: high→low at midpoint."
  },
  {
    question: "Which encoding would you choose for a battery-powered wireless sensor (very low power)?",
    shortAnswer: "NRZ with occasional sync patterns, because Manchester consumes more energy due to twice the number of transitions.",
    explanation: "Every transition consumes power (charging/discharging capacitance). NRZ has few transitions, saving energy. You would add a preamble occasionally to resynchronise.",
    hint: "Think about energy per bit.",
    level: "moderate",
    codeExample: "Low-power RF protocols often use NRZ with a sync word."
  },
  {
    question: "In Differential Manchester, what is the purpose of the mid-bit transition?",
    shortAnswer: "It provides the clock signal, independent of the data value.",
    explanation: "The mid-bit transition is always present, guaranteeing a timing reference. The data is encoded by the presence/absence of a transition at the bit start.",
    hint: "Without the mid transition, you'd have no clock.",
    level: "moderate",
    codeExample: "The mid transition toggles the level every half bit."
  },
  {
    question: "A receiver uses an edge detector to recover data from Differential Manchester. What does it look for at the start of the bit window?",
    shortAnswer: "It checks if there is an edge (transition) at the beginning; edge = bit 0, no edge = bit 1 (in most conventions).",
    explanation: "The receiver opens a short window at the expected start of each bit. If a transition is detected, it decodes 0; otherwise 1.",
    hint: "Some standards invert this – always check the spec.",
    level: "expert",
    codeExample: "if (edge_detected_at_start) bit = 0; else bit = 1;"
  },
  {
    question: "What is the maximum run length of identical bits in Manchester encoding?",
    shortAnswer: "Two bit periods (because after two bits you get a transition).",
    explanation: "Even if you send 0,0: low→high (mid of first), then high→low (mid of second) – you get a transition every half bit, so no more than 2 identical voltage levels in a row.",
    hint: "The worst case is alternating bits.",
    level: "basic",
    codeExample: "Manchester always has a transition every half bit, so run length = 1/2 bit in terms of same level? Actually same level max = one half-bit."
  },
  {
    question: "How does the receiver differentiate between a '0' and a '1' in Manchester if the signal is inverted due to cable reversal?",
    shortAnswer: "It cannot – standard Manchester is polarity-sensitive. That's why Differential Manchester is used when polarity may be unknown.",
    explanation: "If the wires are swapped, a high becomes low and vice versa. A 0 (low→high) becomes high→low, which is the pattern for 1. The receiver would misinterpret all bits.",
    hint: "Differential solves this by looking at transitions only.",
    level: "moderate",
    codeExample: "Test: invert the signal and see that 0 becomes 1."
  },
  {
    question: "A network uses Differential Manchester and you observe that the signal level does NOT change at a bit start. What is the bit value?",
    shortAnswer: "1 (assuming no transition at start = 1).",
    explanation: "By common convention (used in Token Ring), a transition at the start indicates a 0, and no transition indicates a 1. But some sources reverse it; the standard must be known.",
    hint: "Look at the SVG for Differential Manchester: first bit (1) shows a transition at start.",
    level: "moderate",
    codeExample: "// Decoding rule: bit = (transition_at_start ? 0 : 1) in many textbooks."
  },
  {
    question: "Which encoding techniques are used in modern 10 Gbps Ethernet (10GBASE-R)?",
    shortAnswer: "64b/66b encoding followed by NRZ (or PAM4 for higher speeds).",
    explanation: "10GBASE-R uses a scrambler and then transmits NRZ. The 64b/66b encoding ensures enough transitions. Manchester is not used due to bandwidth inefficiency.",
    hint: "Think about why 10 GbE does not use Manchester.",
    level: "expert",
    codeExample: "64b/66b guarantees at least one transition every 66 bits."
  }
];

export default questions;