const topic7_questions = [
  {
    question: "Why do abstract classes have constructors if they cannot be instantiated directly with 'new'?",
    shortAnswer: "To initialize the instance variables declared in the abstract class when a concrete subclass object is instantiated via 'super(...)' constructor chaining.",
    explanation: "Subclass objects contain the fields of the abstract superclass; those fields must be properly initialized by the abstract class's constructor.",
    hint: "Initializes abstract superclass instance variables during child object creation.",
    level: "Intermediate",
    codeExample: "abstract class Parent { Parent(int id) { this.id = id; } }"
  }
];

export default topic7_questions;