import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

const Topic30 = () => {
  // State for dark mode (default to true as specified)
  const [isDark, setIsDark] = useState(true);
  
  // Animation state for staggered reveal
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger animations after mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
              Topic 25: Practice your Skill - Component Composition Exercise
            </h1>
            
            <p className={clsx(
              "text-xl mb-8",
              isDark ? "text-gray-300" : "text-gray-700",
              "motion-safe:animate-[slideUp_0.8s_ease-out_0.1s] motion-safe:animation-fill-forwards opacity-0"
            )}>
              Applying everything you've learned to build a real-world application component
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
              🎯 Exercise Overview
            </h2>
            
            <div className="space-y-4">
              <p className={clsx(
                "text-lg leading-relaxed",
                isDark ? "text-gray-300" : "text-gray-700"
              )}>
                Welcome to your first comprehensive exercise! We're going to build a <strong>Student Dashboard</strong> 
                for Barrackpore College that displays information about students from different locations like 
                Shyamnagar, Ichapur, and Naihati.
              </p>
              
              <div className={clsx(
                "p-6 rounded-xl mt-6",
                isDark ? "bg-gray-900/50 border border-gray-700" : "bg-gray-50 border border-gray-200"
              )}>
                <h3 className={clsx(
                  "text-xl font-semibold mb-4 flex items-center gap-2",
                  isDark ? "text-blue-300" : "text-blue-600"
                )}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  What You'll Practice
                </h3>
                <ul className={clsx(
                  "space-y-3 pl-6",
                  isDark ? "text-gray-300" : "text-gray-700"
                )}>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 mt-1 flex-shrink-0 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Component composition and nesting</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 mt-1 flex-shrink-0 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Props passing between multiple components</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 mt-1 flex-shrink-0 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>JSX conditional rendering and mapping</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 mt-1 flex-shrink-0 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Reusing components with different data</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Exercise Details */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Column - Requirements */}
          <section className={clsx(
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            "transition-all duration-700 delay-300"
          )}>
            <div className={clsx(
              "rounded-2xl p-8 h-full transition-all duration-300",
              "hover:scale-[1.02] hover:shadow-2xl",
              isDark 
                ? "bg-gray-800/50 hover:bg-gray-800/70 backdrop-blur-sm border border-gray-700" 
                : "bg-white/80 hover:bg-white backdrop-blur-sm border border-gray-200 shadow-lg"
            )}>
              <h2 className={clsx(
                "text-2xl font-bold mb-6 flex items-center gap-3",
                isDark ? "text-white" : "text-gray-900"
              )}>
                <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                Exercise Requirements
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className={clsx(
                    "text-lg font-semibold mb-3",
                    isDark ? "text-blue-300" : "text-blue-600"
                  )}>
                    Build these components:
                  </h3>
                  <ol className={clsx(
                    "space-y-4 pl-6",
                    isDark ? "text-gray-300" : "text-gray-700"
                  )}>
                    <li className="flex items-start gap-3">
                      <span className={clsx(
                        "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold",
                        isDark ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-700"
                      )}>1</span>
                      <div>
                        <strong>StudentCard</strong> - Displays individual student info
                        <ul className="mt-2 space-y-1 pl-4 text-sm">
                          <li>• Should show name, location, roll number</li>
                          <li>• Accept props: name, location, rollNumber</li>
                          <li>• Different style based on location</li>
                        </ul>
                      </div>
                    </li>
                    
                    <li className="flex items-start gap-3">
                      <span className={clsx(
                        "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold",
                        isDark ? "bg-green-900 text-green-300" : "bg-green-100 text-green-700"
                      )}>2</span>
                      <div>
                        <strong>LocationSection</strong> - Groups students by location
                        <ul className="mt-2 space-y-1 pl-4 text-sm">
                          <li>• Accept props: locationName, students[]</li>
                          <li>• Maps through students array</li>
                          <li>• Renders StudentCard for each student</li>
                        </ul>
                      </div>
                    </li>
                    
                    <li className="flex items-start gap-3">
                      <span className={clsx(
                        "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold",
                        isDark ? "bg-purple-900 text-purple-300" : "bg-purple-100 text-purple-700"
                      )}>3</span>
                      <div>
                        <strong>Dashboard</strong> - Main container component
                        <ul className="mt-2 space-y-1 pl-4 text-sm">
                          <li>• Contains all LocationSections</li>
                          <li>• Manages the overall layout</li>
                          <li>• Header with college name</li>
                        </ul>
                      </div>
                    </li>
                  </ol>
                </div>
                
                <div className={clsx(
                  "p-6 rounded-xl",
                  isDark ? "bg-gray-900/50 border border-gray-700" : "bg-gray-50 border border-gray-200"
                )}>
                  <h4 className={clsx(
                    "font-semibold mb-3 flex items-center gap-2",
                    isDark ? "text-yellow-300" : "text-yellow-600"
                  )}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    Sample Data
                  </h4>
                  <pre className={clsx(
                    "text-sm p-4 rounded-lg overflow-x-auto",
                    isDark 
                      ? "bg-gray-900 text-gray-300" 
                      : "bg-gray-900 text-gray-300"
                  )}>
{`const studentsData = [
  { name: "Swadeep", location: "Shyamnagar", rollNumber: "S001" },
  { name: "Tuhina", location: "Barrackpore", rollNumber: "S002" },
  { name: "Abhronila", location: "Ichapur", rollNumber: "S003" },
  { name: "Debangshu", location: "Naihati", rollNumber: "S004" },
  // Add more students...
];`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Right Column - Visual Guide */}
          <section className={clsx(
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            "transition-all duration-700 delay-500"
          )}>
            <div className={clsx(
              "rounded-2xl p-8 h-full transition-all duration-300",
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
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                Component Tree Visualization
              </h2>
              
              <div className="space-y-8">
                {/* Component Tree SVG */}
                <div className="relative">
                  <svg 
                    viewBox="0 0 400 300" 
                    className="w-full h-auto"
                    aria-label="Component hierarchy visualization"
                  >
                    {/* Dashboard Component */}
                    <rect 
                      x="50" y="20" 
                      width="300" height="60" 
                      rx="8"
                      className={isDark ? "fill-gray-700" : "fill-gray-300"}
                      stroke={isDark ? "#4B5563" : "#D1D5DB"}
                      strokeWidth="2"
                    >
                      <animate
                        attributeName="fill"
                        values={isDark ? "#374151;#4B5563;#374151" : "#D1D5DB;#E5E7EB;#D1D5DB"}
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </rect>
                    <text 
                      x="200" y="50" 
                      textAnchor="middle" 
                      className={clsx(
                        "text-lg font-bold fill-current",
                        isDark ? "text-white" : "text-gray-900"
                      )}
                      fill={isDark ? "#ffffff" : "#111827"}
                    >
                      Dashboard (Parent)
                    </text>
                    
                    {/* Arrows */}
                    <line 
                      x1="200" y1="80" 
                      x2="133" y2="120" 
                      stroke={isDark ? "#9CA3AF" : "#6B7280"} 
                      strokeWidth="2"
                      markerEnd="url(#arrowhead)"
                    />
                    <line 
                      x1="200" y1="80" 
                      x2="200" y2="120" 
                      stroke={isDark ? "#9CA3AF" : "#6B7280"} 
                      strokeWidth="2"
                      markerEnd="url(#arrowhead)"
                    />
                    <line 
                      x1="200" y1="80" 
                      x2="267" y2="120" 
                      stroke={isDark ? "#9CA3AF" : "#6B7280"} 
                      strokeWidth="2"
                      markerEnd="url(#arrowhead)"
                    />
                    
                    {/* Location Sections */}
                    <rect 
                      x="33" y="120" 
                      width="200" height="50" 
                      rx="6"
                      className={isDark ? "fill-blue-900/30" : "fill-blue-100"}
                      stroke={isDark ? "#1D4ED8" : "#93C5FD"}
                      strokeWidth="2"
                    >
                      <animate
                        attributeName="y"
                        values="120;115;120"
                        dur="2s"
                        begin="1s"
                        repeatCount="indefinite"
                      />
                    </rect>
                    <text 
                      x="133" y="150" 
                      textAnchor="middle" 
                      className="fill-current text-blue-400 font-semibold"
                      fill="#60A5FA"
                    >
                      LocationSection
                    </text>
                    
                    <rect 
                      x="167" y="190" 
                      width="200" height="50" 
                      rx="6"
                      className={isDark ? "fill-green-900/30" : "fill-green-100"}
                      stroke={isDark ? "#047857" : "#A7F3D0"}
                      strokeWidth="2"
                    >
                      <animate
                        attributeName="y"
                        values="190;185;190"
                        dur="2s"
                        begin="1.5s"
                        repeatCount="indefinite"
                      />
                    </rect>
                    <text 
                      x="267" y="220" 
                      textAnchor="middle" 
                      className="fill-current text-green-400 font-semibold"
                      fill="#34D399"
                    >
                      StudentCard × N
                    </text>
                    
                    {/* Arrow Definitions */}
                    <defs>
                      <marker 
                        id="arrowhead" 
                        markerWidth="10" 
                        markerHeight="7" 
                        refX="9" 
                        refY="3.5" 
                        orient="auto"
                      >
                        <polygon 
                          points="0 0, 10 3.5, 0 7" 
                          fill={isDark ? "#9CA3AF" : "#6B7280"}
                        />
                      </marker>
                    </defs>
                  </svg>
                  
                  <div className={clsx(
                    "mt-6 p-4 rounded-lg text-sm",
                    isDark ? "bg-gray-900/50 text-gray-300" : "bg-gray-50 text-gray-700"
                  )}>
                    <p className="flex items-center gap-2 mb-2">
                      <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                      </svg>
                      <strong>Visual Guide:</strong> Data flows top-down through props
                    </p>
                    <ul className="space-y-1 pl-6">
                      <li>• Dashboard → LocationSection (location, students)</li>
                      <li>• LocationSection → StudentCard (name, location, rollNumber)</li>
                      <li>• Each component is reusable with different data</li>
                    </ul>
                  </div>
                </div>
                
                {/* Hint Section */}
                <div className={clsx(
                  "p-6 rounded-xl border-2 border-dashed",
                  isDark 
                    ? "bg-gray-900/30 border-gray-600" 
                    : "bg-gray-50/80 border-gray-300"
                )}>
                  <h4 className={clsx(
                    "font-bold mb-3 flex items-center gap-2",
                    isDark ? "text-purple-300" : "text-purple-600"
                  )}>
                    💡 Hint Section
                  </h4>
                  <div className="space-y-3">
                    <p className={clsx(
                      "italic",
                      isDark ? "text-gray-400" : "text-gray-600"
                    )}>
                      <strong>Think about…</strong> How would you organize the data structure to make it easy to group students by location?
                    </p>
                    <p className={clsx(
                      "italic",
                      isDark ? "text-gray-400" : "text-gray-600"
                    )}>
                      <strong>Observe carefully…</strong> What props does each child component need from its parent?
                    </p>
                    <p className={clsx(
                      "italic",
                      isDark ? "text-gray-400" : "text-gray-600"
                    )}>
                      <strong>Try changing…</strong> The order of props passed and see how it affects component rendering.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Tips & Best Practices */}
        <section className={clsx(
          "max-w-6xl mx-auto mt-12",
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
              "text-2xl font-bold mb-6 pb-4 border-b",
              isDark ? "text-white border-gray-700" : "text-gray-900 border-gray-300"
            )}>
              🛠 Professional Tips & Tricks
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className={clsx(
                "p-6 rounded-xl transition-all duration-300 hover:scale-[1.02]",
                isDark ? "bg-gray-900/50 hover:bg-gray-900" : "bg-gray-50 hover:bg-gray-100"
              )}>
                <h3 className={clsx(
                  "font-bold mb-3 flex items-center gap-2",
                  isDark ? "text-green-300" : "text-green-600"
                )}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  Industry Habits
                </h3>
                <ul className={clsx(
                  "space-y-2 text-sm",
                  isDark ? "text-gray-300" : "text-gray-700"
                )}>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">✓</span>
                    <span>Start with data structure design before components</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">✓</span>
                    <span>Use descriptive prop names (studentData vs data)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">✓</span>
                    <span>Keep components small and focused (Single Responsibility)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">✓</span>
                    <span>Test composition by changing data - components should adapt</span>
                  </li>
                </ul>
              </div>
              
              <div className={clsx(
                "p-6 rounded-xl transition-all duration-300 hover:scale-[1.02]",
                isDark ? "bg-gray-900/50 hover:bg-gray-900" : "bg-gray-50 hover:bg-gray-100"
              )}>
                <h3 className={clsx(
                  "font-bold mb-3 flex items-center gap-2",
                  isDark ? "text-yellow-300" : "text-yellow-600"
                )}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Debugging Mindset
                </h3>
                <ul className={clsx(
                  "space-y-2 text-sm",
                  isDark ? "text-gray-300" : "text-gray-700"
                )}>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">🔍</span>
                    <span>Check React DevTools for props flow</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">🔍</span>
                    <span>Console.log props at each level to verify data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">🔍</span>
                    <span>Look for prop type mismatches</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">🔍</span>
                    <span>Verify component returns valid JSX (single parent element)</span>
                  </li>
                </ul>
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
                    <strong>Dear Students,</strong> Component composition is where React truly shines. Think of it like building with Lego blocks - each component is a reusable piece. When Swadeep from Shyamnagar and Tuhina from Barrackpore both need student cards, you don't build two different components; you build one <code>StudentCard</code> and pass different props.
                  </p>
                  
                  <div className={clsx(
                    "p-4 rounded-lg border-l-4 mt-4",
                    isDark ? "border-yellow-500 bg-yellow-900/20" : "border-yellow-400 bg-yellow-50"
                  )}>
                    <p className={clsx(
                      "font-semibold",
                      isDark ? "text-yellow-300" : "text-yellow-700"
                    )}>
                      Key Insight: Props are like function parameters. They make components dynamic and reusable.
                    </p>
                  </div>
                </div>
                
                <div className={clsx(
                  "p-6 rounded-xl",
                  isDark ? "bg-gray-900/50 border border-gray-700" : "bg-gray-50 border border-gray-200"
                )}>
                  <h4 className={clsx(
                    "font-bold mb-3 flex items-center gap-2",
                    isDark ? "text-green-300" : "text-green-600"
                  )}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    Points to Remember:
                  </h4>
                  <ul className={clsx(
                    "space-y-3",
                    isDark ? "text-gray-300" : "text-gray-700"
                  )}>
                    <li className="flex items-start gap-3">
                      <span className={clsx(
                        "mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs",
                        isDark ? "bg-blue-700" : "bg-blue-100 text-blue-700"
                      )}>1</span>
                      <span><strong>Props are read-only</strong> - Child components cannot modify props received from parents</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className={clsx(
                        "mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs",
                        isDark ? "bg-green-700" : "bg-green-100 text-green-700"
                      )}>2</span>
                      <span><strong>Composition over inheritance</strong> - Build complex UIs by combining simple components</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className={clsx(
                        "mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs",
                        isDark ? "bg-purple-700" : "bg-purple-100 text-purple-700"
                      )}>3</span>
                      <span><strong>Think in components</strong> - Break down UI into logical, reusable pieces</span>
                    </li>
                  </ul>
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

        {/* Checklist Section */}
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
              Mini Checklist
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className={clsx(
                  "text-lg font-semibold mb-4",
                  isDark ? "text-blue-300" : "text-blue-600"
                )}>
                  What You Should Be Able to Do:
                </h3>
                <ul className={clsx(
                  "space-y-3",
                  isDark ? "text-gray-300" : "text-gray-700"
                )}>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>Create a component that accepts and uses props</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>Nest components inside other components</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>Use array.map() to render multiple components</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>Pass different data to the same component type</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className={clsx(
                  "text-lg font-semibold mb-4",
                  isDark ? "text-green-300" : "text-green-600"
                )}>
                  Common Pitfalls to Avoid:
                </h3>
                <ul className={clsx(
                  "space-y-3",
                  isDark ? "text-red-300" : "text-red-600"
                )}>
                  <li className="flex items-start gap-3">
                    <span className="mt-1">❌</span>
                    <span>Forgetting to pass required props to child components</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1">❌</span>
                    <span>Not providing unique keys when mapping arrays</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1">❌</span>
                    <span>Trying to modify props inside child components</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1">❌</span>
                    <span>Creating components that are too large (violates SRP)</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className={clsx(
              "mt-8 p-6 rounded-xl",
              isDark ? "bg-gradient-to-r from-gray-900 to-gray-800" : "bg-gradient-to-r from-gray-50 to-gray-100"
            )}>
              <h4 className={clsx(
                "font-bold mb-4 text-center",
                isDark ? "text-white" : "text-gray-900"
              )}>
                🚀 Your Challenge
              </h4>
              <p className={clsx(
                "text-center text-lg",
                isDark ? "text-gray-300" : "text-gray-700"
              )}>
                Build the Student Dashboard with at least 6 students across 3 different locations.
                Test it by adding a new student from "Naihati" - your components should adapt automatically!
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Inline Styles for Animations */}
      <style jsx="true">{`
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

export default Topic30;