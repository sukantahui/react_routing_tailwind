// topic18_files/topic18_questions.js

const questions = [
  {
    question: "What is the goal of a workforce allocation problem?",
    shortAnswer: "To assign workers to shifts or tasks to minimize cost or maximize efficiency.",
    explanation: "Workforce allocation problems aim to meet staffing requirements at the lowest cost, considering worker availability and skill sets.",
    hint: "Minimize cost, meet staffing needs.",
    level: "basic"
  },
  {
    question: "In the workforce allocation example, what are the decision variables?",
    shortAnswer: "x₁ = full-time Morning, x₂ = full-time Evening, x₃ = full-time Night, x₄ = part-time Morning, x₅ = part-time Evening.",
    explanation: "These represent the number of each worker type assigned to each shift.",
    hint: "Two worker types × three shifts (but part-time limited).",
    level: "basic"
  },
  {
    question: "What is the objective function in the workforce allocation example?",
    shortAnswer: "Minimize Z = 1200(x₁ + x₂ + x₃) + 800(x₄ + x₅).",
    explanation: "Full-time costs ₹1,200 per shift, part-time costs ₹800 per shift.",
    hint: "Cost per shift for each worker type.",
    level: "moderate"
  },
  {
    question: "What does the Morning staffing constraint represent?",
    shortAnswer: "x₁ + x₄ ≥ 8.",
    explanation: "Morning shift requires at least 8 workers total from full-time and part-time.",
    hint: "Minimum morning staff.",
    level: "basic"
  },
  {
    question: "What does the Evening staffing constraint represent?",
    shortAnswer: "x₂ + x₅ ≥ 6.",
    explanation: "Evening shift requires at least 6 workers total from full-time and part-time.",
    hint: "Minimum evening staff.",
    level: "basic"
  },
  {
    question: "What does the Night staffing constraint represent?",
    shortAnswer: "x₃ ≥ 4.",
    explanation: "Night shift requires at least 4 workers, and only full-time can work Night.",
    hint: "Night shift minimum.",
    level: "basic"
  },
  {
    question: "What does the Full-time availability constraint represent?",
    shortAnswer: "x₁ + x₂ + x₃ ≤ 10.",
    explanation: "Total full-time workers assigned cannot exceed 10.",
    hint: "Maximum full-time workers.",
    level: "basic"
  },
  {
    question: "What does the Part-time availability constraint represent?",
    shortAnswer: "x₄ + x₅ ≤ 8.",
    explanation: "Total part-time workers assigned cannot exceed 8.",
    hint: "Maximum part-time workers.",
    level: "basic"
  },
  {
    question: "What is the optimal solution for the workforce allocation example?",
    shortAnswer: "Multiple optimal solutions exist; one is x₁=0, x₂=6, x₃=4, x₄=8, x₅=0.",
    explanation: "This uses all workers: 10 full-time (6 Evening + 4 Night) and 8 part-time (all Morning).",
    hint: "Optimal allocation.",
    level: "moderate"
  },
  {
    question: "What is the total cost at the optimal solution?",
    shortAnswer: "₹18,400.",
    explanation: "Cost = 10 × 1,200 + 8 × 800 = 12,000 + 6,400 = 18,400.",
    hint: "Minimum cost.",
    level: "moderate"
  },
  {
    question: "Why are there multiple optimal solutions?",
    shortAnswer: "Because Morning and Evening demands can be met by different combinations of full-time and part-time workers.",
    explanation: "As long as full-time total = 10 and part-time total = 8, and Morning/Evening staffing met, cost is same.",
    hint: "Flexibility in assignment.",
    level: "moderate"
  },
  {
    question: "What is the cost per full-time worker per shift?",
    shortAnswer: "₹1,200.",
    explanation: "Full-time workers cost ₹1,200 per shift.",
    hint: "Full-time cost.",
    level: "basic"
  },
  {
    question: "What is the cost per part-time worker per shift?",
    shortAnswer: "₹800.",
    explanation: "Part-time workers cost ₹800 per shift.",
    hint: "Part-time cost.",
    level: "basic"
  },
  {
    question: "Why can't part-time workers work Night shift?",
    shortAnswer: "The problem states part-time workers can only work Morning and Evening.",
    explanation: "This is a constraint given in the problem.",
    hint: "Part-time limitations.",
    level: "basic"
  },
  {
    question: "What is the minimum total number of workers needed to meet all shifts?",
    shortAnswer: "At least 8 Morning + 6 Evening + 4 Night = 18 worker-shifts.",
    explanation: "But because some workers can work multiple shifts? No, each worker works one shift per day, so total worker-shifts = 18.",
    hint: "Sum of minimum requirements.",
    level: "moderate"
  },
  {
    question: "What is the total number of available workers?",
    shortAnswer: "10 full-time + 8 part-time = 18 workers.",
    explanation: "Total available = 18, exactly matching the total shift demand.",
    hint: "Supply equals demand.",
    level: "basic"
  },
  {
    question: "What is a common mistake in workforce allocation problems?",
    shortAnswer: "Forgetting that workers can only work one shift per day.",
    explanation: "Each worker is assigned to one shift; you cannot double-count a worker across shifts.",
    hint: "One shift per worker.",
    level: "moderate"
  },
  {
    question: "If a worker can work multiple shifts, how would the model change?",
    shortAnswer: "Variables would represent worker-shift assignments, but a worker could be assigned multiple shifts with overtime constraints.",
    explanation: "The model would need to track total hours or shifts per worker.",
    hint: "Overtime considerations.",
    level: "expert"
  },
  {
    question: "What is the role of non-negativity in workforce allocation?",
    shortAnswer: "To ensure worker assignments are non-negative.",
    explanation: "You cannot assign negative workers to a shift.",
    hint: "No negative assignments.",
    level: "basic"
  },
  {
    question: "If full-time workers cost ₹1,500 instead of ₹1,200, what happens?",
    shortAnswer: "The optimal solution shifts toward using more part-time workers, if possible.",
    explanation: "Part-time workers become more cost-effective, so the company would use them more.",
    hint: "Cost change affects allocation.",
    level: "expert"
  },
  {
    question: "What is the purpose of minimum staffing requirements?",
    shortAnswer: "To ensure adequate service levels during each shift.",
    explanation: "Minimum requirements reflect demand for services or production needs.",
    hint: "Service level requirements.",
    level: "moderate"
  },
  {
    question: "If part-time availability increases to 10, what happens?",
    shortAnswer: "The company can use more part-time workers and reduce cost.",
    explanation: "More part-time workers means more coverage of Morning/Evening shifts, reducing full-time usage.",
    hint: "More part-time = lower cost.",
    level: "expert"
  },
  {
    question: "What is the total cost if all shifts are covered by full-time workers only?",
    shortAnswer: "18 × 1,200 = ₹21,600.",
    explanation: "Need 18 workers, all full-time at ₹1,200 each.",
    hint: "All full-time cost.",
    level: "moderate"
  },
  {
    question: "What is the total cost if all shifts are covered by part-time workers (where possible)?",
    shortAnswer: "Not feasible because Night shift requires full-time. If we ignore Night, Morning+Evening=14 × 800 = 11,200, plus Night 4 × 1,200 = 4,800 total = 16,000, but part-time availability is only 8, so infeasible.",
    explanation: "Part-time workers cannot cover Night, and there aren't enough part-time for Morning+Evening.",
    hint: "Part-time limitations.",
    level: "expert"
  },
  {
    question: "What is the feasible region in workforce allocation?",
    shortAnswer: "The set of assignments that meet all staffing requirements and availability.",
    explanation: "Feasible solutions satisfy all constraints.",
    hint: "All constraints satisfied.",
    level: "moderate"
  },
  {
    question: "How do you formulate a workforce allocation problem as an LP?",
    shortAnswer: "Define variables for each worker type and shift, objective to minimize cost, constraints for staffing requirements and worker availability.",
    explanation: "The structure is similar to resource allocation.",
    hint: "Variables, objective, constraints.",
    level: "moderate"
  },
  {
    question: "What is the economic interpretation of the optimal solution?",
    shortAnswer: "Use cheaper part-time workers as much as possible, but full-time are needed for Night and to fill gaps.",
    explanation: "The optimal mix balances cost and availability.",
    hint: "Cost vs availability.",
    level: "moderate"
  },
  {
    question: "If the Night shift requirement increases to 5, what happens?",
    shortAnswer: "More full-time workers needed for Night, potentially increasing total cost.",
    explanation: "Night shift must be covered by full-time, so more full-time workers required.",
    hint: "Higher Night demand = more full-time.",
    level: "expert"
  },
  {
    question: "What is the difference between workforce allocation and production planning?",
    shortAnswer: "Workforce allocation assigns people to tasks; production planning allocates resources to products.",
    explanation: "Both are resource allocation problems but different contexts.",
    hint: "People vs materials.",
    level: "moderate"
  },
  {
    question: "Why might a company prefer to have multiple optimal solutions?",
    shortAnswer: "It provides flexibility in scheduling and accommodating worker preferences.",
    explanation: "Multiple solutions allow management to consider other factors like worker preferences or training.",
    hint: "Flexibility.",
    level: "moderate"
  }
];

export default questions;