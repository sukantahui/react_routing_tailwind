/**
 * JS009: Formatted Console Logging with Format Specifiers (%s, %d, %o)
 * Module: 001_001_getting-started-with-javascript (Topic 5)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

function generateStudentDiagnostic(studentName, rollNumber, marksObtained, metadata) {
  // %s = String substitution
  // %d / %i = Integer substitution
  // %f = Floating-point number substitution
  // %o = JavaScript Object tree inspection
  console.log(
    "Student [%s] | Roll: %d | Score: %f/100 | Metadata: %o",
    studentName,
    rollNumber,
    marksObtained,
    metadata
  );
}

console.log("=== Formatted Console Diagnostics with Specifiers ===");

generateStudentDiagnostic("Swadeep Mukherjee", 101, 98.75, {
  batch: "Weekend Pro",
  center: "Barrackpore",
  mentor: "Sukanta Hui"
});

generateStudentDiagnostic("Tuhina Paul", 102, 94.20, {
  batch: "Weekend Pro",
  center: "Naihati",
  mentor: "Sukanta Hui"
});
