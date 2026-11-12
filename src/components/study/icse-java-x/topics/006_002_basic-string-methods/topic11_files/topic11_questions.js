const questions = [
  {
    "id": 1,
    "question": "What is the primary function of compareToIgnoreCase(String str) Method in the ICSE syllabus?",
    "shortAnswer": "compareToIgnoreCase(String str) Method: Fundamental ICSE rule #1 - Case Insensitive: Eliminates case differences: 'apple'.compareToIgnoreCase('APPLE') returns 0.",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareToIgnoreCase(String str) Method is an essential method. The compareToIgnoreCase(String str) method compares two strings lexicographically while ignoring case distinctions. It eliminates the 32-value ASCII gap between uppercase and lowercase characters, ensuring true dictionary ordering. Key syllabus specification: Case Insensitive: Eliminates case differences: 'apple'.compareToIgnoreCase('APPLE') returns 0. Always avoid common pitfall: Assuming compareToIgnoreCase() modifies the string case in memory.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Case Insensitive: Eliminates case differences: 'apple'.compareToIgnoreCase('APPLE') returns 0.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// CompareToIgnoreCaseMethodDemo.java\n// Case Insensitive: Eliminates case differences: 'apple'.compareToIgnoreCase('APPLE') returns 0."
  },
  {
    "id": 2,
    "question": "What is the exact return type and signature of compareToIgnoreCase(String str) Method?",
    "shortAnswer": "compareToIgnoreCase(String str) Method: Fundamental ICSE rule #2 - Return Values: Returns 0 if case-insensitively equal, negative if this precedes str, positive if this succeeds str.",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareToIgnoreCase(String str) Method is an essential method. The compareToIgnoreCase(String str) method compares two strings lexicographically while ignoring case distinctions. It eliminates the 32-value ASCII gap between uppercase and lowercase characters, ensuring true dictionary ordering. Key syllabus specification: Return Values: Returns 0 if case-insensitively equal, negative if this precedes str, positive if this succeeds str. Always avoid common pitfall: Passing null resulting in NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Return Values: Returns 0 if case-insensitively equal, negative if this precedes str, positive if this succeeds str.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// CompareToIgnoreCaseMethodDemo.java\n// Return Values: Returns 0 if case-insensitively equal, negative if this precedes str, positive if this succeeds str."
  },
  {
    "id": 3,
    "question": "How does compareToIgnoreCase(String str) Method handle null arguments or null references?",
    "shortAnswer": "compareToIgnoreCase(String str) Method: Fundamental ICSE rule #3 - Prefix Length Rule: If characters match regardless of case, returns difference in lengths.",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareToIgnoreCase(String str) Method is an essential method. The compareToIgnoreCase(String str) method compares two strings lexicographically while ignoring case distinctions. It eliminates the 32-value ASCII gap between uppercase and lowercase characters, ensuring true dictionary ordering. Key syllabus specification: Prefix Length Rule: If characters match regardless of case, returns difference in lengths. Always avoid common pitfall: Confusing return type int with equalsIgnoreCase() boolean return type.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Prefix Length Rule: If characters match regardless of case, returns difference in lengths.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// CompareToIgnoreCaseMethodDemo.java\n// Prefix Length Rule: If characters match regardless of case, returns difference in lengths."
  },
  {
    "id": 4,
    "question": "Which common ICSE board examination error occurs with compareToIgnoreCase(String str) Method?",
    "shortAnswer": "compareToIgnoreCase(String str) Method: Fundamental ICSE rule #4 - Non-Mutating: Does not alter original string objects.",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareToIgnoreCase(String str) Method is an essential method. The compareToIgnoreCase(String str) method compares two strings lexicographically while ignoring case distinctions. It eliminates the 32-value ASCII gap between uppercase and lowercase characters, ensuring true dictionary ordering. Key syllabus specification: Non-Mutating: Does not alter original string objects. Always avoid common pitfall: Assuming compareToIgnoreCase() modifies the string case in memory.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Non-Mutating: Does not alter original string objects.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// CompareToIgnoreCaseMethodDemo.java\n// Non-Mutating: Does not alter original string objects."
  },
  {
    "id": 5,
    "question": "How does compareToIgnoreCase(String str) Method interact with Java's String immutability rule?",
    "shortAnswer": "compareToIgnoreCase(String str) Method: Fundamental ICSE rule #5 - ICSE Sorting Benchmark: Used in Section B when sorting names alphabetically without case formatting bias.",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareToIgnoreCase(String str) Method is an essential method. The compareToIgnoreCase(String str) method compares two strings lexicographically while ignoring case distinctions. It eliminates the 32-value ASCII gap between uppercase and lowercase characters, ensuring true dictionary ordering. Key syllabus specification: ICSE Sorting Benchmark: Used in Section B when sorting names alphabetically without case formatting bias. Always avoid common pitfall: Passing null resulting in NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "ICSE Sorting Benchmark: Used in Section B when sorting names alphabetically without case formatting bias.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// CompareToIgnoreCaseMethodDemo.java\n// ICSE Sorting Benchmark: Used in Section B when sorting names alphabetically without case formatting bias."
  },
  {
    "id": 6,
    "question": "Is compareToIgnoreCase(String str) Method case-sensitive or case-insensitive?",
    "shortAnswer": "compareToIgnoreCase(String str) Method: Fundamental ICSE rule #1 - Case Insensitive: Eliminates case differences: 'apple'.compareToIgnoreCase('APPLE') returns 0.",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareToIgnoreCase(String str) Method is an essential method. The compareToIgnoreCase(String str) method compares two strings lexicographically while ignoring case distinctions. It eliminates the 32-value ASCII gap between uppercase and lowercase characters, ensuring true dictionary ordering. Key syllabus specification: Case Insensitive: Eliminates case differences: 'apple'.compareToIgnoreCase('APPLE') returns 0. Always avoid common pitfall: Confusing return type int with equalsIgnoreCase() boolean return type.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Case Insensitive: Eliminates case differences: 'apple'.compareToIgnoreCase('APPLE') returns 0.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// CompareToIgnoreCaseMethodDemo.java\n// Case Insensitive: Eliminates case differences: 'apple'.compareToIgnoreCase('APPLE') returns 0."
  },
  {
    "id": 7,
    "question": "What happens if index or boundary conditions are violated in compareToIgnoreCase(String str) Method?",
    "shortAnswer": "compareToIgnoreCase(String str) Method: Fundamental ICSE rule #2 - Return Values: Returns 0 if case-insensitively equal, negative if this precedes str, positive if this succeeds str.",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareToIgnoreCase(String str) Method is an essential method. The compareToIgnoreCase(String str) method compares two strings lexicographically while ignoring case distinctions. It eliminates the 32-value ASCII gap between uppercase and lowercase characters, ensuring true dictionary ordering. Key syllabus specification: Return Values: Returns 0 if case-insensitively equal, negative if this precedes str, positive if this succeeds str. Always avoid common pitfall: Assuming compareToIgnoreCase() modifies the string case in memory.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Return Values: Returns 0 if case-insensitively equal, negative if this precedes str, positive if this succeeds str.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// CompareToIgnoreCaseMethodDemo.java\n// Return Values: Returns 0 if case-insensitively equal, negative if this precedes str, positive if this succeeds str."
  },
  {
    "id": 8,
    "question": "How does compareToIgnoreCase(String str) Method differ from its counterpart or alternative operators?",
    "shortAnswer": "compareToIgnoreCase(String str) Method: Fundamental ICSE rule #3 - Prefix Length Rule: If characters match regardless of case, returns difference in lengths.",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareToIgnoreCase(String str) Method is an essential method. The compareToIgnoreCase(String str) method compares two strings lexicographically while ignoring case distinctions. It eliminates the 32-value ASCII gap between uppercase and lowercase characters, ensuring true dictionary ordering. Key syllabus specification: Prefix Length Rule: If characters match regardless of case, returns difference in lengths. Always avoid common pitfall: Passing null resulting in NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Prefix Length Rule: If characters match regardless of case, returns difference in lengths.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// CompareToIgnoreCaseMethodDemo.java\n// Prefix Length Rule: If characters match regardless of case, returns difference in lengths."
  },
  {
    "id": 9,
    "question": "What runtime exception can be thrown by compareToIgnoreCase(String str) Method?",
    "shortAnswer": "compareToIgnoreCase(String str) Method: Fundamental ICSE rule #4 - Non-Mutating: Does not alter original string objects.",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareToIgnoreCase(String str) Method is an essential method. The compareToIgnoreCase(String str) method compares two strings lexicographically while ignoring case distinctions. It eliminates the 32-value ASCII gap between uppercase and lowercase characters, ensuring true dictionary ordering. Key syllabus specification: Non-Mutating: Does not alter original string objects. Always avoid common pitfall: Confusing return type int with equalsIgnoreCase() boolean return type.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Non-Mutating: Does not alter original string objects.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// CompareToIgnoreCaseMethodDemo.java\n// Non-Mutating: Does not alter original string objects."
  },
  {
    "id": 10,
    "question": "Can compareToIgnoreCase(String str) Method be called repeatedly in method chaining?",
    "shortAnswer": "compareToIgnoreCase(String str) Method: Fundamental ICSE rule #5 - ICSE Sorting Benchmark: Used in Section B when sorting names alphabetically without case formatting bias.",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareToIgnoreCase(String str) Method is an essential method. The compareToIgnoreCase(String str) method compares two strings lexicographically while ignoring case distinctions. It eliminates the 32-value ASCII gap between uppercase and lowercase characters, ensuring true dictionary ordering. Key syllabus specification: ICSE Sorting Benchmark: Used in Section B when sorting names alphabetically without case formatting bias. Always avoid common pitfall: Assuming compareToIgnoreCase() modifies the string case in memory.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "ICSE Sorting Benchmark: Used in Section B when sorting names alphabetically without case formatting bias.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// CompareToIgnoreCaseMethodDemo.java\n// ICSE Sorting Benchmark: Used in Section B when sorting names alphabetically without case formatting bias."
  },
  {
    "id": 11,
    "question": "How does BlueJ visualize the return value of compareToIgnoreCase(String str) Method?",
    "shortAnswer": "compareToIgnoreCase(String str) Method: Fundamental ICSE rule #1 - Case Insensitive: Eliminates case differences: 'apple'.compareToIgnoreCase('APPLE') returns 0.",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareToIgnoreCase(String str) Method is an essential method. The compareToIgnoreCase(String str) method compares two strings lexicographically while ignoring case distinctions. It eliminates the 32-value ASCII gap between uppercase and lowercase characters, ensuring true dictionary ordering. Key syllabus specification: Case Insensitive: Eliminates case differences: 'apple'.compareToIgnoreCase('APPLE') returns 0. Always avoid common pitfall: Passing null resulting in NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Case Insensitive: Eliminates case differences: 'apple'.compareToIgnoreCase('APPLE') returns 0.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// CompareToIgnoreCaseMethodDemo.java\n// Case Insensitive: Eliminates case differences: 'apple'.compareToIgnoreCase('APPLE') returns 0."
  },
  {
    "id": 12,
    "question": "What is the time complexity of executing compareToIgnoreCase(String str) Method?",
    "shortAnswer": "compareToIgnoreCase(String str) Method: Fundamental ICSE rule #2 - Return Values: Returns 0 if case-insensitively equal, negative if this precedes str, positive if this succeeds str.",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareToIgnoreCase(String str) Method is an essential method. The compareToIgnoreCase(String str) method compares two strings lexicographically while ignoring case distinctions. It eliminates the 32-value ASCII gap between uppercase and lowercase characters, ensuring true dictionary ordering. Key syllabus specification: Return Values: Returns 0 if case-insensitively equal, negative if this precedes str, positive if this succeeds str. Always avoid common pitfall: Confusing return type int with equalsIgnoreCase() boolean return type.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Return Values: Returns 0 if case-insensitively equal, negative if this precedes str, positive if this succeeds str.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// CompareToIgnoreCaseMethodDemo.java\n// Return Values: Returns 0 if case-insensitively equal, negative if this precedes str, positive if this succeeds str."
  },
  {
    "id": 13,
    "question": "How does compareToIgnoreCase(String str) Method behave when passed an empty string?",
    "shortAnswer": "compareToIgnoreCase(String str) Method: Fundamental ICSE rule #3 - Prefix Length Rule: If characters match regardless of case, returns difference in lengths.",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareToIgnoreCase(String str) Method is an essential method. The compareToIgnoreCase(String str) method compares two strings lexicographically while ignoring case distinctions. It eliminates the 32-value ASCII gap between uppercase and lowercase characters, ensuring true dictionary ordering. Key syllabus specification: Prefix Length Rule: If characters match regardless of case, returns difference in lengths. Always avoid common pitfall: Assuming compareToIgnoreCase() modifies the string case in memory.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Prefix Length Rule: If characters match regardless of case, returns difference in lengths.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// CompareToIgnoreCaseMethodDemo.java\n// Prefix Length Rule: If characters match regardless of case, returns difference in lengths."
  },
  {
    "id": 14,
    "question": "How is compareToIgnoreCase(String str) Method used in classic ICSE Section B programs (Pig Latin, Palindrome, Search)?",
    "shortAnswer": "compareToIgnoreCase(String str) Method: Fundamental ICSE rule #4 - Non-Mutating: Does not alter original string objects.",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareToIgnoreCase(String str) Method is an essential method. The compareToIgnoreCase(String str) method compares two strings lexicographically while ignoring case distinctions. It eliminates the 32-value ASCII gap between uppercase and lowercase characters, ensuring true dictionary ordering. Key syllabus specification: Non-Mutating: Does not alter original string objects. Always avoid common pitfall: Passing null resulting in NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Non-Mutating: Does not alter original string objects.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// CompareToIgnoreCaseMethodDemo.java\n// Non-Mutating: Does not alter original string objects."
  },
  {
    "id": 15,
    "question": "Does compareToIgnoreCase(String str) Method create a new String in Heap memory or String Constant Pool?",
    "shortAnswer": "compareToIgnoreCase(String str) Method: Fundamental ICSE rule #5 - ICSE Sorting Benchmark: Used in Section B when sorting names alphabetically without case formatting bias.",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareToIgnoreCase(String str) Method is an essential method. The compareToIgnoreCase(String str) method compares two strings lexicographically while ignoring case distinctions. It eliminates the 32-value ASCII gap between uppercase and lowercase characters, ensuring true dictionary ordering. Key syllabus specification: ICSE Sorting Benchmark: Used in Section B when sorting names alphabetically without case formatting bias. Always avoid common pitfall: Confusing return type int with equalsIgnoreCase() boolean return type.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "ICSE Sorting Benchmark: Used in Section B when sorting names alphabetically without case formatting bias.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// CompareToIgnoreCaseMethodDemo.java\n// ICSE Sorting Benchmark: Used in Section B when sorting names alphabetically without case formatting bias."
  },
  {
    "id": 16,
    "question": "How does compareToIgnoreCase(String str) Method treat whitespace, digits, and special symbols?",
    "shortAnswer": "compareToIgnoreCase(String str) Method: Fundamental ICSE rule #1 - Case Insensitive: Eliminates case differences: 'apple'.compareToIgnoreCase('APPLE') returns 0.",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareToIgnoreCase(String str) Method is an essential method. The compareToIgnoreCase(String str) method compares two strings lexicographically while ignoring case distinctions. It eliminates the 32-value ASCII gap between uppercase and lowercase characters, ensuring true dictionary ordering. Key syllabus specification: Case Insensitive: Eliminates case differences: 'apple'.compareToIgnoreCase('APPLE') returns 0. Always avoid common pitfall: Assuming compareToIgnoreCase() modifies the string case in memory.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Case Insensitive: Eliminates case differences: 'apple'.compareToIgnoreCase('APPLE') returns 0.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// CompareToIgnoreCaseMethodDemo.java\n// Case Insensitive: Eliminates case differences: 'apple'.compareToIgnoreCase('APPLE') returns 0."
  },
  {
    "id": 17,
    "question": "What is the difference between static and instance invocation regarding compareToIgnoreCase(String str) Method?",
    "shortAnswer": "compareToIgnoreCase(String str) Method: Fundamental ICSE rule #2 - Return Values: Returns 0 if case-insensitively equal, negative if this precedes str, positive if this succeeds str.",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareToIgnoreCase(String str) Method is an essential method. The compareToIgnoreCase(String str) method compares two strings lexicographically while ignoring case distinctions. It eliminates the 32-value ASCII gap between uppercase and lowercase characters, ensuring true dictionary ordering. Key syllabus specification: Return Values: Returns 0 if case-insensitively equal, negative if this precedes str, positive if this succeeds str. Always avoid common pitfall: Passing null resulting in NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Return Values: Returns 0 if case-insensitively equal, negative if this precedes str, positive if this succeeds str.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// CompareToIgnoreCaseMethodDemo.java\n// Return Values: Returns 0 if case-insensitively equal, negative if this precedes str, positive if this succeeds str."
  },
  {
    "id": 18,
    "question": "How do you write a Variable Description Table (VDT) entry for compareToIgnoreCase(String str) Method?",
    "shortAnswer": "compareToIgnoreCase(String str) Method: Fundamental ICSE rule #3 - Prefix Length Rule: If characters match regardless of case, returns difference in lengths.",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareToIgnoreCase(String str) Method is an essential method. The compareToIgnoreCase(String str) method compares two strings lexicographically while ignoring case distinctions. It eliminates the 32-value ASCII gap between uppercase and lowercase characters, ensuring true dictionary ordering. Key syllabus specification: Prefix Length Rule: If characters match regardless of case, returns difference in lengths. Always avoid common pitfall: Confusing return type int with equalsIgnoreCase() boolean return type.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Prefix Length Rule: If characters match regardless of case, returns difference in lengths.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// CompareToIgnoreCaseMethodDemo.java\n// Prefix Length Rule: If characters match regardless of case, returns difference in lengths."
  },
  {
    "id": 19,
    "question": "How is compareToIgnoreCase(String str) Method tested in Section A output prediction questions?",
    "shortAnswer": "compareToIgnoreCase(String str) Method: Fundamental ICSE rule #4 - Non-Mutating: Does not alter original string objects.",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareToIgnoreCase(String str) Method is an essential method. The compareToIgnoreCase(String str) method compares two strings lexicographically while ignoring case distinctions. It eliminates the 32-value ASCII gap between uppercase and lowercase characters, ensuring true dictionary ordering. Key syllabus specification: Non-Mutating: Does not alter original string objects. Always avoid common pitfall: Assuming compareToIgnoreCase() modifies the string case in memory.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Non-Mutating: Does not alter original string objects.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// CompareToIgnoreCaseMethodDemo.java\n// Non-Mutating: Does not alter original string objects."
  },
  {
    "id": 20,
    "question": "Can compareToIgnoreCase(String str) Method be executed on a StringBuffer or StringBuilder?",
    "shortAnswer": "compareToIgnoreCase(String str) Method: Fundamental ICSE rule #5 - ICSE Sorting Benchmark: Used in Section B when sorting names alphabetically without case formatting bias.",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareToIgnoreCase(String str) Method is an essential method. The compareToIgnoreCase(String str) method compares two strings lexicographically while ignoring case distinctions. It eliminates the 32-value ASCII gap between uppercase and lowercase characters, ensuring true dictionary ordering. Key syllabus specification: ICSE Sorting Benchmark: Used in Section B when sorting names alphabetically without case formatting bias. Always avoid common pitfall: Passing null resulting in NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "ICSE Sorting Benchmark: Used in Section B when sorting names alphabetically without case formatting bias.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// CompareToIgnoreCaseMethodDemo.java\n// ICSE Sorting Benchmark: Used in Section B when sorting names alphabetically without case formatting bias."
  },
  {
    "id": 21,
    "question": "What happens if compareToIgnoreCase(String str) Method is called on a string of length 1?",
    "shortAnswer": "compareToIgnoreCase(String str) Method: Fundamental ICSE rule #1 - Case Insensitive: Eliminates case differences: 'apple'.compareToIgnoreCase('APPLE') returns 0.",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareToIgnoreCase(String str) Method is an essential method. The compareToIgnoreCase(String str) method compares two strings lexicographically while ignoring case distinctions. It eliminates the 32-value ASCII gap between uppercase and lowercase characters, ensuring true dictionary ordering. Key syllabus specification: Case Insensitive: Eliminates case differences: 'apple'.compareToIgnoreCase('APPLE') returns 0. Always avoid common pitfall: Confusing return type int with equalsIgnoreCase() boolean return type.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Case Insensitive: Eliminates case differences: 'apple'.compareToIgnoreCase('APPLE') returns 0.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// CompareToIgnoreCaseMethodDemo.java\n// Case Insensitive: Eliminates case differences: 'apple'.compareToIgnoreCase('APPLE') returns 0."
  },
  {
    "id": 22,
    "question": "Why does compareToIgnoreCase(String str) Method return primitive values versus object references?",
    "shortAnswer": "compareToIgnoreCase(String str) Method: Fundamental ICSE rule #2 - Return Values: Returns 0 if case-insensitively equal, negative if this precedes str, positive if this succeeds str.",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareToIgnoreCase(String str) Method is an essential method. The compareToIgnoreCase(String str) method compares two strings lexicographically while ignoring case distinctions. It eliminates the 32-value ASCII gap between uppercase and lowercase characters, ensuring true dictionary ordering. Key syllabus specification: Return Values: Returns 0 if case-insensitively equal, negative if this precedes str, positive if this succeeds str. Always avoid common pitfall: Assuming compareToIgnoreCase() modifies the string case in memory.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Return Values: Returns 0 if case-insensitively equal, negative if this precedes str, positive if this succeeds str.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// CompareToIgnoreCaseMethodDemo.java\n// Return Values: Returns 0 if case-insensitively equal, negative if this precedes str, positive if this succeeds str."
  },
  {
    "id": 23,
    "question": "How do you combine compareToIgnoreCase(String str) Method with a for loop for string traversal?",
    "shortAnswer": "compareToIgnoreCase(String str) Method: Fundamental ICSE rule #3 - Prefix Length Rule: If characters match regardless of case, returns difference in lengths.",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareToIgnoreCase(String str) Method is an essential method. The compareToIgnoreCase(String str) method compares two strings lexicographically while ignoring case distinctions. It eliminates the 32-value ASCII gap between uppercase and lowercase characters, ensuring true dictionary ordering. Key syllabus specification: Prefix Length Rule: If characters match regardless of case, returns difference in lengths. Always avoid common pitfall: Passing null resulting in NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Prefix Length Rule: If characters match regardless of case, returns difference in lengths.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// CompareToIgnoreCaseMethodDemo.java\n// Prefix Length Rule: If characters match regardless of case, returns difference in lengths."
  },
  {
    "id": 24,
    "question": "What happens if you ignore the return value of compareToIgnoreCase(String str) Method?",
    "shortAnswer": "compareToIgnoreCase(String str) Method: Fundamental ICSE rule #4 - Non-Mutating: Does not alter original string objects.",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareToIgnoreCase(String str) Method is an essential method. The compareToIgnoreCase(String str) method compares two strings lexicographically while ignoring case distinctions. It eliminates the 32-value ASCII gap between uppercase and lowercase characters, ensuring true dictionary ordering. Key syllabus specification: Non-Mutating: Does not alter original string objects. Always avoid common pitfall: Confusing return type int with equalsIgnoreCase() boolean return type.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Non-Mutating: Does not alter original string objects.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// CompareToIgnoreCaseMethodDemo.java\n// Non-Mutating: Does not alter original string objects."
  },
  {
    "id": 25,
    "question": "What master examination advice does Sukanta Hui give for scoring full marks on compareToIgnoreCase(String str) Method?",
    "shortAnswer": "compareToIgnoreCase(String str) Method: Fundamental ICSE rule #5 - ICSE Sorting Benchmark: Used in Section B when sorting names alphabetically without case formatting bias.",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareToIgnoreCase(String str) Method is an essential method. The compareToIgnoreCase(String str) method compares two strings lexicographically while ignoring case distinctions. It eliminates the 32-value ASCII gap between uppercase and lowercase characters, ensuring true dictionary ordering. Key syllabus specification: ICSE Sorting Benchmark: Used in Section B when sorting names alphabetically without case formatting bias. Always avoid common pitfall: Assuming compareToIgnoreCase() modifies the string case in memory.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "ICSE Sorting Benchmark: Used in Section B when sorting names alphabetically without case formatting bias.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 11:\n// CompareToIgnoreCaseMethodDemo.java\n// ICSE Sorting Benchmark: Used in Section B when sorting names alphabetically without case formatting bias."
  }
];

export default questions;
