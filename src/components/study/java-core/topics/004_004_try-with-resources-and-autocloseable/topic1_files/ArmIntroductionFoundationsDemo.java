/**
 * Java Core Tutorial - Module 004_004: Try-with-Resources & AutoCloseable
 * Topic 1: Introduction to Automatic Resource Management (ARM) / Try-with-Resources
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

public class ArmIntroductionFoundationsDemo {

    public static void processStreamArm(byte[] data) {
        System.out.println("  [ARM INITIATED] Entering Try-with-Resources block...");

        // Try-with-Resources (ARM): Resource is declared in parentheses after 'try':
        try (InputStream in = new ByteArrayInputStream(data)) {
            int firstByte = in.read();
            System.out.println("  [READ DATA] First byte value: " + firstByte);
            // Resource 'in' is AUTOMATICALLY CLOSED here by the JVM as execution exits!
        } catch (Exception e) {
            System.out.println("  [ERROR] " + e.getMessage());
        }

        System.out.println("  [ARM FINISHED] Stream closed safely with zero manual code.\n");
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: AUTOMATIC RESOURCE MANAGEMENT (ARM) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        byte[] sampleBytes = { 65, 66, 67, 68 }; // 'A', 'B', 'C', 'D'
        processStreamArm(sampleBytes);

        System.out.println(">>> THE 3 PILLARS OF TRY-WITH-RESOURCES:");
        System.out.println("  1. Zero Boilerplate: No null checks, no explicit in.close(), no finally block needed.");
        System.out.println("  2. Guaranteed Closing: Executes close() whether the block finishes normally or throws an exception.");
        System.out.println("  3. AutoCloseable Invariant: Any class implementing 'java.lang.AutoCloseable' works seamlessly.");

        System.out.println("\n==========================================================================");
    }
}