import React, { useState } from 'react';
import clsx from 'clsx';

const Topic20 = () => {
  // Main form state - single object for all inputs
  const [studentForm, setStudentForm] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    
    // Address
    street: '',
    city: 'Barrackpore',
    state: 'West Bengal',
    pincode: '',
    
    // Academic Information
    course: 'react',
    semester: '1',
    enrollmentDate: '',
    
    // Preferences
    receiveEmails: true,
    receiveSms: false,
    preferredContact: 'email',
    notificationTime: '09:00',
    
    // Emergency Contact
    emergencyName: '',
    emergencyPhone: '',
    emergencyRelation: 'parent',
    
    // Skills (array)
    skills: ['JavaScript'],
    
    // Additional Info
    bio: '',
    github: ''
  });

  // UI States
  const [activeSection, setActiveSection] = useState('personal');
  const [submittedData, setSubmittedData] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [formHistory, setFormHistory] = useState([]);
  const [viewMode, setViewMode] = useState('form'); // 'form', 'state', 'json'
  
  // Available options
  const cities = [
    'Barrackpore', 'Shyamnagar', 'Ichapur', 'Naihati', 'Kolkata', 
    'Howrah', 'Dunlop', 'Baranagar', 'Titagarh', 'Panihati'
  ];
  
  const courses = [
    { id: 'react', name: 'React Masterclass', duration: '3 months' },
    { id: 'node', name: 'Node.js Backend', duration: '4 months' },
    { id: 'python', name: 'Python Data Science', duration: '6 months' },
    { id: 'java', name: 'Java Enterprise', duration: '8 months' },
    { id: 'uiux', name: 'UI/UX Design', duration: '3 months' }
  ];
  
  const skillsList = [
    'JavaScript', 'React', 'Node.js', 'Python', 'HTML/CSS',
    'TypeScript', 'MongoDB', 'SQL', 'Git', 'Docker',
    'AWS', 'GraphQL', 'Redux', 'Next.js', 'Vue.js'
  ];

  // Generic handler for all inputs
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setStudentForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handler for radio buttons
  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setStudentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handler for skills (array)
  const handleSkillToggle = (skill) => {
    setStudentForm(prev => {
      const newSkills = prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill];
      
      return {
        ...prev,
        skills: newSkills
      };
    });
  };

  // Handler for date inputs (with validation)
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const today = new Date().toISOString().split('T')[0];
    
    if (name === 'dateOfBirth' && value > today) {
      setValidationErrors(prev => ({
        ...prev,
        dateOfBirth: 'Date of birth cannot be in the future'
      }));
    } else {
      setValidationErrors(prev => ({
        ...prev,
        dateOfBirth: ''
      }));
    }
    
    setStudentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Validate form section
  const validateSection = (section) => {
    const errors = {};
    
    switch (section) {
      case 'personal':
        if (!studentForm.firstName.trim()) errors.firstName = 'First name is required';
        if (!studentForm.lastName.trim()) errors.lastName = 'Last name is required';
        if (!studentForm.email.trim()) errors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(studentForm.email)) errors.email = 'Invalid email format';
        if (studentForm.phone && !/^\d{10}$/.test(studentForm.phone)) errors.phone = 'Phone must be 10 digits';
        break;
        
      case 'address':
        if (!studentForm.street.trim()) errors.street = 'Street address is required';
        if (!studentForm.pincode.trim()) errors.pincode = 'Pincode is required';
        else if (!/^\d{6}$/.test(studentForm.pincode)) errors.pincode = 'Pincode must be 6 digits';
        break;
        
      case 'academic':
        if (!studentForm.enrollmentDate) errors.enrollmentDate = 'Enrollment date is required';
        break;
    }
    
    setValidationErrors(prev => ({ ...prev, ...errors }));
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all sections
    const personalValid = validateSection('personal');
    const addressValid = validateSection('address');
    const academicValid = validateSection('academic');
    
    if (personalValid && addressValid && academicValid) {
      const submission = {
        ...studentForm,
        submittedAt: new Date().toLocaleTimeString(),
        id: Date.now()
      };
      
      setSubmittedData(submission);
      setFormHistory(prev => [submission, ...prev.slice(0, 4)]);
      
      // Show success message
      alert(`Registration successful! Welcome ${studentForm.firstName} ${studentForm.lastName}`);
    } else {
      alert('Please fix validation errors before submitting');
    }
  };

  // Reset form
  const handleReset = () => {
    setStudentForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      street: '',
      city: 'Barrackpore',
      state: 'West Bengal',
      pincode: '',
      course: 'react',
      semester: '1',
      enrollmentDate: '',
      receiveEmails: true,
      receiveSms: false,
      preferredContact: 'email',
      notificationTime: '09:00',
      emergencyName: '',
      emergencyPhone: '',
      emergencyRelation: 'parent',
      skills: ['JavaScript'],
      bio: '',
      github: ''
    });
    setValidationErrors({});
    setSubmittedData(null);
  };

  // Form sections
  const formSections = [
    { id: 'personal', label: 'Personal Info', icon: '👤', color: 'blue' },
    { id: 'address', label: 'Address', icon: '🏠', color: 'green' },
    { id: 'academic', label: 'Academic', icon: '🎓', color: 'purple' },
    { id: 'preferences', label: 'Preferences', icon: '⚙️', color: 'yellow' },
    { id: 'emergency', label: 'Emergency', icon: '🚨', color: 'red' },
    { id: 'skills', label: 'Skills', icon: '💻', color: 'cyan' },
    { id: 'additional', label: 'Additional', icon: '📝', color: 'pink' }
  ];

  // Get active section color
  const getActiveColor = () => {
    const section = formSections.find(s => s.id === activeSection);
    return section?.color || 'blue';
  };

  // Calculate form completion percentage
  const calculateCompletion = () => {
    const totalFields = 20; // Approximate count
    const filledFields = Object.values(studentForm).filter(value => {
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === 'boolean') return true; // Booleans are always "filled"
      return value.toString().trim().length > 0;
    }).length;
    
    return Math.round((filledFields / totalFields) * 100);
  };

  // Load sample data
  const loadSampleData = () => {
    setStudentForm({
      firstName: 'Swadeep',
      lastName: 'Das',
      email: 'swadeep@example.com',
      phone: '9876543210',
      dateOfBirth: '2000-05-15',
      street: '123 College Street',
      city: 'Barrackpore',
      state: 'West Bengal',
      pincode: '700123',
      course: 'react',
      semester: '2',
      enrollmentDate: '2024-01-15',
      receiveEmails: true,
      receiveSms: true,
      preferredContact: 'both',
      notificationTime: '10:00',
      emergencyName: 'Rohit Das',
      emergencyPhone: '9876543211',
      emergencyRelation: 'parent',
      skills: ['JavaScript', 'React', 'HTML/CSS', 'Git'],
      bio: 'Passionate about web development and open source projects.',
      github: 'github.com/swadeep'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-gray-200 p-4 md:p-6 transition-colors duration-300">
      {/* Header Section */}
      <header className="max-w-6xl mx-auto mb-10">
        <div className="animate-[slideUp_0.8s_ease-out]">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent mb-3">
            Topic 20: Handling Multiple Inputs with One State Object
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Master efficient form management in React using a single state object for all inputs
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto space-y-10">
        {/* Concept Explanation */}
        <section className="animate-[slideUp_1s_ease-out]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-purple-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-900/10">
            <h2 className="text-2xl font-bold text-purple-300 mb-4 flex items-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              The Power of Single State Object
            </h2>
            
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Benefits */}
                <div className="bg-purple-900/20 p-5 rounded-xl border border-purple-800/50">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <span className="text-purple-400 font-bold">🎯</span>
                    </div>
                    <h3 className="text-xl font-bold text-purple-400">Why Single State Object?</h3>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Single Source of Truth:</strong> All form data in one place</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Simplified Handlers:</strong> One onChange for all inputs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Easier Validation:</strong> Validate entire object at once</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Better Performance:</strong> Fewer state updates</span>
                    </li>
                  </ul>
                </div>

                {/* Pattern */}
                <div className="bg-pink-900/20 p-5 rounded-xl border border-pink-800/50">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-pink-500/20 rounded-full flex items-center justify-center">
                      <span className="text-pink-400 font-bold">📝</span>
                    </div>
                    <h3 className="text-xl font-bold text-pink-400">The Pattern</h3>
                  </div>
                  <pre className="bg-gray-950 p-3 rounded-lg text-xs overflow-x-auto">
{`// 1. Single state object
const [form, setForm] = useState({
  firstName: '',
  lastName: '',
  email: '',
  // ... all other fields
});

// 2. Generic handler
const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  setForm(prev => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : value
  }));
};

// 3. Use in all inputs
<input name="firstName" value={form.firstName} onChange={handleChange} />
<input name="lastName" value={form.lastName} onChange={handleChange} />`}
                  </pre>
                </div>
              </div>

              <div className="bg-gray-900/50 p-4 rounded-lg border-l-4 border-cyan-500">
                <h3 className="font-bold text-lg text-cyan-300 mb-2">Visualizing the Data Flow</h3>
                <div className="flex items-center justify-center my-4">
                  <div className="text-center">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                      <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-700">
                        <div className="text-purple-400 font-bold">Form State Object</div>
                        <div className="text-xs text-gray-400 mt-1">Single source of truth</div>
                      </div>
                      
                      <svg className="w-8 h-8 text-cyan-400 rotate-90 md:rotate-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      
                      <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-700">
                        <div className="text-blue-400 font-bold">Multiple Inputs</div>
                        <div className="text-xs text-gray-400 mt-1">Read from state</div>
                      </div>
                      
                      <svg className="w-8 h-8 text-cyan-400 rotate-90 md:rotate-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      
                      <div className="bg-green-900/30 p-4 rounded-lg border border-green-700">
                        <div className="text-green-400 font-bold">onChange Handler</div>
                        <div className="text-xs text-gray-400 mt-1">Updates state</div>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-400">
                      Unified state management simplifies complex forms
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Progress & Controls */}
        <section className="animate-[slideUp_1.1s_ease-out]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Progress Bar */}
              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-300">Form Completion</h3>
                  <span className="text-cyan-400 font-bold">{calculateCompletion()}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500"
                    style={{ width: `${calculateCompletion()}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Fill more fields to increase completion percentage
                </p>
              </div>

              {/* View Mode Toggle */}
              <div className="flex gap-3">
                <button
                  onClick={() => setViewMode('form')}
                  className={clsx(
                    "flex-1 py-2 rounded-lg font-medium transition-all duration-300",
                    viewMode === 'form'
                      ? "bg-purple-900/50 text-purple-300 border border-purple-700"
                      : "bg-gray-900 text-gray-400 hover:bg-gray-800 border border-gray-700"
                  )}
                >
                  Form
                </button>
                <button
                  onClick={() => setViewMode('state')}
                  className={clsx(
                    "flex-1 py-2 rounded-lg font-medium transition-all duration-300",
                    viewMode === 'state'
                      ? "bg-blue-900/50 text-blue-300 border border-blue-700"
                      : "bg-gray-900 text-gray-400 hover:bg-gray-800 border border-gray-700"
                  )}
                >
                  State
                </button>
                <button
                  onClick={() => setViewMode('json')}
                  className={clsx(
                    "flex-1 py-2 rounded-lg font-medium transition-all duration-300",
                    viewMode === 'json'
                      ? "bg-green-900/50 text-green-300 border border-green-700"
                      : "bg-gray-900 text-gray-400 hover:bg-gray-800 border border-gray-700"
                  )}
                >
                  JSON
                </button>
              </div>
            </div>

            {/* Sample Data Button */}
            <div className="mt-4">
              <button
                onClick={loadSampleData}
                className="px-4 py-2 bg-yellow-900/30 text-yellow-300 rounded-lg hover:bg-yellow-800/50 border border-yellow-800/50 transition-all duration-300 text-sm"
              >
                Load Sample Data (Swadeep's Info)
              </button>
              <p className="text-xs text-gray-500 mt-1">
                See how a complete form looks with sample student data
              </p>
            </div>
          </div>
        </section>

        {/* Main Form Section */}
        <section className="animate-[slideUp_1.2s_ease-out]">
          <div className={clsx(
            "bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-500",
            `hover:border-${getActiveColor()}-500/30`
          )}>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Form Navigation */}
              <div className="lg:w-1/4">
                <div className="sticky top-6 space-y-2">
                  <h3 className="text-lg font-bold text-gray-300 mb-3">Sections</h3>
                  {formSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={clsx(
                        "w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3",
                        activeSection === section.id
                          ? `bg-${section.color}-900/30 text-${section.color}-300 border border-${section.color}-700/50`
                          : "bg-gray-900/40 text-gray-400 hover:bg-gray-800/60 border border-gray-700"
                      )}
                    >
                      <span className="text-lg">{section.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium">{section.label}</div>
                        <div className="text-xs opacity-75">
                          {section.id === 'personal' && 'Name, email, phone...'}
                          {section.id === 'address' && 'Street, city, pincode...'}
                          {section.id === 'academic' && 'Course, semester, date...'}
                          {section.id === 'preferences' && 'Notifications, contact...'}
                          {section.id === 'emergency' && 'Contact person, phone...'}
                          {section.id === 'skills' && 'Programming skills...'}
                          {section.id === 'additional' && 'Bio, GitHub, notes...'}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Content */}
              <div className="lg:w-3/4">
                {viewMode === 'form' ? (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Personal Information */}
                    {activeSection === 'personal' && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">👤</span>
                          <h2 className="text-2xl font-bold text-blue-300">Personal Information</h2>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-gray-400 mb-2">First Name *</label>
                            <input
                              type="text"
                              name="firstName"
                              value={studentForm.firstName}
                              onChange={handleInputChange}
                              className={clsx(
                                "w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 transition-all",
                                validationErrors.firstName
                                  ? "border-red-500 focus:ring-red-500/50"
                                  : "border-gray-700 focus:border-blue-500 focus:ring-blue-500/50"
                              )}
                              placeholder="Swadeep"
                            />
                            {validationErrors.firstName && (
                              <p className="mt-1 text-red-400 text-sm">{validationErrors.firstName}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-gray-400 mb-2">Last Name *</label>
                            <input
                              type="text"
                              name="lastName"
                              value={studentForm.lastName}
                              onChange={handleInputChange}
                              className={clsx(
                                "w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 transition-all",
                                validationErrors.lastName
                                  ? "border-red-500 focus:ring-red-500/50"
                                  : "border-gray-700 focus:border-blue-500 focus:ring-blue-500/50"
                              )}
                              placeholder="Das"
                            />
                            {validationErrors.lastName && (
                              <p className="mt-1 text-red-400 text-sm">{validationErrors.lastName}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-gray-400 mb-2">Email Address *</label>
                            <input
                              type="email"
                              name="email"
                              value={studentForm.email}
                              onChange={handleInputChange}
                              className={clsx(
                                "w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 transition-all",
                                validationErrors.email
                                  ? "border-red-500 focus:ring-red-500/50"
                                  : "border-gray-700 focus:border-blue-500 focus:ring-blue-500/50"
                              )}
                              placeholder="swadeep@example.com"
                            />
                            {validationErrors.email && (
                              <p className="mt-1 text-red-400 text-sm">{validationErrors.email}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-gray-400 mb-2">Phone Number</label>
                            <input
                              type="tel"
                              name="phone"
                              value={studentForm.phone}
                              onChange={handleInputChange}
                              className={clsx(
                                "w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 transition-all",
                                validationErrors.phone
                                  ? "border-red-500 focus:ring-red-500/50"
                                  : "border-gray-700 focus:border-blue-500 focus:ring-blue-500/50"
                              )}
                              placeholder="9876543210"
                            />
                            {validationErrors.phone && (
                              <p className="mt-1 text-red-400 text-sm">{validationErrors.phone}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-gray-400 mb-2">Date of Birth</label>
                            <input
                              type="date"
                              name="dateOfBirth"
                              value={studentForm.dateOfBirth}
                              onChange={handleDateChange}
                              className={clsx(
                                "w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 transition-all",
                                validationErrors.dateOfBirth
                                  ? "border-red-500 focus:ring-red-500/50"
                                  : "border-gray-700 focus:border-blue-500 focus:ring-blue-500/50"
                              )}
                            />
                            {validationErrors.dateOfBirth && (
                              <p className="mt-1 text-red-400 text-sm">{validationErrors.dateOfBirth}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Address Information */}
                    {activeSection === 'address' && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">🏠</span>
                          <h2 className="text-2xl font-bold text-green-300">Address Information</h2>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-gray-400 mb-2">Street Address *</label>
                            <input
                              type="text"
                              name="street"
                              value={studentForm.street}
                              onChange={handleInputChange}
                              className={clsx(
                                "w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 transition-all",
                                validationErrors.street
                                  ? "border-red-500 focus:ring-red-500/50"
                                  : "border-gray-700 focus:border-green-500 focus:ring-green-500/50"
                              )}
                              placeholder="123 College Street"
                            />
                            {validationErrors.street && (
                              <p className="mt-1 text-red-400 text-sm">{validationErrors.street}</p>
                            )}
                          </div>

                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-gray-400 mb-2">City</label>
                              <select
                                name="city"
                                value={studentForm.city}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all"
                              >
                                {cities.map(city => (
                                  <option key={city} value={city}>{city}</option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-gray-400 mb-2">State</label>
                              <input
                                type="text"
                                name="state"
                                value={studentForm.state}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all"
                                placeholder="West Bengal"
                              />
                            </div>

                            <div>
                              <label className="block text-gray-400 mb-2">Pincode *</label>
                              <input
                                type="text"
                                name="pincode"
                                value={studentForm.pincode}
                                onChange={handleInputChange}
                                className={clsx(
                                  "w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 transition-all",
                                  validationErrors.pincode
                                    ? "border-red-500 focus:ring-red-500/50"
                                    : "border-gray-700 focus:border-green-500 focus:ring-green-500/50"
                                )}
                                placeholder="700123"
                              />
                              {validationErrors.pincode && (
                                <p className="mt-1 text-red-400 text-sm">{validationErrors.pincode}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Academic Information */}
                    {activeSection === 'academic' && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">🎓</span>
                          <h2 className="text-2xl font-bold text-purple-300">Academic Information</h2>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-gray-400 mb-2">Course *</label>
                            <select
                              name="course"
                              value={studentForm.course}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all"
                            >
                              {courses.map(course => (
                                <option key={course.id} value={course.id}>
                                  {course.name} ({course.duration})
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-gray-400 mb-2">Semester</label>
                            <select
                              name="semester"
                              value={studentForm.semester}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all"
                            >
                              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                <option key={num} value={num.toString()}>Semester {num}</option>
                              ))}
                            </select>
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-gray-400 mb-2">Enrollment Date *</label>
                            <input
                              type="date"
                              name="enrollmentDate"
                              value={studentForm.enrollmentDate}
                              onChange={handleDateChange}
                              className={clsx(
                                "w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 transition-all",
                                validationErrors.enrollmentDate
                                  ? "border-red-500 focus:ring-red-500/50"
                                  : "border-gray-700 focus:border-purple-500 focus:ring-purple-500/50"
                              )}
                            />
                            {validationErrors.enrollmentDate && (
                              <p className="mt-1 text-red-400 text-sm">{validationErrors.enrollmentDate}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Preferences */}
                    {activeSection === 'preferences' && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">⚙️</span>
                          <h2 className="text-2xl font-bold text-yellow-300">Preferences</h2>
                        </div>
                        
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-bold text-gray-300 mb-3">Communication Preferences</h3>
                            <div className="space-y-3">
                              <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="receiveEmails"
                                  checked={studentForm.receiveEmails}
                                  onChange={handleInputChange}
                                  className="w-4 h-4 text-yellow-500 bg-gray-800 border-gray-700 rounded focus:ring-yellow-500 focus:ring-2"
                                />
                                <div>
                                  <span className="text-gray-300">Receive email notifications</span>
                                  <p className="text-sm text-gray-500">Course updates, assignments, announcements</p>
                                </div>
                              </label>
                              
                              <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="receiveSms"
                                  checked={studentForm.receiveSms}
                                  onChange={handleInputChange}
                                  className="w-4 h-4 text-yellow-500 bg-gray-800 border-gray-700 rounded focus:ring-yellow-500 focus:ring-2"
                                />
                                <div>
                                  <span className="text-gray-300">Receive SMS alerts</span>
                                  <p className="text-sm text-gray-500">Urgent notifications and reminders</p>
                                </div>
                              </label>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-bold text-gray-300 mb-3">Preferred Contact Method</h3>
                            <div className="flex flex-wrap gap-4">
                              {[
                                { value: 'email', label: 'Email', icon: '✉️' },
                                { value: 'phone', label: 'Phone', icon: '📱' },
                                { value: 'both', label: 'Both', icon: '📞' }
                              ].map(option => (
                                <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="radio"
                                    name="preferredContact"
                                    value={option.value}
                                    checked={studentForm.preferredContact === option.value}
                                    onChange={handleRadioChange}
                                    className="w-4 h-4 text-yellow-500 bg-gray-800 border-gray-700 focus:ring-yellow-500 focus:ring-2"
                                  />
                                  <span className="text-gray-300">{option.icon} {option.label}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-gray-400 mb-2">Daily Notification Time</label>
                            <input
                              type="time"
                              name="notificationTime"
                              value={studentForm.notificationTime}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 transition-all"
                            />
                            <p className="text-sm text-gray-500 mt-1">
                              Best time to receive daily updates about your classes
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Emergency Contact */}
                    {activeSection === 'emergency' && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">🚨</span>
                          <h2 className="text-2xl font-bold text-red-300">Emergency Contact</h2>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-gray-400 mb-2">Contact Name</label>
                            <input
                              type="text"
                              name="emergencyName"
                              value={studentForm.emergencyName}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50 transition-all"
                              placeholder="Parent or guardian name"
                            />
                          </div>

                          <div>
                            <label className="block text-gray-400 mb-2">Contact Phone</label>
                            <input
                              type="tel"
                              name="emergencyPhone"
                              value={studentForm.emergencyPhone}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50 transition-all"
                              placeholder="Emergency contact number"
                            />
                          </div>

                          <div>
                            <label className="block text-gray-400 mb-2">Relationship</label>
                            <select
                              name="emergencyRelation"
                              value={studentForm.emergencyRelation}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50 transition-all"
                            >
                              <option value="parent">Parent</option>
                              <option value="sibling">Sibling</option>
                              <option value="spouse">Spouse</option>
                              <option value="friend">Friend</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Skills */}
                    {activeSection === 'skills' && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">💻</span>
                          <h2 className="text-2xl font-bold text-cyan-300">Skills & Technologies</h2>
                        </div>
                        
                        <div>
                          <label className="block text-gray-400 mb-3">Select your skills:</label>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {skillsList.map(skill => (
                              <label key={skill} className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={studentForm.skills.includes(skill)}
                                  onChange={() => handleSkillToggle(skill)}
                                  className="w-4 h-4 text-cyan-500 bg-gray-800 border-gray-700 rounded focus:ring-cyan-500 focus:ring-2"
                                />
                                <span className="text-gray-300 text-sm">{skill}</span>
                              </label>
                            ))}
                          </div>
                          <div className="mt-4 p-3 bg-gray-800/40 rounded-lg border border-gray-700">
                            <h4 className="font-bold text-cyan-400 mb-2">Selected Skills ({studentForm.skills.length})</h4>
                            <div className="flex flex-wrap gap-2">
                              {studentForm.skills.length > 0 ? (
                                studentForm.skills.map(skill => (
                                  <span key={skill} className="px-3 py-1 bg-cyan-900/30 text-cyan-300 rounded-full text-sm border border-cyan-800/50">
                                    {skill}
                                  </span>
                                ))
                              ) : (
                                <span className="text-gray-500">No skills selected yet</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Additional Information */}
                    {activeSection === 'additional' && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">📝</span>
                          <h2 className="text-2xl font-bold text-pink-300">Additional Information</h2>
                        </div>
                        
                        <div className="space-y-6">
                          <div>
                            <label className="block text-gray-400 mb-2">Bio / About You</label>
                            <textarea
                              name="bio"
                              value={studentForm.bio}
                              onChange={handleInputChange}
                              rows="4"
                              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all"
                              placeholder="Tell us about your background, interests, and goals..."
                            />
                            <p className="text-sm text-gray-500 mt-1">
                              {studentForm.bio.length}/500 characters
                            </p>
                          </div>

                          <div>
                            <label className="block text-gray-400 mb-2">GitHub Profile</label>
                            <input
                              type="url"
                              name="github"
                              value={studentForm.github}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all"
                              placeholder="https://github.com/yourusername"
                            />
                            <p className="text-sm text-gray-500 mt-1">
                              Optional - share your coding projects
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Form Actions */}
                    <div className="pt-6 border-t border-gray-700">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button
                          type="submit"
                          className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                        >
                          Submit Registration
                        </button>
                        <button
                          type="button"
                          onClick={handleReset}
                          className="py-3 px-6 bg-gray-800 text-gray-300 rounded-lg font-medium hover:bg-gray-700 border border-gray-700 transition-all duration-300"
                        >
                          Reset Form
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 mt-3">
                        All fields marked with * are required. Form data will be saved in a single state object.
                      </p>
                    </div>
                  </form>
                ) : viewMode === 'state' ? (
                  // State View
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-blue-300 mb-4">Current State Object</h2>
                    
                    <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
                      <div className="space-y-6">
                        {Object.entries(studentForm).map(([key, value]) => (
                          <div key={key} className="p-3 bg-gray-800/40 rounded-lg border border-gray-700">
                            <div className="flex justify-between items-start">
                              <div>
                                <code className="text-cyan-400 font-bold">{key}:</code>
                                <div className="mt-1">
                                  {typeof value === 'string' && (
                                    <span className="text-gray-300">
                                      "{value || <span className="text-gray-500">(empty)</span>}"
                                    </span>
                                  )}
                                  {typeof value === 'boolean' && (
                                    <span className={value ? "text-green-400" : "text-red-400"}>
                                      {value.toString()}
                                    </span>
                                  )}
                                  {Array.isArray(value) && (
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {value.map((item, idx) => (
                                        <span key={idx} className="px-2 py-1 bg-cyan-900/30 text-cyan-300 rounded text-sm">
                                          {item}
                                        </span>
                                      ))}
                                      {value.length === 0 && (
                                        <span className="text-gray-500">Empty array</span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <span className="text-xs text-gray-500 bg-gray-900 px-2 py-1 rounded">
                                {typeof value}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  // JSON View
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-green-300 mb-4">Form State as JSON</h2>
                    
                    <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-700">
                      <pre className="bg-gray-950 p-4 rounded-lg overflow-x-auto text-sm">
{JSON.stringify(studentForm, null, 2)}
                      </pre>
                      
                      <div className="mt-4 p-3 bg-green-900/20 rounded-lg border border-green-800/30">
                        <h4 className="font-bold text-green-400 mb-2">JSON Structure Benefits</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>• Easy to serialize for API calls</li>
                          <li>• Simple to validate using JSON schema</li>
                          <li>• Can be easily stored in localStorage</li>
                          <li>• Clear structure for debugging</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* State Management Patterns */}
        <section className="animate-[slideUp_1.4s_ease-out]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-cyan-500/30 transition-all duration-500">
            <h2 className="text-2xl font-bold text-cyan-300 mb-6 flex items-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              State Management Patterns
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Pattern 1: Generic Handler */}
              <div className="group bg-gray-900/40 p-5 rounded-xl border border-gray-700 hover:border-blue-500/40 transition-all duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <span className="text-blue-400 font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-blue-400">Generic Handler Pattern</h3>
                </div>
                <pre className="bg-gray-950 p-4 rounded-lg overflow-x-auto text-xs">
{`// Single handler for all inputs
const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  
  setForm(prev => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : value
  }));
};

// Use with any input
<input name="firstName" onChange={handleChange} />
<input name="email" onChange={handleChange} />
<select name="city" onChange={handleChange} />
<input type="checkbox" name="subscribe" onChange={handleChange} />`}
                </pre>
                <div className="mt-3 p-3 bg-blue-900/20 rounded-lg">
                  <h4 className="font-bold text-blue-300 text-sm">Best For:</h4>
                  <p className="text-xs text-gray-300 mt-1">
                    Simple to complex forms with consistent input types
                  </p>
                </div>
              </div>

              {/* Pattern 2: Specialized Handlers */}
              <div className="group bg-gray-900/40 p-5 rounded-xl border border-gray-700 hover:border-purple-500/40 transition-all duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <span className="text-purple-400 font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-purple-400">Specialized Handlers</h3>
                </div>
                <pre className="bg-gray-950 p-4 rounded-lg overflow-x-auto text-xs">
{`// Generic handler for most inputs
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setForm(prev => ({ ...prev, [name]: value }));
};

// Special handler for arrays (skills)
const handleSkillsChange = (skill) => {
  setForm(prev => ({
    ...prev,
    skills: prev.skills.includes(skill)
      ? prev.skills.filter(s => s !== skill)
      : [...prev.skills, skill]
  }));
};

// Special handler for dates
const handleDateChange = (name, value) => {
  setForm(prev => ({ ...prev, [name]: value }));
  // Add validation logic here
};`}
                </pre>
                <div className="mt-3 p-3 bg-purple-900/20 rounded-lg">
                  <h4 className="font-bold text-purple-300 text-sm">Best For:</h4>
                  <p className="text-xs text-gray-300 mt-1">
                    Complex forms with special validation or business logic
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits & Comparison */}
        <section className="animate-[slideUp_1.6s_ease-out]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-green-500/30 transition-all duration-500">
            <h2 className="text-2xl font-bold text-green-300 mb-6 flex items-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Benefits & Comparison
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-300">Aspect</th>
                    <th className="text-left py-3 px-4 text-green-400">Single State Object</th>
                    <th className="text-left py-3 px-4 text-red-400">Multiple useState Hooks</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      aspect: 'Code Organization',
                      single: '✅ Centralized - All form data in one place',
                      multiple: '❌ Fragmented - Data scattered across many hooks'
                    },
                    {
                      aspect: 'Handler Complexity',
                      single: '✅ Simple - One handler for all inputs',
                      multiple: '❌ Complex - Separate handler for each input'
                    },
                    {
                      aspect: 'Form Submission',
                      single: '✅ Easy - Submit entire object at once',
                      multiple: '❌ Tedious - Gather values from many states'
                    },
                    {
                      aspect: 'Validation',
                      single: '✅ Easy - Validate complete object',
                      multiple: '❌ Complex - Validate each state separately'
                    },
                    {
                      aspect: 'Reset Form',
                      single: '✅ Simple - Reset single object',
                      multiple: '❌ Complex - Reset each state individually'
                    },
                    {
                      aspect: 'Performance',
                      single: '✅ Good - Fewer state updates',
                      multiple: '⚠️ Okay - More individual updates'
                    },
                    {
                      aspect: 'Learning Curve',
                      single: '⚠️ Medium - Understand object patterns',
                      multiple: '✅ Easy - Simple per-field approach'
                    }
                  ].map((row, index) => (
                    <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                      <td className="py-3 px-4 text-gray-300 font-medium">{row.aspect}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>{row.single}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span>{row.multiple}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-gray-900/40 rounded-xl border border-gray-700">
              <h3 className="text-lg font-bold text-yellow-400 mb-3">When to Use Each Approach</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-green-400 mb-2">✅ Single State Object</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Complex forms with 5+ fields</li>
                    <li>• Forms needing validation across fields</li>
                    <li>• Multi-step/wizard forms</li>
                    <li>• Forms that submit to APIs</li>
                    <li>• Forms with conditional fields</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-blue-400 mb-2">✅ Multiple useState Hooks</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Simple forms with 2-3 fields</li>
                    <li>• Quick prototypes and experiments</li>
                    <li>• Forms with independent fields</li>
                    <li>• When learning React basics</li>
                    <li>• Simple search/filter inputs</li>
                  </ul>
                </div>
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
              Common Pitfalls & Solutions
            </h2>

            <div className="space-y-6">
              {/* Pitfall 1 */}
              <div className="p-4 bg-red-900/20 border border-red-800/50 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-400 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-400 mb-2">Direct State Mutation</h4>
                    <pre className="bg-gray-950 p-3 rounded-lg text-xs overflow-x-auto">
{`// ❌ WRONG - Direct mutation
const handleChange = (e) => {
  formState[e.target.name] = e.target.value; // Mutates directly!
  setFormState(formState); // Won't trigger re-render
};

// ✅ CORRECT - Create new object
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormState(prev => ({
    ...prev,          // Spread existing state
    [name]: value     // Update only changed field
  }));
};`}
                    </pre>
                    <p className="text-gray-300 text-sm mt-2">
                      <span className="text-green-400">Remember:</span> Always use the spread operator to create new state objects
                    </p>
                  </div>
                </div>
              </div>

              {/* Pitfall 2 */}
              <div className="p-4 bg-red-900/20 border border-red-800/50 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-400 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-400 mb-2">Missing name Attributes</h4>
                    <pre className="bg-gray-950 p-3 rounded-lg text-xs overflow-x-auto">
{`// ❌ WRONG - No name attribute
<input 
  value={form.firstName}
  onChange={handleChange} // Which field is this?
/>

// ✅ CORRECT - Include name attribute
<input 
  name="firstName"        // Identifies the field
  value={form.firstName}
  onChange={handleChange} // handler uses e.target.name
/>`}
                    </pre>
                    <p className="text-gray-300 text-sm mt-2">
                      <span className="text-green-400">Remember:</span> Every controlled input must have a unique <code>name</code> attribute
                    </p>
                  </div>
                </div>
              </div>

              {/* Pitfall 3 */}
              <div className="p-4 bg-red-900/20 border border-red-800/50 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-400 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-400 mb-2">Overly Complex State Object</h4>
                    <pre className="bg-gray-950 p-3 rounded-lg text-xs overflow-x-auto">
{`// ❌ WRONG - Deeply nested, hard to update
const [form, setForm] = useState({
  personal: {
    name: { first: '', last: '' },
    contact: { email: '', phone: '' }
  },
  address: {
    // ... more nesting
  }
});

// ✅ BETTER - Flatter structure
const [form, setForm] = useState({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  street: '',
  city: '',
  // ... flat structure
});`}
                    </pre>
                    <p className="text-gray-300 text-sm mt-2">
                      <span className="text-green-400">Remember:</span> Keep state structure as flat as possible for easier updates
                    </p>
                  </div>
                </div>
              </div>

              {/* Best Practices Summary */}
              <div className="p-4 bg-green-900/20 border border-green-800/50 rounded-xl">
                <h4 className="font-bold text-green-400 mb-3">Best Practices Summary</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-bold text-green-300 text-sm mb-2">✅ Do These</h5>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Use spread operator for state updates</li>
                      <li>• Keep state structure relatively flat</li>
                      <li>• Use unique name attributes on inputs</li>
                      <li>• Validate data before updating state</li>
                      <li>• Use TypeScript/PropTypes for type safety</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-bold text-red-300 text-sm mb-2">❌ Avoid These</h5>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Don't mutate state directly</li>
                      <li>• Don't nest state too deeply</li>
                      <li>• Don't forget name attributes</li>
                      <li>• Don't mix controlled/uncontrolled patterns</li>
                      <li>• Don't store derived state</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teacher's Note */}
        <section className="animate-[slideUp_2s_ease-out]">
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-700/50 hover:border-purple-500/70 transition-all duration-500 group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-2xl font-bold text-purple-300">Teacher's Note</h3>
                    <p className="text-purple-400/80">Sukanta Hui • 27 years experience</p>
                  </div>
                  <div className="text-sm text-gray-400">
                    <p>Email: sukantahui@codernaccotax.co.in</p>
                    <p>Mobile: 7003756860</p>
                  </div>
                </div>
                
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <div className="bg-purple-900/20 p-4 rounded-xl border border-purple-800/30">
                    <h4 className="font-bold text-purple-300 mb-2">Classroom Analogy from Ichapur Institute</h4>
                    <p>
                      Think of single state object like <span className="text-yellow-300">a student's file cabinet</span>. 
                      Instead of having papers scattered (multiple useState hooks), Abhronila keeps all her documents 
                      - personal info, marksheets, certificates - in one organized cabinet (single state object).
                    </p>
                    <p className="mt-2">
                      When she needs to update her address, she doesn't search different rooms. She goes to 
                      her cabinet, finds the right folder, and updates it. Everything stays together and organized.
                    </p>
                  </div>

                  <div className="bg-pink-900/20 p-4 rounded-xl border border-pink-800/30">
                    <h4 className="font-bold text-pink-300 mb-2">Professional Insight</h4>
                    <p>
                      In my career, I've seen teams waste weeks fixing forms that used multiple useState hooks. 
                      A Shyamnagar startup had a 20-field form with 20 separate states - debugging was a nightmare!
                    </p>
                    <p className="mt-2">
                      Remember: <span className="text-yellow-300">"One form, one state object"</span>. 
                      This pattern scales from simple contact forms to complex enterprise applications. 
                      It's the foundation of maintainable React forms.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-gray-900/40 p-4 rounded-xl">
                      <h4 className="font-bold text-cyan-400 mb-2">Real-world Scenario</h4>
                      <p className="text-sm">
                        When Tuhina builds the Barrackpore student portal:
                      </p>
                      <ol className="text-sm space-y-1 mt-2 ml-4 list-decimal">
                        <li>Single state object for all student data</li>
                        <li>Generic handler for text inputs</li>
                        <li>Special handlers for arrays (skills)</li>
                        <li>Validation on entire object before submit</li>
                        <li>Easy to persist to localStorage/API</li>
                      </ol>
                    </div>

                    <div className="bg-gray-900/40 p-4 rounded-xl">
                      <h4 className="font-bold text-yellow-400 mb-2">Memory Trick</h4>
                      <p className="text-sm">
                        Remember <span className="text-yellow-300">"S-O-S"</span>:
                      </p>
                      <div className="text-sm space-y-1 mt-2">
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400 font-bold">S</span>
                          <span>ingle state object</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400 font-bold">O</span>
                          <span>ne handler function</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400 font-bold">S</span>
                          <span>pread operator for updates</span>
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
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-blue-500/30 transition-all duration-500">
            <h2 className="text-2xl font-bold text-blue-300 mb-6 flex items-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Mini Checklist
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Use single state object for forms with multiple related fields",
                "Always include name attribute on controlled inputs",
                "Use spread operator to update state immutably",
                "Create generic handler for text/select inputs",
                "Create specialized handlers for arrays/checkboxes",
                "Keep state structure relatively flat",
                "Validate entire object before submission",
                "Reset form by resetting the entire state object",
                "Use TypeScript/PropTypes for state structure",
                "Consider using useReducer for very complex forms",
                "Test form with various input combinations",
                "Implement proper error handling for each field"
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-4 bg-gray-900/40 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-blue-500/30 transition-colors">
                    <span className="text-blue-400 font-bold text-sm">{index + 1}</span>
                  </div>
                  <span className="text-gray-300 group-hover:text-blue-200 transition-colors">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-xl border border-blue-700/30">
              <h4 className="font-bold text-cyan-300 mb-2">Hint Section</h4>
              <p className="text-gray-300">
                <span className="text-yellow-300">Think about:</span> How would Debangshu design a multi-step 
                admission form for Naihati College? Each step (personal, academic, payment) could be a separate 
                section, but all data stays in one state object. This allows users to go back and forth without 
                losing data.
                <br /><br />
                <span className="text-cyan-300">Try this:</span> Add a new field to the form (like "hobbies" as an array). 
                Notice how you need to update both the state structure and create a handler. This demonstrates 
                the scalability of the pattern.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Animation keyframes in style tag */}
      <style>{`
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

export default Topic20;