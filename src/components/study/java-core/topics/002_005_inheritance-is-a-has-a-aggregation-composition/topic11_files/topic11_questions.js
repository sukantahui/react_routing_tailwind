const topic11_questions = [
  {
    question: "What is Composition in Java OOP and how does it differ from Aggregation?",
    shortAnswer: "Composition is a strong HAS-A relationship where the contained object cannot exist independently of the owner; the owner strictly manages and shares its lifecycle (e.g. Car and Engine, Computer and CPU).",
    explanation: "In Composition, the component is created and destroyed with the container.",
    hint: "Strong association with shared lifecycle ownership.",
    level: "Intermediate",
    codeExample: "public Car() { this.engine = new Engine(); }"
  }
];

export default topic11_questions;