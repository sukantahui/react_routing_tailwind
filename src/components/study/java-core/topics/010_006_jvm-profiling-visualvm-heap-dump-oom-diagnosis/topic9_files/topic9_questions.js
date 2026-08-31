const topic9_questions = [
  {
    "question": "What does the -l flag do when executing jps in a terminal?",
    "shortAnswer": "It displays the full package name of the application's main class or the full path to the executed JAR file instead of just the simple class name.",
    "explanation": "Essential for distinguishing between multiple running services.",
    "hint": "Prints the full package name or JAR file path.",
    "level": "Beginner",
    "codeExample": "jps -l → 14920 com.company.payment.PaymentApplication"
  },
  {
    "question": "Why might jps fail to list a running Java process on a Linux server?",
    "shortAnswer": "If jps is executed by a different Linux user than the user running the target Java process, or if the process was started with the -XX:+PerfDisableSharedMem flag which prevents writing to /tmp/hsperfdata.",
    "explanation": "Ensure matching user permissions or run with sudo -u <appuser>.",
    "hint": "User permission mismatch or -XX:+PerfDisableSharedMem enabled.",
    "level": "Intermediate",
    "codeExample": "sudo -u appuser jps -lv"
  }
];

export default topic9_questions;
