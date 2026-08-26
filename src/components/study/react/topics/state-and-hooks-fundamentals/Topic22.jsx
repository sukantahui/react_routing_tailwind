import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

const Topic22 = () => {
  // Form state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    age: '',
    bio: '',
    website: '',
    acceptTerms: false,
    newsletter: true
  });

  // Validation state
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);
  const [showLiveValidation, setShowLiveValidation] = useState(true);

  // Validation rules
  const validationRules = {
    username: {
      required: true,
      minLength: 3,
      maxLength: 20,
      pattern: /^[a-zA-Z0-9_]+$/,
      message: 'Username must be 3-20 characters (letters, numbers, underscores only)'
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address'
    },
    password: {
      required: true,
      minLength: 8,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      message: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character'
    },
    confirmPassword: {
      required: true,
      match: 'password',
      message: 'Passwords must match'
    },
    phone: {
      pattern: /^[0-9]{10}$/,
      message: 'Phone must be 10 digits'
    },
    age: {
      min: 13,
      max: 120,
      message: 'Age must be between 13 and 120'
    },
    bio: {
      maxLength: 200,
      message: 'Bio cannot exceed 200 characters'
    },
    website: {
      pattern: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
      message: 'Please enter a valid website URL'
    },
    acceptTerms: {
      required: true,
      message: 'You must accept the terms and conditions'
    }
  };

  // Validate a single field
  const validateField = (name, value) => {
    const rules = validationRules[name];
    if (!rules) return '';

    // Check required
    if (rules.required && !value && value !== false) {
      return 'This field is required';
    }

    // Check boolean (checkbox)
    if (typeof value === 'boolean' && rules.required && !value) {
      return rules.message;
    }

    // Check minLength for strings
    if (rules.minLength && value.length < rules.minLength) {
      return rules.message;
    }

    // Check maxLength for strings
    if (rules.maxLength && value.length > rules.maxLength) {
      return rules.message;
    }

    // Check pattern
    if (rules.pattern && value && !rules.pattern.test(value)) {
      return rules.message;
    }

    // Check min for numbers
    if (rules.min && parseInt(value) < rules.min) {
      return rules.message;
    }

    // Check max for numbers
    if (rules.max && parseInt(value) > rules.max) {
      return rules.message;
    }

    // Check password match
    if (rules.match && value !== formData[rules.match]) {
      return rules.message;
    }

    return '';
  };

  // Validate all fields
  const validateAll = () => {
    const newErrors = {};
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change with validation
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Validate on change if field has been touched
    if (touched[name] && showLiveValidation) {
      const error = validateField(name, newValue);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }

    // Special case: validate confirmPassword when password changes
    if (name === 'password' && touched.confirmPassword) {
      const confirmError = validateField('confirmPassword', formData.confirmPassword);
      setErrors(prev => ({
        ...prev,
        confirmPassword: confirmError
      }));
    }
  };

  // Handle blur (field touched)
  const handleBlur = (e) => {
    const { name } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate on blur
    if (showLiveValidation) {
      const error = validateField(name, formData[name]);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);
    
    // Validate all fields
    const isValid = validateAll();
    
    if (!isValid) {
      alert('Please fix validation errors before submitting');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitCount(prev => prev + 1);
    
    // Show success message
    alert(`Registration successful! Welcome ${formData.username}`);
    
    // Reset form (keep newsletter preference)
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      age: '',
      bio: '',
      website: '',
      acceptTerms: false,
      newsletter: formData.newsletter
    });
    
    setTouched({});
    setErrors({});
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      age: '',
      bio: '',
      website: '',
      acceptTerms: false,
      newsletter: true
    });
    setTouched({});
    setErrors({});
  };

  // Load sample data
  const loadSampleData = () => {
    setFormData({
      username: 'swadeep_das',
      email: 'swadeep@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!',
      phone: '9876543210',
      age: '22',
      bio: 'Web developer from Barrackpore passionate about React and modern web technologies.',
      website: 'https://swadeep.dev',
      acceptTerms: true,
      newsletter: true
    });
  };

  // Calculate form completion percentage
  const calculateCompletion = () => {
    const totalFields = Object.keys(formData).length;
    const validFields = Object.keys(formData).filter(key => {
      const error = validateField(key, formData[key]);
      return !error;
    }).length;
    
    return Math.round((validFields / totalFields) * 100);
  };

  // Show password strength
  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, label: 'Empty', color: 'gray' };
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    
    // Character type checks
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[@$!%*?&]/.test(password)) strength += 1;
    
    const strengths = [
      { strength: 0, label: 'Very Weak', color: 'red' },
      { strength: 1, label: 'Weak', color: 'red' },
      { strength: 2, label: 'Fair', color: 'yellow' },
      { strength: 3, label: 'Good', color: 'green' },
      { strength: 4, label: 'Strong', color: 'green' },
      { strength: 5, label: 'Very Strong', color: 'emerald' },
      { strength: 6, label: 'Excellent', color: 'emerald' }
    ];
    
    return strengths[Math.min(strength, strengths.length - 1)];
  };

  // Check if field should show error
  const shouldShowError = (fieldName) => {
    return touched[fieldName] && errors[fieldName];
  };

  // Validation modes
  const validationModes = [
    { id: 'onsubmit', label: 'On Submit', description: 'Validate only on form submission' },
    { id: 'onblur', label: 'On Blur', description: 'Validate when user leaves field' },
    { id: 'onchange', label: 'On Change', description: 'Validate with every keystroke' }
  ];
  const [validationMode, setValidationMode] = useState('onblur');

  // Update validation based on mode
  useEffect(() => {
    setShowLiveValidation(validationMode !== 'onsubmit');
  }, [validationMode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-gray-200 p-4 md:p-6 transition-colors duration-300">
      {/* Header Section */}
      <header className="max-w-6xl mx-auto mb-10">
        <div className="animate-[slideUp_0.8s_ease-out]">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-300 bg-clip-text text-transparent mb-3">
            Topic 22: Basic Form Validation with State
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Implement robust form validation using React state management
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto space-y-10">
        {/* Concept Explanation */}
        <section className="animate-[slideUp_1s_ease-out]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-amber-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-900/10">
            <h2 className="text-2xl font-bold text-amber-300 mb-4 flex items-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Why Form Validation Matters
            </h2>
            
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Benefits */}
                <div className="bg-amber-900/20 p-5 rounded-xl border border-amber-800/50">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center">
                      <span className="text-amber-400 font-bold">🎯</span>
                    </div>
                    <h3 className="text-xl font-bold text-amber-400">Validation Benefits</h3>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Better UX:</strong> Immediate feedback to users</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Data Quality:</strong> Clean, valid data sent to server</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Security:</strong> Prevent malicious input</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Reduced Server Load:</strong> Catch errors client-side first</span>
                    </li>
                  </ul>
                </div>

                {/* Validation Types */}
                <div className="bg-orange-900/20 p-5 rounded-xl border border-orange-800/50">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                      <span className="text-orange-400 font-bold">📋</span>
                    </div>
                    <h3 className="text-xl font-bold text-orange-400">Validation Types</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <span className="font-medium text-gray-300">Client-side</span>
                        <p className="text-xs text-gray-500">Instant feedback in browser</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div>
                        <span className="font-medium text-gray-300">Server-side</span>
                        <p className="text-xs text-gray-500">Final validation on server</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <div>
                        <span className="font-medium text-gray-300">Real-time</span>
                        <p className="text-xs text-gray-500">Validate as user types</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div>
                        <span className="font-medium text-gray-300">On Submit</span>
                        <p className="text-xs text-gray-500">Validate all at once</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 p-4 rounded-lg border-l-4 border-cyan-500">
                <h3 className="font-bold text-lg text-cyan-300 mb-2">The Validation Flow</h3>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 my-4">
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 text-center">
                    <div className="text-cyan-400 font-bold">User Input</div>
                    <div className="text-xs text-gray-500">User types in field</div>
                  </div>
                  
                  <svg className="w-6 h-6 text-cyan-400 rotate-90 md:rotate-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 text-center">
                    <div className="text-cyan-400 font-bold">Validation Rules</div>
                    <div className="text-xs text-gray-500">Check against rules</div>
                  </div>
                  
                  <svg className="w-6 h-6 text-cyan-400 rotate-90 md:rotate-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 text-center">
                    <div className="text-cyan-400 font-bold">Error State</div>
                    <div className="text-xs text-gray-500">Update errors state</div>
                  </div>
                  
                  <svg className="w-6 h-6 text-cyan-400 rotate-90 md:rotate-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 text-center">
                    <div className="text-cyan-400 font-bold">UI Feedback</div>
                    <div className="text-xs text-gray-500">Show errors to user</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Controls & Stats */}
        <section className="animate-[slideUp_1.1s_ease-out]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Progress Bar */}
              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-300">Form Validation Progress</h3>
                  <span className="text-cyan-400 font-bold">{calculateCompletion()}% Valid</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-cyan-500 transition-all duration-500"
                    style={{ width: `${calculateCompletion()}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>Fields valid: {Object.keys(formData).filter(key => !validateField(key, formData[key])).length}/{Object.keys(formData).length}</span>
                  <span>Errors: {Object.keys(errors).filter(key => errors[key]).length}</span>
                </div>
              </div>

              {/* Validation Mode Selector */}
              <div>
                <label className="block text-gray-400 mb-2 text-sm">Validation Mode</label>
                <select
                  value={validationMode}
                  onChange={(e) => setValidationMode(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-sm"
                >
                  {validationModes.map(mode => (
                    <option key={mode.id} value={mode.id}>
                      {mode.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {validationModes.find(m => m.id === validationMode)?.description}
                </p>
              </div>
            </div>

            {/* Sample Data Button */}
            <div className="mt-4 flex gap-3">
              <button
                onClick={loadSampleData}
                className="px-4 py-2 bg-amber-900/30 text-amber-300 rounded-lg hover:bg-amber-800/50 border border-amber-800/50 transition-all duration-300 text-sm"
              >
                Load Sample Data (Swadeep's Info)
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 border border-gray-700 transition-all duration-300 text-sm"
              >
                Reset Form
              </button>
            </div>
          </div>
        </section>

        {/* Main Form Section */}
        <section className="animate-[slideUp_1.2s_ease-out]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-amber-500/30 transition-all duration-500">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Form Column */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
                    <h2 className="text-2xl font-bold text-amber-300 mb-4">Student Registration</h2>
                    
                    <div className="space-y-6">
                      {/* Username */}
                      <div>
                        <label className="block text-gray-400 mb-2">
                          Username *
                          {shouldShowError('username') && (
                            <span className="ml-2 text-red-400 text-sm">({errors.username})</span>
                          )}
                        </label>
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={clsx(
                            "w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 transition-all",
                            shouldShowError('username')
                              ? "border-red-500 focus:ring-red-500/50"
                              : touched.username && !errors.username
                              ? "border-green-500 focus:ring-green-500/50"
                              : "border-gray-700 focus:border-amber-500 focus:ring-amber-500/50"
                          )}
                          placeholder="swadeep_das"
                        />
                        <div className="flex justify-between mt-2">
                          <div className="text-sm text-gray-500">
                            {formData.username.length > 0 ? (
                              <span className={clsx(
                                "flex items-center gap-1",
                                validateField('username', formData.username) ? "text-red-400" : "text-green-400"
                              )}>
                                {validateField('username', formData.username) ? '✗ Invalid' : '✓ Valid'}
                              </span>
                            ) : (
                              <span>3-20 characters, letters, numbers, underscores</span>
                            )}
                          </div>
                          <div className={clsx(
                            "text-sm",
                            formData.username.length > validationRules.username.maxLength ? "text-red-400" : "text-gray-500"
                          )}>
                            {formData.username.length}/{validationRules.username.maxLength}
                          </div>
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-gray-400 mb-2">
                          Email Address *
                          {shouldShowError('email') && (
                            <span className="ml-2 text-red-400 text-sm">({errors.email})</span>
                          )}
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={clsx(
                            "w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 transition-all",
                            shouldShowError('email')
                              ? "border-red-500 focus:ring-red-500/50"
                              : touched.email && !errors.email
                              ? "border-green-500 focus:ring-green-500/50"
                              : "border-gray-700 focus:border-amber-500 focus:ring-amber-500/50"
                          )}
                          placeholder="swadeep@example.com"
                        />
                        {touched.email && !errors.email && formData.email && (
                          <div className="mt-2 flex items-center gap-2 text-green-400 text-sm">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Valid email format</span>
                          </div>
                        )}
                      </div>

                      {/* Password */}
                      <div>
                        <label className="block text-gray-400 mb-2">
                          Password *
                          {shouldShowError('password') && (
                            <span className="ml-2 text-red-400 text-sm">({errors.password})</span>
                          )}
                        </label>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={clsx(
                            "w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 transition-all",
                            shouldShowError('password')
                              ? "border-red-500 focus:ring-red-500/50"
                              : touched.password && !errors.password
                              ? "border-green-500 focus:ring-green-500/50"
                              : "border-gray-700 focus:border-amber-500 focus:ring-amber-500/50"
                          )}
                          placeholder="••••••••"
                        />
                        
                        {/* Password Strength */}
                        {formData.password && (
                          <div className="mt-3 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Password strength:</span>
                              <span className={clsx(
                                "font-medium",
                                getPasswordStrength().color === 'red' && "text-red-400",
                                getPasswordStrength().color === 'yellow' && "text-yellow-400",
                                getPasswordStrength().color === 'green' && "text-green-400",
                                getPasswordStrength().color === 'emerald' && "text-emerald-400"
                              )}>
                                {getPasswordStrength().label}
                              </span>
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className={clsx(
                                  "h-full transition-all duration-500",
                                  getPasswordStrength().color === 'red' && "bg-red-500 w-1/4",
                                  getPasswordStrength().color === 'yellow' && "bg-yellow-500 w-2/4",
                                  getPasswordStrength().color === 'green' && "bg-green-500 w-3/4",
                                  getPasswordStrength().color === 'emerald' && "bg-emerald-500 w-full"
                                )}
                              />
                            </div>
                            
                            {/* Password Requirements */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
                              {[
                                { label: '8+ chars', test: formData.password.length >= 8 },
                                { label: 'Lowercase', test: /[a-z]/.test(formData.password) },
                                { label: 'Uppercase', test: /[A-Z]/.test(formData.password) },
                                { label: 'Number', test: /[0-9]/.test(formData.password) },
                                { label: 'Special', test: /[@$!%*?&]/.test(formData.password) }
                              ].map((req, idx) => (
                                <div key={idx} className="flex items-center gap-1">
                                  <div className={clsx(
                                    "w-2 h-2 rounded-full",
                                    req.test ? "bg-green-500" : "bg-gray-600"
                                  )} />
                                  <span className={clsx(
                                    "text-xs",
                                    req.test ? "text-green-400" : "text-gray-500"
                                  )}>
                                    {req.label}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Confirm Password */}
                      <div>
                        <label className="block text-gray-400 mb-2">
                          Confirm Password *
                          {shouldShowError('confirmPassword') && (
                            <span className="ml-2 text-red-400 text-sm">({errors.confirmPassword})</span>
                          )}
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={clsx(
                            "w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 transition-all",
                            shouldShowError('confirmPassword')
                              ? "border-red-500 focus:ring-red-500/50"
                              : touched.confirmPassword && !errors.confirmPassword && formData.confirmPassword
                              ? formData.password === formData.confirmPassword
                                ? "border-green-500 focus:ring-green-500/50"
                                : "border-red-500 focus:ring-red-500/50"
                              : "border-gray-700 focus:border-amber-500 focus:ring-amber-500/50"
                          )}
                          placeholder="••••••••"
                        />
                        {touched.confirmPassword && formData.confirmPassword && (
                          <div className="mt-2 flex items-center gap-2 text-sm">
                            {formData.password === formData.confirmPassword ? (
                              <span className="text-green-400 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Passwords match
                              </span>
                            ) : (
                              <span className="text-red-400 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                Passwords don't match
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Phone & Age */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-gray-400 mb-2">
                            Phone Number
                            {shouldShowError('phone') && (
                              <span className="ml-2 text-red-400 text-sm">({errors.phone})</span>
                            )}
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={clsx(
                              "w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 transition-all",
                              shouldShowError('phone')
                                ? "border-red-500 focus:ring-red-500/50"
                                : touched.phone && !errors.phone && formData.phone
                                ? "border-green-500 focus:ring-green-500/50"
                                : "border-gray-700 focus:border-amber-500 focus:ring-amber-500/50"
                            )}
                            placeholder="9876543210"
                          />
                          <div className="text-sm text-gray-500 mt-1">
                            Optional - 10 digits only
                          </div>
                        </div>

                        <div>
                          <label className="block text-gray-400 mb-2">
                            Age
                            {shouldShowError('age') && (
                              <span className="ml-2 text-red-400 text-sm">({errors.age})</span>
                            )}
                          </label>
                          <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            min="13"
                            max="120"
                            className={clsx(
                              "w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 transition-all",
                              shouldShowError('age')
                                ? "border-red-500 focus:ring-red-500/50"
                                : touched.age && !errors.age && formData.age
                                ? "border-green-500 focus:ring-green-500/50"
                                : "border-gray-700 focus:border-amber-500 focus:ring-amber-500/50"
                            )}
                            placeholder="22"
                          />
                          <div className="text-sm text-gray-500 mt-1">
                            Must be 13-120 years
                          </div>
                        </div>
                      </div>

                      {/* Bio */}
                      <div>
                        <label className="block text-gray-400 mb-2">
                          Bio
                          {shouldShowError('bio') && (
                            <span className="ml-2 text-red-400 text-sm">({errors.bio})</span>
                          )}
                        </label>
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          rows="3"
                          className={clsx(
                            "w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 transition-all",
                            shouldShowError('bio')
                              ? "border-red-500 focus:ring-red-500/50"
                              : touched.bio && !errors.bio && formData.bio
                              ? "border-green-500 focus:ring-green-500/50"
                              : "border-gray-700 focus:border-amber-500 focus:ring-amber-500/50"
                          )}
                          placeholder="Tell us about yourself..."
                        />
                        <div className="flex justify-between mt-2">
                          <div className="text-sm text-gray-500">
                            Brief introduction (optional)
                          </div>
                          <div className={clsx(
                            "text-sm",
                            formData.bio.length > validationRules.bio.maxLength ? "text-red-400" : "text-gray-500"
                          )}>
                            {formData.bio.length}/{validationRules.bio.maxLength}
                          </div>
                        </div>
                      </div>

                      {/* Website */}
                      <div>
                        <label className="block text-gray-400 mb-2">
                          Website
                          {shouldShowError('website') && (
                            <span className="ml-2 text-red-400 text-sm">({errors.website})</span>
                          )}
                        </label>
                        <input
                          type="url"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={clsx(
                            "w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 transition-all",
                            shouldShowError('website')
                              ? "border-red-500 focus:ring-red-500/50"
                              : touched.website && !errors.website && formData.website
                              ? "border-green-500 focus:ring-green-500/50"
                              : "border-gray-700 focus:border-amber-500 focus:ring-amber-500/50"
                          )}
                          placeholder="https://yourwebsite.com"
                        />
                        <div className="text-sm text-gray-500 mt-1">
                          Optional - personal website or portfolio
                        </div>
                      </div>

                      {/* Checkboxes */}
                      <div className="space-y-4">
                        <div className="p-3 bg-gray-800/40 rounded-lg">
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              name="acceptTerms"
                              checked={formData.acceptTerms}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={clsx(
                                "w-4 h-4 mt-1 rounded focus:ring-2 transition-all",
                                shouldShowError('acceptTerms')
                                  ? "text-red-500 bg-gray-800 border-red-500 focus:ring-red-500/50"
                                  : "text-amber-500 bg-gray-800 border-gray-700 focus:ring-amber-500/50"
                              )}
                            />
                            <div>
                              <span className="text-gray-300">I accept the terms and conditions *</span>
                              {shouldShowError('acceptTerms') && (
                                <p className="text-red-400 text-sm mt-1">{errors.acceptTerms}</p>
                              )}
                              <p className="text-sm text-gray-500 mt-1">
                                By checking this box, you agree to our Terms of Service and Privacy Policy.
                              </p>
                            </div>
                          </label>
                        </div>

                        <div className="p-3 bg-gray-800/40 rounded-lg">
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              name="newsletter"
                              checked={formData.newsletter}
                              onChange={handleChange}
                              className="w-4 h-4 mt-1 text-amber-500 bg-gray-800 border-gray-700 rounded focus:ring-amber-500 focus:ring-2"
                            />
                            <div>
                              <span className="text-gray-300">Subscribe to newsletter</span>
                              <p className="text-sm text-gray-500 mt-1">
                                Receive updates about new courses and coding tips
                              </p>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={clsx(
                        "flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2",
                        isSubmitting
                          ? "bg-gray-800 text-gray-400 border border-gray-700 cursor-not-allowed"
                          : "bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700"
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Validating & Submitting...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Submit Registration
                        </>
                      )}
                    </button>
                  </div>

                  <div className="text-center text-sm text-gray-500">
                    * Required fields
                  </div>
                </form>
              </div>

              {/* Validation Sidebar */}
              <div className="space-y-6">
                {/* Validation Rules */}
                <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
                  <h3 className="text-xl font-bold text-gray-300 mb-4">Validation Rules</h3>
                  
                  <div className="space-y-4">
                    {Object.entries(validationRules).map(([field, rules]) => (
                      <div key={field} className="p-3 bg-gray-800/40 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-bold text-cyan-400 capitalize">{field}</h4>
                            <div className="text-xs text-gray-500 mt-1">
                              {rules.required && <span className="text-red-400 mr-2">Required</span>}
                              {rules.minLength && <span className="text-amber-400 mr-2">Min: {rules.minLength}</span>}
                              {rules.maxLength && <span className="text-amber-400 mr-2">Max: {rules.maxLength}</span>}
                              {rules.min && <span className="text-amber-400 mr-2">Min: {rules.min}</span>}
                              {rules.max && <span className="text-amber-400 mr-2">Max: {rules.max}</span>}
                            </div>
                          </div>
                          <div className={clsx(
                            "w-6 h-6 rounded-full flex items-center justify-center",
                            validateField(field, formData[field])
                              ? "bg-red-500/20"
                              : "bg-green-500/20"
                          )}>
                            {validateField(field, formData[field]) ? (
                              <span className="text-red-400 text-sm">✗</span>
                            ) : (
                              <span className="text-green-400 text-sm">✓</span>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-400">{rules.message}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Error Summary */}
                <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-300">Error Summary</h3>
                    <span className={clsx(
                      "px-2 py-1 rounded text-sm",
                      Object.keys(errors).filter(key => errors[key]).length > 0
                        ? "bg-red-900/30 text-red-400 border border-red-800/50"
                        : "bg-green-900/30 text-green-400 border border-green-800/50"
                    )}>
                      {Object.keys(errors).filter(key => errors[key]).length} errors
                    </span>
                  </div>
                  
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {Object.keys(errors).filter(key => errors[key]).length > 0 ? (
                      Object.entries(errors)
                        .filter(([_, error]) => error)
                        .map(([field, error]) => (
                          <div key={field} className="p-3 bg-red-900/20 rounded-lg border border-red-800/30">
                            <div className="flex items-start gap-2">
                              <svg className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                              </svg>
                              <div>
                                <p className="font-medium text-red-300 capitalize">{field}</p>
                                <p className="text-sm text-gray-300">{error}</p>
                              </div>
                            </div>
                          </div>
                        ))
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        <svg className="w-8 h-8 mx-auto mb-2 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm">No validation errors</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Form Statistics */}
                <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
                  <h3 className="text-xl font-bold text-gray-300 mb-4">Form Statistics</h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gray-800/40 rounded-lg">
                        <div className="text-2xl font-bold text-amber-400">{submitCount}</div>
                        <div className="text-sm text-gray-400">Successful Submissions</div>
                      </div>
                      <div className="text-center p-3 bg-gray-800/40 rounded-lg">
                        <div className="text-2xl font-bold text-cyan-400">{calculateCompletion()}%</div>
                        <div className="text-sm text-gray-400">Form Completion</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Touched Fields:</span>
                        <span className="text-gray-300">{Object.keys(touched).filter(key => touched[key]).length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Valid Fields:</span>
                        <span className="text-green-400">
                          {Object.keys(formData).filter(key => !validateField(key, formData[key])).length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Invalid Fields:</span>
                        <span className="text-red-400">
                          {Object.keys(formData).filter(key => validateField(key, formData[key])).length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Validation Patterns */}
        <section className="animate-[slideUp_1.4s_ease-out]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-blue-500/30 transition-all duration-500">
            <h2 className="text-2xl font-bold text-blue-300 mb-6 flex items-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Validation Patterns & Code
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Pattern 1: Validation Rules Object */}
              <div className="group bg-gray-900/40 p-5 rounded-xl border border-gray-700 hover:border-blue-500/40 transition-all duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <span className="text-blue-400 font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-blue-400">Rules Object Pattern</h3>
                </div>
                <pre className="bg-gray-950 p-4 rounded-lg overflow-x-auto text-xs">
{`// Define validation rules separately
const validationRules = {
  username: {
    required: true,
    minLength: 3,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9_]+$/,
    message: 'Invalid username'
  },
  email: {
    required: true,
    pattern: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,
    message: 'Invalid email'
  }
};

// Generic validation function
const validateField = (name, value) => {
  const rules = validationRules[name];
  if (!rules) return '';
  
  if (rules.required && !value) {
    return rules.message;
  }
  
  if (rules.pattern && !rules.pattern.test(value)) {
    return rules.message;
  }
  
  return '';
};`}
                </pre>
                <div className="mt-3 p-3 bg-blue-900/20 rounded-lg">
                  <h4 className="font-bold text-blue-300 text-sm">Benefits:</h4>
                  <p className="text-xs text-gray-300 mt-1">
                    Clean separation of concerns, reusable validation logic
                  </p>
                </div>
              </div>

              {/* Pattern 2: Touched State */}
              <div className="group bg-gray-900/40 p-5 rounded-xl border border-gray-700 hover:border-green-500/40 transition-all duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                    <span className="text-green-400 font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-green-400">Touched State Pattern</h3>
                </div>
                <pre className="bg-gray-950 p-4 rounded-lg overflow-x-auto text-xs">
{`// Track which fields user has interacted with
const [touched, setTouched] = useState({});

// Only show errors after field is touched
const shouldShowError = (fieldName) => {
  return touched[fieldName] && errors[fieldName];
};

// Mark field as touched on blur
const handleBlur = (e) => {
  const { name } = e.target;
  setTouched(prev => ({ ...prev, [name]: true }));
  
  // Validate on blur
  const error = validateField(name, formData[name]);
  setErrors(prev => ({ ...prev, [name]: error }));
};

// In JSX
<input
  onBlur={handleBlur}
  className={shouldShowError('field') ? 'error' : ''}
/>`}
                </pre>
                <div className="mt-3 p-3 bg-green-900/20 rounded-lg">
                  <h4 className="font-bold text-green-300 text-sm">Benefits:</h4>
                  <p className="text-xs text-gray-300 mt-1">
                    Better UX - don't show errors until user interacts
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Validation Strategies */}
        <section className="animate-[slideUp_1.6s_ease-out]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-purple-500/30 transition-all duration-500">
            <h2 className="text-2xl font-bold text-purple-300 mb-6 flex items-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              Validation Strategies Comparison
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-300">Strategy</th>
                    <th className="text-left py-3 px-4 text-green-400">Pros</th>
                    <th className="text-left py-3 px-4 text-red-400">Cons</th>
                    <th className="text-left py-3 px-4 text-blue-400">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      strategy: 'On Submit',
                      pros: 'Simple to implement, less overwhelming',
                      cons: 'Poor UX, user finds errors late',
                      bestFor: 'Simple forms, admin panels'
                    },
                    {
                      strategy: 'On Blur',
                      pros: 'Good balance, validates after interaction',
                      cons: 'Delayed feedback while typing',
                      bestFor: 'Most production forms'
                    },
                    {
                      strategy: 'On Change',
                      pros: 'Immediate feedback, great UX',
                      cons: 'Can be overwhelming, performance concerns',
                      bestFor: 'Forms with complex validation'
                    },
                    {
                      strategy: 'Debounced On Change',
                      pros: 'Immediate but not overwhelming',
                      cons: 'More complex implementation',
                      bestFor: 'Search, complex forms'
                    },
                    {
                      strategy: 'Mixed Approach',
                      pros: 'Best of all worlds',
                      cons: 'Complex state management',
                      bestFor: 'Enterprise applications'
                    }
                  ].map((row, index) => (
                    <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                      <td className="py-3 px-4 text-gray-300 font-medium">{row.strategy}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>{row.pros}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span>{row.cons}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>{row.bestFor}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-purple-900/20 rounded-lg border border-purple-800/30">
              <h3 className="font-bold text-purple-400 mb-2">Recommendation</h3>
              <p className="text-sm text-gray-300">
                For most applications, use <span className="text-amber-400">On Blur validation</span> for 
                required fields and <span className="text-amber-400">On Change validation</span> for 
                fields with character limits or complex patterns (like password strength). 
                Always validate everything <span className="text-amber-400">On Submit</span> as a final check.
              </p>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="animate-[slideUp_1.8s_ease-out]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-red-500/30 transition-all duration-500">
            <h2 className="text-2xl font-bold text-red-300 mb-6 flex items-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Common Validation Mistakes
            </h2>

            <div className="space-y-6">
              {/* Mistake 1 */}
              <div className="p-4 bg-red-900/20 border border-red-800/50 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-400 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-400 mb-2">Showing Errors Too Early</h4>
                    <pre className="bg-gray-950 p-3 rounded-lg text-xs overflow-x-auto">
{`// ❌ WRONG - Shows error immediately
const [errors, setErrors] = useState({});

// Validate on every change
const handleChange = (e) => {
  const error = validateField(name, value);
  setErrors(prev => ({ ...prev, [name]: error }));
  // User sees error while typing first character!
};

// ✅ CORRECT - Use touched state
const [touched, setTouched] = useState({});

const shouldShowError = (field) => {
  return touched[field] && errors[field];
};

// Only validate after user interacts
const handleBlur = (e) => {
  setTouched(prev => ({ ...prev, [name]: true }));
  // Now validate...
};`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Mistake 2 */}
              <div className="p-4 bg-red-900/20 border border-red-800/50 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-400 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-400 mb-2">Inconsistent Error Messages</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-300 mb-2">❌ Inconsistent:</p>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>"Email is required"</li>
                          <li>"Please enter password"</li>
                          <li>"Username needed"</li>
                          <li>"Must accept terms"</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm text-gray-300 mb-2">✅ Consistent:</p>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>"Email is required"</li>
                          <li>"Password is required"</li>
                          <li>"Username is required"</li>
                          <li>"Terms acceptance is required"</li>
                        </ul>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mt-3">
                      <span className="text-green-400">Tip:</span> Use a consistent pattern for all error messages
                    </p>
                  </div>
                </div>
              </div>

              {/* Best Practices */}
              <div className="p-4 bg-green-900/20 border border-green-800/50 rounded-xl">
                <h4 className="font-bold text-green-400 mb-3">Validation Best Practices</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-bold text-green-300 text-sm mb-2">✅ Do These</h5>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Use touched state to avoid showing errors too early</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Provide helpful, specific error messages</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Validate on blur for better UX</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-bold text-red-300 text-sm mb-2">❌ Avoid These</h5>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span>Don't show generic "Invalid input" messages</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span>Don't rely only on client-side validation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span>Don't validate on every keystroke (performance)</span>
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
          <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 backdrop-blur-sm rounded-2xl p-6 border border-amber-700/50 hover:border-amber-500/70 transition-all duration-500 group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-2xl font-bold text-amber-300">Teacher's Note</h3>
                    <p className="text-amber-400/80">Sukanta Hui • 27 years experience</p>
                  </div>
                  <div className="text-sm text-gray-400">
                    <p>Email: sukantahui@codernaccotax.co.in</p>
                    <p>Mobile: 7003756860</p>
                  </div>
                </div>
                
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <div className="bg-amber-900/20 p-4 rounded-xl border border-amber-800/30">
                    <h4 className="font-bold text-amber-300 mb-2">Classroom Analogy from Shyamnagar School</h4>
                    <p>
                      Think of form validation like <span className="text-yellow-300">grading homework</span>. 
                      When Tuhina submits her assignment, I don't point out every mistake as she writes 
                      (that's overwhelming). I wait until she finishes a section (on blur), then provide 
                      feedback. Only at the end (on submit) do I check everything thoroughly.
                    </p>
                    <p className="mt-2">
                      Just like I wouldn't say "Wrong!" when she writes the first letter of her name, 
                      we shouldn't show validation errors on the first keystroke.
                    </p>
                  </div>

                  <div className="bg-orange-900/20 p-4 rounded-xl border border-orange-800/30">
                    <h4 className="font-bold text-orange-300 mb-2">Professional Insight</h4>
                    <p>
                      I once worked with a Barrackpore startup that had perfect validation logic 
                      but terrible UX. They validated every field on every keystroke - users felt 
                      like they were being watched and criticized constantly. Form completion rates 
                      were terrible!
                    </p>
                    <p className="mt-2">
                      Remember: <span className="text-yellow-300">"Validate like a good teacher - help, don't harass"</span>. 
                      Good validation guides users to success, doesn't punish them for trying.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-gray-900/40 p-4 rounded-xl">
                      <h4 className="font-bold text-cyan-400 mb-2">Real-world Debugging</h4>
                      <p className="text-sm">
                        When Abhronila's validation wasn't working:
                      </p>
                      <ol className="text-sm space-y-1 mt-2 ml-4 list-decimal">
                        <li>Checked if <code>touched</code> state was updating</li>
                        <li>Verified regex patterns matched expected values</li>
                        <li>Console.logged validation results for each field</li>
                        <li>Tested edge cases (empty, min, max values)</li>
                        <li>Checked for typos in field names</li>
                      </ol>
                    </div>

                    <div className="bg-gray-900/40 p-4 rounded-xl">
                      <h4 className="font-bold text-yellow-400 mb-2">Memory Trick</h4>
                      <p className="text-sm">
                        Remember <span className="text-yellow-300">"T-V-F"</span>:
                      </p>
                      <div className="text-sm space-y-1 mt-2">
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400 font-bold">T</span>
                          <span>ouched state (track user interaction)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400 font-bold">V</span>
                          <span>alidation rules (separate from logic)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400 font-bold">F</span>
                          <span>eedback timing (on blur, not on change)</span>
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
                "Always validate on the server (client-side is for UX only)",
                "Use touched state to avoid showing errors too early",
                "Create a separate validation rules object for maintainability",
                "Provide specific, helpful error messages",
                "Validate on blur for better user experience",
                "Use consistent error message patterns",
                "Test edge cases (empty, min, max, special characters)",
                "Consider accessibility (announce errors to screen readers)",
                "Validate password strength with visual indicators",
                "Handle checkbox validation differently (boolean values)",
                "Implement real-time validation for character limits",
                "Clear errors when user starts correcting them",
                "Validate dependent fields (password confirmation)",
                "Use proper regex patterns for email, URLs, etc.",
                "Consider performance for real-time validation"
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
                <span className="text-yellow-300">Think about:</span> How would Debangshu implement validation 
                for the Naihati student portal's registration form? Consider which fields need immediate 
                feedback (password strength) vs. which should wait until blur (email format). 
                <br /><br />
                <span className="text-cyan-300">Try this:</span> Change the validation mode from "On Blur" to 
                "On Change" and notice how the user experience changes. Which fields feel better with 
                immediate validation, and which feel overwhelming?
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

export default Topic22;