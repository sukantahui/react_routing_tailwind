const questions = [
  {
    "id": 1,
    "question": "What is the primary concept of Default Values of Numeric Arrays?",
    "shortAnswer": "Default Values of Numeric Arrays: Fundamental rule #1 - Integer Types (byte, short, int, long): Automatically initialized to 0 (or 0L).",
    "explanation": "In ICSE Class 10 Java, Default Values of Numeric Arrays requires strict adherence to memory rules. When an array is created using 'new', the JVM automatically initializes every element to a predictable default value before any user code runs. For all integer types, the default is 0; for floating-point types, 0.0. Key requirement: Integer Types (byte, short, int, long): Automatically initialized to 0 (or 0L). Always avoid common pitfall: Assuming elements contain random garbage values like in C/C++; Java guarantees clean zero initialization.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Integer Types (byte, short, int, long): Automatically initialized to 0 (or 0L).",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// DefaultValuesNumericArrays.java\nint[] arr = new int[5];\n// Integer Types (byte, short, int, long): Automatically initialized to 0 (or 0L)."
  },
  {
    "id": 2,
    "question": "How does Java allocate memory for Default Values of Numeric Arrays?",
    "shortAnswer": "Default Values of Numeric Arrays: Fundamental rule #2 - Floating-Point Types (float, double): Automatically initialized to 0.0 (or 0.0f).",
    "explanation": "In ICSE Class 10 Java, Default Values of Numeric Arrays requires strict adherence to memory rules. When an array is created using 'new', the JVM automatically initializes every element to a predictable default value before any user code runs. For all integer types, the default is 0; for floating-point types, 0.0. Key requirement: Floating-Point Types (float, double): Automatically initialized to 0.0 (or 0.0f). Always avoid common pitfall: Checking reference array elements without verifying if they are null before calling methods.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Floating-Point Types (float, double): Automatically initialized to 0.0 (or 0.0f).",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// DefaultValuesNumericArrays.java\nint[] arr = new int[5];\n// Floating-Point Types (float, double): Automatically initialized to 0.0 (or 0.0f)."
  },
  {
    "id": 3,
    "question": "What is the time complexity associated with Default Values of Numeric Arrays?",
    "shortAnswer": "Default Values of Numeric Arrays: Fundamental rule #3 - Character Type (char): Initialized to '\\u0000' (null character, decimal 0).",
    "explanation": "In ICSE Class 10 Java, Default Values of Numeric Arrays requires strict adherence to memory rules. When an array is created using 'new', the JVM automatically initializes every element to a predictable default value before any user code runs. For all integer types, the default is 0; for floating-point types, 0.0. Key requirement: Character Type (char): Initialized to '\\u0000' (null character, decimal 0). Always avoid common pitfall: Confusing char default '\\u0000' with character '0' (ASCII 48).",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Character Type (char): Initialized to '\\u0000' (null character, decimal 0).",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// DefaultValuesNumericArrays.java\nint[] arr = new int[5];\n// Character Type (char): Initialized to '\\u0000' (null character, decimal 0)."
  },
  {
    "id": 4,
    "question": "Which common ICSE board exam mistake occurs in Default Values of Numeric Arrays?",
    "shortAnswer": "Default Values of Numeric Arrays: Fundamental rule #4 - Boolean Type (boolean): Initialized to false.",
    "explanation": "In ICSE Class 10 Java, Default Values of Numeric Arrays requires strict adherence to memory rules. When an array is created using 'new', the JVM automatically initializes every element to a predictable default value before any user code runs. For all integer types, the default is 0; for floating-point types, 0.0. Key requirement: Boolean Type (boolean): Initialized to false. Always avoid common pitfall: Assuming elements contain random garbage values like in C/C++; Java guarantees clean zero initialization.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Boolean Type (boolean): Initialized to false.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// DefaultValuesNumericArrays.java\nint[] arr = new int[5];\n// Boolean Type (boolean): Initialized to false."
  },
  {
    "id": 5,
    "question": "How is zero-based indexing relevant to Default Values of Numeric Arrays?",
    "shortAnswer": "Default Values of Numeric Arrays: Fundamental rule #5 - Reference Types (String, Object, Arrays): Initialized to null.",
    "explanation": "In ICSE Class 10 Java, Default Values of Numeric Arrays requires strict adherence to memory rules. When an array is created using 'new', the JVM automatically initializes every element to a predictable default value before any user code runs. For all integer types, the default is 0; for floating-point types, 0.0. Key requirement: Reference Types (String, Object, Arrays): Initialized to null. Always avoid common pitfall: Checking reference array elements without verifying if they are null before calling methods.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Reference Types (String, Object, Arrays): Initialized to null.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// DefaultValuesNumericArrays.java\nint[] arr = new int[5];\n// Reference Types (String, Object, Arrays): Initialized to null."
  },
  {
    "id": 6,
    "question": "What exception is thrown if boundaries are violated in Default Values of Numeric Arrays?",
    "shortAnswer": "Default Values of Numeric Arrays: Fundamental rule #1 - Integer Types (byte, short, int, long): Automatically initialized to 0 (or 0L).",
    "explanation": "In ICSE Class 10 Java, Default Values of Numeric Arrays requires strict adherence to memory rules. When an array is created using 'new', the JVM automatically initializes every element to a predictable default value before any user code runs. For all integer types, the default is 0; for floating-point types, 0.0. Key requirement: Integer Types (byte, short, int, long): Automatically initialized to 0 (or 0L). Always avoid common pitfall: Confusing char default '\\u0000' with character '0' (ASCII 48).",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Integer Types (byte, short, int, long): Automatically initialized to 0 (or 0L).",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// DefaultValuesNumericArrays.java\nint[] arr = new int[5];\n// Integer Types (byte, short, int, long): Automatically initialized to 0 (or 0L)."
  },
  {
    "id": 7,
    "question": "Can negative values be used in Default Values of Numeric Arrays?",
    "shortAnswer": "Default Values of Numeric Arrays: Fundamental rule #2 - Floating-Point Types (float, double): Automatically initialized to 0.0 (or 0.0f).",
    "explanation": "In ICSE Class 10 Java, Default Values of Numeric Arrays requires strict adherence to memory rules. When an array is created using 'new', the JVM automatically initializes every element to a predictable default value before any user code runs. For all integer types, the default is 0; for floating-point types, 0.0. Key requirement: Floating-Point Types (float, double): Automatically initialized to 0.0 (or 0.0f). Always avoid common pitfall: Assuming elements contain random garbage values like in C/C++; Java guarantees clean zero initialization.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Floating-Point Types (float, double): Automatically initialized to 0.0 (or 0.0f).",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// DefaultValuesNumericArrays.java\nint[] arr = new int[5];\n// Floating-Point Types (float, double): Automatically initialized to 0.0 (or 0.0f)."
  },
  {
    "id": 8,
    "question": "How does the 'new' operator interact with Default Values of Numeric Arrays?",
    "shortAnswer": "Default Values of Numeric Arrays: Fundamental rule #3 - Character Type (char): Initialized to '\\u0000' (null character, decimal 0).",
    "explanation": "In ICSE Class 10 Java, Default Values of Numeric Arrays requires strict adherence to memory rules. When an array is created using 'new', the JVM automatically initializes every element to a predictable default value before any user code runs. For all integer types, the default is 0; for floating-point types, 0.0. Key requirement: Character Type (char): Initialized to '\\u0000' (null character, decimal 0). Always avoid common pitfall: Checking reference array elements without verifying if they are null before calling methods.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Character Type (char): Initialized to '\\u0000' (null character, decimal 0).",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// DefaultValuesNumericArrays.java\nint[] arr = new int[5];\n// Character Type (char): Initialized to '\\u0000' (null character, decimal 0)."
  },
  {
    "id": 9,
    "question": "What role does the length property play in Default Values of Numeric Arrays?",
    "shortAnswer": "Default Values of Numeric Arrays: Fundamental rule #4 - Boolean Type (boolean): Initialized to false.",
    "explanation": "In ICSE Class 10 Java, Default Values of Numeric Arrays requires strict adherence to memory rules. When an array is created using 'new', the JVM automatically initializes every element to a predictable default value before any user code runs. For all integer types, the default is 0; for floating-point types, 0.0. Key requirement: Boolean Type (boolean): Initialized to false. Always avoid common pitfall: Confusing char default '\\u0000' with character '0' (ASCII 48).",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Boolean Type (boolean): Initialized to false.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// DefaultValuesNumericArrays.java\nint[] arr = new int[5];\n// Boolean Type (boolean): Initialized to false."
  },
  {
    "id": 10,
    "question": "How does the stack memory differ from heap memory in Default Values of Numeric Arrays?",
    "shortAnswer": "Default Values of Numeric Arrays: Fundamental rule #5 - Reference Types (String, Object, Arrays): Initialized to null.",
    "explanation": "In ICSE Class 10 Java, Default Values of Numeric Arrays requires strict adherence to memory rules. When an array is created using 'new', the JVM automatically initializes every element to a predictable default value before any user code runs. For all integer types, the default is 0; for floating-point types, 0.0. Key requirement: Reference Types (String, Object, Arrays): Initialized to null. Always avoid common pitfall: Assuming elements contain random garbage values like in C/C++; Java guarantees clean zero initialization.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Reference Types (String, Object, Arrays): Initialized to null.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// DefaultValuesNumericArrays.java\nint[] arr = new int[5];\n// Reference Types (String, Object, Arrays): Initialized to null."
  },
  {
    "id": 11,
    "question": "Is the size of an array fixed or dynamic in Default Values of Numeric Arrays?",
    "shortAnswer": "Default Values of Numeric Arrays: Fundamental rule #1 - Integer Types (byte, short, int, long): Automatically initialized to 0 (or 0L).",
    "explanation": "In ICSE Class 10 Java, Default Values of Numeric Arrays requires strict adherence to memory rules. When an array is created using 'new', the JVM automatically initializes every element to a predictable default value before any user code runs. For all integer types, the default is 0; for floating-point types, 0.0. Key requirement: Integer Types (byte, short, int, long): Automatically initialized to 0 (or 0L). Always avoid common pitfall: Checking reference array elements without verifying if they are null before calling methods.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Integer Types (byte, short, int, long): Automatically initialized to 0 (or 0L).",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// DefaultValuesNumericArrays.java\nint[] arr = new int[5];\n// Integer Types (byte, short, int, long): Automatically initialized to 0 (or 0L)."
  },
  {
    "id": 12,
    "question": "What are the default values assigned by the JVM in Default Values of Numeric Arrays?",
    "shortAnswer": "Default Values of Numeric Arrays: Fundamental rule #2 - Floating-Point Types (float, double): Automatically initialized to 0.0 (or 0.0f).",
    "explanation": "In ICSE Class 10 Java, Default Values of Numeric Arrays requires strict adherence to memory rules. When an array is created using 'new', the JVM automatically initializes every element to a predictable default value before any user code runs. For all integer types, the default is 0; for floating-point types, 0.0. Key requirement: Floating-Point Types (float, double): Automatically initialized to 0.0 (or 0.0f). Always avoid common pitfall: Confusing char default '\\u0000' with character '0' (ASCII 48).",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Floating-Point Types (float, double): Automatically initialized to 0.0 (or 0.0f).",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// DefaultValuesNumericArrays.java\nint[] arr = new int[5];\n// Floating-Point Types (float, double): Automatically initialized to 0.0 (or 0.0f)."
  },
  {
    "id": 13,
    "question": "How does Scanner input work when dealing with Default Values of Numeric Arrays?",
    "shortAnswer": "Default Values of Numeric Arrays: Fundamental rule #3 - Character Type (char): Initialized to '\\u0000' (null character, decimal 0).",
    "explanation": "In ICSE Class 10 Java, Default Values of Numeric Arrays requires strict adherence to memory rules. When an array is created using 'new', the JVM automatically initializes every element to a predictable default value before any user code runs. For all integer types, the default is 0; for floating-point types, 0.0. Key requirement: Character Type (char): Initialized to '\\u0000' (null character, decimal 0). Always avoid common pitfall: Assuming elements contain random garbage values like in C/C++; Java guarantees clean zero initialization.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Character Type (char): Initialized to '\\u0000' (null character, decimal 0).",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// DefaultValuesNumericArrays.java\nint[] arr = new int[5];\n// Character Type (char): Initialized to '\\u0000' (null character, decimal 0)."
  },
  {
    "id": 14,
    "question": "What is the difference between declaring and instantiating in Default Values of Numeric Arrays?",
    "shortAnswer": "Default Values of Numeric Arrays: Fundamental rule #4 - Boolean Type (boolean): Initialized to false.",
    "explanation": "In ICSE Class 10 Java, Default Values of Numeric Arrays requires strict adherence to memory rules. When an array is created using 'new', the JVM automatically initializes every element to a predictable default value before any user code runs. For all integer types, the default is 0; for floating-point types, 0.0. Key requirement: Boolean Type (boolean): Initialized to false. Always avoid common pitfall: Checking reference array elements without verifying if they are null before calling methods.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Boolean Type (boolean): Initialized to false.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// DefaultValuesNumericArrays.java\nint[] arr = new int[5];\n// Boolean Type (boolean): Initialized to false."
  },
  {
    "id": 15,
    "question": "Can an array hold elements of different data types in Default Values of Numeric Arrays?",
    "shortAnswer": "Default Values of Numeric Arrays: Fundamental rule #5 - Reference Types (String, Object, Arrays): Initialized to null.",
    "explanation": "In ICSE Class 10 Java, Default Values of Numeric Arrays requires strict adherence to memory rules. When an array is created using 'new', the JVM automatically initializes every element to a predictable default value before any user code runs. For all integer types, the default is 0; for floating-point types, 0.0. Key requirement: Reference Types (String, Object, Arrays): Initialized to null. Always avoid common pitfall: Confusing char default '\\u0000' with character '0' (ASCII 48).",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Reference Types (String, Object, Arrays): Initialized to null.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// DefaultValuesNumericArrays.java\nint[] arr = new int[5];\n// Reference Types (String, Object, Arrays): Initialized to null."
  },
  {
    "id": 16,
    "question": "How do we traverse in reverse order when applying Default Values of Numeric Arrays?",
    "shortAnswer": "Default Values of Numeric Arrays: Fundamental rule #1 - Integer Types (byte, short, int, long): Automatically initialized to 0 (or 0L).",
    "explanation": "In ICSE Class 10 Java, Default Values of Numeric Arrays requires strict adherence to memory rules. When an array is created using 'new', the JVM automatically initializes every element to a predictable default value before any user code runs. For all integer types, the default is 0; for floating-point types, 0.0. Key requirement: Integer Types (byte, short, int, long): Automatically initialized to 0 (or 0L). Always avoid common pitfall: Assuming elements contain random garbage values like in C/C++; Java guarantees clean zero initialization.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Integer Types (byte, short, int, long): Automatically initialized to 0 (or 0L).",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// DefaultValuesNumericArrays.java\nint[] arr = new int[5];\n// Integer Types (byte, short, int, long): Automatically initialized to 0 (or 0L)."
  },
  {
    "id": 17,
    "question": "What happens if you print an array reference directly in Default Values of Numeric Arrays?",
    "shortAnswer": "Default Values of Numeric Arrays: Fundamental rule #2 - Floating-Point Types (float, double): Automatically initialized to 0.0 (or 0.0f).",
    "explanation": "In ICSE Class 10 Java, Default Values of Numeric Arrays requires strict adherence to memory rules. When an array is created using 'new', the JVM automatically initializes every element to a predictable default value before any user code runs. For all integer types, the default is 0; for floating-point types, 0.0. Key requirement: Floating-Point Types (float, double): Automatically initialized to 0.0 (or 0.0f). Always avoid common pitfall: Checking reference array elements without verifying if they are null before calling methods.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Floating-Point Types (float, double): Automatically initialized to 0.0 (or 0.0f).",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// DefaultValuesNumericArrays.java\nint[] arr = new int[5];\n// Floating-Point Types (float, double): Automatically initialized to 0.0 (or 0.0f)."
  },
  {
    "id": 18,
    "question": "How does BlueJ visualize the operations in Default Values of Numeric Arrays?",
    "shortAnswer": "Default Values of Numeric Arrays: Fundamental rule #3 - Character Type (char): Initialized to '\\u0000' (null character, decimal 0).",
    "explanation": "In ICSE Class 10 Java, Default Values of Numeric Arrays requires strict adherence to memory rules. When an array is created using 'new', the JVM automatically initializes every element to a predictable default value before any user code runs. For all integer types, the default is 0; for floating-point types, 0.0. Key requirement: Character Type (char): Initialized to '\\u0000' (null character, decimal 0). Always avoid common pitfall: Confusing char default '\\u0000' with character '0' (ASCII 48).",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Character Type (char): Initialized to '\\u0000' (null character, decimal 0).",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// DefaultValuesNumericArrays.java\nint[] arr = new int[5];\n// Character Type (char): Initialized to '\\u0000' (null character, decimal 0)."
  },
  {
    "id": 19,
    "question": "How do you write a Variable Description Table (VDT) entry for Default Values of Numeric Arrays?",
    "shortAnswer": "Default Values of Numeric Arrays: Fundamental rule #4 - Boolean Type (boolean): Initialized to false.",
    "explanation": "In ICSE Class 10 Java, Default Values of Numeric Arrays requires strict adherence to memory rules. When an array is created using 'new', the JVM automatically initializes every element to a predictable default value before any user code runs. For all integer types, the default is 0; for floating-point types, 0.0. Key requirement: Boolean Type (boolean): Initialized to false. Always avoid common pitfall: Assuming elements contain random garbage values like in C/C++; Java guarantees clean zero initialization.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Boolean Type (boolean): Initialized to false.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// DefaultValuesNumericArrays.java\nint[] arr = new int[5];\n// Boolean Type (boolean): Initialized to false."
  },
  {
    "id": 20,
    "question": "What happens if the array reference is null in Default Values of Numeric Arrays?",
    "shortAnswer": "Default Values of Numeric Arrays: Fundamental rule #5 - Reference Types (String, Object, Arrays): Initialized to null.",
    "explanation": "In ICSE Class 10 Java, Default Values of Numeric Arrays requires strict adherence to memory rules. When an array is created using 'new', the JVM automatically initializes every element to a predictable default value before any user code runs. For all integer types, the default is 0; for floating-point types, 0.0. Key requirement: Reference Types (String, Object, Arrays): Initialized to null. Always avoid common pitfall: Checking reference array elements without verifying if they are null before calling methods.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Reference Types (String, Object, Arrays): Initialized to null.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// DefaultValuesNumericArrays.java\nint[] arr = new int[5];\n// Reference Types (String, Object, Arrays): Initialized to null."
  },
  {
    "id": 21,
    "question": "How can you pass an array to a method in Default Values of Numeric Arrays?",
    "shortAnswer": "Default Values of Numeric Arrays: Fundamental rule #1 - Integer Types (byte, short, int, long): Automatically initialized to 0 (or 0L).",
    "explanation": "In ICSE Class 10 Java, Default Values of Numeric Arrays requires strict adherence to memory rules. When an array is created using 'new', the JVM automatically initializes every element to a predictable default value before any user code runs. For all integer types, the default is 0; for floating-point types, 0.0. Key requirement: Integer Types (byte, short, int, long): Automatically initialized to 0 (or 0L). Always avoid common pitfall: Confusing char default '\\u0000' with character '0' (ASCII 48).",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Integer Types (byte, short, int, long): Automatically initialized to 0 (or 0L).",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// DefaultValuesNumericArrays.java\nint[] arr = new int[5];\n// Integer Types (byte, short, int, long): Automatically initialized to 0 (or 0L)."
  },
  {
    "id": 22,
    "question": "Can an array have a length of 0 in Default Values of Numeric Arrays?",
    "shortAnswer": "Default Values of Numeric Arrays: Fundamental rule #2 - Floating-Point Types (float, double): Automatically initialized to 0.0 (or 0.0f).",
    "explanation": "In ICSE Class 10 Java, Default Values of Numeric Arrays requires strict adherence to memory rules. When an array is created using 'new', the JVM automatically initializes every element to a predictable default value before any user code runs. For all integer types, the default is 0; for floating-point types, 0.0. Key requirement: Floating-Point Types (float, double): Automatically initialized to 0.0 (or 0.0f). Always avoid common pitfall: Assuming elements contain random garbage values like in C/C++; Java guarantees clean zero initialization.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Floating-Point Types (float, double): Automatically initialized to 0.0 (or 0.0f).",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// DefaultValuesNumericArrays.java\nint[] arr = new int[5];\n// Floating-Point Types (float, double): Automatically initialized to 0.0 (or 0.0f)."
  },
  {
    "id": 23,
    "question": "Why is array access O(1) constant time in Default Values of Numeric Arrays?",
    "shortAnswer": "Default Values of Numeric Arrays: Fundamental rule #3 - Character Type (char): Initialized to '\\u0000' (null character, decimal 0).",
    "explanation": "In ICSE Class 10 Java, Default Values of Numeric Arrays requires strict adherence to memory rules. When an array is created using 'new', the JVM automatically initializes every element to a predictable default value before any user code runs. For all integer types, the default is 0; for floating-point types, 0.0. Key requirement: Character Type (char): Initialized to '\\u0000' (null character, decimal 0). Always avoid common pitfall: Checking reference array elements without verifying if they are null before calling methods.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Character Type (char): Initialized to '\\u0000' (null character, decimal 0).",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// DefaultValuesNumericArrays.java\nint[] arr = new int[5];\n// Character Type (char): Initialized to '\\u0000' (null character, decimal 0)."
  },
  {
    "id": 24,
    "question": "How do you prevent off-by-one errors in Default Values of Numeric Arrays?",
    "shortAnswer": "Default Values of Numeric Arrays: Fundamental rule #4 - Boolean Type (boolean): Initialized to false.",
    "explanation": "In ICSE Class 10 Java, Default Values of Numeric Arrays requires strict adherence to memory rules. When an array is created using 'new', the JVM automatically initializes every element to a predictable default value before any user code runs. For all integer types, the default is 0; for floating-point types, 0.0. Key requirement: Boolean Type (boolean): Initialized to false. Always avoid common pitfall: Confusing char default '\\u0000' with character '0' (ASCII 48).",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Boolean Type (boolean): Initialized to false.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// DefaultValuesNumericArrays.java\nint[] arr = new int[5];\n// Boolean Type (boolean): Initialized to false."
  },
  {
    "id": 25,
    "question": "What master advice does Sukanta Hui give for scoring full marks on Default Values of Numeric Arrays?",
    "shortAnswer": "Default Values of Numeric Arrays: Fundamental rule #5 - Reference Types (String, Object, Arrays): Initialized to null.",
    "explanation": "In ICSE Class 10 Java, Default Values of Numeric Arrays requires strict adherence to memory rules. When an array is created using 'new', the JVM automatically initializes every element to a predictable default value before any user code runs. For all integer types, the default is 0; for floating-point types, 0.0. Key requirement: Reference Types (String, Object, Arrays): Initialized to null. Always avoid common pitfall: Assuming elements contain random garbage values like in C/C++; Java guarantees clean zero initialization.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Reference Types (String, Object, Arrays): Initialized to null.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 3:\n// DefaultValuesNumericArrays.java\nint[] arr = new int[5];\n// Reference Types (String, Object, Arrays): Initialized to null."
  }
];

export default questions;
