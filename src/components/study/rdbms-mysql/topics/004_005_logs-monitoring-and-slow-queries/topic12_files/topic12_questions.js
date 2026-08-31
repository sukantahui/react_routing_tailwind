// topic12_files/topic12_questions.js
// Module 004_005: Server Logs, Slow Query Analysis & Performance Schema
// Topic 12: Monitoring Tooling Ecosystem Overview: Prometheus MySQL Exporter, Grafana Dashboards, Percona Monitoring and Management (PMM)

const questions = [
  {
    question: "What are the 3 dominant open-source tools in the modern enterprise MySQL monitoring ecosystem?",
    shortAnswer: "1. **Prometheus `mysqld_exporter`** (time-series metrics collector on port 9104), 2. **Grafana** (visual dashboarding and alerting UI), and 3. **Percona Monitoring and Management (PMM)** (deep database observability platform with Query Analytics).",
    explanation: "Together, these tools provide complete real-time visibility into server metrics, replication topology health, and query-level execution profiles.",
    hint: "Prometheus mysqld_exporter, Grafana, and Percona PMM.",
    level: "basic",
    codeExample: `# Architecture:
# MySQL (3306) → mysqld_exporter (9104) → Prometheus (9090) → Grafana (3000)`
  },
  {
    question: "What default TCP network port is used by Prometheus `mysqld_exporter` to expose MySQL metrics?",
    shortAnswer: "TCP Port **9104** (e.g. `http://localhost:9104/metrics`).",
    explanation: "Prometheus server scrapes this HTTP endpoint at configured scrape intervals (e.g. every 15 seconds) to ingest time-series metrics.",
    hint: "Port 9104.",
    level: "basic",
    codeExample: `curl http://localhost:9104/metrics | grep mysql_global_status_`
  },
  {
    question: "What privileges must be granted to the dedicated monitoring database user created for `mysqld_exporter`?",
    shortAnswer: "`PROCESS`, `REPLICATION CLIENT`, and `SELECT` on `*.*`, `performance_schema.*`, and `sys.*` (restricted with `WITH MAX_USER_CONNECTIONS 5`).",
    explanation: "Adhering to the principle of least privilege ensures the exporter has read-only telemetry access without permissions to modify user data or tables.",
    hint: "PROCESS, REPLICATION CLIENT, SELECT on *.*, performance_schema, and sys.",
    level: "intermediate",
    codeExample: `CREATE USER 'exporter'@'127.0.0.1' IDENTIFIED BY 'SecurePass#2026' 
  WITH MAX_USER_CONNECTIONS 5;
GRANT PROCESS, REPLICATION CLIENT, SELECT ON *.* TO 'exporter'@'127.0.0.1';
GRANT SELECT ON performance_schema.* TO 'exporter'@'127.0.0.1';
GRANT SELECT ON sys.* TO 'exporter'@'127.0.0.1';`
  },
  {
    question: "What is Percona Monitoring and Management (PMM) Query Analytics (QAN)?",
    shortAnswer: "A specialized profiling tool within PMM that visualizes normalized SQL query execution distributions, 95th-percentile latencies, row examination counts, and query execution plans over time.",
    explanation: "QAN identifies which specific queries consume the most server time and correlates query spikes with hardware metrics.",
    hint: "PMM tool for deep query profiling, latency percentiles, and execution plans.",
    level: "intermediate",
    codeExample: `# PMM QAN analyzes queries collected from Performance Schema or Slow Log.`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, POS transactions slowed intermittently during sales. How did deploying Prometheus and Grafana resolve the mystery in 2 minutes?",
    shortAnswer: "The Grafana dashboard displayed a live correlation between a spike in `Innodb_buffer_pool_reads` (disk reads) and a drop in Buffer Pool Hit Ratio down to 86% whenever an unindexed product lookup was executed.",
    explanation: "Visualizing time-series metrics side-by-side confirmed disk cache eviction immediately, allowing Mamata to add the missing index across ₹1.2 Crores in store inventory.",
    hint: "Grafana dashboard visually correlated disk read spikes with buffer pool hit ratio drops.",
    level: "moderate",
    codeExample: `# Grafana PromQL:
# rate(mysql_global_status_innodb_buffer_pool_reads[1m])`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, how did Percona PMM's QAN save ₹500 Crores in daily banking transactions from replication lag outages?",
    shortAnswer: "PMM's QAN identified an unindexed ledger batch query executing with 45-second latency on the primary master that was serializing the replica's single-threaded SQL applier.",
    explanation: "QAN highlighted the missing composite index on the ledger table, eliminating the replication bottleneck before replica lag exceeded 2 seconds.",
    hint: "PMM QAN pinpointed the slow query causing replica applier serialization.",
    level: "expert",
    codeExample: `# PMM Client Setup:
pmm-admin add mysql --query-source=perfschema --service-name=kolkata-core-master`
  },
  {
    question: "What are the two query source options for Percona PMM Query Analytics, and which is recommended for production?",
    shortAnswer: "1. `perfschema` (collects queries from in-memory Performance Schema tables - **Recommended**), and 2. `slowlog` (parses the disk Slow Query Log).",
    explanation: "`--query-source=perfschema` collects 100% of query metrics directly from RAM with zero disk I/O and <1% CPU overhead.",
    hint: "perfschema (Recommended for zero disk I/O) and slowlog.",
    level: "intermediate",
    codeExample: `pmm-admin add mysql --query-source=perfschema`
  },
  {
    question: "What Prometheus collector flag enables detailed InnoDB engine metrics in `mysqld_exporter`?",
    shortAnswer: "`--collect.info_schema.innodb_metrics`.",
    explanation: "Collects over 200 granular internal InnoDB engine counters (e.g. adaptive hash index hits, buffer pool page cleaner flushes, row lock waits).",
    hint: "Use --collect.info_schema.innodb_metrics.",
    level: "intermediate",
    codeExample: `/usr/local/bin/mysqld_exporter --collect.info_schema.innodb_metrics`
  },
  {
    question: "What is a PromQL expression to calculate real-time Queries Per Second (QPS) in Prometheus / Grafana?",
    shortAnswer: "`rate(mysql_global_status_questions[1m])` (or `irate(mysql_global_status_questions[1m])`).",
    explanation: "Computes the per-second rate of increase of the cumulative `Questions` counter over a 1-minute rolling window.",
    hint: "rate(mysql_global_status_questions[1m]).",
    level: "basic",
    codeExample: `rate(mysql_global_status_questions[1m])`
  },
  {
    question: "What is the PromQL expression for calculating the InnoDB Buffer Pool Hit Ratio percentage in Grafana?",
    shortAnswer: "`(1 - (rate(mysql_global_status_innodb_buffer_pool_reads[5m]) / rate(mysql_global_status_innodb_buffer_pool_read_requests[5m]))) * 100`.",
    explanation: "Calculates the dynamic hit ratio based on recent 5-minute rates of physical disk reads vs logical read requests.",
    hint: "(1 - (rate(reads) / rate(read_requests))) * 100.",
    level: "intermediate",
    codeExample: `(1 - (rate(mysql_global_status_innodb_buffer_pool_reads[5m]) / 
      rate(mysql_global_status_innodb_buffer_pool_read_requests[5m]))) * 100`
  },
  {
    question: "What Prometheus Alertmanager rule triggers an alert when MySQL replication lag exceeds 30 seconds on a replica?",
    shortAnswer: "`mysql_slave_status_seconds_behind_master > 30` (or `mysql_replica_status_seconds_behind_source > 30`).",
    explanation: "Alerts the SRE team before stale data on read replicas impacts application user queries.",
    hint: "mysql_slave_status_seconds_behind_master > 30.",
    level: "basic",
    codeExample: `alert: MySQLReplicationLagHigh
expr: mysql_slave_status_seconds_behind_master > 30
for: 1m
labels:
  severity: critical
annotations:
  summary: "MySQL Replica Lag is over 30 seconds on {{ $labels.instance }}"`
  },
  {
    question: "What Prometheus Alertmanager rule triggers an alert when Connection Pool Saturation exceeds 80%?",
    shortAnswer: "`(mysql_global_status_threads_connected / mysql_global_variables_max_connections) * 100 > 80`.",
    explanation: "Provides early warning before connection pools fill completely and reject client connections.",
    hint: "(threads_connected / max_connections) * 100 > 80.",
    level: "basic",
    codeExample: `alert: MySQLConnectionSaturationHigh
expr: (mysql_global_status_threads_connected / mysql_global_variables_max_connections) * 100 > 80
for: 2m`
  },
  {
    question: "Why should `mysqld_exporter` be restricted using `WITH MAX_USER_CONNECTIONS 5` in MySQL?",
    shortAnswer: "To prevent a runaway or misconfigured scraper from opening hundreds of connections to MySQL and exhausting the database's available connection pool.",
    explanation: "Caps monitoring overhead and protects application connection availability.",
    hint: "Prevents the monitoring exporter from consuming too many connection slots.",
    level: "intermediate",
    codeExample: `ALTER USER 'exporter'@'127.0.0.1' WITH MAX_USER_CONNECTIONS 5;`
  },
  {
    question: "What is the role of Prometheus Alertmanager in the database monitoring pipeline?",
    shortAnswer: "It handles alerts sent by Prometheus, deduplicates and groups related alerts, routes notifications to PagerDuty, Slack, Opsgenie, or email, and manages alert silencing during scheduled maintenance.",
    explanation: "Prevents alert storms and routes notifications to the appropriate on-call database engineers.",
    hint: "Handles deduplication, grouping, silencing, and multi-channel notification routing.",
    level: "basic",
    codeExample: `# Alertmanager routes critical alerts to PagerDuty and warnings to Slack.`
  },
  {
    question: "What is the popular open-source Grafana dashboard ID for complete Percona MySQL monitoring?",
    shortAnswer: "Dashboard ID **7362** (Percona MySQL Overview) or Dashboard ID **14057** (MySQL Exporter Quickstart).",
    explanation: "Pre-configured dashboards with over 40 production charts covering QPS, replication, memory, locks, and I/O.",
    hint: "Grafana Dashboard ID 7362 or 14057.",
    level: "basic",
    codeExample: `# In Grafana UI: Dashboards → Import → Enter ID 7362`
  },
  {
    question: "What is Percona PMM Advisor and what does it do?",
    shortAnswer: "An automated security and best-practice analysis engine within PMM that continuously checks MySQL configuration for security vulnerabilities, missing indexes, deprecated parameters, and OS memory limits.",
    explanation: "Provides proactive recommendations to fix configuration flaws before they cause outages.",
    hint: "Automated checks for security vulnerabilities, missing indexes, and config best practices.",
    level: "intermediate",
    codeExample: `# PMM Advisors highlight unindexed tables, root remote logins, and memory overcommitment.`
  },
  {
    question: "How do you securely configure `mysqld_exporter` credentials without passing passwords in plaintext on the CLI?",
    shortAnswer: "Store database credentials in a secure configuration file (e.g. `/etc/.mysqld_exporter.cnf` with file permissions `0600`) and launch the exporter with `--config.my-cnf=/etc/.mysqld_exporter.cnf`.",
    explanation: "Prevents credentials from being visible in Linux `ps aux` process listings.",
    hint: "Use a secure /etc/.mysqld_exporter.cnf file with 0600 permissions.",
    level: "intermediate",
    codeExample: `[client]
user = exporter
password = ExporterSecurePass#2026
host = 127.0.0.1`
  },
  {
    question: "What does the Prometheus metric `mysql_up` indicate?",
    shortAnswer: "A binary gauge (`1` = MySQL server is reachable and answering queries; `0` = MySQL server is down, unreachable, or crashed).",
    explanation: "The primary health metric for high-priority host-down alerts.",
    hint: "Binary gauge: 1 if MySQL is up and responding; 0 if server is down.",
    level: "basic",
    codeExample: `alert: MySQLDown
expr: mysql_up == 0
for: 30s`
  },
  {
    question: "How do you monitor MySQL replication heartbeat and latency accurately using Percona `pt-heartbeat`?",
    shortAnswer: "By running `pt-heartbeat` on the primary master to update a timestamp table every second, and having replicas measure the difference between current time and the replicated timestamp.",
    explanation: "Provides microsecond-accurate replication lag measurements that are immune to clock skew and idle replica false positives.",
    hint: "Writes 1-second timestamp heartbeats to measure exact replication delay.",
    level: "expert",
    codeExample: `pt-heartbeat --database=sys --update --daemonize -h master.bank.com`
  },
  {
    question: "What is the CPU and memory footprint of running `mysqld_exporter` on a database host?",
    shortAnswer: "Typically under 20MB of RAM and <0.2% CPU utilization.",
    explanation: "Written in compiled Go, `mysqld_exporter` is ultra-lightweight and suitable for running on busy database servers.",
    hint: "Under 20MB RAM and <0.2% CPU.",
    level: "basic",
    codeExample: `# Resource usage is negligible.`
  },
  {
    question: "How does Datadog MySQL Agent compare to Prometheus `mysqld_exporter`?",
    shortAnswer: "Datadog is a fully managed commercial SaaS agent that combines metrics collection, distributed APM tracing, and structured JSON error log scraping into a single agent; Prometheus is open-source and requires self-hosted storage and Grafana.",
    explanation: "Both provide comprehensive MySQL observability across enterprise infrastructure.",
    hint: "Datadog is managed SaaS with logs/APM; Prometheus/Grafana is open-source self-hosted.",
    level: "intermediate",
    codeExample: `# Datadog agent configuration: /etc/datadog-agent/conf.d/mysql.d/conf.yaml`
  },
  {
    question: "How do you enable Performance Schema statement event collection in `mysqld_exporter`?",
    shortAnswer: "Pass `--collect.perf_schema.eventsstatements` to the exporter binary.",
    explanation: "Exposes top statement latency percentiles and normalized query counts directly to Prometheus.",
    hint: "Use --collect.perf_schema.eventsstatements.",
    level: "intermediate",
    codeExample: `/usr/local/bin/mysqld_exporter --collect.perf_schema.eventsstatements`
  },
  {
    question: "What is the difference between scraping MySQL metrics every 15 seconds versus every 1 second?",
    shortAnswer: "15-second scraping provides standard trend telemetry with minimal overhead; 1-second scraping is used for high-frequency live troubleshooting during active incidents to capture sub-second traffic micro-bursts.",
    explanation: "Standard Prometheus production scrape interval is typically 10 to 15 seconds.",
    hint: "15s is standard monitoring; 1s is high-resolution incident triage.",
    level: "basic",
    codeExample: `# Prometheus scrape_interval: 15s`
  },
  {
    question: "What PromQL expression calculates the percentage of InnoDB buffer pool dirty pages in Grafana?",
    shortAnswer: "`(mysql_global_status_innodb_buffer_pool_pages_dirty / mysql_global_status_innodb_buffer_pool_pages_total) * 100`.",
    explanation: "Monitors dirty page accumulation to verify that background page cleaners are keeping up with write throughput.",
    hint: "(pages_dirty / pages_total) * 100.",
    level: "intermediate",
    codeExample: `(mysql_global_status_innodb_buffer_pool_pages_dirty / 
 mysql_global_status_innodb_buffer_pool_pages_total) * 100`
  },
  {
    question: "What does `pmm-admin check-network` do?",
    shortAnswer: "It tests TCP network connectivity, latency, and TLS certificate validity between the PMM Client node and the central PMM Server.",
    explanation: "Verifies communication before adding database services to monitoring.",
    hint: "Tests network connectivity and TLS certificates between PMM Client and Server.",
    level: "basic",
    codeExample: `pmm-admin check-network`
  },
  {
    question: "How do you monitor individual MySQL database disk file growth over time in Prometheus?",
    shortAnswer: "Enable `--collect.info_schema.tables` in `mysqld_exporter`, which exports `mysql_info_schema_table_size_bytes` broken down by schema and table name.",
    explanation: "Allows setting up capacity alerts when specific tables approach disk quota limits.",
    hint: "Enable --collect.info_schema.tables for per-table byte sizing.",
    level: "expert",
    codeExample: `/usr/local/bin/mysqld_exporter --collect.info_schema.tables`
  },
  {
    question: "What is the impact of excessive metric collection flags in `mysqld_exporter` on a database with 10,000 tables?",
    shortAnswer: "Enabling `--collect.info_schema.tables` on thousands of tables can cause each scrape to execute heavy data dictionary queries, increasing MySQL CPU usage and memory consumption.",
    explanation: "Best practice on large schemas is to limit table-level metric collection or scrape them on longer intervals (e.g. 5 minutes).",
    hint: "Table collection on thousands of tables can cause data dictionary query overhead.",
    level: "expert",
    codeExample: `-- Avoid table-level collection on clusters with 10,000+ tables.`
  },
  {
    question: "How do you silence Prometheus alerts during a planned database maintenance window?",
    shortAnswer: "Create a Silence in Alertmanager specifying the target instance label and duration (e.g. `instance=\"mysql-master-01:9104\"` for 2 hours).",
    explanation: "Prevents false-positive PagerDuty alarms during planned restarts and schema migrations.",
    hint: "Create a Silence in Alertmanager UI during scheduled maintenance.",
    level: "basic",
    codeExample: `# In Alertmanager UI: New Silence → instance=mysql-master-01:9104`
  },
  {
    question: "What is the primary advantage of Percona PMM over standalone Prometheus/Grafana?",
    shortAnswer: "PMM provides out-of-the-box Query Analytics (QAN) that captures and visualizes SQL queries, execution histograms, and execution plans with zero setup, alongside specialized database security advisors.",
    explanation: "Standalone Prometheus/Grafana requires building custom query parsing pipelines, whereas PMM has query profiling built-in natively.",
    hint: "Built-in Query Analytics (QAN) and automated security/index advisors out-of-the-box.",
    level: "basic",
    codeExample: `-- PMM QAN provides instant query histograms and EXPLAIN plan visualizer.`
  },
  {
    question: "What is the primary operational takeaway of Topic 12 in Module 004_005?",
    shortAnswer: "Modern enterprise MySQL monitoring requires an integrated observability ecosystem: deploy **Prometheus `mysqld_exporter`** with a restricted least-privilege user (`WITH MAX_USER_CONNECTIONS 5`), visualize real-time QPS, replication lag, and buffer pool hit ratios using **Grafana Dashboards**, leverage **Percona PMM Query Analytics (QAN)** with `--query-source=perfschema` for zero-disk-I/O query profiling, and configure automated **Alertmanager** rules for proactive incident remediation.",
    explanation: "Building a comprehensive monitoring pipeline ensures sub-second failure detection, automated capacity scaling, and continuous 99.999% production uptime.",
    hint: "Summarize mysqld_exporter on port 9104, Grafana dashboards, Percona PMM QAN with perfschema, and Alertmanager rules.",
    level: "basic",
    codeExample: `-- Master Observability Setup Blueprint:
# 1. Least-Privilege Exporter User:
CREATE USER 'exporter'@'127.0.0.1' IDENTIFIED BY 'Pass#2026' WITH MAX_USER_CONNECTIONS 5;
GRANT PROCESS, REPLICATION CLIENT, SELECT ON *.* TO 'exporter'@'127.0.0.1';
GRANT SELECT ON performance_schema.* TO 'exporter'@'127.0.0.1';

# 2. PMM Client Registration:
pmm-admin add mysql --username=exporter --password=Pass#2026 --query-source=perfschema;`
  }
];

export default questions;
