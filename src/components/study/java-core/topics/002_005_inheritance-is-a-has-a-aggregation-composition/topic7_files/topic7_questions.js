const topic7_questions = [
  {
    question: "What is the exact execution order of constructors in an inheritance hierarchy?",
    shortAnswer: "Top-down from the highest ancestor (Object) down through each intermediate class to the most derived subclass.",
    explanation: "Each child constructor delegates to its parent via 'super()' before executing its own body.",
    hint: "Top-down: Object -> GrandParent -> Parent -> Child.",
    level: "Beginner",
    codeExample: "// Execution order: GrandParent() -> Parent() -> Child()"
  }
];

export default topic7_questions;