/**
 * Java Core Tutorial - Module 008_002: Thread Control & Daemon Threads
 * Topic 0: Controlling Thread Timing: Thread.sleep(millis) & The No-Lock-Release Rule
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class ThreadSleepTimingAndLockRuleDemo {

    private static final Object VAULT_LOCK = new Object();

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: Thread.sleep(millis) & LOCK RETENTION RULE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Thread sleepingWorker = new Thread(() -> {
            synchronized (VAULT_LOCK) {
                System.out.println(">>> 1. [Sleeping Worker] Entered synchronized block & acquired VAULT_LOCK.");
                try {
                    System.out.println("  [Sleeping Worker] Going to sleep for 2 seconds (Thread.sleep(2000))...");
                    // Calling Thread.sleep() transitions thread to TIMED_WAITING:
                    Thread.sleep(2000); // CRITICAL: Does NOT release VAULT_LOCK!
                    System.out.println("  [Sleeping Worker] Woke up! Releasing VAULT_LOCK now.");
                } catch (InterruptedException e) {
                    System.out.println("  [Sleeping Worker] Sleep interrupted!");
                }
            }
        }, "Sleeping-Worker");

        Thread waitingWorker = new Thread(() -> {
            System.out.println(">>> 2. [Waiting Worker] Attempting to acquire VAULT_LOCK...");
            synchronized (VAULT_LOCK) {
                System.out.println("  [Waiting Worker] FINALLY acquired VAULT_LOCK after sleeper woke up!");
            }
        }, "Waiting-Worker");

        sleepingWorker.start();
        Thread.sleep(100); // Ensure sleepingWorker gets lock first
        waitingWorker.start();

        sleepingWorker.join();
        waitingWorker.join();

        System.out.println("\n>>> THE GOLDEN RULE OF Thread.sleep(millis):");
        System.out.println("  1. Pauses Current Thread: Moves the calling thread from RUNNABLE to TIMED_WAITING.");
        System.out.println("  2. DOES NOT RELEASE LOCKS: If the thread holds an intrinsic monitor lock ('synchronized') or explicit lock, it HOLDS ONTO THE LOCK while sleeping!");
        System.out.println("  3. Contrast with wait(): 'Object.wait()' RELEASES the monitor lock; 'Thread.sleep()' KEEPS the monitor lock!");

        System.out.println("\n==========================================================================");
    }
}