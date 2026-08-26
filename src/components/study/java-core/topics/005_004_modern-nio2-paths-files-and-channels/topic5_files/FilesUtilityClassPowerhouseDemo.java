/**
 * Java Core Tutorial - Module 005_004: Modern Java NIO.2
 * Topic 5: The java.nio.file.Files Utility Class Powerhouse: Static Operations Hub
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.nio;

import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.nio.file.Files;

public class FilesUtilityClassPowerhouseDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: java.nio.file.Files POWERHOUSE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Method[] methods = Files.class.getDeclaredMethods();
        int staticMethodCount = 0;
        for (Method m : methods) {
            if (Modifier.isStatic(m.getModifiers()) && Modifier.isPublic(m.getModifiers())) {
                staticMethodCount++;
            }
        }

        System.out.println(">>> 1. Files Class Architecture:");
        System.out.println("  Class Type           : Final utility class with private constructor");
        System.out.println("  Total Public Methods : " + staticMethodCount + " static operations");

        System.out.println("\n>>> 2. 5 CORE CATEGORIES OF Files UTILITIES:");
        System.out.println("  Category 1 (Metadata Checks) : exists, isReadable, isDirectory, size, getLastModifiedTime.");
        System.out.println("  Category 2 (File Management) : createFile, createDirectories, copy, move, delete.");
        System.out.println("  Category 3 (One-Liner I/O)   : readString, writeString, readAllLines, readAllBytes.");
        System.out.println("  Category 4 (Stream Pipelines): lines, list, walk, find (Lazy Java 8 Streams).");
        System.out.println("  Category 5 (Attributes & ACL): getPosixFilePermissions, setAttribute, getFileStore.");

        System.out.println("\n==========================================================================");
    }
}