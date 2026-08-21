// topic8_files/topic8_questions.js

const questions = [
  {
    question: "What is the main difference between a simple production problem and a product-mix problem?",
    shortAnswer: "A product-mix problem typically involves more than 2 products and multiple resources.",
    explanation: "Product-mix problems involve deciding the optimal combination of multiple products to produce, constrained by limited resources.",
    hint: "More products, more complexity.",
    level: "basic"
  },
  {
    question: "In the product-mix example, what are the decision variables?",
    shortAnswer: "x₁ = units of Product A, x₂ = units of Product B, x₃ = units of Product C.",
    explanation: "These represent the quantities of each product to be produced, which the company can control.",
    hint: "What is being produced?",
    level: "basic"
  },
  {
    question: "What is the objective function in the product-mix example?",
    shortAnswer: "Maximize Z = 40x₁ + 35x₂ + 50x₃.",
    explanation: "The profit per unit is ₹40 for A, ₹35 for B, and ₹50 for C.",
    hint: "Profit per unit for each product.",
    level: "basic"
  },
  {
    question: "What does the labor constraint represent in the product-mix problem?",
    shortAnswer: "2x₁ + 3x₂ + 4x₃ ≤ 100, meaning total labor hours used cannot exceed 100.",
    explanation: "Each product requires different labor hours: A uses 2, B uses 3, C uses 4 hours per unit.",
    hint: "Resource consumption.",
    level: "basic"
  },
  {
    question: "What does the machine time constraint represent?",
    shortAnswer: "3x₁ + 2x₂ + x₃ ≤ 80, total machine hours cannot exceed 80.",
    explanation: "Product A uses 3 hours, B uses 2 hours, C uses 1 hour per unit.",
    hint: "Machine capacity limit.",
    level: "basic"
  },
  {
    question: "What does the material constraint represent?",
    shortAnswer: "4x₁ + 2x₂ + 3x₃ ≤ 120, total raw material cannot exceed 120 kg.",
    explanation: "Product A uses 4 kg, B uses 2 kg, C uses 3 kg per unit.",
    hint: "Raw material limit.",
    level: "basic"
  },
  {
    question: "How many decision variables are there in the product-mix example?",
    shortAnswer: "3 variables: x₁, x₂, x₃.",
    explanation: "One for each product: Product A, B, and C.",
    hint: "Count the products.",
    level: "basic"
  },
  {
    question: "How many constraints are there in the product-mix example (excluding non-negativity)?",
    shortAnswer: "3 constraints: Labor, Machine, Material.",
    explanation: "Each resource has one constraint limiting its usage.",
    hint: "Count the resources.",
    level: "basic"
  },
  {
    question: "What does it mean if a variable is zero in the optimal solution?",
    shortAnswer: "It means the product should not be produced in the optimal mix.",
    explanation: "If x₁ = 0, Product A is not profitable enough to produce given the resource constraints.",
    hint: "Zero production means not worth producing.",
    level: "moderate"
  },
  {
    question: "How would you validate the solution x₁ = 0, x₂ = 0, x₃ = 25?",
    shortAnswer: "Check: Labor = 4(25)=100 ≤ 100 ✓, Machine = 1(25)=25 ≤ 80 ✓, Material = 3(25)=75 ≤ 120 ✓.",
    explanation: "All constraints are satisfied, so it's a feasible solution.",
    hint: "Test each constraint.",
    level: "moderate"
  },
  {
    question: "What is the economic interpretation of a binding constraint?",
    shortAnswer: "A resource that is fully used at the optimal solution, indicating it is scarce.",
    explanation: "Binding constraints have shadow prices that show the value of additional units.",
    hint: "Fully utilized resource.",
    level: "expert"
  },
  {
    question: "Why might a product not be produced in the optimal product-mix?",
    shortAnswer: "Because its profit margin relative to resource consumption is too low.",
    explanation: "If a product uses scarce resources but doesn't generate enough profit, it may be excluded.",
    hint: "Not profitable enough.",
    level: "moderate"
  },
  {
    question: "How does adding a fourth product affect the product-mix model?",
    shortAnswer: "It adds a new decision variable and terms to the objective and constraints.",
    explanation: "The model structure remains the same; only the number of variables grows.",
    hint: "More products = more variables.",
    level: "moderate"
  },
  {
    question: "What is the purpose of the 'Subject to' phrase in the LP model?",
    shortAnswer: "It introduces the constraints that the variables must satisfy.",
    explanation: "It separates the objective from the constraints in the mathematical statement.",
    hint: "It means 'under these conditions'.",
    level: "basic"
  },
  {
    question: "In the product-mix example, what are the units of the RHS values?",
    shortAnswer: "Hours for labor and machine, kilograms for material.",
    explanation: "Labor = 100 hours, Machine = 80 hours, Material = 120 kg.",
    hint: "Check the units in the problem.",
    level: "basic"
  },
  {
    question: "What assumption is made about the production process in product-mix problems?",
    shortAnswer: "That the relationships are linear and additive.",
    explanation: "The total resource usage is the sum of individual product usage; no economies of scale.",
    hint: "Linear relationships only.",
    level: "moderate"
  },
  {
    question: "If profit per unit of Product C increases to ₹70, how does the model change?",
    shortAnswer: "The objective function coefficient for x₃ changes: Z = 40x₁ + 35x₂ + 70x₃.",
    explanation: "The constraints remain the same; only the objective changes.",
    hint: "Profit change affects objective.",
    level: "moderate"
  },
  {
    question: "What is the difference between a product-mix problem and a production planning problem?",
    shortAnswer: "Product-mix focuses on which products to produce; production planning includes timing and sequencing.",
    explanation: "Product-mix is about allocation of resources across products in a single period.",
    hint: "What vs when.",
    level: "expert"
  },
  {
    question: "How would you handle a minimum production requirement for Product A in the product-mix model?",
    shortAnswer: "Add a constraint: x₁ ≥ minimum required.",
    explanation: "This forces the production of Product A to meet at least the minimum demand.",
    hint: "Minimum requirement = ≥ constraint.",
    level: "moderate"
  },
  {
    question: "What is the role of non-negativity in the product-mix problem?",
    shortAnswer: "To ensure production quantities are non-negative (can't produce negative units).",
    explanation: "All production quantities must be ≥ 0 for physical feasibility.",
    hint: "No negative production.",
    level: "basic"
  },
  {
    question: "If a constraint is redundant in the product-mix problem, what does that mean?",
    shortAnswer: "It does not affect the feasible region or the optimal solution.",
    explanation: "Redundant constraints are always satisfied when other constraints are met.",
    hint: "It adds no restriction.",
    level: "expert"
  },
  {
    question: "What is the objective function value if x₁ = 10, x₂ = 15, x₃ = 10?",
    shortAnswer: "Z = 40(10) + 35(15) + 50(10) = 400 + 525 + 500 = ₹1,425.",
    explanation: "Calculate the total profit for this production mix.",
    hint: "Sum the profit contributions.",
    level: "moderate"
  },
  {
    question: "Why do product-mix problems often use three or more products?",
    shortAnswer: "Because real-world companies typically produce multiple products.",
    explanation: "Two-product problems are useful for teaching, but real companies often have many products.",
    hint: "Real businesses have many products.",
    level: "moderate"
  },
  {
    question: "What does it mean if a product has a negative contribution margin?",
    shortAnswer: "It loses money per unit and should not be produced.",
    explanation: "If the cost exceeds the price, the product is unprofitable.",
    hint: "Losing money per unit.",
    level: "moderate"
  },
  {
    question: "How would the product-mix model change if there is a budget constraint?",
    shortAnswer: "Add a new constraint: c₁x₁ + c₂x₂ + c₃x₃ ≤ Budget.",
    explanation: "This limits total production cost to the available budget.",
    hint: "Add a cost constraint.",
    level: "moderate"
  },
  {
    question: "What is the main goal of a product-mix problem?",
    shortAnswer: "To determine the optimal quantity of each product to maximize profit or minimize cost.",
    explanation: "The goal is to find the best mix of products given limited resources.",
    hint: "Best combination of products.",
    level: "basic"
  },
  {
    question: "What is the significance of the coefficients in the constraints?",
    shortAnswer: "They represent the amount of each resource consumed by one unit of each product.",
    explanation: "For example, 2 in the labor constraint for Product A means 2 hours of labor per unit.",
    hint: "Resource usage per unit.",
    level: "moderate"
  },
  {
    question: "How can you determine if a product-mix solution is feasible?",
    shortAnswer: "Check that all constraints are satisfied and all variables are ≥ 0.",
    explanation: "A feasible solution meets all resource limits and non-negativity.",
    hint: "All constraints must be satisfied.",
    level: "basic"
  },
  {
    question: "What is the difference between a product-mix problem and a resource allocation problem?",
    shortAnswer: "They are essentially the same; product-mix focuses on products, resource allocation focuses on resources.",
    explanation: "Both involve allocating limited resources to competing activities.",
    hint: "Same concept, different perspective.",
    level: "moderate"
  },
  {
    question: "Why is the product-mix problem important in business operations?",
    shortAnswer: "It helps companies make optimal production decisions to maximize profitability.",
    explanation: "Companies use product-mix analysis to decide what to produce with limited resources.",
    hint: "Maximize profit with limited resources.",
    level: "moderate"
  }
];

export default questions;