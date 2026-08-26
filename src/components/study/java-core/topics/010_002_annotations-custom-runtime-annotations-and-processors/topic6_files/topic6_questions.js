const topic6_questions = [
  {
    "question": "If an interface is annotated with an @Inherited annotation, does a class implementing that interface inherit the annotation?",
    "shortAnswer": "No! The @Inherited meta-annotation only works for superclass-to-subclass inheritance via the 'extends' keyword. It has no effect when implementing interfaces.",
    "explanation": "Core Java language specification rule for @Inherited.",
    "hint": "No, @Inherited only applies to superclasses, not interfaces.",
    "level": "Intermediate",
    "codeExample": "@Inherited public @interface ServiceAnn {}\\ninterface I {}\\nclass C implements I {} // C does NOT have ServiceAnn"
  },
  {
    "question": "Does @Inherited cause overridden methods in a subclass to inherit annotations from the superclass method?",
    "shortAnswer": "No. @Inherited only applies to type declarations (classes). Overridden methods in subclasses do not inherit annotations from the overridden superclass method.",
    "explanation": "Method annotations must be declared explicitly on each overriding method if needed.",
    "hint": "No, @Inherited only applies to classes, not method overrides.",
    "level": "Advanced",
    "codeExample": "// Subclass method must re-declare annotations"
  }
];

export default topic6_questions;
