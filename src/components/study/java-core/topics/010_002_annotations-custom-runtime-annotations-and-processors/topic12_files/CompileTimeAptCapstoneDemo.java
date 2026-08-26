/**
 * Java Core Tutorial - Module 010_002: Java Annotations & Custom Processors
 * Topic 12: Compile-Time Annotation Processing (APT) - Modern Java Capstone
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.annotations;

public class CompileTimeAptCapstoneDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: COMPILE-TIME ANNOTATION PROCESSING (APT) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> HOW THE ANNOTATION PROCESSING TOOL (APT) WORKS DURING javac COMPILATION:");
        System.out.println("  1. javac starts compilation round 1 on .java source files.");
        System.out.println("  2. javac scans AST (Abstract Syntax Tree) for annotations.");
        System.out.println("  3. Registered 'javax.annotation.processing.Processor' plugins are invoked.");
        System.out.println("  4. Processors generate new source files (e.g. MapStruct generates StudentMapperImpl.java).");
        System.out.println("  5. javac loops back (Round 2) to compile the freshly generated source files!");
        System.out.println("  6. Once no new files are generated, javac emits final .class bytecode.\n");

        System.out.println(">>> MAJOR COMPILE-TIME ANNOTATION PROCESSORS IN INDUSTRY:");
        System.out.println("  - Project Lombok : @Getter, @Setter, @Builder (AST manipulation).");
        System.out.println("  - MapStruct      : High-performance type-safe DTO-to-Entity bean mappers.");
        System.out.println("  - Google Auto    : @AutoValue, @AutoService compile-time code generators.");
        System.out.println("  - Dagger 2       : Compile-time dependency injection without runtime reflection.");
        System.out.println("  - Micronaut / Quarkus: Ahead-Of-Time (AOT) DI for instant serverless startup.");

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 010_002 COMPLETE: JAVA ANNOTATIONS & APT MASTERED!");
        System.out.println("==========================================================================");
    }
}
