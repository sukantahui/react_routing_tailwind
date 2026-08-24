/**
 * Topic 35: Exploring MySQL Workbench Interface – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "What are the four main areas of the MySQL Workbench interface?",
    shortAnswer:
      "The four main areas are: Home Screen, Navigator, SQL Editor, and Administration.",
    explanation:
      "Home Screen manages connections and models. Navigator browses database objects. SQL Editor writes and executes queries. Administration manages server configuration and performance.",
    hint: "Think about the main functional areas of the application.",
    level: "basic",
  },
  {
    question: "What is the Navigator panel used for in MySQL Workbench?",
    shortAnswer:
      "The Navigator panel is used to browse, manage, and perform actions on database objects like schemas, tables, views, and stored procedures.",
    explanation:
      "It provides a tree view of the database server. Right-clicking on an object reveals context-sensitive actions.",
    hint: "Think about the tree structure on the left side.",
    level: "basic",
  },
  {
    question: "What is the SQL Editor in MySQL Workbench?",
    shortAnswer:
      "The SQL Editor is a text editor for writing, executing, and debugging SQL queries with features like syntax highlighting and auto-completion.",
    explanation:
      "It's the primary workspace for developing SQL queries. It includes a results grid, execution plan, and query builder.",
    hint: "Think about where you write queries.",
    level: "basic",
  },
  {
    question: "How do you open a new query tab in MySQL Workbench?",
    shortAnswer:
      "Click the 'New Query Tab' button (file icon with a plus) or use the shortcut `Ctrl+T` (or `Cmd+T` on macOS).",
    explanation:
      "This opens a new SQL Editor tab where you can write and execute queries independently.",
    hint: "Think about the shortcut for a new tab.",
    level: "basic",
  },
  {
    question: "What is the purpose of the 'Execute' button in the SQL Editor?",
    shortAnswer:
      "It executes the currently selected SQL statement or all statements if none are selected.",
    explanation:
      "You can also use `Ctrl+Enter` (or `Cmd+Enter` on macOS) to execute the current query.",
    hint: "Think about the lightning bolt icon.",
    level: "basic",
  },
  {
    question: "How do you format SQL queries in MySQL Workbench?",
    shortAnswer:
      "Use the 'Format SQL' option under the Edit menu or use the shortcut `Ctrl+B` (or `Cmd+B` on macOS).",
    explanation:
      "This beautifies your SQL code, making it more readable and consistent.",
    hint: "Think about the beautify shortcut.",
    level: "intermediate",
  },
  {
    question: "What is the Query Builder in MySQL Workbench?",
    shortAnswer:
      "The Query Builder is a visual tool that allows you to construct queries by dragging and dropping tables and columns.",
    explanation:
      "It's useful for users who are not fully comfortable with writing complex SQL joins manually.",
    hint: "Think about a visual query tool.",
    level: "intermediate",
  },
  {
    question: "What is the Execution Plan in MySQL Workbench?",
    shortAnswer:
      "It's a visual representation of how MySQL executes a query, showing table scans, index usage, and join methods.",
    explanation:
      "It helps identify performance bottlenecks and optimise slow queries.",
    hint: "Think about the query analysis tool.",
    level: "intermediate",
  },
  {
    question: "How do you access the Administration tools in MySQL Workbench?",
    shortAnswer:
      "Click on the 'Server' menu and choose 'Administration', or click on a connection in the Navigator and select 'Server Status' or 'Users and Privileges'.",
    explanation:
      "The Administration section provides access to server configuration, logs, user management, and performance monitoring.",
    hint: "Think about the management dashboard.",
    level: "intermediate",
  },
  {
    question: "What is an EER (Enhanced Entity-Relationship) Diagram in Workbench?",
    shortAnswer:
      "It's a visual design tool for creating and documenting database schemas, including tables, columns, and relationships.",
    explanation:
      "You can create new designs or reverse-engineer existing databases into diagrams.",
    hint: "Think about the visual database design tool.",
    level: "intermediate",
  },
  {
    question: "What is Forward Engineering in the context of EER Diagrams?",
    shortAnswer:
      "Forward Engineering is the process of generating SQL scripts (e.g., CREATE TABLE statements) from an EER diagram.",
    explanation:
      "This allows you to visually design a database and then create the actual database schema automatically.",
    hint: "Think about going from diagram to SQL.",
    level: "intermediate",
  },
  {
    question: "What is Reverse Engineering in the context of EER Diagrams?",
    shortAnswer:
      "Reverse Engineering is the process of importing an existing database into Workbench to create an EER diagram.",
    explanation:
      "This is useful for documenting and analysing existing databases.",
    hint: "Think about going from SQL to diagram.",
    level: "intermediate",
  },
  {
    question: "How do you view table data in MySQL Workbench?",
    shortAnswer:
      "In the Navigator, right-click on a table and select 'Select Rows - Limit 1000' to view the first 1000 rows.",
    explanation:
      "This opens a result grid displaying the table data.",
    hint: "Think about viewing table data.",
    level: "basic",
  },
  {
    question: "What is the purpose of the 'Output' panel in Workbench?",
    shortAnswer:
      "The Output panel displays messages, errors, and query execution times.",
    explanation:
      "It's essential for debugging and understanding query performance.",
    hint: "Think about the panel that shows logs and messages.",
    level: "basic",
  },
  {
    question: "What is the 'History' panel in MySQL Workbench?",
    shortAnswer:
      "The History panel stores a log of previously executed SQL statements.",
    explanation:
      "You can search, re-run, or save queries from the history.",
    hint: "Think about query history.",
    level: "intermediate",
  },
  {
    question: "How do you export a database using MySQL Workbench?",
    shortAnswer:
      "Use the Data Export tool under the 'Server' menu or in the Administration section.",
    explanation:
      "You can export the structure and/or data as SQL files.",
    hint: "Think about the export tool.",
    level: "intermediate",
  },
  {
    question: "How do you import a database using MySQL Workbench?",
    shortAnswer:
      "Use the Data Import tool under the 'Server' menu or in the Administration section.",
    explanation:
      "You can import SQL files or CSV data.",
    hint: "Think about the import tool.",
    level: "intermediate",
  },
  {
    question: "What is the MySQL Workbench Home screen?",
    shortAnswer:
      "The Home screen is the starting page that shows recent connections, projects, and models.",
    explanation:
      "It also provides quick access to tutorials and MySQL community news.",
    hint: "Think about the starting page.",
    level: "basic",
  },
  {
    question: "How do you create a new database in Workbench?",
    shortAnswer:
      "In the Navigator, right-click on an empty area under 'Schemas' and select 'Create Schema', or use the SQL Editor to run `CREATE DATABASE db_name;`.",
    explanation:
      "The `CREATE SCHEMA` command is also available in the SQL Editor.",
    hint: "Think about the create schema option.",
    level: "basic",
  },
  {
    question: "What is the 'Server Status' page in Workbench?",
    shortAnswer:
      "It's a dashboard showing server performance metrics, including connections, query statistics, and uptime.",
    explanation:
      "It's useful for health monitoring and quick performance checks.",
    hint: "Think about the performance dashboard.",
    level: "intermediate",
  },
  {
    question: "How do you manage MySQL users in Workbench?",
    shortAnswer:
      "In the Administration section, go to 'Users and Privileges' to add, remove, and manage user accounts.",
    explanation:
      "You can grant or revoke privileges on databases and tables.",
    hint: "Think about user management.",
    level: "intermediate",
  },
  {
    question: "What is the purpose of the 'Visual Explain' feature in Workbench?",
    shortAnswer:
      "Visual Explain provides a graphical view of the query execution plan, making it easier to understand and optimise.",
    explanation:
      "It's an alternative to the text-based `EXPLAIN` output.",
    hint: "Think about the graphical plan viewer.",
    level: "intermediate",
  },
  {
    question: "How can you customise the MySQL Workbench layout?",
    shortAnswer:
      "You can drag and drop panels to different positions. You can also undock panels to create separate windows.",
    explanation:
      "Customize the layout under 'Edit' → 'Preferences' → 'Appearance'.",
    hint: "Think about customizing the workspace.",
    level: "intermediate",
  },
  {
    question: "What are SQL snippets in MySQL Workbench?",
    shortAnswer:
      "SQL snippets are pre-defined pieces of SQL code that can be inserted into queries quickly.",
    explanation:
      "You can create custom snippets for commonly used queries or code blocks.",
    hint: "Think about reusable code templates.",
    level: "expert",
  },
  {
    question: "What is the role of the `mysql` system database in Workbench?",
    shortAnswer:
      "The `mysql` database stores user accounts, privileges, and system metadata. Workbench uses it for authentication and permission management.",
    explanation:
      "It appears in the Navigator. Do not modify it directly unless you are an advanced user.",
    hint: "Think about the system database.",
    level: "intermediate",
  },
  {
    question: "How do you set a default database for a Workbench connection?",
    shortAnswer:
      "When creating or editing a connection, specify the 'Default Schema' in the connection parameters.",
    explanation:
      "This automatically selects the database when you connect.",
    hint: "Think about the default schema option.",
    level: "intermediate",
  },
  {
    question: "What is the 'Performance Dashboard' in Workbench?",
    shortAnswer:
      "It's a real-time monitoring tool that provides metrics on queries, I/O, and server performance.",
    explanation:
      "It helps identify bottlenecks and performance issues.",
    hint: "Think about real-time monitoring.",
    level: "intermediate",
  },
  {
    question: "How do you view the MySQL error log in Workbench?",
    shortAnswer:
      "In the Administration section, select 'Server Logs' to view the error log.",
    explanation:
      "This is helpful for troubleshooting server issues.",
    hint: "Think about the server logs.",
    level: "intermediate",
  },
  {
    question: "What is the purpose of the 'Query History' tab?",
    shortAnswer:
      "It shows a log of all queries executed in the current session.",
    explanation:
      "You can double-click a query from the history to load it into the SQL Editor.",
    hint: "Think about recent queries.",
    level: "intermediate",
  },
  {
    question: "What are the system requirements for MySQL Workbench?",
    shortAnswer:
      "Windows 10/11, macOS 10.15+, or Linux with 2GB RAM and ~500MB disk space.",
    explanation:
      "Specific libraries may be required (e.g., .NET Framework on Windows, GTK+ on Linux).",
    hint: "Think about the hardware and OS requirements.",
    level: "basic",
  },
  {
    question: "How do you update MySQL Workbench?",
    shortAnswer:
      "Check for updates via 'Help' → 'Check for Updates' or download the latest version from the official website.",
    explanation:
      "Updating ensures you have the latest features and security fixes.",
    hint: "Think about the update process.",
    level: "basic",
  },
];

export default questions;