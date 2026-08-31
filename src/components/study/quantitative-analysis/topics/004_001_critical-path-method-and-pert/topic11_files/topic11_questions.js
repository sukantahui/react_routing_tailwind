// topic11_questions.js
// 30 Moderate to Expert Questions on Basic PERT Concept in Operations Research

const questions = [
  {
    question: "What does PERT stand for and what was its historical origin?",
    shortAnswer: "Program Evaluation and Review Technique; developed in 1958 by the US Navy Special Projects Office, Booz Allen Hamilton, and Lockheed for the Polaris Missile Program.",
    explanation: "PERT was created specifically for non-repetitive R&D projects with high uncertainty.",
    hint: "Program Evaluation and Review Technique (US Navy Polaris Missile, 1958).",
    level: "moderate",
    codeExample: "PERT_Origin = { year: 1958, creator: 'US Navy', focus: 'R&D Uncertainty' };"
  },
  {
    question: "What is the core philosophical difference between CPM and PERT?",
    shortAnswer: "CPM is DETERMINISTIC with known, fixed activity durations (used in repetitive construction); PERT is PROBABILISTIC with uncertain, variable activity durations modeled using 3-time estimates (used in R&D).",
    explanation: "CPM focuses on time-cost trade-offs; PERT focuses on probability of meeting target dates.",
    hint: "CPM = Deterministic & Cost-oriented; PERT = Probabilistic & Uncertainty-oriented.",
    level: "moderate",
    codeExample: "CPM_vs_PERT: CPM.isDeterministic === true && PERT.isProbabilistic === true;"
  },
  {
    question: "What are the Three Time Estimates used in PERT?",
    shortAnswer: "1. Optimistic Time (t_o or a): Best-case scenario duration; 2. Most Likely Time (t_m or m): Normal mode duration; 3. Pessimistic Time (t_p or b): Worst-case scenario duration.",
    explanation: "These 3 estimates capture the range and skewness of activity duration uncertainty.",
    hint: "Optimistic (a), Most Likely (m), and Pessimistic (b).",
    level: "moderate",
    codeExample: "ThreeEstimates = { a: 'Optimistic', m: 'Most Likely', b: 'Pessimistic' };"
  },
  {
    question: "What is the formula for Expected Activity Duration (t_e) in PERT?",
    shortAnswer: "t_e = (t_o + 4*t_m + t_p) / 6.",
    explanation: "Weighted average based on the Beta distribution giving 4x weight to the modal value.",
    hint: "(t_o + 4*t_m + t_p) / 6.",
    level: "moderate",
    codeExample: "t_e = (t_o + 4 * t_m + t_p) / 6;"
  },
  {
    question: "What is the formula for Activity Variance (sigma^2) and Standard Deviation (sigma) in PERT?",
    shortAnswer: "Standard Deviation sigma = (t_p - t_o) / 6; Variance sigma^2 = [ (t_p - t_o) / 6 ]^2.",
    explanation: "Assumes the range (t_p - t_o) spans approximately 6 standard deviations (99.7% of the Beta distribution).",
    hint: "sigma = (t_p - t_o) / 6 and variance = sigma^2.",
    level: "moderate",
    codeExample: "sigma = (t_p - t_o) / 6; variance = Math.pow(sigma, 2);"
  },
  {
    question: "Why does the PERT expected duration formula divide by 6 and weight t_m by 4?",
    shortAnswer: "Because it approximates the mean of a Beta distribution, where total weights sum to 1 + 4 + 1 = 6, and the 6-sigma interval spans the full optimistic-to-pessimistic range.",
    explanation: "Derivation from cubic Beta distribution approximation.",
    hint: "Total weights = 1 + 4 + 1 = 6; captures 6-sigma spread of Beta distribution.",
    level: "expert",
    codeExample: "BetaApproximation: Mean = (a + 4m + b) / 6; Span = b - a = 6 * sigma."
  },
  {
    question: "How is the Expected Project Completion Time (mu_project) calculated in PERT?",
    shortAnswer: "mu_project = sum(t_e) for all activities lying STRICTLY on the Critical Path.",
    explanation: "Summing expected durations along the critical path yields project mean duration.",
    hint: "Sum of t_e of critical path activities.",
    level: "moderate",
    codeExample: "ProjectMean = criticalPath.reduce((sum, act) => sum + act.t_e, 0);"
  },
  {
    question: "How is Total Project Variance (sigma^2_project) calculated in PERT?",
    shortAnswer: "sigma^2_project = sum(sigma^2_i) for all activities lying STRICTLY on the Critical Path (variances add, standard deviations do NOT add!).",
    explanation: "By activity independence assumption, path variance is the linear sum of activity variances.",
    hint: "Sum of variances of critical path activities (never sum standard deviations directly!).",
    level: "expert",
    codeExample: "ProjectVariance = criticalPath.reduce((sum, act) => sum + act.variance, 0);"
  },
  {
    question: "What is the formula for the Standard Normal Z-Score in PERT?",
    shortAnswer: "Z = (T_S - mu_project) / sigma_project, where T_S is the Target Scheduled Completion Date and sigma_project = sqrt(sigma^2_project).",
    explanation: "Z measures how many standard deviations the target date is from the expected mean.",
    hint: "Z = (T_S - mu_project) / sigma_project.",
    level: "moderate",
    codeExample: "Z = (TargetDate - ProjectMean) / Math.sqrt(ProjectVariance);"
  },
  {
    question: "What is the probability of completing a project exactly at its expected duration (T_S = mu_project)?",
    shortAnswer: "EXACTLY 50% (P = 0.50), because Z = (mu - mu) / sigma = 0, and Phi(0) = 0.50 under the standard normal distribution.",
    explanation: "The expected duration is the 50th percentile of the project completion distribution.",
    hint: "50% (Z = 0 => P = 0.50).",
    level: "moderate",
    codeExample: "when T_S === mu_project => Z = 0 => Probability = 50%;"
  },
  {
    question: "Suppose for an activity: t_o = 4 days, t_m = 7 days, and t_p = 16 days. What is its expected duration t_e and variance?",
    shortAnswer: "t_e = (4 + 4*7 + 16) / 6 = 48 / 6 = 8 days; sigma = (16 - 4) / 6 = 2 days; Variance = 2^2 = 4 days^2.",
    explanation: "t_e = 8 days, sigma = 2 days, variance = 4.",
    hint: "t_e = 8 days, variance = 4.",
    level: "moderate",
    codeExample: "t_e = (4 + 28 + 16)/6 = 8; var = Math.pow((16-4)/6, 2) = 4;"
  },
  {
    question: "Suppose a project critical path has mu = 30 days and sigma_project = 4 days. What is the probability of finishing within T_S = 34 days?",
    shortAnswer: "Z = (34 - 30) / 4 = +1.00. From normal distribution tables, Phi(+1.00) = 84.13%.",
    explanation: "Z = +1.00 corresponds to approximately 84.13% probability.",
    hint: "84.13% (Z = +1.00).",
    level: "moderate",
    codeExample: "Z = (34 - 30)/4 = 1.0; Probability = 0.8413;"
  },
  {
    question: "Why does the Central Limit Theorem (CLT) allow PERT to model total project duration using a Gaussian Normal distribution?",
    shortAnswer: "Because the total project duration is the sum of many independent random variables (activities); by CLT, the sum of independent random variables approaches a Normal distribution regardless of their individual Beta distributions.",
    explanation: "CLT provides the mathematical foundation for using Z-tables in PERT.",
    hint: "Sum of multiple independent random variables approaches a normal distribution by CLT.",
    level: "expert",
    codeExample: "CLT: Sum(Beta_i) → Normal(mu_sum, sigma_sum^2) as n increases."
  },
  {
    question: "What currency symbol must ALWAYS be used when stating project contingency reserves and R&D budgets in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'PERT Risk Contingency Reserve = ₹6,50,000'"
  },
  {
    question: "What is the ultimate golden rule of the Basic PERT Concept?",
    shortAnswer: "'Estimate 3 times (t_o, t_m, t_p); compute t_e = (t_o + 4t_m + t_p)/6 and variance = ((t_p - t_o)/6)^2; sum means and variances along the Critical Path; evaluate deliverability probability via Z = (T_S - mu)/sigma in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all core PERT calculation mechanics.",
    hint: "3 estimates → t_e & variance → sum on CP → Z = (T_S - mu)/sigma → Normal probability.",
    level: "moderate",
    codeExample: "GoldenRule: ThreeEstimates() → ComputeTeVar() → SumOnCriticalPath() → ZScoreDeliverability(₹)."
  }
];

export default questions;
