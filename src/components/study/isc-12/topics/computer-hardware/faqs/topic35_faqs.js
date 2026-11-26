// Topic 35 FAQs - 25 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "What are the highest-frequency topics from Computer Hardware in ISC Class 12 Board Exams?",
    "answer": "Full Adder using two Half Adders, 8:1 MUX implementation using residual variables, 3:8 Decoder cascading, and Encoder vs MUX comparisons.",
    "explanation": "Analysis of past 10 years of CISCE question papers shows that Half/Full Adders and MUX function implementations appear virtually every year."
  },
  {
    "id": 2,
    "question": "What is the standard CISCE marking scheme for a 5-mark combinational circuit question?",
    "answer": "1 mark for truth table, 1 mark for Boolean algebraic derivation/simplification, 2 marks for logic circuit diagram, 1 mark for proper labeling.",
    "explanation": "Marks are distributed systematically across every phase of the solution; missing labels or truth table columns directly loses marks."
  },
  {
    "id": 3,
    "question": "What is the most common error in Half Subtractor and Full Subtractor questions in board exams?",
    "answer": "Writing Borrow as A·B' instead of A'·B, confusing which operand is the minuend and subtrahend.",
    "explanation": "In subtraction (A - B), a borrow occurs when A=0 and B=1, which produces the minterm A'·B. Writing A·B' is completely incorrect."
  },
  {
    "id": 4,
    "question": "In drawing Cascaded Decoders (e.g., 3:8 from 2:4), what omission causes students to lose 2 out of 3 marks?",
    "answer": "Omitting the inverter on the MSB Enable line or leaving the Enable lines floating without clear connections.",
    "explanation": "Without the NOT gate on MSB A, both decoders would be enabled simultaneously, defeating the entire purpose of cascading."
  },
  {
    "id": 5,
    "question": "What are the mandatory elements required when implementing a Boolean function using a MUX in ISC exams?",
    "answer": "1. Identification of select and residual variables. 2. Implementation table with circled minterms. 3. Input expressions list. 4. Complete circuit diagram.",
    "explanation": "Skipping the implementation table and directly drawing the circuit diagram often leads to immediate deduction of 2 marks."
  },
  {
    "id": 6,
    "question": "How should students represent Active-LOW outputs and inputs on IC block diagrams to avoid losing marks?",
    "answer": "Draw small inversion bubbles on the pins and write prime or overbar symbols on signal names (e.g., /EN, Y0').",
    "explanation": "CISCE evaluators strictly penalize diagrams that omit inversion bubbles when active-LOW logic (such as in 74138 decoders) is specified."
  },
  {
    "id": 7,
    "question": "When asked for a 'Truth Table with Enable', how should the disabled condition be represented?",
    "answer": "Include a first row with Enable = 0, inputs marked as 'X' (don't-care), and all outputs showing their inactive state (0 or 1).",
    "explanation": "Showing the disabled state confirms that the student understands the master gating function of the Enable control."
  },
  {
    "id": 8,
    "question": "Why must logic gate symbols strictly conform to standard ANSI/IEEE shapes in ISC exams?",
    "answer": "Hand-drawn curved AND gates that resemble OR gates, or sharp-cornered OR gates that resemble AND gates, are marked as zero by examiners.",
    "explanation": "Clear distinction between the flat-backed AND gate, curved-backed shield-shaped OR gate, and triangular NOT gate is strictly enforced."
  },
  {
    "id": 9,
    "question": "What is the rule regarding labeling bus lines and pin numbers in board examination diagrams?",
    "answer": "Signal labels (A, B, Cin, S, Cout, S0-S2, I0-I7) are mandatory; physical IC pin numbers (pin 1, 2, etc.) are optional unless asked.",
    "explanation": "Examiners evaluate logical correctness and functional signal routing rather than rote memorization of IC pinouts."
  },
  {
    "id": 10,
    "question": "How do students clearly distinguish between a Binary Encoder and a Priority Encoder in descriptive exam answers?",
    "answer": "State that a binary encoder assumes strictly one active input at a time, whereas a priority encoder handles multiple active inputs by ranking them.",
    "explanation": "Mentioning the Valid Output (V) pin and the priority resolution structure demonstrates advanced conceptual mastery."
  },
  {
    "id": 11,
    "question": "What is the exact step-by-step method to realize a function using a Decoder and external logic gates?",
    "answer": "1. Expand F to canonical SOP minterms. 2. Choose an n-to-2^n decoder. 3. Draw the decoder block. 4. Connect minterm outputs to an OR gate (or NAND for active-LOW).",
    "explanation": "Following this standardized procedure ensures that no required mathematical or architectural step is omitted."
  },
  {
    "id": 12,
    "question": "How do you handle non-canonical Boolean expressions when an exam question asks for Decoder or MUX implementation?",
    "answer": "You must first expand the expression algebraically into canonical SOP minterm format before constructing the implementation table.",
    "explanation": "For example, expand F(A,B,C) = AB + C' into Σ(4, 5, 6, 7, 0, 2) before mapping minterms to multiplexer inputs."
  },
  {
    "id": 13,
    "question": "What is the penalty for writing raw Boolean expressions without showing derivation or truth tables?",
    "answer": "Partial credit only (usually 1-2 marks out of 5), because CISCE rubrics allocate specific marks for step-by-step derivation.",
    "explanation": "Board marking schemes are cumulative: step-by-step working is required to verify that the answer is not guesswork."
  },
  {
    "id": 14,
    "question": "How should time management be handled for the Computer Hardware section in the 3-hour ISC theory paper?",
    "answer": "Allocate approximately 25-30 minutes total for Hardware questions, allowing 5-6 minutes per 5-mark question for neat circuit diagrams.",
    "explanation": "Pencil drafting of logic diagrams with ruler-straight lines avoids messy cross-outs that consume valuable exam time."
  },
  {
    "id": 15,
    "question": "What are the top three pieces of advice from senior CISCE Computer Science examiners for scoring 100% in this module?",
    "answer": "1. Never forget the Enable line. 2. Always show the Implementation Table for MUX questions. 3. Practice drawing standard gate shapes with crisp labels.",
    "explanation": "Consistent adherence to these three fundamental guidelines reliably turns 80% scripts into 100% perfect scoring scripts."
  },
  {
    "id": 16,
    "question": "What is the typical marks distribution for Computer Hardware & Combinational Circuits in ISC Class 12?",
    "answer": "Approximately 10 to 14 marks out of 70 marks in Paper 1 (Theory), spanning Section A (short 1-2 mark questions) and Section B/D (4-5 mark circuit design problems).",
    "explanation": "Consistently forms a major compulsory scoring component in CISCE board exams."
  },
  {
    "id": 17,
    "question": "What are the common 2-mark definitions tested by CISCE in this unit?",
    "answer": "Combinational vs Sequential circuits, Multiplexer, Demultiplexer, Half Adder vs Full Adder, Encoder, Priority Encoder, and Universal Gates.",
    "explanation": "2-mark definitions require exact keywords: 'outputs depend solely on present inputs', 'no memory elements', 'data selector', '2^n inputs to n outputs'."
  },
  {
    "id": 18,
    "question": "What are the common 4-mark design and derivation questions in CISCE exams?",
    "answer": "1. Full Adder using two Half Adders and an OR gate (with algebraic proof); 2. Full Subtractor using two Half Subtractors and an OR gate; 3. 4-to-1 or 8-to-1 MUX Boolean function realization.",
    "explanation": "These three standard derivation problems appear in almost every alternative year's board paper."
  },
  {
    "id": 19,
    "question": "What is the CISCE marking criterion for circuit diagrams?",
    "answer": "Correct gate symbols (distinct shapes for AND, OR, XOR), clear labeling of all input and output signal names, and explicit connection dots (nodes) where wires branch.",
    "explanation": "Messy diagrams or missing pin labels lead to immediate mark deductions."
  },
  {
    "id": 20,
    "question": "How should a student present a Multiplexer Function Realization question for maximum marks?",
    "answer": "Step 1: Assign select lines; Step 2: Draw the implementation table with circled minterms; Step 3: Write values for I0-I_k; Step 4: Draw neat MUX block diagram with labeled connections.",
    "explanation": "Following these 4 structured steps guarantees full 4/4 or 5/5 marks."
  },
  {
    "id": 21,
    "question": "What common mistake do students make in the Full Adder algebraic carry proof?",
    "answer": "Confusing C1 + C2 = AB + (A ⊕ B)Cin with AB + BCin + ACin by forgetting to expand (A ⊕ B) as (AB' + A'B) and factoring common terms.",
    "explanation": "Board evaluators inspect every intermediate algebraic step."
  },
  {
    "id": 22,
    "question": "In Encoder questions, why do students lose marks on input D0?",
    "answer": "Connecting D0 to an OR gate. D0 produces 00...0 and must NOT be connected to any OR gate.",
    "explanation": "Connecting D0 forces an output line HIGH, generating an erroneous code."
  },
  {
    "id": 23,
    "question": "How are Karnaugh Maps evaluated when designing combinational circuits in board exams?",
    "answer": "1 mark for correct K-map layout and plotting; 1 mark for correct grouping (pairs/quads/octets); 1 mark for minimal SOP/POS expression.",
    "explanation": "Overlapping groups and reduntant groups are penalized."
  },
  {
    "id": 24,
    "question": "Why should students always label IC part numbers (e.g. 74151, 74148, 74138) in hardware answers?",
    "answer": "Citing standard TTL IC numbers demonstrates professional technical authenticity and aligns with ISC marking guidelines.",
    "explanation": "Shows deep mastery beyond abstract block diagrams."
  },
  {
    "id": 25,
    "question": "What is the golden rule for time management in the CISCE Computer Hardware section?",
    "answer": "Allocate roughly 1.5 minutes per mark (6 minutes for a 4-mark design question); use a ruler and pencil for gate diagrams to ensure clarity.",
    "explanation": "Neat, prompt circuit drawing prevents running out of time in Section B/D."
  }
];

export default faqs;
