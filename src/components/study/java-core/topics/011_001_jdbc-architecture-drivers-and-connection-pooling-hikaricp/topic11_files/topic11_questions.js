const topic11_questions = [
  {
    "question": "In what order does a nested try-with-resources statement close JDBC objects (Connection, Statement, ResultSet)?",
    "shortAnswer": "In reverse order of their declaration: ResultSet is closed first, PreparedStatement is closed second, and Connection is closed (returned to the pool) last.",
    "explanation": "Strict LIFO (Last-In, First-Out) resource cleanup order.",
    "hint": "Reverse order of declaration (LIFO): ResultSet, Statement, then Connection.",
    "level": "Beginner",
    "codeExample": "try (Conn c = ...; Stmt s = ...; RS r = ...) → Closes r, then s, then c."
  },
  {
    "question": "What fatal consequence occurs if an application forgets to close a borrowed connection in an exception catch block when using a connection pool?",
    "shortAnswer": "A Connection Leak. The connection remains marked as 'in-use' in the pool forever. After enough leaks occur, the pool exhausts its maximumPoolSize, and subsequent threads block until throwing 'ConnectionTimeoutException', bringing down the entire application.",
    "explanation": "Always use try-with-resources to eliminate connection leaks.",
    "hint": "Causes a connection leak, pool exhaustion, and application freeze.",
    "level": "Beginner",
    "codeExample": "Pool exhaustion: throws java.sql.SQLTransientConnectionException"
  }
];

export default topic11_questions;
