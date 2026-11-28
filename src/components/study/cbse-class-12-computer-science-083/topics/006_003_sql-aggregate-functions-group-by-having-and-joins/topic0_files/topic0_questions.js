export const questions = [
  {
    "id": 1,
    "question": "[Topic 0 Q1] Which aggregate function returns the total number of rows in a table including rows with NULL values?",
    "options": [
      "COUNT(column)",
      "COUNT(*)",
      "SUM(*)",
      "TOTAL()"
    ],
    "correctAnswer": 1,
    "explanation": "COUNT(*) counts all tuples in the table without checking for NULL in any individual attribute."
  },
  {
    "id": 2,
    "question": "[Topic 0 Q2] If a column contains values [10, 20, 20, NULL, 30], what is the output of COUNT(DISTINCT column)?",
    "options": [
      "5",
      "4",
      "3",
      "2"
    ],
    "correctAnswer": 2,
    "explanation": "Unique non-NULL values are 10, 20, 30, so COUNT(DISTINCT) returns 3."
  },
  {
    "id": 3,
    "question": "[Topic 0 Q3] Which clause is used to filter records AFTER grouping has taken place?",
    "options": [
      "WHERE",
      "HAVING",
      "ORDER BY",
      "FILTER"
    ],
    "correctAnswer": 1,
    "explanation": "HAVING filters groups created by the GROUP BY clause."
  },
  {
    "id": 4,
    "question": "[Topic 0 Q4] Table A has 4 rows and 3 columns. Table B has 5 rows and 2 columns. What is the Degree of their Cartesian Product?",
    "options": [
      "20",
      "5",
      "6",
      "12"
    ],
    "correctAnswer": 1,
    "explanation": "Degree of Cartesian product = Degree(A) + Degree(B) = 3 + 2 = 5 columns."
  },
  {
    "id": 5,
    "question": "[Topic 0 Q5] Table A has 4 rows and 3 columns. Table B has 5 rows and 2 columns. What is the Cardinality of their Cartesian Product?",
    "options": [
      "20",
      "5",
      "9",
      "12"
    ],
    "correctAnswer": 0,
    "explanation": "Cardinality = Cardinality(A) * Cardinality(B) = 4 * 5 = 20 rows."
  },
  {
    "id": 6,
    "question": "[Topic 0 Q6] Which of the following aggregate functions can operate on Date data types in SQL?",
    "options": [
      "SUM()",
      "AVG()",
      "MIN() and MAX()",
      "Only SUM()"
    ],
    "correctAnswer": 2,
    "explanation": "MIN() finds earliest date and MAX() finds latest date; SUM and AVG operate only on numbers."
  },
  {
    "id": 7,
    "question": "[Topic 0 Q7] What is the logical order of execution among WHERE, GROUP BY, and HAVING in SQL?",
    "options": [
      "WHERE -> GROUP BY -> HAVING",
      "GROUP BY -> WHERE -> HAVING",
      "HAVING -> GROUP BY -> WHERE",
      "WHERE -> HAVING -> GROUP BY"
    ],
    "correctAnswer": 0,
    "explanation": "Individual rows are filtered first (WHERE), then grouped (GROUP BY), then group aggregates are filtered (HAVING)."
  },
  {
    "id": 8,
    "question": "[Topic 0 Q8] How many join conditions are needed to join 4 tables in an equi-join to prevent a Cartesian product?",
    "options": [
      "4",
      "3",
      "2",
      "1"
    ],
    "correctAnswer": 1,
    "explanation": "Joining N tables requires at least (N - 1) join conditions. For 4 tables, 4 - 1 = 3 conditions."
  },
  {
    "id": 9,
    "question": "[Topic 0 Q9] Identify the error in: SELECT Dept, EName, AVG(Salary) FROM Emp GROUP BY Dept;",
    "options": [
      "AVG(Salary) cannot be used with GROUP BY",
      "EName is neither in GROUP BY nor enclosed within an aggregate function",
      "FROM clause must come after GROUP BY",
      "No error exists"
    ],
    "correctAnswer": 1,
    "explanation": "Every non-aggregated column in the SELECT list must appear in the GROUP BY clause."
  },
  {
    "id": 10,
    "question": "[Topic 0 Q10] Given Marks values [80, 90, NULL], what is the output of AVG(Marks)?",
    "options": [
      "56.67",
      "85.0",
      "170.0",
      "NULL"
    ],
    "correctAnswer": 1,
    "explanation": "AVG ignores NULL: (80 + 90) / 2 = 85.0 (the denominator is 2, not 3)."
  },
  {
    "id": 11,
    "question": "[Topic 0 Q11] Can an aggregate function like MAX(Salary) be used in a WHERE clause directly?",
    "options": [
      "Yes, always",
      "No, aggregate functions cannot appear in the WHERE clause",
      "Only when table has fewer than 10 rows",
      "Only if aliased"
    ],
    "correctAnswer": 1,
    "explanation": "Aggregate functions operate on sets of rows and are invalid in WHERE. Use HAVING or subqueries."
  },
  {
    "id": 12,
    "question": "[Topic 0 Q12] Which keyword is used to specify that groups should be arranged in ascending order of their group totals?",
    "options": [
      "GROUP BY ... ASC",
      "ORDER BY",
      "SORT BY",
      "ARRANGE BY"
    ],
    "correctAnswer": 1,
    "explanation": "Sorting of any result set (including grouped queries) is always performed by ORDER BY."
  },
  {
    "id": 13,
    "question": "[Topic 0 Q13] What does an Equi-Join use in its join predicate?",
    "options": [
      "Inequality operators (<>)",
      "Equality operator (=) matching common key columns",
      "LIKE wildcard operator",
      "BETWEEN operator"
    ],
    "correctAnswer": 1,
    "explanation": "An equi-join links tables based on equality of common attributes (e.g. T1.id = T2.id)."
  },
  {
    "id": 14,
    "question": "[Topic 0 Q14] What is the result of SUM(column) if all values in that column are NULL?",
    "options": [
      "0",
      "NULL",
      "Error",
      "-1"
    ],
    "correctAnswer": 1,
    "explanation": "If all rows in the group have NULL for that column, SUM returns NULL."
  },
  {
    "id": 15,
    "question": "[Topic 0 Q15] What is a table alias used for in SQL multi-table queries?",
    "options": [
      "To permanently rename the table in the database catalog",
      "To provide a temporary, short shorthand to qualify column names and avoid ambiguity",
      "To drop the table safely",
      "To create a foreign key"
    ],
    "correctAnswer": 1,
    "explanation": "Table aliases are temporary shorthand names in queries to simplify qualification (e.g. E.DeptId)."
  },
  {
    "id": 16,
    "question": "[Topic 0 Q16] Which query correctly finds the number of employees in each department having more than 5 employees?",
    "options": [
      "SELECT Dept, COUNT(*) FROM Emp WHERE COUNT(*) > 5 GROUP BY Dept;",
      "SELECT Dept, COUNT(*) FROM Emp GROUP BY Dept HAVING COUNT(*) > 5;",
      "SELECT Dept, COUNT(*) FROM Emp HAVING COUNT(*) > 5;",
      "SELECT Dept, COUNT(*) FROM Emp GROUP BY Dept WHERE COUNT(*) > 5;"
    ],
    "correctAnswer": 1,
    "explanation": "GROUP BY Dept HAVING COUNT(*) > 5 correctly groups by department and filters groups."
  },
  {
    "id": 17,
    "question": "[Topic 0 Q17] What is the difference between WHERE Dept = 'IT' and HAVING Dept = 'IT'?",
    "options": [
      "WHERE filters rows before grouping (more efficient); HAVING filters after grouping",
      "WHERE only works on numbers",
      "HAVING cannot be used without SUM",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "WHERE filters rows before grouping, minimizing rows processed; HAVING on non-aggregates is inefficient."
  },
  {
    "id": 18,
    "question": "[Topic 0 Q18] In MySQL, can you group by multiple columns, such as 'GROUP BY Dept, Designation'?",
    "options": [
      "No, SQL allows grouping by only 1 column",
      "Yes, it creates a group for each unique combination of Dept and Designation",
      "Only if both are numeric",
      "Only with primary keys"
    ],
    "correctAnswer": 1,
    "explanation": "Multi-column grouping aggregates data for each distinct combination of values."
  },
  {
    "id": 19,
    "question": "[Topic 0 Q19] Which function returns the alphabetically earliest name in a student relation?",
    "options": [
      "FIRST(SName)",
      "MIN(SName)",
      "TOP(SName)",
      "LOWEST(SName)"
    ],
    "correctAnswer": 1,
    "explanation": "MIN() on string columns evaluates ASCII/lexicographical order and returns the first string."
  },
  {
    "id": 20,
    "question": "[Topic 0 Q20] What happens if you run 'SELECT * FROM Student, Course;' without a WHERE clause?",
    "options": [
      "MySQL produces an error",
      "Only matching rows are displayed",
      "A full Cartesian Product (cross join) of all rows is generated",
      "No rows are displayed"
    ],
    "correctAnswer": 2,
    "explanation": "Without a join condition in WHERE, SQL produces the unconstrained Cartesian Product."
  },
  {
    "id": 21,
    "question": "[Topic 0 Q21] If Table1 has 10 tuples and Table2 has 0 tuples, what is the cardinality of their Cartesian Product?",
    "options": [
      "10",
      "0",
      "1",
      "Error"
    ],
    "correctAnswer": 1,
    "explanation": "Cardinality = 10 * 0 = 0 tuples."
  },
  {
    "id": 22,
    "question": "[Topic 0 Q22] Which clause is evaluated LAST in a SQL query?",
    "options": [
      "SELECT",
      "FROM",
      "HAVING",
      "ORDER BY"
    ],
    "correctAnswer": 3,
    "explanation": "ORDER BY is evaluated last to sort the projected result set."
  },
  {
    "id": 23,
    "question": "[Topic 0 Q23] Can HAVING be used in a query that does NOT have a GROUP BY clause?",
    "options": [
      "Yes, the entire table is treated as a single group",
      "No, HAVING is illegal without GROUP BY",
      "Only in Oracle, not MySQL",
      "Only if WHERE is omitted"
    ],
    "correctAnswer": 0,
    "explanation": "In SQL, HAVING without GROUP BY treats the entire table as a single aggregate group."
  },
  {
    "id": 24,
    "question": "[Topic 0 Q24] Which query displays the highest marks scored in each stream?",
    "options": [
      "SELECT Stream, MAX(Marks) FROM Student GROUP BY Stream;",
      "SELECT Stream, MAX(Marks) FROM Student;",
      "SELECT Stream, TOP(Marks) FROM Student GROUP BY Stream;",
      "SELECT Stream, HIGH(Marks) FROM Student;"
    ],
    "correctAnswer": 0,
    "explanation": "GROUP BY Stream with MAX(Marks) computes the maximum score per stream."
  },
  {
    "id": 25,
    "question": "[Topic 0 Q25] Why is an Equi-Join called an 'Inner Join' in relational algebra?",
    "options": [
      "Because it only returns rows that have matching values in both tables",
      "Because it includes rows with unmatched NULLs",
      "Because it operates on internal hard drives",
      "Because it runs inside a procedure"
    ],
    "correctAnswer": 0,
    "explanation": "Inner joins include strictly the intersection of rows satisfying the match condition in both tables."
  }
];
export default questions;
