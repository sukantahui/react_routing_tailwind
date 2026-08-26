const topic1_questions = [
  {
    "question": "What is the crucial connection property in MySQL Connector/J that maximizes batch insert performance?",
    "shortAnswer": "rewriteBatchedStatements=true (e.g. jdbc:mysql://localhost:3306/db?rewriteBatchedStatements=true).",
    "explanation": "Rewrites individual batch inserts into consolidated multi-row SQL INSERT statements.",
    "hint": "rewriteBatchedStatements=true",
    "level": "Intermediate",
    "codeExample": "jdbc:mysql://localhost:3306/academy?rewriteBatchedStatements=true"
  },
  {
    "question": "Why is PreparedStatement batching superior to Statement batching for bulk data loading?",
    "shortAnswer": "Because PreparedStatement compiles the SQL query once on the database server, sending only binary parameter values in each batch, whereas Statement sends full SQL text strings for every operation.",
    "explanation": "Pre-compilation and compact binary serialization save bandwidth and CPU.",
    "hint": "PreparedStatement sends only binary parameters for a pre-compiled query.",
    "level": "Intermediate",
    "codeExample": "PreparedStatement compiles once; Statement re-parses every SQL string."
  }
];

export default topic1_questions;
