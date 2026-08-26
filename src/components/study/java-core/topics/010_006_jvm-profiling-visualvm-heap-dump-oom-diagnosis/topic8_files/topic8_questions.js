const topic8_questions = [
  {
    "question": "Which modern JDK command-line tool consolidates the functionality of jstack, jmap, and jinfo?",
    "shortAnswer": "jcmd, the official all-in-one JVM diagnostic tool that sends control commands directly to the running HotSpot JVM process.",
    "explanation": "Recommended by Oracle for all modern JDK troubleshooting.",
    "hint": "jcmd",
    "level": "Beginner",
    "codeExample": "jcmd <pid> Thread.print / GC.heap_dump / VM.flags"
  },
  {
    "question": "How do JDK diagnostic tools connect to a running JVM process on the same machine?",
    "shortAnswer": "Via the JVM Dynamic Attach API, which uses local OS domain sockets or named pipes located in the system temporary directory (/tmp or %TEMP%).",
    "explanation": "Enables zero-overhead dynamic diagnostics without pre-attaching agents.",
    "hint": "Uses the JVM Attach API over local OS sockets.",
    "level": "Advanced",
    "codeExample": "Communicates via local domain socket in /tmp/hsperfdata_<user>/"
  }
];

export default topic8_questions;
