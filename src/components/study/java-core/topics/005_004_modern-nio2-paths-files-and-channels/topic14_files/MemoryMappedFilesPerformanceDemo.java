/**
 * Java Core Tutorial - Module 005_004: Modern Java NIO.2
 * Topic 14: Memory-Mapped Files (MappedByteBuffer): Ultra-Fast Multi-Gigabyte Processing
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.nio;

import java.io.IOException;
import java.nio.MappedByteBuffer;
import java.nio.channels.FileChannel;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;

public class MemoryMappedFilesPerformanceDemo {

    public static void main(String[] args) throws IOException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 14: MEMORY-MAPPED FILES (MappedByteBuffer) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Path mmapFile = Files.createTempFile("mmap_demo_", ".dat");
        int fileSize = 1024 * 1024; // 1 Megabyte

        // 1. Mapping File directly into OS Virtual Memory Pages:
        System.out.println(">>> 1. Creating Memory-Mapped File Buffer (1 MB):");
        try (FileChannel channel = FileChannel.open(mmapFile,
                StandardOpenOption.READ, StandardOpenOption.WRITE, StandardOpenOption.CREATE)) {

            // Maps physical disk file directly to CPU virtual memory address space:
            MappedByteBuffer memMap = channel.map(FileChannel.MapMode.READ_WRITE, 0, fileSize);

            // Write integers directly to RAM pages (OS kernel flushes to disk in background via DMA!):
            for (int i = 0; i < 100; i++) {
                memMap.putInt(i * 4, 1000 + i);
            }
            memMap.force(); // Forces memory pages to flush to physical disk immediately
            System.out.println("  Wrote 100 integers directly to memory-mapped pages.");

            // Read directly from RAM:
            int sampleVal = memMap.getInt(20);
            System.out.println("  Read Integer at byte offset 20: " + sampleVal);
        }

        // Cleanup:
        Files.deleteIfExists(mmapFile);

        System.out.println("\n>>> WHY MEMORY-MAPPED FILES ARE BLAZINGLY FAST:");
        System.out.println("  1. Zero Copy: Bypasses standard Java Heap and user-space memory buffers.");
        System.out.println("  2. Virtual Memory Pages: File is mapped directly to OS kernel page cache.");
        System.out.println("  3. Used by high-frequency trading (HFT) platforms, Kafka, and Lucene search engines!");

        System.out.println("\n==========================================================================");
    }
}