/**
 * Java Core Tutorial - Module 005_004: Modern Java NIO.2
 * Topic 9: Modern One-Liner I/O: Files.readString() & Files.writeString() (Java 11+)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.nio;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;

public class ModernOneLinerReadWriteStringDemo {

    public static void main(String[] args) throws IOException {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: Files.readString & writeString (JAVA 11+) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Path sampleFile = Files.createTempFile("quick_io_sample_", ".txt");

        // 1. Files.writeString (One-liner text write with UTF-8 default):
        String initialData = "Barrackpore Academic Hub: Java 11+ One-Liner I/O Mastery\n";
        Files.writeString(sampleFile, initialData, StandardCharsets.UTF_8);
        System.out.println(">>> 1. Files.writeString() -> Wrote initial payload in 1 line of code!");

        // 2. Files.writeString with StandardOpenOption.APPEND:
        String appendData = "Enrolled Trainees: Swadeep Paul, Tuhina Das, Abhronila Das\n";
        Files.writeString(sampleFile, appendData, StandardCharsets.UTF_8, StandardOpenOption.APPEND);
        System.out.println(">>> 2. Files.writeString(APPEND) -> Appended extra line.");

        // 3. Files.readString (One-liner complete file read into String):
        String completeContent = Files.readString(sampleFile, StandardCharsets.UTF_8);
        System.out.println("\n>>> 3. Files.readString() Output:");
        System.out.println(completeContent);

        // Cleanup:
        Files.deleteIfExists(sampleFile);

        System.out.println(">>> THE MODERN ONE-LINER REVOLUTION:");
        System.out.println("  - Replaces 10 lines of legacy FileInputStream / BufferedReader boilerplate.");
        System.out.println("  - Automatically manages stream opening, buffering, and closing.");

        System.out.println("\n==========================================================================");
    }
}