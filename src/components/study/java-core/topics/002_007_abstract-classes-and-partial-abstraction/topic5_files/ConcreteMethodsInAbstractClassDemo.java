/**
 * Java Core Tutorial - Module 002_007: Abstract Classes & Partial Abstraction
 * Topic 5: Concrete Methods Inside Abstract Classes: Sharing Common Logic
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.abstraction;

public class ConcreteMethodsInAbstractClassDemo {

    public abstract static class AcademicExamTemplate {
        protected String studentName;
        protected String hubLocation;

        public AcademicExamTemplate(String name, String hub) {
            this.studentName = name;
            this.hubLocation = hub;
        }

        // 1. CONCRETE METHOD (Fully shared across all exam types):
        public void recordBiometricAttendance() {
            System.out.printf("  [ATTENDANCE] Biometric check-in recorded for %s @ %s.\n", studentName, hubLocation);
        }

        // 2. CONCRETE METHOD (Common certificate generator):
        public void issueCertificate(String grade) {
            System.out.printf("  [CERTIFICATE] Awarded grade '%s' to %s (Certified by Sukanta Hui).\n", grade, studentName);
        }

        // 3. ABSTRACT METHOD (Specialized per exam format):
        public abstract void evaluateQuestions();
    }

    public static class PracticalCodingExam extends AcademicExamTemplate {
        public PracticalCodingExam(String name, String hub) { super(name, hub); }

        @Override
        public void evaluateQuestions() {
            System.out.println("  [EVALUATION] Executing automated JUnit assertions on GitHub repository...");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: CONCRETE METHODS IN ABSTRACT CLASSES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        AcademicExamTemplate exam = new PracticalCodingExam("Swadeep Paul", "Barrackpore Hub");

        // Calling shared concrete methods:
        exam.recordBiometricAttendance();

        // Calling specialized overridden method:
        exam.evaluateQuestions();

        // Calling another shared concrete method:
        exam.issueCertificate("A+");

        System.out.println("\n==========================================================================");
    }
}