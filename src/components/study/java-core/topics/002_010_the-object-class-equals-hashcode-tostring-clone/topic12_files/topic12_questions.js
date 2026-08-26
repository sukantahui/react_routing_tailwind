const topic12_questions = [
  {
    question: "What happens if a class invokes 'super.clone()' WITHOUT implementing the 'java.lang.Cloneable' interface?",
    shortAnswer: "The JVM throws a runtime 'java.lang.CloneNotSupportedException'. 'Cloneable' is a marker interface that authorizes the native 'Object.clone()' implementation to perform field copy.",
    explanation: "You must implement Cloneable, override clone() as public, and handle the checked exception.",
    hint: "Throws CloneNotSupportedException if Cloneable marker interface is missing.",
    level: "Intermediate",
    codeExample: "class MyClass implements Cloneable { public MyClass clone() { return (MyClass) super.clone(); } }"
  }
];

export default topic12_questions;