export default [
  {
    "id": 1,
    "question": "What is the formal definition of a 'Candidate Key' in the Relational Data Model?",
    "options": [
      "A minimal Super Key that uniquely identifies each tuple in a relation with no redundant attributes",
      "Any column that contains numbers",
      "A key chosen by democratic voting among users",
      "A key that can only hold NULL values"
    ],
    "correctAnswer": 0,
    "explanation": "A Candidate Key is defined as a minimal super key; it possesses the uniqueness property, and no proper subset of its attributes can uniquely identify tuples.",
    "hint": "A minimal super key with zero redundant attributes."
  },
  {
    "id": 2,
    "question": "What does the 'Minimality' property of a candidate key mean?",
    "options": [
      "If any attribute is removed from the candidate key, the remaining set of attributes can no longer uniquely identify all tuples",
      "The key must contain less than 3 letters",
      "The numbers must be minimal like 0 and 1",
      "The key must be stored in lowercase"
    ],
    "correctAnswer": 0,
    "explanation": "Minimality means non-redundancy: every attribute in a candidate key is strictly necessary for unique identification. Removing any attribute destroys uniqueness.",
    "hint": "Removing any component attribute destroys the uniqueness guarantee."
  },
  {
    "id": 3,
    "question": "Given relation STUDENT(AdmNo, RollNo, Name, Class). If AdmNo is unique and RollNo is unique within a Class, which of the following is a Candidate Key?",
    "options": [
      "AdmNo (and (Class, RollNo))",
      "(AdmNo, Name)",
      "(AdmNo, RollNo, Name)",
      "Name alone"
    ],
    "correctAnswer": 0,
    "explanation": "AdmNo is unique by itself (minimal), so it is a candidate key. (AdmNo, Name) has a redundant attribute, making it a super key but NOT a candidate key.",
    "hint": "AdmNo is unique and contains no redundant attributes."
  },
  {
    "id": 4,
    "question": "Why is (AdmNo, Name) NOT considered a Candidate Key if AdmNo alone uniquely identifies every student?",
    "options": [
      "Because 'Name' is a redundant attribute, violating the minimality condition of candidate keys",
      "Because Name contains letters",
      "Because AdmNo is a number",
      "Because AdmNo is too long"
    ],
    "correctAnswer": 0,
    "explanation": "Since AdmNo alone guarantees uniqueness, adding Name adds unnecessary overhead. A candidate key must be minimal (no proper subset can be unique).",
    "hint": "Violates minimality because AdmNo alone is already unique."
  },
  {
    "id": 5,
    "question": "In a CBSE 1-mark question: 'How many candidate keys can a relation possess?'",
    "options": [
      "One or more candidate keys (a relation can have multiple candidate keys)",
      "Strictly only one candidate key",
      "Zero candidate keys",
      "Always an even number"
    ],
    "correctAnswer": 0,
    "explanation": "A table can have several candidate keys (e.g. AdmissionNo, RollNo, Email, AadhaarNo can all be candidate keys in a student table).",
    "hint": "A table can possess multiple candidate keys."
  },
  {
    "id": 6,
    "question": "In relation EMPLOYEE(EmpId, PassportNo, PAN, Name, Salary), how many Candidate Keys exist if EmpId, PassportNo, and PAN are all unique?",
    "options": [
      "Three candidate keys: EmpId, PassportNo, and PAN",
      "Only one candidate key",
      "Five candidate keys",
      "Zero candidate keys"
    ],
    "correctAnswer": 0,
    "explanation": "Each attribute that is individually unique and minimal qualifies as a separate candidate key. Thus EmpId, PassportNo, and PAN are 3 candidate keys.",
    "hint": "Each of the 3 unique attributes is a distinct candidate key."
  },
  {
    "id": 7,
    "question": "Can a Candidate Key be composed of multiple attributes (Composite Candidate Key)?",
    "options": [
      "Yes, if no single attribute is unique, a minimal combination of attributes can form a composite candidate key",
      "No, candidate keys must always be a single column",
      "Only in NoSQL databases",
      "Only if the columns are text"
    ],
    "correctAnswer": 0,
    "explanation": "When individual columns have duplicates, a combination (e.g. (FlightNo, DateOfDeparture)) can form a composite candidate key.",
    "hint": "Multiple attributes combined minimally can form a composite candidate key."
  },
  {
    "id": 8,
    "question": "In a relation ENROLLMENT(StudentId, CourseId, Grade), where students take multiple courses and courses have multiple students, what is the Candidate Key?",
    "options": [
      "(StudentId, CourseId)",
      "StudentId alone",
      "CourseId alone",
      "Grade alone"
    ],
    "correctAnswer": 0,
    "explanation": "Neither StudentId nor CourseId is unique alone; the pair (StudentId, CourseId) uniquely identifies each enrollment record minimally.",
    "hint": "The composite pair (StudentId, CourseId)."
  },
  {
    "id": 9,
    "question": "What is the relationship between Candidate Keys and Super Keys?",
    "options": [
      "Every Candidate Key is a Super Key, but not every Super Key is a Candidate Key",
      "Every Super Key is a Candidate Key",
      "They are mutually exclusive sets",
      "Super keys are made of candidate keys multiplied together"
    ],
    "correctAnswer": 0,
    "explanation": "All candidate keys satisfy uniqueness (super keys). But super keys may contain extra redundant attributes, disqualifying them from being candidate keys.",
    "hint": "Candidate keys are a minimal subset of super keys."
  },
  {
    "id": 10,
    "question": "Can an attribute participating in a Candidate Key contain NULL values?",
    "options": [
      "By standard relational definition, a candidate key chosen as primary key must not contain NULL; candidate keys should possess known values to ensure identification",
      "Yes, candidate keys can be all NULL",
      "Only in MySQL",
      "Only if the table has no rows"
    ],
    "correctAnswer": 0,
    "explanation": "Candidate keys must reliably identify records; NULL represents an unknown value and cannot guarantee distinct identification.",
    "hint": "Candidate keys require known, unique values."
  },
  {
    "id": 11,
    "question": "In a table ITEM with fields (ItemCode, Barcode, ItemName, Price). If ItemCode and Barcode are both unique, what are the candidate keys?",
    "options": [
      "ItemCode and Barcode are two separate candidate keys",
      "Only ItemName",
      "(ItemCode, Barcode) as a single pair only",
      "Price alone"
    ],
    "correctAnswer": 0,
    "explanation": "Both ItemCode and Barcode are individually unique and minimal; each forms an independent candidate key.",
    "hint": "Two separate minimal unique columns: ItemCode and Barcode."
  },
  {
    "id": 12,
    "question": "If a candidate key K = (A, B) is composite, which of the following statements must be TRUE?",
    "options": [
      "Neither A alone nor B alone can uniquely identify tuples in the relation",
      "Both A alone and B alone are unique",
      "A must be numeric and B must be text",
      "A and B must contain identical values"
    ],
    "correctAnswer": 0,
    "explanation": "If A alone were unique, B would be redundant, violating minimality! Therefore, neither component alone can be unique.",
    "hint": "Neither attribute alone can be unique, otherwise minimality is violated."
  },
  {
    "id": 13,
    "question": "In a CBSE exam question: 'Given table VOTER(VoterId, AadhaarNo, Name, Age). Identify the candidate keys.' What is the answer?",
    "options": [
      "VoterId and AadhaarNo",
      "Name and Age",
      "VoterId, AadhaarNo, Name, and Age all together",
      "Only Age"
    ],
    "correctAnswer": 0,
    "explanation": "Both VoterId and AadhaarNo are government-issued unique identifiers that uniquely identify a voter, making them the two candidate keys.",
    "hint": "The two unique identifiers: VoterId and AadhaarNo."
  },
  {
    "id": 14,
    "question": "What happens to the candidate keys of a relation when the database administrator selects one to be the Primary Key?",
    "options": [
      "The selected candidate key becomes the Primary Key; the remaining candidate keys become Alternate Keys",
      "All other candidate keys are deleted from the table",
      "The remaining candidate keys lose their uniqueness",
      "The table is split into two tables"
    ],
    "correctAnswer": 0,
    "explanation": "One candidate key is designated as the Primary Key, while all unchosen candidate keys are classified as Alternate Keys.",
    "hint": "One becomes Primary Key; the rest become Alternate Keys."
  },
  {
    "id": 15,
    "question": "Which of the following attribute sets from table BOOK(ISBN, Title, Author, Edition, Price) is the most suitable Candidate Key?",
    "options": [
      "ISBN (International Standard Book Number)",
      "Price",
      "Author",
      "Edition"
    ],
    "correctAnswer": 0,
    "explanation": "ISBN is the internationally standardized unique identifier assigned to each published book edition.",
    "hint": "International Standard Book Number."
  },
  {
    "id": 16,
    "question": "If table T has attributes (A, B, C) and no single attribute or pair of attributes is unique, what is the Candidate Key?",
    "options": [
      "The combination of all attributes (A, B, C) forms the composite candidate key (all-key relation)",
      "The table cannot exist",
      "Attribute A is forced to be unique",
      "The first row becomes the key"
    ],
    "correctAnswer": 0,
    "explanation": "In an 'all-key relation', every attribute is needed together to distinguish rows uniquely.",
    "hint": "All attributes together form the composite candidate key."
  },
  {
    "id": 17,
    "question": "Can an attribute with duplicate values in the existing data table ever be a Candidate Key by itself?",
    "options": [
      "No, a candidate key strictly requires every value in its column to be unique across all tuples",
      "Yes, if the duplicates are less than 5",
      "Yes, if the numbers are negative",
      "Only on Saturdays"
    ],
    "correctAnswer": 0,
    "explanation": "By definition, duplicate values violate uniqueness; an attribute with duplicates cannot serve as a candidate key alone.",
    "hint": "Uniqueness is non-negotiable for candidate keys."
  },
  {
    "id": 18,
    "question": "In relation ACCOUNT(AccNo, CustId, BranchCode, Balance), which attribute is the Candidate Key?",
    "options": [
      "AccNo (Account Number)",
      "CustId (a customer can have multiple accounts)",
      "BranchCode (a branch has thousands of accounts)",
      "Balance (multiple accounts have the same balance)"
    ],
    "correctAnswer": 0,
    "explanation": "Account Number uniquely identifies each specific bank account; customers, branches, and balances have duplicates.",
    "hint": "Account Number is unique for every account."
  },
  {
    "id": 19,
    "question": "What term describes the mathematical property that guarantees no two tuples in a relation have identical candidate key values?",
    "options": [
      "Uniqueness constraint",
      "Atomicity constraint",
      "Bandwidth constraint",
      "Serializability constraint"
    ],
    "correctAnswer": 0,
    "explanation": "The uniqueness constraint guarantees that every candidate key value identifies at most one single tuple.",
    "hint": "Uniqueness constraint."
  },
  {
    "id": 20,
    "question": "Why does the DBA examine candidate keys before choosing the Primary Key?",
    "options": [
      "To select the candidate key that is most compact, immutable, familiar to users, and optimal for indexing",
      "To pick the key with the longest name",
      "To choose the key that contains the word 'Key'",
      "Because SQL requires running a test"
    ],
    "correctAnswer": 0,
    "explanation": "The DBA evaluates candidate keys to choose the most efficient, stable, and natural identifier to serve as the Primary Key.",
    "hint": "Select the most compact, immutable, and practical candidate key."
  },
  {
    "id": 21,
    "question": "In a CBSE board question: 'State whether true or false: A candidate key can never be composite.'",
    "options": [
      "False, candidate keys can consist of multiple attributes if no single attribute is unique",
      "True, candidate keys must always be single attributes",
      "True only in Oracle",
      "True only on Linux"
    ],
    "correctAnswer": 0,
    "explanation": "False: Composite candidate keys (e.g. (RollNo, ExamId)) are widely used when single attributes are non-unique.",
    "hint": "False, composite candidate keys are very common."
  },
  {
    "id": 22,
    "question": "In table PATIENT(RegNo, AadhaarNo, Name, ContactNo), how many candidate keys can be identified if RegNo, AadhaarNo, and ContactNo are each unique?",
    "options": [
      "3 Candidate Keys: RegNo, AadhaarNo, and ContactNo",
      "1 Candidate Key",
      "4 Candidate Keys",
      "Zero Candidate Keys"
    ],
    "correctAnswer": 0,
    "explanation": "Any attribute that uniquely identifies patient records without redundant columns qualifies as a distinct candidate key.",
    "hint": "Each of the 3 unique columns is a candidate key."
  },
  {
    "id": 23,
    "question": "How does an RDBMS enforce candidate key constraints in SQL table definitions?",
    "options": [
      "Using the UNIQUE constraint or PRIMARY KEY constraint",
      "Using the ORDER BY clause",
      "Using the LIKE operator",
      "Using the AS keyword"
    ],
    "correctAnswer": 0,
    "explanation": "In SQL, candidate keys are declared as PRIMARY KEY (one key) and UNIQUE (remaining candidate keys).",
    "hint": "PRIMARY KEY and UNIQUE constraints."
  },
  {
    "id": 24,
    "question": "What is an 'Extraneous Attribute' in the context of key minimality?",
    "options": [
      "An unnecessary attribute in a super key whose removal does not affect the uniqueness of the remaining attributes",
      "An attribute imported from another database",
      "A column with no data",
      "An attribute with foreign language text"
    ],
    "correctAnswer": 0,
    "explanation": "If {A, B} is unique and {A} alone is also unique, then B is an extraneous (redundant) attribute.",
    "hint": "An unnecessary attribute whose removal preserves uniqueness."
  },
  {
    "id": 25,
    "question": "In summary, what two conditions MUST an attribute set satisfy to be a Candidate Key?",
    "options": [
      "1. Uniqueness (uniquely identifies all tuples) and 2. Minimality (no proper subset is unique)",
      "1. Must contain numbers and 2. Must be capitalized",
      "1. Must have zero rows and 2. Must be encrypted",
      "1. Must be foreign key and 2. Must be null"
    ],
    "correctAnswer": 0,
    "explanation": "The two non-negotiable formal conditions: Uniqueness (identifies every row) and Minimality (no redundant attributes).",
    "hint": "Uniqueness and Minimality."
  }
];
