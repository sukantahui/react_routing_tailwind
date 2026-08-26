/**
 * Java Core Tutorial - Module 004_002: Try, Catch, Finally & Flow Control
 * Topic 5: Java 7 Multi-Catch Syntax: Combining Disjoint Exceptions in a Single Block
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

import java.io.IOException;
import java.sql.SQLException;

public class Java7MultiCatchSyntaxDemo {

    public static void executeDatabaseAndIoPipeline(boolean failWithSql) throws IOException, SQLException {
        if (failWithSql) {
            throw new SQLException("Failed to connect to PostgreSQL at Barrackpore hub!");
        } else {
            throw new IOException("Failed to write transaction receipt to storage disk!");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: JAVA 7 MULTI-CATCH SYNTAX - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // JAVA 7 MULTI-CATCH: Using the pipe '|' operator to handle multiple exception types together:
        try {
            executeDatabaseAndIoPipeline(true);
        } catch (IOException | SQLException ex) {
            System.out.println(">>> 1. Intercepted Error in Multi-Catch Handler:");
            System.out.println("  Class Type   : " + ex.getClass().getSimpleName());
            System.out.println("  Error Message: " + ex.getMessage());
        }

        System.out.println("\n>>> 2. Multi-Catch Constraint Rule:");
        System.out.println("  The piped exception types MUST be DISJOINT (siblings in hierarchy).");
        System.out.println("  Writing 'catch (FileNotFoundException | IOException ex)' is a COMPILE ERROR because they have an inheritance relationship!");

        System.out.println("\n==========================================================================");
    }
}