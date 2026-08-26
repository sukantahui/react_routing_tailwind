/**
 * Java Core Tutorial - Module 005_003: Buffered Streams, BufferedReader & PrintWriter
 * Topic 10: Flushing Buffers: Explicit flush() vs Auto-Flush Behavior (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.io;

import java.io.ByteArrayOutputStream;
import java.io.PrintWriter;

public class FlushingBuffersAutoFlushCapstoneDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: BUFFER FLUSHING & AUTO-FLUSH CAPSTONE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        ByteArrayOutputStream destination = new ByteArrayOutputStream();

        // 1. PrintWriter WITHOUT Auto-Flush (autoFlush = false):
        PrintWriter manualPw = new PrintWriter(destination, false);
        manualPw.println("Line 1: Stored in memory buffer (Not yet sent to OS)");
        System.out.println(">>> 1. Before manual flush() -> Destination Size: " + destination.size() + " bytes");

        manualPw.flush(); // Forces buffer to commit!
        System.out.println("  After manual flush()  -> Destination Size: " + destination.size() + " bytes");

        // 2. PrintWriter WITH Auto-Flush (autoFlush = true):
        destination.reset();
        PrintWriter autoPw = new PrintWriter(destination, true); // autoFlush ENABLED!
        autoPw.println("Line 2: Auto-flushed immediately upon println()!");
        System.out.println("\n>>> 2. With autoFlush=true -> Destination Size: " + destination.size() + " bytes (Instantly committed!)");

        manualPw.close();
        autoPw.close();

        System.out.println("\n>>> 3 RULES OF BUFFER FLUSHING:");
        System.out.println("  1. 'close()' automatically triggers 'flush()' before releasing the resource.");
        System.out.println("  2. 'autoFlush=true' flushes only on 'println()', 'printf()', or 'format()' (NOT on 'print()').");
        System.out.println("  3. For interactive network sockets and real-time consoles, ALWAYS enable auto-flush!");

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 005_003 BUFFERED STREAMS & PRINTWRITER 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}