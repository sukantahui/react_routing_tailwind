const topic7_questions = [
  {
    "question": "Why does the Java language strictly forbid 'public' or 'protected' constructors in Enums?",
    "shortAnswer": "To protect the finite set guarantee and singleton integrity of enum constants. If public constructors were permitted, external client code could invoke 'new MyEnum()' and create rogue instances at runtime, destroying compile-time type safety and reference equality guarantees.",
    "explanation": "Even if you omit the access modifier, enum constructors are always package-private/private.",
    "hint": "Prevents external code from creating new instances, preserving singleton integrity.",
    "level": "Intermediate",
    "codeExample": "// public MyEnum() {} // COMPILE ERROR: Modifier public not allowed here"
  }
];

export default topic7_questions;