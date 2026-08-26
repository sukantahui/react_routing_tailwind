const topic9_questions = [
  {
    "question": "Summarize the 12 core methods of the 'java.util.Deque' interface organized by head/tail position and error handling strategy.",
    "shortAnswer": "1. 'Head Operations': Exception: 'addFirst(e)', 'removeFirst()', 'getFirst()'. Special Value: 'offerFirst(e)', 'pollFirst()', 'peekFirst()'. 2. 'Tail Operations': Exception: 'addLast(e)', 'removeLast()', 'getLast()'. Special Value: 'offerLast(e)', 'pollLast()', 'peekLast()'. Stack equivalents 'push/pop' map to 'addFirst/removeFirst'.",
    "explanation": "Complete 12-method matrix of java.util.Deque.",
    "hint": "6 methods for Head (add/remove/get vs offer/poll/peek) and 6 matching methods for Tail.",
    "level": "Intermediate",
    "codeExample": "dq.offerFirst(\"H\"); dq.offerLast(\"T\"); String h = dq.pollFirst(); String t = dq.pollLast();"
  }
];

export default topic9_questions;