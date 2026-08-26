const topic10_questions = [
  {
    question: "What must happen if a subclass does NOT implement all inherited abstract methods from its parent?",
    shortAnswer: "The subclass MUST itself be declared 'abstract'. It passes down the responsibility of implementing the remaining abstract methods to its own concrete descendants.",
    explanation: "This creates multi-tiered abstract hierarchies where each level implements part of the blueprint.",
    hint: "Subclass must be marked abstract if it leaves any abstract method unimplemented.",
    level: "Intermediate",
    codeExample: "abstract class Intermediate extends Base { /* implements some methods */ }"
  }
];

export default topic10_questions;