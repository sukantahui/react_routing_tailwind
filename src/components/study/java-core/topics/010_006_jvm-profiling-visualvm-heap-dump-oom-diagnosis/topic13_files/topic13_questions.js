const topic13_questions = [
  {
    "question": "What is the primary benefit of the -XX:+HeapDumpOnOutOfMemoryError JVM flag?",
    "shortAnswer": "It automatically saves a full binary snapshot (.hprof) of the entire Java heap at the exact instant an OutOfMemoryError occurs, enabling developers to perform post-mortem root cause analysis without needing to reproduce the crash.",
    "explanation": "Standard enterprise production best practice.",
    "hint": "Captures a full heap snapshot at the moment of OOM crash.",
    "level": "Beginner",
    "codeExample": "-XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/dumps/oom.hprof"
  },
  {
    "question": "What precaution must be taken when configuring -XX:HeapDumpPath in containerized Docker/Kubernetes environments?",
    "shortAnswer": "Ensure that the destination path is mapped to an external persistent volume or mounted host directory with sufficient disk space equal to or greater than the maximum heap size (-Xmx).",
    "explanation": "Otherwise the dump will be lost when the container is terminated.",
    "hint": "Map the path to a persistent volume with sufficient free disk space.",
    "level": "Intermediate",
    "codeExample": "Ensure disk space >= -Xmx size."
  }
];

export default topic13_questions;
