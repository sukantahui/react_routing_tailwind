const questions = [
  {
    "id": 1,
    "question": "What is the primary function of startsWith(String prefix) Method in the ICSE syllabus?",
    "shortAnswer": "startsWith(String prefix) Method: Fundamental ICSE rule #1 - Prefix Match: Returns true if the string begins with the specified prefix.",
    "explanation": "In the ICSE Class X Computer Applications board exam, startsWith(String prefix) Method is an essential method. The startsWith(String prefix) method tests whether a string begins with the specified prefix sequence. It returns true if the character sequence represented by the argument is a prefix of the character sequence represented by this string, taking case into account. Key syllabus specification: Prefix Match: Returns true if the string begins with the specified prefix. Always avoid common pitfall: Assuming startsWith() is case-insensitive; use str.toLowerCase().startsWith() for case-insensitive checks.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Prefix Match: Returns true if the string begins with the specified prefix.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// StartsWithMethodDemo.java\n// Prefix Match: Returns true if the string begins with the specified prefix."
  },
  {
    "id": 2,
    "question": "What is the exact return type and signature of startsWith(String prefix) Method?",
    "shortAnswer": "startsWith(String prefix) Method: Fundamental ICSE rule #2 - Case Sensitivity: Strictly case-sensitive: 'ICSE'.startsWith('icse') returns false.",
    "explanation": "In the ICSE Class X Computer Applications board exam, startsWith(String prefix) Method is an essential method. The startsWith(String prefix) method tests whether a string begins with the specified prefix sequence. It returns true if the character sequence represented by the argument is a prefix of the character sequence represented by this string, taking case into account. Key syllabus specification: Case Sensitivity: Strictly case-sensitive: 'ICSE'.startsWith('icse') returns false. Always avoid common pitfall: Passing null resulting in NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Case Sensitivity: Strictly case-sensitive: 'ICSE'.startsWith('icse') returns false.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// StartsWithMethodDemo.java\n// Case Sensitivity: Strictly case-sensitive: 'ICSE'.startsWith('icse') returns false."
  },
  {
    "id": 3,
    "question": "How does startsWith(String prefix) Method handle null arguments or null references?",
    "shortAnswer": "startsWith(String prefix) Method: Fundamental ICSE rule #3 - Empty String Rule: Every string starts with empty string '': str.startsWith('') is always true.",
    "explanation": "In the ICSE Class X Computer Applications board exam, startsWith(String prefix) Method is an essential method. The startsWith(String prefix) method tests whether a string begins with the specified prefix sequence. It returns true if the character sequence represented by the argument is a prefix of the character sequence represented by this string, taking case into account. Key syllabus specification: Empty String Rule: Every string starts with empty string '': str.startsWith('') is always true. Always avoid common pitfall: Confusing startsWith() with contains(); startsWith() matches only at index 0.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Empty String Rule: Every string starts with empty string '': str.startsWith('') is always true.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// StartsWithMethodDemo.java\n// Empty String Rule: Every string starts with empty string '': str.startsWith('') is always true."
  },
  {
    "id": 4,
    "question": "Which common ICSE board examination error occurs with startsWith(String prefix) Method?",
    "shortAnswer": "startsWith(String prefix) Method: Fundamental ICSE rule #4 - Offset Overload: str.startsWith(prefix, toffset) tests if the prefix begins at index toffset.",
    "explanation": "In the ICSE Class X Computer Applications board exam, startsWith(String prefix) Method is an essential method. The startsWith(String prefix) method tests whether a string begins with the specified prefix sequence. It returns true if the character sequence represented by the argument is a prefix of the character sequence represented by this string, taking case into account. Key syllabus specification: Offset Overload: str.startsWith(prefix, toffset) tests if the prefix begins at index toffset. Always avoid common pitfall: Assuming startsWith() is case-insensitive; use str.toLowerCase().startsWith() for case-insensitive checks.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Offset Overload: str.startsWith(prefix, toffset) tests if the prefix begins at index toffset.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// StartsWithMethodDemo.java\n// Offset Overload: str.startsWith(prefix, toffset) tests if the prefix begins at index toffset."
  },
  {
    "id": 5,
    "question": "How does startsWith(String prefix) Method interact with Java's String immutability rule?",
    "shortAnswer": "startsWith(String prefix) Method: Fundamental ICSE rule #5 - Safe Length Handling: If prefix length exceeds string length, returns false safely without throwing errors.",
    "explanation": "In the ICSE Class X Computer Applications board exam, startsWith(String prefix) Method is an essential method. The startsWith(String prefix) method tests whether a string begins with the specified prefix sequence. It returns true if the character sequence represented by the argument is a prefix of the character sequence represented by this string, taking case into account. Key syllabus specification: Safe Length Handling: If prefix length exceeds string length, returns false safely without throwing errors. Always avoid common pitfall: Passing null resulting in NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Safe Length Handling: If prefix length exceeds string length, returns false safely without throwing errors.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// StartsWithMethodDemo.java\n// Safe Length Handling: If prefix length exceeds string length, returns false safely without throwing errors."
  },
  {
    "id": 6,
    "question": "Is startsWith(String prefix) Method case-sensitive or case-insensitive?",
    "shortAnswer": "startsWith(String prefix) Method: Fundamental ICSE rule #1 - Prefix Match: Returns true if the string begins with the specified prefix.",
    "explanation": "In the ICSE Class X Computer Applications board exam, startsWith(String prefix) Method is an essential method. The startsWith(String prefix) method tests whether a string begins with the specified prefix sequence. It returns true if the character sequence represented by the argument is a prefix of the character sequence represented by this string, taking case into account. Key syllabus specification: Prefix Match: Returns true if the string begins with the specified prefix. Always avoid common pitfall: Confusing startsWith() with contains(); startsWith() matches only at index 0.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Prefix Match: Returns true if the string begins with the specified prefix.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// StartsWithMethodDemo.java\n// Prefix Match: Returns true if the string begins with the specified prefix."
  },
  {
    "id": 7,
    "question": "What happens if index or boundary conditions are violated in startsWith(String prefix) Method?",
    "shortAnswer": "startsWith(String prefix) Method: Fundamental ICSE rule #2 - Case Sensitivity: Strictly case-sensitive: 'ICSE'.startsWith('icse') returns false.",
    "explanation": "In the ICSE Class X Computer Applications board exam, startsWith(String prefix) Method is an essential method. The startsWith(String prefix) method tests whether a string begins with the specified prefix sequence. It returns true if the character sequence represented by the argument is a prefix of the character sequence represented by this string, taking case into account. Key syllabus specification: Case Sensitivity: Strictly case-sensitive: 'ICSE'.startsWith('icse') returns false. Always avoid common pitfall: Assuming startsWith() is case-insensitive; use str.toLowerCase().startsWith() for case-insensitive checks.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Case Sensitivity: Strictly case-sensitive: 'ICSE'.startsWith('icse') returns false.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// StartsWithMethodDemo.java\n// Case Sensitivity: Strictly case-sensitive: 'ICSE'.startsWith('icse') returns false."
  },
  {
    "id": 8,
    "question": "How does startsWith(String prefix) Method differ from its counterpart or alternative operators?",
    "shortAnswer": "startsWith(String prefix) Method: Fundamental ICSE rule #3 - Empty String Rule: Every string starts with empty string '': str.startsWith('') is always true.",
    "explanation": "In the ICSE Class X Computer Applications board exam, startsWith(String prefix) Method is an essential method. The startsWith(String prefix) method tests whether a string begins with the specified prefix sequence. It returns true if the character sequence represented by the argument is a prefix of the character sequence represented by this string, taking case into account. Key syllabus specification: Empty String Rule: Every string starts with empty string '': str.startsWith('') is always true. Always avoid common pitfall: Passing null resulting in NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Empty String Rule: Every string starts with empty string '': str.startsWith('') is always true.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// StartsWithMethodDemo.java\n// Empty String Rule: Every string starts with empty string '': str.startsWith('') is always true."
  },
  {
    "id": 9,
    "question": "What runtime exception can be thrown by startsWith(String prefix) Method?",
    "shortAnswer": "startsWith(String prefix) Method: Fundamental ICSE rule #4 - Offset Overload: str.startsWith(prefix, toffset) tests if the prefix begins at index toffset.",
    "explanation": "In the ICSE Class X Computer Applications board exam, startsWith(String prefix) Method is an essential method. The startsWith(String prefix) method tests whether a string begins with the specified prefix sequence. It returns true if the character sequence represented by the argument is a prefix of the character sequence represented by this string, taking case into account. Key syllabus specification: Offset Overload: str.startsWith(prefix, toffset) tests if the prefix begins at index toffset. Always avoid common pitfall: Confusing startsWith() with contains(); startsWith() matches only at index 0.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Offset Overload: str.startsWith(prefix, toffset) tests if the prefix begins at index toffset.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// StartsWithMethodDemo.java\n// Offset Overload: str.startsWith(prefix, toffset) tests if the prefix begins at index toffset."
  },
  {
    "id": 10,
    "question": "Can startsWith(String prefix) Method be called repeatedly in method chaining?",
    "shortAnswer": "startsWith(String prefix) Method: Fundamental ICSE rule #5 - Safe Length Handling: If prefix length exceeds string length, returns false safely without throwing errors.",
    "explanation": "In the ICSE Class X Computer Applications board exam, startsWith(String prefix) Method is an essential method. The startsWith(String prefix) method tests whether a string begins with the specified prefix sequence. It returns true if the character sequence represented by the argument is a prefix of the character sequence represented by this string, taking case into account. Key syllabus specification: Safe Length Handling: If prefix length exceeds string length, returns false safely without throwing errors. Always avoid common pitfall: Assuming startsWith() is case-insensitive; use str.toLowerCase().startsWith() for case-insensitive checks.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Safe Length Handling: If prefix length exceeds string length, returns false safely without throwing errors.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// StartsWithMethodDemo.java\n// Safe Length Handling: If prefix length exceeds string length, returns false safely without throwing errors."
  },
  {
    "id": 11,
    "question": "How does BlueJ visualize the return value of startsWith(String prefix) Method?",
    "shortAnswer": "startsWith(String prefix) Method: Fundamental ICSE rule #1 - Prefix Match: Returns true if the string begins with the specified prefix.",
    "explanation": "In the ICSE Class X Computer Applications board exam, startsWith(String prefix) Method is an essential method. The startsWith(String prefix) method tests whether a string begins with the specified prefix sequence. It returns true if the character sequence represented by the argument is a prefix of the character sequence represented by this string, taking case into account. Key syllabus specification: Prefix Match: Returns true if the string begins with the specified prefix. Always avoid common pitfall: Passing null resulting in NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Prefix Match: Returns true if the string begins with the specified prefix.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// StartsWithMethodDemo.java\n// Prefix Match: Returns true if the string begins with the specified prefix."
  },
  {
    "id": 12,
    "question": "What is the time complexity of executing startsWith(String prefix) Method?",
    "shortAnswer": "startsWith(String prefix) Method: Fundamental ICSE rule #2 - Case Sensitivity: Strictly case-sensitive: 'ICSE'.startsWith('icse') returns false.",
    "explanation": "In the ICSE Class X Computer Applications board exam, startsWith(String prefix) Method is an essential method. The startsWith(String prefix) method tests whether a string begins with the specified prefix sequence. It returns true if the character sequence represented by the argument is a prefix of the character sequence represented by this string, taking case into account. Key syllabus specification: Case Sensitivity: Strictly case-sensitive: 'ICSE'.startsWith('icse') returns false. Always avoid common pitfall: Confusing startsWith() with contains(); startsWith() matches only at index 0.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Case Sensitivity: Strictly case-sensitive: 'ICSE'.startsWith('icse') returns false.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// StartsWithMethodDemo.java\n// Case Sensitivity: Strictly case-sensitive: 'ICSE'.startsWith('icse') returns false."
  },
  {
    "id": 13,
    "question": "How does startsWith(String prefix) Method behave when passed an empty string?",
    "shortAnswer": "startsWith(String prefix) Method: Fundamental ICSE rule #3 - Empty String Rule: Every string starts with empty string '': str.startsWith('') is always true.",
    "explanation": "In the ICSE Class X Computer Applications board exam, startsWith(String prefix) Method is an essential method. The startsWith(String prefix) method tests whether a string begins with the specified prefix sequence. It returns true if the character sequence represented by the argument is a prefix of the character sequence represented by this string, taking case into account. Key syllabus specification: Empty String Rule: Every string starts with empty string '': str.startsWith('') is always true. Always avoid common pitfall: Assuming startsWith() is case-insensitive; use str.toLowerCase().startsWith() for case-insensitive checks.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Empty String Rule: Every string starts with empty string '': str.startsWith('') is always true.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// StartsWithMethodDemo.java\n// Empty String Rule: Every string starts with empty string '': str.startsWith('') is always true."
  },
  {
    "id": 14,
    "question": "How is startsWith(String prefix) Method used in classic ICSE Section B programs (Pig Latin, Palindrome, Search)?",
    "shortAnswer": "startsWith(String prefix) Method: Fundamental ICSE rule #4 - Offset Overload: str.startsWith(prefix, toffset) tests if the prefix begins at index toffset.",
    "explanation": "In the ICSE Class X Computer Applications board exam, startsWith(String prefix) Method is an essential method. The startsWith(String prefix) method tests whether a string begins with the specified prefix sequence. It returns true if the character sequence represented by the argument is a prefix of the character sequence represented by this string, taking case into account. Key syllabus specification: Offset Overload: str.startsWith(prefix, toffset) tests if the prefix begins at index toffset. Always avoid common pitfall: Passing null resulting in NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Offset Overload: str.startsWith(prefix, toffset) tests if the prefix begins at index toffset.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// StartsWithMethodDemo.java\n// Offset Overload: str.startsWith(prefix, toffset) tests if the prefix begins at index toffset."
  },
  {
    "id": 15,
    "question": "Does startsWith(String prefix) Method create a new String in Heap memory or String Constant Pool?",
    "shortAnswer": "startsWith(String prefix) Method: Fundamental ICSE rule #5 - Safe Length Handling: If prefix length exceeds string length, returns false safely without throwing errors.",
    "explanation": "In the ICSE Class X Computer Applications board exam, startsWith(String prefix) Method is an essential method. The startsWith(String prefix) method tests whether a string begins with the specified prefix sequence. It returns true if the character sequence represented by the argument is a prefix of the character sequence represented by this string, taking case into account. Key syllabus specification: Safe Length Handling: If prefix length exceeds string length, returns false safely without throwing errors. Always avoid common pitfall: Confusing startsWith() with contains(); startsWith() matches only at index 0.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Safe Length Handling: If prefix length exceeds string length, returns false safely without throwing errors.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// StartsWithMethodDemo.java\n// Safe Length Handling: If prefix length exceeds string length, returns false safely without throwing errors."
  },
  {
    "id": 16,
    "question": "How does startsWith(String prefix) Method treat whitespace, digits, and special symbols?",
    "shortAnswer": "startsWith(String prefix) Method: Fundamental ICSE rule #1 - Prefix Match: Returns true if the string begins with the specified prefix.",
    "explanation": "In the ICSE Class X Computer Applications board exam, startsWith(String prefix) Method is an essential method. The startsWith(String prefix) method tests whether a string begins with the specified prefix sequence. It returns true if the character sequence represented by the argument is a prefix of the character sequence represented by this string, taking case into account. Key syllabus specification: Prefix Match: Returns true if the string begins with the specified prefix. Always avoid common pitfall: Assuming startsWith() is case-insensitive; use str.toLowerCase().startsWith() for case-insensitive checks.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Prefix Match: Returns true if the string begins with the specified prefix.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// StartsWithMethodDemo.java\n// Prefix Match: Returns true if the string begins with the specified prefix."
  },
  {
    "id": 17,
    "question": "What is the difference between static and instance invocation regarding startsWith(String prefix) Method?",
    "shortAnswer": "startsWith(String prefix) Method: Fundamental ICSE rule #2 - Case Sensitivity: Strictly case-sensitive: 'ICSE'.startsWith('icse') returns false.",
    "explanation": "In the ICSE Class X Computer Applications board exam, startsWith(String prefix) Method is an essential method. The startsWith(String prefix) method tests whether a string begins with the specified prefix sequence. It returns true if the character sequence represented by the argument is a prefix of the character sequence represented by this string, taking case into account. Key syllabus specification: Case Sensitivity: Strictly case-sensitive: 'ICSE'.startsWith('icse') returns false. Always avoid common pitfall: Passing null resulting in NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Case Sensitivity: Strictly case-sensitive: 'ICSE'.startsWith('icse') returns false.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// StartsWithMethodDemo.java\n// Case Sensitivity: Strictly case-sensitive: 'ICSE'.startsWith('icse') returns false."
  },
  {
    "id": 18,
    "question": "How do you write a Variable Description Table (VDT) entry for startsWith(String prefix) Method?",
    "shortAnswer": "startsWith(String prefix) Method: Fundamental ICSE rule #3 - Empty String Rule: Every string starts with empty string '': str.startsWith('') is always true.",
    "explanation": "In the ICSE Class X Computer Applications board exam, startsWith(String prefix) Method is an essential method. The startsWith(String prefix) method tests whether a string begins with the specified prefix sequence. It returns true if the character sequence represented by the argument is a prefix of the character sequence represented by this string, taking case into account. Key syllabus specification: Empty String Rule: Every string starts with empty string '': str.startsWith('') is always true. Always avoid common pitfall: Confusing startsWith() with contains(); startsWith() matches only at index 0.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Empty String Rule: Every string starts with empty string '': str.startsWith('') is always true.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// StartsWithMethodDemo.java\n// Empty String Rule: Every string starts with empty string '': str.startsWith('') is always true."
  },
  {
    "id": 19,
    "question": "How is startsWith(String prefix) Method tested in Section A output prediction questions?",
    "shortAnswer": "startsWith(String prefix) Method: Fundamental ICSE rule #4 - Offset Overload: str.startsWith(prefix, toffset) tests if the prefix begins at index toffset.",
    "explanation": "In the ICSE Class X Computer Applications board exam, startsWith(String prefix) Method is an essential method. The startsWith(String prefix) method tests whether a string begins with the specified prefix sequence. It returns true if the character sequence represented by the argument is a prefix of the character sequence represented by this string, taking case into account. Key syllabus specification: Offset Overload: str.startsWith(prefix, toffset) tests if the prefix begins at index toffset. Always avoid common pitfall: Assuming startsWith() is case-insensitive; use str.toLowerCase().startsWith() for case-insensitive checks.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Offset Overload: str.startsWith(prefix, toffset) tests if the prefix begins at index toffset.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// StartsWithMethodDemo.java\n// Offset Overload: str.startsWith(prefix, toffset) tests if the prefix begins at index toffset."
  },
  {
    "id": 20,
    "question": "Can startsWith(String prefix) Method be executed on a StringBuffer or StringBuilder?",
    "shortAnswer": "startsWith(String prefix) Method: Fundamental ICSE rule #5 - Safe Length Handling: If prefix length exceeds string length, returns false safely without throwing errors.",
    "explanation": "In the ICSE Class X Computer Applications board exam, startsWith(String prefix) Method is an essential method. The startsWith(String prefix) method tests whether a string begins with the specified prefix sequence. It returns true if the character sequence represented by the argument is a prefix of the character sequence represented by this string, taking case into account. Key syllabus specification: Safe Length Handling: If prefix length exceeds string length, returns false safely without throwing errors. Always avoid common pitfall: Passing null resulting in NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Safe Length Handling: If prefix length exceeds string length, returns false safely without throwing errors.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// StartsWithMethodDemo.java\n// Safe Length Handling: If prefix length exceeds string length, returns false safely without throwing errors."
  },
  {
    "id": 21,
    "question": "What happens if startsWith(String prefix) Method is called on a string of length 1?",
    "shortAnswer": "startsWith(String prefix) Method: Fundamental ICSE rule #1 - Prefix Match: Returns true if the string begins with the specified prefix.",
    "explanation": "In the ICSE Class X Computer Applications board exam, startsWith(String prefix) Method is an essential method. The startsWith(String prefix) method tests whether a string begins with the specified prefix sequence. It returns true if the character sequence represented by the argument is a prefix of the character sequence represented by this string, taking case into account. Key syllabus specification: Prefix Match: Returns true if the string begins with the specified prefix. Always avoid common pitfall: Confusing startsWith() with contains(); startsWith() matches only at index 0.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Prefix Match: Returns true if the string begins with the specified prefix.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// StartsWithMethodDemo.java\n// Prefix Match: Returns true if the string begins with the specified prefix."
  },
  {
    "id": 22,
    "question": "Why does startsWith(String prefix) Method return primitive values versus object references?",
    "shortAnswer": "startsWith(String prefix) Method: Fundamental ICSE rule #2 - Case Sensitivity: Strictly case-sensitive: 'ICSE'.startsWith('icse') returns false.",
    "explanation": "In the ICSE Class X Computer Applications board exam, startsWith(String prefix) Method is an essential method. The startsWith(String prefix) method tests whether a string begins with the specified prefix sequence. It returns true if the character sequence represented by the argument is a prefix of the character sequence represented by this string, taking case into account. Key syllabus specification: Case Sensitivity: Strictly case-sensitive: 'ICSE'.startsWith('icse') returns false. Always avoid common pitfall: Assuming startsWith() is case-insensitive; use str.toLowerCase().startsWith() for case-insensitive checks.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Case Sensitivity: Strictly case-sensitive: 'ICSE'.startsWith('icse') returns false.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// StartsWithMethodDemo.java\n// Case Sensitivity: Strictly case-sensitive: 'ICSE'.startsWith('icse') returns false."
  },
  {
    "id": 23,
    "question": "How do you combine startsWith(String prefix) Method with a for loop for string traversal?",
    "shortAnswer": "startsWith(String prefix) Method: Fundamental ICSE rule #3 - Empty String Rule: Every string starts with empty string '': str.startsWith('') is always true.",
    "explanation": "In the ICSE Class X Computer Applications board exam, startsWith(String prefix) Method is an essential method. The startsWith(String prefix) method tests whether a string begins with the specified prefix sequence. It returns true if the character sequence represented by the argument is a prefix of the character sequence represented by this string, taking case into account. Key syllabus specification: Empty String Rule: Every string starts with empty string '': str.startsWith('') is always true. Always avoid common pitfall: Passing null resulting in NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Empty String Rule: Every string starts with empty string '': str.startsWith('') is always true.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// StartsWithMethodDemo.java\n// Empty String Rule: Every string starts with empty string '': str.startsWith('') is always true."
  },
  {
    "id": 24,
    "question": "What happens if you ignore the return value of startsWith(String prefix) Method?",
    "shortAnswer": "startsWith(String prefix) Method: Fundamental ICSE rule #4 - Offset Overload: str.startsWith(prefix, toffset) tests if the prefix begins at index toffset.",
    "explanation": "In the ICSE Class X Computer Applications board exam, startsWith(String prefix) Method is an essential method. The startsWith(String prefix) method tests whether a string begins with the specified prefix sequence. It returns true if the character sequence represented by the argument is a prefix of the character sequence represented by this string, taking case into account. Key syllabus specification: Offset Overload: str.startsWith(prefix, toffset) tests if the prefix begins at index toffset. Always avoid common pitfall: Confusing startsWith() with contains(); startsWith() matches only at index 0.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Offset Overload: str.startsWith(prefix, toffset) tests if the prefix begins at index toffset.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// StartsWithMethodDemo.java\n// Offset Overload: str.startsWith(prefix, toffset) tests if the prefix begins at index toffset."
  },
  {
    "id": 25,
    "question": "What master examination advice does Sukanta Hui give for scoring full marks on startsWith(String prefix) Method?",
    "shortAnswer": "startsWith(String prefix) Method: Fundamental ICSE rule #5 - Safe Length Handling: If prefix length exceeds string length, returns false safely without throwing errors.",
    "explanation": "In the ICSE Class X Computer Applications board exam, startsWith(String prefix) Method is an essential method. The startsWith(String prefix) method tests whether a string begins with the specified prefix sequence. It returns true if the character sequence represented by the argument is a prefix of the character sequence represented by this string, taking case into account. Key syllabus specification: Safe Length Handling: If prefix length exceeds string length, returns false safely without throwing errors. Always avoid common pitfall: Assuming startsWith() is case-insensitive; use str.toLowerCase().startsWith() for case-insensitive checks.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Safe Length Handling: If prefix length exceeds string length, returns false safely without throwing errors.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 14:\n// StartsWithMethodDemo.java\n// Safe Length Handling: If prefix length exceeds string length, returns false safely without throwing errors."
  }
];

export default questions;
