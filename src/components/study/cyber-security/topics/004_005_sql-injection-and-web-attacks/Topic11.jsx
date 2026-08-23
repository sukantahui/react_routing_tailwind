import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic11_files/topic11_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic11_files/topic11_note.txt?raw";

const Topic11 = () => {
  // Unique SVG IDs
  const svgOrmPipelineId = useId();

  // Studio 1: Active ORM / Stored Procedure Pattern Selection
  const [selectedPatternKey, setSelectedPatternKey] = useState("prisma_tagged_template");

  // Studio 2: Live ORM Query Engine & Stored Procedure Laboratory State
  const [rawParameterInput, setRawParameterInput] = useState("9841' OR '1'='1");
  const [ormFramework, setOrmFramework] = useState("prisma_nodejs"); // prisma_nodejs, sequelize_nodejs, django_python, entity_framework_dotnet, mssql_procedure
  const [executionParadigm, setExecutionParadigm] = useState("safe_parameterized"); // unsafe_raw_escape, safe_parameterized

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_fintech_orm_audit");

  // Studio 4: ORM Hardening Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("prisma_tagged_repo");

  // 8 Patterns for Studio 1
  const patternDatabase = {
    prisma_tagged_template: {
      key: "prisma_tagged_template",
      name: "1. Prisma $queryRaw Tagged Template Literal",
      category: "NODE.JS PRISMA ORM SECURITY",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      securityPrinciple: "Tagged template literals automatically convert JS variables into parameter slots.",
      mechanismDescription:
        "`prisma.$queryRaw\`SELECT * FROM users WHERE email = \${email}\`` passes the query template and variables separately to Prisma's tagged template handler, compiling to `WHERE email = $1` with bindings out-of-band.",
      mitigationPattern: "Always use `$queryRaw\`...\``; strictly ban `$queryRawUnsafe()`.",
      typicalSyntax: "await prisma.$queryRaw`SELECT * FROM accounts WHERE id = ${userId}`;",
      codeSnippet: `// Safe Prisma Tagged Template:
const account = await prisma.$queryRaw\`SELECT id, balance FROM accounts WHERE tax_id = \${userTaxId}\`;`
    },
    prisma_query_raw_unsafe_danger: {
      key: "prisma_query_raw_unsafe_danger",
      name: "2. Prisma $queryRawUnsafe Vulnerability",
      category: "ORM RAW ESCAPE HATCH VULNERABILITY",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      securityPrinciple: "Pre-interpolated raw strings bypass all ORM parameterization.",
      mechanismDescription:
        "`prisma.$queryRawUnsafe(\"SELECT * FROM users WHERE name = '\" + name + \"'\")` evaluates the concatenated string verbatim, re-introducing classic SQL injection into modern TypeScript codebases.",
      mitigationPattern: "Ban `$queryRawUnsafe` in CI/CD using Semgrep AST linting rules.",
      typicalSyntax: "prisma.$queryRawUnsafe(`SELECT * FROM users WHERE email = '${email}'`) // VULNERABLE!",
      codeSnippet: `// Insecure Prisma Escape Hatch:
await prisma.$queryRawUnsafe(\`SELECT * FROM merchants WHERE tax_id = '\${rawTaxId}'\`); // VULNERABLE!`
    },
    sequelize_standard_vs_literal: {
      key: "sequelize_standard_vs_literal",
      name: "3. Sequelize Standard Where vs Sequelize.literal()",
      category: "SEQUELIZE ORM INJECTION HOLES",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      securityPrinciple: "Standard `{ where }` syntax parameterizes; `literal()` inserts raw strings.",
      mechanismDescription:
        "Using `{ where: { status: req.query.status } }` generates parameterized SQL. Calling `Sequelize.literal(\"status = '\" + req.query.status + \"'\")` bypasses parameterization.",
      mitigationPattern: "Use standard Sequelize object conditions or explicit replacements.",
      typicalSyntax: "where: { taxId: req.query.taxId } OR Sequelize.literal('... :val')",
      codeSnippet: `// Secure Sequelize Pattern:
const user = await Merchant.findOne({ where: { taxId: rawGstNumber } }); // 100% PARAMETERIZED!`
    },
    django_rawsql_parameterization: {
      key: "django_rawsql_parameterization",
      name: "4. Django ORM RawSQL & extra() Tuple Binding",
      category: "PYTHON DJANGO ORM SECURITY",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      securityPrinciple: "Pass parameters in the `params` tuple, never via Python f-strings.",
      mechanismDescription:
        "Writing `RawSQL(f\"id = {user_id}\", [])` creates SQLi. Writing `RawSQL(\"id = %s\", (user_id,))` instructs Django to pass parameters to the database driver safely.",
      mitigationPattern: "Use `params` tuples in `RawSQL()` or prefer native Django `filter()`.",
      typicalSyntax: "Citizen.objects.annotate(val=RawSQL('SELECT balance FROM b WHERE id = %s', (id,)))",
      codeSnippet: `// Secure Django RawSQL:
records = Citizen.objects.annotate(val=RawSQL("SELECT total FROM b WHERE id = %s", (c_id,)))`
    },
    entity_framework_interpolated: {
      key: "entity_framework_interpolated",
      name: "5. EF Core FromSqlInterpolated vs FromSqlRaw",
      category: "C# .NET ENTITY FRAMEWORK SECURITY",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      securityPrinciple: "C# compiler transforms `FromSqlInterpolated` into parameterized `DbParameter`.",
      mechanismDescription:
        "`FromSqlInterpolated($\"SELECT * FROM users WHERE id = {userId}\")` is automatically parameterized by the C# compiler. `FromSqlRaw` with string concatenation causes SQL injection.",
      mitigationPattern: "Enforce `FromSqlInterpolated()` across all .NET microservices.",
      typicalSyntax: "context.Merchants.FromSqlInterpolated($\"SELECT * FROM merchants WHERE id = {id}\")",
      codeSnippet: `// Secure EF Core Query:
var merchants = await context.Merchants.FromSqlInterpolated($"SELECT * FROM m WHERE id = {safeId}").ToListAsync();`
    },
    mssql_dynamic_sp_executesql: {
      key: "mssql_dynamic_sp_executesql",
      name: "6. MSSQL Dynamic sp_executesql Parameterization",
      category: "T-SQL STORED PROCEDURE HARDENING",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      securityPrinciple: "Dynamic SQL in stored procedures must use typed parameter definitions.",
      mechanismDescription:
        "Procedures concatenating strings inside `EXEC('SELECT...'+@p)` are completely vulnerable. Using `sp_executesql` with defined parameter types caches the query plan and binds parameters safely.",
      mitigationPattern: "Execute dynamic queries via `sp_executesql` with typed `@params` strings.",
      typicalSyntax: "EXEC sp_executesql @sql, N'@id varchar(50)', @id = @userParam;",
      codeSnippet: `// Secure T-SQL Stored Procedure:
EXEC sp_executesql N'SELECT * FROM accounts WHERE tax_id = @t', N'@t varchar(50)', @t = @TaxId;`
    },
    plsql_dynamic_execute_using: {
      key: "plsql_dynamic_execute_using",
      name: "7. PL/SQL & PL/pgSQL EXECUTE USING Binding",
      category: "ORACLE & POSTGRESQL FUNCTION SECURITY",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      securityPrinciple: "Bind variables in dynamic stored functions via `USING` clauses.",
      mechanismDescription:
        "In Oracle and PostgreSQL: `EXECUTE 'SELECT * FROM users WHERE id = $1' USING user_id;` binds parameters out-of-band across database binary buffers, preventing internal procedure injection.",
      mitigationPattern: "Enforce `USING` parameter clauses in all dynamic database functions.",
      typicalSyntax: "EXECUTE 'SELECT * FROM patients WHERE id = $1' USING p_id;",
      codeSnippet: `// Secure PL/pgSQL Dynamic Query:
EXECUTE 'SELECT * FROM patient_records WHERE id = $1' USING patient_id;`
    },
    least_privilege_procedure_grants: {
      key: "least_privilege_procedure_grants",
      name: "8. Revoking PUBLIC Stored Procedure Execution Grants",
      category: "DATABASE PERMISSION HARDENING",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      securityPrinciple: "Only dedicated application service roles should possess `EXECUTE` permissions.",
      mechanismDescription:
        "Revoking `EXECUTE` on system and application procedures from `PUBLIC` ensures that unprivileged database accounts cannot invoke system procedures or execute unauthorized business routines.",
      mitigationPattern: "`REVOKE EXECUTE ON OBJECT::dbo.ProcName FROM PUBLIC;`",
      typicalSyntax: "REVOKE EXECUTE ON master..xp_dirtree FROM PUBLIC;",
      codeSnippet: `// Least Privilege Procedure Grant:
REVOKE EXECUTE ON dbo.ProcessPayment FROM PUBLIC;
GRANT EXECUTE ON dbo.ProcessPayment TO payment_service_role;`
    }
  };

  const activePattern = patternDatabase[selectedPatternKey];

  // Studio 2: Live ORM & Stored Procedure Laboratory Calculations
  const simulationResults = useMemo(() => {
    let generatedSql = "";
    let executionMechanism = "";
    let isSqliVulnerable = false;
    let astStatus = "";
    let deltaAst = "EMPTY_SET (0 Mutated Nodes)";

    if (executionParadigm === "unsafe_raw_escape") {
      isSqliVulnerable = true;
      astStatus = "AST MUTATED: New Boolean 'OR' Grammar Branch Created Inside ORM Escape Hatch!";
      deltaAst = "NON_EMPTY (3 Injected Grammar Nodes: WHERE ➔ OR ➔ TRUE)";

      if (ormFramework === "prisma_nodejs") {
        generatedSql = `prisma.$queryRawUnsafe("SELECT * FROM accounts WHERE tax_id = '${rawParameterInput}'")`;
        executionMechanism = `Raw String Interpolation ➔ Un-parameterized SQL Sent to DB: "SELECT * FROM accounts WHERE tax_id = '${rawParameterInput}'"`;
      } else if (ormFramework === "sequelize_nodejs") {
        generatedSql = `Merchant.findAll({ where: Sequelize.literal("tax_id = '${rawParameterInput}'") })`;
        executionMechanism = `Sequelize.literal Injection ➔ Raw String Inserted: "WHERE tax_id = '${rawParameterInput}'"`;
      } else if (ormFramework === "django_python") {
        generatedSql = `Citizen.objects.extra(where=[f"tax_id = '{${rawParameterInput}}'"])`;
        executionMechanism = `Python f-string Interpolation in Django extra() ➔ Un-parameterized SQL Execution`;
      } else if (ormFramework === "entity_framework_dotnet") {
        generatedSql = `context.Merchants.FromSqlRaw("SELECT * FROM merchants WHERE tax_id = '" + "${rawParameterInput}" + "'")`;
        executionMechanism = `C# String Concatenation in FromSqlRaw() ➔ Un-parameterized SQL Execution`;
      } else {
        generatedSql = `EXEC('SELECT * FROM accounts WHERE tax_id = ''' + '${rawParameterInput}' + '''')`;
        executionMechanism = `Dynamic T-SQL EXEC() Concatenation Inside Stored Procedure ➔ SQL Injection!`;
      }
    } else {
      isSqliVulnerable = false;
      astStatus = "AST INVARIANT: Fixed Query Plan (Zero Grammar Mutation)";
      deltaAst = "EMPTY_SET (0 Mutated Nodes)";

      if (ormFramework === "prisma_nodejs") {
        generatedSql = `prisma.$queryRaw\`SELECT * FROM accounts WHERE tax_id = \${'${rawParameterInput}'}\``;
        executionMechanism = `Tagged Template Literal ➔ Compiled SQL: "SELECT * FROM accounts WHERE tax_id = $1" with Binding: ["${rawParameterInput}"]`;
      } else if (ormFramework === "sequelize_nodejs") {
        generatedSql = `Merchant.findAll({ where: { taxId: '${rawParameterInput}' } })`;
        executionMechanism = `Standard Sequelize Object Query ➔ Compiled SQL: "SELECT * FROM merchants WHERE tax_id = $1" with Binding: ["${rawParameterInput}"]`;
      } else if (ormFramework === "django_python") {
        generatedSql = `Citizen.objects.filter(tax_id='${rawParameterInput}')`;
        executionMechanism = `Django ORM filter() ➔ Compiled SQL: "SELECT * FROM citizens WHERE tax_id = %s" with Binding: ("${rawParameterInput}",)`;
      } else if (ormFramework === "entity_framework_dotnet") {
        generatedSql = `context.Merchants.FromSqlInterpolated($"SELECT * FROM merchants WHERE tax_id = {taxId}")`;
        executionMechanism = `EF Core FromSqlInterpolated ➔ Compiled SQL: "SELECT * FROM merchants WHERE tax_id = @p0" with DbParameter: "${rawParameterInput}"`;
      } else {
        generatedSql = `EXEC sp_executesql N'SELECT * FROM accounts WHERE tax_id = @t', N'@t varchar(50)', @t = '${rawParameterInput}';`;
        executionMechanism = `T-SQL sp_executesql Parameterized Execution ➔ Compiled Plan Cached with Literal Binding`;
      }
    }

    const exploitabilityPct = isSqliVulnerable ? 100.0 : 0.0;

    return {
      generatedSql,
      executionMechanism,
      astStatus,
      deltaAst,
      exploitabilityPct: exploitabilityPct.toFixed(1),
      badgeClass: isSqliVulnerable
        ? "bg-rose-950 text-rose-300 border-rose-800"
        : "bg-emerald-950 text-emerald-300 border-emerald-800",
      statusMessage: !isSqliVulnerable
        ? `100% RELATIONAL ALGEBRA AST INVARIANCE: ORM / Stored Procedure compiled fixed AST template; Parameters transmitted out-of-band as pure typed constants; Exploitability is 0.00%!`
        : `CRITICAL ORM RAW SQL INJECTION: Unsafe escape hatch or dynamic stored procedure concatenated untrusted strings; AST mutated; Attacker injected SQL commands inside ORM wrapper!`
    };
  }, [rawParameterInput, ormFramework, executionParadigm]);

  // Studio 4: ORM Hardening Production Code Database
  const codeDatabase = {
    prisma_tagged_repo: {
      name: "Prisma ORM Production Repository with Tagged Template Literals & Standard Methods",
      code: `// Prisma Production Security Repository:
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class MerchantSettlementService {
    // 1. High-Level Standard ORM Method (100% Automated Parameterization)
    static async getMerchantByTaxId(taxId) {
        return await prisma.merchant.findUnique({
            where: { taxId: String(taxId) },
            select: { id: true, businessName: true, totalBalance: true, complianceStatus: true }
        });
    }

    // 2. Safe Raw SQL Query using Tagged Template Literal ($queryRaw)
    // Prisma converts \`\${variable}\` automatically into positional parameter slots ($1, $2)!
    static async getAggregatedSettlementHistory(taxId, minAmount) {
        return await prisma.$queryRaw\`
            SELECT id, total_amount, settlement_date, status 
            FROM corporate_settlements 
            WHERE tax_id = \${taxId} AND total_amount >= \${minAmount} 
            ORDER BY settlement_date DESC
        \`;
    }

    // 3. STRICT RULE: Never invoke prisma.$queryRawUnsafe() with string concatenation!
}

module.exports = MerchantSettlementService;`,
      explanation: "Production Prisma repository demonstrating high-level type-safe methods (`findUnique()`) and safe raw SQL execution via `$queryRaw` tagged template literals."
    },
    mssql_stored_procedure_sp_executesql: {
      name: "Microsoft SQL Server Secure Stored Procedure with sp_executesql Parameterization",
      code: `-- Production MSSQL Stored Procedure Hardening Script:
-- -------------------------------------------------------------
USE KolkataFinTechCore;
GO

CREATE OR ALTER PROCEDURE dbo.GetMerchantSettlementsSecure
    @TaxId varchar(50),
    @MinAmount decimal(18, 2),
    @StateCode varchar(10)
AS
BEGIN
    SET NOCOUNT ON;

    -- 1. Declare Dynamic SQL String & Parameter Definition Types:
    DECLARE @sql nvarchar(1000) = N'
        SELECT id, merchant_name, settlement_amount, status, created_at 
        FROM dbo.settlement_records 
        WHERE tax_id = @t AND settlement_amount >= @amt AND state_code = @sc 
        ORDER BY created_at DESC
    ';

    DECLARE @params nvarchar(300) = N'
        @t varchar(50), 
        @amt decimal(18, 2), 
        @sc varchar(10)
    ';

    -- 2. Execute Dynamic Query with sp_executesql Parameter Binding:
    -- Pre-compiles execution plan; user parameters are bound safely out-of-band!
    EXEC sp_executesql 
        @sql, 
        @params, 
        @t = @TaxId, 
        @amt = @MinAmount, 
        @sc = @StateCode;
END;
GO

-- 3. Enforce Principle of Least Privilege:
REVOKE EXECUTE ON OBJECT::dbo.GetMerchantSettlementsSecure FROM PUBLIC;
GRANT EXECUTE ON OBJECT::dbo.GetMerchantSettlementsSecure TO payment_service_role;`,
      explanation: "Production T-SQL stored procedure utilizing `sp_executesql` with defined parameter types, ensuring dynamic queries cache pre-compiled execution plans and prevent SQL injection."
    },
    django_safe_orm_repository: {
      name: "Python Django Safe Parameterized ORM Repository & RawSQL Pattern",
      code: `# Django Production Safe ORM Service:
from django.db.models.expressions import RawSQL
from .models import OncologyPatientRecord

class OncologyDataService:
    @staticmethod
    def get_patient_diagnostics(patient_tax_id: str, department_code: str):
        # 1. Standard Django Filter (100% Parameterized by Design)
        return OncologyPatientRecord.objects.filter(
            tax_id=patient_tax_id, 
            department=department_code
        ).values('id', 'patient_name', 'diagnosis', 'treatment_plan')

    @staticmethod
    def get_complex_diagnostic_aggregations(patient_tax_id: str):
        # 2. Safe RawSQL with Positional Parameter Tuples:
        # User input is passed in the params tuple, NEVER in Python f-strings!
        return OncologyPatientRecord.objects.annotate(
            chemo_count=RawSQL(
                "SELECT COUNT(*) FROM chemo_sessions WHERE patient_id = oncology_records.id AND status = %s",
                ("COMPLETED",) # Tuple parameter binding!
            )
        ).filter(tax_id=patient_tax_id)`,
      explanation: "Production Python Django service demonstrating standard `filter()` methods and parameterized `RawSQL()` annotations utilizing parameter tuples."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_fintech_orm_audit",
      lead: "Mamata",
      role: "Lead FinTech Security Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Auditing Prisma ORM Microservices to Eliminate $queryRawUnsafe Injections",
      threatType: "ORM RAW ESCAPE HATCH SQL INJECTION ($queryRawUnsafe)",
      budget: "₹97,00,000",
      incident:
        "A legacy payment settlement microservice used `prisma.$queryRawUnsafe(\"... WHERE tax_id = '\" + taxId + \"'\")`, allowing attackers to inject `' OR 1=1--` and dump merchant ledgers.",
      defenseStrategy:
        "Mamata refactored all raw Prisma queries to `$queryRaw` tagged template literals and deployed Semgrep rules banning `$queryRawUnsafe` in CI/CD.",
      outcome: "100% of raw escape hatch flaws eliminated; zero merchant records leaked; ₹4,600 Crores in daily UPI settlements fully secured.",
      metrics: {
        rawQueriesRefactored: "100.0%",
        settlementVolumeProtected: "₹4,600 Crores",
        endpointsProtected: "102 Microservices",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "barrackpore_scada_plsql_hardening",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "DYNAMIC PL/SQL STORED PROCEDURE INJECTION (EXECUTE IMMEDIATE)",
      title: "Hardening Substation Oracle PL/SQL Stored Procedures with EXECUTE IMMEDIATE USING",
      budget: "₹66,00,000",
      incident:
        "Substation telemetry procedures constructed dynamic queries via `EXECUTE IMMEDIATE '... WHERE node_id = ' || p_node`, allowing subquery injection.",
      defenseStrategy:
        "Debangshu refactored all PL/SQL stored procedures to use `EXECUTE IMMEDIATE ... USING` parameter bindings and revoked `PUBLIC` execution grants.",
      outcome: "100% of PL/SQL dynamic injection vectors eliminated; breaker telemetry maintained 100% integrity across North 24 Parganas.",
      metrics: {
        proceduresHardened: "100.0%",
        substationsProtected: "18 High-Voltage Nodes",
        unauthorizedLogins: "0 Breaches",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_hospital_django_rawsql",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "DJANGO ORM RawSQL F-STRING INJECTION",
      title: "Securing Oncology Clinical Patient Records from Django RawSQL Injection",
      budget: "₹51,00,000",
      incident:
        "An oncology diagnostic reporting view used `RawSQL(f\"diagnosis_date >= '{date_param}'\", [])` with Python f-strings, enabling SQL injection.",
      defenseStrategy:
        "Mahima migrated queries to standard Django `filter()` models and parameterized `RawSQL(\"... %s\", (date_param,))` tuples.",
      outcome: "100% of Django raw query flaws remediated; zero chemotherapy files compromised; 120,000 cancer patient records fully protected.",
      metrics: {
        djangoViewsHardened: "100.0%",
        patientRecordsProtected: "120,000 Oncology Records",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_orm_compiler_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "MATHEMATICAL MODELING OF RELATIONAL ALGEBRA MAPPING IN ORM COMPILERS",
      title: "Formulating the Formal ORM Relational Compiler Invariant Model in IEEE Transactions",
      budget: "₹44,00,000",
      incident:
        "Researchers formulated mathematical proofs demonstrating that standard ORM relational mapping functions guarantee ΔAST = ∅ unless raw escape hatches are invoked.",
      defenseStrategy:
        "Susmita and Abhronila published their mathematical proof in IEEE Transactions, proving that tagged template literals maintain 100% compiler safety.",
      outcome: "Published peer-reviewed mathematical proof; verified across 450,000 simulated ORM query compilation runs.",
      metrics: {
        simulationTrials: "450,000 Test Trials",
        modelAccuracy: "99.9% Predictive Fit",
        modelFramework: "ORM Relational Compiler Model",
        publication: "IEEE Transactions on Information Forensics"
      }
    }
  ];

  const activeScenario = localScenarios.find((s) => s.id === activeScenarioId) || localScenarios[0];

  return (
    <div className="min-h-screen bg-[#0a0d14] text-gray-100 font-sans leading-relaxed selection:bg-rose-600 selection:text-white pb-16">
      {/* Top Academic Header Banner */}
      <header className="border-b border-gray-800 bg-[#0d121d]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-400 border border-rose-800">
                BCAC703 Cyber Security
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800">
                Module 004_005
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                Topic 11
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Using ORMs and Stored Procedures Securely
            </h1>
            <p className="text-xs text-gray-400">
              ORM escape hatches, Prisma `$queryRaw` vs `$queryRawUnsafe`, Sequelize literals, T-SQL `sp_executesql`, PL/SQL `USING`, and IT Act Section 66F.
            </p>
          </div>
          <div className="text-right text-xs text-gray-400 flex flex-col items-start sm:items-end">
            <span className="font-semibold text-gray-200">Instructor: Sukanta Hui</span>
            <span>Coder &amp; AccoTax · Barrackpore, WB</span>
          </div>
        </div>
      </header>

      {/* Main Container - Stacked Vertical Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-12">

        {/* SECTION 1: Executive Theory & Threat Taxonomy */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              ORM Security &amp; Stored Procedure Hardening
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Science of Secure ORM &amp; Stored Procedure Engineering: Eliminating Raw SQL Escape Hatch Injections
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Modern software architectures rely extensively on <strong>Object-Relational Mappers (ORMs)</strong>—such as Prisma, 
              Sequelize, TypeORM, Hibernate, Entity Framework Core, and Django ORM—and <strong>Database Stored Procedures</strong>. 
              While standard high-level ORM query builder methods automatically enforce parameterization, ORMs become completely 
              vulnerable to SQL Injection whenever developers invoke <strong>Raw SQL Escape Hatches</strong> using string concatenation 
              (such as Prisma <strong>`$queryRawUnsafe()`</strong>, Sequelize <strong>`Sequelize.literal()`</strong>, Django <strong>`extra()`</strong>, 
              or EF Core <strong>`FromSqlRaw()`</strong>). Similarly, stored procedures that internally concatenate parameter strings 
              inside dynamic <strong>`EXEC()`</strong> or <strong>`EXECUTE IMMEDIATE`</strong> statements remain 100% vulnerable. 
              Secure engineering mandates using <strong>Tagged Template Literals (`$queryRaw\`...\``)</strong> in Prisma, 
              <strong>`sp_executesql`</strong> in T-SQL, <strong>`EXECUTE ... USING`</strong> in PL/SQL, and enforcing CI/CD SAST rules 
              banning unsafe raw escape methods (SQL Injection Probability = 0.00%).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Escape Hatch Problem Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-rose-950/60 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                The ORM Raw Escape Hatch Vulnerability
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60 text-[11px]">
                $queryRawUnsafe("..." + data) ➔ Bypasses ORM Parameterization ➔ SQLi Re-Introduced!
              </div>
              <p className="text-gray-300 leading-relaxed">
                Developers believing that ORMs provide automatic magic protection leave critical raw escape hatches open when writing complex SQL queries.
              </p>
            </div>

            {/* Secure Stored Procedure Architecture Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                Secure Stored Procedure Hardening
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">T-SQL Dynamic Queries:</strong> Execute dynamic SQL via `sp_executesql` with typed `@params`.</li>
                <li>• <strong className="text-purple-300">PL/SQL Dynamic Execution:</strong> Enforce parameter binding using `EXECUTE ... USING`.</li>
                <li>• <strong className="text-amber-300">Revoke PUBLIC Grants:</strong> Restrict stored procedure execution strictly to dedicated service roles.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - ORM Relational Compiler Visualizer */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              ORM Relational Compiler &amp; Tagged Template Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing ORM Security: How Tagged Template Literals Freeze Query ASTs
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Follow how modern ORMs compile tagged template literals into parameterized statements with zero AST mutation:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* STAGE 1: ORM CODE */}
              <g transform="translate(30, 60)">
                <rect width="140" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. ORM INVOCATION
                </text>
                <text x="70" y="44" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
                  Prisma / Sequelize
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#0c4a6e" />
                <text x="70" y="74" fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                  TAGGED TEMPLATE:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  $queryRaw`...`
                </text>
                <text x="70" y="106" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  {"Passes ${userInput}"}
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 170 130 L 200 130" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* STAGE 2: RELATIONAL ALGEBRA COMPILER */}
              <g transform="translate(200, 60)">
                <rect width="140" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. ORM COMPILER
                </text>
                <text x="70" y="44" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">
                  AST Template Builder
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#312e81" />
                <text x="70" y="74" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  EXTRACTS TEMPLATE:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  WHERE tax_id = $1
                </text>
                <text x="70" y="106" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  Creates Parameter Slot!
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 340 130 L 370 130" stroke="#818cf8" strokeWidth="3" fill="none" />

              {/* STAGE 3: WIRE BINDING BUFFER */}
              <g transform="translate(370, 60)">
                <rect width="140" height="140" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  3. WIRE BINDING
                </text>
                <text x="70" y="44" fill="#fde68a" fontSize="8.5" textAnchor="middle">
                  Out-of-Band Parameter
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#78350f" />
                <text x="70" y="74" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">
                  RAW INPUT DATA:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  "9841' OR 1=1--"
                </text>
                <text x="70" y="106" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  Transmitted as Data!
                </text>
              </g>

              {/* ARROW 3 */}
              <path d="M 510 130 L 540 130" stroke="#f59e0b" strokeWidth="3" fill="none" />

              {/* STAGE 4: DATABASE PARSER BYPASS */}
              <g transform="translate(540, 60)">
                <rect width="140" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  4. PARSER BYPASS
                </text>
                <text x="70" y="44" fill="#fecdd3" fontSize="8.5" textAnchor="middle">
                  Pre-Compiled Execution
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#4c0519" />
                <text x="70" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  AST INVARIANCE:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Delta AST = Empty Set
                </text>
                <text x="70" y="106" fill="#fecdd3" fontSize="7.5" textAnchor="middle">
                  Zero Query Mutation!
                </text>
              </g>

              {/* ARROW 4 */}
              <path d="M 680 130 L 710 130" stroke="#f43f5e" strokeWidth="3" fill="none" />

              {/* STAGE 5: SAFE ORM RESULT */}
              <g transform="translate(710, 60)">
                <rect width="140" height="140" rx="10" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  5. SAFE RESULT
                </text>
                <text x="70" y="44" fill="#a7f3d0" fontSize="8.5" textAnchor="middle">
                  100% ORM Security
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#064e3b" />
                <text x="70" y="74" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">
                  EXECUTION:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  P_sqli = 0.00%
                </text>
                <text x="70" y="106" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  100% Safe Execution!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Pattern ORM Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. ORM &amp; Stored Procedure Pattern Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select an ORM or stored procedure pattern below to examine its category, security principle, 
              compilation mechanics, enterprise mitigation patterns, and code syntax:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(patternDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedPatternKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedPatternKey === item.key
                    ? "bg-emerald-950/80 border-emerald-500 shadow-lg shadow-emerald-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              >
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-emerald-950 text-emerald-300 border-emerald-800 self-start">
                  ORM
                </span>
                <span className="font-bold text-white text-[11px] leading-tight line-clamp-2">{item.name}</span>
              </button>
            ))}
          </div>

          {/* Active Detail Box */}
          <div className="bg-[#070b14] p-5 sm:p-6 rounded-xl border border-gray-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activePattern.categoryBadge)}>
                    {activePattern.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-cyan-400 font-mono">
                    Principle: {activePattern.securityPrinciple}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-indigo-950/80 border border-indigo-800 text-indigo-300 font-mono text-[11px]">
                    Syntax: {activePattern.typicalSyntax}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activePattern.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Compilation Mechanics &amp; AST Invariance
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activePattern.mechanismDescription}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-cyan-400 uppercase tracking-wider text-[10px] block">
                    Enterprise Mitigation Pattern
                  </span>
                  <p className="text-gray-300 leading-relaxed font-semibold">{activePattern.mitigationPattern}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Execution &amp; Implementation Blueprint
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activePattern.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live ORM Query Engine & Stored Procedure Laboratory */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. ORM Query Engine &amp; Stored Procedure Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Enter an untrusted SQL payload, select the ORM Framework / DB Engine, and choose between Unsafe Raw String Concatenation 
              and Safe Parameterized execution to evaluate generated SQL and AST invariance:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">ORM &amp; Procedure Parameters</h3>

              <div className="space-y-1">
                <span className="text-gray-400 block">1. Untrusted User Parameter Input:</span>
                <input
                  type="text"
                  value={rawParameterInput}
                  onChange={(e) => setRawParameterInput(e.target.value)}
                  className="w-full p-2 bg-gray-950 rounded border border-gray-800 text-cyan-300 font-mono text-xs focus:border-cyan-500 outline-none"
                />
              </div>

              <div className="space-y-1 pt-1 border-t border-gray-800">
                <span className="text-gray-400 block">2. ORM Framework / Database Engine:</span>
                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    { id: "prisma_nodejs", label: "Prisma ORM (Node.js)" },
                    { id: "sequelize_nodejs", label: "Sequelize ORM (Node.js)" },
                    { id: "django_python", label: "Django ORM (Python)" },
                    { id: "entity_framework_dotnet", label: "Entity Framework Core (C#)" },
                    { id: "mssql_procedure", label: "MSSQL Stored Procedure (T-SQL)" }
                  ].map((orm) => (
                    <button
                      key={orm.id}
                      onClick={() => setOrmFramework(orm.id)}
                      className={clsx(
                        "p-2 rounded border font-bold text-[10px] text-left transition-all",
                        ormFramework === orm.id
                          ? "bg-purple-950 border-purple-500 text-purple-300"
                          : "bg-gray-950 border-gray-800 text-gray-400"
                      )}
                    >
                      {orm.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1 pt-1 border-t border-gray-800">
                <span className="text-gray-400 block">3. Execution Paradigm:</span>
                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    { id: "unsafe_raw_escape", label: "Unsafe Raw String Escape Hatch ($queryRawUnsafe / literal)" },
                    { id: "safe_parameterized", label: "Safe Parameterized / Tagged Template ($queryRaw / sp_executesql)" }
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setExecutionParadigm(p.id)}
                      className={clsx(
                        "p-2 rounded border font-bold text-[10px] text-left transition-all",
                        executionParadigm === p.id
                          ? p.id === "unsafe_raw_escape" ? "bg-rose-950 border-rose-500 text-rose-300" : "bg-emerald-950 border-emerald-500 text-emerald-300"
                          : "bg-gray-950 border-gray-800 text-gray-400"
                      )}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculated Output Metrics & AST Structure Preview */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">ORM Compilation &amp; DB Execution Inspection</h3>
                <span className={clsx("text-xs px-2.5 py-0.5 rounded font-mono font-bold border", simulationResults.exploitabilityPct > 0 ? "bg-rose-950 text-rose-300 border-rose-800" : "bg-emerald-950 text-emerald-300 border-emerald-800")}>
                  {simulationResults.exploitabilityPct > 0 ? "VULNERABLE (Raw SQLi Hole)" : "100% SECURE (AST Invariant)"}
                </span>
              </div>

              <div className="bg-gray-950 p-3 rounded-lg border border-gray-800 space-y-1.5">
                <span className="text-gray-400 text-[10px] uppercase block">Generated ORM / Procedure Method Invocation:</span>
                <pre className="p-2.5 bg-black/90 rounded font-mono text-xs text-cyan-300 overflow-x-auto whitespace-pre-wrap border border-cyan-950/60">
                  {simulationResults.generatedSql}
                </pre>
              </div>

              <div className="bg-gray-950 p-3 rounded-lg border border-gray-800 space-y-1.5">
                <span className="text-gray-400 text-[10px] uppercase block">Database Wire Protocol Binding Execution:</span>
                <pre className="p-2.5 bg-black/90 rounded font-mono text-xs text-indigo-300 overflow-x-auto whitespace-pre-wrap border border-indigo-950/60">
                  {simulationResults.executionMechanism}
                </pre>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Delta AST (Mutated Nodes)</span>
                  <span className="text-xs font-bold text-amber-300 mt-1 block">{simulationResults.deltaAst}</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Exploitability Probability</span>
                  <span className={clsx("text-lg font-extrabold mt-0.5 block", simulationResults.exploitabilityPct > 0 ? "text-rose-400" : "text-emerald-400")}>
                    {simulationResults.exploitabilityPct}%
                  </span>
                </div>
              </div>

              <div className={clsx("p-4 rounded-lg border font-mono text-xs", simulationResults.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">ORM Security Assessment:</span>
                <p className="mt-1 font-extrabold text-sm leading-relaxed">{simulationResults.statusMessage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - ORM Hardening Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Prisma, T-SQL &amp; Django Hardening Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production Prisma Tagged Template Repository, T-SQL sp_executesql &amp; Django ORM
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production implementations of Prisma `$queryRaw` tagged template literals, 
              T-SQL `sp_executesql` stored procedure hardening, and Python Django parameterized RawSQL:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {Object.entries(codeDatabase).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setActiveCodeTab(key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 text-xs font-bold",
                  activeCodeTab === key
                    ? "bg-purple-950 border-purple-500 text-purple-300 shadow-md shadow-purple-950/50"
                    : "bg-[#0b101c] border-gray-800 hover:border-gray-700 text-gray-400"
                )}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="bg-[#050811] p-5 sm:p-6 rounded-xl border border-gray-800 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-sm font-bold text-white">{activeCode.name}</h3>
              <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-purple-400 font-mono">
                Production Pattern
              </span>
            </div>

            <p className="text-xs text-gray-300">{activeCode.explanation}</p>

            <pre className="bg-black/90 p-4 rounded-lg font-mono text-xs text-purple-200 overflow-x-auto whitespace-pre-wrap border border-purple-950/50">
              {activeCode.code}
            </pre>
          </div>
        </section>

        {/* SECTION 6: Studio 3 - Regional West Bengal Pedagogical Case Studies */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Regional Engineering Applications
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              6. West Bengal Field Case Studies: Kolkata, Barrackpore, Ichapur &amp; Jadavpur
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore how cybersecurity leaders Mamata, Debangshu, Mahima, and Susmita audit Prisma `$queryRaw` in Salt Lake, 
              harden PL/SQL stored procedures in Barrackpore, and secure Django ORM queries in Ichapur:
            </p>
          </div>

          {/* Scenario Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {localScenarios.map((sc) => (
              <button
                key={sc.id}
                onClick={() => setActiveScenarioId(sc.id)}
                className={clsx(
                  "p-4 rounded-xl border text-left transition-all duration-300 space-y-2",
                  activeScenarioId === sc.id
                    ? "bg-amber-950/60 border-amber-500 shadow-md"
                    : "bg-[#0b101c] border-gray-800 hover:border-gray-700 text-gray-400"
                )}
              >
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-900 text-amber-300 border border-amber-800">
                  {sc.lead} · {sc.location.split(" ")[0]}
                </span>
                <h4 className="text-xs font-bold text-white line-clamp-1">{sc.title}</h4>
                <p className="text-[11px] text-gray-400 line-clamp-1">{sc.threatType}</p>
              </button>
            ))}
          </div>

          {/* Active Scenario Detailed Breakdown */}
          <div className="bg-[#070b14] p-6 rounded-xl border border-gray-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-3">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {activeScenario.location}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">{activeScenario.title}</h3>
              </div>
              <div className="text-right text-xs">
                <span className="text-gray-400 block">Lead Architect: {activeScenario.lead}</span>
                <span className="font-semibold text-emerald-400">Security Budget: {activeScenario.budget}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-2">
                <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px]">
                  The Incident &amp; ORM Escape Hatch Threat
                </span>
                <p className="text-gray-300 leading-relaxed">{activeScenario.incident}</p>
              </div>

              <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-2">
                <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px]">
                  Architectural Defense &amp; Resolution
                </span>
                <p className="text-gray-300 leading-relaxed">{activeScenario.defenseStrategy}</p>
              </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="bg-[#050811] p-4 rounded-lg border border-gray-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              {Object.entries(activeScenario.metrics).map(([key, val]) => (
                <div key={key} className="bg-gray-950 p-2.5 rounded border border-gray-800/80">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-white mt-1 block">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: Statutory & Legal Frameworks in India */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Statutory Jurisprudence
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              7. Legal Penalties for ORM &amp; Stored Procedure SQL Injection Breaches in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber law, critical infrastructure protection mandates, and personal data protection frameworks 
              strictly penalize exploiting ORM raw escape hatches or dynamic stored procedures with severe civil compensation liabilities and life imprisonment:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 66F
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Cyber Terrorism:</strong> ORM SQLi attacks compromising critical infrastructure carry <span className="text-rose-400 font-bold">LIFE IMPRISONMENT</span>.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IT Act Section 43(a) &amp; 70
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 43(a):</strong> Civil damages up to <span className="text-rose-400 font-bold">₹1 CRORE</span> for unauthorized database data extraction.
                </li>
                <li>
                  <strong className="text-white">Section 70:</strong> Protected Systems attack (Up to 10 years prison).
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-emerald-950 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                DPDP Act 2023 &amp; IPC 420
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">DPDP Section 33:</strong> Fines up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for failing to secure database query layers.
                </li>
                <li>
                  <strong className="text-white">IPC Section 420:</strong> Commercial fraud &amp; fund siphoning (Up to 7 years prison).
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 8: Common Pitfalls, Pro Tips, Thinking Hints & Mini Checklist */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Exam &amp; Professional Mastery
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              8. Common Pitfalls, Industry Best Practices &amp; Key Hints
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Common Pitfalls */}
            <div className="bg-gray-950 p-4 rounded-xl border border-rose-950/60 space-y-3">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                Common Beginner Mistakes
              </span>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li>
                  <strong>Using `$queryRawUnsafe` with String Concatenation:</strong> Re-introduces classic SQLi into Prisma!
                </li>
                <li>
                  <strong>Concatenating Strings Inside Stored Procedures:</strong> `EXEC('SELECT...'+@p)` remains 100% vulnerable.
                </li>
                <li>
                  <strong>Using `Sequelize.literal()` with Untrusted Inputs:</strong> Inserts raw strings directly into the query AST.
                </li>
              </ul>
            </div>

            {/* Professional Tips */}
            <div className="bg-gray-950 p-4 rounded-xl border border-emerald-950/60 space-y-3">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                Professional Tips &amp; Tricks
              </span>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li>
                  <strong>Always Use Tagged Template Literals:</strong> `prisma.$queryRaw\`...\`` parameterizes automatically.
                </li>
                <li>
                  <strong>Deploy `sp_executesql` &amp; `USING` in Stored Procedures:</strong> Pre-compiles dynamic query plans.
                </li>
                <li>
                  <strong>Ban Raw Escape Hatches in CI/CD:</strong> Semgrep and CodeQL block `$queryRawUnsafe` in git commits.
                </li>
              </ul>
            </div>

            {/* Hint Section */}
            <div className="bg-gray-950 p-4 rounded-xl border border-indigo-950/60 space-y-3">
              <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                Pedagogical Thinking Hints
              </span>
              <ul className="space-y-2 text-gray-300">
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Think about...</span>
                  Why does Prisma `$queryRaw` tagged template literal provide 100% security while `$queryRawUnsafe` causes SQL injection?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  How does `sp_executesql` with defined parameter types prevent SQL injection inside Microsoft SQL Server stored procedures?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the laboratory above, switch Execution Paradigm to Safe Parameterized and observe Delta AST drop to Empty Set!
                </li>
              </ul>
            </div>
          </div>

          {/* Mini Checklist */}
          <div className="bg-gray-950 p-5 rounded-xl border border-gray-800 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider text-rose-400">
              Student Mini Checklist (Exam &amp; Career Essentials)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Standard ORM methods parameterize queries; raw escape hatches with concatenation re-introduce SQLi.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Prisma `$queryRaw` tagged template literal is 100% safe; `$queryRawUnsafe()` is vulnerable.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Stored procedures that concatenate strings internally inside `EXEC()` remain completely vulnerable.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Dynamic T-SQL stored procedures must execute via `sp_executesql` with parameter definitions.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>PL/SQL dynamic queries must bind parameters out-of-band using the `USING` clause.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 66F of the IT Act penalizes ORM and stored procedure SQLi attacks with Life Imprisonment.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Using ORMs &amp; Stored Procedures Securely FAQs"
            subtitle="30 Moderate to Expert Practice Questions & ORM Escape Hatch Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Using ORMs and Stored Procedures Securely (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic11_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Object-Relational Mappers (ORMs) and Stored Procedures provide incredible productivity, but they do NOT automatically make an application immune to SQL Injection if developers abuse raw escape hatches! Master the critical distinctions: standard high-level ORM methods (`findUnique()`, `filter()`, `where()`) automatically parameterize queries, but raw escape hatches (`$queryRawUnsafe()`, `Sequelize.literal()`, `RawSQL()`, `FromSqlRaw()`) re-introduce classic string concatenation SQLi holes. Always use Tagged Template Literals (`prisma.$queryRaw\`...\``) and parameter replacements. In database stored procedures, remember that dynamic queries executed via raw `EXEC()` or `EXECUTE IMMEDIATE` with string concatenation remain 100% vulnerable; always enforce `sp_executesql` with typed `@params` in T-SQL and `EXECUTE ... USING` in PL/SQL and PL/pgSQL. Enforce the Principle of Least Privilege by revoking `PUBLIC` execution rights on stored procedures and deploy Semgrep CI/CD blocking gates to ban `$queryRawUnsafe`. Remember that Section 66F of the Indian IT Act penalizes ORM and stored procedure SQL injection attacks against critical national infrastructure with mandatory Life Imprisonment, and Section 43(a) provides civil damages up to ₹1 Crore for unauthorized database extraction!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic11;
