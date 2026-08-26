const topic11_questions = [
  {
    "question": "What interface provides getAnnotation() and isAnnotationPresent() across Class, Method, Field, and Constructor?",
    "shortAnswer": "java.lang.reflect.AnnotatedElement, which is implemented by Class, Method, Field, Constructor, and Parameter.",
    "explanation": "Provides uniform annotation introspection across all language elements.",
    "hint": "AnnotatedElement interface.",
    "level": "Intermediate",
    "codeExample": "AnnotatedElement element = clazz.getMethod('test'); element.isAnnotationPresent(Test.class);"
  },
  {
    "question": "What does getAnnotation(MyAnn.class) return if the annotation is NOT present on the target element?",
    "shortAnswer": "It returns null.",
    "explanation": "Always check isAnnotationPresent() or verify non-null before dereferencing.",
    "hint": "Returns null.",
    "level": "Beginner",
    "codeExample": "MyAnn ann = element.getAnnotation(MyAnn.class); if (ann != null) { ... }"
  }
];

export default topic11_questions;
