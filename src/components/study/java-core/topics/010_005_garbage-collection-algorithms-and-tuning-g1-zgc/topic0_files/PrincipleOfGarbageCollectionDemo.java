/**
 * Java Core Tutorial - Module 010_005: Garbage Collection Algorithms, Collectors & GC Tuning
 * Topic 0: The Principle of Garbage Collection - Automatic Memory Reclamation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.gc;

public class PrincipleOfGarbageCollectionDemo {

    public static class StudentSession {
        private final String studentName;
        public StudentSession(String name) { this.studentName = name; }
        @Override public String toString() { return "StudentSession[" + studentName + "]"; }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: PRINCIPLE OF GARBAGE COLLECTION - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        // 1. Live referenced object:
        StudentSession activeSession = new StudentSession("Swadeep Paul (Barrackpore)");
        System.out.println("1. Active Live Object: " + activeSession);

        // 2. Making an object eligible for Garbage Collection (Dereferencing):
        StudentSession temporarySession = new StudentSession("Tuhina Das (Temporary)");
        System.out.println("2. Created Temporary Session: " + temporarySession);

        // Nullifying reference makes the heap object unreachable (Garbage!):
        temporarySession = null;
        System.out.println("   --> 'temporarySession' set to null: Object is now ELIGIBLE for GC!\n");

        System.out.println(">>> 3. HOW THE GARBAGE COLLECTOR OPERATES:");
        System.out.println("  1. Identifies unreferenced / unreachable objects in Heap memory.");
        System.out.println("  2. Reclaims memory occupied by those dead objects.");
        System.out.println("  3. Compacts fragmented memory blocks (in compacting collectors).");
        System.out.println("  4. Executes fully autonomously without explicit free() / delete calls.");

        System.out.println("\n==========================================================================");
    }
}
