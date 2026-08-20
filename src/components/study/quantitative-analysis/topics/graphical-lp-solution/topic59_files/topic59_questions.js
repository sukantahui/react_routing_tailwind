const questions = [
  {
    question: "What is a redundant constraint?",
    shortAnswer: "A constraint that does not affect the feasible region when removed.",
    explanation: "A redundant constraint is implied by other constraints and can be removed without changing the feasible region.",
    hint: "Doesn't change the region.",
    level: "basic",
    codeExample: "x≤20 is redundant when x≤10 exists."
  },
  {
    question: "How do you identify a redundant constraint?",
    shortAnswer: "A constraint is redundant if it is implied by other constraints.",
    explanation: "If a constraint is looser than another in the same direction, it's redundant.",
    hint: "Check if implied.",
    level: "intermediate",
    codeExample: "x≤20 is implied by x≤10, so x≤20 is redundant."
  },
  {
    question: "What is the first example of a redundant constraint?",
    shortAnswer: "x ≤ 20 is redundant when x ≤ 10 exists.",
    explanation: "Since x≤10 is tighter than x≤20, any point satisfying x≤10 automatically satisfies x≤20.",
    hint: "x≤20 is looser.",
    level: "basic",
    codeExample: "x≤20 is redundant with x≤10."
  },
  {
    question: "What is the second example of a redundant constraint?",
    shortAnswer: "x + y ≤ 20 is redundant with x ≤ 10, y ≤ 10.",
    explanation: "With x≤10 and y≤10, the maximum of x+y is 10+10=20, so x+y≤20 is automatically satisfied.",
    hint: "Implied by individual bounds.",
    level: "intermediate",
    codeExample: "x+y≤20 is redundant with x≤10, y≤10."
  },
  {
    question: "What is the third example of a redundant constraint?",
    shortAnswer: "x ≥ -5 is redundant with x ≥ 0.",
    explanation: "Since x≥0 is tighter than x≥-5, any point satisfying x≥0 automatically satisfies x≥-5.",
    hint: "x≥-5 is looser.",
    level: "basic",
    codeExample: "x≥-5 is redundant with x≥0."
  },
  {
    question: "Can lower bounds be redundant?",
    shortAnswer: "Yes, if a tighter lower bound exists.",
    explanation: "For example, x≥-5 is redundant when x≥0 exists.",
    hint: "Yes, lower bounds can be redundant.",
    level: "intermediate",
    codeExample: "x≥-5 is redundant with x≥0."
  },
  {
    question: "Can upper bounds be redundant?",
    shortAnswer: "Yes, if a tighter upper bound exists.",
    explanation: "For example, x≤20 is redundant when x≤10 exists.",
    hint: "Yes, upper bounds can be redundant.",
    level: "intermediate",
    codeExample: "x≤20 is redundant with x≤10."
  },
  {
    question: "What is the key insight about redundant constraints?",
    shortAnswer: "They can be removed without changing the feasible region.",
    explanation: "Redundant constraints don't affect the solution, so they can be eliminated to simplify the problem.",
    hint: "Remove without changing.",
    level: "basic",
    codeExample: "Remove redundant constraints."
  },
  {
    question: "How do you check if a constraint is redundant?",
    shortAnswer: "Check if it is implied by other constraints.",
    explanation: "If removing the constraint doesn't change the feasible region, it's redundant.",
    hint: "Check if implied.",
    level: "intermediate",
    codeExample: "Test if the constraint is always satisfied by other constraints."
  },
  {
    question: "What is the visual clue for a redundant constraint?",
    shortAnswer: "The constraint line is outside the feasible region or doesn't form a boundary.",
    explanation: "If the line doesn't touch the feasible region, it's redundant.",
    hint: "Line doesn't touch the region.",
    level: "basic",
    codeExample: "The constraint line is outside the shaded area."
  },
  {
    question: "What is the most common mistake with redundant constraints?",
    shortAnswer: "Assuming a constraint is redundant without checking.",
    explanation: "Some constraints may appear redundant but actually affect the feasible region.",
    hint: "Don't assume.",
    level: "basic",
    codeExample: "Always verify if the constraint is implied."
  },
  {
    question: "Can a redundant constraint affect the optimal solution?",
    shortAnswer: "No, a redundant constraint does not affect the optimal solution.",
    explanation: "Since the feasible region is unchanged, the optimal solution remains the same.",
    hint: "No effect.",
    level: "basic",
    codeExample: "Removing redundant constraints doesn't change the optimal solution."
  },
  {
    question: "Why should you remove redundant constraints?",
    shortAnswer: "To simplify the problem and improve efficiency.",
    explanation: "Fewer constraints make the problem easier to solve and reduce computational cost.",
    hint: "Simplify the problem.",
    level: "intermediate",
    codeExample: "Remove redundant constraints to simplify."
  },
  {
    question: "What is the relationship between redundant constraints and the feasible region?",
    shortAnswer: "Redundant constraints don't affect the feasible region.",
    explanation: "The feasible region is the same with or without the redundant constraint.",
    hint: "No effect on region.",
    level: "basic",
    codeExample: "The feasible region is unchanged."
  },
  {
    question: "How do you identify redundant constraints graphically?",
    shortAnswer: "If the constraint line doesn't form part of the feasible region boundary, it's redundant.",
    explanation: "A redundant constraint's line will be outside the feasible region or not touch it.",
    hint: "Look at the boundary.",
    level: "intermediate",
    codeExample: "The line is outside the shaded region."
  },
  {
    question: "Can a constraint be partially redundant?",
    shortAnswer: "Yes, a constraint can be redundant in some parts but not others.",
    explanation: "Some constraints may only be binding in certain regions of the feasible space.",
    hint: "Partially redundant possible.",
    level: "expert",
    codeExample: "A constraint might be redundant for most of the region but active in a corner."
  },
  {
    question: "What is the difference between redundant and non-binding?",
    shortAnswer: "Non-binding means the constraint isn't active at the optimum; redundant means it never affects the feasible region.",
    explanation: "A non-binding constraint could be binding at other points, but a redundant constraint never affects the region.",
    hint: "Non-binding vs never affects.",
    level: "intermediate",
    codeExample: "Non-binding: not active at optimum; Redundant: never active."
  },
  {
    question: "How do you verify a constraint is redundant?",
    shortAnswer: "Check if removing it changes the feasible region.",
    explanation: "If the region remains the same, the constraint is redundant.",
    hint: "Test removal.",
    level: "intermediate",
    codeExample: "Remove the constraint and check if the region changes."
  },
  {
    question: "What is the role of redundant constraints in LP?",
    shortAnswer: "They add no value and can be removed for efficiency.",
    explanation: "Redundant constraints waste computational resources and can be eliminated.",
    hint: "Remove for efficiency.",
    level: "intermediate",
    codeExample: "Eliminate redundant constraints."
  },
  {
    question: "Can a redundant constraint become non-redundant?",
    shortAnswer: "No, if it's truly redundant, it never affects the feasible region.",
    explanation: "A constraint is either redundant or not. It doesn't change over time.",
    hint: "Stays redundant.",
    level: "basic",
    codeExample: "A redundant constraint is always redundant."
  },
  {
    question: "What is the most important thing to remember about redundant constraints?",
    shortAnswer: "They don't affect the feasible region or optimal solution.",
    explanation: "Redundant constraints can be safely removed without changing the problem.",
    hint: "No effect.",
    level: "basic",
    codeExample: "Remove them safely."
  },
  {
    question: "What is the first example's redundant reason?",
    shortAnswer: "x≤20 is implied by x≤10.",
    explanation: "Any point satisfying x≤10 automatically satisfies x≤20.",
    hint: "Implied by x≤10.",
    level: "basic",
    codeExample: "x≤10 → x≤20."
  },
  {
    question: "What is the second example's redundant reason?",
    shortAnswer: "x+y≤20 is implied by x≤10 and y≤10.",
    explanation: "With x≤10 and y≤10, x+y≤20 always holds.",
    hint: "Implied by x≤10, y≤10.",
    level: "intermediate",
    codeExample: "x≤10, y≤10 → x+y≤20."
  },
  {
    question: "What is the third example's redundant reason?",
    shortAnswer: "x≥-5 is implied by x≥0.",
    explanation: "Any point satisfying x≥0 automatically satisfies x≥-5.",
    hint: "Implied by x≥0.",
    level: "basic",
    codeExample: "x≥0 → x≥-5."
  },
  {
    question: "How do you compare constraints to find redundancy?",
    shortAnswer: "Compare bounds in the same direction.",
    explanation: "If one constraint is tighter in the same direction, the looser one is redundant.",
    hint: "Compare bounds.",
    level: "intermediate",
    codeExample: "x≤10 is tighter than x≤20, so x≤20 is redundant."
  },
  {
    question: "What is the visual clue for a redundant constraint in the first example?",
    shortAnswer: "The line x=20 is outside the feasible region.",
    explanation: "The feasible region is bounded by x=10, not x=20.",
    hint: "x=20 is outside.",
    level: "basic",
    codeExample: "The line x=20 doesn't touch the region."
  },
  {
    question: "What is the visual clue for a redundant constraint in the second example?",
    shortAnswer: "The line x+y=20 is outside the feasible region.",
    explanation: "The feasible region is bounded by x=10 and y=10, and x+y=20 is outside.",
    hint: "x+y=20 is outside.",
    level: "intermediate",
    codeExample: "The line x+y=20 doesn't touch the region."
  },
  {
    question: "What is the visual clue for a redundant constraint in the third example?",
    shortAnswer: "The line x=-5 is outside the feasible region.",
    explanation: "The feasible region is bounded by x=0, not x=-5.",
    hint: "x=-5 is outside.",
    level: "basic",
    codeExample: "The line x=-5 doesn't touch the region."
  },
  {
    question: "What is the most common mistake in identifying redundant constraints?",
    shortAnswer: "Assuming a constraint is redundant without verifying.",
    explanation: "Some constraints may appear redundant but actually affect the feasible region.",
    hint: "Verify before removing.",
    level: "basic",
    codeExample: "Always check if the constraint is truly implied."
  },
  {
    question: "What is the benefit of removing redundant constraints?",
    shortAnswer: "It simplifies the problem and improves efficiency.",
    explanation: "Fewer constraints make the problem easier to solve and reduce computational cost.",
    hint: "Simplify and improve.",
    level: "intermediate",
    codeExample: "Remove to simplify."
  }
];

export default questions;