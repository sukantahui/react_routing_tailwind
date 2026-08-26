/**
 * Java Core Tutorial - Module 004_001: Exception Hierarchy
 * Topic 5: The 'Catch or Specify' Requirement for Checked Exceptions in Java
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

import java.io.File;
import java.io.IOException;

public class CatchOrSpecifyRequirementDemo {

    // APPROACH 1: "SPECIFY" (Duck the exception by declaring 'throws' on the method signature):
    public static void specifyApproach(String filename) throws IOException {
        System.out.println("  [SPECIFY] Declaring 'throws IOException' to propagate error to caller.");
        File f = new File(filename);
        f.createNewFile(); // Throws IOException
    }

    // APPROACH 2: "CATCH" (Handle the exception immediately in a try-catch block):
    public static void catchApproach(String filename) {
        System.out.println("  [CATCH] Handling IOException right here locally.");
        try {
            File f = new File(filename);
            f.createNewFile();
        } catch (IOException e) {
            System.out.println("  [RECOVERED] Failed to create file: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: THE 'CATCH OR SPECIFY' MANDATE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> The 2 Valid Options Mandated by the Java Compiler for Checked Exceptions:");
        System.out.println("  Option 1: CATCH it locally using a 'try-catch' block.");
        System.out.println("  Option 2: SPECIFY it in the method header using the 'throws' clause.");

        System.out.println("\n>>> Executing Catch Approach:");
        catchApproach("system_lock.tmp");

        System.out.println("\n>>> Executing Specify Approach (Caller handles it):");
        try {
            specifyApproach("/invalid_root/system_lock.tmp");
        } catch (IOException e) {
            System.out.println("  [CALLER CATCH] Caller caught propagated error: " + e.getMessage());
        }

        System.out.println("\n==========================================================================");
    }
}