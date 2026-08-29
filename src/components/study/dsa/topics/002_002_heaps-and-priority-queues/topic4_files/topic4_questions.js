const questions = [
  {
    id: 1,
    question: "Why is Huffman Coding known as a prefix-free encoding scheme?",
    options: [
      "No generated binary code string is a prefix of any other character's binary code string",
      "Codes start with 000",
      "Codes use 8 bits for every symbol",
      "Codes are sorted alphabetically"
    ],
    answer: "No generated binary code string is a prefix of any other character's binary code string",
    explanation: "Because symbols reside exclusively at leaf nodes of the binary tree, no symbol's code path can form a prefix of another symbol's path."
  }
];

export default questions;
