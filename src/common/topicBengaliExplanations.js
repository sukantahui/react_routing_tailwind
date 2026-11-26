// src/common/topicBengaliExplanations.js

/**
 * Universal Multi-Segment Bilingual Concept Guide for Machine Learning
 * সমস্ত টেকনিক্যাল টার্ম ইংরেজিতে অক্ষুণ্ণ রেখে প্রফেশনাল একাডেমিক বাংলায় পুঙ্খানুপুঙ্খ ব্যাখ্যা
 */

import { MODULE_001_002_EXPLANATIONS } from "./bengaliExplanations/module_001_002.js";
import { CURATED_MODULE_EXPLANATIONS } from "./bengaliExplanations/curatedKnowledge.js";
import { generateDomainExplanation } from "./bengaliExplanations/domainKnowledgeEngine.js";

// Export legacy dictionary for backwards compatibility
export const TOPIC_BENGALI_EXPLANATIONS = MODULE_001_002_EXPLANATIONS;

/**
 * Main Resolver function to get rich bilingual explanation for any topic in any module
 *
 * @param {number} topicIndex - 0-indexed position of topic
 * @param {string} fallbackTitle - Title of the topic (from roadmap)
 * @param {string} moduleSlug - Slug of the active module
 * @param {string} moduleTitle - Human-readable title of the module
 * @returns {object} Full 4-tab explanation data object
 */
export function getBengaliExplanation(
  topicIndex = 0,
  fallbackTitle = "",
  moduleSlug = "",
  moduleTitle = ""
) {
  const normSlug = (moduleSlug || "").trim().toLowerCase();
  const parsedIndex = parseInt(topicIndex, 10) || 0;

  // 1. MODULE 001_002: Data Types and Preprocessing (Exact 27 topics curated)
  if (
    normSlug === "001_002_data-types-and-preprocessing" ||
    normSlug === "001_002" ||
    (!normSlug && MODULE_001_002_EXPLANATIONS[parsedIndex] && !fallbackTitle)
  ) {
    if (MODULE_001_002_EXPLANATIONS[parsedIndex]) {
      return MODULE_001_002_EXPLANATIONS[parsedIndex];
    }
  }

  // 2. CHECK CURATED KNOWLEDGE BASE FOR THIS MODULE
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

  // 3. CHECK PREFIX MATCHES (e.g., "001_001", "002_001", "003_001", "004_001", "009_001")
  for (const [slugKey, moduleData] of Object.entries(CURATED_MODULE_EXPLANATIONS)) {
    if (normSlug && slugKey.startsWith(normSlug.slice(0, 7))) {
      if (moduleData[parsedIndex]) {
        return moduleData[parsedIndex];
      }
    }
  }

  // 4. INTELLIGENT SEMANTIC DOMAIN ENGINE FALLBACK
  // Generates complete 4-tab academic explanation with standard English terms preserved
  return generateDomainExplanation({
    topicIndex: parsedIndex,
    topicTitle: fallbackTitle || `Topic ${parsedIndex + 1}`,
    moduleSlug: normSlug,
    moduleTitle: moduleTitle
  });
}
