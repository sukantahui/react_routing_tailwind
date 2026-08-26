/**
 * Java Core Tutorial - Module 002_008: Interfaces, Default/Static Methods & Multiple Inheritance
 * Topic 7: Java 8 Evolution: 'default' Methods in Interfaces (Backward Compatibility)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.interfaces;

public class DefaultMethodsEvolutionDemo {

    public interface AcademyNotifier {
        // Traditional abstract method (Subclass MUST implement)
        void sendPushNotification(String user, String message);

        // JAVA 8 DEFAULT METHOD: Provides default implementation body!
        // Subclasses get this automatically without breaking legacy implementations!
        default void logNotificationAudit(String user) {
            System.out.println("  [DEFAULT AUDIT] Notification logged for " + user + " in Barrackpore Hub audit db.");
        }
    }

    public static class LegacySlackNotifier implements AcademyNotifier {
        @Override
        public void sendPushNotification(String user, String message) {
            System.out.printf("  [SLACK DISPATCH] To %s: "%s"\n", user, message);
        }
        // Inherits logNotificationAudit() automatically without writing any code!
    }

    public static class CustomEmailNotifier implements AcademyNotifier {
        @Override
        public void sendPushNotification(String user, String message) {
            System.out.printf("  [EMAIL DISPATCH] To %s: "%s"\n", user, message);
        }

        // Subclass CAN optionally override the default method:
        @Override
        public void logNotificationAudit(String user) {
            System.out.println("  [CUSTOM AUDIT] Encrypted audit log generated for " + user);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: JAVA 8 DEFAULT METHODS IN INTERFACES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. LegacySlackNotifier using inherited default method:");
        AcademyNotifier n1 = new LegacySlackNotifier();
        n1.sendPushNotification("Swadeep", "Assignment Reviewed");
        n1.logNotificationAudit("Swadeep"); // Default executed!

        System.out.println("\n>>> 2. CustomEmailNotifier using overridden default method:");
        AcademyNotifier n2 = new CustomEmailNotifier();
        n2.sendPushNotification("Tuhina", "Certificate Ready");
        n2.logNotificationAudit("Tuhina"); // Overridden executed!

        System.out.println("\n==========================================================================");
    }
}