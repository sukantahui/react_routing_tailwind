/**
 * Java Core Tutorial - Module 005_004: Modern Java NIO.2
 * Topic 12: Lazy Stream-Based File Processing: Files.lines(), list(), walk() & find()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.nio;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.stream.Stream;

public class LazyStreamFileProcessingDemo {

    public static void main(String[] args) throws IOException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: LAZY STREAM-BASED FILE PROCESSING - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Path tempDir = Files.createTempDirectory("nio_streams_lab_");
        Path logFile = tempDir.resolve("server.log");

        Files.writeString(logFile,
                "INFO [Barrackpore] Server started\n" +
                "ERROR [Naihati] Database connection failed\n" +
                "INFO [Shyamnagar] Trainee login: Swadeep Paul\n" +
                "ERROR [Ichapur] Null pointer in payroll service\n" +
                "INFO [Barrackpore] Health check OK\n"
        );

        // 1. Files.lines() (Lazy Stream Processing with Filter/Map):
        System.out.println(">>> 1. Files.lines() -> Extracting all ERROR entries lazily:");
        try (Stream<String> lines = Files.lines(logFile)) {
            lines.filter(l -> l.contains("ERROR"))
                 .map(String::toUpperCase)
                 .forEach(err -> System.out.println("  " + err));
        }

        // 2. Files.walk() (Recursive Directory Traversal):
        System.out.println("\n>>> 2. Files.walk() -> Traversing directory hierarchy:");
        try (Stream<Path> paths = Files.walk(tempDir, 3)) {
            paths.forEach(p -> System.out.println("  Found: " + p.getFileName()));
        }

        // 3. Files.find() (Path Matching with Predicates):
        System.out.println("\n>>> 3. Files.find() -> Locating all '.log' files > 10 bytes:");
        try (Stream<Path> found = Files.find(tempDir, 2, (p, attr) -> p.toString().endsWith(".log") && attr.size() > 10)) {
            found.forEach(p -> System.out.println("  Matched Log File: " + p.getFileName()));
        }

        // Cleanup:
        Files.deleteIfExists(logFile);
        Files.deleteIfExists(tempDir);

        System.out.println("\n==========================================================================");
    }
}