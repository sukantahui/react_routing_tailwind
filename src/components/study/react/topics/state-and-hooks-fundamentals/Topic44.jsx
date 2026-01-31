import { useState, useRef } from 'react';
import clsx from 'clsx';

const Topic44 = () => {
  // onClick Examples
  const [clickCount, setClickCount] = useState(0);
  const [lastClicked, setLastClicked] = useState(null);
  const [buttonState, setButtonState] = useState('idle');
  const [doubleClickCount, setDoubleClickCount] = useState(0);
  const [preventedClicks, setPreventedClicks] = useState(0);
  
  // onChange Examples
  const [textInput, setTextInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [textareaInput, setTextareaInput] = useState('');
  const [selectValue, setSelectValue] = useState('react');
  const [checkboxValues, setCheckboxValues] = useState({
    javascript: false,
    typescript: false,
    python: false,
  });
  const [radioValue, setRadioValue] = useState('student');
  
  // onSubmit Examples
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    agree: false,
  });
  const [submittedData, setSubmittedData] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Event Details
  const [lastEvent, setLastEvent] = useState(null);
  const [eventLog, setEventLog] = useState([]);
  const [syntheticEventDetails, setSyntheticEventDetails] = useState(null);
  
  // Refs for focus management
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  
  // Log event for debugging/educational purposes
  const logEvent = (type, target, details = {}) => {
    const timestamp = new Date().toLocaleTimeString();
    const newLog = {
      id: Date.now(),
      type,
      target,
      timestamp,
      details,
    };
    setEventLog(prev => [newLog, ...prev.slice(0, 9)]); // Keep last 10 events
    setLastEvent(newLog);
  };

  // onClick Handlers
  const handleClick = (e, buttonName) => {
    logEvent('onClick', buttonName, { 
      clientX: e.clientX, 
      clientY: e.clientY,
      timestamp: e.timeStamp 
    });
    setClickCount(prev => prev + 1);
    setLastClicked(buttonName);
    setButtonState('clicked');
    
    // Reset button state after animation
    setTimeout(() => setButtonState('idle'), 300);
  };

  const handleDoubleClick = (e) => {
    logEvent('onDoubleClick', 'Special Area', { clicks: doubleClickCount + 1 });
    setDoubleClickCount(prev => prev + 1);
  };

  const handlePreventDefaultClick = (e) => {
    e.preventDefault();
    logEvent('onClick', 'Prevented Link', { prevented: true });
    setPreventedClicks(prev => prev + 1);
    alert('Default link behavior prevented! Normally this would navigate.');
  };

  const handleStopPropagationClick = (e) => {
    e.stopPropagation();
    logEvent('onClick', 'Inner Div', { stopPropagation: true });
    alert('Event propagation stopped! Outer div click handler won\'t fire.');
  };

  const handleAsyncClick = async () => {
    setButtonState('loading');
    logEvent('onClick', 'Async Button', { status: 'loading' });
    
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setButtonState('success');
    logEvent('onClick', 'Async Button', { status: 'success' });
    
    setTimeout(() => setButtonState('idle'), 1000);
  };

  // onChange Handlers
  const handleTextChange = (e) => {
    const value = e.target.value;
    setTextInput(value);
    logEvent('onChange', 'Text Input', { value, length: value.length });
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmailInput(value);
    
    // Simple validation
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    logEvent('onChange', 'Email Input', { 
      value, 
      isValid,
      validation: isValid ? 'Valid email format' : 'Invalid email format'
    });
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPasswordInput(value);
    
    // Password strength
    const strength = value.length === 0 ? 'Empty' :
                     value.length < 6 ? 'Weak' :
                     value.length < 10 ? 'Medium' : 'Strong';
    
    logEvent('onChange', 'Password Input', { 
      length: value.length,
      strength,
      masked: '*'.repeat(value.length)
    });
  };

  const handleTextareaChange = (e) => {
    const value = e.target.value;
    setTextareaInput(value);
    logEvent('onChange', 'Textarea', { 
      value: value.substring(0, 30) + (value.length > 30 ? '...' : ''),
      length: value.length,
      lines: value.split('\n').length
    });
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectValue(value);
    logEvent('onChange', 'Select', { 
      value,
      label: e.target.options[e.target.selectedIndex].text
    });
  };

  const handleCheckboxChange = (name) => (e) => {
    const checked = e.target.checked;
    setCheckboxValues(prev => ({ ...prev, [name]: checked }));
    
    const selected = Object.entries({...checkboxValues, [name]: checked})
      .filter(([_, isChecked]) => isChecked)
      .map(([key]) => key);
    
    logEvent('onChange', `Checkbox: ${name}`, { 
      checked,
      selectedCount: selected.length,
      selectedItems: selected
    });
  };

  const handleRadioChange = (e) => {
    const value = e.target.value;
    setRadioValue(value);
    logEvent('onChange', 'Radio Group', { 
      value,
      name: e.target.name
    });
  };

  // onSubmit Handlers
  const handleFormChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      nameInputRef.current?.focus();
    } else if (formData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      !errors.name && emailInputRef.current?.focus();
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    
    if (!formData.agree) {
      errors.agree = 'You must agree to the terms';
    }
    
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    logEvent('onSubmit', 'Contact Form', { 
      formData: { ...formData, message: formData.message.substring(0, 20) + '...' }
    });
    
    // Validate form
    const errors = validateForm();
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setSubmittedData(formData);
        setIsSubmitting(false);
        setFormData({ name: '', email: '', message: '', agree: false });
        logEvent('onSubmit', 'Contact Form', { status: 'success' });
      }, 1500);
    } else {
      logEvent('onSubmit', 'Contact Form', { status: 'validation_failed', errors });
    }
  };

  const handleFormReset = (e) => {
    e.preventDefault();
    setFormData({ name: '', email: '', message: '', agree: false });
    setFormErrors({});
    setSubmittedData(null);
    logEvent('onReset', 'Contact Form', { reset: true });
  };

  const handleNativeSubmit = (e) => {
    // This would be called if we didn't prevent default
    alert('This is native form submission. Page would reload!');
  };

  // Synthetic Event Demonstrations
  const showSyntheticEventDetails = (e) => {
    const details = {
      type: e.type,
      target: e.target.tagName,
      currentTarget: e.currentTarget.tagName,
      nativeEvent: e.nativeEvent ? 'Yes' : 'No',
      isDefaultPrevented: e.defaultPrevented,
      isPropagationStopped: e.isPropagationStopped(),
      timestamp: e.timeStamp,
      coordinates: { x: e.clientX, y: e.clientY }
    };
    setSyntheticEventDetails(details);
    logEvent('synthetic', 'Event Details', details);
  };

  // Clear event log
  const clearEventLog = () => {
    setEventLog([]);
    setLastEvent(null);
    setSyntheticEventDetails(null);
  };

  // Reset all examples
  const resetAllExamples = () => {
    setClickCount(0);
    setLastClicked(null);
    setButtonState('idle');
    setDoubleClickCount(0);
    setPreventedClicks(0);
    
    setTextInput('');
    setEmailInput('');
    setPasswordInput('');
    setTextareaInput('');
    setSelectValue('react');
    setCheckboxValues({ javascript: false, typescript: false, python: false });
    setRadioValue('student');
    
    setFormData({ name: '', email: '', message: '', agree: false });
    setSubmittedData(null);
    setFormErrors({});
    setIsSubmitting(false);
    
    clearEventLog();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 animate-[fadeIn_0.8s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Handling <span className="text-blue-600 dark:text-blue-400">onClick</span>,{" "}
            <span className="text-green-600 dark:text-green-400">onChange</span>, and{" "}
            <span className="text-purple-600 dark:text-purple-400">onSubmit</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Mastering React's synthetic event system for interactive applications
          </p>
        </div>

        {/* Concept Explanation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - React Events Theory */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 animate-[slideUp_0.6s_ease-out]">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
              <span className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-3">⚡</span>
              React Synthetic Events
            </h2>
            
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                React uses a <strong>synthetic event system</strong> that wraps native browser events. This provides consistent behavior across all browsers and includes useful features.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 p-4">
                <strong className="block mb-2 text-blue-800 dark:text-blue-300">Key Features:</strong>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Cross-browser compatibility</li>
                  <li>Event pooling for performance</li>
                  <li>Automatic cleanup</li>
                  <li>Consistent API across events</li>
                </ul>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 dark:border-green-400 p-4">
                <strong className="block mb-2 text-green-800 dark:text-green-300">Event Handler Pattern:</strong>
                <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
{`// Inline arrow function
<button onClick={(e) => handleClick(e, 'button1')}>
  Click Me
</button>

// Pre-bound function
<button onClick={handleClick}>
  Click Me
</button>

// With parameters using bind
<button onClick={handleClick.bind(null, 'button1')}>
  Click Me
</button>`}
                </pre>
              </div>
            </div>

            {/* Common Event Methods */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">Event Methods:</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="font-bold text-sm mb-1">preventDefault()</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Stops default browser behavior
                  </div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="font-bold text-sm mb-1">stopPropagation()</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Prevents event bubbling
                  </div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="font-bold text-sm mb-1">currentTarget</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Element where handler is attached
                  </div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="font-bold text-sm mb-1">target</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Element that triggered event
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Event Types Comparison */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 animate-[slideUp_0.6s_ease-out_0.2s]">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
              <span className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg mr-3">🎯</span>
              Event Types Comparison
            </h2>
            
            <div className="space-y-6">
              {/* onClick Card */}
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500">
                <div className="flex items-center mb-2">
                  <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-3">
                    <span className="text-xl">🖱️</span>
                  </div>
                  <h3 className="text-lg font-bold text-blue-800 dark:text-blue-300">onClick</h3>
                </div>
                <p className="text-blue-700 dark:text-blue-400 text-sm mb-3">
                  Fires when element is clicked/tapped. Used for buttons, links, divs, etc.
                </p>
                <div className="text-xs text-blue-600 dark:text-blue-500">
                  <strong>Common uses:</strong> Button clicks, navigation, toggles
                </div>
              </div>
              
              {/* onChange Card */}
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border-l-4 border-green-500">
                <div className="flex items-center mb-2">
                  <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg mr-3">
                    <span className="text-xl">⌨️</span>
                  </div>
                  <h3 className="text-lg font-bold text-green-800 dark:text-green-300">onChange</h3>
                </div>
                <p className="text-green-700 dark:text-green-400 text-sm mb-3">
                  Fires when form element value changes. Used for inputs, selects, checkboxes.
                </p>
                <div className="text-xs text-green-600 dark:text-green-500">
                  <strong>Common uses:</strong> Form inputs, filters, search boxes
                </div>
              </div>
              
              {/* onSubmit Card */}
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border-l-4 border-purple-500">
                <div className="flex items-center mb-2">
                  <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg mr-3">
                    <span className="text-xl">📋</span>
                  </div>
                  <h3 className="text-lg font-bold text-purple-800 dark:text-purple-300">onSubmit</h3>
                </div>
                <p className="text-purple-700 dark:text-purple-400 text-sm mb-3">
                  Fires when form is submitted. Used for form validation and data processing.
                </p>
                <div className="text-xs text-purple-600 dark:text-purple-500">
                  <strong>Common uses:</strong> Form submissions, data validation, API calls
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <div className="text-sm">
                <strong className="block mb-2 text-gray-800 dark:text-gray-200">Remember:</strong>
                <p className="text-gray-600 dark:text-gray-400">
                  React events are camelCase (onClick, onChange) not lowercase (onclick, onchange).
                  Event handlers receive a synthetic event object with useful properties.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* onClick Examples Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center animate-[fadeIn_0.8s_ease-out_0.4s]">
            <span className="bg-blue-100 dark:bg-blue-900 p-3 rounded-xl mr-4">🖱️</span>
            onClick Examples
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Basic Click Examples */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Basic Click Handlers</h3>
              
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={(e) => handleClick(e, 'Primary')}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300"
                  >
                    Primary Button
                  </button>
                  
                  <button
                    onClick={(e) => handleClick(e, 'Secondary')}
                    className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-300"
                  >
                    Secondary Button
                  </button>
                  
                  <button
                    onClick={(e) => handleClick(e, 'Success')}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-300"
                  >
                    Success Button
                  </button>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {clickCount}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Total Clicks
                    </div>
                    {lastClicked && (
                      <div className="mt-2 text-sm">
                        Last clicked: <span className="font-medium">{lastClicked}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-sm text-blue-700 dark:text-blue-300">
                    Each button passes different parameters to the same handler function.
                  </div>
                </div>
              </div>
            </div>
            
            {/* Advanced Click Features */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Advanced Click Features</h3>
              
              <div className="space-y-4">
                {/* Double Click */}
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div 
                    onDoubleClick={handleDoubleClick}
                    className="cursor-pointer p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-dashed border-blue-300 dark:border-blue-700 text-center hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-300"
                  >
                    <div className="text-lg mb-2">Double Click Me!</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Double clicks: <span className="font-bold">{doubleClickCount}</span>
                    </div>
                  </div>
                </div>
                
                {/* preventDefault Example */}
                <div className="space-y-2">
                  <a
                    href="https://reactjs.org"
                    onClick={handlePreventDefaultClick}
                    className="inline-block px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-300"
                  >
                    Prevent Default Link
                  </a>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Prevented clicks: {preventedClicks}
                  </div>
                </div>
                
                {/* stopPropagation Example */}
                <div 
                  onClick={() => alert('Outer div clicked!')}
                  className="p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg cursor-pointer"
                >
                  <div className="mb-2 text-sm text-yellow-800 dark:text-yellow-300">
                    Outer Div (click me)
                  </div>
                  <div 
                    onClick={handleStopPropagationClick}
                    className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-yellow-300 dark:border-yellow-700 cursor-pointer hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors duration-300"
                  >
                    Inner Div (click me - stops propagation)
                  </div>
                </div>
                
                {/* Async Click */}
                <button
                  onClick={handleAsyncClick}
                  disabled={buttonState === 'loading' || buttonState === 'success'}
                  className={clsx(
                    "w-full px-4 py-2 rounded-lg transition-colors duration-300 flex items-center justify-center",
                    buttonState === 'loading' && "bg-yellow-500 text-white",
                    buttonState === 'success' && "bg-green-500 text-white",
                    buttonState === 'idle' && "bg-purple-500 hover:bg-purple-600 text-white"
                  )}
                >
                  {buttonState === 'loading' && (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  )}
                  {buttonState === 'success' && '✅ Success!'}
                  {buttonState === 'idle' && 'Async Operation'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* onChange Examples Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center animate-[fadeIn_0.8s_ease-out_0.6s]">
            <span className="bg-green-100 dark:bg-green-900 p-3 rounded-xl mr-4">⌨️</span>
            onChange Examples
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Text Inputs */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Text Inputs</h3>
              
              <div className="space-y-4">
                {/* Text Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Text Input:
                  </label>
                  <input
                    type="text"
                    value={textInput}
                    onChange={handleTextChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Type something..."
                  />
                  <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Characters: {textInput.length}
                    {textInput && (
                      <span className="ml-2">
                        Preview: "{textInput.substring(0, 20)}{textInput.length > 20 ? '...' : ''}"
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Input:
                  </label>
                  <input
                    type="email"
                    value={emailInput}
                    onChange={handleEmailChange}
                    className={clsx(
                      "w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                      emailInput && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)
                        ? "border-red-500 dark:border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    )}
                    placeholder="user@example.com"
                  />
                  <div className="mt-1 text-sm">
                    {emailInput && (
                      <span className={/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput) ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                        {/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput) ? "✓ Valid email" : "✗ Invalid email format"}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Password Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password Input:
                  </label>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={handlePasswordChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter password"
                  />
                  <div className="mt-1">
                    {passwordInput && (
                      <div className="flex items-center">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mr-2">
                          Strength:
                        </div>
                        <div className={clsx(
                          "px-2 py-1 text-xs font-medium rounded",
                          passwordInput.length === 0 && "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400",
                          passwordInput.length < 6 && "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300",
                          passwordInput.length >= 6 && passwordInput.length < 10 && "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300",
                          passwordInput.length >= 10 && "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300"
                        )}>
                          {passwordInput.length === 0 ? 'Empty' :
                           passwordInput.length < 6 ? 'Weak' :
                           passwordInput.length < 10 ? 'Medium' : 'Strong'}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Other Input Types */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Other Input Types</h3>
              
              <div className="space-y-4">
                {/* Textarea */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Textarea:
                  </label>
                  <textarea
                    value={textareaInput}
                    onChange={handleTextareaChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter multi-line text..."
                  />
                  <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {textareaInput.length} characters, {textareaInput.split('\n').length} lines
                  </div>
                </div>
                
                {/* Select */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select Dropdown:
                  </label>
                  <select
                    value={selectValue}
                    onChange={handleSelectChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="react">React</option>
                    <option value="vue">Vue.js</option>
                    <option value="angular">Angular</option>
                    <option value="svelte">Svelte</option>
                  </select>
                  <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Selected: <span className="font-medium">{selectValue}</span>
                  </div>
                </div>
                
                {/* Checkboxes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Checkboxes:
                  </label>
                  <div className="space-y-2">
                    {['javascript', 'typescript', 'python'].map(lang => (
                      <label key={lang} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={checkboxValues[lang]}
                          onChange={handleCheckboxChange(lang)}
                          className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                        />
                        <span className="text-gray-700 dark:text-gray-300 capitalize">{lang}</span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Selected: {Object.entries(checkboxValues).filter(([_, checked]) => checked).map(([key]) => key).join(', ') || 'None'}
                  </div>
                </div>
                
                {/* Radio Buttons */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Radio Buttons:
                  </label>
                  <div className="space-y-2">
                    {['student', 'developer', 'teacher'].map(role => (
                      <label key={role} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="userRole"
                          value={role}
                          checked={radioValue === role}
                          onChange={handleRadioChange}
                          className="text-blue-500 focus:ring-blue-500"
                        />
                        <span className="text-gray-700 dark:text-gray-300 capitalize">{role}</span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Selected: <span className="font-medium capitalize">{radioValue}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* onSubmit Examples Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center animate-[fadeIn_0.8s_ease-out_0.8s]">
            <span className="bg-purple-100 dark:bg-purple-900 p-3 rounded-xl mr-4">📋</span>
            onSubmit Examples
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Contact Form</h3>
              
              <form onSubmit={handleSubmit} onReset={handleFormReset}>
                <div className="space-y-4">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      ref={nameInputRef}
                      type="text"
                      value={formData.name}
                      onChange={handleFormChange('name')}
                      className={clsx(
                        "w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                        formErrors.name 
                          ? "border-red-500 dark:border-red-500" 
                          : "border-gray-300 dark:border-gray-600"
                      )}
                      placeholder="Your name"
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.name}</p>
                    )}
                  </div>
                  
                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      ref={emailInputRef}
                      type="email"
                      value={formData.email}
                      onChange={handleFormChange('email')}
                      className={clsx(
                        "w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                        formErrors.email 
                          ? "border-red-500 dark:border-red-500" 
                          : "border-gray-300 dark:border-gray-600"
                      )}
                      placeholder="your@email.com"
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.email}</p>
                    )}
                  </div>
                  
                  {/* Message Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={handleFormChange('message')}
                      rows="3"
                      className={clsx(
                        "w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                        formErrors.message 
                          ? "border-red-500 dark:border-red-500" 
                          : "border-gray-300 dark:border-gray-600"
                      )}
                      placeholder="Your message..."
                    />
                    {formErrors.message && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.message}</p>
                    )}
                  </div>
                  
                  {/* Agreement Checkbox */}
                  <div>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.agree}
                        onChange={handleFormChange('agree')}
                        className={clsx(
                          "rounded border-gray-300 focus:ring-blue-500",
                          formErrors.agree && "border-red-500"
                        )}
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        I agree to the terms and conditions *
                      </span>
                    </label>
                    {formErrors.agree && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.agree}</p>
                    )}
                  </div>
                  
                  {/* Form Buttons */}
                  <div className="flex space-x-3 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={clsx(
                        "flex-1 px-4 py-2 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center",
                        isSubmitting
                          ? "bg-blue-400 text-white"
                          : "bg-blue-500 hover:bg-blue-600 text-white"
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Submitting...
                        </>
                      ) : (
                        'Submit Form'
                      )}
                    </button>
                    
                    <button
                      type="reset"
                      className="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-300"
                    >
                      Reset Form
                    </button>
                  </div>
                </div>
              </form>
            </div>
            
            {/* Form Results & Native Submit */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Form Results & Native Submit</h3>
              
              <div className="space-y-4">
                {/* Submitted Data Display */}
                {submittedData ? (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center mb-3">
                      <div className="text-2xl mr-2">✅</div>
                      <h4 className="font-bold text-green-800 dark:text-green-300">Form Submitted Successfully!</h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-green-700 dark:text-green-400">Name:</span>
                        <span className="font-medium">{submittedData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700 dark:text-green-400">Email:</span>
                        <span className="font-medium">{submittedData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700 dark:text-green-400">Message:</span>
                        <span className="font-medium">{submittedData.message.substring(0, 30)}...</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700 dark:text-green-400">Agreed to terms:</span>
                        <span className="font-medium">{submittedData.agree ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
                    <div className="text-2xl mb-2">📝</div>
                    <p className="text-gray-600 dark:text-gray-400">
                      No form submissions yet. Fill out and submit the form to see results here.
                    </p>
                  </div>
                )}
                
                {/* Native Form Submit Example */}
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <h4 className="font-bold text-yellow-800 dark:text-yellow-300 mb-2">Native Form Submit (Without preventDefault)</h4>
                  <form onSubmit={handleNativeSubmit} className="space-y-2">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-yellow-300 dark:border-yellow-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                      placeholder="Try submitting this..."
                      defaultValue="Test value"
                    />
                    <button
                      type="submit"
                      className="w-full px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors duration-300"
                    >
                      Submit (Will Reload Page!)
                    </button>
                  </form>
                  <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-400">
                    ⚠️ This form doesn't prevent default, so it will reload the page!
                  </div>
                </div>
                
                {/* Form Validation Status */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Form Validation Status</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center">
                      <div className={clsx(
                        "w-2 h-2 rounded-full mr-2",
                        formData.name.trim() && formData.name.length >= 2 ? "bg-green-500" : "bg-red-500"
                      )}></div>
                      <span>Name: {formData.name.trim() && formData.name.length >= 2 ? 'Valid' : 'Invalid'}</span>
                    </div>
                    <div className="flex items-center">
                      <div className={clsx(
                        "w-2 h-2 rounded-full mr-2",
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? "bg-green-500" : "bg-red-500"
                      )}></div>
                      <span>Email: {/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? 'Valid' : 'Invalid'}</span>
                    </div>
                    <div className="flex items-center">
                      <div className={clsx(
                        "w-2 h-2 rounded-full mr-2",
                        formData.message.trim() && formData.message.length >= 10 ? "bg-green-500" : "bg-red-500"
                      )}></div>
                      <span>Message: {formData.message.trim() && formData.message.length >= 10 ? 'Valid' : 'Invalid'}</span>
                    </div>
                    <div className="flex items-center">
                      <div className={clsx(
                        "w-2 h-2 rounded-full mr-2",
                        formData.agree ? "bg-green-500" : "bg-red-500"
                      )}></div>
                      <span>Agreement: {formData.agree ? 'Accepted' : 'Not accepted'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Monitoring & Debugging */}
        <div className="mb-12 bg-gray-900 dark:bg-black rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <span className="bg-purple-500 p-3 rounded-xl mr-4">🔍</span>
            Event Monitoring & Debugging
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Synthetic Event Details */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Synthetic Event Details</h3>
              
              <div 
                onClick={showSyntheticEventDetails}
                className="p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors duration-300 mb-4 text-center"
              >
                <div className="text-lg font-medium text-white mb-2">Click to See Event Details</div>
                <div className="text-sm text-gray-400">This demonstrates React's synthetic event object</div>
              </div>
              
              {syntheticEventDetails && (
                <div className="space-y-3">
                  <div className="text-sm text-gray-300">
                    <strong className="text-purple-400">Event details captured:</strong>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <pre className="text-sm text-gray-300 overflow-x-auto">
{JSON.stringify(syntheticEventDetails, null, 2)}
                    </pre>
                  </div>
                  <div className="text-sm text-gray-400">
                    💡 Synthetic events are pooled for performance. Access event properties immediately or call <code className="bg-gray-700 px-1 rounded">e.persist()</code> to keep them.
                  </div>
                </div>
              )}
            </div>
            
            {/* Event Log */}
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Event Log</h3>
                <button
                  onClick={clearEventLog}
                  className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-300 text-sm"
                >
                  Clear Log
                </button>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-4 h-64 overflow-y-auto">
                {eventLog.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <div className="text-3xl mb-2">📋</div>
                      <p>Perform actions to see event logs</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {eventLog.map(log => (
                      <div
                        key={log.id}
                        className={clsx(
                          "p-3 rounded-lg border-l-4 text-sm",
                          log.type === 'onClick' && "bg-blue-900/20 border-blue-500",
                          log.type === 'onChange' && "bg-green-900/20 border-green-500",
                          log.type === 'onSubmit' && "bg-purple-900/20 border-purple-500",
                          log.type === 'onDoubleClick' && "bg-yellow-900/20 border-yellow-500",
                          log.type === 'synthetic' && "bg-pink-900/20 border-pink-500"
                        )}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium text-white">{log.type}</div>
                            <div className="text-gray-400 text-xs mt-1">{log.target}</div>
                            {log.details && (
                              <div className="text-gray-500 text-xs mt-1">
                                {JSON.stringify(log.details).substring(0, 50)}...
                              </div>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">{log.timestamp}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                  <span className="text-gray-400">onClick</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                  <span className="text-gray-400">onChange</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
                  <span className="text-gray-400">onSubmit</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Common Pitfalls */}
        <div className="mb-12 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-2xl p-6 animate-[fadeIn_0.8s_ease-out_1s]">
          <h2 className="text-2xl font-bold text-red-700 dark:text-red-300 mb-4 flex items-center">
            <span className="bg-red-100 dark:bg-red-900 p-3 rounded-xl mr-4">🚫</span>
            Common Event Handling Mistakes
          </h2>
          
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">1. Forgetting preventDefault() on Forms</h4>
              <p className="text-gray-700 dark:text-gray-300">
                Swadeep creates a form but forgets <code>e.preventDefault()</code>, causing the page to reload on every submission and losing all state.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">2. Creating New Functions on Every Render</h4>
              <p className="text-gray-700 dark:text-gray-300">
                Tuhina uses inline arrow functions in event handlers without useCallback, causing unnecessary re-renders of child components.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">3. Not Accessing Event Properties Immediately</h4>
              <p className="text-gray-700 dark:text-gray-300">
                Debangshu tries to access <code>e.target.value</code> inside setTimeout, but React's synthetic events are already pooled and nullified.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">4. Confusing onChange with onInput</h4>
              <p className="text-gray-700 dark:text-gray-300">
                Abhronila uses onInput for real-time validation but finds it fires too often. onChange fires after the element loses focus for some inputs.
              </p>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="mb-12 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-2xl p-6 animate-[fadeIn_0.8s_ease-out_1.2s]">
          <h2 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-4 flex items-center">
            <span className="bg-green-100 dark:bg-green-900 p-3 rounded-xl mr-4">✅</span>
            Best Practices for Event Handling
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-lg mb-3 text-gray-800 dark:text-gray-100">Performance Tips:</h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 rounded-full p-1 mr-3">⚡</span>
                  Use useCallback for event handlers passed as props
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 rounded-full p-1 mr-3">⚡</span>
                  Debounce onChange handlers for search inputs
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 rounded-full p-1 mr-3">⚡</span>
                  Extract event values immediately if needed later
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 rounded-full p-1 mr-3">⚡</span>
                  Use event delegation for many similar elements
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-3 text-gray-800 dark:text-gray-100">Code Quality:</h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300 rounded-full p-1 mr-3">🔧</span>
                  Always prevent default behavior in form submissions
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300 rounded-full p-1 mr-3">🔧</span>
                  Use descriptive handler names (handleSubmit not submit)
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300 rounded-full p-1 mr-3">🔧</span>
                  Validate forms in onSubmit, not just onChange
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300 rounded-full p-1 mr-3">🔧</span>
                  Handle loading and error states in async handlers
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Teacher's Note */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 border-l-8 border-blue-500 dark:border-blue-400 rounded-2xl p-6 mb-12 hover:shadow-2xl transition-all duration-500 group">
          <div className="flex items-start">
            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-xl mr-6 group-hover:rotate-12 transition-transform duration-300">
              <span className="text-3xl">👨‍🏫</span>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                Teacher's Note
              </h3>
              
              <div className="mb-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  <strong>Event handling is like teaching students in Barrackpore to raise their hands!</strong> When Swadeep clicks a button (raises hand), React notices (teacher sees), calls the handler (asks question), and gets the response (answer).
                </p>
                
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Think of it this way: When Tuhina types in a form field (onChange), it's like writing on a whiteboard. Each letter changes the board. When she submits (onSubmit), it's like handing in her completed worksheet.
                </p>
                
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Remember:</strong> Always <code>preventDefault()</code> on forms unless you actually want a page reload. It's like saying "I'll handle this" instead of letting the browser do its default thing.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <div className="font-bold text-blue-600 dark:text-blue-400 mb-1">Professional Insight:</div>
                  <p className="text-gray-600 dark:text-gray-400">
                    In 27 years, I've debugged countless event-related bugs. The most common: forgetting preventDefault on forms, and trying to use event objects asynchronously. Master these and you'll avoid 90% of issues.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <div className="font-bold text-green-600 dark:text-green-400 mb-1">Debugging Tip:</div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Use the event log pattern shown here during development. Seeing exactly what events fire and when is invaluable for debugging complex interactions.
                  </p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800">
                <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400">
                  <span className="mr-4"><strong>Sukanta Hui</strong></span>
                  <span className="mr-4">27 years experience</span>
                  <span>Web Development Expert</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hint Section */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800 mb-12">
          <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300 mb-4 flex items-center">
            <span className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg mr-4">💡</span>
            Thinking Exercise
          </h3>
          
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Observe carefully:</strong> Type in the email field and watch the validation. Notice how onChange fires on every keystroke. When would you want to use onBlur instead?
            </p>
            
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Try changing this:</strong> Submit the contact form with invalid data. Notice how focus moves to the first error field. Why is this good UX design?
            </p>
            
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Think about:</strong> In a real application with many forms, how would you create reusable event handler hooks to avoid repeating validation logic?
            </p>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black rounded-2xl p-6 text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">📋 Event Handling Checklist</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-700/50 rounded-xl">
              <div className="text-3xl mb-3">🖱️</div>
              <h4 className="font-bold mb-2">onClick</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>Use for buttons, links, divs</li>
                <li>preventDefault for links</li>
                <li>stopPropagation to prevent bubbling</li>
                <li>Handle async operations carefully</li>
              </ul>
            </div>
            
            <div className="text-center p-4 bg-gray-700/50 rounded-xl">
              <div className="text-3xl mb-3">⌨️</div>
              <h4 className="font-bold mb-2">onChange</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>Use for form inputs</li>
                <li>Debounce search inputs</li>
                <li>Validate as user types</li>
                <li>Update state immediately</li>
              </ul>
            </div>
            
            <div className="text-center p-4 bg-gray-700/50 rounded-xl">
              <div className="text-3xl mb-3">📋</div>
              <h4 className="font-bold mb-2">onSubmit</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>Always preventDefault</li>
                <li>Validate all fields</li>
                <li>Handle loading states</li>
                <li>Reset form after success</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <button
              onClick={resetAllExamples}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300 font-medium"
            >
              🔄 Reset All Examples
            </button>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-300">
              <strong>Remember:</strong> React events are synthetic, consistent across browsers, and automatically cleaned up!
            </p>
          </div>
        </div>
      </div>

      {/* Inline CSS for animations */}
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
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[fadeIn_0\\.8s_ease-out\\],
          .animate-\\[slideUp_0\\.6s_ease-out\\],
          .animate-\\[slideUp_0\\.6s_ease-out_0\\.2s\\],
          .animate-\\[fadeIn_0\\.8s_ease-out_0\\.4s\\],
          .animate-\\[fadeIn_0\\.8s_ease-out_0\\.6s\\],
          .animate-\\[fadeIn_0\\.8s_ease-out_0\\.8s\\],
          .animate-\\[fadeIn_0\\.8s_ease-out_1s\\],
          .animate-\\[fadeIn_0\\.8s_ease-out_1\\.2s\\] {
            animation: none;
            opacity: 1;
            transform: none;
          }
          
          .group-hover\\:scale-110,
          .group-hover\\:rotate-12 {
            transform: none;
          }
          
          .animate-spin {
            animation: none;
          }
        }
        
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      `}</style>
    </div>
  );
};

export default Topic44;