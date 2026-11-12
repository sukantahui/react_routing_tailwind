const questions = [
  {
    "id": 1,
    "question": "What is the primary concept of Array Creation Using new Keyword?",
    "shortAnswer": "Array Creation Using new Keyword: Fundamental rule #1 - Keyword 'new': Allocates heap memory for the array object and zeros all elements.",
    "explanation": "In ICSE Class 10 Java, Array Creation Using new Keyword requires strict adherence to memory rules. In Java, arrays are true objects created dynamically on the JVM heap using the 'new' keyword. The expression 'new int[n]' asks the memory allocator to reserve contiguous space for n integers and returns the starting memory reference. Key requirement: Keyword 'new': Allocates heap memory for the array object and zeros all elements. Always avoid common pitfall: Supplying negative size variables resulting in NegativeArraySizeException.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Keyword 'new': Allocates heap memory for the array object and zeros all elements.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// ArrayCreationNewKeyword.java\nint[] arr = new int[5];\n// Keyword 'new': Allocates heap memory for the array object and zeros all elements."
  },
  {
    "id": 2,
    "question": "How does Java allocate memory for Array Creation Using new Keyword?",
    "shortAnswer": "Array Creation Using new Keyword: Fundamental rule #2 - Dynamic Size: The size passed inside brackets can be an expression, variable, or literal evaluated at runtime.",
    "explanation": "In ICSE Class 10 Java, Array Creation Using new Keyword requires strict adherence to memory rules. In Java, arrays are true objects created dynamically on the JVM heap using the 'new' keyword. The expression 'new int[n]' asks the memory allocator to reserve contiguous space for n integers and returns the starting memory reference. Key requirement: Dynamic Size: The size passed inside brackets can be an expression, variable, or literal evaluated at runtime. Always avoid common pitfall: Re-instantiating an array with 'new' believing it resizes the original; it creates a brand new object losing previous contents.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Dynamic Size: The size passed inside brackets can be an expression, variable, or literal evaluated at runtime.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// ArrayCreationNewKeyword.java\nint[] arr = new int[5];\n// Dynamic Size: The size passed inside brackets can be an expression, variable, or literal evaluated at runtime."
  },
  {
    "id": 3,
    "question": "What is the time complexity associated with Array Creation Using new Keyword?",
    "shortAnswer": "Array Creation Using new Keyword: Fundamental rule #3 - Non-negative Size: Passing a negative integer size throws NegativeArraySizeException at runtime.",
    "explanation": "In ICSE Class 10 Java, Array Creation Using new Keyword requires strict adherence to memory rules. In Java, arrays are true objects created dynamically on the JVM heap using the 'new' keyword. The expression 'new int[n]' asks the memory allocator to reserve contiguous space for n integers and returns the starting memory reference. Key requirement: Non-negative Size: Passing a negative integer size throws NegativeArraySizeException at runtime. Always avoid common pitfall: Running out of heap memory when creating excessively large arrays (OutOfMemoryError).",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Non-negative Size: Passing a negative integer size throws NegativeArraySizeException at runtime.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// ArrayCreationNewKeyword.java\nint[] arr = new int[5];\n// Non-negative Size: Passing a negative integer size throws NegativeArraySizeException at runtime."
  },
  {
    "id": 4,
    "question": "Which common ICSE board exam mistake occurs in Array Creation Using new Keyword?",
    "shortAnswer": "Array Creation Using new Keyword: Fundamental rule #4 - Zero-Length Arrays: An array of size 0 ('new int[0]') is valid in Java and has length 0.",
    "explanation": "In ICSE Class 10 Java, Array Creation Using new Keyword requires strict adherence to memory rules. In Java, arrays are true objects created dynamically on the JVM heap using the 'new' keyword. The expression 'new int[n]' asks the memory allocator to reserve contiguous space for n integers and returns the starting memory reference. Key requirement: Zero-Length Arrays: An array of size 0 ('new int[0]') is valid in Java and has length 0. Always avoid common pitfall: Supplying negative size variables resulting in NegativeArraySizeException.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Zero-Length Arrays: An array of size 0 ('new int[0]') is valid in Java and has length 0.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// ArrayCreationNewKeyword.java\nint[] arr = new int[5];\n// Zero-Length Arrays: An array of size 0 ('new int[0]') is valid in Java and has length 0."
  },
  {
    "id": 5,
    "question": "How is zero-based indexing relevant to Array Creation Using new Keyword?",
    "shortAnswer": "Array Creation Using new Keyword: Fundamental rule #5 - Garbage Collection: When no references point to an array object, it becomes eligible for automatic garbage collection.",
    "explanation": "In ICSE Class 10 Java, Array Creation Using new Keyword requires strict adherence to memory rules. In Java, arrays are true objects created dynamically on the JVM heap using the 'new' keyword. The expression 'new int[n]' asks the memory allocator to reserve contiguous space for n integers and returns the starting memory reference. Key requirement: Garbage Collection: When no references point to an array object, it becomes eligible for automatic garbage collection. Always avoid common pitfall: Re-instantiating an array with 'new' believing it resizes the original; it creates a brand new object losing previous contents.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Garbage Collection: When no references point to an array object, it becomes eligible for automatic garbage collection.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// ArrayCreationNewKeyword.java\nint[] arr = new int[5];\n// Garbage Collection: When no references point to an array object, it becomes eligible for automatic garbage collection."
  },
  {
    "id": 6,
    "question": "What exception is thrown if boundaries are violated in Array Creation Using new Keyword?",
    "shortAnswer": "Array Creation Using new Keyword: Fundamental rule #1 - Keyword 'new': Allocates heap memory for the array object and zeros all elements.",
    "explanation": "In ICSE Class 10 Java, Array Creation Using new Keyword requires strict adherence to memory rules. In Java, arrays are true objects created dynamically on the JVM heap using the 'new' keyword. The expression 'new int[n]' asks the memory allocator to reserve contiguous space for n integers and returns the starting memory reference. Key requirement: Keyword 'new': Allocates heap memory for the array object and zeros all elements. Always avoid common pitfall: Running out of heap memory when creating excessively large arrays (OutOfMemoryError).",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Keyword 'new': Allocates heap memory for the array object and zeros all elements.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// ArrayCreationNewKeyword.java\nint[] arr = new int[5];\n// Keyword 'new': Allocates heap memory for the array object and zeros all elements."
  },
  {
    "id": 7,
    "question": "Can negative values be used in Array Creation Using new Keyword?",
    "shortAnswer": "Array Creation Using new Keyword: Fundamental rule #2 - Dynamic Size: The size passed inside brackets can be an expression, variable, or literal evaluated at runtime.",
    "explanation": "In ICSE Class 10 Java, Array Creation Using new Keyword requires strict adherence to memory rules. In Java, arrays are true objects created dynamically on the JVM heap using the 'new' keyword. The expression 'new int[n]' asks the memory allocator to reserve contiguous space for n integers and returns the starting memory reference. Key requirement: Dynamic Size: The size passed inside brackets can be an expression, variable, or literal evaluated at runtime. Always avoid common pitfall: Supplying negative size variables resulting in NegativeArraySizeException.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Dynamic Size: The size passed inside brackets can be an expression, variable, or literal evaluated at runtime.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// ArrayCreationNewKeyword.java\nint[] arr = new int[5];\n// Dynamic Size: The size passed inside brackets can be an expression, variable, or literal evaluated at runtime."
  },
  {
    "id": 8,
    "question": "How does the 'new' operator interact with Array Creation Using new Keyword?",
    "shortAnswer": "Array Creation Using new Keyword: Fundamental rule #3 - Non-negative Size: Passing a negative integer size throws NegativeArraySizeException at runtime.",
    "explanation": "In ICSE Class 10 Java, Array Creation Using new Keyword requires strict adherence to memory rules. In Java, arrays are true objects created dynamically on the JVM heap using the 'new' keyword. The expression 'new int[n]' asks the memory allocator to reserve contiguous space for n integers and returns the starting memory reference. Key requirement: Non-negative Size: Passing a negative integer size throws NegativeArraySizeException at runtime. Always avoid common pitfall: Re-instantiating an array with 'new' believing it resizes the original; it creates a brand new object losing previous contents.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Non-negative Size: Passing a negative integer size throws NegativeArraySizeException at runtime.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// ArrayCreationNewKeyword.java\nint[] arr = new int[5];\n// Non-negative Size: Passing a negative integer size throws NegativeArraySizeException at runtime."
  },
  {
    "id": 9,
    "question": "What role does the length property play in Array Creation Using new Keyword?",
    "shortAnswer": "Array Creation Using new Keyword: Fundamental rule #4 - Zero-Length Arrays: An array of size 0 ('new int[0]') is valid in Java and has length 0.",
    "explanation": "In ICSE Class 10 Java, Array Creation Using new Keyword requires strict adherence to memory rules. In Java, arrays are true objects created dynamically on the JVM heap using the 'new' keyword. The expression 'new int[n]' asks the memory allocator to reserve contiguous space for n integers and returns the starting memory reference. Key requirement: Zero-Length Arrays: An array of size 0 ('new int[0]') is valid in Java and has length 0. Always avoid common pitfall: Running out of heap memory when creating excessively large arrays (OutOfMemoryError).",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Zero-Length Arrays: An array of size 0 ('new int[0]') is valid in Java and has length 0.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// ArrayCreationNewKeyword.java\nint[] arr = new int[5];\n// Zero-Length Arrays: An array of size 0 ('new int[0]') is valid in Java and has length 0."
  },
  {
    "id": 10,
    "question": "How does the stack memory differ from heap memory in Array Creation Using new Keyword?",
    "shortAnswer": "Array Creation Using new Keyword: Fundamental rule #5 - Garbage Collection: When no references point to an array object, it becomes eligible for automatic garbage collection.",
    "explanation": "In ICSE Class 10 Java, Array Creation Using new Keyword requires strict adherence to memory rules. In Java, arrays are true objects created dynamically on the JVM heap using the 'new' keyword. The expression 'new int[n]' asks the memory allocator to reserve contiguous space for n integers and returns the starting memory reference. Key requirement: Garbage Collection: When no references point to an array object, it becomes eligible for automatic garbage collection. Always avoid common pitfall: Supplying negative size variables resulting in NegativeArraySizeException.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Garbage Collection: When no references point to an array object, it becomes eligible for automatic garbage collection.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// ArrayCreationNewKeyword.java\nint[] arr = new int[5];\n// Garbage Collection: When no references point to an array object, it becomes eligible for automatic garbage collection."
  },
  {
    "id": 11,
    "question": "Is the size of an array fixed or dynamic in Array Creation Using new Keyword?",
    "shortAnswer": "Array Creation Using new Keyword: Fundamental rule #1 - Keyword 'new': Allocates heap memory for the array object and zeros all elements.",
    "explanation": "In ICSE Class 10 Java, Array Creation Using new Keyword requires strict adherence to memory rules. In Java, arrays are true objects created dynamically on the JVM heap using the 'new' keyword. The expression 'new int[n]' asks the memory allocator to reserve contiguous space for n integers and returns the starting memory reference. Key requirement: Keyword 'new': Allocates heap memory for the array object and zeros all elements. Always avoid common pitfall: Re-instantiating an array with 'new' believing it resizes the original; it creates a brand new object losing previous contents.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Keyword 'new': Allocates heap memory for the array object and zeros all elements.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// ArrayCreationNewKeyword.java\nint[] arr = new int[5];\n// Keyword 'new': Allocates heap memory for the array object and zeros all elements."
  },
  {
    "id": 12,
    "question": "What are the default values assigned by the JVM in Array Creation Using new Keyword?",
    "shortAnswer": "Array Creation Using new Keyword: Fundamental rule #2 - Dynamic Size: The size passed inside brackets can be an expression, variable, or literal evaluated at runtime.",
    "explanation": "In ICSE Class 10 Java, Array Creation Using new Keyword requires strict adherence to memory rules. In Java, arrays are true objects created dynamically on the JVM heap using the 'new' keyword. The expression 'new int[n]' asks the memory allocator to reserve contiguous space for n integers and returns the starting memory reference. Key requirement: Dynamic Size: The size passed inside brackets can be an expression, variable, or literal evaluated at runtime. Always avoid common pitfall: Running out of heap memory when creating excessively large arrays (OutOfMemoryError).",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Dynamic Size: The size passed inside brackets can be an expression, variable, or literal evaluated at runtime.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// ArrayCreationNewKeyword.java\nint[] arr = new int[5];\n// Dynamic Size: The size passed inside brackets can be an expression, variable, or literal evaluated at runtime."
  },
  {
    "id": 13,
    "question": "How does Scanner input work when dealing with Array Creation Using new Keyword?",
    "shortAnswer": "Array Creation Using new Keyword: Fundamental rule #3 - Non-negative Size: Passing a negative integer size throws NegativeArraySizeException at runtime.",
    "explanation": "In ICSE Class 10 Java, Array Creation Using new Keyword requires strict adherence to memory rules. In Java, arrays are true objects created dynamically on the JVM heap using the 'new' keyword. The expression 'new int[n]' asks the memory allocator to reserve contiguous space for n integers and returns the starting memory reference. Key requirement: Non-negative Size: Passing a negative integer size throws NegativeArraySizeException at runtime. Always avoid common pitfall: Supplying negative size variables resulting in NegativeArraySizeException.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Non-negative Size: Passing a negative integer size throws NegativeArraySizeException at runtime.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// ArrayCreationNewKeyword.java\nint[] arr = new int[5];\n// Non-negative Size: Passing a negative integer size throws NegativeArraySizeException at runtime."
  },
  {
    "id": 14,
    "question": "What is the difference between declaring and instantiating in Array Creation Using new Keyword?",
    "shortAnswer": "Array Creation Using new Keyword: Fundamental rule #4 - Zero-Length Arrays: An array of size 0 ('new int[0]') is valid in Java and has length 0.",
    "explanation": "In ICSE Class 10 Java, Array Creation Using new Keyword requires strict adherence to memory rules. In Java, arrays are true objects created dynamically on the JVM heap using the 'new' keyword. The expression 'new int[n]' asks the memory allocator to reserve contiguous space for n integers and returns the starting memory reference. Key requirement: Zero-Length Arrays: An array of size 0 ('new int[0]') is valid in Java and has length 0. Always avoid common pitfall: Re-instantiating an array with 'new' believing it resizes the original; it creates a brand new object losing previous contents.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Zero-Length Arrays: An array of size 0 ('new int[0]') is valid in Java and has length 0.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// ArrayCreationNewKeyword.java\nint[] arr = new int[5];\n// Zero-Length Arrays: An array of size 0 ('new int[0]') is valid in Java and has length 0."
  },
  {
    "id": 15,
    "question": "Can an array hold elements of different data types in Array Creation Using new Keyword?",
    "shortAnswer": "Array Creation Using new Keyword: Fundamental rule #5 - Garbage Collection: When no references point to an array object, it becomes eligible for automatic garbage collection.",
    "explanation": "In ICSE Class 10 Java, Array Creation Using new Keyword requires strict adherence to memory rules. In Java, arrays are true objects created dynamically on the JVM heap using the 'new' keyword. The expression 'new int[n]' asks the memory allocator to reserve contiguous space for n integers and returns the starting memory reference. Key requirement: Garbage Collection: When no references point to an array object, it becomes eligible for automatic garbage collection. Always avoid common pitfall: Running out of heap memory when creating excessively large arrays (OutOfMemoryError).",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Garbage Collection: When no references point to an array object, it becomes eligible for automatic garbage collection.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// ArrayCreationNewKeyword.java\nint[] arr = new int[5];\n// Garbage Collection: When no references point to an array object, it becomes eligible for automatic garbage collection."
  },
  {
    "id": 16,
    "question": "How do we traverse in reverse order when applying Array Creation Using new Keyword?",
    "shortAnswer": "Array Creation Using new Keyword: Fundamental rule #1 - Keyword 'new': Allocates heap memory for the array object and zeros all elements.",
    "explanation": "In ICSE Class 10 Java, Array Creation Using new Keyword requires strict adherence to memory rules. In Java, arrays are true objects created dynamically on the JVM heap using the 'new' keyword. The expression 'new int[n]' asks the memory allocator to reserve contiguous space for n integers and returns the starting memory reference. Key requirement: Keyword 'new': Allocates heap memory for the array object and zeros all elements. Always avoid common pitfall: Supplying negative size variables resulting in NegativeArraySizeException.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Keyword 'new': Allocates heap memory for the array object and zeros all elements.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// ArrayCreationNewKeyword.java\nint[] arr = new int[5];\n// Keyword 'new': Allocates heap memory for the array object and zeros all elements."
  },
  {
    "id": 17,
    "question": "What happens if you print an array reference directly in Array Creation Using new Keyword?",
    "shortAnswer": "Array Creation Using new Keyword: Fundamental rule #2 - Dynamic Size: The size passed inside brackets can be an expression, variable, or literal evaluated at runtime.",
    "explanation": "In ICSE Class 10 Java, Array Creation Using new Keyword requires strict adherence to memory rules. In Java, arrays are true objects created dynamically on the JVM heap using the 'new' keyword. The expression 'new int[n]' asks the memory allocator to reserve contiguous space for n integers and returns the starting memory reference. Key requirement: Dynamic Size: The size passed inside brackets can be an expression, variable, or literal evaluated at runtime. Always avoid common pitfall: Re-instantiating an array with 'new' believing it resizes the original; it creates a brand new object losing previous contents.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Dynamic Size: The size passed inside brackets can be an expression, variable, or literal evaluated at runtime.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// ArrayCreationNewKeyword.java\nint[] arr = new int[5];\n// Dynamic Size: The size passed inside brackets can be an expression, variable, or literal evaluated at runtime."
  },
  {
    "id": 18,
    "question": "How does BlueJ visualize the operations in Array Creation Using new Keyword?",
    "shortAnswer": "Array Creation Using new Keyword: Fundamental rule #3 - Non-negative Size: Passing a negative integer size throws NegativeArraySizeException at runtime.",
    "explanation": "In ICSE Class 10 Java, Array Creation Using new Keyword requires strict adherence to memory rules. In Java, arrays are true objects created dynamically on the JVM heap using the 'new' keyword. The expression 'new int[n]' asks the memory allocator to reserve contiguous space for n integers and returns the starting memory reference. Key requirement: Non-negative Size: Passing a negative integer size throws NegativeArraySizeException at runtime. Always avoid common pitfall: Running out of heap memory when creating excessively large arrays (OutOfMemoryError).",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Non-negative Size: Passing a negative integer size throws NegativeArraySizeException at runtime.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// ArrayCreationNewKeyword.java\nint[] arr = new int[5];\n// Non-negative Size: Passing a negative integer size throws NegativeArraySizeException at runtime."
  },
  {
    "id": 19,
    "question": "How do you write a Variable Description Table (VDT) entry for Array Creation Using new Keyword?",
    "shortAnswer": "Array Creation Using new Keyword: Fundamental rule #4 - Zero-Length Arrays: An array of size 0 ('new int[0]') is valid in Java and has length 0.",
    "explanation": "In ICSE Class 10 Java, Array Creation Using new Keyword requires strict adherence to memory rules. In Java, arrays are true objects created dynamically on the JVM heap using the 'new' keyword. The expression 'new int[n]' asks the memory allocator to reserve contiguous space for n integers and returns the starting memory reference. Key requirement: Zero-Length Arrays: An array of size 0 ('new int[0]') is valid in Java and has length 0. Always avoid common pitfall: Supplying negative size variables resulting in NegativeArraySizeException.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Zero-Length Arrays: An array of size 0 ('new int[0]') is valid in Java and has length 0.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// ArrayCreationNewKeyword.java\nint[] arr = new int[5];\n// Zero-Length Arrays: An array of size 0 ('new int[0]') is valid in Java and has length 0."
  },
  {
    "id": 20,
    "question": "What happens if the array reference is null in Array Creation Using new Keyword?",
    "shortAnswer": "Array Creation Using new Keyword: Fundamental rule #5 - Garbage Collection: When no references point to an array object, it becomes eligible for automatic garbage collection.",
    "explanation": "In ICSE Class 10 Java, Array Creation Using new Keyword requires strict adherence to memory rules. In Java, arrays are true objects created dynamically on the JVM heap using the 'new' keyword. The expression 'new int[n]' asks the memory allocator to reserve contiguous space for n integers and returns the starting memory reference. Key requirement: Garbage Collection: When no references point to an array object, it becomes eligible for automatic garbage collection. Always avoid common pitfall: Re-instantiating an array with 'new' believing it resizes the original; it creates a brand new object losing previous contents.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Garbage Collection: When no references point to an array object, it becomes eligible for automatic garbage collection.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// ArrayCreationNewKeyword.java\nint[] arr = new int[5];\n// Garbage Collection: When no references point to an array object, it becomes eligible for automatic garbage collection."
  },
  {
    "id": 21,
    "question": "How can you pass an array to a method in Array Creation Using new Keyword?",
    "shortAnswer": "Array Creation Using new Keyword: Fundamental rule #1 - Keyword 'new': Allocates heap memory for the array object and zeros all elements.",
    "explanation": "In ICSE Class 10 Java, Array Creation Using new Keyword requires strict adherence to memory rules. In Java, arrays are true objects created dynamically on the JVM heap using the 'new' keyword. The expression 'new int[n]' asks the memory allocator to reserve contiguous space for n integers and returns the starting memory reference. Key requirement: Keyword 'new': Allocates heap memory for the array object and zeros all elements. Always avoid common pitfall: Running out of heap memory when creating excessively large arrays (OutOfMemoryError).",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Keyword 'new': Allocates heap memory for the array object and zeros all elements.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// ArrayCreationNewKeyword.java\nint[] arr = new int[5];\n// Keyword 'new': Allocates heap memory for the array object and zeros all elements."
  },
  {
    "id": 22,
    "question": "Can an array have a length of 0 in Array Creation Using new Keyword?",
    "shortAnswer": "Array Creation Using new Keyword: Fundamental rule #2 - Dynamic Size: The size passed inside brackets can be an expression, variable, or literal evaluated at runtime.",
    "explanation": "In ICSE Class 10 Java, Array Creation Using new Keyword requires strict adherence to memory rules. In Java, arrays are true objects created dynamically on the JVM heap using the 'new' keyword. The expression 'new int[n]' asks the memory allocator to reserve contiguous space for n integers and returns the starting memory reference. Key requirement: Dynamic Size: The size passed inside brackets can be an expression, variable, or literal evaluated at runtime. Always avoid common pitfall: Supplying negative size variables resulting in NegativeArraySizeException.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Dynamic Size: The size passed inside brackets can be an expression, variable, or literal evaluated at runtime.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// ArrayCreationNewKeyword.java\nint[] arr = new int[5];\n// Dynamic Size: The size passed inside brackets can be an expression, variable, or literal evaluated at runtime."
  },
  {
    "id": 23,
    "question": "Why is array access O(1) constant time in Array Creation Using new Keyword?",
    "shortAnswer": "Array Creation Using new Keyword: Fundamental rule #3 - Non-negative Size: Passing a negative integer size throws NegativeArraySizeException at runtime.",
    "explanation": "In ICSE Class 10 Java, Array Creation Using new Keyword requires strict adherence to memory rules. In Java, arrays are true objects created dynamically on the JVM heap using the 'new' keyword. The expression 'new int[n]' asks the memory allocator to reserve contiguous space for n integers and returns the starting memory reference. Key requirement: Non-negative Size: Passing a negative integer size throws NegativeArraySizeException at runtime. Always avoid common pitfall: Re-instantiating an array with 'new' believing it resizes the original; it creates a brand new object losing previous contents.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Non-negative Size: Passing a negative integer size throws NegativeArraySizeException at runtime.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// ArrayCreationNewKeyword.java\nint[] arr = new int[5];\n// Non-negative Size: Passing a negative integer size throws NegativeArraySizeException at runtime."
  },
  {
    "id": 24,
    "question": "How do you prevent off-by-one errors in Array Creation Using new Keyword?",
    "shortAnswer": "Array Creation Using new Keyword: Fundamental rule #4 - Zero-Length Arrays: An array of size 0 ('new int[0]') is valid in Java and has length 0.",
    "explanation": "In ICSE Class 10 Java, Array Creation Using new Keyword requires strict adherence to memory rules. In Java, arrays are true objects created dynamically on the JVM heap using the 'new' keyword. The expression 'new int[n]' asks the memory allocator to reserve contiguous space for n integers and returns the starting memory reference. Key requirement: Zero-Length Arrays: An array of size 0 ('new int[0]') is valid in Java and has length 0. Always avoid common pitfall: Running out of heap memory when creating excessively large arrays (OutOfMemoryError).",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Zero-Length Arrays: An array of size 0 ('new int[0]') is valid in Java and has length 0.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// ArrayCreationNewKeyword.java\nint[] arr = new int[5];\n// Zero-Length Arrays: An array of size 0 ('new int[0]') is valid in Java and has length 0."
  },
  {
    "id": 25,
    "question": "What master advice does Sukanta Hui give for scoring full marks on Array Creation Using new Keyword?",
    "shortAnswer": "Array Creation Using new Keyword: Fundamental rule #5 - Garbage Collection: When no references point to an array object, it becomes eligible for automatic garbage collection.",
    "explanation": "In ICSE Class 10 Java, Array Creation Using new Keyword requires strict adherence to memory rules. In Java, arrays are true objects created dynamically on the JVM heap using the 'new' keyword. The expression 'new int[n]' asks the memory allocator to reserve contiguous space for n integers and returns the starting memory reference. Key requirement: Garbage Collection: When no references point to an array object, it becomes eligible for automatic garbage collection. Always avoid common pitfall: Supplying negative size variables resulting in NegativeArraySizeException.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Garbage Collection: When no references point to an array object, it becomes eligible for automatic garbage collection.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 2:\n// ArrayCreationNewKeyword.java\nint[] arr = new int[5];\n// Garbage Collection: When no references point to an array object, it becomes eligible for automatic garbage collection."
  }
];

export default questions;
