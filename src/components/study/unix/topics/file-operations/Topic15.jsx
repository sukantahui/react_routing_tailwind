import React, { Component } from 'react';
import clsx from 'clsx';

export default class Topic15 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: false,
      expandedSections: {
        overview: true,
        deletionMistakes: false,
        recoveryMindset: false,
        technicalRecovery: false,
        prevention: false,
        bestPractices: false
      },
      activeScenario: 'accidentalDelete',
      recoverySuccessRate: 70
    };
  }

  componentDidMount() {
    // Check for prefers-color-scheme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.setState({ isDarkMode: true });
    }

    // Setup initial animations
    this.setupRevealAnimations();
    
    // Simulate recovery success rate animation
    this.animateRecoveryRate();
  }

  componentWillUnmount() {
    if (this.recoveryAnimation) clearInterval(this.recoveryAnimation);
  }

  setupRevealAnimations() {
    setTimeout(() => {
      const elements = document.querySelectorAll('.reveal-section');
      elements.forEach((el, index) => {
        el.style.animationDelay = `${index * 100}ms`;
        el.classList.add('animate-[fadeIn_0.8s_ease-out_forwards]');
      });
    }, 300);
  }

  animateRecoveryRate() {
    let rate = 0;
    this.recoveryAnimation = setInterval(() => {
      if (rate <= 70) {
        this.setState({ recoverySuccessRate: rate });
        rate += 2;
      } else {
        clearInterval(this.recoveryAnimation);
      }
    }, 30);
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

  setActiveScenario = (scenario) => {
    this.setState({ activeScenario: scenario });
  }

  simulateRecoveryAttempt = () => {
    this.setState({ recoverySuccessRate: 30 }, () => {
      let rate = 30;
      const interval = setInterval(() => {
        if (rate <= 85) {
          this.setState({ recoverySuccessRate: rate });
          rate += 5;
        } else {
          clearInterval(interval);
        }
      }, 100);
    });
  }

  render() {
    const { isDarkMode, expandedSections, activeScenario, recoverySuccessRate } = this.state;

    const containerClasses = clsx(
      'min-h-screen transition-all duration-500',
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 to-rose-900/20 text-gray-100' 
        : 'bg-gradient-to-br from-rose-50 to-orange-50 text-gray-800'
    );

    const cardClasses = clsx(
      'rounded-2xl p-6 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl',
      isDarkMode 
        ? 'bg-gray-800/70 backdrop-blur-sm hover:bg-gray-700/80 hover:shadow-rose-500/10' 
        : 'bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-rose-200/50'
    );

    const headingClasses = clsx(
      'text-3xl font-bold mb-2',
      isDarkMode ? 'text-rose-300' : 'text-rose-700'
    );

    const teacherNoteClasses = clsx(
      'border-l-4 rounded-r-lg p-5 transition-all duration-300 hover:scale-[1.02]',
      isDarkMode 
        ? 'bg-rose-900/30 border-rose-400 hover:bg-rose-900/50' 
        : 'bg-rose-50 border-rose-500 hover:bg-rose-100'
    );

    const stepCardClasses = clsx(
      'rounded-xl p-4 transition-all duration-300 hover:translate-y-[-4px]',
      isDarkMode 
        ? 'bg-gray-700/50 hover:bg-gray-600/60 hover:shadow-lg hover:shadow-rose-500/10' 
        : 'bg-white/90 hover:bg-white hover:shadow-lg hover:shadow-rose-200/50'
    );

    const warningColor = isDarkMode ? '#f87171' : '#dc2626';
    const recoveryColor = isDarkMode ? '#34d399' : '#059669';

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

          @keyframes pulseWarning {
            0%, 100% {
              filter: drop-shadow(0 0 2px rgba(244, 63, 94, 0.5));
            }
            50% {
              filter: drop-shadow(0 0 8px rgba(244, 63, 94, 0.8));
            }
          }

          @keyframes pulseRecovery {
            0%, 100% {
              filter: drop-shadow(0 0 2px rgba(52, 211, 153, 0.5));
            }
            50% {
              filter: drop-shadow(0 0 8px rgba(52, 211, 153, 0.8));
            }
          }

          @keyframes slideInFromLeft {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
          }

          @keyframes fileRestore {
            0% {
              opacity: 0;
              transform: scale(0.5) rotate(-10deg);
            }
            70% {
              opacity: 1;
              transform: scale(1.1) rotate(5deg);
            }
            100% {
              opacity: 1;
              transform: scale(1) rotate(0deg);
            }
          }

          @keyframes dataFlow {
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
                    : 'bg-rose-100 hover:bg-rose-200 text-rose-700'
                )}
              >
                {isDarkMode ? '🌙 Dark' : '☀️ Light'}
              </button>
            </div>

            <div className="reveal-section">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-[slideInFromLeft_0.8s_ease-out_forwards]">
                <span className={isDarkMode ? 'text-rose-300' : 'text-rose-600'}>
                  Topic 16: 
                </span>
                <span className={isDarkMode ? 'text-gray-100' : 'text-gray-800'}>
                  {' '}File Deletion Mistakes & Recovery Mindset
                </span>
              </h1>
              <p className="text-xl opacity-80 animate-[slideInFromLeft_0.8s_ease-out_0.2s_forwards]">
                Learning from mistakes and developing systematic recovery thinking
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
                  'p-3 rounded-lg transition-all duration-300 hover:animate-[pulseWarning_1.5s_ease-in-out]',
                  isDarkMode ? 'bg-rose-800/50' : 'bg-rose-100'
                )}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Teacher's Note</h3>
                  <p className="mb-2">
                    Every student from Barrackpore to Shyamnagar will eventually delete something important. The key is not avoiding mistakes, but developing a recovery mindset. When Tuhina accidentally deleted her semester project, she panicked. When Swadeep did the same, he followed a systematic recovery process and saved his work.
                  </p>
                  <div className={clsx(
                    'text-sm mt-3 p-3 rounded',
                    isDarkMode ? 'bg-gray-700/30' : 'bg-rose-100/50'
                  )}>
                    <strong>Pro Tip:</strong> The first 5 minutes after accidental deletion are critical. Stay calm, stop writing new data, and follow the recovery checklist. Debangshu learned this the hard way when he continued using his computer after deleting files, overwriting the recovery chances.
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
                  ? (isDarkMode ? 'text-rose-300' : 'text-rose-600')
                  : (isDarkMode ? 'text-gray-300' : 'text-gray-700')
              )}>
                <span className={clsx(
                  'transition-transform duration-300',
                  expandedSections.overview ? 'rotate-90' : ''
                )}>▶</span>
                The Psychology of File Deletion
              </h2>
            </button>

            {expandedSections.overview && (
              <div className="reveal-section">
                <div className={cardClasses}>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className={headingClasses}>Recovery Mindset vs Panic Mindset</h3>
                      <p className="mb-4 leading-relaxed">
                        <strong>Signature:</strong> Systematic approach to problem-solving under stress
                      </p>
                      <p className="mb-4 leading-relaxed">
                        <strong>Purpose:</strong> To transform panic into productive action when files are lost
                      </p>
                      <p className="mb-4 leading-relaxed">
                        <strong>When & Why Used:</strong> Immediately after accidental deletion, before taking any other actions
                      </p>
                      
                      <div className="mt-6 p-4 rounded-lg bg-gray-800/20">
                        <h4 className="font-bold text-lg mb-2">Mental State Timeline</h4>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <div className={clsx('w-3 h-3 rounded-full mr-2', isDarkMode ? 'bg-red-500' : 'bg-red-600')}></div>
                            <span className="text-sm">0-30 seconds: Panic & Denial</span>
                          </div>
                          <div className="flex items-center">
                            <div className={clsx('w-3 h-3 rounded-full mr-2', isDarkMode ? 'bg-yellow-500' : 'bg-yellow-600')}></div>
                            <span className="text-sm">30s-2min: Assessment Phase</span>
                          </div>
                          <div className="flex items-center">
                            <div className={clsx('w-3 h-3 rounded-full mr-2', isDarkMode ? 'bg-green-500' : 'bg-green-600')}></div>
                            <span className="text-sm">2min+: Systematic Recovery</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className={stepCardClasses}>
                      <h4 className="text-lg font-semibold mb-3">Success Rate Visualization</h4>
                      <div className="flex flex-col items-center">
                        <div className="relative w-48 h-48 mb-4">
                          {/* Recovery Success Circle */}
                          <svg className="w-full h-full transform -rotate-90">
                            <circle
                              cx="96"
                              cy="96"
                              r="80"
                              fill="none"
                              stroke={isDarkMode ? '#374151' : '#e5e7eb'}
                              strokeWidth="16"
                            />
                            <circle
                              cx="96"
                              cy="96"
                              r="80"
                              fill="none"
                              stroke={recoveryColor}
                              strokeWidth="16"
                              strokeLinecap="round"
                              strokeDasharray="502.4"
                              strokeDashoffset={502.4 - (502.4 * recoverySuccessRate / 100)}
                              className="transition-all duration-1000 ease-out"
                            >
                              <animate
                                attributeName="stroke-dashoffset"
                                from="502.4"
                                to={502.4 - (502.4 * recoverySuccessRate / 100)}
                                dur="2s"
                                fill="freeze"
                              />
                            </circle>
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-bold" style={{ color: recoveryColor }}>
                              {recoverySuccessRate}%
                            </span>
                            <span className="text-sm opacity-80">Recovery Success</span>
                          </div>
                        </div>
                        <button
                          onClick={this.simulateRecoveryAttempt}
                          className={clsx(
                            'px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105',
                            isDarkMode 
                              ? 'bg-green-700 hover:bg-green-600' 
                              : 'bg-green-600 hover:bg-green-500 text-white'
                          )}
                        >
                          Simulate Recovery Attempt
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-700/30">
                    <h4 className="text-xl font-semibold mb-4">How Recovery Mindset Works</h4>
                    <p className="mb-4 leading-relaxed">
                      When Abhronila from Ichapur accidentally deleted her project files, her initial panic caused her to make things worse by trying random commands. A recovery mindset would have had her: <strong>1) Stop</strong> using the drive, <strong>2) Breathe</strong> for 30 seconds, <strong>3) Assess</strong> what was deleted, <strong>4) Follow</strong> a proven recovery checklist.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Common Deletion Mistakes */}
          <section className="mb-10">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Common Deletion Mistakes - Interactive Scenarios</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {['accidentalDelete', 'wildcard', 'permanentDelete', 'wrongDirectory', 'syncMistake'].map((scenario) => (
                  <button
                    key={scenario}
                    onClick={() => this.setActiveScenario(scenario)}
                    className={clsx(
                      'px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105',
                      activeScenario === scenario
                        ? (isDarkMode ? 'bg-rose-600 text-white' : 'bg-rose-500 text-white')
                        : (isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300')
                    )}
                  >
                    {scenario === 'accidentalDelete' && 'Accidental Delete'}
                    {scenario === 'wildcard' && 'Wildcard Disaster'}
                    {scenario === 'permanentDelete' && 'Permanent Delete'}
                    {scenario === 'wrongDirectory' && 'Wrong Directory'}
                    {scenario === 'syncMistake' && 'Sync Mistake'}
                  </button>
                ))}
              </div>
            </div>

            <div className="reveal-section">
              <div className={cardClasses}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">
                      {activeScenario === 'accidentalDelete' && 'Accidental Drag & Drop'}
                      {activeScenario === 'wildcard' && 'Wildcard Catastrophe'}
                      {activeScenario === 'permanentDelete' && 'Shift + Delete'}
                      {activeScenario === 'wrongDirectory' && 'Wrong Working Directory'}
                      {activeScenario === 'syncMistake' && 'Cloud Sync Confusion'}
                    </h3>
                    
                    <div className="space-y-4">
                      {activeScenario === 'accidentalDelete' && (
                        <>
                          <div className="flex items-start gap-3">
                            <div className={clsx('p-2 rounded-lg', isDarkMode ? 'bg-red-900/30' : 'bg-red-100')}>
                              <span className="font-bold">💥</span>
                            </div>
                            <div>
                              <h4 className="font-bold">The Mistake</h4>
                              <p className="text-sm">Dragging files to Trash/Recycle Bin without realizing, or selecting wrong files during multi-select</p>
                            </div>
                          </div>
                          <div className="p-3 rounded bg-gray-800/20">
                            <p className="font-mono text-sm mb-1"># Swadeep's experience:</p>
                            <p className="text-sm">"I selected all files with Ctrl+A, meant to copy but hit Delete instead. Lost 3 hours of work."</p>
                          </div>
                        </>
                      )}

                      {activeScenario === 'wildcard' && (
                        <>
                          <div className="flex items-start gap-3">
                            <div className={clsx('p-2 rounded-lg', isDarkMode ? 'bg-red-900/30' : 'bg-red-100')}>
                              <span className="font-bold">💥</span>
                            </div>
                            <div>
                              <h4 className="font-bold">The Mistake</h4>
                              <p className="text-sm">Using <code>rm *</code> or <code>del *.*</code> in wrong directory, or with wrong pattern</p>
                            </div>
                          </div>
                          <div className="p-3 rounded bg-gray-800/20">
                            <p className="font-mono text-sm mb-1"># Tuhina's mistake at Barrackpore College:</p>
                            <p className="text-sm">"I typed <code>rm *.tmp</code> but was in my project folder, not temp folder. Deleted all source files."</p>
                          </div>
                        </>
                      )}

                      {activeScenario === 'permanentDelete' && (
                        <>
                          <div className="flex items-start gap-3">
                            <div className={clsx('p-2 rounded-lg', isDarkMode ? 'bg-red-900/30' : 'bg-red-100')}>
                              <span className="font-bold">💥</span>
                            </div>
                            <div>
                              <h4 className="font-bold">The Mistake</h4>
                              <p className="text-sm">Using Shift+Delete (bypassing Recycle Bin) thinking files are unimportant, then realizing they were needed</p>
                            </div>
                          </div>
                          <div className="p-3 rounded bg-gray-800/20">
                            <p className="font-mono text-sm mb-1"># Debangshu's Shyamnagar project:</p>
                            <p className="text-sm">"I permanently deleted 'old_backups' folder, forgetting it contained the only copy of database schema."</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className={stepCardClasses}>
                    <h4 className="text-lg font-semibold mb-3">Visual Representation</h4>
                    <div className="flex justify-center">
                      <svg width="300" height="200">
                        {activeScenario === 'accidentalDelete' && (
                          <g>
                            {/* Files */}
                            <rect x="50" y="50" width="40" height="50" rx="5" fill={isDarkMode ? '#3b82f6' : '#2563eb'}>
                              <animate attributeName="y" values="50;150;50" dur="3s" repeatCount="indefinite" />
                            </rect>
                            <rect x="100" y="50" width="40" height="50" rx="5" fill={isDarkMode ? '#10b981' : '#059669'}>
                              <animate attributeName="y" values="50;150;50" dur="3s" repeatCount="indefinite" begin="0.2s" />
                            </rect>
                            <rect x="150" y="50" width="40" height="50" rx="5" fill={isDarkMode ? '#8b5cf6' : '#7c3aed'}>
                              <animate attributeName="y" values="50;150;50" dur="3s" repeatCount="indefinite" begin="0.4s" />
                            </rect>
                            
                            {/* Trash Bin */}
                            <rect x="200" y="120" width="60" height="40" rx="5" fill={isDarkMode ? '#6b7280' : '#9ca3af'} />
                            <rect x="210" y="110" width="40" height="10" rx="2" fill={isDarkMode ? '#4b5563' : '#6b7280'} />
                            
                            {/* Arrow */}
                            <line x1="170" y1="75" x2="200" y2="120" stroke={warningColor} strokeWidth="3" strokeDasharray="10,5">
                              <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
                            </line>
                          </g>
                        )}

                        {activeScenario === 'wildcard' && (
                          <g>
                            {/* Directory with many files */}
                            <rect x="50" y="50" width="200" height="100" rx="10" fill={isDarkMode ? '#1f2937' : '#f3f4f6'} stroke={warningColor} strokeWidth="2" />
                            <text x="150" y="80" textAnchor="middle" fontSize="14" fill={isDarkMode ? '#f3f4f6' : '#1f2937'}>project_folder/</text>
                            
                            {/* Files inside */}
                            <circle cx="80" cy="110" r="8" fill="#3b82f6">
                              <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="110" cy="110" r="8" fill="#10b981">
                              <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" begin="0.2s" />
                            </circle>
                            <circle cx="140" cy="110" r="8" fill="#8b5cf6">
                              <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" begin="0.4s" />
                            </circle>
                            <circle cx="170" cy="110" r="8" fill="#f59e0b">
                              <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" begin="0.6s" />
                            </circle>
                            <circle cx="200" cy="110" r="8" fill="#ef4444">
                              <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" begin="0.8s" />
                            </circle>
                            
                            {/* Wildcard text */}
                            <text x="150" y="140" textAnchor="middle" fontSize="16" fill={warningColor} fontWeight="bold">
                              rm *
                            </text>
                          </g>
                        )}

                        {activeScenario === 'permanentDelete' && (
                          <g>
                            {/* File with warning */}
                            <rect x="100" y="60" width="80" height="60" rx="5" fill={isDarkMode ? '#ef4444' : '#dc2626'}>
                              <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
                            </rect>
                            <text x="140" y="90" textAnchor="middle" fill="white" fontSize="12">file.txt</text>
                            
                            {/* Bypass animation */}
                            <rect x="70" y="130" width="40" height="30" rx="5" fill={isDarkMode ? '#6b7280' : '#9ca3af'} opacity="0.7">
                              <animate attributeName="opacity" values="0.7;0.2;0.7" dur="2s" repeatCount="indefinite" />
                            </rect>
                            <text x="90" y="148" textAnchor="middle" fill="white" fontSize="10">Recycle Bin</text>
                            
                            {/* Arrow bypassing recycle bin */}
                            <path d="M140,120 C140,140 140,140 140,160" fill="none" stroke={warningColor} strokeWidth="3" strokeDasharray="10,5">
                              <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
                            </path>
                            
                            {/* Shift key */}
                            <rect x="180" y="130" width="60" height="30" rx="5" fill={isDarkMode ? '#4b5563' : '#6b7280'}>
                              <animate attributeName="y" values="130;125;130" dur="1s" repeatCount="indefinite" />
                            </rect>
                            <text x="210" y="148" textAnchor="middle" fill="white" fontSize="12">Shift</text>
                          </g>
                        )}
                      </svg>
                    </div>
                    
                    <div className="mt-4 p-3 rounded bg-gray-800/20">
                      <p className="text-sm font-semibold">Immediate Action Required:</p>
                      <p className="text-sm mt-1">
                        {activeScenario === 'accidentalDelete' && 'Check Recycle Bin immediately. Files are usually recoverable.'}
                        {activeScenario === 'wildcard' && 'STOP using terminal. Check if you have backups or version control.'}
                        {activeScenario === 'permanentDelete' && 'DO NOT write new files. Use file recovery software immediately.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Recovery Mindset Framework */}
          <section className="mb-10">
            <button 
              onClick={() => this.toggleSection('recoveryMindset')}
              className="w-full text-left mb-4"
            >
              <h2 className={clsx(
                'text-2xl font-bold flex items-center gap-3 transition-all duration-300 hover:gap-4',
                expandedSections.recoveryMindset 
                  ? (isDarkMode ? 'text-emerald-300' : 'text-emerald-600')
                  : (isDarkMode ? 'text-gray-300' : 'text-gray-700')
              )}>
                <span className={clsx(
                  'transition-transform duration-300',
                  expandedSections.recoveryMindset ? 'rotate-90' : ''
                )}>▶</span>
                The Recovery Mindset Framework
              </h2>
            </button>

            {expandedSections.recoveryMindset && (
              <div className="grid md:grid-cols-2 gap-6 reveal-section">
                {/* Step 1: STOP */}
                <div className={stepCardClasses}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className={clsx(
                      'p-3 rounded-lg font-bold text-lg',
                      isDarkMode ? 'bg-red-900/50' : 'bg-red-100'
                    )}>🚫</div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Step 1: STOP Everything</h4>
                      <p className="text-sm mb-3">The moment you realize deletion:</p>
                      <ul className="text-sm list-disc pl-5 space-y-1">
                        <li>Stop typing commands</li>
                        <li>Stop saving files</li>
                        <li>Stop downloading/installing</li>
                        <li>Close unnecessary applications</li>
                      </ul>
                      <p className="text-sm mt-3 opacity-80">Why: New data can overwrite deleted files</p>
                    </div>
                  </div>
                </div>

                {/* Step 2: ASSESS */}
                <div className={stepCardClasses}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className={clsx(
                      'p-3 rounded-lg font-bold text-lg',
                      isDarkMode ? 'bg-yellow-900/50' : 'bg-yellow-100'
                    )}>🔍</div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Step 2: ASSESS Situation</h4>
                      <p className="text-sm mb-3">Ask yourself:</p>
                      <ul className="text-sm list-disc pl-5 space-y-1">
                        <li>What exactly was deleted?</li>
                        <li>When was it deleted?</li>
                        <li>Where was it located?</li>
                        <li>How was it deleted?</li>
                      </ul>
                      <p className="text-sm mt-3 opacity-80">Example: Abhronila identified she deleted her "python_project" folder 5 minutes ago</p>
                    </div>
                  </div>
                </div>

                {/* Step 3: CHECK */}
                <div className={stepCardClasses}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className={clsx(
                      'p-3 rounded-lg font-bold text-lg',
                      isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'
                    )}>📋</div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Step 3: CHECK Recovery Points</h4>
                      <p className="text-sm mb-3">Check in order:</p>
                      <ol className="text-sm list-decimal pl-5 space-y-1">
                        <li>Recycle Bin / Trash</li>
                        <li>File History / Backup</li>
                        <li>Cloud sync (Google Drive, OneDrive)</li>
                        <li>Version Control (Git)</li>
                        <li>Email attachments</li>
                      </ol>
                    </div>
                  </div>
                </div>

                {/* Step 4: EXECUTE */}
                <div className={stepCardClasses}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className={clsx(
                      'p-3 rounded-lg font-bold text-lg',
                      isDarkMode ? 'bg-green-900/50' : 'bg-green-100'
                    )}>⚡</div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Step 4: EXECUTE Recovery</h4>
                      <p className="text-sm mb-3">Choose appropriate method:</p>
                      <ul className="text-sm list-disc pl-5 space-y-1">
                        <li>Restore from Recycle Bin</li>
                        <li>Use File Recovery software</li>
                        <li>Restore from backup</li>
                        <li>Check system restore points</li>
                      </ul>
                      <p className="text-sm mt-3 opacity-80">Tip: Recover to DIFFERENT drive to avoid overwriting</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Technical Recovery Methods */}
          <section className="mb-10">
            <button 
              onClick={() => this.toggleSection('technicalRecovery')}
              className="w-full text-left mb-4"
            >
              <h2 className={clsx(
                'text-2xl font-bold flex items-center gap-3 transition-all duration-300 hover:gap-4',
                expandedSections.technicalRecovery 
                  ? (isDarkMode ? 'text-blue-300' : 'text-blue-600')
                  : (isDarkMode ? 'text-gray-300' : 'text-gray-700')
              )}>
                <span className={clsx(
                  'transition-transform duration-300',
                  expandedSections.technicalRecovery ? 'rotate-90' : ''
                )}>▶</span>
                Technical Recovery Methods
              </h2>
            </button>

            {expandedSections.technicalRecovery && (
              <div className="reveal-section">
                <div className={cardClasses}>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold mb-4">How File Recovery Actually Works</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className={clsx('p-2 rounded-lg', isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100')}>
                            <span className="font-bold">💾</span>
                          </div>
                          <div>
                            <h4 className="font-bold">File Deletion is Not Erasure</h4>
                            <p className="text-sm">When you delete a file, only the pointer is removed. Data remains until overwritten.</p>
                          </div>
                        </div>
                        
                        <div className="p-4 rounded-lg bg-gray-800/20">
                          <h4 className="font-bold text-lg mb-2">Filesystem Visualization</h4>
                          <div className="flex justify-center">
                            <svg width="300" height="120">
                              {/* Disk space representation */}
                              <rect x="20" y="20" width="260" height="80" rx="5" fill={isDarkMode ? '#374151' : '#e5e7eb'} />
                              
                              {/* File blocks */}
                              <rect x="30" y="30" width="40" height="20" rx="3" fill="#3b82f6">
                                <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
                              </rect>
                              <text x="50" y="43" textAnchor="middle" fill="white" fontSize="8">File A</text>
                              
                              <rect x="80" y="30" width="40" height="20" rx="3" fill="#10b981">
                                <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" begin="0.5s" />
                              </rect>
                              <text x="100" y="43" textAnchor="middle" fill="white" fontSize="8">File B</text>
                              
                              <rect x="130" y="30" width="40" height="20" rx="3" fill="#8b5cf6">
                                <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" begin="1s" />
                              </rect>
                              <text x="150" y="43" textAnchor="middle" fill="white" fontSize="8">File C</text>
                              
                              {/* Deleted but present */}
                              <rect x="180" y="30" width="40" height="20" rx="3" fill={isDarkMode ? '#6b7280' : '#9ca3af'} stroke="#ef4444" strokeWidth="2" strokeDasharray="4">
                                <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />
                              </rect>
                              <text x="200" y="43" textAnchor="middle" fill={isDarkMode ? '#d1d5db' : '#4b5563'} fontSize="8">DELETED</text>
                              
                              {/* New data overwriting */}
                              <rect x="230" y="30" width="40" height="20" rx="3" fill="#f59e0b" opacity="0">
                                <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" begin="2s" />
                                <animate attributeName="x" values="230;180;180" dur="3s" repeatCount="indefinite" begin="2s" />
                              </rect>
                              <text x="250" y="43" textAnchor="middle" fill="#1f2937" fontSize="8">NEW</text>
                            </svg>
                          </div>
                          <p className="text-sm mt-2 text-center">Deleted data remains until new data overwrites it</p>
                        </div>
                      </div>
                    </div>

                    <div className={stepCardClasses}>
                      <h4 className="text-lg font-bold mb-3">Recovery Tools & Commands</h4>
                      <div className="space-y-4">
                        <div>
                          <p className="font-semibold text-sm mb-1">Windows:</p>
                          <code className={clsx(
                            'block p-2 rounded mb-2 font-mono text-sm',
                            isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                          )}>
                            # Check Recycle Bin
                          </code>
                          <code className={clsx(
                            'block p-2 rounded font-mono text-sm',
                            isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                          )}>
                            # Use Previous Versions (Right-click → Restore previous versions)
                          </code>
                        </div>
                        
                        <div>
                          <p className="font-semibold text-sm mb-1">Linux/macOS:</p>
                          <code className={clsx(
                            'block p-2 rounded mb-2 font-mono text-sm',
                            isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                          )}>
                            # Check trash location
                            ls ~/.local/share/Trash/files/
                          </code>
                          <code className={clsx(
                            'block p-2 rounded font-mono text-sm',
                            isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                          )}>
                            # TestDisk for deeper recovery
                            sudo apt-get install testdisk
                          </code>
                        </div>
                        
                        <div>
                          <p className="font-semibold text-sm mb-1">Professional Tools:</p>
                          <ul className="text-sm list-disc pl-5 space-y-1">
                            <li>Recuva (Windows - Free)</li>
                            <li>PhotoRec (Cross-platform - Free)</li>
                            <li>EaseUS Data Recovery</li>
                            <li>Disk Drill</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hint Section */}
                  <div className={clsx(
                    'mt-6 p-4 rounded-lg border transition-all duration-300 hover:scale-[1.01]',
                    isDarkMode 
                      ? 'bg-gray-700/30 border-gray-600 hover:bg-gray-700/50' 
                      : 'bg-rose-50/50 border-rose-200 hover:bg-rose-50'
                  )}>
                    <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                      <span className={clsx(
                        'p-1 rounded',
                        isDarkMode ? 'bg-rose-800/50' : 'bg-rose-100'
                      )}>🤔</span>
                      Hint Section
                    </h4>
                    <p className="mb-2">
                      <strong>Think about:</strong> What's the difference between "deleting" and "erasing" a file? Why does this difference matter for recovery?
                    </p>
                    <p className="mb-2">
                      <strong>Observe carefully:</strong> When you delete a file, what system resources are immediately freed up, and what remains allocated?
                    </p>
                    <p>
                      <strong>Try changing this:</strong> Create a test file, delete it, then immediately try to create a large file. Observe how the new file affects recovery chances.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Prevention Strategies */}
          <section className="mb-10">
            <button 
              onClick={() => this.toggleSection('prevention')}
              className="w-full text-left mb-4"
            >
              <h2 className={clsx(
                'text-2xl font-bold flex items-center gap-3 transition-all duration-300 hover:gap-4',
                expandedSections.prevention 
                  ? (isDarkMode ? 'text-teal-300' : 'text-teal-600')
                  : (isDarkMode ? 'text-gray-300' : 'text-gray-700')
              )}>
                <span className={clsx(
                  'transition-transform duration-300',
                  expandedSections.prevention ? 'rotate-90' : ''
                )}>▶</span>
                Prevention is Better Than Recovery
              </h2>
            </button>

            {expandedSections.prevention && (
              <div className="reveal-section">
                <div className={cardClasses}>
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Strategy 1 */}
                    <div className={stepCardClasses}>
                      <div className="flex flex-col items-center text-center">
                        <div className={clsx(
                          'p-3 rounded-full mb-3',
                          isDarkMode ? 'bg-teal-900/50' : 'bg-teal-100'
                        )}>
                          <span className="text-2xl">💾</span>
                        </div>
                        <h4 className="font-bold text-lg mb-2">Regular Backups</h4>
                        <p className="text-sm">Implement 3-2-1 backup rule: 3 copies, 2 different media, 1 offsite</p>
                      </div>
                    </div>

                    {/* Strategy 2 */}
                    <div className={stepCardClasses}>
                      <div className="flex flex-col items-center text-center">
                        <div className={clsx(
                          'p-3 rounded-full mb-3',
                          isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'
                        )}>
                          <span className="text-2xl">🔄</span>
                        </div>
                        <h4 className="font-bold text-lg mb-2">Version Control</h4>
                        <p className="text-sm">Use Git for code, document versioning for files</p>
                      </div>
                    </div>

                    {/* Strategy 3 */}
                    <div className={stepCardClasses}>
                      <div className="flex flex-col items-center text-center">
                        <div className={clsx(
                          'p-3 rounded-full mb-3',
                          isDarkMode ? 'bg-purple-900/50' : 'bg-purple-100'
                        )}>
                          <span className="text-2xl">🗑️</span>
                        </div>
                        <h4 className="font-bold text-lg mb-2">Safe Deletion Habits</h4>
                        <p className="text-sm">Always check before deleting, avoid wildcards in important directories</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4 className="text-xl font-bold mb-4">Student Success Stories</h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-4 rounded-lg bg-gray-800/20">
                        <p className="font-semibold mb-2">Swadeep - Naihati</p>
                        <p className="text-sm">"I set up automatic backups to external drive. When I accidentally formatted my drive, I restored everything in 30 minutes."</p>
                      </div>
                      <div className="p-4 rounded-lg bg-gray-800/20">
                        <p className="font-semibold mb-2">Tuhina - Barrackpore</p>
                        <p className="text-sm">"I use Git for all projects now. When I deleted wrong files, I just checked out the previous commit."</p>
                      </div>
                    </div>
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
                  ? (isDarkMode ? 'text-amber-300' : 'text-amber-600')
                  : (isDarkMode ? 'text-gray-300' : 'text-gray-700')
              )}>
                <span className={clsx(
                  'transition-transform duration-300',
                  expandedSections.bestPractices ? 'rotate-90' : ''
                )}>▶</span>
                Best Practices & Professional Mindset
              </h2>
            </button>

            {expandedSections.bestPractices && (
              <div className="reveal-section">
                <div className={cardClasses}>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold mb-4">Coding Standards for File Safety</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <span className={clsx(
                            'mt-1 w-6 h-6 flex items-center justify-center rounded-full',
                            isDarkMode ? 'bg-amber-800/50' : 'bg-amber-100'
                          )}>1</span>
                          <div>
                            <strong>Always confirm dangerous operations</strong>
                            <p className="text-sm opacity-80">Use <code>-i</code> flag with <code>rm</code>, or write confirmation scripts</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className={clsx(
                            'mt-1 w-6 h-6 flex items-center justify-center rounded-full',
                            isDarkMode ? 'bg-amber-800/50' : 'bg-amber-100'
                          )}>2</span>
                          <div>
                            <strong>Implement undo functionality</strong>
                            <p className="text-sm opacity-80">Design systems with rollback capabilities</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className={clsx(
                            'mt-1 w-6 h-6 flex items-center justify-center rounded-full',
                            isDarkMode ? 'bg-amber-800/50' : 'bg-amber-100'
                          )}>3</span>
                          <div>
                            <strong>Use descriptive names</strong>
                            <p className="text-sm opacity-80"><code>delete_old_logs.sh</code> not <code>cleanup.sh</code></p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-4">Professional Tips & Tricks</h3>
                      <div className="space-y-4">
                        <div className="p-3 rounded bg-gray-800/20">
                          <p className="font-semibold mb-1">The 10-Second Rule</p>
                          <p className="text-sm">Before any delete operation, wait 10 seconds and review what you're deleting</p>
                        </div>
                        <div className="p-3 rounded bg-gray-800/20">
                          <p className="font-semibold mb-1">Dry Run First</p>
                          <p className="text-sm">Use <code>ls</code> with your pattern before <code>rm</code>, or <code>-WhatIf</code> in PowerShell</p>
                        </div>
                        <div className="p-3 rounded bg-gray-800/20">
                          <p className="font-semibold mb-1">Alias Safety</p>
                          <p className="text-sm">Set <code>alias rm='rm -i'</code> in your shell profile for confirmation prompts</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mini Checklist */}
                  <div className={clsx(
                    'mt-8 p-5 rounded-xl border-2 transition-all duration-300 hover:scale-[1.01]',
                    isDarkMode 
                      ? 'bg-gray-800/50 border-amber-500/30 hover:border-amber-500/50' 
                      : 'bg-amber-50/70 border-amber-300 hover:border-amber-400'
                  )}>
                    <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <span className={clsx(
                        'p-2 rounded-lg',
                        isDarkMode ? 'bg-amber-800/50' : 'bg-amber-100'
                      )}>✅</span>
                      What Students Should Remember
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <input type="checkbox" className="mt-1" />
                        <div>
                          <p className="font-semibold">Deletion ≠ Erasure</p>
                          <p className="text-sm opacity-80">Files remain until overwritten</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <input type="checkbox" className="mt-1" />
                        <div>
                          <p className="font-semibold">STOP immediately</p>
                          <p className="text-sm opacity-80">No new writes after accidental deletion</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <input type="checkbox" className="mt-1" />
                        <div>
                          <p className="font-semibold">Check Recycle Bin first</p>
                          <p className="text-sm opacity-80">Most files go here first</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <input type="checkbox" className="mt-1" />
                        <div>
                          <p className="font-semibold">Have backups always</p>
                          <p className="text-sm opacity-80">3-2-1 backup rule</p>
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
                        <p className="text-sm">IT departments at Barrackpore companies implement file recovery drills twice a year.</p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm mb-1">Classroom Shortcut:</p>
                        <p className="text-sm">At Shyamnagar College, students practice recovery on virtual machines before working with real data.</p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm mb-1">Debugging Mindset:</p>
                        <p className="text-sm">Treat file recovery as a debugging problem: gather evidence, hypothesize, test, iterate.</p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm mb-1">Naming Advice:</p>
                        <p className="text-sm">Prefix temporary files with <code>_tmp_</code> so they're easily identifiable and safe to delete.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Recovery Success Visualization */}
          <section className="mb-10">
            <div className={cardClasses}>
              <h2 className="text-2xl font-bold mb-6">File Recovery Success Timeline</h2>
              
              <div className="flex flex-col items-center">
                <svg width="400" height="200" className="mb-6">
                  {/* Timeline */}
                  <line x1="50" y1="100" x2="350" y2="100" stroke={isDarkMode ? '#4b5563' : '#9ca3af'} strokeWidth="2" />
                  
                  {/* Time Points */}
                  <g>
                    {/* Immediate */}
                    <circle cx="80" cy="100" r="10" fill={recoveryColor}>
                      <animate attributeName="r" values="10;15;10" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <text x="80" y="130" textAnchor="middle" className={isDarkMode ? 'fill-gray-300' : 'fill-gray-700'} fontSize="12">Immediate</text>
                    <text x="80" y="145" textAnchor="middle" className={isDarkMode ? 'fill-green-300' : 'fill-green-600'} fontSize="10">90% success</text>
                    
                    {/* 1 Hour */}
                    <circle cx="150" cy="100" r="10" fill={isDarkMode ? '#fbbf24' : '#f59e0b'}>
                      <animate attributeName="r" values="10;15;10" dur="2s" repeatCount="indefinite" begin="0.5s" />
                    </circle>
                    <text x="150" y="130" textAnchor="middle" className={isDarkMode ? 'fill-gray-300' : 'fill-gray-700'} fontSize="12">1 Hour</text>
                    <text x="150" y="145" textAnchor="middle" className={isDarkMode ? 'fill-yellow-300' : 'fill-yellow-600'} fontSize="10">70% success</text>
                    
                    {/* 1 Day */}
                    <circle cx="220" cy="100" r="10" fill={isDarkMode ? '#f97316' : '#ea580c'}>
                      <animate attributeName="r" values="10;15;10" dur="2s" repeatCount="indefinite" begin="1s" />
                    </circle>
                    <text x="220" y="130" textAnchor="middle" className={isDarkMode ? 'fill-gray-300' : 'fill-gray-700'} fontSize="12">1 Day</text>
                    <text x="220" y="145" textAnchor="middle" className={isDarkMode ? 'fill-orange-300' : 'fill-orange-600'} fontSize="10">40% success</text>
                    
                    {/* 1 Week */}
                    <circle cx="290" cy="100" r="10" fill={warningColor}>
                      <animate attributeName="r" values="10;15;10" dur="2s" repeatCount="indefinite" begin="1.5s" />
                    </circle>
                    <text x="290" y="130" textAnchor="middle" className={isDarkMode ? 'fill-gray-300' : 'fill-gray-700'} fontSize="12">1 Week</text>
                    <text x="290" y="145" textAnchor="middle" className={isDarkMode ? 'fill-red-300' : 'fill-red-600'} fontSize="10">10% success</text>
                  </g>
                  
                  {/* Data flow animation */}
                  <circle cx="50" cy="100" r="8" fill={isDarkMode ? '#3b82f6' : '#2563eb'}>
                    <animate attributeName="cx" values="50;350" dur="4s" repeatCount="indefinite" />
                  </circle>
                </svg>

                <div className="text-center max-w-2xl">
                  <p className="text-lg mb-4">
                    Time is your enemy in file recovery. Every minute of normal computer use decreases recovery chances. Remember Debangshu from Shyamnagar who recovered his thesis because he stopped using his laptop immediately, while his friend continued browsing and lost everything.
                  </p>
                  <div className={clsx(
                    'p-4 rounded-lg',
                    isDarkMode ? 'bg-gray-700/30' : 'bg-rose-50'
                  )}>
                    <p className="font-bold">Key Insight:</p>
                    <p>The recovery mindset isn't about never making mistakes—it's about having a plan for when you inevitably do.</p>
                  </div>
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
                <p className="font-bold">Topic 16: File Deletion Mistakes & Recovery Mindset</p>
                <p className="text-sm opacity-80">Class 9 - Data Management & Error Recovery</p>
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

