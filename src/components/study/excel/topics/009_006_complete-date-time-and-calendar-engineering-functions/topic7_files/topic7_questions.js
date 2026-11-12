const questions = [
  {
    "question": "What is the argument order for the DAYS function?",
    "options": [
      "=DAYS(end_date, start_date)",
      "=DAYS(start_date, end_date)",
      "=DAYS(date1, date2, unit)",
      "=DAYS(interval)"
    ],
    "correctAnswer": 0,
    "explanation": "=DAYS(end_date, start_date). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What does DAYS return if end_date is chronologically earlier than start_date?",
    "options": [
      "A negative integer",
      "#NUM! error",
      "#VALUE! error",
      "0"
    ],
    "correctAnswer": 0,
    "explanation": "A negative integer. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What is the result of =DAYS('2026-11-20', '2026-11-10')?",
    "options": [
      "10",
      "-10",
      "11",
      "9"
    ],
    "correctAnswer": 0,
    "explanation": "10. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "How is =DAYS(B1, A1) different from simple subtraction =B1 - A1?",
    "options": [
      "Parses text date strings directly",
      "DAYS ignores weekends",
      "DAYS returns weeks",
      "DAYS only works on leap years"
    ],
    "correctAnswer": 0,
    "explanation": "DAYS can parse text date strings directly without manual coercion. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What does =DAYS(TODAY(), TODAY()) return?",
    "options": [
      "0",
      "1",
      "-1",
      "#VALUE!"
    ],
    "correctAnswer": 0,
    "explanation": "0. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "Can DAYS handle time components in datetime inputs?",
    "options": [
      "Strips fractional time",
      "Returns fractional days",
      "Throws #VALUE!",
      "Rounds up"
    ],
    "correctAnswer": 0,
    "explanation": "Yes, it evaluates integer day boundaries, stripping fractional time. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What error is returned if arguments cannot be parsed as dates?",
    "options": [
      "#VALUE!",
      "#NUM!",
      "#NAME?",
      "#N/A"
    ],
    "correctAnswer": 0,
    "explanation": "#VALUE!. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "Does DAYS count business days or total calendar days?",
    "options": [
      "Total calendar days",
      "Business days only",
      "360-day basis",
      "Weekdays only"
    ],
    "correctAnswer": 0,
    "explanation": "Total calendar days (7 days a week). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "Which function should you use if you need business days excluding weekends?",
    "options": [
      "NETWORKDAYS",
      "DAYS",
      "DATEDIF",
      "DAYS360"
    ],
    "correctAnswer": 0,
    "explanation": "NETWORKDAYS or NETWORKDAYS.INTL. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What is =DAYS('2026-03-01', '2026-02-28') in a non-leap year?",
    "options": [
      "1",
      "2",
      "0",
      "-1"
    ],
    "correctAnswer": 0,
    "explanation": "1. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  }
];

export default questions;
