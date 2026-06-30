// topic34_questions.js
// 30 practice problems for prefix‑to‑postfix conversion, with solutions and hints.

const questions = [
  // ---- BASIC (1-10) ----
  {
    problem: "+ A B",
    solution: "A B +",
    hint: "Scan from right to left: B, A, then '+' combines them.",
    explanation: "Push B, push A; pop A (left), pop B (right); combine as A B +.",
    commonMistake: "Popping in wrong order – remember first popped is left operand.",
    level: "basic"
  },
  {
    problem: "- A B",
    solution: "A B -",
    hint: "Combine with '-'.",
    explanation: "Push B, push A; pop A (left), pop B (right); combine as A B -.",
    commonMistake: "Writing B A - (wrong order).",
    level: "basic"
  },
  {
    problem: "* A B",
    solution: "A B *",
    hint: "Combine with '*'.",
    explanation: "Push B, push A; combine as A B *.",
    commonMistake: "None typical.",
    level: "basic"
  },
  {
    problem: "/ A B",
    solution: "A B /",
    hint: "Combine with '/'.",
    explanation: "Push B, push A; combine as A B /.",
    commonMistake: "None typical.",
    level: "basic"
  },
  {
    problem: "+ A * B C",
    solution: "A B C * +",
    hint: "Multiplication first, then addition.",
    explanation: "Scan right: C, B, *, A, +. * combines B and C → B C *; + combines A and B C * → A B C * +.",
    commonMistake: "Writing A B * C + (wrong order).",
    level: "basic"
  },
  {
    problem: "* + A B C",
    solution: "A B + C *",
    hint: "Addition first, then multiplication.",
    explanation: "Scan: C, B, A, +, *. + combines A and B → A B +; * combines A B + and C → A B + C *.",
    commonMistake: "Writing A B C + * (wrong order).",
    level: "basic"
  },
  {
    problem: "* A + B C",
    solution: "A B C + *",
    hint: "Addition first, then multiplication.",
    explanation: "Scan: C, B, +, A, *. + combines B and C → B C +; * combines A and B C + → A B C + *.",
    commonMistake: "Writing A B + C * (wrong order).",
    level: "basic"
  },
  {
    problem: "+ * A B C",
    solution: "A B * C +",
    hint: "Multiplication first, then addition.",
    explanation: "Scan: C, B, A, *, +. * combines A and B → A B *; + combines A B * and C → A B * C +.",
    commonMistake: "Writing A B C * + (wrong order).",
    level: "basic"
  },
  {
    problem: "+ A / B C",
    solution: "A B C / +",
    hint: "Division first, then addition.",
    explanation: "Scan: C, B, /, A, +. / combines B and C → B C /; + combines A and B C / → A B C / +.",
    commonMistake: "Writing A B / C + (wrong order).",
    level: "basic"
  },
  {
    problem: "+ A / * B C D",
    solution: "A B C * D / +",
    hint: "Multiplication, then division, then addition.",
    explanation: "Scan: D, C, B, *, /, A, +. *: B C *; /: B C * D /; +: A B C * D / +.",
    commonMistake: "Order of division and addition.",
    level: "intermediate"
  },

  // ---- INTERMEDIATE (11-20) ----
  {
    problem: "* + A B - C D",
    solution: "A B + C D - *",
    hint: "Two groups then multiplication.",
    explanation: "Scan: D, C, -, B, A, +, *. -: C D -; +: A B +; *: A B + C D - *.",
    commonMistake: "Mixing up the order of the two groups.",
    level: "intermediate"
  },
  {
    problem: "- + A * B C D",
    solution: "A B * C + D -",
    hint: "Multiplication, addition, subtraction.",
    explanation: "Scan: D, C, B, A, *, +, -. *: A B *; +: A B * C +; -: A B * C + D -.",
    commonMistake: "Order of operands for subtraction.",
    level: "advanced"
  },
  {
    problem: "+ * A B * C D",
    solution: "A B * C D * +",
    hint: "Two multiplications then addition.",
    explanation: "Scan: D, C, *, B, A, *, +. *: A B *; *: C D *; +: A B * C D * +.",
    commonMistake: "Order of the two products.",
    level: "intermediate"
  },
  {
    problem: "- * A B / C D",
    solution: "A B * C D / -",
    hint: "Multiplication and division, then subtraction.",
    explanation: "Scan: D, C, /, B, A, *, -. *: A B *; /: C D /; -: A B * C D / -.",
    commonMistake: "Writing A B * C D - / (wrong order).",
    level: "intermediate"
  },
  {
    problem: "- + / * A B C D E",
    solution: "A B * C / D + E -",
    hint: "Complex nesting.",
    explanation: "Scan: E, D, C, B, A, *, /, +, -. *: A B *; /: A B * C /; +: A B * C / D +; -: A B * C / D + E -.",
    commonMistake: "Complex nesting order.",
    level: "expert"
  },
  {
    problem: "^ ^ A B C",
    solution: "A B ^ C ^",
    hint: "Exponentiation in prefix is left‑associative.",
    explanation: "Scan: C, B, A, ^, ^. First ^: A B ^; second ^: A B ^ C ^.",
    commonMistake: "Assuming ^ is right‑associative.",
    level: "advanced"
  },
  {
    problem: "^ A ^ B C",
    solution: "A B C ^ ^",
    hint: "Nested exponentiation.",
    explanation: "Scan: C, B, ^, A, ^. First ^: B C ^; second ^: A B C ^ ^.",
    commonMistake: "Writing A B ^ C ^ (wrong associativity).",
    level: "advanced"
  },
  {
    problem: "+ * A B + C D",
    solution: "A B * C D + +",
    hint: "Multiplication and addition.",
    explanation: "Scan: D, C, +, B, A, *, +. +: C D +; *: A B *; +: A B * C D + +.",
    commonMistake: "Order of operands for addition.",
    level: "advanced"
  },
  {
    problem: "- * A B / C D",
    solution: "A B * C D / -",
    hint: "Multiplication and division, then subtraction.",
    explanation: "Scan: D, C, /, B, A, *, -. *: A B *; /: C D /; -: A B * C D / -.",
    commonMistake: "Misplacing parentheses.",
    level: "intermediate"
  },
  {
    problem: "+ / * A B C * D E",
    solution: "A B * C / D E * +",
    hint: "Complex with multiplication, division, addition.",
    explanation: "Scan: E, D, *, C, B, A, *, /, +. *: A B *; /: A B * C /; *: D E *; +: A B * C / D E * +.",
    commonMistake: "Complex nesting.",
    level: "expert"
  },

  // ---- ADVANCED (21-30) ----
  {
    problem: "- * A + B C / D E",
    solution: "A B C + * D E / -",
    hint: "Addition, multiplication, division, subtraction.",
    explanation: "Scan: E, D, /, C, B, +, A, *, -. +: B C +; *: A B C + *; /: D E /; -: A B C + * D E / -.",
    commonMistake: "Order of operands for subtraction.",
    level: "expert"
  },
  {
    problem: "+ * A B - C D",
    solution: "A B * C D - +",
    hint: "Multiplication, subtraction, addition.",
    explanation: "Scan: D, C, -, B, A, *, +. -: C D -; *: A B *; +: A B * C D - +.",
    commonMistake: "Order of operations.",
    level: "advanced"
  },
  {
    problem: "* + A B + C D",
    solution: "A B + C D + *",
    hint: "Two additions, then multiplication.",
    explanation: "Scan: D, C, +, B, A, +, *. +: A B +; +: C D +; *: A B + C D + *.",
    commonMistake: "Forgetting one of the parentheses.",
    level: "intermediate"
  },
  {
    problem: "+ + * A B * C D E",
    solution: "A B * C D * + E +",
    hint: "Multiplications, additions.",
    explanation: "Scan: E, D, C, *, B, A, *, +, +. *: A B *; *: C D *; +: A B * C D * +; +: A B * C D * + E +.",
    commonMistake: "Order of operands.",
    level: "expert"
  },
  {
    problem: "- + / * A B C D E",
    solution: "A B * C / D + E -",
    hint: "Complex nesting.",
    explanation: "Scan: E, D, C, B, A, *, /, +, -. *: A B *; /: A B * C /; +: A B * C / D +; -: A B * C / D + E -.",
    commonMistake: "Nesting order.",
    level: "expert"
  },
  {
    problem: "+ / * A B C * D E",
    solution: "A B * C / D E * +",
    hint: "Multiplication, division, multiplication, addition.",
    explanation: "Scan: E, D, *, C, B, A, *, /, +. *: A B *; /: A B * C /; *: D E *; +: A B * C / D E * +.",
    commonMistake: "Order of operations.",
    level: "expert"
  },
  {
    problem: "- * A + B C + D E",
    solution: "A B C + * D E + -",
    hint: "Addition, multiplication, addition, subtraction.",
    explanation: "Scan: E, D, +, C, B, +, A, *, -. +: B C +; *: A B C + *; +: D E +; -: A B C + * D E + -.",
    commonMistake: "Order of subtraction.",
    level: "expert"
  },
  {
    problem: "+ * A - B C / D E",
    solution: "A B C - * D E / +",
    hint: "Subtraction, multiplication, division, addition.",
    explanation: "Scan: E, D, /, C, B, -, A, *, +. -: B C -; *: A B C - *; /: D E /; +: A B C - * D E / +.",
    commonMistake: "Complex nesting.",
    level: "expert"
  },
  {
    problem: "* + A B - C D",
    solution: "A B + C D - *",
    hint: "Two groups then multiplication.",
    explanation: "Scan: D, C, -, B, A, +, *. +: A B +; -: C D -; *: A B + C D - *.",
    commonMistake: "Forgetting outer combination order.",
    level: "intermediate"
  },
  {
    problem: "- + * A B * C D E",
    solution: "A B * C D * + E -",
    hint: "Two multiplications, addition, subtraction.",
    explanation: "Scan: E, D, C, *, B, A, *, +, -. *: A B *; *: C D *; +: A B * C D * +; -: A B * C D * + E -.",
    commonMistake: "Order of subtraction.",
    level: "expert"
  },
  {
    problem: "+ * A B / C D E",
    solution: "A B * C D / + E +",
    hint: "Multiplication, division, addition, addition.",
    explanation: "Scan: E, D, C, /, B, A, *, +, +. *: A B *; /: C D /; +: A B * C D / +; +: A B * C D / + E +.",
    commonMistake: "Order of operands.",
    level: "expert"
  },
  {
    problem: "- * A B / C D",
    solution: "A B * C D / -",
    hint: "Multiplication and division, then subtraction.",
    explanation: "Scan: D, C, /, B, A, *, -. *: A B *; /: C D /; -: A B * C D / -.",
    commonMistake: "Writing A B * C D - /.",
    level: "intermediate"
  },
  {
    problem: "+ * A B + C D",
    solution: "A B * C D + +",
    hint: "Multiplication, addition, addition.",
    explanation: "Scan: D, C, +, B, A, *, +. +: C D +; *: A B *; +: A B * C D + +.",
    commonMistake: "Order of addition.",
    level: "advanced"
  },
  {
    problem: "- / * A B C D",
    solution: "A B * C / D -",
    hint: "Multiplication, division, subtraction.",
    explanation: "Scan: D, C, B, A, *, /, -. *: A B *; /: A B * C /; -: A B * C / D -.",
    commonMistake: "Order of division and subtraction.",
    level: "advanced"
  },
  {
    problem: "* - A B + C D",
    solution: "A B - C D + *",
    hint: "Subtraction, addition, multiplication.",
    explanation: "Scan: D, C, +, B, A, -, *. -: A B -; +: C D +; *: A B - C D + *.",
    commonMistake: "Order of operands.",
    level: "advanced"
  },
  {
    problem: "+ * A B - C D",
    solution: "A B * C D - +",
    hint: "Multiplication, subtraction, addition.",
    explanation: "Scan: D, C, -, B, A, *, +. -: C D -; *: A B *; +: A B * C D - +.",
    commonMistake: "Order of operations.",
    level: "advanced"
  }
];

export default questions;