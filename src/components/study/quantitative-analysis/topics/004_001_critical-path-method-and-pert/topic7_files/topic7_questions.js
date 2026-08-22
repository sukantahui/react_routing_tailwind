// topic7_questions.js
// 30 Moderate to Expert Questions on Latest Event Times in CPM & PERT

const questions = [
  {
    question: "What is the formal definition of Latest Event Time (L_i or T_L) in Project Network Analysis?",
    shortAnswer: "The latest allowable point in time at which event i can occur without postponing the final project completion date (L_n = E_n).",
    explanation: "L_i sets the absolute upper boundary for all incoming activities.",
    hint: "Latest allowable time an event can occur without delaying the project deadline.",
    level: "moderate",
    codeExample: "LatestEventTime = Math.min(...outgoing.map(act => L[act.head] - act.d));"
  },
  {
    question: "What is the initialization condition for the Backward Pass in any project network?",
    shortAnswer: "L_n = E_n (The latest allowable time of the final terminal sink event is set equal to its earliest completion time).",
    explanation: "Anchors the latest pass to the minimum project completion duration.",
    hint: "L_n = E_n.",
    level: "moderate",
    codeExample: "L[n] = E[n]; // Backward Pass Base Initialization"
  },
  {
    question: "What is the general mathematical formula for computing L_i in the Backward Pass?",
    shortAnswer: "L_i = min_{(i, j) in Outgoing(i)} [ L_j - d_ij ], where (i, j) are all outgoing activities originating from node i with duration d_ij.",
    explanation: "Node i must occur early enough to satisfy the most demanding outgoing path.",
    hint: "L_i = min(L_j - d_ij) across all outgoing arcs.",
    level: "moderate",
    codeExample: "L[i] = Math.min(...outgoingArcs.map(arc => L[arc.head] - arc.duration));"
  },
  {
    question: "Why MUST the MINIMUM be taken at burst events during the Backward Pass?",
    shortAnswer: "Because event i triggers multiple downstream paths; it must occur early enough to satisfy the most restrictive (tightest deadline) outgoing path, otherwise that path would be delayed.",
    explanation: "Taking the minimum guarantees all downstream branches stay on schedule.",
    hint: "Must satisfy the tightest/most restrictive downstream deadline.",
    level: "expert",
    codeExample: "BurstLogic: Event must finish early enough to satisfy ALL outgoing tasks => min(deadlines)."
  },
  {
    question: "How are Latest Finish (LF) and Latest Start (LS) of an activity (i, j) derived from Latest Event Times?",
    shortAnswer: "LF_ij = L_j (Latest Finish equals the Latest Time of the head event) and LS_ij = LF_ij - d_ij = L_j - d_ij (Latest Start).",
    explanation: "Activity latest times are anchored to their head event.",
    hint: "LF = L_j and LS = L_j - d_ij.",
    level: "moderate",
    codeExample: "LF = L[headNode]; LS = LF - duration;"
  },
  {
    question: "In what sequential order must nodes be evaluated during the Backward Pass?",
    shortAnswer: "In descending topological order of node numbers (Node n, Node n-1, ..., Node 1) moving from right to left.",
    explanation: "Ensures all downstream L_j values are already known before calculating L_i.",
    hint: "Descending topological order (n down to 1).",
    level: "intermediate",
    codeExample: "for (let i = n - 1; i >= 1; i--) { computeL(i); }"
  },
  {
    question: "Suppose Burst Node 2 originates two outgoing activities: Activity A to Node 4 (L_4 = 11, d = 6) and Activity B to Node 5 (L_5 = 15, d = 3). What is L_2?",
    shortAnswer: "L_2 = min(11 - 6, 15 - 3) = min(5, 12) = 5 days.",
    explanation: "min(5, 12) = 5.",
    hint: "5 days.",
    level: "moderate",
    codeExample: "L_2 = Math.min(11 - 6, 15 - 3) = 5;"
  },
  {
    question: "What is 'Event Slack' (S_i) and what does S_i = 0 indicate?",
    shortAnswer: "S_i = L_i - E_i; when S_i = 0 (E_i = L_i), event i is a CRITICAL EVENT with zero scheduling buffer.",
    explanation: "Critical events form the nodes of the critical path.",
    hint: "S_i = L_i - E_i; S_i = 0 means critical event.",
    level: "moderate",
    codeExample: "Slack = L[i] - E[i]; isCritical = (Slack === 0);"
  },
  {
    question: "If an outgoing activity from Node 3 is a DUMMY activity to Node 2 (L_2 = 5, d = 0), how does it contribute to L_3?",
    shortAnswer: "It contributes L_2 - 0 = 5 days to the candidate set for L_3: L_3 = min(..., 5).",
    explanation: "Dummies pass their head event latest time backward without subtracting duration.",
    hint: "Contributes L_2 - 0 = 5 days.",
    level: "moderate",
    codeExample: "dummy_candidate = L[2] - 0 = 5;"
  },
  {
    question: "What MUST the Latest Event Time of the initial start event L_1 equal in a properly solved network?",
    shortAnswer: "L_1 MUST equal 0 (E_1 = L_1 = 0), provided L_n was initialized to E_n.",
    explanation: "If L_1 != 0, an arithmetic mistake was made in the forward or backward pass.",
    hint: "L_1 must equal 0 (E_1 = L_1 = 0).",
    level: "expert",
    codeExample: "SanityCheck: L[1] === 0;"
  },
  {
    question: "Suppose Susmita in Ichapur calculates S_4 = L_4 - E_4 = 11 - 11 = 0 days. What does this mean for Node 4?",
    shortAnswer: "Node 4 is a CRITICAL EVENT; any delay in reaching Node 4 will directly delay the entire project.",
    explanation: "Zero slack indicates critical milestone.",
    hint: "Node 4 is a critical event with zero buffer.",
    level: "moderate",
    codeExample: "Event 4: Critical Event (Slack = 0)."
  },
  {
    question: "Suppose Mamata in Kolkata calculates S_5 = L_5 - E_5 = 15 - 8 = 7 days. What does this mean for Node 5?",
    shortAnswer: "Node 5 is a NON-CRITICAL EVENT; it can be delayed by up to 7 days without pushing back the project completion date.",
    explanation: "Positive slack allows flexible scheduling.",
    hint: "Non-critical event with 7 days of allowable buffer.",
    level: "moderate",
    codeExample: "Event 5: Non-critical (7 days slack)."
  },
  {
    question: "What currency symbol must ALWAYS be used when stating project financial reserves and liquidated damages in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Late Milestone Delay Penalty = ₹25,000 / day'"
  },
  {
    question: "What is the ultimate golden rule of Latest Event Time Computations?",
    shortAnswer: "'Initialize L_n = E_n; move backward from right to left; for every event i, evaluate all outgoing paths (L_j - d_ij) and select the MINIMUM; L_1 must equal 0; critical events satisfy L_i = E_i!'",
    explanation: "This complete rule captures all backward pass mechanics.",
    hint: "L_n = E_n -> Backward right to left -> Take MIN at burst nodes -> L_1 = 0 -> S_i = 0.",
    level: "moderate",
    codeExample: "GoldenRule: L_n = E_n -> L_i = min(L_j - d_ij) -> Verify L_1 === 0 -> IdentifyZeroSlack()."
  }
];

export default questions;
