/**
 * Java Core Tutorial - Module 010_005: Garbage Collection Algorithms, Collectors & GC Tuning
 * Topic 16: Unified GC Logging in Java 9+ (-Xlog Framework)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.gc;

public class UnifiedGcLoggingDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 16: UNIFIED GC LOGGING (JAVA 9+) - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> UNIFIED JVM LOGGING SYNTAX (JEP 158 / JEP 271):");
        System.out.println("  Syntax Pattern: -Xlog:[selectors]:[output]:[decorators]:[output-options]\n");

        System.out.println(">>> PRODUCTION-GRADE GC LOGGING COMMAND:");
        System.out.println("  -Xlog:gc*,gc+phases=debug:file=/var/log/app/gc.log:time,uptime,pid:filecount=5,filesize=100m\n");

        System.out.println(">>> BREAKDOWN OF THE LOGGING COMMAND:");
        System.out.println("  1. Selectors      : 'gc*' (all GC events) + 'gc+phases=debug' (detailed phase timing).");
        System.out.println("  2. Output Target  : 'file=/var/log/app/gc.log' (writes to file instead of stdout).");
        System.out.println("  3. Decorators     : 'time,uptime,pid' (ISO-8601 timestamp, uptime seconds, process ID).");
        System.out.println("  4. Log Rotation   : 'filecount=5,filesize=100m' (retains max 5 files of 100MB each = 500MB max!).");

        System.out.println("\n==========================================================================");
    }
}
