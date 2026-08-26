const topic7_questions = [
  {
    question: "Which wrapper classes in Java DO NOT have any caching mechanism, and why?",
    shortAnswer: "'Float' and 'Double' do not have any caching pools. Because there are infinite floating-point decimal values between any two numbers (e.g. between 0.0 and 1.0), maintaining a cache would be computationally impossible and waste memory.",
    explanation: "Byte, Short, Integer, Long, Character, and Boolean all support caching.",
    hint: "Float and Double do not cache values due to infinite decimal fractions.",
    level: "Intermediate",
    codeExample: "Double d1 = 1.0, d2 = 1.0; // (d1 == d2) is ALWAYS false!"
  }
];

export default topic7_questions;