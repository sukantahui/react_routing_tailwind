const questions = [
  {
    "question": "What is the primary objective of Date-Time Automation Project?",
    "options": [
      "Provides robust calendar and date evaluation",
      "Formats numbers as currency",
      "Converts strings to uppercase",
      "Creates pivot tables"
    ],
    "correctAnswer": 0,
    "explanation": "Provides robust, production-grade calendar and date evaluation in Excel. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "How does Excel evaluate underlying dates in Date-Time Automation Project?",
    "options": [
      "As sequential serial numbers from 1900",
      "As text strings",
      "As Unix epoch timestamps",
      "As 64-bit float coordinates"
    ],
    "correctAnswer": 0,
    "explanation": "As sequential serial numbers starting from January 1, 1900. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What error typically occurs if an invalid date argument is passed to Date-Time Automation Project?",
    "options": [
      "#VALUE! or #NUM!",
      "#NAME?",
      "#DIV/0!",
      "#NULL!"
    ],
    "correctAnswer": 0,
    "explanation": "#VALUE! or #NUM! depending on format mismatch. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "Why should analysts avoid dividing day deltas by 365 or 30?",
    "options": [
      "Creates cumulative timing distortion",
      "Excel throws circular reference",
      "Divisions are not allowed in formulas",
      "Requires add-in licenses"
    ],
    "correctAnswer": 0,
    "explanation": "Because month lengths and leap years vary, creating cumulative timing distortion in financial contracts. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "How do you safeguard Date-Time Automation Project formulas against unexpected user inputs?",
    "options": [
      "Wrap in IFERROR() or check with ISNUMBER()",
      "Lock the entire workbook",
      "Use uppercase letters only",
      "Restart Excel"
    ],
    "correctAnswer": 0,
    "explanation": "Wrap formulas in IFERROR() or validate inputs with ISNUMBER(). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "Can Date-Time Automation Project handle cell references as arguments?",
    "options": [
      "Yes, direct references and expressions supported",
      "No, only hardcoded values",
      "Only when cells are named",
      "Only in Microsoft 365"
    ],
    "correctAnswer": 0,
    "explanation": "Yes, direct cell references, named ranges, and formula expressions are fully supported. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What is the best practice for documenting complex date formulas?",
    "options": [
      "Use named ranges, helper columns, or LET()",
      "Keep formulas on a single unformatted line",
      "Write VBA macros exclusively",
      "Avoid using dates in formulas"
    ],
    "correctAnswer": 0,
    "explanation": "Use named ranges, separate intermediate steps into helper columns, or use LET(). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "How does Excel's recalculation engine treat Date-Time Automation Project?",
    "options": [
      "Recalculates with dependency tree",
      "Recalculates every millisecond",
      "Never recalculates automatically",
      "Recalculates on cloud servers only"
    ],
    "correctAnswer": 0,
    "explanation": "Standard date functions calculate during dependency tree recalculation unless marked volatile. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "Which shortcut toggles showing formulas instead of values in Excel?",
    "options": [
      "Ctrl + ~",
      "Ctrl + Shift + F",
      "Alt + F11",
      "F4"
    ],
    "correctAnswer": 0,
    "explanation": "Ctrl + ~ (tilde). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "In Coder & AccoTax training, what is the core rule for calendar engineering?",
    "options": [
      "Align logic with regulatory and business rules",
      "Always use 30-day months",
      "Hardcode holidays as numbers",
      "Avoid Excel date formulas"
    ],
    "correctAnswer": 0,
    "explanation": "Align mathematical logic strictly with regulatory and business domain rules. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  }
];

export default questions;
