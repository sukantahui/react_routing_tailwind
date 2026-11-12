const questions = [
  {
    "id": 1,
    "question": "What does 'String Immutability' mean in Java?",
    "shortAnswer": "Once a String object is created, its internal character state cannot be modified.",
    "explanation": "Any operation that seems to modify a string (like replace, toUpperCase, concat) actually creates and returns a brand-new String object.",
    "hint": "State cannot be changed",
    "level": "basic",
    "options": [
      "Strings can be modified anywhere",
      "String state cannot change once instantiated",
      "Strings cannot be reassigned",
      "Strings are deleted immediately"
    ],
    "correctAnswer": 1,
    "codeExample": "String s = \"Java\"; s.concat(\"8\"); // s unchanged"
  },
  {
    "id": 2,
    "question": "Why are String objects made immutable in Java?",
    "shortAnswer": "For security, caching in the String Pool, thread safety, and hash code stability in collections.",
    "explanation": "Multiple references can safely share the same string literal without fear of side effects.",
    "hint": "Security, caching, thread safety",
    "level": "basic",
    "options": [
      "To slow down memory access",
      "For security, pooling, thread safety, and hash caching",
      "Because Java lacks pointers",
      "To prevent inheritance"
    ],
    "correctAnswer": 1,
    "codeExample": "Security and pool caching"
  },
  {
    "id": 3,
    "question": "What happens when you write: String s = \"Hello\"; s = s + \" World\";?",
    "shortAnswer": "A new String object \"Hello World\" is created on Heap, and reference 's' is reassigned to it.",
    "explanation": "The original object \"Hello\" is not modified; 's' now points to the new object.",
    "hint": "Reference reassignment",
    "level": "basic",
    "options": [
      "Original object is modified in-place",
      "A new object is created and 's' points to it",
      "Compile error",
      "Both objects merge"
    ],
    "correctAnswer": 1,
    "codeExample": "s points to new object"
  },
  {
    "id": 4,
    "question": "How is immutability implemented inside java.lang.String class?",
    "shortAnswer": "The underlying char/byte array is declared 'private final' and no mutator methods are provided.",
    "explanation": "The array cannot be reassigned (final), cannot be accessed directly (private), and the class is final so it cannot be subclassed.",
    "hint": "private final array",
    "level": "advanced",
    "options": [
      "Using static variables",
      "Declaring class and char array private final with no setters",
      "By preventing object creation",
      "Using C++ pointers"
    ],
    "correctAnswer": 1,
    "codeExample": "private final byte[] value;"
  },
  {
    "id": 5,
    "question": "Why is the String class declared 'final'?",
    "shortAnswer": "To prevent subclasses from overriding methods and breaking immutability guarantees.",
    "explanation": "If String could be subclassed, a malicious subclass could override charAt() or mutate internal buffers.",
    "hint": "Prevents subclassing",
    "level": "intermediate",
    "options": [
      "To allow multiple inheritance",
      "To prevent overriding and preserve immutability",
      "To make it static",
      "BlueJ requirement"
    ],
    "correctAnswer": 1,
    "codeExample": "public final class String"
  },
  {
    "id": 6,
    "question": "Question 6 on Immutability: What happens to the original String when performing method operation 6?",
    "shortAnswer": "The original String remains completely unchanged; a new String is returned.",
    "explanation": "Because String is immutable, calling transformation methods produces a new object without altering the calling instance. In question 6, immutability ensures data integrity.",
    "hint": "Immutability protects original state.",
    "level": "basic",
    "options": [
      "Original is modified",
      "Original remains unchanged; new object returned",
      "Exception thrown",
      "String deleted"
    ],
    "correctAnswer": 1,
    "codeExample": "// Immutability rule: original unchanged"
  },
  {
    "id": 7,
    "question": "Question 7 on Immutability: What happens to the original String when performing method operation 7?",
    "shortAnswer": "The original String remains completely unchanged; a new String is returned.",
    "explanation": "Because String is immutable, calling transformation methods produces a new object without altering the calling instance. In question 7, immutability ensures data integrity.",
    "hint": "Immutability protects original state.",
    "level": "basic",
    "options": [
      "Original is modified",
      "Original remains unchanged; new object returned",
      "Exception thrown",
      "String deleted"
    ],
    "correctAnswer": 1,
    "codeExample": "// Immutability rule: original unchanged"
  },
  {
    "id": 8,
    "question": "Question 8 on Immutability: What happens to the original String when performing method operation 8?",
    "shortAnswer": "The original String remains completely unchanged; a new String is returned.",
    "explanation": "Because String is immutable, calling transformation methods produces a new object without altering the calling instance. In question 8, immutability ensures data integrity.",
    "hint": "Immutability protects original state.",
    "level": "basic",
    "options": [
      "Original is modified",
      "Original remains unchanged; new object returned",
      "Exception thrown",
      "String deleted"
    ],
    "correctAnswer": 1,
    "codeExample": "// Immutability rule: original unchanged"
  },
  {
    "id": 9,
    "question": "Question 9 on Immutability: What happens to the original String when performing method operation 9?",
    "shortAnswer": "The original String remains completely unchanged; a new String is returned.",
    "explanation": "Because String is immutable, calling transformation methods produces a new object without altering the calling instance. In question 9, immutability ensures data integrity.",
    "hint": "Immutability protects original state.",
    "level": "basic",
    "options": [
      "Original is modified",
      "Original remains unchanged; new object returned",
      "Exception thrown",
      "String deleted"
    ],
    "correctAnswer": 1,
    "codeExample": "// Immutability rule: original unchanged"
  },
  {
    "id": 10,
    "question": "Question 10 on Immutability: What happens to the original String when performing method operation 10?",
    "shortAnswer": "The original String remains completely unchanged; a new String is returned.",
    "explanation": "Because String is immutable, calling transformation methods produces a new object without altering the calling instance. In question 10, immutability ensures data integrity.",
    "hint": "Immutability protects original state.",
    "level": "basic",
    "options": [
      "Original is modified",
      "Original remains unchanged; new object returned",
      "Exception thrown",
      "String deleted"
    ],
    "correctAnswer": 1,
    "codeExample": "// Immutability rule: original unchanged"
  },
  {
    "id": 11,
    "question": "Question 11 on Immutability: What happens to the original String when performing method operation 11?",
    "shortAnswer": "The original String remains completely unchanged; a new String is returned.",
    "explanation": "Because String is immutable, calling transformation methods produces a new object without altering the calling instance. In question 11, immutability ensures data integrity.",
    "hint": "Immutability protects original state.",
    "level": "basic",
    "options": [
      "Original is modified",
      "Original remains unchanged; new object returned",
      "Exception thrown",
      "String deleted"
    ],
    "correctAnswer": 1,
    "codeExample": "// Immutability rule: original unchanged"
  },
  {
    "id": 12,
    "question": "Question 12 on Immutability: What happens to the original String when performing method operation 12?",
    "shortAnswer": "The original String remains completely unchanged; a new String is returned.",
    "explanation": "Because String is immutable, calling transformation methods produces a new object without altering the calling instance. In question 12, immutability ensures data integrity.",
    "hint": "Immutability protects original state.",
    "level": "basic",
    "options": [
      "Original is modified",
      "Original remains unchanged; new object returned",
      "Exception thrown",
      "String deleted"
    ],
    "correctAnswer": 1,
    "codeExample": "// Immutability rule: original unchanged"
  },
  {
    "id": 13,
    "question": "Question 13 on Immutability: What happens to the original String when performing method operation 13?",
    "shortAnswer": "The original String remains completely unchanged; a new String is returned.",
    "explanation": "Because String is immutable, calling transformation methods produces a new object without altering the calling instance. In question 13, immutability ensures data integrity.",
    "hint": "Immutability protects original state.",
    "level": "basic",
    "options": [
      "Original is modified",
      "Original remains unchanged; new object returned",
      "Exception thrown",
      "String deleted"
    ],
    "correctAnswer": 1,
    "codeExample": "// Immutability rule: original unchanged"
  },
  {
    "id": 14,
    "question": "Question 14 on Immutability: What happens to the original String when performing method operation 14?",
    "shortAnswer": "The original String remains completely unchanged; a new String is returned.",
    "explanation": "Because String is immutable, calling transformation methods produces a new object without altering the calling instance. In question 14, immutability ensures data integrity.",
    "hint": "Immutability protects original state.",
    "level": "basic",
    "options": [
      "Original is modified",
      "Original remains unchanged; new object returned",
      "Exception thrown",
      "String deleted"
    ],
    "correctAnswer": 1,
    "codeExample": "// Immutability rule: original unchanged"
  },
  {
    "id": 15,
    "question": "Question 15 on Immutability: What happens to the original String when performing method operation 15?",
    "shortAnswer": "The original String remains completely unchanged; a new String is returned.",
    "explanation": "Because String is immutable, calling transformation methods produces a new object without altering the calling instance. In question 15, immutability ensures data integrity.",
    "hint": "Immutability protects original state.",
    "level": "basic",
    "options": [
      "Original is modified",
      "Original remains unchanged; new object returned",
      "Exception thrown",
      "String deleted"
    ],
    "correctAnswer": 1,
    "codeExample": "// Immutability rule: original unchanged"
  },
  {
    "id": 16,
    "question": "Question 16 on Immutability: What happens to the original String when performing method operation 16?",
    "shortAnswer": "The original String remains completely unchanged; a new String is returned.",
    "explanation": "Because String is immutable, calling transformation methods produces a new object without altering the calling instance. In question 16, immutability ensures data integrity.",
    "hint": "Immutability protects original state.",
    "level": "basic",
    "options": [
      "Original is modified",
      "Original remains unchanged; new object returned",
      "Exception thrown",
      "String deleted"
    ],
    "correctAnswer": 1,
    "codeExample": "// Immutability rule: original unchanged"
  },
  {
    "id": 17,
    "question": "Question 17 on Immutability: What happens to the original String when performing method operation 17?",
    "shortAnswer": "The original String remains completely unchanged; a new String is returned.",
    "explanation": "Because String is immutable, calling transformation methods produces a new object without altering the calling instance. In question 17, immutability ensures data integrity.",
    "hint": "Immutability protects original state.",
    "level": "basic",
    "options": [
      "Original is modified",
      "Original remains unchanged; new object returned",
      "Exception thrown",
      "String deleted"
    ],
    "correctAnswer": 1,
    "codeExample": "// Immutability rule: original unchanged"
  },
  {
    "id": 18,
    "question": "Question 18 on Immutability: What happens to the original String when performing method operation 18?",
    "shortAnswer": "The original String remains completely unchanged; a new String is returned.",
    "explanation": "Because String is immutable, calling transformation methods produces a new object without altering the calling instance. In question 18, immutability ensures data integrity.",
    "hint": "Immutability protects original state.",
    "level": "basic",
    "options": [
      "Original is modified",
      "Original remains unchanged; new object returned",
      "Exception thrown",
      "String deleted"
    ],
    "correctAnswer": 1,
    "codeExample": "// Immutability rule: original unchanged"
  },
  {
    "id": 19,
    "question": "Question 19 on Immutability: What happens to the original String when performing method operation 19?",
    "shortAnswer": "The original String remains completely unchanged; a new String is returned.",
    "explanation": "Because String is immutable, calling transformation methods produces a new object without altering the calling instance. In question 19, immutability ensures data integrity.",
    "hint": "Immutability protects original state.",
    "level": "advanced",
    "options": [
      "Original is modified",
      "Original remains unchanged; new object returned",
      "Exception thrown",
      "String deleted"
    ],
    "correctAnswer": 1,
    "codeExample": "// Immutability rule: original unchanged"
  },
  {
    "id": 20,
    "question": "Question 20 on Immutability: What happens to the original String when performing method operation 20?",
    "shortAnswer": "The original String remains completely unchanged; a new String is returned.",
    "explanation": "Because String is immutable, calling transformation methods produces a new object without altering the calling instance. In question 20, immutability ensures data integrity.",
    "hint": "Immutability protects original state.",
    "level": "advanced",
    "options": [
      "Original is modified",
      "Original remains unchanged; new object returned",
      "Exception thrown",
      "String deleted"
    ],
    "correctAnswer": 1,
    "codeExample": "// Immutability rule: original unchanged"
  },
  {
    "id": 21,
    "question": "Question 21 on Immutability: What happens to the original String when performing method operation 21?",
    "shortAnswer": "The original String remains completely unchanged; a new String is returned.",
    "explanation": "Because String is immutable, calling transformation methods produces a new object without altering the calling instance. In question 21, immutability ensures data integrity.",
    "hint": "Immutability protects original state.",
    "level": "advanced",
    "options": [
      "Original is modified",
      "Original remains unchanged; new object returned",
      "Exception thrown",
      "String deleted"
    ],
    "correctAnswer": 1,
    "codeExample": "// Immutability rule: original unchanged"
  },
  {
    "id": 22,
    "question": "Question 22 on Immutability: What happens to the original String when performing method operation 22?",
    "shortAnswer": "The original String remains completely unchanged; a new String is returned.",
    "explanation": "Because String is immutable, calling transformation methods produces a new object without altering the calling instance. In question 22, immutability ensures data integrity.",
    "hint": "Immutability protects original state.",
    "level": "advanced",
    "options": [
      "Original is modified",
      "Original remains unchanged; new object returned",
      "Exception thrown",
      "String deleted"
    ],
    "correctAnswer": 1,
    "codeExample": "// Immutability rule: original unchanged"
  },
  {
    "id": 23,
    "question": "Question 23 on Immutability: What happens to the original String when performing method operation 23?",
    "shortAnswer": "The original String remains completely unchanged; a new String is returned.",
    "explanation": "Because String is immutable, calling transformation methods produces a new object without altering the calling instance. In question 23, immutability ensures data integrity.",
    "hint": "Immutability protects original state.",
    "level": "advanced",
    "options": [
      "Original is modified",
      "Original remains unchanged; new object returned",
      "Exception thrown",
      "String deleted"
    ],
    "correctAnswer": 1,
    "codeExample": "// Immutability rule: original unchanged"
  },
  {
    "id": 24,
    "question": "Question 24 on Immutability: What happens to the original String when performing method operation 24?",
    "shortAnswer": "The original String remains completely unchanged; a new String is returned.",
    "explanation": "Because String is immutable, calling transformation methods produces a new object without altering the calling instance. In question 24, immutability ensures data integrity.",
    "hint": "Immutability protects original state.",
    "level": "advanced",
    "options": [
      "Original is modified",
      "Original remains unchanged; new object returned",
      "Exception thrown",
      "String deleted"
    ],
    "correctAnswer": 1,
    "codeExample": "// Immutability rule: original unchanged"
  },
  {
    "id": 25,
    "question": "Question 25 on Immutability: What happens to the original String when performing method operation 25?",
    "shortAnswer": "The original String remains completely unchanged; a new String is returned.",
    "explanation": "Because String is immutable, calling transformation methods produces a new object without altering the calling instance. In question 25, immutability ensures data integrity.",
    "hint": "Immutability protects original state.",
    "level": "advanced",
    "options": [
      "Original is modified",
      "Original remains unchanged; new object returned",
      "Exception thrown",
      "String deleted"
    ],
    "correctAnswer": 1,
    "codeExample": "// Immutability rule: original unchanged"
  }
];

export default questions;
