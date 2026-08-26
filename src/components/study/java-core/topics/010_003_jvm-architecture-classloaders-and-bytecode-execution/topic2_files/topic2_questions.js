const topic2_questions = [
  {
    "question": "What is the 4-byte magic number present at the beginning of every valid compiled Java .class file?",
    "shortAnswer": "0xCAFEBABE, used by the JVM classloader to quickly identify and verify that a file is a valid compiled Java bytecode file.",
    "explanation": "Chosen by James Gosling in the early days of Oak/Java.",
    "hint": "0xCAFEBABE",
    "level": "Beginner",
    "codeExample": "Magic bytes: 0xCA 0xFE 0xBA 0xBE"
  },
  {
    "question": "Where is class metadata stored in the JVM starting with Java 8?",
    "shortAnswer": "In Metaspace, which is allocated out of native (off-heap) process memory, replacing the older PermGen (Permanent Generation) from Java 7 and earlier.",
    "explanation": "Eliminated the frequent 'java.lang.OutOfMemoryError: PermGen space' errors.",
    "hint": "Metaspace (native memory).",
    "level": "Beginner",
    "codeExample": "JVM Option: -XX:MaxMetaspaceSize=512m"
  }
];

export default topic2_questions;
