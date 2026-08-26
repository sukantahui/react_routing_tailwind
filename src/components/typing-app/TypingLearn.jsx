import React, { Component } from "react";
import lessonsData from "./typing-lessons.json";

const LESSONS = lessonsData;

// ===============================
// 🖐 Touch Typing Finger Mapping
// ===============================
const FINGER_MAP = {
  leftPinky: "qaz",
  leftRing: "wsx",
  leftMiddle: "edc",
  leftIndex: "rfvtgb",
  rightIndex: "yhnujm",
  rightMiddle: "ik,",
  rightRing: "ol.",
  rightPinky: "p;",
  thumbs: " ",
};

const FINGER_LABELS = {
  leftPinky: "Left Pinky",
  leftRing: "Left Ring",
  leftMiddle: "Left Middle",
  leftIndex: "Left Index",
  rightIndex: "Right Index",
  rightMiddle: "Right Middle",
  rightRing: "Right Ring",
  rightPinky: "Right Pinky",
  thumbs: "Thumb (Space)",
};

// ===============================
// 🎵 Sound Feedback (Web Audio)
// ===============================
const playSound = (type) => {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.type = "sine";
    if (type === "correct") {
      oscillator.frequency.value = 800;
      gainNode.gain.value = 0.08;
    } else if (type === "wrong") {
      oscillator.frequency.value = 200;
      gainNode.gain.value = 0.1;
    }
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.08);
  } catch (e) {}
};

export default class TypingLearn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLessonIndex: 0,
      input: "",
      started: false,
      correctChars: 0,
      totalChars: 0,
      timer: 0,
      timerRunning: false,
      lessonCompleted: false,
      showCompletionModal: false,
      lastResult: null,
      totalXP: 0,
      level: 1,
      completedLessonsCount: 0,
      totalPracticeTime: 0,
      streak: 0,
      weakKeys: [],
      sessionMistakes: {},
      soundEnabled: true,
      completedLessonIds: [],
      performanceRecords: [],
      showRecordsModal: false,
      sortField: "date",
      sortDirection: "desc",
      recordsFilter: "",
    };
  }

  // ------------------------------------------------
  // Lifecycle
  // ------------------------------------------------
  componentDidMount() {
    this.loadGlobalStats();
    this.loadSoundPreference();
    this.loadCompletedLessons();
    this.loadPerformanceRecords();
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  // ------------------------------------------------
  // Key handler (Escape to close modals)
  // ------------------------------------------------
  handleKeyDown = (e) => {
    if (e.key === "Escape") {
      if (this.state.showCompletionModal) {
        this.handleCloseModal();
      }
      if (this.state.showRecordsModal) {
        this.toggleRecordsModal();
      }
    }
  };

  // ------------------------------------------------
  // Helpers (same as before)
  // ------------------------------------------------
  getCurrentLesson = () => LESSONS[this.state.currentLessonIndex];
  formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };
  formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  computeWeakKeys = (mistakeMap) => {
    const entries = Object.entries(mistakeMap || {});
    if (!entries.length) return [];
    entries.sort((a, b) => b[1] - a[1]);
    return entries.slice(0, 5).map(([key]) => key);
  };
  getFingerForChar = (char) => {
    if (!char) return null;
    const c = char.toLowerCase();
    for (const finger in FINGER_MAP) {
      if (FINGER_MAP[finger].includes(c)) return FINGER_LABELS[finger];
    }
    return null;
  };
  getFingerKeyForChar = (char) => {
    if (!char) return null;
    const c = char.toLowerCase();
    for (const finger in FINGER_MAP) {
      if (FINGER_MAP[finger].includes(c)) return finger;
    }
    return null;
  };
  isCorrectFingerUsed = (typed, expected) => {
    if (!typed || !expected || typed !== expected) return null;
    return this.getFingerForChar(typed) === this.getFingerForChar(expected);
  };
  loadSoundPreference = () => {
    try {
      const pref = localStorage.getItem("typingLearn_soundEnabled");
      if (pref !== null) this.setState({ soundEnabled: pref === "true" });
    } catch (e) {}
  };
  saveSoundPreference = (enabled) => {
    try {
      localStorage.setItem("typingLearn_soundEnabled", String(enabled));
    } catch (e) {}
  };
  loadCompletedLessons = () => {
    const completed = [];
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("typingLearn_completed_")) {
          const id = parseInt(key.replace("typingLearn_completed_", ""), 10);
          if (!isNaN(id)) completed.push(id);
        }
      }
    } catch (e) {}
    this.setState({ completedLessonIds: completed });
  };
  loadGlobalStats = () => {
    let totalXP = 0,
      totalPracticeTime = 0,
      completedLessonsCount = 0,
      streak = 0,
      weakKeys = [];
    try {
      const xp = localStorage.getItem("typingLearn_totalXP");
      const tt = localStorage.getItem("typingLearn_totalTime");
      const cl = localStorage.getItem("typingLearn_completedLessons");
      const st = localStorage.getItem("typingLearn_streak");
      const mm = localStorage.getItem("typingLearn_mistakeMap");
      if (xp) totalXP = parseInt(xp, 10) || 0;
      if (tt) totalPracticeTime = parseInt(tt, 10) || 0;
      if (cl) completedLessonsCount = parseInt(cl, 10) || 0;
      if (st) streak = parseInt(st, 10) || 0;
      let mistakeMap = {};
      if (mm) {
        try {
          mistakeMap = JSON.parse(mm) || {};
        } catch (e) {
          mistakeMap = {};
        }
      }
      weakKeys = this.computeWeakKeys(mistakeMap);
    } catch (e) {}
    const level = 1 + Math.floor(totalXP / 500);
    this.setState({
      totalXP,
      totalPracticeTime,
      completedLessonsCount,
      streak,
      level,
      weakKeys,
    });
  };
  loadPerformanceRecords = () => {
    try {
      const data = localStorage.getItem("typingLearn_performance");
      if (data) {
        const records = JSON.parse(data);
        if (Array.isArray(records)) this.setState({ performanceRecords: records });
      }
    } catch (e) {}
  };
  savePerformanceRecord = (lessonId, stats) => {
    const newRecord = {
      lessonId,
      title: stats.title,
      level: stats.level,
      accuracy: stats.accuracy,
      time: stats.time,
      wpm: stats.wpm,
      xp: stats.xp,
      date: new Date().toISOString(),
    };
    this.setState(
      (prev) => ({
        performanceRecords: [...prev.performanceRecords, newRecord],
      }),
      () => {
        try {
          localStorage.setItem(
            "typingLearn_performance",
            JSON.stringify(this.state.performanceRecords)
          );
        } catch (e) {}
      }
    );
  };

  // NEW: Clear all performance records
  clearPerformanceRecords = () => {
    if (window.confirm("Are you sure you want to delete ALL performance records? This cannot be undone.")) {
      this.setState({ performanceRecords: [] }, () => {
        try {
          localStorage.removeItem("typingLearn_performance");
        } catch (e) {}
      });
    }
  };

  getBestTimeForLesson = (lessonId) => {
    const key = `typingLearn_bestTime_${lessonId}`;
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) {
        const v = parseInt(stored, 10);
        return isNaN(v) ? null : v;
      }
    } catch (err) {
      return null;
    }
    return null;
  };
  updateBestTimeForLesson = (lessonId, currentTime) => {
    const key = `typingLearn_bestTime_${lessonId}`;
    let bestTime = null,
      isNewRecord = false;
    if (!currentTime || currentTime <= 0) return { bestTime: null, isNewRecord: false };
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) {
        const prev = parseInt(stored, 10);
        if (!isNaN(prev)) {
          bestTime = prev;
          if (currentTime < prev) {
            bestTime = currentTime;
            isNewRecord = true;
            localStorage.setItem(key, String(currentTime));
          }
        } else {
          bestTime = currentTime;
          isNewRecord = true;
          localStorage.setItem(key, String(currentTime));
        }
      } else {
        bestTime = currentTime;
        isNewRecord = true;
        localStorage.setItem(key, String(currentTime));
      }
    } catch (err) {
      bestTime = null;
      isNewRecord = false;
    }
    return { bestTime, isNewRecord };
  };
  calculateXPEarned = (accuracy, textLength, timeSeconds) => {
    if (!timeSeconds || timeSeconds <= 0) return 0;
    const speedFactor = textLength / timeSeconds;
    const base = Math.max(5, Math.round(speedFactor * 3));
    const accuracyFactor = accuracy / 100;
    const xp = Math.round(base * accuracyFactor * 5);
    return Math.max(10, xp);
  };
  updateGlobalStats = (lessonId, xpEarned, sessionTime, sessionMistakes) => {
    let totalXP = 0,
      totalPracticeTime = 0,
      completedLessonsCount = 0,
      streak = 0,
      lastPracticeDate = null,
      mistakeMap = {};
    const todayStr = new Date().toISOString().slice(0, 10);
    const todayDate = new Date(todayStr);
    try {
      totalXP = parseInt(localStorage.getItem("typingLearn_totalXP") || "0", 10);
      totalPracticeTime = parseInt(localStorage.getItem("typingLearn_totalTime") || "0", 10);
      completedLessonsCount = parseInt(localStorage.getItem("typingLearn_completedLessons") || "0", 10);
      streak = parseInt(localStorage.getItem("typingLearn_streak") || "0", 10);
      lastPracticeDate = localStorage.getItem("typingLearn_lastPracticeDate");
      const mm = localStorage.getItem("typingLearn_mistakeMap");
      if (mm) {
        try {
          mistakeMap = JSON.parse(mm) || {};
        } catch (e) {
          mistakeMap = {};
        }
      }
    } catch (e) {}
    totalXP += xpEarned;
    totalPracticeTime += sessionTime;
    completedLessonsCount += 1;
    if (!lastPracticeDate) {
      streak = 1;
    } else {
      const lastDate = new Date(lastPracticeDate);
      const diffDays = (todayDate - lastDate) / (1000 * 60 * 60 * 24);
      if (diffDays >= 1 && diffDays < 2) streak += 1;
      else if (diffDays >= 2) streak = 1;
    }
    const updatedMistakeMap = { ...mistakeMap };
    Object.entries(sessionMistakes || {}).forEach(([ch, count]) => {
      updatedMistakeMap[ch] = (updatedMistakeMap[ch] || 0) + count;
    });
    try {
      localStorage.setItem("typingLearn_totalXP", String(totalXP));
      localStorage.setItem("typingLearn_totalTime", String(totalPracticeTime));
      localStorage.setItem("typingLearn_completedLessons", String(completedLessonsCount));
      localStorage.setItem("typingLearn_streak", String(streak));
      localStorage.setItem("typingLearn_lastPracticeDate", todayStr);
      localStorage.setItem("typingLearn_mistakeMap", JSON.stringify(updatedMistakeMap));
      localStorage.setItem(`typingLearn_completed_${lessonId}`, "true");
    } catch (e) {}
    this.setState((prev) => ({
      completedLessonIds: [...prev.completedLessonIds, lessonId],
    }));
    const weakKeys = this.computeWeakKeys(updatedMistakeMap);
    const level = 1 + Math.floor(totalXP / 500);
    return {
      totalXP,
      totalPracticeTime,
      completedLessonsCount,
      streak,
      weakKeys,
      level,
    };
  };
  startTimer = () => {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.setState((prev) => ({
        timer: prev.timer + 1,
        timerRunning: true,
      }));
    }, 1000);
  };
  stopTimer = () => {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.setState({ timerRunning: false });
  };
  handleInputChange = (e) => {
    const rawValue = e.target.value;
    const lesson = this.getCurrentLesson();
    const target = lesson.text;
    const value = rawValue.slice(0, target.length);
    const prevLength = this.state.input.length;
    let correct = 0;
    const len = Math.min(value.length, target.length);
    for (let i = 0; i < len; i++) {
      if (value[i] === target[i]) correct++;
    }
    if (value.length > prevLength) {
      const index = value.length - 1;
      const typedChar = value[index];
      const targetChar = target[index];
      if (typedChar && targetChar && typedChar !== targetChar) {
        this.setState((prev) => {
          const map = { ...prev.sessionMistakes };
          const key = targetChar;
          map[key] = (map[key] || 0) + 1;
          return { sessionMistakes: map };
        });
        if (this.state.soundEnabled) playSound("wrong");
      } else if (typedChar === targetChar && this.state.soundEnabled) {
        playSound("correct");
      }
    }
    const alreadyCompleted = this.state.lessonCompleted;
    const shouldStartTimer =
      !this.state.timerRunning && len > 0 && !alreadyCompleted;
    const hasJustCompleted = len === target.length && !alreadyCompleted;
    this.setState(
      (prev) => ({
        input: value,
        started: true,
        correctChars: correct,
        totalChars: value.length,
        lessonCompleted: hasJustCompleted ? true : prev.lessonCompleted,
      }),
      () => {
        if (shouldStartTimer) this.startTimer();
        if (hasJustCompleted) {
          this.stopTimer();
          this.handleLessonCompletion();
        }
      }
    );
  };
  handleLessonCompletion = () => {
    const { correctChars, totalChars, timer, sessionMistakes } = this.state;
    const lesson = this.getCurrentLesson();
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;
    const wpm = timer > 0 ? Math.round((totalChars / 5) / (timer / 60)) : 0;
    const { bestTime } = this.updateBestTimeForLesson(lesson.id, timer);
    const xpEarned = this.calculateXPEarned(accuracy, lesson.text.length, timer);
    const globalStats = this.updateGlobalStats(lesson.id, xpEarned, timer, sessionMistakes);
    this.savePerformanceRecord(lesson.id, {
      title: lesson.title,
      level: lesson.level,
      accuracy,
      time: timer,
      wpm,
      xp: xpEarned,
    });
    this.setState({
      showCompletionModal: true,
      lastResult: {
        lessonTitle: lesson.title,
        lessonId: lesson.id,
        accuracy,
        time: timer,
        chars: totalChars,
        wpm,
        bestTime,
        xpEarned,
        totalXP: globalStats.totalXP,
        level: globalStats.level,
        streak: globalStats.streak,
      },
      totalXP: globalStats.totalXP,
      level: globalStats.level,
      completedLessonsCount: globalStats.completedLessonsCount,
      totalPracticeTime: globalStats.totalPracticeTime,
      streak: globalStats.streak,
      weakKeys: globalStats.weakKeys,
      sessionMistakes: {},
    });
  };
  resetCurrentLesson = () => {
    this.stopTimer();
    this.setState({
      input: "",
      started: false,
      correctChars: 0,
      totalChars: 0,
      timer: 0,
      lessonCompleted: false,
      showCompletionModal: false,
      lastResult: null,
      sessionMistakes: {},
    });
  };
  goToLesson = (index) => {
    if (index < 0 || index >= LESSONS.length) return;
    this.stopTimer();
    this.setState({
      currentLessonIndex: index,
      input: "",
      started: false,
      correctChars: 0,
      totalChars: 0,
      timer: 0,
      lessonCompleted: false,
      showCompletionModal: false,
      lastResult: null,
      sessionMistakes: {},
    });
  };
  nextLesson = () => this.goToLesson(this.state.currentLessonIndex + 1);
  prevLesson = () => this.goToLesson(this.state.currentLessonIndex - 1);

  // ------------------------------------------------
  // Modal close handlers
  // ------------------------------------------------
  handleCloseModal = () => {
    this.setState({
      showCompletionModal: false,
      lastResult: null,
    });
  };
  handleRetryFromModal = () => {
    this.setState({ showCompletionModal: false, lastResult: null }, () =>
      this.resetCurrentLesson()
    );
  };
  handleNextFromModal = () => {
    if (this.state.currentLessonIndex < LESSONS.length - 1) {
      this.setState({ showCompletionModal: false, lastResult: null }, () =>
        this.nextLesson()
      );
    } else {
      this.setState({ showCompletionModal: false, lastResult: null });
    }
  };
  toggleRecordsModal = () => {
    this.setState((prev) => ({ showRecordsModal: !prev.showRecordsModal }));
  };
  handleSort = (field) => {
    this.setState((prev) => {
      const direction =
        prev.sortField === field && prev.sortDirection === "asc" ? "desc" : "asc";
      return { sortField: field, sortDirection: direction };
    });
  };
  getSortedRecords = () => {
    const { performanceRecords, sortField, sortDirection, recordsFilter } =
      this.state;
    let filtered = performanceRecords;
    if (recordsFilter.trim()) {
      const q = recordsFilter.trim().toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(q) || r.level.toLowerCase().includes(q)
      );
    }
    return filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (sortField === "date") {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }
      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  };

  // ------------------------------------------------
  // Rendering helpers (unchanged)
  // ------------------------------------------------
  renderHomeRowGuide = () => {
    const homeRowKeys = [
      { key: "A", finger: "Pinky", hand: "left" },
      { key: "S", finger: "Ring", hand: "left" },
      { key: "D", finger: "Middle", hand: "left" },
      { key: "F", finger: "Index", hand: "left" },
      { key: "J", finger: "Index", hand: "right" },
      { key: "K", finger: "Middle", hand: "right" },
      { key: "L", finger: "Ring", hand: "right" },
      { key: ";", finger: "Pinky", hand: "right" },
    ];
    return (
      <div className="bg-gray-800/90 border border-gray-700 rounded-2xl p-4 shadow-xl">
        <h3 className="text-sm font-semibold text-gray-200 mb-2">
          🖐️ Home Row Finger Placement
        </h3>
        <div className="flex justify-center gap-2">
          {homeRowKeys.map((item) => (
            <div key={item.key} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 md:w-12 md:h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-lg ${
                  item.hand === "left"
                    ? "border-blue-400 bg-blue-500/20 text-blue-200"
                    : "border-orange-400 bg-orange-500/20 text-orange-200"
                }`}
              >
                {item.key}
              </div>
              <span className="text-[10px] text-gray-400 mt-1 text-center leading-tight">
                {item.finger}
              </span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-gray-500 mt-2 text-center">
          Left hand (blue) · Right hand (orange) · Thumbs on Space
        </p>
      </div>
    );
  };

  renderKeyboardRow = (keys, expectedChar) => {
    const expectedFingerKey = this.getFingerKeyForChar(expectedChar);
    const fingerKeys = expectedFingerKey ? FINGER_MAP[expectedFingerKey] : null;
    return (
      <div className="flex justify-center gap-1 mb-1">
        {keys.split("").map((k, idx) => {
          const displayKey = k === " " ? "␣" : k.toUpperCase();
          const normalizedKey = k.toLowerCase();
          const isActive = normalizedKey === expectedChar?.toLowerCase();
          const isInFingerGroup = fingerKeys && fingerKeys.includes(normalizedKey);
          let className =
            "px-3 py-2 rounded-md border text-sm font-semibold transition-transform ";
          if (isActive) {
            className +=
              "bg-emerald-500 border-emerald-400 text-black shadow-lg scale-105";
          } else if (isInFingerGroup && expectedChar && expectedChar !== " ") {
            className += "bg-blue-600/40 border-blue-500/50 text-blue-100";
          } else {
            className += "bg-slate-800 border-slate-600 text-slate-100";
          }
          return (
            <div key={idx} className={className}>
              {displayKey}
            </div>
          );
        })}
      </div>
    );
  };

  // ------------------------------------------------
  // Render
  // ------------------------------------------------
  render() {
    const {
      currentLessonIndex,
      input,
      correctChars,
      totalChars,
      timer,
      showCompletionModal,
      lastResult,
      totalXP,
      level,
      completedLessonsCount,
      totalPracticeTime,
      streak,
      weakKeys,
      sessionMistakes,
      soundEnabled,
      completedLessonIds,
      showRecordsModal,
      sortField,
      sortDirection,
      recordsFilter,
    } = this.state;

    const lesson = this.getCurrentLesson();
    const target = lesson.text;
    const accuracy =
      totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;
    const wpm = timer > 0 ? Math.round((totalChars / 5) / (timer / 60)) : 0;
    const expectedChar =
      input.length < target.length ? target[input.length] : "";
    const fingerHint = this.getFingerForChar(expectedChar);
    const lastTypedChar = input.length > 0 ? input[input.length - 1] : "";
    const expectedTypedChar =
      input.length > 0 ? target[input.length - 1] : "";
    const fingerCorrectness = this.isCorrectFingerUsed(
      lastTypedChar,
      expectedTypedChar
    );
    const isLastLesson = currentLessonIndex === LESSONS.length - 1;
    const xpPerLevel = 500;
    const xpIntoLevel = totalXP % xpPerLevel;
    const xpPercent = Math.min(100, Math.round((xpIntoLevel / xpPerLevel) * 100));
    const sessionWeakKeys = Object.entries(sessionMistakes)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([ch]) => (ch === " " ? "Space" : ch.toUpperCase()));
    const progressPercent =
      target.length > 0 ? (input.length / target.length) * 100 : 0;
    const sortedRecords = this.getSortedRecords();

    return (
      <div
        className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6 md:p-10"
        onCopy={(e) => e.preventDefault()}
        onCut={(e) => e.preventDefault()}
        onPaste={(e) => e.preventDefault()}
        onContextMenu={(e) => e.preventDefault()}
      >
        {/* HEADER */}
        <div className="w-full max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-3xl md:text-4xl font-extrabold text-sky-400">
              CNAT Typing Learning Lab
            </h1>
            <div className="flex items-center gap-4 mt-2 md:mt-0 flex-wrap">
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={soundEnabled}
                  onChange={(e) => {
                    const val = e.target.checked;
                    this.setState({ soundEnabled: val });
                    this.saveSoundPreference(val);
                  }}
                  className="w-4 h-4 accent-sky-500"
                />
                Sound
              </label>
              <button
                onClick={this.toggleRecordsModal}
                className="px-3 py-1.5 text-sm rounded-lg border border-sky-500 text-sky-300 hover:bg-sky-600/20 transition flex items-center gap-1"
              >
                📊 Records
              </button>
              <span className="text-xs text-gray-400">
                <kbd className="px-2 py-1 bg-gray-700 rounded">Ctrl+Shift+←/→</kbd>
              </span>
            </div>
          </div>
          <div className="mt-4 flex flex-col lg:flex-row gap-6 items-start">
            <div className="lg:basis-2/5">
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                Practice-based typing lessons with real-world style content. Move
                through Beginner, Intermediate, Advanced, and Expert levels at your
                own pace. Your time, accuracy, XP, and weak keys are tracked to help
                you improve like a pro.
              </p>
            </div>
            <div className="lg:basis-2/5 max-w-[620px] bg-gray-800/60 border border-gray-700 rounded-xl p-4 shadow-md">
              <p className="font-semibold text-emerald-300 mb-1 text-sm">
                🖐 Proper Finger Placement (Home Row)
              </p>
              <p className="text-gray-300 text-sm">
                Left hand: <span className="text-gray-200 font-semibold">A S D F</span>
                &nbsp; | &nbsp;
                Right hand: <span className="text-gray-200 font-semibold">J K L ;</span>
                &nbsp; | &nbsp;
                Thumbs on <span className="text-gray-200 font-semibold">Space</span>
              </p>
              <p className="mt-2 italic text-gray-500 text-xs">
                Tip: Keep your fingers on the home row and return after every key press.
              </p>
            </div>
          </div>
        </div>

        {/* MAIN LAYOUT: two columns */}
        <div className="w-full max-w-7xl flex flex-col md:flex-row gap-4 mt-6">
          {/* LEFT: PRACTICE AREA */}
          <div className="md:flex-[2] bg-gray-800/80 border border-gray-700 rounded-2xl p-5 md:p-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400">
                  Lesson {currentLessonIndex + 1} of {LESSONS.length}
                </p>
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  {lesson.title}
                </h2>
                <p className="text-xs mt-1 text-emerald-300">
                  Level: {lesson.level}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-start md:justify-end">
                <button
                  onClick={this.prevLesson}
                  disabled={currentLessonIndex === 0}
                  className={
                    "px-3 py-1.5 text-sm rounded-full border " +
                    (currentLessonIndex === 0
                      ? "border-gray-600 text-gray-500 cursor-not-allowed"
                      : "border-gray-500 text-gray-200 hover:bg-gray-700")
                  }
                >
                  ◀ Previous
                </button>
                <button
                  onClick={this.nextLesson}
                  disabled={isLastLesson}
                  className={
                    "px-3 py-1.5 text-sm rounded-full border " +
                    (isLastLesson
                      ? "border-gray-600 text-gray-500 cursor-not-allowed"
                      : "border-sky-500 text-sky-200 hover:bg-sky-600/20")
                  }
                >
                  Next ▶
                </button>
                <button
                  onClick={this.resetCurrentLesson}
                  className="px-3 py-1.5 text-sm rounded-full border border-red-500/70 text-red-200 hover:bg-red-600/10"
                >
                  Reset Lesson
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-300 mb-2">{lesson.description}</p>
            <p className="text-xs text-amber-300 mb-3">💡 Tip: {lesson.hint}</p>

            <div className="w-full h-1.5 bg-gray-700 rounded-full mb-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 transition-all duration-200"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {(fingerHint || fingerCorrectness !== null) && (
              <div className="mb-4 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-2 text-base text-emerald-300">
                    <span className="text-xl">👉</span>
                    {fingerHint ? (
                      <span>
                        Finger:
                        <span className="ml-1 font-bold text-emerald-200">
                          {fingerHint}
                        </span>
                        {expectedChar === " " && " (Space)"}
                      </span>
                    ) : (
                      <span className="text-gray-400 italic">
                        Waiting for next key…
                      </span>
                    )}
                  </div>
                  {fingerCorrectness !== null && (
                    <div
                      className={
                        "text-sm font-semibold flex items-center gap-1 " +
                        (fingerCorrectness ? "text-emerald-400" : "text-rose-400")
                      }
                    >
                      {fingerCorrectness ? "✔ Correct finger" : "❌ Wrong finger"}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="bg-gray-900/70 rounded-xl p-4 md:p-5 mb-4 text-base md:text-lg font-mono leading-relaxed border border-gray-700">
              {target.split("").map((char, index) => {
                let className = "text-gray-500";
                if (index < input.length) {
                  className =
                    input[index] === char ? "text-emerald-400" : "text-red-400";
                } else if (index === input.length) {
                  className += " bg-sky-600/30 rounded-sm";
                }
                return (
                  <span key={index} className={className}>
                    {char}
                  </span>
                );
              })}
            </div>

            <textarea
              value={input}
              onChange={this.handleInputChange}
              placeholder="Start typing the text shown above..."
              className="w-full h-32 md:h-40 p-3 md:p-4 bg-gray-900 border border-gray-700 rounded-xl text-base md:text-lg font-mono outline-none focus:ring-2 focus:ring-sky-500 resize-none"
              onPaste={(e) => e.preventDefault()}
              onCopy={(e) => e.preventDefault()}
              onCut={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
            />

            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm md:text-base">
              <div>
                <span className="text-gray-400 mr-1">Accuracy:</span>
                <span className="font-bold text-amber-300">{accuracy}%</span>
              </div>
              <div>
                <span className="text-gray-400 mr-1">WPM:</span>
                <span className="font-bold text-lime-300">{wpm}</span>
              </div>
              <div>
                <span className="text-gray-400 mr-1">Correct:</span>
                <span className="font-bold text-emerald-300">{correctChars}</span>
              </div>
              <div>
                <span className="text-gray-400 mr-1">Typed:</span>
                <span className="font-bold text-sky-300">{totalChars}</span>
              </div>
              <div>
                <span className="text-gray-400 mr-1">Time:</span>
                <span className="font-bold text-lime-300">
                  {this.formatTime(timer)}
                </span>
              </div>
            </div>

            {(sessionWeakKeys.length > 0 || weakKeys.length > 0) && (
              <div className="mt-3 text-xs text-gray-400">
                {sessionWeakKeys.length > 0 && (
                  <p className="mb-1">
                    Session weak keys:{" "}
                    <span className="text-rose-300 font-semibold">
                      {sessionWeakKeys.join(", ")}
                    </span>
                  </p>
                )}
                {weakKeys.length > 0 && (
                  <p>
                    All-time weak keys:{" "}
                    <span className="text-rose-300 font-semibold">
                      {weakKeys
                        .map((k) => (k === " " ? "Space" : k.toUpperCase()))
                        .join(", ")}
                    </span>
                  </p>
                )}
              </div>
            )}
          </div>

          {/* RIGHT: SIDEBAR */}
          <div className="md:flex-[1] space-y-5">
            <div className="bg-gray-800/90 border border-gray-700 rounded-2xl p-4 shadow-xl">
              <h3 className="text-sm font-semibold text-gray-200 mb-3">
                Your Progress Overview
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-gray-900/70 rounded-xl p-3 border border-gray-700">
                  <p className="text-gray-400 text-[11px] mb-1">Level</p>
                  <p className="text-lg font-bold text-sky-300">Lv. {level}</p>
                </div>
                <div className="bg-gray-900/70 rounded-xl p-3 border border-gray-700">
                  <p className="text-gray-400 text-[11px] mb-1">Total XP</p>
                  <p className="text-lg font-bold text-emerald-300">
                    {totalXP}
                  </p>
                </div>
                <div className="bg-gray-900/70 rounded-xl p-3 border border-gray-700">
                  <p className="text-gray-400 text-[11px] mb-1">
                    Lessons Completed
                  </p>
                  <p className="text-lg font-bold text-amber-300">
                    {completedLessonsCount}
                  </p>
                </div>
                <div className="bg-gray-900/70 rounded-xl p-3 border border-gray-700">
                  <p className="text-gray-400 text-[11px] mb-1">
                    Total Practice Time
                  </p>
                  <p className="text-lg font-bold text-lime-300">
                    {this.formatTime(totalPracticeTime)}
                  </p>
                </div>
              </div>

              <div className="mt-3">
                <p className="text-[11px] text-gray-400 mb-1 flex items-center justify-between">
                  <span>XP to next level</span>
                  <span className="text-sky-300 font-semibold">
                    {xpPercent}%
                  </span>
                </p>
                <div className="w-full h-2 rounded-full bg-gray-900 overflow-hidden border border-gray-700">
                  <div
                    className="h-full bg-gradient-to-r from-sky-500 to-emerald-400"
                    style={{ width: `${xpPercent}%` }}
                  />
                </div>
              </div>

              <p className="text-[11px] text-gray-400 mt-3">
                Streak:{" "}
                <span className="text-emerald-300 font-semibold">
                  {streak} day{streak === 1 ? "" : "s"}
                </span>{" "}
                of practice.
              </p>
            </div>

            {this.renderHomeRowGuide()}

            <div className="bg-gray-800/80 border border-gray-700 rounded-2xl p-4 shadow-xl">
              <h3 className="text-sm font-semibold text-gray-200 mb-2">
                On-screen Keyboard
              </h3>
              {fingerHint && (
                <div className="mb-3 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                  <p className="text-base text-emerald-300 flex items-center gap-2">
                    <span className="text-xl">👉</span>
                    Finger hint:
                    <span className="font-bold text-emerald-200">
                      {fingerHint}
                    </span>
                    {expectedChar === " " && " (Space)"}
                  </p>
                </div>
              )}
              <p className="text-xs text-gray-400 mb-3">
                <span className="text-emerald-400">Green</span> = next key ·{" "}
                <span className="text-blue-400">Blue</span> = suggested finger zone
              </p>

              <div className="mt-2">
                {this.renderKeyboardRow("qwertyuiop", expectedChar)}
                {this.renderKeyboardRow("asdfghjkl;", expectedChar)}
                {this.renderKeyboardRow("zxcvbnm,.", expectedChar)}
                {this.renderKeyboardRow(" ", expectedChar)}
              </div>
            </div>

            <div className="bg-gray-800/80 border border-gray-700 rounded-2xl p-4 shadow-xl">
              <h3 className="text-sm font-semibold text-gray-200 mb-4">
                Lessons Overview
              </h3>
              <div className="space-y-5 max-h-80 overflow-y-auto pr-2">
                {["Beginner", "Intermediate", "Advanced", "Expert"].map(
                  (levelLabel) => {
                    const groupLessons = LESSONS.filter(
                      (l) => l.level === levelLabel
                    );
                    if (groupLessons.length === 0) return null;
                    return (
                      <div key={levelLabel}>
                        <h4 className="text-xs font-bold uppercase tracking-wide text-sky-400 mb-2 pl-1">
                          {levelLabel} Lessons ({groupLessons.length})
                        </h4>
                        <div className="space-y-2">
                          {groupLessons.map((lsn) => {
                            const realIndex = LESSONS.indexOf(lsn);
                            const isActive = realIndex === currentLessonIndex;
                            const bestTime = this.getBestTimeForLesson(lsn.id);
                            const isCompleted = completedLessonIds.includes(lsn.id);
                            return (
                              <button
                                key={lsn.id}
                                onClick={() => this.goToLesson(realIndex)}
                                className={
                                  "w-full text-left px-3 py-2 rounded-lg border text-xs md:text-sm transition-all " +
                                  (isActive
                                    ? "bg-sky-600/25 border-sky-500 text-sky-100 shadow-md"
                                    : "bg-gray-900/60 border-gray-700 text-gray-200 hover:bg-gray-700/50")
                                }
                              >
                                <div className="flex justify-between items-center">
                                  <span className="font-semibold">
                                    {isCompleted && "✓ "}
                                    {lsn.title}
                                  </span>
                                  <div className="flex flex-col items-end ml-2">
                                    <span className="text-[10px] text-gray-400">
                                      #{lsn.id}
                                    </span>
                                    {bestTime !== null && (
                                      <span className="text-[10px] text-emerald-300">
                                        Best: {this.formatTime(bestTime)}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <p className="text-[11px] text-gray-400 mt-1">
                                  {lsn.description}
                                </p>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
              <div className="mt-3 flex flex-col gap-2">
                <p className="text-[10px] text-gray-500">
                  Tip: Move to the next level only when your accuracy is
                  consistently above{" "}
                  <span className="text-emerald-300 font-semibold">90%</span>.
                </p>
                <button
                  onClick={this.toggleRecordsModal}
                  className="w-full py-2 px-4 rounded-lg border border-sky-500 text-sky-300 text-xs font-semibold hover:bg-sky-600/20 transition"
                >
                  📊 Performance Records
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =============================================
            COMPLETION MODAL (fixed)
        ============================================== */}
        {showCompletionModal && lastResult && (
          <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            onClick={this.handleCloseModal}
          >
            <div
              className="bg-gray-900 border border-sky-600 rounded-2xl shadow-2xl p-6 md:p-8 max-w-lg w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl md:text-2xl font-bold text-sky-400 mb-2 text-center">
                Lesson Completed
              </h2>
              <p className="text-sm text-gray-300 text-center mb-4">
                {lastResult.lessonTitle}
              </p>

              <div className="grid grid-cols-2 gap-4 mt-2 mb-4 text-sm">
                <div className="bg-gray-800/80 rounded-xl p-3 border border-gray-700">
                  <p className="text-gray-400 text-xs mb-1">Time Taken</p>
                  <p className="text-lg font-bold text-lime-300">
                    {this.formatTime(lastResult.time)}
                  </p>
                </div>
                <div className="bg-gray-800/80 rounded-xl p-3 border border-gray-700">
                  <p className="text-gray-400 text-xs mb-1">Accuracy</p>
                  <p className="text-lg font-bold text-amber-300">
                    {lastResult.accuracy}%
                  </p>
                </div>
                <div className="bg-gray-800/80 rounded-xl p-3 border border-gray-700">
                  <p className="text-gray-400 text-xs mb-1">Typed Characters</p>
                  <p className="text-lg font-bold text-sky-300">
                    {lastResult.chars}
                  </p>
                </div>
                <div className="bg-gray-800/80 rounded-xl p-3 border border-gray-700">
                  <p className="text-gray-400 text-xs mb-1">Best Time</p>
                  <p className="text-lg font-bold text-emerald-300">
                    {lastResult.bestTime !== null
                      ? this.formatTime(lastResult.bestTime)
                      : "—"}
                  </p>
                </div>
              </div>

              <div className="mb-4 text-xs text-center text-gray-300 space-y-1">
                <p>
                  XP earned:{" "}
                  <span className="text-emerald-300 font-semibold">
                    {lastResult.xpEarned}
                  </span>
                  , Total XP:{" "}
                  <span className="text-sky-300 font-semibold">
                    {lastResult.totalXP}
                  </span>
                </p>
                <p>
                  Level:{" "}
                  <span className="text-sky-300 font-semibold">
                    Lv. {lastResult.level}
                  </span>{" "}
                  • Streak:{" "}
                  <span className="text-emerald-300 font-semibold">
                    {lastResult.streak} day{lastResult.streak === 1 ? "" : "s"}
                  </span>
                </p>
              </div>

              <p className="text-xs text-gray-400 text-center mb-4">
                Aim to reduce your time while keeping accuracy above{" "}
                <span className="text-emerald-300 font-semibold">90%</span>.
              </p>

              <div className="flex flex-wrap justify-center gap-3 mt-2">
                <button
                  onClick={this.handleRetryFromModal}
                  className="px-4 py-2 rounded-full text-sm bg-gray-800 border border-gray-600 text-gray-100 hover:bg-gray-700"
                >
                  Retry Lesson
                </button>
                <button
                  onClick={this.handleNextFromModal}
                  className={
                    "px-4 py-2 rounded-full text-sm border text-white " +
                    (isLastLesson
                      ? "bg-sky-700/40 border-sky-600/60 cursor-not-allowed"
                      : "bg-sky-600 border-sky-500 hover:bg-sky-500")
                  }
                  disabled={isLastLesson}
                >
                  {isLastLesson ? "No Next Lesson" : "Next Lesson"}
                </button>
                <button
                  onClick={this.handleCloseModal}
                  className="px-4 py-2 rounded-full text-sm bg-gray-700 border border-gray-600 text-gray-100 hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =============================================
            PERFORMANCE RECORDS MODAL (with Clear button)
        ============================================== */}
        {showRecordsModal && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) this.toggleRecordsModal();
            }}
          >
            <div className="bg-gray-900 border border-sky-600 rounded-2xl shadow-2xl p-6 w-full max-w-5xl max-h-[90vh] flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-sky-400">
                  📊 Performance Records
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={this.clearPerformanceRecords}
                    className="px-3 py-2 rounded-lg bg-red-600/20 border border-red-500/50 text-red-300 hover:bg-red-600/30 transition text-sm"
                  >
                    🗑️ Clear All
                  </button>
                  <button
                    onClick={this.toggleRecordsModal}
                    className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    ✕ Close
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm text-gray-400">Filter:</span>
                <input
                  type="text"
                  value={recordsFilter}
                  onChange={(e) =>
                    this.setState({ recordsFilter: e.target.value })
                  }
                  placeholder="Search by title or level..."
                  className="flex-1 px-3 py-1 bg-gray-800 border border-gray-600 rounded-lg text-sm text-white outline-none focus:ring-1 focus:ring-sky-500"
                />
                <span className="text-xs text-gray-400">
                  {sortedRecords.length} records
                </span>
              </div>

              <div className="flex-1 overflow-auto border border-gray-700 rounded-lg">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-800/90 text-gray-300 sticky top-0">
                    <tr>
                      <th
                        className="px-3 py-2 cursor-pointer hover:bg-gray-700 transition"
                        onClick={() => this.handleSort("date")}
                      >
                        Date {sortField === "date" && (sortDirection === "asc" ? "↑" : "↓")}
                      </th>
                      <th
                        className="px-3 py-2 cursor-pointer hover:bg-gray-700 transition"
                        onClick={() => this.handleSort("title")}
                      >
                        Lesson {sortField === "title" && (sortDirection === "asc" ? "↑" : "↓")}
                      </th>
                      <th
                        className="px-3 py-2 cursor-pointer hover:bg-gray-700 transition"
                        onClick={() => this.handleSort("level")}
                      >
                        Level {sortField === "level" && (sortDirection === "asc" ? "↑" : "↓")}
                      </th>
                      <th
                        className="px-3 py-2 cursor-pointer hover:bg-gray-700 transition"
                        onClick={() => this.handleSort("accuracy")}
                      >
                        Accuracy {sortField === "accuracy" && (sortDirection === "asc" ? "↑" : "↓")}
                      </th>
                      <th
                        className="px-3 py-2 cursor-pointer hover:bg-gray-700 transition"
                        onClick={() => this.handleSort("time")}
                      >
                        Time {sortField === "time" && (sortDirection === "asc" ? "↑" : "↓")}
                      </th>
                      <th
                        className="px-3 py-2 cursor-pointer hover:bg-gray-700 transition"
                        onClick={() => this.handleSort("wpm")}
                      >
                        WPM {sortField === "wpm" && (sortDirection === "asc" ? "↑" : "↓")}
                      </th>
                      <th
                        className="px-3 py-2 cursor-pointer hover:bg-gray-700 transition"
                        onClick={() => this.handleSort("xp")}
                      >
                        XP {sortField === "xp" && (sortDirection === "asc" ? "↑" : "↓")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {sortedRecords.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="px-3 py-6 text-center text-gray-400">
                          No records found. Complete a lesson to see data here.
                        </td>
                      </tr>
                    ) : (
                      sortedRecords.map((record, idx) => {
                        const lessonRecords = this.state.performanceRecords.filter(
                          (r) => r.lessonId === record.lessonId
                        );
                        const bestTime = Math.min(...lessonRecords.map((r) => r.time));
                        const bestAccuracy = Math.max(...lessonRecords.map((r) => r.accuracy));
                        const isBestTime = record.time === bestTime;
                        const isBestAccuracy = record.accuracy === bestAccuracy;
                        return (
                          <tr
                            key={idx}
                            className="hover:bg-gray-800/50 transition border-b border-gray-700/50"
                          >
                            <td className="px-3 py-2 text-gray-300 whitespace-nowrap">
                              {this.formatDate(record.date)}
                            </td>
                            <td className="px-3 py-2 text-gray-200">
                              {record.title}
                              {isBestTime && (
                                <span className="ml-2 text-[10px] text-emerald-400 font-bold">
                                  ⭐ Best Time
                                </span>
                              )}
                              {isBestAccuracy && (
                                <span className="ml-2 text-[10px] text-amber-400 font-bold">
                                  🎯 Best Accuracy
                                </span>
                              )}
                            </td>
                            <td className="px-3 py-2 text-gray-300">{record.level}</td>
                            <td className="px-3 py-2">
                              <span
                                className={
                                  record.accuracy >= 90
                                    ? "text-emerald-400"
                                    : record.accuracy >= 70
                                    ? "text-amber-300"
                                    : "text-rose-400"
                                }
                              >
                                {record.accuracy}%
                              </span>
                            </td>
                            <td className="px-3 py-2 text-gray-300">
                              {this.formatTime(record.time)}
                            </td>
                            <td className="px-3 py-2 text-gray-300">{record.wpm}</td>
                            <td className="px-3 py-2 text-gray-300">{record.xp}</td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-3 text-xs text-gray-400 flex justify-between">
                <span>
                  Showing {sortedRecords.length} of {this.state.performanceRecords.length} total records.
                </span>
                <span>
                  ⭐ Best time · 🎯 Best accuracy per lesson
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}