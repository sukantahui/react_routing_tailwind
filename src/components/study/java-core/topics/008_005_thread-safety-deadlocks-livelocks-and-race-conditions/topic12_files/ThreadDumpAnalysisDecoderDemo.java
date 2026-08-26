/**
 * Java Core Tutorial - Module 008_005: Thread Safety & Deadlocks
 * Topic 12: Analyzing Thread Dump Stack Traces: Decoding BLOCKED States & Deadlock Blocks
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class ThreadDumpAnalysisDecoderDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: DECODING THREAD DUMP STACK TRACES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> ANATOMY OF A DEADLOCK IN A REAL JVM THREAD DUMP (jstack output):");
        System.out.println();
        System.out.println(""Thread-Swadeep" #12 prio=5 os_prio=0 tid=0x00007f nid=0x1a03 waiting for monitor entry");
        System.out.println("   java.lang.Thread.State: BLOCKED (on object monitor)");
        System.out.println("        at com.coderaccotax.Bank.transfer(Bank.java:45)");
        System.out.println("        - waiting to lock <0x0000000715b1a450> (a com.coderaccotax.Account)");
        System.out.println("        - locked <0x0000000715b1a440> (a com.coderaccotax.Account)");
        System.out.println();
        System.out.println(""Thread-Tuhina" #13 prio=5 os_prio=0 tid=0x00007e nid=0x1a04 waiting for monitor entry");
        System.out.println("   java.lang.Thread.State: BLOCKED (on object monitor)");
        System.out.println("        at com.coderaccotax.Bank.transfer(Bank.java:45)");
        System.out.println("        - waiting to lock <0x0000000715b1a440> (a com.coderaccotax.Account)");
        System.out.println("        - locked <0x0000000715b1a450> (a com.coderaccotax.Account)");
        System.out.println();
        System.out.println("==========================================================================");
        System.out.println("Found 1 deadlock.");
        System.out.println("==========================================================================");

        System.out.println("\n>>> HOW TO READ THE THREAD DUMP:");
        System.out.println("  1. Locate the 'BLOCKED' threads waiting for monitor entry.");
        System.out.println("  2. Match the memory addresses in hex ('0x0000000715b1a450').");
        System.out.println("  3. Notice: Swadeep holds ...a440 waiting for ...a450.");
        System.out.println("  4. Notice: Tuhina holds ...a450 waiting for ...a440.");
        System.out.println("  5. Line 45 in Bank.java is the exact source code culprit!");

        System.out.println("\n==========================================================================");
    }
}