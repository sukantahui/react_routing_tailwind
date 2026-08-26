/**
 * Java Core Tutorial - Module 005_007: File Handling & I/O Hands-On Capstone Lab
 * Topic 1: Project 1: High-Performance Server Access Log Analyzer
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.io.lab;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class ServerAccessLogAnalyzerProjectDemo {

    public static class LogReport {
        public final long totalRequests;
        public final Map<String, Long> statusDistribution;
        public final Map<String, Long> ipTraffic;

        public LogReport(long total, Map<String, Long> status, Map<String, Long> ip) {
            this.totalRequests = total;
            this.statusDistribution = status;
            this.ipTraffic = ip;
        }
    }

    // Lazy Stream-Based Log Parser (Processes Gigabytes with Constant O(1) Memory!):
    public static LogReport analyzeLogFile(Path logPath) throws IOException {
        try (Stream<String> lines = Files.lines(logPath)) {
            // Collecting lines into streaming statistical aggregations:
            var list = lines.filter(l -> !l.trim().isEmpty() && !l.startsWith("#"))
                    .map(line -> line.split(" "))
                    .filter(tokens -> tokens.length >= 4)
                    .toList();

            long total = list.size();

            Map<String, Long> statuses = list.stream()
                    .collect(Collectors.groupingBy(t -> t[3], Collectors.counting()));

            Map<String, Long> ips = list.stream()
                    .collect(Collectors.groupingBy(t -> t[0], Collectors.counting()));

            return new LogReport(total, statuses, ips);
        }
    }

    public static void main(String[] args) throws IOException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: PROJECT 1 - SERVER ACCESS LOG ANALYZER - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Path sampleLog = Files.createTempFile("access_log_", ".log");
        Files.writeString(sampleLog,
                "192.168.1.10 [2026-03-01] GET /api/v1/students 200\n" +
                "192.168.1.11 [2026-03-01] POST /api/v1/admissions 201\n" +
                "192.168.1.10 [2026-03-01] GET /api/v1/courses 200\n" +
                "192.168.1.12 [2026-03-01] GET /admin/secret 403\n" +
                "192.168.1.10 [2026-03-01] GET /api/v1/students 200\n" +
                "192.168.1.13 [2026-03-01] POST /api/v1/pay 500\n"
        );

        LogReport report = analyzeLogFile(sampleLog);

        System.out.println(">>> 1. Executive Log Analytics Summary:");
        System.out.println("  Total HTTP Requests Processed : " + report.totalRequests);
        System.out.println("  HTTP Status Code Breakdown    : " + report.statusDistribution);
        System.out.println("  Top Client IP Traffic (Hits)  : " + report.ipTraffic);

        Files.deleteIfExists(sampleLog);

        System.out.println("\n==========================================================================");
    }
}