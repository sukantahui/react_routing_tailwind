const topic2_questions = [
  {
    "question": "Why does JUnit create a NEW instance of the test class for each @Test method by default?",
    "shortAnswer": "To enforce test isolation and prevent side-effects or shared mutable state from leaking between test methods. This lifecycle mode is called PER_METHOD (can be changed to PER_CLASS via @TestInstance).",
    "explanation": "Test isolation guarantee in JUnit.",
    "hint": "Ensures complete isolation between test methods with no shared state leaks.",
    "level": "Intermediate",
    "codeExample": "@TestInstance(TestInstance.Lifecycle.PER_CLASS)"
  },
  {
    "question": "What is the difference between JUnit 4 @Before and JUnit 5 @BeforeEach?",
    "shortAnswer": "JUnit 4 used @Before and @After; JUnit 5 renamed them to @BeforeEach and @AfterEach for crystal clear semantic clarity, while replacing @BeforeClass and @AfterClass with @BeforeAll and @AfterAll.",
    "explanation": "JUnit 4 to JUnit 5 migration rename.",
    "hint": "@Before became @BeforeEach; @BeforeClass became @BeforeAll.",
    "level": "Beginner",
    "codeExample": "@BeforeEach void setUp() { ... }"
  }
];

export default topic2_questions;
