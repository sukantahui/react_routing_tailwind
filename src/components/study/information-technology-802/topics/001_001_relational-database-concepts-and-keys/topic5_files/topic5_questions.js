export default [
  {
    "id": "t5_q1",
    "question": "What is a 'Candidate Key' in relational database design?",
    "options": [
      "A minimal superkey—a minimal set of attributes capable of uniquely identifying every tuple in a relation",
      "A key used to unlock computer laboratory doors",
      "A key generated randomly for each session",
      "Any column that has text data"
    ],
    "answer": "A minimal superkey—a minimal set of attributes capable of uniquely identifying every tuple in a relation",
    "explanation": "A candidate key possesses the properties of uniqueness and minimality.",
    "explanationBn": "Candidate Key হলো এমন একটি ন্যূনতম অ্যাট্রিবিউট সেট যা প্রতিটি রো-কে ইউনিকভাবে শনাক্ত করতে পারে।"
  },
  {
    "id": "t5_q2",
    "question": "What is the formula to determine the number of 'Alternate Keys' in a relation?",
    "options": [
      "Alternate Keys = Total Candidate Keys - Selected Primary Key",
      "Alternate Keys = Primary Key + Foreign Key",
      "Alternate Keys = Total Columns - Total Rows",
      "Alternate Keys = Candidate Keys × 2"
    ],
    "answer": "Alternate Keys = Total Candidate Keys - Selected Primary Key",
    "explanation": "All candidate keys that are not selected as the primary key automatically become Alternate Keys.",
    "explanationBn": "Primary Key বাদ দিয়ে বাকি সমস্ত Candidate Key-কে Alternate Key বলে।"
  },
  {
    "id": "t5_q3",
    "question": "What is a 'Composite Primary Key'?",
    "options": [
      "A primary key composed of two or more attributes combined together to guarantee uniqueness",
      "A primary key made of plastic",
      "A primary key with numbers and letters",
      "A primary key that changes automatically every day"
    ],
    "answer": "A primary key composed of two or more attributes combined together to guarantee uniqueness",
    "explanation": "Multiple columns (e.g. `(Class, Section, RollNumber)`) combine to form a composite primary key.",
    "explanationBn": "দুই বা ততোধিক কলাম যুক্ত করে গঠিত Primary Key-কে Composite Primary Key বলে।"
  },
  {
    "id": "t5_q4",
    "question": "In a Student table with attributes `(AdmissionNo, AadhaarNo, Email, FullName, DOB)`, where AdmissionNo, AadhaarNo, and Email are unique, and AdmissionNo is chosen as Primary Key: Which are the Alternate Keys?",
    "options": [
      "`{AadhaarNo, Email}`",
      "`{AdmissionNo, AadhaarNo}`",
      "`{FullName, DOB}`",
      "Only `AadhaarNo`"
    ],
    "answer": "`{AadhaarNo, Email}`",
    "explanation": "Subtracting Primary Key (`AdmissionNo`) leaves `{AadhaarNo, Email}` as Alternate Keys.",
    "explanationBn": "৩টি Candidate Key থেকে ১টি Primary Key বাদ দিলে ২টি Alternate Key থাকে।"
  },
  {
    "id": "t5_q5",
    "question": "Can a Primary Key column contain duplicate values or NULL values?",
    "options": [
      "No, Primary Keys strictly require UNIQUE and NOT NULL values",
      "Yes, duplicate values are allowed",
      "Yes, NULL values are allowed",
      "Only on test servers"
    ],
    "answer": "No, Primary Keys strictly require UNIQUE and NOT NULL values",
    "explanation": "Entity Integrity requires primary keys to be strictly UNIQUE and NOT NULL.",
    "explanationBn": "Primary Key কলামে কোনো ডুপ্লিকেট বা NULL মান গ্রহণযোগ্য নয়।"
  },
  {
    "id": "t5_q6",
    "question": "Relational Keys Review Question #6: Why must Primary Key satisfy Entity Integrity constraint #6?",
    "options": [
      "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#6)",
      "To allow duplicate rows",
      "To store numbers in base 16",
      "To encrypt passwords"
    ],
    "answer": "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#6)",
    "explanation": "Entity integrity prevents ambiguous or unreachable tuples in tables.",
    "explanationBn": "Entity Integrity প্রতিটি রো-কে সঠিকভাবে শনাক্ত করা নিশ্চিত করে।"
  },
  {
    "id": "t5_q7",
    "question": "Relational Keys Review Question #7: Why must Primary Key satisfy Entity Integrity constraint #7?",
    "options": [
      "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#7)",
      "To allow duplicate rows",
      "To store numbers in base 16",
      "To encrypt passwords"
    ],
    "answer": "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#7)",
    "explanation": "Entity integrity prevents ambiguous or unreachable tuples in tables.",
    "explanationBn": "Entity Integrity প্রতিটি রো-কে সঠিকভাবে শনাক্ত করা নিশ্চিত করে।"
  },
  {
    "id": "t5_q8",
    "question": "Relational Keys Review Question #8: Why must Primary Key satisfy Entity Integrity constraint #8?",
    "options": [
      "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#8)",
      "To allow duplicate rows",
      "To store numbers in base 16",
      "To encrypt passwords"
    ],
    "answer": "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#8)",
    "explanation": "Entity integrity prevents ambiguous or unreachable tuples in tables.",
    "explanationBn": "Entity Integrity প্রতিটি রো-কে সঠিকভাবে শনাক্ত করা নিশ্চিত করে।"
  },
  {
    "id": "t5_q9",
    "question": "Relational Keys Review Question #9: Why must Primary Key satisfy Entity Integrity constraint #9?",
    "options": [
      "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#9)",
      "To allow duplicate rows",
      "To store numbers in base 16",
      "To encrypt passwords"
    ],
    "answer": "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#9)",
    "explanation": "Entity integrity prevents ambiguous or unreachable tuples in tables.",
    "explanationBn": "Entity Integrity প্রতিটি রো-কে সঠিকভাবে শনাক্ত করা নিশ্চিত করে।"
  },
  {
    "id": "t5_q10",
    "question": "Relational Keys Review Question #10: Why must Primary Key satisfy Entity Integrity constraint #10?",
    "options": [
      "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#10)",
      "To allow duplicate rows",
      "To store numbers in base 16",
      "To encrypt passwords"
    ],
    "answer": "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#10)",
    "explanation": "Entity integrity prevents ambiguous or unreachable tuples in tables.",
    "explanationBn": "Entity Integrity প্রতিটি রো-কে সঠিকভাবে শনাক্ত করা নিশ্চিত করে।"
  },
  {
    "id": "t5_q11",
    "question": "Relational Keys Review Question #11: Why must Primary Key satisfy Entity Integrity constraint #11?",
    "options": [
      "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#11)",
      "To allow duplicate rows",
      "To store numbers in base 16",
      "To encrypt passwords"
    ],
    "answer": "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#11)",
    "explanation": "Entity integrity prevents ambiguous or unreachable tuples in tables.",
    "explanationBn": "Entity Integrity প্রতিটি রো-কে সঠিকভাবে শনাক্ত করা নিশ্চিত করে।"
  },
  {
    "id": "t5_q12",
    "question": "Relational Keys Review Question #12: Why must Primary Key satisfy Entity Integrity constraint #12?",
    "options": [
      "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#12)",
      "To allow duplicate rows",
      "To store numbers in base 16",
      "To encrypt passwords"
    ],
    "answer": "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#12)",
    "explanation": "Entity integrity prevents ambiguous or unreachable tuples in tables.",
    "explanationBn": "Entity Integrity প্রতিটি রো-কে সঠিকভাবে শনাক্ত করা নিশ্চিত করে।"
  },
  {
    "id": "t5_q13",
    "question": "Relational Keys Review Question #13: Why must Primary Key satisfy Entity Integrity constraint #13?",
    "options": [
      "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#13)",
      "To allow duplicate rows",
      "To store numbers in base 16",
      "To encrypt passwords"
    ],
    "answer": "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#13)",
    "explanation": "Entity integrity prevents ambiguous or unreachable tuples in tables.",
    "explanationBn": "Entity Integrity প্রতিটি রো-কে সঠিকভাবে শনাক্ত করা নিশ্চিত করে।"
  },
  {
    "id": "t5_q14",
    "question": "Relational Keys Review Question #14: Why must Primary Key satisfy Entity Integrity constraint #14?",
    "options": [
      "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#14)",
      "To allow duplicate rows",
      "To store numbers in base 16",
      "To encrypt passwords"
    ],
    "answer": "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#14)",
    "explanation": "Entity integrity prevents ambiguous or unreachable tuples in tables.",
    "explanationBn": "Entity Integrity প্রতিটি রো-কে সঠিকভাবে শনাক্ত করা নিশ্চিত করে।"
  },
  {
    "id": "t5_q15",
    "question": "Relational Keys Review Question #15: Why must Primary Key satisfy Entity Integrity constraint #15?",
    "options": [
      "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#15)",
      "To allow duplicate rows",
      "To store numbers in base 16",
      "To encrypt passwords"
    ],
    "answer": "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#15)",
    "explanation": "Entity integrity prevents ambiguous or unreachable tuples in tables.",
    "explanationBn": "Entity Integrity প্রতিটি রো-কে সঠিকভাবে শনাক্ত করা নিশ্চিত করে।"
  },
  {
    "id": "t5_q16",
    "question": "Relational Keys Review Question #16: Why must Primary Key satisfy Entity Integrity constraint #16?",
    "options": [
      "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#16)",
      "To allow duplicate rows",
      "To store numbers in base 16",
      "To encrypt passwords"
    ],
    "answer": "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#16)",
    "explanation": "Entity integrity prevents ambiguous or unreachable tuples in tables.",
    "explanationBn": "Entity Integrity প্রতিটি রো-কে সঠিকভাবে শনাক্ত করা নিশ্চিত করে।"
  },
  {
    "id": "t5_q17",
    "question": "Relational Keys Review Question #17: Why must Primary Key satisfy Entity Integrity constraint #17?",
    "options": [
      "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#17)",
      "To allow duplicate rows",
      "To store numbers in base 16",
      "To encrypt passwords"
    ],
    "answer": "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#17)",
    "explanation": "Entity integrity prevents ambiguous or unreachable tuples in tables.",
    "explanationBn": "Entity Integrity প্রতিটি রো-কে সঠিকভাবে শনাক্ত করা নিশ্চিত করে।"
  },
  {
    "id": "t5_q18",
    "question": "Relational Keys Review Question #18: Why must Primary Key satisfy Entity Integrity constraint #18?",
    "options": [
      "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#18)",
      "To allow duplicate rows",
      "To store numbers in base 16",
      "To encrypt passwords"
    ],
    "answer": "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#18)",
    "explanation": "Entity integrity prevents ambiguous or unreachable tuples in tables.",
    "explanationBn": "Entity Integrity প্রতিটি রো-কে সঠিকভাবে শনাক্ত করা নিশ্চিত করে।"
  },
  {
    "id": "t5_q19",
    "question": "Relational Keys Review Question #19: Why must Primary Key satisfy Entity Integrity constraint #19?",
    "options": [
      "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#19)",
      "To allow duplicate rows",
      "To store numbers in base 16",
      "To encrypt passwords"
    ],
    "answer": "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#19)",
    "explanation": "Entity integrity prevents ambiguous or unreachable tuples in tables.",
    "explanationBn": "Entity Integrity প্রতিটি রো-কে সঠিকভাবে শনাক্ত করা নিশ্চিত করে।"
  },
  {
    "id": "t5_q20",
    "question": "Relational Keys Review Question #20: Why must Primary Key satisfy Entity Integrity constraint #20?",
    "options": [
      "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#20)",
      "To allow duplicate rows",
      "To store numbers in base 16",
      "To encrypt passwords"
    ],
    "answer": "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#20)",
    "explanation": "Entity integrity prevents ambiguous or unreachable tuples in tables.",
    "explanationBn": "Entity Integrity প্রতিটি রো-কে সঠিকভাবে শনাক্ত করা নিশ্চিত করে।"
  },
  {
    "id": "t5_q21",
    "question": "Relational Keys Review Question #21: Why must Primary Key satisfy Entity Integrity constraint #21?",
    "options": [
      "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#21)",
      "To allow duplicate rows",
      "To store numbers in base 16",
      "To encrypt passwords"
    ],
    "answer": "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#21)",
    "explanation": "Entity integrity prevents ambiguous or unreachable tuples in tables.",
    "explanationBn": "Entity Integrity প্রতিটি রো-কে সঠিকভাবে শনাক্ত করা নিশ্চিত করে।"
  },
  {
    "id": "t5_q22",
    "question": "Relational Keys Review Question #22: Why must Primary Key satisfy Entity Integrity constraint #22?",
    "options": [
      "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#22)",
      "To allow duplicate rows",
      "To store numbers in base 16",
      "To encrypt passwords"
    ],
    "answer": "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#22)",
    "explanation": "Entity integrity prevents ambiguous or unreachable tuples in tables.",
    "explanationBn": "Entity Integrity প্রতিটি রো-কে সঠিকভাবে শনাক্ত করা নিশ্চিত করে।"
  },
  {
    "id": "t5_q23",
    "question": "Relational Keys Review Question #23: Why must Primary Key satisfy Entity Integrity constraint #23?",
    "options": [
      "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#23)",
      "To allow duplicate rows",
      "To store numbers in base 16",
      "To encrypt passwords"
    ],
    "answer": "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#23)",
    "explanation": "Entity integrity prevents ambiguous or unreachable tuples in tables.",
    "explanationBn": "Entity Integrity প্রতিটি রো-কে সঠিকভাবে শনাক্ত করা নিশ্চিত করে।"
  },
  {
    "id": "t5_q24",
    "question": "Relational Keys Review Question #24: Why must Primary Key satisfy Entity Integrity constraint #24?",
    "options": [
      "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#24)",
      "To allow duplicate rows",
      "To store numbers in base 16",
      "To encrypt passwords"
    ],
    "answer": "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#24)",
    "explanation": "Entity integrity prevents ambiguous or unreachable tuples in tables.",
    "explanationBn": "Entity Integrity প্রতিটি রো-কে সঠিকভাবে শনাক্ত করা নিশ্চিত করে।"
  },
  {
    "id": "t5_q25",
    "question": "Relational Keys Review Question #25: Why must Primary Key satisfy Entity Integrity constraint #25?",
    "options": [
      "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#25)",
      "To allow duplicate rows",
      "To store numbers in base 16",
      "To encrypt passwords"
    ],
    "answer": "To ensure every entity instance can be uniquely and reliably retrieved without ambiguity (#25)",
    "explanation": "Entity integrity prevents ambiguous or unreachable tuples in tables.",
    "explanationBn": "Entity Integrity প্রতিটি রো-কে সঠিকভাবে শনাক্ত করা নিশ্চিত করে।"
  }
];
