/**
 * Java Core Tutorial - Module 003_007: Nested & Inner Classes
 * Topic 17: Enterprise Architecture Capstone: Event-Driven Notification Engine
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.nested;

import java.util.ArrayList;
import java.util.List;

public class EventDrivenNotificationEngineCapstoneDemo {

    // 1. Static Nested Event Class:
    public static class AdmissionEvent {
        private final String studentName;
        private final String center;
        private final double feePaid;

        public AdmissionEvent(String name, String center, double fee) {
            this.studentName = name;
            this.center = center;
            this.feePaid = fee;
        }

        public String getStudentName() { return studentName; }
        public String getCenter() { return center; }
        public double getFeePaid() { return feePaid; }
    }

    // 2. Functional Interface Callback:
    public interface AdmissionEventListener {
        void onAdmissionCompleted(AdmissionEvent event);
    }

    // 3. Inner Class Dispatcher:
    public class EventDispatcher {
        private final List<AdmissionEventListener> listeners = new ArrayList<>();

        public void subscribe(AdmissionEventListener listener) {
            listeners.add(listener);
        }

        public void publish(AdmissionEvent event) {
            for (AdmissionEventListener l : listeners) {
                l.onAdmissionCompleted(event);
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 17: EVENT-DRIVEN ENGINE CAPSTONE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        EventDrivenNotificationEngineCapstoneDemo engine = new EventDrivenNotificationEngineCapstoneDemo();
        EventDrivenNotificationEngineCapstoneDemo.EventDispatcher dispatcher = engine.new EventDispatcher();

        // Subscribing with Anonymous Classes & Lambdas:
        dispatcher.subscribe(new AdmissionEventListener() {
            @Override
            public void onAdmissionCompleted(AdmissionEvent e) {
                System.out.printf("  [SMS SERVICE] Sent receipt to %s (%s center)%n", e.getStudentName(), e.getCenter());
            }
        });

        dispatcher.subscribe(e ->
                System.out.printf("  [ACCOTAX LEDGER] Logged tuition payment of %.2f INR into Barrackpore Books.%n", e.getFeePaid())
        );

        System.out.println(">>> Triggering New Admission Event Publication:");
        AdmissionEvent newStudent = new AdmissionEvent("Swadeep Paul", "Barrackpore", 12500.0);
        dispatcher.publish(newStudent);

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 003_007 NESTED, INNER & ANONYMOUS CLASSES 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}