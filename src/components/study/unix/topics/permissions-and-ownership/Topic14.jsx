import React from 'react';
import clsx from 'clsx';

export default class Topic14 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: false,
      showAnimation: false,
      activeCategory: 'users',
      selectedScenario: 'college',
      showChecklist: false,
      securityScore: 0
    };
  }

  componentDidMount() {
    // Trigger animations after mount
    setTimeout(() => {
      this.setState({ showAnimation: true });
    }, 100);
    
    // Check for dark mode preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.setState({ isDarkMode: true });
    }
    
    // Listen for dark mode changes
    this.darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkModeListener = (e) => this.setState({ isDarkMode: e.matches });
    this.darkModeMediaQuery.addListener(this.darkModeListener);
    
    // Calculate initial security score
    this.calculateSecurityScore();
  }

  componentWillUnmount() {
    if (this.darkModeMediaQuery && this.darkModeListener) {
      this.darkModeMediaQuery.removeListener(this.darkModeListener);
    }
  }

  calculateSecurityScore = () => {
    // This would be interactive in a real application
    const score = Math.floor(Math.random() * 40) + 60; // Random 60-100
    this.setState({ securityScore: score });
  };

  handleCategoryChange = (category) => {
    this.setState({ activeCategory: category });
  };

  handleScenarioChange = (scenario) => {
    this.setState({ selectedScenario: scenario });
  };

  toggleChecklist = () => {
    this.setState(prevState => ({ showChecklist: !prevState.showChecklist }));
  };

  getScenarios = () => {
    return {
      college: {
        title: "College Computer Lab",
        location: "Barrackpore RKM College",
        description: "Shared lab with 50+ students, multiple courses, limited IT staff",
        challenges: [
          "Students from different years/courses sharing same systems",
          "Limited physical security in lab",
          "Students installing unauthorized software",
          "Accidental/malicious file deletion",
          "Network attacks from within lab"
        ],
        bestPractices: [
          "Use LDAP for centralized authentication",
          "Implement disk quotas per student",
          "Set restrictive umask (0027) by default",
          "Use ACLs for group projects instead of 777",
          "Regular backup of student submissions",
          "Automated logout after inactivity"
        ],
        admin: "Swadeep (Lab Administrator)",
        users: "Tuhina, Abhronila, Debangshu + 47 other students"
      },
      hosting: {
        title: "Web Hosting Server",
        location: "Shyamnagar Data Center",
        description: "Shared hosting with multiple clients, different trust levels",
        challenges: [
          "Multiple clients on same physical server",
          "Clients with varying technical skills",
          "Resource abuse (CPU, memory, disk)",
          "One compromised client affecting others",
          "Compliance requirements (GDPR, etc.)"
        ],
        bestPractices: [
          "Use containers/VMs for isolation",
          "Implement resource limits (cgroups)",
          "Regular security patch updates",
          "Client data encryption at rest",
          "Detailed access logging and monitoring",
          "Regular security audits"
        ],
        admin: "Swadeep (System Administrator)",
        users: "15 business clients with their own users"
      },
      hospital: {
        title: "Hospital System",
        location: "Ichapur General Hospital",
        description: "Medical records system with strict privacy requirements",
        challenges: [
          "HIPAA/medical data privacy compliance",
          "Different access needs: doctors, nurses, admin",
          "Emergency access requirements",
          "Audit trail for all accesses",
          "Data backup and recovery requirements"
        ],
        bestPractices: [
          "Role-Based Access Control (RBAC)",
          "Full audit logging with SIEM integration",
          "Regular access review and recertification",
          "Encryption for data at rest and in transit",
          "Disaster recovery testing quarterly",
          "Least privilege principle strictly enforced"
        ],
        admin: "Dr. Debangshu (IT Head)",
        users: "Doctors, nurses, admin staff, auditors"
      },
      research: {
        title: "Research Facility",
        location: "Naihati University Research Center",
        description: "Multi-disciplinary research with international collaboration",
        challenges: [
          "Researchers from different institutions",
          "Proprietary research data protection",
          "Intellectual property concerns",
          "Temporary access for collaborators",
          "Export control compliance"
        ],
        bestPractices: [
          "Project-based access with expiration dates",
          "Data classification and labeling",
          "Network segmentation for sensitive projects",
          "Two-factor authentication for external access",
          "Regular security awareness training",
          "Incident response plan testing"
        ],
        admin: "Prof. Abhronila (Research Director)",
        users: "Researchers, students, external collaborators"
      }
    };
  };

  getBestPractices = () => {
    const practices = {
      users: [
        {
          title: "Principle of Least Privilege",
          description: "Users get only the permissions they absolutely need",
          example: "Tuhina can read project files but cannot modify system configs",
          command: "sudo visudo  # Grant specific commands only",
          importance: "Critical",
          impact: "Prevents accidental/malicious damage"
        },
        {
          title: "Regular Access Reviews",
          description: "Periodically review who has access to what",
          example: "Monthly review of sudoers file and group memberships",
          command: "getent group sudo; sudo -l -U username",
          importance: "High",
          impact: "Removes stale access rights"
        },
        {
          title: "Strong Password Policies",
          description: "Enforce password complexity and rotation",
          example: "Minimum 12 characters, mix of types, change every 90 days",
          command: "vim /etc/login.defs  # Set PASS_MAX_DAYS etc.",
          importance: "Critical",
          impact: "Prevents brute force attacks"
        },
        {
          title: "Use Sudo Instead of Su",
          description: "Never share root password, use sudo with auditing",
          example: "Swadeep can restart Apache but not modify other services",
          command: "swadeep ALL=(root) /usr/bin/systemctl restart apache2",
          importance: "High",
          impact: "Audit trail for privileged actions"
        }
      ],
      files: [
        {
          title: "Appropriate umask Settings",
          description: "Set restrictive default permissions",
          example: "umask 0027 for production, 0002 for development",
          command: "echo 'umask 0027' >> /etc/profile",
          importance: "Critical",
          impact: "Prevents accidental world-readable files"
        },
        {
          title: "Regular Permission Audits",
          description: "Check for files with insecure permissions",
          example: "Find world-writable files regularly",
          command: "find / -type f -perm -o+w -ls 2>/dev/null",
          importance: "High",
          impact: "Identifies security misconfigurations"
        },
        {
          title: "Use Sticky Bit on Shared Dirs",
          description: "Prevent users from deleting others' files",
          example: "/tmp directory allows anyone to create but not delete others' files",
          command: "chmod +t /shared_directory",
          importance: "Medium",
          impact: "Protects against accidental deletion"
        },
        {
          title: "Implement ACLs Wisely",
          description: "Use ACLs only when standard permissions insufficient",
          example: "Specific permissions for Swadeep, Tuhina, Abhronila without new group",
          command: "setfacl -m u:swadeep:rwx,u:tuhina:r-x /project",
          importance: "Medium",
          impact: "Fine-grained control without complexity explosion"
        }
      ],
      monitoring: [
        {
          title: "Comprehensive Logging",
          description: "Log all authentication attempts and privileged actions",
          example: "Failed login attempts, sudo usage, file permission changes",
          command: "vim /etc/rsyslog.conf  # Configure logging",
          importance: "Critical",
          impact: "Enables incident investigation"
        },
        {
          title: "Regular Log Review",
          description: "Automated analysis of security logs",
          example: "Daily report of failed logins, sudo usage",
          command: "grep 'Failed password' /var/log/auth.log",
          importance: "High",
          impact: "Early detection of attacks"
        },
        {
          title: "File Integrity Monitoring",
          description: "Detect unauthorized file changes",
          example: "Monitor /etc/passwd, /etc/shadow, system binaries",
          command: "aide --init; aide --check  # Advanced Intrusion Detection",
          importance: "High",
          impact: "Detects rootkits and unauthorized changes"
        },
        {
          title: "User Activity Monitoring",
          description: "Track user actions, especially privileged ones",
          example: "auditd for comprehensive user activity tracking",
          command: "auditctl -a always,exit -F arch=b64 -S execve",
          importance: "Medium",
          impact: "Accountability and forensic capability"
        }
      ],
      backup: [
        {
          title: "Regular Backups",
          description: "Automated, tested backup procedures",
          example: "Daily incremental, weekly full backups",
          command: "crontab -e  # Schedule backup jobs",
          importance: "Critical",
          impact: "Data recovery after incidents"
        },
        {
          title: "Backup Encryption",
          description: "Encrypt backups containing sensitive data",
          example: "Medical records in Ichapur hospital backups",
          command: "tar czf - /data | gpg -c > backup.tar.gz.gpg",
          importance: "High",
          impact: "Protects backup data if media lost"
        },
        {
          title: "Backup Testing",
          description: "Regularly test backup restoration",
          example: "Quarterly restore tests at Shyamnagar data center",
          command: "# Test script to verify backup integrity",
          importance: "High",
          impact: "Ensures backups actually work"
        },
        {
          title: "Off-site Backups",
          description: "Keep backups in separate physical location",
          example: "Barrackpore college backups to Naihati campus",
          command: "rsync -avz /backups/ backup-server:/remote-backups/",
          importance: "Medium",
          impact: "Survives physical disasters"
        }
      ]
    };

    return practices[this.state.activeCategory] || practices.users;
  };

  render() {
    const { isDarkMode, showAnimation, activeCategory, selectedScenario, showChecklist, securityScore } = this.state;
    const scenarios = this.getScenarios();
    const currentScenario = scenarios[selectedScenario];
    const bestPractices = this.getBestPractices();

    const themeClasses = clsx(
      'min-h-screen transition-colors duration-300',
      isDarkMode 
        ? 'bg-gray-900 text-gray-100' 
        : 'bg-gradient-to-br from-emerald-50 to-cyan-50 text-gray-900'
    );

    const cardClasses = clsx(
      'rounded-xl p-6 transition-all duration-300',
      isDarkMode
        ? 'bg-gray-800 border border-gray-700 hover:border-emerald-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]'
        : 'bg-white border border-gray-200 hover:border-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]'
    );

    const teacherNoteClasses = clsx(
      'rounded-lg p-5 transition-all duration-300',
      isDarkMode
        ? 'bg-gradient-to-r from-amber-900/30 to-yellow-900/30 border-l-4 border-yellow-500 hover:shadow-[0_0_25px_rgba(234,179,8,0.15)]'
        : 'bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-yellow-500 hover:shadow-[0_0_25px_rgba(234,179,8,0.2)]'
    );

    const sectionAnimation = clsx(
      'transition-all duration-700 motion-safe:animate-[fadeInUp_0.8s_ease-out]',
      showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    );

    // Inline styles for keyframes
    const keyframesStyle = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes pulseSecurity {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
    `;

    const getSecurityColor = (score) => {
      if (score >= 90) return 'text-green-600 dark:text-green-400';
      if (score >= 70) return 'text-yellow-600 dark:text-yellow-400';
      return 'text-red-600 dark:text-red-400';
    };

    const getSecurityBg = (score) => {
      if (score >= 90) return 'bg-green-100 dark:bg-green-900/30';
      if (score >= 70) return 'bg-yellow-100 dark:bg-yellow-900/30';
      return 'bg-red-100 dark:bg-red-900/30';
    };

    return (
      <div className={themeClasses}>
        <style>{keyframesStyle}</style>
        
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          {/* Header Section */}
          <header className={clsx(sectionAnimation, "mb-12 text-center")}>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Topic 5: Security Best Practices for Multi-User Systems
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Protecting shared systems through defense-in-depth and principle of least privilege.
            </p>
          </header>

          {/* Security Overview Section */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.1s'}}>
            <h2 className="text-2xl font-bold mb-4 text-emerald-700 dark:text-emerald-400">
              <span className="inline-block p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg mr-2">🛡️</span>
              The Multi-User Security Challenge
            </h2>
            
            <div className="space-y-6">
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="mb-4 text-lg">
                  Multi-user systems face unique security challenges. Each additional user increases the 
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400"> attack surface</span> 
                  and potential for accidental or malicious damage. Security is not just about keeping 
                  outsiders out, but also about managing legitimate users appropriately.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <h4 className="font-bold mb-2 text-red-700 dark:text-red-400">🔓 Accidental Exposure</h4>
                    <p className="text-sm">Users create world-readable files with sensitive data</p>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <h4 className="font-bold mb-2 text-yellow-700 dark:text-yellow-400">👥 Privilege Escalation</h4>
                    <p className="text-sm">Users gaining unauthorized access to others' data</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-bold mb-2 text-blue-700 dark:text-blue-400">💥 Denial of Service</h4>
                    <p className="text-sm">Users consuming all resources (disk, CPU, memory)</p>
                  </div>
                </div>
              </div>
              
              {/* Security Score */}
              <div className={`p-6 ${getSecurityBg(securityScore)} rounded-lg border-l-4 ${securityScore >= 90 ? 'border-green-500' : securityScore >= 70 ? 'border-yellow-500' : 'border-red-500'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">System Security Score</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Based on current configuration and practices
                    </p>
                  </div>
                  <div className="text-center">
                    <div className={`text-5xl font-bold ${getSecurityColor(securityScore)}`} style={{animation: 'pulseSecurity 2s infinite'}}>
                      {securityScore}%
                    </div>
                    <p className="text-sm mt-2">
                      {securityScore >= 90 ? 'Excellent' : securityScore >= 70 ? 'Good' : 'Needs Improvement'}
                    </p>
                  </div>
                </div>
                <div className="mt-4 w-full bg-gray-300 dark:bg-gray-700 rounded-full h-4">
                  <div 
                    className={`h-4 rounded-full ${securityScore >= 90 ? 'bg-green-500' : securityScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${securityScore}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Real-World Perspective:</p>
                <p>
                  At Barrackpore college, Swadeep manages 50+ students. At Shyamnagar hosting, he manages 15 business clients. 
                  At Ichapur hospital, Dr. Debangshu manages medical staff with life-critical access needs. 
                  Each requires different security approaches but shares common principles.
                </p>
              </div>
            </div>
          </section>

          {/* Scenario Selection */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.2s'}}>
            <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-400">
              <span className="inline-block p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-2">🏢</span>
              Real-World Multi-User Scenarios
            </h2>
            
            <div className="space-y-6">
              <div className="mb-6">
                <label className="block mb-3 font-semibold text-lg">Select Environment:</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.keys(scenarios).map((key) => (
                    <button
                      key={key}
                      onClick={() => this.handleScenarioChange(key)}
                      className={clsx(
                        "p-4 rounded-lg transition-all duration-300 text-left",
                        selectedScenario === key
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700'
                      )}
                    >
                      <div className="font-semibold">{scenarios[key].title}</div>
                      <div className="text-xs opacity-80">{scenarios[key].location}</div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Current Scenario Details */}
              <div className="space-y-4">
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold">{currentScenario.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{currentScenario.location}</p>
                    </div>
                    <div className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full text-sm">
                      Admin: {currentScenario.admin}
                    </div>
                  </div>
                  <p className="mb-4">{currentScenario.description}</p>
                  <div className="text-sm">
                    <span className="font-semibold">Users:</span> {currentScenario.users}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <h4 className="font-bold mb-3 text-red-700 dark:text-red-400">🔴 Key Challenges:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      {currentScenario.challenges.map((challenge, index) => (
                        <li key={index} className="text-sm">{challenge}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-bold mb-3 text-green-700 dark:text-green-400">✅ Best Practices:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      {currentScenario.bestPractices.map((practice, index) => (
                        <li key={index} className="text-sm">{practice}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Best Practices by Category */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.3s'}}>
            <h2 className="text-2xl font-bold mb-6 text-purple-700 dark:text-purple-400">
              <span className="inline-block p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-2">📋</span>
              Detailed Best Practices
            </h2>
            
            <div className="space-y-6">
              {/* Category Navigation */}
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => this.handleCategoryChange('users')}
                  className={clsx(
                    "px-4 py-2 rounded-lg transition-all duration-300 font-semibold",
                    activeCategory === 'users'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700'
                  )}
                >
                  👤 User Management
                </button>
                <button
                  onClick={() => this.handleCategoryChange('files')}
                  className={clsx(
                    "px-4 py-2 rounded-lg transition-all duration-300 font-semibold",
                    activeCategory === 'files'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700'
                  )}
                >
                  📁 File Permissions
                </button>
                <button
                  onClick={() => this.handleCategoryChange('monitoring')}
                  className={clsx(
                    "px-4 py-2 rounded-lg transition-all duration-300 font-semibold",
                    activeCategory === 'monitoring'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700'
                  )}
                >
                  📊 Monitoring & Logging
                </button>
                <button
                  onClick={() => this.handleCategoryChange('backup')}
                  className={clsx(
                    "px-4 py-2 rounded-lg transition-all duration-300 font-semibold",
                    activeCategory === 'backup'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700'
                  )}
                >
                  💾 Backup & Recovery
                </button>
              </div>
              
              {/* Practices Display */}
              <div className="space-y-4">
                {bestPractices.map((practice, index) => (
                  <div 
                    key={index}
                    className={clsx(
                      "p-4 rounded-lg transition-all duration-300 hover:scale-[1.01]",
                      practice.importance === 'Critical' 
                        ? 'bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500' 
                        : practice.importance === 'High'
                        ? 'bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500'
                        : 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500'
                    )}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center">
                          <span className="font-bold text-lg">{practice.title}</span>
                          <span className={clsx(
                            "ml-3 px-2 py-1 rounded text-xs",
                            practice.importance === 'Critical' 
                              ? 'bg-red-200 dark:bg-red-900 text-red-800 dark:text-red-300'
                              : practice.importance === 'High'
                              ? 'bg-yellow-200 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300'
                              : 'bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-300'
                          )}>
                            {practice.importance} Priority
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mt-1">{practice.description}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                      <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded">
                        <p className="text-sm font-semibold mb-1">Example:</p>
                        <p className="text-sm">{practice.example}</p>
                      </div>
                      
                      <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded">
                        <p className="text-sm font-semibold mb-1">Command:</p>
                        <code className="text-xs font-mono bg-gray-900 text-green-400 p-1 rounded block">
                          {practice.command}
                        </code>
                      </div>
                      
                      <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded">
                        <p className="text-sm font-semibold mb-1">Impact:</p>
                        <p className="text-sm">{practice.impact}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Defense in Depth Visualization */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.4s'}}>
            <h2 className="text-2xl font-bold mb-6 text-indigo-700 dark:text-indigo-400">
              <span className="inline-block p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg mr-2">🛡️</span>
              Defense in Depth Strategy
            </h2>
            
            <div className="space-y-6">
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="mb-4">
                  Security should be implemented in <span className="font-semibold text-indigo-600 dark:text-indigo-400">multiple layers</span>. 
                  If one layer fails, others provide protection. This is called "Defense in Depth" - 
                  like medieval castles with walls, moats, and gates.
                </p>
                
                {/* Defense Layers Visualization */}
                <div className="flex justify-center mb-6">
                  <svg width="600" height="350" viewBox="0 0 600 350" className="w-full max-w-2xl">
                    {/* Outer Layer - Network */}
                    <circle cx="300" cy="175" r="140" fill="none" stroke="#3B82F6" strokeWidth="3" strokeDasharray="5,5">
                      <animate attributeName="r" values="140;145;140" dur="4s" repeatCount="indefinite" />
                    </circle>
                    <text x="300" y="50" textAnchor="middle" fill="#3B82F6" fontSize="16" fontWeight="bold">
                      Layer 1: Network Security
                    </text>
                    <text x="300" y="70" textAnchor="middle" fill="#6B7280" fontSize="12">
                      Firewalls, VLANs, VPNs, IDS/IPS
                    </text>
                    
                    {/* Middle Layer - System */}
                    <circle cx="300" cy="175" r="100" fill="none" stroke="#10B981" strokeWidth="4">
                      <animate attributeName="stroke-width" values="4;6;4" dur="3s" repeatCount="indefinite" />
                    </circle>
                    <text x="300" y="100" textAnchor="middle" fill="#10B981" fontSize="16" fontWeight="bold">
                      Layer 2: System Security
                    </text>
                    <text x="300" y="120" textAnchor="middle" fill="#6B7280" fontSize="12">
                      Updates, SELinux, firewalls, hardening
                    </text>
                    
                    {/* Inner Layer - Access Control */}
                    <circle cx="300" cy="175" r="60" fill="none" stroke="#8B5CF6" strokeWidth="5">
                      <animate attributeName="stroke-opacity" values="1;0.7;1" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <text x="300" cy="150" textAnchor="middle" fill="#8B5CF6" fontSize="16" fontWeight="bold">
                      Layer 3: Access Control
                    </text>
                    <text x="300" cy="170" textAnchor="middle" fill="#6B7280" fontSize="12">
                      Users, groups, permissions, ACLs, sudo
                    </text>
                    
                    {/* Core - Data */}
                    <circle cx="300" cy="175" r="30" fill="#EC4899" opacity="0.8">
                      <animate attributeName="fill" values="#EC4899;#BE185D;#EC4899" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <text x="300" y="175" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                      Data
                    </text>
                    <text x="300" y="195" textAnchor="middle" fill="white" fontSize="10">
                      The protected asset
                    </text>
                    
                    {/* Attack Vector */}
                    <path d="M600,175 L450,175" stroke="#EF4444" strokeWidth="2" strokeDasharray="5,5">
                      <animate attributeName="stroke-dashoffset" values="100;0" dur="2s" repeatCount="indefinite" />
                    </path>
                    <text x="525" y="170" textAnchor="middle" fill="#EF4444" fontSize="12">
                      Attack
                    </text>
                    
                    {/* Defense Labels */}
                    <text x="450" y="250" textAnchor="middle" fill="#3B82F6" fontSize="10">Must breach all layers</text>
                    <text x="300" y="280" textAnchor="middle" fill="#6B7280" fontSize="10">
                      Each layer provides independent protection
                    </text>
                  </svg>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-bold mb-2 text-blue-700 dark:text-blue-400">Naihati Research Example:</h4>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Layer 1: Network firewall blocks external access</li>
                      <li>Layer 2: SELinux prevents process privilege escalation</li>
                      <li>Layer 3: ACLs control which researchers access which data</li>
                      <li>Even if attacker gets network access, other layers protect data</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-bold mb-2 text-green-700 dark:text-green-400">Ichapur Hospital Example:</h4>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Layer 1: VLAN isolation for medical devices</li>
                      <li>Layer 2: Regular security patches applied</li>
                      <li>Layer 3: RBAC with least privilege for staff</li>
                      <li>Even if nurse workstation compromised, patient data protected</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Teacher's Note */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.5s'}}>
            <div className={teacherNoteClasses}>
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center text-white font-bold">
                    SH
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-amber-800 dark:text-yellow-300">Teacher's Note</h3>
                    <span className="text-sm px-3 py-1 bg-amber-200 dark:bg-amber-900 rounded-full font-semibold">
                      Sukanta Hui
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="mb-2"><strong>Experience:</strong> 27 years in Programming, RDBMS, OS, Web Development</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Email: sukantahui@codernaccotax.co.in | Mobile: 7003756860
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-white/50 dark:bg-gray-900/30 rounded">
                      <p className="font-semibold text-amber-700 dark:text-yellow-400 mb-1">🎯 Critical Insight:</p>
                      <p>Security is a process, not a product. At Barrackpore college, we don't just set permissions once - we review monthly, audit quarterly, and train continuously. The human element (training Swadeep, Tuhina, others) is as important as technical controls.</p>
                    </div>
                    
                    <div className="p-3 bg-white/50 dark:bg-gray-900/30 rounded">
                      <p className="font-semibold text-amber-700 dark:text-yellow-400 mb-1">💡 Teaching Strategy:</p>
                      <p>When teaching at Ichapur hospital, I use medical analogies: "Permissions are like prescription authority. Interns (read-only), residents (limited write), attending physicians (full access). You wouldn't let an intern perform surgery, so don't give interns root access."</p>
                    </div>
                    
                    <div className="p-3 bg-white/50 dark:bg-gray-900/30 rounded">
                      <p className="font-semibold text-amber-700 dark:text-yellow-400 mb-1">🔧 Professional Tip:</p>
                      <p>Document everything. At Shyamnagar hosting, we maintain a "security runbook" for each client. When Swadeep is on vacation and Tuhina needs to handle an incident, the documentation saves the day. Include: user lists, permission matrices, backup procedures, contact lists.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Common Mistakes Section */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.6s'}}>
            <h2 className="text-2xl font-bold mb-4 text-red-700 dark:text-red-400">
              <span className="inline-block p-2 bg-red-100 dark:red-900/30 rounded-lg mr-2">🚫</span>
              Common Security Mistakes
            </h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h4 className="font-bold mb-2">1. Using 777 permissions as "solution"</h4>
                <p className="text-sm">When Tuhina at Barrackpore college can't access a file, giving 777 "fixes" it but exposes everything. Proper solution: diagnose the real issue (wrong group? missing ACL? incorrect umask?).</p>
                <code className="block mt-2 p-2 bg-gray-900 text-red-400 rounded text-xs">
                  # WRONG: chmod 777 /project<br/>
                  # RIGHT: setfacl -m u:tuhina:r-x /project  # or add to correct group
                </code>
              </div>
              
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h4 className="font-bold mb-2">2. Sharing passwords instead of using sudo</h4>
                <p className="text-sm">When Abhronila needs root access at Naihati research, giving her the root password means no audit trail. Use sudo with specific command permissions instead.</p>
                <code className="block mt-2 p-2 bg-gray-900 text-red-400 rounded text-xs">
                  # WRONG: root password = "research123"<br/>
                  # RIGHT: abhronila ALL=(root) /usr/bin/systemctl restart research-service
                </code>
              </div>
              
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h4 className="font-bold mb-2">3. Not setting disk quotas</h4>
                <p className="text-sm">At Shyamnagar hosting, one client filling the disk affects all others. Implement quotas before problems occur, not after.</p>
                <code className="block mt-2 p-2 bg-gray-900 text-red-400 rounded text-xs">
                  # Set quota for user swadeep<br/>
                  $ setquota -u swadeep 1000000 1100000 0 0 /home<br/>
                  # Check usage<br/>
                  $ repquota -a
                </code>
              </div>
              
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h4 className="font-bold mb-2">4. Forgetting about backup security</h4>
                <p className="text-sm">Backups at Ichapur hospital with world-readable permissions expose patient data. Backups need same security as original data.</p>
                <code className="block mt-2 p-2 bg-gray-900 text-red-400 rounded text-xs">
                  # Secure backup creation<br/>
                  $ tar czf /backups/medical-$(date +%F).tar.gz --acls --xattrs /medical<br/>
                  $ chmod 600 /backups/medical-*.tar.gz
                </code>
              </div>
            </div>
          </section>

          {/* Checklist Section */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.7s'}}>
            <h2 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-400">
              <span className="inline-block p-2 bg-green-100 dark:green-900/30 rounded-lg mr-2">✅</span>
              Security Implementation Checklist
            </h2>
            
            <div className="space-y-4">
              <button
                onClick={this.toggleChecklist}
                className="w-full p-4 bg-emerald-100 dark:bg-emerald-900/30 hover:bg-emerald-200 dark:hover:bg-emerald-800/50 rounded-lg transition-colors duration-300 text-emerald-700 dark:text-emerald-400 font-semibold text-lg"
              >
                {showChecklist ? '▲ Hide Checklist' : '▼ Show Security Implementation Checklist'}
              </button>
              
              {showChecklist && (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-bold mb-3 text-blue-700 dark:text-blue-400">Initial Setup (Barrackpore College Example)</h4>
                    <div className="space-y-2">
                      {[
                        "☐ Create groups for different courses/years",
                        "☐ Set default umask 0027 in /etc/profile",
                        "☐ Implement disk quotas for all student accounts",
                        "☐ Configure sudo for lab assistants with specific commands",
                        "☐ Set up centralized logging for auth attempts",
                        "☐ Create backup script for student submissions",
                        "☐ Document user management procedures"
                      ].map((item, index) => (
                        <div key={index} className="flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                          <input type="checkbox" className="mr-3 h-5 w-5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-bold mb-3 text-purple-700 dark:text-purple-400">Ongoing Maintenance (Shyamnagar Hosting Example)</h4>
                    <div className="space-y-2">
                      {[
                        "☐ Monthly user access review",
                        "☐ Weekly check for world-writable files",
                        "☐ Daily review of auth logs for failed attempts",
                        "☐ Quarterly backup restoration test",
                        "☐ Monthly security patch application",
                        "☐ Bi-annual security awareness training",
                        "☐ Annual penetration testing"
                      ].map((item, index) => (
                        <div key={index} className="flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                          <input type="checkbox" className="mr-3 h-5 w-5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-bold mb-3 text-red-700 dark:text-red-400">Incident Response (Ichapur Hospital Example)</h4>
                    <div className="space-y-2">
                      {[
                        "☐ Maintain updated contact list for all admins",
                        "☐ Document escalation procedures",
                        "☐ Keep forensic tools ready (aide, auditd, log collectors)",
                        "☐ Test incident response plan quarterly",
                        "☐ Maintain offline backups for recovery",
                        "☐ Document legal/compliance reporting requirements",
                        "☐ Conduct post-incident review for improvements"
                      ].map((item, index) => (
                        <div key={index} className="flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                          <input type="checkbox" className="mr-3 h-5 w-5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="font-semibold text-yellow-700 dark:text-yellow-400 mb-1">💡 Pro Tip:</p>
                <p>At Naihati research center, we use this checklist in our monthly security meetings. Swadeep reviews user management, Tuhina reviews file permissions, Abhronila reviews backups. Divide responsibilities for better coverage.</p>
              </div>
            </div>
          </section>

          {/* Hint Section */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.8s'}}>
            <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">
              <span className="inline-block p-2 bg-indigo-100 dark:indigo-900/30 rounded-lg mr-2">💡</span>
              Thinking Hints & Security Assessment
            </h2>
            
            <div className="space-y-3">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <p className="font-semibold mb-1">🔍 Assess this scenario:</p>
                <p className="text-sm">
                  At Barrackpore college, Swadeep finds that student project directories have these permissions:
                  <code className="block bg-gray-900 text-green-400 p-2 rounded font-mono text-xs mt-1">
                    drwxrwxrwx  5 student1 students 4096 Jan 30 10:00 project_alpha/<br/>
                    -rw-r--r--  1 student2 students 1024 Jan 30 10:05 secret_data.txt<br/>
                    drwxr-x---  2 teacher1 teachers 4096 Jan 30 09:00 grading/
                  </code>
                  What are the security issues and how would you fix them?
                </p>
              </div>
              
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <p className="font-semibold mb-1">🤔 Consider this policy:</p>
                <p className="text-sm">
                  "All users at Shyamnagar hosting must change passwords every 30 days. Minimum 8 characters."
                  What's wrong with this policy from modern security perspective? What would be better?
                </p>
              </div>
              
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <p className="font-semibold mb-1">🧪 Design a solution:</p>
                <p className="text-sm">
                  At Ichapur hospital, design access control for: Doctors (read/write all), Nurses (read patient files, write vitals), 
                  Admin (read-only billing), Auditors (temporary read-only access). How would you implement this?
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">🎯 Remember:</p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Security vs. Usability: Find the right balance for your environment</li>
                  <li>Documentation: If it's not documented, it doesn't exist</li>
                  <li>Testing: Test backups, test recovery, test incident response</li>
                  <li>Continuous Improvement: Security is never "done" - review and improve regularly</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quick Reference Section */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.9s'}}>
            <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-400">
              <span className="inline-block p-2 bg-blue-100 dark:blue-900/30 rounded-lg mr-2">📋</span>
              Security Commands Quick Reference
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className={isDarkMode ? "bg-gray-800" : "bg-gray-100"}>
                    <th className="p-3 text-left border">Task</th>
                    <th className="p-3 text-left border">Command</th>
                    <th className="p-3 text-left border">Purpose</th>
                    <th className="p-3 text-left border">Frequency</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border">Check world-writable files</td>
                    <td className="p-3 border font-mono text-sm">find / -perm -o+w -type f 2>/dev/null</td>
                    <td className="p-3 border">Find insecure permissions</td>
                    <td className="p-3 border">Weekly</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border">Review sudo access</td>
                    <td className="p-3 border font-mono text-sm">sudo -l -U username</td>
                    <td className="p-3 border">Check user privileges</td>
                    <td className="p-3 border">Monthly</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border">Check failed logins</td>
                    <td className="p-3 border font-mono text-sm">grep "Failed password" /var/log/auth.log</td>
                    <td className="p-3 border">Detect brute force attacks</td>
                    <td className="p-3 border">Daily</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border">Set disk quotas</td>
                    <td className="p-3 border font-mono text-sm">setquota -u user soft hard /mount</td>
                    <td className="p-3 border">Prevent disk filling</td>
                    <td className="p-3 border">On user creation</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border">Check ACLs recursively</td>
                    <td className="p-3 border font-mono text-sm">getfacl -R /shared > acl_backup.txt</td>
                    <td className="p-3 border">Audit and backup ACLs</td>
                    <td className="p-3 border">Monthly</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border">Verify backup integrity</td>
                    <td className="p-3 border font-mono text-sm">tar -tzf backup.tar.gz | head -20</td>
                    <td className="p-3 border">Test backup files</td>
                    <td className="p-3 border">Weekly</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border">Check user last login</td>
                    <td className="p-3 border font-mono text-sm">lastlog | grep -v "Never"</td>
                    <td className="p-3 border">Find inactive accounts</td>
                    <td className="p-3 border">Quarterly</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border">Monitor file changes</td>
                    <td className="p-3 border font-mono text-sm">aide --check</td>
                    <td className="p-3 border">Detect unauthorized changes</td>
                    <td className="p-3 border">Daily</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Footer */}
          <footer className={clsx(sectionAnimation, "mt-12 pt-8 border-t border-gray-300 dark:border-gray-700 text-center")}>
            <p className="text-gray-600 dark:text-gray-400">
              Topic 5: Security Best Practices - Building Robust Multi-User Systems
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Next Topic: Practical lab: Secure a project directory for multi-user access
            </p>
          </footer>
        </div>
      </div>
    );
  }
}

