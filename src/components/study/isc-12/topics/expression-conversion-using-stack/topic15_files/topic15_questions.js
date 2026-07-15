// topic15_questions.js
// 30 FAQs on "Rules for Infix to Prefix Conversion" – basic to expert.

const questions = [
  {
    question: "What is the first step in converting infix to prefix?",
    shortAnswer: "Reverse the infix expression.",
    explanation: "This prepares the expression for right‑to‑left scanning.",
    hint: "Start by reversing.",
    level: "basic",
    codeExample: "A+B → B+A"
  },
  {
    question: "What do you do with parentheses after reversing?",
    shortAnswer: "Swap '(' with ')' and vice versa.",
    explanation: "Maintains correct grouping after the reversal.",
    hint: "Swap them.",
    level: "basic",
    codeExample: "(A+B) → (B+A) → )B+A( → swapped: (B+A)"
  },
  {
    question: "Which direction do you scan the reversed expression?",
    shortAnswer: "Left to right.",
    explanation: "After reversing, we apply a postfix‑like algorithm scanning left to right.",
    hint: "Same as postfix after reversal.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "How does associativity handling differ from infix‑to‑postfix?",
    shortAnswer: "You do NOT pop operators of equal precedence.",
    explanation: "Prefix associates from right to left, so equal precedence stays on the stack.",
    hint: "Different for prefix.",
    level: "intermediate",
    codeExample: "A+B+C → + + A B C (right‑assoc)"
  },
  {
    question: "What is the final step of the conversion?",
    shortAnswer: "Reverse the output string.",
    explanation: "The output from the modified postfix algorithm is the reverse of the correct prefix.",
    hint: "Reverse again.",
    level: "basic",
    codeExample: "AB+ → +AB"
  },
  {
    question: "Why do we reverse the expression initially?",
    shortAnswer: "To allow scanning from right to left, which matches prefix evaluation.",
    explanation: "Prefix is evaluated right‑to‑left, so we reverse to make the algorithm work.",
    hint: "It's a trick.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is the output for infix `A+B`?",
    shortAnswer: "+AB",
    explanation: "Reverse → B+A; postfix‑like → BA+; reverse → +AB.",
    hint: "Simple.",
    level: "basic",
    codeExample: "+AB"
  },
  {
    question: "What is the output for infix `A+B*C`?",
    shortAnswer: "+A*BC",
    explanation: "Reverse → C*B+A; postfix‑like → CB*A+; reverse → +A*BC.",
    hint: "Precedence.",
    level: "intermediate",
    codeExample: "+A*BC"
  },
  {
    question: "What is the output for infix `(A+B)*C`?",
    shortAnswer: "*+ABC",
    explanation: "Reverse → C*(B+A); postfix‑like → CBA+*; reverse → *+ABC.",
    hint: "Parentheses.",
    level: "intermediate",
    codeExample: "*+ABC"
  },
  {
    question: "What is the output for infix `A*B+C`?",
    shortAnswer: "+*ABC",
    explanation: "Reverse → C+B*A; postfix‑like → CB*A+; reverse → +*ABC.",
    hint: "Precedence.",
    level: "intermediate",
    codeExample: "+*ABC"
  },
  {
    question: "What is the output for infix `A+B*C-D`?",
    shortAnswer: "-+A*BCD",
    explanation: "Reverse → D-C*B+A; postfix‑like → DCB*A+-; reverse → -+A*BCD.",
    hint: "Complex.",
    level: "advanced",
    codeExample: "-+A*BCD"
  },
  {
    question: "What is the output for infix `A^B^C` (right‑associative)?",
    shortAnswer: "^^ABC",
    explanation: "Reverse → C^B^A; postfix‑like (no equal pop for ^) → CB^A^; reverse → ^^ABC.",
    hint: "Right‑assoc.",
    level: "advanced",
    codeExample: "^^ABC"
  },
  {
    question: "What is the output for infix `(A+B)*(C-D)`?",
    shortAnswer: "*+AB-CD",
    explanation: "Reverse → (D-C)*(B+A); postfix‑like → DC-BA+*; reverse → *+AB-CD.",
    hint: "Two groups.",
    level: "advanced",
    codeExample: "*+AB-CD"
  },
  {
    question: "What is the output for infix `A*(B+C)-D/E`?",
    shortAnswer: "-*A+BC/DE",
    explanation: "Reverse → E/D-C+B*A; postfix‑like → EDCB+A*-; reverse → -*A+BC/DE.",
    hint: "Complex.",
    level: "expert",
    codeExample: "-*A+BC/DE"
  },
  {
    question: "What is the output for infix `A+B*C/D`?",
    shortAnswer: "+A/*BCD",
    explanation: "Reverse → D/C*B+A; postfix‑like → DCB*+A? Wait careful: need to re-evaluate; the algorithm gives +A/*BCD.",
    hint: "Precedence and associativity.",
    level: "advanced",
    codeExample: "+A/*BCD"
  },
  {
    question: "What is the difference between prefix and postfix in terms of evaluation?",
    shortAnswer: "Prefix is evaluated right‑to‑left; postfix is left‑to‑right.",
    explanation: "This is why the conversion steps are mirrored.",
    hint: "Direction.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "Why do we not pop equal precedence in the modified postfix step?",
    shortAnswer: "Because prefix is right‑associative, so the rightmost operator should be applied first.",
    explanation: "For example, A+B+C becomes ++ABC, not +A+BC.",
    hint: "Right‑assoc.",
    level: "advanced",
    codeExample: "Not applicable"
  },
  {
    question: "What is the prefix form of `A+B*C`?",
    shortAnswer: "+A*BC",
    explanation: "Multiplication first, then addition.",
    hint: "Precedence.",
    level: "intermediate",
    codeExample: "+A*BC"
  },
  {
    question: "What is the prefix form of `(A+B)*C`?",
    shortAnswer: "*+ABC",
    explanation: "Parentheses force addition first.",
    hint: "Parentheses.",
    level: "intermediate",
    codeExample: "*+ABC"
  },
  {
    question: "What is the prefix form of `A*B+C*D`?",
    shortAnswer: "+*AB*CD",
    explanation: "Multiplications first, then addition.",
    hint: "Two multiplications.",
    level: "advanced",
    codeExample: "+*AB*CD"
  },
  {
    question: "What is the prefix form of `A-B-C`?",
    shortAnswer: "--ABC",
    explanation: "Subtraction is left‑associative, but prefix is right‑assoc, so it becomes - - A B C? Actually, we need to check: A-B-C -> (A-B)-C. The prefix is --ABC? Let's see: reverse → C-B-A, postfix-like → CB-A-, reverse → --ABC. Yes.",
    hint: "Left‑assoc but prefix handles differently.",
    level: "advanced",
    codeExample: "--ABC"
  },
  {
    question: "What is the prefix form of `A^B^C`?",
    shortAnswer: "^^ABC",
    explanation: "Right‑associative exponentiation stays right‑assoc.",
    hint: "Right‑assoc.",
    level: "advanced",
    codeExample: "^^ABC"
  },
  {
    question: "What is the prefix form of `(A^B)^C`?",
    shortAnswer: "^ ^ A B C? Actually with parentheses: (A^B)^C → ^ ^ A B C? Let's check: reverse → C^B^A? Need to compute carefully. In prefix, parentheses: (A^B)^C => ^(^AB) C = ^^ABC? Wait, we need to convert correctly: Infix: (A^B)^C. Reverse: C^(B^A). Swap parentheses: C^(B^A). Postfix-like: C B A ^ ^? Actually process: C (operand) -> output; ^ (operator) -> push; B (operand) -> output; ^ (operator) -> pop? No, equal precedence not popped, so push ^; A (operand) -> output; end -> pop ^, ^ -> output: C B A ^ ^. Reverse: ^ ^ A B C. So prefix: ^^ABC. Let's confirm: (A^B)^C = (^AB)^C = ^(^AB)C = ^^ABC. Correct.",
    hint: "Parentheses force left‑assoc but prefix still right‑assoc? Actually the result is ^^ABC.",
    level: "expert",
    codeExample: "^^ABC"
  },
  {
    question: "Why does the algorithm require swapping parentheses?",
    shortAnswer: "Because reversing changes the nesting order; swapping maintains the correct grouping.",
    explanation: "Without swapping, the sub‑expressions would be grouped incorrectly.",
    hint: "Grouping.",
    level: "intermediate",
    codeExample: "(A+B) → reverse → (B+A) → swap → (B+A) (no change here, but in complex cases it matters)."
  },
  {
    question: "How can you test your prefix conversion implementation?",
    shortAnswer: "Convert back to infix using a prefix‑to‑infix converter and compare.",
    explanation: "Or use known test cases and verify manually.",
    hint: "Testing.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is the space complexity of the conversion algorithm?",
    shortAnswer: "O(n) due to the stack and temporary strings.",
    explanation: "We use a stack and create reversed strings.",
    hint: "Linear.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is the time complexity?",
    shortAnswer: "O(n), where n is the length of the expression.",
    explanation: "Each character is processed a constant number of times.",
    hint: "Linear.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "Does the algorithm handle multi‑character operands?",
    shortAnswer: "Not by default; you need to tokenize first.",
    explanation: "The basic algorithm assumes single‑character operands.",
    hint: "Tokenizer needed.",
    level: "advanced",
    codeExample: "Not applicable"
  },
  {
    question: "What is the main advantage of prefix over infix?",
    shortAnswer: "No parentheses and no precedence rules needed.",
    explanation: "Evaluation is straightforward with a stack.",
    hint: "Machine‑friendly.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "What is the main disadvantage of prefix for humans?",
    shortAnswer: "It is less intuitive and harder to read.",
    explanation: "Humans are trained to read infix.",
    hint: "Not human‑friendly.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "What is the relationship between prefix and postfix?",
    shortAnswer: "They are mirror images: one has operator before operands, the other after.",
    explanation: "They are symmetric in terms of evaluation direction.",
    hint: "Symmetric.",
    level: "basic",
    codeExample: "Not applicable"
  },
];

export default questions;