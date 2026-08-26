const topic2_questions = [
  {
    question: "Is 'this.methodName()' required when calling another instance method in the same class?",
    shortAnswer: "No, 'this.' is optional; calling 'methodName()' implicitly uses 'this.methodName()'. However, writing 'this.' adds explicit readability and clarifies instance binding.",
    explanation: "The compiler automatically inserts 'this' for unqualified instance method calls within the same class.",
    hint: "Optional, but adds clarity to show instance method invocation.",
    level: "Beginner",
    codeExample: "this.calculate(); // Identical to calculate();"
  }
];

export default topic2_questions;