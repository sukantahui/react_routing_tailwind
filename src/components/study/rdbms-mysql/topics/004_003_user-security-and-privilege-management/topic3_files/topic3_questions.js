// topic3_questions.js
// Topic 3: Authentication Plugins – caching_sha2_password vs mysql_native_password

const questions = [
  {
    question: "What is the default authentication plugin in MySQL 8.0, and how does it differ fundamentally from MySQL 5.7's default?",
    shortAnswer: "caching_sha2_password is the default in MySQL 8.0, utilizing 256-bit SHA-2 cryptographic hashing with an in-memory server cache, replacing the obsolete mysql_native_password double SHA-1 algorithm.",
    explanation: "Starting in MySQL 8.0.4, `caching_sha2_password` became the default authentication plugin. Unlike `mysql_native_password` which used double SHA-1 hashing vulnerable to modern GPU rainbow table cracking, `caching_sha2_password` implements salted SHA-256 password hashing. Furthermore, it incorporates an in-memory hash cache on the server to deliver sub-millisecond connection handshakes without cryptographic latency on repeated client logins.",
    hint: "Think about the transition from legacy SHA-1 hashing to modern SHA-256 with memory caching.",
    level: "basic",
    codeExample: `-- Verifying default authentication plugin:
SHOW VARIABLES LIKE 'default_authentication_plugin';
-- Returns: caching_sha2_password`
  },
  {
    question: "Why was `mysql_native_password` deprecated in MySQL 8.0 and removed/disabled by default in MySQL 8.4 LTS?",
    shortAnswer: "Due to fundamental cryptographic vulnerabilities in SHA-1 collision resistance and susceptibility to high-speed offline dictionary attacks on captured authentication tokens.",
    explanation: "`mysql_native_password` relies on `SHA1(password ^ SHA1(SHA1(password) + scramble))`. SHA-1 has been formally deprecated by NIST due to mathematical collision weaknesses. Additionally, the double SHA-1 structure allows adversaries capturing network auth handshakes to compute hundreds of billions of password guesses per second on inexpensive GPU rigs. Modern security standards mandate SHA-256 or Argon2/bcrypt.",
    hint: "Consider the cryptographic decay of the SHA-1 algorithm and GPU-based hash cracking.",
    level: "basic",
    codeExample: `-- Legacy account creation (deprecated):
CREATE USER 'legacy_app'@'10.0.0.%' 
  IDENTIFIED WITH mysql_native_password BY 'LegacyPassword!2026';`
  },
  {
    question: "How does the 'Fast-Path' handshake in `caching_sha2_password` operate for returning client connections?",
    shortAnswer: "The server checks its in-memory authentication cache for the user's SHA-256 digest; if present, it validates the client's scrambled token instantly in RAM without RSA encryption overhead.",
    explanation: "When an application (such as a Node.js microservice in Kolkata) frequently establishes database connections from a connection pool, the MySQL server retains the client's validated SHA-256 credentials in an internal RAM cache. During subsequent handshakes, the server skips RSA key exchange and heavy disk lookups, validating the challenge nonce in under 0.3 milliseconds directly in memory.",
    hint: "Think of how a web session token caches authentication in RAM to skip re-checking the database on every HTTP request.",
    level: "intermediate",
    codeExample: `// Fast-Path handshake telemetry:
// 1. Client connects with username + scramble token
// 2. Server checks in-memory SHA2 cache → MATCH FOUND
// 3. Server returns OK packet immediately (< 0.5 ms)`
  },
  {
    question: "Under what conditions does `caching_sha2_password` fall back to the 'Full Handshake', and what mechanisms are used?",
    shortAnswer: "When a user connects for the first time, after a server restart, or after password changes; it transmits the password over TLS/SSL or encrypts it using the server's RSA public key.",
    explanation: "If a client connection results in a cache miss, the server requires full authentication. If the connection is already secured via TLS/SSL, the client sends the password encrypted inside the TLS tunnel. If the connection is non-TLS, the server provides its RSA Public Key, and the client sends an RSA-encrypted password packet. Upon successful verification, the server populates its in-memory cache for future fast-path connections.",
    hint: "Recall what happens on a cache miss: either TLS encryption or RSA public key asymmetric encryption is used.",
    level: "intermediate",
    codeExample: `-- Flushing the server authentication cache forces full handshakes:
FLUSH PRIVILEGES;`
  },
  {
    question: "What causes the notorious error `Authentication plugin 'caching_sha2_password' cannot be loaded` in legacy applications?",
    shortAnswer: "Old client connector libraries (like PHP 5.x/7.0 mysqlnd or legacy Node.js 'mysql' driver) that do not possess the code to execute SHA-256 or RSA key exchange.",
    explanation: "Older database drivers compiled before MySQL 8.0 only understand the 20-byte scramble protocol of `mysql_native_password`. When a MySQL 8.0 server requests `caching_sha2_password`, the legacy client fails to find a local implementation of the SHA-256 handshake and terminates the connection with Error 2054.",
    hint: "Think of an old 2014 application trying to connect to a modern MySQL 8.0 server without driver updates.",
    level: "basic",
    codeExample: `// Solution in Node.js:
// Replace legacy driver:
// const mysql = require('mysql'); // ERROR 2054
// With modern driver:
const mysql = require('mysql2'); // FULL CACHING_SHA2_PASSWORD SUPPORT`
  },
  {
    question: "How do you resolve the error `RSA public key not available from server` (Error 1251) in JDBC Connector/J?",
    shortAnswer: "Set `allowPublicKeyRetrieval=true` or `useSSL=true` in the JDBC connection string, or provide `serverRsaPublicKeyFile`.",
    explanation: "When connecting over an unencrypted non-TLS channel, `caching_sha2_password` must encrypt the password with the server's RSA public key. If the client does not have the public key saved locally, JDBC refuses to request it from the server by default to prevent Man-in-the-Middle (MitM) attacks. Setting `allowPublicKeyRetrieval=true` authorizes the driver to request the key dynamically from the server.",
    hint: "Look at connection string query parameters that enable key retrieval or TLS enforcement.",
    level: "intermediate",
    codeExample: `// Java JDBC Connection URL:
String url = "jdbc:mysql://localhost:3306/kolkata_retail?" +
             "useSSL=true&" +
             "allowPublicKeyRetrieval=true&" +
             "serverTimezone=Asia/Kolkata";`
  },
  {
    question: "What is the security risk associated with setting `allowPublicKeyRetrieval=true` across untrusted public networks?",
    shortAnswer: "A Man-in-the-Middle attacker can intercept the key request and substitute their own public key, decrypting the client's password during full handshake.",
    explanation: "If an attacker performs ARP spoofing or DNS poisoning on an untrusted network, they can intercept the plaintext request for the RSA public key and return an attacker-controlled public key. When the client encrypts the password with the fake key, the attacker intercepts and decrypts the password. In production, TLS/SSL should be enforced instead of `allowPublicKeyRetrieval=true`.",
    hint: "Think of a rogue proxy swapping public keys to perform an interception attack.",
    level: "expert",
    codeExample: `-- Production Defense: Enforce TLS so RSA key retrieval is never needed:
ALTER USER 'app_service'@'%' REQUIRE SSL;`
  },
  {
    question: "What SQL statement changes a user account's authentication plugin from `mysql_native_password` to `caching_sha2_password`?",
    shortAnswer: "ALTER USER 'username'@'host' IDENTIFIED WITH caching_sha2_password BY 'NewPassword';",
    explanation: "The `IDENTIFIED WITH` clause in `ALTER USER` allows administrators to modify both the authentication plugin and password hash simultaneously. MySQL re-computes the SHA-256 digest and updates the `plugin` and `authentication_string` columns in `mysql.user`.",
    hint: "Use ALTER USER with IDENTIFIED WITH plugin_name BY password.",
    level: "basic",
    codeExample: `ALTER USER 'susmita_billing'@'192.168.1.%'
  IDENTIFIED WITH caching_sha2_password BY 'Kolkata#Secure2026!';`
  },
  {
    question: "Which system table and columns show which authentication plugin each user account is using?",
    shortAnswer: "The mysql.user system table, querying the user, host, plugin, and authentication_string columns.",
    explanation: "The `mysql.user` table in the data dictionary contains account definitions. Querying `SELECT user, host, plugin FROM mysql.user;` lists all registered accounts and their designated authentication plugin (`caching_sha2_password`, `mysql_native_password`, `sha256_password`, or `auth_socket`).",
    hint: "Inspect mysql.user table selecting user, host, and plugin.",
    level: "basic",
    codeExample: `SELECT user, host, plugin, password_last_changed 
FROM mysql.user 
ORDER BY user;`
  },
  {
    question: "What was `sha256_password`, and why was `caching_sha2_password` created to replace it in MySQL 8.0?",
    shortAnswer: "sha256_password introduced SHA-256 hashing in MySQL 5.6 but suffered severe performance latency on new connections due to mandatory RSA exchanges; caching_sha2_password solved this via memory caching.",
    explanation: "`sha256_password` provided strong security but had no cache mechanism. Every single client reconnection required full RSA public/private key cryptographic math or SSL encryption, reducing connection throughput from thousands of queries per second to hundreds. `caching_sha2_password` retained the SHA-256 security while restoring sub-millisecond connection speed through RAM caching.",
    hint: "Compare security vs connection handshake latency on connection-heavy microservice fleets.",
    level: "intermediate",
    codeExample: `-- sha256_password is now deprecated in favor of caching_sha2_password:
-- Avoid: IDENTIFIED WITH sha256_password
-- Prefer: IDENTIFIED WITH caching_sha2_password`
  },
  {
    question: "How does the `auth_socket` (or `caching_sha2_password` with root) plugin work on Linux/Ubuntu installations?",
    shortAnswer: "auth_socket authenticates local Unix socket connections using the OS user UID/GID without requiring a database password.",
    explanation: "On Debian and Ubuntu MySQL installations, `root@localhost` is frequently configured with `auth_socket`. When a user runs `sudo mysql`, the server checks whether the connecting operating system user is `root` via the Unix domain socket peer credentials. If matched, access is granted with zero password prompt, preventing remote TCP root logins.",
    hint: "Think about authenticating via Linux file system permissions and Unix socket peer credentials.",
    level: "intermediate",
    codeExample: `SELECT user, host, plugin FROM mysql.user WHERE user='root';
-- If plugin is 'auth_socket', only 'sudo mysql' from OS root succeeds.`
  },
  {
    question: "How can a database administrator explicitly export the server's RSA Public Key for secure distribution to clients?",
    shortAnswer: "Inspect the datadir for public_key.pem, or execute `mysql -u user -p --get-server-public-key` from the CLI.",
    explanation: "When MySQL 8.0 initializes with `caching_sha2_password`, it automatically generates `private_key.pem` and `public_key.pem` in its data directory. Administrators can distribute `public_key.pem` to client application servers so drivers can encrypt passwords locally without needing network key retrieval.",
    hint: "Look for public_key.pem in the MySQL data directory or the CLI flag --get-server-public-key.",
    level: "intermediate",
    codeExample: `# Retrieve public key via MySQL CLI:
mysql -u debangshu_dev -p -h 127.0.0.1 --get-server-public-key`
  },
  {
    question: "What configuration file directive sets `caching_sha2_password` as the default authentication plugin globally?",
    shortAnswer: "default_authentication_plugin = caching_sha2_password in the [mysqld] section of my.cnf / my.ini.",
    explanation: "Placing `default_authentication_plugin=caching_sha2_password` under `[mysqld]` ensures that any `CREATE USER` statement executed without an explicit `IDENTIFIED WITH` clause automatically defaults to `caching_sha2_password`.",
    hint: "Set default_authentication_plugin under the [mysqld] block.",
    level: "basic",
    codeExample: `# /etc/my.cnf or /etc/mysql/mysql.conf.d/mysqld.cnf:
[mysqld]
default_authentication_plugin=caching_sha2_password`
  },
  {
    question: "How does Python's `mysql-connector-python` handle `caching_sha2_password` compared to `PyMySQL`?",
    shortAnswer: "mysql-connector-python supports caching_sha2_password natively; PyMySQL requires the third-party 'cryptography' library installed to handle RSA encryption.",
    explanation: "Oracle's official `mysql-connector-python` includes built-in SHA-256 and RSA routines. In contrast, pure-Python `PyMySQL` requires `pip install cryptography` to process the RSA public key encryption during full handshakes; otherwise, non-TLS connections throw a `RuntimeError` on authentication.",
    hint: "Recall the Python pip dependency required for RSA math in PyMySQL.",
    level: "intermediate",
    codeExample: `# For PyMySQL users connecting to MySQL 8.0:
pip install cryptography pymysql`
  },
  {
    question: "What happens to the `caching_sha2_password` cache when an administrator alters a user's password?",
    shortAnswer: "The server invalidates that user's cache entry, forcing the next connection to perform a full handshake to re-populate the cache.",
    explanation: "When `ALTER USER` or `SET PASSWORD` is executed, MySQL purges the stale SHA-256 digest from RAM. The next client connection must supply the new password through a full TLS or RSA handshake, after which the new digest is cached.",
    hint: "Consider how password changes invalidate cached in-memory credentials.",
    level: "intermediate",
    codeExample: `ALTER USER 'mamata_ops'@'localhost' IDENTIFIED BY 'NewPass#2026';
-- In-memory cache for 'mamata_ops'@'localhost' is instantly evicted.`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail portal, an old PHP 7.1 inventory app threw Error 2054 after upgrading to MySQL 8.0. How did they solve it safely?",
    shortAnswer: "They temporarily configured only that specific legacy service user with mysql_native_password while keeping all modern microservices on caching_sha2_password.",
    explanation: "Rather than degrading the entire database server by changing the global `default_authentication_plugin` back to `mysql_native_password`, Mamata configured the specific legacy account: `ALTER USER 'php71_app'@'192.168.1.15' IDENTIFIED WITH mysql_native_password BY '...';`. All other payment and customer services continued using `caching_sha2_password`.",
    hint: "Apply the principle of granular user configuration rather than global server downgrade.",
    level: "moderate",
    codeExample: `-- Granular per-user legacy fallback in Barrackpore:
ALTER USER 'barrackpore_php_app'@'192.168.1.15'
  IDENTIFIED WITH mysql_native_password BY 'Barrackpore#2026';`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, nightly connection bursts of 20,000 requests caused 100% CPU spikes with `sha256_password`. How did `caching_sha2_password` eliminate the spike?",
    shortAnswer: "By serving 99.8% of reconnections directly from the in-memory fast-path cache in RAM without performing expensive RSA asymmetric decryptions on the CPU.",
    explanation: "RSA cryptographic decryption is computationally expensive. Under `sha256_password`, 20,000 connection handshakes per minute caused thread contention and CPU saturation. Migrating to `caching_sha2_password` enabled the server to verify tokens via fast SHA-256 hashing in RAM, dropping authentication CPU time by over 92%.",
    hint: "Think about the difference in CPU load between in-memory symmetric cache verification and RSA private key decryption.",
    level: "expert",
    codeExample: `-- Migrating fintech service accounts in Kolkata:
ALTER USER 'kolkata_txn_service'@'10.10.%.%'
  IDENTIFIED WITH caching_sha2_password BY 'Fintech@Txn#2026';`
  },
  {
    question: "What is the purpose of the system variable `caching_sha2_password_digest_rounds` in MySQL 8.0?",
    shortAnswer: "It configures the number of hashing iterations used to generate the password digest from the plaintext password, increasing resistance to brute-force attacks.",
    explanation: "Key stretching increases the mathematical difficulty of computing candidate password hashes. The default value is 5,000 rounds. Increasing this value increases server CPU work during initial password derivation, providing higher protection against offline dictionary cracking.",
    hint: "Think of key stretching iterations similar to bcrypt work factor or PBKDF2 iterations.",
    level: "expert",
    codeExample: `SHOW VARIABLES LIKE 'caching_sha2_password_digest_rounds';
-- Default: 5000`
  },
  {
    question: "What is the structure of the `authentication_string` column in `mysql.user` for a `caching_sha2_password` user?",
    shortAnswer: "It begins with '$A$005$' indicating a SHA-256 digest format with 5,000 iterations, followed by a salt and base64-encoded hash.",
    explanation: "For `mysql_native_password`, the string was a 41-character string starting with an asterisk (`*` followed by 40 hex characters). For `caching_sha2_password`, the string follows a modular crypt format: `$A$005$<20 bytes salt><32 bytes hash>`, clearly demarcating the algorithm version and iteration count.",
    hint: "Look for the $A$005$ header indicating SHA-256 with 5000 rounds.",
    level: "expert",
    codeExample: `SELECT user, host, plugin, LEFT(authentication_string, 7) as hash_prefix
FROM mysql.user 
WHERE user = 'mamata_app';
-- Returns hash_prefix: $A$005$`
  },
  {
    question: "How does the MySQL CLI `--ssl-mode=DISABLED` affect `caching_sha2_password` connections when no RSA public key is available?",
    shortAnswer: "Authentication fails unless the user is already in the server's cache or the --get-server-public-key flag is passed.",
    explanation: "Disabling SSL prevents plaintext password transmission over TLS. If the client is not in the server's RAM cache and does not have the server's RSA public key cached locally, the connection cannot complete the full handshake and aborts.",
    hint: "Recall that without TLS, full handshake strictly requires RSA public key exchange.",
    level: "intermediate",
    codeExample: `# Passing public key request on non-SSL CLI connection:
mysql -u debangshu_dev -p -h 10.0.0.50 --ssl-mode=DISABLED --get-server-public-key`
  },
  {
    question: "Can a single MySQL 8.0 server support multiple authentication plugins simultaneously across different users?",
    shortAnswer: "Yes; authentication plugins are assigned per-user in mysql.user, allowing modern microservices and legacy apps to coexist.",
    explanation: "The global `default_authentication_plugin` only dictates the default when no plugin is explicitly specified in `CREATE USER`. Each account in `mysql.user` maintains its own independent `plugin` attribute. An enterprise can have 90 accounts on `caching_sha2_password`, 5 on `mysql_native_password`, and 2 on `auth_socket`.",
    hint: "Authentication plugins are granular per user account, not a monolithic server-wide restriction.",
    level: "basic",
    codeExample: `SELECT plugin, COUNT(*) as account_count 
FROM mysql.user 
GROUP BY plugin;`
  },
  {
    question: "What is `mysql_clear_password`, and why should it only be used over strictly encrypted TLS connections?",
    shortAnswer: "A client-side plugin that sends the plaintext password to the server, used for external PAM or LDAP authentication.",
    explanation: "When MySQL authenticates against external corporate directories like LDAP, Active Directory, or PAM, the server requires the cleartext password to bind to the directory service. `mysql_clear_password` transmits the password without hashing. If executed over unencrypted TCP, network sniffers can steal the password in plaintext.",
    hint: "Think about sending passwords to external LDAP/Active Directory systems over encrypted tunnels.",
    level: "expert",
    codeExample: `-- Enabling cleartext plugin on MySQL CLI:
mysql --enable-cleartext-plugin -u ldap_user -p -h ldap-mysql.kolkata.in --ssl-mode=REQUIRED`
  },
  {
    question: "What happens if an application using `caching_sha2_password` connects through a proxy (e.g. ProxySQL) that does not support it?",
    shortAnswer: "The handshake fails at the proxy layer with an unrecognized plugin error, unless the proxy is upgraded or backend users use mysql_native_password.",
    explanation: "Database proxies intercept and terminate the client-side authentication protocol before establishing backend connections. Older versions of ProxySQL (prior to 2.0.6) lacked `caching_sha2_password` support. Modern ProxySQL versions support frontend and backend `caching_sha2_password` handshakes.",
    hint: "Consider intermediate proxy layers like ProxySQL, HAProxy, or Envoy terminating MySQL connections.",
    level: "expert",
    codeExample: `-- ProxySQL global variable for authentication plugin:
-- admin variable: mysql-default_authentication_plugin='caching_sha2_password'`
  },
  {
    question: "How does `FLUSH PRIVILEGES` interact with the `caching_sha2_password` in-memory cache?",
    shortAnswer: "FLUSH PRIVILEGES reloads the privilege tables and completely empties the in-memory authentication cache, forcing all next logins to perform full handshakes.",
    explanation: "When `FLUSH PRIVILEGES` is invoked, MySQL flushes its internal data structures. The in-memory cache holding SHA-256 tokens for `caching_sha2_password` is purged. The next connection from each client triggers a full handshake (over TLS or RSA) before being re-cached.",
    hint: "Think of FLUSH PRIVILEGES as a total reset of in-memory security and privilege caches.",
    level: "intermediate",
    codeExample: `FLUSH PRIVILEGES;
-- All active connection fast-path caches are cleared.`
  },
  {
    question: "Why does the MySQL 8.0 Docker container sometimes fail initial connections from Node.js applications with Error 1251?",
    shortAnswer: "Because the container starts with caching_sha2_password and non-TLS by default, and Node's driver lacks the server's RSA public key without allowPublicKeyRetrieval.",
    explanation: "When starting a fresh MySQL 8.0 container without mounting custom SSL certificates, connections occur over plaintext TCP. Node's `mysql2` or Java JDBC drivers encounter a cache miss on the newly initialized container and cannot perform RSA encryption unless `allowPublicKeyRetrieval: true` is configured in the pool configuration.",
    hint: "Connectors to local Docker containers need either TLS certificates or permission to retrieve the RSA public key.",
    level: "intermediate",
    codeExample: `// Node.js mysql2 pool configuration for local containers:
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'ContainerRootPassword#2026',
  database: 'test_db',
  ssl: false,
  allowPublicKeyRetrieval: true
});`
  },
  {
    question: "What is the recommended migration roadmap for an organization preparing for MySQL 8.4 LTS and MySQL 9.0 regarding authentication?",
    shortAnswer: "Audit all mysql.user entries for mysql_native_password, upgrade client driver libraries, convert all accounts to caching_sha2_password, and enforce TLS.",
    explanation: "MySQL 8.4 LTS disables `mysql_native_password` by default, and MySQL 9.0 removes the plugin entirely. Organizations must: 1. Audit user plugins via `SELECT user, host, plugin FROM mysql.user;`; 2. Upgrade all backend microservice libraries (JDBC, Node mysql2, PyMySQL); 3. Execute `ALTER USER ... IDENTIFIED WITH caching_sha2_password`; 4. Verify end-to-end TLS encryption.",
    hint: "Follow the 4-step migration: Audit, Driver Upgrade, User Alteration, and TLS Enforcement.",
    level: "expert",
    codeExample: `-- Audit query to identify legacy accounts requiring migration:
SELECT user, host, plugin 
FROM mysql.user 
WHERE plugin = 'mysql_native_password';`
  },
  {
    question: "How does `CREATE USER` behavior change if `default_authentication_plugin` is set to `caching_sha2_password` vs omitting the `IDENTIFIED WITH` clause?",
    shortAnswer: "Omitting the IDENTIFIED WITH clause causes MySQL to automatically assign the server's default_authentication_plugin value.",
    explanation: "Writing `CREATE USER 'user'@'host' IDENTIFIED BY 'pass';` without specifying `WITH plugin_name` instructs the server to look up the `default_authentication_plugin` system variable. In MySQL 8.0, this assigns `caching_sha2_password` by default.",
    hint: "IDENTIFIED BY without WITH plugin inherits the global default.",
    level: "basic",
    codeExample: `-- These two statements are identical in MySQL 8.0 default setup:
CREATE USER 'mamata'@'localhost' IDENTIFIED BY 'Pass#2026';
CREATE USER 'mamata'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'Pass#2026';`
  },
  {
    question: "What role do the system variables `caching_sha2_password_private_key_path` and `caching_sha2_password_public_key_path` play?",
    shortAnswer: "They specify the file paths to the RSA private and public key files used by the server to perform asymmetric password encryption during non-TLS full handshakes.",
    explanation: "By default, these point to `private_key.pem` and `public_key.pem` inside the data directory. The server uses the private key to decrypt passwords transmitted by clients that encrypted them with the server's public key.",
    hint: "Look at the variables that specify where the server's RSA key pair is stored on disk.",
    level: "expert",
    codeExample: `SHOW VARIABLES LIKE 'caching_sha2_password%key_path';
-- caching_sha2_password_private_key_path = private_key.pem
-- caching_sha2_password_public_key_path = public_key.pem`
  },
  {
    question: "How does `caching_sha2_password` protect against Replay Attacks over the network?",
    shortAnswer: "The server generates a unique, single-use 20-byte random scramble nonce for every connection; an intercepted token cannot be replayed in a subsequent handshake.",
    explanation: "Even if an attacker captures the hashed authentication token from a network packet capture, the token is calculated by hashing the password digest combined with the server's single-use scramble nonce. In the next connection, the server issues a completely new random nonce, making previous tokens completely invalid.",
    hint: "Consider how single-use random nonces prevent attackers from reusing captured authentication packets.",
    level: "expert",
    codeExample: `// Mathematical Token Calculation:
// Client Token = XOR(SHA256(Password), SHA256(SHA256(SHA256(Password)), Random_Nonce_20_Bytes))
// A captured token is only valid for that specific 20-byte nonce session!`
  },
  {
    question: "What is the primary operational takeaway when choosing between `caching_sha2_password` and `mysql_native_password` for modern database deployments?",
    shortAnswer: "Always use caching_sha2_password for superior 256-bit cryptography and sub-millisecond fast-path performance, only falling back to mysql_native_password for un-upgradable legacy third-party tools.",
    explanation: "`caching_sha2_password` represents the modern standard for MySQL database security, offering NIST-compliant SHA-256 hashing, high-performance in-memory authentication caching, and robust replay attack protection. `mysql_native_password` is cryptographically obsolete, deprecated, and scheduled for total removal in upcoming MySQL releases.",
    hint: "Summarize the balance of high cryptographic security, high performance, and future-proof compatibility.",
    level: "basic",
    codeExample: `-- Production Golden Standard:
CREATE USER 'prod_api'@'10.%.%.%' 
  IDENTIFIED WITH caching_sha2_password BY 'StrongVaultGeneratedPass#2026'
  REQUIRE SSL;`
  }
];

export default questions;
