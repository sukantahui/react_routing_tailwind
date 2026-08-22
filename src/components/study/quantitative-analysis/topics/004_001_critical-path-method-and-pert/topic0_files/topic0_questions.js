// topic0_questions.js
// 30 Moderate to Expert Questions on Meaning of Project Network Analysis (CPM & PERT)

const questions = [
  {
    question: "What is Project Network Analysis (PNA) in Operations Research?",
    shortAnswer: "A systematic quantitative technique that models a complex project as a directed network graph of interconnected activities and milestone events to optimize project completion time, cost, and resource allocation.",
    explanation: "PNA provides mathematical models (CPM and PERT) for planning, scheduling, and controlling non-routine projects.",
    hint: "Systematic graph-based technique to schedule and control complex project tasks.",
    level: "moderate",
    codeExample: "ProjectNetwork = (V_events, E_activities, Durations, PrecedenceRelations);"
  },
  {
    question: "What distinguishes a 'Project' from routine repetitive manufacturing operations?",
    shortAnswer: "A project is a unique, non-routine endeavor with a clearly defined start date, target completion date, specific technical deliverables, complex precedence dependencies, and strict budget/resource constraints.",
    explanation: "Repetitive manufacturing is continuous and steady-state; projects are temporary and unique.",
    hint: "Unique, non-routine, defined start/finish dates, and complex precedence relationships.",
    level: "moderate",
    codeExample: "ProjectCharacteristics: { Unique: true, Temporary: true, PrecedenceDriven: true, NonRoutine: true }."
  },
  {
    question: "What is the historical origin and original objective of the Critical Path Method (CPM)?",
    shortAnswer: "Developed in 1957 by DuPont and Remington Rand Corporation (led by Morgan R. Walker and James E. Kelley Jr.) to optimize maintenance shutdowns and overhaul scheduling in chemical manufacturing plants.",
    explanation: "CPM was created for industrial plants with known deterministic task durations.",
    hint: "DuPont and Remington Rand in 1957 for chemical plant maintenance shutdowns.",
    level: "moderate",
    codeExample: "CPM_Origin: { Year: 1957, Developers: ['DuPont', 'Remington Rand'], Nature: 'Deterministic' }."
  },
  {
    question: "What is the historical origin and original objective of the Project Evaluation and Review Technique (PERT)?",
    shortAnswer: "Developed in 1958 by the US Navy Special Projects Office in partnership with Booz Allen Hamilton and Lockheed Corporation for the Polaris Fleet Ballistic Missile submarine defense program.",
    explanation: "PERT was engineered for research and development where task durations are inherently uncertain.",
    hint: "US Navy & Booz Allen Hamilton in 1958 for the Polaris Missile R&D program.",
    level: "moderate",
    codeExample: "PERT_Origin: { Year: 1958, Developers: ['US Navy', 'Booz Allen Hamilton'], Nature: 'Probabilistic' }."
  },
  {
    question: "What is the primary conceptual difference between CPM and PERT?",
    shortAnswer: "CPM is DETERMINISTIC and activity-oriented (exact known durations with time-cost trade-offs), whereas PERT is PROBABILISTIC and event-oriented (uncertain durations modeled using 3-time estimates and Beta distribution).",
    explanation: "CPM = Deterministic + Time-Cost; PERT = Probabilistic + 3 Time Estimates.",
    hint: "CPM is deterministic (known times); PERT is probabilistic (uncertain 3-time estimates).",
    level: "moderate",
    codeExample: "Comparison: CPM.nature === 'Deterministic' && PERT.nature === 'Probabilistic';"
  },
  {
    question: "What are the 3 time estimates used in PERT to model task uncertainty?",
    shortAnswer: "1. Optimistic Time (a); 2. Most Likely Time (m); 3. Pessimistic Time (b).",
    explanation: "These 3 values parameterize a continuous Beta probability distribution.",
    hint: "Optimistic (a), Most Likely (m), and Pessimistic (b).",
    level: "moderate",
    codeExample: "PERT_Estimates: { a: 'Optimistic', m: 'Most Likely', b: 'Pessimistic' };"
  },
  {
    question: "What is the standard formula for Expected Activity Duration (t_e) in PERT?",
    shortAnswer: "t_e = (a + 4m + b) / 6.",
    explanation: "Weights the most likely estimate 4 times as heavily as the extremes.",
    hint: "(a + 4m + b) / 6.",
    level: "moderate",
    codeExample: "t_e = (a + 4 * m + b) / 6;"
  },
  {
    question: "What is the standard formula for Activity Duration Variance (sigma^2) in PERT?",
    shortAnswer: "sigma^2 = ((b - a) / 6)^2.",
    explanation: "Assumes the range (b - a) covers approximately 6 standard deviations (99.7% of the distribution).",
    hint: "((b - a) / 6)^2.",
    level: "moderate",
    codeExample: "variance = Math.pow((b - a) / 6, 2);"
  },
  {
    question: "What is a 'Critical Path' in project network analysis?",
    shortAnswer: "The longest continuous sequence of dependent activities from project start to project finish, which determines the absolute MINIMUM possible time to complete the entire project.",
    explanation: "Any delay in an activity on the critical path directly delays the entire project completion date.",
    hint: "Longest continuous path of dependent activities; defines minimum project completion time.",
    level: "moderate",
    codeExample: "CriticalPath = argmax_paths(Sum(duration_i)); Slack(CriticalPath) === 0."
  },
  {
    question: "What is 'Slack' (or Float) in project management?",
    shortAnswer: "The amount of time an activity or event can be delayed without delaying the subsequent activities (Free Float) or the final project completion date (Total Float).",
    explanation: "Activities on the critical path have ZERO total float (TF = 0).",
    hint: "Allowable delay time without impacting overall project deadline.",
    level: "intermediate",
    codeExample: "TotalFloat = LatestStart - EarliestStart = LatestFinish - EarliestFinish."
  },
  {
    question: "Why are Gantt (Bar) Charts insufficient for complex multi-tier projects?",
    shortAnswer: "Gantt charts do not explicitly model complex inter-activity dependencies, precedence loops, or quantify critical path slack, making it difficult to evaluate the ripple effects of delays.",
    explanation: "Network diagrams explicitly visualize topological precedence and compute exact floats.",
    hint: "Cannot easily display complex precedence dependencies and inter-activity ripple effects.",
    level: "intermediate",
    codeExample: "Limitation: Gantt lacks explicit mathematical dependency topology."
  },
  {
    question: "Suppose Debangshu in Barrackpore is managing a blast furnace overhaul with 12 activities. What is the first step in constructing the project network?",
    shortAnswer: "Decompose the project into a Work Breakdown Structure (WBS), list all discrete activities, determine immediate predecessors, and estimate individual durations.",
    explanation: "Precedence tables are the foundational input for drawing network graphs.",
    hint: "Define WBS, list activities, determine predecessors, and assign durations.",
    level: "moderate",
    codeExample: "PrecedenceTable = activities.map(act => ({ id: act.id, predecessors: act.preds, duration: act.d }));"
  },
  {
    question: "What are the two major network drawing conventions in Project Management?",
    shortAnswer: "1. Activity-on-Arrow (AOA) / Arrow Diagrams; 2. Activity-on-Node (AON) / Precedence Diagrams.",
    explanation: "AOA uses arrows for tasks and circles for events (requires dummy arrows); AON uses boxes for tasks and arrows for dependencies (no dummy activities needed).",
    hint: "AOA (Activity on Arrow) and AON (Activity on Node).",
    level: "moderate",
    codeExample: "Conventions: ['AOA (Arrow Diagram)', 'AON (Precedence Diagram)'];"
  },
  {
    question: "What is a 'Dummy Activity' in an Activity-on-Arrow (AOA) network?",
    shortAnswer: "A fictitious, zero-duration, zero-cost directed dashed arrow used solely to establish correct precedence relationships or prevent multiple activities from sharing identical starting and ending nodes.",
    explanation: "Dummies consume neither time nor resources but maintain logical graph topology.",
    hint: "Zero-time dashed arrow used to maintain logical precedence and unique node numbering.",
    level: "moderate",
    codeExample: "DummyActivity: { duration: 0, cost: 0, isDashed: true, purpose: 'Precedence Enforcement' }."
  },
  {
    question: "What is 'Crashing' in CPM analysis?",
    shortAnswer: "The process of shortening the duration of critical activities by allocating additional resources (overtime labor, specialized machinery) at the lowest possible marginal crash cost per unit time.",
    explanation: "Crashing focuses strictly on critical path tasks to minimize total project cost (direct + indirect).",
    hint: "Shortening critical activities by spending extra resources at minimum marginal cost.",
    level: "expert",
    codeExample: "CostSlope = (CrashCost - NormalCost) / (NormalTime - CrashTime);"
  },
  {
    question: "Suppose Mamata & Mahima in Kolkata oversee an emergency hospital wing expansion. Path A takes 22 days, Path B takes 28 days, and Path C takes 19 days. What is the expected project duration?",
    shortAnswer: "28 days (the length of the longest path, Path B, which is the Critical Path).",
    explanation: "The longest path dictates the project duration.",
    hint: "28 days (the longest path).",
    level: "moderate",
    codeExample: "ProjectDuration = Math.max(22, 28, 19) = 28 days."
  },
  {
    question: "If Path B in Mamata's project is delayed by 3 days, what happens to the overall hospital handover date?",
    shortAnswer: "The handover date is delayed by EXACTLY 3 days because Path B is the Critical Path with zero slack.",
    explanation: "Critical path delays translate 1-to-1 into project completion delays.",
    hint: "Delayed by 3 days.",
    level: "moderate",
    codeExample: "ProjectDelay = Path_B_Delay = 3 days."
  },
  {
    question: "If Path A (22 days) in the same project is delayed by 4 days, what happens to the overall handover date?",
    shortAnswer: "No delay to the project! Path A had 28 - 22 = 6 days of total slack; delaying it by 4 days leaves 2 days of slack, and total project duration remains 28 days.",
    explanation: "Delays within the allowable float do not affect the final completion date.",
    hint: "No delay because the 4-day delay is less than Path A's 6 days of float.",
    level: "intermediate",
    codeExample: "Float_A = 28 - 22 = 6 days; Delay = 4 <= 6 => ProjectDuration remains 28 days."
  },
  {
    question: "What is 'Resource Leveling' in project management?",
    shortAnswer: "Shifting non-critical activities within their allowable slack periods to smooth out labor/machinery demand peaks and prevent overallocation without delaying project finish.",
    explanation: "Flattens the resource loading histogram.",
    hint: "Shifting non-critical tasks within slack to smooth peak resource demand.",
    level: "expert",
    codeExample: "ResourceLeveling = smoothHistogram(activities, slackRanges);"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating project financial investments, crashing costs, and penalties in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Total Project Budget = ₹48,50,000'"
  },
  {
    question: "What is the ultimate golden rule of Project Network Analysis?",
    shortAnswer: "'Decompose into discrete activities; map rigorous precedence topology; compute earliest/latest event times; isolate the zero-slack Critical Path; manage floats to protect the completion deadline and optimize budget in Indian Rupees (₹)!'",
    explanation: "This complete rule captures the entire philosophy of CPM and PERT.",
    hint: "Decompose activities -> Map precedence -> Calculate E & L times -> Find Critical Path -> Optimize in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: WBS() -> MapPrecedence() -> ForwardPass() -> BackwardPass() -> IsolateCriticalPath() -> Optimize(₹)."
  }
];

export default questions;
