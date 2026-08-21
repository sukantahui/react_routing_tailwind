// topic6_files/topic6_questions.js

const questions = [
  {
    question: "What is the first step in formulating an LP model?",
    shortAnswer: "Read and understand the problem thoroughly.",
    explanation: "Before writing any equations, you must fully grasp the problem's objective, constraints, and available data.",
    hint: "You can't solve what you don't understand.",
    level: "basic"
  },
  {
    question: "Why is it important to clearly define decision variables?",
    shortAnswer: "Because they are the unknown quantities we are solving for; clear definitions prevent confusion.",
    explanation: "Each variable must have a specific meaning and units, ensuring the model is unambiguous.",
    hint: "If you can't define it, you can't model it.",
    level: "basic"
  },
  {
    question: "What should you do after defining variables?",
    shortAnswer: "Determine the objective function and constraints.",
    explanation: "The objective sets the goal, and constraints define the limits; they are the core of the model.",
    hint: "What are you trying to achieve and what are the limits?",
    level: "basic"
  },
  {
    question: "How do you identify constraints in a word problem?",
    shortAnswer: "Look for phrases like 'at most', 'no more than', 'at least', 'no less than', 'exactly'.",
    explanation: "These signal the limits that must be respected, such as resource capacities or minimum requirements.",
    hint: "Keywords guide you.",
    level: "moderate"
  },
  {
    question: "What is the purpose of the non-negativity restrictions in the formulation?",
    shortAnswer: "To ensure all decision variables are ≥ 0, reflecting real-world quantities.",
    explanation: "Without them, the solution might include negative values, which are often meaningless.",
    hint: "Real quantities can't be negative.",
    level: "basic"
  },
  {
    question: "What is the final step in formulating an LP model?",
    shortAnswer: "Review the model to check for consistency, completeness, and feasibility.",
    explanation: "Ensure all constraints are included, units are consistent, and the model makes sense.",
    hint: "Always double-check.",
    level: "moderate"
  },
  {
    question: "Can you formulate an LP model without defining variables first?",
    shortAnswer: "No, variables are the building blocks; you need them to write the objective and constraints.",
    explanation: "The entire model revolves around the decision variables.",
    hint: "You can't build without bricks.",
    level: "basic"
  },
  {
    question: "What is the difference between a constraint and the objective in a model?",
    shortAnswer: "The objective is what you want to optimize; constraints are the limits you must respect.",
    explanation: "They are separate parts of the model with different roles.",
    hint: "Goal vs. rules.",
    level: "basic"
  },
  {
    question: "What does it mean to 'formulate' an LP model?",
    shortAnswer: "To translate a real-world problem into a mathematical model with an objective, constraints, and variables.",
    explanation: "It's the process of converting words into math.",
    hint: "Turning problems into equations.",
    level: "basic"
  },
  {
    question: "Why is it important to check for hidden constraints?",
    shortAnswer: "Because some restrictions are implied but not explicitly stated (e.g., production cannot exceed demand).",
    explanation: "Hidden constraints can make the model unrealistic if overlooked.",
    hint: "Not all constraints are obvious.",
    level: "moderate"
  },
  {
    question: "How do you decide the sign of a constraint (≤ vs ≥)?",
    shortAnswer: "Based on the wording: 'at most' → ≤, 'at least' → ≥, 'exactly' → =.",
    explanation: "The direction reflects whether it's a cap or a floor.",
    hint: "Caps and floors.",
    level: "moderate"
  },
  {
    question: "What are the key components of an LP model?",
    shortAnswer: "Decision variables, objective function, constraints, and non-negativity restrictions.",
    explanation: "These four elements are the essential parts of any LP formulation.",
    hint: "Remember the acronym D.O.C.N.",
    level: "basic"
  },
  {
    question: "What is a common mistake in defining constraints?",
    shortAnswer: "Using the wrong inequality direction or forgetting a constraint entirely.",
    explanation: "Misinterpretation of the problem statement can lead to errors.",
    hint: "Read carefully.",
    level: "moderate"
  },
  {
    question: "How can you test if your model is correct?",
    shortAnswer: "Plug in a simple feasible solution and check all constraints and the objective.",
    explanation: "This helps verify that the model behaves as expected.",
    hint: "Test with small numbers.",
    level: "moderate"
  },
  {
    question: "What should you do if your model is infeasible?",
    shortAnswer: "Review the constraints; there may be a conflict (e.g., x ≥ 10 and x ≤ 5).",
    explanation: "Infeasibility means the constraints are too restrictive; you may need to relax some.",
    hint: "Look for contradictions.",
    level: "expert"
  },
  {
    question: "What is a 'decision variable' in the context of formulation?",
    shortAnswer: "A quantity that the decision-maker controls, such as units to produce.",
    explanation: "It's what you are trying to determine.",
    hint: "You decide its value.",
    level: "basic"
  },
  {
    question: "Why is it important to use consistent units?",
    shortAnswer: "To avoid mathematical errors and ensure the model is meaningful.",
    explanation: "If you mix hours and minutes, the results will be wrong.",
    hint: "Apples to apples.",
    level: "moderate"
  },
  {
    question: "What is the difference between a model formulation and its solution?",
    shortAnswer: "Formulation is setting up the math; solution is finding the optimal values.",
    explanation: "Formulation comes first; solution is the output.",
    hint: "Build it, then solve it.",
    level: "basic"
  },
  {
    question: "How many steps are typically involved in formulating an LP model?",
    shortAnswer: "About 5-7 steps, depending on the source, but the core is: define variables, objective, constraints, non-negativity, and review.",
    explanation: "The exact number may vary, but the process is systematic.",
    hint: "It's a standard procedure.",
    level: "moderate"
  },
  {
    question: "What is the role of assumptions in model formulation?",
    shortAnswer: "They clarify what is being modeled and set the scope of the problem.",
    explanation: "Assumptions might include linearity, certainty, and divisibility.",
    hint: "What are you assuming?",
    level: "moderate"
  },
  {
    question: "Can the same problem be formulated in different ways?",
    shortAnswer: "Yes, there can be multiple valid formulations, but they should yield the same optimal solution.",
    explanation: "Choice of variables and constraints might differ, but the core problem is the same.",
    hint: "Different paths to the same answer.",
    level: "expert"
  },
  {
    question: "Why is it important to label constraints?",
    shortAnswer: "To make the model easy to understand, review, and debug.",
    explanation: "Labels like 'Labor' or 'Material' help identify each constraint.",
    hint: "Clear labeling helps.",
    level: "basic"
  },
  {
    question: "What is the danger of skipping the review step?",
    shortAnswer: "You might miss errors that make the model infeasible or lead to incorrect solutions.",
    explanation: "Review catches mistakes before solving.",
    hint: "Always check your work.",
    level: "moderate"
  },
  {
    question: "How do you handle equality constraints in formulation?",
    shortAnswer: "Use = when something must be exactly met, e.g., total weight = 100 kg.",
    explanation: "Equalities are common in conservation or balance situations.",
    hint: "Exactly equal.",
    level: "moderate"
  },
  {
    question: "What is the first question to ask when starting formulation?",
    shortAnswer: "What is the goal? (Maximize or minimize something.)",
    explanation: "The objective sets the direction for the entire model.",
    hint: "What are you trying to achieve?",
    level: "basic"
  },
  {
    question: "What is a 'feasible solution' in the formulation context?",
    shortAnswer: "A set of variable values that satisfy all constraints.",
    explanation: "It's a candidate solution that doesn't violate any rule.",
    hint: "It's allowed.",
    level: "basic"
  },
  {
    question: "How does formulation differ from problem-solving in general?",
    shortAnswer: "Formulation is the modeling phase; solving is the computational phase.",
    explanation: "They are separate but sequential activities.",
    hint: "Model first, solve second.",
    level: "moderate"
  },
  {
    question: "What should you do if you encounter a very large number of variables?",
    shortAnswer: "Look for patterns and use indexing to represent them efficiently.",
    explanation: "In large problems, variables are often indexed, e.g., xᵢ for i=1..n.",
    hint: "Use subscripts.",
    level: "expert"
  },
  {
    question: "What is the role of documentation in LP formulation?",
    shortAnswer: "To record the assumptions, variables, and model structure for future reference.",
    explanation: "Good documentation helps others understand and modify the model.",
    hint: "Write it down.",
    level: "moderate"
  },
  {
    question: "Why is it important to practice formulating LP models?",
    shortAnswer: "Because it's a skill that improves with experience; practice builds intuition.",
    explanation: "The more problems you formulate, the better you become at identifying patterns.",
    hint: "Practice makes perfect.",
    level: "basic"
  }
];

export default questions;