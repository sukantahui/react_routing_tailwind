const questions = [
  {
    "id": 1,
    "question": "What is the algorithmic objective of Selection Sort - Ascending Order?",
    "shortAnswer": "Selection Sort - Ascending Order: Key Rule #1 - Index Tracking: Assume min_idx = i at the start of pass i; scan unsorted part j = i + 1 to n - 1.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Ascending Order requires precise pointer and index control. Selection sort divides the array into a sorted and unsorted region. In each pass, it finds the index of the minimum element in the unsorted region and swaps it with the first unsorted element, performing only one swap per pass. Key syllabus requirement: Index Tracking: Assume min_idx = i at the start of pass i; scan unsorted part j = i + 1 to n - 1. Always avoid common pitfall: Swapping inside the inner loop instead of waiting until the minimum index is found.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Index Tracking: Assume min_idx = i at the start of pass i; scan unsorted part j = i + 1 to n - 1.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// SelectionSortBasic.java\n// Index Tracking: Assume min_idx = i at the start of pass i; scan unsorted part j = i + 1 to n - 1."
  },
  {
    "id": 2,
    "question": "How does Selection Sort - Ascending Order manage index boundaries?",
    "shortAnswer": "Selection Sort - Ascending Order: Key Rule #2 - Update Minimum Index: If arr[j] < arr[min_idx], update min_idx = j (do NOT swap inside inner loop).",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Ascending Order requires precise pointer and index control. Selection sort divides the array into a sorted and unsorted region. In each pass, it finds the index of the minimum element in the unsorted region and swaps it with the first unsorted element, performing only one swap per pass. Key syllabus requirement: Update Minimum Index: If arr[j] < arr[min_idx], update min_idx = j (do NOT swap inside inner loop). Always avoid common pitfall: Initializing min_idx to 0 instead of the current pass index i.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Update Minimum Index: If arr[j] < arr[min_idx], update min_idx = j (do NOT swap inside inner loop).",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// SelectionSortBasic.java\n// Update Minimum Index: If arr[j] < arr[min_idx], update min_idx = j (do NOT swap inside inner loop)."
  },
  {
    "id": 3,
    "question": "What is the time complexity of Selection Sort - Ascending Order?",
    "shortAnswer": "Selection Sort - Ascending Order: Key Rule #3 - Single Swap Per Pass: Perform exactly one swap between arr[i] and arr[min_idx] after inner loop finishes.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Ascending Order requires precise pointer and index control. Selection sort divides the array into a sorted and unsorted region. In each pass, it finds the index of the minimum element in the unsorted region and swaps it with the first unsorted element, performing only one swap per pass. Key syllabus requirement: Single Swap Per Pass: Perform exactly one swap between arr[i] and arr[min_idx] after inner loop finishes. Always avoid common pitfall: Tracking the minimum value instead of the minimum index, making subsequent swapping impossible.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Single Swap Per Pass: Perform exactly one swap between arr[i] and arr[min_idx] after inner loop finishes.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// SelectionSortBasic.java\n// Single Swap Per Pass: Perform exactly one swap between arr[i] and arr[min_idx] after inner loop finishes."
  },
  {
    "id": 4,
    "question": "What is the space complexity of Selection Sort - Ascending Order?",
    "shortAnswer": "Selection Sort - Ascending Order: Key Rule #4 - Pass Count: Requires exactly n - 1 passes to sort an array of size n.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Ascending Order requires precise pointer and index control. Selection sort divides the array into a sorted and unsorted region. In each pass, it finds the index of the minimum element in the unsorted region and swaps it with the first unsorted element, performing only one swap per pass. Key syllabus requirement: Pass Count: Requires exactly n - 1 passes to sort an array of size n. Always avoid common pitfall: Swapping inside the inner loop instead of waiting until the minimum index is found.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Pass Count: Requires exactly n - 1 passes to sort an array of size n.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// SelectionSortBasic.java\n// Pass Count: Requires exactly n - 1 passes to sort an array of size n."
  },
  {
    "id": 5,
    "question": "Which critical ICSE board examination mistake occurs in Selection Sort - Ascending Order?",
    "shortAnswer": "Selection Sort - Ascending Order: Key Rule #5 - Comparison Complexity: Performs n(n - 1)/2 comparisons, resulting in O(n^2) time complexity.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Ascending Order requires precise pointer and index control. Selection sort divides the array into a sorted and unsorted region. In each pass, it finds the index of the minimum element in the unsorted region and swaps it with the first unsorted element, performing only one swap per pass. Key syllabus requirement: Comparison Complexity: Performs n(n - 1)/2 comparisons, resulting in O(n^2) time complexity. Always avoid common pitfall: Initializing min_idx to 0 instead of the current pass index i.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Comparison Complexity: Performs n(n - 1)/2 comparisons, resulting in O(n^2) time complexity.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// SelectionSortBasic.java\n// Comparison Complexity: Performs n(n - 1)/2 comparisons, resulting in O(n^2) time complexity."
  },
  {
    "id": 6,
    "question": "How does Selection Sort - Ascending Order handle duplicate numeric values?",
    "shortAnswer": "Selection Sort - Ascending Order: Key Rule #1 - Index Tracking: Assume min_idx = i at the start of pass i; scan unsorted part j = i + 1 to n - 1.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Ascending Order requires precise pointer and index control. Selection sort divides the array into a sorted and unsorted region. In each pass, it finds the index of the minimum element in the unsorted region and swaps it with the first unsorted element, performing only one swap per pass. Key syllabus requirement: Index Tracking: Assume min_idx = i at the start of pass i; scan unsorted part j = i + 1 to n - 1. Always avoid common pitfall: Tracking the minimum value instead of the minimum index, making subsequent swapping impossible.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Index Tracking: Assume min_idx = i at the start of pass i; scan unsorted part j = i + 1 to n - 1.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// SelectionSortBasic.java\n// Index Tracking: Assume min_idx = i at the start of pass i; scan unsorted part j = i + 1 to n - 1."
  },
  {
    "id": 7,
    "question": "How does Selection Sort - Ascending Order behave if all array elements are negative?",
    "shortAnswer": "Selection Sort - Ascending Order: Key Rule #2 - Update Minimum Index: If arr[j] < arr[min_idx], update min_idx = j (do NOT swap inside inner loop).",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Ascending Order requires precise pointer and index control. Selection sort divides the array into a sorted and unsorted region. In each pass, it finds the index of the minimum element in the unsorted region and swaps it with the first unsorted element, performing only one swap per pass. Key syllabus requirement: Update Minimum Index: If arr[j] < arr[min_idx], update min_idx = j (do NOT swap inside inner loop). Always avoid common pitfall: Swapping inside the inner loop instead of waiting until the minimum index is found.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Update Minimum Index: If arr[j] < arr[min_idx], update min_idx = j (do NOT swap inside inner loop).",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// SelectionSortBasic.java\n// Update Minimum Index: If arr[j] < arr[min_idx], update min_idx = j (do NOT swap inside inner loop)."
  },
  {
    "id": 8,
    "question": "What role does a temporary variable play in Selection Sort - Ascending Order?",
    "shortAnswer": "Selection Sort - Ascending Order: Key Rule #3 - Single Swap Per Pass: Perform exactly one swap between arr[i] and arr[min_idx] after inner loop finishes.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Ascending Order requires precise pointer and index control. Selection sort divides the array into a sorted and unsorted region. In each pass, it finds the index of the minimum element in the unsorted region and swaps it with the first unsorted element, performing only one swap per pass. Key syllabus requirement: Single Swap Per Pass: Perform exactly one swap between arr[i] and arr[min_idx] after inner loop finishes. Always avoid common pitfall: Initializing min_idx to 0 instead of the current pass index i.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Single Swap Per Pass: Perform exactly one swap between arr[i] and arr[min_idx] after inner loop finishes.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// SelectionSortBasic.java\n// Single Swap Per Pass: Perform exactly one swap between arr[i] and arr[min_idx] after inner loop finishes."
  },
  {
    "id": 9,
    "question": "Can Selection Sort - Ascending Order be executed on an array of length 1?",
    "shortAnswer": "Selection Sort - Ascending Order: Key Rule #4 - Pass Count: Requires exactly n - 1 passes to sort an array of size n.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Ascending Order requires precise pointer and index control. Selection sort divides the array into a sorted and unsorted region. In each pass, it finds the index of the minimum element in the unsorted region and swaps it with the first unsorted element, performing only one swap per pass. Key syllabus requirement: Pass Count: Requires exactly n - 1 passes to sort an array of size n. Always avoid common pitfall: Tracking the minimum value instead of the minimum index, making subsequent swapping impossible.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Pass Count: Requires exactly n - 1 passes to sort an array of size n.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// SelectionSortBasic.java\n// Pass Count: Requires exactly n - 1 passes to sort an array of size n."
  },
  {
    "id": 10,
    "question": "How can loop termination be optimized in Selection Sort - Ascending Order?",
    "shortAnswer": "Selection Sort - Ascending Order: Key Rule #5 - Comparison Complexity: Performs n(n - 1)/2 comparisons, resulting in O(n^2) time complexity.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Ascending Order requires precise pointer and index control. Selection sort divides the array into a sorted and unsorted region. In each pass, it finds the index of the minimum element in the unsorted region and swaps it with the first unsorted element, performing only one swap per pass. Key syllabus requirement: Comparison Complexity: Performs n(n - 1)/2 comparisons, resulting in O(n^2) time complexity. Always avoid common pitfall: Swapping inside the inner loop instead of waiting until the minimum index is found.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Comparison Complexity: Performs n(n - 1)/2 comparisons, resulting in O(n^2) time complexity.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// SelectionSortBasic.java\n// Comparison Complexity: Performs n(n - 1)/2 comparisons, resulting in O(n^2) time complexity."
  },
  {
    "id": 11,
    "question": "What is the worst-case scenario for Selection Sort - Ascending Order?",
    "shortAnswer": "Selection Sort - Ascending Order: Key Rule #1 - Index Tracking: Assume min_idx = i at the start of pass i; scan unsorted part j = i + 1 to n - 1.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Ascending Order requires precise pointer and index control. Selection sort divides the array into a sorted and unsorted region. In each pass, it finds the index of the minimum element in the unsorted region and swaps it with the first unsorted element, performing only one swap per pass. Key syllabus requirement: Index Tracking: Assume min_idx = i at the start of pass i; scan unsorted part j = i + 1 to n - 1. Always avoid common pitfall: Initializing min_idx to 0 instead of the current pass index i.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Index Tracking: Assume min_idx = i at the start of pass i; scan unsorted part j = i + 1 to n - 1.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// SelectionSortBasic.java\n// Index Tracking: Assume min_idx = i at the start of pass i; scan unsorted part j = i + 1 to n - 1."
  },
  {
    "id": 12,
    "question": "What is the best-case scenario for Selection Sort - Ascending Order?",
    "shortAnswer": "Selection Sort - Ascending Order: Key Rule #2 - Update Minimum Index: If arr[j] < arr[min_idx], update min_idx = j (do NOT swap inside inner loop).",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Ascending Order requires precise pointer and index control. Selection sort divides the array into a sorted and unsorted region. In each pass, it finds the index of the minimum element in the unsorted region and swaps it with the first unsorted element, performing only one swap per pass. Key syllabus requirement: Update Minimum Index: If arr[j] < arr[min_idx], update min_idx = j (do NOT swap inside inner loop). Always avoid common pitfall: Tracking the minimum value instead of the minimum index, making subsequent swapping impossible.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Update Minimum Index: If arr[j] < arr[min_idx], update min_idx = j (do NOT swap inside inner loop).",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// SelectionSortBasic.java\n// Update Minimum Index: If arr[j] < arr[min_idx], update min_idx = j (do NOT swap inside inner loop)."
  },
  {
    "id": 13,
    "question": "How does Selection Sort - Ascending Order differ between ascending and descending requirements?",
    "shortAnswer": "Selection Sort - Ascending Order: Key Rule #3 - Single Swap Per Pass: Perform exactly one swap between arr[i] and arr[min_idx] after inner loop finishes.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Ascending Order requires precise pointer and index control. Selection sort divides the array into a sorted and unsorted region. In each pass, it finds the index of the minimum element in the unsorted region and swaps it with the first unsorted element, performing only one swap per pass. Key syllabus requirement: Single Swap Per Pass: Perform exactly one swap between arr[i] and arr[min_idx] after inner loop finishes. Always avoid common pitfall: Swapping inside the inner loop instead of waiting until the minimum index is found.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Single Swap Per Pass: Perform exactly one swap between arr[i] and arr[min_idx] after inner loop finishes.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// SelectionSortBasic.java\n// Single Swap Per Pass: Perform exactly one swap between arr[i] and arr[min_idx] after inner loop finishes."
  },
  {
    "id": 14,
    "question": "How should you write the Variable Description Table (VDT) for Selection Sort - Ascending Order?",
    "shortAnswer": "Selection Sort - Ascending Order: Key Rule #4 - Pass Count: Requires exactly n - 1 passes to sort an array of size n.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Ascending Order requires precise pointer and index control. Selection sort divides the array into a sorted and unsorted region. In each pass, it finds the index of the minimum element in the unsorted region and swaps it with the first unsorted element, performing only one swap per pass. Key syllabus requirement: Pass Count: Requires exactly n - 1 passes to sort an array of size n. Always avoid common pitfall: Initializing min_idx to 0 instead of the current pass index i.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Pass Count: Requires exactly n - 1 passes to sort an array of size n.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// SelectionSortBasic.java\n// Pass Count: Requires exactly n - 1 passes to sort an array of size n."
  },
  {
    "id": 15,
    "question": "What happens if the target array reference is null in Selection Sort - Ascending Order?",
    "shortAnswer": "Selection Sort - Ascending Order: Key Rule #5 - Comparison Complexity: Performs n(n - 1)/2 comparisons, resulting in O(n^2) time complexity.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Ascending Order requires precise pointer and index control. Selection sort divides the array into a sorted and unsorted region. In each pass, it finds the index of the minimum element in the unsorted region and swaps it with the first unsorted element, performing only one swap per pass. Key syllabus requirement: Comparison Complexity: Performs n(n - 1)/2 comparisons, resulting in O(n^2) time complexity. Always avoid common pitfall: Tracking the minimum value instead of the minimum index, making subsequent swapping impossible.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Comparison Complexity: Performs n(n - 1)/2 comparisons, resulting in O(n^2) time complexity.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// SelectionSortBasic.java\n// Comparison Complexity: Performs n(n - 1)/2 comparisons, resulting in O(n^2) time complexity."
  },
  {
    "id": 16,
    "question": "How does BlueJ facilitate testing Selection Sort - Ascending Order?",
    "shortAnswer": "Selection Sort - Ascending Order: Key Rule #1 - Index Tracking: Assume min_idx = i at the start of pass i; scan unsorted part j = i + 1 to n - 1.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Ascending Order requires precise pointer and index control. Selection sort divides the array into a sorted and unsorted region. In each pass, it finds the index of the minimum element in the unsorted region and swaps it with the first unsorted element, performing only one swap per pass. Key syllabus requirement: Index Tracking: Assume min_idx = i at the start of pass i; scan unsorted part j = i + 1 to n - 1. Always avoid common pitfall: Swapping inside the inner loop instead of waiting until the minimum index is found.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Index Tracking: Assume min_idx = i at the start of pass i; scan unsorted part j = i + 1 to n - 1.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// SelectionSortBasic.java\n// Index Tracking: Assume min_idx = i at the start of pass i; scan unsorted part j = i + 1 to n - 1."
  },
  {
    "id": 17,
    "question": "Can Selection Sort - Ascending Order be implemented using a while loop instead of a for loop?",
    "shortAnswer": "Selection Sort - Ascending Order: Key Rule #2 - Update Minimum Index: If arr[j] < arr[min_idx], update min_idx = j (do NOT swap inside inner loop).",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Ascending Order requires precise pointer and index control. Selection sort divides the array into a sorted and unsorted region. In each pass, it finds the index of the minimum element in the unsorted region and swaps it with the first unsorted element, performing only one swap per pass. Key syllabus requirement: Update Minimum Index: If arr[j] < arr[min_idx], update min_idx = j (do NOT swap inside inner loop). Always avoid common pitfall: Initializing min_idx to 0 instead of the current pass index i.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Update Minimum Index: If arr[j] < arr[min_idx], update min_idx = j (do NOT swap inside inner loop).",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// SelectionSortBasic.java\n// Update Minimum Index: If arr[j] < arr[min_idx], update min_idx = j (do NOT swap inside inner loop)."
  },
  {
    "id": 18,
    "question": "What happens if you check index arr[length] in Selection Sort - Ascending Order?",
    "shortAnswer": "Selection Sort - Ascending Order: Key Rule #3 - Single Swap Per Pass: Perform exactly one swap between arr[i] and arr[min_idx] after inner loop finishes.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Ascending Order requires precise pointer and index control. Selection sort divides the array into a sorted and unsorted region. In each pass, it finds the index of the minimum element in the unsorted region and swaps it with the first unsorted element, performing only one swap per pass. Key syllabus requirement: Single Swap Per Pass: Perform exactly one swap between arr[i] and arr[min_idx] after inner loop finishes. Always avoid common pitfall: Tracking the minimum value instead of the minimum index, making subsequent swapping impossible.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Single Swap Per Pass: Perform exactly one swap between arr[i] and arr[min_idx] after inner loop finishes.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// SelectionSortBasic.java\n// Single Swap Per Pass: Perform exactly one swap between arr[i] and arr[min_idx] after inner loop finishes."
  },
  {
    "id": 19,
    "question": "Why is single-pass preferred over two-pass in Selection Sort - Ascending Order?",
    "shortAnswer": "Selection Sort - Ascending Order: Key Rule #4 - Pass Count: Requires exactly n - 1 passes to sort an array of size n.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Ascending Order requires precise pointer and index control. Selection sort divides the array into a sorted and unsorted region. In each pass, it finds the index of the minimum element in the unsorted region and swaps it with the first unsorted element, performing only one swap per pass. Key syllabus requirement: Pass Count: Requires exactly n - 1 passes to sort an array of size n. Always avoid common pitfall: Swapping inside the inner loop instead of waiting until the minimum index is found.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Pass Count: Requires exactly n - 1 passes to sort an array of size n.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// SelectionSortBasic.java\n// Pass Count: Requires exactly n - 1 passes to sort an array of size n."
  },
  {
    "id": 20,
    "question": "How does Selection Sort - Ascending Order interact with Scanner keyboard input?",
    "shortAnswer": "Selection Sort - Ascending Order: Key Rule #5 - Comparison Complexity: Performs n(n - 1)/2 comparisons, resulting in O(n^2) time complexity.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Ascending Order requires precise pointer and index control. Selection sort divides the array into a sorted and unsorted region. In each pass, it finds the index of the minimum element in the unsorted region and swaps it with the first unsorted element, performing only one swap per pass. Key syllabus requirement: Comparison Complexity: Performs n(n - 1)/2 comparisons, resulting in O(n^2) time complexity. Always avoid common pitfall: Initializing min_idx to 0 instead of the current pass index i.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Comparison Complexity: Performs n(n - 1)/2 comparisons, resulting in O(n^2) time complexity.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// SelectionSortBasic.java\n// Comparison Complexity: Performs n(n - 1)/2 comparisons, resulting in O(n^2) time complexity."
  },
  {
    "id": 21,
    "question": "Is Selection Sort - Ascending Order considered an in-place algorithm?",
    "shortAnswer": "Selection Sort - Ascending Order: Key Rule #1 - Index Tracking: Assume min_idx = i at the start of pass i; scan unsorted part j = i + 1 to n - 1.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Ascending Order requires precise pointer and index control. Selection sort divides the array into a sorted and unsorted region. In each pass, it finds the index of the minimum element in the unsorted region and swaps it with the first unsorted element, performing only one swap per pass. Key syllabus requirement: Index Tracking: Assume min_idx = i at the start of pass i; scan unsorted part j = i + 1 to n - 1. Always avoid common pitfall: Tracking the minimum value instead of the minimum index, making subsequent swapping impossible.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Index Tracking: Assume min_idx = i at the start of pass i; scan unsorted part j = i + 1 to n - 1.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// SelectionSortBasic.java\n// Index Tracking: Assume min_idx = i at the start of pass i; scan unsorted part j = i + 1 to n - 1."
  },
  {
    "id": 22,
    "question": "What return type should a helper method implementing Selection Sort - Ascending Order have?",
    "shortAnswer": "Selection Sort - Ascending Order: Key Rule #2 - Update Minimum Index: If arr[j] < arr[min_idx], update min_idx = j (do NOT swap inside inner loop).",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Ascending Order requires precise pointer and index control. Selection sort divides the array into a sorted and unsorted region. In each pass, it finds the index of the minimum element in the unsorted region and swaps it with the first unsorted element, performing only one swap per pass. Key syllabus requirement: Update Minimum Index: If arr[j] < arr[min_idx], update min_idx = j (do NOT swap inside inner loop). Always avoid common pitfall: Swapping inside the inner loop instead of waiting until the minimum index is found.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Update Minimum Index: If arr[j] < arr[min_idx], update min_idx = j (do NOT swap inside inner loop).",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// SelectionSortBasic.java\n// Update Minimum Index: If arr[j] < arr[min_idx], update min_idx = j (do NOT swap inside inner loop)."
  },
  {
    "id": 23,
    "question": "How do you print results clearly in Selection Sort - Ascending Order?",
    "shortAnswer": "Selection Sort - Ascending Order: Key Rule #3 - Single Swap Per Pass: Perform exactly one swap between arr[i] and arr[min_idx] after inner loop finishes.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Ascending Order requires precise pointer and index control. Selection sort divides the array into a sorted and unsorted region. In each pass, it finds the index of the minimum element in the unsorted region and swaps it with the first unsorted element, performing only one swap per pass. Key syllabus requirement: Single Swap Per Pass: Perform exactly one swap between arr[i] and arr[min_idx] after inner loop finishes. Always avoid common pitfall: Initializing min_idx to 0 instead of the current pass index i.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Single Swap Per Pass: Perform exactly one swap between arr[i] and arr[min_idx] after inner loop finishes.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// SelectionSortBasic.java\n// Single Swap Per Pass: Perform exactly one swap between arr[i] and arr[min_idx] after inner loop finishes."
  },
  {
    "id": 24,
    "question": "How many total passes or iterations are executed in Selection Sort - Ascending Order?",
    "shortAnswer": "Selection Sort - Ascending Order: Key Rule #4 - Pass Count: Requires exactly n - 1 passes to sort an array of size n.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Ascending Order requires precise pointer and index control. Selection sort divides the array into a sorted and unsorted region. In each pass, it finds the index of the minimum element in the unsorted region and swaps it with the first unsorted element, performing only one swap per pass. Key syllabus requirement: Pass Count: Requires exactly n - 1 passes to sort an array of size n. Always avoid common pitfall: Tracking the minimum value instead of the minimum index, making subsequent swapping impossible.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Pass Count: Requires exactly n - 1 passes to sort an array of size n.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// SelectionSortBasic.java\n// Pass Count: Requires exactly n - 1 passes to sort an array of size n."
  },
  {
    "id": 25,
    "question": "What master advice does Sukanta Hui give for scoring full 15/15 on Selection Sort - Ascending Order?",
    "shortAnswer": "Selection Sort - Ascending Order: Key Rule #5 - Comparison Complexity: Performs n(n - 1)/2 comparisons, resulting in O(n^2) time complexity.",
    "explanation": "In ICSE Class 10 Computer Applications, Selection Sort - Ascending Order requires precise pointer and index control. Selection sort divides the array into a sorted and unsorted region. In each pass, it finds the index of the minimum element in the unsorted region and swaps it with the first unsorted element, performing only one swap per pass. Key syllabus requirement: Comparison Complexity: Performs n(n - 1)/2 comparisons, resulting in O(n^2) time complexity. Always avoid common pitfall: Swapping inside the inner loop instead of waiting until the minimum index is found.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Comparison Complexity: Performs n(n - 1)/2 comparisons, resulting in O(n^2) time complexity.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 12:\n// SelectionSortBasic.java\n// Comparison Complexity: Performs n(n - 1)/2 comparisons, resulting in O(n^2) time complexity."
  }
];

export default questions;
