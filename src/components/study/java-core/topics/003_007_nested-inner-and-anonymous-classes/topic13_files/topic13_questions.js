const topic13_questions = [
  {
    "question": "Why do non-static member inner classes and anonymous classes frequently cause OutOfMemoryError memory leaks in Android or GUI systems?",
    "shortAnswer": "Because non-static inner classes hold a hidden reference ('this$0') to their outer enclosing object (e.g. an Activity or Frame). If the inner class is registered with a long-lived service (like an EventBus or ThreadPool), the entire heavy outer object is prevented from being garbage-collected even after its lifecycle has ended.",
    "explanation": "Remedy: Use 'static nested classes' and pass a 'WeakReference' to the outer object.",
    "hint": "The hidden outer reference prevents the garbage collector from reclaiming the enclosing instance.",
    "level": "Advanced",
    "codeExample": "static class SafeListener implements Runnable { ... } // Static prevents memory leaks"
  }
];

export default topic13_questions;