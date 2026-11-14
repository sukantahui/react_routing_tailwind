// Topic 39 FAQs - 15 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "Why are there two different conventions for singling out a variable in MUX implementation?",
    "answer": "One convention singles out the leftmost variable (MSB), while the other singles out the rightmost variable (LSB).",
    "explanation": "Both conventions are mathematically valid and synthesize 100% equivalent logical functions, but they partition the implementation table differently."
  },
  {
    "id": 2,
    "question": "In the Leftmost Singled-Out method for F(A, B, C), which variable is data and which are select lines?",
    "answer": "Leftmost variable A is the data literal; variables B and C connect to select lines S1 and S0.",
    "explanation": "This is the primary convention used in CISCE Computer Science textbooks."
  },
  {
    "id": 3,
    "question": "In the Rightmost Singled-Out method for F(A, B, C), which variable is data and which are select lines?",
    "answer": "Rightmost variable C is the data literal; variables A and B connect to select lines S1 and S0.",
    "explanation": "This convention is frequently found in engineering digital design textbooks (such as Morris Mano)."
  },
  {
    "id": 4,
    "question": "How are minterms arranged in the rows for the Leftmost Singled-Out method (A)?",
    "answer": "Row 1 (A'): minterms 0, 1, 2, 3; Row 2 (A): minterms 4, 5, 6, 7.",
    "explanation": "Minterms are split into continuous upper and lower halves: column I_k pairs minterm k with k+4."
  },
  {
    "id": 5,
    "question": "How are minterms arranged in the rows for the Rightmost Singled-Out method (C)?",
    "answer": "Row 1 (C'): minterms 0, 2, 4, 6; Row 2 (C): minterms 1, 3, 5, 7.",
    "explanation": "Minterms are split into even and odd indices: column I_k pairs minterm 2k with 2k+1."
  },
  {
    "id": 6,
    "question": "For F(A, B, C) = Σ(0, 2, 4, 6, 7), derive data inputs under Method A (A singled out).",
    "answer": "I0 = 1 (Rule 2), I1 = 0 (Rule 1), I2 = 1 (Rule 2), I3 = A (Rule 3).",
    "explanation": "I0(0,4): both circled -> 1; I1(1,5): neither -> 0; I2(2,6): both circled -> 1; I3(3,7): 7 circled -> A."
  },
  {
    "id": 7,
    "question": "For F(A, B, C) = Σ(0, 2, 4, 6, 7), derive data inputs under Method B (C singled out).",
    "answer": "I0 = C' (Rule 4), I1 = C' (Rule 4), I2 = C' (Rule 4), I3 = 1 (Rule 2).",
    "explanation": "I0(0,1): 0 circled -> C'; I1(2,3): 2 circled -> C'; I2(4,5): 4 circled -> C'; I3(6,7): both circled -> 1."
  },
  {
    "id": 8,
    "question": "Compare the gate requirements of Method A vs Method B for F(A, B, C) = Σ(0, 2, 4, 6, 7).",
    "answer": "Method A requires ZERO external inverters; Method B requires ONE external inverter (to produce C').",
    "explanation": "Method A applies literal A directly without inversion, making it hardware-superior for this specific function."
  },
  {
    "id": 9,
    "question": "How does a student know which variable to single out in an ISC board examination?",
    "answer": "Follow the question statement: if it says 'using B, C as select lines', single out A; if it says 'using A, B as select lines', single out C.",
    "explanation": "If no preference is specified, students may use either convention, though leftmost singled-out is standard in CISCE textbooks."
  },
  {
    "id": 10,
    "question": "Can middle variable B be singled out? What would the select lines and table rows be?",
    "answer": "Yes, select lines would be S1=A, S0=C; Row 1 (B'): 0, 1, 4, 5; Row 2 (B): 2, 3, 6, 7.",
    "explanation": "Any variable can mathematically be chosen as the residual data variable, altering column groupings accordingly."
  },
  {
    "id": 11,
    "question": "Do Method A and Method B produce the same output truth table? Prove it.",
    "answer": "Yes, both produce identical outputs (1 for minterms 0, 2, 4, 6, 7 and 0 for 1, 3, 5).",
    "explanation": "Both represent the identical Boolean truth table; they merely differ in internal routing paths."
  },
  {
    "id": 12,
    "question": "What error occurs if a student mixes up the row headers between Method A and Method B?",
    "answer": "The column minterm groupings become invalid, producing an incorrect circuit that outputs wrong logic values.",
    "explanation": "Row headers define which variable is complemented (0) vs uncomplemented (1); mixing them destroys the mathematical mapping."
  },
  {
    "id": 13,
    "question": "How do examiners award marks if a student uses Method B when textbook shows Method A?",
    "answer": "Full credit is awarded as long as the implementation table, select line connections, and derivations are mathematically consistent.",
    "explanation": "CISCE evaluation rubrics accept any logically valid derivation provided the working steps are clearly demonstrated."
  },
  {
    "id": 14,
    "question": "What is the primary advantage of choosing the variable that eliminates the inverter gate?",
    "answer": "It reduces chip count, propagation delay, and circuit power consumption.",
    "explanation": "In our example, Method A uses inputs {1, 0, 1, A} requiring 0 inverters, whereas Method B requires a 7404 inverter chip for C'."
  },
  {
    "id": 15,
    "question": "What is the best exam tip for avoiding confusion between Leftmost and Rightmost methods?",
    "answer": "Always write: 'Singled-out Variable = X, Select Lines = (Y, Z)' at the top of your answer script before drawing the table.",
    "explanation": "Explicitly stating your variable assignments establishes immediate clarity for the evaluator."
  }
];

export default faqs;
