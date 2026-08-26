/**
 * Java Core Tutorial - Module 004_004: Try-with-Resources & AutoCloseable
 * Topic 2: Try-with-Resources Syntax, Scope Mechanics & Optional catch/finally
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

import java.io.BufferedReader;
import java.io.StringReader;
import java.io.IOException;

public class TryWithResourcesSyntaxMechanicsDemo {

    public static void readAcademyNotes(String content) {
        // Syntax: 'try (Declaration) { Body } [catch] [finally]'
        try (BufferedReader reader = new BufferedReader(new StringReader(content))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println("  [NOTE LINE] " + line);
            }
            // 'reader' is automatically closed RIGHT HERE before any catch/finally block runs!
        } catch (IOException e) {
            System.out.println("  [CATCH] Handled read error: " + e.getMessage());
        } finally {
            System.out.println("  [FINALLY] Optional finally block executes AFTER resources are closed.\n");
        }

        // NOTE ON VARIABLE SCOPE:
        // 'reader' is in scope ONLY within the try block parentheses and body.
        // reader.readLine(); // COMPILE ERROR: Cannot find symbol 'reader'!
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: TRY-WITH-RESOURCES SYNTAX & MECHANICS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        String syllabus = "Java Core Foundations\nOOP Mastery in Barrackpore\nException Handling";
        readAcademyNotes(syllabus);

        System.out.println(">>> 3 SYNTACTICAL RULES:");
        System.out.println("  1. Scope of resource variable is strictly restricted to the 'try' body.");
        System.out.println("  2. 'close()' is called BEFORE any 'catch' or 'finally' block is executed.");
        System.out.println("  3. 'catch' and 'finally' blocks are completely OPTIONAL in try-with-resources!");

        System.out.println("\n==========================================================================");
    }
}