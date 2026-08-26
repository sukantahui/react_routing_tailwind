const topic7_questions = [
  {
    "question": "Why are 'static' variables NOT saved or transferred during Java Object Serialization?",
    "shortAnswer": "Serialization preserves the state of individual object instances on the heap. 'static' variables belong to the Class definition loaded into Metaspace/Method Area, shared by all instances. When an object is deserialized, static fields simply reflect whatever value the receiving JVM's loaded class currently possesses.",
    "explanation": "Static variables are class-level state, not instance-level state.",
    "hint": "Static fields belong to the Class in Metaspace, not individual heap object instances.",
    "level": "Intermediate",
    "codeExample": "public static String appVersion = \"1.0\"; // NOT saved during oos.writeObject(obj)"
  }
];

export default topic7_questions;