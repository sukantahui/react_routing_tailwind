/**
 * Java Core Tutorial - Module 005_004: Modern Java NIO.2
 * Topic 6: File Verification & Inspection: exists, isReadable, isRegularFile, isDirectory, size
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.nio;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.attribute.FileTime;

public class FileInspectionVerificationDemo {

    public static void main(String[] args) throws IOException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: Files METADATA VERIFICATION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Path currentDir = Path.of(".");
        Path tempFile = Files.createTempFile("barrackpore_test_", ".tmp");
        Files.writeString(tempFile, "Java NIO.2 Masterclass: Batch 2026");

        // 1. Verification of File Status:
        System.out.println(">>> 1. Inspecting File Properties for: " + tempFile.getFileName());
        System.out.println("  Files.exists(path)        : " + Files.exists(tempFile));
        System.out.println("  Files.isRegularFile(path) : " + Files.isRegularFile(tempFile));
        System.out.println("  Files.isDirectory(path)   : " + Files.isDirectory(tempFile));
        System.out.println("  Files.isReadable(path)    : " + Files.isReadable(tempFile));
        System.out.println("  Files.isWritable(path)    : " + Files.isWritable(tempFile));
        System.out.println("  Files.isExecutable(path)  : " + Files.isExecutable(tempFile));
        System.out.println("  Files.isHidden(path)      : " + Files.isHidden(tempFile));
        System.out.println("  Files.size(path)          : " + Files.size(tempFile) + " bytes");

        // 2. Timestamps and Attributes:
        FileTime modifiedTime = Files.getLastModifiedTime(tempFile);
        System.out.println("\n>>> 2. Last Modified Time:");
        System.out.println("  Timestamp : " + modifiedTime);

        // Cleanup:
        Files.deleteIfExists(tempFile);

        System.out.println("\n==========================================================================");
    }
}