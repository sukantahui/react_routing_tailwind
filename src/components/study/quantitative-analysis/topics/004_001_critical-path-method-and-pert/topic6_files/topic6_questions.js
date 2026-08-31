// topic6_questions.js
// 30 Moderate to Expert Questions on Earliest Event Times in CPM & PERT

const questions = [
  {
    question: "What is the formal definition of Earliest Event Time (E_j or T_E) in Project Network Analysis?",
    shortAnswer: "The earliest possible point in time at which event j can occur, assuming all preceding activities start at their earliest possible times and take their estimated durations without delay.",
    explanation: "E_j establishes the earliest boundary for all subsequent downstream tasks.",
    hint: "Earliest instant an event can occur when predecessors start as early as possible.",
    level: "moderate",
    codeExample: "EarliestEventTime = Math.max(...incoming.map(act => E[act.tail] + act.d));"
  },
  {
    question: "What is the initialization condition for the Forward Pass in any project network?",
    shortAnswer: "E_1 = 0 (The earliest event time of the initial project start event is set to zero).",
    explanation: "Project clock starts at time t = 0 at Node 1.",
    hint: "E_1 = 0.",
    level: "moderate",
    codeExample: "E[1] = 0; // Forward Pass Base Initialization"
  },
  {
    question: "What is the general mathematical formula for computing E_j in the Forward Pass?",
    shortAnswer: "E_j = max_{(i, j) in Incoming(j)} [ E_i + d_ij ], where (i, j) are all incoming activities entering node j with duration d_ij.",
    explanation: "Node j cannot occur until the longest incoming path reaches it.",
    hint: "E_j = max(E_i + d_ij) across all incoming arcs.",
    level: "moderate",
    codeExample: "E[j] = Math.max(...incomingArcs.map(arc => E[arc.tail] + arc.duration));"
  },
  {
    question: "Why MUST the MAXIMUM be taken at merge events during the Forward Pass?",
    shortAnswer: "Because a milestone event signifies that ALL prerequisite incoming activities are 100% finished; if a smaller value was chosen, the event would prematurely trigger before longer incoming tasks completed.",
    explanation: "Convergence requires total completion of all incoming tasks.",
    hint: "Event cannot occur until the slowest/longest incoming path finishes.",
    level: "expert",
    codeExample: "MergeLogic: Event occurs only when ALL predecessors finish => max(completion_times)."
  },
  {
    question: "How are Earliest Start (ES) and Earliest Finish (EF) of an activity (i, j) derived from Earliest Event Times?",
    shortAnswer: "ES_ij = E_i (Earliest Start equals the Earliest Time of the tail event) and EF_ij = ES_ij + d_ij = E_i + d_ij (Earliest Finish).",
    explanation: "Activity earliest times are directly anchored to their tail event.",
    hint: "ES = E_i and EF = E_i + d_ij.",
    level: "moderate",
    codeExample: "ES = E[tailNode]; EF = ES + duration;"
  },
  {
    question: "Suppose Node 4 receives two incoming activities: Activity A from Node 2 (E_2 = 8, d = 7) and Activity B from Node 3 (E_3 = 11, d = 5). What is E_4?",
    shortAnswer: "E_4 = max(8 + 7, 11 + 5) = max(15, 16) = 16 days.",
    explanation: "max(15, 16) = 16.",
    hint: "16 days.",
    level: "moderate",
    codeExample: "E_4 = Math.max(8 + 7, 11 + 5) = 16;"
  },
  {
    question: "Suppose in the example above, a third incoming activity C from Node 1 (E_1 = 0, d = 18) also terminates at Node 4. What is the updated E_4?",
    shortAnswer: "E_4 = max(15, 16, 0 + 18) = max(15, 16, 18) = 18 days.",
    explanation: "max(15, 16, 18) = 18.",
    hint: "18 days.",
    level: "moderate",
    codeExample: "E_4 = Math.max(15, 16, 18) = 18;"
  },
  {
    question: "In what sequential order must nodes be evaluated during the Forward Pass?",
    shortAnswer: "In ascending topological order of node numbers (Node 1, Node 2, ..., Node n) as established by Fulkerson's rule.",
    explanation: "Ensures all prerequisite E_i values are already computed before evaluating E_j.",
    hint: "Ascending topological order (1 to n).",
    level: "intermediate",
    codeExample: "for (let j = 2; j <= n; j++) { computeE(j); }"
  },
  {
    question: "What does the Earliest Event Time of the terminal sink event E_n represent?",
    shortAnswer: "The absolute minimum duration required to complete the entire project under normal operating conditions.",
    explanation: "E_n is the expected project completion duration.",
    hint: "Total minimum project completion duration.",
    level: "moderate",
    codeExample: "ProjectDuration = E[n];"
  },
  {
    question: "If an incoming activity to Node 5 is a DUMMY activity from Node 3 (E_3 = 14, d = 0), how does it contribute to E_5?",
    shortAnswer: "It contributes E_3 + 0 = 14 days to the candidate set for E_5: E_5 = max(..., 14).",
    explanation: "Dummies have duration 0 but pass forward their tail event time.",
    hint: "Contributes E_3 + 0 = 14 days.",
    level: "moderate",
    codeExample: "dummy_candidate = E[3] + 0 = 14;"
  },
  {
    question: "Suppose Debangshu in Barrackpore finds E_7 = 28 days for a blast furnace overhaul. If the client offers an incentive for early finish, can the project finish before day 28 without crashing?",
    shortAnswer: "No! E_7 = 28 days is the absolute theoretical lower bound under normal durations; finishing earlier requires crashing critical activities.",
    explanation: "Forward pass establishes the earliest physical lower bound.",
    hint: "No, E_n is the absolute earliest finish without crashing.",
    level: "moderate",
    codeExample: "MinimumFeasibleDuration = E[n] = 28 days."
  },
  {
    question: "Can an Earliest Event Time E_j ever decrease during execution if a predecessor finishes early?",
    shortAnswer: "Yes! If the actual duration of the bottleneck incoming activity is shortened, the actual realized event time can occur earlier than originally planned.",
    explanation: "Realized milestones adjust dynamically based on actual task durations.",
    hint: "Yes, actual event occurrence shifts forward if critical predecessors beat their estimates.",
    level: "intermediate",
    codeExample: "ActualEventTime = Math.max(...actualCompletionTimes);"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating project milestone funding schedules in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Milestone E_4 Funding Disbursement = ₹15,00,000'"
  },
  {
    question: "What is the ultimate golden rule of Earliest Event Time Computations?",
    shortAnswer: "'Initialize E_1 = 0; move forward from left to right; for every event j, evaluate all incoming paths (E_i + d_ij) and select the MAXIMUM; E_n defines the certified minimum project duration in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all forward pass mechanics.",
    hint: "E_1 = 0 → Forward left to right → Take MAX at merge nodes → E_n = Project Duration.",
    level: "moderate",
    codeExample: "GoldenRule: E_1 = 0 → E_j = max(E_i + d_ij) → ProjectDuration = E_n."
  }
];

export default questions;
