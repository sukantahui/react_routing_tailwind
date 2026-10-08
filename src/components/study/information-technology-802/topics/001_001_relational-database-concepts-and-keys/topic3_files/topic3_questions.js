export default [
  {
    "id": "t3_q1",
    "question": "A relation 'STUDENT' has 8 columns and 15 rows. After deleting 4 rows and adding 3 columns, what will be its updated Degree and Cardinality?",
    "options": [
      "Degree = 11, Cardinality = 11",
      "Degree = 12, Cardinality = 19",
      "Degree = 5, Cardinality = 18",
      "Degree = 11, Cardinality = 15"
    ],
    "answer": "Degree = 11, Cardinality = 11",
    "explanation": "Degree = Initial Columns + Columns Added = 8 + 3 = 11. Cardinality = Initial Rows - Rows Deleted = 15 - 4 = 11.",
    "explanationBn": "Degree = প্রাথমিক কলাম + নতুন কলাম = ৮ + ৩ = ১১। Cardinality = প্রাথমিক রো - মুছে ফেলা রো = ১৫ - ৪ = ১১।"
  },
  {
    "id": "t3_q2",
    "question": "What is the mathematical definition of the 'Degree' of a relation?",
    "options": [
      "The total number of attributes (columns) present in the relation's schema",
      "The total number of tuples (rows) stored in the relation",
      "The temperature of the server CPU",
      "The number of primary keys multiplied by foreign keys"
    ],
    "answer": "The total number of attributes (columns) present in the relation's schema",
    "explanation": "Degree is the count of columns in the table definition.",
    "explanationBn": "Degree হলো কোনো টেবিলের মোট কলাম বা অ্যাট্রিবিউট সংখ্যা।"
  },
  {
    "id": "t3_q3",
    "question": "What is the mathematical definition of the 'Cardinality' of a relation?",
    "options": [
      "The total number of tuples (rows/records) currently stored in the relation instance",
      "The total number of columns in the schema",
      "The size of the hard disk in gigabytes",
      "The number of tables in a database"
    ],
    "answer": "The total number of tuples (rows/records) currently stored in the relation instance",
    "explanation": "Cardinality is the total number of rows in the table instance.",
    "explanationBn": "Cardinality হলো কোনো টেবিলে উপস্থিত মোট রো বা রেকর্ডের সংখ্যা।"
  },
  {
    "id": "t3_q4",
    "question": "Which SQL command modifies the Degree of an existing table?",
    "options": [
      "`ALTER TABLE table_name ADD / DROP column_name`",
      "`INSERT INTO table_name VALUES (...)`",
      "`DELETE FROM table_name WHERE ...`",
      "`UPDATE table_name SET col = val`"
    ],
    "answer": "`ALTER TABLE table_name ADD / DROP column_name`",
    "explanation": "DDL ALTER TABLE commands modify column count, thus altering Degree.",
    "explanationBn": "শুধুমাত্র `ALTER TABLE ADD` বা `DROP` কমান্ড টেবিলের Degree পরিবর্তন করে।"
  },
  {
    "id": "t3_q5",
    "question": "Which SQL commands modify the Cardinality of an existing table?",
    "options": [
      "`INSERT INTO` (increases cardinality) and `DELETE FROM` (decreases cardinality)",
      "`ALTER TABLE ADD COLUMN`",
      "`SELECT * FROM table_name`",
      "`DESCRIBE table_name`"
    ],
    "answer": "`INSERT INTO` (increases cardinality) and `DELETE FROM` (decreases cardinality)",
    "explanation": "DML commands INSERT and DELETE directly update the row count (Cardinality).",
    "explanationBn": "`INSERT` ও `DELETE` রো সংখ্যা পরিবর্তন করে Cardinality হ্রাস-বৃদ্ধি করে।"
  },
  {
    "id": "t3_q6",
    "question": "Degree & Cardinality Calculation Review Question #6: What happens to Degree when 6 columns are added?",
    "options": [
      "Degree increases by +6; Cardinality remains completely unchanged",
      "Cardinality increases by +6; Degree is unchanged",
      "Both Degree and Cardinality increase by +6",
      "Degree is reset to 0"
    ],
    "answer": "Degree increases by +6; Cardinality remains completely unchanged",
    "explanation": "Adding columns modifies only the schema Degree; existing rows receive NULL/default values without changing row count.",
    "explanationBn": "কলাম যোগ করলে শুধু Degree বৃদ্ধি পায়, রো সংখ্যা বা Cardinality অপরিবর্তিত থাকে।"
  },
  {
    "id": "t3_q7",
    "question": "Degree & Cardinality Calculation Review Question #7: What happens to Degree when 7 columns are added?",
    "options": [
      "Degree increases by +7; Cardinality remains completely unchanged",
      "Cardinality increases by +7; Degree is unchanged",
      "Both Degree and Cardinality increase by +7",
      "Degree is reset to 0"
    ],
    "answer": "Degree increases by +7; Cardinality remains completely unchanged",
    "explanation": "Adding columns modifies only the schema Degree; existing rows receive NULL/default values without changing row count.",
    "explanationBn": "কলাম যোগ করলে শুধু Degree বৃদ্ধি পায়, রো সংখ্যা বা Cardinality অপরিবর্তিত থাকে।"
  },
  {
    "id": "t3_q8",
    "question": "Degree & Cardinality Calculation Review Question #8: What happens to Degree when 8 columns are added?",
    "options": [
      "Degree increases by +8; Cardinality remains completely unchanged",
      "Cardinality increases by +8; Degree is unchanged",
      "Both Degree and Cardinality increase by +8",
      "Degree is reset to 0"
    ],
    "answer": "Degree increases by +8; Cardinality remains completely unchanged",
    "explanation": "Adding columns modifies only the schema Degree; existing rows receive NULL/default values without changing row count.",
    "explanationBn": "কলাম যোগ করলে শুধু Degree বৃদ্ধি পায়, রো সংখ্যা বা Cardinality অপরিবর্তিত থাকে।"
  },
  {
    "id": "t3_q9",
    "question": "Degree & Cardinality Calculation Review Question #9: What happens to Degree when 9 columns are added?",
    "options": [
      "Degree increases by +9; Cardinality remains completely unchanged",
      "Cardinality increases by +9; Degree is unchanged",
      "Both Degree and Cardinality increase by +9",
      "Degree is reset to 0"
    ],
    "answer": "Degree increases by +9; Cardinality remains completely unchanged",
    "explanation": "Adding columns modifies only the schema Degree; existing rows receive NULL/default values without changing row count.",
    "explanationBn": "কলাম যোগ করলে শুধু Degree বৃদ্ধি পায়, রো সংখ্যা বা Cardinality অপরিবর্তিত থাকে।"
  },
  {
    "id": "t3_q10",
    "question": "Degree & Cardinality Calculation Review Question #10: What happens to Degree when 10 columns are added?",
    "options": [
      "Degree increases by +10; Cardinality remains completely unchanged",
      "Cardinality increases by +10; Degree is unchanged",
      "Both Degree and Cardinality increase by +10",
      "Degree is reset to 0"
    ],
    "answer": "Degree increases by +10; Cardinality remains completely unchanged",
    "explanation": "Adding columns modifies only the schema Degree; existing rows receive NULL/default values without changing row count.",
    "explanationBn": "কলাম যোগ করলে শুধু Degree বৃদ্ধি পায়, রো সংখ্যা বা Cardinality অপরিবর্তিত থাকে।"
  },
  {
    "id": "t3_q11",
    "question": "Degree & Cardinality Calculation Review Question #11: What happens to Degree when 11 columns are added?",
    "options": [
      "Degree increases by +11; Cardinality remains completely unchanged",
      "Cardinality increases by +11; Degree is unchanged",
      "Both Degree and Cardinality increase by +11",
      "Degree is reset to 0"
    ],
    "answer": "Degree increases by +11; Cardinality remains completely unchanged",
    "explanation": "Adding columns modifies only the schema Degree; existing rows receive NULL/default values without changing row count.",
    "explanationBn": "কলাম যোগ করলে শুধু Degree বৃদ্ধি পায়, রো সংখ্যা বা Cardinality অপরিবর্তিত থাকে।"
  },
  {
    "id": "t3_q12",
    "question": "Degree & Cardinality Calculation Review Question #12: What happens to Degree when 12 columns are added?",
    "options": [
      "Degree increases by +12; Cardinality remains completely unchanged",
      "Cardinality increases by +12; Degree is unchanged",
      "Both Degree and Cardinality increase by +12",
      "Degree is reset to 0"
    ],
    "answer": "Degree increases by +12; Cardinality remains completely unchanged",
    "explanation": "Adding columns modifies only the schema Degree; existing rows receive NULL/default values without changing row count.",
    "explanationBn": "কলাম যোগ করলে শুধু Degree বৃদ্ধি পায়, রো সংখ্যা বা Cardinality অপরিবর্তিত থাকে।"
  },
  {
    "id": "t3_q13",
    "question": "Degree & Cardinality Calculation Review Question #13: What happens to Degree when 13 columns are added?",
    "options": [
      "Degree increases by +13; Cardinality remains completely unchanged",
      "Cardinality increases by +13; Degree is unchanged",
      "Both Degree and Cardinality increase by +13",
      "Degree is reset to 0"
    ],
    "answer": "Degree increases by +13; Cardinality remains completely unchanged",
    "explanation": "Adding columns modifies only the schema Degree; existing rows receive NULL/default values without changing row count.",
    "explanationBn": "কলাম যোগ করলে শুধু Degree বৃদ্ধি পায়, রো সংখ্যা বা Cardinality অপরিবর্তিত থাকে।"
  },
  {
    "id": "t3_q14",
    "question": "Degree & Cardinality Calculation Review Question #14: What happens to Degree when 14 columns are added?",
    "options": [
      "Degree increases by +14; Cardinality remains completely unchanged",
      "Cardinality increases by +14; Degree is unchanged",
      "Both Degree and Cardinality increase by +14",
      "Degree is reset to 0"
    ],
    "answer": "Degree increases by +14; Cardinality remains completely unchanged",
    "explanation": "Adding columns modifies only the schema Degree; existing rows receive NULL/default values without changing row count.",
    "explanationBn": "কলাম যোগ করলে শুধু Degree বৃদ্ধি পায়, রো সংখ্যা বা Cardinality অপরিবর্তিত থাকে।"
  },
  {
    "id": "t3_q15",
    "question": "Degree & Cardinality Calculation Review Question #15: What happens to Degree when 15 columns are added?",
    "options": [
      "Degree increases by +15; Cardinality remains completely unchanged",
      "Cardinality increases by +15; Degree is unchanged",
      "Both Degree and Cardinality increase by +15",
      "Degree is reset to 0"
    ],
    "answer": "Degree increases by +15; Cardinality remains completely unchanged",
    "explanation": "Adding columns modifies only the schema Degree; existing rows receive NULL/default values without changing row count.",
    "explanationBn": "কলাম যোগ করলে শুধু Degree বৃদ্ধি পায়, রো সংখ্যা বা Cardinality অপরিবর্তিত থাকে।"
  },
  {
    "id": "t3_q16",
    "question": "Degree & Cardinality Calculation Review Question #16: What happens to Degree when 16 columns are added?",
    "options": [
      "Degree increases by +16; Cardinality remains completely unchanged",
      "Cardinality increases by +16; Degree is unchanged",
      "Both Degree and Cardinality increase by +16",
      "Degree is reset to 0"
    ],
    "answer": "Degree increases by +16; Cardinality remains completely unchanged",
    "explanation": "Adding columns modifies only the schema Degree; existing rows receive NULL/default values without changing row count.",
    "explanationBn": "কলাম যোগ করলে শুধু Degree বৃদ্ধি পায়, রো সংখ্যা বা Cardinality অপরিবর্তিত থাকে।"
  },
  {
    "id": "t3_q17",
    "question": "Degree & Cardinality Calculation Review Question #17: What happens to Degree when 17 columns are added?",
    "options": [
      "Degree increases by +17; Cardinality remains completely unchanged",
      "Cardinality increases by +17; Degree is unchanged",
      "Both Degree and Cardinality increase by +17",
      "Degree is reset to 0"
    ],
    "answer": "Degree increases by +17; Cardinality remains completely unchanged",
    "explanation": "Adding columns modifies only the schema Degree; existing rows receive NULL/default values without changing row count.",
    "explanationBn": "কলাম যোগ করলে শুধু Degree বৃদ্ধি পায়, রো সংখ্যা বা Cardinality অপরিবর্তিত থাকে।"
  },
  {
    "id": "t3_q18",
    "question": "Degree & Cardinality Calculation Review Question #18: What happens to Degree when 18 columns are added?",
    "options": [
      "Degree increases by +18; Cardinality remains completely unchanged",
      "Cardinality increases by +18; Degree is unchanged",
      "Both Degree and Cardinality increase by +18",
      "Degree is reset to 0"
    ],
    "answer": "Degree increases by +18; Cardinality remains completely unchanged",
    "explanation": "Adding columns modifies only the schema Degree; existing rows receive NULL/default values without changing row count.",
    "explanationBn": "কলাম যোগ করলে শুধু Degree বৃদ্ধি পায়, রো সংখ্যা বা Cardinality অপরিবর্তিত থাকে।"
  },
  {
    "id": "t3_q19",
    "question": "Degree & Cardinality Calculation Review Question #19: What happens to Degree when 19 columns are added?",
    "options": [
      "Degree increases by +19; Cardinality remains completely unchanged",
      "Cardinality increases by +19; Degree is unchanged",
      "Both Degree and Cardinality increase by +19",
      "Degree is reset to 0"
    ],
    "answer": "Degree increases by +19; Cardinality remains completely unchanged",
    "explanation": "Adding columns modifies only the schema Degree; existing rows receive NULL/default values without changing row count.",
    "explanationBn": "কলাম যোগ করলে শুধু Degree বৃদ্ধি পায়, রো সংখ্যা বা Cardinality অপরিবর্তিত থাকে।"
  },
  {
    "id": "t3_q20",
    "question": "Degree & Cardinality Calculation Review Question #20: What happens to Degree when 20 columns are added?",
    "options": [
      "Degree increases by +20; Cardinality remains completely unchanged",
      "Cardinality increases by +20; Degree is unchanged",
      "Both Degree and Cardinality increase by +20",
      "Degree is reset to 0"
    ],
    "answer": "Degree increases by +20; Cardinality remains completely unchanged",
    "explanation": "Adding columns modifies only the schema Degree; existing rows receive NULL/default values without changing row count.",
    "explanationBn": "কলাম যোগ করলে শুধু Degree বৃদ্ধি পায়, রো সংখ্যা বা Cardinality অপরিবর্তিত থাকে।"
  },
  {
    "id": "t3_q21",
    "question": "Degree & Cardinality Calculation Review Question #21: What happens to Degree when 21 columns are added?",
    "options": [
      "Degree increases by +21; Cardinality remains completely unchanged",
      "Cardinality increases by +21; Degree is unchanged",
      "Both Degree and Cardinality increase by +21",
      "Degree is reset to 0"
    ],
    "answer": "Degree increases by +21; Cardinality remains completely unchanged",
    "explanation": "Adding columns modifies only the schema Degree; existing rows receive NULL/default values without changing row count.",
    "explanationBn": "কলাম যোগ করলে শুধু Degree বৃদ্ধি পায়, রো সংখ্যা বা Cardinality অপরিবর্তিত থাকে।"
  },
  {
    "id": "t3_q22",
    "question": "Degree & Cardinality Calculation Review Question #22: What happens to Degree when 22 columns are added?",
    "options": [
      "Degree increases by +22; Cardinality remains completely unchanged",
      "Cardinality increases by +22; Degree is unchanged",
      "Both Degree and Cardinality increase by +22",
      "Degree is reset to 0"
    ],
    "answer": "Degree increases by +22; Cardinality remains completely unchanged",
    "explanation": "Adding columns modifies only the schema Degree; existing rows receive NULL/default values without changing row count.",
    "explanationBn": "কলাম যোগ করলে শুধু Degree বৃদ্ধি পায়, রো সংখ্যা বা Cardinality অপরিবর্তিত থাকে।"
  },
  {
    "id": "t3_q23",
    "question": "Degree & Cardinality Calculation Review Question #23: What happens to Degree when 23 columns are added?",
    "options": [
      "Degree increases by +23; Cardinality remains completely unchanged",
      "Cardinality increases by +23; Degree is unchanged",
      "Both Degree and Cardinality increase by +23",
      "Degree is reset to 0"
    ],
    "answer": "Degree increases by +23; Cardinality remains completely unchanged",
    "explanation": "Adding columns modifies only the schema Degree; existing rows receive NULL/default values without changing row count.",
    "explanationBn": "কলাম যোগ করলে শুধু Degree বৃদ্ধি পায়, রো সংখ্যা বা Cardinality অপরিবর্তিত থাকে।"
  },
  {
    "id": "t3_q24",
    "question": "Degree & Cardinality Calculation Review Question #24: What happens to Degree when 24 columns are added?",
    "options": [
      "Degree increases by +24; Cardinality remains completely unchanged",
      "Cardinality increases by +24; Degree is unchanged",
      "Both Degree and Cardinality increase by +24",
      "Degree is reset to 0"
    ],
    "answer": "Degree increases by +24; Cardinality remains completely unchanged",
    "explanation": "Adding columns modifies only the schema Degree; existing rows receive NULL/default values without changing row count.",
    "explanationBn": "কলাম যোগ করলে শুধু Degree বৃদ্ধি পায়, রো সংখ্যা বা Cardinality অপরিবর্তিত থাকে।"
  },
  {
    "id": "t3_q25",
    "question": "Degree & Cardinality Calculation Review Question #25: What happens to Degree when 25 columns are added?",
    "options": [
      "Degree increases by +25; Cardinality remains completely unchanged",
      "Cardinality increases by +25; Degree is unchanged",
      "Both Degree and Cardinality increase by +25",
      "Degree is reset to 0"
    ],
    "answer": "Degree increases by +25; Cardinality remains completely unchanged",
    "explanation": "Adding columns modifies only the schema Degree; existing rows receive NULL/default values without changing row count.",
    "explanationBn": "কলাম যোগ করলে শুধু Degree বৃদ্ধি পায়, রো সংখ্যা বা Cardinality অপরিবর্তিত থাকে।"
  }
];
