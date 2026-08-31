const questions = [
  {
    question: "Do Object-Relational Mappers (ORMs) Automatically Guarantee Complete Immunity from SQL Injection?",
    shortAnswer: "NO. While standard ORM query builder methods automatically use parameterized bindings, ORMs become completely vulnerable whenever developers use raw SQL 'escape hatches' (e.g. Prisma `$queryRawUnsafe()`, Sequelize `Sequelize.literal()`, Django `extra()`, Entity Framework `FromSqlRaw()`) with string concatenation.",
    explanation: "Standard ORM methods like `prisma.user.findUnique({ where: { id } })` generate parameterized queries. However, developers needing complex aggregations frequently write: `prisma.$queryRawUnsafe(\"SELECT * FROM users WHERE email = '\" + email + \"'\")`. This re-introduces classic string concatenation SQL injection inside an otherwise modern ORM application.",
    hint: "ORMs protect normal queries, but using raw SQL functions with concatenated text creates the exact same SQL injection flaws.",
    level: "basic",
    codeExample: `// Safe vs Unsafe Prisma ORM Query:
// VULNERABLE: String concatenation in raw escape hatch!
await prisma.$queryRawUnsafe(\`SELECT * FROM accounts WHERE tax_id = '\${req.query.taxId}'\`);

// 100% SECURE: Tagged template literal with automatic parameterization!
await prisma.$queryRaw\`SELECT * FROM accounts WHERE tax_id = \${req.query.taxId}\`;`
  },
  {
    question: "What is the Critical Difference between Prisma `$queryRaw` and Prisma `$queryRawUnsafe()`?",
    shortAnswer: "`$queryRaw` is a Tagged Template Literal that automatically parses JavaScript template variables (`${userInput}`) into database positional parameter placeholders (`$1, $2`) out-of-band; `$queryRawUnsafe()` takes a pre-concatenated raw string and sends it directly to the database parser without parameterization.",
    explanation: "In Prisma: `prisma.$queryRaw\`SELECT * FROM users WHERE name = \${userName}\`` does NOT perform string interpolation. Instead, JavaScript passes template strings and variables separately to Prisma's tagged template handler, which converts the call to `SELECT * FROM users WHERE name = $1` with bindings `[userName]`. `$queryRawUnsafe` accepts raw strings, creating SQLi if concatenated.",
    hint: "$queryRaw uses template tags to create parameterized queries, while $queryRawUnsafe takes raw dangerous text strings.",
    level: "expert",
    codeExample: `// Prisma Tagged Template Mechanism:
// Code: prisma.$queryRaw\`SELECT id, balance FROM merchants WHERE email = \${userEmail}\`
// Executed SQL: SELECT id, balance FROM merchants WHERE email = $1
// Wire Binding: $1 = "admin@bank.in' OR 1=1--" (Treated as pure literal text!)`
  },
  {
    question: "How do Vulnerable Stored Procedures in PL/SQL or T-SQL Re-Introduce SQL Injection via Dynamic Execution (`EXEC()` / `EXECUTE IMMEDIATE`)?",
    shortAnswer: "When a stored procedure internally constructs dynamic SQL strings by concatenating parameter variables and executes them via `EXEC()` in T-SQL or `EXECUTE IMMEDIATE` in PL/SQL without using `sp_executesql` or `USING` parameter clauses.",
    explanation: "If an Oracle procedure executes: `EXECUTE IMMEDIATE 'SELECT * FROM patients WHERE id = ' || p_id;`, submitting `105 OR 1=1` mutates the internal query. Mitigation in PL/SQL requires parameter binding: `EXECUTE IMMEDIATE 'SELECT * FROM patients WHERE id = :id' USING p_id;`.",
    hint: "Stored procedures that glue text strings together inside EXECUTE IMMEDIATE are just as vulnerable as regular code.",
    level: "expert",
    codeExample: `// Vulnerable PL/SQL Stored Procedure:
PROCEDURE get_patient(p_id IN VARCHAR2) IS
BEGIN
    -- VULNERABLE: Dynamic string concatenation inside PL/SQL!
    EXECUTE IMMEDIATE 'SELECT * FROM patient_records WHERE id = ' || p_id;
END;

// Secure PL/SQL Parameterized Execution:
PROCEDURE get_patient_secure(p_id IN VARCHAR2) IS
BEGIN
    -- SECURE: Uses USING clause for parameter binding!
    EXECUTE IMMEDIATE 'SELECT * FROM patient_records WHERE id = :id' USING p_id;
END;`
  },
  {
    question: "How does Sequelize ORM `Sequelize.literal()` Create SQL Injection Vulnerabilities?",
    shortAnswer: "`Sequelize.literal()` tells Sequelize to insert a raw unescaped string directly into the generated SQL query Abstract Syntax Tree; if user input is concatenated into `literal()`, it bypasses all ORM parameterization.",
    explanation: "If a developer writes: `User.findAll({ where: Sequelize.literal(\"department = '\" + req.query.dept + \"'\") })`, Sequelize outputs the raw string verbatim. Mitigation requires using standard object syntax: `where: { department: req.query.dept }` or Sequelize replacements: `Sequelize.literal('department = :dept'), { replacements: { dept: req.query.dept } }`.",
    hint: "Sequelize.literal tells the ORM 'do not touch this text', so concatenating user input directly injects raw SQL.",
    level: "moderate",
    codeExample: `// Vulnerable Sequelize Literal:
await Merchant.findAll({
    where: Sequelize.literal(\`status = 'ACTIVE' AND branch = '\${req.query.branch}'\`) // VULNERABLE!
});

// Secure Sequelize Standard Where:
await Merchant.findAll({
    where: { status: 'ACTIVE', branch: req.query.branch } // 100% PARAMETERIZED!
});`
  },
  {
    question: "Under the Indian Information Technology Act 2000 Section 66F, what constitutes the criminal penalty for exploiting ORM and Stored Procedure SQLi to compromise Critical Power Grids or Financial Switches?",
    shortAnswer: "Using ORM escape hatch or stored procedure SQL injection to compromise, seize control of, or destroy critical national information infrastructure is CYBER TERRORISM, punishable with IMPRISONMENT FOR LIFE.",
    explanation: "Section 66F of the IT Act defines Cyber Terrorism. If an adversary exploits `$queryRawUnsafe` or dynamic stored procedures to compromise 220kV electrical substation databases in Barrackpore or central banking switches in Salt Lake, the offense carries mandatory Life Imprisonment.",
    hint: "Section 66F prescribes Life Imprisonment for Cyber Terrorism attacks on critical infrastructure.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66F - Cyber Terrorism):
// Offense: Exploiting raw ORM injection vulnerabilities to compromise SCADA electrical grid telemetry
// Penalty: IMPRISONMENT FOR LIFE`
  },
  {
    question: "How does Django ORM `extra()` and `RawSQL()` Re-Introduce SQL Injection in Python Applications?",
    shortAnswer: "Django's `extra()` and `RawSQL()` allow developers to inject raw SQL clauses; if user parameters are formatted via Python f-strings (`f\"id = {user_input}\"`) rather than passed to the `params` tuple, SQL injection occurs.",
    explanation: "In Django: `User.objects.extra(where=[f\"account_type = '{req.GET['type']}'\"])` creates SQLi. Mitigation requires passing parameters in the `params` argument: `User.objects.extra(where=[\"account_type = %s\"], params=[req.GET['type']])` or avoiding `extra()` in favor of standard Django `filter()`.",
    hint: "Passing f-strings into Django raw SQL functions bypasses Python ORM protections.",
    level: "moderate",
    codeExample: `// Vulnerable Django RawSQL:
Citizen.objects.annotate(val=RawSQL(f"SELECT balance FROM bank WHERE id = {citizen_id}", [])) # VULNERABLE!

// Secure Django Parameterized RawSQL:
Citizen.objects.annotate(val=RawSQL("SELECT balance FROM bank WHERE id = %s", (citizen_id,))) # 100% SECURE!`
  },
  {
    question: "What is the 'Principle of Least Privilege' on Stored Procedure Execution Grants?",
    shortAnswer: "Revoking execution permissions from the `PUBLIC` role on all system and custom stored procedures (`REVOKE EXECUTE ON master..xp_cmdshell FROM PUBLIC`), and granting execution rights ONLY to dedicated, tightly scoped application roles.",
    explanation: "Historically, database roles like `PUBLIC` possessed permissions on dangerous system procedures (`xp_dirtree`, `xp_cmdshell`, `UTL_HTTP`). Database administrators must revoke all public grants and create dedicated reader/writer service roles that only possess `EXECUTE` on strictly necessary application stored procedures.",
    hint: "Taking away permission from regular users to run powerful database procedures.",
    level: "moderate",
    codeExample: `// MSSQL Stored Procedure Least Privilege Script:
REVOKE EXECUTE ON OBJECT::dbo.ProcessSettlement FROM PUBLIC;
GRANT EXECUTE ON OBJECT::dbo.ProcessSettlement TO payment_service_role;`
  },
  {
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023 Section 8(5) and Section 33, what are the enterprise liabilities if an ORM raw SQL injection leaks 1,000,000 citizen banking records?",
    shortAnswer: "Failing to implement reasonable technical safeguards (such as parameterized ORM queries) resulting in massive personal data exfiltration triggers statutory penalties up to ₹250 Crores by the Data Protection Board of India.",
    explanation: "Section 8(5) mandates reasonable technical security safeguards. If an enterprise in Kolkata uses `$queryRawUnsafe` or un-parameterized stored procedures, leading to citizen financial record leaks, Section 33 prescribes fines up to ₹250 Crores.",
    hint: "Failing to secure ORM queries leading to citizen data leaks triggers fines up to ₹250 Crores under the DPDP Act.",
    level: "moderate",
    codeExample: `// DPDP Statutory Compliance Standard:
// Legal Section: Section 8(5) & Section 33 DPDP Act 2023
// Maximum Penalty: Up to ₹250,00,00,000 (Rupees 250 Crores) for negligent database query vulnerabilities`
  },
  {
    question: "How does Entity Framework Core `FromSqlRaw()` vs `FromSqlInterpolated()` Handle Parameterization in C# .NET?",
    shortAnswer: "`FromSqlInterpolated()` automatically converts C# string interpolation (`$\"... {userInput}\"`) into parameterized `DbParameter` objects; `FromSqlRaw()` accepts a pre-formatted string and is vulnerable to SQL injection if strings are concatenated with `+` or `$`. ",
    explanation: "In EF Core: `context.Merchants.FromSqlInterpolated($\"SELECT * FROM merchants WHERE tax_id = {taxId}\")` is 100% parameterized by the C# compiler. Calling `context.Merchants.FromSqlRaw(\"SELECT * FROM merchants WHERE tax_id = '\" + taxId + \"'\")` causes SQL injection. To use `FromSqlRaw` safely, parameters must be passed as `SqlParameter` objects.",
    hint: "FromSqlInterpolated automatically turns C# curly braces into parameters; FromSqlRaw requires manual parameter arrays.",
    level: "expert",
    codeExample: `// Entity Framework Core Comparison:
// VULNERABLE: context.Merchants.FromSqlRaw("SELECT * FROM merchants WHERE tax_id = '" + taxId + "'");
// 100% SECURE: context.Merchants.FromSqlInterpolated($"SELECT * FROM merchants WHERE tax_id = {taxId}");`
  },
  {
    question: "Under CERT-In Mandatory Directions 2022, what is the mandatory incident reporting timeline for Stored Procedure and ORM SQLi breaches?",
    shortAnswer: "All organizations in India must report security breaches and unauthorized database access resulting from ORM and stored procedure SQLi to CERT-In within 6 HOURS of detection.",
    explanation: "Under Section 70B of the IT Act and CERT-In Direction No. 20(3)/2022-CERT-In, service providers, intermediaries, data centers, and corporate bodies must mandatorily report specified cyber security incidents (including unauthorized access to database systems) to CERT-In within 6 hours of noticing them.",
    hint: "CERT-In requires mandatory incident reporting within a strict 6-hour window.",
    level: "basic",
    codeExample: `// Statutory SLA (CERT-In Mandatory Incident Reporting):
// Directive: Mandatory reporting of ORM database leaks within 6 HOURS
// Mandate: Section 70B Information Technology Act 2000`
  },
  {
    question: "What is 'Hibernate HQL / JPQL Injection' and how does it Differ from Native SQL Injection?",
    shortAnswer: "Injecting malicious syntax into Hibernate Query Language (HQL) or Java Persistence Query Language (JPQL) strings (`\"FROM User WHERE name = '\" + input + \"'\"`); while HQL operates on entity models rather than raw tables, attackers can still bypass authentication, exfiltrate data, or invoke database functions.",
    explanation: "HQL compiles into native SQL. If an application executes `session.createQuery(\"FROM Merchant WHERE taxId = '\" + taxId + \"'\")`, an attacker inputs `' OR '1'='1`. The resulting HQL AST creates a tautology, dumping all merchant entity records. Mitigation requires positional/named HQL parameters: `query.setParameter(\"taxId\", taxId)`.",
    hint: "Writing string concatenation in Java Hibernate HQL queries is just as dangerous as writing raw SQL concatenation.",
    level: "expert",
    codeExample: `// Vulnerable Hibernate HQL Query:
Query q = session.createQuery("FROM Account WHERE customerId = '" + input + "'"); // VULNERABLE!

// Secure Hibernate Parameterized HQL:
Query q = session.createQuery("FROM Account WHERE customerId = :cid");
q.setParameter("cid", input); // 100% SECURE!`
  },
  {
    question: "Under the Indian IT Act Section 43(a), what constitutes civil liability for extracting database records using ORM injection flaws?",
    shortAnswer: "Securing access and extracting or copying data from a computer system without permission of the owner carries compensation by way of damages up to ₹1 Crore.",
    explanation: "Section 43(a) explicitly penalizes unauthorized data extraction: 'If any person without permission of the owner... accesses or secures access to such computer... he shall be liable to pay damages by way of compensation not exceeding one crore rupees.'",
    hint: "Section 43(a) provides civil compensation up to ₹1 Crore for unauthorized database data extraction.",
    level: "basic",
    codeExample: `// Statutory Liability (IT Act Section 43(a)):
// Violation: Exploiting ORM escape hatch SQL injection to extract 50,000 customer banking records in Kolkata
// Compensation: Up to ₹1,00,00,00,000 (Rupees One Crore) per affected entity`
  },
  {
    question: "What is 'SQLAlchemy `text()` Fragment Injection' in Python Web Services?",
    shortAnswer: "When using SQLAlchemy's `text()` construct to execute raw SQL fragments without binding parameter dictionaries, allowing concatenated user inputs to mutate query logic.",
    explanation: "Writing `db.session.execute(text(f\"SELECT * FROM invoices WHERE id = '{invoice_id}'\"))` creates SQL injection. Writing `db.session.execute(text(\"SELECT * FROM invoices WHERE id = :id\"), {\"id\": invoice_id})` guarantees parameterization across the SQLAlchemy engine.",
    hint: "Always pass a dictionary of parameters as the second argument to SQLAlchemy's text() function.",
    level: "moderate",
    codeExample: `// Vulnerable SQLAlchemy:
db.session.execute(text(f"SELECT * FROM records WHERE status = '{user_status}'")) # VULNERABLE!

// Secure SQLAlchemy Parameterized:
db.session.execute(text("SELECT * FROM records WHERE status = :st"), {"st": user_status}) # 100% SECURE!`
  },
  {
    question: "How do Database Administrators Prevent SQL Injection in Dynamic T-SQL Stored Procedures using `sp_executesql`?",
    shortAnswer: "By defining an explicit parameter definition string (e.g. `@params = N'@taxId varchar(50), @status varchar(20)'`) and passing user variables as named parameters to `sp_executesql`, pre-compiling the query plan and preventing AST mutation.",
    explanation: "In SQL Server: Dynamic queries must never be executed via `EXEC('SELECT...'+@input)`. Using `sp_executesql` caches the compiled query plan and binds `@input` out-of-band as literal data, guaranteeing 100% SQLi immunity inside T-SQL stored procedures.",
    hint: "Using sp_executesql with parameter definition strings inside SQL Server stored procedures.",
    level: "expert",
    codeExample: `// Secure MSSQL sp_executesql Procedure:
CREATE PROCEDURE GetMerchantProfileSecure @TaxId varchar(50), @Branch varchar(20) AS
BEGIN
    DECLARE @sql nvarchar(500) = N'SELECT id, balance FROM merchants WHERE tax_id = @t AND branch = @b';
    DECLARE @params nvarchar(200) = N'@t varchar(50), @b varchar(20)';
    EXEC sp_executesql @sql, @params, @t = @TaxId, @b = @Branch;
END;`
  },
  {
    question: "Under the Indian IT Act Section 66, what constitutes the criminal penalty for writing and executing exploits targeting ORM injection vulnerabilities?",
    shortAnswer: "Dishonestly or fraudulently hacking or diminishing the utility of computer systems carries imprisonment up to 3 years and fines up to ₹5 Lakhs.",
    explanation: "Section 66 criminalizes fraudulent computer disruption: 'If any person, dishonestly or fraudulently, does any act referred to in section 43... he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees, or with both.'",
    hint: "Section 66 provides up to 3 years imprisonment and ₹5 Lakh fine for fraudulent computer hacking.",
    level: "basic",
    codeExample: `// Statutory Penalty (IT Act Section 66):
// Offense: Writing automated exploitation scripts targeting ORM escape hatch endpoints in West Bengal
// Penalty: Up to 3 Years Imprisonment + Fine up to ₹5,00,00,000`
  },
  {
    question: "What is 'Automated SAST Rule Detection for ORM Raw Escape Hatches' in Modern DevSecOps Pipelines?",
    shortAnswer: "Static code analysis rules (Semgrep / CodeQL) that flag any invocation of dangerous ORM raw methods (`$queryRawUnsafe`, `Sequelize.literal`, `RawSQL`, `FromSqlRaw`) that accept string interpolations or concatenated variables.",
    explanation: "A Semgrep rule targeting Prisma flags: `pattern: prisma.$queryRawUnsafe(...)`. The rule enforces that developers MUST use `$queryRaw` tagged template literals or rewrite the query using standard Prisma client methods (`prisma.user.findMany()`), failing CI/CD builds on any violation.",
    hint: "Automated code scanners that scan for words like $queryRawUnsafe or Sequelize.literal during git commit.",
    level: "moderate",
    codeExample: `// Semgrep SAST Rule for Prisma $queryRawUnsafe (YAML):
rules:
  - id: ban-prisma-query-raw-unsafe
    pattern: prisma.$queryRawUnsafe(...)
    message: "FORBIDDEN: Use prisma.$queryRaw tagged template literal for automatic parameterization!"
    severity: ERROR
    languages: [javascript, typescript]`
  },
  {
    question: "Synthesize an enterprise-scale Multi-Tier Security Architecture for ORM & Stored Procedure Hardening.",
    shortAnswer: "A defense-in-depth framework combining 100% Standard ORM Query Builder APIs, Mandatory Tagged Template Literals for Raw SQL (`$queryRaw`, `FromSqlInterpolated`), `sp_executesql` / `USING` Parameterized Stored Procedures, CI/CD SAST Blocking Gates, and Revocation of `PUBLIC` Stored Procedure Execution Grants.",
    explanation: "To achieve complete immunity across modern ORM and stored procedure architectures: 1. Application Layer: Prefer high-level ORM methods (`findUnique()`, `filter()`). 2. Raw SQL Layer: For complex queries, use tagged template literals (`prisma.$queryRaw\`...\``) and parameter replacements (`Sequelize.literal('... :param')`). 3. Database Procedure Layer: Enforce `sp_executesql` and PL/SQL `USING` clauses. 4. DevSecOps Layer: Semgrep blocking gates banning `$queryRawUnsafe`. 5. Database Privileges: Least privilege stored procedure grants.",
    hint: "Combine standard ORM methods, tagged template literals for raw SQL, sp_executesql in procedures, and CI/CD SAST gates.",
    level: "expert",
    codeExample: `// Master ORM & Stored Procedure Defense Blueprint:
// 1. High-Level ORM : const user = await prisma.merchant.findUnique({ where: { taxId } });
// 2. Tagged Raw SQL : const data = await prisma.$queryRaw\`SELECT * FROM logs WHERE id = \${safeId}\`;
// 3. Stored Procedure: EXEC sp_executesql N'SELECT * FROM accounts WHERE id = @id', N'@id int', @id = 105;
// 4. CI/CD Gate     : Semgrep AST linter blocking $queryRawUnsafe in all git commits`
  },
  {
    question: "What is 'TypeORM `whereRaw()` and `createQueryBuilder()` Injection' in TypeScript Architectures?",
    shortAnswer: "When developers use TypeORM's `where()` or `whereRaw()` with string interpolation (`qb.where(\"user.id = \" + id)`) rather than positional/named parameter objects (`qb.where(\"user.id = :id\", { id })`).",
    explanation: "In TypeORM: `repository.createQueryBuilder('user').where(\`user.email = '\${email}'\`)` causes SQL injection. The secure TypeORM pattern requires: `repository.createQueryBuilder('user').where('user.email = :email', { email })`, which instructs TypeORM to generate parameterized SQL with parameter bindings.",
    hint: "Always pass a parameter object as the second argument to TypeORM's where() function.",
    level: "moderate",
    codeExample: `// Vulnerable TypeORM QueryBuilder:
qb.where(\`user.taxId = '\${req.query.taxId}'\`); // VULNERABLE!

// Secure TypeORM QueryBuilder:
qb.where('user.taxId = :taxId', { taxId: req.query.taxId }); // 100% PARAMETERIZED!`
  },
  {
    question: "Under the Indian Penal Code Section 427, what constitutes 'Mischief' via Stored Procedure or ORM SQL Exploits?",
    shortAnswer: "Intentionally altering, corrupting, or deleting digital property and database records by exploiting ORM raw escape hatches or dynamic stored procedures, punishable with imprisonment up to 2 years and fines.",
    explanation: "Section 425/427 IPC defines Mischief. When an attacker exploits an ORM raw SQL injection to delete patient chemotherapy records or corporate invoices in West Bengal, the act constitutes digital mischief under Section 427.",
    hint: "IPC Section 427 covers Mischief and Digital Record Deletion with up to 2 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Penalty (Indian Penal Code Section 427):
// Offense: Exploiting ORM raw SQL injection to drop patient diagnostic tables in Ichapur (Mischief)
// Penalty: Imprisonment for a term up to 2 Years, or with Fine, or with both`
  },
  {
    question: "What is 'PostgreSQL PL/pgSQL `EXECUTE ... USING` Parameterization' in Dynamic Stored Functions?",
    shortAnswer: "The PL/pgSQL command for executing dynamic SQL queries with positional parameter placeholders (`$1, $2`) and supplying parameter values via the `USING` clause, ensuring the query plan is compiled safely without string concatenation.",
    explanation: "In PostgreSQL: Dynamic queries in functions must be written as: `EXECUTE 'SELECT * FROM accounts WHERE balance >= $1 AND status = $2' USING min_balance, account_status;`. PL/pgSQL binds `$1` and `$2` out-of-band as typed values, guaranteeing complete SQLi immunity inside PostgreSQL functions.",
    hint: "Using EXECUTE ... USING in PostgreSQL functions to bind parameters out-of-band.",
    level: "expert",
    codeExample: `// Secure PL/pgSQL Function:
CREATE OR REPLACE FUNCTION get_high_value_merchants(min_val numeric, state_code text)
RETURNS SETOF merchants AS $$
BEGIN
    RETURN QUERY EXECUTE 
        'SELECT * FROM merchants WHERE balance >= $1 AND state = $2' 
        USING min_val, state_code; -- 100% PARAMETERIZED!
END;
$$ LANGUAGE plpgsql;`
  },
  {
    question: "What is 'Second-Order ORM Injection' when Storing Malicious Strings in Database Models?",
    shortAnswer: "When an ORM safely stores an untrusted string in the database (e.g. username `' OR 1=1--`), but a subsequent raw ORM query (`$queryRawUnsafe` or `Sequelize.literal`) retrieves the stored string and concatenates it into a secondary query.",
    explanation: "Phase 1: `await prisma.user.create({ data: { name: \"admin'--\" } })` (safe). Phase 2: A nightly reporting script runs: `const u = await prisma.user.findFirst(); await prisma.$queryRawUnsafe(\"SELECT * FROM logs WHERE user = '\" + u.name + \"'\")`. The retrieved string injects into the raw query. 100% parameterization must be maintained everywhere.",
    hint: "Even if your ORM saved the data safely today, concatenating that data into a raw query tomorrow causes SQL injection.",
    level: "expert",
    codeExample: `// Second-Order ORM Injection Lifecycle:
// Phase 1 (Safe ORM Insert) : await prisma.user.create({ data: { name: "admin'--" } });
// Phase 2 (Unsafe Raw Query) : await prisma.$queryRawUnsafe("SELECT * FROM audit WHERE user = '" + u.name + "'");`
  },
  {
    question: "Under the Indian IT Act Section 70, what constitutes the penalty for exploiting ORM or Stored Procedure SQLi against 'Protected Systems'?",
    shortAnswer: "Securing unauthorized access or attempting to secure access to designated Protected Systems (critical infrastructure) carries imprisonment up to 10 YEARS and severe fines.",
    explanation: "Section 70 of the IT Act governs Critical Information Infrastructure (e.g. power grids in Barrackpore, financial settlement switches in Salt Lake). Launching an ORM raw SQL injection attack against a designated protected system carries up to 10 years imprisonment under Section 70.",
    hint: "Section 70 carries up to 10 years imprisonment for unauthorized access to Protected Systems.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 70):
// Offense: Exploiting ORM escape hatch SQL injection against SCADA power grid management databases
// Penalty: Imprisonment for a term up to 10 YEARS, and shall also be liable to Fine`
  },
  {
    question: "What is 'SQL Object Injection in Ruby on Rails ActiveRecord' (e.g. `User.where(\"name = '\#{params[:name]}'\")`)?",
    shortAnswer: "When Ruby on Rails developers use string interpolation inside ActiveRecord query methods (`User.where(\"name = '#{params[:name]}'\")`) rather than positional array arguments (`User.where(\"name = ?\", params[:name])`) or hash conditions (`User.where(name: params[:name])`).",
    explanation: "In Ruby on Rails: `User.where(name: params[:name])` is 100% safe and parameterized. However, string interpolation inside `where(\"...\")` evaluates before ActiveRecord can parameterize it, creating classic SQL injection.",
    hint: "Always use hash syntax like User.where(name: params[:name]) in Rails ActiveRecord.",
    level: "moderate",
    codeExample: `// Ruby on Rails ActiveRecord Comparison:
// VULNERABLE: User.where("email = '#{params[:email]}'")
// 100% SECURE: User.where(email: params[:email]) OR User.where("email = ?", params[:email])`
  },
  {
    question: "Under the Indian IT Act Section 66C, what constitutes Identity Theft via ORM Credential Extraction?",
    shortAnswer: "Fraudulently or dishonestly making use of the electronic signature, password, or unique identification feature of another person carries imprisonment up to 3 years and fines up to ₹1 Lakh.",
    explanation: "Section 66C of the IT Act explicitly criminalizes identity theft. If an attacker exploits an ORM raw query flaw to extract citizen password hashes or banking tokens and impersonates users in Kolkata, they face up to 3 years imprisonment under Section 66C.",
    hint: "Section 66C covers Identity Theft and Credential Extraction with up to 3 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Offense (IT Act Section 66C):
// Offense: Extracting 20,000 citizen banking credentials via ORM raw escape hatch SQL injection
// Penalty: Imprisonment up to 3 Years + Fine up to ₹1,00,00,000`
  },
  {
    question: "What is 'ORM Performance Overhead vs Security Tradeoff' (Query Plan Generation in Prisma/Hibernate)?",
    shortAnswer: "Modern ORMs compile queries into parameterized statements with negligible performance overhead (~1-2%), while providing compile-time type safety and 100% SQLi immunity; avoiding ORMs solely for 'raw string speed' is an anti-pattern that creates critical vulnerabilities.",
    explanation: "Modern ORMs (Prisma, Entity Framework Core) generate optimized SQL queries and reuse database query plans. The microsecond parsing cost of an ORM is vastly outweighed by the mathematical security guarantee of automated parameterization and maintainable schema migrations.",
    hint: "Modern ORMs are very fast, and writing raw string SQL just to save 1 millisecond puts the whole company at risk.",
    level: "moderate",
    codeExample: `// Modern ORM Performance & Security Harmony:
// 1. Compile-Time Type Checking: TypeScript / Java compiler prevents type errors
// 2. Automated Parameterization : Zero string concatenation risk
// 3. Query Plan Caching         : Database engine reuses pre-compiled execution plans`
  },
  {
    question: "Under the Indian Penal Code Section 420, what constitutes Cheating via ORM Injection Financial Fraud?",
    shortAnswer: "Dishonestly accessing, altering, or siphoning funds using ORM raw query injection exploits, punishable with imprisonment up to 7 years and fines.",
    explanation: "Section 420 IPC penalizes cheating and fraudulent property transfer. If an attacker exploits an ORM raw SQL injection on a Kolkata payment portal to siphon ₹85 Lakhs from escrow balances, they are prosecuted under Section 420 alongside the IT Act.",
    hint: "IPC Section 420 covers Cheating and Fraudulent Financial Siphoning with up to 7 years imprisonment.",
    level: "basic",
    codeExample: `// Statutory Offense (Indian Penal Code Section 420):
// Offense: Exploiting ORM raw escape hatch injection to siphon ₹85 Lakhs from corporate escrow accounts
// Penalty: Imprisonment for a term up to 7 Years, and shall also be liable to Fine`
  },
  {
    question: "What is 'Kysely TypeScript SQL Query Builder' and why is it Considered the Most Type-Safe SQL Layer?",
    shortAnswer: "Kysely is a type-safe TypeScript SQL query builder that verifies table and column names at compile-time against database interface definitions, while guaranteeing that all `.where()` values are automatically transformed into positional parameter bindings (`$1, $2`).",
    explanation: "In Kysely: `db.selectFrom('merchants').where('tax_id', '=', req.query.taxId).selectAll().execute()`. The TypeScript compiler throws errors if `tax_id` does not exist on `merchants`, and the Kysely runtime compiles the query into `SELECT * FROM merchants WHERE tax_id = $1` with parameter bindings `[req.query.taxId]`.",
    hint: "A modern TypeScript query builder that catches typing mistakes during compilation and parameterizes everything automatically.",
    level: "expert",
    codeExample: `// Kysely Type-Safe Query Builder:
const merchant = await db
    .selectFrom('corporate_merchants')
    .selectAll()
    .where('tax_id', '=', req.query.gst_no)
    .executeTakeFirst();`
  },
  {
    question: "What is 'Audit Logging of Dynamic Stored Procedure Execution' in Database Activity Monitoring (DAM)?",
    shortAnswer: "Configuring database audit policies (e.g. SQL Server Extended Events, PostgreSQL `pgaudit`) to log the exact SQL statements executed by dynamic stored procedures, flagging any query containing unexpected concatenation patterns.",
    explanation: "DAM tools inspect internal stored procedure activity in real time. If a procedure executes `sp_executesql` with a string constructed via dynamic concatenation, `pgaudit` records the execution and alerts the SOC to investigate potential internal injection vectors.",
    hint: "Security tools that monitor and record what stored procedures are doing inside the database.",
    level: "expert",
    codeExample: `// PostgreSQL pgaudit Configuration:
# Enable function execution auditing in postgresql.conf:
pgaudit.log = 'function, ddl, write'
pgaudit.log_level = 'notice'`
  },
  {
    question: "Synthesize the mathematical formulation of Relational Algebra Mapping in ORMs (R(O)), AST Template Generation (Q_AST), and Parameter Binding Invariance Proving Complete SQLi Immunity.",
    shortAnswer: "Let application entity objects be O in ObjectSpace. The ORM mapping function R(O) compiles a fixed relational algebra tree T_algebra in Phase 1, generating an AST template Q_AST. In Phase 2, literal entity attributes are mapped to terminal leaf bindings without executing grammar production rules. Therefore, Delta AST = empty set, mathematically proving P_sqli = 0.00% under standard ORM query compilation.",
    explanation: "Let the domain of application object models be O. An ORM maps object queries Q_O to relational algebra expressions: R: O → A. In standard ORM compilation (e.g. Prisma/Hibernate), R pre-compiles the algebraic tree into a static Abstract Syntax Tree template T_0 = Q_AST with positional parameter slots {$1, $2, ..., $n}. Entity attribute values are mapped directly to binary wire parameter buffers: f_bind: O_attrs → V_T. Because no user-supplied data passes through the grammar production rules of the relational compiler, ΔAST = AST(Q_executed) - T_0 = ∅. This establishes the mathematical proof that standard ORM query builders provide absolute injection immunity (P_sqli = 0.00%) as long as raw escape hatches (`$queryRawUnsafe`, `Sequelize.literal`) are avoided.",
    hint: "Mathematical proof formula showing that ORM relational algebra compilers freeze the query tree first, proving zero percent (0.00%) SQL injection exploitability unless raw escape hatches are abused.",
    level: "expert",
    codeExample: `// Mathematical ORM Compiler & Immunity Proof:
// Standard ORM Builder  : R(O) ➔ Fixed AST T_0 | Delta AST = Empty Set ➔ P_sqli = 0.00% (IMMUNE!)
// Raw Escape Concatenation: $queryRawUnsafe("..." + data) ➔ Delta AST != Empty Set ➔ P_sqli = 100.0% (VULNERABLE!)`
  }
];

export default questions;
