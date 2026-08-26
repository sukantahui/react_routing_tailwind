/**
 * Java Core Tutorial - Module 008_005: Thread Safety & Deadlocks
 * Topic 10: Classic Concurrency Simulation: Dining Philosophers & Inverted Transfers
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class ClassicDiningPhilosophersDeadlockDemo {

    // Simulating 5 chopsticks (locks) shared between 5 philosophers (threads):
    private static final Object[] CHOPSTICKS = new Object[5];

    static {
        for (int i = 0; i < 5; i++) {
            CHOPSTICKS[i] = new Object();
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: DINING PHILOSOPHERS DEADLOCK SIMULATION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE CLASSIC DINING PHILOSOPHERS PROBLEM (Dijkstra, 1965):");
        System.out.println("  - 5 Philosophers sit around a circular table with 5 Chopsticks between them.");
        System.out.println("  - Each philosopher needs TWO chopsticks (Left and Right) to eat noodles.");
        System.out.println();
        System.out.println(">>> THE DEADLOCK HAZARD (INVERTED NAIVE ALGORITHM):");
        System.out.println("  1. Every philosopher sits down and simultaneously picks up their LEFT chopstick.");
        System.out.println("  2. Now, all 5 chopsticks are held by 5 philosophers.");
        System.out.println("  3. Every philosopher attempts to pick up their RIGHT chopstick.");
        System.out.println("  4. Every right chopstick is already held by their right neighbor!");
        System.out.println("  5. Result: COMPLETE CIRCULAR DEADLOCK! All 5 philosophers starve!");
        System.out.println();
        System.out.println(">>> THE SOLUTION (RESOURCE HIERARCHY / ASYMMETRY):");
        System.out.println("  - Number chopsticks 0 to 4.");
        System.out.println("  - Rule: EVERY philosopher MUST pick up the LOWER-NUMBERED chopstick first, then higher.");
        System.out.println("  - Philosopher 4 (between 4 and 0) will pick up chopstick 0 FIRST instead of 4, instantly breaking the cycle!");

        System.out.println("\n==========================================================================");
    }
}