import React from 'react';
import clsx from 'clsx';

export default  class Topic16 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: false,
      showAnimation: false,
      activeCategory: 'basic',
      selectedMistake: null,
      troubleshootingStep: 1,
      showDiagnosis: false,
      userRole: 'admin'
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
  }

  componentWillUnmount() {
    if (this.darkModeMediaQuery && this.darkModeListener) {
      this.darkModeMediaQuery.removeListener(this.darkModeListener);
    }
  }

  handleCategoryChange = (category) => {
    this.setState({ activeCategory: category, selectedMistake: null });
  };

  handleMistakeSelect = (mistake) => {
    this.setState({ 
      selectedMistake: mistake,
      troubleshootingStep: 1,
      showDiagnosis: false 
    });
  };

  handleTroubleshootingStep = (step) => {
    this.setState({ troubleshootingStep: step });
  };

  toggleDiagnosis = () => {
    this.setState(prevState => ({ showDiagnosis: !prevState.showDiagnosis }));
  };

  handleRoleChange = (role) => {
    this.setState({ userRole: role });
  };

  getMistakes = () => {
    const mistakes = {
      basic: [
        {
          id: 'basic1',
          title: "Using 777 as quick fix",
          description: "When access doesn't work, beginners often run 'chmod 777' instead of diagnosing the real issue",
          symptoms: [
            "World-writable files/directories",
            "Security audit failures",
            "Multiple users reporting access issues"
          ],
          scenario: "At Barrackpore college, Swadeep couldn't access a shared directory. Instead of investigating, Tuhina ran 'chmod 777 /shared' which exposed everything.",
          rootCause: "Lack of understanding of permission bits and proper troubleshooting methodology",
          impact: "Critical - Exposes all data to all users",
          solution: "Use proper troubleshooting: check owner, group, ACLs, user groups first",
          prevention: "Establish policy: 777 is never allowed. Document proper troubleshooting steps.",
          commands: [
            "# WRONG: The quick 'fix'",
            "$ chmod 777 /shared/project",
            "",
            "# RIGHT: Proper troubleshooting",
            "$ ls -ld /shared/project",
            "$ getfacl /shared/project",
            "$ id swadeep",
            "$ groups swadeep"
          ]
        },
        {
          id: 'basic2',
          title: "Forgetting directory execute bit",
          description: "Setting directory to drw-r--r-- (644) makes it inaccessible even with read permission",
          symptoms: [
            "'Permission denied' when trying to cd into directory",
            "Cannot list directory contents even though files seem readable",
            "Web server can't serve files from directory"
          ],
          scenario: "At Shyamnagar hosting, Abhronila set web directory to 644. Apache showed '403 Forbidden' even though files were readable.",
          rootCause: "Misunderstanding that execute on directory means 'traverse/search', not 'run as program'",
          impact: "High - Makes directories completely inaccessible",
          solution: "Add execute bit: chmod +x or chmod 755 on directories",
          prevention: "Remember: directories need at least --x to be accessible",
          commands: [
            "# WRONG: Directory without execute",
            "$ chmod 644 /var/www/html",
            "$ ls -ld /var/www/html",
            "drw-r--r-- ... /var/www/html",
            "# Can't cd or ls!",
            "",
            "# RIGHT: Add execute bit",
            "$ chmod 755 /var/www/html",
            "$ ls -ld /var/www/html",
            "drwxr-xr-x ... /var/www/html"
          ]
        },
        {
          id: 'basic3',
          title: "Confusing symbolic and octal notation",
          description: "Mixing u=rwx with 755, or using wrong values in chmod",
          symptoms: [
            "Unexpected permission results",
            "Errors when using chmod",
            "Inconsistent behavior across systems"
          ],
          scenario: "Debangshu at Ichapur hospital tried 'chmod u+rwx,g+rx,o+r' but wrote 'chmod 754' thinking it was equivalent (it's 754 = rwxr-xr--, not rwxr-xr-x).",
          rootCause: "Not understanding that 4=r, 2=w, 1=x and summing per position",
          impact: "Medium - Wrong permissions but might still work partially",
          solution: "Learn octal: 0=---, 1=--x, 2=-w-, 3=-wx, 4=r--, 5=r-x, 6=rw-, 7=rwx",
          prevention: "Use symbolic notation for clarity, or verify with ls -l after chmod",
          commands: [
            "# Understanding octal:",
            "# 7 = 4(r) + 2(w) + 1(x) = rwx",
            "# 5 = 4(r) + 0(w) + 1(x) = r-x",
            "# 4 = 4(r) + 0(w) + 0(x) = r--",
            "",
            "# So:",
            "$ chmod 755 file  # rwxr-xr-x",
            "$ chmod 644 file  # rw-r--r--",
            "$ chmod 750 file  # rwxr-x---"
          ]
        }
      ],
      intermediate: [
        {
          id: 'inter1',
          title: "ACL mask confusion",
          description: "Not understanding that mask limits effective permissions, overriding individual ACL entries",
          symptoms: [
            "User has rwx in ACL but can't write",
            "getfacl shows #effective: different from requested",
            "Changing ACLs doesn't change actual access"
          ],
          scenario: "At Naihati research, Swadeep gave Tuhina rwx via ACL but mask was r-x. Tuhina couldn't write despite having rwx entry.",
          rootCause: "Mask defines maximum allowed permissions for all named users/groups and group owner",
          impact: "High - ACLs appear correct but don't work as expected",
          solution: "Check mask with getfacl, adjust with 'setfacl -m m::perms'",
          prevention: "Always check #effective permissions in getfacl output",
          commands: [
            "# Problem: Mask limits permissions",
            "$ setfacl -m u:tuhina:rwx /research/data",
            "$ setfacl -m m::r-x /research/data",
            "$ getfacl /research/data",
            "# user:tuhina:rwx          #effective:r-x",
            "",
            "# Solution: Adjust mask",
            "$ setfacl -m m::rwx /research/data",
            "$ getfacl /research/data",
            "# user:tuhina:rwx          #effective:rwx"
          ]
        },
        {
          id: 'inter2',
          title: "Group membership oversight",
          description: "Assuming user has file access because of group permissions, without checking actual group membership",
          symptoms: [
            "User reports 'Permission denied' despite correct group permissions",
            "Files have correct g+ permissions but user can't access",
            "Access works for some users in group but not others"
          ],
          scenario: "At Barrackpore college, project files had g+rw but Abhronila couldn't access. She was in 'students' group, but files were 'cs_students' group.",
          rootCause: "Not verifying user's actual group membership with 'groups' or 'id' command",
          impact: "Medium - Access issues that seem illogical",
          solution: "Check user groups with 'groups username' or 'id username', add to correct group",
          prevention: "Document group memberships and verify during troubleshooting",
          commands: [
            "# Check user's groups:",
            "$ groups abhronila",
            "abhronila : students faculty",
            "# Not in cs_students!",
            "",
            "# Check file's group:",
            "$ ls -l project.txt",
            "-rw-rw-r-- 1 swadeep cs_students ...",
            "",
            "# Add user to correct group:",
            "$ sudo usermod -a -G cs_students abhronila",
            "# Need to log out and back in"
          ]
        },
        {
          id: 'inter3',
          title: "Default ACL inheritance issues",
          description: "Expecting default ACLs to apply to existing files, or not understanding inheritance rules",
          symptoms: [
            "New files have correct permissions, old files don't",
            "Subdirectories don't inherit permissions as expected",
            "ACLs work in one directory but not subdirectories"
          ],
          scenario: "At Shyamnagar hosting, Swadeep set default ACLs on /var/www but existing files in subdirectories kept old permissions.",
          rootCause: "Default ACLs only affect newly created files/directories, not existing ones",
          impact: "Medium - Inconsistent permissions across directory tree",
          solution: "Apply ACLs recursively with setfacl -R, or manually update existing files",
          prevention: "Understand difference between access ACLs and default ACLs",
          commands: [
            "# Default ACLs affect NEW files only:",
            "$ setfacl -m d:u:apache:rw- /var/www",
            "# Existing files unchanged",
            "",
            "# To fix existing files:",
            "$ setfacl -R -m u:apache:rw- /var/www",
            "",
            "# Or set both at once:",
            "$ setfacl -R -m u:apache:rw- /var/www",
            "$ setfacl -R -m d:u:apache:rw- /var/www"
          ]
        }
      ],
      advanced: [
        {
          id: 'adv1',
          title: "Sticky bit misunderstanding",
          description: "Not understanding when and why to use sticky bit, or using it incorrectly",
          symptoms: [
            "Users can delete others' files in /tmp-like directories",
            "Unexpected behavior in shared directories",
            "Security warnings about world-writable directories"
          ],
          scenario: "At Ichapur hospital, shared lab directory allowed any staff to delete others' files. Needed sticky bit to prevent this.",
          rootCause: "Sticky bit (t) on directories restricts file deletion to owners only, even with write permission",
          impact: "Medium - Data loss or security issues in shared directories",
          solution: "Add sticky bit with 'chmod +t' on shared directories where users create but shouldn't delete others' files",
          prevention: "Use sticky bit on all world-writable shared directories",
          commands: [
            "# Problem: Anyone can delete:",
            "$ ls -ld /shared/lab",
            "drwxrwxrwx ... /shared/lab",
            "# Users can delete others' files",
            "",
            "# Solution: Add sticky bit:",
            "$ chmod +t /shared/lab",
            "$ ls -ld /shared/lab",
            "drwxrwxrwt ... /shared/lab",
            "# Now only owners can delete their files"
          ]
        },
        {
          id: 'adv2',
          title: "SELinux/ACL conflicts",
          description: "Permissions correct but SELinux context blocking access, or ACLs not working due to SELinux",
          symptoms: [
            "Correct permissions but still 'Permission denied'",
            "ACLs work on some systems but not others",
            "getfacl shows correct permissions but access fails"
          ],
          scenario: "At Naihati research, Swadeep set correct ACLs but access still denied. SELinux was enforcing and blocking the access.",
          rootCause: "SELinux mandatory access control overrides discretionary access control (DAC)",
          impact: "High - Completely blocks access despite correct permissions",
          solution: "Check SELinux with 'getenforce', 'ls -Z', fix context with 'chcon' or 'restorecon'",
          prevention: "Understand both DAC and MAC, check SELinux during troubleshooting",
          commands: [
            "# Check SELinux status:",
            "$ getenforce",
            "Enforcing",
            "",
            "# Check file context:",
            "$ ls -Z /research/data",
            "-rw-r--r--. swadeep cs_students unconfined_u:object_r:user_home_t:s0 data.txt",
            "",
            "# Fix context if wrong:",
            "$ chcon -t httpd_sys_content_t /research/data",
            "# Or restore default:",
            "$ restorecon -Rv /research/data"
          ]
        },
        {
          id: 'adv3',
          title: "Filesystem ACL support issues",
          description: "ACL commands fail because filesystem doesn't support ACLs, or not mounted with acl option",
          symptoms: [
            "'Operation not supported' with setfacl/getfacl",
            "ACLs work on some partitions but not others",
            "System upgrade broke ACL functionality"
          ],
          scenario: "At Shyamnagar hosting, Swadeep's backup partition didn't support ACLs. setfacl failed with 'Operation not supported'.",
          rootCause: "Filesystem not mounted with 'acl' option, or filesystem type doesn't support ACLs",
          impact: "High - ACL functionality completely unavailable",
          solution: "Remount with acl option, add to /etc/fstab, or use filesystem that supports ACLs",
          prevention: "Verify ACL support when setting up new filesystems",
          commands: [
            "# Check mount options:",
            "$ mount | grep ' /data '",
            "/dev/sdb1 on /data type ext4 (rw,noexec,nosuid)",
            "# Missing 'acl'!",
            "",
            "# Remount with acl:",
            "$ mount -o remount,acl /data",
            "",
            "# Make permanent in /etc/fstab:",
            "# /dev/sdb1  /data  ext4  defaults,acl  0  2"
          ]
        }
      ]
    };

    return mistakes[this.state.activeCategory] || mistakes.basic;
  };

  renderTroubleshootingGuide = () => {
    const { userRole } = this.state;
    
    const steps = [
      {
        step: 1,
        title: "Identify the Problem",
        description: "What exactly is failing? Be specific.",
        actions: {
          admin: "Ask user: 'What command are you running? What error do you see?'",
          user: "Note exact error message: 'Permission denied' or 'Operation not permitted'?"
        },
        commands: ["# Get exact error message", "# Reproduce the issue"]
      },
      {
        step: 2,
        title: "Check Basic Permissions",
        description: "Look at file/directory permissions and ownership",
        actions: {
          admin: "Run ls -ld on the directory, ls -l on the file",
          user: "Check if you can ls the directory, cat the file"
        },
        commands: [
          "$ ls -ld /path/to/directory",
          "$ ls -l /path/to/file",
          "$ stat /path/to/file"
        ]
      },
      {
        step: 3,
        title: "Verify User Identity",
        description: "Check who the user is and what groups they're in",
        actions: {
          admin: "Check user's groups and compare with file's group",
          user: "Check your own groups with 'groups' command"
        },
        commands: [
          "$ id username",
          "$ groups username",
          "# Compare with file's group from ls -l"
        ]
      },
      {
        step: 4,
        title: "Check for ACLs",
        description: "See if ACLs are present and what they contain",
        actions: {
          admin: "Look for + sign in ls -l, run getfacl",
          user: "Note if ls -l shows + after permissions"
        },
        commands: [
          "$ getfacl /path/to/file",
          "# Look for + in: drwxr-x---+"
        ]
      },
      {
        step: 5,
        title: "Consider SELinux",
        description: "Check if SELinux might be blocking access",
        actions: {
          admin: "Check SELinux status and file contexts",
          user: "Check if system uses SELinux (often in enterprise)"
        },
        commands: [
          "$ getenforce",
          "$ ls -Z /path/to/file",
          "$ audit2why -a  # Analyze SELinux denials"
        ]
      },
      {
        step: 6,
        title: "Test the Fix",
        description: "Make one change at a time and test",
        actions: {
          admin: "Change permissions incrementally, test after each",
          user: "Test if fix works before moving on"
        },
        commands: [
          "# Make one change:",
          "$ chmod g+rx /path",
          "# Test:",
          "$ sudo -u username ls /path"
        ]
      }
    ];

    return (
      <div className="space-y-6">
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-400">Systematic Troubleshooting Approach</h3>
          
          {/* Role Selector */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold">View as:</label>
            <div className="flex space-x-4">
              {['admin', 'user'].map((role) => (
                <button
                  key={role}
                  onClick={() => this.handleRoleChange(role)}
                  className={clsx(
                    "px-4 py-2 rounded-lg transition-all duration-300 capitalize",
                    userRole === role
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700'
                  )}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {steps.map((step) => (
              <div 
                key={step.step}
                className={clsx(
                  "p-4 rounded-lg transition-all duration-300 cursor-pointer hover:scale-[1.01]",
                  this.state.troubleshootingStep === step.step
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500'
                    : 'bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600'
                )}
                onClick={() => this.handleTroubleshootingStep(step.step)}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className={clsx(
                      "w-8 h-8 rounded-full flex items-center justify-center font-bold",
                      this.state.troubleshootingStep === step.step
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                    )}>
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">{step.title}</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">{step.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                        <p className="font-semibold mb-1">As {userRole}:</p>
                        <p className="text-sm">{step.actions[userRole]}</p>
                      </div>
                      
                      <div className="p-3 bg-gray-900 rounded">
                        <p className="font-semibold mb-1 text-green-400">Commands:</p>
                        <div className="space-y-1">
                          {step.commands.map((cmd, idx) => (
                            <code key={idx} className="block text-green-400 text-xs">
                              {cmd}
                            </code>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { isDarkMode, showAnimation, activeCategory, selectedMistake, troubleshootingStep, showDiagnosis, userRole } = this.state;
    const mistakes = this.getMistakes();
    const currentMistake = selectedMistake ? 
      mistakes.find(m => m.id === selectedMistake) : 
      null;

    const themeClasses = clsx(
      'min-h-screen transition-colors duration-300',
      isDarkMode 
        ? 'bg-gray-900 text-gray-100' 
        : 'bg-gradient-to-br from-violet-50 to-fuchsia-50 text-gray-900'
    );

    const cardClasses = clsx(
      'rounded-xl p-6 transition-all duration-300',
      isDarkMode
        ? 'bg-gray-800 border border-gray-700 hover:border-violet-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]'
        : 'bg-white border border-gray-200 hover:border-violet-400 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]'
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
      @keyframes blinkWarning {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }
    `;

    const getImpactColor = (impact) => {
      switch(impact.toLowerCase()) {
        case 'critical': return 'text-red-600 dark:text-red-400';
        case 'high': return 'text-orange-600 dark:text-orange-400';
        case 'medium': return 'text-yellow-600 dark:text-yellow-400';
        default: return 'text-green-600 dark:text-green-400';
      }
    };

    const getImpactBg = (impact) => {
      switch(impact.toLowerCase()) {
        case 'critical': return 'bg-red-100 dark:bg-red-900/30';
        case 'high': return 'bg-orange-100 dark:bg-orange-900/30';
        case 'medium': return 'bg-yellow-100 dark:bg-yellow-900/30';
        default: return 'bg-green-100 dark:bg-green-900/30';
      }
    };

    return (
      <div className={themeClasses}>
        <style>{keyframesStyle}</style>
        
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          {/* Header Section */}
          <header className={clsx(sectionAnimation, "mb-12 text-center")}>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              Topic 7: Common Permission Mistakes & Troubleshooting
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Learn from common errors and master systematic troubleshooting approaches.
            </p>
          </header>

          {/* Introduction Section */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.1s'}}>
            <h2 className="text-2xl font-bold mb-4 text-violet-700 dark:text-violet-400">
              <span className="inline-block p-2 bg-violet-100 dark:bg-violet-900/30 rounded-lg mr-2">⚠️</span>
              Why Troubleshooting Permission Issues is Hard
            </h2>
            
            <div className="space-y-6">
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="mb-4 text-lg">
                  Permission issues are among the most common and frustrating problems in multi-user systems. 
                  They're difficult because they involve multiple layers: 
                  <span className="font-semibold text-violet-600 dark:text-violet-400"> users, groups, permissions, ACLs, and sometimes SELinux</span>.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-bold text-red-600 dark:text-red-400">Why They're Confusing:</h4>
                    <ul className="list-disc pl-5 text-sm space-y-2">
                      <li>Multiple users report the same issue differently</li>
                      <li>Permissions appear correct but access fails</li>
                      <li>ACLs add complexity on top of standard permissions</li>
                      <li>SELinux can override everything</li>
                      <li>Inheritance makes behavior hard to predict</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-bold text-green-600 dark:text-green-400">Successful Troubleshooting:</h4>
                    <ul className="list-disc pl-5 text-sm space-y-2">
                      <li>Follow systematic approach</li>
                      <li>Check each layer methodically</li>
                      <li>Understand the difference between "can't" and "shouldn't"</li>
                      <li>Document findings and solutions</li>
                      <li>Learn from mistakes to prevent recurrence</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Real-World Perspective:</p>
                <p>
                  At Barrackpore college, Swadeep spends 30% of his time troubleshooting permissions. 
                  At Shyamnagar hosting, Tuhina has a checklist for permission issues. 
                  At Ichapur hospital, Dr. Debangshu documents every permission change for audits. 
                  All need systematic approaches.
                </p>
              </div>
            </div>
          </section>

          {/* Common Mistakes Categories */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.2s'}}>
            <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-400">
              <span className="inline-block p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-2">📚</span>
              Common Permission Mistakes
            </h2>
            
            <div className="space-y-6">
              {/* Category Navigation */}
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => this.handleCategoryChange('basic')}
                  className={clsx(
                    "px-4 py-2 rounded-lg transition-all duration-300 font-semibold",
                    activeCategory === 'basic'
                      ? 'bg-violet-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700'
                  )}
                >
                  Basic Mistakes
                </button>
                <button
                  onClick={() => this.handleCategoryChange('intermediate')}
                  className={clsx(
                    "px-4 py-2 rounded-lg transition-all duration-300 font-semibold",
                    activeCategory === 'intermediate'
                      ? 'bg-violet-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700'
                  )}
                >
                  Intermediate Mistakes
                </button>
                <button
                  onClick={() => this.handleCategoryChange('advanced')}
                  className={clsx(
                    "px-4 py-2 rounded-lg transition-all duration-300 font-semibold",
                    activeCategory === 'advanced'
                      ? 'bg-violet-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700'
                  )}
                >
                  Advanced Mistakes
                </button>
              </div>
              
              {/* Mistakes List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mistakes.map((mistake) => (
                  <div
                    key={mistake.id}
                    onClick={() => this.handleMistakeSelect(mistake.id)}
                    className={clsx(
                      "p-4 rounded-lg transition-all duration-300 cursor-pointer hover:scale-[1.02]",
                      selectedMistake === mistake.id
                        ? 'border-2 border-violet-500 bg-violet-50 dark:bg-violet-900/20'
                        : 'border border-gray-300 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-700'
                    )}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold">{mistake.title}</h3>
                      <span className={clsx(
                        "px-2 py-1 rounded text-xs",
                        getImpactBg(mistake.impact)
                      )}>
                        <span className={getImpactColor(mistake.impact)}>{mistake.impact}</span>
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{mistake.description}</p>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      Click for details & solution
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Mistake Details */}
              {currentMistake && (
                <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{currentMistake.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{currentMistake.description}</p>
                    </div>
                    <div className={clsx(
                      "px-3 py-1 rounded-full text-sm font-semibold",
                      getImpactBg(currentMistake.impact)
                    )}>
                      <span className={getImpactColor(currentMistake.impact)}>
                        Impact: {currentMistake.impact}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-3">
                      <h4 className="font-bold text-red-600 dark:text-red-400">Symptoms:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {currentMistake.symptoms.map((symptom, index) => (
                          <li key={index} className="text-sm">{symptom}</li>
                        ))}
                      </ul>
                      
                      <h4 className="font-bold text-blue-600 dark:text-blue-400 mt-4">Real Scenario:</h4>
                      <p className="text-sm">{currentMistake.scenario}</p>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-bold text-orange-600 dark:text-orange-400">Root Cause:</h4>
                      <p className="text-sm">{currentMistake.rootCause}</p>
                      
                      <h4 className="font-bold text-green-600 dark:text-green-400 mt-4">Solution:</h4>
                      <p className="text-sm">{currentMistake.solution}</p>
                      
                      <h4 className="font-bold text-purple-600 dark:text-purple-400 mt-4">Prevention:</h4>
                      <p className="text-sm">{currentMistake.prevention}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold mb-2 text-violet-600 dark:text-violet-400">Commands Example:</h4>
                    <pre className="p-4 bg-gray-900 text-green-400 rounded-lg overflow-x-auto text-sm">
                      {currentMistake.commands.join('\n')}
                    </pre>
                  </div>
                </div>
              )}
              
              {!currentMistake && (
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-center">
                  <p className="text-yellow-700 dark:text-yellow-400">
                    Select a mistake from the list above to see detailed analysis and solution
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Troubleshooting Guide */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.3s'}}>
            <h2 className="text-2xl font-bold mb-6 text-green-700 dark:text-green-400">
              <span className="inline-block p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-2">🔧</span>
              Systematic Troubleshooting Guide
            </h2>
            
            {this.renderTroubleshootingGuide()}
            
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <button
                onClick={this.toggleDiagnosis}
                className="w-full p-3 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-800/50 rounded-lg transition-colors duration-300 text-blue-700 dark:text-blue-400 font-semibold"
              >
                {showDiagnosis ? '▲ Hide' : '▼ Show'} Diagnostic Decision Tree
              </button>
              
              {showDiagnosis && (
                <div className="mt-4 p-4 bg-white dark:bg-gray-900 rounded-lg">
                  <h4 className="font-bold mb-3 text-purple-700 dark:text-purple-400">Permission Diagnosis Decision Tree:</h4>
                  
                  <div className="flex justify-center">
                    <svg width="500" height="400" viewBox="0 0 500 400" className="w-full max-w-lg">
                      {/* Start */}
                      <rect x="200" y="20" width="100" height="40" rx="5" fill="#3B82F6" />
                      <text x="250" y="45" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                        Permission Issue
                      </text>
                      
                      {/* Step 1 */}
                      <rect x="175" y="80" width="150" height="40" rx="5" fill="#10B981" />
                      <text x="250" y="105" textAnchor="middle" fill="white" fontSize="11">
                        Step 1: Check ls -ld
                      </text>
                      
                      <path d="M250,60 L250,80" stroke="#6B7280" strokeWidth="2" fill="none" />
                      
                      {/* Branch 1 */}
                      <rect x="50" y="140" width="120" height="40" rx="5" fill="#F59E0B" />
                      <text x="110" y="165" textAnchor="middle" fill="white" fontSize="10">
                        Owner/group wrong?
                      </text>
                      
                      <path d="M250,120 Q200,120 185,140" stroke="#6B7280" strokeWidth="2" fill="none" />
                      
                      {/* Branch 2 */}
                      <rect x="190" y="140" width="120" height="40" rx="5" fill="#F59E0B" />
                      <text x="250" y="165" textAnchor="middle" fill="white" fontSize="10">
                        Permissions wrong?
                      </text>
                      
                      <path d="M250,120 L250,140" stroke="#6B7280" strokeWidth="2" fill="none" />
                      
                      {/* Branch 3 */}
                      <rect x="330" y="140" width="120" height="40" rx="5" fill="#F59E0B" />
                      <text x="390" y="165" textAnchor="middle" fill="white" fontSize="10">
                        + sign present?
                      </text>
                      
                      <path d="M250,120 Q300,120 365,140" stroke="#6B7280" strokeWidth="2" fill="none" />
                      
                      {/* Solutions */}
                      <rect x="30" y="200" width="100" height="40" rx="5" fill="#10B981" />
                      <text x="80" y="225" textAnchor="middle" fill="white" fontSize="9">
                        chown/chgrp
                      </text>
                      
                      <rect x="150" y="200" width="100" height="40" rx="5" fill="#10B981" />
                      <text x="200" y="225" textAnchor="middle" fill="white" fontSize="9">
                        chmod
                      </text>
                      
                      <rect x="270" y="200" width="100" height="40" rx="5" fill="#10B981" />
                      <text x="320" y="225" textAnchor="middle" fill="white" fontSize="9">
                        Check ACLs
                      </text>
                      
                      <rect x="390" y="200" width="100" height="40" rx="5" fill="#10B981" />
                      <text x="440" y="225" textAnchor="middle" fill="white" fontSize="9">
                        getfacl
                      </text>
                      
                      {/* Arrows */}
                      <path d="M110,180 L110,200" stroke="#6B7280" strokeWidth="1" fill="none" />
                      <path d="M250,180 L250,200" stroke="#6B7280" strokeWidth="1" fill="none" />
                      <path d="M390,180 L390,200" stroke="#6B7280" strokeWidth="1" fill="none" />
                      
                      {/* Next Step */}
                      <rect x="200" y="260" width="100" height="40" rx="5" fill="#8B5CF6" />
                      <text x="250" y="285" textAnchor="middle" fill="white" fontSize="11">
                        Still failing?
                      </text>
                      
                      <path d="M250,240 L250,260" stroke="#6B7280" strokeWidth="2" fill="none" />
                      
                      {/* Final Steps */}
                      <rect x="150" y="320" width="200" height="40" rx="5" fill="#EC4899" />
                      <text x="250" y="345" textAnchor="middle" fill="white" fontSize="11">
                        Check SELinux & Filesystem
                      </text>
                      
                      <path d="M250,300 L250,320" stroke="#6B7280" strokeWidth="2" fill="none" />
                      
                      {/* Legend */}
                      <rect x="50" y="370" width="400" height="20" rx="3" fill="#F3F4F6" />
                      <text x="250" y="385" textAnchor="middle" fill="#4B5563" fontSize="9">
                        Follow the flow from top to bottom
                      </text>
                    </svg>
                  </div>
                  
                  <p className="text-sm mt-4 text-center text-gray-600 dark:text-gray-400">
                    Start at the top and follow the flow based on your findings at each step.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Teacher's Note */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.4s'}}>
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
                      <p className="font-semibold text-amber-700 dark:text-yellow-400 mb-1">🎯 Critical Teaching Point:</p>
                      <p>The most important troubleshooting skill is systematic thinking. At Barrackpore college, I teach students the "5 Whys" method: Keep asking "why" until you reach root cause. Why can't Tuhina access? Because permission denied. Why? Because group wrong. Why? Because she's not in cs_students. Why? Because we forgot to add her. Why? Because no process for new team members.</p>
                    </div>
                    
                    <div className="p-3 bg-white/50 dark:bg-gray-900/30 rounded">
                      <p className="font-semibold text-amber-700 dark:text-yellow-400 mb-1">💡 Classroom Exercise:</p>
                      <p>I create "buggy" directories with multiple permission issues. Students get error messages and must diagnose. Example: Directory with 777 but wrong owner, subdirectory with 644 (no execute), file with ACLs but wrong mask. They use the troubleshooting checklist. At Shyamnagar hosting, we use similar exercises for new admins.</p>
                    </div>
                    
                    <div className="p-3 bg-white/50 dark:bg-gray-900/30 rounded">
                      <p className="font-semibold text-amber-700 dark:text-yellow-400 mb-1">🔧 Professional Practice:</p>
                      <p>At Ichapur hospital, we maintain a "Permission Issue Runbook". For each common error, we have: 1) Error message 2) Most likely causes (ranked) 3) Diagnostic commands 4) Solutions 5) Who to escalate to. When Swadeep gets paged at 2 AM, he follows the runbook. Documenting solutions prevents repeat issues.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Case Studies */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.5s'}}>
            <h2 className="text-2xl font-bold mb-6 text-purple-700 dark:text-purple-400">
              <span className="inline-block p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-2">📖</span>
              Real-World Case Studies
            </h2>
            
            <div className="space-y-6">
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">Case Study 1: Barrackpore College Web Server</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-2 text-red-600 dark:text-red-400">Problem:</h4>
                    <p className="text-sm mb-3">Students couldn't upload files to course website. Apache showed "Permission denied" in logs.</p>
                    
                    <h4 className="font-bold mb-2 text-green-600 dark:text-green-400">Initial (Wrong) Approach:</h4>
                    <code className="block p-2 bg-gray-900 text-red-400 rounded text-xs mb-3">
                      $ chmod 777 /var/www/courses<br/>
                      # "Fixed" it but created security hole
                    </code>
                  </div>
                  
                  <div>
                    <h4 className="font-bold mb-2 text-blue-600 dark:text-blue-400">Correct Troubleshooting:</h4>
                    <ol className="list-decimal pl-5 text-sm space-y-2">
                      <li>Checked Apache error log: "Permission denied"</li>
                      <li>Ran <code>ls -ld /var/www/courses</code>: drwxr-xr-x root root</li>
                      <li>Apache runs as user www-data, group www-data</li>
                      <li>Directory owned by root, Apache can't write</li>
                      <li>Solution: <code>chown www-data:www-data /var/www/courses</code></li>
                      <li>Better: <code>chown www-data:faculty /var/www/courses && chmod 775</code></li>
                    </ol>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                  <p className="font-semibold text-yellow-700 dark:text-yellow-400">Lesson Learned:</p>
                  <p className="text-sm">Understand what user/group the service runs as. Don't use 777. Use appropriate ownership and permissions.</p>
                </div>
              </div>
              
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">Case Study 2: Shyamnagar Hosting Backup Failure</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-2 text-red-600 dark:text-red-400">Problem:</h4>
                    <p className="text-sm mb-3">Nightly backups failing for client "ABC Corp". Error: "Cannot read directory /home/abc/data"</p>
                    
                    <h4 className="font-bold mb-2 text-green-600 dark:text-green-400">Initial Investigation:</h4>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Backup runs as user backup</li>
                      <li>Directory permissions: drwxr-x--- abc abc</li>
                      <li>Backup user not in abc group</li>
                      <li>ACLs not set for backup user</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold mb-2 text-blue-600 dark:text-blue-400">Solution Options:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded">
                        <p className="font-semibold">❌ Bad: Add backup to abc group</p>
                        <p>Backup could then access ALL abc's files, potential privacy issue</p>
                      </div>
                      
                      <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                        <p className="font-semibold">⚠️ Okay: chmod 755 directory</p>
                        <p>Allows backup to read but also makes it world-readable</p>
                      </div>
                      
                      <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
                        <p className="font-semibold">✅ Best: Use ACLs</p>
                        <code className="block mt-1 text-xs">setfacl -m u:backup:r-x /home/abc/data</code>
                        <p>Granular access without changing group or world permissions</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded">
                  <p className="font-semibold text-green-700 dark:text-green-400">Best Practice Established:</p>
                  <p className="text-sm">All backup access now implemented via ACLs. Documented in client agreements. Monthly ACL audits.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Prevention Checklist */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.6s'}}>
            <h2 className="text-2xl font-bold mb-6 text-green-700 dark:text-green-400">
              <span className="inline-block p-2 bg-green-100 dark:green-900/30 rounded-lg mr-2">✅</span>
              Prevention Checklist
            </h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <h3 className="text-xl font-bold mb-4">How to Prevent Permission Problems</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-bold text-blue-600 dark:text-blue-400">📋 Design Phase:</h4>
                    <div className="space-y-2">
                      {[
                        "Define access requirements before implementation",
                        "Create group structure based on roles, not individuals",
                        "Plan inheritance with default ACLs if needed",
                        "Document ownership and permission scheme"
                      ].map((item, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 flex items-center justify-center mr-2 text-sm">
                            {index + 1}
                          </div>
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-bold text-green-600 dark:text-green-400">⚙️ Implementation Phase:</h4>
                    <div className="space-y-2">
                      {[
                        "Use symbolic permissions for clarity (u+rx, g+w)",
                        "Test with all user roles after changes",
                        "Set appropriate umask for session",
                        "Implement least privilege principle"
                      ].map((item, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 flex items-center justify-center mr-2 text-sm">
                            {index + 1}
                          </div>
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-bold text-purple-600 dark:text-purple-400">🔍 Maintenance Phase:</h4>
                    <div className="space-y-2">
                      {[
                        "Monthly permission audits with find -perm",
                        "Quarterly ACL reviews with getfacl -R",
                        "Regular user/group membership reviews",
                        "Update documentation with changes"
                      ].map((item, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 flex items-center justify-center mr-2 text-sm">
                            {index + 1}
                          </div>
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-bold mb-2 text-blue-700 dark:text-blue-400">📝 At Naihati Research Center:</h4>
                <p className="text-sm">
                  Swadeep maintains a "Permission Health Dashboard" that shows: 
                  1) World-writable files, 2) Directories without execute, 3) Files with 777, 
                  4) ACLs nearing complexity limit, 5) Stale group memberships. 
                  Reviewed weekly, addressed monthly.
                </p>
              </div>
            </div>
          </section>

          {/* Quick Reference */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.7s'}}>
            <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-400">
              <span className="inline-block p-2 bg-blue-100 dark:blue-900/30 rounded-lg mr-2">📋</span>
              Troubleshooting Commands Quick Reference
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className={isDarkMode ? "bg-gray-800" : "bg-gray-100"}>
                    <th className="p-3 text-left border">Command</th>
                    <th className="p-3 text-left border">Purpose</th>
                    <th className="p-3 text-left border">What It Tells You</th>
                    <th className="p-3 text-left border">When to Use</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border font-mono">ls -ld file</td>
                    <td className="p-3 border">Directory permissions</td>
                    <td className="p-3 border">Owner, group, permissions, ACL indicator (+)</td>
                    <td className="p-3 border">First step for any permission issue</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border font-mono">ls -l file</td>
                    <td className="p-3 border">File permissions</td>
                    <td className="p-3 border">File owner, group, permissions</td>
                    <td className="p-3 border">When file access fails</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border font-mono">getfacl file</td>
                    <td className="p-3 border">View ACLs</td>
                    <td className="p-3 border">All ACL entries, mask, effective permissions</td>
                    <td className="p-3 border">When ls shows + or ACLs suspected</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border font-mono">id username</td>
                    <td className="p-3 border">User identity</td>
                    <td className="p-3 border">User's UID, GID, group memberships</td>
                    <td className="p-3 border">When user can't access group files</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border font-mono">groups username</td>
                    <td className="p-3 border">User's groups</td>
                    <td className="p-3 border">All groups user belongs to</td>
                    <td className="p-3 border">Verify group membership</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border font-mono">stat file</td>
                    <td className="p-3 border">File status</td>
                    <td className="p-3 border">Octal permissions, inode, device info</td>
                    <td className="p-3 border">Detailed file information</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border font-mono">getenforce</td>
                    <td className="p-3 border">SELinux status</td>
                    <td className="p-3 border">Whether SELinux is enforcing</td>
                    <td className="p-3 border">When permissions correct but access denied</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border font-mono">ls -Z file</td>
                    <td className="p-3 border">SELinux context</td>
                    <td className="p-3 border">File's SELinux security context</td>
                    <td className="p-3 border">Debugging SELinux issues</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border font-mono">mount | grep acl</td>
                    <td className="p-3 border">ACL support</td>
                    <td className="p-3 border">Whether filesystem supports ACLs</td>
                    <td className="p-3 border">When setfacl/getfacl fail</td>
                  </tr>
                  <tr className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
                    <td className="p-3 border font-mono">sudo -u user cmd</td>
                    <td className="p-3 border">Test as user</td>
                    <td className="p-3 border">What user actually experiences</td>
                    <td className="p-3 border">Testing access fixes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Summary & Conclusion */}
          <section className={clsx(sectionAnimation, cardClasses, "mb-8")} style={{animationDelay: '0.8s'}}>
            <h2 className="text-2xl font-bold mb-6 text-violet-700 dark:text-violet-400">
              <span className="inline-block p-2 bg-violet-100 dark:bg-violet-900/30 rounded-lg mr-2">🎯</span>
              Summary & Key Takeaways
            </h2>
            
            <div className="space-y-6">
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <h3 className="text-xl font-bold mb-4">What We've Learned</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-2 text-green-600 dark:text-green-400">✅ Do These:</h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>Follow systematic troubleshooting approach</li>
                      <li>Check permissions layer by layer (owner → group → others → ACLs → SELinux)</li>
                      <li>Test fixes with affected users before declaring solved</li>
                      <li>Document permission changes and reasoning</li>
                      <li>Use ACLs for fine-grained control instead of 777</li>
                      <li>Regularly audit permissions and group memberships</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold mb-2 text-red-600 dark:text-red-400">❌ Avoid These:</h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>Using chmod 777 as "quick fix"</li>
                      <li>Assuming without verifying (check groups!)</li>
                      <li>Forgetting directory execute bit</li>
                      <li>Ignoring ACL mask and effective permissions</li>
                      <li>Overlooking SELinux when permissions seem correct</li>
                      <li>Not testing inheritance (new files vs existing)</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-bold mb-2 text-blue-700 dark:text-blue-400">Professional Mindset:</h4>
                <p className="mb-3">
                  Permission troubleshooting is not about finding a quick fix, but about 
                  <span className="font-semibold"> understanding the system</span>. 
                  Each permission issue is an opportunity to learn how your system really works.
                </p>
                <p>
                  At Barrackpore college, Swadeep now sees permission issues as teaching moments. 
                  At Shyamnagar hosting, Tuhina has reduced permission tickets by 70% through better design. 
                  At Ichapur hospital, Dr. Debangshu's documentation saves hours during audits.
                </p>
              </div>
              
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h4 className="font-bold mb-2 text-yellow-700 dark:text-yellow-400">Final Thought:</h4>
                <p>
                  The best system administrators are not those who never make permission mistakes, 
                  but those who <span className="font-semibold">learn systematically from their mistakes</span> 
                  and build processes to prevent them. Every chmod 777 you avoid, every ACL you document, 
                  every troubleshooting step you systematize makes you and your systems better.
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className={clsx(sectionAnimation, "mt-12 pt-8 border-t border-gray-300 dark:border-gray-700 text-center")}>
            <p className="text-gray-600 dark:text-gray-400">
              Topic 7: Mastering Permission Troubleshooting - Complete Course Conclusion
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Course Complete! You've mastered Linux/Unix permissions from basics to advanced troubleshooting.
            </p>
            <div className="mt-4 flex justify-center space-x-4">
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm">
                ✅ umask & permissions
              </span>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">
                ✅ Files vs directories
              </span>
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm">
                ✅ ls -l & stat
              </span>
              <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300 rounded-full text-sm">
                ✅ ACLs
              </span>
              <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded-full text-sm">
                ✅ Security practices
              </span>
              <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full text-sm">
                ✅ Practical lab
              </span>
              <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-full text-sm">
                ✅ Troubleshooting
              </span>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

