const questions = [
  {
    id: 1,
    question: "What index calculation formula is used to wrap front/rear pointers in a Circular Queue?",
    options: ["index = (index + 1) % MAX", "index = index + 1", "index = index * 2", "index = (index - 1) / 2"],
    answer: "index = (index + 1) % MAX",
    explanation: "Using modulo arithmetic `(index + 1) % MAX` wraps the index back to 0 when it reaches MAX - 1, reusing freed memory slots."
  }
];

export default questions;
