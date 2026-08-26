const topic14_questions = [
  {
    "question": "What does the -Xmn JVM flag configure?",
    "shortAnswer": "It sets the initial and maximum size of the Young Generation directly (Eden + S0 + S1). Setting -Xmn overrides the default NewRatio calculation.",
    "explanation": "Useful for tuning high-allocation throughput microservices.",
    "hint": "Sets the size of the Young Generation directly.",
    "level": "Intermediate",
    "codeExample": "java -Xms4g -Xmx4g -Xmn2g -jar app.jar"
  },
  {
    "question": "What modern JVM flag automatically sizes heap limits based on Docker container cgroup memory limits?",
    "shortAnswer": "-XX:MaxRAMPercentage=<percent> (e.g. -XX:MaxRAMPercentage=75.0), introduced in Java 10+ to make JVMs container-aware automatically.",
    "explanation": "Eliminates hardcoded -Xmx values across different container sizes.",
    "hint": "-XX:MaxRAMPercentage",
    "level": "Intermediate",
    "codeExample": "java -XX:MaxRAMPercentage=75.0 -jar app.jar"
  }
];

export default topic14_questions;
