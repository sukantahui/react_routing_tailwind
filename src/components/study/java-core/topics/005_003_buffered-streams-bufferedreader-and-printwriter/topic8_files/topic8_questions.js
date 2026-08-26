const topic8_questions = [
  {
    "question": "What is the primary strength of 'java.util.Scanner' compared to 'BufferedReader' when processing file input?",
    "shortAnswer": "'Scanner' has built-in tokenization and primitive parsing ('nextInt()', 'nextDouble()', 'nextBoolean()'). It automatically breaks input by whitespace (or custom regex delimiters) and parses types directly without requiring manual 'String.split()' and 'Integer.parseInt()' calls.",
    "explanation": "Ideal for small scripts and competitive programming test case parsing.",
    "hint": "Direct parsing of primitives (nextInt, nextDouble) and custom regex tokenization.",
    "level": "Beginner",
    "codeExample": "Scanner s = new Scanner(file); int id = s.nextInt(); double score = s.nextDouble();"
  }
];

export default topic8_questions;