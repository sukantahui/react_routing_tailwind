const topic11_questions = [
  {
    "question": "List 3 real-world production use cases where a background thread SHOULD be configured as a Daemon thread.",
    "shortAnswer": "1. 'JVM Infrastructure Services': Garbage Collection (GC) threads, JIT compilation background threads, and object finalizers. 2. 'Health & Metrics Monitoring': background telemetry daemons polling CPU/Heap memory stats or reporting metrics to Prometheus/Datadog. 3. 'Cache Eviction & Idle Resource Cleanup': timers that periodically purge expired cache entries or close idle database connection pools without blocking application shutdown.",
    "explanation": "Real-world architecture and production use cases for daemon threads.",
    "hint": "JVM garbage collector, background memory/health monitors, and cache eviction timers.",
    "level": "Intermediate",
    "codeExample": "Thread monitor = new Thread(telemetryTask); monitor.setDaemon(true); monitor.start();"
  }
];

export default topic11_questions;