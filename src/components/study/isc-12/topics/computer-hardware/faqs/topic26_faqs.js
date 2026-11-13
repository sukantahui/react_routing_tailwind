// Topic 26 FAQs - 15 Comprehensive Questions and Answers
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
  }
];

export default faqs;
