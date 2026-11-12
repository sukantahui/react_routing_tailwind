const questions = [
  {
    "id": 1,
    "question": "What is the algorithmic objective of Bubble Sort - Descending Order?",
    "shortAnswer": "Bubble Sort - Descending Order: Key Rule #1 - Descending Condition: Swap elements if arr[j] < arr[j+1].",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Descending Order requires precise pointer and index control. Descending bubble sort arranges elements from largest to smallest by swapping adjacent pairs whenever arr[j] < arr[j+1]. After each pass, the smallest unsorted element settles at the end of the array. Key syllabus requirement: Descending Condition: Swap elements if arr[j] < arr[j+1]. Always avoid common pitfall: Swapping when arr[j] <= arr[j+1], which breaks sort stability on duplicate values.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Descending Condition: Swap elements if arr[j] < arr[j+1].",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// BubbleSortDescending.java\n// Descending Condition: Swap elements if arr[j] < arr[j+1]."
  },
  {
    "id": 2,
    "question": "How does Bubble Sort - Descending Order manage index boundaries?",
    "shortAnswer": "Bubble Sort - Descending Order: Key Rule #2 - Pass Structure: Outer loop runs n - 1 passes, ensuring every element is systematically settled.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Descending Order requires precise pointer and index control. Descending bubble sort arranges elements from largest to smallest by swapping adjacent pairs whenever arr[j] < arr[j+1]. After each pass, the smallest unsorted element settles at the end of the array. Key syllabus requirement: Pass Structure: Outer loop runs n - 1 passes, ensuring every element is systematically settled. Always avoid common pitfall: Mixing up inner loop bound resulting in ArrayIndexOutOfBoundsException.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Pass Structure: Outer loop runs n - 1 passes, ensuring every element is systematically settled.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// BubbleSortDescending.java\n// Pass Structure: Outer loop runs n - 1 passes, ensuring every element is systematically settled."
  },
  {
    "id": 3,
    "question": "What is the time complexity of Bubble Sort - Descending Order?",
    "shortAnswer": "Bubble Sort - Descending Order: Key Rule #3 - Stable Sorting: Preserves relative order of duplicate elements because equal items are not swapped.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Descending Order requires precise pointer and index control. Descending bubble sort arranges elements from largest to smallest by swapping adjacent pairs whenever arr[j] < arr[j+1]. After each pass, the smallest unsorted element settles at the end of the array. Key syllabus requirement: Stable Sorting: Preserves relative order of duplicate elements because equal items are not swapped. Always avoid common pitfall: Failing to reset the swap tracking flag at the start of each outer pass.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Stable Sorting: Preserves relative order of duplicate elements because equal items are not swapped.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// BubbleSortDescending.java\n// Stable Sorting: Preserves relative order of duplicate elements because equal items are not swapped."
  },
  {
    "id": 4,
    "question": "What is the space complexity of Bubble Sort - Descending Order?",
    "shortAnswer": "Bubble Sort - Descending Order: Key Rule #4 - Early Exit Optimization: Use a boolean 'swapped' flag to terminate early if no swaps occur in a pass.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Descending Order requires precise pointer and index control. Descending bubble sort arranges elements from largest to smallest by swapping adjacent pairs whenever arr[j] < arr[j+1]. After each pass, the smallest unsorted element settles at the end of the array. Key syllabus requirement: Early Exit Optimization: Use a boolean 'swapped' flag to terminate early if no swaps occur in a pass. Always avoid common pitfall: Swapping when arr[j] <= arr[j+1], which breaks sort stability on duplicate values.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Early Exit Optimization: Use a boolean 'swapped' flag to terminate early if no swaps occur in a pass.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// BubbleSortDescending.java\n// Early Exit Optimization: Use a boolean 'swapped' flag to terminate early if no swaps occur in a pass."
  },
  {
    "id": 5,
    "question": "Which critical ICSE board examination mistake occurs in Bubble Sort - Descending Order?",
    "shortAnswer": "Bubble Sort - Descending Order: Key Rule #5 - ICSE Syllabus Favorite: Frequently asked in Section B to sort marks, temperatures, or scores high-to-low.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Descending Order requires precise pointer and index control. Descending bubble sort arranges elements from largest to smallest by swapping adjacent pairs whenever arr[j] < arr[j+1]. After each pass, the smallest unsorted element settles at the end of the array. Key syllabus requirement: ICSE Syllabus Favorite: Frequently asked in Section B to sort marks, temperatures, or scores high-to-low. Always avoid common pitfall: Mixing up inner loop bound resulting in ArrayIndexOutOfBoundsException.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "ICSE Syllabus Favorite: Frequently asked in Section B to sort marks, temperatures, or scores high-to-low.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// BubbleSortDescending.java\n// ICSE Syllabus Favorite: Frequently asked in Section B to sort marks, temperatures, or scores high-to-low."
  },
  {
    "id": 6,
    "question": "How does Bubble Sort - Descending Order handle duplicate numeric values?",
    "shortAnswer": "Bubble Sort - Descending Order: Key Rule #1 - Descending Condition: Swap elements if arr[j] < arr[j+1].",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Descending Order requires precise pointer and index control. Descending bubble sort arranges elements from largest to smallest by swapping adjacent pairs whenever arr[j] < arr[j+1]. After each pass, the smallest unsorted element settles at the end of the array. Key syllabus requirement: Descending Condition: Swap elements if arr[j] < arr[j+1]. Always avoid common pitfall: Failing to reset the swap tracking flag at the start of each outer pass.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Descending Condition: Swap elements if arr[j] < arr[j+1].",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// BubbleSortDescending.java\n// Descending Condition: Swap elements if arr[j] < arr[j+1]."
  },
  {
    "id": 7,
    "question": "How does Bubble Sort - Descending Order behave if all array elements are negative?",
    "shortAnswer": "Bubble Sort - Descending Order: Key Rule #2 - Pass Structure: Outer loop runs n - 1 passes, ensuring every element is systematically settled.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Descending Order requires precise pointer and index control. Descending bubble sort arranges elements from largest to smallest by swapping adjacent pairs whenever arr[j] < arr[j+1]. After each pass, the smallest unsorted element settles at the end of the array. Key syllabus requirement: Pass Structure: Outer loop runs n - 1 passes, ensuring every element is systematically settled. Always avoid common pitfall: Swapping when arr[j] <= arr[j+1], which breaks sort stability on duplicate values.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Pass Structure: Outer loop runs n - 1 passes, ensuring every element is systematically settled.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// BubbleSortDescending.java\n// Pass Structure: Outer loop runs n - 1 passes, ensuring every element is systematically settled."
  },
  {
    "id": 8,
    "question": "What role does a temporary variable play in Bubble Sort - Descending Order?",
    "shortAnswer": "Bubble Sort - Descending Order: Key Rule #3 - Stable Sorting: Preserves relative order of duplicate elements because equal items are not swapped.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Descending Order requires precise pointer and index control. Descending bubble sort arranges elements from largest to smallest by swapping adjacent pairs whenever arr[j] < arr[j+1]. After each pass, the smallest unsorted element settles at the end of the array. Key syllabus requirement: Stable Sorting: Preserves relative order of duplicate elements because equal items are not swapped. Always avoid common pitfall: Mixing up inner loop bound resulting in ArrayIndexOutOfBoundsException.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Stable Sorting: Preserves relative order of duplicate elements because equal items are not swapped.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// BubbleSortDescending.java\n// Stable Sorting: Preserves relative order of duplicate elements because equal items are not swapped."
  },
  {
    "id": 9,
    "question": "Can Bubble Sort - Descending Order be executed on an array of length 1?",
    "shortAnswer": "Bubble Sort - Descending Order: Key Rule #4 - Early Exit Optimization: Use a boolean 'swapped' flag to terminate early if no swaps occur in a pass.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Descending Order requires precise pointer and index control. Descending bubble sort arranges elements from largest to smallest by swapping adjacent pairs whenever arr[j] < arr[j+1]. After each pass, the smallest unsorted element settles at the end of the array. Key syllabus requirement: Early Exit Optimization: Use a boolean 'swapped' flag to terminate early if no swaps occur in a pass. Always avoid common pitfall: Failing to reset the swap tracking flag at the start of each outer pass.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Early Exit Optimization: Use a boolean 'swapped' flag to terminate early if no swaps occur in a pass.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// BubbleSortDescending.java\n// Early Exit Optimization: Use a boolean 'swapped' flag to terminate early if no swaps occur in a pass."
  },
  {
    "id": 10,
    "question": "How can loop termination be optimized in Bubble Sort - Descending Order?",
    "shortAnswer": "Bubble Sort - Descending Order: Key Rule #5 - ICSE Syllabus Favorite: Frequently asked in Section B to sort marks, temperatures, or scores high-to-low.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Descending Order requires precise pointer and index control. Descending bubble sort arranges elements from largest to smallest by swapping adjacent pairs whenever arr[j] < arr[j+1]. After each pass, the smallest unsorted element settles at the end of the array. Key syllabus requirement: ICSE Syllabus Favorite: Frequently asked in Section B to sort marks, temperatures, or scores high-to-low. Always avoid common pitfall: Swapping when arr[j] <= arr[j+1], which breaks sort stability on duplicate values.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "ICSE Syllabus Favorite: Frequently asked in Section B to sort marks, temperatures, or scores high-to-low.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// BubbleSortDescending.java\n// ICSE Syllabus Favorite: Frequently asked in Section B to sort marks, temperatures, or scores high-to-low."
  },
  {
    "id": 11,
    "question": "What is the worst-case scenario for Bubble Sort - Descending Order?",
    "shortAnswer": "Bubble Sort - Descending Order: Key Rule #1 - Descending Condition: Swap elements if arr[j] < arr[j+1].",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Descending Order requires precise pointer and index control. Descending bubble sort arranges elements from largest to smallest by swapping adjacent pairs whenever arr[j] < arr[j+1]. After each pass, the smallest unsorted element settles at the end of the array. Key syllabus requirement: Descending Condition: Swap elements if arr[j] < arr[j+1]. Always avoid common pitfall: Mixing up inner loop bound resulting in ArrayIndexOutOfBoundsException.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Descending Condition: Swap elements if arr[j] < arr[j+1].",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// BubbleSortDescending.java\n// Descending Condition: Swap elements if arr[j] < arr[j+1]."
  },
  {
    "id": 12,
    "question": "What is the best-case scenario for Bubble Sort - Descending Order?",
    "shortAnswer": "Bubble Sort - Descending Order: Key Rule #2 - Pass Structure: Outer loop runs n - 1 passes, ensuring every element is systematically settled.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Descending Order requires precise pointer and index control. Descending bubble sort arranges elements from largest to smallest by swapping adjacent pairs whenever arr[j] < arr[j+1]. After each pass, the smallest unsorted element settles at the end of the array. Key syllabus requirement: Pass Structure: Outer loop runs n - 1 passes, ensuring every element is systematically settled. Always avoid common pitfall: Failing to reset the swap tracking flag at the start of each outer pass.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Pass Structure: Outer loop runs n - 1 passes, ensuring every element is systematically settled.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// BubbleSortDescending.java\n// Pass Structure: Outer loop runs n - 1 passes, ensuring every element is systematically settled."
  },
  {
    "id": 13,
    "question": "How does Bubble Sort - Descending Order differ between ascending and descending requirements?",
    "shortAnswer": "Bubble Sort - Descending Order: Key Rule #3 - Stable Sorting: Preserves relative order of duplicate elements because equal items are not swapped.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Descending Order requires precise pointer and index control. Descending bubble sort arranges elements from largest to smallest by swapping adjacent pairs whenever arr[j] < arr[j+1]. After each pass, the smallest unsorted element settles at the end of the array. Key syllabus requirement: Stable Sorting: Preserves relative order of duplicate elements because equal items are not swapped. Always avoid common pitfall: Swapping when arr[j] <= arr[j+1], which breaks sort stability on duplicate values.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Stable Sorting: Preserves relative order of duplicate elements because equal items are not swapped.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// BubbleSortDescending.java\n// Stable Sorting: Preserves relative order of duplicate elements because equal items are not swapped."
  },
  {
    "id": 14,
    "question": "How should you write the Variable Description Table (VDT) for Bubble Sort - Descending Order?",
    "shortAnswer": "Bubble Sort - Descending Order: Key Rule #4 - Early Exit Optimization: Use a boolean 'swapped' flag to terminate early if no swaps occur in a pass.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Descending Order requires precise pointer and index control. Descending bubble sort arranges elements from largest to smallest by swapping adjacent pairs whenever arr[j] < arr[j+1]. After each pass, the smallest unsorted element settles at the end of the array. Key syllabus requirement: Early Exit Optimization: Use a boolean 'swapped' flag to terminate early if no swaps occur in a pass. Always avoid common pitfall: Mixing up inner loop bound resulting in ArrayIndexOutOfBoundsException.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Early Exit Optimization: Use a boolean 'swapped' flag to terminate early if no swaps occur in a pass.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// BubbleSortDescending.java\n// Early Exit Optimization: Use a boolean 'swapped' flag to terminate early if no swaps occur in a pass."
  },
  {
    "id": 15,
    "question": "What happens if the target array reference is null in Bubble Sort - Descending Order?",
    "shortAnswer": "Bubble Sort - Descending Order: Key Rule #5 - ICSE Syllabus Favorite: Frequently asked in Section B to sort marks, temperatures, or scores high-to-low.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Descending Order requires precise pointer and index control. Descending bubble sort arranges elements from largest to smallest by swapping adjacent pairs whenever arr[j] < arr[j+1]. After each pass, the smallest unsorted element settles at the end of the array. Key syllabus requirement: ICSE Syllabus Favorite: Frequently asked in Section B to sort marks, temperatures, or scores high-to-low. Always avoid common pitfall: Failing to reset the swap tracking flag at the start of each outer pass.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "ICSE Syllabus Favorite: Frequently asked in Section B to sort marks, temperatures, or scores high-to-low.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// BubbleSortDescending.java\n// ICSE Syllabus Favorite: Frequently asked in Section B to sort marks, temperatures, or scores high-to-low."
  },
  {
    "id": 16,
    "question": "How does BlueJ facilitate testing Bubble Sort - Descending Order?",
    "shortAnswer": "Bubble Sort - Descending Order: Key Rule #1 - Descending Condition: Swap elements if arr[j] < arr[j+1].",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Descending Order requires precise pointer and index control. Descending bubble sort arranges elements from largest to smallest by swapping adjacent pairs whenever arr[j] < arr[j+1]. After each pass, the smallest unsorted element settles at the end of the array. Key syllabus requirement: Descending Condition: Swap elements if arr[j] < arr[j+1]. Always avoid common pitfall: Swapping when arr[j] <= arr[j+1], which breaks sort stability on duplicate values.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Descending Condition: Swap elements if arr[j] < arr[j+1].",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// BubbleSortDescending.java\n// Descending Condition: Swap elements if arr[j] < arr[j+1]."
  },
  {
    "id": 17,
    "question": "Can Bubble Sort - Descending Order be implemented using a while loop instead of a for loop?",
    "shortAnswer": "Bubble Sort - Descending Order: Key Rule #2 - Pass Structure: Outer loop runs n - 1 passes, ensuring every element is systematically settled.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Descending Order requires precise pointer and index control. Descending bubble sort arranges elements from largest to smallest by swapping adjacent pairs whenever arr[j] < arr[j+1]. After each pass, the smallest unsorted element settles at the end of the array. Key syllabus requirement: Pass Structure: Outer loop runs n - 1 passes, ensuring every element is systematically settled. Always avoid common pitfall: Mixing up inner loop bound resulting in ArrayIndexOutOfBoundsException.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Pass Structure: Outer loop runs n - 1 passes, ensuring every element is systematically settled.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// BubbleSortDescending.java\n// Pass Structure: Outer loop runs n - 1 passes, ensuring every element is systematically settled."
  },
  {
    "id": 18,
    "question": "What happens if you check index arr[length] in Bubble Sort - Descending Order?",
    "shortAnswer": "Bubble Sort - Descending Order: Key Rule #3 - Stable Sorting: Preserves relative order of duplicate elements because equal items are not swapped.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Descending Order requires precise pointer and index control. Descending bubble sort arranges elements from largest to smallest by swapping adjacent pairs whenever arr[j] < arr[j+1]. After each pass, the smallest unsorted element settles at the end of the array. Key syllabus requirement: Stable Sorting: Preserves relative order of duplicate elements because equal items are not swapped. Always avoid common pitfall: Failing to reset the swap tracking flag at the start of each outer pass.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Stable Sorting: Preserves relative order of duplicate elements because equal items are not swapped.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// BubbleSortDescending.java\n// Stable Sorting: Preserves relative order of duplicate elements because equal items are not swapped."
  },
  {
    "id": 19,
    "question": "Why is single-pass preferred over two-pass in Bubble Sort - Descending Order?",
    "shortAnswer": "Bubble Sort - Descending Order: Key Rule #4 - Early Exit Optimization: Use a boolean 'swapped' flag to terminate early if no swaps occur in a pass.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Descending Order requires precise pointer and index control. Descending bubble sort arranges elements from largest to smallest by swapping adjacent pairs whenever arr[j] < arr[j+1]. After each pass, the smallest unsorted element settles at the end of the array. Key syllabus requirement: Early Exit Optimization: Use a boolean 'swapped' flag to terminate early if no swaps occur in a pass. Always avoid common pitfall: Swapping when arr[j] <= arr[j+1], which breaks sort stability on duplicate values.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Early Exit Optimization: Use a boolean 'swapped' flag to terminate early if no swaps occur in a pass.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// BubbleSortDescending.java\n// Early Exit Optimization: Use a boolean 'swapped' flag to terminate early if no swaps occur in a pass."
  },
  {
    "id": 20,
    "question": "How does Bubble Sort - Descending Order interact with Scanner keyboard input?",
    "shortAnswer": "Bubble Sort - Descending Order: Key Rule #5 - ICSE Syllabus Favorite: Frequently asked in Section B to sort marks, temperatures, or scores high-to-low.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Descending Order requires precise pointer and index control. Descending bubble sort arranges elements from largest to smallest by swapping adjacent pairs whenever arr[j] < arr[j+1]. After each pass, the smallest unsorted element settles at the end of the array. Key syllabus requirement: ICSE Syllabus Favorite: Frequently asked in Section B to sort marks, temperatures, or scores high-to-low. Always avoid common pitfall: Mixing up inner loop bound resulting in ArrayIndexOutOfBoundsException.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "ICSE Syllabus Favorite: Frequently asked in Section B to sort marks, temperatures, or scores high-to-low.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// BubbleSortDescending.java\n// ICSE Syllabus Favorite: Frequently asked in Section B to sort marks, temperatures, or scores high-to-low."
  },
  {
    "id": 21,
    "question": "Is Bubble Sort - Descending Order considered an in-place algorithm?",
    "shortAnswer": "Bubble Sort - Descending Order: Key Rule #1 - Descending Condition: Swap elements if arr[j] < arr[j+1].",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Descending Order requires precise pointer and index control. Descending bubble sort arranges elements from largest to smallest by swapping adjacent pairs whenever arr[j] < arr[j+1]. After each pass, the smallest unsorted element settles at the end of the array. Key syllabus requirement: Descending Condition: Swap elements if arr[j] < arr[j+1]. Always avoid common pitfall: Failing to reset the swap tracking flag at the start of each outer pass.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Descending Condition: Swap elements if arr[j] < arr[j+1].",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// BubbleSortDescending.java\n// Descending Condition: Swap elements if arr[j] < arr[j+1]."
  },
  {
    "id": 22,
    "question": "What return type should a helper method implementing Bubble Sort - Descending Order have?",
    "shortAnswer": "Bubble Sort - Descending Order: Key Rule #2 - Pass Structure: Outer loop runs n - 1 passes, ensuring every element is systematically settled.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Descending Order requires precise pointer and index control. Descending bubble sort arranges elements from largest to smallest by swapping adjacent pairs whenever arr[j] < arr[j+1]. After each pass, the smallest unsorted element settles at the end of the array. Key syllabus requirement: Pass Structure: Outer loop runs n - 1 passes, ensuring every element is systematically settled. Always avoid common pitfall: Swapping when arr[j] <= arr[j+1], which breaks sort stability on duplicate values.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Pass Structure: Outer loop runs n - 1 passes, ensuring every element is systematically settled.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// BubbleSortDescending.java\n// Pass Structure: Outer loop runs n - 1 passes, ensuring every element is systematically settled."
  },
  {
    "id": 23,
    "question": "How do you print results clearly in Bubble Sort - Descending Order?",
    "shortAnswer": "Bubble Sort - Descending Order: Key Rule #3 - Stable Sorting: Preserves relative order of duplicate elements because equal items are not swapped.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Descending Order requires precise pointer and index control. Descending bubble sort arranges elements from largest to smallest by swapping adjacent pairs whenever arr[j] < arr[j+1]. After each pass, the smallest unsorted element settles at the end of the array. Key syllabus requirement: Stable Sorting: Preserves relative order of duplicate elements because equal items are not swapped. Always avoid common pitfall: Mixing up inner loop bound resulting in ArrayIndexOutOfBoundsException.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Stable Sorting: Preserves relative order of duplicate elements because equal items are not swapped.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// BubbleSortDescending.java\n// Stable Sorting: Preserves relative order of duplicate elements because equal items are not swapped."
  },
  {
    "id": 24,
    "question": "How many total passes or iterations are executed in Bubble Sort - Descending Order?",
    "shortAnswer": "Bubble Sort - Descending Order: Key Rule #4 - Early Exit Optimization: Use a boolean 'swapped' flag to terminate early if no swaps occur in a pass.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Descending Order requires precise pointer and index control. Descending bubble sort arranges elements from largest to smallest by swapping adjacent pairs whenever arr[j] < arr[j+1]. After each pass, the smallest unsorted element settles at the end of the array. Key syllabus requirement: Early Exit Optimization: Use a boolean 'swapped' flag to terminate early if no swaps occur in a pass. Always avoid common pitfall: Failing to reset the swap tracking flag at the start of each outer pass.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Early Exit Optimization: Use a boolean 'swapped' flag to terminate early if no swaps occur in a pass.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// BubbleSortDescending.java\n// Early Exit Optimization: Use a boolean 'swapped' flag to terminate early if no swaps occur in a pass."
  },
  {
    "id": 25,
    "question": "What master advice does Sukanta Hui give for scoring full 15/15 on Bubble Sort - Descending Order?",
    "shortAnswer": "Bubble Sort - Descending Order: Key Rule #5 - ICSE Syllabus Favorite: Frequently asked in Section B to sort marks, temperatures, or scores high-to-low.",
    "explanation": "In ICSE Class 10 Computer Applications, Bubble Sort - Descending Order requires precise pointer and index control. Descending bubble sort arranges elements from largest to smallest by swapping adjacent pairs whenever arr[j] < arr[j+1]. After each pass, the smallest unsorted element settles at the end of the array. Key syllabus requirement: ICSE Syllabus Favorite: Frequently asked in Section B to sort marks, temperatures, or scores high-to-low. Always avoid common pitfall: Swapping when arr[j] <= arr[j+1], which breaks sort stability on duplicate values.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "ICSE Syllabus Favorite: Frequently asked in Section B to sort marks, temperatures, or scores high-to-low.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// BubbleSortDescending.java\n// ICSE Syllabus Favorite: Frequently asked in Section B to sort marks, temperatures, or scores high-to-low."
  }
];

export default questions;
