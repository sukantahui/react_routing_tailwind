// topic8_questions.js
// 30 Moderate to Expert Questions on Critical Activities in CPM & PERT

const questions = [
  {
    question: "What is the formal definition of a 'Critical Activity' in Operations Research?",
    shortAnswer: "An activity that has ZERO TOTAL FLOAT (TF = 0); any delay in starting or executing a critical activity delays the overall project completion date by the exact same amount.",
    explanation: "Critical activities form the bottleneck backbone of the project schedule.",
    hint: "An activity with zero total float (TF = 0).",
    level: "moderate",
    codeExample: "isCritical = (activity.totalFloat === 0);"
  },
  {
    question: "What are the 3 MANDATORY mathematical conditions that MUST hold for an activity (i, j) to be critical?",
    shortAnswer: "1. E_i = L_i (Tail event is critical); 2. E_j = L_j (Head event is critical); 3. E_j - E_i = L_j - L_i = d_ij (Total Float TF = 0).",
    explanation: "All three conditions must be satisfied simultaneously.",
    hint: "Tail slack=0, head slack=0, and E_j - E_i = d_ij.",
    level: "expert",
    codeExample: "isCritical = (E[i] === L[i]) && (E[j] === L[j]) && (E[j] - E[i] === d_ij);"
  },
  {
    question: "Why is an activity between two critical events (E_i = L_i and E_j = L_j) NOT guaranteed to be a critical activity?",
    shortAnswer: "Because its duration d_ij may be strictly shorter than the time window between the events (d_ij < E_j - E_i), resulting in positive Total Float (TF = E_j - E_i - d_ij > 0).",
    explanation: "This is known as the 'False-Criticality Trap'.",
    hint: "Duration might be shorter than the event time difference, giving positive float.",
    level: "expert",
    codeExample: "Trap: E_1=0, L_1=0, E_4=12, L_4=12, but Activity(1,4) has d=8 => TF = 12 - 0 - 8 = 4 > 0 (Non-Critical!)."
  },
  {
    question: "What is the Total Float (TF) of any critical activity?",
    shortAnswer: "EXACTLY ZERO (TF = 0).",
    explanation: "Zero total float is the defining property of criticality.",
    hint: "TF = 0.",
    level: "moderate",
    codeExample: "criticalActivity.TF === 0;"
  },
  {
    question: "What is the Free Float (FF) and Independent Float (IF) of a critical activity?",
    shortAnswer: "Because TF >= FF >= IF >= 0, when TF = 0, both Free Float and Independent Float MUST ALSO EQUAL ZERO (FF = 0 and IF = 0).",
    explanation: "A critical activity has zero buffer across all three float measures.",
    hint: "Both FF = 0 and IF = 0.",
    level: "expert",
    codeExample: "if (TF === 0) { FF = 0; IF = 0; }"
  },
  {
    question: "If a non-critical activity with Total Float TF = 5 days is delayed by 3 days, what happens to the overall project duration?",
    shortAnswer: "Nothing! The project duration remains completely unchanged because the 3-day delay is fully absorbed by the 5-day float buffer.",
    explanation: "Non-critical activities can absorb delays up to their total float.",
    hint: "No project delay occurs; 3 days is absorbed by the 5-day float.",
    level: "moderate",
    codeExample: "ProjectDelay = Math.max(0, actualDelay - totalFloat) = Math.max(0, 3 - 5) = 0;"
  },
  {
    question: "If a critical activity with duration 8 days takes 11 days (3 days delay), what happens to the project duration?",
    shortAnswer: "The overall project completion date is postponed by EXACTLY 3 DAYS.",
    explanation: "Critical activities have zero buffer (1-to-1 project delay).",
    hint: "Project completion is delayed by exactly 3 days.",
    level: "moderate",
    codeExample: "ProjectExtension = criticalDelay = 3 days."
  },
  {
    question: "Can a project have multiple critical activities occurring simultaneously in parallel?",
    shortAnswer: "Yes! When two or more parallel paths have identical longest durations, the project has MULTIPLE critical paths and multiple parallel critical activities.",
    explanation: "Multiple parallel critical paths are common in balanced project networks.",
    hint: "Yes, when parallel paths share the identical longest duration.",
    level: "intermediate",
    codeExample: "hasMultipleCriticalPaths = criticalPaths.length > 1;"
  },
  {
    question: "Why do project managers assign their top engineers and daily monitoring to critical activities?",
    shortAnswer: "Because critical activities possess zero schedule variance buffer; any delay immediately breaches the client delivery deadline and triggers liquidated damage penalties.",
    explanation: "Focuses managerial oversight where risks are highest.",
    hint: "Zero buffer means any delay directly triggers project delay and penalties.",
    level: "moderate",
    codeExample: "ManagerialRule: Allocate best resources and daily tracking to TF = 0 activities."
  },
  {
    question: "In project crashing, which activities are eligible to be shortened?",
    shortAnswer: "ONLY CRITICAL ACTIVITIES. Shortening non-critical activities reduces zero days from the project timeline while wasting financial capital.",
    explanation: "Crashing non-critical activities only inflates their float.",
    hint: "Only critical activities can be crashed to shorten project duration.",
    level: "moderate",
    codeExample: "CrashCandidates = activities.filter(act => act.isCritical);"
  },
  {
    question: "Suppose Debangshu in Barrackpore is tracking Activity (2, 4) with E_2 = 5, L_2 = 5, E_4 = 11, L_4 = 11, and d = 6 days. Is Activity (2, 4) critical?",
    shortAnswer: "Yes! 1. E_2 = L_2 = 5; 2. E_4 = L_4 = 11; 3. E_4 - E_2 = 11 - 5 = 6 = d_24 (TF = 0). All 3 conditions are satisfied!",
    explanation: "Satisfies all 3 criticality conditions.",
    hint: "Yes, all 3 conditions hold and TF = 0.",
    level: "moderate",
    codeExample: "ConditionCheck: 5===5 && 11===11 && 11-5===6 => Critical!"
  },
  {
    question: "Suppose Susmita in Ichapur evaluates Activity (2, 5) with E_2 = 5, L_2 = 5, E_5 = 15, L_5 = 15, and d = 3 days. Is Activity (2, 5) critical?",
    shortAnswer: "NO! Although E_2 = L_2 and E_5 = L_5, the duration d = 3 < 15 - 5 = 10, giving Total Float TF = 10 - 3 = 7 days > 0.",
    explanation: "Fails Condition 3 (Duration Condition); it is a non-critical activity.",
    hint: "No, TF = 7 days > 0 (False-Criticality Trap).",
    level: "expert",
    codeExample: "ConditionCheck: E_5 - E_2 = 10 != 3 => Non-Critical (TF = 7)!"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating critical activity budgets and expediting costs in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Critical Activity Refractory Lining Budget = ₹1,80,000'"
  },
  {
    question: "What is the ultimate golden rule of Critical Activities in CPM?",
    shortAnswer: "'An activity is critical if and only if TF = 0 (satisfying E_i = L_i, E_j = L_j, and E_j - E_i = d_ij); zero buffer means zero tolerance for delay; prioritize oversight and crash only critical tasks in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all critical activity principles.",
    hint: "TF = 0 → All 3 conditions hold → Zero buffer → Crash only critical tasks in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: (TF === 0 && E_i===L_i && E_j===L_j && E_j-E_i===d) => CriticalActivity."
  }
];

export default questions;
