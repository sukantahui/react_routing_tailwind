/**
 * Java Core Tutorial - Module 008_001: Thread Fundamentals, Lifecycle & Creation
 * Topic 3: Thread Lifecycle: The 6 States of java.lang.Thread.State Enum Overview
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class ThreadLifecycleStateEnumOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: java.lang.Thread.State ENUM OVERVIEW - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 6 FORMAL STATES OF A JAVA THREAD (Thread.State):");
        for (Thread.State state : Thread.State.values()) {
            System.out.printf("  State %-15s : ", state.name());
            switch (state) {
                case NEW           -> System.out.println("Thread instantiated ('new Thread()'), but start() not yet called.");
                case RUNNABLE      -> System.out.println("Executing on CPU or waiting in OS ready queue to run.");
                case BLOCKED       -> System.out.println("Waiting to acquire an intrinsic monitor lock (synchronized block).");
                case WAITING       -> System.out.println("Waiting indefinitely for another thread (wait(), join(), LockSupport.park()).");
                case TIMED_WAITING -> System.out.println("Waiting up to a specified timeout (sleep(ms), wait(ms), join(ms)).");
                case TERMINATED    -> System.out.println("Execution completed run() or exited due to uncaught exception.");
            }
        }

        System.out.println("\n>>> HOW TO QUERY THREAD STATE PROGRAMMATICALLY:");
        Thread current = Thread.currentThread();
        System.out.printf("  Current Thread '%s' State: %s%n", current.getName(), current.getState());

        System.out.println("\n==========================================================================");
    }
}