const topic7_questions = [
  {
    "question": "What is the critical timing difference between 'scheduleAtFixedRate()' and 'scheduleWithFixedDelay()'?",
    "shortAnswer": "1. 'scheduleAtFixedRate(task, initialDelay, period, unit)': The recurrence interval is measured from the START time of task N to the START time of task N+1 (constant clock-tick frequency). 2. 'scheduleWithFixedDelay(task, initialDelay, delay, unit)': The recurrence interval is measured from the COMPLETION (END) time of task N to the START time of task N+1. This guarantees that a mandatory idle rest gap of 'delay' duration always exists between consecutive task runs, preventing task overlaps if a run takes longer than expected.",
    "explanation": "Standard scheduled executor cadence distinction.",
    "hint": "FixedRate measures from start-to-start; FixedDelay measures from end-to-start (guaranteeing a pause between runs).",
    "level": "Intermediate",
    "codeExample": "scheduler.scheduleAtFixedRate(task, 0, 1, TimeUnit.SECONDS); // Start-to-start"
  }
];

export default topic7_questions;