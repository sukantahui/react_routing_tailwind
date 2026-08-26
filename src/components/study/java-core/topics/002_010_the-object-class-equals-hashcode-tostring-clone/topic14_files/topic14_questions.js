const topic14_questions = [
  {
    question: "How do you implement a true Deep Copy using the 'clone()' method in Java?",
    shortAnswer: "1. Perform a shallow copy via 'super.clone()'. 2. Explicitly clone all nested mutable reference fields ('copy.address = this.address.clone()') before returning the copy.",
    explanation: "Ensures complete heap memory isolation between original and cloned instances.",
    hint: "Call super.clone() and then manually clone every nested mutable field.",
    level: "Intermediate",
    codeExample: "MyClass copy = (MyClass) super.clone(); copy.inner = this.inner.clone();"
  }
];

export default topic14_questions;