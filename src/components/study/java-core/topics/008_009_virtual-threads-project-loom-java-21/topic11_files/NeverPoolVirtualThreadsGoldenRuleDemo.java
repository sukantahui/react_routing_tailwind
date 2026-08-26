/**
 * Java Core Tutorial - Module 008_009: Virtual Threads (Java 21+ Project Loom)
 * Topic 11: The Golden Rule of Project Loom: NEVER POOL VIRTUAL THREADS!
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.virtualthreads;

public class NeverPoolVirtualThreadsGoldenRuleDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: THE GOLDEN RULE: NEVER POOL VIRTUAL THREADS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> WHY WE USED TO POOL THREADS IN JAVA 1.0 - 20:");
        System.out.println("  - We pooled Platform Threads because they are HEAVYWEIGHT, EXPENSIVE (~1 MB RAM), and slow to create.");
        System.out.println("  - Thread Pools acted as a caching mechanism to avoid destroying precious OS threads.");
        System.out.println();
        System.out.println(">>> THE GOLDEN RULE OF VIRTUAL THREADS (Ron Pressler):");
        System.out.println("  🚨 'NEVER POOL VIRTUAL THREADS! Virtual Threads are EPHEMERAL and meant to be CREATED ON DEMAND and DISCARDED.'");
        System.out.println();
        System.out.println(">>> WHY POOLING VIRTUAL THREADS IS AN ANTI-PATTERN:");
        System.out.println("  1. Defeats Their Purpose : Virtual threads are designed to represent individual tasks, not reusable workers.");
        System.out.println("  2. Pooling Overheads     : Adding queue contention and lock synchronizers around virtual threads SLOWS THEM DOWN.");
        System.out.println("  3. Throttling Resources  : If you need to limit concurrent calls (e.g. max 10 DB connections), USE A SEMAPHORE ('new Semaphore(10)'), NOT A THREAD POOL!");

        System.out.println("\n==========================================================================");
    }
}