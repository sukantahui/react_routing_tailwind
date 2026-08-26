/**
 * Java Core Tutorial - Module 005_004: Modern Java NIO.2
 * Topic 11: Binary File Operations: Files.readAllBytes() & Files.write(path, byte[])
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.nio;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class BinaryFilesReadAllBytesDemo {

    public static void main(String[] args) throws IOException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: Files.readAllBytes & write(byte[]) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Path binaryFile = Files.createTempFile("binary_payload_", ".dat");

        // 1. Simulating binary byte payload (e.g. Image header or PDF byte stream):
        byte[] originalPayload = new byte[] { (byte) 0x89, 'P', 'N', 'G', 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x01 };

        // Write raw binary bytes in one line:
        Files.write(binaryFile, originalPayload);
        System.out.println(">>> 1. Files.write(path, byte[]) -> Wrote " + originalPayload.length + " raw bytes.");

        // Read raw binary bytes in one line:
        byte[] readBack = Files.readAllBytes(binaryFile);
        System.out.println(">>> 2. Files.readAllBytes(path)  -> Read back " + readBack.length + " bytes.");

        System.out.print("  Byte Hex Dump: ");
        for (byte b : readBack) {
            System.out.printf("0x%02X ", b);
        }
        System.out.println();

        // Cleanup:
        Files.deleteIfExists(binaryFile);

        System.out.println("\n==========================================================================");
    }
}