// Topic 15 FAQs - 25 Comprehensive Questions and Answers
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
  },
  {
    "id": 16,
    "question": "Why are NAND gates used to construct Active-LOW Decoders instead of AND gates?",
    "answer": "NAND gates naturally produce an inverted product: (A · B · C)', which goes LOW (0) when all inputs are 1, naturally matching active-low logic.",
    "explanation": "In active-low logic, the selected output line is pulled to 0V (ground), while unselected lines remain at 1 (+5V)."
  },
  {
    "id": 17,
    "question": "Write the Boolean equations for the 4 outputs of an Active-LOW 2-to-4 decoder with active-low enable E'.",
    "answer": "Y0' = (E' + A1 + A0)' = (E · A1' · A0')'; Y1' = (E · A1' · A0)'; Y2' = (E · A1 · A0')'; Y3' = (E · A1 · A0)'.",
    "explanation": "Using De Morgan's theorem, each output is a NAND gate taking active-high enable and address lines."
  },
  {
    "id": 18,
    "question": "What is the output state when the enable pin E' is at logic 1 (inactive)?",
    "answer": "All outputs are at logic 1 (Y0' = Y1' = Y2' = Y3' = 1), meaning all channels are deactivated.",
    "explanation": "Because the enable line is active-low, feeding logic 1 forces all NAND gate outputs HIGH."
  },
  {
    "id": 19,
    "question": "What output is produced when E' = 0, A1 = 0, A0 = 1?",
    "answer": "Y1' = 0, and Y0' = Y2' = Y3' = 1.",
    "explanation": "Address 01 selects line 1, which drops to logic 0 (active-low)."
  },
  {
    "id": 20,
    "question": "Why do industrial memory chips (SRAM, Flash) predominantly use active-low chip select (/CS)?",
    "answer": "Active-low outputs sink current directly to ground, providing superior noise margins and compatibility with open-collector/open-drain bus architectures.",
    "explanation": "TTL and CMOS pull-down transistors have lower impedance and faster fall times than pull-up networks."
  },
  {
    "id": 21,
    "question": "How can an Active-LOW Decoder directly implement a canonical POS (Product-of-Sums) maxterm?",
    "answer": "A NAND-based decoder output line produces m_i' (the complement of minterm i), which by De Morgan's theorem equals the maxterm M_i.",
    "explanation": "Therefore, each active-low output line directly generates an individual maxterm without requiring an external inverter."
  },
  {
    "id": 22,
    "question": "How do you implement an arbitrary SOP function using an Active-LOW Decoder?",
    "answer": "Connect the required active-low minterm outputs into an external NAND gate.",
    "explanation": "By De Morgan's theorem, NANDing negated minterms produces the OR of the minterms: (m1' · m2' · m4')' = m1 + m2 + m4 = F."
  },
  {
    "id": 23,
    "question": "What does a small circle (bubble) at an input or output pin signify in schematic diagrams?",
    "answer": "It denotes logic negation (active-low signaling); the signal is asserted when at 0V.",
    "explanation": "An input bubble means logic 0 activates the pin; an output bubble means logic 0 is the asserted state."
  },
  {
    "id": 24,
    "question": "What is the truth table row for E'=0, A1=1, A0=1?",
    "answer": "Y3' = 0, Y2' = 1, Y1' = 1, Y0' = 1.",
    "explanation": "Binary address 11 activates output Y3' by setting it to 0."
  },
  {
    "id": 25,
    "question": "What is the standard CISCE marking scheme for an Active-LOW Decoder?",
    "answer": "1 mark for Truth Table showing active 0s, 1 mark for NAND gate equations, and 2 marks for logic diagram showing input inverters and NAND gates with bubbles.",
    "explanation": "Students must clearly show active-low outputs using inverted symbols (Y0' to Y3' or bubbles)."
  }
];

export default faqs;
