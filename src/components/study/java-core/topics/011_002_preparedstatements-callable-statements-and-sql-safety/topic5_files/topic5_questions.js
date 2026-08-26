const topic5_questions = [
  {
    "question": "What are the two caching layers that accelerate PreparedStatement executions in enterprise systems?",
    "shortAnswer": "1. Server-side Query Plan Caching (where the database engine caches the parsed execution plan), and 2. Client-side PreparedStatement Caching (where the JDBC driver or connection pool like HikariCP reuses PreparedStatement object wrappers across leases).",
    "explanation": "Maximizes throughput and minimizes CPU utilization on both sides.",
    "hint": "Server-side Query Plan cache and Client-side PreparedStatement pool cache.",
    "level": "Intermediate",
    "codeExample": "config.addDataSourceProperty('cachePrepStmts', 'true');"
  },
  {
    "question": "What MySQL JDBC connection property enables client-side statement caching?",
    "shortAnswer": "cachePrepStmts=true (typically configured alongside prepStmtCacheSize=250 and prepStmtCacheSqlLimit=2048).",
    "explanation": "Standard production performance tuning flag for MySQL and MariaDB.",
    "hint": "cachePrepStmts=true",
    "level": "Intermediate",
    "codeExample": "jdbc:mysql://localhost/db?cachePrepStmts=true&prepStmtCacheSize=250"
  }
];

export default topic5_questions;
