// Topic 36 FAQs - 15 Comprehensive Questions and Answers
// Author: Sukanta Hui | CISCE Computer Science Faculty

export const faqs = [
  {
    id: 1,
    question: "What is the fundamental formula relating the number of variables n to the multiplexer size needed to implement any Boolean function?",
    answer: "Any Boolean function of n variables can be implemented with a 2^(n-1)-to-1 multiplexer using (n - 1) selection lines.",
    explanation: "Because a multiplexer has 2^(n-1) data inputs, we can connect (n-1) variables to the selection lines and synthesize each data input using the single remaining variable in one of four states: 0, 1, the variable, or its complement."
  },
  {
    id: 2,
    question: "In the CISCE textbook's 'Singled-Out Variable' method, which variable from the ordered set is singled out?",
    answer: "The leftmost (highest-order / MSB) variable is singled out as the data input, while the remaining (n-1) variables connect to selection lines.",
    explanation: "For example, in ordered variables (x, y, z), x is singled out, and y, z connect to select lines S1, S0. If ordered (a, b, c, d), a is singled out, and b, c, d connect to S2, S1, S0."
  },
  {
    id: 3,
    question: "What are the 4 fundamental rules for determining MUX inputs from the columns of an implementation table?",
    answer: "Rule 1: Neither circled -> 0. Rule 2: Both circled -> 1. Rule 3: Bottom circled -> variable uncomplemented. Rule 4: Top circled -> variable complemented.",
    explanation: "These four rules evaluate each column: Rule 1 means the function never outputs 1 for that select combination; Rule 2 means it always outputs 1; Rule 3 means it matches the uncomplemented variable; Rule 4 matches the complemented variable."
  },
  {
    id: 4,
    question: "In an implementation table for F(x, y, z) on a 4:1 MUX with x singled out, which minterms occupy each row?",
    answer: "Row 1 (x') contains minterms 0, 1, 2, 3 under inputs I0, I1, I2, I3; Row 2 (x) contains minterms 4, 5, 6, 7 under inputs I0, I1, I2, I3.",
    explanation: "Because x is 0 for minterms 0 through 3 (0 to 2^(n-1)-1) and x is 1 for minterms 4 through 7 (2^(n-1) to 2^n-1), the table cleanly splits the minterms into two contiguous numerical blocks."
  },
  {
    id: 5,
    question: "How are the remaining variables y and z connected to the selection lines of the 4:1 MUX?",
    answer: "Higher-order variable y connects to higher-order select line S1, and lowest-order variable z connects to lowest-order select line S0.",
    explanation: "This preserves the binary positional weighting: S1 has weight 2 (from y), and S0 has weight 1 (from z), decoding combinations 00, 01, 10, 11."
  },
  {
    id: 6,
    question: "For the textbook function F(x, y, z) = Σ(1, 3, 5, 6), what are the derived values applied to inputs I0, I1, I2, I3?",
    answer: "I0 = 0 (Rule 1), I1 = 1 (Rule 2), I2 = x (Rule 3), I3 = x' (Rule 4).",
    explanation: "Column I0 (minterms 0, 4): neither circled -> 0; Column I1 (1, 5): both circled -> 1; Column I2 (2, 6): 6 circled (bottom) -> x; Column I3 (3, 7): 3 circled (top) -> x'."
  },
  {
    id: 7,
    question: "For the 4-variable textbook Example 2.13 F(a, b, c, d) = Σ(0, 1, 3, 4, 8, 9, 15), what size MUX is used and what are the inputs applied?",
    answer: "An 8:1 MUX with select lines S2=b, S1=c, S0=d; inputs are I0=1, I1=1, I2=0, I3=a', I4=a', I5=0, I6=0, I7=a.",
    explanation: "Minterms 0, 1, 3, 4, 8, 9, 15 are circled: I0(0,8)->1, I1(1,9)->1, I2(2,10)->0, I3(3,11)->a', I4(4,12)->a', I5(5,13)->0, I6(6,14)->0, I7(7,15)->a."
  },
  {
    id: 8,
    question: "What is a 'Scaled-Down Multiplexer' implementation as described in textbook Section 2.3.4B?",
    answer: "Implementing a function using an even smaller MUX (e.g. 2:1 MUX for 3 variables) by factoring out the select variable using Shannon expansion.",
    explanation: "Instead of using a standard 4:1 MUX, a 2:1 MUX uses only 1 select line. The data inputs receive sub-functions of the remaining 2 variables, which are realized with external logic gates."
  },
  {
    id: 9,
    question: "In the textbook example F(a, b, c) = ab + b'c' + c'a', how is it factored to implement on a 2:1 MUX with S0 = a?",
    answer: "Factoring out a and a' gives F = a(b + c') + a'c', which applies I0 = c' and I1 = b + c' (using an external OR gate).",
    explanation: "With select line S0=a, when a=0, output F=I0=c'; when a=1, output F=I1=b+c'. The term (b + c') is synthesized using a 2-input OR gate receiving b and c'."
  },
  {
    id: 10,
    question: "How can a 1-bit Full Adder (Sum and Carry) be implemented using two 4:1 multiplexers?",
    answer: "Connect B and Cin to select lines S1 and S0 on both MUXes; for Sum, inputs are I0=A, I1=A', I2=A', I3=A; for Carry, inputs are I0=0, I1=A, I2=A, I3=1.",
    explanation: "Both MUXes share the same selection bus (B, Cin). The two outputs simultaneously yield Sum = A ⊕ B ⊕ Cin and Carry = AB + BCin + ACin."
  },
  {
    id: 11,
    question: "What is the difference between singling out the leftmost variable (A) versus the rightmost variable (C)?",
    answer: "Leftmost variable (A) splits minterms into halves (0-3 vs 4-7); rightmost variable (C) pairs consecutive numbers (0,1; 2,3; 4,5; 6,7).",
    explanation: "Both produce 100% equivalent logical functionality. Leftmost variable uses B, C as select lines; rightmost variable uses A, B as select lines."
  },
  {
    id: 12,
    question: "How are Don't-Care conditions handled in a MUX implementation table?",
    answer: "A don't-care minterm is circled only if doing so turns an input from a variable (x or x') into a constant 1, eliminating an external inverter.",
    explanation: "If circling a don't care allows a column to use Rule 2 (both circled = 1), it saves an inverter or signal connection without affecting valid outputs."
  },
  {
    id: 13,
    question: "How is a multiplexer utilized for Bus / Register Word Routing in computer architecture (Section 2.3.4C)?",
    answer: "As an electronic selector that routes data from multiple register sources (e.g. Register A, B, C or all 0s) onto a single destination register bus.",
    explanation: "Selection lines S1 and S0 act as address signals from the CPU control unit, electronically connecting the chosen register to the bus."
  },
  {
    id: 14,
    question: "How does a multiplexer perform Parallel-to-Serial data conversion (Section 2.3.4C)?",
    answer: "By applying parallel data bits to inputs I0-In while a binary counter clocks select lines, outputting bits in sequential time slots.",
    explanation: "As the counter cycles (000, 001, 010...), the MUX transmits bit 0, then bit 1, then bit 2 in sequence onto a single serial transmission wire."
  },
  {
    id: 15,
    question: "What are the common pitfalls students make when solving MUX function implementation in ISC exams?",
    answer: "Swapping select lines S1 and S0, forgetting to show the implementation table with circled minterms, and misapplying Rules 3 and 4.",
    explanation: "Examiners award specific marks for: 1. Selection line identification, 2. Drawn implementation table with circles, 3. Rule derivation, and 4. Final circuit schematic."
  }
];

export default faqs;

