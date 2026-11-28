export default [
  {
    "id": 1,
    "question": "A relation STUDENT has 5 columns and 40 rows. If 4 new students are enrolled (inserted) and 2 students leave (deleted), what is the updated Degree and Cardinality?",
    "options": [
      "Degree = 5, Cardinality = 42",
      "Degree = 9, Cardinality = 42",
      "Degree = 7, Cardinality = 38",
      "Degree = 5, Cardinality = 40"
    ],
    "correctAnswer": 0,
    "explanation": "Degree remains 5 because columns were not altered. Cardinality = 40 + 4 - 2 = 42 rows.",
    "hint": "Columns remain 5; rows = 40 + 4 - 2."
  },
  {
    "id": 2,
    "question": "A relation INVENTORY has Degree 6 and Cardinality 100. If 2 columns are added via ALTER TABLE and 3 columns are dropped, what is the new Degree?",
    "options": [
      "Degree = 5 (6 + 2 - 3)",
      "Degree = 8",
      "Degree = 11",
      "Degree = 99"
    ],
    "correctAnswer": 0,
    "explanation": "Starting degree = 6. After adding 2 columns and dropping 3 columns: 6 + 2 - 3 = 5 attributes.",
    "hint": "6 + 2 - 3 = 5."
  },
  {
    "id": 3,
    "question": "Table EMP has Degree 4 and Cardinality 25. Table DEPT has Degree 3 and Cardinality 5. What is the Degree and Cardinality of their Cartesian Product (EMP x DEPT)?",
    "options": [
      "Degree = 7, Cardinality = 125",
      "Degree = 12, Cardinality = 30",
      "Degree = 125, Cardinality = 7",
      "Degree = 7, Cardinality = 30"
    ],
    "correctAnswer": 0,
    "explanation": "Degrees ADD: 4 + 3 = 7. Cardinalities MULTIPLY: 25 * 5 = 125.",
    "hint": "Degree = 4 + 3 = 7; Cardinality = 25 * 5 = 125."
  },
  {
    "id": 4,
    "question": "If Table A has Degree 3 and Table B has Degree 4, what is the Degree of their Natural Join (assuming they share exactly 1 common attribute)?",
    "options": [
      "Degree = 6 (3 + 4 - 1)",
      "Degree = 7",
      "Degree = 12",
      "Degree = 1"
    ],
    "correctAnswer": 0,
    "explanation": "In a Natural Join, the common attribute appears only once in the result set: Degree = D(A) + D(B) - 1 = 3 + 4 - 1 = 6.",
    "hint": "Common attribute is not duplicated in Natural Join."
  },
  {
    "id": 5,
    "question": "Table R has 10 rows and Table S has 8 rows. In a Natural Join on an attribute where only 4 rows match the join condition, what is the Cardinality of the result?",
    "options": [
      "Cardinality = 4",
      "Cardinality = 18",
      "Cardinality = 80",
      "Cardinality = 10"
    ],
    "correctAnswer": 0,
    "explanation": "An inner Natural Join includes only tuples that satisfy the join condition. Since exactly 4 rows match, the resulting cardinality is 4.",
    "hint": "Inner join yields only the matching rows (4)."
  },
  {
    "id": 6,
    "question": "Table P has 50 rows. If an administrator executes 'DELETE FROM P WHERE Age > 30;' which deletes 18 records, what is the new Cardinality?",
    "options": [
      "Cardinality = 32 (50 - 18)",
      "Cardinality = 50",
      "Cardinality = 18",
      "Cardinality = 0"
    ],
    "correctAnswer": 0,
    "explanation": "Deleting 18 records leaves 50 - 18 = 32 rows.",
    "hint": "50 - 18 = 32."
  },
  {
    "id": 7,
    "question": "In the same scenario (50 rows, 18 deleted), what happens to the Degree of table P?",
    "options": [
      "Degree remains completely unchanged",
      "Degree decreases by 18",
      "Degree increases by 18",
      "Degree becomes 0"
    ],
    "correctAnswer": 0,
    "explanation": "DELETE commands operate strictly on rows (tuples). Column definitions (Degree) are completely untouched.",
    "hint": "Row deletion never alters column count."
  },
  {
    "id": 8,
    "question": "Two tables T1 and T2 are union-compatible, each having Degree 4. T1 has 15 rows and T2 has 20 rows, with 5 identical duplicate rows between them. What is the Cardinality of (T1 UNION T2)?",
    "options": [
      "Cardinality = 30 (15 + 20 - 5)",
      "Cardinality = 35",
      "Cardinality = 4",
      "Cardinality = 300"
    ],
    "correctAnswer": 0,
    "explanation": "UNION removes duplicate tuples: 15 + 20 - 5 = 30 unique rows.",
    "hint": "UNION eliminates duplicate rows."
  },
  {
    "id": 9,
    "question": "In the same union scenario, what is the Degree of (T1 UNION T2)?",
    "options": [
      "Degree = 4",
      "Degree = 8",
      "Degree = 16",
      "Degree = 0"
    ],
    "correctAnswer": 0,
    "explanation": "UNION operates only on union-compatible tables with identical column schemas; the result retains the same Degree (4).",
    "hint": "Union result preserves the column count."
  },
  {
    "id": 10,
    "question": "Table A has 12 rows and Table B has 8 rows, with 3 rows common to both. What is the Cardinality of (A INTERSECT B)?",
    "options": [
      "Cardinality = 3",
      "Cardinality = 20",
      "Cardinality = 96",
      "Cardinality = 9"
    ],
    "correctAnswer": 0,
    "explanation": "INTERSECT returns only tuples present in both tables; since 3 rows are common, the cardinality is 3.",
    "hint": "Common rows count is 3."
  },
  {
    "id": 11,
    "question": "Table A has 12 rows and Table B has 8 rows, with 3 rows common to both. What is the Cardinality of (A MINUS B)?",
    "options": [
      "Cardinality = 9 (12 - 3)",
      "Cardinality = 5",
      "Cardinality = 3",
      "Cardinality = 20"
    ],
    "correctAnswer": 0,
    "explanation": "Set difference (A MINUS B) returns rows present in A but not in B: 12 - 3 = 9 rows.",
    "hint": "Rows in A minus common rows: 12 - 3 = 9."
  },
  {
    "id": 12,
    "question": "A relation CLUB has Degree 5 and Cardinality 60. If 'TRUNCATE TABLE CLUB;' is executed, what are the resulting Degree and Cardinality?",
    "options": [
      "Degree = 5, Cardinality = 0",
      "Degree = 0, Cardinality = 0",
      "Degree = 0, Cardinality = 60",
      "Degree = 5, Cardinality = 60"
    ],
    "correctAnswer": 0,
    "explanation": "TRUNCATE removes all tuples (Cardinality = 0) while keeping the schema structure intact (Degree = 5).",
    "hint": "Rows are emptied (0); columns remain (5)."
  },
  {
    "id": 13,
    "question": "A table COURSE has 3 columns and 10 rows. If 2 new columns are added and 5 new rows are inserted, what is the new number of data cells in the table?",
    "options": [
      "75 cells (5 columns * 15 rows)",
      "30 cells",
      "45 cells",
      "150 cells"
    ],
    "correctAnswer": 0,
    "explanation": "New Degree = 3 + 2 = 5. New Cardinality = 10 + 5 = 15. Total cells = 5 * 15 = 75.",
    "hint": "(3 + 2) * (10 + 5) = 5 * 15 = 75."
  },
  {
    "id": 14,
    "question": "In a CBSE board exam: 'Table VENDOR has 6 attributes and 20 tuples. A user executes a query: SELECT * FROM VENDOR WHERE City = 'Delhi'; which returns 8 rows. State the Degree and Cardinality of the output table.'",
    "options": [
      "Degree = 6, Cardinality = 8",
      "Degree = 8, Cardinality = 6",
      "Degree = 6, Cardinality = 20",
      "Degree = 1, Cardinality = 8"
    ],
    "correctAnswer": 0,
    "explanation": "SELECT * retrieves all 6 attributes (Degree = 6). The WHERE condition filters the result to 8 matching rows (Cardinality = 8).",
    "hint": "SELECT * keeps all columns (6); output has 8 rows."
  },
  {
    "id": 15,
    "question": "In the same query: 'SELECT VName, City FROM VENDOR WHERE City = 'Delhi';' which returns 8 rows. What is the Degree and Cardinality of the output result set?",
    "options": [
      "Degree = 2, Cardinality = 8",
      "Degree = 6, Cardinality = 8",
      "Degree = 8, Cardinality = 2",
      "Degree = 2, Cardinality = 20"
    ],
    "correctAnswer": 0,
    "explanation": "Since only 2 columns (VName, City) are projected, the result set Degree is 2. Cardinality remains 8 rows.",
    "hint": "2 projected columns (Degree = 2); 8 filtered rows."
  },
  {
    "id": 16,
    "question": "If Table X has Cardinality 0 and Table Y has Cardinality 10, what is the Cardinality of their Cartesian Product (X x Y)?",
    "options": [
      "0 (since 0 * 10 = 0)",
      "10",
      "100",
      "Undefined"
    ],
    "correctAnswer": 0,
    "explanation": "Cardinality(X x Y) = Cardinality(X) * Cardinality(Y) = 0 * 10 = 0. The Cartesian product of an empty table is empty.",
    "hint": "0 multiplied by anything is 0."
  },
  {
    "id": 17,
    "question": "Table X has Degree 4 and Table Y has Degree 3. If Table X has Cardinality 0, what is the Degree of (X x Y)?",
    "options": [
      "Degree = 7 (4 + 3)",
      "Degree = 0",
      "Degree = 12",
      "Degree = 1"
    ],
    "correctAnswer": 0,
    "explanation": "Degree is determined strictly by the schemas: 4 + 3 = 7 columns (even if the resulting table contains 0 rows).",
    "hint": "Degrees add regardless of row count: 4 + 3 = 7."
  },
  {
    "id": 18,
    "question": "A relation BOOKS has 4 columns and 100 rows. A script inserts 20 rows, then deletes 5 rows, then adds 1 column. What are the final Degree and Cardinality?",
    "options": [
      "Degree = 5, Cardinality = 115",
      "Degree = 4, Cardinality = 115",
      "Degree = 5, Cardinality = 120",
      "Degree = 3, Cardinality = 100"
    ],
    "correctAnswer": 0,
    "explanation": "Degree = 4 + 1 = 5. Cardinality = 100 + 20 - 5 = 115.",
    "hint": "Columns: 4 + 1 = 5; Rows: 100 + 20 - 5 = 115."
  },
  {
    "id": 19,
    "question": "In a CBSE 2-mark question: 'Table A has Degree 3 and Cardinality 4. Table B has Degree 5 and Cardinality 6. Find the Degree and Cardinality of A x B.' What is the answer?",
    "options": [
      "Degree = 8, Cardinality = 24",
      "Degree = 15, Cardinality = 10",
      "Degree = 8, Cardinality = 10",
      "Degree = 24, Cardinality = 8"
    ],
    "correctAnswer": 0,
    "explanation": "Degree = 3 + 5 = 8. Cardinality = 4 * 6 = 24.",
    "hint": "Degree = 3 + 5 = 8; Cardinality = 4 * 6 = 24."
  },
  {
    "id": 20,
    "question": "What is the Cardinality of the result of 'SELECT DISTINCT DeptId FROM Employee;' if 50 employees belong to 4 distinct departments?",
    "options": [
      "Cardinality = 4",
      "Cardinality = 50",
      "Cardinality = 1",
      "Cardinality = 200"
    ],
    "correctAnswer": 0,
    "explanation": "DISTINCT filters out all duplicate department IDs, leaving exactly 4 unique rows.",
    "hint": "4 distinct department IDs remain."
  },
  {
    "id": 21,
    "question": "If a database table has 10 columns and 0 rows, which SQL command can increase its Cardinality to 1?",
    "options": [
      "INSERT INTO table VALUES (...)",
      "ALTER TABLE ADD COLUMN",
      "SELECT * FROM table",
      "CREATE INDEX"
    ],
    "correctAnswer": 0,
    "explanation": "INSERT adds a new row, increasing Cardinality from 0 to 1.",
    "hint": "INSERT command adds a new row."
  },
  {
    "id": 22,
    "question": "What is the maximum possible Cardinality of an Equi-Join between Table A (10 rows) and Table B (10 rows) on a foreign key referencing a primary key?",
    "options": [
      "At most 10 rows (since each child row can match at most one unique parent row)",
      "100 rows",
      "20 rows",
      "Infinite rows"
    ],
    "correctAnswer": 0,
    "explanation": "Because a primary key is unique, each foreign key value matches at most one primary key row, bounding the result at 10 rows.",
    "hint": "Foreign key to primary key matches at most 1:1 for each child row."
  },
  {
    "id": 23,
    "question": "In relational algebra, if Relation R has 5 tuples and Relation S has 5 tuples, what is the minimum possible Cardinality of (R UNION S)?",
    "options": [
      "5 tuples (if R and S are completely identical)",
      "0 tuples",
      "10 tuples",
      "25 tuples"
    ],
    "correctAnswer": 0,
    "explanation": "If R and S contain the exact same 5 tuples, UNION eliminates all duplicates, yielding exactly 5 tuples.",
    "hint": "If all rows are identical, UNION leaves 5 rows."
  },
  {
    "id": 24,
    "question": "What is the maximum possible Cardinality of (R UNION S) for the same tables (each having 5 tuples)?",
    "options": [
      "10 tuples (if R and S share zero common rows)",
      "25 tuples",
      "5 tuples",
      "1 tuple"
    ],
    "correctAnswer": 0,
    "explanation": "If all rows in R and S are distinct with zero overlap, UNION retains all 5 + 5 = 10 tuples.",
    "hint": "If no rows overlap, 5 + 5 = 10."
  },
  {
    "id": 25,
    "question": "In summary, what are the impact rules on Degree and Cardinality for DML vs DDL commands?",
    "options": [
      "DML (INSERT, DELETE) modifies Cardinality; DDL (ALTER ADD/DROP) modifies Degree",
      "DML modifies Degree; DDL modifies Cardinality",
      "Both modify only Degree",
      "Both modify only Cardinality"
    ],
    "correctAnswer": 0,
    "explanation": "Fundamental Rule: DML commands (INSERT, DELETE, TRUNCATE) change Cardinality (rows); DDL commands (ALTER TABLE ADD/DROP) change Degree (columns).",
    "hint": "DML changes rows (Cardinality); DDL changes columns (Degree)."
  }
];
