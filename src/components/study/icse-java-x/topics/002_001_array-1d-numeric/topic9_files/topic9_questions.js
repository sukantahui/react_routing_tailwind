const questions = [
  {
    "id": 1,
    "question": "What is the algorithmic objective of Binary Search in Sorted Arrays?",
    "shortAnswer": "Binary Search in Sorted Arrays: Key Rule #1 - Prerequisite Condition: The array MUST be sorted in ascending or descending order prior to search.",
    "explanation": "In ICSE Class 10 Computer Applications, Binary Search in Sorted Arrays requires precise pointer and index control. Binary search repeatedly divides a sorted search interval in half. By comparing the target with the middle element (mid = (low + high) / 2), it eliminates half the remaining elements each step, achieving fast O(log n) performance. Key syllabus requirement: Prerequisite Condition: The array MUST be sorted in ascending or descending order prior to search. Always avoid common pitfall: Applying binary search on an unsorted array leading to unpredictable incorrect results.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Prerequisite Condition: The array MUST be sorted in ascending or descending order prior to search.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 9:\n// BinarySearchBasic.java\n// Prerequisite Condition: The array MUST be sorted in ascending or descending order prior to search."
  },
  {
    "id": 2,
    "question": "How does Binary Search in Sorted Arrays manage index boundaries?",
    "shortAnswer": "Binary Search in Sorted Arrays: Key Rule #2 - Three Pointers: Maintain 'low = 0', 'high = length - 1', and calculate 'mid = (low + high) / 2'.",
    "explanation": "In ICSE Class 10 Computer Applications, Binary Search in Sorted Arrays requires precise pointer and index control. Binary search repeatedly divides a sorted search interval in half. By comparing the target with the middle element (mid = (low + high) / 2), it eliminates half the remaining elements each step, achieving fast O(log n) performance. Key syllabus requirement: Three Pointers: Maintain 'low = 0', 'high = length - 1', and calculate 'mid = (low + high) / 2'. Always avoid common pitfall: Updating pointers incorrectly (e.g. high = mid instead of high = mid - 1 causing infinite loops).",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Three Pointers: Maintain 'low = 0', 'high = length - 1', and calculate 'mid = (low + high) / 2'.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 9:\n// BinarySearchBasic.java\n// Three Pointers: Maintain 'low = 0', 'high = length - 1', and calculate 'mid = (low + high) / 2'."
  },
  {
    "id": 3,
    "question": "What is the time complexity of Binary Search in Sorted Arrays?",
    "shortAnswer": "Binary Search in Sorted Arrays: Key Rule #3 - Branch Logic: If arr[mid] == target, found; if target < arr[mid], high = mid - 1; else low = mid + 1.",
    "explanation": "In ICSE Class 10 Computer Applications, Binary Search in Sorted Arrays requires precise pointer and index control. Binary search repeatedly divides a sorted search interval in half. By comparing the target with the middle element (mid = (low + high) / 2), it eliminates half the remaining elements each step, achieving fast O(log n) performance. Key syllabus requirement: Branch Logic: If arr[mid] == target, found; if target < arr[mid], high = mid - 1; else low = mid + 1. Always avoid common pitfall: Using loop condition 'low < high' instead of 'low <= high', missing single-element matches.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Branch Logic: If arr[mid] == target, found; if target < arr[mid], high = mid - 1; else low = mid + 1.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 9:\n// BinarySearchBasic.java\n// Branch Logic: If arr[mid] == target, found; if target < arr[mid], high = mid - 1; else low = mid + 1."
  },
  {
    "id": 4,
    "question": "What is the space complexity of Binary Search in Sorted Arrays?",
    "shortAnswer": "Binary Search in Sorted Arrays: Key Rule #4 - Termination Condition: Loop continues while low <= high; terminates when low > high if not found.",
    "explanation": "In ICSE Class 10 Computer Applications, Binary Search in Sorted Arrays requires precise pointer and index control. Binary search repeatedly divides a sorted search interval in half. By comparing the target with the middle element (mid = (low + high) / 2), it eliminates half the remaining elements each step, achieving fast O(log n) performance. Key syllabus requirement: Termination Condition: Loop continues while low <= high; terminates when low > high if not found. Always avoid common pitfall: Applying binary search on an unsorted array leading to unpredictable incorrect results.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Termination Condition: Loop continues while low <= high; terminates when low > high if not found.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 9:\n// BinarySearchBasic.java\n// Termination Condition: Loop continues while low <= high; terminates when low > high if not found."
  },
  {
    "id": 5,
    "question": "Which critical ICSE board examination mistake occurs in Binary Search in Sorted Arrays?",
    "shortAnswer": "Binary Search in Sorted Arrays: Key Rule #5 - Logarithmic Efficiency: Halves the search space every iteration, taking at most log2(n) comparisons.",
    "explanation": "In ICSE Class 10 Computer Applications, Binary Search in Sorted Arrays requires precise pointer and index control. Binary search repeatedly divides a sorted search interval in half. By comparing the target with the middle element (mid = (low + high) / 2), it eliminates half the remaining elements each step, achieving fast O(log n) performance. Key syllabus requirement: Logarithmic Efficiency: Halves the search space every iteration, taking at most log2(n) comparisons. Always avoid common pitfall: Updating pointers incorrectly (e.g. high = mid instead of high = mid - 1 causing infinite loops).",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Logarithmic Efficiency: Halves the search space every iteration, taking at most log2(n) comparisons.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 9:\n// BinarySearchBasic.java\n// Logarithmic Efficiency: Halves the search space every iteration, taking at most log2(n) comparisons."
  },
  {
    "id": 6,
    "question": "How does Binary Search in Sorted Arrays handle duplicate numeric values?",
    "shortAnswer": "Binary Search in Sorted Arrays: Key Rule #1 - Prerequisite Condition: The array MUST be sorted in ascending or descending order prior to search.",
    "explanation": "In ICSE Class 10 Computer Applications, Binary Search in Sorted Arrays requires precise pointer and index control. Binary search repeatedly divides a sorted search interval in half. By comparing the target with the middle element (mid = (low + high) / 2), it eliminates half the remaining elements each step, achieving fast O(log n) performance. Key syllabus requirement: Prerequisite Condition: The array MUST be sorted in ascending or descending order prior to search. Always avoid common pitfall: Using loop condition 'low < high' instead of 'low <= high', missing single-element matches.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Prerequisite Condition: The array MUST be sorted in ascending or descending order prior to search.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 9:\n// BinarySearchBasic.java\n// Prerequisite Condition: The array MUST be sorted in ascending or descending order prior to search."
  },
  {
    "id": 7,
    "question": "How does Binary Search in Sorted Arrays behave if all array elements are negative?",
    "shortAnswer": "Binary Search in Sorted Arrays: Key Rule #2 - Three Pointers: Maintain 'low = 0', 'high = length - 1', and calculate 'mid = (low + high) / 2'.",
    "explanation": "In ICSE Class 10 Computer Applications, Binary Search in Sorted Arrays requires precise pointer and index control. Binary search repeatedly divides a sorted search interval in half. By comparing the target with the middle element (mid = (low + high) / 2), it eliminates half the remaining elements each step, achieving fast O(log n) performance. Key syllabus requirement: Three Pointers: Maintain 'low = 0', 'high = length - 1', and calculate 'mid = (low + high) / 2'. Always avoid common pitfall: Applying binary search on an unsorted array leading to unpredictable incorrect results.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Three Pointers: Maintain 'low = 0', 'high = length - 1', and calculate 'mid = (low + high) / 2'.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 9:\n// BinarySearchBasic.java\n// Three Pointers: Maintain 'low = 0', 'high = length - 1', and calculate 'mid = (low + high) / 2'."
  },
  {
    "id": 8,
    "question": "What role does a temporary variable play in Binary Search in Sorted Arrays?",
    "shortAnswer": "Binary Search in Sorted Arrays: Key Rule #3 - Branch Logic: If arr[mid] == target, found; if target < arr[mid], high = mid - 1; else low = mid + 1.",
    "explanation": "In ICSE Class 10 Computer Applications, Binary Search in Sorted Arrays requires precise pointer and index control. Binary search repeatedly divides a sorted search interval in half. By comparing the target with the middle element (mid = (low + high) / 2), it eliminates half the remaining elements each step, achieving fast O(log n) performance. Key syllabus requirement: Branch Logic: If arr[mid] == target, found; if target < arr[mid], high = mid - 1; else low = mid + 1. Always avoid common pitfall: Updating pointers incorrectly (e.g. high = mid instead of high = mid - 1 causing infinite loops).",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Branch Logic: If arr[mid] == target, found; if target < arr[mid], high = mid - 1; else low = mid + 1.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 9:\n// BinarySearchBasic.java\n// Branch Logic: If arr[mid] == target, found; if target < arr[mid], high = mid - 1; else low = mid + 1."
  },
  {
    "id": 9,
    "question": "Can Binary Search in Sorted Arrays be executed on an array of length 1?",
    "shortAnswer": "Binary Search in Sorted Arrays: Key Rule #4 - Termination Condition: Loop continues while low <= high; terminates when low > high if not found.",
    "explanation": "In ICSE Class 10 Computer Applications, Binary Search in Sorted Arrays requires precise pointer and index control. Binary search repeatedly divides a sorted search interval in half. By comparing the target with the middle element (mid = (low + high) / 2), it eliminates half the remaining elements each step, achieving fast O(log n) performance. Key syllabus requirement: Termination Condition: Loop continues while low <= high; terminates when low > high if not found. Always avoid common pitfall: Using loop condition 'low < high' instead of 'low <= high', missing single-element matches.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Termination Condition: Loop continues while low <= high; terminates when low > high if not found.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 9:\n// BinarySearchBasic.java\n// Termination Condition: Loop continues while low <= high; terminates when low > high if not found."
  },
  {
    "id": 10,
    "question": "How can loop termination be optimized in Binary Search in Sorted Arrays?",
    "shortAnswer": "Binary Search in Sorted Arrays: Key Rule #5 - Logarithmic Efficiency: Halves the search space every iteration, taking at most log2(n) comparisons.",
    "explanation": "In ICSE Class 10 Computer Applications, Binary Search in Sorted Arrays requires precise pointer and index control. Binary search repeatedly divides a sorted search interval in half. By comparing the target with the middle element (mid = (low + high) / 2), it eliminates half the remaining elements each step, achieving fast O(log n) performance. Key syllabus requirement: Logarithmic Efficiency: Halves the search space every iteration, taking at most log2(n) comparisons. Always avoid common pitfall: Applying binary search on an unsorted array leading to unpredictable incorrect results.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Logarithmic Efficiency: Halves the search space every iteration, taking at most log2(n) comparisons.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 9:\n// BinarySearchBasic.java\n// Logarithmic Efficiency: Halves the search space every iteration, taking at most log2(n) comparisons."
  },
  {
    "id": 11,
    "question": "What is the worst-case scenario for Binary Search in Sorted Arrays?",
    "shortAnswer": "Binary Search in Sorted Arrays: Key Rule #1 - Prerequisite Condition: The array MUST be sorted in ascending or descending order prior to search.",
    "explanation": "In ICSE Class 10 Computer Applications, Binary Search in Sorted Arrays requires precise pointer and index control. Binary search repeatedly divides a sorted search interval in half. By comparing the target with the middle element (mid = (low + high) / 2), it eliminates half the remaining elements each step, achieving fast O(log n) performance. Key syllabus requirement: Prerequisite Condition: The array MUST be sorted in ascending or descending order prior to search. Always avoid common pitfall: Updating pointers incorrectly (e.g. high = mid instead of high = mid - 1 causing infinite loops).",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Prerequisite Condition: The array MUST be sorted in ascending or descending order prior to search.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 9:\n// BinarySearchBasic.java\n// Prerequisite Condition: The array MUST be sorted in ascending or descending order prior to search."
  },
  {
    "id": 12,
    "question": "What is the best-case scenario for Binary Search in Sorted Arrays?",
    "shortAnswer": "Binary Search in Sorted Arrays: Key Rule #2 - Three Pointers: Maintain 'low = 0', 'high = length - 1', and calculate 'mid = (low + high) / 2'.",
    "explanation": "In ICSE Class 10 Computer Applications, Binary Search in Sorted Arrays requires precise pointer and index control. Binary search repeatedly divides a sorted search interval in half. By comparing the target with the middle element (mid = (low + high) / 2), it eliminates half the remaining elements each step, achieving fast O(log n) performance. Key syllabus requirement: Three Pointers: Maintain 'low = 0', 'high = length - 1', and calculate 'mid = (low + high) / 2'. Always avoid common pitfall: Using loop condition 'low < high' instead of 'low <= high', missing single-element matches.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Three Pointers: Maintain 'low = 0', 'high = length - 1', and calculate 'mid = (low + high) / 2'.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 9:\n// BinarySearchBasic.java\n// Three Pointers: Maintain 'low = 0', 'high = length - 1', and calculate 'mid = (low + high) / 2'."
  },
  {
    "id": 13,
    "question": "How does Binary Search in Sorted Arrays differ between ascending and descending requirements?",
    "shortAnswer": "Binary Search in Sorted Arrays: Key Rule #3 - Branch Logic: If arr[mid] == target, found; if target < arr[mid], high = mid - 1; else low = mid + 1.",
    "explanation": "In ICSE Class 10 Computer Applications, Binary Search in Sorted Arrays requires precise pointer and index control. Binary search repeatedly divides a sorted search interval in half. By comparing the target with the middle element (mid = (low + high) / 2), it eliminates half the remaining elements each step, achieving fast O(log n) performance. Key syllabus requirement: Branch Logic: If arr[mid] == target, found; if target < arr[mid], high = mid - 1; else low = mid + 1. Always avoid common pitfall: Applying binary search on an unsorted array leading to unpredictable incorrect results.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Branch Logic: If arr[mid] == target, found; if target < arr[mid], high = mid - 1; else low = mid + 1.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 9:\n// BinarySearchBasic.java\n// Branch Logic: If arr[mid] == target, found; if target < arr[mid], high = mid - 1; else low = mid + 1."
  },
  {
    "id": 14,
    "question": "How should you write the Variable Description Table (VDT) for Binary Search in Sorted Arrays?",
    "shortAnswer": "Binary Search in Sorted Arrays: Key Rule #4 - Termination Condition: Loop continues while low <= high; terminates when low > high if not found.",
    "explanation": "In ICSE Class 10 Computer Applications, Binary Search in Sorted Arrays requires precise pointer and index control. Binary search repeatedly divides a sorted search interval in half. By comparing the target with the middle element (mid = (low + high) / 2), it eliminates half the remaining elements each step, achieving fast O(log n) performance. Key syllabus requirement: Termination Condition: Loop continues while low <= high; terminates when low > high if not found. Always avoid common pitfall: Updating pointers incorrectly (e.g. high = mid instead of high = mid - 1 causing infinite loops).",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Termination Condition: Loop continues while low <= high; terminates when low > high if not found.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 9:\n// BinarySearchBasic.java\n// Termination Condition: Loop continues while low <= high; terminates when low > high if not found."
  },
  {
    "id": 15,
    "question": "What happens if the target array reference is null in Binary Search in Sorted Arrays?",
    "shortAnswer": "Binary Search in Sorted Arrays: Key Rule #5 - Logarithmic Efficiency: Halves the search space every iteration, taking at most log2(n) comparisons.",
    "explanation": "In ICSE Class 10 Computer Applications, Binary Search in Sorted Arrays requires precise pointer and index control. Binary search repeatedly divides a sorted search interval in half. By comparing the target with the middle element (mid = (low + high) / 2), it eliminates half the remaining elements each step, achieving fast O(log n) performance. Key syllabus requirement: Logarithmic Efficiency: Halves the search space every iteration, taking at most log2(n) comparisons. Always avoid common pitfall: Using loop condition 'low < high' instead of 'low <= high', missing single-element matches.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Logarithmic Efficiency: Halves the search space every iteration, taking at most log2(n) comparisons.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 9:\n// BinarySearchBasic.java\n// Logarithmic Efficiency: Halves the search space every iteration, taking at most log2(n) comparisons."
  },
  {
    "id": 16,
    "question": "How does BlueJ facilitate testing Binary Search in Sorted Arrays?",
    "shortAnswer": "Binary Search in Sorted Arrays: Key Rule #1 - Prerequisite Condition: The array MUST be sorted in ascending or descending order prior to search.",
    "explanation": "In ICSE Class 10 Computer Applications, Binary Search in Sorted Arrays requires precise pointer and index control. Binary search repeatedly divides a sorted search interval in half. By comparing the target with the middle element (mid = (low + high) / 2), it eliminates half the remaining elements each step, achieving fast O(log n) performance. Key syllabus requirement: Prerequisite Condition: The array MUST be sorted in ascending or descending order prior to search. Always avoid common pitfall: Applying binary search on an unsorted array leading to unpredictable incorrect results.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Prerequisite Condition: The array MUST be sorted in ascending or descending order prior to search.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 9:\n// BinarySearchBasic.java\n// Prerequisite Condition: The array MUST be sorted in ascending or descending order prior to search."
  },
  {
    "id": 17,
    "question": "Can Binary Search in Sorted Arrays be implemented using a while loop instead of a for loop?",
    "shortAnswer": "Binary Search in Sorted Arrays: Key Rule #2 - Three Pointers: Maintain 'low = 0', 'high = length - 1', and calculate 'mid = (low + high) / 2'.",
    "explanation": "In ICSE Class 10 Computer Applications, Binary Search in Sorted Arrays requires precise pointer and index control. Binary search repeatedly divides a sorted search interval in half. By comparing the target with the middle element (mid = (low + high) / 2), it eliminates half the remaining elements each step, achieving fast O(log n) performance. Key syllabus requirement: Three Pointers: Maintain 'low = 0', 'high = length - 1', and calculate 'mid = (low + high) / 2'. Always avoid common pitfall: Updating pointers incorrectly (e.g. high = mid instead of high = mid - 1 causing infinite loops).",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Three Pointers: Maintain 'low = 0', 'high = length - 1', and calculate 'mid = (low + high) / 2'.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 9:\n// BinarySearchBasic.java\n// Three Pointers: Maintain 'low = 0', 'high = length - 1', and calculate 'mid = (low + high) / 2'."
  },
  {
    "id": 18,
    "question": "What happens if you check index arr[length] in Binary Search in Sorted Arrays?",
    "shortAnswer": "Binary Search in Sorted Arrays: Key Rule #3 - Branch Logic: If arr[mid] == target, found; if target < arr[mid], high = mid - 1; else low = mid + 1.",
    "explanation": "In ICSE Class 10 Computer Applications, Binary Search in Sorted Arrays requires precise pointer and index control. Binary search repeatedly divides a sorted search interval in half. By comparing the target with the middle element (mid = (low + high) / 2), it eliminates half the remaining elements each step, achieving fast O(log n) performance. Key syllabus requirement: Branch Logic: If arr[mid] == target, found; if target < arr[mid], high = mid - 1; else low = mid + 1. Always avoid common pitfall: Using loop condition 'low < high' instead of 'low <= high', missing single-element matches.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Branch Logic: If arr[mid] == target, found; if target < arr[mid], high = mid - 1; else low = mid + 1.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 9:\n// BinarySearchBasic.java\n// Branch Logic: If arr[mid] == target, found; if target < arr[mid], high = mid - 1; else low = mid + 1."
  },
  {
    "id": 19,
    "question": "Why is single-pass preferred over two-pass in Binary Search in Sorted Arrays?",
    "shortAnswer": "Binary Search in Sorted Arrays: Key Rule #4 - Termination Condition: Loop continues while low <= high; terminates when low > high if not found.",
    "explanation": "In ICSE Class 10 Computer Applications, Binary Search in Sorted Arrays requires precise pointer and index control. Binary search repeatedly divides a sorted search interval in half. By comparing the target with the middle element (mid = (low + high) / 2), it eliminates half the remaining elements each step, achieving fast O(log n) performance. Key syllabus requirement: Termination Condition: Loop continues while low <= high; terminates when low > high if not found. Always avoid common pitfall: Applying binary search on an unsorted array leading to unpredictable incorrect results.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Termination Condition: Loop continues while low <= high; terminates when low > high if not found.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 9:\n// BinarySearchBasic.java\n// Termination Condition: Loop continues while low <= high; terminates when low > high if not found."
  },
  {
    "id": 20,
    "question": "How does Binary Search in Sorted Arrays interact with Scanner keyboard input?",
    "shortAnswer": "Binary Search in Sorted Arrays: Key Rule #5 - Logarithmic Efficiency: Halves the search space every iteration, taking at most log2(n) comparisons.",
    "explanation": "In ICSE Class 10 Computer Applications, Binary Search in Sorted Arrays requires precise pointer and index control. Binary search repeatedly divides a sorted search interval in half. By comparing the target with the middle element (mid = (low + high) / 2), it eliminates half the remaining elements each step, achieving fast O(log n) performance. Key syllabus requirement: Logarithmic Efficiency: Halves the search space every iteration, taking at most log2(n) comparisons. Always avoid common pitfall: Updating pointers incorrectly (e.g. high = mid instead of high = mid - 1 causing infinite loops).",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Logarithmic Efficiency: Halves the search space every iteration, taking at most log2(n) comparisons.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 9:\n// BinarySearchBasic.java\n// Logarithmic Efficiency: Halves the search space every iteration, taking at most log2(n) comparisons."
  },
  {
    "id": 21,
    "question": "Is Binary Search in Sorted Arrays considered an in-place algorithm?",
    "shortAnswer": "Binary Search in Sorted Arrays: Key Rule #1 - Prerequisite Condition: The array MUST be sorted in ascending or descending order prior to search.",
    "explanation": "In ICSE Class 10 Computer Applications, Binary Search in Sorted Arrays requires precise pointer and index control. Binary search repeatedly divides a sorted search interval in half. By comparing the target with the middle element (mid = (low + high) / 2), it eliminates half the remaining elements each step, achieving fast O(log n) performance. Key syllabus requirement: Prerequisite Condition: The array MUST be sorted in ascending or descending order prior to search. Always avoid common pitfall: Using loop condition 'low < high' instead of 'low <= high', missing single-element matches.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Prerequisite Condition: The array MUST be sorted in ascending or descending order prior to search.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 9:\n// BinarySearchBasic.java\n// Prerequisite Condition: The array MUST be sorted in ascending or descending order prior to search."
  },
  {
    "id": 22,
    "question": "What return type should a helper method implementing Binary Search in Sorted Arrays have?",
    "shortAnswer": "Binary Search in Sorted Arrays: Key Rule #2 - Three Pointers: Maintain 'low = 0', 'high = length - 1', and calculate 'mid = (low + high) / 2'.",
    "explanation": "In ICSE Class 10 Computer Applications, Binary Search in Sorted Arrays requires precise pointer and index control. Binary search repeatedly divides a sorted search interval in half. By comparing the target with the middle element (mid = (low + high) / 2), it eliminates half the remaining elements each step, achieving fast O(log n) performance. Key syllabus requirement: Three Pointers: Maintain 'low = 0', 'high = length - 1', and calculate 'mid = (low + high) / 2'. Always avoid common pitfall: Applying binary search on an unsorted array leading to unpredictable incorrect results.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Three Pointers: Maintain 'low = 0', 'high = length - 1', and calculate 'mid = (low + high) / 2'.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 9:\n// BinarySearchBasic.java\n// Three Pointers: Maintain 'low = 0', 'high = length - 1', and calculate 'mid = (low + high) / 2'."
  },
  {
    "id": 23,
    "question": "How do you print results clearly in Binary Search in Sorted Arrays?",
    "shortAnswer": "Binary Search in Sorted Arrays: Key Rule #3 - Branch Logic: If arr[mid] == target, found; if target < arr[mid], high = mid - 1; else low = mid + 1.",
    "explanation": "In ICSE Class 10 Computer Applications, Binary Search in Sorted Arrays requires precise pointer and index control. Binary search repeatedly divides a sorted search interval in half. By comparing the target with the middle element (mid = (low + high) / 2), it eliminates half the remaining elements each step, achieving fast O(log n) performance. Key syllabus requirement: Branch Logic: If arr[mid] == target, found; if target < arr[mid], high = mid - 1; else low = mid + 1. Always avoid common pitfall: Updating pointers incorrectly (e.g. high = mid instead of high = mid - 1 causing infinite loops).",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Branch Logic: If arr[mid] == target, found; if target < arr[mid], high = mid - 1; else low = mid + 1.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 9:\n// BinarySearchBasic.java\n// Branch Logic: If arr[mid] == target, found; if target < arr[mid], high = mid - 1; else low = mid + 1."
  },
  {
    "id": 24,
    "question": "How many total passes or iterations are executed in Binary Search in Sorted Arrays?",
    "shortAnswer": "Binary Search in Sorted Arrays: Key Rule #4 - Termination Condition: Loop continues while low <= high; terminates when low > high if not found.",
    "explanation": "In ICSE Class 10 Computer Applications, Binary Search in Sorted Arrays requires precise pointer and index control. Binary search repeatedly divides a sorted search interval in half. By comparing the target with the middle element (mid = (low + high) / 2), it eliminates half the remaining elements each step, achieving fast O(log n) performance. Key syllabus requirement: Termination Condition: Loop continues while low <= high; terminates when low > high if not found. Always avoid common pitfall: Using loop condition 'low < high' instead of 'low <= high', missing single-element matches.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Termination Condition: Loop continues while low <= high; terminates when low > high if not found.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 9:\n// BinarySearchBasic.java\n// Termination Condition: Loop continues while low <= high; terminates when low > high if not found."
  },
  {
    "id": 25,
    "question": "What master advice does Sukanta Hui give for scoring full 15/15 on Binary Search in Sorted Arrays?",
    "shortAnswer": "Binary Search in Sorted Arrays: Key Rule #5 - Logarithmic Efficiency: Halves the search space every iteration, taking at most log2(n) comparisons.",
    "explanation": "In ICSE Class 10 Computer Applications, Binary Search in Sorted Arrays requires precise pointer and index control. Binary search repeatedly divides a sorted search interval in half. By comparing the target with the middle element (mid = (low + high) / 2), it eliminates half the remaining elements each step, achieving fast O(log n) performance. Key syllabus requirement: Logarithmic Efficiency: Halves the search space every iteration, taking at most log2(n) comparisons. Always avoid common pitfall: Applying binary search on an unsorted array leading to unpredictable incorrect results.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Logarithmic Efficiency: Halves the search space every iteration, taking at most log2(n) comparisons.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 9:\n// BinarySearchBasic.java\n// Logarithmic Efficiency: Halves the search space every iteration, taking at most log2(n) comparisons."
  }
];

export default questions;
