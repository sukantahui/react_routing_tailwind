const questions = [
  {
    "id": 1,
    "question": "What is the algorithmic objective of Linear Search in Unsorted Arrays?",
    "shortAnswer": "Linear Search in Unsorted Arrays: Key Rule #1 - Sequential Inspection: Compares search target element by element starting from index 0.",
    "explanation": "In ICSE Class 10 Computer Applications, Linear Search in Unsorted Arrays requires precise pointer and index control. Linear search sequentially compares a search key against each array element from index 0 to length - 1 until a match is found or the array ends. It works on both unsorted and sorted arrays with O(n) worst-case time complexity. Key syllabus requirement: Sequential Inspection: Compares search target element by element starting from index 0. Always avoid common pitfall: Printing 'Element Not Found' inside the loop body instead of after loop termination.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Sequential Inspection: Compares search target element by element starting from index 0.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// LinearSearchBasic.java\n// Sequential Inspection: Compares search target element by element starting from index 0."
  },
  {
    "id": 2,
    "question": "How does Linear Search in Unsorted Arrays manage index boundaries?",
    "shortAnswer": "Linear Search in Unsorted Arrays: Key Rule #2 - Early Break: When target is found, record the index, set flag = true, and break immediately to save iterations.",
    "explanation": "In ICSE Class 10 Computer Applications, Linear Search in Unsorted Arrays requires precise pointer and index control. Linear search sequentially compares a search key against each array element from index 0 to length - 1 until a match is found or the array ends. It works on both unsorted and sorted arrays with O(n) worst-case time complexity. Key syllabus requirement: Early Break: When target is found, record the index, set flag = true, and break immediately to save iterations. Always avoid common pitfall: Continuing to loop after finding the search key without executing a break statement.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Early Break: When target is found, record the index, set flag = true, and break immediately to save iterations.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// LinearSearchBasic.java\n// Early Break: When target is found, record the index, set flag = true, and break immediately to save iterations."
  },
  {
    "id": 3,
    "question": "What is the time complexity of Linear Search in Unsorted Arrays?",
    "shortAnswer": "Linear Search in Unsorted Arrays: Key Rule #3 - Search Flag Pattern: Initialize 'boolean found = false;' or 'int pos = -1;' prior to the search loop.",
    "explanation": "In ICSE Class 10 Computer Applications, Linear Search in Unsorted Arrays requires precise pointer and index control. Linear search sequentially compares a search key against each array element from index 0 to length - 1 until a match is found or the array ends. It works on both unsorted and sorted arrays with O(n) worst-case time complexity. Key syllabus requirement: Search Flag Pattern: Initialize 'boolean found = false;' or 'int pos = -1;' prior to the search loop. Always avoid common pitfall: Off-by-one errors when reporting 1-based position versus 0-based index.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Search Flag Pattern: Initialize 'boolean found = false;' or 'int pos = -1;' prior to the search loop.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// LinearSearchBasic.java\n// Search Flag Pattern: Initialize 'boolean found = false;' or 'int pos = -1;' prior to the search loop."
  },
  {
    "id": 4,
    "question": "What is the space complexity of Linear Search in Unsorted Arrays?",
    "shortAnswer": "Linear Search in Unsorted Arrays: Key Rule #4 - Unsorted Support: Does NOT require the array to be sorted, unlike binary search.",
    "explanation": "In ICSE Class 10 Computer Applications, Linear Search in Unsorted Arrays requires precise pointer and index control. Linear search sequentially compares a search key against each array element from index 0 to length - 1 until a match is found or the array ends. It works on both unsorted and sorted arrays with O(n) worst-case time complexity. Key syllabus requirement: Unsorted Support: Does NOT require the array to be sorted, unlike binary search. Always avoid common pitfall: Printing 'Element Not Found' inside the loop body instead of after loop termination.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Unsorted Support: Does NOT require the array to be sorted, unlike binary search.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// LinearSearchBasic.java\n// Unsorted Support: Does NOT require the array to be sorted, unlike binary search."
  },
  {
    "id": 5,
    "question": "Which critical ICSE board examination mistake occurs in Linear Search in Unsorted Arrays?",
    "shortAnswer": "Linear Search in Unsorted Arrays: Key Rule #5 - Worst-Case Complexity: Visits all n elements when the key is at the end or absent (O(n)).",
    "explanation": "In ICSE Class 10 Computer Applications, Linear Search in Unsorted Arrays requires precise pointer and index control. Linear search sequentially compares a search key against each array element from index 0 to length - 1 until a match is found or the array ends. It works on both unsorted and sorted arrays with O(n) worst-case time complexity. Key syllabus requirement: Worst-Case Complexity: Visits all n elements when the key is at the end or absent (O(n)). Always avoid common pitfall: Continuing to loop after finding the search key without executing a break statement.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Worst-Case Complexity: Visits all n elements when the key is at the end or absent (O(n)).",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// LinearSearchBasic.java\n// Worst-Case Complexity: Visits all n elements when the key is at the end or absent (O(n))."
  },
  {
    "id": 6,
    "question": "How does Linear Search in Unsorted Arrays handle duplicate numeric values?",
    "shortAnswer": "Linear Search in Unsorted Arrays: Key Rule #1 - Sequential Inspection: Compares search target element by element starting from index 0.",
    "explanation": "In ICSE Class 10 Computer Applications, Linear Search in Unsorted Arrays requires precise pointer and index control. Linear search sequentially compares a search key against each array element from index 0 to length - 1 until a match is found or the array ends. It works on both unsorted and sorted arrays with O(n) worst-case time complexity. Key syllabus requirement: Sequential Inspection: Compares search target element by element starting from index 0. Always avoid common pitfall: Off-by-one errors when reporting 1-based position versus 0-based index.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Sequential Inspection: Compares search target element by element starting from index 0.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// LinearSearchBasic.java\n// Sequential Inspection: Compares search target element by element starting from index 0."
  },
  {
    "id": 7,
    "question": "How does Linear Search in Unsorted Arrays behave if all array elements are negative?",
    "shortAnswer": "Linear Search in Unsorted Arrays: Key Rule #2 - Early Break: When target is found, record the index, set flag = true, and break immediately to save iterations.",
    "explanation": "In ICSE Class 10 Computer Applications, Linear Search in Unsorted Arrays requires precise pointer and index control. Linear search sequentially compares a search key against each array element from index 0 to length - 1 until a match is found or the array ends. It works on both unsorted and sorted arrays with O(n) worst-case time complexity. Key syllabus requirement: Early Break: When target is found, record the index, set flag = true, and break immediately to save iterations. Always avoid common pitfall: Printing 'Element Not Found' inside the loop body instead of after loop termination.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Early Break: When target is found, record the index, set flag = true, and break immediately to save iterations.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// LinearSearchBasic.java\n// Early Break: When target is found, record the index, set flag = true, and break immediately to save iterations."
  },
  {
    "id": 8,
    "question": "What role does a temporary variable play in Linear Search in Unsorted Arrays?",
    "shortAnswer": "Linear Search in Unsorted Arrays: Key Rule #3 - Search Flag Pattern: Initialize 'boolean found = false;' or 'int pos = -1;' prior to the search loop.",
    "explanation": "In ICSE Class 10 Computer Applications, Linear Search in Unsorted Arrays requires precise pointer and index control. Linear search sequentially compares a search key against each array element from index 0 to length - 1 until a match is found or the array ends. It works on both unsorted and sorted arrays with O(n) worst-case time complexity. Key syllabus requirement: Search Flag Pattern: Initialize 'boolean found = false;' or 'int pos = -1;' prior to the search loop. Always avoid common pitfall: Continuing to loop after finding the search key without executing a break statement.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Search Flag Pattern: Initialize 'boolean found = false;' or 'int pos = -1;' prior to the search loop.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// LinearSearchBasic.java\n// Search Flag Pattern: Initialize 'boolean found = false;' or 'int pos = -1;' prior to the search loop."
  },
  {
    "id": 9,
    "question": "Can Linear Search in Unsorted Arrays be executed on an array of length 1?",
    "shortAnswer": "Linear Search in Unsorted Arrays: Key Rule #4 - Unsorted Support: Does NOT require the array to be sorted, unlike binary search.",
    "explanation": "In ICSE Class 10 Computer Applications, Linear Search in Unsorted Arrays requires precise pointer and index control. Linear search sequentially compares a search key against each array element from index 0 to length - 1 until a match is found or the array ends. It works on both unsorted and sorted arrays with O(n) worst-case time complexity. Key syllabus requirement: Unsorted Support: Does NOT require the array to be sorted, unlike binary search. Always avoid common pitfall: Off-by-one errors when reporting 1-based position versus 0-based index.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Unsorted Support: Does NOT require the array to be sorted, unlike binary search.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// LinearSearchBasic.java\n// Unsorted Support: Does NOT require the array to be sorted, unlike binary search."
  },
  {
    "id": 10,
    "question": "How can loop termination be optimized in Linear Search in Unsorted Arrays?",
    "shortAnswer": "Linear Search in Unsorted Arrays: Key Rule #5 - Worst-Case Complexity: Visits all n elements when the key is at the end or absent (O(n)).",
    "explanation": "In ICSE Class 10 Computer Applications, Linear Search in Unsorted Arrays requires precise pointer and index control. Linear search sequentially compares a search key against each array element from index 0 to length - 1 until a match is found or the array ends. It works on both unsorted and sorted arrays with O(n) worst-case time complexity. Key syllabus requirement: Worst-Case Complexity: Visits all n elements when the key is at the end or absent (O(n)). Always avoid common pitfall: Printing 'Element Not Found' inside the loop body instead of after loop termination.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Worst-Case Complexity: Visits all n elements when the key is at the end or absent (O(n)).",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// LinearSearchBasic.java\n// Worst-Case Complexity: Visits all n elements when the key is at the end or absent (O(n))."
  },
  {
    "id": 11,
    "question": "What is the worst-case scenario for Linear Search in Unsorted Arrays?",
    "shortAnswer": "Linear Search in Unsorted Arrays: Key Rule #1 - Sequential Inspection: Compares search target element by element starting from index 0.",
    "explanation": "In ICSE Class 10 Computer Applications, Linear Search in Unsorted Arrays requires precise pointer and index control. Linear search sequentially compares a search key against each array element from index 0 to length - 1 until a match is found or the array ends. It works on both unsorted and sorted arrays with O(n) worst-case time complexity. Key syllabus requirement: Sequential Inspection: Compares search target element by element starting from index 0. Always avoid common pitfall: Continuing to loop after finding the search key without executing a break statement.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Sequential Inspection: Compares search target element by element starting from index 0.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// LinearSearchBasic.java\n// Sequential Inspection: Compares search target element by element starting from index 0."
  },
  {
    "id": 12,
    "question": "What is the best-case scenario for Linear Search in Unsorted Arrays?",
    "shortAnswer": "Linear Search in Unsorted Arrays: Key Rule #2 - Early Break: When target is found, record the index, set flag = true, and break immediately to save iterations.",
    "explanation": "In ICSE Class 10 Computer Applications, Linear Search in Unsorted Arrays requires precise pointer and index control. Linear search sequentially compares a search key against each array element from index 0 to length - 1 until a match is found or the array ends. It works on both unsorted and sorted arrays with O(n) worst-case time complexity. Key syllabus requirement: Early Break: When target is found, record the index, set flag = true, and break immediately to save iterations. Always avoid common pitfall: Off-by-one errors when reporting 1-based position versus 0-based index.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Early Break: When target is found, record the index, set flag = true, and break immediately to save iterations.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// LinearSearchBasic.java\n// Early Break: When target is found, record the index, set flag = true, and break immediately to save iterations."
  },
  {
    "id": 13,
    "question": "How does Linear Search in Unsorted Arrays differ between ascending and descending requirements?",
    "shortAnswer": "Linear Search in Unsorted Arrays: Key Rule #3 - Search Flag Pattern: Initialize 'boolean found = false;' or 'int pos = -1;' prior to the search loop.",
    "explanation": "In ICSE Class 10 Computer Applications, Linear Search in Unsorted Arrays requires precise pointer and index control. Linear search sequentially compares a search key against each array element from index 0 to length - 1 until a match is found or the array ends. It works on both unsorted and sorted arrays with O(n) worst-case time complexity. Key syllabus requirement: Search Flag Pattern: Initialize 'boolean found = false;' or 'int pos = -1;' prior to the search loop. Always avoid common pitfall: Printing 'Element Not Found' inside the loop body instead of after loop termination.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Search Flag Pattern: Initialize 'boolean found = false;' or 'int pos = -1;' prior to the search loop.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// LinearSearchBasic.java\n// Search Flag Pattern: Initialize 'boolean found = false;' or 'int pos = -1;' prior to the search loop."
  },
  {
    "id": 14,
    "question": "How should you write the Variable Description Table (VDT) for Linear Search in Unsorted Arrays?",
    "shortAnswer": "Linear Search in Unsorted Arrays: Key Rule #4 - Unsorted Support: Does NOT require the array to be sorted, unlike binary search.",
    "explanation": "In ICSE Class 10 Computer Applications, Linear Search in Unsorted Arrays requires precise pointer and index control. Linear search sequentially compares a search key against each array element from index 0 to length - 1 until a match is found or the array ends. It works on both unsorted and sorted arrays with O(n) worst-case time complexity. Key syllabus requirement: Unsorted Support: Does NOT require the array to be sorted, unlike binary search. Always avoid common pitfall: Continuing to loop after finding the search key without executing a break statement.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Unsorted Support: Does NOT require the array to be sorted, unlike binary search.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// LinearSearchBasic.java\n// Unsorted Support: Does NOT require the array to be sorted, unlike binary search."
  },
  {
    "id": 15,
    "question": "What happens if the target array reference is null in Linear Search in Unsorted Arrays?",
    "shortAnswer": "Linear Search in Unsorted Arrays: Key Rule #5 - Worst-Case Complexity: Visits all n elements when the key is at the end or absent (O(n)).",
    "explanation": "In ICSE Class 10 Computer Applications, Linear Search in Unsorted Arrays requires precise pointer and index control. Linear search sequentially compares a search key against each array element from index 0 to length - 1 until a match is found or the array ends. It works on both unsorted and sorted arrays with O(n) worst-case time complexity. Key syllabus requirement: Worst-Case Complexity: Visits all n elements when the key is at the end or absent (O(n)). Always avoid common pitfall: Off-by-one errors when reporting 1-based position versus 0-based index.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Worst-Case Complexity: Visits all n elements when the key is at the end or absent (O(n)).",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// LinearSearchBasic.java\n// Worst-Case Complexity: Visits all n elements when the key is at the end or absent (O(n))."
  },
  {
    "id": 16,
    "question": "How does BlueJ facilitate testing Linear Search in Unsorted Arrays?",
    "shortAnswer": "Linear Search in Unsorted Arrays: Key Rule #1 - Sequential Inspection: Compares search target element by element starting from index 0.",
    "explanation": "In ICSE Class 10 Computer Applications, Linear Search in Unsorted Arrays requires precise pointer and index control. Linear search sequentially compares a search key against each array element from index 0 to length - 1 until a match is found or the array ends. It works on both unsorted and sorted arrays with O(n) worst-case time complexity. Key syllabus requirement: Sequential Inspection: Compares search target element by element starting from index 0. Always avoid common pitfall: Printing 'Element Not Found' inside the loop body instead of after loop termination.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Sequential Inspection: Compares search target element by element starting from index 0.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// LinearSearchBasic.java\n// Sequential Inspection: Compares search target element by element starting from index 0."
  },
  {
    "id": 17,
    "question": "Can Linear Search in Unsorted Arrays be implemented using a while loop instead of a for loop?",
    "shortAnswer": "Linear Search in Unsorted Arrays: Key Rule #2 - Early Break: When target is found, record the index, set flag = true, and break immediately to save iterations.",
    "explanation": "In ICSE Class 10 Computer Applications, Linear Search in Unsorted Arrays requires precise pointer and index control. Linear search sequentially compares a search key against each array element from index 0 to length - 1 until a match is found or the array ends. It works on both unsorted and sorted arrays with O(n) worst-case time complexity. Key syllabus requirement: Early Break: When target is found, record the index, set flag = true, and break immediately to save iterations. Always avoid common pitfall: Continuing to loop after finding the search key without executing a break statement.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Early Break: When target is found, record the index, set flag = true, and break immediately to save iterations.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// LinearSearchBasic.java\n// Early Break: When target is found, record the index, set flag = true, and break immediately to save iterations."
  },
  {
    "id": 18,
    "question": "What happens if you check index arr[length] in Linear Search in Unsorted Arrays?",
    "shortAnswer": "Linear Search in Unsorted Arrays: Key Rule #3 - Search Flag Pattern: Initialize 'boolean found = false;' or 'int pos = -1;' prior to the search loop.",
    "explanation": "In ICSE Class 10 Computer Applications, Linear Search in Unsorted Arrays requires precise pointer and index control. Linear search sequentially compares a search key against each array element from index 0 to length - 1 until a match is found or the array ends. It works on both unsorted and sorted arrays with O(n) worst-case time complexity. Key syllabus requirement: Search Flag Pattern: Initialize 'boolean found = false;' or 'int pos = -1;' prior to the search loop. Always avoid common pitfall: Off-by-one errors when reporting 1-based position versus 0-based index.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Search Flag Pattern: Initialize 'boolean found = false;' or 'int pos = -1;' prior to the search loop.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// LinearSearchBasic.java\n// Search Flag Pattern: Initialize 'boolean found = false;' or 'int pos = -1;' prior to the search loop."
  },
  {
    "id": 19,
    "question": "Why is single-pass preferred over two-pass in Linear Search in Unsorted Arrays?",
    "shortAnswer": "Linear Search in Unsorted Arrays: Key Rule #4 - Unsorted Support: Does NOT require the array to be sorted, unlike binary search.",
    "explanation": "In ICSE Class 10 Computer Applications, Linear Search in Unsorted Arrays requires precise pointer and index control. Linear search sequentially compares a search key against each array element from index 0 to length - 1 until a match is found or the array ends. It works on both unsorted and sorted arrays with O(n) worst-case time complexity. Key syllabus requirement: Unsorted Support: Does NOT require the array to be sorted, unlike binary search. Always avoid common pitfall: Printing 'Element Not Found' inside the loop body instead of after loop termination.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Unsorted Support: Does NOT require the array to be sorted, unlike binary search.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// LinearSearchBasic.java\n// Unsorted Support: Does NOT require the array to be sorted, unlike binary search."
  },
  {
    "id": 20,
    "question": "How does Linear Search in Unsorted Arrays interact with Scanner keyboard input?",
    "shortAnswer": "Linear Search in Unsorted Arrays: Key Rule #5 - Worst-Case Complexity: Visits all n elements when the key is at the end or absent (O(n)).",
    "explanation": "In ICSE Class 10 Computer Applications, Linear Search in Unsorted Arrays requires precise pointer and index control. Linear search sequentially compares a search key against each array element from index 0 to length - 1 until a match is found or the array ends. It works on both unsorted and sorted arrays with O(n) worst-case time complexity. Key syllabus requirement: Worst-Case Complexity: Visits all n elements when the key is at the end or absent (O(n)). Always avoid common pitfall: Continuing to loop after finding the search key without executing a break statement.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Worst-Case Complexity: Visits all n elements when the key is at the end or absent (O(n)).",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// LinearSearchBasic.java\n// Worst-Case Complexity: Visits all n elements when the key is at the end or absent (O(n))."
  },
  {
    "id": 21,
    "question": "Is Linear Search in Unsorted Arrays considered an in-place algorithm?",
    "shortAnswer": "Linear Search in Unsorted Arrays: Key Rule #1 - Sequential Inspection: Compares search target element by element starting from index 0.",
    "explanation": "In ICSE Class 10 Computer Applications, Linear Search in Unsorted Arrays requires precise pointer and index control. Linear search sequentially compares a search key against each array element from index 0 to length - 1 until a match is found or the array ends. It works on both unsorted and sorted arrays with O(n) worst-case time complexity. Key syllabus requirement: Sequential Inspection: Compares search target element by element starting from index 0. Always avoid common pitfall: Off-by-one errors when reporting 1-based position versus 0-based index.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Sequential Inspection: Compares search target element by element starting from index 0.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// LinearSearchBasic.java\n// Sequential Inspection: Compares search target element by element starting from index 0."
  },
  {
    "id": 22,
    "question": "What return type should a helper method implementing Linear Search in Unsorted Arrays have?",
    "shortAnswer": "Linear Search in Unsorted Arrays: Key Rule #2 - Early Break: When target is found, record the index, set flag = true, and break immediately to save iterations.",
    "explanation": "In ICSE Class 10 Computer Applications, Linear Search in Unsorted Arrays requires precise pointer and index control. Linear search sequentially compares a search key against each array element from index 0 to length - 1 until a match is found or the array ends. It works on both unsorted and sorted arrays with O(n) worst-case time complexity. Key syllabus requirement: Early Break: When target is found, record the index, set flag = true, and break immediately to save iterations. Always avoid common pitfall: Printing 'Element Not Found' inside the loop body instead of after loop termination.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Early Break: When target is found, record the index, set flag = true, and break immediately to save iterations.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// LinearSearchBasic.java\n// Early Break: When target is found, record the index, set flag = true, and break immediately to save iterations."
  },
  {
    "id": 23,
    "question": "How do you print results clearly in Linear Search in Unsorted Arrays?",
    "shortAnswer": "Linear Search in Unsorted Arrays: Key Rule #3 - Search Flag Pattern: Initialize 'boolean found = false;' or 'int pos = -1;' prior to the search loop.",
    "explanation": "In ICSE Class 10 Computer Applications, Linear Search in Unsorted Arrays requires precise pointer and index control. Linear search sequentially compares a search key against each array element from index 0 to length - 1 until a match is found or the array ends. It works on both unsorted and sorted arrays with O(n) worst-case time complexity. Key syllabus requirement: Search Flag Pattern: Initialize 'boolean found = false;' or 'int pos = -1;' prior to the search loop. Always avoid common pitfall: Continuing to loop after finding the search key without executing a break statement.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Search Flag Pattern: Initialize 'boolean found = false;' or 'int pos = -1;' prior to the search loop.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// LinearSearchBasic.java\n// Search Flag Pattern: Initialize 'boolean found = false;' or 'int pos = -1;' prior to the search loop."
  },
  {
    "id": 24,
    "question": "How many total passes or iterations are executed in Linear Search in Unsorted Arrays?",
    "shortAnswer": "Linear Search in Unsorted Arrays: Key Rule #4 - Unsorted Support: Does NOT require the array to be sorted, unlike binary search.",
    "explanation": "In ICSE Class 10 Computer Applications, Linear Search in Unsorted Arrays requires precise pointer and index control. Linear search sequentially compares a search key against each array element from index 0 to length - 1 until a match is found or the array ends. It works on both unsorted and sorted arrays with O(n) worst-case time complexity. Key syllabus requirement: Unsorted Support: Does NOT require the array to be sorted, unlike binary search. Always avoid common pitfall: Off-by-one errors when reporting 1-based position versus 0-based index.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Unsorted Support: Does NOT require the array to be sorted, unlike binary search.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// LinearSearchBasic.java\n// Unsorted Support: Does NOT require the array to be sorted, unlike binary search."
  },
  {
    "id": 25,
    "question": "What master advice does Sukanta Hui give for scoring full 15/15 on Linear Search in Unsorted Arrays?",
    "shortAnswer": "Linear Search in Unsorted Arrays: Key Rule #5 - Worst-Case Complexity: Visits all n elements when the key is at the end or absent (O(n)).",
    "explanation": "In ICSE Class 10 Computer Applications, Linear Search in Unsorted Arrays requires precise pointer and index control. Linear search sequentially compares a search key against each array element from index 0 to length - 1 until a match is found or the array ends. It works on both unsorted and sorted arrays with O(n) worst-case time complexity. Key syllabus requirement: Worst-Case Complexity: Visits all n elements when the key is at the end or absent (O(n)). Always avoid common pitfall: Printing 'Element Not Found' inside the loop body instead of after loop termination.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Worst-Case Complexity: Visits all n elements when the key is at the end or absent (O(n)).",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// LinearSearchBasic.java\n// Worst-Case Complexity: Visits all n elements when the key is at the end or absent (O(n))."
  }
];

export default questions;
