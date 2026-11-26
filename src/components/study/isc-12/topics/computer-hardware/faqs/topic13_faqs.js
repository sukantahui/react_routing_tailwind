// Topic 13 FAQs - 25 Comprehensive Questions and Answers
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
  },
  {
    "id": 16,
    "question": "What is the primary function of a Decoder in digital electronics?",
    "answer": "To convert an n-bit binary input code into a maximum of 2^n unique output lines, activating exactly one output line for each input combination.",
    "explanation": "A decoder performs the inverse operation of an encoder; it expands encoded binary data into decoded individual control lines."
  },
  {
    "id": 17,
    "question": "Why is a binary decoder called a 'Minterm Generator'?",
    "answer": "Because each output line corresponds to exactly one fundamental product term (minterm) of the input variables.",
    "explanation": "For an n-variable input, the 2^n output lines represent minterms m0, m1, ..., m_(2^n - 1)."
  },
  {
    "id": 18,
    "question": "What is the difference between an Active-HIGH and an Active-LOW Decoder?",
    "answer": "An Active-HIGH decoder drives the selected output to 1 (all others 0); an Active-LOW decoder drives the selected output to 0 (all others 1).",
    "explanation": "Active-HIGH decoders use AND gates; Active-LOW decoders use NAND gates."
  },
  {
    "id": 19,
    "question": "What is the purpose of the Enable (E) pin on a decoder chip?",
    "answer": "It acts as a master ON/OFF switch; when disabled, all output lines are inactive regardless of input address signals.",
    "explanation": "Enable pins are essential for memory address decoding and for cascading multiple smaller decoders into larger decoders."
  },
  {
    "id": 20,
    "question": "How many output lines does a decoder have if it has 5 input lines?",
    "answer": "32 output lines (since 2^5 = 32).",
    "explanation": "The formula is 2^n outputs for n binary inputs."
  },
  {
    "id": 21,
    "question": "How is a Decoder used in Computer Memory Address Decoding?",
    "answer": "Upper address bits from the CPU bus connect to decoder inputs; the decoder output lines select specific RAM or ROM memory chips (Chip Select / CS).",
    "explanation": "This ensures that only one memory chip responds to a specific memory address range on the shared data bus."
  },
  {
    "id": 22,
    "question": "What is a 3-to-8 line decoder commonly called in digital systems?",
    "answer": "A 1-of-8 decoder, Octal Decoder, or Binary-to-Octal Decoder.",
    "explanation": "It decodes 3 binary bits into one of 8 octal output states."
  },
  {
    "id": 23,
    "question": "How can a decoder be used to implement arbitrary Boolean functions?",
    "answer": "By connecting an external OR gate to the decoder output lines corresponding to the minterms of the desired function.",
    "explanation": "Since the decoder generates all 2^n minterms, any function F = Σm(...) is formed simply by ORing its designated minterm outputs."
  },
  {
    "id": 24,
    "question": "What is the difference between a Decoder and a Demultiplexer?",
    "answer": "A decoder converts an n-bit address into 2^n outputs; a demultiplexer directs a single data input to one of 2^n outputs using n select lines.",
    "explanation": "A decoder with an Enable input acts identically to a demultiplexer where Enable serves as the Data Input."
  },
  {
    "id": 25,
    "question": "What is the standard CISCE definition of a Decoder?",
    "answer": "A combinational circuit that converts binary information from n input lines to a maximum of 2^n unique output lines.",
    "explanation": "Award of 2 marks requires stating n inputs to 2^n outputs and mentioning that only one output is activated at a time."
  }
];

export default faqs;
