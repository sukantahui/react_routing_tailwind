// ============================================================================
// QuestionBankManager.jsx - Ultra-Modern Question Bank & Curriculum Portal
// For Teachers and Administrators to manage Subjects, Chapters, Topics,
// Questions, Multiple Options, and Correct Answer Keys.
// ============================================================================

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import {
  BookOpen,
  FolderTree,
  FileQuestion,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Edit3,
  Trash2,
  Copy,
  Layers,
  Sparkles,
  HelpCircle,
  Tag,
  Code2,
  ChevronRight,
  Eye,
  RefreshCw,
  Award,
  Check,
  X,
  GraduationCap,
  Bookmark,
  CheckSquare,
  Radio,
  BookMarked,
  Sparkle
} from "lucide-react";
import questionBankService from "../../services/questionBankService";

export default function QuestionBankManager() {
  // -------------------------------------------------------------
  // Data States
  // -------------------------------------------------------------
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [topics, setTopics] = useState([]);
  const [questionTypes, setQuestionTypes] = useState([]);
  const [questionLevels, setQuestionLevels] = useState([]);
  const [questions, setQuestions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // -------------------------------------------------------------
  // Filter States
  // -------------------------------------------------------------
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState("all");
  const [selectedChapterFilter, setSelectedChapterFilter] = useState("all");
  const [selectedTopicFilter, setSelectedTopicFilter] = useState("all");
  const [selectedLevelFilter, setSelectedLevelFilter] = useState("all");
  const [selectedTypeFilter, setSelectedTypeFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // -------------------------------------------------------------
  // Question Modal States (Create / Edit)
  // -------------------------------------------------------------
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState(null);

  const initialFormState = {
    subject_id: "",
    chapter_id: "",
    topic_id: "",
    question_type_id: 1,
    question_level_id: 1,
    question_text: "",
    question_code: "",
    question_tags: [],
    tagInput: "",
    applicable_to: [],
    inforce: true,
    options: [
      { option_text: "", is_correct: true, option_code: "" },
      { option_text: "", is_correct: false, option_code: "" },
      { option_text: "", is_correct: false, option_code: "" },
      { option_text: "", is_correct: false, option_code: "" },
    ],
  };

  const [formData, setFormData] = useState(initialFormState);

  // -------------------------------------------------------------
  // Quick Add Sub-modals (Subject, Chapter, Topic)
  // -------------------------------------------------------------
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [subjectForm, setSubjectForm] = useState({ subject_code: "", subject_name: "", subject_description: "" });

  const [isChapterModalOpen, setIsChapterModalOpen] = useState(false);
  const [chapterForm, setChapterForm] = useState({ subject_id: "", chapter_name: "" });

  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [topicForm, setTopicForm] = useState({ chapter_id: "", topic_name: "", topic_description: "" });

  // -------------------------------------------------------------
  // Dark SweetAlert Helper
  // -------------------------------------------------------------
  const showToast = (icon, title) => {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon,
      title,
      showConfirmButton: false,
      timer: 2500,
      background: "#0f172a",
      color: "#f8fafc",
      iconColor: icon === "success" ? "#38bdf8" : "#f43f5e",
    });
  };

  // -------------------------------------------------------------
  // Initial Data Fetch
  // -------------------------------------------------------------
  const fetchAllData = useCallback(async () => {
    setLoading(true);
    try {
      const [subs, chaps, tops, qTypes, qLevels, qList] = await Promise.all([
        questionBankService.getSubjects().catch(() => []),
        questionBankService.getChapters().catch(() => []),
        questionBankService.getTopics().catch(() => []),
        questionBankService.getQuestionTypes().catch(() => []),
        questionBankService.getQuestionLevels().catch(() => []),
        questionBankService.getQuestions().catch(() => []),
      ]);

      setSubjects(Array.isArray(subs) ? subs : []);
      setChapters(Array.isArray(chaps) ? chaps : []);
      setTopics(Array.isArray(tops) ? tops : []);
      setQuestionTypes(Array.isArray(qTypes) ? qTypes : []);
      setQuestionLevels(Array.isArray(qLevels) ? qLevels : []);
      setQuestions(Array.isArray(qList) ? qList : []);
    } catch (error) {
      console.error("Failed to load question bank data:", error);
      showToast("error", "Failed to connect to Question Bank API");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // -------------------------------------------------------------
  // Cascading Dropdown Computations
  // -------------------------------------------------------------
  // Filter chapters by selected subject filter in UI
  const availableChaptersForFilter = useMemo(() => {
    if (selectedSubjectFilter === "all") return chapters;
    return chapters.filter((c) => String(c.subjectId || c.subject_id) === String(selectedSubjectFilter));
  }, [chapters, selectedSubjectFilter]);

  // Filter topics by selected chapter filter in UI
  const availableTopicsForFilter = useMemo(() => {
    if (selectedChapterFilter === "all") {
      if (selectedSubjectFilter === "all") return topics;
      const validChapIds = new Set(availableChaptersForFilter.map((c) => String(c.chapterId || c.id)));
      return topics.filter((t) => validChapIds.has(String(t.chapterId || t.chapter_id)));
    }
    return topics.filter((t) => String(t.chapterId || t.chapter_id) === String(selectedChapterFilter));
  }, [topics, selectedChapterFilter, selectedSubjectFilter, availableChaptersForFilter]);

  // Form chapters (based on selected subject in modal form)
  const formChapters = useMemo(() => {
    if (!formData.subject_id) return [];
    return chapters.filter((c) => String(c.subjectId || c.subject_id) === String(formData.subject_id));
  }, [chapters, formData.subject_id]);

  // Form topics (based on selected chapter in modal form)
  const formTopics = useMemo(() => {
    if (!formData.chapter_id) return [];
    return topics.filter((t) => String(t.chapterId || t.chapter_id) === String(formData.chapter_id));
  }, [topics, formData.chapter_id]);

  // -------------------------------------------------------------
  // Filtered Questions List
  // -------------------------------------------------------------
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      // Subject Filter
      if (selectedSubjectFilter !== "all") {
        const qSubId = q.subject?.id || q.subject?.subjectId || q.subjectId;
        if (String(qSubId) !== String(selectedSubjectFilter)) {
          // Check via topic -> chapter -> subject
          const top = topics.find((t) => String(t.topicId || t.id) === String(q.topicId || q.topic_id));
          const chap = chapters.find((c) => String(c.chapterId || c.id) === String(top?.chapterId || top?.chapter_id));
          if (String(chap?.subjectId || chap?.subject_id) !== String(selectedSubjectFilter)) {
            return false;
          }
        }
      }

      // Chapter Filter
      if (selectedChapterFilter !== "all") {
        const qChapId = q.chapter?.id || q.chapter?.chapterId || q.chapterId;
        if (String(qChapId) !== String(selectedChapterFilter)) {
          const top = topics.find((t) => String(t.topicId || t.id) === String(q.topicId || q.topic_id));
          if (String(top?.chapterId || top?.chapter_id) !== String(selectedChapterFilter)) {
            return false;
          }
        }
      }

      // Topic Filter
      if (selectedTopicFilter !== "all") {
        const qTopicId = q.topic?.id || q.topic?.topicId || q.topicId || q.topic_id;
        if (String(qTopicId) !== String(selectedTopicFilter)) return false;
      }

      // Level Filter
      if (selectedLevelFilter !== "all") {
        const qLevelId = q.questionLevel?.id || q.questionLevel?.questionLevelId || q.questionLevelId || q.question_level_id;
        if (String(qLevelId) !== String(selectedLevelFilter)) return false;
      }

      // Type Filter
      if (selectedTypeFilter !== "all") {
        const qTypeId = q.questionType?.id || q.questionType?.questionTypeId || q.questionTypeId || q.question_type_id;
        if (String(qTypeId) !== String(selectedTypeFilter)) return false;
      }

      // Search Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const textMatch = (q.questionText || q.question_text || "").toLowerCase().includes(query);
        const codeMatch = (q.questionCode || q.question_code || "").toLowerCase().includes(query);
        const tagMatch = Array.isArray(q.questionTags || q.question_tags)
          ? (q.questionTags || q.question_tags).some((t) => String(t).toLowerCase().includes(query))
          : false;
        const topicMatch = (q.topic?.topicName || "").toLowerCase().includes(query);
        const chapterMatch = (q.chapter?.chapterName || "").toLowerCase().includes(query);
        const subjectMatch = (q.subject?.subjectName || "").toLowerCase().includes(query);

        if (!textMatch && !codeMatch && !tagMatch && !topicMatch && !chapterMatch && !subjectMatch) {
          return false;
        }
      }

      return true;
    });
  }, [
    questions,
    selectedSubjectFilter,
    selectedChapterFilter,
    selectedTopicFilter,
    selectedLevelFilter,
    selectedTypeFilter,
    searchQuery,
    topics,
    chapters,
  ]);

  // -------------------------------------------------------------
  // Question Form Handlers
  // -------------------------------------------------------------
  const handleOpenCreateModal = (presetTopicId = null) => {
    setEditingQuestionId(null);
    let initialSub = "";
    let initialChap = "";
    let initialTop = presetTopicId || "";

    if (presetTopicId) {
      const top = topics.find((t) => String(t.topicId || t.id) === String(presetTopicId));
      if (top) {
        initialChap = top.chapterId || top.chapter_id || "";
        const chap = chapters.find((c) => String(c.chapterId || c.id) === String(initialChap));
        if (chap) {
          initialSub = chap.subjectId || chap.subject_id || "";
        }
      }
    } else if (selectedTopicFilter !== "all") {
      initialTop = selectedTopicFilter;
      const top = topics.find((t) => String(t.topicId || t.id) === String(selectedTopicFilter));
      if (top) {
        initialChap = top.chapterId || top.chapter_id || "";
        const chap = chapters.find((c) => String(c.chapterId || c.id) === String(initialChap));
        if (chap) initialSub = chap.subjectId || chap.subject_id || "";
      }
    } else if (selectedChapterFilter !== "all") {
      initialChap = selectedChapterFilter;
      const chap = chapters.find((c) => String(c.chapterId || c.id) === String(selectedChapterFilter));
      if (chap) initialSub = chap.subjectId || chap.subject_id || "";
    } else if (selectedSubjectFilter !== "all") {
      initialSub = selectedSubjectFilter;
    }

    setFormData({
      ...initialFormState,
      subject_id: initialSub,
      chapter_id: initialChap,
      topic_id: initialTop,
      question_type_id: questionTypes[0]?.id || 1,
      question_level_id: questionLevels[0]?.id || 1,
    });
    setIsQuestionModalOpen(true);
  };

  const handleOpenEditModal = (q) => {
    setEditingQuestionId(q.id || q.questionId);

    // Resolve topic, chapter, and subject IDs
    const topicId = q.topic?.id || q.topic?.topicId || q.topicId || q.topic_id || "";
    const topObj = topics.find((t) => String(t.topicId || t.id) === String(topicId));
    const chapterId = q.chapter?.id || q.chapter?.chapterId || topObj?.chapterId || topObj?.chapter_id || "";
    const chapObj = chapters.find((c) => String(c.chapterId || c.id) === String(chapterId));
    const subjectId = q.subject?.id || q.subject?.subjectId || chapObj?.subjectId || chapObj?.subject_id || "";

    const parsedOptions = Array.isArray(q.options) && q.options.length > 0
      ? q.options.map((opt) => ({
          id: opt.id,
          option_text: opt.optionText || opt.option_text || "",
          is_correct: Boolean(opt.isCorrect || opt.is_correct),
          option_code: opt.optionCode || opt.option_code || "",
        }))
      : [
          { option_text: "", is_correct: true, option_code: "" },
          { option_text: "", is_correct: false, option_code: "" },
          { option_text: "", is_correct: false, option_code: "" },
          { option_text: "", is_correct: false, option_code: "" },
        ];

    setFormData({
      subject_id: subjectId,
      chapter_id: chapterId,
      topic_id: topicId,
      question_type_id: q.questionType?.id || q.questionTypeId || q.question_type_id || 1,
      question_level_id: q.questionLevel?.id || q.questionLevelId || q.question_level_id || 1,
      question_text: q.questionText || q.question_text || "",
      question_code: q.questionCode || q.question_code || "",
      question_tags: Array.isArray(q.questionTags || q.question_tags) ? [...(q.questionTags || q.question_tags)] : [],
      tagInput: "",
      applicable_to: Array.isArray(q.applicableTo || q.applicable_to) ? [...(q.applicableTo || q.applicable_to)] : [],
      inforce: q.inforce !== undefined ? Boolean(q.inforce) : true,
      options: parsedOptions,
    });

    setIsQuestionModalOpen(true);
  };

  // Option change handler
  const handleOptionChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.options];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, options: updated };
    });
  };

  // Correct answer radio / toggle handler
  const handleSetCorrectOption = (index) => {
    const isMultipleChoice = Number(formData.question_type_id) === 3; // Type 3 is Multiple Answers
    setFormData((prev) => {
      const updated = prev.options.map((opt, i) => {
        if (isMultipleChoice) {
          return i === index ? { ...opt, is_correct: !opt.is_correct } : opt;
        } else {
          return { ...opt, is_correct: i === index };
        }
      });
      return { ...prev, options: updated };
    });
  };

  const handleAddOption = () => {
    setFormData((prev) => ({
      ...prev,
      options: [...prev.options, { option_text: "", is_correct: false, option_code: "" }],
    }));
  };

  const handleRemoveOption = (index) => {
    if (formData.options.length <= 2) {
      showToast("warning", "A question must have at least 2 options.");
      return;
    }
    setFormData((prev) => {
      const updated = prev.options.filter((_, i) => i !== index);
      // Ensure at least one option remains marked correct
      if (!updated.some((opt) => opt.is_correct) && updated.length > 0) {
        updated[0].is_correct = true;
      }
      return { ...prev, options: updated };
    });
  };

  const handleApplyPreset4MCQ = () => {
    setFormData((prev) => ({
      ...prev,
      question_type_id: 1, // MCQ
      options: [
        { option_text: prev.options[0]?.option_text || "", is_correct: true, option_code: "" },
        { option_text: prev.options[1]?.option_text || "", is_correct: false, option_code: "" },
        { option_text: prev.options[2]?.option_text || "", is_correct: false, option_code: "" },
        { option_text: prev.options[3]?.option_text || "", is_correct: false, option_code: "" },
      ],
    }));
  };

  const handleApplyPresetTrueFalse = () => {
    setFormData((prev) => ({
      ...prev,
      question_type_id: 2, // True/False
      options: [
        { option_text: "True", is_correct: true, option_code: "" },
        { option_text: "False", is_correct: false, option_code: "" },
      ],
    }));
  };

  // Tag input handling
  const handleAddTag = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = formData.tagInput.trim().replace(/^,+|,+$/g, "");
      if (val && !formData.question_tags.includes(val)) {
        setFormData((prev) => ({
          ...prev,
          question_tags: [...prev.question_tags, val],
          tagInput: "",
        }));
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      question_tags: prev.question_tags.filter((t) => t !== tagToRemove),
    }));
  };

  // -------------------------------------------------------------
  // Submit Question (Create or Update)
  // -------------------------------------------------------------
  const handleSubmitQuestion = async (e) => {
    e.preventDefault();

    if (!formData.topic_id) {
      Swal.fire({
        icon: "warning",
        title: "Topic Required",
        text: "Please select a curriculum Topic for this question.",
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#0284c7",
      });
      return;
    }

    if (!formData.question_text.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Question Statement Required",
        text: "Please enter the question text or problem statement.",
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#0284c7",
      });
      return;
    }

    // Validate options
    const cleanOptions = formData.options
      .map((opt) => ({
        ...opt,
        option_text: opt.option_text.trim(),
        option_code: opt.option_code?.trim() || null,
      }))
      .filter((opt) => opt.option_text.length > 0);

    if (cleanOptions.length < 2) {
      Swal.fire({
        icon: "warning",
        title: "Options Incomplete",
        text: "Please provide at least 2 valid, non-empty options.",
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#0284c7",
      });
      return;
    }

    if (!cleanOptions.some((opt) => opt.is_correct)) {
      Swal.fire({
        icon: "warning",
        title: "Correct Answer Required",
        text: "Please mark at least one option as the correct answer.",
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#0284c7",
      });
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        question_text: formData.question_text.trim(),
        question_code: formData.question_code.trim() || null,
        topic_id: Number(formData.topic_id),
        question_type_id: Number(formData.question_type_id),
        question_level_id: Number(formData.question_level_id),
        question_tags: formData.question_tags,
        applicable_to: formData.applicable_to,
        inforce: Boolean(formData.inforce),
        options: cleanOptions,
      };

      if (editingQuestionId) {
        await questionBankService.updateQuestion(editingQuestionId, payload);
        showToast("success", "Question and answer keys updated!");
      } else {
        await questionBankService.createQuestion(payload);
        showToast("success", "New question added to Question Bank!");
      }

      setIsQuestionModalOpen(false);
      fetchAllData();
    } catch (error) {
      console.error("Failed to save question:", error);
      const msg =
        error.response?.data?.message ||
        (error.response?.data?.errors
          ? Object.values(error.response.data.errors).flat().join(" ")
          : "Failed to save question. Please verify input data.");
      Swal.fire({
        icon: "error",
        title: "Submission Error",
        text: msg,
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#f43f5e",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // -------------------------------------------------------------
  // Delete Question
  // -------------------------------------------------------------
  const handleDeleteQuestion = async (q) => {
    const qId = q.id || q.questionId;
    const result = await Swal.fire({
      title: "Delete Question?",
      html: `
        <div class="text-left text-xs sm:text-sm space-y-2 text-slate-300">
          <p>Are you sure you want to delete this question and all its answer options?</p>
          <div class="p-2.5 rounded bg-slate-900 border border-slate-800 font-mono text-xs text-amber-300">
            "${(q.questionText || q.question_text || "").slice(0, 100)}..."
          </div>
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      background: "#0f172a",
      color: "#f8fafc",
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#475569",
    });

    if (result.isConfirmed) {
      try {
        await questionBankService.deleteQuestion(qId);
        showToast("success", "Question deleted successfully.");
        setQuestions((prev) => prev.filter((item) => (item.id || item.questionId) !== qId));
      } catch (error) {
        console.error("Failed to delete question:", error);
        showToast("error", "Could not delete question.");
      }
    }
  };

  // -------------------------------------------------------------
  // Quick Add Handlers (Subject, Chapter, Topic)
  // -------------------------------------------------------------
  const handleCreateSubject = async (e) => {
    e.preventDefault();
    if (!subjectForm.subject_name.trim() || !subjectForm.subject_code.trim()) {
      showToast("warning", "Subject code and name are required.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await questionBankService.createSubject({
        subject_code: subjectForm.subject_code.trim(),
        subject_name: subjectForm.subject_name.trim(),
        subject_description: subjectForm.subject_description.trim() || null,
        Inforce: 1,
      });
      showToast("success", `Subject "${subjectForm.subject_name}" created!`);
      setIsSubjectModalOpen(false);
      setSubjectForm({ subject_code: "", subject_name: "", subject_description: "" });

      // Refresh data and auto-select new subject
      const subs = await questionBankService.getSubjects();
      setSubjects(subs);
      const newSubId = res.data?.id || res.data?.subjectId || res.id;
      if (newSubId) {
        setFormData((prev) => ({ ...prev, subject_id: String(newSubId) }));
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Could not create subject.";
      Swal.fire({ icon: "error", title: "Creation Failed", text: msg, background: "#0f172a", color: "#f8fafc" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateChapter = async (e) => {
    e.preventDefault();
    if (!chapterForm.subject_id || !chapterForm.chapter_name.trim()) {
      showToast("warning", "Please select a subject and enter chapter name.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await questionBankService.createChapter({
        subject_id: Number(chapterForm.subject_id),
        chapter_name: chapterForm.chapter_name.trim(),
        Inforce: 1,
      });
      showToast("success", `Chapter "${chapterForm.chapter_name}" created!`);
      setIsChapterModalOpen(false);
      setChapterForm({ subject_id: "", chapter_name: "" });

      const chaps = await questionBankService.getChapters();
      setChapters(chaps);
      const newChapId = res.data?.id || res.data?.chapterId || res.id;
      if (newChapId) {
        setFormData((prev) => ({ ...prev, chapter_id: String(newChapId) }));
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Could not create chapter.";
      Swal.fire({ icon: "error", title: "Creation Failed", text: msg, background: "#0f172a", color: "#f8fafc" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateTopic = async (e) => {
    e.preventDefault();
    if (!topicForm.chapter_id || !topicForm.topic_name.trim()) {
      showToast("warning", "Please select a chapter and enter topic name.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await questionBankService.createTopic({
        chapter_id: Number(topicForm.chapter_id),
        topic_name: topicForm.topic_name.trim(),
        topic_description: topicForm.topic_description.trim() || null,
      });
      showToast("success", `Topic "${topicForm.topic_name}" created!`);
      setIsTopicModalOpen(false);
      setTopicForm({ chapter_id: "", topic_name: "", topic_description: "" });

      const tops = await questionBankService.getTopics();
      setTopics(tops);
      const newTopicId = res.data?.id || res.data?.topicId || res.id;
      if (newTopicId) {
        setFormData((prev) => ({ ...prev, topic_id: String(newTopicId) }));
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Could not create topic.";
      Swal.fire({ icon: "error", title: "Creation Failed", text: msg, background: "#0f172a", color: "#f8fafc" });
    } finally {
      setSubmitting(false);
    }
  };

  // Helper for difficulty badge
  const getLevelBadge = (levelName) => {
    const l = (levelName || "").toLowerCase();
    if (l.includes("easy")) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          Easy
        </span>
      );
    }
    if (l.includes("hard")) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span>
          Hard
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
        Medium
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* ------------------------------------------------------------- */}
      {/* Header & Stats Banner */}
      {/* ------------------------------------------------------------- */}
      <div className="pt-6 pb-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold mb-2">
              <Sparkles size={14} />
              <span>Academic Question Bank &amp; Curriculum Governance</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              <BookOpen className="text-sky-400" size={32} />
              Question &amp; Option Bank
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Curate MCQs, structured questions, and answer keys across Subjects, Chapters, and Topics.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => handleOpenCreateModal()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-sky-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus size={18} />
              <span>Add Question</span>
            </button>

            <button
              onClick={() => setIsSubjectModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-all"
            >
              <Plus size={14} className="text-indigo-400" />
              <span>Subject</span>
            </button>

            <button
              onClick={() => setIsChapterModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-all"
            >
              <Plus size={14} className="text-purple-400" />
              <span>Chapter</span>
            </button>

            <button
              onClick={() => setIsTopicModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-all"
            >
              <Plus size={14} className="text-emerald-400" />
              <span>Topic</span>
            </button>

            <button
              onClick={fetchAllData}
              disabled={loading}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-all disabled:opacity-50"
              title="Refresh question bank"
            >
              <RefreshCw size={18} className={loading ? "animate-spin text-sky-400" : ""} />
            </button>
          </div>
        </div>

        {/* Overview Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950 border border-slate-800/80 shadow-inner flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <FileQuestion size={20} />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Questions</p>
              <p className="text-xl sm:text-2xl font-black text-white">{questions.length}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950 border border-slate-800/80 shadow-inner flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <BookOpen size={20} />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Subjects</p>
              <p className="text-xl sm:text-2xl font-black text-white">{subjects.length}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950 border border-slate-800/80 shadow-inner flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <FolderTree size={20} />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Chapters</p>
              <p className="text-xl sm:text-2xl font-black text-white">{chapters.length}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950 border border-slate-800/80 shadow-inner flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Layers size={20} />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Topics</p>
              <p className="text-xl sm:text-2xl font-black text-white">{topics.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Filters & Cascading Search Engine */}
      {/* ------------------------------------------------------------- */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 mb-8 shadow-xl">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search question statement, code snippet, tag, topic..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500/60 focus:ring-1 focus:ring-sky-500/60 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Subject Filter */}
          <div className="w-full lg:w-52">
            <select
              value={selectedSubjectFilter}
              onChange={(e) => {
                setSelectedSubjectFilter(e.target.value);
                setSelectedChapterFilter("all");
                setSelectedTopicFilter("all");
              }}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-sky-500/60 transition-all cursor-pointer"
            >
              <option value="all">📚 All Subjects ({subjects.length})</option>
              {subjects.map((sub) => (
                <option key={sub.subjectId || sub.id} value={sub.subjectId || sub.id}>
                  {sub.subjectName || sub.subject_name}
                </option>
              ))}
            </select>
          </div>

          {/* Chapter Filter */}
          <div className="w-full lg:w-52">
            <select
              value={selectedChapterFilter}
              onChange={(e) => {
                setSelectedChapterFilter(e.target.value);
                setSelectedTopicFilter("all");
              }}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-sky-500/60 transition-all cursor-pointer"
            >
              <option value="all">📂 All Chapters ({availableChaptersForFilter.length})</option>
              {availableChaptersForFilter.map((chap) => (
                <option key={chap.chapterId || chap.id} value={chap.chapterId || chap.id}>
                  {chap.chapterName || chap.chapter_name}
                </option>
              ))}
            </select>
          </div>

          {/* Topic Filter */}
          <div className="w-full lg:w-52">
            <select
              value={selectedTopicFilter}
              onChange={(e) => setSelectedTopicFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-sky-500/60 transition-all cursor-pointer"
            >
              <option value="all">📑 All Topics ({availableTopicsForFilter.length})</option>
              {availableTopicsForFilter.map((top) => (
                <option key={top.topicId || top.id} value={top.topicId || top.id}>
                  {top.topicName || top.topic_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Secondary filters (Difficulty Level, Question Type) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/60 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-500 font-medium">Difficulty:</span>
            <button
              onClick={() => setSelectedLevelFilter("all")}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                selectedLevelFilter === "all"
                  ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold"
                  : "bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              All Levels
            </button>
            {questionLevels.map((lvl) => (
              <button
                key={lvl.id || lvl.questionLevelId}
                onClick={() => setSelectedLevelFilter(String(lvl.id || lvl.questionLevelId))}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  String(selectedLevelFilter) === String(lvl.id || lvl.questionLevelId)
                    ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold"
                    : "bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-slate-800"
                }`}
              >
                {lvl.questionLevelName || lvl.question_level_name}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-500 font-medium">Type:</span>
            <button
              onClick={() => setSelectedTypeFilter("all")}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                selectedTypeFilter === "all"
                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold"
                  : "bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              All Types
            </button>
            {questionTypes.map((typ) => (
              <button
                key={typ.id || typ.questionTypeId}
                onClick={() => setSelectedTypeFilter(String(typ.id || typ.questionTypeId))}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  String(selectedTypeFilter) === String(typ.id || typ.questionTypeId)
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold"
                    : "bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-slate-800"
                }`}
              >
                {typ.questionTypeName || typ.question_type_name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Questions Listing */}
      {/* ------------------------------------------------------------- */}
      {loading ? (
        <div className="py-24 text-center space-y-4">
          <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-400 text-sm">Loading Question Bank &amp; Options...</p>
        </div>
      ) : filteredQuestions.length === 0 ? (
        <div className="py-16 text-center space-y-4 p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80">
          <div className="w-16 h-16 rounded-2xl bg-slate-800/60 flex items-center justify-center text-slate-500 mx-auto">
            <FileQuestion size={32} />
          </div>
          <h3 className="text-lg font-bold text-white">No Questions Found</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            {searchQuery || selectedSubjectFilter !== "all" || selectedChapterFilter !== "all" || selectedTopicFilter !== "all"
              ? "No questions match your filter criteria. Try adjusting filters or search query."
              : "Your question bank is empty. Get started by adding your first question!"}
          </p>
          <button
            onClick={() => handleOpenCreateModal()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold transition-all"
          >
            <Plus size={16} />
            <span>Add Question</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Showing <strong className="text-white font-bold">{filteredQuestions.length}</strong> questions</span>
            <span>Sorted by newest</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredQuestions.map((q, idx) => {
              const qId = q.id || q.questionId;
              const options = q.options || [];
              const subjectName = q.subject?.subjectName || q.subject?.subject_name || "General";
              const chapterName = q.chapter?.chapterName || q.chapter?.chapter_name || "Curriculum";
              const topicName = q.topic?.topicName || q.topic?.topic_name || "Topic";
              const levelName = q.questionLevel?.questionLevelName || q.questionLevel?.question_level_name || "Easy";
              const typeName = q.questionType?.questionTypeName || q.questionType?.question_type_name || "MCQ";

              return (
                <motion.div
                  key={qId}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: Math.min(idx * 0.03, 0.3) }}
                  className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800/80 hover:border-slate-700/80 transition-all shadow-lg space-y-4 group"
                >
                  {/* Top Row: Hierarchy Breadcrumbs & Action controls */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/60 pb-3">
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400 font-mono">
                      <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-semibold">
                        {subjectName}
                      </span>
                      <ChevronRight size={12} className="text-slate-600" />
                      <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                        {chapterName}
                      </span>
                      <ChevronRight size={12} className="text-slate-600" />
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium">
                        {topicName}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {getLevelBadge(levelName)}
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/30">
                        {typeName}
                      </span>

                      {/* Edit / Delete buttons */}
                      <div className="flex items-center gap-1 ml-2">
                        <button
                          onClick={() => handleOpenEditModal(q)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
                          title="Edit Question & Options"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          onClick={() => handleDeleteQuestion(q)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-all"
                          title="Delete Question"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Question Statement */}
                  <div className="space-y-2">
                    <h4 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                      {q.questionText || q.question_text}
                    </h4>

                    {/* Code Snippet (if provided) */}
                    {(q.questionCode || q.question_code) && (
                      <div className="p-3.5 rounded-xl bg-black/80 border border-slate-800/90 font-mono text-xs sm:text-sm text-sky-300 overflow-x-auto">
                        <pre className="whitespace-pre-wrap">{q.questionCode || q.question_code}</pre>
                      </div>
                    )}
                  </div>

                  {/* Options & Answer Key List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {options.map((opt, optIndex) => {
                      const isCorrect = Boolean(opt.isCorrect || opt.is_correct);
                      const optLabel = String.fromCharCode(65 + optIndex); // A, B, C, D...

                      return (
                        <div
                          key={opt.id || optIndex}
                          className={`p-3 rounded-xl border transition-all flex items-start gap-3 ${
                            isCorrect
                              ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-100 shadow-sm shadow-emerald-500/10"
                              : "bg-slate-950/60 border-slate-800/80 text-slate-300"
                          }`}
                        >
                          <div
                            className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                              isCorrect
                                ? "bg-emerald-500 text-slate-950"
                                : "bg-slate-800 text-slate-400"
                            }`}
                          >
                            {optLabel}
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium leading-snug break-words">
                              {opt.optionText || opt.option_text}
                            </p>
                            {(opt.optionCode || opt.option_code) && (
                              <code className="text-xs font-mono text-sky-400 mt-1 block">
                                {opt.optionCode || opt.option_code}
                              </code>
                            )}
                          </div>

                          {isCorrect && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-md shrink-0">
                              <CheckCircle2 size={13} />
                              <span>Correct</span>
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Bottom Metadata & Tags */}
                  {Array.isArray(q.questionTags || q.question_tags) && (q.questionTags || q.question_tags).length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-850">
                      <Tag size={12} className="text-slate-500" />
                      {(q.questionTags || q.question_tags).map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* Question Create & Edit Modal */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {isQuestionModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl relative p-6 space-y-6"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 sticky top-0 bg-slate-900 z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                    <FileQuestion size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      {editingQuestionId ? "Edit Question & Answer Key" : "Create New Question"}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Set curriculum hierarchy, problem statement, options, and designated answer.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsQuestionModalOpen(false)}
                  className="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800/60"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmitQuestion} className="space-y-6">
                {/* 1. Hierarchy Selection */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
                  <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                    <FolderTree size={14} />
                    <span>Curriculum Placement (Subject &rarr; Chapter &rarr; Topic)</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Subject */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-medium text-slate-300">Subject *</label>
                        <button
                          type="button"
                          onClick={() => setIsSubjectModalOpen(true)}
                          className="text-[11px] text-sky-400 hover:underline flex items-center gap-0.5"
                        >
                          <Plus size={10} /> New
                        </button>
                      </div>
                      <select
                        value={formData.subject_id}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            subject_id: e.target.value,
                            chapter_id: "",
                            topic_id: "",
                          }))
                        }
                        required
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-sky-500"
                      >
                        <option value="">-- Select Subject --</option>
                        {subjects.map((s) => (
                          <option key={s.subjectId || s.id} value={s.subjectId || s.id}>
                            {s.subjectName || s.subject_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Chapter */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-medium text-slate-300">Chapter *</label>
                        <button
                          type="button"
                          onClick={() => {
                            setChapterForm((p) => ({ ...p, subject_id: formData.subject_id }));
                            setIsChapterModalOpen(true);
                          }}
                          className="text-[11px] text-purple-400 hover:underline flex items-center gap-0.5"
                        >
                          <Plus size={10} /> New
                        </button>
                      </div>
                      <select
                        value={formData.chapter_id}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            chapter_id: e.target.value,
                            topic_id: "",
                          }))
                        }
                        disabled={!formData.subject_id}
                        required
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-sky-500 disabled:opacity-50"
                      >
                        <option value="">-- Select Chapter --</option>
                        {formChapters.map((c) => (
                          <option key={c.chapterId || c.id} value={c.chapterId || c.id}>
                            {c.chapterName || c.chapter_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Topic */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-medium text-slate-300">Topic *</label>
                        <button
                          type="button"
                          onClick={() => {
                            setTopicForm((p) => ({ ...p, chapter_id: formData.chapter_id }));
                            setIsTopicModalOpen(true);
                          }}
                          className="text-[11px] text-emerald-400 hover:underline flex items-center gap-0.5"
                        >
                          <Plus size={10} /> New
                        </button>
                      </div>
                      <select
                        value={formData.topic_id}
                        onChange={(e) => setFormData((prev) => ({ ...prev, topic_id: e.target.value }))}
                        disabled={!formData.chapter_id}
                        required
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-sky-500 disabled:opacity-50"
                      >
                        <option value="">-- Select Topic --</option>
                        {formTopics.map((t) => (
                          <option key={t.topicId || t.id} value={t.topicId || t.id}>
                            {t.topicName || t.topic_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* 2. Question Details (Type, Level, Statement, Code) */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Question Type */}
                    <div>
                      <label className="text-xs font-medium text-slate-300 mb-1 block">Question Type</label>
                      <select
                        value={formData.question_type_id}
                        onChange={(e) => setFormData((prev) => ({ ...prev, question_type_id: Number(e.target.value) }))}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-sky-500"
                      >
                        {questionTypes.map((t) => (
                          <option key={t.id || t.questionTypeId} value={t.id || t.questionTypeId}>
                            {t.questionTypeName || t.question_type_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Difficulty Level */}
                    <div>
                      <label className="text-xs font-medium text-slate-300 mb-1 block">Difficulty Level</label>
                      <select
                        value={formData.question_level_id}
                        onChange={(e) => setFormData((prev) => ({ ...prev, question_level_id: Number(e.target.value) }))}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-sky-500"
                      >
                        {questionLevels.map((l) => (
                          <option key={l.id || l.questionLevelId} value={l.id || l.questionLevelId}>
                            {l.questionLevelName || l.question_level_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Question Text */}
                  <div>
                    <label className="text-xs font-medium text-slate-300 mb-1 block">Question Statement *</label>
                    <textarea
                      value={formData.question_text}
                      onChange={(e) => setFormData((prev) => ({ ...prev, question_text: e.target.value }))}
                      rows={3}
                      placeholder="Enter the complete question problem statement..."
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500/60"
                    />
                  </div>

                  {/* Question Code (Optional) */}
                  <div>
                    <label className="text-xs font-medium text-slate-300 mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Code2 size={14} className="text-sky-400" />
                        Code Snippet (Optional)
                      </span>
                      <span className="text-[11px] text-slate-500">For programming / syntax questions</span>
                    </label>
                    <textarea
                      value={formData.question_code}
                      onChange={(e) => setFormData((prev) => ({ ...prev, question_code: e.target.value }))}
                      rows={3}
                      placeholder="Paste code snippet here..."
                      className="w-full px-3.5 py-2 rounded-xl bg-black/70 border border-slate-800 text-sky-300 font-mono text-xs placeholder-slate-600 focus:outline-none focus:border-sky-500/60"
                    />
                  </div>
                </div>

                {/* 3. Options & Correct Answer Selector */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 size={14} />
                        <span>Options &amp; Answer Keys</span>
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Select the radio button/checkbox next to an option to mark it as the correct answer.
                      </p>
                    </div>

                    {/* Presets */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleApplyPreset4MCQ}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-[11px] font-medium"
                      >
                        4 Options MCQ
                      </button>
                      <button
                        type="button"
                        onClick={handleApplyPresetTrueFalse}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-[11px] font-medium"
                      >
                        True / False
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {formData.options.map((opt, idx) => {
                      const optLetter = String.fromCharCode(65 + idx);
                      return (
                        <div
                          key={idx}
                          className={`p-3 rounded-xl border transition-all space-y-2 ${
                            opt.is_correct
                              ? "bg-emerald-500/10 border-emerald-500/40"
                              : "bg-slate-900/60 border-slate-800"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {/* Correct Indicator Button */}
                            <button
                              type="button"
                              onClick={() => handleSetCorrectOption(idx)}
                              className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs transition-all ${
                                opt.is_correct
                                  ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                                  : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                              }`}
                              title={opt.is_correct ? "Marked as Correct Answer" : "Click to mark as Correct"}
                            >
                              {opt.is_correct ? <Check size={14} className="stroke-[3]" /> : optLetter}
                            </button>

                            {/* Option Text Input */}
                            <input
                              type="text"
                              value={opt.option_text}
                              onChange={(e) => handleOptionChange(idx, "option_text", e.target.value)}
                              placeholder={`Option ${optLetter} text...`}
                              required
                              className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-750 text-slate-100 text-xs focus:outline-none focus:border-sky-500"
                            />

                            {/* Remove Option Button */}
                            <button
                              type="button"
                              onClick={() => handleRemoveOption(idx)}
                              className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-all"
                              title="Delete this option"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    <button
                      type="button"
                      onClick={handleAddOption}
                      className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-dashed border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Plus size={14} />
                      <span>Add Another Option</span>
                    </button>
                  </div>
                </div>

                {/* 4. Tags & Submission */}
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-slate-300 mb-1 block">Question Tags (comma separated)</label>
                    <div className="flex flex-wrap items-center gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800 min-h-[42px]">
                      {formData.question_tags.map((tag, tIndex) => (
                        <span
                          key={tIndex}
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 text-xs"
                        >
                          #{tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="text-slate-400 hover:text-white ml-0.5"
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                      <input
                        type="text"
                        value={formData.tagInput}
                        onChange={(e) => setFormData((prev) => ({ ...prev, tagInput: e.target.value }))}
                        onKeyDown={handleAddTag}
                        placeholder="Add tag and press Enter..."
                        className="flex-1 bg-transparent border-none text-xs text-slate-200 placeholder-slate-500 focus:outline-none min-w-[120px]"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsQuestionModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-sky-500/20 transition-all disabled:opacity-50"
                  >
                    {submitting ? "Saving..." : editingQuestionId ? "Update Question" : "Save Question"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------- */}
      {/* Quick Add Subject Modal */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {isSubjectModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl"
            >
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <BookOpen className="text-indigo-400" size={18} />
                  Add New Subject
                </h3>
                <button onClick={() => setIsSubjectModalOpen(false)} className="text-slate-400 hover:text-white">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleCreateSubject} className="space-y-3">
                <div>
                  <label className="text-xs text-slate-300 mb-1 block">Subject Code * (e.g. SUB008)</label>
                  <input
                    type="text"
                    value={subjectForm.subject_code}
                    onChange={(e) => setSubjectForm((p) => ({ ...p, subject_code: e.target.value.toUpperCase() }))}
                    placeholder="SUB008"
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 mb-1 block">Subject Name *</label>
                  <input
                    type="text"
                    value={subjectForm.subject_name}
                    onChange={(e) => setSubjectForm((p) => ({ ...p, subject_name: e.target.value }))}
                    placeholder="e.g. Artificial Intelligence & Machine Learning"
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 mb-1 block">Description</label>
                  <textarea
                    value={subjectForm.subject_description}
                    onChange={(e) => setSubjectForm((p) => ({ ...p, subject_description: e.target.value }))}
                    rows={2}
                    placeholder="Brief description of the subject..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:border-sky-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSubjectModalOpen(false)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
                  >
                    {submitting ? "Saving..." : "Create Subject"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------- */}
      {/* Quick Add Chapter Modal */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {isChapterModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl"
            >
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <FolderTree className="text-purple-400" size={18} />
                  Add New Chapter
                </h3>
                <button onClick={() => setIsChapterModalOpen(false)} className="text-slate-400 hover:text-white">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleCreateChapter} className="space-y-3">
                <div>
                  <label className="text-xs text-slate-300 mb-1 block">Subject *</label>
                  <select
                    value={chapterForm.subject_id}
                    onChange={(e) => setChapterForm((p) => ({ ...p, subject_id: e.target.value }))}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:border-purple-500"
                  >
                    <option value="">-- Select Subject --</option>
                    {subjects.map((s) => (
                      <option key={s.subjectId || s.id} value={s.subjectId || s.id}>
                        {s.subjectName || s.subject_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-300 mb-1 block">Chapter Name *</label>
                  <input
                    type="text"
                    value={chapterForm.chapter_name}
                    onChange={(e) => setChapterForm((p) => ({ ...p, chapter_name: e.target.value }))}
                    placeholder="e.g. Object Oriented Programming Concepts"
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:border-purple-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsChapterModalOpen(false)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
                  >
                    {submitting ? "Saving..." : "Create Chapter"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------- */}
      {/* Quick Add Topic Modal */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {isTopicModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl"
            >
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <Layers className="text-emerald-400" size={18} />
                  Add New Topic
                </h3>
                <button onClick={() => setIsTopicModalOpen(false)} className="text-slate-400 hover:text-white">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleCreateTopic} className="space-y-3">
                <div>
                  <label className="text-xs text-slate-300 mb-1 block">Chapter *</label>
                  <select
                    value={topicForm.chapter_id}
                    onChange={(e) => setTopicForm((p) => ({ ...p, chapter_id: e.target.value }))}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:border-emerald-500"
                  >
                    <option value="">-- Select Chapter --</option>
                    {chapters.map((c) => (
                      <option key={c.chapterId || c.id} value={c.chapterId || c.id}>
                        {c.chapterName || c.chapter_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-300 mb-1 block">Topic Name *</label>
                  <input
                    type="text"
                    value={topicForm.topic_name}
                    onChange={(e) => setTopicForm((p) => ({ ...p, topic_name: e.target.value }))}
                    placeholder="e.g. Polymorphism and Dynamic Binding"
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 mb-1 block">Description</label>
                  <textarea
                    value={topicForm.topic_description}
                    onChange={(e) => setTopicForm((p) => ({ ...p, topic_description: e.target.value }))}
                    rows={2}
                    placeholder="Brief description of the topic..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:border-emerald-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsTopicModalOpen(false)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                  >
                    {submitting ? "Saving..." : "Create Topic"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
