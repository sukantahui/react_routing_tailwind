/**
 * Java Core Tutorial - Module 005_004: Modern Java NIO.2
 * Topic 1: Introduction to Java NIO.2 Architecture (java.nio.file Package)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.nio;

import java.nio.file.FileSystem;
import java.nio.file.FileSystems;
import java.nio.file.spi.FileSystemProvider;

public class Nio2ArchitectureIntroductionDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: INTRODUCTION TO JAVA NIO.2 ARCHITECTURE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        FileSystem defaultFs = FileSystems.getDefault();
        FileSystemProvider provider = defaultFs.provider();

        System.out.println(">>> 1. Current JVM FileSystem SPI Provider:");
        System.out.println("  FileSystem Class   : " + defaultFs.getClass().getSimpleName());
        System.out.println("  Provider Class     : " + provider.getClass().getName());
        System.out.println("  Path Separator     : " + defaultFs.getSeparator());

        System.out.println("\n>>> 2. THE 4 PILLARS OF JAVA NIO.2 (JSR 203):");
        System.out.println("  Pillar 1: 'java.nio.file.Path'      -> Modern immutable locator interface (replaces java.io.File).");
        System.out.println("  Pillar 2: 'java.nio.file.Files'     -> Static utility powerhouse with 50+ atomic, stream-ready methods.");
        System.out.println("  Pillar 3: 'java.nio.file.FileSystem'-> Pluggable filesystem SPI (supports ZIP/JAR/Cloud filesystems as virtual drives!).");
        System.out.println("  Pillar 4: 'java.nio.file.WatchService' -> Real-time native OS kernel directory change watcher.");

        System.out.println("\n==========================================================================");
    }
}