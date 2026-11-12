const questions = [
  {
    "id": 1,
    "question": "What is the algorithmic objective of Finding the Second Largest Element?",
    "shortAnswer": "Finding the Second Largest Element: Key Rule #1 - Dual Variable Initialization: Initialize max1 = Integer.MIN_VALUE and max2 = Integer.MIN_VALUE.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Second Largest Element requires precise pointer and index control. Finding the second largest value without full sorting is an essential ICSE Section B problem. In a single pass, two variables (max1 and max2) are maintained: when a new maximum is found, max1 shifts to max2; otherwise, if an element is between max2 and max1, max2 is updated. Key syllabus requirement: Dual Variable Initialization: Initialize max1 = Integer.MIN_VALUE and max2 = Integer.MIN_VALUE. Always avoid common pitfall: Assuming second largest is at index (length - 2) after sorting without checking for duplicate maximums.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Dual Variable Initialization: Initialize max1 = Integer.MIN_VALUE and max2 = Integer.MIN_VALUE.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 16:\n// SecondLargestBasic.java\n// Dual Variable Initialization: Initialize max1 = Integer.MIN_VALUE and max2 = Integer.MIN_VALUE."
  },
  {
    "id": 2,
    "question": "How does Finding the Second Largest Element manage index boundaries?",
    "shortAnswer": "Finding the Second Largest Element: Key Rule #2 - Primary Update: If arr[i] > max1, shift max2 = max1 and update max1 = arr[i].",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Second Largest Element requires precise pointer and index control. Finding the second largest value without full sorting is an essential ICSE Section B problem. In a single pass, two variables (max1 and max2) are maintained: when a new maximum is found, max1 shifts to max2; otherwise, if an element is between max2 and max1, max2 is updated. Key syllabus requirement: Primary Update: If arr[i] > max1, shift max2 = max1 and update max1 = arr[i]. Always avoid common pitfall: Forgetting to update max2 when arr[i] > max1.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Primary Update: If arr[i] > max1, shift max2 = max1 and update max1 = arr[i].",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 16:\n// SecondLargestBasic.java\n// Primary Update: If arr[i] > max1, shift max2 = max1 and update max1 = arr[i]."
  },
  {
    "id": 3,
    "question": "What is the time complexity of Finding the Second Largest Element?",
    "shortAnswer": "Finding the Second Largest Element: Key Rule #3 - Secondary Update: Else if arr[i] > max2 and arr[i] != max1, update max2 = arr[i].",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Second Largest Element requires precise pointer and index control. Finding the second largest value without full sorting is an essential ICSE Section B problem. In a single pass, two variables (max1 and max2) are maintained: when a new maximum is found, max1 shifts to max2; otherwise, if an element is between max2 and max1, max2 is updated. Key syllabus requirement: Secondary Update: Else if arr[i] > max2 and arr[i] != max1, update max2 = arr[i]. Always avoid common pitfall: Failing to handle arrays where all elements are identical.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Secondary Update: Else if arr[i] > max2 and arr[i] != max1, update max2 = arr[i].",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 16:\n// SecondLargestBasic.java\n// Secondary Update: Else if arr[i] > max2 and arr[i] != max1, update max2 = arr[i]."
  },
  {
    "id": 4,
    "question": "What is the space complexity of Finding the Second Largest Element?",
    "shortAnswer": "Finding the Second Largest Element: Key Rule #4 - Duplicate Handling: The condition arr[i] != max1 ensures duplicate maximums do not corrupt the second distinct largest.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Second Largest Element requires precise pointer and index control. Finding the second largest value without full sorting is an essential ICSE Section B problem. In a single pass, two variables (max1 and max2) are maintained: when a new maximum is found, max1 shifts to max2; otherwise, if an element is between max2 and max1, max2 is updated. Key syllabus requirement: Duplicate Handling: The condition arr[i] != max1 ensures duplicate maximums do not corrupt the second distinct largest. Always avoid common pitfall: Assuming second largest is at index (length - 2) after sorting without checking for duplicate maximums.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Duplicate Handling: The condition arr[i] != max1 ensures duplicate maximums do not corrupt the second distinct largest.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 16:\n// SecondLargestBasic.java\n// Duplicate Handling: The condition arr[i] != max1 ensures duplicate maximums do not corrupt the second distinct largest."
  },
  {
    "id": 5,
    "question": "Which critical ICSE board examination mistake occurs in Finding the Second Largest Element?",
    "shortAnswer": "Finding the Second Largest Element: Key Rule #5 - Optimal O(n) Efficiency: Solves the problem in a single pass without the O(n log n) overhead of sorting.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Second Largest Element requires precise pointer and index control. Finding the second largest value without full sorting is an essential ICSE Section B problem. In a single pass, two variables (max1 and max2) are maintained: when a new maximum is found, max1 shifts to max2; otherwise, if an element is between max2 and max1, max2 is updated. Key syllabus requirement: Optimal O(n) Efficiency: Solves the problem in a single pass without the O(n log n) overhead of sorting. Always avoid common pitfall: Forgetting to update max2 when arr[i] > max1.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Optimal O(n) Efficiency: Solves the problem in a single pass without the O(n log n) overhead of sorting.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 16:\n// SecondLargestBasic.java\n// Optimal O(n) Efficiency: Solves the problem in a single pass without the O(n log n) overhead of sorting."
  },
  {
    "id": 6,
    "question": "How does Finding the Second Largest Element handle duplicate numeric values?",
    "shortAnswer": "Finding the Second Largest Element: Key Rule #1 - Dual Variable Initialization: Initialize max1 = Integer.MIN_VALUE and max2 = Integer.MIN_VALUE.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Second Largest Element requires precise pointer and index control. Finding the second largest value without full sorting is an essential ICSE Section B problem. In a single pass, two variables (max1 and max2) are maintained: when a new maximum is found, max1 shifts to max2; otherwise, if an element is between max2 and max1, max2 is updated. Key syllabus requirement: Dual Variable Initialization: Initialize max1 = Integer.MIN_VALUE and max2 = Integer.MIN_VALUE. Always avoid common pitfall: Failing to handle arrays where all elements are identical.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Dual Variable Initialization: Initialize max1 = Integer.MIN_VALUE and max2 = Integer.MIN_VALUE.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 16:\n// SecondLargestBasic.java\n// Dual Variable Initialization: Initialize max1 = Integer.MIN_VALUE and max2 = Integer.MIN_VALUE."
  },
  {
    "id": 7,
    "question": "How does Finding the Second Largest Element behave if all array elements are negative?",
    "shortAnswer": "Finding the Second Largest Element: Key Rule #2 - Primary Update: If arr[i] > max1, shift max2 = max1 and update max1 = arr[i].",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Second Largest Element requires precise pointer and index control. Finding the second largest value without full sorting is an essential ICSE Section B problem. In a single pass, two variables (max1 and max2) are maintained: when a new maximum is found, max1 shifts to max2; otherwise, if an element is between max2 and max1, max2 is updated. Key syllabus requirement: Primary Update: If arr[i] > max1, shift max2 = max1 and update max1 = arr[i]. Always avoid common pitfall: Assuming second largest is at index (length - 2) after sorting without checking for duplicate maximums.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Primary Update: If arr[i] > max1, shift max2 = max1 and update max1 = arr[i].",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 16:\n// SecondLargestBasic.java\n// Primary Update: If arr[i] > max1, shift max2 = max1 and update max1 = arr[i]."
  },
  {
    "id": 8,
    "question": "What role does a temporary variable play in Finding the Second Largest Element?",
    "shortAnswer": "Finding the Second Largest Element: Key Rule #3 - Secondary Update: Else if arr[i] > max2 and arr[i] != max1, update max2 = arr[i].",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Second Largest Element requires precise pointer and index control. Finding the second largest value without full sorting is an essential ICSE Section B problem. In a single pass, two variables (max1 and max2) are maintained: when a new maximum is found, max1 shifts to max2; otherwise, if an element is between max2 and max1, max2 is updated. Key syllabus requirement: Secondary Update: Else if arr[i] > max2 and arr[i] != max1, update max2 = arr[i]. Always avoid common pitfall: Forgetting to update max2 when arr[i] > max1.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "basic",
    "options": [
      "Secondary Update: Else if arr[i] > max2 and arr[i] != max1, update max2 = arr[i].",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 16:\n// SecondLargestBasic.java\n// Secondary Update: Else if arr[i] > max2 and arr[i] != max1, update max2 = arr[i]."
  },
  {
    "id": 9,
    "question": "Can Finding the Second Largest Element be executed on an array of length 1?",
    "shortAnswer": "Finding the Second Largest Element: Key Rule #4 - Duplicate Handling: The condition arr[i] != max1 ensures duplicate maximums do not corrupt the second distinct largest.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Second Largest Element requires precise pointer and index control. Finding the second largest value without full sorting is an essential ICSE Section B problem. In a single pass, two variables (max1 and max2) are maintained: when a new maximum is found, max1 shifts to max2; otherwise, if an element is between max2 and max1, max2 is updated. Key syllabus requirement: Duplicate Handling: The condition arr[i] != max1 ensures duplicate maximums do not corrupt the second distinct largest. Always avoid common pitfall: Failing to handle arrays where all elements are identical.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Duplicate Handling: The condition arr[i] != max1 ensures duplicate maximums do not corrupt the second distinct largest.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 16:\n// SecondLargestBasic.java\n// Duplicate Handling: The condition arr[i] != max1 ensures duplicate maximums do not corrupt the second distinct largest."
  },
  {
    "id": 10,
    "question": "How can loop termination be optimized in Finding the Second Largest Element?",
    "shortAnswer": "Finding the Second Largest Element: Key Rule #5 - Optimal O(n) Efficiency: Solves the problem in a single pass without the O(n log n) overhead of sorting.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Second Largest Element requires precise pointer and index control. Finding the second largest value without full sorting is an essential ICSE Section B problem. In a single pass, two variables (max1 and max2) are maintained: when a new maximum is found, max1 shifts to max2; otherwise, if an element is between max2 and max1, max2 is updated. Key syllabus requirement: Optimal O(n) Efficiency: Solves the problem in a single pass without the O(n log n) overhead of sorting. Always avoid common pitfall: Assuming second largest is at index (length - 2) after sorting without checking for duplicate maximums.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Optimal O(n) Efficiency: Solves the problem in a single pass without the O(n log n) overhead of sorting.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 16:\n// SecondLargestBasic.java\n// Optimal O(n) Efficiency: Solves the problem in a single pass without the O(n log n) overhead of sorting."
  },
  {
    "id": 11,
    "question": "What is the worst-case scenario for Finding the Second Largest Element?",
    "shortAnswer": "Finding the Second Largest Element: Key Rule #1 - Dual Variable Initialization: Initialize max1 = Integer.MIN_VALUE and max2 = Integer.MIN_VALUE.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Second Largest Element requires precise pointer and index control. Finding the second largest value without full sorting is an essential ICSE Section B problem. In a single pass, two variables (max1 and max2) are maintained: when a new maximum is found, max1 shifts to max2; otherwise, if an element is between max2 and max1, max2 is updated. Key syllabus requirement: Dual Variable Initialization: Initialize max1 = Integer.MIN_VALUE and max2 = Integer.MIN_VALUE. Always avoid common pitfall: Forgetting to update max2 when arr[i] > max1.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Dual Variable Initialization: Initialize max1 = Integer.MIN_VALUE and max2 = Integer.MIN_VALUE.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 16:\n// SecondLargestBasic.java\n// Dual Variable Initialization: Initialize max1 = Integer.MIN_VALUE and max2 = Integer.MIN_VALUE."
  },
  {
    "id": 12,
    "question": "What is the best-case scenario for Finding the Second Largest Element?",
    "shortAnswer": "Finding the Second Largest Element: Key Rule #2 - Primary Update: If arr[i] > max1, shift max2 = max1 and update max1 = arr[i].",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Second Largest Element requires precise pointer and index control. Finding the second largest value without full sorting is an essential ICSE Section B problem. In a single pass, two variables (max1 and max2) are maintained: when a new maximum is found, max1 shifts to max2; otherwise, if an element is between max2 and max1, max2 is updated. Key syllabus requirement: Primary Update: If arr[i] > max1, shift max2 = max1 and update max1 = arr[i]. Always avoid common pitfall: Failing to handle arrays where all elements are identical.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Primary Update: If arr[i] > max1, shift max2 = max1 and update max1 = arr[i].",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 16:\n// SecondLargestBasic.java\n// Primary Update: If arr[i] > max1, shift max2 = max1 and update max1 = arr[i]."
  },
  {
    "id": 13,
    "question": "How does Finding the Second Largest Element differ between ascending and descending requirements?",
    "shortAnswer": "Finding the Second Largest Element: Key Rule #3 - Secondary Update: Else if arr[i] > max2 and arr[i] != max1, update max2 = arr[i].",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Second Largest Element requires precise pointer and index control. Finding the second largest value without full sorting is an essential ICSE Section B problem. In a single pass, two variables (max1 and max2) are maintained: when a new maximum is found, max1 shifts to max2; otherwise, if an element is between max2 and max1, max2 is updated. Key syllabus requirement: Secondary Update: Else if arr[i] > max2 and arr[i] != max1, update max2 = arr[i]. Always avoid common pitfall: Assuming second largest is at index (length - 2) after sorting without checking for duplicate maximums.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Secondary Update: Else if arr[i] > max2 and arr[i] != max1, update max2 = arr[i].",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 16:\n// SecondLargestBasic.java\n// Secondary Update: Else if arr[i] > max2 and arr[i] != max1, update max2 = arr[i]."
  },
  {
    "id": 14,
    "question": "How should you write the Variable Description Table (VDT) for Finding the Second Largest Element?",
    "shortAnswer": "Finding the Second Largest Element: Key Rule #4 - Duplicate Handling: The condition arr[i] != max1 ensures duplicate maximums do not corrupt the second distinct largest.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Second Largest Element requires precise pointer and index control. Finding the second largest value without full sorting is an essential ICSE Section B problem. In a single pass, two variables (max1 and max2) are maintained: when a new maximum is found, max1 shifts to max2; otherwise, if an element is between max2 and max1, max2 is updated. Key syllabus requirement: Duplicate Handling: The condition arr[i] != max1 ensures duplicate maximums do not corrupt the second distinct largest. Always avoid common pitfall: Forgetting to update max2 when arr[i] > max1.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Duplicate Handling: The condition arr[i] != max1 ensures duplicate maximums do not corrupt the second distinct largest.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 16:\n// SecondLargestBasic.java\n// Duplicate Handling: The condition arr[i] != max1 ensures duplicate maximums do not corrupt the second distinct largest."
  },
  {
    "id": 15,
    "question": "What happens if the target array reference is null in Finding the Second Largest Element?",
    "shortAnswer": "Finding the Second Largest Element: Key Rule #5 - Optimal O(n) Efficiency: Solves the problem in a single pass without the O(n log n) overhead of sorting.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Second Largest Element requires precise pointer and index control. Finding the second largest value without full sorting is an essential ICSE Section B problem. In a single pass, two variables (max1 and max2) are maintained: when a new maximum is found, max1 shifts to max2; otherwise, if an element is between max2 and max1, max2 is updated. Key syllabus requirement: Optimal O(n) Efficiency: Solves the problem in a single pass without the O(n log n) overhead of sorting. Always avoid common pitfall: Failing to handle arrays where all elements are identical.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Optimal O(n) Efficiency: Solves the problem in a single pass without the O(n log n) overhead of sorting.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 16:\n// SecondLargestBasic.java\n// Optimal O(n) Efficiency: Solves the problem in a single pass without the O(n log n) overhead of sorting."
  },
  {
    "id": 16,
    "question": "How does BlueJ facilitate testing Finding the Second Largest Element?",
    "shortAnswer": "Finding the Second Largest Element: Key Rule #1 - Dual Variable Initialization: Initialize max1 = Integer.MIN_VALUE and max2 = Integer.MIN_VALUE.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Second Largest Element requires precise pointer and index control. Finding the second largest value without full sorting is an essential ICSE Section B problem. In a single pass, two variables (max1 and max2) are maintained: when a new maximum is found, max1 shifts to max2; otherwise, if an element is between max2 and max1, max2 is updated. Key syllabus requirement: Dual Variable Initialization: Initialize max1 = Integer.MIN_VALUE and max2 = Integer.MIN_VALUE. Always avoid common pitfall: Assuming second largest is at index (length - 2) after sorting without checking for duplicate maximums.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Dual Variable Initialization: Initialize max1 = Integer.MIN_VALUE and max2 = Integer.MIN_VALUE.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 16:\n// SecondLargestBasic.java\n// Dual Variable Initialization: Initialize max1 = Integer.MIN_VALUE and max2 = Integer.MIN_VALUE."
  },
  {
    "id": 17,
    "question": "Can Finding the Second Largest Element be implemented using a while loop instead of a for loop?",
    "shortAnswer": "Finding the Second Largest Element: Key Rule #2 - Primary Update: If arr[i] > max1, shift max2 = max1 and update max1 = arr[i].",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Second Largest Element requires precise pointer and index control. Finding the second largest value without full sorting is an essential ICSE Section B problem. In a single pass, two variables (max1 and max2) are maintained: when a new maximum is found, max1 shifts to max2; otherwise, if an element is between max2 and max1, max2 is updated. Key syllabus requirement: Primary Update: If arr[i] > max1, shift max2 = max1 and update max1 = arr[i]. Always avoid common pitfall: Forgetting to update max2 when arr[i] > max1.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Primary Update: If arr[i] > max1, shift max2 = max1 and update max1 = arr[i].",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 16:\n// SecondLargestBasic.java\n// Primary Update: If arr[i] > max1, shift max2 = max1 and update max1 = arr[i]."
  },
  {
    "id": 18,
    "question": "What happens if you check index arr[length] in Finding the Second Largest Element?",
    "shortAnswer": "Finding the Second Largest Element: Key Rule #3 - Secondary Update: Else if arr[i] > max2 and arr[i] != max1, update max2 = arr[i].",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Second Largest Element requires precise pointer and index control. Finding the second largest value without full sorting is an essential ICSE Section B problem. In a single pass, two variables (max1 and max2) are maintained: when a new maximum is found, max1 shifts to max2; otherwise, if an element is between max2 and max1, max2 is updated. Key syllabus requirement: Secondary Update: Else if arr[i] > max2 and arr[i] != max1, update max2 = arr[i]. Always avoid common pitfall: Failing to handle arrays where all elements are identical.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "intermediate",
    "options": [
      "Secondary Update: Else if arr[i] > max2 and arr[i] != max1, update max2 = arr[i].",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 16:\n// SecondLargestBasic.java\n// Secondary Update: Else if arr[i] > max2 and arr[i] != max1, update max2 = arr[i]."
  },
  {
    "id": 19,
    "question": "Why is single-pass preferred over two-pass in Finding the Second Largest Element?",
    "shortAnswer": "Finding the Second Largest Element: Key Rule #4 - Duplicate Handling: The condition arr[i] != max1 ensures duplicate maximums do not corrupt the second distinct largest.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Second Largest Element requires precise pointer and index control. Finding the second largest value without full sorting is an essential ICSE Section B problem. In a single pass, two variables (max1 and max2) are maintained: when a new maximum is found, max1 shifts to max2; otherwise, if an element is between max2 and max1, max2 is updated. Key syllabus requirement: Duplicate Handling: The condition arr[i] != max1 ensures duplicate maximums do not corrupt the second distinct largest. Always avoid common pitfall: Assuming second largest is at index (length - 2) after sorting without checking for duplicate maximums.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Duplicate Handling: The condition arr[i] != max1 ensures duplicate maximums do not corrupt the second distinct largest.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 16:\n// SecondLargestBasic.java\n// Duplicate Handling: The condition arr[i] != max1 ensures duplicate maximums do not corrupt the second distinct largest."
  },
  {
    "id": 20,
    "question": "How does Finding the Second Largest Element interact with Scanner keyboard input?",
    "shortAnswer": "Finding the Second Largest Element: Key Rule #5 - Optimal O(n) Efficiency: Solves the problem in a single pass without the O(n log n) overhead of sorting.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Second Largest Element requires precise pointer and index control. Finding the second largest value without full sorting is an essential ICSE Section B problem. In a single pass, two variables (max1 and max2) are maintained: when a new maximum is found, max1 shifts to max2; otherwise, if an element is between max2 and max1, max2 is updated. Key syllabus requirement: Optimal O(n) Efficiency: Solves the problem in a single pass without the O(n log n) overhead of sorting. Always avoid common pitfall: Forgetting to update max2 when arr[i] > max1.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Optimal O(n) Efficiency: Solves the problem in a single pass without the O(n log n) overhead of sorting.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 16:\n// SecondLargestBasic.java\n// Optimal O(n) Efficiency: Solves the problem in a single pass without the O(n log n) overhead of sorting."
  },
  {
    "id": 21,
    "question": "Is Finding the Second Largest Element considered an in-place algorithm?",
    "shortAnswer": "Finding the Second Largest Element: Key Rule #1 - Dual Variable Initialization: Initialize max1 = Integer.MIN_VALUE and max2 = Integer.MIN_VALUE.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Second Largest Element requires precise pointer and index control. Finding the second largest value without full sorting is an essential ICSE Section B problem. In a single pass, two variables (max1 and max2) are maintained: when a new maximum is found, max1 shifts to max2; otherwise, if an element is between max2 and max1, max2 is updated. Key syllabus requirement: Dual Variable Initialization: Initialize max1 = Integer.MIN_VALUE and max2 = Integer.MIN_VALUE. Always avoid common pitfall: Failing to handle arrays where all elements are identical.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Dual Variable Initialization: Initialize max1 = Integer.MIN_VALUE and max2 = Integer.MIN_VALUE.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 16:\n// SecondLargestBasic.java\n// Dual Variable Initialization: Initialize max1 = Integer.MIN_VALUE and max2 = Integer.MIN_VALUE."
  },
  {
    "id": 22,
    "question": "What return type should a helper method implementing Finding the Second Largest Element have?",
    "shortAnswer": "Finding the Second Largest Element: Key Rule #2 - Primary Update: If arr[i] > max1, shift max2 = max1 and update max1 = arr[i].",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Second Largest Element requires precise pointer and index control. Finding the second largest value without full sorting is an essential ICSE Section B problem. In a single pass, two variables (max1 and max2) are maintained: when a new maximum is found, max1 shifts to max2; otherwise, if an element is between max2 and max1, max2 is updated. Key syllabus requirement: Primary Update: If arr[i] > max1, shift max2 = max1 and update max1 = arr[i]. Always avoid common pitfall: Assuming second largest is at index (length - 2) after sorting without checking for duplicate maximums.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Primary Update: If arr[i] > max1, shift max2 = max1 and update max1 = arr[i].",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 16:\n// SecondLargestBasic.java\n// Primary Update: If arr[i] > max1, shift max2 = max1 and update max1 = arr[i]."
  },
  {
    "id": 23,
    "question": "How do you print results clearly in Finding the Second Largest Element?",
    "shortAnswer": "Finding the Second Largest Element: Key Rule #3 - Secondary Update: Else if arr[i] > max2 and arr[i] != max1, update max2 = arr[i].",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Second Largest Element requires precise pointer and index control. Finding the second largest value without full sorting is an essential ICSE Section B problem. In a single pass, two variables (max1 and max2) are maintained: when a new maximum is found, max1 shifts to max2; otherwise, if an element is between max2 and max1, max2 is updated. Key syllabus requirement: Secondary Update: Else if arr[i] > max2 and arr[i] != max1, update max2 = arr[i]. Always avoid common pitfall: Forgetting to update max2 when arr[i] > max1.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Secondary Update: Else if arr[i] > max2 and arr[i] != max1, update max2 = arr[i].",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 16:\n// SecondLargestBasic.java\n// Secondary Update: Else if arr[i] > max2 and arr[i] != max1, update max2 = arr[i]."
  },
  {
    "id": 24,
    "question": "How many total passes or iterations are executed in Finding the Second Largest Element?",
    "shortAnswer": "Finding the Second Largest Element: Key Rule #4 - Duplicate Handling: The condition arr[i] != max1 ensures duplicate maximums do not corrupt the second distinct largest.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Second Largest Element requires precise pointer and index control. Finding the second largest value without full sorting is an essential ICSE Section B problem. In a single pass, two variables (max1 and max2) are maintained: when a new maximum is found, max1 shifts to max2; otherwise, if an element is between max2 and max1, max2 is updated. Key syllabus requirement: Duplicate Handling: The condition arr[i] != max1 ensures duplicate maximums do not corrupt the second distinct largest. Always avoid common pitfall: Failing to handle arrays where all elements are identical.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Duplicate Handling: The condition arr[i] != max1 ensures duplicate maximums do not corrupt the second distinct largest.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 16:\n// SecondLargestBasic.java\n// Duplicate Handling: The condition arr[i] != max1 ensures duplicate maximums do not corrupt the second distinct largest."
  },
  {
    "id": 25,
    "question": "What master advice does Sukanta Hui give for scoring full 15/15 on Finding the Second Largest Element?",
    "shortAnswer": "Finding the Second Largest Element: Key Rule #5 - Optimal O(n) Efficiency: Solves the problem in a single pass without the O(n log n) overhead of sorting.",
    "explanation": "In ICSE Class 10 Computer Applications, Finding the Second Largest Element requires precise pointer and index control. Finding the second largest value without full sorting is an essential ICSE Section B problem. In a single pass, two variables (max1 and max2) are maintained: when a new maximum is found, max1 shifts to max2; otherwise, if an element is between max2 and max1, max2 is updated. Key syllabus requirement: Optimal O(n) Efficiency: Solves the problem in a single pass without the O(n log n) overhead of sorting. Always avoid common pitfall: Assuming second largest is at index (length - 2) after sorting without checking for duplicate maximums.",
    "hint": "Recall the algorithm steps, loop conditions, and variable tracing table.",
    "level": "advanced",
    "options": [
      "Optimal O(n) Efficiency: Solves the problem in a single pass without the O(n log n) overhead of sorting.",
      "The algorithm runs in O(1) constant time regardless of array size",
      "Array indices start at 1 and end at array.length",
      "The array must be reversed before performing this operation"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 16:\n// SecondLargestBasic.java\n// Optimal O(n) Efficiency: Solves the problem in a single pass without the O(n log n) overhead of sorting."
  }
];

export default questions;
