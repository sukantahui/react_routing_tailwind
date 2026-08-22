// topic1_questions.js
// 30 Moderate to Expert Questions on Assumptions of CPM/PERT

const questions = [
  {
    question: "What is the primary structural assumption regarding project activities in CPM/PERT?",
    shortAnswer: "A project consists of clearly defined, discrete, non-overlapping activities whose predecessor-successor relationships form a Directed Acyclic Graph (DAG) with ZERO loops or cycles.",
    explanation: "No activity can be repeated in a loop and the network must have a single starting and terminal event.",
    hint: "Discrete activities forming a Directed Acyclic Graph (DAG) with no loops.",
    level: "moderate",
    codeExample: "NetworkTopology: { isDAG: true, hasCycles: false, discreteTasks: true };"
  },
  {
    question: "What is the Activity Independence Assumption in PERT and CPM?",
    shortAnswer: "The duration and performance of any individual activity is statistically independent of all other activities in the network (Cov(T_i, T_j) = 0).",
    explanation: "Allows adding variances along the critical path without covariance terms.",
    hint: "Task durations are statistically independent (Covariance = 0).",
    level: "moderate",
    codeExample: "Covariance(Activity_i, Activity_j) === 0 for all i !== j."
  },
  {
    question: "What probability distribution is assumed for activity durations in PERT?",
    shortAnswer: "The continuous unimodal Beta Distribution, parameterized by Optimistic (a), Most Likely (m), and Pessimistic (b) time estimates.",
    explanation: "Beta distribution is bounded, non-negative, and accommodates skewness.",
    hint: "Beta distribution parameterized by a, m, and b.",
    level: "moderate",
    codeExample: "DurationDistribution = Beta(a, m, b); t_e = (a + 4m + b) / 6;"
  },
  {
    question: "Why was the Beta distribution selected over the Normal distribution for individual PERT activities?",
    shortAnswer: "Because activity durations are inherently bounded between a minimum (a > 0) and maximum (b < Infinity) and are often positively skewed (rare massive delays), whereas the Normal distribution has infinite tails and perfect symmetry.",
    explanation: "Real projects have finite bounds and positive delay skewness.",
    hint: "Bounded between finite endpoints and allows asymmetric skewness.",
    level: "expert",
    codeExample: "BetaProperties: { lowerBound: a, upperBound: b, isSkewed: true };"
  },
  {
    question: "How does the Central Limit Theorem (CLT) apply to the total project duration in PERT?",
    shortAnswer: "Even though individual activities follow Beta distributions, the SUM of independent activity durations along the critical path converges to a Normal Distribution N(mu_cp, sigma_cp^2).",
    explanation: "Sum of independent random variables approaches normality as path length increases.",
    hint: "Sum of independent task durations along the critical path follows a Normal Distribution.",
    level: "expert",
    codeExample: "ProjectDistribution = Normal(mu = Sum(t_e), sigma^2 = Sum(sigma_i^2));"
  },
  {
    question: "What is the Z-score formula used in PERT to determine the probability of completing a project by a scheduled target date T_s?",
    shortAnswer: "Z = (T_s - mu_cp) / sigma_cp, where mu_cp is the expected critical path duration and sigma_cp is the square root of the sum of critical path variances.",
    explanation: "Z measures the standard deviations between target date and expected date.",
    hint: "Z = (T_s - mu_cp) / sqrt(Sum(sigma_i^2)).",
    level: "moderate",
    codeExample: "Z = (T_s - mu_cp) / Math.sqrt(sum_critical_variances);"
  },
  {
    question: "What is the linear time-cost trade-off assumption in CPM crashing?",
    shortAnswer: "Direct costs increase linearly at a constant marginal cost slope as activity duration is shortened from Normal Time (T_n) to Crash Time (T_c).",
    explanation: "Cost Slope = (Crash Cost - Normal Cost) / (Normal Time - Crash Time) = constant.",
    hint: "Direct cost increases linearly as duration decreases.",
    level: "moderate",
    codeExample: "CostSlope = (C_c - C_n) / (T_n - T_c) === Constant."
  },
  {
    question: "What is the 'Unlimited Resource Availability' assumption in baseline CPM/PERT?",
    shortAnswer: "It assumes that all necessary labor, equipment, and materials are readily available whenever an activity is scheduled to start; resource constraints are handled downstream via resource leveling.",
    explanation: "Classical network passes compute theoretical time boundaries without labor caps.",
    hint: "Assumes resources are available as needed without initial caps.",
    level: "intermediate",
    codeExample: "BaselineAssumption: ResourceCapacity = Infinity (Unconstrained Initially)."
  },
  {
    question: "What is 'Merge Bias' (or Path Crossover Risk) in PERT?",
    shortAnswer: "A limitation where multiple parallel near-critical paths merge into an event, causing the actual project completion time to be longer than the single critical path calculated by PERT.",
    explanation: "Because an event cannot occur until ALL merging paths finish, max(Path1, Path2) has a higher expected value.",
    hint: "When parallel paths merge, the longest path expectation is underestimated.",
    level: "expert",
    codeExample: "E[max(X, Y)] >= max(E[X], E[Y]); Merge event delay exceeds single critical path."
  },
  {
    question: "Suppose Debangshu in Barrackpore finds the expected critical path duration is 28 days with a standard deviation of 2 days. What is the probability that the blast furnace overhaul finishes within 28 days?",
    shortAnswer: "Exactly 50% (Z = (28 - 28) / 2 = 0; P(Z <= 0) = 0.50).",
    explanation: "A symmetric normal distribution has a 50% probability of completing at the mean.",
    hint: "50% (Z = 0).",
    level: "moderate",
    codeExample: "Z = (28 - 28) / 2 = 0 => P = 0.50 (50%)."
  },
  {
    question: "If Debangshu's client in Barrackpore demands completion within 32 days, what is the Z-score and approximate probability?",
    shortAnswer: "Z = (32 - 28) / 2 = +2.00, which corresponds to approximately 97.72% probability of on-time delivery.",
    explanation: "Z = 2.00 in standard normal table gives 0.9772.",
    hint: "Z = +2.00; ~97.7% probability.",
    level: "moderate",
    codeExample: "Z = (32 - 28) / 2 = 2.0 => P(Z <= 2.0) = 0.9772 (97.72%)."
  },
  {
    question: "Suppose Susmita in Ichapur has an activity with a = 6 days, m = 9 days, and b = 18 days. What is its expected duration and variance?",
    shortAnswer: "t_e = (6 + 4(9) + 18) / 6 = 60 / 6 = 10 days; Variance sigma^2 = ((18 - 6) / 6)^2 = (12 / 6)^2 = 2^2 = 4 days^2.",
    explanation: "t_e = 10 days; variance = 4.",
    hint: "t_e = 10 days, sigma^2 = 4 days^2.",
    level: "moderate",
    codeExample: "t_e = (6 + 36 + 18) / 6 = 10; var = ((18 - 6)/6)^2 = 4."
  },
  {
    question: "Can activities on non-critical paths contribute to project variance in standard PERT?",
    shortAnswer: "No; standard PERT sums variances STRICTLY ALONG THE CRITICAL PATH, assuming non-critical paths have sufficient slack that their variance will not breach the schedule.",
    explanation: "Only critical path task variances are included in the project variance calculation.",
    hint: "No, only critical path activities contribute to project variance.",
    level: "intermediate",
    codeExample: "sigma_project^2 = Sum_{i in CriticalPath} sigma_i^2."
  },
  {
    question: "What happens if two non-critical paths in Mamata's Kolkata project have near-zero float and high variance?",
    shortAnswer: "They can become critical during execution (critical path shifting), illustrating the importance of monitoring Near-Critical Paths.",
    explanation: "High variance can push a near-critical task into becoming the true bottleneck.",
    hint: "They can surpass the original critical path and become the new bottleneck.",
    level: "expert",
    codeExample: "Risk: NearCriticalPath with high variance can become critical."
  },
  {
    question: "What currency symbol must ALWAYS be used when stating crashing costs in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Crash Cost Slope = ₹5,000 / day'"
  },
  {
    question: "What is the ultimate golden rule of CPM/PERT Assumptions?",
    shortAnswer: "'Verify DAG topology (no cycles); enforce activity independence; model CPM deterministically with linear crashing and PERT via Beta distribution; apply Central Limit Theorem for Z-score probability in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all theoretical foundations of Topic 1.",
    hint: "Verify DAG -> Ensure independence -> Use Beta/CLT for PERT -> Linear crashing for CPM in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: CheckDAG() -> CheckIndependence() -> ModelBeta_CLT() -> CalculateZ() -> Report."
  }
];

export default questions;
