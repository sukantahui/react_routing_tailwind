/**
 * Java Core Tutorial - Module 005_004: Modern Java NIO.2
 * Topic 0: Limitations of Legacy java.io.File: Why Java 7+ Introduced NIO.2
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.nio;

import java.io.File;

public class LegacyFileLimitationsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: LIMITATIONS OF LEGACY java.io.File - BARRACKPORE");
        System.out.println("==========================================================================\n");

        File nonExistent = new File("/invalid_root_drive/non_existent_folder/sub/data.txt");

        // 1. Silent Boolean Failure without Error Context:
        boolean deleted = nonExistent.delete();
        System.out.println(">>> 1. Silent Failure Trap:");
        System.out.println("  file.delete() returned : " + deleted);
        System.out.println("  [PROBLEM] WHY did it fail? Was it permission denied? File in use? Non-existent?");
        System.out.println("  'java.io.File' gives zero diagnostic reasons (only returns boolean false)!");

        // 2. Directory Listing Performance Trap:
        System.out.println("\n>>> 2. Directory Scaling Bottleneck:");
        System.out.println("  - 'file.listFiles()' eagerly loads ALL file objects in a directory into memory array.");
        System.out.println("  - A directory with 500,000 files causes OutOfMemoryError and hangs for seconds.");

        // 3. Lack of Modern Filesystem Features:
        System.out.println("\n>>> 3. Missing Enterprise Features in Legacy File:");
        System.out.println("  - No atomic move / rename support.");
        System.out.println("  - No symbolic link / hard link traversal.");
        System.out.println("  - No filesystem event notification / file watcher.");
        System.out.println("  - No fine-grained POSIX file permissions (chmod).");

        System.out.println("\n==========================================================================");
    }
}