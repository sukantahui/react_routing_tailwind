import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Pseudocode definitions with line numbers for each algorithm
const ALGORITHM_CODES = {
  bubble: [
    { line: 1, text: "for i = 0 to n - 1:" },
    { line: 2, text: "  for j = 0 to n - i - 2:" },
    { line: 3, text: "    if array[j] > array[j + 1]:" },
    { line: 4, text: "      swap(array[j], array[j + 1])" },
    { line: 5, text: "  mark n - 1 - i as sorted" },
  ],
  selection: [
    { line: 1, text: "for i = 0 to n - 1:" },
    { line: 2, text: "  extremeIdx = i" },
    { line: 3, text: "  for j = i + 1 to n - 1:" },
    { line: 4, text: "    if array[j] < array[extremeIdx]:" },
    { line: 5, text: "      extremeIdx = j" },
    { line: 6, text: "  swap(array[i], array[extremeIdx])" },
  ],
  insertion: [
    { line: 1, text: "for i = 1 to n - 1:" },
    { line: 2, text: "  key = array[i], j = i - 1" },
    { line: 3, text: "  while j >= 0 and array[j] > key:" },
    { line: 4, text: "    array[j + 1] = array[j]" },
    { line: 5, text: "    j = j - 1" },
    { line: 6, text: "  array[j + 1] = key" },
  ],
  quick: [
    { line: 1, text: "quickSort(low, high):" },
    { line: 2, text: "  if low < high:" },
    { line: 3, text: "    pivotIdx = partition(low, high)" },
    { line: 4, text: "    quickSort(low, pivotIdx - 1)" },
    { line: 5, text: "    quickSort(pivotIdx + 1, high)" },
    { line: 6, text: "partition(low, high):" },
    { line: 7, text: "  pivot = array[high], i = low - 1" },
    { line: 8, text: "  for j = low to high - 1:" },
    { line: 9, text: "    if array[j] <= pivot:" },
    { line: 10, text: "      i++, swap(array[i], array[j])" },
    { line: 11, text: "  swap(array[i + 1], array[high])" },
  ],
  merge: [
    { line: 1, text: "mergeSort(left, right):" },
    { line: 2, text: "  if left < right:" },
    { line: 3, text: "    mid = (left + right) / 2" },
    { line: 4, text: "    mergeSort(left, mid)" },
    { line: 5, text: "    mergeSort(mid + 1, right)" },
    { line: 6, text: "    merge(left, mid, right)" },
    { line: 7, text: "merge(left, mid, right):" },
    { line: 8, text: "  compare left & right elements" },
    { line: 9, text: "  place smaller element into main array" },
  ],
};

export default function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(20);
  const [speed, setSpeed] = useState(200); // 10ms to 2000ms
  const [algorithm, setAlgorithm] = useState("bubble");
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' | 'desc'
  const [customInput, setCustomInput] = useState("");
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [activeRightTab, setActiveRightTab] = useState("code"); // 'code' | 'vars' | 'log'

  // Pre-recorded animation steps history
  const [steps, setSteps] = useState([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);

  const isPlayingRef = useRef(isPlaying);
  const speedRef = useRef(speed);
  const stepLogRef = useRef(null);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  // Audio Beep generator
  const playTone = (freq) => {
    if (!audioEnabled) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {}
  };

  // Compare helper considering asc/desc
  const shouldSwap = (val1, val2, order) => {
    return order === "asc" ? val1 > val2 : val1 < val2;
  };

  // =========================================================================
  // STEP GENERATOR FOR ALL ALGORITHMS (Includes line & vars for step tracking)
  // =========================================================================
  const generateSteps = (initialArr, algo, order) => {
    const arr = [...initialArr];
    const n = arr.length;
    const allSteps = [];
    let comps = 0;
    let swps = 0;
    const sorted = [];

    // Step 0: Initial state
    allSteps.push({
      array: [...arr],
      compareIndices: [],
      swapIndices: [],
      sortedIndices: [],
      comparisons: 0,
      swaps: 0,
      statusText: "Initial unsorted array state.",
      line: 1,
      vars: { n, order, algo: algo.toUpperCase() },
      stepType: "init",
    });

    if (algo === "bubble") {
      for (let i = 0; i < n; i++) {
        allSteps.push({
          array: [...arr],
          compareIndices: [],
          swapIndices: [],
          sortedIndices: [...sorted],
          comparisons: comps,
          swaps: swps,
          statusText: `Outer pass i = ${i}`,
          line: 1,
          vars: { i, n, sortedCount: sorted.length },
          stepType: "init",
        });

        for (let j = 0; j < n - i - 1; j++) {
          comps++;
          allSteps.push({
            array: [...arr],
            compareIndices: [j, j + 1],
            swapIndices: [],
            sortedIndices: [...sorted],
            comparisons: comps,
            swaps: swps,
            statusText: `Comparing array[${j}] (${arr[j]}) & array[${j + 1}] (${arr[j + 1]})`,
            line: 3,
            vars: { i, j, "arr[j]": arr[j], "arr[j+1]": arr[j + 1] },
            stepType: "compare",
          });

          if (shouldSwap(arr[j], arr[j + 1], order)) {
            swps++;
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;

            allSteps.push({
              array: [...arr],
              compareIndices: [j, j + 1],
              swapIndices: [j, j + 1],
              sortedIndices: [...sorted],
              comparisons: comps,
              swaps: swps,
              statusText: `Swapped array[${j}] & array[${j + 1}] (${arr[j + 1]} <-> ${arr[j]})`,
              line: 4,
              vars: { i, j, swapped: `${arr[j + 1]} <-> ${arr[j]}` },
              stepType: "swap",
            });
          }
        }
        sorted.push(n - 1 - i);
        allSteps.push({
          array: [...arr],
          compareIndices: [],
          swapIndices: [],
          sortedIndices: [...sorted],
          comparisons: comps,
          swaps: swps,
          statusText: `Element ${arr[n - 1 - i]} at index ${n - 1 - i} is now in final sorted position.`,
          line: 5,
          vars: { i, sortedIndex: n - 1 - i, sortedVal: arr[n - 1 - i] },
          stepType: "sorted",
        });
      }
    } else if (algo === "selection") {
      for (let i = 0; i < n; i++) {
        let extremeIdx = i;

        allSteps.push({
          array: [...arr],
          compareIndices: [i],
          swapIndices: [],
          sortedIndices: [...sorted],
          comparisons: comps,
          swaps: swps,
          statusText: `Pass i = ${i}: setting current extremeIdx = ${i} (val = ${arr[i]})`,
          line: 2,
          vars: { i, extremeIdx: i, extremeVal: arr[i] },
          stepType: "init",
        });

        for (let j = i + 1; j < n; j++) {
          comps++;
          allSteps.push({
            array: [...arr],
            compareIndices: [extremeIdx, j],
            swapIndices: [],
            sortedIndices: [...sorted],
            comparisons: comps,
            swaps: swps,
            statusText: `Comparing index ${j} (${arr[j]}) against current extreme index ${extremeIdx} (${arr[extremeIdx]})`,
            line: 4,
            vars: { i, j, extremeIdx, "arr[j]": arr[j], "arr[extremeIdx]": arr[extremeIdx] },
            stepType: "compare",
          });

          if (shouldSwap(arr[extremeIdx], arr[j], order)) {
            extremeIdx = j;
            allSteps.push({
              array: [...arr],
              compareIndices: [extremeIdx],
              swapIndices: [],
              sortedIndices: [...sorted],
              comparisons: comps,
              swaps: swps,
              statusText: `New extreme element found at index ${j} (val = ${arr[j]})`,
              line: 5,
              vars: { i, j, newExtremeIdx: j, extremeVal: arr[j] },
              stepType: "compare",
            });
          }
        }

        if (extremeIdx !== i) {
          swps++;
          let temp = arr[i];
          arr[i] = arr[extremeIdx];
          arr[extremeIdx] = temp;

          allSteps.push({
            array: [...arr],
            compareIndices: [],
            swapIndices: [i, extremeIdx],
            sortedIndices: [...sorted],
            comparisons: comps,
            swaps: swps,
            statusText: `Swapped extreme element at index ${extremeIdx} with index ${i}`,
            line: 6,
            vars: { i, extremeIdx, placedVal: arr[i] },
            stepType: "swap",
          });
        }
        sorted.push(i);
      }
    } else if (algo === "insertion") {
      sorted.push(0);
      for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;

        allSteps.push({
          array: [...arr],
          compareIndices: [i],
          swapIndices: [],
          sortedIndices: [...sorted],
          comparisons: comps,
          swaps: swps,
          statusText: `Picked key = ${key} at index ${i}`,
          line: 2,
          vars: { i, key, j: i - 1 },
          stepType: "init",
        });

        while (j >= 0 && shouldSwap(arr[j], key, order)) {
          comps++;
          swps++;
          allSteps.push({
            array: [...arr],
            compareIndices: [j],
            swapIndices: [],
            sortedIndices: [...sorted],
            comparisons: comps,
            swaps: swps,
            statusText: `Comparing array[${j}] (${arr[j]}) > key (${key})`,
            line: 4,
            vars: { i, key, j, "arr[j]": arr[j] },
            stepType: "compare",
          });

          arr[j + 1] = arr[j];

          allSteps.push({
            array: [...arr],
            compareIndices: [j, j + 1],
            swapIndices: [j, j + 1],
            sortedIndices: [...sorted],
            comparisons: comps,
            swaps: swps,
            statusText: `Shifted array[${j}] (${arr[j]}) right to index ${j + 1}`,
            line: 5,
            vars: { i, key, shiftedFrom: j, shiftedTo: j + 1 },
            stepType: "shift",
          });

          j--;
        }

        arr[j + 1] = key;
        sorted.push(i);

        allSteps.push({
          array: [...arr],
          compareIndices: [],
          swapIndices: [j + 1],
          sortedIndices: [...sorted],
          comparisons: comps,
          swaps: swps,
          statusText: `Inserted key (${key}) at position ${j + 1}`,
          line: 6,
          vars: { i, key, insertedAt: j + 1 },
          stepType: "insert",
        });
      }
    } else if (algo === "quick") {
      const partition = (low, high) => {
        let pivot = arr[high];
        let i = low - 1;

        allSteps.push({
          array: [...arr],
          compareIndices: [high],
          swapIndices: [],
          sortedIndices: [...sorted],
          comparisons: comps,
          swaps: swps,
          statusText: `Partitioning range [${low}...${high}]: Chosen pivot = ${pivot} at index ${high}`,
          line: 7,
          vars: { low, high, pivot, i: low - 1 },
          stepType: "pivot",
        });

        for (let j = low; j < high; j++) {
          comps++;
          allSteps.push({
            array: [...arr],
            compareIndices: [j, high],
            swapIndices: [],
            sortedIndices: [...sorted],
            comparisons: comps,
            swaps: swps,
            statusText: `Comparing array[${j}] (${arr[j]}) against pivot (${pivot})`,
            line: 9,
            vars: { low, high, j, "arr[j]": arr[j], pivot, i },
            stepType: "compare",
          });

          if (!shouldSwap(arr[j], pivot, order)) {
            i++;
            swps++;
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;

            allSteps.push({
              array: [...arr],
              compareIndices: [j, high],
              swapIndices: [i, j],
              sortedIndices: [...sorted],
              comparisons: comps,
              swaps: swps,
              statusText: `Element ${arr[i]} <= pivot (${pivot}): swapped array[${i}] & array[${j}]`,
              line: 10,
              vars: { low, high, j, i, swapped: `${arr[i]} <-> ${arr[j]}` },
              stepType: "swap",
            });
          }
        }

        swps++;
        let temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        sorted.push(i + 1);

        allSteps.push({
          array: [...arr],
          compareIndices: [],
          swapIndices: [i + 1, high],
          sortedIndices: [...sorted],
          comparisons: comps,
          swaps: swps,
          statusText: `Placed pivot (${arr[i + 1]}) into its sorted index ${i + 1}`,
          line: 11,
          vars: { low, high, pivotIndex: i + 1, pivotValue: arr[i + 1] },
          stepType: "swap",
        });

        return i + 1;
      };

      const quickSortHelper = (low, high) => {
        if (low < high) {
          allSteps.push({
            array: [...arr],
            compareIndices: [low, high],
            swapIndices: [],
            sortedIndices: [...sorted],
            comparisons: comps,
            swaps: swps,
            statusText: `quickSort call for sub-array range [${low}...${high}]`,
            line: 2,
            vars: { low, high },
            stepType: "divide",
          });

          let p = partition(low, high);
          quickSortHelper(low, p - 1);
          quickSortHelper(p + 1, high);
        } else if (low >= 0 && low < n) {
          sorted.push(low);
        }
      };

      quickSortHelper(0, n - 1);
    } else if (algo === "merge") {
      const mergeSortHelper = (l, r) => {
        if (l >= r) return;
        const m = Math.floor((l + r) / 2);

        allSteps.push({
          array: [...arr],
          compareIndices: [l, r],
          swapIndices: [],
          sortedIndices: [...sorted],
          comparisons: comps,
          swaps: swps,
          statusText: `Dividing range [${l}...${r}] at mid index ${m}`,
          line: 3,
          vars: { left: l, right: r, mid: m },
          stepType: "divide",
        });

        mergeSortHelper(l, m);
        mergeSortHelper(m + 1, r);

        // Merge logic
        let leftArr = arr.slice(l, m + 1);
        let rightArr = arr.slice(m + 1, r + 1);
        let i = 0,
          j = 0,
          k = l;

        while (i < leftArr.length && j < rightArr.length) {
          comps++;
          allSteps.push({
            array: [...arr],
            compareIndices: [l + i, m + 1 + j],
            swapIndices: [],
            sortedIndices: [...sorted],
            comparisons: comps,
            swaps: swps,
            statusText: `Comparing left element ${leftArr[i]} and right element ${rightArr[j]}`,
            line: 8,
            vars: { left: l, mid: m, right: r, "left[i]": leftArr[i], "right[j]": rightArr[j] },
            stepType: "compare",
          });

          if (!shouldSwap(leftArr[i], rightArr[j], order)) {
            arr[k] = leftArr[i];
            i++;
          } else {
            arr[k] = rightArr[j];
            j++;
          }
          swps++;
          allSteps.push({
            array: [...arr],
            compareIndices: [],
            swapIndices: [k],
            sortedIndices: [...sorted],
            comparisons: comps,
            swaps: swps,
            statusText: `Placed value ${arr[k]} into index ${k}`,
            line: 9,
            vars: { index: k, placedVal: arr[k] },
            stepType: "swap",
          });
          k++;
        }

        while (i < leftArr.length) {
          arr[k] = leftArr[i];
          swps++;
          allSteps.push({
            array: [...arr],
            compareIndices: [],
            swapIndices: [k],
            sortedIndices: [...sorted],
            comparisons: comps,
            swaps: swps,
            statusText: `Copying remaining left element ${leftArr[i]} into index ${k}`,
            line: 9,
            vars: { index: k, placedVal: leftArr[i] },
            stepType: "swap",
          });
          i++;
          k++;
        }

        while (j < rightArr.length) {
          arr[k] = rightArr[j];
          swps++;
          allSteps.push({
            array: [...arr],
            compareIndices: [],
            swapIndices: [k],
            sortedIndices: [...sorted],
            comparisons: comps,
            swaps: swps,
            statusText: `Copying remaining right element ${rightArr[j]} into index ${k}`,
            line: 9,
            vars: { index: k, placedVal: rightArr[j] },
            stepType: "swap",
          });
          j++;
          k++;
        }
      };

      mergeSortHelper(0, n - 1);
    }

    // Final completed state
    allSteps.push({
      array: [...arr],
      compareIndices: [],
      swapIndices: [],
      sortedIndices: Array.from({ length: n }, (_, i) => i),
      comparisons: comps,
      swaps: swps,
      statusText: `Sorting Complete! Total steps: ${allSteps.length - 1} (${comps} comparisons, ${swps} swaps)`,
      line: ALGORITHM_CODES[algo] ? ALGORITHM_CODES[algo].length : 1,
      vars: { status: "FINISHED", comparisons: comps, swaps: swps },
      stepType: "complete",
    });

    return allSteps;
  };

  // Re-generate array and steps on config change
  const initializeArray = (newArr) => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    setArray(newArr);
    const generated = generateSteps(newArr, algorithm, sortOrder);
    setSteps(generated);
    setCurrentStepIdx(0);
  };

  // Random array generator
  const generateRandomArray = () => {
    const newArr = [];
    for (let i = 0; i < arraySize; i++) {
      newArr.push(Math.floor(Math.random() * 270) + 30);
    }
    initializeArray(newArr);
  };

  // Presets
  const generateNearlySorted = () => {
    const arr = Array.from({ length: arraySize }, (_, i) => Math.floor(30 + (i * 260) / arraySize));
    if (arr.length > 5) {
      let temp = arr[2];
      arr[2] = arr[5];
      arr[5] = temp;
    }
    initializeArray(arr);
  };

  const generateReversed = () => {
    const arr = Array.from({ length: arraySize }, (_, i) => Math.floor(300 - (i * 260) / arraySize));
    initializeArray(arr);
  };

  const generateFewUnique = () => {
    const uniqueValues = [50, 130, 210, 280];
    const arr = Array.from({ length: arraySize }, () => uniqueValues[Math.floor(Math.random() * uniqueValues.length)]);
    initializeArray(arr);
  };

  const handleCustomInputApply = () => {
    const parsed = customInput
      .split(/[\s,]+/)
      .map((num) => parseInt(num, 10))
      .filter((num) => !isNaN(num) && num > 0);

    if (parsed.length < 2) {
      alert("Please enter at least 2 valid positive numbers separated by commas or spaces.");
      return;
    }

    const maxVal = Math.max(...parsed);
    const scaled = parsed.map((val) => Math.max(30, Math.min(300, Math.round((val / (maxVal || 1)) * 280))));
    setArraySize(scaled.length);
    initializeArray(scaled);
  };

  useEffect(() => {
    generateRandomArray();
  }, [arraySize, algorithm, sortOrder]);

  // Auto-play interval loop
  useEffect(() => {
    let timer = null;
    if (isPlaying && currentStepIdx < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStepIdx((prev) => {
          const next = prev + 1;
          if (next >= steps.length - 1) {
            setIsPlaying(false);
          }
          return next;
        });
      }, speed);
    } else if (currentStepIdx >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIdx, speed, steps]);

  // Current step state
  const currentStep = steps[currentStepIdx] || {
    array: array,
    compareIndices: [],
    swapIndices: [],
    sortedIndices: [],
    comparisons: 0,
    swaps: 0,
    statusText: "Ready",
    line: 1,
    vars: {},
    stepType: "init",
  };

  // Play audio on step change
  useEffect(() => {
    if (currentStep.compareIndices.length > 0 && currentStep.array[currentStep.compareIndices[0]]) {
      playTone(200 + currentStep.array[currentStep.compareIndices[0]]);
    }
  }, [currentStepIdx]);

  // Auto scroll step log to keep current step visible
  useEffect(() => {
    if (stepLogRef.current && activeRightTab === "log") {
      const activeEl = stepLogRef.current.querySelector(`[data-step-idx="${currentStepIdx}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [currentStepIdx, activeRightTab]);

  // Manual Navigation Actions
  const handleStepForward = () => {
    setIsPlaying(false);
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx(currentStepIdx + 1);
    }
  };

  const handleStepBackward = () => {
    setIsPlaying(false);
    if (currentStepIdx > 0) {
      setCurrentStepIdx(currentStepIdx - 1);
    }
  };

  const handleTogglePlay = () => {
    if (currentStepIdx >= steps.length - 1) {
      setCurrentStepIdx(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIdx(0);
  };

  // Current Pseudocode
  const currentCodeLines = ALGORITHM_CODES[algorithm] || [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 backdrop-blur border border-slate-800 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-cyan-500/20 text-cyan-400 rounded-xl border border-cyan-500/30 text-xl">
              <i className="bi bi-code-slash"></i>
            </span>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
                Sorting Algorithm Visualizer &amp; Code Tracker
              </h1>
              <p className="text-xs text-slate-400">
                Line-by-line algorithm execution, live variables inspector, step history timeline &amp; audio feedback
              </p>
            </div>
          </div>

          {/* Action Player Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Step Backward (⏮) */}
            <button
              onClick={handleStepBackward}
              disabled={currentStepIdx === 0}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-1.5 transition"
              title="Step Backward (⏮)"
            >
              <i className="bi bi-skip-start-fill text-sm"></i> Step Back
            </button>

            {/* Play / Pause Toggle */}
            <button
              onClick={handleTogglePlay}
              className={`px-5 py-2 text-sm font-semibold rounded-xl shadow-lg flex items-center gap-2 transition ${
                isPlaying
                  ? "bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 shadow-amber-500/10"
                  : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-500/25"
              }`}
            >
              <i className={`bi ${isPlaying ? "bi-pause-fill" : "bi-play-fill"} text-lg`}></i>
              {isPlaying ? "Pause" : currentStepIdx >= steps.length - 1 ? "Replay" : "Auto Play"}
            </button>

            {/* Step Forward (⏭) */}
            <button
              onClick={handleStepForward}
              disabled={currentStepIdx >= steps.length - 1}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-1.5 transition"
              title="Step Forward (⏭)"
            >
              Next Step <i className="bi bi-skip-end-fill text-sm"></i>
            </button>

            {/* Reset */}
            <button
              onClick={handleReset}
              className="px-3.5 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-semibold rounded-xl border border-rose-500/40 flex items-center gap-1.5 transition"
              title="Reset to Step 0"
            >
              <i className="bi bi-arrow-counterclockwise"></i> Reset
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              className={`px-3 py-2 text-xs font-semibold rounded-xl border flex items-center gap-1.5 transition ${
                audioEnabled
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                  : "bg-slate-800/80 text-slate-400 border-slate-700 hover:text-slate-200"
              }`}
            >
              <i className={`bi ${audioEnabled ? "bi-volume-up-fill" : "bi-volume-mute-fill"}`}></i>
            </button>
          </div>
        </div>

        {/* Controls Toolbar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Select Algorithm */}
          <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-xl space-y-2">
            <label className="text-xs font-semibold text-slate-400 block">Algorithm</label>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-lg p-2 focus:border-cyan-500 outline-none cursor-pointer"
            >
              <option value="bubble">Bubble Sort — O(N²)</option>
              <option value="selection">Selection Sort — O(N²)</option>
              <option value="insertion">Insertion Sort — O(N²)</option>
              <option value="quick">Quick Sort — O(N log N)</option>
              <option value="merge">Merge Sort — O(N log N)</option>
            </select>
          </div>

          {/* Sort Order */}
          <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-xl space-y-2">
            <label className="text-xs font-semibold text-slate-400 block">Direction</label>
            <div className="flex rounded-lg bg-slate-950 p-1 border border-slate-800">
              <button
                onClick={() => setSortOrder("asc")}
                className={`flex-1 py-1 text-xs font-semibold rounded-md transition ${
                  sortOrder === "asc"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Ascending (↑)
              </button>
              <button
                onClick={() => setSortOrder("desc")}
                className={`flex-1 py-1 text-xs font-semibold rounded-md transition ${
                  sortOrder === "desc"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Descending (↓)
              </button>
            </div>
          </div>

          {/* Speed Slider (10ms to 2000ms - Ultra Slow) */}
          <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-xl space-y-2">
            <label className="text-xs font-semibold text-slate-400 flex justify-between">
              <span>Step Delay (Speed)</span>
              <span className="text-cyan-400 font-mono">
                {speed >= 1000 ? `${(speed / 1000).toFixed(1)}s` : `${speed}ms`}
              </span>
            </label>
            <input
              type="range"
              min="10"
              max="2000"
              step="50"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full accent-cyan-400 bg-slate-950 cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-slate-500 font-mono">
              <span>Fast (10ms)</span>
              <span>Ultra Slow (2.0s)</span>
            </div>
          </div>

          {/* Size Slider */}
          <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-xl space-y-2">
            <label className="text-xs font-semibold text-slate-400 flex justify-between">
              <span>Array Size</span>
              <span className="text-cyan-400 font-mono">{arraySize}</span>
            </label>
            <input
              type="range"
              min="8"
              max="40"
              value={arraySize}
              onChange={(e) => setArraySize(Number(e.target.value))}
              className="w-full accent-cyan-400 bg-slate-950 cursor-pointer"
            />
          </div>

          {/* Metrics & Step Counter */}
          <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-xl flex items-center justify-around">
            <div className="text-center">
              <span className="text-xs text-slate-400 block">Step Progress</span>
              <span className="text-sm font-bold text-cyan-300 font-mono">
                {currentStepIdx} / {Math.max(0, steps.length - 1)}
              </span>
            </div>
            <div className="h-8 w-px bg-slate-800"></div>
            <div className="text-center">
              <span className="text-xs text-slate-400 block">Comps / Swaps</span>
              <span className="text-sm font-bold text-amber-400 font-mono">
                {currentStep.comparisons} / {currentStep.swaps}
              </span>
            </div>
          </div>
        </div>

        {/* Array Presets & Custom Input Toolbar */}
        <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-slate-400">Presets:</span>
            <button
              onClick={generateRandomArray}
              className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-xs text-slate-300 rounded-lg border border-slate-800 transition"
            >
              <i className="bi bi-shuffle"></i> Random
            </button>
            <button
              onClick={generateNearlySorted}
              className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-xs text-slate-300 rounded-lg border border-slate-800 transition"
            >
              Nearly Sorted
            </button>
            <button
              onClick={generateReversed}
              className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-xs text-slate-300 rounded-lg border border-slate-800 transition"
            >
              Reversed
            </button>
            <button
              onClick={generateFewUnique}
              className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-xs text-slate-300 rounded-lg border border-slate-800 transition"
            >
              Few Unique
            </button>
          </div>

          {/* Custom Input */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="e.g. 45, 12, 89, 33, 67"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg px-3 py-1.5 w-full md:w-60 focus:border-cyan-500 outline-none"
            />
            <button
              onClick={handleCustomInputApply}
              className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-semibold rounded-lg border border-cyan-500/40 whitespace-nowrap transition"
            >
              Apply Array
            </button>
          </div>
        </div>

        {/* Main 2-Column Grid: Visualizer Canvas + Algorithm Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2-Columns: Canvas & Controls */}
          <div className="lg:col-span-2 space-y-4">
            {/* Interactive Playback Banner attached to Canvas */}
            <div className="bg-slate-900 border border-slate-800 border-b-0 p-4 rounded-t-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
              {/* Live Step Commentary & Progress */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <span
                  className={`w-3 h-3 rounded-full flex-shrink-0 ${
                    isPlaying ? "bg-cyan-400 animate-ping" : "bg-slate-500"
                  }`}
                ></span>
                <div className="text-xs font-mono text-cyan-300 truncate">
                  {currentStep.statusText}
                </div>
              </div>

              {/* Player Buttons */}
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <button
                  onClick={handleStepBackward}
                  disabled={currentStepIdx === 0}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-1.5 transition"
                  title="Step Backward (⏮)"
                >
                  <i className="bi bi-skip-start-fill text-sm"></i> Step Back
                </button>

                <button
                  onClick={handleTogglePlay}
                  className={`px-6 py-2 text-sm font-bold rounded-xl shadow-xl flex items-center gap-2 transition transform active:scale-95 ${
                    isPlaying
                      ? "bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 shadow-amber-500/10"
                      : "bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-500/30"
                  }`}
                >
                  <i className={`bi ${isPlaying ? "bi-pause-fill" : "bi-play-fill"} text-xl`}></i>
                  {isPlaying ? "Pause" : currentStepIdx >= steps.length - 1 ? "Replay" : "Start Sorting"}
                </button>

                <button
                  onClick={handleStepForward}
                  disabled={currentStepIdx >= steps.length - 1}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-1.5 transition"
                  title="Step Forward (⏭)"
                >
                  Next Step <i className="bi bi-skip-end-fill text-sm"></i>
                </button>

                <button
                  onClick={handleReset}
                  className="px-3.5 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-semibold rounded-xl border border-rose-500/40 flex items-center gap-1.5 transition"
                  title="Reset to Step 0"
                >
                  <i className="bi bi-arrow-counterclockwise"></i> Reset
                </button>
              </div>
            </div>

            {/* Visualization Canvas */}
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-b-2xl shadow-inner min-h-[380px] flex items-end justify-center gap-1.5 md:gap-2">
              {currentStep.array.map((val, idx) => {
                let bgColor = "#0284c7"; // sky-600 (default)
                let borderColor = "#38bdf8";
                let shadowColor = "rgba(2, 132, 199, 0.4)";

                if (currentStep.sortedIndices.includes(idx)) {
                  bgColor = "#10b981"; // emerald-500
                  borderColor = "#6ee7b7";
                  shadowColor = "rgba(16, 185, 129, 0.6)";
                } else if (currentStep.swapIndices.includes(idx)) {
                  bgColor = "#f43f5e"; // rose-500
                  borderColor = "#fca5a5";
                  shadowColor = "rgba(244, 63, 94, 0.8)";
                } else if (currentStep.compareIndices.includes(idx)) {
                  bgColor = "#f59e0b"; // amber-500
                  borderColor = "#fde047";
                  shadowColor = "rgba(245, 158, 11, 0.8)";
                }

                return (
                  <motion.div
                    key={idx}
                    layout
                    transition={{ duration: 0.12 }}
                    className="flex-1 flex flex-col items-center gap-1 group relative justify-end"
                  >
                    <div
                      style={{
                        height: `${val}px`,
                        backgroundColor: bgColor,
                        borderTop: `2px solid ${borderColor}`,
                        borderRadius: "4px 4px 0 0",
                        boxShadow: `0 2px 8px ${shadowColor}`,
                        width: "100%",
                      }}
                      className="transition-all duration-150"
                    ></div>
                    {arraySize <= 30 && (
                      <span className="text-[10px] font-mono text-slate-400 hidden md:block">
                        {val}
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 text-xs text-slate-400 flex-wrap pt-2">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded" style={{ backgroundColor: "#0284c7", border: "1px solid #38bdf8" }}></span>
                <span>Unsorted</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded" style={{ backgroundColor: "#f59e0b", border: "1px solid #fde047" }}></span>
                <span>Comparing</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded" style={{ backgroundColor: "#f43f5e", border: "1px solid #fca5a5" }}></span>
                <span>Swapping / Moving</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded" style={{ backgroundColor: "#10b981", border: "1px solid #6ee7b7" }}></span>
                <span>Sorted</span>
              </div>
            </div>
          </div>

          {/* Right Column: Code Tracker & Variables Inspector Panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col space-y-4 shadow-xl">
            {/* Right Panel Tabs */}
            <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800">
              <button
                onClick={() => setActiveRightTab("code")}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition ${
                  activeRightTab === "code"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <i className="bi bi-code-square"></i> Code Step
              </button>

              <button
                onClick={() => setActiveRightTab("vars")}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition ${
                  activeRightTab === "vars"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <i className="bi bi-brackets"></i> Variables
              </button>

              <button
                onClick={() => setActiveRightTab("log")}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition ${
                  activeRightTab === "log"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <i className="bi bi-list-task"></i> Step History
              </button>
            </div>

            {/* TAB 1: Code Panel with Line Highlighting */}
            {activeRightTab === "code" && (
              <div className="flex-1 flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <i className="bi bi-cpu text-cyan-400"></i> {algorithm.toUpperCase()} Pseudocode
                  </span>
                  <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/20">
                    Line {currentStep.line || 1}
                  </span>
                </div>

                <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 font-mono text-xs space-y-1 overflow-x-auto shadow-inner">
                  {currentCodeLines.map((lineObj) => {
                    const isActive = currentStep.line === lineObj.line;
                    return (
                      <div
                        key={lineObj.line}
                        className={`flex items-center gap-3 px-2 py-1 rounded transition-all ${
                          isActive
                            ? "bg-cyan-500/20 border-l-4 border-cyan-400 text-cyan-200 font-bold shadow-sm"
                            : "text-slate-400 hover:text-slate-300 opacity-80"
                        }`}
                      >
                        <span className="w-5 text-right text-[10px] text-slate-600 select-none">
                          {lineObj.line}
                        </span>
                        <pre className="font-mono text-xs whitespace-pre">{lineObj.text}</pre>
                      </div>
                    );
                  })}
                </div>

                {/* Step Context Explanation Card */}
                <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
                    Current Execution Explanation
                  </span>
                  <p className="text-xs text-cyan-300 font-sans leading-relaxed">
                    {currentStep.statusText}
                  </p>
                </div>
              </div>
            )}

            {/* TAB 2: Live Variables Inspector */}
            {activeRightTab === "vars" && (
              <div className="flex-1 flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <i className="bi bi-braces text-amber-400"></i> Variable State Inspector
                  </span>
                  <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">
                    Step {currentStepIdx}
                  </span>
                </div>

                <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 space-y-2 max-h-72 overflow-y-auto font-mono text-xs">
                  {Object.entries(currentStep.vars || {}).length === 0 ? (
                    <div className="text-slate-500 text-xs text-center py-4">No variable data for step</div>
                  ) : (
                    Object.entries(currentStep.vars || {}).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between bg-slate-900/60 p-2 rounded border border-slate-800/60"
                      >
                        <span className="text-amber-400 font-semibold">{key}</span>
                        <span className="text-slate-200 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                          {String(value)}
                        </span>
                      </div>
                    ))
                  )}
                </div>

                {/* Compare / Swap Indices Info */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Compare Pair:</span>
                    <span className="text-amber-300 font-semibold">
                      {currentStep.compareIndices.length > 0
                        ? `[${currentStep.compareIndices.join(", ")}]`
                        : "None"}
                    </span>
                  </div>

                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Swap / Move Pair:</span>
                    <span className="text-rose-400 font-semibold">
                      {currentStep.swapIndices.length > 0
                        ? `[${currentStep.swapIndices.join(", ")}]`
                        : "None"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Step History Timeline Log */}
            {activeRightTab === "log" && (
              <div className="flex-1 flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <i className="bi bi-clock-history text-cyan-400"></i> Execution Trace Log
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {steps.length} total steps
                  </span>
                </div>

                <div
                  ref={stepLogRef}
                  className="bg-slate-950 rounded-xl p-2 border border-slate-800 space-y-1.5 max-h-72 overflow-y-auto text-xs"
                >
                  {steps.map((s, idx) => {
                    const isCurrent = idx === currentStepIdx;
                    return (
                      <div
                        key={idx}
                        data-step-idx={idx}
                        onClick={() => {
                          setIsPlaying(false);
                          setCurrentStepIdx(idx);
                        }}
                        className={`p-2 rounded-lg border transition cursor-pointer flex items-start gap-2 ${
                          isCurrent
                            ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-200 shadow-sm"
                            : "bg-slate-900/40 border-slate-800/80 text-slate-400 hover:bg-slate-800/60"
                        }`}
                      >
                        <span className="font-mono text-[10px] bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800 text-slate-400 flex-shrink-0">
                          #{idx}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] truncate font-mono">{s.statusText}</p>
                          <div className="flex items-center gap-2 mt-0.5 text-[9px] text-slate-500">
                            <span>Line {s.line || 1}</span>
                            <span>•</span>
                            <span>{s.stepType || "step"}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
