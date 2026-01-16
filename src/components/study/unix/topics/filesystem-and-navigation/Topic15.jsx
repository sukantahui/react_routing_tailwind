// Topic15.jsx - File system mounting concept (mount, umount – overview)
import React from 'react';

export default class Topic15 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveredSection: null,
      isReducedMotion: false,
      activeDiagram: 'basic',
      mountedDevices: []
    };
  }

  componentDidMount() {
    // Check for reduced motion preference
    this.checkReducedMotion();
    // Initialize with sample mounted devices
    this.setState({
      mountedDevices: [
        { device: '/dev/sda1', mountPoint: '/', type: 'ext4', options: 'rw' },
        { device: '/dev/sdb1', mountPoint: '/home', type: 'ext4', options: 'rw' },
        { device: '/dev/sr0', mountPoint: '/media/cdrom', type: 'iso9660', options: 'ro' },
        { device: '/dev/sdc1', mountPoint: '/mnt/usb', type: 'vfat', options: 'rw' }
      ]
    });
  }

  checkReducedMotion = () => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.setState({ isReducedMotion: mediaQuery.matches });
    
    mediaQuery.addEventListener('change', (e) => {
      this.setState({ isReducedMotion: e.matches });
    });
  };

  handleSectionHover = (sectionId) => {
    this.setState({ hoveredSection: sectionId });
  };

  handleDiagramChange = (diagramType) => {
    this.setState({ activeDiagram: diagramType });
  };

  simulateMount = () => {
    const newDevice = {
      device: '/dev/sdd1',
      mountPoint: `/mnt/data${Math.floor(Math.random() * 100)}`,
      type: 'ext4',
      options: 'rw'
    };
    this.setState(prevState => ({
      mountedDevices: [...prevState.mountedDevices, newDevice]
    }));
  };

  simulateUnmount = (index) => {
    this.setState(prevState => ({
      mountedDevices: prevState.mountedDevices.filter((_, i) => i !== index)
    }));
  };

  render() {
    const { hoveredSection, isReducedMotion, activeDiagram, mountedDevices } = this.state;
    
    const animationClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.8s_ease-out_forwards]';
    const staggerClass = (delay) => 
      isReducedMotion ? '' : `motion-safe:animate-[fadeInUp_0.8s_ease-out_forwards] motion-safe:animation-delay-[${delay}ms]`;
    
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
      
      @keyframes pulseMount {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      
      @keyframes connectLines {
        from { stroke-dashoffset: 100; }
        to { stroke-dashoffset: 0; }
      }
      
      @keyframes highlightMount {
        0%, 100% { fill: #3B82F6; }
        50% { fill: #60A5FA; }
      }
    `;

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 transition-colors duration-300">
        <style>{keyframesStyle}</style>
        
        {/* Header Section */}
        <header className={`max-w-6xl mx-auto mb-12 ${animationClass}`}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-indigo-200 dark:hover:bg-indigo-800">
              <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
                Topic 16: File System Mounting Concepts
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                Understanding mount, umount, and how storage devices integrate with your system
              </p>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto">
          {/* Conceptual Overview */}
          <section className={`mb-16 ${staggerClass(100)}`}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:translate-y-[-4px]">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-3">
                <svg className="w-7 h-7 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                What is Mounting? The Bridge Analogy
              </h2>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2">Core Concept</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      Mounting is like building a bridge between a physical storage device (USB, hard disk, CD) 
                      and your operating system's directory tree. Without mounting, the device is connected 
                      but inaccessible—like a library book delivered but still in the shipping box.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Real-World Scenario</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      When Tuhina from Barrackpore plugs in her USB drive, the system detects it as <code>/dev/sdb1</code>. 
                      But she can't access files until she <strong>mounts</strong> it to a directory like <code>/media/tuhina_usb</code>. 
                      This directory becomes the "access point" or "doorway" to the USB's contents.
                    </p>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border-l-4 border-indigo-500">
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        <strong>Think about:</strong> In Shyamnagar's computer lab, each student's USB becomes 
                        accessible only when mounted. Swadeep's photos, Abhronila's documents, Debangshu's code—all 
                        need this bridge to be usable.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="bg-gray-900 text-gray-100 rounded-xl p-6 font-mono text-sm overflow-x-auto">
                    <div className="mb-4">
                      <span className="text-green-400">$</span> <span className="text-blue-300">lsblk</span>
                      <div className="ml-4 mt-2 text-gray-300">
                        NAME&nbsp;&nbsp;&nbsp;MAJ:MIN RM&nbsp;&nbsp;SIZE RO TYPE MOUNTPOINT<br/>
                        sda&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8:0&nbsp;&nbsp;&nbsp;&nbsp;0&nbsp;&nbsp;1.8T&nbsp;&nbsp;0 disk<br/>
                        ├─sda1 8:1&nbsp;&nbsp;&nbsp;&nbsp;0&nbsp;&nbsp;512M&nbsp;0 part <span className="text-yellow-300">/boot</span><br/>
                        └─sda2 8:2&nbsp;&nbsp;&nbsp;&nbsp;0&nbsp;&nbsp;1.8T&nbsp;&nbsp;0 part <span className="text-yellow-300">/</span><br/>
                        sdb&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8:16&nbsp;&nbsp;0&nbsp;&nbsp;14.9G 0 disk<br/>
                        └─sdb1 8:17&nbsp;&nbsp;0&nbsp;&nbsp;14.9G 0 part <span className="text-red-300">(not mounted)</span><br/>
                        sr0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;11:0&nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;1024M 0 rom
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <span className="text-green-400">$</span> <span className="text-blue-300">sudo mount</span> <span className="text-yellow-300">/dev/sdb1</span> <span className="text-cyan-300">/media/usb</span>
                      <div className="ml-4 mt-2 text-gray-300">
                        <span className="text-green-300"># Bridge created! USB now accessible at /media/usb</span>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-green-400">$</span> <span className="text-blue-300">mount | grep</span> <span className="text-cyan-300">sdb1</span>
                      <div className="ml-4 mt-2 text-gray-300">
                        /dev/sdb1 on /media/usb type vfat (rw,nosuid,nodev)
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                    <span className="text-indigo-600 dark:text-indigo-300 font-bold">→</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Visual Mounting Diagram */}
          <section className={`mb-16 ${staggerClass(200)}`}>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3">
                  <svg className="w-7 h-7 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                  Mounting Process Visualization
                </h2>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => this.handleDiagramChange('basic')}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeDiagram === 'basic' ? 'bg-indigo-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                  >
                    Basic
                  </button>
                  <button 
                    onClick={() => this.handleDiagramChange('detailed')}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeDiagram === 'detailed' ? 'bg-indigo-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                  >
                    Detailed
                  </button>
                </div>
              </div>
              
              <div className="relative h-96 bg-white dark:bg-gray-900 rounded-xl p-6 overflow-hidden">
                <svg viewBox="0 0 800 350" className="w-full h-full">
                  {/* Physical Devices */}
                  <g className="hover:opacity-90 transition-opacity duration-300">
                    <rect x="50" y="50" width="100" height="80" rx="10" fill="#4F46E5" className="hover:fill-indigo-400 transition-all duration-300">
                      <animate attributeName="fill" values="#4F46E5;#6366F1;#4F46E5" dur="4s" repeatCount="indefinite" />
                    </rect>
                    <text x="100" y="95" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">HDD</text>
                    <text x="100" y="115" textAnchor="middle" fill="#A5B4FC" fontSize="11">/dev/sda1</text>
                    
                    <rect x="50" y="150" width="100" height="60" rx="8" fill="#10B981" className="hover:fill-green-400 transition-all duration-300">
                      <animate attributeName="fill" values="#10B981;#34D399;#10B981" dur="4s" repeatCount="indefinite" begin="1s" />
                    </rect>
                    <text x="100" y="185" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">USB</text>
                    <text x="100" y="200" textAnchor="middle" fill="#A7F3D0" fontSize="11">/dev/sdb1</text>
                    
                    <rect x="50" y="230" width="100" height="50" rx="6" fill="#F59E0B" className="hover:fill-yellow-400 transition-all duration-300">
                      <animate attributeName="fill" values="#F59E0B;#FBBF24;#F59E0B" dur="4s" repeatCount="indefinite" begin="2s" />
                    </rect>
                    <text x="100" y="260" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">CD</text>
                    <text x="100" y="275" textAnchor="middle" fill="#FDE68A" fontSize="11">/dev/sr0</text>
                  </g>
                  
                  {/* Mount Bridge Animation */}
                  <g>
                    <path d="M180 90 L300 90" stroke="#6B7280" strokeWidth="3" strokeDasharray="10,5">
                      <animate attributeName="stroke-dashoffset" values="100;0" dur="2s" repeatCount="indefinite" />
                    </path>
                    <path d="M180 180 L300 180" stroke="#6B7280" strokeWidth="3" strokeDasharray="10,5">
                      <animate attributeName="stroke-dashoffset" values="100;0" dur="2s" repeatCount="indefinite" begin="0.5s" />
                    </path>
                    <path d="M180 255 L300 255" stroke="#6B7280" strokeWidth="3" strokeDasharray="10,5">
                      <animate attributeName="stroke-dashoffset" values="100;0" dur="2s" repeatCount="indefinite" begin="1s" />
                    </path>
                    
                    {/* Mount Points */}
                    <rect x="320" y="70" width="120" height="40" rx="6" fill="#8B5CF6" className="hover:fill-purple-400 transition-all duration-300" />
                    <text x="380" y="95" textAnchor="middle" fill="white" fontSize="12">/ (root)</text>
                    
                    <rect x="320" y="160" width="120" height="40" rx="6" fill="#EC4899" className="hover:fill-pink-400 transition-all duration-300" />
                    <text x="380" y="185" textAnchor="middle" fill="white" fontSize="12">/media/usb</text>
                    
                    <rect x="320" y="235" width="120" height="40" rx="6" fill="#3B82F6" className="hover:fill-blue-400 transition-all duration-300" />
                    <text x="380" y="260" textAnchor="middle" fill="white" fontSize="12">/media/cdrom</text>
                  </g>
                  
                  {/* File System Tree */}
                  <g>
                    <rect x="500" y="30" width="250" height="290" rx="8" fill="#1F2937" />
                    <text x="625" y="55" textAnchor="middle" fill="#60A5FA" fontSize="16" fontWeight="bold">Directory Tree</text>
                    
                    {/* Tree Structure */}
                    <text x="525" y="85" fill="#D1D5DB" fontSize="12">/ (root mount point)</text>
                    <text x="525" y="105" fill="#9CA3AF" fontSize="11">├─ home/</text>
                    <text x="525" y="125" fill="#9CA3AF" fontSize="11">├─ etc/</text>
                    <text x="525" y="145" fill="#9CA3AF" fontSize="11">├─ var/</text>
                    <text x="525" y="165" fill="#9CA3AF" fontSize="11">├─ <tspan fill="#EC4899">media/usb</tspan> ← USB mounted here</text>
                    <text x="525" y="185" fill="#9CA3AF" fontSize="11">├─ <tspan fill="#3B82F6">media/cdrom</tspan> ← CD mounted here</text>
                    <text x="525" y="205" fill="#9CA3AF" fontSize="11">└─ mnt/</text>
                    
                    {/* Access Arrows */}
                    <path d="M460 185 L500 185" stroke="#10B981" strokeWidth="2" markerEnd="url(#arrowhead)">
                      <animate attributeName="stroke-dashoffset" values="50;0" dur="1.5s" repeatCount="indefinite" />
                    </path>
                    <path d="M460 260 L500 260" stroke="#3B82F6" strokeWidth="2" markerEnd="url(#arrowhead)">
                      <animate attributeName="stroke-dashoffset" values="50;0" dur="1.5s" repeatCount="indefinite" begin="0.7s" />
                    </path>
                    
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#10B981" />
                      </marker>
                    </defs>
                  </g>
                  
                  {/* Legend */}
                  <g>
                    <rect x="520" y="250" width="200" height="60" rx="6" fill="#374151" />
                    <text x="530" y="270" fill="#60A5FA" fontSize="11">Physical Device</text>
                    <circle cx="620" cy="265" r="4" fill="#4F46E5" />
                    <text x="530" y="290" fill="#60A5FA" fontSize="11">Mount Point</text>
                    <circle cx="620" cy="285" r="4" fill="#8B5CF6" />
                    <text x="530" y="310" fill="#60A5FA" fontSize="11">Active Connection</text>
                    <line x1="615" y1="305" x2="625" y2="305" stroke="#10B981" strokeWidth="2" />
                  </g>
                </svg>
                
                <div className="absolute bottom-4 left-6 right-6 bg-black/70 text-white rounded-lg p-3 text-sm">
                  <p className="text-center">
                    <span className="text-green-300">Mounting connects physical devices to directory access points.</span> 
                    <span className="text-gray-300 ml-2">Like building roads between towns (devices) and the capital (root).</span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Mount Command Deep Dive */}
          <section className={`mb-16 ${staggerClass(300)}`}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8 flex items-center gap-3">
                <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Mount & Umount Commands: Prototype & Usage
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl border-l-4 border-green-500">
                    <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-3">mount Command</h3>
                    
                    <div className="mb-4 p-3 bg-gray-900 text-gray-100 rounded-lg font-mono">
                      <div className="text-cyan-300"># Prototype/Signature</div>
                      <div className="text-green-400">mount</div>
                      <div className="text-gray-400">[-t fstype] [-o options] device mountpoint</div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                          <span className="text-green-600 dark:text-green-300 text-sm">🎯</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-gray-100">Purpose</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Attach a filesystem to the directory tree, making its contents accessible at the specified mount point.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600 dark:text-blue-300 text-sm">⏰</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-gray-100">When & Why Used</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            When plugging in USB drives, accessing network shares, mounting ISO images, or adding new disks.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Real Example</h4>
                      <code className="text-sm text-gray-700 dark:text-gray-300">
                        sudo mount /dev/sdc1 /mnt/backup -t ext4 -o rw,user
                      </code>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        # Mounts partition sdc1 (ext4) to /mnt/backup with read-write access for users
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl border-l-4 border-red-500">
                    <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-3">umount Command</h3>
                    
                    <div className="mb-4 p-3 bg-gray-900 text-gray-100 rounded-lg font-mono">
                      <div className="text-cyan-300"># Prototype/Signature</div>
                      <div className="text-green-400">umount</div>
                      <div className="text-gray-400">[-f] [-l] device|mountpoint</div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center flex-shrink-0">
                          <span className="text-red-600 dark:text-red-300 text-sm">⚠️</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-gray-100">Purpose</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Safely detach a filesystem from directory tree, ensuring data is synced before disconnection.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center flex-shrink-0">
                          <span className="text-yellow-600 dark:text-yellow-300 text-sm">🔒</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-gray-100">Critical Importance</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Prevents data corruption. Always unmount before physically disconnecting storage devices.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">Safety First!</h4>
                      <code className="text-sm text-gray-700 dark:text-gray-300">
                        sudo umount /mnt/backup  # OR sudo umount /dev/sdc1
                      </code>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        # Both work. Check with <code>mount | grep backup</code> to confirm unmount
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Interactive Mount Table */}
              <div className="mt-10">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Current Mounted Filesystems</h3>
                  <button 
                    onClick={this.simulateMount}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Simulate New Mount
                  </button>
                </div>
                
                <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Device</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Mount Point</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Options</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {mountedDevices.map((device, index) => (
                        <tr 
                          key={index} 
                          className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <code className="text-sm text-gray-800 dark:text-gray-200">{device.device}</code>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <code className="text-sm text-blue-600 dark:text-blue-300">{device.mountPoint}</code>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                              {device.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-600 dark:text-gray-300">{device.options}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => this.simulateUnmount(index)}
                              className="px-3 py-1 text-sm bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-800 transition-colors duration-300"
                            >
                              Unmount
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  <p>This simulates the <code>mount</code> command output. In real system, view with <code>mount</code> or <code>cat /proc/mounts</code></p>
                </div>
              </div>
            </div>
          </section>

          {/* Common Pitfalls Section */}
          <section className={`mb-16 ${staggerClass(400)}`}>
            <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8 flex items-center gap-3">
                <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                Common Pitfalls & Beginner Mistakes
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700 transition-all duration-300">
                    <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">1. Forgetting sudo/root privileges</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Mounting usually requires root access. Beginners get "Permission denied" and don't understand why.
                    </p>
                    <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-900 rounded text-xs font-mono">
                      <span className="text-red-400">$ mount /dev/sdb1 /mnt</span><br/>
                      <span className="text-gray-500">mount: only root can do that</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700 transition-all duration-300">
                    <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">2. Using busy mount points</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Trying to mount to a directory that's in use or contains files. Mount point should be empty.
                    </p>
                    <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-900 rounded text-xs font-mono">
                      <span className="text-red-400">$ mount /dev/sdb1 /home</span><br/>
                      <span className="text-gray-500">mount: /home busy or already mounted</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700 transition-all duration-300">
                    <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">3. Wrong filesystem type</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Specifying incorrect -t option. USB might be vfat, not ext4. Use <code>file -sL /dev/sdb1</code> to check.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700 transition-all duration-300">
                    <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">4. Pulling USB without umount</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Data corruption guaranteed! Naihati lab lost Swadeep's project files this way. <strong>Always umount first!</strong>
                    </p>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700 transition-all duration-300">
                    <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">5. Confusing device names</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      /dev/sda, sdb, sdc change based on connection order. Use <code>lsblk</code> or <code>fdisk -l</code> to confirm.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700 transition-all duration-300">
                    <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">6. Mounting read-only as read-write</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      CD-ROMs are read-only. Mounting with -o rw fails. Use appropriate options for media type.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className={`mb-16 ${staggerClass(500)}`}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8 flex items-center gap-3">
                <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Best Practices & Professional Tips
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:shadow-lg transition-all duration-500 hover:translate-y-[-4px]">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                    <span className="text-green-600 dark:text-green-300 text-xl">1</span>
                  </div>
                  <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-3">Use /mnt and /media Properly</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Temporary mounts in <code>/mnt</code>, removable media in <code>/media</code>. 
                    Create subdirectories: <code>/mnt/backup</code>, <code>/media/usb_student</code>.
                  </p>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:shadow-lg transition-all duration-500 hover:translate-y-[-4px]">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                    <span className="text-blue-600 dark:text-blue-300 text-xl">2</span>
                  </div>
                  <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-3">Automount with /etc/fstab</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    For permanent mounts, edit <code>/etc/fstab</code>. 
                    Example from Ichapur lab server automounts backup drives at boot.
                  </p>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:shadow-lg transition-all duration-500 hover:translate-y-[-4px]">
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
                    <span className="text-purple-600 dark:text-purple-300 text-xl">3</span>
                  </div>
                  <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-3">Check Mount Status</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Always verify with <code>mount | grep [device]</code> or <code>df -h</code>. 
                    Tuhina checks twice before disconnecting.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-4">Professional Workflow Example</h3>
                <div className="font-mono text-sm bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
                  <div className="text-green-400"># Step 1: Identify device</div>
                  <div className="text-gray-300 ml-4">$ lsblk</div>
                  <div className="text-gray-500 ml-8"># Find your USB (usually sdb1 or sdc1)</div>
                  
                  <div className="text-green-400 mt-3"># Step 2: Create mount point</div>
                  <div className="text-gray-300 ml-4">$ sudo mkdir -p /media/abhronila_project</div>
                  
                  <div className="text-green-400 mt-3"># Step 3: Mount with appropriate options</div>
                  <div className="text-gray-300 ml-4">$ sudo mount /dev/sdb1 /media/abhronila_project -t vfat -o rw,uid=1000</div>
                  
                  <div className="text-green-400 mt-3"># Step 4: Verify</div>
                  <div className="text-gray-300 ml-4">$ mount | grep sdb1</div>
                  <div className="text-gray-300 ml-4">$ df -h /media/abhronila_project</div>
                  
                  <div className="text-green-400 mt-3"># Step 5: When done, unmount safely</div>
                  <div className="text-gray-300 ml-4">$ cd ~  # Leave the mounted directory first!</div>
                  <div className="text-gray-300 ml-4">$ sudo umount /media/abhronila_project</div>
                </div>
              </div>
            </div>
          </section>

          {/* Hint Section */}
          <section className={`mb-16 ${staggerClass(600)}`}>
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-2xl p-8 border-2 border-yellow-200 dark:border-yellow-800">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-3">
                <svg className="w-7 h-7 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Thinking Hints & Debugging Mindset
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors duration-300">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-600 dark:text-yellow-300 text-lg">🤔</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-gray-100">Think about...</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Why does mounting fail if you're inside the mount point directory? 
                        Try <code>cd /mnt</code> then <code>sudo mount /dev/sdb1 /mnt</code>.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors duration-300">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-600 dark:text-yellow-300 text-lg">🔍</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-gray-100">Observe carefully...</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Run <code>dmesg | tail</code> after plugging in USB. What kernel messages appear? 
                        They tell you the device name and any errors.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors duration-300">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-600 dark:text-yellow-300 text-lg">💡</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-gray-100">Try changing this...</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Mount a USB with <code>-o ro</code> (read-only), try to create a file. 
                        Then remount with <code>-o rw</code>. Notice the difference?
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors duration-300">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-600 dark:text-yellow-300 text-lg">🎯</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-gray-100">Debugging trick...</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        If umount says "device busy", use <code>lsof | grep /mnt/point</code> 
                        to find which process is using it.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Teacher's Note */}
          <section className={`${staggerClass(700)}`}>
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl p-8 border-l-4 border-indigo-500 hover:border-indigo-600 transition-all duration-500 hover:shadow-lg">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-110 hover:from-indigo-600 hover:to-purple-600">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Teacher's Note</h3>
                  
                  <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      In our Barrackpore classroom, I've seen students struggle with mounting because they 
                      treat it as magical incantation rather than a logical connection process. Remember these 
                      three pillars:
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                        <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-1">1. The Bridge Model</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Device → Mount Point is like Bridge → City Access. No bridge, no access.
                        </p>
                      </div>
                      
                      <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                        <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-1">2. Safety First</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Unmount like you'd safely cross a bridge. Sudden removal = bridge collapse.
                        </p>
                      </div>
                      
                      <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                        <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-1">3. Verification Habit</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Always check with <code>mount</code> or <code>df</code>. Trust but verify.
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 mt-4">
                      <p className="text-indigo-700 dark:text-indigo-300 text-sm italic">
                        "Debangshu from Shyamnagar thought his USB was broken until he learned about mounting. 
                        Now he helps others in the lab. Understanding this concept transforms frustration into empowerment."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Quick Reference Footer */}
        <footer className={`max-w-6xl mx-auto mt-16 ${staggerClass(800)}`}>
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black rounded-2xl p-8 text-white">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Mount/Umount Quick Reference
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                <h4 className="font-bold text-green-300 mb-2">Identify Devices</h4>
                <code className="text-sm text-gray-300 block mb-1">lsblk</code>
                <code className="text-sm text-gray-300 block">fdisk -l</code>
              </div>
              
              <div className="p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                <h4 className="font-bold text-blue-300 mb-2">Mount Commands</h4>
                <code className="text-sm text-gray-300 block mb-1">mount /dev/sdX# /path</code>
                <code className="text-sm text-gray-300">mount -t type -o opts</code>
              </div>
              
              <div className="p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                <h4 className="font-bold text-red-300 mb-2">Unmount Safely</h4>
                <code className="text-sm text-gray-300 block mb-1">umount /path</code>
                <code className="text-sm text-gray-300">umount /dev/sdX#</code>
              </div>
              
              <div className="p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                <h4 className="font-bold text-yellow-300 mb-2">Check Status</h4>
                <code className="text-sm text-gray-300 block mb-1">mount | grep sd</code>
                <code className="text-sm text-gray-300">df -h</code>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-700">
              <div className="text-center">
                <p className="text-gray-400 mb-2">Remember the golden rule:</p>
                <p className="text-xl font-bold text-green-300">
                  "Mount to access, Unmount before disconnect"
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Like Abhronila's organized USB habits from Naihati lab—always safe, always verified.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

