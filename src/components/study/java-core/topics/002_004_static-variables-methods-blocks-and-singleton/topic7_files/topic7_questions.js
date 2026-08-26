const topic7_questions = [
  {
    question: "Can static methods be overridden in Java? What is Method Hiding?",
    shortAnswer: "No! Static methods cannot be overridden. If a subclass declares a static method with the same signature, it HIDES the superclass static method. The method invoked depends strictly on the compile-time reference type, not the runtime object.",
    explanation: "Overriding requires dynamic dispatch ('invokevirtual'). Static methods use static binding ('invokestatic').",
    hint: "Static methods are hidden (compile-time binding), not overridden (runtime dispatch).",
    level: "Intermediate",
    codeExample: "Parent p = new Child(); p.staticMethod(); // Calls Parent's static method!"
  }
];

export default topic7_questions;