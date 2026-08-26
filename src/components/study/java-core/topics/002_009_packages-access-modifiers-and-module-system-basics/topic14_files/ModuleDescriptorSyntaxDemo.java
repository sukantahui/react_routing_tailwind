/**
 * Java Core Tutorial - Module 002_009: Packages, Access Modifiers, JAR Packaging & Module System
 * Topic 14: module-info.java Syntax: 'module', 'requires', 'exports', 'opens'
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.packages;

public class ModuleDescriptorSyntaxDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 14: module-info.java DESCRIPTOR SYNTAX - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> The 4 Core Directives in 'module-info.java':");
        System.out.println();
        System.out.println("  1. 'module <module.name> { ... }'");
        System.out.println("     Declares a named module.");
        System.out.println();
        System.out.println("  2. 'requires <module.name>;'");
        System.out.println("     Declares a DEPENDENCY on another module (e.g. 'requires java.sql;').");
        System.out.println();
        System.out.println("  3. 'exports <package.name>;'");
        System.out.println("     EXPOSES all public types in that package to other modules.");
        System.out.println("     (Unexported packages remain STRICTLY PRIVATE inside the module!).");
        System.out.println();
        System.out.println("  4. 'opens <package.name>;'");
        System.out.println("     Permits runtime DEEP REFLECTION (e.g. for Spring Boot / Hibernate / Jackson).");

        System.out.println("\n==========================================================================");
    }
}