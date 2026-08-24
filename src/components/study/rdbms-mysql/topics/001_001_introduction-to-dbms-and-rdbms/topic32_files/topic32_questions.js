/**
 * Topic 32: Configuring MySQL Server – FAQ Questions
 * 30 questions ranging from moderate to expert level.
 */
const questions = [
  {
    question: "What is the name of the MySQL configuration file?",
    shortAnswer:
      "The MySQL configuration file is `my.cnf` on Linux/macOS and `my.ini` on Windows.",
    explanation:
      "These files contain settings that control the MySQL server's behaviour, such as port, buffer sizes, and logging.",
    hint: "Think about the file extension difference between Unix and Windows.",
    level: "basic",
  },
  {
    question: "Where is the MySQL configuration file located on Linux?",
    shortAnswer:
      "Common locations are `/etc/mysql/my.cnf`, `/etc/my.cnf`, or `/usr/etc/my.cnf`.",
    explanation:
      "The exact location depends on the distribution and installation method. You can find it by running `mysqld --verbose --help | grep cnf`.",
    hint: "Think about the typical Linux configuration directories.",
    level: "intermediate",
  },
  {
    question: "Where is the MySQL configuration file located on Windows?",
    shortAnswer:
      "Common locations are `C:\\ProgramData\\MySQL\\MySQL Server X.X\\my.ini` or `C:\\Program Files\\MySQL\\MySQL Server X.X\\my.ini`.",
    explanation:
      "The ProgramData folder is hidden by default. You may need to show hidden files.",
    hint: "Think about the ProgramData folder.",
    level: "intermediate",
  },
  {
    question: "What is the default MySQL port number and where is it configured?",
    shortAnswer:
      "The default port is 3306, configured by the `port` parameter in the `[mysqld]` section.",
    explanation:
      "You can change this port if you have conflicts or for security reasons.",
    hint: "Think about the default MySQL port.",
    level: "basic",
  },
  {
    question: "What is the `max_connections` parameter and why is it important?",
    shortAnswer:
      "It sets the maximum number of simultaneous client connections. Default is 151.",
    explanation:
      "If you have more users than `max_connections`, they will be denied connection. Tune this based on your expected user load.",
    hint: "Think about how many users can connect at once.",
    level: "intermediate",
  },
  {
    question: "What is the `innodb_buffer_pool_size` parameter?",
    shortAnswer:
      "It defines the size of the InnoDB buffer pool, which caches table data and indexes in memory.",
    explanation:
      "Setting this to 50-70% of your total RAM can dramatically improve performance for InnoDB tables.",
    hint: "Think about the most important InnoDB cache.",
    level: "intermediate",
  },
  {
    question: "What is the `datadir` parameter?",
    shortAnswer:
      "It specifies the directory where MySQL stores database data files.",
    explanation:
      "The default is `/var/lib/mysql` on Linux and `C:\\ProgramData\\MySQL\\MySQL Server X.X\\Data` on Windows.",
    hint: "Think about where the database files are stored.",
    level: "basic",
  },
  {
    question: "What is the `log_error` parameter?",
    shortAnswer:
      "It specifies the file where MySQL writes error logs.",
    explanation:
      "The error log is critical for troubleshooting. Check it first when MySQL fails to start.",
    hint: "Think about where errors are logged.",
    level: "basic",
  },
  {
    question: "What is the `max_allowed_packet` parameter?",
    shortAnswer:
      "It sets the maximum size of a packet or any generated/intermediate string.",
    explanation:
      "If you need to store large blobs or use large queries, you may need to increase this from the default 64M.",
    hint: "Think about the maximum size of a data packet.",
    level: "intermediate",
  },
  {
    question: "How do I reload MySQL configuration without restarting the server?",
    shortAnswer:
      "You can use `mysqladmin reload` or in MySQL run `FLUSH PRIVILEGES;` (for privilege changes) but many parameters require a full restart.",
    explanation:
      "For most configuration changes, a full restart is necessary. Use `sudo systemctl restart mysql`.",
    hint: "Think about reloading without a full restart.",
    level: "expert",
  },
  {
    question: "How do I restart MySQL on Linux?",
    shortAnswer:
      "Use `sudo systemctl restart mysql` (systemd) or `sudo service mysql restart` (SysV).",
    explanation:
      "Restarting applies any configuration changes. It's the most common way to reload config.",
    hint: "Think about the systemctl command.",
    level: "basic",
  },
  {
    question: "How do I restart MySQL on Windows?",
    shortAnswer:
      "Go to Services (services.msc), find MySQL, and click 'Restart', or use `net stop MySQL` and `net start MySQL`.",
    explanation:
      "Restarting applies configuration changes. The service name may be `MySQL80` or similar.",
    hint: "Think about Windows services.",
    level: "basic",
  },
  {
    question: "What is the `bind-address` parameter?",
    shortAnswer:
      "It specifies which network interfaces MySQL listens on. The default is `0.0.0.0` (all) or `127.0.0.1` (localhost only).",
    explanation:
      "Setting this to `127.0.0.1` improves security by only allowing local connections.",
    hint: "Think about which IP addresses MySQL listens on.",
    level: "intermediate",
  },
  {
    question: "What is the `query_cache_type` parameter?",
    shortAnswer:
      "It enables or disables the query cache. In MySQL 8.0 it is disabled by default and deprecated.",
    explanation:
      "The query cache was removed in MySQL 8.0 due to scalability issues. In earlier versions, it could improve performance for read-heavy workloads.",
    hint: "Think about caching query results.",
    level: "intermediate",
  },
  {
    question: "What is the `innodb_file_per_table` parameter?",
    shortAnswer:
      "It enables each InnoDB table to have its own tablespace file (.ibd).",
    explanation:
      "This is enabled by default in modern MySQL. It makes it easier to manage individual tables and reclaim space.",
    hint: "Think about separate files for each table.",
    level: "intermediate",
  },
  {
    question: "How do I check the current value of a configuration parameter?",
    shortAnswer:
      "You can use `SHOW VARIABLES LIKE '%param_name%';` in the MySQL client.",
    explanation:
      "This returns the current value of any server variable, including those set in the configuration file.",
    hint: "Think about the SHOW VARIABLES command.",
    level: "basic",
  },
  {
    question: "What is the `slow_query_log` parameter?",
    shortAnswer:
      "It enables logging of slow queries (queries that take longer than `long_query_time`).",
    explanation:
      "This is useful for identifying performance bottlenecks. Enable it in development and production.",
    hint: "Think about logging slow queries.",
    level: "intermediate",
  },
  {
    question: "What is the `long_query_time` parameter?",
    shortAnswer:
      "It defines the threshold (in seconds) for a query to be considered 'slow' and logged.",
    explanation:
      "Default is 10 seconds. For performance tuning, you might set it to 2 or 5 seconds.",
    hint: "Think about the time threshold for slow queries.",
    level: "intermediate",
  },
  {
    question: "What is the `character-set-server` parameter?",
    shortAnswer:
      "It sets the default character set for the server. The recommended value is `utf8mb4`.",
    explanation:
      "`utf8mb4` supports full Unicode, including emojis. It's the modern standard.",
    hint: "Think about character encoding.",
    level: "intermediate",
  },
  {
    question: "Can I set configuration parameters at runtime without restarting?",
    shortAnswer:
      "Yes, some parameters can be set globally at runtime using `SET GLOBAL variable = value;`.",
    explanation:
      "However, many critical parameters (like `innodb_buffer_pool_size`) require a restart.",
    hint: "Think about dynamic settings.",
    level: "expert",
  },
  {
    question: "What is the `tmp_table_size` parameter?",
    shortAnswer:
      "It sets the maximum size of temporary tables that can be stored in memory. Exceeding this size writes temporary tables to disk.",
    explanation:
      "Increasing this can improve performance if you have many complex queries using temp tables.",
    hint: "Think about temporary table size.",
    level: "expert",
  },
  {
    question: "What is the `max_heap_table_size` parameter?",
    shortAnswer:
      "It sets the maximum size of user-created MEMORY tables.",
    explanation:
      "It's similar to `tmp_table_size` but for explicit MEMORY tables.",
    hint: "Think about in-memory tables.",
    level: "expert",
  },
  {
    question: "What is the `thread_cache_size` parameter?",
    shortAnswer:
      "It sets the number of threads that the server can cache to reuse for new connections.",
    explanation:
      "Caching threads reduces the overhead of creating new threads for each connection.",
    hint: "Think about thread reuse.",
    level: "intermediate",
  },
  {
    question: "What is the `table_open_cache` parameter?",
    shortAnswer:
      "It sets the number of open tables that can be cached by the server.",
    explanation:
      "If this is too low, you may see performance degradation from constant table opening and closing.",
    hint: "Think about table caching.",
    level: "intermediate",
  },
  {
    question: "How do I find the current MySQL configuration file being used?",
    shortAnswer:
      "Run `mysqld --verbose --help | grep cnf` to see the list of files MySQL checks.",
    explanation:
      "The first file in the list that exists is the one being used.",
    hint: "Think about the --verbose --help option.",
    level: "expert",
  },
  {
    question: "What is the `secure_file_priv` parameter?",
    shortAnswer:
      "It restricts the directories from which MySQL can load or write files (e.g., with LOAD DATA INFILE).",
    explanation:
      "Setting this improves security by preventing arbitrary file access.",
    hint: "Think about file access security.",
    level: "intermediate",
  },
  {
    question: "What is the `innodb_log_file_size` parameter?",
    shortAnswer:
      "It sets the size of each InnoDB log file in the log group.",
    explanation:
      "Larger log files can improve performance for write-heavy workloads but increase recovery time.",
    hint: "Think about transaction log size.",
    level: "expert",
  },
  {
    question: "What is the `sync_binlog` parameter?",
    shortAnswer:
      "It controls how often the binary log is synchronised to disk. A value of 1 ensures maximum durability.",
    explanation:
      "For critical data, set it to 1. For better performance, you can set it to 0 or a higher number.",
    hint: "Think about binary log sync.",
    level: "expert",
  },
  {
    question: "What is the `expire_logs_days` parameter?",
    shortAnswer:
      "It sets the number of days to keep binary logs before automatic deletion.",
    explanation:
      "This helps manage disk space. A value of 7 days is common.",
    hint: "Think about log retention.",
    level: "intermediate",
  },
  {
    question: "How do I back up the MySQL configuration file?",
    shortAnswer:
      "Simply copy the file: `sudo cp /etc/mysql/my.cnf /etc/mysql/my.cnf.bak`.",
    explanation:
      "Always backup before making changes so you can revert if something goes wrong.",
    hint: "Think about making a copy of the file.",
    level: "basic",
  },
  {
    question: "What is the best way to tune MySQL for a new application?",
    shortAnswer:
      "Start with the default configuration, monitor performance, and adjust parameters like `innodb_buffer_pool_size`, `max_connections`, and `query_cache` based on workload.",
    explanation:
      "Use tools like `mysqltuner` to get recommendations. Tune iteratively based on your specific data and queries.",
    hint: "Think about a systematic tuning approach.",
    level: "expert",
  },
];

export default questions;