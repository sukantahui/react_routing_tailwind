/**
 * Java Core Tutorial - Module 012_002: Core Banking Capstone
 * Topic 8: Audit Logging & Statement Exporter - Java NIO.2 Streams & CSV
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.banking;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.time.Instant;
import java.util.List;

public class AuditLoggingAndStatementExporterDemo {

    public record StatementRow(Instant date, String refId, String type, String amount, String balance) {}

    public static void exportCsvStatement(Path destination, String accountNumber, List<StatementRow> rows) throws IOException {
        StringBuilder sb = new StringBuilder();
        sb.append("Date,ReferenceId,Type,Amount,Balance
");
        for (StatementRow r : rows) {
            sb.append(r.date()).append(",")
              .append(r.refId()).append(",")
              .append(r.type()).append(",")
              .append(r.amount()).append(",")
              .append(r.balance()).append("
");
        }

        Files.writeString(destination, sb.toString(), StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
        System.out.println("   [EXPORTER]: Successfully generated CSV statement at: " + destination.toAbsolutePath());
    }

    public static void main(String[] args) throws IOException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: AUDIT LOGGING & STATEMENT EXPORTER - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<StatementRow> sampleRows = List.of(
            new StatementRow(Instant.now(), "TX-1001", "DEPOSIT", "25000.00", "25000.00"),
            new StatementRow(Instant.now(), "TX-1002", "TRANSFER_DEBIT", "5000.00", "20000.00")
        );

        Path tempFile = Files.createTempFile("bank_statement_", ".csv");
        exportCsvStatement(tempFile, "SB-BKP-101", sampleRows);

        System.out.println("
Generated Content Preview:");
        Files.lines(tempFile).forEach(line -> System.out.println("   | " + line));

        Files.deleteIfExists(tempFile);
        System.out.println("\n==========================================================================");
    }
}
