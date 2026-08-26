/**
 * Java Core Tutorial - Module 004_004: Try-with-Resources & AutoCloseable
 * Topic 0: The Flaws of Legacy Manual Resource Cleanup in 'finally' Blocks
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class LegacyFinallyFlawsDemo {

    // ANTI-PATTERN: Pre-Java 7 Verbose, Error-Prone Manual Resource Teardown:
    public static void copyFileLegacy(String src, String dest) {
        FileInputStream in = null;
        FileOutputStream out = null;

        try {
            in = new FileInputStream(src);
            out = new FileOutputStream(dest);

            int b;
            while ((b = in.read()) != -1) {
                out.write(b);
            }
            System.out.println("  [LEGACY] File copied successfully.");

        } catch (IOException e) {
            System.out.println("  [LEGACY ERROR] " + e.getMessage());
        } finally {
            // NIGHTMARE BOILERPLATE: Closing resources safely in finally requires nested try-catches!
            if (in != null) {
                try {
                    in.close();
                } catch (IOException e) {
                    // Suppresses original exception if in.close() fails!
                }
            }
            if (out != null) {
                try {
                    out.close();
                } catch (IOException e) {
                    // Suppresses original exception if out.close() fails!
                }
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: FLAWS OF LEGACY 'finally' RESOURCE CLEANUP - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 3 CRITICAL FLAWS OF PRE-JAVA 7 RESOURCE MANAGEMENT:");
        System.out.println("  1. Massive Boilerplate: 20 lines of nested try-catch-finally code to close 2 streams.");
        System.out.println("  2. Exception Masking: If 'in.close()' throws an exception, 'out.close()' is NEVER called, leaking memory!");
        System.out.println("  3. Suppressed Diagnostics: An exception in 'finally' completely wipes out the original exception from 'try'.");

        System.out.println("\n==========================================================================");
    }
}