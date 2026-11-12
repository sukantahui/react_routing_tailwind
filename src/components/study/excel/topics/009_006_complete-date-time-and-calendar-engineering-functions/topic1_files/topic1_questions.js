const questions = [
  {
    "question": "What is the primary benefit of using =DATE(year, month, day)?",
    "options": [
      "Locale-safe date construction",
      "It converts text to uppercase",
      "It rounds dates to the nearest week",
      "It connects to internet clocks"
    ],
    "correctAnswer": 0,
    "explanation": "It guarantees locale-safe date construction avoiding regional MM/DD vs DD/MM parsing errors. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What does =DATE(2026, 13, 1) evaluate to in Excel?",
    "options": [
      "January 1, 2027",
      "#VALUE! error",
      "#NUM! error",
      "December 1, 2026"
    ],
    "correctAnswer": 0,
    "explanation": "January 1, 2027 (month overflows automatically roll into the next year). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What does =DATE(2026, 3, 0) return in Excel?",
    "options": [
      "February 28, 2026",
      "March 1, 2026",
      "#NUM!",
      "March 31, 2026"
    ],
    "correctAnswer": 0,
    "explanation": "February 28, 2026 (day 0 refers to the last day of the preceding month). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What is the result of =DATE(2024, 2, 29) in Excel?",
    "options": [
      "February 29, 2024",
      "March 1, 2024",
      "#VALUE!",
      "February 28, 2024"
    ],
    "correctAnswer": 0,
    "explanation": "February 29, 2024 (valid leap year date). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What is the result of =DATE(2025, 2, 29) in Excel (non-leap year)?",
    "options": [
      "March 1, 2025",
      "#NUM!",
      "#VALUE!",
      "February 28, 2025"
    ],
    "correctAnswer": 0,
    "explanation": "March 1, 2025 (overflows 1 day past Feb 28). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "How does Excel interpret a 2-digit year like =DATE(25, 1, 1)?",
    "options": [
      "Mapped to 2000-2029 (2025)",
      "Mapped to 1925",
      "#VALUE!",
      "Mapped to year 0025 AD"
    ],
    "correctAnswer": 0,
    "explanation": "Years 00 to 29 are mapped to 2000-2029; years 30 to 99 are mapped to 1930-1999. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "How can you dynamically construct the first day of next month from date A1?",
    "options": [
      "=DATE(YEAR(A1), MONTH(A1)+1, 1)",
      "=A1 + 30",
      "=EOMONTH(A1, 1)",
      "=DATE(YEAR(A1), 1, 1)"
    ],
    "correctAnswer": 0,
    "explanation": "=DATE(YEAR(A1), MONTH(A1)+1, 1). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What error occurs if you pass text like =DATE('year', 1, 1)?",
    "options": [
      "#VALUE!",
      "#NUM!",
      "#NAME?",
      "#REF!"
    ],
    "correctAnswer": 0,
    "explanation": "#VALUE!. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "Can you pass negative numbers to the month argument of DATE?",
    "options": [
      "Yes, subtracts months",
      "No, returns #NUM!",
      "No, returns #VALUE!",
      "Only in Office 365"
    ],
    "correctAnswer": 0,
    "explanation": "Yes, Excel subtracts months from the beginning of the specified year. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What serial number represents January 1, 1900 in Excel's 1900 date system?",
    "options": [
      "1",
      "0",
      "1900",
      "0.1"
    ],
    "correctAnswer": 0,
    "explanation": "1. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  }
];

export default questions;
