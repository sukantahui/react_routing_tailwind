import React, { Component } from "react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import lessonsData from "./typing-lessons.json";

const LESSONS = lessonsData;

// ===============================
// 🖐 Touch Typing Finger Mapping
// ===============================
const FINGER_MAP = {
  leftPinky: "qaz`~1!",
  leftRing: "wsx2@",
  leftMiddle: "edc3#",
  leftIndex: "rfvtgb4$5%",
  rightIndex: "yhnujm6^7&",
  rightMiddle: "ik,8*",
  rightRing: "ol.9(",
  rightPinky: "p;/:?\"'{[}]_+=-\\|0)",
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
// 🏆 Achievement Badges Definition
// ===============================
export const BADGES = [
  {
    id: "first_step",
    title: "First Step",
    icon: "🌟",
    description: "Complete your very first typing lesson.",
    category: "Milestone",
    check: (stats) => (stats.completedLessonsCount || 0) >= 1,
  },
  {
    id: "perfectionist",
    title: "Perfectionist",
    icon: "🎯",
    description: "Complete any lesson with 100% accuracy.",
    category: "Accuracy",
    check: (_stats, currentResult) => currentResult?.accuracy === 100,
  },
  {
    id: "sharpshooter",
    title: "Sharpshooter",
    icon: "🏹",
    description: "Complete a lesson with 95% or higher accuracy.",
    category: "Accuracy",
    check: (_stats, currentResult) => (currentResult?.accuracy || 0) >= 95,
  },
  {
    id: "pace_setter",
    title: "Pace Setter",
    icon: "⚡",
    description: "Achieve 25+ WPM in a completed lesson.",
    category: "Speed",
    check: (_stats, currentResult) => (currentResult?.wpm || 0) >= 25,
  },
  {
    id: "speed_demon",
    title: "Speed Demon",
    icon: "🚀",
    description: "Achieve 45+ WPM in a completed lesson.",
    category: "Speed",
    check: (_stats, currentResult) => (currentResult?.wpm || 0) >= 45,
  },
  {
    id: "mach_speed",
    title: "Mach Speed",
    icon: "🏎️",
    description: "Achieve 65+ WPM in a completed lesson.",
    category: "Speed",
    check: (_stats, currentResult) => (currentResult?.wpm || 0) >= 65,
  },
  {
    id: "streak_3",
    title: "Consistency Cadet",
    icon: "🔥",
    description: "Practice for 3 consecutive days.",
    category: "Streak",
    check: (stats) => (stats.streak || 0) >= 3,
  },
  {
    id: "streak_7",
    title: "Unstoppable",
    icon: "👑",
    description: "Practice for 7 consecutive days.",
    category: "Streak",
    check: (stats) => (stats.streak || 0) >= 7,
  },
  {
    id: "scholar_10",
    title: "Scholar",
    icon: "📚",
    description: "Complete 10 different typing lessons.",
    category: "Milestone",
    check: (stats) => (stats.completedLessonIds || []).length >= 10,
  },
  {
    id: "master_25",
    title: "Typing Veteran",
    icon: "🛡️",
    description: "Complete 25 different typing lessons.",
    category: "Milestone",
    check: (stats) => (stats.completedLessonIds || []).length >= 25,
  },
  {
    id: "beginner_master",
    title: "Beginner Master",
    icon: "🌱",
    description: "Complete all Beginner level lessons.",
    category: "Tier",
    check: (stats, _currentResult, allLessons) => {
      const beginner = (allLessons || []).filter((l) => l.level === "Beginner");
      return (
        beginner.length > 0 &&
        beginner.every((l) => (stats.completedLessonIds || []).includes(l.id))
      );
    },
  },
  {
    id: "time_15m",
    title: "Dedicated Typist",
    icon: "⏳",
    description: "Spend over 15 minutes in total practice time.",
    category: "Time",
    check: (stats) => (stats.totalPracticeTime || 0) >= 900,
  },
  {
    id: "xp_1000",
    title: "XP Pioneer",
    icon: "💎",
    description: "Earn 1,000 Total Experience Points.",
    category: "XP",
    check: (stats) => (stats.totalXP || 0) >= 1000,
  },
  {
    id: "xp_3000",
    title: "XP Titan",
    icon: "🌌",
    description: "Earn 3,000 Total Experience Points.",
    category: "XP",
    check: (stats) => (stats.totalXP || 0) >= 3000,
  },
];

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
  } catch {
    // Web Audio API may be restricted before user gesture
  }
};

export default class TypingLearn extends Component {
  constructor(props) {
    super(props);

    this.textareaRef = null;
    this.cardRef = null;

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
      // Badges State
      unlockedBadges: {},
      showBadgesModal: false,
      badgesFilter: "all",
      newlyUnlockedBadges: [],
      isDownloading: false,
      copiedToast: false,
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
    this.loadUnlockedBadges();
    document.addEventListener("keydown", this.handleKeyDown);
    if (this.textareaRef) {
      this.textareaRef.focus();
    }
  }

  componentWillUnmount() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  // ------------------------------------------------
  // Key handler (Escape to close modals & Ctrl+Shift+Arrows)
  // ------------------------------------------------
  handleKeyDown = (e) => {
    if (e.key === "Escape") {
      if (this.state.showCompletionModal) {
        this.handleCloseModal();
      }
      if (this.state.showRecordsModal) {
        this.toggleRecordsModal();
      }
      if (this.state.showBadgesModal) {
        this.toggleBadgesModal();
      }
    }
    if (e.ctrlKey && e.shiftKey) {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        this.nextLesson();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        this.prevLesson();
      }
    }
  };

  // ------------------------------------------------
  // Helpers
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
    } catch {
      // localStorage might be disabled
    }
  };

  saveSoundPreference = (enabled) => {
    try {
      localStorage.setItem("typingLearn_soundEnabled", String(enabled));
    } catch {
      // localStorage might be disabled
    }
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
    } catch {
      // localStorage might be disabled
    }
    this.setState({ completedLessonIds: completed });
  };

  loadUnlockedBadges = () => {
    try {
      const data = localStorage.getItem("typingLearn_unlockedBadges");
      if (data) {
        const parsed = JSON.parse(data);
        if (parsed && typeof parsed === "object") {
          this.setState({ unlockedBadges: parsed });
        }
      }
    } catch {
      // localStorage might be disabled
    }
  };

  checkAndUnlockBadges = (currentResult, updatedStats) => {
    const { unlockedBadges } = this.state;
    const newlyUnlocked = [];
    const updatedUnlockedBadges = { ...unlockedBadges };

    BADGES.forEach((badge) => {
      if (!updatedUnlockedBadges[badge.id]) {
        const isEligible = badge.check(updatedStats, currentResult, LESSONS);
        if (isEligible) {
          const badgeData = {
            unlockedAt: new Date().toISOString(),
            lessonId: currentResult?.lessonId,
            lessonTitle: currentResult?.lessonTitle,
          };
          updatedUnlockedBadges[badge.id] = badgeData;
          newlyUnlocked.push({ ...badge, ...badgeData });
        }
      }
    });

    if (newlyUnlocked.length > 0) {
      try {
        localStorage.setItem(
          "typingLearn_unlockedBadges",
          JSON.stringify(updatedUnlockedBadges)
        );
      } catch {
        // localStorage might be disabled
      }
      this.setState({
        unlockedBadges: updatedUnlockedBadges,
        newlyUnlockedBadges: newlyUnlocked,
      });
    } else {
      this.setState({
        newlyUnlockedBadges: [],
      });
    }
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
        } catch {
          mistakeMap = {};
        }
      }
      weakKeys = this.computeWeakKeys(mistakeMap);
    } catch {
      // localStorage might be disabled
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

  loadPerformanceRecords = () => {
    try {
      const data = localStorage.getItem("typingLearn_performance");
      if (data) {
        const records = JSON.parse(data);
        if (Array.isArray(records)) this.setState({ performanceRecords: records });
      }
    } catch {
      // localStorage might be disabled
    }
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
        } catch {
          // localStorage might be disabled
        }
      }
    );
  };

  clearPerformanceRecords = () => {
    if (
      window.confirm(
        "Are you sure you want to delete ALL performance records? This cannot be undone."
      )
    ) {
      this.setState({ performanceRecords: [] }, () => {
        try {
          localStorage.removeItem("typingLearn_performance");
        } catch {
          // localStorage might be disabled
        }
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
    } catch {
      return null;
    }
    return null;
  };

  updateBestTimeForLesson = (lessonId, currentTime) => {
    const key = `typingLearn_bestTime_${lessonId}`;
    let bestTime = null,
      isNewRecord = false;
    if (!currentTime || currentTime <= 0)
      return { bestTime: null, isNewRecord: false };
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
    } catch {
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
      totalPracticeTime = parseInt(
        localStorage.getItem("typingLearn_totalTime") || "0",
        10
      );
      completedLessonsCount = parseInt(
        localStorage.getItem("typingLearn_completedLessons") || "0",
        10
      );
      streak = parseInt(localStorage.getItem("typingLearn_streak") || "0", 10);
      lastPracticeDate = localStorage.getItem("typingLearn_lastPracticeDate");
      const mm = localStorage.getItem("typingLearn_mistakeMap");
      if (mm) {
        try {
          mistakeMap = JSON.parse(mm) || {};
        } catch {
          mistakeMap = {};
        }
      }
    } catch {
      // localStorage might be disabled
    }
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
      localStorage.setItem(`typingLearn_completed_${lessonId}`, "true");
    } catch {
      // localStorage might be disabled
    }
    const completedLessonIds = [...new Set([...this.state.completedLessonIds, lessonId])];
    this.setState({ completedLessonIds });
    const weakKeys = this.computeWeakKeys(updatedMistakeMap);
    const level = 1 + Math.floor(totalXP / 500);
    return {
      totalXP,
      totalPracticeTime,
      completedLessonsCount,
      completedLessonIds,
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

  // ==============================================================
  // 🧠 SMART Word-Level & Character-Level Alignment Engine
  // ==============================================================
  evaluateInput = (targetText, inputText) => {
    const targetWords = targetText.split(" ");
    const typedWords = inputText.length > 0 ? inputText.split(" ") : [""];
    const currentWordIndex = Math.min(
      typedWords.length - 1,
      targetWords.length - 1
    );
    const isLastWord = currentWordIndex === targetWords.length - 1;

    let totalCorrectChars = 0;
    let totalTypedChars = 0;
    let totalTargetChars = targetText.length;
    let completedTargetChars = 0;

    const wordEvaluations = targetWords.map((tWord, wIdx) => {
      if (wIdx < currentWordIndex) {
        // --- COMPLETED WORD IN THE PAST ---
        const pWord = typedWords[wIdx] !== undefined ? typedWords[wIdx] : "";
        const chars = [];
        let wordCorrect = true;

        for (let i = 0; i < tWord.length; i++) {
          const tChar = tWord[i];
          if (i < pWord.length) {
            const pChar = pWord[i];
            const isMatch = pChar === tChar;
            if (isMatch) totalCorrectChars++;
            else wordCorrect = false;
            totalTypedChars++;
            chars.push({
              char: tChar,
              typed: pChar,
              status: isMatch ? "correct" : "wrong",
            });
          } else {
            wordCorrect = false;
            chars.push({ char: tChar, typed: null, status: "missed" });
          }
        }

        const extraChars = [];
        if (pWord.length > tWord.length) {
          wordCorrect = false;
          for (let i = tWord.length; i < pWord.length; i++) {
            totalTypedChars++;
            extraChars.push(pWord[i]);
          }
        }

        totalTypedChars++;
        totalCorrectChars++;
        completedTargetChars += tWord.length + 1;

        return {
          targetWord: tWord,
          typedWord: pWord,
          chars,
          extraChars,
          isCompleted: true,
          isActive: false,
          isPending: false,
          hasError: !wordCorrect,
        };
      } else if (wIdx === currentWordIndex) {
        // --- ACTIVE WORD CURRENTLY BEING TYPED ---
        const curWord = typedWords[wIdx] !== undefined ? typedWords[wIdx] : "";
        const chars = [];
        let wordHasErrorSoFar = false;

        for (let i = 0; i < tWord.length; i++) {
          const tChar = tWord[i];
          if (i < curWord.length) {
            const curChar = curWord[i];
            const isMatch = curChar === tChar;
            if (isMatch) totalCorrectChars++;
            else wordHasErrorSoFar = true;
            totalTypedChars++;
            chars.push({
              char: tChar,
              typed: curChar,
              status: isMatch ? "correct" : "wrong",
            });
          } else if (i === curWord.length) {
            chars.push({ char: tChar, typed: null, status: "cursor" });
          } else {
            chars.push({ char: tChar, typed: null, status: "pending" });
          }
        }

        const extraChars = [];
        if (curWord.length > tWord.length) {
          wordHasErrorSoFar = true;
          for (let i = tWord.length; i < curWord.length; i++) {
            totalTypedChars++;
            extraChars.push(curWord[i]);
          }
        }

        completedTargetChars += Math.min(curWord.length, tWord.length);

        return {
          targetWord: tWord,
          typedWord: curWord,
          chars,
          extraChars,
          isCompleted: false,
          isActive: true,
          isPending: false,
          hasError: wordHasErrorSoFar,
          cursorAtSpace: curWord.length >= tWord.length,
        };
      } else {
        // --- PENDING WORD IN THE FUTURE ---
        const chars = tWord.split("").map((ch) => ({
          char: ch,
          typed: null,
          status: "pending",
        }));

        return {
          targetWord: tWord,
          typedWord: "",
          chars,
          extraChars: [],
          isCompleted: false,
          isActive: false,
          isPending: true,
          hasError: false,
        };
      }
    });

    let expectedChar = "";
    if (currentWordIndex < targetWords.length) {
      const curEval = wordEvaluations[currentWordIndex];
      if (curEval) {
        if (curEval.cursorAtSpace) {
          expectedChar = isLastWord ? "" : " ";
        } else {
          const curCharObj = curEval.chars.find((c) => c.status === "cursor");
          expectedChar = curCharObj ? curCharObj.char : "";
        }
      }
    }

    let isLessonCompleted = false;
    if (typedWords.length > targetWords.length) {
      isLessonCompleted = true;
    } else if (typedWords.length === targetWords.length) {
      const lastTyped = typedWords[targetWords.length - 1] || "";
      const lastTarget = targetWords[targetWords.length - 1] || "";
      if (lastTyped.length >= lastTarget.length) {
        isLessonCompleted = true;
      }
    }

    const accuracy =
      totalTypedChars > 0
        ? Math.round((totalCorrectChars / totalTypedChars) * 100)
        : 0;

    const progressPercent = Math.min(
      100,
      Math.round((completedTargetChars / Math.max(1, totalTargetChars)) * 100)
    );

    return {
      targetWords,
      typedWords,
      currentWordIndex,
      wordEvaluations,
      expectedChar,
      totalCorrectChars,
      totalTypedChars,
      accuracy,
      progressPercent,
      isLessonCompleted,
    };
  };

  handleInputChange = (e) => {
    let rawValue = e.target.value;
    const lesson = this.getCurrentLesson();
    const target = lesson.text;
    const prevInput = this.state.input;

    if (rawValue.startsWith(" ")) {
      rawValue = rawValue.trimStart();
    }

    rawValue = rawValue.replace(/ {2,}/g, " ");

    const targetWords = target.split(" ");
    const rawWords = rawValue.split(" ");

    if (rawWords.length > targetWords.length) {
      const validWords = rawWords.slice(0, targetWords.length);
      rawValue = validWords.join(" ");
    }

    const prevWords = prevInput.length > 0 ? prevInput.split(" ") : [""];
    const curWords = rawValue.length > 0 ? rawValue.split(" ") : [""];

    if (rawValue.length > prevInput.length) {
      const isSpaceTyped = rawValue.endsWith(" ") && !prevInput.endsWith(" ");
      const prevActiveIdx = prevWords.length - 1;
      const targetWord = targetWords[prevActiveIdx] || "";

      if (isSpaceTyped) {
        const finishedWord = curWords[prevActiveIdx] || "";
        let wordHasError = false;

        for (let i = 0; i < targetWord.length; i++) {
          if (i >= finishedWord.length || finishedWord[i] !== targetWord[i]) {
            wordHasError = true;
            const missedChar = targetWord[i];
            this.setState((prev) => {
              const map = { ...prev.sessionMistakes };
              map[missedChar] = (map[missedChar] || 0) + 1;
              return { sessionMistakes: map };
            });
          }
        }

        if (this.state.soundEnabled) {
          playSound(wordHasError ? "wrong" : "correct");
        }
      } else {
        const activeIdx = curWords.length - 1;
        const curWord = curWords[activeIdx] || "";
        const charIdx = curWord.length - 1;
        const typedChar = curWord[charIdx];
        const activeTargetWord = targetWords[activeIdx] || "";
        const expectedTargetChar = activeTargetWord[charIdx];

        if (expectedTargetChar) {
          if (typedChar === expectedTargetChar) {
            if (this.state.soundEnabled) playSound("correct");
          } else {
            if (this.state.soundEnabled) playSound("wrong");
            this.setState((prev) => {
              const map = { ...prev.sessionMistakes };
              map[expectedTargetChar] = (map[expectedTargetChar] || 0) + 1;
              return { sessionMistakes: map };
            });
          }
        } else {
          if (this.state.soundEnabled) playSound("wrong");
        }
      }
    }

    const evalResult = this.evaluateInput(target, rawValue);
    const alreadyCompleted = this.state.lessonCompleted;
    const shouldStartTimer =
      !this.state.timerRunning && rawValue.length > 0 && !alreadyCompleted;
    const hasJustCompleted = evalResult.isLessonCompleted && !alreadyCompleted;

    this.setState(
      (prev) => ({
        input: rawValue,
        started: true,
        correctChars: evalResult.totalCorrectChars,
        totalChars: evalResult.totalTypedChars,
        lessonCompleted: hasJustCompleted ? true : prev.lessonCompleted,
      }),
      () => {
        if (shouldStartTimer) this.startTimer();
        if (hasJustCompleted) {
          this.stopTimer();
          this.handleLessonCompletion(evalResult);
        }
      }
    );
  };

  handleLessonCompletion = (evalResult) => {
    const { timer, sessionMistakes } = this.state;
    const lesson = this.getCurrentLesson();
    const evaluation =
      evalResult || this.evaluateInput(lesson.text, this.state.input);
    const accuracy = evaluation.accuracy;
    const totalChars = evaluation.totalTypedChars;
    const wpm = timer > 0 ? Math.round((totalChars / 5) / (timer / 60)) : 0;
    const { bestTime, isNewRecord } = this.updateBestTimeForLesson(lesson.id, timer);
    const xpEarned = this.calculateXPEarned(accuracy, lesson.text.length, timer);
    const globalStats = this.updateGlobalStats(
      lesson.id,
      xpEarned,
      timer,
      sessionMistakes
    );

    const resultData = {
      lessonTitle: lesson.title,
      lessonId: lesson.id,
      level: lesson.level,
      accuracy,
      time: timer,
      chars: totalChars,
      wpm,
      bestTime,
      isNewRecord,
      xpEarned,
      totalXP: globalStats.totalXP,
      levelNum: globalStats.level,
      streak: globalStats.streak,
      date: new Date().toISOString(),
    };

    this.savePerformanceRecord(lesson.id, {
      title: lesson.title,
      level: lesson.level,
      accuracy,
      time: timer,
      wpm,
      xp: xpEarned,
    });

    // Check & unlock achievement badges
    this.checkAndUnlockBadges(resultData, globalStats);

    this.setState({
      showCompletionModal: true,
      lastResult: resultData,
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
    this.setState(
      {
        input: "",
        started: false,
        correctChars: 0,
        totalChars: 0,
        timer: 0,
        lessonCompleted: false,
        showCompletionModal: false,
        lastResult: null,
        sessionMistakes: {},
      },
      () => {
        if (this.textareaRef) this.textareaRef.focus();
      }
    );
  };

  goToLesson = (index) => {
    if (index < 0 || index >= LESSONS.length) return;
    this.stopTimer();
    this.setState(
      {
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
      },
      () => {
        if (this.textareaRef) this.textareaRef.focus();
      }
    );
  };

  nextLesson = () => this.goToLesson(this.state.currentLessonIndex + 1);
  prevLesson = () => this.goToLesson(this.state.currentLessonIndex - 1);

  // ------------------------------------------------
  // Modal handlers
  // ------------------------------------------------
  handleCloseModal = () => {
    this.setState({
      showCompletionModal: false,
      lastResult: null,
      newlyUnlockedBadges: [],
    });
  };

  handleRetryFromModal = () => {
    this.setState(
      { showCompletionModal: false, lastResult: null, newlyUnlockedBadges: [] },
      () => this.resetCurrentLesson()
    );
  };

  handleNextFromModal = () => {
    if (this.state.currentLessonIndex < LESSONS.length - 1) {
      this.setState(
        { showCompletionModal: false, lastResult: null, newlyUnlockedBadges: [] },
        () => this.nextLesson()
      );
    } else {
      this.setState({
        showCompletionModal: false,
        lastResult: null,
        newlyUnlockedBadges: [],
      });
    }
  };

  toggleRecordsModal = () => {
    this.setState((prev) => ({ showRecordsModal: !prev.showRecordsModal }));
  };

  toggleBadgesModal = () => {
    this.setState((prev) => ({ showBadgesModal: !prev.showBadgesModal }));
  };

  handleSort = (field) => {
    this.setState((prev) => {
      const direction =
        prev.sortField === field && prev.sortDirection === "asc"
          ? "desc"
          : "asc";
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
          r.title.toLowerCase().includes(q) ||
          r.level.toLowerCase().includes(q)
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
  // Share & Export Handlers
  // ------------------------------------------------
  downloadCardAsPNG = async () => {
    if (!this.cardRef) return;
    this.setState({ isDownloading: true });
    try {
      const dataUrl = await toPng(this.cardRef, {
        pixelRatio: 2,
        cacheBust: true,
      });
      const link = document.createElement("a");
      const safeTitle =
        this.state.lastResult?.lessonTitle?.replace(/[^a-zA-Z0-9]/g, "-") ||
        "lesson";
      link.download = `CNAT-Typing-Certificate-${safeTitle}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error generating card PNG:", err);
      alert("Failed to export card image. Please try again.");
    } finally {
      this.setState({ isDownloading: false });
    }
  };

  downloadCardAsPDF = async () => {
    if (!this.cardRef) return;
    this.setState({ isDownloading: true });
    try {
      const dataUrl = await toPng(this.cardRef, {
        pixelRatio: 2,
        cacheBust: true,
      });
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [680, 440],
      });
      pdf.addImage(dataUrl, "PNG", 0, 0, 680, 440);
      const safeTitle =
        this.state.lastResult?.lessonTitle?.replace(/[^a-zA-Z0-9]/g, "-") ||
        "lesson";
      pdf.save(`CNAT-Typing-Certificate-${safeTitle}.pdf`);
    } catch (err) {
      console.error("Error generating card PDF:", err);
      alert("Failed to export certificate PDF. Please try again.");
    } finally {
      this.setState({ isDownloading: false });
    }
  };

  copyShareSummary = () => {
    const { lastResult } = this.state;
    if (!lastResult) return;
    const text =
      `🏆 CNAT Typing Lab Achievement!\n` +
      `📖 Lesson: ${lastResult.lessonTitle} (${lastResult.level || "Beginner"})\n` +
      `⚡ Speed: ${lastResult.wpm} WPM\n` +
      `🎯 Accuracy: ${lastResult.accuracy}%\n` +
      `⏱️ Time: ${this.formatTime(lastResult.time)}\n` +
      `💎 XP: +${lastResult.xpEarned} XP (Total: ${lastResult.totalXP} XP | Lv. ${lastResult.levelNum})\n` +
      `🔥 Streak: ${lastResult.streak} days\n` +
      `Practice typing with CNAT Typing Learning Lab!`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      this.setState({ copiedToast: true });
      setTimeout(() => this.setState({ copiedToast: false }), 3000);
    }
  };

  // ------------------------------------------------
  // Visual presentation helpers
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
          const isInFingerGroup =
            fingerKeys && fingerKeys.includes(normalizedKey);
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
      unlockedBadges,
      showBadgesModal,
      badgesFilter,
      newlyUnlockedBadges,
      isDownloading,
      copiedToast,
    } = this.state;

    const lesson = this.getCurrentLesson();
    const target = lesson.text;
    const evalResult = this.evaluateInput(target, input);

    const accuracy = evalResult.accuracy;
    const correctChars = evalResult.totalCorrectChars;
    const totalChars = evalResult.totalTypedChars;
    const wpm = timer > 0 ? Math.round((totalChars / 5) / (timer / 60)) : 0;
    const expectedChar = evalResult.expectedChar;
    const fingerHint = this.getFingerForChar(expectedChar);

    let lastTypedChar = "";
    let expectedLastChar = "";
    if (input.length > 0) {
      const curWords = input.split(" ");
      const curWordIdx = curWords.length - 1;
      const targetWords = target.split(" ");
      const curWord = curWords[curWordIdx] || "";
      const targetWord = targetWords[curWordIdx] || "";
      if (input.endsWith(" ")) {
        lastTypedChar = " ";
        expectedLastChar = " ";
      } else if (curWord.length > 0) {
        lastTypedChar = curWord[curWord.length - 1];
        expectedLastChar = targetWord[curWord.length - 1] || "";
      }
    }
    const fingerCorrectness = this.isCorrectFingerUsed(
      lastTypedChar,
      expectedLastChar
    );

    const isLastLesson = currentLessonIndex === LESSONS.length - 1;
    const xpPerLevel = 500;
    const xpIntoLevel = totalXP % xpPerLevel;
    const xpPercent = Math.min(
      100,
      Math.round((xpIntoLevel / xpPerLevel) * 100)
    );
    const sessionWeakKeys = Object.entries(sessionMistakes)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([ch]) => (ch === " " ? "Space" : ch.toUpperCase()));
    const progressPercent = evalResult.progressPercent;
    const sortedRecords = this.getSortedRecords();
    const unlockedBadgesList = Object.keys(unlockedBadges);

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
            <div className="flex items-center gap-3 mt-2 md:mt-0 flex-wrap">
              <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer bg-gray-800/80 px-3 py-1.5 rounded-lg border border-gray-700">
                <input
                  type="checkbox"
                  checked={soundEnabled}
                  onChange={(e) => {
                    const val = e.target.checked;
                    this.setState({ soundEnabled: val });
                    this.saveSoundPreference(val);
                  }}
                  className="w-4 h-4 accent-sky-500 cursor-pointer"
                />
                Sound
              </label>

              <button
                onClick={this.toggleBadgesModal}
                className="px-3 py-1.5 text-sm rounded-lg border border-amber-500 text-amber-300 hover:bg-amber-600/20 transition flex items-center gap-1.5 font-medium shadow-sm"
              >
                <span>🏆 Badges</span>
                <span className="bg-amber-500/20 text-amber-200 text-xs px-1.5 py-0.5 rounded-full border border-amber-500/40">
                  {unlockedBadgesList.length}/{BADGES.length}
                </span>
              </button>

              <button
                onClick={this.toggleRecordsModal}
                className="px-3 py-1.5 text-sm rounded-lg border border-sky-500 text-sky-300 hover:bg-sky-600/20 transition flex items-center gap-1 font-medium"
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
          <div
            className="md:flex-[2] bg-gray-800/80 border border-gray-700 rounded-2xl p-5 md:p-6 shadow-xl cursor-text"
            onClick={() => {
              if (this.textareaRef) this.textareaRef.focus();
            }}
          >
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
                  onClick={(e) => {
                    e.stopPropagation();
                    this.prevLesson();
                  }}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    this.nextLesson();
                  }}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    this.resetCurrentLesson();
                  }}
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
                        {evalResult.isLessonCompleted
                          ? "Lesson Completed! 🎉"
                          : "Waiting for next key…"}
                      </span>
                    )}
                  </div>
                  {fingerCorrectness !== null && (
                    <div
                      className={
                        "text-sm font-semibold flex items-center gap-1 " +
                        (fingerCorrectness
                          ? "text-emerald-400"
                          : "text-rose-400")
                      }
                    >
                      {fingerCorrectness
                        ? "✔ Correct finger"
                        : "❌ Wrong finger"}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SMART WORD-BY-WORD TARGET TEXT DISPLAY */}
            <div className="bg-gray-900/90 rounded-2xl p-5 md:p-6 mb-4 text-lg md:text-xl font-mono leading-relaxed border border-gray-700/80 shadow-inner flex flex-wrap items-center gap-x-2.5 gap-y-2 select-none min-h-[90px]">
              {evalResult.wordEvaluations.map((wEval, wIdx) => {
                let wordWrapperClass =
                  "relative inline-flex items-center px-1.5 py-0.5 rounded-md transition-all duration-150 ";
                if (wEval.isActive) {
                  wordWrapperClass +=
                    "bg-sky-500/15 ring-1 ring-sky-400/50 shadow-sm ";
                } else if (wEval.isCompleted && wEval.hasError) {
                  wordWrapperClass +=
                    "bg-rose-500/10 border-b-2 border-rose-500/60 ";
                } else if (wEval.isCompleted) {
                  wordWrapperClass += "border-b-2 border-emerald-500/40 ";
                }

                return (
                  <span key={wIdx} className={wordWrapperClass}>
                    {wEval.chars.map((cObj, cIdx) => {
                      let charClass = "transition-colors duration-100 ";
                      if (cObj.status === "correct") {
                        charClass += "text-emerald-400 font-semibold";
                      } else if (cObj.status === "wrong") {
                        charClass +=
                          "text-rose-400 bg-rose-500/25 px-0.5 rounded font-bold";
                      } else if (cObj.status === "missed") {
                        charClass +=
                          "text-rose-300/70 underline decoration-rose-500 decoration-wavy";
                      } else if (cObj.status === "cursor") {
                        charClass +=
                          "text-white bg-sky-500 px-0.5 rounded-sm font-bold shadow-[0_0_8px_rgba(56,189,248,0.8)] animate-pulse";
                      } else {
                        charClass += "text-gray-400";
                      }

                      return (
                        <span key={cIdx} className={charClass}>
                          {cObj.char}
                        </span>
                      );
                    })}

                    {wEval.extraChars && wEval.extraChars.length > 0 && (
                      <span className="text-rose-400 font-semibold bg-rose-950/70 px-1 ml-0.5 rounded border border-rose-500/40 line-through text-sm">
                        {wEval.extraChars.join("")}
                      </span>
                    )}

                    {wEval.isActive &&
                      wEval.cursorAtSpace &&
                      wIdx < evalResult.targetWords.length - 1 && (
                        <span className="ml-1 text-xs px-1.5 py-0.5 rounded bg-sky-500/30 text-sky-200 border border-sky-400/50 font-sans animate-pulse">
                          ␣ space
                        </span>
                      )}
                  </span>
                );
              })}
            </div>

            {/* INPUT TEXTAREA */}
            <textarea
              ref={(el) => (this.textareaRef = el)}
              value={input}
              onChange={this.handleInputChange}
              placeholder="Start typing the text shown above..."
              className="w-full h-32 md:h-36 p-3 md:p-4 bg-gray-900 border border-gray-700 rounded-xl text-base md:text-lg font-mono outline-none focus:ring-2 focus:ring-sky-500 resize-none text-gray-100 shadow-inner"
              onPaste={(e) => e.preventDefault()}
              onCopy={(e) => e.preventDefault()}
              onCut={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
              autoFocus
            />

            {/* REAL-TIME STATS */}
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
            {/* PROGRESS OVERVIEW */}
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

            {/* BADGES SHOWCASE WIDGET */}
            <div className="bg-gradient-to-br from-gray-800/95 via-gray-800 to-amber-950/30 border border-amber-500/30 rounded-2xl p-4 shadow-xl">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                  <span>🏆 Badges</span>
                  <span className="text-xs bg-amber-500/20 text-amber-200 px-2 py-0.5 rounded-full border border-amber-500/40">
                    {unlockedBadgesList.length} / {BADGES.length}
                  </span>
                </h3>
                <button
                  onClick={this.toggleBadgesModal}
                  className="text-xs text-sky-400 hover:text-sky-300 underline font-medium"
                >
                  View All
                </button>
              </div>

              <div className="flex gap-2 flex-wrap mb-2">
                {BADGES.slice(0, 5).map((badge) => {
                  const isUnlocked = !!unlockedBadges[badge.id];
                  return (
                    <div
                      key={badge.id}
                      title={`${badge.title}: ${badge.description}`}
                      className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl transition-all cursor-pointer ${
                        isUnlocked
                          ? "bg-amber-500/20 border-2 border-amber-400 shadow-lg shadow-amber-500/20 scale-105"
                          : "bg-gray-900/60 border border-gray-700/60 opacity-40 grayscale"
                      }`}
                      onClick={this.toggleBadgesModal}
                    >
                      {badge.icon}
                    </div>
                  );
                })}
              </div>
              <p className="text-[11px] text-gray-400">
                Unlock badges through accuracy, speed, streaks, and milestones!
              </p>
            </div>

            {this.renderHomeRowGuide()}

            {/* ON-SCREEN KEYBOARD */}
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

            {/* LESSONS LIST OVERVIEW */}
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
                            const isCompleted =
                              completedLessonIds.includes(lsn.id);
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
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <button
                    onClick={this.toggleBadgesModal}
                    className="w-full py-2 px-3 rounded-lg border border-amber-500/70 text-amber-300 text-xs font-semibold hover:bg-amber-600/20 transition text-center"
                  >
                    🏆 Badges Gallery
                  </button>
                  <button
                    onClick={this.toggleRecordsModal}
                    className="w-full py-2 px-3 rounded-lg border border-sky-500 text-sky-300 text-xs font-semibold hover:bg-sky-600/20 transition text-center"
                  >
                    📊 Records
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =============================================
            COMPLETION MODAL WITH SHAREABLE CERTIFICATE CARD
        ============================================== */}
        {showCompletionModal && lastResult && (
          <div
            className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-4 overflow-y-auto"
            onClick={this.handleCloseModal}
          >
            <div
              className="bg-gray-900 border border-sky-500/60 rounded-3xl shadow-2xl p-6 md:p-8 max-w-2xl w-full my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* NEW BADGE CELEBRATION BANNER */}
              {newlyUnlockedBadges.length > 0 && (
                <div className="mb-5 p-3.5 bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 border-2 border-amber-400 rounded-2xl animate-pulse text-center">
                  <p className="text-xs uppercase tracking-widest text-amber-300 font-extrabold mb-1">
                    🎉 NEW BADGE UNLOCKED!
                  </p>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    {newlyUnlockedBadges.map((b) => (
                      <span
                        key={b.id}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400 text-black font-black text-sm rounded-full shadow-md"
                      >
                        <span>{b.icon}</span>
                        <span>{b.title}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* SHAREABLE PERFORMANCE CARD (Export Target) */}
              <div
                ref={(el) => (this.cardRef = el)}
                className="bg-gradient-to-br from-slate-950 via-gray-900 to-indigo-950 border-2 border-amber-500/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden text-white mb-6"
              >
                {/* Background watermark & decorative glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Card Header */}
                <div className="flex items-center justify-between border-b border-gray-700/80 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">👑</span>
                    <div>
                      <h3 className="font-extrabold text-sm uppercase tracking-wider text-sky-400">
                        CNAT Typing Learning Lab
                      </h3>
                      <p className="text-[10px] text-amber-300 tracking-widest font-semibold uppercase">
                        Official Performance Certificate
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-xs font-bold">
                      {lastResult.level || "Beginner"}
                    </span>
                  </div>
                </div>

                {/* Lesson Title */}
                <div className="text-center my-3">
                  <p className="text-xs text-gray-400 uppercase tracking-wider">
                    Lesson Completed
                  </p>
                  <h2 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-amber-200 mt-0.5">
                    {lastResult.lessonTitle}
                  </h2>
                  <p className="text-[11px] text-gray-400 mt-1">
                    {this.formatDate(lastResult.date)}
                  </p>
                </div>

                {/* Stat Badges Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-4">
                  <div className="bg-gray-900/90 border border-lime-500/30 rounded-xl p-3 text-center shadow-md">
                    <p className="text-[10px] uppercase font-bold text-gray-400 mb-0.5">
                      Speed
                    </p>
                    <p className="text-2xl font-black text-lime-300">
                      {lastResult.wpm}
                    </p>
                    <p className="text-[10px] text-lime-400 font-semibold">WPM</p>
                  </div>
                  <div className="bg-gray-900/90 border border-amber-500/30 rounded-xl p-3 text-center shadow-md">
                    <p className="text-[10px] uppercase font-bold text-gray-400 mb-0.5">
                      Accuracy
                    </p>
                    <p className="text-2xl font-black text-amber-300">
                      {lastResult.accuracy}%
                    </p>
                    <p className="text-[10px] text-amber-400 font-semibold">
                      {lastResult.accuracy >= 95 ? "Flawless" : "Solid"}
                    </p>
                  </div>
                  <div className="bg-gray-900/90 border border-sky-500/30 rounded-xl p-3 text-center shadow-md">
                    <p className="text-[10px] uppercase font-bold text-gray-400 mb-0.5">
                      Time
                    </p>
                    <p className="text-2xl font-black text-sky-300">
                      {this.formatTime(lastResult.time)}
                    </p>
                    <p className="text-[10px] text-sky-400 font-semibold">
                      {lastResult.chars} chars
                    </p>
                  </div>
                  <div className="bg-gray-900/90 border border-emerald-500/30 rounded-xl p-3 text-center shadow-md">
                    <p className="text-[10px] uppercase font-bold text-gray-400 mb-0.5">
                      XP Earned
                    </p>
                    <p className="text-2xl font-black text-emerald-300">
                      +{lastResult.xpEarned}
                    </p>
                    <p className="text-[10px] text-emerald-400 font-semibold">
                      Lv. {lastResult.levelNum}
                    </p>
                  </div>
                </div>

                {/* Highlights / Badges on Certificate */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-700/80 pt-3 text-xs">
                  <div className="flex items-center gap-2 flex-wrap">
                    {lastResult.accuracy === 100 && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-bold text-[10px]">
                        🎯 100% Perfection
                      </span>
                    )}
                    {lastResult.wpm >= 50 && (
                      <span className="px-2 py-0.5 rounded-full bg-lime-500/20 border border-lime-400 text-lime-300 font-bold text-[10px]">
                        🚀 Speed Demon
                      </span>
                    )}
                    {lastResult.isNewRecord && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400 text-amber-300 font-bold text-[10px]">
                        ⭐ New Best Record!
                      </span>
                    )}
                    <span className="text-gray-400 text-[11px]">
                      Streak:{" "}
                      <span className="text-emerald-300 font-bold">
                        {lastResult.streak} days
                      </span>
                    </span>
                  </div>
                  <div className="text-[10px] text-amber-400/90 font-mono tracking-wider font-bold">
                    VERIFIED #CNAT-{lastResult.lessonId}-{Math.floor(Math.random() * 900 + 100)}
                  </div>
                </div>
              </div>

              {/* CARD DOWNLOAD & SHARE ACTIONS */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
                <button
                  onClick={this.downloadCardAsPNG}
                  disabled={isDownloading}
                  className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs md:text-sm transition flex items-center gap-2 shadow-lg shadow-sky-600/30"
                >
                  <span>📷</span>
                  <span>{isDownloading ? "Generating..." : "Download Card (PNG)"}</span>
                </button>
                <button
                  onClick={this.downloadCardAsPDF}
                  disabled={isDownloading}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs md:text-sm transition flex items-center gap-2 shadow-lg shadow-indigo-600/30"
                >
                  <span>📄</span>
                  <span>Download PDF Certificate</span>
                </button>
                <button
                  onClick={this.copyShareSummary}
                  className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-600 text-gray-200 font-semibold text-xs md:text-sm transition flex items-center gap-2"
                >
                  <span>📋</span>
                  <span>{copiedToast ? "Copied to Clipboard! ✓" : "Copy Share Text"}</span>
                </button>
              </div>

              {/* MODAL FOOTER BUTTONS */}
              <div className="flex flex-wrap justify-center gap-3 pt-3 border-t border-gray-800">
                <button
                  onClick={this.handleRetryFromModal}
                  className="px-4 py-2 rounded-full text-sm bg-gray-800 border border-gray-600 text-gray-100 hover:bg-gray-700"
                >
                  Retry Lesson
                </button>
                <button
                  onClick={this.handleNextFromModal}
                  className={
                    "px-5 py-2 rounded-full text-sm font-semibold border text-white " +
                    (isLastLesson
                      ? "bg-sky-700/40 border-sky-600/60 cursor-not-allowed"
                      : "bg-emerald-600 border-emerald-500 hover:bg-emerald-500 shadow-lg shadow-emerald-600/30")
                  }
                  disabled={isLastLesson}
                >
                  {isLastLesson ? "Final Lesson Done" : "Next Lesson ▶"}
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
            ACHIEVEMENT BADGES GALLERY MODAL
        ============================================== */}
        {showBadgesModal && (
          <div
            className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) this.toggleBadgesModal();
            }}
          >
            <div className="bg-gray-900 border border-amber-500/60 rounded-3xl shadow-2xl p-6 w-full max-w-4xl max-h-[90vh] flex flex-col">
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-800">
                <div className="flex items-center gap-2.5">
                  <span className="text-3xl">🏆</span>
                  <div>
                    <h2 className="text-2xl font-black text-amber-300">
                      Achievement Badges
                    </h2>
                    <p className="text-xs text-gray-400">
                      Unlocked:{" "}
                      <span className="text-amber-300 font-bold">
                        {unlockedBadgesList.length}
                      </span>{" "}
                      of {BADGES.length} total badges
                    </p>
                  </div>
                </div>
                <button
                  onClick={this.toggleBadgesModal}
                  className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-gray-300 hover:bg-gray-700 text-sm font-medium"
                >
                  ✕ Close
                </button>
              </div>

              {/* FILTER TABS */}
              <div className="flex gap-2 mb-4">
                {["all", "unlocked", "locked"].map((tab) => {
                  const isActive = badgesFilter === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => this.setState({ badgesFilter: tab })}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                        isActive
                          ? "bg-amber-500 text-black shadow-md"
                          : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                      }`}
                    >
                      {tab === "all"
                        ? `All (${BADGES.length})`
                        : tab === "unlocked"
                        ? `Unlocked (${unlockedBadgesList.length})`
                        : `Locked (${BADGES.length - unlockedBadgesList.length})`}
                    </button>
                  );
                })}
              </div>

              {/* BADGES GRID */}
              <div className="flex-1 overflow-y-auto pr-1">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {BADGES.filter((badge) => {
                    const isUnlocked = !!unlockedBadges[badge.id];
                    if (badgesFilter === "unlocked") return isUnlocked;
                    if (badgesFilter === "locked") return !isUnlocked;
                    return true;
                  }).map((badge) => {
                    const isUnlocked = !!unlockedBadges[badge.id];
                    const unlockInfo = unlockedBadges[badge.id];
                    return (
                      <div
                        key={badge.id}
                        className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                          isUnlocked
                            ? "bg-gradient-to-br from-gray-800/90 via-gray-800 to-amber-950/40 border-amber-500/60 shadow-lg shadow-amber-500/10"
                            : "bg-gray-900/80 border-gray-800 opacity-60"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${
                              isUnlocked
                                ? "bg-amber-500/25 border border-amber-400 shadow-md"
                                : "bg-gray-800 border border-gray-700 grayscale"
                            }`}
                          >
                            {badge.icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h4
                                className={`font-bold text-sm ${
                                  isUnlocked ? "text-amber-200" : "text-gray-300"
                                }`}
                              >
                                {badge.title}
                              </h4>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-800 text-gray-400 border border-gray-700">
                                {badge.category}
                              </span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                              {badge.description}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-gray-700/50 flex items-center justify-between text-[11px]">
                          {isUnlocked ? (
                            <>
                              <span className="text-emerald-400 font-bold flex items-center gap-1">
                                ✓ Unlocked
                              </span>
                              <span className="text-gray-400 text-[10px]">
                                {unlockInfo?.unlockedAt
                                  ? new Date(
                                      unlockInfo.unlockedAt
                                    ).toLocaleDateString()
                                  : "Completed"}
                              </span>
                            </>
                          ) : (
                            <span className="text-gray-500 italic">
                              🔒 Locked · Complete requirement
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =============================================
            PERFORMANCE RECORDS MODAL
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
                        <td
                          colSpan="7"
                          className="px-3 py-6 text-center text-gray-400"
                        >
                          No records found. Complete a lesson to see data here.
                        </td>
                      </tr>
                    ) : (
                      sortedRecords.map((record, idx) => {
                        const lessonRecords =
                          this.state.performanceRecords.filter(
                            (r) => r.lessonId === record.lessonId
                          );
                        const bestTime = Math.min(
                          ...lessonRecords.map((r) => r.time)
                        );
                        const bestAccuracy = Math.max(
                          ...lessonRecords.map((r) => r.accuracy)
                        );
                        const isBestTime = record.time === bestTime;
                        const isBestAccuracy =
                          record.accuracy === bestAccuracy;
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
                            <td className="px-3 py-2 text-gray-300">
                              {record.level}
                            </td>
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
                            <td className="px-3 py-2 text-gray-300">
                              {record.wpm}
                            </td>
                            <td className="px-3 py-2 text-gray-300">
                              {record.xp}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-3 text-xs text-gray-400 flex justify-between">
                <span>
                  Showing {sortedRecords.length} of{" "}
                  {this.state.performanceRecords.length} total records.
                </span>
                <span>⭐ Best time · 🎯 Best accuracy per lesson</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}