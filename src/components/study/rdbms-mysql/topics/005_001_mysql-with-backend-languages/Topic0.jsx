import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

/**
 * Topic0 – Overview of Application-to-Database Communication Protocols
 * Module: 005_001_mysql-with-backend-languages
 *
 * @component
 * @returns {JSX.Element} Interactive educational workbench for Overview of Application-to-Database Communication Protocols.
 */
const Topic0 = () => {
  const [selectedConceptKey, setSelectedConceptKey] = useState("concept1");

  const conceptsData = {
    concept1: {
      conceptName: "1. Wire Protocol",
      title: "1. The MySQL Client/Server Binary Wire Protocol",
      badge: "Wire Protocol",
      badgeColor: "emerald",
      sqlSnippet: `-- 🌐 MYSQL CLIENT-SERVER PROTOCOL LIFECYCLE:
-- 1. TCP 3-Way Handshake (SYN &rarr; SYN-ACK &rarr; ACK) [Port 3306]
-- 2. Initial Handshake Packet from Server (Server version, auth plugin, capabilities)
-- 3. Handshake Response Packet from Client (Username, encrypted password, database)
-- 4. AuthSwitch / Authentication Confirmation (OK Packet / ERR Packet)
-- 5. Command Phase (COM_QUERY, COM_STMT_PREPARE, COM_STMT_EXECUTE)
-- 6. Resultset Streaming (Column metadata + binary/text row packets)
-- 7. Connection Termination (COM_QUIT)`,
      explanation: "Communication between backend language drivers and MySQL Server occurs over a binary wire protocol framing commands into 4-byte header packets.",
      keyTakeaways: ["Every query execution involves network round-trips over Port 3306.","Handshake negotiation involves TLS certificates and authentication plugins.","Text protocol returns string values; Binary protocol (prepared statements) returns typed binary fields."]
    },
    concept2: {
      conceptName: "2. Unix vs TCP",
      title: "2. Unix Domain Sockets vs TCP/IP Sockets",
      badge: "Socket Types",
      badgeColor: "cyan",
      sqlSnippet: `-- ⚡ PERFORMANCE COMPARISON: UNIX SOCKETS VS TCP/IP:
-- Local Backend (Node/Python on same host as MySQL):
-- Unix Socket: /var/run/mysqld/mysqld.sock (Bypasses TCP stack, 30% lower latency!)

-- Distributed Microservices (Backend in Kubernetes/Docker, MySQL on RDS/VM):
-- TCP/IP Socket: host: 10.0.1.50, port: 3306 (Requires network routing & TLS encryption)`,
      explanation: "Unix domain sockets provide high-throughput IPC on local hosts, while TCP/IP enables distributed cloud microservice communication.",
      keyTakeaways: ["Use Unix sockets when the application and MySQL reside on the same physical host.","TCP/IP is required for multi-tier microservices and cloud databases.","Always enable TCP keep-alive to detect dead connections in cloud networks."]
    },
    concept3: {
      conceptName: "3. TLS Overhead",
      title: "3. Network Latency & TLS/SSL Handshake Overhead",
      badge: "TLS Encryption",
      badgeColor: "purple",
      sqlSnippet: `-- 🔒 TLS/SSL ENCRYPTION OVERHEAD:
-- Standard TCP Handshake: ~1 RTT (~1ms local / 30ms WAN)
-- TLS 1.3 Handshake: +1 RTT + RSA/ECDHE asymmetric cryptography compute!
-- 💥 Problem: Opening a new TLS connection for every HTTP request adds 40ms latency!
-- ✅ Solution: Connection Pooling keeps encrypted TLS pipes pre-authenticated!`,
      explanation: "TLS encryption adds cryptographic overhead and round-trips during connection setup, making connection reuse essential.",
      keyTakeaways: ["TLS handshake is CPU-intensive during asymmetric key exchange.","Pre-established connection pools eliminate per-request TLS handshake penalties.","Enforce TLS 1.3 for lowest latency and modern security compliance."]
    },
    concept4: {
      conceptName: "4. Driver Ecosystem",
      title: "4. Universal Driver Architecture Across Stacks",
      badge: "Driver Landscape",
      badgeColor: "rose",
      sqlSnippet: `-- 🔌 POLYGLOT MYSQL DRIVER ECOSYSTEM:
-- Node.js:  mysql2 (Pure JS / C++ bindings, Promise-based, Prepared statement caching)
-- Python:   PyMySQL (Pure Python) & mysqlclient (C-extension wrappers, ultra-fast)
-- Java:     MySQL Connector/J (Official JDBC Type 4 pure Java driver)
-- Go:       go-sql-driver/mysql (Lightweight, concurrency-safe native driver)`,
      explanation: "Modern language drivers implement client-side connection multiplexing, statement parsing, and binary resultset decoding.",
      keyTakeaways: ["Choose C-extension or optimized binary drivers for CPU-bound high-throughput services.","Use promise-based async drivers in event-driven environments like Node.js.","Configure connect timeouts (e.g. 3000ms) to fail fast during network partitions."]
    }
  };

  const currentConcept = conceptsData[selectedConceptKey] || conceptsData["concept1"];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 005.1: Backend Integration
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 0 of 12
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Overview of Application-to-Database Communication Protocols
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Understanding MySQL client-server wire protocol, TCP sockets, TLS encryption, packet lifecycles, and connection establishment costs.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Architectural Pillars ───────────────────────── */}
        <section id="pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Four Architectural Pillars
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Core foundations of application-to-database communication, performance, and security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">Wire Packets</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Binary packet framing across command and resultset streaming phases.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Socket Layer</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Unix IPC sockets for local speed vs TCP/IP for distributed cloud services.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-white text-base">TLS Security</h3>
              <p className="text-xs text-slate-300 leading-relaxed">End-to-end wire encryption with pre-authenticated connection pipelines.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-white text-base">Polyglot Drivers</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Optimized native drivers across Node.js, Python, Java, and Go stacks.</p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Concept Workbench ───────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Engineering Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Explore production code snippets, connection pool parameters, and optimization patterns.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(conceptsData).map((key) => {
              const concept = conceptsData[key];
              const isSelected = selectedConceptKey === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedConceptKey(key)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                >
                  {concept.conceptName}
                </button>
              );
            })}
          </div>

          {/* Dynamic Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  Backend Pattern
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentConcept.title}
                </h3>
              </div>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-semibold border w-fit",
                  currentConcept.badgeColor === "emerald" && "bg-emerald-950/80 text-emerald-300 border-emerald-700",
                  currentConcept.badgeColor === "cyan" && "bg-cyan-950/80 text-cyan-300 border-cyan-700",
                  currentConcept.badgeColor === "purple" && "bg-purple-950/80 text-purple-300 border-purple-700",
                  currentConcept.badgeColor === "rose" && "bg-rose-950/80 text-rose-300 border-rose-700"
                )}
              >
                {currentConcept.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentConcept.explanation}
            </p>

            {/* Code Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Production Code / SQL Snippet:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {currentConcept.sqlSnippet}
              </pre>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Key Architectural Takeaways:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                {currentConcept.keyTakeaways.map((item, i) => (
                  <li key={i} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/60 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: Real-World Case Studies ─────────────────────── */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-purple-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Real-World Engineering Scenarios in Bengal
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Practical backend integration case studies in Barrackpore, Kolkata, Ichapur, and Jadavpur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Susmita & Mamata – Unix Socket Optimization in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Node.js Socket
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, Susmita deployed a Node.js order API on the same VPS hosting MySQL. By switching the connection string from 127.0.0.1:3306 to the local /var/run/mysqld/mysqld.sock Unix domain socket, API throughput increased by 28% while slashing CPU context switches.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 2: Debangshu & Abhronila – TLS 1.3 Latency Reduction in Kolkata Cloud
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Fintech TLS
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, Debangshu's microservices communicated with AWS RDS MySQL over public subnets, adding 45ms per request due to repeated TLS handshakes. Implementing a centralized connection pool and migrating to VPC peering with TLS 1.3 cut API latency to under 3ms.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: Senior Pitfalls & Best Practices ────────────── */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Senior Pitfalls &amp; Production Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Essential backend guardrails, anti-patterns to avoid, and enterprise coding standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Opening Connections Inside HTTP Handlers
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Calling mysql.createConnection() inside Express or Flask route handlers adds 30ms latency to every web request.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Create a shared connection pool once during application startup.
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Ignoring Network Timeouts
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Leaving connection timeouts at default infinite values causes backend worker threads to freeze indefinitely during network drops.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always set explicit connectTimeout and socketTimeout parameters.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Enforce TLS for Remote Connections
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Require <code>ssl: &#123; rejectUnauthorized: true &#125;</code> with verified CA root certificates for all cloud database traffic.
              </p>
              <div className="text-xs text-slate-400">
                Protects sensitive credentials and application data from packet sniffing.
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Enable TCP Keep-Alive
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Configure keep-alive probes to detect silent firewall connection drops before queries hang.
              </p>
              <div className="text-xs text-slate-400">
                Maintains healthy socket connections across cloud NAT gateways.
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: Printable Note & Teacher Advice ──────────────── */}
        <section id="printable-note" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Printable Study Note &amp; Teacher Advice
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download complete printable notes and review key takeaways from Sir Sukanta Hui.
            </p>
          </div>

          <PlainTextPrint
            title="Topic 0: Overview of Application-to-Database Communication Protocols"
            content={noteText}
          />

          <Teacher
            note="Understanding how your application speaks to MySQL over the network is fundamental! Remember that creating a new TCP connection involves handshakes, TLS negotiation, and authentication that can take 30ms to 80ms. Always understand the wire protocol and leverage connection reuse!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances, driver parameters, and interview questions for this topic.
            </p>
          </div>

          <FAQTemplate
            title="Overview of Application-to-Database Communication Protocols FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic0;
