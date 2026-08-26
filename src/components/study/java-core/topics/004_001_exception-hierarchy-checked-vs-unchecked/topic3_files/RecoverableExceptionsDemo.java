/**
 * Java Core Tutorial - Module 004_001: Exception Hierarchy
 * Topic 3: java.lang.Exception: Recoverable Application-Level Conditions & Handling
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;

public class RecoverableExceptionsDemo {

    public static void readAcademyConfig(String filePath) {
        File file = new File(filePath);
        try {
            System.out.println("  Attempting to open configuration: " + file.getAbsolutePath());
            FileReader reader = new FileReader(file);
            reader.close();
        } catch (IOException e) {
            // RECOVERABLE REACTION: Graceful fallback to default configuration!
            System.out.println("  [RECOVERY ACTIVATED] Config file missing (" + e.getMessage() + ")");
            System.out.println("  [FALLBACK] Loaded default settings for Barrackpore Academy.");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: java.lang.Exception RECOVERABLE CONDITIONS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. The Core Purpose of java.lang.Exception:");
        System.out.println("  - Represents conditions from which a well-written application CAN reasonably recover.");
        System.out.println("  - Examples: Missing configuration files, transient database timeouts, invalid user input.");

        System.out.println("\n>>> 2. Executing Graceful Recovery Workflow:");
        readAcademyConfig("non_existent_config.json");

        System.out.println("\n>>> Application continues executing smoothly without crashing!");

        System.out.println("\n==========================================================================");
    }
}