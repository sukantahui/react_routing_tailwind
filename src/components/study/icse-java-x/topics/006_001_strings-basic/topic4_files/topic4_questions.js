const questions = [
  {
    "id": 1,
    "question": "Is String a primitive data type or a class in Java?",
    "shortAnswer": "String is a class in java.lang, making it a reference data type.",
    "explanation": "Primitives in Java are byte, short, int, long, float, double, char, boolean. String is an object reference type.",
    "hint": "Class in java.lang",
    "level": "basic",
    "options": [
      "Primitive data type",
      "Class / Reference data type",
      "Hardware keyword",
      "Operating system file"
    ],
    "correctAnswer": 1,
    "codeExample": "String s = \"test\";"
  },
  {
    "id": 2,
    "question": "What is the default value of a String instance variable if not explicitly initialized?",
    "shortAnswer": "null",
    "explanation": "All object reference fields default to null in Java classes.",
    "hint": "Defaults to null",
    "level": "basic",
    "options": [
      "\"\"",
      "null",
      "'\\0'",
      "0"
    ],
    "correctAnswer": 1,
    "codeExample": "String name; // defaults to null"
  },
  {
    "id": 3,
    "question": "What happens when System.out.println(s) is called on a null String?",
    "shortAnswer": "Prints the literal text \"null\" without throwing an exception.",
    "explanation": "PrintStream converts null references to the four-character string \"null\".",
    "hint": "Prints \"null\"",
    "level": "basic",
    "options": [
      "Throws NullPointerException",
      "Prints \"null\"",
      "Prints empty space",
      "Compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "String s = null; System.out.println(s); // prints null"
  },
  {
    "id": 4,
    "question": "What interfaces are implemented by java.lang.String?",
    "shortAnswer": "java.io.Serializable, Comparable<String>, CharSequence.",
    "explanation": "String implements Serializable for transmission, Comparable for sorting, and CharSequence for abstract sequence access.",
    "hint": "Interfaces implemented",
    "level": "advanced",
    "options": [
      "Cloneable only",
      "Serializable, Comparable, CharSequence",
      "Runnable, Callable",
      "List, Set"
    ],
    "correctAnswer": 1,
    "codeExample": "implements Serializable, Comparable, CharSequence"
  },
  {
    "id": 5,
    "question": "What is the return type of toString() invoked on a String object?",
    "shortAnswer": "The exact same String instance (this).",
    "explanation": "Since it is already a String, public String toString() simply returns 'this'.",
    "hint": "Returns this",
    "level": "intermediate",
    "options": [
      "A new copy",
      "The exact same reference (this)",
      "char[]",
      "int hash"
    ],
    "correctAnswer": 1,
    "codeExample": "s.toString() == s"
  },
  {
    "id": 6,
    "question": "Question 6 on String Object Behavior: How does the JVM handle object lifecycle in scenario 6?",
    "shortAnswer": "JVM manages String objects in Heap with reference counts, pool lookup, and garbage collection.",
    "explanation": "Java handles String reference semantics seamlessly. In scenario 6, understanding object lifecycle prevents memory bloat and NullPointerExceptions.",
    "hint": "Object lifecycle in Heap.",
    "level": "intermediate",
    "options": [
      "Allocated in CPU cache",
      "Managed in Heap with reference tracking",
      "Cannot be instantiated",
      "Requires manual delete"
    ],
    "correctAnswer": 1,
    "codeExample": "// String object behavior 6"
  },
  {
    "id": 7,
    "question": "Question 7 on String Object Behavior: How does the JVM handle object lifecycle in scenario 7?",
    "shortAnswer": "JVM manages String objects in Heap with reference counts, pool lookup, and garbage collection.",
    "explanation": "Java handles String reference semantics seamlessly. In scenario 7, understanding object lifecycle prevents memory bloat and NullPointerExceptions.",
    "hint": "Object lifecycle in Heap.",
    "level": "intermediate",
    "options": [
      "Allocated in CPU cache",
      "Managed in Heap with reference tracking",
      "Cannot be instantiated",
      "Requires manual delete"
    ],
    "correctAnswer": 1,
    "codeExample": "// String object behavior 7"
  },
  {
    "id": 8,
    "question": "Question 8 on String Object Behavior: How does the JVM handle object lifecycle in scenario 8?",
    "shortAnswer": "JVM manages String objects in Heap with reference counts, pool lookup, and garbage collection.",
    "explanation": "Java handles String reference semantics seamlessly. In scenario 8, understanding object lifecycle prevents memory bloat and NullPointerExceptions.",
    "hint": "Object lifecycle in Heap.",
    "level": "intermediate",
    "options": [
      "Allocated in CPU cache",
      "Managed in Heap with reference tracking",
      "Cannot be instantiated",
      "Requires manual delete"
    ],
    "correctAnswer": 1,
    "codeExample": "// String object behavior 8"
  },
  {
    "id": 9,
    "question": "Question 9 on String Object Behavior: How does the JVM handle object lifecycle in scenario 9?",
    "shortAnswer": "JVM manages String objects in Heap with reference counts, pool lookup, and garbage collection.",
    "explanation": "Java handles String reference semantics seamlessly. In scenario 9, understanding object lifecycle prevents memory bloat and NullPointerExceptions.",
    "hint": "Object lifecycle in Heap.",
    "level": "intermediate",
    "options": [
      "Allocated in CPU cache",
      "Managed in Heap with reference tracking",
      "Cannot be instantiated",
      "Requires manual delete"
    ],
    "correctAnswer": 1,
    "codeExample": "// String object behavior 9"
  },
  {
    "id": 10,
    "question": "Question 10 on String Object Behavior: How does the JVM handle object lifecycle in scenario 10?",
    "shortAnswer": "JVM manages String objects in Heap with reference counts, pool lookup, and garbage collection.",
    "explanation": "Java handles String reference semantics seamlessly. In scenario 10, understanding object lifecycle prevents memory bloat and NullPointerExceptions.",
    "hint": "Object lifecycle in Heap.",
    "level": "intermediate",
    "options": [
      "Allocated in CPU cache",
      "Managed in Heap with reference tracking",
      "Cannot be instantiated",
      "Requires manual delete"
    ],
    "correctAnswer": 1,
    "codeExample": "// String object behavior 10"
  },
  {
    "id": 11,
    "question": "Question 11 on String Object Behavior: How does the JVM handle object lifecycle in scenario 11?",
    "shortAnswer": "JVM manages String objects in Heap with reference counts, pool lookup, and garbage collection.",
    "explanation": "Java handles String reference semantics seamlessly. In scenario 11, understanding object lifecycle prevents memory bloat and NullPointerExceptions.",
    "hint": "Object lifecycle in Heap.",
    "level": "intermediate",
    "options": [
      "Allocated in CPU cache",
      "Managed in Heap with reference tracking",
      "Cannot be instantiated",
      "Requires manual delete"
    ],
    "correctAnswer": 1,
    "codeExample": "// String object behavior 11"
  },
  {
    "id": 12,
    "question": "Question 12 on String Object Behavior: How does the JVM handle object lifecycle in scenario 12?",
    "shortAnswer": "JVM manages String objects in Heap with reference counts, pool lookup, and garbage collection.",
    "explanation": "Java handles String reference semantics seamlessly. In scenario 12, understanding object lifecycle prevents memory bloat and NullPointerExceptions.",
    "hint": "Object lifecycle in Heap.",
    "level": "intermediate",
    "options": [
      "Allocated in CPU cache",
      "Managed in Heap with reference tracking",
      "Cannot be instantiated",
      "Requires manual delete"
    ],
    "correctAnswer": 1,
    "codeExample": "// String object behavior 12"
  },
  {
    "id": 13,
    "question": "Question 13 on String Object Behavior: How does the JVM handle object lifecycle in scenario 13?",
    "shortAnswer": "JVM manages String objects in Heap with reference counts, pool lookup, and garbage collection.",
    "explanation": "Java handles String reference semantics seamlessly. In scenario 13, understanding object lifecycle prevents memory bloat and NullPointerExceptions.",
    "hint": "Object lifecycle in Heap.",
    "level": "intermediate",
    "options": [
      "Allocated in CPU cache",
      "Managed in Heap with reference tracking",
      "Cannot be instantiated",
      "Requires manual delete"
    ],
    "correctAnswer": 1,
    "codeExample": "// String object behavior 13"
  },
  {
    "id": 14,
    "question": "Question 14 on String Object Behavior: How does the JVM handle object lifecycle in scenario 14?",
    "shortAnswer": "JVM manages String objects in Heap with reference counts, pool lookup, and garbage collection.",
    "explanation": "Java handles String reference semantics seamlessly. In scenario 14, understanding object lifecycle prevents memory bloat and NullPointerExceptions.",
    "hint": "Object lifecycle in Heap.",
    "level": "intermediate",
    "options": [
      "Allocated in CPU cache",
      "Managed in Heap with reference tracking",
      "Cannot be instantiated",
      "Requires manual delete"
    ],
    "correctAnswer": 1,
    "codeExample": "// String object behavior 14"
  },
  {
    "id": 15,
    "question": "Question 15 on String Object Behavior: How does the JVM handle object lifecycle in scenario 15?",
    "shortAnswer": "JVM manages String objects in Heap with reference counts, pool lookup, and garbage collection.",
    "explanation": "Java handles String reference semantics seamlessly. In scenario 15, understanding object lifecycle prevents memory bloat and NullPointerExceptions.",
    "hint": "Object lifecycle in Heap.",
    "level": "intermediate",
    "options": [
      "Allocated in CPU cache",
      "Managed in Heap with reference tracking",
      "Cannot be instantiated",
      "Requires manual delete"
    ],
    "correctAnswer": 1,
    "codeExample": "// String object behavior 15"
  },
  {
    "id": 16,
    "question": "Question 16 on String Object Behavior: How does the JVM handle object lifecycle in scenario 16?",
    "shortAnswer": "JVM manages String objects in Heap with reference counts, pool lookup, and garbage collection.",
    "explanation": "Java handles String reference semantics seamlessly. In scenario 16, understanding object lifecycle prevents memory bloat and NullPointerExceptions.",
    "hint": "Object lifecycle in Heap.",
    "level": "intermediate",
    "options": [
      "Allocated in CPU cache",
      "Managed in Heap with reference tracking",
      "Cannot be instantiated",
      "Requires manual delete"
    ],
    "correctAnswer": 1,
    "codeExample": "// String object behavior 16"
  },
  {
    "id": 17,
    "question": "Question 17 on String Object Behavior: How does the JVM handle object lifecycle in scenario 17?",
    "shortAnswer": "JVM manages String objects in Heap with reference counts, pool lookup, and garbage collection.",
    "explanation": "Java handles String reference semantics seamlessly. In scenario 17, understanding object lifecycle prevents memory bloat and NullPointerExceptions.",
    "hint": "Object lifecycle in Heap.",
    "level": "intermediate",
    "options": [
      "Allocated in CPU cache",
      "Managed in Heap with reference tracking",
      "Cannot be instantiated",
      "Requires manual delete"
    ],
    "correctAnswer": 1,
    "codeExample": "// String object behavior 17"
  },
  {
    "id": 18,
    "question": "Question 18 on String Object Behavior: How does the JVM handle object lifecycle in scenario 18?",
    "shortAnswer": "JVM manages String objects in Heap with reference counts, pool lookup, and garbage collection.",
    "explanation": "Java handles String reference semantics seamlessly. In scenario 18, understanding object lifecycle prevents memory bloat and NullPointerExceptions.",
    "hint": "Object lifecycle in Heap.",
    "level": "intermediate",
    "options": [
      "Allocated in CPU cache",
      "Managed in Heap with reference tracking",
      "Cannot be instantiated",
      "Requires manual delete"
    ],
    "correctAnswer": 1,
    "codeExample": "// String object behavior 18"
  },
  {
    "id": 19,
    "question": "Question 19 on String Object Behavior: How does the JVM handle object lifecycle in scenario 19?",
    "shortAnswer": "JVM manages String objects in Heap with reference counts, pool lookup, and garbage collection.",
    "explanation": "Java handles String reference semantics seamlessly. In scenario 19, understanding object lifecycle prevents memory bloat and NullPointerExceptions.",
    "hint": "Object lifecycle in Heap.",
    "level": "advanced",
    "options": [
      "Allocated in CPU cache",
      "Managed in Heap with reference tracking",
      "Cannot be instantiated",
      "Requires manual delete"
    ],
    "correctAnswer": 1,
    "codeExample": "// String object behavior 19"
  },
  {
    "id": 20,
    "question": "Question 20 on String Object Behavior: How does the JVM handle object lifecycle in scenario 20?",
    "shortAnswer": "JVM manages String objects in Heap with reference counts, pool lookup, and garbage collection.",
    "explanation": "Java handles String reference semantics seamlessly. In scenario 20, understanding object lifecycle prevents memory bloat and NullPointerExceptions.",
    "hint": "Object lifecycle in Heap.",
    "level": "advanced",
    "options": [
      "Allocated in CPU cache",
      "Managed in Heap with reference tracking",
      "Cannot be instantiated",
      "Requires manual delete"
    ],
    "correctAnswer": 1,
    "codeExample": "// String object behavior 20"
  },
  {
    "id": 21,
    "question": "Question 21 on String Object Behavior: How does the JVM handle object lifecycle in scenario 21?",
    "shortAnswer": "JVM manages String objects in Heap with reference counts, pool lookup, and garbage collection.",
    "explanation": "Java handles String reference semantics seamlessly. In scenario 21, understanding object lifecycle prevents memory bloat and NullPointerExceptions.",
    "hint": "Object lifecycle in Heap.",
    "level": "advanced",
    "options": [
      "Allocated in CPU cache",
      "Managed in Heap with reference tracking",
      "Cannot be instantiated",
      "Requires manual delete"
    ],
    "correctAnswer": 1,
    "codeExample": "// String object behavior 21"
  },
  {
    "id": 22,
    "question": "Question 22 on String Object Behavior: How does the JVM handle object lifecycle in scenario 22?",
    "shortAnswer": "JVM manages String objects in Heap with reference counts, pool lookup, and garbage collection.",
    "explanation": "Java handles String reference semantics seamlessly. In scenario 22, understanding object lifecycle prevents memory bloat and NullPointerExceptions.",
    "hint": "Object lifecycle in Heap.",
    "level": "advanced",
    "options": [
      "Allocated in CPU cache",
      "Managed in Heap with reference tracking",
      "Cannot be instantiated",
      "Requires manual delete"
    ],
    "correctAnswer": 1,
    "codeExample": "// String object behavior 22"
  },
  {
    "id": 23,
    "question": "Question 23 on String Object Behavior: How does the JVM handle object lifecycle in scenario 23?",
    "shortAnswer": "JVM manages String objects in Heap with reference counts, pool lookup, and garbage collection.",
    "explanation": "Java handles String reference semantics seamlessly. In scenario 23, understanding object lifecycle prevents memory bloat and NullPointerExceptions.",
    "hint": "Object lifecycle in Heap.",
    "level": "advanced",
    "options": [
      "Allocated in CPU cache",
      "Managed in Heap with reference tracking",
      "Cannot be instantiated",
      "Requires manual delete"
    ],
    "correctAnswer": 1,
    "codeExample": "// String object behavior 23"
  },
  {
    "id": 24,
    "question": "Question 24 on String Object Behavior: How does the JVM handle object lifecycle in scenario 24?",
    "shortAnswer": "JVM manages String objects in Heap with reference counts, pool lookup, and garbage collection.",
    "explanation": "Java handles String reference semantics seamlessly. In scenario 24, understanding object lifecycle prevents memory bloat and NullPointerExceptions.",
    "hint": "Object lifecycle in Heap.",
    "level": "advanced",
    "options": [
      "Allocated in CPU cache",
      "Managed in Heap with reference tracking",
      "Cannot be instantiated",
      "Requires manual delete"
    ],
    "correctAnswer": 1,
    "codeExample": "// String object behavior 24"
  },
  {
    "id": 25,
    "question": "Question 25 on String Object Behavior: How does the JVM handle object lifecycle in scenario 25?",
    "shortAnswer": "JVM manages String objects in Heap with reference counts, pool lookup, and garbage collection.",
    "explanation": "Java handles String reference semantics seamlessly. In scenario 25, understanding object lifecycle prevents memory bloat and NullPointerExceptions.",
    "hint": "Object lifecycle in Heap.",
    "level": "advanced",
    "options": [
      "Allocated in CPU cache",
      "Managed in Heap with reference tracking",
      "Cannot be instantiated",
      "Requires manual delete"
    ],
    "correctAnswer": 1,
    "codeExample": "// String object behavior 25"
  }
];

export default questions;
