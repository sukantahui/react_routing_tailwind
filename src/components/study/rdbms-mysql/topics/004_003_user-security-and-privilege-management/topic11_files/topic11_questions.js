// topic11_files/topic11_questions.js
// Topic 11: Securing Data in Transit: Enabling and Enforcing SSL/TLS Encrypted Connections

const questions = [
  {
    question: "Why is securing data in transit critical for MySQL database deployments?",
    shortAnswer: "To prevent plaintext eavesdropping, packet sniffing, credential harvesting, and Man-in-the-Middle (MITM) data tampering across internal corporate and cloud VPC networks.",
    explanation: "Without TLS encryption, database queries containing passwords, credit card details, and confidential customer data are transmitted in cleartext TCP packets that can be intercepted by network sniffers or compromised internal hosts.",
    hint: "Think about protecting data against network sniffing and MITM tampering.",
    level: "basic",
    codeExample: `-- Enforcing SSL on an account:
ALTER USER 'payment_svc'@'10.0.%.%' REQUIRE SSL;`
  },
  {
    question: "What global system variable mandates that ALL client connections to the MySQL server must use SSL/TLS?",
    shortAnswer: "`require_secure_transport = ON`.",
    explanation: "When `require_secure_transport` is enabled in `my.cnf` or via `SET PERSIST`, MySQL server unconditionally rejects any unencrypted TCP connection attempts, returning `ERROR 3159 (HY000): Connections using insecure transport are prohibited while --require_secure_transport=ON`.",
    hint: "Look at the require_secure_transport system variable.",
    level: "basic",
    codeExample: `SET PERSIST require_secure_transport = ON;`
  },
  {
    question: "What are the 3 core server certificate configuration variables in `my.cnf` for enabling TLS in MySQL 8.0?",
    shortAnswer: "`ssl_ca` (Certificate Authority certificate), `ssl_cert` (server public certificate), and `ssl_key` (server private key).",
    explanation: "These variables tell the MySQL server engine where to locate its cryptographic credentials on disk to establish TLS handshakes.",
    hint: "Point to the CA certificate, server certificate, and private key files.",
    level: "basic",
    codeExample: `[mysqld]
ssl_ca = /etc/mysql/certs/ca.pem
ssl_cert = /etc/mysql/certs/server-cert.pem
ssl_key = /etc/mysql/certs/server-key.pem`
  },
  {
    question: "What does the `ALTER USER ... REQUIRE SSL` clause enforce?",
    shortAnswer: "It mandates that the specified user account can only connect if the session is encrypted over an SSL/TLS tunnel.",
    explanation: "If the user attempts to connect without TLS flags or with `useSSL=false`, the server rejects the connection with an access denied error.",
    hint: "Mandates any valid SSL/TLS encrypted connection for that account.",
    level: "basic",
    codeExample: `ALTER USER 'susmita_ops'@'192.168.1.%' REQUIRE SSL;`
  },
  {
    question: "What does the `REQUIRE X509` clause enforce, and how does it implement Mutual TLS (mTLS)?",
    shortAnswer: "It mandates that the client must present a valid X.509 client certificate issued and signed by the server's designated Certificate Authority (CA).",
    explanation: "Mutual TLS ensures bidirectional cryptographic authentication: the client verifies the server's certificate, and the server verifies the client's certificate before allowing the connection.",
    hint: "Client must provide a valid CA-signed certificate (Mutual TLS).",
    level: "intermediate",
    codeExample: `ALTER USER 'core_banking_service'@'10.10.%.%' REQUIRE X509;`
  },
  {
    question: "How do you enforce exact Subject and Issuer Distinguished Name (DN) matching on client certificates in MySQL?",
    shortAnswer: "Using `REQUIRE ISSUER 'issuer_dn' AND SUBJECT 'subject_dn'` in `CREATE USER` or `ALTER USER`.",
    explanation: "This ensures that not only must the client present a valid certificate signed by the CA, but the certificate must specifically belong to that exact service identity (e.g. `/CN=payment-processor`).",
    hint: "Specify REQUIRE ISSUER and REQUIRE SUBJECT clauses.",
    level: "expert",
    codeExample: `ALTER USER 'kolkata_payment_pod'@'10.244.%.%'
  REQUIRE ISSUER '/C=IN/ST=West Bengal/L=Kolkata/O=FintechCorp/CN=FintechRootCA'
  AND SUBJECT '/C=IN/ST=West Bengal/L=Kolkata/O=FintechCorp/CN=payment-pod-01';`
  },
  {
    question: "How do you perform a Zero-Downtime TLS Certificate Renewal in MySQL 8.0 without restarting the server daemon?",
    shortAnswer: "Execute the `ALTER INSTANCE RELOAD TLS;` SQL command after placing the renewed certificate files on disk.",
    explanation: "In MySQL 5.7, certificate renewal required a full server reboot. MySQL 8.0 introduced `ALTER INSTANCE RELOAD TLS` to dynamically re-read certificate files from disk and update the active SSL context in memory with zero connection downtime.",
    hint: "Use ALTER INSTANCE RELOAD TLS.",
    level: "intermediate",
    codeExample: `-- Execute after renewing certificates on disk:
ALTER INSTANCE RELOAD TLS;
-- Verify active expiry date:
SHOW STATUS LIKE 'Ssl_server_not_after';`
  },
  {
    question: "Which TLS protocol versions should be permitted in production MySQL 8.0 environments?",
    shortAnswer: "TLSv1.2 and TLSv1.3 only; legacy TLSv1.0, TLSv1.1, and all SSL versions must be disabled.",
    explanation: "TLS 1.0 and 1.1 have known cryptographic weaknesses (BEAST, POODLE) and violate PCI-DSS 4.0 requirements. Modern deployments restrict `tls_version` strictly to `'TLSv1.2,TLSv1.3'`.",
    hint: "Restrict tls_version to TLSv1.2 and TLSv1.3.",
    level: "basic",
    codeExample: `SET PERSIST tls_version = 'TLSv1.2,TLSv1.3';`
  },
  {
    question: "How can a user or application verify whether their current connection session is encrypted?",
    shortAnswer: "Execute `SHOW STATUS LIKE 'Ssl_cipher';` or check the `\s` (status) command in the MySQL CLI client.",
    explanation: "If the connection is encrypted, `Ssl_cipher` returns the active cipher suite name (e.g. `TLS_AES_256_GCM_SHA384`). If unencrypted, it returns an empty string.",
    hint: "Query the Ssl_cipher session status variable.",
    level: "basic",
    codeExample: `SHOW STATUS LIKE 'Ssl_cipher';
-- Returns: Ssl_cipher = 'TLS_AES_256_GCM_SHA384'`
  },
  {
    question: "What are the 5 standard `sslMode` options available in modern MySQL client connection strings?",
    shortAnswer: "`DISABLED` (unencrypted), `PREFERRED` (try SSL, fallback to plain), `REQUIRED` (mandate SSL, skip CA check), `VERIFY_CA` (mandate SSL + verify CA signature), and `VERIFY_IDENTITY` (mandate SSL + verify CA + verify hostname matching).",
    explanation: "`VERIFY_IDENTITY` provides the highest security posture, preventing Man-in-the-Middle DNS spoofing attacks by ensuring the server certificate's Common Name (CN) or SAN matches the connected hostname.",
    hint: "Recall: DISABLED, PREFERRED, REQUIRED, VERIFY_CA, and VERIFY_IDENTITY.",
    level: "intermediate",
    codeExample: `// JDBC Connection String with maximum TLS verification:
// jdbc:mysql://db.kolkata.internal:3306/bank?sslMode=VERIFY_IDENTITY&trustCertificateKeyStoreUrl=file:/certs/trust.jks`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, an automated network scanner was run on internal Wi-Fi. How did `REQUIRE SSL` protect customer credit card transactions?",
    shortAnswer: "Because all POS terminal connections had `REQUIRE SSL` enforced, network sniffers capturing TCP traffic on port 3306 saw only encrypted TLS ciphertext bytes, with zero customer card data exposed.",
    explanation: "Without TLS, database DML packets display raw SQL strings in Wireshark. With TLS 1.3 encryption, packet inspection yields zero intelligible application data.",
    hint: "TLS encryption transforms network packets into indecipherable ciphertext.",
    level: "moderate",
    codeExample: `-- Hardened Barrackpore POS account:
ALTER USER 'pos_terminal'@'192.168.1.%' REQUIRE SSL;`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, rotating the server TLS certificate for a ₹200 Crore payment cluster caused 0 dropped microservice connections. How was this done?",
    shortAnswer: "Debangshu updated the certificate files on disk and executed `ALTER INSTANCE RELOAD TLS;` in MySQL 8.0.",
    explanation: "The command swapped the active TLS context in server memory without severing active client sessions or requiring a database restart.",
    hint: "Use ALTER INSTANCE RELOAD TLS for zero-downtime certificate rotation.",
    level: "expert",
    codeExample: `-- Dynamic TLS reload in Kolkata:
ALTER INSTANCE RELOAD TLS;
SHOW STATUS LIKE 'Ssl_server_not_after';`
  },
  {
    question: "What does the `Ssl_server_not_after` status variable show?",
    shortAnswer: "The expiration date and timestamp of the currently active server SSL certificate.",
    explanation: "Monitoring tools (e.g. Prometheus mysqld_exporter) query `Ssl_server_not_after` to alert DBAs 30 days before certificate expiration.",
    hint: "Shows the certificate expiration timestamp.",
    level: "intermediate",
    codeExample: `SHOW STATUS LIKE 'Ssl_server_not_after';
-- Output: Ssl_server_not_after = 'Oct 15 12:00:00 2026 GMT'`
  },
  {
    question: "What is the security risk of using `sslMode=REQUIRED` instead of `sslMode=VERIFY_CA` or `VERIFY_IDENTITY` in application clients?",
    shortAnswer: "`REQUIRED` encrypts traffic but skips verifying the server certificate signature, making the client vulnerable to active Man-in-the-Middle (MITM) proxy attacks.",
    explanation: "With `sslMode=REQUIRED`, an attacker in the middle can present a fake self-signed certificate, which the client accepts blindly, allowing the attacker to decrypt and inspect all traffic.",
    hint: "Without CA verification, an attacker can substitute their own certificate (MITM).",
    level: "expert",
    codeExample: `// Always specify CA verification in production:
const pool = mysql.createPool({
  host: 'db.kolkata.internal',
  ssl: {
    ca: fs.readFileSync('/etc/ssl/certs/ca.pem'),
    rejectUnauthorized: true // Enforces CA verification!
  }
});`
  },
  {
    question: "What tool does MySQL provide to automatically generate self-signed SSL/TLS certificates and RSA key pairs?",
    shortAnswer: "`mysql_ssl_rsa_setup`.",
    explanation: "This utility creates `ca.pem`, `server-cert.pem`, `server-key.pem`, `client-cert.pem`, and `client-key.pem` inside the data directory during initial setup.",
    hint: "The mysql_ssl_rsa_setup utility.",
    level: "basic",
    codeExample: `# Shell command to generate certificates:
mysql_ssl_rsa_setup --datadir=/var/lib/mysql`
  },
  {
    question: "How do you configure Node.js `mysql2` to establish a Mutual TLS (mTLS) connection with client certificates?",
    shortAnswer: "Pass `ca`, `cert`, and `key` file buffers in the connection `ssl` options object.",
    explanation: "The client presents `cert` and `key` to satisfy server accounts configured with `REQUIRE X509`.",
    hint: "Provide CA, client cert, and client key in the ssl configuration.",
    level: "intermediate",
    codeExample: `const connection = mysql.createConnection({
  host: 'db.internal',
  user: 'mtls_user',
  ssl: {
    ca: fs.readFileSync('./ca.pem'),
    cert: fs.readFileSync('./client-cert.pem'),
    key: fs.readFileSync('./client-key.pem'),
    rejectUnauthorized: true
  }
});`
  },
  {
    question: "What happens if a user configured with `REQUIRE SSL` attempts to connect over an unencrypted connection?",
    shortAnswer: "The connection handshake is terminated immediately with `ERROR 1045 (28000): Access denied for user (using password: YES)` or `ERROR 3159`.",
    explanation: "MySQL checks the user's `ssl_type` in `mysql.user` during the handshake stage and rejects any connection that does not satisfy the required cipher or SSL tier.",
    hint: "Handshake is rejected immediately during connection establishment.",
    level: "basic",
    codeExample: `-- Connection fails if SSL flags are omitted on the client command line.`
  },
  {
    question: "What is `tls_ciphersuites` in MySQL 8.0, and how does it differ from `ssl_cipher`?",
    shortAnswer: "`tls_ciphersuites` configures ciphers for TLSv1.3 (e.g. `TLS_AES_256_GCM_SHA384`), whereas `ssl_cipher` configures ciphers for TLSv1.2 and earlier.",
    explanation: "TLS 1.3 introduced a completely new cipher negotiation architecture separate from TLS 1.2.",
    hint: "tls_ciphersuites is for TLS 1.3; ssl_cipher is for TLS 1.2.",
    level: "expert",
    codeExample: `[mysqld]
tls_version = TLSv1.2,TLSv1.3
tls_ciphersuites = TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256
ssl_cipher = ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384`
  },
  {
    question: "How do you check how many active client sessions are currently connected over SSL on the server?",
    shortAnswer: "Inspect the `Ssl_accepts` and `Threads_connected` status variables.",
    explanation: "`SHOW STATUS LIKE 'Ssl_accepts';` counts total successful TLS handshakes since server startup.",
    hint: "Check Ssl_accepts status counter.",
    level: "intermediate",
    codeExample: `SHOW STATUS LIKE 'Ssl_accepts';`
  },
  {
    question: "Can `REQUIRE SSL` be reverted to allow unencrypted connections again on an account?",
    shortAnswer: "Yes, by executing `ALTER USER 'username'@'host' REQUIRE NONE;`.",
    explanation: "Setting `REQUIRE NONE` removes the TLS enforcement rule from `mysql.user` for that specific account.",
    hint: "Use ALTER USER ... REQUIRE NONE.",
    level: "basic",
    codeExample: `ALTER USER 'legacy_app'@'192.168.1.50' REQUIRE NONE;`
  },
  {
    question: "What is the impact of TLS encryption on MySQL database query performance?",
    shortAnswer: "Negligible on modern CPUs with AES-NI hardware acceleration: sub-1% CPU overhead and zero impact on query execution once the initial TLS handshake is established.",
    explanation: "Because connection pools maintain persistent long-lived TCP connections, the one-time TLS handshake latency is amortized across millions of queries, while symmetric AES-GCM encryption is handled directly by hardware CPU instructions.",
    hint: "AES-NI hardware acceleration ensures negligible runtime overhead with connection pools.",
    level: "intermediate",
    codeExample: `-- Modern CPUs encrypt data packets with dedicated hardware instructions.`
  },
  {
    question: "How do you audit all user accounts across the server that do NOT have `REQUIRE SSL` configured?",
    shortAnswer: "Query `SELECT User, Host, ssl_type FROM mysql.user WHERE ssl_type = '' AND Host != 'localhost';`.",
    explanation: "Any account with `ssl_type = ''` connecting from a remote network host represents a potential unencrypted connection risk.",
    hint: "Filter mysql.user for ssl_type = '' on non-localhost accounts.",
    level: "intermediate",
    codeExample: `SELECT User, Host, ssl_type 
FROM mysql.user 
WHERE ssl_type = '' AND Host != 'localhost' 
ORDER BY User;`
  },
  {
    question: "What is the `REQUIRE CIPHER` clause used for in `ALTER USER`?",
    shortAnswer: "To mandate that the client must negotiate a specific cryptographic cipher suite (e.g. `'DHE-RSA-AES256-SHA'`).",
    explanation: "Used in high-security environments where compliance mandates restrict algorithms to specific FIPS-validated cipher suites.",
    hint: "Restricts connection negotiation to specific named encryption ciphers.",
    level: "expert",
    codeExample: `ALTER USER 'fips_compliant_user'@'%' REQUIRE CIPHER 'ECDHE-RSA-AES256-GCM-SHA384';`
  },
  {
    question: "What error is returned if a client attempts an unencrypted connection when `require_secure_transport = ON`?",
    shortAnswer: "`ERROR 3159 (HY000): Connections using insecure transport are prohibited while --require_secure_transport=ON`.",
    explanation: "MySQL rejects the connection before user authentication begins.",
    hint: "Error 3159 indicates insecure transport prohibition.",
    level: "basic",
    codeExample: `-- mysql -h 10.0.1.10 -u app --ssl-mode=DISABLED
-- ERROR 3159 (HY000): Connections using insecure transport are prohibited`
  },
  {
    question: "How does TLS in transit complement InnoDB Transparent Data Encryption (TDE) at rest?",
    shortAnswer: "TLS encrypts packets moving over the network wire (in transit), while TDE encrypts raw data blocks written to physical disks (at rest), providing complete end-to-end data protection.",
    explanation: "TLS ensures packets cannot be sniffed on the network; TDE ensures stolen hard drives or database backup files cannot be read without the encryption key.",
    hint: "TLS protects the wire; TDE protects the disk.",
    level: "basic",
    codeExample: `-- TLS (In Transit) + TDE (At Rest) = Complete End-to-End Cryptographic Defense`
  },
  {
    question: "What does `SHOW STATUS LIKE 'Ssl_version';` display?",
    shortAnswer: "The TLS protocol version currently active for the querying session (e.g. `TLSv1.3` or `TLSv1.2`).",
    explanation: "Confirms that the session is negotiating modern TLS rather than deprecated protocols.",
    hint: "Displays the active TLS protocol version for the session.",
    level: "basic",
    codeExample: `SHOW STATUS LIKE 'Ssl_version';
-- Returns: Ssl_version = 'TLSv1.3'`
  },
  {
    question: "Can client applications connect over local Unix Domain Sockets when `require_secure_transport = ON`?",
    shortAnswer: "Yes, local Unix domain sockets (`/var/run/mysqld/mysqld.sock`) and Windows shared memory are considered secure transports and are allowed.",
    explanation: "Because Unix domain sockets do not traverse network interfaces, they are immune to network sniffing and are treated as inherently secure.",
    hint: "Unix domain sockets are exempt because they do not traverse the network.",
    level: "intermediate",
    codeExample: `mysql -S /var/run/mysqld/mysqld.sock -u root -p`
  },
  {
    question: "What is Certificate Revocation List (CRL) checking in MySQL, and what variable configures it?",
    shortAnswer: "It allows the server to reject client certificates that have been revoked before their expiration date; configured via `ssl_crl` and `ssl_crlpath`.",
    explanation: "If an employee laptop or service key is compromised, the certificate can be added to the CRL file so MySQL immediately refuses it.",
    hint: "Configured via ssl_crl to reject revoked certificates.",
    level: "expert",
    codeExample: `[mysqld]
ssl_crl = /etc/mysql/certs/revoked_certs.crl`
  },
  {
    question: "How do you verify if the MySQL server has valid SSL certificates loaded upon startup?",
    shortAnswer: "Check `SHOW STATUS LIKE 'Rsa_public_key';` and `SHOW STATUS LIKE 'Ssl_server_not_after';` or inspect the mysqld error log.",
    explanation: "If certificate files are missing or permissions are incorrect, MySQL logs a warning and disables TLS capabilities.",
    hint: "Inspect Ssl_server_not_after and the MySQL server error log.",
    level: "basic",
    codeExample: `SHOW STATUS LIKE 'Ssl_server_not_after';`
  },
  {
    question: "What is the primary operational takeaway of Topic 11 in Module 004_003?",
    shortAnswer: "Securing data in transit with SSL/TLS is mandatory for production database architectures: set `require_secure_transport = ON`, enforce `REQUIRE SSL` on all remote accounts, mandate TLSv1.2/1.3, and use `ALTER INSTANCE RELOAD TLS` for zero-downtime certificate renewal.",
    explanation: "Enforcing TLS eliminates eavesdropping and MITM vulnerabilities without impacting query execution performance. By automating certificate rotations and mandating CA verification across microservice connection strings, enterprises maintain ironclad in-transit data security.",
    hint: "Summarize require_secure_transport, REQUIRE SSL, TLS 1.2/1.3, and ALTER INSTANCE RELOAD TLS.",
    level: "basic",
    codeExample: `-- Production Golden Standard for Data in Transit:
SET PERSIST require_secure_transport = ON;
SET PERSIST tls_version = 'TLSv1.2,TLSv1.3';
ALTER USER 'prod_service'@'10.10.%.%' REQUIRE SSL;`
  }
];

export default questions;
