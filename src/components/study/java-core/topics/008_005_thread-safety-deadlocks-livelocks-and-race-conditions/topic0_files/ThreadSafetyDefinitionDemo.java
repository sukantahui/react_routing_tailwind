/**
 * Java Core Tutorial - Module 008_005: Thread Safety & Deadlocks
 * Topic 0: What Constitutes Thread Safety: Invariant Preservation & Specifications
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

// 1. AN IMMUTABLE CLASS IS INHERENTLY THREAD-SAFE (Zero Synchronization Needed!):
final class StudentRegistrationBadge {
    private final String studentName;
    private final String centerLocation;
    private final long timestamp;

    public StudentRegistrationBadge(String studentName, String centerLocation) {
        this.studentName = studentName;
        this.centerLocation = centerLocation;
        this.timestamp = System.currentTimeMillis();
    }

    public String getStudentName() { return studentName; }
    public String getCenterLocation() { return centerLocation; }
    public long getTimestamp() { return timestamp; }

    @Override
    public String toString() {
        return String.format("Badge[%s @ %s, Time: %d]", studentName, centerLocation, timestamp);
    }
}

public class ThreadSafetyDefinitionDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: WHAT CONSTITUTES THREAD SAFETY - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE CANONICAL DEFINITION OF THREAD SAFETY (Brian Goetz):");
        System.out.println("  'A class is thread-safe if it behaves correctly when accessed from multiple");
        System.out.println("   threads, regardless of the scheduling or interleaving of the execution of");
        System.out.println("   those threads by the runtime environment, and with NO additional synchronization");
        System.out.println("   or other coordination on the part of the calling code.'");
        System.out.println();
        System.out.println(">>> THE 3 GOLDEN PATHWAYS TO THREAD SAFETY:");
        System.out.println("  1. Immutability           : Make state final & unmodifiable (e.g. StudentRegistrationBadge, String).");
        System.out.println("  2. Thread Confinement     : Never share state across threads (e.g. Local variables, ThreadLocal).");
        System.out.println("  3. Synchronized Mutation  : Guard shared mutable state with Locks or Atomic CAS classes.");

        System.out.println("\n==========================================================================");
    }
}