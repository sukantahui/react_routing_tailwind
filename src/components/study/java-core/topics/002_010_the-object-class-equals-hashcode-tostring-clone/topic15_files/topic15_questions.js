const topic15_questions = [
  {
    question: "Why do Joshua Bloch (Effective Java) and modern Java standards prefer Copy Constructors over 'Object.clone()'?",
    shortAnswer: "1. No Cloneable or CloneNotSupportedException boilerplate. 2. Fully supports 'final' fields (which clone() cannot modify). 3. Invokes real constructors rather than bypassing constructor lifecycle. 4. Allows copying across subtype interfaces.",
    explanation: "Object.clone() is widely considered one of Java's most flawed legacy designs.",
    hint: "Avoids clone boilerplate, supports final fields, and invokes regular constructors safely.",
    level: "Advanced",
    codeExample: "public MyClass(MyClass other) { this.f = other.f; }"
  }
];

export default topic15_questions;