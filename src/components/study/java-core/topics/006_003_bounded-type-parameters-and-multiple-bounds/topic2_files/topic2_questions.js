const topic2_questions = [
  {
    "question": "Why does Java use the 'extends' keyword instead of 'implements' when bounding type parameters to interfaces (e.g. '<T extends Serializable>')?",
    "shortAnswer": "In generic type theory, 'extends' is used as a universal keyword meaning 'is-a-subtype-of', encompassing both class inheritance ('subclass extends superclass') and interface implementation ('implementing class extends interface bound'). Writing '<T implements MyInterface>' is a compilation error in Java.",
    "explanation": "Keyword economy in Java language design: 'extends' universally signifies subtyping in generics.",
    "hint": "In generics, 'extends' means 'is-a-subtype-of' for both classes and interfaces; 'implements' is illegal.",
    "level": "Beginner",
    "codeExample": "public <T extends Runnable> void runAsync(T task) // Valid (never use 'implements')"
  }
];

export default topic2_questions;