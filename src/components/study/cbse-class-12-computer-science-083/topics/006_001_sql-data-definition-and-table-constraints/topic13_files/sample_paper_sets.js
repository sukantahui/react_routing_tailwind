export const samplePaperSets = [
  {
    "setId": 1,
    "title": "Set 1: SQL Classification (DDL, DML, DQL, TCL) & Data Types",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which of the following is a DDL command in SQL?\n(a) SELECT\n(b) UPDATE\n(c) ALTER\n(d) INSERT",
            "solution": "(c) ALTER. DDL commands include CREATE, ALTER, DROP, and TRUNCATE.",
            "markingScheme": "1 Mark for (c) ALTER."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What is the standard date format in MySQL?\n(a) DD-MM-YYYY\n(b) YYYY-MM-DD\n(c) MM-DD-YYYY\n(d) YYYY-DD-MM",
            "solution": "(b) YYYY-MM-DD (ISO-8601 standard format, e.g. '2026-03-15').",
            "markingScheme": "1 Mark for (b) YYYY-MM-DD."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "State the difference between CHAR(10) and VARCHAR(10) when storing the string 'RAM'.",
            "solution": "CHAR(10) allocates 10 bytes and right-pads with 7 spaces. VARCHAR(10) stores only the 3 characters ('RAM') plus length metadata, saving disk storage.",
            "markingScheme": "1 Mark for CHAR fixed 10 bytes with padding vs VARCHAR 3 bytes variable."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "Which sublanguage of SQL do COMMIT and ROLLBACK belong to?",
            "solution": "TCL (Transaction Control Language).",
            "markingScheme": "1 Mark for TCL."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Differentiate between DDL and DML commands with two examples of each.",
            "solution": "DDL (Data Definition Language): Defines, modifies, and destroys database structure/schema. Auto-commits changes immediately. Examples: CREATE TABLE, ALTER TABLE.\nDML (Data Manipulation Language): Inserts, updates, and deletes data values inside existing tables. Examples: INSERT INTO, UPDATE.",
            "markingScheme": "1 Mark for DDL definition + examples, 1 Mark for DML definition + examples."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Why should monetary salary fields be declared as DECIMAL(10, 2) instead of FLOAT?",
            "solution": "FLOAT uses approximate binary floating-point representation which introduces rounding errors. DECIMAL(10, 2) stores exact numeric values with exact decimal precision, mandatory for financial calculations.",
            "markingScheme": "1 Mark for FLOAT is approximate/rounding errors, 1 Mark for DECIMAL is exact numeric representation."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Categorize the following SQL commands into DDL, DML, DQL, or TCL:\n1. DROP TABLE\n2. UPDATE\n3. COMMIT\n4. CREATE DATABASE\n5. SELECT\n6. DELETE",
            "solution": "1. DROP TABLE: DDL\n2. UPDATE: DML\n3. COMMIT: TCL\n4. CREATE DATABASE: DDL\n5. SELECT: DQL (or DML)\n6. DELETE: DML",
            "markingScheme": "0.5 Marks per correct category (Total 3 Marks)."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Explain the components of the column definition: price DECIMAL(7, 2). State the maximum value that can be stored.",
            "solution": "In DECIMAL(7, 2):\n- 7 is the Precision: Total number of significant decimal digits.\n- 2 is the Scale: Number of digits to the right of the decimal point.\n- The integer part can have at most (7 - 2) = 5 digits.\nMaximum value: 99999.99.",
            "markingScheme": "1 Mark for Precision 7, 1 Mark for Scale 2, 1 Mark for Maximum value 99999.99."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write complete SQL statements to:\n(a) Create a database named 'company_db'.\n(b) Open / activate 'company_db' as the working database.\n(c) Create a table 'EMPLOYEE' with the following specification:\n    - EmpID: Integer, Primary Key\n    - EmpName: Variable character up to 40, cannot be null\n    - Dept: Variable character up to 25, default value 'General'\n    - BasicSalary: Exact decimal 8 digits with 2 decimal places, must be > 0\n    - JoinDate: Date field",
            "solution": "(a) CREATE DATABASE company_db;\n(b) USE company_db;\n(c) CREATE TABLE EMPLOYEE (\n    EmpID INT PRIMARY KEY,\n    EmpName VARCHAR(40) NOT NULL,\n    Dept VARCHAR(25) DEFAULT 'General',\n    BasicSalary DECIMAL(8, 2) CHECK (BasicSalary > 0),\n    JoinDate DATE\n);",
            "markingScheme": "1 Mark for (a) CREATE DATABASE, 1 Mark for (b) USE, 4 Marks for (c) CREATE TABLE with all 5 columns, data types, and constraints."
          }
        ]
      }
    ]
  },
  {
    "setId": 2,
    "title": "Set 2: Table Creation & Column vs Table Constraints",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which constraint can only be declared at column-level, never at table-level in MySQL?\n(a) PRIMARY KEY\n(b) NOT NULL\n(c) UNIQUE\n(d) FOREIGN KEY",
            "solution": "(b) NOT NULL. NOT NULL must always be declared inline at column-level.",
            "markingScheme": "1 Mark for (b) NOT NULL."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "When is a table-level constraint mandatory when defining a PRIMARY KEY?",
            "solution": "When creating a Composite Primary Key consisting of two or more columns (e.g. PRIMARY KEY (RollNo, CourseID)).",
            "markingScheme": "1 Mark for composite primary key of two or more columns."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What command displays the structure and column definitions of an existing table?",
            "solution": "DESCRIBE table_name; (or DESC table_name;).",
            "markingScheme": "1 Mark for DESCRIBE or DESC."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether a single table can contain multiple UNIQUE constraints.",
            "solution": "Yes. A table can have multiple unique columns.",
            "markingScheme": "1 Mark for Yes."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Differentiate between Column-level and Table-level constraints with examples.",
            "solution": "Column-level constraint: Applied inline immediately after the column data type, applying to that single column only (e.g. roll INT PRIMARY KEY).\nTable-level constraint: Declared at the end of table definition separated by comma, capable of referencing multiple columns (e.g. PRIMARY KEY (roll, course)).",
            "markingScheme": "1 Mark for column-level inline, 1 Mark for table-level multi-column."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Find the syntax error in the following statement and write the corrected statement:\nCREATE TABLE test (id INT, name VARCHAR(30), PRIMARY KEY id);",
            "solution": "Error: The column name in the table-level PRIMARY KEY constraint must be enclosed in parentheses.\nCorrected:\nCREATE TABLE test (id INT, name VARCHAR(30), PRIMARY KEY (id));",
            "markingScheme": "1 Mark for identifying missing parentheses, 1 Mark for corrected PRIMARY KEY (id)."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Explain the columns shown in the output of DESCRIBE student (Field, Type, Null, Key, Default, Extra).",
            "solution": "- Field: Column name.\n- Type: Data type and width (e.g. varchar(30), int).\n- Null: 'YES' if NULL is permitted; 'NO' if NOT NULL or PRIMARY KEY.\n- Key: 'PRI' for Primary Key, 'UNI' for Unique, 'MUL' for secondary/foreign key.\n- Default: The default value if omitted during INSERT.\n- Extra: Special attributes like 'auto_increment'.",
            "markingScheme": "0.5 Marks per column explanation (up to 3 Marks)."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write the SQL statement to create a table 'ENROLL' having a Composite Primary Key on (RollNo, SubCode) and EnrollDate defaulting to current date.",
            "solution": "CREATE TABLE ENROLL (\n    RollNo INT,\n    SubCode VARCHAR(10),\n    EnrollDate DATE DEFAULT (CURRENT_DATE),\n    PRIMARY KEY (RollNo, SubCode)\n);",
            "markingScheme": "1 Mark for column definitions, 1.5 Marks for table-level PRIMARY KEY (RollNo, SubCode), 0.5 Mark for DEFAULT date."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write SQL DDL statements for a school library system:\n(a) Create table 'BOOK' with:\n    - BookID: Integer, Primary Key\n    - Title: Varchar 50, Not Null\n    - Author: Varchar 40\n    - Price: Decimal 6,2, Check price > 0\n(b) Create table 'MEMBER' with:\n    - MemID: Integer, Primary Key\n    - Name: Varchar 40, Not Null\n    - MemType: Varchar 15, Default 'Student'\n(c) Create table 'ISSUE' with:\n    - IssueID: Integer, Primary Key\n    - BookID: Integer, references BOOK(BookID)\n    - MemID: Integer, references MEMBER(MemID)\n    - IssueDate: Date",
            "solution": "(a) CREATE TABLE BOOK (\n    BookID INT PRIMARY KEY,\n    Title VARCHAR(50) NOT NULL,\n    Author VARCHAR(40),\n    Price DECIMAL(6, 2) CHECK (Price > 0)\n);\n\n(b) CREATE TABLE MEMBER (\n    MemID INT PRIMARY KEY,\n    Name VARCHAR(40) NOT NULL,\n    MemType VARCHAR(15) DEFAULT 'Student'\n);\n\n(c) CREATE TABLE ISSUE (\n    IssueID INT PRIMARY KEY,\n    BookID INT,\n    MemID INT,\n    IssueDate DATE,\n    FOREIGN KEY (BookID) REFERENCES BOOK(BookID),\n    FOREIGN KEY (MemID) REFERENCES MEMBER(MemID)\n);",
            "markingScheme": "2 Marks for BOOK table, 2 Marks for MEMBER table, 2 Marks for ISSUE table with two foreign keys."
          }
        ]
      }
    ]
  },
  {
    "setId": 3,
    "title": "Set 3: PRIMARY KEY & FOREIGN KEY Constraints in Action",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which table must be created FIRST in a relational database: Parent table or Child table?\n(a) Child table\n(b) Parent table\n(c) Either order\n(d) Both simultaneously",
            "solution": "(b) Parent table. The referenced primary key must exist before a child table can establish a foreign key reference.",
            "markingScheme": "1 Mark for (b) Parent table."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What keyword specifies the referenced parent table and column in a FOREIGN KEY definition?",
            "solution": "REFERENCES (e.g. REFERENCES parent_table(parent_col)).",
            "markingScheme": "1 Mark for REFERENCES."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "Can a foreign key reference a column in the same table (self-referencing foreign key)?",
            "solution": "Yes (e.g. ManagerID in EMPLOYEE table referencing EmpID of the same table).",
            "markingScheme": "1 Mark for Yes."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether a child table can be deleted using DROP TABLE before deleting the parent table.",
            "solution": "Yes. Child tables can be dropped freely; dropping the parent table first is restricted.",
            "markingScheme": "1 Mark for Yes (child table can be dropped first)."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "What happens if you execute DROP TABLE on a parent table that is actively referenced by child foreign keys?",
            "solution": "MySQL halts the statement and raises an error: 'Cannot drop table ... referenced by a foreign key constraint'. Foreign keys or child tables must be dropped first.",
            "markingScheme": "1 Mark for error / execution halted, 1 Mark for explanation of foreign key constraint protection."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Explain ON DELETE CASCADE in a foreign key constraint.",
            "solution": "ON DELETE CASCADE ensures that when a record is deleted from the parent table, all matching child records referencing that parent key are automatically deleted simultaneously.",
            "markingScheme": "1 Mark for parent row deletion, 1 Mark for automatic deletion of matching child rows."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Given tables:\nDEPARTMENT (DeptNo INT PRIMARY KEY, DeptName VARCHAR(20))\nFACULTY (FacID INT PRIMARY KEY, Name VARCHAR(30), DeptNo INT)\nWrite the CREATE TABLE statement for FACULTY including foreign key constraint on DeptNo with ON DELETE SET NULL.",
            "solution": "CREATE TABLE FACULTY (\n    FacID INT PRIMARY KEY,\n    Name VARCHAR(30) NOT NULL,\n    DeptNo INT,\n    FOREIGN KEY (DeptNo) REFERENCES DEPARTMENT(DeptNo) ON DELETE SET NULL\n);",
            "markingScheme": "1.5 Marks for column definitions, 1.5 Marks for FOREIGN KEY REFERENCES ... ON DELETE SET NULL."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Differentiate between PRIMARY KEY and UNIQUE constraint on:\n1. Nullability\n2. Number of keys allowed per table",
            "solution": "1. Nullability: PRIMARY KEY strictly forbids NULL values (Entity Integrity). UNIQUE allows NULL values (unless combined with NOT NULL).\n2. Count per table: A table can have at most ONE Primary Key. A table can have MULTIPLE Unique constraints.",
            "markingScheme": "1.5 Marks for Nullability difference, 1.5 Marks for count per table difference."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write complete SQL DDL commands to create an airline reservation database:\n1. Create table 'AIRLINE' with AirlineID (Char 3, Primary Key), AirlineName (Varchar 30, Not Null).\n2. Create table 'FLIGHT' with FlightNo (Varchar 10, Primary Key), AirlineID (Char 3, Foreign Key referencing AIRLINE), Source (Varchar 25), Destination (Varchar 25), Seats (Int, Check Seats > 0).\n3. Create table 'PASSENGER' with TicketNo (Int, Primary Key), FlightNo (Varchar 10, Foreign Key referencing FLIGHT), PName (Varchar 40), Gender (Char 1, Check Gender IN ('M','F','O')).",
            "solution": "CREATE TABLE AIRLINE (\n    AirlineID CHAR(3) PRIMARY KEY,\n    AirlineName VARCHAR(30) NOT NULL\n);\n\nCREATE TABLE FLIGHT (\n    FlightNo VARCHAR(10) PRIMARY KEY,\n    AirlineID CHAR(3),\n    Source VARCHAR(25),\n    Destination VARCHAR(25),\n    Seats INT CHECK (Seats > 0),\n    FOREIGN KEY (AirlineID) REFERENCES AIRLINE(AirlineID)\n);\n\nCREATE TABLE PASSENGER (\n    TicketNo INT PRIMARY KEY,\n    FlightNo VARCHAR(10),\n    PName VARCHAR(40) NOT NULL,\n    Gender CHAR(1) CHECK (Gender IN ('M', 'F', 'O')),\n    FOREIGN KEY (FlightNo) REFERENCES FLIGHT(FlightNo)\n);",
            "markingScheme": "2 Marks for AIRLINE table, 2 Marks for FLIGHT table with FK and CHECK, 2 Marks for PASSENGER table with FK and CHECK IN."
          }
        ]
      }
    ]
  },
  {
    "setId": 4,
    "title": "Set 4: Data Integrity Constraints (NOT NULL, UNIQUE, CHECK, DEFAULT)",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which constraint ensures that a column automatically receives a specified value when an INSERT omits it?\n(a) NOT NULL\n(b) DEFAULT\n(c) UNIQUE\n(d) AUTO_INCREMENT",
            "solution": "(b) DEFAULT.",
            "markingScheme": "1 Mark for (b) DEFAULT."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "Which constraint validates that an employee's age is between 18 and 60?\n(a) CHECK\n(b) DEFAULT\n(c) NOT NULL\n(d) FOREIGN KEY",
            "solution": "(a) CHECK (e.g. CHECK (age >= 18 AND age <= 60)).",
            "markingScheme": "1 Mark for (a) CHECK."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "Can a column constrained by UNIQUE accept duplicate NULL entries in MySQL?",
            "solution": "Yes. In MySQL, multiple NULL values are permitted in a UNIQUE column because NULL is not equal to NULL.",
            "markingScheme": "1 Mark for Yes with explanation."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State the default value of a column if no explicit DEFAULT constraint is specified and the column allows NULL.",
            "solution": "NULL.",
            "markingScheme": "1 Mark for NULL."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Write a column definition for 'grade' that accepts only 'A', 'B', 'C', or 'D'.",
            "solution": "grade CHAR(1) CHECK (grade IN ('A', 'B', 'C', 'D'))",
            "markingScheme": "1 Mark for data type CHAR(1), 1 Mark for CHECK (grade IN ('A','B','C','D'))."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Find the error in: CREATE TABLE t1 (id INT NOT NULL PRIMARY KEY UNIQUE);",
            "solution": "Redundancy: Declaring both PRIMARY KEY and UNIQUE is redundant because PRIMARY KEY automatically enforces UNIQUE and NOT NULL.",
            "markingScheme": "1 Mark for identifying redundancy, 1 Mark for explaining PRIMARY KEY already implies UNIQUE and NOT NULL."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write the CREATE TABLE statement for 'VEHICLE' with constraints:\n- RegNo (Char 10, Primary Key)\n- Model (Varchar 30, Not Null)\n- Type (Varchar 15, Default 'Four Wheeler')\n- Capacity (Int, must be > 0 and <= 80)",
            "solution": "CREATE TABLE VEHICLE (\n    RegNo CHAR(10) PRIMARY KEY,\n    Model VARCHAR(30) NOT NULL,\n    Type VARCHAR(15) DEFAULT 'Four Wheeler',\n    Capacity INT CHECK (Capacity > 0 AND Capacity <= 80)\n);",
            "markingScheme": "1 Mark for RegNo and Model, 1 Mark for Type DEFAULT, 1 Mark for Capacity CHECK."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Explain what happens when an INSERT query attempts to insert a record violating a CHECK constraint.",
            "solution": "MySQL halts the insertion statement and returns an error: 'Check constraint ... is violated'. The transaction is aborted and no data is inserted, preserving database integrity.",
            "markingScheme": "1.5 Marks for statement termination / error, 1.5 Marks for preserving integrity."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Design a hospital patient registration table 'PATIENT' with:\n- PatientID: Integer, Primary Key\n- Name: Varchar 40, Not Null\n- AadharNo: Char 12, Unique and Not Null\n- Age: Integer, Check age between 0 and 125\n- BloodGroup: Varchar 5, Check blood group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')\n- AdmissionDate: Date, Default current date\nWrite the complete CREATE TABLE DDL statement.",
            "solution": "CREATE TABLE PATIENT (\n    PatientID INT PRIMARY KEY,\n    Name VARCHAR(40) NOT NULL,\n    AadharNo CHAR(12) UNIQUE NOT NULL,\n    Age INT CHECK (Age >= 0 AND Age <= 125),\n    BloodGroup VARCHAR(5) CHECK (BloodGroup IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),\n    AdmissionDate DATE DEFAULT (CURRENT_DATE)\n);",
            "markingScheme": "1 Mark for PatientID & Name, 1.5 Marks for AadharNo UNIQUE NOT NULL, 1.5 Marks for Age & BloodGroup CHECK, 1 Mark for AdmissionDate DEFAULT, 1 Mark for clean syntax."
          }
        ]
      }
    ]
  },
  {
    "setId": 5,
    "title": "Set 5: ALTER TABLE (ADD, DROP, MODIFY Columns)",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which SQL command is used to add a new column to an existing table?\n(a) UPDATE TABLE\n(b) ALTER TABLE ... ADD\n(c) INSERT COLUMN\n(d) MODIFY TABLE",
            "solution": "(b) ALTER TABLE ... ADD.",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What keyword is used with ALTER TABLE to change the data type or width of an existing column?\n(a) CHANGE\n(b) MODIFY\n(c) UPDATE\n(d) ALTER",
            "solution": "(b) MODIFY (or CHANGE).",
            "markingScheme": "1 Mark for (b) MODIFY."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "Does the ALTER TABLE command delete existing rows when adding a new column?",
            "solution": "No. Existing rows are preserved; the new column is populated with DEFAULT values or NULL.",
            "markingScheme": "1 Mark for No (existing data preserved)."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether ALTER TABLE is a DDL or DML command.",
            "solution": "DDL (Data Definition Language).",
            "markingScheme": "1 Mark for DDL."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Write an ALTER TABLE command to add a column 'email' of type VARCHAR(50) to table 'STUDENT'.",
            "solution": "ALTER TABLE STUDENT ADD email VARCHAR(50);",
            "markingScheme": "1 Mark for ALTER TABLE STUDENT ADD, 1 Mark for email VARCHAR(50);"
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "What happens if you attempt to shrink a column width from VARCHAR(50) to VARCHAR(20) when some rows contain 35-character strings?",
            "solution": "MySQL rejects the ALTER TABLE command with a 'Data truncated for column' error, preventing loss of data.",
            "markingScheme": "1 Mark for command rejection / error, 1 Mark for data truncation prevention."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Table 'PRODUCT' has columns (PID, Name, Price). Write ALTER TABLE commands to:\n1. Add column 'Category' of type VARCHAR(20) with default 'General'.\n2. Modify column 'Price' to DECIMAL(10, 2).\n3. Delete the column 'Category'.",
            "solution": "1. ALTER TABLE PRODUCT ADD Category VARCHAR(20) DEFAULT 'General';\n2. ALTER TABLE PRODUCT MODIFY Price DECIMAL(10, 2);\n3. ALTER TABLE PRODUCT DROP COLUMN Category;",
            "markingScheme": "1 Mark for ADD, 1 Mark for MODIFY, 1 Mark for DROP COLUMN."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Differentiate between ALTER TABLE and UPDATE statements in SQL.",
            "solution": "ALTER TABLE (DDL): Modifies the structural schema/definition of a table (adding/dropping/modifying columns). Affects table metadata; auto-commits.\nUPDATE (DML): Modifies specific data values within existing rows. Does not alter column structure or data types; can be rolled back in transactions.",
            "markingScheme": "1.5 Marks for ALTER TABLE schema modification, 1.5 Marks for UPDATE row values modification."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Consider an existing table 'EMPLOYEE' with columns: EmpID, Name, Dept, Salary.\nWrite SQL statements to perform the following structural alterations:\n(a) Add a new column 'MobileNo' of CHAR(10) type, ensuring it is placed after 'Name'.\n(b) Increase the size of 'Name' from VARCHAR(30) to VARCHAR(60) and make it NOT NULL.\n(c) Add a new column 'PAN' of CHAR(10) that must be UNIQUE.\n(d) Remove the column 'Dept' from the table.",
            "solution": "(a) ALTER TABLE EMPLOYEE ADD MobileNo CHAR(10) AFTER Name;\n(b) ALTER TABLE EMPLOYEE MODIFY Name VARCHAR(60) NOT NULL;\n(c) ALTER TABLE EMPLOYEE ADD PAN CHAR(10) UNIQUE;\n(d) ALTER TABLE EMPLOYEE DROP COLUMN Dept;",
            "markingScheme": "1.5 Marks for (a) ADD ... AFTER, 1.5 Marks for (b) MODIFY ... NOT NULL, 1.5 Marks for (c) ADD ... UNIQUE, 1.5 Marks for (d) DROP COLUMN."
          }
        ]
      }
    ]
  },
  {
    "setId": 6,
    "title": "Set 6: Adding & Dropping Constraints via ALTER TABLE",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What SQL statement adds a Primary Key to an existing table 'STUDENT' on column 'RollNo'?\n(a) ALTER TABLE STUDENT ADD PRIMARY KEY (RollNo);\n(b) UPDATE STUDENT SET PRIMARY KEY = RollNo;\n(c) INSERT PRIMARY KEY (RollNo) INTO STUDENT;\n(d) MODIFY STUDENT ADD KEY (RollNo);",
            "solution": "(a) ALTER TABLE STUDENT ADD PRIMARY KEY (RollNo);",
            "markingScheme": "1 Mark for (a)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What must be true about existing column data before adding a PRIMARY KEY constraint using ALTER TABLE?",
            "solution": "The column must contain zero duplicate values and zero NULL values.",
            "markingScheme": "1 Mark for no duplicate values and no NULLs."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "How do you drop the Primary Key from table 'STUDENT'?",
            "solution": "ALTER TABLE STUDENT DROP PRIMARY KEY;",
            "markingScheme": "1 Mark for ALTER TABLE STUDENT DROP PRIMARY KEY;"
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "Can a foreign key be dropped without knowing its constraint name in MySQL?",
            "solution": "No. MySQL requires the constraint identifier: ALTER TABLE child DROP FOREIGN KEY fk_name;",
            "markingScheme": "1 Mark for No (requires foreign key constraint name)."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Write an ALTER TABLE command to add a foreign key 'fk_dept' on column 'DeptNo' in table 'EMP' referencing table 'DEPT(DeptNo)'.",
            "solution": "ALTER TABLE EMP ADD CONSTRAINT fk_dept FOREIGN KEY (DeptNo) REFERENCES DEPT(DeptNo);",
            "markingScheme": "1 Mark for ALTER TABLE EMP ADD CONSTRAINT, 1 Mark for FOREIGN KEY (DeptNo) REFERENCES DEPT(DeptNo)."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Why does dropping a Primary Key fail if another table currently references it via a Foreign Key?",
            "solution": "Because dropping the parent primary key would violate referential integrity, leaving orphan foreign keys in the child table. The foreign key in the child table must be dropped first.",
            "markingScheme": "1 Mark for referential integrity violation, 1 Mark for child foreign key must be dropped first."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Table 'ITEMS' was created without any constraints: CREATE TABLE ITEMS (Code INT, Name VARCHAR(30), Price DECIMAL(8,2));\nWrite ALTER TABLE statements to:\n1. Make 'Code' the Primary Key.\n2. Add a CHECK constraint ensuring Price > 0.\n3. Make 'Name' UNIQUE.",
            "solution": "1. ALTER TABLE ITEMS ADD PRIMARY KEY (Code);\n2. ALTER TABLE ITEMS ADD CHECK (Price > 0);\n3. ALTER TABLE ITEMS ADD UNIQUE (Name);",
            "markingScheme": "1 Mark per correct ALTER TABLE statement."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Explain the difference between ALTER TABLE ... DROP PRIMARY KEY and ALTER TABLE ... DROP COLUMN col_name.",
            "solution": "DROP PRIMARY KEY: Removes the primary key constraint rule, but the column itself and all its data remain in the table.\nDROP COLUMN: Completely deletes the column and all its stored data permanently from the table schema.",
            "markingScheme": "1.5 Marks for DROP PRIMARY KEY removes rule only, 1.5 Marks for DROP COLUMN destroys column and data."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "You have two existing unconstrained tables:\nTable: CUSTOMER (CustID INT, CustName VARCHAR(40), Phone CHAR(10))\nTable: ORDERS (OrderID INT, CustID INT, Amount DECIMAL(10,2), OrderDate DATE)\nWrite SQL statements to:\n(a) Add Primary Key on CustID in CUSTOMER.\n(b) Add Primary Key on OrderID in ORDERS.\n(c) Add a Foreign Key constraint named 'fk_cust_ord' on CustID in ORDERS referencing CUSTOMER(CustID).\n(d) Add a NOT NULL constraint on CustName in CUSTOMER.",
            "solution": "(a) ALTER TABLE CUSTOMER ADD PRIMARY KEY (CustID);\n(b) ALTER TABLE ORDERS ADD PRIMARY KEY (OrderID);\n(c) ALTER TABLE ORDERS ADD CONSTRAINT fk_cust_ord FOREIGN KEY (CustID) REFERENCES CUSTOMER(CustID);\n(d) ALTER TABLE CUSTOMER MODIFY CustName VARCHAR(40) NOT NULL;",
            "markingScheme": "1.5 Marks for (a) PK on CUSTOMER, 1.5 Marks for (b) PK on ORDERS, 1.5 Marks for (c) FK on ORDERS, 1.5 Marks for (d) MODIFY CustName NOT NULL."
          }
        ]
      }
    ]
  },
  {
    "setId": 7,
    "title": "Set 7: Table Deletion: DROP TABLE vs TRUNCATE TABLE vs DELETE",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which command deletes all rows from a table while keeping the empty table structure intact for future use?\n(a) DROP TABLE\n(b) TRUNCATE TABLE\n(c) REMOVE TABLE\n(d) PURGE TABLE",
            "solution": "(b) TRUNCATE TABLE (or DELETE FROM table).",
            "markingScheme": "1 Mark for (b) TRUNCATE TABLE."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What happens to the table structure when DROP TABLE is executed?",
            "solution": "The entire table structure (schema), along with all columns, constraints, indexes, and rows, is permanently destroyed.",
            "markingScheme": "1 Mark for table structure and data permanently destroyed."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "Can TRUNCATE TABLE be filtered with a WHERE clause?\n(a) Yes\n(b) No",
            "solution": "(b) No. TRUNCATE TABLE always removes all rows; only DELETE FROM supports a WHERE clause.",
            "markingScheme": "1 Mark for (b) No."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether TRUNCATE TABLE resets AUTO_INCREMENT counters in MySQL.",
            "solution": "Yes. TRUNCATE TABLE resets AUTO_INCREMENT sequences back to 1.",
            "markingScheme": "1 Mark for Yes."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Compare TRUNCATE TABLE and DELETE FROM table on speed and execution mechanism.",
            "solution": "TRUNCATE (DDL): Drops and recreates underlying data pages, executing almost instantaneously without logging individual row deletions.\nDELETE (DML): Scans and deletes rows one by one, recording each row deletion in transaction logs, making it significantly slower for large tables.",
            "markingScheme": "1 Mark for TRUNCATE deallocates pages / high speed, 1 Mark for DELETE scans row-by-row with logging."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "What error occurs if you run 'SELECT * FROM student;' immediately after executing 'DROP TABLE student;'?",
            "solution": "ERROR 1146 (42S02): Table 'school_db.student' doesn't exist.",
            "markingScheme": "1 Mark for Table doesn't exist error, 1 Mark for explanation that schema was deleted."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Fill in the comparison table for DROP, TRUNCATE, and DELETE:\n- Command Type (DDL / DML)\n- Retains Schema? (Yes / No)\n- Supports WHERE clause? (Yes / No)",
            "solution": "1. DROP TABLE: DDL | Retains Schema: No | Supports WHERE: No\n2. TRUNCATE TABLE: DDL | Retains Schema: Yes | Supports WHERE: No\n3. DELETE FROM: DML | Retains Schema: Yes | Supports WHERE: Yes",
            "markingScheme": "1 Mark per row completed correctly (Total 3 Marks)."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Explain what happens when an administrator runs ROLLBACK after executing TRUNCATE TABLE in MySQL with default InnoDB storage.",
            "solution": "In MySQL, TRUNCATE TABLE is a DDL command. DDL operations perform an implicit COMMIT immediately before and after execution. Therefore, ROLLBACK has zero effect, and the truncated data CANNOT be undone.",
            "markingScheme": "1.5 Marks for DDL implicit auto-commit, 1.5 Marks for ROLLBACK has no effect / cannot be undone."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A company database contains a temporary logging table 'AUDIT_LOG' with 500,000 rows:\n(a) Write the SQL statement to rapidly erase all 500,000 log entries while keeping the table ready for tomorrow's logging.\n(b) Write the SQL statement to completely delete the entire table structure from the database dictionary.\n(c) If the administrator only wanted to delete log entries older than '2026-01-01', which command must be used? Write the complete statement.\n(d) Explain why TRUNCATE could not be used for requirement (c).",
            "solution": "(a) Erase all rows rapidly keeping structure:\n    TRUNCATE TABLE AUDIT_LOG;\n(b) Completely delete table structure:\n    DROP TABLE AUDIT_LOG;\n(c) Delete selective records older than date:\n    DELETE FROM AUDIT_LOG WHERE LogDate < '2026-01-01';\n(d) Why TRUNCATE cannot be used for (c):\n    TRUNCATE is a DDL command that deallocates all data pages unconditionally; it does not support a WHERE clause for selective filtering.",
            "markingScheme": "1.5 Marks for (a) TRUNCATE, 1.5 Marks for (b) DROP TABLE, 1.5 Marks for (c) DELETE with WHERE, 1.5 Marks for (d) TRUNCATE lacks WHERE clause explanation."
          }
        ]
      }
    ]
  },
  {
    "setId": 8,
    "title": "Set 8: Complex Schema Design, Constraints & Relational Modeling",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which SQL clause in CREATE TABLE specifies that a primary key automatically increments by 1 for each new row?\n(a) INCREMENT\n(b) AUTO_INCREMENT\n(c) SERIAL\n(d) SEQUENCE",
            "solution": "(b) AUTO_INCREMENT.",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "Can an AUTO_INCREMENT column be defined on a non-indexed column in MySQL?",
            "solution": "No. In MySQL, an AUTO_INCREMENT column must be defined as a key (Primary Key or Unique key).",
            "markingScheme": "1 Mark for No (must be a key/indexed)."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What is the result of executing 'USE database_name;' if the database does not exist?",
            "solution": "ERROR 1049 (42000): Unknown database 'database_name'.",
            "markingScheme": "1 Mark for Unknown database error."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether column names in MySQL are case-sensitive on Windows.",
            "solution": "No. Column names, table names, and keywords are case-insensitive on Windows MySQL systems.",
            "markingScheme": "1 Mark for case-insensitive on Windows."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Write SQL to create a table 'ACCOUNT' where AccNo is an integer that increments automatically and starts as Primary Key.",
            "solution": "CREATE TABLE ACCOUNT (\n    AccNo INT AUTO_INCREMENT PRIMARY KEY,\n    HolderName VARCHAR(40) NOT NULL,\n    Balance DECIMAL(10, 2) DEFAULT 0.0\n);",
            "markingScheme": "1 Mark for AccNo INT AUTO_INCREMENT PRIMARY KEY, 1 Mark for remaining valid column definitions."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Explain what happens if a user inserts a row omitting a column that has NOT NULL constraint but NO default value.",
            "solution": "MySQL halts the insertion statement with an error: 'Field ... doesn't have a default value', rejecting the row.",
            "markingScheme": "1 Mark for error / field doesn't have default value, 1 Mark for rejecting the insertion."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write SQL statements to create two tables:\n1. 'DEPARTMENT': DeptID (Int, PK), DeptName (Varchar 30)\n2. 'STAFF': StaffID (Int, PK), Name (Varchar 40), DeptID (Int, FK referencing DEPARTMENT with ON DELETE CASCADE)",
            "solution": "CREATE TABLE DEPARTMENT (\n    DeptID INT PRIMARY KEY,\n    DeptName VARCHAR(30) NOT NULL\n);\n\nCREATE TABLE STAFF (\n    StaffID INT PRIMARY KEY,\n    Name VARCHAR(40) NOT NULL,\n    DeptID INT,\n    FOREIGN KEY (DeptID) REFERENCES DEPARTMENT(DeptID) ON DELETE CASCADE\n);",
            "markingScheme": "1.5 Marks for DEPARTMENT table, 1.5 Marks for STAFF table with ON DELETE CASCADE."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Explain why table constraints are placed after all column definitions in a CREATE TABLE statement.",
            "solution": "Table constraints can reference multiple columns simultaneously (e.g. composite primary key or multi-column foreign key). Placing them at the end ensures that all referenced columns have already been parsed and declared.",
            "markingScheme": "1.5 Marks for referencing multiple columns, 1.5 Marks for ensuring columns are declared first."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write complete SQL DDL statements for an Online Shopping Database:\n(a) Table: CUSTOMER\n    - CustID: Int, Primary Key, Auto Increment\n    - Email: Varchar 50, Unique, Not Null\n    - FullName: Varchar 40, Not Null\n    - City: Varchar 30, Default 'Kolkata'\n(b) Table: PRODUCT\n    - ProdID: Int, Primary Key\n    - Title: Varchar 50, Not Null\n    - Price: Decimal 8,2, Check Price > 0\n    - StockQty: Int, Default 0\n(c) Table: ORDER_DETAILS\n    - OrderID: Int, Primary Key\n    - CustID: Int, Foreign Key referencing CUSTOMER\n    - ProdID: Int, Foreign Key referencing PRODUCT\n    - Quantity: Int, Check Quantity >= 1\n    - OrderDate: Date",
            "solution": "CREATE TABLE CUSTOMER (\n    CustID INT AUTO_INCREMENT PRIMARY KEY,\n    Email VARCHAR(50) UNIQUE NOT NULL,\n    FullName VARCHAR(40) NOT NULL,\n    City VARCHAR(30) DEFAULT 'Kolkata'\n);\n\nCREATE TABLE PRODUCT (\n    ProdID INT PRIMARY KEY,\n    Title VARCHAR(50) NOT NULL,\n    Price DECIMAL(8, 2) CHECK (Price > 0),\n    StockQty INT DEFAULT 0\n);\n\nCREATE TABLE ORDER_DETAILS (\n    OrderID INT PRIMARY KEY,\n    CustID INT,\n    ProdID INT,\n    Quantity INT CHECK (Quantity >= 1),\n    OrderDate DATE,\n    FOREIGN KEY (CustID) REFERENCES CUSTOMER(CustID),\n    FOREIGN KEY (ProdID) REFERENCES PRODUCT(ProdID)\n);",
            "markingScheme": "2 Marks for CUSTOMER table, 2 Marks for PRODUCT table, 2 Marks for ORDER_DETAILS table with two foreign keys."
          }
        ]
      }
    ]
  },
  {
    "setId": 9,
    "title": "Set 9: Schema Inspection, Metadata & Error Troubleshooting",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which SQL command lists all the columns and their constraints in table 'EMPLOYEE'?\n(a) SHOW COLUMNS FROM EMPLOYEE;\n(b) DESCRIBE EMPLOYEE;\n(c) Both (a) and (b)\n(d) SELECT COLUMNS FROM EMPLOYEE;",
            "solution": "(c) Both (a) and (b). Both SHOW COLUMNS FROM and DESCRIBE output table metadata.",
            "markingScheme": "1 Mark for (c)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What does the 'Key' column showing 'PRI' in DESCRIBE output indicate?",
            "solution": "The column is the Primary Key of the table.",
            "markingScheme": "1 Mark for Primary Key."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What command renames an existing table 'OLD_NAME' to 'NEW_NAME'?\n(a) RENAME TABLE OLD_NAME TO NEW_NAME;\n(b) ALTER TABLE OLD_NAME RENAME TO NEW_NAME;\n(c) Both (a) and (b)\n(d) UPDATE TABLE NAME;",
            "solution": "(c) Both (a) and (b). Both statements are valid in MySQL.",
            "markingScheme": "1 Mark for (c)."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether SHOW TABLES displays the number of rows stored in each table.",
            "solution": "No. SHOW TABLES displays only the names of the tables, not the row counts.",
            "markingScheme": "1 Mark for No (only table names displayed)."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Predict the output of: DESCRIBE student;\nAssume student was created with: roll INT PRIMARY KEY, name VARCHAR(30) NOT NULL.",
            "solution": "Field | Type        | Null | Key | Default | Extra\nroll  | int(11)     | NO   | PRI | NULL    | \nname  | varchar(30) | NO   |     | NULL    | ",
            "markingScheme": "1 Mark for roll as PRI and NO null, 1 Mark for name as NO null."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Why should we use IF EXISTS when executing DROP TABLE or DROP DATABASE?",
            "solution": "Using IF EXISTS prevents the database server from throwing a fatal runtime error and halting the execution script if the table or database does not exist.",
            "markingScheme": "1 Mark for prevents fatal error if object missing, 1 Mark for script continuity."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Identify and correct all errors in the following SQL script:\nCREATE DATABASES school;\nUSE school;\nCREATE TABLE student (\n    rno INT PRIMARY KEY,\n    name VARCHAR(30)\n    marks INT CHECK marks >= 0\n);",
            "solution": "Errors & Corrections:\n1. 'CREATE DATABASES' -> syntax error, must be singular: CREATE DATABASE school;\n2. In table definition, missing comma after 'name VARCHAR(30)'.\n3. In CHECK condition, condition must be enclosed in parentheses: CHECK (marks >= 0).\nCorrected:\nCREATE DATABASE school;\nUSE school;\nCREATE TABLE student (\n    rno INT PRIMARY KEY,\n    name VARCHAR(30),\n    marks INT CHECK (marks >= 0)\n);",
            "markingScheme": "1 Mark for singular DATABASE, 1 Mark for missing comma, 1 Mark for CHECK condition parentheses."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Explain the difference between CHAR(20) and VARCHAR(20) when comparing search performance.",
            "solution": "CHAR(20) has fixed 20-byte record offsets, enabling the storage engine to compute exact physical disk offsets quickly for faster retrieval. VARCHAR(20) has variable byte lengths with length-prefix bytes, requiring parsing overhead, though it saves significant disk space.",
            "markingScheme": "1.5 Marks for CHAR fixed offset speed, 1.5 Marks for VARCHAR variable length parsing vs storage savings."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A company has an existing table 'EMPLOYEE(EmpID, Name, Salary)'.\nWrite SQL commands to:\n(a) View the schema and constraint details of 'EMPLOYEE'.\n(b) Add a new column 'Commission' of DECIMAL(7, 2) defaulting to 0.0.\n(c) Change the data type of 'EmpID' to CHAR(5).\n(d) Add a UNIQUE constraint on column 'Name'.\n(e) Rename the table to 'STAFF_MEMBERS'.\n(f) Empty all rows from 'STAFF_MEMBERS' without dropping the schema.",
            "solution": "(a) DESC EMPLOYEE; (or DESCRIBE EMPLOYEE;)\n(b) ALTER TABLE EMPLOYEE ADD Commission DECIMAL(7, 2) DEFAULT 0.0;\n(c) ALTER TABLE EMPLOYEE MODIFY EmpID CHAR(5);\n(d) ALTER TABLE EMPLOYEE ADD UNIQUE (Name);\n(e) RENAME TABLE EMPLOYEE TO STAFF_MEMBERS; (or ALTER TABLE EMPLOYEE RENAME TO STAFF_MEMBERS;)\n(f) TRUNCATE TABLE STAFF_MEMBERS;",
            "markingScheme": "1 Mark per correct SQL statement (a to f, Total 6 Marks)."
          }
        ]
      }
    ]
  },
  {
    "setId": 10,
    "title": "Set 10: Complete SQL DDL & Table Constraints Board Mastery",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which of the following commands CANNOT be rolled back using the ROLLBACK statement in MySQL?\n(a) INSERT\n(b) UPDATE\n(c) DELETE\n(d) ALTER TABLE",
            "solution": "(d) ALTER TABLE. DDL commands auto-commit immediately and cannot be rolled back.",
            "markingScheme": "1 Mark for (d) ALTER TABLE."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What constraint combines the functionality of both NOT NULL and UNIQUE?\n(a) CHECK\n(b) PRIMARY KEY\n(c) DEFAULT\n(d) FOREIGN KEY",
            "solution": "(b) PRIMARY KEY.",
            "markingScheme": "1 Mark for (b) PRIMARY KEY."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What is the result of TRUNCATE TABLE student followed by DESCRIBE student?",
            "solution": "The empty table structure (columns, data types, constraints) is displayed intact; only rows were erased.",
            "markingScheme": "1 Mark for table structure displayed intact."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether a database can be dropped while other users are connected to it in MySQL.",
            "solution": "Yes. In MySQL, DROP DATABASE drops the database regardless of connected users (with appropriate DBA privileges).",
            "markingScheme": "1 Mark for Yes."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Differentiate between DROP TABLE and DROP DATABASE.",
            "solution": "DROP TABLE: Deletes a single specific table, its schema, indexes, and data from within a database.\nDROP DATABASE: Deletes the entire database container along with all tables, views, stored procedures, and data housed inside it.",
            "markingScheme": "1 Mark for DROP TABLE deletes one table, 1 Mark for DROP DATABASE deletes entire container and all tables."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Write SQL statements to create database 'sports_db', switch to it, and display all tables in it.",
            "solution": "CREATE DATABASE sports_db;\nUSE sports_db;\nSHOW TABLES;",
            "markingScheme": "1 Mark for CREATE and USE, 1 Mark for SHOW TABLES."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write SQL DDL commands to:\n1. Create table 'CLUB' with ClubID (Int, PK), ClubName (Varchar 30, Not Null).\n2. Alter table 'CLUB' to add column 'Head' of Varchar 30.\n3. Drop table 'CLUB' permanently.",
            "solution": "1. CREATE TABLE CLUB (ClubID INT PRIMARY KEY, ClubName VARCHAR(30) NOT NULL);\n2. ALTER TABLE CLUB ADD Head VARCHAR(30);\n3. DROP TABLE CLUB;",
            "markingScheme": "1 Mark for CREATE, 1 Mark for ALTER ADD, 1 Mark for DROP TABLE."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Explain why Foreign Keys must reference a column that is defined as PRIMARY KEY or UNIQUE in the parent table.",
            "solution": "A foreign key establishes a deterministic reference to an unambiguous entity record. If the parent column allowed duplicates, the foreign key could not determine which specific parent row it was referencing, destroying referential consistency.",
            "markingScheme": "1.5 Marks for deterministic entity reference, 1.5 Marks for duplicate prevention ensuring unambiguous parent matching."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "MASTER CBSE EXAMINATION QUESTION:\nWrite SQL DDL statements for a university examination database:\n(a) Create table 'COURSE':\n    - CourseID: Char(5), Primary Key\n    - CourseName: Varchar(40), Not Null\n    - Credits: Int, Check Credits BETWEEN 1 AND 6\n    - Fee: Decimal(8, 2), Check Fee >= 0\n(b) Create table 'STUDENT':\n    - RegNo: Int, Primary Key\n    - SName: Varchar(40), Not Null\n    - CourseID: Char(5), Foreign Key referencing COURSE(CourseID)\n    - AdmissionDate: Date, Default current date\n(c) After creating the tables, write ALTER TABLE statements to:\n    1. Add column 'Email' (Varchar 60, Unique) to 'STUDENT'.\n    2. Increase size of 'CourseName' in 'COURSE' to Varchar(60).\n    3. Remove all rows from 'STUDENT' while keeping the table structure intact.",
            "solution": "(a) CREATE TABLE COURSE (\n    CourseID CHAR(5) PRIMARY KEY,\n    CourseName VARCHAR(40) NOT NULL,\n    Credits INT CHECK (Credits BETWEEN 1 AND 6),\n    Fee DECIMAL(8, 2) CHECK (Fee >= 0)\n);\n\n(b) CREATE TABLE STUDENT (\n    RegNo INT PRIMARY KEY,\n    SName VARCHAR(40) NOT NULL,\n    CourseID CHAR(5),\n    AdmissionDate DATE DEFAULT (CURRENT_DATE),\n    FOREIGN KEY (CourseID) REFERENCES COURSE(CourseID)\n);\n\n(c) ALTER & CLEANUP COMMANDS:\n    1. ALTER TABLE STUDENT ADD Email VARCHAR(60) UNIQUE;\n    2. ALTER TABLE COURSE MODIFY CourseName VARCHAR(60);\n    3. TRUNCATE TABLE STUDENT;",
            "markingScheme": "2 Marks for (a) COURSE table with constraints, 2 Marks for (b) STUDENT table with FK & DEFAULT, 2 Marks for (c) three ALTER & TRUNCATE commands."
          }
        ]
      }
    ]
  }
];
