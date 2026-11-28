export const questions = [
  {
    "id": 1,
    "question": "In a 20-mark CBSE SQL sample paper, what is the best strategy for solving Section C query writing questions?",
    "options": [
      "Write query directly without checking table schema",
      "Carefully verify column names, data types, string quotes, and WHERE conditions against schema",
      "Use subqueries for every question even when simple WHERE suffices",
      "Omit semicolons at the end of every statement"
    ],
    "correctAnswer": 1,
    "explanation": "Exam scoring in SQL depends strictly on matching schema column identifiers and correct syntax."
  },
  {
    "id": 2,
    "question": "When writing SQL queries involving string constants, what quoting rule must be observed?",
    "options": [
      "Strings can be written without quotes",
      "Strings MUST be enclosed in single quotes ('...') or double quotes (\"...\")",
      "Strings must be written inside parentheses only",
      "Strings must be written in capital letters without quotes"
    ],
    "correctAnswer": 1,
    "explanation": "SQL requires string literals to be enclosed in quotes."
  },
  {
    "id": 3,
    "question": "What is the primary difference between WHERE and HAVING in SQL?",
    "options": [
      "WHERE filters rows before grouping; HAVING filters groups after GROUP BY",
      "WHERE is used only with SELECT; HAVING is used only with UPDATE",
      "WHERE cannot take arithmetic operators",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "WHERE filters individual records prior to aggregation, while HAVING filters group records."
  },
  {
    "id": 4,
    "question": "If a query asks to display records in descending order of Marks, which clause is correct?",
    "options": [
      "SORT BY Marks DESC",
      "ORDER BY Marks DESC",
      "GROUP BY Marks DESC",
      "ORDER BY Marks DOWN"
    ],
    "correctAnswer": 1,
    "explanation": "ORDER BY column_name DESC sorts the output records in descending sequence."
  },
  {
    "id": 5,
    "question": "To test if an attribute's value is missing, which comparison predicate must be used?",
    "options": [
      "= NULL",
      "== NULL",
      "IS NULL",
      "EQUALS NULL"
    ],
    "correctAnswer": 2,
    "explanation": "NULL represents missing data and can only be evaluated using IS NULL or IS NOT NULL."
  },
  {
    "id": 6,
    "question": "Which wildcard character represents zero or more characters in a LIKE condition?",
    "options": [
      "Underscore (_)",
      "Percent (%)",
      "Asterisk (*)",
      "Ampersand (&)"
    ],
    "correctAnswer": 1,
    "explanation": "% matches any sequence of zero, one, or multiple characters."
  },
  {
    "id": 7,
    "question": "Which wildcard character represents exactly one single character in a LIKE condition?",
    "options": [
      "Percent (%)",
      "Underscore (_)",
      "Question mark (?)",
      "Hyphen (-)"
    ],
    "correctAnswer": 1,
    "explanation": "Underscore (_) matches exactly one character at that position."
  },
  {
    "id": 8,
    "question": "In BETWEEN 50 AND 100, are the boundary values 50 and 100 included?",
    "options": [
      "Only 50 is included",
      "Only 100 is included",
      "Both 50 and 100 are included (inclusive)",
      "Neither 50 nor 100 is included"
    ],
    "correctAnswer": 2,
    "explanation": "BETWEEN in SQL is inclusive of both boundary values."
  },
  {
    "id": 9,
    "question": "Which keyword prevents duplicate values from appearing in the output of a SELECT query?",
    "options": [
      "UNIQUE",
      "DISTINCT",
      "PRIMARY",
      "DIFFERENT"
    ],
    "correctAnswer": 1,
    "explanation": "DISTINCT collapses identical rows into a single representative row in query results."
  },
  {
    "id": 10,
    "question": "What happens if the WHERE clause is omitted in an UPDATE statement?",
    "options": [
      "Only the first row is updated",
      "No rows are updated",
      "All rows in the table are updated",
      "The SQL engine throws an error"
    ],
    "correctAnswer": 2,
    "explanation": "Without a WHERE clause, the SET operation applies unconditionally to every record in the table."
  },
  {
    "id": 11,
    "question": "Which operator is a convenient shorthand for multiple OR conditions on the same attribute?",
    "options": [
      "BETWEEN",
      "IN",
      "LIKE",
      "EXISTS"
    ],
    "correctAnswer": 1,
    "explanation": "The IN operator checks membership in a discrete set of values, equivalent to an OR chain."
  },
  {
    "id": 12,
    "question": "How can you specify a column alias that contains spaces, such as 'Full Name'?",
    "options": [
      "SELECT Name AS Full Name",
      "SELECT Name AS 'Full Name'",
      "SELECT Name AS [Full Name]",
      "SELECT Name TO 'Full Name'"
    ],
    "correctAnswer": 1,
    "explanation": "Enclosing the alias in quotes allows multi-word aliases with spaces."
  },
  {
    "id": 13,
    "question": "What is the order of precedence among logical operators without parentheses?",
    "options": [
      "OR > AND > NOT",
      "NOT > AND > OR",
      "AND > OR > NOT",
      "Left to right strictly"
    ],
    "correctAnswer": 1,
    "explanation": "NOT has highest precedence, followed by AND, followed by OR."
  },
  {
    "id": 14,
    "question": "What will 'DELETE FROM Student;' do to the table Student?",
    "options": [
      "Deletes the table definition and all rows completely",
      "Deletes all rows while retaining table structure",
      "Throws an error because WHERE is missing",
      "Deletes only the primary key column"
    ],
    "correctAnswer": 1,
    "explanation": "DELETE FROM removes all records but preserves the table structure in the catalog."
  },
  {
    "id": 15,
    "question": "To display employees whose name starts with 'S' and has 5 letters, which LIKE pattern is correct?",
    "options": [
      "'S%'",
      "'S____'",
      "'S____%'",
      "'%S____'"
    ],
    "correctAnswer": 1,
    "explanation": "'S____' (S followed by four underscores) = 1 + 4 = 5 characters starting with S."
  },
  {
    "id": 16,
    "question": "Which clause is evaluated first in a standard SELECT query without grouping?",
    "options": [
      "SELECT",
      "WHERE",
      "FROM",
      "ORDER BY"
    ],
    "correctAnswer": 2,
    "explanation": "The FROM clause is evaluated first to identify and load the source table."
  },
  {
    "id": 17,
    "question": "Can an expression like 'Salary * 1.10' be written in the SELECT list?",
    "options": [
      "Yes, arithmetic expressions are valid in the SELECT clause",
      "No, only column names can appear in SELECT",
      "Only if stored as a trigger",
      "Only in numeric databases"
    ],
    "correctAnswer": 0,
    "explanation": "Arithmetic expressions on numeric columns can be computed on the fly in the SELECT list."
  },
  {
    "id": 18,
    "question": "What is the output of 'SELECT NULL + 20;' in MySQL?",
    "options": [
      "20",
      "0",
      "NULL",
      "Error"
    ],
    "correctAnswer": 2,
    "explanation": "Any arithmetic operation with NULL results in NULL."
  },
  {
    "id": 19,
    "question": "In multi-column sorting 'ORDER BY Dept ASC, Salary DESC', how are rows sorted?",
    "options": [
      "First by Salary descending, then by Dept ascending",
      "Primarily by Dept ascending; ties in Dept are broken by Salary descending",
      "Only by Dept; Salary is ignored",
      "Alternating rows between Dept and Salary"
    ],
    "correctAnswer": 1,
    "explanation": "Multi-column sorting sorts primarily by the first attribute, breaking duplicate ties by the second."
  },
  {
    "id": 20,
    "question": "To find all students whose stream is NOT 'Science', which query is valid?",
    "options": [
      "SELECT * FROM Student WHERE Stream <> 'Science';",
      "SELECT * FROM Student WHERE Stream != 'Science';",
      "SELECT * FROM Student WHERE NOT (Stream = 'Science');",
      "All of the above"
    ],
    "correctAnswer": 3,
    "explanation": "All three notations (<>, !=, and NOT (...)) are valid ways to specify inequality in MySQL."
  },
  {
    "id": 21,
    "question": "In a CBSE 6-mark case study question, how are marks typically allocated?",
    "options": [
      "All 6 marks for one long query",
      "Usually 1 mark for each of 6 sub-questions (a to f)",
      "3 marks for diagram and 3 marks for theory",
      "Randomly distributed"
    ],
    "correctAnswer": 1,
    "explanation": "CBSE case study questions in CS 083 usually comprise 6 sub-parts of 1 mark each."
  },
  {
    "id": 22,
    "question": "What is the correct syntax to insert specific columns leaving others to take default/null?",
    "options": [
      "INSERT INTO table (col1, col2) VALUES (v1, v2);",
      "INSERT INTO table SET col1=v1, col2=v2;",
      "Both A and B are valid in MySQL",
      "INSERT INTO table VALUES (v1, v2);"
    ],
    "correctAnswer": 2,
    "explanation": "Both INSERT INTO table (cols) VALUES (vals) and INSERT INTO table SET col=val are valid in MySQL."
  },
  {
    "id": 23,
    "question": "What is the danger of writing 'UPDATE Emp SET Comm = 0 WHERE Comm = NULL;'?",
    "options": [
      "It will set all rows to 0",
      "It will set NO rows to 0 because '= NULL' evaluates to UNKNOWN",
      "It deletes the table",
      "It crashes MySQL server"
    ],
    "correctAnswer": 1,
    "explanation": "= NULL never matches any row; use IS NULL instead."
  },
  {
    "id": 24,
    "question": "To select dates between 1st Jan 2023 and 31st Dec 2023, which format is standard?",
    "options": [
      "'01-01-2023' AND '31-12-2023'",
      "'2023-01-01' AND '2023-12-31'",
      "'Jan 1 2023' AND 'Dec 31 2023'",
      "'2023/01/01' AND '2023/12/31'"
    ],
    "correctAnswer": 1,
    "explanation": "Standard SQL and MySQL use the ISO-8601 'YYYY-MM-DD' date format."
  },
  {
    "id": 25,
    "question": "Why should students complete these 10 sample question paper sets under timed conditions (45 min)?",
    "options": [
      "To build speed, accuracy, and schema-reading muscle memory required for the CBSE board exam",
      "Because CBSE exams only give 45 minutes for the full paper",
      "To memorize answers without understanding",
      "To avoid writing SQL queries in practical exams"
    ],
    "correctAnswer": 0,
    "explanation": "Timed practice simulates real exam pressure and ensures students can complete 20-mark sections with zero errors."
  }
];
export default questions;
