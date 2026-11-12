const questions = [
  {
    "id": 1,
    "question": "What is the algorithmic objective of Finding the Smallest Element in an Array?",
    "shortAnswer": "Finding the Smallest Element in an Array: Key Rule #1 - Safe Initialization: Always initialize min = arr[0] (or Integer.MAX_VALUE). Never initialize min = 0.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Smallest Element in an Array requires precise pointer and index control. Finding the smallest element assumes arr[0] is the minimum, then sequentially scans indices 1 to length - 1. If any element is strictly less than the current minimum, it replaces the minimum value. Key syllabus requirement: Safe Initialization: Always initialize min = arr[0] (or Integer.MAX_VALUE). Never initialize min = 0. Always avoid common pitfall: Initializing min = 0: If all numbers are positive (e.g. 10, 20, 30), min remains 0 which was never in the array!",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Safe Initialization: Always initialize min = arr[0] (or Integer.MAX_VALUE). Never initialize min = 0.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// FindSmallestBasic.java\n// Safe Initialization: Always initialize min = arr[0] (or Integer.MAX_VALUE). Never initialize min = 0."
  },
  {
    "id": 2,
    "question": "How does Finding the Smallest Element in an Array manage index boundaries?",
    "shortAnswer": "Finding the Smallest Element in an Array: Key Rule #2 - Linear Scan: Loop from i = 1 to i < arr.length.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Smallest Element in an Array requires precise pointer and index control. Finding the smallest element assumes arr[0] is the minimum, then sequentially scans indices 1 to length - 1. If any element is strictly less than the current minimum, it replaces the minimum value. Key syllabus requirement: Linear Scan: Loop from i = 1 to i < arr.length. Always avoid common pitfall: Initializing min to a small positive constant like 999 which fails if array contains larger numbers.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Linear Scan: Loop from i = 1 to i < arr.length.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// FindSmallestBasic.java\n// Linear Scan: Loop from i = 1 to i < arr.length."
  },
  {
    "id": 3,
    "question": "What is the time complexity of Finding the Smallest Element in an Array?",
    "shortAnswer": "Finding the Smallest Element in an Array: Key Rule #3 - Comparison Condition: If arr[i] < min, update min = arr[i].",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Smallest Element in an Array requires precise pointer and index control. Finding the smallest element assumes arr[0] is the minimum, then sequentially scans indices 1 to length - 1. If any element is strictly less than the current minimum, it replaces the minimum value. Key syllabus requirement: Comparison Condition: If arr[i] < min, update min = arr[i]. Always avoid common pitfall: Using '<=' instead of '<' unnecessarily overwriting minIdx on duplicate minimums.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Comparison Condition: If arr[i] < min, update min = arr[i].",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// FindSmallestBasic.java\n// Comparison Condition: If arr[i] < min, update min = arr[i]."
  },
  {
    "id": 4,
    "question": "What is the space complexity of Finding the Smallest Element in an Array?",
    "shortAnswer": "Finding the Smallest Element in an Array: Key Rule #4 - Position Retention: Record 'minIdx = i' whenever a new smaller value is encountered.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Smallest Element in an Array requires precise pointer and index control. Finding the smallest element assumes arr[0] is the minimum, then sequentially scans indices 1 to length - 1. If any element is strictly less than the current minimum, it replaces the minimum value. Key syllabus requirement: Position Retention: Record 'minIdx = i' whenever a new smaller value is encountered. Always avoid common pitfall: Initializing min = 0: If all numbers are positive (e.g. 10, 20, 30), min remains 0 which was never in the array!",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Position Retention: Record 'minIdx = i' whenever a new smaller value is encountered.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// FindSmallestBasic.java\n// Position Retention: Record 'minIdx = i' whenever a new smaller value is encountered."
  },
  {
    "id": 5,
    "question": "Which critical ICSE board examination mistake occurs in Finding the Smallest Element in an Array?",
    "shortAnswer": "Finding the Smallest Element in an Array: Key Rule #5 - Universal Applicability: Works seamlessly with positive, negative, and zero values.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Smallest Element in an Array requires precise pointer and index control. Finding the smallest element assumes arr[0] is the minimum, then sequentially scans indices 1 to length - 1. If any element is strictly less than the current minimum, it replaces the minimum value. Key syllabus requirement: Universal Applicability: Works seamlessly with positive, negative, and zero values. Always avoid common pitfall: Initializing min to a small positive constant like 999 which fails if array contains larger numbers.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Universal Applicability: Works seamlessly with positive, negative, and zero values.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// FindSmallestBasic.java\n// Universal Applicability: Works seamlessly with positive, negative, and zero values."
  },
  {
    "id": 6,
    "question": "How does Finding the Smallest Element in an Array handle duplicate numeric values?",
    "shortAnswer": "Finding the Smallest Element in an Array: Key Rule #1 - Safe Initialization: Always initialize min = arr[0] (or Integer.MAX_VALUE). Never initialize min = 0.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Smallest Element in an Array requires precise pointer and index control. Finding the smallest element assumes arr[0] is the minimum, then sequentially scans indices 1 to length - 1. If any element is strictly less than the current minimum, it replaces the minimum value. Key syllabus requirement: Safe Initialization: Always initialize min = arr[0] (or Integer.MAX_VALUE). Never initialize min = 0. Always avoid common pitfall: Using '<=' instead of '<' unnecessarily overwriting minIdx on duplicate minimums.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Safe Initialization: Always initialize min = arr[0] (or Integer.MAX_VALUE). Never initialize min = 0.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// FindSmallestBasic.java\n// Safe Initialization: Always initialize min = arr[0] (or Integer.MAX_VALUE). Never initialize min = 0."
  },
  {
    "id": 7,
    "question": "How does Finding the Smallest Element in an Array behave if all array elements are negative?",
    "shortAnswer": "Finding the Smallest Element in an Array: Key Rule #2 - Linear Scan: Loop from i = 1 to i < arr.length.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Smallest Element in an Array requires precise pointer and index control. Finding the smallest element assumes arr[0] is the minimum, then sequentially scans indices 1 to length - 1. If any element is strictly less than the current minimum, it replaces the minimum value. Key syllabus requirement: Linear Scan: Loop from i = 1 to i < arr.length. Always avoid common pitfall: Initializing min = 0: If all numbers are positive (e.g. 10, 20, 30), min remains 0 which was never in the array!",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Linear Scan: Loop from i = 1 to i < arr.length.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// FindSmallestBasic.java\n// Linear Scan: Loop from i = 1 to i < arr.length."
  },
  {
    "id": 8,
    "question": "What role does a temporary variable play in Finding the Smallest Element in an Array?",
    "shortAnswer": "Finding the Smallest Element in an Array: Key Rule #3 - Comparison Condition: If arr[i] < min, update min = arr[i].",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Smallest Element in an Array requires precise pointer and index control. Finding the smallest element assumes arr[0] is the minimum, then sequentially scans indices 1 to length - 1. If any element is strictly less than the current minimum, it replaces the minimum value. Key syllabus requirement: Comparison Condition: If arr[i] < min, update min = arr[i]. Always avoid common pitfall: Initializing min to a small positive constant like 999 which fails if array contains larger numbers.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Comparison Condition: If arr[i] < min, update min = arr[i].",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// FindSmallestBasic.java\n// Comparison Condition: If arr[i] < min, update min = arr[i]."
  },
  {
    "id": 9,
    "question": "Can Finding the Smallest Element in an Array be executed on an array of length 1?",
    "shortAnswer": "Finding the Smallest Element in an Array: Key Rule #4 - Position Retention: Record 'minIdx = i' whenever a new smaller value is encountered.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Smallest Element in an Array requires precise pointer and index control. Finding the smallest element assumes arr[0] is the minimum, then sequentially scans indices 1 to length - 1. If any element is strictly less than the current minimum, it replaces the minimum value. Key syllabus requirement: Position Retention: Record 'minIdx = i' whenever a new smaller value is encountered. Always avoid common pitfall: Using '<=' instead of '<' unnecessarily overwriting minIdx on duplicate minimums.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Position Retention: Record 'minIdx = i' whenever a new smaller value is encountered.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// FindSmallestBasic.java\n// Position Retention: Record 'minIdx = i' whenever a new smaller value is encountered."
  },
  {
    "id": 10,
    "question": "How can loop termination be optimized in Finding the Smallest Element in an Array?",
    "shortAnswer": "Finding the Smallest Element in an Array: Key Rule #5 - Universal Applicability: Works seamlessly with positive, negative, and zero values.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Smallest Element in an Array requires precise pointer and index control. Finding the smallest element assumes arr[0] is the minimum, then sequentially scans indices 1 to length - 1. If any element is strictly less than the current minimum, it replaces the minimum value. Key syllabus requirement: Universal Applicability: Works seamlessly with positive, negative, and zero values. Always avoid common pitfall: Initializing min = 0: If all numbers are positive (e.g. 10, 20, 30), min remains 0 which was never in the array!",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Universal Applicability: Works seamlessly with positive, negative, and zero values.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// FindSmallestBasic.java\n// Universal Applicability: Works seamlessly with positive, negative, and zero values."
  },
  {
    "id": 11,
    "question": "What is the worst-case scenario for Finding the Smallest Element in an Array?",
    "shortAnswer": "Finding the Smallest Element in an Array: Key Rule #1 - Safe Initialization: Always initialize min = arr[0] (or Integer.MAX_VALUE). Never initialize min = 0.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Smallest Element in an Array requires precise pointer and index control. Finding the smallest element assumes arr[0] is the minimum, then sequentially scans indices 1 to length - 1. If any element is strictly less than the current minimum, it replaces the minimum value. Key syllabus requirement: Safe Initialization: Always initialize min = arr[0] (or Integer.MAX_VALUE). Never initialize min = 0. Always avoid common pitfall: Initializing min to a small positive constant like 999 which fails if array contains larger numbers.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Safe Initialization: Always initialize min = arr[0] (or Integer.MAX_VALUE). Never initialize min = 0.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// FindSmallestBasic.java\n// Safe Initialization: Always initialize min = arr[0] (or Integer.MAX_VALUE). Never initialize min = 0."
  },
  {
    "id": 12,
    "question": "What is the best-case scenario for Finding the Smallest Element in an Array?",
    "shortAnswer": "Finding the Smallest Element in an Array: Key Rule #2 - Linear Scan: Loop from i = 1 to i < arr.length.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Smallest Element in an Array requires precise pointer and index control. Finding the smallest element assumes arr[0] is the minimum, then sequentially scans indices 1 to length - 1. If any element is strictly less than the current minimum, it replaces the minimum value. Key syllabus requirement: Linear Scan: Loop from i = 1 to i < arr.length. Always avoid common pitfall: Using '<=' instead of '<' unnecessarily overwriting minIdx on duplicate minimums.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Linear Scan: Loop from i = 1 to i < arr.length.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// FindSmallestBasic.java\n// Linear Scan: Loop from i = 1 to i < arr.length."
  },
  {
    "id": 13,
    "question": "How does Finding the Smallest Element in an Array differ between ascending and descending requirements?",
    "shortAnswer": "Finding the Smallest Element in an Array: Key Rule #3 - Comparison Condition: If arr[i] < min, update min = arr[i].",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Smallest Element in an Array requires precise pointer and index control. Finding the smallest element assumes arr[0] is the minimum, then sequentially scans indices 1 to length - 1. If any element is strictly less than the current minimum, it replaces the minimum value. Key syllabus requirement: Comparison Condition: If arr[i] < min, update min = arr[i]. Always avoid common pitfall: Initializing min = 0: If all numbers are positive (e.g. 10, 20, 30), min remains 0 which was never in the array!",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Comparison Condition: If arr[i] < min, update min = arr[i].",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// FindSmallestBasic.java\n// Comparison Condition: If arr[i] < min, update min = arr[i]."
  },
  {
    "id": 14,
    "question": "How should you write the Variable Description Table (VDT) for Finding the Smallest Element in an Array?",
    "shortAnswer": "Finding the Smallest Element in an Array: Key Rule #4 - Position Retention: Record 'minIdx = i' whenever a new smaller value is encountered.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Smallest Element in an Array requires precise pointer and index control. Finding the smallest element assumes arr[0] is the minimum, then sequentially scans indices 1 to length - 1. If any element is strictly less than the current minimum, it replaces the minimum value. Key syllabus requirement: Position Retention: Record 'minIdx = i' whenever a new smaller value is encountered. Always avoid common pitfall: Initializing min to a small positive constant like 999 which fails if array contains larger numbers.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Position Retention: Record 'minIdx = i' whenever a new smaller value is encountered.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// FindSmallestBasic.java\n// Position Retention: Record 'minIdx = i' whenever a new smaller value is encountered."
  },
  {
    "id": 15,
    "question": "What happens if the target array reference is null in Finding the Smallest Element in an Array?",
    "shortAnswer": "Finding the Smallest Element in an Array: Key Rule #5 - Universal Applicability: Works seamlessly with positive, negative, and zero values.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Smallest Element in an Array requires precise pointer and index control. Finding the smallest element assumes arr[0] is the minimum, then sequentially scans indices 1 to length - 1. If any element is strictly less than the current minimum, it replaces the minimum value. Key syllabus requirement: Universal Applicability: Works seamlessly with positive, negative, and zero values. Always avoid common pitfall: Using '<=' instead of '<' unnecessarily overwriting minIdx on duplicate minimums.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Universal Applicability: Works seamlessly with positive, negative, and zero values.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// FindSmallestBasic.java\n// Universal Applicability: Works seamlessly with positive, negative, and zero values."
  },
  {
    "id": 16,
    "question": "How does BlueJ facilitate testing Finding the Smallest Element in an Array?",
    "shortAnswer": "Finding the Smallest Element in an Array: Key Rule #1 - Safe Initialization: Always initialize min = arr[0] (or Integer.MAX_VALUE). Never initialize min = 0.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Smallest Element in an Array requires precise pointer and index control. Finding the smallest element assumes arr[0] is the minimum, then sequentially scans indices 1 to length - 1. If any element is strictly less than the current minimum, it replaces the minimum value. Key syllabus requirement: Safe Initialization: Always initialize min = arr[0] (or Integer.MAX_VALUE). Never initialize min = 0. Always avoid common pitfall: Initializing min = 0: If all numbers are positive (e.g. 10, 20, 30), min remains 0 which was never in the array!",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Safe Initialization: Always initialize min = arr[0] (or Integer.MAX_VALUE). Never initialize min = 0.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// FindSmallestBasic.java\n// Safe Initialization: Always initialize min = arr[0] (or Integer.MAX_VALUE). Never initialize min = 0."
  },
  {
    "id": 17,
    "question": "Can Finding the Smallest Element in an Array be implemented using a while loop instead of a for loop?",
    "shortAnswer": "Finding the Smallest Element in an Array: Key Rule #2 - Linear Scan: Loop from i = 1 to i < arr.length.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Smallest Element in an Array requires precise pointer and index control. Finding the smallest element assumes arr[0] is the minimum, then sequentially scans indices 1 to length - 1. If any element is strictly less than the current minimum, it replaces the minimum value. Key syllabus requirement: Linear Scan: Loop from i = 1 to i < arr.length. Always avoid common pitfall: Initializing min to a small positive constant like 999 which fails if array contains larger numbers.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Linear Scan: Loop from i = 1 to i < arr.length.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// FindSmallestBasic.java\n// Linear Scan: Loop from i = 1 to i < arr.length."
  },
  {
    "id": 18,
    "question": "What happens if you check index arr[length] in Finding the Smallest Element in an Array?",
    "shortAnswer": "Finding the Smallest Element in an Array: Key Rule #3 - Comparison Condition: If arr[i] < min, update min = arr[i].",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Smallest Element in an Array requires precise pointer and index control. Finding the smallest element assumes arr[0] is the minimum, then sequentially scans indices 1 to length - 1. If any element is strictly less than the current minimum, it replaces the minimum value. Key syllabus requirement: Comparison Condition: If arr[i] < min, update min = arr[i]. Always avoid common pitfall: Using '<=' instead of '<' unnecessarily overwriting minIdx on duplicate minimums.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Comparison Condition: If arr[i] < min, update min = arr[i].",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// FindSmallestBasic.java\n// Comparison Condition: If arr[i] < min, update min = arr[i]."
  },
  {
    "id": 19,
    "question": "Why is single-pass preferred over two-pass in Finding the Smallest Element in an Array?",
    "shortAnswer": "Finding the Smallest Element in an Array: Key Rule #4 - Position Retention: Record 'minIdx = i' whenever a new smaller value is encountered.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Smallest Element in an Array requires precise pointer and index control. Finding the smallest element assumes arr[0] is the minimum, then sequentially scans indices 1 to length - 1. If any element is strictly less than the current minimum, it replaces the minimum value. Key syllabus requirement: Position Retention: Record 'minIdx = i' whenever a new smaller value is encountered. Always avoid common pitfall: Initializing min = 0: If all numbers are positive (e.g. 10, 20, 30), min remains 0 which was never in the array!",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Position Retention: Record 'minIdx = i' whenever a new smaller value is encountered.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// FindSmallestBasic.java\n// Position Retention: Record 'minIdx = i' whenever a new smaller value is encountered."
  },
  {
    "id": 20,
    "question": "How does Finding the Smallest Element in an Array interact with Scanner keyboard input?",
    "shortAnswer": "Finding the Smallest Element in an Array: Key Rule #5 - Universal Applicability: Works seamlessly with positive, negative, and zero values.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Smallest Element in an Array requires precise pointer and index control. Finding the smallest element assumes arr[0] is the minimum, then sequentially scans indices 1 to length - 1. If any element is strictly less than the current minimum, it replaces the minimum value. Key syllabus requirement: Universal Applicability: Works seamlessly with positive, negative, and zero values. Always avoid common pitfall: Initializing min to a small positive constant like 999 which fails if array contains larger numbers.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Universal Applicability: Works seamlessly with positive, negative, and zero values.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// FindSmallestBasic.java\n// Universal Applicability: Works seamlessly with positive, negative, and zero values."
  },
  {
    "id": 21,
    "question": "Is Finding the Smallest Element in an Array considered an in-place algorithm?",
    "shortAnswer": "Finding the Smallest Element in an Array: Key Rule #1 - Safe Initialization: Always initialize min = arr[0] (or Integer.MAX_VALUE). Never initialize min = 0.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Smallest Element in an Array requires precise pointer and index control. Finding the smallest element assumes arr[0] is the minimum, then sequentially scans indices 1 to length - 1. If any element is strictly less than the current minimum, it replaces the minimum value. Key syllabus requirement: Safe Initialization: Always initialize min = arr[0] (or Integer.MAX_VALUE). Never initialize min = 0. Always avoid common pitfall: Using '<=' instead of '<' unnecessarily overwriting minIdx on duplicate minimums.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Safe Initialization: Always initialize min = arr[0] (or Integer.MAX_VALUE). Never initialize min = 0.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// FindSmallestBasic.java\n// Safe Initialization: Always initialize min = arr[0] (or Integer.MAX_VALUE). Never initialize min = 0."
  },
  {
    "id": 22,
    "question": "What return type should a helper method implementing Finding the Smallest Element in an Array have?",
    "shortAnswer": "Finding the Smallest Element in an Array: Key Rule #2 - Linear Scan: Loop from i = 1 to i < arr.length.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Smallest Element in an Array requires precise pointer and index control. Finding the smallest element assumes arr[0] is the minimum, then sequentially scans indices 1 to length - 1. If any element is strictly less than the current minimum, it replaces the minimum value. Key syllabus requirement: Linear Scan: Loop from i = 1 to i < arr.length. Always avoid common pitfall: Initializing min = 0: If all numbers are positive (e.g. 10, 20, 30), min remains 0 which was never in the array!",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Linear Scan: Loop from i = 1 to i < arr.length.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// FindSmallestBasic.java\n// Linear Scan: Loop from i = 1 to i < arr.length."
  },
  {
    "id": 23,
    "question": "How do you print results clearly in Finding the Smallest Element in an Array?",
    "shortAnswer": "Finding the Smallest Element in an Array: Key Rule #3 - Comparison Condition: If arr[i] < min, update min = arr[i].",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Smallest Element in an Array requires precise pointer and index control. Finding the smallest element assumes arr[0] is the minimum, then sequentially scans indices 1 to length - 1. If any element is strictly less than the current minimum, it replaces the minimum value. Key syllabus requirement: Comparison Condition: If arr[i] < min, update min = arr[i]. Always avoid common pitfall: Initializing min to a small positive constant like 999 which fails if array contains larger numbers.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Comparison Condition: If arr[i] < min, update min = arr[i].",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// FindSmallestBasic.java\n// Comparison Condition: If arr[i] < min, update min = arr[i]."
  },
  {
    "id": 24,
    "question": "How many total passes or iterations are executed in Finding the Smallest Element in an Array?",
    "shortAnswer": "Finding the Smallest Element in an Array: Key Rule #4 - Position Retention: Record 'minIdx = i' whenever a new smaller value is encountered.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Smallest Element in an Array requires precise pointer and index control. Finding the smallest element assumes arr[0] is the minimum, then sequentially scans indices 1 to length - 1. If any element is strictly less than the current minimum, it replaces the minimum value. Key syllabus requirement: Position Retention: Record 'minIdx = i' whenever a new smaller value is encountered. Always avoid common pitfall: Using '<=' instead of '<' unnecessarily overwriting minIdx on duplicate minimums.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Position Retention: Record 'minIdx = i' whenever a new smaller value is encountered.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// FindSmallestBasic.java\n// Position Retention: Record 'minIdx = i' whenever a new smaller value is encountered."
  },
  {
    "id": 25,
    "question": "What master advice does Sukanta Hui give for scoring full 15/15 on Finding the Smallest Element in an Array?",
    "shortAnswer": "Finding the Smallest Element in an Array: Key Rule #5 - Universal Applicability: Works seamlessly with positive, negative, and zero values.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Smallest Element in an Array requires precise pointer and index control. Finding the smallest element assumes arr[0] is the minimum, then sequentially scans indices 1 to length - 1. If any element is strictly less than the current minimum, it replaces the minimum value. Key syllabus requirement: Universal Applicability: Works seamlessly with positive, negative, and zero values. Always avoid common pitfall: Initializing min = 0: If all numbers are positive (e.g. 10, 20, 30), min remains 0 which was never in the array!",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Universal Applicability: Works seamlessly with positive, negative, and zero values.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// FindSmallestBasic.java\n// Universal Applicability: Works seamlessly with positive, negative, and zero values."
  }
];

export default questions;
