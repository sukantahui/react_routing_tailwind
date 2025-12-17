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


export default class TypingLearn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLessonIndex: 0,
      input: "",
      started: false,
      correctChars: 0,
      totalChars: 0,

      // ⏱ Timer
      timer: 0,
      timerRunning: false,
      lessonCompleted: false,

      // 🎯 Completion popup
      showCompletionModal: false,
      lastResult: null,

      // 🌟 Global progress
      totalXP: 0,
      level: 1,
      completedLessonsCount: 0,
      totalPracticeTime: 0, // seconds
      streak: 0,
      weakKeys: [],

      // 🔍 Session mistake tracking
      sessionMistakes: {},
    };
  }

  // ------------------------------------------------
  // Lifecycle
  // ------------------------------------------------
  componentDidMount() {
    this.loadGlobalStats();
  }

  componentWillUnmount() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  // ------------------------------------------------
  // Helpers
  // ------------------------------------------------
  getCurrentLesson = () => {
    return LESSONS[this.state.currentLessonIndex];
  };

  formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  computeWeakKeys = (mistakeMap) => {
    const entries = Object.entries(mistakeMap || {});
    if (!entries.length) return [];
    entries.sort((a, b) => b[1] - a[1]);
    return entries.slice(0, 5).map(([key]) => key);
  };

  // 🖐 Get correct finger for next character
  getFingerForChar = (char) => {
    if (!char) return null;
    const c = char.toLowerCase();

    for (const finger in FINGER_MAP) {
      if (FINGER_MAP[finger].includes(c)) {
        return FINGER_LABELS[finger];
      }
    }
    return null;
  };


  // Load global stats from localStorage
  loadGlobalStats = () => {
    let totalXP = 0;
    let totalPracticeTime = 0;
    let completedLessonsCount = 0;
    let streak = 0;
    let weakKeys = [];

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
    } catch (e) {
      // Ignore storage errors
    }

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

  // Per-lesson best time (already used in overview)
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
    let bestTime = null;
    let isNewRecord = false;

    if (!currentTime || currentTime <= 0) {
      return { bestTime: null, isNewRecord: false };
    }

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

  // XP earned per lesson
  calculateXPEarned = (accuracy, textLength, timeSeconds) => {
    if (!timeSeconds || timeSeconds <= 0) return 0;
    const speedFactor = textLength / timeSeconds; // chars per second
    const base = Math.max(5, Math.round(speedFactor * 3));
    const accuracyFactor = accuracy / 100;
    const xp = Math.round(base * accuracyFactor * 5);
    return Math.max(10, xp);
  };

  // Update global stats on completion
  updateGlobalStats = (lessonId, xpEarned, sessionTime, sessionMistakes) => {
    let totalXP = 0;
    let totalPracticeTime = 0;
    let completedLessonsCount = 0;
    let streak = 0;
    let lastPracticeDate = null;
    let mistakeMap = {};

    const todayStr = new Date().toISOString().slice(0, 10);
    const todayDate = new Date(todayStr);

    try {
      totalXP = parseInt(localStorage.getItem("typingLearn_totalXP") || "0", 10);
      totalPracticeTime = parseInt(
        localStorage.getItem("typingLearn_totalTime") || "0",
        10
      );
      completedLessonsCount = parseInt(
        localStorage.getItem("typingLearn_completedLessons") || "0",
        10
      );
      streak = parseInt(
        localStorage.getItem("typingLearn_streak") || "0",
        10
      );
      lastPracticeDate = localStorage.getItem("typingLearn_lastPracticeDate");

      const mm = localStorage.getItem("typingLearn_mistakeMap");
      if (mm) {
        try {
          mistakeMap = JSON.parse(mm) || {};
        } catch (e) {
          mistakeMap = {};
        }
      }
    } catch (e) {
      // ignore
    }

    // Update base counters
    totalXP += xpEarned;
    totalPracticeTime += sessionTime;
    completedLessonsCount += 1;

    // Update streak
    if (!lastPracticeDate) {
      streak = 1;
    } else {
      const lastDate = new Date(lastPracticeDate);
      const diffMs = todayDate - lastDate;
      const diffDays = diffMs / (1000 * 60 * 60 * 24);

      if (diffDays >= 0 && diffDays < 1) {
        // same day → streak unchanged
      } else if (diffDays >= 1 && diffDays < 2) {
        // yesterday
        streak = streak + 1;
      } else {
        // gap > 1 day
        streak = 1;
      }
    }

    // Merge mistakes
    const updatedMistakeMap = { ...mistakeMap };
    Object.entries(sessionMistakes || {}).forEach(([ch, count]) => {
      updatedMistakeMap[ch] = (updatedMistakeMap[ch] || 0) + count;
    });

    // Save back to localStorage
    try {
      localStorage.setItem("typingLearn_totalXP", String(totalXP));
      localStorage.setItem(
        "typingLearn_totalTime",
        String(totalPracticeTime)
      );
      localStorage.setItem(
        "typingLearn_completedLessons",
        String(completedLessonsCount)
      );
      localStorage.setItem("typingLearn_streak", String(streak));
      localStorage.setItem("typingLearn_lastPracticeDate", todayStr);
      localStorage.setItem(
        "typingLearn_mistakeMap",
        JSON.stringify(updatedMistakeMap)
      );
    } catch (e) {
      // ignore storage errors
    }

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

  // ------------------------------------------------
  // Timer logic
  // ------------------------------------------------
  startTimer = () => {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

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
    }
    this.timerInterval = null;
    this.setState({ timerRunning: false });
  };

  // ------------------------------------------------
  // Input & Lesson Flow
  // ------------------------------------------------
  handleInputChange = (e) => {
    const rawValue = e.target.value;
    const lesson = this.getCurrentLesson();
    const target = lesson.text;

    // prevent typing beyond target text length
    const value = rawValue.slice(0, target.length);

    const prevLength = this.state.input.length;
    let correct = 0;
    const len = Math.min(value.length, target.length);

    for (let i = 0; i < len; i++) {
      if (value[i] === target[i]) correct++;
    }

    // track new character mistake for weak key detection
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
        if (shouldStartTimer) {
          this.startTimer();
        }

        if (hasJustCompleted) {
          this.stopTimer();
          this.handleLessonCompletion();
        }
      }
    );
  };

  handleLessonCompletion = () => {
    const {
      correctChars,
      totalChars,
      timer,
      currentLessonIndex,
      sessionMistakes,
    } = this.state;
    const lesson = this.getCurrentLesson();

    const accuracy =
      totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;

    const { bestTime } = this.updateBestTimeForLesson(lesson.id, timer);

    const xpEarned = this.calculateXPEarned(
      accuracy,
      lesson.text.length,
      timer
    );

    const globalStats = this.updateGlobalStats(
      lesson.id,
      xpEarned,
      timer,
      sessionMistakes
    );

    this.setState({
      showCompletionModal: true,
      lastResult: {
        lessonTitle: lesson.title,
        lessonId: lesson.id,
        accuracy,
        time: timer,
        chars: totalChars,
        bestTime,
        xpEarned,
        totalXP: globalStats.totalXP,
        level: globalStats.level,
        streak: globalStats.streak,
      },
      // sync global stats to UI
      totalXP: globalStats.totalXP,
      level: globalStats.level,
      completedLessonsCount: globalStats.completedLessonsCount,
      totalPracticeTime: globalStats.totalPracticeTime,
      streak: globalStats.streak,
      weakKeys: globalStats.weakKeys,
      // reset session mistakes for next lesson
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

  nextLesson = () => {
    this.goToLesson(this.state.currentLessonIndex + 1);
  };

  prevLesson = () => {
    this.goToLesson(this.state.currentLessonIndex - 1);
  };

  // ------------------------------------------------
  // Completion popup handlers
  // ------------------------------------------------
  handleCloseModal = () => {
    this.setState({ showCompletionModal: false });
  };

  handleRetryFromModal = () => {
    this.setState({ showCompletionModal: false }, () =>
      this.resetCurrentLesson()
    );
  };

  handleNextFromModal = () => {
    if (this.state.currentLessonIndex < LESSONS.length - 1) {
      this.setState({ showCompletionModal: false }, () => this.nextLesson());
    } else {
      this.setState({ showCompletionModal: false });
    }
  };

  // ------------------------------------------------
  // Keyboard rendering
  // ------------------------------------------------
  renderKeyboardRow = (keys, expectedChar) => {
    return (
      <div className="flex justify-center gap-1 mb-1">
        {keys.split("").map((k, idx) => {
          const displayKey = k === " " ? "␣" : k.toUpperCase();
          const normalizedExpected = (expectedChar || "").toLowerCase();
          const normalizedKey = k.toLowerCase();
          const isActive = normalizedKey === normalizedExpected;

          return (
            <div
              key={idx}
              className={
                "px-3 py-2 rounded-md border text-sm font-semibold transition-transform " +
                (isActive
                  ? "bg-emerald-500 border-emerald-400 text-black shadow-lg scale-105"
                  : "bg-slate-800 border-slate-600 text-slate-100")
              }
            >
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
    } = this.state;

    const lesson = this.getCurrentLesson();
    const target = lesson.text;

    const accuracy =
      totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;

    const currentCharIndex = input.length;
    const expectedChar =
      currentCharIndex < target.length ? target[currentCharIndex] : "";
    const fingerHint = this.getFingerForChar(expectedChar);

    // Difficulty label for display
    let difficultyLabel = "";
    if (lesson.level === "Beginner") {
      difficultyLabel = "Easy • Focus on basics";
    } else if (lesson.level === "Intermediate") {
      difficultyLabel = "Moderate • Build control";
    } else if (lesson.level === "Advanced") {
      difficultyLabel = "Challenging • Real-world practice";
    } else if (lesson.level === "Expert") {
      difficultyLabel = "Expert • High focus & discipline";
    } else {
      difficultyLabel = "Practice • Keep improving";
    }

    const isLastLesson = currentLessonIndex === LESSONS.length - 1;

    // XP progress to next level
    const xpPerLevel = 500;
    const xpIntoLevel = totalXP % xpPerLevel;
    const xpPercent = Math.min(
      100,
      Math.round((xpIntoLevel / xpPerLevel) * 100)
    );

    // Session weak keys (top 3)
    const sessionWeakKeys = Object.entries(sessionMistakes)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([ch]) => (ch === " " ? "Space" : ch.toUpperCase()));

    return (
      <div
        className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6 md:p-10"
        // 🔒 Global restriction: copy, cut, paste, right-click disabled
        onCopy={(e) => e.preventDefault()}
        onCut={(e) => e.preventDefault()}
        onPaste={(e) => e.preventDefault()}
        onContextMenu={(e) => e.preventDefault()}
      >
        {/* PAGE HEADER */}
        <div className="w-full max-w-5xl mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-sky-400">
            CNAT Typing Learning Lab
          </h1>
          <p className="mt-2 text-gray-300 text-sm md:text-base">
            Practice-based typing lessons with real-world style content. Move
            through Beginner, Intermediate, Advanced, and Expert levels at your
            own pace. Your time, accuracy, XP, and weak keys are tracked to help
            you improve like a pro.
          </p>
        </div>



        {/* MAIN LAYOUT */}
        {/* <div className="w-full max-w-5xl grid md:grid-cols-[2fr,1.2fr] gap-6"> */}
        <div class="flex flex-col md:flex-row gap-4">
          {/* LEFT: PRACTICE AREA */}
          <div className="md:flex-[2] bg-gray-800/80 border border-gray-700 rounded-2xl p-5 md:p-6 shadow-xl">
            {/* Lesson Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400">
                  Lesson {currentLessonIndex + 1} of {LESSONS.length}
                </p>
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  {lesson.title}
                </h2>
                <p className="text-xs mt-1 text-emerald-300">
                  Level: {lesson.level} — {difficultyLabel}
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

            {/* Lesson description */}
            <p className="text-sm text-gray-300 mb-4">{lesson.description}</p>
            <p className="text-xs text-amber-300 mb-4">
              💡 Tip: {lesson.hint}
            </p>
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

            {/* Target Text */}
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

            {/* Input Area */}
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

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 mt-4 text-sm md:text-base">
              <div>
                <span className="text-gray-400 mr-1">Accuracy:</span>
                <span className="font-bold text-amber-300">{accuracy}%</span>
              </div>
              <div>
                <span className="text-gray-400 mr-1">Correct chars:</span>
                <span className="font-bold text-emerald-300">
                  {correctChars}
                </span>
              </div>
              <div>
                <span className="text-gray-400 mr-1">Typed chars:</span>
                <span className="font-bold text-sky-300">{totalChars}</span>
              </div>
              <div>
                <span className="text-gray-400 mr-1">Time Taken:</span>
                <span className="font-bold text-lime-300">
                  {this.formatTime(timer)}
                </span>
              </div>
            </div>

            {/* Session weak keys */}
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

          {/* RIGHT: PROGRESS + KEYBOARD + LESSON LIST */}
          <div className="md:flex-[1] space-y-5">
            {/* Progress Overview */}
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
                of practice. Try not to break the chain!
              </p>
            </div>

            {/* On-screen Keyboard */}
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
                The <span className="text-emerald-400">highlighted key</span> is
                the next expected character.
              </p>

              <div className="mt-2">
                {this.renderKeyboardRow("qwertyuiop", expectedChar)}
                {this.renderKeyboardRow("asdfghjkl;", expectedChar)}
                {this.renderKeyboardRow("zxcvbnm,.", expectedChar)}
                {this.renderKeyboardRow(" ", expectedChar)}
              </div>
            </div>

            {/* Lesson Navigator (Grouped by Level) */}
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

              <p className="text-[10px] text-gray-500 mt-3">
                Tip: Move to the next level only when your accuracy is
                consistently above{" "}
                <span className="text-emerald-300 font-semibold">90%</span>.
              </p>
            </div>
          </div>
        </div>

        {/* =============================================
            FINISH LESSON POPUP (Dark Modern)
        ============================================== */}
        {showCompletionModal && lastResult && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-gray-900 border border-sky-600 rounded-2xl shadow-2xl p-6 md:p-8 max-w-lg w-full mx-4">
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
                  <p className="text-gray-400 text-xs mb-1">
                    Typed Characters
                  </p>
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
                  XP earned this lesson:{" "}
                  <span className="text-emerald-300 font-semibold">
                    {lastResult.xpEarned}
                  </span>
                  , Total XP:{" "}
                  <span className="text-sky-300 font-semibold">
                    {lastResult.totalXP}
                  </span>
                  .
                </p>
                <p>
                  Current Level:{" "}
                  <span className="text-sky-300 font-semibold">
                    Lv. {lastResult.level}
                  </span>{" "}
                  • Streak:{" "}
                  <span className="text-emerald-300 font-semibold">
                    {lastResult.streak} day
                    {lastResult.streak === 1 ? "" : "s"}
                  </span>
                </p>
              </div>

              <p className="text-xs text-gray-400 text-center mb-4">
                Aim to reduce your time while keeping accuracy above{" "}
                <span className="text-emerald-300 font-semibold">90%</span>.
                Strong accuracy with shorter times will give you more XP.
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
      </div>
    );
  }
}
