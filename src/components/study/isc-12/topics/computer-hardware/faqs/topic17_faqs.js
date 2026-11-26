// Topic 17 FAQs - 25 Comprehensive Questions and Answers
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
  },
  {
    "id": 16,
    "question": "How many 2-to-4 Decoders with Enable inputs are required to construct a 3-to-8 Decoder?",
    "answer": "Exactly two 2-to-4 decoders (and one inverter).",
    "explanation": "Each 2-to-4 decoder produces 4 outputs; two decoders produce 4 + 4 = 8 outputs."
  },
  {
    "id": 17,
    "question": "How are the 3 input address lines (A2, A1, A0) assigned in this 3-to-8 construction?",
    "answer": "The lower two address bits (A1, A0) are tied in parallel to the address inputs of both decoders; the MSB address bit (A2) controls the Enable inputs.",
    "explanation": "A2 selects which decoder is enabled: Decoder 1 (outputs Y0-Y3) when A2 = 0, or Decoder 2 (outputs Y4-Y7) when A2 = 1."
  },
  {
    "id": 18,
    "question": "How is the Enable logic wired if both 2-to-4 decoders have Active-HIGH Enable pins (E1, E2)?",
    "answer": "Connect A2 directly to E2 of the second decoder; connect A2 through a NOT gate (A2') to E1 of the first decoder.",
    "explanation": "When A2 = 0, E1 = 1 (enabling Decoder 1) and E2 = 0. When A2 = 1, E1 = 0 and E2 = 1 (enabling Decoder 2)."
  },
  {
    "id": 19,
    "question": "How is the Enable logic wired if both 2-to-4 decoders have Active-LOW Enable pins (E1', E2')?",
    "answer": "Connect A2 directly to E1' of the first decoder, and connect A2 through an inverter to E2' of the second decoder.",
    "explanation": "When A2 = 0, E1' = 0 (enabled) and E2' = 1 (disabled). When A2 = 1, E1' = 1 (disabled) and E2' = 0 (enabled)."
  },
  {
    "id": 20,
    "question": "What happens when the input code is A2 A1 A0 = 1 1 0?",
    "answer": "A2 = 1 disables Decoder 1 (all Y0-Y3 = 0) and enables Decoder 2. Inputs A1 A0 = 1 0 activate output Y6 (second output of Decoder 2).",
    "explanation": "Output Y6 is asserted, matching decimal 6 (binary 110)."
  },
  {
    "id": 21,
    "question": "What happens when master Enable E = 0 if an overall enable line is included?",
    "answer": "Both 2-to-4 decoders are simultaneously disabled, forcing all 8 outputs (Y0 to Y7) to 0.",
    "explanation": "ANDing master Enable with A2 and A2' controls overall chip operation."
  },
  {
    "id": 22,
    "question": "What are the output labels of Decoder 1 and Decoder 2?",
    "answer": "Decoder 1 outputs correspond to Y0, Y1, Y2, Y3; Decoder 2 outputs correspond to Y4, Y5, Y6, Y7.",
    "explanation": "Together they cover the complete range from minterm m0 to m7."
  },
  {
    "id": 23,
    "question": "What is the advantage of modular decoder expansion in digital hardware?",
    "answer": "It allows designers to build arbitrary high-capacity address decoding architectures using standardized, off-the-shelf MSI components.",
    "explanation": "Manufacturers do not need to fabricate custom chips for every bit size."
  },
  {
    "id": 24,
    "question": "What is the propagation delay of this composite 3-to-8 decoder?",
    "answer": "Max delay = t_inverter + t_decoder_enable_to_output.",
    "explanation": "Address bits A1 and A0 propagate directly into the decoders; A2 passes through 1 inverter before enabling the selected decoder."
  },
  {
    "id": 25,
    "question": "What is the standard CISCE question format for this topic?",
    "answer": "Draw the block diagram showing two 2-to-4 decoders with enable inputs and an inverter, clearly labeling all input, output, and enable pins.",
    "explanation": "A classic 3-mark or 4-mark hardware design question in ISC board examinations."
  }
];

export default faqs;
