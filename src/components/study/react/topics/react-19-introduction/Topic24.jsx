import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

const Topic24 = () => {
  // State for dark mode (default to true as specified)
  const [isDark, setIsDark] = useState(true);
  
  // Animation state for staggered reveal
  const [isVisible, setIsVisible] = useState(false);
  
  // Demo state for React DevTools inspection
  const [counter, setCounter] = useState(0);
  const [activeTab, setActiveTab] = useState('components');
  const [students, setStudents] = useState([
    { id: 1, name: 'Swadeep', location: 'Shyamnagar', present: true },
    { id: 2, name: 'Tuhina', location: 'Barrackpore', present: true },
    { id: 3, name: 'Abhronila', location: 'Ichapur', present: false },
    { id: 4, name: 'Debangshu', location: 'Naihati', present: true }
  ]);
  
  useEffect(() => {
    // Trigger animations after mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Toggle student attendance
  const toggleAttendance = (id) => {
    setStudents(prev => prev.map(student => 
      student.id === id ? { ...student, present: !student.present } : student
    ));
  };

  // Add new student
  const addStudent = () => {
    const newId = students.length + 1;
    const locations = ['Shyamnagar', 'Barrackpore', 'Ichapur', 'Naihati'];
    const names = ['Aniket', 'Sourav', 'Priya', 'Rohan'];
    const newStudent = {
      id: newId,
      name: names[newId % 4],
      location: locations[newId % 4],
      present: Math.random() > 0.5
    };
    setStudents(prev => [...prev, newStudent]);
  };

  return (
    <div className={clsx(
      "min-h-screen transition-all duration-500",
      isDark 
        ? "bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100" 
        : "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900"
    )}>
      {/* Header Section */}
      <header className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-8">
          <div className={clsx(
            "max-w-6xl mx-auto",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            "transition-all duration-700 motion-safe:animate-[fadeIn_0.8s_ease-out]"
          )}>
            {/* Theme Toggle */}
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setIsDark(!isDark)}
                className={clsx(
                  "px-4 py-2 rounded-lg transition-all duration-300",
                  "hover:scale-105 hover:shadow-lg",
                  isDark 
                    ? "bg-gray-800 hover:bg-gray-700 border border-gray-700" 
                    : "bg-white hover:bg-gray-50 border border-gray-200 shadow"
                )}
              >
                <span className="flex items-center gap-2">
                  {isDark ? (
                    <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                      </svg>
                      Switch to Light Mode
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </svg>
                      Switch to Dark Mode
                    </>
                  )}
                </span>
              </button>
            </div>

            <h1 className={clsx(
              "text-4xl md:text-5xl font-bold mb-6",
              isDark ? "text-white" : "text-gray-900",
              "motion-safe:animate-[slideUp_0.8s_ease-out]"
            )}>
              Topic 25: React Developer Tools
            </h1>
            
            <p className={clsx(
              "text-xl mb-8",
              isDark ? "text-gray-300" : "text-gray-700",
              "motion-safe:animate-[slideUp_0.8s_ease-out_0.1s] motion-safe:animation-fill-forwards opacity-0"
            )}>
              Installation and Basic Usage - Your React Debugging Superpower
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-16">
        {/* Introduction Card */}
        <section className={clsx(
          "max-w-6xl mx-auto mb-12",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          "transition-all duration-700 delay-150"
        )}>
          <div className={clsx(
            "rounded-2xl p-8 transition-all duration-300",
            "hover:scale-[1.02] hover:shadow-2xl",
            isDark 
              ? "bg-gray-800/50 hover:bg-gray-800/70 backdrop-blur-sm border border-gray-700" 
              : "bg-white/80 hover:bg-white backdrop-blur-sm border border-gray-200 shadow-lg"
          )}>
            <h2 className={clsx(
              "text-3xl font-bold mb-6 pb-4 border-b",
              isDark ? "text-white border-gray-700" : "text-gray-900 border-gray-300"
            )}>
              🔧 What are React Developer Tools?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className={clsx(
                    "text-xl font-semibold mb-3 flex items-center gap-2",
                    isDark ? "text-blue-300" : "text-blue-600"
                  )}>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Your React X-Ray Vision
                  </h3>
                  <p className={clsx(
                    "leading-relaxed",
                    isDark ? "text-gray-300" : "text-gray-700"
                  )}>
                    React Developer Tools is a browser extension that lets you inspect the React component hierarchy, 
                    including props, state, and hooks. It's like having X-ray vision for your React applications!
                  </p>
                </div>
                
                <div className={clsx(
                  "p-6 rounded-xl",
                  isDark ? "bg-gray-900/50 border border-gray-700" : "bg-gray-50 border border-gray-200"
                )}>
                  <h4 className={clsx(
                    "font-semibold mb-3",
                    isDark ? "text-green-300" : "text-green-600"
                  )}>
                    Real-World Analogy
                  </h4>
                  <p className={clsx(
                    "italic mb-3",
                    isDark ? "text-gray-300" : "text-gray-700"
                  )}>
                    Think of React DevTools as a medical scanner for your application:
                  </p>
                  <ul className={clsx(
                    "space-y-2 pl-6",
                    isDark ? "text-gray-300" : "text-gray-700"
                  )}>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">🏥</span>
                      <span><strong>Browser DevTools:</strong> General health checkup</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">🔬</span>
                      <span><strong>React DevTools:</strong> Specialized React MRI scan</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">💊</span>
                      <span><strong>Console:</strong> Symptom reporting</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className={clsx(
                "p-6 rounded-xl",
                isDark ? "bg-blue-900/20 border border-blue-700/30" : "bg-blue-50 border border-blue-200"
              )}>
                <h3 className={clsx(
                  "text-xl font-semibold mb-4",
                  isDark ? "text-purple-300" : "text-purple-600"
                )}>
                  Why Every React Developer Needs It
                </h3>
                
                <div className="space-y-4">
                  <div className={clsx(
                    "p-4 rounded-lg transition-all duration-300 hover:scale-[1.02]",
                    isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
                  )}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={clsx(
                        "p-2 rounded-lg",
                        isDark ? "bg-blue-900" : "bg-blue-100"
                      )}>
                        <span className="text-blue-400">🚀</span>
                      </div>
                      <strong className={clsx(
                        isDark ? "text-white" : "text-gray-900"
                      )}>
                        Debugging Speed
                      </strong>
                    </div>
                    <p className={clsx(
                      "text-sm",
                      isDark ? "text-gray-400" : "text-gray-600"
                    )}>
                      Find and fix issues 10x faster than console.log
                    </p>
                  </div>
                  
                  <div className={clsx(
                    "p-4 rounded-lg transition-all duration-300 hover:scale-[1.02]",
                    isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
                  )}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={clsx(
                        "p-2 rounded-lg",
                        isDark ? "bg-green-900" : "bg-green-100"
                      )}>
                        <span className="text-green-400">👁️</span>
                      </div>
                      <strong className={clsx(
                        isDark ? "text-white" : "text-gray-900"
                      )}>
                        Visual Inspection
                      </strong>
                    </div>
                    <p className={clsx(
                      "text-sm",
                      isDark ? "text-gray-400" : "text-gray-600"
                    )}>
                      See props flow and state changes visually
                    </p>
                  </div>
                  
                  <div className={clsx(
                    "p-4 rounded-lg transition-all duration-300 hover:scale-[1.02]",
                    isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
                  )}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={clsx(
                        "p-2 rounded-lg",
                        isDark ? "bg-purple-900" : "bg-purple-100"
                      )}>
                        <span className="text-purple-400">🎯</span>
                      </div>
                      <strong className={clsx(
                        isDark ? "text-white" : "text-gray-900"
                      )}>
                        Performance Analysis
                      </strong>
                    </div>
                    <p className={clsx(
                      "text-sm",
                      isDark ? "text-gray-400" : "text-gray-600"
                    )}>
                      Identify re-renders and optimization opportunities
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Installation Guide */}
        <section className={clsx(
          "max-w-6xl mx-auto mb-12",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          "transition-all duration-700 delay-300"
        )}>
          <div className={clsx(
            "rounded-2xl p-8 transition-all duration-300",
            "hover:scale-[1.02] hover:shadow-2xl",
            isDark 
              ? "bg-gray-800/50 hover:bg-gray-800/70 backdrop-blur-sm border border-gray-700" 
              : "bg-white/80 hover:bg-white backdrop-blur-sm border border-gray-200 shadow-lg"
          )}>
            <h2 className={clsx(
              "text-2xl font-bold mb-6 flex items-center gap-3",
              isDark ? "text-white" : "text-gray-900"
            )}>
              <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Installation Guide
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Chrome Installation */}
              <div className={clsx(
                "p-6 rounded-xl transition-all duration-300 hover:scale-[1.02] group",
                isDark 
                  ? "bg-gradient-to-br from-blue-900/20 to-blue-800/10 hover:from-blue-900/30 hover:to-blue-800/20 border border-blue-700/30" 
                  : "bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border border-blue-200"
              )}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={clsx(
                    "p-3 rounded-xl group-hover:scale-110 transition-all duration-300",
                    isDark ? "bg-blue-900" : "bg-blue-100"
                  )}>
                    <svg className="w-8 h-8 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-2.29-2.333A17.9 17.9 0 0 1 8.027 13H4.062a8.008 8.008 0 0 0 5.648 6.667zM10.03 13c.151 2.439.848 4.73 1.97 6.752A15.905 15.905 0 0 0 13.97 13h-3.94zm9.908 0h-3.965a17.9 17.9 0 0 1-1.683 6.667A8.008 8.008 0 0 0 19.938 13zM4.062 11h3.965A17.9 17.9 0 0 1 9.71 4.333 8.008 8.008 0 0 0 4.062 11zm5.969 0h3.938A15.905 15.905 0 0 0 12 4.248 15.905 15.905 0 0 0 10.03 11zm4.259-6.667A17.9 17.9 0 0 1 15.973 11h3.965a8.008 8.008 0 0 0-5.648-6.667z"/>
                    </svg>
                  </div>
                  <h3 className={clsx(
                    "text-lg font-semibold",
                    isDark ? "text-white" : "text-gray-900"
                  )}>
                    Chrome
                  </h3>
                </div>
                
                <ol className={clsx(
                  "space-y-3 text-sm pl-6",
                  isDark ? "text-gray-300" : "text-gray-700"
                )}>
                  <li className="flex items-start gap-2">
                    <span className={clsx(
                      "mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs",
                      isDark ? "bg-blue-700" : "bg-blue-100 text-blue-700"
                    )}>1</span>
                    <span>Open Chrome Web Store</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={clsx(
                      "mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs",
                      isDark ? "bg-blue-700" : "bg-blue-100 text-blue-700"
                    )}>2</span>
                    <span>Search "React Developer Tools"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={clsx(
                      "mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs",
                      isDark ? "bg-blue-700" : "bg-blue-100 text-blue-700"
                    )}>3</span>
                    <span>Click "Add to Chrome"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={clsx(
                      "mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs",
                      isDark ? "bg-blue-700" : "bg-blue-100 text-blue-700"
                    )}>4</span>
                    <span>Pin the extension for quick access</span>
                  </li>
                </ol>
                
                <div className="mt-4 pt-4 border-t border-blue-700/30">
                  <a 
                    href="https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={clsx(
                      "text-sm font-medium flex items-center gap-2",
                      isDark ? "text-blue-300 hover:text-blue-200" : "text-blue-600 hover:text-blue-800"
                    )}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Direct Link to Chrome Store
                  </a>
                </div>
              </div>
              
              {/* Firefox Installation */}
              <div className={clsx(
                "p-6 rounded-xl transition-all duration-300 hover:scale-[1.02] group",
                isDark 
                  ? "bg-gradient-to-br from-orange-900/20 to-orange-800/10 hover:from-orange-900/30 hover:to-orange-800/20 border border-orange-700/30" 
                  : "bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 border border-orange-200"
              )}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={clsx(
                    "p-3 rounded-xl group-hover:scale-110 transition-all duration-300",
                    isDark ? "bg-orange-900" : "bg-orange-100"
                  )}>
                    <svg className="w-8 h-8 text-orange-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-2.29-2.333A17.9 17.9 0 0 1 8.027 13H4.062a8.008 8.008 0 0 0 5.648 6.667zM10.03 13c.151 2.439.848 4.73 1.97 6.752A15.905 15.905 0 0 0 13.97 13h-3.94zm9.908 0h-3.965a17.9 17.9 0 0 1-1.683 6.667A8.008 8.008 0 0 0 19.938 13zM4.062 11h3.965A17.9 17.9 0 0 1 9.71 4.333 8.008 8.008 0 0 0 4.062 11zm5.969 0h3.938A15.905 15.905 0 0 0 12 4.248 15.905 15.905 0 0 0 10.03 11zm4.259-6.667A17.9 17.9 0 0 1 15.973 11h3.965a8.008 8.008 0 0 0-5.648-6.667z"/>
                    </svg>
                  </div>
                  <h3 className={clsx(
                    "text-lg font-semibold",
                    isDark ? "text-white" : "text-gray-900"
                  )}>
                    Firefox
                  </h3>
                </div>
                
                <ol className={clsx(
                  "space-y-3 text-sm pl-6",
                  isDark ? "text-gray-300" : "text-gray-700"
                )}>
                  <li className="flex items-start gap-2">
                    <span className={clsx(
                      "mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs",
                      isDark ? "bg-orange-700" : "bg-orange-100 text-orange-700"
                    )}>1</span>
                    <span>Open Firefox Add-ons</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={clsx(
                      "mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs",
                      isDark ? "bg-orange-700" : "bg-orange-100 text-orange-700"
                    )}>2</span>
                    <span>Search "React Developer Tools"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={clsx(
                      "mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs",
                      isDark ? "bg-orange-700" : "bg-orange-100 text-orange-700"
                    )}>3</span>
                    <span>Click "Add to Firefox"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={clsx(
                      "mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs",
                      isDark ? "bg-orange-700" : "bg-orange-100 text-orange-700"
                    )}>4</span>
                    <span>Restart browser if required</span>
                  </li>
                </ol>
                
                <div className="mt-4 pt-4 border-t border-orange-700/30">
                  <a 
                    href="https://addons.mozilla.org/en-US/firefox/addon/react-devtools/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={clsx(
                      "text-sm font-medium flex items-center gap-2",
                      isDark ? "text-orange-300 hover:text-orange-200" : "text-orange-600 hover:text-orange-800"
                    )}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Direct Link to Firefox Add-ons
                  </a>
                </div>
              </div>
              
              {/* Edge Installation */}
              <div className={clsx(
                "p-6 rounded-xl transition-all duration-300 hover:scale-[1.02] group",
                isDark 
                  ? "bg-gradient-to-br from-purple-900/20 to-purple-800/10 hover:from-purple-900/30 hover:to-purple-800/20 border border-purple-700/30" 
                  : "bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 border border-purple-200"
              )}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={clsx(
                    "p-3 rounded-xl group-hover:scale-110 transition-all duration-300",
                    isDark ? "bg-purple-900" : "bg-purple-100"
                  )}>
                    <svg className="w-8 h-8 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-2.29-2.333A17.9 17.9 0 0 1 8.027 13H4.062a8.008 8.008 0 0 0 5.648 6.667zM10.03 13c.151 2.439.848 4.73 1.97 6.752A15.905 15.905 0 0 0 13.97 13h-3.94zm9.908 0h-3.965a17.9 17.9 0 0 1-1.683 6.667A8.008 8.008 0 0 0 19.938 13zM4.062 11h3.965A17.9 17.9 0 0 1 9.71 4.333 8.008 8.008 0 0 0 4.062 11zm5.969 0h3.938A15.905 15.905 0 0 0 12 4.248 15.905 15.905 0 0 0 10.03 11zm4.259-6.667A17.9 17.9 0 0 1 15.973 11h3.965a8.008 8.008 0 0 0-5.648-6.667z"/>
                    </svg>
                  </div>
                  <h3 className={clsx(
                    "text-lg font-semibold",
                    isDark ? "text-white" : "text-gray-900"
                  )}>
                    Edge
                  </h3>
                </div>
                
                <ol className={clsx(
                  "space-y-3 text-sm pl-6",
                  isDark ? "text-gray-300" : "text-gray-700"
                )}>
                  <li className="flex items-start gap-2">
                    <span className={clsx(
                      "mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs",
                      isDark ? "bg-purple-700" : "bg-purple-100 text-purple-700"
                    )}>1</span>
                    <span>Open Microsoft Edge Add-ons</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={clsx(
                      "mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs",
                      isDark ? "bg-purple-700" : "bg-purple-100 text-purple-700"
                    )}>2</span>
                    <span>Search "React Developer Tools"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={clsx(
                      "mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs",
                      isDark ? "bg-purple-700" : "bg-purple-100 text-purple-700"
                    )}>3</span>
                    <span>Click "Get" to install</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={clsx(
                      "mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs",
                      isDark ? "bg-purple-700" : "bg-purple-100 text-purple-700"
                    )}>4</span>
                    <span>Allow extension permissions</span>
                  </li>
                </ol>
                
                <div className="mt-4 pt-4 border-t border-purple-700/30">
                  <a 
                    href="https://microsoftedge.microsoft.com/addons/detail/react-developer-tools/gpphkfbcpidddadnkolkpfckpihlkkil"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={clsx(
                      "text-sm font-medium flex items-center gap-2",
                      isDark ? "text-purple-300 hover:text-purple-200" : "text-purple-600 hover:text-purple-800"
                    )}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Direct Link to Edge Add-ons
                  </a>
                </div>
              </div>
            </div>
            
            <div className={clsx(
              "mt-8 p-6 rounded-xl",
              isDark ? "bg-gray-900/50 border border-gray-700" : "bg-gray-50 border border-gray-200"
            )}>
              <h4 className={clsx(
                "font-semibold mb-3 flex items-center gap-2",
                isDark ? "text-yellow-300" : "text-yellow-600"
              )}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Verification Steps
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className={clsx(
                  "p-4 rounded-lg",
                  isDark ? "bg-gray-800" : "bg-white"
                )}>
                  <p className={clsx(
                    "font-medium mb-2",
                    isDark ? "text-green-300" : "text-green-600"
                  )}>
                    ✅ How to Verify Installation
                  </p>
                  <ul className={clsx(
                    "text-sm space-y-1",
                    isDark ? "text-gray-400" : "text-gray-600"
                  )}>
                    <li>1. Open DevTools (F12 or Right-click → Inspect)</li>
                    <li>2. Look for "Components" and "Profiler" tabs</li>
                    <li>3. You should see React icon (⚛️) in top bar</li>
                    <li>4. For localhost: Should automatically detect React</li>
                  </ul>
                </div>
                <div className={clsx(
                  "p-4 rounded-lg",
                  isDark ? "bg-gray-800" : "bg-white"
                )}>
                  <p className={clsx(
                    "font-medium mb-2",
                    isDark ? "text-red-300" : "text-red-600"
                  )}>
                    ❌ If Not Working
                  </p>
                  <ul className={clsx(
                    "text-sm space-y-1",
                    isDark ? "text-gray-400" : "text-gray-600"
                  )}>
                    <li>• Refresh the page (Ctrl + Shift + R)</li>
                    <li>• Ensure React is running in development mode</li>
                    <li>• Check browser extensions are enabled</li>
                    <li>• Try restarting the browser</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Application for Inspection */}
        <section className={clsx(
          "max-w-6xl mx-auto mb-12",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          "transition-all duration-700 delay-500"
        )}>
          <div className={clsx(
            "rounded-2xl p-8 transition-all duration-300",
            "hover:scale-[1.02] hover:shadow-2xl",
            isDark 
              ? "bg-gray-800/50 hover:bg-gray-800/70 backdrop-blur-sm border border-gray-700" 
              : "bg-white/80 hover:bg-white backdrop-blur-sm border border-gray-200 shadow-lg"
          )}>
            <h2 className={clsx(
              "text-2xl font-bold mb-6 flex items-center gap-3",
              isDark ? "text-white" : "text-gray-900"
            )}>
              <svg className="w-8 h-8 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              Practice Application - Barrackpore College Dashboard
            </h2>
            <p className={clsx(
              "mb-6",
              isDark ? "text-gray-300" : "text-gray-700"
            )}>
              Use this interactive demo to practice React DevTools inspection. Open DevTools and look for "Components" tab!
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Demo Controls */}
              <div className="space-y-6">
                <div className={clsx(
                  "p-6 rounded-xl",
                  isDark ? "bg-gray-900/50 border border-gray-700" : "bg-gray-50 border border-gray-200"
                )}>
                  <h3 className={clsx(
                    "text-lg font-semibold mb-4",
                    isDark ? "text-blue-300" : "text-blue-600"
                  )}>
                    Interactive Controls
                  </h3>
                  
                  <div className="space-y-4">
                    <div className={clsx(
                      "p-4 rounded-lg",
                      isDark ? "bg-gray-800" : "bg-white"
                    )}>
                      <div className="flex justify-between items-center mb-3">
                        <span className={clsx(
                          "font-medium",
                          isDark ? "text-gray-300" : "text-gray-700"
                        )}>
                          Counter: <strong>{counter}</strong>
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setCounter(c => c - 1)}
                            className={clsx(
                              "px-3 py-1 rounded-lg transition-all duration-200",
                              "hover:scale-105",
                              isDark 
                                ? "bg-red-700 hover:bg-red-600" 
                                : "bg-red-500 hover:bg-red-400 text-white"
                            )}
                          >
                            - Decrement
                          </button>
                          <button
                            onClick={() => setCounter(c => c + 1)}
                            className={clsx(
                              "px-3 py-1 rounded-lg transition-all duration-200",
                              "hover:scale-105",
                              isDark 
                                ? "bg-green-700 hover:bg-green-600" 
                                : "bg-green-500 hover:bg-green-400 text-white"
                            )}
                          >
                            + Increment
                          </button>
                        </div>
                      </div>
                      <p className={clsx(
                        "text-sm",
                        isDark ? "text-gray-400" : "text-gray-600"
                      )}>
                        Watch state changes in React DevTools
                      </p>
                    </div>
                    
                    <div className={clsx(
                      "p-4 rounded-lg",
                      isDark ? "bg-gray-800" : "bg-white"
                    )}>
                      <div className="flex justify-between items-center mb-3">
                        <span className={clsx(
                          "font-medium",
                          isDark ? "text-gray-300" : "text-gray-700"
                        )}>
                          Manage Students
                        </span>
                        <button
                          onClick={addStudent}
                          className={clsx(
                            "px-3 py-1 rounded-lg transition-all duration-200",
                            "hover:scale-105",
                            isDark 
                              ? "bg-blue-700 hover:bg-blue-600" 
                              : "bg-blue-500 hover:bg-blue-400 text-white"
                          )}
                        >
                          + Add Student
                        </button>
                      </div>
                      <p className={clsx(
                        "text-sm",
                        isDark ? "text-gray-400" : "text-gray-600"
                      )}>
                        Total Students: {students.length}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* DevTools Tabs */}
                <div className={clsx(
                  "p-6 rounded-xl",
                  isDark ? "bg-purple-900/20 border border-purple-700/30" : "bg-purple-50 border border-purple-200"
                )}>
                  <h3 className={clsx(
                    "text-lg font-semibold mb-4",
                    isDark ? "text-purple-300" : "text-purple-600"
                  )}>
                    DevTools Tabs Preview
                  </h3>
                  
                  <div className="flex border-b mb-4">
                    {['components', 'profiler', 'settings'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={clsx(
                          "px-4 py-2 font-medium transition-all duration-200",
                          "hover:scale-105",
                          activeTab === tab
                            ? isDark
                              ? "text-purple-300 border-b-2 border-purple-500"
                              : "text-purple-600 border-b-2 border-purple-500"
                            : isDark
                              ? "text-gray-400 hover:text-gray-300"
                              : "text-gray-500 hover:text-gray-700"
                        )}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>
                  
                  <div className={clsx(
                    "p-4 rounded-lg min-h-[120px]",
                    isDark ? "bg-gray-900" : "bg-white"
                  )}>
                    {activeTab === 'components' && (
                      <div>
                        <p className={clsx(
                          "text-sm mb-2",
                          isDark ? "text-gray-300" : "text-gray-700"
                        )}>
                          <strong>Components Tree:</strong>
                        </p>
                        <div className="text-xs space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-green-400">▶</span>
                            <span>Topic24</span>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <span className="text-green-400">▶</span>
                            <span>StudentList</span>
                          </div>
                          <div className="flex items-center gap-2 ml-8">
                            <span className="text-blue-400">○</span>
                            <span>StudentCard (4)</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'profiler' && (
                      <div>
                        <p className={clsx(
                          "text-sm",
                          isDark ? "text-gray-300" : "text-gray-700"
                        )}>
                          <strong>Profiler View:</strong> Track component renders and performance
                        </p>
                        <div className="mt-2">
                          <div className="h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
                          <p className="text-xs mt-2 text-gray-500">Commit timeline visualization</p>
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'settings' && (
                      <div>
                        <p className={clsx(
                          "text-sm",
                          isDark ? "text-gray-300" : "text-gray-700"
                        )}>
                          <strong>Settings:</strong> Configure DevTools preferences
                        </p>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="highlight" defaultChecked />
                            <label htmlFor="highlight" className="text-xs">Highlight updates</label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="hide" />
                            <label htmlFor="hide" className="text-xs">Hide components in production</label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Student List */}
              <div>
                <div className={clsx(
                  "p-6 rounded-xl h-full",
                  isDark ? "bg-gray-900/50 border border-gray-700" : "bg-gray-50 border border-gray-200"
                )}>
                  <h3 className={clsx(
                    "text-lg font-semibold mb-4",
                    isDark ? "text-green-300" : "text-green-600"
                  )}>
                    Barrackpore College Students
                  </h3>
                  
                  <div className="space-y-4">
                    {students.map((student) => (
                      <div 
                        key={student.id}
                        className={clsx(
                          "p-4 rounded-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer",
                          isDark 
                            ? "bg-gray-800 hover:bg-gray-700 border border-gray-700" 
                            : "bg-white hover:bg-gray-50 border border-gray-200 shadow-sm"
                        )}
                        onClick={() => toggleAttendance(student.id)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className={clsx(
                              "font-semibold",
                              isDark ? "text-white" : "text-gray-900"
                            )}>
                              {student.name}
                            </h4>
                            <p className={clsx(
                              "text-sm",
                              isDark ? "text-gray-400" : "text-gray-600"
                            )}>
                              {student.location}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <span className={clsx(
                              "px-3 py-1 rounded-full text-xs font-medium",
                              student.present
                                ? isDark 
                                  ? "bg-green-900/30 text-green-300 border border-green-700/30"
                                  : "bg-green-100 text-green-700 border border-green-200"
                                : isDark
                                  ? "bg-red-900/30 text-red-300 border border-red-700/30"
                                  : "bg-red-100 text-red-700 border border-red-200"
                            )}>
                              {student.present ? 'Present' : 'Absent'}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleAttendance(student.id);
                              }}
                              className={clsx(
                                "px-3 py-1 rounded-lg text-xs transition-all duration-200",
                                "hover:scale-105",
                                isDark 
                                  ? "bg-gray-700 hover:bg-gray-600" 
                                  : "bg-gray-200 hover:bg-gray-300"
                              )}
                            >
                              Toggle
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className={clsx(
                    "mt-6 p-4 rounded-lg",
                    isDark ? "bg-gray-800/50" : "bg-gray-100"
                  )}>
                    <p className={clsx(
                      "text-sm flex items-center gap-2",
                      isDark ? "text-gray-400" : "text-gray-600"
                    )}>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <strong>DevTools Exercise:</strong> Inspect props and state changes when toggling attendance
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Walkthrough */}
        <section className={clsx(
          "max-w-6xl mx-auto mb-12",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          "transition-all duration-700 delay-700"
        )}>
          <div className={clsx(
            "rounded-2xl p-8 transition-all duration-300",
            "hover:scale-[1.02] hover:shadow-2xl",
            isDark 
              ? "bg-gray-800/50 hover:bg-gray-800/70 backdrop-blur-sm border border-gray-700" 
              : "bg-white/80 hover:bg-white backdrop-blur-sm border border-gray-200 shadow-lg"
          )}>
            <h2 className={clsx(
              "text-2xl font-bold mb-6 flex items-center gap-3",
              isDark ? "text-white" : "text-gray-900"
            )}>
              <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Key Features & Usage
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="mb-8">
                  <h3 className={clsx(
                    "text-xl font-semibold mb-4",
                    isDark ? "text-blue-300" : "text-blue-600"
                  )}>
                    Components Tab Features
                  </h3>
                  
                  <div className="space-y-4">
                    <div className={clsx(
                      "p-4 rounded-lg transition-all duration-300 hover:scale-[1.02]",
                      isDark ? "bg-gray-900/50 hover:bg-gray-900" : "bg-gray-50 hover:bg-gray-100"
                    )}>
                      <div className="flex items-start gap-3">
                        <div className={clsx(
                          "p-2 rounded-lg",
                          isDark ? "bg-blue-900" : "bg-blue-100"
                        )}>
                          <span className="text-blue-400">🌳</span>
                        </div>
                        <div>
                          <h4 className={clsx(
                            "font-semibold mb-1",
                            isDark ? "text-white" : "text-gray-900"
                          )}>
                            Component Tree
                          </h4>
                          <p className={clsx(
                            "text-sm",
                            isDark ? "text-gray-400" : "text-gray-600"
                          )}>
                            Visual hierarchy of all components. Click any component to inspect.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className={clsx(
                      "p-4 rounded-lg transition-all duration-300 hover:scale-[1.02]",
                      isDark ? "bg-gray-900/50 hover:bg-gray-900" : "bg-gray-50 hover:bg-gray-100"
                    )}>
                      <div className="flex items-start gap-3">
                        <div className={clsx(
                          "p-2 rounded-lg",
                          isDark ? "bg-green-900" : "bg-green-100"
                        )}>
                          <span className="text-green-400">📊</span>
                        </div>
                        <div>
                          <h4 className={clsx(
                            "font-semibold mb-1",
                            isDark ? "text-white" : "text-gray-900"
                          )}>
                            Props & State Inspection
                          </h4>
                          <p className={clsx(
                            "text-sm",
                            isDark ? "text-gray-400" : "text-gray-600"
                          )}>
                            View current props and state values. Edit them in real-time!
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className={clsx(
                      "p-4 rounded-lg transition-all duration-300 hover:scale-[1.02]",
                      isDark ? "bg-gray-900/50 hover:bg-gray-900" : "bg-gray-50 hover:bg-gray-100"
                    )}>
                      <div className="flex items-start gap-3">
                        <div className={clsx(
                          "p-2 rounded-lg",
                          isDark ? "bg-purple-900" : "bg-purple-100"
                        )}>
                          <span className="text-purple-400">🔍</span>
                        </div>
                        <div>
                          <h4 className={clsx(
                            "font-semibold mb-1",
                            isDark ? "text-white" : "text-gray-900"
                          )}>
                            Element Selector
                          </h4>
                          <p className={clsx(
                            "text-sm",
                            isDark ? "text-gray-400" : "text-gray-600"
                          )}>
                            Click the inspect icon (🔍) to select components on the page.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={clsx(
                  "p-6 rounded-xl",
                  isDark ? "bg-red-900/20 border border-red-700/30" : "bg-red-50 border border-red-200"
                )}>
                  <h4 className={clsx(
                    "font-semibold mb-3 flex items-center gap-2",
                    isDark ? "text-red-300" : "text-red-600"
                  )}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Common Beginner Mistakes
                  </h4>
                  <ul className={clsx(
                    "space-y-3 text-sm",
                    isDark ? "text-gray-300" : "text-gray-700"
                  )}>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-red-400">❌</span>
                      <span>Not installing the extension (using wrong version)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-red-400">❌</span>
                      <span>Looking for it in wrong place (Elements tab vs Components tab)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 text-red-400">❌</span>
                      <div>
                        <span>Not seeing components in production builds</span>
                        <p className="text-xs mt-1 opacity-75">
                          Solution: Run React in development mode (NODE_ENV=development)
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div>
                <div className="mb-8">
                  <h3 className={clsx(
                    "text-xl font-semibold mb-4",
                    isDark ? "text-purple-300" : "text-purple-600"
                  )}>
                    Profiler Tab Features
                  </h3>
                  
                  <div className={clsx(
                    "p-6 rounded-xl",
                    isDark ? "bg-gray-900/50 border border-gray-700" : "bg-gray-50 border border-gray-200"
                  )}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={clsx(
                        "p-3 rounded-xl",
                        isDark ? "bg-purple-900" : "bg-purple-100"
                      )}>
                        <span className="text-purple-400">📈</span>
                      </div>
                      <div>
                        <h4 className={clsx(
                          "font-semibold",
                          isDark ? "text-white" : "text-gray-900"
                        )}>
                          Performance Analysis
                        </h4>
                        <p className={clsx(
                          "text-sm",
                          isDark ? "text-gray-400" : "text-gray-600"
                        )}>
                          Record and analyze component renders
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className={clsx(isDark ? "text-gray-400" : "text-gray-600")}>Record Button</span>
                          <span className="text-green-400">●</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-green-400 to-blue-400" style={{ width: '60%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className={clsx(isDark ? "text-gray-400" : "text-gray-600")}>Commit Timeline</span>
                          <span className="text-blue-400">3 commits</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-400 to-purple-400" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className={clsx(
                      "mt-4 p-3 rounded-lg",
                      isDark ? "bg-gray-800" : "bg-gray-100"
                    )}>
                      <p className={clsx(
                        "text-xs",
                        isDark ? "text-gray-400" : "text-gray-600"
                      )}>
                        <strong>Tip:</strong> Use Profiler to identify unnecessary re-renders in the Barrackpore College dashboard
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className={clsx(
                  "p-6 rounded-xl",
                  isDark ? "bg-green-900/20 border border-green-700/30" : "bg-green-50 border border-green-200"
                )}>
                  <h4 className={clsx(
                    "font-semibold mb-3 flex items-center gap-2",
                    isDark ? "text-green-300" : "text-green-600"
                  )}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Professional Tips & Tricks
                  </h4>
                  <ul className={clsx(
                    "space-y-2 text-sm",
                    isDark ? "text-gray-300" : "text-gray-600"
                  )}>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5">🎯</span>
                      <span>Use "Highlight updates when components render" to see re-renders</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5">🎯</span>
                      <span>Right-click component in tree → "Log $r" to access in console</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5">🎯</span>
                      <span>Use search (Cmd/Ctrl + F) to find specific components</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5">🎯</span>
                      <span>Edit props in DevTools to test different scenarios</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teacher's Note */}
        <section className={clsx(
          "max-w-6xl mx-auto mt-12",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          "transition-all duration-700 delay-900"
        )}>
          <div className={clsx(
            "rounded-2xl p-8 transition-all duration-300 group",
            "hover:scale-[1.02] hover:shadow-2xl",
            isDark 
              ? "bg-gradient-to-br from-blue-900/30 to-purple-900/30 hover:from-blue-900/40 hover:to-purple-900/40 backdrop-blur-sm border border-blue-700/30" 
              : "bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border border-blue-200 shadow-lg"
          )}>
            <div className="flex items-start gap-4">
              <div className={clsx(
                "p-4 rounded-2xl transition-all duration-300 group-hover:scale-110",
                isDark ? "bg-blue-900/50" : "bg-blue-100"
              )}>
                <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              
              <div className="flex-1">
                <h3 className={clsx(
                  "text-2xl font-bold mb-4",
                  isDark ? "text-white" : "text-gray-900"
                )}>
                  Teacher's Note
                </h3>
                
                <div className={clsx(
                  "mb-6 p-6 rounded-xl",
                  isDark ? "bg-gray-900/50" : "bg-white/80"
                )}>
                  <p className={clsx(
                    "text-lg leading-relaxed mb-4",
                    isDark ? "text-gray-300" : "text-gray-700"
                  )}>
                    <strong>Dear Students,</strong> React Developer Tools is not just a debugging tool - it's your React learning accelerator. 
                    When I work with students from Barrackpore, Shyamnagar, or Ichapur, I always emphasize: 
                    <strong> "You cannot master React without mastering React DevTools."</strong>
                  </p>
                  
                  <div className={clsx(
                    "p-4 rounded-lg border-l-4 mt-4",
                    isDark ? "border-yellow-500 bg-yellow-900/20" : "border-yellow-400 bg-yellow-50"
                  )}>
                    <p className={clsx(
                      "font-semibold",
                      isDark ? "text-yellow-300" : "text-yellow-700"
                    )}>
                      Key Insight: React DevTools shows you the "why" behind component behavior, not just the "what".
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className={clsx(
                    "p-6 rounded-xl",
                    isDark ? "bg-gray-900/50 border border-gray-700" : "bg-gray-50 border border-gray-200"
                  )}>
                    <h4 className={clsx(
                      "font-bold mb-3 flex items-center gap-2",
                      isDark ? "text-green-300" : "text-green-600"
                    )}>
                      Classroom-Tested Debugging Workflow
                    </h4>
                    <ol className={clsx(
                      "space-y-3 text-sm pl-6",
                      isDark ? "text-gray-300" : "text-gray-700"
                    )}>
                      <li className="flex items-start gap-2">
                        <strong className="w-6">1.</strong>
                        <span>Open Components tab and find the problematic component</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <strong className="w-6">2.</strong>
                        <span>Check props and state values - are they correct?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <strong className="w-6">3.</strong>
                        <span>Use "Highlight updates" to see re-render patterns</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <strong className="w-6">4.</strong>
                        <span>Edit props in DevTools to test fixes before coding</span>
                      </li>
                    </ol>
                  </div>
                  
                  <div className={clsx(
                    "p-6 rounded-xl",
                    isDark ? "bg-gray-900/50 border border-gray-700" : "bg-gray-50 border border-gray-200"
                  )}>
                    <h4 className={clsx(
                      "font-bold mb-3 flex items-center gap-2",
                      isDark ? "text-blue-300" : "text-blue-600"
                    )}>
                      Professional Advice
                    </h4>
                    <p className={clsx(
                      "text-sm",
                      isDark ? "text-gray-300" : "text-gray-700"
                    )}>
                      When debugging the Barrackpore College attendance system, 
                      I always start with React DevTools to understand the data flow before touching the code.
                    </p>
                    <div className={clsx(
                      "mt-4 p-3 rounded-lg text-xs",
                      isDark ? "bg-gray-800" : "bg-gray-100"
                    )}>
                      <code>"First understand with DevTools, then fix with code" - Sukanta Hui</code>
                    </div>
                  </div>
                </div>
                
                <div className={clsx(
                  "mt-6 pt-6 border-t",
                  isDark ? "border-gray-700" : "border-gray-300"
                )}>
                  <p className={clsx(
                    "text-sm flex items-center gap-2",
                    isDark ? "text-gray-400" : "text-gray-600"
                  )}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span>
                      <strong>Sukanta Hui</strong> | 27 years experience | 
                      <a href="mailto:sukantahui@codernaccotax.co.in" className="ml-2 hover:underline">
                        sukantahui@codernaccotax.co.in
                      </a>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mini Checklist */}
        <section className={clsx(
          "max-w-6xl mx-auto mt-12",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          "transition-all duration-700 delay-1000"
        )}>
          <div className={clsx(
            "rounded-2xl p-8 transition-all duration-300",
            "hover:scale-[1.02] hover:shadow-2xl",
            isDark 
              ? "bg-gray-800/50 hover:bg-gray-800/70 backdrop-blur-sm border border-gray-700" 
              : "bg-white/80 hover:bg-white backdrop-blur-sm border border-gray-200 shadow-lg"
          )}>
            <h2 className={clsx(
              "text-2xl font-bold mb-6 flex items-center gap-3",
              isDark ? "text-white" : "text-gray-900"
            )}>
              <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Mini Checklist & Practice
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className={clsx(
                  "text-lg font-semibold mb-4",
                  isDark ? "text-blue-300" : "text-blue-600"
                )}>
                  ✅ Installation & Setup Checklist:
                </h3>
                <ul className={clsx(
                  "space-y-3",
                  isDark ? "text-gray-300" : "text-gray-700"
                )}>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>Installed React DevTools extension for your browser</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>Can see "Components" and "Profiler" tabs in DevTools</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>React icon (⚛️) appears in DevTools toolbar</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>Component tree loads for React applications</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>Can inspect props and state of components</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className={clsx(
                  "text-lg font-semibold mb-4",
                  isDark ? "text-green-300" : "text-green-600"
                )}>
                  🛠 Practice Exercises:
                </h3>
                <div className={clsx(
                  "p-6 rounded-xl",
                  isDark ? "bg-gray-900/50" : "bg-gray-50"
                )}>
                  <p className={clsx(
                    "mb-4",
                    isDark ? "text-gray-300" : "text-gray-700"
                  )}>
                    Using the demo above, practice these skills:
                  </p>
                  <ol className={clsx(
                    "space-y-2 text-sm pl-6",
                    isDark ? "text-gray-300" : "text-gray-700"
                  )}>
                    <li>1. Find the Topic24 component in the component tree</li>
                    <li>2. Inspect the "counter" state value</li>
                    <li>3. Find a StudentCard component and view its props</li>
                    <li>4. Toggle attendance and watch state updates</li>
                    <li>5. Use the search function to find "StudentCard"</li>
                  </ol>
                  
                  <div className={clsx(
                    "mt-6 p-4 rounded-lg",
                    isDark ? "bg-blue-900/30" : "bg-blue-50"
                  )}>
                    <h4 className={clsx(
                      "font-medium mb-2",
                      isDark ? "text-blue-300" : "text-blue-600"
                    )}>
                      💡 Hint Section
                    </h4>
                    <p className={clsx(
                      "text-sm italic",
                      isDark ? "text-gray-400" : "text-gray-600"
                    )}>
                      <strong>Think about…</strong> How does the component tree reflect the actual JSX structure?
                    </p>
                    <p className={clsx(
                      "text-sm italic mt-2",
                      isDark ? "text-gray-400" : "text-gray-600"
                    )}>
                      <strong>Observe carefully…</strong> What happens to props when you toggle student attendance?
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={clsx(
              "mt-8 p-6 rounded-xl text-center",
              isDark ? "bg-gradient-to-r from-gray-900 to-gray-800" : "bg-gradient-to-r from-gray-50 to-gray-100"
            )}>
              <p className={clsx(
                "text-lg",
                isDark ? "text-gray-300" : "text-gray-700"
              )}>
                <strong>Pro Tip:</strong> Always keep React DevTools open while developing. It's your React development dashboard!
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Inline Styles for Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Respect reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Topic24;