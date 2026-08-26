const topic3_questions = [
  {
    question: "What is the formula to generate a random integer between 'min' and 'max' inclusive using 'Math.random()'?",
    shortAnswer: "'(int) (Math.random() * (max - min + 1)) + min'. Alternatively, using 'java.util.Random', you can write: 'random.nextInt((max - min) + 1) + min'.",
    explanation: "Math.random() internally delegates to a singleton java.util.Random instance.",
    hint: "Formula: (int)(Math.random() * (max - min + 1)) + min.",
    level: "Beginner",
    codeExample: "int roll = (int) (Math.random() * 6) + 1; // Dice roll 1 to 6"
  }
];

export default topic3_questions;