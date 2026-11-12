const questions = [
  {
    "id": 1,
    "question": "What is the primary concept of Arrays in Java: Concept & Memory Representation?",
    "shortAnswer": "Arrays in Java: Concept & Memory Representation: Fundamental rule #1 - Zero-Based Indexing: The first element is always at index 0, and the last is at index (length - 1).",
    "explanation": "In ICSE Class 10 Java, Arrays in Java: Concept & Memory Representation requires strict adherence to memory rules. An array in Java is a dynamically allocated object stored in heap memory that holds a fixed number of homogeneous elements in contiguous memory locations. A reference variable on the stack points to the base memory address of the array in the heap. Key requirement: Zero-Based Indexing: The first element is always at index 0, and the last is at index (length - 1). Always avoid common pitfall: Accessing index arr[arr.length] results in runtime ArrayIndexOutOfBoundsException.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Zero-Based Indexing: The first element is always at index 0, and the last is at index (length - 1).",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// ArrayConcept.java\nint[] arr = new int[5];\n// Zero-Based Indexing: The first element is always at index 0, and the last is at index (length - 1)."
  },
  {
    "id": 2,
    "question": "How does Java allocate memory for Arrays in Java: Concept & Memory Representation?",
    "shortAnswer": "Arrays in Java: Concept & Memory Representation: Fundamental rule #2 - Contiguous Allocation: Elements are stored in continuous adjacent bytes in heap memory.",
    "explanation": "In ICSE Class 10 Java, Arrays in Java: Concept & Memory Representation requires strict adherence to memory rules. An array in Java is a dynamically allocated object stored in heap memory that holds a fixed number of homogeneous elements in contiguous memory locations. A reference variable on the stack points to the base memory address of the array in the heap. Key requirement: Contiguous Allocation: Elements are stored in continuous adjacent bytes in heap memory. Always avoid common pitfall: Treating an array reference variable as the actual array data rather than an address pointer.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Contiguous Allocation: Elements are stored in continuous adjacent bytes in heap memory.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// ArrayConcept.java\nint[] arr = new int[5];\n// Contiguous Allocation: Elements are stored in continuous adjacent bytes in heap memory."
  },
  {
    "id": 3,
    "question": "What is the time complexity associated with Arrays in Java: Concept & Memory Representation?",
    "shortAnswer": "Arrays in Java: Concept & Memory Representation: Fundamental rule #3 - Homogeneous Elements: All elements in an array must share the exact same declared data type.",
    "explanation": "In ICSE Class 10 Java, Arrays in Java: Concept & Memory Representation requires strict adherence to memory rules. An array in Java is a dynamically allocated object stored in heap memory that holds a fixed number of homogeneous elements in contiguous memory locations. A reference variable on the stack points to the base memory address of the array in the heap. Key requirement: Homogeneous Elements: All elements in an array must share the exact same declared data type. Always avoid common pitfall: Attempting to store different data types in the same primitive array.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Homogeneous Elements: All elements in an array must share the exact same declared data type.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// ArrayConcept.java\nint[] arr = new int[5];\n// Homogeneous Elements: All elements in an array must share the exact same declared data type."
  },
  {
    "id": 4,
    "question": "Which common ICSE board exam mistake occurs in Arrays in Java: Concept & Memory Representation?",
    "shortAnswer": "Arrays in Java: Concept & Memory Representation: Fundamental rule #4 - Fixed Size: Once created, the physical size of an array cannot be expanded or shrunk.",
    "explanation": "In ICSE Class 10 Java, Arrays in Java: Concept & Memory Representation requires strict adherence to memory rules. An array in Java is a dynamically allocated object stored in heap memory that holds a fixed number of homogeneous elements in contiguous memory locations. A reference variable on the stack points to the base memory address of the array in the heap. Key requirement: Fixed Size: Once created, the physical size of an array cannot be expanded or shrunk. Always avoid common pitfall: Accessing index arr[arr.length] results in runtime ArrayIndexOutOfBoundsException.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Fixed Size: Once created, the physical size of an array cannot be expanded or shrunk.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// ArrayConcept.java\nint[] arr = new int[5];\n// Fixed Size: Once created, the physical size of an array cannot be expanded or shrunk."
  },
  {
    "id": 5,
    "question": "How is zero-based indexing relevant to Arrays in Java: Concept & Memory Representation?",
    "shortAnswer": "Arrays in Java: Concept & Memory Representation: Fundamental rule #5 - Direct O(1) Access: Any element can be accessed instantaneously via base address + (index * element_size).",
    "explanation": "In ICSE Class 10 Java, Arrays in Java: Concept & Memory Representation requires strict adherence to memory rules. An array in Java is a dynamically allocated object stored in heap memory that holds a fixed number of homogeneous elements in contiguous memory locations. A reference variable on the stack points to the base memory address of the array in the heap. Key requirement: Direct O(1) Access: Any element can be accessed instantaneously via base address + (index * element_size). Always avoid common pitfall: Treating an array reference variable as the actual array data rather than an address pointer.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Direct O(1) Access: Any element can be accessed instantaneously via base address + (index * element_size).",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// ArrayConcept.java\nint[] arr = new int[5];\n// Direct O(1) Access: Any element can be accessed instantaneously via base address + (index * element_size)."
  },
  {
    "id": 6,
    "question": "What exception is thrown if boundaries are violated in Arrays in Java: Concept & Memory Representation?",
    "shortAnswer": "Arrays in Java: Concept & Memory Representation: Fundamental rule #1 - Zero-Based Indexing: The first element is always at index 0, and the last is at index (length - 1).",
    "explanation": "In ICSE Class 10 Java, Arrays in Java: Concept & Memory Representation requires strict adherence to memory rules. An array in Java is a dynamically allocated object stored in heap memory that holds a fixed number of homogeneous elements in contiguous memory locations. A reference variable on the stack points to the base memory address of the array in the heap. Key requirement: Zero-Based Indexing: The first element is always at index 0, and the last is at index (length - 1). Always avoid common pitfall: Attempting to store different data types in the same primitive array.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Zero-Based Indexing: The first element is always at index 0, and the last is at index (length - 1).",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// ArrayConcept.java\nint[] arr = new int[5];\n// Zero-Based Indexing: The first element is always at index 0, and the last is at index (length - 1)."
  },
  {
    "id": 7,
    "question": "Can negative values be used in Arrays in Java: Concept & Memory Representation?",
    "shortAnswer": "Arrays in Java: Concept & Memory Representation: Fundamental rule #2 - Contiguous Allocation: Elements are stored in continuous adjacent bytes in heap memory.",
    "explanation": "In ICSE Class 10 Java, Arrays in Java: Concept & Memory Representation requires strict adherence to memory rules. An array in Java is a dynamically allocated object stored in heap memory that holds a fixed number of homogeneous elements in contiguous memory locations. A reference variable on the stack points to the base memory address of the array in the heap. Key requirement: Contiguous Allocation: Elements are stored in continuous adjacent bytes in heap memory. Always avoid common pitfall: Accessing index arr[arr.length] results in runtime ArrayIndexOutOfBoundsException.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Contiguous Allocation: Elements are stored in continuous adjacent bytes in heap memory.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// ArrayConcept.java\nint[] arr = new int[5];\n// Contiguous Allocation: Elements are stored in continuous adjacent bytes in heap memory."
  },
  {
    "id": 8,
    "question": "How does the 'new' operator interact with Arrays in Java: Concept & Memory Representation?",
    "shortAnswer": "Arrays in Java: Concept & Memory Representation: Fundamental rule #3 - Homogeneous Elements: All elements in an array must share the exact same declared data type.",
    "explanation": "In ICSE Class 10 Java, Arrays in Java: Concept & Memory Representation requires strict adherence to memory rules. An array in Java is a dynamically allocated object stored in heap memory that holds a fixed number of homogeneous elements in contiguous memory locations. A reference variable on the stack points to the base memory address of the array in the heap. Key requirement: Homogeneous Elements: All elements in an array must share the exact same declared data type. Always avoid common pitfall: Treating an array reference variable as the actual array data rather than an address pointer.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Homogeneous Elements: All elements in an array must share the exact same declared data type.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// ArrayConcept.java\nint[] arr = new int[5];\n// Homogeneous Elements: All elements in an array must share the exact same declared data type."
  },
  {
    "id": 9,
    "question": "What role does the length property play in Arrays in Java: Concept & Memory Representation?",
    "shortAnswer": "Arrays in Java: Concept & Memory Representation: Fundamental rule #4 - Fixed Size: Once created, the physical size of an array cannot be expanded or shrunk.",
    "explanation": "In ICSE Class 10 Java, Arrays in Java: Concept & Memory Representation requires strict adherence to memory rules. An array in Java is a dynamically allocated object stored in heap memory that holds a fixed number of homogeneous elements in contiguous memory locations. A reference variable on the stack points to the base memory address of the array in the heap. Key requirement: Fixed Size: Once created, the physical size of an array cannot be expanded or shrunk. Always avoid common pitfall: Attempting to store different data types in the same primitive array.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Fixed Size: Once created, the physical size of an array cannot be expanded or shrunk.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// ArrayConcept.java\nint[] arr = new int[5];\n// Fixed Size: Once created, the physical size of an array cannot be expanded or shrunk."
  },
  {
    "id": 10,
    "question": "How does the stack memory differ from heap memory in Arrays in Java: Concept & Memory Representation?",
    "shortAnswer": "Arrays in Java: Concept & Memory Representation: Fundamental rule #5 - Direct O(1) Access: Any element can be accessed instantaneously via base address + (index * element_size).",
    "explanation": "In ICSE Class 10 Java, Arrays in Java: Concept & Memory Representation requires strict adherence to memory rules. An array in Java is a dynamically allocated object stored in heap memory that holds a fixed number of homogeneous elements in contiguous memory locations. A reference variable on the stack points to the base memory address of the array in the heap. Key requirement: Direct O(1) Access: Any element can be accessed instantaneously via base address + (index * element_size). Always avoid common pitfall: Accessing index arr[arr.length] results in runtime ArrayIndexOutOfBoundsException.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Direct O(1) Access: Any element can be accessed instantaneously via base address + (index * element_size).",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// ArrayConcept.java\nint[] arr = new int[5];\n// Direct O(1) Access: Any element can be accessed instantaneously via base address + (index * element_size)."
  },
  {
    "id": 11,
    "question": "Is the size of an array fixed or dynamic in Arrays in Java: Concept & Memory Representation?",
    "shortAnswer": "Arrays in Java: Concept & Memory Representation: Fundamental rule #1 - Zero-Based Indexing: The first element is always at index 0, and the last is at index (length - 1).",
    "explanation": "In ICSE Class 10 Java, Arrays in Java: Concept & Memory Representation requires strict adherence to memory rules. An array in Java is a dynamically allocated object stored in heap memory that holds a fixed number of homogeneous elements in contiguous memory locations. A reference variable on the stack points to the base memory address of the array in the heap. Key requirement: Zero-Based Indexing: The first element is always at index 0, and the last is at index (length - 1). Always avoid common pitfall: Treating an array reference variable as the actual array data rather than an address pointer.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Zero-Based Indexing: The first element is always at index 0, and the last is at index (length - 1).",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// ArrayConcept.java\nint[] arr = new int[5];\n// Zero-Based Indexing: The first element is always at index 0, and the last is at index (length - 1)."
  },
  {
    "id": 12,
    "question": "What are the default values assigned by the JVM in Arrays in Java: Concept & Memory Representation?",
    "shortAnswer": "Arrays in Java: Concept & Memory Representation: Fundamental rule #2 - Contiguous Allocation: Elements are stored in continuous adjacent bytes in heap memory.",
    "explanation": "In ICSE Class 10 Java, Arrays in Java: Concept & Memory Representation requires strict adherence to memory rules. An array in Java is a dynamically allocated object stored in heap memory that holds a fixed number of homogeneous elements in contiguous memory locations. A reference variable on the stack points to the base memory address of the array in the heap. Key requirement: Contiguous Allocation: Elements are stored in continuous adjacent bytes in heap memory. Always avoid common pitfall: Attempting to store different data types in the same primitive array.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Contiguous Allocation: Elements are stored in continuous adjacent bytes in heap memory.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// ArrayConcept.java\nint[] arr = new int[5];\n// Contiguous Allocation: Elements are stored in continuous adjacent bytes in heap memory."
  },
  {
    "id": 13,
    "question": "How does Scanner input work when dealing with Arrays in Java: Concept & Memory Representation?",
    "shortAnswer": "Arrays in Java: Concept & Memory Representation: Fundamental rule #3 - Homogeneous Elements: All elements in an array must share the exact same declared data type.",
    "explanation": "In ICSE Class 10 Java, Arrays in Java: Concept & Memory Representation requires strict adherence to memory rules. An array in Java is a dynamically allocated object stored in heap memory that holds a fixed number of homogeneous elements in contiguous memory locations. A reference variable on the stack points to the base memory address of the array in the heap. Key requirement: Homogeneous Elements: All elements in an array must share the exact same declared data type. Always avoid common pitfall: Accessing index arr[arr.length] results in runtime ArrayIndexOutOfBoundsException.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Homogeneous Elements: All elements in an array must share the exact same declared data type.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// ArrayConcept.java\nint[] arr = new int[5];\n// Homogeneous Elements: All elements in an array must share the exact same declared data type."
  },
  {
    "id": 14,
    "question": "What is the difference between declaring and instantiating in Arrays in Java: Concept & Memory Representation?",
    "shortAnswer": "Arrays in Java: Concept & Memory Representation: Fundamental rule #4 - Fixed Size: Once created, the physical size of an array cannot be expanded or shrunk.",
    "explanation": "In ICSE Class 10 Java, Arrays in Java: Concept & Memory Representation requires strict adherence to memory rules. An array in Java is a dynamically allocated object stored in heap memory that holds a fixed number of homogeneous elements in contiguous memory locations. A reference variable on the stack points to the base memory address of the array in the heap. Key requirement: Fixed Size: Once created, the physical size of an array cannot be expanded or shrunk. Always avoid common pitfall: Treating an array reference variable as the actual array data rather than an address pointer.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Fixed Size: Once created, the physical size of an array cannot be expanded or shrunk.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// ArrayConcept.java\nint[] arr = new int[5];\n// Fixed Size: Once created, the physical size of an array cannot be expanded or shrunk."
  },
  {
    "id": 15,
    "question": "Can an array hold elements of different data types in Arrays in Java: Concept & Memory Representation?",
    "shortAnswer": "Arrays in Java: Concept & Memory Representation: Fundamental rule #5 - Direct O(1) Access: Any element can be accessed instantaneously via base address + (index * element_size).",
    "explanation": "In ICSE Class 10 Java, Arrays in Java: Concept & Memory Representation requires strict adherence to memory rules. An array in Java is a dynamically allocated object stored in heap memory that holds a fixed number of homogeneous elements in contiguous memory locations. A reference variable on the stack points to the base memory address of the array in the heap. Key requirement: Direct O(1) Access: Any element can be accessed instantaneously via base address + (index * element_size). Always avoid common pitfall: Attempting to store different data types in the same primitive array.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Direct O(1) Access: Any element can be accessed instantaneously via base address + (index * element_size).",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// ArrayConcept.java\nint[] arr = new int[5];\n// Direct O(1) Access: Any element can be accessed instantaneously via base address + (index * element_size)."
  },
  {
    "id": 16,
    "question": "How do we traverse in reverse order when applying Arrays in Java: Concept & Memory Representation?",
    "shortAnswer": "Arrays in Java: Concept & Memory Representation: Fundamental rule #1 - Zero-Based Indexing: The first element is always at index 0, and the last is at index (length - 1).",
    "explanation": "In ICSE Class 10 Java, Arrays in Java: Concept & Memory Representation requires strict adherence to memory rules. An array in Java is a dynamically allocated object stored in heap memory that holds a fixed number of homogeneous elements in contiguous memory locations. A reference variable on the stack points to the base memory address of the array in the heap. Key requirement: Zero-Based Indexing: The first element is always at index 0, and the last is at index (length - 1). Always avoid common pitfall: Accessing index arr[arr.length] results in runtime ArrayIndexOutOfBoundsException.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Zero-Based Indexing: The first element is always at index 0, and the last is at index (length - 1).",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// ArrayConcept.java\nint[] arr = new int[5];\n// Zero-Based Indexing: The first element is always at index 0, and the last is at index (length - 1)."
  },
  {
    "id": 17,
    "question": "What happens if you print an array reference directly in Arrays in Java: Concept & Memory Representation?",
    "shortAnswer": "Arrays in Java: Concept & Memory Representation: Fundamental rule #2 - Contiguous Allocation: Elements are stored in continuous adjacent bytes in heap memory.",
    "explanation": "In ICSE Class 10 Java, Arrays in Java: Concept & Memory Representation requires strict adherence to memory rules. An array in Java is a dynamically allocated object stored in heap memory that holds a fixed number of homogeneous elements in contiguous memory locations. A reference variable on the stack points to the base memory address of the array in the heap. Key requirement: Contiguous Allocation: Elements are stored in continuous adjacent bytes in heap memory. Always avoid common pitfall: Treating an array reference variable as the actual array data rather than an address pointer.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Contiguous Allocation: Elements are stored in continuous adjacent bytes in heap memory.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// ArrayConcept.java\nint[] arr = new int[5];\n// Contiguous Allocation: Elements are stored in continuous adjacent bytes in heap memory."
  },
  {
    "id": 18,
    "question": "How does BlueJ visualize the operations in Arrays in Java: Concept & Memory Representation?",
    "shortAnswer": "Arrays in Java: Concept & Memory Representation: Fundamental rule #3 - Homogeneous Elements: All elements in an array must share the exact same declared data type.",
    "explanation": "In ICSE Class 10 Java, Arrays in Java: Concept & Memory Representation requires strict adherence to memory rules. An array in Java is a dynamically allocated object stored in heap memory that holds a fixed number of homogeneous elements in contiguous memory locations. A reference variable on the stack points to the base memory address of the array in the heap. Key requirement: Homogeneous Elements: All elements in an array must share the exact same declared data type. Always avoid common pitfall: Attempting to store different data types in the same primitive array.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Homogeneous Elements: All elements in an array must share the exact same declared data type.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// ArrayConcept.java\nint[] arr = new int[5];\n// Homogeneous Elements: All elements in an array must share the exact same declared data type."
  },
  {
    "id": 19,
    "question": "How do you write a Variable Description Table (VDT) entry for Arrays in Java: Concept & Memory Representation?",
    "shortAnswer": "Arrays in Java: Concept & Memory Representation: Fundamental rule #4 - Fixed Size: Once created, the physical size of an array cannot be expanded or shrunk.",
    "explanation": "In ICSE Class 10 Java, Arrays in Java: Concept & Memory Representation requires strict adherence to memory rules. An array in Java is a dynamically allocated object stored in heap memory that holds a fixed number of homogeneous elements in contiguous memory locations. A reference variable on the stack points to the base memory address of the array in the heap. Key requirement: Fixed Size: Once created, the physical size of an array cannot be expanded or shrunk. Always avoid common pitfall: Accessing index arr[arr.length] results in runtime ArrayIndexOutOfBoundsException.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Fixed Size: Once created, the physical size of an array cannot be expanded or shrunk.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// ArrayConcept.java\nint[] arr = new int[5];\n// Fixed Size: Once created, the physical size of an array cannot be expanded or shrunk."
  },
  {
    "id": 20,
    "question": "What happens if the array reference is null in Arrays in Java: Concept & Memory Representation?",
    "shortAnswer": "Arrays in Java: Concept & Memory Representation: Fundamental rule #5 - Direct O(1) Access: Any element can be accessed instantaneously via base address + (index * element_size).",
    "explanation": "In ICSE Class 10 Java, Arrays in Java: Concept & Memory Representation requires strict adherence to memory rules. An array in Java is a dynamically allocated object stored in heap memory that holds a fixed number of homogeneous elements in contiguous memory locations. A reference variable on the stack points to the base memory address of the array in the heap. Key requirement: Direct O(1) Access: Any element can be accessed instantaneously via base address + (index * element_size). Always avoid common pitfall: Treating an array reference variable as the actual array data rather than an address pointer.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Direct O(1) Access: Any element can be accessed instantaneously via base address + (index * element_size).",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// ArrayConcept.java\nint[] arr = new int[5];\n// Direct O(1) Access: Any element can be accessed instantaneously via base address + (index * element_size)."
  },
  {
    "id": 21,
    "question": "How can you pass an array to a method in Arrays in Java: Concept & Memory Representation?",
    "shortAnswer": "Arrays in Java: Concept & Memory Representation: Fundamental rule #1 - Zero-Based Indexing: The first element is always at index 0, and the last is at index (length - 1).",
    "explanation": "In ICSE Class 10 Java, Arrays in Java: Concept & Memory Representation requires strict adherence to memory rules. An array in Java is a dynamically allocated object stored in heap memory that holds a fixed number of homogeneous elements in contiguous memory locations. A reference variable on the stack points to the base memory address of the array in the heap. Key requirement: Zero-Based Indexing: The first element is always at index 0, and the last is at index (length - 1). Always avoid common pitfall: Attempting to store different data types in the same primitive array.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Zero-Based Indexing: The first element is always at index 0, and the last is at index (length - 1).",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// ArrayConcept.java\nint[] arr = new int[5];\n// Zero-Based Indexing: The first element is always at index 0, and the last is at index (length - 1)."
  },
  {
    "id": 22,
    "question": "Can an array have a length of 0 in Arrays in Java: Concept & Memory Representation?",
    "shortAnswer": "Arrays in Java: Concept & Memory Representation: Fundamental rule #2 - Contiguous Allocation: Elements are stored in continuous adjacent bytes in heap memory.",
    "explanation": "In ICSE Class 10 Java, Arrays in Java: Concept & Memory Representation requires strict adherence to memory rules. An array in Java is a dynamically allocated object stored in heap memory that holds a fixed number of homogeneous elements in contiguous memory locations. A reference variable on the stack points to the base memory address of the array in the heap. Key requirement: Contiguous Allocation: Elements are stored in continuous adjacent bytes in heap memory. Always avoid common pitfall: Accessing index arr[arr.length] results in runtime ArrayIndexOutOfBoundsException.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Contiguous Allocation: Elements are stored in continuous adjacent bytes in heap memory.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// ArrayConcept.java\nint[] arr = new int[5];\n// Contiguous Allocation: Elements are stored in continuous adjacent bytes in heap memory."
  },
  {
    "id": 23,
    "question": "Why is array access O(1) constant time in Arrays in Java: Concept & Memory Representation?",
    "shortAnswer": "Arrays in Java: Concept & Memory Representation: Fundamental rule #3 - Homogeneous Elements: All elements in an array must share the exact same declared data type.",
    "explanation": "In ICSE Class 10 Java, Arrays in Java: Concept & Memory Representation requires strict adherence to memory rules. An array in Java is a dynamically allocated object stored in heap memory that holds a fixed number of homogeneous elements in contiguous memory locations. A reference variable on the stack points to the base memory address of the array in the heap. Key requirement: Homogeneous Elements: All elements in an array must share the exact same declared data type. Always avoid common pitfall: Treating an array reference variable as the actual array data rather than an address pointer.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Homogeneous Elements: All elements in an array must share the exact same declared data type.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// ArrayConcept.java\nint[] arr = new int[5];\n// Homogeneous Elements: All elements in an array must share the exact same declared data type."
  },
  {
    "id": 24,
    "question": "How do you prevent off-by-one errors in Arrays in Java: Concept & Memory Representation?",
    "shortAnswer": "Arrays in Java: Concept & Memory Representation: Fundamental rule #4 - Fixed Size: Once created, the physical size of an array cannot be expanded or shrunk.",
    "explanation": "In ICSE Class 10 Java, Arrays in Java: Concept & Memory Representation requires strict adherence to memory rules. An array in Java is a dynamically allocated object stored in heap memory that holds a fixed number of homogeneous elements in contiguous memory locations. A reference variable on the stack points to the base memory address of the array in the heap. Key requirement: Fixed Size: Once created, the physical size of an array cannot be expanded or shrunk. Always avoid common pitfall: Attempting to store different data types in the same primitive array.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Fixed Size: Once created, the physical size of an array cannot be expanded or shrunk.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// ArrayConcept.java\nint[] arr = new int[5];\n// Fixed Size: Once created, the physical size of an array cannot be expanded or shrunk."
  },
  {
    "id": 25,
    "question": "What master advice does Sukanta Hui give for scoring full marks on Arrays in Java: Concept & Memory Representation?",
    "shortAnswer": "Arrays in Java: Concept & Memory Representation: Fundamental rule #5 - Direct O(1) Access: Any element can be accessed instantaneously via base address + (index * element_size).",
    "explanation": "In ICSE Class 10 Java, Arrays in Java: Concept & Memory Representation requires strict adherence to memory rules. An array in Java is a dynamically allocated object stored in heap memory that holds a fixed number of homogeneous elements in contiguous memory locations. A reference variable on the stack points to the base memory address of the array in the heap. Key requirement: Direct O(1) Access: Any element can be accessed instantaneously via base address + (index * element_size). Always avoid common pitfall: Accessing index arr[arr.length] results in runtime ArrayIndexOutOfBoundsException.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Direct O(1) Access: Any element can be accessed instantaneously via base address + (index * element_size).",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 0:\n// ArrayConcept.java\nint[] arr = new int[5];\n// Direct O(1) Access: Any element can be accessed instantaneously via base address + (index * element_size)."
  }
];

export default questions;
