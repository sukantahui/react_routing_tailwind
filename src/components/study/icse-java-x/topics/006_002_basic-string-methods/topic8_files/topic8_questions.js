const questions = [
  {
    "id": 1,
    "question": "What is the primary function of equals(Object obj) Method in the ICSE syllabus?",
    "shortAnswer": "equals(Object obj) Method: Fundamental ICSE rule #1 - Value Comparison: Compares character-by-character sequence; returns true only if lengths and all characters match exactly.",
    "explanation": "In the ICSE Class X Computer Applications board exam, equals(Object obj) Method is an essential method. The equals(Object obj) method compares the actual character contents of two strings for exact equality in a case-sensitive manner. It overrides Object.equals() to provide logical value comparison rather than reference identity (memory address comparison). Key syllabus specification: Value Comparison: Compares character-by-character sequence; returns true only if lengths and all characters match exactly. Always avoid common pitfall: Using '==' instead of '.equals()' to compare user input strings in ICSE Section B programs.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Value Comparison: Compares character-by-character sequence; returns true only if lengths and all characters match exactly.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// EqualsMethodDemo.java\n// Value Comparison: Compares character-by-character sequence; returns true only if lengths and all characters match exactly."
  },
  {
    "id": 2,
    "question": "What is the exact return type and signature of equals(Object obj) Method?",
    "shortAnswer": "equals(Object obj) Method: Fundamental ICSE rule #2 - Case-Sensitivity: Strictly case-sensitive: 'Java'.equals('java') evaluates to false.",
    "explanation": "In the ICSE Class X Computer Applications board exam, equals(Object obj) Method is an essential method. The equals(Object obj) method compares the actual character contents of two strings for exact equality in a case-sensitive manner. It overrides Object.equals() to provide logical value comparison rather than reference identity (memory address comparison). Key syllabus specification: Case-Sensitivity: Strictly case-sensitive: 'Java'.equals('java') evaluates to false. Always avoid common pitfall: Calling null.equals(str) which causes NullPointerException (use 'Constant'.equals(variable) for Yoda condition safety).",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Case-Sensitivity: Strictly case-sensitive: 'Java'.equals('java') evaluates to false.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// EqualsMethodDemo.java\n// Case-Sensitivity: Strictly case-sensitive: 'Java'.equals('java') evaluates to false."
  },
  {
    "id": 3,
    "question": "How does equals(Object obj) Method handle null arguments or null references?",
    "shortAnswer": "equals(Object obj) Method: Fundamental ICSE rule #3 - Contrast with ==: '==' compares object memory addresses (references), while '.equals()' compares text content.",
    "explanation": "In the ICSE Class X Computer Applications board exam, equals(Object obj) Method is an essential method. The equals(Object obj) method compares the actual character contents of two strings for exact equality in a case-sensitive manner. It overrides Object.equals() to provide logical value comparison rather than reference identity (memory address comparison). Key syllabus specification: Contrast with ==: '==' compares object memory addresses (references), while '.equals()' compares text content. Always avoid common pitfall: Confusing boolean return value (true/false) with compareTo() integer return value (0).",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Contrast with ==: '==' compares object memory addresses (references), while '.equals()' compares text content.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// EqualsMethodDemo.java\n// Contrast with ==: '==' compares object memory addresses (references), while '.equals()' compares text content."
  },
  {
    "id": 4,
    "question": "Which common ICSE board examination error occurs with equals(Object obj) Method?",
    "shortAnswer": "equals(Object obj) Method: Fundamental ICSE rule #4 - Null Safety: str.equals(null) safely returns false without throwing an exception.",
    "explanation": "In the ICSE Class X Computer Applications board exam, equals(Object obj) Method is an essential method. The equals(Object obj) method compares the actual character contents of two strings for exact equality in a case-sensitive manner. It overrides Object.equals() to provide logical value comparison rather than reference identity (memory address comparison). Key syllabus specification: Null Safety: str.equals(null) safely returns false without throwing an exception. Always avoid common pitfall: Using '==' instead of '.equals()' to compare user input strings in ICSE Section B programs.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Null Safety: str.equals(null) safely returns false without throwing an exception.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// EqualsMethodDemo.java\n// Null Safety: str.equals(null) safely returns false without throwing an exception."
  },
  {
    "id": 5,
    "question": "How does equals(Object obj) Method interact with Java's String immutability rule?",
    "shortAnswer": "equals(Object obj) Method: Fundamental ICSE rule #5 - Equivalence Relation: Satisfies reflexive (x.equals(x)), symmetric, and transitive mathematical properties.",
    "explanation": "In the ICSE Class X Computer Applications board exam, equals(Object obj) Method is an essential method. The equals(Object obj) method compares the actual character contents of two strings for exact equality in a case-sensitive manner. It overrides Object.equals() to provide logical value comparison rather than reference identity (memory address comparison). Key syllabus specification: Equivalence Relation: Satisfies reflexive (x.equals(x)), symmetric, and transitive mathematical properties. Always avoid common pitfall: Calling null.equals(str) which causes NullPointerException (use 'Constant'.equals(variable) for Yoda condition safety).",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Equivalence Relation: Satisfies reflexive (x.equals(x)), symmetric, and transitive mathematical properties.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// EqualsMethodDemo.java\n// Equivalence Relation: Satisfies reflexive (x.equals(x)), symmetric, and transitive mathematical properties."
  },
  {
    "id": 6,
    "question": "Is equals(Object obj) Method case-sensitive or case-insensitive?",
    "shortAnswer": "equals(Object obj) Method: Fundamental ICSE rule #1 - Value Comparison: Compares character-by-character sequence; returns true only if lengths and all characters match exactly.",
    "explanation": "In the ICSE Class X Computer Applications board exam, equals(Object obj) Method is an essential method. The equals(Object obj) method compares the actual character contents of two strings for exact equality in a case-sensitive manner. It overrides Object.equals() to provide logical value comparison rather than reference identity (memory address comparison). Key syllabus specification: Value Comparison: Compares character-by-character sequence; returns true only if lengths and all characters match exactly. Always avoid common pitfall: Confusing boolean return value (true/false) with compareTo() integer return value (0).",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Value Comparison: Compares character-by-character sequence; returns true only if lengths and all characters match exactly.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// EqualsMethodDemo.java\n// Value Comparison: Compares character-by-character sequence; returns true only if lengths and all characters match exactly."
  },
  {
    "id": 7,
    "question": "What happens if index or boundary conditions are violated in equals(Object obj) Method?",
    "shortAnswer": "equals(Object obj) Method: Fundamental ICSE rule #2 - Case-Sensitivity: Strictly case-sensitive: 'Java'.equals('java') evaluates to false.",
    "explanation": "In the ICSE Class X Computer Applications board exam, equals(Object obj) Method is an essential method. The equals(Object obj) method compares the actual character contents of two strings for exact equality in a case-sensitive manner. It overrides Object.equals() to provide logical value comparison rather than reference identity (memory address comparison). Key syllabus specification: Case-Sensitivity: Strictly case-sensitive: 'Java'.equals('java') evaluates to false. Always avoid common pitfall: Using '==' instead of '.equals()' to compare user input strings in ICSE Section B programs.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Case-Sensitivity: Strictly case-sensitive: 'Java'.equals('java') evaluates to false.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// EqualsMethodDemo.java\n// Case-Sensitivity: Strictly case-sensitive: 'Java'.equals('java') evaluates to false."
  },
  {
    "id": 8,
    "question": "How does equals(Object obj) Method differ from its counterpart or alternative operators?",
    "shortAnswer": "equals(Object obj) Method: Fundamental ICSE rule #3 - Contrast with ==: '==' compares object memory addresses (references), while '.equals()' compares text content.",
    "explanation": "In the ICSE Class X Computer Applications board exam, equals(Object obj) Method is an essential method. The equals(Object obj) method compares the actual character contents of two strings for exact equality in a case-sensitive manner. It overrides Object.equals() to provide logical value comparison rather than reference identity (memory address comparison). Key syllabus specification: Contrast with ==: '==' compares object memory addresses (references), while '.equals()' compares text content. Always avoid common pitfall: Calling null.equals(str) which causes NullPointerException (use 'Constant'.equals(variable) for Yoda condition safety).",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Contrast with ==: '==' compares object memory addresses (references), while '.equals()' compares text content.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// EqualsMethodDemo.java\n// Contrast with ==: '==' compares object memory addresses (references), while '.equals()' compares text content."
  },
  {
    "id": 9,
    "question": "What runtime exception can be thrown by equals(Object obj) Method?",
    "shortAnswer": "equals(Object obj) Method: Fundamental ICSE rule #4 - Null Safety: str.equals(null) safely returns false without throwing an exception.",
    "explanation": "In the ICSE Class X Computer Applications board exam, equals(Object obj) Method is an essential method. The equals(Object obj) method compares the actual character contents of two strings for exact equality in a case-sensitive manner. It overrides Object.equals() to provide logical value comparison rather than reference identity (memory address comparison). Key syllabus specification: Null Safety: str.equals(null) safely returns false without throwing an exception. Always avoid common pitfall: Confusing boolean return value (true/false) with compareTo() integer return value (0).",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Null Safety: str.equals(null) safely returns false without throwing an exception.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// EqualsMethodDemo.java\n// Null Safety: str.equals(null) safely returns false without throwing an exception."
  },
  {
    "id": 10,
    "question": "Can equals(Object obj) Method be called repeatedly in method chaining?",
    "shortAnswer": "equals(Object obj) Method: Fundamental ICSE rule #5 - Equivalence Relation: Satisfies reflexive (x.equals(x)), symmetric, and transitive mathematical properties.",
    "explanation": "In the ICSE Class X Computer Applications board exam, equals(Object obj) Method is an essential method. The equals(Object obj) method compares the actual character contents of two strings for exact equality in a case-sensitive manner. It overrides Object.equals() to provide logical value comparison rather than reference identity (memory address comparison). Key syllabus specification: Equivalence Relation: Satisfies reflexive (x.equals(x)), symmetric, and transitive mathematical properties. Always avoid common pitfall: Using '==' instead of '.equals()' to compare user input strings in ICSE Section B programs.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Equivalence Relation: Satisfies reflexive (x.equals(x)), symmetric, and transitive mathematical properties.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// EqualsMethodDemo.java\n// Equivalence Relation: Satisfies reflexive (x.equals(x)), symmetric, and transitive mathematical properties."
  },
  {
    "id": 11,
    "question": "How does BlueJ visualize the return value of equals(Object obj) Method?",
    "shortAnswer": "equals(Object obj) Method: Fundamental ICSE rule #1 - Value Comparison: Compares character-by-character sequence; returns true only if lengths and all characters match exactly.",
    "explanation": "In the ICSE Class X Computer Applications board exam, equals(Object obj) Method is an essential method. The equals(Object obj) method compares the actual character contents of two strings for exact equality in a case-sensitive manner. It overrides Object.equals() to provide logical value comparison rather than reference identity (memory address comparison). Key syllabus specification: Value Comparison: Compares character-by-character sequence; returns true only if lengths and all characters match exactly. Always avoid common pitfall: Calling null.equals(str) which causes NullPointerException (use 'Constant'.equals(variable) for Yoda condition safety).",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Value Comparison: Compares character-by-character sequence; returns true only if lengths and all characters match exactly.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// EqualsMethodDemo.java\n// Value Comparison: Compares character-by-character sequence; returns true only if lengths and all characters match exactly."
  },
  {
    "id": 12,
    "question": "What is the time complexity of executing equals(Object obj) Method?",
    "shortAnswer": "equals(Object obj) Method: Fundamental ICSE rule #2 - Case-Sensitivity: Strictly case-sensitive: 'Java'.equals('java') evaluates to false.",
    "explanation": "In the ICSE Class X Computer Applications board exam, equals(Object obj) Method is an essential method. The equals(Object obj) method compares the actual character contents of two strings for exact equality in a case-sensitive manner. It overrides Object.equals() to provide logical value comparison rather than reference identity (memory address comparison). Key syllabus specification: Case-Sensitivity: Strictly case-sensitive: 'Java'.equals('java') evaluates to false. Always avoid common pitfall: Confusing boolean return value (true/false) with compareTo() integer return value (0).",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Case-Sensitivity: Strictly case-sensitive: 'Java'.equals('java') evaluates to false.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// EqualsMethodDemo.java\n// Case-Sensitivity: Strictly case-sensitive: 'Java'.equals('java') evaluates to false."
  },
  {
    "id": 13,
    "question": "How does equals(Object obj) Method behave when passed an empty string?",
    "shortAnswer": "equals(Object obj) Method: Fundamental ICSE rule #3 - Contrast with ==: '==' compares object memory addresses (references), while '.equals()' compares text content.",
    "explanation": "In the ICSE Class X Computer Applications board exam, equals(Object obj) Method is an essential method. The equals(Object obj) method compares the actual character contents of two strings for exact equality in a case-sensitive manner. It overrides Object.equals() to provide logical value comparison rather than reference identity (memory address comparison). Key syllabus specification: Contrast with ==: '==' compares object memory addresses (references), while '.equals()' compares text content. Always avoid common pitfall: Using '==' instead of '.equals()' to compare user input strings in ICSE Section B programs.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Contrast with ==: '==' compares object memory addresses (references), while '.equals()' compares text content.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// EqualsMethodDemo.java\n// Contrast with ==: '==' compares object memory addresses (references), while '.equals()' compares text content."
  },
  {
    "id": 14,
    "question": "How is equals(Object obj) Method used in classic ICSE Section B programs (Pig Latin, Palindrome, Search)?",
    "shortAnswer": "equals(Object obj) Method: Fundamental ICSE rule #4 - Null Safety: str.equals(null) safely returns false without throwing an exception.",
    "explanation": "In the ICSE Class X Computer Applications board exam, equals(Object obj) Method is an essential method. The equals(Object obj) method compares the actual character contents of two strings for exact equality in a case-sensitive manner. It overrides Object.equals() to provide logical value comparison rather than reference identity (memory address comparison). Key syllabus specification: Null Safety: str.equals(null) safely returns false without throwing an exception. Always avoid common pitfall: Calling null.equals(str) which causes NullPointerException (use 'Constant'.equals(variable) for Yoda condition safety).",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Null Safety: str.equals(null) safely returns false without throwing an exception.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// EqualsMethodDemo.java\n// Null Safety: str.equals(null) safely returns false without throwing an exception."
  },
  {
    "id": 15,
    "question": "Does equals(Object obj) Method create a new String in Heap memory or String Constant Pool?",
    "shortAnswer": "equals(Object obj) Method: Fundamental ICSE rule #5 - Equivalence Relation: Satisfies reflexive (x.equals(x)), symmetric, and transitive mathematical properties.",
    "explanation": "In the ICSE Class X Computer Applications board exam, equals(Object obj) Method is an essential method. The equals(Object obj) method compares the actual character contents of two strings for exact equality in a case-sensitive manner. It overrides Object.equals() to provide logical value comparison rather than reference identity (memory address comparison). Key syllabus specification: Equivalence Relation: Satisfies reflexive (x.equals(x)), symmetric, and transitive mathematical properties. Always avoid common pitfall: Confusing boolean return value (true/false) with compareTo() integer return value (0).",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Equivalence Relation: Satisfies reflexive (x.equals(x)), symmetric, and transitive mathematical properties.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// EqualsMethodDemo.java\n// Equivalence Relation: Satisfies reflexive (x.equals(x)), symmetric, and transitive mathematical properties."
  },
  {
    "id": 16,
    "question": "How does equals(Object obj) Method treat whitespace, digits, and special symbols?",
    "shortAnswer": "equals(Object obj) Method: Fundamental ICSE rule #1 - Value Comparison: Compares character-by-character sequence; returns true only if lengths and all characters match exactly.",
    "explanation": "In the ICSE Class X Computer Applications board exam, equals(Object obj) Method is an essential method. The equals(Object obj) method compares the actual character contents of two strings for exact equality in a case-sensitive manner. It overrides Object.equals() to provide logical value comparison rather than reference identity (memory address comparison). Key syllabus specification: Value Comparison: Compares character-by-character sequence; returns true only if lengths and all characters match exactly. Always avoid common pitfall: Using '==' instead of '.equals()' to compare user input strings in ICSE Section B programs.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Value Comparison: Compares character-by-character sequence; returns true only if lengths and all characters match exactly.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// EqualsMethodDemo.java\n// Value Comparison: Compares character-by-character sequence; returns true only if lengths and all characters match exactly."
  },
  {
    "id": 17,
    "question": "What is the difference between static and instance invocation regarding equals(Object obj) Method?",
    "shortAnswer": "equals(Object obj) Method: Fundamental ICSE rule #2 - Case-Sensitivity: Strictly case-sensitive: 'Java'.equals('java') evaluates to false.",
    "explanation": "In the ICSE Class X Computer Applications board exam, equals(Object obj) Method is an essential method. The equals(Object obj) method compares the actual character contents of two strings for exact equality in a case-sensitive manner. It overrides Object.equals() to provide logical value comparison rather than reference identity (memory address comparison). Key syllabus specification: Case-Sensitivity: Strictly case-sensitive: 'Java'.equals('java') evaluates to false. Always avoid common pitfall: Calling null.equals(str) which causes NullPointerException (use 'Constant'.equals(variable) for Yoda condition safety).",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Case-Sensitivity: Strictly case-sensitive: 'Java'.equals('java') evaluates to false.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// EqualsMethodDemo.java\n// Case-Sensitivity: Strictly case-sensitive: 'Java'.equals('java') evaluates to false."
  },
  {
    "id": 18,
    "question": "How do you write a Variable Description Table (VDT) entry for equals(Object obj) Method?",
    "shortAnswer": "equals(Object obj) Method: Fundamental ICSE rule #3 - Contrast with ==: '==' compares object memory addresses (references), while '.equals()' compares text content.",
    "explanation": "In the ICSE Class X Computer Applications board exam, equals(Object obj) Method is an essential method. The equals(Object obj) method compares the actual character contents of two strings for exact equality in a case-sensitive manner. It overrides Object.equals() to provide logical value comparison rather than reference identity (memory address comparison). Key syllabus specification: Contrast with ==: '==' compares object memory addresses (references), while '.equals()' compares text content. Always avoid common pitfall: Confusing boolean return value (true/false) with compareTo() integer return value (0).",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Contrast with ==: '==' compares object memory addresses (references), while '.equals()' compares text content.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// EqualsMethodDemo.java\n// Contrast with ==: '==' compares object memory addresses (references), while '.equals()' compares text content."
  },
  {
    "id": 19,
    "question": "How is equals(Object obj) Method tested in Section A output prediction questions?",
    "shortAnswer": "equals(Object obj) Method: Fundamental ICSE rule #4 - Null Safety: str.equals(null) safely returns false without throwing an exception.",
    "explanation": "In the ICSE Class X Computer Applications board exam, equals(Object obj) Method is an essential method. The equals(Object obj) method compares the actual character contents of two strings for exact equality in a case-sensitive manner. It overrides Object.equals() to provide logical value comparison rather than reference identity (memory address comparison). Key syllabus specification: Null Safety: str.equals(null) safely returns false without throwing an exception. Always avoid common pitfall: Using '==' instead of '.equals()' to compare user input strings in ICSE Section B programs.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Null Safety: str.equals(null) safely returns false without throwing an exception.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// EqualsMethodDemo.java\n// Null Safety: str.equals(null) safely returns false without throwing an exception."
  },
  {
    "id": 20,
    "question": "Can equals(Object obj) Method be executed on a StringBuffer or StringBuilder?",
    "shortAnswer": "equals(Object obj) Method: Fundamental ICSE rule #5 - Equivalence Relation: Satisfies reflexive (x.equals(x)), symmetric, and transitive mathematical properties.",
    "explanation": "In the ICSE Class X Computer Applications board exam, equals(Object obj) Method is an essential method. The equals(Object obj) method compares the actual character contents of two strings for exact equality in a case-sensitive manner. It overrides Object.equals() to provide logical value comparison rather than reference identity (memory address comparison). Key syllabus specification: Equivalence Relation: Satisfies reflexive (x.equals(x)), symmetric, and transitive mathematical properties. Always avoid common pitfall: Calling null.equals(str) which causes NullPointerException (use 'Constant'.equals(variable) for Yoda condition safety).",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Equivalence Relation: Satisfies reflexive (x.equals(x)), symmetric, and transitive mathematical properties.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// EqualsMethodDemo.java\n// Equivalence Relation: Satisfies reflexive (x.equals(x)), symmetric, and transitive mathematical properties."
  },
  {
    "id": 21,
    "question": "What happens if equals(Object obj) Method is called on a string of length 1?",
    "shortAnswer": "equals(Object obj) Method: Fundamental ICSE rule #1 - Value Comparison: Compares character-by-character sequence; returns true only if lengths and all characters match exactly.",
    "explanation": "In the ICSE Class X Computer Applications board exam, equals(Object obj) Method is an essential method. The equals(Object obj) method compares the actual character contents of two strings for exact equality in a case-sensitive manner. It overrides Object.equals() to provide logical value comparison rather than reference identity (memory address comparison). Key syllabus specification: Value Comparison: Compares character-by-character sequence; returns true only if lengths and all characters match exactly. Always avoid common pitfall: Confusing boolean return value (true/false) with compareTo() integer return value (0).",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Value Comparison: Compares character-by-character sequence; returns true only if lengths and all characters match exactly.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// EqualsMethodDemo.java\n// Value Comparison: Compares character-by-character sequence; returns true only if lengths and all characters match exactly."
  },
  {
    "id": 22,
    "question": "Why does equals(Object obj) Method return primitive values versus object references?",
    "shortAnswer": "equals(Object obj) Method: Fundamental ICSE rule #2 - Case-Sensitivity: Strictly case-sensitive: 'Java'.equals('java') evaluates to false.",
    "explanation": "In the ICSE Class X Computer Applications board exam, equals(Object obj) Method is an essential method. The equals(Object obj) method compares the actual character contents of two strings for exact equality in a case-sensitive manner. It overrides Object.equals() to provide logical value comparison rather than reference identity (memory address comparison). Key syllabus specification: Case-Sensitivity: Strictly case-sensitive: 'Java'.equals('java') evaluates to false. Always avoid common pitfall: Using '==' instead of '.equals()' to compare user input strings in ICSE Section B programs.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Case-Sensitivity: Strictly case-sensitive: 'Java'.equals('java') evaluates to false.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// EqualsMethodDemo.java\n// Case-Sensitivity: Strictly case-sensitive: 'Java'.equals('java') evaluates to false."
  },
  {
    "id": 23,
    "question": "How do you combine equals(Object obj) Method with a for loop for string traversal?",
    "shortAnswer": "equals(Object obj) Method: Fundamental ICSE rule #3 - Contrast with ==: '==' compares object memory addresses (references), while '.equals()' compares text content.",
    "explanation": "In the ICSE Class X Computer Applications board exam, equals(Object obj) Method is an essential method. The equals(Object obj) method compares the actual character contents of two strings for exact equality in a case-sensitive manner. It overrides Object.equals() to provide logical value comparison rather than reference identity (memory address comparison). Key syllabus specification: Contrast with ==: '==' compares object memory addresses (references), while '.equals()' compares text content. Always avoid common pitfall: Calling null.equals(str) which causes NullPointerException (use 'Constant'.equals(variable) for Yoda condition safety).",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Contrast with ==: '==' compares object memory addresses (references), while '.equals()' compares text content.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// EqualsMethodDemo.java\n// Contrast with ==: '==' compares object memory addresses (references), while '.equals()' compares text content."
  },
  {
    "id": 24,
    "question": "What happens if you ignore the return value of equals(Object obj) Method?",
    "shortAnswer": "equals(Object obj) Method: Fundamental ICSE rule #4 - Null Safety: str.equals(null) safely returns false without throwing an exception.",
    "explanation": "In the ICSE Class X Computer Applications board exam, equals(Object obj) Method is an essential method. The equals(Object obj) method compares the actual character contents of two strings for exact equality in a case-sensitive manner. It overrides Object.equals() to provide logical value comparison rather than reference identity (memory address comparison). Key syllabus specification: Null Safety: str.equals(null) safely returns false without throwing an exception. Always avoid common pitfall: Confusing boolean return value (true/false) with compareTo() integer return value (0).",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Null Safety: str.equals(null) safely returns false without throwing an exception.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// EqualsMethodDemo.java\n// Null Safety: str.equals(null) safely returns false without throwing an exception."
  },
  {
    "id": 25,
    "question": "What master examination advice does Sukanta Hui give for scoring full marks on equals(Object obj) Method?",
    "shortAnswer": "equals(Object obj) Method: Fundamental ICSE rule #5 - Equivalence Relation: Satisfies reflexive (x.equals(x)), symmetric, and transitive mathematical properties.",
    "explanation": "In the ICSE Class X Computer Applications board exam, equals(Object obj) Method is an essential method. The equals(Object obj) method compares the actual character contents of two strings for exact equality in a case-sensitive manner. It overrides Object.equals() to provide logical value comparison rather than reference identity (memory address comparison). Key syllabus specification: Equivalence Relation: Satisfies reflexive (x.equals(x)), symmetric, and transitive mathematical properties. Always avoid common pitfall: Using '==' instead of '.equals()' to compare user input strings in ICSE Section B programs.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Equivalence Relation: Satisfies reflexive (x.equals(x)), symmetric, and transitive mathematical properties.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 8:\n// EqualsMethodDemo.java\n// Equivalence Relation: Satisfies reflexive (x.equals(x)), symmetric, and transitive mathematical properties."
  }
];

export default questions;
