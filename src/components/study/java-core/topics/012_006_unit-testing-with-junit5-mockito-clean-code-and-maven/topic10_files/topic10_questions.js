const topic10_questions = [
  {
    "question": "Why is it mandatory in TDD to verify that a test FAILS (Red) before writing production code?",
    "shortAnswer": "To prove that the test is actually executing, validly asserting behavior, and not giving a false positive pass (e.g. Due to an empty test method or tautological assertion).",
    "explanation": "Prevents false positive tests in TDD.",
    "hint": "Confirms the test actually validates what is missing and cannot pass vacuously.",
    "level": "Beginner",
    "codeExample": "@Test void testFailsInitially() { assertEquals(5, calc.add(2, 3)); }"
  },
  {
    "question": "What is the primary benefit of the 'Refactor' step in the TDD cycle?",
    "shortAnswer": "The safety net of green tests gives developers complete confidence to clean code smells, eliminate duplication, and improve architectural design without the fear of breaking working software.",
    "explanation": "Refactoring with test safety net.",
    "hint": "Allows continuous code improvements with zero fear of breaking features.",
    "level": "Intermediate",
    "codeExample": "// Clean code with passing tests"
  }
];

export default topic10_questions;
