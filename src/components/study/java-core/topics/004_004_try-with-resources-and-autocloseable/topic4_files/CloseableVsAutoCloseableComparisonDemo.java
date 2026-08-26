/**
 * Java Core Tutorial - Module 004_004: Try-with-Resources & AutoCloseable
 * Topic 4: The java.io.Closeable Interface: The Legacy I/O Sub-Interface of AutoCloseable
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

import java.io.Closeable;
import java.io.IOException;

public class CloseableVsAutoCloseableComparisonDemo {

    // Implementing java.io.Closeable (Restricted strictly to IOException):
    public static class AcademyStreamPipe implements Closeable {
        @Override
        public void close() throws IOException {
            System.out.println("  [CLOSEABLE] AcademyStreamPipe closed via IOException contract.");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: java.io.Closeable vs AutoCloseable - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println("+--------------------------+-------------------------------------+-------------------------------------+");
        System.out.println("| Feature                  | java.lang.AutoCloseable (Java 7+)   | java.io.Closeable (Java 5+)         |");
        System.out.println("+--------------------------+-------------------------------------+-------------------------------------+");
        System.out.println("| Package                  | java.lang                           | java.io                             |");
        System.out.println("| close() Exception        | throws Exception                    | throws IOException                  |");
        System.out.println("| Hierarchy Relationship   | Super-interface of Closeable        | Sub-interface of AutoCloseable      |");
        System.out.println("| Primary Target           | Any generic resource (DB, Lock, etc)| Strictly I/O byte/character streams |");
        System.out.println("| Idempotency Mandate      | Recommended                         | REQUIRED by specification           |");
        System.out.println("+--------------------------+-------------------------------------+-------------------------------------+");

        System.out.println("\n>>> Executing Closeable in Try-with-Resources:");
        try (AcademyStreamPipe pipe = new AcademyStreamPipe()) {
            System.out.println("  Transmitting bytes across Barrackpore network pipe...");
        } catch (IOException e) {
            System.out.println("  [ERROR] " + e.getMessage());
        }

        System.out.println("\n==========================================================================");
    }
}