/**
 * Java Core Tutorial - Module 009_007: Parallel Streams & Performance Considerations
 * Topic 10: Blocking I/O in Parallel Streams - CommonPool Starvation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.parallel;

import java.util.List;
import java.util.concurrent.ForkJoinPool;

public class BlockingIoParallelStreamsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: BLOCKING I/O IN PARALLEL STREAMS - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        List<String> studentWebsites = List.of(
            "student1.coderaccotax.in", "student2.coderaccotax.in", 
            "student3.coderaccotax.in", "student4.coderaccotax.in"
        );

        System.out.println(">>> THE DANGER OF BLOCKING THE GLOBAL COMMONPOOL:");
        System.out.println("  - ForkJoinPool.commonPool() has only (CPUs - 1) threads (e.g. 7 threads on an 8-core CPU).");
        System.out.println("  - If 7 parallel stream tasks block on slow HTTP calls (e.g. 5 seconds each), the entire pool is SATURATED.");
        System.out.println("  - Any other parallel stream or async task in the application will BE COMPLETELY BLOCKED!\n");

        System.out.println(">>> BEST PRACTICE ALTERNATIVES FOR I/O:");
        System.out.println("  1. Use Java 21 Virtual Threads: Executors.newVirtualThreadPerTaskExecutor()");
        System.out.println("  2. Use dedicated custom ThreadPoolExecutor with sufficient I/O threads.");
        System.out.println("  3. Use CompletableFuture with a custom I/O executor.");
        System.out.println("==========================================================================");
    }
}
