const topic3_questions = [
  {
    "question": "Why is calling Class.forName('com.mysql.cj.jdbc.Driver') no longer required in modern Java applications?",
    "shortAnswer": "Because JDBC 4.0 introduced automatic driver discovery via the standard Java ServiceLoader mechanism. When the driver JAR is placed on the classpath, the JVM automatically scans META-INF/services/java.sql.Driver and registers the driver with DriverManager at startup.",
    "explanation": "Eliminates boilerplate reflection code in applications.",
    "hint": "Automatic driver discovery via Java ServiceLoader in META-INF/services.",
    "level": "Intermediate",
    "codeExample": "Connection conn = DriverManager.getConnection(url, user, pass);"
  },
  {
    "question": "What checked exception is thrown if DriverManager cannot connect to the database?",
    "shortAnswer": "java.sql.SQLException",
    "explanation": "All JDBC operations declare and throw SQLException upon error.",
    "hint": "java.sql.SQLException",
    "level": "Beginner",
    "codeExample": "try { ... } catch (SQLException e) { e.printStackTrace(); }"
  }
];

export default topic3_questions;
