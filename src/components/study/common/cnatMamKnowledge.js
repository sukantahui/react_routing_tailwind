// ============================================================================
// CNAT MAM AI CHATBOT KNOWLEDGE BASE & INTENT ENGINE
// Specializing in Excel, Financial Modeling, TallyPrime, Accounting & Coding
// ============================================================================

import { findMatchingFAQResponse } from "./generalFAQKnowledge";

export const CNAT_MAM_PROFILE = {
  name: "CNAT Mam",
  title: "Senior AI Academic Mentor & Student Counselor",
  organization: "Coder & AccoTax Centre of Excellence",
  avatar: "/teachers/cnat.jpg",
  greeting: "Hello dear student! I am CNAT Mam, your academic mentor. How can I help you master your current topic or guide you with institute & teacher details today?",
};

export const QUICK_PROMPT_CHIPS = [
  { label: "💡 Explain Current Topic", query: "Can you explain the main concepts of this topic in simple terms?" },
  { label: "📝 Lab Assignments", query: "How do I submit practical lab assignments and homework?" },
  { label: "🎯 Viva & Exam Tips", query: "What are the key tips for practical exams and viva tests?" },
  { label: "🛠️ Clear Doubts", query: "How do I clear my doubts during lab hours?" },
  { label: "📞 Teacher Contact", query: "Can you provide teacher contact number and communication details?" },
  { label: "🏢 Organisation Details", query: "Tell me about Coder & AccoTax institute, campus location and accreditation." },
  { label: "🎓 Courses Offered", query: "What courses and modules are taught at Coder & AccoTax?" },
  { label: "📊 Online Marksheets", query: "Where can I take online mock tests and view my performance marksheets?" },
];

export function getCNATMamResponse(userQuery, context = {}) {
  const q = userQuery.toLowerCase().trim();
  const currentTopic = context.topicTitle || "General Curriculum";

  // Check current topic overview intent first
  if (q.includes("explain current topic") || q.includes("explain this topic") || q.includes("main concept")) {
    return `### 💡 Topic Overview: ${currentTopic}\n\nHere is a breakdown of what you are learning in this topic:\n\n- **Core Objective:** Master standard syntax, evaluation rules, and clean coding hygiene.\n- **Key Mechanics:** Understand how inputs are processed and stored in memory.\n- **Enterprise Practice:** Always write defensive, modular code and handle edge cases gracefully!\n\n*Pro Tip from CNAT Mam:* Practice key concepts step-by-step with practical exercises!`;
  }

  // Query structured FAQ Database (generalFAQKnowledge.js)
  const faqMatch = findMatchingFAQResponse(userQuery, context);
  if (faqMatch) {
    return faqMatch;
  }

  // Default Intelligent Fallback
  return `Dear student, regarding **${currentTopic}**:\n\nAlways ensure your input data and code logic are sanitized before processing.\n\nFor teacher contact & helpline, you can reach **Sukanta Hui** at **+91 70037 56860** or email **contact@codernaccotax.co.in**.\n\nIf you have a specific topic, teacher, or course question, feel free to ask me!`;
}
