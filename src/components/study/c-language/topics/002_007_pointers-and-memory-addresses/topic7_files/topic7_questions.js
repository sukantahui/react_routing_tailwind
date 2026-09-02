const questions = [
  {
    question: "Why does freeing a dynamic 2D matrix safely require passing a triple pointer (int ***pMat)?",
    shortAnswer: "Passing `&matrix` (type `int***`) allows the deallocation function to free all heap rows, free the master array, and reset the caller's pointer variable to `NULL` to eliminate dangling pointers.",
    explanation: "Ensures the caller cannot accidentally reuse a freed memory address.",
    hint: "Zero out caller's pointer via triple pointer.",
    level: "advanced"
  }
];

export default questions;
