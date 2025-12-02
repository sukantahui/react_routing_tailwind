import React, { Component } from "react";

// ======================================================
// LESSONS (40 TOTAL)
// Levels: Beginner / Intermediate / Advanced / Expert
// ======================================================
const LESSONS = [
  // ------------------------
  // BEGINNER (1–10)
  // ------------------------
  {
    id: 1,
    level: "Beginner",
    title: "Home Row Warm-up",
    description:
      "Start with relaxed home row patterns to get comfortable with the keyboard.",
    text: "asdf jkl; asdf jkl; asdf jkl; asdf jkl; fjdk asdl jakl fjda asdf jkl; asdf jkl;",
    hint: "Keep your fingers curved and lightly resting on the keys.",
  },
  {
    id: 2,
    level: "Beginner",
    title: "Home Row Flow",
    description:
      "Build a smooth flow on the home row using repeated patterns.",
    text: "as as df df jk jk l; l; asdf asdf jkl; jkl; asdf jkl; asdf jkl; asdf jkl;",
    hint: "Try to type without any sudden stops.",
  },
  {
    id: 3,
    level: "Beginner",
    title: "Left Hand – Home Row",
    description: "Focus only on the left-hand keys of the home row.",
    text: "asdf asdf sasa dad fad sad fad asda fads sads dfas asdf asdf",
    hint: "Use only your left-hand fingers for these keys.",
  },
  {
    id: 4,
    level: "Beginner",
    title: "Right Hand – Home Row",
    description: "Strengthen right hand control on the home row keys.",
    text: "jkl; jkl; lkj; kjl; jaja kaka lall jkjk klkl jkl; jkl; jkl;",
    hint: "Return each finger to its home position after pressing a key.",
  },
  {
    id: 5,
    level: "Beginner",
    title: "Top Row Basics",
    description: "Light practice for the QWERTY top row keys.",
    text: "qwer qwer tyui tyui opop qwert yuiop qwer tyui qwerty qwerty",
    hint: "Do not lift your whole hand; only move the fingers.",
  },
  {
    id: 6,
    level: "Beginner",
    title: "Bottom Row Basics",
    description: "Introduce the bottom row with gentle repetition.",
    text: "zxcv zxcv bnm bnm zxzx cvcv bnbn mnmn zxcvbnm zxcvbnm",
    hint: "Keep your wrists relaxed and steady.",
  },
  {
    id: 7,
    level: "Beginner",
    title: "Simple Words Mix",
    description: "Practice very common and simple words.",
    text: "the and is of to in it on at by we me he she you they this that",
    hint: "Say the words in your mind as you type them.",
  },
  {
    id: 8,
    level: "Beginner",
    title: "Short Sentences",
    description: "Type short sentences with basic punctuation.",
    text: "I can type. You can learn. We all improve with practice. Keep going. Do not stop.",
    hint: "Press the space bar lightly and consistently.",
  },
  {
    id: 9,
    level: "Beginner",
    title: "Vowel & Consonant Patterns",
    description: "Mix vowels and consonants to build rhythm.",
    text: "ta te ti to tu sa se si so su la le li lo lu ma me mi mo mu",
    hint: "Watch the screen instead of your keyboard.",
  },
  {
    id: 10,
    level: "Beginner",
    title: "Basic Rhythm Drill",
    description: "Maintain a slow and steady typing rhythm.",
    text: "type slow and steady type slow and steady type slow and steady",
    hint: "Count in your mind and match your typing speed with it.",
  },

  // ------------------------
  // INTERMEDIATE (11–22)
  // ------------------------
  {
    id: 11,
    level: "Intermediate",
    title: "Common English Words",
    description:
      "Practice a mix of high-frequency English words in one line.",
    text: "people about there would could should always never really every other after before again",
    hint: "Focus on accuracy while your speed increases naturally.",
  },
  {
    id: 12,
    level: "Intermediate",
    title: "Mixed Rows Drill",
    description: "Top, middle, and bottom rows combined in patterns.",
    text: "qaz wsx edc rfv tgb yhn ujm qazwsx edcrfv tgb yhn ujm qwert asdfg zxcvb",
    hint: "Keep your hands anchored on the home row.",
  },
  {
    id: 13,
    level: "Intermediate",
    title: "Natural Phrases",
    description: "Type phrases that feel like everyday writing.",
    text: "Practice makes progress. Small steps every day build strong habits. Keep your hands relaxed and your eyes on the screen.",
    hint: "Do not worry about speed, just keep moving forward.",
  },
  {
    id: 14,
    level: "Intermediate",
    title: "Number Row – Light",
    description: "Introduce number keys without pressure.",
    text: "12345 67890 10203 40506 78901 11223 34455 66789",
    hint: "Use the correct finger for each number according to standard layout.",
  },
  {
    id: 15,
    level: "Intermediate",
    title: "Number Row – Practice",
    description:
      "A bit more intense repetition on the number row for familiarity.",
    text: "13579 24680 11111 22222 33333 44444 55555 67890 09876 54321",
    hint: "Glance at the numbers row, then try to type from memory.",
  },
  {
    id: 16,
    level: "Intermediate",
    title: "Simple Story Line",
    description:
      "Type a short story-like paragraph with simple language.",
    text: "A student decided to improve typing skills. Every morning, they spent ten minutes practicing quietly. After a few weeks, typing felt easy and natural.",
    hint: "Breathe calmly and do not tense your shoulders.",
  },
  {
    id: 17,
    level: "Intermediate",
    title: "Speed Pattern Booster",
    description: "Use repeated letter patterns to build fast reactions.",
    text: "asdf asdf asdf jkl; jkl; jkl; qwer qwer qwer zxcv zxcv zxcv qaz qaz qaz wsx wsx wsx",
    hint: "Try to keep the same speed for the entire line.",
  },
  {
    id: 18,
    level: "Intermediate",
    title: "Punctuation Practice",
    description:
      "Use commas, periods, and question marks in real sentences.",
    text: "Typing is a useful skill, and it helps in many jobs. Do you practice regularly? If yes, you will see improvement soon.",
    hint: "Pay attention to where spaces are used with punctuation.",
  },
  {
    id: 19,
    level: "Intermediate",
    title: "Email Style Text",
    description: "Simulate simple professional email content.",
    text: "Dear Sir, I hope you are doing well. This is a gentle reminder about the pending work. Please review the document and share your feedback.",
    hint: "Use Shift for capital letters at the start of sentences.",
  },
  {
    id: 20,
    level: "Intermediate",
    title: "Descriptive Paragraph",
    description:
      "Longer descriptive text to improve endurance and accuracy.",
    text: "The room was silent except for the soft sound of keys being pressed. Each letter appeared on the screen, slowly forming words and sentences full of meaning.",
    hint: "Focus on staying relaxed over longer text.",
  },
  {
    id: 21,
    level: "Intermediate",
    title: "Daily Routine Text",
    description:
      "Practice a paragraph about a simple daily routine scenario.",
    text: "Every day begins with a plan. You wake up, get ready, and decide how to use your time. A little planning and a little discipline can make the entire day productive.",
    hint: "Maintain even spacing between words.",
  },
  {
    id: 22,
    level: "Intermediate",
    title: "Question & Answer Style",
    description:
      "Practice questions and answers to simulate real typing use.",
    text: "Why should you practice typing? Because it saves time. How often should you practice? At least a few minutes every day.",
    hint: "Be careful with question marks and periods.",
  },

  // ------------------------
  // ADVANCED (23–34)
  // ------------------------
  {
    id: 23,
    level: "Advanced",
    title: "Focused Accuracy Paragraph",
    description:
      "Longer paragraph where accuracy is more important than speed.",
    text: "Accuracy builds confidence. When you know that your fingers press the right keys, you can type faster without fear. This calm confidence comes only from focused practice.",
    hint: "Try to complete this without any backspace if possible.",
  },
  {
    id: 24,
    level: "Advanced",
    title: "Fast-paced Sentence Mix",
    description:
      "Multiple sentences with varying lengths to challenge your rhythm.",
    text: "Fast typing is impressive, but clear typing is powerful. Short sentences test control. Longer sentences test patience and consistency.",
    hint: "Vary your speed slightly but avoid losing control.",
  },
  {
    id: 25,
    level: "Advanced",
    title: "Typing a Mini Article",
    description:
      "Simulate typing a small article-like paragraph for practice.",
    text: "In the digital age, typing is a fundamental skill. From writing emails to creating reports, quick and accurate typing helps you work efficiently and communicate clearly with others.",
    hint: "Pretend this is a real assignment you must submit.",
  },
  {
    id: 26,
    level: "Advanced",
    title: "Mixed Numbers & Words",
    description: "Combine words, dates, and simple numbers.",
    text: "The meeting starts at 10:30 AM on 15th June. Please bring 2 copies of the report and 1 pen drive with the backup files.",
    hint: "Watch out for numbers, colons, and abbreviations.",
  },
  {
    id: 27,
    level: "Advanced",
    title: "Symbol-rich Practice",
    description: "Frequently used symbols inside real phrases.",
    text: "Save the file as report_final_v2.docx and upload it to the shared folder. Use the password: Safe@123 to open the protected sheet.",
    hint: "Give extra attention to underscores, dots, and @ symbol.",
  },
  {
    id: 28,
    level: "Advanced",
    title: "Story-style Paragraph",
    description: "A compact story paragraph for natural-flow practice.",
    text: "A soft breeze entered the room as the window opened. The student sat near the desk, practicing typing again and again, determined to cross every previous speed record.",
    hint: "Imagine the scene while you type to stay engaged.",
  },
  {
    id: 29,
    level: "Advanced",
    title: "Motivational Text",
    description: "Practice motivational lines while encouraging yourself.",
    text: "You do not need to be perfect to begin. You simply need to start, stay patient, and show up for practice. Every session adds a small layer of improvement.",
    hint: "Type with a calm and confident mindset.",
  },
  {
    id: 30,
    level: "Advanced",
    title: "Dialogue-style Text",
    description: "Simulate small conversations and quotes.",
    text: "\"Can I really type faster?\" the learner asked. \"Yes,\" the mentor replied, \"if you keep practicing without giving up.\"",
    hint: "Be careful with quotation marks and commas.",
  },
  {
    id: 31,
    level: "Advanced",
    title: "Exam Simulation Paragraph",
    description:
      "Simulated exam-style paragraph to mimic test conditions.",
    text: "During an exam, every second matters. Typing quickly can save precious time, but it is useless without accuracy. Practicing now prepares your mind and hands for that pressure.",
    hint: "Imagine you are in a real exam environment.",
  },
  {
    id: 32,
    level: "Advanced",
    title: "Long-form Practice",
    description: "Longer block of text to build stamina.",
    text: "Long typing sessions test your posture, breathing, focus, and patience. Take short breaks when needed, but always come back with fresh energy to continue learning and improving.",
    hint: "Do not rush. Maintain posture and breathe normally.",
  },
  {
    id: 33,
    level: "Advanced",
    title: "Descriptive Scene Typing",
    description: "Type a descriptive passage to improve consistency.",
    text: "The sky slowly changed its color from bright blue to a soft orange. People walked home, the street lights turned on, and the sound of keyboards echoed in quiet rooms.",
    hint: "Enjoy the imagery as you type the description.",
  },
  {
    id: 34,
    level: "Advanced",
    title: "Office Scenario Text",
    description: "Practice paragraphs based on office communication.",
    text: "The team planned a weekly review meeting to discuss progress. Each member shared updates, challenges, and ideas that could make the workflow smoother and more efficient.",
    hint: "This type of content appears often in real jobs.",
  },

  // ------------------------
  // EXPERT (35–40)
  // ------------------------
  {
    id: 35,
    level: "Expert",
    title: "High-focus Practice Paragraph",
    description:
      "Dense text that requires strong concentration and typing control.",
    text: "Complex tasks demand not only skill but also mental clarity. When you type for long hours, your ability to stay focused, accurate, and calm becomes a valuable strength.",
    hint: "This is about mental focus as much as typing skill.",
  },
  {
    id: 36,
    level: "Expert",
    title: "Advanced Mixed Content",
    description:
      "Realistic mix of words, numbers, and symbols used in daily work.",
    text: "Project ID: CN-2048-AX7. Deadline: 31/12/2025. Please upload all files to drive folder /clients/active and send a confirmation email to support@example.com.",
    hint: "Notice slashes, dashes, and email format carefully.",
  },
  {
    id: 37,
    level: "Expert",
    title: "Fast Thinking Text",
    description:
      "Text that encourages thinking and typing at the same time.",
    text: "As your fingers move faster, your thoughts must also stay ahead. You begin to plan the next word, the next sentence, and even the next idea while typing the current one.",
    hint: "Do not overthink individual letters; think in words.",
  },
  {
    id: 38,
    level: "Expert",
    title: "Long Motivational Block",
    description: "Deep motivational text for long-form continuous typing.",
    text: "Improvement is rarely visible in the beginning. For many days, your speed may feel the same. But underneath that feeling, your fingers are learning patterns and shortcuts that slowly transform your typing ability.",
    hint: "Try to complete this in one continuous attempt.",
  },
  {
    id: 39,
    level: "Expert",
    title: "Mock Test Paragraph",
    description:
      "Use this as a mock test to measure your focus and stamina.",
    text: "Set a timer for a few minutes and type this passage as if it were a real test. When the time ends, note your accuracy and observe how your hands and mind feel.",
    hint: "Use this often to simulate real typing tests.",
  },
  {
    id: 40,
    level: "Expert",
    title: "Final Challenge",
    description:
      "A final all-round challenge for letters, numbers, and symbols.",
    text: "Typing skill is a lifelong asset. Whether you work with code, content, data, or design, your ability to type fast and accurately will always save time and open new opportunities in your career.",
    hint: "Treat this as a final practice before your real-world work.",
  },
];

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
        <div className="w-full max-w-5xl grid md:grid-cols-[2fr,1.2fr] gap-6">
          {/* LEFT: PRACTICE AREA */}
          <div className="bg-gray-800/80 border border-gray-700 rounded-2xl p-5 md:p-6 shadow-xl">
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
          <div className="space-y-5">
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
