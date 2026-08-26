/**
 * Java Core Tutorial - Module 004_002: Try, Catch, Finally & Flow Control
 * Topic 4: Catch Block Ordering Rule: Specific Subclasses MUST Precede General Superclasses
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

public class CatchBlockOrderingRuleDemo {

    public static void loadAcademyResource(String path) {
        try {
            FileInputStream fis = new FileInputStream(path);
            fis.read();
            fis.close();
        }
        // RULE: Most specific subclass (FileNotFoundException) MUST come FIRST:
        catch (FileNotFoundException fnf) {
            System.out.println("  [SPECIFIC CATCH 1] File does not exist: " + fnf.getMessage());
        }
        // General superclass (IOException) MUST follow after its subclasses:
        catch (IOException ioe) {
            System.out.println("  [GENERAL CATCH 2] General I/O transmission failure: " + ioe.getMessage());
        }
        // Ultimate root application catch (Exception) comes LAST:
        catch (Exception ex) {
            System.out.println("  [FALLBACK CATCH 3] Unexpected general error: " + ex.getMessage());
        }

        /*
         * ILLEGAL ORDERING DEMONSTRATION (Causes Compile Error):
         *
         * catch (IOException ioe) { ... }
         * catch (FileNotFoundException fnf) { ... }
         *
         * COMPILE ERROR: "exception java.io.FileNotFoundException has already been caught"
         * Because IOException catches all its subclasses, making FileNotFoundException unreachable!
         */
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: CATCH BLOCK ORDERING RULE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Executing Properly Ordered Catch Blocks:");
        loadAcademyResource("non_existent_file.dat");

        System.out.println("\n>>> THE GOLDEN ORDERING RULE:");
        System.out.println("  Subclass (Child) FIRST -> Superclass (Parent) SECOND -> Root (Ancestor) LAST!");

        System.out.println("\n==========================================================================");
    }
}