import { useState } from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";
import interactiveExample1 from "./topic1_files/interactive_example1.sh?raw";
import nonInteractiveExample1 from "./topic1_files/non_interactive1.sh?raw";
import loginShellExample from "./topic1_files/login_shell_example.sh?raw";
import startupTest from "./topic1_files/startup_test.sh?raw";

export default function Topic1() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 p-6 transition-colors duration-500">
      <style>
        {`
          @keyframes fadeSlideUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes pulseGlow {
            0%, 100% {
              box-shadow: 0 0 5px rgba(34, 197, 94, 0);
            }
            50% {
              box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
            }
          }
          
          @keyframes flowArrow {
            0% {
              stroke-dashoffset: 100;
            }
            100% {
              stroke-dashoffset: 0;
            }
          }
          
          .motion-safe\\:fade-slide-up {
            animation: fadeSlideUp 0.6s ease-out forwards;
          }
          
          .motion-reduced\\:animate-none {
            animation: none;
          }
          
          .tab-active-indicator {
            transform-origin: left;
            transition: transform 0.3s ease;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="max-w-6xl mx-auto mb-12">
        <div className="motion-safe:fade-slide-up opacity-0">
          <div className="inline-block px-4 py-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg mb-4">
            <span className="text-emerald-600 dark:text-emerald-300 font-medium">
              Topic 1: Shell Modes & Sessions
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent leading-tight">
            Interactive vs Non-Interactive & Login Shells
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl">
            Discover how your shell behaves differently in various modes—understanding this is crucial for 
            configuring your environment and debugging script issues.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto space-y-12">
        {/* Conceptual Foundation */}
        <section 
          className="motion-safe:fade-slide-up opacity-0"
          style={{ animationDelay: "0.1s" }}
        >
          <div 
            className={clsx(
              "bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg transition-all duration-500",
              "hover:shadow-2xl hover:scale-[1.002] border border-gray-200 dark:border-gray-700",
              hoveredCard === 1 && "ring-2 ring-emerald-500 dark:ring-emerald-400"
            )}
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-xl">
                <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                The Two Faces of Shell
              </h2>
            </div>
            
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Interactive Shell
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    A shell that reads commands from a terminal or terminal emulator. When Swadeep types 
                    commands in his Barrackpore lab terminal and sees immediate responses—that's interactive mode.
                  </p>
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border-l-4 border-emerald-500">
                    <h4 className="font-bold text-emerald-700 dark:text-emerald-300 mb-2">Characteristics:</h4>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                        <span>Reads from TTY (teletypewriter)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                        <span>Shows prompt ($ or #)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                        <span>Supports job control (Ctrl+Z, fg, bg)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                        <span>Has input/output redirection</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Non-Interactive Shell
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    A shell that reads commands from a file or string. When Tuhina's backup script runs 
                    automatically at midnight—that's non-interactive mode.
                  </p>
                  <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg border-l-4 border-teal-500">
                    <h4 className="font-bold text-teal-700 dark:text-teal-300 mb-2">Characteristics:</h4>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                        <span>Reads from script/pipe/heredoc</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                        <span>No prompt displayed</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                        <span>Limited job control</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                        <span>Often runs in restricted environment</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Visualization */}
              <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
                  How Commands Flow in Different Modes
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-5xl text-emerald-200 dark:text-emerald-800 opacity-50">→</div>
                    </div>
                    <svg className="w-full h-48" viewBox="0 0 400 200">
                      {/* User Input */}
                      <rect x="20" y="20" width="100" height="40" rx="5" fill="#A7F3D0" fillOpacity="0.3" stroke="#10B981" strokeWidth="2"/>
                      <text x="70" y="45" textAnchor="middle" className="text-sm font-bold" fill="#065F46">Swadeep</text>
                      <text x="70" y="60" textAnchor="middle" className="text-xs" fill="#047857">User Input</text>
                      
                      {/* Terminal */}
                      <rect x="150" y="20" width="80" height="40" rx="5" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="2"/>
                      <text x="190" y="45" textAnchor="middle" className="text-sm font-bold" fill="#10B981">Terminal</text>
                      
                      {/* Shell */}
                      <rect x="250" y="20" width="100" height="40" rx="5" fill="#059669" fillOpacity="0.2" stroke="#059669" strokeWidth="2"/>
                      <text x="300" y="45" textAnchor="middle" className="text-sm font-bold" fill="#059669">Shell</text>
                      
                      {/* Output */}
                      <rect x="20" y="80" width="330" height="40" rx="5" fill="#D1FAE5" fillOpacity="0.3" stroke="#34D399" strokeWidth="2"/>
                      <text x="185" y="105" textAnchor="middle" className="text-sm" fill="#065F46">Immediate Response</text>
                      
                      {/* Arrows */}
                      <path d="M120,40 L150,40" stroke="#10B981" strokeWidth="2">
                        <animate attributeName="stroke-dasharray" values="0,100;100,100" dur="2s" repeatCount="indefinite"/>
                      </path>
                      <path d="M230,40 L250,40" stroke="#10B981" strokeWidth="2">
                        <animate attributeName="stroke-dasharray" values="0,100;100,100" dur="2s" repeatCount="indefinite" begin="0.5s"/>
                      </path>
                      <path d="M350,40 L350,100 L20,100" stroke="#34D399" strokeWidth="2" strokeDasharray="5,5">
                        <animate attributeName="stroke-dasharray" values="0,100;100,100" dur="2s" repeatCount="indefinite" begin="1s"/>
                      </path>
                      
                      <text x="200" y="160" textAnchor="middle" className="text-xs font-bold" fill="#059669">
                        Interactive: Human ↔ Terminal ↔ Shell
                      </text>
                    </svg>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-5xl text-teal-200 dark:text-teal-800 opacity-50">→</div>
                    </div>
                    <svg className="w-full h-48" viewBox="0 0 400 200">
                      {/* Script File */}
                      <rect x="20" y="20" width="100" height="40" rx="5" fill="#99F6E4" fillOpacity="0.3" stroke="#0D9488" strokeWidth="2"/>
                      <text x="70" y="45" textAnchor="middle" className="text-sm font-bold" fill="#0F766E">Script.sh</text>
                      
                      {/* Shell */}
                      <rect x="150" y="20" width="80" height="40" rx="5" fill="#0D9488" fillOpacity="0.2" stroke="#0D9488" strokeWidth="2"/>
                      <text x="190" y="45" textAnchor="middle" className="text-sm font-bold" fill="#0D9488">Shell</text>
                      
                      {/* Output */}
                      <rect x="250" y="20" width="100" height="40" rx="5" fill="#14B8A6" fillOpacity="0.2" stroke="#14B8A6" strokeWidth="2"/>
                      <text x="300" y="45" textAnchor="middle" className="text-sm font-bold" fill="#0F766E">Result</text>
                      
                      {/* Log File */}
                      <rect x="20" y="80" width="330" height="40" rx="5" fill="#CCFBF1" fillOpacity="0.3" stroke="#2DD4BF" strokeWidth="2"/>
                      <text x="185" y="105" textAnchor="middle" className="text-sm" fill="#134E4A">Log File / No Output</text>
                      
                      {/* Arrows */}
                      <path d="M120,40 L150,40" stroke="#0D9488" strokeWidth="2">
                        <animate attributeName="stroke-dasharray" values="0,100;100,100" dur="2s" repeatCount="indefinite" begin="0.2s"/>
                      </path>
                      <path d="M230,40 L250,40" stroke="#0D9488" strokeWidth="2">
                        <animate attributeName="stroke-dasharray" values="0,100;100,100" dur="2s" repeatCount="indefinite" begin="0.7s"/>
                      </path>
                      <path d="M350,40 L350,100 L20,100" stroke="#2DD4BF" strokeWidth="2" strokeDasharray="5,5">
                        <animate attributeName="stroke-dasharray" values="0,100;100,100" dur="2s" repeatCount="indefinite" begin="1.2s"/>
                      </path>
                      
                      <text x="200" y="160" textAnchor="middle" className="text-xs font-bold" fill="#0F766E">
                        Non-Interactive: Script → Shell → Result
                      </text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabbed Examples Section */}
        <section 
          className="motion-safe:fade-slide-up opacity-0"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex">
                {["interactive", "nonInteractive", "detection"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={clsx(
                      "flex-1 py-4 text-lg font-medium transition-all duration-300 relative",
                      activeTab === tab
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    )}
                  >
                    {tab === "interactive" && "Interactive Examples"}
                    {tab === "nonInteractive" && "Non-Interactive Examples"}
                    {tab === "detection" && "How to Detect"}
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 tab-active-indicator"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-8">
              {activeTab === "interactive" && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Interactive Shell Commands
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    When Debangshu works in his Naihati college terminal, he uses interactive shell features:
                  </p>
                  
                  <ShellFileLoader
                    fileModule={interactiveExample1}
                    title="Interactive Features Demonstration"
                    highlightLines={[1, 2, 5, 8, 11]}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                      <div className="text-sm font-bold text-emerald-700 dark:text-emerald-300">Job Control</div>
                      <code className="text-xs text-gray-700 dark:text-gray-300 block mt-2">
                        {`Ctrl+Z  # Suspend`}
                      </code>
                      <code className="text-xs text-gray-700 dark:text-gray-300 block">
                        {`fg     # Resume`}
                      </code>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-sm font-bold text-blue-700 dark:text-blue-300">History</div>
                      <code className="text-xs text-gray-700 dark:text-gray-300 block mt-2">
                        {`history   # View`}
                      </code>
                      <code className="text-xs text-gray-700 dark:text-gray-300 block">
                        {`!vim     # Rerun`}
                      </code>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="text-sm font-bold text-purple-700 dark:text-purple-300">Tab Completion</div>
                      <code className="text-xs text-gray-700 dark:text-gray-300 block mt-2">
                        {`cd /et<Tab>`}
                      </code>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Expands to /etc/
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === "nonInteractive" && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Non-Interactive Shell Usage
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    When Abhronila's cron job runs her backup script at 2 AM, it uses non-interactive mode:
                  </p>
                  
                  <ShellFileLoader
                    fileModule={nonInteractiveExample1}
                    title="Non-Interactive Script Example"
                    highlightLines={[1, 3, 6, 9]}
                  />
                  
                  <div className="mt-6 p-6 bg-teal-50 dark:bg-teal-900/20 rounded-xl">
                    <h4 className="font-bold text-lg text-teal-800 dark:text-teal-300 mb-3">
                      Common Non-Interactive Use Cases
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <span className="text-teal-500 mt-1">•</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          <strong>Cron jobs:</strong> Scheduled tasks running without user intervention
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-500 mt-1">•</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          <strong>CI/CD pipelines:</strong> Automated testing and deployment scripts
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-500 mt-1">•</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          <strong>SSH command execution:</strong> 
                          <code className="text-xs ml-2 text-gray-600 dark:text-gray-400">
                            {`ssh user@host "command"`
                          }</code>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-teal-500 mt-1">•</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          <strong>Shell within scripts:</strong> 
                          <code className="text-xs ml-2 text-gray-600 dark:text-gray-400">
                            {`$(command)`}
                          </code> or 
                          <code className="text-xs ml-2 text-gray-600 dark:text-gray-400">
                            {``}
                          </code>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              
              {activeTab === "detection" && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Detecting Shell Mode Programmatically
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Sometimes scripts need to know which mode they're running in, especially when 
                    Swadeep at Barrackpore college writes scripts that behave differently in each mode.
                  </p>
                  
                  <ShellFileLoader
                    fileModule={startupTest}
                    title="Detecting Interactive vs Non-Interactive"
                    highlightLines={[3, 6, 9, 12, 15]}
                  />
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
                      <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-3">
                        Environment Variables for Detection
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <code className="text-sm text-emerald-600 dark:text-emerald-400">
                            {`$PS1`}
                          </code>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Set in interactive shells (primary prompt)
                          </p>
                        </div>
                        <div>
                          <code className="text-sm text-emerald-600 dark:text-emerald-400">
                            {`$-`}
                          </code>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Contains 'i' if shell is interactive
                          </p>
                        </div>
                        <div>
                          <code className="text-sm text-emerald-600 dark:text-emerald-400">
                            {`tty -s`}
                          </code>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Exit code indicates if connected to terminal
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                      <h4 className="font-bold text-lg text-blue-800 dark:text-blue-300 mb-3">
                        Practical Detection Code
                      </h4>
                      <pre className="text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-4 rounded-lg">
{`# Check if interactive
if [[ $- == *i* ]]; then
    echo "Interactive shell"
else
    echo "Non-interactive shell"
fi

# Alternative method
if [ -t 0 ]; then
    echo "Connected to terminal"
fi

# Check for PS1 (most reliable)
if [ -z "$PS1" ]; then
    # Non-interactive
    : # Do non-interactive things
else
    # Interactive
    : # Do interactive things
fi`}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Login vs Non-Login Shells */}
        <section 
          className="motion-safe:fade-slide-up opacity-0"
          style={{ animationDelay: "0.3s" }}
        >
          <div 
            className={clsx(
              "bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg transition-all duration-500",
              "hover:shadow-2xl hover:scale-[1.002] border border-gray-200 dark:border-gray-700",
              hoveredCard === 2 && "ring-2 ring-amber-500 dark:ring-amber-400"
            )}
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">
              Login Shells vs Non-Login Shells
            </h2>
            
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center">
                      <span className="text-amber-600 dark:text-amber-400 font-bold text-xl">L</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                      Login Shell
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400">
                    A shell started when you <strong>authenticate</strong> to the system. When Tuhina logs into 
                    her Shyamnagar college workstation via SSH or console—that's a login shell.
                  </p>
                  
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                    <h4 className="font-bold text-amber-700 dark:text-amber-300 mb-2">
                      How to Identify:
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                        <code className="text-sm text-gray-700 dark:text-gray-300">
                          {`bash --login`}
                        </code>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                        <code className="text-sm text-gray-700 dark:text-gray-300">
                          {`su - username`}
                        </code>
                        <span className="text-xs text-gray-500">(with hyphen)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          SSH session start
                        </span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-2">
                      Reads these startup files:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded-full text-sm">
                        /etc/profile
                      </span>
                      <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded-full text-sm">
                        ~/.bash_profile
                      </span>
                      <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded-full text-sm">
                        ~/.bash_login
                      </span>
                      <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded-full text-sm">
                        ~/.profile
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
                      <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xl">N</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                      Non-Login Shell
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400">
                    A shell started <strong>without authentication</strong>. When Debangshu opens a new terminal 
                    tab in his Naihati lab or runs a script—that's a non-login shell.
                  </p>
                  
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                    <h4 className="font-bold text-indigo-700 dark:text-indigo-300 mb-2">
                      How to Identify:
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                        <code className="text-sm text-gray-700 dark:text-gray-300">
                          {`bash`}
                        </code>
                        <span className="text-xs text-gray-500">(without --login)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                        <code className="text-sm text-gray-700 dark:text-gray-300">
                          {`su username`}
                        </code>
                        <span className="text-xs text-gray-500">(without hyphen)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          New terminal window/tab
                        </span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-2">
                      Reads these startup files:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-sm">
                        ~/.bashrc
                      </span>
                      <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-sm">
                        /etc/bash.bashrc
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <ShellFileLoader
                fileModule={loginShellExample}
                title="Login Shell Environment Test"
                highlightLines={[1, 3, 6, 9, 12]}
              />
              
              <div className="p-6 bg-gradient-to-r from-amber-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 rounded-xl border border-amber-200 dark:border-amber-800">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                  Real-World Scenario at Barrackpore College
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Swadeep</strong> logs into the college server via SSH (login shell). His 
                    <code className="mx-1 text-sm text-amber-600 dark:text-amber-400">~/.bash_profile</code>
                    sets up his Java and Python paths.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    He then opens a new terminal tab (non-login shell) where 
                    <code className="mx-1 text-sm text-indigo-600 dark:text-indigo-400">~/.bashrc</code>
                    sets his aliases and prompt. His aliases work but PATH changes from .bash_profile don't 
                    apply unless .bashrc sources .bash_profile.
                  </p>
                  <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-2">
                      Pro Tip: The Universal .bashrc Pattern
                    </h4>
                    <pre className="text-sm text-gray-700 dark:text-gray-300">
{`# In ~/.bashrc
if [ -f ~/.bash_profile ]; then
    . ~/.bash_profile  # Source login config
fi

# Your non-login shell customizations
alias ll='ls -la'
export PS1='\\u@\\h:\\w\\$ '`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive vs Non-Interactive Matrix */}
        <section 
          className="motion-safe:fade-slide-up opacity-0"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">
              The Complete Matrix: 4 Shell Types
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-300 dark:border-gray-700">
                    <th className="pb-4 pr-8 text-lg font-bold text-gray-800 dark:text-gray-100">Type</th>
                    <th className="pb-4 pr-8 text-lg font-bold text-gray-800 dark:text-gray-100">Interactive Login</th>
                    <th className="pb-4 pr-8 text-lg font-bold text-gray-800 dark:text-gray-100">Interactive Non-Login</th>
                    <th className="pb-4 pr-8 text-lg font-bold text-gray-800 dark:text-gray-100">Non-Interactive Login</th>
                    <th className="pb-4 text-lg font-bold text-gray-800 dark:text-gray-100">Non-Interactive Non-Login</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="py-4 pr-8 font-bold text-emerald-600 dark:text-emerald-400">Example</td>
                    <td className="py-4 pr-8">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                          <span>SSH login</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                          <span>Console login</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 pr-8">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span>New terminal tab</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span>GUI terminal</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 pr-8">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                          <span>
                            <code className="text-xs">ssh host "script.sh"</code>
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                          <span>Cron job</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                          <span>Script execution</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  
                  <tr>
                    <td className="py-4 pr-8 font-bold text-emerald-600 dark:text-emerald-400">Prompt</td>
                    <td className="py-4 pr-8">
                      <code className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded text-sm">Yes</code>
                    </td>
                    <td className="py-4 pr-8">
                      <code className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-sm">Yes</code>
                    </td>
                    <td className="py-4 pr-8">
                      <code className="px-2 py-1 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded text-sm">No</code>
                    </td>
                    <td className="py-4">
                      <code className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded text-sm">No</code>
                    </td>
                  </tr>
                  
                  <tr>
                    <td className="py-4 pr-8 font-bold text-emerald-600 dark:text-emerald-400">Reads .bash_profile</td>
                    <td className="py-4 pr-8">
                      <div className="text-green-500 font-bold">✓</div>
                    </td>
                    <td className="py-4 pr-8">
                      <div className="text-gray-400">✗</div>
                    </td>
                    <td className="py-4 pr-8">
                      <div className="text-green-500 font-bold">✓</div>
                    </td>
                    <td className="py-4">
                      <div className="text-gray-400">✗</div>
                    </td>
                  </tr>
                  
                  <tr>
                    <td className="py-4 pr-8 font-bold text-emerald-600 dark:text-emerald-400">Reads .bashrc</td>
                    <td className="py-4 pr-8">
                      <div className="text-gray-400">✗</div>
                      <span className="text-xs text-gray-500">(unless sourced)</span>
                    </td>
                    <td className="py-4 pr-8">
                      <div className="text-green-500 font-bold">✓</div>
                    </td>
                    <td className="py-4 pr-8">
                      <div className="text-gray-400">✗</div>
                    </td>
                    <td className="py-4">
                      <div className="text-gray-400">✗</div>
                    </td>
                  </tr>
                  
                  <tr>
                    <td className="py-4 pr-8 font-bold text-emerald-600 dark:text-emerald-400">Job Control</td>
                    <td className="py-4 pr-8">
                      <div className="text-green-500 font-bold">✓</div>
                    </td>
                    <td className="py-4 pr-8">
                      <div className="text-green-500 font-bold">✓</div>
                    </td>
                    <td className="py-4 pr-8">
                      <div className="text-gray-400">✗</div>
                    </td>
                    <td className="py-4">
                      <div className="text-gray-400">✗</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 rounded-xl border border-emerald-200 dark:border-emerald-800">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Memory Aid: Tuhina's College Routine
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-emerald-500 font-bold mt-1">•</span>
                  <div>
                    <strong className="text-gray-800 dark:text-gray-100">Morning SSH login</strong>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      Tuhina logs into college server = <strong>Interactive Login</strong> (reads .bash_profile)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-500 font-bold mt-1">•</span>
                  <div>
                    <strong className="text-gray-800 dark:text-gray-100">Opens new terminal tab</strong>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      To run Python script = <strong>Interactive Non-Login</strong> (reads .bashrc)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-indigo-500 font-bold mt-1">•</span>
                  <div>
                    <strong className="text-gray-800 dark:text-gray-100">Nightly backup runs</strong>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      Cron executes script = <strong>Non-Interactive Non-Login</strong> (reads neither)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Pitfalls */}
        <section 
          className="motion-safe:fade-slide-up opacity-0"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-8 border border-red-200 dark:border-red-800">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-100 dark:bg-red-900 rounded-xl">
                <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.342 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                Common Pitfalls & Debugging
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-red-700 dark:text-red-300">
                  Beginner Mistakes
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-red-200 dark:border-red-800">
                    <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">
                      "My aliases don't work in SSH!"
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      <strong>Problem:</strong> Aliases in .bashrc but SSH starts login shell (reads .bash_profile)
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
                      <strong>Solution:</strong> Source .bashrc from .bash_profile or use .bash_profile for aliases
                    </p>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-red-200 dark:border-red-800">
                    <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">
                      "Script works manually but fails in cron!"
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      <strong>Problem:</strong> Cron runs non-interactive non-login shell (no .bashrc/.bash_profile)
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
                      <strong>Solution:</strong> Set full PATH and environment in script or use wrapper script
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-red-700 dark:text-red-300">
                  Debugging Commands
                </h3>
                <div className="space-y-3">
                  <code className="text-sm text-gray-700 dark:text-gray-300 block p-3 bg-gray-50 dark:bg-gray-900 rounded">
                    {`echo $0          # Prints shell name with leading dash for login`}
                  </code>
                  <code className="text-sm text-gray-700 dark:text-gray-300 block p-3 bg-gray-50 dark:bg-gray-900 rounded">
                    {`shopt -q login_shell && echo "Login" || echo "Non-login"`}
                  </code>
                  <code className="text-sm text-gray-700 dark:text-gray-300 block p-3 bg-gray-50 dark:bg-gray-900 rounded">
                    {`[[ $- == *i* ]] && echo "Interactive" || echo "Non-interactive"`}
                  </code>
                  <code className="text-sm text-gray-700 dark:text-gray-300 block p-3 bg-gray-50 dark:bg-gray-900 rounded">
                    {`echo "PS1: $PS1"  # Empty in non-interactive`}
                  </code>
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-2">
                    Hint Section
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>Think about:</strong> Why does 
                    <code className="mx-1 text-sm text-gray-700 dark:text-gray-300">su - username</code> 
                    behave differently from 
                    <code className="mx-1 text-sm text-gray-700 dark:text-gray-300">su username</code>?
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    <strong>Observe carefully:</strong> Check your environment variables in different shell types. 
                    Notice which ones are missing in non-interactive mode.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section 
          className="motion-safe:fade-slide-up opacity-0"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-8 border border-emerald-200 dark:border-emerald-800">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">
              Best Practices & Professional Habits
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-emerald-700 dark:text-emerald-300">
                  Configuration Strategy
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-2">
                      The Unified Approach
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Keep environment variables in .bash_profile, aliases in .bashrc, and source .bash_profile from .bashrc
                    </p>
                    <pre className="text-xs text-gray-700 dark:text-gray-300 mt-3 bg-gray-50 dark:bg-gray-900 p-3 rounded">
{`# ~/.bash_profile
export JAVA_HOME=/usr/lib/jvm/java-11
export PATH="$JAVA_HOME/bin:$PATH"

# ~/.bashrc
if [ -f ~/.bash_profile ]; then
    . ~/.bash_profile
fi
alias ll='ls -la'
alias gs='git status'`}
                    </pre>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-2">
                      Script Portability
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Always set PATH and environment in scripts that might run non-interactively
                    </p>
                    <pre className="text-xs text-gray-700 dark:text-gray-300 mt-3 bg-gray-50 dark:bg-gray-900 p-3 rounded">
{`#!/bin/bash
# Set environment explicitly
export PATH="/usr/local/bin:/usr/bin:/bin"
export LANG="en_US.UTF-8"
# Rest of script...`}
                    </pre>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-emerald-700 dark:text-emerald-300">
                  Testing & Verification
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-2">
                      Test in All Modes
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-500 mt-1">→</span>
                        <span>Test scripts with 
                          <code className="mx-1 text-xs">bash -c "your_script"</code>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-500 mt-1">→</span>
                        <span>Test login shell behavior with 
                          <code className="mx-1 text-xs">bash --login -c "echo test"</code>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-500 mt-1">→</span>
                        <span>Simulate cron with 
                          <code className="mx-1 text-xs">env -i /bin/bash your_script.sh</code>
                        </span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-2">
                      Debug Wrapper Script
                    </h4>
                    <pre className="text-xs text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 p-3 rounded">
{`#!/bin/bash
# debug_wrapper.sh - Test script in different modes
echo "=== Testing in different modes ==="
echo "1. Interactive Login:"
bash --login -i <<'EOF'
    echo "  PS1: \$PS1"
    echo "  Shell type: \$0"
EOF

echo -e "\n2. Non-Interactive Non-Login:"
bash -c "echo '  PS1: \$PS1'; echo '  Shell type: \$0'"`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teacher's Note */}
        <section 
          className="motion-safe:fade-slide-up opacity-0"
          style={{ animationDelay: "0.7s" }}
        >
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-xl border-2 border-emerald-200 dark:border-emerald-800 transition-all duration-500 hover:shadow-2xl hover:border-emerald-300 dark:hover:border-emerald-600">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-1/4">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-1 rounded-xl inline-block">
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-lg">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900 dark:to-teal-900 rounded-full flex items-center justify-center">
                      <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-300">SH</span>
                    </div>
                    <h4 className="text-center font-bold text-lg mt-4 text-gray-800 dark:text-gray-100">
                      Sukanta Hui
                    </h4>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                      27 Years Experience
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="md:w-3/4">
                <div className="flex items-center gap-3 mb-6">
                  <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Teacher's Note
                  </h3>
                </div>
                
                <div className="space-y-6">
                  <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-emerald-100 dark:border-emerald-900">
                    <h4 className="font-bold text-lg text-emerald-700 dark:text-emerald-300 mb-4">
                      The #1 Debugging Skill in Shell Scripting
                    </h4>
                    
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      In my 27 years teaching at Ichapur and Barrackpore institutes, I've seen this pattern 
                      countless times: <strong>A script works perfectly when run manually but fails in cron.</strong>
                    </p>
                    
                    <div className="mb-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border-l-4 border-amber-500">
                      <p className="text-amber-800 dark:text-amber-300">
                        <strong>Reason:</strong> Interactive shells inherit your environment—PATH, variables, 
                        current directory. Non-interactive shells start with a clean environment.
                      </p>
                    </div>
                    
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="text-emerald-500 font-bold mt-1">•</span>
                        <div>
                          <strong className="text-gray-800 dark:text-gray-100">Always test in clean environment:</strong>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                            Use <code className="text-xs">env -i bash script.sh</code> to simulate cron environment
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-emerald-500 font-bold mt-1">•</span>
                        <div>
                          <strong className="text-gray-800 dark:text-gray-100">The hyphen matters:</strong>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                            When Swadeep uses <code className="text-xs">su - user</code> (with hyphen), 
                            he gets a login shell with that user's environment. Without hyphen, he keeps 
                            his own environment.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-emerald-500 font-bold mt-1">•</span>
                        <div>
                          <strong className="text-gray-800 dark:text-gray-100">SSH command execution is tricky:</strong>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                            <code className="text-xs">ssh host "command"</code> runs a non-interactive login shell. 
                            Tuhina at Shyamnagar needs to know it reads .bash_profile but not .bashrc.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="pt-6 border-t border-emerald-200 dark:border-emerald-800">
                    <p className="text-gray-600 dark:text-gray-400 italic">
                      "Remember: Shell type determines environment inheritance. Interactive shells know about you, 
                      non-interactive shells don't. Login shells authenticate, non-login shells inherit. 
                      Master these distinctions, and you'll debug 80% of shell environment issues."
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="text-sm px-3 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-full">
                        Email: sukantahui@codernaccotax.co.in
                      </span>
                      <span className="text-sm px-3 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-full">
                        Mobile: 7003756860
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mini Checklist */}
        <section 
          className="motion-safe:fade-slide-up opacity-0"
          style={{ animationDelay: "0.8s" }}
        >
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-8">
              Mini Checklist: Shell Mode Mastery
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Interactive Shell</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <span className="text-emerald-600 font-bold">✓</span>
                    </div>
                    <span>Has PS1 variable set</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <span className="text-emerald-600 font-bold">✓</span>
                    </div>
                    <span>Supports job control</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <span className="text-emerald-600 font-bold">✓</span>
                    </div>
                    <span>Reads from terminal</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Login Shell</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <span className="text-teal-600 font-bold">✓</span>
                    </div>
                    <span>Reads .bash_profile</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <span className="text-teal-600 font-bold">✓</span>
                    </div>
                    <span>Shell name starts with "-"</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <span className="text-teal-600 font-bold">✓</span>
                    </div>
                    <span>Authenticates user</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Debugging Steps</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <span className="text-white bg-blue-600 rounded-full font-bold p-1">1</span>
                    </div>
                    <span>Check $- for 'i'</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <span className="text-white bg-blue-600 rounded-full font-bold p-1">2</span>
                    </div>
                    <span>Test with env -i</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <span className="text-white bg-blue-600 rounded-full font-bold p-1">3</span>
                    </div>
                    <span>Check shell name ($0)</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-white/20 rounded-xl backdrop-blur-sm">
              <h4 className="text-xl font-bold mb-4">Next Topic Preview</h4>
              <p className="opacity-90">
                <strong>Topic 2:</strong> Bash startup files (.bashrc, .bash_profile, .profile). 
                Learn exactly when each file loads and how to organize your shell configuration properly.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p>© Shell Scripting Mastery • Topic 1: Shell Modes • Barrackpore Learning Series</p>
          <p className="text-sm mt-2">Real examples from Shyamnagar, Ichapur, and Naihati college environments</p>
        </div>
      </footer>
    </div>
  );
}