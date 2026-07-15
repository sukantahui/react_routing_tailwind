// topic16_questions.js
// 30 FAQs on "Algorithm for Infix to Prefix" – basic to expert.

const questions = [
  {
    question: "What are the 4 steps of the infix‑to‑prefix algorithm?",
    shortAnswer: "Reverse, swap parentheses, apply modified postfix, reverse.",
    explanation: "The algorithm mirrors postfix with reversal steps.",
    hint: "Think of it as postfix in a mirror.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "Why do we reverse the infix expression initially?",
    shortAnswer: "To allow scanning from right to left, matching prefix evaluation.",
    explanation: "Prefix is evaluated from right to left, so we reverse to use the postfix algorithm.",
    hint: "It's a trick to reuse postfix logic.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "Why do we swap parentheses after reversing?",
    shortAnswer: "To maintain correct grouping after the reversal.",
    explanation: "Reversing changes the nesting order; swapping restores it.",
    hint: "Grouping must be preserved.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is the key difference from infix‑to‑postfix in the modified algorithm?",
    shortAnswer: "We do NOT pop operators of equal precedence.",
    explanation: "Because prefix is right‑associative, equal precedence operators should stay on the stack.",
    hint: "Right‑associative.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is the final step of the algorithm?",
    shortAnswer: "Reverse the output obtained from the modified postfix step.",
    explanation: "The output is the reverse of the correct prefix.",
    hint: "Reverse again.",
    level: "basic",
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
    explanation: "Reverse → C^B^A; postfix‑like (no equal pop) → CB^A^; reverse → ^^ABC.",
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
    question: "What is the time complexity of the algorithm?",
    shortAnswer: "O(n) where n is the length of the infix expression.",
    explanation: "Each character is processed a constant number of times.",
    hint: "Linear.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is the space complexity?",
    shortAnswer: "O(n) due to the stack and temporary strings.",
    explanation: "We use a stack and create reversed strings.",
    hint: "Linear.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "Does the algorithm handle multi‑character operands?",
    shortAnswer: "Not directly; you need to tokenize first.",
    explanation: "The basic algorithm assumes single‑character operands.",
    hint: "Tokenizer needed.",
    level: "advanced",
    codeExample: "Not applicable"
  },
  {
    question: "What is the main use of prefix notation in practice?",
    shortAnswer: "Used in Lisp languages and some compiler intermediate representations.",
    explanation: "Prefix is machine‑friendly and avoids parentheses.",
    hint: "Lisp.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "Why is prefix easier for machines to evaluate?",
    shortAnswer: "No parentheses and no precedence rules; evaluation with a stack is straightforward.",
    explanation: "Scanning and stack operations are simple.",
    hint: "Machine‑friendly.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "What is the associativity of prefix?",
    shortAnswer: "Prefix is essentially right‑associative because evaluation is from right to left.",
    explanation: "This is why we don't pop equal precedence.",
    hint: "Right‑assoc.",
    level: "advanced",
    codeExample: "Not applicable"
  },
  {
    question: "Can the algorithm be adapted for infix‑to‑prefix with functions?",
    shortAnswer: "Yes, by treating functions as operators with high precedence and handling parentheses.",
    explanation: "You can extend the tokenizer to recognise function names.",
    hint: "Extend the parser.",
    level: "expert",
    codeExample: "Not applicable"
  },
  {
    question: "What is the output for infix `A-B-C`?",
    shortAnswer: "--ABC",
    explanation: "Reverse → C-B-A; postfix‑like → CB-A-; reverse → --ABC.",
    hint: "Left‑assoc but prefix handles differently.",
    level: "advanced",
    codeExample: "--ABC"
  },
  {
    question: "What is the output for infix `(A^B)^C`?",
    shortAnswer: "^^ABC (with parentheses) or ^^ABC? Actually (A^B)^C => ^(^AB)C => ^^ABC.",
    explanation: "Parentheses force left‑assoc but prefix still right‑assoc? The algorithm yields ^^ABC.",
    hint: "Parentheses but exponentiation.",
    level: "expert",
    codeExample: "^^ABC"
  },
  {
    question: "How do you test the algorithm?",
    shortAnswer: "Write unit tests with known expressions and compare outputs.",
    explanation: "You can also convert back to infix using a prefix‑to‑infix converter.",
    hint: "Testing.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is the role of the stack in the algorithm?",
    shortAnswer: "It temporarily holds operators and parentheses until they are output.",
    explanation: "The stack manages precedence and grouping.",
    hint: "Waiting area.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "What happens if the input expression is empty?",
    shortAnswer: "The algorithm should return an empty string.",
    explanation: "Edge case.",
    hint: "Edge case.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "Why is the final reverse necessary?",
    shortAnswer: "Because the modified postfix algorithm produces the reverse of the prefix.",
    explanation: "The output from step 3 is the reverse of the desired prefix.",
    hint: "Reverse again.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "Can we skip the reverse step by scanning from right to left?",
    shortAnswer: "Yes, but the algorithm as described is easier to implement using standard postfix logic.",
    explanation: "Both approaches are equivalent.",
    hint: "Alternative.",
    level: "advanced",
    codeExample: "Not applicable"
  },
  {
    question: "What is the most common mistake when implementing this algorithm?",
    shortAnswer: "Forgetting to not pop equal precedence operators.",
    explanation: "This is the key difference from postfix.",
    hint: "Associativity.",
    level: "advanced",
    codeExample: "Not applicable"
  },
  {
    question: "How does the algorithm handle unary operators?",
    shortAnswer: "It requires special handling; unary operators are not supported by the basic algorithm.",
    explanation: "You need to distinguish unary minus from binary minus.",
    hint: "Special case.",
    level: "expert",
    codeExample: "Not applicable"
  },
  {
    question: "What is the relationship between this algorithm and the Shunting‑yard algorithm?",
    shortAnswer: "It's essentially the Shunting‑yard algorithm applied after reversing and swapping.",
    explanation: "The core logic is the same.",
    hint: "Same.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
];

export default questions;