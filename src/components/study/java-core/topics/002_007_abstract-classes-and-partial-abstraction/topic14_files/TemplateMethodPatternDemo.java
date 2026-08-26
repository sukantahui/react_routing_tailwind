/**
 * Java Core Tutorial - Module 002_007: Abstract Classes & Partial Abstraction
 * Topic 14: The Template Method Design Pattern: Algorithm Skeleton in Abstract Class
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.abstraction;

public class TemplateMethodPatternDemo {

    // Abstract Class defining the TEMPLATE METHOD:
    public abstract static class AdmissionProcessingTemplate {

        // 1. THE TEMPLATE METHOD (Marked 'final' so child classes cannot alter the algorithm flow!):
        public final void processTraineeAdmission(String applicantName) {
            System.out.println("==========================================================================");
            System.out.println("  >>> Processing Admission for: " + applicantName);
            System.out.println("==========================================================================");
            collectRegistrationDetails(applicantName);
            boolean eligible = evaluateEligibility(applicantName);
            if (eligible) {
                assignBatchSchedule();
                generateStudentIdCard(applicantName);
                sendWelcomeSms(applicantName);
            } else {
                System.out.println("  [REJECTED] Applicant did not meet prerequisite criteria.");
            }
        }

        // Shared concrete step
        private void collectRegistrationDetails(String name) {
            System.out.println("  [STEP 1 - COMMON] Intake form and Aadhar verification completed.");
        }

        // Abstract customizable step
        protected abstract boolean evaluateEligibility(String name);

        // Abstract customizable step
        protected abstract void assignBatchSchedule();

        // Abstract customizable step
        protected abstract void generateStudentIdCard(String name);

        // Shared concrete hook / step
        private void sendWelcomeSms(String name) {
            System.out.println("  [STEP 5 - COMMON] Welcome SMS & Portal Login dispatched to " + name);
        }
    }

    // Concrete Specialization 1: Fast-track Professional Batch
    public static class FullStackJavaAdmission extends AdmissionProcessingTemplate {
        @Override
        protected boolean evaluateEligibility(String name) {
            System.out.println("  [STEP 2 - CUSTOM] Evaluated Core Java & OOP basics test: 85% Score (PASS)");
            return true;
        }

        @Override
        protected void assignBatchSchedule() {
            System.out.println("  [STEP 3 - CUSTOM] Assigned to Barrackpore Weekend Professional Batch (Sat-Sun 4 PM)");
        }

        @Override
        protected void generateStudentIdCard(String name) {
            System.out.println("  [STEP 4 - CUSTOM] Generated RFID Smart Card: BKP-FSJ-2026-99");
        }
    }

    public static void main(String[] args) {
        AdmissionProcessingTemplate admission = new FullStackJavaAdmission();
        admission.processTraineeAdmission("Swadeep Paul");
    }
}