// topic10_questions.js
// 30 Moderate to Expert Questions on Project Duration & Time-Cost Optimization in CPM/PERT

const questions = [
  {
    question: "What is the formal definition of 'Project Duration' in Network Analysis?",
    shortAnswer: "The total calendar time required to execute and complete all project activities from the initial start event to the final terminal sink event, determined by the longest sequence of dependent activities (Critical Path).",
    explanation: "Project duration equals the earliest time of the final terminal node E_n.",
    hint: "Total time to complete all project activities from start to sink.",
    level: "moderate",
    codeExample: "ProjectDuration = E[terminalNode];"
  },
  {
    question: "What is the difference between 'Normal Project Duration' and 'Crash Project Duration'?",
    shortAnswer: "Normal Duration is the project timeline under standard operating conditions and normal budgets; Crash Duration is the absolute minimum possible timeline achievable by allocating maximum overtime and expedited resources regardless of direct cost.",
    explanation: "Normal is cost-efficient; Crash is time-minimal.",
    hint: "Normal = standard timeline; Crash = absolute minimum timeline using maximum resources.",
    level: "moderate",
    codeExample: "DurationBounds: T_crash <= T_optimal <= T_normal;"
  },
  {
    question: "What comprises 'Total Project Cost' in project scheduling?",
    shortAnswer: "Total Cost = Total Direct Costs (labor, machinery, materials) + Total Indirect Costs (site overhead, supervision, rentals, utilities) - Early Bonuses + Late Penalties.",
    explanation: "Both direct and indirect costs vary with duration in opposite directions.",
    hint: "Direct Costs + Indirect Costs - Bonuses + Penalties in Indian Rupees (₹).",
    level: "moderate",
    codeExample: "TotalCost = DirectCost + IndirectCost - Bonuses + Penalties;"
  },
  {
    question: "Why do Direct Costs INCREASE as project duration is compressed?",
    shortAnswer: "Because shortening activities requires hiring extra shifts, paying overtime wages, expediting material freight, and deploying higher-capacity machinery.",
    explanation: "Direct acceleration costs more resources per unit time.",
    hint: "Overtime wages, extra labor shifts, expedited freight, and premium equipment.",
    level: "moderate",
    codeExample: "DirectCostIncrease = sum(crashedDays * costSlope);"
  },
  {
    question: "Why do Indirect Costs DECREASE as project duration is compressed?",
    shortAnswer: "Because indirect costs are incurred on a per-day basis (site security, scaffolding rental, office administrative overhead, supervisor salaries); fewer days means fewer daily overhead charges.",
    explanation: "Indirect costs are directly proportional to duration.",
    hint: "Fewer project days reduce daily site overhead, equipment rentals, and supervisor fees.",
    level: "moderate",
    codeExample: "IndirectCost = ProjectDuration * DailyOverheadRate;"
  },
  {
    question: "What is the 'Optimal Project Duration' (T*)?",
    shortAnswer: "The specific project duration that MINIMIZES the Total Project Cost (the lowest point on the U-shaped Total Cost curve).",
    explanation: "T* balances marginal direct crashing expense against daily indirect overhead savings.",
    hint: "Duration that minimizes Total Cost (Direct + Indirect).",
    level: "expert",
    codeExample: "OptimalDuration = durations.reduce((min, d) => totalCost(d) < totalCost(min) ? d : min);"
  },
  {
    question: "What is the 'Cost Slope' formula in CPM project crashing?",
    shortAnswer: "Cost Slope = (Crash Cost - Normal Cost) / (Normal Time - Crash Time) = Delta C / Delta T in ₹ / Day.",
    explanation: "Measures the rate of direct cost increase per day compressed.",
    hint: "(Crash Cost - Normal Cost) / (Normal Time - Crash Time) in ₹/day.",
    level: "moderate",
    codeExample: "CostSlope = (C_crash - C_normal) / (T_normal - T_crash);"
  },
  {
    question: "When should project management STOP crashing a project from an economic standpoint?",
    shortAnswer: "When the marginal Cost Slope of crashing the next critical day exceeds the daily Indirect Overhead savings (Delta C / Delta T > Daily Overhead Rate).",
    explanation: "Crashing beyond this point increases total project cost.",
    hint: "When marginal crash cost slope exceeds daily indirect overhead rate.",
    level: "expert",
    codeExample: "StopCrashingRule: if (minCostSlope > dailyOverheadRate) break;"
  },
  {
    question: "Suppose normal duration is 24 days with normal direct cost ₹1,50,000, and daily overhead is ₹6,000/day. Activity A on the critical path has Cost Slope = ₹4,000/day and can be crashed by 2 days. What is the net financial savings?",
    shortAnswer: "Net Savings = (2 days * ₹6,000 overhead saved) - (2 days * ₹4,000 crash cost) = ₹12,000 - ₹8,000 = ₹4,000 net savings!",
    explanation: "Overhead savings exceed direct crash cost.",
    hint: "₹4,000 net savings.",
    level: "moderate",
    codeExample: "NetSavings = 2 * (6000 - 4000) = 4000;"
  },
  {
    question: "What happens if you crash an activity that is NOT on the critical path?",
    shortAnswer: "You spend extra direct money without reducing the project duration by even a single day, increasing total project cost unnecessarily.",
    explanation: "Only shortening critical paths compresses overall project duration.",
    hint: "Wastes direct money with zero reduction in project duration.",
    level: "intermediate",
    codeExample: "NonCriticalCrash = { durationSaved: 0, costWasted: true };"
  },
  {
    question: "What must be done during crashing if two parallel critical paths exist?",
    shortAnswer: "You must crash an activity on EACH critical path simultaneously (or crash a common shared critical activity) to achieve a 1-day reduction in total project duration.",
    explanation: "Shortening only one path leaves the other path as the bottleneck.",
    hint: "Crash a task on both paths or crash a shared critical task.",
    level: "expert",
    codeExample: "MultiPathCrashing: crash(Path1) && crash(Path2) || crash(SharedActivity);"
  },
  {
    question: "Suppose Debangshu in Barrackpore is offered an early completion bonus of ₹10,000/day for finishing a furnace rebuild early. How does this affect the optimal project duration?",
    shortAnswer: "It shifts the optimal duration further to the left (shorter duration) because each day compressed now saves daily overhead PLUS earns ₹10,000/day in bonus revenue.",
    explanation: "Bonuses raise effective daily savings, justifying higher cost-slope crashing.",
    hint: "Shifts optimal duration to a shorter timeline by increasing daily savings.",
    level: "moderate",
    codeExample: "EffectiveDailySaving = DailyOverhead + EarlyBonus;"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating project duration costs, overhead rates, and crashing budgets in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Optimal Total Cost = ₹1,84,000 at T* = 21 Days'"
  },
  {
    question: "What is the ultimate golden rule of Project Duration and Time-Cost Optimization?",
    shortAnswer: "'Project Duration equals the Critical Path length; optimize duration at T* where Direct + Indirect costs are minimized; crash only critical activities with the lowest Cost Slope in Indian Rupees (₹) as long as Cost Slope < Daily Overhead!'",
    explanation: "This complete rule captures all project duration and crashing optimization principles.",
    hint: "Duration = Critical Path -> Minimize Total Cost at T* -> Crash lowest slope critical tasks while Slope < Overhead.",
    level: "moderate",
    codeExample: "GoldenRule: ProjectDuration = E_n -> FindOptimalT(DirectCost + IndirectCost) -> CrashLowestSlope(₹)."
  }
];

export default questions;
