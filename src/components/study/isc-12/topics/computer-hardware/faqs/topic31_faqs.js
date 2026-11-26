// Topic 31 FAQs - 25 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "What are the terminal specifications of a 1-to-8 line demultiplexer?",
    "answer": "1 data input (Din), 3 select lines (S2, S1, S0), 1 enable line (E), and 8 output lines (Y0 through Y7).",
    "explanation": "Three binary select lines provide 2^3 = 8 address states, directing Din to one of the eight output channels."
  },
  {
    "id": 2,
    "question": "What are the Boolean equations for the 8 outputs of an active-HIGH 1-to-8 DEMUX?",
    "answer": "Y_i = E · m_i · Din for i = 0 to 7, where m_i is the 3-variable minterm formed by (S2, S1, S0).",
    "explanation": "For example: Y0 = E·S2'S1'S0'·Din, Y5 = E·S2 S1' S0·Din, and Y7 = E·S2 S1 S0·Din."
  },
  {
    "id": 3,
    "question": "How many logic gates and of what fan-in are needed to construct an active-HIGH 1-to-8 DEMUX?",
    "answer": "Three NOT gates (for S2', S1', S0') and eight 5-input AND gates (receiving E, S2, S1, S0 literals, and Din).",
    "explanation": "Each AND gate requires 5 inputs to evaluate Enable, the 3-bit address code, and the incoming data line."
  },
  {
    "id": 4,
    "question": "What commercial IC is the industry standard for 1-to-8 demultiplexing?",
    "answer": "The 74xx138 (74LS138 / 74HC138) 3-to-8 line decoder/demultiplexer.",
    "explanation": "The 74138 is designed specifically to serve dual roles as both an address decoder and a 1-to-8 demultiplexer."
  },
  {
    "id": 5,
    "question": "How is the 74138 IC configured to operate as a 1-to-8 demultiplexer?",
    "answer": "Connect data input Din to active-LOW enable G2A', tie G2B' to GND, tie G1 to VCC, and connect select lines to A, B, C.",
    "explanation": "When Din=0, G2A'=0 enables the chip and drives the selected active-LOW output to 0. Unselected outputs remain 1."
  },
  {
    "id": 6,
    "question": "In a 74138 configured as a 1-to-8 DEMUX, what type of output signals are produced?",
    "answer": "Active-LOW outputs (inverted data signals).",
    "explanation": "The selected output pin goes to logic LOW when the data input is asserted, matching active-LOW peripheral control conventions."
  },
  {
    "id": 7,
    "question": "Which output line receives data Din when select lines are S2=1, S1=1, S0=0?",
    "answer": "Output line Y6 receives data Din.",
    "explanation": "Binary 110 equals decimal 6. Therefore, the 7th output channel (Y6) is selected."
  },
  {
    "id": 8,
    "question": "How does a 1-to-8 demultiplexer perform serial-to-parallel data distribution?",
    "answer": "Serial bits arrive sequentially on Din while a 3-bit modulo-8 counter advances select lines S2, S1, S0 from 000 to 111.",
    "explanation": "Each clock cycle delivers one incoming bit to a consecutive output line Y0 through Y7, creating an 8-bit parallel word."
  },
  {
    "id": 9,
    "question": "What happens to all 8 output lines when the Master Enable pin is deactivated?",
    "answer": "All 8 outputs remain strictly in their unasserted inactive state (all 0 for active-HIGH, or all 1 for active-LOW).",
    "explanation": "De-asserting Enable isolates all outputs from the data input line completely."
  },
  {
    "id": 10,
    "question": "What is the typical propagation delay from data input Din to output in a 74LS138 demultiplexer?",
    "answer": "Approximately 15 to 20 nanoseconds.",
    "explanation": "Advanced high-speed CMOS variants (74HCT138 / 74AHCT138) achieve propagation delays below 8 nanoseconds."
  },
  {
    "id": 11,
    "question": "Why is an active-LOW 1-to-8 DEMUX well suited for driving peripheral /CS lines?",
    "answer": "Because most semiconductor memory chips and peripheral controllers use active-LOW Chip Select (/CS) inputs.",
    "explanation": "The DEMUX directly drives /CS pins without requiring external inverters, saving components and reducing signal latency."
  },
  {
    "id": 12,
    "question": "How can a 1-to-8 demultiplexer be constructed using two 1-to-4 demultiplexers and one 1-to-2 demultiplexer?",
    "answer": "The 1-to-2 DEMUX in stage 1 (driven by S2) steers Din to either DEMUX 1 or DEMUX 2; select lines S1, S0 drive both 1-to-4 DEMUXes.",
    "explanation": "Stage 1 decides whether the upper or lower 4-channel group receives Din, and stage 2 routes it to the specific pin."
  },
  {
    "id": 13,
    "question": "How does capacitive loading affect the 8 output lines of a demultiplexer?",
    "answer": "High trace capacitance increases signal rise and fall times, reducing maximum usable transmission baud rates.",
    "explanation": "Buffer drivers or pull-up resistors are commonly added when DEMUX outputs drive long PCB backplane traces."
  },
  {
    "id": 14,
    "question": "Can a 1-to-8 demultiplexer be used as a 3-to-8 binary decoder? Explain how.",
    "answer": "Yes, by connecting the data input Din permanently to logic HIGH (VCC / 1).",
    "explanation": "When Din = 1, Y_i = m_i · (1) = m_i. Each output produces the standard binary minterm, functioning exactly as a decoder."
  },
  {
    "id": 15,
    "question": "What are the key diagrammatic elements evaluated by CISCE examiners for a 1-to-8 DEMUX?",
    "answer": "Single data input Din, Enable E, three select lines (S2=MSB, S1, S0=LSB), 8 outputs (Y0-Y7), and complete functional truth table.",
    "explanation": "Candidates must clearly demonstrate how select codes route Din to each designated output line."
  },
  {
    "id": 16,
    "question": "What are the inputs and outputs of a 1-to-8 Demultiplexer?",
    "answer": "1 Data input (D), 3 Select lines (S2 MSB, S1, S0 LSB), and 8 Outputs (Y0 to Y7).",
    "explanation": "3 select lines route single data line D to one of 8 outputs."
  },
  {
    "id": 17,
    "question": "Write the Boolean equations for outputs Y0 and Y7 of a 1-to-8 Demultiplexer.",
    "answer": "Y0 = S2'S1'S0' · D; Y7 = S2S1S0 · D.",
    "explanation": "Y0 corresponds to minterm 000; Y7 corresponds to minterm 111."
  },
  {
    "id": 18,
    "question": "How many logic gates are used to build a 1-to-8 Demultiplexer from discrete gates?",
    "answer": "Three NOT gates (for S2', S1', S0') and eight 4-input AND gates.",
    "explanation": "Each 4-input AND gate combines data D with three select line literals."
  },
  {
    "id": 19,
    "question": "What is the output state when S2 = 1, S1 = 0, S0 = 1 and D = 1?",
    "answer": "Y5 = 1, and all other seven outputs (Y0-Y4, Y6, Y7) are 0.",
    "explanation": "Binary 101 is decimal 5, routing D=1 to Y5."
  },
  {
    "id": 20,
    "question": "What commercial IC operates as a 1-to-8 Demultiplexer?",
    "answer": "IC 74138 (when used by applying data input to an active-low or active-high Enable pin).",
    "explanation": "Pin G1 (active-high enable) or G2A'/G2B' (active-low enable) acts as the data input pin."
  },
  {
    "id": 21,
    "question": "What is the Function Table for select lines S2 S1 S0 = 011 in a 1-to-8 DEMUX?",
    "answer": "Y3 = D, and Y0 = Y1 = Y2 = Y4 = Y5 = Y6 = Y7 = 0.",
    "explanation": "Routes input D to output line Y3."
  },
  {
    "id": 22,
    "question": "How can two 1-to-4 DEMUXes be combined to construct a 1-to-8 DEMUX?",
    "answer": "Connect select lines S1, S0 to both DEMUXes; use MSB select line S2 to gate data D into DEMUX 1 when S2=0 (via S2'D) and into DEMUX 2 when S2=1 (via S2D).",
    "explanation": "S2 acts as a 1-to-2 demultiplexer steering data D to one of the two 1:4 DEMUX chips."
  },
  {
    "id": 23,
    "question": "How does a 1-to-8 DEMUX distribute clock signals in a microprocessor?",
    "answer": "By applying the master clock to data input D and feeding register addresses to select lines, the clock pulse is routed exclusively to the selected target register.",
    "explanation": "Prevents clock switching on unselected registers, reducing power consumption."
  },
  {
    "id": 24,
    "question": "What happens if an active-low enable pin is added and held HIGH (inactive)?",
    "answer": "All 8 outputs are forced to 0 regardless of D or select lines.",
    "explanation": "The enable pin overrides and disables all internal AND gates."
  },
  {
    "id": 25,
    "question": "What is the standard CISCE question format for a 1-to-8 Demultiplexer?",
    "answer": "Draw the complete Function Table, write Boolean equations for all 8 outputs, and draw the gate-level circuit diagram using AND gates.",
    "explanation": "A comprehensive 4-mark question testing complete 3-variable routing."
  }
];

export default faqs;
