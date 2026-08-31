// topic9_questions.js
// 30 Moderate to Expert Questions on Critical Path in CPM & PERT

const questions = [
  {
    question: "What is the formal definition of the 'Critical Path' in Project Network Analysis?",
    shortAnswer: "The continuous, unbroken sequence of connected critical activities and events extending from the initial start event to the terminal sink event that has the LONGEST total duration.",
    explanation: "The longest sequence dictates the certified minimum project completion time.",
    hint: "Longest continuous path of critical activities from start node to end node.",
    level: "moderate",
    codeExample: "CriticalPath = allPaths.reduce((longest, p) => p.duration > longest.duration ? p : longest);"
  },
  {
    question: "Why is the LONGEST path called the path that determines the MINIMUM project duration?",
    shortAnswer: "Because the project cannot be completed until ALL activities on all paths finish; since the longest path takes the most time, the project cannot physically finish any earlier than the duration of the longest path.",
    explanation: "Longest required duration creates the earliest possible completion boundary.",
    hint: "Project cannot finish until the longest path completes, establishing the minimum possible project time.",
    level: "expert",
    codeExample: "MinProjectDuration = maxPathDuration(allPaths);"
  },
  {
    question: "What is the Total Float of the Critical Path as a whole?",
    shortAnswer: "EXACTLY ZERO (Total Float = 0).",
    explanation: "Zero total float means the entire path has zero schedule buffer.",
    hint: "Zero total float.",
    level: "moderate",
    codeExample: "CriticalPath.totalFloat === 0;"
  },
  {
    question: "Can a project have MORE THAN ONE Critical Path simultaneously?",
    shortAnswer: "YES! When two or more distinct paths between the start node and terminal sink node have the exact same maximum total duration, the network has multiple co-critical paths.",
    explanation: "Co-critical paths require simultaneous management and crashing across all parallel critical chains.",
    hint: "Yes, when two or more paths share the identical longest duration.",
    level: "intermediate",
    codeExample: "CoCriticalPaths = paths.filter(p => p.duration === maxDuration);"
  },
  {
    question: "What is a 'Subcritical Path' (or Near-Critical Path)?",
    shortAnswer: "A path whose total duration is slightly less than the critical path (very small positive float, e.g. TF = 1 or 2 days) that can easily become critical if minor delays occur.",
    explanation: "Requires close monitoring so unexpected delays do not shift the critical path undetected.",
    hint: "A path with very small float that can easily become critical if delayed.",
    level: "moderate",
    codeExample: "isSubcritical = (path.totalFloat > 0 && path.totalFloat <= threshold);"
  },
  {
    question: "What happens to the critical path during project crashing?",
    shortAnswer: "As critical activities are crashed, the duration of the critical path shortens until a subcritical path reaches the same duration, causing the critical path to branch into multiple co-critical paths.",
    explanation: "Dynamic path shifting is a core phenomenon in time-cost optimization.",
    hint: "Critical path duration shortens until parallel subcritical paths become co-critical.",
    level: "expert",
    codeExample: "CrashConvergence: Crashing Path A until Duration(Path A) === Duration(Path B)."
  },
  {
    question: "Suppose a network has 3 paths: Path 1 (14 days), Path 2 (24 days), and Path 3 (19 days). What is the critical path and project duration?",
    shortAnswer: "Path 2 is the Critical Path, and the Project Duration is 24 days.",
    explanation: "max(14, 24, 19) = 24 days.",
    hint: "Path 2 with 24 days duration.",
    level: "moderate",
    codeExample: "CriticalPath = Path2; ProjectDuration = 24;"
  },
  {
    question: "In the 3-path project above, what is the Total Float of Path 3?",
    shortAnswer: "Total Float of Path 3 = 24 - 19 = 5 days.",
    explanation: "Float = Project Duration - Path Duration = 24 - 19 = 5 days.",
    hint: "5 days.",
    level: "moderate",
    codeExample: "Path3_Float = 24 - 19 = 5;"
  },
  {
    question: "If an activity on Path 3 is delayed by 4 days, does the project finish date change?",
    shortAnswer: "NO! The 4-day delay is smaller than Path 3's 5-day float buffer; Path 3 duration increases to 23 days, but Path 2 (24 days) remains the critical path.",
    explanation: "4 days delay < 5 days float buffer.",
    hint: "No, the 4-day delay is absorbed by Path 3's 5-day float.",
    level: "moderate",
    codeExample: "ProjectDelay = Math.max(0, 19 + 4 - 24) = 0;"
  },
  {
    question: "If an activity on Path 3 is delayed by 8 days, what happens to the project?",
    shortAnswer: "Path 3 duration becomes 19 + 8 = 27 days. The Critical Path SHIFTS to Path 3, and the overall project is delayed by 3 days (from 24 to 27 days).",
    explanation: "Exceeding the float shifts the critical path to Path 3.",
    hint: "Critical path shifts to Path 3, delaying project by 3 days.",
    level: "expert",
    codeExample: "NewDuration = 27; NewCriticalPath = Path3; Delay = 3;"
  },
  {
    question: "Suppose Debangshu in Barrackpore is managing a furnace rebuild. Why must he continuously re-evaluate subcritical paths during execution?",
    shortAnswer: "Because real-world disruptions on subcritical paths can consume their float buffers and turn them into new critical paths without management noticing.",
    explanation: "Dynamic monitoring prevents surprise delays from newly formed bottlenecks.",
    hint: "Subcritical paths can consume their float buffers and become new critical paths.",
    level: "moderate",
    codeExample: "ManagementStrategy: Monitor both Critical and Subcritical paths concurrently."
  },
  {
    question: "What is the relationship between Critical Path and Float Hierarchy?",
    shortAnswer: "Every single activity along the Critical Path satisfies TF = 0, FF = 0, and IF = 0 strictly.",
    explanation: "Zero buffer across all float dimensions.",
    hint: "All activities on the critical path have TF = FF = IF = 0.",
    level: "intermediate",
    codeExample: "CriticalPathActivities.every(a => a.TF === 0 && a.FF === 0 && a.IF === 0);"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating project financial investments and crashing budgets in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Critical Path Total Budget = ₹24,50,000'"
  },
  {
    question: "What is the ultimate golden rule of the Critical Path in CPM/PERT?",
    shortAnswer: "'The Critical Path is the LONGEST sequence of zero-slack tasks connecting start to sink; it dictates the MINIMUM completion time; manage subcritical paths vigilantly, and crash only critical paths in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all critical path principles.",
    hint: "Longest zero-slack path → Dictates minimum project duration → Monitor subcritical paths → Crash only critical tasks in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: LongestZeroSlackPath() → DictatesMinDuration() → MonitorNearCritical() → CrashInRupees(₹)."
  }
];

export default questions;
