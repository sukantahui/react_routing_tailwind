const topic7_questions = [
  {
    "question": "What is 'Lexical Scoping' in Java Lambda expressions and what does the 'this' keyword reference inside a lambda?",
    "shortAnswer": "Lambda expressions are 'Lexically Scoped', meaning they do not introduce a new variable scope or shadow the enclosing class scope. Inside a lambda expression, the 'this' and 'super' keywords have the exact same meaning as in the surrounding enclosing method: they refer directly to the instance of the enclosing outer class. In contrast, inside an Anonymous Inner Class, 'this' refers to the anonymous inner class instance itself.",
    "explanation": "Core lexical scoping principles of Java 8 Lambdas (JLS §15.27.2).",
    "hint": "Lambda is lexically scoped; 'this' inside a lambda refers to the enclosing outer class instance, not the lambda.",
    "level": "Intermediate",
    "codeExample": "Runnable r = () → System.out.println(this.toString()); // Refers to outer enclosing class!"
  }
];

export default topic7_questions;