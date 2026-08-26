/**
 * Java Core Tutorial - Module 008_001: Thread Fundamentals, Lifecycle & Creation
 * Topic 5: Thread Lifecycle States: BLOCKED (Monitor Lock) vs WAITING (Indefinite)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class BlockedAndWaitingStatesDemo {

    private static final Object LOCK = new Object();

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: BLOCKED vs WAITING THREAD STATES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. DEMONSTRATING BLOCKED STATE (Waiting to acquire 'synchronized' lock):
        Thread lockHolder = new Thread(() -> {
            synchronized (LOCK) {
                try {
                    Thread.sleep(5000); // Holds lock for 5 seconds
                } catch (InterruptedException ignored) {}
            }
        }, "Lock-Holder");

        Thread blockedWorker = new Thread(() -> {
            synchronized (LOCK) { // Will be blocked waiting for lockHolder to release!
                System.out.println("  [Blocked Worker] Acquired lock finally!");
            }
        }, "Blocked-Worker");

        lockHolder.start();
        Thread.sleep(100); // Ensure lockHolder has acquired LOCK
        blockedWorker.start();
        Thread.sleep(100); // Ensure blockedWorker attempts to acquire LOCK

        System.out.println(">>> 1. BLOCKED State Inspection:");
        System.out.println("  blockedWorker.getState() : " + blockedWorker.getState() + " (Waiting for synchronized monitor lock!)");

        // 2. DEMONSTRATING WAITING STATE (Waiting indefinitely for notify/join):
        Thread waitingWorker = new Thread(() -> {
            synchronized (LOCK) {
                try {
                    LOCK.wait(); // Releases lock and enters WAITING state indefinitely!
                } catch (InterruptedException ignored) {}
            }
        }, "Waiting-Worker");

        waitingWorker.start();
        Thread.sleep(100);

        System.out.println("\n>>> 2. WAITING State Inspection:");
        System.out.println("  waitingWorker.getState() : " + waitingWorker.getState() + " (Waiting indefinitely via Object.wait())");

        System.out.println("\n>>> BLOCKED vs WAITING DISTINCTION:");
        System.out.println("  - BLOCKED : Waiting exclusively to enter a 'synchronized' block/method or re-enter after wait().");
        System.out.println("  - WAITING : Waiting indefinitely due to 'Object.wait()', 'Thread.join()', or 'LockSupport.park()'.");

        System.out.println("\n==========================================================================");
    }
}