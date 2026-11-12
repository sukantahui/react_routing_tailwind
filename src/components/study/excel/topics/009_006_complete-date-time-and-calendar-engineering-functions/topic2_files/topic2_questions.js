const questions = [
  {
    "question": "What is the primary purpose of the DATEVALUE function?",
    "options": [
      "Converts text formatted dates into numeric serials",
      "Formats serials into text",
      "Returns current system date",
      "Extracts the day of the week"
    ],
    "correctAnswer": 0,
    "explanation": "Converts text formatted dates into numeric Excel date serials. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What happens to time components when passing '2026-11-12 15:45' to DATEVALUE?",
    "options": [
      "Time is discarded",
      "Returns #VALUE!",
      "Includes decimal time",
      "Rounds to nearest day"
    ],
    "correctAnswer": 0,
    "explanation": "The time component is discarded; only the integer date serial is returned. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What error does DATEVALUE return if given an unparseable text string like 'invalid'?",
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
    "question": "Can DATEVALUE parse dates outside the range 1900 to 9999?",
    "options": [
      "No, returns #VALUE!",
      "Yes, supports negative years",
      "Yes, up to year 99999",
      "Only in Excel for Mac"
    ],
    "correctAnswer": 0,
    "explanation": "No, dates before Jan 1, 1900 or after Dec 31, 9999 return #VALUE!. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "How can you test whether cell A1 is a text date rather than a true date serial?",
    "options": [
      "=ISTEXT(A1) returns TRUE",
      "=ISDATE(A1)",
      "=DATEVALUE(A1)",
      "=CHECK(A1)"
    ],
    "correctAnswer": 0,
    "explanation": "=ISTEXT(A1) returns TRUE, or =ISNUMBER(A1) returns FALSE. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What alternative mathematical coercion converts a numeric text date into a serial without DATEVALUE?",
    "options": [
      "=--A1 or =A1*1",
      "=A1 & 0",
      "=ROUND(A1)",
      "=ABS(A1)"
    ],
    "correctAnswer": 0,
    "explanation": "=A1 * 1 or =--A1. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "Does DATEVALUE depend on operating system regional locale settings?",
    "options": [
      "Yes, depends on OS locale",
      "No, always US format",
      "No, always ISO format",
      "Only in Excel 2016"
    ],
    "correctAnswer": 0,
    "explanation": "Yes, ambiguous formats like '05/06/2026' are parsed based on local Windows date settings (MDY vs DMY). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What is the return value of =DATEVALUE('2026-01-01') formatted as General?",
    "options": [
      "46023",
      "2026-01-01",
      "1-Jan-2026",
      "1"
    ],
    "correctAnswer": 0,
    "explanation": "46023 (the exact serial number). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "How should you handle text dates exported with hidden non-breaking spaces (CHAR(160))?",
    "options": [
      "Wrap in SUBSTITUTE(A1, CHAR(160), ' ')",
      "Press F9",
      "Format as Currency",
      "Use TRIM alone"
    ],
    "correctAnswer": 0,
    "explanation": "Wrap in SUBSTITUTE(A1, CHAR(160), ' ') before calling DATEVALUE. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "Why will =DATEVALUE(A1) throw an error if A1 is already a numeric date?",
    "options": [
      "Expects text string argument",
      "Dates are too large",
      "Numeric dates overflow",
      "It requires 2 arguments"
    ],
    "correctAnswer": 0,
    "explanation": "DATEVALUE expects a text string argument; passing an existing numeric date serial can trigger #VALUE!. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  }
];

export default questions;
