// topic1_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 1
// Topic: Regex pattern fundamentals: Metacharacters, Character classes, Quantifiers, and Anchors
// Module: 004_004_modern-text-intelligence-and-regular-expressions
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What are Character Classes in regular expressions?",
    shortAnswer: "Sets of characters enclosed in square brackets (e.g. `[A-Z]`, `[0-9]`, `[aeiou]`) that match any single character from the defined set.",
    explanation: "Character classes allow matching any character meeting defined criteria (e.g. uppercase letters or vowel lists).",
    hint: "Square brackets defining a set of allowable characters.",
    level: "basic",
    codeExample: "[A-Za-z0-9]"
  },
  {
    question: "What does the shorthand character class `\\d` represent in Excel regex?",
    shortAnswer: "Any digit character from 0 through 9 (equivalent to `[0-9]`).",
    explanation: "The shorthand `\\d` matches any decimal numeric character.",
    hint: "Any digit 0-9.",
    level: "basic",
    codeExample: "\\d  // Matches 0, 1, 2, ... 9"
  },
  {
    question: "What does the shorthand character class `\\D` (uppercase D) represent?",
    shortAnswer: "Any non-digit character (equivalent to `[^0-9]`).",
    explanation: "Uppercase shorthand classes in regex invert their lowercase counterpart.",
    hint: "Any non-digit character.",
    level: "basic",
    codeExample: "\\D  // Matches letters, punctuation, spaces"
  },
  {
    question: "What does the shorthand character class `\\w` represent?",
    shortAnswer: "Any word character, which includes lowercase letters, uppercase letters, digits, and underscores (equivalent to `[a-zA-Z0-9_]`).",
    explanation: "Standard alphanumeric and underscore matching token.",
    hint: "Alphanumeric characters plus underscore.",
    level: "basic",
    codeExample: "\\w  // Matches a-z, A-Z, 0-9, _"
  },
  {
    question: "What does the shorthand character class `\\s` represent?",
    shortAnswer: "Any whitespace character, including spaces, tabs, line breaks, and carriage returns.",
    explanation: "Matches invisible whitespace delimiters in strings.",
    hint: "Whitespace character (space, tab, newline).",
    level: "basic",
    codeExample: "\\s  // Matches ' ', '\\t', '\\n'"
  },
  {
    question: "What does the wildcard period metacharacter `.` represent in regular expressions?",
    shortAnswer: "Matches any single character except a newline character.",
    explanation: "The dot `.` is a universal single-character wildcard.",
    hint: "Any single character wildcard.",
    level: "basic",
    codeExample: ".  // Matches 'a', '9', '#', ' '"
  },
  {
    question: "How do you match a literal dot `.` rather than the wildcard period in an Excel regex formula?",
    shortAnswer: "Escape the dot with a backslash: `\\.`.",
    explanation: "A preceding backslash disables the special metacharacter meaning and matches a literal period.",
    hint: "Escape with backslash: \\.",
    level: "basic",
    codeExample: "\\.  // Matches literal '.'"
  },
  {
    question: "What does the `+` quantifier mean in regular expressions?",
    shortAnswer: "Matches 1 or more occurrences of the preceding token (greedy match).",
    explanation: "Requires at least one character match, and consumes as many consecutive matches as possible.",
    hint: "One or more times (greedy).",
    level: "basic",
    codeExample: "\\d+  // Matches '5', '88421', '990021'"
  },
  {
    question: "What does the `*` quantifier mean in regular expressions?",
    shortAnswer: "Matches 0 or more occurrences of the preceding token.",
    explanation: "The preceding token is optional and can repeat indefinitely.",
    hint: "Zero or more times.",
    level: "basic",
    codeExample: "\\d*  // Matches '', '5', '1234'"
  },
  {
    question: "What does the `?` quantifier mean in regular expressions?",
    shortAnswer: "Matches 0 or 1 occurrence of the preceding token (makes it optional).",
    explanation: "Useful for optional prefixes (like optional country codes or http/https).",
    hint: "Zero or one time (optional).",
    level: "basic",
    codeExample: "https?  // Matches 'http' and 'https'"
  },
  {
    question: "What does the exact quantifier `{n}` mean (e.g. `\\d{6}`)?",
    shortAnswer: "Matches exactly n consecutive occurrences of the preceding token.",
    explanation: "`\\d{6}` requires exactly 6 consecutive digits (e.g. Indian PIN codes).",
    hint: "Exactly n occurrences.",
    level: "basic",
    codeExample: "\\d{6}  // Matches '700120'"
  },
  {
    question: "What does the range quantifier `{n,m}` mean (e.g. `\\d{2,4}`)?",
    shortAnswer: "Matches between n and m occurrences (inclusive) of the preceding token.",
    explanation: "`\\d{2,4}` matches 2, 3, or 4 consecutive digits.",
    hint: "Between n and m occurrences inclusive.",
    level: "moderate",
    codeExample: "\\d{2,4}  // Matches '12', '123', '1234'"
  },
  {
    question: "What does the open-ended quantifier `{n,}` mean (e.g. `[a-zA-Z]{2,}`)?",
    shortAnswer: "Matches at least n occurrences with no upper limit.",
    explanation: "`[a-zA-Z]{2,}` requires at least 2 alphabetic characters.",
    hint: "At least n occurrences.",
    level: "moderate",
    codeExample: "[a-zA-Z]{2,}  // Matches 'in', 'org', 'commerce'"
  },
  {
    question: "What is the purpose of the start anchor `^` in a regular expression?",
    shortAnswer: "Asserts that the match must begin at the very start of the text string.",
    explanation: "Prevents regex from matching patterns that occur midway through a string.",
    hint: "Asserts start of string boundary.",
    level: "basic",
    codeExample: "^INV-  // Must start with 'INV-'"
  },
  {
    question: "What is the purpose of the end anchor `$` in a regular expression?",
    shortAnswer: "Asserts that the match must terminate at the very end of the text string.",
    explanation: "Prevents trailing unvalidated characters from slipping past validation.",
    hint: "Asserts end of string boundary.",
    level: "basic",
    codeExample: "\\.xlsx$  // Must end with '.xlsx'"
  },
  {
    question: "What happens when you combine both anchors `^...$` around a pattern (e.g. `^[A-Z]{5}[0-9]{4}[A-Z]$`)?",
    shortAnswer: "The regex requires the entire string from start to finish to conform strictly to the pattern, with zero leading or trailing noise.",
    explanation: "Essential for rock-solid field validation in REGEXTEST.",
    hint: "Full-string exact validation.",
    level: "basic",
    codeExample: "^[A-Z]{5}[0-9]{4}[A-Z]$"
  },
  {
    question: "What does the negated character class `[^0-9]` mean?",
    shortAnswer: "Matches any single character that is NOT a digit from 0 through 9.",
    explanation: "The caret `^` inside square brackets negates the character class.",
    hint: "Negated character class (not a digit).",
    level: "moderate",
    codeExample: "[^0-9]  // Matches letters, spaces, symbols"
  },
  {
    question: "What is the meaning of the pipe `|` metacharacter in regular expressions?",
    shortAnswer: "Alternation (logical OR), matching either the expression on its left or the expression on its right.",
    explanation: "Enables matching multiple alternative keywords (e.g. `NEFT|RTGS|UPI|IMPS`).",
    hint: "Alternation / Logical OR.",
    level: "basic",
    codeExample: "(NEFT|RTGS|UPI|IMPS)"
  },
  {
    question: "What is the difference between a greedy quantifier and a lazy (non-greedy) quantifier?",
    shortAnswer: "A greedy quantifier (`+`, `*`) matches as much text as possible; a lazy quantifier (`+?`, `*?`) matches as little text as necessary.",
    explanation: "Appending `?` to a quantifier makes it stop at the first matching delimiter.",
    hint: "Greedy consumes maximum; lazy consumes minimum.",
    level: "advanced",
    codeExample: "<.+> (Greedy) vs <.+?> (Lazy)"
  },
  {
    question: "How do you match a word boundary in regular expressions?",
    shortAnswer: "Using the `\\b` anchor token.",
    explanation: "`\\b` asserts a position between a word character (`\\w`) and a non-word character (`\\W` or start/end of string).",
    hint: "\\b matches word boundary.",
    level: "moderate",
    codeExample: "\\bINV-\\d+\\b"
  },
  {
    question: "How do you construct a regex pattern to match a standard 6-digit Indian Postal PIN code?",
    shortAnswer: "^[1-9][0-9]{5}$",
    explanation: "PIN codes start with a non-zero digit (1-9) followed by exactly 5 digits.",
    hint: "^[1-9][0-9]{5}$.",
    level: "basic",
    codeExample: "=REGEXTEST(A2, \"^[1-9][0-9]{5}$\")"
  },
  {
    question: "How do you construct a regex pattern to match a 10-digit Indian Mobile Phone Number starting with 6, 7, 8, or 9?",
    shortAnswer: "^[6-9][0-9]{9}$",
    explanation: "First digit must be 6, 7, 8, or 9, followed by 9 additional digits.",
    hint: "^[6-9][0-9]{9}$.",
    level: "moderate",
    codeExample: "=REGEXTEST(A2, \"^[6-9][0-9]{9}$\")"
  },
  {
    question: "What is a Capturing Group in regular expressions?",
    shortAnswer: "A sub-pattern enclosed in round parentheses `(...)` that isolates and extracts specific sub-components of a matched string.",
    explanation: "Capturing groups can be extracted individually via return_mode = 2 in REGEXEXTRACT or referenced with `$1, $2` in REGEXREPLACE.",
    hint: "Round parentheses (...) defining extraction sub-units.",
    level: "moderate",
    codeExample: "(\\d{4})-(\\d{2})-(\\d{2})"
  },
  {
    question: "What is a Non-Capturing Group in regular expressions?",
    shortAnswer: "A grouping constructed with `(?:...)` that groups tokens for repetition or alternation without storing the match for extraction.",
    explanation: "Optimizes regex execution memory when groups are only needed for quantifiers.",
    hint: "(?:...) groups without capturing.",
    level: "advanced",
    codeExample: "(?:INV|BILL)-\\d+"
  },
  {
    question: "How do you write a regex pattern to match floating-point currency amounts with optional 2 decimal places (e.g. 45000 or 45000.50)?",
    shortAnswer: "^\\d+(\\.\\d{2})?$",
    explanation: "`\\d+` matches integer dollars, and `(\\.\\d{2})?` optionally matches dot and exactly 2 decimal cents.",
    hint: "^\\d+(\\.\\d{2})?$.",
    level: "moderate",
    codeExample: "^\\d+(\\.\\d{2})?$"
  },
  {
    question: "How do you match any special symbol excluding letters, digits, and spaces?",
    shortAnswer: "[^a-zA-Z0-9\\s]",
    explanation: "Negated character class excluding alphabet characters, digits, and whitespace.",
    hint: "[^a-zA-Z0-9\\s].",
    level: "moderate",
    codeExample: "[^a-zA-Z0-9\\s]"
  },
  {
    question: "What is the difference between `[0-9]+` and `[0-9]*`?",
    shortAnswer: "`[0-9]+` requires at least 1 digit to match; `[0-9]*` can match zero digits (empty string).",
    explanation: "`+` is 1 or more; `*` is 0 or more.",
    hint: "+ requires at least 1; * allows 0.",
    level: "basic",
    codeExample: "+ (1+) vs * (0+)"
  },
  {
    question: "How do you match a date format DD/MM/YYYY using character classes and exact quantifiers?",
    shortAnswer: "\\b(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/\\d{4}\\b",
    explanation: "Validates calendar day ranges (01-31), month ranges (01-12), and 4-digit years.",
    hint: "(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/\\d{4}.",
    level: "advanced",
    codeExample: "\\b(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/\\d{4}\\b"
  },
  {
    question: "How do you match words containing exactly 4 uppercase letters (e.g. 'ACCO', 'HDFC', 'ICICI')?",
    shortAnswer: "\\b[A-Z]{4}\\b",
    explanation: "Word boundaries `\\b` ensure the token is an independent 4-letter word.",
    hint: "\\b[A-Z]{4}\\b.",
    level: "basic",
    codeExample: "\\b[A-Z]{4}\\b"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for Regex Pattern Fundamentals?",
    shortAnswer: "Always start your regex patterns from the core character classes, use exact quantifiers ({n}) rather than loose wildcards, and always bookend validation patterns with start (^) and end ($) anchors to guarantee zero false positives across corporate datasets!",
    explanation: "Disciplined regex architecture ensures that messy data is cleansed and validated with 100% mathematical precision!",
    hint: "Precise classes + exact quantifiers + ^ and $ anchors = zero false positives!",
    level: "expert",
    codeExample: "Rule: Precise Classes + Exact Quantifiers + Anchors (^$)!"
  }
];

export default questions;
