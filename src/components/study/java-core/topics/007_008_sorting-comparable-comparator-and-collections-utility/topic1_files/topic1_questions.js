const topic1_questions = [
  {
    "question": "Where is 'Comparable<T>' located in the Java standard library, and how many abstract methods does it define?",
    "shortAnswer": "'Comparable<T>' is located in the core 'java.lang' package (meaning it is automatically imported without any import statement). It defines exactly ONE abstract method: 'public int compareTo(T o)'.",
    "explanation": "Fundamental standard library interface for natural comparison.",
    "hint": "Located in java.lang (no import needed); defines single method: int compareTo(T o).",
    "level": "Beginner",
    "codeExample": "public class Employee implements Comparable<Employee> { public int compareTo(Employee o) { ... } }"
  }
];

export default topic1_questions;