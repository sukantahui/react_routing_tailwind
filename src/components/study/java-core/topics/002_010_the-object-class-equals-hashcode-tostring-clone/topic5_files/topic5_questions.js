const topic5_questions = [
  {
    question: "What are the 4 standard steps for writing a bulletproof 'equals()' method in Java?",
    shortAnswer: "1. Reference check ('if (this == obj) return true;'). 2. Null and type check ('if (obj == null || getClass() != obj.getClass()) return false;'). 3. Safe downcast ('MyClass other = (MyClass) obj;'). 4. Significant field comparisons ('Objects.equals(...)').",
    explanation: "This 4-step structure guarantees all 5 mathematical laws of the equals contract.",
    hint: "1. this == obj, 2. null/type check, 3. cast, 4. compare fields.",
    level: "Intermediate",
    codeExample: "// Complete 4-step template shown in Topic 5"
  }
];

export default topic5_questions;