// Topic 1 FAQs - 15 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    "id": 1,
    "question": "Why are NAND and NOR gates designated as 'Universal Logic Gates'?",
    "answer": "Because any elementary logic function (NOT, AND, OR, XOR, XNOR) can be implemented solely using only NAND gates or only NOR gates.",
    "explanation": "Universal gates eliminate the need for multiple different chip types in manufacturing, significantly lowering IC fabrication and inventory costs."
  },
  {
    "id": 2,
    "question": "How do you realize an inverter (NOT gate) using a single 2-input NAND gate?",
    "answer": "By tying both inputs of the NAND gate together to receive the single variable A (or connecting one input to Vcc).",
    "explanation": "When both inputs are tied together: NAND(A, A) = (A · A)' = A'. Thus, the 2-input NAND acts as a perfect NOT gate."
  },
  {
    "id": 3,
    "question": "How many 2-input NAND gates are required to synthesize an XOR gate?",
    "answer": "Exactly 4 NAND gates.",
    "explanation": "The equation A ⊕ B = A'B + AB' can be rewritten as (A · (AB)')' · (B · (AB)')', which requires 4 two-input NAND gates arranged in 3 stages."
  },
  {
    "id": 4,
    "question": "How many 2-input NOR gates are required to construct an XOR gate?",
    "answer": "Exactly 5 NOR gates.",
    "explanation": "While NAND requires 4 gates for XOR, NOR realization requires 5 gates. Conversely, XNOR requires 4 NOR gates and 5 NAND gates."
  },
  {
    "id": 5,
    "question": "What is the output of an XOR gate when both inputs are identical?",
    "answer": "The output is always logic 0 (LOW).",
    "explanation": "XOR (Exclusive OR) is an inequality detector: it yields 1 if and only if the inputs are different (0 ⊕ 1 = 1, 1 ⊕ 0 = 1). When inputs are identical (0 ⊕ 0 = 0, 1 ⊕ 1 = 0)."
  },
  {
    "id": 6,
    "question": "Why is the XOR gate also referred to as an 'Odd Function' or 'Parity Generator'?",
    "answer": "Because a multi-input XOR gate yields 1 if and only if an odd number of its inputs are at logic 1.",
    "explanation": "This property makes XOR gates the universal building block for parity checkers, error detecting codes, and binary addition."
  },
  {
    "id": 7,
    "question": "What is the truth table relationship between XOR and XNOR gates?",
    "answer": "The XNOR gate is the exact Boolean complement (inversion) of the XOR gate.",
    "explanation": "XOR = A'B + AB' (inequality detector); XNOR = AB + A'B' (equality/equivalence detector). XNOR output is 1 when both inputs are equal."
  },
  {
    "id": 8,
    "question": "State De Morgan's First Law and its gate equivalent.",
    "answer": "(A · B)' = A' + B'; a NAND gate is logically equivalent to a Bubbled OR gate.",
    "explanation": "De Morgan's First Law proves that the complement of a product is equal to the sum of the complements."
  },
  {
    "id": 9,
    "question": "State De Morgan's Second Law and its gate equivalent.",
    "answer": "(A + B)' = A' · B'; a NOR gate is logically equivalent to a Bubbled AND gate.",
    "explanation": "De Morgan's Second Law proves that the complement of a sum is equal to the product of the complements."
  },
  {
    "id": 10,
    "question": "How does an AND gate behave if one of its inputs is tied to logic 0?",
    "answer": "Its output is permanently forced to logic 0, acting as an inhibitor (closed gate).",
    "explanation": "By Boolean Annihilation Law: A · 0 = 0. Tying an input to 0 disables the gate regardless of the signal on the other input."
  },
  {
    "id": 11,
    "question": "How does an OR gate behave if one of its inputs is tied to logic 1?",
    "answer": "Its output is permanently forced to logic 1.",
    "explanation": "By Boolean Annihilation Law: A + 1 = 1. Tying an input to 1 locks the output permanently HIGH."
  },
  {
    "id": 12,
    "question": "What is Fan-In and Fan-Out of a logic gate?",
    "answer": "Fan-In is the maximum number of inputs a gate can receive; Fan-Out is the maximum number of standard gate inputs its output can drive without signal degradation.",
    "explanation": "Exceeding fan-out causes electrical overloading, dropping the output voltage below standard logic HIGH thresholds."
  },
  {
    "id": 13,
    "question": "What is the ANSI symbol difference between an AND gate and an OR gate?",
    "answer": "An AND gate has a flat input back and round output face; an OR gate has a curved input back and pointed output tip.",
    "explanation": "In board diagrams, failing to draw the curved back of an OR gate often leads examiners to mistake it for an AND gate, costing marks."
  },
  {
    "id": 14,
    "question": "What happens when an XOR gate has one input connected permanently to logic 1?",
    "answer": "It functions as an inverter (NOT gate): A ⊕ 1 = A'.",
    "explanation": "When A=0, 0 ⊕ 1 = 1; when A=1, 1 ⊕ 1 = 0. Connecting an input to 1 inverts the other input, used extensively in add/subtract units."
  },
  {
    "id": 15,
    "question": "What is the common mistake students make when drawing universal gate circuits?",
    "answer": "Omitting the small inversion bubble on NAND and NOR gate outputs.",
    "explanation": "Without the bubble, a NAND gate is drawn as an AND gate and a NOR is drawn as an OR gate, rendering the entire derivation invalid."
  }
];

export default faqs;
