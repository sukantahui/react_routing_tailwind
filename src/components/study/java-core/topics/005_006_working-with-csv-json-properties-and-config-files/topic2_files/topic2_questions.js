const topic2_questions = [
  {
    "question": "Why is 'properties.load(Reader)' preferred over 'properties.load(InputStream)' when reading international config files?",
    "shortAnswer": "Legacy 'properties.load(InputStream)' is hardcoded by the Java specification to decode bytes using ISO-8859-1 (Latin-1) encoding, corrupting non-ASCII text (like Bengali, Hindi, or Chinese). 'properties.load(Reader)' allows you to wrap the file in a FileReader with 'StandardCharsets.UTF_8', ensuring full international character support without corruption.",
    "explanation": "Added in Java 6 to rectify historical Latin-1 encoding limitations.",
    "hint": "load(Reader) allows passing explicit UTF-8 charset, preventing ISO-8859-1 character corruption.",
    "level": "Intermediate",
    "codeExample": "props.load(new FileReader(file, StandardCharsets.UTF_8));"
  }
];

export default topic2_questions;