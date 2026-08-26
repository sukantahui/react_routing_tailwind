import React from 'react';
import clsx from 'clsx';

export default class Topic10 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: false,
      umaskValue: '0022',
      showAnimation: false
    };
  }

  componentDidMount() {
    // Trigger animations after mount
    setTimeout(() => {
      this.setState({ showAnimation: true });
    }, 100);
    
    // Check for dark mode preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.setState({ isDarkMode: true });
    }
    
    // Listen for dark mode changes
    this.darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkModeListener = (e) => this.setState({ isDarkMode: e.matches });
    this.darkModeMediaQuery.addListener(this.darkModeListener);
  }

  componentWillUnmount() {
    if (this.darkModeMediaQuery && this.darkModeListener) {
      this.darkModeMediaQuery.removeListener(this.darkModeListener);
    }
  }

  handleUmaskChange = (value) => {
    if (/^[0-7]{3,4}$/.test(value)) {
      this.setState({ umaskValue: value });
    }
  };

  calculatePermissions = () => {
    const { umaskValue } = this.state;
    const umask = umaskValue.padStart(4, '0');
    
    // For directories (default 0777)
    const dirDefault = 0o777;
    const dirUmask = parseInt(umask, 8);
    const dirFinal = dirDefault & (~dirUmask);
    
    // For files (default 0666)
    const fileDefault = 0o666;
    const fileFinal = fileDefault & (~dirUmask);
    
    return {
      umaskOctal: umask,
      dirDefault: dirDefault.toString(8),
      dirFinal: dirFinal.toString(8),
      fileDefault: fileDefault.toString(8),
      fileFinal: fileFinal.toString(8),
      symbolicUmask: this.octalToSymbolic(umask),
      symbolicDir: this.octalToSymbolic(dirFinal.toString(8)),
      symbolicFile: this.octalToSymbolic(fileFinal.toString(8))
    };
  };

  octalToSymbolic = (octal) => {
    const digits = octal.padStart(4, '0').split('');
    let symbolic = '';
    
    digits.forEach(digit => {
      const oct = parseInt(digit, 8);
      symbolic += (oct & 4) ? 'r' : '-';
      symbolic += (oct & 2) ? 'w' : '-';
      symbolic += (oct & 1) ? 'x' : '-';
    });
    
    return symbolic;
  };

  render() {
    const { isDarkMode, umaskValue, showAnimation } = this.state;
    const permissions = this.calculatePermissions();

    const themeClasses = clsx(
      'min-h-screen transition-colors duration-300',
      isDarkMode 
        ? 'bg-gray-900 text-gray-100' 
        : 'bg-gradient-to-br from-blue-50 to-gray-50 text-gray-900'
    );

    const cardClasses = clsx(
      'rounded-xl p-6 transition-all duration-300',
      isDarkMode
        ? 'bg-gray-800 border border-gray-700 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]'
        : 'bg-white border border-gray-200 hover:border-blue-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]'
    );

    const teacherNoteClasses = clsx(
      'rounded-lg p-5 transition-all duration-300',
      isDarkMode
        ? 'bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-l-4 border-yellow-500 hover:shadow-[0_0_25px_rgba(234,179,8,0.15)]'
        : 'bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-500 hover:shadow-[0_0_25px_rgba(234,179,8,0.2)]'
    );

    const sectionAnimation = clsx(
      'transition-all duration-700 motion-safe:animate-[fadeInUp_0.8s_ease-out]',
      showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    );

    // Inline styles for keyframes
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
      @keyframes pulseSoft {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.8; }
      }
      @keyframes highlightGlow {
        0%, 100% { filter: drop-shadow(0 0 0px rgba(59,130,246,0)); }
        50% { filter: drop-shadow(0 0 8px rgba(59,130,246,0.3)); }
      }
    `;

    return (
      <div className={themeClasses}>
        <style>{keyframesStyle}</style>
        
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          {/* Header Section */}
          <header className={clsx(sectionAnimation, "mb-12 text-center")}>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Topic 1: umask – The Permission Mask
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Master the Linux/Unix permission masking system that controls default file and directory permissions.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Left Column - Theory */}
            <div className="lg:col-span-2 space-y-8">
              {/* Conceptual Explanation */}
              <section className={clsx(sectionAnimation, cardClasses)} style={{animationDelay: '0.1s'}}>
                <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400">
                  <span className="inline-block p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-2">📘</span>
                  What is umask?
                </h2>
                <div className="space-y-4 text-lg leading-relaxed">
                  <p>
                    The <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded font-mono">umask</code> (user mask) is a 
                    <strong> three or four-digit octal number</strong> that determines the default permissions 
                    for newly created files and directories in Unix/Linux systems.
                  </p>
                  <p>
                    Think of it as a "permission filter" - it subtracts permissions from the maximum 
                    default permissions that files and directories would otherwise get.
                  </p>
                  <p className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border-l-4 border-green-500">
                    <strong>Real-world analogy:</strong> When Swadeep at Barrackpore creates a new project folder, 
                    the system uses <code>umask</code> to decide who can read/write/execute his files by default, 
                    protecting his work from unauthorized access.
                  </p>
                </div>
              </section>

              {/* How umask Works */}
              <section className={clsx(sectionAnimation, cardClasses)} style={{animationDelay: '0.2s'}}>
                <h2 className="text-2xl font-bold mb-4 text-purple-700 dark:text-purple-400">
                  <span className="inline-block p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-2">⚙️</span>
                  How umask Calculation Works
                </h2>
                
                <div className="mb-6">
                  <div className="flex items-center justify-center mb-8">
                    <svg width="600" height="200" viewBox="0 0 600 200" className="w-full max-w-lg">
                      <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" style={{stopColor: '#3B82F6', stopOpacity:1}} />
                          <stop offset="100%" style={{stopColor: '#8B5CF6', stopOpacity:1}} />
                        </linearGradient>
                      </defs>
                      
                      {/* Default Permissions */}
                      <rect x="50" y="50" width="120" height="60" rx="10" 
                            className="fill-blue-500 stroke-blue-700 stroke-2" />
                      <text x="110" y="85" textAnchor="middle" className="fill-white text-lg font-bold">
                        0777
                      </text>
                      <text x="110" y="115" textAnchor="middle" className="fill-white text-sm">
                        Directory Default
                      </text>
                      
                      {/* Minus Sign */}
                      <text x="195" y="85" textAnchor="middle" className="fill-gray-700 dark:fill-gray-300 text-2xl font-bold">
                        −
                      </text>
                      
                      {/* umask */}
                      <rect x="220" y="50" width="120" height="60" rx="10" 
                            className="fill-red-500 stroke-red-700 stroke-2" />
                      <text x="280" y="85" textAnchor="middle" className="fill-white text-lg font-bold">
                        0022
                      </text>
                      <text x="280" y="115" textAnchor="middle" className="fill-white text-sm">
                        umask
                      </text>
                      
                      {/* Equals Sign */}
                      <text x="365" y="85" textAnchor="middle" className="fill-gray-700 dark:fill-gray-300 text-2xl font-bold">
                        =
                      </text>
                      
                      {/* Result */}
                      <rect x="390" y="50" width="120" height="60" rx="10" 
                            className="fill-green-500 stroke-green-700 stroke-2">
                        <animate attributeName="opacity" values="1;0.7;1" dur="2s" repeatCount="indefinite" />
                      </rect>
                      <text x="450" y="85" textAnchor="middle" className="fill-white text-lg font-bold">
                        0755
                      </text>
                      <text x="450" y="115" textAnchor="middle" className="fill-white text-sm">
                        Final Permission
                      </text>
                      
                      {/* Arrows */}
                      <path d="M170,80 L210,80" stroke="#4B5563" strokeWidth="2" fill="none" />
                      <path d="M340,80 L380,80" stroke="#4B5563" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Calculation Formula:</h3>
                    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg font-mono">
                      <p><strong>For directories:</strong> Default (0777) AND (NOT umask)</p>
                      <p><strong>For files:</strong> Default (0666) AND (NOT umask)</p>
                    </div>
                    
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="font-semibold mb-2">Example with umask 0022:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Directory: 0777 & ~0022 = 0755 (rwxr-xr-x)</li>
                        <li>File: 0666 & ~0022 = 0644 (rw-r--r--)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Real-World Usage */}
              <section className={clsx(sectionAnimation, cardClasses)} style={{animationDelay: '0.3s'}}>
                <h2 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-400">
                  <span className="inline-block p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-2">🌐</span>
                  Real-World Usage Examples
                </h2>
                
                <div className="space-y-6">
                  <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-bold text-lg mb-2">1. Web Server Configuration</h4>
                    <p className="mb-2">When Tuhina deploys a website from Shyamnagar:</p>
                    <code className="block p-3 bg-gray-900 text-green-400 rounded font-mono text-sm">
                      $ umask 0027  # Group members can read, others have no access<br/>
                      $ mkdir uploads<br/>
                      $ touch config.php
                    </code>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Result: uploads (0750), config.php (0640) - secure from public access
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-bold text-lg mb-2">2. Multi-user Project (College Lab)</h4>
                    <p className="mb-2">When Abhronila collaborates with Debangshu on a project:</p>
                    <code className="block p-3 bg-gray-900 text-green-400 rounded font-mono text-sm">
                      $ umask 0002  # Group members get write access<br/>
                      $ touch shared_document.txt<br/>
                      $ mkdir team_work
                    </code>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Both team members can modify files in the shared directory
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column - Interactive & Reference */}
            <div className="space-y-8">
              {/* Interactive Calculator */}
              <section className={clsx(sectionAnimation, cardClasses)} style={{animationDelay: '0.4s'}}>
                <h2 className="text-2xl font-bold mb-4 text-red-700 dark:text-red-400">
                  <span className="inline-block p-2 bg-red-100 dark:red-900/30 rounded-lg mr-2">🧮</span>
                  Umask Calculator
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block mb-2 font-semibold">Enter umask (octal):</label>
                    <input
                      type="text"
                      value={umaskValue}
                      onChange={(e) => this.handleUmaskChange(e.target.value)}
                      className="w-full p-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg font-mono text-center text-xl"
                      maxLength="4"
                    />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Enter 3-4 digit octal number (0-7)
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-bold mb-2">Current umask: {permissions.umaskOctal}</h4>
                      <p className="text-sm">Symbolic: {permissions.symbolicUmask}</p>
                    </div>
                    
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h4 className="font-bold mb-2">Directory Permissions</h4>
                      <p>Default: 0{permissions.dirDefault}</p>
                      <p>Final: 0{permissions.dirFinal}</p>
                      <p className="font-mono text-sm mt-1">{permissions.symbolicDir}</p>
                    </div>
                    
                    <div className="p-4 bg-purple-50 dark:purple-900/20 rounded-lg">
                      <h4 className="font-bold mb-2">File Permissions</h4>
                      <p>Default: 0{permissions.fileDefault}</p>
                      <p>Final: 0{permissions.fileFinal}</p>
                      <p className="font-mono text-sm mt-1">{permissions.symbolicFile}</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Quick Reference */}
              <section className={clsx(sectionAnimation, cardClasses)} style={{animationDelay: '0.5s'}}>
                <h2 className="text-2xl font-bold mb-4 text-amber-700 dark:text-amber-400">
                  <span className="inline-block p-2 bg-amber-100 dark:amber-900/30 rounded-lg mr-2">📋</span>
                  Common umask Values
                </h2>
                
                <div className="space-y-4">
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">0022</span>
                      <span className="text-sm px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded">Most Common</span>
                    </div>
                    <p className="text-sm mt-1">User: rwx, Group: r-x, Others: r-x (dirs)<br/>User: rw-, Group: r--, Others: r-- (files)</p>
                  </div>
                  
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">0002</span>
                      <span className="text-sm px-2 py-1 bg-green-100 dark:bg-green-900 rounded">Group Write</span>
                    </div>
                    <p className="text-sm mt-1">Allows group members to write to files</p>
                  </div>
                  
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">0077</span>
                      <span className="text-sm px-2 py-1 bg-red-100 dark:bg-red-900 rounded">Private</span>
                    </div>
                    <p className="text-sm mt-1">Only owner can access, perfect for confidential files</p>
                  </div>
                  
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">0000</span>
                      <span className="text-sm px-2 py-1 bg-purple-100 dark:bg-purple-900 rounded">Maximum</span>
                    </div>
                    <p className="text-sm mt-1">No restrictions - everyone gets all permissions</p>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Teacher's Note */}
          <section className={clsx(sectionAnimation, "mb-12")}>
            <div className={teacherNoteClasses}>
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center text-white font-bold">
                    SH
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-amber-800 dark:text-yellow-300">Teacher's Note</h3>
                    <span className="text-sm px-3 py-1 bg-amber-200 dark:bg-amber-900 rounded-full font-semibold">
                      Sukanta Hui
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="mb-2"><strong>Experience:</strong> 27 years in Programming, RDBMS, OS, Web Development</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Email: sukantahui@codernaccotax.co.in | Mobile: 7003756860
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-white/50 dark:bg-gray-900/30 rounded">
                      <p className="font-semibold text-amber-700 dark:text-yellow-400 mb-1">⚠️ Critical Point:</p>
                      <p>Remember that umask is a MASK (subtraction), not the permission itself. Many beginners get this wrong!</p>
                    </div>
                    
                    <div className="p-3 bg-white/50 dark:bg-gray-900/30 rounded">
                      <p className="font-semibold text-amber-700 dark:text-yellow-400 mb-1">💡 Teaching Tip:</p>
                      <p>Use the "octal to binary" conversion to explain why 7 means rwx. Each bit represents a permission.</p>
                    </div>
                    
                    <div className="p-3 bg-white/50 dark:bg-gray-900/30 rounded">
                      <p className="font-semibold text-amber-700 dark:text-yellow-400 mb-1">🎯 Professional Tip:</p>
                      <p>In production, never use umask 0000. Always consider security implications. Use 0027 or 0037 for sensitive files.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Common Pitfalls & Best Practices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Common Pitfalls */}
            <section className={clsx(sectionAnimation, cardClasses)} style={{animationDelay: '0.6s'}}>
              <h2 className="text-2xl font-bold mb-4 text-red-700 dark:text-red-400">
                <span className="inline-block p-2 bg-red-100 dark:red-900/30 rounded-lg mr-2">🚫</span>
                Common Pitfalls & Mistakes
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-bold mb-1">1. Confusing umask with chmod</h4>
                  <p className="text-sm">umask affects NEW files only; chmod changes EXISTING files. Beginners often mix them up.</p>
                </div>
                
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-bold mb-1">2. Octal vs Symbolic confusion</h4>
                  <p className="text-sm">Trying to use symbolic notation (like u=rwx) with umask - it only accepts octal numbers.</p>
                </div>
                
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-bold mb-1">3. Forgetting about executable bit</h4>
                  <p className="text-sm">Files don't get execute permission by default (0666), even if umask allows it.</p>
                </div>
                
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-bold mb-1">4. Shell session vs permanent</h4>
                  <p className="text-sm">umask set in terminal is temporary. For permanent change, add to shell config files.</p>
                </div>
              </div>
            </section>

            {/* Best Practices */}
            <section className={clsx(sectionAnimation, cardClasses)} style={{animationDelay: '0.7s'}}>
              <h2 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-400">
                <span className="inline-block p-2 bg-green-100 dark:green-900/30 rounded-lg mr-2">✅</span>
                Best Practices
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-bold mb-1">1. Default to restrictive</h4>
                  <p className="text-sm">Start with 0027 or 0037 for production systems. You can always relax permissions later.</p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-bold mb-1">2. Use group permissions wisely</h4>
                  <p className="text-sm">For team projects (like college labs), use 0002 to allow group collaboration.</p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-bold mb-1">3. Document your choices</h4>
                  <p className="text-sm">In team environments, document why a particular umask was chosen in README files.</p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-bold mb-1">4. Test before deployment</h4>
                  <p className="text-sm">Always test file creation with your umask in a safe environment before production use.</p>
                </div>
              </div>
            </section>
          </div>

          {/* Hint Section & Mini Checklist */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Hint Section */}
            <section className={clsx(sectionAnimation, cardClasses)} style={{animationDelay: '0.8s'}}>
              <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">
                <span className="inline-block p-2 bg-indigo-100 dark:indigo-900/30 rounded-lg mr-2">💭</span>
                Thinking Hints
              </h2>
              
              <div className="space-y-3">
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <p className="font-semibold mb-1">🤔 Think about...</p>
                  <p>Why does Linux use 666 for files and 777 for directories as defaults?</p>
                </div>
                
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <p className="font-semibold mb-1">👀 Observe carefully...</p>
                  <p>What happens when you set umask to 0111? Why does this remove execute permission?</p>
                </div>
                
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <p className="font-semibold mb-1">🔧 Try changing...</p>
                  <p>Set umask to 0133 and create a file. Notice which permissions are removed and why.</p>
                </div>
                
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <p className="font-semibold mb-1">🧠 Consider...</p>
                  <p>How would you configure umask for a shared webserver hosting multiple clients?</p>
                </div>
              </div>
            </section>

            {/* Mini Checklist */}
            <section className={clsx(sectionAnimation, cardClasses)} style={{animationDelay: '0.9s'}}>
              <h2 className="text-2xl font-bold mb-4 text-teal-700 dark:text-teal-400">
                <span className="inline-block p-2 bg-teal-100 dark:teal-900/30 rounded-lg mr-2">📝</span>
                What to Remember
              </h2>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 mr-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center text-white text-sm">1</div>
                  </div>
                  <div>
                    <p className="font-semibold">umask is subtractive</p>
                    <p className="text-sm">It removes permissions from the default maximum</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 mr-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center text-white text-sm">2</div>
                  </div>
                  <div>
                    <p className="font-semibold">Different defaults</p>
                    <p className="text-sm">Files: 666, Directories: 777 before umask application</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 mr-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center text-white text-sm">3</div>
                  </div>
                  <div>
                    <p className="font-semibold">Octal notation only</p>
                    <p className="text-sm">umask uses 3-4 digit octal numbers (0-7)</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 mr-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center text-white text-sm">4</div>
                  </div>
                  <div>
                    <p className="font-semibold">Session vs Permanent</p>
                    <p className="text-sm">Shell umask is temporary; edit .bashrc for permanence</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 mr-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center text-white text-sm">5</div>
                  </div>
                  <div>
                    <p className="font-semibold">Security first</p>
                    <p className="text-sm">Default to restrictive permissions (0027, 0037)</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <footer className={clsx(sectionAnimation, "mt-12 pt-8 border-t border-gray-300 dark:border-gray-700 text-center")}>
            <p className="text-gray-600 dark:text-gray-400">
              Topic 1: umask – The Foundation of Linux File Permissions
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Next Topic: Default permission creation logic for files vs directories
            </p>
          </footer>
        </div>
      </div>
    );
  }
}

