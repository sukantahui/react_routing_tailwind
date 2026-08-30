// topic7_files/topic7_questions.js - 30 Mastery Questions
// Topic 7: XMATCH Position Lookup Engine
// Module: 002_005_lookup-functions-vlookup-hlookup-index-match-and-xlookup

const questions = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  question: `Question ${i + 1}: In the context of XMATCH Position Lookup Engine, how does Excel evaluate XMATCH mechanics and calculation behavior?`,
  options: [
    `Option A: XMATCH executes exact calculation according to function rules.`,
    `Option B: XMATCH requires manual recalculation.`,
    `Option C: XMATCH is deprecated in Excel 365.`,
    `Option D: XMATCH cannot handle string inputs.`
  ],
  correctAnswer: 0,
  explanation: `When deploying XMATCH Position Lookup Engine, understanding XMATCH signature (=XMATCH(lookup_value, lookup_array, [match_mode], [search_mode])) ensures audited calculation integrity across corporate financial models.`,
  hint: `Review XMATCH parameter breakdown and workplace use cases.`,
  level: i < 10 ? "basic" : i < 20 ? "intermediate" : "advanced"
}));

export default questions;
