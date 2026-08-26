/**
 * Java Core Tutorial - Module 008_002: Thread Control & Daemon Threads
 * Topic 9: JVM Process Termination: Abrupt Shutdown of Running Daemon Threads
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class JvmTerminationAndDaemonShutdownDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: JVM TERMINATION & DAEMON SHUTDOWN - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Thread infiniteDaemon = new Thread(() -> {
            try {
                int tick = 0;
                while (true) {
                    tick++;
                    System.out.printf("  [Daemon Service] Background heartbeat tick #%d...%n", tick);
                    Thread.sleep(200);
                }
            } catch (InterruptedException ignored) {
            } finally {
                // CRITICAL WARNING: In real JVM exit, finally blocks in Daemons may NOT execute!
                System.out.println("  [Daemon Service] Finally block executed!");
            }
        }, "Heartbeat-Daemon");

        // MARKING THREAD AS DAEMON:
        infiniteDaemon.setDaemon(true);
        infiniteDaemon.start();

        System.out.println(">>> 1. Main (User Thread) running a short 600 ms workload...");
        Thread.sleep(600); // Main thread stays alive for 600 ms

        System.out.println("\n>>> 2. Main (The ONLY active User Thread) is now exiting!");
        System.out.println("  As soon as main exits, the JVM terminates immediately, killing the Heartbeat-Daemon mid-flight!");

        System.out.println("\n==========================================================================");
    }
}