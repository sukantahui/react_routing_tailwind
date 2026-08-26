const topic1_questions = [
  {
    "question": "Why does the Java Javadoc mandate that developers manually synchronize on 'Collections.synchronizedMap(map)' when iterating over it?",
    "shortAnswer": "While 'Collections.synchronizedMap' protects individual method calls ('put', 'get', 'remove') with 'synchronized(mutex)', iterating over 'keySet()', 'values()', or 'entrySet()' involves multiple separate method calls ('hasNext()', 'next()') spread across a loop. If another thread mutates the map between 'hasNext()' and 'next()', the iterator throws 'ConcurrentModificationException'. Manual synchronization on the map prevents concurrent mutations throughout the entire loop.",
    "explanation": "Crucial rule highlighted in Javadoc for all Collections.synchronizedXxx wrappers.",
    "hint": "Iterators span multiple method calls; manual synchronized(map) block protects the entire iteration loop.",
    "level": "Intermediate",
    "codeExample": "synchronized(syncMap) { for (Entry e : syncMap.entrySet()) { ... } }"
  }
];

export default topic1_questions;