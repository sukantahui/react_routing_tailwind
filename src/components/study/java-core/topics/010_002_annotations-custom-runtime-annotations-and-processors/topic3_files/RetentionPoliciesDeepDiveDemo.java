/**
 * Java Core Tutorial - Module 010_002: Java Annotations & Custom Processors
 * Topic 3: @Retention Deep Dive - SOURCE vs CLASS vs RUNTIME
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.annotations;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

public class RetentionPoliciesDeepDiveDemo {

    // 1. SOURCE RETENTION: Discarded by compiler (Never in .class bytecode)
    @Retention(RetentionPolicy.SOURCE)
    public @interface SourceLevelCheck { String note(); }

    // 2. CLASS RETENTION: Retained in .class bytecode, but DISCARDED by JVM at runtime (Default!)
    @Retention(RetentionPolicy.CLASS)
    public @interface BytecodeLevelAudit { String auditor(); }

    // 3. RUNTIME RETENTION: Retained in .class AND loaded into JVM memory for Reflection
    @Retention(RetentionPolicy.RUNTIME)
    public @interface RuntimeInspector { String role(); }

    // Annotated Class:
    @SourceLevelCheck(note = "Verified for Barrackpore Academy syllabus")
    @BytecodeLevelAudit(auditor = "Bytecode Tool ASM")
    @RuntimeInspector(role = "STUDENT_ADMIN")
    public static class SampleEntity {}

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: RETENTION POLICIES DEEP DIVE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Class<?> clazz = SampleEntity.class;

        System.out.println(">>> TESTING RUNTIME REFLECTION VISIBILITY OF THE 3 RETENTION POLICIES:");
        System.out.println("  - Is @SourceLevelCheck present at runtime?  : " + clazz.isAnnotationPresent(SourceLevelCheck.class) + " (FALSE - Erased by javac)");
        System.out.println("  - Is @BytecodeLevelAudit present at runtime?: " + clazz.isAnnotationPresent(BytecodeLevelAudit.class) + " (FALSE - Ignored by JVM)");
        System.out.println("  - Is @RuntimeInspector present at runtime? : " + clazz.isAnnotationPresent(RuntimeInspector.class) + " (TRUE! - Loaded in memory)");

        System.out.println("\n>>> RETENTION POLICY SUMMARY:");
        System.out.println("  1. SOURCE  : Used by javac / IDEs / Lombok (Zero bytecode footprint).");
        System.out.println("  2. CLASS   : Used by bytecode analysis tools (FindBugs, Sonar, default).");
        System.out.println("  3. RUNTIME : Required for Spring DI, Hibernate, JUnit, Jackson.");

        System.out.println("\n==========================================================================");
    }
}
