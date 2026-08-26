/**
 * Java Core Tutorial - Module 005_003: Buffered Streams, BufferedReader & PrintWriter
 * Topic 7: Why PrintWriter Does NOT Throw IOException: The checkError() Protocol
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.io;

import java.io.PrintWriter;
import java.io.StringWriter;

public class PrintWriterCheckErrorProtocolDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: PrintWriter checkError() PROTOCOL - BARRACKPORE");
        System.out.println("==========================================================================\n");

        StringWriter memorySink = new StringWriter();

        // Notice that PrintWriter methods DO NOT declare 'throws IOException'!
        PrintWriter pw = new PrintWriter(memorySink);

        pw.println("Transaction 1: Sukanta Hui Fee Deposit ₹10,000");
        pw.println("Transaction 2: Swadeep Paul Admission ₹8,500");

        // How to check for I/O errors when no exception is thrown:
        boolean errorOccurred = pw.checkError(); // Flushes stream AND returns boolean error state!

        System.out.println(">>> 1. Checking Error State with pw.checkError():");
        System.out.println("  pw.checkError() : " + errorOccurred + " (Stream healthy!)");

        pw.close();

        // Attempting to write after close does NOT throw exception, but sets error state:
        pw.println("Transaction 3: Invalid post-close write!");
        boolean errorAfterClose = pw.checkError();

        System.out.println("\n>>> 2. Writing After Close:");
        System.out.println("  pw.checkError() after close : " + errorAfterClose + " (Error flag set to true!)");

        System.out.println("\n>>> DESIGN PHILOSOPHY OF PrintWriter:");
        System.out.println("  - Swallows raw IOExceptions to make printing code clean and concise without 50 try-catch blocks.");
        System.out.println("  - Sets an internal boolean error flag.");
        System.out.println("  - Programmers verify I/O success using 'pw.checkError()'.");

        System.out.println("\n==========================================================================");
    }
}