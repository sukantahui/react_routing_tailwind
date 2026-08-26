const topic3_questions = [
  {
    "question": "Why is assertAll() superior to multiple sequential assertEquals() statements?",
    "shortAnswer": "Sequential assertions fail-fast on the first failure, hiding subsequent errors. assertAll() executes every assertion in the group and produces a consolidated report detailing all failures simultaneously.",
    "explanation": "Grouped assertions in JUnit 5.",
    "hint": "Executes all assertions and reports all failures together rather than aborting at the first error.",
    "level": "Intermediate",
    "codeExample": "assertAll(() -> assertEquals(a, b), () -> assertTrue(c));"
  },
  {
    "question": "How do you test that a specific exception is thrown in JUnit 5?",
    "shortAnswer": "Using Assertions.assertThrows(ExceptionClass.class, () -> executableMethod()), which returns the thrown exception instance for further assertions on its message or cause.",
    "explanation": "JUnit 5 lambda-based exception testing.",
    "hint": "assertThrows takes the expected Exception class and an executable lambda.",
    "level": "Beginner",
    "codeExample": "IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () -> calc(-1));"
  }
];

export default topic3_questions;
