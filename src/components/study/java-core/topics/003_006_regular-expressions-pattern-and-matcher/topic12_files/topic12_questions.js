const topic12_questions = [
  {
    "question": "How does the Java 9 'Matcher.replaceAll(Function<MatchResult, String>)' method revolutionize text transformations?",
    "shortAnswer": "It allows passing a lambda function to compute dynamic replacement values on-the-fly for every individual match (such as parsing numeric values, applying tax math, or querying databases) without manual StringBuffer appendReplacement loops.",
    "explanation": "Introduced in Java 9 to modernize Matcher functional text pipelines.",
    "hint": "Allows computing replacement text dynamically using lambda expressions.",
    "level": "Intermediate",
    "codeExample": "String res = m.replaceAll(mr → mr.group().toUpperCase());"
  }
];

export default topic12_questions;
