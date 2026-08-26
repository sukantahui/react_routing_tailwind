const topic7_questions = [
  {
    "question": "What is the difference between a 'Snapshot Iterator' (CopyOnWriteArrayList) and a 'Weakly Consistent Iterator' (ConcurrentHashMap)?",
    "shortAnswer": "1. 'Snapshot Iterator': traverses an immutable clone of the backing array captured at the moment 'iterator()' was created. It never throws CME and does not reflect any subsequent mutations. 2. 'Weakly Consistent Iterator': traverses the live collection using volatile node pointers. It never throws CME, handles concurrent modifications gracefully, and guarantees that each element is returned at most once, potentially reflecting modifications made after iterator creation.",
    "explanation": "Key distinction in JSR-166 concurrent iterator specifications.",
    "hint": "Snapshot traverses a fixed clone; weakly consistent traverses live data via volatile pointers without throwing CME.",
    "level": "Advanced",
    "codeExample": "Iterator it = cowList.iterator(); cowList.add(\"new\"); // Snapshot never throws CME"
  }
];

export default topic7_questions;