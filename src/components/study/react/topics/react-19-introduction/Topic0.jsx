import { useState } from 'react';
import clsx from 'clsx';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useParams } from "react-router-dom";
import roadmapData from "../../react19-roadmap.json";
/*********************** separate component for next topic Button ************/
const NextTopicButton = ({
    hasNext,
    folder,
    moduleSlug,
    currentIndex,
    label
}) => {
    if (!hasNext) {
        return (
            <button
                disabled
                className="inline-flex items-center gap-2
        px-6 py-3 rounded-lg
        bg-slate-900 text-slate-500
        border border-slate-800
        cursor-not-allowed"
            >
                No More Topics
                <ArrowRight size={18} />
            </button>
        );
    }

    return (
        <Link
            to={`/${folder}/topic/${moduleSlug}/${currentIndex + 1}`}
            className="inline-flex items-center gap-2
      px-6 py-3 rounded-lg
      bg-gradient-to-r from-blue-500 to-purple-600
      text-white font-medium
      hover:scale-[1.02] transition"
        >
            {label ?? `Ready for Topic ${currentIndex + 2}`}
            <ArrowRight size={18} />
        </Link>
    );
};
/******************* End of Button **************** */

const Topic0 = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const navigate = useNavigate();
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };
    const { moduleSlug, topicIndex } = useParams();
    const currentIndex = Number(topicIndex);
    const folder = roadmapData.folder;

    // find the current module
    const currentModule = roadmapData.segments
        .flatMap(segment => segment.modules)
        .find(module => module.slug === moduleSlug);

    // safety guard
    if (!currentModule) return null;
    const totalTopics = currentModule.topics.length;
    const hasNext = currentIndex < totalTopics - 1;



    return (
        <div
            className={clsx(
                "min-h-screen transition-colors duration-500",
                isDarkMode ? "dark bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
            )}
        >
            {/* Header */}
            <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-700">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                <span className="font-bold text-white">R</span>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    React Foundations
                                </h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Topic 0: What is React and why it exists</p>
                            </div>
                        </div>
                        <button
                            onClick={toggleDarkMode}
                            className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 border border-gray-300 dark:border-gray-600"
                        >
                            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8">
                {/* Hero Section */}
                <section className="mb-16 animate-[fadeIn_0.8s_ease-out]">
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 p-8 md:p-12">
                        <div className="relative z-10 max-w-3xl">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 to-purple-700 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                                Welcome to React!
                            </h2>
                            <p className="text-xl mb-8 text-gray-700 dark:text-gray-300 leading-relaxed">
                                React is not just a library—it's a new way of thinking about building user interfaces.
                                Imagine creating web applications like assembling Lego blocks, where each piece is independent,
                                reusable, and manages its own state.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                                    Declarative
                                </span>
                                <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                                    Component-Based
                                </span>
                                <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                                    Learn Once, Write Anywhere
                                </span>
                            </div>
                        </div>

                        {/* Decorative SVG */}
                        <div className="absolute right-8 top-8 opacity-10 dark:opacity-5">
                            <svg width="200" height="200" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" />
                                <circle cx="30" cy="30" r="8" fill="currentColor">
                                    <animate attributeName="r" from="8" to="12" dur="2s" repeatCount="indefinite" />
                                </circle>
                                <circle cx="70" cy="30" r="8" fill="currentColor">
                                    <animate attributeName="r" from="8" to="12" dur="2s" repeatCount="indefinite" begin="0.5s" />
                                </circle>
                                <circle cx="50" cy="70" r="8" fill="currentColor">
                                    <animate attributeName="r" from="8" to="12" dur="2s" repeatCount="indefinite" begin="1s" />
                                </circle>
                            </svg>
                        </div>
                    </div>
                </section>

                {/* What is React? */}
                <section className="mb-16 animate-[slideUp_0.8s_ease-out]">
                    <div className="flex items-center mb-8">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
                            <span className="text-2xl">⚛️</span>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                            What is React?
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Definition Card */}
                        <div className={clsx(
                            "rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]",
                            "border border-gray-200 dark:border-gray-700",
                            "bg-white dark:bg-gray-800",
                            "hover:shadow-xl hover:shadow-blue-100/50 dark:hover:shadow-blue-900/20"
                        )}>
                            <h3 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-400">
                                Official Definition
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                React is a <strong>JavaScript library</strong> for building user interfaces.
                                Created by Facebook (now Meta) in 2013, it allows developers to create reusable
                                UI components that update efficiently when data changes.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-1 mr-3">
                                        <span className="text-sm">✓</span>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        <strong>Not a framework:</strong> It focuses only on the view layer
                                    </p>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-1 mr-3">
                                        <span className="text-sm">✓</span>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        <strong>Declarative:</strong> Describe WHAT you want, not HOW to do it
                                    </p>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-1 mr-3">
                                        <span className="text-sm">✓</span>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        <strong>Component-Based:</strong> Build encapsulated components
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Visual Explanation */}
                        <div className={clsx(
                            "rounded-xl p-6 transition-all duration-300",
                            "border border-gray-200 dark:border-gray-700",
                            "bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900"
                        )}>
                            <h3 className="text-xl font-semibold mb-6 text-purple-700 dark:text-purple-400">
                                React in Action
                            </h3>

                            <div className="space-y-6">
                                {/* Before React */}
                                <div>
                                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Traditional Web Development:</h4>
                                    <div className="space-y-2">
                                        <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                                        <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full w-3/4"></div>
                                        <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full w-1/2"></div>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                        Spaghetti code, DOM manipulation, hard to maintain
                                    </p>
                                </div>

                                {/* Arrow */}
                                <div className="flex justify-center">
                                    <svg width="40" height="40" viewBox="0 0 24 24" className="text-blue-500">
                                        <path fill="currentColor" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                                    </svg>
                                </div>

                                {/* With React */}
                                <div>
                                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">With React:</h4>
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 flex items-center justify-center">
                                            <span className="text-sm font-medium">Header</span>
                                        </div>
                                        <div className="h-12 rounded-lg bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 flex items-center justify-center">
                                            <span className="text-sm font-medium">Sidebar</span>
                                        </div>
                                        <div className="h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 flex items-center justify-center">
                                            <span className="text-sm font-medium">Content</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                        Modular components, clean separation, easy to maintain
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why React Exists - The Problem It Solves */}
                <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.2s] opacity-0 [animation-fill-mode:forwards]">
                    <div className="flex items-center mb-8">
                        <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-4">
                            <span className="text-2xl">🎯</span>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                            Why React Exists - The Problem It Solves
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "The DOM Manipulation Problem",
                                description: "Before React, developers directly manipulated the DOM using jQuery or vanilla JavaScript. This led to spaghetti code, race conditions, and was hard to maintain.",
                                example: "Imagine Swadeep trying to update a student's grade across multiple places on the page—easy to miss one!",
                                icon: "🔄"
                            },
                            {
                                title: "Code Reusability Crisis",
                                description: "Copy-pasting HTML, CSS, and JavaScript across pages led to inconsistencies and bugs that were hard to trace.",
                                example: "Tuhina wants a student card component. Without React, she copies code 20 times across the school portal!",
                                icon: "🧩"
                            },
                            {
                                title: "State Management Chaos",
                                description: "Keeping UI in sync with data was manual and error-prone. Multiple event handlers updating the same data caused unpredictable behavior.",
                                example: "Abhronila clicks 'submit test' but the loading state, success message, and score update don't sync properly.",
                                icon: "⚡"
                            }
                        ].map((problem, index) => (
                            <div
                                key={index}
                                className={clsx(
                                    "rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]",
                                    "border border-gray-200 dark:border-gray-700",
                                    "bg-white dark:bg-gray-800",
                                    "hover:shadow-xl",
                                    index === 0 && "hover:shadow-red-100/50 dark:hover:shadow-red-900/20",
                                    index === 1 && "hover:shadow-yellow-100/50 dark:hover:shadow-yellow-900/20",
                                    index === 2 && "hover:shadow-green-100/50 dark:hover:shadow-green-900/20"
                                )}
                            >
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 flex items-center justify-center mb-4 text-2xl">
                                    {problem.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
                                    {problem.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                                    {problem.description}
                                </p>
                                <div className="mt-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                                        {problem.example}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Real-World Analogy */}
                <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
                    <div className={clsx(
                        "rounded-2xl p-8 md:p-12",
                        "bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-900",
                        "border border-yellow-200 dark:border-gray-700"
                    )}>
                        <div className="flex items-center mb-8">
                            <div className="w-12 h-12 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mr-4">
                                <span className="text-2xl">🏫</span>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                                School Portal Analogy
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
                                    Think of React like a School System
                                </h3>
                                <div className="space-y-6">
                                    <div className="flex items-start">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mt-1 mr-4">
                                            <span className="text-sm font-bold">C</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">Components = Classrooms</h4>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                Each classroom (component) has its own students (data), rules (logic), and teacher (render function).
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-1 mr-4">
                                            <span className="text-sm font-bold">S</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">State = Attendance Sheet</h4>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                When Debangshu marks attendance (state changes), only that classroom updates—others remain unchanged.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mt-1 mr-4">
                                            <span className="text-sm font-bold">P</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">Props = Messages</h4>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                Principal sends notices (props) to classrooms. Each classroom receives and displays them appropriately.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="relative z-10 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                                    <div className="flex items-center mb-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                                            <span className="font-bold">R</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold">React Class System</h4>
                                            <p className="text-sm text-gray-500">Barrackpore School Portal</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {['Class 10A - Science', 'Class 10B - Commerce', 'Class 11 - Arts', 'Staff Room', 'Library'].map((room, i) => (
                                            <div
                                                key={i}
                                                className={clsx(
                                                    "flex items-center justify-between p-3 rounded-lg transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700",
                                                    "border border-gray-200 dark:border-gray-700"
                                                )}
                                            >
                                                <span className="font-medium">{room}</span>
                                                <span className="text-sm px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                                                    Active
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Decorative dots */}
                                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-yellow-200 dark:bg-yellow-900/30 opacity-50"></div>
                                <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-orange-200 dark:bg-orange-900/30 opacity-30"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Key Concepts */}
                <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.6s] opacity-0 [animation-fill-mode:forwards]">
                    <div className="flex items-center mb-8">
                        <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-4">
                            <span className="text-2xl">🔑</span>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                            React's Core Concepts
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Components",
                                description: "Independent, reusable pieces of UI. Like building blocks that compose together.",
                                code: "function Button() { return <button>Click</button>; }",
                                color: "blue"
                            },
                            {
                                title: "JSX",
                                description: "JavaScript XML. HTML-like syntax that gets compiled to JavaScript.",
                                code: "const element = <h1>Hello, {name}!</h1>;",
                                color: "purple"
                            },
                            {
                                title: "Virtual DOM",
                                description: "Lightweight copy of real DOM. React updates this first, then efficiently updates real DOM.",
                                code: "// React compares Virtual DOM versions",
                                color: "green"
                            },
                            {
                                title: "Props",
                                description: "Read-only data passed from parent to child components.",
                                code: "<Student name='Tuhina' grade='A+' />",
                                color: "yellow"
                            },
                            {
                                title: "State",
                                description: "Data that changes over time within a component.",
                                code: "const [count, setCount] = useState(0);",
                                color: "red"
                            },
                            {
                                title: "Hooks",
                                description: "Functions that let you use React features in function components.",
                                code: "useEffect(() => { fetchData(); }, []);",
                                color: "pink"
                            }
                        ].map((concept, index) => (
                            <div
                                key={index}
                                className={clsx(
                                    "group rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]",
                                    "border border-gray-200 dark:border-gray-700",
                                    "bg-white dark:bg-gray-800",
                                    "hover:shadow-xl",
                                    concept.color === 'blue' && "hover:shadow-blue-100/50 dark:hover:shadow-blue-900/20",
                                    concept.color === 'purple' && "hover:shadow-purple-100/50 dark:hover:shadow-purple-900/20",
                                    concept.color === 'green' && "hover:shadow-green-100/50 dark:hover:shadow-green-900/20",
                                    concept.color === 'yellow' && "hover:shadow-yellow-100/50 dark:hover:shadow-yellow-900/20",
                                    concept.color === 'red' && "hover:shadow-red-100/50 dark:hover:shadow-red-900/20",
                                    concept.color === 'pink' && "hover:shadow-pink-100/50 dark:hover:shadow-pink-900/20"
                                )}
                            >
                                <div className={clsx(
                                    "w-12 h-12 rounded-lg mb-4 flex items-center justify-center",
                                    `bg-${concept.color}-100 dark:bg-${concept.color}-900/30`,
                                    `text-${concept.color}-700 dark:text-${concept.color}-300`
                                )}>
                                    <span className="text-xl font-bold">{index + 1}</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
                                    {concept.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                                    {concept.description}
                                </p>
                                <div className="mt-4 p-3 rounded-lg bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto">
                                    {concept.code}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Teacher's Note */}
                <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.8s] opacity-0 [animation-fill-mode:forwards]">
                    <div className={clsx(
                        "rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl",
                        "border-l-4 border-blue-500",
                        "bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900",
                        "hover:from-blue-100 hover:to-blue-50 dark:hover:from-gray-700 dark:hover:to-gray-800"
                    )}>
                        <div className="flex items-start">
                            <div className="flex-shrink-0 mr-6">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                    <span className="text-2xl text-white">👨‍🏫</span>
                                </div>
                            </div>
                            <div className="flex-grow">
                                <div className="flex items-center mb-4">
                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mr-4">
                                        Teacher's Note
                                    </h3>
                                    <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium">
                                        Sukanta Hui
                                    </span>
                                </div>

                                <div className="prose prose-lg dark:prose-invert max-w-none">
                                    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                                        <strong>Remember this analogy:</strong> React is like the <em>school timetable system</em>.
                                        When a teacher changes (data updates), only that period's class (component) gets affected—not the entire school schedule (DOM).
                                    </p>

                                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                                        <div>
                                            <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-3 flex items-center">
                                                <span className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-2">✓</span>
                                                What to Focus On:
                                            </h4>
                                            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                                                <li>• Think in components, not pages</li>
                                                <li>• Understand props vs state deeply</li>
                                                <li>• Embrace the declarative mindset</li>
                                                <li>• Practice with local examples (school portal)</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-3 flex items-center">
                                                <span className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-2">!</span>
                                                Common Pitfalls:
                                            </h4>
                                            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                                                <li>• Trying to manipulate DOM directly</li>
                                                <li>• Creating components that are too large</li>
                                                <li>• Not understanding re-renders</li>
                                                <li>• Skipping the "why" before the "how"</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="mt-8 p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mr-3">
                                                💡
                                            </div>
                                            <h5 className="font-semibold text-gray-800 dark:text-gray-100">Professional Tip:</h5>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            In my 27 years of teaching programming, I've seen students from Shyamnagar to Ichapur
                                            succeed by first understanding <em>why</em> React exists. Before writing code, always ask:
                                            "What problem is this solving?" This mindset separates beginners from professionals.
                                        </p>
                                        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                                            <p>📧 sukantahui@codernaccotax.co.in | 📱 7003756860</p>
                                            <p>Expertise: Web Development, RDBMS, Operating Systems</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mini Checklist */}
                <section className="animate-[slideUp_0.8s_ease-out_1s] opacity-0 [animation-fill-mode:forwards]">
                    <div className={clsx(
                        "rounded-2xl p-8",
                        "bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900",
                        "border border-gray-200 dark:border-gray-700"
                    )}>
                        <h3 className="text-2xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">
                            📋 Topic 0 Checklist
                        </h3>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                "Understand React is a library, not framework",
                                "Know why React was created (DOM problems)",
                                "Grasp component-based architecture",
                                "Understand declarative vs imperative",
                                "Recognize Virtual DOM concept",
                                "Remember props and state difference"
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className={clsx(
                                        "flex items-center p-4 rounded-lg transition-all duration-300",
                                        "border border-gray-200 dark:border-gray-700",
                                        "hover:bg-white dark:hover:bg-gray-800",
                                        "hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700"
                                    )}
                                >
                                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
                                        <span className="text-blue-700 dark:text-blue-300">{index + 1}</span>
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 text-center">
                            <NextTopicButton
                                hasNext={hasNext}
                                folder={folder}
                                moduleSlug={moduleSlug}
                                currentIndex={currentIndex}
                            />

                            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                                Next: React vs Angular/Vue – Practical Comparison
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="mt-16 border-t border-gray-200 dark:border-gray-800 py-8">
                <div className="container mx-auto px-6">
                    <div className="text-center text-gray-500 dark:text-gray-400">
                        <p>© 2024 React Foundations Course. Topic 0: What is React and why it exists</p>
                        <p className="mt-2 text-sm">Built with React 19 • Tailwind CSS • Vite</p>
                    </div>
                </div>
            </footer>

            {/* Inline Styles for Animations */}
            <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
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
        
        /* Respect reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        .motion-safe {
          animation-duration: 0.8s;
          animation-timing-function: ease-out;
          animation-fill-mode: both;
        }
      `}</style>
        </div>
    );
};

export default Topic0;