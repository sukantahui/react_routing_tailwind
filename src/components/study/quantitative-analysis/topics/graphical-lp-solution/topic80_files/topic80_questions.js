const questions = [
  {
    question: "What industries commonly use graphical LP?",
    shortAnswer: "Manufacturing, agriculture, transportation, healthcare, finance, energy, retail, and education.",
    explanation: "LP is widely used across industries for resource allocation, production planning, and operational optimization.",
    hint: "Many industries use resource optimization.",
    level: "basic",
    codeExample: "Manufacturing: product mix, Agriculture: crop planning, Healthcare: resource allocation"
  },
  {
    question: "How is LP used in manufacturing?",
    shortAnswer: "Manufacturing uses LP to optimize production mix with limited resources like labor, materials, and machine time.",
    explanation: "LP helps determine how much of each product to produce to maximize profit while respecting resource constraints.",
    hint: "Product mix optimization.",
    level: "intermediate",
    codeExample: "Max Z = 8x + 6y\nSubject to: 3x + 2y ≤ 24, 4x + y ≤ 20"
  },
  {
    question: "How is LP used in agriculture?",
    shortAnswer: "Agriculture uses LP for crop planning, land allocation, water management, and fertilizer optimization.",
    explanation: "LP helps farmers decide which crops to plant, how much land to allocate, and how to use water and fertilizer efficiently.",
    hint: "Crop planning and resource allocation.",
    level: "intermediate",
    codeExample: "Max Z = 15x + 12y\nSubject to: x + y ≤ 100, 2x + 3y ≤ 240"
  },
  {
    question: "How is LP used in transportation?",
    shortAnswer: "Transportation uses LP for route optimization, fleet management, and logistics planning.",
    explanation: "LP helps minimize transportation costs while meeting delivery requirements and capacity constraints.",
    hint: "Route and fleet optimization.",
    level: "intermediate",
    codeExample: "Min Z = 5x + 7y\nSubject to: x + 2y ≥ 100, 3x + y ≤ 150"
  },
  {
    question: "How is LP used in healthcare?",
    shortAnswer: "Healthcare uses LP for resource allocation, staff scheduling, and patient flow optimization.",
    explanation: "LP helps hospitals allocate doctors, nurses, beds, and equipment to maximize patient care quality.",
    hint: "Hospital resource optimization.",
    level: "intermediate",
    codeExample: "Max Z = 10x + 8y\nSubject to: 2x + 3y ≤ 40, 4x + y ≤ 32"
  },
  {
    question: "How is LP used in finance?",
    shortAnswer: "Finance uses LP for portfolio optimization, investment allocation, and risk management.",
    explanation: "LP helps investors allocate capital across assets to maximize returns while managing risk.",
    hint: "Investment and portfolio optimization.",
    level: "intermediate",
    codeExample: "Max Z = 12x + 10y\nSubject to: x + y ≤ 100, 0.5x + 0.3y ≤ 40"
  },
  {
    question: "How is LP used in energy?",
    shortAnswer: "Energy uses LP for power generation planning, fuel optimization, and emissions reduction.",
    explanation: "LP helps energy companies determine the optimal mix of power sources to meet demand while minimizing costs and emissions.",
    hint: "Power generation optimization.",
    level: "intermediate",
    codeExample: "Min Z = 6x + 8y\nSubject to: 2x + y ≥ 80, 3x + 4y ≤ 120"
  },
  {
    question: "How is LP used in retail?",
    shortAnswer: "Retail uses LP for inventory management, shelf space allocation, and pricing optimization.",
    explanation: "LP helps retailers decide how much inventory to hold, how to allocate shelf space, and how to price products.",
    hint: "Inventory and shelf space optimization.",
    level: "intermediate",
    codeExample: "Max Z = 7x + 5y\nSubject to: x + y ≤ 50, 2x + 3y ≤ 120"
  },
  {
    question: "What are the benefits of using graphical LP in practice?",
    shortAnswer: "Benefits include visual decision support, quick what-if analysis, bottleneck identification, and effective communication.",
    explanation: "Graphical LP makes optimization accessible to non-technical stakeholders and helps managers understand resource constraints.",
    hint: "Visual and intuitive decision support.",
    level: "intermediate",
    codeExample: "Graph shows constraints, feasible region, and optimal solution clearly"
  },
  {
    question: "What challenges arise when applying LP in practice?",
    shortAnswer: "Challenges include data availability, model complexity, stakeholder buy-in, and changing business conditions.",
    explanation: "Real-world LP applications face practical challenges that require careful problem formulation and stakeholder engagement.",
    hint: "Practical implementation challenges.",
    level: "advanced",
    codeExample: "Data collection, model validation, stakeholder communication"
  },
  {
    question: "How do you identify bottlenecks in real-world LP applications?",
    shortAnswer: "Bottlenecks are identified as binding constraints where resources are fully utilized at the optimal solution.",
    explanation: "Graphical LP clearly shows which constraints are binding (lines through the optimal point), indicating resource bottlenecks.",
    hint: "Binding constraints = bottlenecks.",
    level: "intermediate",
    codeExample: "Lines passing through optimal point → Bottlenecks"
  },
  {
    question: "What is the role of sensitivity analysis in practical LP applications?",
    shortAnswer: "Sensitivity analysis helps understand how changes in parameters affect the optimal solution.",
    explanation: "In practice, conditions change. Sensitivity analysis shows how robust the solution is and what changes would affect it.",
    hint: "Understanding solution robustness.",
    level: "advanced",
    codeExample: "Shadow prices, allowable ranges"
  },
  {
    question: "How do you validate an LP model for practical use?",
    shortAnswer: "Validate by testing with historical data, checking reasonableness, and involving domain experts.",
    explanation: "Model validation ensures the LP model accurately represents the real-world problem and produces practical solutions.",
    hint: "Testing and expert review.",
    level: "advanced",
    codeExample: "Compare model output with actual results"
  },
  {
    question: "What is the difference between theoretical and practical LP applications?",
    shortAnswer: "Theoretical applications assume perfect data and simple constraints; practical applications require data collection, stakeholder input, and implementation planning.",
    explanation: "Practical LP involves additional steps: problem definition, data gathering, model validation, and change management.",
    hint: "Theory vs. real-world implementation.",
    level: "intermediate",
    codeExample: "Theoretical: given data, Practical: collect and validate data"
  },
  {
    question: "How do you handle multiple objectives in practical LP?",
    shortAnswer: "Multiple objectives can be handled through goal programming, weighted objectives, or sequential optimization.",
    explanation: "Real problems often have multiple objectives (profit, quality, sustainability). These can be combined or prioritized.",
    hint: "Balancing competing objectives.",
    level: "advanced",
    codeExample: "Maximize profit and minimize environmental impact"
  },
  {
    question: "What is the importance of stakeholder involvement in practical LP?",
    shortAnswer: "Stakeholder involvement ensures the model addresses real needs, improves buy-in, and facilitates implementation.",
    explanation: "Engaging decision-makers and those affected by the solution improves model quality and adoption.",
    hint: "Engaging decision-makers.",
    level: "intermediate",
    codeExample: "Workshops, interviews, validation meetings"
  },
  {
    question: "How do you communicate LP results to non-technical stakeholders?",
    shortAnswer: "Use graphs, simple explanations, and focus on insights and recommendations rather than mathematical details.",
    explanation: "Graphical representations make LP results accessible. Focus on what the solution means for the business.",
    hint: "Visual and simple communication.",
    level: "intermediate",
    codeExample: "Graph showing optimal solution, explain in business terms"
  },
  {
    question: "What is the role of data quality in practical LP applications?",
    shortAnswer: "Data quality is critical - inaccurate data leads to suboptimal decisions and poor outcomes.",
    explanation: "LP solutions are only as good as the data. Invest time in data collection and validation.",
    hint: "Garbage in, garbage out.",
    level: "advanced",
    codeExample: "Validate cost, revenue, and resource data"
  },
  {
    question: "How do you handle uncertainty in practical LP applications?",
    shortAnswer: "Handle uncertainty through scenario analysis, sensitivity analysis, and building flexibility into the solution.",
    explanation: "Real-world conditions change. Scenario analysis helps understand how different conditions affect the solution.",
    hint: "Planning for different scenarios.",
    level: "advanced",
    codeExample: "Best-case, worst-case, and most-likely scenarios"
  },
  {
    question: "What is the future of LP in practical applications?",
    shortAnswer: "LP will continue to be important, with integration with AI, machine learning, and real-time decision support.",
    explanation: "Advances in computing and data availability are expanding the applications of LP in business and government.",
    hint: "Integration with new technologies.",
    level: "advanced",
    codeExample: "Real-time optimization, AI integration"
  }
];

export default questions;