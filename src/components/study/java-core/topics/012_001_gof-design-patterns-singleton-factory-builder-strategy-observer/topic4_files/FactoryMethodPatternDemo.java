/**
 * Java Core Tutorial - Module 012_001: GoF Design Patterns
 * Topic 4: Factory Method Pattern - Polymorphic Object Creation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.patterns;

public class FactoryMethodPatternDemo {

    // 1. Product Interface:
    public interface NotificationService {
        void send(String recipient, String message);
    }

    // Concrete Products:
    public static class EmailNotification implements NotificationService {
        @Override
        public void send(String r, String msg) {
            System.out.println("   [EMAIL -> " + r + "]: " + msg);
        }
    }

    public static class SmsNotification implements NotificationService {
        @Override
        public void send(String r, String msg) {
            System.out.println("   [SMS -> " + r + "]: " + msg);
        }
    }

    // 2. Creator (Factory Method):
    public static abstract class NotificationFactory {
        // The Factory Method:
        public abstract NotificationService createNotification();

        // Template operation using the product:
        public void sendBroadcast(String recipient, String msg) {
            NotificationService service = createNotification();
            service.send(recipient, msg);
        }
    }

    // Concrete Creators:
    public static class EmailNotificationFactory extends NotificationFactory {
        @Override
        public NotificationService createNotification() {
            return new EmailNotification();
        }
    }

    public static class SmsNotificationFactory extends NotificationFactory {
        @Override
        public NotificationService createNotification() {
            return new SmsNotification();
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: FACTORY METHOD PATTERN - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        NotificationFactory emailFactory = new EmailNotificationFactory();
        emailFactory.sendBroadcast("swadeep@coderaccotax.com", "Your Java Core Certificate is Ready!");

        NotificationFactory smsFactory = new SmsNotificationFactory();
        smsFactory.sendBroadcast("+91-9830000000", "Class begins tomorrow at 10 AM at Barrackpore.");

        System.out.println("\n==========================================================================");
    }
}
