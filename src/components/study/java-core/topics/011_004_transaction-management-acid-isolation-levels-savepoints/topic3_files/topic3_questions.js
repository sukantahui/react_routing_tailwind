const topic3_questions = [
  {
    "question": "How does the database engine maintain Consistency when a foreign key constraint is violated during a transaction?",
    "shortAnswer": "The database engine immediately aborts the violating statement and raises a Constraint Violation SQLException. The application rolls back the transaction, ensuring the database remains in a consistent state.",
    "explanation": "Prevents orphaned child records.",
    "hint": "Raises a Constraint Violation SQLException and rolls back.",
    "level": "Beginner",
    "codeExample": "SQLException: Cannot add or update a child row: a foreign key constraint fails"
  },
  {
    "question": "Give an example of an application-level business invariant that represents database consistency.",
    "shortAnswer": "In a financial banking system, the total sum of money across all bank accounts in the system must remain constant before and after a fund transfer transaction.",
    "explanation": "Money cannot be created or destroyed during transfers.",
    "hint": "Total sum of balances remains identical before and after transfer.",
    "level": "Intermediate",
    "codeExample": "Total System Balance Before == Total System Balance After."
  }
];

export default topic3_questions;
