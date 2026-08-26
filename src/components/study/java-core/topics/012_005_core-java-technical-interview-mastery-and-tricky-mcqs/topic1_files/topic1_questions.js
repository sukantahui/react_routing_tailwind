const topic1_questions = [
  {
    "question": "Why does calling an overloaded method with null pick the String parameter over Object?",
    "shortAnswer": "According to the Java Language Specification (JLS), when multiple applicable overloaded methods exist, the compiler selects the most specific type. Since String is a subtype of Object, String is more specific.",
    "explanation": "Most Specific Method Rule in Java compiler resolution.",
    "hint": "Subtypes are more specific than supertypes.",
    "level": "Intermediate",
    "codeExample": "display(null); // Selects display(String)"
  },
  {
    "question": "What happens if a class defines display(String s) and display(Integer i) and you invoke display(null)?",
    "shortAnswer": "It results in a compile-time error: 'reference to display is ambiguous', because String and Integer are sibling classes under Object with neither being more specific than the other.",
    "explanation": "Compiler ambiguity error on sibling types.",
    "hint": "Compile error because neither String nor Integer is a subtype of the other.",
    "level": "Intermediate",
    "codeExample": "// Compile Error: Ambiguous method call"
  }
];

export default topic1_questions;
