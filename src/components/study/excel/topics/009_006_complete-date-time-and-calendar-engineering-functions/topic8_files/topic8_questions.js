const questions = [
  {
    "question": "What calendar convention does DAYS360 use?",
    "options": [
      "Twelve 30-day months (360 days)",
      "Actual 365.25 days",
      "365 calendar days",
      "Business days only"
    ],
    "correctAnswer": 0,
    "explanation": "A 360-day commercial year where every month has exactly 30 days. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What industry predominantly uses the 30/360 convention?",
    "options": [
      "Bond markets and fixed-income",
      "Biometric HR payroll",
      "Civil aviation navigation",
      "Medical records"
    ],
    "correctAnswer": 0,
    "explanation": "Bond markets, fixed-income securities, and commercial loans. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What does the optional method argument in DAYS360 do?",
    "options": [
      "FALSE = US, TRUE = European",
      "FALSE = Actual, TRUE = 360",
      "FALSE = Inclusive, TRUE = Exclusive",
      "Enables leap years"
    ],
    "correctAnswer": 0,
    "explanation": "FALSE or omitted selects the US (NASD) method; TRUE selects the European method. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What is =DAYS360('2026-01-01', '2026-02-01')?",
    "options": [
      "30",
      "31",
      "28",
      "29"
    ],
    "correctAnswer": 0,
    "explanation": "30. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What is =DAYS360('2026-01-01', '2026-03-01')?",
    "options": [
      "60",
      "59",
      "61",
      "58"
    ],
    "correctAnswer": 0,
    "explanation": "60 (two 30-day months). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "In the US method, what happens if start_date is the 31st of a month?",
    "options": [
      "Adjusted to the 30th",
      "Adjusted to the 1st next month",
      "Throws #NUM!",
      "Left as 31st"
    ],
    "correctAnswer": 0,
    "explanation": "It is adjusted to the 30th of the same month. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What does =DAYS360('2026-01-01', '2027-01-01') return?",
    "options": [
      "360",
      "365",
      "366",
      "364"
    ],
    "correctAnswer": 0,
    "explanation": "360. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What error is returned if dates cannot be parsed in DAYS360?",
    "options": [
      "#VALUE!",
      "#NUM!",
      "#REF!",
      "#N/A"
    ],
    "correctAnswer": 0,
    "explanation": "#VALUE!. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What happens if start_date is after end_date in DAYS360?",
    "options": [
      "Returns negative integer",
      "Returns #NUM!",
      "Returns #VALUE!",
      "Returns 0"
    ],
    "correctAnswer": 0,
    "explanation": "Returns a negative integer count. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "Is DAYS360 suitable for employee payroll attendance calculations?",
    "options": [
      "No, not suitable for payroll",
      "Yes, mandated by labor law",
      "Only in February",
      "Yes, in 6-day companies"
    ],
    "correctAnswer": 0,
    "explanation": "No, payroll requires actual calendar days or working days, not a 360-day bond model. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  }
];

export default questions;
