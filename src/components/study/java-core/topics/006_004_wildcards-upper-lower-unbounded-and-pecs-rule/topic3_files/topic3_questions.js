const topic3_questions = [
  {
    "question": "Why does calling 'list.add(\"hello\")' on a variable of type 'List<?>' fail compilation, while 'list.add(null)' compiles successfully?",
    "shortAnswer": "Because '?' represents an unknown type. If 'list' was passed a 'List<Integer>', adding a String would corrupt the list. Therefore, the compiler prohibits adding ANY object reference to 'List<?>'. The literal 'null' is the sole exception because 'null' represents the absence of a value and is a valid member of all reference types in Java.",
    "explanation": "Fundamental type-safety invariant of unbounded wildcards.",
    "hint": "Compiler doesn't know the exact type so it blocks all object insertions; only 'null' is permitted.",
    "level": "Intermediate",
    "codeExample": "List<?> list = new ArrayList<Integer>(); list.add(null); // OK; list.add(10); // COMPILE ERROR"
  }
];

export default topic3_questions;