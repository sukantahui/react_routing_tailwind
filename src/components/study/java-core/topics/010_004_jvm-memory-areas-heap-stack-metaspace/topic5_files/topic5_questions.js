const topic5_questions = [
  {
    "question": "What keyword is used in Java to declare a method whose implementation is written in C/C++ on the Native Method Stack?",
    "shortAnswer": "The 'native' keyword (e.g. public static native long currentTimeMillis();), which has no body in Java source code and is resolved via the Java Native Interface (JNI).",
    "explanation": "Indicates implementation is provided by a native dynamic library (.dll / .so).",
    "hint": "The 'native' keyword.",
    "level": "Beginner",
    "codeExample": "public native void nativeMethod();"
  },
  {
    "question": "Is the Native Method Stack memory allocated on the Java Heap or native OS memory?",
    "shortAnswer": "It is allocated in native OS process memory outside the Java Heap.",
    "explanation": "Allocated according to the operating system C calling conventions.",
    "hint": "Allocated in native OS process memory.",
    "level": "Intermediate",
    "codeExample": "Native Stack uses OS thread memory."
  }
];

export default topic5_questions;
