import React, { useState, useEffect } from 'react';
import { X, TestTube, CheckCircle2, XCircle, Play } from 'lucide-react';
import {
  calculateCycleLengths,
  calculateAverageCycleLength,
  calculateCycleStats,
  estimateOvulation,
  calculateFertileWindow,
  generatePredictedCycles,
} from '../../utils/cycleCalculations';

export default function CalculationTestSuite({ isOpen, onClose }) {
  const [testResults, setTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const runAllTests = () => {
    setIsRunning(true);
    const results = [];

    const assert = (name, condition, expectedText, actualText) => {
      results.push({
        name,
        passed: Boolean(condition),
        expected: String(expectedText),
        actual: String(actualText),
      });
    };

    try {
      // Test 1: Single Period Input
      const t1Stats = calculateCycleStats(['2026-01-01']);
      assert(
        'Single Period Input (No completed cycles)',
        t1Stats.numCompletedCycles === 0 && t1Stats.averageCycleLength === 28,
        'Completed = 0, Avg = 28',
        `Completed = ${t1Stats.numCompletedCycles}, Avg = ${t1Stats.averageCycleLength}`
      );

      // Test 2: Standard 28-Day Cycle Input (Two Dates)
      const t2Stats = calculateCycleStats(['2026-01-01', '2026-01-29']);
      assert(
        '28-Day Cycle Calculation',
        t2Stats.numCompletedCycles === 1 && t2Stats.averageCycleLength === 28,
        'Completed = 1, Avg = 28',
        `Completed = ${t2Stats.numCompletedCycles}, Avg = ${t2Stats.averageCycleLength}`
      );

      // Test 3: Mixed 27/28/30-Day Cycles
      const t3Stats = calculateCycleStats(['2026-01-01', '2026-01-28', '2026-02-25', '2026-03-27']);
      // Intervals: 27, 28, 30 days -> sum = 85 / 3 = 28.33 -> rounded 28
      assert(
        'Mixed 27/28/30-Day Cycles Average',
        t3Stats.averageCycleLength === 28 && t3Stats.shortestCycle === 27 && t3Stats.longestCycle === 30,
        'Avg = 28, Shortest = 27, Longest = 30',
        `Avg = ${t3Stats.averageCycleLength}, Shortest = ${t3Stats.shortestCycle}, Longest = ${t3Stats.longestCycle}`
      );

      // Test 4: Year Boundary Transition (Dec -> Jan)
      const t4Lengths = calculateCycleLengths(['2025-12-05', '2026-01-02']);
      assert(
        'December -> January Year Transition',
        t4Lengths[0]?.length === 28,
        'Interval = 28 days',
        `Interval = ${t4Lengths[0]?.length} days`
      );

      // Test 5: February & Leap Year (2028 is a leap year)
      const t5Lengths = calculateCycleLengths(['2028-02-01', '2028-03-01']);
      assert(
        'Leap Year Feb 2028 (29 Days in Feb)',
        t5Lengths[0]?.length === 29,
        'Interval = 29 days',
        `Interval = ${t5Lengths[0]?.length} days`
      );

      // Test 6: Ovulation & Fertile Window Calculation
      // Next period = 2026-05-15. Luteal phase = 14. Ovulation = May 1
      const ovDate = estimateOvulation('2026-05-15', 14);
      const fertile = calculateFertileWindow(ovDate, 5, 1);
      assert(
        'Ovulation & Fertile Window Offset',
        ovDate === '2026-05-01' && fertile.start === '2026-04-26' && fertile.end === '2026-05-02',
        'Ovulation = 2026-05-01, Fertile = 2026-04-26 to 2026-05-02',
        `Ovulation = ${ovDate}, Fertile = ${fertile.start} to ${fertile.end}`
      );

      // Test 7: Recursive Future Predictions (3 Cycles)
      const predictions = generatePredictedCycles('2026-01-01', 28, {
        periodDuration: 5,
        lutealPhaseLength: 14,
        predictionMonths: 3,
      });
      assert(
        'Recursive 3-Month Predictions',
        predictions.length >= 3 && predictions[0].startDate === '2026-01-29',
        'Pred 1 Start = 2026-01-29',
        `Pred 1 Start = ${predictions[0]?.startDate}`
      );

      // Test 8: Custom Manual Average Cycle Override
      const t8Stats = calculateCycleStats(['2026-01-01', '2026-01-29'], {
        useCustomAverageCycle: true,
        averageCycleLength: 32,
      });
      assert(
        'Custom Manual Average Cycle Override (32 Days)',
        t8Stats.averageCycleLength === 32 && t8Stats.isCustomAverage === true,
        'Avg = 32, Custom = true',
        `Avg = ${t8Stats.averageCycleLength}, Custom = ${t8Stats.isCustomAverage}`
      );
    } catch (err) {
      assert('Test Execution Crash', false, 'Clean execution', err.message);
    } finally {
      setTestResults(results);
      setIsRunning(false);
    }
  };

  useEffect(() => {
    if (isOpen && testResults.length === 0) {
      runAllTests();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const passedCount = testResults.filter((t) => t.passed).length;
  const totalCount = testResults.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div
        className="bg-slate-900 border border-slate-800 w-full max-w-xl rounded-3xl p-6 shadow-2xl space-y-5 relative text-slate-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          aria-label="Close test suite modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 pr-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-sky-500/10 text-sky-400 rounded-2xl border border-sky-500/20">
              <TestTube className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white tracking-tight">
                Calculation Engine Unit Tests
              </h3>
              <p className="text-xs text-slate-400">
                Independent test suite verifying pure date &amp; cycle math functions.
              </p>
            </div>
          </div>

          <button
            onClick={runAllTests}
            disabled={isRunning}
            className="px-3.5 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Play className="w-3.5 h-3.5" /> Re-run
          </button>
        </div>

        {/* Score Banner */}
        <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-300">Test Execution Status:</span>
          <span
            className={`font-mono font-bold px-3 py-1 rounded-full border ${
              passedCount === totalCount
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
            }`}
          >
            {passedCount} / {totalCount} Passed
          </span>
        </div>

        {/* Test Results List */}
        <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1 text-xs font-mono">
          {testResults.map((t, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border flex items-start justify-between gap-3 ${
                t.passed
                  ? 'bg-slate-950/60 border-slate-800 text-slate-300'
                  : 'bg-rose-950/40 border-rose-800/40 text-rose-200'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-sans font-bold">
                  {t.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  )}
                  <span>{t.name}</span>
                </div>
                <div className="text-[11px] text-slate-400 space-y-0.5 pl-6">
                  <p>Expected: {t.expected}</p>
                  <p className={t.passed ? 'text-emerald-400/90' : 'text-rose-300'}>
                    Actual:   {t.actual}
                  </p>
                </div>
              </div>

              <span
                className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded font-sans border shrink-0 ${
                  t.passed
                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                    : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                }`}
              >
                {t.passed ? 'PASS' : 'FAIL'}
              </span>
            </div>
          ))}
        </div>

        {/* Close Button */}
        <div className="flex justify-end pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-bold text-xs transition-colors"
          >
            Close Tests
          </button>
        </div>
      </div>
    </div>
  );
}
