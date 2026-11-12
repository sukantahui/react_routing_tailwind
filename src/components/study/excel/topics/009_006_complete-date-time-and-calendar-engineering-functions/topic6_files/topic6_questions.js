const questions = [
  {
    "question": "What integer range does =HOUR(serial) return?",
    "options": [
      "0 to 23",
      "1 to 24",
      "1 to 12",
      "0 to 59"
    ],
    "correctAnswer": 0,
    "explanation": "0 to 23. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What does =HOUR('15:45:30') return?",
    "options": [
      "15",
      "3",
      "45",
      "30"
    ],
    "correctAnswer": 0,
    "explanation": "15. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What does =MINUTE('15:45:30') return?",
    "options": [
      "45",
      "15",
      "30",
      "0.75"
    ],
    "correctAnswer": 0,
    "explanation": "45. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What does =SECOND('15:45:30') return?",
    "options": [
      "30",
      "45",
      "15",
      "0.5"
    ],
    "correctAnswer": 0,
    "explanation": "30. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What does =HOUR('12:00 AM') return?",
    "options": [
      "0",
      "12",
      "24",
      "1"
    ],
    "correctAnswer": 0,
    "explanation": "0. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What does =HOUR('12:00 PM') return?",
    "options": [
      "12",
      "0",
      "24",
      "6"
    ],
    "correctAnswer": 0,
    "explanation": "12. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "If duration between A1 and B1 is 26 hours, what does =HOUR(B1 - A1) return?",
    "options": [
      "2",
      "26",
      "#NUM!",
      "1"
    ],
    "correctAnswer": 0,
    "explanation": "2 (because HOUR evaluates modulo 24). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "How do you correctly compute total elapsed hours across multiple days?",
    "options": [
      "=(B1 - A1) * 24",
      "=HOUR(B1 - A1)",
      "=INT(B1 - A1) * 24",
      "=HOUR(B1) - HOUR(A1)"
    ],
    "correctAnswer": 0,
    "explanation": "=(B1 - A1) * 24. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "How do you format cell A1 to display elapsed hours over 24 as [h]:mm?",
    "options": [
      "Custom format: [h]:mm",
      "hh:mm",
      "HH:MM",
      "h:mm:ss"
    ],
    "correctAnswer": 0,
    "explanation": "Custom format: [h]:mm. Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  },
  {
    "question": "What does =MINUTE(0.5) return?",
    "options": [
      "0",
      "30",
      "12",
      "50"
    ],
    "correctAnswer": 0,
    "explanation": "0 (0.5 represents exactly 12:00:00 PM). Detailed conceptual insight from Coder & AccoTax masterclass syllabus."
  }
];

export default questions;
