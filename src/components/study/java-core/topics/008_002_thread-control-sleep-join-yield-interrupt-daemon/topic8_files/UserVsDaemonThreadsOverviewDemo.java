/**
 * Java Core Tutorial - Module 008_002: Thread Control & Daemon Threads
 * Topic 8: User Threads vs Daemon Threads Overview: Foreground vs Background Roles
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class UserVsDaemonThreadsOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: USER THREADS vs DAEMON THREADS OVERVIEW - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Thread mainThread = Thread.currentThread();
        System.out.println(">>> 1. Main Thread Identity:");
        System.out.println("  Name      : " + mainThread.getName());
        System.out.println("  Is Daemon : " + mainThread.isDaemon() + " (Main is a USER thread!)");

        System.out.println("\n>>> 2. USER THREADS vs DAEMON THREADS COMPARISON:");
        System.out.println("+-------------------+-----------------------------------+-----------------------------------+");
        System.out.println("| Feature           | User Thread (Non-Daemon / Default)| Daemon Thread (Service Provider)  |");
        System.out.println("+-------------------+-----------------------------------+-----------------------------------+");
        System.out.println("| Purpose           | Core business logic tasks         | Background auxiliary services     |");
        System.out.println("| JVM Exit Rule     | JVM REMAINS ALIVE as long as any  | JVM KILLS DAEMONS INSTANTLY when  |");
        System.out.println("|                   | single User thread is running!    | all User threads finish!          |");
        System.out.println("| Default Status    | Inherited from parent (User)      | Set explicitly via setDaemon(true)|");
        System.out.println("| Examples          | Main thread, REST API request,    | JVM Garbage Collector, Finalizer, |");
        System.out.println("|                   | Payment processing, PDF generator | Memory monitor, JIT compiler      |");
        System.out.println("+-------------------+-----------------------------------+-----------------------------------+");

        System.out.println("\n==========================================================================");
    }
}