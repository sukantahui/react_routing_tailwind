// Topic 30 FAQs - 15 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "What is the functional definition and terminal count of a 1-to-2 line demultiplexer?",
    "answer": "1 data input (Din), 1 select line (S), 1 enable line (E), and 2 output lines (Y0, Y1).",
    "explanation": "A single select bit S chooses whether Din is routed to output Y0 (when S=0) or to output Y1 (when S=1)."
  },
  {
    "id": 2,
    "question": "What are the Boolean equations for the outputs Y0 and Y1 of a 1-to-2 DEMUX?",
    "answer": "Y0 = E · S' · Din and Y1 = E · S · Din.",
    "explanation": "When enabled (E=1): if S=0, Y0=Din and Y1=0; if S=1, Y0=0 and Y1=Din."
  },
  {
    "id": 3,
    "question": "How many logic gates are required to construct a discrete active-HIGH 1-to-2 DEMUX?",
    "answer": "One NOT gate (for S') and two 2-input AND gates (or two 3-input AND gates if Enable is included).",
    "explanation": "The NOT gate generates S'. The two AND gates gate the data input Din to Y0 and Y1."
  },
  {
    "id": 4,
    "question": "What is the functional definition and terminal count of a 1-to-4 line demultiplexer?",
    "answer": "1 data input (Din), 2 select lines (S1, S0), 1 enable line (E), and 4 output lines (Y0, Y1, Y2, Y3).",
    "explanation": "Two select lines decode 4 unique states (00, 01, 10, 11), steering Din to exactly one of the four output channels."
  },
  {
    "id": 5,
    "question": "What are the Boolean expressions for the 4 outputs of an active-HIGH 1-to-4 DEMUX?",
    "answer": "Y0 = E·S1'S0'·Din, Y1 = E·S1'S0·Din, Y2 = E·S1S0'·Din, Y3 = E·S1S0·Din.",
    "explanation": "Each output is formed by an AND gate receiving Enable, one minterm of (S1, S0), and the shared data input Din."
  },
  {
    "id": 6,
    "question": "Present the functional routing table of an active-HIGH 1-to-4 DEMUX with Enable E=1.",
    "answer": "S1S0=00 -> Y0=Din (others 0); 01 -> Y1=Din; 10 -> Y2=Din; 11 -> Y3=Din.",
    "explanation": "When Enable E=0, all four outputs Y0-Y3 are strictly forced to 0 regardless of Din and select lines."
  },
  {
    "id": 7,
    "question": "How many gates are required to construct an active-HIGH 1-to-4 DEMUX from discrete logic?",
    "answer": "Two NOT gates (for S1' and S0') and four 4-input AND gates (receiving E, S1/S1', S0/S0', and Din).",
    "explanation": "If no Enable pin is included, four 3-input AND gates are sufficient."
  },
  {
    "id": 8,
    "question": "If Din = 1, S1 = 1, S0 = 0, what are the states of outputs Y0, Y1, Y2, Y3?",
    "answer": "Output Y2 = 1, while Y0 = 0, Y1 = 0, and Y3 = 0.",
    "explanation": "Select combination 10 corresponds to decimal 2. Since Din = 1, output Y2 takes the value 1."
  },
  {
    "id": 9,
    "question": "If Din = 0, S1 = 1, S0 = 0, what are the states of outputs Y0, Y1, Y2, Y3?",
    "answer": "All four outputs Y0, Y1, Y2, Y3 are at logic 0.",
    "explanation": "Even though line Y2 is selected, Din = 0, so Y2 = Din = 0. All unselected lines are naturally 0."
  },
  {
    "id": 10,
    "question": "How can an active-LOW 1-to-4 DEMUX be built using NAND gates?",
    "answer": "Replace the four AND gates with four NAND gates; the selected line outputs (Din)' while unselected lines remain at 1.",
    "explanation": "This matches standard commercial decoders/demultiplexers like the 74139 where asserted outputs are active-LOW."
  },
  {
    "id": 11,
    "question": "What commercial IC contains dual 1-to-4 demultiplexers?",
    "answer": "The 74xx139 dual 2-to-4 decoder or the 74xx156 dual 1-to-4 demultiplexer.",
    "explanation": "The 74139 features two independent active-LOW decoders whose active-LOW Enable pins double as data inputs."
  },
  {
    "id": 12,
    "question": "How does a 1-to-4 DEMUX route a single clock signal to 4 different subsystem chips?",
    "answer": "Connect the master clock to Din; select lines S1, S0 steer the clock pulses to only the addressed subsystem.",
    "explanation": "This is known as clock gating, allowing idle subsystems to save dynamic power by withholding clock switching."
  },
  {
    "id": 13,
    "question": "Can a 1-to-4 demultiplexer be constructed using three 1-to-2 demultiplexers?",
    "answer": "Yes, arranged as a 2-level tree: Stage 1 has one 1-to-2 DEMUX (driven by S1); Stage 2 has two 1-to-2 DEMUXes (driven by S0).",
    "explanation": "Stage 1 routes Din to either DEMUX 2A or DEMUX 2B based on S1; Stage 2 then routes to the final output based on S0."
  },
  {
    "id": 14,
    "question": "What is the difference between Din being 0 versus Enable E being 0?",
    "answer": "Operationally both result in all outputs being 0; however, when E=1 and Din=0, the selected channel is actively driven to 0.",
    "explanation": "When E=0, the circuit is disabled. When E=1, data transmission is active and the selected output mirrors the logic 0 on Din."
  },
  {
    "id": 15,
    "question": "What common errors do ISC candidates make when writing the truth table or drawing a 1-to-4 DEMUX?",
    "answer": "Omitting the data input Din from the Boolean equations or failing to show unselected outputs as 0 in the truth table.",
    "explanation": "A DEMUX truth table must show that unselected outputs remain 0 while the selected output equals Din."
  }
];

export default faqs;
