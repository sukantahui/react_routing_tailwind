// Topic 26 FAQs - 25 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "How can a 16-to-1 multiplexer be constructed using two 8-to-1 multiplexers and one 2-to-1 multiplexer?",
    "answer": "Inputs I0-I7 connect to MUX 1, I8-I15 connect to MUX 2; S2, S1, S0 drive both 8:1 MUXes; MSB S3 drives the 2-to-1 MUX.",
    "explanation": "The two 8-to-1 MUXes handle the lower and upper octets of data; the 2-to-1 MUX routes the selected octet to the output based on S3."
  },
  {
    "id": 2,
    "question": "Which select lines drive the two 8-to-1 MUXes and which select line drives the 2-to-1 MUX?",
    "answer": "S2, S1, S0 drive the two 8-to-1 MUXes in parallel; MSB S3 drives the select input of the 2-to-1 MUX.",
    "explanation": "S2, S1, S0 decode which of the 8 lines within an octet is chosen; S3 decides whether the lower octet (0-7) or upper octet (8-15) is selected."
  },
  {
    "id": 3,
    "question": "How can a 16-to-1 multiplexer be constructed using four 4-to-1 multiplexers and one 4-to-1 multiplexer?",
    "answer": "Four 4-to-1 MUXes form the first stage, receiving 4 data inputs each; their 4 outputs connect to a fifth 4-to-1 MUX in the second stage.",
    "explanation": "Total data inputs = 4 × 4 = 16. Stage 1 selects 1-of-4 within each nibble; Stage 2 selects 1-of-4 nibbles."
  },
  {
    "id": 4,
    "question": "In a five 4-to-1 MUX tree, how are the 4 select lines (S3, S2, S1, S0) partitioned between stages?",
    "answer": "Lower bits S1 and S0 drive all four first-stage MUXes; upper bits S3 and S2 drive the second-stage MUX.",
    "explanation": "S1 and S0 choose the line within each group of 4; S3 and S2 choose which of the four groups (0-3, 4-7, 8-11, 12-15) is routed."
  },
  {
    "id": 5,
    "question": "What are the input allocations for the four first-stage 4-to-1 multiplexers?",
    "answer": "MUX 0: I0-I3; MUX 1: I4-I7; MUX 2: I8-I11; MUX 3: I12-I15.",
    "explanation": "Each first-stage MUX processes one 4-bit nibble of the 16-bit input word."
  },
  {
    "id": 6,
    "question": "How does the second-stage 4-to-1 MUX finalize the 16-to-1 data selection?",
    "answer": "It receives the intermediate outputs Y0, Y1, Y2, Y3 from stage 1 and uses S3, S2 to route the final selected bit to output Y.",
    "explanation": "When S3S2=00, Y0 is routed; 01 routes Y1; 10 routes Y2; 11 routes Y3."
  },
  {
    "id": 7,
    "question": "Can a 16-to-1 MUX be built using two 8-to-1 MUXes with active-LOW strobes and an OR gate?",
    "answer": "Yes, by connecting MSB S3 to the active-LOW strobe of MUX 1 and S3' (via NOT gate) to the strobe of MUX 2, and ORing their outputs.",
    "explanation": "When S3=0, MUX 1 is enabled and MUX 2 outputs 0; when S3=1, MUX 1 outputs 0 and MUX 2 is enabled. The OR gate passes the active line."
  },
  {
    "id": 8,
    "question": "How does the propagation delay of the two 8:1 + one 2:1 configuration compare with a five 4:1 MUX tree?",
    "answer": "Both have 2 levels of multiplexer delay, but the 8:1 + 2:1 configuration requires only 3 chips instead of 5.",
    "explanation": "Using fewer integrated circuits reduces PCB routing complexity, capacitive trace loading, and power consumption."
  },
  {
    "id": 9,
    "question": "What happens if MSB S3 is connected to the select input of both 8-to-1 MUXes instead of S2?",
    "answer": "The address decoding becomes corrupted, mapping inputs out of sequential order.",
    "explanation": "The select lines must preserve binary positional weight: S0 (weight 1), S1 (weight 2), S2 (weight 4), and S3 (weight 8)."
  },
  {
    "id": 10,
    "question": "Why is cascading preferred over using a monolithic 16-to-1 MUX (74150) in modern digital designs?",
    "answer": "Monolithic 16-to-1 ICs require bulky 24-pin DIP packages, have inverted outputs, and are less available than ubiquitous 8:1 and 4:1 ICs.",
    "explanation": "Standardizing on dual 4:1 (74153) and 8:1 (74151) chips simplifies inventory and circuit board layout."
  },
  {
    "id": 11,
    "question": "What is bus loading on the select lines in a cascaded multiplexer system?",
    "answer": "Select lines S1 and S0 must drive the input capacitance of multiple MUXes simultaneously, increasing fan-out requirements.",
    "explanation": "In a five 4-to-1 MUX tree, lines S1 and S0 each drive 4 separate MUX inputs, which may require bus buffer gates at high clock frequencies."
  },
  {
    "id": 12,
    "question": "How many 2-to-1 multiplexers are required to construct a 16-to-1 multiplexer in a pure binary tree?",
    "answer": "Fifteen 2-to-1 multiplexers arranged in 4 cascaded levels (8 + 4 + 2 + 1 = 15).",
    "explanation": "Each stage cuts the number of candidate signals in half, requiring log2(16) = 4 levels of 2-to-1 multiplexers."
  },
  {
    "id": 13,
    "question": "What is the total gate delay of a 4-level 2-to-1 MUX tree?",
    "answer": "Approximately 8 gate delays (4 levels × 2 gate delays per 2-to-1 MUX).",
    "explanation": "While structurally uniform, a deep binary tree accumulates significant delay compared to a 2-stage (4:1 + 4:1) implementation."
  },
  {
    "id": 14,
    "question": "How is Master Enable connected in the two 8-to-1 + one 2-to-1 cascaded MUX circuit?",
    "answer": "Connect Master Enable to the Enable pin of the 2-to-1 output MUX (or gate it into the strobes of both 8-to-1 MUXes).",
    "explanation": "Gating the output stage ensures that when Master Enable is de-asserted, the entire circuit is silenced cleanly."
  },
  {
    "id": 15,
    "question": "What are the essential labeling criteria for ISC board exams in a 16-to-1 cascading diagram?",
    "answer": "Clear block outlines, distinct labels for each chip, fully labeled data lines I0-I15, partitioned select lines (S3, S2, S1, S0), and output Y.",
    "explanation": "Properly identifying MSB and LSB connections and showing signal direction arrows earns the student maximum marks."
  },
  {
    "id": 16,
    "question": "What components are required to build a 16-to-1 MUX using two 8-to-1 MUXes?",
    "answer": "Two 8-to-1 Multiplexers (IC 74151), one inverter (NOT gate), and one 2-input OR gate (or one 2-to-1 MUX).",
    "explanation": "Each 8:1 MUX routes 8 inputs; two chips route 16 inputs."
  },
  {
    "id": 17,
    "question": "How are the 4 select lines (S3, S2, S1, S0) distributed in this 16-to-1 MUX design?",
    "answer": "Lower select lines S2, S1, S0 are connected in parallel to the select inputs of both 8:1 MUXes; MSB select line S3 controls the Enable (Strobe) inputs.",
    "explanation": "S3 = 0 activates MUX 1 (handling I0-I7); S3 = 1 activates MUX 2 (handling I8-I15)."
  },
  {
    "id": 18,
    "question": "How is S3 connected to the Active-LOW Strobe inputs (G1', G2') of the two 8-to-1 MUXes?",
    "answer": "Connect S3 directly to G1' of MUX 1; connect S3 through an inverter (S3') to G2' of MUX 2.",
    "explanation": "When S3 = 0, G1' = 0 (MUX 1 enabled) and G2' = 1 (MUX 2 disabled). When S3 = 1, G1' = 1 and G2' = 0 (MUX 2 enabled)."
  },
  {
    "id": 19,
    "question": "How are the outputs of the two 8-to-1 MUXes combined?",
    "answer": "The outputs Y1 and Y2 are fed into a 2-input OR gate to generate the final composite output Y.",
    "explanation": "Since the disabled MUX outputs 0, the OR gate passes the active MUX signal unaltered."
  },
  {
    "id": 20,
    "question": "What data line is selected when S3 S2 S1 S0 = 1 0 1 1?",
    "answer": "Input I11 is routed to final output Y.",
    "explanation": "S3 = 1 enables MUX 2; S2 S1 S0 = 011 selects input 3 of MUX 2, which is I11 (8 + 3 = 11)."
  },
  {
    "id": 21,
    "question": "How many 4-to-1 MUXes would be needed to build a 16-to-1 MUX without any 8-to-1 MUXes?",
    "answer": "Five 4-to-1 MUXes (4 in the first level to take 16 data inputs, and 1 in the second level to combine the 4 outputs).",
    "explanation": "A two-level tree hierarchy: Level 1 selects via S1, S0; Level 2 selects via S3, S2."
  },
  {
    "id": 22,
    "question": "What data inputs connect to MUX 1 and MUX 2?",
    "answer": "MUX 1 receives inputs I0 to I7; MUX 2 receives inputs I8 to I15.",
    "explanation": "Clean 8-channel partitioning across the 16 total inputs."
  },
  {
    "id": 23,
    "question": "What is the advantage of using a 2-to-1 MUX at the output instead of an OR gate?",
    "answer": "It allows using 8:1 MUXes without enable pins, and maintains uniform propagation delay regardless of output active levels.",
    "explanation": "The 2:1 MUX simply selects between Y1 and Y2 based on S3."
  },
  {
    "id": 24,
    "question": "What is the propagation delay of this cascaded 16-to-1 MUX?",
    "answer": "Delay = max(t_S3_to_enable) + t_enable_to_Y + t_OR (typically ~15-25 ns in standard TTL).",
    "explanation": "Governed by the inverter delay on S3, MUX enable delay, and the final OR gate delay."
  },
  {
    "id": 25,
    "question": "What is the standard CISCE question format for this topic?",
    "answer": "Design and draw a 16-to-1 Multiplexer using two 8-to-1 Multiplexers and an OR gate, clearly labeling all 16 data inputs, 4 select lines, and enable wiring.",
    "explanation": "A classic 4-mark design problem in ISC computer hardware board examinations."
  }
];

export default faqs;
