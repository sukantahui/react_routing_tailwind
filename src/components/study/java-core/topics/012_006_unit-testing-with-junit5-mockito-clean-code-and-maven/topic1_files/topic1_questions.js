const topic1_questions = [
  {
    "question": "Why did JUnit 5 separate the test engine into Platform and Jupiter?",
    "shortAnswer": "To decouple the test discovery/execution runtime (Platform) from the authoring programming model (Jupiter), allowing third-party testing frameworks (Spock, TestNG, Cucumber) to run seamlessly on the same unified platform.",
    "explanation": "Modular extensible design of JUnit 5.",
    "hint": "Decouples test execution runtime from authoring framework API.",
    "level": "Intermediate",
    "codeExample": "org.junit.jupiter.api.Test vs org.junit.platform.launcher.Launcher"
  },
  {
    "question": "What is the purpose of the JUnit Vintage module?",
    "shortAnswer": "JUnit Vintage provides a TestEngine that allows legacy JUnit 3 and JUnit 4 test suites to run alongside modern JUnit 5 tests without rewriting existing test classes.",
    "explanation": "Backward compatibility layer.",
    "hint": "Runs legacy JUnit 3/4 tests on JUnit 5 Platform.",
    "level": "Beginner",
    "codeExample": "junit-vintage-engine dependency in pom.xml"
  }
];

export default topic1_questions;
