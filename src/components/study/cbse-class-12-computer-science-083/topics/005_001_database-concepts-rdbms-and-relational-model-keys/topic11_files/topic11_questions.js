export default [
  {
    "id": 1,
    "question": "What is the formal definition of a 'Foreign Key' in a Relational Database Management System?",
    "options": [
      "An attribute (or set of attributes) in a child table whose values reference and match the Primary Key of a parent table",
      "A key imported from a foreign country",
      "A key stored on a foreign server overseas",
      "A key encrypted with foreign characters"
    ],
    "correctAnswer": 0,
    "explanation": "A Foreign Key is an attribute in a referencing (child) relation that links back to the Primary Key of a referenced (parent) relation to establish relational associations.",
    "hint": "An attribute in a child table referencing the primary key of a parent table."
  },
  {
    "id": 2,
    "question": "What does the 'Referential Integrity Rule' state in relational database theory?",
    "options": [
      "A foreign key value must either match an existing primary key value in the parent relation, or be NULL",
      "All tables must have the same number of rows",
      "Foreign keys cannot have numbers",
      "Parent tables cannot be updated"
    ],
    "correctAnswer": 0,
    "explanation": "Referential Integrity ensures that cross-table references remain valid: every foreign key value must exist as a primary key in the parent table, or be NULL.",
    "hint": "Foreign key must match an existing primary key or be NULL."
  },
  {
    "id": 3,
    "question": "In a relationship between DEPARTMENT (parent) and EMPLOYEE (child), where DeptId in EMPLOYEE references DeptId in DEPARTMENT, what is DeptId in EMPLOYEE called?",
    "options": [
      "Foreign Key",
      "Primary Key",
      "Alternate Key",
      "Candidate Key"
    ],
    "correctAnswer": 0,
    "explanation": "DeptId in the EMPLOYEE table references the primary key of DEPARTMENT, making it a Foreign Key.",
    "hint": "Referencing attribute in the child table is the Foreign Key."
  },
  {
    "id": 4,
    "question": "In the same relationship (DEPARTMENT and EMPLOYEE), which table is the 'Parent Relation' (Referenced Table)?",
    "options": [
      "DEPARTMENT (holds the Primary Key)",
      "EMPLOYEE (holds the Foreign Key)",
      "Both tables are parent tables",
      "Neither table"
    ],
    "correctAnswer": 0,
    "explanation": "The table holding the Primary Key being referenced (DEPARTMENT) is the Parent (or Referenced) relation.",
    "hint": "The table holding the Primary Key is the Parent Table."
  },
  {
    "id": 5,
    "question": "What happens if a user attempts to insert an employee with DeptId = 99 into EMPLOYEE when Department 99 does not exist in the DEPARTMENT table?",
    "options": [
      "The DBMS rejects the insertion with a 'Cannot add or update a child row: a foreign key constraint fails' error",
      "A new department 99 is created automatically",
      "The employee is inserted with salary 0",
      "The entire DEPARTMENT table is erased"
    ],
    "correctAnswer": 0,
    "explanation": "Referential Integrity strictly forbids orphan child records. Because parent DeptId 99 does not exist, the insertion is blocked.",
    "hint": "Foreign key constraint failure rejects non-existent parent references."
  },
  {
    "id": 6,
    "question": "What happens by default if an administrator attempts to DELETE a parent row (e.g. DELETE FROM DEPARTMENT WHERE DeptId = 10) while child records reference it in EMPLOYEE?",
    "options": [
      "The DBMS blocks the deletion with a foreign key constraint violation error (RESTRICT / NO ACTION)",
      "The child employee records are printed on paper",
      "The child records are converted to managers",
      "The computer hard drive formats"
    ],
    "correctAnswer": 0,
    "explanation": "Under the default RESTRICT rule, parent rows cannot be deleted while child rows are actively pointing to them, preventing orphan records.",
    "hint": "RESTRICT prevents deleting parent records while children reference them."
  },
  {
    "id": 7,
    "question": "What does the 'ON DELETE CASCADE' clause in a foreign key definition do when a parent row is deleted?",
    "options": [
      "All child records in referencing tables that pointed to the deleted parent row are automatically deleted as well",
      "The deletion is cancelled",
      "The child records are emailed to the administrator",
      "The parent table is renamed"
    ],
    "correctAnswer": 0,
    "explanation": "CASCADE propagates deletions: deleting Department 10 automatically cascades to delete all employees belonging to Department 10.",
    "hint": "Deletions cascade automatically to remove child records."
  },
  {
    "id": 8,
    "question": "What does the 'ON DELETE SET NULL' clause do when a parent row is deleted?",
    "options": [
      "The foreign key values in all matching child rows are automatically set to NULL",
      "The child rows are deleted",
      "The parent row cannot be deleted",
      "The entire database is cleared"
    ],
    "correctAnswer": 0,
    "explanation": "SET NULL updates child rows so their foreign key attribute becomes NULL, retaining the child record while breaking the link.",
    "hint": "Child foreign key values become NULL."
  },
  {
    "id": 9,
    "question": "Can a Foreign Key column contain duplicate values in the child table?",
    "options": [
      "Yes, multiple child rows can reference the same parent row (one-to-many relationship)",
      "No, foreign keys must always be unique",
      "Only if the table is empty",
      "Only in Python"
    ],
    "correctAnswer": 0,
    "explanation": "In a standard 1:M relationship, many employees belong to the same department, so the foreign key DeptId naturally repeats across many rows.",
    "hint": "Many employees can belong to the same department."
  },
  {
    "id": 10,
    "question": "Can a Foreign Key column contain NULL values in a child table?",
    "options": [
      "Yes, unless the column is explicitly defined with a NOT NULL constraint",
      "No, foreign keys can never be NULL under any circumstances",
      "Only if the primary key is NULL",
      "Only in Oracle"
    ],
    "correctAnswer": 0,
    "explanation": "Referential integrity explicitly allows a foreign key to be NULL (e.g. a newly hired employee who has not yet been assigned to any department).",
    "hint": "Foreign keys allow NULL unless NOT NULL is explicitly declared."
  },
  {
    "id": 11,
    "question": "In SQL DDL, how is a foreign key declared in the child table CREATE TABLE statement?",
    "options": [
      "FOREIGN KEY (DeptId) REFERENCES Department(DeptId)",
      "LINK DeptId TO Department(DeptId)",
      "CONNECT DeptId WITH Department",
      "RELATE DeptId -> Department"
    ],
    "correctAnswer": 0,
    "explanation": "Standard SQL syntax: FOREIGN KEY (<child_col>) REFERENCES <parent_table>(<parent_pk_col>).",
    "hint": "FOREIGN KEY (...) REFERENCES ParentTable(...)."
  },
  {
    "id": 12,
    "question": "In a CBSE 2-mark question: 'Table STUDENT has RollNo as primary key. Table FEE has RollNo, FeePaid, Date. Identify parent and child tables, and the foreign key.'",
    "options": [
      "Parent Table: STUDENT; Child Table: FEE; Foreign Key: RollNo in FEE",
      "Parent Table: FEE; Child Table: STUDENT; Foreign Key: FeePaid",
      "Parent Table: STUDENT; Child Table: None; Foreign Key: Date",
      "Parent Table: FEE; Child Table: FEE; Foreign Key: RollNo"
    ],
    "correctAnswer": 0,
    "explanation": "STUDENT holds the primary key (parent); FEE references it via RollNo (child); RollNo in FEE is the foreign key.",
    "hint": "Parent: STUDENT; Child: FEE; Foreign Key: RollNo in FEE."
  },
  {
    "id": 13,
    "question": "Can a table contain more than one Foreign Key?",
    "options": [
      "Yes, a child table can have multiple foreign keys referencing different parent tables (e.g. OrderDetail references both Orders and Products)",
      "No, exactly one foreign key is permitted per table",
      "Only if the table has no primary key",
      "Only in SQLite"
    ],
    "correctAnswer": 0,
    "explanation": "A relation can contain multiple foreign keys linking to multiple parent tables (common in junction/association tables).",
    "hint": "A table can possess multiple foreign keys linking to different parents."
  },
  {
    "id": 14,
    "question": "Can an attribute serve simultaneously as part of the Primary Key AND as a Foreign Key in the same table?",
    "options": [
      "Yes, in composite primary keys of junction tables (e.g. (StudentId, CourseId) where each is also a foreign key)",
      "No, a column cannot be both primary key and foreign key",
      "Only in NoSQL databases",
      "Never"
    ],
    "correctAnswer": 0,
    "explanation": "In many-to-many relationship tables, the composite primary key consists of foreign keys referencing the related entity tables.",
    "hint": "Yes, common in composite primary keys of junction tables."
  },
  {
    "id": 15,
    "question": "What is a 'Self-Referencing Foreign Key' (or Recursive Foreign Key)?",
    "options": [
      "A foreign key in a table that references the primary key of the VERY SAME table (e.g. ManagerId in Employee references EmpId in Employee)",
      "A foreign key that connects to Google",
      "A foreign key that deletes itself",
      "A foreign key made of numbers only"
    ],
    "correctAnswer": 0,
    "explanation": "A recursive foreign key references the primary key of the same relation (e.g. an employee's manager is also an employee in the same table).",
    "hint": "References the primary key of the same table (e.g. ManagerId -> EmpId)."
  },
  {
    "id": 16,
    "question": "Must the Foreign Key column have the exact same column name as the referenced Primary Key column?",
    "options": [
      "No, the column names can be different (e.g. 'DNo' in Employee referencing 'DeptId' in Department), though having the same name is good practice",
      "Yes, column names must match character-by-character",
      "Yes, names must be in uppercase",
      "Only in MySQL"
    ],
    "correctAnswer": 0,
    "explanation": "Attribute names do not need to be identical; only the data types and domains must be compatible for the foreign key link.",
    "hint": "Names can differ, but data types and domains must match."
  },
  {
    "id": 17,
    "question": "Must the Foreign Key attribute and referenced Primary Key attribute have compatible data types?",
    "options": [
      "Yes, both columns must have compatible data types and lengths (e.g. both INT or both VARCHAR(10))",
      "No, one can be an image and the other an integer",
      "Data types do not matter in RDBMS",
      "Only if the table is empty"
    ],
    "correctAnswer": 0,
    "explanation": "Foreign key validation requires matching data types (e.g. linking an INT foreign key to an INT primary key).",
    "hint": "Data types and domains must be compatible."
  },
  {
    "id": 18,
    "question": "In what order must parent and child tables be DROPPED when cleaning up a database?",
    "options": [
      "Child tables must be dropped FIRST, then parent tables; attempting to drop a parent table first triggers a foreign key dependency error",
      "Parent tables must be dropped first",
      "Both must be dropped simultaneously",
      "The order does not matter"
    ],
    "correctAnswer": 0,
    "explanation": "A parent table cannot be dropped while foreign keys reference it; child tables must be dropped first (or DROP TABLE ... CASCADE).",
    "hint": "Child tables first, parent tables last."
  },
  {
    "id": 19,
    "question": "In what order must parent and child records be INSERTED during data entry?",
    "options": [
      "Parent records must be inserted FIRST, then child records referencing them",
      "Child records must be inserted first",
      "The order is random",
      "Both must be inserted in the same microsecond"
    ],
    "correctAnswer": 0,
    "explanation": "A child record cannot reference a non-existent parent; therefore, the parent row must exist in the database before the child is inserted.",
    "hint": "Parent records must exist before child records can reference them."
  },
  {
    "id": 20,
    "question": "What is an 'Orphan Record' in database terminology?",
    "options": [
      "A record in a child table whose foreign key references a parent primary key that no longer exists in the parent table",
      "A table with no name",
      "A record with no columns",
      "A file deleted from the desktop"
    ],
    "correctAnswer": 0,
    "explanation": "An orphan record occurs when referential integrity fails: child records are left pointing to non-existent parent IDs.",
    "hint": "Child record pointing to a non-existent parent record."
  },
  {
    "id": 21,
    "question": "How does an RDBMS prevent the creation of orphan records?",
    "options": [
      "By continuously enforcing the Referential Integrity constraint on every INSERT, UPDATE, and DELETE operation",
      "By running antivirus software",
      "By converting records to PDF files",
      "By turning off the server at night"
    ],
    "correctAnswer": 0,
    "explanation": "The RDBMS engine validates foreign key references during every DML operation, immediately blocking any change that would leave orphan records.",
    "hint": "Continuously enforcing referential integrity on all DML operations."
  },
  {
    "id": 22,
    "question": "What does 'ON UPDATE CASCADE' do when a Primary Key value in a parent table is modified?",
    "options": [
      "The new primary key value is automatically updated in all referencing foreign key child records",
      "The update is cancelled",
      "All child records are deleted",
      "The parent table is renamed"
    ],
    "correctAnswer": 0,
    "explanation": "ON UPDATE CASCADE automatically propagates the updated primary key value to all matching child foreign key rows.",
    "hint": "Propagates primary key changes to child foreign keys automatically."
  },
  {
    "id": 23,
    "question": "In table HOSPITAL(DocId, PatientId, VisitDate), if DocId references DOCTOR and PatientId references PATIENT, what type of relation is HOSPITAL?",
    "options": [
      "A junction / association table implementing a Many-to-Many relationship between DOCTOR and PATIENT",
      "A single-user table",
      "A temporary operating system file",
      "A flat text file"
    ],
    "correctAnswer": 0,
    "explanation": "HOSPITAL acts as an associative junction table holding foreign keys to bridge a M:N relationship between doctors and patients.",
    "hint": "Junction table bridging Many-to-Many relationship."
  },
  {
    "id": 24,
    "question": "In a CBSE board exam question: 'Can a Foreign Key reference an Alternate Key having a UNIQUE constraint?'",
    "options": [
      "Yes, foreign keys can reference any candidate key, including alternate keys with UNIQUE constraints",
      "No, foreign keys can only reference Primary Keys",
      "Only in MySQL",
      "Never"
    ],
    "correctAnswer": 0,
    "explanation": "Yes, relational theory and SQL standards allow foreign keys to reference any candidate key (Primary Key or UNIQUE Alternate Key).",
    "hint": "Yes, foreign keys can reference unique alternate keys."
  },
  {
    "id": 25,
    "question": "In summary, what are the two core rules of Referential Integrity?",
    "options": [
      "1. Foreign key value must match an existing parent primary key, or 2. Foreign key value must be NULL",
      "1. Foreign keys must be numbers and 2. Primary keys must be letters",
      "1. Parent tables must have 10 rows and 2. Child tables must have 5 rows",
      "1. All tables must be encrypted and 2. No tables can be deleted"
    ],
    "correctAnswer": 0,
    "explanation": "The universal referential integrity rule: A foreign key value must either exist in the referenced parent primary key column, or be NULL.",
    "hint": "Match existing parent primary key OR be NULL."
  }
];
