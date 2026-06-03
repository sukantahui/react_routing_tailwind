import React, { useState } from 'react';
import clsx from 'clsx';

// Import common components (assumed existing in project structure)
import JavaFileLoader from '../../../../../common/JavaFileLoader';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';

// Import Java code examples from topic0_files folder
import varDeclarationJava from './topic0_files/VariableDeclaration.java?raw';
import constDefinitionJava from './topic0_files/ConstantDefinition.java?raw';
import scopeLocalJava from './topic0_files/ScopeLocal.java?raw';
import scopeClassJava from './topic0_files/ScopeClass.java?raw';
import shadowingJava from './topic0_files/ShadowingExample.java?raw';
import initBestPracticeJava from './topic0_files/InitBestPractice.java?raw';

// Import FAQ questions (30 questions)
import questions from './topic0_files/topic0_questions';

// Animation keyframes (scoped to component via <style>)
const animations = `
  @keyframes fadeSlideUp {
    from {
      opacity: 0;
      transform: translateY(24px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-slide-up {
    animation: fadeSlideUp 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
  }
  @media (prefers-reduced-motion: reduce) {
    .animate-fade-slide-up {
      animation: none;
      opacity: 1;
      transform: none;
    }
  }
`;

// 20 Interactive questions (without using opacity-0)
const interactiveQuestionsData = [
  { question: "What is a variable in programming?", answer: "A named storage location in memory that can hold a value which may change during program execution." },
  { question: "What is a constant?", answer: "A value that cannot be changed after initialization. In Java, declared using the 'final' keyword." },
  { question: "What is variable declaration?", answer: "Specifying the type and name of a variable without allocating memory or giving a value." },
  { question: "What is variable initialization?", answer: "Assigning an initial value to a variable at the time of declaration or later." },
  { question: "What is variable scope?", answer: "The region of the program where a variable is accessible. Examples: local, instance, class scope." },
  { question: "Can a local variable be used outside its method in Java?", answer: "No, local variables are only accessible within the method, constructor, or block they are declared in." },
  { question: "What happens if you use a variable before initialization in Java?", answer: "Compilation error: 'variable might not have been initialized'." },
  { question: "What is the default value of an instance variable in Java?", answer: "0 for numeric types, false for boolean, null for objects." },
  { question: "What is the naming convention for constants in Java?", answer: "Uppercase letters with underscores (e.g., MAX_HEIGHT)." },
  { question: "Can you declare a variable as final without initializing it?", answer: "Yes, but it must be initialized exactly once before use (blank final variable)." },
  { question: "What is variable shadowing?", answer: "When a variable declared in an inner scope has the same name as a variable in an outer scope, hiding the outer variable." },
  { question: "What is the difference between declaration and definition?", answer: "Declaration introduces the name and type; definition allocates storage (in Java, declaration is typically also definition except for abstract methods)." },
  { question: "What is a class variable (static variable)?", answer: "A variable shared among all instances of a class, declared with the 'static' keyword." },
  { question: "What is an instance variable?", answer: "A variable that belongs to an instance (object) of a class; each object has its own copy." },
  { question: "What are the primitive variable types in Java?", answer: "byte, short, int, long, float, double, char, boolean." },
  { question: "What is a null literal?", answer: "A special literal that represents no object; can be assigned to any reference type variable." },
  { question: "Can a final variable be reassigned?", answer: "No, once assigned, its value cannot be changed." },
  { question: "What is a blank final variable?", answer: "A final variable declared but not initialized; must be initialized in every constructor." },
  { question: "What is the scope of a method parameter?", answer: "The entire method body. It acts like a local variable." },
  { question: "What does 'this' keyword refer to?", answer: "Refers to the current object instance; used to access instance variables when shadowed by parameters or local variables." }
];

// Helper component for interactive questions (reveal answer on click)
function InteractiveQuestions() {
  const [revealed, setRevealed] = useState(Array(interactiveQuestionsData.length).fill(false));

  const toggleAnswer = (index) => {
    setRevealed(prev => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className="mt-16 rounded-2xl bg-white/50 dark:bg-gray-800/50 p-6 shadow-lg backdrop-blur-sm">
      <h3 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-100 border-l-4 border-indigo-500 pl-4">✍️ Test Your Knowledge: 20 Practice Questions</h3>
      <div className="grid gap-4 md:grid-cols-1">
        {interactiveQuestionsData.map((item, idx) => (
          <div key={idx} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-all duration-300 hover:shadow-md hover:scale-[1.01]">
            <div className="flex flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <p className="font-semibold text-gray-800 dark:text-gray-200">{idx+1}. {item.question}</p>
                <button
                  onClick={() => toggleAnswer(idx)}
                  className="rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-700 transition-all hover:bg-indigo-200 dark:bg-indigo-900/60 dark:text-indigo-200 dark:hover:bg-indigo-800"
                >
                  {revealed[idx] ? "Hide Answer" : "Show Answer"}
                </button>
              </div>
              {revealed[idx] && (
                <div className="mt-3 rounded-lg bg-indigo-50 p-3 text-gray-700 dark:bg-indigo-900/30 dark:text-gray-200 transition-all duration-200">
                  {item.answer}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main component Topic0: Constants and Variables
export default function Topic0() {
  const [hoverSVG, setHoverSVG] = useState(false);
  
  // Staggered animation delays
  const cardDelayClasses = [
    "animate-fade-slide-up animation-delay-0",
    "animate-fade-slide-up animation-delay-100",
    "animate-fade-slide-up animation-delay-200",
    "animate-fade-slide-up animation-delay-300",
  ];

  return (
    <>
      <style>{animations}</style>
      <style>{`
        .animation-delay-0 { animation-delay: 0ms; }
        .animation-delay-100 { animation-delay: 100ms; }
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-300 { animation-delay: 300ms; }
        .animation-delay-400 { animation-delay: 400ms; }
        @media (prefers-reduced-motion: reduce) {
          [class*="animation-delay-"] { animation-delay: 0ms; }
        }
      `}</style>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
          
          {/* Hero Section */}
          <div className="animate-fade-slide-up mb-12 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
              Constants & Variables
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Definition · Declaration · Initialization · Scope — The building blocks of data storage in programming.
            </p>
          </div>

          {/* SVG Illustration: Variable vs Constant Visual (animated hover) */}
          <div 
            className="animate-fade-slide-up mb-16 flex justify-center"
            onMouseEnter={() => setHoverSVG(true)}
            onMouseLeave={() => setHoverSVG(false)}
          >
            <div className="w-full max-w-xl rounded-2xl bg-white p-4 shadow-md transition-all duration-500 hover:shadow-xl dark:bg-gray-800/70">
              <svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg" className="w-full">
                <rect x="20" y="40" width="240" height="120" rx="12" fill="none" stroke="#4F46E5" strokeWidth="2.5" className="transition-all duration-300" style={{ stroke: hoverSVG ? '#818CF8' : '#4F46E5' }} />
                <text x="140" y="30" textAnchor="middle" fill="#4F46E5" fontWeight="bold" fontSize="16">Variable (Mutable)</text>
                <text x="60" y="80" fill="#1F2937" className="dark:fill-gray-200" fontSize="14">int score = 95;</text>
                <text x="60" y="110" fill="#6B7280" fontSize="12">→ score = 98;</text>
                <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                
                <rect x="340" y="40" width="240" height="120" rx="12" fill="none" stroke="#10B981" strokeWidth="2.5" className="transition-all duration-300" style={{ stroke: hoverSVG ? '#34D399' : '#10B981' }} />
                <text x="460" y="30" textAnchor="middle" fill="#10B981" fontWeight="bold" fontSize="16">Constant (Immutable)</text>
                <text x="380" y="80" fill="#1F2937" className="dark:fill-gray-200" fontSize="14">final double PI = 3.1416;</text>
                <text x="380" y="110" fill="#EF4444" fontSize="12">❌ PI = 3.14; // Error</text>
                
                {hoverSVG && (
                  <g opacity="0.9">
                    <text x="290" y="130" fill="#4B5563" fontSize="12" textAnchor="middle">✏️ Variables change</text>
                    <text x="290" y="150" fill="#4B5563" fontSize="12" textAnchor="middle">🔒 Constants fixed</text>
                  </g>
                )}
              </svg>
            </div>
          </div>

          {/* Core Concepts Cards (staggered) */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-14">
            {[
              { title: "📘 Definition", content: "Variables store data that can change; Constants store fixed values (final). Both have a type and a memory location." },
              { title: "📝 Declaration", content: "Specify type + name: e.g., `int age;` No memory allocated until definition/initialization." },
              { title: "⚙️ Initialization", content: "Assign first value: `int age = 20;` Uninitialized local variables cause compile errors." },
              { title: "🎯 Scope", content: "Region where variable is accessible: class, method, or block-level. Determines lifetime & visibility." }
            ].map((card, idx) => (
              <div key={idx} className={clsx("rounded-xl bg-white p-5 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:bg-gray-800/80 dark:hover:bg-gray-700", cardDelayClasses[idx % 4])}>
                <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{card.title}</h3>
                <p className="mt-2 leading-relaxed text-gray-600 dark:text-gray-300">{card.content}</p>
              </div>
            ))}
          </div>

          {/* Prototype / Signature & Real-world usage */}
          <div className="animate-fade-slide-up mb-14 rounded-2xl bg-indigo-50 p-6 dark:bg-indigo-950/30">
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">📜 Java Declaration Signatures</h2>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              {`// Variable declaration syntax
type variableName [= value];

// Constant declaration
final type CONSTANT_NAME = value;

// Example
int studentCount = 35;
final double TAX_RATE = 0.18;`}
            </pre>
            <p className="mt-4 text-gray-700 dark:text-gray-200"><strong>Purpose:</strong> Reserve memory and associate a name with data. <strong>When/Why:</strong> Use variables for changing data (user score, temp reading), constants for fixed values (PI, max users).</p>
            <div className="mt-4 rounded-lg bg-white p-3 dark:bg-gray-800/60">
              <p className="text-sm"><span className="font-semibold">🌍 Real-world:</span> In a school system, <strong>studentName</strong> (variable) changes per student, but <strong>SCHOOL_YEAR</strong> (constant) stays same. Barrackpore high school uses constants for max seats = 50.</p>
            </div>
          </div>

          {/* Java Code Examples Row */}
          <div className="animate-fade-slide-up mb-12 space-y-6">
            <h2 className="text-2xl font-bold border-l-4 border-indigo-500 pl-3">💻 Java Demonstrations</h2>
            <div className="grid gap-5 md:grid-cols-1">
              <JavaFileLoader fileModule={varDeclarationJava} title="VariableDeclaration.java" highlightLines={[]} />
              <JavaFileLoader fileModule={constDefinitionJava} title="ConstantDefinition.java" highlightLines={[]} />
              <JavaFileLoader fileModule={scopeLocalJava} title="ScopeLocal.java" highlightLines={[]} />
              <JavaFileLoader fileModule={scopeClassJava} title="ScopeClass.java" highlightLines={[]} />
              <JavaFileLoader fileModule={shadowingJava} title="ShadowingExample.java" highlightLines={[]} />
              <JavaFileLoader fileModule={initBestPracticeJava} title="InitBestPractice.java" highlightLines={[]} />
            </div>
          </div>

          {/* Tips & Tricks + Common Mistakes + Best Practices */}
          <div className="grid gap-6 md:grid-cols-2 animate-fade-slide-up">
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-800/50 dark:bg-amber-950/20 transition-all hover:shadow-md">
              <h3 className="text-xl font-bold text-amber-700 dark:text-amber-400">💡 Tips & Tricks (Pro Level)</h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-gray-700 dark:text-gray-200">
                <li>Use `var` (Java 10+) for local variables when type is obvious: `var name = "Swadeep";`</li>
                <li>Initialize variables as close to usage as possible – improves readability.</li>
                <li>Declare constants with `static final` for class-level immutability.</li>
                <li>Use meaningful names: `totalMarks` not `tm`.</li>
                <li>Debugging variable scope: highlight blocks to check visibility.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-red-200 bg-red-50 p-5 dark:border-red-800/50 dark:bg-red-950/20 transition-all hover:shadow-md">
              <h3 className="text-xl font-bold text-red-600 dark:text-red-400">⚠️ Common Mistakes & Pitfalls</h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-gray-700 dark:text-gray-200">
                <li>Using uninitialized local variable → compilation error.</li>
                <li>Assuming default values for local variables (they don't have any).</li>
                <li>Assigning new value to final constant.</li>
                <li>Variable name conflicts (shadowing) causing logic errors.</li>
                <li>Forgetting scope: accessing loop variable outside loop.</li>
              </ul>
            </div>
          </div>

          {/* Best Practices & Mini Checklist */}
          <div className="animate-fade-slide-up mt-10 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 p-5 dark:from-emerald-950/30 dark:to-teal-950/30">
            <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-400">✅ Best Practices & Mini Checklist</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="font-semibold">Coding Standards:</p>
                <ul className="ml-5 list-disc text-gray-700 dark:text-gray-200">
                  <li>CamelCase for variables (studentAge).</li>
                  <li>UPPER_SNAKE_CASE for constants.</li>
                  <li>Declare one variable per line.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Memory Checklist:</p>
                <ul className="ml-5 list-disc text-gray-700 dark:text-gray-200">
                  <li>☑️ Local variables live in stack.</li>
                  <li>☑️ Instance variables stored in heap.</li>
                  <li>☑️ Constants are compile-time if primitive/string.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Hint section */}
          <div className="animate-fade-slide-up mt-12 rounded-xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-800/40 dark:bg-blue-950/20">
            <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300">🔍 Think about...</h3>
            <p className="mt-1 text-gray-700 dark:text-gray-200">Try changing a constant value in the Java examples — what error message do you see? Observe carefully how variable scope changes when moving code block from method to class level.</p>
          </div>

          {/* Teacher's Note */}
          <div className="animate-fade-slide-up mt-12">
            <Teacher note="When teaching constants, emphasize 'final' as a contract with the future reader. Use examples from daily life: a student's roll number (constant for the year) vs attendance count (variable). Encourage students to run ScopeLocal.java to witness error messages — hands-on debugging builds intuition faster than theory. Watch out for the blank final misconception: you can defer initialization only once via constructor." />
          </div>

          {/* FAQ with 30 questions (imported) */}
          <div className="animate-fade-slide-up mt-16">
            <FAQTemplate title="Constants & Variables - Deep Dive FAQs" questions={questions} />
          </div>

          {/* 20 Interactive Questions (no opacity-0) */}
          <InteractiveQuestions />
        </div>
      </div>
    </>
  );
}