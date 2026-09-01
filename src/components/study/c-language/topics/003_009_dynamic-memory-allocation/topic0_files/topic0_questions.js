const questions = [
  {
    question: "What is the difference between malloc() and calloc() in C?",
    shortAnswer: "malloc() allocates uninitialized memory; calloc() allocates zero-initialized memory.",
    explanation: "malloc(size) takes total bytes and leaves memory contents dirty. calloc(num, size) clears all bytes to zero.",
    hint: "calloc clears memory to zero.",
    level: "intermediate"
  }
];

export default questions;
