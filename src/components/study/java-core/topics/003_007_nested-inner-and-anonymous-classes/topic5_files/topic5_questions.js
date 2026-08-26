const topic5_questions = [
  {
    "question": "How does a Static Nested Class differ from a Non-Static Member Inner Class in memory and reference holding?",
    "shortAnswer": "A Static Nested Class behaves like a regular top-level class packaged inside another class for namespace convenience. It does NOT hold a hidden reference to an outer instance, cannot access non-static outer fields directly, and can be instantiated directly using 'new Outer.StaticNested()'.",
    "explanation": "Favored in Effective Java (Item 24: Favor static member classes over non-static).",
    "hint": "Holds no hidden outer reference; instantiated without an outer object.",
    "level": "Beginner",
    "codeExample": "Outer.StaticNested nested = new Outer.StaticNested();"
  }
];

export default topic5_questions;