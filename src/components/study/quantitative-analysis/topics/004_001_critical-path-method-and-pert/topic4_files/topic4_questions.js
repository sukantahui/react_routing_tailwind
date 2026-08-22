// topic4_questions.js
// 30 Moderate to Expert Questions on Network or Arrow Diagram in CPM & PERT

const questions = [
  {
    question: "What is a Network Diagram (or Arrow Diagram) in Operations Research?",
    shortAnswer: "A directed graph consisting of nodes (events) and interconnected arrows (activities) that visually and mathematically models the logical sequence, precedence dependencies, and timeline of a project.",
    explanation: "Network diagrams form the core graphical foundation of CPM and PERT analysis.",
    hint: "Directed graph of nodes and arrows displaying task precedence and sequence.",
    level: "moderate",
    codeExample: "NetworkDiagram = { Nodes: [1, 2, 3, 4], Edges: [{ from: 1, to: 2, label: 'A', d: 5 }] };"
  },
  {
    question: "What is the 'Single Start and End Node' rule in network construction?",
    shortAnswer: "Every project network must have EXACTLY ONE initial starting event (indegree = 0) and EXACTLY ONE final terminal sink event (outdegree = 0).",
    explanation: "Multiple disconnected start or end nodes violate project network topology.",
    hint: "Exactly one starting node and one terminal ending node.",
    level: "moderate",
    codeExample: "ValidateNetwork: StartNodes.length === 1 && EndNodes.length === 1;"
  },
  {
    question: "What is 'Dangling' in a network diagram?",
    shortAnswer: "An error where an activity or node is left disconnected from the main network flow, failing to connect to the terminal sink event.",
    explanation: "Dangling creates orphaned paths that miscalculate project duration.",
    hint: "An activity disconnected from the project's terminal completion event.",
    level: "moderate",
    codeExample: "DanglingError: An activity terminates at an isolated node that does not reach the sink."
  },
  {
    question: "What is 'Looping' (or Cycling) in a network diagram?",
    shortAnswer: "An error where a sequence of activities forms a closed circular loop returning to a previously visited node (e.g. 1 ➔ 2 ➔ 3 ➔ 1).",
    explanation: "Looping creates infinite cycle times and violates the Directed Acyclic Graph (DAG) requirement.",
    hint: "A circular path returning to a prior node, creating an infinite loop.",
    level: "moderate",
    codeExample: "LoopingError: Path leads back to a previously visited ancestor node."
  },
  {
    question: "Why can't two activities in an Activity-on-Arrow (AOA) network share the exact same starting and ending nodes?",
    shortAnswer: "Because in AOA, each activity is uniquely identified by its tail and head node pair (i, j); sharing the same node pair creates mathematical ambiguity in task tracking and matrix representation.",
    explanation: "Use a dummy activity to split parallel tasks into unique node pairs (e.g. (1, 2) and (1, 3) with a dummy from 3 to 2).",
    hint: "Violates unique (i, j) identification; resolved using a dummy node and arrow.",
    level: "expert",
    codeExample: "DuplicateEdgeError: Two activities have identical (tail, head) node pairs."
  },
  {
    question: "What is a 'Redundant Dummy Activity'?",
    shortAnswer: "A dummy activity that provides no necessary logical precedence constraint and can be removed without altering the topological dependencies of the network.",
    explanation: "Excess dummies clutter the network and add unnecessary computational steps.",
    hint: "An unnecessary dummy arrow that does not enforce any unique precedence.",
    level: "intermediate",
    codeExample: "RedundantDummy: Dummy (2, 3) when Activity (2, 4) and (3, 4) already enforce the constraint."
  },
  {
    question: "What are the standard conventions for arrow directions in network diagrams?",
    shortAnswer: "Arrows should flow generally from LEFT TO RIGHT, representing the natural forward progression of chronological time; backward-pointing arrows should be avoided.",
    explanation: "Left-to-right flow maintains clarity and complies with Fulkerson numbering.",
    hint: "Arrows flow from left to right, reflecting forward passage of time.",
    level: "moderate",
    codeExample: "FlowDirection: Left-to-Right chronological progression."
  },
  {
    question: "Suppose Task C depends on Task A and Task B, but Task D depends ONLY on Task B. How is this represented in an AOA diagram?",
    shortAnswer: "Draw Task A terminating at Node 3 and Task B terminating at Node 2. Draw a DASHED DUMMY arrow from Node 2 to Node 3. Task C starts from Node 3, and Task D starts directly from Node 2.",
    explanation: "The dummy from 2 to 3 gives C both A and B, while D receives only B.",
    hint: "Dummy from Node 2 (end of B) to Node 3 (end of A); C starts from 3, D starts from 2.",
    level: "expert",
    codeExample: "PrecedenceGrammar: A -> Node 3; B -> Node 2; Dummy(2 -> 3); C starts at 3; D starts at 2."
  },
  {
    question: "What is a 'Burst' in a network diagram?",
    shortAnswer: "A single node from which multiple outgoing activity arrows diverge into parallel execution paths.",
    explanation: "Node outdegree > 1.",
    hint: "Single node branching into multiple outgoing task arrows.",
    level: "moderate",
    codeExample: "BurstNode: Outdegree > 1."
  },
  {
    question: "What is a 'Merge' in a network diagram?",
    shortAnswer: "A single node into which multiple incoming activity arrows converge from parallel upstream paths.",
    explanation: "Node indegree > 1.",
    hint: "Single node receiving multiple incoming task arrows.",
    level: "moderate",
    codeExample: "MergeNode: Indegree > 1."
  },
  {
    question: "Suppose Debangshu in Barrackpore is constructing an AOA diagram. Task 1 (d = 4) and Task 2 (d = 6) both start at Project Kickoff (Node 1) and are both required before Task 3 can begin. How should he draw this?",
    shortAnswer: "Draw Task 1 from Node 1 to Node 2, Task 2 from Node 1 to Node 3, a dummy arrow from Node 2 to Node 3, and Task 3 originating from Node 3.",
    explanation: "Prevents Tasks 1 and 2 from sharing both Node 1 and Node 2 simultaneously.",
    hint: "Split nodes with a dummy arrow from Node 2 to Node 3; Task 3 starts at Node 3.",
    level: "moderate",
    codeExample: "Topology: 1 --Task 1--> 2; 1 --Task 2--> 3; 2 --Dummy--> 3; 3 --Task 3--> 4."
  },
  {
    question: "How does an Activity-on-Node (AON) diagram compare with an Activity-on-Arrow (AOA) diagram?",
    shortAnswer: "AON places activities inside node boxes and uses connector arrows purely for dependencies (zero dummies required), whereas AOA places activities on arrows and uses circular event nodes (requires dummies for parallel/complex logic).",
    explanation: "AON is widely used in modern project management software like MS Project and Primavera.",
    hint: "AON uses boxes for activities (no dummies needed); AOA uses arrows for activities.",
    level: "intermediate",
    codeExample: "AON_vs_AOA: AON.requiresDummies === false && AOA.requiresDummies === true;"
  },
  {
    question: "What should an operations manager do if two arrows cross each other in a complex network diagram?",
    shortAnswer: "Redraw the network layout to eliminate crossings, or use a smooth 'bridge' (semicircular arc) over the intersected arrow to maintain visual clarity.",
    explanation: "Minimizing crossovers prevents misinterpreting intersecting lines as shared nodes.",
    hint: "Reorganize node positions or use a bridge arc to clarify crossing lines.",
    level: "moderate",
    codeExample: "LineCrossing: Use bridge arc or re-layout nodes."
  },
  {
    question: "What currency symbol must ALWAYS be used when stating project network budgets and cost schedules in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Project Network Budget = ₹45,00,000'"
  },
  {
    question: "What is the ultimate golden rule of Drawing Network Diagrams in CPM/PERT?",
    shortAnswer: "'Ensure single start and single sink nodes; maintain left-to-right flow; eliminate dangling and looping errors; enforce unique node pairs via necessary dummies; verify Fulkerson numbering i < j!'",
    explanation: "This complete rule captures all drawing and validation protocols.",
    hint: "Single start/end -> Left-to-right flow -> No dangling/looping -> Use dummies correctly -> Number i < j.",
    level: "moderate",
    codeExample: "GoldenRule: SingleStartEnd() -> NoDangling() -> NoLooping() -> DisambiguateDummies() -> FulkersonOrder()."
  }
];

export default questions;
