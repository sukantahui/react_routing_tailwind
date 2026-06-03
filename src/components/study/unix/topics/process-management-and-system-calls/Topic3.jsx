// Topic3.jsx
import React from 'react';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic3_files/topic3_questions';
import ShellFileLoader from '../../../../../common/ShellFileLoader';
import loginFlowSh from './topic3_files/login_flow.sh?raw';
import whoCommandSh from './topic3_files/who_command.sh?raw';
import lastLogSh from './topic3_files/last_log.sh?raw';

const Topic3 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-12 md:px-6 lg:px-8 space-y-12">

        {/* Header Section */}
        <div className="space-y-4 animate-[fade-slide-up_0.6s_cubic-bezier(0.2,0.9,0.4,1.1)] motion-safe:animate-[fade-slide-up_0.6s_cubic-bezier(0.2,0.9,0.4,1.1)]">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent">
            Unix Login Process Overview
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed border-l-4 border-orange-500 pl-4">
            From getty to shell – how users authenticate and gain access to the Unix system.
          </p>
        </div>

        {/* Core Concepts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.1s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.1s]">
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold flex items-center gap-2"><span className="text-orange-500">🔐</span> What is the Unix Login Process?</h2>
              <p className="mt-3 text-gray-700 dark:text-gray-200 leading-relaxed">
                The login process is the sequence of events that starts when a user requests a terminal session (local, serial, or network) and ends when the user gets a shell prompt. It involves:
              </p>
              <ul className="mt-3 list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200">
                <li><strong>getty</strong> – opens the terminal and displays <code>login:</code> prompt</li>
                <li><strong>login</strong> – verifies username/password, sets up environment</li>
                <li><strong>/etc/passwd</strong> & <strong>/etc/shadow</strong> – authentication databases</li>
                <li><strong>shell</strong> – user's default program (e.g., bash, zsh)</li>
                <li><strong>profile scripts</strong> – .profile, .bashrc, .login</li>
              </ul>
              <p className="mt-4 text-sm bg-white dark:bg-gray-900 p-3 rounded-lg border">
                💡 In modern Linux, <code>systemd-logind</code> and display managers (GDM, SDDM) add complexity, but the core remains.
              </p>
            </div>
          </div>
          <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.2s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.2s]">
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold flex items-center gap-2"><span className="text-red-500">🏫</span> Real‑world Analogy</h2>
              <p className="mt-2 text-gray-700 dark:text-gray-200 leading-relaxed">
                Imagine a school in <strong>Barrackpore</strong>. The guard at the gate (<strong>getty</strong>) calls out "Who is there?" (<code>login:</code>). 
                When <strong>Swadeep</strong> says his name, the guard checks the attendance register (<strong>/etc/passwd</strong>) and verifies his ID card (<strong>/etc/shadow</strong>). 
                If correct, the guard escorts Swadeep to his classroom (<strong>shell</strong>) where he can work. 
                The principal (<strong>init</strong>) assigned the guard to that gate. This matches how <strong>Abhronila</strong> logs into her system at <strong>Shyamnagar</strong> lab.
              </p>
              <div className="mt-4 border-l-4 border-red-400 pl-3 text-sm italic text-gray-600 dark:text-gray-300">
                "Login is the ceremony that transforms a raw terminal into a user's work environment."
              </div>
            </div>
          </div>
        </div>

        {/* SVG – Login Flow Diagram (step‑by‑step) */}
        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 animate-[fade-slide-up_0.6s_ease-out_0.25s] motion-safe:animate-[fade-slide-up_0.6s_ease-out_0.25s]">
          <h3 className="text-xl font-semibold text-center mb-2">📋 Unix Login Process – Step by Step</h3>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">Hover on any step to see details. Animated connectors show the flow.</p>
          <div className="flex justify-center overflow-x-auto">
            <svg width="750" height="300" viewBox="0 0 750 300" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
              <defs>
                <marker id="arrow-login" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
                  <polygon points="0 0, 6 2, 0 4" fill="#ea580c" />
                </marker>
                <filter id="shadow-step">
                  <feDropShadow dx="1" dy="1" stdDeviation="1.5" floodOpacity="0.25"/>
                </filter>
              </defs>
              
              {/* Step 1: init spawns getty */}
              <g transform="translate(40, 100)" className="cursor-pointer transition-all duration-300 hover:drop-shadow-lg" filter="url(#shadow-step)">
                <rect x="-30" y="-25" width="100" height="50" rx="8" fill="#8b5cf6" className="hover:fill-purple-500 transition">
                  <animate attributeName="width" values="100;106;100" dur="3s" repeatCount="indefinite" />
                </rect>
                <text x="20" y="5" textAnchor="middle" fill="white" fontWeight="bold" fontSize="12">init</text>
                <text x="20" y="20" textAnchor="middle" fill="white" fontSize="10">PID 1</text>
                <title>init reads /etc/inittab or systemd service to spawn getty</title>
              </g>
              <text x="95" y="90" textAnchor="middle" fill="#ea580c" fontSize="10">spawns</text>
              <line x1="90" y1="100" x2="160" y2="100" stroke="#ea580c" strokeWidth="2" markerEnd="url(#arrow-login)"/>

              {/* Step 2: getty */}
              <g transform="translate(170, 100)" className="cursor-pointer transition-all duration-300 hover:drop-shadow-lg" filter="url(#shadow-step)">
                <rect x="-30" y="-25" width="100" height="50" rx="8" fill="#f59e0b" className="hover:fill-amber-500 transition">
                  <animate attributeName="y" values="100;97;100" dur="2.5s" repeatCount="indefinite" />
                </rect>
                <text x="20" y="5" textAnchor="middle" fill="white" fontWeight="bold">getty</text>
                <text x="20" y="20" textAnchor="middle" fill="white" fontSize="10">opens tty</text>
                <title>getty opens /dev/ttyX or serial line, displays login prompt</title>
              </g>
              <text x="225" y="160" textAnchor="middle" fill="#ea580c" fontSize="10">exec</text>
              <line x1="220" y1="125" x2="280" y2="160" stroke="#ea580c" strokeWidth="2" markerEnd="url(#arrow-login)" strokeDasharray="4"/>

              {/* Step 3: login program */}
              <g transform="translate(290, 170)" className="cursor-pointer transition-all duration-300 hover:drop-shadow-lg" filter="url(#shadow-step)">
                <rect x="-35" y="-25" width="120" height="50" rx="8" fill="#ef4444" className="hover:fill-red-500 transition">
                  <animate attributeName="x" values="290;293;290" dur="3.5s" repeatCount="indefinite" />
                </rect>
                <text x="25" y="5" textAnchor="middle" fill="white" fontWeight="bold">login</text>
                <text x="25" y="20" textAnchor="middle" fill="white" fontSize="10">asks user/pass</text>
                <title>login reads username, asks password, consults /etc/passwd & /etc/shadow</title>
              </g>
              <text x="405" y="185" textAnchor="middle" fill="#ea580c" fontSize="10">authenticates</text>
              <line x1="410" y1="180" x2="470" y2="170" stroke="#ea580c" strokeWidth="2" markerEnd="url(#arrow-login)"/>

              {/* Step 4: Auth sources */}
              <g transform="translate(480, 165)" className="cursor-pointer transition-all duration-300 hover:drop-shadow-lg" filter="url(#shadow-step)">
                <rect x="-35" y="-25" width="120" height="50" rx="8" fill="#10b981" className="hover:fill-emerald-500 transition">
                  <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
                </rect>
                <text x="25" y="5" textAnchor="middle" fill="white" fontWeight="bold">/etc/passwd</text>
                <text x="25" y="20" textAnchor="middle" fill="white" fontSize="10">/etc/shadow</text>
                <title>Password verification, uid/gid, home directory, shell</title>
              </g>
              <text x="480" y="100" textAnchor="middle" fill="#ea580c" fontSize="10">success</text>
              <line x1="480" y1="140" x2="480" y2="115" stroke="#ea580c" strokeWidth="2" markerEnd="url(#arrow-login)"/>

              {/* Step 5: spawn shell */}
              <g transform="translate(620, 100)" className="cursor-pointer transition-all duration-300 hover:drop-shadow-lg" filter="url(#shadow-step)">
                <rect x="-35" y="-25" width="120" height="50" rx="8" fill="#3b82f6" className="hover:fill-blue-500 transition">
                  <animate attributeName="height" values="50;56;50" dur="4s" repeatCount="indefinite" />
                </rect>
                <text x="25" y="5" textAnchor="middle" fill="white" fontWeight="bold">shell</text>
                <text x="25" y="20" textAnchor="middle" fill="white" fontSize="10">bash, zsh, etc.</text>
                <title>User shell executes .profile, .bashrc, gives prompt</title>
              </g>
              <line x1="600" y1="165" x2="620" y2="125" stroke="#ea580c" strokeWidth="2" markerEnd="url(#arrow-login)"/>
              <text x="610" y="150" fill="#ea580c" fontSize="10">exec</text>
            </svg>
          </div>
          <div className="text-center text-xs mt-3 text-gray-500 dark:text-gray-400">The login process flow: init → getty → login → authentication → shell</div>
        </div>

        {/* Key files and their roles */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fade-slide-up_0.6s_ease-out_0.3s]">
          <div className="bg-orange-100 dark:bg-orange-900/30 p-5 rounded-2xl border-l-8 border-orange-500">
            <h4 className="font-mono font-bold">📄 /etc/passwd</h4>
            <p className="text-sm mt-1">Stores user account information (excluding password hash). Format:</p>
            <code className="block text-xs bg-white dark:bg-gray-900 p-2 rounded mt-1">
              {`username:x:UID:GID:comment:home:shell`}
            </code>
            <p className="text-xs mt-2">The 'x' means password is stored in /etc/shadow (shadowed).</p>
          </div>
          <div className="bg-red-100 dark:bg-red-900/30 p-5 rounded-2xl border-l-8 border-red-500">
            <h4 className="font-mono font-bold">🔒 /etc/shadow</h4>
            <p className="text-sm mt-1">Stores encrypted password and aging info. Only readable by root.</p>
            <code className="block text-xs bg-white dark:bg-gray-900 p-2 rounded mt-1">
              {`username:$6$salt$hash:lastchange:min:max:warn:inactive:expire`}
            </code>
            <p className="text-xs mt-2">$6$ indicates SHA‑512 hash.</p>
          </div>
        </div>

        {/* System Call / Functions */}
        <div className="grid md:grid-cols-2 gap-6 animate-[fade-slide-up_0.6s_ease-out_0.35s]">
          <div className="bg-purple-100 dark:bg-purple-900/30 p-5 rounded-2xl border-l-8 border-purple-500">
            <h4 className="font-mono font-bold">getpwnam(), getspnam()</h4>
            <p className="text-sm mt-1">Library functions to retrieve password/shadow entries.</p>
            <code className="block text-xs bg-white dark:bg-gray-900 p-2 rounded">
              {`#include <pwd.h>
struct passwd *getpwnam(const char *name);`}
            </code>
            <p className="text-xs mt-2">Used by login to fetch user info.</p>
          </div>
          <div className="bg-teal-100 dark:bg-teal-900/30 p-5 rounded-2xl border-l-8 border-teal-500">
            <h4 className="font-mono font-bold">crypt()</h4>
            <p className="text-sm mt-1">Password encryption function (DES, MD5, SHA‑256/512).</p>
            <code className="block text-xs bg-white dark:bg-gray-900 p-2 rounded">
              {`char *crypt(const char *key, const char *salt);`}
            </code>
            <p className="text-xs mt-2">Compares user‑supplied password with stored hash.</p>
          </div>
        </div>

        {/* Shell Demos */}
        <div className="space-y-6 animate-[fade-slide-up_0.6s_ease-out_0.4s]">
          <h3 className="text-2xl font-semibold">📜 Shell Demos – Exploring Login Process</h3>
          <ShellFileLoader
            fileModule={loginFlowSh}
            title="Simulate login: tracing getty and login"
            highlightLines={[5, 10, 18]}
          />
          <ShellFileLoader
            fileModule={whoCommandSh}
            title="Show currently logged-in users"
            highlightLines={[3, 6]}
          />
          <ShellFileLoader
            fileModule={lastLogSh}
            title="Examine login history from /var/log/wtmp"
            highlightLines={[4, 9]}
          />
        </div>

        {/* Tips & Tricks + Hint */}
        <div className="grid md:grid-cols-2 gap-8 animate-[fade-slide-up_0.6s_ease-out_0.45s]">
          <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-200">
            <div className="flex items-center gap-2 text-amber-700 font-bold">💡 Professional Tips</div>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Use <code>getent passwd username</code> to query user database – works with LDAP too.</li>
              <li>Disable direct root login via <code>/etc/securetty</code> or <code>PermitRootLogin no</code> in sshd_config.</li>
              <li>Monitor failed login attempts in <code>/var/log/secure</code> (RHEL) or <code>/var/log/auth.log</code> (Debian).</li>
              <li>Use <code>faillock</code> or <code>pam_tally2</code> to lock accounts after repeated failures.</li>
            </ul>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/30 p-5 rounded-xl border border-blue-200">
            <div className="flex items-center gap-2 text-blue-700 font-semibold">🤔 Hint Section – Observe & Experiment</div>
            <p className="mt-2 text-sm">Run <code>ps -ef | grep getty</code> to see getty processes on virtual terminals. Try logging in via <code>ssh localhost</code> and examine <code>ps -ef --forest</code> – notice that sshd forks a process that eventually runs your shell.</p>
            <p className="mt-1 text-xs">Also, what happens if you <code>chsh -s /bin/false swadeep</code>? Try logging in as that user – you'll be rejected because the shell is invalid.</p>
          </div>
        </div>

        {/* Common Pitfalls & Best Practices */}
        <div className="grid md:grid-cols-2 gap-8 animate-[fade-slide-up_0.6s_ease-out_0.5s]">
          <div className="bg-red-50 dark:bg-red-950/20 p-5 rounded-xl">
            <h4 className="font-bold text-red-700 flex items-center gap-2">⚠️ Common Pitfalls</h4>
            <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
              <li>Editing <code>/etc/passwd</code> directly – use <code>vipw</code> to avoid corruption.</li>
              <li>Forgetting that <code>/etc/nologin</code> prevents all non‑root logins if present.</li>
              <li>Assuming login only uses <code>/etc/passwd</code> – today PAM (Pluggable Authentication Modules) controls most aspects.</li>
              <li>Not setting <code>umask</code> in profile scripts, leading to insecure default file permissions.</li>
            </ul>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/20 p-5 rounded-xl">
            <h4 className="font-bold text-emerald-700 flex items-center gap-2">✅ Best Practices</h4>
            <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
              <li>Always use <code>vipw</code> and <code>vigr</code> to edit passwd/group files.</li>
              <li>Store custom environment variables in <code>~/.profile</code>, not <code>~/.bashrc</code> (for login shells).</li>
              <li>Use <code>sssd</code> or <code>winbind</code> for integration with Active Directory.</li>
              <li>Test login configurations with <code>su - username</code> before deploying.</li>
            </ul>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-2xl border-l-8 border-gray-500 animate-[fade-slide-up_0.6s_ease-out_0.55s]">
          <h3 className="font-bold text-lg">✅ Student Mini‑Checklist – "I understand Unix login process when..."</h3>
          <div className="grid sm:grid-cols-2 gap-2 mt-3 text-sm">
            <div className="flex items-center gap-2"><span className="text-orange-500">☑</span> Can name the three main components: getty, login, shell</div>
            <div className="flex items-center gap-2"><span className="text-orange-500">☑</span> Know the roles of /etc/passwd and /etc/shadow</div>
            <div className="flex items-center gap-2"><span className="text-orange-500">☑</span> Can trace the process tree from init to a login shell</div>
            <div className="flex items-center gap-2"><span className="text-orange-500">☑</span> Understand why PAM exists and its basic functions</div>
          </div>
        </div>

        {/* FAQ */}
        <FAQTemplate title="Unix Login Process Overview" questions={questions} />

        {/* Teacher's Note */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/40 dark:to-red-950/40 p-6 rounded-2xl border border-orange-200 dark:border-orange-800 transition-all duration-300 hover:shadow-2xl animate-[fade-slide-up_0.6s_ease-out_0.6s]">
          <div className="flex items-start gap-4">
            <div className="text-4xl">👨‍🏫</div>
            <div>
              <h3 className="text-xl font-bold text-orange-800 dark:text-orange-300">Teacher's Note</h3>
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-200"><strong>Sukanta Hui</strong> (sukantahui@codernaccotax.co.in • 28+ years experience: 1998–present)</p>
              <p className="mt-3 leading-relaxed">
                “While teaching at <strong>Ichapur</strong> and <strong>Naihati</strong>, I often ask students to simulate login using ‘<code>login -f swadeep</code>’ after <code>sudo</code>. 
                The realization that a simple ‘<code>login:</code>’ prompt is backed by intricate security checks (PAM, shadow passwords) amazes them. 
                <strong>Tuhina</strong> once debugged a ‘login incorrect’ for hours – it was because <code>/etc/nologin</code> was left over from maintenance. 
                Encourage students to inspect <code>strace -f -p $(pgrep getty)</code> to see the system calls involved.”
              </p>
              <p className="mt-2 text-xs opacity-80">Pro tip: Use <code>pam_tally2</code> to demonstrate account locking after failed logins – a great classroom demo.</p>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fade-slide-up {
            0% { opacity: 0.7; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @media (prefers-reduced-motion: reduce) {
            [class*="animate-"] { animation: none !important; opacity: 1 !important; transform: none !important; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Topic3;