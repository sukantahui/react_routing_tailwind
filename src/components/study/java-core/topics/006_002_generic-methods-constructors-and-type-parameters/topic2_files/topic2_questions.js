const topic2_questions = [
  {
    "question": "Why does the Java compiler mandate that generic type parameters '<T>' precede the return type in method declarations?",
    "shortAnswer": "Java compiler parses signatures strictly from left-to-right. If the return type uses 'T' (e.g. 'public T findItem()'), the compiler would fail to resolve 'T' and throw 'cannot find symbol: class T'. Declaring '<T>' immediately before the return type registers 'T' as a type variable in the compiler's symbol table before the return type is resolved.",
    "explanation": "Compiler symbol table resolution requirement.",
    "hint": "Registers the type variable in the compiler's symbol table before parsing the return type.",
    "level": "Intermediate",
    "codeExample": "public static <E> E getFirst(E[] arr) // <E> registers symbol for return type E"
  }
];

export default topic2_questions;