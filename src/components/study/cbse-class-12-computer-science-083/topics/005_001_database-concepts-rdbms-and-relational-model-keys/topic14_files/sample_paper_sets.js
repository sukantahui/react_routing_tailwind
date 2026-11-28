export const samplePaperSets = [
  {
    "setId": 1,
    "title": "Set 1: DBMS vs File Systems & Relational Terminology",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "In relational database terminology, what is a row in a table called?\n(a) Attribute\n(b) Tuple\n(c) Domain\n(d) Degree",
            "solution": "(b) Tuple. Each row in a relation represents a single entity record.",
            "markingScheme": "1 Mark for (b) Tuple."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What does the 'Degree' of a relation represent?",
            "solution": "The total number of attributes (columns) present in the relation.",
            "markingScheme": "1 Mark for total number of attributes (columns)."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What does the 'Cardinality' of a relation represent?",
            "solution": "The total number of tuples (rows) present in the relation.",
            "markingScheme": "1 Mark for total number of tuples (rows)."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether a Primary Key attribute in a relation can accept NULL values.",
            "solution": "No. Under the Entity Integrity Constraint, a Primary Key must be unique and cannot be NULL.",
            "markingScheme": "1 Mark for No (Entity Integrity Constraint prohibits NULLs)."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "State two major limitations of traditional file processing systems that are solved by a DBMS.",
            "solution": "1. Data Redundancy: Duplicate data stored across multiple independent files, leading to wasted storage and data inconsistency.\n2. Data Inconsistency: Updating data in one file leaves outdated copies in other files. DBMS centralizes data, enforcing consistency.",
            "markingScheme": "1 Mark for Data Redundancy, 1 Mark for Data Inconsistency."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "If a table 'STUDENT' has 6 attributes and 45 rows, what is its Degree and Cardinality?",
            "solution": "- Degree = 6 (number of attributes/columns)\n- Cardinality = 45 (number of tuples/rows)",
            "markingScheme": "1 Mark for Degree = 6, 1 Mark for Cardinality = 45."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Differentiate between Candidate Key, Primary Key, and Alternate Key with an example table.",
            "solution": "Consider table EMPLOYEE(EmpID, AadharNo, Name, Dept):\n1. Candidate Keys: Minimal set of attributes that uniquely identify a tuple. Both 'EmpID' and 'AadharNo' are Candidate Keys.\n2. Primary Key: The specific candidate key chosen by the database designer as the principal unique identifier (e.g. 'EmpID').\n3. Alternate Key: Any candidate key that was NOT selected as the primary key (e.g. 'AadharNo').",
            "markingScheme": "1 Mark for Candidate Key, 1 Mark for Primary Key, 1 Mark for Alternate Key with example."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Explain the concept of 'Domain' in the relational data model with an example.",
            "solution": "A Domain is the pool or set of all permissible atomic values from which an attribute can draw its actual values.\nExample: For an attribute 'Gender', the domain may be {'M', 'F', 'O'}. For an attribute 'Percentage', the domain is real numbers in the range 0.0 to 100.0. Assigning a value outside this domain violates domain integrity.",
            "markingScheme": "1.5 Marks for definition (pool of permissible atomic values), 1.5 Marks for clear practical example."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Consider the following two relational tables in a school database:\nTable: TEACHER (TID, Name, Dept, Salary, JoinDate)\nTable: SUBJECT (SubCode, SubName, TID)\n(a) Identify the Primary Key for table TEACHER.\n(b) Identify the Foreign Key in table SUBJECT. Name the referenced table and primary key.\n(c) Explain what happens if an administrator tries to insert a row into SUBJECT with TID = 'T99' when no such TID exists in table TEACHER. Which integrity constraint is enforced?\n(d) If table TEACHER has 5 rows and SUBJECT has 8 rows, find the Degree and Cardinality of the Cartesian Product (TEACHER x SUBJECT).",
            "solution": "(a) Primary Key of TEACHER: TID (Teacher ID).\n(b) Foreign Key in SUBJECT: TID. It references the Primary Key 'TID' in table TEACHER.\n(c) Referential Integrity Violation: The database management system will reject the insertion with a foreign key constraint violation error because every non-null foreign key value must exist as a primary key in the referenced parent table.\n(d) Cartesian Product (TEACHER x SUBJECT):\n    - Degree = Degree(TEACHER) + Degree(SUBJECT) = 5 + 3 = 8 attributes.\n    - Cardinality = Cardinality(TEACHER) * Cardinality(SUBJECT) = 5 * 8 = 40 tuples.",
            "markingScheme": "1 Mark for (a) TID primary key, 1.5 Marks for (b) TID foreign key referencing TEACHER, 1.5 Marks for (c) Referential integrity constraint violation, 2 Marks for (d) Degree = 8 and Cardinality = 40."
          }
        ]
      }
    ]
  },
  {
    "setId": 2,
    "title": "Set 2: Relational Keys (Primary, Foreign, Candidate, Alternate)",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What is an attribute whose value is derived from a primary key of another table called?\n(a) Alternate Key\n(b) Foreign Key\n(c) Composite Key\n(d) Super Key",
            "solution": "(b) Foreign Key.",
            "markingScheme": "1 Mark for (b) Foreign Key."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "Can a table have multiple Foreign Keys referencing different parent tables?",
            "solution": "Yes. A table can have multiple foreign keys referencing multiple tables.",
            "markingScheme": "1 Mark for Yes."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "Can a Foreign Key attribute accept NULL values?",
            "solution": "Yes, unless explicitly restricted with a NOT NULL constraint.",
            "markingScheme": "1 Mark for Yes."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "How many Primary Keys can a relational table have?\n(a) Exactly 1\n(b) Up to 2\n(c) Unlimited\n(d) Depends on number of rows",
            "solution": "(a) Exactly 1 (though it can be a composite primary key consisting of multiple attributes).",
            "markingScheme": "1 Mark for (a) Exactly 1."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "What is a Composite Primary Key? Give an example.",
            "solution": "A Composite Primary Key is a primary key that consists of two or more attributes combined together to uniquely identify a tuple when no single attribute is unique.\nExample: In table ENROLLMENT(RollNo, CourseID, Semester), the combination (RollNo, CourseID) forms a composite primary key.",
            "markingScheme": "1 Mark for definition (two or more attributes combined), 1 Mark for valid example."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Explain the Entity Integrity Constraint.",
            "solution": "The Entity Integrity Constraint states that no primary key attribute value can be NULL because a null value cannot uniquely identify an entity tuple.",
            "markingScheme": "1 Mark for primary key cannot be NULL, 1 Mark for ensuring every tuple is uniquely identifiable."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Given table ITEM (ItemNo, Name, Category, Price, SupplierID):\nIf ItemNo is unique, SupplierID references SUPPLIER table, and Name is also guaranteed unique:\n1. Identify Candidate Keys\n2. Suggest the Primary Key\n3. Identify the Alternate Key\n4. Identify the Foreign Key",
            "solution": "1. Candidate Keys: ItemNo, Name\n2. Primary Key: ItemNo (standard concise numeric identifier)\n3. Alternate Key: Name\n4. Foreign Key: SupplierID (references SUPPLIER table)",
            "markingScheme": "0.75 Marks per correctly identified key (Total 3 Marks)."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Explain the Referential Integrity Constraint with respect to deleting rows from a parent table.",
            "solution": "Referential integrity requires that foreign key references remain valid. If a user tries to delete a record from the parent table whose primary key is currently referenced by child records in another table:\n- The DBMS will reject the deletion by default (RESTRICT / NO ACTION).\n- Or, if configured, it will delete matching child rows (CASCADE) or set foreign keys to NULL (SET NULL).",
            "markingScheme": "1.5 Marks for foreign key reference validity, 1.5 Marks for deletion rejection / cascade behavior."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Consider two tables in an automobile rental database:\nTable: CUSTOMER (CustID, Name, Phone, LicenseNo)\nTable: BOOKING (BookingID, CustID, CarNo, StartDate, EndDate, Amount)\n(a) Identify the Candidate Keys of table CUSTOMER.\n(b) Choose the most suitable Primary Key for CUSTOMER. Justify your choice.\n(c) Name the Foreign Key in table BOOKING. State its parent table and referenced column.\n(d) Can a customer exist in table CUSTOMER without having any entry in table BOOKING? Explain why or why not.",
            "solution": "(a) Candidate Keys of CUSTOMER: CustID and LicenseNo (both uniquely identify an individual).\n(b) Primary Key: CustID. Justification: A concise, standardized numeric/alphanumeric code is preferable over variable format license numbers and avoids privacy exposures.\n(c) Foreign Key in BOOKING: CustID. Parent Table: CUSTOMER; Referenced Column: CustID.\n(d) Yes. A customer can be registered in table CUSTOMER without having made any bookings yet. The parent table does not depend on child records; foreign key relationships require only that bookings reference valid customers.",
            "markingScheme": "1.5 Marks for (a) CustID & LicenseNo, 1.5 Marks for (b) CustID with justification, 1.5 Marks for (c) CustID referencing CUSTOMER, 1.5 Marks for (d) Yes with parent-child relationship explanation."
          }
        ]
      }
    ]
  },
  {
    "setId": 3,
    "title": "Set 3: Relational Algebra (Selection, Projection, Cartesian Product)",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which relational algebra operation performs a horizontal filtering of tuples based on a condition?\n(a) Projection\n(b) Selection\n(c) Cartesian Product\n(d) Join",
            "solution": "(b) Selection (denoted by Greek letter sigma).",
            "markingScheme": "1 Mark for (b) Selection."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "Which relational algebra operation performs a vertical filtering of specific columns?\n(a) Selection\n(b) Projection\n(c) Union\n(d) Intersection",
            "solution": "(b) Projection (denoted by Greek letter pi).",
            "markingScheme": "1 Mark for (b) Projection."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "If relation R has degree 4 and cardinality 10, and relation S has degree 3 and cardinality 5, what is the degree and cardinality of R x S (Cartesian Product)?\n(a) Degree 7, Cardinality 50\n(b) Degree 12, Cardinality 15\n(c) Degree 7, Cardinality 15\n(d) Degree 1, Cardinality 2",
            "solution": "(a) Degree 7, Cardinality 50. Degree = 4 + 3 = 7; Cardinality = 10 * 5 = 50.",
            "markingScheme": "1 Mark for (a) Degree 7, Cardinality 50."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "Does the Projection operation eliminate duplicate tuples in pure relational algebra?",
            "solution": "Yes. In formal relational algebra, relations are mathematical sets, so Projection automatically eliminates duplicate rows.",
            "markingScheme": "1 Mark for Yes (eliminates duplicate rows in relational algebra)."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Differentiate between Selection and Projection in relational algebra.",
            "solution": "Selection (sigma): Filters rows horizontally based on a boolean condition; degree of result is unchanged, cardinality is <= original. Projection (pi): Filters columns vertically; degree of result equals specified columns, cardinality is <= original (duplicates eliminated).",
            "markingScheme": "1 Mark for Selection (horizontal row filtering), 1 Mark for Projection (vertical column filtering)."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "What is Union Compatibility in relational algebra?",
            "solution": "Two relations are Union Compatible if:\n1. They have the exact same degree (number of attributes).\n2. Corresponding attributes in order have identical or compatible data types/domains.",
            "markingScheme": "1 Mark for same degree, 1 Mark for compatible attribute domains."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write relational algebra expressions for the table STUDENT(RollNo, Name, Stream, Marks):\n1. Display all students who scored Marks >= 90.\n2. Display only the Name and Stream of all students.\n3. Display the Names of students in the 'Science' stream.",
            "solution": "1. sigma_{Marks >= 90}(STUDENT)\n2. pi_{Name, Stream}(STUDENT)\n3. pi_{Name}(sigma_{Stream = 'Science'}(STUDENT))",
            "markingScheme": "1 Mark for sigma expression, 1 Mark for pi expression, 1 Mark for composed pi(sigma) expression."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Explain the Cartesian Product operation (R x S) and why an unconditional Cartesian product is rarely used directly in production databases.",
            "solution": "Cartesian Product combines every single tuple of relation R with every single tuple of relation S, producing all possible cross-combinations.\nIt is rarely used directly because it generates massive, mostly meaningless combinations (cardinality = c1 * c2) that waste memory. Instead, meaningful Equi-Joins with matching key conditions are used.",
            "markingScheme": "1.5 Marks for cross-combination definition, 1.5 Marks for explanation of massive size and need for join condition."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Consider two relations:\nTable: PRODUCT (PID, PName, Category, UnitPrice)\nTable: SALES (SaleID, PID, UnitsSold, SaleDate)\nPRODUCT has 10 rows and 4 columns. SALES has 50 rows and 4 columns.\n(a) What will be the Degree and Cardinality of PRODUCT x SALES?\n(b) Write a relational algebra expression to retrieve the PName and UnitPrice of all products in the 'Electronics' category.\n(c) Write a relational algebra expression to retrieve all sales records where UnitsSold > 100.\n(d) Explain how an Equi-Join can be formulated using Cartesian Product and Selection.",
            "solution": "(a) Degree and Cardinality of PRODUCT x SALES:\n    - Degree = 4 + 4 = 8 columns\n    - Cardinality = 10 * 50 = 500 rows\n(b) Relational Algebra for Electronics:\n    pi_{PName, UnitPrice}(sigma_{Category = 'Electronics'}(PRODUCT))\n(c) Relational Algebra for Sales > 100:\n    sigma_{UnitsSold > 100}(SALES)\n(d) Equi-Join Formulation:\n    An Equi-Join is formulated by applying a Selection condition on the Cartesian Product matching the common key:\n    PRODUCT |><|_{PRODUCT.PID = SALES.PID} SALES = sigma_{PRODUCT.PID = SALES.PID}(PRODUCT x SALES).",
            "markingScheme": "1.5 Marks for (a) Degree 8, Cardinality 500, 1.5 Marks for (b) pi(sigma) expression, 1.5 Marks for (c) sigma expression, 1.5 Marks for (d) Equi-join = sigma(R x S) formulation."
          }
        ]
      }
    ]
  },
  {
    "setId": 4,
    "title": "Set 4: Integrity Constraints (Domain, Entity, Referential)",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which integrity constraint ensures that values in a column conform to defined data types, ranges, or formats?\n(a) Domain Integrity\n(b) Entity Integrity\n(c) Referential Integrity\n(d) User Integrity",
            "solution": "(a) Domain Integrity.",
            "markingScheme": "1 Mark for (a) Domain Integrity."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What does 'NULL' represent in relational databases?\n(a) Zero (0)\n(b) Empty string (\"\")\n(c) Missing, unknown, or not applicable value\n(d) Space character",
            "solution": "(c) Missing, unknown, or not applicable value.",
            "markingScheme": "1 Mark for (c)."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "True or False: NULL is equal to NULL in SQL logic (NULL = NULL evaluates to True).",
            "solution": "False. In three-valued relational logic, NULL = NULL evaluates to UNKNOWN.",
            "markingScheme": "1 Mark for False."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "Which constraint enforces that every row in a table is uniquely identifiable and the primary key has no missing values?",
            "solution": "Entity Integrity Constraint.",
            "markingScheme": "1 Mark for Entity Integrity Constraint."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Explain why a phone number or postal code column is typically defined as VARCHAR rather than an integer data type.",
            "solution": "1. Phone numbers and PIN codes can have leading zeroes (e.g. 011, 0091) which numeric integer fields strip automatically.\n2. No arithmetic operations (addition, multiplication) are ever performed on them.\n3. They may contain hyphens, plus signs, or formatting symbols (e.g., +91-9876543210).",
            "markingScheme": "1 Mark for preserving leading zeros, 1 Mark for absence of arithmetic operations / special characters."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "What is an 'Orphan Record' in relational databases?",
            "solution": "An orphan record is a record in a child table whose foreign key value points to a non-existent primary key in the parent table (caused by lack of referential integrity enforcement).",
            "markingScheme": "1 Mark for record in child table pointing to non-existent parent key, 1 Mark for consequence of broken referential integrity."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "A table 'ACCOUNT' has attributes (AccNo, HolderName, Balance, OpenDate):\n1. Identify the Entity Integrity rule for this table.\n2. State a Domain Integrity rule for 'Balance'.\n3. Explain what happens if Balance is inserted as -500 when Balance >= 0 is enforced.",
            "solution": "1. Entity Integrity: AccNo must be unique and cannot be NULL.\n2. Domain Integrity: Balance must be a numeric decimal value >= 0 (non-negative).\n3. If Balance = -500 is inserted: The DBMS will reject the transaction with a CHECK constraint / Domain integrity violation error.",
            "markingScheme": "1 Mark for Entity integrity, 1 Mark for Domain integrity rule, 1 Mark for DBMS rejection / violation error."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Differentiate between NOT NULL and UNIQUE constraints in a relational table.",
            "solution": "NOT NULL: Ensures that every tuple MUST have an explicit value for that column; empty/NULL values are prohibited. UNIQUE: Ensures that all non-null values in the column are distinct and duplicate values are rejected, but multiple NULL values may be permitted.",
            "markingScheme": "1.5 Marks for NOT NULL explanation, 1.5 Marks for UNIQUE explanation (distinct values, allows nulls)."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "An e-commerce company maintains two tables:\nTable: USERS (UserID, Email, Password, City)\nTable: ORDERS (OrderID, UserID, OrderDate, TotalAmount, Status)\n(a) State the primary key for both tables.\n(b) If Email must also be unique across all users, what type of key is Email in USERS?\n(c) Name the foreign key in table ORDERS and describe its referential relationship.\n(d) A customer closes their account and the admin deletes their UserID from USERS. What happens to the customer's previous orders in ORDERS under:\n    - ON DELETE CASCADE\n    - ON DELETE RESTRICT",
            "solution": "(a) Primary Keys: UserID in USERS; OrderID in ORDERS.\n(b) Email Key Type: Alternate Key (or Candidate Key).\n(c) Foreign Key: UserID in table ORDERS. It references the Primary Key 'UserID' in table USERS.\n(d) Deletion Actions:\n    - ON DELETE CASCADE: When UserID is deleted from USERS, all corresponding order records belonging to that user in ORDERS are automatically deleted simultaneously.\n    - ON DELETE RESTRICT: The DBMS blocks and rejects the deletion of the UserID from USERS as long as there are existing order records referencing that UserID in ORDERS.",
            "markingScheme": "1.5 Marks for (a) primary keys, 1 Mark for (b) Alternate Key, 1.5 Marks for (c) Foreign key relationship, 2 Marks for (d) Cascade (auto deletes child rows) vs Restrict (blocks deletion)."
          }
        ]
      }
    ]
  },
  {
    "setId": 5,
    "title": "Set 5: Degrees, Cardinalities & Mathematical Cross Products",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What is the degree of an empty relation that has 5 attributes defined but 0 rows?\n(a) 0\n(b) 5\n(c) NULL\n(d) 1",
            "solution": "(b) 5. Degree is the count of attributes (columns), which is 5 regardless of row count.",
            "markingScheme": "1 Mark for (b) 5."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What is the cardinality of an empty relation with 5 attributes and 0 rows?",
            "solution": "0 (cardinality is the count of tuples/rows).",
            "markingScheme": "1 Mark for 0."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "If relation A has cardinality 20 and relation B has cardinality 0, what is the cardinality of A x B?\n(a) 20\n(b) 0\n(c) NULL\n(d) 1",
            "solution": "(b) 0 (20 * 0 = 0).",
            "markingScheme": "1 Mark for (b) 0."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "Can two relations with different degrees undergo Cartesian Product?",
            "solution": "Yes. Cartesian Product is defined between any two relations regardless of degrees.",
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
            "question": "Table FLIGHTS has columns (FNo, Source, Dest, Fare) and 12 rows. Table CREW has columns (EmpID, FNo, Name) and 30 rows. Calculate:\n1. Degree of FLIGHTS x CREW\n2. Cardinality of FLIGHTS x CREW",
            "solution": "1. Degree = 4 + 3 = 7\n2. Cardinality = 12 * 30 = 360",
            "markingScheme": "1 Mark for Degree = 7, 1 Mark for Cardinality = 360."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Explain what happens to the degree and cardinality of a table when 3 new columns and 10 new rows are added.",
            "solution": "The Degree increases by 3 (Degree_new = Degree_old + 3). The Cardinality increases by 10 (Cardinality_new = Cardinality_old + 10).",
            "markingScheme": "1 Mark for Degree increases by 3, 1 Mark for Cardinality increases by 10."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "A relation 'EMPLOYEE' has 8 columns and 200 rows. A database query performs:\n1. Projection of 3 columns\n2. Selection of rows where Salary > 50000 (which matches 40 rows)\nState the Degree and Cardinality of the final query result relation.",
            "solution": "- Degree = 3 (since Projection selected exactly 3 columns).\n- Cardinality = 40 (since Selection filtered down to the 40 qualifying rows, assuming unique projection or SQL all). In pure relational algebra without duplicates, cardinality <= 40.",
            "markingScheme": "1.5 Marks for Degree = 3, 1.5 Marks for Cardinality = 40."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Explain why relational tables are called 'relations' in computer science.",
            "solution": "In mathematics, a relation is defined as a subset of the Cartesian product of a list of domains. In RDBMS, every table is a mathematical relation where each row represents an n-tuple asserting a relationship between attribute values.",
            "markingScheme": "1.5 Marks for mathematical subset of Cartesian product, 1.5 Marks for row representing n-tuple relationship."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Consider three relations in a university:\nTable: STUDENT (RollNo, Name, DeptID) -> 1200 rows, 3 columns\nTable: DEPARTMENT (DeptID, DeptName, HOD) -> 8 rows, 3 columns\nTable: FACULTY (FID, Name, DeptID, Salary) -> 50 rows, 4 columns\n(a) Find Degree and Cardinality of (STUDENT x DEPARTMENT).\n(b) Find Degree and Cardinality of (DEPARTMENT x FACULTY).\n(c) Formulate the relational algebra expression for an Equi-Join between STUDENT and DEPARTMENT on DeptID.\n(d) In the Equi-Join result, what will be the resulting Cardinality if every student belongs to exactly one valid department?",
            "solution": "(a) STUDENT x DEPARTMENT:\n    - Degree = 3 + 3 = 6 columns\n    - Cardinality = 1200 * 8 = 9,600 rows\n(b) DEPARTMENT x FACULTY:\n    - Degree = 3 + 4 = 7 columns\n    - Cardinality = 8 * 50 = 400 rows\n(c) Relational Algebra Equi-Join:\n    sigma_{STUDENT.DeptID = DEPARTMENT.DeptID}(STUDENT x DEPARTMENT)\n    or STUDENT |><|_{STUDENT.DeptID = DEPARTMENT.DeptID} DEPARTMENT\n(d) Resulting Equi-Join Cardinality:\n    Since each of the 1200 students maps to exactly one department, the Equi-Join will contain exactly 1,200 rows.",
            "markingScheme": "1.5 Marks for (a) Degree 6, Cardinality 9600, 1.5 Marks for (b) Degree 7, Cardinality 400, 1.5 Marks for (c) Equi-join expression, 1.5 Marks for (d) Cardinality = 1200."
          }
        ]
      }
    ]
  },
  {
    "setId": 6,
    "title": "Set 6: Relational Algebra Set Operations (Union, Intersection, Minus)",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which set operation combines tuples from two union-compatible relations, eliminating duplicates?\n(a) Union (U)\n(b) Cartesian Product (x)\n(c) Difference (-)\n(d) Projection (pi)",
            "solution": "(a) Union (U).",
            "markingScheme": "1 Mark for (a) Union."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "Which operation returns only those tuples that appear in BOTH relation A and relation B?\n(a) Union\n(b) Intersection\n(c) Difference\n(d) Join",
            "solution": "(b) Intersection (cap).",
            "markingScheme": "1 Mark for (b) Intersection."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What does A - B (Set Difference) produce in relational algebra?",
            "solution": "Tuples that exist in relation A but do NOT exist in relation B.",
            "markingScheme": "1 Mark for tuples in A but not in B."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether A - B is equal to B - A in relational algebra.",
            "solution": "No. Set difference is non-commutative (A - B != B - A).",
            "markingScheme": "1 Mark for No (non-commutative)."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Let A = {10, 20, 30} and B = {20, 30, 40}. Find:\n1. A U B\n2. A - B",
            "solution": "1. A U B = {10, 20, 30, 40}\n2. A - B = {10}",
            "markingScheme": "1 Mark for A U B, 1 Mark for A - B."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Why must relations be union-compatible before applying Union, Intersection, or Set Difference?",
            "solution": "Because set operations combine or compare tuples element-wise. If degrees differ or column data types are incompatible, the resulting tuple would have mismatched attributes and invalid domains.",
            "markingScheme": "1 Mark for element-wise comparison, 1 Mark for preventing mismatched attributes/domains."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Two tables CRICKET_TEAM and FOOTBALL_TEAM both have a single attribute (PlayerName):\nCRICKET_TEAM has: 'Rohit', 'Virat', 'Rahul', 'Pant'\nFOOTBALL_TEAM has: 'Sunil', 'Rahul', 'Gurpreet', 'Virat'\nFind:\n1. CRICKET_TEAM U FOOTBALL_TEAM\n2. CRICKET_TEAM cap FOOTBALL_TEAM\n3. CRICKET_TEAM - FOOTBALL_TEAM",
            "solution": "1. Union (U): {'Rohit', 'Virat', 'Rahul', 'Pant', 'Sunil', 'Gurpreet'}\n2. Intersection (cap): {'Virat', 'Rahul'}\n3. Difference (-): {'Rohit', 'Pant'}",
            "markingScheme": "1 Mark for Union, 1 Mark for Intersection, 1 Mark for Difference."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Can Set Intersection (A cap B) be expressed using Set Difference (-)? Show the algebraic equivalence.",
            "solution": "Yes. A cap B = A - (A - B).\nExplanation: (A - B) represents elements exclusive to A. Subtracting these exclusive elements from A leaves only the common elements present in both A and B.",
            "markingScheme": "1.5 Marks for equivalence formula A - (A - B), 1.5 Marks for set theory explanation."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A company has two project teams:\nTable TEAM_ALPHA (EmpID, Name, Role)\nTable TEAM_BETA (EmpID, Name, Role)\nTEAM_ALPHA has 15 employees. TEAM_BETA has 20 employees. Exactly 5 employees work on both teams.\n(a) Verify whether TEAM_ALPHA and TEAM_BETA are union-compatible. Justify.\n(b) What will be the Cardinality of (TEAM_ALPHA U TEAM_BETA)?\n(c) What will be the Cardinality of (TEAM_ALPHA cap TEAM_BETA)?\n(d) What will be the Cardinality of (TEAM_BETA - TEAM_ALPHA)?\n(e) What is the Degree of (TEAM_ALPHA U TEAM_BETA)?",
            "solution": "(a) Union Compatibility: Yes, both tables have the exact same degree (3 attributes) and corresponding attributes have identical data types (EmpID: int/char, Name: char, Role: char).\n(b) Cardinality of Union:\n    |A U B| = |A| + |B| - |A cap B| = 15 + 20 - 5 = 30 employees.\n(c) Cardinality of Intersection:\n    |A cap B| = 5 employees (common to both).\n(d) Cardinality of Difference (B - A):\n    |B - A| = |B| - |A cap B| = 20 - 5 = 15 employees.\n(e) Degree of Union: Exactly 3 (same as original tables).",
            "markingScheme": "1.5 Marks for (a) union compatibility check, 1.5 Marks for (b) union cardinality = 30, 1 Mark for (c) intersection = 5, 1 Mark for (d) difference = 15, 1 Mark for (e) degree = 3."
          }
        ]
      }
    ]
  },
  {
    "setId": 7,
    "title": "Set 7: Joins (Natural Join, Equi-Join, Theta Join)",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which join operation automatically equates columns with matching names and eliminates the duplicate common column in the output?\n(a) Equi-Join\n(b) Natural Join\n(c) Cross Join\n(d) Outer Join",
            "solution": "(b) Natural Join.",
            "markingScheme": "1 Mark for (b) Natural Join."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "In an Equi-Join between two tables having common column 'DeptID', how many times does 'DeptID' appear in the result schema?\n(a) Once\n(b) Twice\n(c) Never\n(d) Three times",
            "solution": "(b) Twice (as Table1.DeptID and Table2.DeptID). Natural join eliminates the duplicate column.",
            "markingScheme": "1 Mark for (b) Twice."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What operator is used in the join condition of an Equi-Join?\n(a) >\n(b) =\n(c) <\n(d) !=",
            "solution": "(b) = (equality operator).",
            "markingScheme": "1 Mark for (b) =."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether a Cartesian Product followed by Selection on an equality condition produces an Equi-Join.",
            "solution": "Yes. An Equi-Join is conceptually equivalent to sigma_{R.attr = S.attr}(R x S).",
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
            "question": "Differentiate between an Equi-Join and a Natural Join.",
            "solution": "Equi-Join: Uses an explicit equality operator (=) to match columns; retains the common join attribute from both tables, resulting in duplicate columns. Natural Join: Implicitly matches attributes with identical names in both tables and automatically eliminates the duplicate common column from the result schema.",
            "markingScheme": "1 Mark for Equi-Join retains duplicate column, 1 Mark for Natural Join eliminates duplicate column."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Table R has columns (A, B) and Table S has columns (B, C). What are the attributes in the schema of Natural Join (R |><| S)?",
            "solution": "Attributes in Natural Join schema: (A, B, C) - exactly 3 attributes without duplicating column B.",
            "markingScheme": "2 Marks for (A, B, C)."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Table STUDENT has columns (RollNo, Name, CourseID) with degree 3. Table COURSE has columns (CourseID, CourseName, Fee) with degree 3.\n1. Find the degree of Cartesian Product (STUDENT x COURSE)\n2. Find the degree of Equi-Join on CourseID\n3. Find the degree of Natural Join (STUDENT |><| COURSE)",
            "solution": "1. Cartesian Product Degree = 3 + 3 = 6 attributes.\n2. Equi-Join Degree = 3 + 3 = 6 attributes (includes STUDENT.CourseID and COURSE.CourseID).\n3. Natural Join Degree = 3 + 3 - 1 = 5 attributes (CourseID appears only once).",
            "markingScheme": "1 Mark for Cartesian (6), 1 Mark for Equi-Join (6), 1 Mark for Natural Join (5)."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Explain what happens if two tables have no common attribute names when a Natural Join is performed.",
            "solution": "If two tables share no common attribute names, the Natural Join condition cannot match any columns. In that case, Natural Join degenerates into an unconditional Cartesian Product (cross join), combining every row of the first table with every row of the second.",
            "markingScheme": "1.5 Marks for no common columns to match, 1.5 Marks for degenerating into Cartesian Product."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Given two tables in an inventory system:\nTable: SUPPLIER (SuppID, SuppName, City)\n(S01, 'ABC Ltd', 'Delhi'), (S02, 'XYZ Corp', 'Mumbai'), (S03, 'Global', 'Kolkata')\nTable: PART (PartNo, PartName, SuppID, Price)\n(P1, 'Bolt', 'S01', 10), (P2, 'Nut', 'S01', 5), (P3, 'Gear', 'S02', 150), (P4, 'Bearing', 'S04', 80)\n(a) Perform Natural Join (SUPPLIER |><| PART). Write the resulting table rows and columns.\n(b) Why does Part P4 ('Bearing') with SuppID 'S04' not appear in the join result?\n(c) What type of join would preserve Part P4 even without a matching supplier?",
            "solution": "(a) Natural Join Result Schema: (SuppID, SuppName, City, PartNo, PartName, Price)\nRows in result:\n- (S01, 'ABC Ltd', 'Delhi', P1, 'Bolt', 10)\n- (S01, 'ABC Ltd', 'Delhi', P2, 'Nut', 5)\n- (S02, 'XYZ Corp', 'Mumbai', P3, 'Gear', 150)\n(b) Why P4 does not appear: Because SuppID 'S04' does not exist in table SUPPLIER. Natural join (inner join) retains only tuples that have matching values in both tables.\n(c) Preserving P4: A Left Outer Join (or Full Outer Join) preserves all rows from the PART table, filling missing SUPPLIER columns with NULL.",
            "markingScheme": "3 Marks for (a) correct schema & 3 resulting rows, 1.5 Marks for (b) S04 missing in parent explanation, 1.5 Marks for (c) Left / Full Outer Join."
          }
        ]
      }
    ]
  },
  {
    "setId": 8,
    "title": "Set 8: Data Independence & 3-Schema Architecture",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What are the three levels of the ANSI-SPARC database architecture?\n(a) Physical, Conceptual (Logical), External (View)\n(b) Hardware, Software, Network\n(c) Input, Process, Output\n(d) Python, SQL, C++",
            "solution": "(a) Physical, Conceptual (Logical), External (View).",
            "markingScheme": "1 Mark for (a)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What is Physical Data Independence?",
            "solution": "The capacity to modify the physical storage schema (file organization, indexes) without altering the logical/conceptual schema or application programs.",
            "markingScheme": "1 Mark for modifying physical storage without changing conceptual schema."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What is Logical Data Independence?",
            "solution": "The capacity to modify the conceptual schema (adding new tables or columns) without altering the external schemas (views) or existing application programs.",
            "markingScheme": "1 Mark for modifying conceptual schema without changing external views."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State which is harder to achieve: Physical Data Independence or Logical Data Independence.",
            "solution": "Logical Data Independence is much harder to achieve because application programs are heavily dependent on the logical structure of data.",
            "markingScheme": "1 Mark for Logical Data Independence is harder."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Explain the role of the Database Administrator (DBA).",
            "solution": "The DBA is the person or team responsible for overall database design, user authorization, security permissions, storage management, backup/recovery, and performance tuning.",
            "markingScheme": "1 Mark for database design and user authorization, 1 Mark for backup/recovery and performance tuning."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "What is a Data Dictionary (System Catalog)?",
            "solution": "A reserved repository inside the DBMS storing metadata (data about data): table definitions, attribute names, data types, constraints, user privileges, and index configurations.",
            "markingScheme": "1 Mark for metadata repository, 1 Mark for storing schemas, constraints, and privileges."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Compare the three levels of database architecture with an example (Student Database):\n1. External Level\n2. Conceptual Level\n3. Physical Level",
            "solution": "1. External Level (View): What individual users see (e.g., student sees only their personal report card view; accountant sees only fee payment status view).\n2. Conceptual Level (Logical): Complete community view of all entities and relationships (e.g., full tables STUDENT, COURSES, FEES with all columns and constraints).\n3. Physical Level (Internal): How bits and bytes are organized on physical hard drives (e.g., B-tree indexes, page blocks, RAID storage allocation).",
            "markingScheme": "1 Mark per level explained with student database example."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Explain why traditional file systems lack physical and logical data independence.",
            "solution": "In file systems, program code contains hardcoded details about file record layouts (e.g., struct { char name[20]; int age; }). Changing the record size, adding a field, or switching storage devices requires modifying and recompiling every application program that reads that file.",
            "markingScheme": "1.5 Marks for hardcoded file record structures in program code, 1.5 Marks for requiring program modification/recompilation."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A bank upgrades its storage hardware from magnetic hard disk arrays to ultra-fast NVMe SSDs and reorganizes its internal B-tree index structures.\n(a) Which type of data independence guarantees that online banking web applications continue operating without changing a single line of application code?\n(b) Later, the bank adds a new column 'KYC_Status' to the internal customer database schema. Which type of data independence ensures that existing ATM withdrawal cash machines do not break?\n(c) Name the database component responsible for translating user queries from the external view down to physical disk blocks.\n(d) Mention two distinct security privileges a DBA can grant to a teller versus a branch manager.",
            "solution": "(a) Physical Data Independence: Changing storage devices (HDDs to NVMe SSDs) and re-indexing changes only internal storage without modifying conceptual schemas or application programs.\n(b) Logical Data Independence: Adding a new attribute ('KYC_Status') modifies the conceptual schema while external views used by ATM withdrawal machines remain completely unaffected.\n(c) DBMS Query Processor / Storage Manager Engine (along with Data Dictionary mapping layers).\n(d) Security Privileges:\n    1. Bank Teller: Granted SELECT and UPDATE on daily transaction balances only.\n    2. Branch Manager: Granted additional privileges to approve loans, access audit trails, and view complete account histories across all branches.",
            "markingScheme": "1.5 Marks for (a) Physical data independence, 1.5 Marks for (b) Logical data independence, 1.5 Marks for (c) DBMS Query Processor / Storage engine, 1.5 Marks for (d) Teller vs Manager distinct privileges."
          }
        ]
      }
    ]
  },
  {
    "setId": 9,
    "title": "Set 9: Complex Relational Schema Design & Table Relationships",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "In a One-to-Many (1:N) relationship between DEPARTMENT and EMPLOYEE, where is the Foreign Key placed?\n(a) In the DEPARTMENT table\n(b) In the EMPLOYEE table\n(c) In both tables\n(d) In a third separate table",
            "solution": "(b) In the EMPLOYEE table (the 'Many' side holds the foreign key referencing the 'One' side primary key).",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "How is a Many-to-Many (M:N) relationship implemented between two relational tables (e.g. STUDENT and COURSE)?\n(a) By placing foreign keys in both tables\n(b) By creating a third junction/bridge table containing foreign keys referencing both tables\n(c) By merging the tables\n(d) It cannot be implemented in RDBMS",
            "solution": "(b) By creating a third junction/bridge table containing foreign keys referencing both tables.",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What is an atomic value in relational databases?",
            "solution": "A value that cannot be divided or broken down into smaller components (indivisible single value).",
            "markingScheme": "1 Mark for indivisible single value."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether a Primary Key can be composed of three attributes.",
            "solution": "Yes. A composite primary key can be formed by combining any number of attributes.",
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
            "question": "Why should multi-valued attributes (e.g. a student having 3 phone numbers stored in a single comma-separated column) be avoided in a relation?",
            "solution": "Storing multiple values violates the First Normal Form (1NF) requiring atomic values. It makes searching, indexing, sorting, and updating individual phone numbers difficult and inefficient.",
            "markingScheme": "1 Mark for violates atomicity / 1NF, 1 Mark for making searching/indexing inefficient."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Explain the concept of Data Inconsistency resulting from Data Redundancy.",
            "solution": "When the same data item is duplicated in multiple tables, an update to one table without corresponding updates to others leaves conflicting, contradictory versions of truth (inconsistency).",
            "markingScheme": "1 Mark for duplicated data in multiple places, 1 Mark for conflicting/contradictory records when updated."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Design a relational schema for a Hospital Doctor-Patient consultation system:\nDoctors have (DocID, DocName, Specialization)\nPatients have (PatID, PatName, Age)\nConsultations occur on specific dates with fees.\nWrite the schemas for all tables, identifying Primary Keys and Foreign Keys.",
            "solution": "1. Table: DOCTOR (DocID [PK], DocName, Specialization)\n2. Table: PATIENT (PatID [PK], PatName, Age)\n3. Table: CONSULTATION (ConsultID [PK], DocID [FK -> DOCTOR], PatID [FK -> PATIENT], ConsultDate, Fee)\nNote: CONSULTATION acts as the junction table connecting the M:N relationship between doctors and patients.",
            "markingScheme": "1 Mark for DOCTOR table, 1 Mark for PATIENT table, 1 Mark for CONSULTATION junction table with both FKs."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Given relation R(A, B, C, D) with candidate keys (A, B) and (A, C):\n1. Identify all Prime Attributes\n2. Identify all Non-Prime Attributes\n3. Can attribute A alone be chosen as the primary key? Explain.",
            "solution": "1. Prime Attributes (attributes that belong to at least one candidate key): A, B, C.\n2. Non-Prime Attributes: D.\n3. Attribute A alone cannot be the primary key because neither candidate key contains A alone; A alone does not uniquely identify tuples.",
            "markingScheme": "1 Mark for Prime attributes (A, B, C), 1 Mark for Non-prime attribute (D), 1 Mark for A alone cannot be PK."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A library database has three relations:\nTable: MEMBER (MemID, Name, MemType, MaxBooksAllowed)\nTable: BOOK (BookID, Title, Author, Category)\nTable: ISSUE (IssueID, MemID, BookID, IssueDate, ReturnDate)\n(a) Identify the primary key of each table.\n(b) Identify all foreign keys in table ISSUE and the tables they reference.\n(c) What constraint ensures that a book cannot be issued to a non-existent MemID?\n(d) Write the relational algebra expression to list the Titles of all books written by 'E. Balagurusamy'.\n(e) If a member with active issued books is deleted from MEMBER, explain how foreign key constraints prevent data corruption.",
            "solution": "(a) Primary Keys: MemID in MEMBER; BookID in BOOK; IssueID in ISSUE.\n(b) Foreign Keys in ISSUE:\n    - MemID references Primary Key 'MemID' in table MEMBER.\n    - BookID references Primary Key 'BookID' in table BOOK.\n(c) Referential Integrity Constraint.\n(d) Relational Algebra Expression:\n    pi_{Title}(sigma_{Author = 'E. Balagurusamy'}(BOOK))\n(e) Prevention of data corruption: Under ON DELETE RESTRICT, the database blocks deletion of the member until all active issue records are resolved. This prevents orphan issue records that reference non-existent members.",
            "markingScheme": "1.5 Marks for (a) primary keys, 1.5 Marks for (b) foreign keys, 1 Mark for (c) Referential integrity, 1 Mark for (d) pi(sigma) expression, 1 Mark for (e) orphan record prevention."
          }
        ]
      }
    ]
  },
  {
    "setId": 10,
    "title": "Set 10: Complete Database Concepts & Keys Board Examination Mastery",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "In a relational database, what is the term used for the number of tuples in a relation?\n(a) Degree\n(b) Cardinality\n(c) Domain\n(d) Relation",
            "solution": "(b) Cardinality.",
            "markingScheme": "1 Mark for (b) Cardinality."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "Which of the following is true about a Candidate Key?\n(a) It can accept duplicate values\n(b) It is a minimal super key capable of uniquely identifying tuples\n(c) It must always be foreign key\n(d) It can be composed of zero attributes",
            "solution": "(b) It is a minimal super key capable of uniquely identifying tuples.",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What is an Alternate Key?",
            "solution": "A candidate key that is not selected as the primary key of the relation.",
            "markingScheme": "1 Mark for candidate key not selected as primary key."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State the mathematical symbol used for the Projection operation in relational algebra.",
            "solution": "The Greek letter pi (pi).",
            "markingScheme": "1 Mark for pi."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Differentiate between Degree and Cardinality with an example.",
            "solution": "Degree: The total count of attributes (columns) in a relation.\nCardinality: The total count of tuples (rows) in a relation.\nExample: In a table with 5 columns and 100 rows, Degree = 5 and Cardinality = 100.",
            "markingScheme": "1 Mark for definitions, 1 Mark for clear numerical example."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "State two advantages of database normalization in RDBMS design.",
            "solution": "1. Minimizes duplicate data storage (reduces redundancy).\n2. Prevents insertion, deletion, and update anomalies, ensuring consistent data.",
            "markingScheme": "1 Mark for reducing redundancy, 1 Mark for preventing anomalies."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Given table VEHICLE (RegNo, Model, Make, Color, Capacity):\n1. Identify the Primary Key\n2. If RegNo has 50 entries and Color has 4 distinct values, state Degree and Cardinality of VEHICLE\n3. Write relational algebra to display Model and Make of all 'Red' vehicles",
            "solution": "1. Primary Key: RegNo (unique registration number).\n2. Degree = 5 (columns), Cardinality = 50 (rows).\n3. Relational Algebra:\n   pi_{Model, Make}(sigma_{Color = 'Red'}(VEHICLE))",
            "markingScheme": "1 Mark for RegNo primary key, 1 Mark for Degree 5 and Cardinality 50, 1 Mark for pi(sigma) expression."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Explain what happens when an Equi-Join condition matches zero rows between two tables.",
            "solution": "If no rows satisfy the equality condition (e.g. no common keys match), the join result is an empty relation with Cardinality = 0, while its Degree remains equal to the sum of the attributes of both tables.",
            "markingScheme": "1.5 Marks for empty relation / Cardinality = 0, 1.5 Marks for Degree remains sum of both tables."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "MASTER CBSE QUESTION: Consider the following relational database of an airline:\nTable: PASSENGER (PID, PName, Gender, Age, PassportNo)\nTable: FLIGHT_BOOKING (TicketNo, PID, FlightNo, SeatNo, Fare)\n(a) Identify all Candidate Keys of table PASSENGER.\n(b) Which attribute should be selected as the Primary Key for PASSENGER? What does the remaining candidate key become?\n(c) Identify the Foreign Key in table FLIGHT_BOOKING and state the integrity constraint it enforces.\n(d) Write relational algebra expressions to:\n    1. List all passengers whose Age > 60 (Senior Citizens).\n    2. Display TicketNo and Fare from FLIGHT_BOOKING where Fare >= 5000.\n(e) If PASSENGER has 800 rows and FLIGHT_BOOKING has 1200 rows, what is the Cardinality and Degree of (PASSENGER x FLIGHT_BOOKING)?",
            "solution": "(a) Candidate Keys of PASSENGER: PID and PassportNo (both uniquely identify an individual passenger).\n(b) Primary Key: PID. The remaining candidate key (PassportNo) becomes the Alternate Key.\n(c) Foreign Key in FLIGHT_BOOKING: PID. It references the Primary Key 'PID' in table PASSENGER, enforcing the Referential Integrity Constraint.\n(d) Relational Algebra Expressions:\n    1. sigma_{Age > 60}(PASSENGER)\n    2. pi_{TicketNo, Fare}(sigma_{Fare >= 5000}(FLIGHT_BOOKING))\n(e) Cartesian Product (PASSENGER x FLIGHT_BOOKING):\n    - Degree = Degree(PASSENGER) + Degree(FLIGHT_BOOKING) = 5 + 5 = 10 columns.\n    - Cardinality = Cardinality(PASSENGER) * Cardinality(FLIGHT_BOOKING) = 800 * 1200 = 960,000 rows.",
            "markingScheme": "1 Mark for (a) Candidate keys, 1 Mark for (b) Primary and Alternate keys, 1 Mark for (c) Foreign key & referential integrity, 1.5 Marks for (d) two relational algebra expressions, 1.5 Marks for (e) Degree = 10 and Cardinality = 960,000."
          }
        ]
      }
    ]
  }
];
