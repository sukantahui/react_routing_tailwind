const topic13_questions = [
  {
    "question": "What is the benefit of enabling -XX:+AlwaysPreTouch in latency-sensitive Java applications?",
    "shortAnswer": "It forces the operating system to pre-allocate and touch all physical RAM pages for the entire heap during JVM startup, eliminating OS page-fault latency spikes when memory is first accessed during live production user traffic.",
    "explanation": "Trades slightly slower startup time for consistent runtime latency.",
    "hint": "Eliminates OS page-fault latency during production traffic by pre-allocating RAM at boot.",
    "level": "Advanced",
    "codeExample": "-Xms8g -Xmx8g -XX:+AlwaysPreTouch"
  },
  {
    "question": "Why should containerized Java applications in Kubernetes use -XX:+ExitOnOutOfMemoryError?",
    "shortAnswer": "Because an application that encounters an OutOfMemoryError is in an indeterminate, corrupted state. Exiting immediately allows Kubernetes liveness probes to detect pod death and automatically restart a fresh, healthy replica.",
    "explanation": "Implements the 'crash-only software' resilience philosophy.",
    "hint": "Allows Kubernetes to immediately restart a fresh replica when an OOM occurs.",
    "level": "Intermediate",
    "codeExample": "-XX:+ExitOnOutOfMemoryError"
  }
];

export default topic13_questions;
