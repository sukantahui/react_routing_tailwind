export const questions = [
  {
    "id": 1,
    "question": "[Topic 3 Q1] Which SQL command is used to add new rows of data into an existing database table?",
    "options": [
      "CREATE ROW",
      "INSERT INTO",
      "ADD RECORD",
      "MODIFY TABLE"
    ],
    "correctAnswer": 1,
    "explanation": "INSERT INTO is the standard SQL DML command used to append new tuples to a relation."
  },
  {
    "id": 2,
    "question": "[Topic 3 Q2] What happens if the WHERE clause is omitted in an UPDATE statement?",
    "options": [
      "The statement fails with a syntax error",
      "Only the first row of the table is updated",
      "EVERY row in the entire table will be updated",
      "No row is updated"
    ],
    "correctAnswer": 2,
    "explanation": "Without a WHERE clause, the SET clause applies unconditionally across all records in the table."
  },
  {
    "id": 3,
    "question": "[Topic 3 Q3] Which clause is used in a SELECT statement to eliminate duplicate tuples from the output?",
    "options": [
      "UNIQUE",
      "DISTINCT",
      "DIFFERENT",
      "REMOVE DUPLICATES"
    ],
    "correctAnswer": 1,
    "explanation": "The DISTINCT keyword collapses duplicate rows in the projected result set."
  },
  {
    "id": 4,
    "question": "[Topic 3 Q4] What is the result of evaluating the condition 'Marks = NULL' in SQL?",
    "options": [
      "Evaluates to TRUE if Marks is missing",
      "Evaluates to UNKNOWN / returns no rows",
      "Evaluates to FALSE always",
      "Throws a runtime database exception"
    ],
    "correctAnswer": 1,
    "explanation": "NULL represents missing data and cannot be matched using = or !=. It evaluates to UNKNOWN. Use 'IS NULL' instead."
  },
  {
    "id": 5,
    "question": "[Topic 3 Q5] Which wildcard character in the LIKE operator matches any sequence of zero or more characters?",
    "options": [
      "Question mark (?)",
      "Asterisk (*)",
      "Underscore (_)",
      "Percent (%)"
    ],
    "correctAnswer": 3,
    "explanation": "In SQL LIKE clauses, % represents zero or more characters, while _ represents exactly one character."
  },
  {
    "id": 6,
    "question": "[Topic 3 Q6] In an ORDER BY clause, what is the default sorting direction if neither ASC nor DESC is specified?",
    "options": [
      "ASCENDING (ASC)",
      "DESCENDING (DESC)",
      "Random order",
      "Primary Key order"
    ],
    "correctAnswer": 0,
    "explanation": "By default, SQL sorts result sets in Ascending (ASC) order."
  },
  {
    "id": 7,
    "question": "[Topic 3 Q7] Which operator is equivalent to 'Age >= 18 AND Age <= 25'?",
    "options": [
      "Age IN (18, 25)",
      "Age BETWEEN 18 AND 25",
      "Age FROM 18 TO 25",
      "Age RANGE(18, 25)"
    ],
    "correctAnswer": 1,
    "explanation": "BETWEEN 18 AND 25 is inclusive of both boundary values, perfectly matching >= 18 AND <= 25."
  },
  {
    "id": 8,
    "question": "[Topic 3 Q8] Which operator checks whether an attribute value exists in a discrete list of literal values?",
    "options": [
      "EXISTS",
      "BETWEEN",
      "IN",
      "LIKE"
    ],
    "correctAnswer": 2,
    "explanation": "The IN operator checks if a column's value matches any item in a specified list."
  },
  {
    "id": 9,
    "question": "[Topic 3 Q9] Which logical operator has the highest precedence when parentheses are omitted?",
    "options": [
      "OR",
      "AND",
      "NOT",
      "XOR"
    ],
    "correctAnswer": 2,
    "explanation": "In SQL logical operator precedence, NOT comes first, followed by AND, and finally OR."
  },
  {
    "id": 10,
    "question": "[Topic 3 Q10] Which SQL statement is used to remove specific records from a table without destroying table structure?",
    "options": [
      "DROP TABLE",
      "REMOVE FROM",
      "DELETE FROM",
      "ALTER TABLE DROP"
    ],
    "correctAnswer": 2,
    "explanation": "DELETE FROM removes records conditionally (or unconditionally) while keeping the table definition intact."
  },
  {
    "id": 11,
    "question": "[Topic 3 Q11] To match names with exactly 5 characters where the third character is 'R', which LIKE pattern is correct?",
    "options": [
      "'%R%'",
      "'__R__'",
      "'_R___'",
      "'__R%'"
    ],
    "correctAnswer": 1,
    "explanation": "'__R__' has two underscores, followed by 'R', followed by two underscores = exactly 5 characters total with 'R' at index 3."
  },
  {
    "id": 12,
    "question": "[Topic 3 Q12] What is the difference between DELETE FROM table_name and DROP TABLE table_name?",
    "options": [
      "DELETE removes table structure while DROP removes rows",
      "DELETE removes tuples keeping schema intact, while DROP removes both data and table structure",
      "DELETE is DDL while DROP is DML",
      "There is no difference"
    ],
    "correctAnswer": 1,
    "explanation": "DELETE is a DML command removing rows; DROP is a DDL command removing the relation schema from the database catalog."
  },
  {
    "id": 13,
    "question": "[Topic 3 Q13] How can you specify that an output column heading in SELECT should be displayed as 'Gross Pay'?",
    "options": [
      "SELECT Salary NAME 'Gross Pay'",
      "SELECT Salary AS \"Gross Pay\"",
      "SELECT Salary = 'Gross Pay'",
      "SELECT Salary TO 'Gross Pay'"
    ],
    "correctAnswer": 1,
    "explanation": "Using the AS keyword with double or single quotes allows multi-word column aliases."
  },
  {
    "id": 14,
    "question": "[Topic 3 Q14] Which operator is used to test whether a column value is NOT missing?",
    "options": [
      "NOT NULL",
      "!= NULL",
      "IS NOT NULL",
      "<> NULL"
    ],
    "correctAnswer": 2,
    "explanation": "'IS NOT NULL' is the standard SQL predicate for testing presence of non-null data."
  },
  {
    "id": 15,
    "question": "[Topic 3 Q15] Given query: 'SELECT * FROM Emp WHERE Dept = 'IT' OR Dept = 'HR' AND Salary > 50000;', which condition is evaluated first?",
    "options": [
      "Dept = 'IT' OR Dept = 'HR'",
      "Dept = 'HR' AND Salary > 50000",
      "Left to right strictly",
      "Arbitrary engine choice"
    ],
    "correctAnswer": 1,
    "explanation": "AND has higher precedence than OR, so 'Dept = 'HR' AND Salary > 50000' is evaluated first."
  },
  {
    "id": 16,
    "question": "[Topic 3 Q16] Which statement properly inserts a record into Student with columns (RollNo, Name) leaving other nullable columns blank?",
    "options": [
      "INSERT INTO Student VALUES (101, 'Rohan');",
      "INSERT INTO Student (RollNo, Name) VALUES (101, 'Rohan');",
      "INSERT INTO Student SET RollNo=101, Name='Rohan';",
      "ADD INTO Student (RollNo, Name) VALUES (101, 'Rohan');"
    ],
    "correctAnswer": 1,
    "explanation": "When inserting into a subset of columns, the target column list must be explicitly specified."
  },
  {
    "id": 17,
    "question": "[Topic 3 Q17] What does the query 'SELECT 100 + NULL;' evaluate to in MySQL?",
    "options": [
      "100",
      "0",
      "NULL",
      "Error"
    ],
    "correctAnswer": 2,
    "explanation": "Any arithmetic operation with a NULL operand propagates and evaluates to NULL."
  },
  {
    "id": 18,
    "question": "[Topic 3 Q18] Which query correctly finds all students whose names do NOT start with 'M'?",
    "options": [
      "SELECT * FROM Student WHERE SName NOT LIKE 'M%';",
      "SELECT * FROM Student WHERE SName != 'M*';",
      "SELECT * FROM Student WHERE SName NOT IN ('M%');",
      "SELECT * FROM Student WHERE NOT SName = 'M%';"
    ],
    "correctAnswer": 0,
    "explanation": "NOT LIKE 'M%' selects all string values that do not match the pattern starting with 'M'."
  },
  {
    "id": 19,
    "question": "[Topic 3 Q19] To sort products primarily by Category ascending and secondarily by Price descending, which clause is correct?",
    "options": [
      "ORDER BY Category ASC, Price DESC",
      "ORDER BY Category, Price",
      "SORT BY Category ASC THEN Price DESC",
      "ORDER BY Price DESC, Category ASC"
    ],
    "correctAnswer": 0,
    "explanation": "'ORDER BY Category ASC, Price DESC' orders by Category first, breaking ties by Price descending."
  },
  {
    "id": 20,
    "question": "[Topic 3 Q20] What will 'SELECT DISTINCT City, State FROM Supplier;' do if two suppliers are in Mumbai, Maharashtra?",
    "options": [
      "Display Mumbai twice",
      "Display Mumbai, Maharashtra only once",
      "Throw an error because DISTINCT only works on 1 column",
      "Display only the City"
    ],
    "correctAnswer": 1,
    "explanation": "DISTINCT applies to the unique combination of all projected attributes; identical (City, State) pairs are collapsed."
  },
  {
    "id": 21,
    "question": "[Topic 3 Q21] What is the output of 'SELECT SName FROM Student WHERE Stream IN ('Arts')' if Stream has 'Commerce' and 'Science'?",
    "options": [
      "All students",
      "Empty set (0 rows)",
      "NULL",
      "Error"
    ],
    "correctAnswer": 1,
    "explanation": "No row satisfies Stream = 'Arts', so an empty set (zero rows) is returned."
  },
  {
    "id": 22,
    "question": "[Topic 3 Q22] Which clause in SELECT filters rows based on individual tuple attribute conditions?",
    "options": [
      "HAVING",
      "GROUP BY",
      "WHERE",
      "ORDER BY"
    ],
    "correctAnswer": 2,
    "explanation": "WHERE filters individual records prior to grouping or projection."
  },
  {
    "id": 23,
    "question": "[Topic 3 Q23] Which SQL command can be rolled back if run within a transaction in MySQL InnoDB?",
    "options": [
      "DROP TABLE",
      "TRUNCATE TABLE",
      "DELETE FROM",
      "ALTER TABLE"
    ],
    "correctAnswer": 2,
    "explanation": "DELETE is a DML statement and can be undone with ROLLBACK within a transaction block."
  },
  {
    "id": 24,
    "question": "[Topic 3 Q24] To increase the Fee by 15% for all students in class 12, which query is syntactically valid?",
    "options": [
      "UPDATE Student SET Fee = Fee + 15% WHERE Class = 12;",
      "UPDATE Student SET Fee = Fee * 1.15 WHERE Class = 12;",
      "MODIFY Student SET Fee = Fee * 1.15 WHERE Class = 12;",
      "ALTER Student UPDATE Fee = Fee * 1.15 WHERE Class = 12;"
    ],
    "correctAnswer": 1,
    "explanation": "UPDATE table SET col = col * 1.15 WHERE condition is the proper mathematical expression syntax."
  },
  {
    "id": 25,
    "question": "[Topic 3 Q25] Which query retrieves records where DOJ falls in the year 2023?",
    "options": [
      "SELECT * FROM Emp WHERE DOJ BETWEEN '2023-01-01' AND '2023-12-31';",
      "SELECT * FROM Emp WHERE DOJ LIKE '2023%';",
      "Both A and B are valid in MySQL",
      "SELECT * FROM Emp WHERE YEAR = 2023;"
    ],
    "correctAnswer": 2,
    "explanation": "Both BETWEEN '2023-01-01' AND '2023-12-31' and LIKE '2023%' effectively match all dates in 2023 in MySQL."
  }
];
export default questions;
