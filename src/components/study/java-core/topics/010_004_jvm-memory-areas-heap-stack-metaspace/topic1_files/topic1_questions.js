const topic1_questions = [
  {
    "question": "Is Metaspace subject to Java Garbage Collection?",
    "shortAnswer": "Yes. When a ClassLoader becomes unreachable and has zero live instances of its loaded classes on the heap, the JVM garbage collector reclaims the associated class metadata from Metaspace (Class Unloading).",
    "explanation": "Crucial for application servers reloading web applications.",
    "hint": "Yes, reclaimed during Full GC when ClassLoaders become dead.",
    "level": "Intermediate",
    "codeExample": "Dead ClassLoader -> Metaspace metadata unloads during Full GC."
  },
  {
    "question": "What JVM flag sets the upper limit on Metaspace memory to prevent memory exhaustion?",
    "shortAnswer": "-XX:MaxMetaspaceSize=<size>, for example: -XX:MaxMetaspaceSize=512m.",
    "explanation": "By default, Metaspace has no upper limit and can consume all available OS RAM.",
    "hint": "-XX:MaxMetaspaceSize",
    "level": "Beginner",
    "codeExample": "java -XX:MaxMetaspaceSize=256m -jar app.jar"
  }
];

export default topic1_questions;
