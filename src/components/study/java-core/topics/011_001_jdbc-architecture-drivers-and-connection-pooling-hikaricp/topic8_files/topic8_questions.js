const topic8_questions = [
  {
    "question": "Why is javax.sql.DataSource preferred over DriverManager in modern Java enterprise applications?",
    "shortAnswer": "DataSource is an interface that supports dependency injection, configuration externalization, JNDI lookups, and transparent connection pooling, whereas DriverManager relies on rigid static methods and creates expensive unpooled physical connections.",
    "explanation": "Standard data access factory pattern in Spring and Jakarta EE.",
    "hint": "Supports dependency injection, connection pooling, and configuration externalization.",
    "level": "Beginner",
    "codeExample": "public MyService(DataSource ds) { this.ds = ds; }"
  },
  {
    "question": "What is the difference between DataSource and XADataSource?",
    "shortAnswer": "A standard DataSource produces standard single-database connections, whereas an XADataSource produces connections capable of participating in distributed, multi-database two-phase commit (2PC) transactions coordinated by a transaction manager.",
    "explanation": "XA represents the Open Group distributed transaction protocol.",
    "hint": "XADataSource supports distributed two-phase commit transactions.",
    "level": "Intermediate",
    "codeExample": "XADataSource xaDs = new PgXADataSource();"
  }
];

export default topic8_questions;
