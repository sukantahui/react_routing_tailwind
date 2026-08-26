/**
 * Java Core Tutorial - Module 008_008: Explicit Locks & Synchronizers
 * Topic 8: Concurrency Synchronizer 2: CyclicBarrier (Reusable Rendezvous Points)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

import java.util.concurrent.BrokenBarrierException;
import java.util.concurrent.CyclicBarrier;

public class CyclicBarrierRendezvousDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: CyclicBarrier SYNCHRONIZER - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        int studentCount = 3;

        // CyclicBarrier: 3 students must reach the barrier; when all 3 arrive, barrierAction executes:
        CyclicBarrier barrier = new CyclicBarrier(studentCount, () -> {
            System.out.println("\n>>> 🏆 ALL 3 STUDENTS ARRIVED AT RENDEZVOUS! Starting joint GST Workshop!\n");
        });

        for (int i = 1; i <= studentCount; i++) {
            final int studentId = i;
            new Thread(() -> {
                try {
                    // PHASE 1: Travel to Barrackpore Academy
                    System.out.printf("  [Student #%d] Travelling to Barrackpore...%n", studentId);
                    Thread.sleep(studentId * 100);
                    System.out.printf("  [Student #%d] Arrived at Academy gate. Waiting for peers...%n", studentId);

                    // Rendezvous Barrier Point (BLOCKS until all 3 arrive):
                    barrier.await();

                    // PHASE 2: Reusable execution continues together!
                    System.out.printf("  [Student #%d] Attending lecture together!%n", studentId);
                } catch (InterruptedException | BrokenBarrierException ignored) {}
            }, "Student-" + i).start();
        }

        System.out.println("\n==========================================================================");
    }
}