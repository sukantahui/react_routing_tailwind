// topic34_files/topic34_questions.js

const questions = [
  {
    question: "Why is it important to check a formulated LP model?",
    shortAnswer: "To catch errors before solving and ensure the model represents the real problem.",
    explanation: "Checking prevents costly mistakes, builds confidence, and saves time.",
    hint: "Catch errors early.",
    level: "basic"
  },
  {
    question: "What is the first thing to check in an LP model?",
    shortAnswer: "Check that all decision variables are clearly defined with units.",
    explanation: "Variables are the foundation of the model; they must be defined correctly.",
    hint: "Start with variables.",
    level: "basic"
  },
  {
    question: "What should you check about the objective function?",
    shortAnswer: "Check that it's clearly stated (Max/Min), includes all variables, and has correct coefficients.",
    explanation: "The objective defines the goal; errors here invalidate the solution.",
    hint: "Check the goal.",
    level: "basic"
  },
  {
    question: "What should you check about constraints?",
    shortAnswer: "Check that all constraints are included, coefficients are correct, and inequality direction is right.",
    explanation: "Constraints define the feasible region; errors here make the model wrong.",
    hint: "Check the rules.",
    level: "basic"
  },
  {
    question: "What is dimensional analysis in LP checking?",
    shortAnswer: "Checking that all terms in each equation have consistent units.",
    explanation: "Dimensional analysis ensures the model is physically meaningful.",
    hint: "Check units.",
    level: "moderate"
  },
  {
    question: "What is a common error in LP models?",
    shortAnswer: "Missing a constraint or using the wrong inequality direction.",
    explanation: "These are the most frequent mistakes in LP formulation.",
    hint: "Check constraints carefully.",
    level: "basic"
  },
  {
    question: "How do you test if a model is feasible?",
    shortAnswer: "Try to find a simple feasible solution that satisfies all constraints.",
    explanation: "If you can find one, the model has at least one feasible solution.",
    hint: "Find a feasible solution.",
    level: "moderate"
  },
  {
    question: "What is the purpose of testing with extreme solutions?",
    shortAnswer: "To check if the model behaves logically at the bounds.",
    explanation: "Testing variables at their bounds (0, max) can reveal errors.",
    hint: "Test at extremes.",
    level: "moderate"
  },
  {
    question: "What is a sign of inconsistent units in an LP model?",
    shortAnswer: "Terms that represent different quantities are added together.",
    explanation: "If you're adding hours to kilograms, something is wrong.",
    hint: "Units must match.",
    level: "moderate"
  },
  {
    question: "What should you check about variable names?",
    shortAnswer: "Check that variable names are used consistently throughout the model.",
    explanation: "Inconsistent naming leads to confusion and errors.",
    hint: "Use consistent names.",
    level: "basic"
  },
  {
    question: "How do you check if the objective direction is correct?",
    shortAnswer: "Verify that 'Maximize' or 'Minimize' matches the problem statement.",
    explanation: "Maximizing when you should minimize leads to the wrong answer.",
    hint: "Check Max vs Min.",
    level: "basic"
  },
  {
    question: "What is a common mistake with non-negativity?",
    shortAnswer: "Forgetting to include non-negativity constraints.",
    explanation: "Non-negativity is required for most LP variables.",
    hint: "Don't forget ≥ 0.",
    level: "basic"
  },
  {
    question: "What is the value of peer review in LP checking?",
    shortAnswer: "Another person may spot errors you missed.",
    explanation: "Fresh eyes can catch assumptions and mistakes you're blind to.",
    hint: "Get a second opinion.",
    level: "moderate"
  },
  {
    question: "What is the first step in checking an LP model?",
    shortAnswer: "Read the original problem again and compare with the model.",
    explanation: "Make sure the model matches the problem statement.",
    hint: "Re-read the problem.",
    level: "basic"
  },
  {
    question: "How do you check if constraints are correctly formulated?",
    shortAnswer: "Check each constraint against the problem statement and verify units.",
    explanation: "Each constraint should correspond to a limitation or requirement in the problem.",
    hint: "Match constraints to problem.",
    level: "moderate"
  },
  {
    question: "What does it mean if a model has no feasible solution?",
    shortAnswer: "The constraints are contradictory; no solution satisfies all constraints.",
    explanation: "An infeasible model means the problem has no solution.",
    hint: "Contradictory constraints.",
    level: "moderate"
  },
  {
    question: "What is a sign of a non-linear term in an LP model?",
    shortAnswer: "A term like x₁², x₁x₂, or 1/x₁ in the objective or constraints.",
    explanation: "LP requires linearity; non-linear terms need different methods.",
    hint: "Check for squares or products.",
    level: "moderate"
  },
  {
    question: "How do you check coefficient values in constraints?",
    shortAnswer: "Verify each coefficient against the problem's resource usage data.",
    explanation: "A wrong coefficient changes the feasible region.",
    hint: "Check resource usage.",
    level: "moderate"
  },
  {
    question: "What is the benefit of checking with a simple solution?",
    shortAnswer: "It quickly verifies that all constraints can be satisfied.",
    explanation: "If you can't find a simple solution, the model may be infeasible.",
    hint: "Test with simple numbers.",
    level: "moderate"
  },
  {
    question: "What should you document when checking a model?",
    shortAnswer: "Document assumptions, variable definitions, and any changes made.",
    explanation: "Documentation helps others understand the model.",
    hint: "Write it down.",
    level: "basic"
  },
  {
    question: "How do you check if the objective function is linear?",
    shortAnswer: "Check that variables appear only to the first power and are not multiplied together.",
    explanation: "LP requires linearity; x² or xy are not allowed.",
    hint: "Check for linearity.",
    level: "moderate"
  },
  {
    question: "What is a common cause of infeasibility?",
    shortAnswer: "Contradictory constraints like x ≥ 10 and x ≤ 5.",
    explanation: "If constraints conflict, no solution exists.",
    hint: "Conflicting requirements.",
    level: "moderate"
  },
  {
    question: "How do you check if variables are correctly defined?",
    shortAnswer: "Verify that each variable has a clear meaning and units.",
    explanation: "Vague definitions lead to confusion and errors.",
    hint: "Be explicit.",
    level: "basic"
  },
  {
    question: "What is the role of sensitivity analysis in checking?",
    shortAnswer: "Sensitivity analysis helps understand how changes affect the solution.",
    explanation: "If small changes cause large changes, the model may be unstable.",
    hint: "Test robustness.",
    level: "expert"
  },
  {
    question: "How do you check if the model is complete?",
    shortAnswer: "Ensure all decisions, resources, and requirements are captured.",
    explanation: "A complete model has no missing variables or constraints.",
    hint: "Check completeness.",
    level: "moderate"
  },
  {
    question: "What is a sign of an unbounded model?",
    shortAnswer: "Variables can increase indefinitely without violating constraints.",
    explanation: "If a variable has no upper bound, the model may be unbounded.",
    hint: "No upper limit.",
    level: "expert"
  },
  {
    question: "How do you check the RHS values in constraints?",
    shortAnswer: "Verify that RHS values match the available resources or requirements.",
    explanation: "A wrong RHS changes the feasible region.",
    hint: "Check the limits.",
    level: "moderate"
  },
  {
    question: "What is the difference between validation and verification?",
    shortAnswer: "Verification checks the model is built correctly; validation checks it represents the real problem.",
    explanation: "Both are needed for a correct LP model.",
    hint: "Built right vs right problem.",
    level: "expert"
  },
  {
    question: "How do you check if the objective value makes sense?",
    shortAnswer: "Test with a feasible solution and see if the objective value is reasonable.",
    explanation: "If the objective value is extreme, there may be an error.",
    hint: "Check reasonableness.",
    level: "moderate"
  },
  {
    question: "What is the final step in checking an LP model?",
    shortAnswer: "Review the entire model with a fresh perspective.",
    explanation: "After checking all components, step back and review the whole model.",
    hint: "Review the whole thing.",
    level: "basic"
  }
];

export default questions;