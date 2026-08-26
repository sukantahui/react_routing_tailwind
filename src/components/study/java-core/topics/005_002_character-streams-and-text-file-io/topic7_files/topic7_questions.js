const topic7_questions = [
  {
    "question": "What is the architectural role of 'InputStreamReader' and 'OutputStreamWriter' in Java I/O?",
    "shortAnswer": "They function as the fundamental 'Bridge' classes connecting the byte-stream world (InputStream/OutputStream) to the character-stream world (Reader/Writer). An 'InputStreamReader' reads raw bytes from an InputStream and decodes them into characters using a specified Charset; an 'OutputStreamWriter' encodes characters into raw bytes and writes them to an OutputStream.",
    "explanation": "Indispensable for reading network socket streams (socket.getInputStream()) and System.in.",
    "hint": "Bridges byte streams to character streams by encoding and decoding using a specified Charset.",
    "level": "Intermediate",
    "codeExample": "Reader r = new InputStreamReader(socket.getInputStream(), StandardCharsets.UTF_8);"
  }
];

export default topic7_questions;