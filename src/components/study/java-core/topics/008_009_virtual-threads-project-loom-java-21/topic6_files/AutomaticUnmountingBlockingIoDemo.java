/**
 * Java Core Tutorial - Module 008_009: Virtual Threads (Java 21+ Project Loom)
 * Topic 6: Automatic Unmounting on Blocking I/O: Seamless OS Thread Preservation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.virtualthreads;

public class AutomaticUnmountingBlockingIoDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: AUTOMATIC UNMOUNTING ON BLOCKING I/O - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> HOW THE JDK REWROTE ALL BLOCKING I/O APIS FOR PROJECT LOOM:");
        System.out.println("  1. 'java.net.Socket', 'ServerSocket', 'HttpClient' (All network I/O)");
        System.out.println("  2. 'java.io.InputStream', 'FileInputStream' (File I/O where supported)");
        System.out.println("  3. 'Thread.sleep()', 'BlockingQueue.take()', 'ReentrantLock.lock()' (Concurrency primitives)");
        System.out.println();
        System.out.println(">>> THE BEHIND-THE-SCENES MAGIC:");
        System.out.println("  - When you call 'socket.read()' inside a Virtual Thread:");
        System.out.println("    1. The JDK checks: 'Is this a virtual thread? YES'.");
        System.out.println("    2. Registers the socket with the OS non-blocking epoll/kqueue event demultiplexer.");
        System.out.println("    3. Calls 'Continuation.yield()' to UNMOUNT the virtual thread from its Carrier Thread.");
        System.out.println("    4. The OS Carrier Thread is 100% FREE to run other tasks while bytes travel over the wire!");
        System.out.println("    5. When the OS receives data packets, the epoll selector wakes up the JVM, and the Virtual Thread is MOUNTED onto an available Carrier Thread (could be a different carrier!) to resume exactly where it left off!");

        System.out.println("\n==========================================================================");
    }
}