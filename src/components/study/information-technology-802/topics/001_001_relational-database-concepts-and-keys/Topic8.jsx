import React, { useState } from 'react';
import { 
  Terminal, ShieldCheck, AlertTriangle, CheckCircle2, 
  Layers, BookOpen, Code, HelpCircle, FileText, ArrowRight, Play, Sparkles 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

const MysqlCliTerminalSimulator = () => {
  const [activeCmd, setActiveCmd] = useState('databases');

  const cliOutputs = {
    databases: {
      cmd: "SHOW DATABASES;",
      desc: "Lists all databases available on the MySQL server instance.",
      output: `+--------------------+
| Database           |
+--------------------+
| information_schema |
| CoderAccoTaxOrg    |
| SchoolManagementDB |
| mysql              |
| sys                |
+--------------------+
5 rows in set (0.01 sec)`
    },
    use: {
      cmd: "USE SchoolManagementDB;",
      desc: "Sets the active working schema for subsequent table operations.",
      output: `Database changed
mysql> SELECT DATABASE();
+--------------------+
| DATABASE()         |
+--------------------+
| SchoolManagementDB |
+--------------------+
1 row in set (0.00 sec)`
    },
    tables: {
      cmd: "SHOW TABLES;",
      desc: "Lists all relations (tables) residing in the active database.",
      output: `+--------------------------------+
| Tables_in_SchoolManagementDB   |
+--------------------------------+
| AcademicMarks                  |
| FeesLedger                     |
| PARENTS                        |
| STUDENT                        |
| StudentMaster                  |
+--------------------------------+
5 rows in set (0.00 sec)`
    },
    describe: {
      cmd: "DESCRIBE STUDENT;",
      desc: "Inspects structural schema: columns, data types, NULLability, keys, defaults.",
      output: `+-------------+-------------+------+-----+---------+-------+
| Field       | Type        | Null | Key | Default | Extra |
+-------------+-------------+------+-----+---------+-------+
| StudentID   | varchar(10) | NO   | PRI | NULL    |       |
| StudentName | varchar(60) | NO   |     | NULL    |       |
| Class       | varchar(5)  | NO   |     | NULL    |       |
| Section     | char(1)     | NO   |     | NULL    |       |
| RollNumber  | int         | NO   |     | NULL    |       |
| ParentID    | varchar(10) | YES  | MUL | NULL    |       |
+-------------+-------------+------+-----+---------+-------+
6 rows in set (0.01 sec)`
    },
    session: {
      cmd: "SELECT CURRENT_USER(), DATABASE(), VERSION();",
      desc: "Queries active connection session diagnostics and server engine release.",
      output: `+----------------+--------------------+-----------+
| CURRENT_USER() | DATABASE()         | VERSION() |
+----------------+--------------------+-----------+
| root@localhost | SchoolManagementDB | 8.0.36    |
+----------------+--------------------+-----------+
1 row in set (0.00 sec)`
    }
  };

  const curr = cliOutputs[activeCmd];

  return (
    <div className="w-full bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden font-mono">
      {/* Terminal Title Bar */}
      <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-xs text-slate-400 font-bold ml-2">MySQL 8.0 Command Line Client (Barrackpore Lab)</span>
        </div>
        <span className="text-[11px] text-sky-400 font-sans font-semibold">Interactive CLI Simulator</span>
      </div>

      {/* Command Selector Buttons */}
      <div className="p-3 bg-slate-900/60 border-b border-slate-800 flex flex-wrap gap-2 font-sans">
        {[
          { id: 'databases', label: '1. SHOW DATABASES;' },
          { id: 'use', label: '2. USE dbname;' },
          { id: 'tables', label: '3. SHOW TABLES;' },
          { id: 'describe', label: '4. DESCRIBE table;' },
          { id: 'session', label: '5. Session Diagnostics' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveCmd(item.id)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeCmd === item.id
                ? 'bg-sky-500 text-white shadow'
                : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Terminal Screen */}
      <div className="p-4 sm:p-6 space-y-3 text-xs sm:text-sm text-slate-300">
        <div className="text-slate-400 font-sans text-xs">
          <strong>Command Purpose:</strong> {curr.desc}
        </div>
        <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
          <span>mysql&gt;</span>
          <span className="text-white">{curr.cmd}</span>
        </div>
        <pre className="text-emerald-400 leading-relaxed overflow-x-auto bg-slate-950/90 p-4 rounded-xl border border-slate-800/80">
          {curr.output}
        </pre>
      </div>
    </div>
  );
};

export default function Topic8() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 001 · Topic 8
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                MySQL Practical Navigation
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              SQL Statement Termination (;) &amp; MySQL Client Navigation (USE, SHOW, DESCRIBE)
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master essential MySQL Command Line client navigation commands, statement delimiters, continuation prompts, and schema inspection commands.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'overview', label: '1. Navigation Commands', icon: BookOpen },
            { id: 'terminal', label: '2. Terminal Simulator', icon: Terminal },
            { id: 'code', label: '3. SQL Navigation Script', icon: Code },
            { id: 'describe', label: '4. DESCRIBE Anatomy', icon: Sparkles },
            { id: 'pitfalls', label: '5. Board Pitfalls & Tips', icon: AlertTriangle },
            { id: 'faqs', label: '6. FAQs & Practice (25 Qs)', icon: HelpCircle },
            { id: 'notes', label: '7. Printable Document', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 border-b-2 border-sky-400'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/40'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-bold text-sky-400 font-mono">1. SHOW DATABASES;</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Lists all database schemas available on the server instance.
                </p>
              </div>

              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-bold text-emerald-400 font-mono">2. USE dbname;</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Sets the specified database as the active default schema context.
                </p>
              </div>

              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-bold text-amber-400 font-mono">3. SHOW TABLES;</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Lists all tables and views present in the currently selected database.
                </p>
              </div>

              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-bold text-purple-400 font-mono">4. DESCRIBE table;</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Displays the column definitions, types, NULLability, and keys of a table.
                </p>
              </div>

            </div>

            <Teacher note="In the CBSE IT (802) practical exam: Always end every command with a semicolon (;). If you get 'No database selected', execute 'USE dbname;' first! — Sukanta Hui" />
          </div>
        )}

        {/* TAB 2: TERMINAL */}
        {activeTab === 'terminal' && (
          <div className="space-y-6">
            <MysqlCliTerminalSimulator />
          </div>
        )}

        {/* TAB 3: CODE DEMO */}
        {activeTab === 'code' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">Complete MySQL Navigation Script</h3>
                <span className="text-xs text-slate-400 font-mono">09_mysql_client_navigation.sql</span>
              </div>
              <pre className="bg-slate-950 p-4 rounded-xl text-slate-200 font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800 leading-relaxed">
                <code>{`SHOW DATABASES;
USE SchoolManagementDB;
SHOW TABLES;
DESCRIBE STUDENT;
SELECT CURRENT_USER(), DATABASE(), VERSION();`}</code>
              </pre>
            </div>
          </div>
        )}

        {/* TAB 4: DESCRIBE ANATOMY */}
        {activeTab === 'describe' && (
          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Anatomy of the DESCRIBE Output Table</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="font-bold text-sky-400">Field & Type</span>
                <p className="text-slate-300">Name of attribute and its SQL data type (e.g. VARCHAR(60), DECIMAL(5,2)).</p>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="font-bold text-emerald-400">Null & Key</span>
                <p className="text-slate-300">Null: YES/NO. Key: PRI (Primary Key), UNI (Unique), MUL (Foreign Key).</p>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="font-bold text-amber-400">Default & Extra</span>
                <p className="text-slate-300">Default initial value and special options like auto_increment.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PITFALLS & TIPS */}
        {activeTab === 'pitfalls' && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
              <AlertTriangle size={18} />
              Board Exam Traps: MySQL Navigation
            </h3>
            <div className="space-y-2 text-xs sm:text-sm text-slate-300">
              <p>• <strong>Plural vs Singular:</strong> It is <code className="text-sky-300">SHOW DATABASES;</code> (plural) and <code className="text-sky-300">SHOW TABLES;</code> (plural), but <code className="text-sky-300">DESCRIBE table_name;</code> (singular).</p>
              <p>• <strong>The Semicolon:</strong> Omitting the semicolon results in the continuation prompt (<code className="text-amber-300 font-mono">-&gt;</code>). Type <code className="text-sky-300">;</code> and press ENTER to finish.</p>
            </div>
          </div>
        )}

        {/* TAB 6: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate
              title="Topic 8 · MySQL Client Navigation FAQs & Board Questions"
              questions={questions}
            />
          </div>
        )}

        {/* TAB 7: PRINTABLE NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint
              content={noteText}
              filename="topic8_mysql_navigation_note.txt"
              title="CBSE Class XII IT 802 – Topic 8 Printable Quick Revision Note"
              hidePreview={false}
              showDownload={true}
            />
          </div>
        )}

      </div>
    </div>
  );
}
