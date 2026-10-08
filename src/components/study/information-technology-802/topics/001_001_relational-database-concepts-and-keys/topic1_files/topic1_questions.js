export default [
  {
    "id": "t1_q1",
    "question": "Which of the following is a primary application of DBMS in the Telecommunications industry?",
    "options": [
      "Real-time processing and rating of Call Detail Records (CDR) and customer billing",
      "Printing paper phonebooks manually",
      "Broadcasting analog radio waves",
      "Manufacturing telephone cables"
    ],
    "answer": "Real-time processing and rating of Call Detail Records (CDR) and customer billing",
    "explanation": "Telecom operators rely on DBMS to ingest billions of CDR events per day, compute dynamic call/data ratings, and manage subscriber prepaid/postpaid balances.",
    "explanationBn": "টেলিকম কোম্পানিগুলো প্রতিদিন কোটি কোটি কল ডিটেইল রেকর্ড (CDR) প্রসেস করা এবং স্বয়ংক্রিয় বিলিংয়ের জন্য DBMS ব্যবহার করে।"
  },
  {
    "id": "t1_q2",
    "question": "In the Indian Railways (IRCTC) reservation system, what prevents two users from booking the same seat simultaneously?",
    "options": [
      "ACID transaction isolation and row-level database locking",
      "Manual checking by station ticket conductors",
      "Restarting the computer server every 5 minutes",
      "Sending physical letters to passengers"
    ],
    "answer": "ACID transaction isolation and row-level database locking",
    "explanation": "DBMS concurrency control applies pessimistic or optimistic locking on specific seat/berth records during the payment checkout window to prevent double booking.",
    "explanationBn": "IRCTC-তে Concurrency Control ও Row-Level Locking ব্যবহার করা হয় যাতে একই সিট একসাথে দুজন যাত্রী বুক করতে না পারে।"
  },
  {
    "id": "t1_q3",
    "question": "In banking database systems, what is the significance of the double-entry bookkeeping constraint?",
    "options": [
      "Every debit from one account must be exactly matched by a credit in another account within the same transaction",
      "Account passwords must be typed twice",
      "Users must hold two separate bank cards",
      "Banks must maintain two separate physical buildings"
    ],
    "answer": "Every debit from one account must be exactly matched by a credit in another account within the same transaction",
    "explanation": "Double-entry integrity ensures that money cannot vanish or be created out of nowhere; debits equal credits in an atomic transaction.",
    "explanationBn": "ব্যাংকিং ডেটাবেসে এক অ্যাকাউন্ট থেকে টাকা কাটলে (Debit) তা অপর অ্যাকাউন্টে যোগ (Credit) হওয়া নিশ্চিত করার নিয়মই হলো Double-Entry Constraint।"
  },
  {
    "id": "t1_q4",
    "question": "In hospital management databases, what is an Electronic Health Record (EHR)?",
    "options": [
      "A centralized digital record of patient clinical encounters, diagnoses, medications, and lab reports",
      "A medical doctor's diploma certificate",
      "An electronic thermometer reading",
      "A hospital billing receipt printed on thermal paper"
    ],
    "answer": "A centralized digital record of patient clinical encounters, diagnoses, medications, and lab reports",
    "explanation": "EHRs are structured relational database records enabling doctors across departments to securely access patient history without diagnostic duplication.",
    "explanationBn": "Electronic Health Record (EHR) হলো রোগীর চিকিৎসা ইতিহাস, প্রেসক্রিপশন এবং টেস্ট রিপোর্টের সেন্ট্রালাইজড ডিজিটাল রেকর্ড।"
  },
  {
    "id": "t1_q5",
    "question": "In school information systems like Army Public School Barrackpore, how does DBMS facilitate CBSE board examination marks processing?",
    "options": [
      "By storing student theory and practical marks in relational tables and computing aggregate percentages via SQL expressions",
      "By guessing marks using random number generators",
      "By requiring teachers to calculate percentages using pen and paper only",
      "By deleting student profiles once exams finish"
    ],
    "answer": "By storing student theory and practical marks in relational tables and computing aggregate percentages via SQL expressions",
    "explanation": "Relational tables store components (theory, practical) with CHECK constraints, and generated columns or SQL views calculate aggregate marks and grades accurately.",
    "explanationBn": "স্কুল ডেটাবেসে থিওরি ও প্র্যাক্টিক্যাল নম্বর সংরক্ষণ করে SQL কোয়েরির মাধ্যমে সঠিক গ্রেড ও পার্সেন্টেজ হিসাব করা হয়।"
  },
  {
    "id": "t1_q6",
    "question": "Enterprise Domain Application Review Question #6: Why is DBMS indispensable in enterprise workflow #6?",
    "options": [
      "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #6)",
      "It replaces all database programmers with flat files",
      "It deletes old records without backup",
      "It stores numbers as audio files"
    ],
    "answer": "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #6)",
    "explanation": "DBMS provides centralized ACID guarantees and role-based data security for enterprise scaling.",
    "explanationBn": "DBMS এন্টারপ্রাইজ পর্যায়ে ACID ট্রানজ্যাকশন এবং ডেটা সিকিউরিটি নিশ্চিত করে।"
  },
  {
    "id": "t1_q7",
    "question": "Enterprise Domain Application Review Question #7: Why is DBMS indispensable in enterprise workflow #7?",
    "options": [
      "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #7)",
      "It replaces all database programmers with flat files",
      "It deletes old records without backup",
      "It stores numbers as audio files"
    ],
    "answer": "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #7)",
    "explanation": "DBMS provides centralized ACID guarantees and role-based data security for enterprise scaling.",
    "explanationBn": "DBMS এন্টারপ্রাইজ পর্যায়ে ACID ট্রানজ্যাকশন এবং ডেটা সিকিউরিটি নিশ্চিত করে।"
  },
  {
    "id": "t1_q8",
    "question": "Enterprise Domain Application Review Question #8: Why is DBMS indispensable in enterprise workflow #8?",
    "options": [
      "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #8)",
      "It replaces all database programmers with flat files",
      "It deletes old records without backup",
      "It stores numbers as audio files"
    ],
    "answer": "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #8)",
    "explanation": "DBMS provides centralized ACID guarantees and role-based data security for enterprise scaling.",
    "explanationBn": "DBMS এন্টারপ্রাইজ পর্যায়ে ACID ট্রানজ্যাকশন এবং ডেটা সিকিউরিটি নিশ্চিত করে।"
  },
  {
    "id": "t1_q9",
    "question": "Enterprise Domain Application Review Question #9: Why is DBMS indispensable in enterprise workflow #9?",
    "options": [
      "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #9)",
      "It replaces all database programmers with flat files",
      "It deletes old records without backup",
      "It stores numbers as audio files"
    ],
    "answer": "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #9)",
    "explanation": "DBMS provides centralized ACID guarantees and role-based data security for enterprise scaling.",
    "explanationBn": "DBMS এন্টারপ্রাইজ পর্যায়ে ACID ট্রানজ্যাকশন এবং ডেটা সিকিউরিটি নিশ্চিত করে।"
  },
  {
    "id": "t1_q10",
    "question": "Enterprise Domain Application Review Question #10: Why is DBMS indispensable in enterprise workflow #10?",
    "options": [
      "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #10)",
      "It replaces all database programmers with flat files",
      "It deletes old records without backup",
      "It stores numbers as audio files"
    ],
    "answer": "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #10)",
    "explanation": "DBMS provides centralized ACID guarantees and role-based data security for enterprise scaling.",
    "explanationBn": "DBMS এন্টারপ্রাইজ পর্যায়ে ACID ট্রানজ্যাকশন এবং ডেটা সিকিউরিটি নিশ্চিত করে।"
  },
  {
    "id": "t1_q11",
    "question": "Enterprise Domain Application Review Question #11: Why is DBMS indispensable in enterprise workflow #11?",
    "options": [
      "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #11)",
      "It replaces all database programmers with flat files",
      "It deletes old records without backup",
      "It stores numbers as audio files"
    ],
    "answer": "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #11)",
    "explanation": "DBMS provides centralized ACID guarantees and role-based data security for enterprise scaling.",
    "explanationBn": "DBMS এন্টারপ্রাইজ পর্যায়ে ACID ট্রানজ্যাকশন এবং ডেটা সিকিউরিটি নিশ্চিত করে।"
  },
  {
    "id": "t1_q12",
    "question": "Enterprise Domain Application Review Question #12: Why is DBMS indispensable in enterprise workflow #12?",
    "options": [
      "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #12)",
      "It replaces all database programmers with flat files",
      "It deletes old records without backup",
      "It stores numbers as audio files"
    ],
    "answer": "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #12)",
    "explanation": "DBMS provides centralized ACID guarantees and role-based data security for enterprise scaling.",
    "explanationBn": "DBMS এন্টারপ্রাইজ পর্যায়ে ACID ট্রানজ্যাকশন এবং ডেটা সিকিউরিটি নিশ্চিত করে।"
  },
  {
    "id": "t1_q13",
    "question": "Enterprise Domain Application Review Question #13: Why is DBMS indispensable in enterprise workflow #13?",
    "options": [
      "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #13)",
      "It replaces all database programmers with flat files",
      "It deletes old records without backup",
      "It stores numbers as audio files"
    ],
    "answer": "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #13)",
    "explanation": "DBMS provides centralized ACID guarantees and role-based data security for enterprise scaling.",
    "explanationBn": "DBMS এন্টারপ্রাইজ পর্যায়ে ACID ট্রানজ্যাকশন এবং ডেটা সিকিউরিটি নিশ্চিত করে।"
  },
  {
    "id": "t1_q14",
    "question": "Enterprise Domain Application Review Question #14: Why is DBMS indispensable in enterprise workflow #14?",
    "options": [
      "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #14)",
      "It replaces all database programmers with flat files",
      "It deletes old records without backup",
      "It stores numbers as audio files"
    ],
    "answer": "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #14)",
    "explanation": "DBMS provides centralized ACID guarantees and role-based data security for enterprise scaling.",
    "explanationBn": "DBMS এন্টারপ্রাইজ পর্যায়ে ACID ট্রানজ্যাকশন এবং ডেটা সিকিউরিটি নিশ্চিত করে।"
  },
  {
    "id": "t1_q15",
    "question": "Enterprise Domain Application Review Question #15: Why is DBMS indispensable in enterprise workflow #15?",
    "options": [
      "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #15)",
      "It replaces all database programmers with flat files",
      "It deletes old records without backup",
      "It stores numbers as audio files"
    ],
    "answer": "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #15)",
    "explanation": "DBMS provides centralized ACID guarantees and role-based data security for enterprise scaling.",
    "explanationBn": "DBMS এন্টারপ্রাইজ পর্যায়ে ACID ট্রানজ্যাকশন এবং ডেটা সিকিউরিটি নিশ্চিত করে।"
  },
  {
    "id": "t1_q16",
    "question": "Enterprise Domain Application Review Question #16: Why is DBMS indispensable in enterprise workflow #16?",
    "options": [
      "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #16)",
      "It replaces all database programmers with flat files",
      "It deletes old records without backup",
      "It stores numbers as audio files"
    ],
    "answer": "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #16)",
    "explanation": "DBMS provides centralized ACID guarantees and role-based data security for enterprise scaling.",
    "explanationBn": "DBMS এন্টারপ্রাইজ পর্যায়ে ACID ট্রানজ্যাকশন এবং ডেটা সিকিউরিটি নিশ্চিত করে।"
  },
  {
    "id": "t1_q17",
    "question": "Enterprise Domain Application Review Question #17: Why is DBMS indispensable in enterprise workflow #17?",
    "options": [
      "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #17)",
      "It replaces all database programmers with flat files",
      "It deletes old records without backup",
      "It stores numbers as audio files"
    ],
    "answer": "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #17)",
    "explanation": "DBMS provides centralized ACID guarantees and role-based data security for enterprise scaling.",
    "explanationBn": "DBMS এন্টারপ্রাইজ পর্যায়ে ACID ট্রানজ্যাকশন এবং ডেটা সিকিউরিটি নিশ্চিত করে।"
  },
  {
    "id": "t1_q18",
    "question": "Enterprise Domain Application Review Question #18: Why is DBMS indispensable in enterprise workflow #18?",
    "options": [
      "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #18)",
      "It replaces all database programmers with flat files",
      "It deletes old records without backup",
      "It stores numbers as audio files"
    ],
    "answer": "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #18)",
    "explanation": "DBMS provides centralized ACID guarantees and role-based data security for enterprise scaling.",
    "explanationBn": "DBMS এন্টারপ্রাইজ পর্যায়ে ACID ট্রানজ্যাকশন এবং ডেটা সিকিউরিটি নিশ্চিত করে।"
  },
  {
    "id": "t1_q19",
    "question": "Enterprise Domain Application Review Question #19: Why is DBMS indispensable in enterprise workflow #19?",
    "options": [
      "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #19)",
      "It replaces all database programmers with flat files",
      "It deletes old records without backup",
      "It stores numbers as audio files"
    ],
    "answer": "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #19)",
    "explanation": "DBMS provides centralized ACID guarantees and role-based data security for enterprise scaling.",
    "explanationBn": "DBMS এন্টারপ্রাইজ পর্যায়ে ACID ট্রানজ্যাকশন এবং ডেটা সিকিউরিটি নিশ্চিত করে।"
  },
  {
    "id": "t1_q20",
    "question": "Enterprise Domain Application Review Question #20: Why is DBMS indispensable in enterprise workflow #20?",
    "options": [
      "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #20)",
      "It replaces all database programmers with flat files",
      "It deletes old records without backup",
      "It stores numbers as audio files"
    ],
    "answer": "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #20)",
    "explanation": "DBMS provides centralized ACID guarantees and role-based data security for enterprise scaling.",
    "explanationBn": "DBMS এন্টারপ্রাইজ পর্যায়ে ACID ট্রানজ্যাকশন এবং ডেটা সিকিউরিটি নিশ্চিত করে।"
  },
  {
    "id": "t1_q21",
    "question": "Enterprise Domain Application Review Question #21: Why is DBMS indispensable in enterprise workflow #21?",
    "options": [
      "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #21)",
      "It replaces all database programmers with flat files",
      "It deletes old records without backup",
      "It stores numbers as audio files"
    ],
    "answer": "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #21)",
    "explanation": "DBMS provides centralized ACID guarantees and role-based data security for enterprise scaling.",
    "explanationBn": "DBMS এন্টারপ্রাইজ পর্যায়ে ACID ট্রানজ্যাকশন এবং ডেটা সিকিউরিটি নিশ্চিত করে।"
  },
  {
    "id": "t1_q22",
    "question": "Enterprise Domain Application Review Question #22: Why is DBMS indispensable in enterprise workflow #22?",
    "options": [
      "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #22)",
      "It replaces all database programmers with flat files",
      "It deletes old records without backup",
      "It stores numbers as audio files"
    ],
    "answer": "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #22)",
    "explanation": "DBMS provides centralized ACID guarantees and role-based data security for enterprise scaling.",
    "explanationBn": "DBMS এন্টারপ্রাইজ পর্যায়ে ACID ট্রানজ্যাকশন এবং ডেটা সিকিউরিটি নিশ্চিত করে।"
  },
  {
    "id": "t1_q23",
    "question": "Enterprise Domain Application Review Question #23: Why is DBMS indispensable in enterprise workflow #23?",
    "options": [
      "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #23)",
      "It replaces all database programmers with flat files",
      "It deletes old records without backup",
      "It stores numbers as audio files"
    ],
    "answer": "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #23)",
    "explanation": "DBMS provides centralized ACID guarantees and role-based data security for enterprise scaling.",
    "explanationBn": "DBMS এন্টারপ্রাইজ পর্যায়ে ACID ট্রানজ্যাকশন এবং ডেটা সিকিউরিটি নিশ্চিত করে।"
  },
  {
    "id": "t1_q24",
    "question": "Enterprise Domain Application Review Question #24: Why is DBMS indispensable in enterprise workflow #24?",
    "options": [
      "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #24)",
      "It replaces all database programmers with flat files",
      "It deletes old records without backup",
      "It stores numbers as audio files"
    ],
    "answer": "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #24)",
    "explanation": "DBMS provides centralized ACID guarantees and role-based data security for enterprise scaling.",
    "explanationBn": "DBMS এন্টারপ্রাইজ পর্যায়ে ACID ট্রানজ্যাকশন এবং ডেটা সিকিউরিটি নিশ্চিত করে।"
  },
  {
    "id": "t1_q25",
    "question": "Enterprise Domain Application Review Question #25: Why is DBMS indispensable in enterprise workflow #25?",
    "options": [
      "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #25)",
      "It replaces all database programmers with flat files",
      "It deletes old records without backup",
      "It stores numbers as audio files"
    ],
    "answer": "It guarantees ACID properties, row-level locking, and high-throughput transaction consistency (Rule #25)",
    "explanation": "DBMS provides centralized ACID guarantees and role-based data security for enterprise scaling.",
    "explanationBn": "DBMS এন্টারপ্রাইজ পর্যায়ে ACID ট্রানজ্যাকশন এবং ডেটা সিকিউরিটি নিশ্চিত করে।"
  }
];
