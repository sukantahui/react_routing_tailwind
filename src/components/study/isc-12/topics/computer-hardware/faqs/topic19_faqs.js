// Topic 19 FAQs - 15 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "Why is an n-to-2^n decoder called a 'universal minterm generator'?",
    "answer": "Because it inherently generates all 2^n fundamental minterms for 'n' input variables simultaneously.",
    "explanation": "Any arbitrary Boolean function can be expressed as a canonical sum of minterms. A decoder provides every single building block term ready for summation."
  },
  {
    "id": 2,
    "question": "How can any arbitrary Boolean function in SOP form be realized using an active-HIGH decoder?",
    "answer": "By connecting the decoder outputs corresponding to the function's minterms to the inputs of an OR gate.",
    "explanation": "If F(A, B, C) = Σ(1, 3, 6, 7), simply feed outputs Y1, Y3, Y6, and Y7 of an active-HIGH 3-to-8 decoder into a 4-input OR gate."
  },
  {
    "id": 3,
    "question": "How can an arbitrary Boolean function in POS form be realized using an active-HIGH decoder?",
    "answer": "By connecting the non-minterms (maxterm indices) to a NOR gate, or using an AND gate with inverted minterm combinations.",
    "explanation": "Since F = Π M(0, 2, 4, 5) = (Σ m(0, 2, 4, 5))', feeding outputs Y0, Y2, Y4, Y5 into a NOR gate produces the exact POS function."
  },
  {
    "id": 4,
    "question": "How is an arbitrary Boolean SOP function implemented using an active-LOW decoder (e.g., 74138)?",
    "answer": "By connecting the required minterm outputs directly to the inputs of a NAND gate.",
    "explanation": "An active-LOW decoder outputs complemented minterms (m_i)'. By De Morgan's laws: [Π (m_i)']' = Σ m_i, which is standard SOP form."
  },
  {
    "id": 5,
    "question": "Prove mathematically that an active-LOW decoder followed by a NAND gate implements canonical SOP.",
    "answer": "For F = Σ(1, 4): inputs to NAND are Y1' = (m1)' and Y4' = (m4)'. NAND output = (Y1' · Y4')' = ((m1)' · (m4)')' = m1 + m4 = F.",
    "explanation": "Invoking De Morgan's theorem (A' · B')' = A'' + B'' = A + B proves exact SOP synthesis without requiring extra inverters."
  },
  {
    "id": 6,
    "question": "How is a 1-bit Full Subtractor realized using a 3-to-8 decoder and two gates?",
    "answer": "Difference = Σ(1, 2, 4, 7) and Borrow = Σ(1, 2, 3, 7); connect each set of outputs to an OR gate (or NAND gate for active-LOW).",
    "explanation": "Difference uses minterm lines 1, 2, 4, 7 into OR gate 1. Borrow uses minterm lines 1, 2, 3, 7 into OR gate 2."
  },
  {
    "id": 7,
    "question": "What is the primary advantage of using a decoder to implement multi-output logic circuits?",
    "answer": "All outputs share the same single decoder; each additional function only requires one external gate.",
    "explanation": "Instead of designing separate multi-gate AND-OR networks for every output, the single decoder generates all minterms once, drastically reducing chip count."
  },
  {
    "id": 8,
    "question": "If a 3-variable function has 6 minterms, how can external gate fan-in be optimized?",
    "answer": "Implement the complement F' using the 2 remaining non-minterms into an OR gate followed by a NOT gate (or a NOR gate).",
    "explanation": "Connecting 2 non-minterm lines to a NOR gate produces F with a 2-input gate instead of a 6-input OR gate, saving board space and propagation delay."
  },
  {
    "id": 9,
    "question": "Can a decoder realize Boolean functions containing 'don't care' conditions?",
    "answer": "Yes, by including the don't-care minterms in the OR/NAND gate only if they simplify external logic or if standardized.",
    "explanation": "Unlike K-maps where don't cares reduce gate inputs, in a decoder each minterm line is already formed. Don't cares are simply omitted unless sharing is beneficial."
  },
  {
    "id": 10,
    "question": "How does Read-Only Memory (ROM) internally rely on a decoder and an OR array?",
    "answer": "The address inputs drive a decoder (address decoder), and the decoder's minterm outputs drive a programmable OR matrix.",
    "explanation": "Every ROM is fundamentally an n-to-2^n decoder followed by an array of 2^n × m OR gates/fuses storing binary words."
  },
  {
    "id": 11,
    "question": "What is the difference between function realization using a Decoder vs. using a Multiplexer?",
    "answer": "A decoder generates all minterms and requires external OR gates; a MUX selects data inputs directly without requiring external gates.",
    "explanation": "Decoders excel at multi-output functions, whereas a multiplexer is self-contained for single-output Boolean function synthesis."
  },
  {
    "id": 12,
    "question": "Can a single decoder output be connected to multiple OR gates simultaneously?",
    "answer": "Yes, because logic gates draw minimal input current within their rated fan-out limit.",
    "explanation": "For example, minterm m1 is shared by both Difference and Borrow in a Full Subtractor, feeding both gates without interference."
  },
  {
    "id": 13,
    "question": "How can an active-HIGH decoder directly implement a POS function using an AND gate?",
    "answer": "By taking the complementary (unused) minterm outputs and inverting them before the AND gate, or directly using active-LOW decoders with an AND gate.",
    "explanation": "Since active-LOW outputs are already inverted minterms (maxterms), feeding them directly into an AND gate yields canonical POS: Π M_i."
  },
  {
    "id": 14,
    "question": "How many distinct Boolean functions of 3 variables can theoretically be synthesized by a 3-to-8 decoder?",
    "answer": "2^(2^3) = 2^8 = 256 different Boolean functions.",
    "explanation": "Each of the 8 minterms can either be included or excluded from a function, yielding 2^8 = 256 unique subset combinations."
  },
  {
    "id": 15,
    "question": "What are the standard steps required in ISC board exams for solving 'Implement F using a decoder'?",
    "answer": "1. Expand F into canonical minterm SOP form. 2. Specify decoder size. 3. Draw decoder block diagram with labeled inputs and outputs. 4. Connect minterms to OR/NAND gate.",
    "explanation": "Following these explicit four steps ensures total clarity and earns full marks according to CISCE evaluation rubrics."
  }
];

export default faqs;
