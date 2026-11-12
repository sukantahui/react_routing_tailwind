const questions = [
  {
    "question": "What is the primary function of =NOW() in Excel?",
    "options": [
      "Returns current date and time",
      "Returns current time only",
      "Returns system uptime",
      "Formats text into date"
    ],
    "correctAnswer": 0,
    "explanation": "Returns the current system date and time as a serial number. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "Is the NOW function volatile in Excel?",
    "options": [
      "Yes, volatile",
      "No, it updates once per hour",
      "Only on Excel for Web",
      "Only inside VBA"
    ],
    "correctAnswer": 0,
    "explanation": "Yes, it recalculates whenever any cell in the workbook recalculates or F9 is pressed. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "How can you extract only the date portion from =NOW()?",
    "options": [
      "=INT(NOW())",
      "=ROUND(NOW(), 0)",
      "=TRUNC(NOW(), 2)",
      "=DATE(NOW())"
    ],
    "correctAnswer": 0,
    "explanation": "=INT(NOW()) or =TODAY(). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "How does Excel store 6:00 PM in the serial number returned by NOW()?",
    "options": [
      "0.75",
      "0.6",
      "18.0",
      "0.5"
    ],
    "correctAnswer": 0,
    "explanation": "As 0.75 (18 hours out of 24). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What keyboard shortcut inserts a static, unrefreshing current date in Excel?",
    "options": [
      "Ctrl + ;",
      "Ctrl + Shift + ;",
      "Alt + Shift + D",
      "F9"
    ],
    "correctAnswer": 0,
    "explanation": "Ctrl + ;. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What keyboard shortcut inserts a static current time in Excel?",
    "options": [
      "Ctrl + Shift + ;",
      "Ctrl + ;",
      "Alt + T",
      "Ctrl + Alt + T"
    ],
    "correctAnswer": 0,
    "explanation": "Ctrl + Shift + ;. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What happens if a cell formatted as General contains =NOW()?",
    "options": [
      "Applies default Date and Time format",
      "Displays raw serial decimal number",
      "Throws #VALUE!",
      "Shows text string"
    ],
    "correctAnswer": 0,
    "explanation": "Excel automatically applies a default Date and Time format to the cell. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "How can you calculate elapsed hours between a past timestamp in A1 and =NOW()?",
    "options": [
      "=(NOW() - A1) * 24",
      "=NOW() - A1",
      "=(NOW() - A1) / 24",
      "=HOUR(NOW() - A1)"
    ],
    "correctAnswer": 0,
    "explanation": "=(NOW() - A1) * 24. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "How can you calculate elapsed minutes between A1 and =NOW()?",
    "options": [
      "=(NOW() - A1) * 1440",
      "=(NOW() - A1) * 60",
      "=(NOW() - A1) / 1440",
      "=MINUTE(NOW() - A1)"
    ],
    "correctAnswer": 0,
    "explanation": "=(NOW() - A1) * 1440. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "Why should analysts avoid excessive use of =NOW() in large enterprise models?",
    "options": [
      "Causes performance degradation",
      "It requires internet connectivity",
      "It has a 100-row limit",
      "It breaks pivot tables"
    ],
    "correctAnswer": 0,
    "explanation": "Because volatile functions force continuous sheet recalculations, causing noticeable performance degradation. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  }
];

export default questions;
