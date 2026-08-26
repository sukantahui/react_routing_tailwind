// src/components/study/python/topics/004_003_python-testing/topic1_files/topic1_questions.js
// Comprehensive Master Review Questions for Topic 1: Types of testing: Unit testing, Integration testing, Functional testing

const questions = [
  {
    question: "What is the primary objective of a Unit Test in Python?",
    shortAnswer: "A Unit Test verifies the smallest testable unit of source code (such as a single pure function, calculation algorithm, or isolated class method) in complete isolation from external dependencies.",
    explanation: "Isolated verification of fine-grained logic units.",
    hint: "Tests a single isolated function or method with no database or network dependencies.",
    level: "basic",
    codeExample: "# Unit test on pure function\ndef test_add(): assert add(2, 3) == 5"
  },
  {
    question: "How does an Integration Test differ from a Unit Test?",
    shortAnswer: "While a unit test isolates a single function in memory, an integration test verifies that two or more collaborating components (e.g. a Python service interacting with an SQLite database or an external caching layer) interact and communicate correctly across boundaries.",
    explanation: "Multi-component interface and boundary verification.",
    hint: "Integration tests check how components work together (e.g. Service + Database).",
    level: "basic",
    codeExample: "# Integration test verifying DB persistence\ndef test_repo_save(db): ... "
  },
  {
    question: "What is Functional / End-to-End (E2E) testing?",
    shortAnswer: "Functional or E2E testing evaluates the complete software system from the perspective of an end user or external client, verifying full end-to-end business workflows against functional requirements without inspecting internal code details (black-box).",
    explanation: "Black-box validation of complete user business workflows.",
    hint: "Simulates full user journey from input request to output response.",
    level: "basic",
    codeExample: "# Functional test on HTTP endpoint\nres = client.post('/api/admission', json=payload)"
  },
  {
    question: "What is the 'Testing Pyramid' model and what distribution ratio does it recommend?",
    shortAnswer: "The Testing Pyramid is an architectural guideline recommending a broad base of fast, cheap Unit Tests (~70%), a middle tier of Integration Tests (~20%), and a small apex of comprehensive Functional/E2E Tests (~10%).",
    explanation: "Cost-effective distribution of automated test types.",
    hint: "70% Unit Tests, 20% Integration Tests, 10% E2E Tests.",
    level: "basic",
    codeExample: "# Testing Pyramid distribution: 70% Unit / 20% Integration / 10% E2E"
  },
  {
    question: "What is the 'Ice Cream Cone' testing anti-pattern?",
    shortAnswer: "The Ice Cream Cone anti-pattern occurs when a team has very few unit tests, some integration tests, and an excessive number of slow, brittle, expensive E2E/manual tests at the top, leading to high maintenance costs and slow feedback cycles.",
    explanation: "Inverted testing pyramid leading to brittle test suites.",
    hint: "Having too many slow E2E tests and too few fast unit tests.",
    level: "moderate",
    codeExample: "# Anti-pattern: 80% E2E tests + 10% unit tests (Slow and flaky)"
  },
  {
    question: "Why are Unit Tests significantly faster to execute than Integration Tests?",
    shortAnswer: "Unit tests execute entirely in CPU memory without performing expensive I/O operations like establishing TCP sockets, writing to disk, running SQL queries, or making HTTP calls, running in microseconds rather than seconds.",
    explanation: "In-memory execution vs I/O latency.",
    hint: "Unit tests have no disk, database, or network I/O latency.",
    level: "basic",
    codeExample: "# Unit test runs in 0.0001s; Integration test with DB runs in 0.05s"
  },
  {
    question: "What is a 'Test Double' and why is it used in Unit Testing?",
    shortAnswer: "A Test Double (such as a Mock, Stub, Fake, or Spy) is a stand-in object that replaces a slow or complex external dependency (like a payment gateway or email server) so the unit under test can be verified in total isolation.",
    explanation: "Simulated substitutes for external subsystem dependencies.",
    hint: "A mock, stub, or fake that replaces real databases/APIs in unit tests.",
    level: "moderate",
    codeExample: "mock_gateway = Mock()\nservice = AdmissionService(gateway=mock_gateway)"
  },
  {
    question: "When would an Integration Test catch a bug that Unit Tests completely missed?",
    shortAnswer: "Integration tests catch schema mismatches, SQL syntax errors, incorrect foreign key constraints, serialization/deserialization formatting bugs, and network timeout misconfigurations between components that mock-based unit tests overlook.",
    explanation: "Real interface mismatches across component boundaries.",
    hint: "SQL column type mismatches or JSON serialization errors across components.",
    level: "moderate",
    codeExample: "# Integration test verifies actual SQL constraint violations"
  },
  {
    question: "What is 'White-Box' vs 'Black-Box' testing?",
    shortAnswer: "White-Box testing tests internal structures, branches, and code paths with full knowledge of the source code (typical of Unit Tests); Black-Box testing examines functionality without knowledge of internal code mechanisms (typical of Functional/E2E Tests).",
    explanation: "Internal structural inspection vs external functional evaluation.",
    hint: "White-box inspects internal code; black-box tests external behavior.",
    level: "basic",
    codeExample: "# White-box tests internal algorithms; Black-box tests API contracts"
  },
  {
    question: "What is 'Contract Testing' in microservice architectures?",
    shortAnswer: "Contract testing verifies that the API requests sent by a consumer and the responses returned by a provider conform to a shared, agreed-upon interface schema without running full end-to-end integration environments.",
    explanation: "Schema and payload compatibility verification across distributed services.",
    hint: "Verifies that API request/response structures match between services.",
    level: "complex",
    codeExample: "# Verifying OpenAPI / JSON Schema contracts between services"
  },
  {
    question: "Why should you avoid testing private helper methods directly in unit tests?",
    shortAnswer: "Testing private implementation details couples tests tightly to internal refactoring; tests should verify public interfaces and behaviors so that developers can refactor internal private methods freely without breaking tests.",
    explanation: "Behavioral testing vs implementation coupling.",
    hint: "Test public methods; let private helpers be exercised naturally.",
    level: "moderate",
    codeExample: "# Test public calculate_total() instead of private _apply_raw_math()"
  },
  {
    question: "What is 'Regression Testing' in relation to unit and integration testing?",
    shortAnswer: "Regression testing is the continuous re-execution of existing unit and integration test suites after every codebase modification to verify that recent changes haven't introduced regressions into working functionality.",
    explanation: "Automated verification against functional backsliding.",
    hint: "Re-running all tests after changes to ensure nothing broke.",
    level: "basic",
    codeExample: "# Running pytest on every Git commit"
  },
  {
    question: "How do you achieve fast test execution in integration tests with databases?",
    shortAnswer: "By using lightweight in-memory databases (e.g. 'sqlite3.connect(\":memory:\")') or transactional rollbacks per test rather than creating physical on-disk databases.",
    explanation: "In-memory database isolation and transactional teardowns.",
    hint: "Use in-memory SQLite (':memory:') for ultra-fast integration testing.",
    level: "moderate",
    codeExample: "conn = sqlite3.connect(':memory:') # Instant in-memory DB"
  },
  {
    question: "What is 'Acceptance Testing'?",
    shortAnswer: "Acceptance testing is a formal tier of functional testing that validates whether the software meets all business user requirements, specifications, and acceptance criteria before customer delivery.",
    explanation: "Business stakeholder specification verification.",
    hint: "Verifies the software satisfies user requirements and business acceptance criteria.",
    level: "basic",
    codeExample: "# Acceptance criteria: User can register and receive email receipt"
  },
  {
    question: "What is the primary drawback of having too many End-to-End (E2E) tests?",
    shortAnswer: "E2E tests are slow to run (taking minutes or hours), brittle (prone to false positives from minor network glitches or UI changes), and difficult to debug because a failure doesn't pinpoint the exact line of code at fault.",
    explanation: "High maintenance costs and slow feedback loops of heavy E2E suites.",
    hint: "Slow execution, high maintenance, and difficult failure localization.",
    level: "moderate",
    codeExample: "# E2E tests require full environment orchestration and take longer to run"
  },
  {
    question: "How do Unit Tests facilitate modular, decoupled software design?",
    shortAnswer: "In order to test a unit in isolation, code must be decoupled with Dependency Injection, clear interfaces, and single responsibilities, naturally resulting in cleaner software architecture.",
    explanation: "Testability promoting architectural loose coupling.",
    hint: "Writing unit tests forces you to decouple dependencies using dependency injection.",
    level: "moderate",
    codeExample: "# Dependency injection makes classes easy to test in isolation"
  },
  {
    question: "What is 'Sanity Testing' vs 'Smoke Testing'?",
    shortAnswer: "Smoke testing verifies basic overall system startup and core critical paths; sanity testing is a focused subset of tests run after a minor bugfix to verify that the specific fix works without re-testing everything.",
    explanation: "Broad shallow verification vs focused post-fix validation.",
    hint: "Smoke is broad basic health check; Sanity is quick validation of a specific bugfix.",
    level: "moderate",
    codeExample: "# Smoke: Can the server boot? Sanity: Did the fee calculation fix work?"
  },
  {
    question: "Why should tests avoid hardcoding absolute file paths?",
    shortAnswer: "Hardcoded absolute paths make tests fail on different operating systems (Windows vs Linux) or CI build runners; tests should use temporary directories ('tmp_path' / 'tempfile') or relative paths.",
    explanation: "Test portability across operating systems and CI environments.",
    hint: "Absolute paths break on other machines; use relative paths or temp files.",
    level: "basic",
    codeExample: "# BAD: '/home/user/test.txt' | GOOD: tmp_path / 'test.txt'"
  },
  {
    question: "What is 'Exploratory Testing' and how does it fit alongside automated testing?",
    shortAnswer: "Exploratory testing is simultaneous manual learning, test design, and test execution by human testers to discover unexpected edge cases and usability defects that automated scripted tests were not programmed to check.",
    explanation: "Human heuristic discovery complementing scripted automation.",
    hint: "Manual investigation by testers to discover subtle unexpected bugs.",
    level: "moderate",
    codeExample: "# Exploratory testing uncovers new scenarios to turn into automated tests"
  },
  {
    question: "What is the ultimate rule for structuring a balanced test suite in Python?",
    shortAnswer: "Follow the Testing Pyramid: build a solid foundation of hundreds of lightning-fast Unit Tests for algorithms and domain logic, a focused layer of Integration Tests for database/API boundaries, and a lean suite of E2E Functional Tests for critical user journeys.",
    explanation: "The complete enterprise testing architecture blueprint.",
    hint: "Many unit tests, moderate integration tests, few E2E tests.",
    level: "basic",
    codeExample: "# High-Performance Testing Pyramid Architecture"
  }
];

export default questions;
