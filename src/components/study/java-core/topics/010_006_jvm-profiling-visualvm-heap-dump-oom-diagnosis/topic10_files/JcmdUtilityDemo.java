/**
 * Java Core Tutorial - Module 010_006: JVM Profiling, Heap Dumps & Memory Leak Diagnosis
 * Topic 10: The jcmd Utility - Dynamic Diagnostics & Control Commands
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.profiling;

public class JcmdUtilityDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: THE JCMD UTILITY - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> TOP 6 PRODUCTION JCMD COMMANDS:");
        System.out.println("  1. List Available Commands  : jcmd <pid> help");
        System.out.println("  2. Capture Live Thread Dump : jcmd <pid> Thread.print > threads.txt");
        System.out.println("  3. Capture Live Heap Dump   : jcmd <pid> GC.heap_dump /var/dumps/heap.hprof");
        System.out.println("  4. Inspect Active JVM Flags : jcmd <pid> VM.flags -all");
        System.out.println("  5. Inspect Metaspace Details: jcmd <pid> VM.metaspace");
        System.out.println("  6. ClassLoader Statistics   : jcmd <pid> VM.classloader_stats\n");

        System.out.println(">>> ADVANTAGE OVER JMAP / JSTACK:");
        System.out.println("  - 'jcmd' has virtually ZERO performance overhead when querying flags.");
        System.out.println("  - Executed directly inside the running JVM via control thread.");
        System.out.println("==========================================================================");
    }
}
