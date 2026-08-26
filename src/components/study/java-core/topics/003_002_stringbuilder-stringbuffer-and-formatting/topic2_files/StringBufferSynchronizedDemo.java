/**
 * Java Core Tutorial - Module 003_002: StringBuilder, StringBuffer & String Formatting
 * Topic 2: java.lang.StringBuffer: Legacy Synchronized Thread-Safe String Builder
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.stringbuilder;

public class StringBufferSynchronizedDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: java.lang.StringBuffer (SYNCHRONIZED) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // StringBuffer methods are 'synchronized' (thread-safe):
        StringBuffer buffer = new StringBuffer();

        // Spawning 2 concurrent worker threads writing to the same buffer:
        Thread t1 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) buffer.append("A");
        });

        Thread t2 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) buffer.append("B");
        });

        t1.start();
        t2.start();
        t1.join();
        t2.join();

        System.out.println(">>> Multi-Threaded Concurrent Append Test:");
        System.out.println("  Expected Length : 2000 chars");
        System.out.println("  Actual Length   : " + buffer.length() + " chars (100% Thread-Safe & Atomic!)");

        System.out.println("\n>>> COST OF SYNCHRONIZATION: Every append() acquires an object monitor lock,");
        System.out.println("    making StringBuffer ~2x-3x slower than StringBuilder in single-threaded code.");

        System.out.println("\n==========================================================================");
    }
}