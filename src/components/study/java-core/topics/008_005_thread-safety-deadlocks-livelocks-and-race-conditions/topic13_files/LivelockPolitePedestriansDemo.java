/**
 * Java Core Tutorial - Module 008_005: Thread Safety & Deadlocks
 * Topic 13: Livelock: Continuous State Mutation & Excessive Politeness without Progress
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class LivelockPolitePedestriansDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 13: LIVELOCK (ACTIVE STATE FLIPPING WITHOUT PROGRESS) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> DEADLOCK vs LIVELOCK COMPARISON:");
        System.out.println("+-------------------+-----------------------------------+-----------------------------------+");
        System.out.println("| Feature           | Deadlock                          | Livelock                          |");
        System.out.println("+-------------------+-----------------------------------+-----------------------------------+");
        System.out.println("| Thread State      | BLOCKED / WAITING (Sleeping)      | RUNNABLE (Actively running CPU!)  |");
        System.out.println("| CPU Usage         | 0% CPU Utilization                | 100% CPU Core Spikes (High Burn)  |");
        System.out.println("| Behavior          | Frozen in place, doing nothing    | Continuously acting and reacting  |");
        System.out.println("| Forward Progress  | ZERO                              | ZERO                              |");
        System.out.println("+-------------------+-----------------------------------+-----------------------------------+");
        System.out.println();
        System.out.println(">>> THE REAL-WORLD ANALOGY (POLITE PEDESTRIANS IN A NARROW HALLWAY):");
        System.out.println("  - Swadeep and Tuhina walk toward each other in a narrow hallway in Barrackpore.");
        System.out.println("  - Swadeep steps to the left to let Tuhina pass. At the same second, Tuhina steps to her right!");
        System.out.println("  - They block each other again!");
        System.out.println("  - Swadeep steps to the right. Tuhina steps to her left!");
        System.out.println("  - They repeat this dance indefinitely: Both are moving actively (100% CPU), but neither can walk forward!");
        System.out.println();
        System.out.println(">>> HOW TO SOLVE / PREVENT LIVELOCK:");
        System.out.println("  - Introduce RANDOMIZED BACK-OFF JITTER (e.g. Ethernet CSMA/CD exponential back-off).");
        System.out.println("  - When contention is detected, threads wait for a random duration (e.g. 10ms–50ms) before retrying, breaking the synchronized lockstep!");

        System.out.println("\n==========================================================================");
    }
}