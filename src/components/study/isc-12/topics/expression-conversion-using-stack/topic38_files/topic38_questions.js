// topic38_questions.js
// 30 practice problems for postfix‑to‑prefix conversion, with solutions and hints.

const questions = [
  // ---- BASIC (1-10) ----
  {
    problem: "A B +",
    solution: "+ A B",
    hint: "Scan left to right: push A, push B; on '+' pop B (right), pop A (left), combine as + A B.",
    explanation: "Push A, push B; operator + pops right (B) and left (A), then pushes + A B.",
    commonMistake: "Popping in wrong order – remember first popped is right operand.",
    level: "basic"
  },
  {
    problem: "A B -",
    solution: "- A B",
    hint: "Combine with '-'.",
    explanation: "Push A, B; operator - pops B (right), A (left); combine as - A B.",
    commonMistake: "Writing - B A (wrong order).",
    level: "basic"
  },
  {
    problem: "A B *",
    solution: "* A B",
    hint: "Combine with '*'.",
    explanation: "Push A, B; operator * pops B (right), A (left); combine as * A B.",
    commonMistake: "None typical.",
    level: "basic"
  },
  {
    problem: "A B /",
    solution: "/ A B",
    hint: "Combine with '/'.",
    explanation: "Push A, B; operator / pops B (right), A (left); combine as / A B.",
    commonMistake: "None typical.",
    level: "basic"
  },
  {
    problem: "A B C * +",
    solution: "+ A * B C",
    hint: "Multiplication first, then addition.",
    explanation: "Push A, B, C; * combines B and C → * B C; + combines A and * B C → + A * B C.",
    commonMistake: "Writing + * A B C (wrong order – should be + A * B C).",
    level: "basic"
  },
  {
    problem: "A B + C *",
    solution: "* + A B C",
    hint: "Addition first, then multiplication.",
    explanation: "Push A, B; + combines A and B → + A B; push C; * combines + A B and C → * + A B C.",
    commonMistake: "Writing * A + B C (wrong order).",
    level: "basic"
  },
  {
    problem: "A B C + *",
    solution: "* A + B C",
    hint: "Addition first, then multiplication.",
    explanation: "Push A, B, C; + combines B and C → + B C; * combines A and + B C → * A + B C.",
    commonMistake: "Writing * + A B C (wrong order).",
    level: "basic"
  },
  {
    problem: "A B * C +",
    solution: "+ * A B C",
    hint: "Multiplication first, then addition.",
    explanation: "Push A, B; * combines A and B → * A B; push C; + combines * A B and C → + * A B C.",
    commonMistake: "Writing + A * B C (wrong order).",
    level: "basic"
  },
  {
    problem: "A B C / +",
    solution: "+ A / B C",
    hint: "Division first, then addition.",
    explanation: "Push A, B, C; / combines B and C → / B C; + combines A and / B C → + A / B C.",
    commonMistake: "Writing + / A B C (wrong order).",
    level: "basic"
  },
  {
    problem: "A B C * D / +",
    solution: "+ A / * B C D",
    hint: "Multiplication, then division, then addition.",
    explanation: "Push A, B, C, D; *: * B C; /: / * B C D; +: + A / * B C D.",
    commonMistake: "Order of division and addition.",
    level: "intermediate"
  },

  // ---- INTERMEDIATE (11-20) ----
  {
    problem: "A B + C D - *",
    solution: "* + A B - C D",
    hint: "Two groups then multiplication.",
    explanation: "A+B → + A B; C-D → - C D; * → * + A B - C D.",
    commonMistake: "Mixing up the order of the two groups.",
    level: "intermediate"
  },
  {
    problem: "A B C * + D -",
    solution: "- + A * B C D",
    hint: "Multiplication, addition, subtraction.",
    explanation: "B*C → * B C; + A * B C → + A * B C; - D → - + A * B C D.",
    commonMistake: "Order of operands for subtraction.",
    level: "advanced"
  },
  {
    problem: "A B * C D * +",
    solution: "+ * A B * C D",
    hint: "Two multiplications then addition.",
    explanation: "A*B → * A B; C*D → * C D; + → + * A B * C D.",
    commonMistake: "Order of the two products.",
    level: "intermediate"
  },
  {
    problem: "A B * C D / -",
    solution: "- * A B / C D",
    hint: "Multiplication and division, then subtraction.",
    explanation: "A*B → * A B; C/D → / C D; - → - * A B / C D.",
    commonMistake: "Writing - / * A B C D (wrong order).",
    level: "intermediate"
  },
  {
    problem: "A B C * D / + E -",
    solution: "- + A / * B C D E",
    hint: "Complex nesting.",
    explanation: "B*C → * B C; / * B C D → / * B C D; + A / * B C D → + A / * B C D; - E → - + A / * B C D E.",
    commonMistake: "Complex nesting order.",
    level: "expert"
  },
  {
    problem: "A B ^ C ^",
    solution: "^ ^ A B C",
    hint: "Exponentiation in postfix is left‑associative.",
    explanation: "A^B → ^ A B; ^ C → ^ ^ A B C.",
    commonMistake: "Assuming ^ is right‑associative.",
    level: "advanced"
  },
  {
    problem: "A B C ^ ^",
    solution: "^ A ^ B C",
    hint: "Nested exponentiation.",
    explanation: "B^C → ^ B C; A ^ (^ B C) → ^ A ^ B C.",
    commonMistake: "Writing ^ ^ A B C (wrong associativity).",
    level: "advanced"
  },
  {
    problem: "A B * C D + +",
    solution: "+ * A B + C D",
    hint: "Multiplication and addition.",
    explanation: "A*B → * A B; C+D → + C D; + → + * A B + C D.",
    commonMistake: "Order of operands for addition.",
    level: "advanced"
  },
  {
    problem: "A B * C D / -",
    solution: "- * A B / C D",
    hint: "Multiplication and division, then subtraction.",
    explanation: "A*B → * A B; C/D → / C D; - → - * A B / C D.",
    commonMistake: "Misplacing parentheses.",
    level: "intermediate"
  },
  {
    problem: "A B * C / D E * +",
    solution: "+ / * A B C * D E",
    hint: "Complex with multiplication, division, addition.",
    explanation: "A*B → * A B; / C → / * A B C; D*E → * D E; + → + / * A B C * D E.",
    commonMistake: "Complex nesting.",
    level: "expert"
  },

  // ---- ADVANCED (21-30) ----
  {
    problem: "A B C + * D E / -",
    solution: "- * A + B C / D E",
    hint: "Addition, multiplication, division, subtraction.",
    explanation: "B+C → + B C; A * (+ B C) → * A + B C; D/E → / D E; - → - * A + B C / D E.",
    commonMistake: "Order of operands for subtraction.",
    level: "expert"
  },
  {
    problem: "A B * C D - +",
    solution: "+ * A B - C D",
    hint: "Multiplication, subtraction, addition.",
    explanation: "A*B → * A B; C-D → - C D; + → + * A B - C D.",
    commonMistake: "Order of operations.",
    level: "advanced"
  },
  {
    problem: "A B + C D + *",
    solution: "* + A B + C D",
    hint: "Two additions, then multiplication.",
    explanation: "A+B → + A B; C+D → + C D; * → * + A B + C D.",
    commonMistake: "Forgetting one of the parentheses.",
    level: "intermediate"
  },
  {
    problem: "A B * C D * + E +",
    solution: "+ + * A B * C D E",
    hint: "Multiplications, additions.",
    explanation: "A*B → * A B; C*D → * C D; + → + * A B * C D; + E → + + * A B * C D E.",
    commonMistake: "Order of operands.",
    level: "expert"
  },
  {
    problem: "A B * C / D + E -",
    solution: "- + / * A B C D E",
    hint: "Complex nesting.",
    explanation: "A*B → * A B; / C → / * A B C; + D → + / * A B C D; - E → - + / * A B C D E.",
    commonMistake: "Nesting order.",
    level: "expert"
  },
  {
    problem: "A B * C / D E * +",
    solution: "+ / * A B C * D E",
    hint: "Multiplication, division, multiplication, addition.",
    explanation: "A*B → * A B; / C → / * A B C; D*E → * D E; + → + / * A B C * D E.",
    commonMistake: "Order of operations.",
    level: "expert"
  },
  {
    problem: "A B C + * D E + -",
    solution: "- * A + B C + D E",
    hint: "Addition, multiplication, addition, subtraction.",
    explanation: "B+C → + B C; A * (+ B C) → * A + B C; D+E → + D E; - → - * A + B C + D E.",
    commonMistake: "Order of subtraction.",
    level: "expert"
  },
  {
    problem: "A B C - * D E / +",
    solution: "+ * A - B C / D E",
    hint: "Subtraction, multiplication, division, addition.",
    explanation: "B-C → - B C; A * (- B C) → * A - B C; D/E → / D E; + → + * A - B C / D E.",
    commonMistake: "Complex nesting.",
    level: "expert"
  },
  {
    problem: "A B + C D - *",
    solution: "* + A B - C D",
    hint: "Two groups then multiplication.",
    explanation: "A+B → + A B; C-D → - C D; * → * + A B - C D.",
    commonMistake: "Forgetting outer combination order.",
    level: "intermediate"
  },
  {
    problem: "A B * C D * + E -",
    solution: "- + * A B * C D E",
    hint: "Two multiplications, addition, subtraction.",
    explanation: "A*B → * A B; C*D → * C D; + → + * A B * C D; - E → - + * A B * C D E.",
    commonMistake: "Order of subtraction.",
    level: "expert"
  },
  {
    problem: "A B * C D / + E +",
    solution: "+ + * A B / C D E",
    hint: "Multiplication, division, addition, addition.",
    explanation: "A*B → * A B; C/D → / C D; + → + * A B / C D; + E → + + * A B / C D E.",
    commonMistake: "Order of operands.",
    level: "expert"
  },
  {
    problem: "A B * C D / -",
    solution: "- * A B / C D",
    hint: "Multiplication and division, then subtraction.",
    explanation: "A*B → * A B; C/D → / C D; - → - * A B / C D.",
    commonMistake: "Writing - / * A B C D.",
    level: "intermediate"
  },
  {
    problem: "A B * C D + +",
    solution: "+ * A B + C D",
    hint: "Multiplication, addition, addition.",
    explanation: "A*B → * A B; C+D → + C D; + → + * A B + C D.",
    commonMistake: "Order of addition.",
    level: "advanced"
  },
  {
    problem: "A B * C / D -",
    solution: "- / * A B C D",
    hint: "Multiplication, division, subtraction.",
    explanation: "A*B → * A B; / C → / * A B C; - D → - / * A B C D.",
    commonMistake: "Order of division and subtraction.",
    level: "advanced"
  },
  {
    problem: "A B - C D + *",
    solution: "* - A B + C D",
    hint: "Subtraction, addition, multiplication.",
    explanation: "A-B → - A B; C+D → + C D; * → * - A B + C D.",
    commonMistake: "Order of operands.",
    level: "advanced"
  },
  {
    problem: "A B * C D - +",
    solution: "+ * A B - C D",
    hint: "Multiplication, subtraction, addition.",
    explanation: "A*B → * A B; C-D → - C D; + → + * A B - C D.",
    commonMistake: "Order of operations.",
    level: "advanced"
  }
];

export default questions;