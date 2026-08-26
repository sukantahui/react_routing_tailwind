const topic4_questions = [
  {
    question: "Why are all variables declared in an interface implicitly 'public static final'?",
    shortAnswer: "Because interfaces cannot hold instance state or be instantiated, any fields declared in an interface must belong to the interface itself as immutable, globally accessible constants.",
    explanation: "Any attempt to modify an interface field causes a compilation failure.",
    hint: "Implicitly public, static, and final constants.",
    level: "Beginner",
    codeExample: "interface MathConstants { double PI = 3.14159; }"
  }
];

export default topic4_questions;