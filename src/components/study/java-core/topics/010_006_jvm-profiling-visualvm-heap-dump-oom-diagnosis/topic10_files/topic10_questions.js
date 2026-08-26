const topic10_questions = [
  {
    "question": "What is the jcmd command to capture a live heap dump without restarting the JVM?",
    "shortAnswer": "jcmd <pid> GC.heap_dump <filepath.hprof> (for example: jcmd 8420 GC.heap_dump /tmp/dump.hprof).",
    "explanation": "Generates an instant HPROF snapshot for analysis in MAT or VisualVM.",
    "hint": "jcmd <pid> GC.heap_dump <filename.hprof>",
    "level": "Beginner",
    "codeExample": "jcmd 8420 GC.heap_dump /tmp/heap.hprof"
  },
  {
    "question": "How can you view the full list of diagnostic commands supported by a specific running JVM using jcmd?",
    "shortAnswer": "By running 'jcmd <pid> help'.",
    "explanation": "Displays all built-in and plugin diagnostic commands available on that process.",
    "hint": "jcmd <pid> help",
    "level": "Beginner",
    "codeExample": "jcmd 1234 help"
  }
];

export default topic10_questions;
