const topic11_questions = [
  {
    question: "What is a Marker (or Tagging) Interface in Java?",
    shortAnswer: "An interface that contains ZERO methods and ZERO constants (completely empty). It exists purely to deliver runtime type metadata to the JVM or frameworks (e.g. 'Cloneable', 'Serializable').",
    explanation: "Classes implement marker interfaces to 'tag' themselves as having special permissions or capabilities.",
    hint: "An empty interface (0 methods) used to tag classes for JVM / framework checks.",
    level: "Intermediate",
    codeExample: "public interface Serializable { /* empty */ }"
  }
];

export default topic11_questions;