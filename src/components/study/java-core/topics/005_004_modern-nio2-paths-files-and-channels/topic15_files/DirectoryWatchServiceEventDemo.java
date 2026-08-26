/**
 * Java Core Tutorial - Module 005_004: Modern Java NIO.2
 * Topic 15: java.nio.file.WatchService: Real-Time Directory Event Monitoring
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.nio;

import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardWatchEventKinds;
import java.nio.file.WatchEvent;
import java.nio.file.WatchKey;
import java.nio.file.WatchService;
import java.util.concurrent.TimeUnit;

public class DirectoryWatchServiceEventDemo {

    public static void main(String[] args) throws IOException, InterruptedException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 15: java.nio.file.WatchService - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Path watchDir = Files.createTempDirectory("watch_service_lab_");
        System.out.println(">>> Monitoring Directory: " + watchDir);

        // 1. Create and register WatchService:
        try (WatchService watcher = FileSystems.getDefault().newWatchService()) {
            watchDir.register(watcher,
                    StandardWatchEventKinds.ENTRY_CREATE,
                    StandardWatchEventKinds.ENTRY_MODIFY,
                    StandardWatchEventKinds.ENTRY_DELETE
            );
            System.out.println("  [WATCHER REGISTERED] Listening for CREATE, MODIFY, DELETE events...");

            // 2. Triggering file event asynchronously:
            Path newFile = watchDir.resolve("invoice_9901.json");
            Files.writeString(newFile, "{ "invoiceId": 9901, "branch": "Barrackpore" }");

            // 3. Poll for event key (with timeout):
            WatchKey key = watcher.poll(2, TimeUnit.SECONDS);
            if (key != null) {
                for (WatchEvent<?> event : key.pollEvents()) {
                    WatchEvent.Kind<?> kind = event.kind();
                    Path eventPath = (Path) event.context();
                    System.out.printf("  [EVENT DETECTED] Kind: %-15s | Affected File: %s%n", kind.name(), eventPath);
                }
                key.reset(); // Mandatory reset to continue receiving events!
            }

            // Cleanup:
            Files.deleteIfExists(newFile);
        }

        Files.deleteIfExists(watchDir);

        System.out.println("\n>>> USE CASES FOR WatchService:");
        System.out.println("  1. Hot Reloading: Automatically reloading Spring configuration files when edited on disk.");
        System.out.println("  2. Ingestion Dropboxes: Automatically processing Excel/CSV invoices dropped into a folder.");

        System.out.println("\n==========================================================================");
    }
}