const questions = [
  {
    "id": 1,
    "question": "What is the algorithmic objective of Bubble Sort - Ascending Order?",
    "shortAnswer": "Bubble Sort - Ascending Order: Key Rule #1 - Adjacent Swapping: Compare arr[j] with arr[j+1]; swap if arr[j] > arr[j+1] for ascending order.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Ascending Order requires precise pointer and index control. Bubble sort repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order (arr[j] > arr[j+1]). After each complete outer pass, the largest remaining element bubbles to its final rightmost position. Key syllabus requirement: Adjacent Swapping: Compare arr[j] with arr[j+1]; swap if arr[j] > arr[j+1] for ascending order. Always avoid common pitfall: Inner loop bound error (j < n instead of j < n - 1 - i) causing ArrayIndexOutOfBoundsException when checking arr[j+1].",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Adjacent Swapping: Compare arr[j] with arr[j+1]; swap if arr[j] > arr[j+1] for ascending order.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// BubbleSortBasic.java\n// Adjacent Swapping: Compare arr[j] with arr[j+1]; swap if arr[j] > arr[j+1] for ascending order."
  },
  {
    "id": 2,
    "question": "How does Bubble Sort - Ascending Order manage index boundaries?",
    "shortAnswer": "Bubble Sort - Ascending Order: Key Rule #2 - Outer Loop Bounds: Runs (n - 1) passes from i = 0 to i < n - 1.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Ascending Order requires precise pointer and index control. Bubble sort repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order (arr[j] > arr[j+1]). After each complete outer pass, the largest remaining element bubbles to its final rightmost position. Key syllabus requirement: Outer Loop Bounds: Runs (n - 1) passes from i = 0 to i < n - 1. Always avoid common pitfall: Overwriting values during swap without using a temporary variable.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Outer Loop Bounds: Runs (n - 1) passes from i = 0 to i < n - 1.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// BubbleSortBasic.java\n// Outer Loop Bounds: Runs (n - 1) passes from i = 0 to i < n - 1."
  },
  {
    "id": 3,
    "question": "What is the time complexity of Bubble Sort - Ascending Order?",
    "shortAnswer": "Bubble Sort - Ascending Order: Key Rule #3 - Inner Loop Optimization: Runs from j = 0 to j < n - 1 - i to skip already sorted end elements.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Ascending Order requires precise pointer and index control. Bubble sort repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order (arr[j] > arr[j+1]). After each complete outer pass, the largest remaining element bubbles to its final rightmost position. Key syllabus requirement: Inner Loop Optimization: Runs from j = 0 to j < n - 1 - i to skip already sorted end elements. Always avoid common pitfall: Confusing ascending condition (>) with descending condition (<).",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Inner Loop Optimization: Runs from j = 0 to j < n - 1 - i to skip already sorted end elements.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// BubbleSortBasic.java\n// Inner Loop Optimization: Runs from j = 0 to j < n - 1 - i to skip already sorted end elements."
  },
  {
    "id": 4,
    "question": "What is the space complexity of Bubble Sort - Ascending Order?",
    "shortAnswer": "Bubble Sort - Ascending Order: Key Rule #4 - Temporary Variable Swap: Swap requires a temporary variable: int temp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = temp;.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Ascending Order requires precise pointer and index control. Bubble sort repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order (arr[j] > arr[j+1]). After each complete outer pass, the largest remaining element bubbles to its final rightmost position. Key syllabus requirement: Temporary Variable Swap: Swap requires a temporary variable: int temp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = temp;. Always avoid common pitfall: Inner loop bound error (j < n instead of j < n - 1 - i) causing ArrayIndexOutOfBoundsException when checking arr[j+1].",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Temporary Variable Swap: Swap requires a temporary variable: int temp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = temp;.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// BubbleSortBasic.java\n// Temporary Variable Swap: Swap requires a temporary variable: int temp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = temp;."
  },
  {
    "id": 5,
    "question": "Which critical ICSE board examination mistake occurs in Bubble Sort - Ascending Order?",
    "shortAnswer": "Bubble Sort - Ascending Order: Key Rule #5 - Quadratic Complexity: Performs O(n^2) comparisons in average and worst cases.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Ascending Order requires precise pointer and index control. Bubble sort repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order (arr[j] > arr[j+1]). After each complete outer pass, the largest remaining element bubbles to its final rightmost position. Key syllabus requirement: Quadratic Complexity: Performs O(n^2) comparisons in average and worst cases. Always avoid common pitfall: Overwriting values during swap without using a temporary variable.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Quadratic Complexity: Performs O(n^2) comparisons in average and worst cases.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// BubbleSortBasic.java\n// Quadratic Complexity: Performs O(n^2) comparisons in average and worst cases."
  },
  {
    "id": 6,
    "question": "How does Bubble Sort - Ascending Order handle duplicate numeric values?",
    "shortAnswer": "Bubble Sort - Ascending Order: Key Rule #1 - Adjacent Swapping: Compare arr[j] with arr[j+1]; swap if arr[j] > arr[j+1] for ascending order.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Ascending Order requires precise pointer and index control. Bubble sort repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order (arr[j] > arr[j+1]). After each complete outer pass, the largest remaining element bubbles to its final rightmost position. Key syllabus requirement: Adjacent Swapping: Compare arr[j] with arr[j+1]; swap if arr[j] > arr[j+1] for ascending order. Always avoid common pitfall: Confusing ascending condition (>) with descending condition (<).",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Adjacent Swapping: Compare arr[j] with arr[j+1]; swap if arr[j] > arr[j+1] for ascending order.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// BubbleSortBasic.java\n// Adjacent Swapping: Compare arr[j] with arr[j+1]; swap if arr[j] > arr[j+1] for ascending order."
  },
  {
    "id": 7,
    "question": "How does Bubble Sort - Ascending Order behave if all array elements are negative?",
    "shortAnswer": "Bubble Sort - Ascending Order: Key Rule #2 - Outer Loop Bounds: Runs (n - 1) passes from i = 0 to i < n - 1.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Ascending Order requires precise pointer and index control. Bubble sort repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order (arr[j] > arr[j+1]). After each complete outer pass, the largest remaining element bubbles to its final rightmost position. Key syllabus requirement: Outer Loop Bounds: Runs (n - 1) passes from i = 0 to i < n - 1. Always avoid common pitfall: Inner loop bound error (j < n instead of j < n - 1 - i) causing ArrayIndexOutOfBoundsException when checking arr[j+1].",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Outer Loop Bounds: Runs (n - 1) passes from i = 0 to i < n - 1.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// BubbleSortBasic.java\n// Outer Loop Bounds: Runs (n - 1) passes from i = 0 to i < n - 1."
  },
  {
    "id": 8,
    "question": "What role does a temporary variable play in Bubble Sort - Ascending Order?",
    "shortAnswer": "Bubble Sort - Ascending Order: Key Rule #3 - Inner Loop Optimization: Runs from j = 0 to j < n - 1 - i to skip already sorted end elements.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Ascending Order requires precise pointer and index control. Bubble sort repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order (arr[j] > arr[j+1]). After each complete outer pass, the largest remaining element bubbles to its final rightmost position. Key syllabus requirement: Inner Loop Optimization: Runs from j = 0 to j < n - 1 - i to skip already sorted end elements. Always avoid common pitfall: Overwriting values during swap without using a temporary variable.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Inner Loop Optimization: Runs from j = 0 to j < n - 1 - i to skip already sorted end elements.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// BubbleSortBasic.java\n// Inner Loop Optimization: Runs from j = 0 to j < n - 1 - i to skip already sorted end elements."
  },
  {
    "id": 9,
    "question": "Can Bubble Sort - Ascending Order be executed on an array of length 1?",
    "shortAnswer": "Bubble Sort - Ascending Order: Key Rule #4 - Temporary Variable Swap: Swap requires a temporary variable: int temp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = temp;.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Ascending Order requires precise pointer and index control. Bubble sort repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order (arr[j] > arr[j+1]). After each complete outer pass, the largest remaining element bubbles to its final rightmost position. Key syllabus requirement: Temporary Variable Swap: Swap requires a temporary variable: int temp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = temp;. Always avoid common pitfall: Confusing ascending condition (>) with descending condition (<).",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Temporary Variable Swap: Swap requires a temporary variable: int temp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = temp;.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// BubbleSortBasic.java\n// Temporary Variable Swap: Swap requires a temporary variable: int temp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = temp;."
  },
  {
    "id": 10,
    "question": "How can loop termination be optimized in Bubble Sort - Ascending Order?",
    "shortAnswer": "Bubble Sort - Ascending Order: Key Rule #5 - Quadratic Complexity: Performs O(n^2) comparisons in average and worst cases.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Ascending Order requires precise pointer and index control. Bubble sort repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order (arr[j] > arr[j+1]). After each complete outer pass, the largest remaining element bubbles to its final rightmost position. Key syllabus requirement: Quadratic Complexity: Performs O(n^2) comparisons in average and worst cases. Always avoid common pitfall: Inner loop bound error (j < n instead of j < n - 1 - i) causing ArrayIndexOutOfBoundsException when checking arr[j+1].",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Quadratic Complexity: Performs O(n^2) comparisons in average and worst cases.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// BubbleSortBasic.java\n// Quadratic Complexity: Performs O(n^2) comparisons in average and worst cases."
  },
  {
    "id": 11,
    "question": "What is the worst-case scenario for Bubble Sort - Ascending Order?",
    "shortAnswer": "Bubble Sort - Ascending Order: Key Rule #1 - Adjacent Swapping: Compare arr[j] with arr[j+1]; swap if arr[j] > arr[j+1] for ascending order.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Ascending Order requires precise pointer and index control. Bubble sort repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order (arr[j] > arr[j+1]). After each complete outer pass, the largest remaining element bubbles to its final rightmost position. Key syllabus requirement: Adjacent Swapping: Compare arr[j] with arr[j+1]; swap if arr[j] > arr[j+1] for ascending order. Always avoid common pitfall: Overwriting values during swap without using a temporary variable.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Adjacent Swapping: Compare arr[j] with arr[j+1]; swap if arr[j] > arr[j+1] for ascending order.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// BubbleSortBasic.java\n// Adjacent Swapping: Compare arr[j] with arr[j+1]; swap if arr[j] > arr[j+1] for ascending order."
  },
  {
    "id": 12,
    "question": "What is the best-case scenario for Bubble Sort - Ascending Order?",
    "shortAnswer": "Bubble Sort - Ascending Order: Key Rule #2 - Outer Loop Bounds: Runs (n - 1) passes from i = 0 to i < n - 1.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Ascending Order requires precise pointer and index control. Bubble sort repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order (arr[j] > arr[j+1]). After each complete outer pass, the largest remaining element bubbles to its final rightmost position. Key syllabus requirement: Outer Loop Bounds: Runs (n - 1) passes from i = 0 to i < n - 1. Always avoid common pitfall: Confusing ascending condition (>) with descending condition (<).",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Outer Loop Bounds: Runs (n - 1) passes from i = 0 to i < n - 1.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// BubbleSortBasic.java\n// Outer Loop Bounds: Runs (n - 1) passes from i = 0 to i < n - 1."
  },
  {
    "id": 13,
    "question": "How does Bubble Sort - Ascending Order differ between ascending and descending requirements?",
    "shortAnswer": "Bubble Sort - Ascending Order: Key Rule #3 - Inner Loop Optimization: Runs from j = 0 to j < n - 1 - i to skip already sorted end elements.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Ascending Order requires precise pointer and index control. Bubble sort repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order (arr[j] > arr[j+1]). After each complete outer pass, the largest remaining element bubbles to its final rightmost position. Key syllabus requirement: Inner Loop Optimization: Runs from j = 0 to j < n - 1 - i to skip already sorted end elements. Always avoid common pitfall: Inner loop bound error (j < n instead of j < n - 1 - i) causing ArrayIndexOutOfBoundsException when checking arr[j+1].",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Inner Loop Optimization: Runs from j = 0 to j < n - 1 - i to skip already sorted end elements.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// BubbleSortBasic.java\n// Inner Loop Optimization: Runs from j = 0 to j < n - 1 - i to skip already sorted end elements."
  },
  {
    "id": 14,
    "question": "How should you write the Variable Description Table (VDT) for Bubble Sort - Ascending Order?",
    "shortAnswer": "Bubble Sort - Ascending Order: Key Rule #4 - Temporary Variable Swap: Swap requires a temporary variable: int temp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = temp;.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Ascending Order requires precise pointer and index control. Bubble sort repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order (arr[j] > arr[j+1]). After each complete outer pass, the largest remaining element bubbles to its final rightmost position. Key syllabus requirement: Temporary Variable Swap: Swap requires a temporary variable: int temp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = temp;. Always avoid common pitfall: Overwriting values during swap without using a temporary variable.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Temporary Variable Swap: Swap requires a temporary variable: int temp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = temp;.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// BubbleSortBasic.java\n// Temporary Variable Swap: Swap requires a temporary variable: int temp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = temp;."
  },
  {
    "id": 15,
    "question": "What happens if the target array reference is null in Bubble Sort - Ascending Order?",
    "shortAnswer": "Bubble Sort - Ascending Order: Key Rule #5 - Quadratic Complexity: Performs O(n^2) comparisons in average and worst cases.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Ascending Order requires precise pointer and index control. Bubble sort repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order (arr[j] > arr[j+1]). After each complete outer pass, the largest remaining element bubbles to its final rightmost position. Key syllabus requirement: Quadratic Complexity: Performs O(n^2) comparisons in average and worst cases. Always avoid common pitfall: Confusing ascending condition (>) with descending condition (<).",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Quadratic Complexity: Performs O(n^2) comparisons in average and worst cases.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// BubbleSortBasic.java\n// Quadratic Complexity: Performs O(n^2) comparisons in average and worst cases."
  },
  {
    "id": 16,
    "question": "How does BlueJ facilitate testing Bubble Sort - Ascending Order?",
    "shortAnswer": "Bubble Sort - Ascending Order: Key Rule #1 - Adjacent Swapping: Compare arr[j] with arr[j+1]; swap if arr[j] > arr[j+1] for ascending order.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Ascending Order requires precise pointer and index control. Bubble sort repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order (arr[j] > arr[j+1]). After each complete outer pass, the largest remaining element bubbles to its final rightmost position. Key syllabus requirement: Adjacent Swapping: Compare arr[j] with arr[j+1]; swap if arr[j] > arr[j+1] for ascending order. Always avoid common pitfall: Inner loop bound error (j < n instead of j < n - 1 - i) causing ArrayIndexOutOfBoundsException when checking arr[j+1].",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Adjacent Swapping: Compare arr[j] with arr[j+1]; swap if arr[j] > arr[j+1] for ascending order.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// BubbleSortBasic.java\n// Adjacent Swapping: Compare arr[j] with arr[j+1]; swap if arr[j] > arr[j+1] for ascending order."
  },
  {
    "id": 17,
    "question": "Can Bubble Sort - Ascending Order be implemented using a while loop instead of a for loop?",
    "shortAnswer": "Bubble Sort - Ascending Order: Key Rule #2 - Outer Loop Bounds: Runs (n - 1) passes from i = 0 to i < n - 1.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Ascending Order requires precise pointer and index control. Bubble sort repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order (arr[j] > arr[j+1]). After each complete outer pass, the largest remaining element bubbles to its final rightmost position. Key syllabus requirement: Outer Loop Bounds: Runs (n - 1) passes from i = 0 to i < n - 1. Always avoid common pitfall: Overwriting values during swap without using a temporary variable.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Outer Loop Bounds: Runs (n - 1) passes from i = 0 to i < n - 1.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// BubbleSortBasic.java\n// Outer Loop Bounds: Runs (n - 1) passes from i = 0 to i < n - 1."
  },
  {
    "id": 18,
    "question": "What happens if you check index arr[length] in Bubble Sort - Ascending Order?",
    "shortAnswer": "Bubble Sort - Ascending Order: Key Rule #3 - Inner Loop Optimization: Runs from j = 0 to j < n - 1 - i to skip already sorted end elements.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Ascending Order requires precise pointer and index control. Bubble sort repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order (arr[j] > arr[j+1]). After each complete outer pass, the largest remaining element bubbles to its final rightmost position. Key syllabus requirement: Inner Loop Optimization: Runs from j = 0 to j < n - 1 - i to skip already sorted end elements. Always avoid common pitfall: Confusing ascending condition (>) with descending condition (<).",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Inner Loop Optimization: Runs from j = 0 to j < n - 1 - i to skip already sorted end elements.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// BubbleSortBasic.java\n// Inner Loop Optimization: Runs from j = 0 to j < n - 1 - i to skip already sorted end elements."
  },
  {
    "id": 19,
    "question": "Why is single-pass preferred over two-pass in Bubble Sort - Ascending Order?",
    "shortAnswer": "Bubble Sort - Ascending Order: Key Rule #4 - Temporary Variable Swap: Swap requires a temporary variable: int temp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = temp;.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Ascending Order requires precise pointer and index control. Bubble sort repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order (arr[j] > arr[j+1]). After each complete outer pass, the largest remaining element bubbles to its final rightmost position. Key syllabus requirement: Temporary Variable Swap: Swap requires a temporary variable: int temp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = temp;. Always avoid common pitfall: Inner loop bound error (j < n instead of j < n - 1 - i) causing ArrayIndexOutOfBoundsException when checking arr[j+1].",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Temporary Variable Swap: Swap requires a temporary variable: int temp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = temp;.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// BubbleSortBasic.java\n// Temporary Variable Swap: Swap requires a temporary variable: int temp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = temp;."
  },
  {
    "id": 20,
    "question": "How does Bubble Sort - Ascending Order interact with Scanner keyboard input?",
    "shortAnswer": "Bubble Sort - Ascending Order: Key Rule #5 - Quadratic Complexity: Performs O(n^2) comparisons in average and worst cases.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Ascending Order requires precise pointer and index control. Bubble sort repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order (arr[j] > arr[j+1]). After each complete outer pass, the largest remaining element bubbles to its final rightmost position. Key syllabus requirement: Quadratic Complexity: Performs O(n^2) comparisons in average and worst cases. Always avoid common pitfall: Overwriting values during swap without using a temporary variable.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Quadratic Complexity: Performs O(n^2) comparisons in average and worst cases.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// BubbleSortBasic.java\n// Quadratic Complexity: Performs O(n^2) comparisons in average and worst cases."
  },
  {
    "id": 21,
    "question": "Is Bubble Sort - Ascending Order considered an in-place algorithm?",
    "shortAnswer": "Bubble Sort - Ascending Order: Key Rule #1 - Adjacent Swapping: Compare arr[j] with arr[j+1]; swap if arr[j] > arr[j+1] for ascending order.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Ascending Order requires precise pointer and index control. Bubble sort repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order (arr[j] > arr[j+1]). After each complete outer pass, the largest remaining element bubbles to its final rightmost position. Key syllabus requirement: Adjacent Swapping: Compare arr[j] with arr[j+1]; swap if arr[j] > arr[j+1] for ascending order. Always avoid common pitfall: Confusing ascending condition (>) with descending condition (<).",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Adjacent Swapping: Compare arr[j] with arr[j+1]; swap if arr[j] > arr[j+1] for ascending order.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// BubbleSortBasic.java\n// Adjacent Swapping: Compare arr[j] with arr[j+1]; swap if arr[j] > arr[j+1] for ascending order."
  },
  {
    "id": 22,
    "question": "What return type should a helper method implementing Bubble Sort - Ascending Order have?",
    "shortAnswer": "Bubble Sort - Ascending Order: Key Rule #2 - Outer Loop Bounds: Runs (n - 1) passes from i = 0 to i < n - 1.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Ascending Order requires precise pointer and index control. Bubble sort repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order (arr[j] > arr[j+1]). After each complete outer pass, the largest remaining element bubbles to its final rightmost position. Key syllabus requirement: Outer Loop Bounds: Runs (n - 1) passes from i = 0 to i < n - 1. Always avoid common pitfall: Inner loop bound error (j < n instead of j < n - 1 - i) causing ArrayIndexOutOfBoundsException when checking arr[j+1].",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Outer Loop Bounds: Runs (n - 1) passes from i = 0 to i < n - 1.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// BubbleSortBasic.java\n// Outer Loop Bounds: Runs (n - 1) passes from i = 0 to i < n - 1."
  },
  {
    "id": 23,
    "question": "How do you print results clearly in Bubble Sort - Ascending Order?",
    "shortAnswer": "Bubble Sort - Ascending Order: Key Rule #3 - Inner Loop Optimization: Runs from j = 0 to j < n - 1 - i to skip already sorted end elements.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Ascending Order requires precise pointer and index control. Bubble sort repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order (arr[j] > arr[j+1]). After each complete outer pass, the largest remaining element bubbles to its final rightmost position. Key syllabus requirement: Inner Loop Optimization: Runs from j = 0 to j < n - 1 - i to skip already sorted end elements. Always avoid common pitfall: Overwriting values during swap without using a temporary variable.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Inner Loop Optimization: Runs from j = 0 to j < n - 1 - i to skip already sorted end elements.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// BubbleSortBasic.java\n// Inner Loop Optimization: Runs from j = 0 to j < n - 1 - i to skip already sorted end elements."
  },
  {
    "id": 24,
    "question": "How many total passes or iterations are executed in Bubble Sort - Ascending Order?",
    "shortAnswer": "Bubble Sort - Ascending Order: Key Rule #4 - Temporary Variable Swap: Swap requires a temporary variable: int temp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = temp;.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Ascending Order requires precise pointer and index control. Bubble sort repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order (arr[j] > arr[j+1]). After each complete outer pass, the largest remaining element bubbles to its final rightmost position. Key syllabus requirement: Temporary Variable Swap: Swap requires a temporary variable: int temp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = temp;. Always avoid common pitfall: Confusing ascending condition (>) with descending condition (<).",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Temporary Variable Swap: Swap requires a temporary variable: int temp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = temp;.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// BubbleSortBasic.java\n// Temporary Variable Swap: Swap requires a temporary variable: int temp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = temp;."
  },
  {
    "id": 25,
    "question": "What master advice does Sukanta Hui give for scoring full 15/15 on Bubble Sort - Ascending Order?",
    "shortAnswer": "Bubble Sort - Ascending Order: Key Rule #5 - Quadratic Complexity: Performs O(n^2) comparisons in average and worst cases.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Ascending Order requires precise pointer and index control. Bubble sort repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order (arr[j] > arr[j+1]). After each complete outer pass, the largest remaining element bubbles to its final rightmost position. Key syllabus requirement: Quadratic Complexity: Performs O(n^2) comparisons in average and worst cases. Always avoid common pitfall: Inner loop bound error (j < n instead of j < n - 1 - i) causing ArrayIndexOutOfBoundsException when checking arr[j+1].",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Quadratic Complexity: Performs O(n^2) comparisons in average and worst cases.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// BubbleSortBasic.java\n// Quadratic Complexity: Performs O(n^2) comparisons in average and worst cases."
  }
];

export default questions;
