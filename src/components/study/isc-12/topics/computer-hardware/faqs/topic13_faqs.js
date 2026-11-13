// Topic 13 FAQs - 15 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "What is a Decoder in digital electronics?",
    "answer": "A combinational circuit that converts an n-bit binary input code into a maximum of 2^n unique output lines.",
    "explanation": "A decoder detects the presence of a specific binary combination on its input lines and asserts exactly one corresponding output line, decoding the coded information back into individual spatial signals."
  },
  {
    "id": 2,
    "question": "What is the relationship between input lines and output lines in a standard decoder?",
    "answer": "For 'n' binary input lines, a full decoder produces 2^n distinct output lines (n-to-2^n).",
    "explanation": "For example: 2 inputs yield 4 outputs (2-to-4), 3 inputs yield 8 outputs (3-to-8), and 4 inputs yield 16 outputs (4-to-16). Some specialized decoders have fewer outputs, such as BCD-to-Decimal (4-to-10)."
  },
  {
    "id": 3,
    "question": "How is a decoder functionally the inverse of an encoder?",
    "answer": "An encoder compresses 2^n lines into n binary bits, whereas a decoder expands n binary bits into 2^n individual lines.",
    "explanation": "Where an encoder determines 'which line is active' and encodes it as binary, a decoder accepts a binary number and activates the one matching physical output line."
  },
  {
    "id": 4,
    "question": "What is the role of the Enable (E or EN) input in a decoder?",
    "answer": "It serves as a master strobe control: when active, decoding occurs; when inactive, all outputs are disabled regardless of inputs.",
    "explanation": "The Enable line allows multiple decoders to be cascaded together, facilitates bus interfacing, and prevents spurious glitch outputs during input switching."
  },
  {
    "id": 5,
    "question": "What happens to the output lines when the Enable pin is inactive?",
    "answer": "All output lines remain de-asserted (all logic 0 for active-HIGH, or all logic 1 for active-LOW).",
    "explanation": "Without an asserted Enable input, the decoder is effectively turned off and ignores all signals present on its data address lines."
  },
  {
    "id": 6,
    "question": "Why are decoders often referred to as 'minterm generators'?",
    "answer": "Because each output line corresponds directly to one standard minterm of the input Boolean variables.",
    "explanation": "For an n-variable input, the 2^n outputs produce all possible fundamental product terms (m0, m1, ..., m2^n-1), making decoders universal building blocks for SOP Boolean functions."
  },
  {
    "id": 7,
    "question": "What is the distinction between Active-HIGH and Active-LOW decoder outputs?",
    "answer": "Active-HIGH outputs produce logic 1 for the selected code and 0 elsewhere; active-LOW outputs produce logic 0 for the selected code and 1 elsewhere.",
    "explanation": "Active-HIGH decoders are built with AND gates, whereas active-LOW decoders are built with NAND gates and feature inversion bubbles on output pins."
  },
  {
    "id": 8,
    "question": "How are decoders utilized in microprocessor memory addressing?",
    "answer": "To decode high-order address bus lines and generate Chip Select (CS) signals for specific RAM, ROM, or I/O chips.",
    "explanation": "By assigning unique address ranges to distinct outputs of a decoder, the CPU ensures that only one memory chip responds to a given memory address read or write cycle."
  },
  {
    "id": 9,
    "question": "Can a decoder have fewer than 2^n output lines? Give an example.",
    "answer": "Yes, specialized decoders with invalid input combinations have fewer outputs, such as a BCD-to-Decimal decoder.",
    "explanation": "A BCD-to-Decimal decoder has 4 inputs (capable of 16 combinations) but only 10 outputs (0 to 9), treating input combinations 1010 through 1111 (10-15) as don't-care states."
  },
  {
    "id": 10,
    "question": "What logic gates form the core output stage of an active-HIGH decoder?",
    "answer": "AND gates, where each gate receives a unique combination of true and complemented input variables.",
    "explanation": "An AND gate outputs 1 only when all its inputs are 1. Inverting appropriate inputs ensures only one specific input code satisfies each AND gate."
  },
  {
    "id": 11,
    "question": "What logic gates form the core output stage of an active-LOW decoder?",
    "answer": "NAND gates, which produce a 0 only when all their inputs are simultaneously at logic 1.",
    "explanation": "By De Morgan's laws, a NAND gate is an inverted AND gate. When the specific minterm condition is met, its output drops to logic 0, matching active-LOW logic."
  },
  {
    "id": 12,
    "question": "Why does only one output pin go active at any given instant in a normal decoder?",
    "answer": "Because every binary input combination represents a mutually exclusive numerical state.",
    "explanation": "Since an n-bit binary code has exactly one unique decimal value, only the single AND/NAND gate corresponding to that exact minterm can have all its inputs asserted."
  },
  {
    "id": 13,
    "question": "What is decoder propagation delay and why does it matter?",
    "answer": "The time required for an input transition to reflect as a stable change on the selected output line.",
    "explanation": "In high-speed CPU memory buses, decoder propagation delay directly adds to memory access latency. Faster Schottky or CMOS decoders (e.g., 74AHCT138) minimize this overhead."
  },
  {
    "id": 14,
    "question": "How does a BCD-to-7-Segment decoder differ from a standard binary decoder?",
    "answer": "A standard decoder activates only one line; a 7-segment decoder activates multiple segment lines (a-g) simultaneously.",
    "explanation": "To display the digit '8', for example, a BCD-to-7-segment decoder activates all seven segment lines (a, b, c, d, e, f, g), whereas a standard decoder activates only line Y8."
  },
  {
    "id": 15,
    "question": "What are the primary structural requirements in ISC Class 12 board exams for decoder questions?",
    "answer": "Input labels, Enable line, truth table with binary minterms, gate-level schematic, and clear output expressions.",
    "explanation": "Examiners look for rigorous notation: inputs (A1, A0 or A, B, C), Enable (E), proper inversion bubbles if active-LOW, and output minterms (Y0 = A'B', etc.)."
  }
];

export default faqs;
