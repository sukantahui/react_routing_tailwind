const topic7_questions = [
  {
    "question": "Why does Joshua Bloch recommend Copy Constructors over java.lang.Cloneable for implementing the Prototype pattern?",
    "shortAnswer": "Because Cloneable has a broken contract that bypasses constructors, doesn't work well with final fields, throws checked CloneNotSupportedException, and requires unsafe type casting, whereas copy constructors are clean, type-safe, and obey standard Java object creation rules.",
    "explanation": "Item 13 in Effective Java.",
    "hint": "Copy constructors are type-safe and do not bypass normal object construction.",
    "level": "Intermediate",
    "codeExample": "public Course(Course original) { this.title = original.title; }"
  },
  {
    "question": "What is the difference between a Shallow Copy and a Deep Copy when cloning a Prototype?",
    "shortAnswer": "A Shallow Copy duplicates the top-level object but shares references to inner nested objects. A Deep Copy recursively duplicates all referenced nested objects, creating completely independent object graphs.",
    "explanation": "Crucial for preventing mutation side-effects across prototypes.",
    "hint": "Shallow copy copies references; deep copy duplicates the entire object tree.",
    "level": "Beginner",
    "codeExample": "Deep copy duplicates nested collections and mutable references."
  }
];

export default topic7_questions;
