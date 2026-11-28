export const questions = [
  {
    "id": 1,
    "question": "When writing SQL queries with GROUP BY, which columns are permitted in the SELECT clause?",
    "options": [
      "Any column from the table arbitrarily",
      "Only columns present in the GROUP BY clause or enclosed inside an aggregate function",
      "Only primary key columns",
      "Only columns of type VARCHAR"
    ],
    "correctAnswer": 1,
    "explanation": "ANSI SQL and MySQL strict mode require that non-aggregated columns in SELECT must appear in GROUP BY."
  },
  {
    "id": 2,
    "question": "What is the key difference between WHERE and HAVING in SQL?",
    "options": [
      "WHERE filters rows before grouping; HAVING filters groups after grouping",
      "WHERE is only used with INSERT; HAVING is only used with DELETE",
      "WHERE can contain SUM() while HAVING cannot",
      "There is no functional difference"
    ],
    "correctAnswer": 0,
    "explanation": "WHERE filters individual records prior to GROUP BY aggregation; HAVING filters groups after aggregation."
  },
  {
    "id": 3,
    "question": "What does COUNT(*) count?",
    "options": [
      "Only rows with non-NULL primary keys",
      "Total number of rows in the table, including rows containing NULLs",
      "Only numeric columns",
      "Only distinct rows"
    ],
    "correctAnswer": 1,
    "explanation": "COUNT(*) counts all tuples in the relation regardless of NULL values."
  },
  {
    "id": 4,
    "question": "If a column has values [10, 20, NULL], what does AVG(col) return?",
    "options": [
      "10.0",
      "15.0",
      "30.0",
      "NULL"
    ],
    "correctAnswer": 1,
    "explanation": "AVG ignores NULL: (10 + 20) / 2 = 15.0."
  },
  {
    "id": 5,
    "question": "Table A has 5 rows and Table B has 4 rows. What is the cardinality of A × B?",
    "options": [
      "9",
      "20",
      "1",
      "Cannot be determined"
    ],
    "correctAnswer": 1,
    "explanation": "Cardinality = 5 * 4 = 20 rows."
  },
  {
    "id": 6,
    "question": "Table A has 3 columns and Table B has 4 columns. What is the degree of A × B?",
    "options": [
      "12",
      "7",
      "1",
      "3"
    ],
    "correctAnswer": 1,
    "explanation": "Degree = 3 + 4 = 7 columns."
  },
  {
    "id": 7,
    "question": "How many join conditions are required to join 5 tables in an equi-join?",
    "options": [
      "5",
      "4",
      "3",
      "2"
    ],
    "correctAnswer": 1,
    "explanation": "Joining N tables requires at least (N - 1) join conditions. 5 - 1 = 4."
  },
  {
    "id": 8,
    "question": "Which aggregate functions can be applied to Date attributes?",
    "options": [
      "SUM and AVG",
      "MIN and MAX",
      "Only COUNT",
      "None"
    ],
    "correctAnswer": 1,
    "explanation": "MIN() finds earliest date and MAX() finds latest date on Date attributes."
  },
  {
    "id": 9,
    "question": "What is the logical order of execution of SQL clauses?",
    "options": [
      "SELECT -> FROM -> WHERE -> GROUP BY -> HAVING -> ORDER BY",
      "FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY",
      "WHERE -> FROM -> GROUP BY -> SELECT -> HAVING -> ORDER BY",
      "FROM -> SELECT -> WHERE -> ORDER BY"
    ],
    "correctAnswer": 1,
    "explanation": "Logical sequence: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY."
  },
  {
    "id": 10,
    "question": "Can an aggregate function be placed in the WHERE clause directly?",
    "options": [
      "Yes, always",
      "No, aggregate functions cannot appear in the WHERE clause",
      "Only COUNT(*)",
      "Only in MySQL"
    ],
    "correctAnswer": 1,
    "explanation": "Aggregate functions operate on groups and are prohibited in WHERE. Use HAVING or subqueries."
  },
  {
    "id": 11,
    "question": "What is an Equi-Join?",
    "options": [
      "A join where table columns are deleted",
      "A join based on the equality of common attributes between tables",
      "A join that produces unequal rows",
      "A union of two tables"
    ],
    "correctAnswer": 1,
    "explanation": "An equi-join links tables using an equality condition (T1.col = T2.col)."
  },
  {
    "id": 12,
    "question": "Why should table aliases be used in multi-table queries?",
    "options": [
      "To permanently alter the table name in the schema",
      "To provide short shorthand names and resolve column ambiguity with dot notation",
      "To speed up hard disk reads",
      "To delete tables safely"
    ],
    "correctAnswer": 1,
    "explanation": "Table aliases disambiguate identically named columns (e.g. E.DeptId vs D.DeptId)."
  },
  {
    "id": 13,
    "question": "What happens if the WHERE clause is omitted when querying two tables (e.g. SELECT * FROM T1, T2)?",
    "options": [
      "An Equi-Join is performed automatically",
      "An error is thrown",
      "A full Cartesian Product (Cross Join) is returned",
      "Only the first row is displayed"
    ],
    "correctAnswer": 2,
    "explanation": "Without a join filter in WHERE, all combinations of rows are returned as a Cartesian product."
  },
  {
    "id": 14,
    "question": "What does COUNT(DISTINCT Stream) return for values ['Sci', 'Arts', 'Sci', NULL]?",
    "options": [
      "4",
      "3",
      "2",
      "1"
    ],
    "correctAnswer": 2,
    "explanation": "Unique non-null values are 'Sci' and 'Arts' = 2."
  },
  {
    "id": 15,
    "question": "Which clause is used to sort the grouped result set in ascending order of group averages?",
    "options": [
      "GROUP BY ... ASC",
      "ORDER BY AVG(col) ASC",
      "SORT BY",
      "HAVING ASC"
    ],
    "correctAnswer": 1,
    "explanation": "Sorting of result sets is always performed by ORDER BY."
  },
  {
    "id": 16,
    "question": "Can a query group by multiple columns, such as 'GROUP BY Dept, Designation'?",
    "options": [
      "No, SQL only allows single-column grouping",
      "Yes, it groups rows by each unique combination of Dept and Designation",
      "Only if both are numeric",
      "Only in views"
    ],
    "correctAnswer": 1,
    "explanation": "Multi-column grouping forms summary groups for each unique tuple of values across the specified columns."
  },
  {
    "id": 17,
    "question": "What does SUM(Commission) return if all values in Commission are NULL?",
    "options": [
      "0",
      "NULL",
      "Error",
      "-1"
    ],
    "correctAnswer": 1,
    "explanation": "When all values in the column are NULL, SUM() returns NULL."
  },
  {
    "id": 18,
    "question": "What does MAX(EName) return on a string column containing ('Amit', 'Rohan', 'Zara')?",
    "options": [
      "'Amit'",
      "'Zara'",
      "'Rohan'",
      "NULL"
    ],
    "correctAnswer": 1,
    "explanation": "'Zara' is alphabetically the highest/last string."
  },
  {
    "id": 19,
    "question": "In a CBSE 20-mark sample paper on SQL joins, how is Section D structured?",
    "options": [
      "A single 6-mark essay",
      "A 6-mark case study based on 2 related tables with 6 distinct sub-questions (a to f)",
      "A practical viva voce",
      "A python connectivity script"
    ],
    "correctAnswer": 1,
    "explanation": "Section D features a multi-table case study with 6 sub-questions carrying 1 mark each."
  },
  {
    "id": 20,
    "question": "Which keyword connects conditions in a HAVING clause?",
    "options": [
      "WHERE",
      "AND / OR",
      "JOIN",
      "CONNECT"
    ],
    "correctAnswer": 1,
    "explanation": "Compound conditions in HAVING are combined using standard logical operators AND and OR."
  },
  {
    "id": 21,
    "question": "What is the effect of 'HAVING COUNT(*) > 1' on a grouped query?",
    "options": [
      "It discards groups that contain only 1 row or 0 rows",
      "It deletes duplicate rows permanently",
      "It displays only the first row",
      "It creates 1 new table"
    ],
    "correctAnswer": 0,
    "explanation": "HAVING COUNT(*) > 1 filters out groups that have 1 or fewer rows."
  },
  {
    "id": 22,
    "question": "Why does CBSE emphasize understanding Degree and Cardinality in Cartesian Products?",
    "options": [
      "It tests relational algebra fundamentals: Degree adds (C1+C2), Cardinality multiplies (R1*R2)",
      "It is needed for computer networking",
      "Because it is tested in Class 11",
      "It determines the hard drive sector size"
    ],
    "correctAnswer": 0,
    "explanation": "Degree arithmetic (addition) and Cardinality arithmetic (multiplication) are fundamental relational concepts."
  },
  {
    "id": 23,
    "question": "To display total salary paid to each department where total salary > 100000, which query is correct?",
    "options": [
      "SELECT Dept, SUM(Salary) FROM Emp WHERE SUM(Salary) > 100000 GROUP BY Dept;",
      "SELECT Dept, SUM(Salary) FROM Emp GROUP BY Dept HAVING SUM(Salary) > 100000;",
      "SELECT Dept, SUM(Salary) FROM Emp HAVING Salary > 100000;",
      "SELECT Dept, SUM(Salary) FROM Emp GROUP BY Dept WHERE Salary > 100000;"
    ],
    "correctAnswer": 1,
    "explanation": "GROUP BY Dept with HAVING SUM(Salary) > 100000 is the correct SQL syntax."
  },
  {
    "id": 24,
    "question": "In the query 'SELECT D.DeptName, E.EName FROM Dept D, Emp E WHERE D.DeptId = E.DeptId;', what is 'D.DeptId = E.DeptId' called?",
    "options": [
      "The Join Predicate / Condition",
      "The Projection clause",
      "The Grouping clause",
      "The Primary Key definition"
    ],
    "correctAnswer": 0,
    "explanation": "It is the join predicate linking the two tables on the common key."
  },
  {
    "id": 25,
    "question": "Why should students solve all 10 sets of this Sample Question Paper?",
    "options": [
      "To build speed, precision, and confidence in writing error-free 3-mark and 6-mark SQL queries under exam pressure",
      "To avoid learning Python",
      "Because CBSE repeats the exact same questions without change",
      "To skip the practical lab exam"
    ],
    "correctAnswer": 0,
    "explanation": "Rigorous practice with 10 varied real-world scenarios develops mastery in SQL syntax and exam time management."
  }
];
export default questions;
