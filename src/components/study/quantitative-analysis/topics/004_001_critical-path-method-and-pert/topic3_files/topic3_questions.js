// topic3_questions.js
// 30 Moderate to Expert Questions on Event, Node or Connector in CPM & PERT

const questions = [
  {
    question: "What is the formal definition of an 'Event' (or Node) in Project Network Analysis?",
    shortAnswer: "An instantaneous point in time marking the beginning or completion of one or more activities, consuming ZERO time and ZERO resources.",
    explanation: "Events are milestones or state transitions that occur at an instant in time.",
    hint: "Instantaneous milestone consuming zero time and zero resources.",
    level: "moderate",
    codeExample: "Event = { id: 1, name: 'Foundation Completed', timeConsumed: 0, costConsumed: 0 };"
  },
  {
    question: "What is a 'Tail Event' (or Initial Event)?",
    shortAnswer: "The starting milestone of a project or activity that has NO incoming arrows (Indegree = 0) and marks the commencement of project work.",
    explanation: "Tail events mark beginning milestones.",
    hint: "Starting event with zero incoming arrows (Indegree = 0).",
    level: "moderate",
    codeExample: "isTailEvent = (event.inDegree === 0);"
  },
  {
    question: "What is a 'Head Event' (or Terminal / Sink Event)?",
    shortAnswer: "The final milestone of a project or activity that has NO outgoing arrows (Outdegree = 0) and marks the total completion of project deliverables.",
    explanation: "Terminal sink event where all project activities terminate.",
    hint: "Final event with zero outgoing arrows (Outdegree = 0).",
    level: "moderate",
    codeExample: "isHeadEvent = (event.outDegree === 0);"
  },
  {
    question: "What is a 'Dual-Role Event'?",
    shortAnswer: "An intermediate event that simultaneously serves as the completion (head) milestone for preceding activities and the commencement (tail) milestone for succeeding activities.",
    explanation: "Most internal network nodes are dual-role events.",
    hint: "Serves as head event for predecessors and tail event for successors.",
    level: "moderate",
    codeExample: "isDualRole = (event.inDegree > 0 && event.outDegree > 0);"
  },
  {
    question: "What is a 'Burst Event' in a network diagram?",
    shortAnswer: "An event from which MULTIPLE outgoing activities originate (branching outward / divergence).",
    explanation: "Represents a milestone enabling multiple parallel downstream work streams.",
    hint: "An event with multiple outgoing activities (Outdegree > 1).",
    level: "moderate",
    codeExample: "isBurstEvent = (event.outDegree > 1);"
  },
  {
    question: "What is a 'Merge Event' in a network diagram?",
    shortAnswer: "An event into which MULTIPLE incoming activities converge and terminate.",
    explanation: "Represents a convergence milestone that cannot occur until all incoming tasks finish.",
    hint: "An event with multiple incoming activities (Indegree > 1).",
    level: "moderate",
    codeExample: "isMergeEvent = (event.inDegree > 1);"
  },
  {
    question: "What is Fulkerson's Rule for numbering network nodes?",
    shortAnswer: "A systematic algorithm that numbers nodes such that for every directed activity (i, j), the tail node number is strictly less than the head node number (i < j).",
    explanation: "Eliminates backward arrow numbering and enforces topological sorting.",
    hint: "Numbering rule ensuring tail number i is always less than head number j (i < j).",
    level: "moderate",
    codeExample: "FulkersonRule: For all activities (i, j), i < j strictly holds."
  },
  {
    question: "What are the 4 procedural steps of Fulkerson's Node Numbering Algorithm?",
    shortAnswer: "1. Find the initial event (indegree = 0) and label it 1; 2. Delete all outgoing arrows from event 1; 3. Identify all newly created nodes with indegree = 0 and number them consecutively (2, 3, ...); 4. Repeat until the terminal sink node is numbered.",
    explanation: "Guarantees proper topological ordering across the entire network graph.",
    hint: "Number start node 1 → delete outgoing arrows → number new indegree 0 nodes → repeat.",
    level: "expert",
    codeExample: "FulkersonAlgorithm: while (unassignedNodes.length) { assignNextRank(); removeOutgoingEdges(); }"
  },
  {
    question: "What is Earliest Event Time (E_j or T_E) and how is it calculated?",
    shortAnswer: "The earliest possible time that event j can occur, computed via the Forward Pass: E_j = max_i (E_i + d_ij) across all incoming activities (i, j).",
    explanation: "Because event j cannot happen until ALL incoming tasks finish, the maximum determines E_j.",
    hint: "E_j = max(E_i + d_ij) via Forward Pass.",
    level: "moderate",
    codeExample: "E_j = Math.max(...incoming.map(act => E[act.tail] + act.duration));"
  },
  {
    question: "What is Latest Event Time (L_i or T_L) and how is it calculated?",
    shortAnswer: "The latest possible time that event i can occur without delaying the overall project finish, computed via the Backward Pass: L_i = min_j (L_j - d_ij) across all outgoing activities (i, j).",
    explanation: "The minimum time boundary protects all outgoing downstream paths.",
    hint: "L_i = min(L_j - d_ij) via Backward Pass.",
    level: "moderate",
    codeExample: "L_i = Math.min(...outgoing.map(act => L[act.head] - act.duration));"
  },
  {
    question: "What is 'Event Slack' (S_i)?",
    shortAnswer: "The difference between the latest event time and earliest event time: S_i = L_i - E_i.",
    explanation: "Event slack measures allowable delay for that milestone.",
    hint: "S_i = L_i - E_i.",
    level: "moderate",
    codeExample: "EventSlack = LatestEventTime - EarliestEventTime;"
  },
  {
    question: "What characterizes a 'Critical Event'?",
    shortAnswer: "An event whose slack is EXACTLY ZERO: S_i = L_i - E_i = 0 (E_i = L_i).",
    explanation: "Critical events lie on the critical path and have zero schedule buffer.",
    hint: "Slack is zero (E_i = L_i).",
    level: "moderate",
    codeExample: "isCriticalEvent = (E_i === L_i);"
  },
  {
    question: "Can an event be both a Burst Event and a Merge Event simultaneously?",
    shortAnswer: "Yes! A 'Burst-and-Merge' event has multiple incoming arrows (indegree > 1) and multiple outgoing arrows (outdegree > 1).",
    explanation: "Occurs when multiple parallel tasks finish at a milestone that triggers multiple new tasks.",
    hint: "Yes, when multiple activities enter and multiple activities leave.",
    level: "intermediate",
    codeExample: "isBurstAndMerge = (inDegree > 1 && outDegree > 1);"
  },
  {
    question: "Suppose Debangshu in Barrackpore is evaluating Merge Event 5 with incoming activities: A (from Node 2, E_2 = 8, d = 6) and B (from Node 3, E_3 = 10, d = 7). What is E_5?",
    shortAnswer: "E_5 = max(8 + 6, 10 + 7) = max(14, 17) = 17 days.",
    explanation: "max(14, 17) = 17 days.",
    hint: "E_5 = max(14, 17) = 17 days.",
    level: "moderate",
    codeExample: "E_5 = Math.max(8 + 6, 10 + 7) = 17;"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating project milestone costs in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Milestone 4 Capital Expenditure = ₹32,00,000'"
  },
  {
    question: "What is the ultimate golden rule of Event & Node Modeling in CPM/PERT?",
    shortAnswer: "'Events consume 0 time and ₹0 cost; apply Fulkerson's rule so i < j; compute E_j via Forward Pass (max) and L_i via Backward Pass (min); critical events satisfy E_i = L_i!'",
    explanation: "This complete rule captures all mechanics of event analysis.",
    hint: "Events consume 0 time/cost → Fulkerson i < j → Forward Pass max → Backward Pass min → Slack = 0.",
    level: "moderate",
    codeExample: "GoldenRule: FulkersonNumbering() → ForwardPassMax() → BackwardPassMin() → IsolateZeroSlack()."
  }
];

export default questions;
