// 25 Authentic CBSE Board Examination Questions for Topic 7
const questions = [
  {
    "id": 1,
    "question": "What initial value is best used for calculating maximum marks across records?",
    "options": [
      "float('inf')",
      "-1 or 0 (or float('-inf'))",
      "1000",
      "None"
    ],
    "correctAnswer": 1,
    "explanation": "Initializing max to a very small number like -1, 0, or float('-inf') ensures any valid positive score will replace it on first comparison.",
    "hint": "-1 or 0 (or float('-inf'))."
  },
  {
    "id": 2,
    "question": "What initial value is best used for calculating minimum price across records?",
    "options": [
      "0",
      "float('inf') or a sufficiently large number",
      "-1",
      "None"
    ],
    "correctAnswer": 1,
    "explanation": "Initializing min to float('inf') or a high upper bound ensures the first real record replaces it immediately.",
    "hint": "float('inf') or large number."
  },
  {
    "id": 3,
    "question": "How do you calculate the class average marks from a CSV file?",
    "options": [
      "sum(row[3]) / len(f)",
      "total_marks / count_of_records",
      "max_marks - min_marks",
      "reader.average()"
    ],
    "correctAnswer": 1,
    "explanation": "Average is the sum of marks divided by the total count of valid records.",
    "hint": "total_marks / count_of_records."
  },
  {
    "id": 4,
    "question": "What runtime error must be guarded against when calculating average marks from an empty file?",
    "options": [
      "IndexError",
      "ZeroDivisionError",
      "ValueError",
      "TypeError"
    ],
    "correctAnswer": 1,
    "explanation": "If count is 0, dividing total / count raises ZeroDivisionError. Always guard with 'if count > 0:'.",
    "hint": "ZeroDivisionError."
  },
  {
    "id": 5,
    "question": "Consider: total = 0; for row in reader: total += row[3]. What happens?",
    "options": [
      "Calculates numeric sum",
      "Raises TypeError: unsupported operand type(s) for +=: 'int' and 'str'",
      "Concatenates strings into total",
      "Creates CSV"
    ],
    "correctAnswer": 1,
    "explanation": "row[3] is a string. Adding a string to an integer total raises TypeError. You must use total += float(row[3]).",
    "hint": "TypeError (cannot add str to int)."
  },
  {
    "id": 6,
    "question": "How can you track the student who scored the highest marks while calculating maximum?",
    "options": [
      "if marks > max_marks: max_marks = marks; topper_name = row[1]",
      "topper_name = max(row[1])",
      "topper_name = reader.topper()",
      "topper_name = row[1][0]"
    ],
    "correctAnswer": 0,
    "explanation": "Whenever a new maximum score is found, update both max_marks and the associated topper_name variable.",
    "hint": "Update name whenever max_marks is updated."
  },
  {
    "id": 7,
    "question": "How do you calculate the total salary of employees working specifically in the 'IT' department?",
    "options": [
      "if row[2] == 'IT': total_sal += float(row[3])",
      "total_sal = sum(row[3])",
      "total_sal += float(row['IT'])",
      "if 'IT' in f: total_sal += 1"
    ],
    "correctAnswer": 0,
    "explanation": "Check the department condition before accumulating the salary value into total_sal.",
    "hint": "Conditional accumulation."
  },
  {
    "id": 8,
    "question": "Consider: scores = [float(row[3]) for row in reader if row]. What built-in Python function gives the highest score directly from this list?",
    "options": [
      "highest(scores)",
      "max(scores)",
      "scores.maximum()",
      "top(scores)"
    ],
    "correctAnswer": 1,
    "explanation": "The built-in max(list) function returns the largest number in a list.",
    "hint": "max(scores)."
  },
  {
    "id": 9,
    "question": "What does sum(scores) / len(scores) compute for a non-empty list of scores?",
    "options": [
      "Median",
      "Arithmetic Mean (Average)",
      "Standard deviation",
      "Total count"
    ],
    "correctAnswer": 1,
    "explanation": "Sum of elements divided by length computes the arithmetic mean.",
    "hint": "Arithmetic Mean (Average)."
  },
  {
    "id": 10,
    "question": "What does round(avg_marks, 2) do?",
    "options": [
      "Truncates to 2 decimal places",
      "Rounds the floating-point number to 2 decimal places",
      "Multiplies by 2",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "explanation": "round(number, digits) rounds to the specified decimal precision.",
    "hint": "Rounds to 2 decimal places."
  },
  {
    "id": 11,
    "question": "Consider: count = 0; for row in reader: if row and float(row[3]) < 33: count += 1. What does count measure?",
    "options": [
      "Number of passing students",
      "Number of students scoring below passing marks (< 33)",
      "Total students",
      "Highest scorer"
    ],
    "correctAnswer": 1,
    "explanation": "It counts students with marks strictly below 33 (failing threshold).",
    "hint": "Number of students scoring below 33."
  },
  {
    "id": 12,
    "question": "Can multiple aggregations (sum, count, min, max) be computed in a single pass through the CSV file?",
    "options": [
      "No, separate passes are required for each",
      "Yes, all accumulators can be updated within the same loop iteration",
      "Only if sorted",
      "Only with pandas"
    ],
    "correctAnswer": 1,
    "explanation": "Computing all statistics in a single loop traversal (O(n) time complexity) is the most efficient approach.",
    "hint": "Single O(n) pass computes all."
  },
  {
    "id": 13,
    "question": "What happens if next(reader) is omitted when summing marks in a file with a header?",
    "options": [
      "Python skips the header automatically",
      "float('Marks') is attempted on the header, raising ValueError: could not convert string to float: 'Marks'",
      "Header is treated as 0",
      "Header is deleted"
    ],
    "correctAnswer": 1,
    "explanation": "Omitting next(reader) causes the header row's text 'Marks' to be passed to float(), causing ValueError.",
    "hint": "ValueError: could not convert string to float."
  },
  {
    "id": 14,
    "question": "How do you compute the percentage of students in 'Science' stream relative to the whole school?",
    "options": [
      "(science_count / total_students) * 100",
      "science_count / 100",
      "total_students / science_count",
      "science_count * 100"
    ],
    "correctAnswer": 0,
    "explanation": "Standard percentage formula: (subset_count / total_count) * 100.",
    "hint": "(science_count / total_students) * 100."
  },
  {
    "id": 15,
    "question": "Consider: min_val = float('inf'). What does float('inf') represent in Python?",
    "options": [
      "Zero",
      "Positive infinity",
      "Negative infinity",
      "Not a number"
    ],
    "correctAnswer": 1,
    "explanation": "float('inf') represents positive infinity, larger than any finite number.",
    "hint": "Positive infinity."
  },
  {
    "id": 16,
    "question": "In Python formatting, what does f\"{total:,.2f}\" produce for 1250000.5?",
    "options": [
      "'1250000.50'",
      "'1,250,000.50'",
      "'1.250.000,50'",
      "'12,50,000.50'"
    ],
    "correctAnswer": 1,
    "explanation": "The :,.2f format adds comma thousand separators and rounds to 2 decimal places: '1,250,000.50'.",
    "hint": "'1,250,000.50'."
  },
  {
    "id": 17,
    "question": "What is an accumulator variable in computer programming?",
    "options": [
      "A variable used to store the running total of values during iteration",
      "A hardware CPU register only",
      "A function argument",
      "An encryption key"
    ],
    "correctAnswer": 0,
    "explanation": "An accumulator maintains and updates a cumulative sum during loop execution.",
    "hint": "Stores running total."
  },
  {
    "id": 18,
    "question": "What is the result of sum([]) on an empty list in Python?",
    "options": [
      "None",
      "0",
      "ValueError",
      "IndexError"
    ],
    "correctAnswer": 1,
    "explanation": "sum([]) on an empty sequence returns 0 by default.",
    "hint": "0."
  },
  {
    "id": 19,
    "question": "What does max([]) on an empty list raise?",
    "options": [
      "Returns 0",
      "Returns None",
      "ValueError: max() arg is an empty sequence",
      "ZeroDivisionError"
    ],
    "correctAnswer": 2,
    "explanation": "Calling max() on an empty sequence raises ValueError unless default value is provided.",
    "hint": "ValueError: max() arg is an empty sequence."
  },
  {
    "id": 20,
    "question": "How can you safely call max() on a list that might be empty?",
    "options": [
      "max(scores, default=0)",
      "max(scores, safe=True)",
      "scores.max_safe()",
      "max_or_zero(scores)"
    ],
    "correctAnswer": 0,
    "explanation": "The default parameter, e.g. max(scores, default=0), prevents ValueError on empty sequences.",
    "hint": "max(scores, default=0)."
  },
  {
    "id": 21,
    "question": "In CBSE board questions: 'Write a function CalcTotalFees()', what is the expected return or display?",
    "options": [
      "Display or return the total sum of fees column for all students",
      "Delete unpaid fees",
      "Print all student names",
      "Sort fees"
    ],
    "correctAnswer": 0,
    "explanation": "Compute the sum of the fees column across all records and print or return the total.",
    "hint": "Sum of fees column."
  },
  {
    "id": 22,
    "question": "Consider: totals = {}; for row in reader: totals[row[2]] = totals.get(row[2], 0) + float(row[3]). What does this compute?",
    "options": [
      "Total marks grouped by stream (category)",
      "Total students in school",
      "Maximum marks",
      "Overall average"
    ],
    "correctAnswer": 0,
    "explanation": "Using a dictionary accumulator groups and sums marks by category/stream.",
    "hint": "Total marks grouped by stream."
  },
  {
    "id": 23,
    "question": "Why is initializing total = 0 inside the loop an error when calculating overall sum?",
    "options": [
      "It resets the sum to 0 on every iteration, leaving only the last row's value",
      "It causes syntax error",
      "It converts integers to floats",
      "It skips the first row"
    ],
    "correctAnswer": 0,
    "explanation": "Placing total = 0 inside the loop re-initializes it on every iteration, losing prior additions.",
    "hint": "Resets to 0 on every iteration."
  },
  {
    "id": 24,
    "question": "Which data structure is ideal for finding the top 3 highest scores from a CSV file?",
    "options": [
      "Sorted list or heapq",
      "Boolean flag",
      "Stack with LIFO",
      "File pointer"
    ],
    "correctAnswer": 0,
    "explanation": "Collecting scores in a list and sorting or using heapq.nlargest retrieves top N elements easily.",
    "hint": "Sorted list or heapq."
  },
  {
    "id": 25,
    "question": "What is the time complexity of calculating sum, average, min, and max across N CSV rows?",
    "options": [
      "O(1)",
      "O(N)",
      "O(N^2)",
      "O(log N)"
    ],
    "correctAnswer": 1,
    "explanation": "Traversing N rows once performs each comparison and addition in constant time, achieving optimal O(N) linear time complexity.",
    "hint": "O(N) linear time."
  }
];

export default questions;
