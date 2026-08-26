/**
 * Java Core Tutorial - Module 002_007: Abstract Classes & Partial Abstraction
 * Topic 9: Extending Abstract Classes: Mandatory Implementation of Abstract Methods
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.abstraction;

public class ExtendingAbstractClassesDemo {

    public abstract static class NotificationSystem {
        public abstract void sendImmediateNotification(String to, String message);
        public abstract boolean verifyDelivery(String messageId);
    }

    // Concrete Subclass MUST implement ALL declared abstract methods:
    public static class SmsNotificationSystem extends NotificationSystem {
        @Override
        public void sendImmediateNotification(String to, String message) {
            System.out.printf("  [SMS SENT] Dispatched to %s: "%s"\n", to, message);
        }

        @Override
        public boolean verifyDelivery(String messageId) {
            System.out.println("  [SMS VERIFIED] Delivery receipt confirmed for MSG: " + messageId);
            return true;
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: EXTENDING ABSTRACT CLASSES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        NotificationSystem notifier = new SmsNotificationSystem();
        notifier.sendImmediateNotification("9830000000", "Barrackpore Lab Java Class @ 5 PM");
        notifier.verifyDelivery("TXN-SMS-9988");

        System.out.println("\n==========================================================================");
    }
}