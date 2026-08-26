const topic15_questions = [
  {
    "question": "Why do enterprise Spring Boot applications often trigger multiple Full GCs during startup if -XX:MetaspaceSize is not tuned?",
    "shortAnswer": "Because the default -XX:MetaspaceSize is very small (~21MB). As Spring loads thousands of classes and generated proxies during startup, it repeatedly crosses this initial watermark threshold, forcing the JVM to perform Full GCs before raising the watermark.",
    "explanation": "Setting -XX:MetaspaceSize=128m eliminates startup GC thrashing.",
    "hint": "Default MetaspaceSize is ~21MB, which is quickly exceeded during startup.",
    "level": "Intermediate",
    "codeExample": "-XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=256m"
  },
  {
    "question": "What happens if Metaspace allocations exceed -XX:MaxMetaspaceSize?",
    "shortAnswer": "The JVM throws java.lang.OutOfMemoryError: Metaspace and fails further class loading.",
    "explanation": "Protects the host OS from runaway memory consumption.",
    "hint": "Throws java.lang.OutOfMemoryError: Metaspace.",
    "level": "Beginner",
    "codeExample": "throws java.lang.OutOfMemoryError: Metaspace"
  }
];

export default topic15_questions;
