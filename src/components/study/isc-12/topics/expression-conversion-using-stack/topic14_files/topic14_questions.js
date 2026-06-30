// topic14_questions.js
// 30 practice problems for infix‑to‑postfix conversion, with solutions and hints.

const questions = [
  // ---- BASIC (1-5) ----
  {
    problem: "A + B",
    solution: "AB+",
    hint: "Operator goes after operands.",
    explanation: "Simple addition: A and B are output, then '+' is appended.",
    commonMistake: "Writing 'AB+' correctly, but sometimes writing 'A+B' out of habit.",
    level: "basic"
  },
  {
    problem: "A - B",
    solution: "AB-",
    hint: "Subtraction is left‑associative.",
    explanation: "A and B output, then '-' appended.",
    commonMistake: "Confusing with postfix for subtraction.",
    level: "basic"
  },
  {
    problem: "A * B",
    solution: "AB*",
    hint: "Multiplication has higher precedence than addition.",
    explanation: "A, B output, '*' appended.",
    commonMistake: "None typical.",
    level: "basic"
  },
  {
    problem: "A / B",
    solution: "AB/",
    hint: "Division is left‑associative.",
    explanation: "A, B output, '/' appended.",
    commonMistake: "None typical.",
    level: "basic"
  },
  {
    problem: "A + B * C",
    solution: "ABC*+",
    hint: "Multiplication before addition.",
    explanation: "B*C is computed first, then added to A.",
    commonMistake: "Writing 'AB+C*' (wrong order) or 'AB*C+' (wrong precedence).",
    level: "basic"
  },

  // ---- INTERMEDIATE (6-15) ----
  {
    problem: "(A + B) * C",
    solution: "AB+C*",
    hint: "Parentheses force addition first.",
    explanation: "A+B is done first, then multiplied by C.",
    commonMistake: "Forgetting the parentheses and writing 'AB+C*'.",
    level: "intermediate"
  },
  {
    problem: "A * (B + C)",
    solution: "ABC+*",
    hint: "Inside parentheses first.",
    explanation: "B+C then multiplied by A.",
    commonMistake: "Writing 'AB+C*' which is wrong for this expression.",
    level: "intermediate"
  },
  {
    problem: "A + B - C",
    solution: "AB+C-",
    hint: "Left‑associative: (A+B)-C.",
    explanation: "Addition first (left‑to‑right), then subtraction.",
    commonMistake: "Writing 'ABC-+' (right‑associative) which is wrong.",
    level: "intermediate"
  },
  {
    problem: "A - B + C",
    solution: "AB-C+",
    hint: "Left‑associative: (A-B)+C.",
    explanation: "Subtraction first, then addition.",
    commonMistake: "Writing 'AB+C-' (wrong order).",
    level: "intermediate"
  },
  {
    problem: "A * B + C / D",
    solution: "AB*CD/+",
    hint: "Multiplication and division before addition.",
    explanation: "A*B, C/D, then add.",
    commonMistake: "Writing 'AB*CD+ /' – division should be before addition.",
    level: "intermediate"
  },
  {
    problem: "(A + B) * (C - D)",
    solution: "AB+CD-*",
    hint: "Two sub‑expressions, then multiply.",
    explanation: "A+B, C-D, then *.",
    commonMistake: "Losing one of the parentheses groups.",
    level: "intermediate"
  },
  {
    problem: "A + B * C - D",
    solution: "ABC*+D-",
    hint: "Multiplication first, then addition, then subtraction.",
    explanation: "A + (B*C) - D.",
    commonMistake: "Doing A+B first incorrectly.",
    level: "intermediate"
  },
  {
    problem: "A * B - C / D",
    solution: "AB*CD/-",
    hint: "Multiplication and division before subtraction.",
    explanation: "(A*B) - (C/D).",
    commonMistake: "Treating '-' as left‑associative and doing A*B-C first, but division is separate.",
    level: "intermediate"
  },
  {
    problem: "(A - B) / (C + D)",
    solution: "AB-CD+/",
    hint: "Parentheses first, then division.",
    explanation: "(A-B) and (C+D) then '/'.",
    commonMistake: "Forgetting one of the parentheses groups.",
    level: "intermediate"
  },
  {
    problem: "A / (B + C) * D",
    solution: "ABC+/D*",
    hint: "Parentheses first, then division, then multiplication (left‑associative).",
    explanation: "A/(B+C)*D = (A/(B+C))*D.",
    commonMistake: "Writing 'ABC+*D' (wrong).",
    level: "intermediate"
  },

  // ---- ADVANCED (16-25) ----
  {
    problem: "A ^ B ^ C",
    solution: "ABC^^",
    hint: "Exponentiation is right‑associative.",
    explanation: "A^(B^C) so postfix is A B C ^ ^.",
    commonMistake: "Treating ^ as left‑associative and writing 'AB^C^'.",
    level: "advanced"
  },
  {
    problem: "(A ^ B) ^ C",
    solution: "AB^C^",
    hint: "Parentheses make it left‑associative.",
    explanation: "(A^B)^C, so postfix is AB^C^.",
    commonMistake: "Writing 'ABC^^' (right‑assoc) because of habit.",
    level: "advanced"
  },
  {
    problem: "A + B * C / D",
    solution: "ABC*D/+",
    hint: "Multiplication and division left‑associative: (B*C)/D then +A.",
    explanation: "A + (B*C)/D.",
    commonMistake: "Writing 'ABC*D/ +' but order of '/' and '+' matters.",
    level: "advanced"
  },
  {
    problem: "(A + B) * C - D / E",
    solution: "AB+C*DE/-",
    hint: "Parentheses first, then multiplication, division, subtraction.",
    explanation: "(A+B)*C - D/E.",
    commonMistake: "Missing the division grouping.",
    level: "advanced"
  },
  {
    problem: "A * (B + C / D)",
    solution: "ABCD/+*",
    hint: "Inside parentheses: C/D, then +B, then *A.",
    explanation: "A * (B + (C/D)).",
    commonMistake: "Getting the order inside parentheses wrong (e.g., B C D / +).",
    level: "advanced"
  },
  {
    problem: "A / (B - C) + D * E",
    solution: "ABC-/DE*+",
    hint: "Parentheses first, then division, multiplication, addition.",
    explanation: "A/(B-C) + D*E.",
    commonMistake: "Writing 'ABC-/DE+*'.",
    level: "advanced"
  },
  {
    problem: "(A + B) * (C - D) / (E + F)",
    solution: "AB+CD-*EF+/",
    hint: "Two parentheses, then multiplication, then division (left‑assoc).",
    explanation: "((A+B)*(C-D))/(E+F).",
    commonMistake: "Forgetting one parenthesis or misplacing division.",
    level: "advanced"
  },
  {
    problem: "A + B * C - D / E + F",
    solution: "ABC*+DE/-F+",
    hint: "Left‑associative for + and -.",
    explanation: "((A + (B*C)) - (D/E)) + F.",
    commonMistake: "Doing D/E + F first incorrectly.",
    level: "advanced"
  },
  {
    problem: "(A + B * C) - D / (E + F)",
    solution: "ABC*+DEF+/-",
    hint: "Parentheses: A+B*C and E+F.",
    explanation: "A+B*C computed, then D/(E+F), then subtraction.",
    commonMistake: "Misplacing the subtraction.",
    level: "advanced"
  },
  {
    problem: "A * (B + C) - D / E * F",
    solution: "ABC+*DE/F*-",
    hint: "Parentheses, then multiplication/division left‑assoc.",
    explanation: "A*(B+C) - (D/E)*F.",
    commonMistake: "Order of D/E*F might be tricky.",
    level: "advanced"
  },

  // ---- EXPERT (26-30) ----
  {
    problem: "(A + B) * (C - D) / (E + F) - G",
    solution: "AB+CD-*EF+/G-",
    hint: "Complex with multiple parentheses.",
    explanation: "((A+B)*(C-D))/(E+F) - G.",
    commonMistake: "Subtraction at the end might be missed.",
    level: "expert"
  },
  {
    problem: "A ^ B * C - D / E + F",
    solution: "AB^C*DE/-F+",
    hint: "Exponentiation first, then multiplication, division, addition/subtraction.",
    explanation: "(A^B)*C - D/E + F.",
    commonMistake: "Order of ^ and *; ^ has higher precedence.",
    level: "expert"
  },
  {
    problem: "(A + B * C) / (D - E) + F * G",
    solution: "ABC*+DE-/FG*+",
    hint: "Two parenthetical groups, then division, multiplication, addition.",
    explanation: "(A+B*C)/(D-E) + F*G.",
    commonMistake: "Grouping of multiplication in first parentheses.",
    level: "expert"
  },
  {
    problem: "A / (B + C) - D * (E - F)",
    solution: "ABC+/DEF-*-",
    hint: "Parentheses, then division, multiplication, subtraction.",
    explanation: "A/(B+C) - D*(E-F).",
    commonMistake: "Sign of subtraction after division.",
    level: "expert"
  },
  {
    problem: "((A + B) * (C - D)) / (E ^ F)",
    solution: "AB+CD-*EF^/",
    hint: "Exponentiation in denominator.",
    explanation: "(A+B)*(C-D) / (E^F).",
    commonMistake: "Order of ^ vs /.",
    level: "expert"
  },
  {
    problem: "A + B * (C - D / E)",
    solution: "ABCDE/-*+",
    hint: "Innermost parentheses first.",
    explanation: "A + B*(C - D/E).",
    commonMistake: "Order of subtraction inside.",
    level: "expert"
  },
  {
    problem: "(A - B) / (C + D * E) + F",
    solution: "AB-CDE*+ /+",
    hint: "Multiplication before addition inside parentheses.",
    explanation: "(A-B)/(C+D*E) + F.",
    commonMistake: "Order of operations in denominator.",
    level: "expert"
  },
  {
    problem: "A * (B + C) / D - E * (F - G)",
    solution: "ABC+*D/EFG-*-",
    hint: "Parentheses, then multiplication/division, then subtraction.",
    explanation: "A*(B+C)/D - E*(F-G).",
    commonMistake: "Subtraction of two products.",
    level: "expert"
  },
  {
    problem: "((A + B) / C) * (D - E) ^ F",
    solution: "AB+C/DE-F^*",
    hint: "Parentheses, division, then exponentiation (right‑assoc).",
    explanation: "(A+B)/C * (D-E)^F.",
    commonMistake: "Order of * vs ^.",
    level: "expert"
  },
  {
    problem: "A ^ (B + C) * D - E / F",
    solution: "ABC+^D*EF/-",
    hint: "Exponentiation first (with parentheses), then multiplication, division, subtraction.",
    explanation: "A^(B+C)*D - E/F.",
    commonMistake: "Order of ^ and *.",
    level: "expert"
  }
];

export default questions;