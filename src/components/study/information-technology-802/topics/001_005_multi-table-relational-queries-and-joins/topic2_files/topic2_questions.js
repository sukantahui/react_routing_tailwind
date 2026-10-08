const questions = [
  {
    "id": "q1",
    "question": "Q1: What is the primary reason for normalizing data into multiple tables rather than storing everything in one massive table?",
    "options": [
      "To eliminate data redundancy, prevent anomalies, and ensure referential integrity",
      "To make SQL queries slower and more complicated",
      "To double the database storage requirements",
      "To disable foreign key constraints"
    ],
    "answer": "To eliminate data redundancy, prevent anomalies, and ensure referential integrity",
    "explanation": "Relational database normalization splits data into specialized tables (e.g. STUDENT and PARENTS) to eliminate duplicate info and prevent insert/update/delete anomalies.",
    "explanationBn": "রিলেশনাল ডেটাবেসে ডেটার পুনরাবৃত্তি (redundancy) দূর করতে এবং অ্যানোমালি প্রতিরোধে ডেটাকে একাধিক টেবিলে ভাগ করা হয়।",
    "topic": "Implicit Join Syntax using FROM Table1 T1, Table2 T2 WHERE T1.key = T2.key",
    "difficulty": "Easy",
    "hint": "To eliminate data redundancy, preve..."
  },
  {
    "id": "q2",
    "question": "Q2: If Table A has 4 rows and 3 columns, and Table B has 5 rows and 2 columns, what is the Cardinality and Degree of their Cartesian Product?",
    "options": [
      "Cardinality = 20 rows, Degree = 5 columns",
      "Cardinality = 9 rows, Degree = 6 columns",
      "Cardinality = 20 rows, Degree = 6 columns",
      "Cardinality = 5 rows, Degree = 4 columns"
    ],
    "answer": "Cardinality = 20 rows, Degree = 5 columns",
    "explanation": "Cartesian product Cardinality = Rows(A) * Rows(B) = 4 * 5 = 20. Degree = Cols(A) + Cols(B) = 3 + 2 = 5.",
    "explanationBn": "কার্টেসিয়ান গুণফলে রো সংখ্যা (কার্ডিনালিটি) গুণ হয় (৪ × ৫ = ২০) এবং কলাম সংখ্যা (ডিগ্রী) যোগ হয় (৩ + ২ = ৫)।",
    "topic": "Implicit Join Syntax using FROM Table1 T1, Table2 T2 WHERE T1.key = T2.key",
    "difficulty": "Medium",
    "hint": "Cardinality = 20 rows, Degree = 5 c..."
  },
  {
    "id": "q3",
    "question": "Q3: What condition in the WHERE clause transforms a Cartesian Product into an Equi-Join?",
    "options": [
      "An equality condition matching common key columns: Table1.Key = Table2.Key",
      "A condition checking IF NULL on both tables",
      "A GROUP BY clause on the primary key",
      "An ORDER BY clause on column 1"
    ],
    "answer": "An equality condition matching common key columns: Table1.Key = Table2.Key",
    "explanation": "Equi-join filters the Cartesian product down to only those tuple pairs where the primary key and foreign key values match.",
    "explanationBn": "WHERE ক্লজে দুটি টেবিলের সাধারণ কী কলামের সমতা (equality) শর্ত দিলে কার্টেসিয়ান প্রোডাক্ট ইকুই-জয়েনে রূপান্তরিত হয়।",
    "topic": "Implicit Join Syntax using FROM Table1 T1, Table2 T2 WHERE T1.key = T2.key",
    "difficulty": "Hard",
    "hint": "An equality condition matching comm..."
  },
  {
    "id": "q4",
    "question": "Q4: Which SQL clause is used in explicit ANSI join syntax to specify the join linking condition?",
    "options": [
      "ON clause",
      "WHERE clause",
      "HAVING clause",
      "USING BY clause"
    ],
    "answer": "ON clause",
    "explanation": "In explicit ANSI SQL-92 syntax (INNER JOIN), the ON clause specifies the join condition, keeping it cleanly separated from filtering in WHERE.",
    "explanationBn": "Explicit INNER JOIN সিনট্যাক্সে টেবিল সংযোগের শর্ত ON ক্লজে উল্লেখ করা হয়।",
    "topic": "Implicit Join Syntax using FROM Table1 T1, Table2 T2 WHERE T1.key = T2.key",
    "difficulty": "Easy",
    "hint": "ON clause..."
  },
  {
    "id": "q5",
    "question": "Q5: Why are table aliases (e.g., FROM Student S, Parents P) recommended in multi-table queries?",
    "options": [
      "They provide short prefixes to qualify columns and avoid ambiguity when both tables have columns with identical names",
      "They permanently rename the tables in MySQL storage",
      "They automatically create secondary indexes",
      "They bypass the WHERE clause"
    ],
    "answer": "They provide short prefixes to qualify columns and avoid ambiguity when both tables have columns with identical names",
    "explanation": "Table aliases make queries concise and unambiguously specify which table a column belongs to (e.g. S.RollNo vs P.ParentID).",
    "explanationBn": "টেবিল এলিয়াস কোডকে সংক্ষিপ্ত করে এবং একাধিক টেবিলে একই নামের কলাম থাকলে দ্ব্যর্থতা (ambiguity) দূর করতে ডট নোটেশনে সাহায্য করে।",
    "topic": "Implicit Join Syntax using FROM Table1 T1, Table2 T2 WHERE T1.key = T2.key",
    "difficulty": "Medium",
    "hint": "They provide short prefixes to qual..."
  },
  {
    "id": "q6",
    "question": "Q6: In the query 'SELECT S.Name, P.FatherName FROM Student S, Parents P WHERE S.ParentID = P.ParentID AND S.Class <> \\'II\\';', what does the condition S.Class <> \\'II\\' do?",
    "options": [
      "Filters out all students who are in Class II",
      "Includes only students in Class II",
      "Deletes all Class II rows from the database",
      "Throws a syntax error"
    ],
    "answer": "Filters out all students who are in Class II",
    "explanation": "<> is the standard SQL inequality operator, meaning 'NOT EQUAL TO'. It excludes Class II records.",
    "explanationBn": "<> হলো SQL-এর 'অসমান' (NOT EQUAL TO) অপারেটর, যা Class II এর শিক্ষার্থীদের ফলাফল থেকে বাদ দেয়।",
    "topic": "Implicit Join Syntax using FROM Table1 T1, Table2 T2 WHERE T1.key = T2.key",
    "difficulty": "Hard",
    "hint": "Filters out all students who are in..."
  },
  {
    "id": "q7",
    "question": "Q7: What error occurs in MySQL if you select a column present in both joined tables without prefixing it with a table name or alias?",
    "options": [
      "ERROR 1052 (23000): Column 'column_name' in field list is ambiguous",
      "ERROR 1111: Invalid use of group function",
      "ERROR 1064: You have an error in your SQL syntax",
      "No error, MySQL picks the first table randomly"
    ],
    "answer": "ERROR 1052 (23000): Column 'column_name' in field list is ambiguous",
    "explanation": "When two tables in a join have identical column names (e.g., ParentID), referencing the column without a prefix causes an 'ambiguous column' error.",
    "explanationBn": "উভয় টেবিলে একই নামের কলাম থাকলে টেবিল নাম ছাড়া রেফার করলে MySQL 'ambiguous column' ত্রুটি প্রদান করে।",
    "topic": "Implicit Join Syntax using FROM Table1 T1, Table2 T2 WHERE T1.key = T2.key",
    "difficulty": "Easy",
    "hint": "ERROR 1052 (23000): Column 'column_..."
  },
  {
    "id": "q8",
    "question": "Q8: What is the result of 'SELECT * FROM Student, Parents;' without any WHERE or ON clause?",
    "options": [
      "A full Cartesian Product (Cross Join) pairing every student with every parent",
      "An empty result set",
      "Only rows where Student.ID equals Parents.ID",
      "A syntax error"
    ],
    "answer": "A full Cartesian Product (Cross Join) pairing every student with every parent",
    "explanation": "Listing tables separated by commas without join conditions performs a Cartesian product, producing M * N rows.",
    "explanationBn": "কোনো WHERE শর্ত ছাড়া একাধিক টেবিল লিখলে সম্পূর্ণ কার্টেসিয়ান প্রোডাক্ট তৈরি হয়।",
    "topic": "Implicit Join Syntax using FROM Table1 T1, Table2 T2 WHERE T1.key = T2.key",
    "difficulty": "Medium",
    "hint": "A full Cartesian Product (Cross Joi..."
  },
  {
    "id": "q9",
    "question": "Q9: Which keyword is used to arrange the joined output in descending order of a specific column?",
    "options": [
      "ORDER BY column_name DESC",
      "SORT BY column_name DESCENDING",
      "ARRANGE BY column_name DOWN",
      "GROUP BY column_name DESC"
    ],
    "answer": "ORDER BY column_name DESC",
    "explanation": "ORDER BY followed by column name and DESC keyword sorts query outputs in descending (highest to lowest) order.",
    "explanationBn": "ORDER BY ... DESC ব্যবহার করে বড় থেকে ছোট (উর্ধ্বক্রম থেকে নিম্নক্রম) সাজানো হয়।",
    "topic": "Implicit Join Syntax using FROM Table1 T1, Table2 T2 WHERE T1.key = T2.key",
    "difficulty": "Hard",
    "hint": "ORDER BY column_name DESC..."
  },
  {
    "id": "q10",
    "question": "Q10: In an Equi-Join between 3 tables (A, B, C), how many join equality conditions are required in the WHERE clause at minimum?",
    "options": [
      "At least 2 join conditions (e.g. A.id = B.a_id AND B.id = C.b_id)",
      "At least 3 join conditions",
      "Only 1 join condition",
      "0 join conditions"
    ],
    "answer": "At least 2 join conditions (e.g. A.id = B.a_id AND B.id = C.b_id)",
    "explanation": "To join N tables without Cartesian explosion, you need at least (N - 1) join conditions. For 3 tables, you need 2 conditions.",
    "explanationBn": "N সংখ্যক টেবিল কার্টেসিয়ান প্রোডাক্ট ছাড়া যুক্ত করতে ন্যূনতম (N - 1) টি জয়েন শর্তের প্রয়োজন হয়।",
    "topic": "Implicit Join Syntax using FROM Table1 T1, Table2 T2 WHERE T1.key = T2.key",
    "difficulty": "Easy",
    "hint": "At least 2 join conditions (e.g. A...."
  },
  {
    "id": "q11",
    "question": "Q11: What is the difference between an Equi-Join and a Natural Join in standard SQL?",
    "options": [
      "Natural Join automatically matches all columns with identical names and removes duplicate columns, whereas Equi-Join uses explicit equality operators",
      "Equi-Join only works on numbers, Natural Join works on strings",
      "Natural Join requires the ON clause, Equi-Join does not",
      "There is no difference"
    ],
    "answer": "Natural Join automatically matches all columns with identical names and removes duplicate columns, whereas Equi-Join uses explicit equality operators",
    "explanation": "NATURAL JOIN automatically compares all columns with the same name across tables and retains only one copy of each common column.",
    "explanationBn": "ন্যাচারাল জয়েন স্বয়ংক্রিয়ভাবে একই নামের কলামগুলোর ওপর ভিত্তি করে সংযুক্ত করে এবং দ্বৈত কলাম একটি মাত্র প্রদর্শন করে।",
    "topic": "Implicit Join Syntax using FROM Table1 T1, Table2 T2 WHERE T1.key = T2.key",
    "difficulty": "Medium",
    "hint": "Natural Join automatically matches ..."
  },
  {
    "id": "q12",
    "question": "Q12: Given Student (RollNo, Name, ParentID, BirthYear) and Parents (ParentID, FatherName, Phone). Which query displays Student Name, Father Name, and Phone for students born before 2019?",
    "options": [
      "SELECT S.Name, P.FatherName, P.Phone FROM Student S, Parents P WHERE S.ParentID = P.ParentID AND S.BirthYear < 2019;",
      "SELECT S.Name, P.FatherName, P.Phone FROM Student S, Parents P WHERE S.BirthYear < 2019;",
      "SELECT S.Name, P.FatherName, P.Phone FROM Student S JOIN Parents P ON S.BirthYear < 2019;",
      "SELECT Name, FatherName, Phone FROM Student WHERE BirthYear < 2019;"
    ],
    "answer": "SELECT S.Name, P.FatherName, P.Phone FROM Student S, Parents P WHERE S.ParentID = P.ParentID AND S.BirthYear < 2019;",
    "explanation": "Must include both the join predicate (S.ParentID = P.ParentID) and the filter predicate (S.BirthYear < 2019).",
    "explanationBn": "জয়েন শর্ত (S.ParentID = P.ParentID) এবং ফিল্টার শর্ত (S.BirthYear < 2019) উভয়ই WHERE ক্লজে থাকতে হবে।",
    "topic": "Implicit Join Syntax using FROM Table1 T1, Table2 T2 WHERE T1.key = T2.key",
    "difficulty": "Hard",
    "hint": "SELECT S.Name, P.FatherName, P.Phon..."
  },
  {
    "id": "q13",
    "question": "Q13: Which SQL operator is used to test whether a column matches a list of specific discrete values in a multi-table query?",
    "options": [
      "IN operator (e.g. S.Class IN ('X', 'XI', 'XII'))",
      "BETWEEN operator",
      "LIKE operator",
      "EXISTS ALL operator"
    ],
    "answer": "IN operator (e.g. S.Class IN ('X', 'XI', 'XII'))",
    "explanation": "The IN operator checks if a column's value matches any value in a comma-separated list of literals.",
    "explanationBn": "IN অপারেটর কলামের মান নির্দিষ্ট তালিকার কোনো মানের সাথে মিল আছে কিনা তা যাচাই করে।",
    "topic": "Implicit Join Syntax using FROM Table1 T1, Table2 T2 WHERE T1.key = T2.key",
    "difficulty": "Easy",
    "hint": "IN operator (e.g. S.Class IN ('X', ..."
  },
  {
    "id": "q14",
    "question": "Q14: When executing a multi-table query with WHERE and ORDER BY, which clause is executed first by the database engine?",
    "options": [
      "FROM and WHERE clauses execute before ORDER BY sorting",
      "ORDER BY executes first, then WHERE",
      "SELECT executes before FROM",
      "ORDER BY and WHERE execute simultaneously"
    ],
    "answer": "FROM and WHERE clauses execute before ORDER BY sorting",
    "explanation": "SQL execution order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY.",
    "explanationBn": "SQL ইঞ্জিনে প্রথমে FROM এবং WHERE সম্পাদিত হয়, এবং একেবারে শেষে ORDER BY দ্বারা সাজানো হয়।",
    "topic": "Implicit Join Syntax using FROM Table1 T1, Table2 T2 WHERE T1.key = T2.key",
    "difficulty": "Medium",
    "hint": "FROM and WHERE clauses execute befo..."
  },
  {
    "id": "q15",
    "question": "Q15: What does the dot notation 'Student.RollNo' signify in SQL?",
    "options": [
      "It specifies the RollNo attribute belonging specifically to the Student table",
      "It calls a method named RollNo on object Student",
      "It creates a new database table",
      "It defines a primary key constraint"
    ],
    "answer": "It specifies the RollNo attribute belonging specifically to the Student table",
    "explanation": "Dot notation (TableName.ColumnName) qualifies the column reference, explicitly identifying its parent table.",
    "explanationBn": "ডট নোটেশন নির্দেশ করে যে নির্দিষ্ট কলামটি কোন টেবিলের অন্তর্ভুক্ত।",
    "topic": "Implicit Join Syntax using FROM Table1 T1, Table2 T2 WHERE T1.key = T2.key",
    "difficulty": "Hard",
    "hint": "It specifies the RollNo attribute b..."
  },
  {
    "id": "q16",
    "question": "Q16: What is an 'Orphan Record' in relational multi-table database architecture?",
    "options": [
      "A child table row whose foreign key value references a non-existent primary key in the parent table",
      "A table without any columns",
      "A query with no WHERE clause",
      "A database without a root user"
    ],
    "answer": "A child table row whose foreign key value references a non-existent primary key in the parent table",
    "explanation": "Foreign keys enforce referential integrity to prevent orphan records where a child record references a deleted or missing parent.",
    "explanationBn": "অরফান রেকর্ড হলো চাইল্ড টেবিলের এমন একটি রো যার ফরেন কী প্যারেন্ট টেবিলে অনুপস্থিত।",
    "topic": "Implicit Join Syntax using FROM Table1 T1, Table2 T2 WHERE T1.key = T2.key",
    "difficulty": "Easy",
    "hint": "A child table row whose foreign key..."
  },
  {
    "id": "q17",
    "question": "Q17: Can aggregate functions like COUNT() or AVG() be combined with multi-table joins?",
    "options": [
      "Yes, aggregate functions can compute summaries over joined tables (e.g., counting students per parent)",
      "No, aggregate functions only work on single tables",
      "No, joins disable mathematical operations",
      "Only SUM() is permitted"
    ],
    "answer": "Yes, aggregate functions can compute summaries over joined tables (e.g., counting students per parent)",
    "explanation": "Aggregates work seamlessly over joined tables, often combined with GROUP BY on parent entity attributes.",
    "explanationBn": "হ্যাঁ, মাল্টি-টেবিল জয়েনের ফলাফলের ওপর COUNT, AVG ইত্যাদি এগ্রিগেট ফাংশন প্রয়োগ করা যায়।",
    "topic": "Implicit Join Syntax using FROM Table1 T1, Table2 T2 WHERE T1.key = T2.key",
    "difficulty": "Medium",
    "hint": "Yes, aggregate functions can comput..."
  },
  {
    "id": "q18",
    "question": "Q18: What is the primary difference between INNER JOIN and LEFT OUTER JOIN in relational queries?",
    "options": [
      "INNER JOIN returns only matching rows from both tables, while LEFT JOIN returns all rows from the left table even if no match exists in the right table",
      "INNER JOIN is slower than LEFT JOIN",
      "LEFT JOIN only works on text columns",
      "INNER JOIN excludes all primary keys"
    ],
    "answer": "INNER JOIN returns only matching rows from both tables, while LEFT JOIN returns all rows from the left table even if no match exists in the right table",
    "explanation": "INNER JOIN filters for exact matches on key equality; LEFT JOIN preserves all left-table rows, filling missing right-side data with NULLs.",
    "explanationBn": "INNER JOIN শুধুমাত্র উভয় টেবিলের ম্যাচিং রো রিটার্ন করে, কিন্তু LEFT JOIN বাম টেবিলের সব রো সংরক্ষণ করে।",
    "topic": "Implicit Join Syntax using FROM Table1 T1, Table2 T2 WHERE T1.key = T2.key",
    "difficulty": "Hard",
    "hint": "INNER JOIN returns only matching ro..."
  },
  {
    "id": "q19",
    "question": "Q19: In CBSE board exam questions, what is the standard method to display the total number of students enrolled under each coach?",
    "options": [
      "SELECT CoachName, COUNT(*) FROM Coach C, Student S WHERE C.CoachID = S.CoachID GROUP BY CoachName;",
      "SELECT CoachName FROM Coach, Student;",
      "SELECT SUM(Student) FROM Coach;",
      "SELECT * FROM Coach WHERE Student > 0;"
    ],
    "answer": "SELECT CoachName, COUNT(*) FROM Coach C, Student S WHERE C.CoachID = S.CoachID GROUP BY CoachName;",
    "explanation": "Equi-join links Coach and Student on CoachID, and GROUP BY CoachName counts the enrolled students per coach.",
    "explanationBn": "কোচ এবং স্টুডেন্ট টেবিল CoachID দিয়ে জয়েন করে GROUP BY CoachName এর সাহায্যে মোট শিক্ষার্থী গণনা করা হয়।",
    "topic": "Implicit Join Syntax using FROM Table1 T1, Table2 T2 WHERE T1.key = T2.key",
    "difficulty": "Easy",
    "hint": "SELECT CoachName, COUNT(*) FROM Coa..."
  },
  {
    "id": "q20",
    "question": "Q20: What happens if a query joins two tables on a non-key column having multiple duplicates on both sides?",
    "options": [
      "Every matching row on the left pairs with every matching row on the right, potentially multiplying row counts",
      "MySQL throws an error",
      "Only the first match is returned",
      "The query deletes duplicate rows"
    ],
    "answer": "Every matching row on the left pairs with every matching row on the right, potentially multiplying row counts",
    "explanation": "Joins on non-unique columns create a many-to-many Cartesian multiplication for each group of matching values.",
    "explanationBn": "নন-ইউনিক কলামে জয়েন করলে উভয় পাশের ম্যাচিং মানগুলোর মধ্যে অনেক-থেকে-অনেক (many-to-many) গুণন ঘটে।",
    "topic": "Implicit Join Syntax using FROM Table1 T1, Table2 T2 WHERE T1.key = T2.key",
    "difficulty": "Medium",
    "hint": "Every matching row on the left pair..."
  },
  {
    "id": "q21",
    "question": "Q21: Which statement correctly represents an explicit ANSI INNER JOIN between Student and Parents?",
    "options": [
      "SELECT * FROM Student S INNER JOIN Parents P ON S.ParentID = P.ParentID;",
      "SELECT * FROM Student S JOIN Parents P WHERE S.ParentID = P.ParentID;",
      "SELECT * FROM Student S, Parents P ON S.ParentID = P.ParentID;",
      "SELECT * FROM Student INNER Parents WHERE ParentID = ParentID;"
    ],
    "answer": "SELECT * FROM Student S INNER JOIN Parents P ON S.ParentID = P.ParentID;",
    "explanation": "Explicit ANSI syntax requires 'FROM Table1 [INNER] JOIN Table2 ON JoinCondition'.",
    "explanationBn": "ANSI স্ট্যান্ডার্ড অনুযায়ী সঠিক সিনট্যাক্স হলো: FROM Table1 INNER JOIN Table2 ON Table1.Key = Table2.Key।",
    "topic": "Implicit Join Syntax using FROM Table1 T1, Table2 T2 WHERE T1.key = T2.key",
    "difficulty": "Hard",
    "hint": "SELECT * FROM Student S INNER JOIN ..."
  },
  {
    "id": "q22",
    "question": "Q22: Why is it dangerous to omit the join condition in a production database query involving tables with 100,000 rows each?",
    "options": [
      "It will produce a 10 billion row Cartesian Product (100,000 * 100,000), consuming massive memory and crashing the server",
      "It will erase the database contents",
      "It will lock the operating system permanently",
      "It will automatically convert to an outer join"
    ],
    "answer": "It will produce a 10 billion row Cartesian Product (100,000 * 100,000), consuming massive memory and crashing the server",
    "explanation": "Unfiltered cross joins result in exponential row explosion ($10^5 \\times 10^5 = 10^{10}$ rows), causing severe performance degradation.",
    "explanationBn": "শর্তহীন কার্টেসিয়ান প্রোডাক্ট ১০ বিলিয়ন রো তৈরি করে সার্ভারের মেমরি ও সিপিইউ ক্র্যাশ ঘটাতে পারে।",
    "topic": "Implicit Join Syntax using FROM Table1 T1, Table2 T2 WHERE T1.key = T2.key",
    "difficulty": "Easy",
    "hint": "It will produce a 10 billion row Ca..."
  },
  {
    "id": "q23",
    "question": "Q23: How does MySQL resolve column names in SELECT if an alias is defined in FROM (e.g. FROM Student AS S)?",
    "options": [
      "You can qualify columns using the alias (S.Name) or the original table name (Student.Name)",
      "You can only use the alias S.Name; the original table name is shadowed",
      "Aliases cannot be used in SELECT",
      "Aliases only work in WHERE"
    ],
    "answer": "You can qualify columns using the alias (S.Name) or the original table name (Student.Name)",
    "explanation": "In MySQL, once an alias is defined in FROM, using the alias prefix is standard and required in strict SQL modes.",
    "explanationBn": "টেবিল এলিয়াস ডিফাইন করলে সিলেক্ট ক্লজে এলিয়াস প্রিফিক্স দিয়ে কলাম উল্লেখ করা আদর্শ।",
    "topic": "Implicit Join Syntax using FROM Table1 T1, Table2 T2 WHERE T1.key = T2.key",
    "difficulty": "Medium",
    "hint": "You can qualify columns using the a..."
  },
  {
    "id": "q24",
    "question": "Q24: What is the result of 'SELECT S.RollNo, S.Name, P.FatherName FROM Student S, Parents P WHERE S.ParentID = P.ParentID ORDER BY S.RollNo DESC;'?",
    "options": [
      "Displays student roll numbers, names, and father names sorted from highest roll number to lowest",
      "Displays all students sorted alphabetically by name",
      "Displays only students with father names starting with 'D'",
      "Throws a runtime sorting exception"
    ],
    "answer": "Displays student roll numbers, names, and father names sorted from highest roll number to lowest",
    "explanation": "The query joins on ParentID and orders the final output in descending numerical order of RollNo.",
    "explanationBn": "কোয়েরিটি ParentID দিয়ে জয়েন করে রোল নম্বরের বড় থেকে ছোট ক্রমানুসারে সাজিয়ে ফলাফল প্রদর্শন করে।",
    "topic": "Implicit Join Syntax using FROM Table1 T1, Table2 T2 WHERE T1.key = T2.key",
    "difficulty": "Hard",
    "hint": "Displays student roll numbers, name..."
  },
  {
    "id": "q25",
    "question": "Q25: In CBSE board examination practicals, which command is used to see the foreign key constraint definitions on a table?",
    "options": [
      "SHOW CREATE TABLE table_name;",
      "DESCRIBE table_name;",
      "SHOW KEYS table_name;",
      "VIEW CONSTRAINTS table_name;"
    ],
    "answer": "SHOW CREATE TABLE table_name;",
    "explanation": "SHOW CREATE TABLE displays the full DDL definition including FOREIGN KEY ... REFERENCES clauses.",
    "explanationBn": "SHOW CREATE TABLE কমান্ডটি ফরেন কী কনস্ট্রেইন্টসহ সম্পূর্ণ টেবিল তৈরির কোড প্রদর্শন করে।",
    "topic": "Implicit Join Syntax using FROM Table1 T1, Table2 T2 WHERE T1.key = T2.key",
    "difficulty": "Easy",
    "hint": "SHOW CREATE TABLE table_name;..."
  }
];

export default questions;
