const topic7_questions = [
  {
    "question": "What does the -XX:MetaspaceSize flag control in the JVM?",
    "shortAnswer": "It sets the initial High Watermark threshold. When Metaspace committed memory crosses this threshold, a Full GC is triggered to unload dead classes and reclaim native memory.",
    "explanation": "Increasing MetaspaceSize prevents premature Full GCs during application startup.",
    "hint": "Sets the initial GC high-watermark threshold for Metaspace.",
    "level": "Intermediate",
    "codeExample": "-XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=256m"
  },
  {
    "question": "What is the primary cause of 'java.lang.OutOfMemoryError: Metaspace' in enterprise applications?",
    "shortAnswer": "ClassLoader leaks, where hot-reloaded web applications or dynamic proxy libraries (CGLIB, ByteBuddy) create thousands of unique class definitions whose ClassLoaders cannot be garbage collected due to lingering static references.",
    "explanation": "Unreferenced classes cannot unload if their ClassLoader is still referenced.",
    "hint": "ClassLoader memory leaks and uncontrolled dynamic bytecode generation.",
    "level": "Advanced",
    "codeExample": "ClassLoader leak -> Class metadata accumulates -> Metaspace OOM"
  }
];

export default topic7_questions;
