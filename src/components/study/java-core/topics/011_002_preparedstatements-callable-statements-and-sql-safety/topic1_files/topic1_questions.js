const topic1_questions = [
  {
    "question": "Why does dynamic string concatenation in SQL queries lead to SQL Injection vulnerabilities?",
    "shortAnswer": "Because string concatenation merges executable SQL code structure with user data into a single string. The database SQL parser interprets attacker-supplied characters (such as single quotes and boolean operators) as SQL syntax commands rather than plain text data.",
    "explanation": "Allows attackers to modify the Abstract Syntax Tree (AST) of the SQL query.",
    "hint": "The database parser treats user input as executable SQL syntax.",
    "level": "Beginner",
    "codeExample": "'admin' OR '1'='1' -> Changes boolean logic of the query."
  },
  {
    "question": "What is the industry-standard defense in Java to prevent 100% of SQL Injection attacks?",
    "shortAnswer": "Using java.sql.PreparedStatement with parameterized query placeholders (?), which sends the SQL template to the database parser separately from the data values.",
    "explanation": "Ensures user input is always treated strictly as literal data.",
    "hint": "Using PreparedStatement with parameter placeholders (?).",
    "level": "Beginner",
    "codeExample": "PreparedStatement ps = conn.prepareStatement('SELECT * FROM users WHERE name = ?');"
  }
];

export default topic1_questions;
