export default [
  {
    "id": 1,
    "question": "What is the primary purpose of a 'Key' in a Relational Database Management System?",
    "options": [
      "To uniquely identify a tuple (row) in a relation and establish relationships between tables",
      "To lock the computer room after school",
      "To encrypt text files on floppy disks",
      "To format computer monitors"
    ],
    "correctAnswer": 0,
    "explanation": "Keys uniquely identify records, prevent duplicate rows (Entity Integrity), and link tables together via foreign keys (Referential Integrity).",
    "hint": "Unique identification of tuples and linking tables."
  },
  {
    "id": 2,
    "question": "Why cannot an RDBMS rely solely on real-world names (like 'StudentName' or 'CustomerName') to uniquely identify records?",
    "options": [
      "Multiple people can share the exact identical name (e.g. multiple students named 'Rahul Sharma')",
      "Names are too long to store in memory",
      "Names change every day",
      "Names cannot be written in English"
    ],
    "correctAnswer": 0,
    "explanation": "Names are non-unique; two students or customers frequently share the same first and last name, leading to severe ambiguity and incorrect updates.",
    "hint": "Multiple people often share identical names."
  },
  {
    "id": 3,
    "question": "What is a 'Super Key' in relational database theory?",
    "options": [
      "A set of one or more attributes that, taken collectively, uniquely identifies a tuple in a relation",
      "A key that gives administrator passwords",
      "A key on the keyboard like Shift or Ctrl",
      "A key that deletes tables"
    ],
    "correctAnswer": 0,
    "explanation": "A Super Key is any attribute combination that uniquely distinguishes every row. Adding extra attributes to a super key still leaves it a super key.",
    "hint": "Any set of attributes that uniquely identifies a row."
  },
  {
    "id": 4,
    "question": "In relation STUDENT(RollNo, Name, Class, Email), if RollNo is unique, which of the following is also a valid Super Key?",
    "options": [
      "(RollNo, Name) and (RollNo, Class, Email)",
      "Only Name by itself",
      "Only Class by itself",
      "(Name, Class)"
    ],
    "correctAnswer": 0,
    "explanation": "Any superset of a unique identifier is mathematically a Super Key; since RollNo is unique, (RollNo, Name) uniquely identifies each row.",
    "hint": "Any combination containing RollNo is a Super Key."
  },
  {
    "id": 5,
    "question": "What distinguishes a 'Candidate Key' from a general 'Super Key'?",
    "options": [
      "A Candidate Key is a MINIMAL Super Key (it contains no redundant or unnecessary attributes)",
      "A Candidate Key allows duplicate values",
      "A Candidate Key can only be text",
      "A Candidate Key is chosen by government elections"
    ],
    "correctAnswer": 0,
    "explanation": "A Candidate Key is a minimal super key: no proper subset can uniquely identify the tuple. Removing any attribute destroys uniqueness.",
    "hint": "A minimal super key with zero redundant attributes."
  },
  {
    "id": 6,
    "question": "In the relation STUDENT(RollNo, Name, Phone), if (RollNo, Name) uniquely identifies each tuple, why is it NOT a candidate key if RollNo alone is unique?",
    "options": [
      "Because 'Name' is redundant; RollNo alone is sufficient for unique identification, violating minimality",
      "Because Name contains letters",
      "Because RollNo is a number",
      "Because Student is a school table"
    ],
    "correctAnswer": 0,
    "explanation": "Candidate keys must be minimal. Since RollNo alone is unique, adding 'Name' introduces a redundant attribute, making it a super key but not a candidate key.",
    "hint": "Violates the minimality property due to redundant 'Name'."
  },
  {
    "id": 7,
    "question": "What real-world identifier is used by the Government of India as a unique key for all citizens in national databases?",
    "options": [
      "Aadhaar Number (UIDAI 12-digit number)",
      "First Name",
      "City of residence",
      "Favorite sports team"
    ],
    "correctAnswer": 0,
    "explanation": "Aadhaar is a 12-digit unique biometric identification number assigned to every Indian resident, acting as a national primary/unique key.",
    "hint": "12-digit unique biometric number."
  },
  {
    "id": 8,
    "question": "What real-world unique key is used by the Income Tax Department to track financial transactions across India?",
    "options": [
      "PAN (Permanent Account Number)",
      "Pin code",
      "House number",
      "Birth month"
    ],
    "correctAnswer": 0,
    "explanation": "PAN is a 10-character alphanumeric unique identifier issued by the Income Tax Department to identify taxpayers.",
    "hint": "10-character alphanumeric Permanent Account Number."
  },
  {
    "id": 9,
    "question": "What is a 'Composite Key' in relational database design?",
    "options": [
      "A key that consists of two or more attributes combined together to achieve unique identification",
      "A key made of plastic and metal",
      "A key that only works on weekends",
      "A key that stores images"
    ],
    "correctAnswer": 0,
    "explanation": "When no single attribute is unique, two or more attributes (e.g. OrderNo + ItemNo) are combined to form a Composite Key.",
    "hint": "Key made of two or more combined attributes."
  },
  {
    "id": 10,
    "question": "In a table ATTENDANCE(StudentId, Date, Status), which attribute combination serves as the Composite Primary Key?",
    "options": [
      "(StudentId, Date)",
      "Status alone",
      "StudentId alone",
      "Date alone"
    ],
    "correctAnswer": 0,
    "explanation": "A student can attend on multiple dates, and multiple students attend on the same date. The combination (StudentId, Date) uniquely identifies each attendance log.",
    "hint": "Pair of StudentId and Date."
  },
  {
    "id": 11,
    "question": "What critical database rule requires that every table must have a primary key and that no part of the primary key can be NULL?",
    "options": [
      "Entity Integrity Constraint",
      "Referential Integrity Constraint",
      "Domain Constraint",
      "Security Constraint"
    ],
    "correctAnswer": 0,
    "explanation": "Entity Integrity mandates that every base relation must possess a primary key, and primary key values must be unique and NOT NULL.",
    "hint": "Entity Integrity requires non-null, unique primary keys."
  },
  {
    "id": 12,
    "question": "What would happen if an RDBMS allowed NULL values in a Primary Key attribute?",
    "options": [
      "The DBMS would be unable to distinguish or uniquely locate tuples having NULL, violating identity guarantees",
      "The table would run faster",
      "Computers would turn off",
      "The text would become italic"
    ],
    "correctAnswer": 0,
    "explanation": "NULL represents an unknown value. If two rows have NULL in their primary key, they cannot be differentiated or indexed.",
    "hint": "Unknown values cannot guarantee unique identification."
  },
  {
    "id": 13,
    "question": "In a CBSE 1-mark question: 'Can a relation have more than one Super Key?'",
    "options": [
      "Yes, a relation can have multiple super keys",
      "No, exactly one super key is permitted per database",
      "Only if the table has fewer than 5 columns",
      "Only on Saturdays"
    ],
    "correctAnswer": 0,
    "explanation": "A relation typically has many super keys (e.g. RollNo, (RollNo, Name), (RollNo, Phone), (RollNo, Name, Phone), etc.).",
    "hint": "Every combination including a unique attribute is a super key."
  },
  {
    "id": 14,
    "question": "Can a relation have more than one Candidate Key?",
    "options": [
      "Yes, a relation can have multiple candidate keys (e.g. RollNo, AdmissionNo, and Email can all be candidate keys)",
      "No, a table can only have one candidate key",
      "Only if the table is empty",
      "Only in Python"
    ],
    "correctAnswer": 0,
    "explanation": "A table can possess several candidate keys (e.g. AdmissionNo, RollNo, AadhaarNo); one is chosen as Primary Key, and the rest become Alternate Keys.",
    "hint": "Multiple columns can qualify as candidate keys."
  },
  {
    "id": 15,
    "question": "What happens when an application attempts to insert a duplicate value into a column designated as a PRIMARY KEY?",
    "options": [
      "The DBMS immediately rejects the insertion with a 'Duplicate entry for key PRIMARY' error",
      "The existing row is overwritten automatically",
      "The duplicate value is changed to NULL",
      "The table is deleted"
    ],
    "correctAnswer": 0,
    "explanation": "The DBMS engine strictly enforces primary key uniqueness and immediately aborts any transaction attempting to insert a duplicate value.",
    "hint": "Insertion rejected with duplicate key error."
  },
  {
    "id": 16,
    "question": "In an e-commerce database, what unique key identifies a specific product globally in retail inventory systems?",
    "options": [
      "UPC / Barcode (or SKU / ISBN for books)",
      "Customer name",
      "Delivery truck license plate",
      "Cardboard box color"
    ],
    "correctAnswer": 0,
    "explanation": "Standard global keys like Universal Product Code (UPC), SKU, or ISBN for books guarantee unique item identification.",
    "hint": "Barcode or ISBN."
  },
  {
    "id": 17,
    "question": "In banking databases, why is 'AccountNumber' used as the primary key rather than 'CustomerPhoneNumber'?",
    "options": [
      "Phone numbers change frequently, can be ported or reassigned, while AccountNumber is permanently immutable and uniquely tied to the account",
      "Phone numbers are too long",
      "Banks do not know phone numbers",
      "Account numbers are written in letters"
    ],
    "correctAnswer": 0,
    "explanation": "Primary keys should be stable and immutable. Phone numbers can be deactivated, reassigned, or shared by family members.",
    "hint": "Account numbers are permanent and immutable."
  },
  {
    "id": 18,
    "question": "Which of the following properties is MOST desirable when selecting a key for a relation?",
    "options": [
      "Uniqueness, Immutability (rarely or never changes), and Minimality",
      "Long descriptive text that changes every week",
      "Containing multiple NULL values",
      "Depending on weather conditions"
    ],
    "correctAnswer": 0,
    "explanation": "An ideal key is guaranteed unique, minimal (fewest columns), and immutable (does not change over time).",
    "hint": "Unique, minimal, and immutable."
  },
  {
    "id": 19,
    "question": "What role do keys play in establishing relational relationships between different tables?",
    "options": [
      "The primary key of a parent table is referenced by a Foreign Key in a child table, linking the two relations together",
      "Keys lock the tables so no queries can run",
      "Keys convert tables into HTML pages",
      "Keys encrypt the computer hard drive"
    ],
    "correctAnswer": 0,
    "explanation": "Relations are connected by placing the primary key of the parent table into the child table as a foreign key.",
    "hint": "Foreign keys reference primary keys to link tables."
  },
  {
    "id": 20,
    "question": "In relation VEHICLE(RegNo, EngineNo, ChassisNo, OwnerName), which attributes are potential Candidate Keys?",
    "options": [
      "RegNo, EngineNo, and ChassisNo (each is individually unique)",
      "Only OwnerName",
      "Only the color of the vehicle",
      "The price of the vehicle"
    ],
    "correctAnswer": 0,
    "explanation": "Registration Number, Engine Number, and Chassis Number are all unique to a single vehicle and qualify as Candidate Keys.",
    "hint": "RegNo, EngineNo, ChassisNo are each unique."
  },
  {
    "id": 21,
    "question": "If a table has 4 candidate keys, how many of them can be chosen as the PRIMARY KEY?",
    "options": [
      "Exactly ONE candidate key is chosen as the Primary Key",
      "All 4 must be primary keys",
      "Zero primary keys",
      "Any even number"
    ],
    "correctAnswer": 0,
    "explanation": "A table can have multiple candidate keys, but exactly ONE is selected as the Primary Key. The remaining candidate keys become Alternate Keys.",
    "hint": "Only one candidate key is chosen as Primary Key."
  },
  {
    "id": 22,
    "question": "What term describes the candidate keys that were NOT chosen as the primary key?",
    "options": [
      "Alternate Keys (or Secondary Keys)",
      "Foreign Keys",
      "Null Keys",
      "Superfluous Keys"
    ],
    "correctAnswer": 0,
    "explanation": "Candidate keys that are not selected as the primary key are designated as Alternate Keys.",
    "hint": "Alternate Keys."
  },
  {
    "id": 23,
    "question": "In CBSE board questions, what is the fundamental difference between a Super Key and a Candidate Key?",
    "options": [
      "All candidate keys are super keys, but not all super keys are candidate keys (candidate keys must be minimal)",
      "Super keys only contain numbers",
      "Candidate keys only contain text",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "A Candidate Key is a minimal Super Key. A super key may contain extraneous attributes (e.g. (RollNo, Name)), while a candidate key contains zero redundant attributes.",
    "hint": "Candidate key is a minimal super key."
  },
  {
    "id": 24,
    "question": "Why does an RDBMS automatically build an index (such as a B-Tree) on primary key attributes?",
    "options": [
      "To enable lightning-fast row lookups and enforce instant uniqueness checking without scanning the entire table",
      "To make the file size larger",
      "To prevent users from opening the database",
      "To play music when queries run"
    ],
    "correctAnswer": 0,
    "explanation": "Indexes provide O(log N) search speed, allowing instant verification of uniqueness during INSERT and rapid retrieval during SELECT.",
    "hint": "Fast O(log N) search and instant uniqueness validation."
  },
  {
    "id": 25,
    "question": "In summary, what is the hierarchy of relational keys from broadest to most specific?",
    "options": [
      "Super Key (broadest) -> Candidate Key (minimal) -> Primary Key (chosen identifier)",
      "Primary Key -> Candidate Key -> Super Key",
      "Foreign Key -> Primary Key -> Super Key",
      "Null Key -> Alternate Key -> Master Key"
    ],
    "correctAnswer": 0,
    "explanation": "Hierarchy: Super Keys (all unique combinations) -> Candidate Keys (minimal super keys) -> Primary Key (the single chosen candidate key).",
    "hint": "Super Key -> Candidate Key -> Primary Key."
  }
];
