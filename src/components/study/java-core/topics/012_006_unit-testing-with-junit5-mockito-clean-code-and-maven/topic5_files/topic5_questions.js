const topic5_questions = [
  {
    "question": "What is the difference between a Unit Test and an Integration Test regarding external dependencies?",
    "shortAnswer": "A Unit Test tests an individual class in isolation by replacing all external collaborators with mocks; an Integration Test verifies that real components (e.g. database, HTTP services) work together correctly.",
    "explanation": "Clear distinction between unit and integration scopes.",
    "hint": "Unit test isolates with mocks; integration test tests real component interactions.",
    "level": "Beginner",
    "codeExample": "Unit Test: in-memory Mockito mocks"
  },
  {
    "question": "Why should unit tests avoid connecting to real databases or networks?",
    "shortAnswer": "Real databases and networks introduce latency, require test environment setup/teardown, cause flaky failures due to network hiccups, and produce non-repeatable state collisions between concurrent test runs.",
    "explanation": "Flakiness, speed, and concurrency hazards of un-mocked I/O.",
    "hint": "Slowness, non-determinism, and external environment fragility.",
    "level": "Beginner",
    "codeExample": "StudentRepository repo = Mockito.mock(StudentRepository.class);"
  }
];

export default topic5_questions;
