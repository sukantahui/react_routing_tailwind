import React, { useState } from 'react';
import clsx from 'clsx';

const Topic17 = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    subscribe: false,
    course: '',
    message: ''
  });
  const [submissions, setSubmissions] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Form submission WITH preventDefault
  const handleSubmitWithPrevent = (e) => {
    e.preventDefault(); // This prevents default form submission
    
    // Validation
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      const submission = {
        id: Date.now(),
        ...formData,
        timestamp: new Date().toLocaleTimeString(),
        method: 'With preventDefault'
      };
      
      setSubmissions(prev => [submission, ...prev.slice(0, 4)]);
      setIsLoading(false);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        subscribe: false,
        course: '',
        message: ''
      });
      
      // Show success message
      addLogEntry(`Form submitted successfully with preventDefault() at ${submission.timestamp}`);
    }, 1500);
  };

  // Form submission WITHOUT preventDefault (for comparison)
  const handleSubmitWithoutPrevent = (e) => {
    // NO e.preventDefault() - form will submit normally
    
    // This code might not execute fully due to page reload
    const submission = {
      id: Date.now(),
      ...formData,
      timestamp: new Date().toLocaleTimeString(),
      method: 'Without preventDefault'
    };
    
    setSubmissions(prev => [submission, ...prev.slice(0, 4)]);
    addLogEntry(`Form submitted WITHOUT preventDefault() - page will reload`);
    
    // Note: In real scenario, page would reload here
    // We'll simulate this by showing a warning
    setTimeout(() => {
      alert('Page would normally reload here! State would be lost.');
    }, 100);
  };

  // Log entries for tracking
  const [logEntries, setLogEntries] = useState([
    { id: 1, text: 'Form initialized. Try submitting with and without preventDefault()', time: 'Initial' }
  ]);

  const addLogEntry = (text) => {
    setLogEntries(prev => [
      { id: Date.now(), text, time: new Date().toLocaleTimeString() },
      ...prev.slice(0, 9) // Keep last 10 entries
    ]);
  };

  // Course options
  const courses = [
    { id: 'react', name: 'React Masterclass', instructor: 'Swadeep' },
    { id: 'node', name: 'Node.js Backend', instructor: 'Tuhina' },
    { id: 'db', name: 'Database Design', instructor: 'Abhronila' },
    { id: 'ui', name: 'UI/UX Fundamentals', instructor: 'Debangshu' }
  ];

  // Simulate native form behavior
  const simulateNativeSubmit = () => {
    addLogEntry('Native form submission triggered - page would reload and lose all state');
    alert('This is what happens without preventDefault():\n1. Page reloads\n2. Form data clears\n3. React state is lost\n4. User experience is poor');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-gray-200 p-4 md:p-6 transition-colors duration-300">
      {/* Header Section */}
      <header className="max-w-6xl mx-auto mb-10">
        <div className="animate-[slideUp_0.8s_ease-out]">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent mb-3">
            Topic 17: Preventing Default Form Behavior
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Learn how e.preventDefault() gives you control over form submissions in React
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto space-y-10">
        {/* Concept Explanation */}
        <section className="animate-[slideUp_1s_ease-out]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-orange-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-900/10">
            <h2 className="text-2xl font-bold text-orange-300 mb-4 flex items-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Understanding Default Form Behavior
            </h2>
            
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Native HTML Form */}
                <div className="bg-red-900/20 p-5 rounded-xl border border-red-800/50">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                      <span className="text-red-400 font-bold">❌</span>
                    </div>
                    <h3 className="text-xl font-bold text-red-400">Native HTML Form</h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span>Page reloads on submit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span>All React state is lost</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span>No client-side validation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span>Poor user experience</span>
                    </li>
                  </ul>
                </div>

                {/* React Controlled Form */}
                <div className="bg-green-900/20 p-5 rounded-xl border border-green-800/50">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                      <span className="text-green-400 font-bold">✅</span>
                    </div>
                    <h3 className="text-xl font-bold text-green-400">React Controlled Form</h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>No page reload (SPA behavior)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>State is preserved</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Client-side validation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Better user experience</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-900/50 p-4 rounded-lg border-l-4 border-orange-500">
                <h3 className="font-bold text-lg text-orange-300 mb-2">The Magic: e.preventDefault()</h3>
                <p>
                  The <code className="text-yellow-400 font-mono">event.preventDefault()</code> method tells the browser 
                  "Don't do your default behavior, let me handle it in JavaScript." For forms, this prevents the 
                  page reload and allows React to handle submission programmatically.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Demo */}
        <section className="animate-[slideUp_1.2s_ease-out]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-blue-500/30 transition-all duration-500">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-blue-300 flex items-center gap-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                </svg>
                Interactive Demo: Student Registration Form
              </h2>
              
              <button
                onClick={() => setShowComparison(!showComparison)}
                className="px-4 py-2 bg-purple-900/30 text-purple-300 rounded-lg hover:bg-purple-800/50 transition-colors text-sm border border-purple-800/50"
              >
                {showComparison ? 'Hide Comparison' : 'Show Comparison'}
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Main Form */}
              <div className="space-y-6">
                <form 
                  onSubmit={handleSubmitWithPrevent}
                  className="space-y-5"
                >
                  <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
                    <h3 className="text-xl font-bold text-gray-300 mb-4">Student Registration</h3>
                    
                    <div className="space-y-4">
                      {/* Name */}
                      <div>
                        <label className="block text-gray-400 mb-2">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={clsx(
                            "w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 transition-all",
                            errors.name 
                              ? "border-red-500 focus:ring-red-500/50" 
                              : "border-gray-700 focus:border-blue-500 focus:ring-blue-500/50"
                          )}
                          placeholder="Enter your name"
                        />
                        {errors.name && (
                          <p className="mt-1 text-red-400 text-sm">{errors.name}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-gray-400 mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={clsx(
                            "w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 transition-all",
                            errors.email 
                              ? "border-red-500 focus:ring-red-500/50" 
                              : "border-gray-700 focus:border-blue-500 focus:ring-blue-500/50"
                          )}
                          placeholder="student@example.com"
                        />
                        {errors.email && (
                          <p className="mt-1 text-red-400 text-sm">{errors.email}</p>
                        )}
                      </div>

                      {/* Password */}
                      <div>
                        <label className="block text-gray-400 mb-2">Password *</label>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className={clsx(
                            "w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 transition-all",
                            errors.password 
                              ? "border-red-500 focus:ring-red-500/50" 
                              : "border-gray-700 focus:border-blue-500 focus:ring-blue-500/50"
                          )}
                          placeholder="At least 6 characters"
                        />
                        {errors.password && (
                          <p className="mt-1 text-red-400 text-sm">{errors.password}</p>
                        )}
                      </div>

                      {/* Course Selection */}
                      <div>
                        <label className="block text-gray-400 mb-2">Select Course</label>
                        <select
                          name="course"
                          value={formData.course}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
                        >
                          <option value="">Choose a course...</option>
                          {courses.map(course => (
                            <option key={course.id} value={course.id}>
                              {course.name} (Instructor: {course.instructor})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-gray-400 mb-2">Additional Message</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows="3"
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
                          placeholder="Any special requirements or questions..."
                        />
                      </div>

                      {/* Checkbox */}
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="subscribe"
                          name="subscribe"
                          checked={formData.subscribe}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-700 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <label htmlFor="subscribe" className="ml-2 text-gray-400">
                          Subscribe to newsletter from Barrackpore Coding School
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={clsx(
                        "py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2",
                        isLoading
                          ? "bg-blue-900/50 text-blue-300 border border-blue-800 cursor-not-allowed"
                          : "bg-blue-900/30 text-blue-300 hover:bg-blue-800/50 hover:text-blue-200 border border-blue-800/50 hover:border-blue-600"
                      )}
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Submit WITH preventDefault()
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleSubmitWithoutPrevent}
                      className="py-3 px-6 bg-red-900/30 text-red-300 rounded-lg font-medium hover:bg-red-800/50 hover:text-red-200 border border-red-800/50 hover:border-red-600 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      Submit WITHOUT preventDefault()
                    </button>
                  </div>
                </form>

                {/* Native Form Simulation */}
                <div className="bg-gray-900/30 p-4 rounded-xl border border-gray-700">
                  <h4 className="font-bold text-yellow-400 mb-2">Simulate Native Form Behavior</h4>
                  <p className="text-sm text-gray-400 mb-3">
                    See what happens without React's intervention:
                  </p>
                  <button
                    onClick={simulateNativeSubmit}
                    className="w-full py-2 bg-yellow-900/30 text-yellow-300 rounded-lg hover:bg-yellow-800/50 border border-yellow-800/50 transition-all duration-300"
                  >
                    Simulate Native HTML Form Submission
                  </button>
                </div>
              </div>

              {/* Submissions & Log */}
              <div className="space-y-6">
                {/* Recent Submissions */}
                <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
                  <h3 className="text-xl font-bold text-gray-300 mb-4">Recent Submissions</h3>
                  
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {submissions.length > 0 ? (
                      submissions.map((sub, index) => (
                        <div 
                          key={sub.id}
                          className="p-3 bg-gray-800/40 rounded-lg border border-gray-700 hover:bg-gray-800/70 transition-all duration-300"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-blue-300">{sub.name}</p>
                              <p className="text-sm text-gray-400">{sub.email}</p>
                              {sub.course && (
                                <p className="text-xs text-green-400 mt-1">
                                  Course: {courses.find(c => c.id === sub.course)?.name}
                                </p>
                              )}
                            </div>
                            <div className="text-right">
                              <span className={clsx(
                                "text-xs px-2 py-1 rounded",
                                sub.method.includes('WITH') 
                                  ? "bg-green-900/30 text-green-400 border border-green-800/50"
                                  : "bg-red-900/30 text-red-400 border border-red-800/50"
                              )}>
                                {sub.method}
                              </span>
                              <p className="text-xs text-gray-500 mt-1">{sub.timestamp}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <p>No submissions yet. Try submitting the form!</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Event Log */}
                <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
                  <h3 className="text-xl font-bold text-gray-300 mb-4">Event Log</h3>
                  
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {logEntries.map((entry, index) => (
                      <div 
                        key={entry.id}
                        className="p-3 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:bg-gray-800/50 transition-all duration-300"
                      >
                        <div className="flex justify-between items-start">
                          <p className="text-sm text-gray-300">{entry.text}</p>
                          <span className="text-xs text-gray-500 ml-4 flex-shrink-0">{entry.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        {showComparison && (
          <section className="animate-[slideUp_1.4s_ease-out]">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-purple-500/30 transition-all duration-500">
              <h2 className="text-2xl font-bold text-purple-300 mb-6 flex items-center gap-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Code Comparison: With vs Without preventDefault()
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* With preventDefault */}
                <div className="group bg-gray-900/40 p-5 rounded-xl border border-gray-700 hover:border-green-500/40 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                      <span className="text-green-400 font-bold">✅</span>
                    </div>
                    <h3 className="text-xl font-bold text-green-400">Correct Implementation</h3>
                  </div>
                  <pre className="bg-gray-950 p-4 rounded-lg overflow-x-auto text-sm">
{`const handleSubmit = (event) => {
  event.preventDefault(); // 🎯 CRITICAL LINE
  
  // Validate form data
  const errors = validateForm(formData);
  if (Object.keys(errors).length > 0) {
    setErrors(errors);
    return;
  }
  
  // Show loading state
  setIsLoading(true);
  
  // Make API call
  api.submitForm(formData)
    .then(response => {
      // Handle success
      setSubmissions(prev => [...prev, response]);
      resetForm();
    })
    .catch(error => {
      // Handle error
      setFormError(error.message);
    })
    .finally(() => {
      setIsLoading(false);
    });
};

// In JSX
<form onSubmit={handleSubmit}>
  {/* form fields */}
</form>`}
                  </pre>
                  <div className="mt-3 p-3 bg-green-900/20 rounded-lg">
                    <h4 className="font-bold text-green-300 text-sm">Benefits:</h4>
                    <ul className="text-xs text-gray-300 space-y-1 mt-1">
                      <li>• No page reload - smooth SPA experience</li>
                      <li>• Form validation before submission</li>
                      <li>• Loading states and error handling</li>
                      <li>• State is preserved</li>
                    </ul>
                  </div>
                </div>

                {/* Without preventDefault */}
                <div className="group bg-gray-900/40 p-5 rounded-xl border border-gray-700 hover:border-red-500/40 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                      <span className="text-red-400 font-bold">❌</span>
                    </div>
                    <h3 className="text-xl font-bold text-red-400">Common Mistake</h3>
                  </div>
                  <pre className="bg-gray-950 p-4 rounded-lg overflow-x-auto text-sm">
{`const handleSubmit = (event) => {
  // ❌ MISSING event.preventDefault()
  
  // This validation won't matter...
  const errors = validateForm(formData);
  
  // ...because page will reload immediately!
  // API call won't complete
  // Loading state won't show
  // User sees flash then blank page
  
  api.submitForm(formData) // Won't complete
    .then(response => {
      // Never reaches here
    });
  
  // Page reloads, React unmounts
  // All state is lost
};

// Result: Poor UX, lost data`}
                  </pre>
                  <div className="mt-3 p-3 bg-red-900/20 rounded-lg">
                    <h4 className="font-bold text-red-300 text-sm">Problems:</h4>
                    <ul className="text-xs text-gray-300 space-y-1 mt-1">
                      <li>• Page reloads immediately</li>
                      <li>• Validation is useless</li>
                      <li>• API calls are interrupted</li>
                      <li>• Loading states never show</li>
                      <li>• All React state is lost</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Other Uses of preventDefault */}
        <section className="animate-[slideUp_1.6s_ease-out]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-cyan-500/30 transition-all duration-500">
            <h2 className="text-2xl font-bold text-cyan-300 mb-6 flex items-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              Beyond Forms: Other Uses of preventDefault()
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Anchor Tags */}
              <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700 hover:border-blue-500/40 transition-all duration-300 group">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-blue-400 mb-2">Anchor Tags (Links)</h3>
                <pre className="bg-gray-950 p-3 rounded-lg text-xs overflow-x-auto">
{`<a href="/dashboard" 
   onClick={(e) => {
     e.preventDefault();
     navigate('/dashboard'); // React Router
   }}
>
  Go to Dashboard
</a>`}
                </pre>
                <p className="text-sm text-gray-400 mt-2">
                  Prevents page reload, enables client-side routing
                </p>
              </div>

              {/* Right Click */}
              <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700 hover:border-green-500/40 transition-all duration-300 group">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-green-400 mb-2">Context Menu</h3>
                <pre className="bg-gray-950 p-3 rounded-lg text-xs overflow-x-auto">
{`<div onContextMenu={(e) => {
  e.preventDefault();
  showCustomMenu(e.clientX, e.clientY);
}}>
  Right-click for custom menu
</div>`}
                </pre>
                <p className="text-sm text-gray-400 mt-2">
                  Disables browser menu, shows custom UI
                </p>
              </div>

              {/* Keyboard Events */}
              <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700 hover:border-purple-500/40 transition-all duration-300 group">
                <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-purple-400 mb-2">Keyboard Shortcuts</h3>
                <pre className="bg-gray-950 p-3 rounded-lg text-xs overflow-x-auto">
{`<input onKeyDown={(e) => {
  if (e.key === 'Enter') {
    e.preventDefault(); // Prevent form submit
    handleCustomAction();
  }
}} />`}
                </pre>
                <p className="text-sm text-gray-400 mt-2">
                  Override default key behavior
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className="animate-[slideUp_1.8s_ease-out]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-red-500/30 transition-all duration-500">
            <h2 className="text-2xl font-bold text-red-300 mb-6 flex items-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Common Pitfalls & Debugging Tips
            </h2>

            <div className="space-y-6">
              {/* Common Mistakes */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-300">Common Mistakes</h3>
                  
                  <div className="p-4 bg-red-900/20 border border-red-800/50 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <h4 className="font-bold text-red-400">Forgetting preventDefault()</h4>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Most common mistake: Page reloads unexpectedly, state is lost.
                    </p>
                  </div>

                  <div className="p-4 bg-red-900/20 border border-red-800/50 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <h4 className="font-bold text-red-400">Calling it too late</h4>
                    </div>
                    <pre className="bg-gray-950 p-2 rounded text-xs overflow-x-auto mt-2">
{`// ❌ Too late - page already reloading
const handleSubmit = async (e) => {
  await validateData(); // Page reloads here!
  e.preventDefault();   // Never reaches this
};`}
                    </pre>
                  </div>
                </div>

                {/* Debugging Tips */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-300">Debugging Tips</h3>
                  
                  <div className="p-4 bg-green-900/20 border border-green-800/50 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <h4 className="font-bold text-green-400">First Line Rule</h4>
                    </div>
                    <pre className="bg-gray-950 p-2 rounded text-xs overflow-x-auto mt-2">
{`// ✅ Always first line
const handleSubmit = (e) => {
  e.preventDefault(); // FIRST THING!
  // rest of your logic...
};`}
                    </pre>
                  </div>

                  <div className="p-4 bg-green-900/20 border border-green-800/50 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <h4 className="font-bold text-green-400">Console Log Check</h4>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Add console.log as first line. If it doesn't show, page is reloading.
                    </p>
                  </div>
                </div>
              </div>

              {/* Best Practices */}
              <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
                <h3 className="text-xl font-bold text-yellow-400 mb-3">Best Practices</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold text-green-300 mb-2">✅ Do These</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Always call preventDefault() first in handler</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Validate before making API calls</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Show loading states during submission</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-300 mb-2">❌ Avoid These</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span>Don't forget preventDefault()</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span>Don't submit without validation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span>Don't rely on native form behavior</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teacher's Note */}
        <section className="animate-[slideUp_2s_ease-out]">
          <div className="bg-gradient-to-r from-orange-900/30 to-yellow-900/30 backdrop-blur-sm rounded-2xl p-6 border border-orange-700/50 hover:border-orange-500/70 transition-all duration-500 group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-2xl font-bold text-orange-300">Teacher's Note</h3>
                    <p className="text-orange-400/80">Sukanta Hui • 27 years experience</p>
                  </div>
                  <div className="text-sm text-gray-400">
                    <p>Email: sukantahui@codernaccotax.co.in</p>
                    <p>Mobile: 7003756860</p>
                  </div>
                </div>
                
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <div className="bg-orange-900/20 p-4 rounded-xl border border-orange-800/30">
                    <h4 className="font-bold text-orange-300 mb-2">Classroom Analogy from Shyamnagar School</h4>
                    <p>
                      Imagine you're collecting exam papers from students in Shyamnagar. The <span className="text-yellow-300">native way</span> 
                      is like taking papers and immediately running to the office - you can't check if Swadeep forgot to write his name, 
                      or if Tuhina's paper is incomplete.
                    </p>
                    <p className="mt-2">
                      With <code className="text-cyan-400">preventDefault()</code>, it's like saying "Wait, let me check each paper here first." 
                      You validate (check names), show loading (stack papers neatly), then submit (take to office) - all without leaving the classroom.
                    </p>
                  </div>

                  <div className="bg-yellow-900/20 p-4 rounded-xl border border-yellow-800/30">
                    <h4 className="font-bold text-yellow-300 mb-2">Professional Insight</h4>
                    <p>
                      In 27 years, I've seen this simple mistake cost companies. A Barrackpore startup lost user data because 
                      forms reloaded. A Naihati e-commerce site had cart abandonment when checkout pages reloaded.
                    </p>
                    <p className="mt-2">
                      Remember: <span className="text-yellow-300">preventDefault() is non-negotiable</span> for modern web apps. 
                      It's the bridge between native HTML and React's controlled components.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-gray-900/40 p-4 rounded-xl">
                      <h4 className="font-bold text-green-400 mb-2">Real-world Scenario</h4>
                      <p className="text-sm">
                        When Abhronila submits her project form at Ichapur Coding School:
                      </p>
                      <ol className="text-sm space-y-1 mt-2 ml-4 list-decimal">
                        <li><code>preventDefault()</code> stops page reload</li>
                        <li>Validation checks file types and size</li>
                        <li>Loading spinner shows during upload</li>
                        <li>Success message appears without page refresh</li>
                        <li>She can immediately submit another project</li>
                      </ol>
                    </div>

                    <div className="bg-gray-900/40 p-4 rounded-xl">
                      <h4 className="font-bold text-cyan-400 mb-2">Memory Trick</h4>
                      <p className="text-sm">
                        Think <span className="text-yellow-300">"PFD"</span>:
                      </p>
                      <div className="text-sm space-y-1 mt-2">
                        <div className="flex items-center gap-2">
                          <span className="text-cyan-400 font-bold">P</span>
                          <span>revent (always prevent default)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-cyan-400 font-bold">F</span>
                          <span>irst (do it first in handler)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-cyan-400 font-bold">D</span>
                          <span>on't forget (or page reloads)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mini Checklist */}
        <section className="animate-[slideUp_2.2s_ease-out]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-green-500/30 transition-all duration-500">
            <h2 className="text-2xl font-bold text-green-300 mb-6 flex items-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Mini Checklist
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Always call e.preventDefault() as first line in form submit handler",
                "Understand the difference between native and React form behavior",
                "Know that without preventDefault(), page reloads and state is lost",
                "Use preventDefault() for links to enable client-side routing",
                "Implement form validation before making API calls",
                "Show loading states during asynchronous form submission",
                "Test form submission with and without preventDefault() to see difference",
                "Remember preventDefault() works for other events too (context menu, keydown)",
                "Debug by adding console.log as first line - if it doesn't show, page is reloading"
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-4 bg-gray-900/40 rounded-xl border border-gray-700 hover:border-green-500/50 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-green-500/30 transition-colors">
                    <span className="text-green-400 font-bold text-sm">{index + 1}</span>
                  </div>
                  <span className="text-gray-300 group-hover:text-green-200 transition-colors">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-xl border border-green-700/30">
              <h4 className="font-bold text-emerald-300 mb-2">Hint Section</h4>
              <p className="text-gray-300">
                <span className="text-yellow-300">Think about:</span> What happens when Debangshu from Naihati submits a 
                multi-page application form? Without preventDefault(), he'd lose all progress on page reload. 
                With it, each section can validate independently, show errors inline, and submit seamlessly.
                <br /><br />
                <span className="text-cyan-300">Try this:</span> Remove preventDefault() from the demo form and 
                observe how the page behaves. Then add it back and notice the smooth experience.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Animation keyframes in style tag */}
      <style jsx>{`
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

        @media (prefers-reduced-motion: reduce) {
          .animate-\\[slideUp_0\\.8s_ease-out\\],
          .animate-\\[slideUp_1s_ease-out\\],
          .animate-\\[slideUp_1\\.2s_ease-out\\],
          .animate-\\[slideUp_1\\.4s_ease-out\\],
          .animate-\\[slideUp_1\\.6s_ease-out\\],
          .animate-\\[slideUp_1\\.8s_ease-out\\],
          .animate-\\[slideUp_2s_ease-out\\],
          .animate-\\[slideUp_2\\.2s_ease-out\\] {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Topic17;