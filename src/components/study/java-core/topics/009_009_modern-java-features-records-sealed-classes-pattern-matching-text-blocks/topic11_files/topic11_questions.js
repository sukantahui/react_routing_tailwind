const topic11_questions = [
  {
    "question": "Why is omitting the 'default' branch considered an advantage when switching over sealed hierarchies?",
    "shortAnswer": "Because omitting 'default' forces the Java compiler to verify that every permitted subclass is explicitly handled. If a new subclass is added later, the compiler immediately flags all incomplete switch sites.",
    "explanation": "A default branch would swallow the new subclass silently, leading to subtle runtime bugs.",
    "hint": "Ensures future subclasses are caught at compile time rather than swallowed by default.",
    "level": "Advanced",
    "codeExample": "switch (sealedShape) { case Circle c → ...; case Rect r → ...; } // 100% verified"
  },
  {
    "question": "Does exhaustiveness checking apply to switch statements as well as switch expressions?",
    "shortAnswer": "In Java 21+, pattern switch statements as well as switch expressions require exhaustiveness when operating on sealed types or pattern selectors.",
    "explanation": "Ensures type safety across all modern switch constructs.",
    "hint": "Yes, pattern switch statements also require exhaustiveness in Java 21.",
    "level": "Intermediate",
    "codeExample": "switch (status) { case Ok → ...; case Err → ...; }"
  }
];

export default topic11_questions;
