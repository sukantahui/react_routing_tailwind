const questions = [
  {
    id: 1,
    question: "What is the primary difference in space complexity between Adjacency Matrix and Adjacency List representations?",
    options: [
      "Adjacency Matrix takes O(V^2) space; Adjacency List takes O(V + E) space",
      "Both take O(V) space",
      "Adjacency List takes O(V^3) space",
      "Adjacency Matrix takes O(E) space"
    ],
    answer: "Adjacency Matrix takes O(V^2) space; Adjacency List takes O(V + E) space",
    explanation: "An adjacency matrix allocates V x V elements regardless of edge density. An adjacency list allocates memory proportional to the actual number of vertices and edges O(V + E)."
  },
  {
    id: 2,
    question: "Which data structure is internally used to execute Breadth-First Search (BFS)?",
    options: ["Queue (FIFO)", "Stack (LIFO)", "Min Heap", "Hash Table"],
    answer: "Queue (FIFO)",
    explanation: "BFS explores graph nodes level-by-level using a FIFO Queue to schedule neighbor nodes for discovery."
  },
  {
    id: 3,
    question: "Which shortest path algorithm computes single-source shortest paths on weighted graphs with non-negative edge weights?",
    options: ["Dijkstra's Algorithm", "Kruskal's Algorithm", "Prim's Algorithm", "Floyd-Warshall Algorithm"],
    answer: "Dijkstra's Algorithm",
    explanation: "Dijkstra's algorithm uses a priority queue / min-heap to greedily expand the shortest path estimate for vertices with non-negative edge weights."
  }
];

export default questions;
