const topic7_questions = [
  {
    "question": "What is the standard escaping rule when writing a field containing double quotes or commas into a CSV file according to RFC 4180?",
    "shortAnswer": "If a field contains a comma (,), newline (\\n), or double quote (\"), the entire field MUST be enclosed in double quotes. Any internal double quote character (\") within that field must be escaped by doubling it (replacing each '\"' with '\"\"').",
    "explanation": "Ensures spreadsheet applications like Microsoft Excel, LibreOffice, and Google Sheets parse fields accurately.",
    "hint": "Enclose field in quotes and replace every internal quote with two quotes (\"\").",
    "level": "Intermediate",
    "codeExample": "String escaped = \"\\\"\" + val.replace(\"\\\"\", \"\\\"\\\"\") + \"\\\"\";"
  }
];

export default topic7_questions;