const topic8_questions = [
  {
    question: "Can an abstract class declare instance variables with various access modifiers (private, protected, public)?",
    shortAnswer: "Yes! Unlike interfaces (where variables are strictly 'public static final' constants), abstract classes can declare mutable instance variables of any access modifier and data type.",
    explanation: "This allows abstract classes to encapsulate mutable state alongside abstract behaviors.",
    hint: "Abstract classes can hold mutable instance variables with any access modifier.",
    level: "Beginner",
    codeExample: "abstract class Bank { protected double balance; private String pin; }"
  }
];

export default topic8_questions;