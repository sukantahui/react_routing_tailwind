/**
 * Java Core Tutorial - Module 004_004: Try-with-Resources & AutoCloseable
 * Topic 7: Java 9 Enhancement: Using Pre-Declared 'Effectively Final' Variables in ARM
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

public class Java9EffectivelyFinalArmDemo {

    public static void executeJava9Arm(InputStream existingStream) {
        System.out.println("  [JAVA 9 ARM] Managing external stream parameter directly...");

        // JAVA 9 ENHANCEMENT: Passing an already-instantiated, effectively final variable directly!
        // (In Java 7/8, you were forced to create a redundant variable: 'try (InputStream s = existingStream)')
        try (existingStream) {
            int first = existingStream.read();
            System.out.println("  Read byte value: " + first);
        } catch (Exception e) {
            System.out.println("  [ERROR] " + e.getMessage());
        }

        System.out.println("  [SUCCESS] External stream closed cleanly.\n");
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: JAVA 9 EFFECTIVELY FINAL ARM - BARRACKPORE");
        System.out.println("==========================================================================\n");

        byte[] payload = { 101, 102, 103 };
        InputStream stream = new ByteArrayInputStream(payload); // 'stream' is effectively final (never reassigned)

        System.out.println(">>> Passing pre-declared stream to Java 9 Try-with-Resources:");
        executeJava9Arm(stream);

        System.out.println(">>> THE JAVA 9 IMPROVEMENT:");
        System.out.println("  - Prior to Java 9, try-with-resources required a fresh variable declaration: 'try (Reader r = reader)'.");
        System.out.println("  - Java 9+ allows writing 'try (reader)' directly, provided 'reader' is final or effectively final!");

        System.out.println("\n==========================================================================");
    }
}