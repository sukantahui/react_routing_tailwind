const topic2_questions = [
  {
    "question": "What capability does implementing 'java.lang.Iterable<T>' grant to a custom Java class?",
    "shortAnswer": "Implementing 'java.lang.Iterable<T>' allows instances of your custom class to be used as the target of the enhanced for-each loop ('for (T item : myCustomClass)'). It requires overriding 'public Iterator<T> iterator()' and automatically inherits the functional 'forEach(Consumer)' default method introduced in Java 8.",
    "explanation": "The root gateway to all collection iteration in the Java language.",
    "hint": "Enables using instances directly in enhanced for-each loops and grants the forEach() method.",
    "level": "Beginner",
    "codeExample": "public class CustomBatch implements Iterable<Student> { public Iterator<Student> iterator() { ... } }"
  }
];

export default topic2_questions;