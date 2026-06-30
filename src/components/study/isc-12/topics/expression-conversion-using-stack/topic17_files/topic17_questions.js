// topic17_questions.js
// 30 FAQs on "Example of Infix to Prefix" – basic to expert.

const questions = [
  {
    question: "What is the first step in tracing an infix‑to‑prefix conversion?",
    shortAnswer: "Reverse the infix expression.",
    explanation: "This prepares the expression for right‑to‑left scanning.",
    hint: "Start by reversing.",
    level: "basic",
    codeExample: "A+B → B+A"
  },
  {
    question: "What is the prefix of `A+B`?",
    shortAnswer: "+AB",
    explanation: "Reverse → B+A; postfix‑like → BA+; reverse → +AB.",
    hint: "Simple.",
    level: "basic",
    codeExample: "+AB"
  },
  {
    question: "What is the prefix of `A+B*C`?",
    shortAnswer: "+A*BC",
    explanation: "Reverse → C*B+A; postfix‑like → CB*A+; reverse → +A*BC.",
    hint: "Precedence.",
    level: "intermediate",
    codeExample: "+A*BC"
  },
  {
    question: "What is the prefix of `(A+B)*C`?",
    shortAnswer: "*+ABC",
    explanation: "Reverse → C*(B+A); postfix‑like → CBA+*; reverse → *+ABC.",
    hint: "Parentheses.",
    level: "intermediate",
    codeExample: "*+ABC"
  },
  {
    question: "What is the prefix of `A*B+C*D`?",
    shortAnswer: "+*AB*CD",
    explanation: "Reverse → D*C+B*A; postfix‑like → DC*BA*+; reverse → +*AB*CD.",
    hint: "Two multiplications.",
    level: "advanced",
    codeExample: "+*AB*CD"
  },
  {
    question: "What is the prefix of `A^B^C` (right‑associative)?",
    shortAnswer: "^^ABC",
    explanation: "Reverse → C^B^A; postfix‑like → CB^A^; reverse → ^^ABC.",
    hint: "Right‑assoc.",
    level: "advanced",
    codeExample: "^^ABC"
  },
  {
    question: "What is the prefix of `(A+B)*(C-D)`?",
    shortAnswer: "*+AB-CD",
    explanation: "Reverse → (D-C)*(B+A); postfix‑like → DC-BA+*; reverse → *+AB-CD.",
    hint: "Two groups.",
    level: "advanced",
    codeExample: "*+AB-CD"
  },
  {
    question: "What happens when we reverse the expression?",
    shortAnswer: "The operands and operators are reversed in order.",
    explanation: "This enables right‑to‑left scanning.",
    hint: "It's a mirror.",
    level: "basic",
    codeExample: "A+B*C → C*B+A"
  },
  {
    question: "Why do we swap parentheses?",
    shortAnswer: "To maintain correct grouping after reversal.",
    explanation: "Reversing changes nesting; swapping restores it.",
    hint: "Grouping.",
    level: "intermediate",
    codeExample: "(A+B) → (B+A) after swap"
  },
  {
    question: "What is the key difference from postfix in the modified algorithm?",
    shortAnswer: "We do NOT pop operators of equal precedence.",
    explanation: "Prefix is right‑associative.",
    hint: "Right‑assoc.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is the final step after the modified postfix algorithm?",
    shortAnswer: "Reverse the output.",
    explanation: "The output from step 3 is the reverse of the correct prefix.",
    hint: "Reverse again.",
    level: "basic",
    codeExample: "BA+ → +AB"
  },
  {
    question: "Why does `A+B*C` become `+A*BC` in prefix?",
    shortAnswer: "Multiplication has higher precedence, so it's done first.",
    explanation: "The prefix reflects the order: A + (B*C).",
    hint: "Precedence.",
    level: "intermediate",
    codeExample: "+A*BC"
  },
  {
    question: "Why does `(A+B)*C` become `*+ABC`?",
    shortAnswer: "Parentheses force addition first, then multiplication.",
    explanation: "The prefix reflects the order: (A+B)*C.",
    hint: "Parentheses.",
    level: "intermediate",
    codeExample: "*+ABC"
  },
  {
    question: "What is the purpose of the stack in the trace?",
    shortAnswer: "To hold operators and parentheses temporarily.",
    explanation: "It manages precedence and grouping.",
    hint: "Waiting area.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "How does the trace show the operator precedence?",
    shortAnswer: "Higher precedence operators are popped before lower ones.",
    explanation: "The stack and output changes reflect the order.",
    hint: "Stack pops.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is the role of the output string in the trace?",
    shortAnswer: "It builds the intermediate postfix‑like expression.",
    explanation: "It's the reverse of the final prefix.",
    hint: "Growing output.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "Can you trace `A+B*C` manually?",
    shortAnswer: "Yes: A → output; B → output; * → push; C → output; end → pop *; reverse.",
    explanation: "Following the algorithm step by step.",
    hint: "Practice.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is the difference between prefix and postfix evaluation?",
    shortAnswer: "Prefix is right‑to‑left; postfix is left‑to‑right.",
    explanation: "This is why the algorithms are mirrors.",
    hint: "Direction.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is the common mistake in `A+B*C` conversion?",
    shortAnswer: "Not handling precedence correctly (e.g., doing A+B first).",
    explanation: "Multiplication has higher precedence, so it must be done before addition.",
    hint: "Precedence.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is the common mistake in `A^B^C` conversion?",
    shortAnswer: "Popping equal precedence when it should not.",
    explanation: "Exponentiation is right‑associative.",
    hint: "Right‑assoc.",
    level: "advanced",
    codeExample: "Not applicable"
  },
  {
    question: "How can you verify your prefix conversion?",
    shortAnswer: "Convert back to infix and compare.",
    explanation: "Use a prefix‑to‑infix converter.",
    hint: "Double‑check.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "Why is prefix used in Lisp?",
    shortAnswer: "It eliminates parentheses and makes evaluation straightforward.",
    explanation: "Lisp uses prefix for all operations.",
    hint: "Lisp.",
    level: "basic",
    codeExample: "(+ 2 3)"
  },
  {
    question: "What is the output for `A-B-C`?",
    shortAnswer: "--ABC",
    explanation: "Reverse → C-B-A; postfix‑like → CB-A-; reverse → --ABC.",
    hint: "Left‑assoc but prefix handles differently.",
    level: "advanced",
    codeExample: "--ABC"
  },
  {
    question: "What is the output for `(A+B)*(C-D)`?",
    shortAnswer: "*+AB-CD",
    explanation: "As traced above.",
    hint: "Two groups.",
    level: "advanced",
    codeExample: "*+AB-CD"
  },
  {
    question: "What is the output for `A*(B+C)-D/E`?",
    shortAnswer: "-*A+BC/DE",
    explanation: "Reverse → E/D-C+B*A; postfix‑like → EDCB+A*-; reverse → -*A+BC/DE.",
    hint: "Complex.",
    level: "expert",
    codeExample: "-*A+BC/DE"
  },
  {
    question: "What is the time complexity of the trace?",
    shortAnswer: "O(n) for each step; overall O(n).",
    explanation: "Each token is processed once.",
    hint: "Linear.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is the space complexity?",
    shortAnswer: "O(n) for the stack and strings.",
    explanation: "The stack and output can grow to the length of the expression.",
    hint: "Linear.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "Does the algorithm handle unary operators?",
    shortAnswer: "Not by default; it requires special handling.",
    explanation: "Unary minus, for example, needs to be distinguished from binary.",
    hint: "Special case.",
    level: "expert",
    codeExample: "Not applicable"
  },
  {
    question: "What is the purpose of the trace in learning?",
    shortAnswer: "To build intuition for the algorithm.",
    explanation: "Seeing the stack change step by step helps understanding.",
    hint: "Learning aid.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "How many steps are there in a typical trace?",
    shortAnswer: "It depends on the length of the expression.",
    explanation: "Each token plus the reversal steps.",
    hint: "Variable.",
    level: "basic",
    codeExample: "Not applicable"
  },
];

export default questions;