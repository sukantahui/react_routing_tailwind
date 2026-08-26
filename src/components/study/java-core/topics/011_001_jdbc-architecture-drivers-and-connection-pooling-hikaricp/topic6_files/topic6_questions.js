const topic6_questions = [
  {
    "question": "Why is calling DriverManager.getConnection() on every incoming HTTP request considered a severe architectural anti-pattern in production web applications?",
    "shortAnswer": "Because creating a physical database connection involves heavy network latency (TCP 3-way handshake, TLS cryptographic handshake, user authentication, and DB server worker process spawning), adding 50–200ms of latency per request and quickly exhausting database server connection limits.",
    "explanation": "Connection creation is one of the most expensive operations in enterprise computing.",
    "hint": "High latency (TCP/TLS/Auth) and database server process exhaustion.",
    "level": "Beginner",
    "codeExample": "Anti-pattern: creating new physical connection on every HTTP request."
  },
  {
    "question": "What error occurs on the database server when too many applications open unpooled direct connections simultaneously?",
    "shortAnswer": "The database server rejects connections and throws errors such as 'Too many connections' (MySQL error 1040) or 'FATAL: sorry, too many clients already' (PostgreSQL), crashing application traffic.",
    "explanation": "Databases have strict concurrent connection limits.",
    "hint": "MySQL 'Too many connections' error 1040.",
    "level": "Intermediate",
    "codeExample": "java.sql.SQLException: Too many connections (MySQL 1040)"
  }
];

export default topic6_questions;
