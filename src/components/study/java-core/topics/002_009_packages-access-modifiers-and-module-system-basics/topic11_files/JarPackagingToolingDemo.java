/**
 * Java Core Tutorial - Module 002_009: Packages, Access Modifiers, JAR Packaging & Module System
 * Topic 11: Creating and Executing JAR (Java Archive) Files Using 'jar' Tool
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.packages;

public class JarPackagingToolingDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: CREATING & EXECUTING JAR (JAVA ARCHIVE) FILES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> What is a JAR File?");
        System.out.println("  - A JAR (Java Archive) is a compressed ZIP archive containing compiled .class files,");
        System.out.println("    resources (images, XML, properties), and metadata.");
        System.out.println();
        System.out.println(">>> Essential JAR CLI Commands:");
        System.out.println("  1. Create Executable JAR:");
        System.out.println("     jar --create --file academy-app.jar --main-class com.coderaccotax.Main -C bin .");
        System.out.println("     (or legacy flags: jar cfe academy-app.jar com.coderaccotax.Main -C bin .)");
        System.out.println();
        System.out.println("  2. Run Executable JAR:");
        System.out.println("     java -jar academy-app.jar");
        System.out.println();
        System.out.println("  3. Inspect Contents of a JAR:");
        System.out.println("     jar --list --file academy-app.jar (or: jar tf academy-app.jar)");

        System.out.println("\n==========================================================================");
    }
}