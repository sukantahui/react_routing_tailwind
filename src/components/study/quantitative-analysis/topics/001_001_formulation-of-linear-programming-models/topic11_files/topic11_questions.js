// topic11_files/topic11_questions.js

const questions = [
  {
    question: "What is the main focus of Topic 11's worked example?",
    shortAnswer: "Labour and machine-hour constraints in production planning.",
    explanation: "The example focuses on two critical resources: labour hours and machine hours, which commonly constrain production capacity.",
    hint: "Two key resources in manufacturing.",
    level: "basic"
  },
  {
    question: "In the labour and machine-hour example, what are the decision variables?",
    shortAnswer: "x₁ = units of Product A, x₂ = units of Product B.",
    explanation: "These represent the quantities of each product to be produced.",
    hint: "Two products, two variables.",
    level: "basic"
  },
  {
    question: "What is the objective function in the labour and machine-hour example?",
    shortAnswer: "Maximize Z = 50x₁ + 60x₂.",
    explanation: "Product A gives ₹50 profit per unit, Product B gives ₹60 profit per unit.",
    hint: "Profit per unit for each product.",
    level: "basic"
  },
  {
    question: "What does the labour constraint represent?",
    shortAnswer: "2x₁ + 4x₂ ≤ 100, total labour hours cannot exceed 100.",
    explanation: "Product A uses 2 hours per unit, Product B uses 4 hours per unit.",
    hint: "Labour capacity limit.",
    level: "basic"
  },
  {
    question: "What does the machine-hour constraint represent?",
    shortAnswer: "3x₁ + 2x₂ ≤ 80, total machine hours cannot exceed 80.",
    explanation: "Product A uses 3 hours per unit, Product B uses 2 hours per unit.",
    hint: "Machine capacity limit.",
    level: "basic"
  },
  {
    question: "What does the demand constraint x₁ ≥ 10 mean?",
    shortAnswer: "At least 10 units of Product A must be produced.",
    explanation: "This is a minimum production requirement based on market demand.",
    hint: "Minimum requirement for Product A.",
    level: "basic"
  },
  {
    question: "What is the optimal solution for the labour and machine-hour example?",
    shortAnswer: "x₁ = 10, x₂ = 20 with profit = ₹1,700.",
    explanation: "Produce 10 units of Product A and 20 units of Product B.",
    hint: "The best production mix.",
    level: "moderate"
  },
  {
    question: "Which constraint is binding at the optimal solution?",
    shortAnswer: "Labour is binding (fully used); Machine has slack.",
    explanation: "Labour: 2(10) + 4(20) = 100 hrs (fully used). Machine: 3(10) + 2(20) = 70 hrs (slack: 10 hrs).",
    hint: "Check which resource is fully used.",
    level: "moderate"
  },
  {
    question: "What is the slack in the machine constraint at the optimum?",
    shortAnswer: "10 hours (80 - 70 = 10).",
    explanation: "Machine used = 3(10) + 2(20) = 30 + 40 = 70 hours.",
    hint: "Unused machine capacity.",
    level: "moderate"
  },
  {
    question: "What is the profit at the optimal solution?",
    shortAnswer: "₹1,700.",
    explanation: "Z = 50(10) + 60(20) = 500 + 1,200 = 1,700.",
    hint: "Maximum profit value.",
    level: "basic"
  },
  {
    question: "Why does Product A get produced at the minimum level (10 units)?",
    shortAnswer: "Because Product B has higher profit per unit and uses resources efficiently.",
    explanation: "Product B gives ₹60 profit vs ₹50 for A, so the company prefers B but must meet the minimum demand for A.",
    hint: "Product B is more profitable.",
    level: "moderate"
  },
  {
    question: "What is the labour usage per unit of Product A?",
    shortAnswer: "2 hours.",
    explanation: "Each unit of Product A requires 2 hours of labour.",
    hint: "Labour requirement for A.",
    level: "basic"
  },
  {
    question: "What is the labour usage per unit of Product B?",
    shortAnswer: "4 hours.",
    explanation: "Each unit of Product B requires 4 hours of labour.",
    hint: "Labour requirement for B.",
    level: "basic"
  },
  {
    question: "What is the machine usage per unit of Product A?",
    shortAnswer: "3 hours.",
    explanation: "Each unit of Product A requires 3 hours of machine time.",
    hint: "Machine requirement for A.",
    level: "basic"
  },
  {
    question: "What is the machine usage per unit of Product B?",
    shortAnswer: "2 hours.",
    explanation: "Each unit of Product B requires 2 hours of machine time.",
    hint: "Machine requirement for B.",
    level: "basic"
  },
  {
    question: "How do you determine if a resource is binding?",
    shortAnswer: "If the resource is fully used at the optimal solution, it is binding.",
    explanation: "Binding resources have no slack and limit further improvement.",
    hint: "Fully used resource.",
    level: "moderate"
  },
  {
    question: "What happens if labour hours increase to 120?",
    shortAnswer: "The feasible region expands and the optimal solution may change.",
    explanation: "More labour capacity could allow more production and higher profit.",
    hint: "More labour = more capacity.",
    level: "expert"
  },
  {
    question: "What happens if machine hours increase to 90?",
    shortAnswer: "The machine constraint relaxes, but since machine has slack, the optimal solution may not change.",
    explanation: "If a resource has slack, increasing it further doesn't improve the solution.",
    hint: "Slack resources aren't limiting.",
    level: "expert"
  },
  {
    question: "What is the role of the demand constraint in this example?",
    shortAnswer: "It forces production of at least 10 units of Product A.",
    explanation: "Without this constraint, the company might produce zero units of A.",
    hint: "Minimum requirement.",
    level: "moderate"
  },
  {
    question: "How would the solution change if the demand for Product A increased to 15?",
    shortAnswer: "The optimal solution would shift to x₁ = 15 and some lower x₂, reducing total profit.",
    explanation: "More A means less B, which lowers profit since B is more profitable.",
    hint: "Higher demand for less profitable product.",
    level: "expert"
  },
  {
    question: "What is the difference between labour and machine-hour constraints?",
    shortAnswer: "Labour constraints limit workforce hours; machine-hour constraints limit equipment time.",
    explanation: "Both are resource constraints but represent different production factors.",
    hint: "Workers vs equipment.",
    level: "basic"
  },
  {
    question: "Why are labour and machine-hour constraints important in manufacturing?",
    shortAnswer: "They represent the two most common and critical capacity limitations.",
    explanation: "Labour and machine time determine how much can be produced.",
    hint: "Key capacity factors.",
    level: "moderate"
  },
  {
    question: "What is a common mistake with labour and machine-hour constraints?",
    shortAnswer: "Confusing the coefficients (which product uses which resource).",
    explanation: "Product A uses 2 labour and 3 machine; Product B uses 4 labour and 2 machine—mixing these up leads to incorrect models.",
    hint: "Check resource usage carefully.",
    level: "moderate"
  },
  {
    question: "How do you write a constraint for 'at most 100 labour hours'?",
    shortAnswer: "2x₁ + 4x₂ ≤ 100.",
    explanation: "Use ≤ for capacity limits.",
    hint: "≤ for at most.",
    level: "basic"
  },
  {
    question: "How do you write a constraint for 'at least 10 units of Product A'?",
    shortAnswer: "x₁ ≥ 10.",
    explanation: "Use ≥ for minimum requirements.",
    hint: "≥ for at least.",
    level: "basic"
  },
  {
    question: "What is the economic interpretation of labour being binding?",
    shortAnswer: "Labour is the scarce resource limiting production; additional labour would increase profit.",
    explanation: "The shadow price of labour is positive, indicating its value.",
    hint: "Labour is the bottleneck.",
    level: "expert"
  },
  {
    question: "What is the economic interpretation of machine having slack?",
    shortAnswer: "Machine time is not limiting production; additional machine time would not increase profit.",
    explanation: "The shadow price of machine time is zero, indicating no value.",
    hint: "Machine is not the bottleneck.",
    level: "expert"
  },
  {
    question: "How does the graphical method help with labour and machine-hour problems?",
    shortAnswer: "It visualizes the feasible region and helps identify the optimal corner point.",
    explanation: "For 2-variable problems, the graphical method is intuitive and educational.",
    hint: "Visual representation helps.",
    level: "moderate"
  },
  {
    question: "What are the corner points of the feasible region in this example?",
    shortAnswer: "(10,0), (10,20), (20,10), (26.67,0).",
    explanation: "These are the vertices of the feasible polygon.",
    hint: "Intersection points.",
    level: "moderate"
  },
  {
    question: "Why is the demand constraint binding at the minimum (x₁ = 10)?",
    shortAnswer: "Because Product B is more profitable, the company wants to produce as much B as possible, so A is produced at the minimum required.",
    explanation: "The demand constraint forces production of A, but the company prefers B.",
    hint: "B is preferred over A.",
    level: "moderate"
  },
  {
    question: "What is the total profit if only Product B is produced (x₁ = 0, x₂ = 25)?",
    shortAnswer: "Z = 60(25) = ₹1,500 (but this violates demand constraint x₁ ≥ 10).",
    explanation: "If there were no demand constraint, the company would produce only B.",
    hint: "But demand constraint prevents this.",
    level: "moderate"
  }
];

export default questions;