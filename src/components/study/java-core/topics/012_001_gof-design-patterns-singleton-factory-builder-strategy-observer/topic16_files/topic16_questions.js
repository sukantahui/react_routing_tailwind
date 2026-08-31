const topic16_questions = [
  {
    "question": "What capability does the Command pattern provide that simple direct method calls cannot?",
    "shortAnswer": "It turns operations into first-class objects that can be stored in collections, passed as parameters, queued for asynchronous execution, persisted to disk for crash recovery, and reversed via undo() methods.",
    "explanation": "Decouples the invoker of a request from the receiver doing the work.",
    "hint": "Turns operations into objects that can be queued, logged, and undone.",
    "level": "Beginner",
    "codeExample": "Command cmd = new DepositCommand(ledger, 500.0); cmdStack.push(cmd);"
  },
  {
    "question": "What interface in the standard Java library is a functional representation of a parameterless Command?",
    "shortAnswer": "java.lang.Runnable (void run()) and java.util.concurrent.Callable<V> (V call()).",
    "explanation": "Classic examples of the Command pattern in concurrency.",
    "hint": "Runnable and Callable interfaces.",
    "level": "Beginner",
    "codeExample": "Runnable command = () → process(); executor.submit(command);"
  }
];

export default topic16_questions;
