/**
 * Java Core Tutorial - Module 005_004: Modern Java NIO.2
 * Topic 10: Loading Multi-Line Files into Collections: Files.readAllLines()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.nio;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public class FilesReadAllLinesCollectionDemo {

    public static void main(String[] args) throws IOException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: Files.readAllLines() - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Path sampleFile = Files.createTempFile("lines_sample_", ".txt");

        List<String> inputLines = List.of(
                "BATCH_01: Swadeep Paul (Barrackpore)",
                "BATCH_02: Tuhina Das (Naihati)",
                "BATCH_03: Abhronila Das (Shyamnagar)",
                "BATCH_04: Debangshu Mukherjee (Ichapur)"
        );

        // Write List<String> directly:
        Files.write(sampleFile, inputLines, StandardCharsets.UTF_8);

        // Read all lines directly into List<String>:
        System.out.println(">>> 1. Files.readAllLines() -> Ingesting complete file into List<String>:");
        List<String> loadedLines = Files.readAllLines(sampleFile, StandardCharsets.UTF_8);

        System.out.println("  Loaded Lines Count: " + loadedLines.size());
        for (int i = 0; i < loadedLines.size(); i++) {
            System.out.println("  [" + (i + 1) + "] " + loadedLines.get(i));
        }

        // Cleanup:
        Files.deleteIfExists(sampleFile);

        System.out.println("\n>>> MEMORY CAUTION WITH readAllLines():");
        System.out.println("  - 'Files.readAllLines()' loads the ENTIRE file into Java Heap RAM simultaneously.");
        System.out.println("  - Safe for small-to-medium files (up to 50 MB).");
        System.out.println("  - NEVER use for gigabyte files! For massive files, use 'Files.lines(path)' (lazy stream)!");

        System.out.println("\n==========================================================================");
    }
}