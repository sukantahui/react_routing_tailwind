const topic3_questions = [
  {
    question: "How does String Constant Pool sharing optimize memory in enterprise applications?",
    shortAnswer: "Instead of allocating thousands of separate objects for identical strings (e.g. status 'ACTIVE' or city 'Barrackpore'), the JVM creates a single instance in the SCP and points all references to it, saving immense Heap memory.",
    explanation: "This is a direct application of the Flyweight Design Pattern.",
    hint: "Reuses a single pooled instance across thousands of references (Flyweight Pattern).",
    level: "Beginner",
    codeExample: "String s1 = \"ACTIVE\"; String s2 = \"ACTIVE\"; // Shares 1 pool instance"
  }
];

export default topic3_questions;
