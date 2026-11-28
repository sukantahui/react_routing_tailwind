export default [
  {
    "id": 1,
    "question": "What is the formal definition of an 'Alternate Key' in the Relational Data Model?",
    "options": [
      "A Candidate Key that is NOT chosen as the Primary Key of the relation",
      "A key used when the computer runs on alternate current (AC)",
      "A key that alternates between numbers and text",
      "A foreign key that connects three tables"
    ],
    "correctAnswer": 0,
    "explanation": "An Alternate Key (or secondary key) is simply any candidate key that was not selected by the database designer to serve as the Primary Key.",
    "hint": "Candidate key not chosen as the Primary Key."
  },
  {
    "id": 2,
    "question": "What is the mathematical relationship between Candidate Keys, Primary Key, and Alternate Keys?",
    "options": [
      "Alternate Keys = (All Candidate Keys) - (Primary Key)",
      "Alternate Keys = Primary Key * 2",
      "Candidate Keys = Alternate Keys - Primary Key",
      "Primary Key = Candidate Keys + Alternate Keys"
    ],
    "correctAnswer": 0,
    "explanation": "From the set of all Candidate Keys, exactly one is chosen as Primary Key; all the remaining candidate keys form the set of Alternate Keys.",
    "hint": "Candidate Keys minus the Primary Key."
  },
  {
    "id": 3,
    "question": "A relation STUDENT has three candidate keys: AdmNo, RollNo, and AadhaarNo. If AdmNo is chosen as the Primary Key, what are the Alternate Keys?",
    "options": [
      "RollNo and AadhaarNo",
      "Only RollNo",
      "Only AadhaarNo",
      "AdmNo and RollNo"
    ],
    "correctAnswer": 0,
    "explanation": "Since AdmNo is the Primary Key, the remaining two unchosen candidate keys (RollNo and AadhaarNo) become Alternate Keys.",
    "hint": "The two remaining unchosen candidate keys."
  },
  {
    "id": 4,
    "question": "If a relation has exactly ONE candidate key, how many Alternate Keys does it have?",
    "options": [
      "Zero alternate keys",
      "One alternate key",
      "Two alternate keys",
      "Infinite alternate keys"
    ],
    "correctAnswer": 0,
    "explanation": "If only 1 candidate key exists, it must be chosen as the Primary Key, leaving zero alternate keys.",
    "hint": "1 candidate key - 1 primary key = 0 alternate keys."
  },
  {
    "id": 5,
    "question": "If a relation has 4 candidate keys, how many Alternate Keys will it possess?",
    "options": [
      "Exactly 3 alternate keys (4 - 1)",
      "4 alternate keys",
      "1 alternate key",
      "0 alternate keys"
    ],
    "correctAnswer": 0,
    "explanation": "Exactly one candidate key is selected as Primary Key, leaving 4 - 1 = 3 Alternate Keys.",
    "hint": "4 - 1 = 3."
  },
  {
    "id": 6,
    "question": "Can an Alternate Key uniquely identify a tuple in a relation?",
    "options": [
      "Yes, because every alternate key was originally a candidate key, it possesses full uniqueness guarantees",
      "No, alternate keys have duplicates",
      "Only if the table has fewer than 10 rows",
      "Only in MySQL"
    ],
    "correctAnswer": 0,
    "explanation": "Alternate keys are candidate keys; they are fully capable of uniquely identifying every record, even though they weren't chosen as the primary key.",
    "hint": "Yes, alternate keys have full uniqueness guarantees."
  },
  {
    "id": 7,
    "question": "How is an Alternate Key typically declared and enforced in an SQL CREATE TABLE statement?",
    "options": [
      "Using the UNIQUE constraint (e.g. AadhaarNo VARCHAR(12) UNIQUE)",
      "Using the ALTERNATE KEY constraint",
      "Using the SECONDARY constraint",
      "Using the OTHER KEY constraint"
    ],
    "correctAnswer": 0,
    "explanation": "SQL does not have an 'ALTERNATE KEY' keyword; alternate keys are enforced using the 'UNIQUE' constraint.",
    "hint": "Enforced via the UNIQUE constraint in SQL."
  },
  {
    "id": 8,
    "question": "In table EMPLOYEE(EmpId, PAN, PassportNo, Name). EmpId is the Primary Key. PAN and PassportNo are Candidate Keys. Which term describes PAN and PassportNo?",
    "options": [
      "Alternate Keys",
      "Foreign Keys",
      "Composite Keys",
      "Primary Keys"
    ],
    "correctAnswer": 0,
    "explanation": "Unselected candidate keys (PAN and PassportNo) are the Alternate Keys of the table.",
    "hint": "Unselected candidate keys are Alternate Keys."
  },
  {
    "id": 9,
    "question": "What is another common name used in database literature for an Alternate Key?",
    "options": [
      "Secondary Key",
      "Super Key",
      "Foreign Key",
      "Master Key"
    ],
    "correctAnswer": 0,
    "explanation": "Alternate keys are also frequently referred to as Secondary Keys.",
    "hint": "Secondary Key."
  },
  {
    "id": 10,
    "question": "In a CBSE 2-mark question: 'Table ITEM has columns ItemNo, ItemCode, ItemName, Price. ItemNo and ItemCode are both candidate keys. If ItemNo is primary key, identify the alternate key.'",
    "options": [
      "ItemCode",
      "ItemName",
      "Price",
      "ItemNo"
    ],
    "correctAnswer": 0,
    "explanation": "ItemCode is the unselected candidate key, making it the alternate key.",
    "hint": "The unselected candidate key is ItemCode."
  },
  {
    "id": 11,
    "question": "Can an Alternate Key contain NULL values if defined only with the UNIQUE constraint in SQL?",
    "options": [
      "Yes, in SQL a UNIQUE column permits NULL values unless an explicit NOT NULL constraint is also added",
      "No, alternate keys can never be null",
      "Only on Linux",
      "Only if the table is empty"
    ],
    "correctAnswer": 0,
    "explanation": "In SQL standards, UNIQUE allows NULL values unless NOT NULL is explicitly declared alongside it.",
    "hint": "UNIQUE permits NULL unless NOT NULL is also specified."
  },
  {
    "id": 12,
    "question": "Can a Foreign Key in another table reference an Alternate Key (a UNIQUE column) instead of a Primary Key?",
    "options": [
      "Yes, SQL foreign keys can reference any column with a UNIQUE constraint (an alternate key)",
      "No, foreign keys can ONLY reference primary keys",
      "Only in SQLite",
      "Never"
    ],
    "correctAnswer": 0,
    "explanation": "Under ANSI SQL standards, foreign keys can reference any unique candidate key (Primary Key or Alternate Key with UNIQUE constraint).",
    "hint": "Foreign keys can reference any unique candidate key."
  },
  {
    "id": 13,
    "question": "Why does a database designer retain Alternate Keys with UNIQUE constraints instead of leaving them unconstrained?",
    "options": [
      "To prevent duplicate entries and maintain real-world business integrity (e.g. ensuring no two students get the same RollNo or Email)",
      "To make queries slower",
      "To increase electricity consumption",
      "To force users to change passwords"
    ],
    "correctAnswer": 0,
    "explanation": "Enforcing UNIQUE on alternate keys prevents duplicate entries for critical business identifiers like emails, phone numbers, or passport numbers.",
    "hint": "Prevents duplicate entries on real-world unique identifiers."
  },
  {
    "id": 14,
    "question": "In relation VEHICLE(RegNo, EngineNo, ChassisNo, Owner). If RegNo is chosen as Primary Key, how many Alternate Keys exist?",
    "options": [
      "2 Alternate Keys: EngineNo and ChassisNo",
      "1 Alternate Key",
      "3 Alternate Keys",
      "0 Alternate Keys"
    ],
    "correctAnswer": 0,
    "explanation": "EngineNo and ChassisNo are both unique candidate keys that were not chosen as the primary key, so they are the 2 alternate keys.",
    "hint": "EngineNo and ChassisNo are the 2 unselected candidate keys."
  },
  {
    "id": 15,
    "question": "In a CBSE question: 'Is the Primary Key of a table also considered an Alternate Key?'",
    "options": [
      "No, by definition, alternate keys are the candidate keys EXCLUDING the primary key",
      "Yes, they are identical",
      "Only if the primary key is composite",
      "Only on Sundays"
    ],
    "correctAnswer": 0,
    "explanation": "The sets of Primary Key and Alternate Keys are mutually disjoint; once a key is chosen as Primary, it is not an Alternate Key.",
    "hint": "Primary Key and Alternate Keys are mutually exclusive."
  },
  {
    "id": 16,
    "question": "If a student drops the primary key using ALTER TABLE and designates an alternate key as the new primary key, what happens to the old primary key?",
    "options": [
      "The old primary key becomes an alternate key (if it retains uniqueness)",
      "The table is deleted",
      "The old key is converted to a foreign key automatically",
      "The computer restarts"
    ],
    "correctAnswer": 0,
    "explanation": "Roles swap: the newly selected key becomes the Primary Key, and the former primary key becomes an Alternate Key.",
    "hint": "Roles swap between candidate keys."
  },
  {
    "id": 17,
    "question": "Can an Alternate Key be a Composite Key (multiple columns)?",
    "options": [
      "Yes, if an unselected candidate key is composite (e.g. (DepartmentId, RoomNo)), it serves as a composite alternate key",
      "No, alternate keys can only be 1 column",
      "Only in NoSQL",
      "Never"
    ],
    "correctAnswer": 0,
    "explanation": "Any candidate key (single or composite) that is not chosen as primary key functions as an alternate key.",
    "hint": "Composite candidate keys can be alternate keys."
  },
  {
    "id": 18,
    "question": "In table BANK_CUSTOMER(CustId, PAN, AadhaarNo, Phone, Name). Primary key is CustId. If PAN and AadhaarNo are unique, identify the alternate keys.",
    "options": [
      "PAN and AadhaarNo",
      "Phone and Name",
      "CustId and PAN",
      "Only Name"
    ],
    "correctAnswer": 0,
    "explanation": "CustId is primary key; the remaining unique candidate keys are PAN and AadhaarNo.",
    "hint": "PAN and AadhaarNo are the unchosen unique keys."
  },
  {
    "id": 19,
    "question": "Why are alternate keys important in indexing and query optimization?",
    "options": [
      "RDBMS engines create secondary unique B-tree indexes for alternate keys, accelerating queries that search by alternate key attributes",
      "They prevent queries from running",
      "They convert SQL to JavaScript",
      "They double the table cardinality"
    ],
    "correctAnswer": 0,
    "explanation": "Secondary indexes on alternate keys allow rapid O(log N) lookups when querying by email, passport number, or PAN.",
    "hint": "Secondary indexes accelerate lookups on alternate keys."
  },
  {
    "id": 20,
    "question": "In a CBSE 1-mark question: 'Define Alternate Key with a suitable example.'",
    "options": [
      "An alternate key is any candidate key not selected as the primary key. Example: In table Student(AdmNo, RollNo, Name), if AdmNo is Primary Key, RollNo is Alternate Key.",
      "An alternate key is a key on the computer keyboard like the Alt key",
      "An alternate key is an encrypted password",
      "An alternate key is an empty column"
    ],
    "correctAnswer": 0,
    "explanation": "State definition (unchosen candidate key) and give a clean example showing a table with two candidate keys and the primary key identified.",
    "hint": "Definition + clear table example showing primary vs alternate key."
  },
  {
    "id": 21,
    "question": "Can an alternate key have duplicate values in any two rows of a table?",
    "options": [
      "No, because it is a candidate key, all non-null values in an alternate key must be strictly unique",
      "Yes, alternate keys allow duplicates",
      "Yes, up to 5 duplicates",
      "Only if the name is identical"
    ],
    "correctAnswer": 0,
    "explanation": "Alternate keys are candidate keys; uniqueness is a strict requirement.",
    "hint": "Uniqueness is mandatory for all candidate/alternate keys."
  },
  {
    "id": 22,
    "question": "If all candidate keys of a relation are listed, which set operation yields the Alternate Keys?",
    "options": [
      "Candidate_Keys - {Primary_Key}",
      "Candidate_Keys ∩ {Primary_Key}",
      "Candidate_Keys ∪ {Primary_Key}",
      "Candidate_Keys * {Primary_Key}"
    ],
    "correctAnswer": 0,
    "explanation": "Set difference: Candidate Keys minus the chosen Primary Key equals the set of Alternate Keys.",
    "hint": "Set difference: Candidate Keys minus Primary Key."
  },
  {
    "id": 23,
    "question": "In table TEACHER(TId, Email, Phone, Name). TId is Primary Key. Email is unique. Phone is unique. How many Alternate Keys exist?",
    "options": [
      "2 Alternate Keys (Email and Phone)",
      "1 Alternate Key",
      "3 Alternate Keys",
      "0 Alternate Keys"
    ],
    "correctAnswer": 0,
    "explanation": "TId is Primary Key. The remaining 2 candidate keys (Email, Phone) are Alternate Keys.",
    "hint": "Two alternate keys: Email and Phone."
  },
  {
    "id": 24,
    "question": "What is the primary difference between Primary Key and Alternate Key from an architectural standpoint?",
    "options": [
      "The Primary Key is the default official identifier chosen for entity integrity and foreign key targeting; Alternate Keys are secondary unique constraints",
      "Primary key uses numbers and alternate key uses letters",
      "Primary key is temporary and alternate key is permanent",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "Primary Key is the primary row identifier and main foreign key target; Alternate Keys provide secondary uniqueness enforcement.",
    "hint": "Primary Key is the main row identifier; Alternate Keys are secondary unique keys."
  },
  {
    "id": 25,
    "question": "In summary, what is the single most essential rule regarding Alternate Keys in CBSE examinations?",
    "options": [
      "Alternate Keys are candidate keys not chosen as the primary key: Alternate Keys = Candidate Keys - Primary Key",
      "Alternate Keys must be foreign keys",
      "Every table must have at least 5 alternate keys",
      "Alternate keys are created with the DROP command"
    ],
    "correctAnswer": 0,
    "explanation": "Core definition: Alternate Keys = Candidate Keys - Primary Key.",
    "hint": "Alternate Keys = Candidate Keys - Primary Key."
  }
];
