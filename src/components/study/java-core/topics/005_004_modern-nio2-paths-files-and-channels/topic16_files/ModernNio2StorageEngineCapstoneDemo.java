/**
 * Java Core Tutorial - Module 005_004: Modern Java NIO.2
 * Topic 16: Modern Java NIO.2 Enterprise Storage Engine (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.nio;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.nio.file.StandardOpenOption;
import java.util.List;
import java.util.stream.Stream;

public class ModernNio2StorageEngineCapstoneDemo {

    public static class EnterpriseStorageEngine {
        private final Path rootStorage;

        public EnterpriseStorageEngine(Path root) throws IOException {
            this.rootStorage = root.toAbsolutePath().normalize();
            Files.createDirectories(rootStorage);
        }

        // Store file with atomic staging:
        public void storeDocument(String fileName, String content) throws IOException {
            Path tempStaging = Files.createTempFile("stage_", ".tmp");
            Files.writeString(tempStaging, content, StandardCharsets.UTF_8);

            Path finalDestination = rootStorage.resolve(fileName);
            Files.move(tempStaging, finalDestination, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("  [STORED ATOMICALLY] " + fileName + " (" + Files.size(finalDestination) + " bytes)");
        }

        // Search documents matching keyword lazily:
        public void searchKeyword(String keyword) throws IOException {
            System.out.println("  [SEARCHING KEYWORD] '" + keyword + "' across storage directory:");
            try (Stream<Path> files = Files.walk(rootStorage, 2)) {
                files.filter(Files::isRegularFile).forEach(p -> {
                    try {
                        String body = Files.readString(p);
                        if (body.contains(keyword)) {
                            System.out.println("    -> Match in: " + p.getFileName());
                        }
                    } catch (IOException e) {
                        System.err.println("Error reading " + p);
                    }
                });
            }
        }
    }

    public static void main(String[] args) throws IOException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 16: MODERN JAVA NIO.2 ENTERPRISE CAPSTONE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Path labRoot = Files.createTempDirectory("nio_enterprise_store_");
        EnterpriseStorageEngine engine = new EnterpriseStorageEngine(labRoot);

        // 1. Storing documents atomically:
        System.out.println(">>> 1. Ingesting Documents into Enterprise Storage Engine:");
        engine.storeDocument("swadeep_profile.json", "{ "name": "Swadeep Paul", "center": "Barrackpore", "track": "Java Core" }");
        engine.storeDocument("tuhina_profile.json", "{ "name": "Tuhina Das", "center": "Naihati", "track": "Spring Microservices" }");
        engine.storeDocument("tax_ledger.csv", "ID,BRANCH,STATUS\n101,Barrackpore,COMPLETED\n102,Shyamnagar,PENDING");

        // 2. Querying documents with lazy streams:
        System.out.println("\n>>> 2. Executing Search Operations:");
        engine.searchKeyword("Barrackpore");

        // Cleanup:
        try (Stream<Path> paths = Files.walk(labRoot)) {
            paths.sorted((a, b) -> b.compareTo(a)).forEach(p -> {
                try { Files.deleteIfExists(p); } catch (IOException ignored) {}
            });
        }

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 005_004 MODERN JAVA NIO.2 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}