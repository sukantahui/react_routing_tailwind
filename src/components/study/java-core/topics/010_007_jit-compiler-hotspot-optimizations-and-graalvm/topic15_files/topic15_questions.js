const topic15_questions = [
  {
    "question": "What is the Closed-World Assumption in GraalVM Native Image?",
    "shortAnswer": "The architectural rule that all code that can possibly execute at runtime must be discovered and compiled ahead-of-time during build time. Any class or method accessed dynamically via reflection without explicit pre-registration is excluded from the binary.",
    "explanation": "Core principle enabling whole-program static analysis and dead code elimination.",
    "hint": "All code that can ever run must be known and registered at build time.",
    "level": "Intermediate",
    "codeExample": "Closed-World Assumption: Unregistered reflection fails at runtime."
  },
  {
    "question": "How does the GraalVM Tracing Agent simplify configuring reflection and dynamic proxies for Native Image?",
    "shortAnswer": "By attaching to a regular JVM execution (-agentlib:native-image-agent=config-output-dir=...) during integration testing, it intercepts and records all runtime reflection, proxy, resource, and JNI calls, automatically generating the required JSON configuration files.",
    "explanation": "Eliminates tedious manual JSON metadata creation.",
    "hint": "Runs on standard JVM and automatically writes reflect-config.json and proxy-config.json.",
    "level": "Advanced",
    "codeExample": "java -agentlib:native-image-agent=config-output-dir=src/main/resources/META-INF/native-image -jar app.jar"
  }
];

export default topic15_questions;
