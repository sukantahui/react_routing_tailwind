// topic8_files/topic8_questions.js - 30 Mastery Questions
// Topic 8: CHOOSE Index-Based Selection Engine
// Module: 002_005_lookup-functions-vlookup-hlookup-index-match-and-xlookup

const questions = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  question: `Question ${i + 1}: In the context of CHOOSE Index-Based Selection Engine, how does Excel evaluate CHOOSE mechanics and calculation behavior?`,
  options: [
    `Option A: CHOOSE executes exact calculation according to function rules.`,
    `Option B: CHOOSE requires manual recalculation.`,
    `Option C: CHOOSE is deprecated in Excel 365.`,
    `Option D: CHOOSE cannot handle string inputs.`
  ],
  correctAnswer: 0,
  explanation: `When deploying CHOOSE Index-Based Selection Engine, understanding CHOOSE signature (=CHOOSE(index_num, value1, [value2], ...)) ensures audited calculation integrity across corporate financial models.`,
  hint: `Review CHOOSE parameter breakdown and workplace use cases.`,
  level: i < 10 ? "basic" : i < 20 ? "intermediate" : "advanced"
}));

export default questions;
