import React, { useState } from 'react';
import { 
  FileText, Layout, Code, CheckCircle, Rocket, 
  CheckCircle2, XCircle, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, Layers, ArrowRight, Zap, RefreshCw, Users, ShieldCheck, Database 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

const LifecycleStagesExplorer = () => {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      num: "Stage 1",
      title: "Requirement Definition / Analysis Phase",
      subtitle: "Determining 'WHAT' the system must do",
      icon: FileText,
      color: "text-sky-400",
      border: "border-sky-500/40",
      bg: "bg-sky-500/10",
      badge: "Discovery & Scope",
      description: "In this foundational stage, business analysts and systems engineers interact with clients, users, and domain experts to compile detailed functional requirements, operational constraints, and project boundaries.",
      activities: [
        "Conducting stakeholder interviews & user questionnaires",
        "Performing Technical, Economic & Operational Feasibility Studies",
        "Defining system scope and avoiding early 'Scope Creep'",
        "Compiling the formal Software Requirements Specification (SRS) document"
      ],
      roles: "Business Analysts, System Architects, Client Representatives",
      deliverable: "Software Requirements Specification (SRS) Document"
    },
    {
      num: "Stage 2",
      title: "Design Phase",
      subtitle: "Architecting 'HOW' the system will look & operate",
      icon: Layout,
      color: "text-purple-400",
      border: "border-purple-500/40",
      bg: "bg-purple-500/10",
      badge: "Architectural Blueprints",
      description: "The design team transforms the signed SRS into visual and technical blueprints before writing a single line of code. This ensures optimal system architecture and intuitive user experience.",
      activities: [
        "Designing UI/UX wireframes, page mockups, and navigation trees",
        "Entity-Relationship (ER) database modeling & SQL table normalization",
        "Defining 3-Tier Client-Server Architecture (Presentation, Business, Data)",
        "Constructing Data Flow Diagrams (DFDs) & Process Flowcharts"
      ],
      roles: "UI/UX Designers, Database Architects, Solution Architects",
      deliverable: "Design Document Specification (DDS), ER Schemas, UI Wireframes"
    },
    {
      num: "Stage 3",
      title: "Implementation / Coding Phase",
      subtitle: "Translating blueprints into working executable software",
      icon: Code,
      color: "text-emerald-400",
      border: "border-emerald-500/40",
      bg: "bg-emerald-500/10",
      badge: "Software Construction",
      description: "Software engineers write the actual source code based strictly on the design specifications, integrating front-end interfaces, back-end business logic, and database persistence layers.",
      activities: [
        "Writing front-end HTML5, CSS3, JavaScript, and React components",
        "Developing back-end Java Servlets, Spring Boot, or Node.js APIs",
        "Writing JDBC connectors, MySQL queries, and PreparedStatements",
        "Adhering to clean coding standards, indentation, and Git version control"
      ],
      roles: "Front-End Developers, Back-End Engineers, Database Administrators",
      deliverable: "Fully Integrated Executable Source Code Repository"
    },
    {
      num: "Stage 4",
      title: "Testing & Quality Assurance Phase",
      subtitle: "Validating correctness, security & bug elimination",
      icon: CheckCircle,
      color: "text-amber-400",
      border: "border-amber-500/40",
      bg: "bg-amber-500/10",
      badge: "Quality Assurance",
      description: "QA engineers execute the web application across multiple devices, operating systems, and browsers to uncover logic bugs, security vulnerabilities, and performance bottlenecks.",
      activities: [
        "Unit Testing (testing isolated methods and functions)",
        "Integration Testing (verifying module communication and APIs)",
        "Security & Penetration Audits (preventing SQL Injection & XSS)",
        "User Acceptance Testing (UAT) with actual client stakeholders"
      ],
      roles: "QA Engineers, Penetration Testers, End Users",
      deliverable: "Test Plan, Test Cases, Bug Tracking & Sign-off Reports"
    },
    {
      num: "Post-Dev",
      title: "Deployment & Ongoing Maintenance",
      subtitle: "Live hosting, monitoring, and user feedback",
      icon: Rocket,
      color: "text-rose-400",
      border: "border-rose-500/40",
      bg: "bg-rose-500/10",
      badge: "Production Operations",
      description: "Following testing sign-off, the application is deployed to production cloud servers (AWS, Azure, Apache Tomcat) with domain DNS, SSL certificates, and continuous maintenance cycles.",
      activities: [
        "Production server hosting, database migration, and SSL setup",
        "Corrective Maintenance (fixing latent production defects)",
        "Adaptive Maintenance (updating for new OS/browser changes)",
        "Perfective Maintenance (adding user-requested enhancements)"
      ],
      roles: "DevOps Engineers, Cloud Administrators, Support Team",
      deliverable: "Live Production URL, Server Telemetry, Feedback Logs"
    }
  ];

  const current = stages[activeStage];
  const Icon = current.icon;

  return (
    <div className="space-y-6">
      <div className="bg-slate-850/60 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-base border-b border-slate-750 pb-3">
          <Zap size={20} />
          <span>Interactive Web Application Development Lifecycle (WADL) Navigator</span>
        </div>

        {/* Phase Stepper Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {stages.map((stg, idx) => {
            const SIcon = stg.icon;
            return (
              <button
                key={idx}
                onClick={() => setActiveStage(idx)}
                className={"p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between " + (
                  activeStage === idx
                    ? "bg-slate-800 border-sky-500 text-white shadow-lg shadow-sky-500/15"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                )}
              >
                <div className="flex items-center justify-between w-full mb-1.5">
                  <SIcon size={18} className={activeStage === idx ? stg.color : "text-slate-500"} />
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-950 text-slate-400">
                    {stg.num}
                  </span>
                </div>
                <span className="text-xs font-bold line-clamp-1">{stg.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detail Panel */}
        <div className={"p-6 rounded-2xl border " + current.border + " " + current.bg + " space-y-4"}>
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-750/50 pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <Icon size={24} className={current.color} />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{current.badge} · {current.num}</span>
                <h3 className="text-lg font-extrabold text-white">{current.title}</h3>
                <span className="text-xs text-slate-300 font-medium">{current.subtitle}</span>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{current.description}</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
            {/* Key Activities */}
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-white block">Key Engineering Activities:</span>
              <ul className="text-xs text-slate-300 space-y-1.5">
                {current.activities.map((act, aIdx) => (
                  <li key={aIdx} className="flex items-start gap-2">
                    <span className={"font-bold " + current.color}>•</span>
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Team Roles & Deliverables */}
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5 text-[11px] font-mono uppercase">Responsible Team Roles</span>
                <span className="text-white font-semibold">{current.roles}</span>
              </div>
              <div className="border-t border-slate-800 pt-2">
                <span className="text-slate-400 block mb-0.5 text-[11px] font-mono uppercase">Primary Stage Deliverable</span>
                <span className={"font-bold font-mono " + current.color}>{current.deliverable}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default function Topic0() {
  const [activeTab, setActiveTab] = useState('concept');

  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 002_003 · Topic 0
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Software Engineering Lifecycle
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Overview of the Web Application Development Lifecycle (WADL)
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master the four sequential stages of building robust web applications: Requirement Definition, Design, Implementation (Coding), and Testing, followed by deployment and maintenance.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'concept', label: '1. Lifecycle Navigator', icon: BookOpen },
            { id: 'matrix', label: '2. Stages Summary Matrix', icon: Layers },
            { id: 'pitfalls', label: '3. Board Tips & Pitfalls', icon: AlertTriangle },
            { id: 'faqs', label: '4. FAQs (25 Qs)', icon: HelpCircle },
            { id: 'notes', label: '5. Plain Text Notes', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={"flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer " + (
                  activeTab === tab.id
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 border-b-2 border-sky-400'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/40'
                )}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: LIFECYCLE NAVIGATOR */}
        {activeTab === 'concept' && (
          <div className="space-y-6">
            <LifecycleStagesExplorer />

            <Teacher 
              teacherName="Sukanta Hui" 
              role="Senior Computer Science & IT Educator"
              experience="15+ Years CBSE Class XII Board Mentorship"
              tip="Always remember the exact sequence of the four stages for CBSE IT (802) exams: (1) Requirement Definition, (2) Design, (3) Implementation, and (4) Testing. Never mix up the order! If a question asks for the deliverable of Stage 1, the answer is always the Software Requirements Specification (SRS) document."
            />
          </div>
        )}

        {/* TAB 2: STAGES SUMMARY MATRIX */}
        {activeTab === 'matrix' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2 text-sky-400">
                <Layers size={18} /> The Four Stages of Web Application Development Matrix
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900 text-slate-400">
                      <th className="p-3">Stage #</th>
                      <th className="p-3 text-sky-400">Phase Name</th>
                      <th className="p-3 text-emerald-400">Primary Objective</th>
                      <th className="p-3 text-amber-400">Key Deliverable</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850 text-slate-300">
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-mono font-bold text-white">Stage 1</td>
                      <td className="p-3 font-bold text-sky-300">Requirement Definition / Analysis</td>
                      <td className="p-3">Compiling detailed feature descriptions, scope, constraints & feasibility</td>
                      <td className="p-3 font-mono text-amber-300">Software Requirements Specification (SRS)</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-mono font-bold text-white">Stage 2</td>
                      <td className="p-3 font-bold text-purple-300">Design Phase</td>
                      <td className="p-3">Architectural blueprints, UI wireframes, ER database schemas & DFDs</td>
                      <td className="p-3 font-mono text-amber-300">Design Document Specification (DDS) & ER Diagrams</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-mono font-bold text-white">Stage 3</td>
                      <td className="p-3 font-bold text-emerald-300">Implementation / Coding</td>
                      <td className="p-3">Writing front-end HTML/CSS/JS and back-end Java/SQL code</td>
                      <td className="p-3 font-mono text-amber-300">Executable Source Code Repository</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-mono font-bold text-white">Stage 4</td>
                      <td className="p-3 font-bold text-amber-300">Testing & Quality Assurance</td>
                      <td className="p-3">Executing unit, integration, functional, and security test cases to find bugs</td>
                      <td className="p-3 font-mono text-amber-300">Test Cases & Bug Tracking Reports</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BOARD PITFALLS */}
        {activeTab === 'pitfalls' && (
          <div className="space-y-6">
            <div className="bg-slate-850/60 border border-amber-500/20 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3 text-amber-400">
                <AlertTriangle size={22} />
                <h3 className="text-lg font-bold text-white">Board Examination Pitfalls & Traps</h3>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  <p className="font-bold text-amber-300 mb-1">Trap 1: Confusing Design with Coding</p>
                  <p className="text-slate-400">Design is creating the blueprints (wireframes, ER diagrams, schemas). Coding (Implementation) is writing the actual programming instructions (Java, SQL, HTML). Never write that code is written in the Design phase!</p>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  <p className="font-bold text-amber-300 mb-1">Trap 2: Forgetting the Name of the Stage 1 Deliverable</p>
                  <p className="text-slate-400">In 1-mark objective questions, the deliverable of Stage 1 is frequently tested. The correct expansion is Software Requirements Specification (SRS).</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 0 FAQs" questions={questions} />
          </div>
        )}

        {/* TAB 5: PLAIN TEXT NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint content={noteText} fileName="Topic0_Web_Dev_Lifecycle_Overview_Notes.txt" />
          </div>
        )}

      </div>
    </div>
  );
}
