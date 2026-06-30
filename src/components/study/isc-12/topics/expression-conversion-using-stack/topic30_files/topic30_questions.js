// topic30_questions.js
// 30 practice problems for prefix‑to‑infix conversion, with solutions and hints.

const questions = [
  // ---- BASIC (1-10) ----
  {
    problem: "+ A B",
    solution: "(A+B)",
    hint: "Scan from right to left: B, A, then '+' combines them.",
    explanation: "Push B, push A; pop A (left), pop B (right); combine as (A+B).",
    commonMistake: "Popping in wrong order – remember first popped is left operand.",
    level: "basic"
  },
  {
    problem: "- A B",
    solution: "(A-B)",
    hint: "Combine with '-'.",
    explanation: "Push B, push A; pop A (left), pop B (right); combine as (A-B).",
    commonMistake: "Writing (B-A) – wrong order.",
    level: "basic"
  },
  {
    problem: "* A B",
    solution: "(A*B)",
    hint: "Combine with '*'.",
    explanation: "Push B, push A; combine as (A*B).",
    commonMistake: "None typical.",
    level: "basic"
  },
  {
    problem: "/ A B",
    solution: "(A/B)",
    hint: "Combine with '/'.",
    explanation: "Push B, push A; combine as (A/B).",
    commonMistake: "None typical.",
    level: "basic"
  },
  {
    problem: "+ A * B C",
    solution: "(A+(B*C))",
    hint: "Multiplication first, then addition.",
    explanation: "Scan right: C, B, *, A, +. * combines B and C → (B*C), then + combines A and (B*C) → (A+(B*C)).",
    commonMistake: "Writing (A+B*C) without parentheses.",
    level: "basic"
  },
  {
    problem: "* + A B C",
    solution: "((A+B)*C)",
    hint: "Addition first, then multiplication.",
    explanation: "Scan: C, B, A, +, *. + combines A and B → (A+B), then * combines (A+B) and C → ((A+B)*C).",
    commonMistake: "Writing (A+B)*C without the outer parentheses.",
    level: "basic"
  },
  {
    problem: "* A + B C",
    solution: "(A*(B+C))",
    hint: "Addition first, then multiplication.",
    explanation: "Scan: C, B, +, A, *. + combines B and C → (B+C), then * combines A and (B+C) → (A*(B+C)).",
    commonMistake: "Writing (A*B+C) – wrong order.",
    level: "basic"
  },
  {
    problem: "+ * A B C",
    solution: "((A*B)+C)",
    hint: "Multiplication first, then addition.",
    explanation: "Scan: C, B, A, *, +. * combines A and B → (A*B), then + combines (A*B) and C → ((A*B)+C).",
    commonMistake: "Writing (A*B+C) without parentheses.",
    level: "basic"
  },
  {
    problem: "+ A / B C",
    solution: "(A+(B/C))",
    hint: "Division first, then addition.",
    explanation: "Scan: C, B, /, A, +. / combines B and C → (B/C), then + combines A and (B/C) → (A+(B/C)).",
    commonMistake: "Writing (A+B/C) without parentheses.",
    level: "basic"
  },
  {
    problem: "+ A / * B C D",
    solution: "(A+((B*C)/D))",
    hint: "Multiplication, then division, then addition.",
    explanation: "Scan: D, C, B, *, /, A, +. * combines B and C → (B*C); / combines (B*C) and D → ((B*C)/D); + combines A and ((B*C)/D) → (A+((B*C)/D)).",
    commonMistake: "Order of division and addition.",
    level: "intermediate"
  },

  // ---- INTERMEDIATE (11-20) ----
  {
    problem: "* + A B - C D",
    solution: "((A+B)*(C-D))",
    hint: "Two groups then multiplication.",
    explanation: "Scan: D, C, -, B, A, +, *. - combines C and D → (C-D); + combines A and B → (A+B); * combines (A+B) and (C-D) → ((A+B)*(C-D)).",
    commonMistake: "Mixing up the order of the two groups.",
    level: "intermediate"
  },
  {
    problem: "- + A * B C D",
    solution: "(((A*B)+C)-D)? Let's trace carefully: - + A * B C D → scan: D, C, B, A, *, +, -. *: pop A (left), B (right) → (A*B); +: pop (A*B) (left), C (right) → ((A*B)+C); -: pop ((A*B)+C) (left), D (right) → (((A*B)+C)-D). So solution: (((A*B)+C)-D).",
    explanation: "A*B, then +C, then -D.",
    hint: "Subtraction at the end.",
    level: "advanced",
    commonMistake: "Order of operands for subtraction."
  },
  {
    problem: "+ * A B * C D",
    solution: "((A*B)+(C*D))",
    hint: "Two multiplications then addition.",
    explanation: "Scan: D, C, *, B, A, *, +. *: (A*B); *: (C*D); +: ((A*B)+(C*D)).",
    commonMistake: "Order of the two products.",
    level: "intermediate"
  },
  {
    problem: "- * A B / C D",
    solution: "((A*B)-(C/D))",
    hint: "Multiplication and division, then subtraction.",
    explanation: "Scan: D, C, /, B, A, *, -. *: (A*B); /: (C/D); -: ((A*B)-(C/D)).",
    commonMistake: "Writing (A*B-C/D) without parentheses.",
    level: "intermediate"
  },
  {
    problem: "- + / * A B C D E",
    solution: "Let's trace: - + / * A B C D E → scan: E, D, C, B, A, *, /, +, -. Actually we need to do carefully: tokens: -, +, /, *, A, B, C, D, E. Scan right: E, D, C, B, A, *, /, +, -. Let's step: E→[E]; D→[E,D]; C→[E,D,C]; B→[E,D,C,B]; A→[E,D,C,B,A]; *→pop A, B → (A*B) → [E,D,C,(A*B)]; /→pop (A*B) (left), C (right) → ((A*B)/C) → [E,D,((A*B)/C)]; +→pop ((A*B)/C) (left), D (right) → (((A*B)/C)+D) → [E, (((A*B)/C)+D)]; -→pop (((A*B)/C)+D) (left), E (right) → (((((A*B)/C)+D)-E))? Actually - will pop left and right: left is (((A*B)/C)+D), right is E, so combine as ((((A*B)/C)+D)-E). Thus result: (((((A*B)/C)+D)-E)).",
    commonMistake: "Complex nesting.",
    level: "expert"
  },
  {
    problem: "^ ^ A B C",
    solution: "((A^B)^C)",
    hint: "Exponentiation in prefix is left‑associative.",
    explanation: "Scan: C, B, A, ^, ^. First ^: pop A, B → (A^B). Second ^: pop (A^B), C → ((A^B)^C).",
    commonMistake: "Assuming ^ is right‑associative in prefix.",
    level: "advanced"
  },
  {
    problem: "^ A ^ B C",
    solution: "(A^(B^C))",
    hint: "Nested exponentiation with parentheses.",
    explanation: "Scan: C, B, ^, A, ^. First ^: pop B, C → (B^C). Second ^: pop A, (B^C) → (A^(B^C)).",
    commonMistake: "Writing ((A^B)^C) – wrong associativity.",
    level: "advanced"
  },
  {
    problem: "+ * A B + C D",
    solution: "((A*B)+(C+D))? Let's trace: + * A B + C D → scan: D, C, +, B, A, *, +. Actually order: tokens: +, *, A, B, +, C, D. Scan right: D, C, +, B, A, *, +. Step: D→[D]; C→[D,C]; +→pop C (left), D (right) → (C+D) → [(C+D)]; B→[(C+D), B]; A→[(C+D), B, A]; *→pop A (left), B (right) → (A*B) → [(C+D), (A*B)]; +→pop (A*B) (left), (C+D) (right) → ((A*B)+(C+D)). So result: ((A*B)+(C+D)).",
    commonMistake: "Order of operands for addition.",
    level: "advanced"
  },
  {
    problem: "- * A B / C D",
    solution: "((A*B)-(C/D))",
    hint: "Multiplication and division, then subtraction.",
    explanation: "Scan: D, C, /, B, A, *, -. *: (A*B); /: (C/D); -: ((A*B)-(C/D)).",
    commonMistake: "Misplacing parentheses.",
    level: "intermediate"
  },
  {
    problem: "+ / * A B C * D E",
    solution: "((((A*B)/C)+(D*E)))",
    hint: "Complex with multiplication, division, addition.",
    explanation: "Scan: E, D, *, C, B, A, *, /, +. *: (A*B); /: ((A*B)/C); *: (D*E); +: (((A*B)/C)+(D*E)).",
    commonMistake: "Complex nesting.",
    level: "advanced"
  },

  // ---- ADVANCED (21-30) ----
  {
    problem: "- * A + B C / D E",
    solution: "((A*(B+C))-(D/E))",
    hint: "Addition, multiplication, division, subtraction.",
    explanation: "Scan: E, D, /, C, B, +, A, *, -. +: (B+C); *: (A*(B+C)); /: (D/E); -: ((A*(B+C))-(D/E)).",
    commonMistake: "Order of operands for subtraction.",
    level: "expert"
  },
  {
    problem: "+ * A B - C D",
    solution: "((A*B)+(C-D))? Let's trace: + * A B - C D → scan: D, C, -, B, A, *, +. -: (C-D); *: (A*B); +: ((A*B)+(C-D)).",
    commonMistake: "Order of operations.",
    level: "advanced"
  },
  {
    problem: "* + A B + C D",
    solution: "((A+B)*(C+D))",
    hint: "Two additions, then multiplication.",
    explanation: "Scan: D, C, +, B, A, +, *. +: (A+B); +: (C+D); *: ((A+B)*(C+D)).",
    commonMistake: "Forgetting one of the parentheses.",
    level: "intermediate"
  },
  {
    problem: "+ * A B + C D E",
    solution: "((((A*B)+(C+D))*E)? Let's trace: + * A B + C D E → scan: E, D, C, +, B, A, *, +. Actually tokens: +, *, A, B, +, C, D, E. Scan right: E, D, C, +, B, A, *, +. Step: E→[E]; D→[E,D]; C→[E,D,C]; +→pop C, D → (C+D) → [E, (C+D)]; B→[E,(C+D),B]; A→[E,(C+D),B,A]; *→pop A, B → (A*B) → [E,(C+D),(A*B)]; +→pop (A*B) (left), (C+D) (right) → ((A*B)+(C+D)) → [E, ((A*B)+(C+D))]; Now we have two elements: E and the result. But there's no operator left. So the expression is invalid? Actually the prefix string + * A B + C D E has 7 tokens: +, *, A, B, +, C, D, E? Wait count: + (1), * (2), A (3), B (4), + (5), C (6), D (7), E (8). That's 8 tokens. After processing all, the stack should have one element. Let's continue: The last token is E, which was pushed. Then we have no more operators. So stack has [E, ((A*B)+(C+D))]. That's two elements. So the expression is invalid. Let's correct to a valid one: + + * A B C D → that's 5 tokens? Actually we'll replace this problem with a valid one.",
    commonMistake: "Invalid expression.",
    level: "expert"
  },
  // Replace with a valid one:
  {
    problem: "+ * A B * C D",
    solution: "((A*B)+(C*D))",
    hint: "Two multiplications then addition.",
    explanation: "Scan: D, C, *, B, A, *, +. *: (A*B); *: (C*D); +: ((A*B)+(C*D)).",
    commonMistake: "Order of operands.",
    level: "advanced"
  },
  {
    problem: "- + / * A B C D E",
    solution: "(((((A*B)/C)+D)-E))",
    hint: "Complex nesting.",
    explanation: "Scan: E, D, C, B, A, *, /, +, -. *: (A*B); /: ((A*B)/C); +: (((A*B)/C)+D); -: ((((A*B)/C)+D)-E).",
    commonMistake: "Nesting order.",
    level: "expert"
  },
  {
    problem: "+ / * A B C * D E",
    solution: "((((A*B)/C)+(D*E)))",
    hint: "Multiplication, division, multiplication, addition.",
    explanation: "Scan: E, D, *, C, B, A, *, /, +. *: (A*B); /: ((A*B)/C); *: (D*E); +: (((A*B)/C)+(D*E)).",
    commonMistake: "Order of operations.",
    level: "expert"
  },
  {
    problem: "- * A + B C + D E",
    solution: "((A*(B+C))+(D+E))? Let's trace: - * A + B C + D E → scan: E, D, +, C, B, +, A, *, -. Actually tokens: -, *, A, +, B, C, +, D, E. Scan right: E, D, +, C, B, +, A, *, -. Step: E→[E]; D→[E,D]; +→(D+E) → [(D+E)]; C→[(D+E), C]; B→[(D+E), C, B]; +→(B+C) → [(D+E), (B+C)]; A→[(D+E), (B+C), A]; *→(A*(B+C)) → [(D+E), (A*(B+C))]; -→pop (A*(B+C)) (left), (D+E) (right) → ((A*(B+C))-(D+E)). So solution: ((A*(B+C))-(D+E)).",
    commonMistake: "Order of subtraction.",
    level: "expert"
  },
  {
    problem: "+ * A - B C / D E",
    solution: "((A*(B-C))+(D/E))",
    hint: "Subtraction, multiplication, division, addition.",
    explanation: "Scan: E, D, /, C, B, -, A, *, +. -: (B-C); *: (A*(B-C)); /: (D/E); +: ((A*(B-C))+(D/E)).",
    commonMistake: "Complex nesting.",
    level: "expert"
  },
  {
    problem: "* + A B - C D",
    solution: "((A+B)*(C-D))",
    hint: "Two groups then multiplication.",
    explanation: "Scan: D, C, -, B, A, +, *. +: (A+B); -: (C-D); *: ((A+B)*(C-D)).",
    commonMistake: "Forgetting outer parentheses.",
    level: "intermediate"
  },
  {
    problem: "- + * A B * C D E",
    solution: "((((A*B)+(C*D))-E))",
    hint: "Two multiplications, addition, subtraction.",
    explanation: "Scan: E, D, C, *, B, A, *, +, -. *: (A*B); *: (C*D); +: ((A*B)+(C*D)); -: (((A*B)+(C*D))-E).",
    commonMistake: "Order of subtraction.",
    level: "expert"
  },
  {
    problem: "+ * A B / C D E",
    solution: "((((A*B)+(C/D))*E)? Let's trace: + * A B / C D E → scan: E, D, C, /, B, A, *, +. Actually tokens: +, *, A, B, /, C, D, E. Scan right: E, D, C, /, B, A, *, +. Step: E→[E]; D→[E,D]; C→[E,D,C]; /→(C/D) → [E, (C/D)]; B→[E,(C/D),B]; A→[E,(C/D),B,A]; *→(A*B) → [E,(C/D),(A*B)]; +→((A*B)+(C/D)) → [E, ((A*B)+(C/D))]; Now we have two elements: E and the result. No operator left. Invalid. We'll replace with a valid one.",
    commonMistake: "Invalid expression.",
    level: "expert"
  },
  // Replace with:
  {
    problem: "+ + * A B * C D E",
    solution: "((((A*B)+(C*D))+E))",
    hint: "Multiplications, additions.",
    explanation: "Scan: E, D, C, *, B, A, *, +, +. *: (A*B); *: (C*D); +: ((A*B)+(C*D)); +: (((A*B)+(C*D))+E).",
    commonMistake: "Order of operands.",
    level: "expert"
  },
  {
    problem: "- * A B / C D",
    solution: "((A*B)-(C/D))",
    hint: "Multiplication and division, then subtraction.",
    explanation: "Scan: D, C, /, B, A, *, -. *: (A*B); /: (C/D); -: ((A*B)-(C/D)).",
    commonMistake: "Writing (A*B-C/D) without parentheses.",
    level: "intermediate"
  },
  {
    problem: "+ * A B + C D",
    solution: "((A*B)+(C+D))",
    hint: "Multiplication, addition, addition.",
    explanation: "Scan: D, C, +, B, A, *, +. +: (C+D); *: (A*B); +: ((A*B)+(C+D)).",
    commonMistake: "Order of addition.",
    level: "advanced"
  }
];

export default questions;