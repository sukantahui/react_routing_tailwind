/**
 * Java Core Tutorial - Module 012_006: JUnit 5, Mockito, Clean Code & Maven
 * Topic 11: Maven Project Management - Anatomy of pom.xml & Coordinates
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.testing;

public class MavenPomXmlAnatomyDependenciesDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: MAVEN POM.XML ANATOMY & GAV COORDINATES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. G-A-V COORDINATES (Project Object Model):");
        System.out.println("  - groupId    : com.coderaccotax (Domain reverse namespace)");
        System.out.println("  - artifactId : java-core-tutorial (Project module name)");
        System.out.println("  - version    : 1.0.0-SNAPSHOT (Semantic versioning)\n");

        System.out.println(">>> 2. DEPENDENCY SCOPES IN pom.xml:");
        System.out.println("  - compile (default) : Available on classpath for compile, test, and runtime.");
        System.out.println("  - test              : Available ONLY for test compilation and execution (e.g. JUnit, Mockito).");
        System.out.println("  - provided          : Needed for compilation, provided by runtime container (e.g. Servlet API).");
        System.out.println("  - runtime           : Needed at runtime only, not compile time (e.g. JDBC Drivers).");

        System.out.println("\n==========================================================================");
    }
}
