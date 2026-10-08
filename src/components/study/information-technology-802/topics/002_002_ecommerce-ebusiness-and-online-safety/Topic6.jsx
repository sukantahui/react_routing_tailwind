import React, { useState } from 'react';
import { 
  Lock, Shield, Key, Wifi, Smartphone, CheckCircle2, 
  XCircle, AlertTriangle, HelpCircle, FileText, Sparkles, 
  BookOpen, Layers, ArrowRight, Zap, RefreshCw, Eye, EyeOff, Terminal, ShieldCheck 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

const TLSEncryptionVisualizer = () => {
  const [inputText, setInputText] = useState('4532 9876 1234 5678 (CVV: 892)');
  const [protocol, setProtocol] = useState('https'); // 'http' or 'https'

  // Simple pseudo-cipher simulator
  const toCiphertext = (str) => {
    return btoa(str).split('').reverse().join('').substring(0, 32) + "==";
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-850/60 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-750 pb-3">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-base">
            <Lock size={20} />
            <span>Interactive SSL/TLS Protocol & Packet Encryption Visualizer</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setProtocol('http')}
              className={"px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer " + (
                protocol === 'http' 
                  ? "bg-rose-500 text-white font-extrabold shadow-md" 
                  : "bg-slate-900 border border-slate-800 text-slate-400"
              )}
            >
              Unencrypted HTTP (Port 80)
            </button>
            <button
              onClick={() => setProtocol('https')}
              className={"px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer " + (
                protocol === 'https' 
                  ? "bg-emerald-500 text-slate-950 font-extrabold shadow-md" 
                  : "bg-slate-900 border border-slate-800 text-slate-400"
              )}
            >
              Encrypted HTTPS / TLS (Port 443)
            </button>
          </div>
        </div>

        {/* Browser URL Bar Mockup */}
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-3">
          <div className={"flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-bold " + (
            protocol === 'https' 
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
              : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
          )}>
            {protocol === 'https' ? <Lock size={12} /> : <AlertTriangle size={12} />}
            <span>{protocol === 'https' ? "https://" : "http://"}</span>
          </div>
          <span className="text-xs font-mono text-slate-300">
            {protocol === 'https' ? "secure-bank-gateway.in/pay/checkout" : "insecure-merchant.com/pay"}
          </span>
          <span className="ml-auto text-[10px] font-mono text-slate-500">
            {protocol === 'https' ? "TLS 1.3 · AES-256-GCM" : "PLAINTEXT · UNENCRYPTED"}
          </span>
        </div>

        {/* Input Text Input */}
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-300 block">
            1. Sensitive Payload Data entered in Browser Form:
          </label>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-sky-500"
          />
        </div>

        {/* Transmission Pipe Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Packet Transmitted Over Wire */}
          <div className={"p-5 rounded-2xl border space-y-3 " + (
            protocol === 'https' ? "bg-emerald-950/20 border-emerald-500/30" : "bg-rose-950/20 border-rose-500/30"
          )}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Wifi size={14} className={protocol === 'https' ? "text-emerald-400" : "text-rose-400"} />
                2. Data Packet Traversing Public Wi-Fi / Internet
              </span>
              <span className={"text-[10px] font-mono font-bold px-2 py-0.5 rounded " + (
                protocol === 'https' ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"
              )}>
                {protocol === 'https' ? "CIPHERTEXT" : "PLAINTEXT"}
              </span>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 font-mono text-xs overflow-x-auto">
              {protocol === 'https' ? (
                <span className="text-emerald-400 break-all font-bold">
                  {toCiphertext(inputText)}
                </span>
              ) : (
                <span className="text-rose-400 font-bold">
                  {inputText}
                </span>
              )}
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              {protocol === 'https' 
                ? "Protected: If a packet sniffer intercepts this payload on Wi-Fi, they only see unintelligible encrypted ciphertext."
                : "VULNERABLE: Anyone running Wireshark on the same Wi-Fi network reads your complete credit card number & CVV in cleartext!"
              }
            </p>
          </div>

          {/* Decryption at Bank Server */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-sky-400" />
                3. Secure Decryption at Authorized Bank Server
              </span>
              <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                Private Key Match
              </span>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 font-mono text-xs">
              <span className="text-sky-300 font-bold">{inputText}</span>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              The authorized banking server uses its private TLS key to decrypt the payload, verify 2FA OTP, and settle the transaction securely.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default function Topic6() {
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
                Module 002_002 · Topic 6
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Cryptographic Guidelines
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Security Guidelines: HTTPS / SSL Padlock, Public Wi-Fi Dangers & Multi-Factor Authentication
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Explore the technical cryptographic inner workings of SSL/TLS certificates, examine why public Wi-Fi exposes credentials, and analyze Multi-Factor Authentication (2FA) mechanisms.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'concept', label: '1. Encryption Lab', icon: BookOpen },
            { id: 'matrix', label: '2. 2FA & Security Matrix', icon: Layers },
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

        {/* TAB 1: ENCRYPTION LAB */}
        {activeTab === 'concept' && (
          <div className="space-y-6">
            <TLSEncryptionVisualizer />

            {/* The 3 Pillars of MFA */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-xs font-mono uppercase">
                  <Key size={16} />
                  <span>1. Something You KNOW</span>
                </div>
                <h4 className="text-sm font-bold text-white">Knowledge Factor</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Net banking login password, transaction PIN, ATM PIN, or security challenge questions.
                </p>
              </div>

              <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs font-mono uppercase">
                  <Smartphone size={16} />
                  <span>2. Something You HAVE</span>
                </div>
                <h4 className="text-sm font-bold text-white">Possession Factor</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Physical registered mobile receiving SMS OTP, Authenticator app (TOTP), or FIDO2 hardware USB security key.
                </p>
              </div>

              <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs font-mono uppercase">
                  <Shield size={16} />
                  <span>3. Something You ARE</span>
                </div>
                <h4 className="text-sm font-bold text-white">Inherence Factor</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Biometrics including fingerprint scanner, FaceID facial recognition, or iris scan.
                </p>
              </div>
            </div>

            <Teacher 
              teacherName="Sukanta Hui" 
              role="Senior Computer Science & IT Educator"
              experience="15+ Years CBSE Class XII Board Mentorship"
              tip="CBSE board questions love testing: 'What is the significance of the padlock icon in a web browser?' Your answer MUST state: The padlock icon confirms that the website possesses a valid SSL/TLS digital certificate issued by a trusted Certificate Authority (CA) and all communication between the client and server is encrypted using HTTPS on Port 443!"
            />
          </div>
        )}

        {/* TAB 2: 2FA & SECURITY MATRIX */}
        {activeTab === 'matrix' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2 text-sky-400">
                <Layers size={18} /> Authentication & Encryption Standards Matrix
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900 text-slate-400">
                      <th className="p-3">Security Mechanism</th>
                      <th className="p-3 text-sky-400">Underlying Protocol / Rule</th>
                      <th className="p-3 text-emerald-400">Threat Eliminated</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850 text-slate-300">
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-white">HTTPS / TLS 1.3</td>
                      <td className="p-3">Port 443, AES-256 symmetric cipher, RSA/ECC key exchange</td>
                      <td className="p-3">Packet sniffing & plaintext eavesdropping on networks</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-white">Two-Factor Authentication (2FA)</td>
                      <td className="p-3">Password (Know) + Dynamic Mobile OTP (Have)</td>
                      <td className="p-3">Unauthorized account takeover from leaked/stolen passwords</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-white">CVV Non-Storage Rule</td>
                      <td className="p-3">RBI & PCI-DSS mandate prohibiting merchant database storage</td>
                      <td className="p-3">Unauthorized card transactions in case of merchant database breach</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-white">Virtual On-Screen Keyboard</td>
                      <td className="p-3">Mouse-clicked randomized on-screen character buttons</td>
                      <td className="p-3">Hardware & software keyloggers capturing physical keystrokes</td>
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
                  <p className="font-bold text-amber-300 mb-1">Mistake 1: Confusing HTTP Port with HTTPS Port</p>
                  <p className="text-slate-400">Unencrypted HTTP operates on TCP Port 80. Encrypted HTTPS operates on TCP Port 443. Never mix these up in MCQ or 1-mark questions!</p>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  <p className="font-bold text-amber-300 mb-1">Mistake 2: Believing 2FA requires two passwords</p>
                  <p className="text-slate-400">2FA means using two DIFFERENT categories of factors (e.g. Password + OTP). Entering two different passwords is still just 1-Factor (Knowledge Factor only)!</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 6 FAQs" questions={questions} />
          </div>
        )}

        {/* TAB 5: PLAIN TEXT NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint content={noteText} fileName="Topic6_HTTPS_SSL_2FA_Security_Guidelines_Notes.txt" />
          </div>
        )}

      </div>
    </div>
  );
}
