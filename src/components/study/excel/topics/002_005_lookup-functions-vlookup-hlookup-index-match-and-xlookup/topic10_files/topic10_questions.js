// topic10_files/topic10_questions.js - 30 Mastery Questions
// Topic 10: AREAS Non-Contiguous Selection Count Engine
// Module: 002_005_lookup-functions-vlookup-hlookup-index-match-and-xlookup

const questions = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  question: `Question ${i + 1}: In the context of AREAS Non-Contiguous Selection Count Engine, how does Excel evaluate AREAS mechanics and calculation behavior?`,
  options: [
    `Option A: AREAS executes exact calculation according to function rules.`,
    `Option B: AREAS requires manual recalculation.`,
    `Option C: AREAS is deprecated in Excel 365.`,
    `Option D: AREAS cannot handle string inputs.`
  ],
  correctAnswer: 0,
  explanation: `When deploying AREAS Non-Contiguous Selection Count Engine, understanding AREAS signature (=AREAS(reference)) ensures audited calculation integrity across corporate financial models.`,
  hint: `Review AREAS parameter breakdown and workplace use cases.`,
  level: i < 10 ? "basic" : i < 20 ? "intermediate" : "advanced"
}));

export default questions;
