// Topic 15 FAQs - 15 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "What distinguishes an active-LOW 2-to-4 line decoder from an active-HIGH decoder?",
    "answer": "The selected output goes to logic 0 (LOW), while all unselected outputs remain at logic 1 (HIGH).",
    "explanation": "In active-LOW logic, logic 0 represents the asserted or 'active' state, whereas logic 1 represents the quiescent or 'inactive' state."
  },
  {
    "id": 2,
    "question": "What logic gates are used to build the output stage of an active-LOW decoder?",
    "answer": "NAND gates instead of AND gates.",
    "explanation": "A NAND gate produces a LOW output only when all of its inputs are HIGH, naturally providing the inverted active-LOW output characteristic."
  },
  {
    "id": 3,
    "question": "Why are active-LOW decoders overwhelmingly preferred in commercial digital ICs?",
    "answer": "Because CMOS and TTL NAND gates are faster, consume less silicon area, and peripheral Chip Select (/CS) pins are predominantly active-LOW.",
    "explanation": "Inverting logic gates (NAND, NOR) require fewer transistors and offer superior sinking current capability compared to non-inverting AND/OR gates."
  },
  {
    "id": 4,
    "question": "What are the Boolean equations for the outputs of an active-LOW 2-to-4 decoder with active-LOW Enable (E')?",
    "answer": "Y0' = (E' + A1 + A0)', Y1' = (E' + A1 + A0')', Y2' = (E' + A1' + A0)', Y3' = (E' + A1' + A0)' using NAND expressions: Y0' = NAND(E_active, A1', A0').",
    "explanation": "When active-LOW enable E'=0 (meaning enable is asserted), Y_i' = (m_i)' = NAND of the minterm inputs. By De Morgan's theorem, (A·B)' = A' + B'."
  },
  {
    "id": 5,
    "question": "What is the quiescent (idle) state of all outputs when active-LOW Enable E' = 1?",
    "answer": "All four outputs Y0', Y1', Y2', Y3' are forced to logic 1 (HIGH).",
    "explanation": "Since logic 1 is the inactive state for active-LOW signals, setting E'=1 deactivates all outputs, ensuring no connected peripheral is accidentally triggered."
  },
  {
    "id": 6,
    "question": "Which output line drops to 0 when inputs are A1=0, A0=1 and Enable E'=0?",
    "answer": "Output Y1' drops to logic 0, while Y0', Y2', and Y3' remain at logic 1.",
    "explanation": "Input code 01 corresponds to decimal 1. In an active-LOW decoder, the selected line Y1' is asserted LOW (0)."
  },
  {
    "id": 7,
    "question": "Why is a small bubble drawn on the output pins of an active-LOW decoder symbol?",
    "answer": "To denote signal inversion (active-LOW logic level: 0 is active, 1 is inactive).",
    "explanation": "IEEE/ANSI standards require an inversion bubble or half-arrow to visually indicate that asserting the function produces an active-LOW level."
  },
  {
    "id": 8,
    "question": "To realize a Boolean SOP function using an active-LOW decoder, what gate must be connected to the outputs?",
    "answer": "A NAND gate.",
    "explanation": "Because an active-LOW decoder outputs complemented minterms (m_i)', feeding them into a NAND gate produces: [(m_a)' · (m_b)']' = m_a + m_b (by De Morgan's theorem), which is the exact SOP function."
  },
  {
    "id": 9,
    "question": "Prove mathematically why an active-LOW decoder followed by a NAND gate implements a Sum of Minterms.",
    "answer": "Let inputs be (m1)' and (m2)'. NAND output = ((m1)' · (m2)')' = (m1)'' + (m2)'' = m1 + m2 = Σ(1, 2).",
    "explanation": "This dual inversion property allows designers to implement any canonical SOP expression directly without adding inverter stages."
  },
  {
    "id": 10,
    "question": "What is the industry-standard dual 2-to-4 active-LOW decoder IC?",
    "answer": "The 74xx139 (or 74LS139 / 74HC139) dual 2-to-4 line decoder/demultiplexer.",
    "explanation": "The 74139 contains two completely independent 2-to-4 active-LOW decoders in a single 16-pin package, each with its own active-LOW Enable pin."
  },
  {
    "id": 11,
    "question": "How do you connect an LED to an active-LOW decoder output to indicate when it is selected?",
    "answer": "Connect the LED anode through a current-limiting resistor to VCC, and connect the cathode to the decoder output.",
    "explanation": "When the decoder output drops to logic 0 (GND), it sinks current from VCC through the LED, turning the LED ON."
  },
  {
    "id": 12,
    "question": "Why does active-LOW signaling provide better noise margin in TTL bus architectures?",
    "answer": "TTL gates have a much higher current sinking capability (I_OL) than sourcing capability (I_OH), providing stronger noise immunity in the LOW state.",
    "explanation": "Pulling a line to 0 V actively overcomes parasitic line capacitance significantly faster and with greater noise margin than driving it HIGH."
  },
  {
    "id": 13,
    "question": "What is the difference between active-LOW Enable (G') and active-HIGH Enable (G)?",
    "answer": "G' enables the chip when 0 and disables it when 1; G enables the chip when 1 and disables it when 0.",
    "explanation": "In block diagrams, G' is drawn with an inversion bubble, while G is drawn without a bubble."
  },
  {
    "id": 14,
    "question": "How can an active-LOW 2-to-4 decoder be used to implement a NOR function?",
    "answer": "Connect the desired minterm outputs to an AND gate.",
    "explanation": "By De Morgan's theorem: (A + B)' = A' · B'. Since active-LOW outputs are inverted minterms, an AND gate combines them into a NOR equivalent."
  },
  {
    "id": 15,
    "question": "In ISC board answer sheets, how should students write the truth table for an active-LOW decoder?",
    "answer": "Label outputs with overbars or primes (Y0', Y1', Y2', Y3') and fill unselected rows with '1' and selected rows with '0'.",
    "explanation": "Clear labeling prevents ambiguity and ensures the evaluator recognizes that the student understands active-LOW conventions."
  }
];

export default faqs;
