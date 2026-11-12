const questions = [
  {
    "question": "What does =DAY('2026-11-12') return?",
    "options": [
      "12",
      "11",
      "2026",
      "Thursday"
    ],
    "correctAnswer": 0,
    "explanation": "12. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What does =MONTH('2026-11-12') return?",
    "options": [
      "11",
      "12",
      "November",
      "Nov"
    ],
    "correctAnswer": 0,
    "explanation": "11. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What does =YEAR('2026-11-12') return?",
    "options": [
      "2026",
      "26",
      "126",
      "#VALUE!"
    ],
    "correctAnswer": 0,
    "explanation": "2026. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What integer range is returned by =MONTH(serial)?",
    "options": [
      "1 to 12",
      "0 to 11",
      "1 to 31",
      "1 to 365"
    ],
    "correctAnswer": 0,
    "explanation": "1 to 12. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What integer range is returned by =DAY(serial)?",
    "options": [
      "1 to 31",
      "1 to 7",
      "1 to 366",
      "0 to 30"
    ],
    "correctAnswer": 0,
    "explanation": "1 to 31. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What does =YEAR(0) return in Excel's 1900 date system?",
    "options": [
      "1900",
      "0",
      "#NUM!",
      "1904"
    ],
    "correctAnswer": 0,
    "explanation": "1900 (serial 0 is treated as Jan 0, 1900). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "How can you test if two dates in A1 and B1 fall in the same calendar month and year?",
    "options": [
      "=AND(YEAR(A1)=YEAR(B1), MONTH(A1)=MONTH(B1))",
      "=MONTH(A1)=MONTH(B1)",
      "=A1=B1",
      "=DAY(A1)=DAY(B1)"
    ],
    "correctAnswer": 0,
    "explanation": "=AND(YEAR(A1)=YEAR(B1), MONTH(A1)=MONTH(B1)). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "How can you extract the 3-letter month abbreviation as text?",
    "options": [
      "=TEXT(A1, 'mmm')",
      "=MONTH(A1, 3)",
      "=MID(A1, 1, 3)",
      "=ABBR(A1)"
    ],
    "correctAnswer": 0,
    "explanation": "=TEXT(A1, 'mmm'). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What error occurs if you pass negative serial numbers in the 1900 date system?",
    "options": [
      "#NUM!",
      "#VALUE!",
      "#REF!",
      "Negative year"
    ],
    "correctAnswer": 0,
    "explanation": "#NUM!. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What does =DAY(DATE(2026, 3, 0)) return?",
    "options": [
      "28",
      "29",
      "0",
      "1"
    ],
    "correctAnswer": 0,
    "explanation": "28 (the last day of February 2026). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  }
];

export default questions;
