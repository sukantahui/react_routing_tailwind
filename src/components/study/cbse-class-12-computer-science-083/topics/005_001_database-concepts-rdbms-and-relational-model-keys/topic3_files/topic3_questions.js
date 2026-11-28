export default [
  {
    "id": 1,
    "question": "In the Relational Data Model, what is the formal mathematical term for a two-dimensional 'Table'?",
    "options": [
      "Relation",
      "Tuple",
      "Attribute",
      "Domain"
    ],
    "correctAnswer": 0,
    "explanation": "In relational database theory, a two-dimensional table consisting of rows and columns is formally called a Relation.",
    "hint": "The formal mathematical name for a table."
  },
  {
    "id": 2,
    "question": "What is the formal relational database term for a single horizontal 'Row' or 'Record' in a table?",
    "options": [
      "Tuple",
      "Attribute",
      "Relation",
      "Domain"
    ],
    "correctAnswer": 0,
    "explanation": "Each individual row in a relation represents a complete entity record and is formally designated as a Tuple.",
    "hint": "Formal relational term for a horizontal row/record."
  },
  {
    "id": 3,
    "question": "What is the formal relational database term for a named vertical 'Column' or 'Field' in a table?",
    "options": [
      "Attribute",
      "Tuple",
      "Relation",
      "Instance"
    ],
    "correctAnswer": 0,
    "explanation": "A named vertical column representing a specific property or feature of an entity is formally called an Attribute.",
    "hint": "Formal relational term for a vertical column/field."
  },
  {
    "id": 4,
    "question": "In a CBSE 1-mark question: 'A table named EMPLOYEE has 10 columns and 50 rows. State the number of attributes and tuples in the table.' What is the answer?",
    "options": [
      "Attributes = 10, Tuples = 50",
      "Attributes = 50, Tuples = 10",
      "Attributes = 500, Tuples = 1",
      "Attributes = 10, Tuples = 500"
    ],
    "correctAnswer": 0,
    "explanation": "Columns correspond to Attributes (10), and horizontal rows correspond to Tuples (50).",
    "hint": "Attributes = Columns (10), Tuples = Rows (50)."
  },
  {
    "id": 5,
    "question": "Which of the following is a fundamental property of a Relation in the relational model?",
    "options": [
      "The sequence/ordering of rows (tuples) is mathematically immaterial and irrelevant",
      "All rows must be sorted alphabetically by name",
      "Rows must be stored in chronological order of insertion",
      "The first column must always be numeric"
    ],
    "correctAnswer": 0,
    "explanation": "Because a relation is mathematically defined as a set of tuples, elements of a set have no inherent order. Tuples can be stored or displayed in any order.",
    "hint": "A set of tuples has no predefined order."
  },
  {
    "id": 6,
    "question": "Is the ordering of attributes (columns) in a relation mathematically significant?",
    "options": [
      "No, attribute ordering is immaterial because attributes are referenced by name, not by column position",
      "Yes, primary key must always be column 1",
      "Yes, text columns must come before numeric columns",
      "Yes, columns must be arranged alphabetically"
    ],
    "correctAnswer": 0,
    "explanation": "In relational theory, attributes form a set of named properties; their left-to-right order has zero mathematical or functional significance.",
    "hint": "Attributes are identified by name, not by positional order."
  },
  {
    "id": 7,
    "question": "Can a valid relation contain two completely identical duplicate tuples?",
    "options": [
      "No, because a relation is a mathematical set of tuples, and sets by definition cannot contain duplicate elements",
      "Yes, duplicate rows are encouraged in RDBMS",
      "Yes, provided the names are identical",
      "Only if the table has no primary key"
    ],
    "correctAnswer": 0,
    "explanation": "A relation is a mathematical set; by definition, all elements in a set are distinct. A primary key guarantees no two tuples are identical.",
    "hint": "Mathematical sets cannot contain duplicate elements."
  },
  {
    "id": 8,
    "question": "What does the 'Atomicity of Attribute Values' rule state in the relational data model?",
    "options": [
      "Each cell in a table must contain exactly one single indivisible value from its domain (First Normal Form requirement)",
      "Attributes must be radioactive",
      "Values must be stored as atomic elements like hydrogen",
      "Columns must be divisible by 2"
    ],
    "correctAnswer": 0,
    "explanation": "Attribute values must be atomic (indivisible). Storing multiple phone numbers separated by commas in a single cell violates relational rules.",
    "hint": "Each cell must contain a single, indivisible value."
  },
  {
    "id": 9,
    "question": "In the relation STUDENT(RollNo, Name, DOB, Marks), what does 'STUDENT' represent?",
    "options": [
      "Relation Name (Table Name)",
      "Attribute Name",
      "Tuple Name",
      "Domain Name"
    ],
    "correctAnswer": 0,
    "explanation": "In standard relational schema notation 'R(A1, A2, ... An)', 'R' (here STUDENT) is the Relation Name.",
    "hint": "The name identifying the entire table."
  },
  {
    "id": 10,
    "question": "In the relation STUDENT(RollNo, Name, DOB, Marks), what do 'RollNo', 'Name', 'DOB', and 'Marks' represent?",
    "options": [
      "Attributes of the relation",
      "Tuples of the relation",
      "Database instances",
      "Physical disk sectors"
    ],
    "correctAnswer": 0,
    "explanation": "The named column headers enclosed in parentheses represent the Attributes of the relation.",
    "hint": "Column headers defining entity properties."
  },
  {
    "id": 11,
    "question": "What does a single tuple in an EMPLOYEE relation represent in the real world?",
    "options": [
      "A specific, single individual employee entity instance",
      "All employees combined",
      "The entire human resources department",
      "The company's bank account"
    ],
    "correctAnswer": 0,
    "explanation": "A tuple represents an individual instance of the real-world entity modeled by the relation (e.g. Employee with ID 101, Name 'Pooja', Salary 65000).",
    "hint": "An individual instance of the real-world entity."
  },
  {
    "id": 12,
    "question": "Which term represents the pool of permissible, legal values from which an attribute can draw its actual value?",
    "options": [
      "Domain",
      "Tuple",
      "Degree",
      "Cardinality"
    ],
    "correctAnswer": 0,
    "explanation": "The Domain is the set of all valid atomic values that can appear in an attribute (e.g. Domain of Grade = {'A', 'B', 'C', 'D', 'E'}).",
    "hint": "The permissible pool of values for an attribute."
  },
  {
    "id": 13,
    "question": "If a student enters 'Two Thousand' in a 'Salary' attribute whose domain is defined as positive integer numbers, what will the DBMS do?",
    "options": [
      "Reject the entry because 'Two Thousand' is outside the defined numeric domain",
      "Convert the string to binary automatically",
      "Accept the entry and convert it to 0",
      "Delete the table"
    ],
    "correctAnswer": 0,
    "explanation": "The DBMS enforces domain constraints; entering string text into an integer column violates domain integrity and is rejected.",
    "hint": "DBMS enforces data type and domain validity."
  },
  {
    "id": 14,
    "question": "In a CBSE exam question: 'Given a table ITEM with fields (ItemNo, ItemName, Price, Quantity). Identify the relation name and write all attributes.' What is the answer?",
    "options": [
      "Relation Name: ITEM; Attributes: ItemNo, ItemName, Price, Quantity",
      "Relation Name: Price; Attributes: ITEM",
      "Relation Name: Quantity; Attributes: None",
      "Relation Name: Tuple; Attributes: Row"
    ],
    "correctAnswer": 0,
    "explanation": "ITEM is the relation (table) name, and ItemNo, ItemName, Price, and Quantity are the 4 attributes.",
    "hint": "Table name is ITEM; column names are the attributes."
  },
  {
    "id": 15,
    "question": "What is the relationship between the terms 'Table', 'Row', 'Column' and their formal relational equivalents?",
    "options": [
      "Table = Relation, Row = Tuple, Column = Attribute",
      "Table = Tuple, Row = Attribute, Column = Relation",
      "Table = Attribute, Row = Relation, Column = Tuple",
      "Table = Domain, Row = Degree, Column = Cardinality"
    ],
    "correctAnswer": 0,
    "explanation": "The classic mapping: Table corresponds to Relation; Row corresponds to Tuple; Column corresponds to Attribute.",
    "hint": "Table = Relation; Row = Tuple; Column = Attribute."
  },
  {
    "id": 16,
    "question": "Can an attribute name be duplicated within the same relation?",
    "options": [
      "No, all attribute names within a single relation must be distinct and unique",
      "Yes, two columns can have the identical name",
      "Only if both columns store integers",
      "Yes, up to 5 duplicate columns are permitted"
    ],
    "correctAnswer": 0,
    "explanation": "Within any given relation, each attribute must have a unique name so that columns can be unambiguously referenced in SQL statements.",
    "hint": "Column names must be unique within a table."
  },
  {
    "id": 17,
    "question": "Can two different relations in the same database share an attribute with the same name?",
    "options": [
      "Yes, two different relations can share attribute names (e.g. DeptId in both Employee and Department relations)",
      "No, every column name across the entire database must be globally unique",
      "Only if the database has less than 10 tables",
      "Only in MySQL, but forbidden in Oracle"
    ],
    "correctAnswer": 0,
    "explanation": "Attributes must be unique within a table, but different tables often share common attribute names (like DeptId) to establish relational joins.",
    "hint": "Common attribute names across tables enable relational joins."
  },
  {
    "id": 18,
    "question": "In relational notation, how is a tuple formally represented?",
    "options": [
      "An ordered list of values enclosed in parentheses: (val1, val2, ..., valn)",
      "A square matrix of zeros and ones",
      "A polynomial equation",
      "A flowchart diagram"
    ],
    "correctAnswer": 0,
    "explanation": "A tuple is represented as a list of values corresponding to the schema: e.g. (101, 'Aman', 12, 95).",
    "hint": "Parenthesized list of attribute values."
  },
  {
    "id": 19,
    "question": "What is an 'Entity' in database modeling?",
    "options": [
      "A real-world object or concept that is distinguishable from other objects and about which data is stored (e.g. a Student, a Product)",
      "A computer virus",
      "An internet cable",
      "A printed invoice"
    ],
    "correctAnswer": 0,
    "explanation": "An entity is an identifiable real-world object (person, place, thing, event) about which information is collected and maintained in a database.",
    "hint": "A distinguishable real-world person, object, or concept."
  },
  {
    "id": 20,
    "question": "What is an 'Entity Set' in relation to tables?",
    "options": [
      "A collection of similar entities that share the same attributes (which translates directly into a Relation/Table in an RDBMS)",
      "A set of computer monitors",
      "A group of keyboard keys",
      "A password list"
    ],
    "correctAnswer": 0,
    "explanation": "An Entity Set (e.g. all Students in a school) is implemented as a Relation (Table) where each row represents one entity instance.",
    "hint": "Collection of similar entities implemented as a Table."
  },
  {
    "id": 21,
    "question": "Why does the relational model prohibit storing a list of multiple phone numbers in a single phone attribute cell?",
    "options": [
      "It violates the 1st Normal Form (1NF) rule requiring atomic (indivisible) attribute values",
      "Because telephone numbers are too long",
      "Because phones are not computers",
      "Because numbers cannot be stored in tables"
    ],
    "correctAnswer": 0,
    "explanation": "First Normal Form (1NF) requires all attribute values to be atomic; composite or multi-valued attributes must be decomposed into separate relations or rows.",
    "hint": "Violates 1NF requirement of atomic values."
  },
  {
    "id": 22,
    "question": "What is the purpose of the special value 'NULL' in a tuple attribute?",
    "options": [
      "It represents a missing, unknown, or inapplicable value",
      "It represents the number zero (0)",
      "It represents a blank space character ' '",
      "It deletes the entire table"
    ],
    "correctAnswer": 0,
    "explanation": "In relational databases, NULL signifies that a value is missing, not known, or not applicable. It is distinctly different from zero or an empty string.",
    "hint": "Missing, unknown, or not applicable value."
  },
  {
    "id": 23,
    "question": "Is 'NULL' equal to the integer 0 or an empty string ''?",
    "options": [
      "No, NULL is completely distinct from 0 and empty strings; it represents the absence of any value",
      "Yes, NULL is identical to 0 in all cases",
      "Yes, NULL is just another word for blank space",
      "NULL equals 100"
    ],
    "correctAnswer": 0,
    "explanation": "NULL means 'no value present' or 'unknown'; 0 is a valid number, and '' is a valid string of length zero.",
    "hint": "NULL is unknown/absent, not zero or empty text."
  },
  {
    "id": 24,
    "question": "In a CBSE board question: 'State whether true or false: In a relation, all values in an attribute must be of the same data type.'",
    "options": [
      "True, all values under an attribute must belong to the same domain and data type",
      "False, a column can mix images, integers, and audio freely in the same cell",
      "False, columns do not have data types",
      "True only on Linux"
    ],
    "correctAnswer": 0,
    "explanation": "By definition, all values in a specific attribute column must belong to the domain defined for that attribute (e.g. all INT or all VARCHAR).",
    "hint": "All values in a column must adhere to the same data type."
  },
  {
    "id": 25,
    "question": "In summary, what are the three core relational terms that match Table, Row, and Column respectively?",
    "options": [
      "Relation, Tuple, and Attribute",
      "Tuple, Attribute, and Relation",
      "Attribute, Relation, and Tuple",
      "Domain, Degree, and Cardinality"
    ],
    "correctAnswer": 0,
    "explanation": "Table = Relation, Row = Tuple, Column = Attribute. This is the cornerstone vocabulary of CBSE Class 12 Unit III.",
    "hint": "Relation, Tuple, Attribute."
  }
];
