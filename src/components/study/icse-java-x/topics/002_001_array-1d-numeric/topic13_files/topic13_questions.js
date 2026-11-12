const questions = [
  {
    "id": 1,
    "question": "What is the algorithmic objective of Selection Sort - Descending Order?",
    "shortAnswer": "Selection Sort - Descending Order: Key Rule #1 - Maximum Index Tracking: Assume max_idx = i; search j = i + 1 to n - 1 for arr[j] > arr[max_idx].",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Descending Order requires precise pointer and index control. Descending selection sort identifies the index of the maximum element in the unsorted subarray and places it at index i. With each pass, the next largest number is locked into its correct position at the front. Key syllabus requirement: Maximum Index Tracking: Assume max_idx = i; search j = i + 1 to n - 1 for arr[j] > arr[max_idx]. Always avoid common pitfall: Using '<' instead of '>' in comparison condition, producing ascending rather than descending order.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Maximum Index Tracking: Assume max_idx = i; search j = i + 1 to n - 1 for arr[j] > arr[max_idx].",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SelectionSortDescending.java\n// Maximum Index Tracking: Assume max_idx = i; search j = i + 1 to n - 1 for arr[j] > arr[max_idx]."
  },
  {
    "id": 2,
    "question": "How does Selection Sort - Descending Order manage index boundaries?",
    "shortAnswer": "Selection Sort - Descending Order: Key Rule #2 - Pass Progression: First pass places largest at index 0; second pass places 2nd largest at index 1.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Descending Order requires precise pointer and index control. Descending selection sort identifies the index of the maximum element in the unsorted subarray and places it at index i. With each pass, the next largest number is locked into its correct position at the front. Key syllabus requirement: Pass Progression: First pass places largest at index 0; second pass places 2nd largest at index 1. Always avoid common pitfall: Starting inner loop from j = i instead of j = i + 1, doing a redundant self-comparison.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Pass Progression: First pass places largest at index 0; second pass places 2nd largest at index 1.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SelectionSortDescending.java\n// Pass Progression: First pass places largest at index 0; second pass places 2nd largest at index 1."
  },
  {
    "id": 3,
    "question": "What is the time complexity of Selection Sort - Descending Order?",
    "shortAnswer": "Selection Sort - Descending Order: Key Rule #3 - Swap Efficiency: Swaps at most n - 1 times throughout the entire sorting process.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Descending Order requires precise pointer and index control. Descending selection sort identifies the index of the maximum element in the unsorted subarray and places it at index i. With each pass, the next largest number is locked into its correct position at the front. Key syllabus requirement: Swap Efficiency: Swaps at most n - 1 times throughout the entire sorting process. Always avoid common pitfall: Swapping arr[max_idx] with arr[j] instead of arr[i].",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Swap Efficiency: Swaps at most n - 1 times throughout the entire sorting process.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SelectionSortDescending.java\n// Swap Efficiency: Swaps at most n - 1 times throughout the entire sorting process."
  },
  {
    "id": 4,
    "question": "What is the space complexity of Selection Sort - Descending Order?",
    "shortAnswer": "Selection Sort - Descending Order: Key Rule #4 - Independent of Initial Order: Selection sort always makes the same number of comparisons regardless of initial order.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Descending Order requires precise pointer and index control. Descending selection sort identifies the index of the maximum element in the unsorted subarray and places it at index i. With each pass, the next largest number is locked into its correct position at the front. Key syllabus requirement: Independent of Initial Order: Selection sort always makes the same number of comparisons regardless of initial order. Always avoid common pitfall: Using '<' instead of '>' in comparison condition, producing ascending rather than descending order.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Independent of Initial Order: Selection sort always makes the same number of comparisons regardless of initial order.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SelectionSortDescending.java\n// Independent of Initial Order: Selection sort always makes the same number of comparisons regardless of initial order."
  },
  {
    "id": 5,
    "question": "Which critical ICSE board examination mistake occurs in Selection Sort - Descending Order?",
    "shortAnswer": "Selection Sort - Descending Order: Key Rule #5 - Clean ICSE Implementation: Preferred in ICSE board exams for its clean, deterministic structure.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Descending Order requires precise pointer and index control. Descending selection sort identifies the index of the maximum element in the unsorted subarray and places it at index i. With each pass, the next largest number is locked into its correct position at the front. Key syllabus requirement: Clean ICSE Implementation: Preferred in ICSE board exams for its clean, deterministic structure. Always avoid common pitfall: Starting inner loop from j = i instead of j = i + 1, doing a redundant self-comparison.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Clean ICSE Implementation: Preferred in ICSE board exams for its clean, deterministic structure.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SelectionSortDescending.java\n// Clean ICSE Implementation: Preferred in ICSE board exams for its clean, deterministic structure."
  },
  {
    "id": 6,
    "question": "How does Selection Sort - Descending Order handle duplicate numeric values?",
    "shortAnswer": "Selection Sort - Descending Order: Key Rule #1 - Maximum Index Tracking: Assume max_idx = i; search j = i + 1 to n - 1 for arr[j] > arr[max_idx].",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Descending Order requires precise pointer and index control. Descending selection sort identifies the index of the maximum element in the unsorted subarray and places it at index i. With each pass, the next largest number is locked into its correct position at the front. Key syllabus requirement: Maximum Index Tracking: Assume max_idx = i; search j = i + 1 to n - 1 for arr[j] > arr[max_idx]. Always avoid common pitfall: Swapping arr[max_idx] with arr[j] instead of arr[i].",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Maximum Index Tracking: Assume max_idx = i; search j = i + 1 to n - 1 for arr[j] > arr[max_idx].",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SelectionSortDescending.java\n// Maximum Index Tracking: Assume max_idx = i; search j = i + 1 to n - 1 for arr[j] > arr[max_idx]."
  },
  {
    "id": 7,
    "question": "How does Selection Sort - Descending Order behave if all array elements are negative?",
    "shortAnswer": "Selection Sort - Descending Order: Key Rule #2 - Pass Progression: First pass places largest at index 0; second pass places 2nd largest at index 1.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Descending Order requires precise pointer and index control. Descending selection sort identifies the index of the maximum element in the unsorted subarray and places it at index i. With each pass, the next largest number is locked into its correct position at the front. Key syllabus requirement: Pass Progression: First pass places largest at index 0; second pass places 2nd largest at index 1. Always avoid common pitfall: Using '<' instead of '>' in comparison condition, producing ascending rather than descending order.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Pass Progression: First pass places largest at index 0; second pass places 2nd largest at index 1.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SelectionSortDescending.java\n// Pass Progression: First pass places largest at index 0; second pass places 2nd largest at index 1."
  },
  {
    "id": 8,
    "question": "What role does a temporary variable play in Selection Sort - Descending Order?",
    "shortAnswer": "Selection Sort - Descending Order: Key Rule #3 - Swap Efficiency: Swaps at most n - 1 times throughout the entire sorting process.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Descending Order requires precise pointer and index control. Descending selection sort identifies the index of the maximum element in the unsorted subarray and places it at index i. With each pass, the next largest number is locked into its correct position at the front. Key syllabus requirement: Swap Efficiency: Swaps at most n - 1 times throughout the entire sorting process. Always avoid common pitfall: Starting inner loop from j = i instead of j = i + 1, doing a redundant self-comparison.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Swap Efficiency: Swaps at most n - 1 times throughout the entire sorting process.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SelectionSortDescending.java\n// Swap Efficiency: Swaps at most n - 1 times throughout the entire sorting process."
  },
  {
    "id": 9,
    "question": "Can Selection Sort - Descending Order be executed on an array of length 1?",
    "shortAnswer": "Selection Sort - Descending Order: Key Rule #4 - Independent of Initial Order: Selection sort always makes the same number of comparisons regardless of initial order.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Descending Order requires precise pointer and index control. Descending selection sort identifies the index of the maximum element in the unsorted subarray and places it at index i. With each pass, the next largest number is locked into its correct position at the front. Key syllabus requirement: Independent of Initial Order: Selection sort always makes the same number of comparisons regardless of initial order. Always avoid common pitfall: Swapping arr[max_idx] with arr[j] instead of arr[i].",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Independent of Initial Order: Selection sort always makes the same number of comparisons regardless of initial order.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SelectionSortDescending.java\n// Independent of Initial Order: Selection sort always makes the same number of comparisons regardless of initial order."
  },
  {
    "id": 10,
    "question": "How can loop termination be optimized in Selection Sort - Descending Order?",
    "shortAnswer": "Selection Sort - Descending Order: Key Rule #5 - Clean ICSE Implementation: Preferred in ICSE board exams for its clean, deterministic structure.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Descending Order requires precise pointer and index control. Descending selection sort identifies the index of the maximum element in the unsorted subarray and places it at index i. With each pass, the next largest number is locked into its correct position at the front. Key syllabus requirement: Clean ICSE Implementation: Preferred in ICSE board exams for its clean, deterministic structure. Always avoid common pitfall: Using '<' instead of '>' in comparison condition, producing ascending rather than descending order.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Clean ICSE Implementation: Preferred in ICSE board exams for its clean, deterministic structure.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SelectionSortDescending.java\n// Clean ICSE Implementation: Preferred in ICSE board exams for its clean, deterministic structure."
  },
  {
    "id": 11,
    "question": "What is the worst-case scenario for Selection Sort - Descending Order?",
    "shortAnswer": "Selection Sort - Descending Order: Key Rule #1 - Maximum Index Tracking: Assume max_idx = i; search j = i + 1 to n - 1 for arr[j] > arr[max_idx].",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Descending Order requires precise pointer and index control. Descending selection sort identifies the index of the maximum element in the unsorted subarray and places it at index i. With each pass, the next largest number is locked into its correct position at the front. Key syllabus requirement: Maximum Index Tracking: Assume max_idx = i; search j = i + 1 to n - 1 for arr[j] > arr[max_idx]. Always avoid common pitfall: Starting inner loop from j = i instead of j = i + 1, doing a redundant self-comparison.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Maximum Index Tracking: Assume max_idx = i; search j = i + 1 to n - 1 for arr[j] > arr[max_idx].",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SelectionSortDescending.java\n// Maximum Index Tracking: Assume max_idx = i; search j = i + 1 to n - 1 for arr[j] > arr[max_idx]."
  },
  {
    "id": 12,
    "question": "What is the best-case scenario for Selection Sort - Descending Order?",
    "shortAnswer": "Selection Sort - Descending Order: Key Rule #2 - Pass Progression: First pass places largest at index 0; second pass places 2nd largest at index 1.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Descending Order requires precise pointer and index control. Descending selection sort identifies the index of the maximum element in the unsorted subarray and places it at index i. With each pass, the next largest number is locked into its correct position at the front. Key syllabus requirement: Pass Progression: First pass places largest at index 0; second pass places 2nd largest at index 1. Always avoid common pitfall: Swapping arr[max_idx] with arr[j] instead of arr[i].",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Pass Progression: First pass places largest at index 0; second pass places 2nd largest at index 1.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SelectionSortDescending.java\n// Pass Progression: First pass places largest at index 0; second pass places 2nd largest at index 1."
  },
  {
    "id": 13,
    "question": "How does Selection Sort - Descending Order differ between ascending and descending requirements?",
    "shortAnswer": "Selection Sort - Descending Order: Key Rule #3 - Swap Efficiency: Swaps at most n - 1 times throughout the entire sorting process.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Descending Order requires precise pointer and index control. Descending selection sort identifies the index of the maximum element in the unsorted subarray and places it at index i. With each pass, the next largest number is locked into its correct position at the front. Key syllabus requirement: Swap Efficiency: Swaps at most n - 1 times throughout the entire sorting process. Always avoid common pitfall: Using '<' instead of '>' in comparison condition, producing ascending rather than descending order.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Swap Efficiency: Swaps at most n - 1 times throughout the entire sorting process.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SelectionSortDescending.java\n// Swap Efficiency: Swaps at most n - 1 times throughout the entire sorting process."
  },
  {
    "id": 14,
    "question": "How should you write the Variable Description Table (VDT) for Selection Sort - Descending Order?",
    "shortAnswer": "Selection Sort - Descending Order: Key Rule #4 - Independent of Initial Order: Selection sort always makes the same number of comparisons regardless of initial order.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Descending Order requires precise pointer and index control. Descending selection sort identifies the index of the maximum element in the unsorted subarray and places it at index i. With each pass, the next largest number is locked into its correct position at the front. Key syllabus requirement: Independent of Initial Order: Selection sort always makes the same number of comparisons regardless of initial order. Always avoid common pitfall: Starting inner loop from j = i instead of j = i + 1, doing a redundant self-comparison.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Independent of Initial Order: Selection sort always makes the same number of comparisons regardless of initial order.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SelectionSortDescending.java\n// Independent of Initial Order: Selection sort always makes the same number of comparisons regardless of initial order."
  },
  {
    "id": 15,
    "question": "What happens if the target array reference is null in Selection Sort - Descending Order?",
    "shortAnswer": "Selection Sort - Descending Order: Key Rule #5 - Clean ICSE Implementation: Preferred in ICSE board exams for its clean, deterministic structure.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Descending Order requires precise pointer and index control. Descending selection sort identifies the index of the maximum element in the unsorted subarray and places it at index i. With each pass, the next largest number is locked into its correct position at the front. Key syllabus requirement: Clean ICSE Implementation: Preferred in ICSE board exams for its clean, deterministic structure. Always avoid common pitfall: Swapping arr[max_idx] with arr[j] instead of arr[i].",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Clean ICSE Implementation: Preferred in ICSE board exams for its clean, deterministic structure.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SelectionSortDescending.java\n// Clean ICSE Implementation: Preferred in ICSE board exams for its clean, deterministic structure."
  },
  {
    "id": 16,
    "question": "How does BlueJ facilitate testing Selection Sort - Descending Order?",
    "shortAnswer": "Selection Sort - Descending Order: Key Rule #1 - Maximum Index Tracking: Assume max_idx = i; search j = i + 1 to n - 1 for arr[j] > arr[max_idx].",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Descending Order requires precise pointer and index control. Descending selection sort identifies the index of the maximum element in the unsorted subarray and places it at index i. With each pass, the next largest number is locked into its correct position at the front. Key syllabus requirement: Maximum Index Tracking: Assume max_idx = i; search j = i + 1 to n - 1 for arr[j] > arr[max_idx]. Always avoid common pitfall: Using '<' instead of '>' in comparison condition, producing ascending rather than descending order.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Maximum Index Tracking: Assume max_idx = i; search j = i + 1 to n - 1 for arr[j] > arr[max_idx].",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SelectionSortDescending.java\n// Maximum Index Tracking: Assume max_idx = i; search j = i + 1 to n - 1 for arr[j] > arr[max_idx]."
  },
  {
    "id": 17,
    "question": "Can Selection Sort - Descending Order be implemented using a while loop instead of a for loop?",
    "shortAnswer": "Selection Sort - Descending Order: Key Rule #2 - Pass Progression: First pass places largest at index 0; second pass places 2nd largest at index 1.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Descending Order requires precise pointer and index control. Descending selection sort identifies the index of the maximum element in the unsorted subarray and places it at index i. With each pass, the next largest number is locked into its correct position at the front. Key syllabus requirement: Pass Progression: First pass places largest at index 0; second pass places 2nd largest at index 1. Always avoid common pitfall: Starting inner loop from j = i instead of j = i + 1, doing a redundant self-comparison.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Pass Progression: First pass places largest at index 0; second pass places 2nd largest at index 1.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SelectionSortDescending.java\n// Pass Progression: First pass places largest at index 0; second pass places 2nd largest at index 1."
  },
  {
    "id": 18,
    "question": "What happens if you check index arr[length] in Selection Sort - Descending Order?",
    "shortAnswer": "Selection Sort - Descending Order: Key Rule #3 - Swap Efficiency: Swaps at most n - 1 times throughout the entire sorting process.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Descending Order requires precise pointer and index control. Descending selection sort identifies the index of the maximum element in the unsorted subarray and places it at index i. With each pass, the next largest number is locked into its correct position at the front. Key syllabus requirement: Swap Efficiency: Swaps at most n - 1 times throughout the entire sorting process. Always avoid common pitfall: Swapping arr[max_idx] with arr[j] instead of arr[i].",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Swap Efficiency: Swaps at most n - 1 times throughout the entire sorting process.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SelectionSortDescending.java\n// Swap Efficiency: Swaps at most n - 1 times throughout the entire sorting process."
  },
  {
    "id": 19,
    "question": "Why is single-pass preferred over two-pass in Selection Sort - Descending Order?",
    "shortAnswer": "Selection Sort - Descending Order: Key Rule #4 - Independent of Initial Order: Selection sort always makes the same number of comparisons regardless of initial order.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Descending Order requires precise pointer and index control. Descending selection sort identifies the index of the maximum element in the unsorted subarray and places it at index i. With each pass, the next largest number is locked into its correct position at the front. Key syllabus requirement: Independent of Initial Order: Selection sort always makes the same number of comparisons regardless of initial order. Always avoid common pitfall: Using '<' instead of '>' in comparison condition, producing ascending rather than descending order.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Independent of Initial Order: Selection sort always makes the same number of comparisons regardless of initial order.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SelectionSortDescending.java\n// Independent of Initial Order: Selection sort always makes the same number of comparisons regardless of initial order."
  },
  {
    "id": 20,
    "question": "How does Selection Sort - Descending Order interact with Scanner keyboard input?",
    "shortAnswer": "Selection Sort - Descending Order: Key Rule #5 - Clean ICSE Implementation: Preferred in ICSE board exams for its clean, deterministic structure.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Descending Order requires precise pointer and index control. Descending selection sort identifies the index of the maximum element in the unsorted subarray and places it at index i. With each pass, the next largest number is locked into its correct position at the front. Key syllabus requirement: Clean ICSE Implementation: Preferred in ICSE board exams for its clean, deterministic structure. Always avoid common pitfall: Starting inner loop from j = i instead of j = i + 1, doing a redundant self-comparison.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Clean ICSE Implementation: Preferred in ICSE board exams for its clean, deterministic structure.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SelectionSortDescending.java\n// Clean ICSE Implementation: Preferred in ICSE board exams for its clean, deterministic structure."
  },
  {
    "id": 21,
    "question": "Is Selection Sort - Descending Order considered an in-place algorithm?",
    "shortAnswer": "Selection Sort - Descending Order: Key Rule #1 - Maximum Index Tracking: Assume max_idx = i; search j = i + 1 to n - 1 for arr[j] > arr[max_idx].",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Descending Order requires precise pointer and index control. Descending selection sort identifies the index of the maximum element in the unsorted subarray and places it at index i. With each pass, the next largest number is locked into its correct position at the front. Key syllabus requirement: Maximum Index Tracking: Assume max_idx = i; search j = i + 1 to n - 1 for arr[j] > arr[max_idx]. Always avoid common pitfall: Swapping arr[max_idx] with arr[j] instead of arr[i].",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Maximum Index Tracking: Assume max_idx = i; search j = i + 1 to n - 1 for arr[j] > arr[max_idx].",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SelectionSortDescending.java\n// Maximum Index Tracking: Assume max_idx = i; search j = i + 1 to n - 1 for arr[j] > arr[max_idx]."
  },
  {
    "id": 22,
    "question": "What return type should a helper method implementing Selection Sort - Descending Order have?",
    "shortAnswer": "Selection Sort - Descending Order: Key Rule #2 - Pass Progression: First pass places largest at index 0; second pass places 2nd largest at index 1.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Descending Order requires precise pointer and index control. Descending selection sort identifies the index of the maximum element in the unsorted subarray and places it at index i. With each pass, the next largest number is locked into its correct position at the front. Key syllabus requirement: Pass Progression: First pass places largest at index 0; second pass places 2nd largest at index 1. Always avoid common pitfall: Using '<' instead of '>' in comparison condition, producing ascending rather than descending order.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Pass Progression: First pass places largest at index 0; second pass places 2nd largest at index 1.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SelectionSortDescending.java\n// Pass Progression: First pass places largest at index 0; second pass places 2nd largest at index 1."
  },
  {
    "id": 23,
    "question": "How do you print results clearly in Selection Sort - Descending Order?",
    "shortAnswer": "Selection Sort - Descending Order: Key Rule #3 - Swap Efficiency: Swaps at most n - 1 times throughout the entire sorting process.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Descending Order requires precise pointer and index control. Descending selection sort identifies the index of the maximum element in the unsorted subarray and places it at index i. With each pass, the next largest number is locked into its correct position at the front. Key syllabus requirement: Swap Efficiency: Swaps at most n - 1 times throughout the entire sorting process. Always avoid common pitfall: Starting inner loop from j = i instead of j = i + 1, doing a redundant self-comparison.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Swap Efficiency: Swaps at most n - 1 times throughout the entire sorting process.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SelectionSortDescending.java\n// Swap Efficiency: Swaps at most n - 1 times throughout the entire sorting process."
  },
  {
    "id": 24,
    "question": "How many total passes or iterations are executed in Selection Sort - Descending Order?",
    "shortAnswer": "Selection Sort - Descending Order: Key Rule #4 - Independent of Initial Order: Selection sort always makes the same number of comparisons regardless of initial order.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Descending Order requires precise pointer and index control. Descending selection sort identifies the index of the maximum element in the unsorted subarray and places it at index i. With each pass, the next largest number is locked into its correct position at the front. Key syllabus requirement: Independent of Initial Order: Selection sort always makes the same number of comparisons regardless of initial order. Always avoid common pitfall: Swapping arr[max_idx] with arr[j] instead of arr[i].",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Independent of Initial Order: Selection sort always makes the same number of comparisons regardless of initial order.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SelectionSortDescending.java\n// Independent of Initial Order: Selection sort always makes the same number of comparisons regardless of initial order."
  },
  {
    "id": 25,
    "question": "What master advice does Sukanta Hui give for scoring full 15/15 on Selection Sort - Descending Order?",
    "shortAnswer": "Selection Sort - Descending Order: Key Rule #5 - Clean ICSE Implementation: Preferred in ICSE board exams for its clean, deterministic structure.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Descending Order requires precise pointer and index control. Descending selection sort identifies the index of the maximum element in the unsorted subarray and places it at index i. With each pass, the next largest number is locked into its correct position at the front. Key syllabus requirement: Clean ICSE Implementation: Preferred in ICSE board exams for its clean, deterministic structure. Always avoid common pitfall: Using '<' instead of '>' in comparison condition, producing ascending rather than descending order.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Clean ICSE Implementation: Preferred in ICSE board exams for its clean, deterministic structure.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SelectionSortDescending.java\n// Clean ICSE Implementation: Preferred in ICSE board exams for its clean, deterministic structure."
  }
];

export default questions;
