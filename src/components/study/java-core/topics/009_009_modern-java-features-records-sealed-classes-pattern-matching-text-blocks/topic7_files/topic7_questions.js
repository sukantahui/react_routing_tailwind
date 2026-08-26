const topic7_questions = [
  {
    "question": "What happens if a permitted subclass of a sealed class does not declare final, sealed, or non-sealed?",
    "shortAnswer": "A compile-time error occurs. Java syntax mandates that every permitted subclass must explicitly declare whether it is final, sealed, or non-sealed.",
    "explanation": "Ensures the author of the subclass explicitly declares its extension policy.",
    "hint": "Causes a compilation error; one of the three modifiers is mandatory.",
    "level": "Beginner",
    "codeExample": "public class Sub extends SealedParent {} // COMPILE ERROR: missing final/sealed/non-sealed"
  },
  {
    "question": "What is the purpose of the non-sealed keyword?",
    "shortAnswer": "The non-sealed keyword allows a permitted subclass to opt out of the sealed restriction and re-open itself for unrestricted inheritance by any other class.",
    "explanation": "Provides flexibility when a branch of a hierarchy needs open polymorphism.",
    "hint": "Re-opens the hierarchy for open extension.",
    "level": "Intermediate",
    "codeExample": "public non-sealed class OpenBranch extends SealedRoot {}"
  }
];

export default topic7_questions;
