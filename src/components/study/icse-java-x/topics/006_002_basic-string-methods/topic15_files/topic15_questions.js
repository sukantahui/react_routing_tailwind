const questions = [
  {
    "id": 1,
    "question": "What is the primary function of endsWith(String suffix) Method in the ICSE syllabus?",
    "shortAnswer": "endsWith(String suffix) Method: Fundamental ICSE rule #1 - Suffix Match: Returns true if the string ends with the specified suffix.",
    "explanation": "In the ICSE Class X Computer Applications board exam, endsWith(String suffix) Method is an essential method. The endsWith(String suffix) method tests whether a string ends with the specified suffix. It returns true if the character sequence represented by the argument is a suffix of the character sequence represented by this object. Key syllabus specification: Suffix Match: Returns true if the string ends with the specified suffix. Always avoid common pitfall: Case mismatch when checking file extensions (e.g. .jpg vs .JPG).",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Suffix Match: Returns true if the string ends with the specified suffix.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// EndsWithMethodDemo.java\n// Suffix Match: Returns true if the string ends with the specified suffix."
  },
  {
    "id": 2,
    "question": "What is the exact return type and signature of endsWith(String suffix) Method?",
    "shortAnswer": "endsWith(String suffix) Method: Fundamental ICSE rule #2 - Case Sensitivity: Strictly case-sensitive: 'Report.PDF'.endsWith('.pdf') returns false.",
    "explanation": "In the ICSE Class X Computer Applications board exam, endsWith(String suffix) Method is an essential method. The endsWith(String suffix) method tests whether a string ends with the specified suffix. It returns true if the character sequence represented by the argument is a suffix of the character sequence represented by this object. Key syllabus specification: Case Sensitivity: Strictly case-sensitive: 'Report.PDF'.endsWith('.pdf') returns false. Always avoid common pitfall: Passing null resulting in NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Case Sensitivity: Strictly case-sensitive: 'Report.PDF'.endsWith('.pdf') returns false.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// EndsWithMethodDemo.java\n// Case Sensitivity: Strictly case-sensitive: 'Report.PDF'.endsWith('.pdf') returns false."
  },
  {
    "id": 3,
    "question": "How does endsWith(String suffix) Method handle null arguments or null references?",
    "shortAnswer": "endsWith(String suffix) Method: Fundamental ICSE rule #3 - Empty String Rule: Every string ends with empty string '': str.endsWith('') is always true.",
    "explanation": "In the ICSE Class X Computer Applications board exam, endsWith(String suffix) Method is an essential method. The endsWith(String suffix) method tests whether a string ends with the specified suffix. It returns true if the character sequence represented by the argument is a suffix of the character sequence represented by this object. Key syllabus specification: Empty String Rule: Every string ends with empty string '': str.endsWith('') is always true. Always avoid common pitfall: Overlooking trailing whitespace: 'document.pdf '.endsWith('.pdf') returns false due to trailing space.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Empty String Rule: Every string ends with empty string '': str.endsWith('') is always true.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// EndsWithMethodDemo.java\n// Empty String Rule: Every string ends with empty string '': str.endsWith('') is always true."
  },
  {
    "id": 4,
    "question": "Which common ICSE board examination error occurs with endsWith(String suffix) Method?",
    "shortAnswer": "endsWith(String suffix) Method: Fundamental ICSE rule #4 - Safe Comparison: Returns false without exception if suffix length is greater than string length.",
    "explanation": "In the ICSE Class X Computer Applications board exam, endsWith(String suffix) Method is an essential method. The endsWith(String suffix) method tests whether a string ends with the specified suffix. It returns true if the character sequence represented by the argument is a suffix of the character sequence represented by this object. Key syllabus specification: Safe Comparison: Returns false without exception if suffix length is greater than string length. Always avoid common pitfall: Case mismatch when checking file extensions (e.g. .jpg vs .JPG).",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Safe Comparison: Returns false without exception if suffix length is greater than string length.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// EndsWithMethodDemo.java\n// Safe Comparison: Returns false without exception if suffix length is greater than string length."
  },
  {
    "id": 5,
    "question": "How does endsWith(String suffix) Method interact with Java's String immutability rule?",
    "shortAnswer": "endsWith(String suffix) Method: Fundamental ICSE rule #5 - ICSE Syllabus Utility: Commonly tested for file extension verification (.java, .txt) and email domain filtering (@gmail.com).",
    "explanation": "In the ICSE Class X Computer Applications board exam, endsWith(String suffix) Method is an essential method. The endsWith(String suffix) method tests whether a string ends with the specified suffix. It returns true if the character sequence represented by the argument is a suffix of the character sequence represented by this object. Key syllabus specification: ICSE Syllabus Utility: Commonly tested for file extension verification (.java, .txt) and email domain filtering (@gmail.com). Always avoid common pitfall: Passing null resulting in NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "ICSE Syllabus Utility: Commonly tested for file extension verification (.java, .txt) and email domain filtering (@gmail.com).",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// EndsWithMethodDemo.java\n// ICSE Syllabus Utility: Commonly tested for file extension verification (.java, .txt) and email domain filtering (@gmail.com)."
  },
  {
    "id": 6,
    "question": "Is endsWith(String suffix) Method case-sensitive or case-insensitive?",
    "shortAnswer": "endsWith(String suffix) Method: Fundamental ICSE rule #1 - Suffix Match: Returns true if the string ends with the specified suffix.",
    "explanation": "In the ICSE Class X Computer Applications board exam, endsWith(String suffix) Method is an essential method. The endsWith(String suffix) method tests whether a string ends with the specified suffix. It returns true if the character sequence represented by the argument is a suffix of the character sequence represented by this object. Key syllabus specification: Suffix Match: Returns true if the string ends with the specified suffix. Always avoid common pitfall: Overlooking trailing whitespace: 'document.pdf '.endsWith('.pdf') returns false due to trailing space.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Suffix Match: Returns true if the string ends with the specified suffix.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// EndsWithMethodDemo.java\n// Suffix Match: Returns true if the string ends with the specified suffix."
  },
  {
    "id": 7,
    "question": "What happens if index or boundary conditions are violated in endsWith(String suffix) Method?",
    "shortAnswer": "endsWith(String suffix) Method: Fundamental ICSE rule #2 - Case Sensitivity: Strictly case-sensitive: 'Report.PDF'.endsWith('.pdf') returns false.",
    "explanation": "In the ICSE Class X Computer Applications board exam, endsWith(String suffix) Method is an essential method. The endsWith(String suffix) method tests whether a string ends with the specified suffix. It returns true if the character sequence represented by the argument is a suffix of the character sequence represented by this object. Key syllabus specification: Case Sensitivity: Strictly case-sensitive: 'Report.PDF'.endsWith('.pdf') returns false. Always avoid common pitfall: Case mismatch when checking file extensions (e.g. .jpg vs .JPG).",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Case Sensitivity: Strictly case-sensitive: 'Report.PDF'.endsWith('.pdf') returns false.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// EndsWithMethodDemo.java\n// Case Sensitivity: Strictly case-sensitive: 'Report.PDF'.endsWith('.pdf') returns false."
  },
  {
    "id": 8,
    "question": "How does endsWith(String suffix) Method differ from its counterpart or alternative operators?",
    "shortAnswer": "endsWith(String suffix) Method: Fundamental ICSE rule #3 - Empty String Rule: Every string ends with empty string '': str.endsWith('') is always true.",
    "explanation": "In the ICSE Class X Computer Applications board exam, endsWith(String suffix) Method is an essential method. The endsWith(String suffix) method tests whether a string ends with the specified suffix. It returns true if the character sequence represented by the argument is a suffix of the character sequence represented by this object. Key syllabus specification: Empty String Rule: Every string ends with empty string '': str.endsWith('') is always true. Always avoid common pitfall: Passing null resulting in NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Empty String Rule: Every string ends with empty string '': str.endsWith('') is always true.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// EndsWithMethodDemo.java\n// Empty String Rule: Every string ends with empty string '': str.endsWith('') is always true."
  },
  {
    "id": 9,
    "question": "What runtime exception can be thrown by endsWith(String suffix) Method?",
    "shortAnswer": "endsWith(String suffix) Method: Fundamental ICSE rule #4 - Safe Comparison: Returns false without exception if suffix length is greater than string length.",
    "explanation": "In the ICSE Class X Computer Applications board exam, endsWith(String suffix) Method is an essential method. The endsWith(String suffix) method tests whether a string ends with the specified suffix. It returns true if the character sequence represented by the argument is a suffix of the character sequence represented by this object. Key syllabus specification: Safe Comparison: Returns false without exception if suffix length is greater than string length. Always avoid common pitfall: Overlooking trailing whitespace: 'document.pdf '.endsWith('.pdf') returns false due to trailing space.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Safe Comparison: Returns false without exception if suffix length is greater than string length.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// EndsWithMethodDemo.java\n// Safe Comparison: Returns false without exception if suffix length is greater than string length."
  },
  {
    "id": 10,
    "question": "Can endsWith(String suffix) Method be called repeatedly in method chaining?",
    "shortAnswer": "endsWith(String suffix) Method: Fundamental ICSE rule #5 - ICSE Syllabus Utility: Commonly tested for file extension verification (.java, .txt) and email domain filtering (@gmail.com).",
    "explanation": "In the ICSE Class X Computer Applications board exam, endsWith(String suffix) Method is an essential method. The endsWith(String suffix) method tests whether a string ends with the specified suffix. It returns true if the character sequence represented by the argument is a suffix of the character sequence represented by this object. Key syllabus specification: ICSE Syllabus Utility: Commonly tested for file extension verification (.java, .txt) and email domain filtering (@gmail.com). Always avoid common pitfall: Case mismatch when checking file extensions (e.g. .jpg vs .JPG).",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "ICSE Syllabus Utility: Commonly tested for file extension verification (.java, .txt) and email domain filtering (@gmail.com).",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// EndsWithMethodDemo.java\n// ICSE Syllabus Utility: Commonly tested for file extension verification (.java, .txt) and email domain filtering (@gmail.com)."
  },
  {
    "id": 11,
    "question": "How does BlueJ visualize the return value of endsWith(String suffix) Method?",
    "shortAnswer": "endsWith(String suffix) Method: Fundamental ICSE rule #1 - Suffix Match: Returns true if the string ends with the specified suffix.",
    "explanation": "In the ICSE Class X Computer Applications board exam, endsWith(String suffix) Method is an essential method. The endsWith(String suffix) method tests whether a string ends with the specified suffix. It returns true if the character sequence represented by the argument is a suffix of the character sequence represented by this object. Key syllabus specification: Suffix Match: Returns true if the string ends with the specified suffix. Always avoid common pitfall: Passing null resulting in NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Suffix Match: Returns true if the string ends with the specified suffix.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// EndsWithMethodDemo.java\n// Suffix Match: Returns true if the string ends with the specified suffix."
  },
  {
    "id": 12,
    "question": "What is the time complexity of executing endsWith(String suffix) Method?",
    "shortAnswer": "endsWith(String suffix) Method: Fundamental ICSE rule #2 - Case Sensitivity: Strictly case-sensitive: 'Report.PDF'.endsWith('.pdf') returns false.",
    "explanation": "In the ICSE Class X Computer Applications board exam, endsWith(String suffix) Method is an essential method. The endsWith(String suffix) method tests whether a string ends with the specified suffix. It returns true if the character sequence represented by the argument is a suffix of the character sequence represented by this object. Key syllabus specification: Case Sensitivity: Strictly case-sensitive: 'Report.PDF'.endsWith('.pdf') returns false. Always avoid common pitfall: Overlooking trailing whitespace: 'document.pdf '.endsWith('.pdf') returns false due to trailing space.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Case Sensitivity: Strictly case-sensitive: 'Report.PDF'.endsWith('.pdf') returns false.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// EndsWithMethodDemo.java\n// Case Sensitivity: Strictly case-sensitive: 'Report.PDF'.endsWith('.pdf') returns false."
  },
  {
    "id": 13,
    "question": "How does endsWith(String suffix) Method behave when passed an empty string?",
    "shortAnswer": "endsWith(String suffix) Method: Fundamental ICSE rule #3 - Empty String Rule: Every string ends with empty string '': str.endsWith('') is always true.",
    "explanation": "In the ICSE Class X Computer Applications board exam, endsWith(String suffix) Method is an essential method. The endsWith(String suffix) method tests whether a string ends with the specified suffix. It returns true if the character sequence represented by the argument is a suffix of the character sequence represented by this object. Key syllabus specification: Empty String Rule: Every string ends with empty string '': str.endsWith('') is always true. Always avoid common pitfall: Case mismatch when checking file extensions (e.g. .jpg vs .JPG).",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Empty String Rule: Every string ends with empty string '': str.endsWith('') is always true.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// EndsWithMethodDemo.java\n// Empty String Rule: Every string ends with empty string '': str.endsWith('') is always true."
  },
  {
    "id": 14,
    "question": "How is endsWith(String suffix) Method used in classic ICSE Section B programs (Pig Latin, Palindrome, Search)?",
    "shortAnswer": "endsWith(String suffix) Method: Fundamental ICSE rule #4 - Safe Comparison: Returns false without exception if suffix length is greater than string length.",
    "explanation": "In the ICSE Class X Computer Applications board exam, endsWith(String suffix) Method is an essential method. The endsWith(String suffix) method tests whether a string ends with the specified suffix. It returns true if the character sequence represented by the argument is a suffix of the character sequence represented by this object. Key syllabus specification: Safe Comparison: Returns false without exception if suffix length is greater than string length. Always avoid common pitfall: Passing null resulting in NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Safe Comparison: Returns false without exception if suffix length is greater than string length.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// EndsWithMethodDemo.java\n// Safe Comparison: Returns false without exception if suffix length is greater than string length."
  },
  {
    "id": 15,
    "question": "Does endsWith(String suffix) Method create a new String in Heap memory or String Constant Pool?",
    "shortAnswer": "endsWith(String suffix) Method: Fundamental ICSE rule #5 - ICSE Syllabus Utility: Commonly tested for file extension verification (.java, .txt) and email domain filtering (@gmail.com).",
    "explanation": "In the ICSE Class X Computer Applications board exam, endsWith(String suffix) Method is an essential method. The endsWith(String suffix) method tests whether a string ends with the specified suffix. It returns true if the character sequence represented by the argument is a suffix of the character sequence represented by this object. Key syllabus specification: ICSE Syllabus Utility: Commonly tested for file extension verification (.java, .txt) and email domain filtering (@gmail.com). Always avoid common pitfall: Overlooking trailing whitespace: 'document.pdf '.endsWith('.pdf') returns false due to trailing space.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "ICSE Syllabus Utility: Commonly tested for file extension verification (.java, .txt) and email domain filtering (@gmail.com).",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// EndsWithMethodDemo.java\n// ICSE Syllabus Utility: Commonly tested for file extension verification (.java, .txt) and email domain filtering (@gmail.com)."
  },
  {
    "id": 16,
    "question": "How does endsWith(String suffix) Method treat whitespace, digits, and special symbols?",
    "shortAnswer": "endsWith(String suffix) Method: Fundamental ICSE rule #1 - Suffix Match: Returns true if the string ends with the specified suffix.",
    "explanation": "In the ICSE Class X Computer Applications board exam, endsWith(String suffix) Method is an essential method. The endsWith(String suffix) method tests whether a string ends with the specified suffix. It returns true if the character sequence represented by the argument is a suffix of the character sequence represented by this object. Key syllabus specification: Suffix Match: Returns true if the string ends with the specified suffix. Always avoid common pitfall: Case mismatch when checking file extensions (e.g. .jpg vs .JPG).",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Suffix Match: Returns true if the string ends with the specified suffix.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// EndsWithMethodDemo.java\n// Suffix Match: Returns true if the string ends with the specified suffix."
  },
  {
    "id": 17,
    "question": "What is the difference between static and instance invocation regarding endsWith(String suffix) Method?",
    "shortAnswer": "endsWith(String suffix) Method: Fundamental ICSE rule #2 - Case Sensitivity: Strictly case-sensitive: 'Report.PDF'.endsWith('.pdf') returns false.",
    "explanation": "In the ICSE Class X Computer Applications board exam, endsWith(String suffix) Method is an essential method. The endsWith(String suffix) method tests whether a string ends with the specified suffix. It returns true if the character sequence represented by the argument is a suffix of the character sequence represented by this object. Key syllabus specification: Case Sensitivity: Strictly case-sensitive: 'Report.PDF'.endsWith('.pdf') returns false. Always avoid common pitfall: Passing null resulting in NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Case Sensitivity: Strictly case-sensitive: 'Report.PDF'.endsWith('.pdf') returns false.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// EndsWithMethodDemo.java\n// Case Sensitivity: Strictly case-sensitive: 'Report.PDF'.endsWith('.pdf') returns false."
  },
  {
    "id": 18,
    "question": "How do you write a Variable Description Table (VDT) entry for endsWith(String suffix) Method?",
    "shortAnswer": "endsWith(String suffix) Method: Fundamental ICSE rule #3 - Empty String Rule: Every string ends with empty string '': str.endsWith('') is always true.",
    "explanation": "In the ICSE Class X Computer Applications board exam, endsWith(String suffix) Method is an essential method. The endsWith(String suffix) method tests whether a string ends with the specified suffix. It returns true if the character sequence represented by the argument is a suffix of the character sequence represented by this object. Key syllabus specification: Empty String Rule: Every string ends with empty string '': str.endsWith('') is always true. Always avoid common pitfall: Overlooking trailing whitespace: 'document.pdf '.endsWith('.pdf') returns false due to trailing space.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Empty String Rule: Every string ends with empty string '': str.endsWith('') is always true.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// EndsWithMethodDemo.java\n// Empty String Rule: Every string ends with empty string '': str.endsWith('') is always true."
  },
  {
    "id": 19,
    "question": "How is endsWith(String suffix) Method tested in Section A output prediction questions?",
    "shortAnswer": "endsWith(String suffix) Method: Fundamental ICSE rule #4 - Safe Comparison: Returns false without exception if suffix length is greater than string length.",
    "explanation": "In the ICSE Class X Computer Applications board exam, endsWith(String suffix) Method is an essential method. The endsWith(String suffix) method tests whether a string ends with the specified suffix. It returns true if the character sequence represented by the argument is a suffix of the character sequence represented by this object. Key syllabus specification: Safe Comparison: Returns false without exception if suffix length is greater than string length. Always avoid common pitfall: Case mismatch when checking file extensions (e.g. .jpg vs .JPG).",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Safe Comparison: Returns false without exception if suffix length is greater than string length.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// EndsWithMethodDemo.java\n// Safe Comparison: Returns false without exception if suffix length is greater than string length."
  },
  {
    "id": 20,
    "question": "Can endsWith(String suffix) Method be executed on a StringBuffer or StringBuilder?",
    "shortAnswer": "endsWith(String suffix) Method: Fundamental ICSE rule #5 - ICSE Syllabus Utility: Commonly tested for file extension verification (.java, .txt) and email domain filtering (@gmail.com).",
    "explanation": "In the ICSE Class X Computer Applications board exam, endsWith(String suffix) Method is an essential method. The endsWith(String suffix) method tests whether a string ends with the specified suffix. It returns true if the character sequence represented by the argument is a suffix of the character sequence represented by this object. Key syllabus specification: ICSE Syllabus Utility: Commonly tested for file extension verification (.java, .txt) and email domain filtering (@gmail.com). Always avoid common pitfall: Passing null resulting in NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "ICSE Syllabus Utility: Commonly tested for file extension verification (.java, .txt) and email domain filtering (@gmail.com).",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// EndsWithMethodDemo.java\n// ICSE Syllabus Utility: Commonly tested for file extension verification (.java, .txt) and email domain filtering (@gmail.com)."
  },
  {
    "id": 21,
    "question": "What happens if endsWith(String suffix) Method is called on a string of length 1?",
    "shortAnswer": "endsWith(String suffix) Method: Fundamental ICSE rule #1 - Suffix Match: Returns true if the string ends with the specified suffix.",
    "explanation": "In the ICSE Class X Computer Applications board exam, endsWith(String suffix) Method is an essential method. The endsWith(String suffix) method tests whether a string ends with the specified suffix. It returns true if the character sequence represented by the argument is a suffix of the character sequence represented by this object. Key syllabus specification: Suffix Match: Returns true if the string ends with the specified suffix. Always avoid common pitfall: Overlooking trailing whitespace: 'document.pdf '.endsWith('.pdf') returns false due to trailing space.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Suffix Match: Returns true if the string ends with the specified suffix.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// EndsWithMethodDemo.java\n// Suffix Match: Returns true if the string ends with the specified suffix."
  },
  {
    "id": 22,
    "question": "Why does endsWith(String suffix) Method return primitive values versus object references?",
    "shortAnswer": "endsWith(String suffix) Method: Fundamental ICSE rule #2 - Case Sensitivity: Strictly case-sensitive: 'Report.PDF'.endsWith('.pdf') returns false.",
    "explanation": "In the ICSE Class X Computer Applications board exam, endsWith(String suffix) Method is an essential method. The endsWith(String suffix) method tests whether a string ends with the specified suffix. It returns true if the character sequence represented by the argument is a suffix of the character sequence represented by this object. Key syllabus specification: Case Sensitivity: Strictly case-sensitive: 'Report.PDF'.endsWith('.pdf') returns false. Always avoid common pitfall: Case mismatch when checking file extensions (e.g. .jpg vs .JPG).",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Case Sensitivity: Strictly case-sensitive: 'Report.PDF'.endsWith('.pdf') returns false.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// EndsWithMethodDemo.java\n// Case Sensitivity: Strictly case-sensitive: 'Report.PDF'.endsWith('.pdf') returns false."
  },
  {
    "id": 23,
    "question": "How do you combine endsWith(String suffix) Method with a for loop for string traversal?",
    "shortAnswer": "endsWith(String suffix) Method: Fundamental ICSE rule #3 - Empty String Rule: Every string ends with empty string '': str.endsWith('') is always true.",
    "explanation": "In the ICSE Class X Computer Applications board exam, endsWith(String suffix) Method is an essential method. The endsWith(String suffix) method tests whether a string ends with the specified suffix. It returns true if the character sequence represented by the argument is a suffix of the character sequence represented by this object. Key syllabus specification: Empty String Rule: Every string ends with empty string '': str.endsWith('') is always true. Always avoid common pitfall: Passing null resulting in NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Empty String Rule: Every string ends with empty string '': str.endsWith('') is always true.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// EndsWithMethodDemo.java\n// Empty String Rule: Every string ends with empty string '': str.endsWith('') is always true."
  },
  {
    "id": 24,
    "question": "What happens if you ignore the return value of endsWith(String suffix) Method?",
    "shortAnswer": "endsWith(String suffix) Method: Fundamental ICSE rule #4 - Safe Comparison: Returns false without exception if suffix length is greater than string length.",
    "explanation": "In the ICSE Class X Computer Applications board exam, endsWith(String suffix) Method is an essential method. The endsWith(String suffix) method tests whether a string ends with the specified suffix. It returns true if the character sequence represented by the argument is a suffix of the character sequence represented by this object. Key syllabus specification: Safe Comparison: Returns false without exception if suffix length is greater than string length. Always avoid common pitfall: Overlooking trailing whitespace: 'document.pdf '.endsWith('.pdf') returns false due to trailing space.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Safe Comparison: Returns false without exception if suffix length is greater than string length.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// EndsWithMethodDemo.java\n// Safe Comparison: Returns false without exception if suffix length is greater than string length."
  },
  {
    "id": 25,
    "question": "What master examination advice does Sukanta Hui give for scoring full marks on endsWith(String suffix) Method?",
    "shortAnswer": "endsWith(String suffix) Method: Fundamental ICSE rule #5 - ICSE Syllabus Utility: Commonly tested for file extension verification (.java, .txt) and email domain filtering (@gmail.com).",
    "explanation": "In the ICSE Class X Computer Applications board exam, endsWith(String suffix) Method is an essential method. The endsWith(String suffix) method tests whether a string ends with the specified suffix. It returns true if the character sequence represented by the argument is a suffix of the character sequence represented by this object. Key syllabus specification: ICSE Syllabus Utility: Commonly tested for file extension verification (.java, .txt) and email domain filtering (@gmail.com). Always avoid common pitfall: Case mismatch when checking file extensions (e.g. .jpg vs .JPG).",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "ICSE Syllabus Utility: Commonly tested for file extension verification (.java, .txt) and email domain filtering (@gmail.com).",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 15:\n// EndsWithMethodDemo.java\n// ICSE Syllabus Utility: Commonly tested for file extension verification (.java, .txt) and email domain filtering (@gmail.com)."
  }
];

export default questions;
