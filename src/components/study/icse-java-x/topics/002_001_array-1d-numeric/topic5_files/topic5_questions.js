const questions = [
  {
    "id": 1,
    "question": "What is the primary concept of Traversing an Array Using for Loop?",
    "shortAnswer": "Traversing an Array Using for Loop: Fundamental rule #1 - Forward Traversal: Initialize i = 0; loop while i < arr.length; increment i++.",
    "explanation": "In ICSE Class 10 Java, Traversing an Array Using for Loop requires strict adherence to memory rules. Array traversal is the systematic process of visiting each element of an array exactly once to inspect, process, or accumulate values. The standard for-loop with an index counter variable (i) provides complete control over iteration direction and step size. Key requirement: Forward Traversal: Initialize i = 0; loop while i < arr.length; increment i++. Always avoid common pitfall: Off-by-one error: Starting loop at i = 1 skips the first element at index 0.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Forward Traversal: Initialize i = 0; loop while i < arr.length; increment i++.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// TraverseForLoop.java\nint[] arr = new int[5];\n// Forward Traversal: Initialize i = 0; loop while i < arr.length; increment i++."
  },
  {
    "id": 2,
    "question": "How does Java allocate memory for Traversing an Array Using for Loop?",
    "shortAnswer": "Traversing an Array Using for Loop: Fundamental rule #2 - Reverse Traversal: Initialize i = arr.length - 1; loop while i >= 0; decrement i--.",
    "explanation": "In ICSE Class 10 Java, Traversing an Array Using for Loop requires strict adherence to memory rules. Array traversal is the systematic process of visiting each element of an array exactly once to inspect, process, or accumulate values. The standard for-loop with an index counter variable (i) provides complete control over iteration direction and step size. Key requirement: Reverse Traversal: Initialize i = arr.length - 1; loop while i >= 0; decrement i--. Always avoid common pitfall: Ending reverse loop at i > 0 skips the first element at index 0.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Reverse Traversal: Initialize i = arr.length - 1; loop while i >= 0; decrement i--.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// TraverseForLoop.java\nint[] arr = new int[5];\n// Reverse Traversal: Initialize i = arr.length - 1; loop while i >= 0; decrement i--."
  },
  {
    "id": 3,
    "question": "What is the time complexity associated with Traversing an Array Using for Loop?",
    "shortAnswer": "Traversing an Array Using for Loop: Fundamental rule #3 - Step Sizing: Modify increment expression (e.g. i += 2) to visit alternate or even/odd indexed elements.",
    "explanation": "In ICSE Class 10 Java, Traversing an Array Using for Loop requires strict adherence to memory rules. Array traversal is the systematic process of visiting each element of an array exactly once to inspect, process, or accumulate values. The standard for-loop with an index counter variable (i) provides complete control over iteration direction and step size. Key requirement: Step Sizing: Modify increment expression (e.g. i += 2) to visit alternate or even/odd indexed elements. Always avoid common pitfall: Modifying the loop counter variable arbitrarily inside the loop body causing skipped elements or infinite loops.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Step Sizing: Modify increment expression (e.g. i += 2) to visit alternate or even/odd indexed elements.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// TraverseForLoop.java\nint[] arr = new int[5];\n// Step Sizing: Modify increment expression (e.g. i += 2) to visit alternate or even/odd indexed elements."
  },
  {
    "id": 4,
    "question": "Which common ICSE board exam mistake occurs in Traversing an Array Using for Loop?",
    "shortAnswer": "Traversing an Array Using for Loop: Fundamental rule #4 - Accumulator Pattern: Initialize running sum or count variable before loop; update inside loop body.",
    "explanation": "In ICSE Class 10 Java, Traversing an Array Using for Loop requires strict adherence to memory rules. Array traversal is the systematic process of visiting each element of an array exactly once to inspect, process, or accumulate values. The standard for-loop with an index counter variable (i) provides complete control over iteration direction and step size. Key requirement: Accumulator Pattern: Initialize running sum or count variable before loop; update inside loop body. Always avoid common pitfall: Off-by-one error: Starting loop at i = 1 skips the first element at index 0.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Accumulator Pattern: Initialize running sum or count variable before loop; update inside loop body.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// TraverseForLoop.java\nint[] arr = new int[5];\n// Accumulator Pattern: Initialize running sum or count variable before loop; update inside loop body."
  },
  {
    "id": 5,
    "question": "How is zero-based indexing relevant to Traversing an Array Using for Loop?",
    "shortAnswer": "Traversing an Array Using for Loop: Fundamental rule #5 - In-Place Transformation: Modify array elements directly inside loop using arr[i] = transformedValue.",
    "explanation": "In ICSE Class 10 Java, Traversing an Array Using for Loop requires strict adherence to memory rules. Array traversal is the systematic process of visiting each element of an array exactly once to inspect, process, or accumulate values. The standard for-loop with an index counter variable (i) provides complete control over iteration direction and step size. Key requirement: In-Place Transformation: Modify array elements directly inside loop using arr[i] = transformedValue. Always avoid common pitfall: Ending reverse loop at i > 0 skips the first element at index 0.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "In-Place Transformation: Modify array elements directly inside loop using arr[i] = transformedValue.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// TraverseForLoop.java\nint[] arr = new int[5];\n// In-Place Transformation: Modify array elements directly inside loop using arr[i] = transformedValue."
  },
  {
    "id": 6,
    "question": "What exception is thrown if boundaries are violated in Traversing an Array Using for Loop?",
    "shortAnswer": "Traversing an Array Using for Loop: Fundamental rule #1 - Forward Traversal: Initialize i = 0; loop while i < arr.length; increment i++.",
    "explanation": "In ICSE Class 10 Java, Traversing an Array Using for Loop requires strict adherence to memory rules. Array traversal is the systematic process of visiting each element of an array exactly once to inspect, process, or accumulate values. The standard for-loop with an index counter variable (i) provides complete control over iteration direction and step size. Key requirement: Forward Traversal: Initialize i = 0; loop while i < arr.length; increment i++. Always avoid common pitfall: Modifying the loop counter variable arbitrarily inside the loop body causing skipped elements or infinite loops.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Forward Traversal: Initialize i = 0; loop while i < arr.length; increment i++.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// TraverseForLoop.java\nint[] arr = new int[5];\n// Forward Traversal: Initialize i = 0; loop while i < arr.length; increment i++."
  },
  {
    "id": 7,
    "question": "Can negative values be used in Traversing an Array Using for Loop?",
    "shortAnswer": "Traversing an Array Using for Loop: Fundamental rule #2 - Reverse Traversal: Initialize i = arr.length - 1; loop while i >= 0; decrement i--.",
    "explanation": "In ICSE Class 10 Java, Traversing an Array Using for Loop requires strict adherence to memory rules. Array traversal is the systematic process of visiting each element of an array exactly once to inspect, process, or accumulate values. The standard for-loop with an index counter variable (i) provides complete control over iteration direction and step size. Key requirement: Reverse Traversal: Initialize i = arr.length - 1; loop while i >= 0; decrement i--. Always avoid common pitfall: Off-by-one error: Starting loop at i = 1 skips the first element at index 0.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Reverse Traversal: Initialize i = arr.length - 1; loop while i >= 0; decrement i--.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// TraverseForLoop.java\nint[] arr = new int[5];\n// Reverse Traversal: Initialize i = arr.length - 1; loop while i >= 0; decrement i--."
  },
  {
    "id": 8,
    "question": "How does the 'new' operator interact with Traversing an Array Using for Loop?",
    "shortAnswer": "Traversing an Array Using for Loop: Fundamental rule #3 - Step Sizing: Modify increment expression (e.g. i += 2) to visit alternate or even/odd indexed elements.",
    "explanation": "In ICSE Class 10 Java, Traversing an Array Using for Loop requires strict adherence to memory rules. Array traversal is the systematic process of visiting each element of an array exactly once to inspect, process, or accumulate values. The standard for-loop with an index counter variable (i) provides complete control over iteration direction and step size. Key requirement: Step Sizing: Modify increment expression (e.g. i += 2) to visit alternate or even/odd indexed elements. Always avoid common pitfall: Ending reverse loop at i > 0 skips the first element at index 0.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Step Sizing: Modify increment expression (e.g. i += 2) to visit alternate or even/odd indexed elements.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// TraverseForLoop.java\nint[] arr = new int[5];\n// Step Sizing: Modify increment expression (e.g. i += 2) to visit alternate or even/odd indexed elements."
  },
  {
    "id": 9,
    "question": "What role does the length property play in Traversing an Array Using for Loop?",
    "shortAnswer": "Traversing an Array Using for Loop: Fundamental rule #4 - Accumulator Pattern: Initialize running sum or count variable before loop; update inside loop body.",
    "explanation": "In ICSE Class 10 Java, Traversing an Array Using for Loop requires strict adherence to memory rules. Array traversal is the systematic process of visiting each element of an array exactly once to inspect, process, or accumulate values. The standard for-loop with an index counter variable (i) provides complete control over iteration direction and step size. Key requirement: Accumulator Pattern: Initialize running sum or count variable before loop; update inside loop body. Always avoid common pitfall: Modifying the loop counter variable arbitrarily inside the loop body causing skipped elements or infinite loops.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Accumulator Pattern: Initialize running sum or count variable before loop; update inside loop body.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// TraverseForLoop.java\nint[] arr = new int[5];\n// Accumulator Pattern: Initialize running sum or count variable before loop; update inside loop body."
  },
  {
    "id": 10,
    "question": "How does the stack memory differ from heap memory in Traversing an Array Using for Loop?",
    "shortAnswer": "Traversing an Array Using for Loop: Fundamental rule #5 - In-Place Transformation: Modify array elements directly inside loop using arr[i] = transformedValue.",
    "explanation": "In ICSE Class 10 Java, Traversing an Array Using for Loop requires strict adherence to memory rules. Array traversal is the systematic process of visiting each element of an array exactly once to inspect, process, or accumulate values. The standard for-loop with an index counter variable (i) provides complete control over iteration direction and step size. Key requirement: In-Place Transformation: Modify array elements directly inside loop using arr[i] = transformedValue. Always avoid common pitfall: Off-by-one error: Starting loop at i = 1 skips the first element at index 0.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "In-Place Transformation: Modify array elements directly inside loop using arr[i] = transformedValue.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// TraverseForLoop.java\nint[] arr = new int[5];\n// In-Place Transformation: Modify array elements directly inside loop using arr[i] = transformedValue."
  },
  {
    "id": 11,
    "question": "Is the size of an array fixed or dynamic in Traversing an Array Using for Loop?",
    "shortAnswer": "Traversing an Array Using for Loop: Fundamental rule #1 - Forward Traversal: Initialize i = 0; loop while i < arr.length; increment i++.",
    "explanation": "In ICSE Class 10 Java, Traversing an Array Using for Loop requires strict adherence to memory rules. Array traversal is the systematic process of visiting each element of an array exactly once to inspect, process, or accumulate values. The standard for-loop with an index counter variable (i) provides complete control over iteration direction and step size. Key requirement: Forward Traversal: Initialize i = 0; loop while i < arr.length; increment i++. Always avoid common pitfall: Ending reverse loop at i > 0 skips the first element at index 0.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Forward Traversal: Initialize i = 0; loop while i < arr.length; increment i++.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// TraverseForLoop.java\nint[] arr = new int[5];\n// Forward Traversal: Initialize i = 0; loop while i < arr.length; increment i++."
  },
  {
    "id": 12,
    "question": "What are the default values assigned by the JVM in Traversing an Array Using for Loop?",
    "shortAnswer": "Traversing an Array Using for Loop: Fundamental rule #2 - Reverse Traversal: Initialize i = arr.length - 1; loop while i >= 0; decrement i--.",
    "explanation": "In ICSE Class 10 Java, Traversing an Array Using for Loop requires strict adherence to memory rules. Array traversal is the systematic process of visiting each element of an array exactly once to inspect, process, or accumulate values. The standard for-loop with an index counter variable (i) provides complete control over iteration direction and step size. Key requirement: Reverse Traversal: Initialize i = arr.length - 1; loop while i >= 0; decrement i--. Always avoid common pitfall: Modifying the loop counter variable arbitrarily inside the loop body causing skipped elements or infinite loops.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Reverse Traversal: Initialize i = arr.length - 1; loop while i >= 0; decrement i--.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// TraverseForLoop.java\nint[] arr = new int[5];\n// Reverse Traversal: Initialize i = arr.length - 1; loop while i >= 0; decrement i--."
  },
  {
    "id": 13,
    "question": "How does Scanner input work when dealing with Traversing an Array Using for Loop?",
    "shortAnswer": "Traversing an Array Using for Loop: Fundamental rule #3 - Step Sizing: Modify increment expression (e.g. i += 2) to visit alternate or even/odd indexed elements.",
    "explanation": "In ICSE Class 10 Java, Traversing an Array Using for Loop requires strict adherence to memory rules. Array traversal is the systematic process of visiting each element of an array exactly once to inspect, process, or accumulate values. The standard for-loop with an index counter variable (i) provides complete control over iteration direction and step size. Key requirement: Step Sizing: Modify increment expression (e.g. i += 2) to visit alternate or even/odd indexed elements. Always avoid common pitfall: Off-by-one error: Starting loop at i = 1 skips the first element at index 0.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Step Sizing: Modify increment expression (e.g. i += 2) to visit alternate or even/odd indexed elements.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// TraverseForLoop.java\nint[] arr = new int[5];\n// Step Sizing: Modify increment expression (e.g. i += 2) to visit alternate or even/odd indexed elements."
  },
  {
    "id": 14,
    "question": "What is the difference between declaring and instantiating in Traversing an Array Using for Loop?",
    "shortAnswer": "Traversing an Array Using for Loop: Fundamental rule #4 - Accumulator Pattern: Initialize running sum or count variable before loop; update inside loop body.",
    "explanation": "In ICSE Class 10 Java, Traversing an Array Using for Loop requires strict adherence to memory rules. Array traversal is the systematic process of visiting each element of an array exactly once to inspect, process, or accumulate values. The standard for-loop with an index counter variable (i) provides complete control over iteration direction and step size. Key requirement: Accumulator Pattern: Initialize running sum or count variable before loop; update inside loop body. Always avoid common pitfall: Ending reverse loop at i > 0 skips the first element at index 0.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Accumulator Pattern: Initialize running sum or count variable before loop; update inside loop body.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// TraverseForLoop.java\nint[] arr = new int[5];\n// Accumulator Pattern: Initialize running sum or count variable before loop; update inside loop body."
  },
  {
    "id": 15,
    "question": "Can an array hold elements of different data types in Traversing an Array Using for Loop?",
    "shortAnswer": "Traversing an Array Using for Loop: Fundamental rule #5 - In-Place Transformation: Modify array elements directly inside loop using arr[i] = transformedValue.",
    "explanation": "In ICSE Class 10 Java, Traversing an Array Using for Loop requires strict adherence to memory rules. Array traversal is the systematic process of visiting each element of an array exactly once to inspect, process, or accumulate values. The standard for-loop with an index counter variable (i) provides complete control over iteration direction and step size. Key requirement: In-Place Transformation: Modify array elements directly inside loop using arr[i] = transformedValue. Always avoid common pitfall: Modifying the loop counter variable arbitrarily inside the loop body causing skipped elements or infinite loops.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "In-Place Transformation: Modify array elements directly inside loop using arr[i] = transformedValue.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// TraverseForLoop.java\nint[] arr = new int[5];\n// In-Place Transformation: Modify array elements directly inside loop using arr[i] = transformedValue."
  },
  {
    "id": 16,
    "question": "How do we traverse in reverse order when applying Traversing an Array Using for Loop?",
    "shortAnswer": "Traversing an Array Using for Loop: Fundamental rule #1 - Forward Traversal: Initialize i = 0; loop while i < arr.length; increment i++.",
    "explanation": "In ICSE Class 10 Java, Traversing an Array Using for Loop requires strict adherence to memory rules. Array traversal is the systematic process of visiting each element of an array exactly once to inspect, process, or accumulate values. The standard for-loop with an index counter variable (i) provides complete control over iteration direction and step size. Key requirement: Forward Traversal: Initialize i = 0; loop while i < arr.length; increment i++. Always avoid common pitfall: Off-by-one error: Starting loop at i = 1 skips the first element at index 0.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Forward Traversal: Initialize i = 0; loop while i < arr.length; increment i++.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// TraverseForLoop.java\nint[] arr = new int[5];\n// Forward Traversal: Initialize i = 0; loop while i < arr.length; increment i++."
  },
  {
    "id": 17,
    "question": "What happens if you print an array reference directly in Traversing an Array Using for Loop?",
    "shortAnswer": "Traversing an Array Using for Loop: Fundamental rule #2 - Reverse Traversal: Initialize i = arr.length - 1; loop while i >= 0; decrement i--.",
    "explanation": "In ICSE Class 10 Java, Traversing an Array Using for Loop requires strict adherence to memory rules. Array traversal is the systematic process of visiting each element of an array exactly once to inspect, process, or accumulate values. The standard for-loop with an index counter variable (i) provides complete control over iteration direction and step size. Key requirement: Reverse Traversal: Initialize i = arr.length - 1; loop while i >= 0; decrement i--. Always avoid common pitfall: Ending reverse loop at i > 0 skips the first element at index 0.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Reverse Traversal: Initialize i = arr.length - 1; loop while i >= 0; decrement i--.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// TraverseForLoop.java\nint[] arr = new int[5];\n// Reverse Traversal: Initialize i = arr.length - 1; loop while i >= 0; decrement i--."
  },
  {
    "id": 18,
    "question": "How does BlueJ visualize the operations in Traversing an Array Using for Loop?",
    "shortAnswer": "Traversing an Array Using for Loop: Fundamental rule #3 - Step Sizing: Modify increment expression (e.g. i += 2) to visit alternate or even/odd indexed elements.",
    "explanation": "In ICSE Class 10 Java, Traversing an Array Using for Loop requires strict adherence to memory rules. Array traversal is the systematic process of visiting each element of an array exactly once to inspect, process, or accumulate values. The standard for-loop with an index counter variable (i) provides complete control over iteration direction and step size. Key requirement: Step Sizing: Modify increment expression (e.g. i += 2) to visit alternate or even/odd indexed elements. Always avoid common pitfall: Modifying the loop counter variable arbitrarily inside the loop body causing skipped elements or infinite loops.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Step Sizing: Modify increment expression (e.g. i += 2) to visit alternate or even/odd indexed elements.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// TraverseForLoop.java\nint[] arr = new int[5];\n// Step Sizing: Modify increment expression (e.g. i += 2) to visit alternate or even/odd indexed elements."
  },
  {
    "id": 19,
    "question": "How do you write a Variable Description Table (VDT) entry for Traversing an Array Using for Loop?",
    "shortAnswer": "Traversing an Array Using for Loop: Fundamental rule #4 - Accumulator Pattern: Initialize running sum or count variable before loop; update inside loop body.",
    "explanation": "In ICSE Class 10 Java, Traversing an Array Using for Loop requires strict adherence to memory rules. Array traversal is the systematic process of visiting each element of an array exactly once to inspect, process, or accumulate values. The standard for-loop with an index counter variable (i) provides complete control over iteration direction and step size. Key requirement: Accumulator Pattern: Initialize running sum or count variable before loop; update inside loop body. Always avoid common pitfall: Off-by-one error: Starting loop at i = 1 skips the first element at index 0.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Accumulator Pattern: Initialize running sum or count variable before loop; update inside loop body.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// TraverseForLoop.java\nint[] arr = new int[5];\n// Accumulator Pattern: Initialize running sum or count variable before loop; update inside loop body."
  },
  {
    "id": 20,
    "question": "What happens if the array reference is null in Traversing an Array Using for Loop?",
    "shortAnswer": "Traversing an Array Using for Loop: Fundamental rule #5 - In-Place Transformation: Modify array elements directly inside loop using arr[i] = transformedValue.",
    "explanation": "In ICSE Class 10 Java, Traversing an Array Using for Loop requires strict adherence to memory rules. Array traversal is the systematic process of visiting each element of an array exactly once to inspect, process, or accumulate values. The standard for-loop with an index counter variable (i) provides complete control over iteration direction and step size. Key requirement: In-Place Transformation: Modify array elements directly inside loop using arr[i] = transformedValue. Always avoid common pitfall: Ending reverse loop at i > 0 skips the first element at index 0.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "In-Place Transformation: Modify array elements directly inside loop using arr[i] = transformedValue.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// TraverseForLoop.java\nint[] arr = new int[5];\n// In-Place Transformation: Modify array elements directly inside loop using arr[i] = transformedValue."
  },
  {
    "id": 21,
    "question": "How can you pass an array to a method in Traversing an Array Using for Loop?",
    "shortAnswer": "Traversing an Array Using for Loop: Fundamental rule #1 - Forward Traversal: Initialize i = 0; loop while i < arr.length; increment i++.",
    "explanation": "In ICSE Class 10 Java, Traversing an Array Using for Loop requires strict adherence to memory rules. Array traversal is the systematic process of visiting each element of an array exactly once to inspect, process, or accumulate values. The standard for-loop with an index counter variable (i) provides complete control over iteration direction and step size. Key requirement: Forward Traversal: Initialize i = 0; loop while i < arr.length; increment i++. Always avoid common pitfall: Modifying the loop counter variable arbitrarily inside the loop body causing skipped elements or infinite loops.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Forward Traversal: Initialize i = 0; loop while i < arr.length; increment i++.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// TraverseForLoop.java\nint[] arr = new int[5];\n// Forward Traversal: Initialize i = 0; loop while i < arr.length; increment i++."
  },
  {
    "id": 22,
    "question": "Can an array have a length of 0 in Traversing an Array Using for Loop?",
    "shortAnswer": "Traversing an Array Using for Loop: Fundamental rule #2 - Reverse Traversal: Initialize i = arr.length - 1; loop while i >= 0; decrement i--.",
    "explanation": "In ICSE Class 10 Java, Traversing an Array Using for Loop requires strict adherence to memory rules. Array traversal is the systematic process of visiting each element of an array exactly once to inspect, process, or accumulate values. The standard for-loop with an index counter variable (i) provides complete control over iteration direction and step size. Key requirement: Reverse Traversal: Initialize i = arr.length - 1; loop while i >= 0; decrement i--. Always avoid common pitfall: Off-by-one error: Starting loop at i = 1 skips the first element at index 0.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Reverse Traversal: Initialize i = arr.length - 1; loop while i >= 0; decrement i--.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// TraverseForLoop.java\nint[] arr = new int[5];\n// Reverse Traversal: Initialize i = arr.length - 1; loop while i >= 0; decrement i--."
  },
  {
    "id": 23,
    "question": "Why is array access O(1) constant time in Traversing an Array Using for Loop?",
    "shortAnswer": "Traversing an Array Using for Loop: Fundamental rule #3 - Step Sizing: Modify increment expression (e.g. i += 2) to visit alternate or even/odd indexed elements.",
    "explanation": "In ICSE Class 10 Java, Traversing an Array Using for Loop requires strict adherence to memory rules. Array traversal is the systematic process of visiting each element of an array exactly once to inspect, process, or accumulate values. The standard for-loop with an index counter variable (i) provides complete control over iteration direction and step size. Key requirement: Step Sizing: Modify increment expression (e.g. i += 2) to visit alternate or even/odd indexed elements. Always avoid common pitfall: Ending reverse loop at i > 0 skips the first element at index 0.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Step Sizing: Modify increment expression (e.g. i += 2) to visit alternate or even/odd indexed elements.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// TraverseForLoop.java\nint[] arr = new int[5];\n// Step Sizing: Modify increment expression (e.g. i += 2) to visit alternate or even/odd indexed elements."
  },
  {
    "id": 24,
    "question": "How do you prevent off-by-one errors in Traversing an Array Using for Loop?",
    "shortAnswer": "Traversing an Array Using for Loop: Fundamental rule #4 - Accumulator Pattern: Initialize running sum or count variable before loop; update inside loop body.",
    "explanation": "In ICSE Class 10 Java, Traversing an Array Using for Loop requires strict adherence to memory rules. Array traversal is the systematic process of visiting each element of an array exactly once to inspect, process, or accumulate values. The standard for-loop with an index counter variable (i) provides complete control over iteration direction and step size. Key requirement: Accumulator Pattern: Initialize running sum or count variable before loop; update inside loop body. Always avoid common pitfall: Modifying the loop counter variable arbitrarily inside the loop body causing skipped elements or infinite loops.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Accumulator Pattern: Initialize running sum or count variable before loop; update inside loop body.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// TraverseForLoop.java\nint[] arr = new int[5];\n// Accumulator Pattern: Initialize running sum or count variable before loop; update inside loop body."
  },
  {
    "id": 25,
    "question": "What master advice does Sukanta Hui give for scoring full marks on Traversing an Array Using for Loop?",
    "shortAnswer": "Traversing an Array Using for Loop: Fundamental rule #5 - In-Place Transformation: Modify array elements directly inside loop using arr[i] = transformedValue.",
    "explanation": "In ICSE Class 10 Java, Traversing an Array Using for Loop requires strict adherence to memory rules. Array traversal is the systematic process of visiting each element of an array exactly once to inspect, process, or accumulate values. The standard for-loop with an index counter variable (i) provides complete control over iteration direction and step size. Key requirement: In-Place Transformation: Modify array elements directly inside loop using arr[i] = transformedValue. Always avoid common pitfall: Off-by-one error: Starting loop at i = 1 skips the first element at index 0.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "In-Place Transformation: Modify array elements directly inside loop using arr[i] = transformedValue.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 5:\n// TraverseForLoop.java\nint[] arr = new int[5];\n// In-Place Transformation: Modify array elements directly inside loop using arr[i] = transformedValue."
  }
];

export default questions;
