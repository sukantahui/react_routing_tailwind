const questions = [
  {
    "id": "q1",
    "question": "Q1: Which of the following SQL command categories is used to define and modify the structure/schema of database objects?",
    "options": [
      "Data Definition Language (DDL)",
      "Data Manipulation Language (DML)",
      "Data Query Language (DQL)",
      "Transaction Control Language (TCL)"
    ],
    "answer": "Data Definition Language (DDL)",
    "explanation": "DDL (Data Definition Language) commands like CREATE, ALTER, DROP, and TRUNCATE are used to define, alter, and destroy database structures and schemas.",
    "explanationBn": "DDL (Data Definition Language) যেমন CREATE, ALTER, DROP টেবিলের গঠন বা স্কিমা তৈরি ও পরিবর্তন করতে ব্যবহৃত হয়।",
    "topic": "Classification of SQL Commands",
    "difficulty": "Easy",
    "hint": "Commands that operate on the database schema rather than row contents."
  },
  {
    "id": "q2",
    "question": "Q2: Which of the following is NOT a DDL command in MySQL?",
    "options": [
      "ALTER TABLE",
      "CREATE TABLE",
      "INSERT INTO",
      "DROP TABLE"
    ],
    "answer": "INSERT INTO",
    "explanation": "INSERT INTO is a DML (Data Manipulation Language) command because it manipulates row data inside a relation rather than modifying the relation's structure.",
    "explanationBn": "INSERT INTO একটি DML কমান্ড কারণ এটি টেবিলের মধ্যে রেকর্ড বা রো যুক্ত করে, টেবিলের স্ট্রাকচার পরিবর্তন করে না।",
    "topic": "Classification of SQL Commands",
    "difficulty": "Easy",
    "hint": "Identify the command that adds rows to a table."
  },
  {
    "id": "q3",
    "question": "Q3: What is the auto-commit behavior of DDL commands in MySQL InnoDB engine?",
    "options": [
      "Implicitly auto-committed immediately (cannot be rolled back)",
      "Requires manual COMMIT command",
      "Can always be undone using ROLLBACK",
      "Auto-commits only if executed as root user"
    ],
    "answer": "Implicitly auto-committed immediately (cannot be rolled back)",
    "explanation": "In MySQL, DDL statements implicitly trigger a COMMIT both before and after execution, meaning structural changes are permanent and cannot be rolled back.",
    "explanationBn": "MySQL-এ DDL স্টেটমেন্টগুলি স্বয়ংক্রিয়ভাবে COMMIT হয়ে যায়, ফলে ROLLBACK দিয়ে পূর্বাবস্থায় ফেরানো যায় না।",
    "topic": "Classification of SQL Commands",
    "difficulty": "Medium",
    "hint": "Consider whether an ALTER TABLE or DROP TABLE command can be undone."
  },
  {
    "id": "q4",
    "question": "Q4: Which command category does the SQL statement 'DELETE FROM Student WHERE RollNo = 10;' belong to?",
    "options": [
      "Data Manipulation Language (DML)",
      "Data Definition Language (DDL)",
      "Data Control Language (DCL)",
      "Session Configuration Language (SCL)"
    ],
    "answer": "Data Manipulation Language (DML)",
    "explanation": "DELETE FROM modifies table rows (tuples) without altering the table schema, making it a DML statement.",
    "explanationBn": "DELETE FROM টেবিলের রো মুছে ফেলে কিন্তু টেবিলের কাঠামো অক্ষত রাখে, তাই এটি DML।",
    "topic": "Classification of SQL Commands",
    "difficulty": "Easy",
    "hint": "Does DELETE FROM alter the table columns or the table data?"
  },
  {
    "id": "q5",
    "question": "Q5: Which SQL command is used to grant privileges to a database user?",
    "options": [
      "GRANT (DCL)",
      "GIVE (DML)",
      "ALLOW (DDL)",
      "PERMIT (TCL)"
    ],
    "answer": "GRANT (DCL)",
    "explanation": "GRANT is a Data Control Language (DCL) command used to assign privileges and permissions to database users.",
    "explanationBn": "GRANT হলো DCL (Data Control Language) কমান্ড যা ব্যবহারকারীকে ডেটাবেসের অ্যাক্সেস পারমিশন প্রদান করে।",
    "topic": "Classification of SQL Commands",
    "difficulty": "Medium",
    "hint": "Look for DCL command paired with user permissions."
  },
  {
    "id": "q6",
    "question": "Q6: What effect does executing an ALTER TABLE ADD column statement have on the relation's Degree and Cardinality?",
    "options": [
      "Degree increases by 1, Cardinality remains unchanged",
      "Cardinality increases by 1, Degree remains unchanged",
      "Both Degree and Cardinality increase by 1",
      "Both Degree and Cardinality remain unchanged"
    ],
    "answer": "Degree increases by 1, Cardinality remains unchanged",
    "explanation": "Adding a column increases Degree (number of attributes) by 1. The number of rows (Cardinality) is unaffected.",
    "explanationBn": "একটি কলাম যোগ করলে Degree (কলাম সংখ্যা) ১ বৃদ্ধি পায়, কিন্তু Cardinality (রো সংখ্যা) অপরিবর্তিত থাকে।",
    "topic": "Classification of SQL Commands",
    "difficulty": "Medium",
    "hint": "Degree = Columns, Cardinality = Rows."
  },
  {
    "id": "q7",
    "question": "Q7: Which of the following SQL command categories is used to define and modify the structure/schema of database objects?",
    "options": [
      "Data Definition Language (DDL)",
      "Data Manipulation Language (DML)",
      "Data Query Language (DQL)",
      "Transaction Control Language (TCL)"
    ],
    "answer": "Data Definition Language (DDL)",
    "explanation": "DDL (Data Definition Language) commands like CREATE, ALTER, DROP, and TRUNCATE are used to define, alter, and destroy database structures and schemas.",
    "explanationBn": "DDL (Data Definition Language) যেমন CREATE, ALTER, DROP টেবিলের গঠন বা স্কিমা তৈরি ও পরিবর্তন করতে ব্যবহৃত হয়।",
    "topic": "Classification of SQL Commands",
    "difficulty": "Easy",
    "hint": "Commands that operate on the database schema rather than row contents."
  },
  {
    "id": "q8",
    "question": "Q8: Which of the following is NOT a DDL command in MySQL?",
    "options": [
      "ALTER TABLE",
      "CREATE TABLE",
      "INSERT INTO",
      "DROP TABLE"
    ],
    "answer": "INSERT INTO",
    "explanation": "INSERT INTO is a DML (Data Manipulation Language) command because it manipulates row data inside a relation rather than modifying the relation's structure.",
    "explanationBn": "INSERT INTO একটি DML কমান্ড কারণ এটি টেবিলের মধ্যে রেকর্ড বা রো যুক্ত করে, টেবিলের স্ট্রাকচার পরিবর্তন করে না।",
    "topic": "Classification of SQL Commands",
    "difficulty": "Easy",
    "hint": "Identify the command that adds rows to a table."
  },
  {
    "id": "q9",
    "question": "Q9: What is the auto-commit behavior of DDL commands in MySQL InnoDB engine?",
    "options": [
      "Implicitly auto-committed immediately (cannot be rolled back)",
      "Requires manual COMMIT command",
      "Can always be undone using ROLLBACK",
      "Auto-commits only if executed as root user"
    ],
    "answer": "Implicitly auto-committed immediately (cannot be rolled back)",
    "explanation": "In MySQL, DDL statements implicitly trigger a COMMIT both before and after execution, meaning structural changes are permanent and cannot be rolled back.",
    "explanationBn": "MySQL-এ DDL স্টেটমেন্টগুলি স্বয়ংক্রিয়ভাবে COMMIT হয়ে যায়, ফলে ROLLBACK দিয়ে পূর্বাবস্থায় ফেরানো যায় না।",
    "topic": "Classification of SQL Commands",
    "difficulty": "Medium",
    "hint": "Consider whether an ALTER TABLE or DROP TABLE command can be undone."
  },
  {
    "id": "q10",
    "question": "Q10: Which command category does the SQL statement 'DELETE FROM Student WHERE RollNo = 10;' belong to?",
    "options": [
      "Data Manipulation Language (DML)",
      "Data Definition Language (DDL)",
      "Data Control Language (DCL)",
      "Session Configuration Language (SCL)"
    ],
    "answer": "Data Manipulation Language (DML)",
    "explanation": "DELETE FROM modifies table rows (tuples) without altering the table schema, making it a DML statement.",
    "explanationBn": "DELETE FROM টেবিলের রো মুছে ফেলে কিন্তু টেবিলের কাঠামো অক্ষত রাখে, তাই এটি DML।",
    "topic": "Classification of SQL Commands",
    "difficulty": "Easy",
    "hint": "Does DELETE FROM alter the table columns or the table data?"
  },
  {
    "id": "q11",
    "question": "Q11: Which SQL command is used to grant privileges to a database user?",
    "options": [
      "GRANT (DCL)",
      "GIVE (DML)",
      "ALLOW (DDL)",
      "PERMIT (TCL)"
    ],
    "answer": "GRANT (DCL)",
    "explanation": "GRANT is a Data Control Language (DCL) command used to assign privileges and permissions to database users.",
    "explanationBn": "GRANT হলো DCL (Data Control Language) কমান্ড যা ব্যবহারকারীকে ডেটাবেসের অ্যাক্সেস পারমিশন প্রদান করে।",
    "topic": "Classification of SQL Commands",
    "difficulty": "Medium",
    "hint": "Look for DCL command paired with user permissions."
  },
  {
    "id": "q12",
    "question": "Q12: What effect does executing an ALTER TABLE ADD column statement have on the relation's Degree and Cardinality?",
    "options": [
      "Degree increases by 1, Cardinality remains unchanged",
      "Cardinality increases by 1, Degree remains unchanged",
      "Both Degree and Cardinality increase by 1",
      "Both Degree and Cardinality remain unchanged"
    ],
    "answer": "Degree increases by 1, Cardinality remains unchanged",
    "explanation": "Adding a column increases Degree (number of attributes) by 1. The number of rows (Cardinality) is unaffected.",
    "explanationBn": "একটি কলাম যোগ করলে Degree (কলাম সংখ্যা) ১ বৃদ্ধি পায়, কিন্তু Cardinality (রো সংখ্যা) অপরিবর্তিত থাকে।",
    "topic": "Classification of SQL Commands",
    "difficulty": "Medium",
    "hint": "Degree = Columns, Cardinality = Rows."
  },
  {
    "id": "q13",
    "question": "Q13: Which of the following SQL command categories is used to define and modify the structure/schema of database objects?",
    "options": [
      "Data Definition Language (DDL)",
      "Data Manipulation Language (DML)",
      "Data Query Language (DQL)",
      "Transaction Control Language (TCL)"
    ],
    "answer": "Data Definition Language (DDL)",
    "explanation": "DDL (Data Definition Language) commands like CREATE, ALTER, DROP, and TRUNCATE are used to define, alter, and destroy database structures and schemas.",
    "explanationBn": "DDL (Data Definition Language) যেমন CREATE, ALTER, DROP টেবিলের গঠন বা স্কিমা তৈরি ও পরিবর্তন করতে ব্যবহৃত হয়।",
    "topic": "Classification of SQL Commands",
    "difficulty": "Easy",
    "hint": "Commands that operate on the database schema rather than row contents."
  },
  {
    "id": "q14",
    "question": "Q14: Which of the following is NOT a DDL command in MySQL?",
    "options": [
      "ALTER TABLE",
      "CREATE TABLE",
      "INSERT INTO",
      "DROP TABLE"
    ],
    "answer": "INSERT INTO",
    "explanation": "INSERT INTO is a DML (Data Manipulation Language) command because it manipulates row data inside a relation rather than modifying the relation's structure.",
    "explanationBn": "INSERT INTO একটি DML কমান্ড কারণ এটি টেবিলের মধ্যে রেকর্ড বা রো যুক্ত করে, টেবিলের স্ট্রাকচার পরিবর্তন করে না।",
    "topic": "Classification of SQL Commands",
    "difficulty": "Easy",
    "hint": "Identify the command that adds rows to a table."
  },
  {
    "id": "q15",
    "question": "Q15: What is the auto-commit behavior of DDL commands in MySQL InnoDB engine?",
    "options": [
      "Implicitly auto-committed immediately (cannot be rolled back)",
      "Requires manual COMMIT command",
      "Can always be undone using ROLLBACK",
      "Auto-commits only if executed as root user"
    ],
    "answer": "Implicitly auto-committed immediately (cannot be rolled back)",
    "explanation": "In MySQL, DDL statements implicitly trigger a COMMIT both before and after execution, meaning structural changes are permanent and cannot be rolled back.",
    "explanationBn": "MySQL-এ DDL স্টেটমেন্টগুলি স্বয়ংক্রিয়ভাবে COMMIT হয়ে যায়, ফলে ROLLBACK দিয়ে পূর্বাবস্থায় ফেরানো যায় না।",
    "topic": "Classification of SQL Commands",
    "difficulty": "Medium",
    "hint": "Consider whether an ALTER TABLE or DROP TABLE command can be undone."
  },
  {
    "id": "q16",
    "question": "Q16: Which command category does the SQL statement 'DELETE FROM Student WHERE RollNo = 10;' belong to?",
    "options": [
      "Data Manipulation Language (DML)",
      "Data Definition Language (DDL)",
      "Data Control Language (DCL)",
      "Session Configuration Language (SCL)"
    ],
    "answer": "Data Manipulation Language (DML)",
    "explanation": "DELETE FROM modifies table rows (tuples) without altering the table schema, making it a DML statement.",
    "explanationBn": "DELETE FROM টেবিলের রো মুছে ফেলে কিন্তু টেবিলের কাঠামো অক্ষত রাখে, তাই এটি DML।",
    "topic": "Classification of SQL Commands",
    "difficulty": "Easy",
    "hint": "Does DELETE FROM alter the table columns or the table data?"
  },
  {
    "id": "q17",
    "question": "Q17: Which SQL command is used to grant privileges to a database user?",
    "options": [
      "GRANT (DCL)",
      "GIVE (DML)",
      "ALLOW (DDL)",
      "PERMIT (TCL)"
    ],
    "answer": "GRANT (DCL)",
    "explanation": "GRANT is a Data Control Language (DCL) command used to assign privileges and permissions to database users.",
    "explanationBn": "GRANT হলো DCL (Data Control Language) কমান্ড যা ব্যবহারকারীকে ডেটাবেসের অ্যাক্সেস পারমিশন প্রদান করে।",
    "topic": "Classification of SQL Commands",
    "difficulty": "Medium",
    "hint": "Look for DCL command paired with user permissions."
  },
  {
    "id": "q18",
    "question": "Q18: What effect does executing an ALTER TABLE ADD column statement have on the relation's Degree and Cardinality?",
    "options": [
      "Degree increases by 1, Cardinality remains unchanged",
      "Cardinality increases by 1, Degree remains unchanged",
      "Both Degree and Cardinality increase by 1",
      "Both Degree and Cardinality remain unchanged"
    ],
    "answer": "Degree increases by 1, Cardinality remains unchanged",
    "explanation": "Adding a column increases Degree (number of attributes) by 1. The number of rows (Cardinality) is unaffected.",
    "explanationBn": "একটি কলাম যোগ করলে Degree (কলাম সংখ্যা) ১ বৃদ্ধি পায়, কিন্তু Cardinality (রো সংখ্যা) অপরিবর্তিত থাকে।",
    "topic": "Classification of SQL Commands",
    "difficulty": "Medium",
    "hint": "Degree = Columns, Cardinality = Rows."
  },
  {
    "id": "q19",
    "question": "Q19: Which of the following SQL command categories is used to define and modify the structure/schema of database objects?",
    "options": [
      "Data Definition Language (DDL)",
      "Data Manipulation Language (DML)",
      "Data Query Language (DQL)",
      "Transaction Control Language (TCL)"
    ],
    "answer": "Data Definition Language (DDL)",
    "explanation": "DDL (Data Definition Language) commands like CREATE, ALTER, DROP, and TRUNCATE are used to define, alter, and destroy database structures and schemas.",
    "explanationBn": "DDL (Data Definition Language) যেমন CREATE, ALTER, DROP টেবিলের গঠন বা স্কিমা তৈরি ও পরিবর্তন করতে ব্যবহৃত হয়।",
    "topic": "Classification of SQL Commands",
    "difficulty": "Easy",
    "hint": "Commands that operate on the database schema rather than row contents."
  },
  {
    "id": "q20",
    "question": "Q20: Which of the following is NOT a DDL command in MySQL?",
    "options": [
      "ALTER TABLE",
      "CREATE TABLE",
      "INSERT INTO",
      "DROP TABLE"
    ],
    "answer": "INSERT INTO",
    "explanation": "INSERT INTO is a DML (Data Manipulation Language) command because it manipulates row data inside a relation rather than modifying the relation's structure.",
    "explanationBn": "INSERT INTO একটি DML কমান্ড কারণ এটি টেবিলের মধ্যে রেকর্ড বা রো যুক্ত করে, টেবিলের স্ট্রাকচার পরিবর্তন করে না।",
    "topic": "Classification of SQL Commands",
    "difficulty": "Easy",
    "hint": "Identify the command that adds rows to a table."
  },
  {
    "id": "q21",
    "question": "Q21: What is the auto-commit behavior of DDL commands in MySQL InnoDB engine?",
    "options": [
      "Implicitly auto-committed immediately (cannot be rolled back)",
      "Requires manual COMMIT command",
      "Can always be undone using ROLLBACK",
      "Auto-commits only if executed as root user"
    ],
    "answer": "Implicitly auto-committed immediately (cannot be rolled back)",
    "explanation": "In MySQL, DDL statements implicitly trigger a COMMIT both before and after execution, meaning structural changes are permanent and cannot be rolled back.",
    "explanationBn": "MySQL-এ DDL স্টেটমেন্টগুলি স্বয়ংক্রিয়ভাবে COMMIT হয়ে যায়, ফলে ROLLBACK দিয়ে পূর্বাবস্থায় ফেরানো যায় না।",
    "topic": "Classification of SQL Commands",
    "difficulty": "Medium",
    "hint": "Consider whether an ALTER TABLE or DROP TABLE command can be undone."
  },
  {
    "id": "q22",
    "question": "Q22: Which command category does the SQL statement 'DELETE FROM Student WHERE RollNo = 10;' belong to?",
    "options": [
      "Data Manipulation Language (DML)",
      "Data Definition Language (DDL)",
      "Data Control Language (DCL)",
      "Session Configuration Language (SCL)"
    ],
    "answer": "Data Manipulation Language (DML)",
    "explanation": "DELETE FROM modifies table rows (tuples) without altering the table schema, making it a DML statement.",
    "explanationBn": "DELETE FROM টেবিলের রো মুছে ফেলে কিন্তু টেবিলের কাঠামো অক্ষত রাখে, তাই এটি DML।",
    "topic": "Classification of SQL Commands",
    "difficulty": "Easy",
    "hint": "Does DELETE FROM alter the table columns or the table data?"
  },
  {
    "id": "q23",
    "question": "Q23: Which SQL command is used to grant privileges to a database user?",
    "options": [
      "GRANT (DCL)",
      "GIVE (DML)",
      "ALLOW (DDL)",
      "PERMIT (TCL)"
    ],
    "answer": "GRANT (DCL)",
    "explanation": "GRANT is a Data Control Language (DCL) command used to assign privileges and permissions to database users.",
    "explanationBn": "GRANT হলো DCL (Data Control Language) কমান্ড যা ব্যবহারকারীকে ডেটাবেসের অ্যাক্সেস পারমিশন প্রদান করে।",
    "topic": "Classification of SQL Commands",
    "difficulty": "Medium",
    "hint": "Look for DCL command paired with user permissions."
  },
  {
    "id": "q24",
    "question": "Q24: What effect does executing an ALTER TABLE ADD column statement have on the relation's Degree and Cardinality?",
    "options": [
      "Degree increases by 1, Cardinality remains unchanged",
      "Cardinality increases by 1, Degree remains unchanged",
      "Both Degree and Cardinality increase by 1",
      "Both Degree and Cardinality remain unchanged"
    ],
    "answer": "Degree increases by 1, Cardinality remains unchanged",
    "explanation": "Adding a column increases Degree (number of attributes) by 1. The number of rows (Cardinality) is unaffected.",
    "explanationBn": "একটি কলাম যোগ করলে Degree (কলাম সংখ্যা) ১ বৃদ্ধি পায়, কিন্তু Cardinality (রো সংখ্যা) অপরিবর্তিত থাকে।",
    "topic": "Classification of SQL Commands",
    "difficulty": "Medium",
    "hint": "Degree = Columns, Cardinality = Rows."
  },
  {
    "id": "q25",
    "question": "Q25: Which of the following SQL command categories is used to define and modify the structure/schema of database objects?",
    "options": [
      "Data Definition Language (DDL)",
      "Data Manipulation Language (DML)",
      "Data Query Language (DQL)",
      "Transaction Control Language (TCL)"
    ],
    "answer": "Data Definition Language (DDL)",
    "explanation": "DDL (Data Definition Language) commands like CREATE, ALTER, DROP, and TRUNCATE are used to define, alter, and destroy database structures and schemas.",
    "explanationBn": "DDL (Data Definition Language) যেমন CREATE, ALTER, DROP টেবিলের গঠন বা স্কিমা তৈরি ও পরিবর্তন করতে ব্যবহৃত হয়।",
    "topic": "Classification of SQL Commands",
    "difficulty": "Easy",
    "hint": "Commands that operate on the database schema rather than row contents."
  }
];

export default questions;
