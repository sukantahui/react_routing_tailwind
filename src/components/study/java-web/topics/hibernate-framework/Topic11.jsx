import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Import Java / properties file content using ?raw (Vite syntax)
import hibernatePropertiesExample from "./topic11_files/hibernate.properties?raw";
import hibernateUtilJava from "./topic11_files/HibernateUtil.java?raw";
import mainAppJava from "./topic11_files/MainApp.java?raw";

// Import FAQ questions (30 items, moderate to expert)
import questions from "./topic11_files/topic11_questions";

// Keyframes for fade + slide-up animation (scoped via <style>)
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

const Topic11 = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-12 dark:bg-gray-900 bg-gray-50 transition-colors duration-300">
      {/* Inject custom keyframes */}
      <style>{animationStyles}</style>

      {/* Header Section with fade-slide-up */}
      <div className="animate-fade-slide-up text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 dark:from-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">
          Hibernate Configuration Using Properties File
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Master the art of configuring Hibernate with <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">hibernate.properties</code> — 
          a lightweight, externalized alternative to XML. Learn how to build robust SessionFactory, control connection pooling, 
          and manage environment-specific settings.
        </p>
      </div>

      {/* 1. Conceptual explanation */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:100ms] opacity-0 [animation-fill-mode:forwards]">
        <div className="flex items-center gap-3 border-l-4 border-blue-500 pl-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Why Properties File?</h2>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            While <code>hibernate.cfg.xml</code> is the conventional approach, Hibernate natively supports a <strong className="font-medium">Java properties file</strong> 
            (<code>hibernate.properties</code>). This file maps directly to Hibernate configuration properties and is often preferred in:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
            <li><span className="font-mono text-sm">🔧 Microservices / cloud-native apps</span> where environment variables override properties.</li>
            <li><span className="font-mono text-sm">📦 Legacy migrations from native JDBC to Hibernate.</span></li>
            <li><span className="font-mono text-sm">⚙️ Quick prototypes & integration tests (no XML parsing overhead).</span></li>
          </ul>
          <div className="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-xl border-l-4 border-blue-400">
            <p className="text-sm italic text-blue-800 dark:text-blue-200">
              💡 <strong>Real-world scenario:</strong> Barrackpore High School's library management system uses a properties file 
              to switch between development (HSQLDB) and production (PostgreSQL) databases without touching compiled code.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Properties file anatomy w/ file loader simulation */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-blue-500 pl-4">
          hibernate.properties — Key-Value Blueprint
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-5">
            <h3 className="text-lg font-bold flex items-center gap-2">📄 File Overview</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Placed in classpath root, Hibernate auto-loads it.</p>
            <pre className="mt-3 bg-gray-100 dark:bg-gray-900 p-3 rounded text-sm overflow-x-auto font-mono">
              {`# Example hibernate.properties
hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
hibernate.connection.driver_class=org.postgresql.Driver
hibernate.connection.url=jdbc:postgresql://localhost:5432/school_db
hibernate.connection.username=swadeep
hibernate.connection.password=secure123
hibernate.show_sql=true
hibernate.format_sql=true
hibernate.hbm2ddl.auto=update`}
            </pre>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-5">
            <h3 className="text-lg font-bold flex items-center gap-2">🔑 Critical properties</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <li><span className="font-mono font-bold">hibernate.dialect</span> – SQL dialect (PostgreSQL, MySQL, Oracle)</li>
              <li><span className="font-mono font-bold">hibernate.connection.*</span> – JDBC credentials & URL</li>
              <li><span className="font-mono font-bold">hibernate.hbm2ddl.auto</span> – schema tool (validate | update | create)</li>
              <li><span className="font-mono font-bold">hibernate.current_session_context_class</span> – thread / JTA binding</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Java code: Building SessionFactory from properties */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:300ms] opacity-0 [animation-fill-mode:forwards]">
        <div className="flex items-center gap-3 border-l-4 border-green-500 pl-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Programmatic Configuration Example</h2>
        </div>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Use <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">new Configuration().addProperties(properties)</code> to merge 
          properties file values with hardcoded overrides. This approach gives you maximum flexibility.
        </p>
        <div className="space-y-6">
          <JavaFileLoader
            fileModule={hibernateUtilJava}
            title="HibernateUtil.java (SessionFactory singleton)"
            highlightLines={[12, 18, 24]}
          />
          <JavaFileLoader
            fileModule={mainAppJava}
            title="MainApp.java (Performing CRUD)"
            highlightLines={[8, 15]}
          />
        </div>
        <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-200 dark:border-amber-800">
          <p className="text-sm font-mono text-amber-800 dark:text-amber-300">
            🧠 <strong>Teacher insight:</strong> Properties defined in <code>hibernate.properties</code> can be overridden 
            programmatically – perfect for multi-tenant apps or feature flags. Use <code>System.getenv()</code> to inject secrets.
          </p>
        </div>
      </section>

      {/* 4. SVG Step-by-step Configuration Flow */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-purple-500 pl-4">
          📈 Visual Flow: From Properties → SessionFactory
        </h2>
        <div className="bg-white dark:bg-gray-800/80 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500">
          <svg viewBox="0 0 900 280" className="w-full h-auto" aria-label="Configuration steps">
            {/* Step 1: Properties File */}
            <rect x="20" y="80" width="170" height="100" rx="14" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="2" className="transition-all duration-300 hover:fill-blue-100 dark:hover:fill-blue-900/30" />
            <text x="105" y="125" textAnchor="middle" className="text-sm font-semibold fill-blue-800 dark:fill-blue-300">hibernate.properties</text>
            <text x="105" y="148" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">key=value pairs</text>
            <animate attributeName="opacity" values="0.7;1;0.7" dur="2.5s" repeatCount="indefinite" />

            {/* Arrow 1 */}
            <line x1="190" y1="130" x2="240" y2="130" stroke="#94a3b8" strokeWidth="3" markerEnd="url(#arrowhead)" />
            <text x="215" y="115" textAnchor="middle" className="text-xs fill-gray-500">load</text>

            {/* Step 2: Properties Object */}
            <rect x="250" y="80" width="160" height="100" rx="14" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="2" className="transition-all duration-300 hover:fill-green-100 dark:hover:fill-green-900/30" />
            <text x="330" y="125" textAnchor="middle" className="text-sm font-semibold fill-green-800 dark:fill-green-300">java.util.Properties</text>
            <text x="330" y="148" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">in-memory map</text>

            {/* Arrow 2 */}
            <line x1="410" y1="130" x2="460" y2="130" stroke="#94a3b8" strokeWidth="3" markerEnd="url(#arrowhead)" />
            <text x="435" y="115" textAnchor="middle" className="text-xs fill-gray-500">addProperties()</text>

            {/* Step 3: Configuration */}
            <rect x="470" y="80" width="170" height="100" rx="14" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2" className="transition-all duration-300 hover:fill-amber-100 dark:hover:fill-amber-900/30" />
            <text x="555" y="125" textAnchor="middle" className="text-sm font-semibold fill-amber-800 dark:fill-amber-300">Configuration</text>
            <text x="555" y="148" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">buildMappings()</text>

            {/* Arrow 3 */}
            <line x1="640" y1="130" x2="690" y2="130" stroke="#94a3b8" strokeWidth="3" markerEnd="url(#arrowhead)" />
            <text x="665" y="115" textAnchor="middle" className="text-xs fill-gray-500">buildSessionFactory()</text>

            {/* Step 4: SessionFactory */}
            <rect x="700" y="70" width="170" height="120" rx="14" fill="#ef4444" fillOpacity="0.15" stroke="#ef4444" strokeWidth="2" className="transition-all duration-300 hover:fill-red-100 dark:hover:fill-red-900/30" />
            <text x="785" y="115" textAnchor="middle" className="text-sm font-semibold fill-red-800 dark:fill-red-300">SessionFactory</text>
            <text x="785" y="138" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">connection pool</text>
            <text x="785" y="158" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">+ metadata cache</text>

            {/* Arrow markers */}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
              </marker>
            </defs>
          </svg>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
            Hover on any step → subtle highlight. The animations respect reduced motion preferences.
          </p>
        </div>
      </section>

      {/* 5. Common Pitfalls (Beginners' Mistakes + solutions) */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:500ms] opacity-0 [animation-fill-mode:forwards]">
        <div className="flex items-center gap-2 border-l-4 border-red-500 pl-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">⚠️ Common Pitfalls & Misconceptions</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            { title: "Properties not found in classpath", desc: "Place hibernate.properties under src/main/resources. Maven/Gradle projects ignore it if placed incorrectly.", fix: "Use getClass().getResourceAsStream() fallback." },
            { title: "Overriding with XML silently", desc: "If both hibernate.cfg.xml and .properties exist, XML takes precedence. Surprising behavior!", fix: "Always keep only one config style per environment." },
            { title: "Missing hibernate.dialect", desc: "Without dialect, Hibernate cannot generate optimized SQL => runtime errors.", fix: "Always set explicit dialect for production." },
            { title: "Exposing credentials in version control", desc: "Properties files often committed accidentally with real DB passwords.", fix: "Externalize via environment variables + placeholder substitution." },
          ].map((pitfall, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800/70 rounded-xl p-5 border-l-4 border-red-400 shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="font-bold text-red-700 dark:text-red-300">{pitfall.title}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{pitfall.desc}</p>
              <p className="text-xs font-mono text-green-700 dark:text-green-400 mt-3">✅ {pitfall.fix}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Best Practices + Mini Checklist */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:600ms] opacity-0 [animation-fill-mode:forwards]">
        <div className="flex flex-wrap justify-between items-center gap-3">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-emerald-500 pl-4">✅ Best Practices & Industry Habits</h2>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-md">
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex gap-2"><span className="text-emerald-500 text-xl">✓</span> Use <strong>Environment-specific property files</strong> (application-{`{env}`}.properties) and load conditionally.</li>
            <li className="flex gap-2"><span className="text-emerald-500 text-xl">✓</span> Enable <strong>connection pooling</strong> (HikariCP) via <code>hibernate.hikari.*</code> properties.</li>
            <li className="flex gap-2"><span className="text-emerald-500 text-xl">✓</span> Never put <code>hibernate.hbm2ddl.auto=create-drop</code> in production. Use <strong>Flyway/Liquibase</strong> for schema versioning.</li>
            <li className="flex gap-2"><span className="text-emerald-500 text-xl">✓</span> Wrap SessionFactory creation in a static holder → <strong>thread-safe singleton pattern</strong>.</li>
          </ul>
          <hr className="my-4 border-gray-300 dark:border-gray-700" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mt-4">
            {["Properties in classpath", "Dialect matching DB", "Show SQL only in dev", "SessionFactory closed on shutdown"].map((item, i) => (
              <div key={i} className="bg-emerald-50 dark:bg-emerald-950/50 p-2 rounded-md text-xs font-medium text-emerald-800 dark:text-emerald-200">
                📌 {item}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-950/40 p-5 rounded-xl italic">
          <p className="text-yellow-800 dark:text-yellow-200 text-sm">🎓 <strong> Mini Checklist – Before deploying to production:</strong> <br/> 
          ✔️ Remove connection password from plain properties? → Use env variables via <code>${"{DB_PASSWORD}"}</code> placeholder. <br/>
          ✔️ Disable show_sql / format_sql? → Set false.<br/>
          ✔️ Validate connection pool minimum idle configuration. </p>
        </div>
      </section>

      {/* 7. Hint Section (Think Boxes) */}
      <section className="space-y-4 animate-fade-slide-up [animation-delay:700ms] opacity-0 [animation-fill-mode:forwards] bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-800">
        <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-300 flex items-center gap-2">💭 Think & Experiment</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <p className="font-mono text-sm"><strong>Observe carefully:</strong> How does Hibernate merge properties from <code>hibernate.properties</code> and programmatic overrides?</p>
            <p className="text-xs text-gray-500 mt-2">🔍 Try changing order of adding properties — which one wins?</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <p className="font-mono text-sm"><strong>Try changing this:</strong> add <code>hibernate.connection.autocommit=false</code> and see transaction behavior.</p>
            <p className="text-xs text-gray-500 mt-2">🔄 Advanced: combine with JTA properties for distributed transactions.</p>
          </div>
        </div>
      </section>

      {/* 8. Tips & Tricks from Real projects */}
      <section className="space-y-4 animate-fade-slide-up [animation-delay:800ms] opacity-0 [animation-fill-mode:forwards]">
        <div className="flex items-center gap-2">
          <span className="text-3xl">💎</span>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Pro Tips & Classroom shortcuts</h2>
        </div>
        <div className="bg-cyan-50 dark:bg-cyan-950/40 rounded-xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex gap-3">
            <div className="text-cyan-600">🔁</div>
            <div><strong>Property expansion with system env:</strong> Use <code>hibernate.connection.password = ${"{DB_PWD}"}</code> and load with <code>Configuration().addProperties(System.getProperties())</code>.</div>
          </div>
          <div className="flex gap-3">
            <div className="text-cyan-600">⚡</div>
            <div><strong>Debugging startup:</strong> Set <code>hibernate.generate_statistics=true</code> to log session factory metrics.</div>
          </div>
          <div className="flex gap-3">
            <div className="text-cyan-600">🧩</div>
            <div><strong>Combo approach:</strong> Use XML for complex mapping, but properties file for JDBC settings.</div>
          </div>
          <div className="flex gap-3">
            <div className="text-cyan-600">📌</div>
            <div><strong>Naming convention:</strong> Prefix properties with <code>javax.persistence.</code> for JPA compatibility.</div>
          </div>
        </div>
      </section>

      {/* 9. FAQ Component (30 questions) */}
      <div className="animate-fade-slide-up [animation-delay:900ms] opacity-0 [animation-fill-mode:forwards]">
        <FAQTemplate title="Hibernate Properties File Deep Dive FAQs" questions={questions} />
      </div>

      {/* 10. Teacher's Note */}
      <div className="animate-fade-slide-up [animation-delay:1000ms] opacity-0 [animation-fill-mode:forwards]">
        <Teacher note={
          "🚀 Teacher's Note: Many professionals ignore the properties file route, thinking it’s legacy. But in modern Spring Boot, externalized configuration is king. " +
          "Show students how to combine Hibernate properties with Spring’s Environment abstraction. " +
          "Key takeaway: Properties give you ultimate control without XML verbosity. " +
          "Remember to demonstrate that multi-environment builds become trivial using Maven profiles that swap .properties files."
        } />
      </div>

      {/* final note: subtle spacing */}
      <div className="text-center text-xs text-gray-400 pt-6">
        Topic 11 — Hibernate Configuration Using Properties File | Industry-grade best practices
      </div>
    </div>
  );
};

export default Topic11;