const topic14_questions = [
  {
    question: "How does Polymorphism enable extensible payment gateway architectures in enterprise banking systems?",
    shortAnswer: "The checkout service writes to an abstract 'PaymentGateway' contract. Adding new payment methods (e.g. Crypto, EMI) requires creating a new subclass without modifying a single line of existing checkout logic (Open/Closed Principle).",
    explanation: "Polymorphism cleanly isolates checkout orchestration from specific provider APIs.",
    hint: "Enables Open/Closed principle by allowing new gateways without altering checkout code.",
    level: "Intermediate",
    codeExample: "void checkout(PaymentGateway g) { g.pay(amount); }"
  }
];

export default topic14_questions;