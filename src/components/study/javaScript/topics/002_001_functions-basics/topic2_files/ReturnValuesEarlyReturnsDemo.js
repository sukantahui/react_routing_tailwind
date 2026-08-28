// ============================================================================
// CODER & ACCOTAX - JAVASCRIPT MASTERCLASS
// Module: 002_001_functions-basics
// Topic: Return Values & Early Returns
// Classroom Lab: Shyamnagar Tech Lab
// Mentors: Sukanta Hui | Students: Abhronila, Debangshu
// ============================================================================

console.log("=== [1] FUNDAMENTAL CONCEPT & INITIALIZATION ===");
console.log("Demonstrating foundational mechanics for: Return Values & Early Returns");
console.log("");

// Example 1: Basic declaration and setup
const courseConfig = {
  subject: "JavaScript Master Pro",
  module: "Functions, Scopes & Reusable Logic",
  center: "Shyamnagar Tech Lab",
  student: "Abhronila",
  score: 95.5,
  isActive: true
};

console.log("Configured student profile:");
console.log(courseConfig);
console.log("Student Name:", courseConfig.student);
console.log("Status Active:", courseConfig.isActive);
console.log("");

console.log("=== [2] CORE DATA PROCESSING & FUNCTION PIPELINE ===");
// Example 2: Practical data manipulation
function processTopicData(items) {
  return items.map((item, index) => {
    return {
      index: index + 1,
      name: item,
      processedAt: new Date().toISOString(),
      verifiedBy: "Debangshu"
    };
  });
}

const sampleList = ["Foundational Syntax", "Execution Mechanics", "Optimization Rules"];
const processedResults = processTopicData(sampleList);
console.log("Processed pipeline data:");
console.table(processedResults);
console.log("");

console.log("=== [3] ALGORITHMIC LOGIC & CONTROL FLOW ===");
// Example 3: Branching and transformation logic
function evaluateProficiency(score) {
  if (score >= 90) return { grade: "Distinction", level: "Ultra Expert" };
  if (score >= 75) return { grade: "First Class", level: "Advanced" };
  if (score >= 50) return { grade: "Pass", level: "Intermediate" };
  return { grade: "Needs Review", level: "Beginner" };
}

const evaluation = evaluateProficiency(courseConfig.score);
console.log("Evaluation Result for " + courseConfig.student + ":", evaluation);
console.log("");

console.log("=== [4] ERROR RESILIENCE & SAFE GUARDS ===");
// Example 4: Defensive programming and validation
function safeRunner(action, fallbackValue) {
  try {
    return action();
  } catch (err) {
    console.warn("Recovered from operational failure:", err.message);
    return fallbackValue;
  }
}

const safeOutcome = safeRunner(() => {
  const data = JSON.parse('{"status": "success", "metric": 99.9}');
  return data.status + " -> Metric: " + data.metric;
}, "default_fallback");

console.log("Safe Execution Output:", safeOutcome);
console.log("");

console.log("=== [5] SENIOR ARCHITECTURE PATTERN & BEST PRACTICE ===");
// Example 5: Modular encapsulation & clean API design
const LabController = (function() {
  const registry = new Map();
  
  return {
    register(id, handler) {
      registry.set(id, handler);
      console.log("Registered handler for key: [" + id + "]");
    },
    dispatch(id, payload) {
      if (!registry.has(id)) {
        console.error("No handler registered for: " + id);
        return null;
      }
      return registry.get(id)(payload);
    },
    getRegistrySize() {
      return registry.size;
    }
  };
})();

LabController.register("INIT_TOPIC", (payload) => {
  return "Lab initialized with payload: " + JSON.stringify(payload);
});

const dispatchResult = LabController.dispatch("INIT_TOPIC", {
  topic: "Return Values & Early Returns",
  student: "Abhronila",
  mentor: "Sukanta Hui"
});

console.log("Dispatch Output:", dispatchResult);
console.log("Total Registered Handlers:", LabController.getRegistrySize());
console.log("");
console.log("=== JavaScript Lab Execution Completed Successfully ===");
