const topic1_questions = [
  {
    "question": "What are the permissible key-value separator characters and comment markers in standard Java .properties files?",
    "shortAnswer": "1. Separators: Key and value can be separated by '=', ':', or unquoted whitespace (' '). 2. Comments: Any line beginning with '#' or '!' is treated as a comment and ignored. 3. Multi-line: Long values can span multiple lines by escaping the line break with a trailing backslash ('\\').",
    "explanation": "Defined by the ISO-8859-1 / UTF-8 Properties file specification.",
    "hint": "Separators are '=', ':', or spaces; comment markers are '#' and '!'; multi-line uses trailing backslash.",
    "level": "Beginner",
    "codeExample": "# Comment\\nkey1=val1\\nkey2: val2\\nkey3 val3\\nmultiline=line1\\\\\n  line2"
  }
];

export default topic1_questions;