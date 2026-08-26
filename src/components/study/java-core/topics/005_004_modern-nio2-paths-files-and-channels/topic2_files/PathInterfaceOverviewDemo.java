/**
 * Java Core Tutorial - Module 005_004: Modern Java NIO.2
 * Topic 2: The java.nio.file.Path Interface: Modern Immutable Filesystem Locator
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.nio;

import java.io.File;
import java.nio.file.Path;

public class PathInterfaceOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: java.nio.file.Path INTERFACE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Path is an Interface, not a Class:
        Path projectPath = Path.of("src", "main", "java", "com", "coderaccotax", "App.java");

        System.out.println(">>> 1. Inspecting Path Interface Instance:");
        System.out.println("  Path String Representation : " + projectPath);
        System.out.println("  Concrete Runtime Class     : " + projectPath.getClass().getName());
        System.out.println("  Is Absolute?               : " + projectPath.isAbsolute());

        // 2. Interoperability with Legacy java.io.File:
        System.out.println("\n>>> 2. Bidirectional Conversion between Path and File:");
        File legacyFile = projectPath.toFile(); // Path -> File
        System.out.println("  Path -> File : " + legacyFile.getPath());

        Path backToPath = legacyFile.toPath();  // File -> Path
        System.out.println("  File -> Path : " + backToPath);

        System.out.println("\n>>> KEY PROPERTIES OF Path:");
        System.out.println("  1. Path is completely IMMUTABLE and Thread-Safe (like String).");
        System.out.println("  2. Path does NOT verify or require that the target file actually exists on physical disk.");
        System.out.println("  3. It represents a purely conceptual hierarchical location in a FileSystem.");

        System.out.println("\n==========================================================================");
    }
}