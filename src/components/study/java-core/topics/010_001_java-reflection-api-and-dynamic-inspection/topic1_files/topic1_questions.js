const topic1_questions = [
  {
    "question": "How does an Inversion of Control (IoC) container inject private fields annotated with @Autowired?",
    "shortAnswer": "The IoC container scans declared fields using class.getDeclaredFields(), checks for the @Autowired annotation via field.isAnnotationPresent(), calls field.setAccessible(true) to bypass access modifiers, and calls field.set(targetInstance, beanInstance).",
    "explanation": "Enables field-based dependency injection without requiring boilerplate setters.",
    "hint": "Scans fields, enables access with setAccessible(true), and sets the bean via field.set().",
    "level": "Intermediate",
    "codeExample": "field.setAccessible(true); field.set(service, dependency);"
  },
  {
    "question": "What annotation retention policy is required for annotations processed via Reflection?",
    "shortAnswer": "RetentionPolicy.RUNTIME, which instructs the compiler to retain the annotation bytecode in the .class file and keep it accessible to the JVM Reflection runtime.",
    "explanation": "SOURCE and CLASS retentions are not visible via Reflection at runtime.",
    "hint": "@Retention(RetentionPolicy.RUNTIME)",
    "level": "Beginner",
    "codeExample": "@Retention(RetentionPolicy.RUNTIME) public @interface MyAnnotation {}"
  }
];

export default topic1_questions;
