const topic15_questions = [
  {
    "question": "When should an enterprise Java engineer choose 'Callable<V>' over 'Runnable'?",
    "shortAnswer": "An engineer should choose 'Callable<V>' whenever the background task needs to return a computed value (e.g. querying a database, calculating a financial report) or when the task can throw checked exceptions (e.g. 'IOException', 'SQLException') that must be handled by the caller. 'Runnable' should only be used for fire-and-forget tasks returning 'void' with no checked exceptions.",
    "explanation": "Design decision guide for concurrent task modeling.",
    "hint": "Choose Callable when returning a result or handling checked exceptions; use Runnable for fire-and-forget.",
    "level": "Intermediate",
    "codeExample": "Callable<Report> task = () -> generatePdfReport(); // Returns Report and throws Exception"
  }
];

export default topic15_questions;