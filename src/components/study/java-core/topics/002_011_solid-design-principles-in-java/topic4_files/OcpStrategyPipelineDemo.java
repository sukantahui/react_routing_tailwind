/**
 * Java Core Tutorial - Module 002_011: SOLID Object-Oriented Design Principles in Java
 * Topic 4: Implementing OCP Using Interfaces & Polymorphism Instead of If-Else Ladders
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.solid;

import java.util.ArrayList;
import java.util.List;

public class OcpStrategyPipelineDemo {

    // 1. Extensible Notification Plugin Interface
    public interface NotificationChannel {
        void sendAlert(String recipient, String message);
    }

    public static class SmsNotificationChannel implements NotificationChannel {
        public void sendAlert(String recipient, String message) {
            System.out.printf("  [SMS CHANNEL] SMS to %s: %s\n", recipient, message);
        }
    }

    public static class WhatsAppNotificationChannel implements NotificationChannel {
        public void sendAlert(String recipient, String message) {
            System.out.printf("  [WHATSAPP CHANNEL] WhatsApp message to %s: %s\n", recipient, message);
        }
    }

    // 2. Broadcast Engine (Closed for modification - Open to new channels)
    public static class BroadcastNotificationEngine {
        private final List<NotificationChannel> channels = new ArrayList<>();

        public void registerChannel(NotificationChannel channel) {
            channels.add(channel);
        }

        public void broadcast(String trainee, String announcement) {
            System.out.println(">>> Broadcasting Announcement to: " + trainee);
            for (NotificationChannel channel : channels) {
                channel.sendAlert(trainee, announcement); // Polymorphic dispatch!
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: OCP NOTIFICATION PIPELINE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        BroadcastNotificationEngine engine = new BroadcastNotificationEngine();
        engine.registerChannel(new SmsNotificationChannel());
        engine.registerChannel(new WhatsAppNotificationChannel());

        engine.broadcast("Swadeep Paul", "Classes resume 10 AM at Barrackpore Central Hub!");

        System.out.println("\n==========================================================================");
    }
}