/**
 * Java Core Tutorial - Module 005_004: Modern Java NIO.2
 * Topic 8: Atomic Copy & Move Options: StandardCopyOption.REPLACE_EXISTING & ATOMIC_MOVE
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.nio;

import java.io.IOException;
import java.nio.file.AtomicMoveNotSupportedException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

public class AtomicCopyMoveOptionsDemo {

    public static void main(String[] args) throws IOException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: ATOMIC & REPLACE OPTIONS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Path tempDir = Files.createTempDirectory("nio_atomic_lab_");
        Path stagedFile = tempDir.resolve("staged_ledger.json");
        Path liveFile = tempDir.resolve("live_production_ledger.json");

        Files.writeString(stagedFile, "{ "balance": 50000.00, "branch": "Barrackpore" }");
        Files.writeString(liveFile, "{ "balance": 0.00 }");

        // 1. StandardCopyOption.REPLACE_EXISTING (Overwrites destination file without error):
        System.out.println(">>> 1. StandardCopyOption.REPLACE_EXISTING:");
        Files.copy(stagedFile, liveFile, StandardCopyOption.REPLACE_EXISTING);
        System.out.println("  Copied staged over live file. Live content: " + Files.readString(liveFile));

        // 2. StandardCopyOption.ATOMIC_MOVE (Kernel-level atomic rename):
        System.out.println("\n>>> 2. StandardCopyOption.ATOMIC_MOVE:");
        Path archiveFile = tempDir.resolve("archived_ledger.json");
        try {
            Files.move(liveFile, archiveFile, StandardCopyOption.ATOMIC_MOVE);
            System.out.println("  [ATOMIC SUCCESS] Live file atomically renamed to archive with zero downtime!");
        } catch (AtomicMoveNotSupportedException e) {
            System.out.println("  [FALLBACK] Cross-drive atomic move not supported by OS. Falling back to copy-delete.");
            Files.move(liveFile, archiveFile, StandardCopyOption.REPLACE_EXISTING);
        }

        // Cleanup:
        Files.deleteIfExists(stagedFile);
        Files.deleteIfExists(archiveFile);
        Files.deleteIfExists(tempDir);

        System.out.println("\n==========================================================================");
    }
}