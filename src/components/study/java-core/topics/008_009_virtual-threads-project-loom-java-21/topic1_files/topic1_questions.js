const topic1_questions = [
  {
    "question": "Why does the traditional 'Thread-per-Request' architecture (e.g. standard Tomcat with 200 worker threads) fail under high concurrent I/O workloads?",
    "shortAnswer": "In the Thread-per-Request model, each incoming HTTP request ties up one dedicated OS platform thread from the pool (default 200 threads). When handling I/O-bound tasks (e.g. database queries or third-party REST calls taking 200ms), all 200 threads block and sleep waiting for network packets. While the CPU cores sit nearly idle (e.g. 5% CPU utilization), all threads are occupied, causing subsequent incoming requests to queue up, time out, and fail with HTTP 503 errors (Thread Starvation).",
    "explanation": "Analysis of traditional I/O blocking bottlenecks in enterprise Java web applications.",
    "hint": "Threads block on I/O while doing zero CPU work, exhausting the thread pool and rejecting incoming users.",
    "level": "Intermediate",
    "codeExample": "// Tomcat maxThreads=200 → 201st concurrent blocking request must wait in queue!"
  }
];

export default topic1_questions;