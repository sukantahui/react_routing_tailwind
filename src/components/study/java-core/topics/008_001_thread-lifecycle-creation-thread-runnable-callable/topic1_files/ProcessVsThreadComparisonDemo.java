/**
 * Java Core Tutorial - Module 008_001: Thread Fundamentals, Lifecycle & Creation
 * Topic 1: Process vs Thread: Memory Address Isolation vs Shared Memory Concurrency
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class ProcessVsThreadComparisonDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: PROCESS vs THREAD COMPARISON - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        long pid = ProcessHandle.current().pid();
        System.out.println(">>> 1. Current Running OS Process ID (PID): " + pid);
        System.out.println("  Active JVM Threads in this Process   : " + Thread.activeCount());

        System.out.println("\n>>> 2. PROCESS vs THREAD ARCHITECTURAL COMPARISON:");
        System.out.println("+--------------------+-----------------------------------+-----------------------------------+");
        System.out.println("| Feature            | Process (Heavyweight)             | Thread (Lightweight Sub-Process)  |");
        System.out.println("+--------------------+-----------------------------------+-----------------------------------+");
        System.out.println("| Memory Space       | Isolated virtual address space    | Shares JVM Heap & Metaspace       |");
        System.out.println("| Creation Cost      | High (OS forks address space)     | Low (~1 MB thread stack allocation|");
        System.out.println("| Context Switch     | Slow (Flushes CPU TLB & registers)| Fast (Swaps registers and stack)  |");
        System.out.println("| Communication      | IPC (Pipes, Sockets, Shared Mem)  | Direct shared object references   |");
        System.out.println("| Crash Impact       | Isolated (Does not crash other OS)| Crashes entire process if fatal   |");
        System.out.println("+--------------------+-----------------------------------+-----------------------------------+");

        System.out.println("\n>>> SUMMARY: A Process is an execution container; a Thread is the execution unit inside it!");

        System.out.println("\n==========================================================================");
    }
}