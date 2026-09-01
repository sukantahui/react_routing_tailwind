const questions = [
  {
    question: "What is the difference between call-by-value and call-by-reference in C?",
    shortAnswer: "Call-by-value passes a copy of the argument; call-by-reference passes memory address pointers allowing direct mutation.",
    explanation: "C strictly evaluates parameters by value. Passing pointer addresses (int *ptr) emulates call-by-reference by giving the function access to caller memory locations.",
    hint: "Use pointers (&var) to mutate caller variables.",
    level: "intermediate"
  },
  {
    question: "What does the static storage class modifier do when applied to a local variable inside a function?",
    shortAnswer: "It preserves the variable's value across multiple function calls throughout program lifetime.",
    explanation: "Unlike auto variables stored on stack frames that die upon function exit, static local variables are stored in the data segment and retain state.",
    hint: "static locals preserve state across function calls.",
    level: "intermediate"
  }
];

export default questions;
