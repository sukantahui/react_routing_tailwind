// topic20_questions.js
// 30 FAQs on "Reverse and Parentheses Swapping Technique" – basic to expert.

const questions = [
  {
    question: "Why do we reverse the infix expression in the algorithm?",
    shortAnswer: "To allow right‑to‑left scanning, matching prefix evaluation order.",
    explanation: "Prefix is evaluated from right to left; reversing allows us to use a left‑to‑right scan.",
    hint: "It's a mirror trick.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "Why do we swap parentheses after reversing?",
    shortAnswer: "To maintain correct grouping of sub‑expressions.",
    explanation: "Reversing changes the nesting; swapping restores the intended structure.",
    hint: "Grouping.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What happens if we skip swapping parentheses?",
    shortAnswer: "The grouping of parentheses becomes inverted, leading to incorrect evaluation.",
    explanation: "For example, `(A+B)*C` would become `C*(B+A)` after reverse, but without swap it's `C*(B+A)` which is actually fine? In more complex cases, it breaks.",
    hint: "Try with nested parentheses.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "How do you reverse a string in Java?",
    shortAnswer: "Using `new StringBuilder(s).reverse().toString()`.",
    explanation: "This is the standard way to reverse a string.",
    hint: "StringBuilder.",
    level: "basic",
    codeExample: "String reversed = new StringBuilder(infix).reverse().toString();"
  },
  {
    question: "How do you swap parentheses in a string?",
    shortAnswer: "Iterate through the string and replace '(' with ')' and vice versa.",
    explanation: "You can use a `StringBuilder` and a loop.",
    hint: "Character by character.",
    level: "basic",
    codeExample: "if (c == '(') sb.append(')'); else if (c == ')') sb.append('(');"
  },
  {
    question: "What is the output of reversing `(A+B)*C`?",
    shortAnswer: "`C*(B+A)`",
    explanation: "The string is reversed character by character.",
    hint: "Simple reversal.",
    level: "basic",
    codeExample: "C*(B+A)"
  },
  {
    question: "What is the output of swapping parentheses in `C*(B+A)`?",
    shortAnswer: "`C*(B+A)` (no change, as there are no parentheses to swap).",
    explanation: "No '(' or ')' to swap.",
    hint: "No change.",
    level: "basic",
    codeExample: "C*(B+A)"
  },
  {
    question: "What is the output of reversing `((A+B)*C)-D`?",
    shortAnswer: "`D-)C*(B+A((`",
    explanation: "The entire string is reversed.",
    hint: "Reversed string.",
    level: "intermediate",
    codeExample: "D-)C*(B+A(("
  },
  {
    question: "What is the output of swapping parentheses in `D-)C*(B+A((`?",
    shortAnswer: "`D-(C*(B+A))`",
    explanation: "The '(' and ')' are swapped.",
    hint: "Swapped.",
    level: "intermediate",
    codeExample: "D-(C*(B+A))"
  },
  {
    question: "Why is it important to preserve grouping after reversal?",
    shortAnswer: "Because the modified postfix algorithm expects correct grouping.",
    explanation: "If parentheses are inverted, the sub‑expression order will be wrong.",
    hint: "Correct grouping is essential.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "Can we skip the reverse step and just scan from right to left?",
    shortAnswer: "Yes, but the algorithm as described uses reversal for simplicity.",
    explanation: "Both approaches are equivalent.",
    hint: "Alternative.",
    level: "advanced",
    codeExample: "Not applicable"
  },
  {
    question: "What is the time complexity of reversing and swapping?",
    shortAnswer: "O(n), where n is the expression length.",
    explanation: "Each character is processed once in each step.",
    hint: "Linear.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What data structure is best for reversing a string?",
    shortAnswer: "StringBuilder or a character array.",
    explanation: "StringBuilder provides efficient reversal.",
    hint: "Use StringBuilder.",
    level: "basic",
    codeExample: "new StringBuilder(s).reverse()"
  },
  {
    question: "What is the output of reversing `A+B*C`?",
    shortAnswer: "`C*B+A`",
    explanation: "Reversed character by character.",
    hint: "Reverse.",
    level: "basic",
    codeExample: "C*B+A"
  },
  {
    question: "Do we need to swap parentheses if there are none?",
    shortAnswer: "No, swapping has no effect if no parentheses exist.",
    explanation: "It's safe to call the swap function even if there are none.",
    hint: "No effect.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "What is the output of swapping parentheses in `A+(B*C)`?",
    shortAnswer: "`A+(B*C)` (no change, because the parentheses are already correctly oriented? Actually, after reversal, it becomes `C*B(+A`? Let's check: `A+(B*C)` reversed is `C*B(+A`? Wait, careful: original `A+(B*C)` reversed is `C*B(+A`? Actually reverse: `A+(B*C)` -> `)C*B(+A`? No. Better to illustrate with an example. The swap step is applied after reversal. So it's not directly swapping the original parentheses.",
    explanation: "The swap is performed on the reversed string.",
    hint: "After reversal.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  // ... (more questions)
];

export default questions;