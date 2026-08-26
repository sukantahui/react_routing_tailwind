// topic13_files/topic13_questions.js
// Topic 13: Database Auditing: Connection Logging, Audit Plugins, and Activity Monitoring

const questions = [
  {
    question: "What is the primary purpose of Database Auditing in enterprise environments?",
    shortAnswer: "To provide an immutable, non-repudiable audit trail of all database connections, security events, and query executions for forensic analysis and regulatory compliance.",
    explanation: "Auditing proves who accessed what data, from which IP address, at what exact microsecond, and whether the query succeeded or was rejected, satisfying mandates like PCI-DSS, SOC 2, and HIPAA.",
    hint: "Think about accountability, non-repudiation, and forensic incident reconstruction.",
    level: "basic",
    codeExample: `-- Enterprise Audit Plugin Event Record in JSON:
-- {"timestamp": "2026-08-25T10:15:30Z", "user": "app_user", "host": "10.0.1.15", "event": "query", "sql": "SELECT balance FROM accounts"}`
  },
  {
    question: "What is the MySQL General Query Log, and why is it usually disabled in production environments?",
    shortAnswer: "It records every single client connection and SQL statement received; it is disabled in production due to severe disk I/O overhead and massive storage growth.",
    explanation: "Because the General Query Log writes a record for every single query executed across all threads, enabling it in a high-throughput system processing 20,000 queries/sec creates extreme disk bottlenecks. It should only be used temporarily for debugging.",
    hint: "Captures all queries but incurs severe I/O and disk bloat penalties.",
    level: "basic",
    codeExample: `-- Enabling temporarily for debugging:
SET GLOBAL general_log = ON;
SET GLOBAL general_log_file = '/var/log/mysql/debug_general.log';
-- Remember to turn OFF after troubleshooting:
SET GLOBAL general_log = OFF;`
  },
  {
    question: "How does MySQL 8.0 log error messages in structured JSON format for containerized SIEM pipelines?",
    shortAnswer: "By configuring `log_error_services = 'log_filter_internal; log_sink_internal; log_sink_json'` in `my.cnf` or via `SET PERSIST`.",
    explanation: "MySQL 8.0 introduced the Error Log Component Architecture. Adding `log_sink_json` outputs machine-readable JSON logs alongside traditional text logs, enabling automated ingestion by Elastic Filebeat, Fluentd, and Datadog.",
    hint: "Configure log_error_services with log_sink_json.",
    level: "intermediate",
    codeExample: `SET PERSIST log_error_services = 'log_filter_internal; log_sink_internal; log_sink_json';
SET PERSIST log_error_verbosity = 3;`
  },
  {
    question: "What are the 4 values supported by `audit_log_policy` in the MySQL Enterprise Audit Plugin?",
    shortAnswer: "`ALL` (log all events), `LOGINS` (log connection handshakes only), `QUERIES` (log query executions only), and `NONE` (disable auditing).",
    explanation: "`audit_log_policy` provides a high-level filter controlling which categories of events are emitted by the audit plugin.",
    hint: "Recall: ALL, LOGINS, QUERIES, and NONE.",
    level: "basic",
    codeExample: `SET GLOBAL audit_log_policy = 'LOGINS';`
  },
  {
    question: "What is the difference between `ASYNCHRONOUS` and `SYNCHRONOUS` audit log strategy in MySQL?",
    shortAnswer: "`ASYNCHRONOUS` buffers audit records in memory and writes them in background threads (maximum performance); `SYNCHRONOUS` blocks the client query until the audit event is flushed to disk (maximum durability).",
    explanation: "`audit_log_strategy = ASYNCHRONOUS` avoids slowing down high-throughput transactions. `SYNCHRONOUS` ensures zero audit record loss even during sudden power failure.",
    hint: "Asynchronous buffers in RAM for speed; synchronous flushes before query returns.",
    level: "intermediate",
    codeExample: `SET GLOBAL audit_log_strategy = 'ASYNCHRONOUS';
SET GLOBAL audit_log_buffer_size = 16777216; -- 16MB buffer`
  },
  {
    question: "How does Rule-Based Audit Filtering in MySQL 8.0 prevent audit log bloat?",
    shortAnswer: "By defining custom JSON filter rules that target specific event classes (e.g. DDL statements, failed logins) while ignoring high-volume routine SELECT queries.",
    explanation: "Using `audit_log_filter_set_filter()` and `audit_log_filter_set_user()`, administrators can configure the plugin to audit only `CREATE`, `DROP`, `ALTER`, `GRANT`, and `REVOKE` queries, reducing log volume by over 95%.",
    hint: "Filters out high-frequency reads to focus strictly on administrative actions and DDL.",
    level: "expert",
    codeExample: `-- Define rule to audit only DDL queries:
SELECT audit_log_filter_set_filter('ddl_only', '{
  "filter": {
    "class": [
      { "name": "general", "event": { "name": "status", "data": { "query": { "prefix": ["CREATE", "ALTER", "DROP", "GRANT", "REVOKE"] } } } }
    ]
  }
}');
SELECT audit_log_filter_set_user('dev_team@%', 'ddl_only');`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, an unauthorized user attempted to drop the `orders` table at 2:00 AM. How did the audit log assist in forensic investigation?",
    shortAnswer: "The audit log recorded the exact timestamp, source IP address (`192.168.1.88`), client username (`contractor_temp`), and the failed query text with error code 1142.",
    explanation: "With full audit records, the security team pinpointed the exact compromised contractor workstation and revoked credentials within minutes of the incident.",
    hint: "Audit logs capture timestamps, source IPs, accounts, query text, and error codes.",
    level: "moderate",
    codeExample: `-- Forensic Audit Entry:
-- {"timestamp": "2026-08-25 02:14:02", "user": "contractor_temp", "ip": "192.168.1.88", "query": "DROP TABLE orders", "status": 1142}`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, how did they stream real-time database audit logs into Splunk across a ₹500 Crore transaction cluster?",
    shortAnswer: "They configured `audit_log_format = JSON` with asynchronous file rotation and used Splunk Universal Forwarder to tail and stream audit JSON files into the corporate SIEM indexers.",
    explanation: "Streaming JSON audit logs to an external SIEM ensures non-repudiation: even if a malicious DBA gains root access to the database server, past audit records stored on the remote SIEM cannot be modified or erased.",
    hint: "Stream JSON audit logs to an external SIEM to prevent local log tampering.",
    level: "expert",
    codeExample: `SET PERSIST audit_log_format = JSON;
SET PERSIST audit_log_rotate_on_size = 52428800; -- 50MB rotation`
  },
  {
    question: "What popular open-source audit plugins are available for MySQL Community Edition?",
    shortAnswer: "Percona Server Audit Plugin, MariaDB Server Audit Plugin (`server_audit.so`), and the McAfee MySQL Audit Plugin.",
    explanation: "These open-source plugins provide enterprise-grade connection and query auditing for MySQL Community Edition without requiring proprietary commercial licenses.",
    hint: "Percona, MariaDB Server Audit, and McAfee open-source audit plugins.",
    level: "basic",
    codeExample: `INSTALL PLUGIN server_audit SONAME 'server_audit.so';
SET GLOBAL server_audit_logging = ON;
SET GLOBAL server_audit_events = 'CONNECT,QUERY_DDL,QUERY_DCL';`
  },
  {
    question: "What does `log_error_verbosity` configure in MySQL 8.0?",
    shortAnswer: "It controls the granularity of messages written to the error log: `1` (Errors only), `2` (Errors and Warnings), and `3` (Errors, Warnings, and Informational connection notices).",
    explanation: "Setting `log_error_verbosity = 3` in production records notes about client connections, aborted connections, and TLS handshakes in the error log.",
    hint: "1: Errors, 2: Warnings, 3: Informational notices.",
    level: "basic",
    codeExample: `SET PERSIST log_error_verbosity = 3;`
  },
  {
    question: "What is Non-Repudiation in the context of database audit logs?",
    shortAnswer: "The assurance that an individual or service account cannot deny having executed a specific query or transaction because cryptographically verified audit records prove their action.",
    explanation: "Non-repudiation is achieved by capturing authenticated user identities, IP addresses, session tokens, and timestamps at the database engine interception layer.",
    hint: "Prevents users from denying their past database actions.",
    level: "basic",
    codeExample: `-- Immutable proof: User 'debangshu' ran 'ALTER USER' at 2026-08-25T11:00:00Z`
  },
  {
    question: "How do you configure automatic log rotation for the MySQL Enterprise Audit Plugin to prevent disk exhaustion?",
    shortAnswer: "Set `audit_log_rotate_on_size = N` (in bytes) and `audit_log_rotations = M`.",
    explanation: "When the audit log reaches size N (e.g. 50MB), MySQL closes the current file, renames it with a timestamp suffix, and starts a new file, maintaining up to M historical archive files.",
    hint: "Use audit_log_rotate_on_size and audit_log_rotations.",
    level: "intermediate",
    codeExample: `SET PERSIST audit_log_rotate_on_size = 52428800; -- 50MB
SET PERSIST audit_log_rotations = 10;           -- Keep 10 archives`
  },
  {
    question: "What information is captured in an audit record for a failed SQL Injection attempt?",
    shortAnswer: "The client IP, username, exact malicious SQL payload text, timestamp, and the non-zero MySQL error code (e.g. 1064 for syntax error or 1142 for access denied).",
    explanation: "Security analysts use these records to detect automated web vulnerability scanners and attack payloads in real time.",
    hint: "Captures the exact payload, timestamp, client IP, and resulting SQL error code.",
    level: "intermediate",
    codeExample: `-- Captured audit payload:
-- {"query": "SELECT * FROM users WHERE id = 1' UNION SELECT 1,2,3--", "status": 1064}`
  },
  {
    question: "What is the difference between Database Activity Monitoring (DAM) and native audit plugins?",
    shortAnswer: "Native audit plugins run inside the MySQL engine; DAM solutions (like Imperva SecureSphere or IBM Guardium) inspect network packets externally via network taps or host agents without modifying database internals.",
    explanation: "DAM provides independent external oversight with zero database CPU overhead, while native audit plugins capture all queries including local socket connections.",
    hint: "DAM inspects network traffic externally; audit plugins run inside the database engine.",
    level: "expert",
    codeExample: `-- DAM tools monitor port 3306 traffic externally via network taps.`
  },
  {
    question: "How do you audit which users currently have audit filters assigned in MySQL 8.0?",
    shortAnswer: "Query `SELECT * FROM mysql.audit_log_user;`.",
    explanation: "The `mysql.audit_log_user` table maps user accounts to their active audit filter definitions.",
    hint: "Inspect the mysql.audit_log_user table.",
    level: "intermediate",
    codeExample: `SELECT USER, HOST, FILTERNAME FROM mysql.audit_log_user;`
  },
  {
    question: "How do you remove an audit filter from a user in MySQL 8.0?",
    shortAnswer: "Execute `SELECT audit_log_filter_remove_user('username@host');`.",
    explanation: "This unassigns the filter, reverting the user to the default audit policy.",
    hint: "Use audit_log_filter_remove_user().",
    level: "basic",
    codeExample: `SELECT audit_log_filter_remove_user('dev_team@%');`
  },
  {
    question: "What is the `AUDIT_ADMIN` dynamic privilege in MySQL 8.0?",
    shortAnswer: "A dynamic privilege that grants administrative authority to install, configure, and manage audit log plugins and filter rules.",
    explanation: "Allows compliance officers to manage audit policies without requiring full `SUPER` or root data privileges.",
    hint: "Administrative privilege for managing audit plugins and rules.",
    level: "intermediate",
    codeExample: `GRANT AUDIT_ADMIN ON *.* TO 'compliance_lead'@'localhost';`
  },
  {
    question: "Why should audit log files be stored on a dedicated disk partition or forwarded off-host immediately?",
    shortAnswer: "To prevent high-volume audit logging from filling up the root or data disk partitions and crashing the database server.",
    explanation: "If audit logs share the data partition and fill 100% of disk space, MySQL will halt transactional write operations.",
    hint: "Prevents log growth from exhausting data partition storage.",
    level: "basic",
    codeExample: `# Mount /var/log/mysql/audit on a separate dedicated volume`
  },
  {
    question: "How can you audit all administrative schema alterations (`CREATE`, `ALTER`, `DROP`) performed in the last 24 hours from JSON audit logs using `jq`?",
    shortAnswer: "Pipe the JSON audit log through `jq 'select(.class == \"general\" and (.query | startswith(\"ALTER\") or startswith(\"DROP\")))'`.",
    explanation: "Command-line tools like `jq` enable fast forensic parsing of structured JSON audit logs.",
    hint: "Use jq to filter JSON audit streams on query prefixes.",
    level: "intermediate",
    codeExample: `cat audit.json | jq 'select(.data.query | test("^(CREATE|ALTER|DROP)"; "i"))'`
  },
  {
    question: "What does the `audit_log_connection_policy` variable configure in Percona Server / MySQL Enterprise?",
    shortAnswer: "It filters connection logging based on connection outcomes: `ALL` (all connections), `ERRORS` (only failed login attempts), or `NONE`.",
    explanation: "Setting connection policy to `ERRORS` is ideal for tracking brute-force password guessing attacks without logging millions of routine application pool connections.",
    hint: "Filters connection auditing to capture failed logins only.",
    level: "intermediate",
    codeExample: `SET GLOBAL audit_log_connection_policy = 'ERRORS';`
  },
  {
    question: "How does the MySQL Slow Query Log supplement security auditing?",
    shortAnswer: "It detects denial-of-service (DoS) attempts and unindexed query spam that could degrade cluster performance.",
    explanation: "An attacker executing massive unindexed cross joins (`SELECT * FROM a, b, c`) to starve server RAM is immediately flagged in the slow query log.",
    hint: "Detects resource exhaustion attacks and unindexed query spam.",
    level: "basic",
    codeExample: `SHOW VARIABLES LIKE 'slow_query_log';`
  },
  {
    question: "What is the `log_timestamps` system variable in MySQL 8.0, and why should it be set to `UTC`?",
    shortAnswer: "It controls the timezone used in log timestamps; setting it to `UTC` standardizes time across globally distributed clusters and SIEM indexers.",
    explanation: "Defaulting to `UTC` eliminates timezone confusion when correlating database logs with application server logs during security investigations.",
    hint: "Standardizes log timestamps to UTC for SIEM correlation.",
    level: "basic",
    codeExample: `SET PERSIST log_timestamps = 'UTC';`
  },
  {
    question: "How do you verify if the MySQL Enterprise Audit Plugin is actively loaded on the server?",
    shortAnswer: "Execute `SHOW PLUGINS LIKE 'audit_log';` or query `information_schema.PLUGINS`.",
    explanation: "Returns the plugin name, status (`ACTIVE`), and type (`AUDIT`).",
    hint: "Run SHOW PLUGINS LIKE 'audit_log'.",
    level: "basic",
    codeExample: `SHOW PLUGINS LIKE 'audit_log';`
  },
  {
    question: "Can audit log records be encrypted at rest on disk?",
    shortAnswer: "Yes, MySQL Enterprise Audit supports encrypting audit log files with a dedicated AES key stored in the MySQL Keyring.",
    explanation: "Ensures that even if an attacker gains OS read access to `/var/log/mysql`, the audit logs cannot be read without the keyring key.",
    hint: "Audit logs can be encrypted using the MySQL Keyring.",
    level: "expert",
    codeExample: `SET GLOBAL audit_log_encryption = 'AES';`
  },
  {
    question: "What is the security risk of leaving `log_output = 'TABLE'` with the General Query Log enabled indefinitely?",
    shortAnswer: "The `mysql.general_log` table will grow without bound, consuming table lock resources and filling storage until disk writes fail.",
    explanation: "`mysql.general_log` uses the CSV storage engine, which lacks indexes and causes severe locking overhead under heavy write traffic.",
    hint: "mysql.general_log CSV table causes extreme lock contention and disk bloat.",
    level: "expert",
    codeExample: `-- Avoid TABLE logging in production; use external FILE streaming instead.`
  },
  {
    question: "How does connection ID tracking in audit logs assist in forensic correlation?",
    shortAnswer: "It links a specific connection handshake event to all subsequent queries executed within that TCP session, allowing investigators to reconstruct the complete session timeline.",
    explanation: "Even if a connection executes 10,000 queries over 3 hours, filtering on `connection_id = 452` shows every action performed by that specific user session from login to disconnect.",
    hint: "Correlates all queries executed within a specific client TCP session.",
    level: "intermediate",
    codeExample: `-- Filter all actions in session 452:
-- jq 'select(.connection_id == 452)' audit.json`
  },
  {
    question: "What is an 'Alerting Rule' in a SIEM when monitoring database audit logs?",
    shortAnswer: "An automated trigger that notifies security teams (via Slack/PagerDuty) whenever suspicious events occur, such as 5+ failed logins in 1 minute or a DROP TABLE executed outside maintenance windows.",
    explanation: "SIEM rules convert raw audit log streams into actionable real-time security alerts.",
    hint: "Automated alert triggers on suspicious patterns like failed logins or unexpected DDL.",
    level: "basic",
    codeExample: `# SIEM Rule Example:
# condition: count(event.failed_login) > 5 within 1m -> Alert SOC`
  },
  {
    question: "How do you flush or reload audit log files after manual log rotation by the operating system logrotate utility?",
    shortAnswer: "Execute `SELECT audit_log_filter_flush();` or `FLUSH LOGS;`.",
    explanation: "Informs the audit plugin to close current file handles and reopen new log files following logrotate archival.",
    hint: "Use FLUSH LOGS to refresh file handles after OS log rotation.",
    level: "basic",
    codeExample: `FLUSH LOGS;`
  },
  {
    question: "What is the difference between MySQL Audit Logs and the Binary Log (Binlog)?",
    shortAnswer: "Binary logs record only committed data modifications (DML/DDL) for replication and point-in-time recovery; Audit logs record ALL events (including read-only SELECT queries, failed attempts, and connection logins).",
    explanation: "Binlog contains no record of `SELECT` queries or rejected authentication attempts. Only audit logs capture read traffic and security failures.",
    hint: "Binlogs track data changes for replication; audit logs track all queries and security events.",
    level: "intermediate",
    codeExample: `-- Binlog: Only writes (INSERT, UPDATE, DELETE, DDL)
-- Audit Log: Writes + Reads (SELECT) + Logins + Failures`
  },
  {
    question: "What is the primary operational takeaway of Topic 13 in Module 004_003?",
    shortAnswer: "Comprehensive database auditing provides essential accountability, non-repudiation, and threat detection: deploy structured JSON audit plugins, apply rule-based filtering to eliminate log bloat, stream logs asynchronously to an external SIEM, and automate real-time security alerts.",
    explanation: "Auditing transforms database security from passive defense into active observability. By maintaining immutable audit streams, organizations detect attacks in real time, reconstruct security incidents accurately, and ensure flawless compliance across regulatory frameworks.",
    hint: "Summarize structured JSON auditing, rule-based filtering, SIEM streaming, and real-time threat alerting.",
    level: "basic",
    codeExample: `-- Master Enterprise Auditing Architecture:
INSTALL COMPONENT 'file://component_audit_log';
SET PERSIST audit_log_format = JSON;
SET PERSIST audit_log_strategy = ASYNCHRONOUS;
SET PERSIST log_error_services = 'log_filter_internal; log_sink_internal; log_sink_json';`
  }
];

export default questions;
