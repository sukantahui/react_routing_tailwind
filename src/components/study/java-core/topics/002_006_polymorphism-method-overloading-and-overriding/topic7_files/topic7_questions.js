const topic7_questions = [
  {
    question: "What are the rules regarding Checked Exceptions when overriding a method in Java?",
    shortAnswer: "An overriding method CANNOT throw new or broader checked exceptions than those declared in the superclass method, but it CAN throw fewer, narrower (subtypes), or no checked exceptions at all.",
    explanation: "This rule guarantees that code calling the method through a superclass reference will never encounter unexpected checked exceptions.",
    hint: "Child can throw narrower checked exceptions, fewer exceptions, or none, but never broader exceptions.",
    level: "Intermediate",
    codeExample: "// Parent: throws IOException\n// Child: throws FileNotFoundException (Valid)\n// Child: throws Exception (ILLEGAL!)"
  }
];

export default topic7_questions;