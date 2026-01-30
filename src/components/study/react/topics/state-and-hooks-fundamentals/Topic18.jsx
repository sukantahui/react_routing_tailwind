import React, { useState } from 'react';
import clsx from 'clsx';

const Topic18 = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    bio: '',
    country: '',
    city: 'Barrackpore',
    subscribeWeekly: false,
    subscribeMonthly: true,
    experienceLevel: 'beginner',
    topics: [],
    notificationTime: '09:00',
    salaryRange: 50000
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [showLivePreview, setShowLivePreview] = useState(true);
  const [viewMode, setViewMode] = useState('form'); // 'form', 'uncontrolled', 'comparison'

  // Indian cities for dropdown
  const cities = [
    'Barrackpore', 'Shyamnagar', 'Ichapur', 'Naihati', 'Kolkata', 'Howrah', 
    'Dunlop', 'Baranagar', 'Titagarh', 'Panihati'
  ];

  // Topics for multi-select
  const availableTopics = [
    'React Hooks', 'State Management', 'Form Handling', 'API Integration',
    'Performance', 'Testing', 'TypeScript', 'Next.js', 'Server Components'
  ];

  // Handle input changes for controlled components
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setUserInfo(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle checkbox group (topics)
  const handleTopicChange = (topic) => {
    setUserInfo(prev => {
      const newTopics = prev.topics.includes(topic)
        ? prev.topics.filter(t => t !== topic)
        : [...prev.topics, topic];
      
      return {
        ...prev,
        topics: newTopics
      };
    });
  };

  // Handle radio button group
  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle range input
  const handleRangeChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: parseInt(value)
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData({ ...userInfo, submittedAt: new Date().toLocaleTimeString() });
  };

  // Reset form
  const handleReset = () => {
    setUserInfo({
      name: '',
      email: '',
      bio: '',
      country: '',
      city: 'Barrackpore',
      subscribeWeekly: false,
      subscribeMonthly: true,
      experienceLevel: 'beginner',
      topics: [],
      notificationTime: '09:00',
      salaryRange: 50000
    });
    setSubmittedData(null);
  };

  // Sample uncontrolled component data (for comparison)
  const [uncontrolledData, setUncontrolledData] = useState({});

  const handleUncontrolledSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Handle checkboxes separately
    data.subscribeWeekly = e.target.subscribeWeekly?.checked || false;
    data.subscribeMonthly = e.target.subscribeMonthly?.checked || false;
    
    // Handle multiple checkboxes (topics)
    const topicCheckboxes = e.target.querySelectorAll('input[name="topics"]');
    data.topics = Array.from(topicCheckboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);
    
    setUncontrolledData({ ...data, submittedAt: new Date().toLocaleTimeString() });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-gray-200 p-4 md:p-6 transition-colors duration-300">
      {/* Header Section */}
      <header className="max-w-6xl mx-auto mb-10">
        <div className="animate-[slideUp_0.8s_ease-out]">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent mb-3">
            Topic 18: Controlled Components in React Forms
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Master the React way of handling form inputs with controlled components
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto space-y-10">
        {/* Concept Explanation */}
        <section className="animate-[slideUp_1s_ease-out]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-emerald-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-900/10">
            <h2 className="text-2xl font-bold text-emerald-300 mb-4 flex items-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              What Are Controlled Components?
            </h2>
            
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Controlled Component */}
                <div className="bg-emerald-900/20 p-5 rounded-xl border border-emerald-800/50">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                      <span className="text-emerald-400 font-bold">🎯</span>
                    </div>
                    <h3 className="text-xl font-bold text-emerald-400">Controlled Component</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="font-medium">React State Driven</p>
                        <p className="text-sm text-gray-400">Value stored in React state</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="font-medium">Single Source of Truth</p>
                        <p className="text-sm text-gray-400">State → Input → State cycle</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="font-medium">Real-time Validation</p>
                        <p className="text-sm text-gray-400">Validate on every change</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Uncontrolled Component */}
                <div className="bg-red-900/20 p-5 rounded-xl border border-red-800/50">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                      <span className="text-red-400 font-bold">🔄</span>
                    </div>
                    <h3 className="text-xl font-bold text-red-400">Uncontrolled Component</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="font-medium">DOM Driven</p>
                        <p className="text-sm text-gray-400">Value stored in DOM</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="font-medium">Needs ref to access</p>
                        <p className="text-sm text-gray-400">Use refs to get values</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="font-medium">Limited React Features</p>
                        <p className="text-sm text-gray-400">Hard to validate in real-time</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 p-4 rounded-lg border-l-4 border-emerald-500">
                <h3 className="font-bold text-lg text-emerald-300 mb-2">The Controlled Component Pattern</h3>
                <div className="flex items-center justify-center my-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-4">
                      <div className="bg-emerald-900/30 p-4 rounded-lg border border-emerald-700">
                        <div className="text-emerald-400 font-bold">React State</div>
                      </div>
                      <svg className="w-6 h-6 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-700">
                        <div className="text-blue-400 font-bold">Input Value</div>
                      </div>
                      <svg className="w-6 h-6 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-700">
                        <div className="text-purple-400 font-bold">onChange Handler</div>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-400">
                      State → Input (value prop) → onChange → Update State (continuous loop)
                    </div>
                  </div>
                </div>
                <p className="mt-4">
                  In controlled components, React state is the <span className="text-yellow-300">single source of truth</span>. 
                  The input's value comes from state, and every keystroke updates the state through the onChange handler.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* View Mode Toggle */}
        <section className="animate-[slideUp_1.1s_ease-out]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-700">
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setViewMode('form')}
                className={clsx(
                  "px-4 py-2 rounded-lg font-medium transition-all duration-300",
                  viewMode === 'form'
                    ? "bg-emerald-900/50 text-emerald-300 border border-emerald-700"
                    : "bg-gray-900 text-gray-400 hover:bg-gray-800 border border-gray-700"
                )}
              >
                Controlled Form Demo
              </button>
              <button
                onClick={() => setViewMode('uncontrolled')}
                className={clsx(
                  "px-4 py-2 rounded-lg font-medium transition-all duration-300",
                  viewMode === 'uncontrolled'
                    ? "bg-red-900/50 text-red-300 border border-red-700"
                    : "bg-gray-900 text-gray-400 hover:bg-gray-800 border border-gray-700"
                )}
              >
                Uncontrolled Example
              </button>
              <button
                onClick={() => setViewMode('comparison')}
                className={clsx(
                  "px-4 py-2 rounded-lg font-medium transition-all duration-300",
                  viewMode === 'comparison'
                    ? "bg-blue-900/50 text-blue-300 border border-blue-700"
                    : "bg-gray-900 text-gray-400 hover:bg-gray-800 border border-gray-700"
                )}
              >
                Side-by-Side Comparison
              </button>
            </div>
          </div>
        </section>

        {/* Main Demo Section */}
        {viewMode === 'form' && (
          <section className="animate-[slideUp_1.2s_ease-out]">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-blue-500/30 transition-all duration-500">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-blue-300 flex items-center gap-3">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  Controlled Components Demo: Developer Profile
                </h2>
                
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={showLivePreview}
                        onChange={() => setShowLivePreview(!showLivePreview)}
                        className="sr-only"
                      />
                      <div className={clsx(
                        "w-10 h-6 rounded-full transition-colors duration-300",
                        showLivePreview ? "bg-emerald-600" : "bg-gray-700"
                      )}>
                        <div className={clsx(
                          "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300",
                          showLivePreview ? "left-5" : "left-1"
                        )} />
                      </div>
                    </div>
                    <span className="text-sm text-gray-400">Live Preview</span>
                  </label>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Form Column */}
                <div className="lg:col-span-2 space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information Card */}
                    <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
                      <h3 className="text-xl font-bold text-gray-300 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        Basic Information
                      </h3>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Name Input */}
                        <div>
                          <label className="block text-gray-400 mb-2 text-sm">Full Name</label>
                          <input
                            type="text"
                            name="name"
                            value={userInfo.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
                            placeholder="Swadeep Das"
                          />
                          <div className="mt-1 text-xs text-gray-500">
                            Controlled by: <code className="text-cyan-400">userInfo.name</code>
                          </div>
                        </div>

                        {/* Email Input */}
                        <div>
                          <label className="block text-gray-400 mb-2 text-sm">Email Address</label>
                          <input
                            type="email"
                            name="email"
                            value={userInfo.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
                            placeholder="swadeep@example.com"
                          />
                          <div className="mt-1 text-xs text-gray-500">
                            Controlled by: <code className="text-cyan-400">userInfo.email</code>
                          </div>
                        </div>

                        {/* City Dropdown */}
                        <div>
                          <label className="block text-gray-400 mb-2 text-sm">City</label>
                          <select
                            name="city"
                            value={userInfo.city}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
                          >
                            {cities.map(city => (
                              <option key={city} value={city}>{city}</option>
                            ))}
                          </select>
                          <div className="mt-1 text-xs text-gray-500">
                            Controlled by: <code className="text-cyan-400">userInfo.city</code>
                          </div>
                        </div>

                        {/* Experience Level - Radio Buttons */}
                        <div>
                          <label className="block text-gray-400 mb-2 text-sm">Experience Level</label>
                          <div className="flex flex-wrap gap-3">
                            {['beginner', 'intermediate', 'advanced', 'expert'].map(level => (
                              <label key={level} className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  name="experienceLevel"
                                  value={level}
                                  checked={userInfo.experienceLevel === level}
                                  onChange={handleRadioChange}
                                  className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-700 focus:ring-blue-500 focus:ring-2"
                                />
                                <span className="text-gray-300 capitalize">{level}</span>
                              </label>
                            ))}
                          </div>
                          <div className="mt-1 text-xs text-gray-500">
                            Controlled by: <code className="text-cyan-400">userInfo.experienceLevel</code>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bio Textarea */}
                    <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
                      <h3 className="text-xl font-bold text-gray-300 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                        </svg>
                        Bio & Preferences
                      </h3>
                      
                      <div className="space-y-4">
                        {/* Bio Textarea */}
                        <div>
                          <label className="block text-gray-400 mb-2 text-sm">Bio</label>
                          <textarea
                            name="bio"
                            value={userInfo.bio}
                            onChange={handleInputChange}
                            rows="3"
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all"
                            placeholder="Tell us about yourself..."
                          />
                          <div className="mt-1 text-xs text-gray-500">
                            Characters: {userInfo.bio.length}/500
                          </div>
                        </div>

                        {/* Checkboxes */}
                        <div className="space-y-3">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              name="subscribeWeekly"
                              checked={userInfo.subscribeWeekly}
                              onChange={handleInputChange}
                              className="w-4 h-4 text-green-500 bg-gray-800 border-gray-700 rounded focus:ring-green-500 focus:ring-2"
                            />
                            <div>
                              <span className="text-gray-300">Subscribe to weekly newsletter</span>
                              <div className="text-xs text-gray-500">
                                Controlled by: <code className="text-cyan-400">userInfo.subscribeWeekly</code>
                              </div>
                            </div>
                          </label>
                          
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              name="subscribeMonthly"
                              checked={userInfo.subscribeMonthly}
                              onChange={handleInputChange}
                              className="w-4 h-4 text-green-500 bg-gray-800 border-gray-700 rounded focus:ring-green-500 focus:ring-2"
                            />
                            <div>
                              <span className="text-gray-300">Subscribe to monthly digest</span>
                              <div className="text-xs text-gray-500">
                                Controlled by: <code className="text-cyan-400">userInfo.subscribeMonthly</code>
                              </div>
                            </div>
                          </label>
                        </div>

                        {/* Topics Checkbox Group */}
                        <div>
                          <label className="block text-gray-400 mb-2 text-sm">Interested Topics</label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {availableTopics.map(topic => (
                              <label key={topic} className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={userInfo.topics.includes(topic)}
                                  onChange={() => handleTopicChange(topic)}
                                  className="w-4 h-4 text-purple-500 bg-gray-800 border-gray-700 rounded focus:ring-purple-500 focus:ring-2"
                                />
                                <span className="text-sm text-gray-300">{topic}</span>
                              </label>
                            ))}
                          </div>
                          <div className="mt-1 text-xs text-gray-500">
                            Controlled by: <code className="text-cyan-400">userInfo.topics</code>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Advanced Controls */}
                    <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
                      <h3 className="text-xl font-bold text-gray-300 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                        Advanced Controls
                      </h3>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Time Input */}
                        <div>
                          <label className="block text-gray-400 mb-2 text-sm">Daily Notification Time</label>
                          <input
                            type="time"
                            name="notificationTime"
                            value={userInfo.notificationTime}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all"
                          />
                          <div className="mt-1 text-xs text-gray-500">
                            Controlled by: <code className="text-cyan-400">userInfo.notificationTime</code>
                          </div>
                        </div>

                        {/* Range Input */}
                        <div>
                          <label className="block text-gray-400 mb-2 text-sm">
                            Expected Salary: ₹{userInfo.salaryRange.toLocaleString()}
                          </label>
                          <input
                            type="range"
                            name="salaryRange"
                            min="30000"
                            max="200000"
                            step="10000"
                            value={userInfo.salaryRange}
                            onChange={handleRangeChange}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>₹30k</span>
                            <span>₹200k</span>
                          </div>
                          <div className="mt-1 text-xs text-gray-500">
                            Controlled by: <code className="text-cyan-400">userInfo.salaryRange</code>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex gap-4">
                      <button
                        type="submit"
                        className="flex-1 py-3 px-6 bg-emerald-900/30 text-emerald-300 rounded-lg font-medium hover:bg-emerald-800/50 hover:text-emerald-200 border border-emerald-800/50 hover:border-emerald-600 transition-all duration-300"
                      >
                        Submit Controlled Form
                      </button>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="px-6 py-3 bg-gray-800 text-gray-300 rounded-lg font-medium hover:bg-gray-700 border border-gray-700 hover:border-gray-600 transition-all duration-300"
                      >
                        Reset Form
                      </button>
                    </div>
                  </form>
                </div>

                {/* Live Preview / State Viewer Column */}
                <div className="space-y-6">
                  {showLivePreview ? (
                    <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700 h-fit">
                      <h3 className="text-xl font-bold text-gray-300 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        Live State Preview
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="p-3 bg-gray-800/40 rounded-lg">
                          <h4 className="font-bold text-blue-400 mb-2">Current State Values</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Name:</span>
                              <span className="text-gray-300">{userInfo.name || 'Empty'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Email:</span>
                              <span className="text-gray-300">{userInfo.email || 'Empty'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">City:</span>
                              <span className="text-gray-300">{userInfo.city}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Experience:</span>
                              <span className="text-gray-300 capitalize">{userInfo.experienceLevel}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Weekly Newsletter:</span>
                              <span className={userInfo.subscribeWeekly ? "text-green-400" : "text-gray-500"}>
                                {userInfo.subscribeWeekly ? 'Yes' : 'No'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Topics Selected:</span>
                              <span className="text-gray-300">{userInfo.topics.length}</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 bg-gray-800/40 rounded-lg">
                          <h4 className="font-bold text-green-400 mb-2">Bio Preview</h4>
                          <div className="text-sm text-gray-300 max-h-32 overflow-y-auto">
                            {userInfo.bio || 'No bio entered yet...'}
                          </div>
                        </div>

                        <div className="p-3 bg-gray-800/40 rounded-lg">
                          <h4 className="font-bold text-purple-400 mb-2">Selected Topics</h4>
                          <div className="flex flex-wrap gap-1">
                            {userInfo.topics.length > 0 ? (
                              userInfo.topics.map(topic => (
                                <span key={topic} className="px-2 py-1 bg-purple-900/30 text-purple-300 text-xs rounded border border-purple-800/50">
                                  {topic}
                                </span>
                              ))
                            ) : (
                              <span className="text-gray-500 text-sm">No topics selected</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700 h-fit">
                      <h3 className="text-xl font-bold text-gray-300 mb-4">State Structure</h3>
                      <pre className="bg-gray-950 p-4 rounded-lg overflow-x-auto text-xs">
{`const [userInfo, setUserInfo] = useState({
  name: '${userInfo.name}',
  email: '${userInfo.email}',
  bio: '${userInfo.bio}',
  city: '${userInfo.city}',
  subscribeWeekly: ${userInfo.subscribeWeekly},
  subscribeMonthly: ${userInfo.subscribeMonthly},
  experienceLevel: '${userInfo.experienceLevel}',
  topics: ${JSON.stringify(userInfo.topics)},
  notificationTime: '${userInfo.notificationTime}',
  salaryRange: ${userInfo.salaryRange}
});`}
                      </pre>
                    </div>
                  )}

                  {/* Submitted Data */}
                  {submittedData && (
                    <div className="bg-emerald-900/20 p-5 rounded-xl border border-emerald-700/30 animate-[slideUp_0.5s_ease-out]">
                      <h3 className="text-xl font-bold text-emerald-300 mb-4">Last Submission</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Submitted at:</span>
                          <span className="text-gray-300">{submittedData.submittedAt}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Name:</span>
                          <span className="text-gray-300">{submittedData.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">City:</span>
                          <span className="text-gray-300">{submittedData.city}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Topics:</span>
                          <span className="text-gray-300">{submittedData.topics.length}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Uncontrolled Example */}
        {viewMode === 'uncontrolled' && (
          <section className="animate-[slideUp_1.2s_ease-out]">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-red-500/30 transition-all duration-500">
              <h2 className="text-2xl font-bold text-red-300 mb-6 flex items-center gap-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                Uncontrolled Components (Traditional HTML)
              </h2>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Uncontrolled Form */}
                <div>
                  <form onSubmit={handleUncontrolledSubmit} className="space-y-6">
                    <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
                      <h3 className="text-xl font-bold text-gray-300 mb-4">Traditional HTML Form</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-400 mb-2 text-sm">Name</label>
                          <input
                            type="text"
                            name="name"
                            defaultValue=""
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50 transition-all"
                            placeholder="Tuhina Roy"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-400 mb-2 text-sm">Email</label>
                          <input
                            type="email"
                            name="email"
                            defaultValue=""
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50 transition-all"
                            placeholder="tuhina@example.com"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-400 mb-2 text-sm">City</label>
                          <select
                            name="city"
                            defaultValue="Shyamnagar"
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50 transition-all"
                          >
                            {cities.map(city => (
                              <option key={city} value={city}>{city}</option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-gray-400 text-sm">Subscribe</label>
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              name="subscribeWeekly"
                              defaultChecked={false}
                              className="w-4 h-4 text-red-500 bg-gray-800 border-gray-700 rounded"
                            />
                            <span className="text-gray-300">Weekly Newsletter</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-6 bg-red-900/30 text-red-300 rounded-lg font-medium hover:bg-red-800/50 hover:text-red-200 border border-red-800/50 hover:border-red-600 transition-all duration-300"
                    >
                      Submit Uncontrolled Form
                    </button>
                  </form>
                </div>

                {/* Uncontrolled Data Display */}
                <div>
                  <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700 h-full">
                    <h3 className="text-xl font-bold text-gray-300 mb-4">Submitted Data</h3>
                    
                    {Object.keys(uncontrolledData).length > 0 ? (
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-bold text-red-400 mb-2">Form Data (from FormData API)</h4>
                          <pre className="bg-gray-950 p-4 rounded-lg overflow-x-auto text-xs">
{JSON.stringify(uncontrolledData, null, 2)}
                          </pre>
                        </div>
                        
                        <div className="p-3 bg-red-900/20 rounded-lg border border-red-800/30">
                          <h4 className="font-bold text-yellow-400 mb-2">Limitations</h4>
                          <ul className="text-sm text-gray-300 space-y-1">
                            <li>• Cannot validate in real-time</li>
                            <li>• Need FormData API to access values</li>
                            <li>• No React state updates on change</li>
                            <li>• Cannot implement complex UI logic</li>
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                        <p>Submit the form to see uncontrolled data</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Comparison View */}
        {viewMode === 'comparison' && (
          <section className="animate-[slideUp_1.2s_ease-out]">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-blue-500/30 transition-all duration-500">
              <h2 className="text-2xl font-bold text-blue-300 mb-6 flex items-center gap-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Side-by-Side Comparison
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-300">Feature</th>
                      <th className="text-left py-3 px-4 text-emerald-400">Controlled Component</th>
                      <th className="text-left py-3 px-4 text-red-400">Uncontrolled Component</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        feature: 'Value Storage',
                        controlled: 'React state',
                        uncontrolled: 'DOM element'
                      },
                      {
                        feature: 'Real-time Validation',
                        controlled: '✅ Easy - validate on onChange',
                        uncontrolled: '❌ Difficult - validate on submit'
                      },
                      {
                        feature: 'Dynamic UI Updates',
                        controlled: '✅ Immediate - state changes trigger re-render',
                        uncontrolled: '❌ Manual - need refs or FormData'
                      },
                      {
                        feature: 'Form Reset',
                        controlled: '✅ Easy - reset state',
                        uncontrolled: '❌ Manual - call form.reset()'
                      },
                      {
                        feature: 'Complex Logic',
                        controlled: '✅ Easy - implement in handlers',
                        uncontrolled: '❌ Difficult - need refs and effects'
                      },
                      {
                        feature: 'Performance',
                        controlled: '⚠️ More re-renders',
                        uncontrolled: '✅ Fewer re-renders'
                      },
                      {
                        feature: 'Use Case',
                        controlled: 'Forms with validation, dynamic fields',
                        uncontrolled: 'Simple forms, file inputs'
                      }
                    ].map((row, index) => (
                      <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                        <td className="py-3 px-4 text-gray-300 font-medium">{row.feature}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <span>{row.controlled}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span>{row.uncontrolled}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-emerald-900/20 rounded-xl border border-emerald-800/30">
                  <h4 className="font-bold text-emerald-400 mb-2">When to Use Controlled</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Forms with real-time validation</li>
                    <li>• Dynamic form fields</li>
                    <li>• Conditional UI based on input</li>
                    <li>• Complex form logic</li>
                    <li>• When you need React state for the value</li>
                  </ul>
                </div>

                <div className="p-4 bg-red-900/20 rounded-xl border border-red-800/30">
                  <h4 className="font-bold text-red-400 mb-2">When to Use Uncontrolled</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Simple forms without validation</li>
                    <li>• File inputs (type="file")</li>
                    <li>• Performance-critical forms</li>
                    <li>• Integrating with non-React libraries</li>
                    <li>• When you only need value on submit</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Code Patterns */}
        <section className="animate-[slideUp_1.4s_ease-out]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-purple-500/30 transition-all duration-500">
            <h2 className="text-2xl font-bold text-purple-300 mb-6 flex items-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Controlled Component Patterns
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Basic Pattern */}
              <div className="group bg-gray-900/40 p-5 rounded-xl border border-gray-700 hover:border-blue-500/40 transition-all duration-300">
                <h3 className="text-lg font-bold text-blue-400 mb-3">Basic Pattern</h3>
                <pre className="bg-gray-950 p-4 rounded-lg overflow-x-auto text-xs">
{`// 1. Create state
const [value, setValue] = useState('');

// 2. Bind to input
<input
  type="text"
  value={value}           // State → Input
  onChange={(e) =>        // Input → State
    setValue(e.target.value)
  }
/>

// 3. Use value anywhere
<p>You typed: {value}</p>`}
                </pre>
                <div className="mt-3 p-2 bg-blue-900/20 rounded text-xs text-gray-400">
                  Single source of truth pattern
                </div>
              </div>

              {/* Advanced Pattern */}
              <div className="group bg-gray-900/40 p-5 rounded-xl border border-gray-700 hover:border-green-500/40 transition-all duration-300">
                <h3 className="text-lg font-bold text-green-400 mb-3">Object State Pattern</h3>
                <pre className="bg-gray-950 p-4 rounded-lg overflow-x-auto text-xs">
{`// 1. Object state
const [form, setForm] = useState({
  name: '',
  email: '',
  city: 'Barrackpore'
});

// 2. Generic handler
const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  setForm(prev => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : value
  }));
};

// 3. Bind all inputs
<input name="name" value={form.name} onChange={handleChange} />
<input name="email" value={form.email} onChange={handleChange} />
<select name="city" value={form.city} onChange={handleChange} />`}
                </pre>
                <div className="mt-3 p-2 bg-green-900/20 rounded text-xs text-gray-400">
                  Scalable pattern for complex forms
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className="animate-[slideUp_1.6s_ease-out]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-red-500/30 transition-all duration-500">
            <h2 className="text-2xl font-bold text-red-300 mb-6 flex items-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Common Pitfalls & Solutions
            </h2>

            <div className="space-y-4">
              {/* Pitfall 1 */}
              <div className="p-4 bg-red-900/20 border border-red-800/50 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-400 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-400 mb-1">Read-only Input</h4>
                    <pre className="bg-gray-950 p-3 rounded-lg text-xs overflow-x-auto mt-2">
{`// ❌ WRONG - Missing onChange
<input value={stateValue} />
// Error: You provided a \`value\` prop without \`onChange\``}
                    </pre>
                    <p className="text-gray-300 text-sm mt-2">
                      <span className="text-green-400">Solution:</span> Always provide onChange handler or use defaultValue for uncontrolled
                    </p>
                  </div>
                </div>
              </div>

              {/* Pitfall 2 */}
              <div className="p-4 bg-red-900/20 border border-red-800/50 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-400 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-400 mb-1">Not Updating State Correctly</h4>
                    <pre className="bg-gray-950 p-3 rounded-lg text-xs overflow-x-auto mt-2">
{`// ❌ WRONG - Mutating state directly
const handleChange = (e) => {
  formState.name = e.target.value; // Direct mutation!
  setFormState(formState);         // Won't trigger re-render
};`}
                    </pre>
                    <p className="text-gray-300 text-sm mt-2">
                      <span className="text-green-400">Solution:</span> Always create new state object using spread operator
                    </p>
                  </div>
                </div>
              </div>

              {/* Pitfall 3 */}
              <div className="p-4 bg-red-900/20 border border-red-800/50 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-400 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-400 mb-1">Performance Issues</h4>
                    <pre className="bg-gray-950 p-3 rounded-lg text-xs overflow-x-auto mt-2">
{`// ⚠️ CAUTION - Creating new functions on each render
<input 
  onChange={(e) => handleChange(e, index)} 
  // New function created every render!
/>`}
                    </pre>
                    <p className="text-gray-300 text-sm mt-2">
                      <span className="text-green-400">Solution:</span> Use useCallback for handlers or extract to separate function
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teacher's Note */}
        <section className="animate-[slideUp_1.8s_ease-out]">
          <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 backdrop-blur-sm rounded-2xl p-6 border border-emerald-700/50 hover:border-emerald-500/70 transition-all duration-500 group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-2xl font-bold text-emerald-300">Teacher's Note</h3>
                    <p className="text-emerald-400/80">Sukanta Hui • 27 years experience</p>
                  </div>
                  <div className="text-sm text-gray-400">
                    <p>Email: sukantahui@codernaccotax.co.in</p>
                    <p>Mobile: 7003756860</p>
                  </div>
                </div>
                
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <div className="bg-emerald-900/20 p-4 rounded-xl border border-emerald-800/30">
                    <h4 className="font-bold text-emerald-300 mb-2">Classroom Analogy from Naihati Institute</h4>
                    <p>
                      Think of controlled components like <span className="text-yellow-300">taking attendance</span> in Naihati Institute. 
                      Instead of students (inputs) telling you if they're present (uncontrolled), 
                      you have a register (React state) that you update as each student arrives.
                    </p>
                    <p className="mt-2">
                      When Abhronil a enters class, you don't ask "Are you here?" (uncontrolled). 
                      You mark her present in your register (state), and that becomes the single source of truth.
                    </p>
                  </div>

                  <div className="bg-teal-900/20 p-4 rounded-xl border border-teal-800/30">
                    <h4 className="font-bold text-teal-300 mb-2">Professional Insight</h4>
                    <p>
                      In my 27 years, I've seen teams struggle when they mix controlled and uncontrolled patterns. 
                      A Barrackpore startup had a form that worked in development but broke in production because 
                      they didn't understand the state flow.
                    </p>
                    <p className="mt-2">
                      Remember: <span className="text-yellow-300">"React state is the source of truth"</span>. 
                      If you need to know an input's value at any time without querying the DOM, use controlled components.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-gray-900/40 p-4 rounded-xl">
                      <h4 className="font-bold text-blue-400 mb-2">Real-world Example</h4>
                      <p className="text-sm">
                        When Swadeep registers for the Barrackpore coding competition:
                      </p>
                      <ol className="text-sm space-y-1 mt-2 ml-4 list-decimal">
                        <li>Typing name updates state immediately</li>
                        <li>Email validation happens as he types</li>
                        <li>City selection updates the form in real-time</li>
                        <li>Submit button enables only when all fields valid</li>
                        <li>All data is in React state, ready for API call</li>
                      </ol>
                    </div>

                    <div className="bg-gray-900/40 p-4 rounded-xl">
                      <h4 className="font-bold text-purple-400 mb-2">Memory Trick</h4>
                      <p className="text-sm">
                        Remember <span className="text-yellow-300">"C-R-U"</span>:
                      </p>
                      <div className="text-sm space-y-1 mt-2">
                        <div className="flex items-center gap-2">
                          <span className="text-purple-400 font-bold">C</span>
                          <span>ontrolled = React state controls input</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-purple-400 font-bold">R</span>
                          <span>e-render on every change</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-purple-400 font-bold">U</span>
                          <span>ncontrolled = DOM controls input</span>
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
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-cyan-500/30 transition-all duration-500">
            <h2 className="text-2xl font-bold text-cyan-300 mb-6 flex items-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Mini Checklist
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Understand that controlled components use React state as single source of truth",
                "Always provide both value and onChange props for controlled inputs",
                "Use object state for complex forms with multiple fields",
                "Implement real-time validation using onChange handlers",
                "Know when to use controlled vs uncontrolled components",
                "Handle different input types (text, checkbox, radio, select)",
                "Use the spread operator to update state immutably",
                "Implement form reset by resetting state to initial values",
                "Test forms thoroughly - controlled components re-render frequently"
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-4 bg-gray-900/40 rounded-xl border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-6 h-6 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-cyan-500/30 transition-colors">
                    <span className="text-cyan-400 font-bold text-sm">{index + 1}</span>
                  </div>
                  <span className="text-gray-300 group-hover:text-cyan-200 transition-colors">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-xl border border-cyan-700/30">
              <h4 className="font-bold text-blue-300 mb-2">Hint Section</h4>
              <p className="text-gray-300">
                <span className="text-yellow-300">Think about:</span> How would Debangshu from Ichapur implement a 
                multi-step registration form? With controlled components, each step's data stays in React state, 
                allowing him to navigate back and forth without losing input. 
                <br /><br />
                <span className="text-cyan-300">Try this:</span> Create a controlled component for a search input 
                that filters a list in real-time. Notice how the filter updates immediately with each keystroke.
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

export default Topic18;