/**
 * JS018: Lexical Grammar: Comment Taxonomy & JSDoc Standards
 * Module: 001_001_getting-started-with-javascript (Topic 7)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

// 1. Single-line comment: Minimum passing score constant
const MIN_PASSING_PERCENTAGE = 40.0;

/*
 * 2. Multi-line comment block:
 * This calculation engine grades student exam submissions
 * and computes honors eligibility according to institute standards.
 */

/**
 * 3. JSDoc Standard Specification:
 * Evaluates student percentage and assigns letter grade.
 * 
 * @param {string} studentName - Full name of the candidate.
 * @param {number} marksObtained - Total marks scored (0 <= marks <= totalMarks).
 * @param {number} totalMarks - Maximum possible examination marks.
 * @returns {object} Detailed assessment result report.
 * @throws {RangeError} Throws if marksObtained exceeds totalMarks.
 * 
 * @author Sukanta Hui <mentor@coderaccotax.com>
 * @example
 * const report = evaluateStudentGrade("Swadeep", 95, 100);
 */
function evaluateStudentGrade(studentName, marksObtained, totalMarks = 100) {
  if (marksObtained < 0 || marksObtained > totalMarks) {
    throw new RangeError(`Marks obtained (${marksObtained}) exceeds max marks (${totalMarks}).`);
  }

  const percentage = (marksObtained / totalMarks) * 100;
  const grade = percentage >= 90 ? "A+" :
                percentage >= 80 ? "A"  :
                percentage >= 70 ? "B"  :
                percentage >= 60 ? "C"  :
                percentage >= 40 ? "D"  : "F (Needs Revision)";

  return {
    student: studentName,
    percentage: `${percentage.toFixed(1)}%`,
    grade,
    isPassed: percentage >= MIN_PASSING_PERCENTAGE
  };
}

console.log("Evaluation Result 1:", evaluateStudentGrade("Swadeep", 95, 100));
console.log("Evaluation Result 2:", evaluateStudentGrade("Debangshu", 82, 100));
