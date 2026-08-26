const topic2_questions = [
  {
    "question": "Why are Type 4 JDBC drivers (Pure Java Thin Drivers) the universal industry standard today?",
    "shortAnswer": "Because they are written 100% in pure Java, require zero native C/C++ client software or ODBC installation on client machines, and communicate directly with the database server over TCP/IP sockets, providing complete cross-platform portability.",
    "explanation": "Can be deployed anywhere simply by including a single JAR file.",
    "hint": "100% pure Java, zero native client libraries, direct TCP communication.",
    "level": "Beginner",
    "codeExample": "Dependency: org.postgresql:postgresql:42.7.2 (Type 4 Driver)"
  },
  {
    "question": "What happened to the Type 1 JDBC-ODBC Bridge driver in modern Java releases?",
    "shortAnswer": "It was completely removed in Java 8 because ODBC is outdated, platform-dependent, insecure, and requires native 32-bit/64-bit OS DLLs.",
    "explanation": "Java SE 8 dropped sun.jdbc.odbc.JdbcOdbcDriver entirely.",
    "hint": "Removed in Java 8.",
    "level": "Beginner",
    "codeExample": "Type 1 was removed in Java 8."
  }
];

export default topic2_questions;
