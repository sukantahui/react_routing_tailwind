// topic12_questions.js
// 30 Comprehensive Master Review & Viva Voce Questions for Module 004_001 Critical Path Method and PERT

const questions = [
  {
    question: "What is Project Network Analysis and why is it superior to traditional Gantt Charts for complex projects?",
    shortAnswer: "Project Network Analysis mathematically models task interdependencies, precedence logic, floats, and critical paths via directed graphs, whereas traditional Gantt charts fail to explicitly highlight dependency chains or dynamic critical bottlenecks.",
    explanation: "Network analysis provides algorithmic scheduling and float calculation capabilities.",
    hint: "Models interdependencies, calculates floats, and isolates critical bottlenecks.",
    level: "moderate",
    codeExample: "NetworkAnalysis: Graphs > StaticGantt for complex interdependencies."
  },
  {
    question: "What are the 7 core mathematical assumptions underlying CPM and PERT?",
    shortAnswer: "1. Directed Acyclic Graph (DAG) topology; 2. Activity time independence; 3. Deterministic linearity in CPM crashing; 4. Beta distribution for PERT activities; 5. Central Limit Theorem for total project duration; 6. Unconstrained baseline resources; 7. Single critical path dominance.",
    explanation: "These 7 assumptions govern the theoretical validity of network scheduling.",
    hint: "DAG, independence, linear crashing, Beta/CLT, unconstrained resources, single path dominance.",
    level: "expert",
    codeExample: "Assumptions: ['DAG', 'Independence', 'LinearCrashing', 'BetaDistribution', 'CLT', 'InfiniteResources', 'PathDominance'];"
  },
  {
    question: "What is an Activity, and what are its 6 primary classifications in network modeling?",
    shortAnswer: "An Activity is a time- and resource-consuming chunk of work. Classifications: 1. Predecessor; 2. Successor; 3. Concurrent; 4. Critical (TF = 0); 5. Non-Critical (TF > 0); 6. Dummy (d = 0, cost = ₹0).",
    explanation: "Activities represent the actual physical or cognitive processes of a project.",
    hint: "Consumes time & resources. Predecessor, successor, concurrent, critical, non-critical, dummy.",
    level: "moderate",
    codeExample: "ActivityTypes: ['Predecessor', 'Successor', 'Concurrent', 'Critical', 'NonCritical', 'Dummy'];"
  },
  {
    question: "What is a Dummy Activity, and why is it required in Activity-on-Arrow (AOA) networks?",
    shortAnswer: "A fictitious activity consuming zero time (d = 0) and zero cost (₹0), drawn as a dashed arrow to enforce logical precedence or ensure unique (i, j) node pair identification for parallel activities.",
    explanation: "Dummies resolve logical and graphical ambiguities in AOA graphs.",
    hint: "Zero time/cost dashed arrow for precedence logic and unique node pairs.",
    level: "moderate",
    codeExample: "DummyActivity = { duration: 0, cost: 0, isDashed: true };"
  },
  {
    question: "What is the universal Float Hierarchy in project networks?",
    shortAnswer: "Total Float >= Free Float >= Independent Float >= 0 (TF >= FF >= IF >= 0).",
    explanation: "This inequality holds universally across all valid CPM project networks.",
    hint: "TF >= FF >= IF >= 0.",
    level: "moderate",
    codeExample: "FloatHierarchy: TF >= FF && FF >= IF && IF >= 0;"
  },
  {
    question: "What is an Event (Node), and what are the main event types?",
    shortAnswer: "An instantaneous milestone consuming zero time (d = 0) and zero resources (₹0). Types: Tail (Start), Head (Sink), Dual-Role (Intermediate), Burst (Divergence), Merge (Convergence), and Burst-and-Merge.",
    explanation: "Events mark state transitions and milestones in the project schedule.",
    hint: "Instantaneous milestone (d=0, ₹0). Tail, Head, Dual-Role, Burst, Merge.",
    level: "moderate",
    codeExample: "EventTypes: ['Tail', 'Head', 'DualRole', 'Burst', 'Merge', 'BurstAndMerge'];"
  },
  {
    question: "What is Fulkerson's Rule for node numbering?",
    shortAnswer: "A topological sorting algorithm that assigns consecutive integers to nodes such that for every directed activity (i, j), the tail node number is strictly less than the head node number (i < j).",
    explanation: "Enforces left-to-right chronological flow and eliminates circular feedback loops.",
    hint: "Ensures i < j strictly holds for all activity arcs (i, j).",
    level: "moderate",
    codeExample: "FulkersonRule: For all arcs (i, j), i < j strictly holds."
  },
  {
    question: "What are the 3 fatal graphical errors in network diagrams?",
    shortAnswer: "1. Dangling (disconnected dead-end activities); 2. Looping / Cycling (circular feedback loops); 3. Duplicate Node Pairs in AOA (connecting parallel tasks between identical nodes).",
    explanation: "These errors violate project network topology and cause algorithmic failure.",
    hint: "Dangling, Looping, and Duplicate Node Pairs.",
    level: "moderate",
    codeExample: "NetworkErrors: ['Dangling', 'Looping', 'DuplicateNodePairs'];"
  },
  {
    question: "What are the 5 phases of the Critical Path Analysis (CPA) Working Methodology?",
    shortAnswer: "1. Planning & WBS; 2. Two-Pass Network Scheduling (Forward/Backward); 3. Float & Slack Quantification; 4. Critical Path Isolation; 5. Project Crashing & Cost Optimization in Indian Rupees (₹).",
    explanation: "The complete 5-phase operational engine of project management.",
    hint: "Planning -> Two-Pass Scheduling -> Floats -> Critical Path -> Crashing in ₹.",
    level: "moderate",
    codeExample: "CPAPhases: ['Planning', 'Scheduling', 'Floats', 'CriticalPath', 'Crashing'];"
  },
  {
    question: "What are the Forward Pass equations for Earliest Event Time E_j and Activity Times (ES, EF)?",
    shortAnswer: "E_1 = 0; E_j = max(E_i + d_ij) across all incoming arcs; ES_ij = E_i; EF_ij = ES_ij + d_ij = E_i + d_ij.",
    explanation: "Takes the MAXIMUM at merge nodes because all incoming tasks must complete.",
    hint: "E_1 = 0 -> E_j = max(E_i + d_ij) -> ES = E_i -> EF = E_i + d_ij.",
    level: "moderate",
    codeExample: "ForwardPass: E[j] = Math.max(...incoming.map(a => E[a.tail] + a.d));"
  },
  {
    question: "What are the Backward Pass equations for Latest Event Time L_i and Activity Times (LS, LF)?",
    shortAnswer: "L_n = E_n; L_i = min(L_j - d_ij) across all outgoing arcs; LF_ij = L_j; LS_ij = LF_ij - d_ij = L_j - d_ij; verification: L_1 MUST = 0.",
    explanation: "Takes the MINIMUM at burst nodes to satisfy the most restrictive downstream deadline.",
    hint: "L_n = E_n -> L_i = min(L_j - d_ij) -> LF = L_j -> LS = L_j - d_ij -> L_1 = 0.",
    level: "moderate",
    codeExample: "BackwardPass: L[i] = Math.min(...outgoing.map(a => L[a.head] - a.d));"
  },
  {
    question: "What are the 3 Invariant Conditions that MUST hold simultaneously for an activity (i, j) to be Critical?",
    shortAnswer: "1. E_i = L_i (Tail event slack S_i = 0); 2. E_j = L_j (Head event slack S_j = 0); 3. E_j - E_i = L_j - L_i = d_ij (Total Float TF = 0).",
    explanation: "All three conditions must hold; condition 3 protects against the False-Criticality Trap!",
    hint: "Tail slack=0, head slack=0, and E_j - E_i = d_ij.",
    level: "expert",
    codeExample: "isCritical = (E[i]===L[i]) && (E[j]===L[j]) && (E[j]-E[i]===d_ij);"
  },
  {
    question: "What is the False-Criticality Trap?",
    shortAnswer: "The false assumption that an activity connecting two critical events (E_i = L_i and E_j = L_j) is automatically critical; if d_ij < E_j - E_i, the activity has positive float (TF > 0) and is actually non-critical!",
    explanation: "A parallel sub-path connecting two critical milestones can have float.",
    hint: "Nodes are critical, but activity duration is shorter than interval, leaving float.",
    level: "expert",
    codeExample: "Trap: E_1=0, L_1=0, E_4=12, L_4=12, d=8 => TF = 4 > 0 (Non-Critical!)."
  },
  {
    question: "What is the Critical Path and why does the LONGEST path determine the MINIMUM project duration?",
    shortAnswer: "The Critical Path is the continuous chain of zero-slack critical tasks from start to sink; because the project cannot finish until all activities complete, the longest path sets the earliest physical completion boundary.",
    explanation: "Longest sequence establishes minimum completion boundary.",
    hint: "Longest path of zero-slack tasks sets the minimum project completion time.",
    level: "moderate",
    codeExample: "ProjectDuration = maxPathLength(CriticalPath);"
  },
  {
    question: "What is the U-Shaped Total Cost curve in project duration optimization?",
    shortAnswer: "Total Cost(T) = Direct Costs (increase with crashing) + Indirect Costs (decrease with duration). The U-shaped curve reaches its minimum at the Optimal Duration T* where Cost Slope exceeds Daily Overhead.",
    explanation: "Balances overtime direct crashing expenses against daily site overhead savings.",
    hint: "Direct costs rise, indirect costs fall; total cost reaches minimum at T*.",
    level: "moderate",
    codeExample: "TotalCost = DirectCost + IndirectCost; Min at T*."
  },
  {
    question: "What is the Activity Cost Slope formula in CPM project crashing?",
    shortAnswer: "Cost Slope = (Crash Cost C_c - Normal Cost C_n) / (Normal Time T_n - Crash Time T_c) = Delta C / Delta T in Indian Rupees (₹) per Day.",
    explanation: "Measures marginal direct cost increase per day compressed.",
    hint: "(C_crash - C_normal) / (T_normal - T_crash) in ₹/day.",
    level: "moderate",
    codeExample: "CostSlope = (C_c - C_n) / (T_n - T_c);"
  },
  {
    question: "What are the 3 time estimates and Beta distribution equations in PERT?",
    shortAnswer: "Estimates: Optimistic (t_o), Most Likely (t_m), Pessimistic (t_p). Expected Duration: t_e = (t_o + 4t_m + t_p)/6; Std Dev: sigma = (t_p - t_o)/6; Variance: sigma^2 = ((t_p - t_o)/6)^2.",
    explanation: "Captures activity uncertainty under a Beta distribution.",
    hint: "t_e = (a + 4m + b)/6, sigma = (b - a)/6, variance = sigma^2.",
    level: "moderate",
    codeExample: "t_e = (to + 4*tm + tp)/6; variance = Math.pow((tp - to)/6, 2);"
  },
  {
    question: "How is the Standard Normal Z-Score computed in PERT to evaluate project deliverability probability?",
    shortAnswer: "Z = (T_S - mu_project) / sigma_project, where mu_project = sum(t_e on CP) and sigma_project = sqrt(sum(sigma^2 on CP)); probability is P(T <= T_S) = Phi(Z).",
    explanation: "Uses Central Limit Theorem to find the probability of beating target deadline T_S.",
    hint: "Z = (T_S - mu) / sqrt(sum(variances on CP)).",
    level: "moderate",
    codeExample: "Z = (TargetDate - Sum_te) / Math.sqrt(Sum_var);"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating project investments, crashing rates, and budgets in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Module 004 Master Project Budget = ₹55,00,000'"
  },
  {
    question: "What is the ultimate golden rule of the entire Critical Path Method & PERT Module?",
    shortAnswer: "'Master the 6 drawing rules with Fulkerson i < j; execute Two-Pass scheduling (Forward max, Backward min); isolate the zero-slack Critical Path avoiding the False-Criticality Trap; optimize duration at T* in Indian Rupees (₹); model R&D uncertainty via PERT 3-time Beta distributions and Z-scores!'",
    explanation: "This master synthesis captures all principles of Module 004_001.",
    hint: "Two-pass scheduling -> Zero-slack critical path -> Optimal T* crashing in ₹ -> PERT 3-time Z-scores.",
    level: "moderate",
    codeExample: "MasterGoldenRule: PNA() -> TwoPass() -> IsolateCP() -> CrashAtTStar(₹) -> PERT_ZScore()."
  }
];

export default questions;
