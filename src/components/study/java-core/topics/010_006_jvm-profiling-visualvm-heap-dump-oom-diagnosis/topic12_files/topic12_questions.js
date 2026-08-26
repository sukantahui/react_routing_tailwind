const topic12_questions = [
  {
    "question": "What is the difference between CPU Sampling and CPU Profiling in VisualVM?",
    "shortAnswer": "CPU Sampling takes periodic thread stack snapshots with minimal performance overhead (~2-5%), making it safe for production diagnosis. CPU Profiling instruments bytecode at every method entry and exit, providing exact nanosecond timings but incurring severe performance slowdown (up to 10x).",
    "explanation": "Never run full instrumentation profiling on live production servers.",
    "hint": "Sampling is low-overhead periodic polling; Profiling instruments bytecode with high overhead.",
    "level": "Intermediate",
    "codeExample": "Sampling: Safe for staging/prod; Instrumentation: Dev only."
  },
  {
    "question": "What protocol allows VisualVM and JConsole to monitor remote JVM instances running on cloud servers?",
    "shortAnswer": "Java Management Extensions (JMX) protocol, configured via system properties such as -Dcom.sun.management.jmxremote.port.",
    "explanation": "Standard remote management and telemetry protocol in Java.",
    "hint": "Java Management Extensions (JMX).",
    "level": "Beginner",
    "codeExample": "-Dcom.sun.management.jmxremote.port=9010"
  }
];

export default topic12_questions;
