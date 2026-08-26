const topic9_questions = [
  {
    question: "In what order do multiple static initialization blocks execute in a Java class?",
    shortAnswer: "In the exact top-to-bottom textual order in which they appear in the source code file.",
    explanation: "The compiler combines multiple SIBs into a single '<clinit>' method in bytecode in sequential appearance order.",
    hint: "Exact top-to-bottom source code order.",
    level: "Beginner",
    codeExample: "static { /* First */ }\nstatic { /* Second */ }"
  }
];

export default topic9_questions;