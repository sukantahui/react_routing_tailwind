const topic3_questions = [
  {
    "question": "What major convenience method is available on 'java.io.Writer' that does NOT exist on 'java.io.OutputStream'?",
    "shortAnswer": "'Writer.write(String str)'. With Writer, you can pass a Java String directly to 'write(str)'. With OutputStream, you are forced to convert the String to raw bytes first ('os.write(str.getBytes(StandardCharsets.UTF_8))'), which is error-prone and causes encoding inconsistencies.",
    "explanation": "Writer also implements java.lang.Appendable, supporting writer.append('a').append('b').",
    "hint": "Writer allows passing String directly to write(str) without calling getBytes().",
    "level": "Beginner",
    "codeExample": "writer.write(\"Hello World\"); // Direct String writing"
  }
];

export default topic3_questions;