/**
 * Java Core Tutorial - Module 008_003: Thread Synchronization & Locks
 * Topic 3: Java's Intrinsic Lock (Monitor Lock) & Object Header Mark Word
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.multithreading;

public class IntrinsicMonitorLockArchitectureDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: INTRINSIC MONITOR LOCK ARCHITECTURE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Object anyJavaObject = new Object();

        System.out.println(">>> 1. EVERY JAVA OBJECT HAS AN INTRINSIC MONITOR:");
        System.out.println("  - In Java, ANY object (e.g. 'new Object()', 'new Student()', 'new int[10]') possesses an internal Monitor Lock!");
        System.out.println("  - Where does the lock live? Inside the 8-byte 'Mark Word' of the Object Header!");
        System.out.println();
        System.out.println(">>> 2. HOW JVM MARK WORD ENCODES INTRINSIC LOCKS (HotSpot JVM):");
        System.out.println("  - Biased Lock   (01): Optimized for single-thread execution with ZERO CAS/locking overhead.");
        System.out.println("  - Lightweight   (00): Acquired via fast CPU CAS pointer swap into the thread stack frame.");
        System.out.println("  - Heavyweight   (10): Inflated into a full OS Mutex with wait/blocked OS thread queues.");
        System.out.println();
        System.out.println(">>> 3. SYNCHRONIZATION BYTECODE INSTRUCTION PAIR:");
        System.out.println("  - 'monitorenter': Emitted by javac at the beginning of a synchronized block (acquires monitor).");
        System.out.println("  - 'monitorexit' : Emitted by javac at every exit path (including exception handlers) to guarantee lock release!");

        System.out.println("\n==========================================================================");
    }
}