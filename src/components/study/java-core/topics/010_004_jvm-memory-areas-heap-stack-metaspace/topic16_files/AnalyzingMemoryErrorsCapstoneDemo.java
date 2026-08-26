/**
 * Java Core Tutorial - Module 010_004: JVM Memory Model: Heap, Stack, Metaspace & Runtime Areas
 * Topic 16: Analyzing JVM Memory Errors - Diagnostic Capstone
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.memory;

public class AnalyzingMemoryErrorsCapstoneDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 16: ANALYZING JVM MEMORY ERRORS - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 3 MAJOR JVM MEMORY ERRORS & ROOT CAUSE MATRIX:");
        System.out.println("  -----------------------------------------------------------------------------------------------");
        System.out.println("  MEMORY ERROR                    AFFECTED AREA     ROOT CAUSE                    COMMON FIX");
        System.out.println("  -----------------------------------------------------------------------------------------------");
        System.out.println("  OutOfMemoryError: Java heap     Heap Area         Memory Leak / Huge dataset    Analyze Heap Dump (.hprof), increase -Xmx");
        System.out.println("  OutOfMemoryError: Metaspace     Metaspace         ClassLoader leak / CGLIB      Set -XX:MaxMetaspaceSize, fix static refs");
        System.out.println("  StackOverflowError              JVM Thread Stack  Infinite recursion / Deep calls Fix recursion base case, tune -Xss");
        System.out.println("  OutOfMemoryError: GC overhead   Heap Area         98% time in GC, <2% reclaimed Optimize allocation, eliminate leaks");
        System.out.println("  OutOfMemoryError: unable native OS Native RAM     Exhausted OS thread limits    Tune OS ulimit -u, use Virtual Threads (Java 21)");
        System.out.println("  -----------------------------------------------------------------------------------------------\n");

        // 1. Simulating Controlled Recursion Depth vs Stack:
        System.out.println(">>> 1. TESTING RECURSION DEPTH ON STACK (StackOverflow Safety Check):");
        int safeDepth = calculateSafeRecursionDepth(100);
        System.out.println("  - Successfully executed recursion of depth 100 on thread stack! Result: " + safeDepth);

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 010_004 COMPLETE: JVM MEMORY MODEL & RUNTIME AREAS MASTERED!");
        System.out.println("==========================================================================");
    }

    static int calculateSafeRecursionDepth(int n) {
        if (n <= 0) return 0;
        return 1 + calculateSafeRecursionDepth(n - 1);
    }
}
