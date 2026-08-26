/**
 * Java Core Tutorial - Module 008_007: ExecutorService, Thread Pools & CompletableFuture
 * Topic 8: Custom ThreadPoolExecutor: The 7 Core Parameters & Rejection Policies
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.Executors;
import java.util.concurrent.RejectedExecutionHandler;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class CustomThreadPoolExecutorDeepDiveDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: CUSTOM ThreadPoolExecutor (THE 7 PARAMETERS) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. CUSTOM BOUNDED PRODUCTION THREAD POOL:
        ThreadPoolExecutor customPool = new ThreadPoolExecutor(
                2,                                   // 1. corePoolSize: Core workers kept alive
                4,                                   // 2. maximumPoolSize: Max workers under peak load
                30L, TimeUnit.SECONDS,               // 3 & 4. keepAliveTime & unit for excess idle threads
                new ArrayBlockingQueue<>(5),         // 5. workQueue: BOUNDED queue holding max 5 tasks
                Executors.defaultThreadFactory(),    // 6. threadFactory: Custom thread namer
                new ThreadPoolExecutor.CallerRunsPolicy() // 7. handler: Backpressure policy!
        );

        System.out.println(">>> THE 7 CORE PARAMETERS OF ThreadPoolExecutor:");
        System.out.println("  1. corePoolSize    : Minimum threads kept alive even when idle.");
        System.out.println("  2. maximumPoolSize : Upper limit of threads created when queue becomes full.");
        System.out.println("  3. keepAliveTime   : Duration that excess threads (beyond core) stay alive idle.");
        System.out.println("  4. unit            : TimeUnit for keepAliveTime.");
        System.out.println("  5. workQueue       : BlockingQueue to hold tasks before execution (ArrayBlockingQueue).");
        System.out.println("  6. threadFactory   : Factory creating new threads (custom descriptive names).");
        System.out.println("  7. handler         : RejectedExecutionHandler when queue is full AND max threads busy.");
        System.out.println();
        System.out.println(">>> THE 4 BUILT-IN REJECTED EXECUTION POLICIES:");
        System.out.println("  - AbortPolicy       : Throws RejectedExecutionException (Default).");
        System.out.println("  - CallerRunsPolicy  : Executes task on the CALLER'S thread (Natural Backpressure!).");
        System.out.println("  - DiscardPolicy     : Silently drops the rejected task.");
        System.out.println("  - DiscardOldestPolicy: Drops the oldest unhandled task in queue and retries submission.");

        customPool.shutdown();

        System.out.println("\n==========================================================================");
    }
}