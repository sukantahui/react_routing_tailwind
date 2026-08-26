const topic4_questions = [
  {
    "question": "Which classes in the Java exception hierarchy are classified as Checked Exceptions?",
    "shortAnswer": "'Checked Exceptions' include 'java.lang.Exception' and all of its subclasses EXCEPT 'java.lang.RuntimeException' (and its descendants). Prominent examples include IOException, SQLException, ClassNotFoundException, and ParseException.",
    "explanation": "Checked exceptions are checked by javac at compile time.",
    "hint": "All subclasses of Exception except RuntimeException.",
    "level": "Beginner",
    "codeExample": "public void read() throws IOException { ... } // Checked exception declaration"
  }
];

export default topic4_questions;