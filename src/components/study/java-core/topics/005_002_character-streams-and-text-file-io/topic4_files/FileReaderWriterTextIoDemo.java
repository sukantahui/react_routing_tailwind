/**
 * Java Core Tutorial - Module 005_002: Character Streams & Text File Processing
 * Topic 4: FileReader & FileWriter: Text File I/O & Java 11+ Charset Constructors
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.io;

import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class FileReaderWriterTextIoDemo {

    public static void main(String[] args) throws IOException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: FileReader & FileWriter - BARRACKPORE");
        System.out.println("==========================================================================\n");

        File file = new File("barrackpore_students.txt");

        // 1. FileWriter (Java 11+ explicit Charset constructor & append mode):
        System.out.println(">>> 1. Writing Text File with FileWriter (UTF-8):");
        try (FileWriter writer = new FileWriter(file, StandardCharsets.UTF_8, false)) {
            writer.write("Batch 2026: Java Core & AccoTax Professional\n");
            writer.write("Hub: Barrackpore, West Bengal\n");
            writer.write("Students: Swadeep Paul, Tuhina Das, Abhronila Das\n");
        }
        System.out.println("  Wrote 3 lines to: " + file.getName());

        // 2. FileReader (Java 11+ explicit Charset constructor):
        System.out.println("\n>>> 2. Reading Text File with FileReader (UTF-8):");
        try (FileReader reader = new FileReader(file, StandardCharsets.UTF_8)) {
            char[] buffer = new char[64];
            int readCount;
            while ((readCount = reader.read(buffer)) != -1) {
                System.out.print(new String(buffer, 0, readCount));
            }
        }

        // Cleanup temporary file:
        file.delete();

        System.out.println("\n\n==========================================================================");
    }
}