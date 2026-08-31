const topic5_questions = [
  {
    "question": "When is the value 100 assigned to 'public static final int MAX = 100;' versus 'public static int count = 100;'?",
    "shortAnswer": "'public static final int MAX = 100;' is assigned during the Preparation phase via the ConstantValue attribute. In contrast, 'public static int count = 100;' is set to 0 in Preparation and assigned 100 later during the Initialization phase (<clinit>).",
    "explanation": "Compile-time constants bypass <clinit> initialization.",
    "hint": "Constants assigned in Preparation; non-constants assigned in Initialization.",
    "level": "Intermediate",
    "codeExample": "final constant → Preparation; non-final static → Initialization"
  },
  {
    "question": "Where are static variables allocated in modern HotSpot JVMs?",
    "shortAnswer": "In modern HotSpot JVMs (Java 8+), class metadata resides in native Metaspace, but static field reference variables are allocated directly on the Java Heap as part of the companion java.lang.Class instance.",
    "explanation": "Allows garbage collection of static objects when classes unload.",
    "hint": "Allocated on the Java Heap as part of the Class mirror object.",
    "level": "Advanced",
    "codeExample": "Static fields live on the Java Heap alongside the Class object."
  }
];

export default topic5_questions;
