/**
 * Java Core Tutorial - Module 010_006: JVM Profiling, Heap Dumps & Memory Leak Diagnosis
 * Topic 19: Hands-On Forensic Lab - Diagnosing & Fixing a Real Multi-GB Leak (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.profiling;

import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

public class MemoryLeakForensicCapstoneDemo {

    // Simulating Real-World Leak Fix:
    public static class ProductionStudentRegistryService {

        // BUGGY VERSION: Unbounded map holding every transaction forever
        // private static final Map<String, Object> AUDIT_LOGS = new ConcurrentHashMap<>();

        // FIXED VERSION: Bounded cache with explicit cleanup
        private final Map<String, Object> activeStudentSessions = new ConcurrentHashMap<>();

        public void registerSession(String studentId, Object sessionData) {
            activeStudentSessions.put(studentId, sessionData);
            System.out.println("   [REGISTERED]: Session for student " + studentId);
        }

        public void endSession(String studentId) {
            activeStudentSessions.remove(studentId); // Crucial fix: Remove on session logout!
            System.out.println("   [REMOVED]   : Session for student " + studentId + " cleared! ✅");
        }

        public int getActiveCount() {
            return activeStudentSessions.size();
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 19: HANDS-ON MEMORY FORENSIC CAPSTONE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        ProductionStudentRegistryService service = new ProductionStudentRegistryService();

        System.out.println(">>> 1. EXECUTING REGISTRATION LIFECYCLE:");
        service.registerSession("STU-101-SWADEEP", new byte[1024 * 100]);
        service.registerSession("STU-102-TUHINA", new byte[1024 * 100]);
        System.out.println("Active sessions count: " + service.getActiveCount());

        System.out.println("\n>>> 2. SESSION LOGOUT & MEMORY PURGE:");
        service.endSession("STU-101-SWADEEP");
        service.endSession("STU-102-TUHINA");
        System.out.println("Active sessions count after cleanup: " + service.getActiveCount());

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 010_006 COMPLETE: JVM PROFILING & OOM DIAGNOSIS MASTERED!");
        System.out.println("==========================================================================");
    }
}
