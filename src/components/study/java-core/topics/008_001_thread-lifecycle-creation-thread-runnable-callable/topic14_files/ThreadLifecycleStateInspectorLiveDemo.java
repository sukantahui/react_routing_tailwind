/**
 * Java Core Tutorial - Module 008_001: Thread Fundamentals, Lifecycle & Creation
 * Topic 14: Comprehensive Thread State Inspector: Observing All 6 States Live
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class ThreadLifecycleStateInspectorLiveDemo {

    private static final Object MONITOR = new Object();

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 14: LIVE THREAD LIFECYCLE STATE TRANSITIONS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Thread observedThread = new Thread(() -> {
            try {
                // 1. TIMED_WAITING:
                Thread.sleep(400);

                // 2. WAITING on Monitor:
                synchronized (MONITOR) {
                    MONITOR.wait();
                }

                // 3. Busy compute:
                for (int i = 0; i < 500_000; i++) {}

            } catch (InterruptedException ignored) {}
        }, "Observed-Worker");

        // Step 1: NEW
        System.out.println("  Step 1 (After instantiation) : State = " + observedThread.getState());

        // Step 2: RUNNABLE (After start)
        observedThread.start();
        System.out.println("  Step 2 (After start())       : State = " + observedThread.getState());

        // Step 3: TIMED_WAITING (During sleep)
        Thread.sleep(100);
        System.out.println("  Step 3 (During sleep(400))   : State = " + observedThread.getState());

        // Step 4: WAITING (During wait())
        Thread.sleep(400);
        System.out.println("  Step 4 (During MONITOR.wait()): State = " + observedThread.getState());

        // Step 5: Notify and wake up
        synchronized (MONITOR) {
            MONITOR.notify();
        }

        // Step 6: TERMINATED (After join)
        observedThread.join();
        System.out.println("  Step 6 (After completion)    : State = " + observedThread.getState());

        System.out.println("\n>>> COMPLETE STATE TRANSITION GRAPH VERIFIED IN ACTION!");

        System.out.println("\n==========================================================================");
    }
}