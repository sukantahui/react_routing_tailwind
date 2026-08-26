const topic17_questions = [
  {
    question: "Why did Joshua Bloch (author of Effective Java) recommend Enum as the best way to implement a Singleton in Java?",
    shortAnswer: "Because Enum singletons provide ironclad protection against both Java Reflection instantiation attacks and Serialization/Deserialization duplicate creation, while guaranteeing thread-safety automatically.",
    explanation: "The JVM strictly forbids reflecting on enum constructors and handles enum serialization natively without creating new instances.",
    hint: "Immune to Reflection attacks and Serialization duplicate instance traps.",
    level: "Expert",
    codeExample: "public enum Singleton { INSTANCE; public void doWork() {} }"
  }
];

export default topic17_questions;