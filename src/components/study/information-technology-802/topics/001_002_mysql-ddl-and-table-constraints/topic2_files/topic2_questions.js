const questions = [
  {
    "id": "q1",
    "question": "Q1: In the data type definition DECIMAL(p, s), what do 'p' and 's' represent respectively?",
    "options": [
      "p = Precision (Total number of digits), s = Scale (Number of digits after the decimal point)",
      "p = Power, s = Sign",
      "p = Digits before decimal, s = Digits after decimal",
      "p = Positive numbers, s = Signed numbers"
    ],
    "answer": "p = Precision (Total number of digits), s = Scale (Number of digits after the decimal point)",
    "explanation": "In DECIMAL(p, s), p is the precision (total significant digits) and s is the scale (digits to the right of decimal point).",
    "explanationBn": "DECIMAL(p, s)-এ p হলো Precision (মোট অঙ্ক সংখ্যা) এবং s হলো Scale (দশমিকের পরের অঙ্ক সংখ্যা)।",
    "topic": "DECIMAL(p, s) Precision & Scale",
    "difficulty": "Easy",
    "hint": "Total digits vs fractional digits."
  },
  {
    "id": "q2",
    "question": "Q2: What is the maximum storable positive value in a column defined as DECIMAL(3, 2)?",
    "options": [
      "9.99",
      "99.9",
      "999.00",
      "9.999"
    ],
    "answer": "9.99",
    "explanation": "For DECIMAL(3,2): Total digits = 3, Digits after decimal = 2, Digits before decimal = 3 - 2 = 1. The maximum value with 1 integer digit and 2 decimal digits is 9.99.",
    "explanationBn": "DECIMAL(3,2)-এর ক্ষেত্রে মোট অঙ্ক ৩, দশমিকের পরে ২, দশমিকের পূর্বে ৩ - ২ = ১ অঙ্ক। সর্বোচ্চ মান হলো ৯.৯৯।",
    "topic": "DECIMAL(p, s) Precision & Scale",
    "difficulty": "Medium",
    "hint": "Calculate (p - s) for integer digits and s for decimal digits."
  },
  {
    "id": "q3",
    "question": "Q3: If a movie database column is declared as `IMDb_Rating DECIMAL(3, 2)`, what error occurs if you try to insert 10.00?",
    "options": [
      "Error 1264: Out of range value (because 10.00 requires 2 digits before the decimal point)",
      "It rounds to 9.99 automatically without warning",
      "It converts 10.00 into NULL",
      "It creates an extra column automatically"
    ],
    "answer": "Error 1264: Out of range value (because 10.00 requires 2 digits before the decimal point)",
    "explanation": "DECIMAL(3,2) allows only 1 digit to the left of the decimal point (p - s = 1). The value 10.00 has 2 digits before the decimal ('10'), exceeding the precision.",
    "explanationBn": "DECIMAL(3,2)-এ দশমিকের আগে কেবল ১টি অঙ্ক গ্রহণযোগ্য। 10.00-এ ২টি অঙ্ক থাকায় 'Out of range value' এরর হয়।",
    "topic": "DECIMAL(p, s) Precision & Scale",
    "difficulty": "Hard",
    "hint": "Compare the required integer digits of 10.00 with (3 - 2 = 1)."
  },
  {
    "id": "q4",
    "question": "Q4: What is the maximum number of digits allowed before the decimal point in DECIMAL(6, 2)?",
    "options": [
      "4 (calculated as 6 - 2)",
      "6",
      "2",
      "8"
    ],
    "answer": "4 (calculated as 6 - 2)",
    "explanation": "The maximum number of digits before the decimal point is given by (p - s) = 6 - 2 = 4 digits (e.g. 9999.99).",
    "explanationBn": "দশমিকের আগের অঙ্ক সংখ্যা = p - s = ৬ - ২ = ৪টি অঙ্ক।",
    "topic": "DECIMAL(p, s) Precision & Scale",
    "difficulty": "Easy",
    "hint": "Use the formula: Integer digits = Precision - Scale."
  },
  {
    "id": "q5",
    "question": "Q5: In the data type definition DECIMAL(p, s), what do 'p' and 's' represent respectively?",
    "options": [
      "p = Precision (Total number of digits), s = Scale (Number of digits after the decimal point)",
      "p = Power, s = Sign",
      "p = Digits before decimal, s = Digits after decimal",
      "p = Positive numbers, s = Signed numbers"
    ],
    "answer": "p = Precision (Total number of digits), s = Scale (Number of digits after the decimal point)",
    "explanation": "In DECIMAL(p, s), p is the precision (total significant digits) and s is the scale (digits to the right of decimal point).",
    "explanationBn": "DECIMAL(p, s)-এ p হলো Precision (মোট অঙ্ক সংখ্যা) এবং s হলো Scale (দশমিকের পরের অঙ্ক সংখ্যা)।",
    "topic": "DECIMAL(p, s) Precision & Scale",
    "difficulty": "Easy",
    "hint": "Total digits vs fractional digits."
  },
  {
    "id": "q6",
    "question": "Q6: What is the maximum storable positive value in a column defined as DECIMAL(3, 2)?",
    "options": [
      "9.99",
      "99.9",
      "999.00",
      "9.999"
    ],
    "answer": "9.99",
    "explanation": "For DECIMAL(3,2): Total digits = 3, Digits after decimal = 2, Digits before decimal = 3 - 2 = 1. The maximum value with 1 integer digit and 2 decimal digits is 9.99.",
    "explanationBn": "DECIMAL(3,2)-এর ক্ষেত্রে মোট অঙ্ক ৩, দশমিকের পরে ২, দশমিকের পূর্বে ৩ - ২ = ১ অঙ্ক। সর্বোচ্চ মান হলো ৯.৯৯।",
    "topic": "DECIMAL(p, s) Precision & Scale",
    "difficulty": "Medium",
    "hint": "Calculate (p - s) for integer digits and s for decimal digits."
  },
  {
    "id": "q7",
    "question": "Q7: If a movie database column is declared as `IMDb_Rating DECIMAL(3, 2)`, what error occurs if you try to insert 10.00?",
    "options": [
      "Error 1264: Out of range value (because 10.00 requires 2 digits before the decimal point)",
      "It rounds to 9.99 automatically without warning",
      "It converts 10.00 into NULL",
      "It creates an extra column automatically"
    ],
    "answer": "Error 1264: Out of range value (because 10.00 requires 2 digits before the decimal point)",
    "explanation": "DECIMAL(3,2) allows only 1 digit to the left of the decimal point (p - s = 1). The value 10.00 has 2 digits before the decimal ('10'), exceeding the precision.",
    "explanationBn": "DECIMAL(3,2)-এ দশমিকের আগে কেবল ১টি অঙ্ক গ্রহণযোগ্য। 10.00-এ ২টি অঙ্ক থাকায় 'Out of range value' এরর হয়।",
    "topic": "DECIMAL(p, s) Precision & Scale",
    "difficulty": "Hard",
    "hint": "Compare the required integer digits of 10.00 with (3 - 2 = 1)."
  },
  {
    "id": "q8",
    "question": "Q8: What is the maximum number of digits allowed before the decimal point in DECIMAL(6, 2)?",
    "options": [
      "4 (calculated as 6 - 2)",
      "6",
      "2",
      "8"
    ],
    "answer": "4 (calculated as 6 - 2)",
    "explanation": "The maximum number of digits before the decimal point is given by (p - s) = 6 - 2 = 4 digits (e.g. 9999.99).",
    "explanationBn": "দশমিকের আগের অঙ্ক সংখ্যা = p - s = ৬ - ২ = ৪টি অঙ্ক।",
    "topic": "DECIMAL(p, s) Precision & Scale",
    "difficulty": "Easy",
    "hint": "Use the formula: Integer digits = Precision - Scale."
  },
  {
    "id": "q9",
    "question": "Q9: In the data type definition DECIMAL(p, s), what do 'p' and 's' represent respectively?",
    "options": [
      "p = Precision (Total number of digits), s = Scale (Number of digits after the decimal point)",
      "p = Power, s = Sign",
      "p = Digits before decimal, s = Digits after decimal",
      "p = Positive numbers, s = Signed numbers"
    ],
    "answer": "p = Precision (Total number of digits), s = Scale (Number of digits after the decimal point)",
    "explanation": "In DECIMAL(p, s), p is the precision (total significant digits) and s is the scale (digits to the right of decimal point).",
    "explanationBn": "DECIMAL(p, s)-এ p হলো Precision (মোট অঙ্ক সংখ্যা) এবং s হলো Scale (দশমিকের পরের অঙ্ক সংখ্যা)।",
    "topic": "DECIMAL(p, s) Precision & Scale",
    "difficulty": "Easy",
    "hint": "Total digits vs fractional digits."
  },
  {
    "id": "q10",
    "question": "Q10: What is the maximum storable positive value in a column defined as DECIMAL(3, 2)?",
    "options": [
      "9.99",
      "99.9",
      "999.00",
      "9.999"
    ],
    "answer": "9.99",
    "explanation": "For DECIMAL(3,2): Total digits = 3, Digits after decimal = 2, Digits before decimal = 3 - 2 = 1. The maximum value with 1 integer digit and 2 decimal digits is 9.99.",
    "explanationBn": "DECIMAL(3,2)-এর ক্ষেত্রে মোট অঙ্ক ৩, দশমিকের পরে ২, দশমিকের পূর্বে ৩ - ২ = ১ অঙ্ক। সর্বোচ্চ মান হলো ৯.৯৯।",
    "topic": "DECIMAL(p, s) Precision & Scale",
    "difficulty": "Medium",
    "hint": "Calculate (p - s) for integer digits and s for decimal digits."
  },
  {
    "id": "q11",
    "question": "Q11: If a movie database column is declared as `IMDb_Rating DECIMAL(3, 2)`, what error occurs if you try to insert 10.00?",
    "options": [
      "Error 1264: Out of range value (because 10.00 requires 2 digits before the decimal point)",
      "It rounds to 9.99 automatically without warning",
      "It converts 10.00 into NULL",
      "It creates an extra column automatically"
    ],
    "answer": "Error 1264: Out of range value (because 10.00 requires 2 digits before the decimal point)",
    "explanation": "DECIMAL(3,2) allows only 1 digit to the left of the decimal point (p - s = 1). The value 10.00 has 2 digits before the decimal ('10'), exceeding the precision.",
    "explanationBn": "DECIMAL(3,2)-এ দশমিকের আগে কেবল ১টি অঙ্ক গ্রহণযোগ্য। 10.00-এ ২টি অঙ্ক থাকায় 'Out of range value' এরর হয়।",
    "topic": "DECIMAL(p, s) Precision & Scale",
    "difficulty": "Hard",
    "hint": "Compare the required integer digits of 10.00 with (3 - 2 = 1)."
  },
  {
    "id": "q12",
    "question": "Q12: What is the maximum number of digits allowed before the decimal point in DECIMAL(6, 2)?",
    "options": [
      "4 (calculated as 6 - 2)",
      "6",
      "2",
      "8"
    ],
    "answer": "4 (calculated as 6 - 2)",
    "explanation": "The maximum number of digits before the decimal point is given by (p - s) = 6 - 2 = 4 digits (e.g. 9999.99).",
    "explanationBn": "দশমিকের আগের অঙ্ক সংখ্যা = p - s = ৬ - ২ = ৪টি অঙ্ক।",
    "topic": "DECIMAL(p, s) Precision & Scale",
    "difficulty": "Easy",
    "hint": "Use the formula: Integer digits = Precision - Scale."
  },
  {
    "id": "q13",
    "question": "Q13: In the data type definition DECIMAL(p, s), what do 'p' and 's' represent respectively?",
    "options": [
      "p = Precision (Total number of digits), s = Scale (Number of digits after the decimal point)",
      "p = Power, s = Sign",
      "p = Digits before decimal, s = Digits after decimal",
      "p = Positive numbers, s = Signed numbers"
    ],
    "answer": "p = Precision (Total number of digits), s = Scale (Number of digits after the decimal point)",
    "explanation": "In DECIMAL(p, s), p is the precision (total significant digits) and s is the scale (digits to the right of decimal point).",
    "explanationBn": "DECIMAL(p, s)-এ p হলো Precision (মোট অঙ্ক সংখ্যা) এবং s হলো Scale (দশমিকের পরের অঙ্ক সংখ্যা)।",
    "topic": "DECIMAL(p, s) Precision & Scale",
    "difficulty": "Easy",
    "hint": "Total digits vs fractional digits."
  },
  {
    "id": "q14",
    "question": "Q14: What is the maximum storable positive value in a column defined as DECIMAL(3, 2)?",
    "options": [
      "9.99",
      "99.9",
      "999.00",
      "9.999"
    ],
    "answer": "9.99",
    "explanation": "For DECIMAL(3,2): Total digits = 3, Digits after decimal = 2, Digits before decimal = 3 - 2 = 1. The maximum value with 1 integer digit and 2 decimal digits is 9.99.",
    "explanationBn": "DECIMAL(3,2)-এর ক্ষেত্রে মোট অঙ্ক ৩, দশমিকের পরে ২, দশমিকের পূর্বে ৩ - ২ = ১ অঙ্ক। সর্বোচ্চ মান হলো ৯.৯৯।",
    "topic": "DECIMAL(p, s) Precision & Scale",
    "difficulty": "Medium",
    "hint": "Calculate (p - s) for integer digits and s for decimal digits."
  },
  {
    "id": "q15",
    "question": "Q15: If a movie database column is declared as `IMDb_Rating DECIMAL(3, 2)`, what error occurs if you try to insert 10.00?",
    "options": [
      "Error 1264: Out of range value (because 10.00 requires 2 digits before the decimal point)",
      "It rounds to 9.99 automatically without warning",
      "It converts 10.00 into NULL",
      "It creates an extra column automatically"
    ],
    "answer": "Error 1264: Out of range value (because 10.00 requires 2 digits before the decimal point)",
    "explanation": "DECIMAL(3,2) allows only 1 digit to the left of the decimal point (p - s = 1). The value 10.00 has 2 digits before the decimal ('10'), exceeding the precision.",
    "explanationBn": "DECIMAL(3,2)-এ দশমিকের আগে কেবল ১টি অঙ্ক গ্রহণযোগ্য। 10.00-এ ২টি অঙ্ক থাকায় 'Out of range value' এরর হয়।",
    "topic": "DECIMAL(p, s) Precision & Scale",
    "difficulty": "Hard",
    "hint": "Compare the required integer digits of 10.00 with (3 - 2 = 1)."
  },
  {
    "id": "q16",
    "question": "Q16: What is the maximum number of digits allowed before the decimal point in DECIMAL(6, 2)?",
    "options": [
      "4 (calculated as 6 - 2)",
      "6",
      "2",
      "8"
    ],
    "answer": "4 (calculated as 6 - 2)",
    "explanation": "The maximum number of digits before the decimal point is given by (p - s) = 6 - 2 = 4 digits (e.g. 9999.99).",
    "explanationBn": "দশমিকের আগের অঙ্ক সংখ্যা = p - s = ৬ - ২ = ৪টি অঙ্ক।",
    "topic": "DECIMAL(p, s) Precision & Scale",
    "difficulty": "Easy",
    "hint": "Use the formula: Integer digits = Precision - Scale."
  },
  {
    "id": "q17",
    "question": "Q17: In the data type definition DECIMAL(p, s), what do 'p' and 's' represent respectively?",
    "options": [
      "p = Precision (Total number of digits), s = Scale (Number of digits after the decimal point)",
      "p = Power, s = Sign",
      "p = Digits before decimal, s = Digits after decimal",
      "p = Positive numbers, s = Signed numbers"
    ],
    "answer": "p = Precision (Total number of digits), s = Scale (Number of digits after the decimal point)",
    "explanation": "In DECIMAL(p, s), p is the precision (total significant digits) and s is the scale (digits to the right of decimal point).",
    "explanationBn": "DECIMAL(p, s)-এ p হলো Precision (মোট অঙ্ক সংখ্যা) এবং s হলো Scale (দশমিকের পরের অঙ্ক সংখ্যা)।",
    "topic": "DECIMAL(p, s) Precision & Scale",
    "difficulty": "Easy",
    "hint": "Total digits vs fractional digits."
  },
  {
    "id": "q18",
    "question": "Q18: What is the maximum storable positive value in a column defined as DECIMAL(3, 2)?",
    "options": [
      "9.99",
      "99.9",
      "999.00",
      "9.999"
    ],
    "answer": "9.99",
    "explanation": "For DECIMAL(3,2): Total digits = 3, Digits after decimal = 2, Digits before decimal = 3 - 2 = 1. The maximum value with 1 integer digit and 2 decimal digits is 9.99.",
    "explanationBn": "DECIMAL(3,2)-এর ক্ষেত্রে মোট অঙ্ক ৩, দশমিকের পরে ২, দশমিকের পূর্বে ৩ - ২ = ১ অঙ্ক। সর্বোচ্চ মান হলো ৯.৯৯।",
    "topic": "DECIMAL(p, s) Precision & Scale",
    "difficulty": "Medium",
    "hint": "Calculate (p - s) for integer digits and s for decimal digits."
  },
  {
    "id": "q19",
    "question": "Q19: If a movie database column is declared as `IMDb_Rating DECIMAL(3, 2)`, what error occurs if you try to insert 10.00?",
    "options": [
      "Error 1264: Out of range value (because 10.00 requires 2 digits before the decimal point)",
      "It rounds to 9.99 automatically without warning",
      "It converts 10.00 into NULL",
      "It creates an extra column automatically"
    ],
    "answer": "Error 1264: Out of range value (because 10.00 requires 2 digits before the decimal point)",
    "explanation": "DECIMAL(3,2) allows only 1 digit to the left of the decimal point (p - s = 1). The value 10.00 has 2 digits before the decimal ('10'), exceeding the precision.",
    "explanationBn": "DECIMAL(3,2)-এ দশমিকের আগে কেবল ১টি অঙ্ক গ্রহণযোগ্য। 10.00-এ ২টি অঙ্ক থাকায় 'Out of range value' এরর হয়।",
    "topic": "DECIMAL(p, s) Precision & Scale",
    "difficulty": "Hard",
    "hint": "Compare the required integer digits of 10.00 with (3 - 2 = 1)."
  },
  {
    "id": "q20",
    "question": "Q20: What is the maximum number of digits allowed before the decimal point in DECIMAL(6, 2)?",
    "options": [
      "4 (calculated as 6 - 2)",
      "6",
      "2",
      "8"
    ],
    "answer": "4 (calculated as 6 - 2)",
    "explanation": "The maximum number of digits before the decimal point is given by (p - s) = 6 - 2 = 4 digits (e.g. 9999.99).",
    "explanationBn": "দশমিকের আগের অঙ্ক সংখ্যা = p - s = ৬ - ২ = ৪টি অঙ্ক।",
    "topic": "DECIMAL(p, s) Precision & Scale",
    "difficulty": "Easy",
    "hint": "Use the formula: Integer digits = Precision - Scale."
  },
  {
    "id": "q21",
    "question": "Q21: In the data type definition DECIMAL(p, s), what do 'p' and 's' represent respectively?",
    "options": [
      "p = Precision (Total number of digits), s = Scale (Number of digits after the decimal point)",
      "p = Power, s = Sign",
      "p = Digits before decimal, s = Digits after decimal",
      "p = Positive numbers, s = Signed numbers"
    ],
    "answer": "p = Precision (Total number of digits), s = Scale (Number of digits after the decimal point)",
    "explanation": "In DECIMAL(p, s), p is the precision (total significant digits) and s is the scale (digits to the right of decimal point).",
    "explanationBn": "DECIMAL(p, s)-এ p হলো Precision (মোট অঙ্ক সংখ্যা) এবং s হলো Scale (দশমিকের পরের অঙ্ক সংখ্যা)।",
    "topic": "DECIMAL(p, s) Precision & Scale",
    "difficulty": "Easy",
    "hint": "Total digits vs fractional digits."
  },
  {
    "id": "q22",
    "question": "Q22: What is the maximum storable positive value in a column defined as DECIMAL(3, 2)?",
    "options": [
      "9.99",
      "99.9",
      "999.00",
      "9.999"
    ],
    "answer": "9.99",
    "explanation": "For DECIMAL(3,2): Total digits = 3, Digits after decimal = 2, Digits before decimal = 3 - 2 = 1. The maximum value with 1 integer digit and 2 decimal digits is 9.99.",
    "explanationBn": "DECIMAL(3,2)-এর ক্ষেত্রে মোট অঙ্ক ৩, দশমিকের পরে ২, দশমিকের পূর্বে ৩ - ২ = ১ অঙ্ক। সর্বোচ্চ মান হলো ৯.৯৯।",
    "topic": "DECIMAL(p, s) Precision & Scale",
    "difficulty": "Medium",
    "hint": "Calculate (p - s) for integer digits and s for decimal digits."
  },
  {
    "id": "q23",
    "question": "Q23: If a movie database column is declared as `IMDb_Rating DECIMAL(3, 2)`, what error occurs if you try to insert 10.00?",
    "options": [
      "Error 1264: Out of range value (because 10.00 requires 2 digits before the decimal point)",
      "It rounds to 9.99 automatically without warning",
      "It converts 10.00 into NULL",
      "It creates an extra column automatically"
    ],
    "answer": "Error 1264: Out of range value (because 10.00 requires 2 digits before the decimal point)",
    "explanation": "DECIMAL(3,2) allows only 1 digit to the left of the decimal point (p - s = 1). The value 10.00 has 2 digits before the decimal ('10'), exceeding the precision.",
    "explanationBn": "DECIMAL(3,2)-এ দশমিকের আগে কেবল ১টি অঙ্ক গ্রহণযোগ্য। 10.00-এ ২টি অঙ্ক থাকায় 'Out of range value' এরর হয়।",
    "topic": "DECIMAL(p, s) Precision & Scale",
    "difficulty": "Hard",
    "hint": "Compare the required integer digits of 10.00 with (3 - 2 = 1)."
  },
  {
    "id": "q24",
    "question": "Q24: What is the maximum number of digits allowed before the decimal point in DECIMAL(6, 2)?",
    "options": [
      "4 (calculated as 6 - 2)",
      "6",
      "2",
      "8"
    ],
    "answer": "4 (calculated as 6 - 2)",
    "explanation": "The maximum number of digits before the decimal point is given by (p - s) = 6 - 2 = 4 digits (e.g. 9999.99).",
    "explanationBn": "দশমিকের আগের অঙ্ক সংখ্যা = p - s = ৬ - ২ = ৪টি অঙ্ক।",
    "topic": "DECIMAL(p, s) Precision & Scale",
    "difficulty": "Easy",
    "hint": "Use the formula: Integer digits = Precision - Scale."
  },
  {
    "id": "q25",
    "question": "Q25: In the data type definition DECIMAL(p, s), what do 'p' and 's' represent respectively?",
    "options": [
      "p = Precision (Total number of digits), s = Scale (Number of digits after the decimal point)",
      "p = Power, s = Sign",
      "p = Digits before decimal, s = Digits after decimal",
      "p = Positive numbers, s = Signed numbers"
    ],
    "answer": "p = Precision (Total number of digits), s = Scale (Number of digits after the decimal point)",
    "explanation": "In DECIMAL(p, s), p is the precision (total significant digits) and s is the scale (digits to the right of decimal point).",
    "explanationBn": "DECIMAL(p, s)-এ p হলো Precision (মোট অঙ্ক সংখ্যা) এবং s হলো Scale (দশমিকের পরের অঙ্ক সংখ্যা)।",
    "topic": "DECIMAL(p, s) Precision & Scale",
    "difficulty": "Easy",
    "hint": "Total digits vs fractional digits."
  }
];

export default questions;
