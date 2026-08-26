const topic2_questions = [
  {
    "question": "Outline the interface hierarchy of 'Executor', 'ExecutorService', and 'ScheduledExecutorService' in Java.",
    "shortAnswer": "1. 'Executor' (Base): Defines exactly one method: 'void execute(Runnable command)' for fire-and-forget execution. 2. 'ExecutorService' (Extends Executor): Extends the contract by adding Future-returning methods ('submit(Callable/Runnable)'), batch execution ('invokeAll', 'invokeAny'), and lifecycle shutdown controls ('shutdown', 'shutdownNow'). 3. 'ScheduledExecutorService' (Extends ExecutorService): Extends lifecycle controls by adding time-delayed and recurring scheduled execution methods ('schedule', 'scheduleAtFixedRate', 'scheduleWithFixedDelay').",
    "explanation": "Core Java concurrency interface inheritance hierarchy.",
    "hint": "Executor (execute) &rarr; ExecutorService (submit, shutdown, Future) &rarr; ScheduledExecutorService (periodic scheduling).",
    "level": "Intermediate",
    "codeExample": "Executor e = ...; ExecutorService es = ...; ScheduledExecutorService ses = ...;"
  }
];

export default topic2_questions;