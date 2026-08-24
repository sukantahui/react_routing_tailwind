// topic6_files/topic6_questions.js

const questions = [
  {
    question: "What are the three primary looping constructs supported in MySQL Stored Procedures?",
    shortAnswer: "1. `WHILE ... DO ... END WHILE;`, 2. `REPEAT ... UNTIL ... END REPEAT;`, and 3. `[label:] LOOP ... END LOOP [label];`.",
    explanation: "The three standard procedural iteration statements.",
    hint: "WHILE, REPEAT, and LOOP.",
    level: "basic"
  },
  {
    question: "How does a `WHILE` loop differ from a `REPEAT` loop regarding when the condition is tested?",
    shortAnswer: "A `WHILE` loop is a pre-test loop (checks condition *before* executing the body, running 0 or more times); a `REPEAT` loop is a post-test loop (checks condition *after* executing the body, running at least 1 time).",
    explanation: "Pre-test vs post-test execution mechanics.",
    hint: "WHILE tests before entry (0+ times); REPEAT tests after execution (1+ times).",
    level: "basic"
  },
  {
    question: "What is the exit condition rule for a `REPEAT ... UNTIL` loop in MySQL?",
    shortAnswer: "The `REPEAT` loop continues executing as long as the condition is FALSE, and terminates when the `UNTIL` condition evaluates to TRUE.",
    explanation: "Terminates on TRUE condition in REPEAT loops.",
    hint: "Terminates when the UNTIL condition becomes TRUE.",
    level: "moderate"
  },
  {
    question: "What is a unique syntax requirement on the `UNTIL` line in a `REPEAT` loop?",
    shortAnswer: "There is NO semicolon (`;`) allowed immediately after the `UNTIL search_condition` line (e.g. `UNTIL v_count >= 10 END REPEAT;`).",
    explanation: "Common syntax gotcha in MySQL REPEAT statements.",
    hint: "No semicolon after the UNTIL condition before END REPEAT.",
    level: "expert"
  },
  {
    question: "How does the `LEAVE` statement work in MySQL loops?",
    shortAnswer: "`LEAVE label;` immediately terminates and exits the labeled loop or `BEGIN ... END` block (equivalent to `break` in Java/C/JavaScript).",
    explanation: "Break loop control directive.",
    hint: "LEAVE label acts like 'break' in programming languages.",
    level: "basic"
  },
  {
    question: "How does the `ITERATE` statement work in MySQL loops?",
    shortAnswer: "`ITERATE label;` skips any remaining statements in the current cycle and immediately jumps to the next iteration of the labeled loop (equivalent to `continue`).",
    explanation: "Continue loop control directive.",
    hint: "ITERATE label acts like 'continue' in programming languages.",
    level: "basic"
  },
  {
    question: "How do attendance mock record generation scripts for Mamata, Susmita, Abhronila, and Debangshu illustrate `WHILE` loops?",
    shortAnswer: "`WHILE v_day <= 30 DO INSERT INTO attendance VALUES (p_student_id, DATE_ADD('2026-01-01', INTERVAL v_day DAY), 1); SET v_day = v_day + 1; END WHILE;`.",
    explanation: "Automated batch data seeding with WHILE loops.",
    hint: "Iterates 30 days and inserts attendance records with counter increment.",
    level: "basic"
  },
  {
    question: "Can a `LOOP` construct be used without a label?",
    shortAnswer: "Syntactically yes, but practically you cannot exit an unlabeled `LOOP` without raising an error or returning, so a label is required for `LEAVE label;`.",
    explanation: "Loop labeling requirement for clean termination.",
    hint: "A label is required so LEAVE can reference and exit the loop.",
    level: "basic"
  },
  {
    question: "What happens if a developer forgets to increment the counter variable (`SET i = i + 1;`) inside a `WHILE` loop?",
    shortAnswer: "The procedure enters an infinite loop, consuming 100% of a CPU core on the database server until killed or the connection times out.",
    explanation: "Infinite loop disaster in database procedures.",
    hint: "Enters an infinite loop and pegs server CPU utilization.",
    level: "basic"
  },
  {
    question: "How do you break out of an outer loop from inside an inner nested loop?",
    shortAnswer: "Label the outer loop (`outer_loop: WHILE ...`) and execute `LEAVE outer_loop;` from inside the inner loop.",
    explanation: "Multi-level labeled break.",
    hint: "Use LEAVE outer_loop_label from within the inner loop.",
    level: "moderate"
  },
  {
    question: "Can `ITERATE` be used in a `WHILE` or `REPEAT` loop if they are labeled?",
    shortAnswer: "YES; `ITERATE loop_label;` works in any labeled loop construct (`LOOP`, `WHILE`, or `REPEAT`).",
    explanation: "Universal iterate directive across all loop types.",
    hint: "Yes, ITERATE works in all labeled loop constructs.",
    level: "moderate"
  },
  {
    question: "How do you calculate exponential compound interest on student fee arrears using a `REPEAT` loop?",
    shortAnswer: "`REPEAT SET v_balance = v_balance * 1.02, v_months = v_months + 1; UNTIL v_months >= p_term END REPEAT;`.",
    explanation: "Post-test financial simulation loop.",
    hint: "Multiplies balance in each cycle UNTIL month target is reached.",
    level: "basic"
  },
  {
    question: "Can cursors (`CURSOR FOR SELECT`) be used inside `WHILE` or `LOOP` constructs?",
    shortAnswer: "YES; cursor iteration is almost always implemented inside a `LOOP` or `WHILE` construct with a `NOT FOUND` handler.",
    explanation: "Standard cursor processing architecture.",
    hint: "Yes, cursors iterate over result sets using procedural loops.",
    level: "basic"
  },
  {
    question: "What happens if an `ITERATE` statement is called without incrementing the loop counter first?",
    shortAnswer: "It triggers an infinite loop because the counter is never updated before the next cycle starts!",
    explanation: "Classic iterative infinite loop bug.",
    hint: "Causes an infinite loop if counter increment is skipped by ITERATE.",
    level: "expert"
  },
  {
    question: "How do you safely guard against runaway infinite loops in stored procedures?",
    shortAnswer: "Implement a safety hard-limit counter: `IF v_safety_counter > 100000 THEN LEAVE my_loop; END IF;`.",
    explanation: "Defensive loop bounding safeguard.",
    hint: "Implement a hard ceiling counter limit (e.g. max 100,000 iterations).",
    level: "expert"
  },
  {
    question: "Can `COMMIT` statements be executed inside a loop to commit transactions in smaller batches?",
    shortAnswer: "YES; batch committing (e.g. `IF MOD(v_counter, 1000) = 0 THEN COMMIT; START TRANSACTION; END IF;`) prevents huge undo logs during bulk data generation.",
    explanation: "Batch transactional chunking pattern.",
    hint: "Yes, periodically commit every N rows to avoid huge transaction logs.",
    level: "expert"
  },
  {
    question: "What closing keyword terminates a `WHILE` loop in MySQL?",
    shortAnswer: "`END WHILE;` (two words with semicolon).",
    explanation: "Mandatory WHILE loop terminator.",
    hint: "END WHILE;",
    level: "basic"
  },
  {
    question: "What closing keyword terminates a `REPEAT` loop in MySQL?",
    shortAnswer: "`END REPEAT;` (two words with semicolon).",
    explanation: "Mandatory REPEAT loop terminator.",
    hint: "END REPEAT;",
    level: "basic"
  },
  {
    question: "What closing keyword terminates a `LOOP` construct in MySQL?",
    shortAnswer: "`END LOOP [label];`.",
    explanation: "Mandatory LOOP construct terminator.",
    hint: "END LOOP [label];",
    level: "basic"
  },
  {
    question: "How do you generate numbers from 1 to $N$ into a temporary table using a `WHILE` loop?",
    shortAnswer: "`WHILE v_i <= p_n DO INSERT INTO temp_numbers VALUES (v_i); SET v_i = v_i + 1; END WHILE;`.",
    explanation: "Standard temporary table population loop.",
    hint: "Iterate from 1 to N and INSERT v_i into temporary table.",
    level: "basic"
  },
  {
    question: "Can a `LEAVE` statement be used to exit a labeled `BEGIN ... END` block without a loop?",
    shortAnswer: "YES; `my_block: BEGIN ... IF cond THEN LEAVE my_block; END IF; ... END my_block;` allows early exit from a routine block.",
    explanation: "Block-level early exit via LEAVE.",
    hint: "Yes, LEAVE can exit any labeled BEGIN ... END block early.",
    level: "expert"
  },
  {
    question: "What is the memory and CPU impact of running a 1,000,000 iteration loop in MySQL?",
    shortAnswer: "High database CPU utilization. For large set operations, set-based relational SQL (`INSERT ... SELECT`) or Recursive CTEs are drastically faster than row-by-row procedural loops.",
    explanation: "Procedural RBAR (Row-By-Agonizing-Row) vs Set-Based SQL.",
    hint: "Procedural loops are slower than set-based SQL; use set-based operations where possible.",
    level: "expert"
  },
  {
    question: "How do you skip even numbers in a loop using `ITERATE`?",
    shortAnswer: "`IF MOD(v_counter, 2) = 0 THEN SET v_counter = v_counter + 1; ITERATE my_loop; END IF;`.",
    explanation: "Conditional step skipping with ITERATE.",
    hint: "Check MOD(counter, 2) = 0, increment, and call ITERATE.",
    level: "basic"
  },
  {
    question: "Can loops be used inside User-Defined Stored Functions in MySQL?",
    shortAnswer: "YES; stored functions can contain `WHILE`, `REPEAT`, and `LOOP` constructs to compute complex algorithmic results (like factorials or Fibonacci numbers).",
    explanation: "Algorithmic computation inside stored functions.",
    hint: "Yes, loops are fully supported inside stored functions.",
    level: "basic"
  },
  {
    question: "Can loops be used inside Database Triggers in MySQL?",
    shortAnswer: "YES; triggers support looping constructs, though looping inside row-level triggers should be minimized to avoid slowing down OLTP DML statements.",
    explanation: "Trigger looping guidelines.",
    hint: "Yes, but should be used sparingly in triggers to maintain DML performance.",
    level: "moderate"
  },
  {
    question: "How do you implement a Fibonacci series generator procedure using a `WHILE` loop?",
    shortAnswer: "`WHILE v_i < p_n DO SET v_c = v_a + v_b, v_a = v_b, v_b = v_c, v_i = v_i + 1; INSERT INTO fib_series VALUES (v_c); END WHILE;`.",
    explanation: "Classic iterative algorithm in procedural SQL.",
    hint: "Update a, b, c variables iteratively in each cycle.",
    level: "moderate"
  },
  {
    question: "What happens if the initial condition of a `WHILE` loop evaluates to FALSE immediately?",
    shortAnswer: "The body of the `WHILE` loop is skipped completely (executes 0 times), and control passes directly to the statement following `END WHILE;`.",
    explanation: "Pre-test zero-iteration execution.",
    hint: "Loop body executes 0 times and skips immediately to END WHILE.",
    level: "basic"
  },
  {
    question: "What happens if the initial condition of a `REPEAT` loop evaluates to TRUE immediately?",
    shortAnswer: "The body executes ONCE, then the `UNTIL` condition checks TRUE, so the loop exits after exactly 1 iteration.",
    explanation: "Post-test single-iteration guarantee.",
    hint: "Body executes once and exits immediately on the post-test check.",
    level: "moderate"
  },
  {
    question: "Why do senior database engineers prefer Recursive CTEs over procedural loops for date grids?",
    shortAnswer: "Recursive CTEs execute in set-based engine memory in a single optimized pass, whereas procedural loops perform repetitive statement context-switching on the server.",
    explanation: "Set-based declarative query optimization vs procedural execution.",
    hint: "Recursive CTEs are set-based, faster, and avoid procedural context switching.",
    level: "expert"
  },
  {
    question: "What is the senior architect's summary rule for Looping Constructs in MySQL?",
    shortAnswer: "Use `WHILE ... DO` for general pre-test loops, `REPEAT ... UNTIL` when at least 1 iteration is guaranteed, and `LOOP` with `LEAVE` for complex multi-exit conditions; always ensure counters are incremented before `ITERATE`, protect against infinite loops with hard iteration ceilings, and favor set-based SQL when processing massive datasets.",
    explanation: "Authoritative architectural best practices for procedural iteration in MySQL.",
    hint: "WHILE for pre-test + REPEAT for 1+ runs + LEAVE/ITERATE loop control + safety ceilings.",
    level: "expert"
  }
];

export default questions;
