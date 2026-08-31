const topic6_questions = [
  {
    "question": "What is the difference between a symbolic reference and a direct reference?",
    "shortAnswer": "A symbolic reference is a string-based name and type descriptor stored in the bytecode constant pool, while a direct reference is an actual memory address, virtual table (vtable) index, or field offset pointing to the target entity in JVM memory.",
    "explanation": "Resolution converts the former into the latter.",
    "hint": "Symbolic is text/descriptor in constant pool; direct is an actual memory pointer.",
    "level": "Intermediate",
    "codeExample": "Symbolic: #4 Methodref → Direct: Pointer to method table offset 0x7FFF"
  },
  {
    "question": "What exception occurs during Resolution if a method referenced in bytecode does not exist in the target class?",
    "shortAnswer": "java.lang.NoSuchMethodError (an unchecked IncompatibleClassChangeError thrown when binary dependencies become out of sync).",
    "explanation": "Common when deploying incompatible JAR versions to production.",
    "hint": "NoSuchMethodError",
    "level": "Beginner",
    "codeExample": "throws java.lang.NoSuchMethodError"
  }
];

export default topic6_questions;
