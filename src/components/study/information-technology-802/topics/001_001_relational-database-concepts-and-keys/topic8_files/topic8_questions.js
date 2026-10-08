export default [
  {
    "id": "t8_q1",
    "question": "What character is used as the standard statement delimiter / terminator in SQL and MySQL Command Line Client?",
    "options": [
      "Semicolon (`;`)",
      "Colon (`:`)",
      "Period (`.`)",
      "Comma (`, `)"
    ],
    "answer": "Semicolon (`;`)",
    "explanation": "In SQL and MySQL client sessions, the semicolon (`;`) signals the parser that the command is complete and ready to execute.",
    "explanationBn": "SQL এবং MySQL ক্লায়েন্টে প্রতিটি স্টেটমেন্ট শেষ করতে সেমিকোলন (`;`) ব্যবহার করা হয়।"
  },
  {
    "id": "t8_q2",
    "question": "Which MySQL command is used to select and activate a specific database for subsequent queries?",
    "options": [
      "`USE database_name;`",
      "`OPEN database_name;`",
      "`SELECT database_name;`",
      "`ACTIVATE database_name;`"
    ],
    "answer": "`USE database_name;`",
    "explanation": "`USE dbname;` switches the active session context to the designated database schema.",
    "explanationBn": "কোনো নির্দিষ্ট ডেটাবেস ওপেন বা সিলেক্ট করার কমান্ড হলো `USE ডেটাবেসের_নাম;`।"
  },
  {
    "id": "t8_q3",
    "question": "Which command displays a list of all existing tables inside the currently active database?",
    "options": [
      "`SHOW TABLES;`",
      "`LIST TABLES;`",
      "`VIEW TABLES;`",
      "`DISPLAY TABLES;`"
    ],
    "answer": "`SHOW TABLES;`",
    "explanation": "`SHOW TABLES;` queries the information schema to list all tables and views in the current database.",
    "explanationBn": "বর্তমান ডেটাবেসের সমস্ত টেবিল দেখতে `SHOW TABLES;` কমান্ড দিতে হয়।"
  },
  {
    "id": "t8_q4",
    "question": "Which command inspects the column names, data types, NULLability, keys, and default values of a table?",
    "options": [
      "`DESCRIBE table_name;` or `DESC table_name;`",
      "`INSPECT table_name;`",
      "`CHECK table_name;`",
      "`STRUCTURE table_name;`"
    ],
    "answer": "`DESCRIBE table_name;` or `DESC table_name;`",
    "explanation": "`DESCRIBE` (or shorthand `DESC`) outputs the Field, Type, Null, Key, Default, and Extra attributes of the table schema.",
    "explanationBn": "টেবিলের কলামের গঠন বা স্ট্রাকচার দেখতে `DESCRIBE টেবিল_নাম;` বা `DESC টেবিল_নাম;` ব্যবহার করা হয়।"
  },
  {
    "id": "t8_q5",
    "question": "Which command lists all databases accessible to the current logged-in MySQL user?",
    "options": [
      "`SHOW DATABASES;`",
      "`LIST DATABASES;`",
      "`GET DATABASES;`",
      "`DISPLAY DATABASES;`"
    ],
    "answer": "`SHOW DATABASES;`",
    "explanation": "`SHOW DATABASES;` prints all schemas configured in the server catalog for which the user has permissions.",
    "explanationBn": "সার্ভারে থাকা সমস্ত ডেটাবেসের তালিকা দেখতে `SHOW DATABASES;` ব্যবহৃত হয়।"
  },
  {
    "id": "t8_q6",
    "question": "What happens if a user presses ENTER on a SQL statement without typing the trailing semicolon (`;`) in MySQL CLI?",
    "options": [
      "The client displays a continuation prompt (`->`) waiting for the semicolon terminator",
      "The computer deletes the database",
      "The terminal shuts down immediately",
      "The command executes automatically"
    ],
    "answer": "The client displays a continuation prompt (`->`) waiting for the semicolon terminator",
    "explanation": "MySQL supports multi-line queries; pressing ENTER without a semicolon continues the input on a new line with the `->` prompt.",
    "explanationBn": "সেমিকোলন ছাড়া এন্টার দিলে MySQL কমান্ড এক্সিকিউট না করে পরবর্তী লাইনের জন্য কন্টিনিউয়েশন প্রম্পট (`->`) দেখায়।"
  },
  {
    "id": "t8_q7",
    "question": "Which SQL query returns the name of the currently active database in the session?",
    "options": [
      "`SELECT DATABASE();`",
      "`GET CURRENT DATABASE;`",
      "`SHOW CURRENT DB;`",
      "`PRINT DATABASE;`"
    ],
    "answer": "`SELECT DATABASE();`",
    "explanation": "`DATABASE()` is a built-in session metadata function returning the active schema name (or NULL if none is selected).",
    "explanationBn": "`SELECT DATABASE();` কোয়েরির মাধ্যমে বর্তমানে কোন ডেটাবেস ওপেন আছে তা জানা যায়।"
  },
  {
    "id": "t8_q8",
    "question": "Which query returns the current logged-in username and host in MySQL?",
    "options": [
      "`SELECT CURRENT_USER();` or `SELECT USER();`",
      "`WHOAMI();`",
      "`GET USER();`",
      "`SHOW USER;`"
    ],
    "answer": "`SELECT CURRENT_USER();` or `SELECT USER();`",
    "explanation": "`CURRENT_USER()` displays the authenticated user identity (e.g. `root@localhost`).",
    "explanationBn": "লগইন করা ব্যবহারকারীর নাম ও হোস্ট দেখতে `SELECT CURRENT_USER();` ব্যবহার করা হয়।"
  },
  {
    "id": "t8_q9",
    "question": "Are SQL keywords (like `SELECT`, `FROM`, `WHERE`) case-sensitive in MySQL?",
    "options": [
      "No, SQL keywords and function names are completely case-insensitive (`SELECT` is identical to `select` and `Select`)",
      "Yes, SQL keywords must be typed in lowercase only",
      "Yes, SQL keywords must be in uppercase only",
      "Only on Tuesdays"
    ],
    "answer": "No, SQL keywords and function names are completely case-insensitive (`SELECT` is identical to `select` and `Select`)",
    "explanation": "SQL syntax is case-insensitive. However, table name case-sensitivity depends on the underlying OS file system (Windows vs Linux).",
    "explanationBn": "SQL কীওয়ার্ড (SELECT, FROM) কেস-ইনসেনসিটিভ—বড় বা ছোট হাতের যেকোনো অক্ষরে লেখা যায়।"
  },
  {
    "id": "t8_q10",
    "question": "What does the command `SHOW CREATE TABLE table_name;` display?",
    "options": [
      "The exact DDL `CREATE TABLE` statement with all column types, engines, and constraint definitions used to create that table",
      "A graphical chart of the table",
      "The list of employees who edited the table",
      "The date the hard drive was purchased"
    ],
    "answer": "The exact DDL `CREATE TABLE` statement with all column types, engines, and constraint definitions used to create that table",
    "explanation": "`SHOW CREATE TABLE` outputs the complete, exact SQL statement required to reconstruct the table.",
    "explanationBn": "`SHOW CREATE TABLE` কমান্ডটি টেবিলটি তৈরি করতে ব্যবহৃত হুবহু সম্পূর্ণ DDL কোড প্রদর্শন করে।"
  },
  {
    "id": "t8_q11",
    "question": "How can a user clear a typed multiline query buffer without executing it in MySQL Command Line?",
    "options": [
      "Type `\\c` and press ENTER",
      "Type `EXIT`",
      "Press Ctrl+Alt+Delete",
      "Turn off the computer monitor"
    ],
    "answer": "Type `\\c` and press ENTER",
    "explanation": "The `\\c` escape sequence cancels the current input buffer and returns to a fresh `mysql>` prompt.",
    "explanationBn": "`\\c` লিখে এন্টার দিলে অসমাপ্ত ভুল কোয়েরি বাফার থেকে মুছে ফ্রেশ প্রম্পটে ফিরে আসা যায়।"
  },
  {
    "id": "t8_q12",
    "question": "In Coder & AccoTax Barrackpore, Sukanta Hui logs into MySQL and needs to view the structure of `StudentMarksheet`. What command should he execute?",
    "options": [
      "`DESCRIBE StudentMarksheet;`",
      "`LOOKUP StudentMarksheet;`",
      "`OPEN StudentMarksheet;`",
      "`PRINT StudentMarksheet;`"
    ],
    "answer": "`DESCRIBE StudentMarksheet;`",
    "explanation": "`DESCRIBE StudentMarksheet;` prints the table's structural fields, keys, and types.",
    "explanationBn": "`DESCRIBE StudentMarksheet;` টেবিলের গঠন ও কলামগুলোর বিস্তারিত প্রদর্শন করবে।"
  },
  {
    "id": "t8_q13",
    "question": "Which of the following commands safely exits and closes the MySQL CLI session?",
    "options": [
      "`QUIT;` or `EXIT;` or `\\q`",
      "`CLOSE;`",
      "`SHUTDOWN;`",
      "`STOP;`"
    ],
    "answer": "`QUIT;` or `EXIT;` or `\\q`",
    "explanation": "`QUIT`, `EXIT`, or `\\q` terminates the interactive client connection.",
    "explanationBn": "MySQL ক্লায়েন্ট থেকে বের হতে `QUIT;`, `EXIT;` বা `\\q` ব্যবহার করা হয়।"
  },
  {
    "id": "t8_q14",
    "question": "What is the output of `SELECT VERSION();` in MySQL?",
    "options": [
      "The installed MySQL server version string (e.g. `8.0.36`)",
      "The version of Microsoft Windows",
      "The version of the monitor",
      "The date of today"
    ],
    "answer": "The installed MySQL server version string (e.g. `8.0.36`)",
    "explanation": "`VERSION()` returns the active MySQL database engine release version.",
    "explanationBn": "`SELECT VERSION();` বর্তমান MySQL সার্ভারের ভার্সন প্রদর্শন করে।"
  },
  {
    "id": "t8_q15",
    "question": "What does the `Key` column in `DESCRIBE table_name;` output indicate when it shows `PRI`?",
    "options": [
      "The attribute is part of the table's Primary Key",
      "The column is private",
      "The column contains prime numbers",
      "The column is printable"
    ],
    "answer": "The attribute is part of the table's Primary Key",
    "explanation": "`PRI` stands for Primary Key; `UNI` stands for Unique Key; `MUL` stands for non-unique index or foreign key.",
    "explanationBn": "`PRI` নির্দেশ করে যে কলামটি টেবিলের Primary Key-এর অংশ।"
  },
  {
    "id": "t8_q16",
    "question": "What does `MUL` indicate in the `Key` column of `DESCRIBE table_name;`?",
    "options": [
      "Multiple occurrences allowed / Indexed column / Foreign Key reference",
      "Multiplication table",
      "Multi-threaded CPU",
      "Multimedia audio file"
    ],
    "answer": "Multiple occurrences allowed / Indexed column / Foreign Key reference",
    "explanation": "`MUL` indicates that multiple rows may share the same value (often a foreign key).",
    "explanationBn": "`MUL` নির্দেশ করে যে কলামটি ইনডেক্স করা বা Foreign Key এবং এতে ডুপ্লিকেট মান থাকতে পারে।"
  },
  {
    "id": "t8_q17",
    "question": "What error is returned if a query is executed without first selecting a database with `USE`?",
    "options": [
      "`ERROR 1046 (3D000): No database selected`",
      "`ERROR 404: Not Found`",
      "`ERROR: Hard disk full`",
      "Zero rows returned"
    ],
    "answer": "`ERROR 1046 (3D000): No database selected`",
    "explanation": "Executing table queries without an active schema context triggers `No database selected` error.",
    "explanationBn": "`USE` না করে সরাসরি টেবিল অ্যাক্সেস করতে গেলে `No database selected` এরর আসে।"
  },
  {
    "id": "t8_q18",
    "question": "Which symbol in MySQL CLI indicates a single-line comment that is ignored during execution?",
    "options": [
      "`-- ` (double dash followed by space) or `#`",
      "`//`",
      "`<!-- -->`",
      "`%`"
    ],
    "answer": "`-- ` (double dash followed by space) or `#`",
    "explanation": "Standard ANSI SQL uses `-- ` for single-line comments; MySQL also supports `#`.",
    "explanationBn": "SQL-এ কমেন্ট লিখতে `-- ` (ডাবল ড্যাশ ও স্পেস) বা `#` ব্যবহৃত হয়।"
  },
  {
    "id": "t8_q19",
    "question": "Which symbol indicates a multi-line comment block in SQL?",
    "options": [
      "`/* ... */`",
      "`<!-- ... -->`",
      "`''' ... '''`",
      "`## ... ##`"
    ],
    "answer": "`/* ... */`",
    "explanation": "C-style `/* comment */` syntax is standard across SQL engines for block comments.",
    "explanationBn": "একাধিক লাইনের কমেন্টের জন্য `/* ... */` ব্যবহার করা হয়।"
  },
  {
    "id": "t8_q20",
    "question": "Can multiple SQL statements separated by semicolons be submitted in a single script file?",
    "options": [
      "Yes, SQL script files execute statements sequentially, each terminated by a semicolon (`;`)",
      "No, only one statement per file is permitted",
      "Only on Linux",
      "Only in Python"
    ],
    "answer": "Yes, SQL script files execute statements sequentially, each terminated by a semicolon (`;`)",
    "explanation": "Semicolons allow script batch runners to separate and execute queries in sequence.",
    "explanationBn": "সেমিকোলন দিয়ে পৃথক করে একটি স্ক্রিপ্ট ফাইলেই পর্যায়ক্রমে শত শত কোয়েরি চালানো যায়।"
  },
  {
    "id": "t8_q21",
    "question": "What does the `STATUS;` or `\\s` command display in MySQL Command Line?",
    "options": [
      "Overall connection diagnostics: server version, uptime, connection ID, active database, charset, and port (3306)",
      "The weather outside",
      "The student examination results",
      "The computer battery percentage"
    ],
    "answer": "Overall connection diagnostics: server version, uptime, connection ID, active database, charset, and port (3306)",
    "explanation": "`STATUS;` provides complete administrative session diagnostics.",
    "explanationBn": "`STATUS;` কমান্ডটি সার্ভার ভার্সন, আপটাইম, বর্তমান ডেটাবেস ও পোর্ট ইত্যাদি বিস্তারিত ডায়াগনস্টিক তথ্য প্রদর্শন করে।"
  },
  {
    "id": "t8_q22",
    "question": "In the 2026-2027 CBSE examination, Question 9 asks: 'Name the command used to view the list of all databases in MySQL.' What is the exact answer?",
    "options": [
      "`SHOW DATABASES;`",
      "`SHOW DATABASE;` (singular)",
      "`VIEW DATABASES;`",
      "`LIST ALL;`"
    ],
    "answer": "`SHOW DATABASES;`",
    "explanation": "The plural keyword `DATABASES` with trailing semicolon is the exact correct syntax.",
    "explanationBn": "`SHOW DATABASES;` হলো সঠিক বানান ও কমান্ড।"
  },
  {
    "id": "t8_q23",
    "question": "What does the `Extra` column in `DESCRIBE table_name;` typically show for an auto-increment column?",
    "options": [
      "`auto_increment`",
      "`PRIMARY`",
      "`UNIQUE`",
      "`DEFAULT`"
    ],
    "answer": "`auto_increment`",
    "explanation": "The `Extra` field denotes special properties such as `auto_increment` or `on update CURRENT_TIMESTAMP`.",
    "explanationBn": "`Extra` কলামে `auto_increment` প্রদর্শিত হয়।"
  },
  {
    "id": "t8_q24",
    "question": "Which of the following describes the difference between `SHOW TABLES;` and `DESCRIBE table_name;`?",
    "options": [
      "`SHOW TABLES;` lists all table names in the DB; `DESCRIBE` lists the columns and types inside ONE specific table",
      "`SHOW TABLES;` deletes tables; `DESCRIBE` creates tables",
      "Both do the exact same thing",
      "`DESCRIBE` lists databases"
    ],
    "answer": "`SHOW TABLES;` lists all table names in the DB; `DESCRIBE` lists the columns and types inside ONE specific table",
    "explanation": "`SHOW TABLES` lists tables at database level; `DESCRIBE` inspects columns at table level.",
    "explanationBn": "`SHOW TABLES;` টেবিলের নামের তালিকা দেখায়, আর `DESCRIBE` নির্দিষ্ট একটি টেবিলের কলাম ও ডেটা টাইপ দেখায়।"
  },
  {
    "id": "t8_q25",
    "question": "Which summary rule correctly guides a student working in MySQL Command Line?",
    "options": [
      "Always end SQL commands with a semicolon (`;`), select your database using `USE dbname;`, and inspect schema with `DESCRIBE tablename;`",
      "Never use semicolons in MySQL",
      "Type all SQL commands in lowercase only",
      "Reboot computer after every SELECT query"
    ],
    "answer": "Always end SQL commands with a semicolon (`;`), select your database using `USE dbname;`, and inspect schema with `DESCRIBE tablename;`",
    "explanation": "This summarizes the standard professional workflow in MySQL client administration.",
    "explanationBn": "সবসময় সেমিকোলন দিয়ে কমান্ড শেষ করতে হবে, `USE` দিয়ে ডেটাবেস খুলতে হবে এবং `DESCRIBE` দিয়ে গঠন দেখতে হবে।"
  }
];
