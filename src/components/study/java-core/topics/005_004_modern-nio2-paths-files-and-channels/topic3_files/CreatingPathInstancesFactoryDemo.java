/**
 * Java Core Tutorial - Module 005_004: Modern Java NIO.2
 * Topic 3: Creating Path Instances: Path.of() (Java 11+) vs Paths.get() (Java 7)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.nio;

import java.net.URI;
import java.nio.file.Path;
import java.nio.file.Paths;

public class CreatingPathInstancesFactoryDemo {

    public static void main(String[] args) throws Exception {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: CREATING Path INSTANCES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Modern Java 11+ Static Factory: Path.of(...) [RECOMMENDED]:
        Path p1 = Path.of("users", "sukanta", "documents", "syllabus.pdf");
        System.out.println(">>> 1. Path.of(varargs) [Java 11+] : " + p1);

        // 2. Legacy Java 7 Utility Class: Paths.get(...) [STILL COMMON]:
        Path p2 = Paths.get("data", "reports", "annual_tax_2026.csv");
        System.out.println(">>> 2. Paths.get(varargs) [Java 7]  : " + p2);

        // 3. Creating Path from URI (Uniform Resource Identifier):
        URI fileUri = URI.create("file:///C:/coderaccotax/students.json");
        Path p3 = Path.of(fileUri);
        System.out.println(">>> 3. Path.of(URI)                 : " + p3);

        System.out.println("\n>>> WHY Path.of() IS PREFERRED OVER Paths.get():");
        System.out.println("  1. In Java 11, static factory methods were added directly to the 'Path' interface.");
        System.out.println("  2. 'Path.of()' eliminates the need for the redundant companion helper class 'Paths'.");
        System.out.println("  3. Both methods are 100% equivalent under the hood.");

        System.out.println("\n==========================================================================");
    }
}