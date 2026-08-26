const topic0_questions = [
  {
    "question": "What is a regression bug and how do automated unit tests prevent it?",
    "shortAnswer": "A regression bug is an unexpected defect introduced into previously working features when new code or refactoring is performed. Automated unit test suites execute in seconds on every build, immediately catching regressions before code is merged.",
    "explanation": "Primary purpose of CI/CD automated test suites.",
    "hint": "Defect introduced into previously working features caught by automated test suites.",
    "level": "Beginner",
    "codeExample": "mvn clean test"
  },
  {
    "question": "What is the FIRST principle of Unit Testing?",
    "shortAnswer": "F.I.R.S.T.: Fast (runs in milliseconds), Independent (no test order dependency), Repeatable (same result in any environment), Self-validating (boolean pass/fail without manual inspection), Timely (written alongside or before production code).",
    "explanation": "Standard industry test quality acronym.",
    "hint": "Fast, Independent, Repeatable, Self-validating, Timely.",
    "level": "Intermediate",
    "codeExample": "// F.I.R.S.T. Principles Guide Quality Tests"
  }
];

export default topic0_questions;
