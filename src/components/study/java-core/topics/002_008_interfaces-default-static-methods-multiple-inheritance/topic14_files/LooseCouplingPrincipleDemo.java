/**
 * Java Core Tutorial - Module 002_008: Interfaces, Default/Static Methods & Multiple Inheritance
 * Topic 14: Loose Coupling: Programming to an Interface, Not an Implementation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.interfaces;

public class LooseCouplingPrincipleDemo {

    // 1. ABSTRACT CONTRACT
    public interface MessageSender {
        void deliver(String to, String msg);
    }

    // 2. Concrete Provider 1
    public static class TwilioSmsSender implements MessageSender {
        public void deliver(String to, String msg) {
            System.out.printf("  [TWILIO SMS] Dispatched to %s: "%s"\n", to, msg);
        }
    }

    // 3. Concrete Provider 2
    public static class SendGridEmailSender implements MessageSender {
        public void deliver(String to, String msg) {
            System.out.printf("  [SENDGRID EMAIL] Sent TLS email to %s: "%s"\n", to, msg);
        }
    }

    // 4. LOOSELY COUPLED HIGH-LEVEL SERVICE (Depends ONLY on MessageSender interface!)
    public static class TraineeAdmissionAlertService {
        private MessageSender sender; // Decoupled interface reference!

        // Dependency Injection via constructor:
        public TraineeAdmissionAlertService(MessageSender sender) {
            this.sender = sender;
        }

        public void alertTrainee(String recipient, String message) {
            this.sender.deliver(recipient, message); // Polymorphic dispatch
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 14: PROGRAMMING TO AN INTERFACE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Injecting Twilio SMS Provider:");
        TraineeAdmissionAlertService service1 = new TraineeAdmissionAlertService(new TwilioSmsSender());
        service1.alertTrainee("Swadeep Paul (9830000000)", "Your batch starts Monday @ Barrackpore!");

        System.out.println("\n>>> 2. Swapping to SendGrid Email Provider (Zero client code changes!):");
        TraineeAdmissionAlertService service2 = new TraineeAdmissionAlertService(new SendGridEmailSender());
        service2.alertTrainee("swadeep@example.com", "Your course syllabus is attached.");

        System.out.println("\n==========================================================================");
    }
}