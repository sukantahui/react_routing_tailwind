const topic15_questions = [
  {
    "question": "How does distinct() determine whether two objects are duplicates?",
    "shortAnswer": "distinct() uses Object.equals(Object) and Object.hashCode() to determine uniqueness, keeping an internal hash set of previously encountered elements.",
    "explanation": "If equals and hashCode are not overridden, standard memory reference comparison (==) is used.",
    "hint": "Relies on the hashCode() and equals() contract.",
    "level": "Beginner",
    "codeExample": "record User(int id, String name) {} // Records automatically support distinct() correctly!"
  },
  {
    "question": "Is distinct() a stateless or stateful intermediate operation?",
    "shortAnswer": "distinct() is a stateful operation because it must maintain an internal HashSet buffer of all previously observed elements to know whether any new element is a duplicate.",
    "explanation": "In parallel streams, distinct() introduces coordination overhead across threads.",
    "hint": "Stateful: it remembers all previously seen elements.",
    "level": "Intermediate",
    "codeExample": "stream.distinct() // Buffers seen elements in memory"
  }
];

export default topic15_questions;
