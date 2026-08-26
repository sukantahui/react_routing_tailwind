/**
 * Java Core Tutorial - Module 004_004: Try-with-Resources & AutoCloseable
 * Topic 6: Managing Multiple Resources in a Single Statement: Semicolon Syntax
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

public class MultipleResourcesSemicolonSyntaxDemo {

    public static void processDataTransformation(byte[] rawData) {
        System.out.println("  [PIPELINE START] Opening multiple stream resources...");

        // Separating multiple resource declarations with semicolons ';' (Trailing semicolon is optional):
        try (
            ByteArrayInputStream inStream = new ByteArrayInputStream(rawData);
            ByteArrayOutputStream outStream = new ByteArrayOutputStream();
        ) {
            int byteVal;
            while ((byteVal = inStream.read()) != -1) {
                outStream.write(Character.toUpperCase(byteVal)); // Transform to uppercase
            }

            System.out.println("  [TRANSFORMED DATA] " + outStream.toString());
            System.out.println("  [STATUS] Both inStream and outStream will now close automatically.");

        } catch (IOException e) {
            System.out.println("  [ERROR] " + e.getMessage());
        }

        System.out.println("  [PIPELINE COMPLETE] Resources released cleanly.\n");
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: MULTIPLE RESOURCES SEMICOLON SYNTAX - BARRACKPORE");
        System.out.println("==========================================================================\n");

        byte[] input = "barrackpore academy java tutorial".getBytes();
        processDataTransformation(input);

        System.out.println(">>> SYNTAX RULES FOR MULTIPLE RESOURCES:");
        System.out.println("  1. Each resource declaration must be separated by a semicolon ';'.");
        System.out.println("  2. The trailing semicolon after the last resource is optional in Java 7+.");
        System.out.println("  3. All declared resources must implement AutoCloseable.");

        System.out.println("\n==========================================================================");
    }
}