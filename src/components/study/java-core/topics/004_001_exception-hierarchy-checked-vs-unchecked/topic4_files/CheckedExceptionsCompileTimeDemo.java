/**
 * Java Core Tutorial - Module 004_001: Exception Hierarchy
 * Topic 4: Checked Exceptions (Compile-Time Enforced): IOException, SQLException, ClassNotFoundException
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

public class CheckedExceptionsCompileTimeDemo {

    // Method that throws Checked Exceptions (FileNotFoundException & IOException):
    public static void loadBarrackporeSyllabus(String path) throws IOException {
        FileInputStream fis = new FileInputStream(path); // May throw FileNotFoundException (Checked!)
        int data = fis.read(); // May throw IOException (Checked!)
        fis.close();
        System.out.println("  Read First Byte: " + data);
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: CHECKED EXCEPTIONS ARCHITECTURE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. What makes an exception 'CHECKED' in Java?");
        System.out.println("  - ANY direct or indirect subclass of 'java.lang.Exception' (EXCEPT RuntimeException).");
        System.out.println("  - The Java compiler actively checks and enforces that you handle or declare it!");

        System.out.println("\n>>> 2. Handling Checked Exception via Try-Catch:");
        try {
            loadBarrackporeSyllabus("curriculum_2026.pdf");
        } catch (FileNotFoundException e) {
            System.out.println("  [CAUGHT SPECIFIC CHECKED EXCEPTION] File missing: " + e.getMessage());
        } catch (IOException e) {
            System.out.println("  [CAUGHT GENERAL CHECKED EXCEPTION] I/O Failure: " + e.getMessage());
        }

        System.out.println("\n==========================================================================");
    }
}