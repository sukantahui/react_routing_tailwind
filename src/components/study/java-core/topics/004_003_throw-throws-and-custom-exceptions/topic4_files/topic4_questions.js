const topic4_questions = [
  {
    "question": "What is the core rule regarding Checked Exceptions when overriding a method in a child class in Java?",
    "shortAnswer": "The overriding child method CANNOT declare broader (superclass) or brand-new checked exceptions than those declared in the parent method signature. It may only declare: 1. The exact same checked exceptions. 2. Narrower (subclass) checked exceptions. 3. Fewer or no checked exceptions. (Unchecked RuntimeExceptions can be declared freely without restriction).",
    "explanation": "Enforces the Liskov Substitution Principle (LSP) so polymorphic callers are never surprised.",
    "hint": "Child can declare narrower or fewer checked exceptions, but NEVER broader ones.",
    "level": "Intermediate",
    "codeExample": "// Parent: void m() throws IOException\\n// Legal Child: void m() throws FileNotFoundException"
  }
];

export default topic4_questions;