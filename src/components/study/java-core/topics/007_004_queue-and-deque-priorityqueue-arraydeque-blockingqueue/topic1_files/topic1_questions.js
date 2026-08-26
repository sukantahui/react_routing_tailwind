const topic1_questions = [
  {
    "question": "Summarize the 2 method families provided on the 'java.util.Queue' interface for Insert, Remove, and Examine operations.",
    "shortAnswer": "1. 'Throws Exception': 'add(e)' throws IllegalStateException if full; 'remove()' throws NoSuchElementException if empty; 'element()' throws NoSuchElementException if empty. 2. 'Returns Special Value': 'offer(e)' returns 'false' if full; 'poll()' returns 'null' if empty; 'peek()' returns 'null' if empty.",
    "explanation": "Fundamental design duality in the Java Queue specification.",
    "hint": "Exception family (add, remove, element) vs Special Value family (offer, poll, peek).",
    "level": "Beginner",
    "codeExample": "boolean ok = q.offer(e); // Safe special value | q.add(e); // Throws exception if full"
  }
];

export default topic1_questions;