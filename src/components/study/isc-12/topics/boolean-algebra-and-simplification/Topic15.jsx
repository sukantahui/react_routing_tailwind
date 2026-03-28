import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic 15: Simplification Techniques: Using Boolean identities
 * 
 * Component: Topic15
 * Purpose: Explains how to systematically apply Boolean identities for simplification:
 *          - Identity Laws
 *          - Null Laws
 *          - Idempotent Laws
 *          - Complement Laws
 *          - Absorption Laws
 *          - Consensus Theorem
 *          - De Morgan's Laws
 *          - Combining multiple identities
 * 
 * When & Why: Used as the sixteenth topic in the Boolean Algebra series. Students learn
 *             to recognize patterns and apply the right identity at the right time.
 *             This bridges the gap between knowing individual laws and fluent
 *             simplification of complex expressions.
 * 
 * Return Type: JSX.Element
 */

const Topic15 = () => {
  // State for interactive identity practice
  const [selectedIdentity, setSelectedIdentity] = useState('absorption');
  const [showProof, setShowProof] = useState(true);
  const [userAnswer, setUserAnswer] = useState('');
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState('');

  // Identity definitions with explanations
  const identities = {
    absorption: {
      name: 'Absorption Law',
      forms: ['A + A·B = A', 'A·(A + B) = A'],
      description: 'A term absorbs a larger term that contains it',
      example: 'A + A·B simplifies to A',
      application: 'When a variable appears both alone and ANDed with something, the larger term is absorbed.',
      commonMistake: 'Students sometimes think A·(A+B) = A·A + A·B = A + A·B, missing the final absorption step.'
    },
    consensus: {
      name: 'Consensus Theorem',
      forms: ['A·B + A\'·C + B·C = A·B + A\'·C', '(A+B)·(A\'+C)·(B+C) = (A+B)·(A\'+C)'],
      description: 'The term B·C (or B+C) is redundant when the other two terms are present',
      example: 'A·B + A\'·C + B·C simplifies to A·B + A\'·C',
      application: 'Look for two terms with a variable and its complement, and a third term that combines the other variables.',
      commonMistake: 'Applying consensus when the middle variable doesn\'t appear in complemented form in both terms.'
    },
    deMorgan: {
      name: 'De Morgan\'s Laws',
      forms: ['(A·B)\' = A\' + B\'', '(A+B)\' = A\'·B\''],
      description: 'Complement of AND is OR of complements; complement of OR is AND of complements',
      example: '(A·B)\' simplifies to A\' + B\'',
      application: 'Use when you have a complement over a sum or product. Push the complement inward and change the operator.',
      commonMistake: 'Forgetting to complement all variables when applying De Morgan\'s.'
    },
    complement: {
      name: 'Complement Laws',
      forms: ['A·A\' = 0', 'A + A\' = 1'],
      description: 'A variable and its complement cancel out',
      example: 'A·B + A·B\' = A·(B + B\') = A·1 = A',
      application: 'Look for pairs where a variable and its complement appear in the same product or sum.',
      commonMistake: 'Applying complement when the variable is not the same (A·B\' is not a complement pair unless A is the same).'
    },
    distributive: {
      name: 'Distributive Laws',
      forms: ['A·(B+C) = A·B + A·C', 'A + B·C = (A+B)·(A+C)'],
      description: 'Distribution of AND over OR and OR over AND',
      example: 'A·B + A·C = A·(B+C)',
      application: 'Use to factor out common terms or expand expressions.',
      commonMistake: 'Forgetting the second distributive law (OR over AND) which is unique to Boolean algebra.'
    },
    identity: {
      name: 'Identity Laws',
      forms: ['A·1 = A', 'A+0 = A'],
      description: 'A variable combined with the identity element remains unchanged',
      example: 'A·1 = A',
      application: 'Use to eliminate ·1 or +0 terms.',
      commonMistake: 'Confusing with Null Laws (A·0=0, A+1=1).'
    },
    idempotent: {
      name: 'Idempotent Laws',
      forms: ['A·A = A', 'A+A = A'],
      description: 'Repeating a variable doesn\'t change the result',
      example: 'A·A·B = A·B',
      application: 'Use to eliminate duplicate variables in products or sums.',
      commonMistake: 'Thinking A·A = A² (regular algebra). In Boolean, A·A = A.'
    },
    involution: {
      name: 'Involution Law',
      forms: ['(A\')\' = A'],
      description: 'Double complement cancels out',
      example: '((A+B)\')\' = A+B',
      application: 'Use to cancel pairs of NOT gates or simplify nested complements.',
      commonMistake: 'Applying involution incorrectly to expressions like (A+B\') — only the outermost complement pair cancels.'
    }
  };

  const currentIdentity = identities[selectedIdentity];

  // Quiz expressions for practice
  const quizQuestions = [
    { expr: 'A + A·B', answer: 'A', hint: 'Apply Absorption Law' },
    { expr: 'A·B + A·B\'', answer: 'A', hint: 'Factor A and use Complement Law' },
    { expr: '(A+B)·(A+C)', answer: 'A + B·C', hint: 'Apply Distributive Law (OR over AND)' },
    { expr: 'A·B + A\'·C + B·C', answer: 'A·B + A\'·C', hint: 'Use Consensus Theorem' },
    { expr: '(A·B)\'', answer: 'A\' + B\'', hint: 'Apply De Morgan\'s Law' },
    { expr: 'A·(A+B)', answer: 'A', hint: 'Apply Absorption Law' },
    { expr: 'A + A\'', answer: '1', hint: 'Apply Complement Law' },
    { expr: 'A·A\'', answer: '0', hint: 'Apply Complement Law' },
    { expr: 'A·1', answer: 'A', hint: 'Apply Identity Law' },
    { expr: 'A+0', answer: 'A', hint: 'Apply Identity Law' },
    { expr: 'A·A·B', answer: 'A·B', hint: 'Apply Idempotent Law' },
    { expr: '(A+B)+(A+C)', answer: 'A+B+C', hint: 'Apply Idempotent and Associative Laws' }
  ];

  const currentQuiz = quizQuestions[quizIndex];

  const handleQuizSubmit = () => {
    const normalizedAnswer = userAnswer.toUpperCase().replace(/\s/g, '');
    const normalizedCorrect = currentQuiz.answer.toUpperCase().replace(/\s/g, '');
    
    if (normalizedAnswer === normalizedCorrect) {
      setQuizFeedback('✓ Correct! Great job applying the identity!');
    } else {
      setQuizFeedback(`✗ Not quite. The correct answer is ${currentQuiz.answer}. ${currentQuiz.hint}`);
    }
  };

  const nextQuestion = () => {
    const nextIndex = (quizIndex + 1) % quizQuestions.length;
    setQuizIndex(nextIndex);
    setUserAnswer('');
    setQuizFeedback('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <div className="inline-block p-3 mb-4 bg-teal-100 dark:bg-teal-900/40 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
          <svg className="w-12 h-12 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">Simplification Techniques:</span>
          <span className="block text-teal-600 dark:text-teal-400">Using Boolean Identities</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Master the art of recognizing and applying the right identity
        </p>
      </div>

      <div className="space-y-8">
        {/* Identity Reference Cards */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🃏</span> Identity Reference Cards
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Click on any identity to see detailed explanation, examples, and common mistakes.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
            {Object.keys(identities).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedIdentity(key)}
                className={clsx(
                  "px-3 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-300 hover:scale-105",
                  selectedIdentity === key
                    ? "bg-teal-500 text-white shadow-md"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                )}
              >
                {identities[key].name}
              </button>
            ))}
          </div>
          
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 p-5 rounded-xl">
            <h3 className="text-xl font-bold text-teal-700 dark:text-teal-300 mb-2">{currentIdentity.name}</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Forms:</p>
                <div className="font-mono text-sm space-y-1">
                  {currentIdentity.forms.map((form, idx) => (
                    <p key={idx} className="bg-white dark:bg-gray-800 p-2 rounded">{form}</p>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Description:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{currentIdentity.description}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Example:</p>
                <p className="text-sm font-mono text-teal-600 dark:text-teal-400">{currentIdentity.example}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">When to Apply:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{currentIdentity.application}</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded">
                <p className="text-sm font-semibold text-red-700 dark:text-red-300">⚠️ Common Mistake:</p>
                <p className="text-sm text-red-600 dark:text-red-400">{currentIdentity.commonMistake}</p>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setShowProof(!showProof)}
            className="mt-4 w-full py-2 bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 rounded-lg font-medium transition-all duration-300 hover:bg-teal-200 dark:hover:bg-teal-900/60"
          >
            {showProof ? "Hide" : "Show"} Algebraic Proof
          </button>
          
          {showProof && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">📐 Algebraic Proof:</p>
              {selectedIdentity === 'absorption' && (
                <div className="font-mono text-sm space-y-1">
                  <p>Proof of A + A·B = A:</p>
                  <p>A + A·B = A·1 + A·B (Identity)</p>
                  <p>= A·(1 + B) (Distributive)</p>
                  <p>= A·1 (Null Law: 1+B=1)</p>
                  <p>= A (Identity)</p>
                  <p className="mt-2">Proof of A·(A+B) = A:</p>
                  <p>A·(A+B) = A·A + A·B (Distributive)</p>
                  <p>= A + A·B (Idempotent)</p>
                  <p>= A·(1+B) (Distributive)</p>
                  <p>= A·1 = A</p>
                </div>
              )}
              {selectedIdentity === 'consensus' && (
                <div className="font-mono text-sm space-y-1">
                  <p>Proof of A·B + A'·C + B·C = A·B + A'·C:</p>
                  <p>Start: A·B + A'·C + B·C</p>
                  <p>= A·B + A'·C + B·C·(A + A') (Add A+A'=1)</p>
                  <p>= A·B + A'·C + A·B·C + A'·B·C (Distribute)</p>
                  <p>= A·B·(1+C) + A'·C·(1+B) (Factor)</p>
                  <p>= A·B·1 + A'·C·1 (Null Law)</p>
                  <p>= A·B + A'·C</p>
                </div>
              )}
              {selectedIdentity === 'deMorgan' && (
                <div className="font-mono text-sm space-y-1">
                  <p>Proof of (A·B)' = A' + B' using truth table:</p>
                  <p>A=0,B=0: (0·0)'=1, 0'+0'=1+1=1 ✓</p>
                  <p>A=0,B=1: (0·1)'=1, 0'+1'=1+0=1 ✓</p>
                  <p>A=1,B=0: (1·0)'=1, 1'+0'=0+1=1 ✓</p>
                  <p>A=1,B=1: (1·1)'=0, 1'+1'=0+0=0 ✓</p>
                  <p className="mt-2">Dual proof for (A+B)' = A'·B'</p>
                </div>
              )}
              {selectedIdentity === 'complement' && (
                <div className="font-mono text-sm space-y-1">
                  <p>Proof of A·A' = 0:</p>
                  <p>If A=0: 0·1=0 ✓</p>
                  <p>If A=1: 1·0=0 ✓</p>
                  <p className="mt-2">Proof of A+A' = 1:</p>
                  <p>If A=0: 0+1=1 ✓</p>
                  <p>If A=1: 1+0=1 ✓</p>
                </div>
              )}
              {selectedIdentity === 'distributive' && (
                <div className="font-mono text-sm space-y-1">
                  <p>AND over OR: A·(B+C) = A·B + A·C</p>
                  <p>This is verified by truth table or by expanding.</p>
                  <p className="mt-2">OR over AND: A + B·C = (A+B)·(A+C)</p>
                  <p>Proof: (A+B)·(A+C) = A·A + A·C + B·A + B·C</p>
                  <p>= A + A·C + A·B + B·C</p>
                  <p>= A·(1+C+B) + B·C = A·1 + B·C = A + B·C</p>
                </div>
              )}
              {selectedIdentity === 'identity' && (
                <div className="font-mono text-sm space-y-1">
                  <p>Proof of A·1 = A:</p>
                  <p>If A=0: 0·1=0 ✓</p>
                  <p>If A=1: 1·1=1 ✓</p>
                  <p className="mt-2">Proof of A+0 = A:</p>
                  <p>If A=0: 0+0=0 ✓</p>
                  <p>If A=1: 1+0=1 ✓</p>
                </div>
              )}
              {selectedIdentity === 'idempotent' && (
                <div className="font-mono text-sm space-y-1">
                  <p>Proof of A·A = A:</p>
                  <p>If A=0: 0·0=0 ✓</p>
                  <p>If A=1: 1·1=1 ✓</p>
                  <p className="mt-2">Proof of A+A = A:</p>
                  <p>If A=0: 0+0=0 ✓</p>
                  <p>If A=1: 1+1=1 ✓</p>
                </div>
              )}
              {selectedIdentity === 'involution' && (
                <div className="font-mono text-sm space-y-1">
                  <p>Proof of (A')' = A:</p>
                  <p>If A=0: 0'=1, 1'=0 ✓</p>
                  <p>If A=1: 1'=0, 0'=1 ✓</p>
                  <p>Two NOT gates in series cancel out.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Pattern Recognition Guide */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔍</span> Pattern Recognition Guide
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Learn to recognize patterns in Boolean expressions that match specific identities:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <p className="font-mono font-bold">Pattern: X + X·Y</p>
              <p className="text-sm">→ Apply <strong className="text-green-600">Absorption Law</strong>: = X</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <p className="font-mono font-bold">Pattern: X·(X+Y)</p>
              <p className="text-sm">→ Apply <strong className="text-green-600">Absorption Law</strong>: = X</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <p className="font-mono font-bold">Pattern: X·Y + X·Z</p>
              <p className="text-sm">→ Apply <strong className="text-blue-600">Distributive Law</strong>: = X·(Y+Z)</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <p className="font-mono font-bold">Pattern: (X+Y)·(X+Z)</p>
              <p className="text-sm">→ Apply <strong className="text-blue-600">Distributive (OR)</strong>: = X + Y·Z</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
              <p className="font-mono font-bold">Pattern: X·Y + X'·Z + Y·Z</p>
              <p className="text-sm">→ Apply <strong className="text-purple-600">Consensus Theorem</strong>: = X·Y + X'·Z</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
              <p className="font-mono font-bold">Pattern: (X+Y)·(X'+Z)·(Y+Z)</p>
              <p className="text-sm">→ Apply <strong className="text-purple-600">Consensus (dual)</strong>: = (X+Y)·(X'+Z)</p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              <p className="font-mono font-bold">Pattern: X·Y + X·Y'</p>
              <p className="text-sm">→ Apply <strong className="text-red-600">Complement + Distributive</strong>: = X</p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              <p className="font-mono font-bold">Pattern: (X+Y)·(X+Y')</p>
              <p className="text-sm">→ Apply <strong className="text-red-600">Complement + Distributive</strong>: = X</p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
              <p className="font-mono font-bold">Pattern: (X·Y)'</p>
              <p className="text-sm">→ Apply <strong className="text-amber-600">De Morgan's Law</strong>: = X' + Y'</p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
              <p className="font-mono font-bold">Pattern: (X+Y)'</p>
              <p className="text-sm">→ Apply <strong className="text-amber-600">De Morgan's Law</strong>: = X'·Y'</p>
            </div>
          </div>
        </div>

        {/* Practice Quiz */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">✏️</span> Practice: Identify the Identity
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Simplify the expression and identify which Boolean identity you used.
          </p>
          
          <div className="bg-gray-100 dark:bg-gray-700/50 p-6 rounded-xl mb-4">
            <p className="text-center text-xl font-mono font-bold mb-4">
              {currentQuiz.expr}
            </p>
            <p className="text-center text-sm text-gray-500 mb-4">
              Simplify this expression:
            </p>
            
            <div className="flex gap-3 mb-3">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter simplified expression (e.g., A·B)"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500"
              />
              <button
                onClick={handleQuizSubmit}
                className="px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-all duration-300 hover:scale-105"
              >
                Check
              </button>
              <button
                onClick={nextQuestion}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300 hover:scale-105"
              >
                Next →
              </button>
            </div>
            
            {quizFeedback && (
              <div className={clsx(
                "p-3 rounded-lg text-center",
                quizFeedback.startsWith('✓') 
                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                  : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
              )}>
                {quizFeedback}
              </div>
            )}
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold">💡 Hint:</span> {currentQuiz.hint}
            </p>
          </div>
        </div>

        {/* Worked Example: Multi-Identity Simplification */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔧</span> Worked Example: Combining Multiple Identities
          </h2>
          
          <div className="space-y-4">
            <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
              <p className="font-mono font-bold mb-2">Simplify: F = (A + B)·(A' + C)·(B + C) + A·B·C</p>
              
              <div className="space-y-2 font-mono text-sm mt-3">
                <p>Step 1: Apply Consensus Theorem to first three terms:</p>
                <p className="pl-4">(A + B)·(A' + C)·(B + C) = (A + B)·(A' + C)</p>
                <p className="pl-4 text-green-600">Identity used: Consensus Theorem (dual form)</p>
                
                <p className="mt-2">Step 2: New expression: F = (A + B)·(A' + C) + A·B·C</p>
                
                <p className="mt-2">Step 3: Expand the product: (A + B)·(A' + C) = A·A' + A·C + B·A' + B·C</p>
                <p className="pl-4">= 0 + A·C + A'·B + B·C</p>
                <p className="pl-4">= A·C + A'·B + B·C</p>
                <p className="pl-4 text-green-600">Identity used: Distributive Law, Complement Law</p>
                
                <p className="mt-2">Step 4: Now F = A·C + A'·B + B·C + A·B·C</p>
                
                <p className="mt-2">Step 5: Factor B·C from last two terms: B·C·(1 + A) = B·C·1 = B·C</p>
                <p className="pl-4 text-green-600">Identity used: Distributive Law, Null Law, Identity Law</p>
                
                <p className="mt-2">Step 6: F = A·C + A'·B + B·C</p>
                
                <p className="mt-2">Step 7: Apply Consensus Theorem again: A·C + A'·B + B·C = A·C + A'·B</p>
                <p className="pl-4 text-green-600">Identity used: Consensus Theorem</p>
                
                <p className="mt-2 font-bold">Final Simplified Result: <span className="text-teal-600">F = A·C + A'·B</span></p>
              </div>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
              <p className="text-sm">
                <span className="font-bold">🎯 Key Takeaway:</span> Complex simplifications often require applying multiple identities in sequence. 
                The order matters—look for patterns and apply the most obvious identity first.
              </p>
            </div>
          </div>
        </div>

        {/* Professional Tips & Tricks */}
        <div className="bg-gradient-to-r from-teal-50 to-green-50 dark:from-teal-900/20 dark:to-green-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>💎</span> Tips & Tricks (Professional Level)
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2"><span className="text-teal-500 font-bold">✓</span> <strong>Build a Mental Library:</strong> Memorize the patterns, not just the formulas. Recognize X + X·Y visually.</li>
            <li className="flex items-start gap-2"><span className="text-teal-500 font-bold">✓</span> <strong>Work from Outside In:</strong> Apply De Morgan's to outer complements first, then simplify inside.</li>
            <li className="flex items-start gap-2"><span className="text-teal-500 font-bold">✓</span> <strong>Add Strategic Redundancy:</strong> Sometimes adding X·X' or X+X' reveals factorization opportunities.</li>
            <li className="flex items-start gap-2"><span className="text-teal-500 font-bold">✓</span> <strong>Check for Consensus:</strong> The pattern A·B + A'·C + B·C appears often in real circuits—always look for it.</li>
            <li className="flex items-start gap-2"><span className="text-teal-500 font-bold">✓</span> <strong>Verify with Truth Tables:</strong> After simplification, test a few inputs to ensure equivalence.</li>
          </ul>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>⚠️</span> Common Pitfalls
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Misidentifying Patterns:</strong> A·B + A'·B is NOT the consensus pattern—it simplifies to B using distributive law.</li>
            <li><strong>Applying Consensus Incorrectly:</strong> The term being eliminated must contain the other two variables' combination. Check carefully!</li>
            <li><strong>Forgetting Dual Forms:</strong> Every law has a dual. If you remember A·(B+C)=A·B+A·C, don't forget A+B·C=(A+B)·(A+C).</li>
            <li><strong>Over-simplifying:</strong> Make sure you don't accidentally change the function. Always verify with a truth table when in doubt.</li>
            <li><strong>Missing Factor Opportunities:</strong> Always look for common factors before applying other laws.</li>
          </ul>
        </div>

        {/* Best Practices */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>✅</span> Best Practices
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Create a Checklist:</strong> Before simplifying, scan for: common factors, complement pairs, consensus pattern, absorption opportunities.</li>
            <li><strong>Write Each Step:</strong> Document which identity you're applying. This helps catch errors and builds confidence.</li>
            <li><strong>Use Standard Notation:</strong> Be consistent with operators (· for AND, + for OR, ' for NOT).</li>
            <li><strong>Practice Pattern Recognition:</strong> The more expressions you simplify, the faster you'll recognize patterns.</li>
            <li><strong>Verify with Truth Tables:</strong> Always test your simplified expression against the original for a few input combinations.</li>
          </ul>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 border-l-8 border-teal-500">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📋 Mini Checklist</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Before moving to the next topic, ensure you can:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-400">
            <li>Recognize patterns that match each Boolean identity.</li>
            <li>Apply absorption, consensus, distributive, and complement laws correctly.</li>
            <li>Simplify expressions that require multiple identities in sequence.</li>
            <li>Explain which identity you used and why.</li>
            <li>Distinguish between similar-looking patterns (e.g., consensus vs distributive).</li>
            <li>Verify simplifications using truth tables.</li>
          </ul>
        </div>

        {/* Hint Section */}
        <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl p-6 border border-yellow-300 dark:border-yellow-700">
          <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2">
            <span>💭</span> Think About...
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Abhronila from Ichapur is working on a digital lock system. The unlock condition is:
            <br /><br />
            <span className="font-mono">Unlock = (Key·Code·Time) + (Key·Code·Override) + (Key·Time·Override) + (Code·Time·Override)</span>
            <br /><br />
            <strong className="text-yellow-800 dark:text-yellow-300">Can you simplify this expression?</strong>
            <br />
            Look for patterns: Do you see the consensus theorem? Can you factor out common terms?
            <br />
            What does the simplified expression tell you about how the lock actually works?
            <br /><br />
            <strong>Observe carefully:</strong> This is actually a majority function—the lock opens if at least two conditions are true!
          </p>
        </div>

        {/* Teacher's Note */}
        <div>
          <Teacher note={
            "🎓 **Teaching This Topic**\n\n" +
            "Pattern recognition is the key to fluent simplification. Students need to see many examples.\n\n" +
            "💡 **Teaching Strategy:** Use the pattern recognition guide as a quick reference. Have students identify which pattern matches before simplifying.\n\n" +
            "🔍 **Common Misunderstanding:** Students often memorize formulas but can't recognize them in complex expressions. Practice with varied examples.\n\n" +
            "📌 **Real-World Connection:** In industry, engineers develop an intuition for these patterns. They can look at a logic diagram and mentally simplify it.\n\n" +
            "🎯 **Advanced Insight:** The Consensus Theorem is particularly important—it appears frequently in real-world circuits and is often overlooked by beginners."
          } />
        </div>

        {/* Questions and Answers Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">📝 Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q1: What is the Absorption Law?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A + A·B = A and A·(A+B) = A. The larger term is absorbed by the smaller term.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q2: What is the Consensus Theorem?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A·B + A'·C + B·C = A·B + A'·C. The term B·C is redundant.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q3: How do I recognize when to use absorption?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Look for a variable appearing alone and also ANDed with something else in a sum, or a variable appearing alone and ORed with something else in a product.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q4: How do I recognize when to use consensus?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Look for two terms with a variable and its complement, and a third term that combines the other two variables.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q5: Simplify: A + A·B·C</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = A (Absorption Law)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q6: Simplify: A·(A + B + C)</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = A (Absorption Law)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q7: Simplify: A·B + A·C + B·C</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = A·B + A·C + B·C (cannot simplify further algebraically)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q8: Simplify: A·B + A'·C + B·C</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = A·B + A'·C (Consensus Theorem)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q9: Simplify: (A+B)·(A'+C)·(B+C)</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = (A+B)·(A'+C) (Consensus Theorem dual)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q10: What's the difference between absorption and consensus?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Absorption eliminates a term that is a superset of another term. Consensus eliminates a term that is the combination of two other terms.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q11: Simplify: X·Y + X·Y'</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = X·(Y+Y') = X·1 = X</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q12: Simplify: (X+Y)·(X+Y')</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = X + Y·Y' = X + 0 = X</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q13: How do I know which identity to apply first?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Generally: factor common terms, then look for complement pairs, then absorption, then consensus.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q14: Simplify: A·B' + A·C + B'·C</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = A·B' + A·C + B'·C (Consensus: A·B' + A·C + B'·C = A·B' + A·C)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q15: Simplify: (A+B')·(A+C)·(B'+C)</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = (A+B')·(A+C) (Consensus dual)</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q16: What is the dual of the Absorption Law?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A·(A+B) = A is the dual of A + A·B = A</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q17: Can all expressions be simplified using only these identities?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Many can, but some require Karnaugh Maps for optimal minimization, especially with 4+ variables.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q18: How do I verify my simplification is correct?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Create a truth table for the original and simplified expressions. They should match for all inputs.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q19: Simplify: A·B + A'·B + B·C</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: = (A + A')·B + B·C = 1·B + B·C = B + B·C = B (Absorption)</p>
            </div>
            <div className="pb-4">
              <p className="font-semibold">Q20: What's the most common mistake students make when simplifying?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Applying consensus incorrectly—they often try to eliminate terms that don't actually satisfy the pattern. Always verify the pattern matches exactly.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic15;