// Topic16.jsx - Understanding disk partitions at a conceptual level
import React from 'react';

export default class Topic16 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveredCard: null,
      isReducedMotion: false,
      partitionScheme: 'mbr',
      selectedPartition: null,
      diskUsage: {
        total: 1000,
        used: 650,
        partitions: [
          { id: 1, name: 'System', size: 100, used: 80, type: 'ext4', color: '#3B82F6' },
          { id: 2, name: 'Home', size: 300, used: 200, type: 'ext4', color: '#10B981' },
          { id: 3, name: 'Swap', size: 50, used: 50, type: 'swap', color: '#8B5CF6' },
          { id: 4, name: 'Data', size: 550, used: 320, type: 'ext4', color: '#F59E0B' }
        ]
      }
    };
  }

  componentDidMount() {
    this.checkReducedMotion();
    // Initialize with default partition selection
    this.setState({ selectedPartition: this.state.diskUsage.partitions[0] });
  }

  checkReducedMotion = () => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.setState({ isReducedMotion: mediaQuery.matches });
    
    mediaQuery.addEventListener('change', (e) => {
      this.setState({ isReducedMotion: e.matches });
    });
  };

  handleCardHover = (cardId) => {
    this.setState({ hoveredCard: cardId });
  };

  handleCardLeave = () => {
    this.setState({ hoveredCard: null });
  };

  handleSchemeChange = (scheme) => {
    this.setState({ partitionScheme: scheme });
  };

  handlePartitionSelect = (partition) => {
    this.setState({ selectedPartition: partition });
  };

  calculatePercentage = (size) => {
    return (size / this.state.diskUsage.total) * 100;
  };

  render() {
    const { hoveredCard, isReducedMotion, partitionScheme, selectedPartition, diskUsage } = this.state;
    
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
      
      @keyframes partitionHighlight {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
      }
      
      @keyframes diskRotation {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      
      @keyframes dataFlow {
        0% { stroke-dashoffset: 100; }
        100% { stroke-dashoffset: 0; }
      }
    `;

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 transition-colors duration-300">
        <style>{keyframesStyle}</style>
        
        {/* Header Section */}
        <header className={`max-w-6xl mx-auto mb-12 ${animationClass}`}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-lg bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-cyan-200 dark:hover:bg-cyan-800">
              <svg className="w-6 h-6 text-cyan-600 dark:text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
                Topic 16: Understanding Disk Partitions at a Conceptual Level
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                Dividing storage space logically - The foundation of organized data management
              </p>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto">
          {/* Conceptual Foundation */}
          <section className={`mb-16 ${staggerClass(100)}`}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:translate-y-[-4px]">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-3">
                <svg className="w-7 h-7 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                What Are Disk Partitions? The Apartment Building Analogy
              </h2>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                    <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2">Core Concept</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      Think of a hard disk as an empty plot of land. <strong>Partitioning</strong> is dividing this land 
                      into separate apartments (partitions), each with its own purpose, space allocation, 
                      and rules. Just like Barrackpore's apartment buildings have separate units for families, 
                      offices, and storage.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Why Partition?</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                          <span className="text-green-600 dark:text-green-300 text-sm">✓</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-gray-100">Organization</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Separate system files from user data, like having different rooms for cooking, sleeping, and working.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600 dark:text-blue-300 text-sm">🛡️</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-gray-100">Isolation & Safety</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            If one partition fails (like Tuhina's corrupted system), other partitions (home files) remain safe.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-600 dark:text-purple-300 text-sm">⚡</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-gray-100">Multi-Boot Support</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Different operating systems in different partitions, like separate apartments with different interior designs.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="bg-gray-900 text-gray-100 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-gray-400 text-sm ml-auto">Terminal - Partition View</span>
                    </div>
                    
                    <div className="font-mono text-sm space-y-4">
                      <div>
                        <span className="text-green-400">$</span> <span className="text-blue-300">sudo fdisk -l /dev/sda</span>
                        <div className="ml-4 mt-2 text-gray-300">
                          Disk /dev/sda: 1TB, 1000204886016 bytes<br/>
                          255 heads, 63 sectors/track, 121601 cylinders<br/>
                          Units = cylinders of 16065 * 512 = 8225280 bytes
                        </div>
                      </div>
                      
                      <div>
                        <div className="ml-4 text-gray-300">
                          Device&nbsp;&nbsp;&nbsp;&nbsp;Boot&nbsp;&nbsp;Start&nbsp;&nbsp;&nbsp;&nbsp;End&nbsp;&nbsp;&nbsp;&nbsp;Blocks&nbsp;&nbsp;&nbsp;Id&nbsp;&nbsp;System<br/>
                          <span className="text-yellow-300">/dev/sda1</span>&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;13&nbsp;&nbsp;&nbsp;&nbsp;104391&nbsp;&nbsp;83&nbsp;&nbsp;Linux<br/>
                          <span className="text-cyan-300">/dev/sda2</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;14&nbsp;&nbsp;&nbsp;&nbsp;6387&nbsp;&nbsp;51200000&nbsp;83&nbsp;&nbsp;Linux<br/>
                          <span className="text-green-300">/dev/sda3</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6388&nbsp;&nbsp;121601&nbsp;925672392&nbsp;8e&nbsp;&nbsp;Linux LVM
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-gray-800 rounded">
                        <span className="text-green-400"># Interpretation:</span>
                        <div className="text-gray-400 text-xs mt-1">
                          • sda1: Boot partition (104MB) - The building's entrance<br/>
                          • sda2: System partition (51GB) - Common areas & management<br/>
                          • sda3: Home/data partition (925GB) - Living spaces
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-cyan-100 dark:bg-cyan-900 rounded-full flex items-center justify-center">
                    <span className="text-cyan-600 dark:text-cyan-300 font-bold text-xl">⟳</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Disk Visualization */}
          <section className={`mb-16 ${staggerClass(200)}`}>
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3">
                  <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Visual Partitioning: From Physical to Logical
                </h2>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => this.handleSchemeChange('mbr')}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${partitionScheme === 'mbr' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                  >
                    MBR (Legacy)
                  </button>
                  <button 
                    onClick={() => this.handleSchemeChange('gpt')}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${partitionScheme === 'gpt' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                  >
                    GPT (Modern)
                  </button>
                </div>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
                    {partitionScheme === 'mbr' ? 'MBR Partition Table' : 'GPT Partition Table'}
                  </h3>
                  
                  <div className="relative h-64">
                    <svg viewBox="0 0 400 250" className="w-full h-full">
                      {/* Physical Disk */}
                      <circle cx="200" cy="125" r="80" fill="#374151" stroke="#4B5563" strokeWidth="2">
                        {!isReducedMotion && (
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 200 125"
                            to="360 200 125"
                            dur="20s"
                            repeatCount="indefinite"
                          />
                        )}
                      </circle>
                      
                      {/* Partition Slices */}
                      {partitionScheme === 'mbr' ? (
                        // MBR Layout (4 primary partitions max)
                        <g>
                          <path d="M200,125 L200,45 A80,80 0 0,1 280,125 Z" fill="#3B82F6" opacity="0.8" 
                            className="hover:opacity-100 cursor-pointer transition-opacity duration-300"
                            onClick={() => this.handlePartitionSelect(diskUsage.partitions[0])}>
                            <title>Primary Partition 1 - System</title>
                            <animate attributeName="fill" values="#3B82F6;#60A5FA;#3B82F6" dur="3s" repeatCount="indefinite" />
                          </path>
                          <path d="M200,125 L280,125 A80,80 0 0,1 200,205 Z" fill="#10B981" opacity="0.8"
                            className="hover:opacity-100 cursor-pointer transition-opacity duration-300"
                            onClick={() => this.handlePartitionSelect(diskUsage.partitions[1])}>
                            <title>Primary Partition 2 - Home</title>
                            <animate attributeName="fill" values="#10B981;#34D399;#10B981" dur="3s" repeatCount="indefinite" begin="0.5s" />
                          </path>
                          <path d="M200,125 L200,205 A80,80 0 0,1 120,125 Z" fill="#8B5CF6" opacity="0.8"
                            className="hover:opacity-100 cursor-pointer transition-opacity duration-300"
                            onClick={() => this.handlePartitionSelect(diskUsage.partitions[2])}>
                            <title>Primary Partition 3 - Swap</title>
                            <animate attributeName="fill" values="#8B5CF6;#A78BFA;#8B5CF6" dur="3s" repeatCount="indefinite" begin="1s" />
                          </path>
                          <path d="M200,125 L120,125 A80,80 0 0,1 200,45 Z" fill="#F59E0B" opacity="0.8"
                            className="hover:opacity-100 cursor-pointer transition-opacity duration-300"
                            onClick={() => this.handlePartitionSelect(diskUsage.partitions[3])}>
                            <title>Primary Partition 4 - Data</title>
                            <animate attributeName="fill" values="#F59E0B;#FBBF24;#F59E0B" dur="3s" repeatCount="indefinite" begin="1.5s" />
                          </path>
                          
                          {/* MBR Boot Sector */}
                          <circle cx="200" cy="125" r="20" fill="#1F2937" stroke="#EF4444" strokeWidth="2">
                            <animate attributeName="stroke" values="#EF4444;#FCA5A5;#EF4444" dur="2s" repeatCount="indefinite" />
                          </circle>
                          <text x="200" y="130" textAnchor="middle" fill="#FCA5A5" fontSize="10">MBR</text>
                          <text x="200" y="70" textAnchor="middle" fill="#9CA3AF" fontSize="9">Max 4 Primary</text>
                        </g>
                      ) : (
                        // GPT Layout (Many partitions)
                        <g>
                          {/* GPT Header */}
                          <circle cx="200" cy="125" r="25" fill="#1F2937" stroke="#10B981" strokeWidth="2">
                            <animate attributeName="stroke" values="#10B981;#34D399;#10B981" dur="2s" repeatCount="indefinite" />
                          </circle>
                          <text x="200" y="130" textAnchor="middle" fill="#34D399" fontSize="10">GPT</text>
                          
                          {/* Multiple GPT Partitions */}
                          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                            const startAngle = i * 45;
                            const endAngle = (i + 1) * 45;
                            const colors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EC4899', '#14B8A6', '#F97316', '#8B5CF6'];
                            
                            return (
                              <path
                                key={i}
                                d={`M200,125 L${200 + 80 * Math.cos(startAngle * Math.PI / 180)},${125 + 80 * Math.sin(startAngle * Math.PI / 180)} A80,80 0 0,1 ${200 + 80 * Math.cos(endAngle * Math.PI / 180)},${125 + 80 * Math.sin(endAngle * Math.PI / 180)} Z`}
                                fill={colors[i]}
                                opacity="0.7"
                                className="hover:opacity-100 cursor-pointer transition-opacity duration-300"
                              >
                                <title>GPT Partition {i + 1}</title>
                                <animate attributeName="fill" values={`${colors[i]};${colors[(i + 1) % colors.length]};${colors[i]}`} dur="3s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
                              </path>
                            );
                          })}
                          <text x="200" y="70" textAnchor="middle" fill="#9CA3AF" fontSize="9">128 Partitions Max</text>
                        </g>
                      )}
                      
                      {/* Labels */}
                      <text x="200" y="220" textAnchor="middle" fill="#6B7280" fontSize="12">
                        {partitionScheme === 'mbr' ? 'Master Boot Record (Legacy)' : 'GUID Partition Table (Modern)'}
                      </text>
                    </svg>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Partition Limit:</span>
                      <span className="font-bold text-gray-800 dark:text-gray-100">
                        {partitionScheme === 'mbr' ? '4 Primary' : '128 Partitions'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Max Disk Size:</span>
                      <span className="font-bold text-gray-800 dark:text-gray-100">
                        {partitionScheme === 'mbr' ? '2TB' : '9.4ZB (Practically Unlimited)'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Boot Method:</span>
                      <span className="font-bold text-gray-800 dark:text-gray-100">
                        {partitionScheme === 'mbr' ? 'BIOS' : 'UEFI'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                      Selected Partition Details
                    </h3>
                    
                    {selectedPartition && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-6 h-6 rounded" 
                              style={{ backgroundColor: selectedPartition.color }}
                            ></div>
                            <span className="font-bold text-gray-800 dark:text-gray-100">
                              {selectedPartition.name}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {selectedPartition.size} GB
                          </span>
                        </div>
                        
                        {/* Usage Bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-300">Usage</span>
                            <span className="font-medium text-gray-800 dark:text-gray-100">
                              {selectedPartition.used}GB / {selectedPartition.size}GB
                            </span>
                          </div>
                          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full transition-all duration-500"
                              style={{ 
                                width: `${(selectedPartition.used / selectedPartition.size) * 100}%`,
                                backgroundColor: selectedPartition.color
                              }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="text-xs text-gray-500 dark:text-gray-400">Type</div>
                            <div className="font-medium text-gray-800 dark:text-gray-100">
                              {selectedPartition.type}
                            </div>
                          </div>
                          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="text-xs text-gray-500 dark:text-gray-400">Filesystem</div>
                            <div className="font-medium text-gray-800 dark:text-gray-100">
                              {selectedPartition.type === 'swap' ? 'Swap Space' : 'Linux Filesystem'}
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="text-sm text-blue-700 dark:text-blue-300">
                            {selectedPartition.name === 'System' && "Contains OS files, similar to building's management office"}
                            {selectedPartition.name === 'Home' && "User files, like personal apartments in the building"}
                            {selectedPartition.name === 'Swap' && "Virtual memory extension, like emergency overflow space"}
                            {selectedPartition.name === 'Data' && "Shared storage, like building's common storage area"}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3">MBR vs GPT Comparison</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Use MBR when:</span>
                        <span className="text-xs px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded">
                          Old hardware
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Use GPT when:</span>
                        <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
                          Modern systems
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Partition Types Deep Dive */}
          <section className={`mb-16 ${staggerClass(300)}`}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8 flex items-center gap-3">
                <svg className="w-7 h-7 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Types of Partitions: Primary, Extended, Logical
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div 
                  className={`p-6 rounded-xl border-2 transition-all duration-500 hover:shadow-lg hover:translate-y-[-4px] cursor-pointer
                    ${hoveredCard === 'primary' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700'}`}
                  onMouseEnter={() => this.handleCardHover('primary')}
                  onMouseLeave={this.handleCardLeave}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-300 font-bold">P</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Primary Partition</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">1</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Directly bootable (can contain an OS)
                      </p>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">2</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        MBR limits to 4 primary partitions per disk
                      </p>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">3</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Example: Windows C: drive or Linux root (/)
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded border">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      <strong>Real-world:</strong> Swadeep's laptop has Windows on sda1 (primary), Ubuntu on sda2 (primary)
                    </p>
                  </div>
                </div>
                
                <div 
                  className={`p-6 rounded-xl border-2 transition-all duration-500 hover:shadow-lg hover:translate-y-[-4px] cursor-pointer
                    ${hoveredCard === 'extended' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700'}`}
                  onMouseEnter={() => this.handleCardHover('extended')}
                  onMouseLeave={this.handleCardLeave}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-300 font-bold">E</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Extended Partition</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">1</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Special container that holds logical partitions
                      </p>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">2</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Counts as one primary partition in MBR scheme
                      </p>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">3</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Cannot directly contain data - only logical partitions
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded border">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      <strong>Analogy:</strong> Like a big drawer (extended) containing smaller compartments (logical)
                    </p>
                  </div>
                </div>
                
                <div 
                  className={`p-6 rounded-xl border-2 transition-all duration-500 hover:shadow-lg hover:translate-y-[-4px] cursor-pointer
                    ${hoveredCard === 'logical' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700'}`}
                  onMouseEnter={() => this.handleCardHover('logical')}
                  onMouseLeave={this.handleCardLeave}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                      <span className="text-purple-600 dark:text-purple-300 font-bold">L</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Logical Partition</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">1</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Created inside an extended partition
                      </p>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">2</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Not directly bootable (usually)
                      </p>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">3</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Can have many logical partitions (limited by disk)
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded border">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      <strong>Example:</strong> Abhronila's data drives (D:, E:, F:) in Windows
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Partition Structure Diagram */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">MBR Partition Structure</h3>
                <div className="flex flex-col items-center">
                  <svg viewBox="0 0 600 200" className="w-full h-48">
                    {/* Disk Representation */}
                    <rect x="50" y="80" width="500" height="40" rx="5" fill="#4B5563" />
                    <text x="300" y="70" textAnchor="middle" fill="#9CA3AF" fontSize="12">Physical Disk</text>
                    
                    {/* Partition Blocks */}
                    <g>
                      <rect x="70" y="80" width="80" height="40" fill="#3B82F6" className="hover:fill-blue-400 transition-colors duration-300">
                        <title>Primary Partition 1</title>
                      </rect>
                      <text x="110" y="105" textAnchor="middle" fill="white" fontSize="10">P1</text>
                      
                      <rect x="170" y="80" width="80" height="40" fill="#10B981" className="hover:fill-green-400 transition-colors duration-300">
                        <title>Primary Partition 2</title>
                      </rect>
                      <text x="210" y="105" textAnchor="middle" fill="white" fontSize="10">P2</text>
                      
                      <rect x="270" y="80" width="80" height="40" fill="#8B5CF6" className="hover:fill-purple-400 transition-colors duration-300">
                        <title>Primary Partition 3</title>
                      </rect>
                      <text x="310" y="105" textAnchor="middle" fill="white" fontSize="10">P3</text>
                      
                      {/* Extended Partition */}
                      <rect x="370" y="80" width="160" height="40" fill="#F59E0B" className="hover:fill-yellow-400 transition-colors duration-300">
                        <title>Extended Partition</title>
                      </rect>
                      <text x="450" y="105" textAnchor="middle" fill="white" fontSize="10">Extended</text>
                      
                      {/* Logical Partitions Inside Extended */}
                      <rect x="380" y="85" width="45" height="30" fill="#EC4899" className="hover:fill-pink-400 transition-colors duration-300">
                        <title>Logical Partition 1</title>
                      </rect>
                      <text x="402" y="105" textAnchor="middle" fill="white" fontSize="8">L1</text>
                      
                      <rect x="435" y="85" width="45" height="30" fill="#14B8A6" className="hover:fill-teal-400 transition-colors duration-300">
                        <title>Logical Partition 2</title>
                      </rect>
                      <text x="457" y="105" textAnchor="middle" fill="white" fontSize="8">L2</text>
                      
                      <rect x="480" y="85" width="45" height="30" fill="#F97316" className="hover:fill-orange-400 transition-colors duration-300">
                        <title>Logical Partition 3</title>
                      </rect>
                      <text x="502" y="105" textAnchor="middle" fill="white" fontSize="8">L3</text>
                    </g>
                    
                    {/* Labels */}
                    <g>
                      <text x="110" y="130" textAnchor="middle" fill="#6B7280" fontSize="10">Primary</text>
                      <text x="210" y="130" textAnchor="middle" fill="#6B7280" fontSize="10">Primary</text>
                      <text x="310" y="130" textAnchor="middle" fill="#6B7280" fontSize="10">Primary</text>
                      <text x="450" y="130" textAnchor="middle" fill="#6B7280" fontSize="10">Extended (Container)</text>
                      
                      <line x1="380" y1="135" x2="425" y2="135" stroke="#EC4899" strokeWidth="1" />
                      <text x="402" y="145" textAnchor="middle" fill="#EC4899" fontSize="8">Logical</text>
                      
                      <line x1="435" y1="135" x2="480" y2="135" stroke="#14B8A6" strokeWidth="1" />
                      <text x="457" y="145" textAnchor="middle" fill="#14B8A6" fontSize="8">Logical</text>
                      
                      <line x1="480" y1="135" x2="525" y2="135" stroke="#F97316" strokeWidth="1" />
                      <text x="502" y="145" textAnchor="middle" fill="#F97316" fontSize="8">Logical</text>
                    </g>
                  </svg>
                  
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>MBR Rule:</strong> 3 Primary + 1 Extended (containing 3 Logical) = Total 6 usable partitions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Common Pitfalls */}
          <section className={`mb-16 ${staggerClass(400)}`}>
            <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8 flex items-center gap-3">
                <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                Common Partitioning Mistakes & Solutions
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">1. Too Small System Partition</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Allocating only 20GB for / (root) then running out of space when updates install. 
                      <strong>Debangshu from Naihati</strong> faced this installing software updates.
                    </p>
                    <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-900 rounded text-xs">
                      <span className="text-green-600">✓ Solution:</span> Minimum 30-50GB for root, more if installing many applications
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">2. No Separate Home Partition</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Keeping /home in root partition. When OS needs reinstall, personal files get wiped.
                    </p>
                    <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-900 rounded text-xs">
                      <span className="text-green-600">✓ Solution:</span> Always create separate /home partition for data safety
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">3. Forgetting Swap Space</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Especially on systems with less RAM. Causes system crashes under heavy load.
                    </p>
                    <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-900 rounded text-xs">
                      <span className="text-green-600">✓ Solution:</span> Create swap partition (1-2x RAM for HDD, equal to RAM for SSD)
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">4. Wrong Partition Alignment</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Older tools misalign partitions, causing performance drops (especially on SSDs).
                    </p>
                    <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-900 rounded text-xs">
                      <span className="text-green-600">✓ Solution:</span> Use modern tools (gdisk for GPT, fdisk with 1MiB alignment)
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">5. MBR on Large Disks</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Using MBR on 3TB+ disks wastes space (only 2TB addressable). <strong>Tuhina's external drive</strong> showed this.
                    </p>
                    <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-900 rounded text-xs">
                      <span className="text-green-600">✓ Solution:</span> Use GPT for disks >2TB
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">6. Backing Up Partition Table</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Not saving partition layout before making changes. Recovery becomes difficult if mistakes happen.
                    </p>
                    <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-900 rounded text-xs">
                      <span className="text-green-600">✓ Solution:</span> Always backup: <code>sudo sfdisk -d /dev/sda > partition_backup.txt</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Best Practices & Professional Tips */}
          <section className={`mb-16 ${staggerClass(500)}`}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8 flex items-center gap-3">
                <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Best Practices & Professional Partitioning Strategy
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-600 rounded-xl">
                    <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-4">Typical Linux Partition Scheme</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-blue-500 flex items-center justify-center">
                            <span className="text-white text-sm">/</span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-800 dark:text-gray-100">Root Partition</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">30-50GB</div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">System files, applications</div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-green-500 flex items-center justify-center">
                            <span className="text-white text-sm">/home</span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-800 dark:text-gray-100">Home Partition</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Remaining space</div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">User data, documents</div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-purple-500 flex items-center justify-center">
                            <span className="text-white text-sm">swap</span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-800 dark:text-gray-100">Swap Partition</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">4-16GB</div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Virtual memory</div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        <strong>Shyamnagar Lab Setup:</strong> 256GB SSD = 40GB (/), 8GB (swap), 208GB (/home)
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3">Partitioning Tools</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <code className="text-sm text-gray-700 dark:text-gray-300">fdisk</code>
                        <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded">MBR disks</span>
                      </div>
                      <div className="flex justify-between">
                        <code className="text-sm text-gray-700 dark:text-gray-300">gdisk</code>
                        <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">GPT disks</span>
                      </div>
                      <div className="flex justify-between">
                        <code className="text-sm text-gray-700 dark:text-gray-300">parted</code>
                        <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">Both MBR/GPT</span>
                      </div>
                      <div className="flex justify-between">
                        <code className="text-sm text-gray-700 dark:text-gray-300">GParted</code>
                        <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded">GUI tool</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 rounded-xl">
                    <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-4">Professional Considerations</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                          <span className="text-green-600 dark:text-green-300 text-sm">🎯</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-gray-100">SSD Optimization</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Align partitions to 1MB boundaries, leave 10-20% free for wear leveling
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600 dark:text-blue-300 text-sm">📊</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-gray-100">Multi-User Systems</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Create separate /var, /tmp partitions to prevent logs/temp files filling root
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-600 dark:text-purple-300 text-sm">🔧</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-gray-100">Server Setup</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Separate /boot (300MB), / (20GB), /var (size based on logs), /home (rest)
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center flex-shrink-0">
                          <span className="text-yellow-600 dark:text-yellow-300 text-sm">💾</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-gray-100">Future Proofing</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Leave unallocated space for future expansion or new partitions
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3">Checking Partitions</h4>
                    <div className="font-mono text-sm bg-gray-900 text-gray-100 rounded-lg p-3">
                      <div className="text-green-400"># View all partitions</div>
                      <div className="text-gray-300">sudo fdisk -l</div>
                      
                      <div className="text-green-400 mt-2"># View mounted partitions</div>
                      <div className="text-gray-300">df -hT</div>
                      
                      <div className="text-green-400 mt-2"># Check partition type</div>
                      <div className="text-gray-300">sudo blkid</div>
                    </div>
                  </div>
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
                Thinking Hints & Conceptual Questions
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
                        Why does MBR limit to 4 primary partitions? Think about historical constraints 
                        (1983 IBM PC design) and backward compatibility.
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
                        Run <code>sudo fdisk -l</code> on different systems. Compare partition layouts 
                        of laptops vs desktops vs servers in Ichapur computer center.
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
                        In a virtual machine, practice resizing partitions. What happens when you 
                        shrink a partition vs extend it? Which is safer?
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors duration-300">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-600 dark:text-yellow-300 text-lg">🎯</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-gray-100">Planning exercise...</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Plan partition layout for Barrackpore school's new computer: 512GB SSD, 
                        16GB RAM, dual-boot Windows/Linux for programming classes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Teacher's Note */}
          <section className={`${staggerClass(700)}`}>
            <div className="bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-2xl p-8 border-l-4 border-cyan-500 hover:border-cyan-600 transition-all duration-500 hover:shadow-lg">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-110">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Teacher's Note</h3>
                  
                  <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      I've noticed students from Shyamnagar often get confused between partitions and filesystems. 
                      Remember: <strong>Partitions are the containers</strong> (apartments), while <strong>filesystems are the interior designs</strong> 
                      (ext4, NTFS, FAT32) that organize how data is stored inside those containers.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                        <h4 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-1">Key Analogy</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Disk = Land, Partition = Apartment, Filesystem = Interior, Files = Furniture
                        </p>
                      </div>
                      
                      <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                        <h4 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-1">Safety Tip</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Always backup data before partitioning. Swadeep learned this the hard way!
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-4 mt-4">
                      <p className="text-cyan-700 dark:text-cyan-300 text-sm italic">
                        "Abhronila asked: 'Why can't we have one big partition?' Think about organizing a library. 
                        Would you put all books in one room, or separate sections for science, literature, history? 
                        Partitions provide that organization at the storage level."
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
              Partitioning Quick Reference
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                <h4 className="font-bold text-blue-300 mb-2">Basic Concepts</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Partition = Logical division of disk</li>
                  <li>• MBR: Legacy, 4 primary max</li>
                  <li>• GPT: Modern, 128 partitions</li>
                  <li>• Primary: Bootable, direct</li>
                  <li>• Extended: Container for logical</li>
                </ul>
              </div>
              
              <div className="p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                <h4 className="font-bold text-green-300 mb-2">Linux Layout (Typical)</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• / (root): 30-50GB</li>
                  <li>• /home: Rest of space</li>
                  <li>• swap: 1-2x RAM (HDD)</li>
                  <li>• /boot: 300MB (optional)</li>
                  <li>• /var: Separate for servers</li>
                </ul>
              </div>
              
              <div className="p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                <h4 className="font-bold text-yellow-300 mb-2">Essential Commands</h4>
                <div className="text-sm text-gray-300 space-y-1">
                  <code className="block">fdisk -l</code>
                  <code className="block">gdisk /dev/sda</code>
                  <code className="block">parted -l</code>
                  <code className="block">lsblk</code>
                  <code className="block">blkid</code>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-700">
              <div className="text-center">
                <p className="text-gray-400 mb-2">Remember the partitioning philosophy:</p>
                <p className="text-xl font-bold text-cyan-300">
                  "Plan before you partition, separate for safety, leave room for growth"
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Like Tuhina's organized study materials—each subject in its own section, with space for new topics.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

