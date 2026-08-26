/**
 * Java Core Tutorial - Module 012_001: GoF Design Patterns
 * Topic 18: The Template Method Pattern - Algorithm Skeletons & Hooks
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.patterns;

public class TemplateMethodPatternDemo {

    // 1. Abstract Base Class with Template Method:
    public static abstract class CourseEnrollmentWorkflow {

        // The Template Method (final to prevent algorithm distortion!):
        public final void enrollStudent(String studentName) {
            validateDetails(studentName);
            double baseFee = calculateTuitionFee();
            applyCenterDiscount(baseFee);
            generateIdCard(studentName);
            sendConfirmation(studentName);
            System.out.println("   >>> Enrollment Complete for " + studentName + "! ✅
");
        }

        // Concrete common steps:
        private void validateDetails(String name) { System.out.println("   [1. VALIDATE]: Verified credentials for " + name); }
        private void generateIdCard(String name) { System.out.println("   [3. ID CARD ]: Printed RFID Card for " + name); }
        private void sendConfirmation(String name) { System.out.println("   [4. NOTIFY  ]: Sent Welcome Email to " + name); }

        // Abstract Primitive Hooks (Must be implemented by subclasses):
        protected abstract double calculateTuitionFee();
        protected abstract void applyCenterDiscount(double baseFee);
    }

    // Concrete Subclass 1: Barrackpore Campus
    public static class BarrackporeCampusEnrollment extends CourseEnrollmentWorkflow {
        @Override protected double calculateTuitionFee() { return 6000.0; }
        @Override protected void applyCenterDiscount(double fee) {
            System.out.println("   [2. TUITION ]: Barrackpore Hub (Applied 10% Local Discount: ₹" + (fee * 0.90) + ")");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 18: TEMPLATE METHOD DESIGN PATTERN - BARRACKPORE");
        System.out.println("==========================================================================\n");

        CourseEnrollmentWorkflow workflow = new BarrackporeCampusEnrollment();
        workflow.enrollStudent("Swadeep Paul");

        System.out.println("==========================================================================");
    }
}
