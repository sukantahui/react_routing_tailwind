// topic5_questions.js
// 30 Moderate to Expert Questions on Working Methodology of Critical Path Analysis

const questions = [
  {
    question: "What is the primary objective of the Working Methodology of Critical Path Analysis (CPA)?",
    shortAnswer: "To provide an end-to-end procedural framework for decomposing, scheduling, analyzing floats, identifying critical bottlenecks, and optimizing project duration and financial costs in Indian Rupees (₹).",
    explanation: "CPA integrates forward/backward passes with float analysis and time-cost trade-offs.",
    hint: "End-to-end framework to schedule tasks, identify bottlenecks, and optimize project duration and cost.",
    level: "moderate",
    codeExample: "CPA_Engine = { Phase1: 'Planning', Phase2: 'Two-Pass Scheduling', Phase3: 'Float Analysis', Phase4: 'Critical Path', Phase5: 'Crashing' };"
  },
  {
    question: "What are the 5 structured phases of the Critical Path Analysis methodology?",
    shortAnswer: "1. Planning & WBS Decomposition; 2. Network Construction & Two-Pass Computations; 3. Float & Slack Quantification; 4. Critical Path Identification; 5. Crashing & Resource Control.",
    explanation: "These 5 phases form the complete operational lifecycle of project network management.",
    hint: "Planning -> Two-Pass Scheduling -> Float Analysis -> Critical Path -> Crashing/Control.",
    level: "moderate",
    codeExample: "Phases: ['WBS Decomposition', 'Forward/Backward Pass', 'Float Analysis', 'Critical Path Isolation', 'Crashing & Optimization'];"
  },
  {
    question: "What is calculated during the Forward Pass of Critical Path Analysis?",
    shortAnswer: "The Earliest Event Times (E_j) and Earliest Activity Times (ES and EF = ES + d), setting E_1 = 0 and taking E_j = max(E_i + d_ij) at merge events.",
    explanation: "Forward pass moves from Project Start to Project Finish to establish earliest possible milestones.",
    hint: "Earliest times (E_j, ES, EF) taking the MAXIMUM at merge nodes.",
    level: "moderate",
    codeExample: "ForwardPass: E[1] = 0; E[j] = Math.max(...incoming.map(act => E[act.tail] + act.d));"
  },
  {
    question: "What is calculated during the Backward Pass of Critical Path Analysis?",
    shortAnswer: "The Latest Event Times (L_i) and Latest Activity Times (LF and LS = LF - d), setting L_n = E_n and taking L_i = min(L_j - d_ij) at burst events.",
    explanation: "Backward pass moves from Project Finish back to Project Start to establish latest allowable boundaries.",
    hint: "Latest times (L_i, LF, LS) taking the MINIMUM at burst nodes.",
    level: "moderate",
    codeExample: "BackwardPass: L[n] = E[n]; L[i] = Math.min(...outgoing.map(act => L[act.head] - act.d));"
  },
  {
    question: "What are the 3 MANDATORY mathematical conditions for an activity (i, j) to be classified as CRITICAL?",
    shortAnswer: "1. E_i = L_i (Tail event is critical); 2. E_j = L_j (Head event is critical); 3. E_j - E_i = L_j - L_i = d_ij (Total Float TF = 0).",
    explanation: "All three conditions must hold simultaneously; having E_i = L_i and E_j = L_j alone is not enough if duration d_ij < E_j - E_i!",
    hint: "Tail slack=0, Head slack=0, and E_j - E_i = d_ij.",
    level: "expert",
    codeExample: "isCriticalActivity = (E[i] === L[i]) && (E[j] === L[j]) && (E[j] - E[i] === d_ij);"
  },
  {
    question: "Why is an activity NOT necessarily critical just because its tail event and head event are both critical (E_i = L_i and E_j = L_j)?",
    shortAnswer: "Because the activity duration d_ij might be shorter than the interval between the two events (d_ij < E_j - E_i), leaving positive total float (TF = E_j - E_i - d_ij > 0).",
    explanation: "A non-critical parallel path can connect two critical milestones.",
    hint: "Duration might be shorter than event interval, leaving positive float.",
    level: "expert",
    codeExample: "Counterexample: E_1=0, L_1=0, E_4=15, L_4=15, but Activity(1,4) has d=10 => TF = 15 - 0 - 10 = 5 > 0 (Non-Critical!)."
  },
  {
    question: "How is Total Float (TF) calculated and what is its operational interpretation?",
    shortAnswer: "TF = LS - ES = LF - EF = LF - ES - d; it represents the maximum delay an activity can tolerate without delaying the final project completion date.",
    explanation: "Total float protects the master project delivery date.",
    hint: "TF = LS - ES; delay allowed without pushing back overall project deadline.",
    level: "moderate",
    codeExample: "TotalFloat = LatestStart - EarliestStart;"
  },
  {
    question: "How is Free Float (FF) calculated and what is its operational interpretation?",
    shortAnswer: "FF = E_j - E_i - d_ij; it represents the delay an activity can absorb without delaying the Earliest Start of any immediate successor activity.",
    explanation: "Free float protects immediate downstream team schedules.",
    hint: "FF = E_j - E_i - d_ij; delay allowed without affecting successor starts.",
    level: "moderate",
    codeExample: "FreeFloat = EarliestHead - EarliestTail - Duration;"
  },
  {
    question: "How is Independent Float (IF) calculated and what is its operational interpretation?",
    shortAnswer: "IF = max(0, E_j - L_i - d_ij); it represents the delay available when predecessors finish at their latest allowable times and successors start at their earliest times.",
    explanation: "Independent float is strictly local and cannot be consumed by upstream or downstream delays.",
    hint: "IF = max(0, E_j - L_i - d_ij); strictly autonomous float.",
    level: "expert",
    codeExample: "IndependentFloat = Math.max(0, EarliestHead - LatestTail - Duration);"
  },
  {
    question: "What is the mathematical hierarchy among Total, Free, and Independent Floats?",
    shortAnswer: "Total Float >= Free Float >= Independent Float >= 0.",
    explanation: "This inequality holds universally across all valid CPM networks.",
    hint: "TF >= FF >= IF >= 0.",
    level: "moderate",
    codeExample: "FloatHierarchy: TF >= FF && FF >= IF && IF >= 0;"
  },
  {
    question: "Suppose Debangshu in Barrackpore is managing a furnace overhaul with a 28-day critical path. If management demands completion in 24 days, what CPA phase is executed?",
    shortAnswer: "Phase 5: Project Crashing — identifying critical path activities with the lowest marginal Cost Slope and shortening them by 4 days at minimal extra cost in Indian Rupees (₹).",
    explanation: "Crashing shortens critical activities at lowest cost slope.",
    hint: "Phase 5 (Crashing) focusing on lowest cost slope critical tasks.",
    level: "moderate",
    codeExample: "CrashStrategy = criticalActivities.sort((a, b) => a.costSlope - b.costSlope);"
  },
  {
    question: "What is the Cost Slope formula used in CPM project crashing?",
    shortAnswer: "Cost Slope = (Crash Cost - Normal Cost) / (Normal Time - Crash Time) = Delta C / Delta T in ₹ / Day.",
    explanation: "Measures marginal direct cost increase per day compressed.",
    hint: "(Crash Cost - Normal Cost) / (Normal Time - Crash Time).",
    level: "moderate",
    codeExample: "CostSlope = (C_crash - C_normal) / (T_normal - T_crash);"
  },
  {
    question: "Why does compressing a non-critical activity waste financial budget without reducing project duration?",
    shortAnswer: "Because non-critical activities already have surplus float; shortening them only increases their float while the critical path remains unchanged, delaying the project just as before.",
    explanation: "Only shortening critical path tasks can compress overall project duration.",
    hint: "Non-critical tasks already have float; shortening them doesn't change project duration.",
    level: "intermediate",
    codeExample: "Rule: Crashing non-critical activities reduces zero days from project duration."
  },
  {
    question: "What currency symbol must ALWAYS be used when stating project investments, budgets, and crashing expenditures in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Total Optimized Project Cost = ₹38,40,000'"
  },
  {
    question: "What is the ultimate golden rule of the Critical Path Analysis Working Methodology?",
    shortAnswer: "'Decompose into WBS; execute Forward Pass (max E_j) and Backward Pass (min L_i); compute Total, Free, and Independent Floats; isolate the zero-slack Critical Path; optimize via minimal Cost Slope crashing in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all 5 phases of Critical Path Analysis.",
    hint: "WBS -> Forward/Backward passes -> Float analysis -> Isolate critical path -> Crash at lowest cost slope in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: WBS() -> ForwardPassMax() -> BackwardPassMin() -> ComputeFloats() -> IsolateCP() -> Crash(₹)."
  }
];

export default questions;
