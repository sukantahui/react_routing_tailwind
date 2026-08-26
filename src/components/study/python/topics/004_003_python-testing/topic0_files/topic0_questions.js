// src/components/study/python/topics/004_003_python-testing/topic0_files/topic0_questions.js
// Comprehensive Master Review Questions for Topic 0: Why automated testing is mandatory for professional software

const questions = [
  {
    question: "Why is automated testing fundamentally superior to manual 'print()' debugging in professional software?",
    shortAnswer: "Automated tests execute deterministically in milliseconds, can be run automatically on every code commit in CI/CD pipelines, verify exact expected assertions, and permanently guard against regressions without relying on human vigilance.",
    explanation: "Deterministic repeatability and continuous quality gating.",
    hint: "Think about speed, repeatability, regression protection, and CI/CD automation.",
    level: "basic",
    codeExample: "# Automated assertions vs manual print inspections\nassert calculate_fee(5000, 0.1) == 4500.0"
  },
  {
    question: "What is a 'Regression' in software development?",
    shortAnswer: "A regression is a software defect where a previously working feature or logic gets broken unintentionally after adding new code, optimizing performance, or refactoring existing modules.",
    explanation: "Unintended degradation of existing working functionality.",
    hint: "A bug where previously working code breaks when new changes are made.",
    level: "basic",
    codeExample: "# Automated test suites catch regressions immediately upon code changes"
  },
  {
    question: "How does the 'Cost of Defect' curve behave as a bug moves from development to production?",
    shortAnswer: "The cost of fixing a bug increases exponentially: finding a bug during development costs minutes of developer time, in staging it costs hours of QA time, but in production it leads to data corruption, financial loss, brand damage, and emergency patching.",
    explanation: "Exponential cost progression of software defects across lifecycle stages.",
    hint: "Bugs caught early in development cost 10x-100x less to fix than in production.",
    level: "basic",
    codeExample: "# Catching bugs at dev time via automated tests saves exponential costs"
  },
  {
    question: "What does it mean for an automated test to be 'Deterministic'?",
    shortAnswer: "A deterministic test produces the exact same outcome (pass or fail) every single time it runs given the same input, with zero flakiness or dependence on external variable states like network latency or random time.",
    explanation: "Predictable, repeatable test execution without intermittent failures.",
    hint: "Produces identical results on every single run without random flakiness.",
    level: "moderate",
    codeExample: "# Deterministic: No unseeded random numbers or uncontrolled network dependencies"
  },
  {
    question: "What is the primary role of an 'Assertion' in Python testing?",
    shortAnswer: "An assertion evaluates a boolean condition; if the condition is True, execution proceeds smoothly, but if False, Python raises an 'AssertionError' with a descriptive error message indicating test failure.",
    explanation: "Contract verification and test failure triggering.",
    hint: "assert condition, 'Error message' raises AssertionError when condition is False.",
    level: "basic",
    codeExample: "assert student.status == 'ENROLLED', 'Student was not enrolled'"
  },
  {
    question: "Why should automated tests run in complete isolation from one another?",
    shortAnswer: "Test isolation ensures that state changes from one test (like modifying a database record or global variable) do not bleed into or corrupt subsequent tests, allowing tests to run in any order or in parallel.",
    explanation: "State encapsulation and prevention of test contamination.",
    hint: "Prevents one test's mutations from affecting or failing another test.",
    level: "moderate",
    codeExample: "# Clean up state before and after every test run"
  },
  {
    question: "How do automated tests act as 'Executable Documentation'?",
    shortAnswer: "Tests demonstrate exact real-world inputs, method calls, edge cases, and expected output values in actual executable code that never goes out of date because outdated test code immediately fails.",
    explanation: "Self-validating living specifications.",
    hint: "Tests show developers exactly how functions are meant to be called and expected outputs.",
    level: "moderate",
    codeExample: "# A test method clearly documents the behavior of discount rules"
  },
  {
    question: "What is a 'Quality Gate' in Continuous Integration (CI) pipelines?",
    shortAnswer: "A quality gate is an automated check (such as all tests passing with zero failures and meeting code coverage thresholds) that must succeed before code can be merged into the main branch or deployed.",
    explanation: "Automated deployment blockers based on test results.",
    hint: "An automated rule in CI (like GitHub Actions) preventing buggy code merges.",
    level: "basic",
    codeExample: "# GitHub Actions step: run: pytest"
  },
  {
    question: "Why can 'assert' statements in production application code be dangerous if Python is run with optimizations?",
    shortAnswer: "When Python is executed with the '-O' (optimize) flag, all built-in 'assert' statements are stripped out and ignored by the bytecode compiler, meaning critical business validation must use explicit 'if ... raise ValueError' checks.",
    explanation: "Bytecode stripping of assert statements during optimized execution.",
    hint: "Python -O removes assert statements; use explicit if-checks for runtime validation.",
    level: "complex",
    codeExample: "# In production logic: if fee < 0: raise ValueError('Invalid fee')\n# In test files: assert fee > 0"
  },
  {
    question: "What is the difference between a False Positive and a False Negative in automated testing?",
    shortAnswer: "A False Positive is when a test fails even though the code is correct (flaky test); a False Negative is when a test passes even though the code contains a serious bug (insufficient assertion).",
    explanation: "Test precision and sensitivity errors.",
    hint: "False positive: test fails on good code; False negative: test passes on buggy code.",
    level: "moderate",
    codeExample: "# High-quality tests minimize both false positives and false negatives"
  },
  {
    question: "What is the AAA pattern in automated test design?",
    shortAnswer: "Arrange (prepare the data, dependencies, and environment), Act (execute the function or method under test), and Assert (verify that the actual result matches the expected outcome).",
    explanation: "Standard structural template for clear, readable tests.",
    hint: "Arrange, Act, Assert.",
    level: "basic",
    codeExample: "# Arrange: s = Student('Mamata', 95)\n# Act: res = s.get_grade()\n# Assert: assert res == 'A+'"
  },
  {
    question: "Why is testing edge cases (boundary values) critical?",
    shortAnswer: "Bugs frequently cluster at operational boundaries (e.g. 0, -1, maximum values, empty lists, boundary thresholds like 74.9 vs 75.0) where developers make off-by-one errors with '>' vs '>='.",
    explanation: "Boundary value analysis and off-by-one fault localization.",
    hint: "Most bugs happen at boundary limits like 0, empty inputs, or exact threshold cutoffs.",
    level: "basic",
    codeExample: "assert get_tier(74.9) == 'SILVER'\nassert get_tier(75.0) == 'GOLD'"
  },
  {
    question: "What is 'Code Refactoring' and why is it virtually impossible without automated tests?",
    shortAnswer: "Refactoring is restructuring internal code without altering its external behavior; without tests, developers cannot verify whether optimizations or cleanups accidentally broke existing features.",
    explanation: "Safety net for structural codebase evolution.",
    hint: "Automated tests give developers confidence that cleanups didn't break functionality.",
    level: "basic",
    codeExample: "# Refactoring code with confidence when test suite passes green"
  },
  {
    question: "How do automated tests accelerate feature development velocity over time?",
    shortAnswer: "While writing tests takes slight initial time, it eliminates hours of repetitive manual testing, debugging regressions, and emergency hotfixes, allowing teams to ship updates rapidly with total confidence.",
    explanation: "Long-term velocity compounding vs short-term manual debt.",
    hint: "Automated tests prevent compounding technical debt and manual testing bottlenecks.",
    level: "moderate",
    codeExample: "# Fast test suite runs in 2 seconds vs 20 minutes manual UI clicking"
  },
  {
    question: "What is a 'Smoke Test'?",
    shortAnswer: "A preliminary subset of critical tests run first to verify that the core application builds and starts successfully before running full deep test suites.",
    explanation: "High-level sanity check for critical subsystem availability.",
    hint: "A fast high-level test ensuring the core app doesn't crash on startup.",
    level: "basic",
    codeExample: "# Smoke test: assert app.health_check() == 200"
  },
  {
    question: "Why should test code be maintained to the same high clean-code standards as production code?",
    shortAnswer: "Poorly written, brittle test code becomes difficult to understand and maintain, leading developers to disable or ignore failing tests rather than fixing real bugs.",
    explanation: "Test maintainability and preventing test suite decay.",
    hint: "Messy tests become technical debt and get deleted or ignored.",
    level: "moderate",
    codeExample: "# Clean, descriptive, self-contained test helper methods"
  },
  {
    question: "What is 'Flakiness' in testing and why is it dangerous?",
    shortAnswer: "A flaky test intermittently passes or fails without any code changes; it destroys developer trust in the test suite, causing engineers to overlook genuine production regressions.",
    explanation: "Non-deterministic test failures eroding developer confidence.",
    hint: "Intermittent random test failures that erode trust in the test suite.",
    level: "complex",
    codeExample: "# Flaky: sleep(1) instead of polling for actual state readiness"
  },
  {
    question: "How do automated tests enable fearless dependency upgrades (e.g. updating Python or libraries)?",
    shortAnswer: "Running the comprehensive test suite after upgrading Python or third-party packages immediately highlights breaking API changes or behavioral discrepancies across the application.",
    explanation: "Ecosystem migration safety and compatibility verification.",
    hint: "Tests verify that updating libraries didn't break application behavior.",
    level: "basic",
    codeExample: "# Upgrade dependency -> run pytest -> verify all green"
  },
  {
    question: "What is the relationship between automated testing and software architecture modularity?",
    shortAnswer: "Code that is easy to test requires low coupling, dependency injection, and clean separation of concerns, naturally driving developers toward superior modular software architecture.",
    explanation: "Testability driving clean architectural decoupling.",
    hint: "Writing tests forces code to be modular, loosely coupled, and well-structured.",
    level: "moderate",
    codeExample: "# Decoupled services are simple to instantiate and test in isolation"
  },
  {
    question: "What is the ultimate golden rule of professional software testing?",
    shortAnswer: "Never consider a feature or bugfix complete until it is accompanied by deterministic automated tests that prove it works, handle edge cases, and permanently prevent future regressions.",
    explanation: "The foundational principle of software engineering professionalism.",
    hint: "Code without automated tests is unfinished and vulnerable to silent breakage.",
    level: "basic",
    codeExample: "# Professional Standard: Code + Automated Tests = Production Ready"
  }
];

export default questions;
