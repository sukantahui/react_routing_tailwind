const topic9_questions = [
  {
    "question": "What is 'Thread.startVirtualThread(Runnable)' in Java 21 and when is it typically used?",
    "shortAnswer": "'Thread.startVirtualThread(Runnable)' is a static convenience method that immediately creates and starts an anonymous Virtual Thread in a single line of code. It is the direct modern replacement for 'new Thread(runnable).start()'. It is ideal for quick scripts, background asynchronous task execution, and educational demos where custom naming or thread factory configuration is not required.",
    "explanation": "Static helper method for instant virtual thread creation in Java 21.",
    "hint": "Convenience method to immediately create and start an anonymous virtual thread in one line.",
    "level": "Beginner",
    "codeExample": "Thread.startVirtualThread(() -> System.out.println(\"Running virtually!\"));"
  }
];

export default topic9_questions;