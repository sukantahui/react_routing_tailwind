const topic9_questions = [
  {
    "question": "Why is 'BufferedReader' consistently 5x to 20x faster than 'Scanner' for reading large text inputs?",
    "shortAnswer": "1. Buffer Size: BufferedReader allocates an 8KB buffer (8192 chars) compared to Scanner's smaller 1KB buffer. 2. Zero Regex Overhead: BufferedReader performs simple character array boundary scans, whereas Scanner evaluates compiled regular expressions ('java.util.regex.Pattern') for every token and line delimiter. 3. Allocation: Scanner creates temporary Matcher objects in memory on every call.",
    "explanation": "This is why competitive programmers and big data ETL engines universally use BufferedReader.",
    "hint": "8KB vs 1KB buffer size, zero regex engine overhead, and minimal garbage collection allocation.",
    "level": "Intermediate",
    "codeExample": "// Competitive Programming Fast I/O: BufferedReader br = new BufferedReader(...);"
  }
];

export default topic9_questions;