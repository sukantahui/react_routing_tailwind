const topic2_questions = [
  {
    question: "How does Runtime Polymorphism (Dynamic Binding / Late Binding) work in Java?",
    shortAnswer: "When an overridden method is called through a superclass reference variable, the JVM resolves and invokes the method of the actual concrete object residing in Heap memory at runtime.",
    explanation: "Dynamic method dispatch uses the object's runtime virtual method table (vtable).",
    hint: "JVM resolves method execution at runtime based on the actual Heap object type.",
    level: "Beginner",
    codeExample: "Parent p = new Child(); p.show(); // Executes Child's show() at runtime"
  }
];

export default topic2_questions;