const questions = [
  {
    question: "What is the effect of a redundant constraint on the feasible region?",
    shortAnswer: "No effect — the feasible region remains exactly the same.",
    explanation: "A redundant constraint doesn't change the feasible region at all. It can be safely removed.",
    hint: "No effect.",
    level: "basic",
    codeExample: "Removing x≤20 when x≤10 exists doesn't change the region."
  },
  {
    question: "Can a redundant constraint affect the optimal solution?",
    shortAnswer: "No, it has no effect on the optimal solution.",
    explanation: "Since the feasible region is unchanged, the optimal solution remains the same.",
    hint: "No effect.",
    level: "basic",
    codeExample: "The optimal solution is the same with or without the redundant constraint."
  },
  {
    question: "What is the effect of x≤20 when x≤10 exists?",
    shortAnswer: "No effect — x≤20 is redundant.",
    explanation: "Since x≤10 is tighter, x≤20 doesn't change the feasible region.",
    hint: "No effect.",
    level: "basic",
    codeExample: "x≤20 is redundant with x≤10."
  },
  {
    question: "What is the effect of x+y≤20 when x≤10 and y≤10 exist?",
    shortAnswer: "No effect — x+y≤20 is redundant.",
    explanation: "With x≤10 and y≤10, x+y≤20 is automatically satisfied.",
    hint: "No effect.",
    level: "intermediate",
    codeExample: "x+y≤20 is redundant with x≤10, y≤10."
  },
  {
    question: "What is the effect of x≥-5 when x≥0 exists?",
    shortAnswer: "No effect — x≥-5 is redundant.",
    explanation: "Since x≥0 is tighter, x≥-5 doesn't change the feasible region.",
    hint: "No effect.",
    level: "basic",
    codeExample: "x≥-5 is redundant with x≥0."
  },
  {
    question: "What happens to the feasible region when a redundant constraint is removed?",
    shortAnswer: "The feasible region remains exactly the same.",
    explanation: "Removing a redundant constraint doesn't change the feasible region at all.",
    hint: "Stays the same.",
    level: "basic",
    codeExample: "The region is identical."
  },
  {
    question: "What is the key insight about redundant constraints?",
    shortAnswer: "They don't affect the feasible region and can be safely removed.",
    explanation: "Redundant constraints are implied by other constraints and have no effect.",
    hint: "No effect, safe to remove.",
    level: "basic",
    codeExample: "Remove redundant constraints safely."
  },
  {
    question: "How do you verify the effect of removing a constraint?",
    shortAnswer: "Check if the feasible region changes after removal.",
    explanation: "If the region stays the same, the constraint was redundant.",
    hint: "Check the region.",
    level: "intermediate",
    codeExample: "Compare the region with and without the constraint."
  },
  {
    question: "What is the visual clue for a redundant constraint's effect?",
    shortAnswer: "The feasible region looks identical with or without the constraint.",
    explanation: "The shaded region is the same in both cases.",
    hint: "Looks the same.",
    level: "basic",
    codeExample: "The region is unchanged."
  },
  {
    question: "What is the difference between redundant and tight constraints?",
    shortAnswer: "Redundant constraints don't affect the region; tight constraints form the boundary.",
    explanation: "Tight constraints are on the edge of the feasible region. Redundant constraints are not.",
    hint: "Boundary vs outside.",
    level: "intermediate",
    codeExample: "Tight: on the edge; Redundant: outside."
  },
  {
    question: "Can a constraint be partially redundant?",
    shortAnswer: "Yes, if it only touches the feasible region at a few points.",
    explanation: "A partially redundant constraint may touch the region at corners but doesn't form a significant boundary.",
    hint: "Touches at corners only.",
    level: "intermediate",
    codeExample: "The constraint only affects a small part of the region."
  },
  {
    question: "What is the effect of a partially redundant constraint?",
    shortAnswer: "It only affects a small part of the feasible region.",
    explanation: "A partially redundant constraint may be binding at some points but not others.",
    hint: "Partial effect.",
    level: "intermediate",
    codeExample: "The constraint only matters at certain points."
  },
  {
    question: "What is the most common mistake with redundant constraints?",
    shortAnswer: "Assuming a constraint is redundant without verifying.",
    explanation: "Some constraints may appear redundant but actually affect the feasible region.",
    hint: "Verify before removing.",
    level: "basic",
    codeExample: "Always check if the constraint is truly redundant."
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
    question: "What is the effect of redundant constraints on the feasible region's shape?",
    shortAnswer: "No effect — the shape remains the same.",
    explanation: "The feasible region's shape is determined by the tight constraints, not redundant ones.",
    hint: "Shape stays the same.",
    level: "basic",
    codeExample: "The region's shape is unchanged."
  },
  {
    question: "What is the effect of redundant constraints on the feasible region's size?",
    shortAnswer: "No effect — the size remains the same.",
    explanation: "The feasible region's size is determined by the tight constraints, not redundant ones.",
    hint: "Size stays the same.",
    level: "basic",
    codeExample: "The region's size is unchanged."
  },
  {
    question: "What is the effect of redundant constraints on the corner points?",
    shortAnswer: "No effect — the corner points remain the same.",
    explanation: "The corner points are determined by the tight constraints, not redundant ones.",
    hint: "Corner points stay the same.",
    level: "intermediate",
    codeExample: "The corner points are unchanged."
  },
  {
    question: "What is the relationship between redundant constraints and the objective function?",
    shortAnswer: "Redundant constraints don't affect the objective function.",
    explanation: "Since the feasible region is unchanged, the objective function's optimal value is the same.",
    hint: "No effect on objective.",
    level: "basic",
    codeExample: "The objective value is unchanged."
  },
  {
    question: "What is the visual clue for no redundant constraints?",
    shortAnswer: "All lines form part of the boundary of the feasible region.",
    explanation: "When there are no redundant constraints, every constraint affects the region.",
    hint: "All lines on boundary.",
    level: "intermediate",
    codeExample: "Every constraint is tight."
  },
  {
    question: "What is the visual clue for redundant constraints?",
    shortAnswer: "Some lines are outside the feasible region.",
    explanation: "Redundant constraints appear as lines that don't touch the feasible region.",
    hint: "Lines outside.",
    level: "basic",
    codeExample: "Some lines don't touch the region."
  },
  {
    question: "What is the effect of removing a redundant constraint?",
    shortAnswer: "No effect — the feasible region remains exactly the same.",
    explanation: "Removing a redundant constraint doesn't change the feasible region at all.",
    hint: "No effect.",
    level: "basic",
    codeExample: "The region is unchanged."
  },
  {
    question: "What is the effect of removing a tight constraint?",
    shortAnswer: "The feasible region changes — it becomes larger.",
    explanation: "Removing a tight constraint expands the feasible region.",
    hint: "Region changes.",
    level: "intermediate",
    codeExample: "The region becomes larger."
  },
  {
    question: "What is the difference between removing a redundant and a tight constraint?",
    shortAnswer: "Removing redundant: no effect; Removing tight: region changes.",
    explanation: "Redundant constraints don't affect the region; tight constraints do.",
    hint: "No effect vs changes.",
    level: "intermediate",
    codeExample: "Redundant: no change; Tight: region expands."
  },
  {
    question: "What is the most important thing to remember about redundant constraints?",
    shortAnswer: "They have no effect on the feasible region or optimal solution.",
    explanation: "Redundant constraints can be safely removed without changing anything.",
    hint: "No effect.",
    level: "basic",
    codeExample: "Remove them safely."
  },
  {
    question: "What is the first example's effect?",
    shortAnswer: "Removing x≤20 does not change the feasible region.",
    explanation: "The region is the same with or without x≤20.",
    hint: "No change.",
    level: "basic",
    codeExample: "The region is unchanged."
  },
  {
    question: "What is the second example's effect?",
    shortAnswer: "Removing x+y≤20 does not change the feasible region.",
    explanation: "The region is the same with or without x+y≤20.",
    hint: "No change.",
    level: "intermediate",
    codeExample: "The region is unchanged."
  },
  {
    question: "What is the third example's effect?",
    shortAnswer: "All constraints are tight — removing any would change the region.",
    explanation: "When there are no redundant constraints, every constraint affects the region.",
    hint: "All are tight.",
    level: "intermediate",
    codeExample: "Every constraint matters."
  },
  {
    question: "What is the visual clue for the first example?",
    shortAnswer: "The feasible region with and without x≤20 looks identical.",
    explanation: "The region is the same in both cases.",
    hint: "Looks the same.",
    level: "basic",
    codeExample: "The region is identical."
  },
  {
    question: "What is the visual clue for the second example?",
    shortAnswer: "The feasible region with and without x+y≤20 looks identical.",
    explanation: "The region is the same in both cases.",
    hint: "Looks the same.",
    level: "intermediate",
    codeExample: "The region is identical."
  },
  {
    question: "What is the visual clue for the third example?",
    shortAnswer: "All lines form part of the boundary of the feasible region.",
    explanation: "Every constraint is tight and affects the region.",
    hint: "All on boundary.",
    level: "intermediate",
    codeExample: "Every line is on the edge."
  }
];

export default questions;