/**
 * Java Core Tutorial - Module 008_005: Thread Safety & Deadlocks
 * Topic 9: Breaking Deadlocks with Timeouts: Timed Lock Acquisition via tryLock()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class BreakingDeadlocksWithTryLockTimeoutDemo {

    private static final Lock LOCK_A = new ReentrantLock();
    private static final Lock LOCK_B = new ReentrantLock();

    public static void safeTransferWithTimeout(String threadName, Lock first, Lock second) {
        while (true) {
            boolean acquiredFirst = false;
            boolean acquiredSecond = false;
            try {
                // Attempt to acquire first lock with 50 ms timeout:
                acquiredFirst = first.tryLock(50, TimeUnit.MILLISECONDS);
                if (acquiredFirst) {
                    System.out.printf("[%s] Acquired first lock. Attempting second lock...%n", threadName);
                    // Attempt to acquire second lock with 50 ms timeout:
                    acquiredSecond = second.tryLock(50, TimeUnit.MILLISECONDS);
                    if (acquiredSecond) {
                        System.out.printf(">>> [%s] ACQUIRED BOTH LOCKS! Transferring funds safely...%n", threadName);
                        Thread.sleep(100); // Simulate transfer
                        break; // Success! Exit retry loop
                    }
                }
            } catch (InterruptedException ignored) {
            } finally {
                // If we got second lock, release it:
                if (acquiredSecond) second.unlock();
                // If we got first lock but couldn't get second, RELEASE FIRST TO PREVENT DEADLOCK!
                if (acquiredFirst) {
                    first.unlock();
                    System.out.printf("[%s] Contention detected! Voluntarily backed off and released first lock.%n", threadName);
                }
            }

            // Random backoff before retrying to prevent livelock synchronization:
            try { Thread.sleep((long) (Math.random() * 50)); } catch (InterruptedException ignored) {}
        }
    }

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: BREAKING DEADLOCKS WITH tryLock(timeout) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // Thread 1: Wants Lock A then Lock B
        Thread t1 = new Thread(() -> safeTransferWithTimeout("Swadeep", LOCK_A, LOCK_B), "Thread-Swadeep");
        // Thread 2: Wants Lock B then Lock A (Inverted Order!)
        Thread t2 = new Thread(() -> safeTransferWithTimeout("Tuhina", LOCK_B, LOCK_A), "Thread-Tuhina");

        t1.start();
        t2.start();

        t1.join();
        t2.join();

        System.out.println("\n>>> BOTH TRANSFERS COMPLETED SAFELY WITHOUT PERMANENT DEADLOCK!");

        System.out.println("\n==========================================================================");
    }
}