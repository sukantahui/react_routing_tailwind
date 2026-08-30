// topic11_files/topic11_questions.js - 30 Mastery Questions
// Topic 11: HYPERLINK Interactive Navigation Engine
// Module: 002_005_lookup-functions-vlookup-hlookup-index-match-and-xlookup

const questions = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  question: `Question ${i + 1}: In the context of HYPERLINK Interactive Navigation Engine, how does Excel evaluate HYPERLINK mechanics and calculation behavior?`,
  options: [
    `Option A: HYPERLINK executes exact calculation according to function rules.`,
    `Option B: HYPERLINK requires manual recalculation.`,
    `Option C: HYPERLINK is deprecated in Excel 365.`,
    `Option D: HYPERLINK cannot handle string inputs.`
  ],
  correctAnswer: 0,
  explanation: `When deploying HYPERLINK Interactive Navigation Engine, understanding HYPERLINK signature (=HYPERLINK(link_location, [friendly_name])) ensures audited calculation integrity across corporate financial models.`,
  hint: `Review HYPERLINK parameter breakdown and workplace use cases.`,
  level: i < 10 ? "basic" : i < 20 ? "intermediate" : "advanced"
}));

export default questions;
