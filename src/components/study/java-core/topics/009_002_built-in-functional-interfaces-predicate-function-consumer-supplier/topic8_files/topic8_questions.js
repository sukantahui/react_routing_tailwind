const topic8_questions = [
  {
    "question": "What is the critical difference between 'Function.andThen()' and 'Function.compose()' in Java, and what is 'Function.identity()'?",
    "shortAnswer": "1. 'f1.andThen(f2)': Executes in FORWARD order (Left-to-Right). It runs f1 first, then passes the result into f2 ('f2(f1(x))'). 2. 'f1.compose(f2)': Executes in REVERSE/MATHEMATICAL order (Right-to-Left). It runs the argument f2 first, then passes its result into f1 ('f1(f2(x))'). 3. 'Function.identity()': A static helper returning a function that always returns its input unchanged ('t → t'), commonly used in 'Collectors.toMap()' key/value mappings.",
    "explanation": "Deep comparison between forward and reverse function composition in Java 8.",
    "hint": "andThen runs caller first then argument; compose runs argument first then caller; identity returns input unchanged.",
    "level": "Intermediate",
    "codeExample": "f1.andThen(f2).apply(x); // f2(f1(x)) | f1.compose(f2).apply(x); // f1(f2(x))"
  }
];

export default topic8_questions;