// topic11_questions.js
// CBSE Class XI Computer Science (083) - Topic 11: 30-Question Board Exam Simulator
// Unit 1: Computer Systems and Organisation (CSO) - Boolean Logic & Logic Gates
// Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)

const questions = [
  {
    id: 1,
    question: "Which of the following logic gates outputs 1 only when all of its inputs are 1?",
    options: ["OR Gate", "AND Gate", "NOR Gate", "XOR Gate"],
    answer: "AND Gate",
    explanation: "An AND gate performs logical multiplication and outputs 1 if and only if all input signals are 1.",
    explanationBn: "AND গেট শুধুমাত্র তখনই ১ আউটপুট দেয় যখন সমস্ত ইনপুট ১ হয়।"
  },
  {
    id: 2,
    question: "Which pair of digital gates are classified as Universal Logic Gates?",
    options: [
      "AND and OR Gates",
      "NAND and NOR Gates",
      "XOR and XNOR Gates",
      "NOT and Buffer Gates"
    ],
    answer: "NAND and NOR Gates",
    explanation: "NAND and NOR gates are universal because any Boolean function can be realized using only NAND or only NOR gates.",
    explanationBn: "NAND এবং NOR গেটকে সার্বজনীন গেট বলা হয় কারণ এদের দিয়ে যেকোনো ডিজিটাল সার্কিট তৈরি করা সম্ভব।"
  },
  {
    id: 3,
    question: "How many 2-input NAND gates are required to realize a NOT gate (Inverter)?",
    options: ["1", "2", "3", "4"],
    answer: "1",
    explanation: "Tying both inputs of a NAND gate together yields (A · A)' = A', which uses exactly 1 NAND gate.",
    explanationBn: "একটি NAND গেটের দুটি ইনপুট একসাথে সংযুক্ত করলে (A.A)' = A' পাওয়া যায়, অর্থাৎ ১টি গেট প্রয়োজন।"
  },
  {
    id: 4,
    question: "How many 2-input NAND gates are required to construct a 2-input AND gate?",
    options: ["1", "2", "3", "4"],
    answer: "2",
    explanation: "Two NAND gates are required: the first computes (AB)', and the second acts as an inverter ((AB)')' = AB.",
    explanationBn: "২টি NAND গেট প্রয়োজন: প্রথমটি (AB)' তৈরি করে এবং দ্বিতীয়টি তাকে ইনভার্ট করে AB দেয়।"
  },
  {
    id: 5,
    question: "How many 2-input NAND gates are required to construct a 2-input OR gate?",
    options: ["2", "3", "4", "5"],
    answer: "3",
    explanation: "Three NAND gates are required: 2 inverters for A' and B', and a 3rd NAND computing (A' · B')' = A + B (by De Morgan's Law).",
    explanationBn: "৩টি NAND গেট প্রয়োজন: A' ও B' তৈরি করতে ২টি এবং শেষটিতে (A'B')' = A+B পেতে ৩য়টি লাগে।"
  },
  {
    id: 6,
    question: "What is the Boolean algebraic definition of an XOR (Exclusive-OR) gate for inputs A and B?",
    options: [
      "Y = AB + A'B'",
      "Y = A'B + AB'",
      "Y = A + B",
      "Y = A · B"
    ],
    answer: "Y = A'B + AB'",
    explanation: "XOR produces 1 when inputs differ: Y = A ⊕ B = A'B + AB'.",
    explanationBn: "XOR গেটের বুলিয়ান সমীকরণ হলো Y = A'B + AB'।"
  },
  {
    id: 7,
    question: "What is the Boolean algebraic definition of an XNOR (Exclusive-NOR) gate for inputs A and B?",
    options: [
      "Y = A'B + AB'",
      "Y = AB + A'B'",
      "Y = (A + B)'",
      "Y = A' + B'"
    ],
    answer: "Y = AB + A'B'",
    explanation: "XNOR produces 1 when inputs are equal: Y = (A ⊕ B)' = AB + A'B'.",
    explanationBn: "XNOR গেটের বুলিয়ান সমীকরণ হলো Y = AB + A'B'।"
  },
  {
    id: 8,
    question: "What is De Morgan's First Law?",
    options: [
      "(A + B)' = A' · B'",
      "(A · B)' = A' + B'",
      "(A + B)' = A + B",
      "A · B = A + B"
    ],
    answer: "(A + B)' = A' · B'",
    explanation: "De Morgan's First Law states: (A + B)' = A' · B' (The complement of a sum is the product of complements).",
    explanationBn: "ডি মর্গানের প্রথম সূত্র: (A + B)' = A' · B'।"
  },
  {
    id: 9,
    question: "What is De Morgan's Second Law?",
    options: [
      "(A + B)' = A' · B'",
      "(A · B)' = A' + B'",
      "(A · B)' = A' · B'",
      "(A')' = A"
    ],
    answer: "(A · B)' = A' + B'",
    explanation: "De Morgan's Second Law states: (A · B)' = A' + B' (The complement of a product is the sum of complements).",
    explanationBn: "ডি মর্গানের দ্বিতীয় সূত্র: (A · B)' = A' + B'।"
  },
  {
    id: 10,
    question: "Which of the following is the dual of the identity A + 0 = A?",
    options: [
      "A · 1 = A",
      "A + 1 = 1",
      "A · 0 = 0",
      "A' · 1 = A"
    ],
    answer: "A · 1 = A",
    explanation: "By the Duality Principle, replacing '+' with '·' and '0' with '1' gives A · 1 = A.",
    explanationBn: "দ্বৈততার নীতি অনুসারে '+' কে '·' এবং '০' কে '১' করলে A · 1 = A পাওয়া যায়।"
  },
  {
    id: 11,
    question: "What is the dual of the Boolean expression: A + B · C?",
    options: [
      "A · (B + C)",
      "A' · (B' + C')",
      "(A + B) · C",
      "A + B + C"
    ],
    answer: "A · (B + C)",
    explanation: "Interchanging '+' and '·' yields A · (B + C). Literal variables remain uncomplemented.",
    explanationBn: "অপারেটর অদলবদল করলে পাওয়া যায় A · (B + C)।"
  },
  {
    id: 12,
    question: "What is the output of the Boolean function F = A + A'B in simplified form?",
    options: [
      "A",
      "B",
      "A + B",
      "AB"
    ],
    answer: "A + B",
    explanation: "By the Distributive Law / 3rd Absorption Law: A + A'B = (A + A')(A + B) = (1)(A + B) = A + B.",
    explanationBn: "A + A'B = (A + A')(A + B) = 1 · (A + B) = A + B।"
  },
  {
    id: 13,
    question: "What is the value of the Boolean identity A · (A + B)?",
    options: [
      "B",
      "A",
      "AB",
      "A + B"
    ],
    answer: "A",
    explanation: "By the Absorption Law: A · (A + B) = A · A + A · B = A + AB = A.",
    explanationBn: "শোষণ সূত্র অনুসারে A · (A + B) = A।"
  },
  {
    id: 14,
    question: "How many rows are present in the truth table of a 4-variable Boolean function?",
    options: ["8", "12", "16", "32"],
    answer: "16",
    explanation: "Number of rows in an n-variable truth table = 2^n. For 4 variables: 2^4 = 16 rows.",
    explanationBn: "৪টি ভেরিয়েবলের জন্য ট্রুথ টেবিলে মোট ২^৪ = ১৬টি সারি থাকে।"
  },
  {
    id: 15,
    question: "A Boolean expression that evaluates to 1 (True) for all possible input combinations is called a:",
    options: [
      "Tautology",
      "Fallacy / Contradiction",
      "Contingency",
      "Minterm"
    ],
    answer: "Tautology",
    explanation: "A Tautology is universally True for all rows in its truth table.",
    explanationBn: "যে বুলিয়ান রাশি সমস্ত ইনপুটের জন্য সর্বদা ১ আউটপুট দেয় তাকে Tautology বলে।"
  },
  {
    id: 16,
    question: "A Boolean expression that evaluates to 0 (False) for all possible input combinations is called a:",
    options: [
      "Tautology",
      "Fallacy / Contradiction",
      "Contingency",
      "Maxterm"
    ],
    answer: "Fallacy / Contradiction",
    explanation: "A Fallacy or Contradiction is universally False (evaluates to 0) for all input rows.",
    explanationBn: "যে বুলিয়ান রাশি সমস্ত ইনপুটের জন্য সর্বদা ০ আউটপুট দেয় তাকে Fallacy বা Contradiction বলে।"
  },
  {
    id: 17,
    question: "In a binary Half Adder, what is the equation for the Sum bit?",
    options: [
      "Sum = A ⊕ B",
      "Sum = A · B",
      "Sum = A + B",
      "Sum = (A ⊕ B)'"
    ],
    answer: "Sum = A ⊕ B",
    explanation: "The Sum bit in binary addition is produced by an XOR gate: Sum = A ⊕ B.",
    explanationBn: "হাফ অ্যাডারের Sum বিটটি XOR গেট দ্বারা উৎপন্ন হয়: Sum = A ⊕ B।"
  },
  {
    id: 18,
    question: "In a binary Half Adder, what is the equation for the Carry bit?",
    options: [
      "Carry = A ⊕ B",
      "Carry = A · B",
      "Carry = A + B",
      "Carry = (A · B)'"
    ],
    answer: "Carry = A · B",
    explanation: "The Carry bit in binary addition is produced by an AND gate: Carry = A · B.",
    explanationBn: "হাফ অ্যাডারের Carry বিটটি AND গেট দ্বারা উৎপন্ন হয়: Carry = A · B।"
  },
  {
    id: 19,
    question: "What is the standard TTL 7400-series IC number for a Hex Inverter (NOT gate)?",
    options: ["IC 7400", "IC 7404", "IC 7408", "IC 7432"],
    answer: "IC 7404",
    explanation: "IC 7404 is the standard TTL Hex Inverter IC.",
    explanationBn: "IC 7404 হলো হেক্স ইনভার্টার (NOT গেট) আইসি।"
  },
  {
    id: 20,
    question: "What is the standard TTL 7400-series IC number for a Quad 2-Input NAND gate?",
    options: ["IC 7400", "IC 7402", "IC 7408", "IC 7486"],
    answer: "IC 7400",
    explanation: "IC 7400 is the standard TTL Quad 2-Input NAND gate IC.",
    explanationBn: "IC 7400 হলো কোয়াড ২-ইনপুট NAND গেট আইসি।"
  },
  {
    id: 21,
    question: "What is the standard TTL 7400-series IC number for a Quad 2-Input XOR gate?",
    options: ["IC 7408", "IC 7432", "IC 7486", "IC 74266"],
    answer: "IC 7486",
    explanation: "IC 7486 is the standard TTL Quad 2-Input XOR gate IC.",
    explanationBn: "IC 7486 হলো কোয়াড ২-ইনপুট XOR গেট আইসি।"
  },
  {
    id: 22,
    question: "What is the result of the Involution Law: (A')'?",
    options: ["0", "1", "A'", "A"],
    answer: "A",
    explanation: "Law of Involution (double negation): (A')' = A.",
    explanationBn: "ডাবল ইনভার্শন বা ইনভোলিউশন সূত্র অনুযায়ী (A')' = A।"
  },
  {
    id: 23,
    question: "What is the value of the Boolean term A + 1?",
    options: ["A", "0", "1", "2"],
    answer: "1",
    explanation: "By the Boundedness / Null Law for OR: A + 1 = 1.",
    explanationBn: "বুলিয়ান যুক্তিতে A + 1 = 1।"
  },
  {
    id: 24,
    question: "What is the value of the Boolean term A · 0?",
    options: ["0", "1", "A", "A'"],
    answer: "0",
    explanation: "By the Boundedness / Null Law for AND: A · 0 = 0.",
    explanationBn: "বুলিয়ান যুক্তিতে A · 0 = 0।"
  },
  {
    id: 25,
    question: "What is the value of A ⊕ A?",
    options: ["0", "1", "A", "A'"],
    answer: "0",
    explanation: "XOR of identical inputs always produces 0: A ⊕ A = A'A + AA' = 0 + 0 = 0.",
    hint: "Identical inputs in XOR yield 0.",
    explanationBn: "একই ইনপুট XOR করলে সর্বদা ০ আউটপুট আসে: A ⊕ A = 0।"
  },
  {
    id: 26,
    question: "What is the value of A ⊕ A'?",
    options: ["0", "1", "A", "A'"],
    answer: "1",
    explanation: "XOR of complementary inputs always produces 1: A ⊕ A' = A'(A') + A(A')' = A' + A = 1.",
    explanationBn: "বিপরীত ইনপুট XOR করলে সর্বদা ১ আউটপুট আসে: A ⊕ A' = 1।"
  },
  {
    id: 27,
    question: "Which of the following circuits synthesizes the Sum-of-Products (SOP) canonical form in 2 levels?",
    options: [
      "AND-OR Circuit",
      "OR-AND Circuit",
      "NAND-NOR Circuit",
      "Inverter-Buffer Circuit"
    ],
    answer: "AND-OR Circuit",
    explanation: "An SOP expression (e.g. AB + CD) is implemented by Level 1 AND gates feeding into a Level 2 OR gate.",
    explanationBn: "SOP রাশিমালাকে ২-লেভেল AND-OR সার্কিট দ্বারা রূপায়ন করা হয়।"
  },
  {
    id: 28,
    question: "Which Boolean theorem states: A + (B · C) = (A + B) · (A + C)?",
    options: [
      "Distributive Law of OR over AND",
      "Associative Law",
      "Absorption Law",
      "Commutative Law"
    ],
    answer: "Distributive Law of OR over AND",
    explanation: "In Boolean algebra, OR distributes over AND: A + BC = (A + B)(A + C).",
    explanationBn: "এটি হলো OR-এর AND-এর উপর বণ্টন সূত্র (Distributive Law of OR over AND)।"
  },
  {
    id: 29,
    question: "What logic gate is mathematically equivalent to a 'Bubbled OR' gate (OR gate with inverted inputs)?",
    options: ["NOR Gate", "NAND Gate", "AND Gate", "XOR Gate"],
    answer: "NAND Gate",
    explanation: "By De Morgan's 2nd Law: A' + B' = (A · B)'. Thus a bubbled OR gate is identical to a NAND gate.",
    explanationBn: "ডি মর্গানের সূত্রে A' + B' = (AB)', যা একটি NAND গেটের সমতুল্য।"
  },
  {
    id: 30,
    question: "What logic gate is mathematically equivalent to a 'Bubbled AND' gate (AND gate with inverted inputs)?",
    options: ["NAND Gate", "NOR Gate", "OR Gate", "XNOR Gate"],
    answer: "NOR Gate",
    explanation: "By De Morgan's 1st Law: A' · B' = (A + B)'. Thus a bubbled AND gate is identical to a NOR gate.",
    explanationBn: "ডি মর্গানের সূত্রে A' · B' = (A + B)', যা একটি NOR গেটের সমতুল্য।"
  }
];

export default questions;
