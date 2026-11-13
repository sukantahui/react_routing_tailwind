// Topic 17 FAQs - 15 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "What is the cascading principle in decoder design?",
    "answer": "Combining multiple smaller capacity decoders to construct a larger capacity decoder using enable pins for bank selection.",
    "explanation": "Cascading expands decoding capacity hierarchically: high-order address bits enable specific sub-decoders, while low-order bits drive all sub-decoders in parallel."
  },
  {
    "id": 2,
    "question": "How many 2-to-4 decoders are required to construct a 3-to-8 line decoder?",
    "answer": "Two 2-to-4 decoders (plus one NOT gate for the MSB enable control).",
    "explanation": "Each 2-to-4 decoder provides 4 outputs; two decoders yield 4 + 4 = 8 total outputs, covering minterms m0 through m7."
  },
  {
    "id": 3,
    "question": "How are the three input lines (A, B, C) distributed when cascading two 2-to-4 decoders?",
    "answer": "The MSB (A) controls the Enable inputs, while the two lower bits (B, C) are connected in parallel to inputs (A1, A0) of both decoders.",
    "explanation": "Because B and C specify which of the 4 lines within a bank is selected, while A determines which of the two banks is enabled."
  },
  {
    "id": 4,
    "question": "What specific role does the MSB (A) play in cascading two 2-to-4 decoders?",
    "answer": "It acts as a block selector: when A=0, Decoder 1 is enabled; when A=1, Decoder 2 is enabled.",
    "explanation": "Feeding A' to the Enable of Decoder 1 and A to the Enable of Decoder 2 ensures that exactly one decoder is active at any time."
  },
  {
    "id": 5,
    "question": "How is MSB (A) connected to the Enable lines of the two active-HIGH 2-to-4 decoders?",
    "answer": "A is passed through a NOT gate to Enable E1 of Decoder 1, and connected directly to Enable E2 of Decoder 2.",
    "explanation": "When A=0: E1 = 1 (active) and E2 = 0 (inactive). When A=1: E1 = 0 (inactive) and E2 = 1 (active)."
  },
  {
    "id": 6,
    "question": "When MSB A = 0, which decoder is enabled and which output range is decoded?",
    "answer": "Decoder 1 is enabled, generating outputs Y0 through Y3 (minterms m0, m1, m2, m3).",
    "explanation": "Since A=0, binary inputs range from 000 to 011, which fall into the lower half of the 3-variable truth table."
  },
  {
    "id": 7,
    "question": "When MSB A = 1, which decoder is enabled and which output range is decoded?",
    "answer": "Decoder 2 is enabled, generating outputs Y4 through Y7 (minterms m4, m5, m6, m7).",
    "explanation": "Since A=1, binary inputs range from 100 to 111, which fall into the upper half of the 3-variable truth table."
  },
  {
    "id": 8,
    "question": "How is an overall Master Enable (E) incorporated into the cascaded 3-to-8 decoder?",
    "answer": "By ANDing Master Enable E with A' for Decoder 1 (E1 = E · A') and with A for Decoder 2 (E2 = E · A).",
    "explanation": "If Master Enable E = 0, both decoders are disabled simultaneously regardless of the value of MSB A."
  },
  {
    "id": 9,
    "question": "What is the total gate count when constructing a 3-to-8 decoder from 2-to-4 decoders?",
    "answer": "One external inverter (NOT gate) plus the internal gates of the two 2-to-4 decoders.",
    "explanation": "This highlights the modular efficiency of cascading: standard off-the-shelf ICs can be combined with minimal external glue logic."
  },
  {
    "id": 10,
    "question": "How are two active-LOW 2-to-4 decoders cascaded into a 3-to-8 active-LOW decoder?",
    "answer": "Connect MSB A directly to E1' of Decoder 1, and connect A through a NOT gate to E2' of Decoder 2.",
    "explanation": "For active-LOW enables, E'=0 is active. When A=0, E1'=0 (Decoder 1 active). When A=1, A'=0 so E2'=0 (Decoder 2 active)."
  },
  {
    "id": 11,
    "question": "Why is cascading economically advantageous in digital PCB hardware design?",
    "answer": "It allows designers to use standard, high-volume inventory chips (like dual 2-to-4 decoders) instead of purchasing rare or costly specialized ICs.",
    "explanation": "Dual 2-to-4 decoders (74139) are ubiquitous and cheap; cascading them fulfills 3-to-8 decoding requirements without adding new part numbers to the bill of materials."
  },
  {
    "id": 12,
    "question": "What error occurs if the MSB inverter is accidentally connected to the LSB instead?",
    "answer": "The outputs become interleaved (alternating between chips on every odd/even step) rather than split into upper and lower octants.",
    "explanation": "The MSB partitions the address space contiguously into [0..3] and [4..7]. Connecting the inverter to LSB C causes alternating selection."
  },
  {
    "id": 13,
    "question": "Why is no external OR gate or multiplexer needed to merge the outputs of the two decoders?",
    "answer": "Because only one decoder is enabled at any time; the other decoder's outputs remain inactive.",
    "explanation": "The 8 outputs (4 from Decoder 1 and 4 from Decoder 2) remain physically separate output lines Y0 through Y7."
  },
  {
    "id": 14,
    "question": "Can three 2-to-4 decoders be used to build a 3-to-8 decoder without ANY NOT gate?",
    "answer": "Yes, by using the third 2-to-4 decoder as a 1-to-2 decoder to drive the Enable pins of the other two decoders.",
    "explanation": "Feeding MSB A into one input of the third decoder generates mutually exclusive outputs that directly drive the Enables of Decoders 1 and 2."
  },
  {
    "id": 15,
    "question": "What must be clearly shown in an ISC board answer diagram for cascading two 2-to-4 decoders?",
    "answer": "Clear block labels, parallel address connections (B, C), MSB (A) with inverter to Enable pins, and labeled outputs Y0-Y3 and Y4-Y7.",
    "explanation": "Clear labeling of pin functions (A1, A0, E) on both block symbols and external signal names guarantees full marks under CISCE evaluation criteria."
  }
];

export default faqs;
