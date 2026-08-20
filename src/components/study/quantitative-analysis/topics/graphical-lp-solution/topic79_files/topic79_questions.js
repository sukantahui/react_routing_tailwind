const questions = [
  {
    question: "What is social-resource optimization in LP?",
    shortAnswer: "It's an LP problem that optimizes the allocation of social resources across programs to maximize social impact.",
    explanation: "Social-resource optimization involves distributing funds across education, healthcare, housing, and other social programs to achieve the greatest social benefit.",
    hint: "Maximizing social impact with limited resources.",
    level: "basic",
    codeExample: "Max Z = 15x + 12y + 10z\nSubject to: budget, minimums, maximums"
  },
  {
    question: "How is social impact measured in LP models?",
    shortAnswer: "Social impact is measured using impact points that quantify the social value of each program per unit of funding.",
    explanation: "Impact points are based on evidence of program effectiveness: lives improved, students educated, health outcomes, etc.",
    hint: "Evidence-based impact measurement.",
    level: "intermediate",
    codeExample: "Education: 15 points/crore\nHealthcare: 12 points/crore"
  },
  {
    question: "What are common social programs in resource allocation?",
    shortAnswer: "Common programs include Education, Healthcare, Housing, Nutrition, and Skill Development.",
    explanation: "Each program addresses different social needs and has different impact scores and resource requirements.",
    hint: "Education, Healthcare, Housing, Nutrition.",
    level: "basic",
    codeExample: "x = Education, y = Healthcare, z = Housing"
  },
  {
    question: "Why is equity important in social-resource allocation?",
    shortAnswer: "Equity ensures that vulnerable populations receive adequate resources and that social programs reduce inequality.",
    explanation: "Social-resource allocation must consider distributional effects - ensuring that disadvantaged groups are not left behind.",
    hint: "Fair distribution of resources.",
    level: "intermediate",
    codeExample: "Minimum allocations for underserved areas"
  },
  {
    question: "What is the role of program synergies in social allocation?",
    shortAnswer: "Program synergies occur when programs reinforce each other, creating greater combined impact than individual effects.",
    explanation: "Education and health programs often have synergies - educated people tend to have better health outcomes.",
    hint: "Programs working together.",
    level: "advanced",
    codeExample: "Education + Healthcare = Greater combined impact"
  },
  {
    question: "How do you determine impact scores for social programs?",
    shortAnswer: "Impact scores are determined through evidence-based research, cost-benefit analysis, and stakeholder consultation.",
    explanation: "Researchers measure program outcomes (e.g., students graduating, patients treated) and compare them to program costs.",
    hint: "Evidence and research-based scores.",
    level: "advanced",
    codeExample: "Graduation rate increase per crore spent"
  },
  {
    question: "What are capacity constraints in social-resource optimization?",
    shortAnswer: "Capacity constraints limit how much funding a program can effectively use without diminishing returns.",
    explanation: "Programs have limited staff, infrastructure, or absorptive capacity. Too much funding too quickly can be wasteful.",
    hint: "Program's ability to use funding effectively.",
    level: "intermediate",
    codeExample: "Education capacity: x ≤ 12\nHealthcare capacity: y ≤ 15"
  },
  {
    question: "What is the difference between social and economic resource allocation?",
    shortAnswer: "Social allocation focuses on well-being and equity; economic allocation focuses on efficiency and profit.",
    explanation: "Social allocation considers non-financial outcomes like quality of life, while economic allocation is driven by financial returns.",
    hint: "Well-being vs. profit.",
    level: "intermediate",
    codeExample: "Social: Max impact points\nEconomic: Max profit (₹)"
  },
  {
    question: "How do you handle multiple stakeholders in social allocation?",
    shortAnswer: "Multiple stakeholders are represented through constraints that reflect different priorities and needs.",
    explanation: "Different stakeholders (communities, government, NGOs) have different priorities. These are incorporated as constraints.",
    hint: "Different priorities = different constraints.",
    level: "advanced",
    codeExample: "Community needs, government priorities, NGO programs"
  },
  {
    question: "What is the shadow price of budget in social allocation?",
    shortAnswer: "The shadow price represents the additional social impact from one more crore of budget.",
    explanation: "If the budget constraint is binding, the shadow price tells decision-makers the value of additional funding.",
    hint: "Value of additional budget.",
    level: "advanced",
    codeExample: "Shadow price = 2.5 impact points/crore"
  },
  {
    question: "How do you measure program effectiveness in social allocation?",
    shortAnswer: "Program effectiveness is measured through outcomes: graduation rates, health outcomes, housing stability, etc.",
    explanation: "Effectiveness metrics are used to calculate impact scores and evaluate program performance.",
    hint: "Outcomes and impact measurement.",
    level: "advanced",
    codeExample: "Graduation rate, infant mortality, homelessness reduction"
  },
  {
    question: "What is the role of community participation in social allocation?",
    shortAnswer: "Community participation ensures programs are relevant, culturally appropriate, and effectively meet local needs.",
    explanation: "Communities know their needs best. Participatory planning leads to more effective and sustainable programs.",
    hint: "Community involvement in planning.",
    level: "intermediate",
    codeExample: "Community needs assessments, participatory budgeting"
  },
  {
    question: "How do you handle uncertainty in social-resource allocation?",
    shortAnswer: "Uncertainty is handled through scenario analysis, sensitivity analysis, and building flexibility into allocations.",
    explanation: "Social needs and program effectiveness can change. Models should be updated regularly based on new evidence.",
    hint: "Planning for changing needs.",
    level: "advanced",
    codeExample: "Multiple scenarios, regular model updates"
  },
  {
    question: "What is the impact of political constraints on social allocation?",
    shortAnswer: "Political constraints may require minimum funding for certain programs or regions to maintain political support.",
    explanation: "Political considerations can override the optimal solution. Models help show the trade-offs involved.",
    hint: "Political influence on allocation.",
    level: "intermediate",
    codeExample: "Minimum allocation for each region"
  },
  {
    question: "How do you evaluate the effectiveness of social-resource allocation?",
    shortAnswer: "Effectiveness is evaluated by measuring actual outcomes against predicted impacts and adjusting the model.",
    explanation: "Monitor program outcomes, compare to predictions, and update impact scores and constraints based on evidence.",
    hint: "Outcome vs. prediction evaluation.",
    level: "advanced",
    codeExample: "Actual impact vs. predicted impact"
  },
  {
    question: "What is the role of NGOs in social-resource allocation?",
    shortAnswer: "NGOs often implement social programs and can provide expertise, community connections, and additional resources.",
    explanation: "NGOs can be partners in program implementation. Allocating funds to NGOs requires additional constraints.",
    hint: "NGO partnerships and implementation.",
    level: "intermediate",
    codeExample: "NGO capacity: specific programs or regions"
  }
];

export default questions;