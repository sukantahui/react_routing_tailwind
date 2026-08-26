const topic11_questions = [
  {
    "question": "Which tools and programmatic APIs are used to detect and diagnose deadlocks on a live production JVM server?",
    "shortAnswer": "1. 'CLI Diagnostic Tools': 'jcmd <PID> Thread.print' (preferred modern command) or 'jstack -l <PID>' captures a full JVM thread dump, where the HotSpot JVM automatically prints a dedicated 'Found one Java-level deadlock' summary section at the bottom. 2. 'GUI Profilers': VisualVM, JConsole, and IntelliJ Profiler highlight deadlocked threads in red. 3. 'Programmatic API': 'ManagementFactory.getThreadMXBean().findDeadlockedThreads()' queries the JVM MBean directly inside application health-check telemetry endpoints.",
    "explanation": "Production DevOps and JVM troubleshooting toolkit.",
    "hint": "jcmd Thread.print, jstack -l, and ManagementFactory.getThreadMXBean().findDeadlockedThreads().",
    "level": "Intermediate",
    "codeExample": "long[] deadlocks = ManagementFactory.getThreadMXBean().findDeadlockedThreads();"
  }
];

export default topic11_questions;