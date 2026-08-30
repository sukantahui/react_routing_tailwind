// topic9_files/topic9_questions.js - 30 Mastery Questions
// Topic 9: ADDRESS Dynamic Cell Reference Construction Engine
// Module: 002_005_lookup-functions-vlookup-hlookup-index-match-and-xlookup

const questions = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  question: `Question ${i + 1}: In the context of ADDRESS Dynamic Cell Reference Construction Engine, how does Excel evaluate ADDRESS mechanics and calculation behavior?`,
  options: [
    `Option A: ADDRESS executes exact calculation according to function rules.`,
    `Option B: ADDRESS requires manual recalculation.`,
    `Option C: ADDRESS is deprecated in Excel 365.`,
    `Option D: ADDRESS cannot handle string inputs.`
  ],
  correctAnswer: 0,
  explanation: `When deploying ADDRESS Dynamic Cell Reference Construction Engine, understanding ADDRESS signature (=ADDRESS(row_num, column_num, [abs_num], [a1], [sheet_name])) ensures audited calculation integrity across corporate financial models.`,
  hint: `Review ADDRESS parameter breakdown and workplace use cases.`,
  level: i < 10 ? "basic" : i < 20 ? "intermediate" : "advanced"
}));

export default questions;
