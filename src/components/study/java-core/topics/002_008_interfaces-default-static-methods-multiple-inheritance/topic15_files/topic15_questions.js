const topic15_questions = [
  {
    question: "How does the PaymentGateway interface enable modular enterprise banking architectures?",
    shortAnswer: "The core fee service is completely agnostic of banking SDKs (Razorpay, Stripe, Paytm). Any provider can be plugged in or swapped via configuration without touching accounting or checkout logic.",
    explanation: "Demonstrates true inversion of control and clean software boundaries.",
    hint: "Decouples checkout business logic from concrete payment provider SDKs.",
    level: "Intermediate",
    codeExample: "// PaymentService depends only on PaymentGateway interface"
  }
];

export default topic15_questions;