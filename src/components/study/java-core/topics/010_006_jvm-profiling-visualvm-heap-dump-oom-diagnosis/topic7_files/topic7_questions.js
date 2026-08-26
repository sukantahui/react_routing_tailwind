const topic7_questions = [
  {
    "question": "What exception occurs when an application leaks file input streams and network sockets without closing them?",
    "shortAnswer": "java.io.IOException: Too many open files, caused by exhausting the operating system process file descriptor limit (ulimit -n).",
    "explanation": "Every open file, socket, and pipe consumes an OS file descriptor.",
    "hint": "java.io.IOException: Too many open files",
    "level": "Beginner",
    "codeExample": "throws IOException('Too many open files')"
  },
  {
    "question": "What JVM flag sets an upper limit on Direct Off-Heap ByteBuffer allocations?",
    "shortAnswer": "-XX:MaxDirectMemorySize=<size> (e.g. -XX:MaxDirectMemorySize=512m).",
    "explanation": "Defaults to the maximum heap size (-Xmx) if omitted.",
    "hint": "-XX:MaxDirectMemorySize",
    "level": "Intermediate",
    "codeExample": "java -XX:MaxDirectMemorySize=512m -jar kafka-app.jar"
  }
];

export default topic7_questions;
