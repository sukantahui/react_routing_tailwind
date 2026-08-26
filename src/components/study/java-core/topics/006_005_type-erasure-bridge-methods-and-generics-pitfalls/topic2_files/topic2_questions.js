const topic2_questions = [
  {
    "question": "If type erasure erases 'List<String>.get(0)' to return 'Object', how does 'String s = list.get(0);' compile without a manual cast?",
    "shortAnswer": "The Java compiler automatically inserts a synthetic 'checkcast java/lang/String' bytecode instruction immediately after the 'invokevirtual List.get()' instruction. Because the compiler verified type safety during source compilation, this automated cast is guaranteed to succeed at runtime with zero risk of ClassCastException.",
    "explanation": "Automatic cast insertion is the second half of the type erasure transformation.",
    "hint": "The compiler automatically inserts a 'checkcast' instruction in bytecode after reading from erased Object collections.",
    "level": "Intermediate",
    "codeExample": "// Bytecode: invokevirtual List.get() -> checkcast java/lang/String"
  }
];

export default topic2_questions;