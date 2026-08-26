const topic10_questions = [
  {
    question: "What is Aggregation in Java OOP and how is lifecycle independence defined?",
    shortAnswer: "Aggregation is a weak HAS-A relationship where the child/contained object can exist independently of the parent container object (e.g. Department and Teacher).",
    explanation: "If the parent container is deleted or garbage collected, the contained object remains alive and unaffected in memory.",
    hint: "Weak association where contained objects have independent lifecycles.",
    level: "Intermediate",
    codeExample: "// Teacher created outside Department and passed in"
  }
];

export default topic10_questions;