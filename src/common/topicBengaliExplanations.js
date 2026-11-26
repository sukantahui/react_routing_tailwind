// src/common/topicBengaliExplanations.js

/**
 * Universal Multi-Course Bilingual Concept Guide
 * সমস্ত টেকনিক্যাল টার্ম ইংরেজিতে অক্ষুণ্ণ রেখে প্রফেশনাল অ্যাকাডেমিক বাংলায় পুঙ্খানুপুঙ্খ ব্যাখ্যা
 * Supports: Machine Learning, Cyber Security & Networking
 */

import { MODULE_001_002_EXPLANATIONS } from "./bengaliExplanations/module_001_002.js";
import { CURATED_MODULE_EXPLANATIONS } from "./bengaliExplanations/curatedKnowledge.js";
import { generateDomainExplanation } from "./bengaliExplanations/domainKnowledgeEngine.js";
import { generateCyberSecurityExplanation } from "./bengaliExplanations/cyberSecurityKnowledge.js";

// Export legacy dictionary for backwards compatibility
export const TOPIC_BENGALI_EXPLANATIONS = MODULE_001_002_EXPLANATIONS;

/**
 * Check if the target is part of Cyber Security
 */
function isCyberSecurityContext(subjectKey = "", moduleSlug = "", moduleTitle = "", fallbackTitle = "") {
  const combined = `${subjectKey} ${moduleSlug} ${moduleTitle} ${fallbackTitle}`.toLowerCase();
  const cyberKeywords = [
    "cyber", "security", "network", "cia", "hacking", "ethical", "crypto",
    "rsa", "ism", "isms", "malware", "virus", "worm", "trojan", "ransomware",
    "phishing", "dos", "ddos", "sql-injection", "firewall", "ids", "ips",
    "honeypot", "vpn", "ssl", "tls", "ipsec", "auth", "mfa", "zero-trust"
  ];
  return cyberKeywords.some((kw) => combined.includes(kw));
}

/**
 * Main Resolver function to get rich bilingual explanation for any topic in any module
 *
 * @param {number} topicIndex - 0-indexed position of topic
 * @param {string} fallbackTitle - Title of the topic (from roadmap)
 * @param {string} moduleSlug - Slug of the active module
 * @param {string} moduleTitle - Human-readable title of the module
 * @param {string} subjectKey - Key/Folder of subject (e.g. 'cyber-security', 'machine-learning')
 * @returns {object} Full 4-tab explanation data object
 */
export function getBengaliExplanation(
  topicIndex = 0,
  fallbackTitle = "",
  moduleSlug = "",
  moduleTitle = "",
  subjectKey = ""
) {
  const normSlug = (moduleSlug || "").trim().toLowerCase();
  const parsedIndex = parseInt(topicIndex, 10) || 0;

  // 1. CYBER SECURITY RESOLUTION
  if (isCyberSecurityContext(subjectKey, normSlug, moduleTitle, fallbackTitle)) {
    return generateCyberSecurityExplanation({
      topicIndex: parsedIndex,
      topicTitle: fallbackTitle || `Topic ${parsedIndex + 1}`,
      moduleSlug: normSlug,
      moduleTitle: moduleTitle
    });
  }

  // 2. MACHINE LEARNING MODULE 001_002: Data Types and Preprocessing (Exact 27 topics curated)
  if (
    normSlug === "001_002_data-types-and-preprocessing" ||
    normSlug === "001_002" ||
    (!normSlug && MODULE_001_002_EXPLANATIONS[parsedIndex] && !fallbackTitle)
  ) {
    if (MODULE_001_002_EXPLANATIONS[parsedIndex]) {
      return MODULE_001_002_EXPLANATIONS[parsedIndex];
    }
  }

  // 3. CHECK CURATED KNOWLEDGE BASE FOR THIS MODULE
  if (normSlug && CURATED_MODULE_EXPLANATIONS[normSlug]) {
    const moduleCurated = CURATED_MODULE_EXPLANATIONS[normSlug];
    if (moduleCurated[parsedIndex]) {
      return moduleCurated[parsedIndex];
    }

    // Try finding by title match within module curated
    if (fallbackTitle) {
      const lowerTarget = fallbackTitle.trim().toLowerCase();
      for (const key of Object.keys(moduleCurated)) {
        const item = moduleCurated[key];
        if (item.titleEn && item.titleEn.toLowerCase().includes(lowerTarget)) {
          return item;
        }
      }
    }
  }

  // 4. CHECK PREFIX MATCHES FOR MACHINE LEARNING
  for (const [slugKey, moduleData] of Object.entries(CURATED_MODULE_EXPLANATIONS)) {
    if (normSlug && slugKey.startsWith(normSlug.slice(0, 7))) {
      if (moduleData[parsedIndex]) {
        return moduleData[parsedIndex];
      }
    }
  }

  // 5. INTELLIGENT SEMANTIC DOMAIN ENGINE FALLBACK (ML)
  return generateDomainExplanation({
    topicIndex: parsedIndex,
    topicTitle: fallbackTitle || `Topic ${parsedIndex + 1}`,
    moduleSlug: normSlug,
    moduleTitle: moduleTitle
  });
}
