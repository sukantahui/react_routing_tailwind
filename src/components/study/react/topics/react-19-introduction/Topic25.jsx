import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

const Topic25 = () => {
  // State for dark mode (default to true as specified)
  const [isDark, setIsDark] = useState(true);
  
  // Animation state for staggered reveal
  const [isVisible, setIsVisible] = useState(false);
  
  // Demo state for component tree inspection
  const [activeView, setActiveView] = useState('tree');
  const [selectedComponent, setSelectedComponent] = useState('App');
  const [expandedComponents, setExpandedComponents] = useState(['App', 'StudentDashboard', 'AttendanceTracker']);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightUpdates, setHighlightUpdates] = useState(true);
  
  // Demo student data
  const [students, setStudents] = useState([
    { id: 1, name: 'Swadeep', location: 'Shyamnagar', present: true, grade: 'A', attendance: 95 },
    { id: 2, name: 'Tuhina', location: 'Barrackpore', present: false, grade: 'B+', attendance: 88 },
    { id: 3, name: 'Abhronila', location: 'Ichapur', present: true, grade: 'A-', attendance: 92 },
    { id: 4, name: 'Debangshu', location: 'Naihati', present: true, grade: 'B', attendance: 85 }
  ]);
  
  // Demo component hierarchy data
  const componentTree = {
    App: {
      type: 'App',
      children: ['StudentDashboard', 'Header', 'Footer'],
      props: { theme: 'dark', version: '1.0.0' },
      state: { isLoaded: true }
    },
    StudentDashboard: {
      type: 'StudentDashboard',
      children: ['AttendanceTracker', 'GradeReport', 'StudentList'],
      props: { school: 'Barrackpore College', year: 2024 },
      state: { selectedView: 'attendance' }
    },
    AttendanceTracker: {
      type: 'AttendanceTracker',
      children: ['AttendanceCard', 'AttendanceSummary'],
      props: { students: students.length, showDetails: true },
      state: { totalPresent: 3 }
    },
    GradeReport: {
      type: 'GradeReport',
      children: ['GradeCard', 'Statistics'],
      props: { showGraph: true },
      state: { averageGrade: 'B+' }
    },
    StudentList: {
      type: 'StudentList',
      children: students.map((_, i) => `StudentCard${i + 1}`),
      props: { filter: 'all', sortBy: 'name' },
      state: { filteredCount: 4 }
    },
    Header: {
      type: 'Header',
      children: ['Logo', 'NavMenu'],
      props: { title: 'Barrackpore College Portal' },
      state: { isMenuOpen: false }
    },
    Footer: {
      type: 'Footer',
      children: ['Copyright', 'Links'],
      props: { year: 2024 },
      state: {}
    }
  };
  
  useEffect(() => {
    // Trigger animations after mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Toggle component expansion
  const toggleExpand = (componentName) => {
    setExpandedComponents(prev => 
      prev.includes(componentName)
        ? prev.filter(name => name !== componentName)
        : [...prev, componentName]
    );
  };

  // Render component tree visualization
  const renderComponentTree = () => {
    const filteredComponents = Object.keys(componentTree).filter(name =>
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const renderNode = (componentName, depth = 0) => {
      const component = componentTree[componentName];
      if (!component) return null;

      const isExpanded = expandedComponents.includes(componentName);
      const isSelected = selectedComponent === componentName;
      const hasChildren = component.children && component.children.length > 0;

      return (
        <div key={componentName}>
          <div 
            className={clsx(
              "flex items-center py-2 px-3 rounded-lg cursor-pointer transition-all duration-200 mb-1",
              "hover:scale-[1.02] hover:shadow-md",
              isSelected
                ? isDark
                  ? "bg-blue-900/50 border border-blue-700"
                  : "bg-blue-100 border border-blue-300"
                : isDark
                  ? "bg-gray-800/50 hover:bg-gray-800 border border-gray-700"
                  : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
            )}
            style={{ marginLeft: `${depth * 24}px` }}
            onClick={() => setSelectedComponent(componentName)}
          >
            {/* Expand/collapse arrow */}
            {hasChildren && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand(componentName);
                }}
                className="mr-2 w-5 h-5 flex items-center justify-center"
              >
                <svg 
                  className={clsx(
                    "w-4 h-4 transition-transform duration-200",
                    isExpanded ? "rotate-90" : "",
                    isDark ? "text-gray-400" : "text-gray-500"
                  )}
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            )}
            
            {/* Component icon */}
            <div className={clsx(
              "w-8 h-8 rounded-lg flex items-center justify-center mr-3",
              isDark ? "bg-gray-700" : "bg-gray-200"
            )}>
              {component.type.includes('Card') ? (
                <span className="text-blue-400">📇</span>
              ) : component.type.includes('List') ? (
                <span className="text-green-400">📋</span>
              ) : (
                <span className="text-purple-400">⚛️</span>
              )}
            </div>
            
            {/* Component name */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className={clsx(
                  "font-medium",
                  isDark ? "text-white" : "text-gray-900"
                )}>
                  {componentName}
                </span>
                <span className={clsx(
                  "text-xs px-2 py-0.5 rounded",
                  isDark ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
                )}>
                  {component.type}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1 text-xs">
                <span className={clsx(
                  "px-2 py-0.5 rounded",
                  isDark ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-700"
                )}>
                  {component.children?.length || 0} children
                </span>
                <span className={clsx(
                  "px-2 py-0.5 rounded",
                  isDark ? "bg-green-900/30 text-green-300" : "bg-green-100 text-green-700"
                )}>
                  {Object.keys(component.props || {}).length} props
                </span>
              </div>
            </div>
            
            {/* Selection indicator */}
            {isSelected && (
              <div className={clsx(
                "w-2 h-2 rounded-full ml-2",
                isDark ? "bg-blue-400" : "bg-blue-500"
              )} />
            )}
          </div>
          
          {/* Render children if expanded */}
          {isExpanded && hasChildren && (
            <div className="ml-6 border-l-2 border-gray-700/30 pl-2">
              {component.children.map(childName => 
                renderNode(childName, depth + 1)
              )}
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="space-y-1">
        {filteredComponents.map(componentName => 
          renderNode(componentName)
        )}
      </div>
    );
  };

  // Get selected component details
  const selectedComponentDetails = selectedComponent ? componentTree[selectedComponent] : null;

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
              Topic 26: Inspecting Component Tree
            </h1>
            
            <p className={clsx(
              "text-xl mb-8",
              isDark ? "text-gray-300" : "text-gray-700",
              "motion-safe:animate-[slideUp_0.8s_ease-out_0.1s] motion-safe:animation-fill-forwards opacity-0"
            )}>
              Mastering React DevTools Component Inspection - Your Visual React Map
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
              🌳 What is the Component Tree?
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
                    Your React Application's Family Tree
                  </h3>
                  <p className={clsx(
                    "leading-relaxed",
                    isDark ? "text-gray-300" : "text-gray-700"
                  )}>
                    The component tree is a visual representation of how your React components are nested 
                    and organized. It shows parent-child relationships, just like a family tree shows 
                    ancestry relationships.
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
                    Real-World Analogy: Barrackpore College Organization
                  </h4>
                  <ul className={clsx(
                    "space-y-2 pl-6",
                    isDark ? "text-gray-300" : "text-gray-700"
                  )}>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">🏫</span>
                      <span><strong>College (App):</strong> Root component containing everything</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">📊</span>
                      <span><strong>Departments (Dashboard):</strong> Major sections of the application</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">👨‍🎓</span>
                      <span><strong>Students (Cards):</strong> Individual UI elements with data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">🔗</span>
                      <span><strong>Relationships (Props):</strong> How data flows between components</span>
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
                  Why Component Tree Inspection Matters
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
                        <span className="text-blue-400">🔍</span>
                      </div>
                      <strong className={clsx(
                        isDark ? "text-white" : "text-gray-900"
                      )}>
                        Debugging Efficiency
                      </strong>
                    </div>
                    <p className={clsx(
                      "text-sm",
                      isDark ? "text-gray-400" : "text-gray-600"
                    )}>
                      Quickly find which component is causing issues by navigating the tree
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
                        <span className="text-green-400">📈</span>
                      </div>
                      <strong className={clsx(
                        isDark ? "text-white" : "text-gray-900"
                      )}>
                        Performance Optimization
                      </strong>
                    </div>
                    <p className={clsx(
                      "text-sm",
                      isDark ? "text-gray-400" : "text-gray-600"
                    )}>
                      Identify unnecessary re-renders by seeing the render flow
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
                        <span className="text-purple-400">🧠</span>
                      </div>
                      <strong className={clsx(
                        isDark ? "text-white" : "text-gray-900"
                      )}>
                        Understanding Architecture
                      </strong>
                    </div>
                    <p className={clsx(
                      "text-sm",
                      isDark ? "text-gray-400" : "text-gray-600"
                    )}>
                      Learn how complex applications are structured by exploring the hierarchy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Component Tree Demo */}
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
              Interactive Component Tree Explorer
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Left Column - Tree Navigation */}
              <div className="md:col-span-2">
                <div className={clsx(
                  "p-6 rounded-xl h-full",
                  isDark ? "bg-gray-900/50 border border-gray-700" : "bg-gray-50 border border-gray-200"
                )}>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className={clsx(
                      "text-lg font-semibold",
                      isDark ? "text-white" : "text-gray-900"
                    )}>
                      Barrackpore College Portal - Component Tree
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search components..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className={clsx(
                            "pl-9 pr-3 py-2 rounded-lg text-sm w-48 transition-all duration-300",
                            "focus:outline-none focus:ring-2 focus:ring-blue-500",
                            isDark 
                              ? "bg-gray-800 border border-gray-700 text-white" 
                              : "bg-white border border-gray-300 text-gray-900"
                          )}
                        />
                        <svg 
                          className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <button
                        onClick={() => setHighlightUpdates(!highlightUpdates)}
                        className={clsx(
                          "px-3 py-2 rounded-lg text-sm transition-all duration-300",
                          "hover:scale-105",
                          highlightUpdates
                            ? isDark
                              ? "bg-green-700 hover:bg-green-600"
                              : "bg-green-500 hover:bg-green-400 text-white"
                            : isDark
                              ? "bg-gray-700 hover:bg-gray-600"
                              : "bg-gray-200 hover:bg-gray-300"
                        )}
                      >
                        {highlightUpdates ? '🔦 Updates On' : '🔍 Updates Off'}
                      </button>
                    </div>
                  </div>
                  
                  {/* Component Tree Visualization */}
                  <div className={clsx(
                    "p-4 rounded-lg h-[400px] overflow-y-auto",
                    isDark ? "bg-gray-800" : "bg-white"
                  )}>
                    {renderComponentTree()}
                    
                    {/* Empty state */}
                    {searchTerm && Object.keys(componentTree).filter(name => 
                      name.toLowerCase().includes(searchTerm.toLowerCase())
                    ).length === 0 && (
                      <div className="text-center py-12">
                        <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                        <p className={clsx(
                          isDark ? "text-gray-400" : "text-gray-600"
                        )}>
                          No components found matching "{searchTerm}"
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {/* Tree Statistics */}
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className={clsx(
                      "p-3 rounded-lg text-center",
                      isDark ? "bg-gray-800" : "bg-gray-100"
                    )}>
                      <div className={clsx(
                        "text-2xl font-bold",
                        isDark ? "text-white" : "text-gray-900"
                      )}>
                        {Object.keys(componentTree).length}
                      </div>
                      <div className={clsx(
                        "text-xs",
                        isDark ? "text-gray-400" : "text-gray-600"
                      )}>
                        Total Components
                      </div>
                    </div>
                    <div className={clsx(
                      "p-3 rounded-lg text-center",
                      isDark ? "bg-gray-800" : "bg-gray-100"
                    )}>
                      <div className={clsx(
                        "text-2xl font-bold",
                        isDark ? "text-white" : "text-gray-900"
                      )}>
                        {expandedComponents.length}
                      </div>
                      <div className={clsx(
                        "text-xs",
                        isDark ? "text-gray-400" : "text-gray-600"
                      )}>
                        Expanded Nodes
                      </div>
                    </div>
                    <div className={clsx(
                      "p-3 rounded-lg text-center",
                      isDark ? "bg-gray-800" : "bg-gray-100"
                    )}>
                      <div className={clsx(
                        "text-2xl font-bold",
                        isDark ? "text-white" : "text-gray-900"
                      )}>
                        {students.length}
                      </div>
                      <div className={clsx(
                        "text-xs",
                        isDark ? "text-gray-400" : "text-gray-600"
                      )}>
                        Student Cards
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Component Details */}
              <div>
                <div className={clsx(
                  "p-6 rounded-xl h-full",
                  isDark ? "bg-gray-900/50 border border-gray-700" : "bg-gray-50 border border-gray-200"
                )}>
                  <h3 className={clsx(
                    "text-lg font-semibold mb-6",
                    isDark ? "text-white" : "text-gray-900"
                  )}>
                    Component Inspector
                  </h3>
                  
                  {selectedComponentDetails ? (
                    <div className="space-y-6">
                      {/* Component Header */}
                      <div className={clsx(
                        "p-4 rounded-lg",
                        isDark ? "bg-gray-800" : "bg-white"
                      )}>
                        <div className="flex items-center gap-3 mb-3">
                          <div className={clsx(
                            "w-10 h-10 rounded-lg flex items-center justify-center",
                            isDark ? "bg-blue-900" : "bg-blue-100"
                          )}>
                            <span className="text-xl">
                              {selectedComponent.includes('Card') ? '📇' : 
                               selectedComponent.includes('List') ? '📋' : '⚛️'}
                            </span>
                          </div>
                          <div>
                            <h4 className={clsx(
                              "font-bold text-lg",
                              isDark ? "text-white" : "text-gray-900"
                            )}>
                              {selectedComponent}
                            </h4>
                            <p className={clsx(
                              "text-sm",
                              isDark ? "text-gray-400" : "text-gray-600"
                            )}>
                              Type: {selectedComponentDetails.type}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <button
                            onClick={() => toggleExpand(selectedComponent)}
                            className={clsx(
                              "px-3 py-1 rounded-lg text-sm transition-all duration-300",
                              "hover:scale-105",
                              expandedComponents.includes(selectedComponent)
                                ? isDark
                                  ? "bg-blue-700 hover:bg-blue-600"
                                  : "bg-blue-500 hover:bg-blue-400 text-white"
                                : isDark
                                  ? "bg-gray-700 hover:bg-gray-600"
                                  : "bg-gray-200 hover:bg-gray-300"
                            )}
                          >
                            {expandedComponents.includes(selectedComponent) ? 'Collapse' : 'Expand'}
                          </button>
                          <span className={clsx(
                            "text-xs px-2 py-1 rounded",
                            isDark ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
                          )}>
                            {selectedComponentDetails.children?.length || 0} children
                          </span>
                        </div>
                      </div>
                      
                      {/* Props Section */}
                      <div>
                        <h4 className={clsx(
                          "font-semibold mb-3 flex items-center gap-2",
                          isDark ? "text-blue-300" : "text-blue-600"
                        )}>
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z" clipRule="evenodd" />
                          </svg>
                          Props
                        </h4>
                        <div className={clsx(
                          "p-4 rounded-lg space-y-2",
                          isDark ? "bg-gray-800" : "bg-white"
                        )}>
                          {Object.entries(selectedComponentDetails.props || {}).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center">
                              <code className={clsx(
                                "text-sm",
                                isDark ? "text-blue-300" : "text-blue-600"
                              )}>
                                {key}
                              </code>
                              <span className={clsx(
                                "text-sm px-2 py-1 rounded",
                                isDark ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
                              )}>
                                {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                              </span>
                            </div>
                          ))}
                          {Object.keys(selectedComponentDetails.props || {}).length === 0 && (
                            <p className={clsx(
                              "text-sm text-center py-2",
                              isDark ? "text-gray-500" : "text-gray-600"
                            )}>
                              No props
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {/* State Section */}
                      <div>
                        <h4 className={clsx(
                          "font-semibold mb-3 flex items-center gap-2",
                          isDark ? "text-green-300" : "text-green-600"
                        )}>
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                          </svg>
                          State
                        </h4>
                        <div className={clsx(
                          "p-4 rounded-lg space-y-2",
                          isDark ? "bg-gray-800" : "bg-white"
                        )}>
                          {Object.entries(selectedComponentDetails.state || {}).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center">
                              <code className={clsx(
                                "text-sm",
                                isDark ? "text-green-300" : "text-green-600"
                              )}>
                                {key}
                              </code>
                              <span className={clsx(
                                "text-sm px-2 py-1 rounded",
                                isDark ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
                              )}>
                                {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                              </span>
                            </div>
                          ))}
                          {Object.keys(selectedComponentDetails.state || {}).length === 0 && (
                            <p className={clsx(
                              "text-sm text-center py-2",
                              isDark ? "text-gray-500" : "text-gray-600"
                            )}>
                              No state
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd" />
                      </svg>
                      <p className={clsx(
                        isDark ? "text-gray-400" : "text-gray-600"
                      )}>
                        Select a component from the tree to inspect its details
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation & Interaction Guide */}
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
              Navigation & Interaction Guide
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Keyboard Shortcuts */}
              <div className={clsx(
                "p-6 rounded-xl",
                isDark ? "bg-gray-900/50 border border-gray-700" : "bg-gray-50 border border-gray-200"
              )}>
                <h3 className={clsx(
                  "text-lg font-semibold mb-4 flex items-center gap-2",
                  isDark ? "text-blue-300" : "text-blue-600"
                )}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                  Keyboard Navigation
                </h3>
                <div className="space-y-3">
                  {[
                    { key: 'Arrow Up/Down', action: 'Navigate between components' },
                    { key: 'Arrow Left/Right', action: 'Expand/collapse nodes' },
                    { key: 'Enter', action: 'Select component' },
                    { key: 'Cmd/Ctrl + F', action: 'Search components' },
                    { key: 'Esc', action: 'Clear selection' }
                  ].map((shortcut, index) => (
                    <div 
                      key={index}
                      className={clsx(
                        "p-3 rounded-lg transition-all duration-300 hover:scale-[1.02]",
                        isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
                      )}
                    >
                      <div className="flex justify-between items-center">
                        <kbd className={clsx(
                          "px-2 py-1 rounded text-xs font-mono",
                          isDark ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
                        )}>
                          {shortcut.key}
                        </kbd>
                        <span className={clsx(
                          "text-sm",
                          isDark ? "text-gray-300" : "text-gray-700"
                        )}>
                          {shortcut.action}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Mouse Interactions */}
              <div className={clsx(
                "p-6 rounded-xl",
                isDark ? "bg-gray-900/50 border border-gray-700" : "bg-gray-50 border border-gray-200"
              )}>
                <h3 className={clsx(
                  "text-lg font-semibold mb-4 flex items-center gap-2",
                  isDark ? "text-green-300" : "text-green-600"
                )}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z" clipRule="evenodd" />
                  </svg>
                  Mouse Interactions
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: '🖱️', action: 'Click component', result: 'Select and inspect' },
                    { icon: '🖱️🔄', action: 'Double-click component', result: 'Toggle expand/collapse' },
                    { icon: '🔍', action: 'Click search icon', result: 'Find component on page' },
                    { icon: '📋', action: 'Right-click component', result: 'Context menu options' }
                  ].map((interaction, index) => (
                    <div 
                      key={index}
                      className={clsx(
                        "p-3 rounded-lg transition-all duration-300 hover:scale-[1.02]",
                        isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-xl">{interaction.icon}</span>
                        <div>
                          <div className={clsx(
                            "font-medium",
                            isDark ? "text-white" : "text-gray-900"
                          )}>
                            {interaction.action}
                          </div>
                          <div className={clsx(
                            "text-sm mt-1",
                            isDark ? "text-gray-400" : "text-gray-600"
                          )}>
                            {interaction.result}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Context Menu Options */}
              <div className={clsx(
                "p-6 rounded-xl",
                isDark ? "bg-gray-900/50 border border-gray-700" : "bg-gray-50 border border-gray-200"
              )}>
                <h3 className={clsx(
                  "text-lg font-semibold mb-4 flex items-center gap-2",
                  isDark ? "text-purple-300" : "text-purple-600"
                )}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  Right-Click Menu
                </h3>
                <div className={clsx(
                  "p-4 rounded-lg",
                  isDark ? "bg-gray-800" : "bg-white"
                )}>
                  <div className="space-y-2">
                    {[
                      { label: 'Log $r to console', shortcut: 'console.log(component)' },
                      { label: 'Scroll into view', shortcut: 'Find on page' },
                      { label: 'Hide component', shortcut: 'Temporary hide' },
                      { label: 'Show source code', shortcut: 'Opens in Sources tab' }
                    ].map((item, index) => (
                      <div 
                        key={index}
                        className={clsx(
                          "p-2 rounded hover:bg-gray-700/50 cursor-pointer transition-colors duration-200"
                        )}
                      >
                        <div className="flex justify-between items-center">
                          <span className={clsx(
                            "text-sm",
                            isDark ? "text-gray-300" : "text-gray-700"
                          )}>
                            {item.label}
                          </span>
                          <span className={clsx(
                            "text-xs px-2 py-0.5 rounded",
                            isDark ? "bg-gray-700 text-gray-400" : "bg-gray-200 text-gray-600"
                          )}>
                            {item.shortcut}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Debugging Scenarios */}
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
              Common Debugging Scenarios
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="mb-8">
                  <h3 className={clsx(
                    "text-xl font-semibold mb-4",
                    isDark ? "text-blue-300" : "text-blue-600"
                  )}>
                    Scenario: Missing Component
                  </h3>
                  
                  <div className="space-y-4">
                    <div className={clsx(
                      "p-4 rounded-lg",
                      isDark ? "bg-gray-900/50" : "bg-gray-50"
                    )}>
                      <h4 className={clsx(
                        "font-semibold mb-2",
                        isDark ? "text-red-300" : "text-red-600"
                      )}>
                        ❌ Problem
                      </h4>
                      <p className={clsx(
                        "text-sm mb-3",
                        isDark ? "text-gray-300" : "text-gray-700"
                      )}>
                        "StudentCard from Shyamnagar is not appearing in the Barrackpore College dashboard"
                      </p>
                      
                      <h4 className={clsx(
                        "font-semibold mb-2 mt-4",
                        isDark ? "text-green-300" : "text-green-600"
                      )}>
                        ✅ Solution with Component Tree
                      </h4>
                      <ol className={clsx(
                        "text-sm space-y-2 pl-5",
                        isDark ? "text-gray-300" : "text-gray-700"
                      )}>
                        <li>1. Open React DevTools → Components tab</li>
                        <li>2. Find StudentList component in the tree</li>
                        <li>3. Check props - is the student data being passed?</li>
                        <li>4. Inspect render logic - conditional rendering issue?</li>
                        <li>5. Use search to find specific StudentCard components</li>
                      </ol>
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
                    Common Pitfalls
                  </h4>
                  <ul className={clsx(
                    "space-y-3 text-sm",
                    isDark ? "text-gray-300" : "text-gray-700"
                  )}>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-red-400">❌</span>
                      <span>Not expanding parent components to see all children</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-red-400">❌</span>
                      <span>Forgetting to use search for deeply nested components</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 text-red-400">❌</span>
                      <div>
                        <span>Confusing similar component names</span>
                        <p className="text-xs mt-1 opacity-75">
                          Solution: Check component source location in details panel
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
                    isDark ? "text-green-300" : "text-green-600"
                  )}>
                    Scenario: Performance Issues
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
                          Component Re-render Analysis
                        </h4>
                        <p className={clsx(
                          "text-sm",
                          isDark ? "text-gray-400" : "text-gray-600"
                        )}>
                          Using Highlight Updates feature
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className={clsx(isDark ? "text-gray-400" : "text-gray-600")}>
                            When attendance changes:
                          </span>
                          <span className="text-green-400">✓ Re-renders: 3</span>
                        </div>
                        <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-yellow-400 to-red-400" 
                            style={{ width: '70%' }}
                          />
                        </div>
                        <p className="text-xs mt-2 text-gray-500">
                          Only affected components should re-render
                        </p>
                      </div>
                      
                      <div className={clsx(
                        "p-3 rounded-lg",
                        isDark ? "bg-gray-800" : "bg-gray-100"
                      )}>
                        <p className={clsx(
                          "text-xs",
                          isDark ? "text-gray-400" : "text-gray-600"
                        )}>
                          <strong>Tip:</strong> If entire tree re-renders when one student's attendance changes, 
                          check for unnecessary state/props updates in parent components.
                        </p>
                      </div>
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
                    Professional Tips
                  </h4>
                  <ul className={clsx(
                    "space-y-2 text-sm",
                    isDark ? "text-gray-300" : "text-gray-600"
                  )}>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5">🎯</span>
                      <span>Use "Highlight updates" to visualize re-render chains</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5">🎯</span>
                      <span>Right-click → "Log $r" to inspect component in console</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5">🎯</span>
                      <span>Use search (Cmd/Ctrl + F) to jump to specific components</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5">🎯</span>
                      <span>Compare props between renders to identify changes</span>
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
                    <strong>Dear Students,</strong> The component tree is your React application's organizational chart. 
                    When debugging issues in the Barrackpore College system, I always start by asking:
                    <strong> "Where in the component hierarchy is this problem occurring?"</strong>
                  </p>
                  
                  <div className={clsx(
                    "p-4 rounded-lg border-l-4 mt-4",
                    isDark ? "border-yellow-500 bg-yellow-900/20" : "border-yellow-400 bg-yellow-50"
                  )}>
                    <p className={clsx(
                      "font-semibold",
                      isDark ? "text-yellow-300" : "text-yellow-700"
                    )}>
                      Key Insight: A well-understood component tree prevents 80% of React debugging headaches.
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
                      Classroom Debugging Strategy
                    </h4>
                    <ol className={clsx(
                      "space-y-3 text-sm pl-6",
                      isDark ? "text-gray-300" : "text-gray-700"
                    )}>
                      <li className="flex items-start gap-2">
                        <strong className="w-6">1.</strong>
                        <span>Open Components tab - see the big picture first</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <strong className="w-6">2.</strong>
                        <span>Navigate to suspicious component using tree/search</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <strong className="w-6">3.</strong>
                        <span>Inspect props and state - are values correct?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <strong className="w-6">4.</strong>
                        <span>Use "Highlight updates" to see render flow</span>
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
                      Real Application Example
                    </h4>
                    <p className={clsx(
                      "text-sm",
                      isDark ? "text-gray-300" : "text-gray-700"
                    )}>
                      When Swadeep from Shyamnagar reported his attendance wasn't updating, 
                      I used the component tree to trace from App → StudentDashboard → AttendanceTracker → StudentCard
                      and found a missing prop.
                    </p>
                    <div className={clsx(
                      "mt-4 p-3 rounded-lg text-xs",
                      isDark ? "bg-gray-800" : "bg-gray-100"
                    )}>
                      <code>Tree navigation → Problem isolation → Solution implementation</code>
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
                  ✅ Component Tree Mastery Checklist:
                </h3>
                <ul className={clsx(
                  "space-y-3",
                  isDark ? "text-gray-300" : "text-gray-700"
                )}>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>Can navigate component tree with keyboard shortcuts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>Know how to expand/collapse nodes efficiently</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>Can search for specific components in large trees</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>Understand parent-child relationships in the tree</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>Can use right-click menu options effectively</span>
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
                    Using the interactive tree above, practice these skills:
                  </p>
                  <ol className={clsx(
                    "space-y-2 text-sm pl-6",
                    isDark ? "text-gray-300" : "text-gray-700"
                  )}>
                    <li>1. Find the deepest nested component in the tree</li>
                    <li>2. Select AttendanceTracker and inspect its props</li>
                    <li>3. Use search to find all "Card" components</li>
                    <li>4. Collapse all nodes, then expand only StudentDashboard</li>
                    <li>5. Trace the hierarchy from App to a StudentCard</li>
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
                      <strong>Think about…</strong> How does the tree structure reflect component composition in code?
                    </p>
                    <p className={clsx(
                      "text-sm italic mt-2",
                      isDark ? "text-gray-400" : "text-gray-600"
                    )}>
                      <strong>Observe carefully…</strong> What information can you gather about a component without seeing its source code?
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
                <strong>Next Step:</strong> In the next topic, we'll explore how to inspect and modify component props and state in real-time!
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

export default Topic25;