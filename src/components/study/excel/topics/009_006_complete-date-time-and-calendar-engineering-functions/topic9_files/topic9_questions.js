const questions = [
  {
    "question": "What is the primary function of EDATE?",
    "options": [
      "Adds/subtracts whole months",
      "Returns end of month",
      "Converts text to date",
      "Calculates elapsed months"
    ],
    "correctAnswer": 0,
    "explanation": "Adds or subtracts a specified number of whole months to a starting date. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What does =EDATE('2026-01-15', 3) return?",
    "options": [
      "April 15, 2026",
      "April 14, 2026",
      "May 15, 2026",
      "March 15, 2026"
    ],
    "correctAnswer": 0,
    "explanation": "April 15, 2026 (advances 3 months). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What happens when advancing January 31 by 1 month using =EDATE('2026-01-31', 1)?",
    "options": [
      "February 28, 2026",
      "March 1, 2026",
      "March 3, 2026",
      "#NUM! error"
    ],
    "correctAnswer": 0,
    "explanation": "February 28, 2026 (clamps to the last day of February). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "How do you project 6 months into the past using EDATE?",
    "options": [
      "=EDATE(start_date, -6)",
      "=EDATE(start_date, 6, -1)",
      "=EDATE(-6, start_date)",
      "=SUBTRACT(EDATE(start, 6))"
    ],
    "correctAnswer": 0,
    "explanation": "=EDATE(start_date, -6). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "Why does the result of EDATE sometimes look like a 5-digit number like 46083?",
    "options": [
      "Cell needs Date formatting",
      "It is an error code",
      "Calculation failed",
      "Excel needs internet update"
    ],
    "correctAnswer": 0,
    "explanation": "Excel outputs the raw date serial number; the cell must be formatted as Date. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What does =EDATE('2024-02-29', 12) return (leap year to non-leap year)?",
    "options": [
      "February 28, 2025",
      "March 1, 2025",
      "February 29, 2025",
      "#VALUE!"
    ],
    "correctAnswer": 0,
    "explanation": "February 28, 2025. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "How can you generate an ongoing 12-month loan EMI schedule starting in A2?",
    "options": [
      "=EDATE(A$2, ROW(A1))",
      "=A2 + 30",
      "=A2 + 365/12",
      "=MONTH(A2)+1"
    ],
    "correctAnswer": 0,
    "explanation": "Put =EDATE(A$2, ROW(A1)) in subsequent rows. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What error occurs if months is not an integer (e.g. text 'two')?",
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
    "question": "How does EDATE treat fractional months like =EDATE(A1, 2.8)?",
    "options": [
      "Truncates decimal (uses 2)",
      "Rounds up to 3",
      "Returns #VALUE!",
      "Adds fractional days"
    ],
    "correctAnswer": 0,
    "explanation": "It truncates the decimal portion and evaluates 2 months. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "Can EDATE be combined with DAY to check if an anniversary is preserved?",
    "options": [
      "Yes, preserves day",
      "No, resets to 1st",
      "Only in leap years",
      "Only on Mondays"
    ],
    "correctAnswer": 0,
    "explanation": "Yes, DAY(EDATE(A1, 12)) == DAY(A1) unless month-end clamping occurred. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  }
];

export default questions;
