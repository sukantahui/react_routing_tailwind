// topic36_files/topic36_questions.js

const questions = [
  {
    question: "What is a maximization problem in LP?",
    shortAnswer: "A problem where the objective is to find the largest possible value.",
    explanation: "Maximization problems aim to maximize profit, revenue, or other beneficial outcomes.",
    hint: "Make something as big as possible.",
    level: "basic"
  },
  {
    question: "What is a minimization problem in LP?",
    shortAnswer: "A problem where the objective is to find the smallest possible value.",
    explanation: "Minimization problems aim to minimize cost, time, or other undesirable outcomes.",
    hint: "Make something as small as possible.",
    level: "basic"
  },
  {
    question: "What keywords indicate a maximization problem?",
    shortAnswer: "Profit, revenue, maximize, increase, largest, highest, best.",
    explanation: "These words signal that the objective is to maximize something beneficial.",
    hint: "Look for positive outcome words.",
    level: "basic"
  },
  {
    question: "What keywords indicate a minimization problem?",
    shortAnswer: "Cost, expense, minimize, decrease, smallest, cheapest, reduce.",
    explanation: "These words signal that the objective is to minimize something undesirable.",
    hint: "Look for cost or reduction words.",
    level: "basic"
  },
  {
    question: "What type of constraints are common in maximization problems?",
    shortAnswer: "Usually ≤ constraints (resource limits).",
    explanation: "Maximization problems are often about using limited resources efficiently.",
    hint: "At most, no more than.",
    level: "basic"
  },
  {
    question: "What type of constraints are common in minimization problems?",
    shortAnswer: "Usually ≥ constraints (minimum requirements).",
    explanation: "Minimization problems are often about meeting requirements at minimum cost.",
    hint: "At least, no less than.",
    level: "basic"
  },
  {
    question: "Can a minimization problem be converted to a maximization problem?",
    shortAnswer: "Yes, by multiplying the objective function by -1.",
    explanation: "Minimizing f(x) is equivalent to maximizing -f(x).",
    hint: "Multiply by -1.",
    level: "moderate"
  },
  {
    question: "How do you convert a minimization objective to maximization?",
    shortAnswer: "Replace Min Z with Max W = -Z.",
    explanation: "Minimizing Z = c₁x₁ + c₂x₂ is equivalent to maximizing W = -c₁x₁ - c₂x₂.",
    hint: "Flip the sign.",
    level: "moderate"
  },
  {
    question: "What is the relationship between Z_min and W_max?",
    shortAnswer: "Z_min = -W_max.",
    explanation: "The minimum value of Z is the negative of the maximum value of W.",
    hint: "They are negatives.",
    level: "moderate"
  },
  {
    question: "What is a common mistake with maximization vs minimization?",
    shortAnswer: "Using the wrong direction (maximizing when should minimize).",
    explanation: "Using the wrong direction gives the opposite of the desired answer.",
    hint: "Check the objective direction.",
    level: "basic"
  },
  {
    question: "What constraints does a maximization problem typically have?",
    shortAnswer: "Resource constraints (≤) and sometimes minimum requirements.",
    explanation: "Maximization problems are often about allocating limited resources.",
    hint: "≤ for limits.",
    level: "moderate"
  },
  {
    question: "What constraints does a minimization problem typically have?",
    shortAnswer: "Minimum requirements (≥) and sometimes resource limits.",
    explanation: "Minimization problems are often about meeting requirements at minimum cost.",
    hint: "≥ for requirements.",
    level: "moderate"
  },
  {
    question: "What is the optimal solution in a maximization problem?",
    shortAnswer: "The highest corner point of the feasible region.",
    explanation: "In maximization, the optimal solution is at the highest point on the feasible region.",
    hint: "Highest point.",
    level: "moderate"
  },
  {
    question: "What is the optimal solution in a minimization problem?",
    shortAnswer: "The lowest corner point of the feasible region.",
    explanation: "In minimization, the optimal solution is at the lowest point on the feasible region.",
    hint: "Lowest point.",
    level: "moderate"
  },
  {
    question: "How do you check if you should maximize or minimize?",
    shortAnswer: "Check the problem statement for keywords like profit or cost.",
    explanation: "Profit → maximize; cost → minimize.",
    hint: "Look at the goal.",
    level: "basic"
  },
  {
    question: "Can the same problem be formulated as both maximization and minimization?",
    shortAnswer: "Yes, they are duals of each other with appropriate transformations.",
    explanation: "A maximization problem can be transformed into a minimization problem and vice versa.",
    hint: "They are related.",
    level: "expert"
  },
  {
    question: "What is a real-world example of a maximization problem?",
    shortAnswer: "Maximizing profit by choosing production quantities.",
    explanation: "Companies maximize profit with limited resources.",
    hint: "Profit maximization.",
    level: "basic"
  },
  {
    question: "What is a real-world example of a minimization problem?",
    shortAnswer: "Minimizing cost while meeting nutritional requirements.",
    explanation: "Diet problems minimize cost while meeting nutritional needs.",
    hint: "Diet planning.",
    level: "basic"
  },
  {
    question: "What happens if you use maximization when you should use minimization?",
    shortAnswer: "You'll get the wrong answer (the opposite of what you want).",
    explanation: "Maximizing when you should minimize gives the largest, not smallest, value.",
    hint: "Wrong direction.",
    level: "moderate"
  },
  {
    question: "How do you solve a minimization problem using a maximization solver?",
    shortAnswer: "Convert to maximization by multiplying the objective by -1.",
    explanation: "Min f(x) = -Max(-f(x)).",
    hint: "Use the transformation.",
    level: "moderate"
  },
  {
    question: "What is the dual of a maximization problem?",
    shortAnswer: "A minimization problem.",
    explanation: "The dual of a maximization problem is a minimization problem, and vice versa.",
    hint: "Dual is opposite.",
    level: "expert"
  },
  {
    question: "What is the dual of a minimization problem?",
    shortAnswer: "A maximization problem.",
    explanation: "The dual of a minimization problem is a maximization problem.",
    hint: "Dual is opposite.",
    level: "expert"
  },
  {
    question: "What does a negative objective coefficient mean?",
    shortAnswer: "The variable has a negative contribution to the objective.",
    explanation: "In a maximization problem, negative coefficients are undesirable.",
    hint: "Negative contribution.",
    level: "moderate"
  },
  {
    question: "What does a positive objective coefficient mean?",
    shortAnswer: "The variable has a positive contribution to the objective.",
    explanation: "In a maximization problem, positive coefficients are desirable.",
    hint: "Positive contribution.",
    level: "moderate"
  },
  {
    question: "What is the difference between max and min objectives?",
    shortAnswer: "Max looks for the largest value; min looks for the smallest.",
    explanation: "The direction of optimization determines the solution.",
    hint: "Largest vs smallest.",
    level: "basic"
  },
  {
    question: "How do you know if a variable should be maximized or minimized?",
    shortAnswer: "The problem statement tells you the goal.",
    explanation: "Look for keywords that indicate maximization or minimization.",
    hint: "Read the problem.",
    level: "basic"
  },
  {
    question: "What is the significance of the objective direction?",
    shortAnswer: "It determines whether you're looking for the best or the cheapest solution.",
    explanation: "The objective direction defines what 'optimal' means.",
    hint: "It defines 'best'.",
    level: "moderate"
  },
  {
    question: "What is the role of constraints in maximization problems?",
    shortAnswer: "They limit the variables and define the feasible region.",
    explanation: "Constraints in maximization problems often represent resource limits.",
    hint: "They define what's possible.",
    level: "basic"
  },
  {
    question: "What is the role of constraints in minimization problems?",
    shortAnswer: "They define requirements that must be met.",
    explanation: "Constraints in minimization problems often represent minimum requirements.",
    hint: "They define what's needed.",
    level: "basic"
  },
  {
    question: "How do you decide between maximization and minimization?",
    shortAnswer: "Ask: 'What is the decision-maker trying to achieve?'",
    explanation: "If they want to increase something, maximize. If they want to decrease something, minimize.",
    hint: "Ask about the goal.",
    level: "basic"
  }
];

export default questions;