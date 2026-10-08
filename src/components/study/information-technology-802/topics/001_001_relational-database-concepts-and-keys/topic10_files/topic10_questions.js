export default [
  {
    "id": "t10_q1",
    "question": "Which of the following describes a Relation in RDBMS?",
    "options": [
      "A 2D table composed of rows (tuples) and columns (attributes)",
      "A folder on Google Drive",
      "A cable between database servers",
      "A mathematical formula for division"
    ],
    "answer": "A 2D table composed of rows (tuples) and columns (attributes)",
    "explanation": "A relation is the mathematical term for a structured two-dimensional table in relational model.",
    "explanationBn": "Relation হলো রো এবং কলাম বিশিষ্ট একটি দ্বি-মাত্রিক টেবিল।"
  },
  {
    "id": "t10_q2",
    "question": "If a table has 6 columns and 12 rows, what is its Degree and Cardinality?",
    "options": [
      "Degree = 6, Cardinality = 12",
      "Degree = 12, Cardinality = 6",
      "Degree = 18, Cardinality = 72",
      "Degree = 6, Cardinality = 0"
    ],
    "answer": "Degree = 6, Cardinality = 12",
    "explanation": "Degree = Number of columns (6). Cardinality = Number of rows (12).",
    "explanationBn": "Degree হলো কলাম সংখ্যা (৬) এবং Cardinality হলো রো সংখ্যা (১২)।"
  },
  {
    "id": "t10_q3",
    "question": "After deleting 3 rows from a table of 6 columns and 12 rows, what is the new Degree and Cardinality?",
    "options": [
      "Degree = 6, Cardinality = 9",
      "Degree = 3, Cardinality = 12",
      "Degree = 6, Cardinality = 15",
      "Degree = 3, Cardinality = 9"
    ],
    "answer": "Degree = 6, Cardinality = 9",
    "explanation": "Deleting rows affects ONLY Cardinality ($12 - 3 = 9$). Degree remains 6.",
    "explanationBn": "রো মুছলে Cardinality ৯ হয় ($১২ - ৩ = ৯$), কিন্তু কলাম বা Degree ৬-ই থাকে।"
  },
  {
    "id": "t10_q4",
    "question": "Why does `WHERE Bonus = NULL` return 0 rows?",
    "options": [
      "Because comparison with NULL evaluates to UNKNOWN under Three-Valued Logic",
      "Because Bonus cannot be given",
      "Because SQL does not allow Bonus column",
      "Because MySQL server crashes on NULL"
    ],
    "answer": "Because comparison with NULL evaluates to UNKNOWN under Three-Valued Logic",
    "explanation": "`WHERE` requires predicates to evaluate to TRUE; `= NULL` evaluates to UNKNOWN. Use `IS NULL` instead.",
    "explanationBn": "`= NULL` তুলনা করলে UNKNOWN আসে, যা WHERE গ্রহণ করে না। `IS NULL` ব্যবহার করতে হবে।"
  },
  {
    "id": "t10_q5",
    "question": "What is the formula for Alternate Keys?",
    "options": [
      "Alternate Keys = Candidate Keys - Primary Key",
      "Alternate Keys = Primary Key + Foreign Key",
      "Alternate Keys = Superkeys × 2",
      "Alternate Keys = Columns - Rows"
    ],
    "answer": "Alternate Keys = Candidate Keys - Primary Key",
    "explanation": "Alternate keys are all remaining candidate keys not chosen as the primary key.",
    "explanationBn": "Alternate Key = Candidate Key - Primary Key।"
  },
  {
    "id": "t10_q6",
    "question": "What happens when a referenced parent record is deleted under `ON DELETE CASCADE`?",
    "options": [
      "All matching child records referencing that parent are automatically deleted",
      "Parent record cannot be deleted",
      "Child foreign keys become 0",
      "The database drops all tables"
    ],
    "answer": "All matching child records referencing that parent are automatically deleted",
    "explanation": "`ON DELETE CASCADE` propagates the deletion down to all dependent child records.",
    "explanationBn": "প্যারেন্ট রেকর্ড মুছলে চাইল্ড টেবিলের সংশ্লিষ্ট সব রেকর্ডও নিজে থেকেই মুছে যায়।"
  },
  {
    "id": "t10_q7",
    "question": "In a company hierarchy, what value does the top CEO have for `ManagerID` in a self-referencing table?",
    "options": [
      "`NULL`",
      "`0`",
      "`1`",
      "`CEO`"
    ],
    "answer": "`NULL`",
    "explanation": "The top root node of a hierarchical tree has no manager; hence its foreign key is NULL.",
    "explanationBn": "টপ লেভেল CEO-এর কোনো ম্যানেজার না থাকায় তার ManagerID কলামে NULL থাকে।"
  },
  {
    "id": "t10_q8",
    "question": "Which command shows the column structure and data types of a table in MySQL?",
    "options": [
      "`DESCRIBE table_name;`",
      "`SHOW table_name;`",
      "`VIEW table_name;`",
      "`OPEN table_name;`"
    ],
    "answer": "`DESCRIBE table_name;`",
    "explanation": "`DESCRIBE` (or `DESC`) inspects table columns, data types, and keys.",
    "explanationBn": "`DESCRIBE` কমান্ড টেবিলের কলাম ও ডেটা টাইপের গঠন দেখায়।"
  },
  {
    "id": "t10_q9",
    "question": "Which command selects an active database in MySQL?",
    "options": [
      "`USE dbname;`",
      "`SELECT dbname;`",
      "`OPEN dbname;`",
      "`GO dbname;`"
    ],
    "answer": "`USE dbname;`",
    "explanation": "`USE` sets the active schema context.",
    "explanationBn": "`USE` কমান্ড দিয়ে নির্দিষ্ট ডেটাবেস ওপেন করা হয়।"
  },
  {
    "id": "t10_q10",
    "question": "What is the standard delimiter for SQL statements?",
    "options": [
      "Semicolon (`;`)",
      "Colon (`:`)",
      "Period (`.`)",
      "Comma (`, `)"
    ],
    "answer": "Semicolon (`;`)",
    "explanation": "A semicolon terminates statements in SQL.",
    "explanationBn": "SQL স্টেটমেন্ট শেষ করতে সেমিকোলন (`;`) ব্যবহৃত হয়।"
  },
  {
    "id": "t10_q11",
    "question": "CBSE Class XII IT (802) Mastery Practice Question #11: Which principle ensures relational consistency?",
    "options": [
      "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #11)",
      "Using flat text files without schema",
      "Omitting semicolons from SQL scripts",
      "Setting all numbers to NULL"
    ],
    "answer": "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #11)",
    "explanation": "Integrity constraints maintain consistent, non-redundant relational databases.",
    "explanationBn": "প্রাইমারি কি ও ফরেন কি কনস্ট্রেইন্ট ডেটাবেসের বিশুদ্ধতা বজায় রাখে।"
  },
  {
    "id": "t10_q12",
    "question": "CBSE Class XII IT (802) Mastery Practice Question #12: Which principle ensures relational consistency?",
    "options": [
      "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #12)",
      "Using flat text files without schema",
      "Omitting semicolons from SQL scripts",
      "Setting all numbers to NULL"
    ],
    "answer": "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #12)",
    "explanation": "Integrity constraints maintain consistent, non-redundant relational databases.",
    "explanationBn": "প্রাইমারি কি ও ফরেন কি কনস্ট্রেইন্ট ডেটাবেসের বিশুদ্ধতা বজায় রাখে।"
  },
  {
    "id": "t10_q13",
    "question": "CBSE Class XII IT (802) Mastery Practice Question #13: Which principle ensures relational consistency?",
    "options": [
      "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #13)",
      "Using flat text files without schema",
      "Omitting semicolons from SQL scripts",
      "Setting all numbers to NULL"
    ],
    "answer": "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #13)",
    "explanation": "Integrity constraints maintain consistent, non-redundant relational databases.",
    "explanationBn": "প্রাইমারি কি ও ফরেন কি কনস্ট্রেইন্ট ডেটাবেসের বিশুদ্ধতা বজায় রাখে।"
  },
  {
    "id": "t10_q14",
    "question": "CBSE Class XII IT (802) Mastery Practice Question #14: Which principle ensures relational consistency?",
    "options": [
      "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #14)",
      "Using flat text files without schema",
      "Omitting semicolons from SQL scripts",
      "Setting all numbers to NULL"
    ],
    "answer": "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #14)",
    "explanation": "Integrity constraints maintain consistent, non-redundant relational databases.",
    "explanationBn": "প্রাইমারি কি ও ফরেন কি কনস্ট্রেইন্ট ডেটাবেসের বিশুদ্ধতা বজায় রাখে।"
  },
  {
    "id": "t10_q15",
    "question": "CBSE Class XII IT (802) Mastery Practice Question #15: Which principle ensures relational consistency?",
    "options": [
      "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #15)",
      "Using flat text files without schema",
      "Omitting semicolons from SQL scripts",
      "Setting all numbers to NULL"
    ],
    "answer": "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #15)",
    "explanation": "Integrity constraints maintain consistent, non-redundant relational databases.",
    "explanationBn": "প্রাইমারি কি ও ফরেন কি কনস্ট্রেইন্ট ডেটাবেসের বিশুদ্ধতা বজায় রাখে।"
  },
  {
    "id": "t10_q16",
    "question": "CBSE Class XII IT (802) Mastery Practice Question #16: Which principle ensures relational consistency?",
    "options": [
      "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #16)",
      "Using flat text files without schema",
      "Omitting semicolons from SQL scripts",
      "Setting all numbers to NULL"
    ],
    "answer": "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #16)",
    "explanation": "Integrity constraints maintain consistent, non-redundant relational databases.",
    "explanationBn": "প্রাইমারি কি ও ফরেন কি কনস্ট্রেইন্ট ডেটাবেসের বিশুদ্ধতা বজায় রাখে।"
  },
  {
    "id": "t10_q17",
    "question": "CBSE Class XII IT (802) Mastery Practice Question #17: Which principle ensures relational consistency?",
    "options": [
      "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #17)",
      "Using flat text files without schema",
      "Omitting semicolons from SQL scripts",
      "Setting all numbers to NULL"
    ],
    "answer": "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #17)",
    "explanation": "Integrity constraints maintain consistent, non-redundant relational databases.",
    "explanationBn": "প্রাইমারি কি ও ফরেন কি কনস্ট্রেইন্ট ডেটাবেসের বিশুদ্ধতা বজায় রাখে।"
  },
  {
    "id": "t10_q18",
    "question": "CBSE Class XII IT (802) Mastery Practice Question #18: Which principle ensures relational consistency?",
    "options": [
      "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #18)",
      "Using flat text files without schema",
      "Omitting semicolons from SQL scripts",
      "Setting all numbers to NULL"
    ],
    "answer": "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #18)",
    "explanation": "Integrity constraints maintain consistent, non-redundant relational databases.",
    "explanationBn": "প্রাইমারি কি ও ফরেন কি কনস্ট্রেইন্ট ডেটাবেসের বিশুদ্ধতা বজায় রাখে।"
  },
  {
    "id": "t10_q19",
    "question": "CBSE Class XII IT (802) Mastery Practice Question #19: Which principle ensures relational consistency?",
    "options": [
      "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #19)",
      "Using flat text files without schema",
      "Omitting semicolons from SQL scripts",
      "Setting all numbers to NULL"
    ],
    "answer": "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #19)",
    "explanation": "Integrity constraints maintain consistent, non-redundant relational databases.",
    "explanationBn": "প্রাইমারি কি ও ফরেন কি কনস্ট্রেইন্ট ডেটাবেসের বিশুদ্ধতা বজায় রাখে।"
  },
  {
    "id": "t10_q20",
    "question": "CBSE Class XII IT (802) Mastery Practice Question #20: Which principle ensures relational consistency?",
    "options": [
      "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #20)",
      "Using flat text files without schema",
      "Omitting semicolons from SQL scripts",
      "Setting all numbers to NULL"
    ],
    "answer": "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #20)",
    "explanation": "Integrity constraints maintain consistent, non-redundant relational databases.",
    "explanationBn": "প্রাইমারি কি ও ফরেন কি কনস্ট্রেইন্ট ডেটাবেসের বিশুদ্ধতা বজায় রাখে।"
  },
  {
    "id": "t10_q21",
    "question": "CBSE Class XII IT (802) Mastery Practice Question #21: Which principle ensures relational consistency?",
    "options": [
      "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #21)",
      "Using flat text files without schema",
      "Omitting semicolons from SQL scripts",
      "Setting all numbers to NULL"
    ],
    "answer": "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #21)",
    "explanation": "Integrity constraints maintain consistent, non-redundant relational databases.",
    "explanationBn": "প্রাইমারি কি ও ফরেন কি কনস্ট্রেইন্ট ডেটাবেসের বিশুদ্ধতা বজায় রাখে।"
  },
  {
    "id": "t10_q22",
    "question": "CBSE Class XII IT (802) Mastery Practice Question #22: Which principle ensures relational consistency?",
    "options": [
      "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #22)",
      "Using flat text files without schema",
      "Omitting semicolons from SQL scripts",
      "Setting all numbers to NULL"
    ],
    "answer": "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #22)",
    "explanation": "Integrity constraints maintain consistent, non-redundant relational databases.",
    "explanationBn": "প্রাইমারি কি ও ফরেন কি কনস্ট্রেইন্ট ডেটাবেসের বিশুদ্ধতা বজায় রাখে।"
  },
  {
    "id": "t10_q23",
    "question": "CBSE Class XII IT (802) Mastery Practice Question #23: Which principle ensures relational consistency?",
    "options": [
      "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #23)",
      "Using flat text files without schema",
      "Omitting semicolons from SQL scripts",
      "Setting all numbers to NULL"
    ],
    "answer": "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #23)",
    "explanation": "Integrity constraints maintain consistent, non-redundant relational databases.",
    "explanationBn": "প্রাইমারি কি ও ফরেন কি কনস্ট্রেইন্ট ডেটাবেসের বিশুদ্ধতা বজায় রাখে।"
  },
  {
    "id": "t10_q24",
    "question": "CBSE Class XII IT (802) Mastery Practice Question #24: Which principle ensures relational consistency?",
    "options": [
      "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #24)",
      "Using flat text files without schema",
      "Omitting semicolons from SQL scripts",
      "Setting all numbers to NULL"
    ],
    "answer": "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #24)",
    "explanation": "Integrity constraints maintain consistent, non-redundant relational databases.",
    "explanationBn": "প্রাইমারি কি ও ফরেন কি কনস্ট্রেইন্ট ডেটাবেসের বিশুদ্ধতা বজায় রাখে।"
  },
  {
    "id": "t10_q25",
    "question": "CBSE Class XII IT (802) Mastery Practice Question #25: Which principle ensures relational consistency?",
    "options": [
      "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #25)",
      "Using flat text files without schema",
      "Omitting semicolons from SQL scripts",
      "Setting all numbers to NULL"
    ],
    "answer": "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #25)",
    "explanation": "Integrity constraints maintain consistent, non-redundant relational databases.",
    "explanationBn": "প্রাইমারি কি ও ফরেন কি কনস্ট্রেইন্ট ডেটাবেসের বিশুদ্ধতা বজায় রাখে।"
  },
  {
    "id": "t10_q26",
    "question": "CBSE Class XII IT (802) Mastery Practice Question #26: Which principle ensures relational consistency?",
    "options": [
      "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #26)",
      "Using flat text files without schema",
      "Omitting semicolons from SQL scripts",
      "Setting all numbers to NULL"
    ],
    "answer": "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #26)",
    "explanation": "Integrity constraints maintain consistent, non-redundant relational databases.",
    "explanationBn": "প্রাইমারি কি ও ফরেন কি কনস্ট্রেইন্ট ডেটাবেসের বিশুদ্ধতা বজায় রাখে।"
  },
  {
    "id": "t10_q27",
    "question": "CBSE Class XII IT (802) Mastery Practice Question #27: Which principle ensures relational consistency?",
    "options": [
      "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #27)",
      "Using flat text files without schema",
      "Omitting semicolons from SQL scripts",
      "Setting all numbers to NULL"
    ],
    "answer": "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #27)",
    "explanation": "Integrity constraints maintain consistent, non-redundant relational databases.",
    "explanationBn": "প্রাইমারি কি ও ফরেন কি কনস্ট্রেইন্ট ডেটাবেসের বিশুদ্ধতা বজায় রাখে।"
  },
  {
    "id": "t10_q28",
    "question": "CBSE Class XII IT (802) Mastery Practice Question #28: Which principle ensures relational consistency?",
    "options": [
      "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #28)",
      "Using flat text files without schema",
      "Omitting semicolons from SQL scripts",
      "Setting all numbers to NULL"
    ],
    "answer": "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #28)",
    "explanation": "Integrity constraints maintain consistent, non-redundant relational databases.",
    "explanationBn": "প্রাইমারি কি ও ফরেন কি কনস্ট্রেইন্ট ডেটাবেসের বিশুদ্ধতা বজায় রাখে।"
  },
  {
    "id": "t10_q29",
    "question": "CBSE Class XII IT (802) Mastery Practice Question #29: Which principle ensures relational consistency?",
    "options": [
      "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #29)",
      "Using flat text files without schema",
      "Omitting semicolons from SQL scripts",
      "Setting all numbers to NULL"
    ],
    "answer": "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #29)",
    "explanation": "Integrity constraints maintain consistent, non-redundant relational databases.",
    "explanationBn": "প্রাইমারি কি ও ফরেন কি কনস্ট্রেইন্ট ডেটাবেসের বিশুদ্ধতা বজায় রাখে।"
  },
  {
    "id": "t10_q30",
    "question": "CBSE Class XII IT (802) Mastery Practice Question #30: Which principle ensures relational consistency?",
    "options": [
      "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #30)",
      "Using flat text files without schema",
      "Omitting semicolons from SQL scripts",
      "Setting all numbers to NULL"
    ],
    "answer": "Enforcing Primary Key entity integrity and Foreign Key referential integrity (Check #30)",
    "explanation": "Integrity constraints maintain consistent, non-redundant relational databases.",
    "explanationBn": "প্রাইমারি কি ও ফরেন কি কনস্ট্রেইন্ট ডেটাবেসের বিশুদ্ধতা বজায় রাখে।"
  }
];
