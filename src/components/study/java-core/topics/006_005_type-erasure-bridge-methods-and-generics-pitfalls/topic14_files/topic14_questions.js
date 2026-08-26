const topic14_questions = [
  {
    "question": "How does the 'Super Type Token' (TypeToken) pattern invented by Neal Gafter allow libraries like Google Gson and Jackson to parse generic collections like 'List<MyModel>' without losing generic type information?",
    "shortAnswer": "While instance variables erase type arguments, the Java classfile specification PRESERVES generic superclass signatures in class metadata. By instantiating an anonymous subclass ('new TypeToken<List<MyModel>>() {}'), the library uses reflection ('getClass().getGenericSuperclass()') to cast to 'ParameterizedType' and call 'getActualTypeArguments()', recovering the full generic type at runtime.",
    "explanation": "Foundational reflection pattern powering Jackson TypeReference and Gson TypeToken.",
    "hint": "Anonymous subclass preserves generic superclass signature in class metadata, retrievable via getGenericSuperclass().",
    "level": "Advanced",
    "codeExample": "Type type = new TypeToken<List<Student>>(){}.getType();"
  }
];

export default topic14_questions;