const topic9_questions = [
  {
    "question": "How does refactoring verbose lambda pipelines to Method References improve code quality and maintainability?",
    "shortAnswer": "Refactoring verbose parameter declarations (e.g. 'record -> record.getName()' to 'StudentLedgerRecord::getName', and 'x -> Objects.nonNull(x)' to 'Objects::nonNull') removes distracting syntactic boilerplate and eliminates arbitrary parameter naming clutter. It elevates code to a high-level declarative state where each stream operation clearly describes WHAT method is invoked on domain models rather than HOW parameters are passed.",
    "explanation": "Best practices for refactoring lambdas into method references.",
    "hint": "Replaces boilerplate parameter names with clear declarative method handles like Objects::nonNull and String::toUpperCase.",
    "level": "Intermediate",
    "codeExample": ".filter(record -> record.isPaid()) -> .filter(Record::isPaid)"
  }
];

export default topic9_questions;