const topic10_questions = [
  {
    "question": "When 'autoFlush=true' is enabled on a PrintWriter, which method calls trigger an automatic flush?",
    "shortAnswer": "Only 'println()', 'printf()', and 'format()' trigger an automatic flush. Calling 'print()' or 'write()' does NOT trigger an auto-flush (unless a newline '\\n' character is written and supported by the platform).",
    "explanation": "Essential knowledge when streaming real-time chat messages or WebSocket payloads.",
    "hint": "println(), printf(), and format() trigger auto-flush; simple print() does not.",
    "level": "Advanced",
    "codeExample": "PrintWriter pw = new PrintWriter(socket.getOutputStream(), true); pw.println(\"SYNC\");"
  }
];

export default topic10_questions;