const topic11_questions = [
  {
    question: "What is the 'God Object' anti-pattern and how do SOLID principles eliminate it?",
    shortAnswer: "A God Object is an oversized class that aggregates unrelated responsibilities (UI, database, calculations, email). Applying the Single Responsibility Principle (SRP) decomposes the God Object into cohesive, focused services.",
    explanation: "God Objects lead to severe merge conflicts and regression bugs.",
    hint: "A giant class doing everything; cured by applying SRP to split responsibilities.",
    level: "Beginner",
    codeExample: "// Anti-pattern: class ApplicationManager { void doEverything(); }"
  }
];

export default topic11_questions;