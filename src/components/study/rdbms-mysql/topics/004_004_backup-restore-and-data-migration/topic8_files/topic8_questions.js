// topic8_files/topic8_questions.js
// Module 004_004: Backup, Point-in-Time Recovery & Data Migration
// Topic 8: Locating Binary Log Positions and Restoring to a Specific Timestamp / Position

const questions = [
  {
    question: "What is the primary difference between inspecting binary logs via SQL (`SHOW BINLOG EVENTS`) versus CLI (`mysqlbinlog`)?",
    shortAnswer: "`SHOW BINLOG EVENTS` queries the active server via SQL to inspect high-level event headers; `mysqlbinlog` reads raw log files offline on disk and can decode binary ROW-based mutations into readable pseudo-SQL.",
    explanation: "`SHOW BINLOG EVENTS` is fast for real-time live inspection, but `mysqlbinlog --base64-output=DECODE-ROWS -v` provides in-depth forensic visibility into exact changed column values and transaction payloads.",
    hint: "SHOW BINLOG EVENTS is live SQL; mysqlbinlog is offline forensic file parsing.",
    level: "basic",
    codeExample: `-- Live SQL inspection:
SHOW BINLOG EVENTS IN 'binlog.000045' FROM 1582 LIMIT 20;

-- Offline CLI inspection:
mysqlbinlog --base64-output=DECODE-ROWS -v /var/log/mysql/binlog.000045`
  },
  {
    question: "What is the anatomy of `# at <pos>` and `end_log_pos` in a MySQL Binary Log entry?",
    shortAnswer: "`# at <pos>` marks the starting byte offset of an event in the binary log file; `end_log_pos` marks the byte offset where that event ends and the next event begins.",
    explanation: "When performing position-based Point-in-Time Recovery, the `--stop-position` parameter specifies the `# at <pos>` immediately before the unwanted destructive statement begins.",
    hint: "# at <pos> is start byte; end_log_pos is finish byte.",
    level: "basic",
    codeExample: `# at 928410                                     <-- Starting byte
#260825 14:30:00 server id 1  end_log_pos 928520 CRC32 0x7a81b901
DROP TABLE orders                               <-- Statement
# at 928520                                     <-- Next event starts here`
  },
  {
    question: "What is the 3-step formula to find the exact safe stop position for Point-in-Time Recovery?",
    shortAnswer: "Step 1: Search the binary log for the destructive query text (`DROP TABLE`, `TRUNCATE`). Step 2: Identify the `# at <pos>` immediately preceding that statement. Step 3: Set `--stop-position` to that `# at <pos>` value.",
    explanation: "Setting `--stop-position` to the starting byte of the destructive query ensures the MySQL server replays everything up to that byte and stops immediately before executing the disaster.",
    hint: "Search for query -> note pre-query '# at <pos>' -> set as --stop-position.",
    level: "intermediate",
    codeExample: `# Step 1: Search
mysqlbinlog -v binlog.000045 | grep -n -C 5 "DROP TABLE"
# Step 2: Note # at 928410
# Step 3: Replay
mysqlbinlog --start-position=1582 --stop-position=928410 binlog.000045 | mysql`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, a cashier ran `TRUNCATE TABLE active_carts;` at 16:15:00. The event started at `# at 512000` and ended at `end_log_pos 512150`. What was their exact `--stop-position`?",
    shortAnswer: "`--stop-position=512000`.",
    explanation: "Specifying 512000 replays all transactions prior to the TRUNCATE, stopping right before the TRUNCATE statement begins.",
    hint: "Use the starting byte offset of the TRUNCATE event.",
    level: "moderate",
    codeExample: `mysqlbinlog --start-position=1000 --stop-position=512000 --disable-log-bin \\
  /var/log/mysql/binlog.000018 | mysql -u root -p barrackpore_store`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, an unindexed `DELETE FROM transactions` executed at 13:00:00. How did Debangshu confirm the exact transaction boundaries in `binlog.000078`?",
    shortAnswer: "He used `mysqlbinlog --base64-output=DECODE-ROWS -vv binlog.000078 | grep -C 10 'DELETE FROM \`transactions\`'`, identifying the preceding `Xid` event at position 782010.",
    explanation: "Locating the preceding `Xid` (commit) event ensured all prior legitimate ledger transactions were cleanly committed before the bad DELETE began.",
    hint: "Identified the previous Xid commit event at position 782010.",
    level: "expert",
    codeExample: `mysqlbinlog --start-position=1582 --stop-position=782010 --disable-log-bin \\
  /var/log/mysql/binlog.000078 | mysql -u root -p kolkata_bank`
  },
  {
    question: "What does `SHOW BINLOG EVENTS` display for an InnoDB transaction commit?",
    shortAnswer: "An `Xid` event type displaying the transaction's unique internal transaction ID (`Xid = N`) and the resulting `End_log_pos` coordinate.",
    explanation: "`Xid` events confirm that all `Write_rows`, `Update_rows`, or `Delete_rows` statements within that transaction were durably committed.",
    hint: "An Xid event confirms a durable transaction commit.",
    level: "intermediate",
    codeExample: `SHOW BINLOG EVENTS IN 'binlog.000045' FROM 928300 LIMIT 5;
-- Event_type = 'Xid', Info = 'COMMIT /* xid=459102 */'`
  },
  {
    question: "What is a `Table_map` event in ROW-based binary logs?",
    shortAnswer: "A metadata event that maps a numeric table ID to the fully qualified database and table name (`kolkata_retail.orders`), defining column counts and metadata prior to row mutation events.",
    explanation: "Every `Write_rows`, `Update_rows`, or `Delete_rows` event is preceded by a `Table_map` event to tell the replay engine which table structure is being modified.",
    hint: "Maps numeric table IDs to database and table names before row mutations.",
    level: "expert",
    codeExample: `# at 928320
# Table_map: \`kolkata_retail\`.\`orders\` mapped to number 108`
  },
  {
    question: "How do you preview the exact SQL statements that will be executed by `mysqlbinlog` before piping them into the database?",
    shortAnswer: "Redirect the `mysqlbinlog` output to a file (`mysqlbinlog ... > restore_preview.sql`) and inspect it with a text editor or `grep`.",
    explanation: "Verifying that the destructive statement is not present in the preview file guarantees that the restore will not accidentally re-execute the disaster.",
    hint: "Redirect output to a preview file and grep for the destructive command.",
    level: "basic",
    codeExample: `mysqlbinlog --start-position=1582 --stop-position=928410 binlog.000045 > preview.sql
grep -i "DROP TABLE" preview.sql # Should return 0 matches!`
  },
  {
    question: "What is the difference between `--start-datetime` and `--start-position` when restoring across multiple binary log files?",
    shortAnswer: "`--start-position` applies ONLY to the first binary log file in the list, whereas `--start-datetime` evaluates timestamps across all specified binary log files.",
    explanation: "If you specify multiple log files with `--start-position=5000`, `mysqlbinlog` skips to position 5000 in the first file, then reads subsequent files from their beginning (position 4).",
    hint: "--start-position applies to the first log file; subsequent files are read from position 4.",
    level: "expert",
    codeExample: `mysqlbinlog --start-position=1582 binlog.000045 binlog.000046 | mysql -u root -p`
  },
  {
    question: "What is the difference between `--stop-position` and `--stop-datetime` when restoring across multiple binary log files?",
    shortAnswer: "`--stop-position` applies ONLY to the last binary log file in the list, whereas `--stop-datetime` stops processing as soon as any event across any file reaches that timestamp.",
    explanation: "When passing multiple files (`binlog.1 binlog.2`), `--stop-position=928410` will read `binlog.1` completely and stop at position 928410 inside `binlog.2`.",
    hint: "--stop-position applies to the final log file in the list.",
    level: "expert",
    codeExample: `mysqlbinlog binlog.000045 binlog.000046 --stop-position=928410 | mysql -u root -p`
  },
  {
    question: "How do you find which binary log file contains an incident that occurred at approximately 2:15 PM today?",
    shortAnswer: "Run `mysqlbinlog --start-datetime=\"2026-08-25 14:10:00\" --stop-datetime=\"2026-08-25 14:20:00\" binlog.* > search.sql` across candidate log files.",
    explanation: "Extracting a narrow time window across recent binary logs pinpoints the exact file and position containing the incident.",
    hint: "Filter candidate logs by a narrow datetime window.",
    level: "basic",
    codeExample: `mysqlbinlog --start-datetime="2026-08-25 14:10:00" --stop-datetime="2026-08-25 14:20:00" \\
  /var/log/mysql/binlog.00004* | grep -i "DROP TABLE"`
  },
  {
    question: "What is the initial starting position (`# at <pos>`) of user data events in any MySQL 8.0 binary log file?",
    shortAnswer: "Position `4` is the Format Description Header; the first user event typically begins at position `125` or `156` (or higher if GTID sets are enabled).",
    explanation: "Positions 0-124 are reserved for file format headers, magic numbers, and server metadata.",
    hint: "Positions 0 to 124 contain internal format description headers.",
    level: "basic",
    codeExample: `# at 4
#260825 00:00:00 server id 1  end_log_pos 125 CRC32 0x4a9b1c20 Format_desc`
  },
  {
    question: "How does `mysqlbinlog` handle `AUTO_INCREMENT` values during position-based roll-forward?",
    shortAnswer: "It embeds `SET INSERT_ID = N;` before each statement, ensuring that auto-increment columns receive the exact original generated IDs.",
    explanation: "This preserves foreign key relationships that reference auto-incremented primary keys.",
    hint: "Sets INSERT_ID=N before statements to preserve exact primary key IDs.",
    level: "intermediate",
    codeExample: `SET INSERT_ID = 10582/*!*/;
INSERT INTO orders VALUES (NULL, 'Mamata', 500.00);`
  },
  {
    question: "What is the purpose of the `--server-id` filter in `mysqlbinlog`?",
    shortAnswer: "It filters binary log events to only replay transactions that originated from a specific MySQL server ID in a multi-source or circular replication topology.",
    explanation: "Prevents replaying transactions generated by other replication masters in multi-source setups.",
    hint: "Filters events originating from a specific server ID.",
    level: "intermediate",
    codeExample: `mysqlbinlog --server-id=1 binlog.000045 | mysql -u root -p`
  },
  {
    question: "What does the `CRC32` checksum at the end of each binary log event record do?",
    shortAnswer: "It validates the cryptographic integrity of each event record on disk, verifying that the binary log has not suffered bit rot, truncation, or disk corruption.",
    explanation: "Introduced in MySQL 5.6/8.0 (`binlog_checksum = CRC32`), CRC32 detects corrupt log events before they can cause invalid replays.",
    hint: "Validates event integrity to prevent replaying corrupted disk blocks.",
    level: "intermediate",
    codeExample: `# #260825 14:30:00 server id 1  end_log_pos 928520 CRC32 0x7a81b901`
  },
  {
    question: "How do you extract binary log events for a specific database schema while ignoring all other schemas on a multi-tenant server?",
    shortAnswer: "Use `mysqlbinlog --database=kolkata_retail binlog.000045 | mysql -u root -p`.",
    explanation: "Filters out transactions that modified other schemas, applying changes exclusively to `kolkata_retail`.",
    hint: "Use --database=dbname in mysqlbinlog.",
    level: "basic",
    codeExample: `mysqlbinlog --database=kolkata_retail --disable-log-bin binlog.000045 | mysql -u root -p`
  },
  {
    question: "What happens if you accidentally specify `--stop-position` as the `end_log_pos` of the destructive statement instead of its starting position?",
    shortAnswer: "The replay will EXECUTE the destructive statement (e.g. `DROP TABLE`), repeating the disaster on the restored database.",
    explanation: "`--stop-position=N` processes all events up to byte offset N. If N is the end position of the `DROP TABLE`, the DROP is included in the replay.",
    hint: "Must specify the START position of the bad query to avoid executing it.",
    level: "basic",
    codeExample: `-- WRONG: --stop-position=928520 (Includes the DROP TABLE!) ❌
-- CORRECT: --stop-position=928410 (Stops immediately BEFORE the DROP TABLE!) ✅`
  },
  {
    question: "How does `mysqlbinlog` output transaction `BEGIN` and `COMMIT` boundaries in ROW-based logging?",
    shortAnswer: "It outputs `BEGIN` followed by `Table_map` and row mutation events, and concludes with an `Xid` event or explicit `COMMIT` statement.",
    explanation: "This ensures the entire transaction is applied atomically by the recovery server.",
    hint: "Wraps mutations between BEGIN and Xid / COMMIT.",
    level: "intermediate",
    codeExample: `BEGIN
/*!*/;
# at 928320 ... Table_map ...
# at 928380 ... Write_rows ...
# at 928410 ... Xid = 459102 ...
COMMIT/*!*/;`
  },
  {
    question: "What is the role of `mysqlbinlog --hexdump`?",
    shortAnswer: "It displays a raw hexadecimal and ASCII memory dump of each event packet alongside decoded fields for low-level forensic debugging.",
    explanation: "Useful for diagnosing corrupted binary log files or investigating binary log protocol bugs.",
    hint: "Outputs raw hex and ASCII byte dumps of log events.",
    level: "expert",
    codeExample: `mysqlbinlog --hexdump binlog.000045`
  },
  {
    question: "How can you speed up the replay of 50GB of binary logs into a recovery instance?",
    shortAnswer: "1. `SET sql_log_bin = 0;` 2. `SET foreign_key_checks = 0;` 3. `SET unique_checks = 0;` 4. Temporarily set `innodb_flush_log_at_trx_commit = 2`.",
    explanation: "Disabling secondary constraint checks and relaxing disk flushes removes CPU and disk I/O bottlenecks during bulk transaction replay.",
    hint: "Disable constraint validation and set innodb_flush_log_at_trx_commit=2.",
    level: "expert",
    codeExample: `SET GLOBAL innodb_flush_log_at_trx_commit = 2;
mysqlbinlog --disable-log-bin binlog.000045 binlog.000046 | mysql -u root -p
SET GLOBAL innodb_flush_log_at_trx_commit = 1;`
  },
  {
    question: "What is the `Previous-GTIDs` event at the beginning of a MySQL 8.0 binary log file?",
    shortAnswer: "An internal event that records the complete set of Global Transaction Identifiers (GTIDs) that were executed in all previous binary log files prior to this one.",
    explanation: "Allows replicas and tools to verify continuity without scanning every historical binary log on disk.",
    hint: "Records GTID sets committed in previous binary log files.",
    level: "expert",
    codeExample: `# Previous-GTIDs: 3e11fa47-71ca-11eb-9876-0242ac120002:1-49200`
  },
  {
    question: "How do you locate the exact transaction ID (GTID) of an accidental `DROP TABLE` in MySQL 8.0?",
    shortAnswer: "Search the decoded binary log with `mysqlbinlog -v` for `GTID_NEXT` immediately preceding the `DROP TABLE` statement.",
    explanation: "Each transaction is preceded by `SET @@SESSION.GTID_NEXT= 'UUID:SEQUENCE';`, providing the exact GTID number to skip.",
    hint: "Find the GTID_NEXT statement immediately preceding the DROP TABLE.",
    level: "expert",
    codeExample: `SET @@SESSION.GTID_NEXT= '3e11fa47-71ca-11eb-9876-0242ac120002:58204'/*!*/;
DROP TABLE orders;`
  },
  {
    question: "How can you skip a specific GTID transaction during replication or recovery without replaying byte offsets?",
    shortAnswer: "Set `gtid_next` to the bad GTID, execute an empty transaction (`BEGIN; COMMIT;`), and set `gtid_next = 'AUTOMATIC'`.",
    explanation: "Committing an empty transaction with that GTID marks it as executed in `gtid_executed`, causing MySQL to skip the actual destructive query.",
    hint: "Inject an empty dummy transaction with the bad GTID.",
    level: "expert",
    codeExample: `SET GTID_NEXT = '3e11fa47-71ca-11eb-9876-0242ac120002:58204';
BEGIN; COMMIT;
SET GTID_NEXT = 'AUTOMATIC';`
  },
  {
    question: "What is the significance of the `exec_time` field in a binary log Query event header?",
    shortAnswer: "The duration in seconds that the query took to execute on the primary server prior to being written to the binary log.",
    explanation: "Helps forensic analysts detect long-running or resource-intensive queries during incident investigations.",
    hint: "Shows the query execution duration on the primary server.",
    level: "intermediate",
    codeExample: `# Query thread_id=452 exec_time=4 error_code=0`
  },
  {
    question: "How does `mysqlbinlog` preserve user-defined session variables (like `@my_var = 10`) during replay?",
    shortAnswer: "It emits explicit `SET @\`my_var\`:=10;` statements in the SQL stream prior to queries that reference those user variables.",
    explanation: "Guarantees that stored procedures and dynamic SQL queries depending on user variables execute with identical input values.",
    hint: "Outputs SET statements to restore session user variables.",
    level: "basic",
    codeExample: `SET @\`discount_rate\`:=0.15/*!*/;`
  },
  {
    question: "Why should `mysqlbinlog` output be piped directly into `mysql` rather than saving giant intermediate `.sql` files on disk?",
    shortAnswer: "To save disk space, avoid extra disk write I/O, and stream transactions into the database engine immediately at line-rate speed.",
    explanation: "A 100GB binary log produces ~150GB of uncompressed SQL text; streaming directly through pipes uses zero intermediate disk storage.",
    hint: "Direct piping avoids extra disk I/O and saving massive intermediate SQL text files.",
    level: "basic",
    codeExample: `mysqlbinlog --disable-log-bin binlog.000045 | mysql -u root -p`
  },
  {
    question: "How do you verify if the MySQL Binary Log is currently enabled on a live server?",
    shortAnswer: "Execute `SHOW VARIABLES LIKE 'log_bin';` (should return `ON`).",
    explanation: "In MySQL 8.0, binary logging is enabled (`ON`) by default.",
    hint: "Inspect the log_bin system variable.",
    level: "basic",
    codeExample: `SHOW VARIABLES LIKE 'log_bin';`
  },
  {
    question: "What is the risk of performing Point-in-Time Recovery on a production master that is actively receiving application writes?",
    shortAnswer: "Replaying historical transactions will conflict with active live transactions, causing primary key collisions, lock deadlocks, and severe data corruption.",
    explanation: "PITR must always be performed either on an isolated restore server or with application traffic completely paused.",
    hint: "Always perform PITR on an isolated instance or with application writes blocked.",
    level: "basic",
    codeExample: `-- Never replay historical logs into an active multi-writer database!`
  },
  {
    question: "What tool in MySQL can be used to compare table data between the pre-disaster recovery instance and the production instance?",
    shortAnswer: "`pt-table-checksum` (from Percona Toolkit) or custom checksum comparison scripts.",
    explanation: "Validates that all recovered rows match expected pre-disaster values.",
    hint: "Use pt-table-checksum to verify data consistency across instances.",
    level: "intermediate",
    codeExample: `pt-table-checksum --host=127.0.0.1 -u root -p`
  },
  {
    question: "What is the primary operational takeaway of Topic 8 in Module 004_004?",
    shortAnswer: "Locating exact binary log coordinates gives database administrators microsecond precision during disaster recovery: master the 3-step formula (search query text, identify preceding `# at <pos>`, set as `--stop-position`), inspect events with `SHOW BINLOG EVENTS` and `mysqlbinlog -v`, verify transaction commit boundaries (`Xid`), and execute targeted position-based restoration with `--disable-log-bin`.",
    explanation: "Understanding binary log internals, event headers, and byte offset positions turns complex data corruption incidents into predictable, surgical recovery operations.",
    hint: "Summarize the 3-step formula, byte position precision, Xid boundaries, and safe replay.",
    level: "basic",
    codeExample: `-- Master Position-Based Recovery Workflow:
# Step 1: Find destructive query start byte:
mysqlbinlog -v /var/log/mysql/binlog.000045 | grep -n -C 5 "DROP TABLE"
# Step 2: Replay to exact start position (928410):
mysqlbinlog --start-position=1582 --stop-position=928410 --disable-log-bin \\
  /var/log/mysql/binlog.000045 | mysql -u root -p`
  }
];

export default questions;
