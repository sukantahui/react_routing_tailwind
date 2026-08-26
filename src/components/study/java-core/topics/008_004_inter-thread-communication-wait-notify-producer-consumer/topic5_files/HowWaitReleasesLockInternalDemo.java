/**
 * Java Core Tutorial - Module 008_004: Inter-Thread Communication & Producer-Consumer
 * Topic 5: How wait() Operates: Lock Release, Wait Set Registration & State Lifecycle
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class HowWaitReleasesLockInternalDemo {

    private static final Object GATE_LOCK = new Object();

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: HOW wait() RELEASES LOCKS & USES WAIT SET - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Thread workerA = new Thread(() -> {
            synchronized (GATE_LOCK) {
                System.out.println("  [Worker A] 1. Acquired GATE_LOCK.");
                System.out.println("  [Worker A] 2. Calling GATE_LOCK.wait()...");
                try {
                    // ATOMIC ACTION: Releases GATE_LOCK and enters GATE_LOCK's Wait Set:
                    GATE_LOCK.wait();
                } catch (InterruptedException ignored) {}

                System.out.println("  [Worker A] 5. RE-ACQUIRED GATE_LOCK and resumed execution!");
            }
        }, "Worker-A");

        Thread workerB = new Thread(() -> {
            // Worker B can ONLY enter here because Worker A released GATE_LOCK in wait()!
            synchronized (GATE_LOCK) {
                System.out.println(">>> [Worker B] 3. Successfully acquired GATE_LOCK (Proof that wait() released it!)");
                System.out.println(">>> [Worker B] 4. Calling GATE_LOCK.notify() and releasing lock...");
                GATE_LOCK.notify();
            }
        }, "Worker-B");

        workerA.start();
        Thread.sleep(100); // Ensure Worker A enters wait()
        workerB.start();

        workerA.join();
        workerB.join();

        System.out.println("\n>>> THE 4-STEP LIFECYCLE OF wait():");
        System.out.println("  1. Lock Release       : Atomically releases the object's intrinsic monitor lock.");
        System.out.println("  2. Wait Set Migration : Thread is placed in the object's internal 'Wait Set' queue.");
        System.out.println("  3. CPU Descheduling   : Thread transitions to 'WAITING' (0% CPU consumption).");
        System.out.println("  4. Re-Acquisition     : Upon being notified, thread moves to 'Entry Set' (BLOCKED) to re-acquire the lock before returning from wait()!");

        System.out.println("\n==========================================================================");
    }
}