const questions = [
  {
    "id": 1,
    "question": "What is the primary function of compareTo(String str) Method in the ICSE syllabus?",
    "shortAnswer": "compareTo(String str) Method: Fundamental ICSE rule #1 - Return Values: Returns 0 if equal, < 0 if this < str, > 0 if this > str.",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareTo(String str) Method is an essential method. The compareTo(String str) method compares two strings lexicographically (based on the Unicode/ASCII values of characters). It returns 0 if strings are equal, a negative integer if the calling string precedes the argument, and a positive integer if it follows. Key syllabus specification: Return Values: Returns 0 if equal, < 0 if this < str, > 0 if this > str. Always avoid common pitfall: Assuming compareTo() returns only -1, 0, or 1; it returns the actual ASCII difference (e.g. 'A'.compareTo('D') is -3).",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Return Values: Returns 0 if equal, < 0 if this < str, > 0 if this > str.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// CompareToMethodDemo.java\n// Return Values: Returns 0 if equal, < 0 if this < str, > 0 if this > str."
  },
  {
    "id": 2,
    "question": "What is the exact return type and signature of compareTo(String str) Method?",
    "shortAnswer": "compareTo(String str) Method: Fundamental ICSE rule #2 - ASCII Calculation: At the first differing character at index k, returns: this.charAt(k) - str.charAt(k).",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareTo(String str) Method is an essential method. The compareTo(String str) method compares two strings lexicographically (based on the Unicode/ASCII values of characters). It returns 0 if strings are equal, a negative integer if the calling string precedes the argument, and a positive integer if it follows. Key syllabus specification: ASCII Calculation: At the first differing character at index k, returns: this.charAt(k) - str.charAt(k). Always avoid common pitfall: Passing null to compareTo() resulting in runtime NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "ASCII Calculation: At the first differing character at index k, returns: this.charAt(k) - str.charAt(k).",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// CompareToMethodDemo.java\n// ASCII Calculation: At the first differing character at index k, returns: this.charAt(k) - str.charAt(k)."
  },
  {
    "id": 3,
    "question": "How does compareTo(String str) Method handle null arguments or null references?",
    "shortAnswer": "compareTo(String str) Method: Fundamental ICSE rule #3 - Prefix Length Rule: If one string is a prefix of another, returns: this.length() - str.length().",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareTo(String str) Method is an essential method. The compareTo(String str) method compares two strings lexicographically (based on the Unicode/ASCII values of characters). It returns 0 if strings are equal, a negative integer if the calling string precedes the argument, and a positive integer if it follows. Key syllabus specification: Prefix Length Rule: If one string is a prefix of another, returns: this.length() - str.length(). Always avoid common pitfall: Misinterpreting the return sign when sorting arrays in ascending vs descending order.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Prefix Length Rule: If one string is a prefix of another, returns: this.length() - str.length().",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// CompareToMethodDemo.java\n// Prefix Length Rule: If one string is a prefix of another, returns: this.length() - str.length()."
  },
  {
    "id": 4,
    "question": "Which common ICSE board examination error occurs with compareTo(String str) Method?",
    "shortAnswer": "compareTo(String str) Method: Fundamental ICSE rule #4 - Case Sensitivity: Uppercase letters have smaller ASCII values than lowercase ('A' is 65, 'a' is 97).",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareTo(String str) Method is an essential method. The compareTo(String str) method compares two strings lexicographically (based on the Unicode/ASCII values of characters). It returns 0 if strings are equal, a negative integer if the calling string precedes the argument, and a positive integer if it follows. Key syllabus specification: Case Sensitivity: Uppercase letters have smaller ASCII values than lowercase ('A' is 65, 'a' is 97). Always avoid common pitfall: Assuming compareTo() returns only -1, 0, or 1; it returns the actual ASCII difference (e.g. 'A'.compareTo('D') is -3).",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Case Sensitivity: Uppercase letters have smaller ASCII values than lowercase ('A' is 65, 'a' is 97).",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// CompareToMethodDemo.java\n// Case Sensitivity: Uppercase letters have smaller ASCII values than lowercase ('A' is 65, 'a' is 97)."
  },
  {
    "id": 5,
    "question": "How does compareTo(String str) Method interact with Java's String immutability rule?",
    "shortAnswer": "compareTo(String str) Method: Fundamental ICSE rule #5 - Sorting Foundation: The mandatory comparison operator used in Bubble sort and Selection sort on String arrays.",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareTo(String str) Method is an essential method. The compareTo(String str) method compares two strings lexicographically (based on the Unicode/ASCII values of characters). It returns 0 if strings are equal, a negative integer if the calling string precedes the argument, and a positive integer if it follows. Key syllabus specification: Sorting Foundation: The mandatory comparison operator used in Bubble sort and Selection sort on String arrays. Always avoid common pitfall: Passing null to compareTo() resulting in runtime NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Sorting Foundation: The mandatory comparison operator used in Bubble sort and Selection sort on String arrays.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// CompareToMethodDemo.java\n// Sorting Foundation: The mandatory comparison operator used in Bubble sort and Selection sort on String arrays."
  },
  {
    "id": 6,
    "question": "Is compareTo(String str) Method case-sensitive or case-insensitive?",
    "shortAnswer": "compareTo(String str) Method: Fundamental ICSE rule #1 - Return Values: Returns 0 if equal, < 0 if this < str, > 0 if this > str.",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareTo(String str) Method is an essential method. The compareTo(String str) method compares two strings lexicographically (based on the Unicode/ASCII values of characters). It returns 0 if strings are equal, a negative integer if the calling string precedes the argument, and a positive integer if it follows. Key syllabus specification: Return Values: Returns 0 if equal, < 0 if this < str, > 0 if this > str. Always avoid common pitfall: Misinterpreting the return sign when sorting arrays in ascending vs descending order.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Return Values: Returns 0 if equal, < 0 if this < str, > 0 if this > str.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// CompareToMethodDemo.java\n// Return Values: Returns 0 if equal, < 0 if this < str, > 0 if this > str."
  },
  {
    "id": 7,
    "question": "What happens if index or boundary conditions are violated in compareTo(String str) Method?",
    "shortAnswer": "compareTo(String str) Method: Fundamental ICSE rule #2 - ASCII Calculation: At the first differing character at index k, returns: this.charAt(k) - str.charAt(k).",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareTo(String str) Method is an essential method. The compareTo(String str) method compares two strings lexicographically (based on the Unicode/ASCII values of characters). It returns 0 if strings are equal, a negative integer if the calling string precedes the argument, and a positive integer if it follows. Key syllabus specification: ASCII Calculation: At the first differing character at index k, returns: this.charAt(k) - str.charAt(k). Always avoid common pitfall: Assuming compareTo() returns only -1, 0, or 1; it returns the actual ASCII difference (e.g. 'A'.compareTo('D') is -3).",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "ASCII Calculation: At the first differing character at index k, returns: this.charAt(k) - str.charAt(k).",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// CompareToMethodDemo.java\n// ASCII Calculation: At the first differing character at index k, returns: this.charAt(k) - str.charAt(k)."
  },
  {
    "id": 8,
    "question": "How does compareTo(String str) Method differ from its counterpart or alternative operators?",
    "shortAnswer": "compareTo(String str) Method: Fundamental ICSE rule #3 - Prefix Length Rule: If one string is a prefix of another, returns: this.length() - str.length().",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareTo(String str) Method is an essential method. The compareTo(String str) method compares two strings lexicographically (based on the Unicode/ASCII values of characters). It returns 0 if strings are equal, a negative integer if the calling string precedes the argument, and a positive integer if it follows. Key syllabus specification: Prefix Length Rule: If one string is a prefix of another, returns: this.length() - str.length(). Always avoid common pitfall: Passing null to compareTo() resulting in runtime NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Prefix Length Rule: If one string is a prefix of another, returns: this.length() - str.length().",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// CompareToMethodDemo.java\n// Prefix Length Rule: If one string is a prefix of another, returns: this.length() - str.length()."
  },
  {
    "id": 9,
    "question": "What runtime exception can be thrown by compareTo(String str) Method?",
    "shortAnswer": "compareTo(String str) Method: Fundamental ICSE rule #4 - Case Sensitivity: Uppercase letters have smaller ASCII values than lowercase ('A' is 65, 'a' is 97).",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareTo(String str) Method is an essential method. The compareTo(String str) method compares two strings lexicographically (based on the Unicode/ASCII values of characters). It returns 0 if strings are equal, a negative integer if the calling string precedes the argument, and a positive integer if it follows. Key syllabus specification: Case Sensitivity: Uppercase letters have smaller ASCII values than lowercase ('A' is 65, 'a' is 97). Always avoid common pitfall: Misinterpreting the return sign when sorting arrays in ascending vs descending order.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Case Sensitivity: Uppercase letters have smaller ASCII values than lowercase ('A' is 65, 'a' is 97).",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// CompareToMethodDemo.java\n// Case Sensitivity: Uppercase letters have smaller ASCII values than lowercase ('A' is 65, 'a' is 97)."
  },
  {
    "id": 10,
    "question": "Can compareTo(String str) Method be called repeatedly in method chaining?",
    "shortAnswer": "compareTo(String str) Method: Fundamental ICSE rule #5 - Sorting Foundation: The mandatory comparison operator used in Bubble sort and Selection sort on String arrays.",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareTo(String str) Method is an essential method. The compareTo(String str) method compares two strings lexicographically (based on the Unicode/ASCII values of characters). It returns 0 if strings are equal, a negative integer if the calling string precedes the argument, and a positive integer if it follows. Key syllabus specification: Sorting Foundation: The mandatory comparison operator used in Bubble sort and Selection sort on String arrays. Always avoid common pitfall: Assuming compareTo() returns only -1, 0, or 1; it returns the actual ASCII difference (e.g. 'A'.compareTo('D') is -3).",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Sorting Foundation: The mandatory comparison operator used in Bubble sort and Selection sort on String arrays.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// CompareToMethodDemo.java\n// Sorting Foundation: The mandatory comparison operator used in Bubble sort and Selection sort on String arrays."
  },
  {
    "id": 11,
    "question": "How does BlueJ visualize the return value of compareTo(String str) Method?",
    "shortAnswer": "compareTo(String str) Method: Fundamental ICSE rule #1 - Return Values: Returns 0 if equal, < 0 if this < str, > 0 if this > str.",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareTo(String str) Method is an essential method. The compareTo(String str) method compares two strings lexicographically (based on the Unicode/ASCII values of characters). It returns 0 if strings are equal, a negative integer if the calling string precedes the argument, and a positive integer if it follows. Key syllabus specification: Return Values: Returns 0 if equal, < 0 if this < str, > 0 if this > str. Always avoid common pitfall: Passing null to compareTo() resulting in runtime NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Return Values: Returns 0 if equal, < 0 if this < str, > 0 if this > str.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// CompareToMethodDemo.java\n// Return Values: Returns 0 if equal, < 0 if this < str, > 0 if this > str."
  },
  {
    "id": 12,
    "question": "What is the time complexity of executing compareTo(String str) Method?",
    "shortAnswer": "compareTo(String str) Method: Fundamental ICSE rule #2 - ASCII Calculation: At the first differing character at index k, returns: this.charAt(k) - str.charAt(k).",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareTo(String str) Method is an essential method. The compareTo(String str) method compares two strings lexicographically (based on the Unicode/ASCII values of characters). It returns 0 if strings are equal, a negative integer if the calling string precedes the argument, and a positive integer if it follows. Key syllabus specification: ASCII Calculation: At the first differing character at index k, returns: this.charAt(k) - str.charAt(k). Always avoid common pitfall: Misinterpreting the return sign when sorting arrays in ascending vs descending order.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "ASCII Calculation: At the first differing character at index k, returns: this.charAt(k) - str.charAt(k).",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// CompareToMethodDemo.java\n// ASCII Calculation: At the first differing character at index k, returns: this.charAt(k) - str.charAt(k)."
  },
  {
    "id": 13,
    "question": "How does compareTo(String str) Method behave when passed an empty string?",
    "shortAnswer": "compareTo(String str) Method: Fundamental ICSE rule #3 - Prefix Length Rule: If one string is a prefix of another, returns: this.length() - str.length().",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareTo(String str) Method is an essential method. The compareTo(String str) method compares two strings lexicographically (based on the Unicode/ASCII values of characters). It returns 0 if strings are equal, a negative integer if the calling string precedes the argument, and a positive integer if it follows. Key syllabus specification: Prefix Length Rule: If one string is a prefix of another, returns: this.length() - str.length(). Always avoid common pitfall: Assuming compareTo() returns only -1, 0, or 1; it returns the actual ASCII difference (e.g. 'A'.compareTo('D') is -3).",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Prefix Length Rule: If one string is a prefix of another, returns: this.length() - str.length().",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// CompareToMethodDemo.java\n// Prefix Length Rule: If one string is a prefix of another, returns: this.length() - str.length()."
  },
  {
    "id": 14,
    "question": "How is compareTo(String str) Method used in classic ICSE Section B programs (Pig Latin, Palindrome, Search)?",
    "shortAnswer": "compareTo(String str) Method: Fundamental ICSE rule #4 - Case Sensitivity: Uppercase letters have smaller ASCII values than lowercase ('A' is 65, 'a' is 97).",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareTo(String str) Method is an essential method. The compareTo(String str) method compares two strings lexicographically (based on the Unicode/ASCII values of characters). It returns 0 if strings are equal, a negative integer if the calling string precedes the argument, and a positive integer if it follows. Key syllabus specification: Case Sensitivity: Uppercase letters have smaller ASCII values than lowercase ('A' is 65, 'a' is 97). Always avoid common pitfall: Passing null to compareTo() resulting in runtime NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Case Sensitivity: Uppercase letters have smaller ASCII values than lowercase ('A' is 65, 'a' is 97).",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// CompareToMethodDemo.java\n// Case Sensitivity: Uppercase letters have smaller ASCII values than lowercase ('A' is 65, 'a' is 97)."
  },
  {
    "id": 15,
    "question": "Does compareTo(String str) Method create a new String in Heap memory or String Constant Pool?",
    "shortAnswer": "compareTo(String str) Method: Fundamental ICSE rule #5 - Sorting Foundation: The mandatory comparison operator used in Bubble sort and Selection sort on String arrays.",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareTo(String str) Method is an essential method. The compareTo(String str) method compares two strings lexicographically (based on the Unicode/ASCII values of characters). It returns 0 if strings are equal, a negative integer if the calling string precedes the argument, and a positive integer if it follows. Key syllabus specification: Sorting Foundation: The mandatory comparison operator used in Bubble sort and Selection sort on String arrays. Always avoid common pitfall: Misinterpreting the return sign when sorting arrays in ascending vs descending order.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Sorting Foundation: The mandatory comparison operator used in Bubble sort and Selection sort on String arrays.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// CompareToMethodDemo.java\n// Sorting Foundation: The mandatory comparison operator used in Bubble sort and Selection sort on String arrays."
  },
  {
    "id": 16,
    "question": "How does compareTo(String str) Method treat whitespace, digits, and special symbols?",
    "shortAnswer": "compareTo(String str) Method: Fundamental ICSE rule #1 - Return Values: Returns 0 if equal, < 0 if this < str, > 0 if this > str.",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareTo(String str) Method is an essential method. The compareTo(String str) method compares two strings lexicographically (based on the Unicode/ASCII values of characters). It returns 0 if strings are equal, a negative integer if the calling string precedes the argument, and a positive integer if it follows. Key syllabus specification: Return Values: Returns 0 if equal, < 0 if this < str, > 0 if this > str. Always avoid common pitfall: Assuming compareTo() returns only -1, 0, or 1; it returns the actual ASCII difference (e.g. 'A'.compareTo('D') is -3).",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Return Values: Returns 0 if equal, < 0 if this < str, > 0 if this > str.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// CompareToMethodDemo.java\n// Return Values: Returns 0 if equal, < 0 if this < str, > 0 if this > str."
  },
  {
    "id": 17,
    "question": "What is the difference between static and instance invocation regarding compareTo(String str) Method?",
    "shortAnswer": "compareTo(String str) Method: Fundamental ICSE rule #2 - ASCII Calculation: At the first differing character at index k, returns: this.charAt(k) - str.charAt(k).",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareTo(String str) Method is an essential method. The compareTo(String str) method compares two strings lexicographically (based on the Unicode/ASCII values of characters). It returns 0 if strings are equal, a negative integer if the calling string precedes the argument, and a positive integer if it follows. Key syllabus specification: ASCII Calculation: At the first differing character at index k, returns: this.charAt(k) - str.charAt(k). Always avoid common pitfall: Passing null to compareTo() resulting in runtime NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "ASCII Calculation: At the first differing character at index k, returns: this.charAt(k) - str.charAt(k).",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// CompareToMethodDemo.java\n// ASCII Calculation: At the first differing character at index k, returns: this.charAt(k) - str.charAt(k)."
  },
  {
    "id": 18,
    "question": "How do you write a Variable Description Table (VDT) entry for compareTo(String str) Method?",
    "shortAnswer": "compareTo(String str) Method: Fundamental ICSE rule #3 - Prefix Length Rule: If one string is a prefix of another, returns: this.length() - str.length().",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareTo(String str) Method is an essential method. The compareTo(String str) method compares two strings lexicographically (based on the Unicode/ASCII values of characters). It returns 0 if strings are equal, a negative integer if the calling string precedes the argument, and a positive integer if it follows. Key syllabus specification: Prefix Length Rule: If one string is a prefix of another, returns: this.length() - str.length(). Always avoid common pitfall: Misinterpreting the return sign when sorting arrays in ascending vs descending order.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Prefix Length Rule: If one string is a prefix of another, returns: this.length() - str.length().",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// CompareToMethodDemo.java\n// Prefix Length Rule: If one string is a prefix of another, returns: this.length() - str.length()."
  },
  {
    "id": 19,
    "question": "How is compareTo(String str) Method tested in Section A output prediction questions?",
    "shortAnswer": "compareTo(String str) Method: Fundamental ICSE rule #4 - Case Sensitivity: Uppercase letters have smaller ASCII values than lowercase ('A' is 65, 'a' is 97).",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareTo(String str) Method is an essential method. The compareTo(String str) method compares two strings lexicographically (based on the Unicode/ASCII values of characters). It returns 0 if strings are equal, a negative integer if the calling string precedes the argument, and a positive integer if it follows. Key syllabus specification: Case Sensitivity: Uppercase letters have smaller ASCII values than lowercase ('A' is 65, 'a' is 97). Always avoid common pitfall: Assuming compareTo() returns only -1, 0, or 1; it returns the actual ASCII difference (e.g. 'A'.compareTo('D') is -3).",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Case Sensitivity: Uppercase letters have smaller ASCII values than lowercase ('A' is 65, 'a' is 97).",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// CompareToMethodDemo.java\n// Case Sensitivity: Uppercase letters have smaller ASCII values than lowercase ('A' is 65, 'a' is 97)."
  },
  {
    "id": 20,
    "question": "Can compareTo(String str) Method be executed on a StringBuffer or StringBuilder?",
    "shortAnswer": "compareTo(String str) Method: Fundamental ICSE rule #5 - Sorting Foundation: The mandatory comparison operator used in Bubble sort and Selection sort on String arrays.",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareTo(String str) Method is an essential method. The compareTo(String str) method compares two strings lexicographically (based on the Unicode/ASCII values of characters). It returns 0 if strings are equal, a negative integer if the calling string precedes the argument, and a positive integer if it follows. Key syllabus specification: Sorting Foundation: The mandatory comparison operator used in Bubble sort and Selection sort on String arrays. Always avoid common pitfall: Passing null to compareTo() resulting in runtime NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Sorting Foundation: The mandatory comparison operator used in Bubble sort and Selection sort on String arrays.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// CompareToMethodDemo.java\n// Sorting Foundation: The mandatory comparison operator used in Bubble sort and Selection sort on String arrays."
  },
  {
    "id": 21,
    "question": "What happens if compareTo(String str) Method is called on a string of length 1?",
    "shortAnswer": "compareTo(String str) Method: Fundamental ICSE rule #1 - Return Values: Returns 0 if equal, < 0 if this < str, > 0 if this > str.",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareTo(String str) Method is an essential method. The compareTo(String str) method compares two strings lexicographically (based on the Unicode/ASCII values of characters). It returns 0 if strings are equal, a negative integer if the calling string precedes the argument, and a positive integer if it follows. Key syllabus specification: Return Values: Returns 0 if equal, < 0 if this < str, > 0 if this > str. Always avoid common pitfall: Misinterpreting the return sign when sorting arrays in ascending vs descending order.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Return Values: Returns 0 if equal, < 0 if this < str, > 0 if this > str.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// CompareToMethodDemo.java\n// Return Values: Returns 0 if equal, < 0 if this < str, > 0 if this > str."
  },
  {
    "id": 22,
    "question": "Why does compareTo(String str) Method return primitive values versus object references?",
    "shortAnswer": "compareTo(String str) Method: Fundamental ICSE rule #2 - ASCII Calculation: At the first differing character at index k, returns: this.charAt(k) - str.charAt(k).",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareTo(String str) Method is an essential method. The compareTo(String str) method compares two strings lexicographically (based on the Unicode/ASCII values of characters). It returns 0 if strings are equal, a negative integer if the calling string precedes the argument, and a positive integer if it follows. Key syllabus specification: ASCII Calculation: At the first differing character at index k, returns: this.charAt(k) - str.charAt(k). Always avoid common pitfall: Assuming compareTo() returns only -1, 0, or 1; it returns the actual ASCII difference (e.g. 'A'.compareTo('D') is -3).",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "ASCII Calculation: At the first differing character at index k, returns: this.charAt(k) - str.charAt(k).",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// CompareToMethodDemo.java\n// ASCII Calculation: At the first differing character at index k, returns: this.charAt(k) - str.charAt(k)."
  },
  {
    "id": 23,
    "question": "How do you combine compareTo(String str) Method with a for loop for string traversal?",
    "shortAnswer": "compareTo(String str) Method: Fundamental ICSE rule #3 - Prefix Length Rule: If one string is a prefix of another, returns: this.length() - str.length().",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareTo(String str) Method is an essential method. The compareTo(String str) method compares two strings lexicographically (based on the Unicode/ASCII values of characters). It returns 0 if strings are equal, a negative integer if the calling string precedes the argument, and a positive integer if it follows. Key syllabus specification: Prefix Length Rule: If one string is a prefix of another, returns: this.length() - str.length(). Always avoid common pitfall: Passing null to compareTo() resulting in runtime NullPointerException.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Prefix Length Rule: If one string is a prefix of another, returns: this.length() - str.length().",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// CompareToMethodDemo.java\n// Prefix Length Rule: If one string is a prefix of another, returns: this.length() - str.length()."
  },
  {
    "id": 24,
    "question": "What happens if you ignore the return value of compareTo(String str) Method?",
    "shortAnswer": "compareTo(String str) Method: Fundamental ICSE rule #4 - Case Sensitivity: Uppercase letters have smaller ASCII values than lowercase ('A' is 65, 'a' is 97).",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareTo(String str) Method is an essential method. The compareTo(String str) method compares two strings lexicographically (based on the Unicode/ASCII values of characters). It returns 0 if strings are equal, a negative integer if the calling string precedes the argument, and a positive integer if it follows. Key syllabus specification: Case Sensitivity: Uppercase letters have smaller ASCII values than lowercase ('A' is 65, 'a' is 97). Always avoid common pitfall: Misinterpreting the return sign when sorting arrays in ascending vs descending order.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Case Sensitivity: Uppercase letters have smaller ASCII values than lowercase ('A' is 65, 'a' is 97).",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// CompareToMethodDemo.java\n// Case Sensitivity: Uppercase letters have smaller ASCII values than lowercase ('A' is 65, 'a' is 97)."
  },
  {
    "id": 25,
    "question": "What master examination advice does Sukanta Hui give for scoring full marks on compareTo(String str) Method?",
    "shortAnswer": "compareTo(String str) Method: Fundamental ICSE rule #5 - Sorting Foundation: The mandatory comparison operator used in Bubble sort and Selection sort on String arrays.",
    "explanation": "In the ICSE Class X Computer Applications board exam, compareTo(String str) Method is an essential method. The compareTo(String str) method compares two strings lexicographically (based on the Unicode/ASCII values of characters). It returns 0 if strings are equal, a negative integer if the calling string precedes the argument, and a positive integer if it follows. Key syllabus specification: Sorting Foundation: The mandatory comparison operator used in Bubble sort and Selection sort on String arrays. Always avoid common pitfall: Assuming compareTo() returns only -1, 0, or 1; it returns the actual ASCII difference (e.g. 'A'.compareTo('D') is -3).",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Sorting Foundation: The mandatory comparison operator used in Bubble sort and Selection sort on String arrays.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 10:\n// CompareToMethodDemo.java\n// Sorting Foundation: The mandatory comparison operator used in Bubble sort and Selection sort on String arrays."
  }
];

export default questions;
