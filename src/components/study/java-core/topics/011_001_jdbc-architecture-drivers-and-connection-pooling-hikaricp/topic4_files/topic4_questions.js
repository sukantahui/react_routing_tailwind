const topic4_questions = [
  {
    "question": "What are the three main components of every JDBC connection URL?",
    "shortAnswer": "1. The 'jdbc:' prefix (identifies the protocol), 2. The subprotocol (identifies the database driver type, e.g. 'mysql', 'postgresql', 'oracle'), and 3. The subname (host, port, database name, and connection parameters).",
    "explanation": "Standard uniform resource locator pattern in JDBC.",
    "hint": "1. 'jdbc:', 2. subprotocol (db vendor), 3. subname (host/port/db).",
    "level": "Beginner",
    "codeExample": "jdbc:postgresql://localhost:5432/mydb"
  },
  {
    "question": "What is the format of an in-memory embedded H2 database JDBC URL?",
    "shortAnswer": "jdbc:h2:mem:<dbname>;DB_CLOSE_DELAY=-1",
    "explanation": "Widely used for unit and integration testing without spinning up external database servers.",
    "hint": "jdbc:h2:mem:testdb",
    "level": "Beginner",
    "codeExample": "jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1"
  }
];

export default topic4_questions;
