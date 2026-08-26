const topic13_questions = [
  {
    "question": "How do 'Class<T>' type tokens and 'java.lang.reflect.Array.newInstance()' solve the generic array creation limitation?",
    "shortAnswer": "Because 'new T[size]' cannot be instantiated due to type erasure, passing a 'Class<T>' token provides the JVM with the actual reified class type at runtime. Calling '(T[]) Array.newInstance(clazz, capacity)' dynamically allocates an array of the exact concrete type, preserving runtime array type safety.",
    "explanation": "Standard pattern used in high-performance generic collections like ArrayList.",
    "hint": "Array.newInstance(clazz, size) uses the Class<T> token to allocate a reified array at runtime.",
    "level": "Intermediate",
    "codeExample": "T[] arr = (T[]) Array.newInstance(clazz, 10);"
  }
];

export default topic13_questions;