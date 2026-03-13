import React from 'react';
import clsx from 'clsx';

class Topic2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: false,
      isReducedMotion: false,
      selectedPermission: '755',
      showCalculation: false,
      calculationStep: 0
    };
  }

  componentDidMount() {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.setState({ isReducedMotion: mediaQuery.matches });
    
    // Listen for changes
    mediaQuery.addEventListener('change', this.handleMotionPreferenceChange);
    
    // Check initial color scheme
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.setState({ isDarkMode: darkModeMediaQuery.matches });
    
    // Listen for color scheme changes
    darkModeMediaQuery.addEventListener('change', this.handleColorSchemeChange);
  }

  componentWillUnmount() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    mediaQuery.removeEventListener('change', this.handleMotionPreferenceChange);
    darkModeMediaQuery.removeEventListener('change', this.handleColorSchemeChange);
  }

  handleMotionPreferenceChange = (e) => {
    this.setState({ isReducedMotion: e.matches });
  };

  handleColorSchemeChange = (e) => {
    this.setState({ isDarkMode: e.matches });
  };

  handlePermissionSelect = (permission) => {
    this.setState({ 
      selectedPermission: permission,
      showCalculation: true,
      calculationStep: 0
    });
    
    // Animate through calculation steps
    const steps = 5;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      this.setState({ calculationStep: step });
      if (step >= steps) {
        clearInterval(interval);
      }
    }, 300);
  };

  calculatePermissionValue = (permission) => {
    const values = {
      'r': 4,
      'w': 2,
      'x': 1,
      '-': 0
    };
    
    // Convert numeric to symbolic for calculation
    const numericMap = {
      '777': 'rwxrwxrwx',
      '755': 'rwxr-xr-x',
      '644': 'rw-r--r--',
      '600': 'rw-------',
      '750': 'rwxr-x---',
      '700': 'rwx------',
      '444': 'r--r--r--',
      '111': '--x--x--x'
    };
    
    const symbolic = numericMap[permission];
    if (!symbolic) return null;
    
    // Calculate each triplet
    const owner = symbolic.substring(0, 3);
    const group = symbolic.substring(3, 6);
    const others = symbolic.substring(6, 9);
    
    const calculateTriplet = (triplet) => {
      return triplet.split('').reduce((sum, char) => sum + values[char], 0);
    };
    
    return {
      symbolic,
      owner: { triplet: owner, value: calculateTriplet(owner) },
      group: { triplet: group, value: calculateTriplet(group) },
      others: { triplet: others, value: calculateTriplet(others) },
      final: `${calculateTriplet(owner)}${calculateTriplet(group)}${calculateTriplet(others)}`
    };
  };

  render() {
    const { isDarkMode, isReducedMotion, selectedPermission, showCalculation, calculationStep } = this.state;
    const animationClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_forwards]';
    const delayClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_0.2s_forwards]';
    const staggeredClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_0.4s_forwards]';
    const extraStaggeredClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_0.6s_forwards]';

    const calculation = this.calculatePermissionValue(selectedPermission);

    return (
      <div className={clsx(
        "min-h-screen transition-all duration-500",
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      )}>
        <style>
          {`
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
            
            @keyframes countUp {
              from {
                opacity: 0;
                transform: scale(0.8);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }
            
            @keyframes highlightValue {
              0%, 100% {
                background-color: rgba(59, 130, 246, 0.1);
              }
              50% {
                background-color: rgba(59, 130, 246, 0.3);
              }
            }
            
            .highlight-step {
              animation: highlightValue 1s ease-in-out;
            }
            
            @keyframes pulseBit {
              0%, 100% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.1);
              }
            }
            
            .pulse-bit {
              animation: pulseBit 0.5s ease-in-out;
            }
          `}
        </style>

        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header Section */}
          <header className={`mb-12 ${animationClass} opacity-0`}>
            <h1 className="text-4xl font-bold mb-4 leading-relaxed">
              Numeric Permission System: 4-2-1 Model in Depth
            </h1>
            <p className="text-lg opacity-80">
              Topic 3: Mastering the octal permission system used by professionals
            </p>
            <div className="h-1 w-24 bg-blue-500 mt-4 rounded-full"></div>
          </header>

          {/* Main Content */}
          <div className="space-y-8">
            {/* The 4-2-1 Foundation */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-blue-500/30 hover:shadow-xl ${animationClass} opacity-0`}>
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                The 4-2-1 Binary Foundation
              </h2>
              
              <div className="mb-8">
                <div className={clsx(
                  "p-6 rounded-xl mb-6",
                  isDarkMode ? "bg-gray-800/50" : "bg-gray-100"
                )}>
                  <div className="text-center text-3xl font-bold mb-6">
                    <span className="text-blue-400">4</span> • <span className="text-green-400">2</span> • <span className="text-purple-400">1</span>
                  </div>
                  
                  {/* SVG Visualization */}
                  <div className="mb-8 p-4 rounded-xl bg-gray-800/30 border border-gray-700/50">
                    <svg 
                      width="100%" 
                      height="200" 
                      viewBox="0 0 800 200" 
                      className="overflow-visible"
                    >
                      {/* Binary Visualization */}
                      <g>
                        {/* Read - 4 */}
                        <g className={calculationStep >= 1 ? "pulse-bit" : ""}>
                          <rect x="50" y="50" width="200" height="100" rx="10" 
                                fill={isDarkMode ? "#1D4ED8" : "#3B82F6"} 
                                fillOpacity="0.3" 
                                stroke={isDarkMode ? "#60A5FA" : "#1D4ED8"} 
                                strokeWidth="2" />
                          <text x="150" y="110" textAnchor="middle" fill="white" fontSize="32" fontWeight="bold">4</text>
                          <text x="150" y="140" textAnchor="middle" fill={isDarkMode ? "#93C5FD" : "#1E40AF"} fontSize="16">Read (r)</text>
                          <text x="150" y="160" textAnchor="middle" fill={isDarkMode ? "#9CA3AF" : "#6B7280"} fontSize="12">Binary: 100</text>
                        </g>
                        
                        {/* Write - 2 */}
                        <g className={calculationStep >= 2 ? "pulse-bit" : ""}>
                          <rect x="300" y="50" width="200" height="100" rx="10" 
                                fill={isDarkMode ? "#059669" : "#10B981"} 
                                fillOpacity="0.3" 
                                stroke={isDarkMode ? "#34D399" : "#059669"} 
                                strokeWidth="2" />
                          <text x="400" y="110" textAnchor="middle" fill="white" fontSize="32" fontWeight="bold">2</text>
                          <text x="400" y="140" textAnchor="middle" fill={isDarkMode ? "#6EE7B7" : "#065F46"} fontSize="16">Write (w)</text>
                          <text x="400" y="160" textAnchor="middle" fill={isDarkMode ? "#9CA3AF" : "#6B7280"} fontSize="12">Binary: 010</text>
                        </g>
                        
                        {/* Execute - 1 */}
                        <g className={calculationStep >= 3 ? "pulse-bit" : ""}>
                          <rect x="550" y="50" width="200" height="100" rx="10" 
                                fill={isDarkMode ? "#7C3AED" : "#8B5CF6"} 
                                fillOpacity="0.3" 
                                stroke={isDarkMode ? "#A78BFA" : "#7C3AED"} 
                                strokeWidth="2" />
                          <text x="650" y="110" textAnchor="middle" fill="white" fontSize="32" fontWeight="bold">1</text>
                          <text x="650" y="140" textAnchor="middle" fill={isDarkMode ? "#C4B5FD" : "#5B21B6"} fontSize="16">Execute (x)</text>
                          <text x="650" y="160" textAnchor="middle" fill={isDarkMode ? "#9CA3AF" : "#6B7280"} fontSize="12">Binary: 001</text>
                        </g>
                        
                        {/* Binary representation */}
                        <g>
                          <text x="150" y="190" textAnchor="middle" fill={isDarkMode ? "#60A5FA" : "#1D4ED8"} fontSize="14" fontWeight="bold">2² = 4</text>
                          <text x="400" y="190" textAnchor="middle" fill={isDarkMode ? "#34D399" : "#059669"} fontSize="14" fontWeight="bold">2¹ = 2</text>
                          <text x="650" y="190" textAnchor="middle" fill={isDarkMode ? "#A78BFA" : "#7C3AED"} fontSize="14" fontWeight="bold">2⁰ = 1</text>
                        </g>
                      </g>
                    </svg>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-lg mb-4">
                      Each permission bit is a binary digit (bit) in a 3-bit number
                    </p>
                    <div className="inline-block p-4 bg-black/20 rounded-xl">
                      <code className="text-xl font-mono">rwx = 111₂ = 4 + 2 + 1 = 7₁₀</code>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className={clsx(
                    "p-4 rounded-lg transition-all duration-300 hover:translate-y-[-2px]",
                    isDarkMode ? "bg-blue-900/20 hover:bg-blue-900/30" : "bg-blue-50 hover:bg-blue-100"
                  )}>
                    <h4 className="font-bold text-blue-400 mb-3">Binary Representation</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <code className="bg-black/20 px-2 py-1 rounded mr-2">rwx</code>
                        <span>→ <code>111₂</code> → <code>7</code></span>
                      </li>
                      <li className="flex items-center">
                        <code className="bg-black/20 px-2 py-1 rounded mr-2">r-x</code>
                        <span>→ <code>101₂</code> → <code>5</code></span>
                      </li>
                      <li className="flex items-center">
                        <code className="bg-black/20 px-2 py-1 rounded mr-2">r--</code>
                        <span>→ <code>100₂</code> → <code>4</code></span>
                      </li>
                      <li className="flex items-center">
                        <code className="bg-black/20 px-2 py-1 rounded mr-2">-wx</code>
                        <span>→ <code>011₂</code> → <code>3</code></span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className={clsx(
                    "p-4 rounded-lg transition-all duration-300 hover:translate-y-[-2px]",
                    isDarkMode ? "bg-green-900/20 hover:bg-green-900/30" : "bg-green-50 hover:bg-green-100"
                  )}>
                    <h4 className="font-bold text-green-400 mb-3">Why Octal (Base 8)?</h4>
                    <div className="space-y-2 text-sm">
                      <p>Three permission bits give us 2³ = 8 possible values (0-7)</p>
                      <div className="mt-3">
                        <div className="font-semibold">Possible values:</div>
                        <code className="text-xs">0, 1, 2, 3, 4, 5, 6, 7</code>
                      </div>
                      <p className="mt-2">Perfect for representing one permission triplet</p>
                    </div>
                  </div>
                  
                  <div className={clsx(
                    "p-4 rounded-lg transition-all duration-300 hover:translate-y-[-2px]",
                    isDarkMode ? "bg-purple-900/20 hover:bg-purple-900/30" : "bg-purple-50 hover:bg-purple-100"
                  )}>
                    <h4 className="font-bold text-purple-400 mb-3">Memory Technique</h4>
                    <div className="space-y-3 text-sm">
                      <div className="p-2 bg-black/20 rounded">
                        <div className="font-mono">r = 4, w = 2, x = 1</div>
                      </div>
                      <p>
                        Think: "Read is most important (4), Write is medium (2), Execute is least (1)"
                      </p>
                      <p className="text-xs opacity-80">
                        This matches Unix philosophy: Reading is fundamental
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Interactive Calculator */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-yellow-500/30 hover:shadow-xl ${delayClass} opacity-0`}>
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-3"></span>
                Interactive Permission Calculator
              </h2>
              
              <div className="mb-8">
                {/* Permission Selector */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                  {['777', '755', '644', '600', '750', '700', '444', '111'].map((perm) => (
                    <button
                      key={perm}
                      onClick={() => this.handlePermissionSelect(perm)}
                      className={clsx(
                        "p-4 rounded-lg transition-all duration-300 transform hover:scale-105",
                        selectedPermission === perm
                          ? isDarkMode 
                            ? "bg-yellow-600 text-white shadow-lg" 
                            : "bg-yellow-500 text-white shadow-lg"
                          : isDarkMode
                            ? "bg-gray-800 hover:bg-gray-700"
                            : "bg-gray-200 hover:bg-gray-300"
                      )}
                    >
                      <div className="font-mono text-lg font-bold">{perm}</div>
                      <div className="text-xs mt-1">Click to calculate</div>
                    </button>
                  ))}
                </div>
                
                {/* Calculation Display */}
                {showCalculation && calculation && (
                  <div className={clsx(
                    "p-6 rounded-xl mb-6 transition-all duration-500",
                    isDarkMode ? "bg-gray-800/50" : "bg-gray-100",
                    calculationStep >= 1 ? "opacity-100" : "opacity-0"
                  )}>
                    <h3 className="text-xl font-bold mb-6 text-center">
                      Calculation: <span className="font-mono text-yellow-400">{selectedPermission}</span>
                    </h3>
                    
                    <div className="space-y-6">
                      {/* Symbolic Representation */}
                      <div className={clsx(
                        "p-4 rounded-lg transition-all duration-300",
                        isDarkMode ? "bg-gray-700/30" : "bg-white",
                        calculationStep >= 2 ? "highlight-step" : ""
                      )}>
                        <h4 className="font-semibold mb-3 text-blue-400">Symbolic Representation</h4>
                        <div className="text-center text-2xl font-mono tracking-wider">
                          {calculation.symbolic}
                        </div>
                        <div className="text-center text-sm opacity-80 mt-2">
                          Broken into triplets: {calculation.owner.triplet} • {calculation.group.triplet} • {calculation.others.triplet}
                        </div>
                      </div>
                      
                      {/* Calculation Steps */}
                      <div className={clsx(
                        "p-4 rounded-lg",
                        isDarkMode ? "bg-gray-700/30" : "bg-white",
                        calculationStep >= 3 ? "highlight-step" : ""
                      )}>
                        <h4 className="font-semibold mb-4 text-green-400">Step-by-Step Calculation</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Owner Calculation */}
                          <div className={clsx(
                            "p-3 rounded transition-all duration-300",
                            isDarkMode ? "bg-blue-900/20" : "bg-blue-50"
                          )}>
                            <div className="font-semibold text-blue-400 mb-2">Owner ({calculation.owner.triplet})</div>
                            <div className="font-mono text-sm">
                              {calculation.owner.triplet.split('').map((char, i) => (
                                <div key={i} className="flex items-center mb-1">
                                  <span className="w-6">{char}</span>
                                  <span className="mx-2">=</span>
                                  <span>{char === 'r' ? '4' : char === 'w' ? '2' : char === 'x' ? '1' : '0'}</span>
                                </div>
                              ))}
                              <div className="border-t border-gray-700 mt-2 pt-2">
                                <span className="font-bold">Sum: {calculation.owner.value}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Group Calculation */}
                          <div className={clsx(
                            "p-3 rounded transition-all duration-300",
                            isDarkMode ? "bg-green-900/20" : "bg-green-50"
                          )}>
                            <div className="font-semibold text-green-400 mb-2">Group ({calculation.group.triplet})</div>
                            <div className="font-mono text-sm">
                              {calculation.group.triplet.split('').map((char, i) => (
                                <div key={i} className="flex items-center mb-1">
                                  <span className="w-6">{char}</span>
                                  <span className="mx-2">=</span>
                                  <span>{char === 'r' ? '4' : char === 'w' ? '2' : char === 'x' ? '1' : '0'}</span>
                                </div>
                              ))}
                              <div className="border-t border-gray-700 mt-2 pt-2">
                                <span className="font-bold">Sum: {calculation.group.value}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Others Calculation */}
                          <div className={clsx(
                            "p-3 rounded transition-all duration-300",
                            isDarkMode ? "bg-red-900/20" : "bg-red-50"
                          )}>
                            <div className="font-semibold text-red-400 mb-2">Others ({calculation.others.triplet})</div>
                            <div className="font-mono text-sm">
                              {calculation.others.triplet.split('').map((char, i) => (
                                <div key={i} className="flex items-center mb-1">
                                  <span className="w-6">{char}</span>
                                  <span className="mx-2">=</span>
                                  <span>{char === 'r' ? '4' : char === 'w' ? '2' : char === 'x' ? '1' : '0'}</span>
                                </div>
                              ))}
                              <div className="border-t border-gray-700 mt-2 pt-2">
                                <span className="font-bold">Sum: {calculation.others.value}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Final Result */}
                        <div className={clsx(
                          "mt-6 p-4 rounded-lg text-center transition-all duration-500",
                          isDarkMode ? "bg-yellow-900/20" : "bg-yellow-50",
                          calculationStep >= 4 ? "animate-[countUp_0.5s_ease-out]" : "opacity-0"
                        )}>
                          <div className="text-xl font-bold">
                            <span className="text-blue-400">{calculation.owner.value}</span>
                            <span className="text-green-400">{calculation.group.value}</span>
                            <span className="text-red-400">{calculation.others.value}</span>
                            <span className="mx-4">=</span>
                            <span className="text-2xl text-yellow-400 font-mono">{calculation.final}</span>
                          </div>
                          <div className="text-sm opacity-80 mt-2">
                            Owner • Group • Others
                          </div>
                        </div>
                      </div>
                      
                      {/* Real-World Example */}
                      <div className={clsx(
                        "p-4 rounded-lg transition-all duration-500",
                        isDarkMode ? "bg-gray-700/30" : "bg-white",
                        calculationStep >= 5 ? "animate-[fadeInUp_0.5s_ease-out]" : "opacity-0"
                      )}>
                        <h4 className="font-semibold mb-3 text-purple-400">Real-World Application</h4>
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <div className={clsx(
                              "w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0",
                              isDarkMode ? "bg-blue-600" : "bg-blue-500"
                            )}>
                              <span className="text-white text-sm">S</span>
                            </div>
                            <div>
                              <span className="font-semibold">Swadeep at Barrackpore College:</span> Uses <code>chmod {selectedPermission} script.py</code>
                            </div>
                          </div>
                          <div className="ml-11">
                            <div className="font-mono text-sm bg-black/20 p-2 rounded">
                              $ chmod {selectedPermission} project.py
                            </div>
                            <div className="text-xs opacity-80 mt-1">
                              This sets permissions to: {calculation.symbolic}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Common Patterns & Examples */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-green-500/30 hover:shadow-xl ${staggeredClass} opacity-0`}>
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                Common Numeric Patterns & Their Uses
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className={clsx(
                      "border-b",
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    )}>
                      <th className="text-left py-3 px-4">Octal</th>
                      <th className="text-left py-3 px-4">Symbolic</th>
                      <th className="text-left py-3 px-4">Calculation</th>
                      <th className="text-left py-3 px-4">Common Use</th>
                      <th className="text-left py-3 px-4">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        octal: '777',
                        symbolic: 'rwxrwxrwx',
                        calc: '4+2+1 | 4+2+1 | 4+2+1',
                        use: 'World-writable (dangerous!)',
                        example: '/tmp/test (temporary)'
                      },
                      {
                        octal: '755',
                        symbolic: 'rwxr-xr-x',
                        calc: '4+2+1 | 4+0+1 | 4+0+1',
                        use: 'Executables, web directories',
                        example: '/usr/bin/ls, /var/www'
                      },
                      {
                        octal: '644',
                        symbolic: 'rw-r--r--',
                        calc: '4+2+0 | 4+0+0 | 4+0+0',
                        use: 'Config files, documents',
                        example: '/etc/hosts, ~/.bashrc'
                      },
                      {
                        octal: '600',
                        symbolic: 'rw-------',
                        calc: '4+2+0 | 0+0+0 | 0+0+0',
                        use: 'Private files, SSH keys',
                        example: '~/.ssh/id_rsa'
                      },
                      {
                        octal: '750',
                        symbolic: 'rwxr-x---',
                        calc: '4+2+1 | 4+0+1 | 0+0+0',
                        use: 'Group executables',
                        example: 'Team scripts at Ichapur'
                      },
                      {
                        octal: '700',
                        symbolic: 'rwx------',
                        calc: '4+2+1 | 0+0+0 | 0+0+0',
                        use: 'Private scripts',
                        example: '~/bin/myscript'
                      },
                      {
                        octal: '444',
                        symbolic: 'r--r--r--',
                        calc: '4+0+0 | 4+0+0 | 4+0+0',
                        use: 'Read-only files',
                        example: 'Shared documents'
                      },
                      {
                        octal: '111',
                        symbolic: '--x--x--x',
                        calc: '0+0+1 | 0+0+1 | 0+0+1',
                        use: 'Execute-only (rare)',
                        example: 'Proprietary binaries'
                      }
                    ].map((row, index) => (
                      <tr 
                        key={index} 
                        className={clsx(
                          "border-b transition-all duration-200 hover:bg-white/5",
                          isDarkMode ? "border-gray-800" : "border-gray-200"
                        )}
                        onClick={() => this.handlePermissionSelect(row.octal)}
                      >
                        <td className="py-3 px-4">
                          <button className={clsx(
                            "font-mono font-bold px-3 py-1 rounded transition-all duration-200 hover:scale-105",
                            isDarkMode 
                              ? "bg-blue-900/30 hover:bg-blue-800/40" 
                              : "bg-blue-100 hover:bg-blue-200"
                          )}>
                            {row.octal}
                          </button>
                        </td>
                        <td className="py-3 px-4 font-mono">{row.symbolic}</td>
                        <td className="py-3 px-4 text-sm opacity-80">{row.calc}</td>
                        <td className="py-3 px-4">{row.use}</td>
                        <td className="py-3 px-4 text-sm opacity-80">{row.example}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={clsx(
                  "p-4 rounded-lg",
                  isDarkMode ? "bg-yellow-900/10 border border-yellow-700/30" : "bg-yellow-50 border border-yellow-200"
                )}>
                  <h4 className="font-bold text-yellow-400 mb-2">⚠️ Security Warning: 777</h4>
                  <p className="text-sm">
                    Never use <code>777</code> on production systems. It allows anyone to modify or delete files.
                    At Shyamnagar lab, a student accidentally set <code>chmod -R 777 ~/</code> and had to reinstall!
                  </p>
                </div>
                
                <div className={clsx(
                  "p-4 rounded-lg",
                  isDarkMode ? "bg-green-900/10 border border-green-700/30" : "bg-green-50 border border-green-200"
                )}>
                  <h4 className="font-bold text-green-400 mb-2">✅ Best Practice: 755 for Scripts</h4>
                  <p className="text-sm">
                    Use <code>755</code> for scripts you want others to run but not modify. This is the standard
                    for system binaries and web CGI scripts.
                  </p>
                </div>
              </div>
            </section>

            {/* Professional Tips & Tricks */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-purple-500/30 hover:shadow-xl ${extraStaggeredClass} opacity-0`}>
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="inline-block w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                Professional Tips & Mental Calculation Tricks
              </h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={clsx(
                    "p-4 rounded-lg transition-all duration-300 hover:translate-y-[-2px]",
                    isDarkMode ? "bg-blue-900/20 hover:bg-blue-900/30" : "bg-blue-50 hover:bg-blue-100"
                  )}>
                    <h4 className="font-bold text-blue-400 mb-3">Mental Math Trick #1</h4>
                    <div className="space-y-3">
                      <p className="text-sm">
                        Instead of adding 4+2+1, memorize these common sums:
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mr-2 text-white text-xs">7</div>
                          <span><code>rwx</code> → Full access</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-2 text-white text-xs">6</div>
                          <span><code>rw-</code> → Read + Write</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center mr-2 text-white text-xs">5</div>
                          <span><code>r-x</code> → Read + Execute</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mr-2 text-white text-xs">4</div>
                          <span><code>r--</code> → Read only</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className={clsx(
                    "p-4 rounded-lg transition-all duration-300 hover:translate-y-[-2px]",
                    isDarkMode ? "bg-green-900/20 hover:bg-green-900/30" : "bg-green-50 hover:bg-green-100"
                  )}>
                    <h4 className="font-bold text-green-400 mb-3">Mental Math Trick #2</h4>
                    <div className="space-y-3">
                      <p className="text-sm">
                        Use subtraction for missing permissions:
                      </p>
                      <div className="p-3 bg-black/20 rounded">
                        <div className="font-mono text-sm">
                          <div><code>rw-</code> = 7 - 1 = 6</div>
                          <div><code>r-x</code> = 7 - 2 = 5</div>
                          <div><code>-wx</code> = 7 - 4 = 3</div>
                        </div>
                      </div>
                      <p className="text-xs opacity-80">
                        Since full access is 7, subtract the missing permission's value
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className={clsx(
                  "p-4 rounded-lg",
                  isDarkMode ? "bg-yellow-900/10 border border-yellow-700/30" : "bg-yellow-50 border border-yellow-200"
                )}>
                  <h4 className="font-bold text-yellow-400 mb-3">Real-World Scenario: Tuhina's Project</h4>
                  <div className="space-y-3">
                    <p className="text-sm">
                      <span className="font-semibold">Tuhina</span> at Naihati Institute needs to set permissions for her team:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-3 bg-black/20 rounded">
                        <div className="font-semibold text-sm">Scripts:</div>
                        <div className="font-mono">rwxr-x---</div>
                        <div className="text-xs opacity-80">Owner full, group run, others nothing</div>
                        <div className="text-sm font-bold mt-1">→ 750</div>
                      </div>
                      <div className="p-3 bg-black/20 rounded">
                        <div className="font-semibold text-sm">Data files:</div>
                        <div className="font-mono">rw-rw----</div>
                        <div className="text-xs opacity-80">Owner & group read/write</div>
                        <div className="text-sm font-bold mt-1">→ 660</div>
                      </div>
                      <div className="p-3 bg-black/20 rounded">
                        <div className="font-semibold text-sm">Reports:</div>
                        <div className="font-mono">rw-r--r--</div>
                        <div className="text-xs opacity-80">Owner edit, everyone read</div>
                        <div className="text-sm font-bold mt-1">→ 644</div>
                      </div>
                    </div>
                    <div className="text-sm opacity-80">
                      She uses: <code>chmod -R 750 scripts/</code> to apply recursively
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Common Mistakes Section */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-red-500/30 hover:shadow-xl ${extraStaggeredClass} opacity-0`}>
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-3"></span>
                Common Mistakes & Misconceptions
              </h2>
              
              <div className="space-y-4">
                <div className={clsx(
                  "p-4 rounded-lg border-l-4 transition-all duration-300 hover:translate-x-2",
                  isDarkMode ? "border-red-500/50 bg-red-900/10" : "border-red-400 bg-red-50"
                )}>
                  <h4 className="font-bold text-red-400 mb-2">Mistake 1: Leading Zero Confusion</h4>
                  <div className="space-y-2">
                    <p className="text-sm">
                      Beginners think <code>644</code> and <code>0644</code> are different. They're the same!
                      The leading zero is for special permissions (setuid, setgid, sticky).
                    </p>
                    <div className="flex gap-4">
                      <div className="font-mono text-sm">chmod 644 file</div>
                      <div className="font-mono text-sm">chmod 0644 file</div>
                    </div>
                    <div className="text-xs opacity-80">
                      Both set regular permissions to rw-r--r--
                    </div>
                  </div>
                </div>
                
                <div className={clsx(
                  "p-4 rounded-lg border-l-4 transition-all duration-300 hover:translate-x-2",
                  isDarkMode ? "border-yellow-500/50 bg-yellow-900/10" : "border-yellow-400 bg-yellow-50"
                )}>
                  <h4 className="font-bold text-yellow-400 mb-2">Mistake 2: Wrong Order in Mind</h4>
                  <div className="space-y-2">
                    <p className="text-sm">
                      Remember: Owner → Group → Others (left to right)
                    </p>
                    <div className="p-3 bg-black/20 rounded">
                      <div className="font-mono">7 5 5</div>
                      <div className="text-sm">
                        <span className="text-blue-400">Owner: 7</span> • 
                        <span className="text-green-400"> Group: 5</span> • 
                        <span className="text-red-400"> Others: 5</span>
                      </div>
                    </div>
                    <div className="text-xs opacity-80">
                      Not Others → Group → Owner! Debangshu at Barrackpore made this mistake.
                    </div>
                  </div>
                </div>
                
                <div className={clsx(
                  "p-4 rounded-lg border-l-4 transition-all duration-300 hover:translate-x-2",
                  isDarkMode ? "border-blue-500/50 bg-blue-900/10" : "border-blue-400 bg-blue-50"
                )}>
                  <h4 className="font-bold text-blue-400 mb-2">Mistake 3: Forgetting Directory vs File</h4>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <code>755</code> on a directory means everyone can list and enter.
                      <code>755</code> on a file means everyone can read and execute.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-2 bg-black/20 rounded">
                        <div className="font-mono text-sm">drwxr-xr-x</div>
                        <div className="text-xs">Directory: Can cd and ls</div>
                      </div>
                      <div className="p-2 bg-black/20 rounded">
                        <div className="font-mono text-sm">-rwxr-xr-x</div>
                        <div className="text-xs">File: Can read and run</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Teacher's Note */}
            <section className={`bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-700/30 transition-all duration-300 hover:from-blue-900/30 hover:to-purple-900/30 hover:border-blue-500/50 hover:shadow-2xl ${extraStaggeredClass} opacity-0`}>
              <div className="flex items-start mb-4">
                <div className="relative group">
                  <div className={clsx(
                    "w-12 h-12 rounded-full flex items-center justify-center mr-4 ring-4 ring-offset-2",
                    isDarkMode 
                      ? "bg-blue-700 ring-blue-900/50 ring-offset-gray-900 group-hover:ring-blue-600" 
                      : "bg-blue-500 ring-blue-300 ring-offset-gray-50 group-hover:ring-blue-400"
                  )}>
                    <span className="text-white font-bold text-lg">SH</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center animate-pulse">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Teacher's Note
                  </h3>
                  <p className="text-sm opacity-80">Sukanta Hui • 27 years experience</p>
                </div>
              </div>
              
              <div className="space-y-4 leading-relaxed">
                <p className="italic">
                  "In my 27 years of teaching at Shyamnagar and Ichapur, I've found students grasp numeric permissions 
                  faster when they understand it's just binary math. Think of it as three light switches: 
                  Read (4), Write (2), Execute (1). Each can be ON (1) or OFF (0). The number is just the sum of 
                  which switches are ON."
                </p>
                
                <div className={clsx(
                  "p-4 rounded-lg mt-4",
                  isDarkMode ? "bg-black/30" : "bg-white/20"
                )}>
                  <h4 className="font-bold text-yellow-300 mb-2">Pro Tip: The 15-Minute Drill</h4>
                  <p className="text-sm">
                    Practice this daily: Take any 3-digit number (like 357, 246, etc.) and convert it to symbolic 
                    permissions mentally. Then check with <code>ls -l</code>. After a week, you'll convert instantly. 
                    Remember Abhronila from last batch? She practiced this and now works as a Linux admin!
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-blue-700/30">
                  <div className="text-sm opacity-70">
                    Contact: sukantahui@codernaccotax.co.in • 7003756860
                  </div>
                  <div className="text-xs opacity-60">
                    Skills: OS, RDBMS, Web Dev, Programming
                  </div>
                </div>
              </div>
            </section>

            {/* Hint Section */}
            <section className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:bg-white/10 hover:border-green-500/30 hover:shadow-xl ${extraStaggeredClass} opacity-0`}>
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <span className="inline-block w-3 h-3 bg-green-400 rounded-full mr-3"></span>
                Think About This...
              </h2>
              
              <div className={clsx(
                "p-4 rounded-lg border-l-4",
                isDarkMode ? "border-green-500/50 bg-green-900/10" : "border-green-400 bg-green-50/50"
              )}>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <div>
                    <p className="leading-relaxed">
                      Why can't we have permission 8 or 9 in a single digit? What mathematical property of the 
                      4-2-1 system prevents this?
                      <span className="block mt-2 text-sm opacity-80">
                        Think about binary representation and how three bits can only represent numbers 0-7...
                      </span>
                    </p>
                    <div className="mt-4 p-3 bg-black/20 rounded">
                      <div className="font-mono text-sm">
                        <div>3 bits maximum: 111₂ = 7₁₀</div>
                        <div>8 would need: 1000₂ (4 bits)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-700/30 text-center opacity-70 text-sm">
            <p>Topic 3: Numeric Permission System • Next: chmod Symbolic Mode</p>
            <p className="mt-2">Practice: Convert these to numeric: rw-r-----, r-xr-xr-x, --x-w-r--</p>
          </footer>
        </div>
      </div>
    );
  }
}

export default Topic2;