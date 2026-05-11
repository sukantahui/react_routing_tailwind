// File: src/components/topics/Topic1/topic1_files/topic1_questions.js

const questions = [
  {
    question: "What is the shortest path problem in graph theory?",
    shortAnswer: "Finding a path between two nodes such that the sum of edge weights is minimized.",
    explanation: "It's a fundamental optimization problem with applications in routing, GPS, and network design. Algorithms like Dijkstra, Bellman‑Ford, and Floyd‑Warshall solve different variants.",
    hint: "Think of the cheapest/fastest route between two cities.",
    level: "basic",
    codeExample: "Dijkstra's algorithm pseudocode"
  },
  {
    question: "What are the key requirements for Dijkstra's algorithm to work correctly?",
    shortAnswer: "Non‑negative edge weights and a connected graph.",
    explanation: "Dijkstra assumes that once a node is marked 'visited' with the smallest distance, no shorter path can be found later. Negative weights break this invariant.",
    hint: "Why can't we have negative road lengths?",
    level: "basic",
    codeExample: "Edge weights must be >= 0"
  },
  {
    question: "Explain the concept of 'relaxation' in Dijkstra's algorithm.",
    shortAnswer: "Updating the distance to a node if a shorter path is discovered via the current node.",
    explanation: "When processing a node u, for each neighbor v, if dist[u] + w(u,v) < dist[v], we update dist[v] to the smaller value. This gradually improves the best known distances.",
    hint: "Loosening the constraint until you find the best possible.",
    level: "intermediate",
    codeExample: "if (dist[u] + weight < dist[v]) dist[v] = dist[u] + weight;"
  },
  {
    question: "What data structure is most efficient for implementing Dijkstra, and why?",
    shortAnswer: "A min‑priority queue (binary heap). It extracts the minimum distance node in O(log V) time.",
    explanation: "Using an array gives O(V²) which is fine for dense graphs, but a heap reduces the complexity to O((V+E) log V) for sparse graphs, which is typical for networks.",
    hint: "You need to repeatedly pick the smallest unvisited distance.",
    level: "intermediate",
    codeExample: "Java: PriorityQueue<Node>; Python: heapq"
  },
  {
    question: "What is the time complexity of Dijkstra using a binary heap?",
    shortAnswer: "O((V + E) log V).",
    explanation: "Each vertex is extracted once (O(V log V)), each edge may trigger a decrease‑key operation (O(E log V)). Together, O((V+E) log V).",
    hint: "Logarithmic comes from heap operations.",
    level: "intermediate",
    codeExample: "Complexity analysis"
  },
  {
    question: "Why does Dijkstra fail with negative edge weights? Give an example.",
    shortAnswer: "Because a negative edge could create a shorter path to an already finalized node.",
    explanation: "Once a node is marked visited, Dijkstra assumes its distance is final. With negative weights, a later node might offer a shorter path through the visited node, but it's ignored.",
    hint: "A detour that goes through a 'finished' node but with a negative shortcut.",
    level: "expert",
    codeExample: "Graph: A->B (1), A->C (4), C->B (-2). Dijkstra from A would finalize B with distance 1, but the path A->C->B gives 2, which is actually larger; wait, negative example: B->C -10? Better to show a classic counterexample."
  },
  {
    question: "Which algorithm should you use when negative edge weights exist?",
    shortAnswer: "Bellman‑Ford algorithm.",
    explanation: "Bellman‑Ford relaxes all edges V-1 times and can detect negative cycles. It works with negative weights but is slower: O(V*E).",
    hint: "Ford’s algorithm can handle debts or discounts.",
    level: "intermediate",
    codeExample: "Bellman‑Ford pseudocode"
  },
  {
    question: "What is the difference between Dijkstra and the A* algorithm?",
    shortAnswer: "A* uses a heuristic to guide the search toward the target, often faster than Dijkstra.",
    explanation: "Dijkstra explores equally in all directions. A* adds an estimated cost to the goal (e.g., straight‑line distance), so it explores fewer nodes. A* is optimal if the heuristic is admissible.",
    hint: "A* is like Dijkstra with a compass pointing to the destination.",
    level: "expert",
    codeExample: "A* uses f(n) = g(n) + h(n)"
  },
  {
    question: "How is Dijkstra's algorithm used in OSPF routing?",
    shortAnswer: "Each router builds a link‑state database of the whole network, then runs Dijkstra to compute the shortest path tree to all destinations.",
    explanation: "OSPF routers flood Link State Advertisements (LSAs). Every router gets the identical map, runs SPF (Dijkstra), and populates its routing table.",
    hint: "Every router draws the same map and solves the puzzle independently.",
    level: "intermediate",
    codeExample: "'show ip ospf database' and 'show ip route ospf'"
  },
  {
    question: "What is the 'count‑to‑infinity' problem? Does Dijkstra suffer from it?",
    shortAnswer: "No, Dijkstra is not a distance‑vector algorithm; it uses global topology, so count‑to‑infinity does not occur.",
    explanation: "Count‑to‑infinity affects distance‑vector protocols like RIP. Link‑state protocols (OSPF with Dijkstra) converge quickly because each router has full topology.",
    hint: "Dijkstra works from a complete map, not rumor‑based updates.",
    level: "expert",
    codeExample: "Compare RIP (distance‑vector) vs OSPF (link‑state)."
  },
  {
    question: "What does 'shortest path tree' mean in the context of a router?",
    shortAnswer: "A tree rooted at the router showing the best path to every other node.",
    explanation: "After running Dijkstra, a router obtains a tree where the root is itself, and each node's parent is the next hop toward that destination. The tree is loop‑free and optimal.",
    hint: "Like a family tree with the router as ancestor.",
    level: "intermediate",
    codeExample: "Output of 'show ip ospf border-routers'"
  },
  {
    question: "Can Dijkstra handle graphs with zero‑weight edges?",
    shortAnswer: "Yes, Dijkstra works correctly with zero‑weight edges.",
    explanation: "Zero weight does not violate the non‑negative requirement. The algorithm still finalizes nodes in non‑decreasing distance order.",
    hint: "A free toll road doesn't break the algorithm.",
    level: "basic",
    codeExample: "Edge weight 0 is allowed."
  },
  {
    question: "What is the main disadvantage of Dijkstra compared to Bellman‑Ford?",
    shortAnswer: "Dijkstra cannot handle negative weights; Bellman‑Ford can, but it's slower.",
    explanation: "Bellman‑Ford is O(VE), which is fine for small graphs but too slow for large networks. Dijkstra is much faster but requires non‑negative weights.",
    hint: "Trade‑off between speed and generality.",
    level: "intermediate",
    codeExample: "Use Bellman‑Ford if you suspect negative edges."
  },
  {
    question: "What is the 'priority queue decrease‑key' operation, and why is it needed?",
    shortAnswer: "It updates the key (distance) of an existing element in the priority queue to a smaller value.",
    explanation: "When a better distance to a node is found, you need to reorder that node in the min‑heap. Some implementations just push a new entry and ignore stale ones.",
    hint: "Like upgrading a ticket to a higher priority.",
    level: "expert",
    codeExample: "heap.decrease_key(node, new_distance)"
  },
  {
    question: "How do you reconstruct the actual shortest path after running Dijkstra?",
    shortAnswer: "Store a 'previous' array that records the predecessor for each node when a distance is relaxed.",
    explanation: "Whenever dist[v] is improved, set prev[v] = u. After the algorithm finishes, backtrack from the target to source using prev[].",
    hint: "Leave breadcrumbs every time you find a better route.",
    level: "basic",
    codeExample: "prev[neighbor] = current;"
  },
  {
    question: "What is the Floyd‑Warshall algorithm and when would you use it instead of Dijkstra?",
    shortAnswer: "Floyd‑Warshall finds shortest paths between all pairs of nodes in O(V³). Use it for small, dense graphs.",
    explanation: "Dijkstra run from each vertex gives O(V(V+E) log V), which is faster for sparse graphs. Floyd‑Warshall is simpler to code and works with negative weights (no negative cycles).",
    hint: "All‑pairs vs single‑source.",
    level: "expert",
    codeExample: "for k in range(V): for i in range(V): for j in range(V): dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])"
  },
  {
    question: "What is the 'shortest path tree' in OSPF?",
    shortAnswer: "The result of Dijkstra's algorithm: a tree providing the best route from the router to all destinations.",
    explanation: "Each OSPF router builds its own SPT. The tree may differ per router (different root), but all are consistent with the same link‑state database.",
    hint: "Rooted at 'me'.",
    level: "intermediate",
    codeExample: "OSPF SPF calculation"
  },
  {
    question: "Can Dijkstra be used for routing in a network with asymmetric link costs?",
    shortAnswer: "Yes, asymmetric weights are fine as long as they are non‑negative.",
    explanation: "The graph can be directed. Dijkstra works on directed graphs without any change. In real networks, costs can be asymmetric due to different policies or metrics.",
    hint: "It's okay if going from A to B costs 5, but B to A costs 10.",
    level: "intermediate",
    codeExample: "Directed edges with weights"
  },
  {
    question: "What is the difference between 'link‑state' and 'distance‑vector' in the context of shortest path algorithms?",
    shortAnswer: "Link‑state uses full topology and Dijkstra; distance‑vector uses neighbour tables and Bellman‑Ford equation.",
    explanation: "OSPF (link‑state) distributes maps and runs Dijkstra locally. RIP (distance‑vector) shares distance vectors and updates routes iteratively, which can be slower.",
    hint: "Map vs rumors.",
    level: "intermediate",
    codeExample: "OSPF vs RIP"
  },
  {
    question: "What happens to Dijkstra's algorithm if you run it on a graph with a negative cycle reachable from the source?",
    shortAnswer: "There is no finite shortest path because you can loop indefinitely to reduce cost. Dijkstra may never terminate or produce wrong results.",
    explanation: "Dijkstra was not designed for negative edges; it may go into an infinite loop trying to improve distances. Bellman‑Ford can detect negative cycles.",
    hint: "An infinite money glitch – the algorithm gets confused.",
    level: "expert",
    codeExample: "Graph with negative cycle: A→B (1), B→A (-2)."
  },
  {
    question: "What is 'equal‑cost multi‑path' (ECMP) and how does it relate to shortest path algorithms?",
    shortAnswer: "ECMP allows multiple next‑hops when there are several shortest paths with equal cost.",
    explanation: "Dijkstra often finds multiple paths with same total weight. Routers use ECMP to load‑balance traffic across those paths, increasing throughput.",
    hint: "Two roads of same length – use both.",
    level: "expert",
    codeExample: "OSPF max‑paths 4"
  },
  {
    question: "How can you modify Dijkstra to handle maximum reliability instead of minimum cost?",
    shortAnswer: "Use negative logarithm of reliability as edge weight, then run Dijkstra.",
    explanation: "Reliability multiplication becomes sum of logarithms, and maximizing reliability is equivalent to minimizing the negative log. Ensure edges are non‑negative after transformation.",
    hint: "Convert multiplication to addition via logs.",
    level: "expert",
    codeExample: "weight = -log(reliability)"
  },
  {
    question: "What is the 'bidirectional Dijkstra' algorithm?",
    shortAnswer: "Run Dijkstra simultaneously from source and target until the two search frontiers meet.",
    explanation: "It can be much faster on large graphs because the search volume is reduced (two smaller balls instead of one large one). Common in GPS navigation.",
    hint: "Start from both ends and meet in the middle.",
    level: "expert",
    codeExample: "Used in Google Maps routing"
  },
  {
    question: "Why is Dijkstra considered a 'greedy' algorithm?",
    shortAnswer: "It always picks the unvisited node with the smallest distance, assuming it is optimal.",
    explanation: "Greedy algorithms make locally optimal choices. Dijkstra's choice turns out to be globally optimal because of non‑negative weights.",
    hint: "Take what seems best now, and it works out.",
    level: "basic",
    codeExample: "Greedy property: smallest distance node is finalized."
  },
  {
    question: "What is the role of the 'tentative distance' in Dijkstra?",
    shortAnswer: "The best known distance to a node that has not yet been finalized.",
    explanation: "Until a node is extracted from the priority queue, its distance is tentative. Once extracted, it becomes permanent (for non‑negative weights).",
    hint: "A provisional label that may be improved.",
    level: "basic",
    codeExample: "dist[] array"
  },
  {
    question: "What is a 'heuristic' in pathfinding, and does Dijkstra use one?",
    shortAnswer: "No, Dijkstra does not use a heuristic; it's uninformed. A* uses a heuristic to guide search.",
    explanation: "Heuristics estimate cost to goal. Dijkstra treats all directions equally, so it explores many nodes. With a good heuristic, A* can be much faster.",
    hint: "Dijkstra is blind; A* has a compass.",
    level: "intermediate",
    codeExample: "A* uses f = g + h"
  },
  {
    question: "What is the consequence of using a FIFO queue instead of a priority queue for Dijkstra?",
    shortAnswer: "The algorithm degenerates into a BFS‑like traversal, producing incorrect distances.",
    explanation: "Without the min‑heap, you may process nodes out of order, leading to distances that are not yet final. The algorithm would not guarantee shortest paths.",
    hint: "You must always pick the smallest tentative distance.",
    level: "expert",
    codeExample: "This would be essentially the Bellman‑Ford with a queue (SPFA)."
  },
  {
    question: "Explain how Dijkstra's algorithm can be parallelized.",
    shortAnswer: "By partitioning the graph or using concurrent priority queues and synchronising distance updates.",
    explanation: "Parallel Dijkstra is challenging because the relaxation order is not fixed. Techniques include Δ‑stepping, which processes nodes in buckets of small weight increments.",
    hint: "Divide the graph into regions and compute intra‑region paths first.",
    level: "expert",
    codeExample: "Δ‑stepping algorithm"
  },
  {
    question: "What is the 'shortest path first' (SPF) computation in OSPF?",
    shortAnswer: "It's exactly Dijkstra's algorithm applied to the link‑state database.",
    explanation: "OSPF calls it SPF. It runs every time there is a topology change (LSA update) and produces the routing table.",
    hint: "SPF = Dijkstra.",
    level: "basic",
    codeExample: "RouterOS command: '/routing ospf spf-trigger'"
  },
  {
    question: "How does Dijkstra handle graphs that are not fully connected?",
    shortAnswer: "Nodes that are unreachable remain with infinite distance.",
    explanation: "The algorithm works fine; any node not reachable will never have its distance lowered from infinity. The priority queue will eventually empty without processing them.",
    hint: "You can't reach an island by road – distance stays infinite.",
    level: "basic",
    codeExample: "dist[] remains INF for disconnected nodes."
  }
];

export default questions;