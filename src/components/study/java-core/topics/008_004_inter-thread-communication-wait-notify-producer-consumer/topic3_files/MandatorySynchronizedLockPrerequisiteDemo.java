/**
 * Java Core Tutorial - Module 008_004: Inter-Thread Communication & Producer-Consumer
 * Topic 3: The Mandatory Lock Prerequisite: Calling wait() and notify() Inside Synchronized
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class MandatorySynchronizedLockPrerequisiteDemo {

    private static final Object COURIER_LOCK = new Object();
    private static boolean packageArrived = false;

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: MANDATORY SYNCHRONIZED LOCK FOR wait()/notify() - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Thread recipientThread = new Thread(() -> {
            // MANDATORY: Must hold COURIER_LOCK monitor before calling wait():
            synchronized (COURIER_LOCK) {
                System.out.println("  [Recipient] Acquired lock. Waiting for package to arrive...");
                while (!packageArrived) {
                    try {
                        // Releases COURIER_LOCK and enters WAITING state:
                        COURIER_LOCK.wait();
                    } catch (InterruptedException e) {
                        System.out.println("  [Recipient] Interrupted!");
                    }
                }
                System.out.println(">>> [Recipient] Woke up! Package received successfully!");
            }
        }, "Recipient-Worker");

        Thread deliveryThread = new Thread(() -> {
            try { Thread.sleep(300); } catch (InterruptedException ignored) {}

            // MANDATORY: Must hold COURIER_LOCK monitor before calling notify():
            synchronized (COURIER_LOCK) {
                System.out.println("\n  [Delivery] Package delivered to Barrackpore! Sending notify signal...");
                packageArrived = true;
                COURIER_LOCK.notify(); // Signals waiting thread
                System.out.println("  [Delivery] notify() dispatched! Releasing lock upon block exit.");
            }
        }, "Delivery-Worker");

        recipientThread.start();
        deliveryThread.start();

        recipientThread.join();
        deliveryThread.join();

        System.out.println("\n>>> WHY JAVA MANDATES LOCK OWNERSHIP FOR wait() AND notify():");
        System.out.println("  - To prevent the DEADLY 'Lost Wakeup' race condition!");
        System.out.println("  - If wait() and notify() could be called without holding the lock, a delivery thread could call notify() AFTER the recipient checked 'packageArrived' but BEFORE calling wait(), causing the recipient to wait forever!");

        System.out.println("\n==========================================================================");
    }
}