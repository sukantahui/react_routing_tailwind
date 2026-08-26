/**
 * Java Core Tutorial - Module 002_003: The 'this' and 'super' Keywords Mastery
 * Topic 2: Using 'this' to Invoke Current Class Instance Methods
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.thissuper;

public class ThisMethodInvocationDemo {

    public static class AcademicReport {
        private String traineeName;
        private double marksPercentage;

        public AcademicReport(String traineeName, double marksPercentage) {
            this.traineeName = traineeName;
            this.marksPercentage = marksPercentage;
        }

        private String calculateGrade() {
            return marksPercentage >= 90 ? "Grade A+" : (marksPercentage >= 75 ? "Grade A" : "Grade B");
        }

        private void printHeader() {
            System.out.println("  ========================================");
            System.out.println("  ACCOTAX ACADEMIC PERFORMANCE REPORT");
            System.out.println("  ========================================");
        }

        // Using 'this.methodName()' to explicitly invoke peer instance methods
        public void generateFullReport() {
            this.printHeader(); // Explicit this invocation
            String grade = this.calculateGrade(); // Explicit this invocation
            System.out.printf("  Trainee: %s | Marks: %.1f%% | Result: %s\n", this.traineeName, this.marksPercentage, grade);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: USING 'this' TO INVOKE METHODS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        AcademicReport report = new AcademicReport("Swadeep Paul", 94.5);
        report.generateFullReport();

        System.out.println("\n==========================================================================");
    }
}