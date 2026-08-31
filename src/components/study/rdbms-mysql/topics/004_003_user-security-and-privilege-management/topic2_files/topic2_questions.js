// topic2_files/topic2_questions.js

const questions = [
  {
    question: "In MySQL on Linux/Unix systems, how does connecting to `localhost` differ from connecting to `127.0.0.1`?",
    shortAnswer: "- **`localhost`**: Connects via the local **UNIX Domain Socket file** (e.g. `/var/run/mysqld/mysqld.sock`), bypassing TCP/IP entirely.\n- **`127.0.0.1`**: Connects over the **TCP/IP network stack** via loopback.",
    explanation: "Fundamental architectural difference in MySQL client connection routing.",
    hint: "localhost uses the Unix socket; 127.0.0.1 uses TCP/IP loopback.",
    level: "basic"
  },
  {
    question: "Does the wildcard host `'%'` match a client connecting from `localhost` via a Unix domain socket?",
    shortAnswer: "No! The `'%'` wildcard matches **ANY host connecting over TCP/IP**, but it does NOT match local Unix domain socket connections (`localhost`).",
    explanation: "Common reason why 'user'@'%' fails when connecting locally without -h 127.0.0.1.",
    hint: "No, % matches any TCP/IP host, but not Unix socket connections.",
    level: "basic"
  },
  {
    question: "What is the difference between `USER()` and `CURRENT_USER()` in MySQL?",
    shortAnswer: "- **`USER()`**: Returns how the client **attempted to authenticate** (e.g. `'mamata'@'192.168.1.50'`).\n- **`CURRENT_USER()`**: Returns the exact account record in `mysql.user` that **matched and granted privileges** (e.g. `'mamata'@'192.168.1.%'`).",
    explanation: "Essential for debugging which specific host grant rule was matched by MySQL.",
    hint: "USER() is the client connection string; CURRENT_USER() is the matched grant account.",
    level: "basic",
    codeExample: "SELECT USER(), CURRENT_USER();"
  },
  {
    question: "In what order does MySQL evaluate matching accounts when a client connects?",
    shortAnswer: "MySQL sorts matching accounts from **most specific to most general**:\n1. Exact IP Address (e.g. `'192.168.1.50'`)\n2. Subnet Mask (e.g. `'192.168.1.0/255.255.255.0'`)\n3. Prefix Wildcard (e.g. `'192.168.1.%'`)\n4. Universal Wildcard (`'%'`)\n5. Anonymous accounts (`''@'...'`)",
    explanation: "Guarantees that specific host grants take precedence over broad wildcards.",
    hint: "Exact IP first → Subnet → Prefix wildcard → % wildcard last.",
    level: "expert"
  },
  {
    question: "If both `'dev'@'192.168.1.50'` and `'dev'@'192.168.1.%'` exist, which account matches a connection from `192.168.1.50`?",
    shortAnswer: "**`'dev'@'192.168.1.50'`** (The exact IP match takes precedence because it is more specific).",
    explanation: "Demonstrates the most-specific-match resolution rule.",
    hint: "'dev'@'192.168.1.50' because exact IP is more specific than wildcard prefix.",
    level: "basic"
  },
  {
    question: "How do you specify a subnet mask in a MySQL host definition?",
    shortAnswer: "`'username'@'192.168.1.0/255.255.255.0'` (or `/24` netmask format).",
    explanation: "Allows restricting access to an entire corporate network segment.",
    hint: "'user'@'192.168.1.0/255.255.255.0'.",
    level: "basic",
    codeExample: "CREATE USER 'finance_app'@'10.20.0.0/255.255.0.0' \nIDENTIFIED BY 'SecurePass#2026';"
  },
  {
    question: "What is an Anonymous User in MySQL, and why is it a security risk?",
    shortAnswer: "An account created with an empty username (e.g. `''@'localhost'`), which allows **anyone to connect without a username**, potentially intercepting connections intended for specific named accounts.",
    explanation: "Must always be dropped during initial database hardening.",
    hint: "An account with an empty username that allows unauthenticated logins.",
    level: "expert"
  },
  {
    question: "Why should you avoid using domain hostnames (e.g. `'user'@'appserver.example.com'`) in production MySQL accounts?",
    shortAnswer: "Because every client connection triggers a **reverse DNS lookup** to resolve the client IP to a hostname; if the DNS server is slow or fails, database connection handshakes will experience severe latency or timeout completely.",
    explanation: "DNS lookups introduce external network latency into database connection establishment.",
    hint: "Triggers reverse DNS lookups, adding latency and failing if DNS is unavailable.",
    level: "expert"
  },
  {
    question: "What does the server configuration parameter `skip_name_resolve = 1` do?",
    shortAnswer: "It **disables all DNS hostname resolution** on incoming client connections; MySQL matches incoming connections exclusively using IP addresses and subnet masks, ensuring instant sub-millisecond connection handshakes.",
    explanation: "Mandatory enterprise configuration parameter in my.cnf.",
    hint: "Disables DNS hostname lookups, requiring all host grants to use IP addresses.",
    level: "basic",
    codeExample: "# In /etc/mysql/my.cnf [mysqld]\nskip_name_resolve = 1"
  },
  {
    question: "What happens if you have accounts defined with hostnames (e.g. `'user'@'webserver'`) when `skip_name_resolve` is enabled?",
    shortAnswer: "Those users will **never be able to log in**, because MySQL will only see incoming client IP addresses and will not resolve hostnames.",
    explanation: "All accounts must be migrated to IP addresses before enabling skip_name_resolve.",
    hint: "Hostname accounts will fail authentication because hostnames are no longer resolved.",
    level: "expert"
  },
  {
    question: "How do you specify IPv6 localhost in MySQL?",
    shortAnswer: "`'username'@'::1'`",
    explanation: "Standard IPv6 loopback address format.",
    hint: "'username'@'::1'.",
    level: "basic"
  },
  {
    question: "Can `'user'@'localhost'` and `'user'@'%'` have completely different passwords?",
    shortAnswer: "Yes! They are treated as **two completely distinct user accounts** in `mysql.user`, each with their own password hash, authentication plugin, and privilege set.",
    explanation: "Host distinction creates separate account entities.",
    hint: "Yes, they are two separate accounts with independent credentials and privileges.",
    level: "basic"
  },
  {
    question: "What does `'user'@'192.168.%.%'` match?",
    shortAnswer: "Any client IP address starting with `192.168.` (e.g. `192.168.1.50`, `192.168.100.22`).",
    explanation: "Multi-octet wildcard matching in MySQL.",
    hint: "Matches any IP address in the 192.168.0.0/16 range.",
    level: "basic"
  },
  {
    question: "How do you test which account a connected client matched?",
    shortAnswer: "Execute `SELECT CURRENT_USER();`",
    explanation: "Displays the exact authenticated `'user'@'host'` rule.",
    hint: "SELECT CURRENT_USER();.",
    level: "basic"
  },
  {
    question: "What error is returned if a valid user connects from an IP address not covered by any host grant?",
    shortAnswer: "**Error 1045 (28000): Access denied for user 'username'@'unauthorized_ip' (using password: YES)**",
    explanation: "Stage 1 connection rejection due to host mismatch.",
    hint: "Error 1045 Access denied due to host perimeter mismatch.",
    level: "basic"
  },
  {
    question: "What is the security risk of using `'%'` for application service accounts?",
    shortAnswer: "If application credentials are leaked, an attacker can connect to the database from **any external IP address anywhere on the internet**; restricting the host to internal VPC subnets limits the blast radius.",
    explanation: "Network perimeter containment principle.",
    hint: "Allows attackers to connect from anywhere on the internet if credentials leak.",
    level: "basic"
  },
  {
    question: "How do you grant access to a user connecting from either `192.168.1.10` or `192.168.1.20` specifically without allowing the entire subnet?",
    shortAnswer: "Create **two separate accounts**: `'app'@'192.168.1.10'` and `'app'@'192.168.1.20'`.",
    explanation: "Granular multi-account provisioning for specific servers.",
    hint: "Create two separate user accounts with distinct exact IP addresses.",
    level: "basic",
    codeExample: "CREATE USER 'app'@'192.168.1.10' IDENTIFIED BY 'Pass#1';\nCREATE USER 'app'@'192.168.1.20' IDENTIFIED BY 'Pass#1';"
  },
  {
    question: "Can an underscore (`_`) be used as a single-character wildcard in MySQL host definitions?",
    shortAnswer: "Yes! `_` represents a **single wildcard character** (e.g. `'user'@'192.168.1.1_'` matches `192.168.1.10` through `192.168.1.19`).",
    explanation: "Standard SQL pattern matching rules apply to host strings.",
    hint: "Yes, underscore matches exactly one character.",
    level: "expert"
  },
  {
    question: "How do you view all host patterns configured across your MySQL instance?",
    shortAnswer: "`SELECT user, host, plugin, account_locked FROM mysql.user ORDER BY user, host;`",
    explanation: "Audits all account perimeters across the server.",
    hint: "Query user, host from mysql.user.",
    level: "basic",
    codeExample: "SELECT user, host, plugin FROM mysql.user ORDER BY user, host;"
  },
  {
    question: "What is the primary architectural takeaway of Topic 2 in Module 004_003?",
    shortAnswer: "MySQL's host matching rules provide a critical first line of network defense: understand the difference between `localhost` (Unix socket) and `127.0.0.1` (TCP/IP), leverage most-specific-first resolution for IP subnets, restrict production accounts away from `%` wildcards, and always enable `skip_name_resolve` to eliminate DNS latency.",
    explanation: "Essential knowledge for network perimeter isolation and high-performance connection handshakes.",
    hint: "Host matching controls network perimeter security and connection performance (skip_name_resolve).",
    level: "basic"
  }
];

export default questions;
