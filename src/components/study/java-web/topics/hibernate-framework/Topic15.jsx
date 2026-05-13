import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Import Java / XML files using ?raw (Vite syntax)
import hibernateRevengXml from "./topic15_files/hibernate.reveng.xml?raw";
import hbm2ddlProps from "./topic15_files/hibernate.properties?raw";
import reverseEngineeredHbm from "./topic15_files/Student.hbm.xml?raw";
import mavenPluginPom from "./topic15_files/pom.xml?raw";

// Import FAQ questions (30 items, moderate to expert)
import questions from "./topic15_files/topic15_questions";

// Keyframes for animations
const animationStyles = `
  @keyframes fadeSlideUp {
    from {
      opacity: 0;
      transform: translateY(24px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-slide-up {
    animation: fadeSlideUp 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
  }
  @keyframes softGlow {
    0% { box-shadow: 0 0 0 0 rgba(59,130,246,0); }
    50% { box-shadow: 0 0 0 6px rgba(59,130,246,0.2); }
    100% { box-shadow: 0 0 0 0 rgba(59,130,246,0); }
  }
  .animate-soft-glow {
    animation: softGlow 1.2s ease-in-out 2;
  }
`;

const Topic15 = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-12 dark:bg-gray-900 bg-gray-50 transition-colors duration-300">
      <style>{animationStyles}</style>

      {/* Header Section */}
      <div className="animate-fade-slide-up text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 dark:from-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">
          Hibernate Tools (Reverse Engineering, hbm2ddl)
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Master Hibernate's toolset – generate database schemas from entities (hbm2ddl), reverse-engineer 
          entities and mapping files from existing databases, and automate development with Maven/Eclipse plugins.
        </p>
      </div>

      {/* 1. Conceptual explanation */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:100ms] opacity-0 [animation-fill-mode:forwards]">
        <div className="flex items-center gap-3 border-l-4 border-blue-500 pl-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">What are Hibernate Tools?</h2>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            <strong>Hibernate Tools</strong> is a suite of command-line and IDE plugins that help with:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
            <li><strong>Forward Engineering:</strong> Generate DDL schema from entity classes (using <code>hbm2ddl</code>).</li>
            <li><strong>Reverse Engineering:</strong> Generate entity classes, mapping files (XML or annotations) from an existing database.</li>
            <li><strong>Code Generation:</strong> Produce DAO, JUnit test stubs, etc.</li>
            <li><strong>Query Development:</strong> HQL/JPA editor with code completion and validation.</li>
          </ul>
          <div className="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-xl border-l-4 border-blue-400">
            <p className="text-sm italic text-blue-800 dark:text-blue-200">
              💡 <strong>Real-world scenario:</strong> At Barrackpore High School, the library database already exists. 
              Reverse engineering generates Student, Book, Loan entities instantly, saving hours of manual coding.
            </p>
          </div>
        </div>
      </section>

      {/* 2. hbm2ddl - Schema Generation */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-blue-500 pl-4">
          hbm2ddl: From Entities to Database
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          The <code>hibernate.hbm2ddl.auto</code> property automates schema generation. But Hibernate Tools provides 
          a command-line <code>hbm2ddl</code> that outputs SQL scripts without connecting to a database.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md">
            <h3 className="font-bold text-lg">Configuration in hibernate.properties</h3>
            <pre className="mt-2 bg-gray-100 dark:bg-gray-900 p-3 rounded text-sm overflow-x-auto">
              {`hibernate.hbm2ddl.auto=update   // dev only
hibernate.hbm2ddl.auto=create   // drops & recreates
hibernate.hbm2ddl.auto=validate // checks schema
hibernate.hbm2ddl.auto=none     // no action`}
            </pre>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md">
            <h3 className="font-bold text-lg">Command-line hbm2ddl</h3>
            <pre className="mt-2 bg-gray-100 dark:bg-gray-900 p-3 rounded text-sm overflow-x-auto">
              {`java -cp hibernate-tools.jar;... \\
  org.hibernate.tool.hbm2ddl.SchemaExport \\
  --config=hibernate.cfg.xml --output=schemas.sql`}
            </pre>
          </div>
        </div>
        <JavaFileLoader
          fileModule={hbm2ddlProps}
          title="hibernate.properties (DDL settings)"
          highlightLines={[4, 5]}
        />
        <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-200 dark:border-amber-800">
          <p className="text-sm font-mono text-amber-800 dark:text-amber-300">
            🧠 <strong>Teacher insight:</strong> Never use "create" or "create-drop" in production. For versioned migrations, 
            use Flyway or Liquibase. The <code>validate</code> option is safe to catch mapping errors in production.
          </p>
        </div>
      </section>

      {/* 3. Reverse Engineering: DB to Entities */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:300ms] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-green-500 pl-4">
          Reverse Engineering with hbm2java
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Use <code>hbm2java</code> to generate annotated entity classes or Hibernate XML mappings from database tables. 
          A <code>hibernate.reveng.xml</code> file controls the process (include/exclude tables, custom type mappings).
        </p>
        <JavaFileLoader
          fileModule={hibernateRevengXml}
          title="hibernate.reveng.xml (Reverse Engineering Configuration)"
          highlightLines={[8, 12, 18]}
        />
        <div className="bg-purple-50 dark:bg-purple-950/40 p-5 rounded-xl border border-purple-200 dark:border-purple-800">
          <p className="text-sm italic text-purple-800 dark:text-purple-200">
            💡 Command: <code>hibernate-tools.jar org.hibernate.tool.hbm2java.Hbm2JavaTask</code> plus mapping config.
          </p>
        </div>
        <JavaFileLoader
          fileModule={reverseEngineeredHbm}
          title="Student.hbm.xml (Generated XML Mapping - Example)"
          highlightLines={[5, 9, 15]}
        />
      </section>

      {/* 4. Maven Integration (POM) */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-purple-500 pl-4">
          Using Hibernate Tools in Maven Builds
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          The <code>hibernate3-maven-plugin</code> (or modern <code>hibernate-tools-maven-plugin</code>) can run reverse 
          engineering as part of your Maven build, generating entities and mappings automatically.
        </p>
        <JavaFileLoader
          fileModule={mavenPluginPom}
          title="pom.xml (Maven Hibernate Tools Plugin Configuration)"
          highlightLines={[12, 20, 28]}
        />
        <div className="bg-yellow-50 dark:bg-yellow-950/30 p-5 rounded-xl border border-yellow-200 dark:border-yellow-800">
          <p className="text-sm font-mono text-yellow-800 dark:text-yellow-300">
            🔄 Pro tip: Run <code>mvn hibernate3:hbm2ddl</code> to generate schema SQL, or <code>mvn hibernate3:hbm2java</code> to generate entities.
          </p>
        </div>
      </section>

      {/* 5. SVG: Workflow of Forward & Reverse Engineering */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:500ms] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-teal-500 pl-4">
          📐 Forward vs Reverse Engineering
        </h2>
        <div className="bg-white dark:bg-gray-800/80 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500">
          <svg viewBox="0 0 900 320" className="w-full h-auto" aria-label="Engineering workflows">
            {/* Forward Engineering (top half) */}
            <text x="450" y="35" textAnchor="middle" className="text-lg font-bold fill-blue-800 dark:fill-blue-400">Forward Engineering (hbm2ddl)</text>
            <rect x="100" y="60" width="180" height="50" rx="8" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" />
            <text x="190" y="90" textAnchor="middle" className="text-sm font-semibold">Java Entities</text>
            <line x1="280" y1="85" x2="330" y2="85" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
            <rect x="340" y="60" width="180" height="50" rx="8" fill="#10b981" fillOpacity="0.15" stroke="#10b981" />
            <text x="430" y="90" textAnchor="middle" className="text-sm font-semibold">hbm2ddl</text>
            <line x1="520" y1="85" x2="570" y2="85" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
            <rect x="580" y="60" width="200" height="50" rx="8" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" />
            <text x="680" y="90" textAnchor="middle" className="text-sm font-semibold">SQL Schema (DDL)</text>

            {/* Separator */}
            <line x1="50" y1="145" x2="850" y2="145" stroke="#6b7280" strokeDasharray="6,4" />

            {/* Reverse Engineering (bottom half) */}
            <text x="450" y="180" textAnchor="middle" className="text-lg font-bold fill-green-800 dark:fill-green-400">Reverse Engineering (hbm2java)</text>
            <rect x="100" y="205" width="200" height="50" rx="8" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" />
            <text x="200" y="235" textAnchor="middle" className="text-sm font-semibold">Existing Database Schema</text>
            <line x1="300" y1="230" x2="350" y2="230" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
            <rect x="360" y="205" width="180" height="50" rx="8" fill="#10b981" fillOpacity="0.15" stroke="#10b981" />
            <text x="450" y="235" textAnchor="middle" className="text-sm font-semibold">hbm2java + reveng.xml</text>
            <line x1="540" y1="230" x2="590" y2="230" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
            <rect x="600" y="205" width="200" height="50" rx="8" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" />
            <text x="700" y="235" textAnchor="middle" className="text-sm font-semibold">Java Entities + Mappings</text>

            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
              </marker>
            </defs>
          </svg>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
            Hibernate Tools bridges the gap between Java objects and database schemas in both directions.
          </p>
        </div>
      </section>

      {/* 6. Common Pitfalls */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:600ms] opacity-0 [animation-fill-mode:forwards]">
        <div className="flex items-center gap-2 border-l-4 border-red-500 pl-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">⚠️ Common Pitfalls & Misconceptions</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            { title: "Overwriting production schema with hbm2ddl", desc: "Using 'create' or 'create-drop' on production wipes data.", fix: "Always set hbm2ddl.auto to 'validate' or 'none' in production. Use migration tools." },
            { title: "Reverse engineering generates poor entity names", desc: "Table names like 'STUDENT_MASTER' become StudentMaster by default, often not ideal.", fix: "Provide custom naming strategy or post-process generated code." },
            { title: "Forgetting to update reveng.xml when schema changes", desc: "New columns/tables won't appear in entities until reveng.xml is updated.", fix: "Run reverse engineering periodically or use annotation-based approach." },
            { title: "Mixing JPA annotations and XML mappings from tools", desc: "Generated XML mapping may conflict with annotations.", fix: "Pick one strategy: prefer annotations and use hbm2ddl only for schema generation." },
          ].map((pitfall, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800/70 rounded-xl p-5 border-l-4 border-red-400 shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="font-bold text-red-700 dark:text-red-300">{pitfall.title}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{pitfall.desc}</p>
              <p className="text-xs font-mono text-green-700 dark:text-green-400 mt-3">✅ {pitfall.fix}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Best Practices */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:700ms] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-emerald-500 pl-4">✅ Best Practices & Industry Habits</h2>
        <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-md">
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex gap-2"><span className="text-emerald-500 text-xl">✓</span> Use <strong>hbm2ddl.auto=validate</strong> in production to catch mismatches early without modifying schema.</li>
            <li className="flex gap-2"><span className="text-emerald-500 text-xl">✓</span> For reverse engineering, always keep a copy of <code>hibernate.reveng.xml</code> in version control.</li>
            <li className="flex gap-2"><span className="text-emerald-500 text-xl">✓</span> Generate entities into a separate Maven module and treat them as read-only; don't manually modify them.</li>
            <li className="flex gap-2"><span className="text-emerald-500 text-xl">✓</span> Use <strong>Eclipse Hibernate Tools</strong> or <strong>IntelliJ JPA Buddy</strong> to visually reverse engineer tables.</li>
          </ul>
          <hr className="my-4 border-gray-300 dark:border-gray-700" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mt-4">
            {["Version control reveng.xml", "Never use create in production", "Separate generated sources", "Use validate mode"].map((item, i) => (
              <div key={i} className="bg-emerald-50 dark:bg-emerald-950/50 p-2 rounded-md text-xs font-medium text-emerald-800 dark:text-emerald-200">
                📌 {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Hint Section */}
      <section className="space-y-4 animate-fade-slide-up [animation-delay:800ms] opacity-0 [animation-fill-mode:forwards] bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-800">
        <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-300 flex items-center gap-2">💭 Think & Experiment</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <p className="font-mono text-sm"><strong>Observe carefully:</strong> Set <code>hbm2ddl.auto=create-drop</code> and run your app. What happens to data after you restart the app?</p>
            <p className="text-xs text-gray-500 mt-2">🔍 All tables are dropped and recreated; data is lost.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <p className="font-mono text-sm"><strong>Try changing this:</strong> Use <code>hibernate.reveng.xml</code> to exclude certain tables (e.g., <code>&lt;exclude table="LOG*"/&gt;</code>).</p>
            <p className="text-xs text-gray-500 mt-2">🔄 This prevents temporary tables from becoming entities.</p>
          </div>
        </div>
      </section>

      {/* 9. Pro Tips */}
      <section className="space-y-4 animate-fade-slide-up [animation-delay:900ms] opacity-0 [animation-fill-mode:forwards]">
        <div className="flex items-center gap-2">
          <span className="text-3xl">💎</span>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Pro Tips & Classroom shortcuts</h2>
        </div>
        <div className="bg-cyan-50 dark:bg-cyan-950/40 rounded-xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex gap-3">
            <div className="text-cyan-600">🔁</div>
            <div><strong>Add custom type mappings:</strong> In reveng.xml, map database types to Java classes (e.g., TINYINT to Boolean).</div>
          </div>
          <div className="flex gap-3">
            <div className="text-cyan-600">⚡</div>
            <div><strong>Generate DAOs too:</strong> Hibernate Tools can create BaseDAO classes and JUnit tests.</div>
          </div>
          <div className="flex gap-3">
            <div className="text-cyan-600">🧩</div>
            <div><strong>Ant tasks:</strong> <code>&lt;hibernatetool&gt;</code> for scripted generation in legacy projects.</div>
          </div>
          <div className="flex gap-3">
            <div className="text-cyan-600">📌</div>
            <div><strong>IntelliJ shortcut:</strong> Use "Persistence" tool window → "Generate Persistence Mapping" → "By Database Schema".</div>
          </div>
        </div>
      </section>

      {/* 10. FAQ Component (30 questions) */}
      <div className="animate-fade-slide-up [animation-delay:1000ms] opacity-0 [animation-fill-mode:forwards]">
        <FAQTemplate title="Hibernate Tools & Reverse Engineering FAQs" questions={questions} />
      </div>

      {/* 11. Teacher's Note */}
      <div className="animate-fade-slide-up [animation-delay:1100ms] opacity-0 [animation-fill-mode:forwards]">
        <Teacher note={
          "🎓 Teacher's Note: Reverse engineering is a huge time-saver when working with legacy databases. Show students how to generate entities from the school's existing 'student_records' table. " +
          "Also, emphasize that hbm2ddl is not a migration tool – it's for development only. A fun lab: take any existing database (e.g., MySQL 'world' sample), reverse engineer it, and then use Hibernate to query the data."
        } />
      </div>

      <div className="text-center text-xs text-gray-400 pt-6">
        Topic 15 — Hibernate Tools (Reverse Engineering, hbm2ddl) | Industry-grade best practices
      </div>
    </div>
  );
};

export default Topic15;