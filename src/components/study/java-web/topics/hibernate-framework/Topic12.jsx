import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Import Java / properties file content using ?raw (Vite syntax)
import localTxJava from "./topic12_files/LocalTransactionExample.java?raw";
import jtaTxJava from "./topic12_files/JtaTransactionExample.java?raw";
import hibernateCfgXml from "./topic12_files/hibernate.cfg.xml?raw";

// Import FAQ questions (30 items, moderate to expert)
import questions from "./topic12_files/topic12_questions";

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

const Topic12 = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-12 dark:bg-gray-900 bg-gray-50 transition-colors duration-300">
      <style>{animationStyles}</style>

      {/* Header Section */}
      <div className="animate-fade-slide-up text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 dark:from-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">
          Transaction Management: Local & JTA
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Understand how Hibernate manages database transactions – from simple local JDBC transactions
          to full JTA (Java Transaction API) for distributed systems. Learn to ensure data integrity and
          consistency in your applications.
        </p>
      </div>

      {/* 1. Conceptual explanation */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:100ms] opacity-0 [animation-fill-mode:forwards]">
        <div className="flex items-center gap-3 border-l-4 border-blue-500 pl-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Why Transactions Matter</h2>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            A transaction groups multiple database operations into a single unit of work that follows <strong className="font-medium">ACID</strong> properties: 
            Atomicity, Consistency, Isolation, Durability. In Hibernate, transaction management can be handled locally (via JDBC) or 
            globally using JTA (Java Transaction API) when multiple resources (e.g., two databases, JMS) are involved.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 dark:bg-green-950/40 p-4 rounded-xl border-l-4 border-green-400">
              <p className="font-semibold text-green-800 dark:text-green-200">🏦 Local Transaction</p>
              <p className="text-sm">Single database, simple rollback/commit via <code>session.beginTransaction()</code>.</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/40 p-4 rounded-xl border-l-4 border-purple-400">
              <p className="font-semibold text-purple-800 dark:text-purple-200">🌐 JTA (Global Transaction)</p>
              <p className="text-sm">Multiple resources (DB, JMS), needs a transaction manager (Bitronix, Atomikos, or Java EE server).</p>
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-xl border-l-4 border-blue-400">
            <p className="text-sm italic text-blue-800 dark:text-blue-200">
              💡 <strong>Real-world scenario:</strong> In Barrackpore's school system, updating student records and sending a notification 
              to a message queue must happen atomically — that's where JTA becomes essential.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Local Transaction Example */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-blue-500 pl-4">
          Local Transaction (JDBC-based)
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Hibernate's <code>Transaction</code> interface wraps JDBC commits/rollbacks. This is the most common approach in standalone or web apps.
        </p>
        <JavaFileLoader
          fileModule={localTxJava}
          title="LocalTransactionExample.java"
          highlightLines={[10, 15, 22]}
        />
        <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-200 dark:border-amber-800">
          <p className="text-sm font-mono text-amber-800 dark:text-amber-300">
            🧠 <strong>Teacher insight:</strong> Always wrap your data modification operations in a try-catch block and rollback on exception.
            Never swallow exceptions without rolling back – that leaves the session in an inconsistent state.
          </p>
        </div>
      </section>

      {/* 3. JTA Transaction Example (conceptual) */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:300ms] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-purple-500 pl-4">
          JTA (Global Transaction) with Hibernate
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          To use JTA, you need a JTA provider (e.g., Bitronix, Narayana, or WildFly's built-in transaction manager). 
          Hibernate will then <strong>join</strong> the ongoing JTA transaction instead of managing its own JDBC transaction.
        </p>
        <div className="space-y-4">
          <JavaFileLoader
            fileModule={jtaTxJava}
            title="JtaTransactionExample.java"
            highlightLines={[8, 14, 25]}
          />
          <div className="bg-gray-100 dark:bg-gray-800/60 p-4 rounded-xl">
            <h4 className="font-mono font-bold text-sm">Required hibernate.cfg.xml snippet for JTA:</h4>
            <pre className="mt-2 text-xs overflow-x-auto">
              {`<property name="hibernate.transaction.coordinator_class">jta</property>
<property name="hibernate.transaction.jta.platform">BitronixJtaPlatform</property>
<property name="hibernate.current_session_context_class">jta</property>`}
            </pre>
          </div>
        </div>
        <div className="bg-red-50 dark:bg-red-950/50 p-4 rounded-xl border border-red-300 dark:border-red-800">
          <p className="text-sm font-medium text-red-800 dark:text-red-200">
            ⚠️ Critical: With JTA, do not call <code>session.beginTransaction()</code>. Instead, rely on the container/transaction manager 
            to begin and commit the transaction. Use <code>session.getTransaction()</code> only for status checks.
          </p>
        </div>
      </section>

      {/* 4. SVG: Transaction Flow (Local vs JTA) */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-teal-500 pl-4">
          🔄 Visualizing Transaction Boundaries
        </h2>
        <div className="bg-white dark:bg-gray-800/80 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500">
          <svg viewBox="0 0 900 400" className="w-full h-auto" aria-label="Transaction comparison">
            <text x="450" y="30" textAnchor="middle" className="text-lg font-bold fill-gray-800 dark:fill-gray-200">Local Transaction (JDBC)</text>
            {/* Steps for local */}
            <rect x="50" y="60" width="180" height="50" rx="8" fill="#10b981" fillOpacity="0.2" stroke="#10b981" />
            <text x="140" y="90" textAnchor="middle" className="text-sm font-medium fill-green-800 dark:fill-green-300">beginTransaction()</text>
            <line x1="230" y1="85" x2="280" y2="85" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
            <rect x="290" y="60" width="180" height="50" rx="8" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" />
            <text x="380" y="90" textAnchor="middle" className="text-sm font-medium fill-amber-800 dark:fill-amber-300">persist/update/delete</text>
            <line x1="470" y1="85" x2="520" y2="85" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
            <rect x="530" y="60" width="180" height="50" rx="8" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" />
            <text x="620" y="90" textAnchor="middle" className="text-sm font-medium fill-red-800 dark:fill-red-300">commit() OR rollback()</text>

            {/* Separator */}
            <line x1="50" y1="150" x2="850" y2="150" stroke="#6b7280" strokeDasharray="6,4" strokeWidth="1.5" />
            <text x="450" y="180" textAnchor="middle" className="text-lg font-bold fill-gray-800 dark:fill-gray-200">JTA Global Transaction (Multiple Resources)</text>

            {/* JTA steps */}
            <rect x="50" y="210" width="200" height="50" rx="8" fill="#8b5cf6" fillOpacity="0.2" stroke="#8b5cf6" />
            <text x="150" y="240" textAnchor="middle" className="text-sm font-medium fill-purple-800 dark:fill-purple-300">UserTransaction.begin()</text>
            <line x1="250" y1="235" x2="300" y2="235" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
            <rect x="310" y="200" width="150" height="70" rx="8" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" />
            <text x="385" y="225" textAnchor="middle" className="text-sm font-medium fill-blue-800 dark:fill-blue-300">Hibernate Session</text>
            <text x="385" y="245" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">(enlisted via XAResource)</text>
            <line x1="460" y1="235" x2="510" y2="235" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
            <rect x="520" y="200" width="150" height="70" rx="8" fill="#10b981" fillOpacity="0.2" stroke="#10b981" />
            <text x="595" y="225" textAnchor="middle" className="text-sm font-medium fill-green-800 dark:fill-green-300">JMS Queue</text>
            <text x="595" y="245" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">(also enlisted)</text>
            <line x1="670" y1="235" x2="720" y2="235" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
            <rect x="730" y="210" width="150" height="50" rx="8" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" />
            <text x="805" y="240" textAnchor="middle" className="text-sm font-medium fill-red-800 dark:fill-red-300">commit() / rollback()</text>

            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
              </marker>
            </defs>
          </svg>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
            Hover on any step → subtle highlight. The diagrams show the key difference: JTA coordinates multiple resources.
          </p>
        </div>
      </section>

      {/* 5. Common Pitfalls */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:500ms] opacity-0 [animation-fill-mode:forwards]">
        <div className="flex items-center gap-2 border-l-4 border-red-500 pl-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">⚠️ Common Pitfalls & Misconceptions</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            { title: "Calling commit() on a rolled back transaction", desc: "Attempting to commit after a rollback throws IllegalStateException.", fix: "Always check transaction status: tx.isActive() before commit." },
            { title: "Forgetting to rollback on exception", desc: "If an exception occurs but you don't rollback, partial changes remain committed later.", fix: "In catch block, call tx.rollback() and rethrow or log." },
            { title: "Mixing local and JTA transaction APIs", desc: "Using session.beginTransaction() inside a JTA transaction leads to nested problems.", fix: "Decide which style your app uses and stick to it. For JTA, never call beginTransaction()." },
            { title: "Not closing sessions after transaction", desc: "Leaving sessions open causes connection leaks and eventual exhaustion.", fix: "Always close session in finally block (or use try-with-resources pattern)." },
          ].map((pitfall, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800/70 rounded-xl p-5 border-l-4 border-red-400 shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="font-bold text-red-700 dark:text-red-300">{pitfall.title}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{pitfall.desc}</p>
              <p className="text-xs font-mono text-green-700 dark:text-green-400 mt-3">✅ {pitfall.fix}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Best Practices */}
      <section className="space-y-5 animate-fade-slide-up [animation-delay:600ms] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-emerald-500 pl-4">✅ Best Practices & Industry Habits</h2>
        <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-md">
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex gap-2"><span className="text-emerald-500 text-xl">✓</span> Keep transaction boundaries short – do not perform long I/O or network calls inside a transaction.</li>
            <li className="flex gap-2"><span className="text-emerald-500 text-xl">✓</span> Use <strong>@Transactional</strong> annotation when using Spring – it handles session and transaction lifecycle automatically.</li>
            <li className="flex gap-2"><span className="text-emerald-500 text-xl">✓</span> For JTA, always rely on container or framework (Spring, Java EE) to manage transactions declaratively.</li>
            <li className="flex gap-2"><span className="text-emerald-500 text-xl">✓</span> Set proper isolation levels (e.g., READ_COMMITTED) to avoid dirty reads and phantom reads.</li>
          </ul>
          <hr className="my-4 border-gray-300 dark:border-gray-700" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mt-4">
            {["Always rollback on exception", "Use try-catch-finally", "Never call beginTransaction() in JTA", "Check tx.isActive() before commit"].map((item, i) => (
              <div key={i} className="bg-emerald-50 dark:bg-emerald-950/50 p-2 rounded-md text-xs font-medium text-emerald-800 dark:text-emerald-200">
                📌 {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Hint Section */}
      <section className="space-y-4 animate-fade-slide-up [animation-delay:700ms] opacity-0 [animation-fill-mode:forwards] bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-800">
        <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-300 flex items-center gap-2">💭 Think & Experiment</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <p className="font-mono text-sm"><strong>Observe carefully:</strong> What happens if you call <code>session.flush()</code> before a rollback? Are changes still visible to other transactions?</p>
            <p className="text-xs text-gray-500 mt-2">🔍 Try it: flush before rollback – the data is sent to DB but then rolled back.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <p className="font-mono text-sm"><strong>Try changing this:</strong> Set <code>hibernate.connection.autocommit=true</code> and observe transaction boundaries.</p>
            <p className="text-xs text-gray-500 mt-2">🔄 Advanced: combine with JTA and XA to see two-phase commit in logs.</p>
          </div>
        </div>
      </section>

      {/* 8. Pro Tips */}
      <section className="space-y-4 animate-fade-slide-up [animation-delay:800ms] opacity-0 [animation-fill-mode:forwards]">
        <div className="flex items-center gap-2">
          <span className="text-3xl">💎</span>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Pro Tips & Classroom shortcuts</h2>
        </div>
        <div className="bg-cyan-50 dark:bg-cyan-950/40 rounded-xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex gap-3">
            <div className="text-cyan-600">🔁</div>
            <div><strong>Debug transaction boundaries:</strong> Enable <code>hibernate.show_sql</code> + logging for <code>org.hibernate.transaction</code> to see begin/commit logs.</div>
          </div>
          <div className="flex gap-3">
            <div className="text-cyan-600">⚡</div>
            <div><strong>Rollback-only marker:</strong> In Spring, <code>@Transactional(rollbackFor=Exception.class)</code> ensures any exception triggers rollback.</div>
          </div>
          <div className="flex gap-3">
            <div className="text-cyan-600">🧩</div>
            <div><strong>Savepoint usage:</strong> Hibernate supports JDBC 3.0 savepoints – use <code>session.getTransaction().setSavepoint()</code> for nested transactions.</div>
          </div>
          <div className="flex gap-3">
            <div className="text-cyan-600">📌</div>
            <div><strong>JTA without container:</strong> Use Bitronix or Atomikos in standalone apps – they implement XAResource for Hibernate.</div>
          </div>
        </div>
      </section>

      {/* 9. FAQ Component (30 questions) */}
      <div className="animate-fade-slide-up [animation-delay:900ms] opacity-0 [animation-fill-mode:forwards]">
        <FAQTemplate title="Transaction Management FAQs" questions={questions} />
      </div>

      {/* 10. Teacher's Note */}
      <div className="animate-fade-slide-up [animation-delay:1000ms] opacity-0 [animation-fill-mode:forwards]">
        <Teacher note={
          "🎓 Teacher's Note: Transaction management is the heart of data consistency. Many students forget that a Hibernate session does not auto-commit after every operation. Emphasize the try-catch-finally pattern. For JTA, show them how to configure a transaction manager (Bitronix is great for demos). Real-world tip: In microservices, distributed transactions are often avoided in favor of sagas – but Hibernate + JTA remains crucial for legacy monoliths."
        } />
      </div>

      <div className="text-center text-xs text-gray-400 pt-6">
        Topic 12 — Transaction Management (Local & JTA) | Industry-grade best practices
      </div>
    </div>
  );
};

export default Topic12;