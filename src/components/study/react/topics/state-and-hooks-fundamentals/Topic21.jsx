import React, { useState } from 'react';
import clsx from 'clsx';

const Topic21 = () => {
  // Form state for all input types
  const [formData, setFormData] = useState({
    // Checkboxes (multiple selection)
    notifications: {
      email: true,
      sms: false,
      push: true,
      weeklyDigest: false
    },
    
    // Radio buttons (single selection)
    experienceLevel: 'beginner',
    preferredTime: 'morning',
    subscriptionPlan: 'basic',
    
    // Select inputs
    course: '',
    city: 'Barrackpore',
    mentor: '',
    
    // Additional fields
    interests: [],
    termsAccepted: false,
    newsletter: true
  });

  // UI States
  const [activeDemo, setActiveDemo] = useState('checkboxes');
  const [submissions, setSubmissions] = useState([]);
  const [showCode, setShowCode] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);

  // Available options
  const cities = [
    'Barrackpore', 'Shyamnagar', 'Ichapur', 'Naihati', 'Kolkata',
    'Howrah', 'Dunlop', 'Baranagar', 'Titagarh', 'Panihati'
  ];

  const courses = [
    { id: 'react', name: 'React Masterclass', duration: '3 months', level: 'Intermediate' },
    { id: 'node', name: 'Node.js Backend', duration: '4 months', level: 'Advanced' },
    { id: 'python', name: 'Python for Data Science', duration: '6 months', level: 'Beginner' },
    { id: 'java', name: 'Java Enterprise', duration: '8 months', level: 'Advanced' },
    { id: 'uiux', name: 'UI/UX Design', duration: '3 months', level: 'Beginner' }
  ];

  const mentors = [
    { id: 'sukanta', name: 'Sukanta Hui', specialization: 'Full Stack', experience: '27 years' },
    { id: 'swadeep', name: 'Swadeep Das', specialization: 'Frontend', experience: '5 years' },
    { id: 'tuhina', name: 'Tuhina Roy', specialization: 'Backend', experience: '4 years' },
    { id: 'abhronila', name: 'Abhronila Sen', specialization: 'UI/UX', experience: '3 years' },
    { id: 'debangshu', name: 'Debangshu Dey', specialization: 'DevOps', experience: '6 years' }
  ];

  const interestsList = [
    'Web Development', 'Mobile Apps', 'Machine Learning', 'Cloud Computing',
    'Cybersecurity', 'Blockchain', 'Game Development', 'IoT', 'AR/VR'
  ];

  // Checkbox Handlers
  const handleCheckboxChange = (category, key) => {
    if (category === 'notifications') {
      setFormData(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [key]: !prev.notifications[key]
        }
      }));
    } else if (category === 'interests') {
      const newInterests = formData.interests.includes(key)
        ? formData.interests.filter(item => item !== key)
        : [...formData.interests, key];
      
      setFormData(prev => ({
        ...prev,
        interests: newInterests
      }));
    } else {
      // Single checkboxes
      setFormData(prev => ({
        ...prev,
        [key]: !prev[key]
      }));
    }
  };

  // Radio Button Handler
  const handleRadioChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Select Input Handler
  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const submission = {
      id: Date.now(),
      ...formData,
      submittedAt: new Date().toLocaleTimeString(),
      demoType: activeDemo
    };
    
    setSubmissions(prev => [submission, ...prev.slice(0, 4)]);
    
    // Show success message
    alert('Form submitted successfully! Check the submissions log.');
  };

  // Reset Form
  const handleReset = () => {
    setFormData({
      notifications: {
        email: true,
        sms: false,
        push: true,
        weeklyDigest: false
      },
      experienceLevel: 'beginner',
      preferredTime: 'morning',
      subscriptionPlan: 'basic',
      course: '',
      city: 'Barrackpore',
      mentor: '',
      interests: [],
      termsAccepted: false,
      newsletter: true
    });
    setSelectedInterests([]);
  };

  // Demo types
  const demos = [
    { id: 'checkboxes', label: 'Checkboxes', icon: '☑️', color: 'green' },
    { id: 'radio', label: 'Radio Buttons', icon: '🔘', color: 'blue' },
    { id: 'select', label: 'Select Inputs', icon: '📋', color: 'purple' },
    { id: 'combined', label: 'Combined Form', icon: '🧩', color: 'yellow' },
    { id: 'comparison', label: 'Comparison', icon: '⚖️', color: 'cyan' }
  ];

  // Get active demo color
  const getActiveColor = () => {
    const demo = demos.find(d => d.id === activeDemo);
    return demo?.color || 'green';
  };

  // Calculate selected notifications count
  const selectedNotifications = Object.values(formData.notifications).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-gray-200 p-4 md:p-6 transition-colors duration-300">
      {/* Header Section */}
      <header className="max-w-6xl mx-auto mb-10">
        <div className="animate-[slideUp_0.8s_ease-out]">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent mb-3">
            Topic 21: Checkbox, Radio, and Select Input Handling
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Master specialized form inputs for better user interaction in React
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto space-y-10">
        {/* Concept Overview */}
        <section className="animate-[slideUp_1s_ease-out]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-green-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-green-900/10">
            <h2 className="text-2xl font-bold text-green-300 mb-4 flex items-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Specialized Input Types: When and Why
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Checkbox Card */}
              <div className="bg-green-900/20 p-5 rounded-xl border border-green-800/50 group hover:border-green-500/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-xl">☑️</span>
                  </div>
                  <h3 className="text-xl font-bold text-green-400">Checkboxes</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-300">Multiple selections allowed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-300">Independent options</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-3">
                    Use for: Preferences, features, categories
                  </div>
                </div>
              </div>

              {/* Radio Card */}
              <div className="bg-blue-900/20 p-5 rounded-xl border border-blue-800/50 group hover:border-blue-500/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-xl">🔘</span>
                  </div>
                  <h3 className="text-xl font-bold text-blue-400">Radio Buttons</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-300">Single selection only</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-300">Mutually exclusive options</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-3">
                    Use for: Choices, plans, single-select options
                  </div>
                </div>
              </div>

              {/* Select Card */}
              <div className="bg-purple-900/20 p-5 rounded-xl border border-purple-800/50 group hover:border-purple-500/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-xl">📋</span>
                  </div>
                  <h3 className="text-xl font-bold text-purple-400">Select Inputs</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-300">Dropdown for many options</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-300">Space-efficient design</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-3">
                    Use for: Lists, categories, long option sets
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border-l-4 border-yellow-500">
              <h3 className="font-bold text-lg text-yellow-300 mb-2">Key Differentiator</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-green-900/20 rounded-lg">
                  <div className="text-green-400 font-bold">Checkboxes</div>
                  <div className="text-sm text-gray-300 mt-1">"Choose all that apply"</div>
                </div>
                <div className="text-center p-3 bg-blue-900/20 rounded-lg">
                  <div className="text-blue-400 font-bold">Radio Buttons</div>
                  <div className="text-sm text-gray-300 mt-1">"Choose one only"</div>
                </div>
                <div className="text-center p-3 bg-purple-900/20 rounded-lg">
                  <div className="text-purple-400 font-bold">Select Inputs</div>
                  <div className="text-sm text-gray-300 mt-1">"Choose from a list"</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Navigation */}
        <section className="animate-[slideUp_1.1s_ease-out]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-700">
            <div className="flex flex-wrap gap-2 justify-center">
              {demos.map((demo) => (
                <button
                  key={demo.id}
                  onClick={() => setActiveDemo(demo.id)}
                  className={clsx(
                    "px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2",
                    activeDemo === demo.id
                      ? `bg-${demo.color}-900/50 text-${demo.color}-300 border border-${demo.color}-700`
                      : "bg-gray-900 text-gray-400 hover:bg-gray-800 border border-gray-700"
                  )}
                >
                  <span>{demo.icon}</span>
                  <span>{demo.label}</span>
                </button>
              ))}
              
              <button
                onClick={() => setShowCode(!showCode)}
                className={clsx(
                  "px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2",
                  showCode
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700"
                    : "bg-gray-900 text-gray-400 hover:bg-gray-800 border border-gray-700"
                )}
              >
                <span>{showCode ? '👁️' : '👨‍💻'}</span>
                <span>{showCode ? 'Hide Code' : 'Show Code'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* Main Demo Section */}
        <section className="animate-[slideUp_1.2s_ease-out]">
          <div className={clsx(
            "bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-500",
            `hover:border-${getActiveColor()}-500/30`
          )}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Demo Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Checkboxes Demo */}
                {activeDemo === 'checkboxes' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">☑️</span>
                      <h2 className="text-2xl font-bold text-green-300">Checkboxes Demo</h2>
                    </div>

                    <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
                      <h3 className="text-xl font-bold text-gray-300 mb-4">Notification Preferences</h3>
                      
                      <div className="space-y-4">
                        <div className="p-3 bg-gray-800/40 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-bold text-green-400">Select all that apply:</h4>
                            <span className="text-sm text-gray-400">
                              {selectedNotifications} of {Object.keys(formData.notifications).length} selected
                            </span>
                          </div>
                          
                          <div className="space-y-3">
                            {Object.entries(formData.notifications).map(([key, value]) => (
                              <label key={key} className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative">
                                  <input
                                    type="checkbox"
                                    checked={value}
                                    onChange={() => handleCheckboxChange('notifications', key)}
                                    className="sr-only peer"
                                  />
                                  <div className={clsx(
                                    "w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center",
                                    value
                                      ? "bg-green-500 border-green-500"
                                      : "bg-gray-800 border-gray-600 group-hover:border-green-400"
                                  )}>
                                    {value && (
                                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                      </svg>
                                    )}
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <span className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                                  <p className="text-sm text-gray-500">
                                    {key === 'email' && 'Receive updates via email'}
                                    {key === 'sms' && 'Get SMS alerts for important updates'}
                                    {key === 'push' && 'Browser push notifications'}
                                    {key === 'weeklyDigest' && 'Weekly summary of activities'}
                                  </p>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Single Checkboxes */}
                        <div className="p-3 bg-gray-800/40 rounded-lg">
                          <h4 className="font-bold text-green-400 mb-3">Additional Options</h4>
                          <div className="space-y-3">
                            <label className="flex items-center gap-3 cursor-pointer group">
                              <input
                                type="checkbox"
                                checked={formData.termsAccepted}
                                onChange={() => handleCheckboxChange('single', 'termsAccepted')}
                                className="w-4 h-4 text-green-500 bg-gray-800 border-gray-700 rounded focus:ring-green-500 focus:ring-2"
                              />
                              <div>
                                <span className="text-gray-300">I accept the terms and conditions</span>
                                <p className="text-sm text-gray-500">Required for registration</p>
                              </div>
                            </label>
                            
                            <label className="flex items-center gap-3 cursor-pointer group">
                              <input
                                type="checkbox"
                                checked={formData.newsletter}
                                onChange={() => handleCheckboxChange('single', 'newsletter')}
                                className="w-4 h-4 text-green-500 bg-gray-800 border-gray-700 rounded focus:ring-green-500 focus:ring-2"
                              />
                              <div>
                                <span className="text-gray-300">Subscribe to monthly newsletter</span>
                                <p className="text-sm text-gray-500">Get coding tips and updates</p>
                              </div>
                            </label>
                          </div>
                        </div>

                        {/* Interests Checkboxes */}
                        <div className="p-3 bg-gray-800/40 rounded-lg">
                          <h4 className="font-bold text-green-400 mb-3">Areas of Interest</h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {interestsList.map(interest => (
                              <label key={interest} className="flex items-center gap-2 cursor-pointer group">
                                <input
                                  type="checkbox"
                                  checked={formData.interests.includes(interest)}
                                  onChange={() => handleCheckboxChange('interests', interest)}
                                  className="w-4 h-4 text-green-500 bg-gray-800 border-gray-700 rounded focus:ring-green-500 focus:ring-2"
                                />
                                <span className="text-gray-300 text-sm group-hover:text-green-300 transition-colors">
                                  {interest}
                                </span>
                              </label>
                            ))}
                          </div>
                          <div className="mt-3 p-2 bg-green-900/20 rounded border border-green-800/30">
                            <p className="text-sm text-gray-300">
                              Selected: {formData.interests.length > 0 ? formData.interests.join(', ') : 'None'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Radio Buttons Demo */}
                {activeDemo === 'radio' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">🔘</span>
                      <h2 className="text-2xl font-bold text-blue-300">Radio Buttons Demo</h2>
                    </div>

                    <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
                      <h3 className="text-xl font-bold text-gray-300 mb-4">Student Registration Options</h3>
                      
                      <div className="space-y-6">
                        {/* Experience Level */}
                        <div className="p-3 bg-gray-800/40 rounded-lg">
                          <h4 className="font-bold text-blue-400 mb-3">Experience Level *</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {[
                              { value: 'beginner', label: 'Beginner', icon: '🌱', description: 'Just starting out' },
                              { value: 'intermediate', label: 'Intermediate', icon: '🚀', description: 'Some experience' },
                              { value: 'advanced', label: 'Advanced', icon: '⚡', description: 'Confident coder' },
                              { value: 'expert', label: 'Expert', icon: '🏆', description: 'Industry experience' }
                            ].map(option => (
                              <label key={option.value} className="cursor-pointer">
                                <input
                                  type="radio"
                                  name="experienceLevel"
                                  value={option.value}
                                  checked={formData.experienceLevel === option.value}
                                  onChange={() => handleRadioChange('experienceLevel', option.value)}
                                  className="sr-only peer"
                                />
                                <div className={clsx(
                                  "p-3 rounded-lg border-2 transition-all duration-200 text-center",
                                  formData.experienceLevel === option.value
                                    ? "border-blue-500 bg-blue-900/20"
                                    : "border-gray-700 bg-gray-800/50 hover:border-blue-400/50"
                                )}>
                                  <div className="text-2xl mb-1">{option.icon}</div>
                                  <div className="font-medium text-gray-300">{option.label}</div>
                                  <div className="text-xs text-gray-500 mt-1">{option.description}</div>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Preferred Time */}
                        <div className="p-3 bg-gray-800/40 rounded-lg">
                          <h4 className="font-bold text-blue-400 mb-3">Preferred Class Time</h4>
                          <div className="space-y-2">
                            {[
                              { value: 'morning', label: 'Morning (9 AM - 12 PM)', icon: '🌅' },
                              { value: 'afternoon', label: 'Afternoon (2 PM - 5 PM)', icon: '☀️' },
                              { value: 'evening', label: 'Evening (6 PM - 9 PM)', icon: '🌙' },
                              { value: 'weekend', label: 'Weekend Only', icon: '📅' }
                            ].map(option => (
                              <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative">
                                  <input
                                    type="radio"
                                    name="preferredTime"
                                    value={option.value}
                                    checked={formData.preferredTime === option.value}
                                    onChange={() => handleRadioChange('preferredTime', option.value)}
                                    className="sr-only peer"
                                  />
                                  <div className={clsx(
                                    "w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center",
                                    formData.preferredTime === option.value
                                      ? "border-blue-500 bg-blue-500"
                                      : "border-gray-600 bg-gray-800 group-hover:border-blue-400"
                                  )}>
                                    {formData.preferredTime === option.value && (
                                      <div className="w-2 h-2 rounded-full bg-white"></div>
                                    )}
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-lg">{option.icon}</span>
                                    <span className="text-gray-300">{option.label}</span>
                                  </div>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Subscription Plan */}
                        <div className="p-3 bg-gray-800/40 rounded-lg">
                          <h4 className="font-bold text-blue-400 mb-3">Choose Subscription Plan</h4>
                          <div className="grid md:grid-cols-3 gap-3">
                            {[
                              { 
                                value: 'basic', 
                                label: 'Basic', 
                                price: 'Free',
                                features: ['Course access', 'Community forum'],
                                color: 'gray'
                              },
                              { 
                                value: 'pro', 
                                label: 'Pro', 
                                price: '₹999/month',
                                features: ['All Basic features', 'Mentor support', 'Projects'],
                                color: 'blue'
                              },
                              { 
                                value: 'enterprise', 
                                label: 'Enterprise', 
                                price: 'Custom',
                                features: ['All Pro features', 'Custom training', 'Priority support'],
                                color: 'purple'
                              }
                            ].map(option => (
                              <label key={option.value} className="cursor-pointer">
                                <input
                                  type="radio"
                                  name="subscriptionPlan"
                                  value={option.value}
                                  checked={formData.subscriptionPlan === option.value}
                                  onChange={() => handleRadioChange('subscriptionPlan', option.value)}
                                  className="sr-only peer"
                                />
                                <div className={clsx(
                                  "p-4 rounded-xl border-2 transition-all duration-200 h-full",
                                  formData.subscriptionPlan === option.value
                                    ? `border-${option.color}-500 bg-${option.color}-900/20`
                                    : "border-gray-700 bg-gray-800/50 hover:border-blue-400/50"
                                )}>
                                  <div className="flex justify-between items-start mb-3">
                                    <div>
                                      <div className="font-bold text-lg text-gray-300">{option.label}</div>
                                      <div className="text-2xl font-bold text-gray-100 mt-1">{option.price}</div>
                                    </div>
                                    {formData.subscriptionPlan === option.value && (
                                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                      </div>
                                    )}
                                  </div>
                                  <ul className="space-y-1">
                                    {option.features.map((feature, idx) => (
                                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                                        <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <span>{feature}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Select Inputs Demo */}
                {activeDemo === 'select' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">📋</span>
                      <h2 className="text-2xl font-bold text-purple-300">Select Inputs Demo</h2>
                    </div>

                    <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
                      <h3 className="text-xl font-bold text-gray-300 mb-4">Course Registration</h3>
                      
                      <div className="space-y-6">
                        {/* Course Selection */}
                        <div>
                          <label className="block text-gray-400 mb-2">Select Course *</label>
                          <select
                            value={formData.course}
                            onChange={(e) => handleSelectChange('course', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none"
                          >
                            <option value="">Choose a course...</option>
                            {courses.map(course => (
                              <option key={course.id} value={course.id}>
                                {course.name} - {course.duration} ({course.level})
                              </option>
                            ))}
                          </select>
                          
                          {formData.course && (
                            <div className="mt-3 p-3 bg-purple-900/20 rounded-lg border border-purple-800/30">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-bold text-purple-300">
                                    {courses.find(c => c.id === formData.course)?.name}
                                  </h4>
                                  <p className="text-sm text-gray-400">
                                    Duration: {courses.find(c => c.id === formData.course)?.duration}
                                  </p>
                                </div>
                                <span className="px-2 py-1 bg-purple-900/30 text-purple-300 text-xs rounded">
                                  {courses.find(c => c.id === formData.course)?.level}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* City Selection */}
                        <div>
                          <label className="block text-gray-400 mb-2">Select City</label>
                          <select
                            value={formData.city}
                            onChange={(e) => handleSelectChange('city', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all"
                          >
                            {cities.map(city => (
                              <option key={city} value={city}>{city}</option>
                            ))}
                          </select>
                          <p className="text-sm text-gray-500 mt-1">
                            Choose your nearest center for offline classes
                          </p>
                        </div>

                        {/* Mentor Selection */}
                        <div>
                          <label className="block text-gray-400 mb-2">Preferred Mentor (Optional)</label>
                          <select
                            value={formData.mentor}
                            onChange={(e) => handleSelectChange('mentor', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all"
                          >
                            <option value="">Select a mentor...</option>
                            {mentors.map(mentor => (
                              <option key={mentor.id} value={mentor.id}>
                                {mentor.name} - {mentor.specialization} ({mentor.experience} exp)
                              </option>
                            ))}
                          </select>
                          
                          {formData.mentor && (
                            <div className="mt-3 p-3 bg-gray-800/40 rounded-lg border border-gray-700">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                                  <span className="text-white font-bold">
                                    {mentors.find(m => m.id === formData.mentor)?.name.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                                <div>
                                  <h4 className="font-bold text-gray-300">
                                    {mentors.find(m => m.id === formData.mentor)?.name}
                                  </h4>
                                  <p className="text-sm text-gray-400">
                                    {mentors.find(m => m.id === formData.mentor)?.specialization} • 
                                    {mentors.find(m => m.id === formData.mentor)?.experience} experience
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Multiple Select Example */}
                        <div className="p-3 bg-gray-800/40 rounded-lg">
                          <h4 className="font-bold text-purple-400 mb-2">Multiple Select (HTML Only)</h4>
                          <select
                            multiple
                            size="4"
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-sm"
                          >
                            <option value="react">React.js</option>
                            <option value="node">Node.js</option>
                            <option value="python">Python</option>
                            <option value="java">Java</option>
                            <option value="uiux">UI/UX Design</option>
                          </select>
                          <p className="text-xs text-gray-500 mt-2">
                            Hold Ctrl/Cmd to select multiple options. In React, use checkboxes for better UX.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Combined Form Demo */}
                {activeDemo === 'combined' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">🧩</span>
                      <h2 className="text-2xl font-bold text-yellow-300">Combined Form Demo</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
                        <h3 className="text-xl font-bold text-gray-300 mb-4">Complete Student Registration</h3>
                        
                        <div className="space-y-6">
                          {/* Personal Info */}
                          <div>
                            <h4 className="font-bold text-gray-300 mb-3">Personal Information</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-gray-400 mb-2">Full Name</label>
                                <input
                                  type="text"
                                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 transition-all"
                                  placeholder="Swadeep Das"
                                />
                              </div>
                              <div>
                                <label className="block text-gray-400 mb-2">Email</label>
                                <input
                                  type="email"
                                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 transition-all"
                                  placeholder="swadeep@example.com"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Course Selection (Select) */}
                          <div>
                            <h4 className="font-bold text-gray-300 mb-2">Course Selection</h4>
                            <select
                              value={formData.course}
                              onChange={(e) => handleSelectChange('course', e.target.value)}
                              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 transition-all"
                            >
                              <option value="">Select a course...</option>
                              {courses.map(course => (
                                <option key={course.id} value={course.id}>{course.name}</option>
                              ))}
                            </select>
                          </div>

                          {/* Experience Level (Radio) */}
                          <div>
                            <h4 className="font-bold text-gray-300 mb-3">Experience Level</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                              {['beginner', 'intermediate', 'advanced', 'expert'].map(level => (
                                <label key={level} className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="radio"
                                    name="experienceLevel"
                                    value={level}
                                    checked={formData.experienceLevel === level}
                                    onChange={() => handleRadioChange('experienceLevel', level)}
                                    className="w-4 h-4 text-yellow-500 bg-gray-800 border-gray-700 focus:ring-yellow-500 focus:ring-2"
                                  />
                                  <span className="text-gray-300 capitalize">{level}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          {/* Notifications (Checkboxes) */}
                          <div>
                            <h4 className="font-bold text-gray-300 mb-3">Notification Preferences</h4>
                            <div className="space-y-2">
                              {Object.entries(formData.notifications).map(([key, value]) => (
                                <label key={key} className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={value}
                                    onChange={() => handleCheckboxChange('notifications', key)}
                                    className="w-4 h-4 text-yellow-500 bg-gray-800 border-gray-700 rounded focus:ring-yellow-500 focus:ring-2"
                                  />
                                  <span className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          {/* Terms (Checkbox) */}
                          <div className="p-3 bg-gray-800/40 rounded-lg">
                            <label className="flex items-start gap-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={formData.termsAccepted}
                                onChange={() => handleCheckboxChange('single', 'termsAccepted')}
                                className="w-4 h-4 text-yellow-500 bg-gray-800 border-gray-700 rounded focus:ring-yellow-500 focus:ring-2 mt-1"
                              />
                              <div>
                                <span className="text-gray-300">I agree to the terms and conditions</span>
                                <p className="text-sm text-gray-500 mt-1">
                                  By checking this box, you agree to our terms of service and privacy policy.
                                </p>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button
                          type="submit"
                          className="flex-1 py-3 px-6 bg-yellow-900/30 text-yellow-300 rounded-lg font-medium hover:bg-yellow-800/50 hover:text-yellow-200 border border-yellow-800/50 hover:border-yellow-600 transition-all duration-300"
                        >
                          Submit Registration
                        </button>
                        <button
                          type="button"
                          onClick={handleReset}
                          className="px-6 py-3 bg-gray-800 text-gray-300 rounded-lg font-medium hover:bg-gray-700 border border-gray-700 transition-all duration-300"
                        >
                          Reset Form
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Comparison Demo */}
                {activeDemo === 'comparison' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">⚖️</span>
                      <h2 className="text-2xl font-bold text-cyan-300">Input Type Comparison</h2>
                    </div>

                    <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
                      <h3 className="text-xl font-bold text-gray-300 mb-4">Choosing the Right Input Type</h3>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-700">
                              <th className="text-left py-3 px-4 text-gray-300">Scenario</th>
                              <th className="text-left py-3 px-4 text-green-400">Checkboxes</th>
                              <th className="text-left py-3 px-4 text-blue-400">Radio Buttons</th>
                              <th className="text-left py-3 px-4 text-purple-400">Select Inputs</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              {
                                scenario: 'Selecting multiple interests',
                                checkbox: '✅ Perfect - "Choose all that apply"',
                                radio: '❌ Wrong - Can only select one',
                                select: '⚠️ Okay - Use multiple attribute'
                              },
                              {
                                scenario: 'Choosing gender',
                                checkbox: '❌ Wrong - Multiple selection possible',
                                radio: '✅ Perfect - Single choice',
                                select: '✅ Good - Dropdown works'
                              },
                              {
                                scenario: 'Selecting country from 200+ options',
                                checkbox: '❌ Terrible - Too many checkboxes',
                                radio: '❌ Terrible - Too many options',
                                select: '✅ Perfect - Dropdown saves space'
                              },
                              {
                                scenario: 'Agreeing to terms',
                                checkbox: '✅ Perfect - Binary choice',
                                radio: '⚠️ Okay - But requires two options',
                                select: '❌ Wrong - Overkill for yes/no'
                              },
                              {
                                scenario: 'Choosing plan (Free, Pro, Enterprise)',
                                checkbox: '❌ Wrong - Could select multiple',
                                radio: '✅ Perfect - Mutually exclusive',
                                select: '✅ Good - Clear alternative'
                              },
                              {
                                scenario: 'Filtering products by category',
                                checkbox: '✅ Perfect - Multiple filters',
                                radio: '⚠️ Okay - Only one filter at a time',
                                select: '⚠️ Okay - Limited to one unless multiple'
                              }
                            ].map((row, index) => (
                              <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                                <td className="py-3 px-4 text-gray-300 font-medium">{row.scenario}</td>
                                <td className="py-3 px-4">
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span>{row.checkbox}</span>
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span>{row.radio}</span>
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                    <span>{row.select}</span>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="mt-6 p-4 bg-cyan-900/20 rounded-lg border border-cyan-800/30">
                        <h4 className="font-bold text-cyan-400 mb-2">Decision Flowchart</h4>
                        <div className="text-sm text-gray-300 space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                            <span>Can user select multiple options? → <strong>Checkboxes</strong></span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                            <span>Must user select exactly one? → <strong>Radio Buttons</strong></span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                            <span>More than 5-7 options? → <strong>Select Input</strong></span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                            <span>Binary choice (yes/no)? → <strong>Single Checkbox</strong></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar - Code & State */}
              <div className="space-y-6">
                {/* Code Examples */}
                {showCode && (
                  <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
                    <h3 className="text-xl font-bold text-gray-300 mb-4">Code Examples</h3>
                    
                    {activeDemo === 'checkboxes' && (
                      <pre className="bg-gray-950 p-4 rounded-lg overflow-x-auto text-xs">
{`// State for checkbox group
const [notifications, setNotifications] = useState({
  email: true,
  sms: false,
  push: true
});

// Handler for checkbox group
const handleNotificationChange = (key) => {
  setNotifications(prev => ({
    ...prev,
    [key]: !prev[key]
  }));
};

// Single checkbox
const [accepted, setAccepted] = useState(false);

// In JSX
<div>
  {Object.entries(notifications).map(([key, value]) => (
    <label key={key}>
      <input
        type="checkbox"
        checked={value}
        onChange={() => handleNotificationChange(key)}
      />
      {key}
    </label>
  ))}
  
  <label>
    <input
      type="checkbox"
      checked={accepted}
      onChange={() => setAccepted(!accepted)}
    />
    Accept Terms
  </label>
</div>`}
                      </pre>
                    )}

                    {activeDemo === 'radio' && (
                      <pre className="bg-gray-950 p-4 rounded-lg overflow-x-auto text-xs">
{`// State for radio group
const [experience, setExperience] = useState('beginner');

// Handler for radio buttons
const handleExperienceChange = (e) => {
  setExperience(e.target.value);
};

// In JSX
<div>
  <label>
    <input
      type="radio"
      name="experience"
      value="beginner"
      checked={experience === 'beginner'}
      onChange={handleExperienceChange}
    />
    Beginner
  </label>
  
  <label>
    <input
      type="radio"
      name="experience"
      value="intermediate"
      checked={experience === 'intermediate'}
      onChange={handleExperienceChange}
    />
    Intermediate
  </label>
  
  <label>
    <input
      type="radio"
      name="experience"
      value="advanced"
      checked={experience === 'advanced'}
      onChange={handleExperienceChange}
    />
    Advanced
  </label>
</div>`}
                      </pre>
                    )}

                    {activeDemo === 'select' && (
                      <pre className="bg-gray-950 p-4 rounded-lg overflow-x-auto text-xs">
{`// State for select
const [course, setCourse] = useState('');
const [city, setCity] = useState('Barrackpore');

// Handler for select
const handleCourseChange = (e) => {
  setCourse(e.target.value);
};

// Options array
const courses = [
  { id: 'react', name: 'React' },
  { id: 'node', name: 'Node.js' }
];

// In JSX
<div>
  <label>Select Course:</label>
  <select value={course} onChange={handleCourseChange}>
    <option value="">Choose...</option>
    {courses.map(course => (
      <option key={course.id} value={course.id}>
        {course.name}
      </option>
    ))}
  </select>
  
  <label>Select City:</label>
  <select value={city} onChange={(e) => setCity(e.target.value)}>
    <option value="Barrackpore">Barrackpore</option>
    <option value="Shyamnagar">Shyamnagar</option>
  </select>
</div>`}
                      </pre>
                    )}
                  </div>
                )}

                {/* Current State Display */}
                <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
                  <h3 className="text-xl font-bold text-gray-300 mb-4">Current State</h3>
                  
                  <div className="space-y-4">
                    <div className="p-3 bg-gray-800/40 rounded-lg">
                      <h4 className="font-bold text-cyan-400 text-sm mb-2">Notifications</h4>
                      <div className="space-y-1">
                        {Object.entries(formData.notifications).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-400 text-sm capitalize">{key}:</span>
                            <span className={value ? "text-green-400 text-sm" : "text-gray-500 text-sm"}>
                              {value ? 'Yes' : 'No'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-gray-800/40 rounded-lg">
                      <h4 className="font-bold text-cyan-400 text-sm mb-2">Radio Selections</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-400 text-sm">Experience:</span>
                          <span className="text-gray-300 text-sm capitalize">{formData.experienceLevel}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 text-sm">Preferred Time:</span>
                          <span className="text-gray-300 text-sm capitalize">{formData.preferredTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 text-sm">Subscription:</span>
                          <span className="text-gray-300 text-sm capitalize">{formData.subscriptionPlan}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-gray-800/40 rounded-lg">
                      <h4 className="font-bold text-cyan-400 text-sm mb-2">Select Values</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-400 text-sm">Course:</span>
                          <span className="text-gray-300 text-sm">
                            {formData.course || 'Not selected'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 text-sm">City:</span>
                          <span className="text-gray-300 text-sm">{formData.city}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 text-sm">Mentor:</span>
                          <span className="text-gray-300 text-sm">
                            {formData.mentor || 'Not selected'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-gray-800/40 rounded-lg">
                      <h4 className="font-bold text-cyan-400 text-sm mb-2">Checkboxes</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-400 text-sm">Terms Accepted:</span>
                          <span className={formData.termsAccepted ? "text-green-400 text-sm" : "text-red-400 text-sm"}>
                            {formData.termsAccepted ? 'Yes' : 'No'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 text-sm">Newsletter:</span>
                          <span className={formData.newsletter ? "text-green-400 text-sm" : "text-gray-500 text-sm"}>
                            {formData.newsletter ? 'Subscribed' : 'Not subscribed'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 text-sm">Interests:</span>
                          <span className="text-gray-300 text-sm">
                            {formData.interests.length} selected
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Submissions */}
                <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
                  <h3 className="text-xl font-bold text-gray-300 mb-4">Recent Submissions</h3>
                  
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {submissions.length > 0 ? (
                      submissions.map((submission) => (
                        <div 
                          key={submission.id}
                          className="p-3 bg-gray-800/40 rounded-lg border border-gray-700 hover:bg-gray-800/70 transition-all duration-300"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-blue-300 text-sm">
                                {submission.demoType.charAt(0).toUpperCase() + submission.demoType.slice(1)} Demo
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                Exp: {submission.experienceLevel} • 
                                Notifications: {Object.values(submission.notifications).filter(Boolean).length}
                              </p>
                            </div>
                            <span className="text-xs text-gray-500">{submission.submittedAt}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        <svg className="w-8 h-8 mx-auto mb-2 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm">Submit the form to see data here</p>
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
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-emerald-500/30 transition-all duration-500">
            <h2 className="text-2xl font-bold text-emerald-300 mb-6 flex items-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Best Practices & Accessibility
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Accessibility */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-blue-400">Accessibility Guidelines</h3>
                
                <div className="space-y-3">
                  <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-800/30">
                    <h4 className="font-bold text-blue-300 text-sm mb-1">Labels are MANDATORY</h4>
                    <pre className="bg-gray-950 p-2 rounded text-xs overflow-x-auto mt-2">
{`// ❌ WRONG - No label
<input type="checkbox" />

// ✅ CORRECT - With label
<label>
  <input type="checkbox" />
  Accept Terms
</label>

// ✅ ALSO CORRECT - Using htmlFor
<label htmlFor="terms">Accept Terms</label>
<input id="terms" type="checkbox" />`}
                    </pre>
                  </div>

                  <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-800/30">
                    <h4 className="font-bold text-blue-300 text-sm mb-1">Group Related Inputs</h4>
                    <pre className="bg-gray-950 p-2 rounded text-xs overflow-x-auto mt-2">
{`// Use fieldset and legend for groups
<fieldset>
  <legend>Notification Preferences</legend>
  <label><input type="checkbox" /> Email</label>
  <label><input type="checkbox" /> SMS</label>
</fieldset>`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* UX Best Practices */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-green-400">UX Best Practices</h3>
                
                <div className="space-y-3">
                  <div className="p-3 bg-green-900/20 rounded-lg border border-green-800/30">
                    <h4 className="font-bold text-green-300 text-sm mb-1">Default Values</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Checkboxes: Default to most common choice</li>
                      <li>• Radio buttons: Pre-select safest option</li>
                      <li>• Select inputs: Have a "Please select" option</li>
                      <li>• Never pre-fill sensitive information</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-green-900/20 rounded-lg border border-green-800/30">
                    <h4 className="font-bold text-green-300 text-sm mb-1">Visual Design</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Keep related options close together</li>
                      <li>• Use consistent sizing and spacing</li>
                      <li>• Provide clear visual feedback on selection</li>
                      <li>• Consider touch targets on mobile (min 44px)</li>
                    </ul>
                  </div>
                </div>
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
                    <h4 className="font-bold text-red-400">Using Radio for Multiple Selection</h4>
                  </div>
                  <pre className="bg-gray-950 p-3 rounded-lg text-xs overflow-x-auto">
{`// ❌ WRONG - Radio buttons for multiple selection
// User can only select ONE interest
<label><input type="radio" name="interest" value="react" /> React</label>
<label><input type="radio" name="interest" value="node" /> Node.js</label>

// ✅ CORRECT - Checkboxes for multiple selection
// User can select multiple interests
<label><input type="checkbox" name="react" /> React</label>
<label><input type="checkbox" name="node" /> Node.js</label>`}
                  </pre>
                </div>

                {/* Mistake 2 */}
                <div className="p-4 bg-red-900/20 border border-red-800/50 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <h4 className="font-bold text-red-400">Missing Labels</h4>
                  </div>
                  <pre className="bg-gray-950 p-3 rounded-lg text-xs overflow-x-auto">
{`// ❌ WRONG - Screen readers can't identify
<input type="checkbox" />
<span>Accept Terms</span>

// ✅ CORRECT - Proper label association
<label>
  <input type="checkbox" />
  Accept Terms
</label>

// ✅ ALSO CORRECT - Using htmlFor and id
<label htmlFor="terms">Accept Terms</label>
<input id="terms" type="checkbox" />`}
                  </pre>
                </div>
              </div>

              {/* Mistake 3 */}
              <div className="p-4 bg-red-900/20 border border-red-800/50 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <h4 className="font-bold text-red-400">Poor Option Organization</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-300 mb-2">❌ Bad Organization:</p>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Too many radio buttons (7+)</li>
                      <li>• Options not in logical order</li>
                      <li>• No grouping of related options</li>
                      <li>• Inconsistent option naming</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 mb-2">✅ Good Organization:</p>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Use select for 5+ options</li>
                      <li>• Alphabetical or logical ordering</li>
                      <li>• Group related options with fieldset</li>
                      <li>• Consistent naming conventions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teacher's Note */}
        <section className="animate-[slideUp_1.8s_ease-out]">
          <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 backdrop-blur-sm rounded-2xl p-6 border border-green-700/50 hover:border-green-500/70 transition-all duration-500 group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-2xl font-bold text-green-300">Teacher's Note</h3>
                    <p className="text-green-400/80">Sukanta Hui • 27 years experience</p>
                  </div>
                  <div className="text-sm text-gray-400">
                    <p>Email: sukantahui@codernaccotax.co.in</p>
                    <p>Mobile: 7003756860</p>
                  </div>
                </div>
                
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <div className="bg-green-900/20 p-4 rounded-xl border border-green-800/30">
                    <h4 className="font-bold text-green-300 mb-2">Classroom Analogy from Naihati College</h4>
                    <p>
                      Think of checkboxes, radio buttons, and select inputs like <span className="text-yellow-300">different exam question types</span>:
                    </p>
                    <ul className="mt-2 space-y-1">
                      <li>• <strong>Checkboxes</strong> = "Select all correct answers" questions</li>
                      <li>• <strong>Radio buttons</strong> = "Choose the correct answer" questions</li>
                      <li>• <strong>Select inputs</strong> = "Choose from this list" questions</li>
                    </ul>
                    <p className="mt-2">
                      Just as Debangshu wouldn't use a multiple-choice format for "list all state capitals," 
                      we shouldn't use radio buttons for multiple selections.
                    </p>
                  </div>

                  <div className="bg-emerald-900/20 p-4 rounded-xl border border-emerald-800/30">
                    <h4 className="font-bold text-emerald-300 mb-2">Professional Insight</h4>
                    <p>
                      I once reviewed a Barrackpore startup's form that had 15 radio buttons for "Choose your skills" - 
                      users could only pick one! They lost potential customers who wanted to select multiple skills.
                    </p>
                    <p className="mt-2">
                      Remember: <span className="text-yellow-300">"The right tool for the right job"</span>. 
                      Each input type has specific strengths. Using them correctly improves both user experience 
                      and data quality.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-gray-900/40 p-4 rounded-xl">
                      <h4 className="font-bold text-blue-400 mb-2">Real-world Debugging</h4>
                      <p className="text-sm">
                        When Tuhina's form validation wasn't working:
                      </p>
                      <ol className="text-sm space-y-1 mt-2 ml-4 list-decimal">
                        <li>Checked if radio buttons had same <code>name</code> attribute</li>
                        <li>Verified checkbox state was boolean (not string)</li>
                        <li>Confirmed select value matched option values</li>
                        <li>Tested with screen reader for accessibility</li>
                      </ol>
                    </div>

                    <div className="bg-gray-900/40 p-4 rounded-xl">
                      <h4 className="font-bold text-yellow-400 mb-2">Memory Trick</h4>
                      <p className="text-sm">
                        Remember <span className="text-yellow-300">"C-R-S"</span>:
                      </p>
                      <div className="text-sm space-y-1 mt-2">
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400 font-bold">C</span>
                          <span>heckboxes = Choose Multiple</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400 font-bold">R</span>
                          <span>adio = Choose One</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400 font-bold">S</span>
                          <span>elect = Space-saving List</span>
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
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-purple-500/30 transition-all duration-500">
            <h2 className="text-2xl font-bold text-purple-300 mb-6 flex items-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Mini Checklist
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Use checkboxes for multiple independent selections",
                "Use radio buttons for mutually exclusive single selections",
                "Use select inputs for 5+ options to save space",
                "Always include labels for accessibility",
                "Group related inputs with fieldset and legend",
                "Provide default values for better UX",
                "Validate checkbox groups (at least one checked)",
                "Ensure radio buttons in a group share the same name",
                "Order select options logically (alphabetical, frequency)",
                "Consider mobile touch targets (min 44px)",
                "Use checkboxes for binary yes/no decisions",
                "Test with screen readers for accessibility",
                "Provide clear visual feedback on selection",
                "Use consistent styling across input types",
                "Consider using custom styled checkboxes/radios for better UX"
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-4 bg-gray-900/40 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-purple-500/30 transition-colors">
                    <span className="text-purple-400 font-bold text-sm">{index + 1}</span>
                  </div>
                  <span className="text-gray-300 group-hover:text-purple-200 transition-colors">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl border border-purple-700/30">
              <h4 className="font-bold text-pink-300 mb-2">Hint Section</h4>
              <p className="text-gray-300">
                <span className="text-yellow-300">Think about:</span> How would Abhronila design a course filter for 
                the Shyamnagar coding platform? Users might want to filter by skill level (radio), 
                topics (checkboxes), and duration (select). Each input type serves a specific purpose 
                in creating an intuitive filtering experience.
                <br /><br />
                <span className="text-cyan-300">Try this:</span> Convert the radio button demo to use checkboxes 
                and vice versa. Notice how the user experience changes and what validation challenges arise.
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

export default Topic21;