/**
 * Java Core Tutorial - Module 002_011: SOLID Object-Oriented Design Principles in Java
 * Topic 12: Refactoring Legacy Spaghetti Code into Pristine SOLID Architecture (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.solid;

public class SolidCapstoneArchitectureDemo {

    // S: Model Layer (State only)
    public static class TraineeAdmissionRequest {
        public String traineeName;
        public String courseName;
        public double feeAmount;
        public TraineeAdmissionRequest(String name, String course, double fee) {
            this.traineeName = name;
            this.courseName = course;
            this.feeAmount = fee;
        }
    }

    // O: Extensible Payment Interface
    public interface PaymentGatewayDriver {
        void processPayment(String name, double amount);
    }

    public static class UpiPaymentDriver implements PaymentGatewayDriver {
        public void processPayment(String name, double amount) {
            System.out.printf("  [UPI DRIVER] Received ₹%.2f from %s via QR Scan.\n", amount, name);
        }
    }

    // I: Segregated Communication Interface
    public interface NotificationSender {
        void notifyTrainee(String name, String message);
    }

    public static class SmsNotificationSender implements NotificationSender {
        public void notifyTrainee(String name, String message) {
            System.out.printf("  [SMS NOTIFICATION] Sent to %s: "%s"\n", name, message);
        }
    }

    // D & L: High-level Orchestrator depending on Abstractions (Pure SOLID Architecture!)
    public static class AcademyEnrollmentOrchestrator {
        private final PaymentGatewayDriver paymentDriver;
        private final NotificationSender notificationSender;

        public AcademyEnrollmentOrchestrator(PaymentGatewayDriver payment, NotificationSender notification) {
            this.paymentDriver = payment;
            this.notificationSender = notification;
        }

        public void processAdmission(TraineeAdmissionRequest req) {
            System.out.println(">>> Initiating Admission Pipeline for: " + req.traineeName);
            paymentDriver.processPayment(req.traineeName, req.feeAmount);
            notificationSender.notifyTrainee(req.traineeName, "Welcome to Coder & AccoTax Barrackpore Academy!");
            System.out.println("  [ORCHESTRATOR] Admission Pipeline Completed Successfully!
");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: SOLID ARCHITECTURE CAPSTONE PIPELINE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        AcademyEnrollmentOrchestrator orchestrator = new AcademyEnrollmentOrchestrator(
                new UpiPaymentDriver(),
                new SmsNotificationSender()
        );

        TraineeAdmissionRequest req = new TraineeAdmissionRequest(
                "Swadeep Paul",
                "Full Stack Java Core",
                25000.0
        );

        orchestrator.processAdmission(req);

        System.out.println("==========================================================================");
        System.out.println(" MODULE 002_011 SOLID PRINCIPLES 100% COMPLETE!");
        System.out.println(" SEGMENT 2 OBJECT-ORIENTED PROGRAMMING 100% COMPLETE (11/11 MODULES)!");
        System.out.println("==========================================================================");
    }
}