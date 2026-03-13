import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

const Topic41 = () => {
  const [examples, setExamples] = useState([
    { id: 1, title: "Data Fetching", isActive: true, description: "Fetch and display data from API" },
    { id: 2, title: "Form Validation", isActive: false, description: "Real-time validation with debounce" },
    { id: 3, title: "Document Title", isActive: false, description: "Update page title dynamically" },
    { id: 4, title: "Window Size", isActive: false, description: "Track and respond to window resize" },
  ]);

  const [activePattern, setActivePattern] = useState(1);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    isValid: false
  });
  const [validationError, setValidationError] = useState('');

  // Pattern 1: Data Fetching Pattern
  useEffect(() => {
    if (activePattern === 1) {
      const fetchUserData = async () => {
        setLoading(true);
        setError(null);
        try {
          // Simulated API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          setUserData({
            id: 101,
            name: "Swadeep",
            email: "swadeep@example.com",
            location: "Barrackpore",
            joined: "2023-01-15"
          });
        } catch (err) {
          setError("Failed to fetch user data");
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [activePattern]);

  // Pattern 2: Form Validation Pattern
  useEffect(() => {
    if (activePattern === 2 && formData.username.length > 0) {
      const timer = setTimeout(() => {
        if (formData.username.length < 3) {
          setValidationError("Username must be at least 3 characters");
          setFormData(prev => ({ ...prev, isValid: false }));
        } else if (!formData.email.includes('@')) {
          setValidationError("Please enter a valid email");
          setFormData(prev => ({ ...prev, isValid: false }));
        } else {
          setValidationError("");
          setFormData(prev => ({ ...prev, isValid: true }));
        }
      }, 500); // Debounce for 500ms

      return () => clearTimeout(timer);
    }
  }, [formData.username, formData.email, activePattern]);

  // Pattern 3: Document Title Pattern
  useEffect(() => {
    if (activePattern === 3) {
      document.title = `User: ${formData.username || 'Guest'} | React Patterns`;
      
      return () => {
        document.title = "React Patterns";
      };
    }
  }, [formData.username, activePattern]);

  // Pattern 4: Window Resize Pattern
  useEffect(() => {
    if (activePattern === 4) {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      };

      window.addEventListener('resize', handleResize);
      
      // Cleanup function
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [activePattern]);

  const handlePatternSelect = (id) => {
    setActivePattern(id);
    setExamples(prev => prev.map(exp => ({
      ...exp,
      isActive: exp.id === id
    })));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.isValid) {
      alert(`Form submitted: ${formData.username} (${formData.email})`);
    }
  };

  const handleReset = () => {
    setUserData(null);
    setLoading(false);
    setError(null);
    setFormData({
      username: '',
      email: '',
      isValid: false
    });
    setValidationError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-12 text-center animate-[fadeIn_0.8s_ease-out]">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Combining <span className="text-blue-600 dark:text-blue-400">useState</span> &{' '}
            <span className="text-purple-600 dark:text-purple-400">useEffect</span> Patterns
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Mastering the art of synchronizing state with side effects for robust React applications
          </p>
        </header>

        {/* Introduction */}
        <section className="mb-12 animate-[slideUp_0.8s_ease-out]">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
              <span className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              The Power Duo of React Hooks
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  While <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">useState</code> manages your component's data,{' '}
                  <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">useEffect</code> handles side effects. Together, they form
                  the foundation of dynamic React applications.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Key Concept</h3>
                  <p className="text-blue-700 dark:text-blue-400">
                    useState provides the <span className="font-semibold">"what"</span> (data), useEffect provides the{' '}
                    <span className="font-semibold">"when"</span> (timing), and together they define the <span className="font-semibold">"how"</span> (behavior).
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-2xl font-bold">80%</span>
                  </div>
                  <p className="text-lg font-semibold">of React components use both useState and useEffect together</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pattern Selector */}
        <section className="mb-12 animate-[slideUp_0.8s_ease-out_0.2s]">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Common Patterns</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {examples.map((example, index) => (
              <button
                key={example.id}
                onClick={() => handlePatternSelect(example.id)}
                className={clsx(
                  "p-6 rounded-xl border transition-all duration-300 transform hover:scale-[1.02]",
                  example.isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg border-transparent"
                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
                )}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className={clsx(
                    "p-3 rounded-lg",
                    example.isActive ? "bg-white/20" : "bg-blue-100 dark:bg-blue-900"
                  )}>
                    <span className="text-xl font-bold">{example.id}</span>
                  </div>
                  <h3 className="font-semibold">{example.title}</h3>
                  <p className={clsx(
                    "text-sm",
                    example.isActive ? "text-white/90" : "text-gray-600 dark:text-gray-400"
                  )}>
                    {example.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Pattern Display */}
        <section className="mb-12 animate-[slideUp_0.8s_ease-out_0.4s]">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-8">
              {activePattern === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">Pattern 1: Data Fetching</h3>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                      Most Common
                    </span>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white">How it works</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          useEffect triggers API call when component mounts or dependencies change. useState manages loading, data, and error states.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className={clsx(
                                "h-full transition-all duration-500",
                                loading ? "bg-blue-500 w-1/2 animate-pulse" : 
                                error ? "bg-red-500 w-full" : 
                                "bg-green-500 w-full"
                              )}
                            />
                          </div>
                        </div>
                        <div className="text-sm font-medium">
                          {loading ? "Fetching..." : error ? "Error" : "Complete"}
                        </div>
                      </div>

                      {loading ? (
                        <div className="text-center py-8">
                          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                          <p className="mt-4 text-gray-600 dark:text-gray-400">Fetching data from Barrackpore server...</p>
                        </div>
                      ) : error ? (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                          <div className="flex items-center gap-3">
                            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-semibold text-red-800 dark:text-red-300">{error}</span>
                          </div>
                        </div>
                      ) : userData ? (
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                              {userData.name.charAt(0)}
                            </div>
                            <div>
                              <h4 className="text-xl font-bold text-gray-800 dark:text-white">{userData.name}</h4>
                              <p className="text-gray-600 dark:text-gray-400">{userData.location}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                              <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                              <p className="font-medium">{userData.email}</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                              <p className="text-sm text-gray-500 dark:text-gray-400">Joined</p>
                              <p className="font-medium">{userData.joined}</p>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Real-World Scenario
                    </h4>
                    <p className="text-blue-700 dark:text-blue-400">
                      When Tuhina visits her student profile page, useEffect fetches her latest grades and attendance data from the server,
                      while useState manages the loading spinner and displays the fetched information.
                    </p>
                  </div>
                </div>
              )}

              {activePattern === 2 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">Pattern 2: Real-time Form Validation</h3>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Username
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          className={clsx(
                            "w-full px-4 py-3 rounded-lg border transition-all duration-300",
                            validationError && formData.username.length > 0
                              ? "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20"
                              : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800",
                            "focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          )}
                          placeholder="Enter username (min 3 chars)"
                        />
                        {formData.username.length > 0 && (
                          <div className="mt-2 flex items-center gap-2">
                            <div className={clsx(
                              "w-3 h-3 rounded-full transition-all duration-300",
                              formData.username.length >= 3 ? "bg-green-500" : "bg-red-500"
                            )} />
                            <span className="text-sm">
                              {formData.username.length}/3 characters
                            </span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={clsx(
                            "w-full px-4 py-3 rounded-lg border transition-all duration-300",
                            validationError && formData.email.length > 0
                              ? "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20"
                              : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800",
                            "focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          )}
                          placeholder="student@example.com"
                        />
                        {formData.email.length > 0 && (
                          <div className="mt-2 flex items-center gap-2">
                            <div className={clsx(
                              "w-3 h-3 rounded-full transition-all duration-300",
                              formData.email.includes('@') ? "bg-green-500" : "bg-red-500"
                            )} />
                            <span className="text-sm">
                              {formData.email.includes('@') ? "Valid email format" : "Missing @ symbol"}
                            </span>
                          </div>
                        )}
                      </div>

                      {validationError && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                          <div className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            <span className="text-red-800 dark:text-red-300">{validationError}</span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-4">
                        <button
                          type="submit"
                          disabled={!formData.isValid}
                          className={clsx(
                            "px-6 py-3 rounded-lg font-medium transition-all duration-300",
                            formData.isValid
                              ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg transform hover:scale-105"
                              : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                          )}
                        >
                          Submit Registration
                        </button>
                        <button
                          type="button"
                          onClick={handleReset}
                          className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
                        >
                          Reset Form
                        </button>
                      </div>
                    </form>

                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Validation Flow</h4>
                      <div className="flex items-center justify-between text-sm">
                        <div className="text-center">
                          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-2">
                            1
                          </div>
                          <p className="text-gray-600 dark:text-gray-400">User types</p>
                        </div>
                        <div className="flex-1 h-1 bg-gray-300 dark:bg-gray-700 mx-2"></div>
                        <div className="text-center">
                          <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-2">
                            2
                          </div>
                          <p className="text-gray-600 dark:text-gray-400">Debounce (500ms)</p>
                        </div>
                        <div className="flex-1 h-1 bg-gray-300 dark:bg-gray-700 mx-2"></div>
                        <div className="text-center">
                          <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-2">
                            3
                          </div>
                          <p className="text-gray-600 dark:text-gray-400">Validation check</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activePattern === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">Pattern 3: Dynamic Document Title</h3>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white">Current Page Title</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Look at your browser tab title - it updates as you type!
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="text-center py-4">
                          <div className="inline-block bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded">
                            <span className="text-gray-800 dark:text-gray-300 font-medium">
                              User: {formData.username || 'Guest'} | React Patterns
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Enter username to update title
                        </label>
                        <input
                          type="text"
                          value={formData.username}
                          onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
                          placeholder="Try typing: Abhronila"
                        />
                      </div>

                      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800 rounded-lg p-4">
                        <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Use Case
                        </h4>
                        <p className="text-yellow-700 dark:text-yellow-400">
                          When Debangshu opens multiple student profiles in tabs, each tab shows the student's name, 
                          making it easy to identify which profile he's viewing.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activePattern === 4 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">Pattern 4: Window Size Tracking</h3>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold text-gray-800 dark:text-white">Current Window Size</h4>
                            <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                              Live
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                                <span>Width</span>
                                <span className="font-mono">{windowSize.width}px</span>
                              </div>
                              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-blue-500 transition-all duration-300"
                                  style={{ width: `${Math.min(windowSize.width / 20, 100)}%` }}
                                />
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                                <span>Height</span>
                                <span className="font-mono">{windowSize.height}px</span>
                              </div>
                              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-purple-500 transition-all duration-300"
                                  style={{ width: `${Math.min(windowSize.height / 20, 100)}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                          <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Try Resizing!</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            Resize your browser window and watch the values update in real-time
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-sm font-medium text-green-600 dark:text-green-400">Listening for resize events</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                          <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Device Detection</h4>
                          <div className="space-y-3">
                            <div className={clsx(
                              "p-4 rounded-lg border transition-all duration-300",
                              windowSize.width < 640
                                ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                                : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            )}>
                              <div className="flex items-center justify-between">
                                <span className="font-medium">Mobile</span>
                                <span className={clsx(
                                  "px-2 py-1 text-xs rounded-full",
                                  windowSize.width < 640
                                    ? "bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300"
                                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                                )}>
                                  {windowSize.width < 640 ? "Active" : "Inactive"}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Width &lt; 640px</p>
                            </div>

                            <div className={clsx(
                              "p-4 rounded-lg border transition-all duration-300",
                              windowSize.width >= 640 && windowSize.width < 768
                                ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                                : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            )}>
                              <div className="flex items-center justify-between">
                                <span className="font-medium">Tablet</span>
                                <span className={clsx(
                                  "px-2 py-1 text-xs rounded-full",
                                  windowSize.width >= 640 && windowSize.width < 768
                                    ? "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300"
                                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                                )}>
                                  {windowSize.width >= 640 && windowSize.width < 768 ? "Active" : "Inactive"}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">640px ≤ Width &lt; 768px</p>
                            </div>

                            <div className={clsx(
                              "p-4 rounded-lg border transition-all duration-300",
                              windowSize.width >= 768
                                ? "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800"
                                : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            )}>
                              <div className="flex items-center justify-between">
                                <span className="font-medium">Desktop</span>
                                <span className={clsx(
                                  "px-2 py-1 text-xs rounded-full",
                                  windowSize.width >= 768
                                    ? "bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-300"
                                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                                )}>
                                  {windowSize.width >= 768 ? "Active" : "Inactive"}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Width ≥ 768px</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Code Example */}
        <section className="mb-12 animate-[slideUp_0.8s_ease-out_0.6s]">
          <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl">
            <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-4 text-gray-300 font-mono">useState + useEffect Pattern</span>
                </div>
                <span className="text-sm text-gray-400">Pattern {activePattern}.jsx</span>
              </div>
            </div>
            <div className="p-6 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
{`import React, { useState, useEffect } from 'react';

const Component = () => {
  // 1. Declare state with useState
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 2. Use useEffect for side effects
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/data');
        const result = await response.json();
        
        // 3. Update state with fetched data
        setData(result);
        setError(null);
      } catch (err) {
        // 4. Handle errors in state
        setError('Failed to fetch data');
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
    
    // 5. Cleanup function (if needed)
    return () => {
      // Cleanup logic here
    };
  }, []); // 6. Dependency array - empty = run once on mount
  
  // 7. Render based on state
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {/* Render data */}
    </div>
  );
};

export default Component;`}
              </pre>
            </div>
          </div>
        </section>

        {/* Key Principles */}
        <section className="mb-12 animate-[slideUp_0.8s_ease-out_0.8s]">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Key Principles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white mb-2">Separation of Concerns</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    useState manages data, useEffect manages side effects. Keep them focused on their specific responsibilities.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold text-purple-600 dark:text-purple-400">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white mb-2">Proper Dependency Arrays</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Every state variable used inside useEffect must be in the dependency array to avoid stale closures.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold text-green-600 dark:text-green-400">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white mb-2">Cleanup Functions</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Always return cleanup functions from useEffect to prevent memory leaks and unwanted side effects.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold text-yellow-600 dark:text-yellow-400">4</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white mb-2">Error Boundaries</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Always handle errors in async operations and update state accordingly to prevent app crashes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teacher's Note */}
        <section className="mb-12 animate-[slideUp_0.8s_ease-out_1s]">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 text-white">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="text-2xl font-bold">Teacher's Note</h3>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                      Sukanta Hui | 27 years experience
                    </span>
                  </div>
                  <div className="space-y-4">
                    <p className="text-white/90 leading-relaxed">
                      In my 27 years of teaching students from Barrackpore to Shyamnagar, I've noticed that mastering 
                      useState and useEffect patterns is the turning point where students transition from React beginners 
                      to capable developers.
                    </p>
                    <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                      <h4 className="font-bold mb-2">Golden Rule to Remember:</h4>
                      <p className="text-white/90">
                        "Think of useState as your component's memory and useEffect as its sense of timing. 
                        The memory holds what happened, the timing decides when to react."
                      </p>
                    </div>
                    <p className="text-white/90">
                      When Abhronila was learning these patterns, I had her visualize data flowing: 
                      User action → useState update → useEffect triggered → UI re-render. This mental model 
                      helps debug complex component behavior.
                    </p>
                    <div className="pt-4 border-t border-white/20">
                      <p className="text-sm text-white/80">
                        Email: sukantahui@codernaccotax.co.in | Mobile: 7003756860
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className="mb-12 animate-[slideUp_0.8s_ease-out_1.2s]">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Common Pitfalls & Solutions</h2>
          <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-2xl p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-red-800 dark:text-red-300 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  Common Mistakes
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-red-600 dark:text-red-400">1</span>
                    </div>
                    <span className="text-red-700 dark:text-red-400">Forgetting cleanup functions causing memory leaks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-red-600 dark:text-red-400">2</span>
                    </div>
                    <span className="text-red-700 dark:text-red-400">Incorrect dependency arrays leading to infinite loops</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-red-600 dark:text-red-400">3</span>
                    </div>
                    <span className="text-red-700 dark:text-red-400">Setting state inside useEffect without conditions</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-green-800 dark:text-green-300 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Best Practices
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-green-600 dark:text-green-400">1</span>
                    </div>
                    <span className="text-green-700 dark:text-green-400">Always include cleanup in useEffect with subscriptions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-green-600 dark:text-green-400">2</span>
                    </div>
                    <span className="text-green-700 dark:text-green-400">Use ESLint rule for exhaustive dependencies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-green-600 dark:text-green-400">3</span>
                    </div>
                    <span className="text-green-700 dark:text-green-400">Separate concerns with multiple useEffect hooks</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Checklist */}
        <section className="animate-[slideUp_0.8s_ease-out_1.4s]">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Pattern Implementation Checklist</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">When using useState:</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
                    <span>Did I initialize state with proper default values?</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
                    <span>Am I updating state immutably (using spread operator)?</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
                    <span>Do I have related state variables grouped together?</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">When using useEffect:</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <input type="checkbox" className="w-5 h-5 text-purple-600 rounded" />
                    <span>Did I add all dependencies to the dependency array?</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <input type="checkbox" className="w-5 h-5 text-purple-600 rounded" />
                    <span>Do I need a cleanup function?</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <input type="checkbox" className="w-5 h-5 text-purple-600 rounded" />
                    <span>Am I preventing infinite re-renders?</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Hint Section</h3>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <p className="text-blue-800 dark:text-blue-300 italic">
                  Think about: What happens if you resize the window while Pattern 4 is active? 
                  Observe carefully how the cleanup function in the useEffect prevents multiple event listeners.
                  Try changing the debounce time in Pattern 2 from 500ms to 1000ms and notice how it affects user experience.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Inline styles for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[fadeIn_0\\.8s_ease-out\\],
          .animate-\\[slideUp_0\\.8s_ease-out\\],
          .animate-\\[slideUp_0\\.8s_ease-out_0\\.2s\\],
          .animate-\\[slideUp_0\\.8s_ease-out_0\\.4s\\],
          .animate-\\[slideUp_0\\.8s_ease-out_0\\.6s\\],
          .animate-\\[slideUp_0\\.8s_ease-out_0\\.8s\\],
          .animate-\\[slideUp_0\\.8s_ease-out_1s\\],
          .animate-\\[slideUp_0\\.8s_ease-out_1\\.2s\\],
          .animate-\\[slideUp_0\\.8s_ease-out_1\\.4s\\] {
            animation: none !important;
            opacity: 1;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Topic41;