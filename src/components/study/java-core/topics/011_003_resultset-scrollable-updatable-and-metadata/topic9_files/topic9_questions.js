const topic9_questions = [
  {
    "question": "Why should a DAO method return domain objects or Java Records instead of returning the live ResultSet to service callers?",
    "shortAnswer": "Because a ResultSet requires an open database Connection and Statement. Returning a ResultSet leaks database connection resources and forces service layers to manage low-level SQLExceptions, violating encapsulation and separation of concerns.",
    "explanation": "Always map and close ResultSets within the data access layer.",
    "hint": "Prevents leaking connection resources and decouples service logic from JDBC.",
    "level": "Beginner",
    "codeExample": "public List<Student> findAll() { return query(mapper); } // Returns domain list"
  },
  {
    "question": "What is the RowMapper pattern popularized by Spring JdbcTemplate?",
    "shortAnswer": "A functional interface with a single method (mapRow(ResultSet rs, int rowNum)) that encapsulates the logic of extracting column values from the current row of a ResultSet and constructing a domain object.",
    "explanation": "Allows clean functional decomposition of data mapping.",
    "hint": "A functional interface that transforms a single ResultSet row into a domain object.",
    "level": "Intermediate",
    "codeExample": "RowMapper<Student> mapper = (rs, rowNum) → new Student(rs.getInt(1), rs.getString(2));"
  }
];

export default topic9_questions;
