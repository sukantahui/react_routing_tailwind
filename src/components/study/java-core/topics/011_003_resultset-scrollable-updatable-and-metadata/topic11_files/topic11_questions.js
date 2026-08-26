const topic11_questions = [
  {
    "question": "How does ResultSetMetaData enable writing schema-agnostic generic export utilities in Java?",
    "shortAnswer": "By dynamically discovering the total column count, column names, labels, and data types at runtime, allowing the utility to loop over all fields and format output without having any compile-time knowledge of specific database tables or schemas.",
    "explanation": "Powers general-purpose ETL tools and database management clients.",
    "hint": "Discovers column counts and labels dynamically at runtime.",
    "level": "Intermediate",
    "codeExample": "for (int i=1; i<=meta.getColumnCount(); i++) print(meta.getColumnLabel(i));"
  },
  {
    "question": "Why should rs.getObject(i) be used when writing generic data extractors?",
    "shortAnswer": "Because rs.getObject(i) returns the column value as a generic java.lang.Object wrapper (String, Integer, Double, Timestamp, etc.) without requiring type-specific conditional branching for every SQL data type.",
    "explanation": "Provides universal polymorphic object extraction.",
    "hint": "Returns any SQL column value as a standard Java Object wrapper.",
    "level": "Intermediate",
    "codeExample": "Object value = rs.getObject(i);"
  }
];

export default topic11_questions;
