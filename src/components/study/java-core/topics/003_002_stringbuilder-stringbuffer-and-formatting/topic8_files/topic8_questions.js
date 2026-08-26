const topic8_questions = [
  {
    question: "What does the comma flag do in format strings like 'String.format(\"%,d\", 1000000)'?",
    shortAnswer: "The comma flag automatically inserts locale-specific thousands-separator commas (e.g. 1,000,000) for numbers, making financial amounts and large quantities instantly human-readable.",
    explanation: "Standard for formatting banking and accounting figures in Indian Rupee ledgers.",
    hint: "Inserts thousands-separator commas for numeric values.",
    level: "Beginner",
    codeExample: "String.format(\"%,d\", 1000000); // Outputs: 1,000,000"
  }
];

export default topic8_questions;
