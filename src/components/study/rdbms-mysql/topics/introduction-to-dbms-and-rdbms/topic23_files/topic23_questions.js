/**
 * Topic 23: Introduction to SQL – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "What does SQL stand for and what is it used for?",
    shortAnswer:
      "SQL stands for Structured Query Language. It is used to manage and manipulate relational databases.",
    explanation:
      "SQL allows you to create, read, update, and delete data, as well as define and control the database structure. It is the standard language for relational databases.",
    hint: "Think about the language used to talk to databases.",
    level: "basic",
    codeExample: "SELECT * FROM Students;",
  },
  {
    question: "What are the main categories of SQL statements?",
    shortAnswer:
      "The main categories are DDL (Data Definition Language), DML (Data Manipulation Language), DQL (Data Query Language), DCL (Data Control Language), and TCL (Transaction Control Language).",
    explanation:
      "DDL defines schema (CREATE, ALTER, DROP). DML manipulates data (INSERT, UPDATE, DELETE). DQL queries data (SELECT). DCL controls access (GRANT, REVOKE). TCL manages transactions (COMMIT, ROLLBACK).",
    hint: "Think about the different types of operations you can perform on a database.",
    level: "basic",
  },
  {
    question: "What is DDL and what are some examples?",
    shortAnswer:
      "DDL (Data Definition Language) is used to define and modify the database schema. Examples: CREATE, ALTER, DROP, TRUNCATE.",
    explanation:
      "DDL statements change the structure of the database, not the data itself. They are auto-committed in many databases.",
    hint: "Think about commands that create or change tables.",
    level: "basic",
  },
  {
    question: "What is DML and what are some examples?",
    shortAnswer:
      "DML (Data Manipulation Language) is used to manage data within tables. Examples: INSERT, UPDATE, DELETE, MERGE.",
    explanation:
      "DML statements modify the data stored in the database. They are often used in transactions.",
    hint: "Think about commands that add, update, or remove data.",
    level: "basic",
  },
  {
    question: "What is DQL and what is the primary command?",
    shortAnswer:
      "DQL (Data Query Language) is used to retrieve data from the database. The primary command is SELECT.",
    explanation:
      "SELECT queries can be simple or complex, with filtering, grouping, sorting, and joining of tables.",
    hint: "Think about the command to get data from tables.",
    level: "basic",
  },
  {
    question: "What is the difference between DDL and DML?",
    shortAnswer:
      "DDL defines the structure (schema) of the database; DML manipulates the data within that structure.",
    explanation:
      "DDL: CREATE, ALTER, DROP. DML: INSERT, UPDATE, DELETE. DDL is auto-commit; DML often requires explicit COMMIT.",
    hint: "Think about changing the table vs. changing the data.",
    level: "basic",
  },
  {
    question: "What is the purpose of the SELECT statement?",
    shortAnswer:
      "SELECT is used to retrieve data from one or more tables in the database.",
    explanation:
      "You can specify which columns to return, filter rows with WHERE, sort with ORDER BY, and group with GROUP BY.",
    hint: "Think about the command to view data.",
    level: "basic",
    codeExample: "SELECT * FROM Students WHERE Class = 10;",
  },
  {
    question: "What is the WHERE clause in SQL?",
    shortAnswer:
      "WHERE is used to filter rows based on a condition, returning only the rows that meet the condition.",
    explanation:
      "For example, `WHERE Class = 10` returns only students in Class 10. Conditions can use operators like =, >, <, LIKE, IN, etc.",
    hint: "Think about how you filter data.",
    level: "basic",
  },
  {
    question: "What is the ORDER BY clause in SQL?",
    shortAnswer:
      "ORDER BY is used to sort the results of a query in ascending (ASC) or descending (DESC) order based on one or more columns.",
    explanation:
      "For example, `ORDER BY Name ASC` sorts results alphabetically by Name.",
    hint: "Think about how you sort data.",
    level: "basic",
  },
  {
    question: "What is the GROUP BY clause in SQL?",
    shortAnswer:
      "GROUP BY is used to group rows that have the same values in specified columns, often used with aggregate functions.",
    explanation:
      "For example, `GROUP BY Class` groups students by class. You can then use COUNT, SUM, AVG, etc. on each group.",
    hint: "Think about grouping data for aggregation.",
    level: "intermediate",
  },
  {
    question: "What are aggregate functions in SQL?",
    shortAnswer:
      "Aggregate functions perform calculations on a set of rows and return a single value. Examples: COUNT, SUM, AVG, MAX, MIN.",
    explanation:
      "They are often used with GROUP BY to summarise data. For example, `AVG(marks)` returns the average mark.",
    hint: "Think about functions that compute a single value from many rows.",
    level: "intermediate",
  },
  {
    question: "What is the difference between WHERE and HAVING?",
    shortAnswer:
      "WHERE filters rows before grouping; HAVING filters groups after grouping.",
    explanation:
      "WHERE is used with individual rows; HAVING is used with aggregate results. For example, `HAVING COUNT(*) > 5` filters groups with more than 5 rows.",
    hint: "Think about filtering before vs. after grouping.",
    level: "intermediate",
  },
  {
    question: "What is the difference between INNER JOIN and LEFT JOIN?",
    shortAnswer:
      "INNER JOIN returns only rows with matching values in both tables; LEFT JOIN returns all rows from the left table, with matched rows from the right (or NULL if no match).",
    explanation:
      "INNER JOIN is for matches; LEFT JOIN is for preserving left table rows regardless of match.",
    hint: "Think about which rows are kept when there's no match.",
    level: "intermediate",
  },
  {
    question: "What is a self-join in SQL?",
    shortAnswer:
      "A self-join is when a table is joined with itself, using different aliases, to query hierarchical or relational data within the same table.",
    explanation:
      "For example, an employee table with ManagerID that references EmployeeID uses a self-join.",
    hint: "Think about joining a table to itself.",
    level: "intermediate",
  },
  {
    question: "What is a subquery in SQL?",
    shortAnswer:
      "A subquery is a query nested inside another query (SELECT, INSERT, UPDATE, DELETE). It returns data used by the outer query.",
    explanation:
      "Subqueries can be used in WHERE, FROM, or SELECT clauses. For example, `WHERE Age > (SELECT AVG(Age) FROM Students)`.",
    hint: "Think about a query within a query.",
    level: "intermediate",
  },
  {
    question: "What is the difference between UNION and UNION ALL?",
    shortAnswer:
      "UNION combines results from multiple SELECT statements and removes duplicates; UNION ALL includes all rows, including duplicates.",
    explanation:
      "UNION is slower due to duplicate removal; UNION ALL is faster if you don't need unique rows.",
    hint: "Think about whether you want duplicates removed.",
    level: "intermediate",
  },
  {
    question: "What is the purpose of the INSERT statement?",
    shortAnswer:
      "INSERT is used to add new rows to a table.",
    explanation:
      "You can specify values for all columns or just selected columns. Example: `INSERT INTO Students (StudentID, Name) VALUES (106, 'Amit')`.",
    hint: "Think about adding data to a table.",
    level: "basic",
  },
  {
    question: "What is the purpose of the UPDATE statement?",
    shortAnswer:
      "UPDATE is used to modify existing rows in a table.",
    explanation:
      "It typically includes a WHERE clause to specify which rows to update. Example: `UPDATE Students SET Class = 11 WHERE StudentID = 101`.",
    hint: "Think about changing existing data.",
    level: "basic",
  },
  {
    question: "What is the purpose of the DELETE statement?",
    shortAnswer:
      "DELETE is used to remove rows from a table.",
    explanation:
      "It also usually includes a WHERE clause to avoid deleting all rows. Example: `DELETE FROM Students WHERE StudentID = 106`.",
    hint: "Think about removing data.",
    level: "basic",
  },
  {
    question: "What is the difference between DELETE and TRUNCATE?",
    shortAnswer:
      "DELETE removes rows one by one and can be rolled back; TRUNCATE removes all rows in one operation and cannot be rolled back (in many databases).",
    explanation:
      "TRUNCATE is faster because it doesn't log individual row deletions, but it also resets auto-increment counters.",
    hint: "Think about the speed and ability to rollback.",
    level: "intermediate",
  },
  {
    question: "What is the purpose of the GRANT statement?",
    shortAnswer:
      "GRANT is used to give users permissions on database objects (tables, views, etc.).",
    explanation:
      "For example, `GRANT SELECT ON Students TO user1` allows user1 to query the Students table.",
    hint: "Think about giving access.",
    level: "intermediate",
  },
  {
    question: "What is the purpose of the REVOKE statement?",
    shortAnswer:
      "REVOKE is used to remove permissions that were previously granted.",
    explanation:
      "For example, `REVOKE SELECT ON Students FROM user1` removes user1's query permission.",
    hint: "Think about removing access.",
    level: "intermediate",
  },
  {
    question: "What is a view in SQL?",
    shortAnswer:
      "A view is a virtual table based on a SELECT query. It presents data without storing it physically.",
    explanation:
      "Views can simplify complex queries, restrict access to specific data, and provide a layer of abstraction.",
    hint: "Think about a saved query that looks like a table.",
    level: "intermediate",
  },
  {
    question: "What is a stored procedure in SQL?",
    shortAnswer:
      "A stored procedure is a pre-compiled block of SQL code stored in the database that can be executed repeatedly.",
    explanation:
      "Procedures can accept parameters, contain logic, and perform complex operations. They improve performance and security.",
    hint: "Think about a reusable query or function.",
    level: "intermediate",
  },
  {
    question: "What is a trigger in SQL?",
    shortAnswer:
      "A trigger is a piece of code that automatically executes in response to certain events on a table (INSERT, UPDATE, DELETE).",
    explanation:
      "Triggers are used to enforce business rules, maintain audit trails, or automate actions.",
    hint: "Think about automatic actions on data changes.",
    level: "intermediate",
  },
  {
    question: "What is the difference between a primary key and a foreign key in SQL?",
    shortAnswer:
      "A primary key uniquely identifies a row; a foreign key references a primary key in another table to establish a relationship.",
    explanation:
      "Primary keys enforce entity integrity; foreign keys enforce referential integrity.",
    hint: "Think about internal uniqueness vs. external reference.",
    level: "basic",
  },
  {
    question: "What is the purpose of the COMMIT statement?",
    shortAnswer:
      "COMMIT is used to permanently save all changes made in the current transaction.",
    explanation:
      "After COMMIT, changes become visible to other users and cannot be rolled back.",
    hint: "Think about saving changes permanently.",
    level: "intermediate",
  },
  {
    question: "What is the purpose of the ROLLBACK statement?",
    shortAnswer:
      "ROLLBACK is used to undo all changes made in the current transaction, reverting to the previous state.",
    explanation:
      "This is useful when an error occurs or when you want to discard changes.",
    hint: "Think about undoing changes.",
    level: "intermediate",
  },
  {
    question: "What is SQL injection and how can it be prevented?",
    shortAnswer:
      "SQL injection is a security vulnerability where attackers insert malicious SQL code into queries. It can be prevented by using parameterized queries, prepared statements, and input validation.",
    explanation:
      "Never concatenate user input directly into SQL strings. Use parameterized queries (e.g., with `?` placeholders).",
    hint: "Think about protecting against malicious input.",
    level: "expert",
  },
  {
    question: "What is the difference between SQL and MySQL?",
    shortAnswer:
      "SQL is the language; MySQL is an RDBMS that uses SQL.",
    explanation:
      "SQL is the standard query language. MySQL is a specific database system that implements SQL.",
    hint: "Think about the language vs. the software.",
    level: "basic",
  },
  {
    question: "What are the common SQL data types?",
    shortAnswer:
      "Common data types include INT (integer), VARCHAR (variable string), DATE, DATETIME, DECIMAL (exact number), and BOOLEAN.",
    explanation:
      "Data types define the kind of data a column can hold and affect storage and operations.",
    hint: "Think about the types of values you store.",
    level: "basic",
  },
];

export default questions;