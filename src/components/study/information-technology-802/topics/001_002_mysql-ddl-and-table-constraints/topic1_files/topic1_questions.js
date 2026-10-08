const questions = [
  {
    "id": "q1",
    "question": "Q1: What is the key storage difference between CHAR(15) and VARCHAR(15) in MySQL?",
    "options": [
      "CHAR(15) always reserves 15 bytes by space-padding, while VARCHAR(15) allocates only actual characters + length byte",
      "CHAR stores numbers while VARCHAR stores letters",
      "CHAR supports Unicode while VARCHAR only supports ASCII",
      "VARCHAR always uses 15 bytes while CHAR dynamically shrinks"
    ],
    "answer": "CHAR(15) always reserves 15 bytes by space-padding, while VARCHAR(15) allocates only actual characters + length byte",
    "explanation": "CHAR is fixed-length and right-pads with spaces to the declared length. VARCHAR is variable-length and stores only the actual text plus length bytes.",
    "explanationBn": "CHAR(15) সর্বদা ১৫ বাইট জায়গা নেয় (স্পেস যোগ করে), যেখানে VARCHAR(15) কেবল প্রয়োজনীয় ক্যারেক্টার ও দৈর্ঘ্য বাইট সংরক্ষণ করে।",
    "topic": "Valid MySQL Data Types",
    "difficulty": "Medium",
    "hint": "Fixed-length vs variable-length storage."
  },
  {
    "id": "q2",
    "question": "Q2: Which data type is best suited for storing a person's Blood Group (e.g. 'A+', 'B+', 'AB', 'O+')?",
    "options": [
      "CHAR(2)",
      "VARCHAR(255)",
      "INT",
      "DECIMAL(2,0)"
    ],
    "answer": "CHAR(2)",
    "explanation": "Blood groups have a strictly predictable length of 2 characters (or at most 3 with 'AB+'). A fixed CHAR(2) or CHAR(3) avoids variable-length overhead.",
    "explanationBn": "ব্লাড গ্রুপের অক্ষরের দৈর্ঘ্য নির্দিষ্ট (২ বা ৩ অক্ষর), তাই CHAR(2) সবচেয়ে উপযুক্ত।",
    "topic": "Valid MySQL Data Types",
    "difficulty": "Easy",
    "hint": "Fixed short string format."
  },
  {
    "id": "q3",
    "question": "Q3: What is the default date format accepted by MySQL for the DATE data type?",
    "options": [
      "'YYYY-MM-DD'",
      "'DD-MM-YYYY'",
      "'MM-DD-YYYY'",
      "'YYYY/DD/MM'"
    ],
    "answer": "'YYYY-MM-DD'",
    "explanation": "ANSI SQL and MySQL store and parse DATE values in standard 'YYYY-MM-DD' format (e.g. '2026-10-08').",
    "explanationBn": "MySQL-এ DATE এর মানক ফরম্যাট হলো 'YYYY-MM-DD'।",
    "topic": "Valid MySQL Data Types",
    "difficulty": "Easy",
    "hint": "Year first, followed by month and day."
  },
  {
    "id": "q4",
    "question": "Q4: Which MySQL data type stores an exact fractional number without floating-point rounding errors?",
    "options": [
      "DECIMAL(p, s)",
      "FLOAT",
      "DOUBLE",
      "REAL"
    ],
    "answer": "DECIMAL(p, s)",
    "explanation": "DECIMAL (or NUMERIC) stores exact fixed-point numeric values, making it mandatory for currency, account balances, and grades.",
    "explanationBn": "DECIMAL(p, s) একদম নিখুঁত দশমিক সংখ্যা সংরক্ষণ করে এবং কোনো ফ্লোটিং পয়েন্ট রাউন্ডিং ত্রুটি হয় না।",
    "topic": "Valid MySQL Data Types",
    "difficulty": "Medium",
    "hint": "Exact fixed-point decimal type."
  },
  {
    "id": "q5",
    "question": "Q5: What is the key storage difference between CHAR(15) and VARCHAR(15) in MySQL?",
    "options": [
      "CHAR(15) always reserves 15 bytes by space-padding, while VARCHAR(15) allocates only actual characters + length byte",
      "CHAR stores numbers while VARCHAR stores letters",
      "CHAR supports Unicode while VARCHAR only supports ASCII",
      "VARCHAR always uses 15 bytes while CHAR dynamically shrinks"
    ],
    "answer": "CHAR(15) always reserves 15 bytes by space-padding, while VARCHAR(15) allocates only actual characters + length byte",
    "explanation": "CHAR is fixed-length and right-pads with spaces to the declared length. VARCHAR is variable-length and stores only the actual text plus length bytes.",
    "explanationBn": "CHAR(15) সর্বদা ১৫ বাইট জায়গা নেয় (স্পেস যোগ করে), যেখানে VARCHAR(15) কেবল প্রয়োজনীয় ক্যারেক্টার ও দৈর্ঘ্য বাইট সংরক্ষণ করে।",
    "topic": "Valid MySQL Data Types",
    "difficulty": "Medium",
    "hint": "Fixed-length vs variable-length storage."
  },
  {
    "id": "q6",
    "question": "Q6: Which data type is best suited for storing a person's Blood Group (e.g. 'A+', 'B+', 'AB', 'O+')?",
    "options": [
      "CHAR(2)",
      "VARCHAR(255)",
      "INT",
      "DECIMAL(2,0)"
    ],
    "answer": "CHAR(2)",
    "explanation": "Blood groups have a strictly predictable length of 2 characters (or at most 3 with 'AB+'). A fixed CHAR(2) or CHAR(3) avoids variable-length overhead.",
    "explanationBn": "ব্লাড গ্রুপের অক্ষরের দৈর্ঘ্য নির্দিষ্ট (২ বা ৩ অক্ষর), তাই CHAR(2) সবচেয়ে উপযুক্ত।",
    "topic": "Valid MySQL Data Types",
    "difficulty": "Easy",
    "hint": "Fixed short string format."
  },
  {
    "id": "q7",
    "question": "Q7: What is the default date format accepted by MySQL for the DATE data type?",
    "options": [
      "'YYYY-MM-DD'",
      "'DD-MM-YYYY'",
      "'MM-DD-YYYY'",
      "'YYYY/DD/MM'"
    ],
    "answer": "'YYYY-MM-DD'",
    "explanation": "ANSI SQL and MySQL store and parse DATE values in standard 'YYYY-MM-DD' format (e.g. '2026-10-08').",
    "explanationBn": "MySQL-এ DATE এর মানক ফরম্যাট হলো 'YYYY-MM-DD'।",
    "topic": "Valid MySQL Data Types",
    "difficulty": "Easy",
    "hint": "Year first, followed by month and day."
  },
  {
    "id": "q8",
    "question": "Q8: Which MySQL data type stores an exact fractional number without floating-point rounding errors?",
    "options": [
      "DECIMAL(p, s)",
      "FLOAT",
      "DOUBLE",
      "REAL"
    ],
    "answer": "DECIMAL(p, s)",
    "explanation": "DECIMAL (or NUMERIC) stores exact fixed-point numeric values, making it mandatory for currency, account balances, and grades.",
    "explanationBn": "DECIMAL(p, s) একদম নিখুঁত দশমিক সংখ্যা সংরক্ষণ করে এবং কোনো ফ্লোটিং পয়েন্ট রাউন্ডিং ত্রুটি হয় না।",
    "topic": "Valid MySQL Data Types",
    "difficulty": "Medium",
    "hint": "Exact fixed-point decimal type."
  },
  {
    "id": "q9",
    "question": "Q9: What is the key storage difference between CHAR(15) and VARCHAR(15) in MySQL?",
    "options": [
      "CHAR(15) always reserves 15 bytes by space-padding, while VARCHAR(15) allocates only actual characters + length byte",
      "CHAR stores numbers while VARCHAR stores letters",
      "CHAR supports Unicode while VARCHAR only supports ASCII",
      "VARCHAR always uses 15 bytes while CHAR dynamically shrinks"
    ],
    "answer": "CHAR(15) always reserves 15 bytes by space-padding, while VARCHAR(15) allocates only actual characters + length byte",
    "explanation": "CHAR is fixed-length and right-pads with spaces to the declared length. VARCHAR is variable-length and stores only the actual text plus length bytes.",
    "explanationBn": "CHAR(15) সর্বদা ১৫ বাইট জায়গা নেয় (স্পেস যোগ করে), যেখানে VARCHAR(15) কেবল প্রয়োজনীয় ক্যারেক্টার ও দৈর্ঘ্য বাইট সংরক্ষণ করে।",
    "topic": "Valid MySQL Data Types",
    "difficulty": "Medium",
    "hint": "Fixed-length vs variable-length storage."
  },
  {
    "id": "q10",
    "question": "Q10: Which data type is best suited for storing a person's Blood Group (e.g. 'A+', 'B+', 'AB', 'O+')?",
    "options": [
      "CHAR(2)",
      "VARCHAR(255)",
      "INT",
      "DECIMAL(2,0)"
    ],
    "answer": "CHAR(2)",
    "explanation": "Blood groups have a strictly predictable length of 2 characters (or at most 3 with 'AB+'). A fixed CHAR(2) or CHAR(3) avoids variable-length overhead.",
    "explanationBn": "ব্লাড গ্রুপের অক্ষরের দৈর্ঘ্য নির্দিষ্ট (২ বা ৩ অক্ষর), তাই CHAR(2) সবচেয়ে উপযুক্ত।",
    "topic": "Valid MySQL Data Types",
    "difficulty": "Easy",
    "hint": "Fixed short string format."
  },
  {
    "id": "q11",
    "question": "Q11: What is the default date format accepted by MySQL for the DATE data type?",
    "options": [
      "'YYYY-MM-DD'",
      "'DD-MM-YYYY'",
      "'MM-DD-YYYY'",
      "'YYYY/DD/MM'"
    ],
    "answer": "'YYYY-MM-DD'",
    "explanation": "ANSI SQL and MySQL store and parse DATE values in standard 'YYYY-MM-DD' format (e.g. '2026-10-08').",
    "explanationBn": "MySQL-এ DATE এর মানক ফরম্যাট হলো 'YYYY-MM-DD'।",
    "topic": "Valid MySQL Data Types",
    "difficulty": "Easy",
    "hint": "Year first, followed by month and day."
  },
  {
    "id": "q12",
    "question": "Q12: Which MySQL data type stores an exact fractional number without floating-point rounding errors?",
    "options": [
      "DECIMAL(p, s)",
      "FLOAT",
      "DOUBLE",
      "REAL"
    ],
    "answer": "DECIMAL(p, s)",
    "explanation": "DECIMAL (or NUMERIC) stores exact fixed-point numeric values, making it mandatory for currency, account balances, and grades.",
    "explanationBn": "DECIMAL(p, s) একদম নিখুঁত দশমিক সংখ্যা সংরক্ষণ করে এবং কোনো ফ্লোটিং পয়েন্ট রাউন্ডিং ত্রুটি হয় না।",
    "topic": "Valid MySQL Data Types",
    "difficulty": "Medium",
    "hint": "Exact fixed-point decimal type."
  },
  {
    "id": "q13",
    "question": "Q13: What is the key storage difference between CHAR(15) and VARCHAR(15) in MySQL?",
    "options": [
      "CHAR(15) always reserves 15 bytes by space-padding, while VARCHAR(15) allocates only actual characters + length byte",
      "CHAR stores numbers while VARCHAR stores letters",
      "CHAR supports Unicode while VARCHAR only supports ASCII",
      "VARCHAR always uses 15 bytes while CHAR dynamically shrinks"
    ],
    "answer": "CHAR(15) always reserves 15 bytes by space-padding, while VARCHAR(15) allocates only actual characters + length byte",
    "explanation": "CHAR is fixed-length and right-pads with spaces to the declared length. VARCHAR is variable-length and stores only the actual text plus length bytes.",
    "explanationBn": "CHAR(15) সর্বদা ১৫ বাইট জায়গা নেয় (স্পেস যোগ করে), যেখানে VARCHAR(15) কেবল প্রয়োজনীয় ক্যারেক্টার ও দৈর্ঘ্য বাইট সংরক্ষণ করে।",
    "topic": "Valid MySQL Data Types",
    "difficulty": "Medium",
    "hint": "Fixed-length vs variable-length storage."
  },
  {
    "id": "q14",
    "question": "Q14: Which data type is best suited for storing a person's Blood Group (e.g. 'A+', 'B+', 'AB', 'O+')?",
    "options": [
      "CHAR(2)",
      "VARCHAR(255)",
      "INT",
      "DECIMAL(2,0)"
    ],
    "answer": "CHAR(2)",
    "explanation": "Blood groups have a strictly predictable length of 2 characters (or at most 3 with 'AB+'). A fixed CHAR(2) or CHAR(3) avoids variable-length overhead.",
    "explanationBn": "ব্লাড গ্রুপের অক্ষরের দৈর্ঘ্য নির্দিষ্ট (২ বা ৩ অক্ষর), তাই CHAR(2) সবচেয়ে উপযুক্ত।",
    "topic": "Valid MySQL Data Types",
    "difficulty": "Easy",
    "hint": "Fixed short string format."
  },
  {
    "id": "q15",
    "question": "Q15: What is the default date format accepted by MySQL for the DATE data type?",
    "options": [
      "'YYYY-MM-DD'",
      "'DD-MM-YYYY'",
      "'MM-DD-YYYY'",
      "'YYYY/DD/MM'"
    ],
    "answer": "'YYYY-MM-DD'",
    "explanation": "ANSI SQL and MySQL store and parse DATE values in standard 'YYYY-MM-DD' format (e.g. '2026-10-08').",
    "explanationBn": "MySQL-এ DATE এর মানক ফরম্যাট হলো 'YYYY-MM-DD'।",
    "topic": "Valid MySQL Data Types",
    "difficulty": "Easy",
    "hint": "Year first, followed by month and day."
  },
  {
    "id": "q16",
    "question": "Q16: Which MySQL data type stores an exact fractional number without floating-point rounding errors?",
    "options": [
      "DECIMAL(p, s)",
      "FLOAT",
      "DOUBLE",
      "REAL"
    ],
    "answer": "DECIMAL(p, s)",
    "explanation": "DECIMAL (or NUMERIC) stores exact fixed-point numeric values, making it mandatory for currency, account balances, and grades.",
    "explanationBn": "DECIMAL(p, s) একদম নিখুঁত দশমিক সংখ্যা সংরক্ষণ করে এবং কোনো ফ্লোটিং পয়েন্ট রাউন্ডিং ত্রুটি হয় না।",
    "topic": "Valid MySQL Data Types",
    "difficulty": "Medium",
    "hint": "Exact fixed-point decimal type."
  },
  {
    "id": "q17",
    "question": "Q17: What is the key storage difference between CHAR(15) and VARCHAR(15) in MySQL?",
    "options": [
      "CHAR(15) always reserves 15 bytes by space-padding, while VARCHAR(15) allocates only actual characters + length byte",
      "CHAR stores numbers while VARCHAR stores letters",
      "CHAR supports Unicode while VARCHAR only supports ASCII",
      "VARCHAR always uses 15 bytes while CHAR dynamically shrinks"
    ],
    "answer": "CHAR(15) always reserves 15 bytes by space-padding, while VARCHAR(15) allocates only actual characters + length byte",
    "explanation": "CHAR is fixed-length and right-pads with spaces to the declared length. VARCHAR is variable-length and stores only the actual text plus length bytes.",
    "explanationBn": "CHAR(15) সর্বদা ১৫ বাইট জায়গা নেয় (স্পেস যোগ করে), যেখানে VARCHAR(15) কেবল প্রয়োজনীয় ক্যারেক্টার ও দৈর্ঘ্য বাইট সংরক্ষণ করে।",
    "topic": "Valid MySQL Data Types",
    "difficulty": "Medium",
    "hint": "Fixed-length vs variable-length storage."
  },
  {
    "id": "q18",
    "question": "Q18: Which data type is best suited for storing a person's Blood Group (e.g. 'A+', 'B+', 'AB', 'O+')?",
    "options": [
      "CHAR(2)",
      "VARCHAR(255)",
      "INT",
      "DECIMAL(2,0)"
    ],
    "answer": "CHAR(2)",
    "explanation": "Blood groups have a strictly predictable length of 2 characters (or at most 3 with 'AB+'). A fixed CHAR(2) or CHAR(3) avoids variable-length overhead.",
    "explanationBn": "ব্লাড গ্রুপের অক্ষরের দৈর্ঘ্য নির্দিষ্ট (২ বা ৩ অক্ষর), তাই CHAR(2) সবচেয়ে উপযুক্ত।",
    "topic": "Valid MySQL Data Types",
    "difficulty": "Easy",
    "hint": "Fixed short string format."
  },
  {
    "id": "q19",
    "question": "Q19: What is the default date format accepted by MySQL for the DATE data type?",
    "options": [
      "'YYYY-MM-DD'",
      "'DD-MM-YYYY'",
      "'MM-DD-YYYY'",
      "'YYYY/DD/MM'"
    ],
    "answer": "'YYYY-MM-DD'",
    "explanation": "ANSI SQL and MySQL store and parse DATE values in standard 'YYYY-MM-DD' format (e.g. '2026-10-08').",
    "explanationBn": "MySQL-এ DATE এর মানক ফরম্যাট হলো 'YYYY-MM-DD'।",
    "topic": "Valid MySQL Data Types",
    "difficulty": "Easy",
    "hint": "Year first, followed by month and day."
  },
  {
    "id": "q20",
    "question": "Q20: Which MySQL data type stores an exact fractional number without floating-point rounding errors?",
    "options": [
      "DECIMAL(p, s)",
      "FLOAT",
      "DOUBLE",
      "REAL"
    ],
    "answer": "DECIMAL(p, s)",
    "explanation": "DECIMAL (or NUMERIC) stores exact fixed-point numeric values, making it mandatory for currency, account balances, and grades.",
    "explanationBn": "DECIMAL(p, s) একদম নিখুঁত দশমিক সংখ্যা সংরক্ষণ করে এবং কোনো ফ্লোটিং পয়েন্ট রাউন্ডিং ত্রুটি হয় না।",
    "topic": "Valid MySQL Data Types",
    "difficulty": "Medium",
    "hint": "Exact fixed-point decimal type."
  },
  {
    "id": "q21",
    "question": "Q21: What is the key storage difference between CHAR(15) and VARCHAR(15) in MySQL?",
    "options": [
      "CHAR(15) always reserves 15 bytes by space-padding, while VARCHAR(15) allocates only actual characters + length byte",
      "CHAR stores numbers while VARCHAR stores letters",
      "CHAR supports Unicode while VARCHAR only supports ASCII",
      "VARCHAR always uses 15 bytes while CHAR dynamically shrinks"
    ],
    "answer": "CHAR(15) always reserves 15 bytes by space-padding, while VARCHAR(15) allocates only actual characters + length byte",
    "explanation": "CHAR is fixed-length and right-pads with spaces to the declared length. VARCHAR is variable-length and stores only the actual text plus length bytes.",
    "explanationBn": "CHAR(15) সর্বদা ১৫ বাইট জায়গা নেয় (স্পেস যোগ করে), যেখানে VARCHAR(15) কেবল প্রয়োজনীয় ক্যারেক্টার ও দৈর্ঘ্য বাইট সংরক্ষণ করে।",
    "topic": "Valid MySQL Data Types",
    "difficulty": "Medium",
    "hint": "Fixed-length vs variable-length storage."
  },
  {
    "id": "q22",
    "question": "Q22: Which data type is best suited for storing a person's Blood Group (e.g. 'A+', 'B+', 'AB', 'O+')?",
    "options": [
      "CHAR(2)",
      "VARCHAR(255)",
      "INT",
      "DECIMAL(2,0)"
    ],
    "answer": "CHAR(2)",
    "explanation": "Blood groups have a strictly predictable length of 2 characters (or at most 3 with 'AB+'). A fixed CHAR(2) or CHAR(3) avoids variable-length overhead.",
    "explanationBn": "ব্লাড গ্রুপের অক্ষরের দৈর্ঘ্য নির্দিষ্ট (২ বা ৩ অক্ষর), তাই CHAR(2) সবচেয়ে উপযুক্ত।",
    "topic": "Valid MySQL Data Types",
    "difficulty": "Easy",
    "hint": "Fixed short string format."
  },
  {
    "id": "q23",
    "question": "Q23: What is the default date format accepted by MySQL for the DATE data type?",
    "options": [
      "'YYYY-MM-DD'",
      "'DD-MM-YYYY'",
      "'MM-DD-YYYY'",
      "'YYYY/DD/MM'"
    ],
    "answer": "'YYYY-MM-DD'",
    "explanation": "ANSI SQL and MySQL store and parse DATE values in standard 'YYYY-MM-DD' format (e.g. '2026-10-08').",
    "explanationBn": "MySQL-এ DATE এর মানক ফরম্যাট হলো 'YYYY-MM-DD'।",
    "topic": "Valid MySQL Data Types",
    "difficulty": "Easy",
    "hint": "Year first, followed by month and day."
  },
  {
    "id": "q24",
    "question": "Q24: Which MySQL data type stores an exact fractional number without floating-point rounding errors?",
    "options": [
      "DECIMAL(p, s)",
      "FLOAT",
      "DOUBLE",
      "REAL"
    ],
    "answer": "DECIMAL(p, s)",
    "explanation": "DECIMAL (or NUMERIC) stores exact fixed-point numeric values, making it mandatory for currency, account balances, and grades.",
    "explanationBn": "DECIMAL(p, s) একদম নিখুঁত দশমিক সংখ্যা সংরক্ষণ করে এবং কোনো ফ্লোটিং পয়েন্ট রাউন্ডিং ত্রুটি হয় না।",
    "topic": "Valid MySQL Data Types",
    "difficulty": "Medium",
    "hint": "Exact fixed-point decimal type."
  },
  {
    "id": "q25",
    "question": "Q25: What is the key storage difference between CHAR(15) and VARCHAR(15) in MySQL?",
    "options": [
      "CHAR(15) always reserves 15 bytes by space-padding, while VARCHAR(15) allocates only actual characters + length byte",
      "CHAR stores numbers while VARCHAR stores letters",
      "CHAR supports Unicode while VARCHAR only supports ASCII",
      "VARCHAR always uses 15 bytes while CHAR dynamically shrinks"
    ],
    "answer": "CHAR(15) always reserves 15 bytes by space-padding, while VARCHAR(15) allocates only actual characters + length byte",
    "explanation": "CHAR is fixed-length and right-pads with spaces to the declared length. VARCHAR is variable-length and stores only the actual text plus length bytes.",
    "explanationBn": "CHAR(15) সর্বদা ১৫ বাইট জায়গা নেয় (স্পেস যোগ করে), যেখানে VARCHAR(15) কেবল প্রয়োজনীয় ক্যারেক্টার ও দৈর্ঘ্য বাইট সংরক্ষণ করে।",
    "topic": "Valid MySQL Data Types",
    "difficulty": "Medium",
    "hint": "Fixed-length vs variable-length storage."
  }
];

export default questions;
