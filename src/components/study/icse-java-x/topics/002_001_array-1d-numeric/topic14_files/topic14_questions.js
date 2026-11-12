const questions = [
  {
    "id": 1,
    "question": "What is the algorithmic objective of Finding the Largest Element in an Array?",
    "shortAnswer": "Finding the Largest Element in an Array: Key Rule #1 - Correct Initialization: Always initialize max = arr[0] (or Integer.MIN_VALUE). Never initialize max to 0 if negative numbers can exist.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Largest Element in an Array requires precise pointer and index control. Finding the largest element requires assuming the first element arr[0] is the maximum, then linearly comparing all subsequent elements arr[1] to arr[length-1]. Whenever an element exceeds the current maximum, the maximum is updated. Key syllabus requirement: Correct Initialization: Always initialize max = arr[0] (or Integer.MIN_VALUE). Never initialize max to 0 if negative numbers can exist. Always avoid common pitfall: Initializing max = 0: Fails completely if all elements in the array are negative numbers.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Correct Initialization: Always initialize max = arr[0] (or Integer.MIN_VALUE). Never initialize max to 0 if negative numbers can exist.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// FindLargestBasic.java\n// Correct Initialization: Always initialize max = arr[0] (or Integer.MIN_VALUE). Never initialize max to 0 if negative numbers can exist."
  },
  {
    "id": 2,
    "question": "How does Finding the Largest Element in an Array manage index boundaries?",
    "shortAnswer": "Finding the Largest Element in an Array: Key Rule #2 - Loop Bound: Start scan from index 1 (i = 1 to i < length) since arr[0] is already the baseline.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Largest Element in an Array requires precise pointer and index control. Finding the largest element requires assuming the first element arr[0] is the maximum, then linearly comparing all subsequent elements arr[1] to arr[length-1]. Whenever an element exceeds the current maximum, the maximum is updated. Key syllabus requirement: Loop Bound: Start scan from index 1 (i = 1 to i < length) since arr[0] is already the baseline. Always avoid common pitfall: Starting loop from index 0 instead of 1 (redundant comparison, though harmless).",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Loop Bound: Start scan from index 1 (i = 1 to i < length) since arr[0] is already the baseline.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// FindLargestBasic.java\n// Loop Bound: Start scan from index 1 (i = 1 to i < length) since arr[0] is already the baseline."
  },
  {
    "id": 3,
    "question": "What is the time complexity of Finding the Largest Element in an Array?",
    "shortAnswer": "Finding the Largest Element in an Array: Key Rule #3 - Comparison Check: If arr[i] > max, update max = arr[i].",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Largest Element in an Array requires precise pointer and index control. Finding the largest element requires assuming the first element arr[0] is the maximum, then linearly comparing all subsequent elements arr[1] to arr[length-1]. Whenever an element exceeds the current maximum, the maximum is updated. Key syllabus requirement: Comparison Check: If arr[i] > max, update max = arr[i]. Always avoid common pitfall: Resetting max variable inside the loop body on every iteration.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Comparison Check: If arr[i] > max, update max = arr[i].",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// FindLargestBasic.java\n// Comparison Check: If arr[i] > max, update max = arr[i]."
  },
  {
    "id": 4,
    "question": "What is the space complexity of Finding the Largest Element in an Array?",
    "shortAnswer": "Finding the Largest Element in an Array: Key Rule #4 - Index Tracking: Optionally maintain 'int maxIdx = 0' if the position of the largest element is required.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Largest Element in an Array requires precise pointer and index control. Finding the largest element requires assuming the first element arr[0] is the maximum, then linearly comparing all subsequent elements arr[1] to arr[length-1]. Whenever an element exceeds the current maximum, the maximum is updated. Key syllabus requirement: Index Tracking: Optionally maintain 'int maxIdx = 0' if the position of the largest element is required. Always avoid common pitfall: Initializing max = 0: Fails completely if all elements in the array are negative numbers.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Index Tracking: Optionally maintain 'int maxIdx = 0' if the position of the largest element is required.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// FindLargestBasic.java\n// Index Tracking: Optionally maintain 'int maxIdx = 0' if the position of the largest element is required."
  },
  {
    "id": 5,
    "question": "Which critical ICSE board examination mistake occurs in Finding the Largest Element in an Array?",
    "shortAnswer": "Finding the Largest Element in an Array: Key Rule #5 - Linear Complexity: Completes in exactly n - 1 comparisons, giving O(n) optimal time complexity.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Largest Element in an Array requires precise pointer and index control. Finding the largest element requires assuming the first element arr[0] is the maximum, then linearly comparing all subsequent elements arr[1] to arr[length-1]. Whenever an element exceeds the current maximum, the maximum is updated. Key syllabus requirement: Linear Complexity: Completes in exactly n - 1 comparisons, giving O(n) optimal time complexity. Always avoid common pitfall: Starting loop from index 0 instead of 1 (redundant comparison, though harmless).",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Linear Complexity: Completes in exactly n - 1 comparisons, giving O(n) optimal time complexity.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// FindLargestBasic.java\n// Linear Complexity: Completes in exactly n - 1 comparisons, giving O(n) optimal time complexity."
  },
  {
    "id": 6,
    "question": "How does Finding the Largest Element in an Array handle duplicate numeric values?",
    "shortAnswer": "Finding the Largest Element in an Array: Key Rule #1 - Correct Initialization: Always initialize max = arr[0] (or Integer.MIN_VALUE). Never initialize max to 0 if negative numbers can exist.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Largest Element in an Array requires precise pointer and index control. Finding the largest element requires assuming the first element arr[0] is the maximum, then linearly comparing all subsequent elements arr[1] to arr[length-1]. Whenever an element exceeds the current maximum, the maximum is updated. Key syllabus requirement: Correct Initialization: Always initialize max = arr[0] (or Integer.MIN_VALUE). Never initialize max to 0 if negative numbers can exist. Always avoid common pitfall: Resetting max variable inside the loop body on every iteration.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Correct Initialization: Always initialize max = arr[0] (or Integer.MIN_VALUE). Never initialize max to 0 if negative numbers can exist.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// FindLargestBasic.java\n// Correct Initialization: Always initialize max = arr[0] (or Integer.MIN_VALUE). Never initialize max to 0 if negative numbers can exist."
  },
  {
    "id": 7,
    "question": "How does Finding the Largest Element in an Array behave if all array elements are negative?",
    "shortAnswer": "Finding the Largest Element in an Array: Key Rule #2 - Loop Bound: Start scan from index 1 (i = 1 to i < length) since arr[0] is already the baseline.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Largest Element in an Array requires precise pointer and index control. Finding the largest element requires assuming the first element arr[0] is the maximum, then linearly comparing all subsequent elements arr[1] to arr[length-1]. Whenever an element exceeds the current maximum, the maximum is updated. Key syllabus requirement: Loop Bound: Start scan from index 1 (i = 1 to i < length) since arr[0] is already the baseline. Always avoid common pitfall: Initializing max = 0: Fails completely if all elements in the array are negative numbers.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Loop Bound: Start scan from index 1 (i = 1 to i < length) since arr[0] is already the baseline.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// FindLargestBasic.java\n// Loop Bound: Start scan from index 1 (i = 1 to i < length) since arr[0] is already the baseline."
  },
  {
    "id": 8,
    "question": "What role does a temporary variable play in Finding the Largest Element in an Array?",
    "shortAnswer": "Finding the Largest Element in an Array: Key Rule #3 - Comparison Check: If arr[i] > max, update max = arr[i].",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Largest Element in an Array requires precise pointer and index control. Finding the largest element requires assuming the first element arr[0] is the maximum, then linearly comparing all subsequent elements arr[1] to arr[length-1]. Whenever an element exceeds the current maximum, the maximum is updated. Key syllabus requirement: Comparison Check: If arr[i] > max, update max = arr[i]. Always avoid common pitfall: Starting loop from index 0 instead of 1 (redundant comparison, though harmless).",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Comparison Check: If arr[i] > max, update max = arr[i].",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// FindLargestBasic.java\n// Comparison Check: If arr[i] > max, update max = arr[i]."
  },
  {
    "id": 9,
    "question": "Can Finding the Largest Element in an Array be executed on an array of length 1?",
    "shortAnswer": "Finding the Largest Element in an Array: Key Rule #4 - Index Tracking: Optionally maintain 'int maxIdx = 0' if the position of the largest element is required.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Largest Element in an Array requires precise pointer and index control. Finding the largest element requires assuming the first element arr[0] is the maximum, then linearly comparing all subsequent elements arr[1] to arr[length-1]. Whenever an element exceeds the current maximum, the maximum is updated. Key syllabus requirement: Index Tracking: Optionally maintain 'int maxIdx = 0' if the position of the largest element is required. Always avoid common pitfall: Resetting max variable inside the loop body on every iteration.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Index Tracking: Optionally maintain 'int maxIdx = 0' if the position of the largest element is required.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// FindLargestBasic.java\n// Index Tracking: Optionally maintain 'int maxIdx = 0' if the position of the largest element is required."
  },
  {
    "id": 10,
    "question": "How can loop termination be optimized in Finding the Largest Element in an Array?",
    "shortAnswer": "Finding the Largest Element in an Array: Key Rule #5 - Linear Complexity: Completes in exactly n - 1 comparisons, giving O(n) optimal time complexity.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Largest Element in an Array requires precise pointer and index control. Finding the largest element requires assuming the first element arr[0] is the maximum, then linearly comparing all subsequent elements arr[1] to arr[length-1]. Whenever an element exceeds the current maximum, the maximum is updated. Key syllabus requirement: Linear Complexity: Completes in exactly n - 1 comparisons, giving O(n) optimal time complexity. Always avoid common pitfall: Initializing max = 0: Fails completely if all elements in the array are negative numbers.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Linear Complexity: Completes in exactly n - 1 comparisons, giving O(n) optimal time complexity.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// FindLargestBasic.java\n// Linear Complexity: Completes in exactly n - 1 comparisons, giving O(n) optimal time complexity."
  },
  {
    "id": 11,
    "question": "What is the worst-case scenario for Finding the Largest Element in an Array?",
    "shortAnswer": "Finding the Largest Element in an Array: Key Rule #1 - Correct Initialization: Always initialize max = arr[0] (or Integer.MIN_VALUE). Never initialize max to 0 if negative numbers can exist.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Largest Element in an Array requires precise pointer and index control. Finding the largest element requires assuming the first element arr[0] is the maximum, then linearly comparing all subsequent elements arr[1] to arr[length-1]. Whenever an element exceeds the current maximum, the maximum is updated. Key syllabus requirement: Correct Initialization: Always initialize max = arr[0] (or Integer.MIN_VALUE). Never initialize max to 0 if negative numbers can exist. Always avoid common pitfall: Starting loop from index 0 instead of 1 (redundant comparison, though harmless).",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Correct Initialization: Always initialize max = arr[0] (or Integer.MIN_VALUE). Never initialize max to 0 if negative numbers can exist.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// FindLargestBasic.java\n// Correct Initialization: Always initialize max = arr[0] (or Integer.MIN_VALUE). Never initialize max to 0 if negative numbers can exist."
  },
  {
    "id": 12,
    "question": "What is the best-case scenario for Finding the Largest Element in an Array?",
    "shortAnswer": "Finding the Largest Element in an Array: Key Rule #2 - Loop Bound: Start scan from index 1 (i = 1 to i < length) since arr[0] is already the baseline.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Largest Element in an Array requires precise pointer and index control. Finding the largest element requires assuming the first element arr[0] is the maximum, then linearly comparing all subsequent elements arr[1] to arr[length-1]. Whenever an element exceeds the current maximum, the maximum is updated. Key syllabus requirement: Loop Bound: Start scan from index 1 (i = 1 to i < length) since arr[0] is already the baseline. Always avoid common pitfall: Resetting max variable inside the loop body on every iteration.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Loop Bound: Start scan from index 1 (i = 1 to i < length) since arr[0] is already the baseline.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// FindLargestBasic.java\n// Loop Bound: Start scan from index 1 (i = 1 to i < length) since arr[0] is already the baseline."
  },
  {
    "id": 13,
    "question": "How does Finding the Largest Element in an Array differ between ascending and descending requirements?",
    "shortAnswer": "Finding the Largest Element in an Array: Key Rule #3 - Comparison Check: If arr[i] > max, update max = arr[i].",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Largest Element in an Array requires precise pointer and index control. Finding the largest element requires assuming the first element arr[0] is the maximum, then linearly comparing all subsequent elements arr[1] to arr[length-1]. Whenever an element exceeds the current maximum, the maximum is updated. Key syllabus requirement: Comparison Check: If arr[i] > max, update max = arr[i]. Always avoid common pitfall: Initializing max = 0: Fails completely if all elements in the array are negative numbers.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Comparison Check: If arr[i] > max, update max = arr[i].",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// FindLargestBasic.java\n// Comparison Check: If arr[i] > max, update max = arr[i]."
  },
  {
    "id": 14,
    "question": "How should you write the Variable Description Table (VDT) for Finding the Largest Element in an Array?",
    "shortAnswer": "Finding the Largest Element in an Array: Key Rule #4 - Index Tracking: Optionally maintain 'int maxIdx = 0' if the position of the largest element is required.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Largest Element in an Array requires precise pointer and index control. Finding the largest element requires assuming the first element arr[0] is the maximum, then linearly comparing all subsequent elements arr[1] to arr[length-1]. Whenever an element exceeds the current maximum, the maximum is updated. Key syllabus requirement: Index Tracking: Optionally maintain 'int maxIdx = 0' if the position of the largest element is required. Always avoid common pitfall: Starting loop from index 0 instead of 1 (redundant comparison, though harmless).",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Index Tracking: Optionally maintain 'int maxIdx = 0' if the position of the largest element is required.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// FindLargestBasic.java\n// Index Tracking: Optionally maintain 'int maxIdx = 0' if the position of the largest element is required."
  },
  {
    "id": 15,
    "question": "What happens if the target array reference is null in Finding the Largest Element in an Array?",
    "shortAnswer": "Finding the Largest Element in an Array: Key Rule #5 - Linear Complexity: Completes in exactly n - 1 comparisons, giving O(n) optimal time complexity.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Largest Element in an Array requires precise pointer and index control. Finding the largest element requires assuming the first element arr[0] is the maximum, then linearly comparing all subsequent elements arr[1] to arr[length-1]. Whenever an element exceeds the current maximum, the maximum is updated. Key syllabus requirement: Linear Complexity: Completes in exactly n - 1 comparisons, giving O(n) optimal time complexity. Always avoid common pitfall: Resetting max variable inside the loop body on every iteration.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Linear Complexity: Completes in exactly n - 1 comparisons, giving O(n) optimal time complexity.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// FindLargestBasic.java\n// Linear Complexity: Completes in exactly n - 1 comparisons, giving O(n) optimal time complexity."
  },
  {
    "id": 16,
    "question": "How does BlueJ facilitate testing Finding the Largest Element in an Array?",
    "shortAnswer": "Finding the Largest Element in an Array: Key Rule #1 - Correct Initialization: Always initialize max = arr[0] (or Integer.MIN_VALUE). Never initialize max to 0 if negative numbers can exist.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Largest Element in an Array requires precise pointer and index control. Finding the largest element requires assuming the first element arr[0] is the maximum, then linearly comparing all subsequent elements arr[1] to arr[length-1]. Whenever an element exceeds the current maximum, the maximum is updated. Key syllabus requirement: Correct Initialization: Always initialize max = arr[0] (or Integer.MIN_VALUE). Never initialize max to 0 if negative numbers can exist. Always avoid common pitfall: Initializing max = 0: Fails completely if all elements in the array are negative numbers.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Correct Initialization: Always initialize max = arr[0] (or Integer.MIN_VALUE). Never initialize max to 0 if negative numbers can exist.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// FindLargestBasic.java\n// Correct Initialization: Always initialize max = arr[0] (or Integer.MIN_VALUE). Never initialize max to 0 if negative numbers can exist."
  },
  {
    "id": 17,
    "question": "Can Finding the Largest Element in an Array be implemented using a while loop instead of a for loop?",
    "shortAnswer": "Finding the Largest Element in an Array: Key Rule #2 - Loop Bound: Start scan from index 1 (i = 1 to i < length) since arr[0] is already the baseline.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Largest Element in an Array requires precise pointer and index control. Finding the largest element requires assuming the first element arr[0] is the maximum, then linearly comparing all subsequent elements arr[1] to arr[length-1]. Whenever an element exceeds the current maximum, the maximum is updated. Key syllabus requirement: Loop Bound: Start scan from index 1 (i = 1 to i < length) since arr[0] is already the baseline. Always avoid common pitfall: Starting loop from index 0 instead of 1 (redundant comparison, though harmless).",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Loop Bound: Start scan from index 1 (i = 1 to i < length) since arr[0] is already the baseline.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// FindLargestBasic.java\n// Loop Bound: Start scan from index 1 (i = 1 to i < length) since arr[0] is already the baseline."
  },
  {
    "id": 18,
    "question": "What happens if you check index arr[length] in Finding the Largest Element in an Array?",
    "shortAnswer": "Finding the Largest Element in an Array: Key Rule #3 - Comparison Check: If arr[i] > max, update max = arr[i].",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Largest Element in an Array requires precise pointer and index control. Finding the largest element requires assuming the first element arr[0] is the maximum, then linearly comparing all subsequent elements arr[1] to arr[length-1]. Whenever an element exceeds the current maximum, the maximum is updated. Key syllabus requirement: Comparison Check: If arr[i] > max, update max = arr[i]. Always avoid common pitfall: Resetting max variable inside the loop body on every iteration.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Comparison Check: If arr[i] > max, update max = arr[i].",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// FindLargestBasic.java\n// Comparison Check: If arr[i] > max, update max = arr[i]."
  },
  {
    "id": 19,
    "question": "Why is single-pass preferred over two-pass in Finding the Largest Element in an Array?",
    "shortAnswer": "Finding the Largest Element in an Array: Key Rule #4 - Index Tracking: Optionally maintain 'int maxIdx = 0' if the position of the largest element is required.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Largest Element in an Array requires precise pointer and index control. Finding the largest element requires assuming the first element arr[0] is the maximum, then linearly comparing all subsequent elements arr[1] to arr[length-1]. Whenever an element exceeds the current maximum, the maximum is updated. Key syllabus requirement: Index Tracking: Optionally maintain 'int maxIdx = 0' if the position of the largest element is required. Always avoid common pitfall: Initializing max = 0: Fails completely if all elements in the array are negative numbers.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Index Tracking: Optionally maintain 'int maxIdx = 0' if the position of the largest element is required.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// FindLargestBasic.java\n// Index Tracking: Optionally maintain 'int maxIdx = 0' if the position of the largest element is required."
  },
  {
    "id": 20,
    "question": "How does Finding the Largest Element in an Array interact with Scanner keyboard input?",
    "shortAnswer": "Finding the Largest Element in an Array: Key Rule #5 - Linear Complexity: Completes in exactly n - 1 comparisons, giving O(n) optimal time complexity.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Largest Element in an Array requires precise pointer and index control. Finding the largest element requires assuming the first element arr[0] is the maximum, then linearly comparing all subsequent elements arr[1] to arr[length-1]. Whenever an element exceeds the current maximum, the maximum is updated. Key syllabus requirement: Linear Complexity: Completes in exactly n - 1 comparisons, giving O(n) optimal time complexity. Always avoid common pitfall: Starting loop from index 0 instead of 1 (redundant comparison, though harmless).",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Linear Complexity: Completes in exactly n - 1 comparisons, giving O(n) optimal time complexity.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// FindLargestBasic.java\n// Linear Complexity: Completes in exactly n - 1 comparisons, giving O(n) optimal time complexity."
  },
  {
    "id": 21,
    "question": "Is Finding the Largest Element in an Array considered an in-place algorithm?",
    "shortAnswer": "Finding the Largest Element in an Array: Key Rule #1 - Correct Initialization: Always initialize max = arr[0] (or Integer.MIN_VALUE). Never initialize max to 0 if negative numbers can exist.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Largest Element in an Array requires precise pointer and index control. Finding the largest element requires assuming the first element arr[0] is the maximum, then linearly comparing all subsequent elements arr[1] to arr[length-1]. Whenever an element exceeds the current maximum, the maximum is updated. Key syllabus requirement: Correct Initialization: Always initialize max = arr[0] (or Integer.MIN_VALUE). Never initialize max to 0 if negative numbers can exist. Always avoid common pitfall: Resetting max variable inside the loop body on every iteration.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Correct Initialization: Always initialize max = arr[0] (or Integer.MIN_VALUE). Never initialize max to 0 if negative numbers can exist.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// FindLargestBasic.java\n// Correct Initialization: Always initialize max = arr[0] (or Integer.MIN_VALUE). Never initialize max to 0 if negative numbers can exist."
  },
  {
    "id": 22,
    "question": "What return type should a helper method implementing Finding the Largest Element in an Array have?",
    "shortAnswer": "Finding the Largest Element in an Array: Key Rule #2 - Loop Bound: Start scan from index 1 (i = 1 to i < length) since arr[0] is already the baseline.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Largest Element in an Array requires precise pointer and index control. Finding the largest element requires assuming the first element arr[0] is the maximum, then linearly comparing all subsequent elements arr[1] to arr[length-1]. Whenever an element exceeds the current maximum, the maximum is updated. Key syllabus requirement: Loop Bound: Start scan from index 1 (i = 1 to i < length) since arr[0] is already the baseline. Always avoid common pitfall: Initializing max = 0: Fails completely if all elements in the array are negative numbers.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Loop Bound: Start scan from index 1 (i = 1 to i < length) since arr[0] is already the baseline.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// FindLargestBasic.java\n// Loop Bound: Start scan from index 1 (i = 1 to i < length) since arr[0] is already the baseline."
  },
  {
    "id": 23,
    "question": "How do you print results clearly in Finding the Largest Element in an Array?",
    "shortAnswer": "Finding the Largest Element in an Array: Key Rule #3 - Comparison Check: If arr[i] > max, update max = arr[i].",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Largest Element in an Array requires precise pointer and index control. Finding the largest element requires assuming the first element arr[0] is the maximum, then linearly comparing all subsequent elements arr[1] to arr[length-1]. Whenever an element exceeds the current maximum, the maximum is updated. Key syllabus requirement: Comparison Check: If arr[i] > max, update max = arr[i]. Always avoid common pitfall: Starting loop from index 0 instead of 1 (redundant comparison, though harmless).",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Comparison Check: If arr[i] > max, update max = arr[i].",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// FindLargestBasic.java\n// Comparison Check: If arr[i] > max, update max = arr[i]."
  },
  {
    "id": 24,
    "question": "How many total passes or iterations are executed in Finding the Largest Element in an Array?",
    "shortAnswer": "Finding the Largest Element in an Array: Key Rule #4 - Index Tracking: Optionally maintain 'int maxIdx = 0' if the position of the largest element is required.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Largest Element in an Array requires precise pointer and index control. Finding the largest element requires assuming the first element arr[0] is the maximum, then linearly comparing all subsequent elements arr[1] to arr[length-1]. Whenever an element exceeds the current maximum, the maximum is updated. Key syllabus requirement: Index Tracking: Optionally maintain 'int maxIdx = 0' if the position of the largest element is required. Always avoid common pitfall: Resetting max variable inside the loop body on every iteration.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Index Tracking: Optionally maintain 'int maxIdx = 0' if the position of the largest element is required.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// FindLargestBasic.java\n// Index Tracking: Optionally maintain 'int maxIdx = 0' if the position of the largest element is required."
  },
  {
    "id": 25,
    "question": "What master advice does Sukanta Hui give for scoring full 15/15 on Finding the Largest Element in an Array?",
    "shortAnswer": "Finding the Largest Element in an Array: Key Rule #5 - Linear Complexity: Completes in exactly n - 1 comparisons, giving O(n) optimal time complexity.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Largest Element in an Array requires precise pointer and index control. Finding the largest element requires assuming the first element arr[0] is the maximum, then linearly comparing all subsequent elements arr[1] to arr[length-1]. Whenever an element exceeds the current maximum, the maximum is updated. Key syllabus requirement: Linear Complexity: Completes in exactly n - 1 comparisons, giving O(n) optimal time complexity. Always avoid common pitfall: Initializing max = 0: Fails completely if all elements in the array are negative numbers.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Linear Complexity: Completes in exactly n - 1 comparisons, giving O(n) optimal time complexity.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// FindLargestBasic.java\n// Linear Complexity: Completes in exactly n - 1 comparisons, giving O(n) optimal time complexity."
  }
];

export default questions;
