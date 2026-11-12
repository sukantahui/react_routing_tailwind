const questions = [
  {
    "id": 1,
    "question": "What is the primary concept of Traversing Using length Property?",
    "shortAnswer": "Traversing Using length Property: Fundamental rule #1 - Field, Not Method: 'arr.length' is a public instance field, NOT a method (do NOT write arr.length()).",
    "explanation": "In ICSE Class 10 Java, Traversing Using length Property requires strict adherence to memory rules. Every array in Java has a built-in public final integer field called 'length'. Using arr.length rather than a hardcoded number ensures code adaptability, robustness, and eliminates index errors if the array dimension changes. Key requirement: Field, Not Method: 'arr.length' is a public instance field, NOT a method (do NOT write arr.length()). Always avoid common pitfall: Adding parentheses to array length (arr.length()) causing compiler error: cannot find symbol method length().",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Field, Not Method: 'arr.length' is a public instance field, NOT a method (do NOT write arr.length()).",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// TraverseLengthProperty.java\nint[] arr = new int[5];\n// Field, Not Method: 'arr.length' is a public instance field, NOT a method (do NOT write arr.length())."
  },
  {
    "id": 2,
    "question": "How does Java allocate memory for Traversing Using length Property?",
    "shortAnswer": "Traversing Using length Property: Fundamental rule #2 - Immutable Property: The length field is constant and read-only; attempting to reassign 'arr.length = 10;' is a compile error.",
    "explanation": "In ICSE Class 10 Java, Traversing Using length Property requires strict adherence to memory rules. Every array in Java has a built-in public final integer field called 'length'. Using arr.length rather than a hardcoded number ensures code adaptability, robustness, and eliminates index errors if the array dimension changes. Key requirement: Immutable Property: The length field is constant and read-only; attempting to reassign 'arr.length = 10;' is a compile error. Always avoid common pitfall: Hardcoding numeric limits (e.g. i < 10) that fail when passed arrays of different lengths.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Immutable Property: The length field is constant and read-only; attempting to reassign 'arr.length = 10;' is a compile error.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// TraverseLengthProperty.java\nint[] arr = new int[5];\n// Immutable Property: The length field is constant and read-only; attempting to reassign 'arr.length = 10;' is a compile error."
  },
  {
    "id": 3,
    "question": "What is the time complexity associated with Traversing Using length Property?",
    "shortAnswer": "Traversing Using length Property: Fundamental rule #3 - Safe Boundary: Valid indices are strictly in the range [0, arr.length - 1].",
    "explanation": "In ICSE Class 10 Java, Traversing Using length Property requires strict adherence to memory rules. Every array in Java has a built-in public final integer field called 'length'. Using arr.length rather than a hardcoded number ensures code adaptability, robustness, and eliminates index errors if the array dimension changes. Key requirement: Safe Boundary: Valid indices are strictly in the range [0, arr.length - 1]. Always avoid common pitfall: Checking arr.length when the array reference is null, causing NullPointerException.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Safe Boundary: Valid indices are strictly in the range [0, arr.length - 1].",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// TraverseLengthProperty.java\nint[] arr = new int[5];\n// Safe Boundary: Valid indices are strictly in the range [0, arr.length - 1]."
  },
  {
    "id": 4,
    "question": "Which common ICSE board exam mistake occurs in Traversing Using length Property?",
    "shortAnswer": "Traversing Using length Property: Fundamental rule #4 - Generalization: Functions taking array parameters should always use the array's own length property.",
    "explanation": "In ICSE Class 10 Java, Traversing Using length Property requires strict adherence to memory rules. Every array in Java has a built-in public final integer field called 'length'. Using arr.length rather than a hardcoded number ensures code adaptability, robustness, and eliminates index errors if the array dimension changes. Key requirement: Generalization: Functions taking array parameters should always use the array's own length property. Always avoid common pitfall: Adding parentheses to array length (arr.length()) causing compiler error: cannot find symbol method length().",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Generalization: Functions taking array parameters should always use the array's own length property.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// TraverseLengthProperty.java\nint[] arr = new int[5];\n// Generalization: Functions taking array parameters should always use the array's own length property."
  },
  {
    "id": 5,
    "question": "How is zero-based indexing relevant to Traversing Using length Property?",
    "shortAnswer": "Traversing Using length Property: Fundamental rule #5 - Comparison: For strings it is str.length(), for arrays it is arr.length without parentheses.",
    "explanation": "In ICSE Class 10 Java, Traversing Using length Property requires strict adherence to memory rules. Every array in Java has a built-in public final integer field called 'length'. Using arr.length rather than a hardcoded number ensures code adaptability, robustness, and eliminates index errors if the array dimension changes. Key requirement: Comparison: For strings it is str.length(), for arrays it is arr.length without parentheses. Always avoid common pitfall: Hardcoding numeric limits (e.g. i < 10) that fail when passed arrays of different lengths.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Comparison: For strings it is str.length(), for arrays it is arr.length without parentheses.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// TraverseLengthProperty.java\nint[] arr = new int[5];\n// Comparison: For strings it is str.length(), for arrays it is arr.length without parentheses."
  },
  {
    "id": 6,
    "question": "What exception is thrown if boundaries are violated in Traversing Using length Property?",
    "shortAnswer": "Traversing Using length Property: Fundamental rule #1 - Field, Not Method: 'arr.length' is a public instance field, NOT a method (do NOT write arr.length()).",
    "explanation": "In ICSE Class 10 Java, Traversing Using length Property requires strict adherence to memory rules. Every array in Java has a built-in public final integer field called 'length'. Using arr.length rather than a hardcoded number ensures code adaptability, robustness, and eliminates index errors if the array dimension changes. Key requirement: Field, Not Method: 'arr.length' is a public instance field, NOT a method (do NOT write arr.length()). Always avoid common pitfall: Checking arr.length when the array reference is null, causing NullPointerException.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Field, Not Method: 'arr.length' is a public instance field, NOT a method (do NOT write arr.length()).",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// TraverseLengthProperty.java\nint[] arr = new int[5];\n// Field, Not Method: 'arr.length' is a public instance field, NOT a method (do NOT write arr.length())."
  },
  {
    "id": 7,
    "question": "Can negative values be used in Traversing Using length Property?",
    "shortAnswer": "Traversing Using length Property: Fundamental rule #2 - Immutable Property: The length field is constant and read-only; attempting to reassign 'arr.length = 10;' is a compile error.",
    "explanation": "In ICSE Class 10 Java, Traversing Using length Property requires strict adherence to memory rules. Every array in Java has a built-in public final integer field called 'length'. Using arr.length rather than a hardcoded number ensures code adaptability, robustness, and eliminates index errors if the array dimension changes. Key requirement: Immutable Property: The length field is constant and read-only; attempting to reassign 'arr.length = 10;' is a compile error. Always avoid common pitfall: Adding parentheses to array length (arr.length()) causing compiler error: cannot find symbol method length().",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Immutable Property: The length field is constant and read-only; attempting to reassign 'arr.length = 10;' is a compile error.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// TraverseLengthProperty.java\nint[] arr = new int[5];\n// Immutable Property: The length field is constant and read-only; attempting to reassign 'arr.length = 10;' is a compile error."
  },
  {
    "id": 8,
    "question": "How does the 'new' operator interact with Traversing Using length Property?",
    "shortAnswer": "Traversing Using length Property: Fundamental rule #3 - Safe Boundary: Valid indices are strictly in the range [0, arr.length - 1].",
    "explanation": "In ICSE Class 10 Java, Traversing Using length Property requires strict adherence to memory rules. Every array in Java has a built-in public final integer field called 'length'. Using arr.length rather than a hardcoded number ensures code adaptability, robustness, and eliminates index errors if the array dimension changes. Key requirement: Safe Boundary: Valid indices are strictly in the range [0, arr.length - 1]. Always avoid common pitfall: Hardcoding numeric limits (e.g. i < 10) that fail when passed arrays of different lengths.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Safe Boundary: Valid indices are strictly in the range [0, arr.length - 1].",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// TraverseLengthProperty.java\nint[] arr = new int[5];\n// Safe Boundary: Valid indices are strictly in the range [0, arr.length - 1]."
  },
  {
    "id": 9,
    "question": "What role does the length property play in Traversing Using length Property?",
    "shortAnswer": "Traversing Using length Property: Fundamental rule #4 - Generalization: Functions taking array parameters should always use the array's own length property.",
    "explanation": "In ICSE Class 10 Java, Traversing Using length Property requires strict adherence to memory rules. Every array in Java has a built-in public final integer field called 'length'. Using arr.length rather than a hardcoded number ensures code adaptability, robustness, and eliminates index errors if the array dimension changes. Key requirement: Generalization: Functions taking array parameters should always use the array's own length property. Always avoid common pitfall: Checking arr.length when the array reference is null, causing NullPointerException.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Generalization: Functions taking array parameters should always use the array's own length property.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// TraverseLengthProperty.java\nint[] arr = new int[5];\n// Generalization: Functions taking array parameters should always use the array's own length property."
  },
  {
    "id": 10,
    "question": "How does the stack memory differ from heap memory in Traversing Using length Property?",
    "shortAnswer": "Traversing Using length Property: Fundamental rule #5 - Comparison: For strings it is str.length(), for arrays it is arr.length without parentheses.",
    "explanation": "In ICSE Class 10 Java, Traversing Using length Property requires strict adherence to memory rules. Every array in Java has a built-in public final integer field called 'length'. Using arr.length rather than a hardcoded number ensures code adaptability, robustness, and eliminates index errors if the array dimension changes. Key requirement: Comparison: For strings it is str.length(), for arrays it is arr.length without parentheses. Always avoid common pitfall: Adding parentheses to array length (arr.length()) causing compiler error: cannot find symbol method length().",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Comparison: For strings it is str.length(), for arrays it is arr.length without parentheses.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// TraverseLengthProperty.java\nint[] arr = new int[5];\n// Comparison: For strings it is str.length(), for arrays it is arr.length without parentheses."
  },
  {
    "id": 11,
    "question": "Is the size of an array fixed or dynamic in Traversing Using length Property?",
    "shortAnswer": "Traversing Using length Property: Fundamental rule #1 - Field, Not Method: 'arr.length' is a public instance field, NOT a method (do NOT write arr.length()).",
    "explanation": "In ICSE Class 10 Java, Traversing Using length Property requires strict adherence to memory rules. Every array in Java has a built-in public final integer field called 'length'. Using arr.length rather than a hardcoded number ensures code adaptability, robustness, and eliminates index errors if the array dimension changes. Key requirement: Field, Not Method: 'arr.length' is a public instance field, NOT a method (do NOT write arr.length()). Always avoid common pitfall: Hardcoding numeric limits (e.g. i < 10) that fail when passed arrays of different lengths.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Field, Not Method: 'arr.length' is a public instance field, NOT a method (do NOT write arr.length()).",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// TraverseLengthProperty.java\nint[] arr = new int[5];\n// Field, Not Method: 'arr.length' is a public instance field, NOT a method (do NOT write arr.length())."
  },
  {
    "id": 12,
    "question": "What are the default values assigned by the JVM in Traversing Using length Property?",
    "shortAnswer": "Traversing Using length Property: Fundamental rule #2 - Immutable Property: The length field is constant and read-only; attempting to reassign 'arr.length = 10;' is a compile error.",
    "explanation": "In ICSE Class 10 Java, Traversing Using length Property requires strict adherence to memory rules. Every array in Java has a built-in public final integer field called 'length'. Using arr.length rather than a hardcoded number ensures code adaptability, robustness, and eliminates index errors if the array dimension changes. Key requirement: Immutable Property: The length field is constant and read-only; attempting to reassign 'arr.length = 10;' is a compile error. Always avoid common pitfall: Checking arr.length when the array reference is null, causing NullPointerException.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Immutable Property: The length field is constant and read-only; attempting to reassign 'arr.length = 10;' is a compile error.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// TraverseLengthProperty.java\nint[] arr = new int[5];\n// Immutable Property: The length field is constant and read-only; attempting to reassign 'arr.length = 10;' is a compile error."
  },
  {
    "id": 13,
    "question": "How does Scanner input work when dealing with Traversing Using length Property?",
    "shortAnswer": "Traversing Using length Property: Fundamental rule #3 - Safe Boundary: Valid indices are strictly in the range [0, arr.length - 1].",
    "explanation": "In ICSE Class 10 Java, Traversing Using length Property requires strict adherence to memory rules. Every array in Java has a built-in public final integer field called 'length'. Using arr.length rather than a hardcoded number ensures code adaptability, robustness, and eliminates index errors if the array dimension changes. Key requirement: Safe Boundary: Valid indices are strictly in the range [0, arr.length - 1]. Always avoid common pitfall: Adding parentheses to array length (arr.length()) causing compiler error: cannot find symbol method length().",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Safe Boundary: Valid indices are strictly in the range [0, arr.length - 1].",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// TraverseLengthProperty.java\nint[] arr = new int[5];\n// Safe Boundary: Valid indices are strictly in the range [0, arr.length - 1]."
  },
  {
    "id": 14,
    "question": "What is the difference between declaring and instantiating in Traversing Using length Property?",
    "shortAnswer": "Traversing Using length Property: Fundamental rule #4 - Generalization: Functions taking array parameters should always use the array's own length property.",
    "explanation": "In ICSE Class 10 Java, Traversing Using length Property requires strict adherence to memory rules. Every array in Java has a built-in public final integer field called 'length'. Using arr.length rather than a hardcoded number ensures code adaptability, robustness, and eliminates index errors if the array dimension changes. Key requirement: Generalization: Functions taking array parameters should always use the array's own length property. Always avoid common pitfall: Hardcoding numeric limits (e.g. i < 10) that fail when passed arrays of different lengths.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Generalization: Functions taking array parameters should always use the array's own length property.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// TraverseLengthProperty.java\nint[] arr = new int[5];\n// Generalization: Functions taking array parameters should always use the array's own length property."
  },
  {
    "id": 15,
    "question": "Can an array hold elements of different data types in Traversing Using length Property?",
    "shortAnswer": "Traversing Using length Property: Fundamental rule #5 - Comparison: For strings it is str.length(), for arrays it is arr.length without parentheses.",
    "explanation": "In ICSE Class 10 Java, Traversing Using length Property requires strict adherence to memory rules. Every array in Java has a built-in public final integer field called 'length'. Using arr.length rather than a hardcoded number ensures code adaptability, robustness, and eliminates index errors if the array dimension changes. Key requirement: Comparison: For strings it is str.length(), for arrays it is arr.length without parentheses. Always avoid common pitfall: Checking arr.length when the array reference is null, causing NullPointerException.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Comparison: For strings it is str.length(), for arrays it is arr.length without parentheses.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// TraverseLengthProperty.java\nint[] arr = new int[5];\n// Comparison: For strings it is str.length(), for arrays it is arr.length without parentheses."
  },
  {
    "id": 16,
    "question": "How do we traverse in reverse order when applying Traversing Using length Property?",
    "shortAnswer": "Traversing Using length Property: Fundamental rule #1 - Field, Not Method: 'arr.length' is a public instance field, NOT a method (do NOT write arr.length()).",
    "explanation": "In ICSE Class 10 Java, Traversing Using length Property requires strict adherence to memory rules. Every array in Java has a built-in public final integer field called 'length'. Using arr.length rather than a hardcoded number ensures code adaptability, robustness, and eliminates index errors if the array dimension changes. Key requirement: Field, Not Method: 'arr.length' is a public instance field, NOT a method (do NOT write arr.length()). Always avoid common pitfall: Adding parentheses to array length (arr.length()) causing compiler error: cannot find symbol method length().",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Field, Not Method: 'arr.length' is a public instance field, NOT a method (do NOT write arr.length()).",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// TraverseLengthProperty.java\nint[] arr = new int[5];\n// Field, Not Method: 'arr.length' is a public instance field, NOT a method (do NOT write arr.length())."
  },
  {
    "id": 17,
    "question": "What happens if you print an array reference directly in Traversing Using length Property?",
    "shortAnswer": "Traversing Using length Property: Fundamental rule #2 - Immutable Property: The length field is constant and read-only; attempting to reassign 'arr.length = 10;' is a compile error.",
    "explanation": "In ICSE Class 10 Java, Traversing Using length Property requires strict adherence to memory rules. Every array in Java has a built-in public final integer field called 'length'. Using arr.length rather than a hardcoded number ensures code adaptability, robustness, and eliminates index errors if the array dimension changes. Key requirement: Immutable Property: The length field is constant and read-only; attempting to reassign 'arr.length = 10;' is a compile error. Always avoid common pitfall: Hardcoding numeric limits (e.g. i < 10) that fail when passed arrays of different lengths.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Immutable Property: The length field is constant and read-only; attempting to reassign 'arr.length = 10;' is a compile error.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// TraverseLengthProperty.java\nint[] arr = new int[5];\n// Immutable Property: The length field is constant and read-only; attempting to reassign 'arr.length = 10;' is a compile error."
  },
  {
    "id": 18,
    "question": "How does BlueJ visualize the operations in Traversing Using length Property?",
    "shortAnswer": "Traversing Using length Property: Fundamental rule #3 - Safe Boundary: Valid indices are strictly in the range [0, arr.length - 1].",
    "explanation": "In ICSE Class 10 Java, Traversing Using length Property requires strict adherence to memory rules. Every array in Java has a built-in public final integer field called 'length'. Using arr.length rather than a hardcoded number ensures code adaptability, robustness, and eliminates index errors if the array dimension changes. Key requirement: Safe Boundary: Valid indices are strictly in the range [0, arr.length - 1]. Always avoid common pitfall: Checking arr.length when the array reference is null, causing NullPointerException.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Safe Boundary: Valid indices are strictly in the range [0, arr.length - 1].",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// TraverseLengthProperty.java\nint[] arr = new int[5];\n// Safe Boundary: Valid indices are strictly in the range [0, arr.length - 1]."
  },
  {
    "id": 19,
    "question": "How do you write a Variable Description Table (VDT) entry for Traversing Using length Property?",
    "shortAnswer": "Traversing Using length Property: Fundamental rule #4 - Generalization: Functions taking array parameters should always use the array's own length property.",
    "explanation": "In ICSE Class 10 Java, Traversing Using length Property requires strict adherence to memory rules. Every array in Java has a built-in public final integer field called 'length'. Using arr.length rather than a hardcoded number ensures code adaptability, robustness, and eliminates index errors if the array dimension changes. Key requirement: Generalization: Functions taking array parameters should always use the array's own length property. Always avoid common pitfall: Adding parentheses to array length (arr.length()) causing compiler error: cannot find symbol method length().",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Generalization: Functions taking array parameters should always use the array's own length property.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// TraverseLengthProperty.java\nint[] arr = new int[5];\n// Generalization: Functions taking array parameters should always use the array's own length property."
  },
  {
    "id": 20,
    "question": "What happens if the array reference is null in Traversing Using length Property?",
    "shortAnswer": "Traversing Using length Property: Fundamental rule #5 - Comparison: For strings it is str.length(), for arrays it is arr.length without parentheses.",
    "explanation": "In ICSE Class 10 Java, Traversing Using length Property requires strict adherence to memory rules. Every array in Java has a built-in public final integer field called 'length'. Using arr.length rather than a hardcoded number ensures code adaptability, robustness, and eliminates index errors if the array dimension changes. Key requirement: Comparison: For strings it is str.length(), for arrays it is arr.length without parentheses. Always avoid common pitfall: Hardcoding numeric limits (e.g. i < 10) that fail when passed arrays of different lengths.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Comparison: For strings it is str.length(), for arrays it is arr.length without parentheses.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// TraverseLengthProperty.java\nint[] arr = new int[5];\n// Comparison: For strings it is str.length(), for arrays it is arr.length without parentheses."
  },
  {
    "id": 21,
    "question": "How can you pass an array to a method in Traversing Using length Property?",
    "shortAnswer": "Traversing Using length Property: Fundamental rule #1 - Field, Not Method: 'arr.length' is a public instance field, NOT a method (do NOT write arr.length()).",
    "explanation": "In ICSE Class 10 Java, Traversing Using length Property requires strict adherence to memory rules. Every array in Java has a built-in public final integer field called 'length'. Using arr.length rather than a hardcoded number ensures code adaptability, robustness, and eliminates index errors if the array dimension changes. Key requirement: Field, Not Method: 'arr.length' is a public instance field, NOT a method (do NOT write arr.length()). Always avoid common pitfall: Checking arr.length when the array reference is null, causing NullPointerException.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Field, Not Method: 'arr.length' is a public instance field, NOT a method (do NOT write arr.length()).",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// TraverseLengthProperty.java\nint[] arr = new int[5];\n// Field, Not Method: 'arr.length' is a public instance field, NOT a method (do NOT write arr.length())."
  },
  {
    "id": 22,
    "question": "Can an array have a length of 0 in Traversing Using length Property?",
    "shortAnswer": "Traversing Using length Property: Fundamental rule #2 - Immutable Property: The length field is constant and read-only; attempting to reassign 'arr.length = 10;' is a compile error.",
    "explanation": "In ICSE Class 10 Java, Traversing Using length Property requires strict adherence to memory rules. Every array in Java has a built-in public final integer field called 'length'. Using arr.length rather than a hardcoded number ensures code adaptability, robustness, and eliminates index errors if the array dimension changes. Key requirement: Immutable Property: The length field is constant and read-only; attempting to reassign 'arr.length = 10;' is a compile error. Always avoid common pitfall: Adding parentheses to array length (arr.length()) causing compiler error: cannot find symbol method length().",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Immutable Property: The length field is constant and read-only; attempting to reassign 'arr.length = 10;' is a compile error.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// TraverseLengthProperty.java\nint[] arr = new int[5];\n// Immutable Property: The length field is constant and read-only; attempting to reassign 'arr.length = 10;' is a compile error."
  },
  {
    "id": 23,
    "question": "Why is array access O(1) constant time in Traversing Using length Property?",
    "shortAnswer": "Traversing Using length Property: Fundamental rule #3 - Safe Boundary: Valid indices are strictly in the range [0, arr.length - 1].",
    "explanation": "In ICSE Class 10 Java, Traversing Using length Property requires strict adherence to memory rules. Every array in Java has a built-in public final integer field called 'length'. Using arr.length rather than a hardcoded number ensures code adaptability, robustness, and eliminates index errors if the array dimension changes. Key requirement: Safe Boundary: Valid indices are strictly in the range [0, arr.length - 1]. Always avoid common pitfall: Hardcoding numeric limits (e.g. i < 10) that fail when passed arrays of different lengths.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Safe Boundary: Valid indices are strictly in the range [0, arr.length - 1].",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// TraverseLengthProperty.java\nint[] arr = new int[5];\n// Safe Boundary: Valid indices are strictly in the range [0, arr.length - 1]."
  },
  {
    "id": 24,
    "question": "How do you prevent off-by-one errors in Traversing Using length Property?",
    "shortAnswer": "Traversing Using length Property: Fundamental rule #4 - Generalization: Functions taking array parameters should always use the array's own length property.",
    "explanation": "In ICSE Class 10 Java, Traversing Using length Property requires strict adherence to memory rules. Every array in Java has a built-in public final integer field called 'length'. Using arr.length rather than a hardcoded number ensures code adaptability, robustness, and eliminates index errors if the array dimension changes. Key requirement: Generalization: Functions taking array parameters should always use the array's own length property. Always avoid common pitfall: Checking arr.length when the array reference is null, causing NullPointerException.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Generalization: Functions taking array parameters should always use the array's own length property.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// TraverseLengthProperty.java\nint[] arr = new int[5];\n// Generalization: Functions taking array parameters should always use the array's own length property."
  },
  {
    "id": 25,
    "question": "What master advice does Sukanta Hui give for scoring full marks on Traversing Using length Property?",
    "shortAnswer": "Traversing Using length Property: Fundamental rule #5 - Comparison: For strings it is str.length(), for arrays it is arr.length without parentheses.",
    "explanation": "In ICSE Class 10 Java, Traversing Using length Property requires strict adherence to memory rules. Every array in Java has a built-in public final integer field called 'length'. Using arr.length rather than a hardcoded number ensures code adaptability, robustness, and eliminates index errors if the array dimension changes. Key requirement: Comparison: For strings it is str.length(), for arrays it is arr.length without parentheses. Always avoid common pitfall: Adding parentheses to array length (arr.length()) causing compiler error: cannot find symbol method length().",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Comparison: For strings it is str.length(), for arrays it is arr.length without parentheses.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 6:\n// TraverseLengthProperty.java\nint[] arr = new int[5];\n// Comparison: For strings it is str.length(), for arrays it is arr.length without parentheses."
  }
];

export default questions;
