const topic15_questions = [
  {
    question: "Why can a constructor NOT be declared 'static' in Java?",
    shortAnswer: "Because constructors fundamentally operate on the newly allocated Heap object referenced by 'this', whereas static members have no 'this' instance context.",
    explanation: "Static members belong to the class in Metaspace. Constructors exist solely to initialize an individual object instance.",
    hint: "Constructors operate on 'this'; static has no 'this'.",
    level: "Beginner",
    codeExample: "// Compile Error: public static Student() {}"
  },
  {
    question: "Why can a constructor NOT be declared 'final' in Java?",
    shortAnswer: "Because constructors are not inherited and cannot be overridden by subclasses, making the 'final' keyword completely redundant and illegal.",
    explanation: "Since overriding is impossible for constructors, 'final' serves no semantic purpose.",
    hint: "Constructors cannot be overridden, so final is meaningless.",
    level: "Beginner",
    codeExample: "// Compile Error: public final Student() {}"
  },
  {
    question: "Why can a constructor NOT be declared 'abstract' in Java?",
    shortAnswer: "Because abstract declarations lack implementation bodies, but constructors must execute to initialize instance memory.",
    explanation: "An abstract constructor would mean an object could not initialize its own memory fields, breaking object encapsulation.",
    hint: "Constructors must contain executable initialization bodies.",
    level: "Intermediate",
    codeExample: "// Compile Error: public abstract Student();"
  },
  {
    question: "Why can a constructor NOT be declared 'synchronized' in Java?",
    shortAnswer: "Because during construction, the object reference is thread-confined to the creating thread and cannot be accessed by any other thread.",
    explanation: "Synchronization is designed to coordinate multiple threads accessing a shared object. At birth, the object has not yet been published to any other thread.",
    hint: "Object is thread-confined until constructor completes.",
    level: "Advanced",
    codeExample: "// Compile Error: public synchronized Student() {}"
  }
];

export default topic15_questions;