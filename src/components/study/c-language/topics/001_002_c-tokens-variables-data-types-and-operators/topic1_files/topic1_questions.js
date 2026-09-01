const questions = [
  {
    question: "How do bitwise masks set, clear, and toggle specific bits in C?",
    shortAnswer: "Set with |= (1 << n), Clear with &= ~(1 << n), Toggle with ^= (1 << n).",
    explanation: "Bitwise OR sets a bit to 1, bitwise AND with inverted mask clears a bit to 0, and bitwise XOR flips a bit.",
    hint: "OR to set, AND-NOT to clear, XOR to flip.",
    level: "intermediate"
  },
  {
    question: "What is the difference between const float PI = 3.14f and #define PI 3.14f?",
    shortAnswer: "const is a typed variable evaluated by compiler; #define is a raw preprocessor text substitution.",
    explanation: "#define macro has no scope or type checking and does not occupy memory space. const variables enforce scoping and type safety.",
    hint: "const is preferred in modern C for type safety.",
    level: "basic"
  }
];

export default questions;
