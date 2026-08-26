const topic12_questions = [
  {
    "question": "Why should API designers NEVER use wildcard types (e.g. 'List<? extends Number>') as method return types in Java?",
    "shortAnswer": "Using wildcards in return types forces client calling code to use wildcard types as well, cluttering client code and stripping callers of the ability to use concrete type methods or write to the returned collection. Return types should always be explicit, concrete types (e.g. 'List<Number>' or 'List<T>') to give clients full access without wildcard restrictions.",
    "explanation": "Effective Java Item 31: Do not use wildcard types as return types.",
    "hint": "Wildcard return types force callers to deal with wildcards; return types should be concrete.",
    "level": "Advanced",
    "codeExample": "public List<Number> getNumbers() // Good | public List<? extends Number> getNumbers() // Bad API Design"
  }
];

export default topic12_questions;