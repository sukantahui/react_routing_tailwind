/**
 * Java Core Tutorial - Module 005_003: Buffered Streams, BufferedReader & PrintWriter
 * Topic 2: BufferedInputStream & BufferedOutputStream: Decorating Byte Streams
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.io;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

public class BufferedByteStreamsDecoratorDemo {

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: BufferedInputStream & BufferedOutputStream - BARRACKPORE");
        System.out.println("==========================================================================\n");

        ByteArrayOutputStream destination = new ByteArrayOutputStream();

        // 1. BufferedOutputStream (Decorator Pattern: Wraps raw byte stream):
        System.out.println(">>> 1. Writing binary data through BufferedOutputStream:");
        try (BufferedOutputStream bos = new BufferedOutputStream(destination)) {
            byte[] binaryHeader = { (byte) 0xCA, (byte) 0xFE, (byte) 0xBA, (byte) 0xBE };
            bos.write(binaryHeader);
            bos.write("Barrackpore AccoTax Ledger Payload".getBytes());
            bos.flush(); // Forces internal 8KB buffer to empty into destination
        }

        byte[] serializedData = destination.toByteArray();
        System.out.println("  Wrote " + serializedData.length + " buffered bytes.");

        // 2. BufferedInputStream (Decorator Pattern: Wraps raw input stream):
        System.out.println("\n>>> 2. Reading through BufferedInputStream with mark() and reset():");
        try (BufferedInputStream bis = new BufferedInputStream(new ByteArrayInputStream(serializedData))) {
            System.out.println("  bis.markSupported() : " + bis.markSupported()); // Returns true!

            // Read magic header (4 bytes):
            byte[] magic = new byte[4];
            bis.read(magic);
            System.out.printf("  Magic Header Read   : 0x%02X 0x%02X 0x%02X 0x%02X%n", magic[0], magic[1], magic[2], magic[3]);

            // Mark position:
            bis.mark(100);
            System.out.println("  [MARKED STREAM POSITION]");

            // Read preview bytes:
            byte[] preview = new byte[11];
            bis.read(preview);
            System.out.println("  Preview Read        : "" + new String(preview) + """);

            // Reset back to marked position:
            bis.reset();
            System.out.println("  [RESET STREAM POSITION]");

            byte[] reread = new byte[11];
            bis.read(reread);
            System.out.println("  Re-read After Reset : "" + new String(reread) + "" (Identical replay!)");
        }

        System.out.println("\n==========================================================================");
    }
}