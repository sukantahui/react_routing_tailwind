// Topic29.jsx - Practice Lab: Build a Profile Card using function components
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

const Topic29 = () => {
  const [profileData, setProfileData] = useState({
    name: 'Swadeep Chatterjee',
    title: 'Frontend Developer',
    bio: 'Passionate about building beautiful, accessible user interfaces. Loves React and modern web technologies.',
    location: 'Barrackpore, West Bengal',
    email: 'swadeep@example.com',
    phone: '+91 98765 43210',
    skills: ['React', 'JavaScript', 'Tailwind CSS', 'TypeScript', 'Node.js'],
    avatarColor: 'blue',
    showContact: true,
    showSkills: true
  });

  const [userInput, setUserInput] = useState({
    name: '',
    title: '',
    bio: '',
    location: '',
    email: '',
    phone: ''
  });

  const [newSkill, setNewSkill] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('preview');
  const [animationStep, setAnimationStep] = useState(0);

  // Sample profiles for demonstration
  const sampleProfiles = [
    {
      name: 'Tuhina Roy',
      title: 'UI/UX Designer',
      bio: 'Creating delightful user experiences with attention to detail. Expert in Figma and design systems.',
      location: 'Shyamnagar, West Bengal',
      email: 'tuhina@example.com',
      phone: '+91 98765 43211',
      skills: ['Figma', 'UI Design', 'Prototyping', 'Wireframing', 'User Research'],
      avatarColor: 'purple'
    },
    {
      name: 'Abhronila Das',
      title: 'Full Stack Developer',
      bio: 'Building scalable web applications from frontend to backend. Enjoys solving complex problems.',
      location: 'Ichapur, West Bengal',
      email: 'abhronila@example.com',
      phone: '+91 98765 43212',
      skills: ['React', 'Python', 'Django', 'PostgreSQL', 'Docker'],
      avatarColor: 'green'
    },
    {
      name: 'Debangshu Sen',
      title: 'Backend Engineer',
      bio: 'Focusing on server-side architecture, APIs, and database optimization. Performance enthusiast.',
      location: 'Naihati, West Bengal',
      email: 'debangshu@example.com',
      phone: '+91 98765 43213',
      skills: ['Node.js', 'Express', 'MongoDB', 'Redis', 'AWS'],
      avatarColor: 'red'
    }
  ];

  // Component parts for step-by-step building
  const componentParts = [
    {
      step: 1,
      title: 'Basic Component Structure',
      description: 'Start with a functional component that returns JSX',
      code: `function ProfileCard() {
  return (
    <div className="profile-card">
      {/* Content will go here */}
    </div>
  );
}`
    },
    {
      step: 2,
      title: 'Add Profile Header',
      description: 'Include avatar, name, and title',
      code: `function ProfileCard({ name, title, avatarColor }) {
  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className={\`avatar bg-\${avatarColor}-500\`}>
          {name.charAt(0)}
        </div>
        <div>
          <h2 className="profile-name">{name}</h2>
          <p className="profile-title">{title}</p>
        </div>
      </div>
    </div>
  );
}`
    },
    {
      step: 3,
      title: 'Add Bio and Location',
      description: 'Include descriptive text and location info',
      code: `function ProfileCard({ name, title, bio, location, avatarColor }) {
  return (
    <div className="profile-card">
      {/* Header from previous step */}
      
      <div className="profile-bio">
        <p>{bio}</p>
      </div>
      
      <div className="profile-location">
        <LocationIcon />
        <span>{location}</span>
      </div>
    </div>
  );
}`
    },
    {
      step: 4,
      title: 'Add Skills Section',
      description: 'Render list of skills using map()',
      code: `function ProfileCard({ name, title, bio, location, skills, avatarColor }) {
  return (
    <div className="profile-card">
      {/* Previous content */}
      
      <div className="profile-skills">
        <h3>Skills</h3>
        <div className="skills-list">
          {skills.map((skill, index) => (
            <span key={index} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}`
    },
    {
      step: 5,
      title: 'Add Contact Information',
      description: 'Include email and phone with icons',
      code: `function ProfileCard({ name, title, bio, location, email, phone, skills, avatarColor }) {
  return (
    <div className="profile-card">
      {/* Previous content */}
      
      <div className="profile-contact">
        <h3>Contact</h3>
        <div className="contact-item">
          <EmailIcon />
          <span>{email}</span>
        </div>
        <div className="contact-item">
          <PhoneIcon />
          <span>{phone}</span>
        </div>
      </div>
    </div>
  );
}`
    }
  ];

  // Animation styles
  const revealAnimation = `
    @keyframes fadeSlideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes pulseSoft {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.8;
      }
    }
    
    @keyframes skillAppear {
      from {
        transform: scale(0.8);
        opacity: 0;
      }
      to {
        transform: scale(1);
        opacity: 1;
      }
    }
  `;

  // Initialize user input when editing starts
  useEffect(() => {
    if (isEditing) {
      setUserInput({
        name: profileData.name,
        title: profileData.title,
        bio: profileData.bio,
        location: profileData.location,
        email: profileData.email,
        phone: profileData.phone
      });
    }
  }, [isEditing]);

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setUserInput(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Apply edited profile
  const applyProfileChanges = () => {
    setProfileData(prev => ({
      ...prev,
      ...userInput
    }));
    setIsEditing(false);
  };

  // Add new skill
  const handleAddSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  // Remove skill
  const handleRemoveSkill = (skillToRemove) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  // Load sample profile
  const loadSampleProfile = (profile) => {
    setProfileData(prev => ({
      ...prev,
      ...profile
    }));
    setIsEditing(false);
  };

  // Avatar color options
  const colorOptions = [
    { name: 'Blue', value: 'blue', class: 'bg-blue-500' },
    { name: 'Purple', value: 'purple', class: 'bg-purple-500' },
    { name: 'Green', value: 'green', class: 'bg-green-500' },
    { name: 'Red', value: 'red', class: 'bg-red-500' },
    { name: 'Yellow', value: 'yellow', class: 'bg-yellow-500' },
    { name: 'Pink', value: 'pink', class: 'bg-pink-500' }
  ];

  // Icon components
  const LocationIcon = () => (
    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  const EmailIcon = () => (
    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );

  const PhoneIcon = () => (
    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );

  const SkillIcon = () => (
    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  // The actual ProfileCard component we're building
  const ProfileCard = ({ data, interactive = false }) => (
    <div className={clsx(
      "bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl transition-all duration-500",
      interactive && "hover:shadow-2xl hover:scale-[1.02]"
    )}>
      {/* Header with Avatar */}
      <div className="flex items-center gap-4 mb-6">
        <div className={clsx(
          "w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold",
          `bg-${data.avatarColor}-500`
        )}>
          {data.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {data.name}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {data.title}
          </p>
        </div>
      </div>

      {/* Bio */}
      <div className="mb-6">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {data.bio}
        </p>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 mb-6 text-gray-600 dark:text-gray-400">
        <LocationIcon />
        <span>{data.location}</span>
      </div>

      {/* Skills Section */}
      {data.showSkills && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <SkillIcon />
            <h3 className="font-semibold text-gray-800 dark:text-white">Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors duration-300 cursor-pointer"
                onClick={() => interactive && handleRemoveSkill(skill)}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: interactive ? 'skillAppear 0.3s ease-out forwards' : 'none'
                }}
              >
                {skill}
                {interactive && (
                  <span className="ml-1 text-xs">×</span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Contact Information */}
      {data.showContact && (
        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Contact</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <EmailIcon />
              <span>{data.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <PhoneIcon />
              <span>{data.phone}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 transition-colors duration-500">
      <style>{revealAnimation}</style>
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div 
          className="mb-12 animate-[fadeSlideUp_0.8s_ease-out]"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
              Practice Lab: Build a Profile Card
            </h1>
          </div>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            Apply your React knowledge to build an interactive profile card component. This hands-on exercise 
            combines props, state, event handling, and component composition in a practical, real-world example.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Learning Objectives</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Create functional components with props
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Handle user interactions
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Manage component state
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Skills Practiced</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  JSX syntax and structure
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Props and state management
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Event handling in React
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Real-World Application</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Profile cards are used in social media, team pages, professional networks, and portfolio websites.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <div 
          className="mb-12 animate-[fadeSlideUp_0.8s_ease-out]"
          style={{ animationDelay: '0.3s' }}
        >
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
            <button
              onClick={() => setActiveTab('preview')}
              className={clsx(
                "px-6 py-3 font-medium text-lg transition-colors duration-300",
                activeTab === 'preview'
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              )}
            >
              Live Preview
            </button>
            <button
              onClick={() => setActiveTab('builder')}
              className={clsx(
                "px-6 py-3 font-medium text-lg transition-colors duration-300",
                activeTab === 'builder'
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              )}
            >
              Component Builder
            </button>
            <button
              onClick={() => setActiveTab('samples')}
              className={clsx(
                "px-6 py-3 font-medium text-lg transition-colors duration-300",
                activeTab === 'samples'
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              )}
            >
              Sample Profiles
            </button>
          </div>

          {/* Preview Tab */}
          {activeTab === 'preview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Live Preview */}
              <div className="animate-[fadeSlideUp_0.8s_ease-out]">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Live Preview
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-300"
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-medium transition-colors duration-300"
                    >
                      {isEditing ? 'Cancel' : 'Customize'}
                    </button>
                  </div>
                </div>
                
                <div className="mb-8">
                  <ProfileCard data={profileData} interactive={true} />
                </div>

                {/* Controls */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                    Component Controls
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Toggle Sections
                      </label>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={profileData.showContact}
                            onChange={(e) => setProfileData(prev => ({ ...prev, showContact: e.target.checked }))}
                            className="w-5 h-5 text-blue-600 rounded"
                          />
                          <span className="text-gray-700 dark:text-gray-300">Show Contact Info</span>
                        </label>
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={profileData.showSkills}
                            onChange={(e) => setProfileData(prev => ({ ...prev, showSkills: e.target.checked }))}
                            className="w-5 h-5 text-blue-600 rounded"
                          />
                          <span className="text-gray-700 dark:text-gray-300">Show Skills Section</span>
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Avatar Color
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {colorOptions.map(color => (
                          <button
                            key={color.value}
                            onClick={() => setProfileData(prev => ({ ...prev, avatarColor: color.value }))}
                            className={clsx(
                              "w-8 h-8 rounded-full transition-transform duration-300 hover:scale-110",
                              color.class,
                              profileData.avatarColor === color.value && "ring-2 ring-offset-2 ring-blue-500 dark:ring-blue-400"
                            )}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Add Skill */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Add New Skill
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Enter a skill (e.g., MongoDB)"
                        className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={handleAddSkill}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-300"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Editing Panel */}
              {isEditing && (
                <div className="animate-[fadeSlideUp_0.8s_ease-out]">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 h-full">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                      Edit Profile Details
                    </h2>
                    
                    <div className="space-y-4">
                      {[
                        { label: 'Full Name', field: 'name', type: 'text' },
                        { label: 'Job Title', field: 'title', type: 'text' },
                        { label: 'Location', field: 'location', type: 'text' },
                        { label: 'Email', field: 'email', type: 'email' },
                        { label: 'Phone', field: 'phone', type: 'tel' }
                      ].map((item) => (
                        <div key={item.field}>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {item.label}
                          </label>
                          <input
                            type={item.type}
                            value={userInput[item.field]}
                            onChange={(e) => handleInputChange(item.field, e.target.value)}
                            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                          />
                        </div>
                      ))}
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Bio
                        </label>
                        <textarea
                          value={userInput.bio}
                          onChange={(e) => handleInputChange('bio', e.target.value)}
                          rows="4"
                          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                        />
                      </div>
                      
                      <div className="flex gap-3 pt-4">
                        <button
                          onClick={applyProfileChanges}
                          className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-300"
                        >
                          Apply Changes
                        </button>
                        <button
                          onClick={() => setIsEditing(false)}
                          className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-medium transition-colors duration-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Builder Tab */}
          {activeTab === 'builder' && (
            <div className="animate-[fadeSlideUp_0.8s_ease-out]">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Step-by-Step Component Builder
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Steps Navigation */}
                <div className="space-y-4">
                  {componentParts.map((part) => (
                    <button
                      key={part.step}
                      onClick={() => setAnimationStep(part.step - 1)}
                      className={clsx(
                        "w-full text-left p-6 rounded-xl transition-all duration-300 hover:scale-[1.02]",
                        animationStep === part.step - 1
                          ? "bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800"
                          : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg"
                      )}
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <div className={clsx(
                          "w-10 h-10 rounded-full flex items-center justify-center font-bold",
                          animationStep === part.step - 1
                            ? "bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                        )}>
                          {part.step}
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                          {part.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        {part.description}
                      </p>
                    </button>
                  ))}
                </div>
                
                {/* Code Preview */}
                <div className="bg-gray-900 rounded-2xl p-6 overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="ml-4 text-gray-400 text-sm">
                        ProfileCard.jsx
                      </span>
                    </div>
                    <span className="text-gray-400 text-sm">
                      Step {componentParts[animationStep].step}/5
                    </span>
                  </div>
                  
                  <pre className="text-gray-100 overflow-x-auto">
                    <code>{componentParts[animationStep].code}</code>
                  </pre>
                  
                  <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
                    <h4 className="font-semibold text-gray-200 mb-2">Key Concepts:</h4>
                    <ul className="text-gray-400 text-sm space-y-1">
                      {animationStep === 0 && (
                        <>
                          <li>• Functional component declaration</li>
                          <li>• JSX return statement</li>
                          <li>• Basic component structure</li>
                        </>
                      )}
                      {animationStep === 1 && (
                        <>
                          <li>• Props destructuring</li>
                          <li>• Dynamic classes with template literals</li>
                          <li>• Component composition</li>
                        </>
                      )}
                      {animationStep === 2 && (
                        <>
                          <li>• Conditional rendering with && operator</li>
                          <li>• JSX expressions</li>
                          <li>• Component reusability</li>
                        </>
                      )}
                      {animationStep === 3 && (
                        <>
                          <li>• Array mapping in JSX</li>
                          <li>• Unique keys for list items</li>
                          <li>• Component props validation</li>
                        </>
                      )}
                      {animationStep === 4 && (
                        <>
                          <li>• Event handling in functional components</li>
                          <li>• State management concepts</li>
                          <li>• Complete component implementation</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Samples Tab */}
          {activeTab === 'samples' && (
            <div className="animate-[fadeSlideUp_0.8s_ease-out]">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Sample Profiles for Practice
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Click on any profile card to load it into the editor. These represent real-world examples 
                of how profile cards are used in different contexts.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sampleProfiles.map((profile, index) => (
                  <div
                    key={index}
                    className="cursor-pointer transform transition-all duration-500 hover:scale-[1.03]"
                    onClick={() => loadSampleProfile(profile)}
                    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                  >
                    <ProfileCard data={profile} />
                  </div>
                ))}
              </div>
              
              <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  Exercise Challenge
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Try creating your own profile card with these specifications:
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Add a "Connect" button that toggles connection status
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Include social media icons (GitHub, LinkedIn, Twitter)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Add a skill proficiency level (Beginner, Intermediate, Advanced)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Implement a dark/light mode toggle for the card
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Common Pitfalls Section */}
        <div 
          className="mb-12 animate-[fadeSlideUp_0.8s_ease-out]"
          style={{ animationDelay: '0.6s' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            Common Beginner Mistakes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                mistake: "Forgetting to destructure props",
                code: `// Wrong
function ProfileCard(props) {
  return <h1>{props.name}</h1>;
}

// Right
function ProfileCard({ name }) {
  return <h1>{name}</h1>;
}`,
                solution: "Always destructure props for cleaner code"
              },
              {
                mistake: "Missing keys in mapped lists",
                code: `// Wrong
{skills.map(skill => <span>{skill}</span>)}

// Right
{skills.map((skill, index) => 
  <span key={index}>{skill}</span>
)}`,
                solution: "Always provide unique keys for list items"
              },
              {
                mistake: "Direct state mutation",
                code: `// Wrong
const addSkill = () => {
  skills.push(newSkill); // Direct mutation
};

// Right
const addSkill = () => {
  setSkills([...skills, newSkill]); // New array
};`,
                solution: "Never mutate state directly, always create new values"
              },
              {
                mistake: "Complex components",
                code: `// Wrong: One giant component
function ProfileCard() {
  // 200 lines of code
}

// Right: Smaller components
function ProfileHeader() {...}
function ProfileSkills() {...}
function ProfileContact() {...}`,
                solution: "Break components into smaller, focused pieces"
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">
                  {item.mistake}
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                    <h4 className="font-semibold text-red-700 dark:text-red-400 text-sm mb-1">
                      Wrong
                    </h4>
                    <pre className="text-xs text-red-800 dark:text-red-300 overflow-x-auto">
                      {item.code.split('\n').slice(0, 4).join('\n')}
                    </pre>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 text-sm mb-1">
                      Right
                    </h4>
                    <pre className="text-xs text-green-800 dark:text-green-300 overflow-x-auto">
                      {item.code.split('\n').slice(5).join('\n')}
                    </pre>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  <strong>Solution:</strong> {item.solution}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Best Practices */}
        <div 
          className="mb-12 animate-[fadeSlideUp_0.8s_ease-out]"
          style={{ animationDelay: '0.8s' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Best Practices for Component Development
          </h2>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  Component Structure
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center flex-shrink-0 mt-1">
                      ✓
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Keep components focused on single responsibility
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center flex-shrink-0 mt-1">
                      ✓
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Use descriptive prop names that indicate purpose
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center flex-shrink-0 mt-1">
                      ✓
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Group related components in separate folders
                    </span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  Code Quality
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center flex-shrink-0 mt-1">
                      ✓
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Add PropTypes for prop validation
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center flex-shrink-0 mt-1">
                      ✓
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Use default props for optional values
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center flex-shrink-0 mt-1">
                      ✓
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Implement error boundaries for production
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl">
              <h4 className="font-bold text-gray-800 dark:text-white mb-3">
                Professional Component Pattern
              </h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                {`// Professional component structure
function ProfileCard({
  name,
  title,
  bio = '',
  location = '',
  email = '',
  phone = '',
  skills = [],
  avatarColor = 'blue'
}) {
  // Validation
  if (!name || !title) {
    return <ErrorFallback message="Missing required props" />;
  }

  // Early returns for edge cases
  if (skills.length === 0) {
    return <EmptyState />;
  }

  // Main render
  return (
    <div className="profile-card">
      {/* Component JSX */}
    </div>
  );
}

// PropTypes for documentation
ProfileCard.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  bio: PropTypes.string,
  skills: PropTypes.arrayOf(PropTypes.string)
};`}
              </pre>
            </div>
          </div>
        </div>

        {/* Teacher's Note */}
        <div 
          className="mb-12 animate-[fadeSlideUp_0.8s_ease-out]"
          style={{ animationDelay: '1s' }}
        >
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 border border-purple-200 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-700 transition-colors duration-300">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-white">👨‍🏫</span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  Teacher's Note
                </h3>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                    This practice lab is designed to solidify your understanding of React fundamentals. Remember these key insights:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 dark:text-white mb-2">Component Thinking</h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        A profile card is not just a UI element—it's a self-contained component with clear inputs (props) and behavior. 
                        Think about what data it needs (name, title, skills) and what it can do (toggle contact info, edit skills).
                      </p>
                    </div>
                    
                    <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 dark:text-white mb-2">State vs Props</h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        In our example, the profile data comes from props (could be from parent), while editing state is internal. 
                        This separation is crucial—props flow down, events bubble up, state stays local unless shared.
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg mb-4">
                    <p className="text-gray-700 dark:text-gray-300 italic">
                      "When Swadeep from Barrackpore first built his profile card, he put everything in one giant component. 
                      It worked, but was impossible to maintain. We refactored it into smaller components—ProfileHeader, 
                      ProfileSkills, ProfileContact—and suddenly testing, debugging, and updating became much easier."
                    </p>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <h4 className="font-bold text-gray-800 dark:text-white mb-2">Practice Exercise</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      Try extending this profile card: Add a "Follow" button that tracks connection status, 
                      include social media links, or add a skill rating system. The key is to practice the patterns, 
                      not just copy the code.
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-purple-200 dark:border-purple-800">
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>Teacher:</strong> Sukanta Hui | 27 years experience | Web Development Specialist
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Email: sukantahui@codernaccotax.co.in | Mobile: 7003756860
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hint Section */}
        <div 
          className="mb-12 animate-[fadeSlideUp_0.8s_ease-out]"
          style={{ animationDelay: '1.2s' }}
        >
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-2xl p-8 border border-yellow-200 dark:border-yellow-800">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
              <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Thinking Exercise
            </h3>
            <div className="space-y-6">
              <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <h4 className="font-bold text-gray-800 dark:text-white mb-2">Think about reusability...</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  How could you modify this ProfileCard component to work for different contexts? 
                  For example, a student profile vs. a teacher profile vs. a professional profile? 
                  What props would be common, and what would be specific to each type?
                </p>
              </div>
              
              <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <h4 className="font-bold text-gray-800 dark:text-white mb-2">Observe state management...</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Notice how we manage state for editing vs. displaying. The profile data could come from 
                  a parent component (like a user profile page) or from an API. How would you structure 
                  the component if the data came from an external API?
                </p>
              </div>
              
              <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <h4 className="font-bold text-gray-800 dark:text-white mb-2">Try this challenge...</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Add validation to the edit form: ensure email format is correct, phone number follows 
                  Indian format (+91 XXX XXX XXXX), and name is not empty. Where would you put this 
                  validation logic—in the component or in a separate utility function?
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div 
          className="animate-[fadeSlideUp_0.8s_ease-out]"
          style={{ animationDelay: '1.4s' }}
        >
          <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">Practice Lab Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-bold text-lg mb-3 text-blue-300">What You Practiced</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>Functional component creation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>Props and state management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>Event handling in React</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-3 text-green-300">Key Takeaways</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span>Components should be focused and reusable</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span>Never mutate state directly</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span>Always provide keys for list items</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-3 text-purple-300">Next Steps</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <span>Try the extension challenges</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <span>Build a portfolio of components</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <span>Learn about React hooks (next topic)</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-700">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h4 className="font-bold text-lg mb-2">Component Ready for Production</h4>
                  <p className="text-gray-400">
                    This profile card component follows industry best practices and is ready to be used 
                    in real applications with proper styling and state management.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-300">
                    Download Code
                  </button>
                  <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-300">
                    Try More Exercises
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic29;