const topic0_questions = [
  {
    "question": "What two primary packages form the standard JDBC API in the Java Standard Edition library?",
    "shortAnswer": "java.sql (containing fundamental interfaces like Connection, Statement, and ResultSet) and javax.sql (containing enterprise extensions like DataSource, ConnectionPoolDataSource, and RowSet).",
    "explanation": "Standard Java SE enterprise data access foundation.",
    "hint": "java.sql and javax.sql.",
    "level": "Beginner",
    "codeExample": "import java.sql.*; import javax.sql.*;"
  },
  {
    "question": "Why is JDBC called a vendor-neutral database API?",
    "shortAnswer": "Because developers write code against standardized Java interfaces (java.sql.Connection, Statement, ResultSet), while database vendors provide concrete driver implementations (MySQL Connector, pgJDBC, ojdbc) that translate standard calls into vendor-specific network protocols.",
    "explanation": "Allows switching database vendors without rewriting business query logic.",
    "hint": "Code uses standard Java interfaces while vendor drivers handle network protocols.",
    "level": "Intermediate",
    "codeExample": "Connection conn = DriverManager.getConnection(url, user, pass);"
  }
];

export default topic0_questions;
