const questions = [
  {
    "id": 1,
    "question": "What is the primary function of substring(int beginIndex [, int endIndex]) Method in the ICSE syllabus?",
    "shortAnswer": "substring(int beginIndex [, int endIndex]) Method: Fundamental ICSE rule #1 - Single Parameter: str.substring(beginIndex) extracts from beginIndex to length().",
    "explanation": "In the ICSE Class X Computer Applications board exam, substring(int beginIndex [, int endIndex]) Method is an essential method. The substring() method extracts a sub-sequence of characters from a string. In its single-argument form, it extracts from beginIndex to the end. In its dual-argument form, it extracts from beginIndex inclusive up to endIndex EXCLUSIVE. Key syllabus specification: Single Parameter: str.substring(beginIndex) extracts from beginIndex to length(). Always avoid common pitfall: Off-by-one error: Forgetting that endIndex is EXCLUSIVE, missing the final desired character.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Single Parameter: str.substring(beginIndex) extracts from beginIndex to length().",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SubstringMethodDemo.java\n// Single Parameter: str.substring(beginIndex) extracts from beginIndex to length()."
  },
  {
    "id": 2,
    "question": "What is the exact return type and signature of substring(int beginIndex [, int endIndex]) Method?",
    "shortAnswer": "substring(int beginIndex [, int endIndex]) Method: Fundamental ICSE rule #2 - Dual Parameter: str.substring(beginIndex, endIndex) extracts from beginIndex up to endIndex - 1.",
    "explanation": "In the ICSE Class X Computer Applications board exam, substring(int beginIndex [, int endIndex]) Method is an essential method. The substring() method extracts a sub-sequence of characters from a string. In its single-argument form, it extracts from beginIndex to the end. In its dual-argument form, it extracts from beginIndex inclusive up to endIndex EXCLUSIVE. Key syllabus specification: Dual Parameter: str.substring(beginIndex, endIndex) extracts from beginIndex up to endIndex - 1. Always avoid common pitfall: StringIndexOutOfBoundsException when beginIndex < 0 or endIndex > length().",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Dual Parameter: str.substring(beginIndex, endIndex) extracts from beginIndex up to endIndex - 1.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SubstringMethodDemo.java\n// Dual Parameter: str.substring(beginIndex, endIndex) extracts from beginIndex up to endIndex - 1."
  },
  {
    "id": 3,
    "question": "How does substring(int beginIndex [, int endIndex]) Method handle null arguments or null references?",
    "shortAnswer": "substring(int beginIndex [, int endIndex]) Method: Fundamental ICSE rule #3 - Length Formula: The number of extracted characters is exactly: (endIndex - beginIndex).",
    "explanation": "In the ICSE Class X Computer Applications board exam, substring(int beginIndex [, int endIndex]) Method is an essential method. The substring() method extracts a sub-sequence of characters from a string. In its single-argument form, it extracts from beginIndex to the end. In its dual-argument form, it extracts from beginIndex inclusive up to endIndex EXCLUSIVE. Key syllabus specification: Length Formula: The number of extracted characters is exactly: (endIndex - beginIndex). Always avoid common pitfall: IllegalArgumentException / Index error when beginIndex > endIndex.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Length Formula: The number of extracted characters is exactly: (endIndex - beginIndex).",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SubstringMethodDemo.java\n// Length Formula: The number of extracted characters is exactly: (endIndex - beginIndex)."
  },
  {
    "id": 4,
    "question": "Which common ICSE board examination error occurs with substring(int beginIndex [, int endIndex]) Method?",
    "shortAnswer": "substring(int beginIndex [, int endIndex]) Method: Fundamental ICSE rule #4 - Bound Rules: 0 <= beginIndex <= endIndex <= str.length().",
    "explanation": "In the ICSE Class X Computer Applications board exam, substring(int beginIndex [, int endIndex]) Method is an essential method. The substring() method extracts a sub-sequence of characters from a string. In its single-argument form, it extracts from beginIndex to the end. In its dual-argument form, it extracts from beginIndex inclusive up to endIndex EXCLUSIVE. Key syllabus specification: Bound Rules: 0 <= beginIndex <= endIndex <= str.length(). Always avoid common pitfall: Off-by-one error: Forgetting that endIndex is EXCLUSIVE, missing the final desired character.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Bound Rules: 0 <= beginIndex <= endIndex <= str.length().",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SubstringMethodDemo.java\n// Bound Rules: 0 <= beginIndex <= endIndex <= str.length()."
  },
  {
    "id": 5,
    "question": "How does substring(int beginIndex [, int endIndex]) Method interact with Java's String immutability rule?",
    "shortAnswer": "substring(int beginIndex [, int endIndex]) Method: Fundamental ICSE rule #5 - ICSE Syllabus Pillar: The primary method used in Pig Latin, palindrome extraction, word extraction, and string slicing.",
    "explanation": "In the ICSE Class X Computer Applications board exam, substring(int beginIndex [, int endIndex]) Method is an essential method. The substring() method extracts a sub-sequence of characters from a string. In its single-argument form, it extracts from beginIndex to the end. In its dual-argument form, it extracts from beginIndex inclusive up to endIndex EXCLUSIVE. Key syllabus specification: ICSE Syllabus Pillar: The primary method used in Pig Latin, palindrome extraction, word extraction, and string slicing. Always avoid common pitfall: StringIndexOutOfBoundsException when beginIndex < 0 or endIndex > length().",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "ICSE Syllabus Pillar: The primary method used in Pig Latin, palindrome extraction, word extraction, and string slicing.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SubstringMethodDemo.java\n// ICSE Syllabus Pillar: The primary method used in Pig Latin, palindrome extraction, word extraction, and string slicing."
  },
  {
    "id": 6,
    "question": "Is substring(int beginIndex [, int endIndex]) Method case-sensitive or case-insensitive?",
    "shortAnswer": "substring(int beginIndex [, int endIndex]) Method: Fundamental ICSE rule #1 - Single Parameter: str.substring(beginIndex) extracts from beginIndex to length().",
    "explanation": "In the ICSE Class X Computer Applications board exam, substring(int beginIndex [, int endIndex]) Method is an essential method. The substring() method extracts a sub-sequence of characters from a string. In its single-argument form, it extracts from beginIndex to the end. In its dual-argument form, it extracts from beginIndex inclusive up to endIndex EXCLUSIVE. Key syllabus specification: Single Parameter: str.substring(beginIndex) extracts from beginIndex to length(). Always avoid common pitfall: IllegalArgumentException / Index error when beginIndex > endIndex.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Single Parameter: str.substring(beginIndex) extracts from beginIndex to length().",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SubstringMethodDemo.java\n// Single Parameter: str.substring(beginIndex) extracts from beginIndex to length()."
  },
  {
    "id": 7,
    "question": "What happens if index or boundary conditions are violated in substring(int beginIndex [, int endIndex]) Method?",
    "shortAnswer": "substring(int beginIndex [, int endIndex]) Method: Fundamental ICSE rule #2 - Dual Parameter: str.substring(beginIndex, endIndex) extracts from beginIndex up to endIndex - 1.",
    "explanation": "In the ICSE Class X Computer Applications board exam, substring(int beginIndex [, int endIndex]) Method is an essential method. The substring() method extracts a sub-sequence of characters from a string. In its single-argument form, it extracts from beginIndex to the end. In its dual-argument form, it extracts from beginIndex inclusive up to endIndex EXCLUSIVE. Key syllabus specification: Dual Parameter: str.substring(beginIndex, endIndex) extracts from beginIndex up to endIndex - 1. Always avoid common pitfall: Off-by-one error: Forgetting that endIndex is EXCLUSIVE, missing the final desired character.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Dual Parameter: str.substring(beginIndex, endIndex) extracts from beginIndex up to endIndex - 1.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SubstringMethodDemo.java\n// Dual Parameter: str.substring(beginIndex, endIndex) extracts from beginIndex up to endIndex - 1."
  },
  {
    "id": 8,
    "question": "How does substring(int beginIndex [, int endIndex]) Method differ from its counterpart or alternative operators?",
    "shortAnswer": "substring(int beginIndex [, int endIndex]) Method: Fundamental ICSE rule #3 - Length Formula: The number of extracted characters is exactly: (endIndex - beginIndex).",
    "explanation": "In the ICSE Class X Computer Applications board exam, substring(int beginIndex [, int endIndex]) Method is an essential method. The substring() method extracts a sub-sequence of characters from a string. In its single-argument form, it extracts from beginIndex to the end. In its dual-argument form, it extracts from beginIndex inclusive up to endIndex EXCLUSIVE. Key syllabus specification: Length Formula: The number of extracted characters is exactly: (endIndex - beginIndex). Always avoid common pitfall: StringIndexOutOfBoundsException when beginIndex < 0 or endIndex > length().",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "basic",
    "options": [
      "Length Formula: The number of extracted characters is exactly: (endIndex - beginIndex).",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SubstringMethodDemo.java\n// Length Formula: The number of extracted characters is exactly: (endIndex - beginIndex)."
  },
  {
    "id": 9,
    "question": "What runtime exception can be thrown by substring(int beginIndex [, int endIndex]) Method?",
    "shortAnswer": "substring(int beginIndex [, int endIndex]) Method: Fundamental ICSE rule #4 - Bound Rules: 0 <= beginIndex <= endIndex <= str.length().",
    "explanation": "In the ICSE Class X Computer Applications board exam, substring(int beginIndex [, int endIndex]) Method is an essential method. The substring() method extracts a sub-sequence of characters from a string. In its single-argument form, it extracts from beginIndex to the end. In its dual-argument form, it extracts from beginIndex inclusive up to endIndex EXCLUSIVE. Key syllabus specification: Bound Rules: 0 <= beginIndex <= endIndex <= str.length(). Always avoid common pitfall: IllegalArgumentException / Index error when beginIndex > endIndex.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Bound Rules: 0 <= beginIndex <= endIndex <= str.length().",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SubstringMethodDemo.java\n// Bound Rules: 0 <= beginIndex <= endIndex <= str.length()."
  },
  {
    "id": 10,
    "question": "Can substring(int beginIndex [, int endIndex]) Method be called repeatedly in method chaining?",
    "shortAnswer": "substring(int beginIndex [, int endIndex]) Method: Fundamental ICSE rule #5 - ICSE Syllabus Pillar: The primary method used in Pig Latin, palindrome extraction, word extraction, and string slicing.",
    "explanation": "In the ICSE Class X Computer Applications board exam, substring(int beginIndex [, int endIndex]) Method is an essential method. The substring() method extracts a sub-sequence of characters from a string. In its single-argument form, it extracts from beginIndex to the end. In its dual-argument form, it extracts from beginIndex inclusive up to endIndex EXCLUSIVE. Key syllabus specification: ICSE Syllabus Pillar: The primary method used in Pig Latin, palindrome extraction, word extraction, and string slicing. Always avoid common pitfall: Off-by-one error: Forgetting that endIndex is EXCLUSIVE, missing the final desired character.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "ICSE Syllabus Pillar: The primary method used in Pig Latin, palindrome extraction, word extraction, and string slicing.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SubstringMethodDemo.java\n// ICSE Syllabus Pillar: The primary method used in Pig Latin, palindrome extraction, word extraction, and string slicing."
  },
  {
    "id": 11,
    "question": "How does BlueJ visualize the return value of substring(int beginIndex [, int endIndex]) Method?",
    "shortAnswer": "substring(int beginIndex [, int endIndex]) Method: Fundamental ICSE rule #1 - Single Parameter: str.substring(beginIndex) extracts from beginIndex to length().",
    "explanation": "In the ICSE Class X Computer Applications board exam, substring(int beginIndex [, int endIndex]) Method is an essential method. The substring() method extracts a sub-sequence of characters from a string. In its single-argument form, it extracts from beginIndex to the end. In its dual-argument form, it extracts from beginIndex inclusive up to endIndex EXCLUSIVE. Key syllabus specification: Single Parameter: str.substring(beginIndex) extracts from beginIndex to length(). Always avoid common pitfall: StringIndexOutOfBoundsException when beginIndex < 0 or endIndex > length().",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Single Parameter: str.substring(beginIndex) extracts from beginIndex to length().",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SubstringMethodDemo.java\n// Single Parameter: str.substring(beginIndex) extracts from beginIndex to length()."
  },
  {
    "id": 12,
    "question": "What is the time complexity of executing substring(int beginIndex [, int endIndex]) Method?",
    "shortAnswer": "substring(int beginIndex [, int endIndex]) Method: Fundamental ICSE rule #2 - Dual Parameter: str.substring(beginIndex, endIndex) extracts from beginIndex up to endIndex - 1.",
    "explanation": "In the ICSE Class X Computer Applications board exam, substring(int beginIndex [, int endIndex]) Method is an essential method. The substring() method extracts a sub-sequence of characters from a string. In its single-argument form, it extracts from beginIndex to the end. In its dual-argument form, it extracts from beginIndex inclusive up to endIndex EXCLUSIVE. Key syllabus specification: Dual Parameter: str.substring(beginIndex, endIndex) extracts from beginIndex up to endIndex - 1. Always avoid common pitfall: IllegalArgumentException / Index error when beginIndex > endIndex.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Dual Parameter: str.substring(beginIndex, endIndex) extracts from beginIndex up to endIndex - 1.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SubstringMethodDemo.java\n// Dual Parameter: str.substring(beginIndex, endIndex) extracts from beginIndex up to endIndex - 1."
  },
  {
    "id": 13,
    "question": "How does substring(int beginIndex [, int endIndex]) Method behave when passed an empty string?",
    "shortAnswer": "substring(int beginIndex [, int endIndex]) Method: Fundamental ICSE rule #3 - Length Formula: The number of extracted characters is exactly: (endIndex - beginIndex).",
    "explanation": "In the ICSE Class X Computer Applications board exam, substring(int beginIndex [, int endIndex]) Method is an essential method. The substring() method extracts a sub-sequence of characters from a string. In its single-argument form, it extracts from beginIndex to the end. In its dual-argument form, it extracts from beginIndex inclusive up to endIndex EXCLUSIVE. Key syllabus specification: Length Formula: The number of extracted characters is exactly: (endIndex - beginIndex). Always avoid common pitfall: Off-by-one error: Forgetting that endIndex is EXCLUSIVE, missing the final desired character.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Length Formula: The number of extracted characters is exactly: (endIndex - beginIndex).",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SubstringMethodDemo.java\n// Length Formula: The number of extracted characters is exactly: (endIndex - beginIndex)."
  },
  {
    "id": 14,
    "question": "How is substring(int beginIndex [, int endIndex]) Method used in classic ICSE Section B programs (Pig Latin, Palindrome, Search)?",
    "shortAnswer": "substring(int beginIndex [, int endIndex]) Method: Fundamental ICSE rule #4 - Bound Rules: 0 <= beginIndex <= endIndex <= str.length().",
    "explanation": "In the ICSE Class X Computer Applications board exam, substring(int beginIndex [, int endIndex]) Method is an essential method. The substring() method extracts a sub-sequence of characters from a string. In its single-argument form, it extracts from beginIndex to the end. In its dual-argument form, it extracts from beginIndex inclusive up to endIndex EXCLUSIVE. Key syllabus specification: Bound Rules: 0 <= beginIndex <= endIndex <= str.length(). Always avoid common pitfall: StringIndexOutOfBoundsException when beginIndex < 0 or endIndex > length().",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Bound Rules: 0 <= beginIndex <= endIndex <= str.length().",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SubstringMethodDemo.java\n// Bound Rules: 0 <= beginIndex <= endIndex <= str.length()."
  },
  {
    "id": 15,
    "question": "Does substring(int beginIndex [, int endIndex]) Method create a new String in Heap memory or String Constant Pool?",
    "shortAnswer": "substring(int beginIndex [, int endIndex]) Method: Fundamental ICSE rule #5 - ICSE Syllabus Pillar: The primary method used in Pig Latin, palindrome extraction, word extraction, and string slicing.",
    "explanation": "In the ICSE Class X Computer Applications board exam, substring(int beginIndex [, int endIndex]) Method is an essential method. The substring() method extracts a sub-sequence of characters from a string. In its single-argument form, it extracts from beginIndex to the end. In its dual-argument form, it extracts from beginIndex inclusive up to endIndex EXCLUSIVE. Key syllabus specification: ICSE Syllabus Pillar: The primary method used in Pig Latin, palindrome extraction, word extraction, and string slicing. Always avoid common pitfall: IllegalArgumentException / Index error when beginIndex > endIndex.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "ICSE Syllabus Pillar: The primary method used in Pig Latin, palindrome extraction, word extraction, and string slicing.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SubstringMethodDemo.java\n// ICSE Syllabus Pillar: The primary method used in Pig Latin, palindrome extraction, word extraction, and string slicing."
  },
  {
    "id": 16,
    "question": "How does substring(int beginIndex [, int endIndex]) Method treat whitespace, digits, and special symbols?",
    "shortAnswer": "substring(int beginIndex [, int endIndex]) Method: Fundamental ICSE rule #1 - Single Parameter: str.substring(beginIndex) extracts from beginIndex to length().",
    "explanation": "In the ICSE Class X Computer Applications board exam, substring(int beginIndex [, int endIndex]) Method is an essential method. The substring() method extracts a sub-sequence of characters from a string. In its single-argument form, it extracts from beginIndex to the end. In its dual-argument form, it extracts from beginIndex inclusive up to endIndex EXCLUSIVE. Key syllabus specification: Single Parameter: str.substring(beginIndex) extracts from beginIndex to length(). Always avoid common pitfall: Off-by-one error: Forgetting that endIndex is EXCLUSIVE, missing the final desired character.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Single Parameter: str.substring(beginIndex) extracts from beginIndex to length().",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SubstringMethodDemo.java\n// Single Parameter: str.substring(beginIndex) extracts from beginIndex to length()."
  },
  {
    "id": 17,
    "question": "What is the difference between static and instance invocation regarding substring(int beginIndex [, int endIndex]) Method?",
    "shortAnswer": "substring(int beginIndex [, int endIndex]) Method: Fundamental ICSE rule #2 - Dual Parameter: str.substring(beginIndex, endIndex) extracts from beginIndex up to endIndex - 1.",
    "explanation": "In the ICSE Class X Computer Applications board exam, substring(int beginIndex [, int endIndex]) Method is an essential method. The substring() method extracts a sub-sequence of characters from a string. In its single-argument form, it extracts from beginIndex to the end. In its dual-argument form, it extracts from beginIndex inclusive up to endIndex EXCLUSIVE. Key syllabus specification: Dual Parameter: str.substring(beginIndex, endIndex) extracts from beginIndex up to endIndex - 1. Always avoid common pitfall: StringIndexOutOfBoundsException when beginIndex < 0 or endIndex > length().",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Dual Parameter: str.substring(beginIndex, endIndex) extracts from beginIndex up to endIndex - 1.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SubstringMethodDemo.java\n// Dual Parameter: str.substring(beginIndex, endIndex) extracts from beginIndex up to endIndex - 1."
  },
  {
    "id": 18,
    "question": "How do you write a Variable Description Table (VDT) entry for substring(int beginIndex [, int endIndex]) Method?",
    "shortAnswer": "substring(int beginIndex [, int endIndex]) Method: Fundamental ICSE rule #3 - Length Formula: The number of extracted characters is exactly: (endIndex - beginIndex).",
    "explanation": "In the ICSE Class X Computer Applications board exam, substring(int beginIndex [, int endIndex]) Method is an essential method. The substring() method extracts a sub-sequence of characters from a string. In its single-argument form, it extracts from beginIndex to the end. In its dual-argument form, it extracts from beginIndex inclusive up to endIndex EXCLUSIVE. Key syllabus specification: Length Formula: The number of extracted characters is exactly: (endIndex - beginIndex). Always avoid common pitfall: IllegalArgumentException / Index error when beginIndex > endIndex.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "intermediate",
    "options": [
      "Length Formula: The number of extracted characters is exactly: (endIndex - beginIndex).",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SubstringMethodDemo.java\n// Length Formula: The number of extracted characters is exactly: (endIndex - beginIndex)."
  },
  {
    "id": 19,
    "question": "How is substring(int beginIndex [, int endIndex]) Method tested in Section A output prediction questions?",
    "shortAnswer": "substring(int beginIndex [, int endIndex]) Method: Fundamental ICSE rule #4 - Bound Rules: 0 <= beginIndex <= endIndex <= str.length().",
    "explanation": "In the ICSE Class X Computer Applications board exam, substring(int beginIndex [, int endIndex]) Method is an essential method. The substring() method extracts a sub-sequence of characters from a string. In its single-argument form, it extracts from beginIndex to the end. In its dual-argument form, it extracts from beginIndex inclusive up to endIndex EXCLUSIVE. Key syllabus specification: Bound Rules: 0 <= beginIndex <= endIndex <= str.length(). Always avoid common pitfall: Off-by-one error: Forgetting that endIndex is EXCLUSIVE, missing the final desired character.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Bound Rules: 0 <= beginIndex <= endIndex <= str.length().",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SubstringMethodDemo.java\n// Bound Rules: 0 <= beginIndex <= endIndex <= str.length()."
  },
  {
    "id": 20,
    "question": "Can substring(int beginIndex [, int endIndex]) Method be executed on a StringBuffer or StringBuilder?",
    "shortAnswer": "substring(int beginIndex [, int endIndex]) Method: Fundamental ICSE rule #5 - ICSE Syllabus Pillar: The primary method used in Pig Latin, palindrome extraction, word extraction, and string slicing.",
    "explanation": "In the ICSE Class X Computer Applications board exam, substring(int beginIndex [, int endIndex]) Method is an essential method. The substring() method extracts a sub-sequence of characters from a string. In its single-argument form, it extracts from beginIndex to the end. In its dual-argument form, it extracts from beginIndex inclusive up to endIndex EXCLUSIVE. Key syllabus specification: ICSE Syllabus Pillar: The primary method used in Pig Latin, palindrome extraction, word extraction, and string slicing. Always avoid common pitfall: StringIndexOutOfBoundsException when beginIndex < 0 or endIndex > length().",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "ICSE Syllabus Pillar: The primary method used in Pig Latin, palindrome extraction, word extraction, and string slicing.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SubstringMethodDemo.java\n// ICSE Syllabus Pillar: The primary method used in Pig Latin, palindrome extraction, word extraction, and string slicing."
  },
  {
    "id": 21,
    "question": "What happens if substring(int beginIndex [, int endIndex]) Method is called on a string of length 1?",
    "shortAnswer": "substring(int beginIndex [, int endIndex]) Method: Fundamental ICSE rule #1 - Single Parameter: str.substring(beginIndex) extracts from beginIndex to length().",
    "explanation": "In the ICSE Class X Computer Applications board exam, substring(int beginIndex [, int endIndex]) Method is an essential method. The substring() method extracts a sub-sequence of characters from a string. In its single-argument form, it extracts from beginIndex to the end. In its dual-argument form, it extracts from beginIndex inclusive up to endIndex EXCLUSIVE. Key syllabus specification: Single Parameter: str.substring(beginIndex) extracts from beginIndex to length(). Always avoid common pitfall: IllegalArgumentException / Index error when beginIndex > endIndex.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Single Parameter: str.substring(beginIndex) extracts from beginIndex to length().",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SubstringMethodDemo.java\n// Single Parameter: str.substring(beginIndex) extracts from beginIndex to length()."
  },
  {
    "id": 22,
    "question": "Why does substring(int beginIndex [, int endIndex]) Method return primitive values versus object references?",
    "shortAnswer": "substring(int beginIndex [, int endIndex]) Method: Fundamental ICSE rule #2 - Dual Parameter: str.substring(beginIndex, endIndex) extracts from beginIndex up to endIndex - 1.",
    "explanation": "In the ICSE Class X Computer Applications board exam, substring(int beginIndex [, int endIndex]) Method is an essential method. The substring() method extracts a sub-sequence of characters from a string. In its single-argument form, it extracts from beginIndex to the end. In its dual-argument form, it extracts from beginIndex inclusive up to endIndex EXCLUSIVE. Key syllabus specification: Dual Parameter: str.substring(beginIndex, endIndex) extracts from beginIndex up to endIndex - 1. Always avoid common pitfall: Off-by-one error: Forgetting that endIndex is EXCLUSIVE, missing the final desired character.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Dual Parameter: str.substring(beginIndex, endIndex) extracts from beginIndex up to endIndex - 1.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SubstringMethodDemo.java\n// Dual Parameter: str.substring(beginIndex, endIndex) extracts from beginIndex up to endIndex - 1."
  },
  {
    "id": 23,
    "question": "How do you combine substring(int beginIndex [, int endIndex]) Method with a for loop for string traversal?",
    "shortAnswer": "substring(int beginIndex [, int endIndex]) Method: Fundamental ICSE rule #3 - Length Formula: The number of extracted characters is exactly: (endIndex - beginIndex).",
    "explanation": "In the ICSE Class X Computer Applications board exam, substring(int beginIndex [, int endIndex]) Method is an essential method. The substring() method extracts a sub-sequence of characters from a string. In its single-argument form, it extracts from beginIndex to the end. In its dual-argument form, it extracts from beginIndex inclusive up to endIndex EXCLUSIVE. Key syllabus specification: Length Formula: The number of extracted characters is exactly: (endIndex - beginIndex). Always avoid common pitfall: StringIndexOutOfBoundsException when beginIndex < 0 or endIndex > length().",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Length Formula: The number of extracted characters is exactly: (endIndex - beginIndex).",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SubstringMethodDemo.java\n// Length Formula: The number of extracted characters is exactly: (endIndex - beginIndex)."
  },
  {
    "id": 24,
    "question": "What happens if you ignore the return value of substring(int beginIndex [, int endIndex]) Method?",
    "shortAnswer": "substring(int beginIndex [, int endIndex]) Method: Fundamental ICSE rule #4 - Bound Rules: 0 <= beginIndex <= endIndex <= str.length().",
    "explanation": "In the ICSE Class X Computer Applications board exam, substring(int beginIndex [, int endIndex]) Method is an essential method. The substring() method extracts a sub-sequence of characters from a string. In its single-argument form, it extracts from beginIndex to the end. In its dual-argument form, it extracts from beginIndex inclusive up to endIndex EXCLUSIVE. Key syllabus specification: Bound Rules: 0 <= beginIndex <= endIndex <= str.length(). Always avoid common pitfall: IllegalArgumentException / Index error when beginIndex > endIndex.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "Bound Rules: 0 <= beginIndex <= endIndex <= str.length().",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SubstringMethodDemo.java\n// Bound Rules: 0 <= beginIndex <= endIndex <= str.length()."
  },
  {
    "id": 25,
    "question": "What master examination advice does Sukanta Hui give for scoring full marks on substring(int beginIndex [, int endIndex]) Method?",
    "shortAnswer": "substring(int beginIndex [, int endIndex]) Method: Fundamental ICSE rule #5 - ICSE Syllabus Pillar: The primary method used in Pig Latin, palindrome extraction, word extraction, and string slicing.",
    "explanation": "In the ICSE Class X Computer Applications board exam, substring(int beginIndex [, int endIndex]) Method is an essential method. The substring() method extracts a sub-sequence of characters from a string. In its single-argument form, it extracts from beginIndex to the end. In its dual-argument form, it extracts from beginIndex inclusive up to endIndex EXCLUSIVE. Key syllabus specification: ICSE Syllabus Pillar: The primary method used in Pig Latin, palindrome extraction, word extraction, and string slicing. Always avoid common pitfall: Off-by-one error: Forgetting that endIndex is EXCLUSIVE, missing the final desired character.",
    "hint": "Recall method signature, return type, immutability, and boundary conditions.",
    "level": "advanced",
    "options": [
      "ICSE Syllabus Pillar: The primary method used in Pig Latin, palindrome extraction, word extraction, and string slicing.",
      "The method mutates the original string directly in place",
      "The method always returns a void data type",
      "The method throws an exception if the string contains spaces"
    ],
    "correctAnswer": 0,
    "codeExample": "// ICSE Standard Code snippet for Topic 13:\n// SubstringMethodDemo.java\n// ICSE Syllabus Pillar: The primary method used in Pig Latin, palindrome extraction, word extraction, and string slicing."
  }
];

export default questions;
