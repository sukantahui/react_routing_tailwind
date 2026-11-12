const questions = [
  {
    "id": 1,
    "question": "What is the primary foundation of Data Types & Variables in Java?",
    "shortAnswer": "Data Types & Variables in Java: Fundamental rule #1 - 8 Primitives: byte (1B), short (2B), int (4B), long (8B), float (4B), double (8B), char (2B Unicode), boolean (1 bit logical).",
    "explanation": "In Class IX & X ICSE Java, Data Types & Variables in Java forms core syllabus knowledge. Java is a strongly typed language where every variable must be declared with a data type. The 8 primitive data types (byte, short, int, long, float, double, char, boolean) store raw binary values directly in stack memory frames. Understanding widening (implicit) and narrowing (explicit) type casting is fundamental to avoiding precision loss. Key syllabus requirement: 8 Primitives: byte (1B), short (2B), int (4B), long (8B), float (4B), double (8B), char (2B Unicode), boolean (1 bit logical). Always avoid common pitfall: Using uninitialized local variables causing compile-time error: 'variable might not have been initialized'.",
    "hint": "Recall basic Java grammar, memory rules, and ICSE Class IX/X guidelines.",
    "level": "basic",
    "options": [
      "8 Primitives: byte (1B), short (2B), int (4B), long (8B), float (4B), double (8B), char (2B Unicode), boolean (1 bit logical).",
      "Java allows uninitialized local variables to be used with automatic 0 defaults",
      "In Java, non-zero integers evaluate automatically to boolean true in if conditions",
      "The main method signature can omit static without any JVM runtime errors"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// DataTypesAndVariablesDemo.java\n// 8 Primitives: byte (1B), short (2B), int (4B), long (8B), float (4B), double (8B), char (2B Unicode), boolean (1 bit logical)."
  },
  {
    "id": 2,
    "question": "How does the Java compiler validate Data Types & Variables in Java?",
    "shortAnswer": "Data Types & Variables in Java: Fundamental rule #2 - Widening Conversion: Automatic implicit type casting from smaller to larger data types (e.g., int to double).",
    "explanation": "In Class IX & X ICSE Java, Data Types & Variables in Java forms core syllabus knowledge. Java is a strongly typed language where every variable must be declared with a data type. The 8 primitive data types (byte, short, int, long, float, double, char, boolean) store raw binary values directly in stack memory frames. Understanding widening (implicit) and narrowing (explicit) type casting is fundamental to avoiding precision loss. Key syllabus requirement: Widening Conversion: Automatic implicit type casting from smaller to larger data types (e.g., int to double). Always avoid common pitfall: Integer division truncation: 5 / 2 evaluates to 2, not 2.5, unless cast to double: (double) 5 / 2.",
    "hint": "Recall basic Java grammar, memory rules, and ICSE Class IX/X guidelines.",
    "level": "basic",
    "options": [
      "Widening Conversion: Automatic implicit type casting from smaller to larger data types (e.g., int to double).",
      "Java allows uninitialized local variables to be used with automatic 0 defaults",
      "In Java, non-zero integers evaluate automatically to boolean true in if conditions",
      "The main method signature can omit static without any JVM runtime errors"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// DataTypesAndVariablesDemo.java\n// Widening Conversion: Automatic implicit type casting from smaller to larger data types (e.g., int to double)."
  },
  {
    "id": 3,
    "question": "What is the memory representation associated with Data Types & Variables in Java?",
    "shortAnswer": "Data Types & Variables in Java: Fundamental rule #3 - Narrowing Conversion: Explicit type casting required with cast operator: (int) 5.99 truncates to 5.",
    "explanation": "In Class IX & X ICSE Java, Data Types & Variables in Java forms core syllabus knowledge. Java is a strongly typed language where every variable must be declared with a data type. The 8 primitive data types (byte, short, int, long, float, double, char, boolean) store raw binary values directly in stack memory frames. Understanding widening (implicit) and narrowing (explicit) type casting is fundamental to avoiding precision loss. Key syllabus requirement: Narrowing Conversion: Explicit type casting required with cast operator: (int) 5.99 truncates to 5. Always avoid common pitfall: Assigning double literals (5.5) to float variables without 'f' suffix (float f = 5.5f;).",
    "hint": "Recall basic Java grammar, memory rules, and ICSE Class IX/X guidelines.",
    "level": "basic",
    "options": [
      "Narrowing Conversion: Explicit type casting required with cast operator: (int) 5.99 truncates to 5.",
      "Java allows uninitialized local variables to be used with automatic 0 defaults",
      "In Java, non-zero integers evaluate automatically to boolean true in if conditions",
      "The main method signature can omit static without any JVM runtime errors"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// DataTypesAndVariablesDemo.java\n// Narrowing Conversion: Explicit type casting required with cast operator: (int) 5.99 truncates to 5."
  },
  {
    "id": 4,
    "question": "What is the difference between primitives and objects in Data Types & Variables in Java?",
    "shortAnswer": "Data Types & Variables in Java: Fundamental rule #4 - Char and ASCII/Unicode: char occupies 2 bytes (16 bits) in Java to support 65,536 Unicode characters; 'A' is 65, 'a' is 97, '0' is 48.",
    "explanation": "In Class IX & X ICSE Java, Data Types & Variables in Java forms core syllabus knowledge. Java is a strongly typed language where every variable must be declared with a data type. The 8 primitive data types (byte, short, int, long, float, double, char, boolean) store raw binary values directly in stack memory frames. Understanding widening (implicit) and narrowing (explicit) type casting is fundamental to avoiding precision loss. Key syllabus requirement: Char and ASCII/Unicode: char occupies 2 bytes (16 bits) in Java to support 65,536 Unicode characters; 'A' is 65, 'a' is 97, '0' is 48. Always avoid common pitfall: Using uninitialized local variables causing compile-time error: 'variable might not have been initialized'.",
    "hint": "Recall basic Java grammar, memory rules, and ICSE Class IX/X guidelines.",
    "level": "basic",
    "options": [
      "Char and ASCII/Unicode: char occupies 2 bytes (16 bits) in Java to support 65,536 Unicode characters; 'A' is 65, 'a' is 97, '0' is 48.",
      "Java allows uninitialized local variables to be used with automatic 0 defaults",
      "In Java, non-zero integers evaluate automatically to boolean true in if conditions",
      "The main method signature can omit static without any JVM runtime errors"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// DataTypesAndVariablesDemo.java\n// Char and ASCII/Unicode: char occupies 2 bytes (16 bits) in Java to support 65,536 Unicode characters; 'A' is 65, 'a' is 97, '0' is 48."
  },
  {
    "id": 5,
    "question": "Which common Class IX ICSE board exam mistake occurs in Data Types & Variables in Java?",
    "shortAnswer": "Data Types & Variables in Java: Fundamental rule #5 - Variable Scope: Local variables exist only within their enclosing block { } and receive NO default values.",
    "explanation": "In Class IX & X ICSE Java, Data Types & Variables in Java forms core syllabus knowledge. Java is a strongly typed language where every variable must be declared with a data type. The 8 primitive data types (byte, short, int, long, float, double, char, boolean) store raw binary values directly in stack memory frames. Understanding widening (implicit) and narrowing (explicit) type casting is fundamental to avoiding precision loss. Key syllabus requirement: Variable Scope: Local variables exist only within their enclosing block { } and receive NO default values. Always avoid common pitfall: Integer division truncation: 5 / 2 evaluates to 2, not 2.5, unless cast to double: (double) 5 / 2.",
    "hint": "Recall basic Java grammar, memory rules, and ICSE Class IX/X guidelines.",
    "level": "basic",
    "options": [
      "Variable Scope: Local variables exist only within their enclosing block { } and receive NO default values.",
      "Java allows uninitialized local variables to be used with automatic 0 defaults",
      "In Java, non-zero integers evaluate automatically to boolean true in if conditions",
      "The main method signature can omit static without any JVM runtime errors"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// DataTypesAndVariablesDemo.java\n// Variable Scope: Local variables exist only within their enclosing block { } and receive NO default values."
  },
  {
    "id": 6,
    "question": "How does type compatibility affect Data Types & Variables in Java?",
    "shortAnswer": "Data Types & Variables in Java: Fundamental rule #1 - 8 Primitives: byte (1B), short (2B), int (4B), long (8B), float (4B), double (8B), char (2B Unicode), boolean (1 bit logical).",
    "explanation": "In Class IX & X ICSE Java, Data Types & Variables in Java forms core syllabus knowledge. Java is a strongly typed language where every variable must be declared with a data type. The 8 primitive data types (byte, short, int, long, float, double, char, boolean) store raw binary values directly in stack memory frames. Understanding widening (implicit) and narrowing (explicit) type casting is fundamental to avoiding precision loss. Key syllabus requirement: 8 Primitives: byte (1B), short (2B), int (4B), long (8B), float (4B), double (8B), char (2B Unicode), boolean (1 bit logical). Always avoid common pitfall: Assigning double literals (5.5) to float variables without 'f' suffix (float f = 5.5f;).",
    "hint": "Recall basic Java grammar, memory rules, and ICSE Class IX/X guidelines.",
    "level": "basic",
    "options": [
      "8 Primitives: byte (1B), short (2B), int (4B), long (8B), float (4B), double (8B), char (2B Unicode), boolean (1 bit logical).",
      "Java allows uninitialized local variables to be used with automatic 0 defaults",
      "In Java, non-zero integers evaluate automatically to boolean true in if conditions",
      "The main method signature can omit static without any JVM runtime errors"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// DataTypesAndVariablesDemo.java\n// 8 Primitives: byte (1B), short (2B), int (4B), long (8B), float (4B), double (8B), char (2B Unicode), boolean (1 bit logical)."
  },
  {
    "id": 7,
    "question": "Can negative values be processed in Data Types & Variables in Java?",
    "shortAnswer": "Data Types & Variables in Java: Fundamental rule #2 - Widening Conversion: Automatic implicit type casting from smaller to larger data types (e.g., int to double).",
    "explanation": "In Class IX & X ICSE Java, Data Types & Variables in Java forms core syllabus knowledge. Java is a strongly typed language where every variable must be declared with a data type. The 8 primitive data types (byte, short, int, long, float, double, char, boolean) store raw binary values directly in stack memory frames. Understanding widening (implicit) and narrowing (explicit) type casting is fundamental to avoiding precision loss. Key syllabus requirement: Widening Conversion: Automatic implicit type casting from smaller to larger data types (e.g., int to double). Always avoid common pitfall: Using uninitialized local variables causing compile-time error: 'variable might not have been initialized'.",
    "hint": "Recall basic Java grammar, memory rules, and ICSE Class IX/X guidelines.",
    "level": "basic",
    "options": [
      "Widening Conversion: Automatic implicit type casting from smaller to larger data types (e.g., int to double).",
      "Java allows uninitialized local variables to be used with automatic 0 defaults",
      "In Java, non-zero integers evaluate automatically to boolean true in if conditions",
      "The main method signature can omit static without any JVM runtime errors"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// DataTypesAndVariablesDemo.java\n// Widening Conversion: Automatic implicit type casting from smaller to larger data types (e.g., int to double)."
  },
  {
    "id": 8,
    "question": "How does Data Types & Variables in Java interact with Scanner keyboard input?",
    "shortAnswer": "Data Types & Variables in Java: Fundamental rule #3 - Narrowing Conversion: Explicit type casting required with cast operator: (int) 5.99 truncates to 5.",
    "explanation": "In Class IX & X ICSE Java, Data Types & Variables in Java forms core syllabus knowledge. Java is a strongly typed language where every variable must be declared with a data type. The 8 primitive data types (byte, short, int, long, float, double, char, boolean) store raw binary values directly in stack memory frames. Understanding widening (implicit) and narrowing (explicit) type casting is fundamental to avoiding precision loss. Key syllabus requirement: Narrowing Conversion: Explicit type casting required with cast operator: (int) 5.99 truncates to 5. Always avoid common pitfall: Integer division truncation: 5 / 2 evaluates to 2, not 2.5, unless cast to double: (double) 5 / 2.",
    "hint": "Recall basic Java grammar, memory rules, and ICSE Class IX/X guidelines.",
    "level": "basic",
    "options": [
      "Narrowing Conversion: Explicit type casting required with cast operator: (int) 5.99 truncates to 5.",
      "Java allows uninitialized local variables to be used with automatic 0 defaults",
      "In Java, non-zero integers evaluate automatically to boolean true in if conditions",
      "The main method signature can omit static without any JVM runtime errors"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// DataTypesAndVariablesDemo.java\n// Narrowing Conversion: Explicit type casting required with cast operator: (int) 5.99 truncates to 5."
  },
  {
    "id": 9,
    "question": "What is the role of access modifiers in Data Types & Variables in Java?",
    "shortAnswer": "Data Types & Variables in Java: Fundamental rule #4 - Char and ASCII/Unicode: char occupies 2 bytes (16 bits) in Java to support 65,536 Unicode characters; 'A' is 65, 'a' is 97, '0' is 48.",
    "explanation": "In Class IX & X ICSE Java, Data Types & Variables in Java forms core syllabus knowledge. Java is a strongly typed language where every variable must be declared with a data type. The 8 primitive data types (byte, short, int, long, float, double, char, boolean) store raw binary values directly in stack memory frames. Understanding widening (implicit) and narrowing (explicit) type casting is fundamental to avoiding precision loss. Key syllabus requirement: Char and ASCII/Unicode: char occupies 2 bytes (16 bits) in Java to support 65,536 Unicode characters; 'A' is 65, 'a' is 97, '0' is 48. Always avoid common pitfall: Assigning double literals (5.5) to float variables without 'f' suffix (float f = 5.5f;).",
    "hint": "Recall basic Java grammar, memory rules, and ICSE Class IX/X guidelines.",
    "level": "intermediate",
    "options": [
      "Char and ASCII/Unicode: char occupies 2 bytes (16 bits) in Java to support 65,536 Unicode characters; 'A' is 65, 'a' is 97, '0' is 48.",
      "Java allows uninitialized local variables to be used with automatic 0 defaults",
      "In Java, non-zero integers evaluate automatically to boolean true in if conditions",
      "The main method signature can omit static without any JVM runtime errors"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// DataTypesAndVariablesDemo.java\n// Char and ASCII/Unicode: char occupies 2 bytes (16 bits) in Java to support 65,536 Unicode characters; 'A' is 65, 'a' is 97, '0' is 48."
  },
  {
    "id": 10,
    "question": "How does stack frame allocation work for Data Types & Variables in Java?",
    "shortAnswer": "Data Types & Variables in Java: Fundamental rule #5 - Variable Scope: Local variables exist only within their enclosing block { } and receive NO default values.",
    "explanation": "In Class IX & X ICSE Java, Data Types & Variables in Java forms core syllabus knowledge. Java is a strongly typed language where every variable must be declared with a data type. The 8 primitive data types (byte, short, int, long, float, double, char, boolean) store raw binary values directly in stack memory frames. Understanding widening (implicit) and narrowing (explicit) type casting is fundamental to avoiding precision loss. Key syllabus requirement: Variable Scope: Local variables exist only within their enclosing block { } and receive NO default values. Always avoid common pitfall: Using uninitialized local variables causing compile-time error: 'variable might not have been initialized'.",
    "hint": "Recall basic Java grammar, memory rules, and ICSE Class IX/X guidelines.",
    "level": "intermediate",
    "options": [
      "Variable Scope: Local variables exist only within their enclosing block { } and receive NO default values.",
      "Java allows uninitialized local variables to be used with automatic 0 defaults",
      "In Java, non-zero integers evaluate automatically to boolean true in if conditions",
      "The main method signature can omit static without any JVM runtime errors"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// DataTypesAndVariablesDemo.java\n// Variable Scope: Local variables exist only within their enclosing block { } and receive NO default values."
  },
  {
    "id": 11,
    "question": "What happens if syntax rules are violated in Data Types & Variables in Java?",
    "shortAnswer": "Data Types & Variables in Java: Fundamental rule #1 - 8 Primitives: byte (1B), short (2B), int (4B), long (8B), float (4B), double (8B), char (2B Unicode), boolean (1 bit logical).",
    "explanation": "In Class IX & X ICSE Java, Data Types & Variables in Java forms core syllabus knowledge. Java is a strongly typed language where every variable must be declared with a data type. The 8 primitive data types (byte, short, int, long, float, double, char, boolean) store raw binary values directly in stack memory frames. Understanding widening (implicit) and narrowing (explicit) type casting is fundamental to avoiding precision loss. Key syllabus requirement: 8 Primitives: byte (1B), short (2B), int (4B), long (8B), float (4B), double (8B), char (2B Unicode), boolean (1 bit logical). Always avoid common pitfall: Integer division truncation: 5 / 2 evaluates to 2, not 2.5, unless cast to double: (double) 5 / 2.",
    "hint": "Recall basic Java grammar, memory rules, and ICSE Class IX/X guidelines.",
    "level": "intermediate",
    "options": [
      "8 Primitives: byte (1B), short (2B), int (4B), long (8B), float (4B), double (8B), char (2B Unicode), boolean (1 bit logical).",
      "Java allows uninitialized local variables to be used with automatic 0 defaults",
      "In Java, non-zero integers evaluate automatically to boolean true in if conditions",
      "The main method signature can omit static without any JVM runtime errors"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// DataTypesAndVariablesDemo.java\n// 8 Primitives: byte (1B), short (2B), int (4B), long (8B), float (4B), double (8B), char (2B Unicode), boolean (1 bit logical)."
  },
  {
    "id": 12,
    "question": "What default values are assigned by JVM in Data Types & Variables in Java?",
    "shortAnswer": "Data Types & Variables in Java: Fundamental rule #2 - Widening Conversion: Automatic implicit type casting from smaller to larger data types (e.g., int to double).",
    "explanation": "In Class IX & X ICSE Java, Data Types & Variables in Java forms core syllabus knowledge. Java is a strongly typed language where every variable must be declared with a data type. The 8 primitive data types (byte, short, int, long, float, double, char, boolean) store raw binary values directly in stack memory frames. Understanding widening (implicit) and narrowing (explicit) type casting is fundamental to avoiding precision loss. Key syllabus requirement: Widening Conversion: Automatic implicit type casting from smaller to larger data types (e.g., int to double). Always avoid common pitfall: Assigning double literals (5.5) to float variables without 'f' suffix (float f = 5.5f;).",
    "hint": "Recall basic Java grammar, memory rules, and ICSE Class IX/X guidelines.",
    "level": "intermediate",
    "options": [
      "Widening Conversion: Automatic implicit type casting from smaller to larger data types (e.g., int to double).",
      "Java allows uninitialized local variables to be used with automatic 0 defaults",
      "In Java, non-zero integers evaluate automatically to boolean true in if conditions",
      "The main method signature can omit static without any JVM runtime errors"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// DataTypesAndVariablesDemo.java\n// Widening Conversion: Automatic implicit type casting from smaller to larger data types (e.g., int to double)."
  },
  {
    "id": 13,
    "question": "How is Data Types & Variables in Java tested visually on the BlueJ workbench?",
    "shortAnswer": "Data Types & Variables in Java: Fundamental rule #3 - Narrowing Conversion: Explicit type casting required with cast operator: (int) 5.99 truncates to 5.",
    "explanation": "In Class IX & X ICSE Java, Data Types & Variables in Java forms core syllabus knowledge. Java is a strongly typed language where every variable must be declared with a data type. The 8 primitive data types (byte, short, int, long, float, double, char, boolean) store raw binary values directly in stack memory frames. Understanding widening (implicit) and narrowing (explicit) type casting is fundamental to avoiding precision loss. Key syllabus requirement: Narrowing Conversion: Explicit type casting required with cast operator: (int) 5.99 truncates to 5. Always avoid common pitfall: Using uninitialized local variables causing compile-time error: 'variable might not have been initialized'.",
    "hint": "Recall basic Java grammar, memory rules, and ICSE Class IX/X guidelines.",
    "level": "intermediate",
    "options": [
      "Narrowing Conversion: Explicit type casting required with cast operator: (int) 5.99 truncates to 5.",
      "Java allows uninitialized local variables to be used with automatic 0 defaults",
      "In Java, non-zero integers evaluate automatically to boolean true in if conditions",
      "The main method signature can omit static without any JVM runtime errors"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// DataTypesAndVariablesDemo.java\n// Narrowing Conversion: Explicit type casting required with cast operator: (int) 5.99 truncates to 5."
  },
  {
    "id": 14,
    "question": "What is the difference between declaration and definition in Data Types & Variables in Java?",
    "shortAnswer": "Data Types & Variables in Java: Fundamental rule #4 - Char and ASCII/Unicode: char occupies 2 bytes (16 bits) in Java to support 65,536 Unicode characters; 'A' is 65, 'a' is 97, '0' is 48.",
    "explanation": "In Class IX & X ICSE Java, Data Types & Variables in Java forms core syllabus knowledge. Java is a strongly typed language where every variable must be declared with a data type. The 8 primitive data types (byte, short, int, long, float, double, char, boolean) store raw binary values directly in stack memory frames. Understanding widening (implicit) and narrowing (explicit) type casting is fundamental to avoiding precision loss. Key syllabus requirement: Char and ASCII/Unicode: char occupies 2 bytes (16 bits) in Java to support 65,536 Unicode characters; 'A' is 65, 'a' is 97, '0' is 48. Always avoid common pitfall: Integer division truncation: 5 / 2 evaluates to 2, not 2.5, unless cast to double: (double) 5 / 2.",
    "hint": "Recall basic Java grammar, memory rules, and ICSE Class IX/X guidelines.",
    "level": "intermediate",
    "options": [
      "Char and ASCII/Unicode: char occupies 2 bytes (16 bits) in Java to support 65,536 Unicode characters; 'A' is 65, 'a' is 97, '0' is 48.",
      "Java allows uninitialized local variables to be used with automatic 0 defaults",
      "In Java, non-zero integers evaluate automatically to boolean true in if conditions",
      "The main method signature can omit static without any JVM runtime errors"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// DataTypesAndVariablesDemo.java\n// Char and ASCII/Unicode: char occupies 2 bytes (16 bits) in Java to support 65,536 Unicode characters; 'A' is 65, 'a' is 97, '0' is 48."
  },
  {
    "id": 15,
    "question": "How do logical operators evaluate expressions in Data Types & Variables in Java?",
    "shortAnswer": "Data Types & Variables in Java: Fundamental rule #5 - Variable Scope: Local variables exist only within their enclosing block { } and receive NO default values.",
    "explanation": "In Class IX & X ICSE Java, Data Types & Variables in Java forms core syllabus knowledge. Java is a strongly typed language where every variable must be declared with a data type. The 8 primitive data types (byte, short, int, long, float, double, char, boolean) store raw binary values directly in stack memory frames. Understanding widening (implicit) and narrowing (explicit) type casting is fundamental to avoiding precision loss. Key syllabus requirement: Variable Scope: Local variables exist only within their enclosing block { } and receive NO default values. Always avoid common pitfall: Assigning double literals (5.5) to float variables without 'f' suffix (float f = 5.5f;).",
    "hint": "Recall basic Java grammar, memory rules, and ICSE Class IX/X guidelines.",
    "level": "intermediate",
    "options": [
      "Variable Scope: Local variables exist only within their enclosing block { } and receive NO default values.",
      "Java allows uninitialized local variables to be used with automatic 0 defaults",
      "In Java, non-zero integers evaluate automatically to boolean true in if conditions",
      "The main method signature can omit static without any JVM runtime errors"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// DataTypesAndVariablesDemo.java\n// Variable Scope: Local variables exist only within their enclosing block { } and receive NO default values."
  },
  {
    "id": 16,
    "question": "How can loops or branching be optimized in Data Types & Variables in Java?",
    "shortAnswer": "Data Types & Variables in Java: Fundamental rule #1 - 8 Primitives: byte (1B), short (2B), int (4B), long (8B), float (4B), double (8B), char (2B Unicode), boolean (1 bit logical).",
    "explanation": "In Class IX & X ICSE Java, Data Types & Variables in Java forms core syllabus knowledge. Java is a strongly typed language where every variable must be declared with a data type. The 8 primitive data types (byte, short, int, long, float, double, char, boolean) store raw binary values directly in stack memory frames. Understanding widening (implicit) and narrowing (explicit) type casting is fundamental to avoiding precision loss. Key syllabus requirement: 8 Primitives: byte (1B), short (2B), int (4B), long (8B), float (4B), double (8B), char (2B Unicode), boolean (1 bit logical). Always avoid common pitfall: Using uninitialized local variables causing compile-time error: 'variable might not have been initialized'.",
    "hint": "Recall basic Java grammar, memory rules, and ICSE Class IX/X guidelines.",
    "level": "intermediate",
    "options": [
      "8 Primitives: byte (1B), short (2B), int (4B), long (8B), float (4B), double (8B), char (2B Unicode), boolean (1 bit logical).",
      "Java allows uninitialized local variables to be used with automatic 0 defaults",
      "In Java, non-zero integers evaluate automatically to boolean true in if conditions",
      "The main method signature can omit static without any JVM runtime errors"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// DataTypesAndVariablesDemo.java\n// 8 Primitives: byte (1B), short (2B), int (4B), long (8B), float (4B), double (8B), char (2B Unicode), boolean (1 bit logical)."
  },
  {
    "id": 17,
    "question": "What runtime exceptions can be triggered during Data Types & Variables in Java?",
    "shortAnswer": "Data Types & Variables in Java: Fundamental rule #2 - Widening Conversion: Automatic implicit type casting from smaller to larger data types (e.g., int to double).",
    "explanation": "In Class IX & X ICSE Java, Data Types & Variables in Java forms core syllabus knowledge. Java is a strongly typed language where every variable must be declared with a data type. The 8 primitive data types (byte, short, int, long, float, double, char, boolean) store raw binary values directly in stack memory frames. Understanding widening (implicit) and narrowing (explicit) type casting is fundamental to avoiding precision loss. Key syllabus requirement: Widening Conversion: Automatic implicit type casting from smaller to larger data types (e.g., int to double). Always avoid common pitfall: Integer division truncation: 5 / 2 evaluates to 2, not 2.5, unless cast to double: (double) 5 / 2.",
    "hint": "Recall basic Java grammar, memory rules, and ICSE Class IX/X guidelines.",
    "level": "intermediate",
    "options": [
      "Widening Conversion: Automatic implicit type casting from smaller to larger data types (e.g., int to double).",
      "Java allows uninitialized local variables to be used with automatic 0 defaults",
      "In Java, non-zero integers evaluate automatically to boolean true in if conditions",
      "The main method signature can omit static without any JVM runtime errors"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// DataTypesAndVariablesDemo.java\n// Widening Conversion: Automatic implicit type casting from smaller to larger data types (e.g., int to double)."
  },
  {
    "id": 18,
    "question": "How do you write a Variable Description Table (VDT) for Data Types & Variables in Java?",
    "shortAnswer": "Data Types & Variables in Java: Fundamental rule #3 - Narrowing Conversion: Explicit type casting required with cast operator: (int) 5.99 truncates to 5.",
    "explanation": "In Class IX & X ICSE Java, Data Types & Variables in Java forms core syllabus knowledge. Java is a strongly typed language where every variable must be declared with a data type. The 8 primitive data types (byte, short, int, long, float, double, char, boolean) store raw binary values directly in stack memory frames. Understanding widening (implicit) and narrowing (explicit) type casting is fundamental to avoiding precision loss. Key syllabus requirement: Narrowing Conversion: Explicit type casting required with cast operator: (int) 5.99 truncates to 5. Always avoid common pitfall: Assigning double literals (5.5) to float variables without 'f' suffix (float f = 5.5f;).",
    "hint": "Recall basic Java grammar, memory rules, and ICSE Class IX/X guidelines.",
    "level": "intermediate",
    "options": [
      "Narrowing Conversion: Explicit type casting required with cast operator: (int) 5.99 truncates to 5.",
      "Java allows uninitialized local variables to be used with automatic 0 defaults",
      "In Java, non-zero integers evaluate automatically to boolean true in if conditions",
      "The main method signature can omit static without any JVM runtime errors"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// DataTypesAndVariablesDemo.java\n// Narrowing Conversion: Explicit type casting required with cast operator: (int) 5.99 truncates to 5."
  },
  {
    "id": 19,
    "question": "What is the significance of the 'static' keyword in Data Types & Variables in Java?",
    "shortAnswer": "Data Types & Variables in Java: Fundamental rule #4 - Char and ASCII/Unicode: char occupies 2 bytes (16 bits) in Java to support 65,536 Unicode characters; 'A' is 65, 'a' is 97, '0' is 48.",
    "explanation": "In Class IX & X ICSE Java, Data Types & Variables in Java forms core syllabus knowledge. Java is a strongly typed language where every variable must be declared with a data type. The 8 primitive data types (byte, short, int, long, float, double, char, boolean) store raw binary values directly in stack memory frames. Understanding widening (implicit) and narrowing (explicit) type casting is fundamental to avoiding precision loss. Key syllabus requirement: Char and ASCII/Unicode: char occupies 2 bytes (16 bits) in Java to support 65,536 Unicode characters; 'A' is 65, 'a' is 97, '0' is 48. Always avoid common pitfall: Using uninitialized local variables causing compile-time error: 'variable might not have been initialized'.",
    "hint": "Recall basic Java grammar, memory rules, and ICSE Class IX/X guidelines.",
    "level": "advanced",
    "options": [
      "Char and ASCII/Unicode: char occupies 2 bytes (16 bits) in Java to support 65,536 Unicode characters; 'A' is 65, 'a' is 97, '0' is 48.",
      "Java allows uninitialized local variables to be used with automatic 0 defaults",
      "In Java, non-zero integers evaluate automatically to boolean true in if conditions",
      "The main method signature can omit static without any JVM runtime errors"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// DataTypesAndVariablesDemo.java\n// Char and ASCII/Unicode: char occupies 2 bytes (16 bits) in Java to support 65,536 Unicode characters; 'A' is 65, 'a' is 97, '0' is 48."
  },
  {
    "id": 20,
    "question": "How does pass-by-value operate in Data Types & Variables in Java?",
    "shortAnswer": "Data Types & Variables in Java: Fundamental rule #5 - Variable Scope: Local variables exist only within their enclosing block { } and receive NO default values.",
    "explanation": "In Class IX & X ICSE Java, Data Types & Variables in Java forms core syllabus knowledge. Java is a strongly typed language where every variable must be declared with a data type. The 8 primitive data types (byte, short, int, long, float, double, char, boolean) store raw binary values directly in stack memory frames. Understanding widening (implicit) and narrowing (explicit) type casting is fundamental to avoiding precision loss. Key syllabus requirement: Variable Scope: Local variables exist only within their enclosing block { } and receive NO default values. Always avoid common pitfall: Integer division truncation: 5 / 2 evaluates to 2, not 2.5, unless cast to double: (double) 5 / 2.",
    "hint": "Recall basic Java grammar, memory rules, and ICSE Class IX/X guidelines.",
    "level": "advanced",
    "options": [
      "Variable Scope: Local variables exist only within their enclosing block { } and receive NO default values.",
      "Java allows uninitialized local variables to be used with automatic 0 defaults",
      "In Java, non-zero integers evaluate automatically to boolean true in if conditions",
      "The main method signature can omit static without any JVM runtime errors"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// DataTypesAndVariablesDemo.java\n// Variable Scope: Local variables exist only within their enclosing block { } and receive NO default values."
  },
  {
    "id": 21,
    "question": "Can method overloading be applied to Data Types & Variables in Java?",
    "shortAnswer": "Data Types & Variables in Java: Fundamental rule #1 - 8 Primitives: byte (1B), short (2B), int (4B), long (8B), float (4B), double (8B), char (2B Unicode), boolean (1 bit logical).",
    "explanation": "In Class IX & X ICSE Java, Data Types & Variables in Java forms core syllabus knowledge. Java is a strongly typed language where every variable must be declared with a data type. The 8 primitive data types (byte, short, int, long, float, double, char, boolean) store raw binary values directly in stack memory frames. Understanding widening (implicit) and narrowing (explicit) type casting is fundamental to avoiding precision loss. Key syllabus requirement: 8 Primitives: byte (1B), short (2B), int (4B), long (8B), float (4B), double (8B), char (2B Unicode), boolean (1 bit logical). Always avoid common pitfall: Assigning double literals (5.5) to float variables without 'f' suffix (float f = 5.5f;).",
    "hint": "Recall basic Java grammar, memory rules, and ICSE Class IX/X guidelines.",
    "level": "advanced",
    "options": [
      "8 Primitives: byte (1B), short (2B), int (4B), long (8B), float (4B), double (8B), char (2B Unicode), boolean (1 bit logical).",
      "Java allows uninitialized local variables to be used with automatic 0 defaults",
      "In Java, non-zero integers evaluate automatically to boolean true in if conditions",
      "The main method signature can omit static without any JVM runtime errors"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// DataTypesAndVariablesDemo.java\n// 8 Primitives: byte (1B), short (2B), int (4B), long (8B), float (4B), double (8B), char (2B Unicode), boolean (1 bit logical)."
  },
  {
    "id": 22,
    "question": "What is the scope and lifetime of variables in Data Types & Variables in Java?",
    "shortAnswer": "Data Types & Variables in Java: Fundamental rule #2 - Widening Conversion: Automatic implicit type casting from smaller to larger data types (e.g., int to double).",
    "explanation": "In Class IX & X ICSE Java, Data Types & Variables in Java forms core syllabus knowledge. Java is a strongly typed language where every variable must be declared with a data type. The 8 primitive data types (byte, short, int, long, float, double, char, boolean) store raw binary values directly in stack memory frames. Understanding widening (implicit) and narrowing (explicit) type casting is fundamental to avoiding precision loss. Key syllabus requirement: Widening Conversion: Automatic implicit type casting from smaller to larger data types (e.g., int to double). Always avoid common pitfall: Using uninitialized local variables causing compile-time error: 'variable might not have been initialized'.",
    "hint": "Recall basic Java grammar, memory rules, and ICSE Class IX/X guidelines.",
    "level": "advanced",
    "options": [
      "Widening Conversion: Automatic implicit type casting from smaller to larger data types (e.g., int to double).",
      "Java allows uninitialized local variables to be used with automatic 0 defaults",
      "In Java, non-zero integers evaluate automatically to boolean true in if conditions",
      "The main method signature can omit static without any JVM runtime errors"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// DataTypesAndVariablesDemo.java\n// Widening Conversion: Automatic implicit type casting from smaller to larger data types (e.g., int to double)."
  },
  {
    "id": 23,
    "question": "Why does integer division truncate values in Data Types & Variables in Java?",
    "shortAnswer": "Data Types & Variables in Java: Fundamental rule #3 - Narrowing Conversion: Explicit type casting required with cast operator: (int) 5.99 truncates to 5.",
    "explanation": "In Class IX & X ICSE Java, Data Types & Variables in Java forms core syllabus knowledge. Java is a strongly typed language where every variable must be declared with a data type. The 8 primitive data types (byte, short, int, long, float, double, char, boolean) store raw binary values directly in stack memory frames. Understanding widening (implicit) and narrowing (explicit) type casting is fundamental to avoiding precision loss. Key syllabus requirement: Narrowing Conversion: Explicit type casting required with cast operator: (int) 5.99 truncates to 5. Always avoid common pitfall: Integer division truncation: 5 / 2 evaluates to 2, not 2.5, unless cast to double: (double) 5 / 2.",
    "hint": "Recall basic Java grammar, memory rules, and ICSE Class IX/X guidelines.",
    "level": "advanced",
    "options": [
      "Narrowing Conversion: Explicit type casting required with cast operator: (int) 5.99 truncates to 5.",
      "Java allows uninitialized local variables to be used with automatic 0 defaults",
      "In Java, non-zero integers evaluate automatically to boolean true in if conditions",
      "The main method signature can omit static without any JVM runtime errors"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// DataTypesAndVariablesDemo.java\n// Narrowing Conversion: Explicit type casting required with cast operator: (int) 5.99 truncates to 5."
  },
  {
    "id": 24,
    "question": "How do you prevent infinite execution in Data Types & Variables in Java?",
    "shortAnswer": "Data Types & Variables in Java: Fundamental rule #4 - Char and ASCII/Unicode: char occupies 2 bytes (16 bits) in Java to support 65,536 Unicode characters; 'A' is 65, 'a' is 97, '0' is 48.",
    "explanation": "In Class IX & X ICSE Java, Data Types & Variables in Java forms core syllabus knowledge. Java is a strongly typed language where every variable must be declared with a data type. The 8 primitive data types (byte, short, int, long, float, double, char, boolean) store raw binary values directly in stack memory frames. Understanding widening (implicit) and narrowing (explicit) type casting is fundamental to avoiding precision loss. Key syllabus requirement: Char and ASCII/Unicode: char occupies 2 bytes (16 bits) in Java to support 65,536 Unicode characters; 'A' is 65, 'a' is 97, '0' is 48. Always avoid common pitfall: Assigning double literals (5.5) to float variables without 'f' suffix (float f = 5.5f;).",
    "hint": "Recall basic Java grammar, memory rules, and ICSE Class IX/X guidelines.",
    "level": "advanced",
    "options": [
      "Char and ASCII/Unicode: char occupies 2 bytes (16 bits) in Java to support 65,536 Unicode characters; 'A' is 65, 'a' is 97, '0' is 48.",
      "Java allows uninitialized local variables to be used with automatic 0 defaults",
      "In Java, non-zero integers evaluate automatically to boolean true in if conditions",
      "The main method signature can omit static without any JVM runtime errors"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// DataTypesAndVariablesDemo.java\n// Char and ASCII/Unicode: char occupies 2 bytes (16 bits) in Java to support 65,536 Unicode characters; 'A' is 65, 'a' is 97, '0' is 48."
  },
  {
    "id": 25,
    "question": "What master advice does Sukanta Hui give for scoring full marks in Data Types & Variables in Java?",
    "shortAnswer": "Data Types & Variables in Java: Fundamental rule #5 - Variable Scope: Local variables exist only within their enclosing block { } and receive NO default values.",
    "explanation": "In Class IX & X ICSE Java, Data Types & Variables in Java forms core syllabus knowledge. Java is a strongly typed language where every variable must be declared with a data type. The 8 primitive data types (byte, short, int, long, float, double, char, boolean) store raw binary values directly in stack memory frames. Understanding widening (implicit) and narrowing (explicit) type casting is fundamental to avoiding precision loss. Key syllabus requirement: Variable Scope: Local variables exist only within their enclosing block { } and receive NO default values. Always avoid common pitfall: Using uninitialized local variables causing compile-time error: 'variable might not have been initialized'.",
    "hint": "Recall basic Java grammar, memory rules, and ICSE Class IX/X guidelines.",
    "level": "advanced",
    "options": [
      "Variable Scope: Local variables exist only within their enclosing block { } and receive NO default values.",
      "Java allows uninitialized local variables to be used with automatic 0 defaults",
      "In Java, non-zero integers evaluate automatically to boolean true in if conditions",
      "The main method signature can omit static without any JVM runtime errors"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// DataTypesAndVariablesDemo.java\n// Variable Scope: Local variables exist only within their enclosing block { } and receive NO default values."
  }
];

export default questions;
