const topic9_questions = [
  {
    "question": "Why is HikariCP the default connection pool chosen by the Spring Boot team?",
    "shortAnswer": "Because independent benchmarks proved HikariCP is significantly faster, uses less memory, and exhibits virtually zero lock contention under heavy multi-threaded workloads compared to older pools like Commons DBCP, c3p0, and Tomcat JDBC.",
    "explanation": "Micro-benchmarked with Java Microbenchmark Harness (JMH).",
    "hint": "Fastest execution, lowest memory footprint, and zero lock contention.",
    "level": "Beginner",
    "codeExample": "Spring Boot default: HikariDataSource"
  },
  {
    "question": "What custom lock-free collection does HikariCP use to manage connection leasing without thread contention?",
    "shortAnswer": "ConcurrentBag, a specialized lock-free data structure that provides thread-local connection caching with work-stealing semantics.",
    "explanation": "Eliminates global lock synchronization when borrowing connections.",
    "hint": "ConcurrentBag",
    "level": "Advanced",
    "codeExample": "ConcurrentBag: ThreadLocal caching + work-stealing."
  }
];

export default topic9_questions;
