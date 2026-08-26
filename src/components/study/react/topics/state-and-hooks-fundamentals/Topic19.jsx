import React, { useState, useRef } from 'react';
import clsx from 'clsx';

const Topic19 = () => {
  // Controlled state for single inputs
  const [searchTerm, setSearchTerm] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [temperature, setTemperature] = useState(25);
  const [darkMode, setDarkMode] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  
  // Form-specific states
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [feedback, setFeedback] = useState('');
  
  // UI states
  const [activeExample, setActiveExample] = useState('search');
  const [submissions, setSubmissions] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  
  // Refs for uncontrolled examples
  const uncontrolledInputRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // Examples data
  const examples = [
    { id: 'search', label: 'Search Input', icon: '🔍', color: 'blue' },
    { id: 'email', label: 'Email Input', icon: '✉️', color: 'green' },
    { id: 'password', label: 'Password Input', icon: '🔒', color: 'red' },
    { id: 'message', label: 'Message Input', icon: '💬', color: 'purple' },
    { id: 'temperature', label: 'Range Input', icon: '🌡️', color: 'orange' },
    { id: 'toggle', label: 'Toggle Input', icon: '🔘', color: 'cyan' },
    { id: 'file', label: 'File Input', icon: '📁', color: 'yellow' },
    { id: 'login', label: 'Login Form', icon: '👤', color: 'pink' },
    { id: 'feedback', label: 'Feedback Form', icon: '📝', color: 'teal' }
  ];

  // Handle search input
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Simulate search API call
    if (value.length > 2) {
      console.log(`Searching for: ${value}`);
    }
  };

  // Handle email with validation
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    // Real-time validation
    if (value && !/\S+@\S+\.\S+/.test(value)) {
      setValidationErrors(prev => ({ ...prev, email: 'Please enter a valid email' }));
    } else {
      setValidationErrors(prev => ({ ...prev, email: '' }));
    }
  };

  // Handle password with validation
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    
    // Real-time validation
    if (value && value.length < 6) {
      setValidationErrors(prev => ({ ...prev, password: 'Password must be at least 6 characters' }));
    } else {
      setValidationErrors(prev => ({ ...prev, password: '' }));
    }
  };

  // Handle message with character counter
  const handleMessageChange = (e) => {
    const value = e.target.value;
    setMessage(value);
    
    // Character limit validation
    if (value.length > 200) {
      setValidationErrors(prev => ({ ...prev, message: 'Maximum 200 characters allowed' }));
    } else {
      setValidationErrors(prev => ({ ...prev, message: '' }));
    }
  };

  // Handle temperature range
  const handleTemperatureChange = (e) => {
    setTemperature(parseInt(e.target.value));
  };

  // Handle toggle
  const handleToggleChange = (e) => {
    setDarkMode(e.target.checked);
  };

  // Handle file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile({
        name: file.name,
        size: (file.size / 1024).toFixed(2), // KB
        type: file.type
      });
    }
  };

  // Handle login form (two inputs but treated as single form)
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle feedback form
  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  // Handle form submissions
  const handleSubmit = (e, formType) => {
    e.preventDefault();
    
    let submissionData = {};
    let isValid = true;
    
    switch (formType) {
      case 'email':
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
          setValidationErrors(prev => ({ ...prev, email: 'Please enter a valid email' }));
          isValid = false;
        }
        submissionData = { type: 'Email Subscription', value: email };
        break;
        
      case 'password':
        if (!password || password.length < 6) {
          setValidationErrors(prev => ({ ...prev, password: 'Password must be at least 6 characters' }));
          isValid = false;
        }
        submissionData = { type: 'Password Change', value: '••••••' };
        break;
        
      case 'message':
        if (!message.trim()) {
          setValidationErrors(prev => ({ ...prev, message: 'Message cannot be empty' }));
          isValid = false;
        }
        submissionData = { type: 'Message', value: message };
        break;
        
      case 'login':
        if (!loginForm.username || !loginForm.password) {
          alert('Please fill in both fields');
          isValid = false;
        }
        submissionData = { type: 'Login Attempt', value: `User: ${loginForm.username}` };
        break;
        
      case 'feedback':
        if (!feedback.trim()) {
          alert('Please enter your feedback');
          isValid = false;
        }
        submissionData = { type: 'Feedback', value: feedback.substring(0, 50) + '...' };
        break;
        
      default:
        submissionData = { type: 'Search', value: searchTerm };
    }
    
    if (isValid) {
      setSubmissions(prev => [
        {
          id: Date.now(),
          ...submissionData,
          timestamp: new Date().toLocaleTimeString(),
          example: formType
        },
        ...prev.slice(0, 4)
      ]);
      
      // Reset form if needed
      if (formType === 'email') setEmail('');
      if (formType === 'message') setMessage('');
      if (formType === 'feedback') setFeedback('');
      if (formType === 'login') setLoginForm({ username: '', password: '' });
    }
  };

  // Handle uncontrolled input
  const handleUncontrolledSubmit = (e) => {
    e.preventDefault();
    const value = uncontrolledInputRef.current.value;
    
    if (value) {
      setSubmissions(prev => [
        {
          id: Date.now(),
          type: 'Uncontrolled Input',
          value: value,
          timestamp: new Date().toLocaleTimeString(),
          example: 'uncontrolled'
        },
        ...prev.slice(0, 4)
      ]);
      
      // Clear the input
      uncontrolledInputRef.current.value = '';
    }
  };

  // Clear all submissions
  const clearSubmissions = () => {
    setSubmissions([]);
  };

  // Get active example color
  const getActiveColor = () => {
    const example = examples.find(ex => ex.id === activeExample);
    return example?.color || 'blue';
  };

  // Calculate message characters
  const messageCharsLeft = 200 - message.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-gray-200 p-4 md:p-6 transition-colors duration-300">
      {/* Header Section */}
      <header className="max-w-6xl mx-auto mb-10">
        <div className="animate-[slideUp_0.8s_ease-out]">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-3">
            Topic 19: Handling Single Input Forms
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Master the art of managing individual form inputs in React with controlled components
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto space-y-10">
        {/* Concept Explanation */}
        <section className="animate-[slideUp_1s_ease-out]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/10">
            <h2 className="text-2xl font-bold text-blue-300 mb-4 flex items-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Single Input Forms: The Foundation
            </h2>
            
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Why Single Inputs Matter */}
                <div className="bg-blue-900/20 p-5 rounded-xl border border-blue-800/50">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <span className="text-blue-400 font-bold">🎯</span>
                    </div>
                    <h3 className="text-xl font-bold text-blue-400">Why Master Single Inputs?</h3>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Building block for complex forms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Perfect for simple interactions (search, subscribe)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Easier debugging and testing</span>
                    </li>
                  </ul>
                </div>

                {/* Basic Pattern */}
                <div className="bg-emerald-900/20 p-5 rounded-xl border border-emerald-800/50">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                      <span className="text-emerald-400 font-bold">📝</span>
                    </div>
                    <h3 className="text-xl font-bold text-emerald-400">Basic Pattern</h3>
                  </div>
                  <pre className="bg-gray-950 p-3 rounded-lg text-xs overflow-x-auto">
{`// 1. Create state
const [value, setValue] = useState('');

// 2. Controlled input
<input
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>

// 3. Handle submit
const handleSubmit = (e) => {
  e.preventDefault();
  console.log('Submitted:', value);
};`}
                  </pre>
                </div>
              </div>

              <div className="bg-gray-900/50 p-4 rounded-lg border-l-4 border-cyan-500">
                <h3 className="font-bold text-lg text-cyan-300 mb-2">Real-world Single Input Scenarios</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                  {[
                    { icon: '🔍', text: 'Search bars' },
                    { icon: '✉️', text: 'Newsletter signup' },
                    { icon: '💬', text: 'Quick feedback' },
                    { icon: '🔑', text: 'Password reset' },
                    { icon: '🌡️', text: 'Temperature control' },
                    { icon: '🔘', text: 'Settings toggle' },
                    { icon: '📁', text: 'File upload' },
                    { icon: '🔔', text: 'Notification input' }
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-2 p-3 bg-gray-800/40 rounded-lg border border-gray-700 hover:border-cyan-500/30 transition-all duration-300"
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm text-gray-300">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Examples Navigation */}
        <section className="animate-[slideUp_1.1s_ease-out]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-700">
            <h3 className="text-lg font-bold text-gray-300 mb-4">Select Input Type:</h3>
            <div className="flex flex-wrap gap-2">
              {examples.map((example) => (
                <button
                  key={example.id}
                  onClick={() => setActiveExample(example.id)}
                  className={clsx(
                    "px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2",
                    activeExample === example.id
                      ? `bg-${example.color}-900/50 text-${example.color}-300 border border-${example.color}-700`
                      : "bg-gray-900 text-gray-400 hover:bg-gray-800 border border-gray-700"
                  )}
                >
                  <span>{example.icon}</span>
                  <span>{example.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Main Interactive Demo */}
        <section className="animate-[slideUp_1.2s_ease-out]">
          <div className={clsx(
            "bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-500",
            `hover:border-${getActiveColor()}-500/30`
          )}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Input Display Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Example Title */}
                <div className="flex items-center gap-3 mb-2">
                  {examples.find(ex => ex.id === activeExample)?.icon && (
                    <span className="text-2xl">{examples.find(ex => ex.id === activeExample).icon}</span>
                  )}
                  <h2 className="text-2xl font-bold text-gray-300">
                    {examples.find(ex => ex.id === activeExample)?.label} Example
                  </h2>
                </div>

                {/* Search Input Example */}
                {activeExample === 'search' && (
                  <div className="space-y-6">
                    <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
                      <h3 className="text-xl font-bold text-blue-400 mb-4">Search Functionality</h3>
                      
                      <form onSubmit={(e) => handleSubmit(e, 'search')} className="space-y-4">
                        <div>
                          <label className="block text-gray-400 mb-2">Search Students</label>
                          <div className="relative">
                            <input
                              type="text"
                              value={searchTerm}
                              onChange={handleSearch}
                              className="w-full px-4 py-3 pl-10 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
                              placeholder="Search by name (e.g., Swadeep, Tuhina)"
                            />
                            <svg className="w-5 h-5 text-gray-500 absolute left-3 top-3.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="mt-2 text-sm text-gray-500">
                            Real-time search as you type. Try searching for student names from Barrackpore.
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <button
                            type="submit"
                            className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-lg hover:bg-blue-800/50 border border-blue-800/50 transition-all duration-300"
                          >
                            Search
                          </button>
                          <button
                            type="button"
                            onClick={() => setSearchTerm('')}
                            className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 border border-gray-700 transition-all duration-300"
                          >
                            Clear
                          </button>
                        </div>
                      </form>

                      {/* Search Results Preview */}
                      {searchTerm && (
                        <div className="mt-6 p-4 bg-blue-900/10 rounded-lg border border-blue-800/30">
                          <h4 className="font-bold text-blue-400 mb-2">Search Results Preview</h4>
                          <div className="space-y-2">
                            {searchTerm.length < 3 ? (
                              <p className="text-gray-400 text-sm">Type at least 3 characters to search...</p>
                            ) : (
                              <div className="text-sm text-gray-300">
                                <p>Searching for: <span className="text-blue-300 font-medium">"{searchTerm}"</span></p>
                                <p className="mt-2">Found potential matches in student database:</p>
                                <ul className="mt-1 ml-4 space-y-1">
                                  {['Swadeep Das', 'Tuhina Roy', 'Abhronila Sen', 'Debangshu Dey']
                                    .filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()))
                                    .map(name => (
                                      <li key={name} className="flex items-center gap-2">
                                        <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>{name}</span>
                                      </li>
                                    ))
                                  }
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Email Input Example */}
                {activeExample === 'email' && (
                  <div className="space-y-6">
                    <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
                      <h3 className="text-xl font-bold text-green-400 mb-4">Email Subscription</h3>
                      
                      <form onSubmit={(e) => handleSubmit(e, 'email')} className="space-y-4">
                        <div>
                          <label className="block text-gray-400 mb-2">Email Address *</label>
                          <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            className={clsx(
                              "w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 transition-all",
                              validationErrors.email 
                                ? "border-red-500 focus:ring-red-500/50" 
                                : "border-gray-700 focus:border-green-500 focus:ring-green-500/50"
                            )}
                            placeholder="student@example.com"
                          />
                          {validationErrors.email && (
                            <p className="mt-1 text-red-400 text-sm">{validationErrors.email}</p>
                          )}
                          {email && !validationErrors.email && (
                            <p className="mt-1 text-green-400 text-sm">✓ Valid email format</p>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>Subscribe to Barrackpore Coding School newsletter</span>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3 bg-green-900/30 text-green-300 rounded-lg font-medium hover:bg-green-800/50 hover:text-green-200 border border-green-800/50 hover:border-green-600 transition-all duration-300"
                        >
                          Subscribe
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                {/* Password Input Example */}
                {activeExample === 'password' && (
                  <div className="space-y-6">
                    <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
                      <h3 className="text-xl font-bold text-red-400 mb-4">Password Security</h3>
                      
                      <form onSubmit={(e) => handleSubmit(e, 'password')} className="space-y-4">
                        <div>
                          <label className="block text-gray-400 mb-2">New Password *</label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              value={password}
                              onChange={handlePasswordChange}
                              className={clsx(
                                "w-full px-4 py-3 pr-10 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 transition-all",
                                validationErrors.password 
                                  ? "border-red-500 focus:ring-red-500/50" 
                                  : "border-gray-700 focus:border-red-500 focus:ring-red-500/50"
                              )}
                              placeholder="Enter new password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-3 text-gray-500 hover:text-gray-300"
                            >
                              {showPassword ? '🙈' : '👁️'}
                            </button>
                          </div>
                          {validationErrors.password && (
                            <p className="mt-1 text-red-400 text-sm">{validationErrors.password}</p>
                          )}
                          {password && !validationErrors.password && (
                            <p className="mt-1 text-green-400 text-sm">✓ Strong password</p>
                          )}
                          
                          {/* Password strength indicator */}
                          {password && (
                            <div className="mt-3">
                              <div className="flex justify-between text-xs text-gray-400 mb-1">
                                <span>Password strength:</span>
                                <span>
                                  {password.length < 3 ? 'Weak' : 
                                   password.length < 6 ? 'Fair' : 
                                   'Strong'}
                                </span>
                              </div>
                              <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                                <div 
                                  className={clsx(
                                    "h-full transition-all duration-300",
                                    password.length < 3 ? "bg-red-500 w-1/4" :
                                    password.length < 6 ? "bg-yellow-500 w-2/4" :
                                    "bg-green-500 w-full"
                                  )}
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3 bg-red-900/30 text-red-300 rounded-lg font-medium hover:bg-red-800/50 hover:text-red-200 border border-red-800/50 hover:border-red-600 transition-all duration-300"
                        >
                          Update Password
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                {/* Message Input Example */}
                {activeExample === 'message' && (
                  <div className="space-y-6">
                    <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
                      <h3 className="text-xl font-bold text-purple-400 mb-4">Quick Message</h3>
                      
                      <form onSubmit={(e) => handleSubmit(e, 'message')} className="space-y-4">
                        <div>
                          <label className="block text-gray-400 mb-2">Your Message *</label>
                          <textarea
                            value={message}
                            onChange={handleMessageChange}
                            rows="4"
                            className={clsx(
                              "w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 transition-all",
                              validationErrors.message 
                                ? "border-red-500 focus:ring-red-500/50" 
                                : "border-gray-700 focus:border-purple-500 focus:ring-purple-500/50"
                            )}
                            placeholder="Type your message here..."
                          />
                          <div className="flex justify-between mt-2">
                            <div>
                              {validationErrors.message && (
                                <p className="text-red-400 text-sm">{validationErrors.message}</p>
                              )}
                            </div>
                            <div className={clsx(
                              "text-sm",
                              messageCharsLeft < 20 ? "text-red-400" : "text-gray-500"
                            )}>
                              {messageCharsLeft} characters left
                            </div>
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={!message.trim() || message.length > 200}
                          className={clsx(
                            "w-full py-3 rounded-lg font-medium border transition-all duration-300",
                            message.trim() && message.length <= 200
                              ? "bg-purple-900/30 text-purple-300 hover:bg-purple-800/50 hover:text-purple-200 border-purple-800/50 hover:border-purple-600"
                              : "bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed"
                          )}
                        >
                          Send Message
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                {/* Temperature Range Example */}
                {activeExample === 'temperature' && (
                  <div className="space-y-6">
                    <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
                      <h3 className="text-xl font-bold text-orange-400 mb-4">Temperature Control</h3>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-gray-400 mb-2">
                            Classroom Temperature: <span className="text-orange-300">{temperature}°C</span>
                          </label>
                          <input
                            type="range"
                            min="16"
                            max="32"
                            value={temperature}
                            onChange={handleTemperatureChange}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>16°C (Cool)</span>
                            <span>24°C (Ideal)</span>
                            <span>32°C (Warm)</span>
                          </div>
                        </div>

                        {/* Temperature Status */}
                        <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700">
                          <h4 className="font-bold text-gray-300 mb-2">Current Setting</h4>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={clsx(
                                "w-10 h-10 rounded-full flex items-center justify-center",
                                temperature < 20 ? "bg-blue-500/20" :
                                temperature < 26 ? "bg-green-500/20" :
                                "bg-red-500/20"
                              )}>
                                {temperature < 20 ? '❄️' : temperature < 26 ? '😊' : '🔥'}
                              </div>
                              <div>
                                <p className="text-gray-300">
                                  {temperature < 20 ? 'Cool - Sweater recommended' :
                                   temperature < 26 ? 'Comfortable - Ideal for learning' :
                                   'Warm - Fans might help'}
                                </p>
                                <p className="text-sm text-gray-500">Barrackpore Classroom</p>
                              </div>
                            </div>
                            <div className="text-2xl font-bold text-orange-400">
                              {temperature}°C
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Toggle Input Example */}
                {activeExample === 'toggle' && (
                  <div className="space-y-6">
                    <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
                      <h3 className="text-xl font-bold text-cyan-400 mb-4">Theme Toggle</h3>
                      
                      <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-gray-800/40 rounded-lg border border-gray-700">
                          <div className="flex items-center gap-3">
                            <div className={clsx(
                              "w-10 h-10 rounded-full flex items-center justify-center",
                              darkMode ? "bg-gray-800" : "bg-yellow-500/20"
                            )}>
                              {darkMode ? '🌙' : '☀️'}
                            </div>
                            <div>
                              <p className="text-gray-300">Dark Mode</p>
                              <p className="text-sm text-gray-500">
                                {darkMode ? 'Easier on eyes during night classes' : 'Better for daytime reading'}
                              </p>
                            </div>
                          </div>
                          
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={darkMode}
                              onChange={handleToggleChange}
                              className="sr-only peer"
                            />
                            <div className="w-14 h-7 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-cyan-600"></div>
                          </label>
                        </div>

                        {/* Preview Area */}
                        <div className={clsx(
                          "p-6 rounded-lg border transition-all duration-500",
                          darkMode 
                            ? "bg-gray-900 border-gray-700" 
                            : "bg-yellow-50 border-yellow-200"
                        )}>
                          <h4 className={clsx(
                            "font-bold mb-3",
                            darkMode ? "text-gray-300" : "text-gray-800"
                          )}>Preview</h4>
                          <div className={clsx(
                            "p-4 rounded-lg",
                            darkMode 
                              ? "bg-gray-800 text-gray-300" 
                              : "bg-white text-gray-800"
                          )}>
                            <p className="mb-2">
                              {darkMode 
                                ? "This is how text appears in dark mode. Perfect for late-night coding sessions in Ichapur."
                                : "This is light mode text. Great for daytime study sessions in Shyamnagar."
                              }
                            </p>
                            <div className="text-sm opacity-75">
                              Current theme: <span className="font-bold">{darkMode ? 'Dark' : 'Light'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* File Input Example */}
                {activeExample === 'file' && (
                  <div className="space-y-6">
                    <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
                      <h3 className="text-xl font-bold text-yellow-400 mb-4">File Upload</h3>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-gray-400 mb-2">Upload Assignment</label>
                          <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-yellow-500/50 transition-colors duration-300">
                            <input
                              type="file"
                              onChange={handleFileChange}
                              ref={fileInputRef}
                              className="hidden"
                              id="fileInput"
                            />
                            <label htmlFor="fileInput" className="cursor-pointer">
                              <div className="flex flex-col items-center gap-3">
                                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center">
                                  <span className="text-2xl">📁</span>
                                </div>
                                <div>
                                  <p className="text-gray-300 font-medium">Click to upload file</p>
                                  <p className="text-sm text-gray-500 mt-1">PDF, DOC, or image files (Max 5MB)</p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => fileInputRef.current?.click()}
                                  className="px-4 py-2 bg-yellow-900/30 text-yellow-300 rounded-lg hover:bg-yellow-800/50 border border-yellow-800/50 transition-all duration-300"
                                >
                                  Browse Files
                                </button>
                              </div>
                            </label>
                          </div>
                        </div>

                        {/* File Preview */}
                        {selectedFile && (
                          <div className="p-4 bg-gray-800/40 rounded-lg border border-gray-700 animate-[slideUp_0.5s_ease-out]">
                            <h4 className="font-bold text-yellow-400 mb-2">Selected File</h4>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                                  <span className="text-lg">📄</span>
                                </div>
                                <div>
                                  <p className="text-gray-300">{selectedFile.name}</p>
                                  <p className="text-sm text-gray-500">
                                    {selectedFile.size} KB • {selectedFile.type}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => setSelectedFile(null)}
                                className="px-3 py-1 bg-red-900/30 text-red-300 rounded-lg hover:bg-red-800/50 border border-red-800/50 text-sm"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Login Form Example */}
                {activeExample === 'login' && (
                  <div className="space-y-6">
                    <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
                      <h3 className="text-xl font-bold text-pink-400 mb-4">Login Form</h3>
                      
                      <form onSubmit={(e) => handleSubmit(e, 'login')} className="space-y-4">
                        <div>
                          <label className="block text-gray-400 mb-2">Username *</label>
                          <input
                            type="text"
                            name="username"
                            value={loginForm.username}
                            onChange={handleLoginChange}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all"
                            placeholder="Enter your username"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-400 mb-2">Password *</label>
                          <input
                            type="password"
                            name="password"
                            value={loginForm.password}
                            onChange={handleLoginChange}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all"
                            placeholder="Enter your password"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="remember"
                            className="w-4 h-4 text-pink-500 bg-gray-800 border-gray-700 rounded focus:ring-pink-500 focus:ring-2"
                          />
                          <label htmlFor="remember" className="text-sm text-gray-400">
                            Remember me on this device
                          </label>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3 bg-pink-900/30 text-pink-300 rounded-lg font-medium hover:bg-pink-800/50 hover:text-pink-200 border border-pink-800/50 hover:border-pink-600 transition-all duration-300"
                        >
                          Sign In
                        </button>

                        <div className="text-center text-sm text-gray-500">
                          Demo login for Barrackpore Student Portal
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {/* Feedback Form Example */}
                {activeExample === 'feedback' && (
                  <div className="space-y-6">
                    <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
                      <h3 className="text-xl font-bold text-teal-400 mb-4">Course Feedback</h3>
                      
                      <form onSubmit={(e) => handleSubmit(e, 'feedback')} className="space-y-4">
                        <div>
                          <label className="block text-gray-400 mb-2">
                            How can we improve our React classes in Naihati?
                          </label>
                          <textarea
                            value={feedback}
                            onChange={handleFeedbackChange}
                            rows="5"
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50 transition-all"
                            placeholder="Your feedback helps us improve..."
                          />
                        </div>

                        <div className="text-sm text-gray-500">
                          <p>💡 Suggestions from other students:</p>
                          <ul className="mt-1 ml-4 space-y-1">
                            <li>"More hands-on examples with real projects" - Swadeep</li>
                            <li>"Weekend practice sessions would help" - Tuhina</li>
                            <li>"Recorded sessions for review" - Abhronila</li>
                          </ul>
                        </div>

                        <button
                          type="submit"
                          disabled={!feedback.trim()}
                          className={clsx(
                            "w-full py-3 rounded-lg font-medium border transition-all duration-300",
                            feedback.trim()
                              ? "bg-teal-900/30 text-teal-300 hover:bg-teal-800/50 hover:text-teal-200 border-teal-800/50 hover:border-teal-600"
                              : "bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed"
                          )}
                        >
                          Submit Feedback
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar - State & Submissions */}
              <div className="space-y-6">
                {/* Controlled vs Uncontrolled */}
                <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
                  <h3 className="text-xl font-bold text-gray-300 mb-4">Comparison</h3>
                  
                  <div className="space-y-4">
                    {/* Controlled Example */}
                    <div>
                      <h4 className="font-bold text-emerald-400 mb-2">Controlled Input</h4>
                      <div className="p-3 bg-gray-800/40 rounded-lg border border-emerald-800/30">
                        <p className="text-sm text-gray-300">Value stored in React state</p>
                        <p className="text-xs text-gray-500 mt-1">Real-time updates & validation</p>
                      </div>
                    </div>

                    {/* Uncontrolled Example */}
                    <div>
                      <h4 className="font-bold text-red-400 mb-2">Uncontrolled Input</h4>
                      <form onSubmit={handleUncontrolledSubmit} className="space-y-2">
                        <input
                          ref={uncontrolledInputRef}
                          type="text"
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 text-sm"
                          placeholder="Try uncontrolled input..."
                        />
                        <button
                          type="submit"
                          className="w-full py-2 bg-red-900/30 text-red-300 rounded-lg hover:bg-red-800/50 border border-red-800/50 text-sm"
                        >
                          Submit (Uncontrolled)
                        </button>
                      </form>
                      <p className="text-xs text-gray-500 mt-2">Value accessed via ref on submit</p>
                    </div>
                  </div>
                </div>

                {/* Current State Display */}
                <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
                  <h3 className="text-xl font-bold text-gray-300 mb-4">Current State</h3>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-800/40 rounded-lg">
                      <h4 className="font-bold text-cyan-400 text-sm mb-2">Active Input Value</h4>
                      <div className="text-sm">
                        {activeExample === 'search' && (
                          <div>
                            <code className="text-cyan-300">searchTerm:</code> 
                            <span className="text-gray-300 ml-2">{searchTerm || '(empty)'}</span>
                          </div>
                        )}
                        {activeExample === 'email' && (
                          <div>
                            <code className="text-cyan-300">email:</code> 
                            <span className="text-gray-300 ml-2">{email || '(empty)'}</span>
                          </div>
                        )}
                        {activeExample === 'password' && (
                          <div>
                            <code className="text-cyan-300">password:</code> 
                            <span className="text-gray-300 ml-2">
                              {password ? '•'.repeat(password.length) : '(empty)'}
                            </span>
                          </div>
                        )}
                        {activeExample === 'message' && (
                          <div>
                            <code className="text-cyan-300">message:</code> 
                            <span className="text-gray-300 ml-2">
                              {message.substring(0, 30) || '(empty)'}
                              {message.length > 30 ? '...' : ''}
                            </span>
                          </div>
                        )}
                        {activeExample === 'temperature' && (
                          <div>
                            <code className="text-cyan-300">temperature:</code> 
                            <span className="text-gray-300 ml-2">{temperature}°C</span>
                          </div>
                        )}
                        {activeExample === 'toggle' && (
                          <div>
                            <code className="text-cyan-300">darkMode:</code> 
                            <span className="text-gray-300 ml-2">{darkMode.toString()}</span>
                          </div>
                        )}
                        {activeExample === 'file' && (
                          <div>
                            <code className="text-cyan-300">selectedFile:</code> 
                            <span className="text-gray-300 ml-2">
                              {selectedFile ? selectedFile.name : 'null'}
                            </span>
                          </div>
                        )}
                        {activeExample === 'login' && (
                          <div>
                            <code className="text-cyan-300">loginForm:</code> 
                            <pre className="text-xs text-gray-300 mt-1">
                              {JSON.stringify(loginForm, null, 2)}
                            </pre>
                          </div>
                        )}
                        {activeExample === 'feedback' && (
                          <div>
                            <code className="text-cyan-300">feedback:</code> 
                            <span className="text-gray-300 ml-2">
                              {feedback.substring(0, 30) || '(empty)'}
                              {feedback.length > 30 ? '...' : ''}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Submissions */}
                <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-300">Recent Submissions</h3>
                    {submissions.length > 0 && (
                      <button
                        onClick={clearSubmissions}
                        className="px-3 py-1 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700 text-sm border border-gray-700"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {submissions.length > 0 ? (
                      submissions.map((submission) => (
                        <div 
                          key={submission.id}
                          className="p-3 bg-gray-800/40 rounded-lg border border-gray-700 hover:bg-gray-800/70 transition-all duration-300"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-blue-300">{submission.type}</p>
                              <p className="text-sm text-gray-300 mt-1">{submission.value}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="px-2 py-0.5 bg-gray-900 text-gray-400 text-xs rounded">
                                  {submission.example}
                                </span>
                              </div>
                            </div>
                            <span className="text-xs text-gray-500">{submission.timestamp}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        <svg className="w-8 h-8 mx-auto mb-2 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm">No submissions yet</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="animate-[slideUp_1.4s_ease-out]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-green-500/30 transition-all duration-500">
            <h2 className="text-2xl font-bold text-green-300 mb-6 flex items-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Best Practices for Single Input Forms
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Practice 1 */}
              <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700 hover:border-blue-500/40 transition-all duration-300 group">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-blue-400 font-bold">1</span>
                </div>
                <h3 className="text-lg font-bold text-blue-400 mb-2">Real-time Validation</h3>
                <p className="text-sm text-gray-300">
                  Validate as user types. Show helpful error messages immediately.
                </p>
                <pre className="bg-gray-950 p-2 rounded text-xs overflow-x-auto mt-3">
{`useEffect(() => {
  if (email && !isValidEmail(email)) {
    setError('Invalid email');
  }
}, [email]);`}
                </pre>
              </div>

              {/* Practice 2 */}
              <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700 hover:border-green-500/40 transition-all duration-300 group">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-green-400 font-bold">2</span>
                </div>
                <h3 className="text-lg font-bold text-green-400 mb-2">Provide Visual Feedback</h3>
                <p className="text-sm text-gray-300">
                  Show character counters, strength meters, and success indicators.
                </p>
                <div className="mt-3 text-xs text-gray-400 flex items-center gap-2">
                  <span className="px-2 py-1 bg-green-900/30 text-green-300 rounded">✓ Valid</span>
                  <span className="px-2 py-1 bg-yellow-900/30 text-yellow-300 rounded">⚠️ Warning</span>
                  <span className="px-2 py-1 bg-red-900/30 text-red-300 rounded">✗ Error</span>
                </div>
              </div>

              {/* Practice 3 */}
              <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700 hover:border-purple-500/40 transition-all duration-300 group">
                <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-purple-400 font-bold">3</span>
                </div>
                <h3 className="text-lg font-bold text-purple-400 mb-2">Clear Default Values</h3>
                <p className="text-sm text-gray-300">
                  Set meaningful defaults. For search, consider recent searches or popular terms.
                </p>
                <pre className="bg-gray-950 p-2 rounded text-xs overflow-x-auto mt-3">
{`// Good defaults
const [search, setSearch] = useState('');
const [temp, setTemp] = useState(22); // Room temp
const [darkMode, setDarkMode] = useState(true);`}
                </pre>
              </div>

              {/* Practice 4 */}
              <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700 hover:border-yellow-500/40 transition-all duration-300 group">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-yellow-400 font-bold">4</span>
                </div>
                <h3 className="text-lg font-bold text-yellow-400 mb-2">Handle Edge Cases</h3>
                <p className="text-sm text-gray-300">
                  Consider empty submissions, very long inputs, and special characters.
                </p>
                <div className="mt-3 text-xs text-gray-400">
                  <p>• Trim whitespace</p>
                  <p>• Limit maximum length</p>
                  <p>• Sanitize input</p>
                </div>
              </div>

              {/* Practice 5 */}
              <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700 hover:border-red-500/40 transition-all duration-300 group">
                <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-red-400 font-bold">5</span>
                </div>
                <h3 className="text-lg font-bold text-red-400 mb-2">Accessibility Matters</h3>
                <p className="text-sm text-gray-300">
                  Always include labels, proper ARIA attributes, and keyboard navigation.
                </p>
                <pre className="bg-gray-950 p-2 rounded text-xs overflow-x-auto mt-3">
{`<label htmlFor="search">Search</label>
<input
  id="search"
  aria-label="Search students"
  aria-describedby="search-help"
/>`}
                </pre>
              </div>

              {/* Practice 6 */}
              <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700 hover:border-cyan-500/40 transition-all duration-300 group">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-cyan-400 font-bold">6</span>
                </div>
                <h3 className="text-lg font-bold text-cyan-400 mb-2">Performance Considerations</h3>
                <p className="text-sm text-gray-300">
                  Debounce rapid updates (like search) to avoid unnecessary re-renders.
                </p>
                <pre className="bg-gray-950 p-2 rounded text-xs overflow-x-auto mt-3">
{`// Debounce search
useEffect(() => {
  const timer = setTimeout(() => {
    searchAPI(term);
  }, 300);
  return () => clearTimeout(timer);
}, [term]);`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="animate-[slideUp_1.6s_ease-out]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-red-500/30 transition-all duration-500">
            <h2 className="text-2xl font-bold text-red-300 mb-6 flex items-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Common Mistakes & Solutions
            </h2>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Mistake 1 */}
                <div className="p-4 bg-red-900/20 border border-red-800/50 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <h4 className="font-bold text-red-400">Missing Validation</h4>
                  </div>
                  <pre className="bg-gray-950 p-3 rounded-lg text-xs overflow-x-auto">
{`// ❌ WRONG - No validation
const handleSubmit = () => {
  saveEmail(email); // What if email is invalid?
};

// ✅ CORRECT - Validate first
const handleSubmit = () => {
  if (!isValidEmail(email)) {
    setError('Invalid email');
    return;
  }
  saveEmail(email);
};`}
                  </pre>
                </div>

                {/* Mistake 2 */}
                <div className="p-4 bg-red-900/20 border border-red-800/50 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <h4 className="font-bold text-red-400">Forgetting preventDefault()</h4>
                  </div>
                  <pre className="bg-gray-950 p-3 rounded-lg text-xs overflow-x-auto">
{`// ❌ WRONG - Page reloads
const handleSubmit = () => {
  console.log('Submitted');
  // Page reloads, state lost
};

// ✅ CORRECT - Prevent default
const handleSubmit = (e) => {
  e.preventDefault();
  console.log('Submitted');
  // State preserved, SPA behavior
};`}
                  </pre>
                </div>
              </div>

              {/* Mistake 3 */}
              <div className="p-4 bg-red-900/20 border border-red-800/50 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <h4 className="font-bold text-red-400">Poor User Feedback</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-300 mb-2">❌ Bad UX:</p>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• No loading indicators</li>
                      <li>• No success/error messages</li>
                      <li>• Button doesn't disable during submission</li>
                      <li>• User doesn't know what happened</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 mb-2">✅ Good UX:</p>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Show loading spinner</li>
                      <li>• Display success/error messages</li>
                      <li>• Disable button during submission</li>
                      <li>• Clear feedback for every action</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teacher's Note */}
        <section className="animate-[slideUp_1.8s_ease-out]">
          <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-2xl p-6 border border-blue-700/50 hover:border-blue-500/70 transition-all duration-500 group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-2xl font-bold text-blue-300">Teacher's Note</h3>
                    <p className="text-blue-400/80">Sukanta Hui • 27 years experience</p>
                  </div>
                  <div className="text-sm text-gray-400">
                    <p>Email: sukantahui@codernaccotax.co.in</p>
                    <p>Mobile: 7003756860</p>
                  </div>
                </div>
                
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <div className="bg-blue-900/20 p-4 rounded-xl border border-blue-800/30">
                    <h4 className="font-bold text-blue-300 mb-2">Classroom Analogy from Barrackpore</h4>
                    <p>
                      Think of single input forms like <span className="text-yellow-300">raising your hand</span> in class. 
                      When Swadeep raises his hand (user input), I immediately see it (React state update). 
                      I can validate (is this a question or answer?) and respond appropriately.
                    </p>
                    <p className="mt-2">
                      Each input is a conversation with your user. The search bar asks "What are you looking for?" 
                      The email field asks "Where can we reach you?" Keep the conversation clear and helpful.
                    </p>
                  </div>

                  <div className="bg-cyan-900/20 p-4 rounded-xl border border-cyan-800/30">
                    <h4 className="font-bold text-cyan-300 mb-2">Professional Insight</h4>
                    <p>
                      In my experience, single input forms are where beginners make the most mistakes. 
                      A Shyamnagar student once built a search that made API calls on every keystroke - 
                      crashed their server!
                    </p>
                    <p className="mt-2">
                      Remember: <span className="text-yellow-300">"Validate early, validate often"</span>. 
                      Don't wait for form submission to catch errors. Guide users as they type, 
                      like how I guide Tuhina through complex problems step by step.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-gray-900/40 p-4 rounded-xl">
                      <h4 className="font-bold text-green-400 mb-2">Real-world Debugging</h4>
                      <p className="text-sm">
                        When Abhronila's form wasn't working:
                      </p>
                      <ol className="text-sm space-y-1 mt-2 ml-4 list-decimal">
                        <li>Check if <code>preventDefault()</code> is called</li>
                        <li>Console.log the state value</li>
                        <li>Verify the handler is connected</li>
                        <li>Check for validation blocking submission</li>
                        <li>Test with different input values</li>
                      </ol>
                    </div>

                    <div className="bg-gray-900/40 p-4 rounded-xl">
                      <h4 className="font-bold text-purple-400 mb-2">Memory Trick</h4>
                      <p className="text-sm">
                        Remember <span className="text-yellow-300">"S-V-F"</span>:
                      </p>
                      <div className="text-sm space-y-1 mt-2">
                        <div className="flex items-center gap-2">
                          <span className="text-purple-400 font-bold">S</span>
                          <span>tate (store value in state)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-purple-400 font-bold">V</span>
                          <span>alidation (validate as user types)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-purple-400 font-bold">F</span>
                          <span>eedback (give clear feedback)</span>
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
        <section className="animate-[slideUp_2s_ease-out]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-emerald-500/30 transition-all duration-500">
            <h2 className="text-2xl font-bold text-emerald-300 mb-6 flex items-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Mini Checklist
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Always use controlled components for React forms",
                "Implement real-time validation for better UX",
                "Provide immediate visual feedback to users",
                "Handle form submission with preventDefault()",
                "Clear inputs after successful submission when appropriate",
                "Add loading states for asynchronous operations",
                "Implement proper error handling and display",
                "Make forms accessible with labels and ARIA",
                "Test edge cases (empty, max length, special chars)",
                "Consider performance for rapid inputs (debounce)",
                "Use appropriate input types (email, password, etc.)",
                "Keep state management simple and predictable"
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-4 bg-gray-900/40 rounded-xl border border-gray-700 hover:border-emerald-500/50 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-emerald-500/30 transition-colors">
                    <span className="text-emerald-400 font-bold text-sm">{index + 1}</span>
                  </div>
                  <span className="text-gray-300 group-hover:text-emerald-200 transition-colors">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-emerald-900/20 to-green-900/20 rounded-xl border border-emerald-700/30">
              <h4 className="font-bold text-green-300 mb-2">Hint Section</h4>
              <p className="text-gray-300">
                <span className="text-yellow-300">Think about:</span> How would Debangshu implement a search bar 
                for the Naihati student database? Consider performance (debouncing), UX (search suggestions), 
                and accessibility (keyboard navigation). Each keystroke should feel responsive but not overwhelming.
                <br /><br />
                <span className="text-cyan-300">Try this:</span> Convert one of the examples to use uncontrolled 
                components with refs. Notice how you lose real-time validation and have to query the DOM for values.
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
          .animate-\\[slideUp_1\\.1s_ease-out\\],
          .animate-\\[slideUp_1\\.2s_ease-out\\],
          .animate-\\[slideUp_1\\.4s_ease-out\\],
          .animate-\\[slideUp_1\\.6s_ease-out\\],
          .animate-\\[slideUp_1\\.8s_ease-out\\],
          .animate-\\[slideUp_2s_ease-out\\] {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Topic19;