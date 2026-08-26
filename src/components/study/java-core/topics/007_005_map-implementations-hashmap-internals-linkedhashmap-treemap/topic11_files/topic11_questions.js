const topic11_questions = [
  {
    "question": "Why is 'UNTREEIFY_THRESHOLD' set to 6 instead of 7 or 8 in HashMap?",
    "shortAnswer": "To prevent 'tree thrashing' (rapid oscillation between list and tree representation). If untreeification occurred at 7 or 8, adding and removing a single element in a tight loop would force the JVM to continuously convert nodes between 'Node' and 'TreeNode', causing severe CPU overhead. Setting the untreeify threshold to 6 introduces a 'hysteresis gap' of 2, stabilizing performance.",
    "explanation": "Classic engineering concept of hysteresis applied to algorithmic data structures.",
    "hint": "Prevents thrashing (rapid conversion oscillation) when adding/removing elements near the threshold.",
    "level": "Advanced",
    "codeExample": "static final int TREEIFY_THRESHOLD = 8; static final int UNTREEIFY_THRESHOLD = 6;"
  }
];

export default topic11_questions;