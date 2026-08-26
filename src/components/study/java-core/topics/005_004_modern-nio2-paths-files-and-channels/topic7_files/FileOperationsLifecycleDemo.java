/**
 * Java Core Tutorial - Module 005_004: Modern Java NIO.2
 * Topic 7: File Operations: createFile, createDirectories, copy, move, delete
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.nio;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

public class FileOperationsLifecycleDemo {

    public static void main(String[] args) throws IOException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: Files LIFECYCLE OPERATIONS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Path baseFolder = Path.of("temp_barrackpore_lab", "subfolder", "data");

        // 1. Files.createDirectories (Creates full folder hierarchy like 'mkdir -p'):
        Files.createDirectories(baseFolder);
        System.out.println(">>> 1. Files.createDirectories() -> Created: " + baseFolder);

        // 2. Files.createFile:
        Path sourceFile = baseFolder.resolve("original.txt");
        if (!Files.exists(sourceFile)) {
            Files.createFile(sourceFile);
            Files.writeString(sourceFile, "Original payload from Sukanta Hui");
        }
        System.out.println(">>> 2. Files.createFile()        -> Created: " + sourceFile);

        // 3. Files.copy (with REPLACE_EXISTING option):
        Path backupFile = baseFolder.resolve("backup.txt");
        Files.copy(sourceFile, backupFile, StandardCopyOption.REPLACE_EXISTING);
        System.out.println(">>> 3. Files.copy()              -> Cloned to: " + backupFile);

        // 4. Files.move (Atomic rename / relocation):
        Path renamedFile = baseFolder.resolve("renamed_final.txt");
        Files.move(sourceFile, renamedFile, StandardCopyOption.REPLACE_EXISTING);
        System.out.println(">>> 4. Files.move()              -> Moved to: " + renamedFile);

        // 5. Files.deleteIfExists (Safe deletion without throwing exception if missing):
        Files.deleteIfExists(backupFile);
        Files.deleteIfExists(renamedFile);
        Files.deleteIfExists(baseFolder);
        Files.deleteIfExists(baseFolder.getParent());
        Files.deleteIfExists(baseFolder.getParent().getParent());
        System.out.println(">>> 5. Files.deleteIfExists()    -> Cleaned up all temporary files.");

        System.out.println("\n==========================================================================");
    }
}