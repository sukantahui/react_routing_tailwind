// Topic 25 FAQs - 25 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "What is the architecture of an 8-to-1 MUX constructed from two 4-to-1 MUXes and one 2-to-1 MUX?",
    "answer": "Two 4-to-1 MUXes form the first stage, and their outputs connect to the two data inputs of a 2-to-1 MUX in the second stage.",
    "explanation": "This hierarchical arrangement splits the 8 data inputs into two 4-input banks, using the 2-to-1 MUX as the bank selector."
  },
  {
    "id": 2,
    "question": "How are the 8 data inputs (D0-D7) assigned between the two 4-to-1 multiplexers?",
    "answer": "D0, D1, D2, D3 connect to inputs I0, I1, I2, I3 of MUX 1; D4, D5, D6, D7 connect to I0, I1, I2, I3 of MUX 2.",
    "explanation": "MUX 1 handles the lower 4 data channels, and MUX 2 handles the upper 4 data channels."
  },
  {
    "id": 3,
    "question": "Which select lines connect to the 4-to-1 MUXes and which select line connects to the 2-to-1 MUX?",
    "answer": "Lower select lines S1 and S0 connect in parallel to both 4-to-1 MUXes; MSB select line S2 connects to the 2-to-1 MUX.",
    "explanation": "S1 and S0 select the relative channel within each 4-input bank, while S2 determines which bank is routed to the final output."
  },
  {
    "id": 4,
    "question": "What specific role does the MSB select line S2 play in this cascaded system?",
    "answer": "S2 acts as the bank enable selector: when S2=0, MUX 1 is chosen; when S2=1, MUX 2 is chosen.",
    "explanation": "Since S2 represents value 4 in binary weight (4-7 vs 0-3), it cleanly partitions the address space."
  },
  {
    "id": 5,
    "question": "When S2 = 0, which 4-to-1 MUX provides the output, and what range of data inputs is selected?",
    "answer": "MUX 1 provides the output, selecting from inputs D0 through D3 according to S1 and S0.",
    "explanation": "When S2=0, binary addresses range from 000 (D0) to 011 (D3), which reside exclusively in MUX 1."
  },
  {
    "id": 6,
    "question": "When S2 = 1, which 4-to-1 MUX provides the output, and what range of data inputs is selected?",
    "answer": "MUX 2 provides the output, selecting from inputs D4 through D7 according to S1 and S0.",
    "explanation": "When S2=1, binary addresses range from 100 (D4) to 111 (D7), which reside exclusively in MUX 2."
  },
  {
    "id": 7,
    "question": "Can an 8-to-1 MUX be built using two 4-to-1 MUXes with active-LOW enables and an OR gate instead of a 2-to-1 MUX?",
    "answer": "Yes, by connecting S2 to E1' and S2' (via NOT gate) to E2', and ORing the two MUX outputs.",
    "explanation": "When S2=0, MUX 1 is enabled and MUX 2 outputs 0; when S2=1, MUX 1 outputs 0 and MUX 2 is enabled. The OR gate passes the active output."
  },
  {
    "id": 8,
    "question": "How does propagation delay through a cascaded 8-to-1 MUX compare to a monolithic 8-to-1 MUX?",
    "answer": "The cascaded MUX has slightly higher delay because data must traverse two sequential multiplexer stages (4:1 stage delay + 2:1 stage delay).",
    "explanation": "A monolithic MUX selects in one internal AND-OR level, whereas the cascaded design has two serial levels of logic."
  },
  {
    "id": 9,
    "question": "What happens if select lines S1 and S0 are accidentally swapped with S2?",
    "answer": "The input selection becomes interleaved (e.g., selecting D0, D2, D4, D6 together) instead of contiguous blocks.",
    "explanation": "Lower bits must handle intra-bank selection (modulo 4) and the MSB must handle inter-bank selection to maintain sequential indexing."
  },
  {
    "id": 10,
    "question": "How is an overall Master Enable incorporated into the cascaded 8-to-1 multiplexer?",
    "answer": "By connecting the Master Enable directly to the Enable input of the output 2-to-1 multiplexer.",
    "explanation": "Disabling the 2-to-1 MUX forces final output Y to 0 immediately, regardless of the states of the first-stage 4-to-1 MUXes."
  },
  {
    "id": 11,
    "question": "How can seven 2-to-1 multiplexers be arranged in a binary tree to form an 8-to-1 multiplexer?",
    "answer": "Stage 1: four 2:1 MUXes (driven by S0); Stage 2: two 2:1 MUXes (driven by S1); Stage 3: one 2:1 MUX (driven by S2).",
    "explanation": "This 3-level binary tree progressively halves the number of active channels until a single output line remains."
  },
  {
    "id": 12,
    "question": "What is the advantage of using a 2-to-1 MUX in the second stage over an OR gate?",
    "answer": "The 2-to-1 MUX does not require the 4-to-1 MUXes to have enable pins or force their unselected outputs to zero.",
    "explanation": "Both 4-to-1 MUXes can run continuously; the 2-to-1 MUX simply selects whichever output is valid based on S2."
  },
  {
    "id": 13,
    "question": "Why is 2:1 and 4:1 multiplexer cascading standard practice in FPGA architectures?",
    "answer": "FPGA Look-Up Tables (LUTs) are built in small modular 4-input or 6-input slices that combine via dedicated hardwired multiplexers (MUXF7, MUXF8).",
    "explanation": "Modern FPGAs do not have monolithic 8:1 or 16:1 hardware gates; they synthesize larger multiplexers by cascading standard slice primitives."
  },
  {
    "id": 14,
    "question": "How do you verify the correctness of the cascaded 8-to-1 MUX circuit?",
    "answer": "By verifying that for all 8 select combinations (000 through 111), output Y matches the corresponding data input (D0 through D7).",
    "explanation": "Testing each select code confirms that the MSB enables the correct sub-MUX and the LSBs select the exact designated line."
  },
  {
    "id": 15,
    "question": "What are the key diagrammatic conventions required for full marks in ISC Class 12 cascading questions?",
    "answer": "Labeled block symbols for each MUX, parallel select lines (S1, S0), S2 to final stage, clearly labeled data inputs D0-D7, and output Y.",
    "explanation": "Clear, clean wiring and unambiguous pin names (I0-I3, S, E, Y) ensure full credit from CISCE board evaluators."
  },
  {
    "id": 16,
    "question": "What components are required to build an 8-to-1 MUX using two 4-to-1 MUXes?",
    "answer": "Two 4-to-1 Multiplexers (MUX 1 and MUX 2), one inverter (NOT gate), and one 2-input OR gate (or one 2-to-1 MUX).",
    "explanation": "Each 4:1 MUX handles 4 data inputs; together they handle 8 inputs."
  },
  {
    "id": 17,
    "question": "How are the select lines (S2, S1, S0) connected in this cascading configuration?",
    "answer": "Lower select lines (S1, S0) are connected in parallel to the select lines of both 4:1 MUXes; MSB select line S2 controls the Enable (Strobe) inputs.",
    "explanation": "S1 and S0 choose the internal channel (0-3); S2 determines which of the two 4:1 MUX chips is active."
  },
  {
    "id": 18,
    "question": "How is S2 wired to the Enable pins if the 4-to-1 MUXes have Active-LOW Enable inputs (E1', E2')?",
    "answer": "Connect S2 directly to E1' of MUX 1; connect S2 through an inverter (NOT gate) to E2' of MUX 2.",
    "explanation": "When S2 = 0, E1' = 0 (MUX 1 active, handling I0-I3) and E2' = 1 (MUX 2 disabled). When S2 = 1, E1' = 1 and E2' = 0 (MUX 2 active, handling I4-I7)."
  },
  {
    "id": 19,
    "question": "How are the outputs of MUX 1 (Y1) and MUX 2 (Y2) combined to produce the final output Y?",
    "answer": "Connect Y1 and Y2 to the inputs of a 2-input OR gate.",
    "explanation": "Since the disabled MUX outputs 0, Y = Y1 + Y2 transmits the active MUX's data signal cleanly."
  },
  {
    "id": 20,
    "question": "What data line is selected when S2 S1 S0 = 1 1 0?",
    "answer": "Input I6 is routed to final output Y.",
    "explanation": "S2 = 1 enables MUX 2; S1 S0 = 10 selects the third input of MUX 2, which is I6."
  },
  {
    "id": 21,
    "question": "Can a 2-to-1 MUX be used instead of the OR gate to combine Y1 and Y2?",
    "answer": "Yes; connect Y1 to input 0 and Y2 to input 1 of a 2:1 MUX, controlled by select line S2.",
    "explanation": "This eliminates the need for active-low enable pins, operating purely on data selection."
  },
  {
    "id": 22,
    "question": "What data inputs connect to MUX 1 and MUX 2?",
    "answer": "MUX 1 receives inputs I0, I1, I2, I3; MUX 2 receives inputs I4, I5, I6, I7.",
    "explanation": "Evenly distributes the 8 data channels."
  },
  {
    "id": 23,
    "question": "What is the total propagation delay of this cascaded 8-to-1 MUX?",
    "answer": "Delay = t_MUX + t_OR (or t_inverter + t_enable_to_output + t_OR).",
    "explanation": "Signals pass through one 4:1 MUX stage and one final OR gate stage."
  },
  {
    "id": 24,
    "question": "Why is cascading multiplexers important in practical computer hardware design?",
    "answer": "It overcomes pin-count and IC fan-in limitations, allowing arbitrary wide bus switching networks to be built using standard modular parts.",
    "explanation": "Enables hierarchical data routing trees."
  },
  {
    "id": 25,
    "question": "What is the standard CISCE question format for this topic?",
    "answer": "Design and draw the block diagram of an 8-to-1 Multiplexer using two 4-to-1 Multiplexers and an OR gate, clearly labeling all inputs, outputs, and select lines.",
    "explanation": "A frequent 3-mark or 4-mark design problem in ISC Class 12 board papers."
  }
];

export default faqs;
