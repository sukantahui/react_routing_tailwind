// Topic14.jsx - Common mistakes beginners make while navigating file systems
import React from 'react';

export default class Topic14 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveredCard: null,
      isReducedMotion: false
    };
  }

  componentDidMount() {
    // Check for reduced motion preference
    this.checkReducedMotion();
    // Add resize listener for responsive adjustments
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  checkReducedMotion = () => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.setState({ isReducedMotion: mediaQuery.matches });
    
    // Listen for changes in preference
    mediaQuery.addEventListener('change', (e) => {
      this.setState({ isReducedMotion: e.matches });
    });
  };

  handleResize = () => {
    // Trigger re-render on resize for responsive adjustments
    this.forceUpdate();
  };

  handleCardHover = (cardId) => {
    this.setState({ hoveredCard: cardId });
  };

  handleCardLeave = () => {
    this.setState({ hoveredCard: null });
  };

  render() {
    const { hoveredCard, isReducedMotion } = this.state;
    
    // Animation classes based on reduced motion preference
    const animationClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.8s_ease-out_forwards]';
    const staggerClass = (delay) => 
      isReducedMotion ? '' : `motion-safe:animate-[fadeInUp_0.8s_ease-out_forwards] motion-safe:animation-delay-[${delay}ms]`;
    
    // Inline keyframes for the component
    const keyframesStyle = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes pulseSubtle {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.8; }
      }
      
      @keyframes highlightGlow {
        0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
        50% { box-shadow: 0 0 20px 5px rgba(59, 130, 246, 0.3); }
      }
    `;

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 transition-colors duration-300">
        <style>{keyframesStyle}</style>
        
        {/* Header Section */}
        <header className={`max-w-6xl mx-auto mb-12 ${animationClass}`}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-blue-200 dark:hover:bg-blue-800">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
              Topic 14: Common Mistakes Beginners Make While Navigating File Systems
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Learn to avoid pitfalls that trip up newcomers when working with directories, paths, and file operations.
            Essential knowledge for building solid foundational skills.
          </p>
        </header>

        <main className="max-w-6xl mx-auto">
          {/* Conceptual Explanation Section */}
          <section className={`mb-16 ${staggerClass(100)}`}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:translate-y-[-4px]">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-3">
                <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Core Conceptual Understanding
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    File system navigation seems straightforward until you encounter cryptic error messages. 
                    Beginners often struggle because they don't understand how paths, permissions, and directory 
                    structures actually work behind the scenes.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Think of it like navigating a library. Tuhina knows exactly where computer science books are, 
                    but Swadeep might wander into the fiction section by mistake. The file system has similar 
                    patterns - knowing the layout prevents wasted time.
                  </p>
                </div>
                
                <div className="relative">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border-2 border-dashed border-gray-300 dark:border-gray-600">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Real-World Analogy</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      Imagine Barrackpore's library organization: Main Building (root), Floors (directories), 
                      Sections (subdirectories), Shelves (file groupings). Going to the wrong floor means 
                      you won't find your book, similar to wrong directory paths.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Common Mistakes Grid */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8 flex items-center gap-3">
              <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              Common Mistakes & How to Avoid Them
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Mistake 1 */}
              <div 
                className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] cursor-pointer
                  ${hoveredCard === 1 ? 'ring-2 ring-blue-400 dark:ring-blue-500' : ''}`}
                onMouseEnter={() => this.handleCardHover(1)}
                onMouseLeave={this.handleCardLeave}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-red-600 dark:text-red-300">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Absolute vs Relative Path Confusion</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  Beginners often mix up paths starting with <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">/</code> (absolute) 
                  and those without (relative). Abhronila tried <code>cd documents</code> when in root, but needed <code>cd /home/student/documents</code>.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Solution</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-200">
                    Use <code>pwd</code> to see current location. Remember: <code>../</code> goes up one level, <code>./</code> means current directory.
                  </p>
                </div>
              </div>

              {/* Mistake 2 */}
              <div 
                className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] cursor-pointer
                  ${hoveredCard === 2 ? 'ring-2 ring-blue-400 dark:ring-blue-500' : ''}`}
                onMouseEnter={() => this.handleCardHover(2)}
                onMouseLeave={this.handleCardLeave}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-red-600 dark:text-red-300">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Case Sensitivity Ignorance</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  On Linux/Unix systems, <code>Documents</code> and <code>documents</code> are different. 
                  Debangshu spent hours debugging why <code>cd Documents</code> failed - he had created <code>documents</code> (lowercase).
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Solution</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-200">
                    Use tab completion to avoid typing errors. Check case with <code>ls</code> before assuming.
                  </p>
                </div>
              </div>

              {/* Mistake 3 */}
              <div 
                className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] cursor-pointer
                  ${hoveredCard === 3 ? 'ring-2 ring-blue-400 dark:ring-blue-500' : ''}`}
                onMouseEnter={() => this.handleCardHover(3)}
                onMouseLeave={this.handleCardLeave}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-flex-shrink-0">
                    <span className="font-bold text-red-600 dark:text-red-300">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Permission Denied Frustration</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  Trying to access <code>/etc</code> or system files without sudo, or creating files in read-only directories. 
                  A student from Shyamnagar couldn't save configs until they learned about <code>chmod</code>.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Solution</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-200">
                    Use <code>ls -la</code> to check permissions. Understand rwx (read-write-execute) for user, group, others.
                  </p>
                </div>
              </div>

              {/* Mistake 4 */}
              <div 
                className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] cursor-pointer
                  ${hoveredCard === 4 ? 'ring-2 ring-blue-400 dark:ring-blue-500' : ''}`}
                onMouseEnter={() => this.handleCardHover(4)}
                onMouseLeave={this.handleCardLeave}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-red-600 dark:text-red-300">4</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Spaces in Filenames</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  Creating files like <code>"my document.txt"</code> then struggling with commands. 
                  <code>rm my document.txt</code> tries to delete two files: <code>my</code> and <code>document.txt</code>.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Solution</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-200">
                    Use underscores <code>my_document.txt</code> or quotes: <code>rm "my document.txt"</code>. 
                    Better: avoid spaces in technical files.
                  </p>
                </div>
              </div>

              {/* Mistake 5 */}
              <div 
                className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] cursor-pointer
                  ${hoveredCard === 5 ? 'ring-2 ring-blue-400 dark:ring-blue-500' : ''}`}
                onMouseEnter={() => this.handleCardHover(5)}
                onMouseLeave={this.handleCardLeave}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-red-600 dark:text-red-300">5</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Forgetting cd .. to Navigate Up</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  Getting "lost" in deep directory trees, then using long absolute paths instead of simple <code>cd ..</code> or <code>cd ../..</code>. 
                  A Naihati student typed full paths 20+ times before learning this.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Solution</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-200">
                    Remember: <code>..</code> means parent directory. Use <code>cd -</code> to go to previous directory.
                  </p>
                </div>
              </div>

              {/* Mistake 6 */}
              <div 
                className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] cursor-pointer
                  ${hoveredCard === 6 ? 'ring-2 ring-blue-400 dark:ring-blue-500' : ''}`}
                onMouseEnter={() => this.handleCardHover(6)}
                onMouseLeave={this.handleCardLeave}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-red-600 dark:text-red-300">6</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Hidden File Oversight</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  Configuration files (like <code>.bashrc</code>, <code>.gitignore</code>) start with dot and don't show in normal <code>ls</code>. 
                  Beginners think files are "missing" when they're just hidden.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Solution</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-200">
                    Use <code>ls -a</code> to show all files (including hidden). Remember: dotfiles are hidden by design.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Visual Navigation Guide */}
          <section className={`mb-16 ${staggerClass(300)}`}>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-3">
                <svg className="w-7 h-7 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Visual Path Navigation Guide
              </h2>
              
              <div className="flex flex-col items-center">
                <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner">
                  {/* SVG Navigation Diagram */}
                  <svg viewBox="0 0 800 300" className="w-full h-auto">
                    {/* Directory Structure */}
                    <g className="hover:opacity-80 transition-opacity duration-300">
                      <rect x="50" y="50" width="120" height="60" rx="8" fill="#3B82F6" className="hover:fill-blue-400 transition-all duration-300" />
                      <text x="110" y="85" textAnchor="middle" fill="white" className="font-bold">/ (root)</text>
                      
                      <path d="M110 110 L110 130" stroke="#6B7280" strokeWidth="2" strokeDasharray="5,5" />
                      
                      <rect x="30" y="140" width="100" height="50" rx="6" fill="#10B981" className="hover:fill-green-400 transition-all duration-300">
                        <animate attributeName="fill" values="#10B981;#34D399;#10B981" dur="3s" repeatCount="indefinite" begin="0s" />
                      </rect>
                      <text x="80" y="170" textAnchor="middle" fill="white" fontSize="14">home</text>
                      
                      <rect x="150" y="140" width="100" height="50" rx="6" fill="#8B5CF6" className="hover:fill-purple-400 transition-all duration-300">
                        <animate attributeName="fill" values="#8B5CF6;#A78BFA;#8B5CF6" dur="3s" repeatCount="indefinite" begin="1s" />
                      </rect>
                      <text x="200" y="170" textAnchor="middle" fill="white" fontSize="14">etc</text>
                      
                      <rect x="270" y="140" width="100" height="50" rx="6" fill="#F59E0B" className="hover:fill-yellow-400 transition-all duration-300">
                        <animate attributeName="fill" values="#F59E0B;#FBBF24;#F59E0B" dur="3s" repeatCount="indefinite" begin="2s" />
                      </rect>
                      <text x="320" y="170" textAnchor="middle" fill="white" fontSize="14">var</text>
                      
                      {/* User directories */}
                      <path d="M80 190 L80 210" stroke="#6B7280" strokeWidth="2" strokeDasharray="5,5" />
                      <rect x="30" y="220" width="100" height="40" rx="5" fill="#EC4899" className="hover:fill-pink-400 transition-all duration-300" />
                      <text x="80" y="245" textAnchor="middle" fill="white" fontSize="12">student</text>
                      
                      {/* Nested structure */}
                      <path d="M80 260 L80 280" stroke="#6B7280" strokeWidth="2" strokeDasharray="5,5" />
                      <rect x="30" y="290" width="80" height="35" rx="4" fill="#6366F1" className="hover:fill-indigo-400 transition-all duration-300" />
                      <text x="70" y="312" textAnchor="middle" fill="white" fontSize="11">documents</text>
                    </g>
                    
                    {/* Navigation arrows with animations */}
                    <g>
                      <path d="M400 100 L500 100 L500 50 L520 80 L500 110 L500 60 L400 60 Z" fill="#EF4444" opacity="0.7">
                        <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                      </path>
                      <text x="450" y="95" textAnchor="middle" fill="#DC2626" fontSize="14">Wrong Path</text>
                      
                      <path d="M400 200 L500 200 L500 150 L520 180 L500 210 L500 160 L400 160 Z" fill="#10B981" opacity="0.7">
                        <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="1s" />
                      </path>
                      <text x="450" y="195" textAnchor="middle" fill="#059669" fontSize="14">Correct Path</text>
                    </g>
                    
                    {/* Examples */}
                    <g className="hover:opacity-90 transition-opacity duration-300">
                      <rect x="550" y="40" width="220" height="40" rx="6" fill="#1F2937" />
                      <text x="560" y="65" fill="#D1D5DB" fontSize="12">cd /home/student/documents ✓</text>
                      
                      <rect x="550" y="90" width="220" height="40" rx="6" fill="#1F2937" />
                      <text x="560" y="115" fill="#D1D5DB" fontSize="12">cd documents ✗ (if not in home)</text>
                      
                      <rect x="550" y="140" width="220" height="40" rx="6" fill="#1F2937" />
                      <text x="560" y="165" fill="#D1D5DB" fontSize="12">cd ../.. (go up two levels)</text>
                      
                      <rect x="550" y="190" width="220" height="40" rx="6" fill="#1F2937" />
                      <text x="560" y="215" fill="#D1D5DB" fontSize="12">pwd (see current path)</text>
                    </g>
                  </svg>
                  
                  <div className="mt-6 text-center">
                    <p className="text-gray-600 dark:text-gray-300 italic">
                      "Visualize the tree structure. When Debangshu imagines directories as branches, 
                      he navigates faster than typing random paths."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tips & Tricks Section */}
          <section className={`mb-16 ${staggerClass(400)}`}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-3">
                <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Professional Tips & Tricks
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 dark:text-green-300 font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-gray-100">Tab Completion Mastery</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Press Tab once to auto-complete, twice to show options. Saves time and prevents typos.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 dark:text-green-300 font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-gray-100">Pushd/Popd Stack Navigation</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Use <code>pushd</code> to save current directory, <code>popd</code> to return. Like bookmarks for paths.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 dark:text-green-300 font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-gray-100">Symlink Awareness</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Check if a directory is a symbolic link with <code>ls -la</code>. Real path vs linked path matters.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 dark:text-green-300 font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-gray-100">Tree Command Visualization</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Install <code>tree</code> command to see directory structure visually. Perfect for planning.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 dark:text-green-300 font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-gray-100">CDPATH Environment Variable</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Set CDPATH to frequently visited directories. <code>cd project</code> can jump directly.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 dark:text-green-300 font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-gray-100">Alias Common Navigations</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        <code>alias proj='cd /home/student/projects'</code> saves repetitive typing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Hint Section */}
          <section className={`mb-16 ${staggerClass(500)}`}>
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-2xl p-8 border-2 border-yellow-200 dark:border-yellow-800">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-3">
                <svg className="w-7 h-7 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Thinking Hints (Don't Skip!)
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors duration-300">
                  <div className="w-6 h-6 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center flex-shrink-0">
                    <span className="text-yellow-600 dark:text-yellow-300 text-sm font-bold">💡</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-100">Observe carefully...</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      When you get "No such file or directory", don't just retype. Check: Are you in the right directory? 
                      Did you check case? Is it a hidden file?
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors duration-300">
                  <div className="w-6 h-6 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center flex-shrink-0">
                    <span className="text-yellow-600 dark:text-yellow-300 text-sm font-bold">🔍</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-100">Think about...</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Why does <code>cd /</code> work from anywhere but <code>cd home</code> might fail? 
                      Understand the difference between root and your home directory.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors duration-300">
                  <div className="w-6 h-6 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center flex-shrink-0">
                    <span className="text-yellow-600 dark:text-yellow-300 text-sm font-bold">🎯</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-100">Try changing this...</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Experiment: Create a file with spaces, then try to delete it with and without quotes. 
                      Notice how the shell interprets spaces differently.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Teacher's Note */}
          <section className={`${staggerClass(600)}`}>
            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl p-8 border-l-4 border-blue-500 hover:border-blue-600 transition-all duration-500 hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-110 hover:bg-blue-600">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Teacher's Note</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    I've noticed students from Ichapur and Naihati make similar mistakes: they rush through navigation 
                    without understanding the underlying structure. Remember these key points:
                  </p>
                  
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-gray-300">
                        <strong>Muscle Memory:</strong> Practice <code>cd ..</code> and <code>cd -</code> until they're automatic.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-gray-300">
                        <strong>Context Awareness:</strong> Always know where you are (<code>pwd</code>) before moving.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-gray-300">
                        <strong>Error Reading:</strong> "Permission denied" means ownership/perms, not "file doesn't exist".
                      </span>
                    </li>
                  </ul>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mt-4">
                    <p className="text-blue-700 dark:text-blue-300 text-sm italic">
                      "Swadeep struggled for weeks until he started drawing directory trees. 
                      Visual learners: Sketch your path before typing commands!"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Mini Checklist Footer */}
        <footer className={`max-w-6xl mx-auto mt-16 ${staggerClass(700)}`}>
          <div className="bg-gray-800 dark:bg-gray-900 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Navigation Checklist (What to Remember)
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">1</span>
                </div>
                <span className="text-gray-200">Always check current directory (pwd)</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">2</span>
                </div>
                <span className="text-gray-200">Use Tab completion religiously</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">3</span>
                </div>
                <span className="text-gray-200">Avoid spaces in filenames</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">4</span>
                </div>
                <span className="text-gray-200">Remember case sensitivity on Linux</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">5</span>
                </div>
                <span className="text-gray-200">Use ls -a to see hidden files</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">6</span>
                </div>
                <span className="text-gray-200">Understand ../ vs ./ vs /</span>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-700">
              <p className="text-gray-400 text-center text-sm">
                Master these basics and you'll navigate like Abhronila does through Barrackpore's library—effortlessly and precisely.
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

 