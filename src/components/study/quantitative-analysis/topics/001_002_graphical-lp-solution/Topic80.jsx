import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic80_files/topic80_questions';
import noteText from './topic80_files/topic80_note.txt?raw';

const Topic80 = () => {
  const [activeTab, setActiveTab] = useState('concept');
  const [selectedIndustry, setSelectedIndustry] = useState(0);

  const tabs = [
    { id: 'concept', label: 'Overview' },
    { id: 'applications', label: 'Applications' },
    { id: 'practice', label: 'Practice' },
  ];

  // Industry applications data
  const industryApplications = [
    {
      industry: 'Manufacturing',
      icon: '🏭',
      description: 'Optimizing production mix, resource allocation, and capacity planning in factories and production facilities.',
      examples: [
        'Product mix optimization with limited resources',
        'Production scheduling with machine constraints',
        'Inventory management with storage limits',
        'Quality control resource allocation'
      ],
      lpExample: 'Maximize Z = 8x + 6y (Profit)\nSubject to: 3x + 2y ≤ 24 (Labor), 4x + y ≤ 20 (Machine)',
      benefit: 'Increased profitability, better resource utilization, reduced waste'
    },
    {
      industry: 'Agriculture',
      icon: '🌾',
      description: 'Farm planning, crop selection, resource allocation, and irrigation management in agricultural operations.',
      examples: [
        'Crop mix optimization with land and water constraints',
        'Fertilizer allocation across different crops',
        'Livestock feed optimization',
        'Seasonal planting decisions'
      ],
      lpExample: 'Maximize Z = 15x + 12y (Profit)\nSubject to: x + y ≤ 100 (Land), 2x + 3y ≤ 240 (Water)',
      benefit: 'Higher yields, reduced costs, sustainable farming practices'
    },
    {
      industry: 'Transportation',
      icon: '🚚',
      description: 'Route optimization, fleet management, and logistics planning in transportation and distribution.',
      examples: [
        'Delivery route optimization with time constraints',
        'Fleet allocation across different routes',
        'Warehouse location planning',
        'Fuel consumption optimization'
      ],
      lpExample: 'Minimize Z = 5x + 7y (Cost)\nSubject to: x + 2y ≥ 100 (Demand), 3x + y ≤ 150 (Capacity)',
      benefit: 'Reduced transportation costs, faster delivery, lower emissions'
    },
    {
      industry: 'Healthcare',
      icon: '🏥',
      description: 'Resource allocation in hospitals, staff scheduling, and patient flow optimization in healthcare systems.',
      examples: [
        'Staff scheduling with coverage requirements',
        'Equipment allocation across departments',
        'Patient bed allocation',
        'Operating room scheduling'
      ],
      lpExample: 'Maximize Z = 10x + 8y (Patient Care)\nSubject to: 2x + 3y ≤ 40 (Nurses), 4x + y ≤ 32 (Doctors)',
      benefit: 'Better patient care, reduced wait times, efficient resource use'
    },
    {
      industry: 'Finance',
      icon: '💰',
      description: 'Portfolio optimization, investment allocation, and risk management in financial institutions.',
      examples: [
        'Investment portfolio allocation with risk constraints',
        'Loan portfolio optimization',
        'Asset-liability management',
        'Budget allocation across departments'
      ],
      lpExample: 'Maximize Z = 12x + 10y (Return)\nSubject to: x + y ≤ 100 (Capital), 0.5x + 0.3y ≤ 40 (Risk)',
      benefit: 'Higher returns, better risk management, optimized portfolios'
    },
    {
      industry: 'Energy',
      icon: '⚡',
      description: 'Energy production planning, resource allocation, and sustainability optimization in the energy sector.',
      examples: [
        'Power generation mix optimization',
        'Renewable energy allocation',
        'Fuel consumption optimization',
        'Grid load balancing'
      ],
      lpExample: 'Minimize Z = 6x + 8y (Cost)\nSubject to: 2x + y ≥ 80 (Demand), 3x + 4y ≤ 120 (Emissions)',
      benefit: 'Lower costs, reduced emissions, sustainable energy planning'
    },
    {
      industry: 'Retail',
      icon: '🛍️',
      description: 'Inventory management, shelf space optimization, and pricing strategies in retail operations.',
      examples: [
        'Shelf space allocation across products',
        'Inventory ordering with storage constraints',
        'Pricing optimization with demand constraints',
        'Store layout planning'
      ],
      lpExample: 'Maximize Z = 7x + 5y (Revenue)\nSubject to: x + y ≤ 50 (Space), 2x + 3y ≤ 120 (Stock)',
      benefit: 'Higher sales, optimized inventory, better customer satisfaction'
    },
    {
      industry: 'Education',
      icon: '📚',
      description: 'Resource allocation in schools, course scheduling, and faculty assignment in educational institutions.',
      examples: [
        'Course scheduling with room constraints',
        'Faculty allocation across departments',
        'Resource allocation across schools',
        'Student placement optimization'
      ],
      lpExample: 'Maximize Z = 9x + 7y (Student Achievement)\nSubject to: x + 2y ≤ 80 (Teachers), 3x + y ≤ 60 (Rooms)',
      benefit: 'Better learning outcomes, efficient resource use, improved scheduling'
    }
  ];

  // Key concepts about practical applications
  const keyConcepts = [
    {
      title: 'Real-World Decision Making',
      description: 'Graphical LP helps managers make optimal decisions in resource allocation, production planning, and operational efficiency.'
    },
    {
      title: 'Resource Constraints',
      description: 'Every industry faces resource constraints - labor, materials, capital, time, and capacity. LP helps optimize within these constraints.'
    },
    {
      title: 'Objective Functions',
      description: 'Different industries have different objectives: profit maximization, cost minimization, service quality optimization, or risk management.'
    },
    {
      title: 'Implementation Challenges',
      description: 'Real-world LP applications face challenges: data availability, model complexity, stakeholder buy-in, and changing conditions.'
    }
  ];

  // Benefits of graphical LP in practice
  const benefits = [
    {
      title: 'Visual Decision Support',
      description: 'Graphical representation makes complex optimization problems understandable to non-technical stakeholders.'
    },
    {
      title: 'Quick What-If Analysis',
      description: 'Managers can visually see the impact of changes in resources or objectives on the optimal solution.'
    },
    {
      title: 'Resource Bottleneck Identification',
      description: 'Graphical LP clearly shows which resources are constraints and where to focus improvement efforts.'
    },
    {
      title: 'Communication Tool',
      description: 'Graphs provide an effective way to communicate optimization results and recommendations to decision-makers.'
    }
  ];

  // Steps for applying LP in practice
  const applicationSteps = [
    {
      title: 'Step 1: Problem Definition',
      description: 'Clearly define the problem, objectives, and constraints with stakeholders.',
      icon: '📝'
    },
    {
      title: 'Step 2: Data Collection',
      description: 'Gather accurate data on resources, requirements, costs, and revenues.',
      icon: '📊'
    },
    {
      title: 'Step 3: Model Formulation',
      description: 'Translate the problem into LP formulation with variables, objective, and constraints.',
      icon: '📐'
    },
    {
      title: 'Step 4: Solve and Analyze',
      description: 'Solve the LP problem and analyze the results, including sensitivity analysis.',
      icon: '🔍'
    },
    {
      title: 'Step 5: Implementation',
      description: 'Translate the mathematical solution into actionable recommendations and implement.',
      icon: '🚀'
    }
  ];

  // Common mistakes in practical applications
  const commonMistakes = [
    {
      mistake: 'Oversimplifying the Problem',
      explanation: 'Real-world problems often have more complexity than can be captured in a simple LP model. Important constraints may be overlooked.'
    },
    {
      mistake: 'Using Inaccurate Data',
      explanation: 'LP solutions are only as good as the data. Inaccurate cost, revenue, or resource data leads to suboptimal decisions.'
    },
    {
      mistake: 'Ignoring Human Factors',
      explanation: 'LP models may ignore important human factors like employee morale, customer satisfaction, or stakeholder concerns.'
    },
    {
      mistake: 'Not Updating Models',
      explanation: 'Business conditions change. LP models must be updated regularly to remain relevant and accurate.'
    }
  ];

  // Best practices for practical LP applications
  const bestPractices = [
    {
      practice: 'Involve Stakeholders',
      description: 'Engage decision-makers and those affected by the solution in the modeling process.'
    },
    {
      practice: 'Validate the Model',
      description: 'Test the model with historical data and validate results before implementation.'
    },
    {
      practice: 'Perform Sensitivity Analysis',
      description: 'Understand how changes in assumptions affect the optimal solution.'
    },
    {
      practice: 'Plan for Implementation',
      description: 'Develop a clear implementation plan with timelines, responsibilities, and success metrics.'
    }
  ];

  // Industry application visualization component
  const IndustryVisualization = ({ industry }) => {
    const data = industryApplications[industry];
    if (!data) return null;

    return (
      <div className="w-full max-w-4xl mx-auto my-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{data.icon}</span>
            <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              {data.industry}
            </h4>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* SVG Visualization */}
            <div className="flex justify-center items-center">
              <svg viewBox="0 0 500 450" className="w-full max-w-md h-auto">
                {/* Background */}
                <rect x="50" y="30" width="400" height="370" fill="#f8f9fa" stroke="#e9ecef" strokeWidth="0.5" className="dark:fill-gray-700 dark:stroke-gray-600"/>
                
                {/* Grid */}
                {Array.from({ length: 10 }, (_, i) => (
                  <g key={`grid-${i}`}>
                    <line x1="50" y1={30 + i * 37} x2="450" y2={30 + i * 37} stroke="#e9ecef" strokeWidth="0.5" className="dark:stroke-gray-600"/>
                    <line x1={50 + i * 40} y1="30" x2={50 + i * 40} y2="400" stroke="#e9ecef" strokeWidth="0.5" className="dark:stroke-gray-600"/>
                  </g>
                ))}
                
                {/* Axes */}
                <line x1="50" y1="400" x2="450" y2="400" stroke="#333" strokeWidth="2" className="dark:stroke-gray-300"/>
                <line x1="50" y1="400" x2="50" y2="30" stroke="#333" strokeWidth="2" className="dark:stroke-gray-300"/>
                
                {/* Axis labels */}
                <text x="440" y="420" textAnchor="end" fontSize="14" fill="#333" className="dark:fill-gray-300">x</text>
                <text x="30" y="35" textAnchor="middle" fontSize="14" fill="#333" className="dark:fill-gray-300">y</text>
                <text x="50" y="420" textAnchor="start" fontSize="12" fill="#666" className="dark:fill-gray-400">0</text>
                
                {/* Constraint lines - generic representation */}
                <line x1="50" y1="380" x2="450" y2="80" stroke="#FF6B6B" strokeWidth="2"/>
                <text x="400" y="75" fontSize="9" fill="#FF6B6B" className="dark:fill-red-400">Constraint 1</text>
                
                <line x1="50" y1="350" x2="450" y2="150" stroke="#4ECDC4" strokeWidth="2"/>
                <text x="400" y="145" fontSize="9" fill="#4ECDC4" className="dark:fill-green-400">Constraint 2</text>
                
                {/* Feasible region */}
                <polygon points="50,400 50,350 200,200 350,150 400,150 450,400" fill="rgba(78, 205, 196, 0.1)" stroke="none"/>
                
                {/* Optimal point */}
                <circle cx="250" cy="220" r="10" fill="#FF4757" stroke="white" strokeWidth="3">
                  <animate attributeName="r" values="10;12;10" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="250" y="210" textAnchor="middle" fontSize="10" fill="#FF4757" className="dark:fill-red-400">Optimal</text>
                <text x="250" y="235" textAnchor="middle" fontSize="9" fill="#FF4757" className="dark:fill-red-400">(x*, y*)</text>
                
                {/* Objective function */}
                <line x1="80" y1="380" x2="400" y2="100" stroke="#FF8A5C" strokeWidth="1.5" strokeDasharray="6,3">
                  <animate attributeName="stroke-dashoffset" values="0;50" dur="3s" repeatCount="indefinite" />
                </line>
                <text x="400" y="95" fontSize="9" fill="#FF8A5C" className="dark:fill-orange-300">Max/Min Z</text>
                
                {/* Industry icon in corner */}
                <text x="350" y="380" fontSize="40" opacity="0.1">{data.icon}</text>
                
                {/* Legend */}
                <g transform="translate(50, 10)">
                  <rect x="0" y="0" width="180" height="80" rx="5" fill="white" stroke="#ddd" strokeWidth="1" className="dark:fill-gray-700 dark:stroke-gray-600"/>
                  <text x="10" y="20" fontSize="12" fontWeight="bold" fill="#333" className="dark:fill-gray-300">Legend</text>
                  <line x1="10" y1="30" x2="30" y2="30" stroke="#FF6B6B" strokeWidth="2"/>
                  <text x="35" y="34" fontSize="8" fill="#555" className="dark:fill-gray-400">Resource Constraints</text>
                  <line x1="10" y1="50" x2="30" y2="50" stroke="#FF8A5C" strokeWidth="2" strokeDasharray="6,3"/>
                  <text x="35" y="54" fontSize="8" fill="#555" className="dark:fill-gray-400">Objective Function</text>
                  <circle cx="20" cy="68" r="5" fill="#FF4757"/>
                  <text x="35" y="72" fontSize="8" fill="#555" className="dark:fill-gray-400">Optimal Solution</text>
                </g>
              </svg>
            </div>
            
            {/* Details Panel */}
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Description</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {data.description}
                </p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                <h5 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Applications</h5>
                <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  {data.examples.map((example, idx) => (
                    <li key={`ex-${idx}`}>{example}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                <h5 className="font-semibold text-green-700 dark:text-green-400 mb-2">LP Example</h5>
                <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded text-gray-700 dark:text-gray-300">
                  {data.lpExample}
                </pre>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                <h5 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Benefits</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {data.benefit}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-all duration-300">
            Practical Applications of Graphical LP
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Explore how graphical linear programming is applied across various industries 
            to solve real-world resource allocation and optimization problems.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center border-b border-gray-200 dark:border-gray-700 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                "px-6 py-2 rounded-lg font-medium transition-all duration-300",
                activeTab === tab.id
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md"
              )}
            &gt;
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'concept' && (
            <>
              {/* Key Concepts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {keyConcepts.map((concept, index) => (
                  <div
                    key={`concept-${index}`}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-l-4 border-indigo-600"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      {concept.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {concept.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Benefits of Graphical LP */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
                  Benefits of Graphical LP in Practice
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {benefits.map((benefit, index) => (
                    <div
                      key={`benefit-${index}`}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                    >
                      <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {benefit.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Application Steps */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
                  Steps for Applying LP in Practice
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {applicationSteps.map((step, index) => (
                    <div
                      key={`step-${index}`}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                    >
                      <div className="text-4xl mb-2">{step.icon}</div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1 text-xs">
                        {step.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Common Mistakes */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">
                  Common Mistakes in Practical Applications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {commonMistakes.map((mistake, index) => (
                    <div
                      key={`mistake-${index}`}
                      className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500 transition-all duration-300 hover:shadow-md"
                    >
                      <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">
                        ❌ {mistake.mistake}
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {mistake.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Best Practices */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-4">
                  Best Practices for Practical LP Applications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bestPractices.map((practice, index) => (
                    <div
                      key={`practice-${index}`}
                      className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500 transition-all duration-300 hover:shadow-md"
                    >
                      <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">
                        ✓ {practice.practice}
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {practice.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'applications' && (
            <>
              {/* Industry Selector */}
              <div className="flex flex-wrap gap-3 justify-center">
                {industryApplications.map((industry, index) => (
                  <button
                    key={`industry-btn-${index}`}
                    onClick={() => setSelectedIndustry(index)}
                    className={clsx(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2",
                      selectedIndustry === index
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    )}
                  &gt;
                    <span>{industry.icon}</span>
                    {industry.industry}
                  </button>
                ))}
              </div>

              {/* Industry Visualization */}
              <IndustryVisualization industry={selectedIndustry} />

              {/* Industry Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {industryApplications.map((industry, index) => (
                  index !== selectedIndustry && (
                    <div
                      key={`industry-summary-${index}`}
                      onClick={() => setSelectedIndustry(index)}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                    &gt;
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{industry.icon}</span>
                        <h5 className="font-semibold text-gray-800 dark:text-gray-200">
                          {industry.industry}
                        </h5>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                        {industry.description}
                      </p>
                      <div className="mt-2">
                        <span className="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded">
                          {industry.examples.length} applications
                        </span>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </>
          )}

          {activeTab === 'practice' && (
            <>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
                  Practice Problems - Real-World Applications
                </h3>
                
                <div className="space-y-6">
                  {/* Problem 1 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 1: Manufacturing Production Mix
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A furniture factory produces chairs and tables. The profit per chair is ₹500 and per table is ₹700.
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Resources available:
                      - 240 labor hours (3 hours/chair, 2 hours/table)
                      - 200 machine hours (4 hours/chair, 1 hour/table)
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Formulate and solve this LP problem graphically. What is the optimal production mix?
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-all duration-300">
                        Check Solution
                      </button>
                      <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300">
                        Show Hint
                      </button>
                    </div>
                  </div>

                  {/* Problem 2 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 2: Agricultural Crop Planning
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A farmer has 100 acres of land and wants to plant wheat and corn. Wheat yields ₹8,000/acre profit and corn yields ₹6,000/acre profit.
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Resources:
                      - Land: 100 acres
                      - Water: 240 acre-feet (wheat: 2 ac-ft/acre, corn: 3 ac-ft/acre)
                      - Labor: 80 hours (wheat: 0.5 hr/acre, corn: 1 hr/acre)
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Determine the optimal planting plan to maximize profit.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-all duration-300">
                        Check Solution
                      </button>
                      <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300">
                        Show Hint
                      </button>
                    </div>
                  </div>

                  {/* Problem 3 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 3: Healthcare Resource Allocation
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A hospital needs to allocate resources between inpatient and outpatient services.
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Resources:
                      - Doctors: 80 hours/day (inpatient: 2 hrs/patient, outpatient: 3 hrs/patient)
                      - Nurses: 40 hours/day (inpatient: 3 hrs/patient, outpatient: 1 hr/patient)
                      - Rooms: 32 (inpatient: 4 hrs/patient, outpatient: 1 hr/patient)
                      Profit: Inpatient = ₹10,000/patient, Outpatient = ₹8,000/patient
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Find the optimal number of each patient type to maximize profit.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-all duration-300">
                        Check Solution
                      </button>
                      <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300">
                        Show Hint
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips for Practice */}
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6 border border-indigo-200 dark:border-indigo-800">
                <h4 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-2">
                  💡 Tips for Solving Real-World LP Problems
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Identify all resources:</span> List every constraint that limits production or operations</li>
                  <li><span className="font-medium">Use accurate data:</span> Get precise numbers for costs, revenues, and resource requirements</li>
                  <li><span className="font-medium">Consider practical constraints:</span> Include integer requirements if needed</li>
                  <li><span className="font-medium">Validate the solution:</span> Check if the solution makes sense in the real-world context</li>
                  <li><span className="font-medium">Perform sensitivity analysis:</span> Understand how changes affect the solution</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Practical Applications of Graphical LP FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Practical Applications of Graphical LP"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic80_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="The practical applications of graphical LP are vast and varied. I've used LP in manufacturing, healthcare, and agriculture - each with its own unique challenges. The key lesson for students is that while the mathematical method is the same, the context and interpretation are different in each industry. I encourage students to think about how they would apply LP in their own fields of interest. Understanding the practical applications helps students see the value of LP beyond the classroom and prepares them for real-world problem-solving." />
        </div>
      </div>
    </div>
  );
};

export default Topic80;