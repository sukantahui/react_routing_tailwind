// topic4_files/topic4_questions.js

const questions = [
  {
    question: "What is a `SAVEPOINT` in MySQL transactions?",
    shortAnswer: "A named marker or bookmark established within an active transaction that allows partial rollback of subsequent statements without aborting the entire transaction.",
    explanation: "Core definition of a transaction savepoint.",
    hint: "A named bookmark enabling partial rollback within an active transaction.",
    level: "basic"
  },
  {
    question: "What statement creates a named savepoint in MySQL?",
    shortAnswer: "`SAVEPOINT savepoint_name;`.",
    explanation: "Savepoint creation syntax.",
    hint: "SAVEPOINT sp_name;",
    level: "basic"
  },
  {
    question: "What statement rolls back data modifications to a specific savepoint?",
    shortAnswer: "`ROLLBACK TO [SAVEPOINT] savepoint_name;`.",
    explanation: "Rolling back to a savepoint syntax.",
    hint: "ROLLBACK TO SAVEPOINT sp_name;",
    level: "basic"
  },
  {
    question: "How do student registrations for Mamata, Susmita, and Debangshu illustrate `SAVEPOINT`?",
    shortAnswer: "Register Mamata and Susmita, set `SAVEPOINT after_susmita;`, attempt to register Debangshu; if Debangshu fails, `ROLLBACK TO after_susmita;` and `COMMIT;` saves Mamata and Susmita.",
    explanation: "Partial rollback in student batch registration.",
    hint: "Rolls back Debangshu's failure while preserving Mamata and Susmita's registration.",
    level: "basic"
  },
  {
    question: "Does `ROLLBACK TO SAVEPOINT` end or commit the transaction?",
    shortAnswer: "NO; the transaction remains **ACTIVE**; you must still issue a final `COMMIT;` or `ROLLBACK;` to conclude the transaction.",
    explanation: "Active transaction state post-savepoint rollback.",
    hint: "No, the transaction remains active; an explicit COMMIT or ROLLBACK is still required.",
    level: "basic"
  },
  {
    question: "What statement deletes a savepoint marker without rolling back or committing?",
    shortAnswer: "`RELEASE SAVEPOINT savepoint_name;`.",
    explanation: "Removing a savepoint marker from the stack.",
    hint: "RELEASE SAVEPOINT sp_name;",
    level: "basic"
  },
  {
    question: "What happens if you create a savepoint with a name that ALREADY EXISTS in the current transaction?",
    shortAnswer: "The old savepoint with that name is deleted, and the new savepoint is set at the current position (moving the bookmark forward).",
    explanation: "Overwriting duplicate savepoint names.",
    hint: "Overwrites the old savepoint, moving the marker to the current point.",
    level: "expert"
  },
  {
    question: "What happens to savepoints declared AFTER `sp1` when you execute `ROLLBACK TO SAVEPOINT sp1`?",
    shortAnswer: "All savepoints declared *after* `sp1` are automatically destroyed and removed from the active savepoint stack.",
    explanation: "Subsequent savepoint deletion upon rollback.",
    hint: "All savepoints created after sp1 are automatically destroyed.",
    level: "expert"
  },
  {
    question: "What happens if you execute `ROLLBACK TO SAVEPOINT` referencing a savepoint name that does not exist?",
    shortAnswer: "MySQL throws Error `1305` (`SAVEPOINT sp_name does not exist`).",
    explanation: "Non-existent savepoint error.",
    hint: "Throws Error 1305 (savepoint does not exist).",
    level: "basic"
  },
  {
    question: "Are row locks acquired AFTER a savepoint released when you execute `ROLLBACK TO SAVEPOINT`?",
    shortAnswer: "YES; in InnoDB, row locks acquired by statements executed *after* the savepoint are released when rolling back to that savepoint.",
    explanation: "Row lock deallocation on partial rollback.",
    hint: "Yes, row locks acquired after the savepoint are released.",
    level: "expert"
  },
  {
    question: "Can a transaction contain multiple different savepoints (e.g. `sp1`, `sp2`, `sp3`)?",
    shortAnswer: "YES; you can define multiple named savepoints at different stages of a transaction.",
    explanation: "Multiple savepoint support in MySQL.",
    hint: "Yes, you can declare multiple named savepoints in a single transaction.",
    level: "basic"
  },
  {
    question: "What happens to all active savepoints when `COMMIT;` is executed?",
    shortAnswer: "All savepoints in the transaction are automatically cleared and deallocated.",
    explanation: "Savepoint deallocation on transaction commit.",
    hint: "All savepoints are cleared upon COMMIT.",
    level: "basic"
  },
  {
    question: "What happens to all active savepoints when a full `ROLLBACK;` is executed?",
    shortAnswer: "All savepoints in the transaction are automatically cleared and all changes in the entire transaction are undone.",
    explanation: "Savepoint deallocation on full rollback.",
    hint: "All savepoints are cleared upon full ROLLBACK.",
    level: "basic"
  },
  {
    question: "How do you simulate Nested Transactions in MySQL using Savepoints?",
    shortAnswer: "Before entering an inner procedural operation, set a `SAVEPOINT inner_sp;`; if the inner operation fails, execute `ROLLBACK TO inner_sp;` to isolate the inner failure.",
    explanation: "Emulating nested transactions with savepoints.",
    hint: "Use SAVEPOINT before inner blocks and ROLLBACK TO SAVEPOINT on inner failure.",
    level: "expert"
  },
  {
    question: "Can `SAVEPOINT` be used outside of an active transaction when `autocommit = 1`?",
    shortAnswer: "If `autocommit = 1` and you declare a `SAVEPOINT`, MySQL implicitly opens an active transaction, suspending autocommit until the next `COMMIT` or `ROLLBACK`.",
    explanation: "Implicit transaction start via SAVEPOINT.",
    hint: "Implicitly starts a transaction, suspending autocommit.",
    level: "expert"
  },
  {
    question: "How does a multi-item e-commerce order checkout use Savepoints for optional add-on purchases?",
    shortAnswer: "1. Charge main item -> 2. `SAVEPOINT main_ok;` -> 3. Attempt to charge optional gift wrap -> 4. If gift wrap fails, `ROLLBACK TO main_ok;` -> 5. `COMMIT;` main purchase.",
    explanation: "Real-world optional workflow savepoint pattern.",
    hint: "Rolls back optional add-on failure while preserving main purchase.",
    level: "basic"
  },
  {
    question: "Can you execute `RELEASE SAVEPOINT` inside an error handler?",
    shortAnswer: "YES; `RELEASE SAVEPOINT` can be executed anywhere within the active transaction scope.",
    explanation: "Releasing savepoints in procedural code.",
    hint: "Yes, anywhere in the active transaction scope.",
    level: "moderate"
  },
  {
    question: "Does `RELEASE SAVEPOINT` undo any data modifications?",
    shortAnswer: "NO; `RELEASE SAVEPOINT` only removes the named marker from memory; it does NOT roll back or commit any data.",
    explanation: "Non-mutating behavior of RELEASE SAVEPOINT.",
    hint: "No, it only removes the marker; data changes remain staged.",
    level: "basic"
  },
  {
    question: "What is the memory impact of maintaining dozens of savepoints in a single transaction?",
    shortAnswer: "Minimal; savepoints are lightweight in-memory pointers to specific LSN offsets in the InnoDB transaction undo log.",
    explanation: "Lightweight nature of savepoint markers.",
    hint: "Very low overhead; lightweight pointers to undo log offsets.",
    level: "expert"
  },
  {
    question: "Can an `EXIT HANDLER` in a stored procedure roll back to a savepoint?",
    shortAnswer: "YES; `DECLARE CONTINUE HANDLER FOR SQLEXCEPTION BEGIN ROLLBACK TO SAVEPOINT sp_child; END;`.",
    explanation: "Handler integration with savepoints.",
    hint: "Yes, handlers can execute ROLLBACK TO SAVEPOINT.",
    level: "expert"
  },
  {
    question: "What happens if a DDL statement (`CREATE TABLE`) is executed after setting a `SAVEPOINT`?",
    shortAnswer: "The DDL statement causes an immediate implicit `COMMIT`, committing all preceding work and destroying the savepoint!",
    explanation: "DDL implicit commit destroying savepoints.",
    hint: "DDL forces an implicit COMMIT, destroying all savepoints.",
    level: "basic"
  },
  {
    question: "Can you pass a savepoint name as a dynamic SQL variable in MySQL?",
    shortAnswer: "No, savepoint identifiers are static SQL keywords, but they can be constructed dynamically in Prepared Statements.",
    explanation: "Savepoint identifier syntax rules.",
    hint: "Static identifiers in SQL; dynamic via PREPARE / EXECUTE.",
    level: "moderate"
  },
  {
    question: "What is the return value of `ROW_COUNT()` after `ROLLBACK TO SAVEPOINT`?",
    shortAnswer: "0 (or -1 depending on MySQL version, as it is an administrative control statement).",
    explanation: "ROW_COUNT() behavior on savepoint rollback.",
    hint: "Returns 0 or -1.",
    level: "moderate"
  },
  {
    question: "How do Spring Boot / JPA frameworks use Savepoints for `@Transactional(propagation = Propagation.NESTED)`?",
    shortAnswer: "Spring maps `Propagation.NESTED` directly to JDBC Savepoints (`connection.setSavepoint()`), enabling nested sub-transactions within a single physical connection.",
    explanation: "Spring framework mapping to Savepoints.",
    hint: "Maps Propagation.NESTED to JDBC Savepoints.",
    level: "expert"
  },
  {
    question: "What happens if you execute `RELEASE SAVEPOINT` on a savepoint that was already destroyed by an earlier `ROLLBACK TO SAVEPOINT`?",
    shortAnswer: "MySQL throws Error `1305` (`SAVEPOINT does not exist`).",
    explanation: "Error on releasing destroyed savepoint.",
    hint: "Throws Error 1305.",
    level: "basic"
  },
  {
    question: "Does `ROLLBACK TO SAVEPOINT` undo changes made to User-Defined Session Variables (`@var`)?",
    shortAnswer: "NO; session variables (`@var`) and local procedural variables exist in client memory and are never rolled back by `ROLLBACK` or `SAVEPOINT`.",
    explanation: "Variable state independence from savepoint rollbacks.",
    hint: "No, session and procedural variables are unaffected by savepoint rollbacks.",
    level: "expert"
  },
  {
    question: "Can savepoints prevent deadlock aborts in batch processing loops?",
    shortAnswer: "Yes; if a single row encounters a lock conflict, rolling back to that row's savepoint allows the loop to retry or skip that row without restarting the entire batch.",
    explanation: "Granular retry with savepoints.",
    hint: "Allows skipping or retrying failing rows without restarting the entire batch.",
    level: "expert"
  },
  {
    question: "Is `SAVEPOINT` supported in all MySQL storage engines?",
    shortAnswer: "Only in transactional storage engines (primarily **InnoDB**); non-transactional engines like MyISAM ignore savepoints.",
    explanation: "Storage engine support for Savepoints.",
    hint: "Supported in InnoDB; ignored in non-transactional engines like MyISAM.",
    level: "basic"
  },
  {
    question: "What is the difference between `ROLLBACK` and `ROLLBACK TO SAVEPOINT`?",
    shortAnswer: "`ROLLBACK` undoes ALL statements and terminates the transaction; `ROLLBACK TO SAVEPOINT` undoes statements after the marker and keeps the transaction active.",
    explanation: "Full vs Partial Rollback distinction.",
    hint: "ROLLBACK ends the transaction; ROLLBACK TO SAVEPOINT keeps the transaction active.",
    level: "basic"
  },
  {
    question: "What is the senior architect's summary rule for SAVEPOINT and Partial Rollbacks?",
    shortAnswer: "Use `SAVEPOINT` to implement resilient multi-step workflows (e.g. optional cart add-ons, bulk batch loops with row-level retry); always remember that `ROLLBACK TO SAVEPOINT` keeps the transaction active (requiring a final `COMMIT;`); and leverage savepoints to emulate nested transaction boundaries in high-concurrency architectures.",
    explanation: "Authoritative architectural best practices for Savepoints.",
    hint: "Resilient multi-step workflows + remember transaction remains active + emulate nested transactions.",
    level: "expert"
  }
];

export default questions;
