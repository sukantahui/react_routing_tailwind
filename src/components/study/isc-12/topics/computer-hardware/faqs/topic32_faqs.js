// Topic 32 FAQs - 15 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "Why is a Decoder with an Enable input functionally identical to a Demultiplexer?",
    "answer": "Because both circuits produce the identical Boolean output expression: Output_i = Minterm_i · Control_signal.",
    "explanation": "In a decoder, the control signal is called Enable (E); in a demultiplexer, the control signal is called Data Input (Din). The internal logic gates are 100% identical."
  },
  {
    "id": 2,
    "question": "When using an n-to-2^n decoder as a DEMUX, which pin is used as Din and which pins are used as select lines?",
    "answer": "The Enable (E) pin serves as the Data Input (Din), and the address input pins serve as the Select lines.",
    "explanation": "Applying data to Enable allows the input bit to pass through only the single AND gate addressed by the select lines."
  },
  {
    "id": 3,
    "question": "If an active-HIGH decoder has inputs A, B and Enable E, how does applying data to E yield demultiplexing?",
    "answer": "Each output is Y_i = m_i · E. Substituting E = Din gives Y_i = m_i · Din, which is the definition of a 1-to-4 DEMUX.",
    "explanation": "When addressed, Y_i = Din; all other unaddressed outputs have m_j = 0, so Y_j = 0."
  },
  {
    "id": 4,
    "question": "If an active-LOW 74138 decoder has active-LOW Enable G2A', how does applying data to G2A' achieve demultiplexing?",
    "answer": "Connect Din to G2A'; when Din=0, G2A'=0 enables the chip and pulls the selected active-LOW output to 0.",
    "explanation": "When Din=1, G2A'=1 disables the chip, forcing all outputs to 1. The selected line thus reproduces the inverted data stream."
  },
  {
    "id": 5,
    "question": "How many 1-to-4 demultiplexers are required to construct a 1-to-8 demultiplexer?",
    "answer": "Two 1-to-4 demultiplexers (plus one NOT gate or one 1-to-2 demultiplexer).",
    "explanation": "Each 1-to-4 DEMUX provides 4 outputs; two chips together supply 4 + 4 = 8 outputs."
  },
  {
    "id": 6,
    "question": "How is the data input Din connected when cascading two 1-to-4 DEMUXes to form a 1-to-8 DEMUX?",
    "answer": "Din is connected in parallel to the data inputs of both 1-to-4 DEMUXes, while MSB S2 enables only one DEMUX at a time.",
    "explanation": "Alternatively, Din can be fed to a 1-to-2 DEMUX controlled by S2, which steers Din to the data input of either DEMUX 1 or DEMUX 2."
  },
  {
    "id": 7,
    "question": "How are select lines S2, S1, S0 assigned when cascading two 1-to-4 DEMUXes into a 1-to-8 DEMUX?",
    "answer": "Lower bits S1 and S0 drive both 1-to-4 DEMUXes in parallel; MSB S2 controls the Enable pins (S2' to DEMUX 1, S2 to DEMUX 2).",
    "explanation": "When S2=0, DEMUX 1 is enabled (outputs Y0-Y3). When S2=1, DEMUX 2 is enabled (outputs Y4-Y7)."
  },
  {
    "id": 8,
    "question": "How many 1-to-8 demultiplexers are needed to construct a 1-to-16 demultiplexer?",
    "answer": "Two 1-to-8 demultiplexers.",
    "explanation": "Each provides 8 outputs; two chips provide 8 + 8 = 16 outputs (Y0 through Y15)."
  },
  {
    "id": 9,
    "question": "Explain how MSB S3 is wired when cascading two 74138 ICs into a 1-to-16 DEMUX without an inverter.",
    "answer": "Connect S3 to active-LOW enable G2A' of Chip 1, and to active-HIGH enable G1 of Chip 2; connect Din to G2B' of both chips.",
    "explanation": "When S3=0, Chip 1 is enabled. When S3=1, Chip 2 is enabled. Din modulates G2B' on both chips simultaneously."
  },
  {
    "id": 10,
    "question": "How can five 1-to-4 demultiplexers be arranged in a tree to construct a 1-to-16 demultiplexer?",
    "answer": "One 1-to-4 DEMUX in Stage 1 distributes Din to the data inputs of four 1-to-4 DEMUXes in Stage 2.",
    "explanation": "Upper select lines (S3, S2) drive Stage 1; lower select lines (S1, S0) drive all four Stage 2 DEMUXes in parallel."
  },
  {
    "id": 11,
    "question": "Compare the 'data steering' method vs. 'enable gating' method for cascading demultiplexers.",
    "answer": "Data steering passes Din through a first-stage DEMUX to sub-DEMUXes; enable gating connects Din in parallel and steers the Enable signal.",
    "explanation": "Enable gating often reduces series propagation delay because data does not pass through two cascading transistor stages."
  },
  {
    "id": 12,
    "question": "What is the engineering advantage of dual-function ICs like the 74138 in hardware design?",
    "answer": "Standardization reduces bill-of-materials cost, inventory complexity, and PCB redesigns across different hardware subsystems.",
    "explanation": "The same IC can be deployed as an address decoder on a memory board or as a data distributor on an I/O interface board."
  },
  {
    "id": 13,
    "question": "What is the propagation delay penalty in a 2-stage cascaded demultiplexer tree?",
    "answer": "The total delay is the sum of the Stage 1 delay plus the Stage 2 delay (typically ~35 to 45 ns in standard TTL).",
    "explanation": "Signals must propagate through two complete gate levels, doubling the latency compared to a single-stage design."
  },
  {
    "id": 14,
    "question": "How are unselected output lines held in inactive states across cascaded demultiplexers?",
    "answer": "The disabled sub-DEMUX forces all its outputs to 0 (or 1 for active-LOW), while only the addressed line on the enabled sub-DEMUX toggles.",
    "explanation": "This guarantees that exactly 1 output line out of all 16 is active at any given moment."
  },
  {
    "id": 15,
    "question": "What are the core criteria CISCE examiners look for in questions asking for 'Construct a 1:8 DEMUX using 1:4 DEMUXes'?",
    "answer": "1. Block diagram with labeled inputs/outputs. 2. MSB inverter connection to Enable pins. 3. Parallel select wiring (S1, S0). 4. Shared data line Din.",
    "explanation": "Fulfilling all four structural criteria demonstrates comprehensive architectural understanding and secures full marks."
  }
];

export default faqs;
