const questions = [
  {
    id: 1,
    question: "What is the time complexity of enqueueing a task in a Max Heap Priority Queue?",
    options: ["O(log n)", "O(1)", "O(n)", "O(n^2)"],
    answer: "O(log n)",
    explanation: "Inserting an element appends it at index n-1 and bubbles up at most height h = log2(n) levels."
  }
];

export default questions;
