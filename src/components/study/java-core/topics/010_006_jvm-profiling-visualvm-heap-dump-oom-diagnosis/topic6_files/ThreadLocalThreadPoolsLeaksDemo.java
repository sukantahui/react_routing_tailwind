/**
 * Java Core Tutorial - Module 010_005: Garbage Collection Algorithms, Collectors & GC Tuning
 * Topic 6: ThreadLocal Leaks in Thread Pools - ThreadLocal.remove() Hygiene
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.profiling;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ThreadLocalThreadPoolsLeaksDemo {

    // ThreadLocal storing per-request user context:
    private static final ThreadLocal<String> USER_SESSION_CONTEXT = new ThreadLocal<>();

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: THREADLOCAL IN THREAD POOLS - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        ExecutorService threadPool = Executors.newFixedThreadPool(2);

        // Submitting web request task with proper ThreadLocal hygiene:
        threadPool.submit(() -> {
            try {
                // 1. Set ThreadLocal for current incoming web request:
                USER_SESSION_CONTEXT.set("USER_SESSION_SWADEEP_PAUL_7749");
                System.out.println("1. [REQUEST START]: Context set for: " + USER_SESSION_CONTEXT.get());

                // Perform business logic...
                System.out.println("2. [PROCESSING]   : Executing Barrackpore fee payment...");

            } finally {
                // 3. MANDATORY PRODUCTION FIX: ALWAYS call remove() in finally block!
                USER_SESSION_CONTEXT.remove();
                System.out.println("3. [REQUEST END]  : ThreadLocal.remove() executed cleanly! (Zero Leak) ✅");
            }
        });

        threadPool.shutdown();
        System.out.println("\n==========================================================================");
    }
}
