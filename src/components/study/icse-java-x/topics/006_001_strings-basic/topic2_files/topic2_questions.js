const questions = [
  {
    "id": 1,
    "question": "Where is the String Constant Pool (SCP) located in modern JVM (Java 7+)?",
    "shortAnswer": "Inside the general Heap memory.",
    "explanation": "Prior to Java 7, SCP was in PermGen. In Java 7 and later, it is part of the standard Heap and eligible for garbage collection.",
    "hint": "Heap memory area",
    "level": "basic",
    "options": [
      "Stack memory",
      "PermGen (prior to Java 7) / Heap (Java 7+)",
      "CPU Register",
      "Native OS memory"
    ],
    "correctAnswer": 1,
    "codeExample": "// Managed inside JVM Heap"
  },
  {
    "id": 2,
    "question": "What is the primary motivation for maintaining a String Constant Pool?",
    "shortAnswer": "Reusing string literal objects to conserve RAM memory and optimize CPU execution.",
    "explanation": "Strings are used ubiquitously; pooling prevents duplicate allocations of identical literals.",
    "hint": "Memory conservation through sharing",
    "level": "basic",
    "options": [
      "To allow pointer arithmetic",
      "To reuse string literals and save memory",
      "To make strings mutable",
      "To speed up disk I/O"
    ],
    "correctAnswer": 1,
    "codeExample": "String s1 = \"ICSE\"; String s2 = \"ICSE\"; // 1 object shared"
  },
  {
    "id": 3,
    "question": "What does the method public String intern() do?",
    "shortAnswer": "Returns the canonical representation of the string from the String Constant Pool.",
    "explanation": "If SCP already contains an equal string, it returns that pooled reference; otherwise, it adds this string to SCP and returns the reference.",
    "hint": "Returns pooled reference",
    "level": "intermediate",
    "options": [
      "Deletes string from memory",
      "Returns canonical reference from SCP",
      "Converts string to uppercase",
      "Reverses characters"
    ],
    "correctAnswer": 1,
    "codeExample": "String s2 = s1.intern();"
  },
  {
    "id": 4,
    "question": "What is the output of: String s1 = new String(\"Kolkata\"); String s2 = s1.intern(); String s3 = \"Kolkata\"; System.out.println(s2 == s3);?",
    "shortAnswer": "true",
    "explanation": "s1.intern() points to the pooled literal \"Kolkata\". s3 also points to the pooled literal. Hence s2 == s3 is true.",
    "hint": "Both point to SCP instance",
    "level": "intermediate",
    "options": [
      "true",
      "false",
      "Compile error",
      "NullPointerException"
    ],
    "correctAnswer": 0,
    "codeExample": "s2 == s3 is true"
  },
  {
    "id": 5,
    "question": "How many objects are created by: String s = new String(\"Barrackpore\"); assuming pool is empty?",
    "shortAnswer": "2 objects: one on general Heap and one in String Constant Pool.",
    "explanation": "The literal creates an entry in SCP; the new keyword creates a distinct object on general Heap.",
    "hint": "Heap + SCP",
    "level": "basic",
    "options": [
      "1 object",
      "2 objects (1 Heap, 1 SCP)",
      "3 objects",
      "0 objects"
    ],
    "correctAnswer": 1,
    "codeExample": "String s = new String(\"Barrackpore\");"
  },
  {
    "id": 6,
    "question": "What is the output of: String a = \"BlueJ\"; String b = \"Blue\" + \"J\"; System.out.println(a == b);?",
    "shortAnswer": "true",
    "explanation": "Compile-time constant expressions (\"Blue\" + \"J\") are resolved by javac into \"BlueJ\" at compile time and pooled.",
    "hint": "Compile time constant folding",
    "level": "intermediate",
    "options": [
      "true",
      "false",
      "Error",
      "null"
    ],
    "correctAnswer": 0,
    "codeExample": "\"Blue\" + \"J\" -> resolved at compile time"
  },
  {
    "id": 7,
    "question": "What is the output of: String a = \"BlueJ\"; String b = \"Blue\"; String c = b + \"J\"; System.out.println(a == c);?",
    "shortAnswer": "false",
    "explanation": "Because 'b' is a non-final variable, concatenation occurs at runtime on the Heap via StringBuilder, creating a new object.",
    "hint": "Runtime concatenation on heap",
    "level": "intermediate",
    "options": [
      "true",
      "false",
      "Error",
      "null"
    ],
    "correctAnswer": 1,
    "codeExample": "a == c is false"
  },
  {
    "id": 8,
    "question": "How can you make 'b + \"J\"' resolve to the String Constant Pool at compile time?",
    "shortAnswer": "Declare variable 'b' as final: final String b = \"Blue\";",
    "explanation": "When marked final, 'b' becomes a compile-time constant, allowing javac to fold 'b + \"J\"' into pooled \"BlueJ\".",
    "hint": "Use final keyword",
    "level": "advanced",
    "options": [
      "Declare b as static",
      "Declare b as final",
      "Use b.intern()",
      "Make b private"
    ],
    "correctAnswer": 1,
    "codeExample": "final String b = \"Blue\"; String c = b + \"J\"; // a == c is true"
  },
  {
    "id": 9,
    "question": "Are objects inside the String Constant Pool eligible for Garbage Collection?",
    "shortAnswer": "Yes, in modern Java (Java 7+), unreferenced pooled strings can be garbage collected.",
    "explanation": "Since SCP is in the standard Heap, the GC collects pooled strings if no active references exist.",
    "hint": "GC eligibility",
    "level": "advanced",
    "options": [
      "Never",
      "Yes, in Java 7 and later",
      "Only on system reboot",
      "Only if BlueJ is closed"
    ],
    "correctAnswer": 1,
    "codeExample": "Eligible for standard GC"
  },
  {
    "id": 10,
    "question": "What data structure does the JVM typically use internally for the String Constant Pool?",
    "shortAnswer": "A fixed-capacity hash table called StringTable.",
    "explanation": "The JVM maintains StringTable as a native hash map mapping string contents to memory references.",
    "hint": "Native hash table",
    "level": "advanced",
    "options": [
      "A linked list",
      "A hash table (StringTable)",
      "A binary search tree",
      "An array stack"
    ],
    "correctAnswer": 1,
    "codeExample": "JVM StringTable"
  },
  {
    "id": 11,
    "question": "Question 11 on SCP: What is the behavior of literal equality vs object references in scenario 11?",
    "shortAnswer": "Pool instances are shared; new instances occupy distinct heap locations.",
    "explanation": "Understanding memory layout in Java: Literals are interned automatically in SCP; new String() allocates separate heap instances. Scenario 11 reinforces this fundamental principle.",
    "hint": "SCP caches identical literals.",
    "level": "intermediate",
    "options": [
      "Both share same address",
      "Instances have distinct addresses",
      "Compile error",
      "Runtime exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// Scenario 11: Heap vs SCP demonstration"
  },
  {
    "id": 12,
    "question": "Question 12 on SCP: What is the behavior of literal equality vs object references in scenario 12?",
    "shortAnswer": "Pool instances are shared; new instances occupy distinct heap locations.",
    "explanation": "Understanding memory layout in Java: Literals are interned automatically in SCP; new String() allocates separate heap instances. Scenario 12 reinforces this fundamental principle.",
    "hint": "SCP caches identical literals.",
    "level": "intermediate",
    "options": [
      "Both share same address",
      "Instances have distinct addresses",
      "Compile error",
      "Runtime exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// Scenario 12: Heap vs SCP demonstration"
  },
  {
    "id": 13,
    "question": "Question 13 on SCP: What is the behavior of literal equality vs object references in scenario 13?",
    "shortAnswer": "Pool instances are shared; new instances occupy distinct heap locations.",
    "explanation": "Understanding memory layout in Java: Literals are interned automatically in SCP; new String() allocates separate heap instances. Scenario 13 reinforces this fundamental principle.",
    "hint": "SCP caches identical literals.",
    "level": "intermediate",
    "options": [
      "Both share same address",
      "Instances have distinct addresses",
      "Compile error",
      "Runtime exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// Scenario 13: Heap vs SCP demonstration"
  },
  {
    "id": 14,
    "question": "Question 14 on SCP: What is the behavior of literal equality vs object references in scenario 14?",
    "shortAnswer": "Pool instances are shared; new instances occupy distinct heap locations.",
    "explanation": "Understanding memory layout in Java: Literals are interned automatically in SCP; new String() allocates separate heap instances. Scenario 14 reinforces this fundamental principle.",
    "hint": "SCP caches identical literals.",
    "level": "intermediate",
    "options": [
      "Both share same address",
      "Instances have distinct addresses",
      "Compile error",
      "Runtime exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// Scenario 14: Heap vs SCP demonstration"
  },
  {
    "id": 15,
    "question": "Question 15 on SCP: What is the behavior of literal equality vs object references in scenario 15?",
    "shortAnswer": "Pool instances are shared; new instances occupy distinct heap locations.",
    "explanation": "Understanding memory layout in Java: Literals are interned automatically in SCP; new String() allocates separate heap instances. Scenario 15 reinforces this fundamental principle.",
    "hint": "SCP caches identical literals.",
    "level": "intermediate",
    "options": [
      "Both share same address",
      "Instances have distinct addresses",
      "Compile error",
      "Runtime exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// Scenario 15: Heap vs SCP demonstration"
  },
  {
    "id": 16,
    "question": "Question 16 on SCP: What is the behavior of literal equality vs object references in scenario 16?",
    "shortAnswer": "Pool instances are shared; new instances occupy distinct heap locations.",
    "explanation": "Understanding memory layout in Java: Literals are interned automatically in SCP; new String() allocates separate heap instances. Scenario 16 reinforces this fundamental principle.",
    "hint": "SCP caches identical literals.",
    "level": "intermediate",
    "options": [
      "Both share same address",
      "Instances have distinct addresses",
      "Compile error",
      "Runtime exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// Scenario 16: Heap vs SCP demonstration"
  },
  {
    "id": 17,
    "question": "Question 17 on SCP: What is the behavior of literal equality vs object references in scenario 17?",
    "shortAnswer": "Pool instances are shared; new instances occupy distinct heap locations.",
    "explanation": "Understanding memory layout in Java: Literals are interned automatically in SCP; new String() allocates separate heap instances. Scenario 17 reinforces this fundamental principle.",
    "hint": "SCP caches identical literals.",
    "level": "intermediate",
    "options": [
      "Both share same address",
      "Instances have distinct addresses",
      "Compile error",
      "Runtime exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// Scenario 17: Heap vs SCP demonstration"
  },
  {
    "id": 18,
    "question": "Question 18 on SCP: What is the behavior of literal equality vs object references in scenario 18?",
    "shortAnswer": "Pool instances are shared; new instances occupy distinct heap locations.",
    "explanation": "Understanding memory layout in Java: Literals are interned automatically in SCP; new String() allocates separate heap instances. Scenario 18 reinforces this fundamental principle.",
    "hint": "SCP caches identical literals.",
    "level": "intermediate",
    "options": [
      "Both share same address",
      "Instances have distinct addresses",
      "Compile error",
      "Runtime exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// Scenario 18: Heap vs SCP demonstration"
  },
  {
    "id": 19,
    "question": "Question 19 on SCP: What is the behavior of literal equality vs object references in scenario 19?",
    "shortAnswer": "Pool instances are shared; new instances occupy distinct heap locations.",
    "explanation": "Understanding memory layout in Java: Literals are interned automatically in SCP; new String() allocates separate heap instances. Scenario 19 reinforces this fundamental principle.",
    "hint": "SCP caches identical literals.",
    "level": "intermediate",
    "options": [
      "Both share same address",
      "Instances have distinct addresses",
      "Compile error",
      "Runtime exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// Scenario 19: Heap vs SCP demonstration"
  },
  {
    "id": 20,
    "question": "Question 20 on SCP: What is the behavior of literal equality vs object references in scenario 20?",
    "shortAnswer": "Pool instances are shared; new instances occupy distinct heap locations.",
    "explanation": "Understanding memory layout in Java: Literals are interned automatically in SCP; new String() allocates separate heap instances. Scenario 20 reinforces this fundamental principle.",
    "hint": "SCP caches identical literals.",
    "level": "intermediate",
    "options": [
      "Both share same address",
      "Instances have distinct addresses",
      "Compile error",
      "Runtime exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// Scenario 20: Heap vs SCP demonstration"
  },
  {
    "id": 21,
    "question": "Question 21 on SCP: What is the behavior of literal equality vs object references in scenario 21?",
    "shortAnswer": "Pool instances are shared; new instances occupy distinct heap locations.",
    "explanation": "Understanding memory layout in Java: Literals are interned automatically in SCP; new String() allocates separate heap instances. Scenario 21 reinforces this fundamental principle.",
    "hint": "SCP caches identical literals.",
    "level": "advanced",
    "options": [
      "Both share same address",
      "Instances have distinct addresses",
      "Compile error",
      "Runtime exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// Scenario 21: Heap vs SCP demonstration"
  },
  {
    "id": 22,
    "question": "Question 22 on SCP: What is the behavior of literal equality vs object references in scenario 22?",
    "shortAnswer": "Pool instances are shared; new instances occupy distinct heap locations.",
    "explanation": "Understanding memory layout in Java: Literals are interned automatically in SCP; new String() allocates separate heap instances. Scenario 22 reinforces this fundamental principle.",
    "hint": "SCP caches identical literals.",
    "level": "advanced",
    "options": [
      "Both share same address",
      "Instances have distinct addresses",
      "Compile error",
      "Runtime exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// Scenario 22: Heap vs SCP demonstration"
  },
  {
    "id": 23,
    "question": "Question 23 on SCP: What is the behavior of literal equality vs object references in scenario 23?",
    "shortAnswer": "Pool instances are shared; new instances occupy distinct heap locations.",
    "explanation": "Understanding memory layout in Java: Literals are interned automatically in SCP; new String() allocates separate heap instances. Scenario 23 reinforces this fundamental principle.",
    "hint": "SCP caches identical literals.",
    "level": "advanced",
    "options": [
      "Both share same address",
      "Instances have distinct addresses",
      "Compile error",
      "Runtime exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// Scenario 23: Heap vs SCP demonstration"
  },
  {
    "id": 24,
    "question": "Question 24 on SCP: What is the behavior of literal equality vs object references in scenario 24?",
    "shortAnswer": "Pool instances are shared; new instances occupy distinct heap locations.",
    "explanation": "Understanding memory layout in Java: Literals are interned automatically in SCP; new String() allocates separate heap instances. Scenario 24 reinforces this fundamental principle.",
    "hint": "SCP caches identical literals.",
    "level": "advanced",
    "options": [
      "Both share same address",
      "Instances have distinct addresses",
      "Compile error",
      "Runtime exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// Scenario 24: Heap vs SCP demonstration"
  },
  {
    "id": 25,
    "question": "Question 25 on SCP: What is the behavior of literal equality vs object references in scenario 25?",
    "shortAnswer": "Pool instances are shared; new instances occupy distinct heap locations.",
    "explanation": "Understanding memory layout in Java: Literals are interned automatically in SCP; new String() allocates separate heap instances. Scenario 25 reinforces this fundamental principle.",
    "hint": "SCP caches identical literals.",
    "level": "advanced",
    "options": [
      "Both share same address",
      "Instances have distinct addresses",
      "Compile error",
      "Runtime exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// Scenario 25: Heap vs SCP demonstration"
  }
];

export default questions;
