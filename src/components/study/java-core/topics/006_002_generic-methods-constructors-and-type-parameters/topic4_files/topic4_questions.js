const topic4_questions = [
  {
    "question": "Why does the Java compiler produce a compilation error ('non-static type variable T cannot be referenced from a static context') if a static method tries to use a class-level type parameter <T>?",
    "shortAnswer": "Class-level type parameters '<T>' are tied to individual object instances created on the heap via 'new MyClass<String>()'. Static methods belong to the Class definition in Metaspace and can be invoked before any object instance exists (e.g. 'MyClass.doSomething()'). Therefore, static methods have no access to instance type <T> and MUST declare their own independent type parameter (e.g. 'public static <E> void doSomething(E e)').",
    "explanation": "Fundamental memory scoping rule between class-level Metaspace and instance-level Heap.",
    "hint": "Class <T> exists only upon object instantiation; static methods exist before instances and must declare their own <E>.",
    "level": "Intermediate",
    "codeExample": "public class Box<T> { public static <E> Box<E> create(E val) { ... } }"
  }
];

export default topic4_questions;