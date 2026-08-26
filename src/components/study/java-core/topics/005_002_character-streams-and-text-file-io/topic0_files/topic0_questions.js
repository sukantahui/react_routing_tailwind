const topic0_questions = [
  {
    "question": "Why do Byte Streams (InputStream/OutputStream) fail and corrupt text when reading international languages like Bengali, Hindi, or Emoji characters?",
    "shortAnswer": "Byte streams read and write raw 8-bit bytes. In modern UTF-8 encoding, non-ASCII characters (such as Bengali 'ন' or emojis '🚀') are represented by 2, 3, or 4 consecutive bytes. If a byte stream reads one 8-bit byte at a time and casts it to a char, it splits the multi-byte sequence in half, producing unreadable corrupted garbage ('Mojibake'). Character Streams (Reader/Writer) assemble complete multi-byte sequences into proper Unicode characters.",
    "explanation": "Standard foundation of internationalization (i18n) in Java.",
    "hint": "Byte streams read 1 byte at a time, splitting 2-to-4 byte UTF-8 Unicode characters into corrupted symbols.",
    "level": "Beginner",
    "codeExample": "Reader r = new InputStreamReader(is, StandardCharsets.UTF_8);"
  }
];

export default topic0_questions;