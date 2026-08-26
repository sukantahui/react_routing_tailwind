/**
 * Java Core Tutorial - Module 003_007: Nested & Inner Classes
 * Topic 7: Method-Local Inner Class: Scoped Class Declarations & Effectively Final Capture
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.nested;

public class MethodLocalInnerClassDemo {

    private String institutionName = "Coder & AccoTax Barrackpore";

    public void processScholarshipEvaluation(final String studentName, double rawScore) {
        // Local variable (effectively final):
        int graceMarks = 5;

        // METHOD-LOCAL INNER CLASS: Declared right inside the method body!
        class ScholarshipEvaluator {
            public void computeAndDisplay() {
                double finalScore = rawScore + graceMarks;
                boolean isEligible = finalScore >= 80.0;

                System.out.println("  Evaluating Trainee : " + studentName);
                System.out.println("  Institution        : " + institutionName);
                System.out.println("  Final Score (Grace): " + finalScore);
                System.out.println("  Scholarship Awarded: " + (isEligible ? "YES (50% Grant)" : "NO"));
            }
        }

        // Instantiate and run the method-local class within its scope:
        ScholarshipEvaluator evaluator = new ScholarshipEvaluator();
        evaluator.computeAndDisplay();
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: METHOD-LOCAL INNER CLASS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        MethodLocalInnerClassDemo processor = new MethodLocalInnerClassDemo();

        System.out.println(">>> Executing Method with Enclosed Method-Local Class:");
        processor.processScholarshipEvaluation("Swadeep Paul", 78.5);

        System.out.println("\n==========================================================================");
    }
}