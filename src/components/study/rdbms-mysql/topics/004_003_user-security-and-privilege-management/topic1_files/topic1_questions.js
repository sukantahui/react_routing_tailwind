// topic1_files/topic1_questions.js

const questions = [
  {
    question: "What is the standard DDL command to create a new user account in MySQL 8.0?",
    shortAnswer: "`CREATE USER 'username'@'host' IDENTIFIED BY 'secure_password';`",
    explanation: "Standard DDL command for account provisioning.",
    hint: "CREATE USER 'user'@'host' IDENTIFIED BY 'password';",
    level: "basic",
    codeExample: "CREATE USER 'mamata'@'192.168.1.%' IDENTIFIED BY 'Kolkata#2026!Secure';"
  },
  {
    question: "How do you change an existing user's password using `ALTER USER`?",
    shortAnswer: "`ALTER USER 'username'@'host' IDENTIFIED BY 'new_password';`",
    explanation: "Standard password update statement in MySQL 5.7+ and 8.0.",
    hint: "ALTER USER 'user'@'host' IDENTIFIED BY 'new_pass';",
    level: "basic",
    codeExample: "ALTER USER 'susmita'@'localhost' IDENTIFIED BY 'NewSecurePass#2026';"
  },
  {
    question: "How do you temporarily disable a user account without dropping it or losing its granted privileges?",
    shortAnswer: "`ALTER USER 'username'@'host' ACCOUNT LOCK;` (Re-enable with `ACCOUNT UNLOCK`).",
    explanation: "Prevents authentication attempts while preserving all schema privileges.",
    hint: "ACCOUNT LOCK disables login; ACCOUNT UNLOCK re-enables it.",
    level: "basic",
    codeExample: "ALTER USER 'debangshu'@'%' ACCOUNT LOCK;"
  },
  {
    question: "What happens when a user attempts to log in to an account that is set to `ACCOUNT LOCK`?",
    shortAnswer: "The connection fails with **Error 3118 (HY000): Access denied for user '...' Account is locked.**",
    explanation: "Immediate rejection at Stage 1 connection verification.",
    hint: "Throws Error 3118: Access denied: Account is locked.",
    level: "basic"
  },
  {
    question: "How do you force a user to change their password upon their very next login?",
    shortAnswer: "`ALTER USER 'username'@'host' PASSWORD EXPIRE;`",
    explanation: "Forces password rotation before any queries can be executed.",
    hint: "PASSWORD EXPIRE forces the user to reset their password upon next connection.",
    level: "basic",
    codeExample: "ALTER USER 'abhronila'@'192.168.1.%' PASSWORD EXPIRE;"
  },
  {
    question: "How do you set a password to automatically expire every 90 days for a specific account?",
    shortAnswer: "`ALTER USER 'user'@'host' PASSWORD EXPIRE INTERVAL 90 DAY;`",
    explanation: "Applies per-account periodic expiration policy.",
    hint: "PASSWORD EXPIRE INTERVAL 90 DAY.",
    level: "basic"
  },
  {
    question: "How do you exempt a service account from password expiration policies?",
    shortAnswer: "`ALTER USER 'app_service'@'10.0.0.%' PASSWORD EXPIRE NEVER;`",
    explanation: "Crucial for automated application backend accounts to prevent unexpected outages.",
    hint: "PASSWORD EXPIRE NEVER.",
    level: "basic"
  },
  {
    question: "How do you rename a user account and transfer all of its granted privileges automatically?",
    shortAnswer: "`RENAME USER 'old_username'@'host' TO 'new_username'@'host';`",
    explanation: "Atomically updates account name and all privilege tables.",
    hint: "RENAME USER 'old'@'host' TO 'new'@'host';",
    level: "basic",
    codeExample: "RENAME USER 'temp_dev'@'localhost' TO 'mamata_dev'@'localhost';"
  },
  {
    question: "How do you delete a user account and automatically revoke all of its privileges across all system tables?",
    shortAnswer: "`DROP USER [IF EXISTS] 'username'@'host';`",
    explanation: "Completely purges account records and ACLs.",
    hint: "DROP USER 'user'@'host';",
    level: "basic",
    codeExample: "DROP USER IF EXISTS 'old_intern'@'192.168.1.%';"
  },
  {
    question: "How do you limit an account to a maximum of 10 concurrent active database connections?",
    shortAnswer: "`ALTER USER 'user'@'host' WITH MAX_USER_CONNECTIONS 10;`",
    explanation: "Prevents a single service account from exhausting server connection pools.",
    hint: "WITH MAX_USER_CONNECTIONS N.",
    level: "expert",
    codeExample: "ALTER USER 'web_api'@'10.0.0.%' WITH MAX_USER_CONNECTIONS 25;"
  },
  {
    question: "What resource limits can be configured on a user account with the `WITH` clause?",
    shortAnswer: "1) `MAX_QUERIES_PER_HOUR N`\n2) `MAX_UPDATES_PER_HOUR N`\n3) `MAX_CONNECTIONS_PER_HOUR N`\n4) `MAX_USER_CONNECTIONS N`",
    explanation: "Throttling controls to protect database stability from runaway scripts.",
    hint: "MAX_QUERIES_PER_HOUR, MAX_UPDATES_PER_HOUR, MAX_CONNECTIONS_PER_HOUR, MAX_USER_CONNECTIONS.",
    level: "expert"
  },
  {
    question: "How do you configure automatic account lockout after 3 consecutive failed password attempts?",
    shortAnswer: "`ALTER USER 'user'@'host' FAILED_LOGIN_ATTEMPTS 3 PASSWORD_LOCK_TIME 1;` (Locks for 1 day).",
    explanation: "Built-in brute-force protection in MySQL 8.0.19+.",
    hint: "FAILED_LOGIN_ATTEMPTS N PASSWORD_LOCK_TIME D (in days).",
    level: "expert",
    codeExample: "ALTER USER 'portal_user'@'%' \nFAILED_LOGIN_ATTEMPTS 3 \nPASSWORD_LOCK_TIME 2;"
  },
  {
    question: "How do you enforce that a user must connect exclusively over encrypted SSL/TLS connections?",
    shortAnswer: "`ALTER USER 'user'@'host' REQUIRE SSL;` (or `REQUIRE X509` for client certificate validation).",
    explanation: "Enforces network-level encryption in transit.",
    hint: "REQUIRE SSL or REQUIRE X509.",
    level: "basic",
    codeExample: "ALTER USER 'finance_app'@'192.168.1.%' REQUIRE SSL;"
  },
  {
    question: "How can a user change their own password without knowing their full `'user'@'host'` definition?",
    shortAnswer: "`ALTER USER USER() IDENTIFIED BY 'new_password';`",
    explanation: "The USER() function dynamically evaluates to the current authenticated account.",
    hint: "ALTER USER USER() IDENTIFIED BY 'new_pass';",
    level: "basic"
  },
  {
    question: "How do you prevent a user from reusing any of their last 5 previous passwords?",
    shortAnswer: "`ALTER USER 'user'@'host' PASSWORD HISTORY 5;`",
    explanation: "Enforces password history rotation compliance.",
    hint: "PASSWORD HISTORY N.",
    level: "expert"
  },
  {
    question: "How do you prevent password reuse within a 365-day time window?",
    shortAnswer: "`ALTER USER 'user'@'host' PASSWORD REUSE INTERVAL 365 DAY;`",
    explanation: "Enforces time-based password reuse restrictions.",
    hint: "PASSWORD REUSE INTERVAL N DAY.",
    level: "expert"
  },
  {
    question: "How do you attach custom JSON metadata (such as department or contact info) to a MySQL user account?",
    shortAnswer: "`ALTER USER 'user'@'host' ATTRIBUTE '{\"department\": \"Accounts\", \"lead\": \"Mamata\"}';`",
    explanation: "Stores arbitrary JSON metadata in `information_schema.user_attributes` (MySQL 8.0.21+).",
    hint: "ATTRIBUTE '{\"key\": \"val\"}'.",
    level: "expert",
    codeExample: "ALTER USER 'mamata'@'localhost' \nATTRIBUTE '{\"role\": \"Lead DBA\", \"location\": \"Barrackpore\"}';"
  },
  {
    question: "Where can you inspect user JSON metadata attributes?",
    shortAnswer: "Query the **`information_schema.user_attributes`** system table.",
    explanation: "Exposes user JSON metadata tags for inventory auditing.",
    hint: "Query information_schema.user_attributes.",
    level: "basic"
  },
  {
    question: "What is the danger of executing `DELETE FROM mysql.user WHERE user = 'test'` instead of `DROP USER`?",
    shortAnswer: "`DELETE FROM mysql.user` removes the record from `mysql.user` but **leaves orphaned privilege records behind in `mysql.db`, `mysql.tables_priv`, and `mysql.columns_priv`**, creating security vulnerabilities if an account with that same name is recreated later.",
    explanation: "Always use DROP USER to cleanly purge all privilege tables atomically.",
    hint: "Leaves orphaned privilege records in mysql.db and tables_priv; always use DROP USER.",
    level: "expert"
  },
  {
    question: "What is the primary architectural takeaway of Topic 1 in Module 004_003?",
    shortAnswer: "MySQL's User Account Management commands (`CREATE USER`, `ALTER USER`, `RENAME USER`, `DROP USER`) provide full lifecycle control over credentials, SSL requirements, resource quotas (`MAX_USER_CONNECTIONS`), password rotation policies, and brute-force lockout rules atomically without ever needing raw table DML.",
    explanation: "Mastering account administration is crucial for robust database operations.",
    hint: "Account DDL commands provide complete, atomic control over credentials, locking, quotas, and SSL enforcement.",
    level: "basic"
  }
];

export default questions;
