const topic11_questions = [
  {
    "question": "Why cannot a generic class extend 'java.lang.Throwable' or be caught in a 'catch' block (e.g. 'catch(MyException<T> e)')?",
    "shortAnswer": "Exception handling is managed at runtime by the JVM's exception table. Because type arguments are erased at compile time, the JVM cannot distinguish between 'catch (MyException<String>)' and 'catch (MyException<Integer>)'. Allowing generic exceptions would make runtime exception dispatch ambiguous and corrupt JVM stack unwinding.",
    "explanation": "JVM exception dispatch requires reifiable, non-generic class definitions.",
    "hint": "JVM exception table operates at runtime where generic parameters are erased and indistinguishable.",
    "level": "Intermediate",
    "codeExample": "// class MyException<T> extends Exception {} // Compilation Error!"
  }
];

export default topic11_questions;