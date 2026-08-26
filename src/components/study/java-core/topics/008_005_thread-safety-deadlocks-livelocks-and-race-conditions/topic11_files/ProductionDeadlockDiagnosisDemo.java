/**
 * Java Core Tutorial - Module 008_005: Thread Safety & Deadlocks
 * Topic 11: Diagnosing Production Deadlocks: jcmd, jstack & JVM Diagnostic Tools
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

import java.lang.management.ManagementFactory;
import java.lang.management.ThreadInfo;
import java.lang.management.ThreadMXBean;

public class ProductionDeadlockDiagnosisDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: DIAGNOSING DEADLOCKS IN PRODUCTION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. PRODUCTION CLI COMMANDS TO CAPTURE THREAD DUMPS:");
        System.out.println("  Command A: 'jcmd <PID> Thread.print' (Recommended modern command since Java 8+)");
        System.out.println("  Command B: 'jstack -l <PID>' (Legacy JDK tool; '-l' includes lock info)");
        System.out.println("  Command C: 'kill -3 <PID>' (Linux signal sending dump to standard out)");
        System.out.println();
        System.out.println(">>> 2. PROGRAMMATIC DEADLOCK DETECTION VIA ThreadMXBean:");
        ThreadMXBean threadBean = ManagementFactory.getThreadMXBean();
        long[] deadlockedThreadIds = threadBean.findDeadlockedThreads();

        if (deadlockedThreadIds == null || deadlockedThreadIds.length == 0) {
            System.out.println("  [ThreadMXBean Health Check] ✅ ZERO DEADLOCKS DETECTED in the JVM!");
        } else {
            System.out.printf("  [ThreadMXBean Alert] 🚨 FOUND %d DEADLOCKED THREADS!%n", deadlockedThreadIds.length);
            ThreadInfo[] infos = threadBean.getThreadInfo(deadlockedThreadIds);
            for (ThreadInfo info : infos) {
                System.out.println("    Thread: " + info.getThreadName() + " is BLOCKED on " + info.getLockName() + " held by " + info.getLockOwnerName());
            }
        }

        System.out.println("\n==========================================================================");
    }
}