const topic7_questions = [
  {
    "question": "What actually happens when an application calls connection.close() on a connection obtained from a connection pool?",
    "shortAnswer": "The connection pool proxy intercepts the close() invocation, resets any modified session parameters (such as auto-commit status), and returns the underlying physical connection to the idle pool for reuse, rather than closing the physical TCP socket.",
    "explanation": "Keeps the socket connection warm for the next request.",
    "hint": "Returns the connection to the idle pool rather than closing the physical socket.",
    "level": "Beginner",
    "codeExample": "conn.close(); // Proxy returns connection back to HikariCP pool"
  },
  {
    "question": "What is the typical connection acquisition latency when using a high-performance connection pool compared to direct DriverManager?",
    "shortAnswer": "A high-performance connection pool provides connection leasing in microseconds (under 0.01ms), compared to 50–200ms when establishing a new physical connection via DriverManager.",
    "explanation": "Multi-thousand-fold speedup.",
    "hint": "Microseconds (<0.01ms) versus 50-200ms.",
    "level": "Intermediate",
    "codeExample": "Pool lease: 0.002ms; DriverManager: 100ms."
  }
];

export default topic7_questions;
