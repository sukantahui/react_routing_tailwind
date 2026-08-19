// topic22_files/topic22_questions.js

const questions = [
  {
    question: "What is the goal of a capacity planning problem?",
    shortAnswer: "To meet demand at minimum cost using available capacity options.",
    explanation: "Capacity planning problems involve deciding how much production to allocate to different capacity sources (regular time, overtime, subcontracting) to meet demand at minimum cost.",
    hint: "Minimize cost, meet demand.",
    level: "basic"
  },
  {
    question: "In the capacity planning example, what are the decision variables?",
    shortAnswer: "x₁ = units in Regular time, x₂ = units in Overtime, x₃ = units in Subcontracting.",
    explanation: "These represent the quantity of production allocated to each capacity option.",
    hint: "Three capacity options, three variables.",
    level: "basic"
  },
  {
    question: "What is the objective function in the capacity planning example?",
    shortAnswer: "Minimize Z = 200x₁ + 250x₂ + 300x₃.",
    explanation: "Regular time costs ₹200/unit, Overtime costs ₹250/unit, Subcontracting costs ₹300/unit.",
    hint: "Cost per unit for each capacity option.",
    level: "basic"
  },
  {
    question: "What does the Demand constraint represent?",
    shortAnswer: "x₁ + x₂ + x₃ = 800.",
    explanation: "Total production from all sources must equal 800 units of demand.",
    hint: "Total production must meet demand.",
    level: "basic"
  },
  {
    question: "What does the Regular capacity constraint represent?",
    shortAnswer: "x₁ ≤ 500.",
    explanation: "Regular time can produce at most 500 units.",
    hint: "Regular time capacity limit.",
    level: "basic"
  },
  {
    question: "What does the Overtime capacity constraint represent?",
    shortAnswer: "x₂ ≤ 200.",
    explanation: "Overtime can produce at most 200 units.",
    hint: "Overtime capacity limit.",
    level: "basic"
  },
  {
    question: "What does the Subcontracting capacity constraint represent?",
    shortAnswer: "x₃ ≤ 300.",
    explanation: "Subcontracting can produce at most 300 units.",
    hint: "Subcontracting capacity limit.",
    level: "basic"
  },
  {
    question: "What does the constraint x₁ ≥ 400 represent?",
    shortAnswer: "At least 50% of production must be from Regular time.",
    explanation: "The company requires at least half of production from Regular time.",
    hint: "Minimum Regular time requirement.",
    level: "moderate"
  },
  {
    question: "What is the optimal solution for the capacity planning example?",
    shortAnswer: "x₁ = 500, x₂ = 200, x₃ = 100 with cost = ₹180,000.",
    explanation: "Use maximum Regular time (500), then maximum Overtime (200), then Subcontracting (100) to meet demand.",
    hint: "Optimal capacity allocation.",
    level: "moderate"
  },
  {
    question: "What is the total cost at the optimal solution?",
    shortAnswer: "₹180,000.",
    explanation: "Cost = 200(500) + 250(200) + 300(100) = 100,000 + 50,000 + 30,000 = 180,000.",
    hint: "Minimum cost value.",
    level: "moderate"
  },
  {
    question: "Which constraints are binding at the optimal solution?",
    shortAnswer: "Demand, Regular capacity, Overtime capacity, and Minimum Regular are all binding.",
    explanation: "Demand: 800 met exactly. Regular: 500/500 used. Overtime: 200/200 used. Minimum: 500 ≥ 400 met.",
    hint: "Multiple constraints are tight.",
    level: "moderate"
  },
  {
    question: "What is the slack in the Subcontracting constraint at the optimum?",
    shortAnswer: "200 units (300 - 100 = 200).",
    explanation: "Subcontracting capacity is not fully used.",
    hint: "Unused subcontracting capacity.",
    level: "moderate"
  },
  {
    question: "What is the cost per unit of Regular time?",
    shortAnswer: "₹200.",
    explanation: "Regular time costs ₹200 per unit.",
    hint: "Regular time cost.",
    level: "basic"
  },
  {
    question: "What is the cost per unit of Overtime?",
    shortAnswer: "₹250.",
    explanation: "Overtime costs ₹250 per unit.",
    hint: "Overtime cost.",
    level: "basic"
  },
  {
    question: "What is the cost per unit of Subcontracting?",
    shortAnswer: "₹300.",
    explanation: "Subcontracting costs ₹300 per unit.",
    hint: "Subcontracting cost.",
    level: "basic"
  },
  {
    question: "Why is Regular time preferred over Overtime and Subcontracting?",
    shortAnswer: "Because Regular time has the lowest cost per unit (₹200).",
    explanation: "The company should use the cheapest capacity option first.",
    hint: "Lowest cost.",
    level: "basic"
  },
  {
    question: "What is the Regular time capacity in the example?",
    shortAnswer: "500 units.",
    explanation: "Regular time can produce up to 500 units.",
    hint: "Regular time capacity.",
    level: "basic"
  },
  {
    question: "What is the Overtime capacity in the example?",
    shortAnswer: "200 units.",
    explanation: "Overtime can produce up to 200 units.",
    hint: "Overtime capacity.",
    level: "basic"
  },
  {
    question: "What is a common mistake in capacity planning problems?",
    shortAnswer: "Not using the cheapest capacity option first.",
    explanation: "The optimal solution always uses cheaper capacity before more expensive options.",
    hint: "Use cheapest first.",
    level: "moderate"
  },
  {
    question: "What is the total demand in the example?",
    shortAnswer: "800 units.",
    explanation: "The factory needs to meet demand of 800 units.",
    hint: "Total demand.",
    level: "basic"
  },
  {
    question: "If Regular time capacity increases to 600 units, what happens?",
    shortAnswer: "The optimal solution changes, using more Regular time and less Subcontracting.",
    explanation: "More Regular capacity allows using more of the cheapest option.",
    hint: "More Regular = lower cost.",
    level: "expert"
  },
  {
    question: "If Overtime cost decreases to ₹220, what happens?",
    shortAnswer: "Overtime becomes more attractive and the optimal solution may use more Overtime.",
    explanation: "Lower Overtime cost makes it a better option.",
    hint: "Cheaper Overtime = more Overtime.",
    level: "expert"
  },
  {
    question: "What is the role of the minimum Regular time requirement?",
    shortAnswer: "To ensure a certain level of internal production.",
    explanation: "Minimum requirements may be due to quality, employment, or policy reasons.",
    hint: "Minimum internal production.",
    level: "moderate"
  },
  {
    question: "Why might a company use Overtime instead of Subcontracting?",
    shortAnswer: "Because Overtime is cheaper (₹250 vs ₹300) and may have better quality control.",
    explanation: "Overtime is the second cheapest option after Regular time.",
    hint: "Cost difference.",
    level: "moderate"
  },
  {
    question: "What is the optimal Regular time production?",
    shortAnswer: "500 units.",
    explanation: "The optimal solution uses maximum Regular time capacity.",
    hint: "Maximum Regular time.",
    level: "basic"
  },
  {
    question: "What is the optimal Overtime production?",
    shortAnswer: "200 units.",
    explanation: "The optimal solution uses maximum Overtime capacity.",
    hint: "Maximum Overtime.",
    level: "basic"
  },
  {
    question: "What is the optimal Subcontracting production?",
    shortAnswer: "100 units.",
    explanation: "Only 100 units are subcontracted to meet the remaining demand.",
    hint: "Remaining demand after Regular and Overtime.",
    level: "basic"
  },
  {
    question: "If the minimum Regular time requirement increases to 450, what happens?",
    shortAnswer: "The optimal solution changes, possibly increasing cost.",
    explanation: "Higher minimum Regular time may force using more Regular time, reducing flexibility.",
    hint: "Higher minimum = less flexibility.",
    level: "expert"
  },
  {
    question: "What is the economic interpretation of the binding constraints?",
    shortAnswer: "Demand, Regular capacity, and Overtime capacity are all fully utilized.",
    explanation: "These are the limiting factors in the production plan.",
    hint: "Scarce resources.",
    level: "moderate"
  }
];

export default questions;