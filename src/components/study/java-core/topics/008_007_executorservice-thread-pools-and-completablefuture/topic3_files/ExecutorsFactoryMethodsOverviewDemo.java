/**
 * Java Core Tutorial - Module 008_007: ExecutorService, Thread Pools & CompletableFuture
 * Topic 3: The Executors Factory Methods & Hidden Production OutOfMemory Risks
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class ExecutorsFactoryMethodsOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: Executors FACTORY METHODS & PRODUCTION TRAPS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 4 COMMON CONVENIENCE FACTORY METHODS IN java.util.concurrent.Executors:");
        System.out.println("+----+-------------------------------+-------------------------------+-----------------------------------+");
        System.out.println("| #  | Factory Method                | Internal Work Queue Used      | Hidden Production Failure Risk    |");
        System.out.println("+----+-------------------------------+-------------------------------+-----------------------------------+");
        System.out.println("| 1. | newFixedThreadPool(n)         | Unbounded LinkedBlockingQueue | Queue OOM (Heap Exhaustion)       |");
        System.out.println("| 2. | newCachedThreadPool()         | Zero-Capacity SynchronousQueue| Thread Explosion OOM (Native Stack)|");
        System.out.println("| 3. | newSingleThreadExecutor()     | Unbounded LinkedBlockingQueue | Queue OOM (Heap Exhaustion)       |");
        System.out.println("| 4. | newScheduledThreadPool(n)     | Unbounded DelayedWorkQueue    | Queue OOM (Heap Exhaustion)       |");
        System.out.println("+----+-------------------------------+-------------------------------+-----------------------------------+");
        System.out.println();
        System.out.println(">>> ALIBABA JAVA CODING GUIDELINE & INDUSTRY BEST PRACTICE:");
        System.out.println("  - 'Threads must not be explicitly created via Executors factory methods;");
        System.out.println("     instead, ThreadPoolExecutor MUST be instantiated directly with custom bounded queues!'");

        System.out.println("\n==========================================================================");
    }
}