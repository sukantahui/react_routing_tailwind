const topic1_questions = [
  {
    question: "What is the behavioral difference between 'Math.ceil()', 'Math.floor()', and 'Math.round()'?",
    shortAnswer: "'Math.ceil(x)' always rounds UP towards positive infinity (ceil(4.1) -> 5.0). 'Math.floor(x)' always rounds DOWN towards negative infinity (floor(4.9) -> 4.0). 'Math.round(x)' rounds to the nearest mathematical integer (half-up: round(4.5) -> 5).",
    explanation: "ceil and floor return double; round returns int or long.",
    hint: "ceil rounds up; floor rounds down; round rounds to nearest whole number.",
    level: "Beginner",
    codeExample: "Math.ceil(4.1); // 5.0\nMath.floor(4.9); // 4.0\nMath.round(4.5); // 5"
  }
];

export default topic1_questions;