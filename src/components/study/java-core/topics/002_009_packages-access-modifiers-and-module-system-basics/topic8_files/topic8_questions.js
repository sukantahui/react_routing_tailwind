const topic8_questions = [
  {
    question: "Which access modifier allows access from a subclass located in a DIFFERENT package, but denies access to non-subclasses in that different package?",
    shortAnswer: "The 'protected' access modifier.",
    explanation: "Protected members can be inherited and accessed through inheritance in foreign packages, but cannot be accessed via direct object reference by unrelated classes in that foreign package.",
    hint: "Protected allows foreign package access through inheritance only.",
    level: "Intermediate",
    codeExample: "// Different package subclass can access: super.protectedField"
  }
];

export default topic8_questions;