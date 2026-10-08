export default [
  {
    "id": "t7_q1",
    "question": "What is a 'Self-Referencing Foreign Key' (Recursive Relationship) in SQL?",
    "options": [
      "A foreign key column in a table that references the Primary Key column of that EXACT SAME table",
      "A foreign key that points to a table on another computer",
      "A key that refers to deleted files",
      "A primary key that references a foreign key"
    ],
    "answer": "A foreign key column in a table that references the Primary Key column of that EXACT SAME table",
    "explanation": "A self-referencing foreign key models hierarchies within a single table.",
    "explanationBn": "Self-Referencing Foreign Key একই টেবিলের Primary Key-কে রেফারেন্স করে।"
  },
  {
    "id": "t7_q2",
    "question": "In an `EMPLOYEE(EmpID, EmpName, JobTitle, ManagerID)` table, what does `ManagerID` represent?",
    "options": [
      "A self-referencing foreign key that stores the `EmpID` of the manager to whom the employee reports",
      "The manager's personal bank account number",
      "The manager's car registration number",
      "A primary key column"
    ],
    "answer": "A self-referencing foreign key that stores the `EmpID` of the manager to whom the employee reports",
    "explanation": "Because managers are also employees, `ManagerID` references `EmpID` in the same table.",
    "explanationBn": "`ManagerID` একই টেবিলের `EmpID`-কে নির্দেশ করে।"
  },
  {
    "id": "t7_q3",
    "question": "In a company hierarchy table, what value does the top-level Director / CEO have in the `ManagerID` column?",
    "options": [
      "`NULL` (since the CEO has no higher reporting manager)",
      "`0`",
      "`999999`",
      "`CEO`"
    ],
    "answer": "`NULL` (since the CEO has no higher reporting manager)",
    "explanation": "The root node of a hierarchical tree has no parent; hence its foreign key is NULL.",
    "explanationBn": "শীর্ষ নির্বাহীর কোনো ম্যানেজার না থাকায় `ManagerID` কলামে NULL থাকে।"
  },
  {
    "id": "t7_q4",
    "question": "Which type of SQL Join is used to query an employee's name alongside their reporting manager's name from a self-referencing table?",
    "options": [
      "Self-Join using Table Aliases (e.g. `FROM Employee E LEFT JOIN Employee M ON E.ManagerID = M.EmpID`)",
      "Natural Join",
      "Cartesian Join",
      "Cross Database Join"
    ],
    "answer": "Self-Join using Table Aliases (e.g. `FROM Employee E LEFT JOIN Employee M ON E.ManagerID = M.EmpID`)",
    "explanation": "A Self-Join pairs a table with an alias of itself to resolve recursive links.",
    "explanationBn": "টেবিলটিকে দুটি আলাদা অ্যালিয়াস দিয়ে Self-Join করে ম্যানেজার ও কর্মচারীর নাম বের করা হয়।"
  },
  {
    "id": "t7_q5",
    "question": "Why is a `LEFT JOIN` used rather than an `INNER JOIN` when self-joining an employee table on `ManagerID = EmpID`?",
    "options": [
      "To ensure the top Director/CEO (whose `ManagerID` is NULL) is included in the result set",
      "Because INNER JOIN is not supported in MySQL",
      "Because LEFT JOIN is faster",
      "Because INNER JOIN deletes rows"
    ],
    "answer": "To ensure the top Director/CEO (whose `ManagerID` is NULL) is included in the result set",
    "explanation": "INNER JOIN would exclude the top CEO because NULL = EmpID evaluates to UNKNOWN.",
    "explanationBn": "LEFT JOIN ব্যবহার করলে শীর্ষ ডিরেক্টর (যার ManagerID হলো NULL) বাদ পড়বে না।"
  },
  {
    "id": "t7_q6",
    "question": "Self-Referencing Key Review Question #6: How does recursive table integrity behave under rule #6?",
    "options": [
      "It enforces that all non-null foreign key values must match an existing primary key within that same table (#6)",
      "It allows random invalid pointers",
      "It drops the table schema",
      "It converts all text to uppercase"
    ],
    "answer": "It enforces that all non-null foreign key values must match an existing primary key within that same table (#6)",
    "explanation": "Self-referencing foreign keys enforce the exact same referential integrity rules within a single table.",
    "explanationBn": "একই টেবিলের ভেতরেও Foreign Key-এর যাবতীয় ইনটিগ্রিটি রুলস সঠিকভাবে কাজ করে।"
  },
  {
    "id": "t7_q7",
    "question": "Self-Referencing Key Review Question #7: How does recursive table integrity behave under rule #7?",
    "options": [
      "It enforces that all non-null foreign key values must match an existing primary key within that same table (#7)",
      "It allows random invalid pointers",
      "It drops the table schema",
      "It converts all text to uppercase"
    ],
    "answer": "It enforces that all non-null foreign key values must match an existing primary key within that same table (#7)",
    "explanation": "Self-referencing foreign keys enforce the exact same referential integrity rules within a single table.",
    "explanationBn": "একই টেবিলের ভেতরেও Foreign Key-এর যাবতীয় ইনটিগ্রিটি রুলস সঠিকভাবে কাজ করে।"
  },
  {
    "id": "t7_q8",
    "question": "Self-Referencing Key Review Question #8: How does recursive table integrity behave under rule #8?",
    "options": [
      "It enforces that all non-null foreign key values must match an existing primary key within that same table (#8)",
      "It allows random invalid pointers",
      "It drops the table schema",
      "It converts all text to uppercase"
    ],
    "answer": "It enforces that all non-null foreign key values must match an existing primary key within that same table (#8)",
    "explanation": "Self-referencing foreign keys enforce the exact same referential integrity rules within a single table.",
    "explanationBn": "একই টেবিলের ভেতরেও Foreign Key-এর যাবতীয় ইনটিগ্রিটি রুলস সঠিকভাবে কাজ করে।"
  },
  {
    "id": "t7_q9",
    "question": "Self-Referencing Key Review Question #9: How does recursive table integrity behave under rule #9?",
    "options": [
      "It enforces that all non-null foreign key values must match an existing primary key within that same table (#9)",
      "It allows random invalid pointers",
      "It drops the table schema",
      "It converts all text to uppercase"
    ],
    "answer": "It enforces that all non-null foreign key values must match an existing primary key within that same table (#9)",
    "explanation": "Self-referencing foreign keys enforce the exact same referential integrity rules within a single table.",
    "explanationBn": "একই টেবিলের ভেতরেও Foreign Key-এর যাবতীয় ইনটিগ্রিটি রুলস সঠিকভাবে কাজ করে।"
  },
  {
    "id": "t7_q10",
    "question": "Self-Referencing Key Review Question #10: How does recursive table integrity behave under rule #10?",
    "options": [
      "It enforces that all non-null foreign key values must match an existing primary key within that same table (#10)",
      "It allows random invalid pointers",
      "It drops the table schema",
      "It converts all text to uppercase"
    ],
    "answer": "It enforces that all non-null foreign key values must match an existing primary key within that same table (#10)",
    "explanation": "Self-referencing foreign keys enforce the exact same referential integrity rules within a single table.",
    "explanationBn": "একই টেবিলের ভেতরেও Foreign Key-এর যাবতীয় ইনটিগ্রিটি রুলস সঠিকভাবে কাজ করে।"
  },
  {
    "id": "t7_q11",
    "question": "Self-Referencing Key Review Question #11: How does recursive table integrity behave under rule #11?",
    "options": [
      "It enforces that all non-null foreign key values must match an existing primary key within that same table (#11)",
      "It allows random invalid pointers",
      "It drops the table schema",
      "It converts all text to uppercase"
    ],
    "answer": "It enforces that all non-null foreign key values must match an existing primary key within that same table (#11)",
    "explanation": "Self-referencing foreign keys enforce the exact same referential integrity rules within a single table.",
    "explanationBn": "একই টেবিলের ভেতরেও Foreign Key-এর যাবতীয় ইনটিগ্রিটি রুলস সঠিকভাবে কাজ করে।"
  },
  {
    "id": "t7_q12",
    "question": "Self-Referencing Key Review Question #12: How does recursive table integrity behave under rule #12?",
    "options": [
      "It enforces that all non-null foreign key values must match an existing primary key within that same table (#12)",
      "It allows random invalid pointers",
      "It drops the table schema",
      "It converts all text to uppercase"
    ],
    "answer": "It enforces that all non-null foreign key values must match an existing primary key within that same table (#12)",
    "explanation": "Self-referencing foreign keys enforce the exact same referential integrity rules within a single table.",
    "explanationBn": "একই টেবিলের ভেতরেও Foreign Key-এর যাবতীয় ইনটিগ্রিটি রুলস সঠিকভাবে কাজ করে।"
  },
  {
    "id": "t7_q13",
    "question": "Self-Referencing Key Review Question #13: How does recursive table integrity behave under rule #13?",
    "options": [
      "It enforces that all non-null foreign key values must match an existing primary key within that same table (#13)",
      "It allows random invalid pointers",
      "It drops the table schema",
      "It converts all text to uppercase"
    ],
    "answer": "It enforces that all non-null foreign key values must match an existing primary key within that same table (#13)",
    "explanation": "Self-referencing foreign keys enforce the exact same referential integrity rules within a single table.",
    "explanationBn": "একই টেবিলের ভেতরেও Foreign Key-এর যাবতীয় ইনটিগ্রিটি রুলস সঠিকভাবে কাজ করে।"
  },
  {
    "id": "t7_q14",
    "question": "Self-Referencing Key Review Question #14: How does recursive table integrity behave under rule #14?",
    "options": [
      "It enforces that all non-null foreign key values must match an existing primary key within that same table (#14)",
      "It allows random invalid pointers",
      "It drops the table schema",
      "It converts all text to uppercase"
    ],
    "answer": "It enforces that all non-null foreign key values must match an existing primary key within that same table (#14)",
    "explanation": "Self-referencing foreign keys enforce the exact same referential integrity rules within a single table.",
    "explanationBn": "একই টেবিলের ভেতরেও Foreign Key-এর যাবতীয় ইনটিগ্রিটি রুলস সঠিকভাবে কাজ করে।"
  },
  {
    "id": "t7_q15",
    "question": "Self-Referencing Key Review Question #15: How does recursive table integrity behave under rule #15?",
    "options": [
      "It enforces that all non-null foreign key values must match an existing primary key within that same table (#15)",
      "It allows random invalid pointers",
      "It drops the table schema",
      "It converts all text to uppercase"
    ],
    "answer": "It enforces that all non-null foreign key values must match an existing primary key within that same table (#15)",
    "explanation": "Self-referencing foreign keys enforce the exact same referential integrity rules within a single table.",
    "explanationBn": "একই টেবিলের ভেতরেও Foreign Key-এর যাবতীয় ইনটিগ্রিটি রুলস সঠিকভাবে কাজ করে।"
  },
  {
    "id": "t7_q16",
    "question": "Self-Referencing Key Review Question #16: How does recursive table integrity behave under rule #16?",
    "options": [
      "It enforces that all non-null foreign key values must match an existing primary key within that same table (#16)",
      "It allows random invalid pointers",
      "It drops the table schema",
      "It converts all text to uppercase"
    ],
    "answer": "It enforces that all non-null foreign key values must match an existing primary key within that same table (#16)",
    "explanation": "Self-referencing foreign keys enforce the exact same referential integrity rules within a single table.",
    "explanationBn": "একই টেবিলের ভেতরেও Foreign Key-এর যাবতীয় ইনটিগ্রিটি রুলস সঠিকভাবে কাজ করে।"
  },
  {
    "id": "t7_q17",
    "question": "Self-Referencing Key Review Question #17: How does recursive table integrity behave under rule #17?",
    "options": [
      "It enforces that all non-null foreign key values must match an existing primary key within that same table (#17)",
      "It allows random invalid pointers",
      "It drops the table schema",
      "It converts all text to uppercase"
    ],
    "answer": "It enforces that all non-null foreign key values must match an existing primary key within that same table (#17)",
    "explanation": "Self-referencing foreign keys enforce the exact same referential integrity rules within a single table.",
    "explanationBn": "একই টেবিলের ভেতরেও Foreign Key-এর যাবতীয় ইনটিগ্রিটি রুলস সঠিকভাবে কাজ করে।"
  },
  {
    "id": "t7_q18",
    "question": "Self-Referencing Key Review Question #18: How does recursive table integrity behave under rule #18?",
    "options": [
      "It enforces that all non-null foreign key values must match an existing primary key within that same table (#18)",
      "It allows random invalid pointers",
      "It drops the table schema",
      "It converts all text to uppercase"
    ],
    "answer": "It enforces that all non-null foreign key values must match an existing primary key within that same table (#18)",
    "explanation": "Self-referencing foreign keys enforce the exact same referential integrity rules within a single table.",
    "explanationBn": "একই টেবিলের ভেতরেও Foreign Key-এর যাবতীয় ইনটিগ্রিটি রুলস সঠিকভাবে কাজ করে।"
  },
  {
    "id": "t7_q19",
    "question": "Self-Referencing Key Review Question #19: How does recursive table integrity behave under rule #19?",
    "options": [
      "It enforces that all non-null foreign key values must match an existing primary key within that same table (#19)",
      "It allows random invalid pointers",
      "It drops the table schema",
      "It converts all text to uppercase"
    ],
    "answer": "It enforces that all non-null foreign key values must match an existing primary key within that same table (#19)",
    "explanation": "Self-referencing foreign keys enforce the exact same referential integrity rules within a single table.",
    "explanationBn": "একই টেবিলের ভেতরেও Foreign Key-এর যাবতীয় ইনটিগ্রিটি রুলস সঠিকভাবে কাজ করে।"
  },
  {
    "id": "t7_q20",
    "question": "Self-Referencing Key Review Question #20: How does recursive table integrity behave under rule #20?",
    "options": [
      "It enforces that all non-null foreign key values must match an existing primary key within that same table (#20)",
      "It allows random invalid pointers",
      "It drops the table schema",
      "It converts all text to uppercase"
    ],
    "answer": "It enforces that all non-null foreign key values must match an existing primary key within that same table (#20)",
    "explanation": "Self-referencing foreign keys enforce the exact same referential integrity rules within a single table.",
    "explanationBn": "একই টেবিলের ভেতরেও Foreign Key-এর যাবতীয় ইনটিগ্রিটি রুলস সঠিকভাবে কাজ করে।"
  },
  {
    "id": "t7_q21",
    "question": "Self-Referencing Key Review Question #21: How does recursive table integrity behave under rule #21?",
    "options": [
      "It enforces that all non-null foreign key values must match an existing primary key within that same table (#21)",
      "It allows random invalid pointers",
      "It drops the table schema",
      "It converts all text to uppercase"
    ],
    "answer": "It enforces that all non-null foreign key values must match an existing primary key within that same table (#21)",
    "explanation": "Self-referencing foreign keys enforce the exact same referential integrity rules within a single table.",
    "explanationBn": "একই টেবিলের ভেতরেও Foreign Key-এর যাবতীয় ইনটিগ্রিটি রুলস সঠিকভাবে কাজ করে।"
  },
  {
    "id": "t7_q22",
    "question": "Self-Referencing Key Review Question #22: How does recursive table integrity behave under rule #22?",
    "options": [
      "It enforces that all non-null foreign key values must match an existing primary key within that same table (#22)",
      "It allows random invalid pointers",
      "It drops the table schema",
      "It converts all text to uppercase"
    ],
    "answer": "It enforces that all non-null foreign key values must match an existing primary key within that same table (#22)",
    "explanation": "Self-referencing foreign keys enforce the exact same referential integrity rules within a single table.",
    "explanationBn": "একই টেবিলের ভেতরেও Foreign Key-এর যাবতীয় ইনটিগ্রিটি রুলস সঠিকভাবে কাজ করে।"
  },
  {
    "id": "t7_q23",
    "question": "Self-Referencing Key Review Question #23: How does recursive table integrity behave under rule #23?",
    "options": [
      "It enforces that all non-null foreign key values must match an existing primary key within that same table (#23)",
      "It allows random invalid pointers",
      "It drops the table schema",
      "It converts all text to uppercase"
    ],
    "answer": "It enforces that all non-null foreign key values must match an existing primary key within that same table (#23)",
    "explanation": "Self-referencing foreign keys enforce the exact same referential integrity rules within a single table.",
    "explanationBn": "একই টেবিলের ভেতরেও Foreign Key-এর যাবতীয় ইনটিগ্রিটি রুলস সঠিকভাবে কাজ করে।"
  },
  {
    "id": "t7_q24",
    "question": "Self-Referencing Key Review Question #24: How does recursive table integrity behave under rule #24?",
    "options": [
      "It enforces that all non-null foreign key values must match an existing primary key within that same table (#24)",
      "It allows random invalid pointers",
      "It drops the table schema",
      "It converts all text to uppercase"
    ],
    "answer": "It enforces that all non-null foreign key values must match an existing primary key within that same table (#24)",
    "explanation": "Self-referencing foreign keys enforce the exact same referential integrity rules within a single table.",
    "explanationBn": "একই টেবিলের ভেতরেও Foreign Key-এর যাবতীয় ইনটিগ্রিটি রুলস সঠিকভাবে কাজ করে।"
  },
  {
    "id": "t7_q25",
    "question": "Self-Referencing Key Review Question #25: How does recursive table integrity behave under rule #25?",
    "options": [
      "It enforces that all non-null foreign key values must match an existing primary key within that same table (#25)",
      "It allows random invalid pointers",
      "It drops the table schema",
      "It converts all text to uppercase"
    ],
    "answer": "It enforces that all non-null foreign key values must match an existing primary key within that same table (#25)",
    "explanation": "Self-referencing foreign keys enforce the exact same referential integrity rules within a single table.",
    "explanationBn": "একই টেবিলের ভেতরেও Foreign Key-এর যাবতীয় ইনটিগ্রিটি রুলস সঠিকভাবে কাজ করে।"
  }
];
