const topic4_questions = [
  {
    "question": "How do you explicitly reference an outer class instance variable when it is shadowed by an inner class member and a method parameter?",
    "shortAnswer": "Use the syntax 'OuterClassName.this.fieldName'. In Java, 'this.fieldName' refers to the inner class instance variable, whereas prefixing the outer class name ('OuterClass.this') directs the compiler to the enclosing outer instance.",
    "explanation": "Standard resolution pattern for deeply nested GUI listeners and builder classes.",
    "hint": "Use OuterClass.this.variableName to disambiguate outer instance state.",
    "level": "Intermediate",
    "codeExample": "System.out.println(OuterClass.this.centerLocation);"
  }
];

export default topic4_questions;