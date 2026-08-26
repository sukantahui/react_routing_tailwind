const topic5_questions = [
  {
    question: "What makes 'StringBuilder.reverse()' useful in competitive programming and interview algorithm tests?",
    shortAnswer: "It reverses the character buffer in-place with O(N) time and O(1) auxiliary space, making palindrome verification and number reversal trivial in a single method call.",
    explanation: "Reverses characters without creating intermediate object copies.",
    hint: "Performs in-place buffer reversal in O(N) time.",
    level: "Beginner",
    codeExample: "boolean isPal = s.equals(new StringBuilder(s).reverse().toString());"
  }
];

export default topic5_questions;