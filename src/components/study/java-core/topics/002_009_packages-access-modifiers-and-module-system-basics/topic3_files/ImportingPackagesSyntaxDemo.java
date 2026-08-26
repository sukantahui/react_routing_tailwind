/**
 * Java Core Tutorial - Module 002_009: Packages, Access Modifiers, JAR Packaging & Module System
 * Topic 3: Importing Packages and Classes Using 'import' Statements
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.packages;

// 1. Explicit Single-Class Import (Recommended for clarity):
import java.util.ArrayList;
import java.util.List;

// 2. java.lang package is AUTOMATICALLY imported by the compiler in every Java file!
// (e.g. String, System, Math, Object, Integer are always available without import)

public class ImportingPackagesSyntaxDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: IMPORTING PACKAGES IN JAVA - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // Using imported types directly without typing 'java.util.ArrayList':
        List<String> trainees = new ArrayList<>();
        trainees.add("Swadeep Paul (Barrackpore)");
        trainees.add("Tuhina Das (Naihati)");
        trainees.add("Debangshu Mukherjee (Shyamnagar)");

        System.out.println(">>> Enrolled Trainees List:");
        for (String t : trainees) {
            System.out.println("  -> " + t);
        }

        System.out.println("\n==========================================================================");
    }
}