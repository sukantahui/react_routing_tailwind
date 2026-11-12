const questions = [
  {
    "id": 1,
    "question": "What is the primary concept of Declaration & Initialization of Arrays?",
    "shortAnswer": "Declaration & Initialization of Arrays: Fundamental rule #1 - Preferred Syntax: 'int[] arr;' is strongly preferred over C-style 'int arr[];'.",
    "explanation": "In ICSE Class 10 Java, Declaration & Initialization of Arrays requires strict adherence to memory rules. Array declaration specifies the element type and variable name (e.g. int[] arr). Declaration alone creates only a reference variable initialized to null on the stack; initialization allocates heap memory either dynamically with 'new' or statically with an array initializer list. Key requirement: Preferred Syntax: 'int[] arr;' is strongly preferred over C-style 'int arr[];'. Always avoid common pitfall: Specifying array dimension during reference declaration (e.g., int[10] a;).",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Preferred Syntax: 'int[] arr;' is strongly preferred over C-style 'int arr[];'.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// ArrayDeclarationInit.java\nint[] arr = new int[5];\n// Preferred Syntax: 'int[] arr;' is strongly preferred over C-style 'int arr[];'."
  },
  {
    "id": 2,
    "question": "How does Java allocate memory for Declaration & Initialization of Arrays?",
    "shortAnswer": "Declaration & Initialization of Arrays: Fundamental rule #2 - Static Initializer: 'int[] arr = {10, 20, 30};' declares, creates, and initializes in one step.",
    "explanation": "In ICSE Class 10 Java, Declaration & Initialization of Arrays requires strict adherence to memory rules. Array declaration specifies the element type and variable name (e.g. int[] arr). Declaration alone creates only a reference variable initialized to null on the stack; initialization allocates heap memory either dynamically with 'new' or statically with an array initializer list. Key requirement: Static Initializer: 'int[] arr = {10, 20, 30};' declares, creates, and initializes in one step. Always avoid common pitfall: Using static initializer syntax after declaration without 'new int[]' (e.g., arr = {1, 2}; is illegal).",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Static Initializer: 'int[] arr = {10, 20, 30};' declares, creates, and initializes in one step.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// ArrayDeclarationInit.java\nint[] arr = new int[5];\n// Static Initializer: 'int[] arr = {10, 20, 30};' declares, creates, and initializes in one step."
  },
  {
    "id": 3,
    "question": "What is the time complexity associated with Declaration & Initialization of Arrays?",
    "shortAnswer": "Declaration & Initialization of Arrays: Fundamental rule #3 - Anonymous Array: 'new int[]{1, 2, 3}' can be passed directly as method arguments.",
    "explanation": "In ICSE Class 10 Java, Declaration & Initialization of Arrays requires strict adherence to memory rules. Array declaration specifies the element type and variable name (e.g. int[] arr). Declaration alone creates only a reference variable initialized to null on the stack; initialization allocates heap memory either dynamically with 'new' or statically with an array initializer list. Key requirement: Anonymous Array: 'new int[]{1, 2, 3}' can be passed directly as method arguments. Always avoid common pitfall: Leaving reference as null and attempting element access.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Anonymous Array: 'new int[]{1, 2, 3}' can be passed directly as method arguments.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// ArrayDeclarationInit.java\nint[] arr = new int[5];\n// Anonymous Array: 'new int[]{1, 2, 3}' can be passed directly as method arguments."
  },
  {
    "id": 4,
    "question": "Which common ICSE board exam mistake occurs in Declaration & Initialization of Arrays?",
    "shortAnswer": "Declaration & Initialization of Arrays: Fundamental rule #4 - No Size in Declaration: 'int[5] arr;' is a compile-time syntax error in Java.",
    "explanation": "In ICSE Class 10 Java, Declaration & Initialization of Arrays requires strict adherence to memory rules. Array declaration specifies the element type and variable name (e.g. int[] arr). Declaration alone creates only a reference variable initialized to null on the stack; initialization allocates heap memory either dynamically with 'new' or statically with an array initializer list. Key requirement: No Size in Declaration: 'int[5] arr;' is a compile-time syntax error in Java. Always avoid common pitfall: Specifying array dimension during reference declaration (e.g., int[10] a;).",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "No Size in Declaration: 'int[5] arr;' is a compile-time syntax error in Java.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// ArrayDeclarationInit.java\nint[] arr = new int[5];\n// No Size in Declaration: 'int[5] arr;' is a compile-time syntax error in Java."
  },
  {
    "id": 5,
    "question": "How is zero-based indexing relevant to Declaration & Initialization of Arrays?",
    "shortAnswer": "Declaration & Initialization of Arrays: Fundamental rule #5 - Uninitialized Reference: Accessing elements of an uninitialized array reference causes compile or runtime errors.",
    "explanation": "In ICSE Class 10 Java, Declaration & Initialization of Arrays requires strict adherence to memory rules. Array declaration specifies the element type and variable name (e.g. int[] arr). Declaration alone creates only a reference variable initialized to null on the stack; initialization allocates heap memory either dynamically with 'new' or statically with an array initializer list. Key requirement: Uninitialized Reference: Accessing elements of an uninitialized array reference causes compile or runtime errors. Always avoid common pitfall: Using static initializer syntax after declaration without 'new int[]' (e.g., arr = {1, 2}; is illegal).",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Uninitialized Reference: Accessing elements of an uninitialized array reference causes compile or runtime errors.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// ArrayDeclarationInit.java\nint[] arr = new int[5];\n// Uninitialized Reference: Accessing elements of an uninitialized array reference causes compile or runtime errors."
  },
  {
    "id": 6,
    "question": "What exception is thrown if boundaries are violated in Declaration & Initialization of Arrays?",
    "shortAnswer": "Declaration & Initialization of Arrays: Fundamental rule #1 - Preferred Syntax: 'int[] arr;' is strongly preferred over C-style 'int arr[];'.",
    "explanation": "In ICSE Class 10 Java, Declaration & Initialization of Arrays requires strict adherence to memory rules. Array declaration specifies the element type and variable name (e.g. int[] arr). Declaration alone creates only a reference variable initialized to null on the stack; initialization allocates heap memory either dynamically with 'new' or statically with an array initializer list. Key requirement: Preferred Syntax: 'int[] arr;' is strongly preferred over C-style 'int arr[];'. Always avoid common pitfall: Leaving reference as null and attempting element access.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Preferred Syntax: 'int[] arr;' is strongly preferred over C-style 'int arr[];'.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// ArrayDeclarationInit.java\nint[] arr = new int[5];\n// Preferred Syntax: 'int[] arr;' is strongly preferred over C-style 'int arr[];'."
  },
  {
    "id": 7,
    "question": "Can negative values be used in Declaration & Initialization of Arrays?",
    "shortAnswer": "Declaration & Initialization of Arrays: Fundamental rule #2 - Static Initializer: 'int[] arr = {10, 20, 30};' declares, creates, and initializes in one step.",
    "explanation": "In ICSE Class 10 Java, Declaration & Initialization of Arrays requires strict adherence to memory rules. Array declaration specifies the element type and variable name (e.g. int[] arr). Declaration alone creates only a reference variable initialized to null on the stack; initialization allocates heap memory either dynamically with 'new' or statically with an array initializer list. Key requirement: Static Initializer: 'int[] arr = {10, 20, 30};' declares, creates, and initializes in one step. Always avoid common pitfall: Specifying array dimension during reference declaration (e.g., int[10] a;).",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Static Initializer: 'int[] arr = {10, 20, 30};' declares, creates, and initializes in one step.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// ArrayDeclarationInit.java\nint[] arr = new int[5];\n// Static Initializer: 'int[] arr = {10, 20, 30};' declares, creates, and initializes in one step."
  },
  {
    "id": 8,
    "question": "How does the 'new' operator interact with Declaration & Initialization of Arrays?",
    "shortAnswer": "Declaration & Initialization of Arrays: Fundamental rule #3 - Anonymous Array: 'new int[]{1, 2, 3}' can be passed directly as method arguments.",
    "explanation": "In ICSE Class 10 Java, Declaration & Initialization of Arrays requires strict adherence to memory rules. Array declaration specifies the element type and variable name (e.g. int[] arr). Declaration alone creates only a reference variable initialized to null on the stack; initialization allocates heap memory either dynamically with 'new' or statically with an array initializer list. Key requirement: Anonymous Array: 'new int[]{1, 2, 3}' can be passed directly as method arguments. Always avoid common pitfall: Using static initializer syntax after declaration without 'new int[]' (e.g., arr = {1, 2}; is illegal).",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "basic",
    "options": [
      "Anonymous Array: 'new int[]{1, 2, 3}' can be passed directly as method arguments.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// ArrayDeclarationInit.java\nint[] arr = new int[5];\n// Anonymous Array: 'new int[]{1, 2, 3}' can be passed directly as method arguments."
  },
  {
    "id": 9,
    "question": "What role does the length property play in Declaration & Initialization of Arrays?",
    "shortAnswer": "Declaration & Initialization of Arrays: Fundamental rule #4 - No Size in Declaration: 'int[5] arr;' is a compile-time syntax error in Java.",
    "explanation": "In ICSE Class 10 Java, Declaration & Initialization of Arrays requires strict adherence to memory rules. Array declaration specifies the element type and variable name (e.g. int[] arr). Declaration alone creates only a reference variable initialized to null on the stack; initialization allocates heap memory either dynamically with 'new' or statically with an array initializer list. Key requirement: No Size in Declaration: 'int[5] arr;' is a compile-time syntax error in Java. Always avoid common pitfall: Leaving reference as null and attempting element access.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "No Size in Declaration: 'int[5] arr;' is a compile-time syntax error in Java.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// ArrayDeclarationInit.java\nint[] arr = new int[5];\n// No Size in Declaration: 'int[5] arr;' is a compile-time syntax error in Java."
  },
  {
    "id": 10,
    "question": "How does the stack memory differ from heap memory in Declaration & Initialization of Arrays?",
    "shortAnswer": "Declaration & Initialization of Arrays: Fundamental rule #5 - Uninitialized Reference: Accessing elements of an uninitialized array reference causes compile or runtime errors.",
    "explanation": "In ICSE Class 10 Java, Declaration & Initialization of Arrays requires strict adherence to memory rules. Array declaration specifies the element type and variable name (e.g. int[] arr). Declaration alone creates only a reference variable initialized to null on the stack; initialization allocates heap memory either dynamically with 'new' or statically with an array initializer list. Key requirement: Uninitialized Reference: Accessing elements of an uninitialized array reference causes compile or runtime errors. Always avoid common pitfall: Specifying array dimension during reference declaration (e.g., int[10] a;).",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Uninitialized Reference: Accessing elements of an uninitialized array reference causes compile or runtime errors.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// ArrayDeclarationInit.java\nint[] arr = new int[5];\n// Uninitialized Reference: Accessing elements of an uninitialized array reference causes compile or runtime errors."
  },
  {
    "id": 11,
    "question": "Is the size of an array fixed or dynamic in Declaration & Initialization of Arrays?",
    "shortAnswer": "Declaration & Initialization of Arrays: Fundamental rule #1 - Preferred Syntax: 'int[] arr;' is strongly preferred over C-style 'int arr[];'.",
    "explanation": "In ICSE Class 10 Java, Declaration & Initialization of Arrays requires strict adherence to memory rules. Array declaration specifies the element type and variable name (e.g. int[] arr). Declaration alone creates only a reference variable initialized to null on the stack; initialization allocates heap memory either dynamically with 'new' or statically with an array initializer list. Key requirement: Preferred Syntax: 'int[] arr;' is strongly preferred over C-style 'int arr[];'. Always avoid common pitfall: Using static initializer syntax after declaration without 'new int[]' (e.g., arr = {1, 2}; is illegal).",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Preferred Syntax: 'int[] arr;' is strongly preferred over C-style 'int arr[];'.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// ArrayDeclarationInit.java\nint[] arr = new int[5];\n// Preferred Syntax: 'int[] arr;' is strongly preferred over C-style 'int arr[];'."
  },
  {
    "id": 12,
    "question": "What are the default values assigned by the JVM in Declaration & Initialization of Arrays?",
    "shortAnswer": "Declaration & Initialization of Arrays: Fundamental rule #2 - Static Initializer: 'int[] arr = {10, 20, 30};' declares, creates, and initializes in one step.",
    "explanation": "In ICSE Class 10 Java, Declaration & Initialization of Arrays requires strict adherence to memory rules. Array declaration specifies the element type and variable name (e.g. int[] arr). Declaration alone creates only a reference variable initialized to null on the stack; initialization allocates heap memory either dynamically with 'new' or statically with an array initializer list. Key requirement: Static Initializer: 'int[] arr = {10, 20, 30};' declares, creates, and initializes in one step. Always avoid common pitfall: Leaving reference as null and attempting element access.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Static Initializer: 'int[] arr = {10, 20, 30};' declares, creates, and initializes in one step.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// ArrayDeclarationInit.java\nint[] arr = new int[5];\n// Static Initializer: 'int[] arr = {10, 20, 30};' declares, creates, and initializes in one step."
  },
  {
    "id": 13,
    "question": "How does Scanner input work when dealing with Declaration & Initialization of Arrays?",
    "shortAnswer": "Declaration & Initialization of Arrays: Fundamental rule #3 - Anonymous Array: 'new int[]{1, 2, 3}' can be passed directly as method arguments.",
    "explanation": "In ICSE Class 10 Java, Declaration & Initialization of Arrays requires strict adherence to memory rules. Array declaration specifies the element type and variable name (e.g. int[] arr). Declaration alone creates only a reference variable initialized to null on the stack; initialization allocates heap memory either dynamically with 'new' or statically with an array initializer list. Key requirement: Anonymous Array: 'new int[]{1, 2, 3}' can be passed directly as method arguments. Always avoid common pitfall: Specifying array dimension during reference declaration (e.g., int[10] a;).",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Anonymous Array: 'new int[]{1, 2, 3}' can be passed directly as method arguments.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// ArrayDeclarationInit.java\nint[] arr = new int[5];\n// Anonymous Array: 'new int[]{1, 2, 3}' can be passed directly as method arguments."
  },
  {
    "id": 14,
    "question": "What is the difference between declaring and instantiating in Declaration & Initialization of Arrays?",
    "shortAnswer": "Declaration & Initialization of Arrays: Fundamental rule #4 - No Size in Declaration: 'int[5] arr;' is a compile-time syntax error in Java.",
    "explanation": "In ICSE Class 10 Java, Declaration & Initialization of Arrays requires strict adherence to memory rules. Array declaration specifies the element type and variable name (e.g. int[] arr). Declaration alone creates only a reference variable initialized to null on the stack; initialization allocates heap memory either dynamically with 'new' or statically with an array initializer list. Key requirement: No Size in Declaration: 'int[5] arr;' is a compile-time syntax error in Java. Always avoid common pitfall: Using static initializer syntax after declaration without 'new int[]' (e.g., arr = {1, 2}; is illegal).",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "No Size in Declaration: 'int[5] arr;' is a compile-time syntax error in Java.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// ArrayDeclarationInit.java\nint[] arr = new int[5];\n// No Size in Declaration: 'int[5] arr;' is a compile-time syntax error in Java."
  },
  {
    "id": 15,
    "question": "Can an array hold elements of different data types in Declaration & Initialization of Arrays?",
    "shortAnswer": "Declaration & Initialization of Arrays: Fundamental rule #5 - Uninitialized Reference: Accessing elements of an uninitialized array reference causes compile or runtime errors.",
    "explanation": "In ICSE Class 10 Java, Declaration & Initialization of Arrays requires strict adherence to memory rules. Array declaration specifies the element type and variable name (e.g. int[] arr). Declaration alone creates only a reference variable initialized to null on the stack; initialization allocates heap memory either dynamically with 'new' or statically with an array initializer list. Key requirement: Uninitialized Reference: Accessing elements of an uninitialized array reference causes compile or runtime errors. Always avoid common pitfall: Leaving reference as null and attempting element access.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Uninitialized Reference: Accessing elements of an uninitialized array reference causes compile or runtime errors.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// ArrayDeclarationInit.java\nint[] arr = new int[5];\n// Uninitialized Reference: Accessing elements of an uninitialized array reference causes compile or runtime errors."
  },
  {
    "id": 16,
    "question": "How do we traverse in reverse order when applying Declaration & Initialization of Arrays?",
    "shortAnswer": "Declaration & Initialization of Arrays: Fundamental rule #1 - Preferred Syntax: 'int[] arr;' is strongly preferred over C-style 'int arr[];'.",
    "explanation": "In ICSE Class 10 Java, Declaration & Initialization of Arrays requires strict adherence to memory rules. Array declaration specifies the element type and variable name (e.g. int[] arr). Declaration alone creates only a reference variable initialized to null on the stack; initialization allocates heap memory either dynamically with 'new' or statically with an array initializer list. Key requirement: Preferred Syntax: 'int[] arr;' is strongly preferred over C-style 'int arr[];'. Always avoid common pitfall: Specifying array dimension during reference declaration (e.g., int[10] a;).",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Preferred Syntax: 'int[] arr;' is strongly preferred over C-style 'int arr[];'.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// ArrayDeclarationInit.java\nint[] arr = new int[5];\n// Preferred Syntax: 'int[] arr;' is strongly preferred over C-style 'int arr[];'."
  },
  {
    "id": 17,
    "question": "What happens if you print an array reference directly in Declaration & Initialization of Arrays?",
    "shortAnswer": "Declaration & Initialization of Arrays: Fundamental rule #2 - Static Initializer: 'int[] arr = {10, 20, 30};' declares, creates, and initializes in one step.",
    "explanation": "In ICSE Class 10 Java, Declaration & Initialization of Arrays requires strict adherence to memory rules. Array declaration specifies the element type and variable name (e.g. int[] arr). Declaration alone creates only a reference variable initialized to null on the stack; initialization allocates heap memory either dynamically with 'new' or statically with an array initializer list. Key requirement: Static Initializer: 'int[] arr = {10, 20, 30};' declares, creates, and initializes in one step. Always avoid common pitfall: Using static initializer syntax after declaration without 'new int[]' (e.g., arr = {1, 2}; is illegal).",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Static Initializer: 'int[] arr = {10, 20, 30};' declares, creates, and initializes in one step.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// ArrayDeclarationInit.java\nint[] arr = new int[5];\n// Static Initializer: 'int[] arr = {10, 20, 30};' declares, creates, and initializes in one step."
  },
  {
    "id": 18,
    "question": "How does BlueJ visualize the operations in Declaration & Initialization of Arrays?",
    "shortAnswer": "Declaration & Initialization of Arrays: Fundamental rule #3 - Anonymous Array: 'new int[]{1, 2, 3}' can be passed directly as method arguments.",
    "explanation": "In ICSE Class 10 Java, Declaration & Initialization of Arrays requires strict adherence to memory rules. Array declaration specifies the element type and variable name (e.g. int[] arr). Declaration alone creates only a reference variable initialized to null on the stack; initialization allocates heap memory either dynamically with 'new' or statically with an array initializer list. Key requirement: Anonymous Array: 'new int[]{1, 2, 3}' can be passed directly as method arguments. Always avoid common pitfall: Leaving reference as null and attempting element access.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "intermediate",
    "options": [
      "Anonymous Array: 'new int[]{1, 2, 3}' can be passed directly as method arguments.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// ArrayDeclarationInit.java\nint[] arr = new int[5];\n// Anonymous Array: 'new int[]{1, 2, 3}' can be passed directly as method arguments."
  },
  {
    "id": 19,
    "question": "How do you write a Variable Description Table (VDT) entry for Declaration & Initialization of Arrays?",
    "shortAnswer": "Declaration & Initialization of Arrays: Fundamental rule #4 - No Size in Declaration: 'int[5] arr;' is a compile-time syntax error in Java.",
    "explanation": "In ICSE Class 10 Java, Declaration & Initialization of Arrays requires strict adherence to memory rules. Array declaration specifies the element type and variable name (e.g. int[] arr). Declaration alone creates only a reference variable initialized to null on the stack; initialization allocates heap memory either dynamically with 'new' or statically with an array initializer list. Key requirement: No Size in Declaration: 'int[5] arr;' is a compile-time syntax error in Java. Always avoid common pitfall: Specifying array dimension during reference declaration (e.g., int[10] a;).",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "No Size in Declaration: 'int[5] arr;' is a compile-time syntax error in Java.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// ArrayDeclarationInit.java\nint[] arr = new int[5];\n// No Size in Declaration: 'int[5] arr;' is a compile-time syntax error in Java."
  },
  {
    "id": 20,
    "question": "What happens if the array reference is null in Declaration & Initialization of Arrays?",
    "shortAnswer": "Declaration & Initialization of Arrays: Fundamental rule #5 - Uninitialized Reference: Accessing elements of an uninitialized array reference causes compile or runtime errors.",
    "explanation": "In ICSE Class 10 Java, Declaration & Initialization of Arrays requires strict adherence to memory rules. Array declaration specifies the element type and variable name (e.g. int[] arr). Declaration alone creates only a reference variable initialized to null on the stack; initialization allocates heap memory either dynamically with 'new' or statically with an array initializer list. Key requirement: Uninitialized Reference: Accessing elements of an uninitialized array reference causes compile or runtime errors. Always avoid common pitfall: Using static initializer syntax after declaration without 'new int[]' (e.g., arr = {1, 2}; is illegal).",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Uninitialized Reference: Accessing elements of an uninitialized array reference causes compile or runtime errors.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// ArrayDeclarationInit.java\nint[] arr = new int[5];\n// Uninitialized Reference: Accessing elements of an uninitialized array reference causes compile or runtime errors."
  },
  {
    "id": 21,
    "question": "How can you pass an array to a method in Declaration & Initialization of Arrays?",
    "shortAnswer": "Declaration & Initialization of Arrays: Fundamental rule #1 - Preferred Syntax: 'int[] arr;' is strongly preferred over C-style 'int arr[];'.",
    "explanation": "In ICSE Class 10 Java, Declaration & Initialization of Arrays requires strict adherence to memory rules. Array declaration specifies the element type and variable name (e.g. int[] arr). Declaration alone creates only a reference variable initialized to null on the stack; initialization allocates heap memory either dynamically with 'new' or statically with an array initializer list. Key requirement: Preferred Syntax: 'int[] arr;' is strongly preferred over C-style 'int arr[];'. Always avoid common pitfall: Leaving reference as null and attempting element access.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Preferred Syntax: 'int[] arr;' is strongly preferred over C-style 'int arr[];'.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// ArrayDeclarationInit.java\nint[] arr = new int[5];\n// Preferred Syntax: 'int[] arr;' is strongly preferred over C-style 'int arr[];'."
  },
  {
    "id": 22,
    "question": "Can an array have a length of 0 in Declaration & Initialization of Arrays?",
    "shortAnswer": "Declaration & Initialization of Arrays: Fundamental rule #2 - Static Initializer: 'int[] arr = {10, 20, 30};' declares, creates, and initializes in one step.",
    "explanation": "In ICSE Class 10 Java, Declaration & Initialization of Arrays requires strict adherence to memory rules. Array declaration specifies the element type and variable name (e.g. int[] arr). Declaration alone creates only a reference variable initialized to null on the stack; initialization allocates heap memory either dynamically with 'new' or statically with an array initializer list. Key requirement: Static Initializer: 'int[] arr = {10, 20, 30};' declares, creates, and initializes in one step. Always avoid common pitfall: Specifying array dimension during reference declaration (e.g., int[10] a;).",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Static Initializer: 'int[] arr = {10, 20, 30};' declares, creates, and initializes in one step.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// ArrayDeclarationInit.java\nint[] arr = new int[5];\n// Static Initializer: 'int[] arr = {10, 20, 30};' declares, creates, and initializes in one step."
  },
  {
    "id": 23,
    "question": "Why is array access O(1) constant time in Declaration & Initialization of Arrays?",
    "shortAnswer": "Declaration & Initialization of Arrays: Fundamental rule #3 - Anonymous Array: 'new int[]{1, 2, 3}' can be passed directly as method arguments.",
    "explanation": "In ICSE Class 10 Java, Declaration & Initialization of Arrays requires strict adherence to memory rules. Array declaration specifies the element type and variable name (e.g. int[] arr). Declaration alone creates only a reference variable initialized to null on the stack; initialization allocates heap memory either dynamically with 'new' or statically with an array initializer list. Key requirement: Anonymous Array: 'new int[]{1, 2, 3}' can be passed directly as method arguments. Always avoid common pitfall: Using static initializer syntax after declaration without 'new int[]' (e.g., arr = {1, 2}; is illegal).",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Anonymous Array: 'new int[]{1, 2, 3}' can be passed directly as method arguments.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// ArrayDeclarationInit.java\nint[] arr = new int[5];\n// Anonymous Array: 'new int[]{1, 2, 3}' can be passed directly as method arguments."
  },
  {
    "id": 24,
    "question": "How do you prevent off-by-one errors in Declaration & Initialization of Arrays?",
    "shortAnswer": "Declaration & Initialization of Arrays: Fundamental rule #4 - No Size in Declaration: 'int[5] arr;' is a compile-time syntax error in Java.",
    "explanation": "In ICSE Class 10 Java, Declaration & Initialization of Arrays requires strict adherence to memory rules. Array declaration specifies the element type and variable name (e.g. int[] arr). Declaration alone creates only a reference variable initialized to null on the stack; initialization allocates heap memory either dynamically with 'new' or statically with an array initializer list. Key requirement: No Size in Declaration: 'int[5] arr;' is a compile-time syntax error in Java. Always avoid common pitfall: Leaving reference as null and attempting element access.",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "No Size in Declaration: 'int[5] arr;' is a compile-time syntax error in Java.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// ArrayDeclarationInit.java\nint[] arr = new int[5];\n// No Size in Declaration: 'int[5] arr;' is a compile-time syntax error in Java."
  },
  {
    "id": 25,
    "question": "What master advice does Sukanta Hui give for scoring full marks on Declaration & Initialization of Arrays?",
    "shortAnswer": "Declaration & Initialization of Arrays: Fundamental rule #5 - Uninitialized Reference: Accessing elements of an uninitialized array reference causes compile or runtime errors.",
    "explanation": "In ICSE Class 10 Java, Declaration & Initialization of Arrays requires strict adherence to memory rules. Array declaration specifies the element type and variable name (e.g. int[] arr). Declaration alone creates only a reference variable initialized to null on the stack; initialization allocates heap memory either dynamically with 'new' or statically with an array initializer list. Key requirement: Uninitialized Reference: Accessing elements of an uninitialized array reference causes compile or runtime errors. Always avoid common pitfall: Specifying array dimension during reference declaration (e.g., int[10] a;).",
    "hint": "Think about memory boundaries, index limits, and ICSE marking standards.",
    "level": "advanced",
    "options": [
      "Uninitialized Reference: Accessing elements of an uninitialized array reference causes compile or runtime errors.",
      "Array memory is allocated on stack instead of heap",
      "Array size can be modified dynamically at runtime without new allocation",
      "Indices in Java arrays start from 1 instead of 0"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 1:\n// ArrayDeclarationInit.java\nint[] arr = new int[5];\n// Uninitialized Reference: Accessing elements of an uninitialized array reference causes compile or runtime errors."
  }
];

export default questions;
