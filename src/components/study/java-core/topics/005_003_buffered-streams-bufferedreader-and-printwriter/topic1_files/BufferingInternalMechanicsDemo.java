/**
 * Java Core Tutorial - Module 005_003: Buffered Streams, BufferedReader & PrintWriter
 * Topic 1: Buffering Mechanics: Internal 8192 Byte Buffer Array & Custom Sizing
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.io;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;

public class BufferingInternalMechanicsDemo {

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: BUFFERING INTERNAL MECHANICS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        byte[] rawData = "Barrackpore Java Academy: High-Throughput I/O Mastery".getBytes();

        // 1. Default Buffer Size (8192 bytes = 8 KB):
        BufferedInputStream defaultBuf = new BufferedInputStream(new ByteArrayInputStream(rawData));
        System.out.println(">>> 1. Default BufferedInputStream created (Internal 'byte[8192]' buffer allocated).");

        // 2. Custom Buffer Size (e.g. 64 KB = 65536 bytes for massive enterprise log processing):
        int customSize = 64 * 1024; // 64 KB
        BufferedInputStream largeBuf = new BufferedInputStream(new ByteArrayInputStream(rawData), customSize);
        System.out.println(">>> 2. Custom High-Capacity BufferedInputStream created (Internal 'byte[" + customSize + "]' buffer).");

        System.out.println("\n>>> BUFFER LIFECYCLE MECHANICS:");
        System.out.println("  1. 'pos': Index of the next character/byte to be read from the buffer.");
        System.out.println("  2. 'count': Number of valid bytes currently cached in the internal array.");
        System.out.println("  3. When 'pos >= count', the stream automatically triggers an OS refill to fetch the next block.");

        defaultBuf.close();
        largeBuf.close();

        System.out.println("\n==========================================================================");
    }
}