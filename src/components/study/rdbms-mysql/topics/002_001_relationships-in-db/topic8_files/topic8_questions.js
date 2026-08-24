// topic8_files/topic8_questions.js

const questions = [
  {
    question: "How do you systematically choose the right referential integrity action for a business relationship?",
    shortAnswer: "Evaluate child entity lifecycle: use `CASCADE` for existential master-detail parts, `RESTRICT` for financial/legal ledgers, and `SET NULL` for optional advisory allocations.",
    explanation: "Business domain requirements dictate the referential rule.",
    hint: "Evaluate child entity lifecycle and audit requirements.",
    level: "basic"
  },
  {
    question: "Why should `RESTRICT` always be chosen for e-commerce Order and Invoice tables?",
    shortAnswer: "To prevent illegal destruction of financial audit ledgers and maintain statutory tax accounting compliance.",
    explanation: "Auditing regulations require permanent record keeping.",
    hint: "Tax and legal audit compliance.",
    level: "basic"
  },
  {
    question: "When is `ON DELETE CASCADE` the objectively correct architectural choice?",
    shortAnswer: "When child rows have zero independent meaning or value outside their parent container (e.g. `order_items` inside an `order`, or `cart_items` in a `shopping_cart`).",
    explanation: "Clean automated garbage collection for composite entities.",
    hint: "Existential composite child records.",
    level: "basic"
  },
  {
    question: "When is `ON DELETE SET NULL` the objectively correct architectural choice?",
    shortAnswer: "When child entities have independent value and lifecycle, but their relationship to a specific parent is optional (e.g. assigning a student to a faculty mentor).",
    explanation: "Retains child records while marking parent pointer as unassigned.",
    hint: "Independent entities with optional parent links.",
    level: "basic"
  },
  {
    question: "What is the primary risk of using `ON DELETE CASCADE` blindly across all foreign keys in an enterprise schema?",
    shortAnswer: "Accidental cascading deletion storms: deleting one parent entity can wipe out millions of rows across dozens of related tables without warning.",
    explanation: "A common catastrophic failure mode in production databases.",
    hint: "Unintended cascading deletion storms.",
    level: "moderate"
  },
  {
    question: "Why is `ON UPDATE CASCADE` almost universally recommended regardless of the delete action chosen?",
    shortAnswer: "Because primary key updates (renaming natural keys or sequence migration) should synchronize seamlessly across child foreign keys without breaking referential links.",
    explanation: "Maintains key consistency without administrative friction.",
    hint: "Synchronizes primary key renumbering seamlessly.",
    level: "moderate"
  },
  {
    question: "How should a social media application handle user account deletion vs user posts?",
    shortAnswer: "Either `ON DELETE CASCADE` (if deleting account wipes all posts) or Soft Delete (`is_active = 0`) to preserve threaded reply context.",
    explanation: "Often implemented via soft delete to avoid breaking conversation threads.",
    hint: "Soft delete or CASCADE depending on privacy policy.",
    level: "moderate"
  },
  {
    question: "How should a banking system handle Customer deletion when the customer has active savings accounts?",
    shortAnswer: "Enforce `ON DELETE RESTRICT` to prevent customer deletion while balances or ledger entries exist.",
    explanation: "Banking regulations prohibit deleting active account holders.",
    hint: "RESTRICT prevents deleting customers with active balances.",
    level: "basic"
  },
  {
    question: "How do you model an Employee-Department relationship when a department is closed down?",
    shortAnswer: "Use `ON DELETE SET NULL` or `RESTRICT`: employees should be reassigned to other departments, NOT deleted from the company.",
    explanation: "Employees have independent employment value.",
    hint: "SET NULL or RESTRICT to preserve employees.",
    level: "basic"
  },
  {
    question: "In a Content Management System (CMS), what referential action should be used between Articles and Authors?",
    shortAnswer: "Use `ON DELETE SET NULL` or `RESTRICT` (so articles are preserved as 'Guest Author' or require re-assignment before author removal).",
    explanation: "Prevents losing published content when a writer departs.",
    hint: "SET NULL to preserve published articles.",
    level: "moderate"
  },
  {
    question: "What referential action should be used on a Many-to-Many junction table (e.g. `student_courses`)?",
    shortAnswer: "`ON DELETE CASCADE` on both foreign keys, so removing either a student or a course cleanly cleans up the association link.",
    explanation: "Junction rows have no meaning without both parent entities.",
    hint: "ON DELETE CASCADE on junction links.",
    level: "basic"
  },
  {
    question: "How does the 'Soft Delete' architecture pattern complement `ON DELETE RESTRICT`?",
    shortAnswer: "Instead of running physical `DELETE` statements (which RESTRICT blocks), applications update `is_deleted = 1` or `deleted_at = NOW()`, preserving historical referential integrity.",
    explanation: "Standard enterprise approach to audit trails.",
    hint: "Flags records as deleted without breaking RESTRICT.",
    level: "moderate"
  },
  {
    question: "What is the consequence of choosing `ON DELETE SET NULL` if the foreign key column is defined as `INT NOT NULL`?",
    shortAnswer: "MySQL rejects the schema creation with an error because `NOT NULL` conflicts with the `SET NULL` referential action.",
    explanation: "Incompatible schema constraint definitions.",
    hint: "Schema creation rejected due to NOT NULL conflict.",
    level: "basic"
  },
  {
    question: "In an e-learning platform, what referential action should link `quiz_submissions` to `quizzes`?",
    shortAnswer: "`ON DELETE RESTRICT` (or soft delete quizzes) so student grade transcripts and historical exam results are never destroyed.",
    explanation: "Academic transcripts require permanent audit integrity.",
    hint: "RESTRICT protects student exam records.",
    level: "moderate"
  },
  {
    question: "What referential action should link `user_sessions` to `users`?",
    shortAnswer: "`ON DELETE CASCADE`, so that deleting a user immediately invalidates and deletes all active login sessions and auth tokens.",
    explanation: "Security best practice for ephemeral session data.",
    hint: "CASCADE cleans up ephemeral login sessions.",
    level: "basic"
  },
  {
    question: "How do you evaluate whether a relationship is 'Composition' (Existential) vs 'Aggregation' (Independent)?",
    shortAnswer: "If child entities die when the parent dies, it is Composition (`CASCADE`); if child entities survive independently, it is Aggregation (`RESTRICT` or `SET NULL`).",
    explanation: "Classic UML & ER modeling distinction.",
    hint: "Composition (CASCADE) vs Aggregation (RESTRICT/SET NULL).",
    level: "moderate"
  },
  {
    question: "Why do regulatory standards like GDPR 'Right to be Forgotten' require careful referential design?",
    shortAnswer: "Personal identification data must be wiped (`CASCADE` or anonymized), but aggregate financial records must be preserved via `RESTRICT` with anonymized client references.",
    explanation: "Balances privacy compliance with statutory tax accounting laws.",
    hint: "Anonymization with RESTRICT for financial compliance.",
    level: "expert"
  },
  {
    question: "In a medical database, what referential action should connect `prescriptions` to `patients`?",
    shortAnswer: "`ON DELETE RESTRICT` (medical records have statutory retention laws spanning decades).",
    explanation: "Medical compliance mandates permanent record retention.",
    hint: "RESTRICT for statutory medical records.",
    level: "basic"
  },
  {
    question: "In a medical database, what referential action should connect `patient_hospital_room_allocations` to `rooms`?",
    shortAnswer: "`ON DELETE SET NULL` (deleting or renovating a room sets patient room pointer to NULL without discharging the patient).",
    explanation: "Advisory physical location link.",
    hint: "SET NULL for temporary room allocations.",
    level: "moderate"
  },
  {
    question: "What happens if a parent deletion triggers an `ON DELETE CASCADE` that encounters a downstream `ON DELETE RESTRICT`?",
    shortAnswer: "The entire operation is aborted with Error 1451 and rolled back; no parent or child rows are deleted.",
    explanation: "Downstream RESTRICT constraints protect the entire transaction boundary.",
    hint: "Downstream RESTRICT aborts and rolls back entire cascade.",
    level: "expert"
  },
  {
    question: "How do you document the business justification for referential actions in MySQL DDL?",
    shortAnswer: "Using the `COMMENT` attribute on the table or column definition, and in migration script changelogs.",
    explanation: "Ensures future developers understand why a specific action was chosen.",
    hint: "COMMENT attribute in DDL definition.",
    level: "basic",
    codeExample: "CONSTRAINT fk_inv_client FOREIGN KEY (client_id)\nREFERENCES clients(client_id) ON DELETE RESTRICT\nCOMMENT 'Financial compliance requires RESTRICT on invoices'"
  },
  {
    question: "Can an application change a foreign key's referential action in production without table downtime?",
    shortAnswer: "In MySQL 8.0 with `ALGORITHM=INPLACE, LOCK=NONE`, dropping and re-adding foreign key constraints can often be performed online.",
    explanation: "Minimizes downtime for online DDL migrations.",
    hint: "Online DDL with ALGORITHM=INPLACE.",
    level: "expert"
  },
  {
    question: "What referential action should link `shopping_cart` to `users` vs `orders` to `users`?",
    shortAnswer: "`shopping_cart` -> `users` should use `CASCADE` (ephemeral); `orders` -> `users` should use `RESTRICT` (financial ledger).",
    explanation: "Differentiates temporary session state from permanent financial records.",
    hint: "CASCADE for shopping carts; RESTRICT for orders.",
    level: "moderate"
  },
  {
    question: "Why should Foreign Key columns be indexed regardless of whether you choose CASCADE or RESTRICT?",
    shortAnswer: "Both actions require fast index lookups: `RESTRICT` probes the index to check for child existence, while `CASCADE` uses the index to find rows to delete.",
    explanation: "Foreign key index is mandatory for high-performance referential checks.",
    hint: "Index accelerates both RESTRICT probes and CASCADE seeks.",
    level: "expert"
  },
  {
    question: "What is the difference between choosing `RESTRICT` at the database level vs writing validation checks in application code?",
    shortAnswer: "Database constraints guarantee integrity across all entry points (web apps, background jobs, raw SQL scripts, ETL pipelines), whereas application-level checks can be bypassed.",
    explanation: "Database constraints are the ultimate source of truth.",
    hint: "Database constraints cannot be bypassed by external tools.",
    level: "moderate"
  },
  {
    question: "How does `ON DELETE SET NULL` behave when multiple foreign keys reference different parents in the same table?",
    shortAnswer: "Each foreign key acts independently: deleting Parent A sets `parent_a_id` to NULL without affecting `parent_b_id`.",
    explanation: "Granular independent column updates.",
    hint: "Independent column nullification per foreign key.",
    level: "basic"
  },
  {
    question: "When should a developer choose 'Hard Delete with CASCADE' over 'Soft Delete'?",
    shortAnswer: "For temporary, disposable, or sensitive cached data (e.g. temporary verification codes, expired sessions, shopping cart drafts).",
    explanation: "Reclaims disk pages and purges ephemeral state.",
    hint: "Disposable, ephemeral, and sensitive temporary data.",
    level: "basic"
  },
  {
    question: "How do you audit which foreign keys in your schema use `CASCADE` to assess data destruction risks?",
    shortAnswer: "Query `information_schema.REFERENTIAL_CONSTRAINTS WHERE DELETE_RULE = 'CASCADE';`.",
    explanation: "Produces a security audit report of all cascading delete points.",
    hint: "Query information_schema.REFERENTIAL_CONSTRAINTS for DELETE_RULE = CASCADE.",
    level: "moderate",
    codeExample: "SELECT TABLE_NAME, CONSTRAINT_NAME, REFERENCED_TABLE_NAME\nFROM information_schema.REFERENTIAL_CONSTRAINTS\nWHERE DELETE_RULE = 'CASCADE' AND CONSTRAINT_SCHEMA = 'college_db';"
  },
  {
    question: "What is the recommended design pattern for archiving parent records that have `RESTRICT` foreign keys?",
    shortAnswer: "Copy the parent and all related child records to dedicated `_archive` or `_history` tables in an atomic transaction before deleting.",
    explanation: "Preserves historical data in cold storage while cleaning active OLTP tables.",
    hint: "Atomic copy to dedicated archive tables.",
    level: "expert"
  },
  {
    question: "What is the Master Rule checklist for choosing referential actions in enterprise databases?",
    shortAnswer: "1) Default to `RESTRICT` for financial, tax, and user accounts. 2) Use `CASCADE` for existential master-detail records (Order Items). 3) Use `SET NULL` for optional allocations (mentors, managers). 4) Always pair with `ON UPDATE CASCADE`. 5) Index all foreign key columns.",
    explanation: "Following these 5 rules guarantees rock-solid referential integrity and zero data loss.",
    hint: "RESTRICT for financial, CASCADE for master-detail, SET NULL for optional, UPDATE CASCADE, Index FKs.",
    level: "basic"
  }
];

export default questions;
