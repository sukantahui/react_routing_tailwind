// Topic 42 FAQs - 15 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty
// Special Topic: 10 Detailed 8:1 Multiplexer Implementation Examples

export const faqs = [
  {
    id: 1,
    question: "Why is an 8:1 Multiplexer chosen to implement a 4-variable Boolean function F(a, b, c, d)?",
    answer: "Because a 4-variable function has n = 4 variables. Singling out 1 variable leaves n - 1 = 3 variables for select lines, which select 2^(n-1) = 2^3 = 8 data inputs (I0 to I7).",
    explanation: "Using an 8:1 MUX allows 1 variable to be applied directly or inverted at the data pins while the other 3 variables drive select lines S2, S1, S0."
  },
  {
    id: 2,
    question: "In the textbook method (Section 2.3.4A), which variable is singled out and which drive the select lines?",
    answer: "Variable a is singled out as the data input literal, while variables b, c, and d connect to select lines S2 = b, S1 = c, and S0 = d.",
    explanation: "This follows the natural alphabetical sequence (abcd) where the most significant variable a is partitioned across the two rows."
  },
  {
    id: 3,
    question: "How are the two rows of the 8:1 MUX implementation table labeled and formed?",
    answer: "The top row is labeled a' (a = 0) containing minterms 0 to 7; the bottom row is labeled a (a = 1) containing minterms 8 to 15.",
    explanation: "For any minterm m from 0 to 7, the binary representation has a = 0 (e.g., m3 = 0011). For m from 8 to 15, a = 1 (e.g., m11 = 1011)."
  },
  {
    id: 4,
    question: "How do the columns of the table correspond to the MUX input pins I0 through I7?",
    answer: "Each column corresponds to a 3-bit binary combination of bcd from 000 (I0) to 111 (I7).",
    explanation: "Column Ik pairs minterm k (top row, a=0) with minterm k+8 (bottom row, a=1), corresponding to select code bcd = k."
  },
  {
    id: 5,
    question: "What is Rule 1 for determining a MUX data-pin value?",
    answer: "Rule 1: If neither minterm in a column is included in the function (0/0), connect the data pin to Logic 0 (Ground).",
    explanation: "Since the function is 0 regardless of whether a is 0 or 1, the multiplexer output must remain 0 whenever that channel is selected."
  },
  {
    id: 6,
    question: "What is Rule 2 for determining a MUX data-pin value?",
    answer: "Rule 2: If both minterms in a column are included in the function (1/1), connect the data pin to Logic 1 (VCC).",
    explanation: "Since the function is 1 regardless of whether a is 0 or 1, the multiplexer output must remain 1 whenever that channel is selected."
  },
  {
    id: 7,
    question: "What is Rule 3 for determining a MUX data-pin value?",
    answer: "Rule 3: If only the bottom minterm (row a) is included (0/1), connect the data pin to variable a.",
    explanation: "When a = 0 the output is 0, and when a = 1 the output is 1. The output exactly follows variable a, so pin Ik = a."
  },
  {
    id: 8,
    question: "What is Rule 4 for determining a MUX data-pin value?",
    answer: "Rule 4: If only the top minterm (row a') is included (1/0), connect the data pin to the complement a'.",
    explanation: "When a = 0 the output is 1, and when a = 1 the output is 0. The output is inverted relative to a, so pin Ik = a' (requires a NOT gate)."
  },
  {
    id: 9,
    question: "What is the memory trick to quickly remember the four data-pin connection rules?",
    answer: "Identical vertical values yield constants (0/0 -> 0, 1/1 -> 1). Different values follow the active row (0/1 has 1 in row a -> a; 1/0 has 1 in row a' -> a').",
    explanation: "Looking at where the '1' resides immediately tells you whether the signal is uncomplemented (a) or complemented (a')."
  },
  {
    id: 10,
    question: "For F(a, b, c, d) = Σ(0, 1, 3, 4, 8, 9, 15), derive the data input pins I0 to I7.",
    answer: "I0 = 1, I1 = 1, I2 = 0, I3 = a', I4 = a', I5 = 0, I6 = 0, I7 = a.",
    explanation: "I0(0,8): 1/1->1; I1(1,9): 1/1->1; I2(2,10): 0/0->0; I3(3,11): 1/0->a'; I4(4,12): 1/0->a'; I5(5,13): 0/0->0; I6(6,14): 0/0->0; I7(7,15): 0/1->a."
  },
  {
    id: 11,
    question: "Can an 8:1 MUX implementation of a 4-variable function require zero inverters?",
    answer: "Yes, if no column produces the pair 1/0 (Rule 4), no inverted literal a' is needed, requiring zero external NOT gates.",
    explanation: "For example, in F(a, b, c, d) = Σ(0, 2, 5, 7, 8, 10, 13, 15), all pairs are either 0/0 or 1/1, yielding purely constants {1, 0, 1, 0, 0, 1, 0, 1} with 0 inverters."
  },
  {
    id: 12,
    question: "Why should a student never decide a data-pin connection by looking at only one minterm?",
    answer: "Because each select channel bcd is active for BOTH a = 0 and a = 1; the pin must satisfy both minterms simultaneously.",
    explanation: "Deciding based on only one minterm ignores the state when variable a flips, leading to completely erroneous circuit synthesis."
  },
  {
    id: 13,
    question: "How can you verify that I3 = a' is correct for channel bcd = 011 in F(a, b, c, d) = Σ(0, 1, 3, 4, 8, 9, 15)?",
    answer: "When a = 0, input abcd = 0011 (m3 is in Σ, so F = 1); with I3 = a', a' = 1. When a = 1, input abcd = 1011 (m11 is not in Σ, so F = 0); with I3 = a', a' = 0. Both match perfectly.",
    explanation: "Testing both binary values of the residual variable confirms that the assigned input produces the exact canonical output."
  },
  {
    id: 14,
    question: "What external hardware components are required alongside the 8:1 MUX (IC 74151)?",
    answer: "At most one 7404 hex inverter IC if any pin requires a', plus connections to VCC (+5V) for Logic 1 and Ground (0V) for Logic 0.",
    explanation: "Since variable a is available in uncomplemented form, a single inverter produces a' which can be fanned out to all pins requiring a'."
  },
  {
    id: 15,
    question: "What step-by-step format should be followed in the ISC Board Examination for full marks?",
    answer: "1. State ordered sequence and select line assignments (S2=b, S1=c, S0=d); 2. State singled-out variable a; 3. Draw the 2-row table and circle included minterms; 4. List data input values I0-I7 with rule justifications; 5. Draw the labeled 8:1 MUX circuit.",
    explanation: "CISCE evaluators allot specific marks for the variable declaration, the implementation table, the deduced inputs, and the complete schematic."
  }
];

export default faqs;
