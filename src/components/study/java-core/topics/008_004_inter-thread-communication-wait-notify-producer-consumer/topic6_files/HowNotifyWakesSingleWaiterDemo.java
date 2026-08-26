/**
 * Java Core Tutorial - Module 008_004: Inter-Thread Communication & Producer-Consumer
 * Topic 6: How notify() Operates: Arbitrary Wait-Set Selection & Entry-Set Migration
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class HowNotifyWakesSingleWaiterDemo {

    private static final Object SIGNAL_LOCK = new Object();

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: HOW notify() WAKES A SINGLE ARBITRARY THREAD - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Runnable waiterTask = () -> {
            synchronized (SIGNAL_LOCK) {
                String name = Thread.currentThread().getName();
                System.out.printf("  [%s] Entered Wait Set waiting for signal...%n", name);
                try {
                    SIGNAL_LOCK.wait();
                    System.out.printf(">>> [%s] WOKEN UP BY notify() and successfully re-acquired lock!%n", name);
                } catch (InterruptedException ignored) {}
            }
        };

        Thread t1 = new Thread(waiterTask, "Student-Swadeep");
        Thread t2 = new Thread(waiterTask, "Student-Tuhina");
        Thread t3 = new Thread(waiterTask, "Student-Abhronila");

        t1.start();
        t2.start();
        t3.start();

        Thread.sleep(200); // Ensure all 3 students are in Wait Set

        // Single notifier thread invoking notify():
        Thread notifier = new Thread(() -> {
            synchronized (SIGNAL_LOCK) {
                System.out.println("\n>>> [Notifier] Calling SIGNAL_LOCK.notify() ONCE:");
                SIGNAL_LOCK.notify(); // Wakes up ONLY ONE arbitrary thread!
                System.out.println("  [Notifier] notify() completed. Notice that ONLY ONE student wakes up!");
            }
        }, "Notifier-Thread");

        notifier.start();
        notifier.join();

        Thread.sleep(300);

        System.out.println("\n>>> CRITICAL REALITIES OF notify():");
        System.out.println("  1. Non-Deterministic : The JVM chooses an arbitrary thread from the Wait Set. There is NO FIFO or priority guarantee!");
        System.out.println("  2. Starvation Hazard : The other 2 students remain stuck in the Wait Set forever unless another notify() is issued.");
        System.out.println("  3. Best Practice     : Use 'notifyAll()' in 99% of enterprise applications to prevent deadlocks!");

        // Cleanup: Wake remaining threads before finishing
        synchronized (SIGNAL_LOCK) {
            SIGNAL_LOCK.notifyAll();
        }
        t1.join();
        t2.join();
        t3.join();

        System.out.println("\n==========================================================================");
    }
}