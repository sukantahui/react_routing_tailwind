const topic14_questions = [
  {
    question: "What does the software design rule 'Program to an interface, not an implementation' mean?",
    shortAnswer: "It means high-level business logic should declare its dependencies as abstract interfaces rather than concrete classes, allowing implementations to be swapped, mocked, or upgraded without modifying the calling code.",
    explanation: "This is the fundamental principle behind Dependency Injection and Spring Framework.",
    hint: "Declare variables and dependencies as interface types to decouple caller from provider.",
    level: "Advanced",
    codeExample: "List<String> list = new ArrayList<>(); // Programming to interface"
  }
];

export default topic14_questions;