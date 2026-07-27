/**
 * Topic 24: SQL Categories – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "What are the five main categories of SQL statements?",
    shortAnswer:
      "The five categories are DDL (Data Definition Language), DML (Data Manipulation Language), DQL (Data Query Language), DCL (Data Control Language), and TCL (Transaction Control Language).",
    explanation:
      "Each category serves a distinct purpose: DDL defines schema, DML manipulates data, DQL queries data, DCL controls access, and TCL manages transactions.",
    hint: "Think about the different types of operations you can perform on a database.",
    level: "basic",
  },
  {
    question: "What does DDL stand for and what is its purpose?",
    shortAnswer:
      "DDL stands for Data Definition Language. It is used to define and modify the database schema.",
    explanation:
      "DDL statements include CREATE, ALTER, DROP, TRUNCATE, and RENAME. They affect the structure of the database and are auto-committed.",
    hint: "Think about commands that create or change tables.",
    level: "basic",
  },
  {
    question: "What are some examples of DDL commands?",
    shortAnswer:
      "Examples include CREATE, ALTER, DROP, TRUNCATE, and RENAME.",
    explanation:
      "CREATE makes new objects, ALTER changes existing objects, DROP removes objects, TRUNCATE empties a table, and RENAME changes object names.",
    hint: "Think about commands that change the structure, not the data.",
    level: "basic",
  },
  {
    question: "What does DML stand for and what is its purpose?",
    shortAnswer:
      "DML stands for Data Manipulation Language. It is used to manage data within tables.",
    explanation:
      "DML statements include INSERT, UPDATE, DELETE, and MERGE. They modify the data stored in the database and can be rolled back if used in a transaction.",
    hint: "Think about commands that add, update, or remove data.",
    level: "basic",
  },
  {
    question: "What are some examples of DML commands?",
    shortAnswer:
      "Examples include INSERT, UPDATE, DELETE, and MERGE.",
    explanation:
      "INSERT adds new rows, UPDATE modifies existing rows, DELETE removes rows, and MERGE combines data from multiple sources.",
    hint: "Think about changing the data in tables.",
    level: "basic",
  },
  {
    question: "What does DQL stand for and what is its primary command?",
    shortAnswer:
      "DQL stands for Data Query Language. The primary command is SELECT.",
    explanation:
      "DQL is used to retrieve data from the database. SELECT can be combined with clauses like WHERE, GROUP BY, HAVING, and ORDER BY.",
    hint: "Think about the command to get data from tables.",
    level: "basic",
  },
  {
    question: "What does DCL stand for and what is its purpose?",
    shortAnswer:
      "DCL stands for Data Control Language. It is used to control access to database objects.",
    explanation:
      "DCL commands include GRANT and REVOKE. They manage permissions and security, ensuring that only authorised users can perform certain operations.",
    hint: "Think about granting or revoking permissions.",
    level: "basic",
  },
  {
    question: "What are some examples of DCL commands?",
    shortAnswer:
      "Examples include GRANT and REVOKE.",
    explanation:
      "GRANT gives permissions to users or roles. REVOKE removes permissions that were previously granted.",
    hint: "Think about giving or taking away access.",
    level: "basic",
  },
  {
    question: "What does TCL stand for and what is its purpose?",
    shortAnswer:
      "TCL stands for Transaction Control Language. It is used to manage transactions.",
    explanation:
      "TCL commands include COMMIT, ROLLBACK, SAVEPOINT, and SET TRANSACTION. They ensure data consistency by controlling the execution of groups of operations.",
    hint: "Think about saving or undoing changes.",
    level: "basic",
  },
  {
    question: "What are some examples of TCL commands?",
    shortAnswer:
      "Examples include COMMIT, ROLLBACK, SAVEPOINT, and SET TRANSACTION.",
    explanation:
      "COMMIT saves changes permanently, ROLLBACK undoes changes, SAVEPOINT creates a point within a transaction, and SET TRANSACTION sets transaction properties.",
    hint: "Think about managing a group of changes.",
    level: "basic",
  },
  {
    question: "What is the difference between DDL and DML?",
    shortAnswer:
      "DDL defines the structure (schema) of the database, while DML manipulates the data within that structure.",
    explanation:
      "DDL: CREATE, ALTER, DROP. DML: INSERT, UPDATE, DELETE. DDL is auto-committed; DML often requires explicit transactions.",
    hint: "Think about changing the table vs. changing the data.",
    level: "basic",
  },
  {
    question: "What is the difference between DML and DQL?",
    shortAnswer:
      "DML modifies data (INSERT, UPDATE, DELETE), while DQL only retrieves data (SELECT).",
    explanation:
      "DML changes the database state; DQL is read-only and does not modify any data.",
    hint: "Think about changing vs. reading data.",
    level: "basic",
  },
  {
    question: "What is the difference between DCL and TCL?",
    shortAnswer:
      "DCL controls access and permissions (security), while TCL manages transactions (data consistency).",
    explanation:
      "DCL: GRANT, REVOKE. TCL: COMMIT, ROLLBACK. Both are about control, but at different levels.",
    hint: "Think about access control vs. transaction control.",
    level: "intermediate",
  },
  {
    question: "Are DDL statements auto-committed?",
    shortAnswer:
      "Yes, in most databases, DDL statements are auto-committed and cannot be rolled back.",
    explanation:
      "This means that once a DDL statement is executed, the change is permanent. Use DDL with caution, especially in production environments.",
    hint: "Think about whether you can undo a CREATE TABLE.",
    level: "intermediate",
  },
  {
    question: "Can DML statements be rolled back?",
    shortAnswer:
      "Yes, DML statements can be rolled back if they are executed within a transaction.",
    explanation:
      "By using TCL commands like BEGIN TRANSACTION, COMMIT, and ROLLBACK, you can control whether DML changes are permanent.",
    hint: "Think about undoing an INSERT or UPDATE.",
    level: "intermediate",
  },
  {
    question: "What is the purpose of the GRANT command?",
    shortAnswer:
      "GRANT is used to give specific permissions (privileges) to users or roles on database objects.",
    explanation:
      "For example: `GRANT SELECT ON Students TO user1` allows user1 to query the Students table.",
    hint: "Think about giving access.",
    level: "intermediate",
  },
  {
    question: "What is the purpose of the REVOKE command?",
    shortAnswer:
      "REVOKE is used to remove permissions that were previously granted.",
    explanation:
      "For example: `REVOKE SELECT ON Students FROM user1` removes user1's query permission.",
    hint: "Think about removing access.",
    level: "intermediate",
  },
  {
    question: "What is the purpose of the COMMIT command?",
    shortAnswer:
      "COMMIT is used to permanently save all changes made in the current transaction.",
    explanation:
      "After COMMIT, changes become visible to other users and cannot be rolled back.",
    hint: "Think about saving changes permanently.",
    level: "intermediate",
  },
  {
    question: "What is the purpose of the ROLLBACK command?",
    shortAnswer:
      "ROLLBACK is used to undo all changes made in the current transaction, reverting to the previous state.",
    explanation:
      "This is useful when an error occurs or when you want to discard changes.",
    hint: "Think about undoing changes.",
    level: "intermediate",
  },
  {
    question: "What is a SAVEPOINT in TCL?",
    shortAnswer:
      "A SAVEPOINT is a marker within a transaction that allows you to roll back to that specific point, rather than rolling back the entire transaction.",
    explanation:
      "This gives finer control over transaction management. For example: `SAVEPOINT sp1; ... ROLLBACK TO sp1;`",
    hint: "Think about a checkpoint in a transaction.",
    level: "expert",
  },
  {
    question: "Can you use DDL inside a transaction?",
    shortAnswer:
      "In most databases, DDL is auto-committed and cannot be part of a transaction. However, some databases (like PostgreSQL) support transactional DDL.",
    explanation:
      "Check your database's documentation for transactional DDL support.",
    hint: "Think about whether you can rollback a CREATE TABLE.",
    level: "expert",
  },
  {
    question: "What is the difference between TRUNCATE and DELETE?",
    shortAnswer:
      "TRUNCATE is a DDL command that removes all rows from a table and resets auto-increment counters; DELETE is a DML command that removes rows one by one and can be rolled back.",
    explanation:
      "TRUNCATE is faster because it doesn't log individual row deletions, but it cannot be rolled back (in many databases).",
    hint: "Think about the speed and ability to rollback.",
    level: "intermediate",
  },
  {
    question: "What is the role of DQL in data analysis?",
    shortAnswer:
      "DQL (SELECT) is the primary tool for data analysis, enabling data retrieval, aggregation, filtering, and joining.",
    explanation:
      "Analysts use SELECT queries to create reports, dashboards, and perform exploratory data analysis.",
    hint: "Think about how you get data for analysis.",
    level: "intermediate",
  },
  {
    question: "How does DCL contribute to database security?",
    shortAnswer:
      "DCL controls who can access and manipulate data, enforcing the principle of least privilege.",
    explanation:
      "By granting only necessary permissions, DCL reduces the risk of data breaches and unauthorised changes.",
    hint: "Think about how permissions protect data.",
    level: "intermediate",
  },
  {
    question: "What is the significance of TCL in financial applications?",
    shortAnswer:
      "TCL ensures that financial transactions are atomic, consistent, isolated, and durable (ACID).",
    explanation:
      "For example, a money transfer must either complete fully or not at all — TCL guarantees this through COMMIT and ROLLBACK.",
    hint: "Think about a bank transfer.",
    level: "intermediate",
  },
  {
    question: "What are the common mistakes when using DDL?",
    shortAnswer:
      "Common mistakes include: forgetting that DDL is auto-committed, not backing up before ALTER/DROP, and not testing DDL in a development environment.",
    explanation:
      "Always test DDL changes in a safe environment and have a rollback plan.",
    hint: "Think about the risks of changing the database structure.",
    level: "intermediate",
  },
  {
    question: "What are the common mistakes when using DML?",
    shortAnswer:
      "Common mistakes include: forgetting the WHERE clause in UPDATE/DELETE (deleting all rows), not using transactions, and not validating data before INSERT.",
    explanation:
      "Always use WHERE clauses and transactions to prevent accidental data loss.",
    hint: "Think about accidentally deleting all rows.",
    level: "intermediate",
  },
  {
    question: "What is the difference between DDL and DCL in terms of permanence?",
    shortAnswer:
      "DDL changes are permanent and auto-committed; DCL changes (permissions) are also permanent and auto-committed.",
    explanation:
      "Both DDL and DCL are generally auto-committed, unlike DML which can be rolled back.",
    hint: "Think about whether they can be undone.",
    level: "intermediate",
  },
  {
    question: "What is the role of SET TRANSACTION in TCL?",
    shortAnswer:
      "SET TRANSACTION is used to set transaction properties like isolation level, read/write mode, and transaction name.",
    explanation:
      "For example: `SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;`",
    hint: "Think about configuring transaction behavior.",
    level: "expert",
  },
  {
    question: "Can you use DML and DDL in the same transaction?",
    shortAnswer:
      "In some databases, yes (e.g., PostgreSQL), but in others (e.g., MySQL with InnoDB), DDL commits the transaction.",
    explanation:
      "Check your database's documentation for transactional behavior.",
    hint: "Think about whether you can mix structure and data changes.",
    level: "expert",
  },
  {
    question: "What is the relationship between SQL categories and database administration?",
    shortAnswer:
      "DBAs use all categories: DDL for schema management, DML for data maintenance, DQL for monitoring, DCL for security, and TCL for transaction management.",
    explanation:
      "Understanding all categories is essential for effective database administration.",
    hint: "Think about what a DBA does daily.",
    level: "intermediate",
  },
];

export default questions;