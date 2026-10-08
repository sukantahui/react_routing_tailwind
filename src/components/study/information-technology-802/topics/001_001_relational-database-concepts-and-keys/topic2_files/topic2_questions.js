export default [
  {
    "id": "t2_q1",
    "question": "In the Relational Model, what is a 'Relation'?",
    "options": [
      "A two-dimensional table consisting of rows (tuples) and columns (attributes)",
      "A physical Ethernet connection between two servers",
      "A friendship link between two database users",
      "A mathematical formula for addition"
    ],
    "answer": "A two-dimensional table consisting of rows (tuples) and columns (attributes)",
    "explanation": "In relational database theory (introduced by Dr. E.F. Codd), a Relation is a 2D table representing an entity set.",
    "explanationBn": "রিলেশনাল মডেলে Relation বলতে একটি দ্বি-মাত্রিক (2D) টেবিলকে বোঝায় যা রো (Row) এবং কলাম (Column) দিয়ে গঠিত।"
  },
  {
    "id": "t2_q2",
    "question": "What is a 'Tuple' in a relational database?",
    "options": [
      "A single horizontal row (or record) in a relation representing an individual entity instance",
      "A database server configuration file",
      "A vertical column header",
      "The name of a database index"
    ],
    "answer": "A single horizontal row (or record) in a relation representing an individual entity instance",
    "explanation": "A tuple is a single row in a table containing a collection of attribute values representing one specific record (e.g., student Mamata Das's record).",
    "explanationBn": "Tuple হলো একটি টেবিলের প্রতিটি আনুভূমিক সারি (Row বা Record), যা কোনো একক সত্তার সম্পূর্ণ তথ্য ধারণ করে।"
  },
  {
    "id": "t2_q3",
    "question": "What is an 'Attribute' in relational terminology?",
    "options": [
      "A named vertical column in a relation representing a specific property or characteristic of an entity",
      "A row in a table",
      "The total number of rows in a database",
      "The hard drive serial number"
    ],
    "answer": "A named vertical column in a relation representing a specific property or characteristic of an entity",
    "explanation": "An attribute (or column/field) represents a single property, such as `StudentName`, `RollNumber`, or `TheoryMarks`.",
    "explanationBn": "Attribute হলো টেবিলের উল্লম্ব কলাম (Column বা Field), যা কোনো নির্দিষ্ট বৈশিষ্ট্য বা প্রপার্টি নির্দেশ করে।"
  },
  {
    "id": "t2_q4",
    "question": "What is an 'Attribute Domain' in relational database theory?",
    "options": [
      "The set of all permissible atomic values from which an attribute can draw its valid entries",
      "The website domain name where the database is hosted",
      "The physical country where the database server is located",
      "The user role assigned to a DBA"
    ],
    "answer": "The set of all permissible atomic values from which an attribute can draw its valid entries",
    "explanation": "A domain defines the data type, format, and valid range of values for an attribute (e.g., `MarksIT802` domain is real numbers from 0.00 to 100.00).",
    "explanationBn": "Domain হলো এমন অনুমোদিত মানসমূহের সেট (Set of Permissible Values), যা থেকে কোনো কলামের বৈধ ডেটা গৃহীত হতে পারে।"
  },
  {
    "id": "t2_q5",
    "question": "What does the Atomic Value Rule (First Normal Form requirement) state?",
    "options": [
      "Every cell at the intersection of a row and a column must contain exactly one indivisible scalar value",
      "Table names must contain atoms",
      "Numbers must be stored in binary only",
      "All students must study physics"
    ],
    "answer": "Every cell at the intersection of a row and a column must contain exactly one indivisible scalar value",
    "explanation": "Relational tables forbid repeating groups or multi-valued lists (e.g. storing multiple phone numbers '983011, 983022' in a single cell).",
    "explanationBn": "Atomic Value Rule অনুযায়ী টেবিলের প্রতিটি সেলে কেবল একটি একক অবিভাজ্য মান (Single Value) থাকতে পারবে।"
  },
  {
    "id": "t2_q6",
    "question": "What is the difference between a Relational Schema (Intension) and a Relational State (Extension)?",
    "options": [
      "Schema is the permanent structural table definition; State is the collection of tuples populated at a given point in time",
      "Schema is stored on hard drive; State is stored on paper",
      "Schema is in English; State is in Bengali",
      "Schema changes every minute; State never changes"
    ],
    "answer": "Schema is the permanent structural table definition; State is the collection of tuples populated at a given point in time",
    "explanation": "Schema (intension) rarely changes and defines column names, types, and constraints; State (extension) changes constantly as rows are added, edited, or removed.",
    "explanationBn": "Schema হলো টেবিলের স্থায়ী কাঠামো (Design), আর State হলো কোনো নির্দিষ্ট মুহূর্তে টেবিলের মধ্যে থাকা রো সমূহের ডেটা।"
  },
  {
    "id": "t2_q7",
    "question": "In Dr. E.F. Codd's Relational Model, why is the ordering of tuples in a relation mathematically immaterial?",
    "options": [
      "Because a relation is defined as a mathematical set of tuples, and mathematical sets are unordered",
      "Because computers sort all data randomly",
      "Because SQL does not allow sorting",
      "Because tuples have no names"
    ],
    "answer": "Because a relation is defined as a mathematical set of tuples, and mathematical sets are unordered",
    "explanation": "Relations are sets; tuples have no inherent position. The physical storage order does not change the logical meaning unless `ORDER BY` is specified in SQL.",
    "explanationBn": "যেহেতু গাণিতিকভাবে রিলেশন হলো সেটের সমষ্টি এবং সেটে কোনো ক্রম থাকে না, তাই টেবিলে রো-এর অবস্থানের কোনো প্রভাব নেই।"
  },
  {
    "id": "t2_q8",
    "question": "Why is the ordering of attributes within a relation also considered immaterial?",
    "options": [
      "Because attributes are referenced by name (e.g. `StudentName`), not by positional index",
      "Because MySQL rearranges columns randomly every hour",
      "Because column names are invisible to SQL",
      "Because all columns have the same data type"
    ],
    "answer": "Because attributes are referenced by name (e.g. `StudentName`), not by positional index",
    "explanation": "In relational theory, attributes form a set of named projections. SQL queries access columns by name regardless of physical order.",
    "explanationBn": "যেহেতু কোয়েরিতে কলামের নাম ধরে ডেটা আনা হয়, তাই টেবিলে কলামের অবস্থানের ক্রম অপ্রাসঙ্গিক।"
  },
  {
    "id": "t2_q9",
    "question": "What is a 'Relation Instance'?",
    "options": [
      "The snapshot of tuples currently existing in the table at a specific instant",
      "A printed copy of the table schema",
      "A temporary file created during installation",
      "An error message displayed by MySQL"
    ],
    "answer": "The snapshot of tuples currently existing in the table at a specific instant",
    "explanation": "A relation instance (or relational state) represents the exact set of rows populating the relation at a particular moment.",
    "explanationBn": "কোনো নির্দিষ্ট মুহূর্তে টেবিলে সংরক্ষিত ডেটার স্ন্যাপশটকে Relation Instance বলে।"
  },
  {
    "id": "t2_q10",
    "question": "Can a relation in a relational database have two identical tuples (exact duplicates across all attributes)?",
    "options": [
      "No, in strict relational theory, all tuples in a relation must be distinct (enforced via Primary Key)",
      "Yes, duplicate rows are encouraged in all tables",
      "Yes, but only if the student has two names",
      "No, because tables can only hold 1 row"
    ],
    "answer": "No, in strict relational theory, all tuples in a relation must be distinct (enforced via Primary Key)",
    "explanation": "Because a relation is a mathematical set, duplicate elements are prohibited. Primary key or unique key constraints enforce this distinctness.",
    "explanationBn": "রিলেশনাল মডেলে প্রতিটি রো অনন্য (Unique) হতে হবে; কোনো টেবিলে দুটি হুবহু একই রো থাকতে পারে না।"
  },
  {
    "id": "t2_q11",
    "question": "Which of the following represents an Attribute in a table named `STUDENT`?",
    "options": [
      "`StudentRollNumber`",
      "('101', 'Mamata', 'XII')",
      "The entire `STUDENT` table",
      "The MySQL server port 3306"
    ],
    "answer": "`StudentRollNumber`",
    "explanation": "`StudentRollNumber` is a column name representing an individual property (Attribute) of the student entity.",
    "explanationBn": "`StudentRollNumber` হলো একটি কলাম বা Attribute-এর উদাহরণ।"
  },
  {
    "id": "t2_q12",
    "question": "Which of the following represents a Tuple in the `STUDENT` table?",
    "options": [
      "('S101', 'Mamata Das', 'XII', 'A', 98.00)",
      "`MarksIT802`",
      "`VARCHAR(60)`",
      "The SQL keyword `SELECT`"
    ],
    "answer": "('S101', 'Mamata Das', 'XII', 'A', 98.00)",
    "explanation": "The complete row `('S101', 'Mamata Das', 'XII', 'A', 98.00)` is a single tuple representing the record of student Mamata Das.",
    "explanationBn": "('S101', 'Mamata Das', 'XII', 'A', 98.00) হলো একটি সম্পূর্ণ রো বা Tuple-এর উদাহরণ।"
  },
  {
    "id": "t2_q13",
    "question": "In relational notation `R(A1, A2, ..., An)`, what do `R` and `A1..An` represent?",
    "options": [
      "`R` is the Relation name, and `A1..An` are its Attributes",
      "`R` is the Row number, and `A1..An` are Arrays",
      "`R` is the RAM size, and `A1..An` are Applications",
      "`R` is the Router, and `A1..An` are IP Addresses"
    ],
    "answer": "`R` is the Relation name, and `A1..An` are its Attributes",
    "explanation": "The schema notation `Student(RollNo, Name, Class, Marks)` denotes a relation named Student with 4 listed attributes.",
    "explanationBn": "`R` হলো টেবিল বা Relation-এর নাম এবং `A1..An` হলো তার কলাম বা Attribute সমূহ।"
  },
  {
    "id": "t2_q14",
    "question": "What is the Cartesian Product ($R \\times S$) of two relations?",
    "options": [
      "A relation containing all possible concatenated combinations of tuples from relation R with tuples from relation S",
      "A division of two tables",
      "The sum of primary keys",
      "Deleting common columns"
    ],
    "answer": "A relation containing all possible concatenated combinations of tuples from relation R with tuples from relation S",
    "explanation": "The Cartesian Product of relation R with cardinality $n$ and relation S with cardinality $m$ yields a relation of $n \\times m$ tuples and degree $d_R + d_S$.",
    "explanationBn": "Cartesian Product হলো দুটি টেবিলের সমস্ত রো-এর মধ্যে সম্ভাব্য সকল জোড় তৈরি করে গঠিত নতুন রিলেশন ($n \\times m$)।"
  },
  {
    "id": "t2_q15",
    "question": "In Coder & AccoTax Barrackpore, Sukanta Hui defines a table `Teacher(TeacherID, TeacherName, Subject, ExperienceYears)`. What is the Degree of this relation?",
    "options": [
      "4 (because there are 4 attributes/columns)",
      "0",
      "100",
      "Depends on how many teachers are enrolled"
    ],
    "answer": "4 (because there are 4 attributes/columns)",
    "explanation": "Degree is the total count of attributes (columns) in a table. Here, there are 4 columns, so Degree = 4.",
    "explanationBn": "Degree হলো কলামের সংখ্যা। এখানে ৪টি কলাম থাকায় Degree = 4।"
  },
  {
    "id": "t2_q16",
    "question": "If the `Teacher` table currently contains records for 6 teachers, what is the Cardinality of this relation?",
    "options": [
      "6 (because there are 6 tuples/rows)",
      "4",
      "24",
      "1"
    ],
    "answer": "6 (because there are 6 tuples/rows)",
    "explanation": "Cardinality is the total count of tuples (rows/records) in a table. With 6 teacher records, Cardinality = 6.",
    "explanationBn": "Cardinality হলো রো বা রেকর্ডের সংখ্যা। ৬ জন শিক্ষকের রেকর্ড থাকলে Cardinality = 6।"
  },
  {
    "id": "t2_q17",
    "question": "What happens to the Degree and Cardinality of a table when all rows are deleted using `DELETE FROM Teacher;`?",
    "options": [
      "Degree remains 4; Cardinality becomes 0",
      "Degree becomes 0; Cardinality becomes 0",
      "The entire table is deleted from disk",
      "Degree becomes 4; Cardinality remains 6"
    ],
    "answer": "Degree remains 4; Cardinality becomes 0",
    "explanation": "`DELETE FROM` removes all rows (Cardinality becomes 0), but the table schema structure (Degree = 4 columns) remains intact.",
    "explanationBn": "সব রো ডিলিট করলে রো সংখ্যা বা Cardinality = 0 হয়ে যায়, কিন্তু কলাম বা Degree অপরিবর্তিত থাকে (Degree = 4)।"
  },
  {
    "id": "t2_q18",
    "question": "Why does the Relational Model prohibit storing composite or multi-valued attributes in a single field?",
    "options": [
      "To preserve atomicity, simplify SQL query predicates, and maintain First Normal Form (1NF)",
      "Because SQL cannot store text strings",
      "Because computers cannot understand commas",
      "To force users to use Excel"
    ],
    "answer": "To preserve atomicity, simplify SQL query predicates, and maintain First Normal Form (1NF)",
    "explanation": "Atomicity ensures indexing, pattern matching (`LIKE`), and sorting operate reliably without string parsing overhead.",
    "explanationBn": "১ম নরমাল ফর্ম (1NF) ও ডেটার বিশুদ্ধতা বজায় রাখতে কোনো সেলে একাধিক মান রাখা নিষিদ্ধ।"
  },
  {
    "id": "t2_q19",
    "question": "In a relational schema, what is a 'Foreign Key' conceptually?",
    "options": [
      "An attribute in a relation that references the Primary Key of another (or same) relation to establish a relationship",
      "A password created in another country",
      "A key used to decrypt international emails",
      "A column that contains foreign currency symbols"
    ],
    "answer": "An attribute in a relation that references the Primary Key of another (or same) relation to establish a relationship",
    "explanation": "A Foreign Key establishes a parent-child relationship, enforcing referential integrity between tables.",
    "explanationBn": "Foreign Key হলো এমন একটি কলাম যা অপর একটি টেবিলের Primary Key-কে নির্দেশ করে টেবিলগুলোর মধ্যে সম্পর্ক তৈরি করে।"
  },
  {
    "id": "t2_q20",
    "question": "Which of the following terms is a synonym for 'Attribute'?",
    "options": [
      "Column / Field",
      "Row / Record",
      "Table / Relation",
      "File / Disk"
    ],
    "answer": "Column / Field",
    "explanation": "In relational terminology, Attribute, Column, and Field refer to the same vertical structural element of a table.",
    "explanationBn": "Attribute, Column এবং Field একই জিনিসকে বোঝায়।"
  },
  {
    "id": "t2_q21",
    "question": "Which of the following terms is a synonym for 'Tuple'?",
    "options": [
      "Row / Record / Entity Instance",
      "Column / Attribute",
      "Data Type",
      "Index"
    ],
    "answer": "Row / Record / Entity Instance",
    "explanation": "Tuple, Row, and Record all refer to the horizontal collection of attribute values for a single entity instance.",
    "explanationBn": "Tuple, Row এবং Record একই অর্থ বহন করে।"
  },
  {
    "id": "t2_q22",
    "question": "Which of the following terms is a synonym for 'Relation'?",
    "options": [
      "Table / Entity Set",
      "Row / Tuple",
      "Column / Attribute",
      "Primary Key"
    ],
    "answer": "Table / Entity Set",
    "explanation": "In RDBMS terminology, Relation, Table, and Entity Set are synonymous terms.",
    "explanationBn": "Relation এবং Table একই অর্থ প্রকাশ করে।"
  },
  {
    "id": "t2_q23",
    "question": "What is an 'Atomic Value' in SQL?",
    "options": [
      "A value that cannot be divided further into smaller meaningful components within the relational model",
      "A value derived from nuclear physics",
      "A number that has an exponent",
      "A text string with no vowels"
    ],
    "answer": "A value that cannot be divided further into smaller meaningful components within the relational model",
    "explanation": "Atomic means indivisible (e.g. integer 45, date '2026-10-08', or single name string).",
    "explanationBn": "Atomic Value হলো এমন একটি মান যাকে আর কোনো ক্ষুদ্রতর অংশে বিভক্ত করা যায় না।"
  },
  {
    "id": "t2_q24",
    "question": "In the relation `STUDENT(RollNo, Name, Marks)`, what is the domain of `RollNo` if roll numbers are positive integers up to 100?",
    "options": [
      "The set of integers $\\{1, 2, 3, ..., 100\\}$",
      "The set of all English alphabets",
      "The set of floating-point decimal numbers",
      "Any negative integer"
    ],
    "answer": "The set of integers $\\{1, 2, 3, ..., 100\\}$",
    "explanation": "The domain specifies the exact range of permissible values for that attribute.",
    "explanationBn": "`RollNo`-এর Domain হলো ১ থেকে ১০০ পর্যন্ত ধনাত্মক পূর্ণসংখ্যার সেট।"
  },
  {
    "id": "t2_q25",
    "question": "Who is recognized as the father of the Relational Database Model?",
    "options": [
      "Dr. Edgar Frank Codd (E.F. Codd)",
      "Charles Babbage",
      "Alan Turing",
      "Dennis Ritchie"
    ],
    "answer": "Dr. Edgar Frank Codd (E.F. Codd)",
    "explanation": "Dr. E.F. Codd published his seminal paper 'A Relational Model of Data for Large Shared Data Banks' in June 1970 while working at IBM.",
    "explanationBn": "ডঃ এডগার ফ্রাঙ্ক কড (E.F. Codd) ১৯৭০ সালে রিলেশনাল ডেটাবেস মডেল উদ্ভাবন করেন।"
  }
];
