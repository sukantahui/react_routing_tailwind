const questions = [
  {
    "question": "What numeric range does the TIME function return in Excel?",
    "options": [
      "Decimal between 0.0 and 0.9999884",
      "Integer between 1 and 24",
      "Milliseconds count",
      "Text string 'hh:mm:ss'"
    ],
    "correctAnswer": 0,
    "explanation": "A decimal fraction between 0.0000000 and 0.9999884 (representing 0:00:00 to 23:59:59). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What decimal value represents 12:00 PM (Noon) in Excel?",
    "options": [
      "0.5",
      "12.0",
      "0.12",
      "720"
    ],
    "correctAnswer": 0,
    "explanation": "0.5 (exactly half of a 24-hour day). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What decimal value represents 6:00 AM in Excel?",
    "options": [
      "0.25",
      "0.6",
      "6.0",
      "0.15"
    ],
    "correctAnswer": 0,
    "explanation": "0.25 (6 / 24). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What is the result of =TIME(25, 0, 0)?",
    "options": [
      "1:00 AM (0.041667)",
      "#NUM! error",
      "25:00:00",
      "#VALUE! error"
    ],
    "correctAnswer": 0,
    "explanation": "0.041667 (1:00 AM, hours overflow modulo 24). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What is the result of =TIME(0, 90, 0)?",
    "options": [
      "1:30 AM",
      "#NUM!",
      "0:90:00",
      "#VALUE!"
    ],
    "correctAnswer": 0,
    "explanation": "1:30 AM (90 minutes rolls into 1 hour and 30 minutes). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "How do you combine a date in A1 and a time in B1 into a complete timestamp?",
    "options": [
      "=A1 + B1",
      "=DATE(A1, B1)",
      "=CONCAT(A1, B1)",
      "=TIME(A1, B1)"
    ],
    "correctAnswer": 0,
    "explanation": "=A1 + B1. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "How many seconds are in one full Excel day (integer 1)?",
    "options": [
      "86,400",
      "1,440",
      "3,600",
      "100,000"
    ],
    "correctAnswer": 0,
    "explanation": "86,400 (24 × 60 × 60). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "How many minutes are in one full Excel day?",
    "options": [
      "1,440",
      "86,400",
      "60",
      "720"
    ],
    "correctAnswer": 0,
    "explanation": "1,440 (24 × 60). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "How do you add 30 minutes to a timestamp in A1 using simple arithmetic?",
    "options": [
      "=A1 + (30 / 1440)",
      "=A1 + 30",
      "=A1 + (30 / 60)",
      "=A1 + 0.30"
    ],
    "correctAnswer": 0,
    "explanation": "=A1 + (30 / 1440). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What custom format displays hours exceeding 24 (e.g. 36 hours total duration)?",
    "options": [
      "[h]:mm:ss",
      "hh:mm:ss",
      "HH:MM:SS",
      "[hh]:[mm]"
    ],
    "correctAnswer": 0,
    "explanation": "[h]:mm:ss (square brackets prevent hour reset). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  }
];

export default questions;
