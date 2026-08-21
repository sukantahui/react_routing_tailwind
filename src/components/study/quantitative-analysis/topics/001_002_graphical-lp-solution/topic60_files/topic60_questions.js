const questions = [
  {
    question: "How do you identify redundant constraints graphically?",
    shortAnswer: "Look for constraint lines that do not form part of the feasible region boundary.",
    explanation: "A redundant constraint's line will be outside the feasible region or not touch it.",
    hint: "Look at the boundary.",
    level: "intermediate",
    codeExample: "If the line doesn't touch the shaded region, it's redundant."
  },
  {
    question: "What is the visual sign of a redundant constraint?",
    shortAnswer: "The constraint line is completely outside the feasible region.",
    explanation: "If the line doesn't intersect or touch the feasible region, the constraint is redundant.",
    hint: "Line outside the region.",
    level: "basic",
    codeExample: "The line x=20 is outside the region x≤10."
  },
  {
    question: "What is the first example of a redundant constraint graphically?",
    shortAnswer: "x ≤ 20 is redundant when x ≤ 10 exists.",
    explanation: "The line x=20 is completely outside the feasible region bounded by x=10.",
    hint: "x=20 is outside.",
    level: "basic",
    codeExample: "x=20 doesn't touch the region."
  },
  {
    question: "What is the second example of a redundant constraint graphically?",
    shortAnswer: "x + y ≤ 20 is redundant with x ≤ 10, y ≤ 10.",
    explanation: "The line x+y=20 is completely outside the feasible region bounded by x=10 and y=10.",
    hint: "x+y=20 is outside.",
    level: "intermediate",
    codeExample: "x+y=20 doesn't touch the region."
  },
  {
    question: "What is the third example of a redundant constraint graphically?",
    shortAnswer: "x ≥ -5 is redundant with x ≥ 0.",
    explanation: "The line x=-5 is completely outside the feasible region bounded by x=0.",
    hint: "x=-5 is outside.",
    level: "basic",
    codeExample: "x=-5 doesn't touch the region."
  },
  {
    question: "What is a partially redundant constraint?",
    shortAnswer: "A constraint that only touches the feasible region at a few points.",
    explanation: "The line may touch the region at corners but doesn't form a significant part of the boundary.",
    hint: "Touches only at corners.",
    level: "intermediate",
    codeExample: "x+y=15 touches only at (10,5) and (5,10)."
  },
  {
    question: "How do you check if a constraint is redundant graphically?",
    shortAnswer: "See if the constraint line forms part of the feasible region boundary.",
    explanation: "If the line doesn't appear on the boundary, it's redundant.",
    hint: "Check the boundary.",
    level: "intermediate",
    codeExample: "Trace the boundary and see if the line is used."
  },
  {
    question: "What is the most common mistake in identifying redundant constraints graphically?",
    shortAnswer: "Not tracing the entire boundary of the feasible region.",
    explanation: "Some constraints may appear redundant but actually form part of the boundary at certain points.",
    hint: "Trace the whole boundary.",
    level: "basic",
    codeExample: "Make sure to check all edges."
  },
  {
    question: "What is the key insight about graphical redundancy?",
    shortAnswer: "A constraint is redundant if its line does not touch the feasible region.",
    explanation: "The simplest way to spot redundancy is to see if the line intersects the feasible region.",
    hint: "Line must touch the region.",
    level: "basic",
    codeExample: "If it doesn't touch, it's redundant."
  },
  {
    question: "What is the visual clue for a tight constraint?",
    shortAnswer: "The constraint line forms part of the boundary of the feasible region.",
    explanation: "Tight constraints appear as edges of the feasible region polygon.",
    hint: "Part of the boundary.",
    level: "basic",
    codeExample: "The line is on the edge of the region."
  },
  {
    question: "How do you distinguish between redundant and tight constraints graphically?",
    shortAnswer: "Tight constraints form the boundary; redundant constraints are outside.",
    explanation: "Tight constraints are on the edge of the feasible region. Redundant constraints are not.",
    hint: "Boundary vs outside.",
    level: "intermediate",
    codeExample: "Tight: on the edge; Redundant: outside."
  },
  {
    question: "Can a redundant constraint become tight?",
    shortAnswer: "No, a constraint is either redundant or tight.",
    explanation: "A redundant constraint never forms part of the boundary.",
    hint: "Stays redundant.",
    level: "basic",
    codeExample: "A redundant constraint is always redundant."
  },
  {
    question: "What is the visual clue for the first example?",
    shortAnswer: "The line x=20 is outside the feasible region.",
    explanation: "The feasible region is bounded by x=10, so x=20 is outside.",
    hint: "x=20 is outside.",
    level: "basic",
    codeExample: "The line x=20 doesn't touch the region."
  },
  {
    question: "What is the visual clue for the second example?",
    shortAnswer: "The line x+y=20 is outside the feasible region.",
    explanation: "The feasible region is bounded by x=10 and y=10, so x+y=20 is outside.",
    hint: "x+y=20 is outside.",
    level: "intermediate",
    codeExample: "The line x+y=20 doesn't touch the region."
  },
  {
    question: "What is the visual clue for the third example?",
    shortAnswer: "The line x=-5 is outside the feasible region.",
    explanation: "The feasible region is bounded by x=0, so x=-5 is outside.",
    hint: "x=-5 is outside.",
    level: "basic",
    codeExample: "The line x=-5 doesn't touch the region."
  },
  {
    question: "What is the visual clue for a partially redundant constraint?",
    shortAnswer: "The line touches the feasible region at only a few points.",
    explanation: "The line may intersect the region at corners but doesn't form a significant boundary.",
    hint: "Touches at corners only.",
    level: "intermediate",
    codeExample: "The line touches only at the corners."
  },
  {
    question: "What is the most important thing to remember about graphical redundancy?",
    shortAnswer: "Redundant lines don't touch the feasible region.",
    explanation: "The simplest way to spot redundancy is to see if the line intersects the feasible region.",
    hint: "Line must touch.",
    level: "basic",
    codeExample: "If it doesn't touch, it's redundant."
  },
  {
    question: "How do you verify a redundant constraint graphically?",
    shortAnswer: "Check if removing the constraint changes the feasible region.",
    explanation: "If the region remains the same, the constraint is redundant.",
    hint: "Test removal.",
    level: "intermediate",
    codeExample: "Remove the constraint and see if the region changes."
  },
  {
    question: "What is the benefit of identifying redundant constraints graphically?",
    shortAnswer: "It simplifies the problem without complex algebra.",
    explanation: "Visual identification is quick and intuitive.",
    hint: "Quick and visual.",
    level: "basic",
    codeExample: "Spot redundancy by looking at the graph."
  },
  {
    question: "What is the role of shading in identifying redundant constraints?",
    shortAnswer: "Shading shows the feasible region, making it easy to see which lines are outside.",
    explanation: "The shaded region clearly shows which constraints are active and which are redundant.",
    hint: "Shading helps.",
    level: "basic",
    codeExample: "The shaded region shows the boundary."
  },
  {
    question: "What is the first step in identifying redundant constraints graphically?",
    shortAnswer: "Plot all constraints and shade the feasible region.",
    explanation: "Start by graphing every constraint and finding the feasible region.",
    hint: "Plot and shade.",
    level: "basic",
    codeExample: "Graph all constraints first."
  },
  {
    question: "What is the second step in identifying redundant constraints graphically?",
    shortAnswer: "Trace the boundary of the feasible region.",
    explanation: "Follow the edges of the shaded region to see which lines form the boundary.",
    hint: "Trace the boundary.",
    level: "basic",
    codeExample: "Identify the lines on the edge."
  },
  {
    question: "What is the third step in identifying redundant constraints graphically?",
    shortAnswer: "Check each constraint line to see if it forms part of the boundary.",
    explanation: "If a line doesn't appear on the boundary, it's redundant.",
    hint: "Check each line.",
    level: "basic",
    codeExample: "See if the line is on the edge."
  },
  {
    question: "What is the fourth step in identifying redundant constraints graphically?",
    shortAnswer: "Remove redundant constraints and simplify the problem.",
    explanation: "After identifying redundant constraints, remove them to simplify the LP problem.",
    hint: "Remove and simplify.",
    level: "basic",
    codeExample: "Remove redundant constraints."
  },
  {
    question: "What is the most common mistake in graphical redundancy identification?",
    shortAnswer: "Not tracing the entire boundary of the feasible region.",
    explanation: "Some constraints may appear redundant but actually form part of the boundary at certain points.",
    hint: "Trace the whole boundary.",
    level: "basic",
    codeExample: "Make sure to check all edges."
  },
  {
    question: "What is the relationship between redundant constraints and the feasible region?",
    shortAnswer: "Redundant constraints don't affect the feasible region.",
    explanation: "The feasible region is the same with or without the redundant constraint.",
    hint: "No effect on region.",
    level: "basic",
    codeExample: "The region is unchanged."
  },
  {
    question: "Can a constraint be partially redundant graphically?",
    shortAnswer: "Yes, if it only touches the feasible region at a few points.",
    explanation: "A partially redundant constraint may touch the region at corners but doesn't form a significant boundary.",
    hint: "Touches at corners only.",
    level: "intermediate",
    codeExample: "The line touches only at the corners."
  },
  {
    question: "What is the visual clue for a tight constraint?",
    shortAnswer: "The constraint line forms part of the boundary of the feasible region.",
    explanation: "Tight constraints appear as edges of the feasible region polygon.",
    hint: "Part of the boundary.",
    level: "basic",
    codeExample: "The line is on the edge of the region."
  },
  {
    question: "What is the visual clue for a redundant constraint?",
    shortAnswer: "The constraint line is completely outside the feasible region.",
    explanation: "If the line doesn't intersect or touch the feasible region, the constraint is redundant.",
    hint: "Line outside the region.",
    level: "basic",
    codeExample: "The line is outside the shaded area."
  },
  {
    question: "What is the most important thing to remember about graphical redundancy?",
    shortAnswer: "Redundant lines don't touch the feasible region.",
    explanation: "The simplest way to spot redundancy is to see if the line intersects the feasible region.",
    hint: "Line must touch.",
    level: "basic",
    codeExample: "If it doesn't touch, it's redundant."
  }
];

export default questions;