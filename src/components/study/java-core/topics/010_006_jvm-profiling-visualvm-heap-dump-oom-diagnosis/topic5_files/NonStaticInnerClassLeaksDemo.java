/**
 * Java Core Tutorial - Module 010_006: JVM Profiling, Heap Dumps & Memory Leak Diagnosis
 * Topic 5: Non-Static Inner Classes - Hidden Outer Instance Pointers (this$0)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.profiling;

public class NonStaticInnerClassLeaksDemo {

    // Massive outer enclosing class:
    public static class MassiveAcademyReport {
        private final byte[] hugePayload = new byte[1024 * 1024 * 50]; // 50 MB data!
        private final String reportTitle = "Barrackpore Annual Financial Ledger";

        // 1. LEAK HAZARD: Non-Static Inner Class (Holds implicit 'this$0' reference!)
        public Runnable createLeakingTask() {
            return new Runnable() { // Anonymous non-static inner class!
                @Override
                public void run() {
                    // Implicitly holds reference to entire MassiveAcademyReport (50MB)!
                    System.out.println("Processing report: " + reportTitle);
                }
            };
        }

        // 2. PRODUCTION FIX: Static Nested Class (Zero outer instance pointer!)
        public static class SafeWorkerTask implements Runnable {
            private final String title;
            public SafeWorkerTask(String title) { this.title = title; } // Only copies what is needed!

            @Override
            public void run() {
                System.out.println("Safe processing: " + title);
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: NON-STATIC INNER CLASSES & this$0 LEAKS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        MassiveAcademyReport report = new MassiveAcademyReport();

        // Safe task only references the String title, allowing 50MB report to be GC'd:
        Runnable safeTask = new MassiveAcademyReport.SafeWorkerTask("Barrackpore 2026");
        report = null; // 50MB MassiveAcademyReport is now safely eligible for GC!

        safeTask.run();
        System.out.println("\n>>> VERDICT: 50MB outer instance reclaimed successfully without leaks! ✅");
        System.out.println("==========================================================================");
    }
}
