const questions = [
  {
    question: "What is the primary challenge in matrix multiplication and how is it resolved in code?",
    shortAnswer: "Ensuring column count of matrix A matches row count of matrix B before allocating triple nested loops.",
    explanation: "Multiplication requires taking dot products of rows of A with columns of B. Mismatched dimensions cause memory corruption.",
    hint: "Guard condition: c1 == r2.",
    level: "basic"
  }
];

export default questions;
