const questions = [
  {
    "question": "What does =EOMONTH('2026-02-10', 0) return?",
    "options": [
      "February 28, 2026",
      "February 29, 2026",
      "March 1, 2026",
      "March 31, 2026"
    ],
    "correctAnswer": 0,
    "explanation": "February 28, 2026 (last day of the current month). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What does =EOMONTH('2024-02-10', 0) return in a leap year?",
    "options": [
      "February 29, 2024",
      "February 28, 2024",
      "March 1, 2024",
      "March 31, 2024"
    ],
    "correctAnswer": 0,
    "explanation": "February 29, 2024. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What does =EOMONTH(A1, 1) return?",
    "options": [
      "Last day of next month",
      "First day of next month",
      "Same day next month",
      "Last day of current month"
    ],
    "correctAnswer": 0,
    "explanation": "The last day of next month. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "How do you calculate the first day of the current month using EOMONTH?",
    "options": [
      "=EOMONTH(TODAY(), -1) + 1",
      "=EOMONTH(TODAY(), 0) + 1",
      "=EOMONTH(TODAY(), 1) - 30",
      "=DATE(TODAY(), 1, 1)"
    ],
    "correctAnswer": 0,
    "explanation": "=EOMONTH(TODAY(), -1) + 1. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What does =EOMONTH('2026-01-15', -1) return?",
    "options": [
      "December 31, 2025",
      "January 1, 2026",
      "January 31, 2026",
      "December 1, 2025"
    ],
    "correctAnswer": 0,
    "explanation": "December 31, 2025. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "How can you count the total number of days in the month containing date A1?",
    "options": [
      "=DAY(EOMONTH(A1, 0))",
      "=EOMONTH(A1, 0) - A1",
      "=DAYS(EOMONTH(A1,0), A1)",
      "=MONTH(A1) * 30"
    ],
    "correctAnswer": 0,
    "explanation": "=DAY(EOMONTH(A1, 0)). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What error is returned if months is text like 'three' in EOMONTH?",
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
    "question": "How does EOMONTH handle fractional months like =EOMONTH(A1, 1.9)?",
    "options": [
      "Truncates to 1",
      "Rounds to 2",
      "Returns #VALUE!",
      "Adds 27 days"
    ],
    "correctAnswer": 0,
    "explanation": "Truncates to integer 1. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "How do you find the last day of the fiscal quarter containing date A1?",
    "options": [
      "=EOMONTH(A1, MOD(3 - MONTH(A1), 3))",
      "=EOMONTH(A1, 3)",
      "=EOMONTH(A1, 0) + 90",
      "=QUARTER(A1)"
    ],
    "correctAnswer": 0,
    "explanation": "=EOMONTH(A1, MOD(3 - MONTH(A1), 3)). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What format should be applied to view EOMONTH outputs properly?",
    "options": [
      "Short Date or Long Date",
      "General",
      "Percentage",
      "Scientific"
    ],
    "correctAnswer": 0,
    "explanation": "Short Date or Long Date. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  }
];

export default questions;
