// topic2_questions.js
// 30 Moderate to Expert Questions on Activity, Task or Job in CPM & PERT

const questions = [
  {
    question: "What is the formal definition of an 'Activity' in Project Network Analysis?",
    shortAnswer: "An identifiable, discrete component of work within a project that consumes measurable TIME and RESOURCES (labor, machinery, materials, and ₹ budget) with a distinct beginning and end.",
    explanation: "Activities represent the actual physical or cognitive operations executed during a project.",
    hint: "Discrete task consuming time and resources with clear start and end points.",
    level: "moderate",
    codeExample: "Activity = { id: 'A', name: 'Foundation Pouring', duration: 5, costINR: 120000, predecessors: [] };"
  },
  {
    question: "What is a 'Predecessor Activity'?",
    shortAnswer: "An activity that must be completed BEFORE a subsequent activity can begin.",
    explanation: "Immediate predecessors directly control when successor tasks can start.",
    hint: "An activity that must finish before the next activity starts.",
    level: "moderate",
    codeExample: "if (!predecessor.isFinished) { successor.canStart = false; }"
  },
  {
    question: "What is a 'Successor Activity'?",
    shortAnswer: "An activity that cannot begin until one or more predecessor activities have been fully completed.",
    explanation: "Successor tasks are locked until all upstream predecessors finish.",
    hint: "An activity that starts only after its predecessors finish.",
    level: "moderate",
    codeExample: "successor.earliestStart = Math.max(...predecessors.map(p => p.earliestFinish));"
  },
  {
    question: "What are 'Concurrent (or Parallel) Activities'?",
    shortAnswer: "Activities that can be performed simultaneously during the same timeframe because they do not have direct precedence dependencies on each other.",
    explanation: "Executing tasks in parallel shortens overall project duration.",
    hint: "Activities that can be performed simultaneously without mutual dependency.",
    level: "moderate",
    codeExample: "Concurrent: [Activity_B, Activity_C] execute in parallel after Activity_A finishes."
  },
  {
    question: "What is a 'Critical Activity'?",
    shortAnswer: "An activity situated on the critical path whose total float is EXACTLY ZERO (TF = 0); any delay in its execution causes an identical delay to the final project completion date.",
    explanation: "Critical activities have zero slack and dictate project duration.",
    hint: "Zero total float (TF = 0); delay directly delays the project deadline.",
    level: "moderate",
    codeExample: "isCritical = (activity.totalFloat === 0);"
  },
  {
    question: "What is a 'Non-Critical Activity'?",
    shortAnswer: "An activity with positive total float (TF > 0) that can absorb a delay up to its available float without postponing the final project completion date.",
    explanation: "Provides managerial flexibility for resource reallocation.",
    hint: "Has positive float (TF > 0); can be delayed without delaying the project.",
    level: "moderate",
    codeExample: "isNonCritical = (activity.totalFloat > 0);"
  },
  {
    question: "What is a 'Dummy Activity' in an Activity-on-Arrow (AOA) network?",
    shortAnswer: "A fictitious, zero-duration, zero-cost directed dashed arrow used solely to enforce logical precedence or maintain unique event numbering between parallel tasks.",
    explanation: "Consumes 0 time and ₹0 budget; indicated by a dashed line.",
    hint: "Fictitious zero-time dashed arrow used for logical precedence and unique node numbering.",
    level: "moderate",
    codeExample: "DummyActivity: { duration: 0, cost: 0, isDashed: true, purpose: 'Precedence Logic' };"
  },
  {
    question: "Why are Dummy Activities required in Activity-on-Arrow (AOA) networks?",
    shortAnswer: "1. To prevent two parallel activities from sharing identical starting and ending nodes; 2. To represent complex precedence dependencies where task C depends on A and B, but task D depends ONLY on B.",
    explanation: "AOA network rules require unique node pairs and strict dependency graphs.",
    hint: "Enforces unique node identifiers and distinct dependency paths.",
    level: "expert",
    codeExample: "ReasonsForDummy: ['Unique Node Identification', 'Grammar / Precedence Disambiguation'];"
  },
  {
    question: "Do Dummy Activities exist in Activity-on-Node (AON) networks?",
    shortAnswer: "NO! AON networks place activities in nodes and dependencies on connector arrows, completely eliminating the need for dummy activities.",
    explanation: "AON nodes have unique IDs, making dummies unnecessary.",
    hint: "No, AON eliminates dummy activities completely.",
    level: "moderate",
    codeExample: "AON_HasDummies === false;"
  },
  {
    question: "What are the 4 fundamental time parameters associated with an activity?",
    shortAnswer: "1. Earliest Start (ES); 2. Earliest Finish (EF = ES + d); 3. Latest Start (LS = LF - d); 4. Latest Finish (LF).",
    explanation: "These 4 numbers define the operational scheduling window of any task.",
    hint: "ES, EF, LS, and LF.",
    level: "moderate",
    codeExample: "ActivitySchedule: { ES: 0, EF: 5, LS: 2, LF: 7, Duration: 5 };"
  },
  {
    question: "How is Total Float (TF) calculated for an activity?",
    shortAnswer: "TF = LS - ES = LF - EF = LF - ES - d.",
    explanation: "Total float measures the maximum allowable delay without affecting the project completion date.",
    hint: "TF = LS - ES or LF - EF.",
    level: "moderate",
    codeExample: "TotalFloat = LatestStart - EarliestStart;"
  },
  {
    question: "How is Free Float (FF) calculated for an activity (i, j)?",
    shortAnswer: "FF = E_j - E_i - d_ij (where E_j is the earliest time of the head event and E_i is the earliest time of the tail event).",
    explanation: "Free float is the delay allowed without delaying the earliest start of any successor.",
    hint: "FF = E_j - E_i - d_ij.",
    level: "intermediate",
    codeExample: "FreeFloat = EarliestHeadEvent - EarliestTailEvent - Duration;"
  },
  {
    question: "How is Independent Float (IF) calculated for an activity (i, j)?",
    shortAnswer: "IF = max(0, E_j - L_i - d_ij) (where E_j is the earliest head event time and L_i is the latest tail event time).",
    explanation: "Independent float is unaffected by predecessor delays and does not affect successor starts.",
    hint: "IF = max(0, E_j - L_i - d_ij).",
    level: "expert",
    codeExample: "IndependentFloat = Math.max(0, EarliestHead - LatestTail - Duration);"
  },
  {
    question: "Suppose Debangshu in Barrackpore is scheduling 'Casting Induction Heating' with duration d = 6 days. If ES = 10 and LF = 20, what is the Total Float?",
    shortAnswer: "TF = LF - ES - d = 20 - 10 - 6 = 4 days.",
    explanation: "20 - 10 - 6 = 4 days.",
    hint: "4 days.",
    level: "moderate",
    codeExample: "TF = 20 - 10 - 6 = 4 days."
  },
  {
    question: "What currency symbol must ALWAYS be used when stating activity budgets, direct costs, and crash slopes in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Activity Direct Cost = ₹1,20,000'"
  },
  {
    question: "What is the ultimate golden rule of Activity Modeling in CPM/PERT?",
    shortAnswer: "'Define discrete work with finite time (d) and cost in Indian Rupees (₹); classify predecessors, successors, concurrent, critical, and dummy tasks; compute ES, EF, LS, LF to isolate floats!'",
    explanation: "This complete rule captures all aspects of activity analysis.",
    hint: "Define discrete tasks -> Map dependencies -> Differentiate critical vs dummy -> Compute ES/EF/LS/LF.",
    level: "moderate",
    codeExample: "GoldenRule: DefineTask() -> ClassifyPrecedence() -> ComputeTimes(ES,EF,LS,LF) -> CalculateFloats()."
  }
];

export default questions;
