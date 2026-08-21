const questions = [
  {
    question: "What is public resource allocation in LP?",
    shortAnswer: "It's an LP problem that helps governments allocate limited public funds across competing needs to maximize social benefit.",
    explanation: "Public resource allocation involves distributing budget across sectors like infrastructure, healthcare, education, and social welfare while meeting minimum requirements and political constraints.",
    hint: "Allocating government funds effectively.",
    level: "basic",
    codeExample: "Max Z = 12x + 10y\nSubject to: budget, minimums, maximums"
  },
  {
    question: "What is the objective in public resource allocation?",
    shortAnswer: "Typically, the objective is to maximize public benefit or social welfare, not just financial efficiency.",
    explanation: "Public benefit may include economic development, social equity, environmental sustainability, and quality of life. These are often measured in benefit units.",
    hint: "Maximizing public welfare.",
    level: "intermediate",
    codeExample: "Max Z = 12x + 10y (Benefit units)"
  },
  {
    question: "What are common constraints in public resource allocation?",
    shortAnswer: "Budget limits, minimum spending requirements, maximum spending limits, and political balance constraints.",
    explanation: "Governments must balance legal requirements (minimum spending in certain sectors), political considerations (balanced allocation), and capacity constraints (maximum spending).",
    hint: "Budget, minimums, maximums, political balance.",
    level: "intermediate",
    codeExample: "5x + 4y ≤ 100, x ≥ 6, x ≤ 14, x + y ≥ 12"
  },
  {
    question: "How do you measure public benefit in LP models?",
    shortAnswer: "Public benefit is measured using benefit units that reflect social welfare impact, often based on cost-benefit analysis.",
    explanation: "Benefit units quantify the social value of each crore spent in different sectors. Higher benefit per crore indicates more efficient social impact.",
    hint: "Social welfare measurement.",
    level: "advanced",
    codeExample: "Infrastructure: 12 benefit units/crore\nSocial Welfare: 10 benefit units/crore"
  },
  {
    question: "What is the role of minimum requirements in public allocation?",
    shortAnswer: "Minimum requirements ensure that essential sectors receive adequate funding regardless of optimization.",
    explanation: "Legal mandates, political commitments, or basic needs may require minimum spending in sectors like healthcare, education, or infrastructure.",
    hint: "Guaranteed minimum funding.",
    level: "intermediate",
    codeExample: "x ≥ 6 (Infrastructure minimum)\ny ≥ 4 (Social Welfare minimum)"
  },
  {
    question: "What is the role of maximum limits in public allocation?",
    shortAnswer: "Maximum limits prevent excessive allocation to any single sector due to capacity constraints or political considerations.",
    explanation: "Sectors may have limited capacity to absorb funds effectively. Maximum limits ensure balanced development.",
    hint: "Preventing over-allocation.",
    level: "intermediate",
    codeExample: "x ≤ 14, y ≤ 16"
  },
  {
    question: "What is political balance in public resource allocation?",
    shortAnswer: "Political balance ensures that allocations are distributed across sectors to maintain political support and equity.",
    explanation: "This constraint prevents all resources from going to a single sector, ensuring diverse development across sectors.",
    hint: "Ensuring diverse allocation.",
    level: "intermediate",
    codeExample: "x + y ≥ 12 (Political balance)"
  },
  {
    question: "How do you handle multiple stakeholders in public allocation?",
    shortAnswer: "Multiple stakeholder needs are incorporated through constraints that represent different requirements and priorities.",
    explanation: "Different stakeholders (citizens, businesses, politicians) have different priorities. These are represented as constraints in the LP model.",
    hint: "Different priorities = different constraints.",
    level: "advanced",
    codeExample: "Minimum education, maximum infrastructure, political balance"
  },
  {
    question: "What is the shadow price of budget in public allocation?",
    shortAnswer: "The shadow price of budget represents the additional public benefit from one more crore of funding.",
    explanation: "If the budget constraint is binding, the shadow price tells decision-makers the value of additional funding. This helps in justifying budget increases.",
    hint: "Value of additional budget.",
    level: "advanced",
    codeExample: "Shadow price = 2.4 benefit units/crore"
  },
  {
    question: "How do equity considerations affect public resource allocation?",
    shortAnswer: "Equity considerations ensure fair distribution across regions, income groups, and demographic segments.",
    explanation: "Equity constraints may require that certain percentages of funds go to underserved areas or populations.",
    hint: "Fair distribution of resources.",
    level: "advanced",
    codeExample: "Urban allocation ≤ 60%, Rural allocation ≥ 40%"
  },
  {
    question: "What is the difference between public and private resource allocation?",
    shortAnswer: "Public allocation focuses on social welfare and equity, while private allocation focuses on profit maximization.",
    explanation: "Public allocation considers non-financial objectives like equity, access, and quality of life. Private allocation is driven by financial returns.",
    hint: "Social welfare vs. profit.",
    level: "intermediate",
    codeExample: "Public: Max benefit units\nPrivate: Max profit (₹)"
  },
  {
    question: "How do you handle capacity constraints in public allocation?",
    shortAnswer: "Capacity constraints limit how much funding a sector can effectively use within a given period.",
    explanation: "Sectors may have limited staff, infrastructure, or project readiness to absorb large allocations quickly.",
    hint: "Sector capacity to use funds.",
    level: "advanced",
    codeExample: "Infrastructure capacity: x ≤ 15\nSocial welfare capacity: y ≤ 18"
  },
  {
    question: "What is the role of cost-benefit analysis in public allocation?",
    shortAnswer: "Cost-benefit analysis helps determine the benefit per crore for each sector, used in the objective function.",
    explanation: "Each sector's benefit per crore is calculated based on expected outcomes: lives saved, students educated, infrastructure built, etc.",
    hint: "Calculating benefit per crore.",
    level: "advanced",
    codeExample: "Healthcare: 15 benefit units/crore\nEducation: 12 benefit units/crore"
  },
  {
    question: "How does population density affect public resource allocation?",
    shortAnswer: "Population density affects the need for infrastructure, healthcare, and other services in different areas.",
    explanation: "Densely populated areas may need more infrastructure spending per square kilometer, while sparse areas may need more transportation spending.",
    hint: "Urban vs. rural needs.",
    level: "advanced",
    codeExample: "Urban: Infrastructure priority\nRural: Transportation priority"
  },
  {
    question: "What is the role of transparency in public resource allocation?",
    shortAnswer: "Transparency ensures that allocation decisions are clear, justifiable, and publicly accountable.",
    explanation: "Using LP models provides a transparent, data-driven basis for allocation decisions, reducing political influence.",
    hint: "Clear and accountable decisions.",
    level: "intermediate",
    codeExample: "Model documentation, stakeholder consultation"
  },
  {
    question: "How do you evaluate the effectiveness of public resource allocation?",
    shortAnswer: "Effectiveness is evaluated by measuring actual outcomes against predicted benefits from the LP model.",
    explanation: "Monitor if allocated funds achieved expected outcomes. Adjust the model based on actual performance.",
    hint: "Outcome vs. prediction.",
    level: "advanced",
    codeExample: "Actual benefit vs. predicted benefit\nAdjust constraints if needed"
  },
  {
    question: "What is the impact of political constraints on public allocation?",
    shortAnswer: "Political constraints can significantly alter optimal allocations to satisfy political requirements.",
    explanation: "Political constraints may require certain sectors to receive minimum funding to maintain support from different constituencies.",
    hint: "Political influence on allocation.",
    level: "intermediate",
    codeExample: "x + y ≥ 12 (Political balance requirement)"
  },
  {
    question: "How do you handle uncertainty in public resource allocation?",
    shortAnswer: "Uncertainty is handled through scenario analysis, sensitivity analysis, and building flexibility into the model.",
    explanation: "Economic conditions, population changes, and political priorities can change. Models should be updated regularly.",
    hint: "Planning for uncertainty.",
    level: "advanced",
    codeExample: "Multiple scenarios, sensitivity analysis"
  }
];

export default questions;