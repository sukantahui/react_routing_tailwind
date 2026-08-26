const topic6_questions = [
  {
    "question": "Why does string concatenation in SQL queries degrade database memory and plan cache performance even if no hacker attacks the application?",
    "shortAnswer": "Because every query with different literal values produces a unique SQL string (e.g. 'WHERE id = 101' vs 'WHERE id = 102'). The database treats each as an entirely new query, generating thousands of unique query plans that flood and exhaust the database server's Plan Cache memory.",
    "explanation": "Known as Plan Cache Pollution.",
    "hint": "Floods the database Plan Cache with thousands of single-use execution plans.",
    "level": "Intermediate",
    "codeExample": "WHERE id = 101 vs WHERE id = 102 -> Two separate query plans in cache!"
  },
  {
    "question": "What is the primary defense recommended by OWASP for preventing SQL Injection in Java?",
    "shortAnswer": "Parameterized queries using java.sql.PreparedStatement or ORM query parameters.",
    "explanation": "OWASP Proactive Controls: Parameterize Queries.",
    "hint": "Parameterized queries with PreparedStatement.",
    "level": "Beginner",
    "codeExample": "OWASP Primary Defense: Parameterized Queries (PreparedStatements)."
  }
];

export default topic6_questions;
