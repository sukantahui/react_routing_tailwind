const topic6_questions = [
  {
    "question": "Why does simple 'line.split(\",\")' fail when parsing real-world CSV files according to RFC 4180?",
    "shortAnswer": "'line.split(\",\")' naively splits on every comma character. Real-world CSV files (RFC 4180) frequently contain fields with embedded commas enclosed in quotes (e.g. \"Das, Tuhina\"), escaped double quotes (\"\"), or multi-line values. Simple split() chops quoted text in half and produces corrupted field columns.",
    "explanation": "A proper state-machine parser or library (like Apache Commons CSV) is required.",
    "hint": "Embedded commas inside quoted text ('\"Das, Tuhina\"') get incorrectly split by line.split(',').",
    "level": "Intermediate",
    "codeExample": "String s = \"1,\\\"Das, Tuhina\\\",100\"; // split(',') creates 3 tokens instead of 2"
  }
];

export default topic6_questions;