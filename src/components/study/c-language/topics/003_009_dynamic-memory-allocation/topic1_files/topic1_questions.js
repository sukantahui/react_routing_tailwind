const questions = [
  {
    question: "How does a dynamic resizable array expand its capacity in C?",
    shortAnswer: "It doubles capacity using realloc when size reaches current capacity limit.",
    explanation: "Doubling capacity yields amortized O(1) append time complexity while minimizing reallocation overhead.",
    hint: "Amortized O(1) push back with realloc.",
    level: "advanced"
  }
];

export default questions;
