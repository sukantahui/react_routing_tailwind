const topic10_questions = [
  {
    "question": "Explain the Dining Philosophers Problem and how Dijkstra's resource hierarchy solution prevents deadlock.",
    "shortAnswer": "The Dining Philosophers Problem models 5 philosophers at a circular table who require both left and right chopsticks to eat. If all philosophers pick up their left chopstick simultaneously, all 5 chopsticks are held, and each philosopher blocks waiting indefinitely for the right chopstick held by their neighbor (Circular Wait Deadlock). Dijkstra solved this by numbering chopsticks 0–4 and enforcing a 'Resource Hierarchy': philosophers must always pick up the lower-numbered chopstick first. The last philosopher (between 4 and 0) attempts to pick up chopstick 0 first (which is already held by philosopher 0), allowing philosopher 3 to acquire chopstick 4 and eat, breaking the cycle.",
    "explanation": "Classic computer science problem formulated by Edsger Dijkstra in 1965.",
    "hint": "Numbered chopsticks enforce lower-number-first acquisition, breaking the circular dependency.",
    "level": "Intermediate",
    "codeExample": "// Asymmetric order: int first = Math.min(left, right); int second = Math.max(left, right);"
  }
];

export default topic10_questions;