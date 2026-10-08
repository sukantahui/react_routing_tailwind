import React, { useState } from 'react';
import { 
  ShieldAlert, Server, EyeOff, Lock, AlertTriangle, 
  CheckCircle2, XCircle, HelpCircle, FileText, Sparkles, 
  BookOpen, Layers, ArrowRight, Zap, RefreshCw, Cpu, Activity, ShieldCheck, Database 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

const ServerThreatSimulator = () => {
  const [trafficVolume, setTrafficVolume] = useState(15000); // concurrent users
  const [enableLoadBalancer, setEnableLoadBalancer] = useState(false);
  const [enableAutoScaling, setEnableAutoScaling] = useState(false);
  const [enableWAF, setEnableWAF] = useState(false);

  // Compute server load
  let serverInstances = enableAutoScaling ? (trafficVolume > 50000 ? 8 : trafficVolume > 20000 ? 4 : 2) : 1;
  let loadPerInstance = Math.round(trafficVolume / serverInstances);
  let cpuUsage = Math.min(100, Math.round(loadPerInstance / 250));
  if (enableLoadBalancer) cpuUsage = Math.round(cpuUsage * 0.7);

  let isCrashed = cpuUsage >= 95;
  let serverStatus = isCrashed ? "HTTP 503 Crash (Downtime)" : cpuUsage > 75 ? "Heavy Stress" : "Healthy & Operational";

  return (
    <div className="space-y-6">
      <div className="bg-slate-850/60 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-750 pb-3">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-base">
            <Activity size={20} />
            <span>Interactive Cyber Risk & Server Traffic Simulator</span>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-750 text-slate-400">
            Real-Time Stress Test
          </span>
        </div>

        {/* Traffic Slider Controls */}
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-300">Simulate Festive Sale Concurrent Shoppers:</span>
            <span className="font-mono font-extrabold text-sky-400 text-sm">{trafficVolume.toLocaleString()} Users / Sec</span>
          </div>
          <input
            type="range"
            min="1000"
            max="100000"
            step="1000"
            value={trafficVolume}
            onChange={(e) => setTrafficVolume(Number(e.target.value))}
            className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-sky-400"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>Normal Traffic (1k)</span>
            <span>Evening Peak (25k)</span>
            <span>Diwali Flash Sale (100k)</span>
          </div>
        </div>

        {/* Defense Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => setEnableLoadBalancer(!enableLoadBalancer)}
            className={"p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between " + (
              enableLoadBalancer 
                ? "bg-emerald-950/40 border-emerald-500 text-emerald-300 shadow-md" 
                : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
            )}
          >
            <div>
              <span className="text-xs font-bold block">1. Load Balancer</span>
              <span className="text-[10px] text-slate-400">Even traffic distribution</span>
            </div>
            <span className={"text-xs font-mono font-bold px-2 py-0.5 rounded " + (enableLoadBalancer ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-500")}>
              {enableLoadBalancer ? "ACTIVE" : "OFF"}
            </span>
          </button>

          <button
            onClick={() => setEnableAutoScaling(!enableAutoScaling)}
            className={"p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between " + (
              enableAutoScaling 
                ? "bg-sky-950/40 border-sky-500 text-sky-300 shadow-md" 
                : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
            )}
          >
            <div>
              <span className="text-xs font-bold block">2. Cloud Auto-Scaler</span>
              <span className="text-[10px] text-slate-400">Spins up {serverInstances} instances</span>
            </div>
            <span className={"text-xs font-mono font-bold px-2 py-0.5 rounded " + (enableAutoScaling ? "bg-sky-500/20 text-sky-400" : "bg-slate-800 text-slate-500")}>
              {enableAutoScaling ? "ACTIVE" : "OFF"}
            </span>
          </button>

          <button
            onClick={() => setEnableWAF(!enableWAF)}
            className={"p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between " + (
              enableWAF 
                ? "bg-amber-950/40 border-amber-500 text-amber-300 shadow-md" 
                : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
            )}
          >
            <div>
              <span className="text-xs font-bold block">3. Web App Firewall</span>
              <span className="text-[10px] text-slate-400">Blocks SQLi & DDoS bots</span>
            </div>
            <span className={"text-xs font-mono font-bold px-2 py-0.5 rounded " + (enableWAF ? "bg-amber-500/20 text-amber-400" : "bg-slate-800 text-slate-500")}>
              {enableWAF ? "ACTIVE" : "OFF"}
            </span>
          </button>
        </div>

        {/* Live Server Telemetry Output */}
        <div className={"p-6 rounded-2xl border transition-all " + (
          isCrashed ? "bg-rose-950/40 border-rose-500/50" : cpuUsage > 75 ? "bg-amber-950/40 border-amber-500/50" : "bg-emerald-950/40 border-emerald-500/50"
        )}>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className={"p-2.5 rounded-xl bg-slate-900 border border-slate-800 " + (isCrashed ? "text-rose-400" : cpuUsage > 75 ? "text-amber-400" : "text-emerald-400")}>
                <Server size={24} />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400">Live Infrastructure Health</span>
                <h3 className="text-base font-extrabold text-white">{serverStatus}</h3>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-400 block">CPU & Memory Load</span>
              <span className={"text-lg font-mono font-extrabold " + (isCrashed ? "text-rose-400" : cpuUsage > 75 ? "text-amber-400" : "text-emerald-400")}>
                {cpuUsage}%
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800 mb-3">
            <div 
              className={"h-full transition-all duration-300 " + (
                isCrashed ? "bg-rose-500" : cpuUsage > 75 ? "bg-amber-500" : "bg-emerald-500"
              )}
              style={{ width: `${cpuUsage}%` }}
            />
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {isCrashed ? (
              <span className="text-rose-300 font-semibold flex items-center gap-1.5">
                <AlertTriangle size={14} /> <strong>CRITICAL OUTAGE:</strong> Server resources saturated! Customers receive HTTP 503 Service Unavailable errors. Activate Load Balancer and Auto-Scaling to recover.
              </span>
            ) : (
              <span className="text-slate-300">
                System resilient. {serverInstances} active container instances handling traffic smoothly with zero dropped checkout packets.
              </span>
            )}
          </p>
        </div>

      </div>
    </div>
  );
};

export default function Topic4() {
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
                Module 002_002 · Topic 4
              </span>
              <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-semibold rounded-full">
                Cyber Risk & Infrastructure
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Major E-Business Risks: Privacy Breaches, Server Downtime & Cyber Attacks
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Examine the three core e-business vulnerabilities tested in CBSE Class XII IT: Violation of Customer Privacy, Peak-Hour Server Downtime caused by Traffic Spikes, and Hacker Infiltration.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'concept', label: '1. Cyber Risk Lab', icon: BookOpen },
            { id: 'matrix', label: '2. Threats vs Mitigations', icon: Layers },
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

        {/* TAB 1: CYBER RISK LAB */}
        {activeTab === 'concept' && (
          <div className="space-y-6">
            <ServerThreatSimulator />

            {/* The 3 Core Risks Blueprint Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-2.5">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <EyeOff size={18} />
                  <span>1. Privacy Violation</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Unauthorized gathering, tracking, or selling of personal data (phone numbers, addresses, purchase history) without informed consent. Governed by India's DPDP Act 2023.
                </p>
              </div>

              <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-2.5">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Server size={18} />
                  <span>2. Peak Server Downtime</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Sudden festive traffic surges exhausting CPU and memory connection pools, resulting in HTTP 503 errors, lost sales, and severe brand damage.
                </p>
              </div>

              <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-2.5">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                  <Lock size={18} />
                  <span>3. Hacker Infiltration</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Malicious cyber attacks including SQL Injection (SQLi), Cross-Site Scripting (XSS), DDoS floods, and Ransomware locking database records.
                </p>
              </div>
            </div>

            <Teacher 
              teacherName="Sukanta Hui" 
              role="Senior Computer Science & IT Educator"
              experience="15+ Years CBSE Class XII Board Mentorship"
              tip="CBSE Class XII IT (802) Question Papers frequently ask: 'Describe any two major e-business risks that companies face.' You must specifically structure your response under: (1) Violation of Customer Privacy (data leaks, unauthorized sale), (2) Server Downtime during traffic spikes, or (3) Hacker Penetration (SQL Injection, DDoS)! State the mitigation tool (e.g. Load Balancers, WAF) to secure full marks."
            />
          </div>
        )}

        {/* TAB 2: THREATS VS MITIGATIONS */}
        {activeTab === 'matrix' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2 text-sky-400">
                <Layers size={18} /> E-Business Threat Vectors vs Technical Mitigations
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900 text-slate-400">
                      <th className="p-3">Threat Vector</th>
                      <th className="p-3 text-rose-400">Root Vulnerability</th>
                      <th className="p-3 text-emerald-400">Engineering Mitigation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850 text-slate-300">
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-white">Customer Privacy Leaks</td>
                      <td className="p-3">Unencrypted databases & unauthorized third-party trackers</td>
                      <td className="p-3">AES-256 field encryption, DPDP consent compliance, strict RBAC</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-white">Flash Sale Server Crash</td>
                      <td className="p-3">CPU/RAM saturation from sudden concurrent HTTP spikes</td>
                      <td className="p-3">Nginx Load Balancer, AWS Auto-Scaling, Cloudflare Edge CDN</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-white">SQL Injection (SQLi)</td>
                      <td className="p-3">Unvalidated user inputs concatenated directly in SQL queries</td>
                      <td className="p-3">Java PreparedStatements & parameterized SQL queries</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-white">DDoS Botnet Floods</td>
                      <td className="p-3">Volumetric junk traffic overwhelming network bandwidth</td>
                      <td className="p-3">Web Application Firewall (WAF) rate limiting & bot mitigation</td>
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
                <h3 className="text-lg font-bold text-white">Board Examination Pitfalls & Common Mistakes</h3>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  <p className="font-bold text-amber-300 mb-1">Mistake 1: Confusing Server Downtime with Internet Disconnection</p>
                  <p className="text-slate-400">Server downtime is a backend failure on the company's hosting infrastructure caused by resource exhaustion, NOT the client's home Wi-Fi turning off.</p>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  <p className="font-bold text-amber-300 mb-1">Mistake 2: Stating that HTTPS prevents SQL Injection</p>
                  <p className="text-slate-400">HTTPS only encrypts data in transit between browser and server. It does NOT protect an insecure backend from malicious SQL queries. SQL Injection is prevented by Parameterized Queries / PreparedStatements!</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 4 FAQs" questions={questions} />
          </div>
        )}

        {/* TAB 5: PLAIN TEXT NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint content={noteText} fileName="Topic4_EBusiness_Risks_Downtime_Hackers_Notes.txt" />
          </div>
        )}

      </div>
    </div>
  );
}
