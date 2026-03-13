import { useState, useEffect } from 'react';
import clsx from 'clsx';

const Topic17 = () => {
    const [isReducedMotion, setIsReducedMotion] = useState(false);
    const [activeTab, setActiveTab] = useState('benefits');
    const [showComparison, setShowComparison] = useState(false);
    const [selectedExample, setSelectedExample] = useState('good');

    // Check for reduced motion preference
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setIsReducedMotion(mediaQuery.matches);

        const handleChange = (e) => setIsReducedMotion(e.matches);
        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const animationClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_forwards]';

    // Examples
    const componentExamples = {
        good: {
            title: "✅ Good: One Component Per File",
            files: [
                { name: "Button.jsx", content: "Primary reusable button component" },
                { name: "Card.jsx", content: "Card container with consistent styling" },
                { name: "Modal.jsx", content: "Popup modal with backdrop" },
                { name: "UserProfile.jsx", content: "Complete user profile display" }
            ],
            imports: `// Clean, focused imports
import Button from './Button';
import Card from './Card';
import UserProfile from './UserProfile';`
        },
        bad: {
            title: "❌ Bad: Multiple Components Per File",
            files: [
                { name: "UIComponents.jsx", content: "Contains Button, Input, Modal, Card, etc." },
                { name: "UserComponents.jsx", content: "Contains Profile, Settings, Dashboard widgets" },
                { name: "Forms.jsx", content: "Contains LoginForm, RegisterForm, ContactForm" }
            ],
            imports: `// Messy, ambiguous imports
import { Button, Input, Modal } from './UIComponents';
import { Profile, Settings } from './UserComponents';`
        }
    };

    // Exception examples
    const exceptionExamples = [
        {
            scenario: "Related Helper Components",
            example: "Modal + ModalHeader + ModalBody + ModalFooter",
            rule: "Small, tightly coupled components used together",
            condition: "All are under 50 lines, used only with parent"
        },
        {
            scenario: "Component Variants",
            example: "Button + PrimaryButton + SecondaryButton + IconButton",
            rule: "Variations of the same base component",
            condition: "Share most logic, differ only in styling/props"
        },
        {
            scenario: "Storybook/Test Files",
            example: "Component + Component.stories.jsx + Component.test.jsx",
            rule: "Documentation and testing files",
            condition: "Separate concerns but related functionality"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 p-6 md:p-8">
            {/* Header Section */}
            <header className="max-w-6xl mx-auto mb-12">
                <div className={`${animationClass} opacity-0`}>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">
                        One Component Per File: Best Practices
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                        The golden rule for maintainable, scalable React applications
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
                        <span className="text-lg">🏆</span>
                        <span className="font-medium">Professional Standard - Industry best practice</span>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto">
                {/* Core Principle */}
                <section className={`mb-12 ${animationClass} opacity-0`}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                        <h2 className="text-3xl font-bold mb-6 text-emerald-700 dark:text-emerald-300 flex items-center gap-3">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                            The Single Responsibility Principle in React
                        </h2>

                        <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 p-6 rounded-xl">
                                    <h3 className="text-xl font-bold mb-3 text-emerald-800 dark:text-emerald-300">
                                        What Does "One Component Per File" Mean?
                                    </h3>
                                    <p className="mb-4">
                                        Each .jsx/.tsx file contains exactly <strong>one default-exported React component</strong>,
                                        along with its:
                                    </p>
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3"></span>
                                            <span>Private helper functions</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3"></span>
                                            <span>Component-specific styles</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3"></span>
                                            <span>Type definitions (if using TypeScript)</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3"></span>
                                            <span>Constants used only by this component</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 p-6 rounded-xl">
                                    <h3 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-300">
                                        Real-World Analogy: Barrackpore Library System
                                    </h3>
                                    <p className="mb-4">
                                        Think of each component file as a <strong>book</strong> in Barrackpore Public Library:
                                    </p>
                                    <div className="space-y-3">
                                        <div className="flex items-center">
                                            <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                                                <span className="text-blue-600 dark:text-blue-400">📘</span>
                                            </span>
                                            <span>One book = One component file</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                                                <span className="text-blue-600 dark:text-blue-400">🏷️</span>
                                            </span>
                                            <span>Clear title = Descriptive component name</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                                                <span className="text-blue-600 dark:text-blue-400">📚</span>
                                            </span>
                                            <span>Bookshelf = Component folder</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                                                <span className="text-blue-600 dark:text-blue-400">🔍</span>
                                            </span>
                                            <span>Easy to find = Easy to import</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 p-6 rounded-xl border-l-4 border-purple-500">
                                <h3 className="text-xl font-bold mb-3 text-purple-800 dark:text-purple-300">
                                    Why This Matters for Local Developers
                                </h3>
                                <p>
                                    When <strong>Swadeep</strong> from Barrackpore and <strong>Tuhina</strong> from Ichapur collaborate:
                                </p>
                                <ul className="mt-3 space-y-2 pl-5">
                                    <li className="flex items-start">
                                        <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></span>
                                        <span>They don't need to search through 500-line files</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></span>
                                        <span>Git conflicts are minimized (editing different files)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></span>
                                        <span>Code reviews focus on one component at a time</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></span>
                                        <span>Testing and debugging become straightforward</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits vs Problems */}
                <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[100ms]`}>
                    <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-300">
                                Benefits vs Problems
                            </h2>

                            <div className="flex space-x-2">
                                {['benefits', 'problems'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={clsx(
                                            'px-4 py-2 rounded-lg font-medium transition-all duration-300 capitalize',
                                            activeTab === tab
                                                ? tab === 'benefits'
                                                    ? 'bg-green-600 text-white'
                                                    : 'bg-red-600 text-white'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                                        )}
                                    >
                                        {tab === 'benefits' ? '✅ Benefits' : '❌ Problems'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            {activeTab === 'benefits' ? (
                                <div className="grid md:grid-cols-2 gap-6">
                                    {[
                                        {
                                            title: "Better Organization",
                                            description: "Components are easy to find and navigate",
                                            example: "Swadeep finds UserProfile.jsx instantly",
                                            icon: "🗂️",
                                            color: "from-blue-500 to-cyan-500"
                                        },
                                        {
                                            title: "Easier Testing",
                                            description: "Test files map 1:1 with component files",
                                            example: "UserProfile.jsx → UserProfile.test.jsx",
                                            icon: "🧪",
                                            color: "from-green-500 to-emerald-500"
                                        },
                                        {
                                            title: "Reduced Git Conflicts",
                                            description: "Developers work on different files",
                                            example: "Abhronila edits Button.jsx, Debangshu edits Card.jsx",
                                            icon: "🤝",
                                            color: "from-purple-500 to-pink-500"
                                        },
                                        {
                                            title: "Improved Performance",
                                            description: "Code splitting imports only what's needed",
                                            example: "Lazy loading individual components",
                                            icon: "⚡",
                                            color: "from-orange-500 to-red-500"
                                        }
                                    ].map((item, index) => (
                                        <div
                                            key={index}
                                            className={clsx(
                                                "bg-gradient-to-br p-6 rounded-xl text-white transform hover:scale-[1.02] transition-all duration-300",
                                                `hover:shadow-2xl ${item.color}`,
                                                isReducedMotion ? '' : 'motion-safe:hover:-translate-y-1'
                                            )}
                                        >
                                            <div className="text-3xl mb-4">{item.icon}</div>
                                            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                            <p className="mb-4 opacity-90">{item.description}</p>
                                            <div className="text-sm bg-white/20 p-2 rounded">
                                                <span className="font-semibold">Example:</span> {item.example}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid md:grid-cols-2 gap-6">
                                    {[
                                        {
                                            problem: "Mega-Files",
                                            description: "Single files with 10+ components become unmaintainable",
                                            impact: "Tuhina spends hours finding the right component",
                                            icon: "📦",
                                            color: "border-red-500 bg-red-50 dark:bg-red-900/10"
                                        },
                                        {
                                            problem: "Import Confusion",
                                            description: "Named imports from large files cause mistakes",
                                            impact: "Wrong component imported due to similar names",
                                            icon: "🔀",
                                            color: "border-orange-500 bg-orange-50 dark:bg-orange-900/10"
                                        },
                                        {
                                            problem: "Testing Nightmares",
                                            description: "Hard to test components in isolation",
                                            impact: "Tests break when unrelated components change",
                                            icon: "🧪",
                                            color: "border-amber-500 bg-amber-50 dark:bg-amber-900/10"
                                        },
                                        {
                                            problem: "Bundle Bloat",
                                            description: "Importing one component brings in many unused ones",
                                            impact: "Slower app performance, larger bundle size",
                                            icon: "🐌",
                                            color: "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10"
                                        }
                                    ].map((item, index) => (
                                        <div
                                            key={index}
                                            className={clsx(
                                                "border-l-4 p-6 rounded-r-xl",
                                                item.color
                                            )}
                                        >
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="text-2xl">{item.icon}</span>
                                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{item.problem}</h3>
                                            </div>
                                            <p className="text-gray-700 dark:text-gray-300 mb-3">{item.description}</p>
                                            <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                                <p className="text-sm">
                                                    <span className="font-semibold">Impact:</span> {item.impact}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 p-6 rounded-xl">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-xl font-bold mb-2 text-amber-800 dark:text-amber-300">
                                            Want to see the comparison?
                                        </h4>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            See how imports differ between single and multi-component files
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setShowComparison(!showComparison)}
                                        className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-lg transition-all duration-300"
                                    >
                                        {showComparison ? 'Hide Comparison' : 'Show Comparison'}
                                    </button>
                                </div>

                                {showComparison && (
                                    <div className="mt-6 grid md:grid-cols-2 gap-6">
                                        <div className="bg-gray-900 text-gray-100 p-6 rounded-xl">
                                            <h5 className="font-bold mb-3 text-green-400">Single Component Files</h5>
                                            <pre className="text-sm">
                                                {`// Clean, predictable imports
import Button from './Button';
import Card from './Card';
import Modal from './Modal';

// Easy to understand
<Button />
<Card>
  <Modal />
</Card>`}
                                            </pre>
                                        </div>
                                        <div className="bg-gray-900 text-gray-100 p-6 rounded-xl">
                                            <h5 className="font-bold mb-3 text-red-400">Multi-Component Files</h5>
                                            <pre className="text-sm">
                                                {`// Confusing, ambiguous imports
import { 
  Button, 
  PrimaryButton,
  SecondaryButton 
} from './Buttons';

import { 
  Modal, 
  Dialog, 
  Popup 
} from './Modals';

// What's the difference?
<Button />  // Which button?
<Modal />   // Which modal?`}
                                            </pre>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Good vs Bad Examples */}
                <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[200ms]`}>
                    <h2 className="text-3xl font-bold mb-8 text-blue-700 dark:text-blue-300">
                        Good vs Bad Examples
                    </h2>

                    <div className="space-y-8">
                        {/* Example Selection */}
                        <div className="grid grid-cols-2 gap-4">
                            {['good', 'bad'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setSelectedExample(type)}
                                    className={clsx(
                                        'p-4 rounded-xl text-center transition-all duration-300',
                                        selectedExample === type
                                            ? type === 'good'
                                                ? 'bg-green-600 text-white transform scale-105'
                                                : 'bg-red-600 text-white transform scale-105'
                                            : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    )}
                                >
                                    <div className="font-bold text-lg">{componentExamples[type].title}</div>
                                </button>
                            ))}
                        </div>

                        {/* Example Details */}
                        <div className={clsx(
                            "rounded-2xl p-8 shadow-lg",
                            selectedExample === 'good'
                                ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10"
                                : "bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/10 dark:to-pink-900/10"
                        )}>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                                        File Structure
                                    </h3>

                                    <div className="space-y-3">
                                        {componentExamples[selectedExample].files.map((file, index) => (
                                            <div
                                                key={index}
                                                className={clsx(
                                                    "p-4 rounded-lg transform hover:scale-[1.02] transition-all duration-300",
                                                    selectedExample === 'good'
                                                        ? "bg-white dark:bg-gray-800 border border-green-200 dark:border-green-800"
                                                        : "bg-white dark:bg-gray-800 border border-red-200 dark:border-red-800"
                                                )}
                                            >
                                                <div className="font-mono font-bold mb-1">{file.name}</div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">{file.content}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                                        Import Usage
                                    </h3>

                                    <div className="bg-gray-900 text-gray-100 p-6 rounded-xl mb-6">
                                        <pre className="text-sm">{componentExamples[selectedExample].imports}</pre>
                                    </div>

                                    <div className={clsx(
                                        "p-4 rounded-lg",
                                        selectedExample === 'good'
                                            ? "bg-green-50 dark:bg-green-900/20"
                                            : "bg-red-50 dark:bg-red-900/20"
                                    )}>
                                        <h4 className="font-bold mb-2">
                                            {selectedExample === 'good' ? '✅ Advantages:' : '❌ Disadvantages:'}
                                        </h4>
                                        <ul className="text-sm space-y-2">
                                            {selectedExample === 'good' ? (
                                                <>
                                                    <li className="flex items-start">
                                                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-1 mr-2"></span>
                                                        <span>Clear file purpose</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-1 mr-2"></span>
                                                        <span>Easy to find and navigate</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-1 mr-2"></span>
                                                        <span>Minimal Git conflicts</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-1 mr-2"></span>
                                                        <span>Better code splitting</span>
                                                    </li>
                                                </>
                                            ) : (
                                                <>
                                                    <li className="flex items-start">
                                                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-1 mr-2"></span>
                                                        <span>Hard to find specific components</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-1 mr-2"></span>
                                                        <span>Import confusion and mistakes</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-1 mr-2"></span>
                                                        <span>Frequent Git merge conflicts</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-1 mr-2"></span>
                                                        <span>Bundle includes unused code</span>
                                                    </li>
                                                </>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl">
                                <h4 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                                    {selectedExample === 'good' ? 'Local Success Story' : 'Local Pain Point'}
                                </h4>
                                <p className="text-gray-700 dark:text-gray-300">
                                    {selectedExample === 'good'
                                        ? "When Swadeep from Barrackpore adopted one-component-per-file, his team's productivity increased by 40%. New developers like Abhronila from Naihati could contribute within hours, not days."
                                        : "A Shyamnagar startup used multi-component files. When Tuhina joined, she spent 2 weeks just understanding the codebase. Simple bug fixes took days instead of hours."
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Exceptions to the Rule */}
                <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[300ms]`}>
                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 rounded-2xl p-8 shadow-lg">
                        <h2 className="text-3xl font-bold mb-6 text-purple-700 dark:text-purple-300">
                            Exceptions to the Rule (When It's OK to Break It)
                        </h2>
                        <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
                            Like all good rules, there are sensible exceptions. But use them sparingly!
                        </p>

                        <div className="grid md:grid-cols-3 gap-6">
                            {exceptionExamples.map((exception, index) => (
                                <div
                                    key={index}
                                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                                >
                                    <div className="text-2xl mb-4 text-purple-600 dark:text-purple-400">
                                        {index === 0 && "🔗"}
                                        {index === 1 && "🎨"}
                                        {index === 2 && "📖"}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                                        {exception.scenario}
                                    </h3>
                                    <div className="mb-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                        <code className="font-mono text-sm">{exception.example}</code>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                        <strong>Rule:</strong> {exception.rule}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-500">
                                        <strong>Condition:</strong> {exception.condition}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/10 dark:to-yellow-900/10 p-6 rounded-xl">
                            <h4 className="text-xl font-bold mb-3 text-amber-800 dark:text-amber-300">
                                How to Handle Exceptions: The Ichapur College Website Example
                            </h4>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <h5 className="font-bold mb-2 text-green-600 dark:text-green-400">Acceptable Exception</h5>
                                    <div className="font-mono text-sm bg-gray-900 text-gray-100 p-3 rounded">
                                        {`// Modal.jsx - Small related components
function Modal({ children }) { /* ... */ }
function ModalHeader({ children }) { /* ... */ }
function ModalBody({ children }) { /* ... */ }
function ModalFooter({ children }) { /* ... */ }

export default Modal;
export { ModalHeader, ModalBody, ModalFooter };`}
                                    </div>
                                    <p className="text-xs mt-2 text-gray-600 dark:text-gray-400">
                                        All components under 30 lines, used only together
                                    </p>
                                </div>

                                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <h5 className="font-bold mb-2 text-red-600 dark:text-red-400">Not Acceptable</h5>
                                    <div className="font-mono text-sm bg-gray-900 text-gray-100 p-3 rounded">
                                        {`// UIComponents.jsx - DON'T DO THIS!
function Button() { /* ... */ }
function Input() { /* ... */ }
function Card() { /* ... */ }
function Modal() { /* ... */ }
// 10 more unrelated components...`}
                                    </div>
                                    <p className="text-xs mt-2 text-gray-600 dark:text-gray-400">
                                        Unrelated components in one file - creates maintenance hell
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Implementation Guidelines */}
                <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[400ms]`}>
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-2xl p-8 shadow-lg">
                        <h2 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-300">
                            Practical Implementation Guidelines
                        </h2>

                        <div className="space-y-8">
                            {/* Step-by-Step Guide */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                                    Step-by-Step: Creating a New Component
                                </h3>

                                <div className="space-y-4">
                                    {[
                                        {
                                            step: 1,
                                            action: "Create the file",
                                            code: "touch src/components/UserProfileCard.jsx",
                                            tip: "Use PascalCase matching component name"
                                        },
                                        {
                                            step: 2,
                                            action: "Write single component",
                                            code: "function UserProfileCard() {\n  return (\n    // JSX here\n  );\n}",
                                            tip: "Only one default export per file"
                                        },
                                        {
                                            step: 3,
                                            action: "Add related helpers",
                                            code: "// Helper functions used ONLY by this component\nfunction formatUserData(user) { /* ... */ }",
                                            tip: "Keep helpers private to component"
                                        },
                                        {
                                            step: 4,
                                            action: "Export component",
                                            code: "export default UserProfileCard;",
                                            tip: "Default export for single component"
                                        },
                                        {
                                            step: 5,
                                            action: "Create barrel file",
                                            code: "// index.js in folder\nexport { default as UserProfileCard } from './UserProfileCard';",
                                            tip: "Optional but recommended for clean imports"
                                        }
                                    ].map((item) => (
                                        <div
                                            key={item.step}
                                            className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
                                        >
                                            <div className="flex-shrink-0">
                                                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                                                    {item.step}
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold mb-2">{item.action}</h4>
                                                <div className="bg-gray-900 text-gray-100 p-3 rounded mb-2">
                                                    <pre className="text-sm">{item.code}</pre>
                                                </div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    💡 {item.tip}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Folder Structure Example */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                                    Ideal Folder Structure for Naihati Projects
                                </h3>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <div className="font-mono text-sm bg-gray-900 text-gray-100 p-4 rounded-lg">
                                            <div className="text-emerald-400">src/</div>
                                            <div className="ml-4 text-emerald-400">components/</div>
                                            <div className="ml-8 text-cyan-400">common/</div>
                                            <div className="ml-12">Button.jsx</div>
                                            <div className="ml-12">Input.jsx</div>
                                            <div className="ml-12">Card.jsx</div>
                                            <div className="ml-8 text-cyan-400">features/</div>
                                            <div className="ml-12">auth/</div>
                                            <div className="ml-16">LoginForm.jsx</div>
                                            <div className="ml-16">RegisterForm.jsx</div>
                                            <div className="ml-12">dashboard/</div>
                                            <div className="ml-16">StatsCard.jsx</div>
                                            <div className="ml-16">Chart.jsx</div>
                                            <div className="ml-8 text-amber-400">index.js ← Barrel file</div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                            <h4 className="font-bold mb-2 text-green-800 dark:text-green-300">Key Benefits</h4>
                                            <ul className="text-sm space-y-2">
                                                <li className="flex items-start">
                                                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-1 mr-2"></span>
                                                    <span>Each component in its own file</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-1 mr-2"></span>
                                                    <span>Logical grouping by feature</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-1 mr-2"></span>
                                                    <span>Clean imports via barrel files</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-1 mr-2"></span>
                                                    <span>Easy to scale and maintain</span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                            <h4 className="font-bold mb-2 text-blue-800 dark:text-blue-300">Import Example</h4>
                                            <div className="bg-gray-900 text-gray-100 p-3 rounded">
                                                <pre className="text-sm">
                                                    {`// Clean imports from barrel file
import { 
  Button, 
  Input, 
  Card 
} from '@/components';

import { 
  LoginForm, 
  RegisterForm 
} from '@/features/auth';`}
                                                </pre>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Common Pitfalls */}
                <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[500ms]`}>
                    <h2 className="text-3xl font-bold mb-6 text-red-700 dark:text-red-300">
                        Common Pitfalls & How to Avoid Them
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                pitfall: "Creating 'Utils.jsx' Files",
                                problem: "Putting multiple small components in a utility file",
                                solution: "Each component, no matter how small, gets its own file",
                                example: "IconButton.jsx (15 lines) is better than Utils.jsx (300 lines)"
                            },
                            {
                                pitfall: "Overusing Named Exports",
                                problem: "Exporting multiple components from one file",
                                solution: "Use default exports, named only for truly related components",
                                example: "Modal.jsx exports Modal, ModalHeader, ModalBody (related)"
                            },
                            {
                                pitfall: "Ignoring File Size",
                                problem: "Letting component files grow beyond 200-300 lines",
                                solution: "Break large components into smaller, composed components",
                                example: "UserProfile.jsx (200 lines) → UserHeader.jsx + UserBio.jsx + UserStats.jsx"
                            },
                            {
                                pitfall: "Forgetting Barrel Files",
                                problem: "Messy imports with long relative paths",
                                solution: "Create index.js barrel files in each folder",
                                example: "import { Button } from './components/common' not from './components/common/Button'"
                            }
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 border border-red-200 dark:border-red-800 rounded-xl p-5 hover:shadow-md transition-all duration-300"
                            >
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="flex-shrink-0 w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                                        <span className="text-red-600 dark:text-red-400 font-bold">⚠️</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-800 dark:text-gray-200">{item.pitfall}</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.problem}</p>
                                    </div>
                                </div>

                                <div className="mb-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                    <p className="font-semibold text-green-700 dark:text-green-300">Solution: {item.solution}</p>
                                </div>

                                <div className="bg-gray-900 text-gray-100 p-3 rounded-lg">
                                    <code className="text-sm">{item.example}</code>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-6 rounded-xl">
                        <h4 className="text-xl font-bold mb-3 text-purple-800 dark:text-purple-300">
                            Debugging Tip for Shyamnagar Teams
                        </h4>
                        <p className="mb-3">
                            When imports feel messy or components hard to find:
                        </p>
                        <ol className="list-decimal pl-5 space-y-2">
                            <li>Run a script to count components per file</li>
                            <li>Look for files with multiple default/named exports</li>
                            <li>Check if any file exceeds 300 lines</li>
                            <li>Review import statements for clarity</li>
                            <li>Refactor incrementally (one file at a time)</li>
                        </ol>
                    </div>
                </section>

                {/* Teacher's Note */}
                <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[600ms]`}>
                    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-l-4 border-amber-500 dark:border-amber-400 rounded-r-xl p-6 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-md">
                                    <span className="text-2xl">👨‍🏫</span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-2xl font-bold text-amber-800 dark:text-amber-300">Teacher's Note</h3>
                                    <span className="text-sm bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full">
                                        Sukanta Hui
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                        <h4 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">
                                            The Maintenance Test
                                        </h4>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            Ask yourself: <strong>"If I leave this project for 6 months and return,
                                                will I find what I need in 30 seconds?"</strong>
                                            That's the true test of one-component-per-file.
                                            When <strong>Debangshu</strong> returned to his Barrackpore project after months,
                                            good file structure saved him weeks of relearning.
                                        </p>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                                            <h5 className="font-bold mb-1 text-red-600 dark:text-red-400">Remember:</h5>
                                            <p className="text-sm">More files ≠ more complexity. Well-organized files reduce complexity.</p>
                                        </div>
                                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                                            <h5 className="font-bold mb-1 text-green-600 dark:text-green-400">Pro Tip:</h5>
                                            <p className="text-sm">Use your IDE's file search. Good names make search effective.</p>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-amber-200 dark:border-amber-800">
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            <strong>Contact:</strong> sukantahui@codernaccotax.co.in | 7003756860<br />
                                            <strong>Experience:</strong> 27 years in Programming Language, RDBMs, Operating System, Web Development
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Practice & Checklist */}
                <section className={`${animationClass} opacity-0 motion-safe:animate-delay-[700ms]`}>
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg">
                        <h2 className="text-3xl font-bold mb-6 text-emerald-700 dark:text-emerald-300">
                            Practice Exercise & Checklist
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl mb-6">
                                    <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                                        📝 Exercise: Refactor a Multi-Component File
                                    </h4>

                                    <div className="space-y-4 mb-6">
                                        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                            <h5 className="font-bold mb-1">Problem File:</h5>
                                            <div className="font-mono text-sm">FormComponents.jsx (350 lines)</div>
                                            <ul className="text-xs mt-2 space-y-1">
                                                <li>• Contains: TextInput, EmailInput, PasswordInput, TextArea, Select</li>
                                                <li>• All in one file with named exports</li>
                                                <li>• Imported as:
                                                    <code>
                                                        {`import { TextInput, EmailInput } from './FormComponents'`}
                                                    </code></li>
                                            </ul>
                                        </div>

                                        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                            <h5 className="font-bold mb-1">Your Task:</h5>
                                            <ol className="text-sm space-y-1 pl-5">
                                                <li>1. Create separate files for each input component</li>
                                                <li>2. Use default exports for each</li>
                                                <li>3. Create a barrel file for clean imports</li>
                                                <li>4. Update all import statements in the project</li>
                                            </ol>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => alert('Start by creating TextInput.jsx with just the TextInput component. Move it from FormComponents.jsx, then update imports.')}
                                        className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:-translate-y-1"
                                    >
                                        Click for Starter Solution
                                    </button>
                                </div>

                                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                                    <h5 className="font-bold mb-3 text-gray-800 dark:text-gray-200">💡 Hint Section</h5>
                                    <div className="space-y-3">
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            <strong>Think about:</strong> How would you organize these files in a folder structure?
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            <strong>Observe carefully:</strong> What dependencies (imports) does each component have?
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            <strong>Try changing:</strong> Create a components/inputs/ folder. Does it make imports cleaner?
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                                    ✅ One-Component-Per-File Checklist
                                </h4>

                                <div className="space-y-4">
                                    {[
                                        "Each .jsx file has exactly one default export",
                                        "File name matches component name (Button.jsx → Button)",
                                        "Related small components can be exceptions (Modal + ModalHeader)",
                                        "No file exceeds 300 lines (consider splitting)",
                                        "Helpers are private to component file when possible",
                                        "Barrel files used for clean imports",
                                        "Imports are clear and unambiguous",
                                        "Folder structure supports single-component organization",
                                        "Team follows the same convention",
                                        "Code reviews check for rule compliance"
                                    ].map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-4">
                                                <span className="text-gray-500 dark:text-gray-400">{index + 1}</span>
                                            </div>
                                            <span className="flex-1 text-sm">{item}</span>
                                            <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600"></div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-5 rounded-xl">
                                    <h5 className="font-bold mb-2 text-blue-800 dark:text-blue-300">Next Steps:</h5>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                                        With components properly organized in separate files, you're ready to learn about
                                        <strong> component composition</strong> - how to combine these single-purpose components
                                        to build complex UIs.
                                    </p>
                                    <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
                                        <span>🎯</span>
                                        <span className="font-medium">Coming Next: Component composition: nesting components correctly</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Inline Styles for Animations */}
            <style>{`
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

  .animate-fadeInUp {
    animation: fadeInUp 0.6s ease-out forwards;
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-fadeInUp {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }

  pre {
    transition: all 0.3s ease;
  }

  pre:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.3);
  }
`}</style>
        </div>
    );
};

export default Topic17;