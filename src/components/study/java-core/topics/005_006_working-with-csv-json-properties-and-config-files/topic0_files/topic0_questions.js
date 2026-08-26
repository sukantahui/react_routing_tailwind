const topic0_questions = [
  {
    "question": "What is the class inheritance hierarchy of 'java.util.Properties' and what data types should be stored in it?",
    "shortAnswer": "'java.util.Properties' directly extends 'java.util.Hashtable<Object, Object>'. Although Hashtable allows arbitrary Objects, Properties is strictly designed to store String keys mapped to String values. You should always use 'setProperty(key, value)' and 'getProperty(key)' rather than Hashtable's put()/get() to prevent non-String object pollution.",
    "explanation": "Standard configuration carrier in Spring Boot, Log4j, and JDBC database drivers.",
    "hint": "Extends Hashtable<Object, Object> and is designed specifically for String-to-String key-values.",
    "level": "Beginner",
    "codeExample": "Properties props = new Properties(); props.setProperty(\"key\", \"val\");"
  }
];

export default topic0_questions;