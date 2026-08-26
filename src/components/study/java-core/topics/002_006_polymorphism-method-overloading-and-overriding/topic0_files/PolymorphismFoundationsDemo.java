/**
 * Java Core Tutorial - Module 002_006: Polymorphism, Method Overriding & Dynamic Method Dispatch
 * Topic 0: What is Polymorphism: "One Interface, Multiple Implementations"
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.polymorphism;

public class PolymorphismFoundationsDemo {

    // Common Interface / Base Contract
    public interface NotificationChannel {
        void sendAlert(String recipient, String message);
    }

    // Implementation 1: SMS Channel
    public static class SmsAlertChannel implements NotificationChannel {
        public void sendAlert(String recipient, String message) {
            System.out.printf("  [SMS GATEWAY] Sending SMS to %s: "%s"\n", recipient, message);
        }
    }

    // Implementation 2: Email Channel
    public static class EmailAlertChannel implements NotificationChannel {
        public void sendAlert(String recipient, String message) {
            System.out.printf("  [EMAIL SERVER] Dispatching Email to %s: "%s"\n", recipient, message);
        }
    }

    // Implementation 3: WhatsApp Channel
    public static class WhatsAppAlertChannel implements NotificationChannel {
        public void sendAlert(String recipient, String message) {
            System.out.printf("  [WHATSAPP API] Delivering message to %s: "%s"\n", recipient, message);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: WHAT IS POLYMORPHISM IN JAVA - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // ONE unified array of interface references, MULTIPLE dynamic implementations:
        NotificationChannel[] channels = {
            new SmsAlertChannel(),
            new EmailAlertChannel(),
            new WhatsAppAlertChannel()
        };

        String trainee = "Swadeep Paul (Barrackpore Hub)";
        String message = "Your Java Core project review is scheduled for 4 PM.";

        System.out.println(">>> Broadcasting alert via polymorphic channel dispatch:");
        for (NotificationChannel channel : channels) {
            channel.sendAlert(trainee, message); // Polymorphic invocation!
        }

        System.out.println("\n==========================================================================");
    }
}