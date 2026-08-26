/**
 * Java Core Tutorial - Module 010_006: JVM Profiling, Heap Dumps & Memory Leak Diagnosis
 * Topic 3: Unregistered Listeners & Callbacks - The Lapsed Listener Problem
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.profiling;

import java.util.ArrayList;
import java.util.List;

public class UnregisteredListenersCallbacksDemo {

    public interface StudentFeeListener {
        void onFeePaid(String studentName, double amount);
    }

    // Long-lived event broadcaster (Singleton / Global Service):
    public static class AcademyEventBroadcaster {
        private final List<StudentFeeListener> listeners = new ArrayList<>();

        public void registerListener(StudentFeeListener listener) {
            listeners.add(listener);
        }

        public void unregisterListener(StudentFeeListener listener) {
            listeners.remove(listener); // Mandatory to prevent leak!
        }
    }

    // Short-lived UI / Window component:
    public static class StudentEnrollmentDialog implements StudentFeeListener, AutoCloseable {
        private final String studentName;
        private final AcademyEventBroadcaster broadcaster;

        public StudentEnrollmentDialog(String name, AcademyEventBroadcaster broadcaster) {
            this.studentName = name;
            this.broadcaster = broadcaster;
            // Registering listener:
            this.broadcaster.registerListener(this);
            System.out.println("   [DIALOG OPENED]: " + studentName + " (Listener Registered)");
        }

        @Override
        public void onFeePaid(String name, double amount) {
            System.out.println("   --> Dialog updated for " + name + ": ₹" + amount);
        }

        @Override
        public void close() {
            // FIX: Unregister listener on close!
            broadcaster.unregisterListener(this);
            System.out.println("   [DIALOG CLOSED]: " + studentName + " (Listener Unregistered ✅)");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: UNREGISTERED LISTENERS & CALLBACKS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        AcademyEventBroadcaster globalBroadcaster = new AcademyEventBroadcaster();

        // Using try-with-resources to guarantee listener unregistration:
        try (StudentEnrollmentDialog dialog = new StudentEnrollmentDialog("Swadeep Paul", globalBroadcaster)) {
            // Dialog actively in use
        } // AutoCloseable triggers dialog.close() -> Unregisters listener!

        System.out.println("\n>>> VERDICT: Zero Lapsed Listener Memory Leak!");
        System.out.println("==========================================================================");
    }
}
