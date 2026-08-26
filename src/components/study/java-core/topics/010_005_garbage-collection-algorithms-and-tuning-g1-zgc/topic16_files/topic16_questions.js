const topic16_questions = [
  {
    "question": "What replaced legacy flags like -XX:+PrintGCDetails and -XX:+PrintGCTimeStamps in Java 9+?",
    "shortAnswer": "The Unified JVM Logging framework using the -Xlog command-line option (e.g. -Xlog:gc*:file=gc.log:time,uptime:filecount=5,filesize=100m).",
    "explanation": "Standardized logging across all JVM subsystems (gc, class, safepoint, os).",
    "hint": "Unified JVM Logging option -Xlog.",
    "level": "Beginner",
    "codeExample": "-Xlog:gc*:file=gc.log:time,uptime:filecount=5,filesize=100m"
  },
  {
    "question": "How do you configure automatic log file rotation in the -Xlog framework?",
    "shortAnswer": "By specifying the filecount and filesize output options, such as 'filecount=5,filesize=100m', which limits individual log files to 100MB and retains a rolling window of 5 files.",
    "explanation": "Prevents GC logs from filling up server disk space.",
    "hint": "Using filecount=N and filesize=M options.",
    "level": "Intermediate",
    "codeExample": "-Xlog:gc:file=gc.log::filecount=5,filesize=50m"
  }
];

export default topic16_questions;
