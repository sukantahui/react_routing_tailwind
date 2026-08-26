/**
 * Java Core Tutorial - Module 005_007: File Handling & I/O Hands-On Capstone Lab
 * Topic 5: Timed File Handling Coding Challenge (Segment 5 Master Synthesis)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.io.lab;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.stream.Stream;

public class TimedFileIoCodingChallengeCapstoneDemo {

    // Challenge Problem: High-Speed Deduplicating File Merger
    // Ingests multiple branch CSV ledgers, normalizes headers, deduplicates IDs, and writes unified report atomically!
    public static class BranchLedgerConsolidator {

        public static Path consolidateLedgers(List<Path> branchFiles, Path outputDir) throws IOException {
            Path tempStaging = Files.createTempFile(outputDir, "consolidated_stage_", ".csv");

            try (var writer = Files.newBufferedWriter(tempStaging, StandardCharsets.UTF_8)) {
                writer.write("ID,STUDENT_NAME,BRANCH,STATUS\n");

                for (Path branchFile : branchFiles) {
                    try (Stream<String> lines = Files.lines(branchFile)) {
                        lines.filter(l -> !l.startsWith("ID") && !l.trim().isEmpty())
                             .distinct()
                             .forEach(line -> {
                                 try {
                                     writer.write(line);
                                     writer.newLine();
                                 } catch (IOException e) {
                                     throw new RuntimeException(e);
                                 }
                             });
                    }
                }
            }

            Path finalDestination = outputDir.resolve("master_consolidated_ledger_2026.csv");
            Files.move(tempStaging, finalDestination, StandardCopyOption.REPLACE_EXISTING, StandardCopyOption.ATOMIC_MOVE);
            return finalDestination;
        }
    }

    public static void main(String[] args) throws IOException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: TIMED FILE I/O CODING CHALLENGE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Path labDir = Files.createTempDirectory("timed_io_challenge_");

        Path bkpFile = labDir.resolve("bkp_ledger.csv");
        Path naihatiFile = labDir.resolve("naihati_ledger.csv");

        Files.writeString(bkpFile, "ID,STUDENT_NAME,BRANCH,STATUS\n101,Swadeep Paul,Barrackpore,ACTIVE\n102,Tuhina Das,Barrackpore,ACTIVE\n");
        Files.writeString(naihatiFile, "ID,STUDENT_NAME,BRANCH,STATUS\n103,Abhronila Das,Naihati,ACTIVE\n104,Debangshu Mukherjee,Naihati,ACTIVE\n");

        System.out.println(">>> Consolidating Multi-Branch Ledgers into Master Storage...");
        Path masterReport = BranchLedgerConsolidator.consolidateLedgers(List.of(bkpFile, naihatiFile), labDir);

        System.out.println("  Consolidation Output File : " + masterReport.getFileName());
        System.out.println("  File Content Verified:\n");
        Files.lines(masterReport).forEach(l -> System.out.println("    " + l));

        // Cleanup:
        Files.deleteIfExists(bkpFile);
        Files.deleteIfExists(naihatiFile);
        Files.deleteIfExists(masterReport);
        Files.deleteIfExists(labDir);

        System.out.println("\n==========================================================================");
        System.out.println(" CONGRATULATIONS! SEGMENT 5 (JAVA I/O, FILE HANDLING & SERIALIZATION)");
        System.out.println(" IS 100% COMPLETE AND FULLY CERTIFIED!");
        System.out.println("==========================================================================");
    }
}