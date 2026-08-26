/**
 * Java Core Tutorial - Module 003_007: Nested & Inner Classes
 * Topic 8: Anonymous Inner Class: Declaring & Instantiating Unnamed Classes on the Fly
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.nested;

interface NotificationService {
    void sendNotification(String message, String recipient);
}

public class AnonymousInnerClassFoundationsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: ANONYMOUS INNER CLASS FOUNDATIONS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // Declaring and instantiating an Anonymous Inner Class implementing NotificationService on the fly:
        NotificationService smsService = new NotificationService() {
            @Override
            public void sendNotification(String message, String recipient) {
                System.out.printf("  [SMS GATEWAY] To: %s | Message: '%s'%n", recipient, message);
            }
        };

        // Another distinct Anonymous Inner Class instance:
        NotificationService emailService = new NotificationService() {
            @Override
            public void sendNotification(String message, String recipient) {
                System.out.printf("  [EMAIL SERVER] To: %s | Subject: '%s'%n", recipient, message);
            }
        };

        System.out.println(">>> Executing Anonymous Inner Class Implementations:");
        smsService.sendNotification("Barrackpore Batch Starts Tomorrow at 10 AM", "+919830012345");
        emailService.sendNotification("Welcome to Java Core Pro", "swadeep.paul@coderaccotax.com");

        System.out.println("\n>>> NOTE: Anonymous classes have NO class name in source code (compiled to Outer$1.class)!");

        System.out.println("\n==========================================================================");
    }
}