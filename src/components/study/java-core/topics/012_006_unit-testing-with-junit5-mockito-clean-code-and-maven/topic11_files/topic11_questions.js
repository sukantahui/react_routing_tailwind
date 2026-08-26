const topic11_questions = [
  {
    "question": "What is the consequence of specifying <scope>test</scope> for a dependency in pom.xml?",
    "shortAnswer": "The dependency is placed on the classpath only during test compilation and execution, and is strictly excluded when packaging the production JAR/WAR artifact, keeping production binaries lightweight.",
    "explanation": "Maven dependency scope isolation.",
    "hint": "Excluded from the final production package, only available during test phase.",
    "level": "Beginner",
    "codeExample": "<dependency><groupId>org.junit.jupiter</groupId><scope>test</scope></dependency>"
  },
  {
    "question": "What does the -SNAPSHOT suffix indicate in a Maven version (e.g., 1.0.0-SNAPSHOT)?",
    "shortAnswer": "It indicates an active in-development, unreleased version. Maven will check the remote repository for updated snapshots on every build instead of caching it permanently like a release version.",
    "explanation": "Snapshot development builds in Maven.",
    "hint": "Indicates an active development build that can be updated continuously.",
    "level": "Intermediate",
    "codeExample": "<version>1.0.0-SNAPSHOT</version>"
  }
];

export default topic11_questions;
