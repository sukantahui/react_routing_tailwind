// topic12_files/topic12_questions.js

const questions = [
  {
    question: "What is the focus of Topic 12's worked example?",
    shortAnswer: "Raw-material constraints in production planning.",
    explanation: "The example focuses on how limited raw materials constrain production and affect the optimal product mix.",
    hint: "Materials as production constraints.",
    level: "basic"
  },
  {
    question: "In the raw-material example, what are the decision variables?",
    shortAnswer: "x₁ = units of Product P, x₂ = units of Product Q.",
    explanation: "These represent the quantities of each product to be produced.",
    hint: "Two products, two variables.",
    level: "basic"
  },
  {
    question: "What is the objective function in the raw-material example?",
    shortAnswer: "Maximize Z = 120x₁ + 100x₂.",
    explanation: "Product P gives ₹120 profit per unit, Product Q gives ₹100 profit per unit.",
    hint: "Profit per unit for each product.",
    level: "basic"
  },
  {
    question: "How many raw material constraints are in the example?",
    shortAnswer: "3 constraints: Material X, Material Y, and Material Z.",
    explanation: "Each material has its own availability limit.",
    hint: "Count the materials.",
    level: "basic"
  },
  {
    question: "What does the Material X constraint represent?",
    shortAnswer: "3x₁ + 2x₂ ≤ 180, total Material X cannot exceed 180 kg.",
    explanation: "Product P uses 3 kg per unit, Product Q uses 2 kg per unit.",
    hint: "Material X availability limit.",
    level: "basic"
  },
  {
    question: "What does the Material Y constraint represent?",
    shortAnswer: "2x₁ + 4x₂ ≤ 160, total Material Y cannot exceed 160 kg.",
    explanation: "Product P uses 2 kg per unit, Product Q uses 4 kg per unit.",
    hint: "Material Y availability limit.",
    level: "basic"
  },
  {
    question: "What does the Material Z constraint represent?",
    shortAnswer: "x₁ + 3x₂ ≤ 120, total Material Z cannot exceed 120 kg.",
    explanation: "Product P uses 1 kg per unit, Product Q uses 3 kg per unit.",
    hint: "Material Z availability limit.",
    level: "basic"
  },
  {
    question: "What is the optimal solution for the raw-material example?",
    shortAnswer: "x₁ = 50, x₂ = 15 with profit = ₹7,500.",
    explanation: "Produce 50 units of Product P and 15 units of Product Q.",
    hint: "The best product mix.",
    level: "moderate"
  },
  {
    question: "Which constraints are binding at the optimal solution?",
    shortAnswer: "Material X and Material Y are binding; Material Z has slack.",
    explanation: "Material X: 3(50)+2(15)=180 kg (fully used). Material Y: 2(50)+4(15)=160 kg (fully used). Material Z: 1(50)+3(15)=95 kg (slack: 25 kg).",
    hint: "Check which materials are fully used.",
    level: "moderate"
  },
  {
    question: "What is the slack in the Material Z constraint at the optimum?",
    shortAnswer: "25 kg (120 - 95 = 25).",
    explanation: "Material Z used = 1(50) + 3(15) = 50 + 45 = 95 kg.",
    hint: "Unused material capacity.",
    level: "moderate"
  },
  {
    question: "What is the profit at the optimal solution?",
    shortAnswer: "₹7,500.",
    explanation: "Z = 120(50) + 100(15) = 6,000 + 1,500 = 7,500.",
    hint: "Maximum profit value.",
    level: "basic"
  },
  {
    question: "What is the material usage of Product P for Material X?",
    shortAnswer: "3 kg per unit.",
    explanation: "Each unit of Product P requires 3 kg of Material X.",
    hint: "Material X requirement for P.",
    level: "basic"
  },
  {
    question: "What is the material usage of Product Q for Material Y?",
    shortAnswer: "4 kg per unit.",
    explanation: "Each unit of Product Q requires 4 kg of Material Y.",
    hint: "Material Y requirement for Q.",
    level: "basic"
  },
  {
    question: "What are the corner points of the feasible region in this example?",
    shortAnswer: "(0,0), (0,40), (50,15), (60,0).",
    explanation: "These are the vertices of the feasible polygon.",
    hint: "Intersection points of constraints.",
    level: "moderate"
  },
  {
    question: "How do you find the intersection of Material X and Material Y constraints?",
    shortAnswer: "Solve the system: 3x₁+2x₂=180 and 2x₁+4x₂=160.",
    explanation: "Solving gives x₁ = 50, x₂ = 15.",
    hint: "Solve the two equations.",
    level: "moderate"
  },
  {
    question: "What does it mean if a material constraint has slack at the optimum?",
    shortAnswer: "The material is not fully used; it's not limiting production.",
    explanation: "Slack resources have zero shadow price—additional units would not increase profit.",
    hint: "Unused material capacity.",
    level: "moderate"
  },
  {
    question: "What does it mean if a material constraint is binding at the optimum?",
    shortAnswer: "The material is fully used and limits further production.",
    explanation: "Binding materials have positive shadow prices—additional units would increase profit.",
    hint: "Fully used material.",
    level: "moderate"
  },
  {
    question: "Why is Product P produced more than Product Q at the optimum?",
    shortAnswer: "Product P has higher profit per unit (₹120 vs ₹100) and uses materials more efficiently.",
    explanation: "The optimal mix balances material usage across all constraints.",
    hint: "P is more profitable and efficient.",
    level: "moderate"
  },
  {
    question: "What happens if Material X availability increases to 200 kg?",
    shortAnswer: "The feasible region expands and the optimal solution may change.",
    explanation: "More Material X could allow more production of Product P, increasing profit.",
    hint: "More material = more capacity.",
    level: "expert"
  },
  {
    question: "What happens if Material Z availability decreases to 100 kg?",
    shortAnswer: "The Material Z constraint becomes tighter and the optimal solution will change.",
    explanation: "Less Material Z means less production of products that use it.",
    hint: "Less material = less capacity.",
    level: "expert"
  },
  {
    question: "What is the role of raw-material constraints in manufacturing?",
    shortAnswer: "They limit production based on available physical inputs.",
    explanation: "Raw materials are essential inputs; their availability determines what can be produced.",
    hint: "Physical inputs limit production.",
    level: "basic"
  },
  {
    question: "How do you determine if a material constraint is binding?",
    shortAnswer: "Check if the material is fully used at the optimal solution.",
    explanation: "If usage equals availability, the material is binding.",
    hint: "Fully used material = binding.",
    level: "moderate"
  },
  {
    question: "What is a common mistake with raw-material constraints?",
    shortAnswer: "Confusing the material usage coefficients between products.",
    explanation: "Product P uses 3 kg of X, 2 kg of Y, 1 kg of Z; Product Q uses 2 kg of X, 4 kg of Y, 3 kg of Z—these must be assigned correctly.",
    hint: "Check material usage carefully.",
    level: "moderate"
  },
  {
    question: "What is the profit per kg of Material X for Product P?",
    shortAnswer: "₹40/kg (₹120 ÷ 3 kg).",
    explanation: "Product P gives ₹120 profit using 3 kg of Material X, so ₹40 per kg.",
    hint: "Profit divided by material usage.",
    level: "moderate"
  },
  {
    question: "What is the profit per kg of Material X for Product Q?",
    shortAnswer: "₹50/kg (₹100 ÷ 2 kg).",
    explanation: "Product Q gives ₹100 profit using 2 kg of Material X, so ₹50 per kg.",
    hint: "Profit divided by material usage.",
    level: "moderate"
  },
  {
    question: "If Material X is the only constraint, which product would be preferred?",
    shortAnswer: "Product Q, because it gives higher profit per kg of Material X (₹50 vs ₹40).",
    explanation: "With only Material X constraint, Product Q is more profitable per unit of material.",
    hint: "Higher profit per material unit.",
    level: "moderate"
  },
  {
    question: "Why isn't Product Q produced more despite being more profitable per kg of Material X?",
    shortAnswer: "Because other materials (Y and Z) also constrain production.",
    explanation: "Product Q uses more Material Y and Z, which are also limited.",
    hint: "Other materials limit Q.",
    level: "expert"
  },
  {
    question: "What is the total profit if only Product P is produced (x₂ = 0)?",
    shortAnswer: "₹7,200 at x₁ = 60.",
    explanation: "Z = 120(60) + 100(0) = 7,200.",
    hint: "Only Product P.",
    level: "moderate"
  },
  {
    question: "What is the total profit if only Product Q is produced (x₁ = 0)?",
    shortAnswer: "₹4,000 at x₂ = 40.",
    explanation: "Z = 120(0) + 100(40) = 4,000.",
    hint: "Only Product Q.",
    level: "moderate"
  },
  {
    question: "Why is the optimal mix better than producing only one product?",
    shortAnswer: "The optimal mix balances material usage across all constraints to maximize total profit.",
    explanation: "Producing only P or Q leaves some materials unused, reducing total profit.",
    hint: "Balance maximizes profit.",
    level: "moderate"
  },
  {
    question: "What is the economic interpretation of binding material constraints?",
    shortAnswer: "These materials are scarce and limit production; they have positive value.",
    explanation: "Binding constraints indicate materials that are in short supply and should be prioritized.",
    hint: "Scarce materials are valuable.",
    level: "expert"
  }
];

export default questions;