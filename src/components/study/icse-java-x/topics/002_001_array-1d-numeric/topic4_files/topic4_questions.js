const questions = [
  {
    "id": 1,
    "question": "What is the primary concept of Input Using Scanner for Arrays?",
    "shortAnswer": "Input Using Scanner for Arrays: Fundamental rule #1 - Import java.util.Scanner: Required to instantiate the Scanner object reading from System.in.",
    "explanation": "In ICSE Class 10 Java, Input Using Scanner for Arrays requires strict adherence to memory rules. Array size and individual element values are frequently accepted from the user via the java.util.Scanner class. A loop prompts the user and populates each sequential index from 0 to length - 1 using sc.nextInt() or sc.nextDouble(). Key requirement: Import java.util.Scanner: Required to instantiate the Scanner object reading from System.in. Always avoid common pitfall: Using '<=' instead of '<' in the input loop condition causing ArrayIndexOutOfBoundsException on last iteration.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Import java.util.Scanner: Required to instantiate the Scanner object reading from System.in.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// ArrayInputScanner.java\nint[] arr = new int[5];\n// Import java.util.Scanner: Required to instantiate the Scanner object reading from System.in."
  },
  {
    "id": 2,
    "question": "How does Java allocate memory for Input Using Scanner for Arrays?",
    "shortAnswer": "Input Using Scanner for Arrays: Fundamental rule #2 - Dynamic Size Input: Read array length 'n' first, then allocate: 'int[] arr = new int[n];'.",
    "explanation": "In ICSE Class 10 Java, Input Using Scanner for Arrays requires strict adherence to memory rules. Array size and individual element values are frequently accepted from the user via the java.util.Scanner class. A loop prompts the user and populates each sequential index from 0 to length - 1 using sc.nextInt() or sc.nextDouble(). Key requirement: Dynamic Size Input: Read array length 'n' first, then allocate: 'int[] arr = new int[n];'. Always avoid common pitfall: Entering non-numeric characters when nextInt() is expected, throwing InputMismatchException.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Dynamic Size Input: Read array length 'n' first, then allocate: 'int[] arr = new int[n];'.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// ArrayInputScanner.java\nint[] arr = new int[5];\n// Dynamic Size Input: Read array length 'n' first, then allocate: 'int[] arr = new int[n];'."
  },
  {
    "id": 3,
    "question": "What is the time complexity associated with Input Using Scanner for Arrays?",
    "shortAnswer": "Input Using Scanner for Arrays: Fundamental rule #3 - Loop Bound: Always loop from index 0 strictly less than array length (i < n).",
    "explanation": "In ICSE Class 10 Java, Input Using Scanner for Arrays requires strict adherence to memory rules. Array size and individual element values are frequently accepted from the user via the java.util.Scanner class. A loop prompts the user and populates each sequential index from 0 to length - 1 using sc.nextInt() or sc.nextDouble(). Key requirement: Loop Bound: Always loop from index 0 strictly less than array length (i < n). Always avoid common pitfall: Forgetting to clear the newline buffer with sc.nextLine() if reading strings after numbers.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Loop Bound: Always loop from index 0 strictly less than array length (i < n).",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// ArrayInputScanner.java\nint[] arr = new int[5];\n// Loop Bound: Always loop from index 0 strictly less than array length (i < n)."
  },
  {
    "id": 4,
    "question": "Which common ICSE board exam mistake occurs in Input Using Scanner for Arrays?",
    "shortAnswer": "Input Using Scanner for Arrays: Fundamental rule #4 - Scanner Methods: Use sc.nextInt() for integers, sc.nextDouble() for doubles, and sc.next() for words.",
    "explanation": "In ICSE Class 10 Java, Input Using Scanner for Arrays requires strict adherence to memory rules. Array size and individual element values are frequently accepted from the user via the java.util.Scanner class. A loop prompts the user and populates each sequential index from 0 to length - 1 using sc.nextInt() or sc.nextDouble(). Key requirement: Scanner Methods: Use sc.nextInt() for integers, sc.nextDouble() for doubles, and sc.next() for words. Always avoid common pitfall: Using '<=' instead of '<' in the input loop condition causing ArrayIndexOutOfBoundsException on last iteration.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Scanner Methods: Use sc.nextInt() for integers, sc.nextDouble() for doubles, and sc.next() for words.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// ArrayInputScanner.java\nint[] arr = new int[5];\n// Scanner Methods: Use sc.nextInt() for integers, sc.nextDouble() for doubles, and sc.next() for words."
  },
  {
    "id": 5,
    "question": "How is zero-based indexing relevant to Input Using Scanner for Arrays?",
    "shortAnswer": "Input Using Scanner for Arrays: Fundamental rule #5 - Prompt Clarity: Provide descriptive prompts so the user knows which index or value is requested.",
    "explanation": "In ICSE Class 10 Java, Input Using Scanner for Arrays requires strict adherence to memory rules. Array size and individual element values are frequently accepted from the user via the java.util.Scanner class. A loop prompts the user and populates each sequential index from 0 to length - 1 using sc.nextInt() or sc.nextDouble(). Key requirement: Prompt Clarity: Provide descriptive prompts so the user knows which index or value is requested. Always avoid common pitfall: Entering non-numeric characters when nextInt() is expected, throwing InputMismatchException.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Prompt Clarity: Provide descriptive prompts so the user knows which index or value is requested.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// ArrayInputScanner.java\nint[] arr = new int[5];\n// Prompt Clarity: Provide descriptive prompts so the user knows which index or value is requested."
  },
  {
    "id": 6,
    "question": "What exception is thrown if boundaries are violated in Input Using Scanner for Arrays?",
    "shortAnswer": "Input Using Scanner for Arrays: Fundamental rule #1 - Import java.util.Scanner: Required to instantiate the Scanner object reading from System.in.",
    "explanation": "In ICSE Class 10 Java, Input Using Scanner for Arrays requires strict adherence to memory rules. Array size and individual element values are frequently accepted from the user via the java.util.Scanner class. A loop prompts the user and populates each sequential index from 0 to length - 1 using sc.nextInt() or sc.nextDouble(). Key requirement: Import java.util.Scanner: Required to instantiate the Scanner object reading from System.in. Always avoid common pitfall: Forgetting to clear the newline buffer with sc.nextLine() if reading strings after numbers.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Import java.util.Scanner: Required to instantiate the Scanner object reading from System.in.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// ArrayInputScanner.java\nint[] arr = new int[5];\n// Import java.util.Scanner: Required to instantiate the Scanner object reading from System.in."
  },
  {
    "id": 7,
    "question": "Can negative values be used in Input Using Scanner for Arrays?",
    "shortAnswer": "Input Using Scanner for Arrays: Fundamental rule #2 - Dynamic Size Input: Read array length 'n' first, then allocate: 'int[] arr = new int[n];'.",
    "explanation": "In ICSE Class 10 Java, Input Using Scanner for Arrays requires strict adherence to memory rules. Array size and individual element values are frequently accepted from the user via the java.util.Scanner class. A loop prompts the user and populates each sequential index from 0 to length - 1 using sc.nextInt() or sc.nextDouble(). Key requirement: Dynamic Size Input: Read array length 'n' first, then allocate: 'int[] arr = new int[n];'. Always avoid common pitfall: Using '<=' instead of '<' in the input loop condition causing ArrayIndexOutOfBoundsException on last iteration.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Dynamic Size Input: Read array length 'n' first, then allocate: 'int[] arr = new int[n];'.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// ArrayInputScanner.java\nint[] arr = new int[5];\n// Dynamic Size Input: Read array length 'n' first, then allocate: 'int[] arr = new int[n];'."
  },
  {
    "id": 8,
    "question": "How does the 'new' operator interact with Input Using Scanner for Arrays?",
    "shortAnswer": "Input Using Scanner for Arrays: Fundamental rule #3 - Loop Bound: Always loop from index 0 strictly less than array length (i < n).",
    "explanation": "In ICSE Class 10 Java, Input Using Scanner for Arrays requires strict adherence to memory rules. Array size and individual element values are frequently accepted from the user via the java.util.Scanner class. A loop prompts the user and populates each sequential index from 0 to length - 1 using sc.nextInt() or sc.nextDouble(). Key requirement: Loop Bound: Always loop from index 0 strictly less than array length (i < n). Always avoid common pitfall: Entering non-numeric characters when nextInt() is expected, throwing InputMismatchException.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Loop Bound: Always loop from index 0 strictly less than array length (i < n).",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// ArrayInputScanner.java\nint[] arr = new int[5];\n// Loop Bound: Always loop from index 0 strictly less than array length (i < n)."
  },
  {
    "id": 9,
    "question": "What role does the length property play in Input Using Scanner for Arrays?",
    "shortAnswer": "Input Using Scanner for Arrays: Fundamental rule #4 - Scanner Methods: Use sc.nextInt() for integers, sc.nextDouble() for doubles, and sc.next() for words.",
    "explanation": "In ICSE Class 10 Java, Input Using Scanner for Arrays requires strict adherence to memory rules. Array size and individual element values are frequently accepted from the user via the java.util.Scanner class. A loop prompts the user and populates each sequential index from 0 to length - 1 using sc.nextInt() or sc.nextDouble(). Key requirement: Scanner Methods: Use sc.nextInt() for integers, sc.nextDouble() for doubles, and sc.next() for words. Always avoid common pitfall: Forgetting to clear the newline buffer with sc.nextLine() if reading strings after numbers.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Scanner Methods: Use sc.nextInt() for integers, sc.nextDouble() for doubles, and sc.next() for words.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// ArrayInputScanner.java\nint[] arr = new int[5];\n// Scanner Methods: Use sc.nextInt() for integers, sc.nextDouble() for doubles, and sc.next() for words."
  },
  {
    "id": 10,
    "question": "How does the stack memory differ from heap memory in Input Using Scanner for Arrays?",
    "shortAnswer": "Input Using Scanner for Arrays: Fundamental rule #5 - Prompt Clarity: Provide descriptive prompts so the user knows which index or value is requested.",
    "explanation": "In ICSE Class 10 Java, Input Using Scanner for Arrays requires strict adherence to memory rules. Array size and individual element values are frequently accepted from the user via the java.util.Scanner class. A loop prompts the user and populates each sequential index from 0 to length - 1 using sc.nextInt() or sc.nextDouble(). Key requirement: Prompt Clarity: Provide descriptive prompts so the user knows which index or value is requested. Always avoid common pitfall: Using '<=' instead of '<' in the input loop condition causing ArrayIndexOutOfBoundsException on last iteration.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Prompt Clarity: Provide descriptive prompts so the user knows which index or value is requested.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// ArrayInputScanner.java\nint[] arr = new int[5];\n// Prompt Clarity: Provide descriptive prompts so the user knows which index or value is requested."
  },
  {
    "id": 11,
    "question": "Is the size of an array fixed or dynamic in Input Using Scanner for Arrays?",
    "shortAnswer": "Input Using Scanner for Arrays: Fundamental rule #1 - Import java.util.Scanner: Required to instantiate the Scanner object reading from System.in.",
    "explanation": "In ICSE Class 10 Java, Input Using Scanner for Arrays requires strict adherence to memory rules. Array size and individual element values are frequently accepted from the user via the java.util.Scanner class. A loop prompts the user and populates each sequential index from 0 to length - 1 using sc.nextInt() or sc.nextDouble(). Key requirement: Import java.util.Scanner: Required to instantiate the Scanner object reading from System.in. Always avoid common pitfall: Entering non-numeric characters when nextInt() is expected, throwing InputMismatchException.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Import java.util.Scanner: Required to instantiate the Scanner object reading from System.in.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// ArrayInputScanner.java\nint[] arr = new int[5];\n// Import java.util.Scanner: Required to instantiate the Scanner object reading from System.in."
  },
  {
    "id": 12,
    "question": "What are the default values assigned by the JVM in Input Using Scanner for Arrays?",
    "shortAnswer": "Input Using Scanner for Arrays: Fundamental rule #2 - Dynamic Size Input: Read array length 'n' first, then allocate: 'int[] arr = new int[n];'.",
    "explanation": "In ICSE Class 10 Java, Input Using Scanner for Arrays requires strict adherence to memory rules. Array size and individual element values are frequently accepted from the user via the java.util.Scanner class. A loop prompts the user and populates each sequential index from 0 to length - 1 using sc.nextInt() or sc.nextDouble(). Key requirement: Dynamic Size Input: Read array length 'n' first, then allocate: 'int[] arr = new int[n];'. Always avoid common pitfall: Forgetting to clear the newline buffer with sc.nextLine() if reading strings after numbers.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Dynamic Size Input: Read array length 'n' first, then allocate: 'int[] arr = new int[n];'.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// ArrayInputScanner.java\nint[] arr = new int[5];\n// Dynamic Size Input: Read array length 'n' first, then allocate: 'int[] arr = new int[n];'."
  },
  {
    "id": 13,
    "question": "How does Scanner input work when dealing with Input Using Scanner for Arrays?",
    "shortAnswer": "Input Using Scanner for Arrays: Fundamental rule #3 - Loop Bound: Always loop from index 0 strictly less than array length (i < n).",
    "explanation": "In ICSE Class 10 Java, Input Using Scanner for Arrays requires strict adherence to memory rules. Array size and individual element values are frequently accepted from the user via the java.util.Scanner class. A loop prompts the user and populates each sequential index from 0 to length - 1 using sc.nextInt() or sc.nextDouble(). Key requirement: Loop Bound: Always loop from index 0 strictly less than array length (i < n). Always avoid common pitfall: Using '<=' instead of '<' in the input loop condition causing ArrayIndexOutOfBoundsException on last iteration.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Loop Bound: Always loop from index 0 strictly less than array length (i < n).",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// ArrayInputScanner.java\nint[] arr = new int[5];\n// Loop Bound: Always loop from index 0 strictly less than array length (i < n)."
  },
  {
    "id": 14,
    "question": "What is the difference between declaring and instantiating in Input Using Scanner for Arrays?",
    "shortAnswer": "Input Using Scanner for Arrays: Fundamental rule #4 - Scanner Methods: Use sc.nextInt() for integers, sc.nextDouble() for doubles, and sc.next() for words.",
    "explanation": "In ICSE Class 10 Java, Input Using Scanner for Arrays requires strict adherence to memory rules. Array size and individual element values are frequently accepted from the user via the java.util.Scanner class. A loop prompts the user and populates each sequential index from 0 to length - 1 using sc.nextInt() or sc.nextDouble(). Key requirement: Scanner Methods: Use sc.nextInt() for integers, sc.nextDouble() for doubles, and sc.next() for words. Always avoid common pitfall: Entering non-numeric characters when nextInt() is expected, throwing InputMismatchException.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Scanner Methods: Use sc.nextInt() for integers, sc.nextDouble() for doubles, and sc.next() for words.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// ArrayInputScanner.java\nint[] arr = new int[5];\n// Scanner Methods: Use sc.nextInt() for integers, sc.nextDouble() for doubles, and sc.next() for words."
  },
  {
    "id": 15,
    "question": "Can an array hold elements of different data types in Input Using Scanner for Arrays?",
    "shortAnswer": "Input Using Scanner for Arrays: Fundamental rule #5 - Prompt Clarity: Provide descriptive prompts so the user knows which index or value is requested.",
    "explanation": "In ICSE Class 10 Java, Input Using Scanner for Arrays requires strict adherence to memory rules. Array size and individual element values are frequently accepted from the user via the java.util.Scanner class. A loop prompts the user and populates each sequential index from 0 to length - 1 using sc.nextInt() or sc.nextDouble(). Key requirement: Prompt Clarity: Provide descriptive prompts so the user knows which index or value is requested. Always avoid common pitfall: Forgetting to clear the newline buffer with sc.nextLine() if reading strings after numbers.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Prompt Clarity: Provide descriptive prompts so the user knows which index or value is requested.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// ArrayInputScanner.java\nint[] arr = new int[5];\n// Prompt Clarity: Provide descriptive prompts so the user knows which index or value is requested."
  },
  {
    "id": 16,
    "question": "How do we traverse in reverse order when applying Input Using Scanner for Arrays?",
    "shortAnswer": "Input Using Scanner for Arrays: Fundamental rule #1 - Import java.util.Scanner: Required to instantiate the Scanner object reading from System.in.",
    "explanation": "In ICSE Class 10 Java, Input Using Scanner for Arrays requires strict adherence to memory rules. Array size and individual element values are frequently accepted from the user via the java.util.Scanner class. A loop prompts the user and populates each sequential index from 0 to length - 1 using sc.nextInt() or sc.nextDouble(). Key requirement: Import java.util.Scanner: Required to instantiate the Scanner object reading from System.in. Always avoid common pitfall: Using '<=' instead of '<' in the input loop condition causing ArrayIndexOutOfBoundsException on last iteration.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Import java.util.Scanner: Required to instantiate the Scanner object reading from System.in.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// ArrayInputScanner.java\nint[] arr = new int[5];\n// Import java.util.Scanner: Required to instantiate the Scanner object reading from System.in."
  },
  {
    "id": 17,
    "question": "What happens if you print an array reference directly in Input Using Scanner for Arrays?",
    "shortAnswer": "Input Using Scanner for Arrays: Fundamental rule #2 - Dynamic Size Input: Read array length 'n' first, then allocate: 'int[] arr = new int[n];'.",
    "explanation": "In ICSE Class 10 Java, Input Using Scanner for Arrays requires strict adherence to memory rules. Array size and individual element values are frequently accepted from the user via the java.util.Scanner class. A loop prompts the user and populates each sequential index from 0 to length - 1 using sc.nextInt() or sc.nextDouble(). Key requirement: Dynamic Size Input: Read array length 'n' first, then allocate: 'int[] arr = new int[n];'. Always avoid common pitfall: Entering non-numeric characters when nextInt() is expected, throwing InputMismatchException.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Dynamic Size Input: Read array length 'n' first, then allocate: 'int[] arr = new int[n];'.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// ArrayInputScanner.java\nint[] arr = new int[5];\n// Dynamic Size Input: Read array length 'n' first, then allocate: 'int[] arr = new int[n];'."
  },
  {
    "id": 18,
    "question": "How does BlueJ visualize the operations in Input Using Scanner for Arrays?",
    "shortAnswer": "Input Using Scanner for Arrays: Fundamental rule #3 - Loop Bound: Always loop from index 0 strictly less than array length (i < n).",
    "explanation": "In ICSE Class 10 Java, Input Using Scanner for Arrays requires strict adherence to memory rules. Array size and individual element values are frequently accepted from the user via the java.util.Scanner class. A loop prompts the user and populates each sequential index from 0 to length - 1 using sc.nextInt() or sc.nextDouble(). Key requirement: Loop Bound: Always loop from index 0 strictly less than array length (i < n). Always avoid common pitfall: Forgetting to clear the newline buffer with sc.nextLine() if reading strings after numbers.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Loop Bound: Always loop from index 0 strictly less than array length (i < n).",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// ArrayInputScanner.java\nint[] arr = new int[5];\n// Loop Bound: Always loop from index 0 strictly less than array length (i < n)."
  },
  {
    "id": 19,
    "question": "How do you write a Variable Description Table (VDT) entry for Input Using Scanner for Arrays?",
    "shortAnswer": "Input Using Scanner for Arrays: Fundamental rule #4 - Scanner Methods: Use sc.nextInt() for integers, sc.nextDouble() for doubles, and sc.next() for words.",
    "explanation": "In ICSE Class 10 Java, Input Using Scanner for Arrays requires strict adherence to memory rules. Array size and individual element values are frequently accepted from the user via the java.util.Scanner class. A loop prompts the user and populates each sequential index from 0 to length - 1 using sc.nextInt() or sc.nextDouble(). Key requirement: Scanner Methods: Use sc.nextInt() for integers, sc.nextDouble() for doubles, and sc.next() for words. Always avoid common pitfall: Using '<=' instead of '<' in the input loop condition causing ArrayIndexOutOfBoundsException on last iteration.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Scanner Methods: Use sc.nextInt() for integers, sc.nextDouble() for doubles, and sc.next() for words.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// ArrayInputScanner.java\nint[] arr = new int[5];\n// Scanner Methods: Use sc.nextInt() for integers, sc.nextDouble() for doubles, and sc.next() for words."
  },
  {
    "id": 20,
    "question": "What happens if the array reference is null in Input Using Scanner for Arrays?",
    "shortAnswer": "Input Using Scanner for Arrays: Fundamental rule #5 - Prompt Clarity: Provide descriptive prompts so the user knows which index or value is requested.",
    "explanation": "In ICSE Class 10 Java, Input Using Scanner for Arrays requires strict adherence to memory rules. Array size and individual element values are frequently accepted from the user via the java.util.Scanner class. A loop prompts the user and populates each sequential index from 0 to length - 1 using sc.nextInt() or sc.nextDouble(). Key requirement: Prompt Clarity: Provide descriptive prompts so the user knows which index or value is requested. Always avoid common pitfall: Entering non-numeric characters when nextInt() is expected, throwing InputMismatchException.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Prompt Clarity: Provide descriptive prompts so the user knows which index or value is requested.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// ArrayInputScanner.java\nint[] arr = new int[5];\n// Prompt Clarity: Provide descriptive prompts so the user knows which index or value is requested."
  },
  {
    "id": 21,
    "question": "How can you pass an array to a method in Input Using Scanner for Arrays?",
    "shortAnswer": "Input Using Scanner for Arrays: Fundamental rule #1 - Import java.util.Scanner: Required to instantiate the Scanner object reading from System.in.",
    "explanation": "In ICSE Class 10 Java, Input Using Scanner for Arrays requires strict adherence to memory rules. Array size and individual element values are frequently accepted from the user via the java.util.Scanner class. A loop prompts the user and populates each sequential index from 0 to length - 1 using sc.nextInt() or sc.nextDouble(). Key requirement: Import java.util.Scanner: Required to instantiate the Scanner object reading from System.in. Always avoid common pitfall: Forgetting to clear the newline buffer with sc.nextLine() if reading strings after numbers.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Import java.util.Scanner: Required to instantiate the Scanner object reading from System.in.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// ArrayInputScanner.java\nint[] arr = new int[5];\n// Import java.util.Scanner: Required to instantiate the Scanner object reading from System.in."
  },
  {
    "id": 22,
    "question": "Can an array have a length of 0 in Input Using Scanner for Arrays?",
    "shortAnswer": "Input Using Scanner for Arrays: Fundamental rule #2 - Dynamic Size Input: Read array length 'n' first, then allocate: 'int[] arr = new int[n];'.",
    "explanation": "In ICSE Class 10 Java, Input Using Scanner for Arrays requires strict adherence to memory rules. Array size and individual element values are frequently accepted from the user via the java.util.Scanner class. A loop prompts the user and populates each sequential index from 0 to length - 1 using sc.nextInt() or sc.nextDouble(). Key requirement: Dynamic Size Input: Read array length 'n' first, then allocate: 'int[] arr = new int[n];'. Always avoid common pitfall: Using '<=' instead of '<' in the input loop condition causing ArrayIndexOutOfBoundsException on last iteration.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Dynamic Size Input: Read array length 'n' first, then allocate: 'int[] arr = new int[n];'.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// ArrayInputScanner.java\nint[] arr = new int[5];\n// Dynamic Size Input: Read array length 'n' first, then allocate: 'int[] arr = new int[n];'."
  },
  {
    "id": 23,
    "question": "Why is array access O(1) constant time in Input Using Scanner for Arrays?",
    "shortAnswer": "Input Using Scanner for Arrays: Fundamental rule #3 - Loop Bound: Always loop from index 0 strictly less than array length (i < n).",
    "explanation": "In ICSE Class 10 Java, Input Using Scanner for Arrays requires strict adherence to memory rules. Array size and individual element values are frequently accepted from the user via the java.util.Scanner class. A loop prompts the user and populates each sequential index from 0 to length - 1 using sc.nextInt() or sc.nextDouble(). Key requirement: Loop Bound: Always loop from index 0 strictly less than array length (i < n). Always avoid common pitfall: Entering non-numeric characters when nextInt() is expected, throwing InputMismatchException.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Loop Bound: Always loop from index 0 strictly less than array length (i < n).",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// ArrayInputScanner.java\nint[] arr = new int[5];\n// Loop Bound: Always loop from index 0 strictly less than array length (i < n)."
  },
  {
    "id": 24,
    "question": "How do you prevent off-by-one errors in Input Using Scanner for Arrays?",
    "shortAnswer": "Input Using Scanner for Arrays: Fundamental rule #4 - Scanner Methods: Use sc.nextInt() for integers, sc.nextDouble() for doubles, and sc.next() for words.",
    "explanation": "In ICSE Class 10 Java, Input Using Scanner for Arrays requires strict adherence to memory rules. Array size and individual element values are frequently accepted from the user via the java.util.Scanner class. A loop prompts the user and populates each sequential index from 0 to length - 1 using sc.nextInt() or sc.nextDouble(). Key requirement: Scanner Methods: Use sc.nextInt() for integers, sc.nextDouble() for doubles, and sc.next() for words. Always avoid common pitfall: Forgetting to clear the newline buffer with sc.nextLine() if reading strings after numbers.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Scanner Methods: Use sc.nextInt() for integers, sc.nextDouble() for doubles, and sc.next() for words.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// ArrayInputScanner.java\nint[] arr = new int[5];\n// Scanner Methods: Use sc.nextInt() for integers, sc.nextDouble() for doubles, and sc.next() for words."
  },
  {
    "id": 25,
    "question": "What master advice does Sukanta Hui give for scoring full marks on Input Using Scanner for Arrays?",
    "shortAnswer": "Input Using Scanner for Arrays: Fundamental rule #5 - Prompt Clarity: Provide descriptive prompts so the user knows which index or value is requested.",
    "explanation": "In ICSE Class 10 Java, Input Using Scanner for Arrays requires strict adherence to memory rules. Array size and individual element values are frequently accepted from the user via the java.util.Scanner class. A loop prompts the user and populates each sequential index from 0 to length - 1 using sc.nextInt() or sc.nextDouble(). Key requirement: Prompt Clarity: Provide descriptive prompts so the user knows which index or value is requested. Always avoid common pitfall: Using '<=' instead of '<' in the input loop condition causing ArrayIndexOutOfBoundsException on last iteration.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Prompt Clarity: Provide descriptive prompts so the user knows which index or value is requested.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 4:\n// ArrayInputScanner.java\nint[] arr = new int[5];\n// Prompt Clarity: Provide descriptive prompts so the user knows which index or value is requested."
  }
];

export default questions;
