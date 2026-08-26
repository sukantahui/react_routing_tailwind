const topic2_questions = [
  {
    "question": "What exception must be handled when using Class.forName('com.example.MyClass')?",
    "shortAnswer": "java.lang.ClassNotFoundException (a checked exception), which is thrown if the specified class cannot be located by the ClassLoader.",
    "explanation": "Standard checked exception for dynamic reflection loading.",
    "hint": "ClassNotFoundException",
    "level": "Beginner",
    "codeExample": "try { Class.forName('com.mysql.cj.jdbc.Driver'); } catch (ClassNotFoundException e) { ... }"
  },
  {
    "question": "What is the difference between int.class and Integer.class?",
    "shortAnswer": "int.class represents the primitive 32-bit integer type (equivalent to Integer.TYPE), whereas Integer.class represents the reference wrapper object class java.lang.Integer.",
    "explanation": "int.class != Integer.class.",
    "hint": "int.class is primitive type; Integer.class is the wrapper class.",
    "level": "Intermediate",
    "codeExample": "int.class == Integer.TYPE // true; int.class == Integer.class // false"
  }
];

export default topic2_questions;
