/**
 * Java Core Tutorial - Module 008_008: Explicit Locks & Synchronizers
 * Topic 9: Architectural Comparison: CountDownLatch vs CyclicBarrier
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class LatchVsBarrierComparisonMatrixDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: CountDownLatch vs CyclicBarrier COMPARISON - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println("+-------------------+-----------------------------------+-----------------------------------+");
        System.out.println("| Feature           | CountDownLatch                    | CyclicBarrier                     |");
        System.out.println("+-------------------+-----------------------------------+-----------------------------------+");
        System.out.println("| Reusability       | ONE-TIME ONLY (Cannot be reset)   | REUSABLE (Resets automatically)   |");
        System.out.println("| Synchronization   | 1+ threads wait for N events      | N threads wait for EACH OTHER     |");
        System.out.println("| Thread Role       | Workers call countDown(),         | All participating threads call    |");
        System.out.println("|                   | Master thread calls await()       | barrier.await() (Peer-to-peer)    |");
        System.out.println("| Action Callback   | NO callback support               | Supports optional 'barrierAction' |");
        System.out.println("| Typical Use Case  | Application / Service startup,    | Iterative multi-phase algorithms, |");
        System.out.println("|                   | waiting for async init tasks      | parallel simulation matrix steps  |");
        System.out.println("+-------------------+-----------------------------------+-----------------------------------+");

        System.out.println("\n==========================================================================");
    }
}