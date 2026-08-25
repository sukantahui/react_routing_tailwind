// topic4_files/topic4_questions.js
// Topic 4: Password Validation Policies, Expiration, Dual Passwords, and Account Locking

const questions = [
  {
    question: "How is password validation implemented in MySQL 8.0 compared to MySQL 5.7?",
    shortAnswer: "In MySQL 8.0, it is implemented as a loadable server component (`component_validate_password`) rather than the legacy plugin architecture (`validate_password.so/dll`).",
    explanation: "MySQL 8.0 modernizes extensibility via the Component Architecture. The `validate_password` component operates with lower server overhead, supports dynamic reconfiguration without server restarts, and is installed via `INSTALL COMPONENT 'file://component_validate_password';`.",
    hint: "Think about the transition from legacy server plugins to MySQL 8.0 loadable components.",
    level: "basic",
    codeExample: `-- Installing validate_password component:
INSTALL COMPONENT 'file://component_validate_password';

-- Verifying active component:
SELECT * FROM performance_schema.components WHERE component_name = 'component_validate_password';`
  },
  {
    question: "What are the three password validation policy levels in MySQL 8.0, and what does each enforce?",
    shortAnswer: "LOW (0: length only), MEDIUM (1: length + digits + mixed case + special characters + dictionary word check), and STRONG (2: all MEDIUM rules + external dictionary file verification).",
    explanation: "`validate_password.policy` controls the strictness of password rules. LOW enforces minimum character length (default 8). MEDIUM (the default) requires at least 1 digit, 1 lowercase letter, 1 uppercase letter, 1 special character, and rejection of dictionary substrings. STRONG adds checking against an external text dictionary file containing forbidden words.",
    hint: "Recall the three tiers: LOW, MEDIUM, and STRONG.",
    level: "basic",
    codeExample: `SET GLOBAL validate_password.policy = 'MEDIUM';
SET GLOBAL validate_password.length = 12;`
  },
  {
    question: "What is the purpose of `validate_password.check_user_name`?",
    shortAnswer: "It prevents users from setting passwords that match their username (either forwards or in reverse).",
    explanation: "When enabled (`ON` by default), attempting to set a password like `'mamata'` or `'atamam'` for user `'mamata'` throws an error. This prevents common password anti-patterns where employees use their login ID as their credential.",
    hint: "Think of blocking usernames and reversed usernames as passwords.",
    level: "basic",
    codeExample: `SET GLOBAL validate_password.check_user_name = ON;`
  },
  {
    question: "How do you configure an account's password to expire every 90 days in MySQL 8.0?",
    shortAnswer: "`ALTER USER 'username'@'host' PASSWORD EXPIRE INTERVAL 90 DAY;`",
    explanation: "The `PASSWORD EXPIRE INTERVAL N DAY` clause sets an automatic expiration countdown. After 90 days from the password's last update, MySQL places the account into an expired state on its next login.",
    hint: "Use ALTER USER with PASSWORD EXPIRE INTERVAL N DAY.",
    level: "basic",
    codeExample: `ALTER USER 'susmita_ops'@'10.0.%.%' PASSWORD EXPIRE INTERVAL 90 DAY;`
  },
  {
    question: "What state does a user account enter when its password expires, and what operations are permitted?",
    shortAnswer: "The account enters a 'sandbox' or restricted state where it can only execute `ALTER USER` to change its own password; all other SQL queries are rejected with Error 1820.",
    explanation: "When a user with an expired password logs into MySQL, the server accepts the credentials but blocks all database operations. The client receives `ERROR 1820 (HY000): You must reset your password using ALTER USER statement before executing this statement.` until a new valid password is set.",
    hint: "Think of an expired password sandbox where only password reset queries are allowed.",
    level: "intermediate",
    codeExample: `-- When user logs in with expired password:
-- Query: SELECT * FROM orders; -> ERROR 1820 (HY000)
-- Permitted resolution query:
ALTER USER USER() IDENTIFIED BY 'MyNewValidP@ss2026!';`
  },
  {
    question: "How do you configure an unattended application service account so its password NEVER expires?",
    shortAnswer: "`ALTER USER 'service_app'@'host' PASSWORD EXPIRE NEVER;`",
    explanation: "Unattended background daemons, microservice connection pools, and automated cron jobs should not suffer unexpected outages due to password expiration countdowns. Setting `PASSWORD EXPIRE NEVER` overrides the global `default_password_lifetime` for that specific account.",
    hint: "Use PASSWORD EXPIRE NEVER for service and batch accounts.",
    level: "basic",
    codeExample: `CREATE USER 'batch_ingestion'@'10.10.%.%'
  IDENTIFIED BY 'SecureBatchPass#2026'
  PASSWORD EXPIRE NEVER;`
  },
  {
    question: "What is the global system variable that controls default password lifetime server-wide?",
    shortAnswer: "`default_password_lifetime` (expressed in days; 0 means passwords never expire by default).",
    explanation: "Configured in `my.cnf` or via `SET PERSIST`, `default_password_lifetime = 90` ensures that any user account created without an explicit expiration clause will automatically expire after 90 days.",
    hint: "Look at default_password_lifetime under the [mysqld] section.",
    level: "intermediate",
    codeExample: `SET PERSIST default_password_lifetime = 90;`
  },
  {
    question: "How does MySQL 8.0 prevent users from reusing previous passwords using Password History and Reuse Interval?",
    shortAnswer: "`PASSWORD HISTORY N` forbids reusing any of the last N passwords; `PASSWORD REUSE INTERVAL N DAY` forbids reusing passwords used within the last N days.",
    explanation: "Password cycling attacks involve a user changing their password 5 times in a row just to switch back to their favorite old password. Combining `PASSWORD HISTORY 6` with `PASSWORD REUSE INTERVAL 365 DAY` ensures that passwords cannot be reused until both 6 subsequent rotations and 365 days have elapsed.",
    hint: "Differentiate between count-based history and time-based interval controls.",
    level: "intermediate",
    codeExample: `ALTER USER 'mamata_admin'@'%' 
  PASSWORD HISTORY 6 
  PASSWORD REUSE INTERVAL 365 DAY;`
  },
  {
    question: "What are 'Dual Passwords' in MySQL 8.0, and what major operational problem do they solve?",
    shortAnswer: "Dual Passwords allow an account to maintain both a Primary and a Secondary password simultaneously, enabling zero-downtime rolling credential rotation across microservice fleets.",
    explanation: "In distributed microservice architectures (e.g. 50 Kubernetes pods), changing a database password previously required coordinated simultaneous restarts. With Dual Passwords, a new password is set while retaining the old one as secondary. Pods can be restarted gradually with the new configuration without dropping connections.",
    hint: "Think of having two valid keys to the same door during a lock transition.",
    level: "intermediate",
    codeExample: `-- Step 1: Assign new Primary password while keeping old password as Secondary:
ALTER USER 'kolkata_api'@'10.10.%.%'
  IDENTIFIED BY 'NewSecurePass#2026'
  RETAIN CURRENT PASSWORD;`
  },
  {
    question: "What is the 3-step workflow for performing a Zero-Downtime Microservice Password Rotation using Dual Passwords?",
    shortAnswer: "1. `ALTER USER ... IDENTIFIED BY 'new' RETAIN CURRENT PASSWORD;` 2. Perform rolling deployment of application configs. 3. `ALTER USER ... DISCARD OLD PASSWORD;`.",
    explanation: "Step 1 creates the dual password state. Step 2 allows pods running old configs to connect using the secondary password while newly booted pods connect using the primary. Step 3 cleans up the secondary password once all instances have successfully transitioned.",
    hint: "Remember: Retain -> Rolling Deploy -> Discard.",
    level: "expert",
    codeExample: `-- Step 1: Retain old password
ALTER USER 'app_user'@'%' IDENTIFIED BY 'PassV2#2026' RETAIN CURRENT PASSWORD;
-- Step 2: Rolling update of application pods in Kubernetes
-- Step 3: Discard old secondary password
ALTER USER 'app_user'@'%' DISCARD OLD PASSWORD;`
  },
  {
    question: "What happens if a user account already has a Secondary password and an administrator executes `RETAIN CURRENT PASSWORD` again with another new password?",
    shortAnswer: "The existing Secondary password is discarded, the current Primary becomes the new Secondary, and the newly specified password becomes the new Primary.",
    explanation: "An account can only hold a maximum of two passwords at any given time (1 Primary and 1 Secondary). Chaining `RETAIN CURRENT PASSWORD` pushes the old primary into the secondary slot and evicts the previous secondary.",
    hint: "An account holds at most two passwords; the oldest secondary is evicted.",
    level: "expert",
    codeExample: `ALTER USER 'api_svc'@'%' IDENTIFIED BY 'PassV3#2026' RETAIN CURRENT PASSWORD;`
  },
  {
    question: "How do you manually lock and unlock a user account in MySQL 8.0?",
    shortAnswer: "`ALTER USER 'user'@'host' ACCOUNT LOCK;` to lock, and `ALTER USER 'user'@'host' ACCOUNT UNLOCK;` to unlock.",
    explanation: "`ACCOUNT LOCK` prevents any new client sessions from being established under that account name, returning `ERROR 3118 (HY000): Access denied for user 'user'@'host'. Account is locked.` Existing active sessions remain connected until terminated.",
    hint: "Use ALTER USER with ACCOUNT LOCK / ACCOUNT UNLOCK.",
    level: "basic",
    codeExample: `ALTER USER 'suspended_contractor'@'%' ACCOUNT LOCK;
ALTER USER 'suspended_contractor'@'%' ACCOUNT UNLOCK;`
  },
  {
    question: "How does MySQL 8.0 configure automatic account locking after consecutive failed login attempts?",
    shortAnswer: "Using `FAILED_LOGIN_ATTEMPTS N` and `PASSWORD_LOCK_TIME M [DAY | UNBOUNDED]` in `CREATE USER` or `ALTER USER`.",
    explanation: "To protect against automated brute-force password guessing, MySQL can track consecutive failed authentication attempts. Setting `FAILED_LOGIN_ATTEMPTS 3 PASSWORD_LOCK_TIME 1 DAY` automatically locks the account for 24 hours upon 3 consecutive bad passwords.",
    hint: "Specify FAILED_LOGIN_ATTEMPTS and PASSWORD_LOCK_TIME on the user account.",
    level: "intermediate",
    codeExample: `ALTER USER 'portal_login'@'%' 
  FAILED_LOGIN_ATTEMPTS 3 
  PASSWORD_LOCK_TIME 1 DAY;`
  },
  {
    question: "What does `PASSWORD_LOCK_TIME UNBOUNDED` signify?",
    shortAnswer: "The account remains permanently locked upon exceeding failed login attempts until a database administrator explicitly executes `ALTER USER ... ACCOUNT UNLOCK`.",
    explanation: "Unlike time-based automatic unlock (e.g. 1 DAY), `UNBOUNDED` mandates manual human administrative intervention. This is a common requirement in banking, PCI-DSS, and defense database environments.",
    hint: "Think of an infinite lockout requiring DBA intervention.",
    level: "intermediate",
    codeExample: `ALTER USER 'treasury_admin'@'%' 
  FAILED_LOGIN_ATTEMPTS 5 
  PASSWORD_LOCK_TIME UNBOUNDED;`
  },
  {
    question: "What clause enforces that a user must supply their existing password before they can change it to a new one?",
    shortAnswer: "`PASSWORD REQUIRE CURRENT` (or `PASSWORD REQUIRE CURRENT OPTIONAL / DEFAULT`).",
    explanation: "When `PASSWORD REQUIRE CURRENT` is set on an account, attempting to run `ALTER USER ... IDENTIFIED BY 'new'` without supplying `REPLACE 'current'` fails with an error. This prevents compromised sessions or SQL injections from silently hijacking accounts.",
    hint: "Look for PASSWORD REQUIRE CURRENT with the REPLACE clause.",
    level: "expert",
    codeExample: `-- Enabling the requirement:
ALTER USER 'mamata'@'localhost' PASSWORD REQUIRE CURRENT;

-- User updating their password must supply existing password:
ALTER USER USER() IDENTIFIED BY 'NewPass#2026' REPLACE 'OldPass#2025';`
  },
  {
    question: "In Mamata & Susmita's Barrackpore store, a rogue script attempted 500 password guesses against the inventory account. How did MySQL 8.0 account locking protect the system?",
    shortAnswer: "The account had `FAILED_LOGIN_ATTEMPTS 3 PASSWORD_LOCK_TIME 1 DAY` configured, locking the account on the 3rd attempt and rejecting the remaining 497 attempts instantly.",
    explanation: "Because the account was provisioned with automated lockout controls, the 3rd failed guess triggered a 24-hour account lock. The attack was neutralized with zero valid credentials compromised and zero database server CPU overload.",
    hint: "Automated failed login lockouts terminate brute-force attacks at the database gate.",
    level: "moderate",
    codeExample: `-- Barrackpore retail account hardening:
ALTER USER 'barrackpore_pos'@'192.168.1.%'
  FAILED_LOGIN_ATTEMPTS 3
  PASSWORD_LOCK_TIME 1 DAY;`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, rotating the core transaction database password across 120 Kubernetes pods caused 0 dropped transactions. How was this achieved?",
    shortAnswer: "By executing `RETAIN CURRENT PASSWORD` during the initial password change, performing a rolling pod restart, and executing `DISCARD OLD PASSWORD` after all pods were live.",
    explanation: "Without Dual Passwords, updating the password would have broken active connections on old pods before new pods booted. By retaining the old password as secondary, pods running configuration V1 and pods running configuration V2 both authenticated seamlessly throughout the 15-minute rolling rollout.",
    hint: "Dual passwords enable seamless rolling restarts across distributed microservice fleets.",
    level: "expert",
    codeExample: `-- Step 1: Assign V2 password and retain V1
ALTER USER 'kolkata_core_api'@'10.%.%.%' 
  IDENTIFIED BY 'FintechCore#2026!V2' 
  RETAIN CURRENT PASSWORD;

-- Step 2: Rolling update of 120 pods in Jadavpur data center

-- Step 3: Discard V1 password
ALTER USER 'kolkata_core_api'@'10.%.%.%' DISCARD OLD PASSWORD;`
  },
  {
    question: "Where are password history digests stored in the MySQL data dictionary?",
    shortAnswer: "In the `mysql.password_history` system table.",
    explanation: "MySQL maintains an internal audit ledger in `mysql.password_history` recording the `user`, `host`, `password_timestamp`, and the encrypted `password` hash for every password rotation. When a user attempts to set a new password, MySQL queries this table to enforce history and interval limits.",
    hint: "Inspect the mysql.password_history table.",
    level: "expert",
    codeExample: `SELECT user, host, password_timestamp, LEFT(password, 15) as hash_preview
FROM mysql.password_history
ORDER BY password_timestamp DESC;`
  },
  {
    question: "What error is thrown if a user attempts to set a password that violates the `validate_password` component rules?",
    shortAnswer: "`ERROR 1819 (HY000): Your password does not satisfy the current policy requirements.`",
    explanation: "When `validate_password` intercepts a password that fails length, character diversity, or dictionary checks, it aborts the DDL statement immediately and emits Error 1819 without modifying the data dictionary.",
    hint: "Error 1819 indicates password policy rejection.",
    level: "basic",
    codeExample: `-- Attempt:
CREATE USER 'test'@'localhost' IDENTIFIED BY '123';
-- Output:
-- ERROR 1819 (HY000): Your password does not satisfy the current policy requirements`
  },
  {
    question: "How can a database administrator test the strength of a candidate password before assigning it to a user?",
    shortAnswer: "Using the `VALIDATE_PASSWORD_STRENGTH()` SQL function provided by the `validate_password` component.",
    explanation: "The `VALIDATE_PASSWORD_STRENGTH('candidate_string')` function returns an integer score between 0 (very weak) and 100 (extremely strong). A score below 100 indicates that one or more policy checks failed.",
    hint: "Call the VALIDATE_PASSWORD_STRENGTH() function.",
    level: "intermediate",
    codeExample: `SELECT VALIDATE_PASSWORD_STRENGTH('WeakPass1') AS score_1,
       VALIDATE_PASSWORD_STRENGTH('Str0ng#K0lkata!2026') AS score_2;
-- Returns: score_1 = 50, score_2 = 100`
  },
  {
    question: "What is the difference between `PASSWORD EXPIRE` and `ACCOUNT LOCK`?",
    shortAnswer: "PASSWORD EXPIRE allows the user to log in but restricts them to resetting their password; ACCOUNT LOCK completely refuses the connection attempt.",
    explanation: "An account with an expired password can still establish a TCP session to execute `ALTER USER USER() IDENTIFIED BY ...`. An account with `ACCOUNT LOCK` is rejected immediately during connection establishment and cannot execute any SQL statements.",
    hint: "Differentiate between restricted login for password reset vs complete connection refusal.",
    level: "basic",
    codeExample: `-- Expired password: Login allowed -> sandbox mode
ALTER USER 'dev_user'@'localhost' PASSWORD EXPIRE;

-- Locked account: Login blocked immediately
ALTER USER 'dev_user'@'localhost' ACCOUNT LOCK;`
  },
  {
    question: "How does the system variable `password_require_current` behave globally?",
    shortAnswer: "When set to `ON`, it globally mandates that all users must supply their current password when changing passwords, unless they possess the `APPLICATION_PASSWORD_ADMIN` privilege.",
    explanation: "Setting `SET PERSIST password_require_current = ON;` enforces organizational-wide credential verification. Administrators with `APPLICATION_PASSWORD_ADMIN` can bypass this check to reset passwords for locked or forgotten accounts.",
    hint: "Controls global enforcement of current password verification on updates.",
    level: "expert",
    codeExample: `SET PERSIST password_require_current = ON;`
  },
  {
    question: "What happens when a database administrator resets a user's password using administrative privileges versus the user changing their own password?",
    shortAnswer: "An administrator with `APPLICATION_PASSWORD_ADMIN` or `CREATE USER` privilege can bypass `PASSWORD REQUIRE CURRENT` and change any user's password directly without knowing the old password.",
    explanation: "Administrators managing forgotten credentials need the ability to provision new passwords without knowing what the user had set previously. MySQL grants administrative override to accounts possessing `APPLICATION_PASSWORD_ADMIN`.",
    hint: "Privileged DBAs can override the requirement to supply the user's old password.",
    level: "intermediate",
    codeExample: `-- Admin reset (no REPLACE clause needed for DBAs with APPLICATION_PASSWORD_ADMIN):
ALTER USER 'forgetful_user'@'192.168.1.%' IDENTIFIED BY 'TemporaryP@ss#2026';`
  },
  {
    question: "How do you check if an account is currently locked due to failed login attempts versus manual locking?",
    shortAnswer: "Query the `account_locked` column in `mysql.user` and inspect `performance_schema.host_cache` or connection error logs.",
    explanation: "`SELECT user, host, account_locked FROM mysql.user;` shows whether an account is locked (`Y` or `N`). If an account was locked automatically by `FAILED_LOGIN_ATTEMPTS`, the lock duration is governed by `PASSWORD_LOCK_TIME`.",
    hint: "Inspect the account_locked column in mysql.user.",
    level: "intermediate",
    codeExample: `SELECT user, host, account_locked, password_last_changed 
FROM mysql.user 
WHERE account_locked = 'Y';`
  },
  {
    question: "What is `validate_password.dictionary_file`, and how does it prevent dictionary attacks?",
    shortAnswer: "A system variable pointing to a wordlist text file containing forbidden words (like 'password', 'admin', 'company_name'); candidate passwords containing these words are rejected under STRONG policy.",
    explanation: "Under `validate_password.policy = STRONG`, MySQL loads the specified dictionary file into memory. If any substring (of 4 or more characters) inside the candidate password matches a forbidden word in the dictionary, the password is rejected.",
    hint: "Think of an external dictionary file blocking corporate keywords and common dictionary terms.",
    level: "expert",
    codeExample: `-- In my.cnf:
[mysqld]
validate_password.dictionary_file=/etc/mysql/forbidden_passwords.txt
validate_password.policy=STRONG`
  },
  {
    question: "Can `FAILED_LOGIN_ATTEMPTS` be configured globally as a default for all newly created accounts?",
    shortAnswer: "No, in MySQL 8.0 `FAILED_LOGIN_ATTEMPTS` and `PASSWORD_LOCK_TIME` are configured per-user account.",
    explanation: "Unlike password lifetime and validation policies which have global defaults (`default_password_lifetime`, `validate_password.policy`), failed login attempt limits are account-level attributes specified in `CREATE USER` or `ALTER USER` DDL.",
    hint: "Failed login tracking is an account-level attribute in MySQL 8.0.",
    level: "intermediate",
    codeExample: `CREATE USER 'audited_user'@'%'
  IDENTIFIED BY 'SecurePass#2026'
  FAILED_LOGIN_ATTEMPTS 4
  PASSWORD_LOCK_TIME 2 DAY;`
  },
  {
    question: "How do you remove the failed login attempt tracking from an account?",
    shortAnswer: "`ALTER USER 'user'@'host' FAILED_LOGIN_ATTEMPTS 0;`",
    explanation: "Setting `FAILED_LOGIN_ATTEMPTS 0` disables automated locking on bad password attempts for that specific user account.",
    hint: "Set FAILED_LOGIN_ATTEMPTS to 0 to disable automated locking.",
    level: "basic",
    codeExample: `ALTER USER 'test_account'@'localhost' FAILED_LOGIN_ATTEMPTS 0;`
  },
  {
    question: "What is the security implication of setting `validate_password.mixed_case_count = 0` and `validate_password.special_char_count = 0`?",
    shortAnswer: "It reduces password entropy, allowing users to choose simple numeric or lowercase-only passwords that are easily cracked via offline attacks.",
    explanation: "Lowering character diversity requirements drastically decreases the keyspace for brute-force search. Enforcing mixed case, numbers, and symbols ensures high mathematical entropy.",
    hint: "Reducing character class requirements lowers cryptographic complexity and search keyspace.",
    level: "basic",
    codeExample: `SET GLOBAL validate_password.mixed_case_count = 1;
SET GLOBAL validate_password.special_char_count = 1;
SET GLOBAL validate_password.number_count = 1;`
  },
  {
    question: "What is the command to manually expire an account's password immediately so they are forced to reset it on their next login?",
    shortAnswer: "`ALTER USER 'username'@'host' PASSWORD EXPIRE;`",
    explanation: "Executing `PASSWORD EXPIRE` without an interval immediately flags the account's password as expired in the data dictionary. On next login, the user is forced into sandbox mode until they choose a new password.",
    hint: "Use ALTER USER ... PASSWORD EXPIRE without specifying an INTERVAL.",
    level: "basic",
    codeExample: `ALTER USER 'new_onboarded_staff'@'10.0.%.%' PASSWORD EXPIRE;`
  },
  {
    question: "What is the primary operational takeaway of Topic 4 in Module 004_003?",
    shortAnswer: "MySQL 8.0 provides complete enterprise credential governance: combining strict validation rules, automatic expiration, password history tracking, automated brute-force lockouts, and zero-downtime Dual Password rotations.",
    explanation: "Enterprise database security requires defense-in-depth at the credential tier. By combining `validate_password` components, dual-password rolling deployments, and automated account locking, database administrators maintain high security compliance without causing operational service disruption.",
    hint: "Summarize password validation, expiration, dual passwords, and account locking as a unified credential defense framework.",
    level: "basic",
    codeExample: `-- Golden Enterprise User Provisioning Template:
CREATE USER 'secure_service'@'10.10.%.%'
  IDENTIFIED WITH caching_sha2_password BY 'V3ry$ecure#Kolkata2026!'
  REQUIRE SSL
  PASSWORD EXPIRE INTERVAL 90 DAY
  PASSWORD HISTORY 6
  PASSWORD REUSE INTERVAL 365 DAY
  FAILED_LOGIN_ATTEMPTS 3
  PASSWORD_LOCK_TIME 1 DAY;`
  }
];

export default questions;
