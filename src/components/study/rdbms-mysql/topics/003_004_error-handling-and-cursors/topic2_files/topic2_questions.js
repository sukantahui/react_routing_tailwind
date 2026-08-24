// topic2_files/topic2_questions.js

const questions = [
  {
    question: "What is the primary difference between a `CONTINUE` handler and an `EXIT` handler in MySQL?",
    shortAnswer: "A `CONTINUE` handler resumes execution at the next statement after the error; an `EXIT` handler immediately terminates execution of the current `BEGIN ... END` block.",
    explanation: "Core behavioral dichotomy of handler actions.",
    hint: "CONTINUE resumes next statement; EXIT halts and leaves the current block.",
    level: "basic"
  },
  {
    question: "When should a database developer use an `EXIT` handler?",
    shortAnswer: "When an unrecoverable fatal error occurs (e.g. integrity violation, transaction failure) that requires immediate rollback and procedure termination.",
    explanation: "Primary architectural use case for EXIT handlers.",
    hint: "For fatal errors requiring immediate rollback and termination.",
    level: "basic"
  },
  {
    question: "When should a database developer use a `CONTINUE` handler?",
    shortAnswer: "When handling non-fatal warnings, setting loop flags on cursor exhaustion (`NOT FOUND`), or performing best-effort batch processing where individual row failures should not abort the entire job.",
    explanation: "Primary architectural use case for CONTINUE handlers.",
    hint: "For cursor loops, warning flags, and non-blocking batch iterations.",
    level: "basic"
  },
  {
    question: "How do student enrollment procedures for Mamata, Susmita, Abhronila, and Debangshu illustrate `CONTINUE` vs `EXIT`?",
    shortAnswer: "In a bulk billing run, a `CONTINUE` handler skips invalid student accounts and continues billing the rest; in an atomic single enrollment, an `EXIT` handler rolls back the transaction immediately upon error.",
    explanation: "Real-world comparison on student data.",
    hint: "CONTINUE for batch processing across students; EXIT for atomic single enrollment rollback.",
    level: "basic"
  },
  {
    question: "Can a handler execute a compound statement with multiple SQL queries?",
    shortAnswer: "YES; by wrapping the handler logic inside a `BEGIN ... END` block (`DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN ROLLBACK; INSERT INTO error_log ...; END;`).",
    explanation: "Compound handler bodies.",
    hint: "Yes, wrap multiple handler statements inside BEGIN ... END.",
    level: "basic"
  },
  {
    question: "What is the scope of a handler declared in an outer procedure block?",
    shortAnswer: "It is active across the entire procedure body and all nested child blocks, unless overridden by a more specific handler declared in an inner child block.",
    explanation: "Handler scope and block inheritance.",
    hint: "Active across the entire procedure unless overridden by an inner block handler.",
    level: "expert"
  },
  {
    question: "What happens when an `EXIT` handler fires inside a nested inner `BEGIN ... END` block?",
    shortAnswer: "Control exits ONLY the inner block; execution resumes at the first statement following the inner block in the parent scope.",
    explanation: "Nested block error isolation.",
    hint: "Exits only the inner block, allowing the outer block to continue.",
    level: "expert"
  },
  {
    question: "Can a single `DECLARE HANDLER` statement listen for multiple condition values simultaneously?",
    shortAnswer: "YES; by comma-separating conditions: `DECLARE EXIT HANDLER FOR 1062, 1452, SQLSTATE '42000' BEGIN ... END;`.",
    explanation: "Multiple condition binding in single handler.",
    hint: "Yes, comma-separate condition values (FOR 1062, 1452, ...).",
    level: "basic"
  },
  {
    question: "What happens if a statement in a loop fails and has a `CONTINUE` handler attached?",
    shortAnswer: "The handler executes, and the loop proceeds to the next statement in the loop body (the loop does not terminate).",
    explanation: "Loop execution with CONTINUE handler.",
    hint: "The handler runs and the loop continues with the next statement.",
    level: "basic"
  },
  {
    question: "What is the standard pattern for terminating a cursor loop using a `CONTINUE` handler?",
    shortAnswer: "`DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_is_finished = TRUE;`.",
    explanation: "Canonical cursor termination pattern.",
    hint: "DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_done = TRUE;",
    level: "basic"
  },
  {
    question: "Can an `EXIT` handler be used to terminate a cursor loop?",
    shortAnswer: "YES, but it requires enclosing the loop inside an inner `BEGIN ... END` block so that the `EXIT` handler breaks out of the loop block upon `NOT FOUND`.",
    explanation: "Alternative cursor loop termination with EXIT handler.",
    hint: "Yes, by wrapping the loop in an inner block that exits upon NOT FOUND.",
    level: "expert"
  },
  {
    question: "What happens if an error occurs inside a procedure and NO matching handler is found anywhere in the scope hierarchy?",
    shortAnswer: "MySQL terminates the procedure execution immediately, propagates the uncaught error to the caller, and leaves open transactions uncommitted.",
    explanation: "Uncaught exception escalation in MySQL.",
    hint: "Procedure crashes and propagates the unhandled error to the client.",
    level: "basic"
  },
  {
    question: "Can a handler body contain another nested `BEGIN ... END` block with its own handlers?",
    shortAnswer: "YES; MySQL allows full procedural nesting inside handler execution bodies.",
    explanation: "Nested blocks inside handlers.",
    hint: "Yes, handlers can contain nested BEGIN...END blocks.",
    level: "expert"
  },
  {
    question: "Does an `EXIT` handler automatically execute `ROLLBACK` unless explicitly coded?",
    shortAnswer: "NO; an `EXIT` handler only halts the block; if you want transaction rollback, you MUST explicitly write `ROLLBACK;` inside the handler body!",
    explanation: "Explicit rollback requirement in EXIT handlers.",
    hint: "No, ROLLBACK must be explicitly coded inside the handler.",
    level: "expert"
  },
  {
    question: "How do you declare an `EXIT` handler that sets an output error code and returns immediately?",
    shortAnswer: "`DECLARE EXIT HANDLER FOR SQLEXCEPTION SET p_status = 'ERROR_FATAL';`.",
    explanation: "Clean single-statement EXIT handler.",
    hint: "DECLARE EXIT HANDLER FOR SQLEXCEPTION SET p_status = 'ERROR';",
    level: "basic"
  },
  {
    question: "Can you declare both a `CONTINUE` handler for `NOT FOUND` and an `EXIT` handler for `SQLEXCEPTION` in the same procedure?",
    shortAnswer: "YES; this is the standard enterprise design pattern: `CONTINUE` handles cursor iterations while `EXIT` catches unexpected SQL errors.",
    explanation: "Combining CONTINUE and EXIT handlers.",
    hint: "Yes, standard pattern: CONTINUE for NOT FOUND + EXIT for SQLEXCEPTION.",
    level: "basic"
  },
  {
    question: "What happens if a statement inside a `CONTINUE` handler itself causes an error?",
    shortAnswer: "MySQL looks for a handler in the enclosing parent block; if none exists, execution aborts.",
    explanation: "Handler fault tolerance and escalation.",
    hint: "Escalates to parent block handlers or crashes if unhandled.",
    level: "expert"
  },
  {
    question: "Can `GET DIAGNOSTICS` be used inside both `CONTINUE` and `EXIT` handlers?",
    shortAnswer: "YES; `GET DIAGNOSTICS` functions identically inside both handler types to extract error telemetry.",
    explanation: "Diagnostics area accessibility in handlers.",
    hint: "Yes, GET DIAGNOSTICS works in both CONTINUE and EXIT handlers.",
    level: "basic"
  },
  {
    question: "Why is a `CONTINUE` handler with an empty body (`BEGIN END;`) considered an anti-pattern?",
    shortAnswer: "Because it completely suppresses all errors silently ('swallows errors'), making system bugs invisible and data corruption impossible to debug.",
    explanation: "Silent error swallowing anti-pattern.",
    hint: "Silently hides errors, causing impossible-to-debug data corruption.",
    level: "expert"
  },
  {
    question: "What happens to local variables when an `EXIT` handler terminates a procedure?",
    shortAnswer: "Local variables are destroyed as their stack frame is deallocated; only `OUT` and `INOUT` parameters retain their assigned values.",
    explanation: "Variable lifecycle on procedure exit.",
    hint: "Local variables are deallocated; OUT/INOUT parameters persist to the caller.",
    level: "basic"
  },
  {
    question: "Can an `UNDO` handler action be declared in MySQL 8.0?",
    shortAnswer: "NO; MySQL accepts the keyword `UNDO` in its grammar for standard compliance, but does NOT support `UNDO HANDLER` implementation (throws error if used).",
    explanation: "UNDO handler limitation in MySQL.",
    hint: "No, MySQL does not support UNDO handlers.",
    level: "expert"
  },
  {
    question: "How do you implement a 'Try-Catch' block structure in MySQL stored procedures?",
    shortAnswer: "By wrapping risky statements in an inner `BEGIN ... DECLARE EXIT HANDLER ... END;` block, emulating a Java/JavaScript try-catch.",
    explanation: "Emulating Try-Catch blocks in SQL.",
    hint: "Wrap statements in an inner BEGIN...END block with an EXIT HANDLER.",
    level: "expert"
  },
  {
    question: "How do you count total failed rows during a batch loop using a `CONTINUE` handler?",
    shortAnswer: "`DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET v_failed_count = v_failed_count + 1;`.",
    explanation: "Error counting in batch iterations.",
    hint: "Increment an error counter variable inside the CONTINUE handler.",
    level: "basic"
  },
  {
    question: "Can a `CONTINUE` handler catch warnings generated by `INSERT IGNORE`?",
    shortAnswer: "YES; by declaring `DECLARE CONTINUE HANDLER FOR SQLWARNING ...`.",
    explanation: "Warning interception with CONTINUE handler.",
    hint: "Yes, use DECLARE CONTINUE HANDLER FOR SQLWARNING.",
    level: "basic"
  },
  {
    question: "What is the order of execution when an error occurs: Trigger -> Procedure Handler?",
    shortAnswer: "If a trigger raises an error via `SIGNAL`, the procedure's active handler catches the exception raised by the trigger.",
    explanation: "Cross-routine exception propagation.",
    hint: "The procedure handler catches exceptions raised by internal triggers.",
    level: "expert"
  },
  {
    question: "Can an `EXIT` handler call another stored procedure?",
    shortAnswer: "YES; `DECLARE EXIT HANDLER FOR SQLEXCEPTION CALL sp_log_fatal_error();`.",
    explanation: "Invoking procedures from handlers.",
    hint: "Yes, handlers can execute CALL sp_log_error().",
    level: "basic"
  },
  {
    question: "How do you ensure resources (like temporary tables or locks) are cleaned up on `EXIT`?",
    shortAnswer: "Include explicit cleanup statements inside the handler body: `BEGIN ROLLBACK; DROP TEMPORARY TABLE IF EXISTS temp_batch; END;`.",
    explanation: "Resource cleanup in exit handlers.",
    hint: "Place cleanup statements (DROP TEMP TABLE, ROLLBACK) in the handler body.",
    level: "expert"
  },
  {
    question: "What happens if both an `EXIT` handler and a `CONTINUE` handler match the exact same error condition in the same block?",
    shortAnswer: "MySQL does not allow declaring multiple handlers for the exact same condition in the same block (throws duplicate handler error).",
    explanation: "Duplicate handler declaration error.",
    hint: "Duplicate handler declarations in the same block are forbidden.",
    level: "expert"
  },
  {
    question: "Can an `EXIT` handler re-throw the error after logging?",
    shortAnswer: "YES; by executing `RESIGNAL;` at the end of the `EXIT HANDLER` body.",
    explanation: "Logging and re-throwing with RESIGNAL.",
    hint: "Use RESIGNAL; at the end of the handler body.",
    level: "basic"
  },
  {
    question: "What is the senior architect's summary rule for CONTINUE vs EXIT Handlers in MySQL?",
    shortAnswer: "Use `EXIT HANDLER` with explicit `ROLLBACK;` for transactional data mutation procedures to prevent partial writes; use `CONTINUE HANDLER` for loop termination flags (`NOT FOUND`) and non-fatal warning counters; and isolate recoverable errors inside inner nested `BEGIN ... END` blocks.",
    explanation: "Authoritative architectural best practices for CONTINUE vs EXIT handlers.",
    hint: "EXIT for transactional rollback + CONTINUE for loop flags/counters + inner blocks for isolation.",
    level: "expert"
  }
];

export default questions;
