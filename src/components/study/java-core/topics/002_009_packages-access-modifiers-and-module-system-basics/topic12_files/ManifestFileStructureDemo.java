/**
 * Java Core Tutorial - Module 002_009: Packages, Access Modifiers, JAR Packaging & Module System
 * Topic 12: Understanding the MANIFEST.MF File & the 'Main-Class' Entry
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.packages;

public class ManifestFileStructureDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: UNDERSTANDING MANIFEST.MF & Main-Class - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> What is META-INF/MANIFEST.MF?");
        System.out.println("  - A special header metadata file located at the root of every JAR file.");
        System.out.println("  - Key-value header pairs configuring JVM runtime parameters.");
        System.out.println();
        System.out.println(">>> Sample MANIFEST.MF Anatomy:");
        System.out.println("  Manifest-Version: 1.0");
        System.out.println("  Created-By: 21.0.2 (Oracle Corporation)");
        System.out.println("  Main-Class: com.coderaccotax.academy.admissions.ApplicationLauncher");
        System.out.println("  Class-Path: lib/mysql-connector-j-8.3.0.jar lib/lombok.jar");
        System.out.println();
        System.out.println(">>> CRITICAL SYNTAX RULE:");
        System.out.println("  - Every MANIFEST.MF file MUST end with an empty NEWLINE (CRLF/LF)!");
        System.out.println("  - If the trailing newline is missing, javac ignores the last line (e.g. Main-Class)!\n");

        System.out.println("==========================================================================");
    }
}