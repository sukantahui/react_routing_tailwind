/**
 * Java Core Tutorial - Module 005_003: Buffered Streams, BufferedReader & PrintWriter
 * Topic 4: Reading a Physical Disk Text File Line-by-Line with BufferedReader
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.io;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class BufferedReaderDiskFileLineLoopDemo {

    public static void main(String[] args) throws IOException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: BufferedReader DISK FILE LOOP - BARRACKPORE");
        System.out.println("==========================================================================\n");

        File sampleFile = new File("barrackpore_attendance_log.txt");

        // Write sample test data:
        try (FileWriter fw = new FileWriter(sampleFile, StandardCharsets.UTF_8)) {
            fw.write("2026-03-01 | Swadeep Paul | Present | 100% Score\n");
            fw.write("2026-03-01 | Tuhina Das   | Present | 100% Score\n");
            fw.write("2026-03-01 | Abhronila Das| Present | 100% Score\n");
        }

        // CANONICAL DISK READING PIPELINE:
        System.out.println(">>> Reading and Parsing Attendance Log:");
        try (BufferedReader br = new BufferedReader(new FileReader(sampleFile, StandardCharsets.UTF_8))) {
            String line;
            int count = 0;
            while ((line = br.readLine()) != null) {
                count++;
                String[] tokens = line.split("\\|");
                System.out.printf("  Record #%d: Date=%s | Trainee=%s | Status=%s%n",
                        count, tokens[0].trim(), tokens[1].trim(), tokens[2].trim());
            }
            System.out.println("\n  Total Records Processed: " + count);
        }

        // Cleanup:
        sampleFile.delete();

        System.out.println("\n==========================================================================");
    }
}