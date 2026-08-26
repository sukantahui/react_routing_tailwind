/**
 * Java Core Tutorial - Module 012_001: GoF Design Patterns
 * Topic 11: The Facade Pattern - Simplified Subsystem Entry
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.patterns;

public class FacadePatternDemo {

    // 1. Complex Subsystem Components:
    public static class StudentRegistrationSystem {
        public void register(String name) { System.out.println("   [SUBSYSTEM 1]: Registered " + name); }
    }

    public static class FeeBillingSystem {
        public void processFee(String name, double amount) { System.out.println("   [SUBSYSTEM 2]: Billed ₹" + amount + " for " + name); }
    }

    public static class IdCardPrinter {
        public void printCard(String name) { System.out.println("   [SUBSYSTEM 3]: Printed RFID ID card for " + name); }
    }

    public static class NotificationService {
        public void sendWelcomeSms(String name) { System.out.println("   [SUBSYSTEM 4]: Sent Welcome SMS to " + name); }
    }

    // 2. The Facade (Clean, One-Click Unified API):
    public static class AcademyEnrollmentFacade {
        private final StudentRegistrationSystem reg = new StudentRegistrationSystem();
        private final FeeBillingSystem billing = new FeeBillingSystem();
        private final IdCardPrinter idCard = new IdCardPrinter();
        private final NotificationService notify = new NotificationService();

        public void enrollNewStudent(String studentName, double courseFee) {
            System.out.println(">>> [FACADE]: Starting Automated 4-Step Student Onboarding...");
            reg.register(studentName);
            billing.processFee(studentName, courseFee);
            idCard.printCard(studentName);
            notify.sendWelcomeSms(studentName);
            System.out.println(">>> [FACADE]: Student " + studentName + " enrolled successfully! ✅
");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: FACADE DESIGN PATTERN - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        AcademyEnrollmentFacade enrollment = new AcademyEnrollmentFacade();
        enrollment.enrollNewStudent("Swadeep Paul", 5000.0);

        System.out.println("==========================================================================");
    }
}
