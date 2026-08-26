const topic7_questions = [
  {
    "question": "Why does writing 'T item = new T();' inside a generic class fail compilation, and what is the standard workaround?",
    "shortAnswer": "Because type erasure erases 'T' to 'Object' in bytecode, so 'new T()' would generate 'new Object()'. Furthermore, the compiler cannot guarantee that 'T' is a concrete class with an accessible no-argument constructor. The standard workaround is to pass a 'Class<T>' type token and invoke 'clazz.getDeclaredConstructor().newInstance()'.",
    "explanation": "Classic generic instantiation limitation and the reflection token solution.",
    "hint": "Type erasure converts T to Object, making 'new T()' impossible; pass Class<T> token instead.",
    "level": "Intermediate",
    "codeExample": "public <T> T create(Class<T> c) throws Exception { return c.getDeclaredConstructor().newInstance(); }"
  }
];

export default topic7_questions;