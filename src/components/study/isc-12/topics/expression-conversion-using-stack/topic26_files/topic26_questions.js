// topic26_questions.js
// 30 practice problems for postfix‑to‑infix conversion, with solutions and hints.

const questions = [
  // ---- BASIC (1-10) ----
  {
    problem: "A B +",
    solution: "(A+B)",
    hint: "Combine A and B with '+', wrap in parentheses.",
    explanation: "Push A, push B, pop B, pop A, combine as (A+B), push.",
    commonMistake: "Popping in wrong order – right operand first.",
    level: "basic"
  },
  {
    problem: "A B -",
    solution: "(A-B)",
    hint: "Combine with '-'.",
    explanation: "Push A, push B, pop B, pop A, combine as (A-B), push.",
    commonMistake: "Writing (B-A) (wrong order).",
    level: "basic"
  },
  {
    problem: "A B *",
    solution: "(A*B)",
    hint: "Combine with '*'.",
    explanation: "Push A, push B, pop B, pop A, combine as (A*B), push.",
    commonMistake: "None typical.",
    level: "basic"
  },
  {
    problem: "A B /",
    solution: "(A/B)",
    hint: "Combine with '/'.",
    explanation: "Push A, push B, pop B, pop A, combine as (A/B), push.",
    commonMistake: "None typical.",
    level: "basic"
  },
  {
    problem: "A B C * +",
    solution: "(A+(B*C))",
    hint: "Multiplication first, then addition.",
    explanation: "Push A, B, C. '*' combines B and C → (B*C). '+' combines A and (B*C) → (A+(B*C)).",
    commonMistake: "Writing (A+B*C) without parentheses.",
    level: "basic"
  },
  {
    problem: "A B + C *",
    solution: "((A+B)*C)",
    hint: "Addition first, then multiplication.",
    explanation: "A+B → (A+B), then *C → ((A+B)*C).",
    commonMistake: "Writing (A+B)*C without the outer parentheses.",
    level: "basic"
  },
  {
    problem: "A B C + *",
    solution: "(A*(B+C))",
    hint: "Addition first, then multiplication.",
    explanation: "B+C → (B+C), then A* → (A*(B+C)).",
    commonMistake: "Writing (A*B+C) (wrong order).",
    level: "basic"
  },
  {
    problem: "A B * C +",
    solution: "((A*B)+C)",
    hint: "Multiplication first, then addition.",
    explanation: "A*B → (A*B), then +C → ((A*B)+C).",
    commonMistake: "Writing (A*B+C) without parentheses.",
    level: "basic"
  },
  {
    problem: "A B C / +",
    solution: "(A+(B/C))",
    hint: "Division first, then addition.",
    explanation: "B/C → (B/C), then +A → (A+(B/C)).",
    commonMistake: "Writing (A+B/C) without parentheses.",
    level: "basic"
  },
  {
    problem: "A B C * D / +",
    solution: "(A+((B*C)/D))",
    hint: "Multiplication, then division, then addition.",
    explanation: "B*C → (B*C), then /D → ((B*C)/D), then +A → (A+((B*C)/D)).",
    commonMistake: "Order of division and addition.",
    level: "intermediate"
  },

  // ---- INTERMEDIATE (11-20) ----
  {
    problem: "A B + C D - *",
    solution: "((A+B)*(C-D))",
    hint: "Two groups then multiplication.",
    explanation: "A+B → (A+B); C-D → (C-D); then * → ((A+B)*(C-D)).",
    commonMistake: "Mixing up the order of the two groups.",
    level: "intermediate"
  },
  {
    problem: "A B C * + D -",
    solution: "((A+(B*C))-D)",
    hint: "Multiplication, then addition, then subtraction.",
    explanation: "B*C → (B*C); +A → (A+(B*C)); -D → ((A+(B*C))-D).",
    commonMistake: "Writing (A+B*C-D) without parentheses.",
    level: "intermediate"
  },
  {
    problem: "A B * C D * +",
    solution: "((A*B)+(C*D))",
    hint: "Two multiplications then addition.",
    explanation: "A*B → (A*B); C*D → (C*D); + → ((A*B)+(C*D)).",
    commonMistake: "Order of the two products.",
    level: "intermediate"
  },
  {
    problem: "A B * C D / -",
    solution: "((A*B)-(C/D))",
    hint: "Multiplication and division, then subtraction.",
    explanation: "A*B → (A*B); C/D → (C/D); - → ((A*B)-(C/D)).",
    commonMistake: "Writing (A*B-C/D) without parentheses.",
    level: "intermediate"
  },
  {
    problem: "A B C * D / + E -",
    solution: "(((A+((B*C)/D))-E))",
    hint: "Multiplication, division, addition, subtraction.",
    explanation: "B*C → (B*C); /D → ((B*C)/D); +A → (A+((B*C)/D)); -E → ((A+((B*C)/D))-E).",
    commonMistake: "Not enough parentheses.",
    level: "advanced"
  },
  {
    problem: "A B C ^ ^",
    solution: "(A^(B^C))",
    hint: "Exponentiation is right‑associative.",
    explanation: "First ^: pop C, B → (B^C). Second ^: pop (B^C), A → (A^(B^C)).",
    commonMistake: "Treating ^ as left‑associative and writing (A^B)^C.",
    level: "advanced"
  },
  {
    problem: "A B ^ C ^",
    solution: "((A^B)^C)",
    hint: "Parentheses make it left‑associative.",
    explanation: "A^B → (A^B); then ^C → ((A^B)^C).",
    commonMistake: "Writing (A^(B^C)) (wrong).",
    level: "advanced"
  },
  {
    problem: "A B + C D + *",
    solution: "((A+B)*(C+D))",
    hint: "Two additions, then multiplication.",
    explanation: "A+B → (A+B); C+D → (C+D); * → ((A+B)*(C+D)).",
    commonMistake: "Forgetting one of the parentheses.",
    level: "intermediate"
  },
  {
    problem: "A B C * + D E / -",
    solution: "((A+(B*C))-(D/E))",
    hint: "Multiplication, addition, division, subtraction.",
    explanation: "B*C → (B*C); +A → (A+(B*C)); D/E → (D/E); - → ((A+(B*C))-(D/E)).",
    commonMistake: "Order of subtraction.",
    level: "advanced"
  },
  {
    problem: "A B + C * D E / -",
    solution: "(((A+B)*C)-(D/E))",
    hint: "Addition, multiplication, division, subtraction.",
    explanation: "A+B → (A+B); *C → ((A+B)*C); D/E → (D/E); - → (((A+B)*C)-(D/E)).",
    commonMistake: "Missing parentheses around (A+B)*C.",
    level: "advanced"
  },

  // ---- ADVANCED (21-30) ----
  {
    problem: "A B C + * D E / - F +",
    solution: "((((A*(B+C))-(D/E))+F))",
    hint: "Nested operations.",
    explanation: "B+C → (B+C); A* → (A*(B+C)); D/E → (D/E); - → ((A*(B+C))-(D/E)); +F → (((A*(B+C))-(D/E))+F).",
    commonMistake: "Order of operations with multiple operators.",
    level: "expert"
  },
  {
    problem: "A B C * D E / + * F -",
    solution: "((A*((B*C)+(D/E)))-F)",
    hint: "Complex nested expression.",
    explanation: "B*C → (B*C); D/E → (D/E); + → ((B*C)+(D/E)); A* → (A*((B*C)+(D/E))); -F → ((A*((B*C)+(D/E)))-F).",
    commonMistake: "Misplacing parentheses.",
    level: "expert"
  },
  {
    problem: "A B C D E + * - /",
    solution: "((A/(B-(C*(D+E)))))",
    hint: "Innermost first.",
    explanation: "D+E → (D+E); C* → (C*(D+E)); B- → (B-(C*(D+E))); A/ → (A/(B-(C*(D+E)))).",
    commonMistake: "Order of operations.",
    level: "expert"
  },
  {
    problem: "A B C * D / + E F * G / -",
    solution: "(((A+((B*C)/D))-((E*F)/G)))",
    hint: "Two groups then subtraction.",
    explanation: "B*C → (B*C); /D → ((B*C)/D); +A → (A+((B*C)/D)); E*F → (E*F); /G → ((E*F)/G); - → (((A+((B*C)/D))-((E*F)/G))).",
    commonMistake: "Complex nesting.",
    level: "expert"
  },
  {
    problem: "A B C + D E + * F + G /",
    solution: "(((A*((B+C)*(D+E)))+F)/G)",
    hint: "Multiple operations.",
    explanation: "B+C → (B+C); D+E → (D+E); * → ((B+C)*(D+E)); A* → (A*((B+C)*(D+E))); +F → ((A*((B+C)*(D+E)))+F); /G → (((A*((B+C)*(D+E)))+F)/G).",
    commonMistake: "Complex ordering.",
    level: "expert"
  },
  {
    problem: "A B C * + D * E / F -",
    solution: "(((A+(B*C))*D)/E)-F? Let's trace: A B C * + D * E / F - → A→[A]; B→[A,B]; C→[A,B,C]; *→[A,(B*C)]; +→[(A+(B*C))]; D→[(A+(B*C)),D]; *→[((A+(B*C))*D)]; E→[((A+(B*C))*D),E]; /→[(((A+(B*C))*D)/E)]; F→[(((A+(B*C))*D)/E),F]; -→[((((A+(B*C))*D)/E)-F)]. Result: (((((A+(B*C))*D)/E)-F))",
    hint: "Complex with multiplication and division.",
    explanation: "B*C → (B*C); +A → (A+(B*C)); *D → ((A+(B*C))*D); /E → (((A+(B*C))*D)/E); -F → ((((A+(B*C))*D)/E)-F).",
    commonMistake: "Order of operations.",
    level: "expert"
  },
  {
    problem: "A B C D + * E F + * G + H -",
    solution: "((((A*(B*(C+D)))+(E+F))-H))",
    hint: "Nested operations.",
    explanation: "C+D → (C+D); B* → (B*(C+D)); A* → (A*(B*(C+D))); E+F → (E+F); * → ((A*(B*(C+D)))*(E+F)); +G → (((A*(B*(C+D)))*(E+F))+G); -H → ((((A*(B*(C+D)))*(E+F))+G)-H).",
    commonMistake: "Order of operations.",
    level: "expert"
  },
  {
    problem: "A B C * D E / + F * G / -",
    solution: "((A-((((B*C)+(D/E))*F)/G)))",
    hint: "Complex with division.",
    explanation: "B*C → (B*C); D/E → (D/E); + → ((B*C)+(D/E)); *F → (((B*C)+(D/E))*F); /G → ((((B*C)+(D/E))*F)/G); A- → ((A-((((B*C)+(D/E))*F)/G))).",
    commonMistake: "Order of operations.",
    level: "expert"
  },
  {
    problem: "A B C D E + * F * G - /",
    solution: "(((A/(B-(C*(D+E))*F)))? Let's trace: A B C D E + * F * G - / → A→[A]; B→[A,B]; C→[A,B,C]; D→[A,B,C,D]; E→[A,B,C,D,E]; +→[A,B,C,(D+E)]; *→[A,B,(C*(D+E))]; F→[A,B,(C*(D+E)),F]; *→[A,B,((C*(D+E))*F)]; G→[A,B,((C*(D+E))*F),G]; -→[A,(B-((C*(D+E))*F))]; /→[(A/(B-((C*(D+E))*F)))]. Result: (A/(B-((C*(D+E))*F)))",
    hint: "Innermost first.",
    explanation: "D+E → (D+E); C* → (C*(D+E)); *F → ((C*(D+E))*F); B- → (B-((C*(D+E))*F)); A/ → (A/(B-((C*(D+E))*F))).",
    commonMistake: "Order of operations.",
    level: "expert"
  },
  {
    problem: "A B C * D E / + F G H * + * /",
    solution: "((A*((B*C)+(D/E)))/(F+(G*H)))",
    hint: "Complex with multiple groups.",
    explanation: "B*C → (B*C); D/E → (D/E); + → ((B*C)+(D/E)); A* → (A*((B*C)+(D/E))); G*H → (G*H); F+ → (F+(G*H)); / → ((A*((B*C)+(D/E)))/(F+(G*H))).",
    commonMistake: "Order of operations.",
    level: "expert"
  }
];

export default questions;