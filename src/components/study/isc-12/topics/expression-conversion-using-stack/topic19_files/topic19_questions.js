// topic19_questions.js
// FAQs specific to the testing tool and conversion process.

const questions = [
  {
    question: "What does the 'Reverse' step in the tool show?",
    shortAnswer: "It shows the reversed infix expression.",
    explanation: "The tool reverses the input before processing, which is the first step of the algorithm.",
    hint: "It's the first transformation.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "Why does the tool swap parentheses?",
    shortAnswer: "To maintain correct grouping after reversal.",
    explanation: "Reversing inverts the nesting; swapping '(' and ')' restores the intended structure.",
    hint: "Grouping must be preserved.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What does the 'Stack' column show?",
    shortAnswer: "It shows the operators and parentheses currently waiting to be output.",
    explanation: "The stack holds tokens that are not yet ready to be placed in the output.",
    hint: "It's a temporary holding area.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "Why do we not pop operators of equal precedence in this algorithm?",
    shortAnswer: "Because prefix is right‑associative.",
    explanation: "In prefix, the rightmost operator is applied first, so equal precedence operators stay on the stack.",
    hint: "Right‑associative.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is the 'Output' column in the trace?",
    shortAnswer: "It shows the postfix‑like expression being built.",
    explanation: "This is the intermediate result before the final reverse.",
    hint: "It's not yet the prefix.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "How does the tool handle invalid expressions?",
    shortAnswer: "It displays an error message.",
    explanation: "The tool validates parentheses and character types.",
    hint: "Error handling.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "Can the tool handle multi‑character operands?",
    shortAnswer: "No, it assumes single‑character operands.",
    explanation: "The tool is designed for learning the algorithm with simple tokens.",
    hint: "Single characters only.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "What is the final result shown by the tool?",
    shortAnswer: "The final prefix expression.",
    explanation: "After reversing the intermediate output, the tool displays the correct prefix.",
    hint: "The answer.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "How can I step through the conversion?",
    shortAnswer: "Use the previous/next buttons or the slider.",
    explanation: "The tool allows you to move through each step of the trace.",
    hint: "Navigation.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "What is the purpose of this testing tool?",
    shortAnswer: "To help students visualise and understand the infix‑to‑prefix algorithm.",
    explanation: "It provides an interactive way to learn the conversion process.",
    hint: "Learning aid.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "What does the 'Token' column represent?",
    shortAnswer: "It shows the current character being processed.",
    explanation: "The token is the element from the swapped expression being examined.",
    hint: "Current input.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "How does the algorithm decide when to pop an operator?",
    shortAnswer: "When the next operator has lower precedence, or at the end of expression.",
    explanation: "Operators are popped when a lower‑precedence operator appears, or when parentheses close.",
    hint: "Precedence and parentheses.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What happens when the tool encounters a '('?",
    shortAnswer: "It pushes it onto the stack.",
    explanation: "Left parentheses are placed on the stack to mark a sub‑expression.",
    hint: "Push.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "What happens when the tool encounters a ')'?",
    shortAnswer: "It pops operators until a '(' is found, then discards the '('.",
    explanation: "This completes the sub‑expression inside the parentheses.",
    hint: "Pop until '('.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "Can I use the tool for postfix conversion too?",
    shortAnswer: "No, this tool is specifically for prefix conversion.",
    explanation: "The algorithm is tailored for prefix; postfix uses a different associativity rule.",
    hint: "Only prefix.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "What should I do if the tool shows an error?",
    shortAnswer: "Check the expression for invalid characters or mismatched parentheses.",
    explanation: "The error message indicates the issue, such as extra ')' or invalid symbol.",
    hint: "Check your input.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "How does the tool handle exponentiation `^`?",
    shortAnswer: "It treats `^` as right‑associative and does not pop equal precedence.",
    explanation: "This is consistent with the mathematical definition of exponentiation.",
    hint: "Right‑associative.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "Why is the intermediate output reversed at the end?",
    shortAnswer: "Because the modified postfix algorithm produces the reverse of the prefix.",
    explanation: "The final reverse corrects the order to match prefix notation.",
    hint: "Reverse to get prefix.",
    level: "intermediate",
    codeExample: "Not applicable"
  },
  {
    question: "What is the difference between the stack shown and a normal stack?",
    shortAnswer: "It's the same LIFO structure, but visualised for learning.",
    explanation: "The tool displays the stack contents at each step to help understand the algorithm.",
    hint: "Visual representation.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "Can I input expressions with spaces?",
    shortAnswer: "Yes, the tool ignores spaces.",
    explanation: "Spaces are not processed and are simply skipped.",
    hint: "Spaces are allowed.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "How many steps does the tool show?",
    shortAnswer: "It shows one step per token processed, plus the initial reverse/swap and final reverse.",
    explanation: "The number of steps depends on the length of the expression.",
    hint: "Varies.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "What is the role of the `isOperand` function in the tool?",
    shortAnswer: "It identifies letters and digits as operands.",
    explanation: "Operands are appended directly to the output.",
    hint: "Operand detection.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "Can I use the tool on mobile devices?",
    shortAnswer: "Yes, the layout is responsive.",
    explanation: "The tool is designed to work on both desktop and mobile screens.",
    hint: "Responsive.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "What if I enter an empty expression?",
    shortAnswer: "The tool will show an empty prefix result.",
    explanation: "It handles empty input gracefully.",
    hint: "Empty input.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "How can I reset the tool?",
    shortAnswer: "Click the 'Clear' button.",
    explanation: "This clears the input, trace, and result.",
    hint: "Clear button.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "What is the purpose of the example buttons?",
    shortAnswer: "To quickly load common expressions for testing.",
    explanation: "They help you get started without typing.",
    hint: "Quick load.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "How does the tool show the stack visually?",
    shortAnswer: "It displays the stack as a vertical list with the top at the bottom.",
    explanation: "This matches the LIFO order (last in is shown at the bottom).",
    hint: "Stack visual.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "Can I copy the prefix result?",
    shortAnswer: "Yes, you can select and copy the displayed prefix.",
    explanation: "The result is shown in a text box for easy copying.",
    hint: "Selectable text.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "Does the tool support all operators?",
    shortAnswer: "It supports +, -, *, /, and ^ (exponentiation).",
    explanation: "These are the most common operators for the algorithm.",
    hint: "Limited set.",
    level: "basic",
    codeExample: "Not applicable"
  },
  {
    question: "What should I do if I don't understand a step?",
    shortAnswer: "Refer to the algorithm explanation or ask your teacher.",
    explanation: "The tool is a learning aid; combine with theory for best results.",
    hint: "Ask for help.",
    level: "basic",
    codeExample: "Not applicable"
  }
];

export default questions;