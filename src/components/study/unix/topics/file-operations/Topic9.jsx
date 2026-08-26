import React, { Component } from 'react';
import clsx from 'clsx';

export default class Topic9 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: false,
      expandedSections: {
        theory: true,
        examples: false,
        commonMistakes: false,
        bestPractices: false
      }
    };
  }

  componentDidMount() {
    // Check for prefers-color-scheme on mount
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.setState({ isDarkMode: true });
    }

    // Add scroll listener for reveal animations
    this.setupScrollAnimations();
  }

  setupScrollAnimations() {
    // This would be implemented with Intersection Observer in a real app
    // For this example, we'll use a simple timeout to simulate initial animations
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

  render() {
    const { isDarkMode, expandedSections } = this.state;

    const containerClasses = clsx(
      'min-h-screen transition-all duration-500',
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-800'
    );

    const cardClasses = clsx(
      'rounded-2xl p-6 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl',
      isDarkMode 
        ? 'bg-gray-800/70 backdrop-blur-sm hover:bg-gray-700/80 hover:shadow-blue-500/10' 
        : 'bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-blue-200/50'
    );

    const headingClasses = clsx(
      'text-3xl font-bold mb-2',
      isDarkMode ? 'text-blue-300' : 'text-blue-700'
    );

    const teacherNoteClasses = clsx(
      'border-l-4 rounded-r-lg p-5 transition-all duration-300 hover:scale-[1.02]',
      isDarkMode 
        ? 'bg-blue-900/30 border-blue-400 hover:bg-blue-900/50' 
        : 'bg-blue-50 border-blue-500 hover:bg-blue-100'
    );

    const svgPathClasses = clsx(
      'transition-all duration-300',
      isDarkMode ? 'stroke-blue-300' : 'stroke-blue-600'
    );

    const stepCardClasses = clsx(
      'rounded-xl p-4 transition-all duration-300 hover:translate-y-[-4px]',
      isDarkMode 
        ? 'bg-gray-700/50 hover:bg-gray-600/60 hover:shadow-lg hover:shadow-blue-500/10' 
        : 'bg-white/90 hover:bg-white hover:shadow-lg hover:shadow-blue-200/50'
    );

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
              filter: drop-shadow(0 0 2px rgba(59, 130, 246, 0.5));
            }
            50% {
              filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.8));
            }
          }

          @keyframes drawPath {
            to {
              stroke-dashoffset: 0;
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
                    : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
                )}
              >
                {isDarkMode ? '🌙 Dark' : '☀️ Light'}
              </button>
            </div>

            <div className="reveal-section">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-[slideInFromLeft_0.8s_ease-out_forwards]">
                <span className={isDarkMode ? 'text-blue-300' : 'text-blue-600'}>
                  Topic 1: 
                </span>
                <span className={isDarkMode ? 'text-gray-100' : 'text-gray-800'}>
                  {' '}Brace Expansion & Advanced Globbing
                </span>
              </h1>
              <p className="text-xl opacity-80 animate-[slideInFromLeft_0.8s_ease-out_0.2s_forwards]">
                Mastering shell pattern matching for efficient file operations
              </p>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 pb-16">
          {/* Teacher's Note - Always visible */}
          <section className="mb-10 reveal-section">
            <div className={teacherNoteClasses}>
              <div className="flex items-start gap-4">
                <div className={clsx(
                  'p-3 rounded-lg transition-all duration-300 hover:animate-[pulseGlow_1.5s_ease-in-out]',
                  isDarkMode ? 'bg-blue-800/50' : 'bg-blue-100'
                )}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Teacher's Note</h3>
                  <p className="mb-2">
                    Brace expansion is often misunderstood as regular expressions. Remember, brace expansion happens <strong>before</strong> any other expansion in the shell. When Tuhina was organizing her project files, she used <code className="bg-gray-700/50 px-1 rounded">photos_{'{summer,winter}'}_2023</code> to quickly create directories for both seasons.
                  </p>
                  <div className={clsx(
                    'text-sm mt-3 p-3 rounded',
                    isDarkMode ? 'bg-gray-700/30' : 'bg-blue-100/50'
                  )}>
                    <strong>Pro Tip:</strong> Always test your brace expansions with <code className="bg-gray-700/50 px-1 rounded">echo</code> first before using them with commands like <code>rm</code> or <code>cp</code>. This saved Debangshu from accidentally deleting his semester project files last week!
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Theory Section */}
          <section className="mb-10">
            <button 
              onClick={() => this.toggleSection('theory')}
              className="w-full text-left mb-4"
            >
              <h2 className={clsx(
                'text-2xl font-bold flex items-center gap-3 transition-all duration-300 hover:gap-4',
                expandedSections.theory 
                  ? (isDarkMode ? 'text-blue-300' : 'text-blue-600')
                  : (isDarkMode ? 'text-gray-300' : 'text-gray-700')
              )}>
                <span className={clsx(
                  'transition-transform duration-300',
                  expandedSections.theory ? 'rotate-90' : ''
                )}>▶</span>
                Conceptual Foundation & Theory
              </h2>
            </button>

            {expandedSections.theory && (
              <div className="reveal-section">
                <div className={cardClasses}>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className={headingClasses}>What is Brace Expansion?</h3>
                      <p className="mb-4 leading-relaxed">
                        <strong>Signature:</strong> <code className={isDarkMode ? 'bg-gray-700 px-2 py-1 rounded' : 'bg-gray-100 px-2 py-1 rounded'}>{'{'}</code><em>pattern1,pattern2,...</em><code className={isDarkMode ? 'bg-gray-700 px-2 py-1 rounded' : 'bg-gray-100 px-2 py-1 rounded'}>{'}'}</code>
                      </p>
                      <p className="mb-4 leading-relaxed">
                        <strong>Return Type:</strong> Multiple expanded strings
                      </p>
                      <p className="mb-4 leading-relaxed">
                        <strong>Purpose:</strong> Generate multiple strings from a single pattern, useful for creating file lists, command arguments, or directory structures.
                      </p>
                      <p className="mb-4 leading-relaxed">
                        <strong>When & Why Used:</strong> When you need to perform the same operation on multiple files/directories with similar names, or when creating multiple similar files/directories at once.
                      </p>
                    </div>
                    
                    <div className={stepCardClasses}>
                      <h4 className="text-lg font-semibold mb-3">Expansion Process Visualization</h4>
                      <div className="flex justify-center">
                        <svg width="300" height="120" className="overflow-visible">
                          <defs>
                            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                              <path d="M 0 0 L 10 5 L 0 10 z" fill={isDarkMode ? '#93c5fd' : '#2563eb'} />
                            </marker>
                          </defs>
                          
                          <g className={svgPathClasses}>
                            <path 
                              d="M20,60 C60,30 80,30 120,60" 
                              fill="none" 
                              strokeWidth="2"
                              strokeDasharray="200"
                              strokeDashoffset="200"
                              className="animate-[drawPath_1.5s_ease-out_0.5s_forwards]"
                            >
                              <animate
                                attributeName="stroke-dashoffset"
                                from="200"
                                to="0"
                                dur="1.5s"
                                begin="0.5s"
                                fill="freeze"
                              />
                            </path>
                            
                            <text x="40" y="25" className={isDarkMode ? 'fill-gray-300' : 'fill-gray-700'} fontSize="14">
                              Input Pattern
                            </text>
                            <rect x="30" y="35" width="80" height="30" rx="5" className={isDarkMode ? 'fill-gray-700 stroke-blue-400' : 'fill-blue-50 stroke-blue-500'} strokeWidth="2" />
                            <text x="70" y="55" textAnchor="middle" className={isDarkMode ? 'fill-blue-300' : 'fill-blue-600'} fontSize="12">file_{'{1,2,3}'}.txt</text>
                            
                            <text x="180" y="25" className={isDarkMode ? 'fill-gray-300' : 'fill-gray-700'} fontSize="14">
                              Expanded Output
                            </text>
                            <rect x="170" y="35" width="110" height="30" rx="5" className={isDarkMode ? 'fill-gray-700 stroke-green-400' : 'fill-green-50 stroke-green-500'} strokeWidth="2" />
                            <text x="225" y="55" textAnchor="middle" className={isDarkMode ? 'fill-green-300' : 'fill-green-600'} fontSize="12">file1.txt file2.txt file3.txt</text>
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-700/30">
                    <h4 className="text-xl font-semibold mb-4">How It Works Internally</h4>
                    <p className="mb-4 leading-relaxed">
                      Brace expansion is a shell feature, not a filesystem feature. The shell processes the braces <strong>before</strong> executing the command. For example, when Abhronila types <code className={isDarkMode ? 'bg-gray-700 px-2 py-1 rounded' : 'bg-gray-100 px-2 py-1 rounded'}>touch student_{'{mid,final}'}_exam.txt</code>, the shell first expands it to <code className={isDarkMode ? 'bg-gray-700 px-2 py-1 rounded' : 'bg-gray-100 px-2 py-1 rounded'}>touch student_mid_exam.txt student_final_exam.txt</code>, then executes the touch command with both filenames.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Real-world Examples Section */}
          <section className="mb-10">
            <button 
              onClick={() => this.toggleSection('examples')}
              className="w-full text-left mb-4"
            >
              <h2 className={clsx(
                'text-2xl font-bold flex items-center gap-3 transition-all duration-300 hover:gap-4',
                expandedSections.examples 
                  ? (isDarkMode ? 'text-green-300' : 'text-green-600')
                  : (isDarkMode ? 'text-gray-300' : 'text-gray-700')
              )}>
                <span className={clsx(
                  'transition-transform duration-300',
                  expandedSections.examples ? 'rotate-90' : ''
                )}>▶</span>
                Real-world Usage Examples
              </h2>
            </button>

            {expandedSections.examples && (
              <div className="grid md:grid-cols-2 gap-6 reveal-section">
                {/* Example 1 */}
                <div className={stepCardClasses}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className={clsx(
                      'p-2 rounded-lg',
                      isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'
                    )}>
                      <span className="font-bold">📁</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Creating Multiple Directories</h4>
                      <p className="text-sm mb-3">Swadeep organizing school subjects:</p>
                      <code className={clsx(
                        'block p-3 rounded-lg mb-3 font-mono text-sm transition-all duration-300 hover:scale-[1.02]',
                        isDarkMode ? 'bg-gray-700/70 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                      )}>
                        mkdir -p semester1/{"{math,physics,chemistry}"}/notes
                      </code>
                      <p className="text-sm opacity-80">Creates: math/notes, physics/notes, chemistry/notes in semester1</p>
                    </div>
                  </div>
                </div>

                {/* Example 2 */}
                <div className={stepCardClasses}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className={clsx(
                      'p-2 rounded-lg',
                      isDarkMode ? 'bg-green-900/50' : 'bg-green-100'
                    )}>
                      <span className="font-bold">📊</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Numeric Sequences</h4>
                      <p className="text-sm mb-3">Generating report files for Barrackpore Office:</p>
                      <code className={clsx(
                        'block p-3 rounded-lg mb-3 font-mono text-sm transition-all duration-300 hover:scale-[1.02]',
                        isDarkMode ? 'bg-gray-700/70 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                      )}>
                        touch quarterly_report_{"{01..12}"}.pdf
                      </code>
                      <p className="text-sm opacity-80">Creates 12 files: quarterly_report_01.pdf to quarterly_report_12.pdf</p>
                    </div>
                  </div>
                </div>

                {/* Example 3 */}
                <div className={stepCardClasses}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className={clsx(
                      'p-2 rounded-lg',
                      isDarkMode ? 'bg-purple-900/50' : 'bg-purple-100'
                    )}>
                      <span className="font-bold">🔄</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Combined Operations</h4>
                      <p className="text-sm mb-3">Backup system for Shyamnagar Lab:</p>
                      <code className={clsx(
                        'block p-3 rounded-lg mb-3 font-mono text-sm transition-all duration-300 hover:scale-[1.02]',
                        isDarkMode ? 'bg-gray-700/70 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                      )}>
                        cp config.{"{yml,json}"} backup/{"{old,new}"}_
                      </code>
                      <div className="text-sm opacity-80 mt-2 p-2 rounded bg-gray-800/20">
                        <strong>Expands to:</strong> cp config.yml config.json backup/old_ backup/new_
                      </div>
                    </div>
                  </div>
                </div>

                {/* Example 4 */}
                <div className={stepCardClasses}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className={clsx(
                      'p-2 rounded-lg',
                      isDarkMode ? 'bg-yellow-900/50' : 'bg-yellow-100'
                    )}>
                      <span className="font-bold">🎯</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Advanced Pattern</h4>
                      <p className="text-sm mb-3">Ichapur School timetable generation:</p>
                      <code className={clsx(
                        'block p-3 rounded-lg mb-3 font-mono text-sm transition-all duration-300 hover:scale-[1.02]',
                        isDarkMode ? 'bg-gray-700/70 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                      )}>
                        touch class_{"{9,10,11}"}_{"{A,B,C}"}_{"{math,science}"}.doc
                      </code>
                      <p className="text-sm opacity-80">Creates 18 files with all combinations</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Advanced Globbing Section */}
          <section className="mb-10">
            <div className={cardClasses}>
              <h2 className="text-2xl font-bold mb-6">Advanced Globbing Patterns</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Common Globbing Patterns</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <span className={clsx(
                        'w-8 h-8 flex items-center justify-center rounded-full',
                        isDarkMode ? 'bg-blue-800/50' : 'bg-blue-100'
                      )}>*</span>
                      <div>
                        <strong className="font-mono">*</strong> - Matches any string
                        <p className="text-sm opacity-80">e.g., <code>*.txt</code> matches all text files</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className={clsx(
                        'w-8 h-8 flex items-center justify-center rounded-full',
                        isDarkMode ? 'bg-green-800/50' : 'bg-green-100'
                      )}>?</span>
                      <div>
                        <strong className="font-mono">?</strong> - Matches any single character
                        <p className="text-sm opacity-80">e.g., <code>file?.txt</code> matches file1.txt, fileA.txt</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className={clsx(
                        'w-8 h-8 flex items-center justify-center rounded-full',
                        isDarkMode ? 'bg-purple-800/50' : 'bg-purple-100'
                      )}>[]</span>
                      <div>
                        <strong className="font-mono">[abc]</strong> - Matches any character in set
                        <p className="text-sm opacity-80">e.g., <code>file[123].txt</code> matches file1.txt, file2.txt, file3.txt</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className={clsx(
                        'w-8 h-8 flex items-center justify-center rounded-full',
                        isDarkMode ? 'bg-yellow-800/50' : 'bg-yellow-100'
                      )}>{'{}'}</span>
                      <div>
                        <strong className="font-mono">{'{}'}</strong> - Brace expansion (not globbing!)
                        <p className="text-sm opacity-80">Expands before pattern matching</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className={stepCardClasses}>
                  <h4 className="text-lg font-bold mb-3">Extended Globbing (bash)</h4>
                  <div className="space-y-4">
                    <div>
                      <code className={clsx(
                        'inline-block px-3 py-1 rounded-lg mb-1 font-mono text-sm',
                        isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                      )}>shopt -s extglob</code>
                      <p className="text-sm mt-1">Enable extended globbing patterns</p>
                    </div>
                    
                    <div className="p-3 rounded bg-gray-800/20">
                      <p className="font-mono text-sm mb-1">?(pattern) - Zero or one occurrence</p>
                      <p className="font-mono text-sm mb-1">*(pattern) - Zero or more occurrences</p>
                      <p className="font-mono text-sm mb-1">+(pattern) - One or more occurrences</p>
                      <p className="font-mono text-sm">@(pattern) - Exactly one occurrence</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Common Pitfalls Section */}
          <section className="mb-10">
            <button 
              onClick={() => this.toggleSection('commonMistakes')}
              className="w-full text-left mb-4"
            >
              <h2 className={clsx(
                'text-2xl font-bold flex items-center gap-3 transition-all duration-300 hover:gap-4',
                expandedSections.commonMistakes 
                  ? (isDarkMode ? 'text-red-300' : 'text-red-600')
                  : (isDarkMode ? 'text-gray-300' : 'text-gray-700')
              )}>
                <span className={clsx(
                  'transition-transform duration-300',
                  expandedSections.commonMistakes ? 'rotate-90' : ''
                )}>▶</span>
                Common Pitfalls & Beginner Mistakes
              </h2>
            </button>

            {expandedSections.commonMistakes && (
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
                          <h4 className="font-bold text-lg mb-2">Quote Confusion</h4>
                          <p className="mb-2">Beginners often mistakenly quote braces:</p>
                          <code className={clsx(
                            'block p-2 rounded mb-2 font-mono text-sm',
                            isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                          )}>
                            echo "{'{a,b,c}'}"  # Wrong! Won't expand
                          </code>
                          <code className={clsx(
                            'block p-2 rounded font-mono text-sm',
                            isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                          )}>
                            echo {`{a,b,c}`}    # Correct! Expands to a b c
                          </code>
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
                          <h4 className="font-bold text-lg mb-2">Spacing Issues</h4>
                          <p>Spaces inside braces break expansion:</p>
                          <code className={clsx(
                            'block p-2 rounded mt-2 font-mono text-sm',
                            isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                          )}>
                            {`{a, b, c}`}  # Wrong! Space after comma
                          </code>
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
                          <h4 className="font-bold text-lg mb-2">Order of Expansion</h4>
                          <p>Common misconception about expansion order:</p>
                          <div className="mt-2 p-3 rounded bg-gray-800/20">
                            <p className="text-sm font-semibold">Correct Order:</p>
                            <ol className="text-sm list-decimal pl-5 mt-1 space-y-1">
                              <li>Brace Expansion <code className="text-xs">{'{'}</code></li>
                              <li>Tilde Expansion <code className="text-xs">~</code></li>
                              <li>Parameter Expansion <code className="text-xs">$VAR</code></li>
                              <li>Command Substitution <code className="text-xs">$(...)</code></li>
                              <li>Globbing <code className="text-xs">* ? []</code></li>
                            </ol>
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
                      : 'bg-blue-50/50 border-blue-200 hover:bg-blue-50'
                  )}>
                    <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                      <span className={clsx(
                        'p-1 rounded',
                        isDarkMode ? 'bg-blue-800/50' : 'bg-blue-100'
                      )}>🤔</span>
                      Hint Section
                    </h4>
                    <p className="mb-2">
                      <strong>Think about:</strong> What happens if you use brace expansion with special characters like <code>*</code> or <code>?</code> inside the braces?
                    </p>
                    <p className="mb-2">
                      <strong>Observe carefully:</strong> Try creating files with names containing spaces, then use globbing patterns to match them. What patterns work and what don't?
                    </p>
                    <p>
                      <strong>Try changing this:</strong> Create a pattern like <code>file_{'{1..3}'}.{'{txt,md}'}</code> and predict all the filenames it will generate before running the command.
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
                  ? (isDarkMode ? 'text-emerald-300' : 'text-emerald-600')
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
                      <h3 className="text-xl font-bold mb-4">Coding Standards</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <span className={clsx(
                            'mt-1 w-6 h-6 flex items-center justify-center rounded-full',
                            isDarkMode ? 'bg-emerald-800/50' : 'bg-emerald-100'
                          )}>1</span>
                          <div>
                            <strong>Always test with echo first</strong>
                            <p className="text-sm opacity-80">Prevents accidental file operations</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className={clsx(
                            'mt-1 w-6 h-6 flex items-center justify-center rounded-full',
                            isDarkMode ? 'bg-emerald-800/50' : 'bg-emerald-100'
                          )}>2</span>
                          <div>
                            <strong>Use descriptive patterns</strong>
                            <p className="text-sm opacity-80"><code>log_{'{error,warn,info}'}_</code> vs <code>file_{'{1,2,3}'}</code></p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className={clsx(
                            'mt-1 w-6 h-6 flex items-center justify-center rounded-full',
                            isDarkMode ? 'bg-emerald-800/50' : 'bg-emerald-100'
                          )}>3</span>
                          <div>
                            <strong>Quote when needed</strong>
                            <p className="text-sm opacity-80">Quote expanded results if they contain spaces</p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-4">Professional Tips & Tricks</h3>
                      <div className="space-y-4">
                        <div className="p-3 rounded bg-gray-800/20">
                          <p className="font-semibold mb-1">Nested Braces</p>
                          <p className="text-sm">Some shells support nested braces: <code>{`{{a,b},{c,d}}`}</code> expands to <code>a b c d</code></p>
                        </div>
                        <div className="p-3 rounded bg-gray-800/20">
                          <p className="font-semibold mb-1">Range with Step</p>
                          <p className="text-sm">Bash 4+: <code>{`{01..10..2}`}</code> gives <code>01 03 05 07 09</code></p>
                        </div>
                        <div className="p-3 rounded bg-gray-800/20">
                          <p className="font-semibold mb-1">Character Ranges</p>
                          <p className="text-sm">Use for alphabets: <code>{`{a..e}`}</code> expands to <code>a b c d e</code></p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mini Checklist */}
                  <div className={clsx(
                    'mt-8 p-5 rounded-xl border-2 transition-all duration-300 hover:scale-[1.01]',
                    isDarkMode 
                      ? 'bg-gray-800/50 border-blue-500/30 hover:border-blue-500/50' 
                      : 'bg-blue-50/70 border-blue-300 hover:border-blue-400'
                  )}>
                    <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <span className={clsx(
                        'p-2 rounded-lg',
                        isDarkMode ? 'bg-blue-800/50' : 'bg-blue-100'
                      )}>✅</span>
                      What Students Should Remember
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <input type="checkbox" className="mt-1" />
                        <div>
                          <p className="font-semibold">Brace expansion happens first</p>
                          <p className="text-sm opacity-80">Before globbing, before variable expansion</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <input type="checkbox" className="mt-1" />
                        <div>
                          <p className="font-semibold">No spaces inside braces</p>
                          <p className="text-sm opacity-80"><code>{`{a,b,c}`}</code> not <code>{`{a, b, c}`}</code></p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <input type="checkbox" className="mt-1" />
                        <div>
                          <p className="font-semibold">Test with echo first</p>
                          <p className="text-sm opacity-80">Always preview expansion before destructive operations</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <input type="checkbox" className="mt-1" />
                        <div>
                          <p className="font-semibold">Understand globbing vs expansion</p>
                          <p className="text-sm opacity-80">Globbing matches existing files, expansion generates strings</p>
                        </div>
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
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{stopColor: isDarkMode ? '#3b82f6' : '#1d4ed8', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: isDarkMode ? '#10b981' : '#059669', stopOpacity: 1}} />
                    </linearGradient>
                  </defs>
                  
                  <g>
                    {/* Timeline */}
                    <line x1="50" y1="100" x2="350" y2="100" stroke="url(#gradient)" strokeWidth="3" strokeDasharray="5,5">
                      <animate attributeName="stroke-dashoffset" from="300" to="0" dur="2s" begin="0.5s" fill="freeze" />
                    </line>
                    
                    {/* Start Point */}
                    <circle cx="50" cy="100" r="8" fill={isDarkMode ? '#3b82f6' : '#1d4ed8'}>
                      <animate attributeName="r" values="8;12;8" dur="2s" begin="1s" repeatCount="indefinite" />
                    </circle>
                    <text x="50" y="130" textAnchor="middle" className={isDarkMode ? 'fill-gray-300' : 'fill-gray-700'} fontSize="12">Input</text>
                    
                    {/* Mid Point */}
                    <circle cx="200" cy="100" r="8" fill={isDarkMode ? '#8b5cf6' : '#7c3aed'}>
                      <animate attributeName="r" values="8;12;8" dur="2s" begin="1.5s" repeatCount="indefinite" />
                    </circle>
                    <text x="200" y="130" textAnchor="middle" className={isDarkMode ? 'fill-gray-300' : 'fill-gray-700'} fontSize="12">Expansion</text>
                    
                    {/* End Point */}
                    <circle cx="350" cy="100" r="8" fill={isDarkMode ? '#10b981' : '#059669'}>
                      <animate attributeName="r" values="8;12;8" dur="2s" begin="2s" repeatCount="indefinite" />
                    </circle>
                    <text x="350" y="130" textAnchor="middle" className={isDarkMode ? 'fill-gray-300' : 'fill-gray-700'} fontSize="12">Execution</text>
                  </g>
                </svg>

                <div className="text-center max-w-2xl">
                  <p className="text-lg mb-4">
                    Brace expansion and globbing are <strong>fundamental shell skills</strong> that dramatically improve command-line efficiency. Remember that Debangshu from Naihati saved hours of work by using <code>mv project_{'{old,backup}'}</code> instead of moving files one by one.
                  </p>
                  <p className="opacity-80">
                    These tools are used daily by professionals in system administration, data processing, and development workflows.
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
                <p className="font-bold">Topic 1: Brace Expansion & Advanced Globbing</p>
                <p className="text-sm opacity-80">Class 9 - Shell Scripting Fundamentals</p>
              </div>
              <div className="text-sm opacity-70">
                <p>Teacher: Sukanta Hui • 27 years experience</p>
                <p>Email: sukantahui@codernaccotax.co.in • Mobile: 7003756860</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

