// src/components/study/python/topics/004_003_python-testing/topic8_files/topic8_questions.js
// Comprehensive Master Review Questions for Topic 8: Introduction to Test-Driven Development (TDD) workflow

const questions = [
  {
    question: "What is Test-Driven Development (TDD) and what is its core philosophy?",
    shortAnswer: "TDD is a software engineering practice where unit tests are written BEFORE writing the production code, using the tests as executable specifications to drive software design, ensure high modularity, and guarantee high test coverage.",
    explanation: "Core definition and philosophy of TDD.",
    hint: "Writing failing tests first to guide and drive the implementation of production code.",
    level: "basic",
    codeExample: "# 1. Write failing test -> 2. Write minimum code -> 3. Refactor"
  },
  {
    question: "What are the three distinct phases of the TDD 'Red-Green-Refactor' micro-cycle?",
    shortAnswer: "1. 🔴 RED: Write a failing unit test for a new feature requirement. 2. 🟢 GREEN: Write the minimum necessary production code to make the test pass. 3. 🔵 REFACTOR: Clean up code structure and remove duplication while keeping tests green.",
    explanation: "The foundational Red-Green-Refactor rhythm of TDD.",
    hint: "RED = failing test, GREEN = make it pass, REFACTOR = clean code while green.",
    level: "basic",
    codeExample: "# RED: test fails | GREEN: test passes | REFACTOR: clean design"
  },
  {
    question: "What are the 'Three Laws of TDD' formulated by Robert C. Martin (Uncle Bob)?",
    shortAnswer: "1. You may not write any production code unless it is to pass a failing unit test. 2. You may not write more of a unit test than is sufficient to fail. 3. You may not write more production code than is sufficient to pass the currently failing test.",
    explanation: "Uncle Bob's foundational Three Laws of TDD.",
    hint: "1. No code without a failing test, 2. Only enough test to fail, 3. Only enough code to pass.",
    level: "moderate",
    codeExample: "# The Three Laws of TDD govern the baby-step rhythm of TDD"
  },
  {
    question: "Why is it mandatory to see a test FAIL (RED) before writing production code in TDD?",
    shortAnswer: "Seeing the test fail proves that the test actually executes, that the assertion is capable of detecting a defect, and that the test is not giving a false positive pass due to flawed test logic.",
    explanation: "Proving test efficacy and eliminating false positive passes.",
    hint: "Confirms that the test is capable of catching errors and isn't passing accidentally.",
    level: "basic",
    codeExample: "# Verify test fails for the expected reason before implementing logic"
  },
  {
    question: "What does 'Write the Minimum Code to Pass' mean during the GREEN phase?",
    shortAnswer: "Implement only the simplest, most straightforward code necessary to make the failing test pass (even hardcoding return values initially if appropriate), avoiding premature optimization or speculative features.",
    explanation: "Simplicity and avoiding over-engineering in the GREEN phase.",
    hint: "Do not write complex abstractions or extra features; write just enough code to turn the test green.",
    level: "basic",
    codeExample: "# If test asserts 2+2==4, return 4; then write next test with different inputs"
  },
  {
    question: "What is the purpose of the REFACTOR phase in TDD and when should it happen?",
    shortAnswer: "The REFACTOR phase is where developers eliminate code duplication, improve variable names, extract helper functions, and optimize algorithms with the 100% confidence that the existing green test harness will immediately catch regressions.",
    explanation: "Safe architectural cleanup under green test protection.",
    hint: "Refactoring cleans code without changing external behavior, protected by passing tests.",
    level: "basic",
    codeExample: "# Improve naming, eliminate duplication, extract classes while tests stay green"
  },
  {
    question: "How does TDD prevent 'Over-Engineering' and uphold the YAGNI principle (You Aren't Gonna Need It)?",
    shortAnswer: "Because developers are forbidden from writing production code without a corresponding failing test specification, code is only written to satisfy real, tested requirements rather than speculative future possibilities.",
    explanation: "YAGNI compliance through test-directed scope constraint.",
    hint: "Stops you from building speculative unused features because every line must satisfy a test.",
    level: "moderate",
    codeExample: "# Only write what is requested by the current failing test"
  },
  {
    question: "How does TDD compare to 'Test-Last' (writing tests after writing all production code)?",
    shortAnswer: "Writing tests last often produces hard-to-test monolithic code, incomplete edge case coverage, and tests biased to match existing implementation quirks; TDD forces modular, decoupled, testable API design from day one.",
    explanation: "Design pressure of TDD vs retrospective test writing.",
    hint: "TDD designs testable APIs upfront; Test-Last often struggles with tightly coupled code.",
    level: "moderate",
    codeExample: "# TDD drives clean API contracts; Test-Last tests whatever was already built"
  },
  {
    question: "What is 'Baby Steps' in TDD and why is it recommended for complex algorithms?",
    shortAnswer: "Baby steps involve writing tiny incremental test cases (e.g. testing 0 inputs first, then 1 item, then multiple items, then edge cases), allowing developers to build complex logic systematically without becoming overwhelmed by debugging large chunks of code.",
    explanation: "Incremental algorithmic development via micro-specifications.",
    hint: "Start with trivial inputs (0, empty, 1 item) and build up complexity gradually.",
    level: "basic",
    codeExample: "# 1. test_empty_list() -> 2. test_single_item() -> 3. test_multiple_items()"
  },
  {
    question: "How does TDD serve as 'Executable Documentation' for other developers on the team?",
    shortAnswer: "TDD test suites explicitly document how functions, classes, and APIs are expected to be instantiated, called, and what outputs/exceptions they produce under every known scenario, serving as living documentation that never goes out of date.",
    explanation: "Living specifications and self-documenting codebases.",
    hint: "Tests show exact real-world usage examples and contract expectations.",
    level: "basic",
    codeExample: "# Reading test_admit_student() shows exactly how to use AdmissionEngine"
  },
  {
    question: "What is the 'Transformation Priority Premise' (TPP) in TDD?",
    shortAnswer: "A concept proposed by Uncle Bob suggesting that during the GREEN phase, code should progress through simpler transformations (e.g. constant -> variable -> conditional -> loop -> recursion) to avoid taking overly large algorithmic jumps.",
    explanation: "Algorithmic transformation hierarchy in TDD.",
    hint: "Prefer simple transformations (like variables or if statements) before adding complex loops.",
    level: "complex",
    codeExample: "# Transform constant -> variable -> if/else -> loop"
  },
  {
    question: "What should you do if a test fails unexpectedly during the REFACTOR phase?",
    shortAnswer: "Immediately revert the refactoring change (e.g. 'git checkout' or undo), return to a known green state, and retry the refactoring in smaller, safer incremental steps.",
    explanation: "Disciplined recovery during refactoring regressions.",
    hint: "Undo the edit immediately to return to GREEN, then take smaller steps.",
    level: "basic",
    codeExample: "# Never continue refactoring on a RED test suite! Return to GREEN first."
  },
  {
    question: "Can TDD be practiced effectively when building GUI frontend applications?",
    shortAnswer: "Yes, by separating business domain logic, state management, and calculation engines from UI rendering, practicing strict TDD on the core logic and using component testing libraries for views.",
    explanation: "Separation of concerns enabling TDD in frontend/full-stack architectures.",
    hint: "Separate business state from UI rendering and drive state transitions with TDD.",
    level: "moderate",
    codeExample: "# TDD student_ledger_state.js independently of React DOM rendering"
  },
  {
    question: "What is the role of Mocking in a TDD workflow?",
    shortAnswer: "In TDD (especially the London/Mockist school), mocks allow developers to define the interface contracts between collaborating objects and external services before those services are even implemented.",
    explanation: "Outside-in TDD and interface discovery via test doubles.",
    hint: "Mocks let you design interfaces for external dependencies before implementing them.",
    level: "moderate",
    codeExample: "# Mocks help define external collaborators during outside-in TDD"
  },
  {
    question: "What is the difference between 'Inside-Out' (Chicago / Classicist) and 'Outside-In' (London / Mockist) TDD?",
    shortAnswer: "Inside-Out starts by driving core domain models and pure algorithmic units first, working outwards toward API layers; Outside-In starts at user boundaries/entry points with mock doubles, discovering internal component contracts downwards.",
    explanation: "Classicist vs Mockist TDD schools of thought.",
    hint: "Inside-Out starts with core data models; Outside-In starts at the user interface/API boundary.",
    level: "complex",
    codeExample: "# Inside-Out: Student -> Ledger -> AdmissionEngine | Outside-In: API -> Engine -> Storage"
  },
  {
    question: "Why is TDD considered a design technique rather than just a testing technique?",
    shortAnswer: "Because writing tests first forces the developer to think about API usability, naming, loose coupling, and modularity from the client's perspective before getting lost in implementation details.",
    explanation: "Design feedback loops driven by test-first engineering.",
    hint: "Writing tests first forces you to design clean, caller-friendly APIs before writing code.",
    level: "basic",
    codeExample: "# Design API from the caller's perspective first"
  },
  {
    question: "How does TDD impact long-term debugging time and defect resolution costs?",
    shortAnswer: "TDD catches defects within seconds of creation at the developer's workstation, reducing production bugs by 40-80% and drastically cutting expensive post-deployment debugging cycles.",
    explanation: "Defect reduction economics and ROI of TDD.",
    hint: "Bugs are caught immediately within seconds, preventing expensive production debugging.",
    level: "basic",
    codeExample: "# Defects caught within 5 seconds of writing the code"
  },
  {
    question: "What is a common pitfall for developers beginning TDD?",
    shortAnswer: "Writing tests that are too large (taking giant leaps instead of baby steps), or jumping ahead to write production code before having a clean, failing test specification.",
    explanation: "Common beginner TDD anti-patterns.",
    hint: "Writing huge tests or writing code before having a failing test.",
    level: "basic",
    codeExample: "# Take small, bite-sized baby steps"
  },
  {
    question: "How do you know when you are done implementing a feature in TDD?",
    shortAnswer: "When all acceptance criteria have corresponding passing unit tests, all edge cases and boundary conditions are covered, code is cleanly refactored, and all tests in the suite are green.",
    explanation: "Definition of done in TDD workflows.",
    hint: "When all requirements have green tests, edge cases are covered, and code is refactored.",
    level: "basic",
    codeExample: "# All acceptance tests passing + clean refactored code = Done"
  },
  {
    question: "What is the ultimate golden rule of Test-Driven Development?",
    shortAnswer: "Never write a single line of production code without a failing unit test to justify it, keep micro-cycles short (seconds, not hours), and refactor ruthlessly under the safety of a 100% green test suite.",
    explanation: "The complete enterprise TDD standard.",
    hint: "Never code without a failing test, keep cycles fast, refactor while green.",
    level: "basic",
    codeExample: "# Enterprise Test-Driven Development Standard"
  }
];

export default questions;
