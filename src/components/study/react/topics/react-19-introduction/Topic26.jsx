import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

const Topic26 = () => {
  // State for dark mode (default to true as specified)
  const [isDark, setIsDark] = useState(true);
  
  // Animation state for staggered reveal
  const [isVisible, setIsVisible] = useState(false);
  
  // Demo state for import/export visualization
  const [activeTab, setActiveTab] = useState('defaultExport');
  const [selectedFile, setSelectedFile] = useState('Button.jsx');
  const [importPath, setImportPath] = useState('./components/Button');
  
  // Demo component data
  const componentFiles = {
    'Button.jsx': {
      exports: ['default', 'Button', 'ButtonTypes'],
      importExamples: [
        "import Button from './Button';",
        "import Button, { ButtonTypes } from './Button';",
        "import { Button as UIButton } from './Button';"
      ],
      code: `// Button.jsx - Component file
import React from 'react';
import PropTypes from 'prop-types';

// Named export for Button component
export function Button({ 
  children, 
  type = 'primary', 
  onClick 
}) {
  return (
    <button 
      className={\`btn btn-\${type}\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// Named export for constants
export const ButtonTypes = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  DANGER: 'danger'
};

// Named export for helper function
export function formatButtonText(text) {
  return text.trim().toUpperCase();
}

// Default export (usually main component)
export default Button;`
    },
    'StudentCard.jsx': {
      exports: ['default', 'StudentCard', 'StudentStatus'],
      importExamples: [
        "import StudentCard from './StudentCard';",
        "import StudentCard, { StudentStatus } from './StudentCard';",
        "import { StudentCard as Card } from './StudentCard';"
      ],
      code: `// StudentCard.jsx - Barrackpore College Student Card
import React from 'react';

// Named export for StudentCard component
export function StudentCard({ 
  name, 
  location, 
  rollNumber, 
  status = 'active' 
}) {
  return (
    <div className="student-card">
      <h3>{name}</h3>
      <p>Location: {location}</p>
      <p>Roll: {rollNumber}</p>
      <span className={\`status status-\${status}\`}>
        {status}
      </span>
    </div>
  );
}

// Named export for status constants
export const StudentStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  GRADUATED: 'graduated'
};

// Default export
export default StudentCard;`
    },
    'index.js': {
      exports: ['Button', 'Input', 'Card', 'Modal'],
      importExamples: [
        "import { Button, Input } from './components';",
        "import * as UI from './components';",
        "import { Button as MyButton } from './components';"
      ],
      code: `// index.js - Barrel file for components folder
// Re-export all components from one entry point

// From Button.jsx
export { default as Button } from './Button';
export { ButtonTypes } from './Button';

// From Input.jsx
export { default as Input } from './Input';
export { InputTypes } from './Input';

// From Card.jsx
export { default as Card } from './Card';

// From Modal.jsx
export { default as Modal } from './Modal';

// This allows clean imports:
// import { Button, Input, Card } from './components';`
    },
    'utils.js': {
      exports: ['formatDate', 'calculateGrade', 'validateEmail', 'constants'],
      importExamples: [
        "import { formatDate, calculateGrade } from './utils';",
        "import * as utils from './utils';",
        "import { formatDate as dateFormat } from './utils';"
      ],
      code: `// utils.js - Utility functions for Barrackpore College
// Named exports only (no default export)

// Export individual functions
export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-IN');
}

export function calculateGrade(marks) {
  if (marks >= 90) return 'A+';
  if (marks >= 80) return 'A';
  if (marks >= 70) return 'B+';
  if (marks >= 60) return 'B';
  return 'C';
}

export function validateEmail(email) {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
}

// Export object
export const constants = {
  SCHOOL_NAME: 'Barrackpore College',
  MAX_STUDENTS: 1000,
  LOCATIONS: ['Shyamnagar', 'Barrackpore', 'Ichapur', 'Naihati']
};`
    }
  };
  
  useEffect(() => {
    // Trigger animations after mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Get selected file details
  const selectedFileDetails = componentFiles[selectedFile];

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
              Topic 27: ES6 Modules - Import & Export
            </h1>
            
            <p className={clsx(
              "text-xl mb-8",
              isDark ? "text-gray-300" : "text-gray-700",
              "motion-safe:animate-[slideUp_0.8s_ease-out_0.1s] motion-safe:animation-fill-forwards opacity-0"
            )}>
              Organizing React code with modular imports and exports
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
              📦 Why ES6 Modules Matter
            </h2>
            
            <div className="grid md:grid-cols-1 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className={clsx(
                    "text-xl font-semibold mb-3 flex items-center gap-2",
                    isDark ? "text-blue-300" : "text-blue-600"
                  )}>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Code Organization & Reusability
                  </h3>
                  <p className={clsx(
                    "leading-relaxed",
                    isDark ? "text-gray-300" : "text-gray-700"
                  )}>
                    ES6 modules allow you to split your React application into smaller, 
                    reusable pieces. Each component, utility, or constant can live in its own file 
                    and be imported wherever needed.
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
                    Real-World Analogy: Barrackpore College Library
                  </h4>
                  <ul className={clsx(
                    "space-y-2 pl-6",
                    isDark ? "text-gray-300" : "text-gray-700"
                  )}>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">📚</span>
                      <span><strong>Modules = Books:</strong> Each file is a book with specific content</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">📖</span>
                      <span><strong>Export = Publishing:</strong> Making content available to others</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">📥</span>
                      <span><strong>Import = Borrowing:</strong> Using content from other files</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">📋</span>
                      <span><strong>Index Files = Catalog:</strong> Central listing of available books</span>
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
                  Key Benefits of Modular Code
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
                        <span className="text-blue-400">🔧</span>
                      </div>
                      <strong className={clsx(
                        isDark ? "text-white" : "text-gray-900"
                      )}>
                        Maintainability
                      </strong>
                    </div>
                    <p className={clsx(
                      "text-sm",
                      isDark ? "text-gray-400" : "text-gray-600"
                    )}>
                      Small, focused files are easier to understand and modify
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
                        <span className="text-green-400">♻️</span>
                      </div>
                      <strong className={clsx(
                        isDark ? "text-white" : "text-gray-900"
                      )}>
                        Reusability
                      </strong>
                    </div>
                    <p className={clsx(
                      "text-sm",
                      isDark ? "text-gray-400" : "text-gray-600"
                    )}>
                      Components can be used across multiple parts of your app
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
                        <span className="text-purple-400">🚀</span>
                      </div>
                      <strong className={clsx(
                        isDark ? "text-white" : "text-gray-900"
                      )}>
                        Performance
                      </strong>
                    </div>
                    <p className={clsx(
                      "text-sm",
                      isDark ? "text-gray-400" : "text-gray-600"
                    )}>
                      Code splitting - only load what's needed for each page
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Export Types Interactive Demo */}
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
              Export Types - Making Code Available
            </h2>
            
            <div className="grid md:grid-cols-1 gap-8">
              {/* Left Column - File Explorer */}
              <div>
                <div className={clsx(
                  "p-6 rounded-xl mb-6",
                  isDark ? "bg-gray-900/50 border border-gray-700" : "bg-gray-50 border border-gray-200"
                )}>
                  <h3 className={clsx(
                    "text-lg font-semibold mb-4 flex items-center gap-2",
                    isDark ? "text-blue-300" : "text-blue-600"
                  )}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                    </svg>
                    Project Files
                  </h3>
                  
                  <div className="space-y-2">
                    {Object.keys(componentFiles).map((fileName) => (
                      <div
                        key={fileName}
                        className={clsx(
                          "p-3 rounded-lg cursor-pointer transition-all duration-200",
                          "hover:scale-[1.02] hover:shadow-md",
                          selectedFile === fileName
                            ? isDark
                              ? "bg-blue-900/50 border border-blue-700"
                              : "bg-blue-100 border border-blue-300"
                            : isDark
                              ? "bg-gray-800 hover:bg-gray-700 border border-gray-700"
                              : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
                        )}
                        onClick={() => setSelectedFile(fileName)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={clsx(
                            "w-8 h-8 rounded-lg flex items-center justify-center",
                            isDark ? "bg-gray-700" : "bg-gray-200"
                          )}>
                            {fileName.endsWith('.jsx') ? (
                              <span className="text-blue-400">⚛️</span>
                            ) : fileName === 'index.js' ? (
                              <span className="text-green-400">📁</span>
                            ) : (
                              <span className="text-yellow-400">🔧</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{fileName}</div>
                            <div className="flex items-center gap-2 mt-1 text-xs">
                              <span className={clsx(
                                "px-2 py-0.5 rounded",
                                isDark ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
                              )}>
                                {componentFiles[fileName].exports.length} exports
                              </span>
                              {fileName.endsWith('.jsx') && (
                                <span className={clsx(
                                  "px-2 py-0.5 rounded",
                                  isDark ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-700"
                                )}>
                                  React Component
                                </span>
                              )}
                            </div>
                          </div>
                          {selectedFile === fileName && (
                            <div className={clsx(
                              "w-2 h-2 rounded-full",
                              isDark ? "bg-blue-400" : "bg-blue-500"
                            )} />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Export Types */}
                <div className={clsx(
                  "p-6 rounded-xl",
                  isDark ? "bg-gray-900/50 border border-gray-700" : "bg-gray-50 border border-gray-200"
                )}>
                  <h3 className={clsx(
                    "text-lg font-semibold mb-4",
                    isDark ? "text-purple-300" : "text-purple-600"
                  )}>
                    Export Types Comparison
                  </h3>
                  
                  <div className="space-y-4">
                    <div className={clsx(
                      "p-4 rounded-lg transition-all duration-300 hover:scale-[1.02]",
                      isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
                    )}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={clsx(
                          "p-2 rounded-lg",
                          isDark ? "bg-green-900" : "bg-green-100"
                        )}>
                          <span className="text-green-400">📤</span>
                        </div>
                        <div>
                          <h4 className={clsx(
                            "font-semibold",
                            isDark ? "text-white" : "text-gray-900"
                          )}>
                            Named Export
                          </h4>
                          <p className={clsx(
                            "text-xs",
                            isDark ? "text-gray-400" : "text-gray-600"
                          )}>
                            export const name = value;
                          </p>
                        </div>
                      </div>
                      <ul className={clsx(
                        "text-sm space-y-1 pl-6 mt-2",
                        isDark ? "text-gray-300" : "text-gray-700"
                      )}>
                        <li>• Multiple per file</li>
                        <li>• Must use exact name when importing</li>
                        <li>• Good for utilities, constants, helpers</li>
                      </ul>
                    </div>
                    
                    <div className={clsx(
                      "p-4 rounded-lg transition-all duration-300 hover:scale-[1.02]",
                      isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
                    )}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={clsx(
                          "p-2 rounded-lg",
                          isDark ? "bg-blue-900" : "bg-blue-100"
                        )}>
                          <span className="text-blue-400">🎯</span>
                        </div>
                        <div>
                          <h4 className={clsx(
                            "font-semibold",
                            isDark ? "text-white" : "text-gray-900"
                          )}>
                            Default Export
                          </h4>
                          <p className={clsx(
                            "text-xs",
                            isDark ? "text-gray-400" : "text-gray-600"
                          )}>
                            export default Component;
                          </p>
                        </div>
                      </div>
                      <ul className={clsx(
                        "text-sm space-y-1 pl-6 mt-2",
                        isDark ? "text-gray-300" : "text-gray-700"
                      )}>
                        <li>• One per file</li>
                        <li>• Can rename when importing</li>
                        <li>• Perfect for main component</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Code Preview */}
              <div>
                <div className={clsx(
                  "p-6 rounded-xl h-full",
                  isDark ? "bg-gray-900/50 border border-gray-700" : "bg-gray-50 border border-gray-200"
                )}>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className={clsx(
                      "text-lg font-semibold",
                      isDark ? "text-white" : "text-gray-900"
                    )}>
                      {selectedFile}
                    </h3>
                    <div className="flex gap-2">
                      <span className={clsx(
                        "px-3 py-1 rounded-lg text-sm",
                        isDark ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
                      )}>
                        Exports: {selectedFileDetails.exports.length}
                      </span>
                    </div>
                  </div>
                  
                  {/* Code Display */}
                  <div className={clsx(
                    "p-4 rounded-lg mb-6",
                    isDark ? "bg-gray-900" : "bg-gray-900"
                  )}>
                    <pre className="text-sm text-gray-300 overflow-x-auto">
                      <code>{selectedFileDetails.code}</code>
                    </pre>
                  </div>
                  
                  {/* Available Exports */}
                  <div>
                    <h4 className={clsx(
                      "font-semibold mb-3 flex items-center gap-2",
                      isDark ? "text-green-300" : "text-green-600"
                    )}>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Available Exports
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedFileDetails.exports.map((exportName) => (
                        <span
                          key={exportName}
                          className={clsx(
                            "px-3 py-1 rounded-lg text-sm",
                            exportName === 'default'
                              ? isDark
                                ? "bg-blue-900/30 text-blue-300 border border-blue-700/30"
                                : "bg-blue-100 text-blue-700 border border-blue-200"
                              : isDark
                                ? "bg-green-900/30 text-green-300 border border-green-700/30"
                                : "bg-green-100 text-green-700 border border-green-200"
                          )}
                        >
                          {exportName}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Import Examples */}
                  <div>
                    <h4 className={clsx(
                      "font-semibold mb-3 flex items-center gap-2",
                      isDark ? "text-blue-300" : "text-blue-600"
                    )}>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Import Examples
                    </h4>
                    <div className="space-y-3">
                      {selectedFileDetails.importExamples.map((example, index) => (
                        <div
                          key={index}
                          className={clsx(
                            "p-3 rounded-lg",
                            isDark ? "bg-gray-800" : "bg-gray-100"
                          )}
                        >
                          <code className="text-sm text-blue-300">{example}</code>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Import Syntax & Patterns */}
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
              Import Syntax & Patterns
            </h2>
            
            <div className="grid md:grid-cols-1 gap-6">
              {/* Default Import */}
              <div className={clsx(
                "p-6 rounded-xl transition-all duration-300 hover:scale-[1.02]",
                activeTab === 'defaultExport' 
                  ? isDark 
                    ? "bg-blue-900/30 border-2 border-blue-500" 
                    : "bg-blue-100 border-2 border-blue-500"
                  : isDark 
                    ? "bg-gray-900/50 border border-gray-700 hover:bg-gray-900" 
                    : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
              )}
                onClick={() => setActiveTab('defaultExport')}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={clsx(
                    "p-3 rounded-xl",
                    isDark ? "bg-blue-900" : "bg-blue-100"
                  )}>
                    <span className="text-blue-400">🎯</span>
                  </div>
                  <h3 className={clsx(
                    "text-lg font-semibold",
                    isDark ? "text-white" : "text-gray-900"
                  )}>
                    Default Import
                  </h3>
                </div>
                
                <div className={clsx(
                  "p-4 rounded-lg mb-4",
                  isDark ? "bg-gray-800" : "bg-white"
                )}>
                  <code className="text-sm text-green-300">
                    import Component from './path';
                  </code>
                </div>
                
                <ul className={clsx(
                  "space-y-2 text-sm pl-5",
                  isDark ? "text-gray-300" : "text-gray-700"
                )}>
                  <li>• Import the default export</li>
                  <li>• Can use any name (renaming allowed)</li>
                  <li>• One per file (the main export)</li>
                  <li>• Common for React components</li>
                </ul>
                
                <div className="mt-4 pt-4 border-t border-gray-700/30">
                  <p className={clsx(
                    "text-xs",
                    isDark ? "text-gray-400" : "text-gray-600"
                  )}>
                    Example: <code className="text-blue-300">import Button from './Button';</code>
                  </p>
                </div>
              </div>
              
              {/* Named Import */}
              <div className={clsx(
                "p-6 rounded-xl transition-all duration-300 hover:scale-[1.02]",
                activeTab === 'namedExport' 
                  ? isDark 
                    ? "bg-green-900/30 border-2 border-green-500" 
                    : "bg-green-100 border-2 border-green-500"
                  : isDark 
                    ? "bg-gray-900/50 border border-gray-700 hover:bg-gray-900" 
                    : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
              )}
                onClick={() => setActiveTab('namedExport')}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={clsx(
                    "p-3 rounded-xl",
                    isDark ? "bg-green-900" : "bg-green-100"
                  )}>
                    <span className="text-green-400">📦</span>
                  </div>
                  <h3 className={clsx(
                    "text-lg font-semibold",
                    isDark ? "text-white" : "text-gray-900"
                  )}>
                    Named Import
                  </h3>
                </div>
                
                <div className={clsx(
                  "p-4 rounded-lg mb-4",
                  isDark ? "bg-gray-800" : "bg-white"
                )}>
                  <code className="text-sm text-green-300">
                    import {'{ Component }'} from './path';
                  </code>
                </div>
                
                <ul className={clsx(
                  "space-y-2 text-sm pl-5",
                  isDark ? "text-gray-300" : "text-gray-700"
                )}>
                  <li>• Import specific named exports</li>
                  <li>• Must use exact export name</li>
                  <li>• Can import multiple at once</li>
                  <li>• Can rename with 'as' keyword</li>
                </ul>
                
                <div className="mt-4 pt-4 border-t border-gray-700/30">
                  <p className={clsx(
                    "text-xs",
                    isDark ? "text-gray-400" : "text-gray-600"
                  )}>
                    Example: <code className="text-green-300">import {'{ Button, Input }'} from './ui';</code>
                  </p>
                </div>
              </div>
              
              {/* Namespace Import */}
              <div className={clsx(
                "p-6 rounded-xl transition-all duration-300 hover:scale-[1.02]",
                activeTab === 'namespaceExport' 
                  ? isDark 
                    ? "bg-purple-900/30 border-2 border-purple-500" 
                    : "bg-purple-100 border-2 border-purple-500"
                  : isDark 
                    ? "bg-gray-900/50 border border-gray-700 hover:bg-gray-900" 
                    : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
              )}
                onClick={() => setActiveTab('namespaceExport')}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={clsx(
                    "p-3 rounded-xl",
                    isDark ? "bg-purple-900" : "bg-purple-100"
                  )}>
                    <span className="text-purple-400">📁</span>
                  </div>
                  <h3 className={clsx(
                    "text-lg font-semibold",
                    isDark ? "text-white" : "text-gray-900"
                  )}>
                    Namespace Import
                  </h3>
                </div>
                
                <div className={clsx(
                  "p-4 rounded-lg mb-4",
                  isDark ? "bg-gray-800" : "bg-white"
                )}>
                  <code className="text-sm text-green-300">
                    import * as Module from './path';
                  </code>
                </div>
                
                <ul className={clsx(
                  "space-y-2 text-sm pl-5",
                  isDark ? "text-gray-300" : "text-gray-700"
                )}>
                  <li>• Import all exports as an object</li>
                  <li>• Access via Module.exportName</li>
                  <li>• Useful for utility libraries</li>
                  <li>• Can cause larger bundle if unused</li>
                </ul>
                
                <div className="mt-4 pt-4 border-t border-gray-700/30">
                  <p className={clsx(
                    "text-xs",
                    isDark ? "text-gray-400" : "text-gray-600"
                  )}>
                    Example: <code className="text-purple-300">import * as utils from './utils';</code>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Import Path Types */}
            <div className={clsx(
              "mt-8 p-6 rounded-xl",
              isDark ? "bg-gray-900/50 border border-gray-700" : "bg-gray-50 border border-gray-200"
            )}>
              <h3 className={clsx(
                "text-lg font-semibold mb-4",
                isDark ? "text-yellow-300" : "text-yellow-600"
              )}>
                Import Path Resolution
              </h3>
              
              <div className="grid md:grid-cols-1 gap-6">
                <div>
                  <h4 className={clsx(
                    "font-medium mb-3",
                    isDark ? "text-green-300" : "text-green-600"
                  )}>
                    Relative Paths
                  </h4>
                  <div className="space-y-3">
                    <div className={clsx(
                      "p-3 rounded-lg",
                      isDark ? "bg-gray-800" : "bg-gray-100"
                    )}>
                      <code className="text-sm text-blue-300">import './styles.css';</code>
                      <p className="text-xs mt-1 text-gray-500">Current directory</p>
                    </div>
                    <div className={clsx(
                      "p-3 rounded-lg",
                      isDark ? "bg-gray-800" : "bg-gray-100"
                    )}>
                      <code className="text-sm text-blue-300">import '../parent/Component';</code>
                      <p className="text-xs mt-1 text-gray-500">Parent directory</p>
                    </div>
                    <div className={clsx(
                      "p-3 rounded-lg",
                      isDark ? "bg-gray-800" : "bg-gray-100"
                    )}>
                      <code className="text-sm text-blue-300">import './components/Button';</code>
                      <p className="text-xs mt-1 text-gray-500">Subdirectory</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className={clsx(
                    "font-medium mb-3",
                    isDark ? "text-blue-300" : "text-blue-600"
                  )}>
                    Absolute & Module Paths
                  </h4>
                  <div className="space-y-3">
                    <div className={clsx(
                      "p-3 rounded-lg",
                      isDark ? "bg-gray-800" : "bg-gray-100"
                    )}>
                      <code className="text-sm text-green-300">import React from 'react';</code>
                      <p className="text-xs mt-1 text-gray-500">Node module</p>
                    </div>
                    <div className={clsx(
                      "p-3 rounded-lg",
                      isDark ? "bg-gray-800" : "bg-gray-100"
                    )}>
                      <code className="text-sm text-green-300">import '@/components/Button';</code>
                      <p className="text-xs mt-1 text-gray-500">Path alias (Vite/CRA)</p>
                    </div>
                    <div className={clsx(
                      "p-3 rounded-lg",
                      isDark ? "bg-gray-800" : "bg-gray-100"
                    )}>
                      <code className="text-sm text-green-300">import Button from 'components/Button';</code>
                      <p className="text-xs mt-1 text-gray-500">With path resolution</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Patterns & Best Practices */}
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
              Common Patterns & Best Practices
            </h2>
            
            <div className="grid md:grid-cols-1 gap-8">
              <div>
                <div className="mb-8">
                  <h3 className={clsx(
                    "text-xl font-semibold mb-4",
                    isDark ? "text-blue-300" : "text-blue-600"
                  )}>
                    Barrel Exports (Index Files)
                  </h3>
                  
                  <div className={clsx(
                    "p-6 rounded-xl",
                    isDark ? "bg-gray-900/50 border border-gray-700" : "bg-gray-50 border border-gray-200"
                  )}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={clsx(
                        "p-3 rounded-xl",
                        isDark ? "bg-green-900" : "bg-green-100"
                      )}>
                        <span className="text-green-400">📁</span>
                      </div>
                      <div>
                        <h4 className={clsx(
                          "font-semibold",
                          isDark ? "text-white" : "text-gray-900"
                        )}>
                          components/index.js
                        </h4>
                        <p className={clsx(
                          "text-sm",
                          isDark ? "text-gray-400" : "text-gray-600"
                        )}>
                          Central export point for components folder
                        </p>
                      </div>
                    </div>
                    
                    <div className={clsx(
                      "p-4 rounded-lg mb-4",
                      isDark ? "bg-gray-800" : "bg-white"
                    )}>
                      <pre className="text-sm text-gray-300">
{`// Export all components from one place
export { default as Button } from './Button';
export { default as Input } from './Input';
export { default as Card } from './Card';
export { default as Modal } from './Modal';

// Clean import in other files:
import { Button, Input } from './components';`}
                      </pre>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className={clsx(
                        "p-3 rounded-lg text-center",
                        isDark ? "bg-gray-800" : "bg-gray-100"
                      )}>
                        <div className={clsx(
                          "text-xl font-bold",
                          isDark ? "text-white" : "text-gray-900"
                        )}>
                          ✅ Benefits
                        </div>
                        <ul className={clsx(
                          "text-xs mt-2 space-y-1",
                          isDark ? "text-gray-300" : "text-gray-700"
                        )}>
                          <li>Clean imports</li>
                          <li>Single import source</li>
                          <li>Easy refactoring</li>
                        </ul>
                      </div>
                      <div className={clsx(
                        "p-3 rounded-lg text-center",
                        isDark ? "bg-gray-800" : "bg-gray-100"
                      )}>
                        <div className={clsx(
                          "text-xl font-bold",
                          isDark ? "text-white" : "text-gray-900"
                        )}>
                          📍 Usage
                        </div>
                        <ul className={clsx(
                          "text-xs mt-2 space-y-1",
                          isDark ? "text-gray-300" : "text-gray-700"
                        )}>
                          <li>Component libraries</li>
                          <li>Utility folders</li>
                          <li>API services</li>
                        </ul>
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
                    Common Mistakes
                  </h4>
                  <ul className={clsx(
                    "space-y-3 text-sm",
                    isDark ? "text-gray-300" : "text-gray-700"
                  )}>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-red-400">❌</span>
                      <div>
                        <strong>Circular dependencies:</strong>
                        <p className="text-xs mt-1 opacity-75">
                          File A imports B, B imports A → Infinite loop
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-red-400">❌</span>
                      <div>
                        <strong>Wrong import paths:</strong>
                        <p className="text-xs mt-1 opacity-75">
                          Using ./ vs ../ incorrectly causes "Module not found"
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 text-red-400">❌</span>
                      <div>
                        <strong>Default vs Named confusion:</strong>
                        <pre className="text-xs mt-1 p-2 rounded bg-gray-900/50">
{`// File exports: export default Button
import { Button } from './Button'; // ❌ Wrong
import Button from './Button';     // ✅ Correct`}
                        </pre>
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
                    File Organization Example
                  </h3>
                  
                  <div className={clsx(
                    "p-6 rounded-xl",
                    isDark ? "bg-gray-900/50 border border-gray-700" : "bg-gray-50 border border-gray-200"
                  )}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={clsx(
                        "p-3 rounded-xl",
                        isDark ? "bg-blue-900" : "bg-blue-100"
                      )}>
                        <span className="text-blue-400">🏫</span>
                      </div>
                      <div>
                        <h4 className={clsx(
                          "font-semibold",
                          isDark ? "text-white" : "text-gray-900"
                        )}>
                          Coder & AccoTax Project Structure
                        </h4>
                        <p className={clsx(
                          "text-sm",
                          isDark ? "text-gray-400" : "text-gray-600"
                        )}>
                          Modular organization for student management system
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className={clsx(
                        "p-4 rounded-lg",
                        isDark ? "bg-gray-800" : "bg-white"
                      )}>
                        <div className="font-medium mb-2">📁 src/components/</div>
                        <div className="text-sm space-y-1 pl-4">
                          <div>├── Button.jsx</div>
                          <div>├── Input.jsx</div>
                          <div>├── Card/
                          <div className="pl-4">├── StudentCard.jsx</div>
                          <div className="pl-4">├── TeacherCard.jsx</div>
                          <div className="pl-4">└── index.js</div>
                          </div>
                          <div>└── index.js (barrel)</div>
                        </div>
                      </div>
                      
                      <div className={clsx(
                        "p-4 rounded-lg",
                        isDark ? "bg-gray-800" : "bg-white"
                      )}>
                        <div className="font-medium mb-2">📁 src/utils/</div>
                        <div className="text-sm space-y-1 pl-4">
                          <div>├── dateUtils.js</div>
                          <div>├── gradeCalculator.js</div>
                          <div>└── validation.js</div>
                        </div>
                      </div>
                      
                      <div className={clsx(
                        "p-3 rounded-lg",
                        isDark ? "bg-gray-800" : "bg-gray-100"
                      )}>
                        <p className={clsx(
                          "text-xs",
                          isDark ? "text-gray-400" : "text-gray-600"
                        )}>
                          <strong>Usage Example:</strong>{" "}
                          <code className="text-blue-300">
                            import {'{ StudentCard }'} from './components/Card';
                          </code>
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
                      <span>Use default export for main component of a file</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5">🎯</span>
                      <span>Use named exports for utilities, constants, helpers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5">🎯</span>
                      <span>Create barrel files for clean imports from folders</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5">🎯</span>
                      <span>Group related exports in same file (e.g., Button + ButtonTypes)</span>
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
                    <strong>Dear Students,</strong> ES6 modules are like the postal system of your React application. 
                    When organizing the Barrackpore College system, I think: 
                    <strong> "What needs to be sent where, and how should it be packaged?"</strong>
                  </p>
                  
                  <div className={clsx(
                    "p-4 rounded-lg border-l-4 mt-4",
                    isDark ? "border-yellow-500 bg-yellow-900/20" : "border-yellow-400 bg-yellow-50"
                  )}>
                    <p className={clsx(
                      "font-semibold",
                      isDark ? "text-yellow-300" : "text-yellow-700"
                    )}>
                      Key Insight: A well-organized import/export structure makes your code readable, maintainable, and scalable.
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
                      Rule of Thumb
                    </h4>
                    <ol className={clsx(
                      "space-y-3 text-sm pl-6",
                      isDark ? "text-gray-300" : "text-gray-700"
                    )}>
                      <li className="flex items-start gap-2">
                        <strong className="w-6">1.</strong>
                        <span><strong>Default export:</strong> Main component of the file</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <strong className="w-6">2.</strong>
                        <span><strong>Named exports:</strong> Related utilities/constants</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <strong className="w-6">3.</strong>
                        <span><strong>Barrel files:</strong> For folders with multiple exports</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <strong className="w-6">4.</strong>
                        <span><strong>Path aliases:</strong> For deeply nested imports</span>
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
                      Real Debugging Story
                    </h4>
                    <p className={clsx(
                      "text-sm",
                      isDark ? "text-gray-300" : "text-gray-700"
                    )}>
                      When Swadeep's student card wasn't importing, the error was:
                      <code className="block mt-2 p-2 rounded bg-gray-800 text-red-300">
                        {`import { StudentCard } from './StudentCard'; // ❌`}
                      </code>
                      The fix:
                      <code className="block mt-2 p-2 rounded bg-gray-800 text-green-300">
                        import StudentCard from './StudentCard'; // ✅
                      </code>
                    </p>
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
                  ✅ ES6 Modules Mastery Checklist:
                </h3>
                <ul className={clsx(
                  "space-y-3",
                  isDark ? "text-gray-300" : "text-gray-700"
                )}>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>Understand difference between default and named exports</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>Can import both default and named exports in same statement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>Know how to use import aliases (as keyword)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>Understand relative vs absolute import paths</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>Can create and use barrel export files</span>
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
                    Create these files for Barrackpore College:
                  </p>
                  <ol className={clsx(
                    "space-y-2 text-sm pl-6",
                    isDark ? "text-gray-300" : "text-gray-700"
                  )}>
                    <li>1. <code>StudentCard.jsx</code> with default export</li>
                    <li>2. <code>utils/gradeCalculator.js</code> with named exports</li>
                    <li>3. <code>components/index.js</code> barrel file</li>
                    <li>4. Import all in <code>App.jsx</code> using different syntax</li>
                    <li>5. Fix a circular dependency error</li>
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
                      <strong>Think about…</strong> When should you use default vs named export for a React component?
                    </p>
                    <p className={clsx(
                      "text-sm italic mt-2",
                      isDark ? "text-gray-400" : "text-gray-600"
                    )}>
                      <strong>Observe carefully…</strong> How do barrel files simplify imports in large projects?
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
                <strong>Next Step:</strong> In the next topic, we'll explore common beginner mistakes in JSX and components!
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

export default Topic26;