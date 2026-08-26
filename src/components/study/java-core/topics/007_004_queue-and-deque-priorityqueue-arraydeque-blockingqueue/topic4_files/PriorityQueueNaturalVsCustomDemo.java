/**
 * Java Core Tutorial - Module 007_004: Queue, Deque & PriorityQueue
 * Topic 4: java.util.PriorityQueue: Elements Ordered by Priority (Comparable vs Comparator)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.collections;

import java.util.Comparator;
import java.util.PriorityQueue;
import java.util.Queue;

class PatientEmergencyToken implements Comparable<PatientEmergencyToken> {
    private final String patientName;
    private final int severityLevel; // 1 (Critical ICU) to 5 (Routine)

    public PatientEmergencyToken(String patientName, int severityLevel) {
        this.patientName = patientName;
        this.severityLevel = severityLevel;
    }

    public String getPatientName() { return patientName; }
    public int getSeverityLevel() { return severityLevel; }

    // Natural Ordering: Lower severity number = Higher emergency priority!
    @Override
    public int compareTo(PatientEmergencyToken other) {
        return Integer.compare(this.severityLevel, other.severityLevel);
    }

    @Override
    public String toString() {
        return String.format("Patient[%-12s, Severity=%d]", patientName, severityLevel);
    }
}

public class PriorityQueueNaturalVsCustomDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: PriorityQueue ORDERING & DISPATCHING - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. NATURAL ORDERING (Min-Heap: lowest severity number first):
        Queue<PatientEmergencyToken> triageQueue = new PriorityQueue<>();
        triageQueue.offer(new PatientEmergencyToken("Debangshu", 4)); // Routine
        triageQueue.offer(new PatientEmergencyToken("Swadeep", 1));   // Critical ICU!
        triageQueue.offer(new PatientEmergencyToken("Tuhina", 2));    // Urgent
        triageQueue.offer(new PatientEmergencyToken("Abhronila", 1)); // Critical ICU!

        System.out.println(">>> 1. Hospital Emergency Triage Dispatch (Lowest Severity Number First):");
        while (!triageQueue.isEmpty()) {
            System.out.println("  [DOCTOR DISPATCHED] -> " + triageQueue.poll());
        }

        // 2. CUSTOM ORDERING (Alphabetical Patient Name):
        Queue<PatientEmergencyToken> nameQueue = new PriorityQueue<>(Comparator.comparing(PatientEmergencyToken::getPatientName));
        nameQueue.offer(new PatientEmergencyToken("Swadeep", 1));
        nameQueue.offer(new PatientEmergencyToken("Abhronila", 1));
        nameQueue.offer(new PatientEmergencyToken("Tuhina", 2));

        System.out.println("\n>>> 2. Alphabetical Name Dispatch (Custom Comparator):");
        while (!nameQueue.isEmpty()) {
            System.out.println("  [REGISTRATION DISPATCH] -> " + nameQueue.poll());
        }

        System.out.println("\n==========================================================================");
    }
}