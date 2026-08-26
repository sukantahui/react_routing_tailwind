const topic14_questions = [
  {
    "question": "What is the fundamental difference in how 'this' keyword behaves in an Anonymous Inner Class versus a Java 8 Lambda expression?",
    "shortAnswer": "In an Anonymous Inner Class, 'this' refers to the anonymous inner class instance itself. In a Lambda expression, 'this' is lexically scoped and refers directly to the enclosing outer class instance where the lambda was defined.",
    "explanation": "Also, lambdas are compiled via invokedynamic without creating extra .class files on disk.",
    "hint": "Anonymous 'this' refers to inner instance; lambda 'this' refers to outer enclosing instance.",
    "level": "Intermediate",
    "codeExample": "// In Lambda: this.field accesses enclosing class instance variable directly"
  }
];

export default topic14_questions;