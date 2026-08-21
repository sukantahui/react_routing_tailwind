// topic1_files/topic1_questions.js

const questions = [
  {
    question: "What is the primary purpose of Linear Programming?",
    shortAnswer: "To find the best possible outcome (maximise profit, minimise cost, etc.) under given constraints.",
    explanation: "LP is used for decision-making where there are limited resources and a clear objective. It helps answer 'what is the best way to allocate resources?'",
    hint: "Think of it as 'optimal decision-making under limits'.",
    level: "basic"
  },
  {
    question: "Why is Linear Programming used in operations research?",
    shortAnswer: "It provides a mathematical framework to model and solve complex resource allocation problems efficiently.",
    explanation: "Operations research aims to improve decision-making. LP is one of its core tools because it balances multiple objectives and constraints systematically.",
    hint: "It's about making better decisions using math.",
    level: "moderate"
  },
  {
    question: "Can LP be used for both profit maximization and cost minimization?",
    shortAnswer: "Yes, LP can handle both types of objectives.",
    explanation: "The objective function can be set to maximise (e.g., revenue, profit) or minimise (e.g., costs, time). The same mathematical techniques apply.",
    hint: "Two sides of the same coin.",
    level: "basic"
  },
  {
    question: "Give a real-world example of LP used in logistics.",
    shortAnswer: "Optimising delivery routes to minimise fuel costs while meeting time windows.",
    explanation: "LP can decide which routes trucks should take, considering distance, capacity, and delivery deadlines, to reduce overall costs.",
    hint: "Think about a delivery company.",
    level: "moderate"
  },
  {
    question: "What is the role of LP in manufacturing?",
    shortAnswer: "To determine the optimal production mix that maximises profit given limited machines, labor, and materials.",
    explanation: "Manufacturers use LP to decide how many of each product to produce, considering resource capacities and demand forecasts.",
    hint: "It answers 'what to produce and in what quantities?'.",
    level: "moderate"
  },
  {
    question: "What is the difference between LP and other optimization methods?",
    shortAnswer: "LP assumes linear relationships and continuous variables, making it computationally efficient for large-scale problems.",
    explanation: "Non-linear methods handle more complex relationships but are harder to solve. LP is the simplest and most widely used.",
    hint: "Linear vs. non-linear – that's the key.",
    level: "expert"
  },
  {
    question: "What does 'optimize' mean in the context of LP?",
    shortAnswer: "To find the extreme value (maximum or minimum) of the objective function within the feasible region.",
    explanation: "Optimization is the core of LP – you seek the best feasible solution, not just any solution.",
    hint: "It's about being the best possible within limits.",
    level: "basic"
  },
  {
    question: "Why is LP considered a prescriptive tool?",
    shortAnswer: "Because it recommends a specific course of action (the optimal solution) rather than just describing the situation.",
    explanation: "Descriptive tools explain what happened; prescriptive tools like LP tell you what to do to achieve a goal.",
    hint: "It tells you 'do this' to get the best outcome.",
    level: "moderate"
  },
  {
    question: "How does LP support strategic planning in companies?",
    shortAnswer: "By evaluating different scenarios and resource allocations to choose the most profitable or cost-effective strategy.",
    explanation: "LP helps management decide long-term investments, product lines, and market strategies based on quantitative analysis.",
    hint: "It's used for big-picture decisions.",
    level: "moderate"
  },
  {
    question: "What kind of problems are LP best suited for?",
    shortAnswer: "Problems with clear objectives, linear relationships, and multiple constraints – like production planning and resource allocation.",
    explanation: "When the goal and restrictions can be expressed linearly, LP gives fast and reliable solutions.",
    hint: "Look for 'how much of this and that' problems.",
    level: "basic"
  },
  {
    question: "Can LP handle multiple objectives simultaneously?",
    shortAnswer: "Classical LP handles only one objective; multi-objective LP or goal programming is needed for multiple objectives.",
    explanation: "Standard LP has a single objective function. If you have trade-offs, you need extensions like weighted sums or goal programming.",
    hint: "You can combine objectives into one with weights.",
    level: "expert"
  },
  {
    question: "What is the economic interpretation of the dual LP?",
    shortAnswer: "The dual variables (shadow prices) represent the marginal worth of resources.",
    explanation: "The dual LP provides economic insights: how much additional profit you could get from one more unit of a constrained resource.",
    hint: "Shadow prices tell you the value of relaxing a constraint.",
    level: "expert"
  },
  {
    question: "Why is LP used in agricultural planning?",
    shortAnswer: "To allocate land, water, and fertilizer among different crops to maximize profit while meeting nutritional or market requirements.",
    explanation: "Farmers and agribusinesses use LP to decide crop mix, irrigation schedules, and input usage.",
    hint: "Think of planting decisions under resource limits.",
    level: "moderate"
  },
  {
    question: "What is the main purpose of the feasible region in LP?",
    shortAnswer: "It defines all possible solutions that satisfy the constraints – the search space for the optimal solution.",
    explanation: "The feasible region is where we look for the optimum. It represents all realistic alternatives.",
    hint: "It's the 'playing field' of the problem.",
    level: "basic"
  },
  {
    question: "How does LP help in workforce planning?",
    shortAnswer: "By optimizing staffing levels and shift assignments to meet demand while minimizing labor costs.",
    explanation: "LP can schedule employees, assign shifts, and determine optimal number of workers needed at different times.",
    hint: "Consider a call center needing enough staff during peak hours.",
    level: "moderate"
  },
  {
    question: "What is the difference between LP and simulation?",
    shortAnswer: "LP is deterministic and gives an optimal solution; simulation is stochastic and explores what-if scenarios.",
    explanation: "LP provides a single best solution; simulation captures uncertainty and can evaluate many possibilities.",
    hint: "LP gives the answer; simulation gives ranges and probabilities.",
    level: "expert"
  },
  {
    question: "Why is LP important for supply chain management?",
    shortAnswer: "It helps optimize production, inventory, and distribution to reduce costs and improve service levels.",
    explanation: "Supply chains involve many decisions: sourcing, production, warehousing, transport – LP ties them together optimally.",
    hint: "Think of moving goods from factories to customers.",
    level: "moderate"
  },
  {
    question: "What is a 'shadow price' in LP and why is it useful?",
    shortAnswer: "It indicates how much the objective value would improve if a constraint's right-hand side were increased by one unit.",
    explanation: "Shadow prices guide managers on the value of additional resources; they help prioritize investments.",
    hint: "It tells you the value of one more unit of a scarce resource.",
    level: "expert"
  },
  {
    question: "Can LP be used for financial portfolio optimization?",
    shortAnswer: "Yes, it can allocate funds among assets to maximise expected return subject to risk and diversification constraints.",
    explanation: "LP models can handle linear risk measures; more complex risk measures may require quadratic programming.",
    hint: "Think of choosing stocks with limits on risk and sector exposure.",
    level: "moderate"
  },
  {
    question: "What is the purpose of sensitivity analysis in LP?",
    shortAnswer: "To examine how changes in coefficients affect the optimal solution and to assess the robustness of the solution.",
    explanation: "Sensitivity analysis tells you how much you can vary parameters before the optimal solution changes.",
    hint: "It checks how 'stable' your optimal plan is.",
    level: "expert"
  },
  {
    question: "How does LP contribute to sustainability?",
    shortAnswer: "By optimising resource usage, reducing waste, and minimising environmental impact while meeting production goals.",
    explanation: "LP can model carbon emissions, water usage, and energy consumption as constraints to find eco-friendly production plans.",
    hint: "Green operations can be modelled with LP.",
    level: "moderate"
  },
  {
    question: "What is the purpose of the objective function in LP?",
    shortAnswer: "It quantifies the goal (profit, cost, time, etc.) that we want to optimize.",
    explanation: "Without an objective, LP would only define feasibility. The objective drives the selection of the best solution.",
    hint: "It tells you what you are trying to achieve.",
    level: "basic"
  },
  {
    question: "Why is LP used in the airline industry?",
    shortAnswer: "For crew scheduling, aircraft routing, and ticket pricing to maximise revenue and minimise costs.",
    explanation: "Airlines face complex constraints (regulations, airport slots, crew rest); LP helps plan efficiently.",
    hint: "Think about how pilots and planes are assigned to flights.",
    level: "moderate"
  },
  {
    question: "What is the difference between LP and integer programming?",
    shortAnswer: "LP allows continuous variables; integer programming requires variables to be integers (whole numbers).",
    explanation: "When variables must be indivisible (e.g., number of aircraft), IP is necessary. LP is a relaxation of IP.",
    hint: "Can you have half a plane?",
    level: "moderate"
  },
  {
    question: "How does LP help in budget allocation for marketing?",
    shortAnswer: "By distributing the advertising budget across channels to maximize reach or conversions subject to budget and channel constraints.",
    explanation: "Marketing managers use LP to find the optimal mix of TV, digital, print, etc., to get the best ROI.",
    hint: "Where should you spend money for maximum effect?",
    level: "moderate"
  },
  {
    question: "What is a 'degenerate' solution in LP and why does it matter?",
    shortAnswer: "A degenerate solution occurs when more constraints than necessary are binding at a vertex; it can cause numerical issues in some algorithms.",
    explanation: "Degeneracy may lead to cycling in the Simplex method but is usually manageable with modern implementations.",
    hint: "It's a corner where several constraints meet exactly.",
    level: "expert"
  },
  {
    question: "Why is LP considered a 'mathematical programming' technique?",
    shortAnswer: "It's a method of programming (i.e., planning) using mathematical models to allocate resources optimally.",
    explanation: "The term 'programming' here refers to planning, not computer coding. LP is part of the broader field of mathematical optimization.",
    hint: "It's about planning with math.",
    level: "moderate"
  },
  {
    question: "How does LP support decision-making under scarcity?",
    shortAnswer: "It shows the best way to use limited resources to achieve a goal, thereby improving efficiency and effectiveness.",
    explanation: "When resources are scarce (time, money, materials), LP guides you to allocate them where they generate the most value.",
    hint: "It's about making the most of what you have.",
    level: "basic"
  },
  {
    question: "Can LP be used for project management?",
    shortAnswer: "Yes, for resource leveling, scheduling, and time-cost trade-offs (e.g., crashing projects).",
    explanation: "LP can minimize project duration or cost while respecting precedence and resource constraints.",
    hint: "Think of managing tasks with limited resources.",
    level: "moderate"
  },
  {
    question: "What is the overall purpose of studying LP?",
    shortAnswer: "To develop a systematic approach to solve complex decision problems and to understand the principles of optimization.",
    explanation: "LP is not just a tool; it teaches structured thinking, modeling skills, and the importance of trade-offs.",
    hint: "It's a way of thinking about problems.",
    level: "basic"
  }
];

export default questions;