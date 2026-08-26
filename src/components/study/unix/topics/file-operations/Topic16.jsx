import React, { Component } from 'react';
import clsx from 'clsx';

export default class Topic16 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: false,
      expandedSections: {
        overview: true,
        installation: false,
        benefits: false,
        useCases: false,
        limitations: false,
        bestPractices: false
      },
      activeWslVersion: 'WSL2'
    };
  }

  componentDidMount() {
    // Check for prefers-color-scheme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.setState({ isDarkMode: true });
    }

    // Setup initial animations
    this.setupRevealAnimations();
  }

  setupRevealAnimations() {
    // Simulate initial animations
    setTimeout(() => {
      const elements = document.querySelectorAll('.reveal-section');
      elements.forEach((el, index) => {
        el.style.animationDelay = `${index * 100}ms`;
        el.classList.add('animate-[fadeIn_0.8s_ease-out_forwards]');
      });
    }, 300);
  }

  toggleSection = (section) => {
    this.setState(prevState => ({
      expandedSections: {
        ...prevState.expandedSections,
        [section]: !prevState.expandedSections[section]
      }
    }));
  }

  toggleDarkMode = () => {
    this.setState(prevState => ({ isDarkMode: !prevState.isDarkMode }));
  }

  setWslVersion = (version) => {
    this.setState({ activeWslVersion: version });
  }

  render() {
    const { isDarkMode, expandedSections, activeWslVersion } = this.state;

    const containerClasses = clsx(
      'min-h-screen transition-all duration-500',
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 to-blue-900/20 text-gray-100' 
        : 'bg-gradient-to-br from-cyan-50 to-blue-50 text-gray-800'
    );

    const cardClasses = clsx(
      'rounded-2xl p-6 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl',
      isDarkMode 
        ? 'bg-gray-800/70 backdrop-blur-sm hover:bg-gray-700/80 hover:shadow-cyan-500/10' 
        : 'bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-cyan-200/50'
    );

    const headingClasses = clsx(
      'text-3xl font-bold mb-2',
      isDarkMode ? 'text-cyan-300' : 'text-cyan-700'
    );

    const teacherNoteClasses = clsx(
      'border-l-4 rounded-r-lg p-5 transition-all duration-300 hover:scale-[1.02]',
      isDarkMode 
        ? 'bg-cyan-900/30 border-cyan-400 hover:bg-cyan-900/50' 
        : 'bg-cyan-50 border-cyan-500 hover:bg-cyan-100'
    );

    const stepCardClasses = clsx(
      'rounded-xl p-4 transition-all duration-300 hover:translate-y-[-4px]',
      isDarkMode 
        ? 'bg-gray-700/50 hover:bg-gray-600/60 hover:shadow-lg hover:shadow-cyan-500/10' 
        : 'bg-white/90 hover:bg-white hover:shadow-lg hover:shadow-cyan-200/50'
    );

    const wsl1Color = isDarkMode ? 'rgb(59 130 246)' : 'rgb(37 99 235)';
    const wsl2Color = isDarkMode ? 'rgb(34 197 94)' : 'rgb(22 163 74)';

    return (
      <div className={containerClasses}>
        <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes pulseGlow {
            0%, 100% {
              filter: drop-shadow(0 0 2px rgba(34, 211, 238, 0.5));
            }
            50% {
              filter: drop-shadow(0 0 8px rgba(34, 211, 238, 0.8));
            }
          }

          @keyframes slideInFromRight {
            from {
              opacity: 0;
              transform: translateX(30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          @keyframes connectDots {
            to {
              stroke-dashoffset: 0;
            }
          }

          /* Reduced motion support */
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}</style>

        {/* Header */}
        <header className="pt-8 pb-6 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={this.toggleDarkMode}
                className={clsx(
                  'px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105',
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                    : 'bg-cyan-100 hover:bg-cyan-200 text-cyan-700'
                )}
              >
                {isDarkMode ? '🌙 Dark' : '☀️ Light'}
              </button>
            </div>

            <div className="reveal-section">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-[slideInFromRight_0.8s_ease-out_forwards]">
                <span className={isDarkMode ? 'text-cyan-300' : 'text-cyan-600'}>
                  Topic 2: 
                </span>
                <span className={isDarkMode ? 'text-gray-100' : 'text-gray-800'}>
                  {' '}Windows Subsystem for Linux (WSL)
                </span>
              </h1>
              <p className="text-xl opacity-80 animate-[slideInFromRight_0.8s_ease-out_0.2s_forwards]">
                Running Linux tools directly on Windows without dual-boot or virtual machines
              </p>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 pb-16">
          {/* Teacher's Note */}
          <section className="mb-10 reveal-section">
            <div className={teacherNoteClasses}>
              <div className="flex items-start gap-4">
                <div className={clsx(
                  'p-3 rounded-lg transition-all duration-300 hover:animate-[pulseGlow_1.5s_ease-in-out]',
                  isDarkMode ? 'bg-cyan-800/50' : 'bg-cyan-100'
                )}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Teacher's Note</h3>
                  <p className="mb-2">
                    WSL is a game-changer for students like Swadeep and Tuhina who want to learn Linux but don't want to leave their familiar Windows environment. Remember that when Abhronila from Barrackpore first tried to install Linux separately, she struggled with driver issues. WSL solved this perfectly!
                  </p>
                  <div className={clsx(
                    'text-sm mt-3 p-3 rounded',
                    isDarkMode ? 'bg-gray-700/30' : 'bg-cyan-100/50'
                  )}>
                    <strong>Pro Tip:</strong> Use WSL for development and learning, but for production servers or kernel development, consider a dedicated Linux installation. Debangshu made this mistake last month when trying to deploy his web application directly from WSL.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Overview Section */}
          <section className="mb-10">
            <button 
              onClick={() => this.toggleSection('overview')}
              className="w-full text-left mb-4"
            >
              <h2 className={clsx(
                'text-2xl font-bold flex items-center gap-3 transition-all duration-300 hover:gap-4',
                expandedSections.overview 
                  ? (isDarkMode ? 'text-cyan-300' : 'text-cyan-600')
                  : (isDarkMode ? 'text-gray-300' : 'text-gray-700')
              )}>
                <span className={clsx(
                  'transition-transform duration-300',
                  expandedSections.overview ? 'rotate-90' : ''
                )}>▶</span>
                What is WSL? Conceptual Foundation
              </h2>
            </button>

            {expandedSections.overview && (
              <div className="reveal-section">
                <div className={cardClasses}>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className={headingClasses}>Windows Subsystem for Linux</h3>
                      <p className="mb-4 leading-relaxed">
                        <strong>Signature:</strong> Compatibility layer between Windows and Linux
                      </p>
                      <p className="mb-4 leading-relaxed">
                        <strong>Return Type:</strong> Native Linux binary execution on Windows
                      </p>
                      <p className="mb-4 leading-relaxed">
                        <strong>Purpose:</strong> To run Linux command-line tools, utilities, and applications directly on Windows without the overhead of a virtual machine.
                      </p>
                      <p className="mb-4 leading-relaxed">
                        <strong>When & Why Used:</strong> When developers or students need Linux tools for development, testing, or learning while staying in their primary Windows environment.
                      </p>
                    </div>
                    
                    <div className={stepCardClasses}>
                      <h4 className="text-lg font-semibold mb-3">Architecture Visualization</h4>
                      <div className="flex justify-center">
                        <svg width="320" height="180" className="overflow-visible">
                          <defs>
                            <linearGradient id="windowsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" style={{stopColor: isDarkMode ? '#0078d4' : '#0078d4', stopOpacity: 0.8}} />
                              <stop offset="100%" style={{stopColor: isDarkMode ? '#005a9e' : '#005a9e', stopOpacity: 0.8}} />
                            </linearGradient>
                            <linearGradient id="linuxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" style={{stopColor: isDarkMode ? '#fcc624' : '#fcc624', stopOpacity: 0.8}} />
                              <stop offset="100%" style={{stopColor: isDarkMode ? '#a51c30' : '#a51c30', stopOpacity: 0.8}} />
                            </linearGradient>
                          </defs>
                          
                          {/* Windows Box */}
                          <rect x="20" y="40" width="120" height="100" rx="10" fill="url(#windowsGrad)" stroke={isDarkMode ? '#93c5fd' : '#1d4ed8'} strokeWidth="2">
                            <animate attributeName="y" values="40;35;40" dur="3s" repeatCount="indefinite" />
                          </rect>
                          <text x="80" y="100" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Windows OS</text>
                          
                          {/* Linux Box */}
                          <rect x="180" y="40" width="120" height="100" rx="10" fill="url(#linuxGrad)" stroke={isDarkMode ? '#86efac' : '#16a34a'} strokeWidth="2">
                            <animate attributeName="y" values="40;35;40" dur="3s" repeatCount="indefinite" begin="1s" />
                          </rect>
                          <text x="240" y="100" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Linux Tools</text>
                          
                          {/* Connection Arrows */}
                          <line x1="140" y1="90" x2="180" y2="90" stroke={isDarkMode ? '#c084fc' : '#9333ea'} strokeWidth="3" strokeDasharray="10,5">
                            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
                          </line>
                          <polygon points="175,85 180,90 175,95" fill={isDarkMode ? '#c084fc' : '#9333ea'} />
                          
                          {/* WSL Bridge */}
                          <rect x="140" y="75" width="40" height="30" rx="5" fill={isDarkMode ? '#4f46e5' : '#4f46e5'} opacity="0.9">
                            <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite" />
                          </rect>
                          <text x="160" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">WSL</text>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-700/30">
                    <h4 className="text-xl font-semibold mb-4">How It Works Internally</h4>
                    <p className="mb-4 leading-relaxed">
                      WSL provides a Linux-compatible kernel interface that translates Linux system calls to Windows NT kernel calls. This allows Linux binaries to run unmodified on Windows. When Tuhina from Shyamnagar runs <code className={isDarkMode ? 'bg-gray-700 px-2 py-1 rounded' : 'bg-gray-100 px-2 py-1 rounded'}>gcc</code> in WSL, it's actually running the same GCC binary that would run on Ubuntu, but the system calls are handled by Windows.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* WSL Versions Comparison */}
          <section className="mb-10">
            <div className={cardClasses}>
              <h2 className="text-2xl font-bold mb-6">WSL1 vs WSL2: Key Differences</h2>
              
              <div className="mb-6 flex justify-center space-x-4">
                <button
                  onClick={() => this.setWslVersion('WSL1')}
                  className={clsx(
                    'px-6 py-3 rounded-lg font-bold transition-all duration-300',
                    activeWslVersion === 'WSL1'
                      ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                      : (isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300')
                  )}
                >
                  WSL 1
                </button>
                <button
                  onClick={() => this.setWslVersion('WSL2')}
                  className={clsx(
                    'px-6 py-3 rounded-lg font-bold transition-all duration-300',
                    activeWslVersion === 'WSL2'
                      ? (isDarkMode ? 'bg-green-600 text-white' : 'bg-green-500 text-white')
                      : (isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300')
                  )}
                >
                  WSL 2
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Architecture */}
                <div className={stepCardClasses}>
                  <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <span className={clsx(
                      'p-2 rounded',
                      isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'
                    )}>🏗️</span>
                    Architecture
                  </h4>
                  {activeWslVersion === 'WSL1' ? (
                    <p className="text-sm">
                      <strong>Translation Layer:</strong> Converts Linux syscalls to Windows NT calls
                    </p>
                  ) : (
                    <p className="text-sm">
                      <strong>Lightweight VM:</strong> Real Linux kernel in a managed VM
                    </p>
                  )}
                </div>

                {/* Performance */}
                <div className={stepCardClasses}>
                  <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <span className={clsx(
                      'p-2 rounded',
                      isDarkMode ? 'bg-green-900/50' : 'bg-green-100'
                    )}>⚡</span>
                    Performance
                  </h4>
                  {activeWslVersion === 'WSL1' ? (
                    <p className="text-sm">
                      <strong>Faster:</strong> File operations between Windows/Linux
                    </p>
                  ) : (
                    <p className="text-sm">
                      <strong>Faster:</strong> Linux system calls and Docker
                    </p>
                  )}
                </div>

                {/* Compatibility */}
                <div className={stepCardClasses}>
                  <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <span className={clsx(
                      'p-2 rounded',
                      isDarkMode ? 'bg-purple-900/50' : 'bg-purple-100'
                    )}>🔧</span>
                    Compatibility
                  </h4>
                  {activeWslVersion === 'WSL1' ? (
                    <p className="text-sm">
                      <strong>Limited:</strong> Some system calls not supported
                    </p>
                  ) : (
                    <p className="text-sm">
                      <strong>Full:</strong> 100% system call compatibility
                    </p>
                  )}
                </div>
              </div>

              {/* Visual Comparison */}
              <div className="mt-8 p-4 rounded-lg bg-gray-800/20">
                <div className="flex items-center justify-center mb-4">
                  <svg width="400" height="100">
                    {/* WSL1 Line */}
                    <line 
                      x1="50" 
                      y1="30" 
                      x2="350" 
                      y2="30" 
                      stroke={wsl1Color} 
                      strokeWidth="4" 
                      strokeDasharray="10,5"
                    >
                      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
                    </line>
                    <circle cx="50" cy="30" r="8" fill={wsl1Color}>
                      <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="350" cy="30" r="8" fill={wsl1Color}>
                      <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" begin="1s" />
                    </circle>
                    <text x="200" y="25" textAnchor="middle" fill={isDarkMode ? '#93c5fd' : '#1d4ed8'} fontSize="12">
                      WSL1: Syscall Translation
                    </text>

                    {/* WSL2 Line */}
                    <line 
                      x1="50" 
                      y1="70" 
                      x2="350" 
                      y2="70" 
                      stroke={wsl2Color} 
                      strokeWidth="4"
                    >
                      <animate attributeName="stroke-dashoffset" from="400" to="0" dur="2s" repeatCount="indefinite" begin="0.5s" />
                    </line>
                    <circle cx="50" cy="70" r="8" fill={wsl2Color}>
                      <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" begin="0.5s" />
                    </circle>
                    <circle cx="350" cy="70" r="8" fill={wsl2Color}>
                      <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" begin="1.5s" />
                    </circle>
                    <text x="200" y="65" textAnchor="middle" fill={isDarkMode ? '#86efac' : '#16a34a'} fontSize="12">
                      WSL2: Real Linux Kernel
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </section>

          {/* Installation Guide */}
          <section className="mb-10">
            <button 
              onClick={() => this.toggleSection('installation')}
              className="w-full text-left mb-4"
            >
              <h2 className={clsx(
                'text-2xl font-bold flex items-center gap-3 transition-all duration-300 hover:gap-4',
                expandedSections.installation 
                  ? (isDarkMode ? 'text-green-300' : 'text-green-600')
                  : (isDarkMode ? 'text-gray-300' : 'text-gray-700')
              )}>
                <span className={clsx(
                  'transition-transform duration-300',
                  expandedSections.installation ? 'rotate-90' : ''
                )}>▶</span>
                Step-by-Step Installation Guide
              </h2>
            </button>

            {expandedSections.installation && (
              <div className="grid md:grid-cols-2 gap-6 reveal-section">
                {/* Step 1 */}
                <div className={stepCardClasses}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className={clsx(
                      'p-3 rounded-lg font-bold text-lg',
                      isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'
                    )}>1</div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Enable Windows Features</h4>
                      <p className="text-sm mb-3">Open PowerShell as Administrator:</p>
                      <code className={clsx(
                        'block p-3 rounded-lg mb-3 font-mono text-sm transition-all duration-300 hover:scale-[1.02]',
                        isDarkMode ? 'bg-gray-700/70 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                      )}>
                        dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
                      </code>
                      <p className="text-sm opacity-80">Enables the WSL platform</p>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className={stepCardClasses}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className={clsx(
                      'p-3 rounded-lg font-bold text-lg',
                      isDarkMode ? 'bg-green-900/50' : 'bg-green-100'
                    )}>2</div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Enable Virtualization</h4>
                      <p className="text-sm mb-3">For WSL2 (in same PowerShell):</p>
                      <code className={clsx(
                        'block p-3 rounded-lg mb-3 font-mono text-sm transition-all duration-300 hover:scale-[1.02]',
                        isDarkMode ? 'bg-gray-700/70 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                      )}>
                        dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
                      </code>
                      <p className="text-sm opacity-80">Required for WSL2's lightweight VM</p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className={stepCardClasses}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className={clsx(
                      'p-3 rounded-lg font-bold text-lg',
                      isDarkMode ? 'bg-purple-900/50' : 'bg-purple-100'
                    )}>3</div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Download Linux Kernel</h4>
                      <p className="text-sm mb-3">Download from Microsoft Store:</p>
                      <div className="p-3 rounded bg-gray-800/20 mb-3">
                        <p className="font-semibold text-sm">Available Distributions:</p>
                        <ul className="text-sm list-disc pl-5 mt-1 space-y-1">
                          <li>Ubuntu (Most popular for beginners)</li>
                          <li>Debian (Lightweight)</li>
                          <li>Kali Linux (Security testing)</li>
                          <li>OpenSUSE</li>
                        </ul>
                      </div>
                      <p className="text-sm opacity-80">Swadeep chose Ubuntu for his web development course</p>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className={stepCardClasses}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className={clsx(
                      'p-3 rounded-lg font-bold text-lg',
                      isDarkMode ? 'bg-yellow-900/50' : 'bg-yellow-100'
                    )}>4</div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Set Default Version</h4>
                      <p className="text-sm mb-3">Set WSL2 as default:</p>
                      <code className={clsx(
                        'block p-3 rounded-lg mb-3 font-mono text-sm transition-all duration-300 hover:scale-[1.02]',
                        isDarkMode ? 'bg-gray-700/70 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                      )}>
                        wsl --set-default-version 2
                      </code>
                      <p className="text-sm opacity-80">Restart computer after this step</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Benefits Section */}
          <section className="mb-10">
            <button 
              onClick={() => this.toggleSection('benefits')}
              className="w-full text-left mb-4"
            >
              <h2 className={clsx(
                'text-2xl font-bold flex items-center gap-3 transition-all duration-300 hover:gap-4',
                expandedSections.benefits 
                  ? (isDarkMode ? 'text-emerald-300' : 'text-emerald-600')
                  : (isDarkMode ? 'text-gray-300' : 'text-gray-700')
              )}>
                <span className={clsx(
                  'transition-transform duration-300',
                  expandedSections.benefits ? 'rotate-90' : ''
                )}>▶</span>
                Benefits & Helping Nature
              </h2>
            </button>

            {expandedSections.benefits && (
              <div className="reveal-section">
                <div className={cardClasses}>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold mb-4">For Students Who Don't Want Separate Linux</h3>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <span className={clsx(
                            'mt-1 p-2 rounded-lg',
                            isDarkMode ? 'bg-emerald-900/50' : 'bg-emerald-100'
                          )}>🎯</span>
                          <div>
                            <strong>No Partitioning Required</strong>
                            <p className="text-sm opacity-80">Abhronila from Ichapur didn't have to risk her Windows partition</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className={clsx(
                            'mt-1 p-2 rounded-lg',
                            isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'
                          )}>🚫</span>
                          <div>
                            <strong>No Driver Issues</strong>
                            <p className="text-sm opacity-80">Debangshu's WiFi worked immediately unlike his dual-boot attempt</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className={clsx(
                            'mt-1 p-2 rounded-lg',
                            isDarkMode ? 'bg-purple-900/50' : 'bg-purple-100'
                          )}>🔄</span>
                          <div>
                            <strong>Seamless Integration</strong>
                            <p className="text-sm opacity-80">Access Windows files from Linux and vice versa</p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className={stepCardClasses}>
                      <h4 className="text-lg font-bold mb-3">Real Student Experiences</h4>
                      <div className="space-y-4">
                        <div className="p-3 rounded bg-gray-800/20">
                          <p className="font-semibold mb-1">Tuhina - Web Development Student</p>
                          <p className="text-sm">"I could use npm, node, and git in Linux while keeping my design tools in Windows. No switching between OS!"</p>
                        </div>
                        <div className="p-3 rounded bg-gray-800/20">
                          <p className="font-semibold mb-1">Swadeep - Data Science Student</p>
                          <p className="text-sm">"Python packages that failed on Windows installed perfectly in WSL. Jupyter notebooks run faster too!"</p>
                        </div>
                        <div className="p-3 rounded bg-gray-800/20">
                          <p className="font-semibold mb-1">Barrackpore College Lab</p>
                          <p className="text-sm">"We installed WSL on all lab computers. Students can learn Linux commands without separate machines."</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Integration Diagram */}
                  <div className="mt-8 pt-6 border-t border-gray-700/30">
                    <h4 className="text-xl font-semibold mb-4">Filesystem Integration</h4>
                    <div className="flex justify-center">
                      <svg width="400" height="150">
                        {/* Windows Access */}
                        <rect x="50" y="30" width="140" height="40" rx="5" fill={isDarkMode ? '#1e40af' : '#1e3a8a'} opacity="0.8">
                          <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                        </rect>
                        <text x="120" y="55" textAnchor="middle" fill="white" fontSize="12">Windows Explorer</text>
                        <text x="120" y="70" textAnchor="middle" fill="#93c5fd" fontSize="10">Access: \\wsl$\Ubuntu</text>

                        {/* Linux Access */}
                        <rect x="210" y="30" width="140" height="40" rx="5" fill={isDarkMode ? '#166534' : '#14532d'} opacity="0.8">
                          <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" begin="1s" />
                        </rect>
                        <text x="280" y="55" textAnchor="middle" fill="white" fontSize="12">Linux Terminal</text>
                        <text x="280" y="70" textAnchor="middle" fill="#86efac" fontSize="10">Access: /mnt/c/Users</text>

                        {/* Connection */}
                        <line x1="190" y1="50" x2="210" y2="50" stroke={isDarkMode ? '#c084fc' : '#9333ea'} strokeWidth="2">
                          <animate attributeName="stroke-dashoffset" from="40" to="0" dur="2s" repeatCount="indefinite" />
                        </line>

                        {/* Two-way Arrow */}
                        <path d="M200,45 L210,50 L200,55" fill={isDarkMode ? '#c084fc' : '#9333ea'} />
                        <path d="M200,45 L190,50 L200,55" fill={isDarkMode ? '#c084fc' : '#9333ea'} />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Common Use Cases */}
          <section className="mb-10">
            <button 
              onClick={() => this.toggleSection('useCases')}
              className="w-full text-left mb-4"
            >
              <h2 className={clsx(
                'text-2xl font-bold flex items-center gap-3 transition-all duration-300 hover:gap-4',
                expandedSections.useCases 
                  ? (isDarkMode ? 'text-amber-300' : 'text-amber-600')
                  : (isDarkMode ? 'text-gray-300' : 'text-gray-700')
              )}>
                <span className={clsx(
                  'transition-transform duration-300',
                  expandedSections.useCases ? 'rotate-90' : ''
                )}>▶</span>
                Common Use Cases & Scenarios
              </h2>
            </button>

            {expandedSections.useCases && (
              <div className="grid md:grid-cols-2 gap-6 reveal-section">
                {/* Web Development */}
                <div className={stepCardClasses}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className={clsx(
                      'p-3 rounded-lg',
                      isDarkMode ? 'bg-amber-900/50' : 'bg-amber-100'
                    )}>
                      <span className="font-bold">🌐</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Web Development</h4>
                      <p className="text-sm mb-3">Perfect for MERN/MEAN stack development:</p>
                      <ul className="text-sm list-disc pl-5 space-y-1">
                        <li>Node.js & npm work better on Linux</li>
                        <li>Docker containers run natively in WSL2</li>
                        <li>Git commands are more reliable</li>
                        <li>Apache/Nginx server configuration</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Data Science */}
                <div className={stepCardClasses}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className={clsx(
                      'p-3 rounded-lg',
                      isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'
                    )}>
                      <span className="font-bold">📊</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Data Science & ML</h4>
                      <p className="text-sm mb-3">Students from Shyamnagar College use for:</p>
                      <ul className="text-sm list-disc pl-5 space-y-1">
                        <li>Python with TensorFlow/PyTorch</li>
                        <li>Jupyter notebooks</li>
                        <li>R programming language</li>
                        <li>Big data tools (Hadoop, Spark)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* DevOps */}
                <div className={stepCardClasses}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className={clsx(
                      'p-3 rounded-lg',
                      isDarkMode ? 'bg-green-900/50' : 'bg-green-100'
                    )}>
                      <span className="font-bold">⚙️</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">DevOps Learning</h4>
                      <p className="text-sm mb-3">For Naihati IT training center:</p>
                      <ul className="text-sm list-disc pl-5 space-y-1">
                        <li>Ansible, Terraform, Kubernetes</li>
                        <li>Bash scripting practice</li>
                        <li>CI/CD pipeline tools</li>
                        <li>Container orchestration</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Cybersecurity */}
                <div className={stepCardClasses}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className={clsx(
                      'p-3 rounded-lg',
                      isDarkMode ? 'bg-red-900/50' : 'bg-red-100'
                    )}>
                      <span className="font-bold">🔒</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Cybersecurity</h4>
                      <p className="text-sm mb-3">Kali Linux in WSL for:</p>
                      <ul className="text-sm list-disc pl-5 space-y-1">
                        <li>Network scanning tools</li>
                        <li>Penetration testing practice</li>
                        <li>Security tool experimentation</li>
                        <li>Forensic analysis tools</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Limitations Section */}
          <section className="mb-10">
            <button 
              onClick={() => this.toggleSection('limitations')}
              className="w-full text-left mb-4"
            >
              <h2 className={clsx(
                'text-2xl font-bold flex items-center gap-3 transition-all duration-300 hover:gap-4',
                expandedSections.limitations 
                  ? (isDarkMode ? 'text-red-300' : 'text-red-600')
                  : (isDarkMode ? 'text-gray-300' : 'text-gray-700')
              )}>
                <span className={clsx(
                  'transition-transform duration-300',
                  expandedSections.limitations ? 'rotate-90' : ''
                )}>▶</span>
                Limitations & Common Pitfalls
              </h2>
            </button>

            {expandedSections.limitations && (
              <div className="reveal-section">
                <div className={cardClasses}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-start gap-3 mb-4">
                        <div className={clsx(
                          'p-2 rounded-lg',
                          isDarkMode ? 'bg-red-900/30' : 'bg-red-100'
                        )}>
                          <span className="font-bold">⚠️</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-lg mb-2">No GUI Applications (Natively)</h4>
                          <p className="mb-2">WSL is designed for command-line tools:</p>
                          <code className={clsx(
                            'block p-2 rounded mb-2 font-mono text-sm',
                            isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                          )}>
                            # Gedit, Firefox won't work directly
                          </code>
                          <p className="text-sm opacity-80">Solution: Use X Server or WSLg (Windows 11)</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className={clsx(
                          'p-2 rounded-lg',
                          isDarkMode ? 'bg-yellow-900/30' : 'bg-yellow-100'
                        )}>
                          <span className="font-bold">💡</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-lg mb-2">Performance with Windows Files</h4>
                          <p>Accessing Windows files from WSL2 can be slower:</p>
                          <div className="mt-2 p-3 rounded bg-gray-800/20">
                            <p className="text-sm font-semibold">Best Practice:</p>
                            <p className="text-sm">Keep project files in WSL filesystem (<code>~/projects</code>)</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-start gap-3 mb-4">
                        <div className={clsx(
                          'p-2 rounded-lg',
                          isDarkMode ? 'bg-orange-900/30' : 'bg-orange-100'
                        )}>
                          <span className="font-bold">🔄</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-lg mb-2">System Service Limitations</h4>
                          <p>Some Linux services don't work as expected:</p>
                          <div className="mt-2 p-3 rounded bg-gray-800/20">
                            <ul className="text-sm list-disc pl-5 space-y-1">
                              <li>Systemd not supported in WSL1</li>
                              <li>Some kernel modules unavailable</li>
                              <li>Hardware access limited</li>
                              <li>Real-time operations restricted</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hint Section */}
                  <div className={clsx(
                    'mt-6 p-4 rounded-lg border transition-all duration-300 hover:scale-[1.01]',
                    isDarkMode 
                      ? 'bg-gray-700/30 border-gray-600 hover:bg-gray-700/50' 
                      : 'bg-cyan-50/50 border-cyan-200 hover:bg-cyan-50'
                  )}>
                    <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                      <span className={clsx(
                        'p-1 rounded',
                        isDarkMode ? 'bg-cyan-800/50' : 'bg-cyan-100'
                      )}>🤔</span>
                      Hint Section
                    </h4>
                    <p className="mb-2">
                      <strong>Think about:</strong> What types of projects are better suited for WSL vs a full Linux installation? When would you recommend a student switch from WSL to dual-boot?
                    </p>
                    <p className="mb-2">
                      <strong>Observe carefully:</strong> How does file permission handling differ between Windows and Linux filesystems when accessed through WSL?
                    </p>
                    <p>
                      <strong>Try changing this:</strong> Install two different Linux distributions side by side in WSL. How do they coexist and can they communicate with each other?
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Best Practices Section */}
          <section className="mb-10">
            <button 
              onClick={() => this.toggleSection('bestPractices')}
              className="w-full text-left mb-4"
            >
              <h2 className={clsx(
                'text-2xl font-bold flex items-center gap-3 transition-all duration-300 hover:gap-4',
                expandedSections.bestPractices 
                  ? (isDarkMode ? 'text-teal-300' : 'text-teal-600')
                  : (isDarkMode ? 'text-gray-300' : 'text-gray-700')
              )}>
                <span className={clsx(
                  'transition-transform duration-300',
                  expandedSections.bestPractices ? 'rotate-90' : ''
                )}>▶</span>
                Best Practices & Professional Tips
              </h2>
            </button>

            {expandedSections.bestPractices && (
              <div className="reveal-section">
                <div className={cardClasses}>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold mb-4">Coding Standards with WSL</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <span className={clsx(
                            'mt-1 w-6 h-6 flex items-center justify-center rounded-full',
                            isDarkMode ? 'bg-teal-800/50' : 'bg-teal-100'
                          )}>1</span>
                          <div>
                            <strong>Use WSL filesystem for projects</strong>
                            <p className="text-sm opacity-80">Avoid <code>/mnt/c/</code> for active development</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className={clsx(
                            'mt-1 w-6 h-6 flex items-center justify-center rounded-full',
                            isDarkMode ? 'bg-teal-800/50' : 'bg-teal-100'
                          )}>2</span>
                          <div>
                            <strong>Backup your WSL instance</strong>
                            <p className="text-sm opacity-80">Use <code>wsl --export</code> regularly</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className={clsx(
                            'mt-1 w-6 h-6 flex items-center justify-center rounded-full',
                            isDarkMode ? 'bg-teal-800/50' : 'bg-teal-100'
                          )}>3</span>
                          <div>
                            <strong>Configure memory limits</strong>
                            <p className="text-sm opacity-80">Edit <code>.wslconfig</code> for resource control</p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-4">Professional Tips & Tricks</h3>
                      <div className="space-y-4">
                        <div className="p-3 rounded bg-gray-800/20">
                          <p className="font-semibold mb-1">Multiple Distributions</p>
                          <p className="text-sm">Run Ubuntu for development, Kali for security testing, Alpine for containers</p>
                        </div>
                        <div className="p-3 rounded bg-gray-800/20">
                          <p className="font-semibold mb-1">VS Code Integration</p>
                          <p className="text-sm">Use Remote - WSL extension for seamless development</p>
                        </div>
                        <div className="p-3 rounded bg-gray-800/20">
                          <p className="font-semibold mb-1">Docker Desktop with WSL2</p>
                          <p className="text-sm">Get native Docker performance with WSL2 backend</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mini Checklist */}
                  <div className={clsx(
                    'mt-8 p-5 rounded-xl border-2 transition-all duration-300 hover:scale-[1.01]',
                    isDarkMode 
                      ? 'bg-gray-800/50 border-teal-500/30 hover:border-teal-500/50' 
                      : 'bg-teal-50/70 border-teal-300 hover:border-teal-400'
                  )}>
                    <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <span className={clsx(
                        'p-2 rounded-lg',
                        isDarkMode ? 'bg-teal-800/50' : 'bg-teal-100'
                      )}>✅</span>
                      What Students Should Remember
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <input type="checkbox" className="mt-1" />
                        <div>
                          <p className="font-semibold">WSL is for tools, not GUI apps</p>
                          <p className="text-sm opacity-80">Use command-line Linux tools primarily</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <input type="checkbox" className="mt-1" />
                        <div>
                          <p className="font-semibold">Choose WSL2 over WSL1</p>
                          <p className="text-sm opacity-80">Better performance and compatibility</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <input type="checkbox" className="mt-1" />
                        <div>
                          <p className="font-semibold">Keep files in Linux filesystem</p>
                          <p className="text-sm opacity-80">Better performance than Windows drives</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <input type="checkbox" className="mt-1" />
                        <div>
                          <p className="font-semibold">Backup regularly</p>
                          <p className="text-sm opacity-80">Export your WSL distribution</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tips & Tricks Section */}
                  <div className="mt-6 p-5 rounded-lg bg-gray-800/20">
                    <h4 className="text-lg font-bold mb-3">Tips & Tricks (Professional Level)</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-semibold text-sm mb-1">Industry Habit:</p>
                        <p className="text-sm">Developers at Barrackpore tech companies use WSL for consistent environments across Windows machines.</p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm mb-1">Classroom Shortcut:</p>
                        <p className="text-sm">Create a base WSL image with all required tools and distribute to students at Shyamnagar College.</p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm mb-1">Debugging Mindset:</p>
                        <p className="text-sm">When tools fail, check if it's a WSL limitation or a configuration issue.</p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm mb-1">Naming Advice:</p>
                        <p className="text-sm">Name WSL distributions clearly: <code>ubuntu-dev</code>, <code>kali-testing</code>, <code>alpine-docker</code></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Summary Section */}
          <section className="mb-10">
            <div className={cardClasses}>
              <h2 className="text-2xl font-bold mb-6">Summary & Key Takeaways</h2>
              
              <div className="flex flex-col items-center">
                <svg width="400" height="200" className="mb-6">
                  {/* Journey Visualization */}
                  <circle cx="100" cy="100" r="40" fill={isDarkMode ? '#1e40af' : '#1d4ed8'} opacity="0.9">
                    <animate attributeName="r" values="40;45;40" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <text x="100" y="105" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Windows User</text>
                  
                  <circle cx="300" cy="100" r="40" fill={isDarkMode ? '#166534' : '#16a34a'} opacity="0.9">
                    <animate attributeName="r" values="40;45;40" dur="3s" repeatCount="indefinite" begin="1s" />
                  </circle>
                  <text x="300" y="105" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Linux Tools</text>
                  
                  {/* Connecting Path */}
                  <path d="M140,100 C200,80 240,80 260,100" stroke={isDarkMode ? '#c084fc' : '#9333ea'} strokeWidth="3" fill="none" strokeDasharray="10,5">
                    <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
                  </path>
                  
                  {/* WSL Bridge */}
                  <rect x="180" y="80" width="40" height="40" rx="10" fill={isDarkMode ? '#7c3aed' : '#6d28d9'}>
                    <animate attributeName="y" values="80;75;80" dur="2s" repeatCount="indefinite" />
                  </rect>
                  <text x="200" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">WSL</text>
                </svg>

                <div className="text-center max-w-2xl">
                  <p className="text-lg mb-4">
                    WSL is <strong>the perfect bridge</strong> for students and developers who need Linux tools but want to stay in Windows. Remember how Tuhina from Naihati completed her entire web development course using WSL, while her friend who installed Linux separately spent weeks troubleshooting driver issues.
                  </p>
                  <p className="opacity-80">
                    For 90% of learning and development needs, WSL2 provides everything you need from Linux without the complications of dual-booting or virtual machines.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className={clsx(
          'py-6 px-6 border-t',
          isDarkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-white/50'
        )}>
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <p className="font-bold">Topic 2: Windows Subsystem for Linux (WSL)</p>
                <p className="text-sm opacity-80">Class 9 - Modern Development Environments</p>
              </div>
              <div className="text-sm opacity-70">
                <p>Teacher: Sukanta Hui • 27 years experience in Programming, RDBMS, OS, Web Dev</p>
                <p>Email: sukantahui@codernaccotax.co.in • Mobile: 7003756860</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

