const questions = [
  {
    question: "What does pointer arithmetic (ptr + 1) do in C?",
    shortAnswer: "It advances the memory address by 1 unit of sizeof(*ptr) bytes.",
    explanation: "For an int pointer (4 bytes), ptr + 1 advances the memory address by 4 bytes to point to the next contiguous integer element.",
    hint: "Scaled by sizeof target data type.",
    level: "intermediate"
  }
];

export default questions;
