const topic5_questions = [
  {
    "question": "What is the difference between append() and insert() in StringBuilder?",
    "shortAnswer": "append() always adds characters to the end of the sequence; insert() adds characters at any specified index, shifting existing characters right.",
    "explanation": "append() is O(1) amortized; insert(offset, val) is O(N) because all characters after offset must be shifted rightwards in the buffer array.",
    "hint": "End of buffer vs arbitrary offset position.",
    "level": "basic",
    "codeExample": "StringBuilder sb = new StringBuilder(\"HelloWorld\");\nsb.insert(5, \" \"); // \"Hello World\""
  },
  {
    "question": "What is the return type of sb.setCharAt(int index, char ch) and why is it unique?",
    "shortAnswer": "It returns void, making it the only common mutation method in StringBuilder that cannot be chained.",
    "explanation": "Unlike append(), insert(), delete(), replace(), and reverse() which return StringBuilder ('this'), setCharAt returns void, adhering to the JavaBeans mutator convention.",
    "hint": "Returns void, breaking the method chaining pattern.",
    "level": "basic",
    "codeExample": "StringBuilder sb = new StringBuilder(\"Hat\");\nsb.setCharAt(0, 'C'); // Valid\n// sb.setCharAt(0, 'C').append(\"s\"); // COMPILATION ERROR!"
  },
  {
    "question": "How does delete(int start, int end) work, and is the range inclusive or exclusive?",
    "shortAnswer": "It deletes characters from index 'start' (inclusive) up to 'end' (exclusive). Remaining characters are shifted left.",
    "explanation": "The number of characters removed is exactly 'end - start'. If start == end, no characters are removed. If end > length(), end is clamped to length().",
    "hint": "Half-open interval: [start, end).",
    "level": "basic",
    "codeExample": "StringBuilder sb = new StringBuilder(\"012345\");\nsb.delete(2, 4); // deletes indices 2 and 3\nSystem.out.println(sb); // \"0145\""
  },
  {
    "question": "What happens if start > end in sb.delete(start, end)?",
    "shortAnswer": "It throws a StringIndexOutOfBoundsException.",
    "explanation": "The starting index must always be less than or equal to the ending index.",
    "hint": "Start cannot be greater than end.",
    "level": "moderate"
  },
  {
    "question": "How does deleteCharAt(int index) differ from delete(start, end)?",
    "shortAnswer": "deleteCharAt(index) removes exactly one character at the specified index; delete(start, end) removes a range of characters.",
    "explanation": "deleteCharAt(i) is functionally equivalent to delete(i, i + 1).",
    "hint": "Removes a single character at an index.",
    "level": "basic",
    "codeExample": "StringBuilder sb = new StringBuilder(\"Java!\");\nsb.deleteCharAt(4); // \"Java\""
  },
  {
    "question": "How does replace(int start, int end, String str) handle replacement strings of different lengths?",
    "shortAnswer": "It does not require the replacement string to match the length of the deleted range. The buffer automatically shrinks or expands to fit.",
    "explanation": "If 'end - start' is 3 characters and 'str' is 10 characters, the buffer shifts right to accommodate the extra 7 characters.",
    "hint": "Replacement text length can be smaller, equal, or larger than the range.",
    "level": "moderate",
    "codeExample": "StringBuilder sb = new StringBuilder(\"Hello World\");\nsb.replace(6, 11, \"Universe 2026\");\nSystem.out.println(sb); // \"Hello Universe 2026\""
  },
  {
    "question": "How does the reverse() method handle Unicode supplementary characters (surrogate pairs like emojis)?",
    "shortAnswer": "It detects surrogate pairs and preserves their pair order so that emojis and non-BMP symbols are not reversed into invalid surrogate codes.",
    "explanation": "If high and low surrogates were reversed blindly, emojis would turn into invalid unicode junk. reverse() treats surrogate pairs as atomic single code points.",
    "hint": "Preserves UTF-16 surrogate pairs so emojis remain intact.",
    "level": "advanced",
    "codeExample": "StringBuilder sb = new StringBuilder(\"Go! \ud83d\ude80\");\nsb.reverse();\nSystem.out.println(sb); // \"\ud83d\ude80 !oG\""
  },
  {
    "question": "What is the time complexity of the reverse() method in StringBuilder?",
    "shortAnswer": "O(N/2) = O(N) linear time with zero heap allocation.",
    "explanation": "It performs in-place two-pointer swapping: character 0 swaps with N-1, 1 with N-2, up to the middle of the buffer.",
    "hint": "Two-pointer in-place swap.",
    "level": "basic"
  },
  {
    "question": "What does repeat(CharSequence s, int count) do in Java 21+?",
    "shortAnswer": "It appends 'count' copies of the given sequence directly to the builder without requiring an explicit for-loop.",
    "explanation": "Added in Java 21 to streamline separator, padding, and divider line generation in console and reporting apps.",
    "hint": "Appends s repeated count times; added in Java 21.",
    "level": "moderate",
    "codeExample": "StringBuilder sb = new StringBuilder();\nsb.repeat(\"-\", 20); // \"--------------------\""
  },
  {
    "question": "What happens if count is 0 or negative in repeat(CharSequence s, int count)?",
    "shortAnswer": "If count is 0, nothing is appended; if count is negative, it throws an IllegalArgumentException.",
    "explanation": "Count must be >= 0. Negative repeat counts are illegal.",
    "hint": "0 is a no-op; negative throws IllegalArgumentException.",
    "level": "moderate"
  },
  {
    "question": "What does charAt(int index) return and what exception can it throw?",
    "shortAnswer": "Returns the char at the given 0-based index. Throws IndexOutOfBoundsException if index < 0 or index >= length().",
    "explanation": "Provides direct O(1) read access to the character at the specified position.",
    "hint": "Returns the char; bounds must be 0 <= index < length().",
    "level": "basic"
  },
  {
    "question": "Does substring(int start, int end) modify the invoking StringBuilder?",
    "shortAnswer": "NO! substring() returns a new immutable String and leaves the StringBuilder completely unmodified.",
    "explanation": "Many beginners mistakenly assume sb.substring() truncates the builder. To truncate the builder in-place, use sb.delete() or sb.setLength().",
    "hint": "Returns a new String; does not change the builder!",
    "level": "basic",
    "codeExample": "StringBuilder sb = new StringBuilder(\"abcdef\");\nString sub = sb.substring(1, 4); // \"bcd\"\nSystem.out.println(sb); // Still \"abcdef\"!"
  },
  {
    "question": "What is the difference between indexOf(String str) and lastIndexOf(String str)?",
    "shortAnswer": "indexOf() searches forward from the beginning for the first occurrence; lastIndexOf() searches backward from the end for the last occurrence.",
    "explanation": "Both return -1 if the target substring is not found.",
    "hint": "First occurrence vs last occurrence.",
    "level": "basic"
  },
  {
    "question": "How do you insert an element at the very beginning of a StringBuilder?",
    "shortAnswer": "Call sb.insert(0, value).",
    "explanation": "Passing offset 0 prepends the value, shifting all existing characters to the right.",
    "hint": "Use offset 0 in insert().",
    "level": "basic",
    "codeExample": "StringBuilder sb = new StringBuilder(\"World\");\nsb.insert(0, \"Hello \"); // \"Hello World\""
  },
  {
    "question": "What happens if you call sb.insert(sb.length(), \"text\")?",
    "shortAnswer": "It behaves identically to sb.append(\"text\").",
    "explanation": "Inserting at index equal to current length appends to the end with no shifting required.",
    "hint": "Equivalent to calling append().",
    "level": "moderate"
  },
  {
    "question": "What happens if you pass an invalid index like sb.insert(100, \"text\") when length is 5?",
    "shortAnswer": "It throws a StringIndexOutOfBoundsException.",
    "explanation": "The offset for insertion must satisfy: 0 <= offset <= length().",
    "hint": "Offset cannot exceed current length.",
    "level": "basic"
  },
  {
    "question": "How can you clear the entire content of a StringBuilder while keeping its capacity?",
    "shortAnswer": "Call 'sb.setLength(0)' or 'sb.delete(0, sb.length())'.",
    "explanation": "sb.setLength(0) is the idiomatic, highest-performance way to clear the buffer for immediate reuse.",
    "hint": "setLength(0) is the preferred standard way.",
    "level": "basic"
  },
  {
    "question": "Can you append a sub-array of characters without creating an intermediate String?",
    "shortAnswer": "Yes, using sb.append(char[] str, int offset, int len).",
    "explanation": "This reads directly from the char array slice and copies into the buffer with zero object allocation.",
    "hint": "Use the 3-argument char array append overload.",
    "level": "moderate",
    "codeExample": "char[] buf = {'A', 'B', 'C', 'D', 'E'};\nsb.append(buf, 1, 3); // Appends \"BCD\""
  },
  {
    "question": "What is the difference between appendCodePoint(int codePoint) and append(char c)?",
    "shortAnswer": "append(char c) only takes 16-bit BMP characters; appendCodePoint(int) supports full 32-bit Unicode code points including emojis and ancient scripts.",
    "explanation": "If codePoint > 0xFFFF, appendCodePoint automatically writes both high and low surrogate characters.",
    "hint": "32-bit Unicode code points vs 16-bit char.",
    "level": "advanced",
    "codeExample": "sb.appendCodePoint(0x1F600); // \ud83d\ude00 emoji"
  },
  {
    "question": "Why does sb.getChars(int srcBegin, int srcEnd, char[] dst, int dstBegin) return void?",
    "shortAnswer": "Because it writes characters directly into the pre-allocated caller-supplied destination array 'dst'.",
    "explanation": "This low-level method allows high-performance frameworks to extract characters directly into reusable byte/char buffers without creating String objects.",
    "hint": "Direct memory copy into caller's array.",
    "level": "advanced"
  }
];

export default topic5_questions;
