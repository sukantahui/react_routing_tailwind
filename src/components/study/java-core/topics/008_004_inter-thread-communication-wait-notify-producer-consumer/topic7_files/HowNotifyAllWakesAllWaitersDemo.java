/**
 * Java Core Tutorial - Module 008_004: Inter-Thread Communication & Producer-Consumer
 * Topic 7: How notifyAll() Operates: Broadcast Wakeup & Eliminating Missed Signals
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class HowNotifyAllWakesAllWaitersDemo {

    private static final Object CLASSROOM_BELL = new Object();

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: HOW notifyAll() WAKES ALL WAITING THREADS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Runnable studentTask = () -> {
            synchronized (CLASSROOM_BELL) {
                String name = Thread.currentThread().getName();
                System.out.printf("  [%s] Waiting for morning assembly bell in classroom...%n", name);
                try {
                    CLASSROOM_BELL.wait();
                    System.out.printf(">>> [%s] WOKEN UP by bell broadcast! Entering assembly hall.%n", name);
                } catch (InterruptedException ignored) {}
            }
        };

        Thread s1 = new Thread(studentTask, "Student-Swadeep");
        Thread s2 = new Thread(studentTask, "Student-Tuhina");
        Thread s3 = new Thread(studentTask, "Student-Abhronila");

        s1.start();
        s2.start();
        s3.start();

        Thread.sleep(200); // Ensure all 3 students are registered in Wait Set

        // School Bell Rings (Broadcasting notifyAll):
        Thread bellRinger = new Thread(() -> {
            synchronized (CLASSROOM_BELL) {
                System.out.println("\n>>> [Principal Sukanta Hui] Ringing Assembly Bell via notifyAll()...");
                CLASSROOM_BELL.notifyAll(); // Wakes up EVERY thread in the Wait Set!
                System.out.println("  [Principal] notifyAll() broadcast sent! All students transitioning to Entry Set.");
            }
        }, "Bell-Ringer");

        bellRinger.start();
        bellRinger.join();

        s1.join();
        s2.join();
        s3.join();

        System.out.println("\n>>> WHY notifyAll() IS HIGHLY RECOMMENDED OVER notify():");
        System.out.println("  1. Broadcast Guarantee : All waiting threads are moved from the Wait Set to the Entry Set.");
        System.out.println("  2. Sequential Execution: Each woken thread competes for the lock one by one, verifies its condition, and proceeds safely.");
        System.out.println("  3. Zero Lost Signals   : Completely prevents deadlocks caused by waking up the wrong thread in heterogeneous waiter queues.");

        System.out.println("\n==========================================================================");
    }
}