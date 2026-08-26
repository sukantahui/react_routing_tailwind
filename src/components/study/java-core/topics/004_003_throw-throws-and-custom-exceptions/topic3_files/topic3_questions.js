const topic3_questions = [
  {
    "question": "What are the 3 fundamental differences between 'throw' and 'throws' in Java?",
    "shortAnswer": "1. Location: 'throw' is used inside method bodies; 'throws' is used in method header signatures. 2. Operand: 'throw' is followed by a single instantiated object ('new Exception()'); 'throws' is followed by exception class names ('IOException, SQLException'). 3. Action: 'throw' actively halts execution and triggers an error; 'throws' passively declares potential errors to callers.",
    "explanation": "One of the most frequently tested core Java interview distinctions.",
    "hint": "throw is an active action inside the body; throws is a declaration in the method header.",
    "level": "Beginner",
    "codeExample": "void m() throws IOException { throw new IOException(); }"
  }
];

export default topic3_questions;