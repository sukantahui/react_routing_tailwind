const topic1_questions = [
  {
    question: "Where are static variables stored in modern Java memory (Java 8+)?",
    shortAnswer: "In the Metaspace (specifically in the Class mirror object on the Heap in modern JVMs), allocated once when the class is loaded.",
    explanation: "In Java 8+, permanent generation was replaced by native Metaspace, and static variables reside within the java.lang.Class instance.",
    hint: "Class object in Metaspace/Heap, allocated once upon class loading.",
    level: "Intermediate",
    codeExample: "public static int count = 0;"
  }
];

export default topic1_questions;