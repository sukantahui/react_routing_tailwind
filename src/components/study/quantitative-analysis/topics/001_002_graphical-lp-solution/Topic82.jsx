import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic82_files/topic82_questions';
import noteText from './topic82_files/topic82_note.txt?raw';

const Topic82 = () => {
  const [activeTab, setActiveTab] = useState('concept');
  const [selectedMistake, setSelectedMistake] = useState(0);

  const tabs = [
    { id: 'concept', label: 'Common Mistakes' },
    { id: 'examples', label: 'Examples' },
    { id: 'practice', label: 'Practice' },
  ];

  // Common mistakes data
  const commonMistakes = [
    {
      id: 1,
      title: 'Rushing to Graph Without Understanding the Problem',
      icon: '🏃',
      description: 'Students often start graphing immediately without fully understanding what the problem is asking.',
      symptoms: [
        'Missing the objective function',
        'Using wrong variables',
        'Forgetting to identify what needs to be optimized'
      ],
      solution: 'Read the problem multiple times. Identify: What are we deciding? What is the goal? What limits us?',
      example: 'A student sees "maximize profit" and immediately starts graphing without identifying which products are involved.'
    },
    {
      id: 2,
      title: 'Misidentifying the Objective Function',
      icon: '🎯',
      description: 'Confusing what should be maximized with what should be minimized, or using wrong coefficients.',
      symptoms: [
        'Maximizing cost instead of profit',
        'Minimizing profit instead of cost',
        'Using incorrect per-unit values'
      ],
      solution: 'Carefully read what the problem asks. If it says "maximize profit," profit is the objective. If it says "minimize cost," cost is the objective.',
      example: 'A student maximizes cost (5x + 7y) when they should maximize profit (10x + 8y).'
    },
    {
      id: 3,
      title: 'Forgetting Non-Negativity Constraints',
      icon: '🔢',
      description: 'Students often forget to include x ≥ 0 and y ≥ 0, which restricts solutions to the first quadrant.',
      symptoms: [
        'Feasible region extends into negative quadrants',
        'Graph includes negative values',
        'Solutions with negative quantities'
      ],
      solution: 'Always include x ≥ 0 and y ≥ 0 at the end of your constraint list.',
      example: 'Graphing 2x + y ≤ 10 without x ≥ 0, y ≥ 0 allows negative values.'
    },
    {
      id: 4,
      title: 'Incorrectly Shading the Feasible Region',
      icon: '🎨',
      description: 'Shading the wrong side of a constraint line, leading to an incorrect feasible region.',
      symptoms: [
        'Feasible region is on the wrong side of a constraint',
        'Optimal solution violates a constraint',
        'No feasible region found'
      ],
      solution: 'Always test a point (usually the origin) to determine which side to shade.',
      example: 'For 2x + y ≤ 10, shading above the line instead of below.'
    },
    {
      id: 5,
      title: 'Missing Corner Points',
      icon: '📍',
      description: 'Failing to identify all corner points of the feasible region, especially those on axes.',
      symptoms: [
        'Optimal solution is at a missed corner point',
        'Suboptimal solution chosen',
        'Missing intersections with axes'
      ],
      solution: 'Systematically check all intersections: constraint-constraint, constraint-x-axis, constraint-y-axis.',
      example: 'Forgetting to check the point (0, y) on the y-axis.'
    },
    {
      id: 6,
      title: 'Not Verifying Feasibility of Corner Points',
      icon: '✅',
      description: 'Evaluating points that are not actually in the feasible region.',
      symptoms: [
        'Optimal solution violates a constraint',
        'Corner point from intersection of lines is outside feasible region',
        'Using points that don\'t satisfy all constraints'
      ],
      solution: 'Before evaluating, verify each point satisfies ALL constraints.',
      example: 'Point (40,60) at intersection of lines but violates machine constraint.'
    },
    {
      id: 7,
      title: 'Misinterpreting "≥" and "≤" Constraints',
      icon: '⚖️',
      description: 'Confusing which side to shade for greater-than versus less-than constraints.',
      symptoms: [
        'For ≥, shading below instead of above',
        'For ≤, shading above instead of below',
        'Feasible region is on the wrong side'
      ],
      solution: 'For ≤, shade below/beside the line. For ≥, shade above/beyond the line. Test a point to confirm.',
      example: 'For x + y ≥ 8, shading below the line instead of above.'
    },
    {
      id: 8,
      title: 'Ignoring Redundant Constraints',
      icon: '🗑️',
      description: 'Not recognizing when a constraint doesn\'t affect the feasible region.',
      symptoms: [
        'Feasible region looks the same without the constraint',
        'Constraint line never touches feasible region',
        'Wasting time graphing unnecessary constraints'
      ],
      solution: 'Graph all constraints but recognize when a constraint is redundant.',
      example: 'x ≤ 10 is redundant if x ≤ 5 is already a constraint.'
    },
    {
      id: 9,
      title: 'Misreading the Graph Scale',
      icon: '📏',
      description: 'Using incorrect scale on axes, leading to wrong intercepts and intersections.',
      symptoms: [
        'Incorrect corner point coordinates',
        'Wrong intercept values',
        'Inconsistent scaling between axes'
      ],
      solution: 'Use consistent scaling on both axes. Mark intercepts clearly.',
      example: 'Using 1 unit = 1 cm on x-axis and 1 unit = 2 cm on y-axis.'
    },
    {
      id: 10,
      title: 'Not Checking the Final Answer',
      icon: '🔍',
      description: 'Failing to verify that the optimal solution satisfies all constraints and makes sense.',
      symptoms: [
        'Solution violates a constraint',
        'Optimal solution is not feasible',
        'Objective value doesn\'t make sense'
      ],
      solution: 'Always substitute the optimal solution back into ALL constraints.',
      example: 'Finding (40,60) as optimal but not checking machine constraint: 4(40)+60=220 > 200.'
    }
  ];

  // Key concepts about mistakes
  const keyConcepts = [
    {
      title: 'Why Mistakes Happen',
      description: 'Common mistakes in graphical LP often stem from rushing, misunderstanding the problem, or forgetting key steps in the procedure.'
    },
    {
      title: 'Prevention Strategies',
      description: 'Following a systematic step-by-step approach, double-checking work, and verifying solutions can prevent most mistakes.'
    },
    {
      title: 'Learning from Mistakes',
      description: 'Mistakes are valuable learning opportunities. Understanding why a mistake occurs helps prevent it in the future.'
    },
    {
      title: 'Professional Practice',
      description: 'Even experienced professionals make mistakes. The key is having a systematic validation process to catch them.'
    }
  ];

  // Mistake categories
  const categories = [
    { name: 'Problem Understanding', count: 2, icon: '📖' },
    { name: 'Formulation', count: 3, icon: '✏️' },
    { name: 'Graphing', count: 3, icon: '📐' },
    { name: 'Verification', count: 2, icon: '✅' }
  ];

  // Visualization component for mistakes
  const MistakeVisualization = ({ mistakeIndex }) => {
    const mistake = commonMistakes[mistakeIndex];
    if (!mistake) return null;

    return (
      <div className="w-full max-w-4xl mx-auto my-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{mistake.icon}</span>
            <div>
              <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                Mistake {mistake.id}: {mistake.title}
              </h4>
            </div>
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
                
                {/* Mistake-specific visualization */}
                {mistakeIndex === 0 && (
                  <g>
                    {/* Confused scenario */}
                    <text x="250" y="100" textAnchor="middle" fontSize="14" fill="#FF4757">🤔</text>
                    <text x="250" y="130" textAnchor="middle" fontSize="12" fill="#666" className="dark:fill-gray-400">"I don't understand the problem!"</text>
                    <text x="250" y="155" textAnchor="middle" fontSize="11" fill="#666" className="dark:fill-gray-400">What are the variables?</text>
                    <text x="250" y="175" textAnchor="middle" fontSize="11" fill="#666" className="dark:fill-gray-400">What is the objective?</text>
                    <text x="250" y="195" textAnchor="middle" fontSize="11" fill="#666" className="dark:fill-gray-400">What are the constraints?</text>
                    <rect x="150" y="220" width="200" height="40" rx="10" fill="#FFE66D" opacity="0.3"/>
                    <text x="250" y="245" textAnchor="middle" fontSize="11" fill="#FF8A5C">READ. UNDERSTAND. THEN SOLVE.</text>
                  </g>
                )}
                {mistakeIndex === 1 && (
                  <g>
                    <line x1="50" y1="380" x2="350" y2="100" stroke="#4ECDC4" strokeWidth="2"/>
                    <text x="350" y="95" fontSize="10" fill="#4ECDC4">Maximize Cost? ❌</text>
                    <line x1="50" y1="400" x2="350" y2="80" stroke="#FF6B6B" strokeWidth="2" strokeDasharray="6,3"/>
                    <text x="350" y="75" fontSize="10" fill="#FF6B6B">Maximize Profit ✓</text>
                    <text x="250" y="250" textAnchor="middle" fontSize="12" fill="#666" className="dark:fill-gray-400">Correct vs. Incorrect</text>
                    <text x="250" y="275" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">Check what you're optimizing</text>
                  </g>
                )}
                {mistakeIndex === 2 && (
                  <g>
                    <line x1="50" y1="400" x2="350" y2="400" stroke="#FF6B6B" strokeWidth="2"/>
                    <line x1="50" y1="50" x2="350" y2="50" stroke="#FF6B6B" strokeWidth="2"/>
                    <text x="250" y="100" textAnchor="middle" fontSize="14" fill="#FF4757">✗</text>
                    <text x="250" y="130" textAnchor="middle" fontSize="12" fill="#666" className="dark:fill-gray-400">Negative values allowed</text>
                    <text x="250" y="155" textAnchor="middle" fontSize="12" fill="#4ECDC4">✓</text>
                    <text x="250" y="185" textAnchor="middle" fontSize="12" fill="#666" className="dark:fill-gray-400">Only first quadrant (x≥0, y≥0)</text>
                    <rect x="100" y="220" width="300" height="60" rx="10" fill="rgba(78, 205, 196, 0.2)" stroke="#4ECDC4" strokeWidth="1"/>
                    <text x="250" y="245" textAnchor="middle" fontSize="11" fill="#4ECDC4">Always include: x ≥ 0, y ≥ 0</text>
                    <text x="250" y="265" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">Restricts solutions to real-world quantities</text>
                  </g>
                )}
                {mistakeIndex === 3 && (
                  <g>
                    <line x1="50" y1="380" x2="450" y2="80" stroke="#4ECDC4" strokeWidth="2"/>
                    <polygon points="50,400 50,380 450,80 450,400" fill="rgba(78, 205, 196, 0.2)" stroke="none"/>
                    <text x="400" y="75" fontSize="10" fill="#4ECDC4">Correct: Shade below</text>
                    <polygon points="50,30 450,30 450,80 50,380" fill="rgba(255, 107, 107, 0.2)" stroke="none"/>
                    <text x="400" y="45" fontSize="10" fill="#FF6B6B">Incorrect: Shade above</text>
                    <text x="250" y="250" textAnchor="middle" fontSize="12" fill="#666" className="dark:fill-gray-400">Test a point to verify shading</text>
                    <circle cx="50" cy="400" r="5" fill="#FF4757"/>
                    <text x="65" y="405" fontSize="10" fill="#FF4757">Test (0,0)</text>
                  </g>
                )}
                {mistakeIndex === 4 && (
                  <g>
                    <line x1="50" y1="380" x2="450" y2="80" stroke="#FF6B6B" strokeWidth="2"/>
                    <line x1="50" y1="350" x2="450" y2="150" stroke="#4ECDC4" strokeWidth="2"/>
                    <circle cx="200" cy="200" r="8" fill="#FF4757"/>
                    <circle cx="350" cy="130" r="8" fill="#FFE66D"/>
                    <text x="200" y="190" textAnchor="middle" fontSize="10" fill="#FF4757">Found ✓</text>
                    <text x="350" y="120" textAnchor="middle" fontSize="10" fill="#FFE66D">Missed! ✗</text>
                    <text x="250" y="300" textAnchor="middle" fontSize="12" fill="#666" className="dark:fill-gray-400">Check all intersections</text>
                    <text x="250" y="320" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">Include axes intersections</text>
                  </g>
                )}
                {mistakeIndex === 5 && (
                  <g>
                    <line x1="50" y1="380" x2="450" y2="80" stroke="#FF6B6B" strokeWidth="2"/>
                    <line x1="50" y1="350" x2="450" y2="150" stroke="#4ECDC4" strokeWidth="2"/>
                    <line x1="100" y1="400" x2="400" y2="130" stroke="#FFE66D" strokeWidth="2"/>
                    <circle cx="250" cy="220" r="10" fill="#FF4757">
                      <animate attributeName="r" values="10;14;10" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                    <text x="250" y="210" textAnchor="middle" fontSize="10" fill="#FF4757">(40,60)</text>
                    <text x="250" y="240" textAnchor="middle" fontSize="9" fill="#FF6B6B">Violates constraint!</text>
                    <text x="250" y="320" textAnchor="middle" fontSize="12" fill="#666" className="dark:fill-gray-400">Verify each corner point</text>
                    <text x="250" y="340" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">Check all constraints</text>
                  </g>
                )}
                {mistakeIndex === 6 && (
                  <g>
                    <line x1="50" y1="380" x2="450" y2="80" stroke="#FF6B6B" strokeWidth="2"/>
                    <polygon points="50,400 50,380 450,80 450,400" fill="rgba(78, 205, 196, 0.2)" stroke="none"/>
                    <text x="400" y="75" fontSize="10" fill="#4ECDC4">≤: Shade below ✓</text>
                    <line x1="50" y1="350" x2="450" y2="150" stroke="#FFE66D" strokeWidth="2"/>
                    <polygon points="50,30 450,30 450,150 50,350" fill="rgba(255, 107, 107, 0.2)" stroke="none"/>
                    <text x="400" y="145" fontSize="10" fill="#FF6B6B">≥: Shade above ✓</text>
                    <text x="250" y="300" textAnchor="middle" fontSize="12" fill="#666" className="dark:fill-gray-400">Remember: ≤ = below, ≥ = above</text>
                  </g>
                )}
                {mistakeIndex === 7 && (
                  <g>
                    <line x1="50" y1="380" x2="450" y2="80" stroke="#4ECDC4" strokeWidth="2"/>
                    <line x1="50" y1="350" x2="450" y2="150" stroke="#4ECDC4" strokeWidth="2" strokeDasharray="6,3" opacity="0.5"/>
                    <text x="400" y="75" fontSize="10" fill="#4ECDC4">Active Constraint</text>
                    <text x="400" y="145" fontSize="10" fill="#A8E6CF" opacity="0.5">Redundant Constraint</text>
                    <polygon points="50,400 50,380 450,80 450,400" fill="rgba(78, 205, 196, 0.2)" stroke="none"/>
                    <text x="250" y="300" textAnchor="middle" fontSize="12" fill="#666" className="dark:fill-gray-400">Some constraints don't affect the region</text>
                    <text x="250" y="320" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">Identify redundant constraints</text>
                  </g>
                )}
                {mistakeIndex === 8 && (
                  <g>
                    <line x1="50" y1="350" x2="450" y2="50" stroke="#FF6B6B" strokeWidth="2"/>
                    <line x1="50" y1="380" x2="450" y2="80" stroke="#4ECDC4" strokeWidth="2"/>
                    <text x="430" y="45" fontSize="10" fill="#FF6B6B">Wrong scale</text>
                    <text x="430" y="75" fontSize="10" fill="#4ECDC4">Correct scale</text>
                    <line x1="100" y1="400" x2="100" y2="30" stroke="#FFE66D" strokeWidth="1" strokeDasharray="4,4"/>
                    <line x1="200" y1="400" x2="200" y2="30" stroke="#FFE66D" strokeWidth="1" strokeDasharray="4,4"/>
                    <line x1="300" y1="400" x2="300" y2="30" stroke="#FFE66D" strokeWidth="1" strokeDasharray="4,4"/>
                    <text x="250" y="300" textAnchor="middle" fontSize="12" fill="#666" className="dark:fill-gray-400">Use consistent scaling</text>
                    <text x="250" y="320" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">Both axes should use the same unit</text>
                  </g>
                )}
                {mistakeIndex === 9 && (
                  <g>
                    <line x1="50" y1="380" x2="450" y2="80" stroke="#4ECDC4" strokeWidth="2"/>
                    <circle cx="250" cy="220" r="10" fill="#FF4757">
                      <animate attributeName="r" values="10;14;10" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                    <text x="250" y="210" textAnchor="middle" fontSize="10" fill="#FF4757">Check me!</text>
                    <rect x="150" y="250" width="200" height="50" rx="10" fill="rgba(78, 205, 196, 0.2)" stroke="#4ECDC4" strokeWidth="1"/>
                    <text x="250" y="270" textAnchor="middle" fontSize="11" fill="#4ECDC4">Always Verify!</text>
                    <text x="250" y="290" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">Substitute back into all constraints</text>
                  </g>
                )}
                
                {/* Legend */}
                <g transform="translate(50, 10)">
                  <rect x="0" y="0" width="180" height="60" rx="5" fill="white" stroke="#ddd" strokeWidth="1" className="dark:fill-gray-700 dark:stroke-gray-600"/>
                  <text x="10" y="20" fontSize="12" fontWeight="bold" fill="#333" className="dark:fill-gray-300">Legend</text>
                  <text x="10" y="45" fontSize="10" fill="#FF6B6B">✗ Incorrect</text>
                  <text x="100" y="45" fontSize="10" fill="#4ECDC4">✓ Correct</text>
                </g>
              </svg>
            </div>
            
            {/* Details Panel */}
            <div className="space-y-4">
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500">
                <h5 className="font-semibold text-red-700 dark:text-red-400 mb-2">Description</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {mistake.description}
                </p>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                <h5 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Symptoms</h5>
                <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  {mistake.symptoms.map((symptom, idx) => (
                    <li key={`symptom-${idx}`}>{symptom}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                <h5 className="font-semibold text-green-700 dark:text-green-400 mb-2">Solution</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {mistake.solution}
                </p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Example</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                  {mistake.example}
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
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-all duration-300">
            Common Mistakes in Graphical LP
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn to identify and avoid the most common errors students make when solving 
            linear programming problems graphically.
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
                  ? "bg-red-500 text-white shadow-lg shadow-red-200 dark:shadow-red-900/30"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'concept' && (
            <>
              {/* Mistake Categories */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
                  Categories of Common Mistakes
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categories.map((category, index) => (
                    <div
                      key={`category-${index}`}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                    >
                      <div className="text-4xl mb-2">{category.icon}</div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                        {category.name}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {category.count} common mistakes
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Concepts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {keyConcepts.map((concept, index) => (
                  <div
                    key={`concept-${index}`}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-l-4 border-red-500"
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

              {/* Mistakes List */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
                  The 10 Most Common Mistakes
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {commonMistakes.map((mistake) => (
                    <div
                      key={`mistake-${mistake.id}`}
                      onClick={() => setSelectedMistake(mistake.id - 1)}
                      className={clsx(
                        "bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02]",
                        selectedMistake === mistake.id - 1 ? "border-2 border-red-500" : ""
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{mistake.icon}</span>
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                            {mistake.id}. {mistake.title}
                          </h4>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                        {mistake.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prevention Checklist */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  ✅ Prevention Checklist
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Read and understand the problem fully</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">List all variables and constraints clearly</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Always include non-negativity constraints</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Test a point to verify shading direction</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Find ALL corner points systematically</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Verify each corner point satisfies ALL constraints</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Use consistent scaling on both axes</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Check the final answer in the original problem</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'examples' && (
            <>
              {/* Mistake Selector */}
              <div className="flex flex-wrap gap-3 justify-center">
                {commonMistakes.map((mistake) => (
                  <button
                    key={`mistake-btn-${mistake.id}`}
                    onClick={() => setSelectedMistake(mistake.id - 1)}
                    className={clsx(
                      "px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 flex items-center gap-1",
                      selectedMistake === mistake.id - 1
                        ? "bg-red-500 text-white shadow-lg shadow-red-200 dark:shadow-red-900/30"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    )}
                  >
                    <span>{mistake.icon}</span>
                    {mistake.id}
                  </button>
                ))}
              </div>

              {/* Mistake Visualization */}
              <MistakeVisualization mistakeIndex={selectedMistake} />

              {/* Mistake Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {commonMistakes.map((mistake, index) => (
                  index !== selectedMistake && (
                    <div
                      key={`mistake-summary-${index}`}
                      onClick={() => setSelectedMistake(index)}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{mistake.icon}</span>
                        <h5 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                          {mistake.id}. {mistake.title}
                        </h5>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                        {mistake.description}
                      </p>
                      <div className="mt-2">
                        <span className="text-xs px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded">
                          Common Mistake
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
                  Practice Problems - Identifying Mistakes
                </h3>
                
                <div className="space-y-6">
                  {/* Problem 1 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 1: Find the Mistake
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A student solved this LP problem but made a mistake:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Problem: Maximize Z = 5x + 3y
                      Constraints: 2x + y ≤ 10, x + 2y ≤ 8, x, y ≥ 0
                      
                      Student's solution:
                      Corner points: (0,0), (5,0), (0,4)
                      Z(0,0) = 0, Z(5,0) = 25, Z(0,4) = 12
                      Optimal: (5,0) with Z = 25
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      What mistake did the student make?
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-all duration-300">
                        Check Solution
                      </button>
                      <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300">
                        Show Hint
                      </button>
                    </div>
                    <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-semibold">Hint:</span> Check if the student found ALL corner points.
                    </div>
                  </div>

                  {/* Problem 2 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 2: Identify the Error
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A student graphed the constraint 3x + 2y ≤ 12 and shaded the region above the line.
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      What is the error, and what should they have done?
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-all duration-300">
                        Check Solution
                      </button>
                      <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300">
                        Show Hint
                      </button>
                    </div>
                    <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-semibold">Hint:</span> Test a point like (0,0) to determine the correct side.
                    </div>
                  </div>

                  {/* Problem 3 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 3: Multiple Mistakes
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A student's solution to a maximization problem is:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Max Z = 4x + 5y
                      Constraints: x + y ≤ 8, 2x + y ≤ 12, x, y ≥ 0
                      
                      Student work:
                      - Graphed only x + y = 8 and 2x + y = 12
                      - Found corner points: (0,8), (4,4), (6,0)
                      - Z(0,8) = 40, Z(4,4) = 36, Z(6,0) = 24
                      - Optimal: (0,8) with Z = 40
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Identify ALL mistakes the student made.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-all duration-300">
                        Check Solution
                      </button>
                      <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300">
                        Show Hint
                      </button>
                    </div>
                    <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-semibold">Hint:</span> Consider the origin as a corner point and check if all corner points were found.
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips for Avoiding Mistakes */}
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
                <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">
                  💡 Tips for Avoiding Common Mistakes
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Take your time:</span> Rushing leads to errors. Follow the step-by-step procedure.</li>
                  <li><span className="font-medium">Write everything down:</span> Document variables, constraints, and calculations.</li>
                  <li><span className="font-medium">Double-check your graph:</span> Verify intercepts and shading direction.</li>
                  <li><span className="font-medium">Systematically find corner points:</span> Check all intersections.</li>
                  <li><span className="font-medium">Always verify your solution:</span> Substitute back into all constraints.</li>
                  <li><span className="font-medium">Learn from mistakes:</span> Understanding why a mistake happens prevents repetition.</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Common Mistakes in Graphical LP FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Common Mistakes in Graphical LP"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic82_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Understanding common mistakes is one of the most effective learning strategies I've found. When students see the mistakes others make, they become more aware of their own potential errors. I often tell my students: 'The smartest people aren't those who never make mistakes - they're those who learn from them.' I encourage students to create their own 'mistake checklist' based on these common errors and review it before submitting any LP solution. This proactive approach dramatically reduces errors and improves accuracy." />
        </div>
      </div>
    </div>
  );
};

export default Topic82;