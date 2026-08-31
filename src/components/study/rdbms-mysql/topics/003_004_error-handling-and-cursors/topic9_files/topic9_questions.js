// topic9_files/topic9_questions.js

const questions = [
  {
    question: "What is the canonical loop construct recommended by senior MySQL database engineers for cursor traversal?",
    shortAnswer: "The labeled `LOOP ... END LOOP` paired with an immediate `IF v_done THEN LEAVE loop_label; END IF;` guard after `FETCH`.",
    explanation: "Standard enterprise cursor iteration pattern.",
    hint: "Labeled LOOP with LEAVE immediately after FETCH.",
    level: "basic"
  },
  {
    question: "Why MUST the `IF v_done THEN LEAVE loop_label; END IF;` check be placed IMMEDIATELY after the `FETCH` statement?",
    shortAnswer: "Because when `FETCH` hits the end of data, variables retain the last row's values; failing to exit immediately causes the last row to be processed a second time ('Phantom Last Row Bug').",
    explanation: "The phantom last row reprocessing bug.",
    hint: "To prevent re-processing the last valid row when FETCH returns no data.",
    level: "basic"
  },
  {
    question: "What does the `LEAVE label_name;` statement do inside a cursor loop?",
    shortAnswer: "It breaks out of the labeled loop immediately and resumes execution at the first statement following `END LOOP label_name;`.",
    explanation: "Mechanics of the LEAVE statement.",
    hint: "Immediately terminates the labeled loop.",
    level: "basic"
  },
  {
    question: "How do student records for Mamata, Susmita, Abhronila, and Debangshu illustrate cursor loop termination?",
    shortAnswer: "1. Loop fetches Mamata → 2. Fetches Susmita → 3. Fetches Abhronila → 4. Fetches Debangshu → 5. 5th FETCH raises NOT FOUND, sets `v_done = TRUE`, `LEAVE` exits before processing phantom 5th row.",
    explanation: "Loop termination trace across student records.",
    hint: "5th fetch sets v_done=TRUE, LEAVE exits immediately.",
    level: "basic"
  },
  {
    question: "What condition does the `DECLARE CONTINUE HANDLER FOR NOT FOUND` trap during cursor iteration?",
    shortAnswer: "SQLSTATE Class `'02'` (Error `1329`: No data to FETCH).",
    explanation: "NOT FOUND condition trapping.",
    hint: "SQLSTATE Class '02' / Error 1329.",
    level: "basic"
  },
  {
    question: "What happens if a cursor loop does NOT declare a handler for `NOT FOUND`?",
    shortAnswer: "When `FETCH` attempts to read past the final row, MySQL raises unhandled Error 1329 and crashes the stored procedure.",
    explanation: "Unhandled NOT FOUND crash.",
    hint: "The procedure crashes with unhandled Error 1329 on the final fetch.",
    level: "basic"
  },
  {
    question: "Can a cursor be iterated using a `WHILE` loop instead of `LOOP`?",
    shortAnswer: "YES; using a 'Prime-the-Pump' pattern: `FETCH cur INTO ...; WHILE NOT v_done DO ... FETCH cur INTO ...; END WHILE;`.",
    explanation: "WHILE loop cursor pattern with double fetch.",
    hint: "Yes, fetch before the loop and fetch at the end of each iteration.",
    level: "expert"
  },
  {
    question: "Can a cursor be iterated using a `REPEAT ... UNTIL` loop?",
    shortAnswer: "YES; `REPEAT FETCH cur INTO ...; IF NOT v_done THEN ... END IF; UNTIL v_done END REPEAT;`.",
    explanation: "REPEAT UNTIL cursor pattern.",
    hint: "Yes, but requires an internal IF NOT v_done check.",
    level: "expert"
  },
  {
    question: "What happens if you forget to reset `SET v_done = FALSE;` before opening a SECOND cursor in the same procedure?",
    shortAnswer: "The second cursor loop immediately sees `v_done = TRUE` and exits on the first iteration without processing any rows!",
    explanation: "Flag reset hazard across multiple cursors.",
    hint: "The second loop exits immediately without processing any rows.",
    level: "expert"
  },
  {
    question: "Can `ITERATE loop_label;` be used inside a cursor loop?",
    shortAnswer: "YES; `ITERATE` acts like `continue` in C/Java, skipping the rest of the loop body and jumping directly to the next loop cycle.",
    explanation: "Mechanics of the ITERATE statement.",
    hint: "Skips remaining statements and starts next loop cycle (like continue).",
    level: "basic"
  },
  {
    question: "How do you skip processing for inactive students inside a cursor loop?",
    shortAnswer: "`IF v_status = 'INACTIVE' THEN ITERATE student_loop; END IF;`.",
    explanation: "Conditional skipping with ITERATE.",
    hint: "Use IF condition THEN ITERATE loop_label; END IF;.",
    level: "basic"
  },
  {
    question: "What happens if a query inside the cursor loop body triggers `NOT FOUND` (e.g. an inner `SELECT ... INTO` that matches 0 rows)?",
    shortAnswer: "The inner `SELECT ... INTO` triggers the procedure's `NOT FOUND` handler, inadvertently setting `v_done = TRUE` and prematurely killing the cursor loop!",
    explanation: "The infamous inner SELECT INTO NOT FOUND collision bug.",
    hint: "The inner query triggers NOT FOUND, prematurely terminating the outer cursor loop.",
    level: "expert"
  },
  {
    question: "How do you prevent an inner `SELECT ... INTO` from prematurely terminating an outer cursor loop?",
    shortAnswer: "Wrap the inner `SELECT ... INTO` inside its own nested `BEGIN ... DECLARE CONTINUE HANDLER FOR NOT FOUND BEGIN END; ... END` block.",
    explanation: "Isolating inner NOT FOUND conditions with nested blocks.",
    hint: "Enclose inner SELECT INTO in a nested block with its own handler.",
    level: "expert"
  },
  {
    question: "Can you execute DML statements (`UPDATE`, `INSERT`, `DELETE`) inside a cursor loop?",
    shortAnswer: "YES; you can execute any DML statements inside the loop body using the fetched variable values.",
    explanation: "DML execution within cursor loops.",
    hint: "Yes, DML statements can use fetched variable values.",
    level: "basic"
  },
  {
    question: "Can you commit transactions inside a cursor loop periodically?",
    shortAnswer: "YES; by checking an iteration counter (e.g. `IF v_count % 500 = 0 THEN COMMIT; START TRANSACTION; END IF;`).",
    explanation: "Periodic chunked commits in cursor loops.",
    hint: "Yes, commit periodically using a counter to prevent lock escalation.",
    level: "expert"
  },
  {
    question: "What is the return value of `ROW_COUNT()` inside a cursor loop?",
    shortAnswer: "It reflects the number of rows affected by the most recently executed DML statement inside the loop, NOT the cursor's total rows.",
    explanation: "ROW_COUNT() in loop bodies.",
    hint: "Reflects the last DML statement's affected rows.",
    level: "moderate"
  },
  {
    question: "Can an `EXIT HANDLER` be used instead of a `CONTINUE HANDLER` to terminate a cursor loop?",
    shortAnswer: "YES; by enclosing the loop inside an inner `BEGIN ... END` block with an `EXIT HANDLER FOR NOT FOUND` that simply exits the inner block.",
    explanation: "EXIT handler cursor loop termination.",
    hint: "Yes, by wrapping the loop in an inner block with an EXIT handler.",
    level: "expert"
  },
  {
    question: "How do you accumulate a total running sum of tuition fees across all rows in a cursor loop?",
    shortAnswer: "Declare a total accumulator variable (`DECLARE v_total DECIMAL(12,2) DEFAULT 0.00;`) and add each row's fee: `SET v_total = v_total + v_fee;`.",
    explanation: "Accumulating running totals in cursor loops.",
    hint: "Add fetched value to an accumulator variable in each loop cycle.",
    level: "basic"
  },
  {
    question: "What happens if `FETCH` is placed BEFORE the loop, and no second `FETCH` exists inside the loop?",
    shortAnswer: "The loop processes the first row endlessly in an infinite loop because the pointer is never advanced.",
    explanation: "Missing loop fetch infinite loop.",
    hint: "Infinite loop processing row 1 forever.",
    level: "basic"
  },
  {
    question: "Can a cursor loop call another stored procedure on each iteration?",
    shortAnswer: "YES; `CALL sp_send_student_sms(v_student_id, v_phone, v_message);`.",
    explanation: "Procedure invocation per cursor row.",
    hint: "Yes, execute CALL sp_sub_routine(variables) in the loop body.",
    level: "basic"
  },
  {
    question: "How do you handle fatal errors inside a cursor loop without losing all previously processed rows?",
    shortAnswer: "Use `START TRANSACTION` and `COMMIT` per row or per chunk, and declare an `EXIT HANDLER` on an inner block to catch individual row failures.",
    explanation: "Per-row failure isolation in cursor loops.",
    hint: "Isolate each row in an inner transaction/block with its own error handler.",
    level: "expert"
  },
  {
    question: "What is the maximum number of iterations a cursor loop can perform in MySQL?",
    shortAnswer: "There is no fixed limit; it continues until all rows in the materialized result set are fetched or a `LEAVE` statement executes.",
    explanation: "Cursor loop iteration limit.",
    hint: "Limited only by result set size and execution timeout settings.",
    level: "basic"
  },
  {
    question: "Can a cursor loop be labeled with any valid SQL identifier?",
    shortAnswer: "YES; e.g. `student_billing_loop: LOOP ... END LOOP student_billing_loop;`.",
    explanation: "Loop label naming rules.",
    hint: "Yes, use any valid identifier as the loop label.",
    level: "basic"
  },
  {
    question: "What happens if the `LEAVE` statement references a label that does not match the enclosing loop?",
    shortAnswer: "MySQL throws a syntax compilation error (Error `1308`: LEAVE with no matching label).",
    explanation: "Label mismatch syntax error.",
    hint: "Throws Error 1308 (no matching label).",
    level: "basic"
  },
  {
    question: "Does `LEAVE` automatically close the cursor?",
    shortAnswer: "NO; `LEAVE` only exits the loop block; you MUST explicitly call `CLOSE cur;` following `END LOOP;`.",
    explanation: "Explicit CLOSE requirement after LEAVE.",
    hint: "No, you must explicitly call CLOSE after the loop.",
    level: "basic"
  },
  {
    question: "Can you place multiple `LEAVE` statements inside a single cursor loop?",
    shortAnswer: "YES; for example, `IF v_done THEN LEAVE loop_label; END IF;` and `IF v_error_count > 10 THEN LEAVE loop_label; END IF;`.",
    explanation: "Multiple exit conditions in loops.",
    hint: "Yes, multiple conditional LEAVE statements can be used.",
    level: "basic"
  },
  {
    question: "How do you measure elapsed execution time inside a cursor loop?",
    shortAnswer: "Capture microsecond timestamps using `NOW(6)` before and after the loop and compute `TIMESTAMPDIFF(MICROSECOND, v_start, NOW(6))`.",
    explanation: "Performance measurement in cursor loops.",
    hint: "Use NOW(6) and TIMESTAMPDIFF().",
    level: "expert"
  },
  {
    question: "What happens if a cursor loop modifies the table that the cursor is currently querying?",
    shortAnswer: "Because MySQL cursors are `ASENSITIVE`, the open cursor may read from its internal temporary snapshot and will not reflect changes made during iteration.",
    explanation: "Asensitive snapshot isolation during self-mutation.",
    hint: "The cursor reads from its snapshot and may not see concurrent updates.",
    level: "expert"
  },
  {
    question: "Why is a `LOOP ... LEAVE` structure preferred over `WHILE NOT v_done` for cursors?",
    shortAnswer: "Because `LOOP ... LEAVE` requires only a single `FETCH` statement placed centrally at the top of the loop, eliminating duplicate fetch statements and prime-the-pump boilerplate.",
    explanation: "Code cleanliness and ergonomics of LOOP vs WHILE.",
    hint: "Avoids duplicate FETCH statements and cleaner single-point exit logic.",
    level: "expert"
  },
  {
    question: "What is the senior architect's summary rule for Cursor Iteration and NOT FOUND Termination?",
    shortAnswer: "Always use labeled `LOOP ... LEAVE` constructs; always place the `IF v_done THEN LEAVE loop_label; END IF;` guard immediately after `FETCH`; isolate inner queries in nested blocks to prevent NOT FOUND handler collisions; and always explicitly reset flags and `CLOSE` cursors upon loop exit.",
    explanation: "Authoritative architectural best practices for cursor loop iteration.",
    hint: "Labeled LOOP + immediate IF v_done guard + isolate inner queries + explicit CLOSE.",
    level: "expert"
  }
];

export default questions;
