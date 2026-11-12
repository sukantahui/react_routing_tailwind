const questions = [
  {
    "question": "What does =TIMEVALUE('6:00 PM') return?",
    "options": [
      "0.75",
      "18.0",
      "0.6",
      "6:00 PM"
    ],
    "correctAnswer": 0,
    "explanation": "0.75. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What happens if date information is included in =TIMEVALUE('2026-11-12 12:00 PM')?",
    "options": [
      "Date is ignored, returns 0.5",
      "Returns #VALUE!",
      "Returns 46338.5",
      "Returns #NUM!"
    ],
    "correctAnswer": 0,
    "explanation": "The date is ignored; it returns 0.5 for the time portion. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What error is returned if time_text cannot be parsed as a time?",
    "options": [
      "#VALUE!",
      "#NUM!",
      "#N/A",
      "#NAME?"
    ],
    "correctAnswer": 0,
    "explanation": "#VALUE!. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What is the result of =TIMEVALUE('24:00')?",
    "options": [
      "0.0",
      "1.0",
      "24.0",
      "#VALUE!"
    ],
    "correctAnswer": 0,
    "explanation": "0.0 (midnight). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "Can TIMEVALUE parse seconds precision like '14:30:45'?",
    "options": [
      "Yes, full precision",
      "No, rounds to minutes",
      "Only in Office 365",
      "No, throws #VALUE!"
    ],
    "correctAnswer": 0,
    "explanation": "Yes, it evaluates seconds as fractional parts of a day. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "How is =TIMEVALUE('12:00 AM') evaluated?",
    "options": [
      "0.0",
      "1.0",
      "0.5",
      "24.0"
    ],
    "correctAnswer": 0,
    "explanation": "0.0 (the beginning of the day). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What formula extracts only the time serial from a full datetime number in A1?",
    "options": [
      "=MOD(A1, 1)",
      "=TIMEVALUE(A1)",
      "=INT(A1)",
      "=TIME(A1)"
    ],
    "correctAnswer": 0,
    "explanation": "=MOD(A1, 1). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "How can you convert text '8.30 PM' with a period instead of a colon?",
    "options": [
      "=TIMEVALUE(SUBSTITUTE(A1, '.', ':'))",
      "=TIMEVALUE(A1)",
      "=CLEAN(A1)",
      "=VALUE(A1)"
    ],
    "correctAnswer": 0,
    "explanation": "=TIMEVALUE(SUBSTITUTE(A1, '.', ':')). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "Does TIMEVALUE return negative numbers?",
    "options": [
      "No, non-negative only",
      "Yes, for past times",
      "Yes, if minus sign passed",
      "Only in 1904 date system"
    ],
    "correctAnswer": 0,
    "explanation": "No, time fractions in Excel are strictly non-negative (0.0 to 0.9999). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What is the equivalent time of decimal 0.125?",
    "options": [
      "3:00 AM",
      "1:15 AM",
      "1:25 PM",
      "12:15 PM"
    ],
    "correctAnswer": 0,
    "explanation": "3:00 AM (3 / 24). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  }
];

export default questions;
