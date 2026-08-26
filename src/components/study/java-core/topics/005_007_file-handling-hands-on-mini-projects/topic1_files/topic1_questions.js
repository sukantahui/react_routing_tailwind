const topic1_questions = [
  {
    "question": "Why is 'Files.lines(path)' combined with Java Stream Collectors the optimal architectural pattern for parsing massive multi-gigabyte server log files?",
    "shortAnswer": "'Files.lines(path)' reads lines lazily from the underlying OS file descriptor on-demand without loading the full file into heap RAM. Java Stream Collectors ('groupingBy', 'counting') aggregate statistics (status codes, IP frequencies) in a single pass with constant O(1) memory consumption, enabling 10GB+ log files to be processed in seconds on a modest JVM heap.",
    "explanation": "Standard architecture for DevOps telemetry log analyzers.",
    "hint": "Streams lines lazily with O(1) memory, aggregating counts in a single efficient pass.",
    "level": "Advanced",
    "codeExample": "try (Stream<String> s = Files.lines(p)) { s.collect(Collectors.groupingBy(...)); }"
  }
];

export default topic1_questions;